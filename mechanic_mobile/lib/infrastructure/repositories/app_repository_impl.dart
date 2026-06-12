import 'dart:async';
import 'dart:convert';

import '../../core/error/failures.dart';
import '../../core/network/connectivity_service.dart';
import '../../domain/entities/app_entities.dart';
import '../../domain/repositories/app_repositories.dart';
import '../datasources/client_remote_datasource.dart';
import '../local/incident_offline_store.dart';
import '../local/vehicle_offline_store.dart';
import '../models/app_models.dart';

class ClientRepositoryImpl
    implements ClientRepository, SessionRepository, VehicleRepository, IncidentRepository {
  ClientRepositoryImpl(
    this._remoteDataSource,
    this._connectivityService,
    this._vehicleOfflineStore,
    this._incidentOfflineStore,
  ) {
    _connectivityService.addListener(_handleConnectivityChanged);
    unawaited(_bootstrapOfflineQueue());
  }

  final ClientRemoteDataSource _remoteDataSource;
  final ConnectivityService _connectivityService;
  final VehicleOfflineStore _vehicleOfflineStore;
  final IncidentOfflineStore _incidentOfflineStore;
  bool _syncingVehicles = false;
  bool _syncingIncidents = false;
  bool _bootstrapped = false;

  Map<String, dynamic> _envelopeData(Map<String, dynamic> response) {
    final data = response['data'];
    return data is Map ? Map<String, dynamic>.from(data) : <String, dynamic>{};
  }

  PaginationEntity _pagination(Map<String, dynamic> data) {
    return PaginationModel.fromJson(mapOf(data['pagination']));
  }

  PaginationEntity _offlinePagination(int total) {
    return PaginationEntity(
      page: 1,
      pageSize: total,
      total: total,
      totalPages: 1,
      hasNext: false,
      hasPrevious: false,
    );
  }

  PagedResult<T> _paged<T>(
    Map<String, dynamic> response,
    T Function(Map<String, dynamic>) parser,
  ) {
    final data = _envelopeData(response);
    final items = listMapOf(data['items']).map(parser).toList();
    return PagedResult<T>(
      items: items,
      pagination: _pagination(data),
    );
  }

  Future<List<Map<String, dynamic>>> _cachedVehicleMaps() async {
    final vehicles = await _vehicleOfflineStore.loadCachedVehicles();
    return vehicles;
  }

  Future<void> _cacheVehiclesFromRemote(List<Map<String, dynamic>> vehicles) async {
    await _vehicleOfflineStore.saveCachedVehicles(vehicles);
  }

  Future<void> _cacheVehicle(Map<String, dynamic> vehicle) async {
    await _vehicleOfflineStore.upsertCachedVehicle(vehicle);
  }

  Future<void> _removeVehicleCache(String id) async {
    await _vehicleOfflineStore.deleteCachedVehicle(id);
  }

  Future<List<Map<String, dynamic>>> _cachedIncidentMaps() async {
    return _incidentOfflineStore.loadCachedIncidents();
  }

  Future<void> _cacheIncidentsFromRemote(List<Map<String, dynamic>> incidents) async {
    await _incidentOfflineStore.saveCachedIncidents(incidents);
  }

  Future<void> _cacheIncident(Map<String, dynamic> incident) async {
    await _incidentOfflineStore.upsertCachedIncident(incident);
  }

  Future<void> _removeIncidentCache(String id) async {
    await _incidentOfflineStore.deleteCachedIncident(id);
  }

  VehicleModel _vehicleFromInput(
    VehicleUpsertInput input, {
    required String id,
    String offlineState = 'pending_create',
    String? statusOverride,
  }) {
    final now = DateTime.now().toIso8601String();
    return VehicleModel.fromJson(<String, dynamic>{
      'id': id,
      'customer_id': '',
      'plate_number': input.plateNumber,
      'vehicle_type': input.vehicleType,
      'brand': input.brand,
      'model': input.model,
      'year': input.year,
      'color': input.color,
      'status': statusOverride ?? 'PENDING_SYNC',
      'created_at': now,
      'updated_at': now,
      'offline_state': offlineState,
    });
  }

  VehicleModel _vehicleFromMap(Map<String, dynamic> map) => VehicleModel.fromJson(map);

  bool _isNetworkFailure(Object error) {
    return error is NetworkFailure || error is ServerFailure || error is UnknownFailure && error.message.contains('conectar');
  }

  String _tempId(String prefix) {
    return '$prefix-${DateTime.now().millisecondsSinceEpoch}';
  }

  Map<String, dynamic> _vehicleMapFromEntity(
    VehicleEntity entity, {
    String? offlineState,
  }) {
    final raw = Map<String, dynamic>.from(entity.raw);
    raw
      ..['id'] = entity.id
      ..['customer_id'] = entity.customerId
      ..['plate_number'] = entity.plateNumber
      ..['vehicle_type'] = entity.vehicleType
      ..['status'] = entity.status
      ..['created_at'] = entity.createdAt?.toIso8601String()
      ..['updated_at'] = entity.updatedAt?.toIso8601String()
      ..['brand'] = entity.brand
      ..['model'] = entity.model
      ..['year'] = entity.year
      ..['color'] = entity.color;
    if (offlineState != null) {
      raw['offline_state'] = offlineState;
    } else {
      raw.remove('offline_state');
    }
    return raw;
  }

  Map<String, dynamic> _vehicleMapFromInputPayload(
    VehicleUpsertInput input, {
    required String id,
    required String offlineState,
    String? statusOverride,
  }) {
    final map = input.toJson();
    map['id'] = id;
    map['customer_id'] = '';
    map['status'] = statusOverride ?? 'PENDING_SYNC';
    map['created_at'] = DateTime.now().toIso8601String();
    map['updated_at'] = DateTime.now().toIso8601String();
    map['offline_state'] = offlineState;
    return map;
  }

  Future<void> _queueVehicleOperation({
    required String opType,
    required String resourceId,
    required Map<String, dynamic> payload,
  }) async {
    await _vehicleOfflineStore.queueOperation(
      opType: opType,
      resourceId: resourceId,
      payload: payload,
    );
  }

  Future<List<Map<String, dynamic>>> _offlineVehicles() async {
    return _cachedVehicleMaps();
  }

  Future<void> _bootstrapOfflineQueue() async {
    if (_bootstrapped) return;
    _bootstrapped = true;
    await _vehicleOfflineStore.init();
    await _incidentOfflineStore.init();
    if (_connectivityService.isOnline) {
      await syncOfflineQueue();
    }
  }

  void _handleConnectivityChanged() {
    if (!_connectivityService.isOnline) return;
    unawaited(syncOfflineQueue());
  }

  @override
  Future<ClientEntity> getMe() async {
    final response = await _remoteDataSource.getMe();
    return ClientModel.fromJson(_envelopeData(response));
  }

  @override
  Future<ClientEntity> updateMe(ClientUpdateInput input) async {
    final response = await _remoteDataSource.updateMe(input.toJson());
    return ClientModel.fromJson(_envelopeData(response));
  }

  @override
  Future<String> changePassword(PasswordChangeInput input) async {
    final response = await _remoteDataSource.changePassword(input.toJson());
    return stringOf(response['message']) ??
        stringOf(_envelopeData(response)['message']) ??
        'Contraseña actualizada';
  }

  @override
  Future<PagedResult<SessionEntity>> listMySessions({
    int? page,
    int? pageSize,
  }) async {
    final response = await _remoteDataSource.listSessions(
      page: page,
      pageSize: pageSize,
    );
    return _paged<SessionEntity>(
      response,
      (json) => SessionModel.fromJson(json),
    );
  }

  @override
  Future<SessionEntity> revokeSession(String sessionId) async {
    final response = await _remoteDataSource.revokeSession(sessionId);
    return SessionModel.fromJson(_envelopeData(response));
  }

  @override
  Future<PagedResult<VehicleEntity>> listMyVehicles({
    int? page,
    int? pageSize,
  }) async {
    if (_connectivityService.isOnline) {
      try {
        await syncOfflineQueue();
        final response = await _remoteDataSource.listVehicles(
          page: page,
          pageSize: pageSize,
        );
        final data = _envelopeData(response);
        final items = listMapOf(data['items']).map(_vehicleFromMap).toList();
        await _cacheVehiclesFromRemote(listMapOf(data['items']));
        return PagedResult<VehicleEntity>(
          items: items,
          pagination: _pagination(data),
        );
      } catch (exception) {
        if (!_isNetworkFailure(exception)) rethrow;
      }
    }

    final cached = await _offlineVehicles();
    final items = cached.map(_vehicleFromMap).toList();
    return PagedResult<VehicleEntity>(
      items: items,
      pagination: _offlinePagination(items.length),
    );
  }

  @override
  Future<VehicleEntity> createVehicle(VehicleUpsertInput input) async {
    if (_connectivityService.isOnline) {
      try {
        final response = await _remoteDataSource.createVehicle(input.toJson());
        final data = _envelopeData(response);
        await _cacheVehicle(data);
        return _vehicleFromMap(data);
      } catch (exception) {
        if (!_isNetworkFailure(exception)) rethrow;
      }
    }

    final tempId = _tempId('local-vehicle');
    final localMap = _vehicleMapFromInputPayload(
      input,
      id: tempId,
      offlineState: 'pending_create',
      statusOverride: 'PENDING_SYNC',
    );
    await _cacheVehicle(localMap);
    await _queueVehicleOperation(
      opType: 'create',
      resourceId: tempId,
      payload: input.toJson(),
    );
    return _vehicleFromMap(localMap);
  }

  @override
  Future<VehicleDetailEntity> getVehicle(String vehicleId) async {
    if (_connectivityService.isOnline) {
      try {
        final response = await _remoteDataSource.getVehicle(vehicleId);
        return VehicleDetailModel.fromJson(_envelopeData(response));
      } catch (exception) {
        if (!_isNetworkFailure(exception)) rethrow;
      }
    }

    final cached = await _cachedVehicleMaps();
    final local = cached.firstWhere(
      (item) => item['id']?.toString() == vehicleId,
      orElse: () => <String, dynamic>{},
    );
    if (local.isNotEmpty) {
      return VehicleDetailModel.fromJson(local);
    }
    throw NetworkFailure('No hay conexión y el vehículo no está en caché.');
  }

  @override
  Future<VehicleEntity> updateVehicle(
    String vehicleId,
    VehicleUpsertInput input,
  ) async {
    if (_connectivityService.isOnline) {
      try {
        final response =
            await _remoteDataSource.updateVehicle(vehicleId, input.toJson());
        final data = _envelopeData(response);
        await _cacheVehicle(data);
        return _vehicleFromMap(data);
      } catch (exception) {
        if (!_isNetworkFailure(exception)) rethrow;
      }
    }

    final cached = await _cachedVehicleMaps();
    final existing = cached.firstWhere(
      (item) => item['id']?.toString() == vehicleId,
      orElse: () => <String, dynamic>{},
    );
    final localMap = <String, dynamic>{
      ...existing,
      ...input.toJson(),
      'id': vehicleId,
      'offline_state': 'pending_update',
      'updated_at': DateTime.now().toIso8601String(),
    };
    await _cacheVehicle(localMap);
    await _queueVehicleOperation(
      opType: 'update',
      resourceId: vehicleId,
      payload: {
        'vehicle_id': vehicleId,
        ...input.toJson(),
      },
    );
    return _vehicleFromMap(localMap);
  }

  @override
  Future<VehicleEntity> deleteVehicle(String vehicleId) async {
    if (_connectivityService.isOnline) {
      try {
        final response = await _remoteDataSource.deleteVehicle(vehicleId);
        final data = _envelopeData(response);
        await _removeVehicleCache(vehicleId);
        return _vehicleFromMap({
          ...data,
          'id': data['id'] ?? vehicleId,
          'status': data['status'] ?? 'deleted',
        });
      } catch (exception) {
        if (!_isNetworkFailure(exception)) rethrow;
      }
    }

    final cached = await _cachedVehicleMaps();
    final existing = cached.firstWhere(
      (item) => item['id']?.toString() == vehicleId,
      orElse: () => <String, dynamic>{},
    );
    if (existing.isNotEmpty) {
      await _removeVehicleCache(vehicleId);
    }
    await _queueVehicleOperation(
      opType: 'delete',
      resourceId: vehicleId,
      payload: {'vehicle_id': vehicleId},
    );
    return _vehicleFromMap({
      ...existing,
      'id': vehicleId,
      'status': existing['status'] ?? 'deleted',
      'offline_state': 'pending_delete',
      'updated_at': DateTime.now().toIso8601String(),
    });
  }

  @override
  Future<VehicleEntity> changeVehicleStatus(
    String vehicleId,
    VehicleStatusChangeInput input,
  ) async {
    if (_connectivityService.isOnline) {
      try {
        final response = await _remoteDataSource.changeVehicleStatus(
          vehicleId,
          input.toJson(),
        );
        final data = _envelopeData(response);
        await _cacheVehicle(data);
        return _vehicleFromMap(data);
      } catch (exception) {
        if (!_isNetworkFailure(exception)) rethrow;
      }
    }

    final cached = await _cachedVehicleMaps();
    final existing = cached.firstWhere(
      (item) => item['id']?.toString() == vehicleId,
      orElse: () => <String, dynamic>{},
    );
    final localMap = <String, dynamic>{
      ...existing,
      'id': vehicleId,
      'status': input.status,
      'offline_state': 'pending_status_change',
      'updated_at': DateTime.now().toIso8601String(),
    };
    await _cacheVehicle(localMap);
    await _queueVehicleOperation(
      opType: 'status',
      resourceId: vehicleId,
      payload: {
        'vehicle_id': vehicleId,
        'status': input.status,
      },
    );
    return _vehicleFromMap(localMap);
  }

  @override
  Future<void> syncOfflineQueue() async {
    if (!_connectivityService.isOnline || _syncingVehicles) return;
    _syncingVehicles = true;
    final vehicleIdMap = <String, String>{};
    try {
      final operations = await _vehicleOfflineStore.loadPendingOperations();
      for (final operation in operations) {
        final opId = operation['id'] as int;
        final opType = operation['op_type']?.toString() ?? '';
        final resourceId = operation['resource_id']?.toString() ?? '';
        final payload = Map<String, dynamic>.from(operation['payload'] as Map);
        final resolvedId = vehicleIdMap[resourceId] ?? resourceId;
        try {
          switch (opType) {
            case 'create':
              final response = await _remoteDataSource.createVehicle(payload);
              final data = _envelopeData(response);
              final remoteId = data['id']?.toString() ?? resolvedId;
              vehicleIdMap[resourceId] = remoteId;
              await _cacheVehicle({
                ...data,
                'id': remoteId,
              });
              if (resourceId != remoteId) {
                await _removeVehicleCache(resourceId);
              }
              break;
            case 'update':
              final response = await _remoteDataSource.updateVehicle(
                resolvedId,
                payload,
              );
              await _cacheVehicle(_envelopeData(response));
              break;
            case 'delete':
              await _remoteDataSource.deleteVehicle(resolvedId);
              await _removeVehicleCache(resolvedId);
              break;
            case 'status':
              final response = await _remoteDataSource.changeVehicleStatus(
                resolvedId,
                {'status': payload['status']},
              );
              await _cacheVehicle(_envelopeData(response));
              break;
          }
          await _vehicleOfflineStore.deleteOperation(opId);
        } catch (exception) {
          if (_isNetworkFailure(exception)) {
            break;
          }
        }
      }
    } finally {
      _syncingVehicles = false;
    }

    if (!_connectivityService.isOnline || _syncingIncidents) return;
    _syncingIncidents = true;
    try {
      final operations = await _incidentOfflineStore.loadPendingOperations();
      final idMap = <String, String>{};
      for (final operation in operations) {
        final opId = operation['id'] as int;
        final opType = operation['op_type']?.toString() ?? '';
        final resourceId = operation['resource_id']?.toString() ?? '';
        final payload = Map<String, dynamic>.from(operation['payload'] as Map);
        final mappedVehicleId = payload['vehicle_id']?.toString();
        if (mappedVehicleId != null && vehicleIdMap.containsKey(mappedVehicleId)) {
          payload['vehicle_id'] = vehicleIdMap[mappedVehicleId];
        }
        final resolvedId = idMap[resourceId] ?? resourceId;
        try {
          switch (opType) {
            case 'create':
              final response = await _remoteDataSource.createIncident(payload);
              final data = _envelopeData(response);
              final remoteId = data['id']?.toString() ?? resolvedId;
              idMap[resourceId] = remoteId;
              await _cacheIncident({
                ...data,
                'id': remoteId,
              });
              if (resourceId != remoteId) {
                await _removeIncidentCache(resourceId);
              }
              break;
            case 'update':
              final response = await _remoteDataSource.updateIncident(
                resolvedId,
                payload,
              );
              await _cacheIncident(_envelopeData(response));
              break;
            case 'cancel':
              final response = await _remoteDataSource.cancelIncident(
                resolvedId,
                payload,
              );
              await _cacheIncident(_envelopeData(response));
              break;
          }
          await _incidentOfflineStore.deleteOperation(opId);
        } catch (exception) {
          if (_isNetworkFailure(exception)) {
            break;
          }
        }
      }
    } finally {
      _syncingIncidents = false;
    }
  }

  @override
  Future<PagedResult<IncidentEntity>> listMyIncidents({
    int? page,
    int? pageSize,
  }) async {
    if (_connectivityService.isOnline) {
      try {
        await syncOfflineQueue();
        final response = await _remoteDataSource.listIncidents(
          page: page,
          pageSize: pageSize,
        );
        final data = _envelopeData(response);
        final items = listMapOf(data['items']).map(IncidentModel.fromJson).toList();
        await _cacheIncidentsFromRemote(listMapOf(data['items']));
        return PagedResult<IncidentEntity>(
          items: items,
          pagination: _pagination(data),
        );
      } catch (exception) {
        if (!_isNetworkFailure(exception)) rethrow;
      }
    }

    final cached = await _cachedIncidentMaps();
    final items = cached.map(IncidentModel.fromJson).toList();
    return PagedResult<IncidentEntity>(
      items: items,
      pagination: _offlinePagination(items.length),
    );
  }

  @override
  Future<IncidentEntity> createIncident(IncidentUpsertInput input) async {
    if (_connectivityService.isOnline) {
      try {
        final response = await _remoteDataSource.createIncident(input.toJson());
        final data = _envelopeData(response);
        await _cacheIncident(data);
        return IncidentModel.fromJson(data);
      } catch (exception) {
        if (!_isNetworkFailure(exception)) rethrow;
      }
    }

    final tempId = _tempId('local-incident');
    final now = DateTime.now().toIso8601String();
    final localMap = <String, dynamic>{
      'id': tempId,
      'customer_id': '',
      'vehicle_id': input.vehicleId,
      'incident_code': 'LOCAL-${DateTime.now().millisecondsSinceEpoch}',
      'title': input.description?.trim().isNotEmpty == true
          ? input.description!.trim()
          : 'Incidente pendiente',
      'description': input.description,
      'latitude': input.latitude,
      'longitude': input.longitude,
      'priority': input.priority ?? 'MEDIUM',
      'status': 'PENDING_SYNC',
      'reported_at': now,
      'created_at': now,
      'updated_at': now,
      'offline_state': 'pending_create',
      'ai_state': 'pending_sync',
    };
    await _cacheIncident(localMap);
    await _incidentOfflineStore.queueOperation(
      opType: 'create',
      resourceId: tempId,
      payload: input.toJson(),
    );
    return IncidentModel.fromJson(localMap);
  }

  @override
  Future<IncidentEntity> getIncident(String incidentId) async {
    if (_connectivityService.isOnline) {
      try {
        final response = await _remoteDataSource.getIncident(incidentId);
        return IncidentModel.fromJson(_envelopeData(response));
      } catch (exception) {
        if (!_isNetworkFailure(exception)) rethrow;
      }
    }

    final cached = await _cachedIncidentMaps();
    final local = cached.firstWhere(
      (item) => item['id']?.toString() == incidentId,
      orElse: () => <String, dynamic>{},
    );
    if (local.isNotEmpty) {
      return IncidentModel.fromJson(local);
    }
    throw NetworkFailure('No hay conexión y el incidente no está en caché.');
  }

  @override
  Future<IncidentEntity> updateIncident(
    String incidentId,
    IncidentUpsertInput input,
  ) async {
    if (_connectivityService.isOnline) {
      try {
        final response =
            await _remoteDataSource.updateIncident(incidentId, input.toJson());
        final data = _envelopeData(response);
        await _cacheIncident(data);
        return IncidentModel.fromJson(data);
      } catch (exception) {
        if (!_isNetworkFailure(exception)) rethrow;
      }
    }

    final cached = await _cachedIncidentMaps();
    final existing = cached.firstWhere(
      (item) => item['id']?.toString() == incidentId,
      orElse: () => <String, dynamic>{},
    );
    final now = DateTime.now().toIso8601String();
    final localMap = <String, dynamic>{
      ...existing,
      ...input.toJson(),
      'id': incidentId,
      'title': stringOf(existing['title']) ??
          (input.description?.trim().isNotEmpty == true
              ? input.description!.trim()
              : 'Incidente pendiente'),
      'status': existing['status'] ?? 'PENDING_SYNC',
      'updated_at': now,
      'offline_state': 'pending_update',
    };
    await _cacheIncident(localMap);
    await _incidentOfflineStore.queueOperation(
      opType: 'update',
      resourceId: incidentId,
      payload: input.toJson(),
    );
    return IncidentModel.fromJson(localMap);
  }

  @override
  Future<IncidentEntity> cancelIncident(
    String incidentId,
    IncidentCancelInput input,
  ) async {
    if (_connectivityService.isOnline) {
      try {
        final response =
            await _remoteDataSource.cancelIncident(incidentId, input.toJson());
        final data = _envelopeData(response);
        await _cacheIncident(data);
        return IncidentModel.fromJson(data);
      } catch (exception) {
        if (!_isNetworkFailure(exception)) rethrow;
      }
    }

    final cached = await _cachedIncidentMaps();
    final existing = cached.firstWhere(
      (item) => item['id']?.toString() == incidentId,
      orElse: () => <String, dynamic>{},
    );
    final now = DateTime.now().toIso8601String();
    final localMap = <String, dynamic>{
      ...existing,
      'id': incidentId,
      'status': 'CANCELLED',
      'cancelled_at': now,
      'updated_at': now,
      'offline_state': 'pending_cancel',
    };
    await _cacheIncident(localMap);
    await _incidentOfflineStore.queueOperation(
      opType: 'cancel',
      resourceId: incidentId,
      payload: input.toJson(),
    );
    return IncidentModel.fromJson(localMap);
  }

  @override
  Future<Map<String, dynamic>> runIncidentAiAnalysis(String incidentId) async {
    final response = await _remoteDataSource.runIncidentAiAnalysis(incidentId);
    return _envelopeData(response);
  }

  @override
  Future<PagedResult<Map<String, dynamic>>> listMyAssignments({
    String? assignmentStatus,
    int? page,
    int? pageSize,
  }) async {
    final response = await _remoteDataSource.listAssignments(
      assignmentStatus: assignmentStatus,
      page: page,
      pageSize: pageSize,
    );
    return _paged<Map<String, dynamic>>(
      response,
      (json) => json,
    );
  }

  @override
  Future<Map<String, dynamic>> getMyAssignment(String assignmentId) async {
    final response = await _remoteDataSource.getAssignment(assignmentId);
    return _envelopeData(response);
  }

  @override
  Future<PagedResult<Map<String, dynamic>>> listMyAssignmentTrackingEvents(
    String assignmentId, {
    String? eventType,
    int? page,
    int? pageSize,
  }) async {
    final response = await _remoteDataSource.listAssignmentTrackingEvents(
      assignmentId,
      eventType: eventType,
      page: page,
      pageSize: pageSize,
    );
    return _paged<Map<String, dynamic>>(response, (json) => json);
  }

  @override
  Future<Map<String, dynamic>> getMyAssignmentTrackingSession(
    String assignmentId,
  ) async {
    final response =
        await _remoteDataSource.getAssignmentTrackingSession(assignmentId);
    return _envelopeData(response);
  }
}

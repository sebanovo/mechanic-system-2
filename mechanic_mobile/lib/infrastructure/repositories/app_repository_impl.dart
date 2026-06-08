import '../../domain/entities/app_entities.dart';
import '../../domain/repositories/app_repositories.dart';
import '../datasources/client_remote_datasource.dart';
import '../models/app_models.dart';

class ClientRepositoryImpl
    implements ClientRepository, SessionRepository, VehicleRepository, IncidentRepository {
  ClientRepositoryImpl(this._remoteDataSource);

  final ClientRemoteDataSource _remoteDataSource;

  Map<String, dynamic> _envelopeData(Map<String, dynamic> response) {
    final data = response['data'];
    return data is Map ? Map<String, dynamic>.from(data) : <String, dynamic>{};
  }

  PaginationEntity _pagination(Map<String, dynamic> data) {
    return PaginationModel.fromJson(mapOf(data['pagination']));
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
    final response = await _remoteDataSource.listVehicles(
      page: page,
      pageSize: pageSize,
    );
    return _paged<VehicleEntity>(
      response,
      (json) => VehicleModel.fromJson(json),
    );
  }

  @override
  Future<VehicleEntity> createVehicle(VehicleUpsertInput input) async {
    final response = await _remoteDataSource.createVehicle(input.toJson());
    return VehicleModel.fromJson(_envelopeData(response));
  }

  @override
  Future<VehicleDetailEntity> getVehicle(String vehicleId) async {
    final response = await _remoteDataSource.getVehicle(vehicleId);
    return VehicleDetailModel.fromJson(_envelopeData(response));
  }

  @override
  Future<VehicleEntity> updateVehicle(
    String vehicleId,
    VehicleUpsertInput input,
  ) async {
    final response =
        await _remoteDataSource.updateVehicle(vehicleId, input.toJson());
    return VehicleModel.fromJson(_envelopeData(response));
  }

  @override
  Future<VehicleEntity> deleteVehicle(String vehicleId) async {
    final response = await _remoteDataSource.deleteVehicle(vehicleId);
    return VehicleModel.fromJson(_envelopeData(response));
  }

  @override
  Future<VehicleEntity> changeVehicleStatus(
    String vehicleId,
    VehicleStatusChangeInput input,
  ) async {
    final response =
        await _remoteDataSource.changeVehicleStatus(vehicleId, input.toJson());
    return VehicleModel.fromJson(_envelopeData(response));
  }

  @override
  Future<PagedResult<IncidentEntity>> listMyIncidents({
    int? page,
    int? pageSize,
  }) async {
    final response = await _remoteDataSource.listIncidents(
      page: page,
      pageSize: pageSize,
    );
    return _paged<IncidentEntity>(
      response,
      (json) => IncidentModel.fromJson(json),
    );
  }

  @override
  Future<IncidentEntity> createIncident(IncidentUpsertInput input) async {
    final response = await _remoteDataSource.createIncident(input.toJson());
    return IncidentModel.fromJson(_envelopeData(response));
  }

  @override
  Future<IncidentEntity> getIncident(String incidentId) async {
    final response = await _remoteDataSource.getIncident(incidentId);
    return IncidentModel.fromJson(_envelopeData(response));
  }

  @override
  Future<IncidentEntity> updateIncident(
    String incidentId,
    IncidentUpsertInput input,
  ) async {
    final response =
        await _remoteDataSource.updateIncident(incidentId, input.toJson());
    return IncidentModel.fromJson(_envelopeData(response));
  }

  @override
  Future<IncidentEntity> cancelIncident(
    String incidentId,
    IncidentCancelInput input,
  ) async {
    final response =
        await _remoteDataSource.cancelIncident(incidentId, input.toJson());
    return IncidentModel.fromJson(_envelopeData(response));
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

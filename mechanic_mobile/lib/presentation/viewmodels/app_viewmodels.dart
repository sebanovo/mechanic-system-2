import 'package:flutter/foundation.dart';

import '../../core/error/failures.dart';
import '../../domain/entities/app_entities.dart';
import '../../domain/usecases/app_usecases.dart';

class AppShellViewModel extends ChangeNotifier {
  int _selectedIndex = 0;

  int get selectedIndex => _selectedIndex;

  void setIndex(int value) {
    if (_selectedIndex == value) return;
    _selectedIndex = value;
    notifyListeners();
  }
}

class ProfileViewModel extends ChangeNotifier {
  ProfileViewModel({
    required GetMyProfileUseCase getMyProfile,
    required UpdateMyProfileUseCase updateMyProfile,
    required ChangePasswordUseCase changePassword,
  })  : _getMyProfile = getMyProfile,
        _updateMyProfile = updateMyProfile,
        _changePassword = changePassword;

  final GetMyProfileUseCase _getMyProfile;
  final UpdateMyProfileUseCase _updateMyProfile;
  final ChangePasswordUseCase _changePassword;

  ClientEntity? profile;
  bool loading = false;
  bool saving = false;
  String? error;
  String? message;

  Future<void> loadProfile() async {
    loading = true;
    error = null;
    notifyListeners();
    try {
      profile = await _getMyProfile();
    } catch (exception) {
      error = _errorMessage(exception);
    } finally {
      loading = false;
      notifyListeners();
    }
  }

  Future<bool> updateProfile(ClientUpdateInput input) async {
    saving = true;
    error = null;
    message = null;
    notifyListeners();
    try {
      profile = await _updateMyProfile(input);
      message = 'Perfil actualizado';
      return true;
    } catch (exception) {
      error = _errorMessage(exception);
      return false;
    } finally {
      saving = false;
      notifyListeners();
    }
  }

  Future<bool> updatePassword(PasswordChangeInput input) async {
    saving = true;
    error = null;
    message = null;
    notifyListeners();
    try {
      message = await _changePassword(input);
      return true;
    } catch (exception) {
      error = _errorMessage(exception);
      return false;
    } finally {
      saving = false;
      notifyListeners();
    }
  }
}

class SessionsViewModel extends ChangeNotifier {
  SessionsViewModel({
    required ListMySessionsUseCase listMySessions,
    required RevokeSessionUseCase revokeSession,
  })  : _listMySessions = listMySessions,
        _revokeSession = revokeSession;

  final ListMySessionsUseCase _listMySessions;
  final RevokeSessionUseCase _revokeSession;

  PagedResult<SessionEntity>? sessions;
  bool loading = false;
  bool submitting = false;
  String? error;
  String? message;

  Future<void> loadSessions() async {
    loading = true;
    error = null;
    notifyListeners();
    try {
      sessions = await _listMySessions();
    } catch (exception) {
      error = _errorMessage(exception);
    } finally {
      loading = false;
      notifyListeners();
    }
  }

  Future<bool> revoke(String sessionId) async {
    submitting = true;
    error = null;
    message = null;
    notifyListeners();
    try {
      await _revokeSession(sessionId);
      message = 'Sesión revocada';
      await loadSessions();
      return true;
    } catch (exception) {
      error = _errorMessage(exception);
      return false;
    } finally {
      submitting = false;
      notifyListeners();
    }
  }
}

class VehiclesViewModel extends ChangeNotifier {
  VehiclesViewModel({
    required ListMyVehiclesUseCase listMyVehicles,
    required CreateVehicleUseCase createVehicle,
    required GetVehicleUseCase getVehicle,
    required UpdateVehicleUseCase updateVehicle,
    required DeleteVehicleUseCase deleteVehicle,
    required ChangeVehicleStatusUseCase changeVehicleStatus,
  })  : _listMyVehicles = listMyVehicles,
        _createVehicle = createVehicle,
        _getVehicle = getVehicle,
        _updateVehicle = updateVehicle,
        _deleteVehicle = deleteVehicle,
        _changeVehicleStatus = changeVehicleStatus;

  final ListMyVehiclesUseCase _listMyVehicles;
  final CreateVehicleUseCase _createVehicle;
  final GetVehicleUseCase _getVehicle;
  final UpdateVehicleUseCase _updateVehicle;
  final DeleteVehicleUseCase _deleteVehicle;
  final ChangeVehicleStatusUseCase _changeVehicleStatus;

  PagedResult<VehicleEntity>? vehicles;
  VehicleDetailEntity? selectedVehicle;
  bool loading = false;
  bool detailLoading = false;
  bool submitting = false;
  String? error;
  String? message;

  Future<void> loadVehicles() async {
    loading = true;
    error = null;
    notifyListeners();
    try {
      vehicles = await _listMyVehicles();
    } catch (exception) {
      error = _errorMessage(exception);
    } finally {
      loading = false;
      notifyListeners();
    }
  }

  Future<void> loadVehicle(String vehicleId) async {
    detailLoading = true;
    error = null;
    notifyListeners();
    try {
      selectedVehicle = await _getVehicle(vehicleId);
    } catch (exception) {
      error = _errorMessage(exception);
    } finally {
      detailLoading = false;
      notifyListeners();
    }
  }

  Future<bool> create(VehicleUpsertInput input) async {
    submitting = true;
    error = null;
    message = null;
    notifyListeners();
    try {
      await _createVehicle(input);
      message = 'Vehículo creado';
      await loadVehicles();
      return true;
    } catch (exception) {
      error = _errorMessage(exception);
      return false;
    } finally {
      submitting = false;
      notifyListeners();
    }
  }

  Future<bool> update(String vehicleId, VehicleUpsertInput input) async {
    submitting = true;
    error = null;
    message = null;
    notifyListeners();
    try {
      await _updateVehicle(vehicleId, input);
      message = 'Vehículo actualizado';
      await loadVehicles();
      await loadVehicle(vehicleId);
      return true;
    } catch (exception) {
      error = _errorMessage(exception);
      return false;
    } finally {
      submitting = false;
      notifyListeners();
    }
  }

  Future<bool> remove(String vehicleId) async {
    submitting = true;
    error = null;
    message = null;
    notifyListeners();
    try {
      await _deleteVehicle(vehicleId);
      message = 'Vehículo eliminado';
      await loadVehicles();
      if (selectedVehicle?.vehicle.id == vehicleId) {
        selectedVehicle = null;
      }
      return true;
    } catch (exception) {
      error = _errorMessage(exception);
      return false;
    } finally {
      submitting = false;
      notifyListeners();
    }
  }

  Future<bool> changeStatus(String vehicleId, VehicleStatusChangeInput input) async {
    submitting = true;
    error = null;
    message = null;
    notifyListeners();
    try {
      await _changeVehicleStatus(vehicleId, input);
      message = 'Estado actualizado';
      await loadVehicles();
      await loadVehicle(vehicleId);
      return true;
    } catch (exception) {
      error = _errorMessage(exception);
      return false;
    } finally {
      submitting = false;
      notifyListeners();
    }
  }
}

class IncidentsViewModel extends ChangeNotifier {
  IncidentsViewModel({
    required ListMyIncidentsUseCase listMyIncidents,
    required CreateIncidentUseCase createIncident,
    required GetIncidentUseCase getIncident,
    required UpdateIncidentUseCase updateIncident,
    required CancelIncidentUseCase cancelIncident,
  })  : _listMyIncidents = listMyIncidents,
        _createIncident = createIncident,
        _getIncident = getIncident,
        _updateIncident = updateIncident,
        _cancelIncident = cancelIncident;

  final ListMyIncidentsUseCase _listMyIncidents;
  final CreateIncidentUseCase _createIncident;
  final GetIncidentUseCase _getIncident;
  final UpdateIncidentUseCase _updateIncident;
  final CancelIncidentUseCase _cancelIncident;

  PagedResult<IncidentEntity>? incidents;
  IncidentEntity? selectedIncident;
  bool loading = false;
  bool detailLoading = false;
  bool submitting = false;
  String? error;
  String? message;

  Future<void> loadIncidents() async {
    loading = true;
    error = null;
    notifyListeners();
    try {
      incidents = await _listMyIncidents();
    } catch (exception) {
      error = _errorMessage(exception);
    } finally {
      loading = false;
      notifyListeners();
    }
  }

  Future<void> loadIncident(String incidentId) async {
    detailLoading = true;
    error = null;
    notifyListeners();
    try {
      selectedIncident = await _getIncident(incidentId);
    } catch (exception) {
      error = _errorMessage(exception);
    } finally {
      detailLoading = false;
      notifyListeners();
    }
  }

  Future<bool> create(IncidentUpsertInput input) async {
    submitting = true;
    error = null;
    message = null;
    notifyListeners();
    try {
      await _createIncident(input);
      message = 'Incidente creado';
      await loadIncidents();
      return true;
    } catch (exception) {
      error = _errorMessage(exception);
      return false;
    } finally {
      submitting = false;
      notifyListeners();
    }
  }

  Future<bool> update(String incidentId, IncidentUpsertInput input) async {
    submitting = true;
    error = null;
    message = null;
    notifyListeners();
    try {
      await _updateIncident(incidentId, input);
      message = 'Incidente actualizado';
      await loadIncidents();
      await loadIncident(incidentId);
      return true;
    } catch (exception) {
      error = _errorMessage(exception);
      return false;
    } finally {
      submitting = false;
      notifyListeners();
    }
  }

  Future<bool> cancel(String incidentId, IncidentCancelInput input) async {
    submitting = true;
    error = null;
    message = null;
    notifyListeners();
    try {
      await _cancelIncident(incidentId, input);
      message = 'Incidente cancelado';
      await loadIncidents();
      await loadIncident(incidentId);
      return true;
    } catch (exception) {
      error = _errorMessage(exception);
      return false;
    } finally {
      submitting = false;
      notifyListeners();
    }
  }
}

String _errorMessage(Object error) {
  return appFailureMessage(error);
}

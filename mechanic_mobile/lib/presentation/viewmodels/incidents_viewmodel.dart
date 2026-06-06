import 'package:flutter/foundation.dart';

import '../../core/error/failures.dart';
import '../../domain/entities/app_entities.dart';
import '../../domain/usecases/app_usecases.dart';

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
  bool loaded = false;
  bool detailLoaded = false;
  String? error;
  String? message;

  Future<void> loadIncidents() async {
    loading = true;
    error = null;
    notifyListeners();
    try {
      incidents = await _listMyIncidents();
    } catch (exception) {
      error = appFailureMessage(exception);
    } finally {
      loading = false;
      loaded = true;
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
      error = appFailureMessage(exception);
    } finally {
      detailLoading = false;
      detailLoaded = true;
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
      error = appFailureMessage(exception);
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
      error = appFailureMessage(exception);
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
      error = appFailureMessage(exception);
      return false;
    } finally {
      submitting = false;
      notifyListeners();
    }
  }
}

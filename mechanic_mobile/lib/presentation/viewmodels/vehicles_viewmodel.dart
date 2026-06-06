import 'package:flutter/foundation.dart';

import '../../core/error/failures.dart';
import '../../domain/entities/app_entities.dart';
import '../../domain/usecases/app_usecases.dart';

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
  bool loaded = false;
  bool detailLoaded = false;
  String? error;
  String? message;

  Future<void> loadVehicles() async {
    loading = true;
    error = null;
    notifyListeners();
    try {
      vehicles = await _listMyVehicles();
    } catch (exception) {
      error = appFailureMessage(exception);
    } finally {
      loading = false;
      loaded = true;
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
      error = appFailureMessage(exception);
    } finally {
      detailLoading = false;
      detailLoaded = true;
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
      error = appFailureMessage(exception);
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
      error = appFailureMessage(exception);
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
      error = appFailureMessage(exception);
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
      error = appFailureMessage(exception);
      return false;
    } finally {
      submitting = false;
      notifyListeners();
    }
  }
}

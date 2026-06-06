import '../entities/app_entities.dart';
import '../repositories/app_repositories.dart';

class GetMyProfileUseCase {
  GetMyProfileUseCase(this._repository);

  final ClientRepository _repository;

  Future<ClientEntity> call() => _repository.getMe();
}

class UpdateMyProfileUseCase {
  UpdateMyProfileUseCase(this._repository);

  final ClientRepository _repository;

  Future<ClientEntity> call(ClientUpdateInput input) =>
      _repository.updateMe(input);
}

class ChangePasswordUseCase {
  ChangePasswordUseCase(this._repository);

  final ClientRepository _repository;

  Future<String> call(PasswordChangeInput input) =>
      _repository.changePassword(input);
}

class ListMySessionsUseCase {
  ListMySessionsUseCase(this._repository);

  final SessionRepository _repository;

  Future<PagedResult<SessionEntity>> call({int? page, int? pageSize}) =>
      _repository.listMySessions(page: page, pageSize: pageSize);
}

class RevokeSessionUseCase {
  RevokeSessionUseCase(this._repository);

  final SessionRepository _repository;

  Future<SessionEntity> call(String sessionId) =>
      _repository.revokeSession(sessionId);
}

class ListMyVehiclesUseCase {
  ListMyVehiclesUseCase(this._repository);

  final VehicleRepository _repository;

  Future<PagedResult<VehicleEntity>> call({int? page, int? pageSize}) =>
      _repository.listMyVehicles(page: page, pageSize: pageSize);
}

class CreateVehicleUseCase {
  CreateVehicleUseCase(this._repository);

  final VehicleRepository _repository;

  Future<VehicleEntity> call(VehicleUpsertInput input) =>
      _repository.createVehicle(input);
}

class GetVehicleUseCase {
  GetVehicleUseCase(this._repository);

  final VehicleRepository _repository;

  Future<VehicleDetailEntity> call(String vehicleId) =>
      _repository.getVehicle(vehicleId);
}

class UpdateVehicleUseCase {
  UpdateVehicleUseCase(this._repository);

  final VehicleRepository _repository;

  Future<VehicleEntity> call(String vehicleId, VehicleUpsertInput input) =>
      _repository.updateVehicle(vehicleId, input);
}

class DeleteVehicleUseCase {
  DeleteVehicleUseCase(this._repository);

  final VehicleRepository _repository;

  Future<VehicleEntity> call(String vehicleId) =>
      _repository.deleteVehicle(vehicleId);
}

class ChangeVehicleStatusUseCase {
  ChangeVehicleStatusUseCase(this._repository);

  final VehicleRepository _repository;

  Future<VehicleEntity> call(
    String vehicleId,
    VehicleStatusChangeInput input,
  ) =>
      _repository.changeVehicleStatus(vehicleId, input);
}

class ListMyIncidentsUseCase {
  ListMyIncidentsUseCase(this._repository);

  final IncidentRepository _repository;

  Future<PagedResult<IncidentEntity>> call({int? page, int? pageSize}) =>
      _repository.listMyIncidents(page: page, pageSize: pageSize);
}

class CreateIncidentUseCase {
  CreateIncidentUseCase(this._repository);

  final IncidentRepository _repository;

  Future<IncidentEntity> call(IncidentUpsertInput input) =>
      _repository.createIncident(input);
}

class GetIncidentUseCase {
  GetIncidentUseCase(this._repository);

  final IncidentRepository _repository;

  Future<IncidentEntity> call(String incidentId) =>
      _repository.getIncident(incidentId);
}

class UpdateIncidentUseCase {
  UpdateIncidentUseCase(this._repository);

  final IncidentRepository _repository;

  Future<IncidentEntity> call(String incidentId, IncidentUpsertInput input) =>
      _repository.updateIncident(incidentId, input);
}

class CancelIncidentUseCase {
  CancelIncidentUseCase(this._repository);

  final IncidentRepository _repository;

  Future<IncidentEntity> call(String incidentId, IncidentCancelInput input) =>
      _repository.cancelIncident(incidentId, input);
}

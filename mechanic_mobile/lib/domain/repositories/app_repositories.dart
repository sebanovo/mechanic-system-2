import '../entities/app_entities.dart';

abstract class ClientRepository {
  Future<ClientEntity> getMe();
  Future<ClientEntity> updateMe(ClientUpdateInput input);
  Future<String> changePassword(PasswordChangeInput input);
}

abstract class SessionRepository {
  Future<PagedResult<SessionEntity>> listMySessions({
    int? page,
    int? pageSize,
  });

  Future<SessionEntity> revokeSession(String sessionId);
}

abstract class VehicleRepository {
  Future<PagedResult<VehicleEntity>> listMyVehicles({
    int? page,
    int? pageSize,
  });

  Future<VehicleEntity> createVehicle(VehicleUpsertInput input);
  Future<VehicleDetailEntity> getVehicle(String vehicleId);
  Future<VehicleEntity> updateVehicle(String vehicleId, VehicleUpsertInput input);
  Future<VehicleEntity> deleteVehicle(String vehicleId);
  Future<VehicleEntity> changeVehicleStatus(
    String vehicleId,
    VehicleStatusChangeInput input,
  );
}

abstract class IncidentRepository {
  Future<PagedResult<IncidentEntity>> listMyIncidents({
    int? page,
    int? pageSize,
  });

  Future<IncidentEntity> createIncident(IncidentUpsertInput input);
  Future<IncidentEntity> getIncident(String incidentId);
  Future<IncidentEntity> updateIncident(
    String incidentId,
    IncidentUpsertInput input,
  );
  Future<IncidentEntity> cancelIncident(
    String incidentId,
    IncidentCancelInput input,
  );
}

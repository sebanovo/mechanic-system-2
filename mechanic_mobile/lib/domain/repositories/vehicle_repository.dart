import '../entities/app_entities.dart';

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

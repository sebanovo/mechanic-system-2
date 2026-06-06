import '../../entities/app_entities.dart';
import '../../repositories/vehicle_repository.dart';

class UpdateVehicleUseCase {
  UpdateVehicleUseCase(this._repository);

  final VehicleRepository _repository;

  Future<VehicleEntity> call(String vehicleId, VehicleUpsertInput input) =>
      _repository.updateVehicle(vehicleId, input);
}

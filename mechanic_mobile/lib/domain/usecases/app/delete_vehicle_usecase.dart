import '../../entities/app_entities.dart';
import '../../repositories/vehicle_repository.dart';

class DeleteVehicleUseCase {
  DeleteVehicleUseCase(this._repository);

  final VehicleRepository _repository;

  Future<VehicleEntity> call(String vehicleId) =>
      _repository.deleteVehicle(vehicleId);
}

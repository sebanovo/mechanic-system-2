import '../../entities/app_entities.dart';
import '../../repositories/vehicle_repository.dart';

class GetVehicleUseCase {
  GetVehicleUseCase(this._repository);

  final VehicleRepository _repository;

  Future<VehicleDetailEntity> call(String vehicleId) =>
      _repository.getVehicle(vehicleId);
}

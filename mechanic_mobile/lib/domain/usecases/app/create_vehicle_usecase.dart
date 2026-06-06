import '../../entities/app_entities.dart';
import '../../repositories/vehicle_repository.dart';

class CreateVehicleUseCase {
  CreateVehicleUseCase(this._repository);

  final VehicleRepository _repository;

  Future<VehicleEntity> call(VehicleUpsertInput input) =>
      _repository.createVehicle(input);
}

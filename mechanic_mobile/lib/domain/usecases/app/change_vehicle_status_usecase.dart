import '../../entities/app_entities.dart';
import '../../repositories/vehicle_repository.dart';

class ChangeVehicleStatusUseCase {
  ChangeVehicleStatusUseCase(this._repository);

  final VehicleRepository _repository;

  Future<VehicleEntity> call(
    String vehicleId,
    VehicleStatusChangeInput input,
  ) =>
      _repository.changeVehicleStatus(vehicleId, input);
}

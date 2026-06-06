import '../../entities/app_entities.dart';
import '../../repositories/vehicle_repository.dart';

class ListMyVehiclesUseCase {
  ListMyVehiclesUseCase(this._repository);

  final VehicleRepository _repository;

  Future<PagedResult<VehicleEntity>> call({int? page, int? pageSize}) =>
      _repository.listMyVehicles(page: page, pageSize: pageSize);
}

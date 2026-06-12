import '../../repositories/vehicle_repository.dart';

class SyncVehicleOfflineQueueUseCase {
  SyncVehicleOfflineQueueUseCase(this._repository);

  final VehicleRepository _repository;

  Future<void> call() => _repository.syncOfflineQueue();
}

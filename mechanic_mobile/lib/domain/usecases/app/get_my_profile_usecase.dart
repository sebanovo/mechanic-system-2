import '../../entities/app_entities.dart';
import '../../repositories/client_repository.dart';

class GetMyProfileUseCase {
  GetMyProfileUseCase(this._repository);

  final ClientRepository _repository;

  Future<ClientEntity> call() => _repository.getMe();
}

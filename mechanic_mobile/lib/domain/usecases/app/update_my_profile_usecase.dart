import '../../entities/app_entities.dart';
import '../../repositories/client_repository.dart';

class UpdateMyProfileUseCase {
  UpdateMyProfileUseCase(this._repository);

  final ClientRepository _repository;

  Future<ClientEntity> call(ClientUpdateInput input) =>
      _repository.updateMe(input);
}

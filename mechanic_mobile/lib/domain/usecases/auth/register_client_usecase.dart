import '../../entities/auth_entities.dart';
import '../../repositories/auth_repository.dart';

class RegisterClientUseCase {
  RegisterClientUseCase(this._repository);

  final AuthRepository _repository;

  Future<AuthContextEntity> call(RegisterClientInput input) =>
      _repository.registerClient(input);
}

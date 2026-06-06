import '../../entities/auth_entities.dart';
import '../../repositories/auth_repository.dart';

class LoginUseCase {
  LoginUseCase(this._repository);

  final AuthRepository _repository;

  Future<AuthContextEntity> call(LoginInput input) => _repository.login(input);
}

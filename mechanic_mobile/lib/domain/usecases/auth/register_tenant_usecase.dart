import '../../entities/auth_entities.dart';
import '../../repositories/auth_repository.dart';

class RegisterTenantUseCase {
  RegisterTenantUseCase(this._repository);

  final AuthRepository _repository;

  Future<AuthContextEntity> call(RegisterTenantInput input) =>
      _repository.registerTenant(input);
}

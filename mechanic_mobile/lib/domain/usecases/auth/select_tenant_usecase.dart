import '../../entities/auth_entities.dart';
import '../../repositories/auth_repository.dart';

class SelectTenantUseCase {
  SelectTenantUseCase(this._repository);

  final AuthRepository _repository;

  Future<AuthContextEntity> call(SelectTenantInput input) =>
      _repository.selectTenant(input);
}

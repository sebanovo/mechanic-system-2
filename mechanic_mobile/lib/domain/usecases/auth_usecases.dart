import '../entities/auth_entities.dart';
import '../repositories/auth_repository.dart';

class LoginUseCase {
  LoginUseCase(this._repository);
  final AuthRepository _repository;
  Future<AuthContextEntity> call(LoginInput input) => _repository.login(input);
}

class RegisterClientUseCase {
  RegisterClientUseCase(this._repository);
  final AuthRepository _repository;
  Future<AuthContextEntity> call(RegisterClientInput input) =>
      _repository.registerClient(input);
}

class RegisterTenantUseCase {
  RegisterTenantUseCase(this._repository);
  final AuthRepository _repository;
  Future<AuthContextEntity> call(RegisterTenantInput input) =>
      _repository.registerTenant(input);
}

class SelectTenantUseCase {
  SelectTenantUseCase(this._repository);
  final AuthRepository _repository;
  Future<AuthContextEntity> call(SelectTenantInput input) =>
      _repository.selectTenant(input);
}

class RefreshAuthUseCase {
  RefreshAuthUseCase(this._repository);
  final AuthRepository _repository;
  Future<AuthContextEntity> call() => _repository.refresh();
}

class LogoutUseCase {
  LogoutUseCase(this._repository);
  final AuthRepository _repository;
  Future<void> call() => _repository.logout();
}

class MeAuthUseCase {
  MeAuthUseCase(this._repository);
  final AuthRepository _repository;
  Future<AuthContextEntity> call() => _repository.me();
}

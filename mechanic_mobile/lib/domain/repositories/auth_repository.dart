import '../entities/auth_entities.dart';

abstract class AuthRepository {
  Future<AuthContextEntity> login(LoginInput input);
  Future<AuthContextEntity> registerClient(RegisterClientInput input);
  Future<AuthContextEntity> registerTenant(RegisterTenantInput input);
  Future<AuthContextEntity> selectTenant(SelectTenantInput input);
  Future<AuthContextEntity> refresh();
  Future<void> logout();
  Future<AuthContextEntity> me();
}

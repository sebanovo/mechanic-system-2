import '../entities/app_entities.dart';

abstract class ClientRepository {
  Future<ClientEntity> getMe();
  Future<ClientEntity> updateMe(ClientUpdateInput input);
  Future<String> changePassword(PasswordChangeInput input);
}

import '../../entities/app_entities.dart';
import '../../repositories/client_repository.dart';

class ChangePasswordUseCase {
  ChangePasswordUseCase(this._repository);

  final ClientRepository _repository;

  Future<String> call(PasswordChangeInput input) =>
      _repository.changePassword(input);
}

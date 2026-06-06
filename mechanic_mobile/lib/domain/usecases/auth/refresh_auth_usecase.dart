import '../../entities/auth_entities.dart';
import '../../repositories/auth_repository.dart';

class RefreshAuthUseCase {
  RefreshAuthUseCase(this._repository);

  final AuthRepository _repository;

  Future<AuthContextEntity> call() => _repository.refresh();
}

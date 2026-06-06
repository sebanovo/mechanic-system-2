import '../../entities/app_entities.dart';
import '../../repositories/session_repository.dart';

class RevokeSessionUseCase {
  RevokeSessionUseCase(this._repository);

  final SessionRepository _repository;

  Future<SessionEntity> call(String sessionId) =>
      _repository.revokeSession(sessionId);
}

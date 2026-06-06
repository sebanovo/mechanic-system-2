import '../entities/app_entities.dart';

abstract class SessionRepository {
  Future<PagedResult<SessionEntity>> listMySessions({
    int? page,
    int? pageSize,
  });

  Future<SessionEntity> revokeSession(String sessionId);
}

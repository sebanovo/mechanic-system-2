import '../../entities/app_entities.dart';
import '../../repositories/session_repository.dart';

class ListMySessionsUseCase {
  ListMySessionsUseCase(this._repository);

  final SessionRepository _repository;

  Future<PagedResult<SessionEntity>> call({int? page, int? pageSize}) =>
      _repository.listMySessions(page: page, pageSize: pageSize);
}

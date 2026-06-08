import '../../entities/app_entities.dart';
import '../../repositories/client_repository.dart';

class ListMyAssignmentsUseCase {
  ListMyAssignmentsUseCase(this._repository);

  final ClientRepository _repository;

  Future<PagedResult<Map<String, dynamic>>> call({
    String? assignmentStatus,
    int? page,
    int? pageSize,
  }) =>
      _repository.listMyAssignments(
        assignmentStatus: assignmentStatus,
        page: page,
        pageSize: pageSize,
      );
}

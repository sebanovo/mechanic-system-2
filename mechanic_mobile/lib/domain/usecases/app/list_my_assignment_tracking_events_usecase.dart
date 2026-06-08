import '../../entities/app_entities.dart';
import '../../repositories/client_repository.dart';

class ListMyAssignmentTrackingEventsUseCase {
  ListMyAssignmentTrackingEventsUseCase(this._repository);

  final ClientRepository _repository;

  Future<PagedResult<Map<String, dynamic>>> call(
    String assignmentId, {
    String? eventType,
    int? page,
    int? pageSize,
  }) =>
      _repository.listMyAssignmentTrackingEvents(
        assignmentId,
        eventType: eventType,
        page: page,
        pageSize: pageSize,
      );
}

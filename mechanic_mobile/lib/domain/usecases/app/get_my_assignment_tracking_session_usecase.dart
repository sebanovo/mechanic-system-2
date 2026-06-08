import '../../repositories/client_repository.dart';

class GetMyAssignmentTrackingSessionUseCase {
  GetMyAssignmentTrackingSessionUseCase(this._repository);

  final ClientRepository _repository;

  Future<Map<String, dynamic>> call(String assignmentId) =>
      _repository.getMyAssignmentTrackingSession(assignmentId);
}

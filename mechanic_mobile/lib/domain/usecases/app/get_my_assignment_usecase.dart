import '../../repositories/client_repository.dart';

class GetMyAssignmentUseCase {
  GetMyAssignmentUseCase(this._repository);

  final ClientRepository _repository;

  Future<Map<String, dynamic>> call(String assignmentId) =>
      _repository.getMyAssignment(assignmentId);
}

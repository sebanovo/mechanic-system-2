import '../entities/app_entities.dart';

abstract class ClientRepository {
  Future<ClientEntity> getMe();
  Future<ClientEntity> updateMe(ClientUpdateInput input);
  Future<String> changePassword(PasswordChangeInput input);

  Future<PagedResult<Map<String, dynamic>>> listMyAssignments({
    String? assignmentStatus,
    int? page,
    int? pageSize,
  });

  Future<Map<String, dynamic>> getMyAssignment(String assignmentId);
  Future<PagedResult<Map<String, dynamic>>> listMyAssignmentTrackingEvents(
    String assignmentId, {
    String? eventType,
    int? page,
    int? pageSize,
  });
  Future<Map<String, dynamic>> getMyAssignmentTrackingSession(String assignmentId);
}

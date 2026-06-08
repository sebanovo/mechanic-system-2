import '../../core/network/api_client.dart';

class ClientRemoteDataSource {
  ClientRemoteDataSource(this._apiClient);

  final ApiClient _apiClient;

  Future<Map<String, dynamic>> getMe() => _apiClient.get('/api/clients/me');
  Future<Map<String, dynamic>> updateMe(Map<String, dynamic> payload) =>
      _apiClient.put('/api/clients/me', data: payload);
  Future<Map<String, dynamic>> changePassword(Map<String, dynamic> payload) =>
      _apiClient.patch('/api/clients/me/password', data: payload);

  Future<Map<String, dynamic>> listSessions({
    int? page,
    int? pageSize,
  }) =>
      _apiClient.get(
        '/api/clients/me/sessions',
        queryParameters: _paging(page: page, pageSize: pageSize),
      );

  Future<Map<String, dynamic>> revokeSession(String sessionId) =>
      _apiClient.delete('/api/clients/me/sessions/$sessionId');

  Future<Map<String, dynamic>> listVehicles({
    int? page,
    int? pageSize,
  }) =>
      _apiClient.get(
        '/api/clients/me/vehicles',
        queryParameters: _paging(page: page, pageSize: pageSize),
      );

  Future<Map<String, dynamic>> createVehicle(Map<String, dynamic> payload) =>
      _apiClient.post('/api/clients/me/vehicles', data: payload);
  Future<Map<String, dynamic>> getVehicle(String vehicleId) =>
      _apiClient.get('/api/clients/me/vehicles/$vehicleId');
  Future<Map<String, dynamic>> updateVehicle(
    String vehicleId,
    Map<String, dynamic> payload,
  ) =>
      _apiClient.put('/api/clients/me/vehicles/$vehicleId', data: payload);
  Future<Map<String, dynamic>> deleteVehicle(String vehicleId) =>
      _apiClient.delete('/api/clients/me/vehicles/$vehicleId');
  Future<Map<String, dynamic>> changeVehicleStatus(
    String vehicleId,
    Map<String, dynamic> payload,
  ) =>
      _apiClient.patch(
        '/api/clients/me/vehicles/$vehicleId/status',
        data: payload,
      );

  Future<Map<String, dynamic>> listIncidents({
    int? page,
    int? pageSize,
  }) =>
      _apiClient.get(
        '/api/clients/me/incidents',
        queryParameters: _paging(page: page, pageSize: pageSize),
      );

  Future<Map<String, dynamic>> createIncident(Map<String, dynamic> payload) =>
      _apiClient.post('/api/clients/me/incidents', data: payload);
  Future<Map<String, dynamic>> getIncident(String incidentId) =>
      _apiClient.get('/api/clients/me/incidents/$incidentId');
  Future<Map<String, dynamic>> updateIncident(
    String incidentId,
    Map<String, dynamic> payload,
  ) =>
      _apiClient.put('/api/clients/me/incidents/$incidentId', data: payload);
  Future<Map<String, dynamic>> cancelIncident(
    String incidentId,
    Map<String, dynamic> payload,
  ) =>
      _apiClient.patch(
        '/api/clients/me/incidents/$incidentId/cancel',
        data: payload,
      );

  Future<Map<String, dynamic>> listAssignments({
    String? assignmentStatus,
    int? page,
    int? pageSize,
  }) =>
      _apiClient.get(
        '/api/clients/me/assignments',
        queryParameters: _query(
          assignmentStatus: assignmentStatus,
          page: page,
          pageSize: pageSize,
        ),
      );

  Future<Map<String, dynamic>> getAssignment(String assignmentId) =>
      _apiClient.get('/api/clients/me/assignments/$assignmentId');

  Future<Map<String, dynamic>> listAssignmentTrackingEvents(
    String assignmentId, {
    String? eventType,
    int? page,
    int? pageSize,
  }) =>
      _apiClient.get(
        '/api/clients/me/assignments/$assignmentId/tracking-events',
        queryParameters: _query(
          eventType: eventType,
          page: page,
          pageSize: pageSize,
        ),
      );

  Future<Map<String, dynamic>> getAssignmentTrackingSession(
    String assignmentId,
  ) =>
      _apiClient.get(
        '/api/clients/me/assignments/$assignmentId/tracking-session',
      );

  Future<Map<String, dynamic>> runIncidentAiAnalysis(String incidentId) =>
      _apiClient.post('/api/incidents/$incidentId/ai-analysis/run');

  Map<String, dynamic> _paging({int? page, int? pageSize}) {
    final query = <String, dynamic>{};
    if (page != null) query['page'] = page;
    if (pageSize != null) query['page_size'] = pageSize;
    return query;
  }

  Map<String, dynamic> _query({
    String? assignmentStatus,
    String? eventType,
    int? page,
    int? pageSize,
  }) {
    final query = _paging(page: page, pageSize: pageSize);
    if (assignmentStatus != null && assignmentStatus.isNotEmpty) {
      query['assignment_status'] = assignmentStatus;
    }
    if (eventType != null && eventType.isNotEmpty) {
      query['event_type'] = eventType;
    }
    return query;
  }
}

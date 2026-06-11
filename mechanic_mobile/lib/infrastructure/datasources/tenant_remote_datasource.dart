import '../../core/network/api_client.dart';

class TenantRemoteDataSource {
  TenantRemoteDataSource(this._apiClient);

  final ApiClient _apiClient;

  Future<Map<String, dynamic>> listMyTenants() => _apiClient.get('/api/tenants/me');

  Future<Map<String, dynamic>> getCurrentTenant() =>
      _apiClient.get('/api/tenants/current');

  Future<Map<String, dynamic>> getCurrentTenantDetail() =>
      _apiClient.get('/api/tenants/current/detail');

  Future<Map<String, dynamic>> getCurrentProfile() =>
      _apiClient.get('/api/tenants/current/profile');

  Future<Map<String, dynamic>> updateCurrentProfile(
    Map<String, dynamic> payload,
  ) =>
      _apiClient.put('/api/tenants/current/profile', data: payload);

  Future<Map<String, dynamic>> getCurrentSettings() =>
      _apiClient.get('/api/tenants/current/settings');

  Future<Map<String, dynamic>> updateCurrentSettings(
    Map<String, dynamic> payload,
  ) =>
      _apiClient.put('/api/tenants/current/settings', data: payload);

  Future<Map<String, dynamic>> createCurrentTenantNetwork(
    Map<String, dynamic> payload,
  ) =>
      _apiClient.post('/api/tenants/current/network', data: payload);

  Future<Map<String, dynamic>> getCurrentProviderProfile() =>
      _apiClient.get('/api/tenants/current/provider');

  Future<Map<String, dynamic>> updateCurrentProviderProfile(
    Map<String, dynamic> payload,
  ) =>
      _apiClient.put('/api/tenants/current/provider', data: payload);

  Future<Map<String, dynamic>> listCurrentTechnicians({
    String? status,
    int? page,
    int? pageSize,
  }) =>
      _apiClient.get(
        '/api/tenants/current/technicians',
        queryParameters: _paging(
          status: status,
          page: page,
          pageSize: pageSize,
        ),
      );

  Future<Map<String, dynamic>> createCurrentTechnician(
    Map<String, dynamic> payload,
  ) =>
      _apiClient.post('/api/tenants/current/technicians', data: payload);

  Future<Map<String, dynamic>> changeCurrentTechnicianStatus(
    String technicianId,
    Map<String, dynamic> payload,
  ) =>
      _apiClient.patch(
        '/api/tenants/current/technicians/$technicianId/status',
        data: payload,
      );

  Future<Map<String, dynamic>> deleteCurrentTechnician(String technicianId) =>
      _apiClient.delete('/api/tenants/current/technicians/$technicianId');

  Future<Map<String, dynamic>> getTechnicianAvailability(String technicianId) =>
      _apiClient.get(
        '/api/tenants/current/technicians/$technicianId/availability',
      );

  Future<Map<String, dynamic>> upsertTechnicianAvailability(
    String technicianId,
    Map<String, dynamic> payload,
  ) =>
      _apiClient.put(
        '/api/tenants/current/technicians/$technicianId/availability',
        data: payload,
      );

  Future<Map<String, dynamic>> listCurrentMembers({
    String? status,
    int? page,
    int? pageSize,
  }) =>
      _apiClient.get(
        '/api/tenants/current/members',
        queryParameters: _paging(
          status: status,
          page: page,
          pageSize: pageSize,
        ),
      );

  Future<Map<String, dynamic>> changeCurrentMemberStatus(
    String membershipId,
    Map<String, dynamic> payload,
  ) =>
      _apiClient.patch(
        '/api/tenants/current/members/$membershipId/status',
        data: payload,
      );

  Future<Map<String, dynamic>> getCurrentMember(String membershipId) =>
      _apiClient.get('/api/tenants/current/members/$membershipId');

  Future<Map<String, dynamic>> removeCurrentMember(String membershipId) =>
      _apiClient.delete('/api/tenants/current/members/$membershipId');

  Future<Map<String, dynamic>> listMyTenantSessions({
    int? page,
    int? pageSize,
  }) =>
      _apiClient.get(
        '/api/tenants/current/sessions/me',
        queryParameters: _paging(page: page, pageSize: pageSize),
      );

  Future<Map<String, dynamic>> revokeMyTenantSession(String sessionId) =>
      _apiClient.delete('/api/tenants/current/sessions/me/$sessionId');

  Future<Map<String, dynamic>> listCurrentTenantAuditEvents({
    String? actorId,
    String? eventType,
    String? resourceType,
    String? resourceId,
    String? createdFrom,
    String? createdTo,
    int? page,
    int? pageSize,
  }) =>
      _apiClient.get(
        '/api/tenants/current/audit-events',
        queryParameters: _paging(
          actorId: actorId,
          eventType: eventType,
          resourceType: resourceType,
          resourceId: resourceId,
          createdFrom: createdFrom,
          createdTo: createdTo,
          page: page,
          pageSize: pageSize,
        ),
      );

  Future<Map<String, dynamic>> getCurrentTenantResourceHistory(
    String resourceType,
    String resourceId,
  ) =>
      _apiClient.get(
        '/api/tenants/current/audit-events/resources/$resourceType/$resourceId',
      );

  Future<Map<String, dynamic>> getCurrentTenantAuditEvent(String auditEventId) =>
      _apiClient.get('/api/tenants/current/audit-events/$auditEventId');

  Future<Map<String, dynamic>> listCurrentServiceCatalog({
    String? search,
    String? category,
    int? page,
    int? pageSize,
  }) =>
      _apiClient.get(
        '/api/tenants/current/service-catalog',
        queryParameters: _paging(
          search: search,
          category: category,
          page: page,
          pageSize: pageSize,
        ),
      );

  Future<Map<String, dynamic>> getCurrentServiceCatalog(
    String serviceCatalogId,
  ) =>
      _apiClient.get('/api/tenants/current/service-catalog/$serviceCatalogId');

  Future<Map<String, dynamic>> listCurrentProviderServices({
    bool? isAvailable,
    String? category,
    String? search,
    int? page,
    int? pageSize,
  }) =>
      _apiClient.get(
        '/api/tenants/current/provider-services',
        queryParameters: _paging(
          is_available: isAvailable,
          category: category,
          search: search,
          page: page,
          pageSize: pageSize,
        ),
      );

  Future<Map<String, dynamic>> createCurrentProviderService(
    Map<String, dynamic> payload,
  ) =>
      _apiClient.post('/api/tenants/current/provider-services', data: payload);

  Future<Map<String, dynamic>> getCurrentProviderService(
    String providerServiceId,
  ) =>
      _apiClient.get(
        '/api/tenants/current/provider-services/$providerServiceId',
      );

  Future<Map<String, dynamic>> updateCurrentProviderService(
    String providerServiceId,
    Map<String, dynamic> payload,
  ) =>
      _apiClient.put(
        '/api/tenants/current/provider-services/$providerServiceId',
        data: payload,
      );

  Future<Map<String, dynamic>> deleteCurrentProviderService(
    String providerServiceId,
  ) =>
      _apiClient.delete(
        '/api/tenants/current/provider-services/$providerServiceId',
      );

  Future<Map<String, dynamic>> changeCurrentProviderServiceStatus(
    String providerServiceId,
    Map<String, dynamic> payload,
  ) =>
      _apiClient.patch(
        '/api/tenants/current/provider-services/$providerServiceId/status',
        data: payload,
      );

  Future<Map<String, dynamic>> listCurrentIncidents({
    String? serviceCatalogId,
    String? status,
    String? priority,
    String? search,
    String? reportedFrom,
    String? reportedTo,
    int? page,
    int? pageSize,
  }) =>
      _apiClient.get(
        '/api/tenants/current/incidents',
        queryParameters: _paging(
          service_catalog_id: serviceCatalogId,
          status: status,
          priority: priority,
          search: search,
          reported_from: reportedFrom,
          reported_to: reportedTo,
          page: page,
          pageSize: pageSize,
        ),
      );

  Future<Map<String, dynamic>> getCurrentIncident(String incidentId) =>
      _apiClient.get('/api/tenants/current/incidents/$incidentId');

  Future<Map<String, dynamic>> listCurrentIncidentAiAnalyses(
    String incidentId, {
    String? analysisVersion,
    int? page,
    int? pageSize,
  }) =>
      _apiClient.get(
        '/api/tenants/current/incidents/$incidentId/ai-analyses',
        queryParameters: _paging(
          analysis_version: analysisVersion,
          page: page,
          pageSize: pageSize,
        ),
      );

  Future<Map<String, dynamic>> createCurrentIncidentAiAnalysis(
    String incidentId,
    Map<String, dynamic> payload,
  ) =>
      _apiClient.post(
        '/api/tenants/current/incidents/$incidentId/ai-analyses',
        data: payload,
      );

  Future<Map<String, dynamic>> getCurrentIncidentAiAnalysis(
    String incidentId,
    String analysisId,
  ) =>
      _apiClient.get(
        '/api/tenants/current/incidents/$incidentId/ai-analyses/$analysisId',
      );

  Future<Map<String, dynamic>> listCurrentTechnicianServices({
    String? serviceCatalogId,
    bool? isEnabled,
    int? page,
    int? pageSize,
  }) =>
      _apiClient.get(
        '/api/tenants/current/technician-services',
        queryParameters: _paging(
          service_catalog_id: serviceCatalogId,
          is_enabled: isEnabled,
          page: page,
          pageSize: pageSize,
        ),
      );

  Future<Map<String, dynamic>> createCurrentTechnicianService(
    Map<String, dynamic> payload,
  ) =>
      _apiClient.post('/api/tenants/current/technician-services', data: payload);

  Future<Map<String, dynamic>> getCurrentTechnicianService(
    String technicianServiceId,
  ) =>
      _apiClient.get(
        '/api/tenants/current/technician-services/$technicianServiceId',
      );

  Future<Map<String, dynamic>> updateCurrentTechnicianService(
    String technicianServiceId,
    Map<String, dynamic> payload,
  ) =>
      _apiClient.put(
        '/api/tenants/current/technician-services/$technicianServiceId',
        data: payload,
      );

  Future<Map<String, dynamic>> changeCurrentTechnicianServiceStatus(
    String technicianServiceId,
    Map<String, dynamic> payload,
  ) =>
      _apiClient.patch(
        '/api/tenants/current/technician-services/$technicianServiceId/status',
        data: payload,
      );

  Future<Map<String, dynamic>> listCurrentCandidateProviders({
    String? candidateStatus,
    int? page,
    int? pageSize,
  }) =>
      _apiClient.get(
        '/api/tenants/current/candidate-providers',
        queryParameters: _paging(
          candidate_status: candidateStatus,
          page: page,
          pageSize: pageSize,
        ),
      );

  Future<Map<String, dynamic>> getCurrentCandidateProvider(String candidateId) =>
      _apiClient.get('/api/tenants/current/candidate-providers/$candidateId');

  Future<Map<String, dynamic>> changeCurrentCandidateProviderStatus(
    String candidateId,
    Map<String, dynamic> payload,
  ) =>
      _apiClient.patch(
        '/api/tenants/current/candidate-providers/$candidateId/status',
        data: payload,
      );

  Future<Map<String, dynamic>> listCurrentOffers({
    String? offerStatus,
    int? page,
    int? pageSize,
  }) =>
      _apiClient.get(
        '/api/tenants/current/offers',
        queryParameters: _paging(
          offer_status: offerStatus,
          page: page,
          pageSize: pageSize,
        ),
      );

  Future<Map<String, dynamic>> getCurrentOffer(String offerId) =>
      _apiClient.get('/api/tenants/current/offers/$offerId');

  Future<Map<String, dynamic>> acceptCurrentOffer(String offerId) =>
      _apiClient.patch('/api/tenants/current/offers/$offerId/accept');

  Future<Map<String, dynamic>> rejectCurrentOffer(String offerId) =>
      _apiClient.patch('/api/tenants/current/offers/$offerId/reject');

  Future<Map<String, dynamic>> listCurrentAssignments({
    String? assignmentStatus,
    int? page,
    int? pageSize,
  }) =>
      _apiClient.get(
        '/api/tenants/current/assignments',
        queryParameters: _paging(
          assignment_status: assignmentStatus,
          page: page,
          pageSize: pageSize,
        ),
      );

  Future<Map<String, dynamic>> createCurrentAssignment(
    Map<String, dynamic> payload,
  ) =>
      _apiClient.post('/api/tenants/current/assignments', data: payload);

  Future<Map<String, dynamic>> getCurrentAssignment(String assignmentId) =>
      _apiClient.get('/api/tenants/current/assignments/$assignmentId');

  Future<Map<String, dynamic>> updateCurrentAssignment(
    String assignmentId,
    Map<String, dynamic> payload,
  ) =>
      _apiClient.put(
        '/api/tenants/current/assignments/$assignmentId',
        data: payload,
      );

  Future<Map<String, dynamic>> changeCurrentAssignmentStatus(
    String assignmentId,
    Map<String, dynamic> payload,
  ) =>
      _apiClient.patch(
        '/api/tenants/current/assignments/$assignmentId/status',
        data: payload,
      );

  Future<Map<String, dynamic>> listCurrentAssignmentTrackingEvents(
    String assignmentId, {
    String? eventType,
    int? page,
    int? pageSize,
  }) =>
      _apiClient.get(
        '/api/tenants/current/assignments/$assignmentId/tracking-events',
        queryParameters: _paging(
          event_type: eventType,
          page: page,
          pageSize: pageSize,
        ),
      );

  Future<Map<String, dynamic>> createCurrentAssignmentTrackingEvent(
    String assignmentId,
    Map<String, dynamic> payload,
  ) =>
      _apiClient.post(
        '/api/tenants/current/assignments/$assignmentId/tracking-events',
        data: payload,
      );

  Future<Map<String, dynamic>> getCurrentAssignmentTrackingSession(
    String assignmentId,
  ) =>
      _apiClient.get(
        '/api/tenants/current/assignments/$assignmentId/tracking-session',
      );

  Map<String, dynamic> _paging({
    dynamic status,
    dynamic actorId,
    dynamic eventType,
    dynamic resourceType,
    dynamic resourceId,
    dynamic createdFrom,
    dynamic createdTo,
    dynamic search,
    dynamic category,
    dynamic is_available,
    dynamic is_enabled,
    dynamic service_catalog_id,
    dynamic priority,
    dynamic reported_from,
    dynamic reported_to,
    dynamic analysis_version,
    dynamic candidate_status,
    dynamic offer_status,
    dynamic assignment_status,
    dynamic event_type,
    int? page,
    int? pageSize,
  }) {
    final query = <String, dynamic>{};
    if (status != null) query['status'] = status;
    if (actorId != null) query['actor_id'] = actorId;
    if (eventType != null) query['event_type'] = eventType;
    if (resourceType != null) query['resource_type'] = resourceType;
    if (resourceId != null) query['resource_id'] = resourceId;
    if (createdFrom != null) query['created_from'] = createdFrom;
    if (createdTo != null) query['created_to'] = createdTo;
    if (search != null) query['search'] = search;
    if (category != null) query['category'] = category;
    if (is_available != null) query['is_available'] = is_available;
    if (is_enabled != null) query['is_enabled'] = is_enabled;
    if (service_catalog_id != null) query['service_catalog_id'] = service_catalog_id;
    if (priority != null) query['priority'] = priority;
    if (reported_from != null) query['reported_from'] = reported_from;
    if (reported_to != null) query['reported_to'] = reported_to;
    if (analysis_version != null) query['analysis_version'] = analysis_version;
    if (candidate_status != null) query['candidate_status'] = candidate_status;
    if (offer_status != null) query['offer_status'] = offer_status;
    if (assignment_status != null) query['assignment_status'] = assignment_status;
    if (event_type != null) query['event_type'] = event_type;
    if (page != null) query['page'] = page;
    if (pageSize != null) query['page_size'] = pageSize;
    return query;
  }
}

import '../entities/paged_result.dart';

abstract class TenantRepository {
  Future<List<Map<String, dynamic>>> listMyTenants();

  Future<Map<String, dynamic>> getCurrentTenant();
  Future<Map<String, dynamic>> getCurrentTenantDetail();
  Future<Map<String, dynamic>> getCurrentOperationalDashboard({
    String? dateFrom,
    String? dateTo,
  });

  Future<Map<String, dynamic>> getCurrentProfile();
  Future<Map<String, dynamic>> updateCurrentProfile(Map<String, dynamic> payload);

  Future<Map<String, dynamic>> getCurrentSettings();
  Future<Map<String, dynamic>> updateCurrentSettings(
    Map<String, dynamic> payload,
  );

  Future<Map<String, dynamic>> createCurrentTenantNetwork(
    Map<String, dynamic> payload,
  );

  Future<Map<String, dynamic>> getCurrentProviderProfile();
  Future<Map<String, dynamic>> updateCurrentProviderProfile(
    Map<String, dynamic> payload,
  );

  Future<PagedResult<Map<String, dynamic>>> listCurrentTechnicians({
    String? status,
    int? page,
    int? pageSize,
  });

  Future<Map<String, dynamic>> createCurrentTechnician(
    Map<String, dynamic> payload,
  );

  Future<Map<String, dynamic>> changeCurrentTechnicianStatus(
    String technicianId,
    Map<String, dynamic> payload,
  );

  Future<Map<String, dynamic>> deleteCurrentTechnician(String technicianId);

  Future<Map<String, dynamic>> getTechnicianAvailability(String technicianId);

  Future<Map<String, dynamic>> upsertTechnicianAvailability(
    String technicianId,
    Map<String, dynamic> payload,
  );

  Future<PagedResult<Map<String, dynamic>>> listCurrentMembers({
    String? status,
    int? page,
    int? pageSize,
  });

  Future<Map<String, dynamic>> changeCurrentMemberStatus(
    String membershipId,
    Map<String, dynamic> payload,
  );

  Future<Map<String, dynamic>> getCurrentMember(String membershipId);

  Future<Map<String, dynamic>> removeCurrentMember(String membershipId);

  Future<PagedResult<Map<String, dynamic>>> listMyTenantSessions({
    int? page,
    int? pageSize,
  });

  Future<Map<String, dynamic>> revokeMyTenantSession(String sessionId);

  Future<PagedResult<Map<String, dynamic>>> listCurrentTenantAuditEvents({
    String? actorId,
    String? eventType,
    String? resourceType,
    String? resourceId,
    String? createdFrom,
    String? createdTo,
    int? page,
    int? pageSize,
  });

  Future<PagedResult<Map<String, dynamic>>> getCurrentTenantResourceHistory(
    String resourceType,
    String resourceId,
  );

  Future<Map<String, dynamic>> getCurrentTenantAuditEvent(String auditEventId);

  Future<PagedResult<Map<String, dynamic>>> listCurrentServiceCatalog({
    String? search,
    String? category,
    int? page,
    int? pageSize,
  });

  Future<Map<String, dynamic>> getCurrentServiceCatalog(String serviceCatalogId);

  Future<PagedResult<Map<String, dynamic>>> listCurrentProviderServices({
    bool? isAvailable,
    String? category,
    String? search,
    int? page,
    int? pageSize,
  });

  Future<Map<String, dynamic>> createCurrentProviderService(
    Map<String, dynamic> payload,
  );

  Future<Map<String, dynamic>> getCurrentProviderService(
    String providerServiceId,
  );

  Future<Map<String, dynamic>> updateCurrentProviderService(
    String providerServiceId,
    Map<String, dynamic> payload,
  );

  Future<Map<String, dynamic>> deleteCurrentProviderService(
    String providerServiceId,
  );

  Future<Map<String, dynamic>> changeCurrentProviderServiceStatus(
    String providerServiceId,
    Map<String, dynamic> payload,
  );

  Future<PagedResult<Map<String, dynamic>>> listCurrentIncidents({
    String? serviceCatalogId,
    String? status,
    String? priority,
    String? search,
    String? reportedFrom,
    String? reportedTo,
    int? page,
    int? pageSize,
  });

  Future<Map<String, dynamic>> getCurrentIncident(String incidentId);

  Future<PagedResult<Map<String, dynamic>>> listCurrentIncidentAiAnalyses(
    String incidentId, {
    String? analysisVersion,
    int? page,
    int? pageSize,
  });

  Future<Map<String, dynamic>> createCurrentIncidentAiAnalysis(
    String incidentId,
    Map<String, dynamic> payload,
  );

  Future<Map<String, dynamic>> getCurrentIncidentAiAnalysis(
    String incidentId,
    String analysisId,
  );

  Future<PagedResult<Map<String, dynamic>>> listCurrentTechnicianServices({
    String? serviceCatalogId,
    bool? isEnabled,
    int? page,
    int? pageSize,
  });

  Future<Map<String, dynamic>> createCurrentTechnicianService(
    Map<String, dynamic> payload,
  );

  Future<Map<String, dynamic>> getCurrentTechnicianService(
    String technicianServiceId,
  );

  Future<Map<String, dynamic>> updateCurrentTechnicianService(
    String technicianServiceId,
    Map<String, dynamic> payload,
  );

  Future<Map<String, dynamic>> changeCurrentTechnicianServiceStatus(
    String technicianServiceId,
    Map<String, dynamic> payload,
  );

  Future<PagedResult<Map<String, dynamic>>> listCurrentCandidateProviders({
    String? candidateStatus,
    int? page,
    int? pageSize,
  });

  Future<Map<String, dynamic>> getCurrentCandidateProvider(String candidateId);

  Future<Map<String, dynamic>> changeCurrentCandidateProviderStatus(
    String candidateId,
    Map<String, dynamic> payload,
  );

  Future<PagedResult<Map<String, dynamic>>> listCurrentOffers({
    String? offerStatus,
    int? page,
    int? pageSize,
  });

  Future<Map<String, dynamic>> getCurrentOffer(String offerId);
  Future<Map<String, dynamic>> acceptCurrentOffer(String offerId);
  Future<Map<String, dynamic>> rejectCurrentOffer(String offerId);

  Future<PagedResult<Map<String, dynamic>>> listCurrentAssignments({
    String? assignmentStatus,
    int? page,
    int? pageSize,
  });

  Future<Map<String, dynamic>> createCurrentAssignment(
    Map<String, dynamic> payload,
  );

  Future<Map<String, dynamic>> getCurrentAssignment(String assignmentId);

  Future<Map<String, dynamic>> updateCurrentAssignment(
    String assignmentId,
    Map<String, dynamic> payload,
  );

  Future<Map<String, dynamic>> changeCurrentAssignmentStatus(
    String assignmentId,
    Map<String, dynamic> payload,
  );

  Future<PagedResult<Map<String, dynamic>>> listCurrentAssignmentTrackingEvents(
    String assignmentId, {
    String? eventType,
    int? page,
    int? pageSize,
  });

  Future<Map<String, dynamic>> createCurrentAssignmentTrackingEvent(
    String assignmentId,
    Map<String, dynamic> payload,
  );

  Future<Map<String, dynamic>> getCurrentAssignmentTrackingSession(
    String assignmentId,
  );
}

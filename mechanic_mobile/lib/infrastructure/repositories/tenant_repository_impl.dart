import '../../domain/entities/paged_result.dart';
import '../../domain/entities/pagination_entity.dart';
import '../../domain/repositories/tenant_repository.dart';
import '../datasources/tenant_remote_datasource.dart';
import '../models/app_model_utils.dart';
import '../models/pagination_model.dart';

class TenantRepositoryImpl implements TenantRepository {
  TenantRepositoryImpl(this._remoteDataSource);

  final TenantRemoteDataSource _remoteDataSource;

  Map<String, dynamic> _data(Map<String, dynamic> response) {
    final raw = response['data'];
    return raw is Map ? Map<String, dynamic>.from(raw) : <String, dynamic>{};
  }

  List<Map<String, dynamic>> _items(Map<String, dynamic> response) {
    final raw = response['data'];
    if (raw is List) {
      return listMapOf(raw);
    }
    final data = _data(response);
    return listMapOf(data['items']);
  }

  PagedResult<Map<String, dynamic>> _paged(Map<String, dynamic> response) {
    final data = _data(response);
    return PagedResult<Map<String, dynamic>>(
      items: listMapOf(data['items']),
      pagination: _pagination(data),
    );
  }

  PaginationEntity _pagination(Map<String, dynamic> data) {
    return PaginationModel.fromJson(mapOf(data['pagination']));
  }

  @override
  Future<List<Map<String, dynamic>>> listMyTenants() async {
    final response = await _remoteDataSource.listMyTenants();
    return _items(response);
  }

  @override
  Future<Map<String, dynamic>> getCurrentTenant() async {
    return _data(await _remoteDataSource.getCurrentTenant());
  }

  @override
  Future<Map<String, dynamic>> getCurrentTenantDetail() async {
    return _data(await _remoteDataSource.getCurrentTenantDetail());
  }

  @override
  Future<Map<String, dynamic>> getCurrentProfile() async {
    return _data(await _remoteDataSource.getCurrentProfile());
  }

  @override
  Future<Map<String, dynamic>> updateCurrentProfile(
    Map<String, dynamic> payload,
  ) async {
    return _data(await _remoteDataSource.updateCurrentProfile(payload));
  }

  @override
  Future<Map<String, dynamic>> getCurrentSettings() async {
    return _data(await _remoteDataSource.getCurrentSettings());
  }

  @override
  Future<Map<String, dynamic>> updateCurrentSettings(
    Map<String, dynamic> payload,
  ) async {
    return _data(await _remoteDataSource.updateCurrentSettings(payload));
  }

  @override
  Future<Map<String, dynamic>> createCurrentTenantNetwork(
    Map<String, dynamic> payload,
  ) async {
    return _data(await _remoteDataSource.createCurrentTenantNetwork(payload));
  }

  @override
  Future<Map<String, dynamic>> getCurrentProviderProfile() async {
    return _data(await _remoteDataSource.getCurrentProviderProfile());
  }

  @override
  Future<Map<String, dynamic>> updateCurrentProviderProfile(
    Map<String, dynamic> payload,
  ) async {
    return _data(await _remoteDataSource.updateCurrentProviderProfile(payload));
  }

  @override
  Future<PagedResult<Map<String, dynamic>>> listCurrentTechnicians({
    String? status,
    int? page,
    int? pageSize,
  }) async {
    return _paged(
      await _remoteDataSource.listCurrentTechnicians(
        status: status,
        page: page,
        pageSize: pageSize,
      ),
    );
  }

  @override
  Future<Map<String, dynamic>> createCurrentTechnician(
    Map<String, dynamic> payload,
  ) async {
    return _data(await _remoteDataSource.createCurrentTechnician(payload));
  }

  @override
  Future<Map<String, dynamic>> getCurrentTechnician(String technicianId) async {
    return _data(await _remoteDataSource.getCurrentTechnician(technicianId));
  }

  @override
  Future<Map<String, dynamic>> changeCurrentTechnicianStatus(
    String technicianId,
    Map<String, dynamic> payload,
  ) async {
    return _data(
      await _remoteDataSource.changeCurrentTechnicianStatus(
        technicianId,
        payload,
      ),
    );
  }

  @override
  Future<Map<String, dynamic>> deleteCurrentTechnician(String technicianId) async {
    return _data(await _remoteDataSource.deleteCurrentTechnician(technicianId));
  }

  @override
  Future<Map<String, dynamic>> getTechnicianAvailability(
    String technicianId,
  ) async {
    return _data(await _remoteDataSource.getTechnicianAvailability(technicianId));
  }

  @override
  Future<Map<String, dynamic>> upsertTechnicianAvailability(
    String technicianId,
    Map<String, dynamic> payload,
  ) async {
    return _data(
      await _remoteDataSource.upsertTechnicianAvailability(
        technicianId,
        payload,
      ),
    );
  }

  @override
  Future<PagedResult<Map<String, dynamic>>> listCurrentMembers({
    String? status,
    int? page,
    int? pageSize,
  }) async {
    return _paged(
      await _remoteDataSource.listCurrentMembers(
        status: status,
        page: page,
        pageSize: pageSize,
      ),
    );
  }

  @override
  Future<Map<String, dynamic>> changeCurrentMemberStatus(
    String membershipId,
    Map<String, dynamic> payload,
  ) async {
    return _data(
      await _remoteDataSource.changeCurrentMemberStatus(
        membershipId,
        payload,
      ),
    );
  }

  @override
  Future<Map<String, dynamic>> getCurrentMember(String membershipId) async {
    return _data(await _remoteDataSource.getCurrentMember(membershipId));
  }

  @override
  Future<Map<String, dynamic>> removeCurrentMember(String membershipId) async {
    return _data(await _remoteDataSource.removeCurrentMember(membershipId));
  }

  @override
  Future<PagedResult<Map<String, dynamic>>> listMyTenantSessions({
    int? page,
    int? pageSize,
  }) async {
    return _paged(
      await _remoteDataSource.listMyTenantSessions(
        page: page,
        pageSize: pageSize,
      ),
    );
  }

  @override
  Future<Map<String, dynamic>> revokeMyTenantSession(String sessionId) async {
    return _data(await _remoteDataSource.revokeMyTenantSession(sessionId));
  }

  @override
  Future<PagedResult<Map<String, dynamic>>> listCurrentTenantAuditEvents({
    String? actorId,
    String? eventType,
    String? resourceType,
    String? resourceId,
    String? createdFrom,
    String? createdTo,
    int? page,
    int? pageSize,
  }) async {
    return _paged(
      await _remoteDataSource.listCurrentTenantAuditEvents(
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
  }

  @override
  Future<PagedResult<Map<String, dynamic>>> getCurrentTenantResourceHistory(
    String resourceType,
    String resourceId,
  ) async {
    return _paged(
      await _remoteDataSource.getCurrentTenantResourceHistory(
        resourceType,
        resourceId,
      ),
    );
  }

  @override
  Future<Map<String, dynamic>> getCurrentTenantAuditEvent(
    String auditEventId,
  ) async {
    return _data(await _remoteDataSource.getCurrentTenantAuditEvent(auditEventId));
  }

  @override
  Future<PagedResult<Map<String, dynamic>>> listCurrentServiceCatalog({
    String? search,
    String? category,
    int? page,
    int? pageSize,
  }) async {
    return _paged(
      await _remoteDataSource.listCurrentServiceCatalog(
        search: search,
        category: category,
        page: page,
        pageSize: pageSize,
      ),
    );
  }

  @override
  Future<Map<String, dynamic>> getCurrentServiceCatalog(
    String serviceCatalogId,
  ) async {
    return _data(
      await _remoteDataSource.getCurrentServiceCatalog(serviceCatalogId),
    );
  }

  @override
  Future<PagedResult<Map<String, dynamic>>> listCurrentProviderServices({
    bool? isAvailable,
    String? category,
    String? search,
    int? page,
    int? pageSize,
  }) async {
    return _paged(
      await _remoteDataSource.listCurrentProviderServices(
        isAvailable: isAvailable,
        category: category,
        search: search,
        page: page,
        pageSize: pageSize,
      ),
    );
  }

  @override
  Future<Map<String, dynamic>> createCurrentProviderService(
    Map<String, dynamic> payload,
  ) async {
    return _data(
      await _remoteDataSource.createCurrentProviderService(payload),
    );
  }

  @override
  Future<Map<String, dynamic>> getCurrentProviderService(
    String providerServiceId,
  ) async {
    return _data(
      await _remoteDataSource.getCurrentProviderService(providerServiceId),
    );
  }

  @override
  Future<Map<String, dynamic>> updateCurrentProviderService(
    String providerServiceId,
    Map<String, dynamic> payload,
  ) async {
    return _data(
      await _remoteDataSource.updateCurrentProviderService(
        providerServiceId,
        payload,
      ),
    );
  }

  @override
  Future<Map<String, dynamic>> deleteCurrentProviderService(
    String providerServiceId,
  ) async {
    return _data(
      await _remoteDataSource.deleteCurrentProviderService(providerServiceId),
    );
  }

  @override
  Future<Map<String, dynamic>> changeCurrentProviderServiceStatus(
    String providerServiceId,
    Map<String, dynamic> payload,
  ) async {
    return _data(
      await _remoteDataSource.changeCurrentProviderServiceStatus(
        providerServiceId,
        payload,
      ),
    );
  }

  @override
  Future<PagedResult<Map<String, dynamic>>> listCurrentIncidents({
    String? serviceCatalogId,
    String? status,
    String? priority,
    String? search,
    String? reportedFrom,
    String? reportedTo,
    int? page,
    int? pageSize,
  }) async {
    return _paged(
      await _remoteDataSource.listCurrentIncidents(
        serviceCatalogId: serviceCatalogId,
        status: status,
        priority: priority,
        search: search,
        reportedFrom: reportedFrom,
        reportedTo: reportedTo,
        page: page,
        pageSize: pageSize,
      ),
    );
  }

  @override
  Future<Map<String, dynamic>> getCurrentIncident(String incidentId) async {
    return _data(await _remoteDataSource.getCurrentIncident(incidentId));
  }

  @override
  Future<PagedResult<Map<String, dynamic>>> listCurrentIncidentAiAnalyses(
    String incidentId, {
    String? analysisVersion,
    int? page,
    int? pageSize,
  }) async {
    return _paged(
      await _remoteDataSource.listCurrentIncidentAiAnalyses(
        incidentId,
        analysisVersion: analysisVersion,
        page: page,
        pageSize: pageSize,
      ),
    );
  }

  @override
  Future<Map<String, dynamic>> createCurrentIncidentAiAnalysis(
    String incidentId,
    Map<String, dynamic> payload,
  ) async {
    return _data(
      await _remoteDataSource.createCurrentIncidentAiAnalysis(
        incidentId,
        payload,
      ),
    );
  }

  @override
  Future<Map<String, dynamic>> getCurrentIncidentAiAnalysis(
    String incidentId,
    String analysisId,
  ) async {
    return _data(
      await _remoteDataSource.getCurrentIncidentAiAnalysis(
        incidentId,
        analysisId,
      ),
    );
  }

  @override
  Future<PagedResult<Map<String, dynamic>>> listCurrentTechnicianServices({
    String? serviceCatalogId,
    bool? isEnabled,
    int? page,
    int? pageSize,
  }) async {
    return _paged(
      await _remoteDataSource.listCurrentTechnicianServices(
        serviceCatalogId: serviceCatalogId,
        isEnabled: isEnabled,
        page: page,
        pageSize: pageSize,
      ),
    );
  }

  @override
  Future<Map<String, dynamic>> createCurrentTechnicianService(
    Map<String, dynamic> payload,
  ) async {
    return _data(
      await _remoteDataSource.createCurrentTechnicianService(payload),
    );
  }

  @override
  Future<Map<String, dynamic>> getCurrentTechnicianService(
    String technicianServiceId,
  ) async {
    return _data(
      await _remoteDataSource.getCurrentTechnicianService(technicianServiceId),
    );
  }

  @override
  Future<Map<String, dynamic>> updateCurrentTechnicianService(
    String technicianServiceId,
    Map<String, dynamic> payload,
  ) async {
    return _data(
      await _remoteDataSource.updateCurrentTechnicianService(
        technicianServiceId,
        payload,
      ),
    );
  }

  @override
  Future<Map<String, dynamic>> changeCurrentTechnicianServiceStatus(
    String technicianServiceId,
    Map<String, dynamic> payload,
  ) async {
    return _data(
      await _remoteDataSource.changeCurrentTechnicianServiceStatus(
        technicianServiceId,
        payload,
      ),
    );
  }

  @override
  Future<PagedResult<Map<String, dynamic>>> listCurrentCandidateProviders({
    String? candidateStatus,
    int? page,
    int? pageSize,
  }) async {
    return _paged(
      await _remoteDataSource.listCurrentCandidateProviders(
        candidateStatus: candidateStatus,
        page: page,
        pageSize: pageSize,
      ),
    );
  }

  @override
  Future<Map<String, dynamic>> getCurrentCandidateProvider(String candidateId) async {
    return _data(
      await _remoteDataSource.getCurrentCandidateProvider(candidateId),
    );
  }

  @override
  Future<Map<String, dynamic>> changeCurrentCandidateProviderStatus(
    String candidateId,
    Map<String, dynamic> payload,
  ) async {
    return _data(
      await _remoteDataSource.changeCurrentCandidateProviderStatus(
        candidateId,
        payload,
      ),
    );
  }

  @override
  Future<PagedResult<Map<String, dynamic>>> listCurrentOffers({
    String? offerStatus,
    int? page,
    int? pageSize,
  }) async {
    return _paged(
      await _remoteDataSource.listCurrentOffers(
        offerStatus: offerStatus,
        page: page,
        pageSize: pageSize,
      ),
    );
  }

  @override
  Future<Map<String, dynamic>> getCurrentOffer(String offerId) async {
    return _data(await _remoteDataSource.getCurrentOffer(offerId));
  }

  @override
  Future<Map<String, dynamic>> acceptCurrentOffer(String offerId) async {
    return _data(await _remoteDataSource.acceptCurrentOffer(offerId));
  }

  @override
  Future<Map<String, dynamic>> rejectCurrentOffer(String offerId) async {
    return _data(await _remoteDataSource.rejectCurrentOffer(offerId));
  }

  @override
  Future<PagedResult<Map<String, dynamic>>> listCurrentAssignments({
    String? assignmentStatus,
    int? page,
    int? pageSize,
  }) async {
    return _paged(
      await _remoteDataSource.listCurrentAssignments(
        assignmentStatus: assignmentStatus,
        page: page,
        pageSize: pageSize,
      ),
    );
  }

  @override
  Future<Map<String, dynamic>> createCurrentAssignment(
    Map<String, dynamic> payload,
  ) async {
    return _data(await _remoteDataSource.createCurrentAssignment(payload));
  }

  @override
  Future<Map<String, dynamic>> getCurrentAssignment(String assignmentId) async {
    return _data(await _remoteDataSource.getCurrentAssignment(assignmentId));
  }

  @override
  Future<Map<String, dynamic>> updateCurrentAssignment(
    String assignmentId,
    Map<String, dynamic> payload,
  ) async {
    return _data(
      await _remoteDataSource.updateCurrentAssignment(assignmentId, payload),
    );
  }

  @override
  Future<Map<String, dynamic>> changeCurrentAssignmentStatus(
    String assignmentId,
    Map<String, dynamic> payload,
  ) async {
    return _data(
      await _remoteDataSource.changeCurrentAssignmentStatus(
        assignmentId,
        payload,
      ),
    );
  }

  @override
  Future<PagedResult<Map<String, dynamic>>> listCurrentAssignmentTrackingEvents(
    String assignmentId, {
    String? eventType,
    int? page,
    int? pageSize,
  }) async {
    return _paged(
      await _remoteDataSource.listCurrentAssignmentTrackingEvents(
        assignmentId,
        eventType: eventType,
        page: page,
        pageSize: pageSize,
      ),
    );
  }

  @override
  Future<Map<String, dynamic>> createCurrentAssignmentTrackingEvent(
    String assignmentId,
    Map<String, dynamic> payload,
  ) async {
    return _data(
      await _remoteDataSource.createCurrentAssignmentTrackingEvent(
        assignmentId,
        payload,
      ),
    );
  }
}

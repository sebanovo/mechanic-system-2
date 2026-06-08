import 'package:flutter/foundation.dart';
import 'package:flutter/widgets.dart';

import '../../core/error/failures.dart';
import '../../domain/entities/paged_result.dart';
import '../../domain/entities/pagination_entity.dart';
import '../../domain/repositories/tenant_repository.dart';
import 'auth_viewmodel.dart';

class TenantViewModel extends ChangeNotifier {
  TenantViewModel(this._tenantRepository, this._authViewModel);

  final TenantRepository _tenantRepository;
  final AuthViewModel _authViewModel;

  bool loading = false;
  bool submitting = false;
  String? error;
  String? message;
  String? _loadedWorkspaceKey;
  bool _bootstrapScheduled = false;

  List<Map<String, dynamic>> myTenants = const <Map<String, dynamic>>[];
  Map<String, dynamic>? currentTenant;
  Map<String, dynamic>? currentTenantDetail;
  Map<String, dynamic>? currentProfile;
  Map<String, dynamic>? currentSettings;
  Map<String, dynamic>? currentProviderProfile;

  PagedResult<Map<String, dynamic>> technicians = _emptyPaged();
  PagedResult<Map<String, dynamic>> members = _emptyPaged();
  PagedResult<Map<String, dynamic>> sessions = _emptyPaged();
  PagedResult<Map<String, dynamic>> auditEvents = _emptyPaged();
  PagedResult<Map<String, dynamic>> serviceCatalog = _emptyPaged();
  PagedResult<Map<String, dynamic>> providerServices = _emptyPaged();
  PagedResult<Map<String, dynamic>> incidents = _emptyPaged();
  PagedResult<Map<String, dynamic>> incidentAnalyses = _emptyPaged();
  PagedResult<Map<String, dynamic>> technicianServices = _emptyPaged();
  PagedResult<Map<String, dynamic>> candidateProviders = _emptyPaged();
  PagedResult<Map<String, dynamic>> offers = _emptyPaged();
  PagedResult<Map<String, dynamic>> assignments = _emptyPaged();
  PagedResult<Map<String, dynamic>> assignmentTrackingEvents = _emptyPaged();

  static PagedResult<Map<String, dynamic>> _emptyPaged() {
    return PagedResult<Map<String, dynamic>>(
      items: const <Map<String, dynamic>>[],
      pagination: const PaginationEntity(
        page: 1,
        pageSize: 0,
        total: 0,
        totalPages: 0,
        hasNext: false,
        hasPrevious: false,
      ),
    );
  }

  String get userType => _authViewModel.contextData?.userType ?? '';

  bool get isOwner => userType.toUpperCase() == 'TENANT_OWNER';
  bool get isTechnician => userType.toUpperCase() == 'TECHNICIAN';
  bool get isClient => userType.toUpperCase() == 'CLIENT';

  String _workspaceKey() {
    final tenantId = _authViewModel.contextData?.tenantId ?? '';
    return '${userType.toUpperCase()}|$tenantId';
  }

  void scheduleBootstrap() {
    final normalized = _workspaceKey();
    if (loading || _bootstrapScheduled) return;
    if (_loadedWorkspaceKey == normalized) {
      return;
    }
    _bootstrapScheduled = true;
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _bootstrapScheduled = false;
      bootstrap();
    });
  }

  Future<void> bootstrap() async {
    final normalized = _workspaceKey();
    if (loading) return;
    if (_loadedWorkspaceKey == normalized &&
        currentTenant != null &&
        currentTenantDetail != null) {
      return;
    }
    _loadedWorkspaceKey = normalized;
    if (normalized == 'TENANT_OWNER') {
      await loadOwnerWorkspace();
      return;
    }
    if (normalized == 'TECHNICIAN') {
      await loadTechnicianWorkspace();
      return;
    }
    await loadClientWorkspace();
  }

  Future<void> refresh() async {
    _loadedWorkspaceKey = null;
    _bootstrapScheduled = false;
    await bootstrap();
  }

  Future<void> loadOwnerWorkspace() async {
    loading = true;
    error = null;
    notifyListeners();
    try {
      final results = await Future.wait<dynamic>([
        _tenantRepository.listMyTenants(),
        _tenantRepository.getCurrentTenant(),
        _tenantRepository.getCurrentTenantDetail(),
        _tenantRepository.getCurrentProfile(),
        _tenantRepository.getCurrentSettings(),
        _tenantRepository.getCurrentProviderProfile(),
        _tenantRepository.listCurrentTechnicians(page: 1, pageSize: 20),
        _tenantRepository.listCurrentMembers(page: 1, pageSize: 20),
        _tenantRepository.listMyTenantSessions(page: 1, pageSize: 20),
        _tenantRepository.listCurrentTenantAuditEvents(page: 1, pageSize: 20),
        _tenantRepository.listCurrentServiceCatalog(page: 1, pageSize: 20),
        _tenantRepository.listCurrentProviderServices(page: 1, pageSize: 20),
        _tenantRepository.listCurrentTechnicianServices(page: 1, pageSize: 20),
        _tenantRepository.listCurrentCandidateProviders(page: 1, pageSize: 20),
        _tenantRepository.listCurrentOffers(page: 1, pageSize: 20),
        _tenantRepository.listCurrentIncidents(page: 1, pageSize: 20),
        _tenantRepository.listCurrentAssignments(page: 1, pageSize: 20),
      ]);
      myTenants = List<Map<String, dynamic>>.from(results[0] as List);
      currentTenant = Map<String, dynamic>.from(results[1] as Map);
      currentTenantDetail = Map<String, dynamic>.from(results[2] as Map);
      currentProfile = Map<String, dynamic>.from(results[3] as Map);
      currentSettings = Map<String, dynamic>.from(results[4] as Map);
      currentProviderProfile = Map<String, dynamic>.from(results[5] as Map);
      technicians = results[6] as PagedResult<Map<String, dynamic>>;
      members = results[7] as PagedResult<Map<String, dynamic>>;
      sessions = results[8] as PagedResult<Map<String, dynamic>>;
      auditEvents = results[9] as PagedResult<Map<String, dynamic>>;
      serviceCatalog = results[10] as PagedResult<Map<String, dynamic>>;
      providerServices = results[11] as PagedResult<Map<String, dynamic>>;
      technicianServices = results[12] as PagedResult<Map<String, dynamic>>;
      candidateProviders = results[13] as PagedResult<Map<String, dynamic>>;
      offers = results[14] as PagedResult<Map<String, dynamic>>;
      incidents = results[15] as PagedResult<Map<String, dynamic>>;
      assignments = results[16] as PagedResult<Map<String, dynamic>>;
      _loadedWorkspaceKey = _workspaceKey();
    } catch (exception) {
      error = appFailureMessage(exception);
    } finally {
      loading = false;
      notifyListeners();
    }
  }

  Future<void> loadTechnicianWorkspace() async {
    loading = true;
    error = null;
    notifyListeners();
    try {
      final results = await Future.wait<dynamic>([
        _tenantRepository.listMyTenants(),
        _tenantRepository.getCurrentTenant(),
        _tenantRepository.getCurrentTenantDetail(),
        _tenantRepository.getCurrentProfile(),
        _tenantRepository.getCurrentSettings(),
        _tenantRepository.getCurrentProviderProfile(),
        _tenantRepository.listCurrentTechnicianServices(page: 1, pageSize: 20),
        _tenantRepository.listCurrentIncidents(page: 1, pageSize: 20),
        _tenantRepository.listCurrentAssignments(page: 1, pageSize: 20),
        _tenantRepository.listMyTenantSessions(page: 1, pageSize: 20),
      ]);
      myTenants = List<Map<String, dynamic>>.from(results[0] as List);
      currentTenant = Map<String, dynamic>.from(results[1] as Map);
      currentTenantDetail = Map<String, dynamic>.from(results[2] as Map);
      currentProfile = Map<String, dynamic>.from(results[3] as Map);
      currentSettings = Map<String, dynamic>.from(results[4] as Map);
      currentProviderProfile = Map<String, dynamic>.from(results[5] as Map);
      technicianServices = results[6] as PagedResult<Map<String, dynamic>>;
      incidents = results[7] as PagedResult<Map<String, dynamic>>;
      assignments = results[8] as PagedResult<Map<String, dynamic>>;
      sessions = results[9] as PagedResult<Map<String, dynamic>>;
      _loadedWorkspaceKey = _workspaceKey();
    } catch (exception) {
      error = appFailureMessage(exception);
    } finally {
      loading = false;
      notifyListeners();
    }
  }

  Future<void> loadClientWorkspace() async {
    loading = true;
    error = null;
    notifyListeners();
    try {
      final results = await Future.wait<dynamic>([
        _tenantRepository.listMyTenants(),
        _tenantRepository.getCurrentTenant(),
        _tenantRepository.getCurrentTenantDetail(),
        _tenantRepository.getCurrentProfile(),
        _tenantRepository.getCurrentSettings(),
        _tenantRepository.listCurrentIncidents(page: 1, pageSize: 20),
        _tenantRepository.listCurrentOffers(page: 1, pageSize: 20),
        _tenantRepository.listCurrentAssignments(page: 1, pageSize: 20),
        _tenantRepository.listMyTenantSessions(page: 1, pageSize: 20),
        _tenantRepository.listCurrentServiceCatalog(page: 1, pageSize: 20),
      ]);
      myTenants = List<Map<String, dynamic>>.from(results[0] as List);
      currentTenant = Map<String, dynamic>.from(results[1] as Map);
      currentTenantDetail = Map<String, dynamic>.from(results[2] as Map);
      currentProfile = Map<String, dynamic>.from(results[3] as Map);
      currentSettings = Map<String, dynamic>.from(results[4] as Map);
      incidents = results[5] as PagedResult<Map<String, dynamic>>;
      offers = results[6] as PagedResult<Map<String, dynamic>>;
      assignments = results[7] as PagedResult<Map<String, dynamic>>;
      sessions = results[8] as PagedResult<Map<String, dynamic>>;
      serviceCatalog = results[9] as PagedResult<Map<String, dynamic>>;
      _loadedWorkspaceKey = _workspaceKey();
    } catch (exception) {
      error = appFailureMessage(exception);
    } finally {
      loading = false;
      notifyListeners();
    }
  }

  Future<void> reloadTechnicians() async {
    try {
      technicians = await _tenantRepository.listCurrentTechnicians(page: 1, pageSize: 20);
      notifyListeners();
    } catch (exception) {
      error = appFailureMessage(exception);
      notifyListeners();
    }
  }

  Future<void> reloadMembers() async {
    try {
      members = await _tenantRepository.listCurrentMembers(page: 1, pageSize: 20);
      notifyListeners();
    } catch (exception) {
      error = appFailureMessage(exception);
      notifyListeners();
    }
  }

  Future<void> reloadTenantSessions() async {
    try {
      sessions = await _tenantRepository.listMyTenantSessions(page: 1, pageSize: 20);
      notifyListeners();
    } catch (exception) {
      error = appFailureMessage(exception);
      notifyListeners();
    }
  }

  Future<void> reloadIncidents() async {
    try {
      incidents = await _tenantRepository.listCurrentIncidents(page: 1, pageSize: 20);
      notifyListeners();
    } catch (exception) {
      error = appFailureMessage(exception);
      notifyListeners();
    }
  }

  Future<void> reloadAssignments() async {
    try {
      assignments = await _tenantRepository.listCurrentAssignments(page: 1, pageSize: 20);
      notifyListeners();
    } catch (exception) {
      error = appFailureMessage(exception);
      notifyListeners();
    }
  }

  Future<bool> createTechnician(Map<String, dynamic> payload) async {
    submitting = true;
    error = null;
    notifyListeners();
    try {
      await _tenantRepository.createCurrentTechnician(payload);
      await reloadTechnicians();
      message = 'Técnico creado';
      return true;
    } catch (exception) {
      error = appFailureMessage(exception);
      return false;
    } finally {
      submitting = false;
      notifyListeners();
    }
  }

  Future<bool> updateTechnicianStatus(
    String technicianId,
    String status,
  ) async {
    submitting = true;
    error = null;
    notifyListeners();
    try {
      await _tenantRepository.changeCurrentTechnicianStatus(
        technicianId,
        {'status': status},
      );
      await reloadTechnicians();
      message = 'Estado de técnico actualizado';
      return true;
    } catch (exception) {
      error = appFailureMessage(exception);
      return false;
    } finally {
      submitting = false;
      notifyListeners();
    }
  }

  Future<bool> createProviderService(Map<String, dynamic> payload) async {
    submitting = true;
    error = null;
    notifyListeners();
    try {
      await _tenantRepository.createCurrentProviderService(payload);
      await reloadProviderServices();
      message = 'Servicio creado';
      return true;
    } catch (exception) {
      error = appFailureMessage(exception);
      return false;
    } finally {
      submitting = false;
      notifyListeners();
    }
  }

  Future<bool> updateProviderServiceStatus(
    String providerServiceId,
    bool isAvailable,
  ) async {
    submitting = true;
    error = null;
    notifyListeners();
    try {
      await _tenantRepository.changeCurrentProviderServiceStatus(
        providerServiceId,
        {'is_available': isAvailable},
      );
      await reloadProviderServices();
      message = 'Estado del servicio actualizado';
      return true;
    } catch (exception) {
      error = appFailureMessage(exception);
      return false;
    } finally {
      submitting = false;
      notifyListeners();
    }
  }

  Future<void> reloadProviderServices() async {
    try {
      providerServices = await _tenantRepository.listCurrentProviderServices(
        page: 1,
        pageSize: 20,
      );
      notifyListeners();
    } catch (exception) {
      error = appFailureMessage(exception);
      notifyListeners();
    }
  }

  Future<void> reloadTechnicianServices() async {
    try {
      technicianServices = await _tenantRepository.listCurrentTechnicianServices(
        page: 1,
        pageSize: 20,
      );
      notifyListeners();
    } catch (exception) {
      error = appFailureMessage(exception);
      notifyListeners();
    }
  }

  Future<void> reloadCandidateProviders() async {
    try {
      candidateProviders = await _tenantRepository.listCurrentCandidateProviders(
        page: 1,
        pageSize: 20,
      );
      notifyListeners();
    } catch (exception) {
      error = appFailureMessage(exception);
      notifyListeners();
    }
  }

  Future<void> reloadOffers() async {
    try {
      offers = await _tenantRepository.listCurrentOffers(page: 1, pageSize: 20);
      notifyListeners();
    } catch (exception) {
      error = appFailureMessage(exception);
      notifyListeners();
    }
  }

  Future<void> reloadAuditEvents() async {
    try {
      auditEvents = await _tenantRepository.listCurrentTenantAuditEvents(
        page: 1,
        pageSize: 20,
      );
      notifyListeners();
    } catch (exception) {
      error = appFailureMessage(exception);
      notifyListeners();
    }
  }

  Future<void> reloadServiceCatalog() async {
    try {
      serviceCatalog = await _tenantRepository.listCurrentServiceCatalog(
        page: 1,
        pageSize: 20,
      );
      notifyListeners();
    } catch (exception) {
      error = appFailureMessage(exception);
      notifyListeners();
    }
  }

  Future<bool> updateCurrentProfile(Map<String, dynamic> payload) async {
    submitting = true;
    error = null;
    notifyListeners();
    try {
      await _tenantRepository.updateCurrentProfile(payload);
      await reloadCurrentProfile();
      message = 'Perfil actualizado';
      return true;
    } catch (exception) {
      error = appFailureMessage(exception);
      return false;
    } finally {
      submitting = false;
      notifyListeners();
    }
  }

  Future<void> reloadCurrentProfile() async {
    try {
      currentProfile = await _tenantRepository.getCurrentProfile();
      notifyListeners();
    } catch (exception) {
      error = appFailureMessage(exception);
      notifyListeners();
    }
  }

  Future<bool> updateCurrentSettings(Map<String, dynamic> payload) async {
    submitting = true;
    error = null;
    notifyListeners();
    try {
      await _tenantRepository.updateCurrentSettings(payload);
      await reloadCurrentSettings();
      message = 'Configuración actualizada';
      return true;
    } catch (exception) {
      error = appFailureMessage(exception);
      return false;
    } finally {
      submitting = false;
      notifyListeners();
    }
  }

  Future<void> reloadCurrentSettings() async {
    try {
      currentSettings = await _tenantRepository.getCurrentSettings();
      notifyListeners();
    } catch (exception) {
      error = appFailureMessage(exception);
      notifyListeners();
    }
  }

  Future<bool> createCurrentTenantNetwork(Map<String, dynamic> payload) async {
    submitting = true;
    error = null;
    notifyListeners();
    try {
      await _tenantRepository.createCurrentTenantNetwork(payload);
      await reloadCurrentTenant();
      message = 'Red del taller creada';
      return true;
    } catch (exception) {
      error = appFailureMessage(exception);
      return false;
    } finally {
      submitting = false;
      notifyListeners();
    }
  }

  Future<void> reloadCurrentTenant() async {
    try {
      currentTenant = await _tenantRepository.getCurrentTenant();
      notifyListeners();
    } catch (exception) {
      error = appFailureMessage(exception);
      notifyListeners();
    }
  }

  Future<void> reloadCurrentTenantDetail() async {
    try {
      currentTenantDetail = await _tenantRepository.getCurrentTenantDetail();
      notifyListeners();
    } catch (exception) {
      error = appFailureMessage(exception);
      notifyListeners();
    }
  }

  Future<bool> updateCurrentProviderProfile(Map<String, dynamic> payload) async {
    submitting = true;
    error = null;
    notifyListeners();
    try {
      await _tenantRepository.updateCurrentProviderProfile(payload);
      await reloadCurrentProviderProfile();
      message = 'Perfil de proveedor actualizado';
      return true;
    } catch (exception) {
      error = appFailureMessage(exception);
      return false;
    } finally {
      submitting = false;
      notifyListeners();
    }
  }

  Future<void> reloadCurrentProviderProfile() async {
    try {
      currentProviderProfile = await _tenantRepository.getCurrentProviderProfile();
      notifyListeners();
    } catch (exception) {
      error = appFailureMessage(exception);
      notifyListeners();
    }
  }

  Future<bool> deleteTechnician(String technicianId) async {
    submitting = true;
    error = null;
    notifyListeners();
    try {
      await _tenantRepository.deleteCurrentTechnician(technicianId);
      await reloadTechnicians();
      message = 'Técnico eliminado';
      return true;
    } catch (exception) {
      error = appFailureMessage(exception);
      return false;
    } finally {
      submitting = false;
      notifyListeners();
    }
  }

  Future<bool> updateTechnicianAvailability(
    String technicianId,
    Map<String, dynamic> payload,
  ) async {
    submitting = true;
    error = null;
    notifyListeners();
    try {
      await _tenantRepository.upsertTechnicianAvailability(technicianId, payload);
      await reloadTechnicians();
      message = 'Disponibilidad del técnico actualizada';
      return true;
    } catch (exception) {
      error = appFailureMessage(exception);
      return false;
    } finally {
      submitting = false;
      notifyListeners();
    }
  }

  Future<bool> changeCurrentMemberStatus(
    String membershipId,
    Map<String, dynamic> payload,
  ) async {
    submitting = true;
    error = null;
    notifyListeners();
    try {
      await _tenantRepository.changeCurrentMemberStatus(membershipId, payload);
      await reloadMembers();
      message = 'Estado del miembro actualizado';
      return true;
    } catch (exception) {
      error = appFailureMessage(exception);
      return false;
    } finally {
      submitting = false;
      notifyListeners();
    }
  }

  Future<bool> removeCurrentMember(String membershipId) async {
    submitting = true;
    error = null;
    notifyListeners();
    try {
      await _tenantRepository.removeCurrentMember(membershipId);
      await reloadMembers();
      message = 'Miembro eliminado';
      return true;
    } catch (exception) {
      error = appFailureMessage(exception);
      return false;
    } finally {
      submitting = false;
      notifyListeners();
    }
  }

  Future<bool> revokeTenantSession(String sessionId) async {
    submitting = true;
    error = null;
    notifyListeners();
    try {
      await _tenantRepository.revokeMyTenantSession(sessionId);
      await reloadTenantSessions();
      message = 'Sesión revocada';
      return true;
    } catch (exception) {
      error = appFailureMessage(exception);
      return false;
    } finally {
      submitting = false;
      notifyListeners();
    }
  }

  Future<void> reloadIncidentAnalyses(String incidentId) async {
    try {
      incidentAnalyses = await _tenantRepository.listCurrentIncidentAiAnalyses(
        incidentId,
        page: 1,
        pageSize: 20,
      );
      notifyListeners();
    } catch (exception) {
      error = appFailureMessage(exception);
      notifyListeners();
    }
  }

  Future<bool> createIncidentAiAnalysis(
    String incidentId,
    Map<String, dynamic> payload,
  ) async {
    submitting = true;
    error = null;
    notifyListeners();
    try {
      await _tenantRepository.createCurrentIncidentAiAnalysis(incidentId, payload);
      await reloadIncidentAnalyses(incidentId);
      message = 'Análisis IA creado';
      return true;
    } catch (exception) {
      error = appFailureMessage(exception);
      return false;
    } finally {
      submitting = false;
      notifyListeners();
    }
  }

  Future<bool> createTechnicianService(Map<String, dynamic> payload) async {
    submitting = true;
    error = null;
    notifyListeners();
    try {
      await _tenantRepository.createCurrentTechnicianService(payload);
      await reloadTechnicianServices();
      message = 'Servicio técnico creado';
      return true;
    } catch (exception) {
      error = appFailureMessage(exception);
      return false;
    } finally {
      submitting = false;
      notifyListeners();
    }
  }

  Future<bool> updateTechnicianService(
    String technicianServiceId,
    Map<String, dynamic> payload,
  ) async {
    submitting = true;
    error = null;
    notifyListeners();
    try {
      await _tenantRepository.updateCurrentTechnicianService(
        technicianServiceId,
        payload,
      );
      await reloadTechnicianServices();
      message = 'Servicio técnico actualizado';
      return true;
    } catch (exception) {
      error = appFailureMessage(exception);
      return false;
    } finally {
      submitting = false;
      notifyListeners();
    }
  }

  Future<bool> changeTechnicianServiceStatus(
    String technicianServiceId,
    bool isEnabled,
  ) async {
    submitting = true;
    error = null;
    notifyListeners();
    try {
      await _tenantRepository.changeCurrentTechnicianServiceStatus(
        technicianServiceId,
        {'is_enabled': isEnabled},
      );
      await reloadTechnicianServices();
      message = 'Estado del servicio técnico actualizado';
      return true;
    } catch (exception) {
      error = appFailureMessage(exception);
      return false;
    } finally {
      submitting = false;
      notifyListeners();
    }
  }

  Future<void> reloadCandidateProvidersAndOffers() async {
    await Future.wait<void>([
      reloadCandidateProviders(),
      reloadOffers(),
    ]);
  }

  Future<bool> updateCandidateProviderStatus(
    String candidateId,
    Map<String, dynamic> payload,
  ) async {
    submitting = true;
    error = null;
    notifyListeners();
    try {
      await _tenantRepository.changeCurrentCandidateProviderStatus(
        candidateId,
        payload,
      );
      await reloadCandidateProviders();
      message = 'Estado del candidato actualizado';
      return true;
    } catch (exception) {
      error = appFailureMessage(exception);
      return false;
    } finally {
      submitting = false;
      notifyListeners();
    }
  }

  Future<bool> acceptOffer(String offerId) async {
    submitting = true;
    error = null;
    notifyListeners();
    try {
      await _tenantRepository.acceptCurrentOffer(offerId);
      await reloadOffers();
      message = 'Oferta aceptada';
      return true;
    } catch (exception) {
      error = appFailureMessage(exception);
      return false;
    } finally {
      submitting = false;
      notifyListeners();
    }
  }

  Future<bool> rejectOffer(String offerId) async {
    submitting = true;
    error = null;
    notifyListeners();
    try {
      await _tenantRepository.rejectCurrentOffer(offerId);
      await reloadOffers();
      message = 'Oferta rechazada';
      return true;
    } catch (exception) {
      error = appFailureMessage(exception);
      return false;
    } finally {
      submitting = false;
      notifyListeners();
    }
  }

  Future<bool> createAssignment(Map<String, dynamic> payload) async {
    submitting = true;
    error = null;
    notifyListeners();
    try {
      await _tenantRepository.createCurrentAssignment(payload);
      await reloadAssignments();
      message = 'Asignación creada';
      return true;
    } catch (exception) {
      error = appFailureMessage(exception);
      return false;
    } finally {
      submitting = false;
      notifyListeners();
    }
  }

  Future<bool> updateAssignment(
    String assignmentId,
    Map<String, dynamic> payload,
  ) async {
    submitting = true;
    error = null;
    notifyListeners();
    try {
      await _tenantRepository.updateCurrentAssignment(assignmentId, payload);
      await reloadAssignments();
      message = 'Asignación actualizada';
      return true;
    } catch (exception) {
      error = appFailureMessage(exception);
      return false;
    } finally {
      submitting = false;
      notifyListeners();
    }
  }

  Future<bool> changeAssignmentStatus(
    String assignmentId,
    Map<String, dynamic> payload,
  ) async {
    submitting = true;
    error = null;
    notifyListeners();
    try {
      await _tenantRepository.changeCurrentAssignmentStatus(
        assignmentId,
        payload,
      );
      await reloadAssignments();
      message = 'Estado de asignación actualizado';
      return true;
    } catch (exception) {
      error = appFailureMessage(exception);
      return false;
    } finally {
      submitting = false;
      notifyListeners();
    }
  }

  Future<void> reloadAssignmentTrackingEvents(String assignmentId) async {
    try {
      assignmentTrackingEvents =
          await _tenantRepository.listCurrentAssignmentTrackingEvents(
        assignmentId,
        page: 1,
        pageSize: 20,
      );
      notifyListeners();
    } catch (exception) {
      error = appFailureMessage(exception);
      notifyListeners();
    }
  }

  Future<bool> createAssignmentTrackingEvent(
    String assignmentId,
    Map<String, dynamic> payload,
  ) async {
    submitting = true;
    error = null;
    notifyListeners();
    try {
      await _tenantRepository.createCurrentAssignmentTrackingEvent(
        assignmentId,
        payload,
      );
      await reloadAssignmentTrackingEvents(assignmentId);
      message = 'Evento de tracking creado';
      return true;
    } catch (exception) {
      error = appFailureMessage(exception);
      return false;
    } finally {
      submitting = false;
      notifyListeners();
    }
  }
}

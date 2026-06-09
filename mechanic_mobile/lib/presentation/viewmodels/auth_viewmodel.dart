import 'dart:async';

import 'package:flutter/foundation.dart';

import '../../core/services/session_storage.dart';
import '../../core/error/failures.dart';
import '../../domain/entities/auth_entities.dart';
import '../../domain/usecases/auth_usecases.dart';
import 'notifications_viewmodel.dart';

class AuthViewModel extends ChangeNotifier {
  AuthViewModel({
    required LoginUseCase login,
    required RegisterClientUseCase registerClient,
    required RegisterTenantUseCase registerTenant,
    required SelectTenantUseCase selectTenant,
    required RefreshAuthUseCase refreshAuth,
    required LogoutUseCase logout,
    required MeAuthUseCase meAuth,
    required NotificationsViewModel notificationsViewModel,
    required SessionStorage sessionStorage,
  })  : _login = login,
        _registerClient = registerClient,
        _registerTenant = registerTenant,
        _selectTenant = selectTenant,
        _refreshAuth = refreshAuth,
        _logout = logout,
        _meAuth = meAuth,
        _notificationsViewModel = notificationsViewModel,
        _sessionStorage = sessionStorage;

  final LoginUseCase _login;
  final RegisterClientUseCase _registerClient;
  final RegisterTenantUseCase _registerTenant;
  final SelectTenantUseCase _selectTenant;
  final RefreshAuthUseCase _refreshAuth;
  final LogoutUseCase _logout;
  final MeAuthUseCase _meAuth;
  final NotificationsViewModel _notificationsViewModel;
  final SessionStorage _sessionStorage;

  AuthContextEntity? contextData;
  AppEntryRole selectedRole = AppEntryRole.client;
  bool loading = false;
  bool submitting = false;
  String? error;
  String? message;

  void setRole(AppEntryRole role) {
    selectedRole = role;
    notifyListeners();
  }

  Future<void> bootstrap() async {
    if (_sessionStorage.apiToken.isEmpty && _sessionStorage.refreshToken.isEmpty) {
      return;
    }
    loading = true;
    error = null;
    notifyListeners();
    try {
      if (_sessionStorage.apiToken.isEmpty && _sessionStorage.refreshToken.isNotEmpty) {
        contextData = await _refreshAuth();
      } else {
        try {
          contextData = await _meAuth();
        } catch (_) {
          if (_sessionStorage.refreshToken.isNotEmpty) {
            contextData = await _refreshAuth();
          } else {
            rethrow;
          }
        }
      }
      selectedRole = _roleFromUserType(contextData?.userType);
      unawaited(_maybeRegisterDevice());
    } catch (exception) {
      error = _errorMessage(exception);
    } finally {
      loading = false;
      notifyListeners();
    }
  }

  Future<bool> login(LoginInput input) async {
    submitting = true;
    error = null;
    message = null;
    notifyListeners();
    try {
      contextData = await _login(input);
      selectedRole = _roleFromUserType(contextData?.userType);
      _notificationsViewModel.reset();
      unawaited(_maybeRegisterDevice());
      message = 'Sesión iniciada';
      return true;
    } catch (exception) {
      error = _errorMessage(exception);
      return false;
    } finally {
      submitting = false;
      notifyListeners();
    }
  }

  Future<bool> registerClient(RegisterClientInput input) async {
    submitting = true;
    error = null;
    message = null;
    notifyListeners();
    try {
      contextData = await _registerClient(input);
      selectedRole = AppEntryRole.client;
      _notificationsViewModel.reset();
      unawaited(_maybeRegisterDevice());
      message = 'Cliente registrado';
      return true;
    } catch (exception) {
      error = _errorMessage(exception);
      return false;
    } finally {
      submitting = false;
      notifyListeners();
    }
  }

  Future<bool> registerTenant(RegisterTenantInput input) async {
    submitting = true;
    error = null;
    message = null;
    notifyListeners();
    try {
      contextData = await _registerTenant(input);
      selectedRole = _roleFromTenantKind(input.tenantKind);
      _notificationsViewModel.reset();
      unawaited(_maybeRegisterDevice());
      message = 'Taller o mecánico registrado';
      return true;
    } catch (exception) {
      error = _errorMessage(exception);
      return false;
    } finally {
      submitting = false;
      notifyListeners();
    }
  }

  Future<bool> selectTenant(String tenantId) async {
    submitting = true;
    error = null;
    message = null;
    notifyListeners();
    try {
      contextData = await _selectTenant(SelectTenantInput(tenantId: tenantId));
      selectedRole = _roleFromUserType(contextData?.userType);
      await _sessionStorage.setAuthMeta(tenantId: tenantId);
      _notificationsViewModel.reset();
      unawaited(_maybeRegisterDevice(force: true));
      message = 'Tenant seleccionado';
      return true;
    } catch (exception) {
      error = _errorMessage(exception);
      return false;
    } finally {
      submitting = false;
      notifyListeners();
    }
  }

  Future<void> refresh() async {
    if (_sessionStorage.refreshToken.isEmpty) return;
    loading = true;
    error = null;
    notifyListeners();
    try {
      contextData = await _refreshAuth();
      selectedRole = _roleFromUserType(contextData?.userType);
      unawaited(_maybeRegisterDevice());
    } catch (exception) {
      error = _errorMessage(exception);
    } finally {
      loading = false;
      notifyListeners();
    }
  }

  bool get needsTenantSelection {
    final context = contextData;
    if (context == null) return false;
    if (selectedRole == AppEntryRole.client) return false;
    if (context.availableTenants.isEmpty) return false;
    return context.requiresTenantSelection ||
        (context.tenantId == null || context.tenantId!.isEmpty);
  }

  Future<void> signOut() async {
    try {
      await _logout();
    } catch (_) {
      // Si falla el backend, la sesión local ya queda limpia por el repositorio.
    }
    contextData = null;
    selectedRole = AppEntryRole.client;
    _notificationsViewModel.reset();
    notifyListeners();
  }

  Future<void> _maybeRegisterDevice({bool force = false}) async {
    final context = contextData;
    if (context == null) return;
    final normalizedUserType = context.userType.toUpperCase();
    final needsTenantSelection = context.requiresTenantSelection &&
        (context.tenantId == null || context.tenantId!.isEmpty);
    if (!force && normalizedUserType != 'CLIENT' && needsTenantSelection) {
      return;
    }
    try {
      await _notificationsViewModel.registerCurrentDevice(silent: true);
    } catch (_) {
      // Ignore device registration failures during auth flow.
    }
  }
}

AppEntryRole _roleFromUserType(String? userType) {
  final normalized = (userType ?? '').toLowerCase();
  if (normalized == 'client' || normalized.contains('client')) {
    return AppEntryRole.client;
  }
  if (normalized == 'technician' ||
      normalized.contains('mechanic') ||
      normalized.contains('technician')) {
    return AppEntryRole.mechanic;
  }
  return AppEntryRole.workshop;
}

AppEntryRole _roleFromTenantKind(String tenantKind) {
  switch (tenantKind.toUpperCase()) {
    case 'INDEPENDENT_TECHNICIAN':
      return AppEntryRole.mechanic;
    case 'WORKSHOP':
    case 'WORKSHOP_NETWORK':
    default:
      return AppEntryRole.workshop;
  }
}

String _errorMessage(Object error) {
  return appFailureMessage(error);
}

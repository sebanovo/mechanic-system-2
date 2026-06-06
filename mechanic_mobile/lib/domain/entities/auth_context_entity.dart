import 'package:equatable/equatable.dart';

import 'auth_tenant_entity.dart';
import 'auth_token_entity.dart';
import 'client_entity.dart';
import 'session_entity.dart';

class AuthContextEntity extends Equatable {
  const AuthContextEntity({
    required this.user,
    required this.userType,
    required this.session,
    this.tenantId,
    this.currentTenant,
    this.availableTenants = const <AuthTenantEntity>[],
    this.requiresTenantSelection = false,
    this.tokens,
    this.raw = const <String, dynamic>{},
  });

  final ClientEntity user;
  final String userType;
  final String? tenantId;
  final AuthTenantEntity? currentTenant;
  final List<AuthTenantEntity> availableTenants;
  final bool requiresTenantSelection;
  final SessionEntity session;
  final AuthTokenEntity? tokens;
  final Map<String, dynamic> raw;

  @override
  List<Object?> get props => [
        user,
        userType,
        tenantId,
        currentTenant,
        availableTenants,
        requiresTenantSelection,
        session,
        tokens,
        raw,
      ];
}

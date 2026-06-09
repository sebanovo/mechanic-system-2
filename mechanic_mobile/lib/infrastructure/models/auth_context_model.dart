import '../../domain/entities/auth_context_entity.dart';
import 'app_model_utils.dart';
import 'auth_tenant_model.dart';
import 'auth_token_model.dart';
import 'client_model.dart';
import 'session_model.dart';

class AuthContextModel extends AuthContextEntity {
  const AuthContextModel({
    required super.user,
    required super.userType,
    required super.session,
    super.tenantId,
    super.currentTenant,
    super.availableTenants,
    super.requiresTenantSelection,
    super.tokens,
    super.raw,
  });

  factory AuthContextModel.fromJson(Map<String, dynamic> json) {
    final userJson = mapOf(json['user']);
    final sessionJson = mapOf(json['session']);
    final currentTenantJson = json['current_tenant'];
    final tenants = listMapOf(
      json['available_tenants'],
    ).map(AuthTenantModel.fromJson).toList();
    final tokensJson = json['tokens'];

    return AuthContextModel(
      user: ClientModel.fromJson(userJson),
      userType: stringOf(json['user_type']) ?? '',
      tenantId: stringOf(json['tenant_id']),
      currentTenant: currentTenantJson is Map<String, dynamic>
          ? AuthTenantModel.fromJson(currentTenantJson)
          : currentTenantJson is Map
          ? AuthTenantModel.fromJson(
              Map<String, dynamic>.from(currentTenantJson),
            )
          : null,
      availableTenants: tenants,
      requiresTenantSelection: boolOf(json['requires_tenant_selection']),
      session: SessionModel.fromJson(sessionJson),
      tokens: tokensJson is Map<String, dynamic>
          ? AuthTokenModel.fromJson(tokensJson)
          : tokensJson is Map
          ? AuthTokenModel.fromJson(Map<String, dynamic>.from(tokensJson))
          : null,
      raw: json,
    );
  }
}

import '../../domain/entities/app_entities.dart';
import '../../domain/entities/auth_entities.dart';
import 'app_models.dart';

class AuthTokenModel extends AuthTokenEntity {
  const AuthTokenModel({
    required super.accessToken,
    required super.accessExpiresAt,
    required super.refreshToken,
    required super.refreshExpiresAt,
    super.tokenType,
    super.raw,
  });

  factory AuthTokenModel.fromJson(Map<String, dynamic> json) {
    return AuthTokenModel(
      accessToken: stringOf(json['access_token']) ?? '',
      accessExpiresAt: dateTimeOf(json['access_expires_at']),
      refreshToken: stringOf(json['refresh_token']) ?? '',
      refreshExpiresAt: dateTimeOf(json['refresh_expires_at']),
      tokenType: stringOf(json['token_type']),
      raw: json,
    );
  }
}

class AuthTenantModel extends AuthTenantEntity {
  const AuthTenantModel({
    required super.id,
    required super.slug,
    required super.commercialName,
    required super.tenantKind,
    required super.status,
    super.raw,
  });

  factory AuthTenantModel.fromJson(Map<String, dynamic> json) {
    return AuthTenantModel(
      id: stringOf(json['id']) ?? '',
      slug: stringOf(json['slug']) ?? '',
      commercialName: stringOf(json['commercial_name']) ?? '',
      tenantKind: stringOf(json['tenant_kind']) ?? '',
      status: stringOf(json['status']) ?? '',
      raw: json,
    );
  }
}

class AuthContextModel extends AuthContextEntity {
  AuthContextModel({
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
    final tenants = listMapOf(json['available_tenants'])
        .map(AuthTenantModel.fromJson)
        .toList();
    final tokensJson = json['tokens'];

    return AuthContextModel(
      user: ClientModel.fromJson(userJson),
      userType: stringOf(json['user_type']) ?? '',
      tenantId: stringOf(json['tenant_id']),
      currentTenant: currentTenantJson is Map<String, dynamic>
          ? AuthTenantModel.fromJson(currentTenantJson)
          : currentTenantJson is Map
              ? AuthTenantModel.fromJson(Map<String, dynamic>.from(currentTenantJson))
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


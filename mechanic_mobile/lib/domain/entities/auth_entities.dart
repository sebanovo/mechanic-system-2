import 'package:equatable/equatable.dart';

import 'app_entities.dart';

enum AppEntryRole { client, workshop, mechanic }

class AuthTokenEntity extends Equatable {
  const AuthTokenEntity({
    required this.accessToken,
    required this.accessExpiresAt,
    required this.refreshToken,
    required this.refreshExpiresAt,
    this.tokenType,
    this.raw = const <String, dynamic>{},
  });

  final String accessToken;
  final DateTime? accessExpiresAt;
  final String refreshToken;
  final DateTime? refreshExpiresAt;
  final String? tokenType;
  final Map<String, dynamic> raw;

  @override
  List<Object?> get props => [
        accessToken,
        accessExpiresAt,
        refreshToken,
        refreshExpiresAt,
        tokenType,
        raw,
      ];
}

class AuthTenantEntity extends Equatable {
  const AuthTenantEntity({
    required this.id,
    required this.slug,
    required this.commercialName,
    required this.tenantKind,
    required this.status,
    this.raw = const <String, dynamic>{},
  });

  final String id;
  final String slug;
  final String commercialName;
  final String tenantKind;
  final String status;
  final Map<String, dynamic> raw;

  @override
  List<Object?> get props => [id, slug, commercialName, tenantKind, status, raw];
}

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

class LoginInput extends Equatable {
  const LoginInput({
    required this.email,
    required this.password,
  });

  final String email;
  final String password;

  Map<String, dynamic> toJson() => {
        'email': email,
        'password': password,
      };

  @override
  List<Object?> get props => [email, password];
}

class RegisterClientInput extends Equatable {
  const RegisterClientInput({
    required this.email,
    required this.password,
    required this.firstName,
    required this.lastName,
  });

  final String email;
  final String password;
  final String firstName;
  final String lastName;

  Map<String, dynamic> toJson() => {
        'email': email,
        'password': password,
        'first_name': firstName,
        'last_name': lastName,
      };

  @override
  List<Object?> get props => [email, password, firstName, lastName];
}

class RegisterTenantInput extends Equatable {
  const RegisterTenantInput({
    required this.email,
    required this.password,
    required this.firstName,
    required this.lastName,
    required this.commercialName,
    required this.tenantKind,
  });

  final String email;
  final String password;
  final String firstName;
  final String lastName;
  final String commercialName;
  final String tenantKind;

  Map<String, dynamic> toJson() => {
        'email': email,
        'password': password,
        'first_name': firstName,
        'last_name': lastName,
        'commercial_name': commercialName,
        'tenant_kind': tenantKind,
      };

  @override
  List<Object?> get props => [
        email,
        password,
        firstName,
        lastName,
        commercialName,
        tenantKind,
      ];
}

class SelectTenantInput extends Equatable {
  const SelectTenantInput({required this.tenantId});

  final String tenantId;

  Map<String, dynamic> toJson() => {'tenant_id': tenantId};

  @override
  List<Object?> get props => [tenantId];
}


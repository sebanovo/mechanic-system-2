import '../../domain/entities/auth_tenant_entity.dart';
import 'app_model_utils.dart';

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

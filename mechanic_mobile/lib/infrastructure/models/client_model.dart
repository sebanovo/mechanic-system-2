import '../../domain/entities/client_entity.dart';
import 'app_model_utils.dart';

class ClientModel extends ClientEntity {
  const ClientModel({
    required super.id,
    required super.email,
    required super.firstName,
    required super.lastName,
    required super.userType,
    required super.status,
    required super.emailVerified,
    required super.createdAt,
    required super.updatedAt,
    super.phone,
    super.avatarUrl,
    super.emailVerifiedAt,
    super.lastLoginAt,
    super.passwordChangedAt,
    super.deletedAt,
    super.raw,
  });

  factory ClientModel.fromJson(Map<String, dynamic> json) {
    return ClientModel(
      id: stringOf(json['id']) ?? '',
      email: stringOf(json['email']) ?? '',
      firstName: stringOf(json['first_name']) ?? '',
      lastName: stringOf(json['last_name']) ?? '',
      phone: stringOf(json['phone']),
      avatarUrl: stringOf(json['avatar_url']),
      userType: stringOf(json['user_type']) ?? 'client',
      status: stringOf(json['status']) ?? 'unknown',
      emailVerified: boolOf(json['email_verified']),
      emailVerifiedAt: dateTimeOf(json['email_verified_at']),
      lastLoginAt: dateTimeOf(json['last_login_at']),
      passwordChangedAt: dateTimeOf(json['password_changed_at']),
      createdAt: dateTimeOf(json['created_at']),
      updatedAt: dateTimeOf(json['updated_at']),
      deletedAt: dateTimeOf(json['deleted_at']),
      raw: json,
    );
  }
}

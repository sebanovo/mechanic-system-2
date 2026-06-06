import '../../domain/entities/auth_token_entity.dart';
import 'app_model_utils.dart';

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

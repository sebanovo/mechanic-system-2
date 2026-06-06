import '../../domain/entities/session_entity.dart';
import 'app_model_utils.dart';

class SessionModel extends SessionEntity {
  const SessionModel({
    required super.id,
    required super.userId,
    required super.sessionStatus,
    required super.loginAt,
    required super.expiresAt,
    required super.createdAt,
    required super.updatedAt,
    super.tenantId,
    super.deviceType,
    super.deviceName,
    super.ipAddress,
    super.userAgent,
    super.lastActivityAt,
    super.revokedAt,
    super.raw,
  });

  factory SessionModel.fromJson(Map<String, dynamic> json) {
    return SessionModel(
      id: stringOf(json['id']) ?? '',
      userId: stringOf(json['user_id']) ?? '',
      tenantId: stringOf(json['tenant_id']),
      sessionStatus: stringOf(json['session_status']) ?? 'unknown',
      deviceType: stringOf(json['device_type']),
      deviceName: stringOf(json['device_name']),
      ipAddress: stringOf(json['ip_address']),
      userAgent: stringOf(json['user_agent']),
      loginAt: dateTimeOf(json['login_at']) ?? DateTime.fromMillisecondsSinceEpoch(0),
      lastActivityAt: dateTimeOf(json['last_activity_at']),
      expiresAt: dateTimeOf(json['expires_at']) ?? DateTime.fromMillisecondsSinceEpoch(0),
      revokedAt: dateTimeOf(json['revoked_at']),
      createdAt: dateTimeOf(json['created_at']) ?? DateTime.fromMillisecondsSinceEpoch(0),
      updatedAt: dateTimeOf(json['updated_at']) ?? DateTime.fromMillisecondsSinceEpoch(0),
      raw: json,
    );
  }
}

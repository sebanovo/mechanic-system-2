import 'package:equatable/equatable.dart';

class SessionEntity extends Equatable {
  const SessionEntity({
    required this.id,
    required this.userId,
    required this.sessionStatus,
    required this.loginAt,
    required this.expiresAt,
    required this.createdAt,
    required this.updatedAt,
    this.tenantId,
    this.deviceType,
    this.deviceName,
    this.ipAddress,
    this.userAgent,
    this.lastActivityAt,
    this.revokedAt,
    this.raw = const <String, dynamic>{},
  });

  final String id;
  final String userId;
  final String sessionStatus;
  final DateTime loginAt;
  final DateTime expiresAt;
  final DateTime createdAt;
  final DateTime updatedAt;
  final String? tenantId;
  final String? deviceType;
  final String? deviceName;
  final String? ipAddress;
  final String? userAgent;
  final DateTime? lastActivityAt;
  final DateTime? revokedAt;
  final Map<String, dynamic> raw;

  @override
  List<Object?> get props => [
        id,
        userId,
        sessionStatus,
        loginAt,
        expiresAt,
        createdAt,
        updatedAt,
        tenantId,
        deviceType,
        deviceName,
        ipAddress,
        userAgent,
        lastActivityAt,
        revokedAt,
        raw,
      ];
}

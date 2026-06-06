import '../../domain/entities/app_entities.dart';

Map<String, dynamic> mapOf(dynamic value) {
  if (value is Map<String, dynamic>) {
    return value;
  }
  if (value is Map) {
    return Map<String, dynamic>.from(value);
  }
  return <String, dynamic>{};
}

List<Map<String, dynamic>> listMapOf(dynamic value) {
  if (value is List) {
    return value
        .whereType<Map>()
        .map((entry) => Map<String, dynamic>.from(entry))
        .toList();
  }
  return <Map<String, dynamic>>[];
}

String? stringOf(dynamic value) {
  if (value == null) return null;
  final result = value.toString().trim();
  return result.isEmpty ? null : result;
}

int? intOf(dynamic value) {
  if (value == null) return null;
  if (value is int) return value;
  return int.tryParse(value.toString());
}

double? doubleOf(dynamic value) {
  if (value == null) return null;
  if (value is double) return value;
  if (value is int) return value.toDouble();
  return double.tryParse(value.toString());
}

bool boolOf(dynamic value) {
  if (value is bool) return value;
  if (value is num) return value != 0;
  if (value is String) {
    final normalized = value.toLowerCase();
    return normalized == 'true' || normalized == '1' || normalized == 'yes';
  }
  return false;
}

DateTime? dateTimeOf(dynamic value) {
  if (value == null) return null;
  if (value is DateTime) return value;
  return DateTime.tryParse(value.toString());
}

PaginationEntity paginationFromJson(Map<String, dynamic> json) {
  return PaginationEntity(
    page: intOf(json['page']) ?? 1,
    pageSize: intOf(json['page_size']) ?? 0,
    total: intOf(json['total']) ?? 0,
    totalPages: intOf(json['total_pages']) ?? 0,
    hasNext: boolOf(json['has_next']),
    hasPrevious: boolOf(json['has_previous']),
  );
}

class PaginationModel extends PaginationEntity {
  const PaginationModel({
    required super.page,
    required super.pageSize,
    required super.total,
    required super.totalPages,
    required super.hasNext,
    required super.hasPrevious,
  });

  factory PaginationModel.fromJson(Map<String, dynamic> json) {
    return PaginationModel(
      page: intOf(json['page']) ?? 1,
      pageSize: intOf(json['page_size']) ?? 0,
      total: intOf(json['total']) ?? 0,
      totalPages: intOf(json['total_pages']) ?? 0,
      hasNext: boolOf(json['has_next']),
      hasPrevious: boolOf(json['has_previous']),
    );
  }
}

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

class VehicleModel extends VehicleEntity {
  const VehicleModel({
    required super.id,
    required super.customerId,
    required super.plateNumber,
    required super.vehicleType,
    required super.status,
    required super.createdAt,
    required super.updatedAt,
    super.brand,
    super.model,
    super.year,
    super.color,
    super.deletedAt,
    super.raw,
  });

  factory VehicleModel.fromJson(Map<String, dynamic> json) {
    return VehicleModel(
      id: stringOf(json['id']) ?? '',
      customerId: stringOf(json['customer_id']) ?? '',
      plateNumber: stringOf(json['plate_number']) ?? '',
      brand: stringOf(json['brand']),
      model: stringOf(json['model']),
      year: intOf(json['year']),
      color: stringOf(json['color']),
      vehicleType: stringOf(json['vehicle_type']) ?? 'unknown',
      status: stringOf(json['status']) ?? 'unknown',
      createdAt: dateTimeOf(json['created_at']),
      updatedAt: dateTimeOf(json['updated_at']),
      deletedAt: dateTimeOf(json['deleted_at']),
      raw: json,
    );
  }
}

class VehicleDetailModel extends VehicleDetailEntity {
  const VehicleDetailModel({
    required super.vehicle,
    required super.customer,
    super.raw,
  });

  factory VehicleDetailModel.fromJson(Map<String, dynamic> json) {
    final vehicleJson = mapOf(json['vehicle']);
    final customerJson = mapOf(json['customer']);
    return VehicleDetailModel(
      vehicle: VehicleModel.fromJson(vehicleJson),
      customer: customerJson,
      raw: json,
    );
  }
}

class IncidentModel extends IncidentEntity {
  const IncidentModel({
    required super.id,
    required super.customerId,
    required super.vehicleId,
    required super.incidentCode,
    required super.title,
    required super.latitude,
    required super.longitude,
    required super.priority,
    required super.status,
    required super.reportedAt,
    required super.createdAt,
    required super.updatedAt,
    super.serviceCatalogId,
    super.description,
    super.addressText,
    super.cancelledAt,
    super.completedAt,
    super.deletedAt,
    super.raw,
  });

  factory IncidentModel.fromJson(Map<String, dynamic> json) {
    return IncidentModel(
      id: stringOf(json['id']) ?? '',
      customerId: stringOf(json['customer_id']) ?? '',
      vehicleId: stringOf(json['vehicle_id']) ?? '',
      serviceCatalogId: stringOf(json['service_catalog_id']),
      incidentCode: stringOf(json['incident_code']) ?? '',
      title: stringOf(json['title']) ?? '',
      description: stringOf(json['description']),
      latitude: doubleOf(json['latitude']) ?? 0,
      longitude: doubleOf(json['longitude']) ?? 0,
      addressText: stringOf(json['address_text']),
      priority: stringOf(json['priority']) ?? 'normal',
      status: stringOf(json['status']) ?? 'unknown',
      reportedAt: dateTimeOf(json['reported_at']) ?? DateTime.fromMillisecondsSinceEpoch(0),
      cancelledAt: dateTimeOf(json['cancelled_at']),
      completedAt: dateTimeOf(json['completed_at']),
      createdAt: dateTimeOf(json['created_at']) ?? DateTime.fromMillisecondsSinceEpoch(0),
      updatedAt: dateTimeOf(json['updated_at']) ?? DateTime.fromMillisecondsSinceEpoch(0),
      deletedAt: dateTimeOf(json['deleted_at']),
      raw: json,
    );
  }
}

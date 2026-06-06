import 'package:equatable/equatable.dart';

class PaginationEntity extends Equatable {
  const PaginationEntity({
    required this.page,
    required this.pageSize,
    required this.total,
    required this.totalPages,
    required this.hasNext,
    required this.hasPrevious,
  });

  final int page;
  final int pageSize;
  final int total;
  final int totalPages;
  final bool hasNext;
  final bool hasPrevious;

  @override
  List<Object?> get props =>
      [page, pageSize, total, totalPages, hasNext, hasPrevious];
}

class PagedResult<T> extends Equatable {
  const PagedResult({
    required this.items,
    required this.pagination,
  });

  final List<T> items;
  final PaginationEntity pagination;

  @override
  List<Object?> get props => [items, pagination];
}

class ClientEntity extends Equatable {
  const ClientEntity({
    required this.id,
    required this.email,
    required this.firstName,
    required this.lastName,
    required this.userType,
    required this.status,
    required this.emailVerified,
    required this.createdAt,
    required this.updatedAt,
    this.phone,
    this.avatarUrl,
    this.emailVerifiedAt,
    this.lastLoginAt,
    this.passwordChangedAt,
    this.deletedAt,
    this.raw = const <String, dynamic>{},
  });

  final String id;
  final String email;
  final String firstName;
  final String lastName;
  final String? phone;
  final String? avatarUrl;
  final String userType;
  final String status;
  final bool emailVerified;
  final DateTime? emailVerifiedAt;
  final DateTime? lastLoginAt;
  final DateTime? passwordChangedAt;
  final DateTime? createdAt;
  final DateTime? updatedAt;
  final DateTime? deletedAt;
  final Map<String, dynamic> raw;

  String get fullName => '$firstName $lastName'.trim();

  @override
  List<Object?> get props => [
        id,
        email,
        firstName,
        lastName,
        phone,
        avatarUrl,
        userType,
        status,
        emailVerified,
        emailVerifiedAt,
        lastLoginAt,
        passwordChangedAt,
        createdAt,
        updatedAt,
        deletedAt,
        raw,
      ];
}

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

class VehicleEntity extends Equatable {
  const VehicleEntity({
    required this.id,
    required this.customerId,
    required this.plateNumber,
    required this.vehicleType,
    required this.status,
    required this.createdAt,
    required this.updatedAt,
    this.brand,
    this.model,
    this.year,
    this.color,
    this.deletedAt,
    this.raw = const <String, dynamic>{},
  });

  final String id;
  final String customerId;
  final String plateNumber;
  final String vehicleType;
  final String status;
  final DateTime? createdAt;
  final DateTime? updatedAt;
  final String? brand;
  final String? model;
  final int? year;
  final String? color;
  final DateTime? deletedAt;
  final Map<String, dynamic> raw;

  @override
  List<Object?> get props => [
        id,
        customerId,
        plateNumber,
        vehicleType,
        status,
        createdAt,
        updatedAt,
        brand,
        model,
        year,
        color,
        deletedAt,
        raw,
      ];
}

class VehicleDetailEntity extends Equatable {
  const VehicleDetailEntity({
    required this.vehicle,
    required this.customer,
    this.raw = const <String, dynamic>{},
  });

  final VehicleEntity vehicle;
  final Map<String, dynamic> customer;
  final Map<String, dynamic> raw;

  @override
  List<Object?> get props => [vehicle, customer, raw];
}

class IncidentEntity extends Equatable {
  const IncidentEntity({
    required this.id,
    required this.customerId,
    required this.vehicleId,
    required this.incidentCode,
    required this.title,
    required this.latitude,
    required this.longitude,
    required this.priority,
    required this.status,
    required this.reportedAt,
    required this.createdAt,
    required this.updatedAt,
    this.serviceCatalogId,
    this.description,
    this.addressText,
    this.cancelledAt,
    this.completedAt,
    this.deletedAt,
    this.raw = const <String, dynamic>{},
  });

  final String id;
  final String customerId;
  final String vehicleId;
  final String? serviceCatalogId;
  final String incidentCode;
  final String title;
  final double latitude;
  final double longitude;
  final String? description;
  final String? addressText;
  final String priority;
  final String status;
  final DateTime reportedAt;
  final DateTime? cancelledAt;
  final DateTime? completedAt;
  final DateTime createdAt;
  final DateTime updatedAt;
  final DateTime? deletedAt;
  final Map<String, dynamic> raw;

  @override
  List<Object?> get props => [
        id,
        customerId,
        vehicleId,
        serviceCatalogId,
        incidentCode,
        title,
        latitude,
        longitude,
        description,
        addressText,
        priority,
        status,
        reportedAt,
        cancelledAt,
        completedAt,
        createdAt,
        updatedAt,
        deletedAt,
        raw,
      ];
}

class ClientUpdateInput extends Equatable {
  const ClientUpdateInput({
    this.firstName,
    this.lastName,
    this.phone,
    this.avatarUrl,
  });

  final String? firstName;
  final String? lastName;
  final String? phone;
  final String? avatarUrl;

  Map<String, dynamic> toJson() {
    final payload = <String, dynamic>{};
    if (firstName != null) payload['first_name'] = firstName;
    if (lastName != null) payload['last_name'] = lastName;
    if (phone != null) payload['phone'] = phone;
    if (avatarUrl != null) payload['avatar_url'] = avatarUrl;
    return payload;
  }

  @override
  List<Object?> get props => [firstName, lastName, phone, avatarUrl];
}

class PasswordChangeInput extends Equatable {
  const PasswordChangeInput({
    required this.currentPassword,
    required this.newPassword,
  });

  final String currentPassword;
  final String newPassword;

  Map<String, dynamic> toJson() => {
        'current_password': currentPassword,
        'new_password': newPassword,
      };

  @override
  List<Object?> get props => [currentPassword, newPassword];
}

class VehicleUpsertInput extends Equatable {
  const VehicleUpsertInput({
    required this.plateNumber,
    required this.vehicleType,
    this.brand,
    this.model,
    this.year,
    this.color,
  });

  final String plateNumber;
  final String vehicleType;
  final String? brand;
  final String? model;
  final int? year;
  final String? color;

  Map<String, dynamic> toJson() {
    final payload = <String, dynamic>{
      'plate_number': plateNumber,
      'vehicle_type': vehicleType,
    };
    if (brand != null) payload['brand'] = brand;
    if (model != null) payload['model'] = model;
    if (year != null) payload['year'] = year;
    if (color != null) payload['color'] = color;
    return payload;
  }

  @override
  List<Object?> get props => [plateNumber, vehicleType, brand, model, year, color];
}

class VehicleStatusChangeInput extends Equatable {
  const VehicleStatusChangeInput({required this.status});

  final String status;

  Map<String, dynamic> toJson() => {'status': status};

  @override
  List<Object?> get props => [status];
}

class IncidentUpsertInput extends Equatable {
  const IncidentUpsertInput({
    required this.vehicleId,
    required this.title,
    required this.latitude,
    required this.longitude,
    this.serviceCatalogId,
    this.description,
    this.addressText,
    this.priority,
  });

  final String vehicleId;
  final String? serviceCatalogId;
  final String title;
  final String? description;
  final double latitude;
  final double longitude;
  final String? addressText;
  final String? priority;

  Map<String, dynamic> toJson() {
    final payload = <String, dynamic>{
      'vehicle_id': vehicleId,
      'title': title,
      'latitude': latitude,
      'longitude': longitude,
    };
    if (serviceCatalogId != null) payload['service_catalog_id'] = serviceCatalogId;
    if (description != null) payload['description'] = description;
    if (addressText != null) payload['address_text'] = addressText;
    if (priority != null) payload['priority'] = priority;
    return payload;
  }

  @override
  List<Object?> get props => [
        vehicleId,
        serviceCatalogId,
        title,
        description,
        latitude,
        longitude,
        addressText,
        priority,
      ];
}

class IncidentCancelInput extends Equatable {
  const IncidentCancelInput({this.cancellationReason});

  final String? cancellationReason;

  Map<String, dynamic> toJson() {
    final payload = <String, dynamic>{};
    if (cancellationReason != null && cancellationReason!.isNotEmpty) {
      payload['cancellation_reason'] = cancellationReason;
    }
    return payload;
  }

  @override
  List<Object?> get props => [cancellationReason];
}

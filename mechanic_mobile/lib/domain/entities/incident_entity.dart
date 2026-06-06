import 'package:equatable/equatable.dart';

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

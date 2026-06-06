import '../../domain/entities/incident_entity.dart';
import 'app_model_utils.dart';

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

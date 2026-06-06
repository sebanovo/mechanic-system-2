import 'package:equatable/equatable.dart';

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

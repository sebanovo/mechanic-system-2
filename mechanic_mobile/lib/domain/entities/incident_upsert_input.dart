import 'package:equatable/equatable.dart';

class IncidentUpsertInput extends Equatable {
  const IncidentUpsertInput({
    required this.vehicleId,
    required this.latitude,
    required this.longitude,
    this.description,
    this.priority,
  });

  final String vehicleId;
  final String? description;
  final double latitude;
  final double longitude;
  final String? priority;

  Map<String, dynamic> toJson() {
    final payload = <String, dynamic>{
      'vehicle_id': vehicleId,
      'latitude': latitude,
      'longitude': longitude,
    };
    if (description != null) payload['description'] = description;
    if (priority != null) payload['priority'] = priority;
    return payload;
  }

  @override
  List<Object?> get props => [
      vehicleId,
        description,
        latitude,
        longitude,
        priority,
      ];
}

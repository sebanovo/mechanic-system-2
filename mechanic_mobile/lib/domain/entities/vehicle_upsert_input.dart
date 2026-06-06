import 'package:equatable/equatable.dart';

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

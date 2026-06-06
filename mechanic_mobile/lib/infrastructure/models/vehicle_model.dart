import '../../domain/entities/vehicle_entity.dart';
import 'app_model_utils.dart';

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

import '../../domain/entities/vehicle_detail_entity.dart';
import 'app_model_utils.dart';
import 'vehicle_model.dart';

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

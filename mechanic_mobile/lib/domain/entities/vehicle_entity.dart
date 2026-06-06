import 'package:equatable/equatable.dart';

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

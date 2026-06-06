import 'package:equatable/equatable.dart';

import 'vehicle_entity.dart';

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

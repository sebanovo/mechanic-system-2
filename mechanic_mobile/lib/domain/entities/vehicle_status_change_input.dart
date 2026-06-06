import 'package:equatable/equatable.dart';

class VehicleStatusChangeInput extends Equatable {
  const VehicleStatusChangeInput({required this.status});

  final String status;

  Map<String, dynamic> toJson() => {'status': status};

  @override
  List<Object?> get props => [status];
}

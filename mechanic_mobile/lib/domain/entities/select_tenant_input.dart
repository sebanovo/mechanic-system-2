import 'package:equatable/equatable.dart';

class SelectTenantInput extends Equatable {
  const SelectTenantInput({required this.tenantId});

  final String tenantId;

  Map<String, dynamic> toJson() => {'tenant_id': tenantId};

  @override
  List<Object?> get props => [tenantId];
}

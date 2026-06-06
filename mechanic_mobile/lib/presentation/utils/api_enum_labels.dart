import '../../constants/api_enums.dart';

String tenantKindLabelFromApi(String? value) {
  final normalized = (value ?? '').toUpperCase();
  return switch (normalized) {
    'WORKSHOP' => TenantKind.workshop.label,
    'WORKSHOP_NETWORK' => TenantKind.workshopNetwork.label,
    'INDEPENDENT_TECHNICIAN' => TenantKind.independentTechnician.label,
    _ => value ?? '-',
  };
}

String vehicleTypeLabelFromApi(String? value) {
  final normalized = (value ?? '').toUpperCase();
  return switch (normalized) {
    'CAR' => VehicleType.car.label,
    'MOTORCYCLE' => VehicleType.motorcycle.label,
    'TRUCK' => VehicleType.truck.label,
    'VAN' => VehicleType.van.label,
    'SUV' => VehicleType.suv.label,
    'OTHER' => VehicleType.other.label,
    _ => value ?? '-',
  };
}

String vehicleStatusLabelFromApi(String? value) {
  final normalized = (value ?? '').toUpperCase();
  return switch (normalized) {
    'ACTIVE' => VehicleStatus.active.label,
    'INACTIVE' => VehicleStatus.inactive.label,
    _ => value ?? '-',
  };
}

String incidentPriorityLabelFromApi(String? value) {
  final normalized = (value ?? '').toUpperCase();
  return switch (normalized) {
    'LOW' => IncidentPriority.low.label,
    'MEDIUM' => IncidentPriority.medium.label,
    'HIGH' => IncidentPriority.high.label,
    'CRITICAL' => IncidentPriority.critical.label,
    _ => value ?? '-',
  };
}

String incidentStatusLabelFromApi(String? value) {
  final normalized = (value ?? '').toUpperCase();
  switch (normalized) {
    case 'REPORTED':
      return IncidentStatus.reported.label;
    case 'ANALYZING':
      return IncidentStatus.analyzing.label;
    case 'SEARCHING_PROVIDER':
      return IncidentStatus.searchingProvider.label;
    case 'WAITING_PROVIDER_RESPONSE':
      return IncidentStatus.waitingProviderResponse.label;
    case 'PROVIDER_ACCEPTED':
      return IncidentStatus.providerAccepted.label;
    case 'ASSIGNING_TECHNICIAN':
      return IncidentStatus.assigningTechnician.label;
    case 'TECHNICIAN_ASSIGNED':
      return IncidentStatus.technicianAssigned.label;
    case 'EN_ROUTE':
      return IncidentStatus.enRoute.label;
    case 'ARRIVED':
      return IncidentStatus.arrived.label;
    case 'IN_SERVICE':
      return IncidentStatus.inService.label;
    case 'COMPLETED':
      return IncidentStatus.completed.label;
    case 'CANCELLED':
      return IncidentStatus.cancelled.label;
    default:
      return value ?? '-';
  }
}

import '../../constants/api_enums.dart';

String tenantKindLabelFromApi(String? value) {
  switch ((value ?? '').toUpperCase()) {
    case 'WORKSHOP':
      return TenantKind.workshop.label;
    case 'WORKSHOP_NETWORK':
      return TenantKind.workshopNetwork.label;
    case 'INDEPENDENT_TECHNICIAN':
      return TenantKind.independentTechnician.label;
    default:
      return value ?? '-';
  }
}

String vehicleTypeLabelFromApi(String? value) {
  switch ((value ?? '').toUpperCase()) {
    case 'CAR':
      return VehicleType.car.label;
    case 'MOTORCYCLE':
      return VehicleType.motorcycle.label;
    case 'TRUCK':
      return VehicleType.truck.label;
    case 'VAN':
      return VehicleType.van.label;
    case 'SUV':
      return VehicleType.suv.label;
    case 'OTHER':
      return VehicleType.other.label;
    default:
      return value ?? '-';
  }
}

String incidentPriorityLabelFromApi(String? value) {
  switch ((value ?? '').toUpperCase()) {
    case 'LOW':
      return IncidentPriority.low.label;
    case 'MEDIUM':
      return IncidentPriority.medium.label;
    case 'HIGH':
      return IncidentPriority.high.label;
    case 'CRITICAL':
      return IncidentPriority.critical.label;
    default:
      return value ?? '-';
  }
}

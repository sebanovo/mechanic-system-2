enum TenantKind {
  workshop,
  workshopNetwork,
  independentTechnician,
}

enum TenantUserType {
  tenantOwner,
  technician,
  client,
}

enum VehicleType {
  car,
  motorcycle,
  truck,
  van,
  suv,
  other,
}

enum VehicleStatus {
  active,
  inactive,
}

enum IncidentPriority {
  low,
  medium,
  high,
  critical,
}

enum IncidentStatus {
  reported,
  analyzing,
  searchingProvider,
  waitingProviderResponse,
  providerAccepted,
  assigningTechnician,
  technicianAssigned,
  enRoute,
  arrived,
  inService,
  completed,
  cancelled,
}

extension TenantKindX on TenantKind {
  String get apiValue => switch (this) {
        TenantKind.workshop => 'WORKSHOP',
        TenantKind.workshopNetwork => 'WORKSHOP_NETWORK',
        TenantKind.independentTechnician => 'INDEPENDENT_TECHNICIAN',
      };

  String get label => switch (this) {
        TenantKind.workshop => 'Taller',
        TenantKind.workshopNetwork => 'Red de talleres',
        TenantKind.independentTechnician => 'Mecánico independiente',
  };
}

extension TenantUserTypeX on TenantUserType {
  String get apiValue => switch (this) {
        TenantUserType.tenantOwner => 'TENANT_OWNER',
        TenantUserType.technician => 'TECHNICIAN',
        TenantUserType.client => 'CLIENT',
      };

  String get label => switch (this) {
        TenantUserType.tenantOwner => 'Propietario',
        TenantUserType.technician => 'Técnico',
        TenantUserType.client => 'Cliente',
      };
}

extension VehicleTypeX on VehicleType {
  String get apiValue => switch (this) {
        VehicleType.car => 'CAR',
        VehicleType.motorcycle => 'MOTORCYCLE',
        VehicleType.truck => 'TRUCK',
        VehicleType.van => 'VAN',
        VehicleType.suv => 'SUV',
        VehicleType.other => 'OTHER',
      };

  String get label => switch (this) {
        VehicleType.car => 'Auto',
        VehicleType.motorcycle => 'Moto',
        VehicleType.truck => 'Camión',
        VehicleType.van => 'Furgoneta',
        VehicleType.suv => 'SUV',
        VehicleType.other => 'Otro',
      };
}

extension VehicleStatusX on VehicleStatus {
  String get apiValue => switch (this) {
        VehicleStatus.active => 'ACTIVE',
        VehicleStatus.inactive => 'INACTIVE',
      };

  String get label => switch (this) {
        VehicleStatus.active => 'Activo',
        VehicleStatus.inactive => 'Inactivo',
      };
}

extension IncidentPriorityX on IncidentPriority {
  String get apiValue => switch (this) {
        IncidentPriority.low => 'LOW',
        IncidentPriority.medium => 'MEDIUM',
        IncidentPriority.high => 'HIGH',
        IncidentPriority.critical => 'CRITICAL',
      };

  String get label => switch (this) {
        IncidentPriority.low => 'Baja',
        IncidentPriority.medium => 'Media',
        IncidentPriority.high => 'Alta',
        IncidentPriority.critical => 'Crítica',
      };
}

extension IncidentStatusX on IncidentStatus {
  String get apiValue => switch (this) {
        IncidentStatus.reported => 'REPORTED',
        IncidentStatus.analyzing => 'ANALYZING',
        IncidentStatus.searchingProvider => 'SEARCHING_PROVIDER',
        IncidentStatus.waitingProviderResponse => 'WAITING_PROVIDER_RESPONSE',
        IncidentStatus.providerAccepted => 'PROVIDER_ACCEPTED',
        IncidentStatus.assigningTechnician => 'ASSIGNING_TECHNICIAN',
        IncidentStatus.technicianAssigned => 'TECHNICIAN_ASSIGNED',
        IncidentStatus.enRoute => 'EN_ROUTE',
        IncidentStatus.arrived => 'ARRIVED',
        IncidentStatus.inService => 'IN_SERVICE',
        IncidentStatus.completed => 'COMPLETED',
        IncidentStatus.cancelled => 'CANCELLED',
      };

  String get label => switch (this) {
        IncidentStatus.reported => 'Reportado',
        IncidentStatus.analyzing => 'Analizando',
        IncidentStatus.searchingProvider => 'Buscando proveedor',
        IncidentStatus.waitingProviderResponse => 'Esperando respuesta',
        IncidentStatus.providerAccepted => 'Proveedor aceptado',
        IncidentStatus.assigningTechnician => 'Asignando técnico',
        IncidentStatus.technicianAssigned => 'Técnico asignado',
        IncidentStatus.enRoute => 'En ruta',
        IncidentStatus.arrived => 'Llegó al sitio',
        IncidentStatus.inService => 'En servicio',
        IncidentStatus.completed => 'Completado',
        IncidentStatus.cancelled => 'Cancelado',
      };
}

List<TenantKind> tenantKindOptions = TenantKind.values;
List<TenantUserType> tenantUserTypeOptions = TenantUserType.values;
List<VehicleType> vehicleTypeOptions = VehicleType.values;
List<VehicleStatus> vehicleStatusOptions = VehicleStatus.values;
List<IncidentPriority> incidentPriorityOptions = IncidentPriority.values;
List<IncidentStatus> incidentStatusOptions = IncidentStatus.values;

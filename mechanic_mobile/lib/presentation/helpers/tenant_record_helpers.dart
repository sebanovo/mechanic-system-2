import 'package:flutter/material.dart';

import '../widgets/app_widgets.dart';

String tenantRecordPrimaryLabel(Map<String, dynamic> record) {
  final source = _labelSource(record);
  final firstName = source['first_name']?.toString().trim() ?? '';
  final lastName = source['last_name']?.toString().trim() ?? '';
  final fullName = '$firstName $lastName'.trim();
  if (fullName.isNotEmpty) {
    return fullName;
  }
  final candidates = [
    source['service_name'],
    source['service_code'],
    source['commercial_name'],
    source['full_name'],
    source['email'],
    source['title'],
    source['name'],
    source['event_type'],
    source['analysis_version'],
    source['assignment_status'],
    source['status'],
    source['is_active'],
    source['tenant_kind'],
    source['provider_type'],
    source['id'],
  ];
  for (final candidate in candidates) {
    final text = candidate?.toString().trim() ?? '';
    if (text.isNotEmpty) return text;
  }
  return 'Registro';
}

String tenantRecordSecondaryLabel(Map<String, dynamic> record) {
  final source = _labelSource(record);
  final candidates = [
    _catalogSecondary(source),
    source['email'],
    source['category'],
    source['service_catalog_id'],
    source['custom_min_price'],
    source['custom_max_price'],
    source['technician_id'],
    source['provider_service_id'],
    source['skill_level'],
    source['device_name'],
    source['description'],
    source['tenant_kind'],
    source['provider_type'],
    source['resource_type'],
    source['resource_id'],
    source['incident_code'],
    source['tenant_id'],
    source['user_id'],
  ];
  for (final candidate in candidates) {
    final text = candidate?.toString().trim() ?? '';
    if (text.isNotEmpty) return text;
  }
  return 'Sin descripción';
}

String tenantRecordStatusLabel(Map<String, dynamic> record) {
  final source = _labelSource(record);
  final candidates = <MapEntry<String, dynamic>>[
    MapEntry('is_active', source['is_active']),
    MapEntry('status', source['status']),
    MapEntry('session_status', source['session_status']),
    MapEntry('availability_status', source['availability_status']),
    MapEntry('is_available', source['is_available']),
    MapEntry('is_enabled', source['is_enabled']),
    MapEntry('assignment_status', source['assignment_status']),
    MapEntry('candidate_status', source['candidate_status']),
    MapEntry('offer_status', source['offer_status']),
    MapEntry('operational_status', source['operational_status']),
  ];
  for (final candidate in candidates) {
    final value = candidate.value;
    if (value is bool) {
      if (candidate.key == 'is_available') {
        return value ? 'Disponible' : 'No disponible';
      }
      if (candidate.key == 'is_enabled') {
        return value ? 'Habilitado' : 'Deshabilitado';
      }
      return value ? 'Activo' : 'Inactivo';
    }
    final text = value?.toString().trim() ?? '';
    if (text.isNotEmpty) return text;
  }
  return '-';
}

String tenantCatalogSummary(Map<String, dynamic> record) {
  final source = _labelSource(record);
  final serviceName = source['service_name']?.toString().trim() ?? '';
  final serviceCode = source['service_code']?.toString().trim() ?? '';
  final category = source['category']?.toString().trim() ?? '';
  final label = [
    serviceName,
    serviceCode,
    category,
  ].where((part) => part.isNotEmpty).join(' • ');
  return label.isEmpty ? tenantRecordPrimaryLabel(record) : label;
}

String tenantServiceDetailsLabel(Map<String, dynamic> record) {
  final source = _labelSource(record);
  final parts = <String>[];
  final description = source['description']?.toString().trim() ?? '';
  if (description.isNotEmpty) parts.add(description);
  final pricing = <String>[
    _formatMoney(source['min_price']),
    _formatMoney(source['max_price']),
  ].where((part) => part.isNotEmpty).toList();
  if (pricing.isNotEmpty) {
    parts.add('Precio ${pricing.join(' - ')}');
  }
  final duration = <String>[
    _formatMinutes(source['min_duration_minutes']),
    _formatMinutes(source['max_duration_minutes']),
  ].where((part) => part.isNotEmpty).toList();
  if (duration.isNotEmpty) {
    parts.add('Duración ${duration.join(' - ')}');
  }
  return parts.isEmpty ? tenantRecordSecondaryLabel(record) : parts.join(' • ');
}

String tenantProviderServiceSummary(Map<String, dynamic> record) {
  final source = _labelSource(record);
  final nestedCatalog = _mapValue(source['service_catalog']);
  final serviceName =
      nestedCatalog['service_name']?.toString().trim() ??
      source['service_name']?.toString().trim() ??
      '';
  final serviceCode =
      nestedCatalog['service_code']?.toString().trim() ??
      source['service_code']?.toString().trim() ??
      '';
  final parts = <String>[
    if (serviceName.isNotEmpty) serviceName,
    if (serviceCode.isNotEmpty) serviceCode,
    if ((source['is_available'] is bool))
      (source['is_available'] == true ? 'Disponible' : 'No disponible'),
  ];
  return parts.isEmpty ? tenantRecordPrimaryLabel(record) : parts.join(' • ');
}

String tenantProviderServiceDetailsLabel(Map<String, dynamic> record) {
  final providerService = _mapValue(record['provider_service']);
  final nestedCatalog = _mapValue(record['service_catalog']);
  final serviceCatalogId =
      providerService['service_catalog_id']?.toString().trim() ??
      record['service_catalog_id']?.toString().trim() ??
      '';
  final customMinPrice =
      providerService['custom_min_price']?.toString().trim() ?? '';
  final customMaxPrice =
      providerService['custom_max_price']?.toString().trim() ?? '';
  final parts = <String>[
    if ((serviceCatalogId).isNotEmpty) 'Catálogo $serviceCatalogId',
    if (customMinPrice.isNotEmpty) 'Min Bs $customMinPrice',
    if (customMaxPrice.isNotEmpty) 'Max Bs $customMaxPrice',
    if ((nestedCatalog['category']?.toString().trim() ?? '').isNotEmpty)
      nestedCatalog['category'].toString(),
  ];
  return parts.isEmpty ? tenantRecordSecondaryLabel(record) : parts.join(' • ');
}

String tenantTechnicianServiceSummary(Map<String, dynamic> record) {
  final technicianService = _mapValue(record['technician_service']);
  final technician = _mapValue(record['technician']);
  final providerService = _mapValue(record['provider_service']);
  final nestedCatalog = _mapValue(providerService['service_catalog']);
  final technicianUser = _mapValue(technician['user']);
  final technicianName = [
    technicianUser['first_name']?.toString().trim() ?? '',
    technicianUser['last_name']?.toString().trim() ?? '',
  ].where((part) => part.isNotEmpty).join(' ').trim();
  final serviceName =
      nestedCatalog['service_name']?.toString().trim() ??
      providerService['service_name']?.toString().trim() ??
      technicianService['service_name']?.toString().trim() ??
      providerService['service_catalog_id']?.toString().trim() ??
      '';
  final skill =
      technicianService['skill_level']?.toString().trim() ??
      record['skill_level']?.toString().trim() ??
      '';
  final parts = <String>[
    if (serviceName.isNotEmpty) serviceName,
    if (technicianName.isNotEmpty) technicianName,
    if (skill.isNotEmpty) skill,
  ];
  return parts.isEmpty ? tenantRecordPrimaryLabel(record) : parts.join(' • ');
}

String tenantTechnicianServiceDetailsLabel(Map<String, dynamic> record) {
  final technicianService = _mapValue(record['technician_service']);
  final providerService = _mapValue(record['provider_service']);
  final nestedCatalog = _mapValue(providerService['service_catalog']);
  final parts = <String>[
    if ((technicianService['skill_level']?.toString().trim() ?? '').isNotEmpty)
      'Skill ${technicianService['skill_level']}',
    if ((technicianService['is_enabled'] is bool))
      (technicianService['is_enabled'] == true
          ? 'Habilitado'
          : 'Deshabilitado'),
    if ((nestedCatalog['category']?.toString().trim() ?? '').isNotEmpty)
      nestedCatalog['category'].toString(),
  ];
  return parts.join(' • ');
}

String tenantRecordId(Map<String, dynamic> record) {
  final source = _labelSource(record);
  final candidates = [
    source['id'],
    source['technician_id'],
    source['provider_service_id'],
    source['membership_id'],
    source['session_id'],
    source['incident_id'],
    source['assignment_id'],
    source['candidate_id'],
    source['offer_id'],
  ];
  for (final candidate in candidates) {
    final text = candidate?.toString().trim() ?? '';
    if (text.isNotEmpty) return text;
  }
  return '';
}

void showTenantRecordDetails(
  BuildContext context, {
  required String title,
  required Map<String, dynamic> record,
}) {
  showModalBottomSheet<void>(
    context: context,
    isScrollControlled: true,
    backgroundColor: Colors.transparent,
    builder: (context) {
      final entries = record.entries.toList();
      return DraggableScrollableSheet(
        initialChildSize: 0.72,
        minChildSize: 0.45,
        maxChildSize: 0.95,
        builder: (context, controller) {
          return Container(
            decoration: const BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
            ),
            child: ListView(
              controller: controller,
              padding: const EdgeInsets.fromLTRB(16, 10, 16, 24),
              children: [
                Center(
                  child: Container(
                    width: 42,
                    height: 5,
                    decoration: BoxDecoration(
                      color: const Color(0xFFD6E2F7),
                      borderRadius: BorderRadius.circular(100),
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                Text(
                  title,
                  style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                    fontWeight: FontWeight.w900,
                  ),
                ),
                const SizedBox(height: 12),
                ...entries.map(
                  (entry) => Padding(
                    padding: const EdgeInsets.only(bottom: 10),
                    child: SurfaceCard(
                      padding: const EdgeInsets.all(14),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            entry.key.toString(),
                            style: Theme.of(context).textTheme.labelLarge
                                ?.copyWith(fontWeight: FontWeight.w800),
                          ),
                          const SizedBox(height: 6),
                          Text(entry.value?.toString() ?? '-'),
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            ),
          );
        },
      );
    },
  );
}

Map<String, dynamic> _labelSource(Map<String, dynamic> record) {
  for (final key in const [
    'tenant',
    'user',
    'service_catalog',
    'technician_service',
    'provider_service',
    'technician',
    'offer',
    'assignment',
    'candidate',
    'incident',
    'session',
    'profile',
    'settings',
    'tracking_event',
  ]) {
    final value = record[key];
    if (value is Map) {
      return Map<String, dynamic>.from(value);
    }
  }
  return record;
}

Map<String, dynamic> _mapValue(dynamic value) {
  return value is Map
      ? Map<String, dynamic>.from(value)
      : const <String, dynamic>{};
}

String _catalogSecondary(Map<String, dynamic> source) {
  final parts = <String>[
    if ((source['service_code']?.toString().trim() ?? '').isNotEmpty)
      source['service_code'].toString(),
    if ((source['category']?.toString().trim() ?? '').isNotEmpty)
      source['category'].toString(),
    if ((source['min_price']?.toString().trim() ?? '').isNotEmpty ||
        (source['max_price']?.toString().trim() ?? '').isNotEmpty)
      [
        _formatMoney(source['min_price']),
        _formatMoney(source['max_price']),
      ].where((part) => part.isNotEmpty).join(' - '),
    if ((source['min_duration_minutes']?.toString().trim() ?? '').isNotEmpty ||
        (source['max_duration_minutes']?.toString().trim() ?? '').isNotEmpty)
      [
        _formatMinutes(source['min_duration_minutes']),
        _formatMinutes(source['max_duration_minutes']),
      ].where((part) => part.isNotEmpty).join(' - '),
  ];
  return parts.where((part) => part.trim().isNotEmpty).join(' • ');
}

String _formatMoney(dynamic value) {
  final text = value?.toString().trim() ?? '';
  return text.isEmpty || text == 'null' ? '' : 'Bs $text';
}

String _formatMinutes(dynamic value) {
  final text = value?.toString().trim() ?? '';
  return text.isEmpty || text == 'null' ? '' : '$text min';
}

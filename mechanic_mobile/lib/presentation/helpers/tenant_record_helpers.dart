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
    source['commercial_name'],
    source['full_name'],
    source['email'],
    source['service_name'],
    source['service_code'],
    source['title'],
    source['name'],
    source['event_type'],
    source['analysis_version'],
    source['assignment_status'],
    source['status'],
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
    source['email'],
    source['category'],
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
  final candidates = [
    source['status'],
    source['session_status'],
    source['availability_status'],
    source['assignment_status'],
    source['candidate_status'],
    source['offer_status'],
  ];
  for (final candidate in candidates) {
    final text = candidate?.toString().trim() ?? '';
    if (text.isNotEmpty) return text;
  }
  return '-';
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
                            style: Theme.of(context).textTheme.labelLarge?.copyWith(
                                  fontWeight: FontWeight.w800,
                                ),
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
    'provider_service',
    'service_catalog',
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

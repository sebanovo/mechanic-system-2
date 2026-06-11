import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../helpers/tenant_record_helpers.dart';
import '../viewmodels/tenant_viewmodel.dart';
import '../widgets/app_widgets.dart';
import 'tenant_owner_sheets.dart';

class TenantOwnerRecordsSection extends StatelessWidget {
  const TenantOwnerRecordsSection({
    super.key,
    required this.title,
    required this.subtitle,
    required this.items,
  });

  final String title;
  final String subtitle;
  final List<Map<String, dynamic>> items;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SectionHeader(title: title, subtitle: subtitle),
        const SizedBox(height: 10),
        if (items.isEmpty)
          const Padding(
            padding: EdgeInsets.only(bottom: 12),
            child: EmptyStatePanel(
              title: 'Sin resultados',
              subtitle: 'No hay elementos para mostrar en esta sección.',
              icon: Icons.inbox_rounded,
            ),
          )
        else
          ...items
              .take(3)
              .map(
                (item) => Padding(
                  padding: const EdgeInsets.only(bottom: 10),
                  child: SurfaceCard(
                    child: ListTile(
                      contentPadding: EdgeInsets.zero,
                      title: Text(_recordTitle(title, item)),
                      subtitle: Text(_recordSubtitle(title, item)),
                      trailing: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          StatusBadge(label: _recordStatus(title, item)),
                          const SizedBox(width: 8),
                          _recordActions(context, title, item),
                        ],
                      ),
                      onTap: () => _openRecord(context, title, item),
                    ),
                  ),
                ),
              ),
      ],
    );
  }
}

Future<void> _openRecord(
  BuildContext context,
  String title,
  Map<String, dynamic> item,
) async {
  final vm = context.read<TenantViewModel>();
  if (title == 'Técnicos') {
    if (!context.mounted) return;
    showTechnicianManagementSheet(context, vm, item);
    return;
  }

  if (title == 'Miembros') {
    final detail = await vm.reloadMember(_recordId(title, item));
    if (!context.mounted) return;
    showMemberManagementSheet(context, vm, detail ?? item);
    return;
  }

  if (title == 'Servicios del proveedor') {
    final detail = await vm.reloadProviderService(_recordId(title, item));
    if (!context.mounted) return;
    showTenantRecordDetails(context, title: title, record: detail ?? item);
    return;
  }

  if (title == 'Servicios técnicos') {
    final detail = await vm.reloadTechnicianService(_recordId(title, item));
    if (!context.mounted) return;
    showTenantRecordDetails(context, title: title, record: detail ?? item);
    return;
  }

  if (title == 'Candidatos') {
    final detail = await vm.reloadCandidateProvider(_recordId(title, item));
    if (!context.mounted) return;
    showTenantRecordDetails(context, title: title, record: detail ?? item);
    return;
  }

  if (title == 'Ofertas') {
    final detail = await vm.reloadOffer(_recordId(title, item));
    if (!context.mounted) return;
    showTenantRecordDetails(context, title: title, record: detail ?? item);
    return;
  }

  if (title == 'Asignaciones') {
    final detail = await vm.reloadAssignment(_recordId(title, item));
    if (!context.mounted) return;
    final recordId = _recordId(title, item);
    final session = recordId.isEmpty
        ? null
        : await vm.reloadAssignmentTrackingSession(recordId);
    if (!context.mounted) return;
    final merged = <String, dynamic>{
      ...item,
      ...?detail,
      'tracking_session': ?session,
    };
    showTenantRecordDetails(context, title: title, record: merged);
    return;
  }

  if (title == 'Catálogo de servicios') {
    final detail = await vm.reloadServiceCatalogItem(_recordId(title, item));
    if (!context.mounted) return;
    showTenantRecordDetails(context, title: title, record: detail ?? item);
    return;
  }

  showTenantRecordDetails(context, title: title, record: item);
}

Widget _recordActions(
  BuildContext context,
  String title,
  Map<String, dynamic> item,
) {
  final recordId = _recordId(title, item);
  if (recordId.isEmpty) return const SizedBox.shrink();

  if (title == 'Técnicos') {
    return PopupMenuButton<String>(
      tooltip: 'Cambiar estado',
      onSelected: (value) async {
        final vm = context.read<TenantViewModel>();
        await vm.updateTechnicianStatus(recordId, value);
      },
      itemBuilder: (context) => const [
        PopupMenuItem(value: 'ACTIVE', child: Text('Activo')),
        PopupMenuItem(value: 'INACTIVE', child: Text('Inactivo')),
        PopupMenuItem(value: 'SUSPENDED', child: Text('Suspendido')),
      ],
      child: const Icon(Icons.more_vert_rounded),
    );
  }

  if (title == 'Miembros') {
    return PopupMenuButton<String>(
      tooltip: 'Cambiar estado',
      onSelected: (value) async {
        final vm = context.read<TenantViewModel>();
        await vm.changeCurrentMemberStatus(recordId, {'status': value});
      },
      itemBuilder: (context) => const [
        PopupMenuItem(value: 'ACTIVE', child: Text('Activo')),
        PopupMenuItem(value: 'INACTIVE', child: Text('Inactivo')),
        PopupMenuItem(value: 'BLOCKED', child: Text('Bloqueado')),
      ],
      child: const Icon(Icons.more_vert_rounded),
    );
  }

  if (title == 'Servicios del proveedor') {
    return PopupMenuButton<String>(
      tooltip: 'Cambiar disponibilidad',
      onSelected: (value) async {
        final vm = context.read<TenantViewModel>();
        await vm.updateProviderServiceStatus(recordId, value == 'true');
      },
      itemBuilder: (context) => const [
        PopupMenuItem(value: 'true', child: Text('Disponible')),
        PopupMenuItem(value: 'false', child: Text('No disponible')),
      ],
      child: const Icon(Icons.more_vert_rounded),
    );
  }

  if (title == 'Servicios técnicos') {
    return PopupMenuButton<String>(
      tooltip: 'Cambiar estado',
      onSelected: (value) async {
        final vm = context.read<TenantViewModel>();
        await vm.changeTechnicianServiceStatus(recordId, value == 'true');
      },
      itemBuilder: (context) => const [
        PopupMenuItem(value: 'true', child: Text('Habilitado')),
        PopupMenuItem(value: 'false', child: Text('Deshabilitado')),
      ],
      child: const Icon(Icons.more_vert_rounded),
    );
  }

  if (title == 'Candidatos') {
    return PopupMenuButton<String>(
      tooltip: 'Cambiar estado',
      onSelected: (value) async {
        final vm = context.read<TenantViewModel>();
        await vm.updateCandidateProviderStatus(recordId, {
          'candidate_status': value,
        });
      },
      itemBuilder: (context) => const [
        PopupMenuItem(value: 'SUGGESTED', child: Text('Sugerido')),
        PopupMenuItem(value: 'SELECTED', child: Text('Seleccionado')),
        PopupMenuItem(value: 'DISCARDED', child: Text('Descartado')),
        PopupMenuItem(value: 'EXPIRED', child: Text('Expirado')),
      ],
      child: const Icon(Icons.more_vert_rounded),
    );
  }

  if (title == 'Ofertas') {
    return PopupMenuButton<String>(
      tooltip: 'Gestionar oferta',
      onSelected: (value) async {
        final vm = context.read<TenantViewModel>();
        if (value == 'accept') {
          await vm.acceptOffer(recordId);
        } else if (value == 'reject') {
          await vm.rejectOffer(recordId);
        }
      },
      itemBuilder: (context) => const [
        PopupMenuItem(value: 'accept', child: Text('Aceptar')),
        PopupMenuItem(value: 'reject', child: Text('Rechazar')),
      ],
      child: const Icon(Icons.more_vert_rounded),
    );
  }

  if (title == 'Asignaciones') {
    return PopupMenuButton<String>(
      tooltip: 'Cambiar estado',
      onSelected: (value) async {
        final vm = context.read<TenantViewModel>();
        await vm.changeAssignmentStatus(recordId, {'assignment_status': value});
      },
      itemBuilder: (context) => const [
        PopupMenuItem(value: 'PENDING', child: Text('Pendiente')),
        PopupMenuItem(value: 'ASSIGNED', child: Text('Asignada')),
        PopupMenuItem(value: 'EN_ROUTE', child: Text('En ruta')),
        PopupMenuItem(value: 'ARRIVED', child: Text('Llegó')),
        PopupMenuItem(value: 'IN_SERVICE', child: Text('En servicio')),
        PopupMenuItem(value: 'COMPLETED', child: Text('Completada')),
        PopupMenuItem(value: 'CANCELLED', child: Text('Cancelada')),
      ],
      child: const Icon(Icons.more_vert_rounded),
    );
  }

  if (title == 'Sesiones') {
    return PopupMenuButton<String>(
      tooltip: 'Cerrar sesión',
      onSelected: (value) async {
        final vm = context.read<TenantViewModel>();
        await vm.revokeTenantSession(recordId);
      },
      itemBuilder: (context) => const [
        PopupMenuItem(value: 'revoke', child: Text('Revocar sesión')),
      ],
      child: const Icon(Icons.more_vert_rounded),
    );
  }

  return const SizedBox.shrink();
}

String _recordTitle(String sectionTitle, Map<String, dynamic> item) {
  switch (sectionTitle) {
    case 'Catálogo de servicios':
      return tenantCatalogSummary(item);
    case 'Servicios del proveedor':
      return tenantProviderServiceSummary(item);
    case 'Servicios técnicos':
      return tenantTechnicianServiceSummary(item);
    default:
      return tenantRecordPrimaryLabel(item);
  }
}

String _recordSubtitle(String sectionTitle, Map<String, dynamic> item) {
  switch (sectionTitle) {
    case 'Catálogo de servicios':
      return tenantServiceDetailsLabel(item);
    case 'Servicios del proveedor':
      return tenantProviderServiceDetailsLabel(item);
    case 'Servicios técnicos':
      return tenantTechnicianServiceDetailsLabel(item);
    default:
      return tenantRecordSecondaryLabel(item);
  }
}

String _recordStatus(String sectionTitle, Map<String, dynamic> item) {
  switch (sectionTitle) {
    case 'Servicios del proveedor':
      return _nestedBoolLabel(
        item,
        'provider_service',
        'is_available',
        trueLabel: 'Disponible',
        falseLabel: 'No disponible',
      );
    case 'Servicios técnicos':
      return _nestedBoolLabel(
        item,
        'technician_service',
        'is_enabled',
        trueLabel: 'Habilitado',
        falseLabel: 'Deshabilitado',
      );
    default:
      return tenantRecordStatusLabel(item);
  }
}

String _recordId(String sectionTitle, Map<String, dynamic> item) {
  switch (sectionTitle) {
    case 'Servicios del proveedor':
      return _sectionId(item, 'provider_service');
    case 'Servicios técnicos':
      return _sectionId(item, 'technician_service');
    case 'Catálogo de servicios':
      return _sectionId(item, 'service_catalog');
    case 'Técnicos':
      return _sectionId(item, 'technician');
    case 'Miembros':
      return _sectionId(item, 'membership');
    case 'Candidatos':
      return _sectionId(item, 'candidate');
    case 'Ofertas':
      return _sectionId(item, 'offer');
    case 'Asignaciones':
      return _sectionId(item, 'assignment');
    default:
      return tenantRecordId(item);
  }
}

String _sectionId(Map<String, dynamic> item, String key) {
  final nested = item[key];
  if (nested is Map) {
    final id = nested['id']?.toString().trim() ?? '';
    if (id.isNotEmpty) return id;
  }
  return tenantRecordId(item);
}

String _nestedBoolLabel(
  Map<String, dynamic> item,
  String sectionKey,
  String fieldKey, {
  required String trueLabel,
  required String falseLabel,
}) {
  final nested = item[sectionKey];
  if (nested is Map) {
    final value = nested[fieldKey];
    if (value is bool) {
      return value ? trueLabel : falseLabel;
    }
  }
  return tenantRecordStatusLabel(item);
}

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../helpers/tenant_record_helpers.dart';
import '../viewmodels/tenant_viewmodel.dart';
import '../widgets/app_widgets.dart';

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
          ...items.take(3).map(
            (item) => Padding(
              padding: const EdgeInsets.only(bottom: 10),
              child: SurfaceCard(
                child: ListTile(
                  contentPadding: EdgeInsets.zero,
                  title: Text(tenantRecordPrimaryLabel(item)),
                  subtitle: Text(tenantRecordSecondaryLabel(item)),
                  trailing: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      StatusBadge(label: tenantRecordStatusLabel(item)),
                      const SizedBox(width: 8),
                      _recordActions(context, title, item),
                    ],
                  ),
                  onTap: () => showTenantRecordDetails(
                    context,
                    title: title,
                    record: item,
                  ),
                ),
              ),
            ),
          ),
      ],
    );
  }
}

Widget _recordActions(
  BuildContext context,
  String title,
  Map<String, dynamic> item,
) {
  final recordId = tenantRecordId(item);
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
        await vm.updateCandidateProviderStatus(recordId, {'candidate_status': value});
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

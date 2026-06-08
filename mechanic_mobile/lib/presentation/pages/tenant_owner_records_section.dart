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
    this.onLoad,
  });

  final String title;
  final String subtitle;
  final List<Map<String, dynamic>> items;
  final VoidCallback? onLoad;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: SectionHeader(title: title, subtitle: subtitle),
            ),
            if (onLoad != null) ...[
              const SizedBox(width: 12),
              Padding(
                padding: const EdgeInsets.only(top: 6),
                child: FilledButton.tonalIcon(
                  onPressed: onLoad,
                  icon: const Icon(Icons.download_rounded, size: 18),
                  label: const Text('Cargar'),
                ),
              ),
            ],
          ],
        ),
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

  return const SizedBox.shrink();
}

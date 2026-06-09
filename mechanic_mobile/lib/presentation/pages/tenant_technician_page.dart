import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../../app/theme/app_theme.dart';
import '../../domain/entities/auth_context_entity.dart';
import '../helpers/tenant_record_helpers.dart';
import '../utils/api_enum_labels.dart';
import '../viewmodels/auth_viewmodel.dart';
import '../viewmodels/tenant_viewmodel.dart';
import '../widgets/app_widgets.dart';

class TenantTechnicianPage extends StatelessWidget {
  const TenantTechnicianPage({super.key});

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthViewModel>().contextData;
    final vm = context.watch<TenantViewModel>();
    vm.scheduleBootstrap();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Técnico'),
        actions: [
          IconButton(
            onPressed: vm.loading ? null : () => vm.refresh(),
            icon: const Icon(Icons.refresh_rounded),
          ),
          IconButton(
            onPressed: () => context.push('/tenant-sessions'),
            icon: const Icon(Icons.devices_other_rounded),
          ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: vm.refresh,
        child: ListView(
          padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
          children: [
            _hero(context, auth, vm),
            const SizedBox(height: 16),
            if (vm.error != null) ...[
              ErrorBanner(message: vm.error!),
              const SizedBox(height: 12),
            ],
            if (vm.loading) ...[
              const LinearProgressIndicator(),
              const SizedBox(height: 12),
            ],
            _section(
              context,
              title: 'Servicios del técnico',
              subtitle: '${vm.technicianServices.pagination.total} vínculos técnicos.',
              items: vm.technicianServices.items,
            ),
            _section(
              context,
              title: 'Incidentes',
              subtitle: '${vm.incidents.pagination.total} incidentes relacionados.',
              items: vm.incidents.items,
            ),
            _section(
              context,
              title: 'Asignaciones',
              subtitle: '${vm.assignments.pagination.total} asignaciones activas.',
              items: vm.assignments.items,
            ),
            _section(
              context,
              title: 'Sesiones',
              subtitle: '${vm.sessions.pagination.total} sesiones recientes.',
              items: vm.sessions.items,
            ),
            _section(
              context,
              title: 'Catálogo',
              subtitle: '${vm.serviceCatalog.pagination.total} servicios base.',
              items: vm.serviceCatalog.items,
            ),
          ],
        ),
      ),
    );
  }
}

Widget _hero(BuildContext context, AuthContextEntity? auth, TenantViewModel vm) {
  return SurfaceCard(
    padding: const EdgeInsets.all(0),
    child: Container(
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          colors: [
            SapphirePalette.sapphire800,
            SapphirePalette.sapphire500,
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.all(Radius.circular(28)),
      ),
      child: Padding(
        padding: const EdgeInsets.fromLTRB(18, 18, 18, 18),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              auth?.user.fullName ?? 'Técnico',
              style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                    color: Colors.white,
                    fontWeight: FontWeight.w900,
                  ),
            ),
            const SizedBox(height: 8),
            Text(
              auth?.currentTenant?.commercialName ?? 'Sin tenant activo',
              style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                    color: Colors.white.withOpacity(0.9),
                  ),
            ),
            const SizedBox(height: 12),
            Wrap(
              spacing: 10,
              runSpacing: 10,
              children: [
                _chip(context, tenantUserTypeLabelFromApi(auth?.userType), Icons.build_rounded),
                _chip(context, tenantRecordStatusLabel(auth?.currentTenant?.raw ?? const <String, dynamic>{}), Icons.bolt_rounded),
              ],
            ),
            const SizedBox(height: 14),
            Row(
              children: [
                Expanded(
                  child: _action(
                    context,
                    label: 'Recargar',
                    icon: Icons.refresh_rounded,
                    onTap: () => vm.refresh(),
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: _action(
                    context,
                    label: 'Sesiones',
                    icon: Icons.devices_other_rounded,
                    onTap: () => context.push('/tenant-sessions'),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    ),
  );
}

Widget _chip(BuildContext context, String label, IconData icon) {
  return Container(
    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
    decoration: BoxDecoration(
      color: Colors.white.withOpacity(0.14),
      borderRadius: BorderRadius.circular(999),
      border: Border.all(color: Colors.white.withOpacity(0.16)),
    ),
    child: Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(icon, color: Colors.white, size: 18),
        const SizedBox(width: 8),
        Text(
          label,
          style: Theme.of(context).textTheme.labelLarge?.copyWith(
                color: Colors.white,
                fontWeight: FontWeight.w800,
              ),
        ),
      ],
    ),
  );
}

Widget _action(
  BuildContext context, {
  required String label,
  required IconData icon,
  required VoidCallback onTap,
}) {
  return Material(
    color: Colors.white,
    borderRadius: BorderRadius.circular(18),
    child: InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(18),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, color: SapphirePalette.sapphire700, size: 20),
            const SizedBox(width: 8),
            Text(
              label,
              style: Theme.of(context).textTheme.labelLarge?.copyWith(
                    color: SapphirePalette.sapphire900,
                    fontWeight: FontWeight.w800,
                  ),
            ),
          ],
        ),
      ),
    ),
  );
}

Widget _section(
  BuildContext context, {
  required String title,
  required String subtitle,
  required List<Map<String, dynamic>> items,
}) {
  return Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      SectionHeader(title: title, subtitle: subtitle),
      const SizedBox(height: 10),
      if (items.isEmpty)
        const Padding(
          padding: EdgeInsets.only(bottom: 12),
          child: EmptyStatePanel(
            title: 'Sin datos',
            subtitle: 'La sección todavía no tiene elementos.',
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
                trailing: StatusBadge(label: tenantRecordStatusLabel(item)),
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

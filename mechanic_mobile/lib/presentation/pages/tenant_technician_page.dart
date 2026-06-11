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

typedef _Capability = ({
  String title,
  String subtitle,
  IconData icon,
  bool allowed,
});

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
            _capabilitySection(
              context,
              title: 'Accesos permitidos',
              subtitle:
                  'Solo funciones operativas. Sin acciones de administración del taller.',
              items: const [
                (
                  title: 'Ver asignaciones',
                  subtitle: 'Revisar y seguir tus asignaciones activas.',
                  icon: Icons.assignment_turned_in_rounded,
                  allowed: true,
                ),
                (
                  title: 'Ver incidentes',
                  subtitle: 'Consultar incidentes relacionados con tu trabajo.',
                  icon: Icons.report_problem_rounded,
                  allowed: true,
                ),
                (
                  title: 'Ver sesiones',
                  subtitle: 'Acceder a las sesiones del tenant actual.',
                  icon: Icons.devices_other_rounded,
                  allowed: true,
                ),
                (
                  title: 'Consultar catálogo',
                  subtitle: 'Leer servicios disponibles sin editar el catálogo.',
                  icon: Icons.inventory_2_rounded,
                  allowed: true,
                ),
              ],
            ),
            const SizedBox(height: 16),
            _capabilitySection(
              context,
              title: 'Restringido para tu rol',
              subtitle:
                  'Estas funciones pertenecen al dueño o a administración del taller.',
              items: const [
                (
                  title: 'Crear técnicos',
                  subtitle: 'Alta, edición y baja de otros técnicos.',
                  icon: Icons.person_add_alt_1_rounded,
                  allowed: false,
                ),
                (
                  title: 'Crear servicios proveedor',
                  subtitle: 'Definir servicios comerciales del taller.',
                  icon: Icons.add_business_rounded,
                  allowed: false,
                ),
                (
                  title: 'Gestionar red',
                  subtitle: 'Administrar miembros, sucursales y relaciones.',
                  icon: Icons.apartment_rounded,
                  allowed: false,
                ),
                (
                  title: 'Editar perfil del taller',
                  subtitle: 'Cambiar datos globales del workspace.',
                  icon: Icons.store_rounded,
                  allowed: false,
                ),
              ],
            ),
            const SizedBox(height: 16),
            _section(
              context,
              title: 'Servicios del técnico',
              subtitle:
                  '${vm.technicianServices.pagination.total} vínculos técnicos.',
              items: vm.technicianServices.items,
            ),
            _section(
              context,
              title: 'Incidentes',
              subtitle:
                  '${vm.incidents.pagination.total} incidentes relacionados.',
              items: vm.incidents.items,
            ),
            _section(
              context,
              title: 'Asignaciones',
              subtitle:
                  '${vm.assignments.pagination.total} asignaciones activas.',
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

Widget _hero(
  BuildContext context,
  AuthContextEntity? auth,
  TenantViewModel vm,
) {
  return SurfaceCard(
    padding: const EdgeInsets.all(0),
    child: Container(
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          colors: [SapphirePalette.sapphire800, SapphirePalette.sapphire500],
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
                color: Colors.white.withValues(alpha: 0.9),
              ),
            ),
            const SizedBox(height: 12),
            Wrap(
              spacing: 10,
              runSpacing: 10,
              children: [
                _chip(
                  context,
                  tenantUserTypeLabelFromApi(auth?.userType),
                  Icons.build_rounded,
                ),
                _chip(
                  context,
                  tenantRecordStatusLabel(
                    auth?.currentTenant?.raw ?? const <String, dynamic>{},
                  ),
                  Icons.bolt_rounded,
                ),
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

Widget _capabilitySection(
  BuildContext context, {
  required String title,
  required String subtitle,
  required List<_Capability> items,
}) {
  return Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      SectionHeader(title: title, subtitle: subtitle),
      const SizedBox(height: 10),
      LayoutBuilder(
        builder: (context, constraints) {
          final cardWidth = constraints.maxWidth >= 700
              ? (constraints.maxWidth - 12) / 2
              : constraints.maxWidth;
          return Wrap(
            spacing: 12,
            runSpacing: 12,
            children: [
              for (final item in items)
                SizedBox(
                  width: cardWidth,
                  child: _capabilityCard(context, item),
                ),
            ],
          );
        },
      ),
    ],
  );
}

Widget _capabilityCard(BuildContext context, _Capability item) {
  final allowed = item.allowed;
  final color = allowed ? SapphirePalette.sapphire600 : Colors.grey.shade600;
  final surface = allowed
      ? SapphirePalette.sapphire50
      : Theme.of(context).colorScheme.surfaceContainerHighest;

  return SurfaceCard(
    child: Container(
      decoration: BoxDecoration(
        color: surface,
        borderRadius: BorderRadius.circular(22),
        border: Border.all(
          color: allowed
              ? SapphirePalette.sapphire200
              : Theme.of(context).colorScheme.outlineVariant,
        ),
      ),
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                width: 46,
                height: 46,
                decoration: BoxDecoration(
                  color: color.withValues(alpha: allowed ? 0.16 : 0.10),
                  borderRadius: BorderRadius.circular(14),
                ),
                child: Icon(
                  item.icon,
                  color: color,
                  size: 24,
                ),
              ),
              const Spacer(),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                decoration: BoxDecoration(
                  color: allowed
                      ? SapphirePalette.sapphire100
                      : Theme.of(context).colorScheme.surface,
                  borderRadius: BorderRadius.circular(999),
                  border: Border.all(
                    color: allowed
                        ? SapphirePalette.sapphire200
                        : Theme.of(context).colorScheme.outlineVariant,
                  ),
                ),
                child: Text(
                  allowed ? 'Permitido' : 'Bloqueado',
                  style: Theme.of(context).textTheme.labelSmall?.copyWith(
                        color: allowed
                            ? SapphirePalette.sapphire800
                            : Colors.grey.shade700,
                        fontWeight: FontWeight.w800,
                      ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 14),
          Text(
            item.title,
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.w900,
                  color: allowed ? SapphirePalette.sapphire900 : null,
                ),
          ),
          const SizedBox(height: 6),
          Text(
            item.subtitle,
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: Theme.of(context).colorScheme.onSurfaceVariant,
                ),
          ),
        ],
      ),
    ),
  );
}

Widget _chip(BuildContext context, String label, IconData icon) {
  return Container(
    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
    decoration: BoxDecoration(
      color: Colors.white.withValues(alpha: 0.14),
      borderRadius: BorderRadius.circular(999),
      border: Border.all(color: Colors.white.withValues(alpha: 0.16)),
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
        ...items
            .take(3)
            .map(
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

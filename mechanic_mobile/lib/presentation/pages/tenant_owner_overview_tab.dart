import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../app/theme/app_theme.dart';
import '../viewmodels/auth_viewmodel.dart';
import '../viewmodels/tenant_viewmodel.dart';
import '../widgets/app_widgets.dart';
import 'tenant_owner_hero.dart';

class TenantOwnerOverviewTab extends StatelessWidget {
  const TenantOwnerOverviewTab({
    super.key,
    required this.onOperationsTap,
    required this.onCatalogTap,
    required this.onNetworkTap,
    required this.onProfileTap,
  });

  final VoidCallback onOperationsTap;
  final VoidCallback onCatalogTap;
  final VoidCallback onNetworkTap;
  final VoidCallback onProfileTap;

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthViewModel>().contextData;
    final vm = context.watch<TenantViewModel>();

    final tenant = vm.currentTenant ?? const <String, dynamic>{};
    final detail = vm.currentTenantDetail ?? const <String, dynamic>{};

    return Scaffold(
      appBar: AppBar(
        title: const Text('Taller'),
        actions: [
          IconButton(
            tooltip: 'Actualizar',
            onPressed: vm.loading ? null : vm.refresh,
            icon: const Icon(Icons.refresh_rounded),
          ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: vm.refresh,
        child: ListView(
          physics: const AlwaysScrollableScrollPhysics(),
          padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
          children: [
            TenantOwnerHero(
              contextData: auth,
              tenant: tenant,
              detail: detail,
              vm: vm,
            ),
            const SizedBox(height: 16),
            if (vm.error != null) ...[
              ErrorBanner(message: vm.error!),
              const SizedBox(height: 12),
            ],
            if (vm.loading) ...[
              const LinearProgressIndicator(),
              const SizedBox(height: 12),
            ],
            SectionHeader(
              title: 'Dashboard operativo',
              subtitle: 'Indicadores y tendencias del taller.',
            ),
            const SizedBox(height: 10),
            _dashboardMetrics(context, vm.operationalDashboard),
            const SizedBox(height: 12),
            _dashboardLists(context, vm.operationalDashboard),
            const SizedBox(height: 18),
            SectionHeader(
              title: 'Atajos',
              subtitle: 'Entra directo al módulo que necesitas.',
            ),
            const SizedBox(height: 10),
            Column(
              children: [
                ActionCard(
                  title: 'Operaciones',
                  subtitle: 'Técnicos, incidentes y asignaciones.',
                  icon: Icons.handyman_rounded,
                  onTap: onOperationsTap,
                ),
                const SizedBox(height: 12),
                ActionCard(
                  title: 'Catálogo',
                  subtitle: 'Servicios, ofertas y auditoría.',
                  icon: Icons.inventory_2_rounded,
                  onTap: onCatalogTap,
                ),
              ],
            ),
            const SizedBox(height: 12),
            ActionCard(
              title: 'Red',
              subtitle: 'Perfil, configuración y red del tenant.',
              icon: Icons.apartment_rounded,
              onTap: onNetworkTap,
            ),
            const SizedBox(height: 12),
            ActionCard(
              title: 'Perfil',
              subtitle: 'Datos del taller, configuración y cerrar sesión.',
              icon: Icons.person_rounded,
              onTap: onProfileTap,
            ),
          ],
        ),
      ),
    );
  }
}

Widget _dashboardMetrics(BuildContext context, Map<String, dynamic>? dashboard) {
  final kpis = dashboard?['kpis'] is Map
      ? Map<String, dynamic>.from(dashboard!['kpis'] as Map)
      : const <String, dynamic>{};
  final cancelled = kpis['cancelled_cases'] is Map
      ? Map<String, dynamic>.from(kpis['cancelled_cases'] as Map)
      : const <String, dynamic>{};
  final withinTime = kpis['services_completed_within_estimated_time'] is Map
      ? Map<String, dynamic>.from(
          kpis['services_completed_within_estimated_time'] as Map,
        )
      : const <String, dynamic>{};
  final metrics = [
    (
      'Completados',
      kpis['completed_cases']?.toString() ?? '0',
      Icons.task_alt_rounded,
    ),
    (
      'Llegada media',
      '${kpis['average_arrival_time_minutes']?.toString() ?? '0'} min',
      Icons.timer_rounded,
    ),
    (
      'Resolución media',
      '${kpis['average_resolution_time_minutes']?.toString() ?? '0'} min',
      Icons.hourglass_bottom_rounded,
    ),
    (
      'Cancelados',
      cancelled['total']?.toString() ?? '0',
      Icons.cancel_rounded,
    ),
    (
      'Cumplimiento',
      '${withinTime['percentage']?.toString() ?? '0'}%',
      Icons.verified_rounded,
    ),
  ];

  return LayoutBuilder(
    builder: (context, constraints) {
      final tileWidth = constraints.maxWidth >= 720
          ? (constraints.maxWidth - 12) / 2
          : constraints.maxWidth;
      return Wrap(
        spacing: 12,
        runSpacing: 12,
        children: [
          for (final metric in metrics)
            SizedBox(
              width: tileWidth,
              child: _metricCard(
                context,
                title: metric.$1,
                value: metric.$2,
                icon: metric.$3,
              ),
            ),
        ],
      );
    },
  );
}

Widget _dashboardLists(BuildContext context, Map<String, dynamic>? dashboard) {
  final data = dashboard ?? const <String, dynamic>{};
  final kpis = data['kpis'] is Map
      ? Map<String, dynamic>.from(data['kpis'] as Map)
      : const <String, dynamic>{};
  final topIncidents = (kpis['top_incident_types'] as List?) ?? const [];
  final topTechnicians = (kpis['top_technicians'] as List?) ?? const [];
  final topZones = (kpis['top_zones'] as List?) ?? const [];
  final charts = data['charts'] is Map
      ? Map<String, dynamic>.from(data['charts'] as Map)
      : const <String, dynamic>{};
  final compliance = (charts['service_compliance'] as List?) ?? const [];

  return Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      SurfaceCard(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Incidencias principales',
              style: Theme.of(context).textTheme.titleMedium,
            ),
            const SizedBox(height: 10),
            if (topIncidents.isEmpty)
              const Text('Sin datos suficientes para mostrar incidencias.')
            else
              ...topIncidents.take(3).map((item) {
                final map = item is Map
                    ? Map<String, dynamic>.from(item)
                    : const <String, dynamic>{};
                return Padding(
                  padding: const EdgeInsets.only(bottom: 8),
                  child: _simpleMetricLine(
                    map['name']?.toString() ?? 'Sin nombre',
                    map['total']?.toString() ?? '0',
                  ),
                );
              }),
          ],
        ),
      ),
      const SizedBox(height: 12),
      SurfaceCard(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Técnicos destacados',
              style: Theme.of(context).textTheme.titleMedium,
            ),
            const SizedBox(height: 10),
            if (topTechnicians.isEmpty)
              const Text('Sin datos suficientes para mostrar técnicos.')
            else
              ...topTechnicians.take(3).map((item) {
                final map = item is Map
                    ? Map<String, dynamic>.from(item)
                    : const <String, dynamic>{};
                return Padding(
                  padding: const EdgeInsets.only(bottom: 8),
                  child: _simpleMetricLine(
                    map['name']?.toString() ?? 'Sin nombre',
                    map['total']?.toString() ?? '0',
                  ),
                );
              }),
          ],
        ),
      ),
      const SizedBox(height: 12),
      SurfaceCard(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Zonas con más casos',
              style: Theme.of(context).textTheme.titleMedium,
            ),
            const SizedBox(height: 10),
            if (topZones.isEmpty)
              const Text('Sin datos suficientes para mostrar zonas.')
            else
              ...topZones.take(3).map((item) {
                final map = item is Map
                    ? Map<String, dynamic>.from(item)
                    : const <String, dynamic>{};
                return Padding(
                  padding: const EdgeInsets.only(bottom: 8),
                  child: _simpleMetricLine(
                    map['name']?.toString() ??
                        map['zone']?.toString() ??
                        'Sin nombre',
                    map['total']?.toString() ??
                        map['incidents']?.toString() ??
                        '0',
                  ),
                );
              }),
          ],
        ),
      ),
      const SizedBox(height: 12),
      SurfaceCard(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Cumplimiento por servicio',
              style: Theme.of(context).textTheme.titleMedium,
            ),
            const SizedBox(height: 10),
            if (compliance.isEmpty)
              const Text('Sin datos suficientes para mostrar cumplimiento.')
            else
              ...compliance.take(3).map((item) {
                final map = item is Map
                    ? Map<String, dynamic>.from(item)
                    : const <String, dynamic>{};
                return Padding(
                  padding: const EdgeInsets.only(bottom: 8),
                  child: _simpleMetricLine(
                    map['name']?.toString() ?? 'Servicio',
                    map['value']?.toString() ?? '0',
                  ),
                );
              }),
          ],
        ),
      ),
    ],
  );
}

Widget _metricCard(
  BuildContext context, {
  required String title,
  required String value,
  required IconData icon,
}) {
  return SurfaceCard(
    child: Padding(
      padding: const EdgeInsets.all(16),
      child: Row(
        children: [
          Container(
            width: 46,
            height: 46,
            decoration: BoxDecoration(
              color: SapphirePalette.sapphire50,
              borderRadius: BorderRadius.circular(14),
            ),
            child: Icon(icon, color: SapphirePalette.sapphire700),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: Theme.of(context).textTheme.labelLarge?.copyWith(
                        fontWeight: FontWeight.w800,
                      ),
                ),
                const SizedBox(height: 4),
                Text(
                  value,
                  style: Theme.of(context).textTheme.titleLarge?.copyWith(
                        fontWeight: FontWeight.w900,
                      ),
                ),
              ],
            ),
          ),
        ],
      ),
    ),
  );
}

Widget _simpleMetricLine(String label, String value) {
  return Row(
    children: [
      Expanded(
        child: Text(label, style: const TextStyle(fontWeight: FontWeight.w700)),
      ),
      Text(value, style: const TextStyle(fontWeight: FontWeight.w900)),
    ],
  );
}

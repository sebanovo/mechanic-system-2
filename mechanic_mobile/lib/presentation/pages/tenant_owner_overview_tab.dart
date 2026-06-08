import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../helpers/tenant_record_helpers.dart';
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
    final profile = vm.currentProfile ?? const <String, dynamic>{};
    final settings = vm.currentSettings ?? const <String, dynamic>{};
    final provider = vm.currentProviderProfile ?? const <String, dynamic>{};

    return Scaffold(
      appBar: AppBar(
        title: const Text('Taller'),
        actions: [
          IconButton(
            onPressed: vm.loading ? null : () => vm.refresh(),
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
              title: 'Atajos',
              subtitle: 'Entra directo al módulo que necesitas.',
            ),
            const SizedBox(height: 10),
            Row(
              children: [
                Expanded(
                  child: ActionCard(
                    title: 'Operaciones',
                    subtitle: 'Técnicos, incidentes y asignaciones.',
                    icon: Icons.handyman_rounded,
                    onTap: onOperationsTap,
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: ActionCard(
                    title: 'Catálogo',
                    subtitle: 'Servicios, ofertas y auditoría.',
                    icon: Icons.inventory_2_rounded,
                    onTap: onCatalogTap,
                  ),
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
            const SizedBox(height: 18),
            SectionHeader(
              title: 'Resumen del tenant',
              subtitle: 'Datos base que ya están cargados.',
            ),
            const SizedBox(height: 10),
            SurfaceCard(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _infoLine('Tenant', tenant['commercial_name']?.toString()),
                  const SizedBox(height: 8),
                  _infoLine('Tipo', tenantRecordSecondaryLabel(tenant)),
                  const SizedBox(height: 8),
                  _infoLine('Perfil legal', profile.isEmpty ? 'Sin datos' : (profile['legal_name']?.toString() ?? 'Sin datos')),
                  const SizedBox(height: 8),
                  _infoLine('Configuración', settings.isEmpty ? 'Sin datos' : '${settings['default_currency'] ?? '-'} • ${settings['default_language'] ?? '-'}'),
                  const SizedBox(height: 8),
                  _infoLine('Proveedor', provider.isEmpty ? 'Sin perfil' : tenantRecordStatusLabel(provider)),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

Widget _infoLine(String label, String? value) {
  return Row(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      SizedBox(
        width: 120,
        child: Text(
          label,
          style: const TextStyle(fontWeight: FontWeight.w800),
        ),
      ),
      Expanded(
        child: Text((value == null || value.trim().isEmpty) ? 'Sin datos' : value),
      ),
    ],
  );
}

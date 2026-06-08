import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../helpers/tenant_record_helpers.dart';
import '../viewmodels/tenant_viewmodel.dart';
import '../widgets/app_widgets.dart';
import 'tenant_owner_sheets.dart';

class TenantOwnerNetworkTab extends StatefulWidget {
  const TenantOwnerNetworkTab({super.key});

  @override
  State<TenantOwnerNetworkTab> createState() => _TenantOwnerNetworkTabState();
}

class _TenantOwnerNetworkTabState extends State<TenantOwnerNetworkTab> {
  bool _loaded = false;
  bool _loadingNow = false;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (_loaded || _loadingNow) return;
    _loadingNow = true;
    WidgetsBinding.instance.addPostFrameCallback((_) async {
      await _reloadTab();
      if (!mounted) return;
      setState(() {
        _loaded = true;
        _loadingNow = false;
      });
    });
  }

  Future<void> _reloadTab() async {
    final vm = context.read<TenantViewModel>();
    await Future.wait<void>([
      vm.reloadCurrentTenantDetail(),
      vm.reloadCurrentProfile(),
      vm.reloadCurrentSettings(),
      vm.reloadCurrentProviderProfile(),
    ]);
  }

  Future<void> _refresh() async {
    if (mounted) {
      setState(() {
        _loadingNow = true;
      });
    }
    await _reloadTab();
    if (mounted) {
      setState(() {
        _loadingNow = false;
        _loaded = true;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final vm = context.watch<TenantViewModel>();
    final tenant = vm.currentTenant ?? const <String, dynamic>{};
    final detail = vm.currentTenantDetail ?? const <String, dynamic>{};
    final profile = vm.currentProfile ?? const <String, dynamic>{};
    final settings = vm.currentSettings ?? const <String, dynamic>{};
    final provider = vm.currentProviderProfile ?? const <String, dynamic>{};

    return Scaffold(
      appBar: AppBar(
        title: const Text('Red'),
        actions: [
          IconButton(
            onPressed: (vm.loading || _loadingNow) ? null : _refresh,
            icon: const Icon(Icons.refresh_rounded),
          ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: _refresh,
        child: ListView(
          physics: const AlwaysScrollableScrollPhysics(),
          padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
          children: [
            if (vm.error != null) ...[
              ErrorBanner(message: vm.error!),
              const SizedBox(height: 12),
            ],
            if (vm.loading || _loadingNow || !_loaded) ...[
              const LinearProgressIndicator(),
              const SizedBox(height: 12),
            ],
            SectionHeader(
              title: 'Gestión del tenant',
              subtitle: 'Perfil, configuración, proveedor y red.',
            ),
            const SizedBox(height: 10),
            ActionCard(
              title: 'Editar perfil',
              subtitle: profile.isEmpty ? 'Sin perfil cargado' : (profile['legal_name']?.toString() ?? 'Sin datos'),
              icon: Icons.badge_rounded,
              onTap: () => showEditTenantProfileSheet(context, vm),
            ),
            const SizedBox(height: 10),
            ActionCard(
              title: 'Editar configuración',
              subtitle: settings.isEmpty ? 'Sin configuración cargada' : '${settings['default_currency'] ?? '-'} • ${settings['default_language'] ?? '-'}',
              icon: Icons.tune_rounded,
              onTap: () => showEditTenantSettingsSheet(context, vm),
            ),
            const SizedBox(height: 10),
            ActionCard(
              title: 'Editar proveedor',
              subtitle: provider.isEmpty ? 'Sin perfil de proveedor' : tenantRecordStatusLabel(provider),
              icon: Icons.local_shipping_rounded,
              onTap: () => showEditProviderProfileSheet(context, vm),
            ),
            const SizedBox(height: 10),
            ActionCard(
              title: 'Crear red',
              subtitle: tenant.isEmpty ? 'Crea la red comercial del tenant' : 'Red actual: ${tenant['commercial_name'] ?? '-'}',
              icon: Icons.apartment_rounded,
              onTap: () => showCreateTenantNetworkSheet(context, vm),
            ),
            const SizedBox(height: 18),
            SectionHeader(
              title: 'Detalle actual',
              subtitle: 'Información expandida de la sesión del tenant.',
            ),
            const SizedBox(height: 10),
            SurfaceCard(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _line('Tenant', tenantRecordPrimaryLabel(tenant)),
                  const SizedBox(height: 8),
                  _line('Tipo', tenantRecordSecondaryLabel(tenant)),
                  const SizedBox(height: 8),
                  _line('Estado', tenantRecordStatusLabel(tenant)),
                  const SizedBox(height: 8),
                  _line('Detalle', detail.isEmpty ? 'Sin detalle cargado' : tenantRecordPrimaryLabel(detail)),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

Widget _line(String label, String value) {
  return Row(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      SizedBox(
        width: 110,
        child: Text(
          label,
          style: const TextStyle(fontWeight: FontWeight.w800),
        ),
      ),
      Expanded(child: Text(value)),
    ],
  );
}

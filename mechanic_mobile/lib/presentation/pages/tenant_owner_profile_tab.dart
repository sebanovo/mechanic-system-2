import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../helpers/tenant_record_helpers.dart';
import '../viewmodels/auth_viewmodel.dart';
import '../viewmodels/tenant_viewmodel.dart';
import '../widgets/app_widgets.dart';

class TenantOwnerProfileTab extends StatefulWidget {
  const TenantOwnerProfileTab({super.key});

  @override
  State<TenantOwnerProfileTab> createState() => _TenantOwnerProfileTabState();
}

class _TenantOwnerProfileTabState extends State<TenantOwnerProfileTab> {
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
      vm.reloadCurrentProfile(),
      vm.reloadCurrentSettings(),
      vm.reloadCurrentProviderProfile(),
      vm.reloadCurrentTenantDetail(),
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
    final auth = context.watch<AuthViewModel>().contextData;
    final vm = context.watch<TenantViewModel>();

    final profile = vm.currentProfile ?? const <String, dynamic>{};
    final settings = vm.currentSettings ?? const <String, dynamic>{};
    final provider = vm.currentProviderProfile ?? const <String, dynamic>{};
    final tenant = vm.currentTenant ?? const <String, dynamic>{};
    final tenantDetail = vm.currentTenantDetail ?? const <String, dynamic>{};

    return Scaffold(
      appBar: AppBar(
        title: const Text('Perfil'),
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
              title: auth?.user.fullName ?? 'Perfil del taller',
              subtitle: 'Datos del tenant, configuración y cierre de sesión.',
            ),
            const SizedBox(height: 10),
            ActionCard(
              title: 'Perfil legal',
              subtitle: profile.isEmpty ? 'Sin datos cargados' : (profile['legal_name']?.toString() ?? 'Sin datos'),
              icon: Icons.badge_rounded,
              onTap: () => showTenantRecordDetails(context, title: 'Perfil del taller', record: profile),
            ),
            const SizedBox(height: 10),
            ActionCard(
              title: 'Configuración',
              subtitle: settings.isEmpty ? 'Sin datos cargados' : '${settings['default_currency'] ?? '-'} • ${settings['default_language'] ?? '-'}',
              icon: Icons.tune_rounded,
              onTap: () => showTenantRecordDetails(context, title: 'Configuración del taller', record: settings),
            ),
            const SizedBox(height: 10),
            ActionCard(
              title: 'Proveedor',
              subtitle: provider.isEmpty ? 'Sin perfil de proveedor' : tenantRecordStatusLabel(provider),
              icon: Icons.local_shipping_rounded,
              onTap: () => showTenantRecordDetails(context, title: 'Perfil de proveedor', record: provider),
            ),
            const SizedBox(height: 10),
            ActionCard(
              title: 'Tenant activo',
              subtitle: tenant.isEmpty ? 'Sin tenant activo' : tenantRecordPrimaryLabel(tenant),
              icon: Icons.apartment_rounded,
              onTap: () => showTenantRecordDetails(context, title: 'Tenant activo', record: tenantDetail.isEmpty ? tenant : tenantDetail),
            ),
            const SizedBox(height: 18),
            SurfaceCard(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Sesión',
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                          fontWeight: FontWeight.w900,
                        ),
                  ),
                  const SizedBox(height: 10),
                  Text(
                    auth?.user.email ?? '-',
                    style: Theme.of(context).textTheme.bodyLarge,
                  ),
                  const SizedBox(height: 6),
                  Text(
                    auth?.userType ?? '-',
                    style: Theme.of(context).textTheme.bodyMedium,
                  ),
                  const SizedBox(height: 16),
                  SizedBox(
                    width: double.infinity,
                    child: FilledButton.icon(
                      onPressed: () async {
                        await context.read<AuthViewModel>().signOut();
                        if (!context.mounted) return;
                        context.go('/entry');
                      },
                      icon: const Icon(Icons.logout_rounded),
                      label: const Text('Cerrar sesión'),
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
}

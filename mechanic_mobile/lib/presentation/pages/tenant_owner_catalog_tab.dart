import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../viewmodels/tenant_viewmodel.dart';
import '../widgets/app_widgets.dart';
import 'tenant_owner_records_section.dart';
import 'tenant_owner_sheets.dart';

class TenantOwnerCatalogTab extends StatefulWidget {
  const TenantOwnerCatalogTab({super.key});

  @override
  State<TenantOwnerCatalogTab> createState() => _TenantOwnerCatalogTabState();
}

class _TenantOwnerCatalogTabState extends State<TenantOwnerCatalogTab> {
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
      vm.reloadServiceCatalog(),
      vm.reloadTechnicians(),
      vm.reloadProviderServices(),
      vm.reloadTechnicianServices(),
      vm.reloadCandidateProviders(),
      vm.reloadOffers(),
      vm.reloadAuditEvents(),
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

    return Scaffold(
          appBar: AppBar(
        title: const Text('Catálogo'),
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
              title: 'Servicios y catálogo',
              subtitle: 'Control de los endpoints comerciales del taller.',
            ),
            const SizedBox(height: 10),
            ActionCard(
              title: 'Nuevo servicio',
              subtitle: 'Dar de alta un servicio de proveedor.',
              icon: Icons.add_business_rounded,
              onTap: () => showCreateProviderServiceSheet(context, vm),
            ),
            const SizedBox(height: 12),
            ActionCard(
              title: 'Nuevo servicio técnico',
              subtitle: 'Asignar un servicio de catálogo a un técnico.',
              icon: Icons.engineering_rounded,
              onTap: () => showCreateTechnicianServiceSheet(context, vm),
            ),
            const SizedBox(height: 18),
            TenantOwnerRecordsSection(
              title: 'Catálogo de servicios',
              subtitle: '${vm.serviceCatalog.pagination.total} servicios base.',
              items: vm.serviceCatalog.items,
            ),
            TenantOwnerRecordsSection(
              title: 'Servicios del proveedor',
              subtitle: '${vm.providerServices.pagination.total} vínculos de proveedor.',
              items: vm.providerServices.items,
            ),
            TenantOwnerRecordsSection(
              title: 'Servicios técnicos',
              subtitle: '${vm.technicianServices.pagination.total} servicios asignados a técnicos.',
              items: vm.technicianServices.items,
            ),
            TenantOwnerRecordsSection(
              title: 'Candidatos',
              subtitle: '${vm.candidateProviders.pagination.total} proveedores candidatos.',
              items: vm.candidateProviders.items,
            ),
            TenantOwnerRecordsSection(
              title: 'Ofertas',
              subtitle: '${vm.offers.pagination.total} ofertas pendientes o históricas.',
              items: vm.offers.items,
            ),
            TenantOwnerRecordsSection(
              title: 'Auditoría',
              subtitle: '${vm.auditEvents.pagination.total} eventos registrados.',
              items: vm.auditEvents.items,
            ),
          ],
        ),
      ),
    );
  }
}

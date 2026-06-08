import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../viewmodels/tenant_viewmodel.dart';
import '../widgets/app_widgets.dart';
import 'tenant_owner_records_section.dart';
import 'tenant_owner_sheets.dart';

class TenantOwnerOperationsTab extends StatefulWidget {
  const TenantOwnerOperationsTab({super.key});

  @override
  State<TenantOwnerOperationsTab> createState() => _TenantOwnerOperationsTabState();
}

class _TenantOwnerOperationsTabState extends State<TenantOwnerOperationsTab> {
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
      vm.reloadTechnicians(),
      vm.reloadMembers(),
      vm.reloadIncidents(),
      vm.reloadAssignments(),
      vm.reloadTenantSessions(),
      vm.reloadServiceCatalog(),
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
        title: const Text('Operaciones'),
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
              title: 'Acciones rápidas',
              subtitle: 'Alta y mantenimiento de operaciones.',
            ),
            const SizedBox(height: 10),
            ActionCard(
              title: 'Nuevo técnico',
              subtitle: 'Registrar un técnico para el tenant actual.',
              icon: Icons.person_add_alt_1_rounded,
              onTap: () => showCreateTechnicianSheet(context, vm),
            ),
            const SizedBox(height: 10),
            ActionCard(
              title: 'Nuevo servicio proveedor',
              subtitle: 'Crear un vínculo de servicio comercial.',
              icon: Icons.add_business_rounded,
              onTap: () => showCreateProviderServiceSheet(context, vm),
            ),
            const SizedBox(height: 18),
            TenantOwnerRecordsSection(
              title: 'Técnicos',
              subtitle: '${vm.technicians.pagination.total} técnicos registrados.',
              items: vm.technicians.items,
            ),
            TenantOwnerRecordsSection(
              title: 'Miembros',
              subtitle: '${vm.members.pagination.total} membresías activas o históricas.',
              items: vm.members.items,
            ),
            TenantOwnerRecordsSection(
              title: 'Incidentes',
              subtitle: '${vm.incidents.pagination.total} incidentes en el taller.',
              items: vm.incidents.items,
            ),
            TenantOwnerRecordsSection(
              title: 'Asignaciones',
              subtitle: '${vm.assignments.pagination.total} asignaciones operativas.',
              items: vm.assignments.items,
            ),
            TenantOwnerRecordsSection(
              title: 'Sesiones',
              subtitle: '${vm.sessions.pagination.total} sesiones activas y recientes.',
              items: vm.sessions.items,
            ),
          ],
        ),
      ),
    );
  }
}

import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../viewmodels/tenant_viewmodel.dart';
import '../widgets/app_widgets.dart';
import 'tenant_owner_records_section.dart';
import 'tenant_owner_sheets.dart';

class TenantAssignmentsPage extends StatefulWidget {
  const TenantAssignmentsPage({super.key});

  @override
  State<TenantAssignmentsPage> createState() => _TenantAssignmentsPageState();
}

class _TenantAssignmentsPageState extends State<TenantAssignmentsPage> {
  bool _loaded = false;
  bool _loadingNow = false;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (_loaded || _loadingNow) return;
    _loadingNow = true;
    WidgetsBinding.instance.addPostFrameCallback((_) async {
      await _reload();
      if (!mounted) return;
      setState(() {
        _loaded = true;
        _loadingNow = false;
      });
    });
  }

  Future<void> _reload() async {
    final vm = context.read<TenantViewModel>();
    await Future.wait<void>([
      vm.reloadAssignments(),
      vm.reloadOffers(),
      vm.reloadTechnicians(),
      vm.reloadIncidents(),
    ]);
  }

  Future<void> _refresh() async {
    if (mounted) {
      setState(() => _loadingNow = true);
    }
    await _reload();
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
        title: const Text('Asignaciones'),
        leading: Builder(
          builder: (context) => IconButton(
            tooltip: 'Menú',
            onPressed: () => Scaffold.of(context).openDrawer(),
            icon: const Icon(Icons.menu_rounded),
          ),
        ),
        actions: [
          IconButton(
            tooltip: 'Refrescar',
            onPressed: (vm.loading || _loadingNow) ? null : _refresh,
            icon: const Icon(Icons.refresh_rounded),
          ),
        ],
      ),
      drawer: Drawer(
        backgroundColor: const Color(0xFFFFF8D6),
        child: SafeArea(
          child: ListView(
            padding: const EdgeInsets.symmetric(vertical: 16),
            children: [
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Colors.black,
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Asignaciones',
                        style: Theme.of(context).textTheme.titleLarge?.copyWith(
                              color: Colors.white,
                            ),
                      ),
                      const SizedBox(height: 4),
                      const Text(
                        'Navegación del taller',
                        style: TextStyle(color: Colors.white70),
                      ),
                    ],
                  ),
                ),
              ),
              const Divider(height: 24),
              _drawerTile(
                context,
                icon: Icons.home_rounded,
                label: 'Inicio',
                onTap: () => context.go('/tenant-home'),
              ),
              _drawerTile(
                context,
                icon: Icons.handyman_rounded,
                label: 'Operaciones',
                onTap: () => context.go('/tenant-home'),
              ),
              _drawerTile(
                context,
                icon: Icons.inventory_2_rounded,
                label: 'Catálogo',
                onTap: () => context.go('/tenant-home'),
              ),
              _drawerTile(
                context,
                icon: Icons.assignment_turned_in_rounded,
                label: 'Asignaciones',
                onTap: () => Navigator.of(context).pop(),
              ),
              _drawerTile(
                context,
                icon: Icons.apartment_rounded,
                label: 'Red',
                onTap: () => context.go('/tenant-home'),
              ),
              _drawerTile(
                context,
                icon: Icons.notifications_rounded,
                label: 'Notificaciones',
                onTap: () => context.go('/tenant-notifications'),
              ),
              _drawerTile(
                context,
                icon: Icons.person_rounded,
                label: 'Perfil',
                onTap: () => context.go('/tenant-home'),
              ),
            ],
          ),
        ),
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
              title: 'Crear y gestionar',
              subtitle: 'Asigna técnicos a ofertas aceptadas del taller.',
            ),
            const SizedBox(height: 10),
            ActionCard(
              title: 'Nueva asignación',
              subtitle: 'Selecciona oferta, técnico y notas.',
              icon: Icons.playlist_add_check_rounded,
              onTap: () => showCreateAssignmentSheet(context, vm),
            ),
            const SizedBox(height: 18),
            TenantOwnerRecordsSection(
              title: 'Asignaciones',
              subtitle: '${vm.assignments.pagination.total} asignaciones operativas.',
              items: vm.assignments.items,
            ),
          ],
        ),
      ),
    );
  }

  Widget _drawerTile(
    BuildContext context, {
    required IconData icon,
    required String label,
    required VoidCallback onTap,
  }) {
    return ListTile(
      leading: Icon(icon),
      title: Text(label),
      onTap: onTap,
    );
  }
}

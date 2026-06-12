import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../viewmodels/auth_viewmodel.dart';
import '../viewmodels/app_viewmodels.dart';
import '../widgets/offline_status_banner.dart';
import 'notifications_page.dart';
import 'assignments_page.dart';
import 'dashboard_page.dart';
import 'incidents_page.dart';
import 'profile_page.dart';
import 'vehicles_page.dart';

class ShellPage extends StatelessWidget {
  const ShellPage({super.key});

  @override
  Widget build(BuildContext context) {
    final vm = context.watch<AppShellViewModel>();
    final pages = <Widget>[
      const DashboardPage(),
      const VehiclesPage(),
      const IncidentsPage(),
      const AssignmentsPage(),
      const NotificationsPage(title: 'Mis notificaciones', showDevices: true),
      const ProfilePage(),
    ];
    final wide = MediaQuery.of(context).size.width >= 1024;

    return Scaffold(
      appBar: wide
          ? null
          : AppBar(
              title: const Text('Cliente'),
            ),
      drawer: wide ? null : _buildDrawer(context, vm),
      body: SafeArea(
        child: Column(
          children: [
            const OfflineStatusBanner(),
            Expanded(
              child: wide
                  ? Row(
                      children: [
                        _buildRail(context, vm),
                        VerticalDivider(
                          width: 1,
                          color: Theme.of(context).colorScheme.outlineVariant,
                        ),
                        Expanded(
                          child: IndexedStack(
                            index: vm.selectedIndex,
                            children: pages,
                          ),
                        ),
                      ],
                    )
                  : IndexedStack(
                      index: vm.selectedIndex,
                      children: pages,
                    ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildRail(BuildContext context, AppShellViewModel vm) {
    return NavigationRail(
      backgroundColor: const Color(0xFFFFF5C2),
      selectedIndex: vm.selectedIndex,
      onDestinationSelected: context.read<AppShellViewModel>().setIndex,
      labelType: NavigationRailLabelType.all,
      leading: Padding(
        padding: const EdgeInsets.all(16),
        child: Container(
          width: double.infinity,
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: Colors.black,
            borderRadius: BorderRadius.circular(18),
          ),
          child: Text(
            'Cliente',
            style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.w900,
                  color: Colors.white,
                ),
          ),
        ),
      ),
      destinations: const [
        NavigationRailDestination(
          icon: Icon(Icons.dashboard_rounded),
          label: Text('Inicio'),
        ),
        NavigationRailDestination(
          icon: Icon(Icons.directions_car_rounded),
          label: Text('Vehículos'),
        ),
        NavigationRailDestination(
          icon: Icon(Icons.sos_rounded),
          label: Text('Incidentes'),
        ),
        NavigationRailDestination(
          icon: Icon(Icons.assignment_turned_in_rounded),
          label: Text('Asignaciones'),
        ),
        NavigationRailDestination(
          icon: Icon(Icons.notifications_rounded),
          label: Text('Notificaciones'),
        ),
        NavigationRailDestination(
          icon: Icon(Icons.person_rounded),
          label: Text('Perfil'),
        ),
      ],
      trailing: Padding(
        padding: const EdgeInsets.all(16),
        child: FilledButton.icon(
          onPressed: () async {
            await context.read<AuthViewModel>().signOut();
            if (!context.mounted) return;
            context.go('/entry');
          },
          icon: const Icon(Icons.logout_rounded),
          label: const Text('Salir'),
        ),
      ),
    );
  }

  Drawer _buildDrawer(BuildContext context, AppShellViewModel vm) {
    return Drawer(
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
                      'Cliente',
                      style: Theme.of(context).textTheme.titleLarge?.copyWith(
                            color: Colors.white,
                          ),
                    ),
                    const SizedBox(height: 4),
                    const Text(
                      'Navegación principal',
                      style: TextStyle(color: Colors.white70),
                    ),
                  ],
                ),
              ),
            ),
            const Divider(height: 24),
            _drawerTile(
              context,
              vm,
              index: 0,
              icon: Icons.dashboard_rounded,
              label: 'Inicio',
            ),
            _drawerTile(
              context,
              vm,
              index: 1,
              icon: Icons.directions_car_rounded,
              label: 'Vehículos',
            ),
            _drawerTile(
              context,
              vm,
              index: 2,
              icon: Icons.sos_rounded,
              label: 'Incidentes',
            ),
            _drawerTile(
              context,
              vm,
              index: 3,
              icon: Icons.assignment_turned_in_rounded,
              label: 'Asignaciones',
            ),
            _drawerTile(
              context,
              vm,
              index: 4,
              icon: Icons.notifications_rounded,
              label: 'Notificaciones',
            ),
            _drawerTile(
              context,
              vm,
              index: 5,
              icon: Icons.person_rounded,
              label: 'Perfil',
            ),
            const Divider(height: 24),
            ListTile(
              leading: const Icon(Icons.logout_rounded),
              title: const Text('Cerrar sesión'),
              onTap: () async {
                await context.read<AuthViewModel>().signOut();
                if (!context.mounted) return;
                context.go('/entry');
              },
            ),
          ],
        ),
      ),
    );
  }

  Widget _drawerTile(
    BuildContext context,
    AppShellViewModel vm, {
    required int index,
    required IconData icon,
    required String label,
  }) {
    return ListTile(
      selected: vm.selectedIndex == index,
      leading: Icon(icon),
      title: Text(label),
      onTap: () {
        context.read<AppShellViewModel>().setIndex(index);
        Navigator.of(context).pop();
      },
    );
  }
}

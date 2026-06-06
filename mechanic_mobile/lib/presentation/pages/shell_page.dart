import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../viewmodels/app_viewmodels.dart';
import '../widgets/app_widgets.dart';
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
      const ProfilePage(),
    ];

    return Scaffold(
      body: IndexedStack(
        index: vm.selectedIndex,
        children: pages,
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: vm.selectedIndex,
        onDestinationSelected: context.read<AppShellViewModel>().setIndex,
        destinations: const [
          NavigationDestination(
            icon: Icon(Icons.dashboard_rounded),
            label: 'Inicio',
          ),
          NavigationDestination(
            icon: Icon(Icons.directions_car_rounded),
            label: 'Vehículos',
          ),
          NavigationDestination(
            icon: Icon(Icons.sos_rounded),
            label: 'Incidentes',
          ),
          NavigationDestination(
            icon: Icon(Icons.person_rounded),
            label: 'Perfil',
          ),
        ],
      ),
    );
  }
}

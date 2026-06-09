import 'package:flutter/material.dart';

import 'tenant_owner_catalog_tab.dart';
import 'tenant_owner_network_tab.dart';
import 'tenant_owner_operations_tab.dart';
import 'tenant_owner_overview_tab.dart';
import 'tenant_owner_profile_tab.dart';
import 'notifications_page.dart';

class TenantOwnerShellPage extends StatefulWidget {
  const TenantOwnerShellPage({super.key});

  @override
  State<TenantOwnerShellPage> createState() => _TenantOwnerShellPageState();
}

class _TenantOwnerShellPageState extends State<TenantOwnerShellPage> {
  final PageController _controller = PageController();
  int _index = 0;

  void _goTo(int index) {
    if (_index == index) return;
    setState(() {
      _index = index;
    });
    _controller.animateToPage(
      index,
      duration: const Duration(milliseconds: 250),
      curve: Curves.easeOut,
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final wide = MediaQuery.of(context).size.width >= 1100;
    final pages = <Widget>[
      TenantOwnerOverviewTab(
        onOperationsTap: () => _goTo(1),
        onCatalogTap: () => _goTo(2),
        onNetworkTap: () => _goTo(3),
        onProfileTap: () => _goTo(4),
      ),
      const TenantOwnerOperationsTab(),
      const TenantOwnerCatalogTab(),
      const TenantOwnerNetworkTab(),
      const TenantOwnerProfileTab(),
      const NotificationsPage(
        title: 'Notificaciones del taller',
        showDevices: true,
      ),
    ];

    return Scaffold(
      appBar: wide
          ? null
          : AppBar(
              title: const Text('Panel de taller'),
            ),
      drawer: wide ? null : _buildDrawer(context),
      body: SafeArea(
        child: wide
            ? Row(
                children: [
                  _buildRail(context),
                  VerticalDivider(
                    width: 1,
                    color: Theme.of(context).colorScheme.outlineVariant,
                  ),
                  Expanded(child: _buildPageView(pages)),
                ],
              )
            : _buildPageView(pages),
      ),
    );
  }

  Widget _buildPageView(List<Widget> pages) {
    return PageView.builder(
      controller: _controller,
      physics: const NeverScrollableScrollPhysics(),
      onPageChanged: (index) {
        if (_index != index) {
          setState(() => _index = index);
        }
      },
      itemCount: pages.length,
      itemBuilder: (context, index) => pages[index],
    );
  }

  Widget _buildRail(BuildContext context) {
    return NavigationRail(
      selectedIndex: _index,
      onDestinationSelected: _goTo,
      labelType: NavigationRailLabelType.all,
      leading: Padding(
        padding: const EdgeInsets.all(16),
        child: Text(
          'Panel de taller',
          style: Theme.of(context).textTheme.titleLarge?.copyWith(
                fontWeight: FontWeight.w900,
              ),
        ),
      ),
      destinations: const [
        NavigationRailDestination(
          icon: Icon(Icons.home_rounded),
          label: Text('Inicio'),
        ),
        NavigationRailDestination(
          icon: Icon(Icons.handyman_rounded),
          label: Text('Operaciones'),
        ),
        NavigationRailDestination(
          icon: Icon(Icons.inventory_2_rounded),
          label: Text('Catálogo'),
        ),
        NavigationRailDestination(
          icon: Icon(Icons.apartment_rounded),
          label: Text('Red'),
        ),
        NavigationRailDestination(
          icon: Icon(Icons.person_rounded),
          label: Text('Perfil'),
        ),
        NavigationRailDestination(
          icon: Icon(Icons.notifications_rounded),
          label: Text('Notificaciones'),
        ),
      ],
    );
  }

  Drawer _buildDrawer(BuildContext context) {
    return Drawer(
      child: SafeArea(
        child: ListView(
          padding: const EdgeInsets.symmetric(vertical: 16),
          children: [
            ListTile(
              title: Text(
                'Panel de taller',
                style: Theme.of(context).textTheme.titleLarge,
              ),
              subtitle: const Text('Navegación principal'),
            ),
            const Divider(height: 24),
            _drawerTile(context, index: 0, icon: Icons.home_rounded, label: 'Inicio'),
            _drawerTile(context, index: 1, icon: Icons.handyman_rounded, label: 'Operaciones'),
            _drawerTile(context, index: 2, icon: Icons.inventory_2_rounded, label: 'Catálogo'),
            _drawerTile(context, index: 3, icon: Icons.apartment_rounded, label: 'Red'),
            _drawerTile(context, index: 4, icon: Icons.person_rounded, label: 'Perfil'),
            _drawerTile(context, index: 5, icon: Icons.notifications_rounded, label: 'Notificaciones'),
          ],
        ),
      ),
    );
  }

  Widget _drawerTile(
    BuildContext context, {
    required int index,
    required IconData icon,
    required String label,
  }) {
    return ListTile(
      selected: _index == index,
      leading: Icon(icon),
      title: Text(label),
      onTap: () {
        _goTo(index);
        Navigator.of(context).pop();
      },
    );
  }
}

import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import 'tenant_owner_catalog_tab.dart';
import 'tenant_owner_network_tab.dart';
import 'tenant_owner_operations_tab.dart';
import 'tenant_owner_overview_tab.dart';
import 'tenant_owner_profile_tab.dart';
import 'notifications_page.dart';
import '../viewmodels/auth_viewmodel.dart';
import '../widgets/offline_status_banner.dart';

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
        onProfileTap: () => _goTo(5),
      ),
      const TenantOwnerOperationsTab(),
      const TenantOwnerCatalogTab(),
      const TenantOwnerNetworkTab(),
      const NotificationsPage(
        title: 'Notificaciones del taller',
        showDevices: true,
      ),
      const TenantOwnerProfileTab(),
    ];

    return Scaffold(
      appBar: wide
          ? null
          : AppBar(
              title: const Text('Panel de taller'),
              leading: Builder(
                builder: (context) {
                  final canPop = Navigator.of(context).canPop();
                  return IconButton(
                    onPressed: canPop
                        ? () => Navigator.of(context).maybePop()
                        : () => Scaffold.of(context).openDrawer(),
                    icon: Icon(
                      canPop ? Icons.arrow_back_rounded : Icons.menu_rounded,
                    ),
                  );
                },
              ),
              actions: [
                IconButton(
                  onPressed: () => setState(() => _index = 0),
                  icon: const Icon(Icons.dashboard_rounded),
                ),
                IconButton(
                  onPressed: () =>
                      context.read<AuthViewModel>().signOut().then((_) {
                        if (context.mounted) context.go('/entry');
                      }),
                  icon: const Icon(Icons.logout_rounded),
                ),
              ],
            ),
      drawer: wide ? null : _buildDrawer(context),
      body: SafeArea(
        child: Column(
          children: [
            const OfflineStatusBanner(),
            Expanded(
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
          ],
        ),
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
      backgroundColor: const Color(0xFFFFF5C2),
      selectedIndex: _index,
      onDestinationSelected: _goTo,
      labelType: NavigationRailLabelType.all,
      leading: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: Colors.black,
                borderRadius: BorderRadius.circular(18),
              ),
              child: Text(
                'Panel de taller',
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.w900,
                  color: Colors.white,
                ),
              ),
            ),
            const SizedBox(height: 12),
            FilledButton.icon(
              onPressed: () => context.go('/tenant-assignments'),
              icon: const Icon(Icons.assignment_turned_in_rounded),
              label: const Text('Asignaciones'),
            ),
          ],
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

  Drawer _buildDrawer(BuildContext context) {
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
                      'Panel de taller',
                      style: Theme.of(
                        context,
                      ).textTheme.titleLarge?.copyWith(color: Colors.white),
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
              index: 0,
              icon: Icons.home_rounded,
              label: 'Inicio',
            ),
            _drawerTile(
              context,
              index: 1,
              icon: Icons.handyman_rounded,
              label: 'Operaciones',
            ),
            _drawerTile(
              context,
              index: 2,
              icon: Icons.inventory_2_rounded,
              label: 'Catálogo',
            ),
            _drawerTile(
              context,
              index: 3,
              icon: Icons.apartment_rounded,
              label: 'Red',
            ),
            _drawerTile(
              context,
              index: 4,
              icon: Icons.notifications_rounded,
              label: 'Notificaciones',
            ),
            _drawerTile(
              context,
              index: 5,
              icon: Icons.person_rounded,
              label: 'Perfil',
            ),
            ListTile(
              leading: const Icon(Icons.assignment_turned_in_rounded),
              title: const Text('Asignaciones'),
              onTap: () {
                Navigator.of(context).pop();
                context.go('/tenant-assignments');
              },
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

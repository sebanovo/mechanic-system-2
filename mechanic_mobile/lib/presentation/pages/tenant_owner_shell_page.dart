import 'package:flutter/material.dart';

import 'tenant_owner_catalog_tab.dart';
import 'tenant_owner_network_tab.dart';
import 'tenant_owner_operations_tab.dart';
import 'tenant_owner_overview_tab.dart';
import 'tenant_owner_profile_tab.dart';

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
    return Scaffold(
      body: PageView.builder(
        controller: _controller,
        physics: const NeverScrollableScrollPhysics(),
        onPageChanged: (index) {
          if (_index != index) {
            setState(() => _index = index);
          }
        },
        itemCount: 5,
        itemBuilder: (context, index) {
          switch (index) {
            case 0:
              return TenantOwnerOverviewTab(
                onOperationsTap: () => _goTo(1),
                onCatalogTap: () => _goTo(2),
                onNetworkTap: () => _goTo(3),
                onProfileTap: () => _goTo(4),
              );
            case 1:
              return const TenantOwnerOperationsTab();
            case 2:
              return const TenantOwnerCatalogTab();
            case 3:
              return const TenantOwnerNetworkTab();
            case 4:
            default:
              return const TenantOwnerProfileTab();
          }
        },
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _index,
        onTap: _goTo,
        type: BottomNavigationBarType.fixed,
        selectedItemColor: const Color(0xFF166AE9),
        unselectedItemColor: Colors.blueGrey,
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home_rounded),
            label: 'Inicio',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.handyman_rounded),
            label: 'Operaciones',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.inventory_2_rounded),
            label: 'Catálogo',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.apartment_rounded),
            label: 'Red',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person_rounded),
            label: 'Perfil',
          ),
        ],
      ),
    );
  }
}

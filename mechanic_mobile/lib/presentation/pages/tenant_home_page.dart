import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../viewmodels/auth_viewmodel.dart';
import 'shell_page.dart';
import 'tenant_owner_page.dart';
import 'tenant_technician_page.dart';

class TenantHomePage extends StatelessWidget {
  const TenantHomePage({super.key});

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthViewModel>().contextData;
    final userType = auth?.userType.toUpperCase();

    switch (userType) {
      case 'TENANT_OWNER':
        return const TenantOwnerPage();
      case 'TECHNICIAN':
        return const TenantTechnicianPage();
      case 'CLIENT':
        return const ShellPage();
      default:
        return const TenantOwnerPage();
    }
  }
}

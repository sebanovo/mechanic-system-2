import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../../domain/entities/auth_entities.dart';
import '../viewmodels/auth_viewmodel.dart';

bool _splashBootstrapStarted = false;

class SplashPage extends StatelessWidget {
  const SplashPage({super.key});

  @override
  Widget build(BuildContext context) {
    _scheduleBootstrap(context);

    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          color: Color(0xFFFFC107),
        ),
        child: const Center(
          child: CircularProgressIndicator(color: Colors.black),
        ),
      ),
    );
  }
}

void _scheduleBootstrap(BuildContext context) {
  if (_splashBootstrapStarted) return;
  _splashBootstrapStarted = true;
  WidgetsBinding.instance.addPostFrameCallback((_) async {
    if (!context.mounted) return;
    await context.read<AuthViewModel>().bootstrap();
    if (!context.mounted) return;
    final authVm = context.read<AuthViewModel>();
    if (authVm.contextData != null) {
      context.go(authVm.selectedRole == AppEntryRole.client ? '/home' : '/select-tenants');
    } else {
      context.go('/entry');
    }
  });
}

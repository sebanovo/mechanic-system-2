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
          gradient: LinearGradient(
            colors: [Color(0xFF030F21), Color(0xFF092B5D), Color(0xFF166AE9)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        child: const Center(
          child: CircularProgressIndicator(color: Colors.white),
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

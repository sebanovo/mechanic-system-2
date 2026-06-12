import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../../app/theme/app_theme.dart';
import '../../domain/entities/auth_entities.dart';
import '../viewmodels/auth_viewmodel.dart';
import '../widgets/app_widgets.dart';
import '../widgets/role_entry_card.dart';

class EntryPage extends StatelessWidget {
  const EntryPage({super.key});

  @override
  Widget build(BuildContext context) {
    final authVm = context.watch<AuthViewModel>();

    return Scaffold(
      backgroundColor: Colors.black,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SurfaceCard(
                padding: const EdgeInsets.all(18),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      width: 84,
                      height: 84,
                      padding: const EdgeInsets.all(10),
                      decoration: BoxDecoration(
                        color: SapphirePalette.sapphire500,
                        borderRadius: BorderRadius.circular(24),
                      ),
                      child: Image.asset(
                        'assets/logo2.png',
                        fit: BoxFit.contain,
                      ),
                    ),
                    const SizedBox(width: 16),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Sistema Gestion Aux. Mecanico',
                            style: Theme.of(context).textTheme.headlineMedium
                                ?.copyWith(color: Colors.black, fontSize: 32),
                          ),
                          const SizedBox(height: 8),
                          Text(
                            'Elige tu puerta de entrada para continuar con el flujo correcto.',
                            style: Theme.of(context).textTheme.bodyLarge,
                          ),
                          if (authVm.loading) ...[
                            const SizedBox(height: 10),
                            Text(
                              'Restaurando sesión...',
                              style: Theme.of(context).textTheme.bodyMedium,
                            ),
                          ],
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              if (authVm.error != null) ...[
                const SizedBox(height: 12),
                ErrorBanner(message: authVm.error!),
              ],
              const SizedBox(height: 20),
              Expanded(
                child: ListView(
                  children: [
                    RoleEntryCard(
                      title: 'Soy Cliente',
                      subtitle: 'Gestiona vehículos, incidentes y sesiones.',
                      icon: Icons.person_rounded,
                      accent: SapphirePalette.sapphire500,
                      onTap: () => context.go('/auth/client'),
                    ),
                    const SizedBox(height: 14),
                    RoleEntryCard(
                      title: 'Soy Taller',
                      subtitle: 'Registra tu taller y administra tu presencia.',
                      icon: Icons.handyman_rounded,
                      accent: SapphirePalette.sapphire700,
                      onTap: () => context.go('/auth/workshop'),
                    ),
                    const SizedBox(height: 14),
                    RoleEntryCard(
                      title: 'Soy Mecanico',
                      subtitle: 'Entra como técnico independiente.',
                      icon: Icons.build_rounded,
                      accent: SapphirePalette.sapphire900,
                      onTap: () => context.go('/auth/mechanic'),
                    ),
                    if (authVm.contextData != null) ...[
                      const SizedBox(height: 18),
                      SurfaceCard(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Sesión guardada',
                              style: Theme.of(context).textTheme.titleLarge,
                            ),
                            const SizedBox(height: 6),
                            Text(
                              authVm.contextData!.user.fullName,
                              style: Theme.of(context).textTheme.bodyLarge,
                            ),
                            const SizedBox(height: 12),
                            ElevatedButton(
                              onPressed: () {
                                if (authVm.selectedRole ==
                                    AppEntryRole.client) {
                                  context.go('/home');
                                } else {
                                  context.go('/select-tenants');
                                }
                              },
                              child: const Text('Continuar sesión'),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

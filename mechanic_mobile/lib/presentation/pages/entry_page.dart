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
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [
              SapphirePalette.sapphire950,
              SapphirePalette.sapphire800,
              SapphirePalette.sapphire500,
            ],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        child: SafeArea(
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const SizedBox(height: 8),
                Text(
                  'Auxilio mecánico',
                  style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                        color: Colors.white,
                        fontSize: 32,
                      ),
                ),
                const SizedBox(height: 8),
                Text(
                  'Elige tu puerta de entrada para continuar con el flujo correcto.',
                  style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                        color: Colors.white.withOpacity(0.84),
                      ),
                ),
                if (authVm.loading) ...[
                  const SizedBox(height: 10),
                  Text(
                    'Restaurando sesión...',
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                          color: Colors.white.withOpacity(0.75),
                        ),
                  ),
                ],
                if (authVm.error != null) ...[
                  const SizedBox(height: 12),
                  ErrorBanner(message: authVm.error!),
                ],
                const SizedBox(height: 24),
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
                                  final contextData = authVm.contextData;
                                  final userType = contextData?.userType?.toUpperCase() ?? '';
                                  final tenantId = contextData?.tenantId ?? '';
                                  if (tenantId.isNotEmpty ||
                                      userType == 'TENANT_OWNER' ||
                                      userType == 'TECHNICIAN') {
                                    context.go('/tenant-home');
                                    return;
                                  }
                                  if (authVm.selectedRole == AppEntryRole.client) {
                                    context.go('/home');
                                  } else {
                                    context.go('/tenant-home');
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
      ),
    );
  }
}

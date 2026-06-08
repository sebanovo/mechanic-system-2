import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../../domain/entities/auth_entities.dart';
import '../utils/api_enum_labels.dart';
import '../viewmodels/auth_viewmodel.dart';
import '../widgets/app_widgets.dart';

class TenantHubPage extends StatelessWidget {
  const TenantHubPage({super.key});

  @override
  Widget build(BuildContext context) {
    final vm = context.watch<AuthViewModel>();
    final auth = vm.contextData;
    final tenants = auth?.availableTenants
            .whereType<AuthTenantEntity>()
            .toList(growable: false) ??
        const <AuthTenantEntity>[];

    return Scaffold(
      appBar: AppBar(
        title: const Text('Panel de taller'),
        actions: [
          IconButton(
            onPressed: vm.loading ? null : () => vm.refresh(),
            icon: const Icon(Icons.refresh_rounded),
          ),
          IconButton(
            onPressed: () async {
              await context.read<AuthViewModel>().signOut();
              if (!context.mounted) return;
              context.go('/entry');
            },
            icon: const Icon(Icons.logout_rounded),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            if (vm.loading || vm.submitting) ...[
              const LinearProgressIndicator(),
              const SizedBox(height: 12),
            ],
            SurfaceCard(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    auth?.user.fullName ?? 'Usuario autenticado',
                    style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                          fontSize: 26,
                        ),
                  ),
                  const SizedBox(height: 8),
                  Text(auth?.user.email ?? '-'),
                  const SizedBox(height: 12),
                  Text('Rol: ${auth?.userType ?? '-'}'),
                  const SizedBox(height: 4),
                  Text('Tenant actual: ${auth?.currentTenant?.commercialName ?? 'No seleccionado'}'),
                ],
              ),
            ),
            const SizedBox(height: 16),
            SectionHeader(
              title: 'Tenants disponibles',
              subtitle: 'Selecciona el contexto de trabajo cuando sea necesario.',
            ),
            const SizedBox(height: 12),
            if (auth == null)
              const EmptyStatePanel(
                title: 'Sesión no cargada',
                subtitle: 'Espera un momento mientras se restaura la sesión.',
                icon: Icons.hourglass_top_rounded,
              )
            else if (tenants.isEmpty)
              const EmptyStatePanel(
                title: 'Sin tenants',
                subtitle: 'El backend no devolvió tenants disponibles.',
                icon: Icons.apartment_rounded,
              )
            else
              ...tenants.map(
                (tenant) => Padding(
                  padding: const EdgeInsets.only(bottom: 12),
                  child: SurfaceCard(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          tenant.commercialName.isEmpty
                              ? 'Tenant sin nombre'
                              : tenant.commercialName,
                          style: Theme.of(context).textTheme.titleLarge,
                        ),
                        const SizedBox(height: 6),
                        Text(
                          '${tenantKindLabelFromApi(tenant.tenantKind)} • ${tenant.status.isEmpty ? '-' : tenant.status}',
                        ),
                        const SizedBox(height: 14),
                        SizedBox(
                          width: double.infinity,
                          child: ElevatedButton(
                            onPressed: vm.submitting
                                ? null
                                : () async {
                                    final ok = await context
                                        .read<AuthViewModel>()
                                        .selectTenant(tenant.id);
                                    if (!context.mounted) return;
                                    if (ok) {
                                      showAppSnackBar(context, 'Tenant seleccionado');
                                      context.go('/tenant-home');
                                    }
                                  },
                            child: const Text('Usar'),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}

import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../viewmodels/app_viewmodels.dart';
import '../widgets/app_widgets.dart';

class SessionsPage extends StatelessWidget {
  const SessionsPage({super.key});

  @override
  Widget build(BuildContext context) {
    final vm = context.watch<SessionsViewModel>();
    if (!vm.loaded && !vm.loading) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (context.mounted) {
          context.read<SessionsViewModel>().loadSessions();
        }
      });
    }

    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          tooltip: 'Volver atrás',
          onPressed: () {
            if (context.canPop()) {
              context.pop();
            } else {
              context.go('/home');
            }
          },
          icon: const Icon(Icons.arrow_back_rounded),
        ),
        title: const Text('Sesiones activas'),
      ),
      body: ListView(
        padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
        children: [
          if (vm.error != null) ErrorBanner(message: vm.error!),
          if (vm.loading)
            const Center(
              child: Padding(
                padding: EdgeInsets.all(24),
                child: CircularProgressIndicator(),
              ),
            )
          else if (vm.sessions?.items.isEmpty ?? true)
            const EmptyStatePanel(
              title: 'Sin sesiones',
              subtitle: 'No hay sesiones registradas para este usuario.',
              icon: Icons.devices_rounded,
            )
          else
            ...vm.sessions!.items.map(
              (session) => Padding(
                padding: const EdgeInsets.only(bottom: 12),
                child: SurfaceCard(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Expanded(
                            child: Text(
                              session.deviceName ?? 'Dispositivo',
                              style: Theme.of(context).textTheme.titleLarge,
                            ),
                          ),
                          StatusBadge(label: session.sessionStatus),
                        ],
                      ),
                      const SizedBox(height: 8),
                      Text(
                        session.deviceType ?? 'Tipo no disponible',
                        style: Theme.of(context).textTheme.bodyMedium,
                      ),
                      const SizedBox(height: 8),
                      Text(
                        'Expira: ${_formatDate(session.expiresAt)}',
                        style: Theme.of(context).textTheme.bodyMedium,
                      ),
                      const SizedBox(height: 12),
                      OutlinedButton(
                        onPressed: () async {
                          final ok = await context
                              .read<SessionsViewModel>()
                              .revoke(session.id);
                          if (!context.mounted) return;
                          _toast(
                            context,
                            ok ? 'Sesión revocada' : 'No se pudo revocar',
                          );
                        },
                        child: const Text('Revocar sesión'),
                      ),
                    ],
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }
}

String _formatDate(DateTime? value) {
  if (value == null) return '-';
  return '${value.year.toString().padLeft(4, '0')}-${value.month.toString().padLeft(2, '0')}-${value.day.toString().padLeft(2, '0')}';
}

void _toast(BuildContext context, String message) {
  ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(message)));
}

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:skeletonizer/skeletonizer.dart';

import '../viewmodels/app_viewmodels.dart';
import '../widgets/app_widgets.dart';

class NotificationsPage extends StatelessWidget {
  const NotificationsPage({super.key});

  @override
  Widget build(BuildContext context) {
    final vm = context.watch<NotificationsViewModel>();
    if (!vm.loaded && !vm.loading) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (context.mounted) {
          context.read<NotificationsViewModel>().refresh();
        }
      });
    }

    return Scaffold(
      appBar: AppBar(
        title: const Text('Notificaciones'),
        actions: [
          IconButton(
            onPressed: vm.registering ? null : () => context.read<NotificationsViewModel>().registerCurrentDevice(),
            icon: const Icon(Icons.phonelink_setup_rounded),
            tooltip: 'Registrar dispositivo',
          ),
          IconButton(
            onPressed: vm.registering ? null : () => context.read<NotificationsViewModel>().markAllRead(),
            icon: const Icon(Icons.done_all_rounded),
            tooltip: 'Marcar todo como leído',
          ),
          IconButton(
            onPressed: (vm.loading || vm.registering) ? null : () => context.read<NotificationsViewModel>().refresh(),
            icon: const Icon(Icons.refresh_rounded),
          ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: () => context.read<NotificationsViewModel>().refresh(),
        child: ListView(
          physics: const AlwaysScrollableScrollPhysics(),
          padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
          children: [
            if (vm.error != null) ...[
              ErrorBanner(message: vm.error!),
              const SizedBox(height: 12),
            ],
            if (vm.message != null) ...[
              _successBanner(vm.message!),
              const SizedBox(height: 12),
            ],
            SectionHeader(
              title: 'Centro de notificaciones',
              subtitle: 'Mensajes backend, dispositivos registrados y acciones rápidas.',
            ),
            const SizedBox(height: 12),
            ActionCard(
              title: 'Registrar dispositivo',
              subtitle: 'Obtiene token de Firebase y lo guarda en el backend.',
              icon: Icons.phonelink_setup_rounded,
              onTap: () => context.read<NotificationsViewModel>().registerCurrentDevice(),
            ),
            const SizedBox(height: 18),
            SurfaceCard(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Dispositivos', style: Theme.of(context).textTheme.titleLarge),
                  const SizedBox(height: 10),
                  if (vm.loading && !vm.devicesLoaded)
                    const Padding(
                      padding: EdgeInsets.symmetric(vertical: 24),
                      child: Center(child: CircularProgressIndicator()),
                    )
                  else if (vm.devices?.items.isEmpty ?? true)
                    const EmptyStatePanel(
                      title: 'Sin dispositivos',
                      subtitle: 'Registra este dispositivo para recibir pushes.',
                      icon: Icons.phonelink_rounded,
                    )
                  else
                    ...vm.devices!.items.map(
                      (device) => Padding(
                        padding: const EdgeInsets.only(bottom: 10),
                        child: SurfaceCard(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                children: [
                                  Expanded(
                                    child: Text(
                                      device['device_name']?.toString() ??
                                          device['platform']?.toString() ??
                                          device['id']?.toString() ??
                                          'Dispositivo',
                                      style: Theme.of(context).textTheme.titleMedium,
                                    ),
                                  ),
                                  StatusBadge(label: device['status']?.toString() ?? '-'),
                                ],
                              ),
                              const SizedBox(height: 8),
                              Text(device['device_token']?.toString() ?? '-'),
                              const SizedBox(height: 10),
                              Align(
                                alignment: Alignment.centerRight,
                                child: TextButton.icon(
                                  onPressed: vm.registering
                                      ? null
                                      : () async {
                                          final id = device['id']?.toString() ?? '';
                                          if (id.isEmpty) return;
                                          await context.read<NotificationsViewModel>().revokeDevice(id);
                                        },
                                  icon: const Icon(Icons.delete_outline_rounded),
                                  label: const Text('Revocar'),
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
            const SizedBox(height: 18),
            SectionHeader(
              title: 'Notificaciones',
              subtitle: 'Listado general del usuario autenticado.',
            ),
            const SizedBox(height: 10),
            if (vm.loading && !vm.loaded)
              Skeletonizer(
                enabled: true,
                child: Column(
                  children: List.generate(
                    3,
                    (index) => const Padding(
                      padding: EdgeInsets.only(bottom: 12),
                      child: SurfaceCard(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('Nueva notificación'),
                            SizedBox(height: 8),
                            Text('Contenido'),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
              )
            else if (vm.notifications?.items.isEmpty ?? true)
              const EmptyStatePanel(
                title: 'Sin notificaciones',
                subtitle: 'Cuando el backend envíe eventos, aparecerán aquí.',
                icon: Icons.notifications_none_rounded,
              )
            else
              ...vm.notifications!.items.map(
                (notification) => Padding(
                  padding: const EdgeInsets.only(bottom: 12),
                  child: SurfaceCard(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Expanded(
                              child: Text(
                                notification['title']?.toString() ??
                                    notification['notification_title']?.toString() ??
                                    'Notificación',
                                style: Theme.of(context).textTheme.titleLarge,
                              ),
                            ),
                            StatusBadge(
                              label: notification['status']?.toString() ??
                                  notification['notification_status']?.toString() ??
                                  '-',
                            ),
                          ],
                        ),
                        const SizedBox(height: 8),
                        Text(
                          notification['body']?.toString() ??
                              notification['notification_body']?.toString() ??
                              '',
                        ),
                        const SizedBox(height: 8),
                        Text(
                          notification['notification_type']?.toString() ??
                              notification['type']?.toString() ??
                              '-',
                          style: Theme.of(context).textTheme.bodySmall,
                        ),
                        const SizedBox(height: 10),
                        Align(
                          alignment: Alignment.centerRight,
                          child: TextButton(
                            onPressed: vm.registering
                                ? null
                                : () async {
                                    final id = notification['id']?.toString() ?? '';
                                    if (id.isEmpty) return;
                                    await context.read<NotificationsViewModel>().markRead(id);
                                  },
                            child: const Text('Marcar leída'),
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

Widget _successBanner(String message) {
  return Container(
    width: double.infinity,
    margin: const EdgeInsets.only(bottom: 12),
    padding: const EdgeInsets.all(14),
    decoration: BoxDecoration(
      color: Colors.green.withOpacity(0.08),
      borderRadius: BorderRadius.circular(18),
      border: Border.all(color: Colors.green.withOpacity(0.18)),
    ),
    child: Text(
      message,
      style: TextStyle(
        color: Colors.green.shade900,
        fontWeight: FontWeight.w600,
      ),
    ),
  );
}

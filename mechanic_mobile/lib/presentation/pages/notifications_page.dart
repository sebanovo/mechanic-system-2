import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:skeletonizer/skeletonizer.dart';

import '../viewmodels/app_viewmodels.dart';
import '../widgets/app_widgets.dart';

class NotificationsPage extends StatelessWidget {
  const NotificationsPage({
    super.key,
    this.title = 'Notificaciones',
    this.showDevices = false,
  });

  final String title;
  final bool showDevices;

  @override
  Widget build(BuildContext context) {
    final vm = context.watch<NotificationsViewModel>();
    final shouldLoadNotifications = !vm.loaded && !vm.loading;
    final shouldLoadDevices = showDevices && !vm.devicesLoaded && !vm.loading;
    if (shouldLoadNotifications || shouldLoadDevices) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (!context.mounted) return;
        if (showDevices) {
          context.read<NotificationsViewModel>().refresh();
        } else {
          context.read<NotificationsViewModel>().loadNotifications();
        }
      });
    }

    return Scaffold(
      appBar: AppBar(
        title: Text(title),
        actions: [
          if (showDevices)
            IconButton(
              onPressed: vm.registering
                  ? null
                  : () => context
                        .read<NotificationsViewModel>()
                        .registerCurrentDevice(),
              icon: const Icon(Icons.phonelink_setup_rounded),
              tooltip: 'Registrar dispositivo',
            ),
          if (showDevices)
            IconButton(
              onPressed: vm.registering
                  ? null
                  : () => context.read<NotificationsViewModel>().markAllRead(),
              icon: const Icon(Icons.done_all_rounded),
              tooltip: 'Marcar todo como leído',
            ),
          IconButton(
            onPressed: (vm.loading || vm.registering)
                ? null
                : () => showDevices
                      ? context.read<NotificationsViewModel>().refresh()
                      : context
                            .read<NotificationsViewModel>()
                            .loadNotifications(),
            icon: const Icon(Icons.refresh_rounded),
          ),
        ],
      ),
      body: SafeArea(
        child: RefreshIndicator(
          onRefresh: () => showDevices
              ? context.read<NotificationsViewModel>().refresh()
              : context.read<NotificationsViewModel>().loadNotifications(),
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
              if (showDevices) ...[
                _buildHero(context, vm),
                const SizedBox(height: 16),
                _buildSectionSelector(context, vm),
                const SizedBox(height: 16),
              ],
              vm.sectionIndex == 1 && showDevices
                  ? _buildDevicesSection(context, vm)
                  : _buildNotificationsSection(context, vm),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildHero(BuildContext context, NotificationsViewModel vm) {
    return SurfaceCard(
      padding: EdgeInsets.zero,
      child: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [Color(0xFF04152F), Color(0xFF166AE9)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
          borderRadius: BorderRadius.all(Radius.circular(28)),
        ),
        padding: const EdgeInsets.fromLTRB(18, 18, 18, 18),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Centro de notificaciones',
              style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                color: Colors.white,
                fontWeight: FontWeight.w900,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              'Mensajes y dispositivos sincronizados con Firebase y el backend.',
              style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                color: Colors.white.withValues(alpha: 0.9),
              ),
            ),
            const SizedBox(height: 14),
            Wrap(
              spacing: 10,
              runSpacing: 10,
              children: [
                _chip(
                  context,
                  '${vm.notifications?.pagination.total ?? 0} mensajes',
                  Icons.notifications_rounded,
                ),
                if (showDevices)
                  _chip(
                    context,
                    '${vm.devices?.pagination.total ?? 0} dispositivos',
                    Icons.phonelink_setup_rounded,
                  ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSectionSelector(
    BuildContext context,
    NotificationsViewModel vm,
  ) {
    return Wrap(
      spacing: 10,
      runSpacing: 10,
      children: [
        FilterChip(
          selected: vm.sectionIndex == 0,
          label: const Text('Notificaciones'),
          avatar: const Icon(Icons.notifications_rounded, size: 18),
          onSelected: (_) =>
              context.read<NotificationsViewModel>().setSectionIndex(0),
        ),
        FilterChip(
          selected: vm.sectionIndex == 1,
          label: const Text('Dispositivos'),
          avatar: const Icon(Icons.phonelink_setup_rounded, size: 18),
          onSelected: showDevices
              ? (_) => context.read<NotificationsViewModel>().setSectionIndex(1)
              : null,
        ),
      ],
    );
  }

  Widget _buildNotificationsSection(
    BuildContext context,
    NotificationsViewModel vm,
  ) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
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
                                notification['notification_title']
                                    ?.toString() ??
                                'Notificación',
                            style: Theme.of(context).textTheme.titleLarge,
                          ),
                        ),
                        StatusBadge(
                          label:
                              notification['status']?.toString() ??
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
                                await context
                                    .read<NotificationsViewModel>()
                                    .markRead(id);
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
    );
  }

  Widget _buildDevicesSection(BuildContext context, NotificationsViewModel vm) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SectionHeader(
          title: 'Dispositivos',
          subtitle:
              'Controla los equipos registrados para notificaciones push.',
        ),
        const SizedBox(height: 10),
        ActionCard(
          title: 'Registrar dispositivo',
          subtitle: 'Obtiene token de Firebase y lo guarda en el backend.',
          icon: Icons.phonelink_setup_rounded,
          onTap: () =>
              context.read<NotificationsViewModel>().registerCurrentDevice(),
        ),
        const SizedBox(height: 14),
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
              padding: const EdgeInsets.only(bottom: 12),
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
                    Text(
                      device['device_token']?.toString() ?? '-',
                      style: Theme.of(context).textTheme.bodySmall,
                    ),
                    const SizedBox(height: 10),
                    Align(
                      alignment: Alignment.centerRight,
                      child: TextButton.icon(
                        onPressed: vm.registering
                            ? null
                            : () async {
                                final id = device['id']?.toString() ?? '';
                                if (id.isEmpty) return;
                                await context
                                    .read<NotificationsViewModel>()
                                    .revokeDevice(id);
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
    );
  }

  Widget _chip(BuildContext context, String label, IconData icon) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.14),
        borderRadius: BorderRadius.circular(999),
        border: Border.all(color: Colors.white.withValues(alpha: 0.16)),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, color: Colors.white, size: 18),
          const SizedBox(width: 8),
          Text(
            label,
            style: Theme.of(context).textTheme.labelLarge?.copyWith(
              color: Colors.white,
              fontWeight: FontWeight.w800,
            ),
          ),
        ],
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
      color: Colors.green.withValues(alpha: 0.08),
      borderRadius: BorderRadius.circular(18),
      border: Border.all(color: Colors.green.withValues(alpha: 0.18)),
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

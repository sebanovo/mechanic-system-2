import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:skeletonizer/skeletonizer.dart';

import '../viewmodels/tenant_viewmodel.dart';
import '../widgets/app_widgets.dart';

class TenantSessionsPage extends StatefulWidget {
  const TenantSessionsPage({super.key});

  @override
  State<TenantSessionsPage> createState() => _TenantSessionsPageState();
}

class _TenantSessionsPageState extends State<TenantSessionsPage> {
  bool _loaded = false;
  bool _loadingNow = false;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (_loaded || _loadingNow) return;
    _loadingNow = true;
    WidgetsBinding.instance.addPostFrameCallback((_) async {
      await _reload();
      if (!mounted) return;
      setState(() {
        _loaded = true;
        _loadingNow = false;
      });
    });
  }

  Future<void> _reload() async {
    await context.read<TenantViewModel>().reloadTenantSessions();
  }

  Future<void> _refresh() async {
    if (mounted) {
      setState(() => _loadingNow = true);
    }
    await _reload();
    if (mounted) {
      setState(() {
        _loadingNow = false;
        _loaded = true;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final vm = context.watch<TenantViewModel>();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Sesiones del tenant'),
        actions: [
          IconButton(
            onPressed: (vm.loading || _loadingNow) ? null : _refresh,
            icon: const Icon(Icons.refresh_rounded),
          ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: _refresh,
        child: ListView(
          physics: const AlwaysScrollableScrollPhysics(),
          padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
          children: [
            const SectionHeader(
              title: 'Sesiones del tenant',
              subtitle: 'Sesiones activas y recientes de este workspace.',
            ),
            const SizedBox(height: 12),
            if (vm.error != null) ...[
              ErrorBanner(message: vm.error!),
              const SizedBox(height: 12),
            ],
            if (vm.loading || _loadingNow || !_loaded) ...[
              Skeletonizer(
                enabled: true,
                child: Column(
                  children: List.generate(
                    3,
                    (index) => Padding(
                      padding: const EdgeInsets.only(bottom: 12),
                      child: SurfaceCard(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: const [
                            Text('Sesión'),
                            SizedBox(height: 8),
                            Text('Dispositivo'),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ] else if (vm.sessions.items.isEmpty)
              const EmptyStatePanel(
                title: 'Sin sesiones',
                subtitle: 'No hay sesiones activas para este tenant.',
                icon: Icons.devices_other_rounded,
              )
            else
              ...vm.sessions.items.map(
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
                                session['device_name']?.toString() ??
                                    session['device_type']?.toString() ??
                                    session['id']?.toString() ??
                                    'Sesión',
                                style: Theme.of(context).textTheme.titleLarge,
                              ),
                            ),
                            StatusBadge(
                              label: session['session_status']?.toString() ?? '-',
                            ),
                          ],
                        ),
                        const SizedBox(height: 10),
                        InfoRow(
                          label: 'Usuario',
                          value: session['user_id']?.toString() ?? '-',
                        ),
                        const Divider(height: 24),
                        InfoRow(
                          label: 'Tenant',
                          value: session['tenant_id']?.toString() ?? '-',
                        ),
                        const Divider(height: 24),
                        InfoRow(
                          label: 'Login',
                          value: session['login_at']?.toString() ?? '-',
                        ),
                        const SizedBox(height: 14),
                        Align(
                          alignment: Alignment.centerRight,
                          child: TextButton.icon(
                            onPressed: vm.submitting
                                ? null
                                : () async {
                                    final id = session['id']?.toString() ?? '';
                                    if (id.isEmpty) return;
                                    await vm.revokeTenantSession(id);
                                  },
                            icon: const Icon(Icons.logout_rounded),
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
    );
  }
}

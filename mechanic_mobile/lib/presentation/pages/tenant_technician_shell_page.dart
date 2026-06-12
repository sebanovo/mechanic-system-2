import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../../domain/entities/auth_context_entity.dart';
import '../helpers/tenant_record_helpers.dart';
import '../utils/api_enum_labels.dart';
import '../viewmodels/auth_viewmodel.dart';
import '../viewmodels/tenant_viewmodel.dart';
import '../widgets/app_widgets.dart';
import 'assignment_tracking_page.dart';

class TenantTechnicianShellPage extends StatefulWidget {
  const TenantTechnicianShellPage({super.key});

  @override
  State<TenantTechnicianShellPage> createState() =>
      _TenantTechnicianShellPageState();
}

class _TenantTechnicianShellPageState extends State<TenantTechnicianShellPage> {
  final PageController _controller = PageController();
  int _index = 0;
  String? _selectedAssignmentId;
  Map<String, dynamic>? _selectedAssignment;

  void _goTo(int index) {
    if (_index == index) return;
    setState(() => _index = index);
    _controller.animateToPage(
      index,
      duration: const Duration(milliseconds: 250),
      curve: Curves.easeOut,
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthViewModel>().contextData;
    final vm = context.watch<TenantViewModel>();
    vm.scheduleBootstrap();
    final wide = MediaQuery.of(context).size.width >= 1100;

    final pages = <Widget>[
      _overviewTab(context, auth, vm),
      _assignmentsTab(context, vm),
      _trackingTab(context, vm),
      _incidentsTab(context, vm),
      _sessionsTab(context, vm),
      _catalogTab(context, vm),
      _profileTab(context, auth, vm),
    ];

    return Scaffold(
      appBar: wide
          ? null
          : AppBar(
              title: const Text('Técnico'),
              leading: Builder(
                builder: (context) {
                  final canPop = Navigator.of(context).canPop();
                  return IconButton(
                    onPressed: canPop
                        ? () => Navigator.of(context).maybePop()
                        : () => Scaffold.of(context).openDrawer(),
                    icon: Icon(
                      canPop ? Icons.arrow_back_rounded : Icons.menu_rounded,
                    ),
                  );
                },
              ),
              actions: [
                IconButton(
                  onPressed: vm.loading ? null : () => vm.refresh(),
                  icon: const Icon(Icons.refresh_rounded),
                ),
              ],
            ),
      drawer: wide ? null : _buildDrawer(context),
      body: SafeArea(
        child: Column(
          children: [
            const OfflineStatusBanner(),
            Expanded(
              child: wide
                  ? Row(
                      children: [
                        _buildRail(context),
                        VerticalDivider(
                          width: 1,
                          color: Theme.of(context).colorScheme.outlineVariant,
                        ),
                        Expanded(child: _buildPageView(pages)),
                      ],
                    )
                  : _buildPageView(pages),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPageView(List<Widget> pages) {
    return PageView.builder(
      controller: _controller,
      physics: const NeverScrollableScrollPhysics(),
      onPageChanged: (index) {
        if (_index != index) {
          setState(() => _index = index);
        }
      },
      itemCount: pages.length,
      itemBuilder: (context, index) => pages[index],
    );
  }

  Widget _buildRail(BuildContext context) {
    return NavigationRail(
      backgroundColor: const Color(0xFFFFF5C2),
      selectedIndex: _index,
      onDestinationSelected: _goTo,
      labelType: NavigationRailLabelType.all,
      leading: Padding(
        padding: const EdgeInsets.all(16),
        child: Container(
          width: double.infinity,
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: Colors.black,
            borderRadius: BorderRadius.circular(18),
          ),
          child: Text(
            'Panel técnico',
            style: Theme.of(context).textTheme.titleLarge?.copyWith(
              fontWeight: FontWeight.w900,
              color: Colors.white,
            ),
          ),
        ),
      ),
      destinations: const [
        NavigationRailDestination(
          icon: Icon(Icons.home_rounded),
          label: Text('Inicio'),
        ),
        NavigationRailDestination(
          icon: Icon(Icons.assignment_turned_in_rounded),
          label: Text('Asignaciones'),
        ),
        NavigationRailDestination(
          icon: Icon(Icons.timeline_rounded),
          label: Text('Tracking'),
        ),
        NavigationRailDestination(
          icon: Icon(Icons.report_problem_rounded),
          label: Text('Incidentes'),
        ),
        NavigationRailDestination(
          icon: Icon(Icons.devices_other_rounded),
          label: Text('Sesiones'),
        ),
        NavigationRailDestination(
          icon: Icon(Icons.inventory_2_rounded),
          label: Text('Catálogo'),
        ),
        NavigationRailDestination(
          icon: Icon(Icons.person_rounded),
          label: Text('Perfil'),
        ),
      ],
      trailing: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const SizedBox(height: 8),
            FilledButton.icon(
              onPressed: () async {
                await context.read<AuthViewModel>().signOut();
                if (!context.mounted) return;
                context.go('/entry');
              },
              icon: const Icon(Icons.logout_rounded),
              label: const Text('Salir'),
            ),
          ],
        ),
      ),
    );
  }

  Drawer _buildDrawer(BuildContext context) {
    return Drawer(
      backgroundColor: const Color(0xFFFFF8D6),
      child: SafeArea(
        child: ListView(
          padding: const EdgeInsets.symmetric(vertical: 16),
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.black,
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Panel técnico',
                      style: Theme.of(
                        context,
                      ).textTheme.titleLarge?.copyWith(color: Colors.white),
                    ),
                    const SizedBox(height: 4),
                    const Text(
                      'Navegación principal',
                      style: TextStyle(color: Colors.white70),
                    ),
                  ],
                ),
              ),
            ),
            const Divider(height: 24),
            _drawerTile(context, 0, Icons.home_rounded, 'Inicio'),
            _drawerTile(
              context,
              1,
              Icons.assignment_turned_in_rounded,
              'Asignaciones',
            ),
            _drawerTile(context, 2, Icons.timeline_rounded, 'Tracking'),
            _drawerTile(context, 3, Icons.report_problem_rounded, 'Incidentes'),
            _drawerTile(context, 4, Icons.devices_other_rounded, 'Sesiones'),
            _drawerTile(context, 5, Icons.inventory_2_rounded, 'Catálogo'),
            _drawerTile(context, 6, Icons.person_rounded, 'Perfil'),
            const Divider(height: 24),
            ListTile(
              leading: const Icon(Icons.logout_rounded),
              title: const Text('Cerrar sesión'),
              onTap: () async {
                await context.read<AuthViewModel>().signOut();
                if (!context.mounted) return;
                context.go('/entry');
              },
            ),
          ],
        ),
      ),
    );
  }

  Widget _drawerTile(
    BuildContext context,
    int index,
    IconData icon,
    String label,
  ) {
    return ListTile(
      selected: _index == index,
      leading: Icon(icon),
      title: Text(label),
      onTap: () {
        _goTo(index);
        Navigator.of(context).pop();
      },
    );
  }

  Widget _overviewTab(
    BuildContext context,
    AuthContextEntity? auth,
    TenantViewModel vm,
  ) {
    return RefreshIndicator(
      onRefresh: vm.refresh,
      child: ListView(
        physics: const AlwaysScrollableScrollPhysics(),
        padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
        children: [
          _hero(context, auth, vm),
          const SizedBox(height: 16),
          if (vm.error != null) ...[
            ErrorBanner(message: vm.error!),
            const SizedBox(height: 12),
          ],
          if (vm.loading) ...[
            const LinearProgressIndicator(),
            const SizedBox(height: 12),
          ],
          SectionHeader(
            title: 'Atajos',
            subtitle: 'Ir directo a tus áreas de trabajo.',
          ),
          const SizedBox(height: 10),
          ActionCard(
            title: 'Asignaciones',
            subtitle: 'Abrir lista y seguimiento en vivo.',
            icon: Icons.assignment_turned_in_rounded,
            onTap: () => _goTo(1),
          ),
          const SizedBox(height: 10),
          ActionCard(
            title: 'Tracking',
            subtitle: 'Ver ubicación en tiempo real de la asignación activa.',
            icon: Icons.timeline_rounded,
            onTap: () => _goTo(2),
          ),
        ],
      ),
    );
  }

  Widget _assignmentsTab(BuildContext context, TenantViewModel vm) {
    return RefreshIndicator(
      onRefresh: vm.reloadAssignments,
      child: ListView(
        physics: const AlwaysScrollableScrollPhysics(),
        padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
        children: [
          SectionHeader(
            title: 'Asignaciones',
            subtitle: 'Tus asignaciones activas y su estado.',
          ),
          const SizedBox(height: 12),
          if (vm.error != null) ...[
            ErrorBanner(message: vm.error!),
            const SizedBox(height: 12),
          ],
          if (vm.assignments.items.isEmpty)
            const EmptyStatePanel(
              title: 'No hay asignaciones',
              subtitle:
                  'Cuando el taller te asigne un incidente aparecerá aquí.',
              icon: Icons.assignment_turned_in_rounded,
            )
          else
            ...vm.assignments.items.map(
              (assignment) => Padding(
                padding: const EdgeInsets.only(bottom: 12),
                child: SurfaceCard(
                  child: InkWell(
                    onTap: () => _openAssignment(context, vm, assignment),
                    borderRadius: BorderRadius.circular(20),
                    child: Padding(
                      padding: const EdgeInsets.all(2),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Expanded(
                                child: Text(
                                  tenantRecordPrimaryLabel(assignment),
                                  style: Theme.of(context).textTheme.titleLarge,
                                ),
                              ),
                              StatusBadge(
                                label: tenantRecordStatusLabel(assignment),
                              ),
                            ],
                          ),
                          const SizedBox(height: 8),
                          Text(
                            tenantRecordSecondaryLabel(assignment),
                            style: Theme.of(context).textTheme.bodyMedium
                                ?.copyWith(
                                  color: Theme.of(
                                    context,
                                  ).colorScheme.onSurfaceVariant,
                                ),
                          ),
                          const SizedBox(height: 12),
                          Align(
                            alignment: Alignment.centerRight,
                            child: TextButton.icon(
                              onPressed: () =>
                                  _openAssignment(context, vm, assignment),
                              icon: const Icon(Icons.open_in_new_rounded),
                              label: const Text('Abrir seguimiento'),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }

  Widget _trackingTab(BuildContext context, TenantViewModel vm) {
    return RefreshIndicator(
      onRefresh: () async {
        if (_selectedAssignmentId != null) {
          await vm.reloadAssignmentTrackingSession(_selectedAssignmentId!);
        }
      },
      child: ListView(
        physics: const AlwaysScrollableScrollPhysics(),
        padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
        children: [
          SectionHeader(
            title: 'Tracking en vivo',
            subtitle:
                'Selecciona una asignación para seguir ubicación y eventos.',
          ),
          const SizedBox(height: 12),
          if (_selectedAssignmentId == null)
            const EmptyStatePanel(
              title: 'Sin asignación seleccionada',
              subtitle:
                  'Ve a Asignaciones y abre una asignación para ver el tracking.',
              icon: Icons.timeline_rounded,
            )
          else ...[
            if (_selectedAssignment != null)
              Padding(
                padding: const EdgeInsets.only(bottom: 12),
                child: SurfaceCard(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        tenantRecordPrimaryLabel(_selectedAssignment!),
                        style: Theme.of(context).textTheme.titleLarge,
                      ),
                      const SizedBox(height: 6),
                      Text(
                        tenantRecordSecondaryLabel(_selectedAssignment!),
                        style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                          color: Theme.of(context).colorScheme.onSurfaceVariant,
                        ),
                      ),
                      const SizedBox(height: 12),
                      Align(
                        alignment: Alignment.centerRight,
                        child: OutlinedButton.icon(
                          onPressed: () => _openAssignment(
                            context,
                            vm,
                            _selectedAssignment!,
                          ),
                          icon: const Icon(Icons.refresh_rounded),
                          label: const Text('Actualizar tracking'),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            AssignmentTrackingLivePanel(
              assignmentId: _selectedAssignmentId!,
              trackingSession: vm.assignmentTrackingSession,
              onOpenMap: () {
                Navigator.of(context).push(
                  MaterialPageRoute<void>(
                    builder: (_) => AssignmentTrackingPage(
                      assignmentId: _selectedAssignmentId!,
                      trackingSession: vm.assignmentTrackingSession,
                    ),
                  ),
                );
              },
            ),
          ],
        ],
      ),
    );
  }

  Widget _incidentsTab(BuildContext context, TenantViewModel vm) {
    return _recordsTab(
      context,
      title: 'Incidentes',
      subtitle: 'Consulta los incidentes que debes atender.',
      items: vm.incidents.items,
      onRefresh: vm.reloadIncidents,
    );
  }

  Widget _sessionsTab(BuildContext context, TenantViewModel vm) {
    return _recordsTab(
      context,
      title: 'Sesiones',
      subtitle: 'Sesiones del tenant actual y actividad reciente.',
      items: vm.sessions.items,
      onRefresh: vm.reloadTenantSessions,
    );
  }

  Widget _catalogTab(BuildContext context, TenantViewModel vm) {
    return RefreshIndicator(
      onRefresh: vm.reloadServiceCatalog,
      child: ListView(
        physics: const AlwaysScrollableScrollPhysics(),
        padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
        children: [
          SectionHeader(
            title: 'Catálogo',
            subtitle: 'Servicios base y vínculos técnicos disponibles.',
          ),
          const SizedBox(height: 12),
          if (vm.error != null) ...[
            ErrorBanner(message: vm.error!),
            const SizedBox(height: 12),
          ],
          _recordsSection(
            context,
            title: 'Servicios base',
            items: vm.serviceCatalog.items,
          ),
          const SizedBox(height: 16),
          _recordsSection(
            context,
            title: 'Servicios del técnico',
            items: vm.technicianServices.items,
          ),
        ],
      ),
    );
  }

  Widget _profileTab(
    BuildContext context,
    AuthContextEntity? auth,
    TenantViewModel vm,
  ) {
    return RefreshIndicator(
      onRefresh: vm.reloadCurrentProfile,
      child: ListView(
        physics: const AlwaysScrollableScrollPhysics(),
        padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
        children: [
          SectionHeader(
            title: 'Perfil',
            subtitle: 'Tus datos de acceso y el contexto del tenant actual.',
          ),
          const SizedBox(height: 12),
          SurfaceCard(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  auth?.user.fullName ?? 'Técnico',
                  style: Theme.of(context).textTheme.titleLarge,
                ),
                const SizedBox(height: 10),
                InfoRow(label: 'Correo', value: auth?.user.email ?? '-'),
                const Divider(height: 24),
                InfoRow(
                  label: 'Tipo de usuario',
                  value: tenantUserTypeLabelFromApi(auth?.userType),
                ),
                const Divider(height: 24),
                InfoRow(
                  label: 'Tenant activo',
                  value: auth?.currentTenant?.commercialName ?? '-',
                ),
                const Divider(height: 24),
                InfoRow(
                  label: 'Estado',
                  value: tenantRecordStatusLabel(
                    auth?.currentTenant?.raw ?? const <String, dynamic>{},
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 12),
          if (vm.currentProfile != null && vm.currentProfile!.isNotEmpty)
            SurfaceCard(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Perfil técnico',
                    style: Theme.of(context).textTheme.titleMedium,
                  ),
                  const SizedBox(height: 10),
                  InfoRow(
                    label: 'Nombre',
                    value:
                        '${vm.currentProfile!['first_name'] ?? '-'} ${vm.currentProfile!['last_name'] ?? ''}'
                            .trim(),
                  ),
                  const Divider(height: 24),
                  InfoRow(
                    label: 'Teléfono',
                    value: vm.currentProfile!['phone']?.toString() ?? '-',
                  ),
                  const Divider(height: 24),
                  InfoRow(
                    label: 'Avatar',
                    value: vm.currentProfile!['avatar_url']?.toString() ?? '-',
                  ),
                ],
              ),
            ),
          const SizedBox(height: 12),
          ActionCard(
            title: 'Cerrar sesión',
            subtitle: 'Salir del panel del técnico y limpiar la sesión local.',
            icon: Icons.logout_rounded,
            onTap: () async {
              await context.read<AuthViewModel>().signOut();
              if (!context.mounted) return;
              context.go('/entry');
            },
          ),
        ],
      ),
    );
  }

  Widget _recordsTab(
    BuildContext context, {
    required String title,
    required String subtitle,
    required List<Map<String, dynamic>> items,
    required Future<void> Function() onRefresh,
  }) {
    return RefreshIndicator(
      onRefresh: onRefresh,
      child: ListView(
        physics: const AlwaysScrollableScrollPhysics(),
        padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
        children: [
          SectionHeader(title: title, subtitle: subtitle),
          const SizedBox(height: 12),
          if (items.isEmpty)
            const EmptyStatePanel(
              title: 'Sin datos',
              subtitle: 'La sección todavía no tiene elementos.',
              icon: Icons.inbox_rounded,
            )
          else
            ...items
                .take(20)
                .map(
                  (item) => Padding(
                    padding: const EdgeInsets.only(bottom: 10),
                    child: SurfaceCard(
                      child: ListTile(
                        contentPadding: EdgeInsets.zero,
                        title: Text(tenantRecordPrimaryLabel(item)),
                        subtitle: Text(tenantRecordSecondaryLabel(item)),
                        trailing: StatusBadge(
                          label: tenantRecordStatusLabel(item),
                        ),
                        onTap: () => showTenantRecordDetails(
                          context,
                          title: title,
                          record: item,
                        ),
                      ),
                    ),
                  ),
                ),
        ],
      ),
    );
  }

  Widget _recordsSection(
    BuildContext context, {
    required String title,
    required List<Map<String, dynamic>> items,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SectionHeader(
          title: title,
          subtitle: 'Listado de elementos visibles para el técnico.',
        ),
        const SizedBox(height: 10),
        if (items.isEmpty)
          const EmptyStatePanel(
            title: 'Sin datos',
            subtitle: 'No hay elementos para mostrar.',
            icon: Icons.inbox_rounded,
          )
        else
          ...items
              .take(8)
              .map(
                (item) => Padding(
                  padding: const EdgeInsets.only(bottom: 10),
                  child: SurfaceCard(
                    child: ListTile(
                      contentPadding: EdgeInsets.zero,
                      title: Text(tenantRecordPrimaryLabel(item)),
                      subtitle: Text(tenantRecordSecondaryLabel(item)),
                      trailing: StatusBadge(
                        label: tenantRecordStatusLabel(item),
                      ),
                      onTap: () => showTenantRecordDetails(
                        context,
                        title: title,
                        record: item,
                      ),
                    ),
                  ),
                ),
              ),
      ],
    );
  }

  Future<void> _openAssignment(
    BuildContext context,
    TenantViewModel vm,
    Map<String, dynamic> assignment,
  ) async {
    final id = tenantAssignmentId(assignment);
    if (id.isEmpty) return;
    setState(() {
      _selectedAssignmentId = id;
      _selectedAssignment = assignment;
      _index = 2;
    });
    _controller.animateToPage(
      2,
      duration: const Duration(milliseconds: 250),
      curve: Curves.easeOut,
    );
    await vm.reloadAssignment(id);
    await vm.reloadAssignmentTrackingSession(id);
    if (!mounted) return;
    setState(() {
      _selectedAssignment = <String, dynamic>{
        ...assignment,
        'tracking_session': vm.assignmentTrackingSession,
      };
    });
  }

  Widget _hero(
    BuildContext context,
    AuthContextEntity? auth,
    TenantViewModel vm,
  ) {
    return SurfaceCard(
      padding: const EdgeInsets.all(0),
      child: Container(
        decoration: const BoxDecoration(
          color: Color(0xFFFFC107),
          borderRadius: BorderRadius.all(Radius.circular(28)),
          border: Border.fromBorderSide(
            BorderSide(color: Colors.black, width: 1.2),
          ),
        ),
        child: Padding(
          padding: const EdgeInsets.fromLTRB(18, 18, 18, 18),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                auth?.user.fullName ?? 'Técnico',
                style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  color: Colors.black,
                  fontWeight: FontWeight.w900,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                auth?.currentTenant?.commercialName ?? 'Sin tenant activo',
                style: Theme.of(
                  context,
                ).textTheme.bodyLarge?.copyWith(color: Colors.black87),
              ),
              const SizedBox(height: 12),
              Wrap(
                spacing: 10,
                runSpacing: 10,
                children: [
                  _chip(
                    context,
                    tenantUserTypeLabelFromApi(auth?.userType),
                    Icons.build_rounded,
                  ),
                  _chip(
                    context,
                    tenantRecordStatusLabel(
                      auth?.currentTenant?.raw ?? const <String, dynamic>{},
                    ),
                    Icons.bolt_rounded,
                  ),
                ],
              ),
              const SizedBox(height: 14),
              Row(
                children: [
                  Expanded(
                    child: _action(
                      context,
                      label: 'Recargar',
                      icon: Icons.refresh_rounded,
                      onTap: () => vm.refresh(),
                    ),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: _action(
                      context,
                      label: 'Tracking',
                      icon: Icons.timeline_rounded,
                      onTap: () => _goTo(2),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
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

  Widget _action(
    BuildContext context, {
    required String label,
    required IconData icon,
    required VoidCallback onTap,
  }) {
    return Material(
      color: const Color(0xFFFFF8D6),
      borderRadius: BorderRadius.circular(18),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(18),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(icon, color: Colors.black, size: 20),
              const SizedBox(width: 8),
              Text(
                label,
                style: Theme.of(context).textTheme.labelLarge?.copyWith(
                  color: Colors.black,
                  fontWeight: FontWeight.w800,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

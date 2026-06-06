import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:geolocator/geolocator.dart';
import 'package:provider/provider.dart';
import 'package:skeletonizer/skeletonizer.dart';

import '../../app/theme/app_theme.dart';
import '../../constants/env.dart';
import '../../constants/api_enums.dart';
import '../../core/services/session_storage.dart';
import '../../domain/entities/app_entities.dart';
import '../viewmodels/auth_viewmodel.dart';
import '../viewmodels/app_viewmodels.dart';
import '../widgets/app_widgets.dart';
import '../utils/api_enum_labels.dart';

class SplashPage extends StatefulWidget {
  const SplashPage({super.key});

  @override
  State<SplashPage> createState() => _SplashPageState();
}

class _SplashPageState extends State<SplashPage> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) async {
      context.read<AuthViewModel>().bootstrap();
      await Future<void>.delayed(const Duration(milliseconds: 900));
      if (!mounted) return;
      context.go('/entry');
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [
              SapphirePalette.sapphire950,
              SapphirePalette.sapphire700,
              SapphirePalette.sapphire500,
            ],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        child: Center(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 92,
                height: 92,
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.12),
                  borderRadius: BorderRadius.circular(30),
                  border: Border.all(color: Colors.white.withOpacity(0.18)),
                ),
                child: const Icon(
                  Icons.car_repair_rounded,
                  size: 46,
                  color: Colors.white,
                ),
              ),
              const SizedBox(height: 18),
              Text(
                AppEnv.appName,
                style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                  color: Colors.white,
                  fontSize: 30,
                ),
              ),
              const SizedBox(height: 6),
              Text(
                'Auxilio mecánico conectado al backend',
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: Colors.white.withOpacity(0.82),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class ShellPage extends StatelessWidget {
  const ShellPage({super.key});

  @override
  Widget build(BuildContext context) {
    final shell = context.watch<AppShellViewModel>();
    final titles = <String>['Dashboard', 'Vehículos', 'Incidentes', 'Perfil'];

    return Scaffold(
      appBar: AppBar(
        title: Text(titles[shell.selectedIndex]),
        actions: [
          IconButton(
            tooltip: 'Configuración',
            onPressed: () {
              context.push('/settings');
            },
            icon: const Icon(Icons.settings_rounded),
          ),
        ],
      ),
      body: IndexedStack(
        index: shell.selectedIndex,
        children: const [
          DashboardPage(),
          VehiclesPage(),
          IncidentsPage(),
          ProfilePage(),
        ],
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: shell.selectedIndex,
        onDestinationSelected: shell.setIndex,
        destinations: const [
          NavigationDestination(
            icon: Icon(Icons.space_dashboard_outlined),
            selectedIcon: Icon(Icons.space_dashboard_rounded),
            label: 'Inicio',
          ),
          NavigationDestination(
            icon: Icon(Icons.directions_car_outlined),
            selectedIcon: Icon(Icons.directions_car_rounded),
            label: 'Vehículos',
          ),
          NavigationDestination(
            icon: Icon(Icons.warning_amber_outlined),
            selectedIcon: Icon(Icons.warning_amber_rounded),
            label: 'Incidentes',
          ),
          NavigationDestination(
            icon: Icon(Icons.person_outline_rounded),
            selectedIcon: Icon(Icons.person_rounded),
            label: 'Perfil',
          ),
        ],
      ),
    );
  }
}

class DashboardPage extends StatefulWidget {
  const DashboardPage({super.key});

  @override
  State<DashboardPage> createState() => _DashboardPageState();
}

class _DashboardPageState extends State<DashboardPage> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<ProfileViewModel>().loadProfile();
      context.read<VehiclesViewModel>().loadVehicles();
      context.read<IncidentsViewModel>().loadIncidents();
      context.read<SessionsViewModel>().loadSessions();
    });
  }

  @override
  Widget build(BuildContext context) {
    final profileVm = context.watch<ProfileViewModel>();
    final vehiclesVm = context.watch<VehiclesViewModel>();
    final incidentsVm = context.watch<IncidentsViewModel>();
    final sessionsVm = context.watch<SessionsViewModel>();

    return RefreshIndicator(
      onRefresh: () async {
        await Future.wait([
          context.read<ProfileViewModel>().loadProfile(),
          context.read<VehiclesViewModel>().loadVehicles(),
          context.read<IncidentsViewModel>().loadIncidents(),
          context.read<SessionsViewModel>().loadSessions(),
        ]);
      },
      child: ListView(
        padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
        children: [
          SurfaceCard(
            padding: const EdgeInsets.all(20),
            child: Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(24),
                gradient: const LinearGradient(
                  colors: [
                    SapphirePalette.sapphire950,
                    SapphirePalette.sapphire700,
                    SapphirePalette.sapphire500,
                  ],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
              ),
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Centro de operaciones',
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: Colors.white.withOpacity(0.84),
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    profileVm.profile?.fullName ?? 'Cliente',
                    style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                      color: Colors.white,
                      fontSize: 28,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Atiende incidentes, vehículos y sesiones desde un único panel.',
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: Colors.white.withOpacity(0.88),
                    ),
                  ),
                  const SizedBox(height: 16),
                  Wrap(
                    spacing: 10,
                    runSpacing: 10,
                    children: [
                      _quickChip(
                        context,
                        label: 'Vehículos',
                        value:
                            vehiclesVm.vehicles?.items.length.toString() ?? '0',
                        icon: Icons.directions_car_rounded,
                      ),
                      _quickChip(
                        context,
                        label: 'Incidentes',
                        value:
                            incidentsVm.incidents?.items.length.toString() ??
                            '0',
                        icon: Icons.warning_rounded,
                      ),
                      _quickChip(
                        context,
                        label: 'Sesiones',
                        value:
                            sessionsVm.sessions?.items.length.toString() ?? '0',
                        icon: Icons.devices_rounded,
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 18),
          if (profileVm.error != null) _ErrorBanner(message: profileVm.error!),
          if (vehiclesVm.error != null)
            _ErrorBanner(message: vehiclesVm.error!),
          if (incidentsVm.error != null)
            _ErrorBanner(message: incidentsVm.error!),
          SectionHeader(
            title: 'Acciones rápidas',
            subtitle: 'Flujos frecuentes para operar sin fricción.',
          ),
          const SizedBox(height: 12),
          ActionCard(
            title: 'Crear vehículo',
            subtitle: 'Registrar una placa, marca y tipo en segundos.',
            icon: Icons.add_road_rounded,
            onTap: () => context.read<AppShellViewModel>().setIndex(1),
          ),
          const SizedBox(height: 12),
          ActionCard(
            title: 'Reportar incidente',
            subtitle: 'Abrir un auxilio con ubicación y prioridad.',
            icon: Icons.sos_rounded,
            onTap: () => context.read<AppShellViewModel>().setIndex(2),
          ),
          const SizedBox(height: 18),
          SectionHeader(
            title: 'Últimos incidentes',
            subtitle: 'Visión compacta de los reportes recientes.',
          ),
          const SizedBox(height: 12),
          if (incidentsVm.loading)
            _incidentSkeleton(context)
          else if (incidentsVm.incidents?.items.isEmpty ?? true)
            const EmptyStatePanel(
              title: 'No hay incidentes aún',
              subtitle: 'Cuando abras un auxilio aparecerá aquí.',
              icon: Icons.warning_rounded,
            )
          else
            ...incidentsVm.incidents!.items
                .take(3)
                .map(
                  (incident) => Padding(
                    padding: const EdgeInsets.only(bottom: 12),
                    child: _IncidentPreviewCard(incident: incident),
                  ),
                ),
        ],
      ),
    );
  }

  Widget _quickChip(
    BuildContext context, {
    required String label,
    required String value,
    required IconData icon,
  }) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.12),
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: Colors.white.withOpacity(0.14)),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, color: Colors.white, size: 18),
          const SizedBox(width: 8),
          Text(
            '$label: ',
            style: const TextStyle(
              color: Colors.white,
              fontWeight: FontWeight.w600,
            ),
          ),
          Text(
            value,
            style: const TextStyle(
              color: Colors.white,
              fontWeight: FontWeight.w800,
            ),
          ),
        ],
      ),
    );
  }

  Widget _incidentSkeleton(BuildContext context) {
    return Skeletonizer(
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
                  Text('Incidente de ejemplo'),
                  SizedBox(height: 8),
                  Text('Descripcion de ejemplo'),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class VehiclesPage extends StatefulWidget {
  const VehiclesPage({super.key});

  @override
  State<VehiclesPage> createState() => _VehiclesPageState();
}

class _VehiclesPageState extends State<VehiclesPage> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<VehiclesViewModel>().loadVehicles();
    });
  }

  @override
  Widget build(BuildContext context) {
    final vm = context.watch<VehiclesViewModel>();
    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
      children: [
        SectionHeader(
          title: 'Mis vehículos',
          subtitle: 'Administra placas, estado y datos de mantenimiento.',
          actionLabel: 'Nuevo',
          onAction: () {
            _showVehicleForm(context);
          },
        ),
        const SizedBox(height: 12),
        if (vm.error != null)
          _ErrorBanner(message: vm.error!)
        else if (vm.loading)
          Skeletonizer(
            enabled: true,
            child: Column(
              children: List.generate(
                4,
                (index) => Padding(
                  padding: const EdgeInsets.only(bottom: 12),
                  child: SurfaceCard(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: const [
                        Text('Placa ABC-123'),
                        SizedBox(height: 10),
                        Text('SUV - Activo'),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          )
        else if (vm.vehicles?.items.isEmpty ?? true)
          const EmptyStatePanel(
            title: 'No hay vehículos registrados',
            subtitle: 'Crea el primero para poder abrir incidentes.',
            icon: Icons.directions_car_rounded,
          )
        else
          ...vm.vehicles!.items.map(
            (vehicle) => Padding(
              padding: const EdgeInsets.only(bottom: 12),
              child: _VehicleCard(
                vehicle: vehicle,
                onTap: () {
                  context.go('/vehicles/${vehicle.id}');
                },
                onEdit: () => _showVehicleForm(context, existing: vehicle),
                onDelete: () => _confirmDeleteVehicle(context, vehicle),
              ),
            ),
          ),
      ],
    );
  }
}

class IncidentsPage extends StatefulWidget {
  const IncidentsPage({super.key});

  @override
  State<IncidentsPage> createState() => _IncidentsPageState();
}

class _IncidentsPageState extends State<IncidentsPage> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<IncidentsViewModel>().loadIncidents();
    });
  }

  @override
  Widget build(BuildContext context) {
    final vm = context.watch<IncidentsViewModel>();
    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
      children: [
        SectionHeader(
          title: 'Incidentes',
          subtitle: 'Crea, revisa y cancela reportes de auxilio.',
          actionLabel: 'Nuevo',
          onAction: () {
            _showIncidentForm(context);
          },
        ),
        const SizedBox(height: 12),
        if (vm.error != null)
          _ErrorBanner(message: vm.error!)
        else if (vm.loading)
          Skeletonizer(
            enabled: true,
            child: Column(
              children: List.generate(
                4,
                (index) => Padding(
                  padding: const EdgeInsets.only(bottom: 12),
                  child: SurfaceCard(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: const [
                        Text('Grúa solicitada'),
                        SizedBox(height: 10),
                        Text('Estado pendiente'),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          )
        else if (vm.incidents?.items.isEmpty ?? true)
          const EmptyStatePanel(
            title: 'No hay incidentes activos',
            subtitle: 'Cuando exista una emergencia se listará aquí.',
            icon: Icons.sos_rounded,
          )
        else
          ...vm.incidents!.items.map(
            (incident) => Padding(
              padding: const EdgeInsets.only(bottom: 12),
              child: _IncidentCard(
                incident: incident,
                onTap: () {
                  context.go('/incidents/${incident.id}');
                },
                onEdit: () => _showIncidentForm(context, existing: incident),
                onCancel: () => _confirmCancelIncident(context, incident),
              ),
            ),
          ),
      ],
    );
  }
}

class ProfilePage extends StatefulWidget {
  const ProfilePage({super.key});

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<ProfileViewModel>().loadProfile();
      context.read<SessionsViewModel>().loadSessions();
    });
  }

  @override
  Widget build(BuildContext context) {
    final profileVm = context.watch<ProfileViewModel>();
    final sessionsVm = context.watch<SessionsViewModel>();
    final storage = context.watch<SessionStorage>();

    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
      children: [
        SurfaceCard(
          padding: const EdgeInsets.all(18),
          child: Row(
            children: [
              CircleAvatar(
                radius: 28,
                backgroundColor: SapphirePalette.sapphire50,
                child: Text(
                  _initials(profileVm.profile?.fullName ?? 'CM'),
                  style: const TextStyle(
                    color: SapphirePalette.sapphire700,
                    fontWeight: FontWeight.w800,
                  ),
                ),
              ),
              const SizedBox(width: 14),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      profileVm.profile?.fullName ?? 'Perfil de cliente',
                      style: Theme.of(context).textTheme.titleLarge,
                    ),
                    const SizedBox(height: 4),
                    Text(
                      profileVm.profile?.email ?? 'Sin correo cargado',
                      style: Theme.of(context).textTheme.bodyMedium,
                    ),
                  ],
                ),
              ),
              IconButton(
                onPressed: () {
                  _showProfileForm(context, profileVm.profile);
                },
                icon: const Icon(Icons.edit_rounded),
              ),
            ],
          ),
        ),
        const SizedBox(height: 12),
        if (profileVm.error != null) _ErrorBanner(message: profileVm.error!),
        SectionHeader(
          title: 'Cuenta',
          subtitle: 'Datos de acceso y seguridad.',
        ),
        const SizedBox(height: 12),
        SurfaceCard(
          child: Column(
            children: [
              InfoRow(label: 'Tipo', value: profileVm.profile?.userType ?? '-'),
              const Divider(height: 24),
              InfoRow(label: 'Estado', value: profileVm.profile?.status ?? '-'),
              const Divider(height: 24),
              InfoRow(
                label: 'Verificado',
                value: profileVm.profile?.emailVerified == true ? 'Sí' : 'No',
              ),
              const Divider(height: 24),
              InfoRow(label: 'API', value: storage.apiBaseUrl),
            ],
          ),
        ),
        const SizedBox(height: 16),
        SectionHeader(
          title: 'Seguridad',
          subtitle: 'Gestiona contraseña y sesiones activas.',
        ),
        const SizedBox(height: 12),
        ActionCard(
          title: 'Cambiar contraseña',
          subtitle: 'Actualiza las credenciales de acceso.',
          icon: Icons.lock_reset_rounded,
          onTap: () {
            _showPasswordDialog(context);
          },
        ),
        const SizedBox(height: 12),
        ActionCard(
          title: 'Sesiones activas',
          subtitle:
              '${sessionsVm.sessions?.items.length ?? 0} sesiones registradas',
          icon: Icons.devices_rounded,
          onTap: () {
            context.push('/sessions');
          },
        ),
        const SizedBox(height: 12),
        if (sessionsVm.loading)
          const Center(
            child: Padding(
              padding: EdgeInsets.all(20),
              child: CircularProgressIndicator(),
            ),
          )
        else if (sessionsVm.sessions?.items.isEmpty ?? true)
          const EmptyStatePanel(
            title: 'No hay sesiones activas',
            subtitle: 'Cuando inicies sesión se mostrarán aquí.',
            icon: Icons.devices_rounded,
          )
        else
          ...sessionsVm.sessions!.items
              .take(3)
              .map(
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
                                style: Theme.of(context).textTheme.titleMedium
                                    ?.copyWith(fontWeight: FontWeight.w700),
                              ),
                            ),
                            StatusBadge(label: session.sessionStatus),
                          ],
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
                          child: const Text('Revocar'),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
        const SizedBox(height: 18),
        ElevatedButton.icon(
          onPressed: () async {
            await context.read<AuthViewModel>().signOut();
            if (!context.mounted) return;
            context.go('/entry');
          },
          icon: const Icon(Icons.logout_rounded),
          label: const Text('Cerrar sesión'),
        ),
      ],
    );
  }
}

class SettingsPage extends StatefulWidget {
  const SettingsPage({super.key});

  @override
  State<SettingsPage> createState() => _SettingsPageState();
}

class _SettingsPageState extends State<SettingsPage> {
  late final TextEditingController _baseUrlController;
  late final TextEditingController _tokenController;

  @override
  void initState() {
    super.initState();
    final storage = context.read<SessionStorage>();
    _baseUrlController = TextEditingController(text: storage.apiBaseUrl);
    _tokenController = TextEditingController(text: storage.apiToken);
  }

  @override
  void dispose() {
    _baseUrlController.dispose();
    _tokenController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final storage = context.watch<SessionStorage>();

    return Scaffold(
      appBar: AppBar(title: const Text('Configuración')),
      body: ListView(
        padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
        children: [
          SurfaceCard(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Conexión API',
                  style: Theme.of(context).textTheme.titleLarge,
                ),
                const SizedBox(height: 12),
                TextField(
                  controller: _baseUrlController,
                  decoration: const InputDecoration(
                    labelText: 'API Base URL',
                    hintText: 'http://10.0.2.2:8000',
                  ),
                ),
                const SizedBox(height: 12),
                TextField(
                  controller: _tokenController,
                  decoration: const InputDecoration(labelText: 'Bearer token'),
                  maxLines: 3,
                ),
                const SizedBox(height: 16),
                ElevatedButton(
                  onPressed: () async {
                    await storage.setApiBaseUrl(_baseUrlController.text);
                    await storage.setApiToken(_tokenController.text);
                    if (!context.mounted) return;
                    _toast(context, 'Configuración guardada');
                  },
                  child: const Text('Guardar'),
                ),
              ],
            ),
          ),
          const SizedBox(height: 12),
          SurfaceCard(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Tema', style: Theme.of(context).textTheme.titleLarge),
                const SizedBox(height: 12),
                const Text(
                  'La app usa la paleta sapphire exportada del frontend con primario #166ae9.',
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class SessionsPage extends StatefulWidget {
  const SessionsPage({super.key});

  @override
  State<SessionsPage> createState() => _SessionsPageState();
}

class _SessionsPageState extends State<SessionsPage> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<SessionsViewModel>().loadSessions();
    });
  }

  @override
  Widget build(BuildContext context) {
    final vm = context.watch<SessionsViewModel>();

    return Scaffold(
      appBar: AppBar(title: const Text('Sesiones activas')),
      body: ListView(
        padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
        children: [
          if (vm.error != null) _ErrorBanner(message: vm.error!),
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

class VehicleDetailPage extends StatefulWidget {
  const VehicleDetailPage({super.key, required this.vehicleId});

  final String vehicleId;

  @override
  State<VehicleDetailPage> createState() => _VehicleDetailPageState();
}

class _VehicleDetailPageState extends State<VehicleDetailPage> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<VehiclesViewModel>().loadVehicle(widget.vehicleId);
    });
  }

  @override
  Widget build(BuildContext context) {
    final vm = context.watch<VehiclesViewModel>();
    final vehicle = vm.selectedVehicle?.vehicle;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Detalle del vehículo'),
        actions: [
          IconButton(
            onPressed: vehicle == null
                ? null
                : () {
                    _showVehicleForm(context, existing: vehicle);
                  },
            icon: const Icon(Icons.edit_rounded),
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
        child: vm.detailLoading
            ? const Center(child: CircularProgressIndicator())
            : vm.error != null
            ? _ErrorBanner(message: vm.error!)
            : vehicle == null
            ? const EmptyStatePanel(
                title: 'Vehículo no encontrado',
                subtitle: 'Regresa al listado para cargar otro registro.',
                icon: Icons.directions_car_rounded,
              )
            : ListView(
                children: [
                  SurfaceCard(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Expanded(
                              child: Text(
                                vehicle.plateNumber,
                                style: Theme.of(context)
                                    .textTheme
                                    .headlineMedium
                                    ?.copyWith(fontSize: 24),
                              ),
                            ),
                            StatusBadge(label: vehicleStatusLabelFromApi(vehicle.status)),
                          ],
                        ),
                        const SizedBox(height: 10),
                        Text(
                          '${vehicleTypeLabelFromApi(vehicle.vehicleType)} - ${vehicle.brand ?? 'Sin marca'}',
                          style: Theme.of(context).textTheme.bodyLarge,
                        ),
                        const SizedBox(height: 18),
                        InfoRow(label: 'Modelo', value: vehicle.model ?? '-'),
                        const Divider(height: 24),
                        InfoRow(
                          label: 'Año',
                          value: vehicle.year?.toString() ?? '-',
                        ),
                        const Divider(height: 24),
                        InfoRow(label: 'Color', value: vehicle.color ?? '-'),
                        const Divider(height: 24),
                        InfoRow(
                          label: 'Creado',
                          value: _formatDate(vehicle.createdAt),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 12),
                  SurfaceCard(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Cliente asociado',
                          style: Theme.of(context).textTheme.titleLarge,
                        ),
                        const SizedBox(height: 10),
                        Text(
                          _customerName(vm.selectedVehicle?.customer),
                          style: Theme.of(context).textTheme.bodyLarge,
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 12),
                  ElevatedButton.icon(
                    onPressed: () async {
                      final ok = await context.read<VehiclesViewModel>().remove(
                        widget.vehicleId,
                      );
                      if (!context.mounted) return;
                      if (ok) {
                        context.pop();
                      }
                    },
                    icon: const Icon(Icons.delete_rounded),
                    label: const Text('Eliminar vehículo'),
                  ),
                ],
              ),
      ),
    );
  }
}

class IncidentDetailPage extends StatefulWidget {
  const IncidentDetailPage({super.key, required this.incidentId});

  final String incidentId;

  @override
  State<IncidentDetailPage> createState() => _IncidentDetailPageState();
}

class _IncidentDetailPageState extends State<IncidentDetailPage> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<IncidentsViewModel>().loadIncident(widget.incidentId);
    });
  }

  @override
  Widget build(BuildContext context) {
    final vm = context.watch<IncidentsViewModel>();
    final incident = vm.selectedIncident;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Detalle del incidente'),
        actions: [
          IconButton(
            onPressed: incident == null
                ? null
                : () {
                    _showIncidentForm(context, existing: incident);
                  },
            icon: const Icon(Icons.edit_rounded),
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
        child: vm.detailLoading
            ? const Center(child: CircularProgressIndicator())
            : vm.error != null
            ? _ErrorBanner(message: vm.error!)
            : incident == null
            ? const EmptyStatePanel(
                title: 'Incidente no encontrado',
                subtitle: 'Regresa al listado para cargar otro registro.',
                icon: Icons.sos_rounded,
              )
            : ListView(
                children: [
                  SurfaceCard(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Expanded(
                              child: Text(
                                incident.title,
                                style: Theme.of(context)
                                    .textTheme
                                    .headlineMedium
                                    ?.copyWith(fontSize: 24),
                              ),
                            ),
                  StatusBadge(label: incidentStatusLabelFromApi(incident.status)),
                          ],
                        ),
                        const SizedBox(height: 10),
                        Text(
                          incident.incidentCode,
                          style: Theme.of(context).textTheme.bodyMedium,
                        ),
                        const SizedBox(height: 18),
                        InfoRow(label: 'Vehículo', value: incident.vehicleId),
                        const Divider(height: 24),
                        InfoRow(label: 'Prioridad', value: incident.priority),
                        const Divider(height: 24),
                        InfoRow(
                          label: 'Ubicación',
                          value: '${incident.latitude}, ${incident.longitude}',
                        ),
                        const Divider(height: 24),
                        InfoRow(
                          label: 'Reportado',
                          value: _formatDate(incident.reportedAt),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 12),
                  if (incident.addressText != null)
                    SurfaceCard(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Dirección',
                            style: Theme.of(context).textTheme.titleLarge,
                          ),
                          const SizedBox(height: 10),
                          Text(
                            incident.addressText!,
                            style: Theme.of(context).textTheme.bodyLarge,
                          ),
                        ],
                      ),
                    ),
                  if (incident.description != null) ...[
                    const SizedBox(height: 12),
                    SurfaceCard(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Descripción',
                            style: Theme.of(context).textTheme.titleLarge,
                          ),
                          const SizedBox(height: 10),
                          Text(
                            incident.description!,
                            style: Theme.of(context).textTheme.bodyLarge,
                          ),
                        ],
                      ),
                    ),
                  ],
                  const SizedBox(height: 12),
                  ElevatedButton.icon(
                    onPressed: () async {
                      final ok = await context
                          .read<IncidentsViewModel>()
                          .cancel(
                            widget.incidentId,
                            const IncidentCancelInput(),
                          );
                      if (!context.mounted) return;
                      if (ok) {
                        context.pop();
                      }
                    },
                    icon: const Icon(Icons.cancel_rounded),
                    label: const Text('Cancelar incidente'),
                  ),
                ],
              ),
      ),
    );
  }
}

class _VehicleCard extends StatelessWidget {
  const _VehicleCard({
    required this.vehicle,
    required this.onTap,
    required this.onEdit,
    required this.onDelete,
  });

  final VehicleEntity vehicle;
  final VoidCallback onTap;
  final VoidCallback onEdit;
  final VoidCallback onDelete;

  @override
  Widget build(BuildContext context) {
    return SurfaceCard(
      child: InkWell(
        onTap: onTap,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Expanded(
                  child: Text(
                    vehicle.plateNumber,
                    style: Theme.of(context).textTheme.titleLarge,
                  ),
                ),
                StatusBadge(label: vehicleStatusLabelFromApi(vehicle.status)),
              ],
            ),
            const SizedBox(height: 8),
            Text(
              '${vehicleTypeLabelFromApi(vehicle.vehicleType)} • ${vehicle.brand ?? 'Sin marca'}',
              style: Theme.of(context).textTheme.bodyMedium,
            ),
            const SizedBox(height: 12),
            Text(
              '${vehicle.model ?? '-'} • ${vehicle.color ?? '-'}',
              style: Theme.of(context).textTheme.bodyMedium,
            ),
            const SizedBox(height: 14),
            Row(
              children: [
                TextButton(onPressed: onEdit, child: const Text('Editar')),
                const SizedBox(width: 8),
                TextButton(onPressed: onDelete, child: const Text('Eliminar')),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class _IncidentCard extends StatelessWidget {
  const _IncidentCard({
    required this.incident,
    required this.onTap,
    required this.onEdit,
    required this.onCancel,
  });

  final IncidentEntity incident;
  final VoidCallback onTap;
  final VoidCallback onEdit;
  final VoidCallback onCancel;

  @override
  Widget build(BuildContext context) {
    return SurfaceCard(
      child: InkWell(
        onTap: onTap,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Expanded(
                  child: Text(
                    incident.title,
                    style: Theme.of(context).textTheme.titleLarge,
                  ),
                ),
                StatusBadge(label: incidentStatusLabelFromApi(incident.status)),
              ],
            ),
            const SizedBox(height: 8),
            Text(
              incident.incidentCode,
              style: Theme.of(context).textTheme.bodyMedium,
            ),
            const SizedBox(height: 8),
            Text(
              'Prioridad: ${incidentPriorityLabelFromApi(incident.priority)}',
              style: Theme.of(context).textTheme.bodyMedium,
            ),
            const SizedBox(height: 14),
            Row(
              children: [
                TextButton(onPressed: onEdit, child: const Text('Editar')),
                const SizedBox(width: 8),
                TextButton(onPressed: onCancel, child: const Text('Cancelar')),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class _IncidentPreviewCard extends StatelessWidget {
  const _IncidentPreviewCard({required this.incident});

  final IncidentEntity incident;

  @override
  Widget build(BuildContext context) {
    return SurfaceCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Expanded(
                child: Text(
                  incident.title,
                  style: Theme.of(context).textTheme.titleLarge,
                ),
              ),
              StatusBadge(label: incidentStatusLabelFromApi(incident.status)),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            incident.incidentCode,
            style: Theme.of(context).textTheme.bodyMedium,
          ),
        ],
      ),
    );
  }
}

class _ErrorBanner extends StatelessWidget {
  const _ErrorBanner({required this.message});

  final String message;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.red.withOpacity(0.08),
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: Colors.red.withOpacity(0.18)),
      ),
      child: Text(
        message,
        style: const TextStyle(color: Colors.red, fontWeight: FontWeight.w600),
      ),
    );
  }
}

Future<void> _showVehicleForm(
  BuildContext context, {
  VehicleEntity? existing,
}) async {
  final formKey = GlobalKey<FormState>();
  final plateController = TextEditingController(
    text: existing?.plateNumber ?? '',
  );
  final brandController = TextEditingController(text: existing?.brand ?? '');
  final modelController = TextEditingController(text: existing?.model ?? '');
  final yearController = TextEditingController(
    text: existing?.year?.toString() ?? '',
  );
  final colorController = TextEditingController(text: existing?.color ?? '');
  var selectedVehicleType =
      _vehicleTypeFromApi(existing?.vehicleType) ?? VehicleType.car;
  var selectedVehicleStatus =
      _vehicleStatusFromApi(existing?.status) ?? VehicleStatus.active;

  final saved = await showDialog<bool>(
    context: context,
    builder: (dialogContext) {
      return AlertDialog(
        title: Text(existing == null ? 'Nuevo vehículo' : 'Editar vehículo'),
        content: SizedBox(
          width: 500,
          child: SingleChildScrollView(
            child: Form(
              key: formKey,
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  TextFormField(
                    controller: plateController,
                    decoration: const InputDecoration(labelText: 'Placa'),
                    validator: (value) => value == null || value.trim().isEmpty
                        ? 'Requerido'
                        : null,
                  ),
                  const SizedBox(height: 10),
                  DropdownButtonFormField<VehicleType>(
                    value: selectedVehicleType,
                    decoration: const InputDecoration(labelText: 'Tipo'),
                    items: vehicleTypeOptions
                        .map(
                          (item) => DropdownMenuItem<VehicleType>(
                            value: item,
                            child: Text(item.label),
                          ),
                        )
                        .toList(),
                    onChanged: (value) {
                      if (value != null) selectedVehicleType = value;
                    },
                    validator: (value) => value == null ? 'Requerido' : null,
                  ),
                  const SizedBox(height: 10),
                  TextFormField(
                    controller: brandController,
                    decoration: const InputDecoration(labelText: 'Marca'),
                  ),
                  const SizedBox(height: 10),
                  TextFormField(
                    controller: modelController,
                    decoration: const InputDecoration(labelText: 'Modelo'),
                  ),
                  const SizedBox(height: 10),
                  TextFormField(
                    controller: yearController,
                    decoration: const InputDecoration(labelText: 'Año'),
                    keyboardType: TextInputType.number,
                  ),
                  const SizedBox(height: 10),
                  TextFormField(
                    controller: colorController,
                    decoration: const InputDecoration(labelText: 'Color'),
                  ),
                  const SizedBox(height: 10),
                  DropdownButtonFormField<VehicleStatus>(
                    value: selectedVehicleStatus,
                    decoration: const InputDecoration(labelText: 'Estado'),
                    items: vehicleStatusOptions
                        .map(
                          (item) => DropdownMenuItem<VehicleStatus>(
                            value: item,
                            child: Text(item.label),
                          ),
                        )
                        .toList(),
                    onChanged: (value) {
                      if (value != null) selectedVehicleStatus = value;
                    },
                  ),
                ],
              ),
            ),
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(dialogContext).pop(false),
            child: const Text('Cancelar'),
          ),
          ElevatedButton(
            onPressed: () async {
              if (!formKey.currentState!.validate()) return;
              final input = VehicleUpsertInput(
                plateNumber: plateController.text.trim(),
                vehicleType: selectedVehicleType.apiValue,
                brand: brandController.text.trim().isEmpty
                    ? null
                    : brandController.text.trim(),
                model: modelController.text.trim().isEmpty
                    ? null
                    : modelController.text.trim(),
                year: int.tryParse(yearController.text.trim()),
                color: colorController.text.trim().isEmpty
                    ? null
                    : colorController.text.trim(),
              );
              final vm = context.read<VehiclesViewModel>();
              final ok = existing == null
                  ? await vm.create(input)
                  : await vm.update(existing.id, input);
              if (!dialogContext.mounted) return;
              if (ok &&
                  existing != null &&
                  selectedVehicleStatus.apiValue != existing.status) {
                await vm.changeStatus(
                  existing.id,
                  VehicleStatusChangeInput(
                    status: selectedVehicleStatus.apiValue,
                  ),
                );
              }
              Navigator.of(dialogContext).pop(ok);
            },
            child: const Text('Guardar'),
          ),
        ],
      );
    },
  );

  if (saved == true && context.mounted) {
    _toast(
      context,
      existing == null ? 'Vehículo creado' : 'Vehículo actualizado',
    );
  }
}

Future<void> _confirmDeleteVehicle(
  BuildContext context,
  VehicleEntity vehicle,
) async {
  final ok = await showDialog<bool>(
    context: context,
    builder: (dialogContext) => AlertDialog(
      title: const Text('Eliminar vehículo'),
      content: Text('¿Eliminar ${vehicle.plateNumber}?'),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(dialogContext).pop(false),
          child: const Text('Cancelar'),
        ),
        ElevatedButton(
          onPressed: () => Navigator.of(dialogContext).pop(true),
          child: const Text('Eliminar'),
        ),
      ],
    ),
  );

  if (ok == true && context.mounted) {
    final removed = await context.read<VehiclesViewModel>().remove(vehicle.id);
    if (context.mounted) {
      _toast(context, removed ? 'Vehículo eliminado' : 'No se pudo eliminar');
    }
  }
}

Future<void> _showIncidentForm(
  BuildContext context, {
  IncidentEntity? existing,
}) async {
  final formKey = GlobalKey<FormState>();
  final vehicleController = TextEditingController(
    text: existing?.vehicleId ?? '',
  );
  final titleController = TextEditingController(text: existing?.title ?? '');
  final descriptionController = TextEditingController(
    text: existing?.description ?? '',
  );
  final addressController = TextEditingController(
    text: existing?.addressText ?? '',
  );
  final latController = TextEditingController(
    text: existing?.latitude.toString() ?? '',
  );
  final lngController = TextEditingController(
    text: existing?.longitude.toString() ?? '',
  );
  final serviceCatalogController = TextEditingController(
    text: existing?.serviceCatalogId ?? '',
  );
  var selectedPriority =
      _incidentPriorityFromApi(existing?.priority) ?? IncidentPriority.medium;

  final saved = await showDialog<bool>(
    context: context,
    builder: (dialogContext) {
      return AlertDialog(
        title: Text(existing == null ? 'Nuevo incidente' : 'Editar incidente'),
        content: SizedBox(
          width: 500,
          child: SingleChildScrollView(
            child: Form(
              key: formKey,
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  TextFormField(
                    controller: vehicleController,
                    decoration: const InputDecoration(labelText: 'Vehicle ID'),
                    validator: (value) => value == null || value.trim().isEmpty
                        ? 'Requerido'
                        : null,
                  ),
                  const SizedBox(height: 10),
                  TextFormField(
                    controller: titleController,
                    decoration: const InputDecoration(labelText: 'Título'),
                    validator: (value) => value == null || value.trim().isEmpty
                        ? 'Requerido'
                        : null,
                  ),
                  const SizedBox(height: 10),
                  TextFormField(
                    controller: descriptionController,
                    decoration: const InputDecoration(labelText: 'Descripción'),
                    maxLines: 2,
                  ),
                  const SizedBox(height: 10),
                  TextFormField(
                    controller: addressController,
                    decoration: const InputDecoration(labelText: 'Dirección'),
                  ),
                  const SizedBox(height: 10),
                  DropdownButtonFormField<IncidentPriority>(
                    value: selectedPriority,
                    decoration: const InputDecoration(labelText: 'Prioridad'),
                    items: incidentPriorityOptions
                        .map(
                          (item) => DropdownMenuItem<IncidentPriority>(
                            value: item,
                            child: Text(item.label),
                          ),
                        )
                        .toList(),
                    onChanged: (value) {
                      if (value != null) selectedPriority = value;
                    },
                  ),
                  const SizedBox(height: 10),
                  TextFormField(
                    controller: latController,
                    decoration: const InputDecoration(labelText: 'Latitud'),
                    keyboardType: const TextInputType.numberWithOptions(
                      decimal: true,
                    ),
                  ),
                  const SizedBox(height: 10),
                  TextFormField(
                    controller: lngController,
                    decoration: const InputDecoration(labelText: 'Longitud'),
                    keyboardType: const TextInputType.numberWithOptions(
                      decimal: true,
                    ),
                  ),
                  const SizedBox(height: 10),
                  TextFormField(
                    controller: serviceCatalogController,
                    decoration: const InputDecoration(
                      labelText: 'Service Catalog ID',
                    ),
                  ),
                  const SizedBox(height: 12),
                  OutlinedButton.icon(
                    onPressed: () async {
                      final position = await _useCurrentLocation();
                      if (position == null) return;
                      latController.text = position.latitude.toStringAsFixed(6);
                      lngController.text = position.longitude.toStringAsFixed(
                        6,
                      );
                    },
                    icon: const Icon(Icons.my_location_rounded),
                    label: const Text('Usar GPS'),
                  ),
                ],
              ),
            ),
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(dialogContext).pop(false),
            child: const Text('Cancelar'),
          ),
          ElevatedButton(
            onPressed: () async {
              if (!formKey.currentState!.validate()) return;
              final latitude = double.tryParse(latController.text.trim()) ?? 0;
              final longitude = double.tryParse(lngController.text.trim()) ?? 0;
              final input = IncidentUpsertInput(
                vehicleId: vehicleController.text.trim(),
                serviceCatalogId: serviceCatalogController.text.trim().isEmpty
                    ? null
                    : serviceCatalogController.text.trim(),
                title: titleController.text.trim(),
                description: descriptionController.text.trim().isEmpty
                    ? null
                    : descriptionController.text.trim(),
                latitude: latitude,
                longitude: longitude,
                addressText: addressController.text.trim().isEmpty
                    ? null
                    : addressController.text.trim(),
                priority: selectedPriority.apiValue,
              );
              final vm = context.read<IncidentsViewModel>();
              final ok = existing == null
                  ? await vm.create(input)
                  : await vm.update(existing.id, input);
              if (!dialogContext.mounted) return;
              Navigator.of(dialogContext).pop(ok);
            },
            child: const Text('Guardar'),
          ),
        ],
      );
    },
  );

  if (saved == true && context.mounted) {
    _toast(
      context,
      existing == null ? 'Incidente creado' : 'Incidente actualizado',
    );
  }
}

Future<void> _confirmCancelIncident(
  BuildContext context,
  IncidentEntity incident,
) async {
  final ok = await showDialog<bool>(
    context: context,
    builder: (dialogContext) => AlertDialog(
      title: const Text('Cancelar incidente'),
      content: Text('¿Cancelar ${incident.title}?'),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(dialogContext).pop(false),
          child: const Text('No'),
        ),
        ElevatedButton(
          onPressed: () => Navigator.of(dialogContext).pop(true),
          child: const Text('Sí, cancelar'),
        ),
      ],
    ),
  );

  if (ok == true && context.mounted) {
    final cancelled = await context.read<IncidentsViewModel>().cancel(
      incident.id,
      const IncidentCancelInput(),
    );
    if (context.mounted) {
      _toast(
        context,
        cancelled ? 'Incidente cancelado' : 'No se pudo cancelar',
      );
    }
  }
}

Future<void> _showProfileForm(
  BuildContext context,
  ClientEntity? current,
) async {
  final formKey = GlobalKey<FormState>();
  final firstName = TextEditingController(text: current?.firstName ?? '');
  final lastName = TextEditingController(text: current?.lastName ?? '');
  final phone = TextEditingController(text: current?.phone ?? '');
  final avatar = TextEditingController(text: current?.avatarUrl ?? '');

  final ok = await showDialog<bool>(
    context: context,
    builder: (dialogContext) => AlertDialog(
      title: const Text('Editar perfil'),
      content: SizedBox(
        width: 480,
        child: SingleChildScrollView(
          child: Form(
            key: formKey,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextFormField(
                  controller: firstName,
                  decoration: const InputDecoration(labelText: 'Nombre'),
                ),
                const SizedBox(height: 10),
                TextFormField(
                  controller: lastName,
                  decoration: const InputDecoration(labelText: 'Apellido'),
                ),
                const SizedBox(height: 10),
                TextFormField(
                  controller: phone,
                  decoration: const InputDecoration(labelText: 'Teléfono'),
                ),
                const SizedBox(height: 10),
                TextFormField(
                  controller: avatar,
                  decoration: const InputDecoration(labelText: 'Avatar URL'),
                ),
              ],
            ),
          ),
        ),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(dialogContext).pop(false),
          child: const Text('Cancelar'),
        ),
        ElevatedButton(
          onPressed: () async {
            final updated = await context
                .read<ProfileViewModel>()
                .updateProfile(
                  ClientUpdateInput(
                    firstName: firstName.text.trim().isEmpty
                        ? null
                        : firstName.text.trim(),
                    lastName: lastName.text.trim().isEmpty
                        ? null
                        : lastName.text.trim(),
                    phone: phone.text.trim().isEmpty ? null : phone.text.trim(),
                    avatarUrl: avatar.text.trim().isEmpty
                        ? null
                        : avatar.text.trim(),
                  ),
                );
            if (!dialogContext.mounted) return;
            Navigator.of(dialogContext).pop(updated);
          },
          child: const Text('Guardar'),
        ),
      ],
    ),
  );

  if (ok == true && context.mounted) {
    _toast(context, 'Perfil actualizado');
  }
}

Future<void> _showPasswordDialog(BuildContext context) async {
  final formKey = GlobalKey<FormState>();
  final currentPassword = TextEditingController();
  final newPassword = TextEditingController();

  final ok = await showDialog<bool>(
    context: context,
    builder: (dialogContext) => AlertDialog(
      title: const Text('Cambiar contraseña'),
      content: SizedBox(
        width: 480,
        child: SingleChildScrollView(
          child: Form(
            key: formKey,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextFormField(
                  controller: currentPassword,
                  decoration: const InputDecoration(
                    labelText: 'Contraseña actual',
                  ),
                  obscureText: true,
                ),
                const SizedBox(height: 10),
                TextFormField(
                  controller: newPassword,
                  decoration: const InputDecoration(
                    labelText: 'Nueva contraseña',
                  ),
                  obscureText: true,
                ),
              ],
            ),
          ),
        ),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(dialogContext).pop(false),
          child: const Text('Cancelar'),
        ),
        ElevatedButton(
          onPressed: () async {
            final changed = await context
                .read<ProfileViewModel>()
                .updatePassword(
                  PasswordChangeInput(
                    currentPassword: currentPassword.text,
                    newPassword: newPassword.text,
                  ),
                );
            if (!dialogContext.mounted) return;
            Navigator.of(dialogContext).pop(changed);
          },
          child: const Text('Cambiar'),
        ),
      ],
    ),
  );

  if (ok == true && context.mounted) {
    _toast(context, 'Contraseña actualizada');
  }
}

Future<Position?> _useCurrentLocation() async {
  final serviceEnabled = await Geolocator.isLocationServiceEnabled();
  if (!serviceEnabled) return null;

  var permission = await Geolocator.checkPermission();
  if (permission == LocationPermission.denied) {
    permission = await Geolocator.requestPermission();
  }
  if (permission == LocationPermission.denied ||
      permission == LocationPermission.deniedForever) {
    return null;
  }

  return Geolocator.getCurrentPosition(desiredAccuracy: LocationAccuracy.high);
}

String _initials(String value) {
  final parts = value.trim().split(RegExp(r'\s+'));
  if (parts.isEmpty) return 'CM';
  if (parts.length == 1) {
    return parts.first.isEmpty
        ? 'CM'
        : parts.first.substring(0, 1).toUpperCase();
  }
  return ('${parts.first[0]}${parts[1][0]}').toUpperCase();
}

String _customerName(Map<String, dynamic>? customer) {
  if (customer == null || customer.isEmpty) return 'Cliente asociado';
  final user = customer['user'];
  if (user is Map) {
    final map = Map<String, dynamic>.from(user);
    final firstName = map['first_name']?.toString() ?? '';
    final lastName = map['last_name']?.toString() ?? '';
    final full = '$firstName $lastName'.trim();
    if (full.isNotEmpty) return full;
    if (map['email'] != null) return map['email'].toString();
  }
  return 'Cliente asociado';
}

String _formatDate(DateTime? value) {
  if (value == null) return '-';
  return '${value.year.toString().padLeft(4, '0')}-${value.month.toString().padLeft(2, '0')}-${value.day.toString().padLeft(2, '0')}';
}

VehicleType? _vehicleTypeFromApi(String? value) {
  switch ((value ?? '').toUpperCase()) {
    case 'CAR':
      return VehicleType.car;
    case 'MOTORCYCLE':
      return VehicleType.motorcycle;
    case 'TRUCK':
      return VehicleType.truck;
    case 'VAN':
      return VehicleType.van;
    case 'SUV':
      return VehicleType.suv;
    case 'OTHER':
      return VehicleType.other;
    default:
      return null;
  }
}

VehicleStatus? _vehicleStatusFromApi(String? value) {
  switch ((value ?? '').toUpperCase()) {
    case 'ACTIVE':
      return VehicleStatus.active;
    case 'INACTIVE':
      return VehicleStatus.inactive;
    default:
      return null;
  }
}

IncidentPriority? _incidentPriorityFromApi(String? value) {
  switch ((value ?? '').toUpperCase()) {
    case 'LOW':
      return IncidentPriority.low;
    case 'MEDIUM':
      return IncidentPriority.medium;
    case 'HIGH':
      return IncidentPriority.high;
    case 'CRITICAL':
      return IncidentPriority.critical;
    default:
      return null;
  }
}

void _toast(BuildContext context, String message) {
  ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(message)));
}

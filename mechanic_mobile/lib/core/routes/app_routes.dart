import 'package:go_router/go_router.dart';

import '../../domain/entities/auth_entities.dart';
import '../../presentation/pages/auth_pages.dart';
import '../../presentation/pages/app_pages.dart';

final appRouter = GoRouter(
  initialLocation: '/splash',
  routes: <RouteBase>[
    GoRoute(path: '/splash', builder: (context, state) => const SplashPage()),
    GoRoute(path: '/entry', builder: (context, state) => const EntryPage()),
    GoRoute(
      path: '/auth/:role',
      builder: (context, state) {
        final role = state.pathParameters['role'] ?? 'client';
        return AuthPage(role: _roleFromPath(role));
      },
    ),
    GoRoute(path: '/home', builder: (context, state) => const ShellPage()),
    GoRoute(
      path: '/tenant-home',
      builder: (context, state) => const TenantHomePage(),
    ),
    GoRoute(
      path: '/select-tenants',
      builder: (context, state) => const TenantHubPage(),
    ),
    GoRoute(
      path: '/tenant-hub',
      builder: (context, state) => const TenantHubPage(),
    ),
    GoRoute(
      path: '/settings',
      builder: (context, state) => const SettingsPage(),
    ),
    GoRoute(
      path: '/notifications',
      builder: (context, state) => const NotificationsPage(),
    ),
    GoRoute(
      path: '/sessions',
      builder: (context, state) => const SessionsPage(),
    ),
    GoRoute(
      path: '/tenant-sessions',
      builder: (context, state) => const TenantSessionsPage(),
    ),
    GoRoute(
      path: '/vehicles/:id',
      builder: (context, state) =>
          VehicleDetailPage(vehicleId: state.pathParameters['id']!),
    ),
    GoRoute(
      path: '/incidents/:id',
      builder: (context, state) =>
          IncidentDetailPage(incidentId: state.pathParameters['id']!),
    ),
  ],
);

AppEntryRole _roleFromPath(String role) {
  switch (role.toLowerCase()) {
    case 'workshop':
      return AppEntryRole.workshop;
    case 'mechanic':
      return AppEntryRole.mechanic;
    case 'client':
    default:
      return AppEntryRole.client;
  }
}

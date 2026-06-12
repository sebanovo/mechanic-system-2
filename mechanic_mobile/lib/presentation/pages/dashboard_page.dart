import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../../app/theme/app_theme.dart';
import '../viewmodels/app_viewmodels.dart';
import '../widgets/app_widgets.dart';

class DashboardPage extends StatelessWidget {
  const DashboardPage({super.key});

  @override
  Widget build(BuildContext context) {
    final shellVm = context.read<AppShellViewModel>();

    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 14, 16, 24),
      children: [
        _buildHeroPanel(
          context: context,
          activeSection: _sectionLabel(shellVm.selectedIndex),
          onVehiclesTap: () => shellVm.setIndex(1),
          onIncidentsTap: () => shellVm.setIndex(2),
        ),
        const SizedBox(height: 18),
        SectionHeader(
          title: 'Accesos rápidos',
          subtitle: 'Atajos para moverte sin perder tiempo.',
        ),
        const SizedBox(height: 12),
        ActionCard(
          title: 'Vehículos',
          subtitle: 'Revisar flota, estado y detalle de cada unidad.',
          icon: Icons.directions_car_rounded,
          onTap: () => shellVm.setIndex(1),
        ),
        const SizedBox(height: 12),
        ActionCard(
          title: 'Incidentes',
          subtitle: 'Ver solicitudes activas, historial y seguimiento.',
          icon: Icons.local_taxi_rounded,
          onTap: () => shellVm.setIndex(2),
        ),
        const SizedBox(height: 12),
        ActionCard(
          title: 'Asignaciones',
          subtitle: 'Controlar seguimiento, sesión de tracking y eventos.',
          icon: Icons.assignment_turned_in_rounded,
          onTap: () => shellVm.setIndex(3),
        ),
        const SizedBox(height: 12),
        ActionCard(
          title: 'Perfil',
          subtitle: 'Datos personales, configuración y seguridad.',
          icon: Icons.person_rounded,
          onTap: () => shellVm.setIndex(5),
        ),
        const SizedBox(height: 12),
        ActionCard(
          title: 'Sesiones',
          subtitle: 'Revisar accesos activos y cerrar sesiones remotas.',
          icon: Icons.devices_other_rounded,
          onTap: () => context.push('/sessions'),
        ),
        const SizedBox(height: 12),
        ActionCard(
          title: 'Configuración',
          subtitle: 'Ajustes de cuenta, soporte y preferencias.',
          icon: Icons.settings_rounded,
          onTap: () => context.push('/settings'),
        ),
        const SizedBox(height: 18),
        SurfaceCard(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Flujo recomendado',
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  color: SapphirePalette.sapphire950,
                  fontWeight: FontWeight.w800,
                ),
              ),
              const SizedBox(height: 10),
              Text(
                'Empieza por vehículos, continúa con incidentes y termina en perfil o sesiones si necesitas revisar tu cuenta.',
                style: Theme.of(context).textTheme.bodyMedium,
              ),
              const SizedBox(height: 14),
              Row(
                children: [
                  Expanded(
                    child: _compactAction(
                      context: context,
                      label: 'Vehículos',
                      onTap: () => shellVm.setIndex(1),
                    ),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: _compactAction(
                      context: context,
                      label: 'Incidentes',
                      onTap: () => shellVm.setIndex(2),
                    ),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: _compactAction(
                      context: context,
                      label: 'Asignaciones',
                      onTap: () => shellVm.setIndex(3),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ],
    );
  }
}

String _sectionLabel(int index) {
  switch (index) {
    case 1:
      return 'Vehículos';
    case 2:
      return 'Incidentes';
    case 3:
      return 'Asignaciones';
    case 4:
      return 'Notificaciones';
    case 5:
      return 'Perfil';
    default:
      return 'Inicio';
  }
}

Widget _buildHeroPanel({
  required BuildContext context,
  required String activeSection,
  required VoidCallback onVehiclesTap,
  required VoidCallback onIncidentsTap,
}) {
  return Container(
    decoration: BoxDecoration(
      color: const Color(0xFFFFC107),
      borderRadius: BorderRadius.circular(30),
      border: Border.all(color: Colors.black, width: 1.4),
      boxShadow: const [
        BoxShadow(
          color: Color(0xFF111111),
          blurRadius: 0,
          offset: Offset(6, 6),
        ),
      ],
    ),
    child: Stack(
      children: [
        Positioned(
          right: -24,
          top: -18,
          child: _accentCircle(size: 120, opacity: 0.12),
        ),
        Positioned(
          right: 28,
          bottom: -30,
          child: _accentCircle(size: 84, opacity: 0.08),
        ),
        Padding(
          padding: const EdgeInsets.fromLTRB(20, 22, 20, 20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Container(
                    width: 12,
                    height: 12,
                    decoration: BoxDecoration(
                      color: Colors.black,
                      borderRadius: BorderRadius.circular(100),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Text(
                    'Panel de auxilio',
                    style: Theme.of(context).textTheme.labelLarge?.copyWith(
                      color: Colors.black87,
                      letterSpacing: 0.4,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 14),
              Text(
                'Todo lo importante en un solo lugar',
                style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                  color: Colors.black,
                  fontWeight: FontWeight.w900,
                  height: 1.05,
                ),
              ),
              const SizedBox(height: 10),
              Text(
                'Accede rápido a tu sección activa, revisa el estado de la operación y vuelve a los módulos clave sin perder el flujo.',
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: Colors.black87,
                  height: 1.45,
                ),
              ),
              const SizedBox(height: 18),
              Wrap(
                spacing: 10,
                runSpacing: 10,
                children: [
                  _heroChip(
                    context: context,
                    label: 'Sección: $activeSection',
                    icon: Icons.layers_rounded,
                  ),
                  _heroChip(
                    context: context,
                    label: 'UX Sapphire',
                    icon: Icons.palette_rounded,
                  ),
                ],
              ),
              const SizedBox(height: 18),
              Row(
                children: [
                  Expanded(
                    child: _heroButton(
                      context: context,
                      label: 'Vehículos',
                      icon: Icons.directions_car_rounded,
                      onTap: onVehiclesTap,
                    ),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: _heroButton(
                      context: context,
                      label: 'Incidentes',
                      icon: Icons.local_taxi_rounded,
                      onTap: onIncidentsTap,
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ],
    ),
  );
}

Widget _heroChip({
  required BuildContext context,
  required String label,
  required IconData icon,
}) {
  return Container(
    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
    decoration: BoxDecoration(
      color: Colors.black,
      borderRadius: BorderRadius.circular(999),
      border: Border.all(color: Colors.black, width: 1),
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
            fontWeight: FontWeight.w700,
          ),
        ),
      ],
    ),
  );
}

Widget _heroButton({
  required BuildContext context,
  required String label,
  required IconData icon,
  required VoidCallback onTap,
}) {
  return Material(
    color: Colors.black,
    borderRadius: BorderRadius.circular(18),
    child: InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(18),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, color: const Color(0xFFFFC107), size: 20),
            const SizedBox(width: 8),
            Flexible(
              child: Text(
                label,
                overflow: TextOverflow.ellipsis,
                style: Theme.of(context).textTheme.labelLarge?.copyWith(
                  color: Colors.white,
                  fontWeight: FontWeight.w800,
                ),
              ),
            ),
          ],
        ),
      ),
    ),
  );
}

Widget _compactAction({
  required BuildContext context,
  required String label,
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
          children: [
            Expanded(
              child: Text(
                label,
                style: Theme.of(context).textTheme.labelLarge?.copyWith(
                  color: Colors.black,
                  fontWeight: FontWeight.w800,
                ),
              ),
            ),
            const Icon(
              Icons.arrow_forward_rounded,
              color: Colors.black,
              size: 18,
            ),
          ],
        ),
      ),
    ),
  );
}

Widget _accentCircle({required double size, required double opacity}) {
  return Container(
    width: size,
    height: size,
    decoration: BoxDecoration(
      shape: BoxShape.circle,
      color: Colors.black.withValues(alpha: opacity),
    ),
  );
}

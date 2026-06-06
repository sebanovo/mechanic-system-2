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
          title: 'Perfil',
          subtitle: 'Datos personales, configuración y seguridad.',
          icon: Icons.person_rounded,
          onTap: () => shellVm.setIndex(3),
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
      gradient: const LinearGradient(
        colors: [
          SapphirePalette.sapphire700,
          SapphirePalette.sapphire500,
          SapphirePalette.sapphire400,
        ],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      ),
      borderRadius: BorderRadius.circular(30),
      boxShadow: const [
        BoxShadow(
          color: Color(0x2A0D408C),
          blurRadius: 26,
          offset: Offset(0, 14),
        ),
      ],
    ),
    child: Stack(
      children: [
        Positioned(
          right: -24,
          top: -18,
          child: _accentCircle(size: 120, opacity: 0.16),
        ),
        Positioned(
          right: 28,
          bottom: -30,
          child: _accentCircle(size: 84, opacity: 0.12),
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
                      color: SapphirePalette.sapphire50,
                      borderRadius: BorderRadius.circular(100),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Text(
                    'Panel de auxilio',
                    style: Theme.of(context).textTheme.labelLarge?.copyWith(
                          color: Colors.white.withOpacity(0.88),
                          letterSpacing: 0.4,
                        ),
                  ),
                ],
              ),
              const SizedBox(height: 14),
              Text(
                'Todo lo importante en un solo lugar',
                style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                      color: Colors.white,
                      fontWeight: FontWeight.w900,
                      height: 1.05,
                    ),
              ),
              const SizedBox(height: 10),
              Text(
                'Accede rápido a tu sección activa, revisa el estado de la operación y vuelve a los módulos clave sin perder el flujo.',
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: Colors.white.withOpacity(0.9),
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
      color: Colors.white.withOpacity(0.14),
      borderRadius: BorderRadius.circular(999),
      border: Border.all(color: Colors.white.withOpacity(0.16)),
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
    color: Colors.white,
    borderRadius: BorderRadius.circular(18),
    child: InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(18),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, color: SapphirePalette.sapphire700, size: 20),
            const SizedBox(width: 8),
            Flexible(
              child: Text(
                label,
                overflow: TextOverflow.ellipsis,
                style: Theme.of(context).textTheme.labelLarge?.copyWith(
                      color: SapphirePalette.sapphire900,
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
    color: SapphirePalette.sapphire50,
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
                      color: SapphirePalette.sapphire900,
                      fontWeight: FontWeight.w800,
                    ),
              ),
            ),
            const Icon(Icons.arrow_forward_rounded, color: SapphirePalette.sapphire700, size: 18),
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
      color: Colors.white.withOpacity(opacity),
    ),
  );
}

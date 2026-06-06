import 'package:flutter/material.dart';

import '../../app/theme/app_theme.dart';

class StatusBadge extends StatelessWidget {
  const StatusBadge({
    super.key,
    required this.label,
  });

  final String label;

  @override
  Widget build(BuildContext context) {
    final normalized = label.toLowerCase();
    final isCancelled = normalized.contains('cancel');
    final isInactive = normalized.contains('inactive') || normalized.contains('inactivo');
    final isSuccess = normalized.contains('active') ||
        normalized.contains('activo') ||
        normalized.contains('open') ||
        normalized.contains('abierto') ||
        normalized.contains('completed') ||
        normalized.contains('completado') ||
        normalized.contains('arrived') ||
        normalized.contains('llegó') ||
        normalized.contains('en ruta') ||
        normalized.contains('service') ||
        normalized.contains('servicio');
    final isPending = normalized.contains('pending') ||
        normalized.contains('reported') ||
        normalized.contains('reportado') ||
        normalized.contains('analyz') ||
        normalized.contains('analiz') ||
        normalized.contains('search') ||
        normalized.contains('buscando') ||
        normalized.contains('wait') ||
        normalized.contains('esperando') ||
        normalized.contains('assign') ||
        normalized.contains('asign');
    final color = isCancelled
        ? Colors.red
        : isInactive
            ? Colors.grey
            : isSuccess
                ? Colors.green
                : isPending
                    ? Colors.orange
                    : SapphirePalette.sapphire700;

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: color.withOpacity(0.12),
        borderRadius: BorderRadius.circular(999),
      ),
      child: Text(
        label,
        style: TextStyle(
          color: color,
          fontWeight: FontWeight.w700,
          fontSize: 12,
        ),
      ),
    );
  }
}

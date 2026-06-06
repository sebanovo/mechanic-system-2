import 'package:flutter/material.dart';

import '../../domain/entities/app_entities.dart';
import '../utils/api_enum_labels.dart';
import 'status_badge.dart';
import 'surface_card.dart';

class VehicleCard extends StatelessWidget {
  const VehicleCard({
    super.key,
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

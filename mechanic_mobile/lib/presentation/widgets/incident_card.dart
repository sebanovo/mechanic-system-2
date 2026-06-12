import 'package:flutter/material.dart';

import '../../domain/entities/app_entities.dart';
import '../utils/api_enum_labels.dart';
import 'status_badge.dart';
import 'surface_card.dart';

class IncidentCard extends StatelessWidget {
  const IncidentCard({
    super.key,
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
                StatusBadge(
                  label: incident.raw['offline_state'] != null
                      ? 'Pendiente'
                      : incidentStatusLabelFromApi(incident.status),
                ),
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

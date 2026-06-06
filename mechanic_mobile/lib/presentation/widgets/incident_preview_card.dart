import 'package:flutter/material.dart';

import '../../domain/entities/app_entities.dart';
import '../utils/api_enum_labels.dart';
import 'status_badge.dart';
import 'surface_card.dart';

class IncidentPreviewCard extends StatelessWidget {
  const IncidentPreviewCard({super.key, required this.incident});

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

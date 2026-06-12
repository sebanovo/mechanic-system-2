import 'package:flutter/material.dart';

import 'empty_state_panel.dart';
import 'info_row.dart';
import 'surface_card.dart';

class AssignmentTrackingLivePanel extends StatelessWidget {
  const AssignmentTrackingLivePanel({
    super.key,
    required this.assignmentId,
    required this.trackingSession,
    this.onOpenMap,
  });

  final String assignmentId;
  final Map<String, dynamic>? trackingSession;
  final VoidCallback? onOpenMap;

  @override
  Widget build(BuildContext context) {
    final assignmentStatus = _stringValue(
      _mapValue(trackingSession, 'assignment_status'),
    );
    final incidentStatus = _stringValue(
      _mapValue(trackingSession, 'incident_status'),
    );
    final websocket = _mapValue(trackingSession, 'websocket');
    final websocketUrl = websocket is Map
        ? _stringValue(websocket['url'])
        : null;

    return SurfaceCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Expanded(
                child: Text(
                  'Tracking en vivo',
                  style: Theme.of(context).textTheme.titleLarge?.copyWith(
                        fontWeight: FontWeight.w900,
                      ),
                ),
              ),
              _statusChip(
                context,
                trackingSession == null
                    ? 'Sin sesión'
                    : (assignmentStatus?.isNotEmpty == true
                        ? assignmentStatus!
                        : 'Listo'),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            'El mapa completo se abrió en una pantalla dedicada para evitar desbordes de espacio.',
            style: Theme.of(context).textTheme.bodyMedium,
          ),
          const SizedBox(height: 12),
          if (trackingSession == null)
            const EmptyStatePanel(
              title: 'Sin sesión de tracking',
              subtitle: 'Aún no hay una sesión de tracking disponible.',
              icon: Icons.map_rounded,
            )
          else ...[
            InfoRow(
              label: 'Asignación',
              value: assignmentStatus ?? '-',
            ),
            const Divider(height: 24),
            InfoRow(
              label: 'Incidente',
              value: incidentStatus ?? '-',
            ),
            const Divider(height: 24),
            InfoRow(
              label: 'WebSocket',
              value: websocketUrl ?? 'Disponible',
            ),
          ],
          const SizedBox(height: 14),
          Wrap(
            spacing: 10,
            runSpacing: 10,
            children: [
              FilledButton.icon(
                onPressed: onOpenMap,
                icon: const Icon(Icons.map_rounded),
                label: const Text('Abrir mapa y ruta'),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Object? _mapValue(Map<String, dynamic>? map, String key) {
    if (map == null) return null;
    return map[key];
  }

  String? _stringValue(Object? value) {
    final text = value?.toString().trim();
    if (text == null || text.isEmpty || text == 'null') return null;
    return text;
  }

  Widget _statusChip(BuildContext context, String label) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 7),
      decoration: BoxDecoration(
        color: Theme.of(context).colorScheme.primaryContainer,
        borderRadius: BorderRadius.circular(999),
      ),
      child: Text(
        label,
        style: Theme.of(context).textTheme.labelMedium?.copyWith(
              fontWeight: FontWeight.w800,
            ),
      ),
    );
  }
}

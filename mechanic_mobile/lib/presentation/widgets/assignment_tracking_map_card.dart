import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';

import '../../constants/env.dart';
import 'surface_card.dart';

class AssignmentTrackingMapCard extends StatefulWidget {
  const AssignmentTrackingMapCard({
    super.key,
    required this.technicianLocation,
    required this.destinationLocation,
    required this.routePoints,
    required this.routeLoading,
    required this.routeWarning,
    required this.socketStatus,
    required this.assignmentStatus,
    required this.incidentStatus,
  });

  final LatLng? technicianLocation;
  final LatLng? destinationLocation;
  final List<LatLng> routePoints;
  final bool routeLoading;
  final String? routeWarning;
  final String socketStatus;
  final String? assignmentStatus;
  final String? incidentStatus;

  @override
  State<AssignmentTrackingMapCard> createState() =>
      _AssignmentTrackingMapCardState();
}

class _AssignmentTrackingMapCardState extends State<AssignmentTrackingMapCard> {
  final MapController _mapController = MapController();
  bool _movedOnce = false;

  @override
  void didUpdateWidget(covariant AssignmentTrackingMapCard oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.technicianLocation != widget.technicianLocation ||
        oldWidget.destinationLocation != widget.destinationLocation ||
        oldWidget.routePoints != widget.routePoints) {
      _moveCamera();
    }
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (!_movedOnce) {
      WidgetsBinding.instance.addPostFrameCallback((_) => _moveCamera());
      _movedOnce = true;
    }
  }

  void _moveCamera() {
    final points = _visiblePoints();
    if (points.isEmpty) return;
    final center = _centerOf(points);
    final zoom = _zoomFor(points);
    try {
      _mapController.move(center, zoom);
    } catch (_) {
      // El mapa puede aún no estar montado; la siguiente actualización lo corregirá.
    }
  }

  List<LatLng> _visiblePoints() {
    final points = <LatLng>[];
    if (widget.technicianLocation != null) {
      points.add(widget.technicianLocation!);
    }
    if (widget.destinationLocation != null) {
      points.add(widget.destinationLocation!);
    }
    if (widget.routePoints.isNotEmpty) {
      points.add(widget.routePoints.first);
      points.add(widget.routePoints.last);
    }
    return points;
  }

  LatLng _centerOf(List<LatLng> points) {
    if (points.length == 1) return points.first;
    final lat =
        points.map((point) => point.latitude).reduce((a, b) => a + b) /
        points.length;
    final lng =
        points.map((point) => point.longitude).reduce((a, b) => a + b) /
        points.length;
    return LatLng(lat, lng);
  }

  double _zoomFor(List<LatLng> points) {
    if (points.length <= 1) return 15;
    final latSpan =
        points.map((point) => point.latitude).reduce((a, b) => a > b ? a : b) -
        points.map((point) => point.latitude).reduce((a, b) => a < b ? a : b);
    final lngSpan =
        points.map((point) => point.longitude).reduce((a, b) => a > b ? a : b) -
        points.map((point) => point.longitude).reduce((a, b) => a < b ? a : b);
    final span = latSpan.abs() > lngSpan.abs() ? latSpan.abs() : lngSpan.abs();
    if (span < 0.005) return 16.5;
    if (span < 0.02) return 15.0;
    if (span < 0.08) return 13.0;
    if (span < 0.2) return 11.5;
    return 10.0;
  }

  @override
  Widget build(BuildContext context) {
    final technician = widget.technicianLocation;
    final destination = widget.destinationLocation;
    final routePoints = widget.routePoints;
    final routeAvailable = routePoints.length >= 2;
    final technicianCoords = _formatLatLng(technician);
    final destinationCoords = _formatLatLng(destination);
    final markers = <Marker>[
      if (destination != null)
        Marker(
          point: destination,
          width: 52,
          height: 52,
          child: _markerBadge(
            context,
            icon: Icons.location_on_rounded,
            color: Theme.of(context).colorScheme.error,
          ),
        ),
      if (technician != null)
        Marker(
          point: technician,
          width: 52,
          height: 52,
          child: _markerBadge(
            context,
            icon: Icons.build_circle_rounded,
            color: Theme.of(context).colorScheme.primary,
          ),
        ),
    ];

    return SurfaceCard(
      padding: const EdgeInsets.all(14),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Expanded(
                child: Text(
                  'Mapa en tiempo real',
                  style: Theme.of(
                    context,
                  ).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w900),
                ),
              ),
              _statusChip(context, widget.socketStatus),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            'Muestra la ubicación del técnico y del cliente/incidente en vivo.',
            style: Theme.of(context).textTheme.bodyMedium,
          ),
          const SizedBox(height: 12),
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: const Color(0xFFFFF3A6),
              borderRadius: BorderRadius.circular(18),
              border: Border.all(color: Colors.black, width: 1.2),
            ),
            child: Text(
              'Vista ampliada para seguir cliente, técnico y ruta sin perder contexto.',
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                color: Colors.black87,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
          const SizedBox(height: 12),
          Wrap(
            spacing: 12,
            runSpacing: 12,
            children: [
              _coordinateCard(
                context,
                label: 'Cliente / incidente',
                value: destinationCoords,
                icon: Icons.location_on_rounded,
                color: Theme.of(context).colorScheme.error,
              ),
              _coordinateCard(
                context,
                label: 'Técnico',
                value: technicianCoords,
                icon: Icons.build_circle_rounded,
                color: Theme.of(context).colorScheme.primary,
              ),
            ],
          ),
          const SizedBox(height: 12),
          AspectRatio(
            aspectRatio: 16 / 15,
            child: ClipRRect(
              borderRadius: BorderRadius.circular(24),
              child: Stack(
                children: [
                  FlutterMap(
                    mapController: _mapController,
                    options: MapOptions(
                      initialCenter: _centerOf(
                        _visiblePoints().isNotEmpty
                            ? _visiblePoints()
                            : [const LatLng(-16.5, -68.12)],
                      ),
                      initialZoom: 13.5,
                      minZoom: 12,
                      maxZoom: 18,
                      interactionOptions: const InteractionOptions(
                        flags: InteractiveFlag.all,
                      ),
                    ),
                    children: [
                      TileLayer(
                        urlTemplate: AppEnv.mapTileUrl,
                        userAgentPackageName: 'mechanic_mobile',
                        tileProvider: NetworkTileProvider(),
                      ),
                      if (routeAvailable)
                        PolylineLayer(
                          polylines: [
                            Polyline(
                              points: routePoints,
                              strokeWidth: 5,
                              color: Theme.of(
                                context,
                              ).colorScheme.primary.withValues(alpha: 0.88),
                            ),
                          ],
                        ),
                      if (markers.isNotEmpty) MarkerLayer(markers: markers),
                    ],
                  ),
                  Positioned(
                    left: 12,
                    top: 12,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        _legendChip(
                          context,
                          'Cliente',
                          Theme.of(context).colorScheme.error,
                          Icons.location_on_rounded,
                        ),
                        const SizedBox(height: 8),
                        _legendChip(
                          context,
                          'Técnico',
                          Theme.of(context).colorScheme.primary,
                          Icons.build_circle_rounded,
                        ),
                      ],
                    ),
                  ),
                  if (widget.routeLoading)
                    const Positioned.fill(
                      child: ColoredBox(
                        color: Color.fromARGB(80, 0, 0, 0),
                        child: Center(child: CircularProgressIndicator()),
                      ),
                    ),
                  if (widget.routeWarning != null)
                    Positioned(
                      left: 12,
                      right: 12,
                      bottom: 12,
                      child: DecoratedBox(
                        decoration: BoxDecoration(
                          color: Theme.of(
                            context,
                          ).colorScheme.surface.withValues(alpha: 0.92),
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(
                            color: Theme.of(context).colorScheme.outlineVariant,
                          ),
                        ),
                        child: Padding(
                          padding: const EdgeInsets.all(12),
                          child: Text(
                            widget.routeWarning!,
                            style: Theme.of(context).textTheme.bodySmall,
                          ),
                        ),
                      ),
                    ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 12),
          Wrap(
            spacing: 10,
            runSpacing: 10,
            children: [
              _detailChip(
                context,
                'Asignación',
                widget.assignmentStatus ?? '-',
                Icons.assignment_turned_in_rounded,
              ),
              _detailChip(
                context,
                'Incidente',
                widget.incidentStatus ?? '-',
                Icons.report_problem_rounded,
              ),
              _detailChip(
                context,
                'Ruta',
                routeAvailable ? 'GraphHopper' : 'Respaldo',
                Icons.alt_route_rounded,
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _markerBadge(
    BuildContext context, {
    required IconData icon,
    required Color color,
  }) {
    return Center(
      child: Container(
        width: 40,
        height: 40,
        decoration: BoxDecoration(
          color: color,
          shape: BoxShape.circle,
          boxShadow: [
            BoxShadow(
              color: color.withValues(alpha: 0.28),
              blurRadius: 16,
              spreadRadius: 2,
            ),
          ],
        ),
        child: Icon(icon, color: Colors.white, size: 22),
      ),
    );
  }

  Widget _legendChip(
    BuildContext context,
    String label,
    Color color,
    IconData icon,
  ) {
    return DecoratedBox(
      decoration: BoxDecoration(
        color: Theme.of(context).colorScheme.surface.withValues(alpha: 0.9),
        borderRadius: BorderRadius.circular(999),
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, size: 14, color: color),
            const SizedBox(width: 6),
            Text(
              label,
              style: Theme.of(
                context,
              ).textTheme.labelMedium?.copyWith(fontWeight: FontWeight.w800),
            ),
          ],
        ),
      ),
    );
  }

  Widget _coordinateCard(
    BuildContext context, {
    required String label,
    required String value,
    required IconData icon,
    required Color color,
  }) {
    return ConstrainedBox(
      constraints: const BoxConstraints(minWidth: 220),
      child: DecoratedBox(
        decoration: BoxDecoration(
          color: const Color(0xFFFFF7C9),
          borderRadius: BorderRadius.circular(18),
          border: Border.all(color: Colors.black, width: 1.1),
        ),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              Row(
                children: [
                  Icon(icon, size: 18, color: color),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      label,
                      style: Theme.of(context).textTheme.labelLarge?.copyWith(
                        fontWeight: FontWeight.w900,
                        color: Colors.black,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Text(
                value,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  fontWeight: FontWeight.w700,
                  color: Colors.black87,
                ),
              ),
            ],
          ),
        ),
      ),
    );
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
        style: Theme.of(
          context,
        ).textTheme.labelMedium?.copyWith(fontWeight: FontWeight.w800),
      ),
    );
  }

  String _formatLatLng(LatLng? point) {
    if (point == null) return 'Sin ubicación';
    return '${point.latitude.toStringAsFixed(6)}, ${point.longitude.toStringAsFixed(6)}';
  }

  Widget _detailChip(
    BuildContext context,
    String label,
    String value,
    IconData icon,
  ) {
    return DecoratedBox(
      decoration: BoxDecoration(
        color: Theme.of(context).colorScheme.surfaceContainerHighest,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, size: 18),
            const SizedBox(width: 8),
            Text(
              '$label: ',
              style: Theme.of(
                context,
              ).textTheme.labelLarge?.copyWith(fontWeight: FontWeight.w900),
            ),
            Text(value, style: Theme.of(context).textTheme.labelLarge),
          ],
        ),
      ),
    );
  }
}

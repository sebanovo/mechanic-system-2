import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:latlong2/latlong.dart';
import 'package:provider/provider.dart';

import '../../core/services/session_storage.dart';
import '../services/assignment_tracking_socket_service.dart';
import '../services/graphhopper_route_service.dart';
import '../widgets/assignment_tracking_map_card.dart';
import '../widgets/empty_state_panel.dart';
import '../widgets/error_banner.dart';
import '../widgets/info_row.dart';
import '../widgets/surface_card.dart';

class AssignmentTrackingPage extends StatefulWidget {
  const AssignmentTrackingPage({
    super.key,
    required this.assignmentId,
    required this.trackingSession,
  });

  final String assignmentId;
  final Map<String, dynamic>? trackingSession;

  @override
  State<AssignmentTrackingPage> createState() => _AssignmentTrackingPageState();
}

class _AssignmentTrackingPageState extends State<AssignmentTrackingPage> {
  final AssignmentTrackingSocketService _socket =
      AssignmentTrackingSocketService();
  final GraphhopperRouteService _routeService = GraphhopperRouteService();
  StreamSubscription<Map<String, dynamic>>? _eventsSubscription;
  late final VoidCallback _statusListener;
  late final VoidCallback _errorListener;
  final TextEditingController _latitude = TextEditingController();
  final TextEditingController _longitude = TextEditingController();
  final TextEditingController _heading = TextEditingController();
  final TextEditingController _speed = TextEditingController();
  final List<Map<String, dynamic>> _logs = <Map<String, dynamic>>[];
  LatLng? _technicianLocation;
  LatLng? _destinationLocation;
  List<LatLng> _routePoints = <LatLng>[];
  bool _routeLoading = false;
  bool _resolvingLocation = false;
  bool _autoConnectScheduled = false;
  String? _routeWarning;
  Timer? _routeDebounce;

  @override
  void initState() {
    super.initState();
    _statusListener = () {
      if (mounted) setState(() {});
    };
    _errorListener = () {
      if (mounted) setState(() {});
    };
    _socket.status.addListener(_statusListener);
    _socket.error.addListener(_errorListener);
    _eventsSubscription = _socket.events.listen(_handleSocketEvent);
    _syncSessionLocations();
    _scheduleRouteRefresh();
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (_autoConnectScheduled) return;
    _autoConnectScheduled = true;
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return;
      _autoConnectIfNeeded();
    });
  }

  @override
  void didUpdateWidget(covariant AssignmentTrackingPage oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.trackingSession != widget.trackingSession) {
      _syncSessionLocations();
      _scheduleRouteRefresh(force: true);
    }
  }

  @override
  void dispose() {
    _routeDebounce?.cancel();
    _eventsSubscription?.cancel();
    _socket.status.removeListener(_statusListener);
    _socket.error.removeListener(_errorListener);
    _socket.dispose();
    _latitude.dispose();
    _longitude.dispose();
    _heading.dispose();
    _speed.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final storage = context.watch<SessionStorage>();
    final socketUrl = _buildSocketUri(storage);
    final userType = storage.userType.toUpperCase();
    final canSendLocation = userType == 'TECHNICIAN';
    final assignmentStatus = _stringValue(
      _mapValue(widget.trackingSession, 'assignment_status'),
    );
    final incidentStatus = _stringValue(
      _mapValue(widget.trackingSession, 'incident_status'),
    );

    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          tooltip: 'Volver atrás',
          onPressed: () async {
            await Navigator.of(context).maybePop();
          },
          icon: const Icon(Icons.arrow_back_rounded),
        ),
        title: const Text('Tracking en vivo'),
        actions: [
          IconButton(
            tooltip: 'Refrescar ruta',
            onPressed: _routeLoading ? null : () => _scheduleRouteRefresh(force: true),
            icon: const Icon(Icons.refresh_rounded),
          ),
        ],
      ),
      body: SafeArea(
        child: RefreshIndicator(
          onRefresh: () async {
            _syncSessionLocations();
            await _autoConnectIfNeeded();
            await _refreshRoute();
            if (mounted) setState(() {});
          },
          child: ListView(
            physics: const AlwaysScrollableScrollPhysics(),
            padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
            children: [
              SurfaceCard(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Expanded(
                          child: Text(
                            'Mapa y ruta en tiempo real',
                            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                                  fontWeight: FontWeight.w900,
                                ),
                          ),
                        ),
                        ValueListenableBuilder<String>(
                          valueListenable: _socket.status,
                          builder: (context, status, _) => _statusChip(context, status),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Vista dedicada para seguir al técnico, el cliente y la ruta sin romper el layout.',
                      style: Theme.of(context).textTheme.bodyMedium,
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 12),
              ValueListenableBuilder<String?>(
                valueListenable: _socket.error,
                builder: (context, error, _) {
                  if (error == null || error.isEmpty) {
                    return const SizedBox.shrink();
                  }
                  return Padding(
                    padding: const EdgeInsets.only(bottom: 12),
                    child: ErrorBanner(message: error),
                  );
                },
              ),
              AssignmentTrackingMapCard(
                technicianLocation: _technicianLocation,
                destinationLocation: _destinationLocation,
                routePoints: _routePoints,
                routeLoading: _routeLoading,
                routeWarning: _routeWarning,
                socketStatus: _socket.status.value,
                assignmentStatus: assignmentStatus,
                incidentStatus: incidentStatus,
              ),
              const SizedBox(height: 12),
              SurfaceCard(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Conexión y ubicación',
                      style: Theme.of(context).textTheme.titleLarge?.copyWith(
                            fontWeight: FontWeight.w900,
                          ),
                    ),
                    const SizedBox(height: 12),
                    InfoRow(label: 'WebSocket', value: socketUrl.toString()),
                    const Divider(height: 24),
                    InfoRow(
                      label: 'Asignación',
                      value: assignmentStatus ?? '-',
                    ),
                    const Divider(height: 24),
                    InfoRow(
                      label: 'Incidente',
                      value: incidentStatus ?? '-',
                    ),
                    const SizedBox(height: 12),
                    Wrap(
                      spacing: 10,
                      runSpacing: 10,
                      children: [
                        FilledButton.icon(
                          onPressed: _socket.isConnected
                              ? null
                              : () async => _connect(storage, socketUrl),
                          icon: const Icon(Icons.link_rounded),
                          label: const Text('Conectar'),
                        ),
                        OutlinedButton.icon(
                          onPressed: !_socket.isConnected
                              ? null
                              : () async {
                                  await _socket.disconnect();
                                  if (!mounted) return;
                                  setState(() {});
                                },
                          icon: const Icon(Icons.link_off_rounded),
                          label: const Text('Desconectar'),
                        ),
                        FilledButton.tonalIcon(
                          onPressed: _resolvingLocation
                              ? null
                              : () async {
                                  await _fillCurrentLocation();
                                },
                          icon: _resolvingLocation
                              ? const SizedBox(
                                  width: 18,
                                  height: 18,
                                  child: CircularProgressIndicator(strokeWidth: 2),
                                )
                              : const Icon(Icons.my_location_rounded),
                          label: const Text('Usar GPS'),
                        ),
                      ],
                    ),
                    if (!canSendLocation) ...[
                      const SizedBox(height: 12),
                      Text(
                        'El envío de ubicación está habilitado solo para el técnico. Cliente y dueño pueden seguir la ubicación en vivo.',
                        style: Theme.of(context).textTheme.bodySmall,
                      ),
                    ],
                  ],
                ),
              ),
              if (canSendLocation) ...[
                const SizedBox(height: 12),
                SurfaceCard(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Enviar ubicación de prueba',
                        style: Theme.of(context).textTheme.titleLarge?.copyWith(
                              fontWeight: FontWeight.w900,
                            ),
                      ),
                      const SizedBox(height: 12),
                      Row(
                        children: [
                          Expanded(
                            child: TextField(
                              controller: _latitude,
                              keyboardType: const TextInputType.numberWithOptions(
                                signed: true,
                                decimal: true,
                              ),
                              decoration: const InputDecoration(
                                labelText: 'Latitud',
                              ),
                            ),
                          ),
                          const SizedBox(width: 12),
                          Expanded(
                            child: TextField(
                              controller: _longitude,
                              keyboardType: const TextInputType.numberWithOptions(
                                signed: true,
                                decimal: true,
                              ),
                              decoration: const InputDecoration(
                                labelText: 'Longitud',
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 12),
                      Row(
                        children: [
                          Expanded(
                            child: TextField(
                              controller: _heading,
                              keyboardType: const TextInputType.numberWithOptions(
                                decimal: true,
                                signed: false,
                              ),
                              decoration: const InputDecoration(labelText: 'Heading'),
                            ),
                          ),
                          const SizedBox(width: 12),
                          Expanded(
                            child: TextField(
                              controller: _speed,
                              keyboardType: const TextInputType.numberWithOptions(
                                decimal: true,
                                signed: false,
                              ),
                              decoration: const InputDecoration(
                                labelText: 'Speed km/h',
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 12),
                      SizedBox(
                        width: double.infinity,
                        child: ElevatedButton.icon(
                          onPressed: !_socket.isConnected
                              ? null
                              : () async {
                                  await _sendTestLocation();
                                },
                          icon: const Icon(Icons.send_rounded),
                          label: const Text('Enviar ubicación'),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
              const SizedBox(height: 12),
              SurfaceCard(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Eventos recibidos',
                      style: Theme.of(context).textTheme.titleLarge?.copyWith(
                            fontWeight: FontWeight.w900,
                          ),
                    ),
                    const SizedBox(height: 12),
                    if (_logs.isEmpty)
                      const EmptyStatePanel(
                        title: 'Sin eventos',
                        subtitle: 'Conecta el socket para ver eventos en vivo.',
                        icon: Icons.timeline_rounded,
                      )
                    else
                      ..._logs.map(
                        (event) => Padding(
                          padding: const EdgeInsets.only(bottom: 10),
                          child: SurfaceCard(
                            padding: const EdgeInsets.all(14),
                            child: Text(
                              JsonEncoder.withIndent('  ').convert(event),
                              style: Theme.of(context)
                                  .textTheme
                                  .bodySmall
                                  ?.copyWith(fontFamily: 'monospace'),
                            ),
                          ),
                        ),
                      ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _handleSocketEvent(Map<String, dynamic> event) {
    if (!mounted) return;
    setState(() {
      _logs.insert(0, event);
      if (_logs.length > 12) _logs.removeLast();
    });

    final eventType = _stringValue(event['type'])?.toUpperCase() ?? '';
    final latitude = _toDouble(event['latitude']);
    final longitude = _toDouble(event['longitude']);
    final embeddedLocation = _extractLatLng(event['location']);
    final liveLocation = embeddedLocation ??
        (latitude != null && longitude != null ? LatLng(latitude, longitude) : null);
    if ((eventType == 'TECHNICIAN_LOCATION_UPDATED' ||
            eventType == 'LOCATION_UPDATED' ||
            liveLocation != null) &&
        liveLocation != null) {
      _technicianLocation = liveLocation;
      _scheduleRouteRefresh();
      if (mounted) setState(() {});
    }
  }

  Future<void> _connect(SessionStorage storage, Uri socketUrl) async {
    try {
      await _socket.connect(
        socketUri: socketUrl,
        token: storage.apiToken,
      );
      if (!mounted) return;
      setState(() {});
      _scheduleRouteRefresh(force: true);
    } catch (exception) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(exception.toString())),
      );
    }
  }

  Future<void> _autoConnectIfNeeded() async {
    if (_socket.isConnected) return;
    final storage = context.read<SessionStorage>();
    if (storage.apiToken.trim().isEmpty) return;
    final socketUrl = _buildSocketUri(storage);
    await _connect(storage, socketUrl);
  }

  Future<void> _fillCurrentLocation() async {
    setState(() => _resolvingLocation = true);
    try {
      final position = await _resolveCurrentPosition();
      _latitude.text = position.latitude.toString();
      _longitude.text = position.longitude.toString();
      _technicianLocation = LatLng(position.latitude, position.longitude);
      _scheduleRouteRefresh(force: true);
      if (!mounted) return;
      setState(() {});
    } catch (exception) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(exception.toString())),
      );
    } finally {
      if (mounted) {
        setState(() => _resolvingLocation = false);
      }
    }
  }

  Future<void> _sendTestLocation() async {
    final latitude = double.tryParse(_latitude.text.trim());
    final longitude = double.tryParse(_longitude.text.trim());
    if (latitude == null || longitude == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Ingresa latitud y longitud válidas.')),
      );
      return;
    }
    await _socket.sendLocation(
      latitude: latitude,
      longitude: longitude,
      heading: double.tryParse(_heading.text.trim()),
      speedKmh: double.tryParse(_speed.text.trim()),
    );
    if (!mounted) return;
    setState(() {
      _technicianLocation = LatLng(latitude, longitude);
      _logs.insert(0, <String, dynamic>{
        'type': 'LOCATION_UPDATED',
        'latitude': latitude,
        'longitude': longitude,
        if (_heading.text.trim().isNotEmpty) 'heading': _heading.text.trim(),
        if (_speed.text.trim().isNotEmpty) 'speed_kmh': _speed.text.trim(),
        'source': 'LOCAL',
      });
      if (_logs.length > 12) _logs.removeLast();
    });
    _scheduleRouteRefresh(force: true);
  }

  void _syncSessionLocations() {
    _technicianLocation = _firstLatLng([
      _mapValue(widget.trackingSession, 'origin'),
      _mapValue(widget.trackingSession, 'technician_location'),
      _mapValue(widget.trackingSession, 'technician'),
      _mapValue(widget.trackingSession, 'last_location'),
    ]);
    _destinationLocation = _firstLatLng([
      _mapValue(widget.trackingSession, 'destination'),
      _mapValue(widget.trackingSession, 'incident_location'),
      _mapValue(widget.trackingSession, 'incident'),
      _mapValue(widget.trackingSession, 'customer_location'),
    ]);
  }

  void _scheduleRouteRefresh({bool force = false}) {
    if (_technicianLocation == null || _destinationLocation == null) return;
    if (!force && _routeDebounce != null) return;
    _routeDebounce?.cancel();
    _routeDebounce = Timer(const Duration(milliseconds: 350), () async {
      _routeDebounce = null;
      await _refreshRoute();
    });
  }

  Future<void> _refreshRoute() async {
    final start = _technicianLocation;
    final end = _destinationLocation;
    if (start == null || end == null) return;
    if (!mounted) return;
    setState(() {
      _routeLoading = true;
      _routeWarning = null;
    });
    final result = await _routeService.buildRoute(start: start, end: end);
    if (!mounted) return;
    setState(() {
      _routePoints = result.points;
      _routeWarning = result.warning;
      _routeLoading = false;
    });
  }

  Uri _buildSocketUri(SessionStorage storage) {
    final raw =
        widget.trackingSession?['websocket']?['url']?.toString() ??
        '/ws/assignments/${widget.assignmentId}/tracking';
    final base = Uri.parse(storage.apiBaseUrl);
    final scheme = base.scheme == 'https' ? 'wss' : 'ws';
    return raw.startsWith('http')
        ? Uri.parse(raw)
        : base.replace(
            scheme: scheme,
            path: raw.startsWith('/') ? raw : '/$raw',
            queryParameters: const {},
          );
  }

  Object? _mapValue(Map<String, dynamic>? map, String key) {
    if (map == null) return null;
    return map[key];
  }

  LatLng? _extractLatLng(Object? value) {
    if (value is! Map) return null;
    final nested = value['location'];
    if (nested is Map) {
      final nestedLatLng = _extractLatLng(nested);
      if (nestedLatLng != null) return nestedLatLng;
    }
    final latitude = _toDouble(value['latitude'] ?? value['lat']);
    final longitude = _toDouble(value['longitude'] ?? value['lng'] ?? value['lon']);
    if (latitude == null || longitude == null) return null;
    return LatLng(latitude, longitude);
  }

  LatLng? _firstLatLng(List<Object?> values) {
    for (final value in values) {
      final location = _extractLatLng(value);
      if (location != null) return location;
    }
    return null;
  }

  String? _stringValue(Object? value) {
    final text = value?.toString().trim();
    if (text == null || text.isEmpty || text == 'null') return null;
    return text;
  }

  double? _toDouble(Object? value) {
    if (value is num) return value.toDouble();
    return double.tryParse(value?.toString() ?? '');
  }

  Future<Position> _resolveCurrentPosition() async {
    final enabled = await Geolocator.isLocationServiceEnabled();
    if (!enabled) {
      throw Exception('Activa la ubicación para usar coordenadas actuales.');
    }
    var permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
    }
    if (permission == LocationPermission.denied) {
      throw Exception('Permiso de ubicación denegado.');
    }
    if (permission == LocationPermission.deniedForever) {
      throw Exception('El permiso de ubicación está bloqueado en el sistema.');
    }
    return Geolocator.getCurrentPosition(
      desiredAccuracy: LocationAccuracy.high,
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
        style: Theme.of(context).textTheme.labelMedium?.copyWith(
              fontWeight: FontWeight.w800,
            ),
      ),
    );
  }
}

import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:provider/provider.dart';

import '../../core/services/session_storage.dart';
import '../services/assignment_tracking_socket_service.dart';
import 'empty_state_panel.dart';
import 'error_banner.dart';
import 'info_row.dart';
import 'surface_card.dart';

class AssignmentTrackingLivePanel extends StatefulWidget {
  const AssignmentTrackingLivePanel({
    super.key,
    required this.assignmentId,
    required this.trackingSession,
  });

  final String assignmentId;
  final Map<String, dynamic>? trackingSession;

  @override
  State<AssignmentTrackingLivePanel> createState() =>
      _AssignmentTrackingLivePanelState();
}

class _AssignmentTrackingLivePanelState
    extends State<AssignmentTrackingLivePanel> {
  final AssignmentTrackingSocketService _socket =
      AssignmentTrackingSocketService();
  StreamSubscription<Map<String, dynamic>>? _eventsSubscription;
  late final VoidCallback _statusListener;
  late final VoidCallback _errorListener;
  final TextEditingController _latitude = TextEditingController();
  final TextEditingController _longitude = TextEditingController();
  final TextEditingController _heading = TextEditingController();
  final TextEditingController _speed = TextEditingController();
  final List<Map<String, dynamic>> _logs = <Map<String, dynamic>>[];
  bool _resolvingLocation = false;

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
    _eventsSubscription = _socket.events.listen((event) {
      if (!mounted) return;
      setState(() {
        _logs.insert(0, event);
        if (_logs.length > 10) _logs.removeLast();
      });
    });
  }

  @override
  void dispose() {
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

    return SurfaceCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Tracking en vivo',
            style: Theme.of(
              context,
            ).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w900),
          ),
          const SizedBox(height: 8),
          ValueListenableBuilder<String>(
            valueListenable: _socket.status,
            builder: (context, status, _) =>
                InfoRow(label: 'Estado', value: status),
          ),
          ValueListenableBuilder<String?>(
            valueListenable: _socket.error,
            builder: (context, error, _) {
              if (error == null || error.isEmpty) {
                return const SizedBox.shrink();
              }
              return Padding(
                padding: const EdgeInsets.only(top: 10),
                child: ErrorBanner(message: error),
              );
            },
          ),
          const Divider(height: 24),
          InfoRow(label: 'URL', value: socketUrl.toString()),
          const SizedBox(height: 12),
          Wrap(
            spacing: 10,
            runSpacing: 10,
            children: [
              FilledButton.icon(
                onPressed: _socket.isConnected
                    ? null
                    : () async {
                        try {
                          await _socket.connect(
                            socketUri: socketUrl,
                            token: storage.apiToken,
                          );
                          if (!mounted) return;
                          setState(() {});
                        } catch (exception) {
                          if (!mounted) return;
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(content: Text(exception.toString())),
                          );
                        }
                },
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
          const SizedBox(height: 14),
          if (!canSendLocation)
            Padding(
              padding: const EdgeInsets.only(bottom: 10),
              child: Text(
                'El GPS se puede usar para leer coordenadas, pero solo el técnico puede enviar ubicación al WebSocket.',
                style: Theme.of(context).textTheme.bodySmall,
              ),
            ),
          Text(
            'Enviar ubicación de prueba',
            style: Theme.of(
              context,
            ).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800),
          ),
          const SizedBox(height: 10),
          Row(
            children: [
              Expanded(
                child: TextField(
                  controller: _latitude,
                  keyboardType: const TextInputType.numberWithOptions(
                    signed: true,
                    decimal: true,
                  ),
                  decoration: const InputDecoration(labelText: 'Latitud'),
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: TextField(
                  controller: _longitude,
                  keyboardType: const TextInputType.numberWithOptions(
                    signed: true,
                    decimal: true,
                  ),
                  decoration: const InputDecoration(labelText: 'Longitud'),
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
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
              const SizedBox(width: 10),
              Expanded(
                child: TextField(
                  controller: _speed,
                  keyboardType: const TextInputType.numberWithOptions(
                    decimal: true,
                    signed: false,
                  ),
                  decoration: const InputDecoration(labelText: 'Speed km/h'),
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: !canSendLocation || !_socket.isConnected
                  ? null
                  : () async {
                      final latitude = double.tryParse(_latitude.text.trim());
                      final longitude = double.tryParse(_longitude.text.trim());
                      if (latitude == null || longitude == null) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(
                            content: Text(
                              'Ingresa latitud y longitud válidas.',
                            ),
                          ),
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
                        _logs.insert(0, <String, dynamic>{
                          'type': 'LOCATION_UPDATED',
                          'latitude': latitude,
                          'longitude': longitude,
                          if (_heading.text.trim().isNotEmpty)
                            'heading': _heading.text.trim(),
                          if (_speed.text.trim().isNotEmpty)
                            'speed_kmh': _speed.text.trim(),
                          'source': 'LOCAL',
                        });
                        if (_logs.length > 10) _logs.removeLast();
                      });
                    },
              child: const Text('Enviar ubicación de prueba'),
            ),
          ),
          const SizedBox(height: 16),
          Text(
            'Eventos recibidos',
            style: Theme.of(
              context,
            ).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800),
          ),
          const SizedBox(height: 10),
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
                    style: Theme.of(
                      context,
                    ).textTheme.bodySmall?.copyWith(fontFamily: 'monospace'),
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }

  Future<void> _fillCurrentLocation() async {
    setState(() => _resolvingLocation = true);
    try {
      final position = await _resolveCurrentPosition();
      _latitude.text = position.latitude.toString();
      _longitude.text = position.longitude.toString();
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

  Uri _buildSocketUri(SessionStorage storage) {
    final raw =
        widget.trackingSession?['websocket']?['url']?.toString() ??
        '/ws/assignments/${widget.assignmentId}/tracking';
    final base = Uri.parse(storage.apiBaseUrl);
    final scheme = base.scheme == 'https' ? 'wss' : 'ws';
    final resolved = raw.startsWith('http')
        ? Uri.parse(raw)
        : base.replace(
            scheme: scheme,
            path: raw.startsWith('/') ? raw : '/$raw',
            queryParameters: const {},
          );
    return resolved;
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
}

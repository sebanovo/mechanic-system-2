import 'dart:async';
import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:web_socket_channel/web_socket_channel.dart';

class AssignmentTrackingSocketService {
  WebSocketChannel? _channel;
  StreamSubscription? _subscription;
  final StreamController<Map<String, dynamic>> _eventsController =
      StreamController<Map<String, dynamic>>.broadcast();

  final ValueNotifier<String> _status = ValueNotifier<String>('Desconectado');
  final ValueNotifier<String?> _error = ValueNotifier<String?>(null);

  Stream<Map<String, dynamic>> get events => _eventsController.stream;
  ValueListenable<String> get status => _status;
  ValueListenable<String?> get error => _error;
  bool get isConnected => _channel != null;

  Future<void> connect({required Uri socketUri, required String token}) async {
    await disconnect();
    _error.value = null;
    _status.value = 'Conectando...';
    final uri = _withToken(socketUri, token);
    _channel = WebSocketChannel.connect(uri);
    _subscription = _channel!.stream.listen(
      (event) {
        final decoded = _decodeEvent(event);
        _eventsController.add(decoded);
      },
      onError: (Object exception, StackTrace stackTrace) {
        _error.value = exception.toString();
        _status.value = 'Error';
      },
      onDone: () {
        _channel = null;
        _subscription = null;
        _status.value = 'Desconectado';
      },
      cancelOnError: true,
    );
    _status.value = 'Conectado';
  }

  Future<void> disconnect() async {
    await _subscription?.cancel();
    _subscription = null;
    await _channel?.sink.close();
    _channel = null;
    _status.value = 'Desconectado';
  }

  Future<void> sendLocation({
    required double latitude,
    required double longitude,
    double? heading,
    double? speedKmh,
  }) async {
    if (_channel == null) {
      throw StateError('Socket no conectado');
    }
    final payload = <String, dynamic>{
      'type': 'LOCATION_UPDATED',
      'latitude': latitude,
      'longitude': longitude,
    };
    if (heading != null) {
      payload['heading'] = heading;
    }
    if (speedKmh != null) {
      payload['speed_kmh'] = speedKmh;
    }
    _channel!.sink.add(jsonEncode(payload));
  }

  Map<String, dynamic> _decodeEvent(dynamic event) {
    if (event is Map<String, dynamic>) {
      return event;
    }
    if (event is String) {
      try {
        final decoded = jsonDecode(event);
        if (decoded is Map<String, dynamic>) return decoded;
        return <String, dynamic>{'type': 'RAW', 'payload': decoded.toString()};
      } catch (_) {
        return <String, dynamic>{'type': 'RAW', 'payload': event};
      }
    }
    return <String, dynamic>{'type': 'RAW', 'payload': event.toString()};
  }

  Uri _withToken(Uri uri, String token) {
    final query = Map<String, String>.from(uri.queryParameters);
    query['token'] = token;
    return uri.replace(queryParameters: query);
  }

  void dispose() {
    _subscription?.cancel();
    _channel?.sink.close();
    _eventsController.close();
    _status.dispose();
    _error.dispose();
  }
}

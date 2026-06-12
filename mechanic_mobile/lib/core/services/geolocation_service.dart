import 'dart:async';

import 'package:geolocator/geolocator.dart';

class GeolocationService {
  Future<Position> resolveCurrentPosition({
    Duration timeout = const Duration(seconds: 12),
  }) async {
    final enabled = await Geolocator.isLocationServiceEnabled();
    if (!enabled) {
      final lastKnown = await Geolocator.getLastKnownPosition();
      if (lastKnown != null) return lastKnown;
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

    try {
      return await Geolocator
          .getCurrentPosition(desiredAccuracy: LocationAccuracy.high)
          .timeout(timeout);
    } on TimeoutException {
      final lastKnown = await Geolocator.getLastKnownPosition();
      if (lastKnown != null) return lastKnown;
      rethrow;
    }
  }
}

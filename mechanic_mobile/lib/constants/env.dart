import 'package:flutter_dotenv/flutter_dotenv.dart';

class AppEnv {
  static String get appName => dotenv.env['APP_NAME'] ?? 'Auxilio Mecánico';

  static String get apiBaseUrl =>
      _normalize(dotenv.env['API_BASE_URL'] ?? 'http://localhost:8000');

  static String get apiToken => dotenv.env['API_TOKEN'] ?? '';

  static String get defaultTenantId => dotenv.env['DEFAULT_TENANT_ID'] ?? '';

  static String get mapTileUrl =>
      dotenv.env['MAP_TILE_URL'] ??
      'https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=Wz3sO6ej1k66cNR8Lzcr';

  static String get graphhopperApiKey =>
      dotenv.env['GRAPHHOPPER_API_KEY'] ?? '';

  static String get graphhopperBaseUrl =>
      _normalize(dotenv.env['GRAPHHOPPER_BASE_URL'] ?? 'https://graphhopper.com/api/1');

  static String get graphhopperProfile =>
      dotenv.env['GRAPHHOPPER_PROFILE'] ?? 'car';

  static Future<void> load() async {
    try {
      await dotenv.load(fileName: '.env');
    } catch (_) {
      // Se permite iniciar sin .env en desarrollo.
    }
  }

  static String _normalize(String value) {
    if (value.endsWith('/')) {
      return value.substring(0, value.length - 1);
    }
    return value;
  }
}

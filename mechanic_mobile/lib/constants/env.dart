import 'package:flutter_dotenv/flutter_dotenv.dart';

class AppEnv {
  static String get appName => dotenv.env['APP_NAME'] ?? 'Auxilio Mecánico';

  static String get apiBaseUrl =>
      _normalize(dotenv.env['API_BASE_URL'] ?? 'http://localhost:8000');

  static String get apiToken => dotenv.env['API_TOKEN'] ?? '';

  static String get defaultTenantId => dotenv.env['DEFAULT_TENANT_ID'] ?? '';

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

import 'package:dio/dio.dart';
import 'package:latlong2/latlong.dart';

import '../../constants/env.dart';

typedef GraphhopperRouteResult = ({
  List<LatLng> points,
  bool graphhopperUsed,
  String? warning,
});

class GraphhopperRouteService {
  GraphhopperRouteService({Dio? dio}) : _dio = dio ?? Dio();

  final Dio _dio;

  bool get isConfigured => AppEnv.graphhopperApiKey.trim().isNotEmpty;

  Future<GraphhopperRouteResult> buildRoute({
    required LatLng start,
    required LatLng end,
    String? profile,
  }) async {
    final direct = <LatLng>[start, end];
    if (_samePoint(start, end)) {
      return (points: <LatLng>[start], graphhopperUsed: false, warning: null);
    }
    if (!isConfigured) {
      return (
        points: direct,
        graphhopperUsed: false,
        warning:
            'GraphHopper no está configurado. Se muestra una línea directa de respaldo.',
      );
    }

    try {
      final body = <String, dynamic>{
        'points': [
          [start.longitude, start.latitude],
          [end.longitude, end.latitude],
        ],
        'profile': (profile ?? AppEnv.graphhopperProfile).trim(),
        'locale': 'es',
        'calc_points': true,
        'points_encoded': false,
        'instructions': false,
      };
      final uri = Uri.parse(
        '${AppEnv.graphhopperBaseUrl}/route',
      ).replace(queryParameters: {'key': AppEnv.graphhopperApiKey.trim()});
      final response = await _dio.postUri(
        uri,
        data: body,
        options: Options(
          contentType: Headers.jsonContentType,
          validateStatus: (_) => true,
        ),
      );
      if (response.statusCode == null || response.statusCode! >= 400) {
        final warning =
            _extractErrorMessage(response.data) ??
            'GraphHopper respondió con ${response.statusCode ?? 'sin código'}. Se usó una línea directa.';
        return (points: direct, graphhopperUsed: false, warning: warning);
      }
      final data = response.data;
      final coordinates = _extractCoordinates(data);
      if (coordinates.length < 2) {
        return (
          points: direct,
          graphhopperUsed: false,
          warning:
              'GraphHopper respondió sin una ruta válida. Se usó respaldo.',
        );
      }
      return (points: coordinates, graphhopperUsed: true, warning: null);
    } catch (error) {
      return (
        points: direct,
        graphhopperUsed: false,
        warning: _warningFromError(error),
      );
    }
  }

  bool _samePoint(LatLng a, LatLng b) {
    return a.latitude == b.latitude && a.longitude == b.longitude;
  }

  List<LatLng> _extractCoordinates(dynamic data) {
    if (data is! Map) return <LatLng>[];
    final paths = data['paths'];
    if (paths is! List || paths.isEmpty) return <LatLng>[];
    final first = paths.first;
    if (first is! Map) return <LatLng>[];
    final points = first['points'];
    if (points is! Map) return <LatLng>[];
    final coordinates = points['coordinates'];
    if (coordinates is! List) return <LatLng>[];
    final result = <LatLng>[];
    for (final coordinate in coordinates) {
      if (coordinate is List && coordinate.length >= 2) {
        final lng = _toDouble(coordinate[0]);
        final lat = _toDouble(coordinate[1]);
        if (lat != null && lng != null) {
          result.add(LatLng(lat, lng));
        }
      }
    }
    return result;
  }

  double? _toDouble(dynamic value) {
    if (value is num) return value.toDouble();
    return double.tryParse(value?.toString() ?? '');
  }

  String? _extractErrorMessage(dynamic data) {
    if (data is! Map) return null;
    final message = data['message'];
    if (message is String && message.trim().isNotEmpty) {
      return message.trim();
    }
    final hints = <String>[];
    final detail = data['detail'];
    if (detail is String && detail.trim().isNotEmpty) {
      hints.add(detail.trim());
    }
    final errors = data['errors'];
    if (errors is List && errors.isNotEmpty) {
      final first = errors.first;
      if (first is Map) {
        final errMsg = first['message'];
        if (errMsg is String && errMsg.trim().isNotEmpty) {
          hints.add(errMsg.trim());
        }
      }
    }
    if (hints.isEmpty) return null;
    return hints.join(' | ');
  }

  String _warningFromError(Object error) {
    final message = error.toString();
    if (message.contains('401')) {
      return 'GraphHopper rechazó la solicitud por autenticación. Revisa la API key.';
    }
    if (message.contains('403')) {
      return 'GraphHopper rechazó la solicitud por permisos. Revisa el plan o la API key.';
    }
    if (message.contains('429')) {
      return 'GraphHopper agotó el límite de consultas. Se usó una línea directa.';
    }
    if (message.contains('400') || message.contains('422')) {
      return 'GraphHopper respondió con datos inválidos. Se usó una línea directa.';
    }
    return 'No se pudo obtener la ruta en GraphHopper. Se usó una línea directa.';
  }
}

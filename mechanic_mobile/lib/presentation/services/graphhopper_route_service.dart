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
    String vehicle = 'car',
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
      final queryParametersAll = <String, List<String>>{
        'point': [
          '${start.latitude},${start.longitude}',
          '${end.latitude},${end.longitude}',
        ],
        'vehicle': [vehicle],
        'locale': ['es'],
        'calc_points': ['true'],
        'points_encoded': ['false'],
        'ch.disable': ['true'],
        'key': [AppEnv.graphhopperApiKey.trim()],
      };
      final uri = Uri.parse('${AppEnv.graphhopperBaseUrl}/route').replace(
        // queryParametersAll: queryParametersAll,
        queryParameters: queryParametersAll,
      );
      final response = await _dio.getUri(uri);
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
    } catch (_) {
      return (
        points: direct,
        graphhopperUsed: false,
        warning:
            'No se pudo obtener la ruta en GraphHopper. Se usó una línea directa.',
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
}

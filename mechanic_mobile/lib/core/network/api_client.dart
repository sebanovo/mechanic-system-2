import 'dart:convert';

import 'package:dio/dio.dart';

import '../error/failures.dart';
import '../services/session_storage.dart';

class ApiClient {
  ApiClient(this._sessionStorage)
    : _dio = Dio(
        BaseOptions(
          connectTimeout: const Duration(seconds: 20),
          receiveTimeout: const Duration(seconds: 20),
          sendTimeout: const Duration(seconds: 20),
          responseType: ResponseType.json,
          contentType: Headers.jsonContentType,
          validateStatus: (status) => status != null && status < 500,
        ),
      );

  final Dio _dio;
  final SessionStorage _sessionStorage;

  Future<Map<String, dynamic>> get(
    String path, {
    Map<String, dynamic>? queryParameters,
  }) {
    return _request('GET', path, queryParameters: queryParameters);
  }

  Future<Map<String, dynamic>> post(
    String path, {
    Object? data,
    Map<String, dynamic>? queryParameters,
  }) {
    return _request('POST', path, data: data, queryParameters: queryParameters);
  }

  Future<Map<String, dynamic>> put(
    String path, {
    Object? data,
    Map<String, dynamic>? queryParameters,
  }) {
    return _request('PUT', path, data: data, queryParameters: queryParameters);
  }

  Future<Map<String, dynamic>> patch(
    String path, {
    Object? data,
    Map<String, dynamic>? queryParameters,
  }) {
    return _request(
      'PATCH',
      path,
      data: data,
      queryParameters: queryParameters,
    );
  }

  Future<Map<String, dynamic>> delete(
    String path, {
    Object? data,
    Map<String, dynamic>? queryParameters,
  }) {
    return _request(
      'DELETE',
      path,
      data: data,
      queryParameters: queryParameters,
    );
  }

  Future<Map<String, dynamic>> _request(
    String method,
    String path, {
    Object? data,
    Map<String, dynamic>? queryParameters,
  }) async {
    try {
      final response = await _dio.request<dynamic>(
        _composeUrl(path),
        data: data,
        queryParameters: queryParameters,
        options: Options(method: method, headers: await _headers()),
      );

      final payload = _normalizePayload(response.data);
      final statusCode = response.statusCode ?? 0;

      if (statusCode != 200 || payload['success'] == false) {
        throw _buildFailure(payload, statusCode: statusCode);
      }

      return payload;
    } on DioException catch (error) {
      throw _mapDioException(error);
    } catch (error) {
      if (error is AppFailure) {
        rethrow;
      }
      throw UnknownFailure(error.toString());
    }
  }

  Future<Map<String, String>> _headers() async {
    final headers = <String, String>{
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    final token = _sessionStorage.apiToken;
    if (token.isNotEmpty) {
      headers['Authorization'] = 'Bearer $token';
    }

    return headers;
  }

  String _composeUrl(String path) {
    final baseUrl = _sessionStorage.apiBaseUrl;
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    return '$baseUrl${path.startsWith('/') ? '' : '/'}$path';
  }

  AppFailure _mapDioException(DioException error) {
    final statusCode = error.response?.statusCode;
    final payload = _normalizePayload(error.response?.data);
    final message =
        _extractMessage(payload) ??
        error.message ??
        'No se pudo conectar con el servidor';

    if (payload.isNotEmpty) {
      return _buildFailure(payload, statusCode: statusCode);
    }

    if (statusCode == 400 || statusCode == 422) {
      return ValidationFailure(message, code: statusCode);
    }

    if (statusCode != null && statusCode >= 500) {
      return ServerFailure(message, code: statusCode);
    }

    if (error.type == DioExceptionType.connectionTimeout ||
        error.type == DioExceptionType.sendTimeout ||
        error.type == DioExceptionType.receiveTimeout ||
        error.type == DioExceptionType.connectionError) {
      return NetworkFailure(message, code: statusCode);
    }

    return UnknownFailure(message, code: statusCode);
  }

  Map<String, dynamic> _normalizePayload(dynamic payload) {
    if (payload is Map<String, dynamic>) {
      return payload;
    }
    if (payload is Map) {
      return Map<String, dynamic>.from(payload);
    }
    if (payload is String && payload.isNotEmpty) {
      try {
        final decoded = jsonDecode(payload);
        if (decoded is Map<String, dynamic>) {
          return decoded;
        }
        if (decoded is Map) {
          return Map<String, dynamic>.from(decoded);
        }
      } catch (_) {
        return <String, dynamic>{'message': payload};
      }
    }
    return <String, dynamic>{};
  }

  AppFailure _buildFailure(Map<String, dynamic> payload, {int? statusCode}) {
    final apiFailure = ApiRequestFailure.fromJson(
      payload,
      statusCode: statusCode,
    );
    final code = apiFailure.errorCode?.toLowerCase();

    if (code == 'validation_error' || statusCode == 400 || statusCode == 422) {
      return ValidationFailure(apiFailure.toUserMessage(), code: statusCode);
    }

    if (code == 'unauthorized' || statusCode == 401) {
      return UnknownFailure(apiFailure.toUserMessage(), code: statusCode);
    }

    if (code == 'forbidden' || statusCode == 403) {
      return UnknownFailure(apiFailure.toUserMessage(), code: statusCode);
    }

    if (code == 'not_found' || statusCode == 404) {
      return UnknownFailure(apiFailure.toUserMessage(), code: statusCode);
    }

    if (code == 'conflict' || statusCode == 409) {
      return UnknownFailure(apiFailure.toUserMessage(), code: statusCode);
    }

    if (statusCode != null && statusCode >= 500) {
      return ServerFailure(apiFailure.toUserMessage(), code: statusCode);
    }

    return ApiRequestFailure(
      apiFailure.message, // ← Posicional (sin "message:")
      code: statusCode, // ← Nombrado (super.code)
      errorCode: apiFailure.errorCode,
      details: apiFailure.details,
      requestId: apiFailure.requestId,
      meta: apiFailure.meta,
      raw: apiFailure.raw,
    );
  }

  String? _extractMessage(dynamic payload) {
    if (payload is Map<String, dynamic>) {
      final message = payload['message'];
      if (message is String && message.isNotEmpty) {
        return message;
      }
      final error = payload['error'];
      if (error is Map) {
        final errorMessage = error['message'];
        if (errorMessage is String && errorMessage.isNotEmpty) {
          return errorMessage;
        }
      }
      if (error is String && error.isNotEmpty) {
        return error;
      }
    }

    if (payload is String && payload.isNotEmpty) {
      return payload;
    }

    return null;
  }
}

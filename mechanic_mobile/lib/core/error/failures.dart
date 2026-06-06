import 'package:equatable/equatable.dart';

class ApiErrorDetail extends Equatable {
  const ApiErrorDetail({required this.field, required this.message});

  final String field;
  final String message;

  factory ApiErrorDetail.fromJson(Map<String, dynamic> json) {
    return ApiErrorDetail(
      field: (json['field'] ?? '').toString(),
      message: (json['message'] ?? '').toString(),
    );
  }

  @override
  List<Object?> get props => [field, message];
}

class ApiErrorEnvelope extends Equatable {
  const ApiErrorEnvelope({
    required this.success,
    required this.message,
    this.code,
    this.details,
    this.requestId,
    this.meta,
  });

  final bool? success;
  final String message;
  final String? code;
  final List<ApiErrorDetail>? details;
  final String? requestId;
  final Map<String, dynamic>? meta;

  factory ApiErrorEnvelope.fromJson(Map<String, dynamic> json) {
    final error = json['error'];
    final errorMap = error is Map
        ? Map<String, dynamic>.from(error)
        : <String, dynamic>{};
    final detailsRaw = errorMap['details'];
    final details = detailsRaw is List
        ? detailsRaw
              .whereType<Map>()
              .map(
                (item) =>
                    ApiErrorDetail.fromJson(Map<String, dynamic>.from(item)),
              )
              .toList()
        : null;
    final metaRaw = json['meta'];
    final metaMap = metaRaw is Map ? Map<String, dynamic>.from(metaRaw) : null;

    return ApiErrorEnvelope(
      success: json['success'] is bool ? json['success'] as bool : null,
      message: (json['message'] ?? 'Error inesperado').toString(),
      code: errorMap['code']?.toString(),
      details: details,
      requestId: metaMap?['request_id']?.toString(),
      meta: metaMap,
    );
  }

  @override
  List<Object?> get props => [success, message, code, details, requestId, meta];
}

abstract class AppFailure extends Equatable implements Exception {
  const AppFailure(this.message, {this.code});

  final String message;
  final int? code;

  @override
  List<Object?> get props => [message, code];

  @override
  String toString() => '$runtimeType(message: $message, code: $code)';
}

class NetworkFailure extends AppFailure {
  const NetworkFailure(super.message, {super.code});
}

class ServerFailure extends AppFailure {
  const ServerFailure(super.message, {super.code});
}

class ValidationFailure extends AppFailure {
  const ValidationFailure(super.message, {super.code});
}

class CacheFailure extends AppFailure {
  const CacheFailure(super.message, {super.code});
}

class UnknownFailure extends AppFailure {
  const UnknownFailure(super.message, {super.code});
}

class ApiRequestFailure extends AppFailure {
  const ApiRequestFailure(
    super.message, { // ✅ Posicional (como espera AppFailure)
    super.code, // ✅ Nombrado (como espera AppFailure)
    this.errorCode,
    this.details,
    this.requestId,
    this.meta,
    this.raw,
  });

  final String? errorCode;
  final List<ApiErrorDetail>? details;
  final String? requestId;
  final Map<String, dynamic>? meta;
  final Map<String, dynamic>? raw;

  factory ApiRequestFailure.fromJson(
    Map<String, dynamic> json, {
    int? statusCode,
  }) {
    final envelope = ApiErrorEnvelope.fromJson(json);
    return ApiRequestFailure(
      envelope.message,
      code: statusCode,
      errorCode: envelope.code,
      details: envelope.details,
      requestId: envelope.requestId,
      meta: envelope.meta,
      raw: json,
    );
  }

  String toUserMessage() {
    final buffer = StringBuffer(message);
    final detailsList = details;
    if (detailsList != null && detailsList.isNotEmpty) {
      for (final item in detailsList) {
        final field = item.field.trim();
        final detailMessage = item.message.trim();
        if (field.isNotEmpty && detailMessage.isNotEmpty) {
          buffer.writeln();
          buffer.write('$field: $detailMessage');
        } else if (detailMessage.isNotEmpty) {
          buffer.writeln();
          buffer.write(detailMessage);
        }
      }
    }
    if (requestId != null && requestId!.isNotEmpty) {
      buffer.writeln();
      buffer.write('ID: $requestId');
    }
    return buffer.toString().trim();
  }

  @override
  List<Object?> get props => [
    message,
    code,
    errorCode,
    details,
    requestId,
    meta,
    raw,
  ];
}

String appFailureMessage(Object error) {
  if (error is ApiRequestFailure) {
    return error.toUserMessage();
  }
  if (error is AppFailure) {
    return error.message;
  }
  return error.toString();
}

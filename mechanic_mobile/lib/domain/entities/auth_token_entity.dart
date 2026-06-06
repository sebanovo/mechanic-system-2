import 'package:equatable/equatable.dart';

class AuthTokenEntity extends Equatable {
  const AuthTokenEntity({
    required this.accessToken,
    required this.accessExpiresAt,
    required this.refreshToken,
    required this.refreshExpiresAt,
    this.tokenType,
    this.raw = const <String, dynamic>{},
  });

  final String accessToken;
  final DateTime? accessExpiresAt;
  final String refreshToken;
  final DateTime? refreshExpiresAt;
  final String? tokenType;
  final Map<String, dynamic> raw;

  @override
  List<Object?> get props => [
        accessToken,
        accessExpiresAt,
        refreshToken,
        refreshExpiresAt,
        tokenType,
        raw,
      ];
}

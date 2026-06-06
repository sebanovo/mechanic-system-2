import 'package:equatable/equatable.dart';

class ClientEntity extends Equatable {
  const ClientEntity({
    required this.id,
    required this.email,
    required this.firstName,
    required this.lastName,
    required this.userType,
    required this.status,
    required this.emailVerified,
    required this.createdAt,
    required this.updatedAt,
    this.phone,
    this.avatarUrl,
    this.emailVerifiedAt,
    this.lastLoginAt,
    this.passwordChangedAt,
    this.deletedAt,
    this.raw = const <String, dynamic>{},
  });

  final String id;
  final String email;
  final String firstName;
  final String lastName;
  final String? phone;
  final String? avatarUrl;
  final String userType;
  final String status;
  final bool emailVerified;
  final DateTime? emailVerifiedAt;
  final DateTime? lastLoginAt;
  final DateTime? passwordChangedAt;
  final DateTime? createdAt;
  final DateTime? updatedAt;
  final DateTime? deletedAt;
  final Map<String, dynamic> raw;

  String get fullName => '$firstName $lastName'.trim();

  @override
  List<Object?> get props => [
        id,
        email,
        firstName,
        lastName,
        phone,
        avatarUrl,
        userType,
        status,
        emailVerified,
        emailVerifiedAt,
        lastLoginAt,
        passwordChangedAt,
        createdAt,
        updatedAt,
        deletedAt,
        raw,
      ];
}

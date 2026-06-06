import 'package:equatable/equatable.dart';

class AuthTenantEntity extends Equatable {
  const AuthTenantEntity({
    required this.id,
    required this.slug,
    required this.commercialName,
    required this.tenantKind,
    required this.status,
    this.raw = const <String, dynamic>{},
  });

  final String id;
  final String slug;
  final String commercialName;
  final String tenantKind;
  final String status;
  final Map<String, dynamic> raw;

  @override
  List<Object?> get props => [id, slug, commercialName, tenantKind, status, raw];
}

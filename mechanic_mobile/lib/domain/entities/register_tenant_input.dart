import 'package:equatable/equatable.dart';

class RegisterTenantInput extends Equatable {
  const RegisterTenantInput({
    required this.email,
    required this.password,
    required this.firstName,
    required this.lastName,
    required this.commercialName,
    required this.tenantKind,
  });

  final String email;
  final String password;
  final String firstName;
  final String lastName;
  final String commercialName;
  final String tenantKind;

  Map<String, dynamic> toJson() => {
        'email': email,
        'password': password,
        'first_name': firstName,
        'last_name': lastName,
        'commercial_name': commercialName,
        'tenant_kind': tenantKind,
      };

  @override
  List<Object?> get props => [
        email,
        password,
        firstName,
        lastName,
        commercialName,
        tenantKind,
      ];
}

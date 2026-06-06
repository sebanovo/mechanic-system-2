import 'package:equatable/equatable.dart';

class RegisterClientInput extends Equatable {
  const RegisterClientInput({
    required this.email,
    required this.password,
    required this.firstName,
    required this.lastName,
  });

  final String email;
  final String password;
  final String firstName;
  final String lastName;

  Map<String, dynamic> toJson() => {
        'email': email,
        'password': password,
        'first_name': firstName,
        'last_name': lastName,
      };

  @override
  List<Object?> get props => [email, password, firstName, lastName];
}

import 'package:equatable/equatable.dart';

class LoginInput extends Equatable {
  const LoginInput({
    required this.email,
    required this.password,
  });

  final String email;
  final String password;

  Map<String, dynamic> toJson() => {
        'email': email,
        'password': password,
      };

  @override
  List<Object?> get props => [email, password];
}

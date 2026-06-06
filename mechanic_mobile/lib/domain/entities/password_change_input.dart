import 'package:equatable/equatable.dart';

class PasswordChangeInput extends Equatable {
  const PasswordChangeInput({
    required this.currentPassword,
    required this.newPassword,
  });

  final String currentPassword;
  final String newPassword;

  Map<String, dynamic> toJson() => {
        'current_password': currentPassword,
        'new_password': newPassword,
      };

  @override
  List<Object?> get props => [currentPassword, newPassword];
}

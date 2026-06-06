import 'package:equatable/equatable.dart';

class ClientUpdateInput extends Equatable {
  const ClientUpdateInput({
    this.firstName,
    this.lastName,
    this.phone,
    this.avatarUrl,
  });

  final String? firstName;
  final String? lastName;
  final String? phone;
  final String? avatarUrl;

  Map<String, dynamic> toJson() {
    final payload = <String, dynamic>{};
    if (firstName != null) payload['first_name'] = firstName;
    if (lastName != null) payload['last_name'] = lastName;
    if (phone != null) payload['phone'] = phone;
    if (avatarUrl != null) payload['avatar_url'] = avatarUrl;
    return payload;
  }

  @override
  List<Object?> get props => [firstName, lastName, phone, avatarUrl];
}

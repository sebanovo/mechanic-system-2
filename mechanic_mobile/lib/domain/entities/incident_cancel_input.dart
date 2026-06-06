import 'package:equatable/equatable.dart';

class IncidentCancelInput extends Equatable {
  const IncidentCancelInput({this.cancellationReason});

  final String? cancellationReason;

  Map<String, dynamic> toJson() {
    final payload = <String, dynamic>{};
    if (cancellationReason != null && cancellationReason!.isNotEmpty) {
      payload['cancellation_reason'] = cancellationReason;
    }
    return payload;
  }

  @override
  List<Object?> get props => [cancellationReason];
}

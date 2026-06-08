import '../../repositories/notification_repository.dart';

class MarkAllMyNotificationsAsReadUseCase {
  MarkAllMyNotificationsAsReadUseCase(this._repository);

  final NotificationRepository _repository;

  Future<Map<String, dynamic>> call() =>
      _repository.markAllMyNotificationsAsRead();
}

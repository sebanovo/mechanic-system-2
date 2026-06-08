import '../../repositories/notification_repository.dart';

class MarkMyNotificationAsReadUseCase {
  MarkMyNotificationAsReadUseCase(this._repository);

  final NotificationRepository _repository;

  Future<Map<String, dynamic>> call(String notificationId) =>
      _repository.markMyNotificationAsRead(notificationId);
}

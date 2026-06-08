import '../../repositories/notification_repository.dart';

class RegisterMyNotificationDeviceUseCase {
  RegisterMyNotificationDeviceUseCase(this._repository);

  final NotificationRepository _repository;

  Future<Map<String, dynamic>> call(Map<String, dynamic> payload) =>
      _repository.registerMyNotificationDevice(payload);
}

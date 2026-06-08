import '../../repositories/notification_repository.dart';

class RevokeMyNotificationDeviceUseCase {
  RevokeMyNotificationDeviceUseCase(this._repository);

  final NotificationRepository _repository;

  Future<Map<String, dynamic>> call(String deviceId) =>
      _repository.revokeMyNotificationDevice(deviceId);
}

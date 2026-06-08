import '../entities/app_entities.dart';

abstract class NotificationRepository {
  Future<PagedResult<Map<String, dynamic>>> listMyNotifications({
    String? status,
    int? page,
    int? pageSize,
  });

  Future<Map<String, dynamic>> markMyNotificationAsRead(String notificationId);

  Future<Map<String, dynamic>> markAllMyNotificationsAsRead();

  Future<PagedResult<Map<String, dynamic>>> listMyNotificationDevices({
    String? status,
    int? page,
    int? pageSize,
  });

  Future<Map<String, dynamic>> registerMyNotificationDevice(
    Map<String, dynamic> payload,
  );

  Future<Map<String, dynamic>> revokeMyNotificationDevice(String deviceId);
}

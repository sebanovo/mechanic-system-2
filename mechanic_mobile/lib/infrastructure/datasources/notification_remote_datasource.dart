import '../../core/network/api_client.dart';

class NotificationRemoteDataSource {
  NotificationRemoteDataSource(this._apiClient);

  final ApiClient _apiClient;

  Future<Map<String, dynamic>> listMyNotifications({
    String? status,
    int? page,
    int? pageSize,
  }) =>
      _apiClient.get(
        '/api/notifications',
        queryParameters: _query(
          status: status,
          page: page,
          pageSize: pageSize,
        ),
      );

  Future<Map<String, dynamic>> markMyNotificationAsRead(String notificationId) =>
      _apiClient.patch('/api/notifications/$notificationId/read');

  Future<Map<String, dynamic>> markAllMyNotificationsAsRead() =>
      _apiClient.patch('/api/notifications/read-all');

  Future<Map<String, dynamic>> listMyNotificationDevices({
    String? status,
    int? page,
    int? pageSize,
  }) =>
      _apiClient.get(
        '/api/notification/devices',
        queryParameters: _query(
          status: status,
          page: page,
          pageSize: pageSize,
        ),
      );

  Future<Map<String, dynamic>> registerMyNotificationDevice(
    Map<String, dynamic> payload,
  ) =>
      _apiClient.post('/api/notification/devices', data: payload);

  Future<Map<String, dynamic>> revokeMyNotificationDevice(String deviceId) =>
      _apiClient.delete('/api/notification/devices/$deviceId');

  Map<String, dynamic> _query({
    String? status,
    int? page,
    int? pageSize,
  }) {
    final query = <String, dynamic>{};
    if (status != null && status.isNotEmpty) query['status'] = status;
    if (page != null) query['page'] = page;
    if (pageSize != null) query['page_size'] = pageSize;
    return query;
  }
}

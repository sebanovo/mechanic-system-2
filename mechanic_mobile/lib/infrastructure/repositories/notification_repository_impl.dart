import '../../domain/entities/app_entities.dart';
import '../../domain/repositories/notification_repository.dart';
import '../datasources/notification_remote_datasource.dart';
import '../models/app_model_utils.dart';
import '../models/pagination_model.dart';

class NotificationRepositoryImpl implements NotificationRepository {
  NotificationRepositoryImpl(this._remoteDataSource);

  final NotificationRemoteDataSource _remoteDataSource;

  Map<String, dynamic> _data(Map<String, dynamic> response) {
    final raw = response['data'];
    return raw is Map ? Map<String, dynamic>.from(raw) : <String, dynamic>{};
  }

  PagedResult<Map<String, dynamic>> _paged(Map<String, dynamic> response) {
    final data = _data(response);
    return PagedResult<Map<String, dynamic>>(
      items: listMapOf(data['items']),
      pagination: PaginationModel.fromJson(mapOf(data['pagination'])),
    );
  }

  @override
  Future<PagedResult<Map<String, dynamic>>> listMyNotifications({
    String? status,
    int? page,
    int? pageSize,
  }) async {
    return _paged(
      await _remoteDataSource.listMyNotifications(
        status: status,
        page: page,
        pageSize: pageSize,
      ),
    );
  }

  @override
  Future<Map<String, dynamic>> markMyNotificationAsRead(
    String notificationId,
  ) async {
    return _data(await _remoteDataSource.markMyNotificationAsRead(notificationId));
  }

  @override
  Future<Map<String, dynamic>> markAllMyNotificationsAsRead() async {
    return _data(await _remoteDataSource.markAllMyNotificationsAsRead());
  }

  @override
  Future<PagedResult<Map<String, dynamic>>> listMyNotificationDevices({
    String? status,
    int? page,
    int? pageSize,
  }) async {
    return _paged(
      await _remoteDataSource.listMyNotificationDevices(
        status: status,
        page: page,
        pageSize: pageSize,
      ),
    );
  }

  @override
  Future<Map<String, dynamic>> registerMyNotificationDevice(
    Map<String, dynamic> payload,
  ) async {
    return _data(await _remoteDataSource.registerMyNotificationDevice(payload));
  }

  @override
  Future<Map<String, dynamic>> revokeMyNotificationDevice(
    String deviceId,
  ) async {
    return _data(await _remoteDataSource.revokeMyNotificationDevice(deviceId));
  }
}

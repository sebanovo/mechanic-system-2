import 'package:device_info_plus/device_info_plus.dart';
import 'package:flutter/foundation.dart';
import 'package:package_info_plus/package_info_plus.dart';

import '../../core/error/failures.dart';
import '../../domain/entities/app_entities.dart';
import '../../domain/usecases/app_usecases.dart';
import '../services/notification_service.dart';

class NotificationsViewModel extends ChangeNotifier {
  NotificationsViewModel({
    required ListMyNotificationsUseCase listMyNotifications,
    required MarkMyNotificationAsReadUseCase markMyNotificationAsRead,
    required MarkAllMyNotificationsAsReadUseCase markAllMyNotificationsAsRead,
    required ListMyNotificationDevicesUseCase listMyNotificationDevices,
    required RegisterMyNotificationDeviceUseCase registerMyNotificationDevice,
    required RevokeMyNotificationDeviceUseCase revokeMyNotificationDevice,
    required NotificationService notificationService,
  })  : _listMyNotifications = listMyNotifications,
        _markMyNotificationAsRead = markMyNotificationAsRead,
        _markAllMyNotificationsAsRead = markAllMyNotificationsAsRead,
        _listMyNotificationDevices = listMyNotificationDevices,
        _registerMyNotificationDevice = registerMyNotificationDevice,
        _revokeMyNotificationDevice = revokeMyNotificationDevice,
        _notificationService = notificationService;

  final ListMyNotificationsUseCase _listMyNotifications;
  final MarkMyNotificationAsReadUseCase _markMyNotificationAsRead;
  final MarkAllMyNotificationsAsReadUseCase _markAllMyNotificationsAsRead;
  final ListMyNotificationDevicesUseCase _listMyNotificationDevices;
  final RegisterMyNotificationDeviceUseCase _registerMyNotificationDevice;
  final RevokeMyNotificationDeviceUseCase _revokeMyNotificationDevice;
  final NotificationService _notificationService;

  PagedResult<Map<String, dynamic>>? notifications;
  PagedResult<Map<String, dynamic>>? devices;
  bool loading = false;
  bool registering = false;
  bool loaded = false;
  bool devicesLoaded = false;
  String? error;
  String? message;

  Future<void> loadNotifications() async {
    loading = true;
    error = null;
    notifyListeners();
    try {
      notifications = await _listMyNotifications(page: 1, pageSize: 20);
    } catch (exception) {
      error = appFailureMessage(exception);
    } finally {
      loading = false;
      loaded = true;
      notifyListeners();
    }
  }

  Future<void> loadDevices() async {
    loading = true;
    error = null;
    notifyListeners();
    try {
      devices = await _listMyNotificationDevices(page: 1, pageSize: 20);
    } catch (exception) {
      error = appFailureMessage(exception);
    } finally {
      loading = false;
      devicesLoaded = true;
      notifyListeners();
    }
  }

  Future<void> refresh() async {
    await Future.wait<void>([
      loadNotifications(),
      loadDevices(),
    ]);
  }

  Future<bool> markRead(String notificationId) async {
    registering = true;
    error = null;
    notifyListeners();
    try {
      await _markMyNotificationAsRead(notificationId);
      await loadNotifications();
      message = 'Notificación marcada como leída';
      return true;
    } catch (exception) {
      error = appFailureMessage(exception);
      return false;
    } finally {
      registering = false;
      notifyListeners();
    }
  }

  Future<bool> markAllRead() async {
    registering = true;
    error = null;
    notifyListeners();
    try {
      await _markAllMyNotificationsAsRead();
      await loadNotifications();
      message = 'Todas las notificaciones fueron marcadas como leídas';
      return true;
    } catch (exception) {
      error = appFailureMessage(exception);
      return false;
    } finally {
      registering = false;
      notifyListeners();
    }
  }

  Future<bool> registerCurrentDevice() async {
    registering = true;
    error = null;
    notifyListeners();
    try {
      await _notificationService.initialize();
      final token = await _notificationService.getDeviceToken();
      if (token == null || token.isEmpty) {
        throw StateError('No se pudo obtener el token de Firebase.');
      }
      final info = await _deviceMetadata();
      await _registerMyNotificationDevice({
        'device_token': token,
        'platform': info['platform'],
        'device_name': info['device_name'],
        'app_version': info['app_version'],
        'os_version': info['os_version'],
      });
      await loadDevices();
      message = 'Dispositivo registrado';
      return true;
    } catch (exception) {
      error = appFailureMessage(exception);
      return false;
    } finally {
      registering = false;
      notifyListeners();
    }
  }

  Future<bool> revokeDevice(String deviceId) async {
    registering = true;
    error = null;
    notifyListeners();
    try {
      await _revokeMyNotificationDevice(deviceId);
      await loadDevices();
      message = 'Dispositivo revocado';
      return true;
    } catch (exception) {
      error = appFailureMessage(exception);
      return false;
    } finally {
      registering = false;
      notifyListeners();
    }
  }

  Future<Map<String, String>> _deviceMetadata() async {
    final packageInfo = await PackageInfo.fromPlatform();
    final deviceInfo = DeviceInfoPlugin();
    if (kIsWeb) {
      final web = await deviceInfo.webBrowserInfo;
      return {
        'platform': 'WEB',
        'device_name': web.browserName.name,
        'app_version': packageInfo.version,
        'os_version': web.userAgent ?? 'web',
      };
    }

    if (defaultTargetPlatform == TargetPlatform.android) {
      final android = await deviceInfo.androidInfo;
      return {
        'platform': 'ANDROID',
        'device_name': '${android.manufacturer} ${android.model}',
        'app_version': packageInfo.version,
        'os_version': android.version.release,
      };
    }

    if (defaultTargetPlatform == TargetPlatform.iOS) {
      final ios = await deviceInfo.iosInfo;
      return {
        'platform': 'IOS',
        'device_name': ios.name,
        'app_version': packageInfo.version,
        'os_version': ios.systemVersion,
      };
    }

    return {
      'platform': 'ANDROID',
      'device_name': packageInfo.appName,
      'app_version': packageInfo.version,
      'os_version': 'unknown',
    };
  }
}

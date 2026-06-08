import 'dart:math';

import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';

@pragma('vm:entry-point')
Future<void> firebaseMessagingBackgroundHandler(RemoteMessage message) async {
  try {
    await Firebase.initializeApp();
  } catch (_) {
    // If Firebase cannot be initialized here, continue without crashing.
  }
}

class NotificationService {
  NotificationService();

  final FlutterLocalNotificationsPlugin _localNotifications =
      FlutterLocalNotificationsPlugin();
  bool _initialized = false;

  Future<void> initialize() async {
    if (_initialized) return;

    try {
      if (Firebase.apps.isEmpty) {
        await Firebase.initializeApp();
      }
      FirebaseMessaging.onBackgroundMessage(firebaseMessagingBackgroundHandler);
      await FirebaseMessaging.instance.requestPermission(
        alert: true,
        badge: true,
        sound: true,
        provisional: false,
      );
      await FirebaseMessaging.instance
          .setForegroundNotificationPresentationOptions(
            alert: true,
            badge: true,
            sound: true,
          );
      FirebaseMessaging.onMessage.listen(_onForegroundMessage);
      FirebaseMessaging.onMessageOpenedApp.listen(_onOpenedMessage);
    } catch (_) {
      // Firebase is best-effort here. The app can still run with local notifications.
    }

    try {
      const android = AndroidInitializationSettings('@mipmap/ic_launcher');
      const settings = InitializationSettings(android: android);
      await _localNotifications.initialize(settings: settings);
    } catch (_) {
      // Local notifications are also best-effort in web/test environments.
    }
    _initialized = true;
  }

  Future<String?> getDeviceToken() async {
    try {
      await initialize();
      return FirebaseMessaging.instance.getToken();
    } catch (_) {
      return null;
    }
  }

  Future<void> showBasic({
    required int id,
    required String title,
    required String body,
  }) async {
    try {
      await initialize();
      const details = NotificationDetails(
        android: AndroidNotificationDetails(
          'mechanic_mobile',
          'Mechanic Mobile',
          channelDescription: 'Notificaciones de la app de auxilio mecánico',
          importance: Importance.high,
          priority: Priority.high,
        ),
      );

      await _localNotifications.show(
        id: id,
        title: title,
        body: body,
        notificationDetails: details,
      );
    } catch (_) {
      // Never block the app because of notification rendering issues.
    }
  }

  Future<void> showFromData(Map<String, dynamic> data) async {
    try {
      final title =
          _string(data['notification_title']) ??
          _string(data['title']) ??
          _string(data['message']) ??
          'Notificación';
      final body =
          _string(data['notification_body']) ??
          _string(data['body']) ??
          _string(data['message']) ??
          '';
      await showBasic(id: _stableId(data), title: title, body: body);
    } catch (_) {
      // Ignore malformed payloads.
    }
  }

  void _onForegroundMessage(RemoteMessage message) {
    showFromData(message.data);
  }

  void _onOpenedMessage(RemoteMessage message) {
    // Hook for navigation/deeplinks later. Keep no-op to avoid crashes.
  }

  int _stableId(Map<String, dynamic> data) {
    final raw =
        _string(data['notification_id']) ??
        _string(data['id']) ??
        _string(data['notification_type']) ??
        DateTime.now().millisecondsSinceEpoch.toString();
    return raw.hashCode.abs() % pow(2, 31).toInt();
  }

  String? _string(Object? value) {
    final text = value?.toString().trim();
    if (text == null || text.isEmpty || text == 'null') return null;
    return text;
  }
}

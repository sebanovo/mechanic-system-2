import 'package:flutter/material.dart';

import 'app/app.dart';
import 'constants/env.dart';
import 'core/di/injection_container.dart';
import 'presentation/services/notification_service.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await AppEnv.load();
  await configureDependencies();
  await sl<NotificationService>().initialize();
  runApp(const MechanicMobileApp());
}

import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';

import 'app/app.dart';
import 'constants/env.dart';
import 'core/di/injection_container.dart';
import 'firebase_options.dart';
import 'presentation/services/notification_service.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await AppEnv.load();
  await configureDependencies();
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
  await sl<NotificationService>().initialize();
  runApp(const MechanicMobileApp());
}

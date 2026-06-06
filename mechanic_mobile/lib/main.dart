import 'package:flutter/material.dart';

import 'app/app.dart';
import 'constants/env.dart';
import 'core/di/injection_container.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await AppEnv.load();
  await configureDependencies();
  runApp(const MechanicMobileApp());
}

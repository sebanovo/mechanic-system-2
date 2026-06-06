import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../app/theme/app_theme.dart';
import '../constants/env.dart';
import '../core/di/injection_container.dart';
import '../core/routes/app_routes.dart';
import '../core/services/session_storage.dart';
import '../presentation/viewmodels/auth_viewmodel.dart';
import '../presentation/viewmodels/app_viewmodels.dart';

class MechanicMobileApp extends StatelessWidget {
  const MechanicMobileApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider.value(value: sl<AppShellViewModel>()),
        ChangeNotifierProvider.value(value: sl<AuthViewModel>()),
        ChangeNotifierProvider.value(value: sl<ProfileViewModel>()),
        ChangeNotifierProvider.value(value: sl<SessionsViewModel>()),
        ChangeNotifierProvider.value(value: sl<VehiclesViewModel>()),
        ChangeNotifierProvider.value(value: sl<IncidentsViewModel>()),
        ChangeNotifierProvider.value(value: sl<SessionStorage>()),
      ],
      child: MaterialApp.router(
        title: AppEnv.appName,
        debugShowCheckedModeBanner: false,
        theme: AppTheme.light(),
        routerConfig: appRouter,
      ),
    );
  }
}

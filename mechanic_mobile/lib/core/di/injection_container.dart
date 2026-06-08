import 'package:get_it/get_it.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../network/api_client.dart';
import '../services/session_storage.dart';
import '../../domain/repositories/app_repositories.dart';
import '../../domain/repositories/auth_repository.dart';
import '../../domain/repositories/tenant_repository.dart';
import '../../domain/usecases/auth_usecases.dart';
import '../../domain/usecases/app_usecases.dart';
import '../../infrastructure/datasources/auth_remote_datasource.dart';
import '../../infrastructure/datasources/client_remote_datasource.dart';
import '../../infrastructure/datasources/tenant_remote_datasource.dart';
import '../../infrastructure/repositories/auth_repository_impl.dart';
import '../../infrastructure/repositories/app_repository_impl.dart';
import '../../infrastructure/repositories/tenant_repository_impl.dart';
import '../../presentation/services/notification_service.dart';
import '../../presentation/viewmodels/auth_viewmodel.dart';
import '../../presentation/viewmodels/app_viewmodels.dart';

final sl = GetIt.instance;

Future<void> configureDependencies() async {
  final preferences = await SharedPreferences.getInstance();

  sl.registerSingleton<SharedPreferences>(preferences);
  sl.registerLazySingleton<SessionStorage>(() => SessionStorage(preferences));
  await sl<SessionStorage>().load();

  sl.registerLazySingleton<ApiClient>(() => ApiClient(sl<SessionStorage>()));
  sl.registerLazySingleton<AuthRemoteDataSource>(
    () => AuthRemoteDataSource(sl<ApiClient>()),
  );
  sl.registerLazySingleton<ClientRemoteDataSource>(
    () => ClientRemoteDataSource(sl<ApiClient>()),
  );
  sl.registerLazySingleton<TenantRemoteDataSource>(
    () => TenantRemoteDataSource(sl<ApiClient>()),
  );
  sl.registerLazySingleton<NotificationService>(() => NotificationService());

  sl.registerLazySingleton<AuthRepository>(
    () => AuthRepositoryImpl(sl<AuthRemoteDataSource>(), sl<SessionStorage>()),
  );

  sl.registerLazySingleton<ClientRepository>(
    () => ClientRepositoryImpl(sl<ClientRemoteDataSource>()),
  );
  sl.registerLazySingleton<TenantRepository>(
    () => TenantRepositoryImpl(sl<TenantRemoteDataSource>()),
  );
  sl.registerLazySingleton<SessionRepository>(
    () => sl<ClientRepository>() as SessionRepository,
  );
  sl.registerLazySingleton<VehicleRepository>(
    () => sl<ClientRepository>() as VehicleRepository,
  );
  sl.registerLazySingleton<IncidentRepository>(
    () => sl<ClientRepository>() as IncidentRepository,
  );

  sl.registerLazySingleton<GetMyProfileUseCase>(
    () => GetMyProfileUseCase(sl<ClientRepository>()),
  );
  sl.registerLazySingleton<UpdateMyProfileUseCase>(
    () => UpdateMyProfileUseCase(sl<ClientRepository>()),
  );
  sl.registerLazySingleton<ChangePasswordUseCase>(
    () => ChangePasswordUseCase(sl<ClientRepository>()),
  );
  sl.registerLazySingleton<ListMySessionsUseCase>(
    () => ListMySessionsUseCase(sl<SessionRepository>()),
  );
  sl.registerLazySingleton<RevokeSessionUseCase>(
    () => RevokeSessionUseCase(sl<SessionRepository>()),
  );
  sl.registerLazySingleton<ListMyVehiclesUseCase>(
    () => ListMyVehiclesUseCase(sl<VehicleRepository>()),
  );
  sl.registerLazySingleton<CreateVehicleUseCase>(
    () => CreateVehicleUseCase(sl<VehicleRepository>()),
  );
  sl.registerLazySingleton<GetVehicleUseCase>(
    () => GetVehicleUseCase(sl<VehicleRepository>()),
  );
  sl.registerLazySingleton<UpdateVehicleUseCase>(
    () => UpdateVehicleUseCase(sl<VehicleRepository>()),
  );
  sl.registerLazySingleton<DeleteVehicleUseCase>(
    () => DeleteVehicleUseCase(sl<VehicleRepository>()),
  );
  sl.registerLazySingleton<ChangeVehicleStatusUseCase>(
    () => ChangeVehicleStatusUseCase(sl<VehicleRepository>()),
  );
  sl.registerLazySingleton<ListMyIncidentsUseCase>(
    () => ListMyIncidentsUseCase(sl<IncidentRepository>()),
  );
  sl.registerLazySingleton<CreateIncidentUseCase>(
    () => CreateIncidentUseCase(sl<IncidentRepository>()),
  );
  sl.registerLazySingleton<GetIncidentUseCase>(
    () => GetIncidentUseCase(sl<IncidentRepository>()),
  );
  sl.registerLazySingleton<UpdateIncidentUseCase>(
    () => UpdateIncidentUseCase(sl<IncidentRepository>()),
  );
  sl.registerLazySingleton<CancelIncidentUseCase>(
    () => CancelIncidentUseCase(sl<IncidentRepository>()),
  );
  sl.registerLazySingleton<LoginUseCase>(
    () => LoginUseCase(sl<AuthRepository>()),
  );
  sl.registerLazySingleton<RegisterClientUseCase>(
    () => RegisterClientUseCase(sl<AuthRepository>()),
  );
  sl.registerLazySingleton<RegisterTenantUseCase>(
    () => RegisterTenantUseCase(sl<AuthRepository>()),
  );
  sl.registerLazySingleton<SelectTenantUseCase>(
    () => SelectTenantUseCase(sl<AuthRepository>()),
  );
  sl.registerLazySingleton<RefreshAuthUseCase>(
    () => RefreshAuthUseCase(sl<AuthRepository>()),
  );
  sl.registerLazySingleton<LogoutUseCase>(
    () => LogoutUseCase(sl<AuthRepository>()),
  );
  sl.registerLazySingleton<MeAuthUseCase>(
    () => MeAuthUseCase(sl<AuthRepository>()),
  );

  sl.registerLazySingleton<AppShellViewModel>(() => AppShellViewModel());
  sl.registerLazySingleton<AuthViewModel>(() => AuthViewModel(
        login: sl<LoginUseCase>(),
        registerClient: sl<RegisterClientUseCase>(),
        registerTenant: sl<RegisterTenantUseCase>(),
        selectTenant: sl<SelectTenantUseCase>(),
        refreshAuth: sl<RefreshAuthUseCase>(),
        logout: sl<LogoutUseCase>(),
        meAuth: sl<MeAuthUseCase>(),
        sessionStorage: sl<SessionStorage>(),
      ));
  sl.registerLazySingleton<TenantViewModel>(
    () => TenantViewModel(sl<TenantRepository>(), sl<AuthViewModel>()),
  );
  sl.registerLazySingleton<ProfileViewModel>(() => ProfileViewModel(
        getMyProfile: sl<GetMyProfileUseCase>(),
        updateMyProfile: sl<UpdateMyProfileUseCase>(),
        changePassword: sl<ChangePasswordUseCase>(),
      ));
  sl.registerLazySingleton<SessionsViewModel>(() => SessionsViewModel(
        listMySessions: sl<ListMySessionsUseCase>(),
        revokeSession: sl<RevokeSessionUseCase>(),
      ));
  sl.registerLazySingleton<VehiclesViewModel>(() => VehiclesViewModel(
        listMyVehicles: sl<ListMyVehiclesUseCase>(),
        createVehicle: sl<CreateVehicleUseCase>(),
        getVehicle: sl<GetVehicleUseCase>(),
        updateVehicle: sl<UpdateVehicleUseCase>(),
        deleteVehicle: sl<DeleteVehicleUseCase>(),
        changeVehicleStatus: sl<ChangeVehicleStatusUseCase>(),
      ));
  sl.registerLazySingleton<IncidentsViewModel>(() => IncidentsViewModel(
        listMyIncidents: sl<ListMyIncidentsUseCase>(),
        createIncident: sl<CreateIncidentUseCase>(),
        getIncident: sl<GetIncidentUseCase>(),
        updateIncident: sl<UpdateIncidentUseCase>(),
        cancelIncident: sl<CancelIncidentUseCase>(),
      ));
}

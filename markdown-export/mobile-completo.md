# Mobile completo

Codigo completo de la aplicacion mobile (mechanic_mobile).

Generado: 2026-04-28 22:36:49
Total de archivos incluidos: 248

## Indice

- [mechanic_mobile/.dockerignore](#mechanicmobiledockerignore)
- [mechanic_mobile/.env.sample](#mechanicmobileenvsample)
- [mechanic_mobile/.gitignore](#mechanicmobilegitignore)
- [mechanic_mobile/.metadata](#mechanicmobilemetadata)
- [mechanic_mobile/analysis_options.yaml](#mechanicmobileanalysisoptionsyaml)
- [mechanic_mobile/android/.gitignore](#mechanicmobileandroidgitignore)
- [mechanic_mobile/android/app/build.gradle.kts](#mechanicmobileandroidappbuildgradlekts)
- [mechanic_mobile/android/app/src/debug/AndroidManifest.xml](#mechanicmobileandroidappsrcdebugandroidmanifestxml)
- [mechanic_mobile/android/app/src/main/AndroidManifest.xml](#mechanicmobileandroidappsrcmainandroidmanifestxml)
- [mechanic_mobile/android/app/src/main/kotlin/com/example/mechanic_mobile/MainActivity.kt](#mechanicmobileandroidappsrcmainkotlincomexamplemechanicmobilemainactivitykt)
- [mechanic_mobile/android/app/src/main/res/drawable-v21/launch_background.xml](#mechanicmobileandroidappsrcmainresdrawable-v21launchbackgroundxml)
- [mechanic_mobile/android/app/src/main/res/drawable/launch_background.xml](#mechanicmobileandroidappsrcmainresdrawablelaunchbackgroundxml)
- [mechanic_mobile/android/app/src/main/res/values-night/styles.xml](#mechanicmobileandroidappsrcmainresvalues-nightstylesxml)
- [mechanic_mobile/android/app/src/main/res/values/styles.xml](#mechanicmobileandroidappsrcmainresvaluesstylesxml)
- [mechanic_mobile/android/app/src/profile/AndroidManifest.xml](#mechanicmobileandroidappsrcprofileandroidmanifestxml)
- [mechanic_mobile/android/build.gradle.kts](#mechanicmobileandroidbuildgradlekts)
- [mechanic_mobile/android/gradle.properties](#mechanicmobileandroidgradleproperties)
- [mechanic_mobile/android/gradle/wrapper/gradle-wrapper.properties](#mechanicmobileandroidgradlewrappergradle-wrapperproperties)
- [mechanic_mobile/android/settings.gradle.kts](#mechanicmobileandroidsettingsgradlekts)
- [mechanic_mobile/devtools_options.yaml](#mechanicmobiledevtoolsoptionsyaml)
- [mechanic_mobile/Dockerfile.prod](#mechanicmobiledockerfileprod)
- [mechanic_mobile/ios/.gitignore](#mechanicmobileiosgitignore)
- [mechanic_mobile/ios/Flutter/AppFrameworkInfo.plist](#mechanicmobileiosflutterappframeworkinfoplist)
- [mechanic_mobile/ios/Flutter/Debug.xcconfig](#mechanicmobileiosflutterdebugxcconfig)
- [mechanic_mobile/ios/Flutter/Release.xcconfig](#mechanicmobileiosflutterreleasexcconfig)
- [mechanic_mobile/ios/Runner.xcodeproj/project.pbxproj](#mechanicmobileiosrunnerxcodeprojprojectpbxproj)
- [mechanic_mobile/ios/Runner.xcodeproj/project.xcworkspace/contents.xcworkspacedata](#mechanicmobileiosrunnerxcodeprojprojectxcworkspacecontentsxcworkspacedata)
- [mechanic_mobile/ios/Runner.xcodeproj/project.xcworkspace/xcshareddata/IDEWorkspaceChecks.plist](#mechanicmobileiosrunnerxcodeprojprojectxcworkspacexcshareddataideworkspacechecksplist)
- [mechanic_mobile/ios/Runner.xcodeproj/project.xcworkspace/xcshareddata/WorkspaceSettings.xcsettings](#mechanicmobileiosrunnerxcodeprojprojectxcworkspacexcshareddataworkspacesettingsxcsettings)
- [mechanic_mobile/ios/Runner.xcodeproj/xcshareddata/xcschemes/Runner.xcscheme](#mechanicmobileiosrunnerxcodeprojxcshareddataxcschemesrunnerxcscheme)
- [mechanic_mobile/ios/Runner.xcworkspace/contents.xcworkspacedata](#mechanicmobileiosrunnerxcworkspacecontentsxcworkspacedata)
- [mechanic_mobile/ios/Runner.xcworkspace/xcshareddata/IDEWorkspaceChecks.plist](#mechanicmobileiosrunnerxcworkspacexcshareddataideworkspacechecksplist)
- [mechanic_mobile/ios/Runner.xcworkspace/xcshareddata/WorkspaceSettings.xcsettings](#mechanicmobileiosrunnerxcworkspacexcshareddataworkspacesettingsxcsettings)
- [mechanic_mobile/ios/Runner/AppDelegate.swift](#mechanicmobileiosrunnerappdelegateswift)
- [mechanic_mobile/ios/Runner/Assets.xcassets/AppIcon.appiconset/Contents.json](#mechanicmobileiosrunnerassetsxcassetsappiconappiconsetcontentsjson)
- [mechanic_mobile/ios/Runner/Assets.xcassets/LaunchImage.imageset/Contents.json](#mechanicmobileiosrunnerassetsxcassetslaunchimageimagesetcontentsjson)
- [mechanic_mobile/ios/Runner/Assets.xcassets/LaunchImage.imageset/README.md](#mechanicmobileiosrunnerassetsxcassetslaunchimageimagesetreadmemd)
- [mechanic_mobile/ios/Runner/Base.lproj/LaunchScreen.storyboard](#mechanicmobileiosrunnerbaselprojlaunchscreenstoryboard)
- [mechanic_mobile/ios/Runner/Base.lproj/Main.storyboard](#mechanicmobileiosrunnerbaselprojmainstoryboard)
- [mechanic_mobile/ios/Runner/Info.plist](#mechanicmobileiosrunnerinfoplist)
- [mechanic_mobile/ios/Runner/Runner-Bridging-Header.h](#mechanicmobileiosrunnerrunner-bridging-headerh)
- [mechanic_mobile/ios/RunnerTests/RunnerTests.swift](#mechanicmobileiosrunnertestsrunnertestsswift)
- [mechanic_mobile/lib/constants/env.dart](#mechanicmobilelibconstantsenvdart)
- [mechanic_mobile/lib/core/di/injection_container.dart](#mechanicmobilelibcorediinjectioncontainerdart)
- [mechanic_mobile/lib/core/error/failures.dart](#mechanicmobilelibcoreerrorfailuresdart)
- [mechanic_mobile/lib/core/network/api_client.dart](#mechanicmobilelibcorenetworkapiclientdart)
- [mechanic_mobile/lib/core/routes/app_routes.dart](#mechanicmobilelibcoreroutesapproutesdart)
- [mechanic_mobile/lib/domain/entities/admin_incident.dart](#mechanicmobilelibdomainentitiesadminincidentdart)
- [mechanic_mobile/lib/domain/entities/catalog_service.dart](#mechanicmobilelibdomainentitiescatalogservicedart)
- [mechanic_mobile/lib/domain/entities/device_token.dart](#mechanicmobilelibdomainentitiesdevicetokendart)
- [mechanic_mobile/lib/domain/entities/evidence.dart](#mechanicmobilelibdomainentitiesevidencedart)
- [mechanic_mobile/lib/domain/entities/incident.dart](#mechanicmobilelibdomainentitiesincidentdart)
- [mechanic_mobile/lib/domain/entities/provider_candidate.dart](#mechanicmobilelibdomainentitiesprovidercandidatedart)
- [mechanic_mobile/lib/domain/entities/provider_operation.dart](#mechanicmobilelibdomainentitiesprovideroperationdart)
- [mechanic_mobile/lib/domain/entities/provider_profile.dart](#mechanicmobilelibdomainentitiesproviderprofiledart)
- [mechanic_mobile/lib/domain/entities/provider_summary.dart](#mechanicmobilelibdomainentitiesprovidersummarydart)
- [mechanic_mobile/lib/domain/entities/service_request.dart](#mechanicmobilelibdomainentitiesservicerequestdart)
- [mechanic_mobile/lib/domain/entities/technician.dart](#mechanicmobilelibdomainentitiestechniciandart)
- [mechanic_mobile/lib/domain/entities/tracking.dart](#mechanicmobilelibdomainentitiestrackingdart)
- [mechanic_mobile/lib/domain/entities/user.dart](#mechanicmobilelibdomainentitiesuserdart)
- [mechanic_mobile/lib/domain/entities/vehicle.dart](#mechanicmobilelibdomainentitiesvehicledart)
- [mechanic_mobile/lib/domain/repositories/admin_incident_repository_impl.dart](#mechanicmobilelibdomainrepositoriesadminincidentrepositoryimpldart)
- [mechanic_mobile/lib/domain/repositories/auth_repository.dart](#mechanicmobilelibdomainrepositoriesauthrepositorydart)
- [mechanic_mobile/lib/domain/repositories/service_request_repository.dart](#mechanicmobilelibdomainrepositoriesservicerequestrepositorydart)
- [mechanic_mobile/lib/domain/repositories/vehicle_repository.dart](#mechanicmobilelibdomainrepositoriesvehiclerepositorydart)
- [mechanic_mobile/lib/domain/usecases/accept_candidate_usecase.dart](#mechanicmobilelibdomainusecasesacceptcandidateusecasedart)
- [mechanic_mobile/lib/domain/usecases/add_file_evidence_usecase.dart](#mechanicmobilelibdomainusecasesaddfileevidenceusecasedart)
- [mechanic_mobile/lib/domain/usecases/add_text_evidence_usecase.dart](#mechanicmobilelibdomainusecasesaddtextevidenceusecasedart)
- [mechanic_mobile/lib/domain/usecases/cancel_incident_usecase.dart](#mechanicmobilelibdomainusecasescancelincidentusecasedart)
- [mechanic_mobile/lib/domain/usecases/cancel_service_usecase.dart](#mechanicmobilelibdomainusecasescancelserviceusecasedart)
- [mechanic_mobile/lib/domain/usecases/complete_service_usecase.dart](#mechanicmobilelibdomainusecasescompleteserviceusecasedart)
- [mechanic_mobile/lib/domain/usecases/create_incident_usecase.dart](#mechanicmobilelibdomainusecasescreateincidentusecasedart)
- [mechanic_mobile/lib/domain/usecases/create_provider_service_usecase.dart](#mechanicmobilelibdomainusecasescreateproviderserviceusecasedart)
- [mechanic_mobile/lib/domain/usecases/create_technician_usecase.dart](#mechanicmobilelibdomainusecasescreatetechnicianusecasedart)
- [mechanic_mobile/lib/domain/usecases/create_vehicle_usecase.dart](#mechanicmobilelibdomainusecasescreatevehicleusecasedart)
- [mechanic_mobile/lib/domain/usecases/dispatch_incident_usecase.dart](#mechanicmobilelibdomainusecasesdispatchincidentusecasedart)
- [mechanic_mobile/lib/domain/usecases/get_active_operations_usecase.dart](#mechanicmobilelibdomainusecasesgetactiveoperationsusecasedart)
- [mechanic_mobile/lib/domain/usecases/get_all_incidents_usecase.dart](#mechanicmobilelibdomainusecasesgetallincidentsusecasedart)
- [mechanic_mobile/lib/domain/usecases/get_available_candidates_usecase.dart](#mechanicmobilelibdomainusecasesgetavailablecandidatesusecasedart)
- [mechanic_mobile/lib/domain/usecases/get_candidate_details_usecase.dart](#mechanicmobilelibdomainusecasesgetcandidatedetailsusecasedart)
- [mechanic_mobile/lib/domain/usecases/get_catalog_services_usecase.dart](#mechanicmobilelibdomainusecasesgetcatalogservicesusecasedart)
- [mechanic_mobile/lib/domain/usecases/get_incident_candidates_usecase.dart](#mechanicmobilelibdomainusecasesgetincidentcandidatesusecasedart)
- [mechanic_mobile/lib/domain/usecases/get_incident_details_usecase.dart](#mechanicmobilelibdomainusecasesgetincidentdetailsusecasedart)
- [mechanic_mobile/lib/domain/usecases/get_live_tracking_usecase.dart](#mechanicmobilelibdomainusecasesgetlivetrackingusecasedart)
- [mechanic_mobile/lib/domain/usecases/get_me_usecase.dart](#mechanicmobilelibdomainusecasesgetmeusecasedart)
- [mechanic_mobile/lib/domain/usecases/get_my_devices_usecase.dart](#mechanicmobilelibdomainusecasesgetmydevicesusecasedart)
- [mechanic_mobile/lib/domain/usecases/get_my_incidents_usecase.dart](#mechanicmobilelibdomainusecasesgetmyincidentsusecasedart)
- [mechanic_mobile/lib/domain/usecases/get_my_profile_usecase.dart](#mechanicmobilelibdomainusecasesgetmyprofileusecasedart)
- [mechanic_mobile/lib/domain/usecases/get_my_vehicles_usecase.dart](#mechanicmobilelibdomainusecasesgetmyvehiclesusecasedart)
- [mechanic_mobile/lib/domain/usecases/get_operation_state_usecase.dart](#mechanicmobilelibdomainusecasesgetoperationstateusecasedart)
- [mechanic_mobile/lib/domain/usecases/get_provider_profile_usecase.dart](#mechanicmobilelibdomainusecasesgetproviderprofileusecasedart)
- [mechanic_mobile/lib/domain/usecases/get_provider_services_usecase.dart](#mechanicmobilelibdomainusecasesgetproviderservicesusecasedart)
- [mechanic_mobile/lib/domain/usecases/get_providers_usecase.dart](#mechanicmobilelibdomainusecasesgetprovidersusecasedart)
- [mechanic_mobile/lib/domain/usecases/get_service_requests_usecase.dart](#mechanicmobilelibdomainusecasesgetservicerequestsusecasedart)
- [mechanic_mobile/lib/domain/usecases/get_technicians_usecase.dart](#mechanicmobilelibdomainusecasesgettechniciansusecasedart)
- [mechanic_mobile/lib/domain/usecases/get_tracking_history_usecase.dart](#mechanicmobilelibdomainusecasesgettrackinghistoryusecasedart)
- [mechanic_mobile/lib/domain/usecases/get_vehicle_by_id_usecase.dart](#mechanicmobilelibdomainusecasesgetvehiclebyidusecasedart)
- [mechanic_mobile/lib/domain/usecases/login_usecase.dart](#mechanicmobilelibdomainusecasesloginusecasedart)
- [mechanic_mobile/lib/domain/usecases/mark_arrived_usecase.dart](#mechanicmobilelibdomainusecasesmarkarrivedusecasedart)
- [mechanic_mobile/lib/domain/usecases/publish_incident_usecase.dart](#mechanicmobilelibdomainusecasespublishincidentusecasedart)
- [mechanic_mobile/lib/domain/usecases/refresh_route_usecase.dart](#mechanicmobilelibdomainusecasesrefreshrouteusecasedart)
- [mechanic_mobile/lib/domain/usecases/register_device_usecase.dart](#mechanicmobilelibdomainusecasesregisterdeviceusecasedart)
- [mechanic_mobile/lib/domain/usecases/register_usecase.dart](#mechanicmobilelibdomainusecasesregisterusecasedart)
- [mechanic_mobile/lib/domain/usecases/reject_candidate_usecase.dart](#mechanicmobilelibdomainusecasesrejectcandidateusecasedart)
- [mechanic_mobile/lib/domain/usecases/report_location_usecase.dart](#mechanicmobilelibdomainusecasesreportlocationusecasedart)
- [mechanic_mobile/lib/domain/usecases/start_service_usecase.dart](#mechanicmobilelibdomainusecasesstartserviceusecasedart)
- [mechanic_mobile/lib/domain/usecases/unregister_device_usecase.dart](#mechanicmobilelibdomainusecasesunregisterdeviceusecasedart)
- [mechanic_mobile/lib/domain/usecases/update_incident_usecase.dart](#mechanicmobilelibdomainusecasesupdateincidentusecasedart)
- [mechanic_mobile/lib/domain/usecases/update_my_profile_usecase.dart](#mechanicmobilelibdomainusecasesupdatemyprofileusecasedart)
- [mechanic_mobile/lib/domain/usecases/update_provider_profile_usecase.dart](#mechanicmobilelibdomainusecasesupdateproviderprofileusecasedart)
- [mechanic_mobile/lib/domain/usecases/update_technician_usecase.dart](#mechanicmobilelibdomainusecasesupdatetechnicianusecasedart)
- [mechanic_mobile/lib/domain/usecases/update_vehicle_usecase.dart](#mechanicmobilelibdomainusecasesupdatevehicleusecasedart)
- [mechanic_mobile/lib/infrastructure/datasources/admin_incident_remote_data_source.dart](#mechanicmobilelibinfrastructuredatasourcesadminincidentremotedatasourcedart)
- [mechanic_mobile/lib/infrastructure/datasources/auth_remote_data_source.dart](#mechanicmobilelibinfrastructuredatasourcesauthremotedatasourcedart)
- [mechanic_mobile/lib/infrastructure/datasources/catalog_remote_data_source.dart](#mechanicmobilelibinfrastructuredatasourcescatalogremotedatasourcedart)
- [mechanic_mobile/lib/infrastructure/datasources/evidence_remote_data_source.dart](#mechanicmobilelibinfrastructuredatasourcesevidenceremotedatasourcedart)
- [mechanic_mobile/lib/infrastructure/datasources/incident_remote_data_source.dart](#mechanicmobilelibinfrastructuredatasourcesincidentremotedatasourcedart)
- [mechanic_mobile/lib/infrastructure/datasources/notification_remote_data_source.dart](#mechanicmobilelibinfrastructuredatasourcesnotificationremotedatasourcedart)
- [mechanic_mobile/lib/infrastructure/datasources/provider_admin_remote_data_source.dart](#mechanicmobilelibinfrastructuredatasourcesprovideradminremotedatasourcedart)
- [mechanic_mobile/lib/infrastructure/datasources/provider_assignment_remote_data_source.dart](#mechanicmobilelibinfrastructuredatasourcesproviderassignmentremotedatasourcedart)
- [mechanic_mobile/lib/infrastructure/datasources/provider_operation_remote_data_source.dart](#mechanicmobilelibinfrastructuredatasourcesprovideroperationremotedatasourcedart)
- [mechanic_mobile/lib/infrastructure/datasources/provider_remote_data_source.dart](#mechanicmobilelibinfrastructuredatasourcesproviderremotedatasourcedart)
- [mechanic_mobile/lib/infrastructure/datasources/technician_datasource.dart](#mechanicmobilelibinfrastructuredatasourcestechniciandatasourcedart)
- [mechanic_mobile/lib/infrastructure/datasources/tracking_remote_data_source.dart](#mechanicmobilelibinfrastructuredatasourcestrackingremotedatasourcedart)
- [mechanic_mobile/lib/infrastructure/datasources/vehicle_remote_data_source.dart](#mechanicmobilelibinfrastructuredatasourcesvehicleremotedatasourcedart)
- [mechanic_mobile/lib/infrastructure/models/admin_incident_model.dart](#mechanicmobilelibinfrastructuremodelsadminincidentmodeldart)
- [mechanic_mobile/lib/infrastructure/models/catalog_service_model.dart](#mechanicmobilelibinfrastructuremodelscatalogservicemodeldart)
- [mechanic_mobile/lib/infrastructure/models/device_token_model.dart](#mechanicmobilelibinfrastructuremodelsdevicetokenmodeldart)
- [mechanic_mobile/lib/infrastructure/models/evidence_model.dart](#mechanicmobilelibinfrastructuremodelsevidencemodeldart)
- [mechanic_mobile/lib/infrastructure/models/incident_model.dart](#mechanicmobilelibinfrastructuremodelsincidentmodeldart)
- [mechanic_mobile/lib/infrastructure/models/provider_candidate_model.dart](#mechanicmobilelibinfrastructuremodelsprovidercandidatemodeldart)
- [mechanic_mobile/lib/infrastructure/models/provider_operation_model.dart](#mechanicmobilelibinfrastructuremodelsprovideroperationmodeldart)
- [mechanic_mobile/lib/infrastructure/models/provider_profile_model.dart](#mechanicmobilelibinfrastructuremodelsproviderprofilemodeldart)
- [mechanic_mobile/lib/infrastructure/models/provider_summary_model.dart](#mechanicmobilelibinfrastructuremodelsprovidersummarymodeldart)
- [mechanic_mobile/lib/infrastructure/models/service_request_model.dart](#mechanicmobilelibinfrastructuremodelsservicerequestmodeldart)
- [mechanic_mobile/lib/infrastructure/models/technician_model.dart](#mechanicmobilelibinfrastructuremodelstechnicianmodeldart)
- [mechanic_mobile/lib/infrastructure/models/tracking_model.dart](#mechanicmobilelibinfrastructuremodelstrackingmodeldart)
- [mechanic_mobile/lib/infrastructure/models/user_model.dart](#mechanicmobilelibinfrastructuremodelsusermodeldart)
- [mechanic_mobile/lib/infrastructure/models/vehicle_model.dart](#mechanicmobilelibinfrastructuremodelsvehiclemodeldart)
- [mechanic_mobile/lib/infrastructure/repositories/admin_incident_repository_impl.dart](#mechanicmobilelibinfrastructurerepositoriesadminincidentrepositoryimpldart)
- [mechanic_mobile/lib/infrastructure/repositories/auth_repository_impl.dart](#mechanicmobilelibinfrastructurerepositoriesauthrepositoryimpldart)
- [mechanic_mobile/lib/infrastructure/repositories/catalog_repository_impl.dart](#mechanicmobilelibinfrastructurerepositoriescatalogrepositoryimpldart)
- [mechanic_mobile/lib/infrastructure/repositories/evidence_repository_impl.dart](#mechanicmobilelibinfrastructurerepositoriesevidencerepositoryimpldart)
- [mechanic_mobile/lib/infrastructure/repositories/incident_repository_impl.dart](#mechanicmobilelibinfrastructurerepositoriesincidentrepositoryimpldart)
- [mechanic_mobile/lib/infrastructure/repositories/notification_repository_impl.dart](#mechanicmobilelibinfrastructurerepositoriesnotificationrepositoryimpldart)
- [mechanic_mobile/lib/infrastructure/repositories/provider_admin_repository_impl.dart](#mechanicmobilelibinfrastructurerepositoriesprovideradminrepositoryimpldart)
- [mechanic_mobile/lib/infrastructure/repositories/provider_assignment_repository_impl.dart](#mechanicmobilelibinfrastructurerepositoriesproviderassignmentrepositoryimpldart)
- [mechanic_mobile/lib/infrastructure/repositories/provider_operation_repository_impl.dart](#mechanicmobilelibinfrastructurerepositoriesprovideroperationrepositoryimpldart)
- [mechanic_mobile/lib/infrastructure/repositories/provider_repository_impl.dart](#mechanicmobilelibinfrastructurerepositoriesproviderrepositoryimpldart)
- [mechanic_mobile/lib/infrastructure/repositories/technician_repository_impl.dart](#mechanicmobilelibinfrastructurerepositoriestechnicianrepositoryimpldart)
- [mechanic_mobile/lib/infrastructure/repositories/tracking_repository_impl.dart](#mechanicmobilelibinfrastructurerepositoriestrackingrepositoryimpldart)
- [mechanic_mobile/lib/infrastructure/repositories/vehicle_repository_impl.dart](#mechanicmobilelibinfrastructurerepositoriesvehiclerepositoryimpldart)
- [mechanic_mobile/lib/main.dart](#mechanicmobilelibmaindart)
- [mechanic_mobile/lib/presentation/pages/add_evidence_page.dart](#mechanicmobilelibpresentationpagesaddevidencepagedart)
- [mechanic_mobile/lib/presentation/pages/admin_incident_detail_page.dart](#mechanicmobilelibpresentationpagesadminincidentdetailpagedart)
- [mechanic_mobile/lib/presentation/pages/admin_incidents_page.dart](#mechanicmobilelibpresentationpagesadminincidentspagedart)
- [mechanic_mobile/lib/presentation/pages/admin_providers_page.dart](#mechanicmobilelibpresentationpagesadminproviderspagedart)
- [mechanic_mobile/lib/presentation/pages/catalog_services_page.dart](#mechanicmobilelibpresentationpagescatalogservicespagedart)
- [mechanic_mobile/lib/presentation/pages/client_tracking_page.dart](#mechanicmobilelibpresentationpagesclienttrackingpagedart)
- [mechanic_mobile/lib/presentation/pages/create_incident_page.dart](#mechanicmobilelibpresentationpagescreateincidentpagedart)
- [mechanic_mobile/lib/presentation/pages/devices_page.dart](#mechanicmobilelibpresentationpagesdevicespagedart)
- [mechanic_mobile/lib/presentation/pages/home_page.dart](#mechanicmobilelibpresentationpageshomepagedart)
- [mechanic_mobile/lib/presentation/pages/incident_detail_page.dart](#mechanicmobilelibpresentationpagesincidentdetailpagedart)
- [mechanic_mobile/lib/presentation/pages/incidents_page.dart](#mechanicmobilelibpresentationpagesincidentspagedart)
- [mechanic_mobile/lib/presentation/pages/login_page.dart](#mechanicmobilelibpresentationpagesloginpagedart)
- [mechanic_mobile/lib/presentation/pages/map_page.dart](#mechanicmobilelibpresentationpagesmappagedart)
- [mechanic_mobile/lib/presentation/pages/platform_tracking_page.dart](#mechanicmobilelibpresentationpagesplatformtrackingpagedart)
- [mechanic_mobile/lib/presentation/pages/provider_active_operations_page.dart](#mechanicmobilelibpresentationpagesprovideractiveoperationspagedart)
- [mechanic_mobile/lib/presentation/pages/provider_available_requests_page.dart](#mechanicmobilelibpresentationpagesprovideravailablerequestspagedart)
- [mechanic_mobile/lib/presentation/pages/provider_operation_detail_page.dart](#mechanicmobilelibpresentationpagesprovideroperationdetailpagedart)
- [mechanic_mobile/lib/presentation/pages/provider_profile_page.dart](#mechanicmobilelibpresentationpagesproviderprofilepagedart)
- [mechanic_mobile/lib/presentation/pages/provider_tracking_page.dart](#mechanicmobilelibpresentationpagesprovidertrackingpagedart)
- [mechanic_mobile/lib/presentation/pages/register_page.dart](#mechanicmobilelibpresentationpagesregisterpagedart)
- [mechanic_mobile/lib/presentation/pages/request_detail_page.dart](#mechanicmobilelibpresentationpagesrequestdetailpagedart)
- [mechanic_mobile/lib/presentation/pages/technicians_page.dart](#mechanicmobilelibpresentationpagestechnicianspagedart)
- [mechanic_mobile/lib/presentation/pages/vehicles_page.dart](#mechanicmobilelibpresentationpagesvehiclespagedart)
- [mechanic_mobile/lib/presentation/services/notification_service.dart](#mechanicmobilelibpresentationservicesnotificationservicedart)
- [mechanic_mobile/lib/presentation/viewmodels/admin_incidents_viewmodel.dart](#mechanicmobilelibpresentationviewmodelsadminincidentsviewmodeldart)
- [mechanic_mobile/lib/presentation/viewmodels/admin_providers_viewmodel.dart](#mechanicmobilelibpresentationviewmodelsadminprovidersviewmodeldart)
- [mechanic_mobile/lib/presentation/viewmodels/auth_viewmodel.dart](#mechanicmobilelibpresentationviewmodelsauthviewmodeldart)
- [mechanic_mobile/lib/presentation/viewmodels/catalog_services_viewmodel.dart](#mechanicmobilelibpresentationviewmodelscatalogservicesviewmodeldart)
- [mechanic_mobile/lib/presentation/viewmodels/client_tracking_viewmodel.dart](#mechanicmobilelibpresentationviewmodelsclienttrackingviewmodeldart)
- [mechanic_mobile/lib/presentation/viewmodels/evidence_viewmodel.dart](#mechanicmobilelibpresentationviewmodelsevidenceviewmodeldart)
- [mechanic_mobile/lib/presentation/viewmodels/home_viewmodel.dart](#mechanicmobilelibpresentationviewmodelshomeviewmodeldart)
- [mechanic_mobile/lib/presentation/viewmodels/incidents_viewmodel.dart](#mechanicmobilelibpresentationviewmodelsincidentsviewmodeldart)
- [mechanic_mobile/lib/presentation/viewmodels/platform_tracking_viewmodel.dart](#mechanicmobilelibpresentationviewmodelsplatformtrackingviewmodeldart)
- [mechanic_mobile/lib/presentation/viewmodels/provider_available_requests_viewmodel.dart](#mechanicmobilelibpresentationviewmodelsprovideravailablerequestsviewmodeldart)
- [mechanic_mobile/lib/presentation/viewmodels/provider_operation_viewmodel.dart](#mechanicmobilelibpresentationviewmodelsprovideroperationviewmodeldart)
- [mechanic_mobile/lib/presentation/viewmodels/provider_profile_viewmodel.dart](#mechanicmobilelibpresentationviewmodelsproviderprofileviewmodeldart)
- [mechanic_mobile/lib/presentation/viewmodels/provider_tracking_viewmodel.dart](#mechanicmobilelibpresentationviewmodelsprovidertrackingviewmodeldart)
- [mechanic_mobile/lib/presentation/viewmodels/technicians_viewmodel.dart](#mechanicmobilelibpresentationviewmodelstechniciansviewmodeldart)
- [mechanic_mobile/lib/presentation/viewmodels/vehicle_viewmodel.dart](#mechanicmobilelibpresentationviewmodelsvehicleviewmodeldart)
- [mechanic_mobile/linux/.gitignore](#mechanicmobilelinuxgitignore)
- [mechanic_mobile/linux/CMakeLists.txt](#mechanicmobilelinuxcmakeliststxt)
- [mechanic_mobile/linux/flutter/CMakeLists.txt](#mechanicmobilelinuxfluttercmakeliststxt)
- [mechanic_mobile/linux/flutter/generated_plugin_registrant.cc](#mechanicmobilelinuxfluttergeneratedpluginregistrantcc)
- [mechanic_mobile/linux/flutter/generated_plugin_registrant.h](#mechanicmobilelinuxfluttergeneratedpluginregistranth)
- [mechanic_mobile/linux/flutter/generated_plugins.cmake](#mechanicmobilelinuxfluttergeneratedpluginscmake)
- [mechanic_mobile/linux/runner/CMakeLists.txt](#mechanicmobilelinuxrunnercmakeliststxt)
- [mechanic_mobile/linux/runner/main.cc](#mechanicmobilelinuxrunnermaincc)
- [mechanic_mobile/linux/runner/my_application.cc](#mechanicmobilelinuxrunnermyapplicationcc)
- [mechanic_mobile/linux/runner/my_application.h](#mechanicmobilelinuxrunnermyapplicationh)
- [mechanic_mobile/macos/.gitignore](#mechanicmobilemacosgitignore)
- [mechanic_mobile/macos/Flutter/Flutter-Debug.xcconfig](#mechanicmobilemacosflutterflutter-debugxcconfig)
- [mechanic_mobile/macos/Flutter/Flutter-Release.xcconfig](#mechanicmobilemacosflutterflutter-releasexcconfig)
- [mechanic_mobile/macos/Flutter/GeneratedPluginRegistrant.swift](#mechanicmobilemacosfluttergeneratedpluginregistrantswift)
- [mechanic_mobile/macos/Runner.xcodeproj/project.pbxproj](#mechanicmobilemacosrunnerxcodeprojprojectpbxproj)
- [mechanic_mobile/macos/Runner.xcodeproj/project.xcworkspace/xcshareddata/IDEWorkspaceChecks.plist](#mechanicmobilemacosrunnerxcodeprojprojectxcworkspacexcshareddataideworkspacechecksplist)
- [mechanic_mobile/macos/Runner.xcodeproj/xcshareddata/xcschemes/Runner.xcscheme](#mechanicmobilemacosrunnerxcodeprojxcshareddataxcschemesrunnerxcscheme)
- [mechanic_mobile/macos/Runner.xcworkspace/contents.xcworkspacedata](#mechanicmobilemacosrunnerxcworkspacecontentsxcworkspacedata)
- [mechanic_mobile/macos/Runner.xcworkspace/xcshareddata/IDEWorkspaceChecks.plist](#mechanicmobilemacosrunnerxcworkspacexcshareddataideworkspacechecksplist)
- [mechanic_mobile/macos/Runner/AppDelegate.swift](#mechanicmobilemacosrunnerappdelegateswift)
- [mechanic_mobile/macos/Runner/Assets.xcassets/AppIcon.appiconset/Contents.json](#mechanicmobilemacosrunnerassetsxcassetsappiconappiconsetcontentsjson)
- [mechanic_mobile/macos/Runner/Base.lproj/MainMenu.xib](#mechanicmobilemacosrunnerbaselprojmainmenuxib)
- [mechanic_mobile/macos/Runner/Configs/AppInfo.xcconfig](#mechanicmobilemacosrunnerconfigsappinfoxcconfig)
- [mechanic_mobile/macos/Runner/Configs/Debug.xcconfig](#mechanicmobilemacosrunnerconfigsdebugxcconfig)
- [mechanic_mobile/macos/Runner/Configs/Release.xcconfig](#mechanicmobilemacosrunnerconfigsreleasexcconfig)
- [mechanic_mobile/macos/Runner/Configs/Warnings.xcconfig](#mechanicmobilemacosrunnerconfigswarningsxcconfig)
- [mechanic_mobile/macos/Runner/DebugProfile.entitlements](#mechanicmobilemacosrunnerdebugprofileentitlements)
- [mechanic_mobile/macos/Runner/Info.plist](#mechanicmobilemacosrunnerinfoplist)
- [mechanic_mobile/macos/Runner/MainFlutterWindow.swift](#mechanicmobilemacosrunnermainflutterwindowswift)
- [mechanic_mobile/macos/Runner/Release.entitlements](#mechanicmobilemacosrunnerreleaseentitlements)
- [mechanic_mobile/macos/RunnerTests/RunnerTests.swift](#mechanicmobilemacosrunnertestsrunnertestsswift)
- [mechanic_mobile/nginx.conf](#mechanicmobilenginxconf)
- [mechanic_mobile/PENDING.md](#mechanicmobilependingmd)
- [mechanic_mobile/pubspec.lock](#mechanicmobilepubspeclock)
- [mechanic_mobile/pubspec.yaml](#mechanicmobilepubspecyaml)
- [mechanic_mobile/README.md](#mechanicmobilereadmemd)
- [mechanic_mobile/web_dev_config.yaml](#mechanicmobilewebdevconfigyaml)
- [mechanic_mobile/web/index.html](#mechanicmobilewebindexhtml)
- [mechanic_mobile/web/manifest.json](#mechanicmobilewebmanifestjson)
- [mechanic_mobile/windows/.gitignore](#mechanicmobilewindowsgitignore)
- [mechanic_mobile/windows/CMakeLists.txt](#mechanicmobilewindowscmakeliststxt)
- [mechanic_mobile/windows/flutter/CMakeLists.txt](#mechanicmobilewindowsfluttercmakeliststxt)
- [mechanic_mobile/windows/flutter/generated_plugin_registrant.cc](#mechanicmobilewindowsfluttergeneratedpluginregistrantcc)
- [mechanic_mobile/windows/flutter/generated_plugin_registrant.h](#mechanicmobilewindowsfluttergeneratedpluginregistranth)
- [mechanic_mobile/windows/flutter/generated_plugins.cmake](#mechanicmobilewindowsfluttergeneratedpluginscmake)
- [mechanic_mobile/windows/runner/CMakeLists.txt](#mechanicmobilewindowsrunnercmakeliststxt)
- [mechanic_mobile/windows/runner/flutter_window.cpp](#mechanicmobilewindowsrunnerflutterwindowcpp)
- [mechanic_mobile/windows/runner/flutter_window.h](#mechanicmobilewindowsrunnerflutterwindowh)
- [mechanic_mobile/windows/runner/main.cpp](#mechanicmobilewindowsrunnermaincpp)
- [mechanic_mobile/windows/runner/resource.h](#mechanicmobilewindowsrunnerresourceh)
- [mechanic_mobile/windows/runner/runner.exe.manifest](#mechanicmobilewindowsrunnerrunnerexemanifest)
- [mechanic_mobile/windows/runner/Runner.rc](#mechanicmobilewindowsrunnerrunnerrc)
- [mechanic_mobile/windows/runner/utils.cpp](#mechanicmobilewindowsrunnerutilscpp)
- [mechanic_mobile/windows/runner/utils.h](#mechanicmobilewindowsrunnerutilsh)
- [mechanic_mobile/windows/runner/win32_window.cpp](#mechanicmobilewindowsrunnerwin32windowcpp)
- [mechanic_mobile/windows/runner/win32_window.h](#mechanicmobilewindowsrunnerwin32windowh)

---

## mechanic_mobile/.dockerignore

``
# Flutter ephemeral
flutter/ephemeral/
**/ephemeral/
**/.plugin_symlinks/

# Flutter generated
.flutter-plugins
.flutter-plugins-dependencies
.dart_tool/
build/

# General
.git/
*.md
``

---

## mechanic_mobile/.env.sample

``
# Para mobile colocar la ip real del servidor
# BASE_URL=http://localhost:8000

# Para web dejar esto vacio
BASE_URL=

SYSTEM_NAME="Mechanic System"

OPEN_ROUTER_API_KEY="insertar-api-key"
``

---

## mechanic_mobile/.gitignore

``
# Miscellaneous
*.class
*.log
*.pyc
*.swp
.DS_Store
.atom/
.build/
.buildlog/
.history
.svn/
.swiftpm/
migrate_working_dir/

# IntelliJ related
*.iml
*.ipr
*.iws
.idea/

# The .vscode folder contains launch configuration and tasks you configure in
# VS Code which you may wish to be included in version control, so this line
# is commented out by default.
#.vscode/

# Flutter/Dart/Pub related
**/doc/api/
**/ios/Flutter/.last_build_id
.dart_tool/
.flutter-plugins-dependencies
.pub-cache/
.pub/
/build/
/coverage/

# Symbolication related
app.*.symbols

# Obfuscation related
app.*.map.json

# Android Studio will place build artifacts here
/android/app/debug
/android/app/profile
/android/app/release
``

---

## mechanic_mobile/.metadata

``
# This file tracks properties of this Flutter project.
# Used by Flutter tool to assess capabilities and perform upgrades etc.
#
# This file should be version controlled and should not be manually edited.

version:
  revision: "cc0734ac716fbb8b90f3f9db8020958b1553afa7"
  channel: "stable"

project_type: app

# Tracks metadata for the flutter migrate command
migration:
  platforms:
    - platform: root
      create_revision: cc0734ac716fbb8b90f3f9db8020958b1553afa7
      base_revision: cc0734ac716fbb8b90f3f9db8020958b1553afa7
    - platform: web
      create_revision: cc0734ac716fbb8b90f3f9db8020958b1553afa7
      base_revision: cc0734ac716fbb8b90f3f9db8020958b1553afa7

  # User provided section

  # List of Local paths (relative to this file) that should be
  # ignored by the migrate tool.
  #
  # Files that are not part of the templates will be ignored by default.
  unmanaged_files:
    - 'lib/main.dart'
    - 'ios/Runner.xcodeproj/project.pbxproj'
``

---

## mechanic_mobile/analysis_options.yaml

``yaml
include: package:flutter_lints/flutter.yaml
``

---

## mechanic_mobile/android/.gitignore

``
gradle-wrapper.jar
/.gradle
/captures/
/gradlew
/gradlew.bat
/local.properties
GeneratedPluginRegistrant.java
.cxx/

# Remember to never publicly share your keystore.
# See https://flutter.dev/to/reference-keystore
key.properties
**/*.keystore
**/*.jks
``

---

## mechanic_mobile/android/app/build.gradle.kts

``kotlin
plugins {
    id("com.android.application")
    id("kotlin-android")
    // The Flutter Gradle Plugin must be applied after the Android and Kotlin Gradle plugins.
    id("dev.flutter.flutter-gradle-plugin")
}

android {
    namespace = "com.example.mechanic_mobile"
    compileSdk = flutter.compileSdkVersion
    ndkVersion = flutter.ndkVersion

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }

    kotlinOptions {
        jvmTarget = JavaVersion.VERSION_11.toString()
    }

    defaultConfig {
        // TODO: Specify your own unique Application ID (https://developer.android.com/studio/build/application-id.html).
        applicationId = "com.example.mechanic_mobile"
        // You can update the following values to match your application needs.
        // For more information, see: https://flutter.dev/to/review-gradle-config.
        minSdk = flutter.minSdkVersion
        targetSdk = flutter.targetSdkVersion
        versionCode = flutter.versionCode
        versionName = flutter.versionName
    }

    buildTypes {
        release {
            // TODO: Add your own signing config for the release build.
            // Signing with the debug keys for now, so `flutter run --release` works.
            signingConfig = signingConfigs.getByName("debug")
        }
    }
}

flutter {
    source = "../.."
}
``

---

## mechanic_mobile/android/app/src/debug/AndroidManifest.xml

``xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <!-- The INTERNET permission is required for development. Specifically,
         the Flutter tool needs it to communicate with the running application
         to allow setting breakpoints, to provide hot reload, etc.
    -->
    <uses-permission android:name="android.permission.INTERNET"/>
</manifest>
``

---

## mechanic_mobile/android/app/src/main/AndroidManifest.xml

``xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <!-- permisos para http -->
    <uses-permission android:name="android.permission.INTERNET" />
    <!-- notifiaciones push -->
    <uses-permission android:name="android.permission.WAKE_LOCK" />

    <!-- permisos para speech_to_text-->
    <uses-permission android:name="android.permission.RECORD_AUDIO"/>
    <uses-permission android:name="android.permission.BLUETOOTH"/>
    <uses-permission android:name="android.permission.BLUETOOTH_ADMIN"/>
    <uses-permission android:name="android.permission.BLUETOOTH_CONNECT"/>

    <!-- Permisos para image_picker -->
    <!-- Permisos (Cámara) -->
    <uses-permission android:name="android.permission.CAMERA" />

    <!-- Para Android 10 o inferior (Galería) -->
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

    <!-- Para Android 13 o superior (Fotos) -->
    <uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
    <uses-permission android:name="android.permission.READ_MEDIA_VIDEO" />


    <!-- Permisos para geolocalización (Geolocator) -->
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" /> <!-- Opcional: para ubicación en segundo plano -->

    <!-- Para que la app se inicie con el dispositivo (recepción de notificaciones) -->
    <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />

    <application
        android:usesCleartextTraffic="true"
        android:label="mechanic_mobile"
        android:name="${applicationName}"
        android:icon="@mipmap/ic_launcher">
        <!-- meta-data de firabase recomendado -->
        <meta-data
            android:name="com.google.firebase.messaging.default_notification_channel_id"
            android:value="default_channel" />
        <meta-data
            android:name="com.google.firebase.messaging.default_notification_icon"
            android:resource="@drawable/ic_notification" />
        <!-- configuración para firabase -->
        <service
            android:name="com.google.firebase.messaging.FirebaseMessagingService"
            android:enabled="true"
            android:exported="false">
            <intent-filter>
                <action android:name="com.google.firebase.MESSAGING_EVENT" />
            </intent-filter>
        </service>
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:launchMode="singleTop"
            android:taskAffinity=""
            android:theme="@style/LaunchTheme"
            android:configChanges="orientation|keyboardHidden|keyboard|screenSize|smallestScreenSize|locale|layoutDirection|fontScale|screenLayout|density|uiMode"
            android:hardwareAccelerated="true"
            android:windowSoftInputMode="adjustResize">
            <!-- Specifies an Android theme to apply to this Activity as soon as
                 the Android process has started. This theme is visible to the user
                 while the Flutter UI initializes. After that, this theme continues
                 to determine the Window background behind the Flutter UI. -->
            <meta-data
              android:name="io.flutter.embedding.android.NormalTheme"
              android:resource="@style/NormalTheme"
              />
            <intent-filter>
                <action android:name="android.intent.action.MAIN"/>
                <category android:name="android.intent.category.LAUNCHER"/>
            </intent-filter>
        </activity>
        <!-- Don't delete the meta-data below.
             This is used by the Flutter tool to generate GeneratedPluginRegistrant.java -->
        <meta-data
            android:name="flutterEmbedding"
            android:value="2" />
    </application>
    <!-- Required to query activities that can process text, see:
         https://developer.android.com/training/package-visibility and
         https://developer.android.com/reference/android/content/Intent#ACTION_PROCESS_TEXT.

         In particular, this is used by the Flutter engine in io.flutter.plugin.text.ProcessTextPlugin. -->
    <queries>
        <intent>
            <action android:name="android.speech.RecognitionService" />
        </intent>
        <intent>
            <action android:name="android.intent.action.PROCESS_TEXT"/>
            <data android:mimeType="text/plain"/>
        </intent>
    </queries>
</manifest>
``

---

## mechanic_mobile/android/app/src/main/kotlin/com/example/mechanic_mobile/MainActivity.kt

``kotlin
package com.example.mechanic_mobile

import io.flutter.embedding.android.FlutterActivity

class MainActivity : FlutterActivity()
``

---

## mechanic_mobile/android/app/src/main/res/drawable-v21/launch_background.xml

``xml
<?xml version="1.0" encoding="utf-8"?>
<!-- Modify this file to customize your launch splash screen -->
<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:drawable="?android:colorBackground" />

    <!-- You can insert your own image assets here -->
    <!-- <item>
        <bitmap
            android:gravity="center"
            android:src="@mipmap/launch_image" />
    </item> -->
</layer-list>
``

---

## mechanic_mobile/android/app/src/main/res/drawable/launch_background.xml

``xml
<?xml version="1.0" encoding="utf-8"?>
<!-- Modify this file to customize your launch splash screen -->
<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:drawable="@android:color/white" />

    <!-- You can insert your own image assets here -->
    <!-- <item>
        <bitmap
            android:gravity="center"
            android:src="@mipmap/launch_image" />
    </item> -->
</layer-list>
``

---

## mechanic_mobile/android/app/src/main/res/values-night/styles.xml

``xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <!-- Theme applied to the Android Window while the process is starting when the OS's Dark Mode setting is on -->
    <style name="LaunchTheme" parent="@android:style/Theme.Black.NoTitleBar">
        <!-- Show a splash screen on the activity. Automatically removed when
             the Flutter engine draws its first frame -->
        <item name="android:windowBackground">@drawable/launch_background</item>
    </style>
    <!-- Theme applied to the Android Window as soon as the process has started.
         This theme determines the color of the Android Window while your
         Flutter UI initializes, as well as behind your Flutter UI while its
         running.

         This Theme is only used starting with V2 of Flutter's Android embedding. -->
    <style name="NormalTheme" parent="@android:style/Theme.Black.NoTitleBar">
        <item name="android:windowBackground">?android:colorBackground</item>
    </style>
</resources>
``

---

## mechanic_mobile/android/app/src/main/res/values/styles.xml

``xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <!-- Theme applied to the Android Window while the process is starting when the OS's Dark Mode setting is off -->
    <style name="LaunchTheme" parent="@android:style/Theme.Light.NoTitleBar">
        <!-- Show a splash screen on the activity. Automatically removed when
             the Flutter engine draws its first frame -->
        <item name="android:windowBackground">@drawable/launch_background</item>
    </style>
    <!-- Theme applied to the Android Window as soon as the process has started.
         This theme determines the color of the Android Window while your
         Flutter UI initializes, as well as behind your Flutter UI while its
         running.

         This Theme is only used starting with V2 of Flutter's Android embedding. -->
    <style name="NormalTheme" parent="@android:style/Theme.Light.NoTitleBar">
        <item name="android:windowBackground">?android:colorBackground</item>
    </style>
</resources>
``

---

## mechanic_mobile/android/app/src/profile/AndroidManifest.xml

``xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <!-- The INTERNET permission is required for development. Specifically,
         the Flutter tool needs it to communicate with the running application
         to allow setting breakpoints, to provide hot reload, etc.
    -->
    <uses-permission android:name="android.permission.INTERNET"/>
</manifest>
``

---

## mechanic_mobile/android/build.gradle.kts

``kotlin
allprojects {
    repositories {
        google()
        mavenCentral()
    }
}

val newBuildDir: Directory =
    rootProject.layout.buildDirectory
        .dir("../../build")
        .get()
rootProject.layout.buildDirectory.value(newBuildDir)

subprojects {
    val newSubprojectBuildDir: Directory = newBuildDir.dir(project.name)
    project.layout.buildDirectory.value(newSubprojectBuildDir)
}
subprojects {
    project.evaluationDependsOn(":app")
}

tasks.register<Delete>("clean") {
    delete(rootProject.layout.buildDirectory)
}
``

---

## mechanic_mobile/android/gradle.properties

``
org.gradle.jvmargs=-Xmx8G -XX:MaxMetaspaceSize=4G -XX:ReservedCodeCacheSize=512m -XX:+HeapDumpOnOutOfMemoryError
android.useAndroidX=true
android.enableJetifier=true
``

---

## mechanic_mobile/android/gradle/wrapper/gradle-wrapper.properties

``
distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
distributionUrl=https\://services.gradle.org/distributions/gradle-8.12-all.zip
``

---

## mechanic_mobile/android/settings.gradle.kts

``kotlin
pluginManagement {
    val flutterSdkPath =
        run {
            val properties = java.util.Properties()
            file("local.properties").inputStream().use { properties.load(it) }
            val flutterSdkPath = properties.getProperty("flutter.sdk")
            require(flutterSdkPath != null) { "flutter.sdk not set in local.properties" }
            flutterSdkPath
        }

    includeBuild("$flutterSdkPath/packages/flutter_tools/gradle")

    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}

plugins {
    id("dev.flutter.flutter-plugin-loader") version "1.0.0"
    id("com.android.application") version "8.9.1" apply false
    id("org.jetbrains.kotlin.android") version "2.1.0" apply false
}

include(":app")
``

---

## mechanic_mobile/devtools_options.yaml

``yaml
description: This file stores settings for Dart & Flutter DevTools.
documentation: https://docs.flutter.dev/tools/devtools/extensions#configure-extension-enablement-states
extensions:
``

---

## mechanic_mobile/Dockerfile.prod

``dockerfile
# 🏗️ 1. BUILD FLUTTER
FROM ghcr.io/cirruslabs/flutter:stable AS build

WORKDIR /app

# copiar proyecto
COPY . .

# habilitar web
RUN flutter config --enable-web

# instalar dependencias
RUN flutter pub get

# 🔥 build para servir en /flutter
RUN flutter build web --release --base-href "/flutter/"

# 🌐 2. SERVIR CON NGINX
FROM nginx:stable-alpine

# eliminar config default
RUN rm -rf /etc/nginx/conf.d/default.conf

# copiar config nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# copiar build generado
COPY --from=build /app/build/web /usr/share/nginx/html

EXPOSE 80

# mantener nginx en foreground
CMD ["nginx", "-g", "daemon off;"]
``

---

## mechanic_mobile/ios/.gitignore

``
**/dgph
*.mode1v3
*.mode2v3
*.moved-aside
*.pbxuser
*.perspectivev3
**/*sync/
.sconsign.dblite
.tags*
**/.vagrant/
**/DerivedData/
Icon?
**/Pods/
**/.symlinks/
profile
xcuserdata
**/.generated/
Flutter/App.framework
Flutter/Flutter.framework
Flutter/Flutter.podspec
Flutter/Generated.xcconfig
Flutter/ephemeral/
Flutter/app.flx
Flutter/app.zip
Flutter/flutter_assets/
Flutter/flutter_export_environment.sh
ServiceDefinitions.json
Runner/GeneratedPluginRegistrant.*

# Exceptions to above rules.
!default.mode1v3
!default.mode2v3
!default.pbxuser
!default.perspectivev3
``

---

## mechanic_mobile/ios/Flutter/AppFrameworkInfo.plist

``
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>CFBundleDevelopmentRegion</key>
  <string>en</string>
  <key>CFBundleExecutable</key>
  <string>App</string>
  <key>CFBundleIdentifier</key>
  <string>io.flutter.flutter.app</string>
  <key>CFBundleInfoDictionaryVersion</key>
  <string>6.0</string>
  <key>CFBundleName</key>
  <string>App</string>
  <key>CFBundlePackageType</key>
  <string>FMWK</string>
  <key>CFBundleShortVersionString</key>
  <string>1.0</string>
  <key>CFBundleSignature</key>
  <string>????</string>
  <key>CFBundleVersion</key>
  <string>1.0</string>
  <key>MinimumOSVersion</key>
  <string>13.0</string>
</dict>
</plist>
``

---

## mechanic_mobile/ios/Flutter/Debug.xcconfig

``
#include "Generated.xcconfig"
``

---

## mechanic_mobile/ios/Flutter/Release.xcconfig

``
#include "Generated.xcconfig"
``

---

## mechanic_mobile/ios/Runner.xcodeproj/project.pbxproj

``
// !$*UTF8*$!
{
	archiveVersion = 1;
	classes = {
	};
	objectVersion = 54;
	objects = {

/* Begin PBXBuildFile section */
		1498D2341E8E89220040F4C2 /* GeneratedPluginRegistrant.m in Sources */ = {isa = PBXBuildFile; fileRef = 1498D2331E8E89220040F4C2 /* GeneratedPluginRegistrant.m */; };
		331C808B294A63AB00263BE5 /* RunnerTests.swift in Sources */ = {isa = PBXBuildFile; fileRef = 331C807B294A618700263BE5 /* RunnerTests.swift */; };
		3B3967161E833CAA004F5970 /* AppFrameworkInfo.plist in Resources */ = {isa = PBXBuildFile; fileRef = 3B3967151E833CAA004F5970 /* AppFrameworkInfo.plist */; };
		74858FAF1ED2DC5600515810 /* AppDelegate.swift in Sources */ = {isa = PBXBuildFile; fileRef = 74858FAE1ED2DC5600515810 /* AppDelegate.swift */; };
		97C146FC1CF9000F007C117D /* Main.storyboard in Resources */ = {isa = PBXBuildFile; fileRef = 97C146FA1CF9000F007C117D /* Main.storyboard */; };
		97C146FE1CF9000F007C117D /* Assets.xcassets in Resources */ = {isa = PBXBuildFile; fileRef = 97C146FD1CF9000F007C117D /* Assets.xcassets */; };
		97C147011CF9000F007C117D /* LaunchScreen.storyboard in Resources */ = {isa = PBXBuildFile; fileRef = 97C146FF1CF9000F007C117D /* LaunchScreen.storyboard */; };
/* End PBXBuildFile section */

/* Begin PBXContainerItemProxy section */
		331C8085294A63A400263BE5 /* PBXContainerItemProxy */ = {
			isa = PBXContainerItemProxy;
			containerPortal = 97C146E61CF9000F007C117D /* Project object */;
			proxyType = 1;
			remoteGlobalIDString = 97C146ED1CF9000F007C117D;
			remoteInfo = Runner;
		};
/* End PBXContainerItemProxy section */

/* Begin PBXCopyFilesBuildPhase section */
		9705A1C41CF9048500538489 /* Embed Frameworks */ = {
			isa = PBXCopyFilesBuildPhase;
			buildActionMask = 2147483647;
			dstPath = "";
			dstSubfolderSpec = 10;
			files = (
			);
			name = "Embed Frameworks";
			runOnlyForDeploymentPostprocessing = 0;
		};
/* End PBXCopyFilesBuildPhase section */

/* Begin PBXFileReference section */
		1498D2321E8E86230040F4C2 /* GeneratedPluginRegistrant.h */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.c.h; path = GeneratedPluginRegistrant.h; sourceTree = "<group>"; };
		1498D2331E8E89220040F4C2 /* GeneratedPluginRegistrant.m */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.c.objc; path = GeneratedPluginRegistrant.m; sourceTree = "<group>"; };
		331C807B294A618700263BE5 /* RunnerTests.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = RunnerTests.swift; sourceTree = "<group>"; };
		331C8081294A63A400263BE5 /* RunnerTests.xctest */ = {isa = PBXFileReference; explicitFileType = wrapper.cfbundle; includeInIndex = 0; path = RunnerTests.xctest; sourceTree = BUILT_PRODUCTS_DIR; };
		3B3967151E833CAA004F5970 /* AppFrameworkInfo.plist */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = text.plist.xml; name = AppFrameworkInfo.plist; path = Flutter/AppFrameworkInfo.plist; sourceTree = "<group>"; };
		74858FAD1ED2DC5600515810 /* Runner-Bridging-Header.h */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.c.h; path = "Runner-Bridging-Header.h"; sourceTree = "<group>"; };
		74858FAE1ED2DC5600515810 /* AppDelegate.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = AppDelegate.swift; sourceTree = "<group>"; };
		7AFA3C8E1D35360C0083082E /* Release.xcconfig */ = {isa = PBXFileReference; lastKnownFileType = text.xcconfig; name = Release.xcconfig; path = Flutter/Release.xcconfig; sourceTree = "<group>"; };
		9740EEB21CF90195004384FC /* Debug.xcconfig */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = text.xcconfig; name = Debug.xcconfig; path = Flutter/Debug.xcconfig; sourceTree = "<group>"; };
		9740EEB31CF90195004384FC /* Generated.xcconfig */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = text.xcconfig; name = Generated.xcconfig; path = Flutter/Generated.xcconfig; sourceTree = "<group>"; };
		97C146EE1CF9000F007C117D /* Runner.app */ = {isa = PBXFileReference; explicitFileType = wrapper.application; includeInIndex = 0; path = Runner.app; sourceTree = BUILT_PRODUCTS_DIR; };
		97C146FB1CF9000F007C117D /* Base */ = {isa = PBXFileReference; lastKnownFileType = file.storyboard; name = Base; path = Base.lproj/Main.storyboard; sourceTree = "<group>"; };
		97C146FD1CF9000F007C117D /* Assets.xcassets */ = {isa = PBXFileReference; lastKnownFileType = folder.assetcatalog; path = Assets.xcassets; sourceTree = "<group>"; };
		97C147001CF9000F007C117D /* Base */ = {isa = PBXFileReference; lastKnownFileType = file.storyboard; name = Base; path = Base.lproj/LaunchScreen.storyboard; sourceTree = "<group>"; };
		97C147021CF9000F007C117D /* Info.plist */ = {isa = PBXFileReference; lastKnownFileType = text.plist.xml; path = Info.plist; sourceTree = "<group>"; };
/* End PBXFileReference section */

/* Begin PBXFrameworksBuildPhase section */
		97C146EB1CF9000F007C117D /* Frameworks */ = {
			isa = PBXFrameworksBuildPhase;
			buildActionMask = 2147483647;
			files = (
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
/* End PBXFrameworksBuildPhase section */

/* Begin PBXGroup section */
		331C8082294A63A400263BE5 /* RunnerTests */ = {
			isa = PBXGroup;
			children = (
				331C807B294A618700263BE5 /* RunnerTests.swift */,
			);
			path = RunnerTests;
			sourceTree = "<group>";
		};
		9740EEB11CF90186004384FC /* Flutter */ = {
			isa = PBXGroup;
			children = (
				3B3967151E833CAA004F5970 /* AppFrameworkInfo.plist */,
				9740EEB21CF90195004384FC /* Debug.xcconfig */,
				7AFA3C8E1D35360C0083082E /* Release.xcconfig */,
				9740EEB31CF90195004384FC /* Generated.xcconfig */,
			);
			name = Flutter;
			sourceTree = "<group>";
		};
		97C146E51CF9000F007C117D = {
			isa = PBXGroup;
			children = (
				9740EEB11CF90186004384FC /* Flutter */,
				97C146F01CF9000F007C117D /* Runner */,
				97C146EF1CF9000F007C117D /* Products */,
				331C8082294A63A400263BE5 /* RunnerTests */,
			);
			sourceTree = "<group>";
		};
		97C146EF1CF9000F007C117D /* Products */ = {
			isa = PBXGroup;
			children = (
				97C146EE1CF9000F007C117D /* Runner.app */,
				331C8081294A63A400263BE5 /* RunnerTests.xctest */,
			);
			name = Products;
			sourceTree = "<group>";
		};
		97C146F01CF9000F007C117D /* Runner */ = {
			isa = PBXGroup;
			children = (
				97C146FA1CF9000F007C117D /* Main.storyboard */,
				97C146FD1CF9000F007C117D /* Assets.xcassets */,
				97C146FF1CF9000F007C117D /* LaunchScreen.storyboard */,
				97C147021CF9000F007C117D /* Info.plist */,
				1498D2321E8E86230040F4C2 /* GeneratedPluginRegistrant.h */,
				1498D2331E8E89220040F4C2 /* GeneratedPluginRegistrant.m */,
				74858FAE1ED2DC5600515810 /* AppDelegate.swift */,
				74858FAD1ED2DC5600515810 /* Runner-Bridging-Header.h */,
			);
			path = Runner;
			sourceTree = "<group>";
		};
/* End PBXGroup section */

/* Begin PBXNativeTarget section */
		331C8080294A63A400263BE5 /* RunnerTests */ = {
			isa = PBXNativeTarget;
			buildConfigurationList = 331C8087294A63A400263BE5 /* Build configuration list for PBXNativeTarget "RunnerTests" */;
			buildPhases = (
				331C807D294A63A400263BE5 /* Sources */,
				331C807F294A63A400263BE5 /* Resources */,
			);
			buildRules = (
			);
			dependencies = (
				331C8086294A63A400263BE5 /* PBXTargetDependency */,
			);
			name = RunnerTests;
			productName = RunnerTests;
			productReference = 331C8081294A63A400263BE5 /* RunnerTests.xctest */;
			productType = "com.apple.product-type.bundle.unit-test";
		};
		97C146ED1CF9000F007C117D /* Runner */ = {
			isa = PBXNativeTarget;
			buildConfigurationList = 97C147051CF9000F007C117D /* Build configuration list for PBXNativeTarget "Runner" */;
			buildPhases = (
				9740EEB61CF901F6004384FC /* Run Script */,
				97C146EA1CF9000F007C117D /* Sources */,
				97C146EB1CF9000F007C117D /* Frameworks */,
				97C146EC1CF9000F007C117D /* Resources */,
				9705A1C41CF9048500538489 /* Embed Frameworks */,
				3B06AD1E1E4923F5004D2608 /* Thin Binary */,
			);
			buildRules = (
			);
			dependencies = (
			);
			name = Runner;
			productName = Runner;
			productReference = 97C146EE1CF9000F007C117D /* Runner.app */;
			productType = "com.apple.product-type.application";
		};
/* End PBXNativeTarget section */

/* Begin PBXProject section */
		97C146E61CF9000F007C117D /* Project object */ = {
			isa = PBXProject;
			attributes = {
				BuildIndependentTargetsInParallel = YES;
				LastUpgradeCheck = 1510;
				ORGANIZATIONNAME = "";
				TargetAttributes = {
					331C8080294A63A400263BE5 = {
						CreatedOnToolsVersion = 14.0;
						TestTargetID = 97C146ED1CF9000F007C117D;
					};
					97C146ED1CF9000F007C117D = {
						CreatedOnToolsVersion = 7.3.1;
						LastSwiftMigration = 1100;
					};
				};
			};
			buildConfigurationList = 97C146E91CF9000F007C117D /* Build configuration list for PBXProject "Runner" */;
			compatibilityVersion = "Xcode 9.3";
			developmentRegion = en;
			hasScannedForEncodings = 0;
			knownRegions = (
				en,
				Base,
			);
			mainGroup = 97C146E51CF9000F007C117D;
			productRefGroup = 97C146EF1CF9000F007C117D /* Products */;
			projectDirPath = "";
			projectRoot = "";
			targets = (
				97C146ED1CF9000F007C117D /* Runner */,
				331C8080294A63A400263BE5 /* RunnerTests */,
			);
		};
/* End PBXProject section */

/* Begin PBXResourcesBuildPhase section */
		331C807F294A63A400263BE5 /* Resources */ = {
			isa = PBXResourcesBuildPhase;
			buildActionMask = 2147483647;
			files = (
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
		97C146EC1CF9000F007C117D /* Resources */ = {
			isa = PBXResourcesBuildPhase;
			buildActionMask = 2147483647;
			files = (
				97C147011CF9000F007C117D /* LaunchScreen.storyboard in Resources */,
				3B3967161E833CAA004F5970 /* AppFrameworkInfo.plist in Resources */,
				97C146FE1CF9000F007C117D /* Assets.xcassets in Resources */,
				97C146FC1CF9000F007C117D /* Main.storyboard in Resources */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
/* End PBXResourcesBuildPhase section */

/* Begin PBXShellScriptBuildPhase section */
		3B06AD1E1E4923F5004D2608 /* Thin Binary */ = {
			isa = PBXShellScriptBuildPhase;
			alwaysOutOfDate = 1;
			buildActionMask = 2147483647;
			files = (
			);
			inputPaths = (
				"${TARGET_BUILD_DIR}/${INFOPLIST_PATH}",
			);
			name = "Thin Binary";
			outputPaths = (
			);
			runOnlyForDeploymentPostprocessing = 0;
			shellPath = /bin/sh;
			shellScript = "/bin/sh \"$FLUTTER_ROOT/packages/flutter_tools/bin/xcode_backend.sh\" embed_and_thin";
		};
		9740EEB61CF901F6004384FC /* Run Script */ = {
			isa = PBXShellScriptBuildPhase;
			alwaysOutOfDate = 1;
			buildActionMask = 2147483647;
			files = (
			);
			inputPaths = (
			);
			name = "Run Script";
			outputPaths = (
			);
			runOnlyForDeploymentPostprocessing = 0;
			shellPath = /bin/sh;
			shellScript = "/bin/sh \"$FLUTTER_ROOT/packages/flutter_tools/bin/xcode_backend.sh\" build";
		};
/* End PBXShellScriptBuildPhase section */

/* Begin PBXSourcesBuildPhase section */
		331C807D294A63A400263BE5 /* Sources */ = {
			isa = PBXSourcesBuildPhase;
			buildActionMask = 2147483647;
			files = (
				331C808B294A63AB00263BE5 /* RunnerTests.swift in Sources */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
		97C146EA1CF9000F007C117D /* Sources */ = {
			isa = PBXSourcesBuildPhase;
			buildActionMask = 2147483647;
			files = (
				74858FAF1ED2DC5600515810 /* AppDelegate.swift in Sources */,
				1498D2341E8E89220040F4C2 /* GeneratedPluginRegistrant.m in Sources */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
/* End PBXSourcesBuildPhase section */

/* Begin PBXTargetDependency section */
		331C8086294A63A400263BE5 /* PBXTargetDependency */ = {
			isa = PBXTargetDependency;
			target = 97C146ED1CF9000F007C117D /* Runner */;
			targetProxy = 331C8085294A63A400263BE5 /* PBXContainerItemProxy */;
		};
/* End PBXTargetDependency section */

/* Begin PBXVariantGroup section */
		97C146FA1CF9000F007C117D /* Main.storyboard */ = {
			isa = PBXVariantGroup;
			children = (
				97C146FB1CF9000F007C117D /* Base */,
			);
			name = Main.storyboard;
			sourceTree = "<group>";
		};
		97C146FF1CF9000F007C117D /* LaunchScreen.storyboard */ = {
			isa = PBXVariantGroup;
			children = (
				97C147001CF9000F007C117D /* Base */,
			);
			name = LaunchScreen.storyboard;
			sourceTree = "<group>";
		};
/* End PBXVariantGroup section */

/* Begin XCBuildConfiguration section */
		249021D3217E4FDB00AE95B9 /* Profile */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				ALWAYS_SEARCH_USER_PATHS = NO;
				ASSETCATALOG_COMPILER_GENERATE_SWIFT_ASSET_SYMBOL_EXTENSIONS = YES;
				CLANG_ANALYZER_NONNULL = YES;
				CLANG_CXX_LANGUAGE_STANDARD = "gnu++0x";
				CLANG_CXX_LIBRARY = "libc++";
				CLANG_ENABLE_MODULES = YES;
				CLANG_ENABLE_OBJC_ARC = YES;
				CLANG_WARN_BLOCK_CAPTURE_AUTORELEASING = YES;
				CLANG_WARN_BOOL_CONVERSION = YES;
				CLANG_WARN_COMMA = YES;
				CLANG_WARN_CONSTANT_CONVERSION = YES;
				CLANG_WARN_DEPRECATED_OBJC_IMPLEMENTATIONS = YES;
				CLANG_WARN_DIRECT_OBJC_ISA_USAGE = YES_ERROR;
				CLANG_WARN_EMPTY_BODY = YES;
				CLANG_WARN_ENUM_CONVERSION = YES;
				CLANG_WARN_INFINITE_RECURSION = YES;
				CLANG_WARN_INT_CONVERSION = YES;
				CLANG_WARN_NON_LITERAL_NULL_CONVERSION = YES;
				CLANG_WARN_OBJC_IMPLICIT_RETAIN_SELF = YES;
				CLANG_WARN_OBJC_LITERAL_CONVERSION = YES;
				CLANG_WARN_OBJC_ROOT_CLASS = YES_ERROR;
				CLANG_WARN_RANGE_LOOP_ANALYSIS = YES;
				CLANG_WARN_STRICT_PROTOTYPES = YES;
				CLANG_WARN_SUSPICIOUS_MOVE = YES;
				CLANG_WARN_UNREACHABLE_CODE = YES;
				CLANG_WARN__DUPLICATE_METHOD_MATCH = YES;
				"CODE_SIGN_IDENTITY[sdk=iphoneos*]" = "iPhone Developer";
				COPY_PHASE_STRIP = NO;
				DEBUG_INFORMATION_FORMAT = "dwarf-with-dsym";
				ENABLE_NS_ASSERTIONS = NO;
				ENABLE_STRICT_OBJC_MSGSEND = YES;
				ENABLE_USER_SCRIPT_SANDBOXING = NO;
				GCC_C_LANGUAGE_STANDARD = gnu99;
				GCC_NO_COMMON_BLOCKS = YES;
				GCC_WARN_64_TO_32_BIT_CONVERSION = YES;
				GCC_WARN_ABOUT_RETURN_TYPE = YES_ERROR;
				GCC_WARN_UNDECLARED_SELECTOR = YES;
				GCC_WARN_UNINITIALIZED_AUTOS = YES_AGGRESSIVE;
				GCC_WARN_UNUSED_FUNCTION = YES;
				GCC_WARN_UNUSED_VARIABLE = YES;
				IPHONEOS_DEPLOYMENT_TARGET = 13.0;
				MTL_ENABLE_DEBUG_INFO = NO;
				SDKROOT = iphoneos;
				SUPPORTED_PLATFORMS = iphoneos;
				TARGETED_DEVICE_FAMILY = "1,2";
				VALIDATE_PRODUCT = YES;
			};
			name = Profile;
		};
		249021D4217E4FDB00AE95B9 /* Profile */ = {
			isa = XCBuildConfiguration;
			baseConfigurationReference = 7AFA3C8E1D35360C0083082E /* Release.xcconfig */;
			buildSettings = {
				ASSETCATALOG_COMPILER_APPICON_NAME = AppIcon;
				CLANG_ENABLE_MODULES = YES;
				CURRENT_PROJECT_VERSION = "$(FLUTTER_BUILD_NUMBER)";
				ENABLE_BITCODE = NO;
				INFOPLIST_FILE = Runner/Info.plist;
				LD_RUNPATH_SEARCH_PATHS = (
					"$(inherited)",
					"@executable_path/Frameworks",
				);
				PRODUCT_BUNDLE_IDENTIFIER = com.example.mechanicMobile;
				PRODUCT_NAME = "$(TARGET_NAME)";
				SWIFT_OBJC_BRIDGING_HEADER = "Runner/Runner-Bridging-Header.h";
				SWIFT_VERSION = 5.0;
				VERSIONING_SYSTEM = "apple-generic";
			};
			name = Profile;
		};
		331C8088294A63A400263BE5 /* Debug */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				BUNDLE_LOADER = "$(TEST_HOST)";
				CODE_SIGN_STYLE = Automatic;
				CURRENT_PROJECT_VERSION = 1;
				GENERATE_INFOPLIST_FILE = YES;
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = com.example.mechanicMobile.RunnerTests;
				PRODUCT_NAME = "$(TARGET_NAME)";
				SWIFT_ACTIVE_COMPILATION_CONDITIONS = DEBUG;
				SWIFT_OPTIMIZATION_LEVEL = "-Onone";
				SWIFT_VERSION = 5.0;
				TEST_HOST = "$(BUILT_PRODUCTS_DIR)/Runner.app/$(BUNDLE_EXECUTABLE_FOLDER_PATH)/Runner";
			};
			name = Debug;
		};
		331C8089294A63A400263BE5 /* Release */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				BUNDLE_LOADER = "$(TEST_HOST)";
				CODE_SIGN_STYLE = Automatic;
				CURRENT_PROJECT_VERSION = 1;
				GENERATE_INFOPLIST_FILE = YES;
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = com.example.mechanicMobile.RunnerTests;
				PRODUCT_NAME = "$(TARGET_NAME)";
				SWIFT_VERSION = 5.0;
				TEST_HOST = "$(BUILT_PRODUCTS_DIR)/Runner.app/$(BUNDLE_EXECUTABLE_FOLDER_PATH)/Runner";
			};
			name = Release;
		};
		331C808A294A63A400263BE5 /* Profile */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				BUNDLE_LOADER = "$(TEST_HOST)";
				CODE_SIGN_STYLE = Automatic;
				CURRENT_PROJECT_VERSION = 1;
				GENERATE_INFOPLIST_FILE = YES;
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = com.example.mechanicMobile.RunnerTests;
				PRODUCT_NAME = "$(TARGET_NAME)";
				SWIFT_VERSION = 5.0;
				TEST_HOST = "$(BUILT_PRODUCTS_DIR)/Runner.app/$(BUNDLE_EXECUTABLE_FOLDER_PATH)/Runner";
			};
			name = Profile;
		};
		97C147031CF9000F007C117D /* Debug */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				ALWAYS_SEARCH_USER_PATHS = NO;
				ASSETCATALOG_COMPILER_GENERATE_SWIFT_ASSET_SYMBOL_EXTENSIONS = YES;
				CLANG_ANALYZER_NONNULL = YES;
				CLANG_CXX_LANGUAGE_STANDARD = "gnu++0x";
				CLANG_CXX_LIBRARY = "libc++";
				CLANG_ENABLE_MODULES = YES;
				CLANG_ENABLE_OBJC_ARC = YES;
				CLANG_WARN_BLOCK_CAPTURE_AUTORELEASING = YES;
				CLANG_WARN_BOOL_CONVERSION = YES;
				CLANG_WARN_COMMA = YES;
				CLANG_WARN_CONSTANT_CONVERSION = YES;
				CLANG_WARN_DEPRECATED_OBJC_IMPLEMENTATIONS = YES;
				CLANG_WARN_DIRECT_OBJC_ISA_USAGE = YES_ERROR;
				CLANG_WARN_EMPTY_BODY = YES;
				CLANG_WARN_ENUM_CONVERSION = YES;
				CLANG_WARN_INFINITE_RECURSION = YES;
				CLANG_WARN_INT_CONVERSION = YES;
				CLANG_WARN_NON_LITERAL_NULL_CONVERSION = YES;
				CLANG_WARN_OBJC_IMPLICIT_RETAIN_SELF = YES;
				CLANG_WARN_OBJC_LITERAL_CONVERSION = YES;
				CLANG_WARN_OBJC_ROOT_CLASS = YES_ERROR;
				CLANG_WARN_RANGE_LOOP_ANALYSIS = YES;
				CLANG_WARN_STRICT_PROTOTYPES = YES;
				CLANG_WARN_SUSPICIOUS_MOVE = YES;
				CLANG_WARN_UNREACHABLE_CODE = YES;
				CLANG_WARN__DUPLICATE_METHOD_MATCH = YES;
				"CODE_SIGN_IDENTITY[sdk=iphoneos*]" = "iPhone Developer";
				COPY_PHASE_STRIP = NO;
				DEBUG_INFORMATION_FORMAT = dwarf;
				ENABLE_STRICT_OBJC_MSGSEND = YES;
				ENABLE_TESTABILITY = YES;
				ENABLE_USER_SCRIPT_SANDBOXING = NO;
				GCC_C_LANGUAGE_STANDARD = gnu99;
				GCC_DYNAMIC_NO_PIC = NO;
				GCC_NO_COMMON_BLOCKS = YES;
				GCC_OPTIMIZATION_LEVEL = 0;
				GCC_PREPROCESSOR_DEFINITIONS = (
					"DEBUG=1",
					"$(inherited)",
				);
				GCC_WARN_64_TO_32_BIT_CONVERSION = YES;
				GCC_WARN_ABOUT_RETURN_TYPE = YES_ERROR;
				GCC_WARN_UNDECLARED_SELECTOR = YES;
				GCC_WARN_UNINITIALIZED_AUTOS = YES_AGGRESSIVE;
				GCC_WARN_UNUSED_FUNCTION = YES;
				GCC_WARN_UNUSED_VARIABLE = YES;
				IPHONEOS_DEPLOYMENT_TARGET = 13.0;
				MTL_ENABLE_DEBUG_INFO = YES;
				ONLY_ACTIVE_ARCH = YES;
				SDKROOT = iphoneos;
				TARGETED_DEVICE_FAMILY = "1,2";
			};
			name = Debug;
		};
		97C147041CF9000F007C117D /* Release */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				ALWAYS_SEARCH_USER_PATHS = NO;
				ASSETCATALOG_COMPILER_GENERATE_SWIFT_ASSET_SYMBOL_EXTENSIONS = YES;
				CLANG_ANALYZER_NONNULL = YES;
				CLANG_CXX_LANGUAGE_STANDARD = "gnu++0x";
				CLANG_CXX_LIBRARY = "libc++";
				CLANG_ENABLE_MODULES = YES;
				CLANG_ENABLE_OBJC_ARC = YES;
				CLANG_WARN_BLOCK_CAPTURE_AUTORELEASING = YES;
				CLANG_WARN_BOOL_CONVERSION = YES;
				CLANG_WARN_COMMA = YES;
				CLANG_WARN_CONSTANT_CONVERSION = YES;
				CLANG_WARN_DEPRECATED_OBJC_IMPLEMENTATIONS = YES;
				CLANG_WARN_DIRECT_OBJC_ISA_USAGE = YES_ERROR;
				CLANG_WARN_EMPTY_BODY = YES;
				CLANG_WARN_ENUM_CONVERSION = YES;
				CLANG_WARN_INFINITE_RECURSION = YES;
				CLANG_WARN_INT_CONVERSION = YES;
				CLANG_WARN_NON_LITERAL_NULL_CONVERSION = YES;
				CLANG_WARN_OBJC_IMPLICIT_RETAIN_SELF = YES;
				CLANG_WARN_OBJC_LITERAL_CONVERSION = YES;
				CLANG_WARN_OBJC_ROOT_CLASS = YES_ERROR;
				CLANG_WARN_RANGE_LOOP_ANALYSIS = YES;
				CLANG_WARN_STRICT_PROTOTYPES = YES;
				CLANG_WARN_SUSPICIOUS_MOVE = YES;
				CLANG_WARN_UNREACHABLE_CODE = YES;
				CLANG_WARN__DUPLICATE_METHOD_MATCH = YES;
				"CODE_SIGN_IDENTITY[sdk=iphoneos*]" = "iPhone Developer";
				COPY_PHASE_STRIP = NO;
				DEBUG_INFORMATION_FORMAT = "dwarf-with-dsym";
				ENABLE_NS_ASSERTIONS = NO;
				ENABLE_STRICT_OBJC_MSGSEND = YES;
				ENABLE_USER_SCRIPT_SANDBOXING = NO;
				GCC_C_LANGUAGE_STANDARD = gnu99;
				GCC_NO_COMMON_BLOCKS = YES;
				GCC_WARN_64_TO_32_BIT_CONVERSION = YES;
				GCC_WARN_ABOUT_RETURN_TYPE = YES_ERROR;
				GCC_WARN_UNDECLARED_SELECTOR = YES;
				GCC_WARN_UNINITIALIZED_AUTOS = YES_AGGRESSIVE;
				GCC_WARN_UNUSED_FUNCTION = YES;
				GCC_WARN_UNUSED_VARIABLE = YES;
				IPHONEOS_DEPLOYMENT_TARGET = 13.0;
				MTL_ENABLE_DEBUG_INFO = NO;
				SDKROOT = iphoneos;
				SUPPORTED_PLATFORMS = iphoneos;
				SWIFT_COMPILATION_MODE = wholemodule;
				SWIFT_OPTIMIZATION_LEVEL = "-O";
				TARGETED_DEVICE_FAMILY = "1,2";
				VALIDATE_PRODUCT = YES;
			};
			name = Release;
		};
		97C147061CF9000F007C117D /* Debug */ = {
			isa = XCBuildConfiguration;
			baseConfigurationReference = 9740EEB21CF90195004384FC /* Debug.xcconfig */;
			buildSettings = {
				ASSETCATALOG_COMPILER_APPICON_NAME = AppIcon;
				CLANG_ENABLE_MODULES = YES;
				CURRENT_PROJECT_VERSION = "$(FLUTTER_BUILD_NUMBER)";
				ENABLE_BITCODE = NO;
				INFOPLIST_FILE = Runner/Info.plist;
				LD_RUNPATH_SEARCH_PATHS = (
					"$(inherited)",
					"@executable_path/Frameworks",
				);
				PRODUCT_BUNDLE_IDENTIFIER = com.example.mechanicMobile;
				PRODUCT_NAME = "$(TARGET_NAME)";
				SWIFT_OBJC_BRIDGING_HEADER = "Runner/Runner-Bridging-Header.h";
				SWIFT_OPTIMIZATION_LEVEL = "-Onone";
				SWIFT_VERSION = 5.0;
				VERSIONING_SYSTEM = "apple-generic";
			};
			name = Debug;
		};
		97C147071CF9000F007C117D /* Release */ = {
			isa = XCBuildConfiguration;
			baseConfigurationReference = 7AFA3C8E1D35360C0083082E /* Release.xcconfig */;
			buildSettings = {
				ASSETCATALOG_COMPILER_APPICON_NAME = AppIcon;
				CLANG_ENABLE_MODULES = YES;
				CURRENT_PROJECT_VERSION = "$(FLUTTER_BUILD_NUMBER)";
				ENABLE_BITCODE = NO;
				INFOPLIST_FILE = Runner/Info.plist;
				LD_RUNPATH_SEARCH_PATHS = (
					"$(inherited)",
					"@executable_path/Frameworks",
				);
				PRODUCT_BUNDLE_IDENTIFIER = com.example.mechanicMobile;
				PRODUCT_NAME = "$(TARGET_NAME)";
				SWIFT_OBJC_BRIDGING_HEADER = "Runner/Runner-Bridging-Header.h";
				SWIFT_VERSION = 5.0;
				VERSIONING_SYSTEM = "apple-generic";
			};
			name = Release;
		};
/* End XCBuildConfiguration section */

/* Begin XCConfigurationList section */
		331C8087294A63A400263BE5 /* Build configuration list for PBXNativeTarget "RunnerTests" */ = {
			isa = XCConfigurationList;
			buildConfigurations = (
				331C8088294A63A400263BE5 /* Debug */,
				331C8089294A63A400263BE5 /* Release */,
				331C808A294A63A400263BE5 /* Profile */,
			);
			defaultConfigurationIsVisible = 0;
			defaultConfigurationName = Release;
		};
		97C146E91CF9000F007C117D /* Build configuration list for PBXProject "Runner" */ = {
			isa = XCConfigurationList;
			buildConfigurations = (
				97C147031CF9000F007C117D /* Debug */,
				97C147041CF9000F007C117D /* Release */,
				249021D3217E4FDB00AE95B9 /* Profile */,
			);
			defaultConfigurationIsVisible = 0;
			defaultConfigurationName = Release;
		};
		97C147051CF9000F007C117D /* Build configuration list for PBXNativeTarget "Runner" */ = {
			isa = XCConfigurationList;
			buildConfigurations = (
				97C147061CF9000F007C117D /* Debug */,
				97C147071CF9000F007C117D /* Release */,
				249021D4217E4FDB00AE95B9 /* Profile */,
			);
			defaultConfigurationIsVisible = 0;
			defaultConfigurationName = Release;
		};
/* End XCConfigurationList section */
	};
	rootObject = 97C146E61CF9000F007C117D /* Project object */;
}
``

---

## mechanic_mobile/ios/Runner.xcodeproj/project.xcworkspace/contents.xcworkspacedata

``
<?xml version="1.0" encoding="UTF-8"?>
<Workspace
   version = "1.0">
   <FileRef
      location = "self:">
   </FileRef>
</Workspace>
``

---

## mechanic_mobile/ios/Runner.xcodeproj/project.xcworkspace/xcshareddata/IDEWorkspaceChecks.plist

``
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>IDEDidComputeMac32BitWarning</key>
	<true/>
</dict>
</plist>
``

---

## mechanic_mobile/ios/Runner.xcodeproj/project.xcworkspace/xcshareddata/WorkspaceSettings.xcsettings

``
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>PreviewsEnabled</key>
	<false/>
</dict>
</plist>
``

---

## mechanic_mobile/ios/Runner.xcodeproj/xcshareddata/xcschemes/Runner.xcscheme

``
<?xml version="1.0" encoding="UTF-8"?>
<Scheme
   LastUpgradeVersion = "1510"
   version = "1.3">
   <BuildAction
      parallelizeBuildables = "YES"
      buildImplicitDependencies = "YES">
      <BuildActionEntries>
         <BuildActionEntry
            buildForTesting = "YES"
            buildForRunning = "YES"
            buildForProfiling = "YES"
            buildForArchiving = "YES"
            buildForAnalyzing = "YES">
            <BuildableReference
               BuildableIdentifier = "primary"
               BlueprintIdentifier = "97C146ED1CF9000F007C117D"
               BuildableName = "Runner.app"
               BlueprintName = "Runner"
               ReferencedContainer = "container:Runner.xcodeproj">
            </BuildableReference>
         </BuildActionEntry>
      </BuildActionEntries>
   </BuildAction>
   <TestAction
      buildConfiguration = "Debug"
      selectedDebuggerIdentifier = "Xcode.DebuggerFoundation.Debugger.LLDB"
      selectedLauncherIdentifier = "Xcode.DebuggerFoundation.Launcher.LLDB"
      customLLDBInitFile = "$(SRCROOT)/Flutter/ephemeral/flutter_lldbinit"
      shouldUseLaunchSchemeArgsEnv = "YES">
      <MacroExpansion>
         <BuildableReference
            BuildableIdentifier = "primary"
            BlueprintIdentifier = "97C146ED1CF9000F007C117D"
            BuildableName = "Runner.app"
            BlueprintName = "Runner"
            ReferencedContainer = "container:Runner.xcodeproj">
         </BuildableReference>
      </MacroExpansion>
      <Testables>
         <TestableReference
            skipped = "NO"
            parallelizable = "YES">
            <BuildableReference
               BuildableIdentifier = "primary"
               BlueprintIdentifier = "331C8080294A63A400263BE5"
               BuildableName = "RunnerTests.xctest"
               BlueprintName = "RunnerTests"
               ReferencedContainer = "container:Runner.xcodeproj">
            </BuildableReference>
         </TestableReference>
      </Testables>
   </TestAction>
   <LaunchAction
      buildConfiguration = "Debug"
      selectedDebuggerIdentifier = "Xcode.DebuggerFoundation.Debugger.LLDB"
      selectedLauncherIdentifier = "Xcode.DebuggerFoundation.Launcher.LLDB"
      customLLDBInitFile = "$(SRCROOT)/Flutter/ephemeral/flutter_lldbinit"
      launchStyle = "0"
      useCustomWorkingDirectory = "NO"
      ignoresPersistentStateOnLaunch = "NO"
      debugDocumentVersioning = "YES"
      debugServiceExtension = "internal"
      enableGPUValidationMode = "1"
      allowLocationSimulation = "YES">
      <BuildableProductRunnable
         runnableDebuggingMode = "0">
         <BuildableReference
            BuildableIdentifier = "primary"
            BlueprintIdentifier = "97C146ED1CF9000F007C117D"
            BuildableName = "Runner.app"
            BlueprintName = "Runner"
            ReferencedContainer = "container:Runner.xcodeproj">
         </BuildableReference>
      </BuildableProductRunnable>
   </LaunchAction>
   <ProfileAction
      buildConfiguration = "Profile"
      shouldUseLaunchSchemeArgsEnv = "YES"
      savedToolIdentifier = ""
      useCustomWorkingDirectory = "NO"
      debugDocumentVersioning = "YES">
      <BuildableProductRunnable
         runnableDebuggingMode = "0">
         <BuildableReference
            BuildableIdentifier = "primary"
            BlueprintIdentifier = "97C146ED1CF9000F007C117D"
            BuildableName = "Runner.app"
            BlueprintName = "Runner"
            ReferencedContainer = "container:Runner.xcodeproj">
         </BuildableReference>
      </BuildableProductRunnable>
   </ProfileAction>
   <AnalyzeAction
      buildConfiguration = "Debug">
   </AnalyzeAction>
   <ArchiveAction
      buildConfiguration = "Release"
      revealArchiveInOrganizer = "YES">
   </ArchiveAction>
</Scheme>
``

---

## mechanic_mobile/ios/Runner.xcworkspace/contents.xcworkspacedata

``
<?xml version="1.0" encoding="UTF-8"?>
<Workspace
   version = "1.0">
   <FileRef
      location = "group:Runner.xcodeproj">
   </FileRef>
</Workspace>
``

---

## mechanic_mobile/ios/Runner.xcworkspace/xcshareddata/IDEWorkspaceChecks.plist

``
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>IDEDidComputeMac32BitWarning</key>
	<true/>
</dict>
</plist>
``

---

## mechanic_mobile/ios/Runner.xcworkspace/xcshareddata/WorkspaceSettings.xcsettings

``
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>PreviewsEnabled</key>
	<false/>
</dict>
</plist>
``

---

## mechanic_mobile/ios/Runner/AppDelegate.swift

``swift
import Flutter
import UIKit

@main
@objc class AppDelegate: FlutterAppDelegate {
  override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
  ) -> Bool {
    GeneratedPluginRegistrant.register(with: self)
    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }
}
``

---

## mechanic_mobile/ios/Runner/Assets.xcassets/AppIcon.appiconset/Contents.json

``json
{
  "images" : [
    {
      "size" : "20x20",
      "idiom" : "iphone",
      "filename" : "Icon-App-20x20@2x.png",
      "scale" : "2x"
    },
    {
      "size" : "20x20",
      "idiom" : "iphone",
      "filename" : "Icon-App-20x20@3x.png",
      "scale" : "3x"
    },
    {
      "size" : "29x29",
      "idiom" : "iphone",
      "filename" : "Icon-App-29x29@1x.png",
      "scale" : "1x"
    },
    {
      "size" : "29x29",
      "idiom" : "iphone",
      "filename" : "Icon-App-29x29@2x.png",
      "scale" : "2x"
    },
    {
      "size" : "29x29",
      "idiom" : "iphone",
      "filename" : "Icon-App-29x29@3x.png",
      "scale" : "3x"
    },
    {
      "size" : "40x40",
      "idiom" : "iphone",
      "filename" : "Icon-App-40x40@2x.png",
      "scale" : "2x"
    },
    {
      "size" : "40x40",
      "idiom" : "iphone",
      "filename" : "Icon-App-40x40@3x.png",
      "scale" : "3x"
    },
    {
      "size" : "60x60",
      "idiom" : "iphone",
      "filename" : "Icon-App-60x60@2x.png",
      "scale" : "2x"
    },
    {
      "size" : "60x60",
      "idiom" : "iphone",
      "filename" : "Icon-App-60x60@3x.png",
      "scale" : "3x"
    },
    {
      "size" : "20x20",
      "idiom" : "ipad",
      "filename" : "Icon-App-20x20@1x.png",
      "scale" : "1x"
    },
    {
      "size" : "20x20",
      "idiom" : "ipad",
      "filename" : "Icon-App-20x20@2x.png",
      "scale" : "2x"
    },
    {
      "size" : "29x29",
      "idiom" : "ipad",
      "filename" : "Icon-App-29x29@1x.png",
      "scale" : "1x"
    },
    {
      "size" : "29x29",
      "idiom" : "ipad",
      "filename" : "Icon-App-29x29@2x.png",
      "scale" : "2x"
    },
    {
      "size" : "40x40",
      "idiom" : "ipad",
      "filename" : "Icon-App-40x40@1x.png",
      "scale" : "1x"
    },
    {
      "size" : "40x40",
      "idiom" : "ipad",
      "filename" : "Icon-App-40x40@2x.png",
      "scale" : "2x"
    },
    {
      "size" : "76x76",
      "idiom" : "ipad",
      "filename" : "Icon-App-76x76@1x.png",
      "scale" : "1x"
    },
    {
      "size" : "76x76",
      "idiom" : "ipad",
      "filename" : "Icon-App-76x76@2x.png",
      "scale" : "2x"
    },
    {
      "size" : "83.5x83.5",
      "idiom" : "ipad",
      "filename" : "Icon-App-83.5x83.5@2x.png",
      "scale" : "2x"
    },
    {
      "size" : "1024x1024",
      "idiom" : "ios-marketing",
      "filename" : "Icon-App-1024x1024@1x.png",
      "scale" : "1x"
    }
  ],
  "info" : {
    "version" : 1,
    "author" : "xcode"
  }
}
``

---

## mechanic_mobile/ios/Runner/Assets.xcassets/LaunchImage.imageset/Contents.json

``json
{
  "images" : [
    {
      "idiom" : "universal",
      "filename" : "LaunchImage.png",
      "scale" : "1x"
    },
    {
      "idiom" : "universal",
      "filename" : "LaunchImage@2x.png",
      "scale" : "2x"
    },
    {
      "idiom" : "universal",
      "filename" : "LaunchImage@3x.png",
      "scale" : "3x"
    }
  ],
  "info" : {
    "version" : 1,
    "author" : "xcode"
  }
}
``

---

## mechanic_mobile/ios/Runner/Assets.xcassets/LaunchImage.imageset/README.md

``markdown
# Launch Screen Assets

You can customize the launch screen with your own desired assets by replacing the image files in this directory.

You can also do it by opening your Flutter project's Xcode project with `open ios/Runner.xcworkspace`, selecting `Runner/Assets.xcassets` in the Project Navigator and dropping in the desired images.
``

---

## mechanic_mobile/ios/Runner/Base.lproj/LaunchScreen.storyboard

``
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<document type="com.apple.InterfaceBuilder3.CocoaTouch.Storyboard.XIB" version="3.0" toolsVersion="12121" systemVersion="16G29" targetRuntime="iOS.CocoaTouch" propertyAccessControl="none" useAutolayout="YES" launchScreen="YES" colorMatched="YES" initialViewController="01J-lp-oVM">
    <dependencies>
        <deployment identifier="iOS"/>
        <plugIn identifier="com.apple.InterfaceBuilder.IBCocoaTouchPlugin" version="12089"/>
    </dependencies>
    <scenes>
        <!--View Controller-->
        <scene sceneID="EHf-IW-A2E">
            <objects>
                <viewController id="01J-lp-oVM" sceneMemberID="viewController">
                    <layoutGuides>
                        <viewControllerLayoutGuide type="top" id="Ydg-fD-yQy"/>
                        <viewControllerLayoutGuide type="bottom" id="xbc-2k-c8Z"/>
                    </layoutGuides>
                    <view key="view" contentMode="scaleToFill" id="Ze5-6b-2t3">
                        <autoresizingMask key="autoresizingMask" widthSizable="YES" heightSizable="YES"/>
                        <subviews>
                            <imageView opaque="NO" clipsSubviews="YES" multipleTouchEnabled="YES" contentMode="center" image="LaunchImage" translatesAutoresizingMaskIntoConstraints="NO" id="YRO-k0-Ey4">
                            </imageView>
                        </subviews>
                        <color key="backgroundColor" red="1" green="1" blue="1" alpha="1" colorSpace="custom" customColorSpace="sRGB"/>
                        <constraints>
                            <constraint firstItem="YRO-k0-Ey4" firstAttribute="centerX" secondItem="Ze5-6b-2t3" secondAttribute="centerX" id="1a2-6s-vTC"/>
                            <constraint firstItem="YRO-k0-Ey4" firstAttribute="centerY" secondItem="Ze5-6b-2t3" secondAttribute="centerY" id="4X2-HB-R7a"/>
                        </constraints>
                    </view>
                </viewController>
                <placeholder placeholderIdentifier="IBFirstResponder" id="iYj-Kq-Ea1" userLabel="First Responder" sceneMemberID="firstResponder"/>
            </objects>
            <point key="canvasLocation" x="53" y="375"/>
        </scene>
    </scenes>
    <resources>
        <image name="LaunchImage" width="168" height="185"/>
    </resources>
</document>
``

---

## mechanic_mobile/ios/Runner/Base.lproj/Main.storyboard

``
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<document type="com.apple.InterfaceBuilder3.CocoaTouch.Storyboard.XIB" version="3.0" toolsVersion="10117" systemVersion="15F34" targetRuntime="iOS.CocoaTouch" propertyAccessControl="none" useAutolayout="YES" useTraitCollections="YES" initialViewController="BYZ-38-t0r">
    <dependencies>
        <deployment identifier="iOS"/>
        <plugIn identifier="com.apple.InterfaceBuilder.IBCocoaTouchPlugin" version="10085"/>
    </dependencies>
    <scenes>
        <!--Flutter View Controller-->
        <scene sceneID="tne-QT-ifu">
            <objects>
                <viewController id="BYZ-38-t0r" customClass="FlutterViewController" sceneMemberID="viewController">
                    <layoutGuides>
                        <viewControllerLayoutGuide type="top" id="y3c-jy-aDJ"/>
                        <viewControllerLayoutGuide type="bottom" id="wfy-db-euE"/>
                    </layoutGuides>
                    <view key="view" contentMode="scaleToFill" id="8bC-Xf-vdC">
                        <rect key="frame" x="0.0" y="0.0" width="600" height="600"/>
                        <autoresizingMask key="autoresizingMask" widthSizable="YES" heightSizable="YES"/>
                        <color key="backgroundColor" white="1" alpha="1" colorSpace="custom" customColorSpace="calibratedWhite"/>
                    </view>
                </viewController>
                <placeholder placeholderIdentifier="IBFirstResponder" id="dkx-z0-nzr" sceneMemberID="firstResponder"/>
            </objects>
        </scene>
    </scenes>
</document>
``

---

## mechanic_mobile/ios/Runner/Info.plist

``
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>CFBundleDevelopmentRegion</key>
	<string>$(DEVELOPMENT_LANGUAGE)</string>
	<key>CFBundleDisplayName</key>
	<string>Mechanic Mobile</string>
	<key>CFBundleExecutable</key>
	<string>$(EXECUTABLE_NAME)</string>
	<key>CFBundleIdentifier</key>
	<string>$(PRODUCT_BUNDLE_IDENTIFIER)</string>
	<key>CFBundleInfoDictionaryVersion</key>
	<string>6.0</string>
	<key>CFBundleName</key>
	<string>mechanic_mobile</string>
	<key>CFBundlePackageType</key>
	<string>APPL</string>
	<key>CFBundleShortVersionString</key>
	<string>$(FLUTTER_BUILD_NAME)</string>
	<key>CFBundleSignature</key>
	<string>????</string>
	<key>CFBundleVersion</key>
	<string>$(FLUTTER_BUILD_NUMBER)</string>
	<key>LSRequiresIPhoneOS</key>
	<true/>
	<key>UILaunchStoryboardName</key>
	<string>LaunchScreen</string>
	<key>UIMainStoryboardFile</key>
	<string>Main</string>
	<key>UISupportedInterfaceOrientations</key>
	<array>
		<string>UIInterfaceOrientationPortrait</string>
		<string>UIInterfaceOrientationLandscapeLeft</string>
		<string>UIInterfaceOrientationLandscapeRight</string>
	</array>
	<key>UISupportedInterfaceOrientations~ipad</key>
	<array>
		<string>UIInterfaceOrientationPortrait</string>
		<string>UIInterfaceOrientationPortraitUpsideDown</string>
		<string>UIInterfaceOrientationLandscapeLeft</string>
		<string>UIInterfaceOrientationLandscapeRight</string>
	</array>
	<key>CADisableMinimumFrameDurationOnPhone</key>
	<true/>
	<key>UIApplicationSupportsIndirectInputEvents</key>
	<true/>
	<!-- Permisos para speech_to_text -->
	<key>NSSpeechRecognitionUsageDescription</key>
	<string>Necesitamos reconocer tu voz para llenar el reporte técnico automáticamente.</string>
	<key>NSMicrophoneUsageDescription</key>
	<string>El micrófono se usará para capturar el diagnóstico del mecánico.</string>

	<!-- Permisos para image_picker -->
	<key>NSPhotoLibraryUsageDescription</key>
	<string>Necesitamos acceso a la galería para que puedas subir fotos del vehículo.</string>
	<key>NSCameraUsageDescription</key>
	<string>Necesitamos usar la cámara para tomar fotos de las piezas dañadas.</string>
	<key>NSMicrophoneUsageDescription</key>
	<string>Se requiere el micrófono si vas a grabar videos del motor.</string>

	<!-- Permisos para notificaciones push -->
	<key>FirebaseAppDelegateProxyEnabled</key>
	<false/>
	<key>FirebaseMessagingAutoInitEnabled</key>
	<true/>

	<!-- Permisos para geolocalización -->
	<key>NSLocationWhenInUseUsageDescription</key>
	<string>Esta aplicación necesita tu ubicación para mostrarte el mapa y el tracking del técnico.</string>
	<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
	<string>Esta aplicación necesita tu ubicación incluso en segundo plano para actualizar tu posición.</string>
	<key>NSLocationAlwaysUsageDescription</key>
	<string>Esta aplicación necesita tu ubicación para funcionar correctamente.</string>
</dict>
</plist>
``

---

## mechanic_mobile/ios/Runner/Runner-Bridging-Header.h

``
#import "GeneratedPluginRegistrant.h"
``

---

## mechanic_mobile/ios/RunnerTests/RunnerTests.swift

``swift
import Flutter
import UIKit
import XCTest

class RunnerTests: XCTestCase {

  func testExample() {
    // If you add code to the Runner application, consider adding tests here.
    // See https://developer.apple.com/documentation/xctest for more information about using XCTest.
  }

}
``

---

## mechanic_mobile/lib/constants/env.dart

``dart
import 'package:flutter_dotenv/flutter_dotenv.dart';

class Env {
  static String baseUrl = dotenv.get("BASE_URL");
  static String systemName = dotenv.get("SYSTEM_NAME");
  static String openRouterApiKey = dotenv.get("OPEN_ROUTER_API_KEY");
}
``

---

## mechanic_mobile/lib/core/di/injection_container.dart

``dart
import 'package:get_it/get_it.dart';
import 'package:mechanic_mobile/domain/repositories/service_request_repository.dart';
import 'package:mechanic_mobile/domain/repositories/vehicle_repository.dart';
import 'package:mechanic_mobile/domain/usecases/accept_candidate_usecase.dart';
import 'package:mechanic_mobile/domain/usecases/add_file_evidence_usecase.dart';
import 'package:mechanic_mobile/domain/usecases/add_text_evidence_usecase.dart';
import 'package:mechanic_mobile/domain/usecases/cancel_incident_usecase.dart';
import 'package:mechanic_mobile/domain/usecases/cancel_service_usecase.dart';
import 'package:mechanic_mobile/domain/usecases/complete_service_usecase.dart';
import 'package:mechanic_mobile/domain/usecases/create_incident_usecase.dart';
import 'package:mechanic_mobile/domain/usecases/create_provider_service_usecase.dart';
import 'package:mechanic_mobile/domain/usecases/create_technician_usecase.dart';
import 'package:mechanic_mobile/domain/usecases/create_vehicle_usecase.dart';
import 'package:mechanic_mobile/domain/usecases/dispatch_incident_usecase.dart';
import 'package:mechanic_mobile/domain/usecases/get_active_operations_usecase.dart';
import 'package:mechanic_mobile/domain/usecases/get_all_incidents_usecase.dart';
import 'package:mechanic_mobile/domain/usecases/get_available_candidates_usecase.dart';
import 'package:mechanic_mobile/domain/usecases/get_candidate_details_usecase.dart';
import 'package:mechanic_mobile/domain/usecases/get_catalog_services_usecase.dart';
import 'package:mechanic_mobile/domain/usecases/get_incident_candidates_usecase.dart';
import 'package:mechanic_mobile/domain/usecases/get_incident_details_usecase.dart';
import 'package:mechanic_mobile/domain/usecases/get_live_tracking_usecase.dart';
import 'package:mechanic_mobile/domain/usecases/get_my_devices_usecase.dart';
import 'package:mechanic_mobile/domain/usecases/get_my_incidents_usecase.dart';
import 'package:mechanic_mobile/domain/usecases/get_operation_state_usecase.dart';
import 'package:mechanic_mobile/domain/usecases/get_provider_profile_usecase.dart';
import 'package:mechanic_mobile/domain/usecases/get_provider_services_usecase.dart';
import 'package:mechanic_mobile/domain/usecases/get_providers_usecase.dart';
import 'package:mechanic_mobile/domain/usecases/get_service_requests_usecase.dart';
import 'package:mechanic_mobile/domain/usecases/get_my_vehicles_usecase.dart';
import 'package:mechanic_mobile/domain/usecases/get_technicians_usecase.dart';
import 'package:mechanic_mobile/domain/usecases/get_tracking_history_usecase.dart';
import 'package:mechanic_mobile/domain/usecases/get_vehicle_by_id_usecase.dart';
import 'package:mechanic_mobile/domain/usecases/mark_arrived_usecase.dart';
import 'package:mechanic_mobile/domain/usecases/publish_incident_usecase.dart';
import 'package:mechanic_mobile/domain/usecases/refresh_route_usecase.dart';
import 'package:mechanic_mobile/domain/usecases/register_device_usecase.dart';
import 'package:mechanic_mobile/domain/usecases/reject_candidate_usecase.dart';
import 'package:mechanic_mobile/domain/usecases/report_location_usecase.dart';
import 'package:mechanic_mobile/domain/usecases/start_service_usecase.dart';
import 'package:mechanic_mobile/domain/usecases/unregister_device_usecase.dart';
import 'package:mechanic_mobile/domain/usecases/update_incident_usecase.dart';
import 'package:mechanic_mobile/domain/usecases/update_provider_profile_usecase.dart';
import 'package:mechanic_mobile/domain/usecases/update_technician_usecase.dart';
import 'package:mechanic_mobile/infrastructure/datasources/admin_incident_remote_data_source.dart';
import 'package:mechanic_mobile/infrastructure/datasources/catalog_remote_data_source.dart';
import 'package:mechanic_mobile/infrastructure/datasources/evidence_remote_data_source.dart';
import 'package:mechanic_mobile/infrastructure/datasources/incident_remote_data_source.dart';
import 'package:mechanic_mobile/infrastructure/datasources/notification_remote_data_source.dart';
import 'package:mechanic_mobile/infrastructure/datasources/provider_admin_remote_data_source.dart';
import 'package:mechanic_mobile/infrastructure/datasources/provider_assignment_remote_data_source.dart';
import 'package:mechanic_mobile/infrastructure/datasources/provider_operation_remote_data_source.dart';
import 'package:mechanic_mobile/infrastructure/datasources/provider_remote_data_source.dart';
import 'package:mechanic_mobile/infrastructure/datasources/technician_datasource.dart';
import 'package:mechanic_mobile/infrastructure/datasources/tracking_remote_data_source.dart';
import 'package:mechanic_mobile/infrastructure/datasources/vehicle_remote_data_source.dart';
import 'package:mechanic_mobile/infrastructure/repositories/admin_incident_repository_impl.dart';
import 'package:mechanic_mobile/infrastructure/repositories/catalog_repository_impl.dart';
import 'package:mechanic_mobile/infrastructure/repositories/evidence_repository_impl.dart';
import 'package:mechanic_mobile/infrastructure/repositories/incident_repository_impl.dart';
import 'package:mechanic_mobile/infrastructure/repositories/notification_repository_impl.dart';
import 'package:mechanic_mobile/infrastructure/repositories/provider_admin_repository_impl.dart';
import 'package:mechanic_mobile/infrastructure/repositories/provider_assignment_repository_impl.dart';
import 'package:mechanic_mobile/infrastructure/repositories/provider_operation_repository_impl.dart';
import 'package:mechanic_mobile/infrastructure/repositories/provider_repository_impl.dart';
import 'package:mechanic_mobile/infrastructure/repositories/technician_repository_impl.dart';
import 'package:mechanic_mobile/infrastructure/repositories/tracking_repository_impl.dart';
import 'package:mechanic_mobile/infrastructure/repositories/vehicle_repository_impl.dart';
import 'package:mechanic_mobile/presentation/services/notification_service.dart';
import 'package:mechanic_mobile/presentation/viewmodels/admin_incidents_viewmodel.dart';
import 'package:mechanic_mobile/presentation/viewmodels/admin_providers_viewmodel.dart';
import 'package:mechanic_mobile/presentation/viewmodels/catalog_services_viewmodel.dart';
import 'package:mechanic_mobile/presentation/viewmodels/client_tracking_viewmodel.dart';
import 'package:mechanic_mobile/presentation/viewmodels/evidence_viewmodel.dart';
import 'package:mechanic_mobile/presentation/viewmodels/home_viewmodel.dart';
import 'package:mechanic_mobile/presentation/viewmodels/incidents_viewmodel.dart';
import 'package:mechanic_mobile/presentation/viewmodels/platform_tracking_viewmodel.dart';
import 'package:mechanic_mobile/presentation/viewmodels/provider_available_requests_viewmodel.dart';
import 'package:mechanic_mobile/presentation/viewmodels/provider_operation_viewmodel.dart';
import 'package:mechanic_mobile/presentation/viewmodels/provider_profile_viewmodel.dart';
import 'package:mechanic_mobile/presentation/viewmodels/provider_tracking_viewmodel.dart';
import 'package:mechanic_mobile/presentation/viewmodels/technicians_viewmodel.dart';
import 'package:mechanic_mobile/presentation/viewmodels/vehicle_viewmodel.dart';

// CORE
import '../../core/network/api_client.dart';

// DATA
import '../../infrastructure/datasources/auth_remote_data_source.dart';
import '../../infrastructure/repositories/auth_repository_impl.dart';

// DOMAIN
import '../../domain/repositories/auth_repository.dart';
import '../../domain/usecases/login_usecase.dart';
import '../../domain/usecases/get_me_usecase.dart';
import '../../domain/usecases/get_my_profile_usecase.dart';
import '../../domain/usecases/register_usecase.dart';
import '../../domain/usecases/update_my_profile_usecase.dart';
import '../../domain/usecases/update_vehicle_usecase.dart';

// PRESENTATION
import '../../presentation/viewmodels/auth_viewmodel.dart';

final sl = GetIt.instance;

Future<void> init() async {
  // =========================
  // 🔒 CORE
  // =========================
  sl.registerLazySingleton(() => ApiClient());

  // =========================
  // 📡 DATASOURCES (REAL API)
  // =========================
  sl.registerLazySingleton<AuthRemoteDataSource>(
    () => AuthRemoteDataSource(sl()),
  );
  sl.registerLazySingleton<VehicleRemoteDataSource>(
    () => VehicleRemoteDataSource(sl()),
  );

  // =========================
  // 🧠 REPOSITORIES
  // =========================
  sl.registerLazySingleton<AuthRepository>(
    () => AuthRepositoryImpl(sl(), sl()),
  );

  sl.registerLazySingleton<VehicleRepository>(
    () => VehicleRepositoryImpl(sl()),
  );

  // =========================
  // 🎯 USE CASES
  // =========================
  sl.registerLazySingleton(() => LoginUseCase(sl()));
  sl.registerLazySingleton(() => RegisterUseCase(sl()));
  sl.registerLazySingleton(() => GetMeUseCase(sl()));
  sl.registerLazySingleton(() => GetMyProfileUseCase(sl()));
  sl.registerLazySingleton(() => UpdateMyProfileUseCase(sl()));
  sl.registerLazySingleton(() => CreateVehicleUseCase(sl()));
  sl.registerLazySingleton(() => GetMyVehiclesUseCase(sl()));
  sl.registerLazySingleton(() => GetVehicleByIdUseCase(sl()));
  sl.registerLazySingleton(() => UpdateVehicleUseCase(sl()));

  // =========================
  // 🧩 VIEWMODELS
  // =========================
  sl.registerLazySingleton(
    () => AuthViewModel(
      sl<LoginUseCase>(),
      sl<RegisterUseCase>(),
      sl<GetMeUseCase>(),
      sl<GetMyProfileUseCase>(),
      sl<UpdateMyProfileUseCase>(),
    ),
  );

  sl.registerLazySingleton(() => GetServiceRequestsUseCase(sl()));

  sl.registerLazySingleton(
    () => HomeViewModel(
      getServiceRequestsUseCase: sl<GetServiceRequestsUseCase>(),
      getAllIncidentsUseCase: sl<GetAllIncidentsUseCase>(),
    ),
  );
  sl.registerLazySingleton(
    () => VehicleViewModel(
      createVehicleUseCase: sl(),
      getMyVehiclesUseCase: sl(),
      getVehicleByIdUseCase: sl(),
      updateVehicleUseCase: sl(),
    ),
  );
  initTechniciansModule();
  initProviderModule();
  initCatalogModule();
  initIncidentModule();
  initEvidenceModule();
  initAdminIncidentModule();
  initProviderAssignmentModule();
  initProviderOperationModule();
  initTrackingModule();
  initNotificationModule();
  initAdminProvidersModule();
}

void initTechniciansModule() {
  sl.registerFactory<TechnicianRemoteDataSource>(
    () => TechnicianRemoteDataSourceImpl(sl<ApiClient>()),
  );

  sl.registerFactory<TechnicianRepository>(
    () => TechnicianRepository(sl<TechnicianRemoteDataSource>()),
  );

  sl.registerFactory<CreateTechnicianUseCase>(
    () => CreateTechnicianUseCaseImpl(sl<TechnicianRepository>()),
  );

  sl.registerFactory<GetTechniciansUseCase>(
    () => GetTechniciansUseCaseImpl(sl<TechnicianRepository>()),
  );

  sl.registerFactory<UpdateTechnicianUseCase>(
    () => UpdateTechnicianUseCaseImpl(sl<TechnicianRepository>()),
  );

  sl.registerFactory<TechniciansViewModel>(
    () => TechniciansViewModel(
      createTechnicianUseCase: sl<CreateTechnicianUseCase>(),
      getTechniciansUseCase: sl<GetTechniciansUseCase>(),
      updateTechnicianUseCase: sl<UpdateTechnicianUseCase>(),
    ),
  );
}

// Agregar módulo
void initProviderModule() {
  // Data Source
  sl.registerFactory<ProviderRemoteDataSource>(
    () => ProviderRemoteDataSourceImpl(sl<ApiClient>()),
  );

  // Repository
  sl.registerFactory<ProviderRepository>(
    () => ProviderRepository(sl<ProviderRemoteDataSource>()),
  );

  // Use Cases
  sl.registerFactory<GetProviderProfileUseCase>(
    () => GetProviderProfileUseCaseImpl(sl<ProviderRepository>()),
  );

  sl.registerFactory<UpdateProviderProfileUseCase>(
    () => UpdateProviderProfileUseCaseImpl(sl<ProviderRepository>()),
  );

  // ViewModel
  sl.registerFactory<ProviderProfileViewModel>(
    () => ProviderProfileViewModel(
      getProviderProfileUseCase: sl<GetProviderProfileUseCase>(),
      updateProviderProfileUseCase: sl<UpdateProviderProfileUseCase>(),
    ),
  );
}

void initCatalogModule() {
  // Data Source
  sl.registerFactory<CatalogRemoteDataSource>(
    () => CatalogRemoteDataSourceImpl(sl<ApiClient>()),
  );

  // Repository
  sl.registerFactory<CatalogRepository>(
    () => CatalogRepository(sl<CatalogRemoteDataSource>()),
  );

  // Use Cases
  sl.registerFactory<GetCatalogServicesUseCase>(
    () => GetCatalogServicesUseCaseImpl(sl<CatalogRepository>()),
  );

  sl.registerFactory<GetProviderServicesUseCase>(
    () => GetProviderServicesUseCaseImpl(sl<CatalogRepository>()),
  );

  sl.registerFactory<CreateProviderServiceUseCase>(
    () => CreateProviderServiceUseCaseImpl(sl<CatalogRepository>()),
  );

  // ViewModel
  sl.registerFactory<CatalogServicesViewModel>(
    () => CatalogServicesViewModel(
      getCatalogServicesUseCase: sl<GetCatalogServicesUseCase>(),
      getProviderServicesUseCase: sl<GetProviderServicesUseCase>(),
      createProviderServiceUseCase: sl<CreateProviderServiceUseCase>(),
    ),
  );
}

void initIncidentModule() {
  // Data Source
  sl.registerFactory<IncidentRemoteDataSource>(
    () => IncidentRemoteDataSourceImpl(sl<ApiClient>()),
  );

  // Repository
  sl.registerFactory<IncidentRepository>(
    () => IncidentRepository(sl<IncidentRemoteDataSource>()),
  );

  // Use Cases
  sl.registerFactory<GetMyIncidentsUseCase>(
    () => GetMyIncidentsUseCaseImpl(sl<IncidentRepository>()),
  );

  sl.registerFactory<CreateIncidentUseCase>(
    () => CreateIncidentUseCaseImpl(sl<IncidentRepository>()),
  );

  sl.registerFactory<UpdateIncidentUseCase>(
    () => UpdateIncidentUseCaseImpl(sl<IncidentRepository>()),
  );

  sl.registerFactory<CancelIncidentUseCase>(
    () => CancelIncidentUseCaseImpl(sl<IncidentRepository>()),
  );

  // ViewModel
  sl.registerFactory<IncidentsViewModel>(
    () => IncidentsViewModel(
      getMyIncidentsUseCase: sl<GetMyIncidentsUseCase>(),
      createIncidentUseCase: sl<CreateIncidentUseCase>(),
      updateIncidentUseCase: sl<UpdateIncidentUseCase>(),
      cancelIncidentUseCase: sl<CancelIncidentUseCase>(),
    ),
  );
}

void initEvidenceModule() {
  // Data Source
  sl.registerFactory<EvidenceRemoteDataSource>(
    () => EvidenceRemoteDataSourceImpl(sl<ApiClient>()),
  );

  // Repository
  sl.registerFactory<EvidenceRepository>(
    () => EvidenceRepository(sl<EvidenceRemoteDataSource>()),
  );

  // Use Cases
  sl.registerFactory<AddTextEvidenceUseCase>(
    () => AddTextEvidenceUseCaseImpl(sl<EvidenceRepository>()),
  );

  sl.registerFactory<AddFileEvidenceUseCase>(
    () => AddFileEvidenceUseCaseImpl(sl<EvidenceRepository>()),
  );

  // ViewModel
  sl.registerFactory<EvidenceViewModel>(
    () => EvidenceViewModel(
      addTextEvidenceUseCase: sl<AddTextEvidenceUseCase>(),
      addFileEvidenceUseCase: sl<AddFileEvidenceUseCase>(),
    ),
  );
}

void initAdminIncidentModule() {
  // Data Source
  sl.registerFactory<AdminIncidentRemoteDataSource>(
    () => AdminIncidentRemoteDataSourceImpl(sl<ApiClient>()),
  );

  // Repository
  sl.registerFactory<AdminIncidentRepository>(
    () => AdminIncidentRepository(sl<AdminIncidentRemoteDataSource>()),
  );

  // Use Cases
  sl.registerFactory<GetAllIncidentsUseCase>(
    () => GetAllIncidentsUseCaseImpl(sl<AdminIncidentRepository>()),
  );

  sl.registerFactory<GetIncidentDetailsUseCase>(
    () => GetIncidentDetailsUseCaseImpl(sl<AdminIncidentRepository>()),
  );

  sl.registerFactory<GetIncidentCandidatesUseCase>(
    () => GetIncidentCandidatesUseCaseImpl(sl<AdminIncidentRepository>()),
  );

  sl.registerFactory<PublishIncidentUseCase>(
    () => PublishIncidentUseCaseImpl(sl<AdminIncidentRepository>()),
  );

  // ViewModel
  sl.registerFactory<AdminIncidentsViewModel>(
    () => AdminIncidentsViewModel(
      getAllIncidentsUseCase: sl<GetAllIncidentsUseCase>(),
      getIncidentDetailsUseCase: sl<GetIncidentDetailsUseCase>(),
      getIncidentCandidatesUseCase: sl<GetIncidentCandidatesUseCase>(),
      publishIncidentUseCase: sl<PublishIncidentUseCase>(),
    ),
  );
}

void initProviderAssignmentModule() {
  // Data Source
  sl.registerFactory<ProviderAssignmentRemoteDataSource>(
    () => ProviderAssignmentRemoteDataSourceImpl(sl<ApiClient>()),
  );

  // Repository
  sl.registerFactory<ProviderAssignmentRepository>(
    () =>
        ProviderAssignmentRepository(sl<ProviderAssignmentRemoteDataSource>()),
  );

  // Use Cases
  sl.registerFactory<GetAvailableCandidatesUseCase>(
    () => GetAvailableCandidatesUseCaseImpl(sl<ProviderAssignmentRepository>()),
  );

  sl.registerFactory<GetCandidateDetailsUseCase>(
    () => GetCandidateDetailsUseCaseImpl(sl<ProviderAssignmentRepository>()),
  );

  sl.registerFactory<AcceptCandidateUseCase>(
    () => AcceptCandidateUseCaseImpl(sl<ProviderAssignmentRepository>()),
  );

  sl.registerFactory<RejectCandidateUseCase>(
    () => RejectCandidateUseCaseImpl(sl<ProviderAssignmentRepository>()),
  );

  // ViewModel
  sl.registerFactory<ProviderAvailableRequestsViewModel>(
    () => ProviderAvailableRequestsViewModel(
      getAvailableCandidatesUseCase: sl<GetAvailableCandidatesUseCase>(),
      getCandidateDetailsUseCase: sl<GetCandidateDetailsUseCase>(),
      acceptCandidateUseCase: sl<AcceptCandidateUseCase>(),
      rejectCandidateUseCase: sl<RejectCandidateUseCase>(),
    ),
  );
}

void initProviderOperationModule() {
  // Data Source
  sl.registerFactory<ProviderOperationRemoteDataSource>(
    () => ProviderOperationRemoteDataSourceImpl(sl<ApiClient>()),
  );

  // Repository
  sl.registerFactory<ProviderOperationRepository>(
    () => ProviderOperationRepository(sl<ProviderOperationRemoteDataSource>()),
  );

  // Use Cases
  sl.registerFactory<GetActiveOperationsUseCase>(
    () => GetActiveOperationsUseCaseImpl(sl<ProviderOperationRepository>()),
  );

  sl.registerFactory<GetOperationStateUseCase>(
    () => GetOperationStateUseCaseImpl(sl<ProviderOperationRepository>()),
  );

  sl.registerFactory<DispatchIncidentUseCase>(
    () => DispatchIncidentUseCaseImpl(sl<ProviderOperationRepository>()),
  );

  sl.registerFactory<MarkArrivedUseCase>(
    () => MarkArrivedUseCaseImpl(sl<ProviderOperationRepository>()),
  );

  sl.registerFactory<StartServiceUseCase>(
    () => StartServiceUseCaseImpl(sl<ProviderOperationRepository>()),
  );

  sl.registerFactory<CompleteServiceUseCase>(
    () => CompleteServiceUseCaseImpl(sl<ProviderOperationRepository>()),
  );

  sl.registerFactory<CancelServiceUseCase>(
    () => CancelServiceUseCaseImpl(sl<ProviderOperationRepository>()),
  );

  // ViewModel
  sl.registerFactory<ProviderOperationViewModel>(
    () => ProviderOperationViewModel(
      getActiveOperationsUseCase: sl<GetActiveOperationsUseCase>(),
      getOperationStateUseCase: sl<GetOperationStateUseCase>(),
      dispatchIncidentUseCase: sl<DispatchIncidentUseCase>(),
      markArrivedUseCase: sl<MarkArrivedUseCase>(),
      startServiceUseCase: sl<StartServiceUseCase>(),
      completeServiceUseCase: sl<CompleteServiceUseCase>(),
      cancelServiceUseCase: sl<CancelServiceUseCase>(),
    ),
  );
}

void initTrackingModule() {
  // Data Source
  sl.registerFactory<TrackingRemoteDataSource>(
    () => TrackingRemoteDataSourceImpl(sl<ApiClient>()),
  );

  // Repository
  sl.registerFactory<TrackingRepository>(
    () => TrackingRepository(sl<TrackingRemoteDataSource>()),
  );

  // Use Cases
  sl.registerFactory<ReportLocationUseCase>(
    () => ReportLocationUseCaseImpl(sl<TrackingRepository>()),
  );

  sl.registerFactory<RefreshRouteUseCase>(
    () => RefreshRouteUseCaseImpl(sl<TrackingRepository>()),
  );

  sl.registerFactory<GetLiveTrackingUseCase>(
    () => GetLiveTrackingUseCaseImpl(sl<TrackingRepository>()),
  );

  sl.registerFactory<GetTrackingHistoryUseCase>(
    () => GetTrackingHistoryUseCaseImpl(sl<TrackingRepository>()),
  );

  // ViewModel
  sl.registerFactory<ProviderTrackingViewModel>(
    () => ProviderTrackingViewModel(
      reportLocationUseCase: sl<ReportLocationUseCase>(),
      refreshRouteUseCase: sl<RefreshRouteUseCase>(),
      getLiveTrackingUseCase: sl<GetLiveTrackingUseCase>(),
      getTrackingHistoryUseCase: sl<GetTrackingHistoryUseCase>(),
    ),
  );

  sl.registerFactory<ClientTrackingViewModel>(
    () => ClientTrackingViewModel(sl<TrackingRemoteDataSource>()),
  );

  sl.registerFactory<PlatformTrackingViewModel>(
    () => PlatformTrackingViewModel(sl<TrackingRemoteDataSource>()),
  );
}

// Agregar módulo
void initNotificationModule() {
  // Data Source
  sl.registerFactory<NotificationRemoteDataSource>(
    () => NotificationRemoteDataSourceImpl(sl<ApiClient>()),
  );

  // Repository
  sl.registerFactory<NotificationRepository>(
    () => NotificationRepository(sl<NotificationRemoteDataSource>()),
  );

  // Use Cases
  sl.registerFactory<RegisterDeviceUseCase>(
    () => RegisterDeviceUseCaseImpl(sl<NotificationRepository>()),
  );

  sl.registerFactory<UnregisterDeviceUseCase>(
    () => UnregisterDeviceUseCaseImpl(sl<NotificationRepository>()),
  );

  sl.registerFactory<GetMyDevicesUseCase>(
    () => GetMyDevicesUseCaseImpl(sl<NotificationRepository>()),
  );

  // Service - Singleton
  sl.registerLazySingleton<NotificationService>(() => NotificationService());
}

void initAdminProvidersModule() {
  // Data Source
  sl.registerFactory<ProviderAdminRemoteDataSource>(
    () => ProviderAdminRemoteDataSourceImpl(sl<ApiClient>()),
  );

  // Repository
  sl.registerFactory<ProviderAdminRepository>(
    () => ProviderAdminRepository(sl<ProviderAdminRemoteDataSource>()),
  );

  // Use Case
  sl.registerFactory<GetProvidersUseCase>(
    () => GetProvidersUseCaseImpl(sl<ProviderAdminRepository>()),
  );

  // ViewModel
  sl.registerFactory<AdminProvidersViewModel>(
    () =>
        AdminProvidersViewModel(getProvidersUseCase: sl<GetProvidersUseCase>()),
  );
}
``

---

## mechanic_mobile/lib/core/error/failures.dart

``dart
abstract class Failure {
  final String message;

  Failure(this.message);
}

class ServerFailure extends Failure {
  ServerFailure(super.message);
}

class CacheFailure extends Failure {
  CacheFailure(super.message);
}

class AuthFailure extends Failure {
  AuthFailure(super.message);
}
``

---

## mechanic_mobile/lib/core/network/api_client.dart

``dart
import 'package:dio/dio.dart';
import 'package:http_parser/http_parser.dart';
import '../../constants/env.dart';

class ApiClient {
  late final Dio dio;
  String? token;

  ApiClient() {
    dio = Dio(
      BaseOptions(
        baseUrl: Env.baseUrl,
        connectTimeout: const Duration(seconds: 30),
        receiveTimeout: const Duration(seconds: 30),
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      ),
    );

    // Interceptor para agregar token automáticamente
    dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) {
          if (token != null) {
            options.headers["Authorization"] = "Bearer $token";
          }
          if (options.data != null) {}
          return handler.next(options);
        },
        onResponse: (response, handler) {
          return handler.next(response);
        },
        onError: (error, handler) {
          return handler.next(error);
        },
      ),
    );
  }

  void setToken(String token) {
    this.token = token;
  }

  void clearToken() {
    token = null;
  }

  Future<Response> post(String path, dynamic data) async {
    return await dio.post(path, data: data);
  }

  Future<Response> get(String path) async {
    return await dio.get(path);
  }

  Future<Response> patch(String path, dynamic data) async {
    return await dio.patch(path, data: data);
  }

  Future<Response> delete(String path) async {
    return await dio.delete(path);
  }

  Future<Response> uploadFile(
    String path, {
    required String fieldName,
    required String fileName,
    required List<int> bytes,
    required String mimeType,
    Map<String, dynamic>? additionalFields,
  }) async {
    final formData = FormData();

    // Agregar campos adicionales como texto
    if (additionalFields != null) {
      additionalFields.forEach((key, value) {
        formData.fields.add(MapEntry(key, value.toString()));
      });
    }

    // Agregar el archivo
    final multipartFile = MultipartFile.fromBytes(
      bytes,
      filename: fileName,
      contentType: MediaType.parse(mimeType),
    );
    formData.files.add(MapEntry(fieldName, multipartFile));

    return await dio.post(
      path,
      data: formData,
      options: Options(headers: {"Content-Type": "multipart/form-data"}),
    );
  }
}
``

---

## mechanic_mobile/lib/core/routes/app_routes.dart

``dart
import 'package:go_router/go_router.dart';
import 'package:mechanic_mobile/domain/entities/incident.dart';
import 'package:mechanic_mobile/domain/entities/provider_operation.dart';
import 'package:mechanic_mobile/presentation/pages/add_evidence_page.dart';
import 'package:mechanic_mobile/presentation/pages/admin_incident_detail_page.dart';
import 'package:mechanic_mobile/presentation/pages/admin_incidents_page.dart';
import 'package:mechanic_mobile/presentation/pages/admin_providers_page.dart';
import 'package:mechanic_mobile/presentation/pages/catalog_services_page.dart';
import 'package:mechanic_mobile/presentation/pages/client_tracking_page.dart';
import 'package:mechanic_mobile/presentation/pages/create_incident_page.dart';
import 'package:mechanic_mobile/presentation/pages/devices_page.dart';
import 'package:mechanic_mobile/presentation/pages/incident_detail_page.dart';
import 'package:mechanic_mobile/presentation/pages/incidents_page.dart';
import 'package:mechanic_mobile/presentation/pages/map_page.dart';
import 'package:mechanic_mobile/presentation/pages/platform_tracking_page.dart';
import 'package:mechanic_mobile/presentation/pages/provider_active_operations_page.dart';
import 'package:mechanic_mobile/presentation/pages/provider_available_requests_page.dart';
import 'package:mechanic_mobile/presentation/pages/provider_operation_detail_page.dart';
import 'package:mechanic_mobile/presentation/pages/provider_profile_page.dart';
import 'package:mechanic_mobile/presentation/pages/provider_tracking_page.dart';
import 'package:mechanic_mobile/presentation/pages/technicians_page.dart';
import '../../domain/entities/service_request.dart';
import '../../presentation/pages/login_page.dart';
import '../../presentation/pages/register_page.dart';
import '../../presentation/pages/home_page.dart';
import '../../presentation/pages/request_detail_page.dart';
import '../../presentation/pages/vehicles_page.dart';

final appRouter = GoRouter(
  initialLocation: '/login',
  routes: [
    GoRoute(path: '/login', builder: (context, state) => const LoginPage()),
    GoRoute(
      path: '/register',
      builder: (context, state) => const RegisterPage(),
    ),
    GoRoute(path: '/', builder: (context, state) => const HomePage()),
    GoRoute(
      path: '/vehicles',
      builder: (context, state) => const VehiclesPage(),
    ),
    GoRoute(
      path: '/technicians',
      builder: (context, state) => const TechniciansPage(),
    ),
    GoRoute(
      path: '/provider-profile',
      builder: (context, state) => const ProviderProfilePage(),
    ),
    GoRoute(
      path: '/catalog-services',
      builder: (context, state) => const CatalogServicesPage(),
    ),
    GoRoute(
      path: '/incidents',
      name: 'incidents',
      builder: (context, state) => const IncidentsPage(),
    ),
    GoRoute(
      path: '/create-incident',
      name: 'create-incident',
      builder: (context, state) => const CreateIncidentPage(),
    ),
    GoRoute(
      path: '/incident-detail/:id',
      name: 'incident-detail',
      builder: (context, state) {
        final incident = state.extra as Incident?;
        return IncidentDetailPage(incident: incident);
      },
    ),
    GoRoute(
      path: '/add-evidence/:incidentId',
      name: 'add-evidence',
      builder: (context, state) {
        final incidentId = state.pathParameters['incidentId']!;
        return AddEvidencePage(incidentId: incidentId);
      },
    ),
    GoRoute(
      path: '/admin/incidents',
      name: 'admin-incidents',
      builder: (context, state) => const AdminIncidentsPage(),
    ),
    GoRoute(
      path: '/admin/incident/:id',
      name: 'admin-incident-detail',
      builder: (context, state) {
        final id = state.pathParameters['id']!;
        return AdminIncidentDetailPage(incidentId: id);
      },
    ),

    GoRoute(
      path: '/provider/active-operations',
      name: 'provider-active-operations',
      builder: (context, state) => const ProviderActiveOperationsPage(),
    ),
    GoRoute(
      path: '/provider/operation/:id',
      name: 'provider-operation-detail',
      builder: (context, state) {
        final operation = state.extra as ProviderOperation?;
        return ProviderOperationDetailPage(operation: operation);
      },
    ),

    GoRoute(
      path: '/provider/tracking/:incidentId/:technicianId',
      name: 'provider-tracking',
      builder: (context, state) {
        final incidentId = state.pathParameters['incidentId']!;
        final technicianId = state.pathParameters['technicianId']!;
        return ProviderTrackingPage(
          incidentId: incidentId,
          technicianId: technicianId,
        );
      },
    ),

    GoRoute(
      path: '/client/tracking/:incidentId',
      name: 'client-tracking',
      builder: (context, state) {
        final incidentId = state.pathParameters['incidentId']!;
        return ClientTrackingPage(incidentId: incidentId);
      },
    ),
    GoRoute(
      path: '/platform/tracking/:incidentId',
      name: 'platform-tracking',
      builder: (context, state) {
        final incidentId = state.pathParameters['incidentId']!;
        return PlatformTrackingPage(incidentId: incidentId);
      },
    ),

    GoRoute(
      path: '/provider/available-requests',
      name: 'provider-available-requests',
      builder: (context, state) => const ProviderAvailableRequestsPage(),
    ),

    GoRoute(
      path: '/devices',
      name: 'devices',
      builder: (context, state) => const DevicesPage(),
    ),

    GoRoute(
      path: '/admin/providers',
      name: 'admin-providers',
      builder: (context, state) => const AdminProvidersPage(),
    ),

    GoRoute(
      path: '/map',
      name: 'map',
      builder: (context, state) => const MapPage(),
    ),

    GoRoute(
      path: '/request/:id',
      builder: (context, state) {
        // We pass the ServiceRequest as an extra object to avoid fetching it again just for the detail view
        // in this simple static data approach.
        final request = state.extra as ServiceRequest;
        return RequestDetailPage(request: request);
      },
    ),
  ],
);
``

---

## mechanic_mobile/lib/domain/entities/admin_incident.dart

``dart
import 'package:flutter/material.dart';
import '../../domain/entities/user.dart';
import '../../domain/entities/vehicle.dart';

class AdminIncident {
  final String id;
  final String clientUserId;
  final String? vehicleId;
  final String? providerId;
  final String? assignedTechnicianId;
  final String? dispatchMode;
  final String status;
  final String priority;
  final String reportedCategory;
  final String title;
  final String description;
  final String? clientContactPhoneSnapshot;
  final double? incidentLatitude;
  final double? incidentLongitude;
  final String? addressReference;
  final double? estimatedPriceMin;
  final double? estimatedPriceMax;
  final String? aiSummaryStatus;
  final String? structuredSummary;
  final String? suggestedCategory;
  final String? suggestedPriority;
  final bool requiresMoreInformation;
  final double? responderLastLatitude;
  final double? responderLastLongitude;
  final double? routeDistanceKm;
  final int? routeEtaMinutes;
  final DateTime? requestedAt;
  final DateTime? assignedAt;
  final DateTime? enRouteAt;
  final DateTime? arrivedAt;
  final DateTime? startedAt;
  final DateTime? completedAt;
  final DateTime? cancelledAt;
  final DateTime createdAt;
  final DateTime updatedAt;
  final Vehicle? vehicle;
  final User? clientUser;
  final ProviderInfo? provider;
  final TechnicianInfo? assignedTechnician;

  AdminIncident({
    required this.id,
    required this.clientUserId,
    this.vehicleId,
    this.providerId,
    this.assignedTechnicianId,
    this.dispatchMode,
    required this.status,
    required this.priority,
    required this.reportedCategory,
    required this.title,
    required this.description,
    this.clientContactPhoneSnapshot,
    this.incidentLatitude,
    this.incidentLongitude,
    this.addressReference,
    this.estimatedPriceMin,
    this.estimatedPriceMax,
    this.aiSummaryStatus,
    this.structuredSummary,
    this.suggestedCategory,
    this.suggestedPriority,
    required this.requiresMoreInformation,
    this.responderLastLatitude,
    this.responderLastLongitude,
    this.routeDistanceKm,
    this.routeEtaMinutes,
    this.requestedAt,
    this.assignedAt,
    this.enRouteAt,
    this.arrivedAt,
    this.startedAt,
    this.completedAt,
    this.cancelledAt,
    required this.createdAt,
    required this.updatedAt,
    this.vehicle,
    this.clientUser,
    this.provider,
    this.assignedTechnician,
  });

  String get location {
    if (incidentLatitude != null && incidentLongitude != null) {
      return '${incidentLatitude!.toStringAsFixed(4)}, ${incidentLongitude!.toStringAsFixed(4)}';
    }
    return 'Sin ubicación';
  }

  bool get isActive => status != 'COMPLETED' && status != 'CANCELLED';
  bool get canBePublished => status == 'PENDING';

  String get statusIcon {
    switch (status) {
      case 'PENDING':
        return '⏳';
      case 'PUBLISHED':
        return '📢';
      case 'ASSIGNED':
        return '👨‍🔧';
      case 'EN_ROUTE':
        return '🚗';
      case 'ON_SITE':
        return '📍';
      case 'IN_PROGRESS':
        return '🔧';
      case 'COMPLETED':
        return '✅';
      case 'CANCELLED':
        return '❌';
      default:
        return '📋';
    }
  }

  Color get statusColor {
    switch (status) {
      case 'PENDING':
        return const Color(0xFFFF9800);
      case 'PUBLISHED':
        return const Color(0xFF2196F3);
      case 'ASSIGNED':
        return const Color(0xFF9C27B0);
      case 'EN_ROUTE':
        return const Color(0xFF00BCD4);
      case 'ON_SITE':
        return const Color(0xFF00897B);
      case 'IN_PROGRESS':
        return const Color(0xFF3F51B5);
      case 'COMPLETED':
        return const Color(0xFF4CAF50);
      case 'CANCELLED':
        return const Color(0xFFF44336);
      default:
        return Colors.grey;
    }
  }
}

class Candidate {
  final String id;
  final String providerId;
  final String providerName;
  final String providerType;
  final double averageRating;
  final int availableCapacity;
  final int availableTechniciansCount;
  final double distanceKm;
  final List<String> matchedServices;
  final double score;
  final String rationale;
  final DateTime createdAt;

  Candidate({
    required this.id,
    required this.providerId,
    required this.providerName,
    required this.providerType,
    required this.averageRating,
    required this.availableCapacity,
    required this.availableTechniciansCount,
    required this.distanceKm,
    required this.matchedServices,
    required this.score,
    required this.rationale,
    required this.createdAt,
  });
}

class ProviderInfo {
  final String id;
  final String providerType;
  final String businessName;
  final String? contactPhone;
  final String? city;
  final bool isAvailable;
  final double averageRating;

  ProviderInfo({
    required this.id,
    required this.providerType,
    required this.businessName,
    this.contactPhone,
    this.city,
    required this.isAvailable,
    required this.averageRating,
  });
}

class TechnicianInfo {
  final String id;
  final String providerId;
  final String firstName;
  final String lastName;
  final String? phoneNumber;
  final String? specialty;
  final bool isActive;
  final bool isAvailable;

  TechnicianInfo({
    required this.id,
    required this.providerId,
    required this.firstName,
    required this.lastName,
    this.phoneNumber,
    this.specialty,
    required this.isActive,
    required this.isAvailable,
  });

  String get fullName => '$firstName $lastName';
}
``

---

## mechanic_mobile/lib/domain/entities/catalog_service.dart

``dart
class CatalogItem {
  final String id;
  final String code;
  final String category;
  final String title;
  final String description;
  final bool supportsMobileService;
  final bool supportsEmergencyService;
  final bool isActive;
  final int sortOrder;
  final DateTime createdAt;
  final DateTime updatedAt;

  CatalogItem({
    required this.id,
    required this.code,
    required this.category,
    required this.title,
    required this.description,
    required this.supportsMobileService,
    required this.supportsEmergencyService,
    required this.isActive,
    required this.sortOrder,
    required this.createdAt,
    required this.updatedAt,
  });
}

class ProviderService {
  final String id;
  final String providerId;
  final String serviceCatalogItemId;
  final String serviceCode;
  final String serviceCategory;
  final String catalogTitle;
  final String catalogDescription;
  final String? customTitle;
  final String? customDescription;
  final String effectiveTitle;
  final String effectiveDescription;
  final double priceEstimateMin;
  final double priceEstimateMax;
  final int estimatedDurationMinutes;
  final bool supportsMobileService;
  final bool supportsEmergencyService;
  final bool isMobileServiceEnabled;
  final bool isEmergencyServiceEnabled;
  final bool isActive;
  final DateTime createdAt;
  final DateTime updatedAt;

  ProviderService({
    required this.id,
    required this.providerId,
    required this.serviceCatalogItemId,
    required this.serviceCode,
    required this.serviceCategory,
    required this.catalogTitle,
    required this.catalogDescription,
    this.customTitle,
    this.customDescription,
    required this.effectiveTitle,
    required this.effectiveDescription,
    required this.priceEstimateMin,
    required this.priceEstimateMax,
    required this.estimatedDurationMinutes,
    required this.supportsMobileService,
    required this.supportsEmergencyService,
    required this.isMobileServiceEnabled,
    required this.isEmergencyServiceEnabled,
    required this.isActive,
    required this.createdAt,
    required this.updatedAt,
  });

  String get priceRange => '\$$priceEstimateMin - \$$priceEstimateMax';
  String get displayTitle => customTitle ?? catalogTitle;
  String get displayDescription => customDescription ?? catalogDescription;
}

class CatalogServiceEntry {
  final CatalogItem catalogItem;
  final ProviderService? providerService;
  final bool isConfigured;

  CatalogServiceEntry({
    required this.catalogItem,
    this.providerService,
    required this.isConfigured,
  });

  bool get isActive => providerService?.isActive ?? false;
  String get effectiveTitle =>
      providerService?.effectiveTitle ?? catalogItem.title;
}
``

---

## mechanic_mobile/lib/domain/entities/device_token.dart

``dart
class DeviceToken {
  final String id;
  final String userId;
  final String devicePlatform;
  final String? deviceLabel;
  final String appRole;
  final String pushProviderName;
  final bool isActive;
  final DateTime lastSeenAt;
  final DateTime createdAt;
  final DateTime updatedAt;

  DeviceToken({
    required this.id,
    required this.userId,
    required this.devicePlatform,
    this.deviceLabel,
    required this.appRole,
    required this.pushProviderName,
    required this.isActive,
    required this.lastSeenAt,
    required this.createdAt,
    required this.updatedAt,
  });

  String get platformIcon {
    switch (devicePlatform.toUpperCase()) {
      case 'ANDROID':
        return '🤖';
      case 'IOS':
        return '📱';
      case 'WEB':
        return '🌐';
      default:
        return '💻';
    }
  }

  String get statusText => isActive ? 'Activo' : 'Inactivo';
}
``

---

## mechanic_mobile/lib/domain/entities/evidence.dart

``dart
import '../../domain/entities/user.dart';

class Evidence {
  final String id;
  final String incidentId;
  final String uploadedByUserId;
  final String evidenceType;
  final String? originalFilename;
  final String storedFilename;
  final String? fileExtension;
  final String? mimeType;
  final int? fileSizeBytes;
  final String? description;
  final String? textContentSnapshot;
  final String storageProvider;
  final String? downloadUrl;
  final String? audioProcessingStatus;
  final String? transcriptText;
  final String? imageProcessingStatus;
  final String? imageSummary;
  final DateTime createdAt;
  final DateTime updatedAt;
  final User? uploadedByUser;

  Evidence({
    required this.id,
    required this.incidentId,
    required this.uploadedByUserId,
    required this.evidenceType,
    this.originalFilename,
    required this.storedFilename,
    this.fileExtension,
    this.mimeType,
    this.fileSizeBytes,
    this.description,
    this.textContentSnapshot,
    required this.storageProvider,
    this.downloadUrl,
    this.audioProcessingStatus,
    this.transcriptText,
    this.imageProcessingStatus,
    this.imageSummary,
    required this.createdAt,
    required this.updatedAt,
    this.uploadedByUser,
  });

  bool get isText => evidenceType == 'TEXT';
  bool get isImage => evidenceType == 'IMAGE';
  bool get isAudio => evidenceType == 'AUDIO';

  String get fileSizeFormatted {
    if (fileSizeBytes == null) return 'N/A';
    if (fileSizeBytes! < 1024) return '$fileSizeBytes B';
    if (fileSizeBytes! < 1024 * 1024) {
      return '${(fileSizeBytes! / 1024).toStringAsFixed(1)} KB';
    }
    return '${(fileSizeBytes! / (1024 * 1024)).toStringAsFixed(1)} MB';
  }
}
``

---

## mechanic_mobile/lib/domain/entities/incident.dart

``dart
import 'package:mechanic_mobile/domain/entities/user.dart';
import 'package:mechanic_mobile/domain/entities/vehicle.dart';

class Incident {
  final String id;
  final String clientUserId;
  final String? vehicleId;
  final String? providerId;
  final String? assignedTechnicianId;
  final String? dispatchMode;
  final String status;
  final String priority;
  final String reportedCategory;
  final String title;
  final String description;
  final String? clientContactPhoneSnapshot;
  final double? incidentLatitude;
  final double? incidentLongitude;
  final String? addressReference;
  final double? estimatedPriceMin;
  final double? estimatedPriceMax;
  final String? aiSummaryStatus;
  final String? structuredSummary;
  final String? suggestedCategory;
  final String? suggestedPriority;
  final bool requiresMoreInformation;
  final double? responderLastLatitude;
  final double? responderLastLongitude;
  final double? routeDistanceKm;
  final int? routeEtaMinutes;
  final DateTime? requestedAt;
  final DateTime? assignedAt;
  final DateTime? enRouteAt;
  final DateTime? arrivedAt;
  final DateTime? startedAt;
  final DateTime? completedAt;
  final DateTime? cancelledAt;
  final DateTime createdAt;
  final DateTime updatedAt;
  final Vehicle? vehicle;
  final User? clientUser;
  final ProviderInfo? provider;
  final TechnicianInfo? assignedTechnician;

  Incident({
    required this.id,
    required this.clientUserId,
    this.vehicleId,
    this.providerId,
    this.assignedTechnicianId,
    this.dispatchMode,
    required this.status,
    required this.priority,
    required this.reportedCategory,
    required this.title,
    required this.description,
    this.clientContactPhoneSnapshot,
    this.incidentLatitude,
    this.incidentLongitude,
    this.addressReference,
    this.estimatedPriceMin,
    this.estimatedPriceMax,
    this.aiSummaryStatus,
    this.structuredSummary,
    this.suggestedCategory,
    this.suggestedPriority,
    required this.requiresMoreInformation,
    this.responderLastLatitude,
    this.responderLastLongitude,
    this.routeDistanceKm,
    this.routeEtaMinutes,
    this.requestedAt,
    this.assignedAt,
    this.enRouteAt,
    this.arrivedAt,
    this.startedAt,
    this.completedAt,
    this.cancelledAt,
    required this.createdAt,
    required this.updatedAt,
    this.vehicle,
    this.clientUser,
    this.provider,
    this.assignedTechnician,
  });

  String get location {
    if (incidentLatitude != null && incidentLongitude != null) {
      return '${incidentLatitude!.toStringAsFixed(4)}, ${incidentLongitude!.toStringAsFixed(4)}';
    }
    return 'Sin ubicación';
  }

  bool get isActive => status != 'COMPLETED' && status != 'CANCELLED';
  bool get canBeCancelled => status == 'PENDING' || status == 'PUBLISHED';
  bool get hasProvider => provider != null;

  String get statusIcon {
    switch (status) {
      case 'PENDING':
        return '⏳';
      case 'PUBLISHED':
        return '📢';
      case 'ASSIGNED':
        return '👨‍🔧';
      case 'EN_ROUTE':
        return '🚗';
      case 'ON_SITE':
        return '📍';
      case 'IN_PROGRESS':
        return '🔧';
      case 'COMPLETED':
        return '✅';
      case 'CANCELLED':
        return '❌';
      default:
        return '📋';
    }
  }
}

class ProviderInfo {
  final String id;
  final String providerType;
  final String businessName;
  final String? contactPhone;
  final String? city;
  final bool isAvailable;
  final double averageRating;

  ProviderInfo({
    required this.id,
    required this.providerType,
    required this.businessName,
    this.contactPhone,
    this.city,
    required this.isAvailable,
    required this.averageRating,
  });
}

class TechnicianInfo {
  final String id;
  final String providerId;
  final String firstName;
  final String lastName;
  final String? phoneNumber;
  final String? specialty;
  final bool isActive;
  final bool isAvailable;

  TechnicianInfo({
    required this.id,
    required this.providerId,
    required this.firstName,
    required this.lastName,
    this.phoneNumber,
    this.specialty,
    required this.isActive,
    required this.isAvailable,
  });

  String get fullName => '$firstName $lastName';
}
``

---

## mechanic_mobile/lib/domain/entities/provider_candidate.dart

``dart
class ProviderCandidate {
  final String id;
  final String incidentId;
  final String providerId;
  final String status;
  final int recommendationRank;
  final double score;
  final double distanceKm;
  final List<String> requiredServiceCodes;
  final List<String> matchedServiceCodes;
  final Map<String, dynamic> rationale;
  final double providerAverageRatingSnapshot;
  final int providerAvailableCapacitySnapshot;
  final int availableTechniciansCountSnapshot;
  final DateTime publishedAt;
  final DateTime? respondedAt;
  final DateTime? expiresAt;
  final CandidateProvider provider;
  final CandidateIncident incident;

  ProviderCandidate({
    required this.id,
    required this.incidentId,
    required this.providerId,
    required this.status,
    required this.recommendationRank,
    required this.score,
    required this.distanceKm,
    required this.requiredServiceCodes,
    required this.matchedServiceCodes,
    required this.rationale,
    required this.providerAverageRatingSnapshot,
    required this.providerAvailableCapacitySnapshot,
    required this.availableTechniciansCountSnapshot,
    required this.publishedAt,
    this.respondedAt,
    this.expiresAt,
    required this.provider,
    required this.incident,
  });

  String get formattedDistance => '${distanceKm.toStringAsFixed(1)} km';
  String get formattedScore => '${score.toStringAsFixed(1)} pts';
  String get priority => incident.priority;
  String get category => incident.reportedCategory;
}

class CandidateProvider {
  final String id;
  final String providerType;
  final String businessName;
  final String city;
  final String? contactPhone;
  final double averageRating;
  final int availableCapacity;
  final int availableTechniciansCount;
  final double baseLatitude;
  final double baseLongitude;
  final CandidateProviderOwnerUser ownerUser;
  final List<CandidateMatchedService> matchedServices;

  CandidateProvider({
    required this.id,
    required this.providerType,
    required this.businessName,
    required this.city,
    this.contactPhone,
    required this.averageRating,
    required this.availableCapacity,
    required this.availableTechniciansCount,
    required this.baseLatitude,
    required this.baseLongitude,
    required this.ownerUser,
    required this.matchedServices,
  });
}

class CandidateProviderOwnerUser {
  final String id;
  final String email;
  final String firstName;
  final String lastName;
  final String fullName;
  final String phoneNumber;

  CandidateProviderOwnerUser({
    required this.id,
    required this.email,
    required this.firstName,
    required this.lastName,
    required this.fullName,
    required this.phoneNumber,
  });
}

class CandidateMatchedService {
  final String code;
  final String category;
  final String title;

  CandidateMatchedService({
    required this.code,
    required this.category,
    required this.title,
  });
}

class CandidateIncident {
  final String id;
  final String status;
  final String priority;
  final String reportedCategory;
  final String title;
  final String description;
  final double incidentLatitude;
  final double incidentLongitude;
  final String addressReference;
  final String aiSummaryStatus;
  final String? structuredSummary;
  final String? suggestedCategory;
  final String? suggestedPriority;
  final bool requiresMoreInformation;

  CandidateIncident({
    required this.id,
    required this.status,
    required this.priority,
    required this.reportedCategory,
    required this.title,
    required this.description,
    required this.incidentLatitude,
    required this.incidentLongitude,
    required this.addressReference,
    required this.aiSummaryStatus,
    this.structuredSummary,
    this.suggestedCategory,
    this.suggestedPriority,
    required this.requiresMoreInformation,
  });

  String get location {
    return '${incidentLatitude.toStringAsFixed(4)}, ${incidentLongitude.toStringAsFixed(4)}';
  }
}
``

---

## mechanic_mobile/lib/domain/entities/provider_operation.dart

``dart
import 'package:flutter/material.dart';

import '../../domain/entities/user.dart';
import '../../domain/entities/technician.dart';

class ProviderOperation {
  final String incidentId;
  final String providerId;
  final String? assignedTechnicianId;
  final String? dispatchMode;
  final String status;
  final String priority;
  final String reportedCategory;
  final String title;
  final String description;
  final String? clientContactPhoneSnapshot;
  final double? incidentLatitude;
  final double? incidentLongitude;
  final String? addressReference;
  final String? aiSummaryStatus;
  final String? structuredSummary;
  final String? suggestedCategory;
  final String? suggestedPriority;
  final bool requiresMoreInformation;
  final DateTime? assignedAt;
  final DateTime? enRouteAt;
  final DateTime? arrivedAt;
  final DateTime? startedAt;
  final DateTime? completedAt;
  final DateTime? cancelledAt;
  final User? clientUser;
  final Technician? assignedTechnician;

  ProviderOperation({
    required this.incidentId,
    required this.providerId,
    this.assignedTechnicianId,
    this.dispatchMode,
    required this.status,
    required this.priority,
    required this.reportedCategory,
    required this.title,
    required this.description,
    this.clientContactPhoneSnapshot,
    this.incidentLatitude,
    this.incidentLongitude,
    this.addressReference,
    this.aiSummaryStatus,
    this.structuredSummary,
    this.suggestedCategory,
    this.suggestedPriority,
    required this.requiresMoreInformation,
    this.assignedAt,
    this.enRouteAt,
    this.arrivedAt,
    this.startedAt,
    this.completedAt,
    this.cancelledAt,
    this.clientUser,
    this.assignedTechnician,
  });

  String get location {
    if (incidentLatitude != null && incidentLongitude != null) {
      return '${incidentLatitude!.toStringAsFixed(4)}, ${incidentLongitude!.toStringAsFixed(4)}';
    }
    return 'Sin ubicación';
  }

  bool get canDispatch => status == 'ASSIGNED' && assignedTechnicianId == null;
  bool get canArrive => status == 'EN_ROUTE';
  bool get canStart => status == 'ON_SITE';
  bool get canComplete => status == 'IN_PROGRESS';
  bool get canCancel => status != 'COMPLETED' && status != 'CANCELLED';

  String get statusText {
    switch (status) {
      case 'ASSIGNED':
        return 'Asignado - Pendiente de despachar';
      case 'EN_ROUTE':
        return 'En camino';
      case 'ON_SITE':
        return 'En el lugar';
      case 'IN_PROGRESS':
        return 'En progreso';
      case 'COMPLETED':
        return 'Completado';
      case 'CANCELLED':
        return 'Cancelado';
      default:
        return status;
    }
  }

  Color get statusColor {
    switch (status) {
      case 'ASSIGNED':
        return const Color(0xFF9C27B0);
      case 'EN_ROUTE':
        return const Color(0xFF00BCD4);
      case 'ON_SITE':
        return const Color(0xFF00897B);
      case 'IN_PROGRESS':
        return const Color(0xFF3F51B5);
      case 'COMPLETED':
        return const Color(0xFF4CAF50);
      case 'CANCELLED':
        return const Color(0xFFF44336);
      default:
        return Colors.grey;
    }
  }

  IconData get statusIcon {
    switch (status) {
      case 'ASSIGNED':
        return Icons.person_add;
      case 'EN_ROUTE':
        return Icons.directions_car;
      case 'ON_SITE':
        return Icons.location_on;
      case 'IN_PROGRESS':
        return Icons.build;
      case 'COMPLETED':
        return Icons.check_circle;
      case 'CANCELLED':
        return Icons.cancel;
      default:
        return Icons.info;
    }
  }
}
``

---

## mechanic_mobile/lib/domain/entities/provider_profile.dart

``dart
import 'package:mechanic_mobile/domain/entities/user.dart';

class ProviderProfile {
  final String id;
  final String ownerUserId;
  final String providerType;
  final String businessName;
  final String? legalName;
  final String? description;
  final String? contactEmail;
  final String? contactPhone;
  final String? city;
  final String? address;
  final double? baseLatitude;
  final double? baseLongitude;
  final bool isActive;
  final bool isAvailable;
  final int maxConcurrentServices;
  final int currentActiveServices;
  final int availableCapacity;
  final double averageRating;
  final User? ownerUser;
  final int techniciansCount;
  final int availableTechniciansCount;
  final int configuredServicesCount;
  final int activeServicesCount;
  final List<ProviderService> activeServices;
  final DateTime createdAt;
  final DateTime updatedAt;

  ProviderProfile({
    required this.id,
    required this.ownerUserId,
    required this.providerType,
    required this.businessName,
    this.legalName,
    this.description,
    this.contactEmail,
    this.contactPhone,
    this.city,
    this.address,
    this.baseLatitude,
    this.baseLongitude,
    required this.isActive,
    required this.isAvailable,
    required this.maxConcurrentServices,
    required this.currentActiveServices,
    required this.availableCapacity,
    required this.averageRating,
    this.ownerUser,
    required this.techniciansCount,
    required this.availableTechniciansCount,
    required this.configuredServicesCount,
    required this.activeServicesCount,
    required this.activeServices,
    required this.createdAt,
    required this.updatedAt,
  });

  String get fullAddress => [address, city].where((e) => e != null).join(', ');

  String get location {
    if (baseLatitude != null && baseLongitude != null) {
      return '${baseLatitude!.toStringAsFixed(4)}, ${baseLongitude!.toStringAsFixed(4)}';
    }
    return 'Sin ubicación';
  }

  bool get hasCapacity => currentActiveServices < maxConcurrentServices;
  int get remainingCapacity => maxConcurrentServices - currentActiveServices;
}

class ProviderService {
  final String id;
  final String serviceCatalogItemId;
  final String code;
  final String category;
  final String title;
  final double priceEstimateMin;
  final double priceEstimateMax;
  final int estimatedDurationMinutes;
  final bool isMobileServiceEnabled;
  final bool isEmergencyServiceEnabled;
  final bool isActive;

  ProviderService({
    required this.id,
    required this.serviceCatalogItemId,
    required this.code,
    required this.category,
    required this.title,
    required this.priceEstimateMin,
    required this.priceEstimateMax,
    required this.estimatedDurationMinutes,
    required this.isMobileServiceEnabled,
    required this.isEmergencyServiceEnabled,
    required this.isActive,
  });

  String get priceRange => '\$$priceEstimateMin - \$$priceEstimateMax';
}
``

---

## mechanic_mobile/lib/domain/entities/provider_summary.dart

``dart
import '../../domain/entities/user.dart';

class ProviderSummary {
  final String id;
  final String ownerUserId;
  final String providerType;
  final String businessName;
  final String? legalName;
  final String? description;
  final String? contactEmail;
  final String? contactPhone;
  final String? city;
  final String? address;
  final double? baseLatitude;
  final double? baseLongitude;
  final bool isActive;
  final bool isAvailable;
  final int maxConcurrentServices;
  final int currentActiveServices;
  final int availableCapacity;
  final double averageRating;
  final User? ownerUser;
  final int techniciansCount;
  final int availableTechniciansCount;
  final int configuredServicesCount;
  final int activeServicesCount;
  final List<ProviderServiceSummary> activeServices;
  final DateTime createdAt;
  final DateTime updatedAt;

  ProviderSummary({
    required this.id,
    required this.ownerUserId,
    required this.providerType,
    required this.businessName,
    this.legalName,
    this.description,
    this.contactEmail,
    this.contactPhone,
    this.city,
    this.address,
    this.baseLatitude,
    this.baseLongitude,
    required this.isActive,
    required this.isAvailable,
    required this.maxConcurrentServices,
    required this.currentActiveServices,
    required this.availableCapacity,
    required this.averageRating,
    this.ownerUser,
    required this.techniciansCount,
    required this.availableTechniciansCount,
    required this.configuredServicesCount,
    required this.activeServicesCount,
    required this.activeServices,
    required this.createdAt,
    required this.updatedAt,
  });

  String get fullAddress => [address, city].where((e) => e != null).join(', ');

  String get providerTypeIcon {
    switch (providerType) {
      case 'WORKSHOP':
        return '🏭';
      case 'INDEPENDENT_MECHANIC':
        return '🔧';
      default:
        return '🏢';
    }
  }

  String get providerTypeName {
    switch (providerType) {
      case 'WORKSHOP':
        return 'Taller';
      case 'INDEPENDENT_MECHANIC':
        return 'Mecánico Independiente';
      default:
        return 'Proveedor';
    }
  }

  bool get hasCapacity => currentActiveServices < maxConcurrentServices;
  int get remainingCapacity => maxConcurrentServices - currentActiveServices;
}

class ProviderServiceSummary {
  final String id;
  final String serviceCatalogItemId;
  final String code;
  final String category;
  final String title;
  final double priceEstimateMin;
  final double priceEstimateMax;
  final int estimatedDurationMinutes;
  final bool isMobileServiceEnabled;
  final bool isEmergencyServiceEnabled;
  final bool isActive;

  ProviderServiceSummary({
    required this.id,
    required this.serviceCatalogItemId,
    required this.code,
    required this.category,
    required this.title,
    required this.priceEstimateMin,
    required this.priceEstimateMax,
    required this.estimatedDurationMinutes,
    required this.isMobileServiceEnabled,
    required this.isEmergencyServiceEnabled,
    required this.isActive,
  });

  String get priceRange => '\$$priceEstimateMin - \$$priceEstimateMax';
}
``

---

## mechanic_mobile/lib/domain/entities/service_request.dart

``dart
class ServiceRequest {
  final String id;
  final String description;
  final String mechanicName;
  final String mechanicPhone;
  final String vehicleDetails;
  final String address;
  final String paymentMethod;
  final double totalCost;
  final String status; // e.g. Pending, En Route, In Progress, Completed
  final DateTime date;

  ServiceRequest({
    required this.id,
    required this.description,
    required this.mechanicName,
    required this.mechanicPhone,
    required this.vehicleDetails,
    required this.address,
    required this.paymentMethod,
    required this.totalCost,
    required this.status,
    required this.date,
  });
}
``

---

## mechanic_mobile/lib/domain/entities/technician.dart

``dart
class Technician {
  final String id;
  final String firstName;
  final String lastName;
  final String phoneNumber;
  final String specialty;
  final bool isAvailable;
  final double? currentLatitude;
  final double? currentLongitude;
  final DateTime? createdAt;
  final DateTime? updatedAt;

  Technician({
    required this.id,
    required this.firstName,
    required this.lastName,
    required this.phoneNumber,
    required this.specialty,
    required this.isAvailable,
    this.currentLatitude,
    this.currentLongitude,
    this.createdAt,
    this.updatedAt,
  });

  String get fullName => '$firstName $lastName';
  String get location => currentLatitude != null && currentLongitude != null
      ? 'Lat: ${currentLatitude!.toStringAsFixed(4)}, Lng: ${currentLongitude!.toStringAsFixed(4)}'
      : 'Sin ubicación';
}
``

---

## mechanic_mobile/lib/domain/entities/tracking.dart

``dart
import 'package:mechanic_mobile/domain/entities/admin_incident.dart';

import '../../domain/entities/user.dart';
import '../../domain/entities/technician.dart';

class TrackingData {
  final String incidentId;
  final String status;
  final String priority;
  final String title;
  final String description;
  final String? addressReference;
  final double? incidentLatitude;
  final double? incidentLongitude;
  final DateTime? assignedAt;
  final DateTime? enRouteAt;
  final DateTime? arrivedAt;
  final DateTime? startedAt;
  final DateTime? completedAt;
  final DateTime? cancelledAt;
  final ProviderInfo? provider;
  final Technician? assignedTechnician;
  final User? clientUser;
  final ResponderPosition? responderPosition;
  final RouteInfo? route;

  TrackingData({
    required this.incidentId,
    required this.status,
    required this.priority,
    required this.title,
    required this.description,
    this.addressReference,
    this.incidentLatitude,
    this.incidentLongitude,
    this.assignedAt,
    this.enRouteAt,
    this.arrivedAt,
    this.startedAt,
    this.completedAt,
    this.cancelledAt,
    this.provider,
    this.assignedTechnician,
    this.clientUser,
    this.responderPosition,
    this.route,
  });

  String get incidentLocation {
    if (incidentLatitude != null && incidentLongitude != null) {
      return '${incidentLatitude!.toStringAsFixed(4)}, ${incidentLongitude!.toStringAsFixed(4)}';
    }
    return 'Sin ubicación';
  }

  String get formattedDistance {
    if (route?.distanceKm != null) {
      return '${route!.distanceKm.toStringAsFixed(1)} km';
    }
    return 'N/A';
  }

  String get formattedEta {
    if (route?.etaMinutes != null) {
      final minutes = route!.etaMinutes;
      if (minutes < 60) return '$minutes min';
      final hours = minutes ~/ 60;
      final remainingMinutes = minutes % 60;
      return '$hours h $remainingMinutes min';
    }
    return 'N/A';
  }
}

class ResponderPosition {
  final double latitude;
  final double longitude;
  final String sourceType;
  final DateTime recordedAt;

  ResponderPosition({
    required this.latitude,
    required this.longitude,
    required this.sourceType,
    required this.recordedAt,
  });

  String get location =>
      '${latitude.toStringAsFixed(4)}, ${longitude.toStringAsFixed(4)}';
}

class RouteInfo {
  final String providerName;
  final double distanceMeters;
  final double distanceKm;
  final int durationSeconds;
  final int etaSeconds;
  final int etaMinutes;
  final String? polyline;
  final DateTime? lastCalculatedAt;
  final String? errorMessage;

  RouteInfo({
    required this.providerName,
    required this.distanceMeters,
    required this.distanceKm,
    required this.durationSeconds,
    required this.etaSeconds,
    required this.etaMinutes,
    this.polyline,
    this.lastCalculatedAt,
    this.errorMessage,
  });
}

class TrackingHistoryItem {
  final String id;
  final String incidentId;
  final String providerId;
  final String? technicianId;
  final String sourceType;
  final double latitude;
  final double longitude;
  final double? accuracyMeters;
  final DateTime recordedAt;
  final String? providerBusinessName;
  final String? technicianFullName;

  TrackingHistoryItem({
    required this.id,
    required this.incidentId,
    required this.providerId,
    this.technicianId,
    required this.sourceType,
    required this.latitude,
    required this.longitude,
    this.accuracyMeters,
    required this.recordedAt,
    this.providerBusinessName,
    this.technicianFullName,
  });

  String get location =>
      '${latitude.toStringAsFixed(4)}, ${longitude.toStringAsFixed(4)}';
  String get formattedTime {
    return '${recordedAt.hour.toString().padLeft(2, '0')}:${recordedAt.minute.toString().padLeft(2, '0')}';
  }
}
``

---

## mechanic_mobile/lib/domain/entities/user.dart

``dart
class User {
  final String id;
  final String email;
  final String fullName;
  final String? firstName;
  final String? lastName;
  final String? phoneNumber;
  final bool? isActive;
  final bool? isSuperuser;
  final List<String> roleCodes;
  final DateTime? createdAt;
  final DateTime? updatedAt;

  User({
    required this.id,
    required this.email,
    required this.fullName,
    this.firstName,
    this.lastName,
    this.phoneNumber,
    this.isActive,
    this.isSuperuser,
    this.roleCodes = const [],
    this.createdAt,
    this.updatedAt,
  });
}
``

---

## mechanic_mobile/lib/domain/entities/vehicle.dart

``dart
class Vehicle {
  final String id;
  final String ownerUserId;
  final String plateNumber;
  final String vehicleType;
  final String brand;
  final String model;
  final int year;
  final String color;
  final String notes;
  final bool isActive;
  final DateTime? createdAt;
  final DateTime? updatedAt;

  Vehicle({
    required this.id,
    required this.ownerUserId,
    required this.plateNumber,
    required this.vehicleType,
    required this.brand,
    required this.model,
    required this.year,
    required this.color,
    required this.notes,
    required this.isActive,
    this.createdAt,
    this.updatedAt,
  });
}
``

---

## mechanic_mobile/lib/domain/repositories/admin_incident_repository_impl.dart

``dart

``

---

## mechanic_mobile/lib/domain/repositories/auth_repository.dart

``dart
import '../entities/user.dart';

abstract class AuthRepository {
  Future<User> login(String email, String password);
  Future<User> register(Map<String, dynamic> body);
  Future<User> getMe();
  Future<User> getMyProfile();
  Future<User> updateMyProfile(Map<String, dynamic> body);
}
``

---

## mechanic_mobile/lib/domain/repositories/service_request_repository.dart

``dart
import '../entities/service_request.dart';

abstract class ServiceRequestRepository {
  Future<List<ServiceRequest>> getServiceRequests();
  Future<ServiceRequest> getServiceRequestById(String id);
}
``

---

## mechanic_mobile/lib/domain/repositories/vehicle_repository.dart

``dart
import '../entities/vehicle.dart';

abstract class VehicleRepository {
  Future<Vehicle> createVehicle(Map<String, dynamic> body);
  Future<List<Vehicle>> getMyVehicles();
  Future<Vehicle> getVehicleById(String vehicleId);
  Future<Vehicle> updateVehicle(String vehicleId, Map<String, dynamic> body);
}
``

---

## mechanic_mobile/lib/domain/usecases/accept_candidate_usecase.dart

``dart
abstract class AcceptCandidateUseCase {
  Future<Map<String, dynamic>> execute(String candidateId);
}
``

---

## mechanic_mobile/lib/domain/usecases/add_file_evidence_usecase.dart

``dart
import '../entities/evidence.dart';

abstract class AddFileEvidenceUseCase {
  Future<Evidence> execute(AddFileEvidenceParams params);
}

class AddFileEvidenceParams {
  final String incidentId;
  final String evidenceType;
  final String description;
  final dynamic file;
  final String? fileName; // ✅ Agregar para web

  AddFileEvidenceParams({
    required this.incidentId,
    required this.evidenceType,
    required this.description,
    required this.file,
    this.fileName,
  });
}
``

---

## mechanic_mobile/lib/domain/usecases/add_text_evidence_usecase.dart

``dart
import '../entities/evidence.dart';

abstract class AddTextEvidenceUseCase {
  Future<Evidence> execute(AddTextEvidenceParams params);
}

class AddTextEvidenceParams {
  final String incidentId;
  final String description;
  final String textContent;

  AddTextEvidenceParams({
    required this.incidentId,
    required this.description,
    required this.textContent,
  });

  Map<String, dynamic> toJson() => {
    'description': description,
    'text_content': textContent,
    'evidence_type': 'TEXT',
  };
}
``

---

## mechanic_mobile/lib/domain/usecases/cancel_incident_usecase.dart

``dart
abstract class CancelIncidentUseCase {
  Future<void> execute(String incidentId);
}
``

---

## mechanic_mobile/lib/domain/usecases/cancel_service_usecase.dart

``dart
import '../entities/provider_operation.dart';

abstract class CancelServiceUseCase {
  Future<ProviderOperation> execute(String incidentId, {String? note});
}
``

---

## mechanic_mobile/lib/domain/usecases/complete_service_usecase.dart

``dart
import '../entities/provider_operation.dart';

abstract class CompleteServiceUseCase {
  Future<ProviderOperation> execute(String incidentId, CompleteParams params);
}

class CompleteParams {
  final String? note;
  final String completionSummary;

  CompleteParams({this.note, required this.completionSummary});

  Map<String, dynamic> toJson() => {
    if (note != null) 'note': note,
    'completion_summary': completionSummary,
  };
}
``

---

## mechanic_mobile/lib/domain/usecases/create_incident_usecase.dart

``dart
import '../entities/incident.dart';

abstract class CreateIncidentUseCase {
  Future<Incident> execute(CreateIncidentParams params);
}

class CreateIncidentParams {
  final String vehicleId;
  final String title;
  final String description;
  final String reportedCategory;
  final String priority;
  final double incidentLatitude;
  final double incidentLongitude;
  final String addressReference;

  CreateIncidentParams({
    required this.vehicleId,
    required this.title,
    required this.description,
    required this.reportedCategory,
    required this.priority,
    required this.incidentLatitude,
    required this.incidentLongitude,
    required this.addressReference,
  });

  Map<String, dynamic> toJson() => {
    'vehicle_id': vehicleId,
    'title': title,
    'description': description,
    'reported_category': reportedCategory,
    'priority': priority,
    'incident_latitude': incidentLatitude,
    'incident_longitude': incidentLongitude,
    'address_reference': addressReference,
  };
}
``

---

## mechanic_mobile/lib/domain/usecases/create_provider_service_usecase.dart

``dart
import '../entities/catalog_service.dart';

abstract class CreateProviderServiceUseCase {
  Future<ProviderService> execute(CreateProviderServiceParams params);
}

class CreateProviderServiceParams {
  final String serviceCatalogItemId;
  final String? customTitle;
  final String? customDescription;
  final double priceEstimateMin;
  final double priceEstimateMax;
  final int estimatedDurationMinutes;
  final bool isMobileServiceEnabled;
  final bool isEmergencyServiceEnabled;
  final bool isActive;

  CreateProviderServiceParams({
    required this.serviceCatalogItemId,
    this.customTitle,
    this.customDescription,
    required this.priceEstimateMin,
    required this.priceEstimateMax,
    required this.estimatedDurationMinutes,
    required this.isMobileServiceEnabled,
    required this.isEmergencyServiceEnabled,
    required this.isActive,
  });

  Map<String, dynamic> toJson() => {
    'service_catalog_item_id': serviceCatalogItemId,
    if (customTitle != null) 'custom_title': customTitle,
    if (customDescription != null) 'custom_description': customDescription,
    'price_estimate_min': priceEstimateMin,
    'price_estimate_max': priceEstimateMax,
    'estimated_duration_minutes': estimatedDurationMinutes,
    'is_mobile_service_enabled': isMobileServiceEnabled,
    'is_emergency_service_enabled': isEmergencyServiceEnabled,
    'is_active': isActive,
  };
}
``

---

## mechanic_mobile/lib/domain/usecases/create_technician_usecase.dart

``dart
import '../entities/technician.dart';

abstract class CreateTechnicianUseCase {
  Future<Technician> execute(CreateTechnicianParams params);
}

class CreateTechnicianParams {
  final String firstName;
  final String lastName;
  final String phoneNumber;
  final String specialty;
  final bool isAvailable;
  final double? currentLatitude;
  final double? currentLongitude;

  CreateTechnicianParams({
    required this.firstName,
    required this.lastName,
    required this.phoneNumber,
    required this.specialty,
    required this.isAvailable,
    this.currentLatitude,
    this.currentLongitude,
  });

  Map<String, dynamic> toJson() => {
    'first_name': firstName,
    'last_name': lastName,
    'phone_number': phoneNumber,
    'specialty': specialty,
    'is_available': isAvailable,
    if (currentLatitude != null) 'current_latitude': currentLatitude,
    if (currentLongitude != null) 'current_longitude': currentLongitude,
  };
}
``

---

## mechanic_mobile/lib/domain/usecases/create_vehicle_usecase.dart

``dart
import '../entities/vehicle.dart';
import '../repositories/vehicle_repository.dart';

class CreateVehicleUseCase {
  final VehicleRepository repository;

  CreateVehicleUseCase(this.repository);

  Future<Vehicle> call(Map<String, dynamic> body) {
    return repository.createVehicle(body);
  }
}
``

---

## mechanic_mobile/lib/domain/usecases/dispatch_incident_usecase.dart

``dart
import '../entities/provider_operation.dart';

abstract class DispatchIncidentUseCase {
  Future<ProviderOperation> execute(String incidentId, DispatchParams params);
}

class DispatchParams {
  final String technicianId;
  final String? note;

  DispatchParams({required this.technicianId, this.note});

  Map<String, dynamic> toJson() => {
    'technician_id': technicianId,
    if (note != null) 'note': note,
  };
}
``

---

## mechanic_mobile/lib/domain/usecases/get_active_operations_usecase.dart

``dart
import '../entities/provider_operation.dart';

abstract class GetActiveOperationsUseCase {
  Future<List<ProviderOperation>> execute();
}
``

---

## mechanic_mobile/lib/domain/usecases/get_all_incidents_usecase.dart

``dart
import '../entities/admin_incident.dart';

abstract class GetAllIncidentsUseCase {
  Future<List<AdminIncident>> execute();
}
``

---

## mechanic_mobile/lib/domain/usecases/get_available_candidates_usecase.dart

``dart
import '../entities/provider_candidate.dart';

abstract class GetAvailableCandidatesUseCase {
  Future<List<ProviderCandidate>> execute();
}
``

---

## mechanic_mobile/lib/domain/usecases/get_candidate_details_usecase.dart

``dart
import '../entities/provider_candidate.dart';

abstract class GetCandidateDetailsUseCase {
  Future<ProviderCandidate> execute(String candidateId);
}
``

---

## mechanic_mobile/lib/domain/usecases/get_catalog_services_usecase.dart

``dart
import '../entities/catalog_service.dart';

abstract class GetCatalogServicesUseCase {
  Future<List<CatalogServiceEntry>> execute();
}
``

---

## mechanic_mobile/lib/domain/usecases/get_incident_candidates_usecase.dart

``dart
import '../entities/admin_incident.dart';

abstract class GetIncidentCandidatesUseCase {
  Future<List<Candidate>> execute(String incidentId);
}
``

---

## mechanic_mobile/lib/domain/usecases/get_incident_details_usecase.dart

``dart
import '../entities/admin_incident.dart';

abstract class GetIncidentDetailsUseCase {
  Future<AdminIncident> execute(String incidentId);
}
``

---

## mechanic_mobile/lib/domain/usecases/get_live_tracking_usecase.dart

``dart
import '../entities/tracking.dart';

abstract class GetLiveTrackingUseCase {
  Future<TrackingData> execute(String incidentId);
}
``

---

## mechanic_mobile/lib/domain/usecases/get_me_usecase.dart

``dart
import 'package:mechanic_mobile/domain/entities/user.dart';
import 'package:mechanic_mobile/domain/repositories/auth_repository.dart';

class GetMeUseCase {
  final AuthRepository repository;

  GetMeUseCase(this.repository);

  Future<User> call() {
    return repository.getMe();
  }
}
``

---

## mechanic_mobile/lib/domain/usecases/get_my_devices_usecase.dart

``dart
import '../entities/device_token.dart';

abstract class GetMyDevicesUseCase {
  Future<List<DeviceToken>> execute();
}
``

---

## mechanic_mobile/lib/domain/usecases/get_my_incidents_usecase.dart

``dart
import '../entities/incident.dart';

abstract class GetMyIncidentsUseCase {
  Future<List<Incident>> execute();
}
``

---

## mechanic_mobile/lib/domain/usecases/get_my_profile_usecase.dart

``dart
import 'package:mechanic_mobile/domain/entities/user.dart';
import 'package:mechanic_mobile/domain/repositories/auth_repository.dart';

class GetMyProfileUseCase {
  final AuthRepository repository;

  GetMyProfileUseCase(this.repository);

  Future<User> call() {
    return repository.getMyProfile();
  }
}
``

---

## mechanic_mobile/lib/domain/usecases/get_my_vehicles_usecase.dart

``dart
import '../entities/vehicle.dart';
import '../repositories/vehicle_repository.dart';

class GetMyVehiclesUseCase {
  final VehicleRepository repository;

  GetMyVehiclesUseCase(this.repository);

  Future<List<Vehicle>> call() {
    return repository.getMyVehicles();
  }
}
``

---

## mechanic_mobile/lib/domain/usecases/get_operation_state_usecase.dart

``dart
import '../entities/provider_operation.dart';

abstract class GetOperationStateUseCase {
  Future<ProviderOperation> execute(String incidentId);
}
``

---

## mechanic_mobile/lib/domain/usecases/get_provider_profile_usecase.dart

``dart
import '../entities/provider_profile.dart';

abstract class GetProviderProfileUseCase {
  Future<ProviderProfile> execute();
}
``

---

## mechanic_mobile/lib/domain/usecases/get_provider_services_usecase.dart

``dart
import '../entities/catalog_service.dart';

abstract class GetProviderServicesUseCase {
  Future<List<ProviderService>> execute();
}
``

---

## mechanic_mobile/lib/domain/usecases/get_providers_usecase.dart

``dart
import '../entities/provider_summary.dart';

abstract class GetProvidersUseCase {
  Future<List<ProviderSummary>> execute({int limit = 50, int offset = 0});
}

class GetProvidersParams {
  final int limit;
  final int offset;

  GetProvidersParams({this.limit = 50, this.offset = 0});
}
``

---

## mechanic_mobile/lib/domain/usecases/get_service_requests_usecase.dart

``dart
import '../entities/service_request.dart';
import '../repositories/service_request_repository.dart';

class GetServiceRequestsUseCase {
  final ServiceRequestRepository repository;

  GetServiceRequestsUseCase(this.repository);

  Future<List<ServiceRequest>> call() async {
    return await repository.getServiceRequests();
  }
}
``

---

## mechanic_mobile/lib/domain/usecases/get_technicians_usecase.dart

``dart
import '../entities/technician.dart';

abstract class GetTechniciansUseCase {
  Future<List<Technician>> execute();
}
``

---

## mechanic_mobile/lib/domain/usecases/get_tracking_history_usecase.dart

``dart
import '../entities/tracking.dart';

abstract class GetTrackingHistoryUseCase {
  Future<List<TrackingHistoryItem>> execute(String incidentId);
}
``

---

## mechanic_mobile/lib/domain/usecases/get_vehicle_by_id_usecase.dart

``dart
import '../entities/vehicle.dart';
import '../repositories/vehicle_repository.dart';

class GetVehicleByIdUseCase {
  final VehicleRepository repository;

  GetVehicleByIdUseCase(this.repository);

  Future<Vehicle> call(String vehicleId) {
    return repository.getVehicleById(vehicleId);
  }
}
``

---

## mechanic_mobile/lib/domain/usecases/login_usecase.dart

``dart
import '../repositories/auth_repository.dart';
import '../entities/user.dart';

class LoginUseCase {
  final AuthRepository repository;

  LoginUseCase(this.repository);

  Future<User> call(String email, String password) {
    return repository.login(email, password);
  }
}
``

---

## mechanic_mobile/lib/domain/usecases/mark_arrived_usecase.dart

``dart
import '../entities/provider_operation.dart';

abstract class MarkArrivedUseCase {
  Future<ProviderOperation> execute(String incidentId, {String? note});
}
``

---

## mechanic_mobile/lib/domain/usecases/publish_incident_usecase.dart

``dart
import '../entities/admin_incident.dart';

abstract class PublishIncidentUseCase {
  Future<AdminIncident> execute(String incidentId);
}
``

---

## mechanic_mobile/lib/domain/usecases/refresh_route_usecase.dart

``dart
import '../entities/tracking.dart';

abstract class RefreshRouteUseCase {
  Future<TrackingData> execute(String incidentId);
}
``

---

## mechanic_mobile/lib/domain/usecases/register_device_usecase.dart

``dart
import '../entities/device_token.dart';

abstract class RegisterDeviceUseCase {
  Future<DeviceToken> execute(RegisterDeviceParams params);
}

class RegisterDeviceParams {
  final String deviceToken;
  final String devicePlatform; // ANDROID, IOS, WEB
  final String? deviceLabel;
  final String appRole;

  RegisterDeviceParams({
    required this.deviceToken,
    required this.devicePlatform,
    this.deviceLabel,
    required this.appRole,
  });

  Map<String, dynamic> toJson() => {
    'device_token': deviceToken,
    'device_platform': devicePlatform,
    if (deviceLabel != null) 'device_label': deviceLabel,
    'app_role': appRole,
  };
}
``

---

## mechanic_mobile/lib/domain/usecases/register_usecase.dart

``dart
import 'package:mechanic_mobile/domain/entities/user.dart';
import 'package:mechanic_mobile/domain/repositories/auth_repository.dart';

class RegisterUseCase {
  final AuthRepository repository;

  RegisterUseCase(this.repository);

  Future<User> call(Map<String, dynamic> body) {
    return repository.register(body);
  }
}
``

---

## mechanic_mobile/lib/domain/usecases/reject_candidate_usecase.dart

``dart
abstract class RejectCandidateUseCase {
  Future<void> execute(String candidateId);
}
``

---

## mechanic_mobile/lib/domain/usecases/report_location_usecase.dart

``dart
import '../entities/tracking.dart';

abstract class ReportLocationUseCase {
  Future<TrackingData> execute(String incidentId, ReportLocationParams params);
}

class ReportLocationParams {
  final double latitude;
  final double longitude;
  final double? accuracyMeters;
  final String technicianId;

  ReportLocationParams({
    required this.latitude,
    required this.longitude,
    this.accuracyMeters,
    required this.technicianId,
  });

  Map<String, dynamic> toJson() => {
    'latitude': latitude,
    'longitude': longitude,
    if (accuracyMeters != null) 'accuracy_meters': accuracyMeters,
    'technician_id': technicianId,
  };
}
``

---

## mechanic_mobile/lib/domain/usecases/start_service_usecase.dart

``dart
import '../entities/provider_operation.dart';

abstract class StartServiceUseCase {
  Future<ProviderOperation> execute(String incidentId, {String? note});
}
``

---

## mechanic_mobile/lib/domain/usecases/unregister_device_usecase.dart

``dart
import 'package:mechanic_mobile/domain/entities/device_token.dart';

abstract class UnregisterDeviceUseCase {
  Future<DeviceToken> execute(String deviceTokenId);
}
``

---

## mechanic_mobile/lib/domain/usecases/update_incident_usecase.dart

``dart
import '../entities/incident.dart';

abstract class UpdateIncidentUseCase {
  Future<Incident> execute(String incidentId, UpdateIncidentParams params);
}

class UpdateIncidentParams {
  final String? title;
  final String? description;
  final String? reportedCategory;
  final String? priority;
  final double? incidentLatitude;
  final double? incidentLongitude;
  final String? addressReference;

  UpdateIncidentParams({
    this.title,
    this.description,
    this.reportedCategory,
    this.priority,
    this.incidentLatitude,
    this.incidentLongitude,
    this.addressReference,
  });

  Map<String, dynamic> toJson() => {
    if (title != null) 'title': title,
    if (description != null) 'description': description,
    if (reportedCategory != null) 'reported_category': reportedCategory,
    if (priority != null) 'priority': priority,
    if (incidentLatitude != null) 'incident_latitude': incidentLatitude,
    if (incidentLongitude != null) 'incident_longitude': incidentLongitude,
    if (addressReference != null) 'address_reference': addressReference,
  };
}
``

---

## mechanic_mobile/lib/domain/usecases/update_my_profile_usecase.dart

``dart
import 'package:mechanic_mobile/domain/entities/user.dart';
import 'package:mechanic_mobile/domain/repositories/auth_repository.dart';

class UpdateMyProfileUseCase {
  final AuthRepository repository;

  UpdateMyProfileUseCase(this.repository);

  Future<User> call({
    required String firstName,
    required String lastName,
    required String phoneNumber,
  }) {
    return repository.updateMyProfile({
      "first_name": firstName,
      "last_name": lastName,
      "phone_number": phoneNumber,
    });
  }
}
``

---

## mechanic_mobile/lib/domain/usecases/update_provider_profile_usecase.dart

``dart
import '../entities/provider_profile.dart';

abstract class UpdateProviderProfileUseCase {
  Future<ProviderProfile> execute(UpdateProviderProfileParams params);
}

class UpdateProviderProfileParams {
  final String? businessName;
  final String? legalName;
  final String? description;
  final String? contactEmail;
  final String? contactPhone;
  final String? city;
  final String? address;
  final double? baseLatitude;
  final double? baseLongitude;
  final bool? isAvailable;
  final int? maxConcurrentServices;

  UpdateProviderProfileParams({
    this.businessName,
    this.legalName,
    this.description,
    this.contactEmail,
    this.contactPhone,
    this.city,
    this.address,
    this.baseLatitude,
    this.baseLongitude,
    this.isAvailable,
    this.maxConcurrentServices,
  });

  Map<String, dynamic> toJson() => {
    if (businessName != null) 'business_name': businessName,
    if (legalName != null) 'legal_name': legalName,
    if (description != null) 'description': description,
    if (contactEmail != null) 'contact_email': contactEmail,
    if (contactPhone != null) 'contact_phone': contactPhone,
    if (city != null) 'city': city,
    if (address != null) 'address': address,
    if (baseLatitude != null) 'base_latitude': baseLatitude,
    if (baseLongitude != null) 'base_longitude': baseLongitude,
    if (isAvailable != null) 'is_available': isAvailable,
    if (maxConcurrentServices != null)
      'max_concurrent_services': maxConcurrentServices,
  };
}
``

---

## mechanic_mobile/lib/domain/usecases/update_technician_usecase.dart

``dart
import '../entities/technician.dart';

abstract class UpdateTechnicianUseCase {
  Future<Technician> execute(
    String technicianId,
    UpdateTechnicianParams params,
  );
}

class UpdateTechnicianParams {
  final String? firstName;
  final String? lastName;
  final String? phoneNumber;
  final String? specialty;
  final bool? isActive;
  final bool? isAvailable;
  final double? currentLatitude;
  final double? currentLongitude;

  UpdateTechnicianParams({
    this.firstName,
    this.lastName,
    this.phoneNumber,
    this.specialty,
    this.isActive,
    this.isAvailable,
    this.currentLatitude,
    this.currentLongitude,
  });

  Map<String, dynamic> toJson() => {
    if (firstName != null) 'first_name': firstName,
    if (lastName != null) 'last_name': lastName,
    if (phoneNumber != null) 'phone_number': phoneNumber,
    if (specialty != null) 'specialty': specialty,
    if (isActive != null) 'is_active': isActive,
    if (isAvailable != null) 'is_available': isAvailable,
    if (currentLatitude != null) 'current_latitude': currentLatitude,
    if (currentLongitude != null) 'current_longitude': currentLongitude,
  };
}
``

---

## mechanic_mobile/lib/domain/usecases/update_vehicle_usecase.dart

``dart
import '../entities/vehicle.dart';
import '../repositories/vehicle_repository.dart';

class UpdateVehicleUseCase {
  final VehicleRepository repository;

  UpdateVehicleUseCase(this.repository);

  Future<Vehicle> call(String vehicleId, Map<String, dynamic> body) {
    return repository.updateVehicle(vehicleId, body);
  }
}
``

---

## mechanic_mobile/lib/infrastructure/datasources/admin_incident_remote_data_source.dart

``dart
import 'package:dio/dio.dart';
import 'package:mechanic_mobile/core/network/api_client.dart';
import '../models/admin_incident_model.dart';

abstract class AdminIncidentRemoteDataSource {
  Future<List<AdminIncidentModel>> getAllIncidents();
  Future<AdminIncidentModel> getIncidentDetails(String incidentId);
  Future<List<CandidateModel>> getIncidentCandidates(String incidentId);
  Future<AdminIncidentModel> publishIncident(String incidentId);
}

class AdminIncidentRemoteDataSourceImpl
    implements AdminIncidentRemoteDataSource {
  final ApiClient _apiClient;

  AdminIncidentRemoteDataSourceImpl(this._apiClient);

  @override
  Future<List<AdminIncidentModel>> getAllIncidents() async {
    try {
      final response = await _apiClient.get('/api/incidents');
      final Map<String, dynamic> jsonResponse =
          response.data as Map<String, dynamic>;
      if (jsonResponse['success'] == true) {
        final List<dynamic> data = jsonResponse['data'];
        return data.map((json) => AdminIncidentModel.fromJson(json)).toList();
      }
      throw Exception(jsonResponse['message'] ?? 'Failed to load incidents');
    } on DioException catch (e) {
      throw Exception(_getErrorMessage(e));
    }
  }

  @override
  Future<AdminIncidentModel> getIncidentDetails(String incidentId) async {
    try {
      final response = await _apiClient.get('/api/incidents/$incidentId');
      final Map<String, dynamic> jsonResponse =
          response.data as Map<String, dynamic>;
      if (jsonResponse['success'] == true) {
        return AdminIncidentModel.fromJson(jsonResponse['data']);
      }
      throw Exception(
        jsonResponse['message'] ?? 'Failed to load incident details',
      );
    } on DioException catch (e) {
      throw Exception(_getErrorMessage(e));
    }
  }

  @override
  Future<List<CandidateModel>> getIncidentCandidates(String incidentId) async {
    try {
      final response = await _apiClient.get(
        '/api/assignment/platform/incidents/$incidentId/candidates',
      );
      final Map<String, dynamic> jsonResponse =
          response.data as Map<String, dynamic>;
      if (jsonResponse['success'] == true) {
        final List<dynamic> data = jsonResponse['data'];
        return data.map((json) => CandidateModel.fromJson(json)).toList();
      }
      throw Exception(jsonResponse['message'] ?? 'Failed to load candidates');
    } on DioException catch (e) {
      throw Exception(_getErrorMessage(e));
    }
  }

  @override
  Future<AdminIncidentModel> publishIncident(String incidentId) async {
    try {
      final response = await _apiClient.post(
        '/api/assignment/platform/incidents/$incidentId/publish',
        null,
      );
      final Map<String, dynamic> jsonResponse =
          response.data as Map<String, dynamic>;
      if (jsonResponse['success'] == true) {
        final data = jsonResponse['data'];
        final publishedIncidentId = data['incident_id'] as String;
        return await getIncidentDetails(publishedIncidentId);
      }
      throw Exception(jsonResponse['message'] ?? 'Failed to publish incident');
    } on DioException catch (e) {
      throw Exception(_getErrorMessage(e));
    }
  }

  String _getErrorMessage(DioException e) {
    if (e.response != null) {
      final data = e.response?.data;
      if (data != null && data['message'] != null) {
        return data['message'] as String;
      }
      return 'Error del servidor: ${e.response?.statusCode}';
    }
    return 'Error de red: ${e.message}';
  }
}
``

---

## mechanic_mobile/lib/infrastructure/datasources/auth_remote_data_source.dart

``dart
import 'package:dio/dio.dart';
import '../models/user_model.dart';
import '../../core/network/api_client.dart';

class AuthRemoteDataSource {
  final ApiClient api;

  AuthRemoteDataSource(this.api);

  // Helper para extraer mensaje de error de la respuesta
  String _extractErrorMessage(dynamic responseData) {
    if (responseData is Map<String, dynamic>) {
      if (responseData['message'] != null) return responseData['message'];
      if (responseData['error'] != null &&
          responseData['error']['message'] != null) {
        return responseData['error']['message'];
      }
    }
    return 'Error desconocido';
  }

  Future<(String, UserModel)> login(String email, String password) async {
    try {
      final response = await api.post("/api/auth/login", {
        "email": email,
        "password": password,
      });

      final Map<String, dynamic> jsonResponse = response.data;
      if (jsonResponse['success'] == true) {
        final data = jsonResponse['data'];
        final String token = data["access_token"] ?? "";
        final Map<String, dynamic> userJson =
            (data["user"] as Map<String, dynamic>?) ??
            data as Map<String, dynamic>;
        final user = UserModel.fromJson(userJson);
        return (token, user);
      } else {
        throw Exception(_extractErrorMessage(jsonResponse));
      }
    } on DioException catch (e) {
      if (e.response != null && e.response?.data != null) {
        throw Exception(_extractErrorMessage(e.response?.data));
      }
      throw Exception('Error de conexión: ${e.message}');
    }
  }

  Future<(String, UserModel)> register(Map<String, dynamic> body) async {
    try {
      final response = await api.post("/api/auth/register", body);
      final Map<String, dynamic> jsonResponse = response.data;
      if (jsonResponse['success'] == true) {
        final data = jsonResponse['data'];
        final String token = data["access_token"] ?? "";
        final Map<String, dynamic> userJson =
            (data["user"] as Map<String, dynamic>?) ??
            data as Map<String, dynamic>;
        final user = UserModel.fromJson(userJson);
        return (token, user);
      } else {
        throw Exception(_extractErrorMessage(jsonResponse));
      }
    } on DioException catch (e) {
      if (e.response != null && e.response?.data != null) {
        throw Exception(_extractErrorMessage(e.response?.data));
      }
      throw Exception('Error de conexión: ${e.message}');
    }
  }

  Future<UserModel> me() async {
    try {
      final response = await api.get("/api/auth/me");
      final Map<String, dynamic> jsonResponse = response.data;
      if (jsonResponse['success'] == true) {
        return UserModel.fromJson(jsonResponse['data']);
      } else {
        throw Exception(_extractErrorMessage(jsonResponse));
      }
    } on DioException catch (e) {
      if (e.response != null && e.response?.data != null) {
        throw Exception(_extractErrorMessage(e.response?.data));
      }
      throw Exception('Error de conexión: ${e.message}');
    }
  }

  Future<UserModel> myProfile() async {
    try {
      final response = await api.get("/api/users/me/profile");
      final Map<String, dynamic> jsonResponse = response.data;
      if (jsonResponse['success'] == true) {
        return UserModel.fromJson(jsonResponse['data']);
      } else {
        throw Exception(_extractErrorMessage(jsonResponse));
      }
    } on DioException catch (e) {
      if (e.response != null && e.response?.data != null) {
        throw Exception(_extractErrorMessage(e.response?.data));
      }
      throw Exception('Error de conexión: ${e.message}');
    }
  }

  Future<UserModel> updateMyProfile(Map<String, dynamic> body) async {
    try {
      final response = await api.patch("/api/users/me/profile", body);
      final Map<String, dynamic> jsonResponse = response.data;
      if (jsonResponse['success'] == true) {
        return UserModel.fromJson(jsonResponse['data']);
      } else {
        throw Exception(_extractErrorMessage(jsonResponse));
      }
    } on DioException catch (e) {
      if (e.response != null && e.response?.data != null) {
        throw Exception(_extractErrorMessage(e.response?.data));
      }
      throw Exception('Error de conexión: ${e.message}');
    }
  }
}
``

---

## mechanic_mobile/lib/infrastructure/datasources/catalog_remote_data_source.dart

``dart
import 'package:dio/dio.dart';
import 'package:mechanic_mobile/core/network/api_client.dart';
import '../models/catalog_service_model.dart';

abstract class CatalogRemoteDataSource {
  Future<List<CatalogServiceEntryModel>> getCatalogServices();
  Future<List<ProviderServiceModel>> getProviderServices();
  Future<ProviderServiceModel> createProviderService(
    Map<String, dynamic> params,
  );
}

class CatalogRemoteDataSourceImpl implements CatalogRemoteDataSource {
  final ApiClient _apiClient;

  CatalogRemoteDataSourceImpl(this._apiClient);

  @override
  Future<List<CatalogServiceEntryModel>> getCatalogServices() async {
    try {
      final response = await _apiClient.get('/api/catalog/me/services/catalog');
      final Map<String, dynamic> jsonResponse =
          response.data as Map<String, dynamic>;
      if (jsonResponse['success'] == true) {
        final List<dynamic> data = jsonResponse['data'];
        return data
            .map((json) => CatalogServiceEntryModel.fromJson(json))
            .toList();
      }
      throw Exception(
        jsonResponse['message'] ?? 'Failed to load catalog services',
      );
    } on DioException catch (e) {
      throw Exception(_getErrorMessage(e));
    }
  }

  @override
  Future<List<ProviderServiceModel>> getProviderServices() async {
    try {
      final response = await _apiClient.get('/api/catalog/me/services');
      final Map<String, dynamic> jsonResponse =
          response.data as Map<String, dynamic>;
      if (jsonResponse['success'] == true) {
        final List<dynamic> data = jsonResponse['data'];
        return data.map((json) => ProviderServiceModel.fromJson(json)).toList();
      }
      throw Exception(
        jsonResponse['message'] ?? 'Failed to load provider services',
      );
    } on DioException catch (e) {
      throw Exception(_getErrorMessage(e));
    }
  }

  @override
  Future<ProviderServiceModel> createProviderService(
    Map<String, dynamic> params,
  ) async {
    try {
      final response = await _apiClient.post(
        '/api/catalog/me/services',
        params,
      );
      final Map<String, dynamic> jsonResponse =
          response.data as Map<String, dynamic>;
      if (jsonResponse['success'] == true) {
        return ProviderServiceModel.fromJson(jsonResponse['data']);
      }
      throw Exception(
        jsonResponse['message'] ?? 'Failed to create provider service',
      );
    } on DioException catch (e) {
      throw Exception(_getErrorMessage(e));
    }
  }

  String _getErrorMessage(DioException e) {
    if (e.response != null) {
      final data = e.response?.data;
      if (data != null && data['message'] != null) {
        return data['message'] as String;
      }
      return 'Error del servidor: ${e.response?.statusCode}';
    }
    return 'Error de red: ${e.message}';
  }
}
``

---

## mechanic_mobile/lib/infrastructure/datasources/evidence_remote_data_source.dart

``dart
import 'package:dio/dio.dart';
import 'package:image_picker/image_picker.dart';
import 'package:mechanic_mobile/core/network/api_client.dart';
import '../models/evidence_model.dart';

abstract class EvidenceRemoteDataSource {
  Future<EvidenceModel> addTextEvidence(
    String incidentId,
    Map<String, dynamic> params,
  );
  Future<EvidenceModel> addFileEvidence(
    String incidentId,
    String evidenceType,
    String description,
    XFile file,
  );
}

class EvidenceRemoteDataSourceImpl implements EvidenceRemoteDataSource {
  final ApiClient _apiClient;

  EvidenceRemoteDataSourceImpl(this._apiClient);

  @override
  Future<EvidenceModel> addTextEvidence(
    String incidentId,
    Map<String, dynamic> params,
  ) async {
    try {
      final response = await _apiClient.post(
        '/api/evidences/client/incidents/$incidentId/text',
        params,
      );
      final Map<String, dynamic> jsonResponse =
          response.data as Map<String, dynamic>;
      if (jsonResponse['success'] == true) {
        return EvidenceModel.fromJson(jsonResponse['data']);
      }
      throw Exception(jsonResponse['message'] ?? 'Failed to add text evidence');
    } on DioException catch (e) {
      throw Exception(_getErrorMessage(e));
    }
  }

  @override
  Future<EvidenceModel> addFileEvidence(
    String incidentId,
    String evidenceType,
    String description,
    XFile file,
  ) async {
    try {
      final fileName = file.name;
      final bytes = await file.readAsBytes();

      final extension = fileName.split('.').last.toLowerCase();
      final mimeType = evidenceType == 'IMAGE'
          ? (extension == 'png' ? 'image/png' : 'image/jpeg')
          : 'audio/mpeg';

      final additionalFields = {
        'evidence_type': evidenceType,
        'description': description,
      };

      final response = await _apiClient.uploadFile(
        '/api/evidences/client/incidents/$incidentId/files',
        fieldName: 'upload_file',
        fileName: fileName,
        bytes: bytes,
        mimeType: mimeType,
        additionalFields: additionalFields,
      );

      final Map<String, dynamic> jsonResponse =
          response.data as Map<String, dynamic>;
      if (jsonResponse['success'] == true) {
        return EvidenceModel.fromJson(jsonResponse['data']);
      }
      throw Exception(jsonResponse['message'] ?? 'Failed to add file evidence');
    } on DioException catch (e) {
      throw Exception(_getErrorMessage(e));
    } catch (e) {
      throw Exception('Error al subir el archivo: $e');
    }
  }

  String _getErrorMessage(DioException e) {
    if (e.response != null) {
      final data = e.response?.data;
      if (data != null && data['message'] != null) {
        return data['message'] as String;
      }
      return 'Error del servidor: ${e.response?.statusCode}';
    }
    return 'Error de red: ${e.message}';
  }
}
``

---

## mechanic_mobile/lib/infrastructure/datasources/incident_remote_data_source.dart

``dart
import 'package:dio/dio.dart';
import 'package:mechanic_mobile/core/network/api_client.dart';
import '../models/incident_model.dart';

abstract class IncidentRemoteDataSource {
  Future<List<IncidentModel>> getMyIncidents();
  Future<IncidentModel> createIncident(Map<String, dynamic> params);
  Future<IncidentModel> updateIncident(
    String incidentId,
    Map<String, dynamic> params,
  );
  Future<void> cancelIncident(String incidentId);
}

class IncidentRemoteDataSourceImpl implements IncidentRemoteDataSource {
  final ApiClient _apiClient;

  IncidentRemoteDataSourceImpl(this._apiClient);

  @override
  Future<List<IncidentModel>> getMyIncidents() async {
    try {
      final response = await _apiClient.get('/api/incidents/me');
      final Map<String, dynamic> jsonResponse =
          response.data as Map<String, dynamic>;
      if (jsonResponse['success'] == true) {
        final List<dynamic> data = jsonResponse['data'];
        return data.map((json) => IncidentModel.fromJson(json)).toList();
      }
      throw Exception(jsonResponse['message'] ?? 'Failed to load incidents');
    } on DioException catch (e) {
      throw Exception(_getErrorMessage(e));
    }
  }

  @override
  Future<IncidentModel> createIncident(Map<String, dynamic> params) async {
    try {
      final response = await _apiClient.post('/api/incidents', params);
      final Map<String, dynamic> jsonResponse =
          response.data as Map<String, dynamic>;
      if (jsonResponse['success'] == true) {
        return IncidentModel.fromJson(jsonResponse['data']);
      }
      throw Exception(jsonResponse['message'] ?? 'Failed to create incident');
    } on DioException catch (e) {
      throw Exception(_getErrorMessage(e));
    }
  }

  @override
  Future<IncidentModel> updateIncident(
    String incidentId,
    Map<String, dynamic> params,
  ) async {
    try {
      final response = await _apiClient.patch(
        '/api/incidents/me/$incidentId',
        params,
      );
      final Map<String, dynamic> jsonResponse =
          response.data as Map<String, dynamic>;
      if (jsonResponse['success'] == true) {
        return IncidentModel.fromJson(jsonResponse['data']);
      }
      throw Exception(jsonResponse['message'] ?? 'Failed to update incident');
    } on DioException catch (e) {
      throw Exception(_getErrorMessage(e));
    }
  }

  @override
  Future<void> cancelIncident(String incidentId) async {
    try {
      final response = await _apiClient.post(
        '/api/incidents/me/$incidentId/cancel',
        null,
      );
      final Map<String, dynamic> jsonResponse =
          response.data as Map<String, dynamic>;
      if (jsonResponse['success'] != true) {
        throw Exception(jsonResponse['message'] ?? 'Failed to cancel incident');
      }
    } on DioException catch (e) {
      throw Exception(_getErrorMessage(e));
    }
  }

  String _getErrorMessage(DioException e) {
    if (e.response != null) {
      final data = e.response?.data;
      if (data != null && data['message'] != null) {
        return data['message'] as String;
      }
      return 'Error del servidor: ${e.response?.statusCode}';
    }
    return 'Error de red: ${e.message}';
  }
}
``

---

## mechanic_mobile/lib/infrastructure/datasources/notification_remote_data_source.dart

``dart
import 'package:dio/dio.dart';
import 'package:mechanic_mobile/core/network/api_client.dart';
import '../models/device_token_model.dart';

abstract class NotificationRemoteDataSource {
  Future<DeviceTokenModel> registerDevice(Map<String, dynamic> params);
  Future<DeviceTokenModel> unregisterDevice(String deviceTokenId);
  Future<List<DeviceTokenModel>> getMyDevices();
}

class NotificationRemoteDataSourceImpl implements NotificationRemoteDataSource {
  final ApiClient _apiClient;

  NotificationRemoteDataSourceImpl(this._apiClient);

  @override
  Future<DeviceTokenModel> registerDevice(Map<String, dynamic> params) async {
    try {
      final response = await _apiClient.post(
        '/api/notifications/me/devices/register',
        params,
      );
      final Map<String, dynamic> jsonResponse =
          response.data as Map<String, dynamic>;
      if (jsonResponse['success'] == true) {
        return DeviceTokenModel.fromJson(jsonResponse['data']);
      }
      throw Exception(jsonResponse['message'] ?? 'Failed to register device');
    } on DioException catch (e) {
      throw Exception(_getErrorMessage(e));
    }
  }

  @override
  Future<DeviceTokenModel> unregisterDevice(String deviceTokenId) async {
    try {
      final response = await _apiClient.delete(
        '/api/notifications/me/devices/$deviceTokenId',
      );
      final Map<String, dynamic> jsonResponse =
          response.data as Map<String, dynamic>;
      if (jsonResponse['success'] == true) {
        return DeviceTokenModel.fromJson(jsonResponse['data']);
      }
      throw Exception(jsonResponse['message'] ?? 'Failed to unregister device');
    } on DioException catch (e) {
      throw Exception(_getErrorMessage(e));
    }
  }

  @override
  Future<List<DeviceTokenModel>> getMyDevices() async {
    try {
      final response = await _apiClient.get('/api/notifications/me/devices');
      final Map<String, dynamic> jsonResponse =
          response.data as Map<String, dynamic>;
      if (jsonResponse['success'] == true) {
        final List<dynamic> data = jsonResponse['data'];
        return data.map((json) => DeviceTokenModel.fromJson(json)).toList();
      }
      throw Exception(jsonResponse['message'] ?? 'Failed to load devices');
    } on DioException catch (e) {
      throw Exception(_getErrorMessage(e));
    }
  }

  String _getErrorMessage(DioException e) {
    if (e.response != null) {
      final data = e.response?.data;
      if (data != null && data['message'] != null) {
        return data['message'] as String;
      }
      return 'Error del servidor: ${e.response?.statusCode}';
    }
    return 'Error de red: ${e.message}';
  }
}
``

---

## mechanic_mobile/lib/infrastructure/datasources/provider_admin_remote_data_source.dart

``dart
import 'package:dio/dio.dart';
import 'package:mechanic_mobile/core/network/api_client.dart';
import '../models/provider_summary_model.dart';

abstract class ProviderAdminRemoteDataSource {
  Future<List<ProviderSummaryModel>> getProviders({
    int limit = 50,
    int offset = 0,
  });
}

class ProviderAdminRemoteDataSourceImpl
    implements ProviderAdminRemoteDataSource {
  final ApiClient _apiClient;

  ProviderAdminRemoteDataSourceImpl(this._apiClient);

  @override
  Future<List<ProviderSummaryModel>> getProviders({
    int limit = 50,
    int offset = 0,
  }) async {
    try {
      final response = await _apiClient.get(
        '/api/providers?limit=$limit&offset=$offset',
      );
      final Map<String, dynamic> jsonResponse =
          response.data as Map<String, dynamic>;
      if (jsonResponse['success'] == true) {
        final List<dynamic> data = jsonResponse['data'];
        return data.map((json) => ProviderSummaryModel.fromJson(json)).toList();
      }
      throw Exception(jsonResponse['message'] ?? 'Failed to load providers');
    } on DioException catch (e) {
      throw Exception(_getErrorMessage(e));
    }
  }

  String _getErrorMessage(DioException e) {
    if (e.response != null) {
      final data = e.response?.data;
      if (data != null && data['message'] != null) {
        return data['message'] as String;
      }
      return 'Error del servidor: ${e.response?.statusCode}';
    }
    return 'Error de red: ${e.message}';
  }
}
``

---

## mechanic_mobile/lib/infrastructure/datasources/provider_assignment_remote_data_source.dart

``dart
import 'package:dio/dio.dart';
import 'package:mechanic_mobile/core/network/api_client.dart';
import '../models/provider_candidate_model.dart';

abstract class ProviderAssignmentRemoteDataSource {
  Future<List<ProviderCandidateModel>> getAvailableCandidates();
  Future<ProviderCandidateModel> getCandidateDetails(String candidateId);
  Future<Map<String, dynamic>> acceptCandidate(String candidateId);
  Future<void> rejectCandidate(String candidateId);
}

class ProviderAssignmentRemoteDataSourceImpl
    implements ProviderAssignmentRemoteDataSource {
  final ApiClient _apiClient;

  ProviderAssignmentRemoteDataSourceImpl(this._apiClient);

  @override
  Future<List<ProviderCandidateModel>> getAvailableCandidates() async {
    try {
      final response = await _apiClient.get(
        '/api/assignment/provider/me/available',
      );
      final Map<String, dynamic> jsonResponse =
          response.data as Map<String, dynamic>;
      if (jsonResponse['success'] == true) {
        final List<dynamic> data = jsonResponse['data'];
        return data
            .map((json) => ProviderCandidateModel.fromJson(json))
            .toList();
      }
      throw Exception(
        jsonResponse['message'] ?? 'Failed to load available candidates',
      );
    } on DioException catch (e) {
      throw Exception(_getErrorMessage(e));
    }
  }

  @override
  Future<ProviderCandidateModel> getCandidateDetails(String candidateId) async {
    try {
      final response = await _apiClient.get(
        '/api/assignment/provider/me/available/$candidateId',
      );
      final Map<String, dynamic> jsonResponse =
          response.data as Map<String, dynamic>;
      if (jsonResponse['success'] == true) {
        return ProviderCandidateModel.fromJson(jsonResponse['data']);
      }
      throw Exception(
        jsonResponse['message'] ?? 'Failed to load candidate details',
      );
    } on DioException catch (e) {
      throw Exception(_getErrorMessage(e));
    }
  }

  @override
  Future<Map<String, dynamic>> acceptCandidate(String candidateId) async {
    try {
      final response = await _apiClient.post(
        '/api/assignment/provider/me/available/$candidateId/accept',
        null,
      );
      final Map<String, dynamic> jsonResponse =
          response.data as Map<String, dynamic>;
      if (jsonResponse['success'] == true) {
        return jsonResponse['data'] as Map<String, dynamic>;
      }
      throw Exception(jsonResponse['message'] ?? 'Failed to accept candidate');
    } on DioException catch (e) {
      throw Exception(_getErrorMessage(e));
    }
  }

  @override
  Future<void> rejectCandidate(String candidateId) async {
    try {
      final response = await _apiClient.post(
        '/api/assignment/provider/me/available/$candidateId/reject',
        null,
      );
      final Map<String, dynamic> jsonResponse =
          response.data as Map<String, dynamic>;
      if (jsonResponse['success'] != true) {
        throw Exception(
          jsonResponse['message'] ?? 'Failed to reject candidate',
        );
      }
    } on DioException catch (e) {
      throw Exception(_getErrorMessage(e));
    }
  }

  String _getErrorMessage(DioException e) {
    if (e.response != null) {
      final data = e.response?.data;
      if (data != null && data['message'] != null) {
        return data['message'] as String;
      }
      return 'Error del servidor: ${e.response?.statusCode}';
    }
    return 'Error de red: ${e.message}';
  }
}
``

---

## mechanic_mobile/lib/infrastructure/datasources/provider_operation_remote_data_source.dart

``dart
import 'package:dio/dio.dart';
import 'package:mechanic_mobile/core/network/api_client.dart';
import '../models/provider_operation_model.dart';

abstract class ProviderOperationRemoteDataSource {
  Future<List<ProviderOperationModel>> getActiveOperations();
  Future<ProviderOperationModel> getOperationState(String incidentId);
  Future<ProviderOperationModel> dispatchIncident(
    String incidentId,
    Map<String, dynamic> params,
  );
  Future<ProviderOperationModel> markArrived(String incidentId, {String? note});
  Future<ProviderOperationModel> startService(
    String incidentId, {
    String? note,
  });
  Future<ProviderOperationModel> completeService(
    String incidentId,
    Map<String, dynamic> params,
  );
  Future<ProviderOperationModel> cancelService(
    String incidentId, {
    String? note,
  });
}

class ProviderOperationRemoteDataSourceImpl
    implements ProviderOperationRemoteDataSource {
  final ApiClient _apiClient;

  ProviderOperationRemoteDataSourceImpl(this._apiClient);

  @override
  Future<List<ProviderOperationModel>> getActiveOperations() async {
    try {
      final response = await _apiClient.get(
        '/api/operations/provider/me/active',
      );
      final Map<String, dynamic> jsonResponse =
          response.data as Map<String, dynamic>;
      if (jsonResponse['success'] == true) {
        final List<dynamic> data = jsonResponse['data'];
        return data
            .map((json) => ProviderOperationModel.fromJson(json))
            .toList();
      }
      throw Exception(
        jsonResponse['message'] ?? 'Failed to load active operations',
      );
    } on DioException catch (e) {
      throw Exception(_getErrorMessage(e));
    }
  }

  @override
  Future<ProviderOperationModel> getOperationState(String incidentId) async {
    try {
      final response = await _apiClient.get(
        '/api/operations/provider/incidents/$incidentId/state',
      );
      final Map<String, dynamic> jsonResponse =
          response.data as Map<String, dynamic>;
      if (jsonResponse['success'] == true) {
        return ProviderOperationModel.fromJson(jsonResponse['data']);
      }
      throw Exception(
        jsonResponse['message'] ?? 'Failed to load operation state',
      );
    } on DioException catch (e) {
      throw Exception(_getErrorMessage(e));
    }
  }

  @override
  Future<ProviderOperationModel> dispatchIncident(
    String incidentId,
    Map<String, dynamic> params,
  ) async {
    try {
      final response = await _apiClient.post(
        '/api/operations/provider/incidents/$incidentId/dispatch',
        params,
      );
      final Map<String, dynamic> jsonResponse =
          response.data as Map<String, dynamic>;
      if (jsonResponse['success'] == true) {
        return ProviderOperationModel.fromJson(jsonResponse['data']);
      }
      throw Exception(jsonResponse['message'] ?? 'Failed to dispatch incident');
    } on DioException catch (e) {
      throw Exception(_getErrorMessage(e));
    }
  }

  @override
  Future<ProviderOperationModel> markArrived(
    String incidentId, {
    String? note,
  }) async {
    try {
      final body = note != null ? {'note': note} : {};
      final response = await _apiClient.post(
        '/api/operations/provider/incidents/$incidentId/arrive',
        body,
      );
      final Map<String, dynamic> jsonResponse =
          response.data as Map<String, dynamic>;
      if (jsonResponse['success'] == true) {
        return ProviderOperationModel.fromJson(jsonResponse['data']);
      }
      throw Exception(jsonResponse['message'] ?? 'Failed to mark arrival');
    } on DioException catch (e) {
      throw Exception(_getErrorMessage(e));
    }
  }

  @override
  Future<ProviderOperationModel> startService(
    String incidentId, {
    String? note,
  }) async {
    try {
      final body = note != null ? {'note': note} : {};
      final response = await _apiClient.post(
        '/api/operations/provider/incidents/$incidentId/start',
        body,
      );
      final Map<String, dynamic> jsonResponse =
          response.data as Map<String, dynamic>;
      if (jsonResponse['success'] == true) {
        return ProviderOperationModel.fromJson(jsonResponse['data']);
      }
      throw Exception(jsonResponse['message'] ?? 'Failed to start service');
    } on DioException catch (e) {
      throw Exception(_getErrorMessage(e));
    }
  }

  @override
  Future<ProviderOperationModel> completeService(
    String incidentId,
    Map<String, dynamic> params,
  ) async {
    try {
      final response = await _apiClient.post(
        '/api/operations/provider/incidents/$incidentId/complete',
        params,
      );
      final Map<String, dynamic> jsonResponse =
          response.data as Map<String, dynamic>;
      if (jsonResponse['success'] == true) {
        return ProviderOperationModel.fromJson(jsonResponse['data']);
      }
      throw Exception(jsonResponse['message'] ?? 'Failed to complete service');
    } on DioException catch (e) {
      throw Exception(_getErrorMessage(e));
    }
  }

  @override
  Future<ProviderOperationModel> cancelService(
    String incidentId, {
    String? note,
  }) async {
    try {
      final body = note != null ? {'note': note} : {};
      final response = await _apiClient.post(
        '/api/operations/provider/incidents/$incidentId/cancel',
        body,
      );
      final Map<String, dynamic> jsonResponse =
          response.data as Map<String, dynamic>;
      if (jsonResponse['success'] == true) {
        return ProviderOperationModel.fromJson(jsonResponse['data']);
      }
      throw Exception(jsonResponse['message'] ?? 'Failed to cancel service');
    } on DioException catch (e) {
      throw Exception(_getErrorMessage(e));
    }
  }

  String _getErrorMessage(DioException e) {
    if (e.response != null) {
      final data = e.response?.data;
      if (data != null && data['message'] != null) {
        return data['message'] as String;
      }
      return 'Error del servidor: ${e.response?.statusCode}';
    }
    return 'Error de red: ${e.message}';
  }
}
``

---

## mechanic_mobile/lib/infrastructure/datasources/provider_remote_data_source.dart

``dart
import 'package:dio/dio.dart';
import 'package:mechanic_mobile/core/network/api_client.dart';
import '../models/provider_profile_model.dart';

abstract class ProviderRemoteDataSource {
  Future<ProviderProfileModel> getProviderProfile();
  Future<ProviderProfileModel> updateProviderProfile(
    Map<String, dynamic> params,
  );
}

class ProviderRemoteDataSourceImpl implements ProviderRemoteDataSource {
  final ApiClient _apiClient;

  ProviderRemoteDataSourceImpl(this._apiClient);

  @override
  Future<ProviderProfileModel> getProviderProfile() async {
    try {
      final response = await _apiClient.get('/api/providers/me/profile');
      final Map<String, dynamic> jsonResponse =
          response.data as Map<String, dynamic>;
      if (jsonResponse['success'] == true) {
        return ProviderProfileModel.fromJson(jsonResponse['data']);
      }
      throw Exception(
        jsonResponse['message'] ?? 'Failed to load provider profile',
      );
    } on DioException catch (e) {
      throw Exception(_getErrorMessage(e));
    }
  }

  @override
  Future<ProviderProfileModel> updateProviderProfile(
    Map<String, dynamic> params,
  ) async {
    try {
      final response = await _apiClient.patch(
        '/api/providers/me/profile',
        params,
      );
      final Map<String, dynamic> jsonResponse =
          response.data as Map<String, dynamic>;
      if (jsonResponse['success'] == true) {
        return ProviderProfileModel.fromJson(jsonResponse['data']);
      }
      throw Exception(
        jsonResponse['message'] ?? 'Failed to update provider profile',
      );
    } on DioException catch (e) {
      throw Exception(_getErrorMessage(e));
    }
  }

  String _getErrorMessage(DioException e) {
    if (e.response != null) {
      final data = e.response?.data;
      if (data != null && data['message'] != null) {
        return data['message'] as String;
      }
      return 'Error del servidor: ${e.response?.statusCode}';
    }
    return 'Error de red: ${e.message}';
  }
}
``

---

## mechanic_mobile/lib/infrastructure/datasources/technician_datasource.dart

``dart
import 'package:dio/dio.dart';
import 'package:mechanic_mobile/core/network/api_client.dart';
import '../models/technician_model.dart';

abstract class TechnicianRemoteDataSource {
  Future<List<TechnicianModel>> getTechnicians();
  Future<TechnicianModel> createTechnician(Map<String, dynamic> params);
  Future<TechnicianModel> updateTechnician(
    String technicianId,
    Map<String, dynamic> params,
  );
}

class TechnicianRemoteDataSourceImpl implements TechnicianRemoteDataSource {
  final ApiClient _apiClient;

  TechnicianRemoteDataSourceImpl(this._apiClient);

  @override
  Future<List<TechnicianModel>> getTechnicians() async {
    try {
      final response = await _apiClient.get('/api/providers/me/technicians');
      final Map<String, dynamic> jsonResponse =
          response.data as Map<String, dynamic>;
      if (jsonResponse['success'] == true) {
        final List<dynamic> data = jsonResponse['data'];
        return data.map((json) => TechnicianModel.fromJson(json)).toList();
      }
      throw Exception(jsonResponse['message'] ?? 'Failed to load technicians');
    } on DioException catch (e) {
      throw Exception(_getErrorMessage(e));
    }
  }

  @override
  Future<TechnicianModel> createTechnician(Map<String, dynamic> params) async {
    try {
      final response = await _apiClient.post(
        '/api/providers/me/technicians',
        params,
      );
      final Map<String, dynamic> jsonResponse =
          response.data as Map<String, dynamic>;
      if (jsonResponse['success'] == true) {
        return TechnicianModel.fromJson(jsonResponse['data']);
      }
      throw Exception(jsonResponse['message'] ?? 'Failed to create technician');
    } on DioException catch (e) {
      throw Exception(_getErrorMessage(e));
    }
  }

  @override
  Future<TechnicianModel> updateTechnician(
    String technicianId,
    Map<String, dynamic> params,
  ) async {
    try {
      final response = await _apiClient.patch(
        '/api/providers/me/technicians/$technicianId',
        params,
      );
      final Map<String, dynamic> jsonResponse =
          response.data as Map<String, dynamic>;
      if (jsonResponse['success'] == true) {
        return TechnicianModel.fromJson(jsonResponse['data']);
      }
      throw Exception(jsonResponse['message'] ?? 'Failed to update technician');
    } on DioException catch (e) {
      throw Exception(_getErrorMessage(e));
    }
  }

  String _getErrorMessage(DioException e) {
    if (e.response != null) {
      final data = e.response?.data;
      if (data != null && data['message'] != null) {
        return data['message'] as String;
      }
      return 'Error del servidor: ${e.response?.statusCode}';
    }
    return 'Error de red: ${e.message}';
  }
}
``

---

## mechanic_mobile/lib/infrastructure/datasources/tracking_remote_data_source.dart

``dart
import 'package:dio/dio.dart';
import 'package:mechanic_mobile/core/network/api_client.dart';
import '../models/tracking_model.dart';

abstract class TrackingRemoteDataSource {
  Future<TrackingDataModel> reportLocation(
    String incidentId,
    Map<String, dynamic> params,
  );
  Future<TrackingDataModel> refreshRoute(String incidentId);
  Future<TrackingDataModel> getLiveTracking(String incidentId);
  Future<List<TrackingHistoryItemModel>> getTrackingHistory(String incidentId);
  Future<TrackingDataModel> getClientLiveTracking(String incidentId);
  Future<List<TrackingHistoryItemModel>> getClientTrackingHistory(
    String incidentId,
  );
  Future<TrackingDataModel> getPlatformLiveTracking(String incidentId);
  Future<List<TrackingHistoryItemModel>> getPlatformTrackingHistory(
    String incidentId,
  );
}

class TrackingRemoteDataSourceImpl implements TrackingRemoteDataSource {
  final ApiClient _apiClient;

  TrackingRemoteDataSourceImpl(this._apiClient);

  @override
  Future<TrackingDataModel> reportLocation(
    String incidentId,
    Map<String, dynamic> params,
  ) async {
    try {
      final response = await _apiClient.post(
        '/api/tracking/provider/incidents/$incidentId/location',
        params,
      );
      final Map<String, dynamic> jsonResponse =
          response.data as Map<String, dynamic>;
      if (jsonResponse['success'] == true) {
        return TrackingDataModel.fromJson(jsonResponse['data']);
      }
      throw Exception(jsonResponse['message'] ?? 'Failed to report location');
    } on DioException catch (e) {
      throw Exception(_getErrorMessage(e));
    }
  }

  @override
  Future<TrackingDataModel> refreshRoute(String incidentId) async {
    try {
      final response = await _apiClient.post(
        '/api/tracking/provider/incidents/$incidentId/refresh-route',
        null,
      );
      final Map<String, dynamic> jsonResponse =
          response.data as Map<String, dynamic>;
      if (jsonResponse['success'] == true) {
        return TrackingDataModel.fromJson(jsonResponse['data']);
      }
      throw Exception(jsonResponse['message'] ?? 'Failed to refresh route');
    } on DioException catch (e) {
      throw Exception(_getErrorMessage(e));
    }
  }

  @override
  Future<TrackingDataModel> getLiveTracking(String incidentId) async {
    try {
      final response = await _apiClient.get(
        '/api/tracking/provider/incidents/$incidentId/live',
      );
      final Map<String, dynamic> jsonResponse =
          response.data as Map<String, dynamic>;
      if (jsonResponse['success'] == true) {
        return TrackingDataModel.fromJson(jsonResponse['data']);
      }
      throw Exception(
        jsonResponse['message'] ?? 'Failed to load live tracking',
      );
    } on DioException catch (e) {
      throw Exception(_getErrorMessage(e));
    }
  }

  @override
  Future<List<TrackingHistoryItemModel>> getTrackingHistory(
    String incidentId,
  ) async {
    try {
      final response = await _apiClient.get(
        '/api/tracking/provider/incidents/$incidentId/history',
      );
      final Map<String, dynamic> jsonResponse =
          response.data as Map<String, dynamic>;
      if (jsonResponse['success'] == true) {
        final List<dynamic> data = jsonResponse['data'];
        return data
            .map((json) => TrackingHistoryItemModel.fromJson(json))
            .toList();
      }
      throw Exception(
        jsonResponse['message'] ?? 'Failed to load tracking history',
      );
    } on DioException catch (e) {
      throw Exception(_getErrorMessage(e));
    }
  }

  @override
  Future<TrackingDataModel> getClientLiveTracking(String incidentId) async {
    try {
      final response = await _apiClient.get(
        '/api/tracking/client/incidents/$incidentId/live',
      );
      final Map<String, dynamic> jsonResponse =
          response.data as Map<String, dynamic>;
      if (jsonResponse['success'] == true) {
        return TrackingDataModel.fromJson(jsonResponse['data']);
      }
      throw Exception(
        jsonResponse['message'] ?? 'Failed to load client live tracking',
      );
    } on DioException catch (e) {
      throw Exception(_getErrorMessage(e));
    }
  }

  @override
  Future<List<TrackingHistoryItemModel>> getClientTrackingHistory(
    String incidentId,
  ) async {
    try {
      final response = await _apiClient.get(
        '/api/tracking/client/incidents/$incidentId/history',
      );
      final Map<String, dynamic> jsonResponse =
          response.data as Map<String, dynamic>;
      if (jsonResponse['success'] == true) {
        final List<dynamic> data = jsonResponse['data'];
        return data
            .map((json) => TrackingHistoryItemModel.fromJson(json))
            .toList();
      }
      throw Exception(
        jsonResponse['message'] ?? 'Failed to load client tracking history',
      );
    } on DioException catch (e) {
      throw Exception(_getErrorMessage(e));
    }
  }

  @override
  Future<TrackingDataModel> getPlatformLiveTracking(String incidentId) async {
    try {
      final response = await _apiClient.get(
        '/api/tracking/platform/incidents/$incidentId/live',
      );
      final Map<String, dynamic> jsonResponse =
          response.data as Map<String, dynamic>;
      if (jsonResponse['success'] == true) {
        return TrackingDataModel.fromJson(jsonResponse['data']);
      }
      throw Exception(
        jsonResponse['message'] ?? 'Failed to load platform live tracking',
      );
    } on DioException catch (e) {
      throw Exception(_getErrorMessage(e));
    }
  }

  @override
  Future<List<TrackingHistoryItemModel>> getPlatformTrackingHistory(
    String incidentId,
  ) async {
    try {
      final response = await _apiClient.get(
        '/api/tracking/platform/incidents/$incidentId/history',
      );
      final Map<String, dynamic> jsonResponse =
          response.data as Map<String, dynamic>;
      if (jsonResponse['success'] == true) {
        final List<dynamic> data = jsonResponse['data'];
        return data
            .map((json) => TrackingHistoryItemModel.fromJson(json))
            .toList();
      }
      throw Exception(
        jsonResponse['message'] ?? 'Failed to load platform tracking history',
      );
    } on DioException catch (e) {
      throw Exception(_getErrorMessage(e));
    }
  }

  String _getErrorMessage(DioException e) {
    if (e.response != null) {
      final data = e.response?.data;
      if (data != null && data['message'] != null) {
        return data['message'] as String;
      }
      return 'Error del servidor: ${e.response?.statusCode}';
    }
    return 'Error de red: ${e.message}';
  }
}
``

---

## mechanic_mobile/lib/infrastructure/datasources/vehicle_remote_data_source.dart

``dart
import '../../core/network/api_client.dart';
import '../models/vehicle_model.dart';

class VehicleRemoteDataSource {
  final ApiClient api;

  VehicleRemoteDataSource(this.api);

  Future<VehicleModel> createVehicle(Map<String, dynamic> body) async {
    final response = await api.post('/api/vehicles', body);
    final Map<String, dynamic> jsonResponse = response.data;
    if (jsonResponse['success'] == true) {
      return VehicleModel.fromJson(jsonResponse['data']);
    } else {
      throw Exception(jsonResponse['message'] ?? 'Error al crear vehículo');
    }
  }

  Future<List<VehicleModel>> getMyVehicles() async {
    final response = await api.get('/api/vehicles');
    final Map<String, dynamic> jsonResponse = response.data;
    if (jsonResponse['success'] == true) {
      final List<dynamic> list = jsonResponse['data'] as List<dynamic>;
      return list
          .map((item) => VehicleModel.fromJson(item as Map<String, dynamic>))
          .toList();
    } else {
      throw Exception(jsonResponse['message'] ?? 'Error al cargar vehículos');
    }
  }

  Future<VehicleModel> getVehicleById(String vehicleId) async {
    final response = await api.get('/api/vehicles/$vehicleId');
    final Map<String, dynamic> jsonResponse = response.data;
    if (jsonResponse['success'] == true) {
      return VehicleModel.fromJson(jsonResponse['data']);
    } else {
      throw Exception(jsonResponse['message'] ?? 'Error al cargar vehículo');
    }
  }

  Future<VehicleModel> updateVehicle(
    String vehicleId,
    Map<String, dynamic> body,
  ) async {
    final response = await api.patch('/api/vehicles/$vehicleId', body);
    final Map<String, dynamic> jsonResponse = response.data;
    if (jsonResponse['success'] == true) {
      return VehicleModel.fromJson(jsonResponse['data']);
    } else {
      throw Exception(
        jsonResponse['message'] ?? 'Error al actualizar vehículo',
      );
    }
  }
}
``

---

## mechanic_mobile/lib/infrastructure/models/admin_incident_model.dart

``dart
import '../../domain/entities/admin_incident.dart';
import '../../domain/entities/user.dart';
import '../../domain/entities/vehicle.dart';

class AdminIncidentModel {
  final String id;
  final String clientUserId;
  final String? vehicleId;
  final String? providerId;
  final String? assignedTechnicianId;
  final String? dispatchMode;
  final String status;
  final String priority;
  final String reportedCategory;
  final String title;
  final String description;
  final String? clientContactPhoneSnapshot;
  final double? incidentLatitude;
  final double? incidentLongitude;
  final String? addressReference;
  final double? estimatedPriceMin;
  final double? estimatedPriceMax;
  final String? aiSummaryStatus;
  final String? structuredSummary;
  final String? suggestedCategory;
  final String? suggestedPriority;
  final bool requiresMoreInformation;
  final double? responderLastLatitude;
  final double? responderLastLongitude;
  final double? routeDistanceKm;
  final int? routeEtaMinutes;
  final DateTime? requestedAt;
  final DateTime? assignedAt;
  final DateTime? enRouteAt;
  final DateTime? arrivedAt;
  final DateTime? startedAt;
  final DateTime? completedAt;
  final DateTime? cancelledAt;
  final DateTime createdAt;
  final DateTime updatedAt;
  final Vehicle? vehicle;
  final User? clientUser;
  final ProviderInfoModel? provider;
  final TechnicianInfoModel? assignedTechnician;

  AdminIncidentModel({
    required this.id,
    required this.clientUserId,
    this.vehicleId,
    this.providerId,
    this.assignedTechnicianId,
    this.dispatchMode,
    required this.status,
    required this.priority,
    required this.reportedCategory,
    required this.title,
    required this.description,
    this.clientContactPhoneSnapshot,
    this.incidentLatitude,
    this.incidentLongitude,
    this.addressReference,
    this.estimatedPriceMin,
    this.estimatedPriceMax,
    this.aiSummaryStatus,
    this.structuredSummary,
    this.suggestedCategory,
    this.suggestedPriority,
    required this.requiresMoreInformation,
    this.responderLastLatitude,
    this.responderLastLongitude,
    this.routeDistanceKm,
    this.routeEtaMinutes,
    this.requestedAt,
    this.assignedAt,
    this.enRouteAt,
    this.arrivedAt,
    this.startedAt,
    this.completedAt,
    this.cancelledAt,
    required this.createdAt,
    required this.updatedAt,
    this.vehicle,
    this.clientUser,
    this.provider,
    this.assignedTechnician,
  });

  factory AdminIncidentModel.fromJson(Map<String, dynamic> json) {
    return AdminIncidentModel(
      id: _toStringOrFallback(json['id'], ''),
      clientUserId: _toStringOrFallback(json['client_user_id'], ''),
      vehicleId: json['vehicle_id'] as String?,
      providerId: json['provider_id'] as String?,
      assignedTechnicianId: json['assigned_technician_id'] as String?,
      dispatchMode: json['dispatch_mode'] as String?,
      status: _toStringOrFallback(json['status'], 'PENDING'),
      priority: _toStringOrFallback(json['priority'], 'MEDIUM'),
      reportedCategory: _toStringOrFallback(json['reported_category'], 'OTHER'),
      title: _toStringOrFallback(json['title'], 'Sin título'),
      description: _toStringOrFallback(json['description'], 'Sin descripción'),
      clientContactPhoneSnapshot:
          json['client_contact_phone_snapshot'] as String?,
      incidentLatitude: (json['incident_latitude'] as num?)?.toDouble(),
      incidentLongitude: (json['incident_longitude'] as num?)?.toDouble(),
      addressReference: json['address_reference'] as String?,
      estimatedPriceMin: (json['estimated_price_min'] as num?)?.toDouble(),
      estimatedPriceMax: (json['estimated_price_max'] as num?)?.toDouble(),
      aiSummaryStatus: json['ai_summary_status'] as String?,
      structuredSummary: json['structured_summary'] as String?,
      suggestedCategory: json['suggested_category'] as String?,
      suggestedPriority: json['suggested_priority'] as String?,
      requiresMoreInformation:
          json['requires_more_information'] as bool? ?? false,
      responderLastLatitude: (json['responder_last_latitude'] as num?)
          ?.toDouble(),
      responderLastLongitude: (json['responder_last_longitude'] as num?)
          ?.toDouble(),
      routeDistanceKm: (json['route_distance_km'] as num?)?.toDouble(),
      routeEtaMinutes: json['route_eta_minutes'] as int?,
      requestedAt: json['requested_at'] != null
          ? DateTime.tryParse(json['requested_at'] as String)
          : null,
      assignedAt: json['assigned_at'] != null
          ? DateTime.tryParse(json['assigned_at'] as String)
          : null,
      enRouteAt: json['en_route_at'] != null
          ? DateTime.tryParse(json['en_route_at'] as String)
          : null,
      arrivedAt: json['arrived_at'] != null
          ? DateTime.tryParse(json['arrived_at'] as String)
          : null,
      startedAt: json['started_at'] != null
          ? DateTime.tryParse(json['started_at'] as String)
          : null,
      completedAt: json['completed_at'] != null
          ? DateTime.tryParse(json['completed_at'] as String)
          : null,
      cancelledAt: json['cancelled_at'] != null
          ? DateTime.tryParse(json['cancelled_at'] as String)
          : null,
      createdAt: DateTime.parse(json['created_at'] as String),
      updatedAt: DateTime.parse(json['updated_at'] as String),
      vehicle: json['vehicle'] != null ? _parseVehicle(json['vehicle']) : null,
      clientUser: json['client_user'] != null
          ? _parseUser(json['client_user'])
          : null,
      provider: json['provider'] != null
          ? ProviderInfoModel.fromJson(json['provider'])
          : null,
      assignedTechnician: json['assigned_technician'] != null
          ? TechnicianInfoModel.fromJson(json['assigned_technician'])
          : null,
    );
  }

  static String _toStringOrFallback(dynamic value, String fallback) {
    if (value == null) return fallback;
    return value.toString();
  }

  static Vehicle _parseVehicle(Map<String, dynamic> json) {
    return Vehicle(
      id: _toStringOrFallback(json['id'], ''),
      ownerUserId: _toStringOrFallback(json['owner_user_id'], ''),
      plateNumber: _toStringOrFallback(json['plate_number'], ''),
      vehicleType: _toStringOrFallback(json['vehicle_type'], 'CAR'),
      brand: _toStringOrFallback(json['brand'], ''),
      model: _toStringOrFallback(json['model'], ''),
      year: json['year'] as int? ?? 0,
      color: _toStringOrFallback(json['color'], ''),
      notes: json['notes'] ?? '',
      isActive: json['is_active'] as bool? ?? true,
    );
  }

  static User _parseUser(Map<String, dynamic> json) {
    return User(
      id: _toStringOrFallback(json['id'], ''),
      email: _toStringOrFallback(json['email'], ''),
      fullName: _toStringOrFallback(json['full_name'], ''),
      firstName: json['first_name'] as String?,
      lastName: json['last_name'] as String?,
      phoneNumber: json['phone_number'] as String?,
      isActive: json['is_active'] as bool? ?? true,
      isSuperuser: json['is_superuser'] as bool? ?? false,
      roleCodes: json['role_codes'] != null
          ? List<String>.from(json['role_codes'] as List)
          : [],
    );
  }

  AdminIncident toEntity() {
    return AdminIncident(
      id: id,
      clientUserId: clientUserId,
      vehicleId: vehicleId,
      providerId: providerId,
      assignedTechnicianId: assignedTechnicianId,
      dispatchMode: dispatchMode,
      status: status,
      priority: priority,
      reportedCategory: reportedCategory,
      title: title,
      description: description,
      clientContactPhoneSnapshot: clientContactPhoneSnapshot,
      incidentLatitude: incidentLatitude,
      incidentLongitude: incidentLongitude,
      addressReference: addressReference,
      estimatedPriceMin: estimatedPriceMin,
      estimatedPriceMax: estimatedPriceMax,
      aiSummaryStatus: aiSummaryStatus,
      structuredSummary: structuredSummary,
      suggestedCategory: suggestedCategory,
      suggestedPriority: suggestedPriority,
      requiresMoreInformation: requiresMoreInformation,
      responderLastLatitude: responderLastLatitude,
      responderLastLongitude: responderLastLongitude,
      routeDistanceKm: routeDistanceKm,
      routeEtaMinutes: routeEtaMinutes,
      requestedAt: requestedAt,
      assignedAt: assignedAt,
      enRouteAt: enRouteAt,
      arrivedAt: arrivedAt,
      startedAt: startedAt,
      completedAt: completedAt,
      cancelledAt: cancelledAt,
      createdAt: createdAt,
      updatedAt: updatedAt,
      vehicle: vehicle,
      clientUser: clientUser,
      provider: provider?.toEntity(),
      assignedTechnician: assignedTechnician?.toEntity(),
    );
  }
}

class ProviderInfoModel {
  final String id;
  final String providerType;
  final String businessName;
  final String? contactPhone;
  final String? city;
  final bool isAvailable;
  final double averageRating;

  ProviderInfoModel({
    required this.id,
    required this.providerType,
    required this.businessName,
    this.contactPhone,
    this.city,
    required this.isAvailable,
    required this.averageRating,
  });

  factory ProviderInfoModel.fromJson(Map<String, dynamic> json) {
    return ProviderInfoModel(
      id: _toStringOrFallback(json['id'], ''),
      providerType: _toStringOrFallback(json['provider_type'], 'WORKSHOP'),
      businessName: _toStringOrFallback(json['business_name'], ''),
      contactPhone: json['contact_phone'] as String?,
      city: json['city'] as String?,
      isAvailable: json['is_available'] as bool? ?? false,
      averageRating: (json['average_rating'] as num?)?.toDouble() ?? 0.0,
    );
  }

  static String _toStringOrFallback(dynamic value, String fallback) {
    if (value == null) return fallback;
    return value.toString();
  }

  ProviderInfo toEntity() => ProviderInfo(
    id: id,
    providerType: providerType,
    businessName: businessName,
    contactPhone: contactPhone,
    city: city,
    isAvailable: isAvailable,
    averageRating: averageRating,
  );
}

class TechnicianInfoModel {
  final String id;
  final String providerId;
  final String firstName;
  final String lastName;
  final String? phoneNumber;
  final String? specialty;
  final bool isActive;
  final bool isAvailable;

  TechnicianInfoModel({
    required this.id,
    required this.providerId,
    required this.firstName,
    required this.lastName,
    this.phoneNumber,
    this.specialty,
    required this.isActive,
    required this.isAvailable,
  });

  factory TechnicianInfoModel.fromJson(Map<String, dynamic> json) {
    return TechnicianInfoModel(
      id: _toStringOrFallback(json['id'], ''),
      providerId: _toStringOrFallback(json['provider_id'], ''),
      firstName: _toStringOrFallback(json['first_name'], ''),
      lastName: _toStringOrFallback(json['last_name'], ''),
      phoneNumber: json['phone_number'] as String?,
      specialty: json['specialty'] as String?,
      isActive: json['is_active'] as bool? ?? true,
      isAvailable: json['is_available'] as bool? ?? false,
    );
  }

  static String _toStringOrFallback(dynamic value, String fallback) {
    if (value == null) return fallback;
    return value.toString();
  }

  TechnicianInfo toEntity() => TechnicianInfo(
    id: id,
    providerId: providerId,
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
    specialty: specialty,
    isActive: isActive,
    isAvailable: isAvailable,
  );
}

class CandidateModel {
  final String id;
  final String incidentId;
  final String providerId;
  final String status;
  final int recommendationRank;
  final double score;
  final double distanceKm;
  final List<String> requiredServiceCodes;
  final List<String> matchedServiceCodes;
  final Map<String, dynamic> rationale;
  final double providerAverageRatingSnapshot;
  final int providerAvailableCapacitySnapshot;
  final int availableTechniciansCountSnapshot;
  final DateTime publishedAt;
  final DateTime? respondedAt;
  final DateTime? expiresAt;
  final CandidateProviderModel provider;
  final CandidateIncidentModel incident;

  CandidateModel({
    required this.id,
    required this.incidentId,
    required this.providerId,
    required this.status,
    required this.recommendationRank,
    required this.score,
    required this.distanceKm,
    required this.requiredServiceCodes,
    required this.matchedServiceCodes,
    required this.rationale,
    required this.providerAverageRatingSnapshot,
    required this.providerAvailableCapacitySnapshot,
    required this.availableTechniciansCountSnapshot,
    required this.publishedAt,
    this.respondedAt,
    this.expiresAt,
    required this.provider,
    required this.incident,
  });

  factory CandidateModel.fromJson(Map<String, dynamic> json) {
    return CandidateModel(
      id: _toStringOrFallback(json['id'], ''),
      incidentId: _toStringOrFallback(json['incident_id'], ''),
      providerId: _toStringOrFallback(json['provider_id'], ''),
      status: _toStringOrFallback(json['status'], 'AVAILABLE'),
      recommendationRank: json['recommendation_rank'] as int? ?? 0,
      score: (json['score'] as num?)?.toDouble() ?? 0.0,
      distanceKm: (json['distance_km'] as num?)?.toDouble() ?? 0.0,
      requiredServiceCodes: json['required_service_codes'] != null
          ? List<String>.from(json['required_service_codes'] as List)
          : [],
      matchedServiceCodes: json['matched_service_codes'] != null
          ? List<String>.from(json['matched_service_codes'] as List)
          : [],
      rationale: json['rationale'] as Map<String, dynamic>? ?? {},
      providerAverageRatingSnapshot:
          (json['provider_average_rating_snapshot'] as num?)?.toDouble() ?? 0.0,
      providerAvailableCapacitySnapshot:
          json['provider_available_capacity_snapshot'] as int? ?? 0,
      availableTechniciansCountSnapshot:
          json['available_technicians_count_snapshot'] as int? ?? 0,
      publishedAt: DateTime.parse(json['published_at'] as String),
      respondedAt: json['responded_at'] != null
          ? DateTime.tryParse(json['responded_at'] as String)
          : null,
      expiresAt: json['expires_at'] != null
          ? DateTime.tryParse(json['expires_at'] as String)
          : null,
      provider: CandidateProviderModel.fromJson(json['provider']),
      incident: CandidateIncidentModel.fromJson(json['incident']),
    );
  }

  static String _toStringOrFallback(dynamic value, String fallback) {
    if (value == null) return fallback;
    return value.toString();
  }

  Candidate toEntity() {
    return Candidate(
      id: id,
      providerId: providerId,
      providerName: provider.businessName,
      providerType: provider.providerType,
      averageRating: providerAverageRatingSnapshot,
      availableCapacity: providerAvailableCapacitySnapshot,
      availableTechniciansCount: availableTechniciansCountSnapshot,
      distanceKm: distanceKm,
      matchedServices: matchedServiceCodes,
      score: score,
      rationale: _formatRationale(rationale),
      createdAt: publishedAt,
    );
  }

  String _formatRationale(Map<String, dynamic> rationale) {
    final parts = <String>[];
    if (rationale['distance_score'] != null) {
      parts.add('Distancia: ${rationale['distance_score']} puntos');
    }
    if (rationale['service_score'] != null) {
      parts.add('Servicios: ${rationale['service_score']} puntos');
    }
    if (rationale['capacity_score'] != null) {
      parts.add('Capacidad: ${rationale['capacity_score']} puntos');
    }
    if (rationale['technician_score'] != null) {
      parts.add('Técnicos: ${rationale['technician_score']} puntos');
    }
    if (rationale['rating_score'] != null) {
      parts.add('Calificación: ${rationale['rating_score']} puntos');
    }
    return parts.join(' · ');
  }
}

// ✅ MODELO DE PROVEEDOR DENTRO DEL CANDIDATO
class CandidateProviderModel {
  final String id;
  final String providerType;
  final String businessName;
  final String city;
  final String? contactPhone;
  final double averageRating;
  final int availableCapacity;
  final int availableTechniciansCount;
  final double baseLatitude;
  final double baseLongitude;
  final CandidateProviderOwnerUserModel ownerUser;
  final List<CandidateMatchedServiceModel> matchedServices;

  CandidateProviderModel({
    required this.id,
    required this.providerType,
    required this.businessName,
    required this.city,
    this.contactPhone,
    required this.averageRating,
    required this.availableCapacity,
    required this.availableTechniciansCount,
    required this.baseLatitude,
    required this.baseLongitude,
    required this.ownerUser,
    required this.matchedServices,
  });

  factory CandidateProviderModel.fromJson(Map<String, dynamic> json) {
    return CandidateProviderModel(
      id: _toStringOrFallback(json['id'], ''),
      providerType: _toStringOrFallback(json['provider_type'], 'WORKSHOP'),
      businessName: _toStringOrFallback(json['business_name'], ''),
      city: _toStringOrFallback(json['city'], ''),
      contactPhone: json['contact_phone'] as String?,
      averageRating: (json['average_rating'] as num?)?.toDouble() ?? 0.0,
      availableCapacity: json['available_capacity'] as int? ?? 0,
      availableTechniciansCount:
          json['available_technicians_count'] as int? ?? 0,
      baseLatitude: (json['base_latitude'] as num?)?.toDouble() ?? 0.0,
      baseLongitude: (json['base_longitude'] as num?)?.toDouble() ?? 0.0,
      ownerUser: CandidateProviderOwnerUserModel.fromJson(json['owner_user']),
      matchedServices:
          (json['matched_services'] as List<dynamic>?)
              ?.map((e) => CandidateMatchedServiceModel.fromJson(e))
              .toList() ??
          [],
    );
  }

  static String _toStringOrFallback(dynamic value, String fallback) {
    if (value == null) return fallback;
    return value.toString();
  }
}

// ✅ MODELO DEL USUARIO DUEÑO DEL PROVEEDOR
class CandidateProviderOwnerUserModel {
  final String id;
  final String email;
  final String firstName;
  final String lastName;
  final String fullName;
  final String phoneNumber;

  CandidateProviderOwnerUserModel({
    required this.id,
    required this.email,
    required this.firstName,
    required this.lastName,
    required this.fullName,
    required this.phoneNumber,
  });

  factory CandidateProviderOwnerUserModel.fromJson(Map<String, dynamic> json) {
    return CandidateProviderOwnerUserModel(
      id: _toStringOrFallback(json['id'], ''),
      email: _toStringOrFallback(json['email'], ''),
      firstName: _toStringOrFallback(json['first_name'], ''),
      lastName: _toStringOrFallback(json['last_name'], ''),
      fullName: _toStringOrFallback(json['full_name'], ''),
      phoneNumber: _toStringOrFallback(json['phone_number'], ''),
    );
  }

  static String _toStringOrFallback(dynamic value, String fallback) {
    if (value == null) return fallback;
    return value.toString();
  }
}

// ✅ MODELO DE SERVICIO COINCIDENTE
class CandidateMatchedServiceModel {
  final String code;
  final String category;
  final String title;

  CandidateMatchedServiceModel({
    required this.code,
    required this.category,
    required this.title,
  });

  factory CandidateMatchedServiceModel.fromJson(Map<String, dynamic> json) {
    return CandidateMatchedServiceModel(
      code: _toStringOrFallback(json['code'], ''),
      category: _toStringOrFallback(json['category'], ''),
      title: _toStringOrFallback(json['title'], ''),
    );
  }

  static String _toStringOrFallback(dynamic value, String fallback) {
    if (value == null) return fallback;
    return value.toString();
  }
}

// ✅ MODELO DEL INCIDENTE DENTRO DEL CANDIDATO
class CandidateIncidentModel {
  final String id;
  final String status;
  final String priority;
  final String reportedCategory;
  final String title;
  final String description;
  final double incidentLatitude;
  final double incidentLongitude;
  final String addressReference;
  final String aiSummaryStatus;
  final String? structuredSummary;
  final String? suggestedCategory;
  final String? suggestedPriority;
  final bool requiresMoreInformation;

  CandidateIncidentModel({
    required this.id,
    required this.status,
    required this.priority,
    required this.reportedCategory,
    required this.title,
    required this.description,
    required this.incidentLatitude,
    required this.incidentLongitude,
    required this.addressReference,
    required this.aiSummaryStatus,
    this.structuredSummary,
    this.suggestedCategory,
    this.suggestedPriority,
    required this.requiresMoreInformation,
  });

  factory CandidateIncidentModel.fromJson(Map<String, dynamic> json) {
    return CandidateIncidentModel(
      id: _toStringOrFallback(json['id'], ''),
      status: _toStringOrFallback(json['status'], 'PENDING'),
      priority: _toStringOrFallback(json['priority'], 'MEDIUM'),
      reportedCategory: _toStringOrFallback(json['reported_category'], 'OTHER'),
      title: _toStringOrFallback(json['title'], ''),
      description: _toStringOrFallback(json['description'], ''),
      incidentLatitude: (json['incident_latitude'] as num?)?.toDouble() ?? 0.0,
      incidentLongitude:
          (json['incident_longitude'] as num?)?.toDouble() ?? 0.0,
      addressReference: _toStringOrFallback(json['address_reference'], ''),
      aiSummaryStatus: _toStringOrFallback(
        json['ai_summary_status'],
        'NOT_REQUESTED',
      ),
      structuredSummary: json['structured_summary'] as String?,
      suggestedCategory: json['suggested_category'] as String?,
      suggestedPriority: json['suggested_priority'] as String?,
      requiresMoreInformation:
          json['requires_more_information'] as bool? ?? false,
    );
  }

  static String _toStringOrFallback(dynamic value, String fallback) {
    if (value == null) return fallback;
    return value.toString();
  }
}
``

---

## mechanic_mobile/lib/infrastructure/models/catalog_service_model.dart

``dart
import '../../domain/entities/catalog_service.dart';

class CatalogItemModel {
  final String id;
  final String code;
  final String category;
  final String title;
  final String description;
  final bool supportsMobileService;
  final bool supportsEmergencyService;
  final bool isActive;
  final int sortOrder;
  final DateTime createdAt;
  final DateTime updatedAt;

  CatalogItemModel({
    required this.id,
    required this.code,
    required this.category,
    required this.title,
    required this.description,
    required this.supportsMobileService,
    required this.supportsEmergencyService,
    required this.isActive,
    required this.sortOrder,
    required this.createdAt,
    required this.updatedAt,
  });

  factory CatalogItemModel.fromJson(Map<String, dynamic> json) {
    return CatalogItemModel(
      id: json['id'] as String,
      code: json['code'] as String,
      category: json['category'] as String,
      title: json['title'] as String,
      description: json['description'] as String,
      supportsMobileService: json['supports_mobile_service'] as bool? ?? false,
      supportsEmergencyService: json['supports_emergency_service'] as bool? ?? false,
      isActive: json['is_active'] as bool? ?? true,
      sortOrder: json['sort_order'] as int? ?? 0,
      createdAt: DateTime.parse(json['created_at'] as String),
      updatedAt: DateTime.parse(json['updated_at'] as String),
    );
  }

  CatalogItem toEntity() => CatalogItem(
    id: id,
    code: code,
    category: category,
    title: title,
    description: description,
    supportsMobileService: supportsMobileService,
    supportsEmergencyService: supportsEmergencyService,
    isActive: isActive,
    sortOrder: sortOrder,
    createdAt: createdAt,
    updatedAt: updatedAt,
  );
}

class ProviderServiceModel {
  final String id;
  final String providerId;
  final String serviceCatalogItemId;
  final String serviceCode;
  final String serviceCategory;
  final String catalogTitle;
  final String catalogDescription;
  final String? customTitle;
  final String? customDescription;
  final String effectiveTitle;
  final String effectiveDescription;
  final double priceEstimateMin;
  final double priceEstimateMax;
  final int estimatedDurationMinutes;
  final bool supportsMobileService;
  final bool supportsEmergencyService;
  final bool isMobileServiceEnabled;
  final bool isEmergencyServiceEnabled;
  final bool isActive;
  final DateTime createdAt;
  final DateTime updatedAt;

  ProviderServiceModel({
    required this.id,
    required this.providerId,
    required this.serviceCatalogItemId,
    required this.serviceCode,
    required this.serviceCategory,
    required this.catalogTitle,
    required this.catalogDescription,
    this.customTitle,
    this.customDescription,
    required this.effectiveTitle,
    required this.effectiveDescription,
    required this.priceEstimateMin,
    required this.priceEstimateMax,
    required this.estimatedDurationMinutes,
    required this.supportsMobileService,
    required this.supportsEmergencyService,
    required this.isMobileServiceEnabled,
    required this.isEmergencyServiceEnabled,
    required this.isActive,
    required this.createdAt,
    required this.updatedAt,
  });

  factory ProviderServiceModel.fromJson(Map<String, dynamic> json) {
    return ProviderServiceModel(
      id: json['id'] as String,
      providerId: json['provider_id'] as String,
      serviceCatalogItemId: json['service_catalog_item_id'] as String,
      serviceCode: json['service_code'] as String,
      serviceCategory: json['service_category'] as String,
      catalogTitle: json['catalog_title'] as String,
      catalogDescription: json['catalog_description'] as String,
      customTitle: json['custom_title'] as String?,
      customDescription: json['custom_description'] as String?,
      effectiveTitle: json['effective_title'] as String,
      effectiveDescription: json['effective_description'] as String,
      priceEstimateMin: (json['price_estimate_min'] as num?)?.toDouble() ?? 0.0,
      priceEstimateMax: (json['price_estimate_max'] as num?)?.toDouble() ?? 0.0,
      estimatedDurationMinutes: json['estimated_duration_minutes'] as int? ?? 0,
      supportsMobileService: json['supports_mobile_service'] as bool? ?? false,
      supportsEmergencyService: json['supports_emergency_service'] as bool? ?? false,
      isMobileServiceEnabled: json['is_mobile_service_enabled'] as bool? ?? false,
      isEmergencyServiceEnabled: json['is_emergency_service_enabled'] as bool? ?? false,
      isActive: json['is_active'] as bool? ?? true,
      createdAt: DateTime.parse(json['created_at'] as String),
      updatedAt: DateTime.parse(json['updated_at'] as String),
    );
  }

  ProviderService toEntity() => ProviderService(
    id: id,
    providerId: providerId,
    serviceCatalogItemId: serviceCatalogItemId,
    serviceCode: serviceCode,
    serviceCategory: serviceCategory,
    catalogTitle: catalogTitle,
    catalogDescription: catalogDescription,
    customTitle: customTitle,
    customDescription: customDescription,
    effectiveTitle: effectiveTitle,
    effectiveDescription: effectiveDescription,
    priceEstimateMin: priceEstimateMin,
    priceEstimateMax: priceEstimateMax,
    estimatedDurationMinutes: estimatedDurationMinutes,
    supportsMobileService: supportsMobileService,
    supportsEmergencyService: supportsEmergencyService,
    isMobileServiceEnabled: isMobileServiceEnabled,
    isEmergencyServiceEnabled: isEmergencyServiceEnabled,
    isActive: isActive,
    createdAt: createdAt,
    updatedAt: updatedAt,
  );
}

class CatalogServiceEntryModel {
  final CatalogItemModel catalogItem;
  final ProviderServiceModel? providerService;
  final bool isConfigured;

  CatalogServiceEntryModel({
    required this.catalogItem,
    this.providerService,
    required this.isConfigured,
  });

  factory CatalogServiceEntryModel.fromJson(Map<String, dynamic> json) {
    return CatalogServiceEntryModel(
      catalogItem: CatalogItemModel.fromJson(json['catalog_item']),
      providerService: json['provider_service'] != null 
          ? ProviderServiceModel.fromJson(json['provider_service'])
          : null,
      isConfigured: json['is_configured'] as bool? ?? false,
    );
  }

  CatalogServiceEntry toEntity() => CatalogServiceEntry(
    catalogItem: catalogItem.toEntity(),
    providerService: providerService?.toEntity(),
    isConfigured: isConfigured,
  );
}
``

---

## mechanic_mobile/lib/infrastructure/models/device_token_model.dart

``dart
import '../../domain/entities/device_token.dart';

class DeviceTokenModel {
  final String id;
  final String userId;
  final String devicePlatform;
  final String? deviceLabel;
  final String appRole;
  final String pushProviderName;
  final bool isActive;
  final DateTime lastSeenAt;
  final DateTime createdAt;
  final DateTime updatedAt;

  DeviceTokenModel({
    required this.id,
    required this.userId,
    required this.devicePlatform,
    this.deviceLabel,
    required this.appRole,
    required this.pushProviderName,
    required this.isActive,
    required this.lastSeenAt,
    required this.createdAt,
    required this.updatedAt,
  });

  factory DeviceTokenModel.fromJson(Map<String, dynamic> json) {
    return DeviceTokenModel(
      id: _toStringOrFallback(json['id'], ''),
      userId: _toStringOrFallback(json['user_id'], ''),
      devicePlatform: _toStringOrFallback(json['device_platform'], 'UNKNOWN'),
      deviceLabel: json['device_label'] as String?,
      appRole: _toStringOrFallback(json['app_role'], 'CLIENT'),
      pushProviderName: _toStringOrFallback(json['push_provider_name'], ''),
      isActive: json['is_active'] as bool? ?? true,
      lastSeenAt: json['last_seen_at'] != null 
          ? DateTime.parse(json['last_seen_at'] as String) 
          : DateTime.now(),
      createdAt: DateTime.parse(json['created_at'] as String),
      updatedAt: DateTime.parse(json['updated_at'] as String),
    );
  }

  static String _toStringOrFallback(dynamic value, String fallback) {
    if (value == null) return fallback;
    return value.toString();
  }

  DeviceToken toEntity() {
    return DeviceToken(
      id: id,
      userId: userId,
      devicePlatform: devicePlatform,
      deviceLabel: deviceLabel,
      appRole: appRole,
      pushProviderName: pushProviderName,
      isActive: isActive,
      lastSeenAt: lastSeenAt,
      createdAt: createdAt,
      updatedAt: updatedAt,
    );
  }
}
``

---

## mechanic_mobile/lib/infrastructure/models/evidence_model.dart

``dart
import '../../domain/entities/evidence.dart';
import '../../domain/entities/user.dart';

class EvidenceModel {
  final String id;
  final String incidentId;
  final String uploadedByUserId;
  final String evidenceType;
  final String? originalFilename;
  final String storedFilename;
  final String? fileExtension;
  final String? mimeType;
  final int? fileSizeBytes;
  final String? description;
  final String? textContentSnapshot;
  final String storageProvider;
  final String? downloadUrl;
  final String? audioProcessingStatus;
  final String? transcriptText;
  final String? imageProcessingStatus;
  final String? imageSummary;
  final DateTime createdAt;
  final DateTime updatedAt;
  final User? uploadedByUser;

  EvidenceModel({
    required this.id,
    required this.incidentId,
    required this.uploadedByUserId,
    required this.evidenceType,
    this.originalFilename,
    required this.storedFilename,
    this.fileExtension,
    this.mimeType,
    this.fileSizeBytes,
    this.description,
    this.textContentSnapshot,
    required this.storageProvider,
    this.downloadUrl,
    this.audioProcessingStatus,
    this.transcriptText,
    this.imageProcessingStatus,
    this.imageSummary,
    required this.createdAt,
    required this.updatedAt,
    this.uploadedByUser,
  });

  factory EvidenceModel.fromJson(Map<String, dynamic> json) {
    return EvidenceModel(
      id: _toStringOrFallback(json['id'], ''),
      incidentId: _toStringOrFallback(json['incident_id'], ''),
      uploadedByUserId: _toStringOrFallback(json['uploaded_by_user_id'], ''),
      evidenceType: _toStringOrFallback(json['evidence_type'], 'TEXT'),
      originalFilename: json['original_filename'] as String?,
      storedFilename: _toStringOrFallback(json['stored_filename'], ''),
      fileExtension: json['file_extension'] as String?,
      mimeType: json['mime_type'] as String?,
      fileSizeBytes: json['file_size_bytes'] as int?,
      description: json['description'] as String?,
      textContentSnapshot: json['text_content_snapshot'] as String?,
      storageProvider: _toStringOrFallback(json['storage_provider'], 'local'),
      downloadUrl: json['download_url'] as String?,
      audioProcessingStatus: json['audio_processing_status'] as String?,
      transcriptText: json['transcript_text'] as String?,
      imageProcessingStatus: json['image_processing_status'] as String?,
      imageSummary: json['image_summary'] as String?,
      createdAt: json['created_at'] != null
          ? DateTime.parse(json['created_at'] as String)
          : DateTime.now(),
      updatedAt: json['updated_at'] != null
          ? DateTime.parse(json['updated_at'] as String)
          : DateTime.now(),
      uploadedByUser: json['uploaded_by_user'] != null
          ? _parseUser(json['uploaded_by_user'])
          : null,
    );
  }

  static String _toStringOrFallback(dynamic value, String fallback) {
    if (value == null) return fallback;
    return value.toString();
  }

  static User _parseUser(Map<String, dynamic> json) {
    return User(
      id: _toStringOrFallback(json['id'], ''),
      email: _toStringOrFallback(json['email'], ''),
      fullName: _toStringOrFallback(json['full_name'], ''),
      firstName: json['first_name'] as String?,
      lastName: json['last_name'] as String?,
      phoneNumber: json['phone_number'] as String?,
      isActive: json['is_active'] as bool? ?? true,
      isSuperuser: json['is_superuser'] as bool? ?? false,
      roleCodes: json['role_codes'] != null
          ? List<String>.from(json['role_codes'] as List)
          : [],
    );
  }

  Evidence toEntity() {
    return Evidence(
      id: id,
      incidentId: incidentId,
      uploadedByUserId: uploadedByUserId,
      evidenceType: evidenceType,
      originalFilename: originalFilename,
      storedFilename: storedFilename,
      fileExtension: fileExtension,
      mimeType: mimeType,
      fileSizeBytes: fileSizeBytes,
      description: description,
      textContentSnapshot: textContentSnapshot,
      storageProvider: storageProvider,
      downloadUrl: downloadUrl,
      audioProcessingStatus: audioProcessingStatus,
      transcriptText: transcriptText,
      imageProcessingStatus: imageProcessingStatus,
      imageSummary: imageSummary,
      createdAt: createdAt,
      updatedAt: updatedAt,
      uploadedByUser: uploadedByUser,
    );
  }
}
``

---

## mechanic_mobile/lib/infrastructure/models/incident_model.dart

``dart
import '../../domain/entities/incident.dart';
import '../../domain/entities/user.dart';
import '../../domain/entities/vehicle.dart';

class IncidentModel {
  final String id;
  final String clientUserId;
  final String? vehicleId;
  final String? providerId;
  final String? assignedTechnicianId;
  final String? dispatchMode;
  final String status;
  final String priority;
  final String reportedCategory;
  final String title;
  final String description;
  final String? clientContactPhoneSnapshot;
  final double? incidentLatitude;
  final double? incidentLongitude;
  final String? addressReference;
  final double? estimatedPriceMin;
  final double? estimatedPriceMax;
  final String? aiSummaryStatus;
  final String? structuredSummary;
  final String? suggestedCategory;
  final String? suggestedPriority;
  final bool requiresMoreInformation;
  final double? responderLastLatitude;
  final double? responderLastLongitude;
  final double? routeDistanceKm;
  final int? routeEtaMinutes;
  final DateTime? requestedAt;
  final DateTime? assignedAt;
  final DateTime? enRouteAt;
  final DateTime? arrivedAt;
  final DateTime? startedAt;
  final DateTime? completedAt;
  final DateTime? cancelledAt;
  final DateTime createdAt;
  final DateTime updatedAt;
  final Vehicle? vehicle;
  final User? clientUser;
  final ProviderInfoModel? provider;
  final TechnicianInfoModel? assignedTechnician;

  IncidentModel({
    required this.id,
    required this.clientUserId,
    this.vehicleId,
    this.providerId,
    this.assignedTechnicianId,
    this.dispatchMode,
    required this.status,
    required this.priority,
    required this.reportedCategory,
    required this.title,
    required this.description,
    this.clientContactPhoneSnapshot,
    this.incidentLatitude,
    this.incidentLongitude,
    this.addressReference,
    this.estimatedPriceMin,
    this.estimatedPriceMax,
    this.aiSummaryStatus,
    this.structuredSummary,
    this.suggestedCategory,
    this.suggestedPriority,
    required this.requiresMoreInformation,
    this.responderLastLatitude,
    this.responderLastLongitude,
    this.routeDistanceKm,
    this.routeEtaMinutes,
    this.requestedAt,
    this.assignedAt,
    this.enRouteAt,
    this.arrivedAt,
    this.startedAt,
    this.completedAt,
    this.cancelledAt,
    required this.createdAt,
    required this.updatedAt,
    this.vehicle,
    this.clientUser,
    this.provider,
    this.assignedTechnician,
  });

  factory IncidentModel.fromJson(Map<String, dynamic> json) {
    return IncidentModel(
      id: _toStringOrFallback(json['id'], ''),
      clientUserId: _toStringOrFallback(json['client_user_id'], ''),
      vehicleId: json['vehicle_id'] as String?,
      providerId: json['provider_id'] as String?,
      assignedTechnicianId: json['assigned_technician_id'] as String?,
      dispatchMode: json['dispatch_mode'] as String?,
      status: _toStringOrFallback(json['status'], 'PENDING'),
      priority: _toStringOrFallback(json['priority'], 'MEDIUM'),
      reportedCategory: _toStringOrFallback(json['reported_category'], 'OTHER'),
      title: _toStringOrFallback(json['title'], 'Sin título'),
      description: _toStringOrFallback(json['description'], 'Sin descripción'),
      clientContactPhoneSnapshot:
          json['client_contact_phone_snapshot'] as String?,
      incidentLatitude: (json['incident_latitude'] as num?)?.toDouble(),
      incidentLongitude: (json['incident_longitude'] as num?)?.toDouble(),
      addressReference: json['address_reference'] as String?,
      estimatedPriceMin: (json['estimated_price_min'] as num?)?.toDouble(),
      estimatedPriceMax: (json['estimated_price_max'] as num?)?.toDouble(),
      aiSummaryStatus: json['ai_summary_status'] as String?,
      structuredSummary: json['structured_summary'] as String?,
      suggestedCategory: json['suggested_category'] as String?,
      suggestedPriority: json['suggested_priority'] as String?,
      requiresMoreInformation:
          json['requires_more_information'] as bool? ?? false,
      responderLastLatitude: (json['responder_last_latitude'] as num?)
          ?.toDouble(),
      responderLastLongitude: (json['responder_last_longitude'] as num?)
          ?.toDouble(),
      routeDistanceKm: (json['route_distance_km'] as num?)?.toDouble(),
      routeEtaMinutes: json['route_eta_minutes'] as int?,
      requestedAt: json['requested_at'] != null
          ? DateTime.tryParse(json['requested_at'] as String)
          : null,
      assignedAt: json['assigned_at'] != null
          ? DateTime.tryParse(json['assigned_at'] as String)
          : null,
      enRouteAt: json['en_route_at'] != null
          ? DateTime.tryParse(json['en_route_at'] as String)
          : null,
      arrivedAt: json['arrived_at'] != null
          ? DateTime.tryParse(json['arrived_at'] as String)
          : null,
      startedAt: json['started_at'] != null
          ? DateTime.tryParse(json['started_at'] as String)
          : null,
      completedAt: json['completed_at'] != null
          ? DateTime.tryParse(json['completed_at'] as String)
          : null,
      cancelledAt: json['cancelled_at'] != null
          ? DateTime.tryParse(json['cancelled_at'] as String)
          : null,
      createdAt: json['created_at'] != null
          ? DateTime.parse(json['created_at'] as String)
          : DateTime.now(),
      updatedAt: json['updated_at'] != null
          ? DateTime.parse(json['updated_at'] as String)
          : DateTime.now(),
      vehicle: json['vehicle'] != null ? _parseVehicle(json['vehicle']) : null,
      clientUser: json['client_user'] != null
          ? _parseUser(json['client_user'])
          : null,
      provider: json['provider'] != null
          ? ProviderInfoModel.fromJson(json['provider'])
          : null,
      assignedTechnician: json['assigned_technician'] != null
          ? TechnicianInfoModel.fromJson(json['assigned_technician'])
          : null,
    );
  }

  // Función auxiliar para manejar nulls
  static String _toStringOrFallback(dynamic value, String fallback) {
    if (value == null) return fallback;
    return value.toString();
  }

  static Vehicle _parseVehicle(Map<String, dynamic> json) {
    return Vehicle(
      id: _toStringOrFallback(json['id'], ''),
      ownerUserId: _toStringOrFallback(json['owner_user_id'], ''),
      plateNumber: _toStringOrFallback(json['plate_number'], ''),
      vehicleType: _toStringOrFallback(json['vehicle_type'], 'CAR'),
      brand: _toStringOrFallback(json['brand'], ''),
      model: _toStringOrFallback(json['model'], ''),
      year: json['year'] as int? ?? 0,
      color: _toStringOrFallback(json['color'], ''),
      notes: json['notes'] ?? '',
      isActive: json['is_active'] as bool? ?? true,
    );
  }

  static User _parseUser(Map<String, dynamic> json) {
    return User(
      id: _toStringOrFallback(json['id'], ''),
      email: _toStringOrFallback(json['email'], ''),
      fullName: _toStringOrFallback(json['full_name'], ''),
      firstName: json['first_name'] as String?,
      lastName: json['last_name'] as String?,
      phoneNumber: json['phone_number'] as String?,
      isActive: json['is_active'] as bool? ?? true,
      isSuperuser: json['is_superuser'] as bool? ?? false,
      roleCodes: json['role_codes'] != null
          ? List<String>.from(json['role_codes'] as List)
          : [],
      createdAt: json['created_at'] != null
          ? DateTime.tryParse(json['created_at'] as String)
          : null,
      updatedAt: json['updated_at'] != null
          ? DateTime.tryParse(json['updated_at'] as String)
          : null,
    );
  }

  Incident toEntity() {
    return Incident(
      id: id,
      clientUserId: clientUserId,
      vehicleId: vehicleId,
      providerId: providerId,
      assignedTechnicianId: assignedTechnicianId,
      dispatchMode: dispatchMode,
      status: status,
      priority: priority,
      reportedCategory: reportedCategory,
      title: title,
      description: description,
      clientContactPhoneSnapshot: clientContactPhoneSnapshot,
      incidentLatitude: incidentLatitude,
      incidentLongitude: incidentLongitude,
      addressReference: addressReference,
      estimatedPriceMin: estimatedPriceMin,
      estimatedPriceMax: estimatedPriceMax,
      aiSummaryStatus: aiSummaryStatus,
      structuredSummary: structuredSummary,
      suggestedCategory: suggestedCategory,
      suggestedPriority: suggestedPriority,
      requiresMoreInformation: requiresMoreInformation,
      responderLastLatitude: responderLastLatitude,
      responderLastLongitude: responderLastLongitude,
      routeDistanceKm: routeDistanceKm,
      routeEtaMinutes: routeEtaMinutes,
      requestedAt: requestedAt,
      assignedAt: assignedAt,
      enRouteAt: enRouteAt,
      arrivedAt: arrivedAt,
      startedAt: startedAt,
      completedAt: completedAt,
      cancelledAt: cancelledAt,
      createdAt: createdAt,
      updatedAt: updatedAt,
      vehicle: vehicle,
      clientUser: clientUser,
      provider: provider?.toEntity(),
      assignedTechnician: assignedTechnician?.toEntity(),
    );
  }
}

// ProviderInfoModel y TechnicianInfoModel (sin cambios significativos)
class ProviderInfoModel {
  final String id;
  final String providerType;
  final String businessName;
  final String? contactPhone;
  final String? city;
  final bool isAvailable;
  final double averageRating;

  ProviderInfoModel({
    required this.id,
    required this.providerType,
    required this.businessName,
    this.contactPhone,
    this.city,
    required this.isAvailable,
    required this.averageRating,
  });

  factory ProviderInfoModel.fromJson(Map<String, dynamic> json) {
    return ProviderInfoModel(
      id: _toStringOrFallback(json['id'], ''),
      providerType: _toStringOrFallback(json['provider_type'], 'WORKSHOP'),
      businessName: _toStringOrFallback(json['business_name'], ''),
      contactPhone: json['contact_phone'] as String?,
      city: json['city'] as String?,
      isAvailable: json['is_available'] as bool? ?? false,
      averageRating: (json['average_rating'] as num?)?.toDouble() ?? 0.0,
    );
  }

  static String _toStringOrFallback(dynamic value, String fallback) {
    if (value == null) return fallback;
    return value.toString();
  }

  ProviderInfo toEntity() => ProviderInfo(
    id: id,
    providerType: providerType,
    businessName: businessName,
    contactPhone: contactPhone,
    city: city,
    isAvailable: isAvailable,
    averageRating: averageRating,
  );
}

class TechnicianInfoModel {
  final String id;
  final String providerId;
  final String firstName;
  final String lastName;
  final String? phoneNumber;
  final String? specialty;
  final bool isActive;
  final bool isAvailable;

  TechnicianInfoModel({
    required this.id,
    required this.providerId,
    required this.firstName,
    required this.lastName,
    this.phoneNumber,
    this.specialty,
    required this.isActive,
    required this.isAvailable,
  });

  factory TechnicianInfoModel.fromJson(Map<String, dynamic> json) {
    return TechnicianInfoModel(
      id: _toStringOrFallback(json['id'], ''),
      providerId: _toStringOrFallback(json['provider_id'], ''),
      firstName: _toStringOrFallback(json['first_name'], ''),
      lastName: _toStringOrFallback(json['last_name'], ''),
      phoneNumber: json['phone_number'] as String?,
      specialty: json['specialty'] as String?,
      isActive: json['is_active'] as bool? ?? true,
      isAvailable: json['is_available'] as bool? ?? false,
    );
  }

  static String _toStringOrFallback(dynamic value, String fallback) {
    if (value == null) return fallback;
    return value.toString();
  }

  TechnicianInfo toEntity() => TechnicianInfo(
    id: id,
    providerId: providerId,
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
    specialty: specialty,
    isActive: isActive,
    isAvailable: isAvailable,
  );
}
``

---

## mechanic_mobile/lib/infrastructure/models/provider_candidate_model.dart

``dart
import '../../domain/entities/provider_candidate.dart';

class ProviderCandidateModel {
  final String id;
  final String incidentId;
  final String providerId;
  final String status;
  final int recommendationRank;
  final double score;
  final double distanceKm;
  final List<String> requiredServiceCodes;
  final List<String> matchedServiceCodes;
  final Map<String, dynamic> rationale;
  final double providerAverageRatingSnapshot;
  final int providerAvailableCapacitySnapshot;
  final int availableTechniciansCountSnapshot;
  final DateTime publishedAt;
  final DateTime? respondedAt;
  final DateTime? expiresAt;
  final CandidateProviderModel provider;
  final CandidateIncidentModel incident;

  ProviderCandidateModel({
    required this.id,
    required this.incidentId,
    required this.providerId,
    required this.status,
    required this.recommendationRank,
    required this.score,
    required this.distanceKm,
    required this.requiredServiceCodes,
    required this.matchedServiceCodes,
    required this.rationale,
    required this.providerAverageRatingSnapshot,
    required this.providerAvailableCapacitySnapshot,
    required this.availableTechniciansCountSnapshot,
    required this.publishedAt,
    this.respondedAt,
    this.expiresAt,
    required this.provider,
    required this.incident,
  });

  factory ProviderCandidateModel.fromJson(Map<String, dynamic> json) {
    return ProviderCandidateModel(
      id: _toStringOrFallback(json['id'], ''),
      incidentId: _toStringOrFallback(json['incident_id'], ''),
      providerId: _toStringOrFallback(json['provider_id'], ''),
      status: _toStringOrFallback(json['status'], 'AVAILABLE'),
      recommendationRank: json['recommendation_rank'] as int? ?? 0,
      score: (json['score'] as num?)?.toDouble() ?? 0.0,
      distanceKm: (json['distance_km'] as num?)?.toDouble() ?? 0.0,
      requiredServiceCodes: json['required_service_codes'] != null
          ? List<String>.from(json['required_service_codes'] as List)
          : [],
      matchedServiceCodes: json['matched_service_codes'] != null
          ? List<String>.from(json['matched_service_codes'] as List)
          : [],
      rationale: json['rationale'] as Map<String, dynamic>? ?? {},
      providerAverageRatingSnapshot:
          (json['provider_average_rating_snapshot'] as num?)?.toDouble() ?? 0.0,
      providerAvailableCapacitySnapshot:
          json['provider_available_capacity_snapshot'] as int? ?? 0,
      availableTechniciansCountSnapshot:
          json['available_technicians_count_snapshot'] as int? ?? 0,
      publishedAt: DateTime.parse(json['published_at'] as String),
      respondedAt: json['responded_at'] != null
          ? DateTime.tryParse(json['responded_at'] as String)
          : null,
      expiresAt: json['expires_at'] != null
          ? DateTime.tryParse(json['expires_at'] as String)
          : null,
      provider: CandidateProviderModel.fromJson(json['provider']),
      incident: CandidateIncidentModel.fromJson(json['incident']),
    );
  }

  static String _toStringOrFallback(dynamic value, String fallback) {
    if (value == null) return fallback;
    return value.toString();
  }

  ProviderCandidate toEntity() {
    return ProviderCandidate(
      id: id,
      incidentId: incidentId,
      providerId: providerId,
      status: status,
      recommendationRank: recommendationRank,
      score: score,
      distanceKm: distanceKm,
      requiredServiceCodes: requiredServiceCodes,
      matchedServiceCodes: matchedServiceCodes,
      rationale: rationale,
      providerAverageRatingSnapshot: providerAverageRatingSnapshot,
      providerAvailableCapacitySnapshot: providerAvailableCapacitySnapshot,
      availableTechniciansCountSnapshot: availableTechniciansCountSnapshot,
      publishedAt: publishedAt,
      respondedAt: respondedAt,
      expiresAt: expiresAt,
      provider: provider.toEntity(),
      incident: incident.toEntity(),
    );
  }
}

class CandidateProviderModel {
  final String id;
  final String providerType;
  final String businessName;
  final String city;
  final String? contactPhone;
  final double averageRating;
  final int availableCapacity;
  final int availableTechniciansCount;
  final double baseLatitude;
  final double baseLongitude;
  final CandidateProviderOwnerUserModel ownerUser;
  final List<CandidateMatchedServiceModel> matchedServices;

  CandidateProviderModel({
    required this.id,
    required this.providerType,
    required this.businessName,
    required this.city,
    this.contactPhone,
    required this.averageRating,
    required this.availableCapacity,
    required this.availableTechniciansCount,
    required this.baseLatitude,
    required this.baseLongitude,
    required this.ownerUser,
    required this.matchedServices,
  });

  factory CandidateProviderModel.fromJson(Map<String, dynamic> json) {
    return CandidateProviderModel(
      id: _toStringOrFallback(json['id'], ''),
      providerType: _toStringOrFallback(json['provider_type'], 'WORKSHOP'),
      businessName: _toStringOrFallback(json['business_name'], ''),
      city: _toStringOrFallback(json['city'], ''),
      contactPhone: json['contact_phone'] as String?,
      averageRating: (json['average_rating'] as num?)?.toDouble() ?? 0.0,
      availableCapacity: json['available_capacity'] as int? ?? 0,
      availableTechniciansCount:
          json['available_technicians_count'] as int? ?? 0,
      baseLatitude: (json['base_latitude'] as num?)?.toDouble() ?? 0.0,
      baseLongitude: (json['base_longitude'] as num?)?.toDouble() ?? 0.0,
      ownerUser: CandidateProviderOwnerUserModel.fromJson(json['owner_user']),
      matchedServices:
          (json['matched_services'] as List<dynamic>?)
              ?.map((e) => CandidateMatchedServiceModel.fromJson(e))
              .toList() ??
          [],
    );
  }

  static String _toStringOrFallback(dynamic value, String fallback) {
    if (value == null) return fallback;
    return value.toString();
  }

  CandidateProvider toEntity() {
    return CandidateProvider(
      id: id,
      providerType: providerType,
      businessName: businessName,
      city: city,
      contactPhone: contactPhone,
      averageRating: averageRating,
      availableCapacity: availableCapacity,
      availableTechniciansCount: availableTechniciansCount,
      baseLatitude: baseLatitude,
      baseLongitude: baseLongitude,
      ownerUser: ownerUser.toEntity(),
      matchedServices: matchedServices.map((s) => s.toEntity()).toList(),
    );
  }
}

class CandidateProviderOwnerUserModel {
  final String id;
  final String email;
  final String firstName;
  final String lastName;
  final String fullName;
  final String phoneNumber;

  CandidateProviderOwnerUserModel({
    required this.id,
    required this.email,
    required this.firstName,
    required this.lastName,
    required this.fullName,
    required this.phoneNumber,
  });

  factory CandidateProviderOwnerUserModel.fromJson(Map<String, dynamic> json) {
    return CandidateProviderOwnerUserModel(
      id: _toStringOrFallback(json['id'], ''),
      email: _toStringOrFallback(json['email'], ''),
      firstName: _toStringOrFallback(json['first_name'], ''),
      lastName: _toStringOrFallback(json['last_name'], ''),
      fullName: _toStringOrFallback(json['full_name'], ''),
      phoneNumber: _toStringOrFallback(json['phone_number'], ''),
    );
  }

  static String _toStringOrFallback(dynamic value, String fallback) {
    if (value == null) return fallback;
    return value.toString();
  }

  CandidateProviderOwnerUser toEntity() {
    return CandidateProviderOwnerUser(
      id: id,
      email: email,
      firstName: firstName,
      lastName: lastName,
      fullName: fullName,
      phoneNumber: phoneNumber,
    );
  }
}

class CandidateMatchedServiceModel {
  final String code;
  final String category;
  final String title;

  CandidateMatchedServiceModel({
    required this.code,
    required this.category,
    required this.title,
  });

  factory CandidateMatchedServiceModel.fromJson(Map<String, dynamic> json) {
    return CandidateMatchedServiceModel(
      code: _toStringOrFallback(json['code'], ''),
      category: _toStringOrFallback(json['category'], ''),
      title: _toStringOrFallback(json['title'], ''),
    );
  }

  static String _toStringOrFallback(dynamic value, String fallback) {
    if (value == null) return fallback;
    return value.toString();
  }

  CandidateMatchedService toEntity() {
    return CandidateMatchedService(
      code: code,
      category: category,
      title: title,
    );
  }
}

class CandidateIncidentModel {
  final String id;
  final String status;
  final String priority;
  final String reportedCategory;
  final String title;
  final String description;
  final double incidentLatitude;
  final double incidentLongitude;
  final String addressReference;
  final String aiSummaryStatus;
  final String? structuredSummary;
  final String? suggestedCategory;
  final String? suggestedPriority;
  final bool requiresMoreInformation;

  CandidateIncidentModel({
    required this.id,
    required this.status,
    required this.priority,
    required this.reportedCategory,
    required this.title,
    required this.description,
    required this.incidentLatitude,
    required this.incidentLongitude,
    required this.addressReference,
    required this.aiSummaryStatus,
    this.structuredSummary,
    this.suggestedCategory,
    this.suggestedPriority,
    required this.requiresMoreInformation,
  });

  factory CandidateIncidentModel.fromJson(Map<String, dynamic> json) {
    return CandidateIncidentModel(
      id: _toStringOrFallback(json['id'], ''),
      status: _toStringOrFallback(json['status'], 'PENDING'),
      priority: _toStringOrFallback(json['priority'], 'MEDIUM'),
      reportedCategory: _toStringOrFallback(json['reported_category'], 'OTHER'),
      title: _toStringOrFallback(json['title'], ''),
      description: _toStringOrFallback(json['description'], ''),
      incidentLatitude: (json['incident_latitude'] as num?)?.toDouble() ?? 0.0,
      incidentLongitude:
          (json['incident_longitude'] as num?)?.toDouble() ?? 0.0,
      addressReference: _toStringOrFallback(json['address_reference'], ''),
      aiSummaryStatus: _toStringOrFallback(
        json['ai_summary_status'],
        'NOT_REQUESTED',
      ),
      structuredSummary: json['structured_summary'] as String?,
      suggestedCategory: json['suggested_category'] as String?,
      suggestedPriority: json['suggested_priority'] as String?,
      requiresMoreInformation:
          json['requires_more_information'] as bool? ?? false,
    );
  }

  static String _toStringOrFallback(dynamic value, String fallback) {
    if (value == null) return fallback;
    return value.toString();
  }

  CandidateIncident toEntity() {
    return CandidateIncident(
      id: id,
      status: status,
      priority: priority,
      reportedCategory: reportedCategory,
      title: title,
      description: description,
      incidentLatitude: incidentLatitude,
      incidentLongitude: incidentLongitude,
      addressReference: addressReference,
      aiSummaryStatus: aiSummaryStatus,
      structuredSummary: structuredSummary,
      suggestedCategory: suggestedCategory,
      suggestedPriority: suggestedPriority,
      requiresMoreInformation: requiresMoreInformation,
    );
  }
}
``

---

## mechanic_mobile/lib/infrastructure/models/provider_operation_model.dart

``dart
import '../../domain/entities/provider_operation.dart';
import '../../domain/entities/user.dart';
import '../../domain/entities/technician.dart';

class ProviderOperationModel {
  final String incidentId;
  final String providerId;
  final String? assignedTechnicianId;
  final String? dispatchMode;
  final String status;
  final String priority;
  final String reportedCategory;
  final String title;
  final String description;
  final String? clientContactPhoneSnapshot;
  final double? incidentLatitude;
  final double? incidentLongitude;
  final String? addressReference;
  final String? aiSummaryStatus;
  final String? structuredSummary;
  final String? suggestedCategory;
  final String? suggestedPriority;
  final bool requiresMoreInformation;
  final DateTime? assignedAt;
  final DateTime? enRouteAt;
  final DateTime? arrivedAt;
  final DateTime? startedAt;
  final DateTime? completedAt;
  final DateTime? cancelledAt;
  final User? clientUser;
  final Technician? assignedTechnician;

  ProviderOperationModel({
    required this.incidentId,
    required this.providerId,
    this.assignedTechnicianId,
    this.dispatchMode,
    required this.status,
    required this.priority,
    required this.reportedCategory,
    required this.title,
    required this.description,
    this.clientContactPhoneSnapshot,
    this.incidentLatitude,
    this.incidentLongitude,
    this.addressReference,
    this.aiSummaryStatus,
    this.structuredSummary,
    this.suggestedCategory,
    this.suggestedPriority,
    required this.requiresMoreInformation,
    this.assignedAt,
    this.enRouteAt,
    this.arrivedAt,
    this.startedAt,
    this.completedAt,
    this.cancelledAt,
    this.clientUser,
    this.assignedTechnician,
  });

  factory ProviderOperationModel.fromJson(Map<String, dynamic> json) {
    return ProviderOperationModel(
      incidentId: _toStringOrFallback(json['incident_id'], ''),
      providerId: _toStringOrFallback(json['provider_id'], ''),
      assignedTechnicianId: json['assigned_technician_id'] as String?,
      dispatchMode: json['dispatch_mode'] as String?,
      status: _toStringOrFallback(json['status'], 'ASSIGNED'),
      priority: _toStringOrFallback(json['priority'], 'MEDIUM'),
      reportedCategory: _toStringOrFallback(json['reported_category'], 'OTHER'),
      title: _toStringOrFallback(json['title'], ''),
      description: _toStringOrFallback(json['description'], ''),
      clientContactPhoneSnapshot:
          json['client_contact_phone_snapshot'] as String?,
      incidentLatitude: (json['incident_latitude'] as num?)?.toDouble(),
      incidentLongitude: (json['incident_longitude'] as num?)?.toDouble(),
      addressReference: json['address_reference'] as String?,
      aiSummaryStatus: json['ai_summary_status'] as String?,
      structuredSummary: json['structured_summary'] as String?,
      suggestedCategory: json['suggested_category'] as String?,
      suggestedPriority: json['suggested_priority'] as String?,
      requiresMoreInformation:
          json['requires_more_information'] as bool? ?? false,
      assignedAt: json['assigned_at'] != null
          ? DateTime.tryParse(json['assigned_at'] as String)
          : null,
      enRouteAt: json['en_route_at'] != null
          ? DateTime.tryParse(json['en_route_at'] as String)
          : null,
      arrivedAt: json['arrived_at'] != null
          ? DateTime.tryParse(json['arrived_at'] as String)
          : null,
      startedAt: json['started_at'] != null
          ? DateTime.tryParse(json['started_at'] as String)
          : null,
      completedAt: json['completed_at'] != null
          ? DateTime.tryParse(json['completed_at'] as String)
          : null,
      cancelledAt: json['cancelled_at'] != null
          ? DateTime.tryParse(json['cancelled_at'] as String)
          : null,
      clientUser: json['client_user'] != null
          ? _parseUser(json['client_user'])
          : null,
      assignedTechnician: json['assigned_technician'] != null
          ? _parseTechnician(json['assigned_technician'])
          : null,
    );
  }

  static String _toStringOrFallback(dynamic value, String fallback) {
    if (value == null) return fallback;
    return value.toString();
  }

  static User _parseUser(Map<String, dynamic> json) {
    return User(
      id: _toStringOrFallback(json['id'], ''),
      email: _toStringOrFallback(json['email'], ''),
      fullName: _toStringOrFallback(json['full_name'], ''),
      firstName: json['first_name'] as String?,
      lastName: json['last_name'] as String?,
      phoneNumber: json['phone_number'] as String?,
      isActive: json['is_active'] as bool? ?? true,
      isSuperuser: json['is_superuser'] as bool? ?? false,
      roleCodes: [],
    );
  }

  static Technician _parseTechnician(Map<String, dynamic> json) {
    return Technician(
      id: _toStringOrFallback(json['id'], ''),
      firstName: _toStringOrFallback(json['first_name'], ''),
      lastName: _toStringOrFallback(json['last_name'], ''),
      phoneNumber: _toStringOrFallback(json['phone_number'], ''),
      specialty: json['specialty'] as String? ?? '',
      isAvailable: json['is_available'] as bool? ?? false,
      currentLatitude: (json['current_latitude'] as num?)?.toDouble(),
      currentLongitude: (json['current_longitude'] as num?)?.toDouble(),
    );
  }

  ProviderOperation toEntity() {
    return ProviderOperation(
      incidentId: incidentId,
      providerId: providerId,
      assignedTechnicianId: assignedTechnicianId,
      dispatchMode: dispatchMode,
      status: status,
      priority: priority,
      reportedCategory: reportedCategory,
      title: title,
      description: description,
      clientContactPhoneSnapshot: clientContactPhoneSnapshot,
      incidentLatitude: incidentLatitude,
      incidentLongitude: incidentLongitude,
      addressReference: addressReference,
      aiSummaryStatus: aiSummaryStatus,
      structuredSummary: structuredSummary,
      suggestedCategory: suggestedCategory,
      suggestedPriority: suggestedPriority,
      requiresMoreInformation: requiresMoreInformation,
      assignedAt: assignedAt,
      enRouteAt: enRouteAt,
      arrivedAt: arrivedAt,
      startedAt: startedAt,
      completedAt: completedAt,
      cancelledAt: cancelledAt,
      clientUser: clientUser,
      assignedTechnician: assignedTechnician,
    );
  }
}
``

---

## mechanic_mobile/lib/infrastructure/models/provider_profile_model.dart

``dart
import '../../domain/entities/provider_profile.dart';
import '../../domain/entities/user.dart';

class ProviderProfileModel {
  final String id;
  final String ownerUserId;
  final String providerType;
  final String businessName;
  final String? legalName;
  final String? description;
  final String? contactEmail;
  final String? contactPhone;
  final String? city;
  final String? address;
  final double? baseLatitude;
  final double? baseLongitude;
  final bool isActive;
  final bool isAvailable;
  final int maxConcurrentServices;
  final int currentActiveServices;
  final int availableCapacity;
  final double averageRating;
  final User? ownerUser;
  final int techniciansCount;
  final int availableTechniciansCount;
  final int configuredServicesCount;
  final int activeServicesCount;
  final List<ProviderServiceModel> activeServices;
  final DateTime createdAt;
  final DateTime updatedAt;

  ProviderProfileModel({
    required this.id,
    required this.ownerUserId,
    required this.providerType,
    required this.businessName,
    this.legalName,
    this.description,
    this.contactEmail,
    this.contactPhone,
    this.city,
    this.address,
    this.baseLatitude,
    this.baseLongitude,
    required this.isActive,
    required this.isAvailable,
    required this.maxConcurrentServices,
    required this.currentActiveServices,
    required this.availableCapacity,
    required this.averageRating,
    this.ownerUser,
    required this.techniciansCount,
    required this.availableTechniciansCount,
    required this.configuredServicesCount,
    required this.activeServicesCount,
    required this.activeServices,
    required this.createdAt,
    required this.updatedAt,
  });

  factory ProviderProfileModel.fromJson(Map<String, dynamic> json) {
    return ProviderProfileModel(
      id: json['id'] as String,
      ownerUserId: json['owner_user_id'] as String,
      providerType: json['provider_type'] as String,
      businessName: json['business_name'] as String,
      legalName: json['legal_name'] as String?,
      description: json['description'] as String?,
      contactEmail: json['contact_email'] as String?,
      contactPhone: json['contact_phone'] as String?,
      city: json['city'] as String?,
      address: json['address'] as String?,
      baseLatitude: (json['base_latitude'] as num?)?.toDouble(),
      baseLongitude: (json['base_longitude'] as num?)?.toDouble(),
      isActive: json['is_active'] as bool? ?? true,
      isAvailable: json['is_available'] as bool? ?? true,
      maxConcurrentServices: json['max_concurrent_services'] as int? ?? 1,
      currentActiveServices: json['current_active_services'] as int? ?? 0,
      availableCapacity: json['available_capacity'] as int? ?? 0,
      averageRating: (json['average_rating'] as num?)?.toDouble() ?? 0.0,
      ownerUser: json['owner_user'] != null
          ? _parseUser(json['owner_user'])
          : null,
      techniciansCount: json['technicians_count'] as int? ?? 0,
      availableTechniciansCount:
          json['available_technicians_count'] as int? ?? 0,
      configuredServicesCount: json['configured_services_count'] as int? ?? 0,
      activeServicesCount: json['active_services_count'] as int? ?? 0,
      activeServices:
          (json['active_services'] as List<dynamic>?)
              ?.map((e) => ProviderServiceModel.fromJson(e))
              .toList() ??
          [],
      createdAt: DateTime.parse(json['created_at'] as String),
      updatedAt: DateTime.parse(json['updated_at'] as String),
    );
  }

  static User _parseUser(Map<String, dynamic> json) {
    return User(
      id: json['id'] as String,
      email: json['email'] as String,
      fullName: json['full_name'] as String? ?? '',
      firstName: json['first_name'] as String?,
      lastName: json['last_name'] as String?,
      phoneNumber: json['phone_number'] as String?,
      roleCodes: [],
    );
  }

  ProviderProfile toEntity() {
    return ProviderProfile(
      id: id,
      ownerUserId: ownerUserId,
      providerType: providerType,
      businessName: businessName,
      legalName: legalName,
      description: description,
      contactEmail: contactEmail,
      contactPhone: contactPhone,
      city: city,
      address: address,
      baseLatitude: baseLatitude,
      baseLongitude: baseLongitude,
      isActive: isActive,
      isAvailable: isAvailable,
      maxConcurrentServices: maxConcurrentServices,
      currentActiveServices: currentActiveServices,
      availableCapacity: availableCapacity,
      averageRating: averageRating,
      ownerUser: ownerUser,
      techniciansCount: techniciansCount,
      availableTechniciansCount: availableTechniciansCount,
      configuredServicesCount: configuredServicesCount,
      activeServicesCount: activeServicesCount,
      activeServices: activeServices.map((s) => s.toEntity()).toList(),
      createdAt: createdAt,
      updatedAt: updatedAt,
    );
  }
}

class ProviderServiceModel {
  final String id;
  final String serviceCatalogItemId;
  final String code;
  final String category;
  final String title;
  final double priceEstimateMin;
  final double priceEstimateMax;
  final int estimatedDurationMinutes;
  final bool isMobileServiceEnabled;
  final bool isEmergencyServiceEnabled;
  final bool isActive;

  ProviderServiceModel({
    required this.id,
    required this.serviceCatalogItemId,
    required this.code,
    required this.category,
    required this.title,
    required this.priceEstimateMin,
    required this.priceEstimateMax,
    required this.estimatedDurationMinutes,
    required this.isMobileServiceEnabled,
    required this.isEmergencyServiceEnabled,
    required this.isActive,
  });

  factory ProviderServiceModel.fromJson(Map<String, dynamic> json) {
    return ProviderServiceModel(
      id: json['id'] as String,
      serviceCatalogItemId: json['service_catalog_item_id'] as String,
      code: json['code'] as String,
      category: json['category'] as String,
      title: json['title'] as String,
      priceEstimateMin: (json['price_estimate_min'] as num?)?.toDouble() ?? 0.0,
      priceEstimateMax: (json['price_estimate_max'] as num?)?.toDouble() ?? 0.0,
      estimatedDurationMinutes: json['estimated_duration_minutes'] as int? ?? 0,
      isMobileServiceEnabled:
          json['is_mobile_service_enabled'] as bool? ?? false,
      isEmergencyServiceEnabled:
          json['is_emergency_service_enabled'] as bool? ?? false,
      isActive: json['is_active'] as bool? ?? true,
    );
  }

  ProviderService toEntity() {
    return ProviderService(
      id: id,
      serviceCatalogItemId: serviceCatalogItemId,
      code: code,
      category: category,
      title: title,
      priceEstimateMin: priceEstimateMin,
      priceEstimateMax: priceEstimateMax,
      estimatedDurationMinutes: estimatedDurationMinutes,
      isMobileServiceEnabled: isMobileServiceEnabled,
      isEmergencyServiceEnabled: isEmergencyServiceEnabled,
      isActive: isActive,
    );
  }
}
``

---

## mechanic_mobile/lib/infrastructure/models/provider_summary_model.dart

``dart
import '../../domain/entities/provider_summary.dart';
import '../../domain/entities/user.dart';

class ProviderSummaryModel {
  final String id;
  final String ownerUserId;
  final String providerType;
  final String businessName;
  final String? legalName;
  final String? description;
  final String? contactEmail;
  final String? contactPhone;
  final String? city;
  final String? address;
  final double? baseLatitude;
  final double? baseLongitude;
  final bool isActive;
  final bool isAvailable;
  final int maxConcurrentServices;
  final int currentActiveServices;
  final int availableCapacity;
  final double averageRating;
  final User? ownerUser;
  final int techniciansCount;
  final int availableTechniciansCount;
  final int configuredServicesCount;
  final int activeServicesCount;
  final List<ProviderServiceSummaryModel> activeServices;
  final DateTime createdAt;
  final DateTime updatedAt;

  ProviderSummaryModel({
    required this.id,
    required this.ownerUserId,
    required this.providerType,
    required this.businessName,
    this.legalName,
    this.description,
    this.contactEmail,
    this.contactPhone,
    this.city,
    this.address,
    this.baseLatitude,
    this.baseLongitude,
    required this.isActive,
    required this.isAvailable,
    required this.maxConcurrentServices,
    required this.currentActiveServices,
    required this.availableCapacity,
    required this.averageRating,
    this.ownerUser,
    required this.techniciansCount,
    required this.availableTechniciansCount,
    required this.configuredServicesCount,
    required this.activeServicesCount,
    required this.activeServices,
    required this.createdAt,
    required this.updatedAt,
  });

  factory ProviderSummaryModel.fromJson(Map<String, dynamic> json) {
    return ProviderSummaryModel(
      id: _toStringOrFallback(json['id'], ''),
      ownerUserId: _toStringOrFallback(json['owner_user_id'], ''),
      providerType: _toStringOrFallback(json['provider_type'], 'WORKSHOP'),
      businessName: _toStringOrFallback(json['business_name'], ''),
      legalName: json['legal_name'] as String?,
      description: json['description'] as String?,
      contactEmail: json['contact_email'] as String?,
      contactPhone: json['contact_phone'] as String?,
      city: json['city'] as String?,
      address: json['address'] as String?,
      baseLatitude: (json['base_latitude'] as num?)?.toDouble(),
      baseLongitude: (json['base_longitude'] as num?)?.toDouble(),
      isActive: json['is_active'] as bool? ?? true,
      isAvailable: json['is_available'] as bool? ?? true,
      maxConcurrentServices: json['max_concurrent_services'] as int? ?? 1,
      currentActiveServices: json['current_active_services'] as int? ?? 0,
      availableCapacity: json['available_capacity'] as int? ?? 0,
      averageRating: (json['average_rating'] as num?)?.toDouble() ?? 0.0,
      ownerUser: json['owner_user'] != null
          ? _parseUser(json['owner_user'])
          : null,
      techniciansCount: json['technicians_count'] as int? ?? 0,
      availableTechniciansCount:
          json['available_technicians_count'] as int? ?? 0,
      configuredServicesCount: json['configured_services_count'] as int? ?? 0,
      activeServicesCount: json['active_services_count'] as int? ?? 0,
      activeServices:
          (json['active_services'] as List<dynamic>?)
              ?.map((e) => ProviderServiceSummaryModel.fromJson(e))
              .toList() ??
          [],
      createdAt: DateTime.parse(json['created_at'] as String),
      updatedAt: DateTime.parse(json['updated_at'] as String),
    );
  }

  static String _toStringOrFallback(dynamic value, String fallback) {
    if (value == null) return fallback;
    return value.toString();
  }

  static User _parseUser(Map<String, dynamic> json) {
    return User(
      id: _toStringOrFallback(json['id'], ''),
      email: _toStringOrFallback(json['email'], ''),
      fullName: _toStringOrFallback(json['full_name'], ''),
      firstName: json['first_name'] as String?,
      lastName: json['last_name'] as String?,
      phoneNumber: json['phone_number'] as String?,
      isActive: json['is_active'] as bool? ?? true,
      isSuperuser: json['is_superuser'] as bool? ?? false,
      roleCodes: [],
    );
  }

  ProviderSummary toEntity() {
    return ProviderSummary(
      id: id,
      ownerUserId: ownerUserId,
      providerType: providerType,
      businessName: businessName,
      legalName: legalName,
      description: description,
      contactEmail: contactEmail,
      contactPhone: contactPhone,
      city: city,
      address: address,
      baseLatitude: baseLatitude,
      baseLongitude: baseLongitude,
      isActive: isActive,
      isAvailable: isAvailable,
      maxConcurrentServices: maxConcurrentServices,
      currentActiveServices: currentActiveServices,
      availableCapacity: availableCapacity,
      averageRating: averageRating,
      ownerUser: ownerUser,
      techniciansCount: techniciansCount,
      availableTechniciansCount: availableTechniciansCount,
      configuredServicesCount: configuredServicesCount,
      activeServicesCount: activeServicesCount,
      activeServices: activeServices.map((s) => s.toEntity()).toList(),
      createdAt: createdAt,
      updatedAt: updatedAt,
    );
  }
}

class ProviderServiceSummaryModel {
  final String id;
  final String serviceCatalogItemId;
  final String code;
  final String category;
  final String title;
  final double priceEstimateMin;
  final double priceEstimateMax;
  final int estimatedDurationMinutes;
  final bool isMobileServiceEnabled;
  final bool isEmergencyServiceEnabled;
  final bool isActive;

  ProviderServiceSummaryModel({
    required this.id,
    required this.serviceCatalogItemId,
    required this.code,
    required this.category,
    required this.title,
    required this.priceEstimateMin,
    required this.priceEstimateMax,
    required this.estimatedDurationMinutes,
    required this.isMobileServiceEnabled,
    required this.isEmergencyServiceEnabled,
    required this.isActive,
  });

  factory ProviderServiceSummaryModel.fromJson(Map<String, dynamic> json) {
    return ProviderServiceSummaryModel(
      id: _toStringOrFallback(json['id'], ''),
      serviceCatalogItemId: _toStringOrFallback(
        json['service_catalog_item_id'],
        '',
      ),
      code: _toStringOrFallback(json['code'], ''),
      category: _toStringOrFallback(json['category'], ''),
      title: _toStringOrFallback(json['title'], ''),
      priceEstimateMin: (json['price_estimate_min'] as num?)?.toDouble() ?? 0.0,
      priceEstimateMax: (json['price_estimate_max'] as num?)?.toDouble() ?? 0.0,
      estimatedDurationMinutes: json['estimated_duration_minutes'] as int? ?? 0,
      isMobileServiceEnabled:
          json['is_mobile_service_enabled'] as bool? ?? false,
      isEmergencyServiceEnabled:
          json['is_emergency_service_enabled'] as bool? ?? false,
      isActive: json['is_active'] as bool? ?? true,
    );
  }

  static String _toStringOrFallback(dynamic value, String fallback) {
    if (value == null) return fallback;
    return value.toString();
  }

  ProviderServiceSummary toEntity() {
    return ProviderServiceSummary(
      id: id,
      serviceCatalogItemId: serviceCatalogItemId,
      code: code,
      category: category,
      title: title,
      priceEstimateMin: priceEstimateMin,
      priceEstimateMax: priceEstimateMax,
      estimatedDurationMinutes: estimatedDurationMinutes,
      isMobileServiceEnabled: isMobileServiceEnabled,
      isEmergencyServiceEnabled: isEmergencyServiceEnabled,
      isActive: isActive,
    );
  }
}
``

---

## mechanic_mobile/lib/infrastructure/models/service_request_model.dart

``dart
import '../../domain/entities/service_request.dart';

class ServiceRequestModel extends ServiceRequest {
  ServiceRequestModel({
    required super.id,
    required super.description,
    required super.mechanicName,
    required super.mechanicPhone,
    required super.vehicleDetails,
    required super.address,
    required super.paymentMethod,
    required super.totalCost,
    required super.status,
    required super.date,
  });

  factory ServiceRequestModel.fromJson(Map<String, dynamic> json) {
    return ServiceRequestModel(
      id: json['id'],
      description: json['description'],
      mechanicName: json['mechanicName'],
      mechanicPhone: json['mechanicPhone'],
      vehicleDetails: json['vehicleDetails'],
      address: json['address'],
      paymentMethod: json['paymentMethod'],
      totalCost: (json['totalCost'] as num).toDouble(),
      status: json['status'],
      date: DateTime.parse(json['date']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'description': description,
      'mechanicName': mechanicName,
      'mechanicPhone': mechanicPhone,
      'vehicleDetails': vehicleDetails,
      'address': address,
      'paymentMethod': paymentMethod,
      'totalCost': totalCost,
      'status': status,
      'date': date.toIso8601String(),
    };
  }
}
``

---

## mechanic_mobile/lib/infrastructure/models/technician_model.dart

``dart
import '../../domain/entities/technician.dart';

class TechnicianModel {
  final String id;
  final String firstName;
  final String lastName;
  final String phoneNumber;
  final String specialty;
  final bool isAvailable;
  final double? currentLatitude;
  final double? currentLongitude;
  final DateTime? createdAt;
  final DateTime? updatedAt;

  TechnicianModel({
    required this.id,
    required this.firstName,
    required this.lastName,
    required this.phoneNumber,
    required this.specialty,
    required this.isAvailable,
    this.currentLatitude,
    this.currentLongitude,
    this.createdAt,
    this.updatedAt,
  });

  factory TechnicianModel.fromJson(Map<String, dynamic> json) {
    return TechnicianModel(
      id: json['id'] as String,
      firstName: json['first_name'] as String,
      lastName: json['last_name'] as String,
      phoneNumber: json['phone_number'] as String,
      specialty: json['specialty'] as String? ?? '',
      isAvailable: json['is_available'] as bool? ?? false,
      currentLatitude: (json['current_latitude'] as num?)?.toDouble(),
      currentLongitude: (json['current_longitude'] as num?)?.toDouble(),
      createdAt: json['created_at'] != null
          ? DateTime.parse(json['created_at'] as String)
          : null,
      updatedAt: json['updated_at'] != null
          ? DateTime.parse(json['updated_at'] as String)
          : null,
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'first_name': firstName,
    'last_name': lastName,
    'phone_number': phoneNumber,
    'specialty': specialty,
    'is_available': isAvailable,
    if (currentLatitude != null) 'current_latitude': currentLatitude,
    if (currentLongitude != null) 'current_longitude': currentLongitude,
    if (createdAt != null) 'created_at': createdAt?.toIso8601String(),
    if (updatedAt != null) 'updated_at': updatedAt?.toIso8601String(),
  };

  Technician toEntity() => Technician(
    id: id,
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
    specialty: specialty,
    isAvailable: isAvailable,
    currentLatitude: currentLatitude,
    currentLongitude: currentLongitude,
    createdAt: createdAt,
    updatedAt: updatedAt,
  );

  static TechnicianModel fromEntity(Technician entity) => TechnicianModel(
    id: entity.id,
    firstName: entity.firstName,
    lastName: entity.lastName,
    phoneNumber: entity.phoneNumber,
    specialty: entity.specialty,
    isAvailable: entity.isAvailable,
    currentLatitude: entity.currentLatitude,
    currentLongitude: entity.currentLongitude,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  );
}
``

---

## mechanic_mobile/lib/infrastructure/models/tracking_model.dart

``dart
import 'package:mechanic_mobile/domain/entities/admin_incident.dart';

import '../../domain/entities/tracking.dart';
import '../../domain/entities/user.dart';
import '../../domain/entities/technician.dart';

class TrackingDataModel {
  final String incidentId;
  final String status;
  final String priority;
  final String title;
  final String description;
  final String? addressReference;
  final double? incidentLatitude;
  final double? incidentLongitude;
  final DateTime? assignedAt;
  final DateTime? enRouteAt;
  final DateTime? arrivedAt;
  final DateTime? startedAt;
  final DateTime? completedAt;
  final DateTime? cancelledAt;
  final ProviderInfoModel? provider;
  final Technician? assignedTechnician;
  final User? clientUser;
  final ResponderPositionModel? responderPosition;
  final RouteInfoModel? route;

  TrackingDataModel({
    required this.incidentId,
    required this.status,
    required this.priority,
    required this.title,
    required this.description,
    this.addressReference,
    this.incidentLatitude,
    this.incidentLongitude,
    this.assignedAt,
    this.enRouteAt,
    this.arrivedAt,
    this.startedAt,
    this.completedAt,
    this.cancelledAt,
    this.provider,
    this.assignedTechnician,
    this.clientUser,
    this.responderPosition,
    this.route,
  });

  factory TrackingDataModel.fromJson(Map<String, dynamic> json) {
    return TrackingDataModel(
      incidentId: _toStringOrFallback(json['incident_id'], ''),
      status: _toStringOrFallback(json['status'], ''),
      priority: _toStringOrFallback(json['priority'], 'MEDIUM'),
      title: _toStringOrFallback(json['title'], ''),
      description: _toStringOrFallback(json['description'], ''),
      addressReference: json['address_reference'] as String?,
      incidentLatitude: (json['incident_latitude'] as num?)?.toDouble(),
      incidentLongitude: (json['incident_longitude'] as num?)?.toDouble(),
      assignedAt: json['assigned_at'] != null
          ? DateTime.tryParse(json['assigned_at'] as String)
          : null,
      enRouteAt: json['en_route_at'] != null
          ? DateTime.tryParse(json['en_route_at'] as String)
          : null,
      arrivedAt: json['arrived_at'] != null
          ? DateTime.tryParse(json['arrived_at'] as String)
          : null,
      startedAt: json['started_at'] != null
          ? DateTime.tryParse(json['started_at'] as String)
          : null,
      completedAt: json['completed_at'] != null
          ? DateTime.tryParse(json['completed_at'] as String)
          : null,
      cancelledAt: json['cancelled_at'] != null
          ? DateTime.tryParse(json['cancelled_at'] as String)
          : null,
      provider: json['provider'] != null
          ? ProviderInfoModel.fromJson(json['provider'])
          : null,
      assignedTechnician: json['assigned_technician'] != null
          ? _parseTechnician(json['assigned_technician'])
          : null,
      clientUser: json['client_user'] != null
          ? _parseUser(json['client_user'])
          : null,
      responderPosition: json['responder_position'] != null
          ? ResponderPositionModel.fromJson(json['responder_position'])
          : null,
      route: json['route'] != null
          ? RouteInfoModel.fromJson(json['route'])
          : null,
    );
  }

  static String _toStringOrFallback(dynamic value, String fallback) {
    if (value == null) return fallback;
    return value.toString();
  }

  static Technician _parseTechnician(Map<String, dynamic> json) {
    return Technician(
      id: _toStringOrFallback(json['id'], ''),
      firstName: _toStringOrFallback(json['first_name'], ''),
      lastName: _toStringOrFallback(json['last_name'], ''),
      phoneNumber: _toStringOrFallback(json['phone_number'], ''),
      specialty: json['specialty'] as String? ?? '',
      isAvailable: json['is_available'] as bool? ?? false,
      currentLatitude: (json['current_latitude'] as num?)?.toDouble(),
      currentLongitude: (json['current_longitude'] as num?)?.toDouble(),
    );
  }

  static User _parseUser(Map<String, dynamic> json) {
    return User(
      id: _toStringOrFallback(json['id'], ''),
      email: _toStringOrFallback(json['email'], ''),
      fullName: _toStringOrFallback(json['full_name'], ''),
      firstName: json['first_name'] as String?,
      lastName: json['last_name'] as String?,
      phoneNumber: json['phone_number'] as String?,
      isActive: json['is_active'] as bool? ?? true,
      isSuperuser: json['is_superuser'] as bool? ?? false,
      roleCodes: [],
    );
  }

  TrackingData toEntity() {
    return TrackingData(
      incidentId: incidentId,
      status: status,
      priority: priority,
      title: title,
      description: description,
      addressReference: addressReference,
      incidentLatitude: incidentLatitude,
      incidentLongitude: incidentLongitude,
      assignedAt: assignedAt,
      enRouteAt: enRouteAt,
      arrivedAt: arrivedAt,
      startedAt: startedAt,
      completedAt: completedAt,
      cancelledAt: cancelledAt,
      provider: provider?.toEntity(),
      assignedTechnician: assignedTechnician,
      clientUser: clientUser,
      responderPosition: responderPosition?.toEntity(),
      route: route?.toEntity(),
    );
  }
}

class ProviderInfoModel {
  final String id;
  final String providerType;
  final String businessName;
  final String? contactPhone;
  final String? city;
  final double averageRating;

  ProviderInfoModel({
    required this.id,
    required this.providerType,
    required this.businessName,
    this.contactPhone,
    this.city,
    required this.averageRating,
  });

  factory ProviderInfoModel.fromJson(Map<String, dynamic> json) {
    return ProviderInfoModel(
      id: _toStringOrFallback(json['id'], ''),
      providerType: _toStringOrFallback(json['provider_type'], 'WORKSHOP'),
      businessName: _toStringOrFallback(json['business_name'], ''),
      contactPhone: json['contact_phone'] as String?,
      city: json['city'] as String?,
      averageRating: (json['average_rating'] as num?)?.toDouble() ?? 0.0,
    );
  }

  static String _toStringOrFallback(dynamic value, String fallback) {
    if (value == null) return fallback;
    return value.toString();
  }

  ProviderInfo toEntity() => ProviderInfo(
    id: id,
    providerType: providerType,
    businessName: businessName,
    contactPhone: contactPhone,
    city: city,
    isAvailable: true,
    averageRating: averageRating,
  );
}

class ResponderPositionModel {
  final double latitude;
  final double longitude;
  final String sourceType;
  final DateTime recordedAt;

  ResponderPositionModel({
    required this.latitude,
    required this.longitude,
    required this.sourceType,
    required this.recordedAt,
  });

  factory ResponderPositionModel.fromJson(Map<String, dynamic> json) {
    return ResponderPositionModel(
      latitude: (json['latitude'] as num?)?.toDouble() ?? 0.0,
      longitude: (json['longitude'] as num?)?.toDouble() ?? 0.0,
      sourceType: _toStringOrFallback(json['source_type'], 'UNKNOWN'),
      recordedAt: json['recorded_at'] != null
          ? DateTime.parse(json['recorded_at'] as String)
          : DateTime.now(),
    );
  }

  static String _toStringOrFallback(dynamic value, String fallback) {
    if (value == null) return fallback;
    return value.toString();
  }

  ResponderPosition toEntity() => ResponderPosition(
    latitude: latitude,
    longitude: longitude,
    sourceType: sourceType,
    recordedAt: recordedAt,
  );
}

class RouteInfoModel {
  final String providerName;
  final double distanceMeters;
  final double distanceKm;
  final int durationSeconds;
  final int etaSeconds;
  final int etaMinutes;
  final String? polyline;
  final DateTime? lastCalculatedAt;
  final String? errorMessage;

  RouteInfoModel({
    required this.providerName,
    required this.distanceMeters,
    required this.distanceKm,
    required this.durationSeconds,
    required this.etaSeconds,
    required this.etaMinutes,
    this.polyline,
    this.lastCalculatedAt,
    this.errorMessage,
  });

  factory RouteInfoModel.fromJson(Map<String, dynamic> json) {
    return RouteInfoModel(
      providerName: _toStringOrFallback(json['provider_name'], 'unknown'),
      distanceMeters: (json['distance_meters'] as num?)?.toDouble() ?? 0.0,
      distanceKm: (json['distance_km'] as num?)?.toDouble() ?? 0.0,
      durationSeconds: json['duration_seconds'] as int? ?? 0,
      etaSeconds: json['eta_seconds'] as int? ?? 0,
      etaMinutes: json['eta_minutes'] as int? ?? 0,
      polyline: json['polyline'] as String?,
      lastCalculatedAt: json['last_calculated_at'] != null
          ? DateTime.tryParse(json['last_calculated_at'] as String)
          : null,
      errorMessage: json['error_message'] as String?,
    );
  }
  static String _toStringOrFallback(dynamic value, String fallback) {
    if (value == null) return fallback;
    return value.toString();
  }

  RouteInfo toEntity() => RouteInfo(
    providerName: providerName,
    distanceMeters: distanceMeters,
    distanceKm: distanceKm,
    durationSeconds: durationSeconds,
    etaSeconds: etaSeconds,
    etaMinutes: etaMinutes,
    polyline: polyline,
    lastCalculatedAt: lastCalculatedAt,
    errorMessage: errorMessage,
  );
}

class TrackingHistoryItemModel {
  final String id;
  final String incidentId;
  final String providerId;
  final String? technicianId;
  final String sourceType;
  final double latitude;
  final double longitude;
  final double? accuracyMeters;
  final DateTime recordedAt;
  final String? providerBusinessName;
  final String? technicianFullName;

  TrackingHistoryItemModel({
    required this.id,
    required this.incidentId,
    required this.providerId,
    this.technicianId,
    required this.sourceType,
    required this.latitude,
    required this.longitude,
    this.accuracyMeters,
    required this.recordedAt,
    this.providerBusinessName,
    this.technicianFullName,
  });

  factory TrackingHistoryItemModel.fromJson(Map<String, dynamic> json) {
    return TrackingHistoryItemModel(
      id: _toStringOrFallback(json['id'], ''),
      incidentId: _toStringOrFallback(json['incident_id'], ''),
      providerId: _toStringOrFallback(json['provider_id'], ''),
      technicianId: json['technician_id'] as String?,
      sourceType: _toStringOrFallback(json['source_type'], 'UNKNOWN'),
      latitude: (json['latitude'] as num?)?.toDouble() ?? 0.0,
      longitude: (json['longitude'] as num?)?.toDouble() ?? 0.0,
      accuracyMeters: (json['accuracy_meters'] as num?)?.toDouble(),
      recordedAt: json['recorded_at'] != null
          ? DateTime.parse(json['recorded_at'] as String)
          : DateTime.now(),
      providerBusinessName: json['provider_business_name'] as String?,
      technicianFullName: json['technician_full_name'] as String?,
    );
  }

  static String _toStringOrFallback(dynamic value, String fallback) {
    if (value == null) return fallback;
    return value.toString();
  }

  TrackingHistoryItem toEntity() => TrackingHistoryItem(
    id: id,
    incidentId: incidentId,
    providerId: providerId,
    technicianId: technicianId,
    sourceType: sourceType,
    latitude: latitude,
    longitude: longitude,
    accuracyMeters: accuracyMeters,
    recordedAt: recordedAt,
    providerBusinessName: providerBusinessName,
    technicianFullName: technicianFullName,
  );
}
``

---

## mechanic_mobile/lib/infrastructure/models/user_model.dart

``dart
import '../../domain/entities/user.dart';

class UserModel extends User {
  UserModel({
    required super.id,
    required super.email,
    required super.fullName,
    super.firstName,
    super.lastName,
    super.phoneNumber,
    super.isActive,
    super.isSuperuser,
    super.roleCodes,
    super.createdAt,
    super.updatedAt,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    final firstName = json['first_name'] as String?;
    final lastName = json['last_name'] as String?;
    final fullName =
        (json['full_name'] as String?)?.trim().isNotEmpty == true
        ? json['full_name'] as String
        : '${firstName ?? ''} ${lastName ?? ''}'.trim();

    return UserModel(
      id: json['id'],
      email: json['email'],
      fullName: fullName,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: json['phone_number'] as String?,
      isActive: json['is_active'] as bool?,
      isSuperuser: json['is_superuser'] as bool?,
      roleCodes: ((json['role_codes'] as List?) ?? const [])
          .map((e) => e.toString())
          .toList(),
      createdAt: json['created_at'] != null
          ? DateTime.tryParse(json['created_at'])
          : null,
      updatedAt: json['updated_at'] != null
          ? DateTime.tryParse(json['updated_at'])
          : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'email': email,
      'full_name': fullName,
      'first_name': firstName,
      'last_name': lastName,
      'phone_number': phoneNumber,
      'is_active': isActive,
      'is_superuser': isSuperuser,
      'role_codes': roleCodes,
      'created_at': createdAt?.toIso8601String(),
      'updated_at': updatedAt?.toIso8601String(),
    };
  }
}
``

---

## mechanic_mobile/lib/infrastructure/models/vehicle_model.dart

``dart
import '../../domain/entities/vehicle.dart';

class VehicleModel extends Vehicle {
  VehicleModel({
    required super.id,
    required super.ownerUserId,
    required super.plateNumber,
    required super.vehicleType,
    required super.brand,
    required super.model,
    required super.year,
    required super.color,
    required super.notes,
    required super.isActive,
    super.createdAt,
    super.updatedAt,
  });

  factory VehicleModel.fromJson(Map<String, dynamic> json) {
    return VehicleModel(
      id: (json['id'] ?? '').toString(),
      ownerUserId: (json['owner_user_id'] ?? '').toString(),
      plateNumber: (json['plate_number'] ?? '').toString(),
      vehicleType: (json['vehicle_type'] ?? '').toString(),
      brand: (json['brand'] ?? '').toString(),
      model: (json['model'] ?? '').toString(),
      year: (json['year'] ?? 0) as int,
      color: (json['color'] ?? '').toString(),
      notes: (json['notes'] ?? '').toString(),
      isActive: (json['is_active'] ?? true) as bool,
      createdAt: json['created_at'] != null
          ? DateTime.tryParse(json['created_at'].toString())
          : null,
      updatedAt: json['updated_at'] != null
          ? DateTime.tryParse(json['updated_at'].toString())
          : null,
    );
  }
}
``

---

## mechanic_mobile/lib/infrastructure/repositories/admin_incident_repository_impl.dart

``dart
import '../../domain/entities/admin_incident.dart';
import '../../domain/usecases/get_all_incidents_usecase.dart';
import '../../domain/usecases/get_incident_details_usecase.dart';
import '../../domain/usecases/get_incident_candidates_usecase.dart';
import '../../domain/usecases/publish_incident_usecase.dart';
import '../datasources/admin_incident_remote_data_source.dart';

// Repositorio base
class AdminIncidentRepository {
  final AdminIncidentRemoteDataSource _dataSource;

  AdminIncidentRepository(this._dataSource);

  Future<List<AdminIncident>> getAllIncidents() async {
    final models = await _dataSource.getAllIncidents();
    return models.map((model) => model.toEntity()).toList();
  }

  Future<AdminIncident> getIncidentDetails(String incidentId) async {
    final model = await _dataSource.getIncidentDetails(incidentId);
    return model.toEntity();
  }

  Future<List<Candidate>> getIncidentCandidates(String incidentId) async {
    final models = await _dataSource.getIncidentCandidates(incidentId);
    return models.map((model) => model.toEntity()).toList();
  }

  Future<AdminIncident> publishIncident(String incidentId) async {
    final model = await _dataSource.publishIncident(incidentId);
    return model.toEntity();
  }
}

// Implementación de UseCases
class GetAllIncidentsUseCaseImpl implements GetAllIncidentsUseCase {
  final AdminIncidentRepository _repository;

  GetAllIncidentsUseCaseImpl(this._repository);

  @override
  Future<List<AdminIncident>> execute() async {
    return await _repository.getAllIncidents();
  }
}

class GetIncidentDetailsUseCaseImpl implements GetIncidentDetailsUseCase {
  final AdminIncidentRepository _repository;

  GetIncidentDetailsUseCaseImpl(this._repository);

  @override
  Future<AdminIncident> execute(String incidentId) async {
    return await _repository.getIncidentDetails(incidentId);
  }
}

class GetIncidentCandidatesUseCaseImpl implements GetIncidentCandidatesUseCase {
  final AdminIncidentRepository _repository;

  GetIncidentCandidatesUseCaseImpl(this._repository);

  @override
  Future<List<Candidate>> execute(String incidentId) async {
    return await _repository.getIncidentCandidates(incidentId);
  }
}

class PublishIncidentUseCaseImpl implements PublishIncidentUseCase {
  final AdminIncidentRepository _repository;

  PublishIncidentUseCaseImpl(this._repository);

  @override
  Future<AdminIncident> execute(String incidentId) async {
    return await _repository.publishIncident(incidentId);
  }
}
``

---

## mechanic_mobile/lib/infrastructure/repositories/auth_repository_impl.dart

``dart
import '../../domain/entities/user.dart';
import '../../domain/repositories/auth_repository.dart';
import '../datasources/auth_remote_data_source.dart';
import '../../core/network/api_client.dart';

class AuthRepositoryImpl implements AuthRepository {
  final AuthRemoteDataSource remote;
  final ApiClient api;

  AuthRepositoryImpl(this.remote, this.api);

  @override
  Future<User> login(String email, String password) async {
    final (token, user) = await remote.login(email, password);
    api.setToken(token);
    return user;
  }

  @override
  Future<User> register(Map<String, dynamic> body) async {
    final (token, user) = await remote.register(body);
    api.setToken(token);
    return user;
  }

  // ✅ Implementar getMe
  @override
  Future<User> getMe() async {
    return await remote.me();
  }

  @override
  Future<User> getMyProfile() async {
    return await remote.myProfile();
  }

  @override
  Future<User> updateMyProfile(Map<String, dynamic> body) async {
    return await remote.updateMyProfile(body);
  }
}
``

---

## mechanic_mobile/lib/infrastructure/repositories/catalog_repository_impl.dart

``dart
import '../../domain/entities/catalog_service.dart';
import '../../domain/usecases/get_catalog_services_usecase.dart';
import '../../domain/usecases/get_provider_services_usecase.dart';
import '../../domain/usecases/create_provider_service_usecase.dart';
import '../datasources/catalog_remote_data_source.dart';

class CatalogRepository {
  final CatalogRemoteDataSource _dataSource;

  CatalogRepository(this._dataSource);

  Future<List<CatalogServiceEntry>> getCatalogServices() async {
    final models = await _dataSource.getCatalogServices();
    return models.map((model) => model.toEntity()).toList();
  }

  Future<List<ProviderService>> getProviderServices() async {
    final models = await _dataSource.getProviderServices();
    return models.map((model) => model.toEntity()).toList();
  }

  Future<ProviderService> createProviderService(CreateProviderServiceParams params) async {
    final model = await _dataSource.createProviderService(params.toJson());
    return model.toEntity();
  }
}

// Implementación de UseCases
class GetCatalogServicesUseCaseImpl implements GetCatalogServicesUseCase {
  final CatalogRepository _repository;

  GetCatalogServicesUseCaseImpl(this._repository);

  @override
  Future<List<CatalogServiceEntry>> execute() async {
    return await _repository.getCatalogServices();
  }
}

class GetProviderServicesUseCaseImpl implements GetProviderServicesUseCase {
  final CatalogRepository _repository;

  GetProviderServicesUseCaseImpl(this._repository);

  @override
  Future<List<ProviderService>> execute() async {
    return await _repository.getProviderServices();
  }
}

class CreateProviderServiceUseCaseImpl implements CreateProviderServiceUseCase {
  final CatalogRepository _repository;

  CreateProviderServiceUseCaseImpl(this._repository);

  @override
  Future<ProviderService> execute(CreateProviderServiceParams params) async {
    return await _repository.createProviderService(params);
  }
}
``

---

## mechanic_mobile/lib/infrastructure/repositories/evidence_repository_impl.dart

``dart
import '../../domain/entities/evidence.dart';
import '../../domain/usecases/add_text_evidence_usecase.dart';
import '../../domain/usecases/add_file_evidence_usecase.dart';
import '../datasources/evidence_remote_data_source.dart';

class EvidenceRepository {
  final EvidenceRemoteDataSource _dataSource;

  EvidenceRepository(this._dataSource);

  Future<Evidence> addTextEvidence(
    String incidentId,
    AddTextEvidenceParams params,
  ) async {
    final model = await _dataSource.addTextEvidence(
      incidentId,
      params.toJson(),
    );
    return model.toEntity();
  }

  Future<Evidence> addFileEvidence(
    String incidentId,
    AddFileEvidenceParams params,
  ) async {
    // ✅ Pasar el XFile directamente
    final model = await _dataSource.addFileEvidence(
      incidentId,
      params.evidenceType,
      params.description,
      params.file, // Esto es XFile
    );
    return model.toEntity();
  }
}

class AddTextEvidenceUseCaseImpl implements AddTextEvidenceUseCase {
  final EvidenceRepository _repository;

  AddTextEvidenceUseCaseImpl(this._repository);

  @override
  Future<Evidence> execute(AddTextEvidenceParams params) async {
    return await _repository.addTextEvidence(params.incidentId, params);
  }
}

class AddFileEvidenceUseCaseImpl implements AddFileEvidenceUseCase {
  final EvidenceRepository _repository;

  AddFileEvidenceUseCaseImpl(this._repository);

  @override
  Future<Evidence> execute(AddFileEvidenceParams params) async {
    return await _repository.addFileEvidence(params.incidentId, params);
  }
}
``

---

## mechanic_mobile/lib/infrastructure/repositories/incident_repository_impl.dart

``dart
import '../../domain/entities/incident.dart';
import '../../domain/usecases/get_my_incidents_usecase.dart';
import '../../domain/usecases/create_incident_usecase.dart';
import '../../domain/usecases/update_incident_usecase.dart';
import '../../domain/usecases/cancel_incident_usecase.dart';
import '../datasources/incident_remote_data_source.dart';

// Repositorio base
class IncidentRepository {
  final IncidentRemoteDataSource _dataSource;

  IncidentRepository(this._dataSource);

  Future<List<Incident>> getMyIncidents() async {
    final models = await _dataSource.getMyIncidents();
    return models.map((model) => model.toEntity()).toList();
  }

  Future<Incident> createIncident(CreateIncidentParams params) async {
    final model = await _dataSource.createIncident(params.toJson());
    return model.toEntity();
  }

  Future<Incident> updateIncident(
    String incidentId,
    UpdateIncidentParams params,
  ) async {
    final model = await _dataSource.updateIncident(incidentId, params.toJson());
    return model.toEntity();
  }

  Future<void> cancelIncident(String incidentId) async {
    await _dataSource.cancelIncident(incidentId);
  }
}

// Implementación de UseCases
class GetMyIncidentsUseCaseImpl implements GetMyIncidentsUseCase {
  final IncidentRepository _repository;

  GetMyIncidentsUseCaseImpl(this._repository);

  @override
  Future<List<Incident>> execute() async {
    return await _repository.getMyIncidents();
  }
}

class CreateIncidentUseCaseImpl implements CreateIncidentUseCase {
  final IncidentRepository _repository;

  CreateIncidentUseCaseImpl(this._repository);

  @override
  Future<Incident> execute(CreateIncidentParams params) async {
    return await _repository.createIncident(params);
  }
}

class UpdateIncidentUseCaseImpl implements UpdateIncidentUseCase {
  final IncidentRepository _repository;

  UpdateIncidentUseCaseImpl(this._repository);

  @override
  Future<Incident> execute(
    String incidentId,
    UpdateIncidentParams params,
  ) async {
    return await _repository.updateIncident(incidentId, params);
  }
}

class CancelIncidentUseCaseImpl implements CancelIncidentUseCase {
  final IncidentRepository _repository;

  CancelIncidentUseCaseImpl(this._repository);

  @override
  Future<void> execute(String incidentId) async {
    await _repository.cancelIncident(incidentId);
  }
}
``

---

## mechanic_mobile/lib/infrastructure/repositories/notification_repository_impl.dart

``dart
import '../../domain/entities/device_token.dart';
import '../../domain/usecases/register_device_usecase.dart';
import '../../domain/usecases/unregister_device_usecase.dart';
import '../../domain/usecases/get_my_devices_usecase.dart';
import '../datasources/notification_remote_data_source.dart';

class NotificationRepository {
  final NotificationRemoteDataSource _dataSource;

  NotificationRepository(this._dataSource);

  Future<DeviceToken> registerDevice(RegisterDeviceParams params) async {
    final model = await _dataSource.registerDevice(params.toJson());
    return model.toEntity();
  }

  Future<DeviceToken> unregisterDevice(String deviceTokenId) async {
    final model = await _dataSource.unregisterDevice(deviceTokenId);
    return model.toEntity();
  }

  Future<List<DeviceToken>> getMyDevices() async {
    final models = await _dataSource.getMyDevices();
    return models.map((model) => model.toEntity()).toList();
  }
}

// Implementación de UseCases
class RegisterDeviceUseCaseImpl implements RegisterDeviceUseCase {
  final NotificationRepository _repository;

  RegisterDeviceUseCaseImpl(this._repository);

  @override
  Future<DeviceToken> execute(RegisterDeviceParams params) async {
    return await _repository.registerDevice(params);
  }
}

class UnregisterDeviceUseCaseImpl implements UnregisterDeviceUseCase {
  final NotificationRepository _repository;

  UnregisterDeviceUseCaseImpl(this._repository);

  @override
  Future<DeviceToken> execute(String deviceTokenId) async {
    return await _repository.unregisterDevice(deviceTokenId);
  }
}

class GetMyDevicesUseCaseImpl implements GetMyDevicesUseCase {
  final NotificationRepository _repository;

  GetMyDevicesUseCaseImpl(this._repository);

  @override
  Future<List<DeviceToken>> execute() async {
    return await _repository.getMyDevices();
  }
}
``

---

## mechanic_mobile/lib/infrastructure/repositories/provider_admin_repository_impl.dart

``dart
import '../../domain/entities/provider_summary.dart';
import '../../domain/usecases/get_providers_usecase.dart';
import '../datasources/provider_admin_remote_data_source.dart';

class ProviderAdminRepository {
  final ProviderAdminRemoteDataSource _dataSource;

  ProviderAdminRepository(this._dataSource);

  Future<List<ProviderSummary>> getProviders({
    int limit = 50,
    int offset = 0,
  }) async {
    final models = await _dataSource.getProviders(limit: limit, offset: offset);
    return models.map((model) => model.toEntity()).toList();
  }
}

// Implementación de UseCase
class GetProvidersUseCaseImpl implements GetProvidersUseCase {
  final ProviderAdminRepository _repository;

  GetProvidersUseCaseImpl(this._repository);

  @override
  Future<List<ProviderSummary>> execute({
    int limit = 50,
    int offset = 0,
  }) async {
    return await _repository.getProviders(limit: limit, offset: offset);
  }
}
``

---

## mechanic_mobile/lib/infrastructure/repositories/provider_assignment_repository_impl.dart

``dart
import '../../domain/entities/provider_candidate.dart';
import '../../domain/usecases/get_available_candidates_usecase.dart';
import '../../domain/usecases/get_candidate_details_usecase.dart';
import '../../domain/usecases/accept_candidate_usecase.dart';
import '../../domain/usecases/reject_candidate_usecase.dart';
import '../datasources/provider_assignment_remote_data_source.dart';

class ProviderAssignmentRepository {
  final ProviderAssignmentRemoteDataSource _dataSource;

  ProviderAssignmentRepository(this._dataSource);

  Future<List<ProviderCandidate>> getAvailableCandidates() async {
    final models = await _dataSource.getAvailableCandidates();
    return models.map((model) => model.toEntity()).toList();
  }

  Future<ProviderCandidate> getCandidateDetails(String candidateId) async {
    final model = await _dataSource.getCandidateDetails(candidateId);
    return model.toEntity();
  }

  Future<Map<String, dynamic>> acceptCandidate(String candidateId) async {
    return await _dataSource.acceptCandidate(candidateId);
  }

  Future<void> rejectCandidate(String candidateId) async {
    await _dataSource.rejectCandidate(candidateId);
  }
}

// Implementación de UseCases
class GetAvailableCandidatesUseCaseImpl
    implements GetAvailableCandidatesUseCase {
  final ProviderAssignmentRepository _repository;

  GetAvailableCandidatesUseCaseImpl(this._repository);

  @override
  Future<List<ProviderCandidate>> execute() async {
    return await _repository.getAvailableCandidates();
  }
}

class GetCandidateDetailsUseCaseImpl implements GetCandidateDetailsUseCase {
  final ProviderAssignmentRepository _repository;

  GetCandidateDetailsUseCaseImpl(this._repository);

  @override
  Future<ProviderCandidate> execute(String candidateId) async {
    return await _repository.getCandidateDetails(candidateId);
  }
}

class AcceptCandidateUseCaseImpl implements AcceptCandidateUseCase {
  final ProviderAssignmentRepository _repository;

  AcceptCandidateUseCaseImpl(this._repository);

  @override
  Future<Map<String, dynamic>> execute(String candidateId) async {
    return await _repository.acceptCandidate(candidateId);
  }
}

class RejectCandidateUseCaseImpl implements RejectCandidateUseCase {
  final ProviderAssignmentRepository _repository;

  RejectCandidateUseCaseImpl(this._repository);

  @override
  Future<void> execute(String candidateId) async {
    await _repository.rejectCandidate(candidateId);
  }
}
``

---

## mechanic_mobile/lib/infrastructure/repositories/provider_operation_repository_impl.dart

``dart
import '../../domain/entities/provider_operation.dart';
import '../../domain/usecases/get_active_operations_usecase.dart';
import '../../domain/usecases/get_operation_state_usecase.dart';
import '../../domain/usecases/dispatch_incident_usecase.dart';
import '../../domain/usecases/mark_arrived_usecase.dart';
import '../../domain/usecases/start_service_usecase.dart';
import '../../domain/usecases/complete_service_usecase.dart';
import '../../domain/usecases/cancel_service_usecase.dart';
import '../datasources/provider_operation_remote_data_source.dart';

class ProviderOperationRepository {
  final ProviderOperationRemoteDataSource _dataSource;

  ProviderOperationRepository(this._dataSource);

  Future<List<ProviderOperation>> getActiveOperations() async {
    final models = await _dataSource.getActiveOperations();
    return models.map((model) => model.toEntity()).toList();
  }

  Future<ProviderOperation> getOperationState(String incidentId) async {
    final model = await _dataSource.getOperationState(incidentId);
    return model.toEntity();
  }

  Future<ProviderOperation> dispatchIncident(
    String incidentId,
    DispatchParams params,
  ) async {
    final model = await _dataSource.dispatchIncident(
      incidentId,
      params.toJson(),
    );
    return model.toEntity();
  }

  Future<ProviderOperation> markArrived(
    String incidentId, {
    String? note,
  }) async {
    final model = await _dataSource.markArrived(incidentId, note: note);
    return model.toEntity();
  }

  Future<ProviderOperation> startService(
    String incidentId, {
    String? note,
  }) async {
    final model = await _dataSource.startService(incidentId, note: note);
    return model.toEntity();
  }

  Future<ProviderOperation> completeService(
    String incidentId,
    CompleteParams params,
  ) async {
    final model = await _dataSource.completeService(
      incidentId,
      params.toJson(),
    );
    return model.toEntity();
  }

  Future<ProviderOperation> cancelService(
    String incidentId, {
    String? note,
  }) async {
    final model = await _dataSource.cancelService(incidentId, note: note);
    return model.toEntity();
  }
}

// Implementación de UseCases
class GetActiveOperationsUseCaseImpl implements GetActiveOperationsUseCase {
  final ProviderOperationRepository _repository;

  GetActiveOperationsUseCaseImpl(this._repository);

  @override
  Future<List<ProviderOperation>> execute() async {
    return await _repository.getActiveOperations();
  }
}

class GetOperationStateUseCaseImpl implements GetOperationStateUseCase {
  final ProviderOperationRepository _repository;

  GetOperationStateUseCaseImpl(this._repository);

  @override
  Future<ProviderOperation> execute(String incidentId) async {
    return await _repository.getOperationState(incidentId);
  }
}

class DispatchIncidentUseCaseImpl implements DispatchIncidentUseCase {
  final ProviderOperationRepository _repository;

  DispatchIncidentUseCaseImpl(this._repository);

  @override
  Future<ProviderOperation> execute(
    String incidentId,
    DispatchParams params,
  ) async {
    return await _repository.dispatchIncident(incidentId, params);
  }
}

class MarkArrivedUseCaseImpl implements MarkArrivedUseCase {
  final ProviderOperationRepository _repository;

  MarkArrivedUseCaseImpl(this._repository);

  @override
  Future<ProviderOperation> execute(String incidentId, {String? note}) async {
    return await _repository.markArrived(incidentId, note: note);
  }
}

class StartServiceUseCaseImpl implements StartServiceUseCase {
  final ProviderOperationRepository _repository;

  StartServiceUseCaseImpl(this._repository);

  @override
  Future<ProviderOperation> execute(String incidentId, {String? note}) async {
    return await _repository.startService(incidentId, note: note);
  }
}

class CompleteServiceUseCaseImpl implements CompleteServiceUseCase {
  final ProviderOperationRepository _repository;

  CompleteServiceUseCaseImpl(this._repository);

  @override
  Future<ProviderOperation> execute(
    String incidentId,
    CompleteParams params,
  ) async {
    return await _repository.completeService(incidentId, params);
  }
}

class CancelServiceUseCaseImpl implements CancelServiceUseCase {
  final ProviderOperationRepository _repository;

  CancelServiceUseCaseImpl(this._repository);

  @override
  Future<ProviderOperation> execute(String incidentId, {String? note}) async {
    return await _repository.cancelService(incidentId, note: note);
  }
}
``

---

## mechanic_mobile/lib/infrastructure/repositories/provider_repository_impl.dart

``dart
import '../../domain/entities/provider_profile.dart';
import '../../domain/usecases/get_provider_profile_usecase.dart';
import '../../domain/usecases/update_provider_profile_usecase.dart';
import '../datasources/provider_remote_data_source.dart';

class ProviderRepository {
  final ProviderRemoteDataSource _dataSource;

  ProviderRepository(this._dataSource);

  Future<ProviderProfile> getProviderProfile() async {
    final model = await _dataSource.getProviderProfile();
    return model.toEntity();
  }

  Future<ProviderProfile> updateProviderProfile(
    UpdateProviderProfileParams params,
  ) async {
    final model = await _dataSource.updateProviderProfile(params.toJson());
    return model.toEntity();
  }
}

// Implementación del UseCase para obtener perfil
class GetProviderProfileUseCaseImpl implements GetProviderProfileUseCase {
  final ProviderRepository _repository;

  GetProviderProfileUseCaseImpl(this._repository);

  @override
  Future<ProviderProfile> execute() async {
    return await _repository.getProviderProfile();
  }
}

// Implementación del UseCase para actualizar perfil
class UpdateProviderProfileUseCaseImpl implements UpdateProviderProfileUseCase {
  final ProviderRepository _repository;

  UpdateProviderProfileUseCaseImpl(this._repository);

  @override
  Future<ProviderProfile> execute(UpdateProviderProfileParams params) async {
    return await _repository.updateProviderProfile(params);
  }
}
``

---

## mechanic_mobile/lib/infrastructure/repositories/technician_repository_impl.dart

``dart
import 'package:mechanic_mobile/domain/usecases/get_technicians_usecase.dart';
import 'package:mechanic_mobile/infrastructure/datasources/technician_datasource.dart';
import '../../domain/entities/technician.dart';
import '../../domain/usecases/create_technician_usecase.dart';
import '../../domain/usecases/update_technician_usecase.dart';

class TechnicianRepository {
  final TechnicianRemoteDataSource _dataSource;

  TechnicianRepository(this._dataSource);

  Future<Technician> createTechnician(CreateTechnicianParams params) async {
    final model = await _dataSource.createTechnician(params.toJson());
    return model.toEntity();
  }

  Future<List<Technician>> getTechnicians() async {
    final models = await _dataSource.getTechnicians();
    return models.map((model) => model.toEntity()).toList();
  }

  Future<Technician> updateTechnician(
    String technicianId,
    UpdateTechnicianParams params,
  ) async {
    final model = await _dataSource.updateTechnician(
      technicianId,
      params.toJson(),
    );
    return model.toEntity();
  }
}

// Implementación del UseCase para crear
class CreateTechnicianUseCaseImpl implements CreateTechnicianUseCase {
  final TechnicianRepository _repository;

  CreateTechnicianUseCaseImpl(this._repository);

  @override
  Future<Technician> execute(CreateTechnicianParams params) async {
    return await _repository.createTechnician(params);
  }
}

// Implementación del UseCase para listar
class GetTechniciansUseCaseImpl implements GetTechniciansUseCase {
  final TechnicianRepository _repository;

  GetTechniciansUseCaseImpl(this._repository);

  @override
  Future<List<Technician>> execute() async {
    return await _repository.getTechnicians();
  }
}

// ✅ Nueva implementación del UseCase para actualizar
class UpdateTechnicianUseCaseImpl implements UpdateTechnicianUseCase {
  final TechnicianRepository _repository;

  UpdateTechnicianUseCaseImpl(this._repository);

  @override
  Future<Technician> execute(
    String technicianId,
    UpdateTechnicianParams params,
  ) async {
    return await _repository.updateTechnician(technicianId, params);
  }
}
``

---

## mechanic_mobile/lib/infrastructure/repositories/tracking_repository_impl.dart

``dart
import '../../domain/entities/tracking.dart';
import '../../domain/usecases/report_location_usecase.dart';
import '../../domain/usecases/refresh_route_usecase.dart';
import '../../domain/usecases/get_live_tracking_usecase.dart';
import '../../domain/usecases/get_tracking_history_usecase.dart';
import '../datasources/tracking_remote_data_source.dart';

class TrackingRepository {
  final TrackingRemoteDataSource _dataSource;

  TrackingRepository(this._dataSource);

  Future<TrackingData> reportLocation(
    String incidentId,
    ReportLocationParams params,
  ) async {
    final model = await _dataSource.reportLocation(incidentId, params.toJson());
    return model.toEntity();
  }

  Future<TrackingData> refreshRoute(String incidentId) async {
    final model = await _dataSource.refreshRoute(incidentId);
    return model.toEntity();
  }

  Future<TrackingData> getLiveTracking(String incidentId) async {
    final model = await _dataSource.getLiveTracking(incidentId);
    return model.toEntity();
  }

  Future<List<TrackingHistoryItem>> getTrackingHistory(
    String incidentId,
  ) async {
    final models = await _dataSource.getTrackingHistory(incidentId);
    return models.map((model) => model.toEntity()).toList();
  }
}

// Implementación de UseCases
class ReportLocationUseCaseImpl implements ReportLocationUseCase {
  final TrackingRepository _repository;

  ReportLocationUseCaseImpl(this._repository);

  @override
  Future<TrackingData> execute(
    String incidentId,
    ReportLocationParams params,
  ) async {
    return await _repository.reportLocation(incidentId, params);
  }
}

class RefreshRouteUseCaseImpl implements RefreshRouteUseCase {
  final TrackingRepository _repository;

  RefreshRouteUseCaseImpl(this._repository);

  @override
  Future<TrackingData> execute(String incidentId) async {
    return await _repository.refreshRoute(incidentId);
  }
}

class GetLiveTrackingUseCaseImpl implements GetLiveTrackingUseCase {
  final TrackingRepository _repository;

  GetLiveTrackingUseCaseImpl(this._repository);

  @override
  Future<TrackingData> execute(String incidentId) async {
    return await _repository.getLiveTracking(incidentId);
  }
}

class GetTrackingHistoryUseCaseImpl implements GetTrackingHistoryUseCase {
  final TrackingRepository _repository;

  GetTrackingHistoryUseCaseImpl(this._repository);

  @override
  Future<List<TrackingHistoryItem>> execute(String incidentId) async {
    return await _repository.getTrackingHistory(incidentId);
  }
}
``

---

## mechanic_mobile/lib/infrastructure/repositories/vehicle_repository_impl.dart

``dart
import '../../domain/entities/vehicle.dart';
import '../../domain/repositories/vehicle_repository.dart';
import '../datasources/vehicle_remote_data_source.dart';

class VehicleRepositoryImpl implements VehicleRepository {
  final VehicleRemoteDataSource remote;

  VehicleRepositoryImpl(this.remote);

  @override
  Future<Vehicle> createVehicle(Map<String, dynamic> body) {
    return remote.createVehicle(body);
  }

  @override
  Future<List<Vehicle>> getMyVehicles() {
    return remote.getMyVehicles();
  }

  @override
  Future<Vehicle> getVehicleById(String vehicleId) {
    return remote.getVehicleById(vehicleId);
  }

  @override
  Future<Vehicle> updateVehicle(String vehicleId, Map<String, dynamic> body) {
    return remote.updateVehicle(vehicleId, body);
  }
}
``

---

## mechanic_mobile/lib/main.dart

``dart
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'core/routes/app_routes.dart';
import 'core/di/injection_container.dart' as di;

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await dotenv.load(fileName: ".env");
  await di.init();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'Auxilio Mecánico',
      debugShowCheckedModeBanner: false, // quita el banner de debug
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blueAccent),
        useMaterial3: true,
      ),
      routerConfig: appRouter,
    );
  }
}
``

---

## mechanic_mobile/lib/presentation/pages/add_evidence_page.dart

``dart
import 'dart:io';
import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:image_picker/image_picker.dart';
import 'package:mechanic_mobile/core/di/injection_container.dart';
import '../viewmodels/evidence_viewmodel.dart';

class AddEvidencePage extends StatefulWidget {
  final String incidentId;

  const AddEvidencePage({super.key, required this.incidentId});

  @override
  State<AddEvidencePage> createState() => _AddEvidencePageState();
}

class _AddEvidencePageState extends State<AddEvidencePage> {
  late EvidenceViewModel _viewModel;
  final _textController = TextEditingController();
  final _descriptionController = TextEditingController();
  final _imagePicker = ImagePicker();

  String _selectedEvidenceType = 'text';
  XFile? _selectedImage; // ✅ Usar XFile? en lugar de dynamic
  String? _selectedImageName;

  @override
  void initState() {
    super.initState();
    _viewModel = sl<EvidenceViewModel>();
  }

  @override
  void dispose() {
    _textController.dispose();
    _descriptionController.dispose();
    super.dispose();
  }

  void _showSnackBar(String message, {bool isError = false}) {
    ScaffoldMessenger.of(context).hideCurrentSnackBar();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Row(
          children: [
            Icon(
              isError ? Icons.error_outline : Icons.check_circle_outline,
              color: Colors.white,
            ),
            const SizedBox(width: 12),
            Expanded(child: Text(message)),
          ],
        ),
        backgroundColor: isError ? Colors.red.shade700 : Colors.blue.shade700,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        margin: const EdgeInsets.all(12),
        duration: const Duration(seconds: 3),
      ),
    );
  }

  Future<void> _pickImage() async {
    final XFile? image = await _imagePicker.pickImage(
      source: ImageSource.gallery,
      imageQuality: 80,
    );

    if (image != null) {
      setState(() {
        _selectedImage = image;
        _selectedImageName = image.name;
      });
    }
  }

  Future<void> _takePhoto() async {
    final XFile? image = await _imagePicker.pickImage(
      source: ImageSource.camera,
      imageQuality: 80,
    );

    if (image != null) {
      setState(() {
        _selectedImage = image;
        _selectedImageName = image.name;
      });
    }
  }

  Future<void> _submitTextEvidence() async {
    if (_descriptionController.text.trim().isEmpty) {
      _showSnackBar('Ingresa una descripción', isError: true);
      return;
    }
    if (_textController.text.trim().isEmpty) {
      _showSnackBar('Ingresa el contenido del texto', isError: true);
      return;
    }

    final success = await _viewModel.addTextEvidence(
      incidentId: widget.incidentId,
      description: _descriptionController.text.trim(),
      textContent: _textController.text.trim(),
    );

    if (success && mounted) {
      _showSnackBar('Evidencia de texto agregada exitosamente');
      _descriptionController.clear();
      _textController.clear();
      context.pop(true);
    } else if (mounted) {
      _showSnackBar(
        _viewModel.errorMessage ?? 'Error al agregar evidencia',
        isError: true,
      );
    }
  }

  // ✅ Versión simplificada - pasar XFile directamente
  Future<void> _submitImageEvidence() async {
    if (_descriptionController.text.trim().isEmpty) {
      _showSnackBar('Ingresa una descripción', isError: true);
      return;
    }
    if (_selectedImage == null) {
      _showSnackBar('Selecciona una imagen', isError: true);
      return;
    }

    // Pasar el XFile directamente (funciona en web y móvil)
    final success = await _viewModel.addImageEvidence(
      incidentId: widget.incidentId,
      description: _descriptionController.text.trim(),
      imageFile: _selectedImage!,
    );

    if (success && mounted) {
      _showSnackBar('Imagen agregada exitosamente');
      _descriptionController.clear();
      setState(() {
        _selectedImage = null;
        _selectedImageName = null;
      });
      context.pop(true);
    } else if (mounted) {
      _showSnackBar(
        _viewModel.errorMessage ?? 'Error al agregar imagen',
        isError: true,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Agregar Evidencia'),
        backgroundColor: Colors.blue.shade800,
        foregroundColor: Colors.white,
        elevation: 2,
      ),
      body: ListenableBuilder(
        listenable: _viewModel,
        builder: (context, _) {
          return SingleChildScrollView(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Selector de tipo de evidencia
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 4),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Tipo de evidencia',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                      const SizedBox(height: 8),
                      SegmentedButton<String>(
                        segments: const [
                          ButtonSegment(
                            value: 'text',
                            label: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Icon(Icons.description, size: 18),
                                SizedBox(width: 4),
                                Text('Texto'),
                              ],
                            ),
                          ),
                          ButtonSegment(
                            value: 'image',
                            label: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Icon(Icons.image, size: 18),
                                SizedBox(width: 4),
                                Text('Imagen'),
                              ],
                            ),
                          ),
                        ],
                        selected: {_selectedEvidenceType},
                        onSelectionChanged: (Set<String> selection) {
                          setState(() {
                            _selectedEvidenceType = selection.first;
                            _selectedImage = null;
                            _selectedImageName = null;
                            _descriptionController.clear();
                            _textController.clear();
                          });
                        },
                        style: ButtonStyle(
                          backgroundColor: WidgetStateProperty.resolveWith((
                            states,
                          ) {
                            if (states.contains(WidgetState.selected)) {
                              return Colors.blue.shade700;
                            }
                            return Colors.transparent;
                          }),
                          foregroundColor: WidgetStateProperty.resolveWith((
                            states,
                          ) {
                            if (states.contains(WidgetState.selected)) {
                              return Colors.white;
                            }
                            return Colors.blue.shade700;
                          }),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 24),

                // Descripción común
                TextField(
                  controller: _descriptionController,
                  decoration: const InputDecoration(
                    labelText: 'Descripción *',
                    hintText: 'Describe esta evidencia...',
                    prefixIcon: Icon(Icons.description),
                    border: OutlineInputBorder(),
                  ),
                  maxLines: 2,
                ),
                const SizedBox(height: 16),

                // Campos según el tipo seleccionado
                if (_selectedEvidenceType == 'text') ...[
                  TextField(
                    controller: _textController,
                    decoration: const InputDecoration(
                      labelText: 'Contenido del texto *',
                      hintText: 'Escribe aquí los detalles adicionales...',
                      prefixIcon: Icon(Icons.text_fields),
                      border: OutlineInputBorder(),
                    ),
                    maxLines: 5,
                  ),
                ] else ...[
                  // Selector de imagen
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      border: Border.all(color: Colors.grey.shade300),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Column(
                      children: [
                        if (_selectedImage != null) ...[
                          kIsWeb
                              ? Image.network(
                                  _selectedImage!.path,
                                  height: 200,
                                  width: double.infinity,
                                  fit: BoxFit.cover,
                                  errorBuilder: (context, error, stackTrace) {
                                    return Container(
                                      height: 200,
                                      color: Colors.grey.shade200,
                                      child: const Center(
                                        child: Column(
                                          mainAxisAlignment:
                                              MainAxisAlignment.center,
                                          children: [
                                            Icon(Icons.broken_image, size: 48),
                                            SizedBox(height: 8),
                                            Text('Vista previa no disponible'),
                                          ],
                                        ),
                                      ),
                                    );
                                  },
                                )
                              : Image.file(
                                  File(_selectedImage!.path),
                                  height: 200,
                                  width: double.infinity,
                                  fit: BoxFit.cover,
                                ),
                          const SizedBox(height: 12),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              TextButton.icon(
                                onPressed: () {
                                  setState(() {
                                    _selectedImage = null;
                                    _selectedImageName = null;
                                  });
                                },
                                icon: const Icon(Icons.delete_outline),
                                label: const Text('Eliminar'),
                                style: TextButton.styleFrom(
                                  foregroundColor: Colors.red,
                                ),
                              ),
                            ],
                          ),
                          if (_selectedImageName != null)
                            Padding(
                              padding: const EdgeInsets.only(top: 8),
                              child: Text(
                                _selectedImageName!,
                                style: TextStyle(
                                  fontSize: 12,
                                  color: Colors.grey.shade600,
                                ),
                              ),
                            ),
                        ] else ...[
                          const Icon(
                            Icons.image_outlined,
                            size: 64,
                            color: Colors.grey,
                          ),
                          const SizedBox(height: 16),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              ElevatedButton.icon(
                                onPressed: _pickImage,
                                icon: const Icon(Icons.photo_library),
                                label: const Text('Galería'),
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: Colors.blue.shade700,
                                  foregroundColor: Colors.white,
                                ),
                              ),
                              const SizedBox(width: 16),
                              ElevatedButton.icon(
                                onPressed: _takePhoto,
                                icon: const Icon(Icons.camera_alt),
                                label: const Text('Cámara'),
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: Colors.blue.shade700,
                                  foregroundColor: Colors.white,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ],
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Formatos soportados: JPG, PNG',
                    style: TextStyle(fontSize: 12, color: Colors.grey.shade500),
                  ),
                ],

                const SizedBox(height: 32),

                // Botón de enviar
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: _viewModel.isLoading
                        ? null
                        : (_selectedEvidenceType == 'text'
                              ? _submitTextEvidence
                              : _submitImageEvidence),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.blue.shade800,
                      foregroundColor: Colors.white,
                      padding: const EdgeInsets.symmetric(vertical: 16),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                    child: _viewModel.isLoading
                        ? const SizedBox(
                            height: 20,
                            width: 20,
                            child: CircularProgressIndicator(
                              strokeWidth: 2,
                              valueColor: AlwaysStoppedAnimation<Color>(
                                Colors.white,
                              ),
                            ),
                          )
                        : Text(
                            _selectedEvidenceType == 'text'
                                ? 'Agregar Texto'
                                : 'Subir Imagen',
                            style: const TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
``

---

## mechanic_mobile/lib/presentation/pages/admin_incident_detail_page.dart

``dart
import 'package:flutter/material.dart';
import 'package:mechanic_mobile/core/di/injection_container.dart';
import '../viewmodels/admin_incidents_viewmodel.dart';

class AdminIncidentDetailPage extends StatefulWidget {
  final String incidentId;

  const AdminIncidentDetailPage({super.key, required this.incidentId});

  @override
  State<AdminIncidentDetailPage> createState() =>
      _AdminIncidentDetailPageState();
}

class _AdminIncidentDetailPageState extends State<AdminIncidentDetailPage> {
  late AdminIncidentsViewModel _viewModel;

  @override
  void initState() {
    super.initState();
    _viewModel = sl<AdminIncidentsViewModel>();
    _viewModel.loadIncidentDetails(widget.incidentId);
  }

  @override
  void dispose() {
    _viewModel.clearSelectedIncident();
    super.dispose();
  }

  void _showSnackBar(String message, {bool isError = false}) {
    ScaffoldMessenger.of(context).hideCurrentSnackBar();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Row(
          children: [
            Icon(
              isError ? Icons.error_outline : Icons.check_circle_outline,
              color: Colors.white,
            ),
            const SizedBox(width: 12),
            Expanded(child: Text(message)),
          ],
        ),
        backgroundColor: isError ? Colors.red.shade700 : Colors.blue.shade700,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        margin: const EdgeInsets.all(12),
        duration: const Duration(seconds: 3),
      ),
    );
  }

  Future<void> _showPublishConfirmDialog() async {
    final incident = _viewModel.selectedIncident;
    if (incident == null) return;

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Publicar Incidente'),
        content: Text(
          '¿Estás seguro de que deseas publicar el incidente "${incident.title}"? Esto lo hará visible para los talleres.',
        ),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancelar'),
          ),
          ElevatedButton(
            onPressed: () async {
              Navigator.pop(context);
              final success = await _viewModel.publishIncident(incident.id);
              if (success) {
                _showSnackBar('Incidente publicado exitosamente');
                await _viewModel.loadIncidentDetails(incident.id);
              } else {
                _showSnackBar(
                  _viewModel.errorMessage ?? 'Error al publicar',
                  isError: true,
                );
              }
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.green.shade700,
              foregroundColor: Colors.white,
            ),
            child: const Text('Publicar'),
          ),
        ],
      ),
    );
  }

  Future<void> _showCandidatesDialog() async {
    final incident = _viewModel.selectedIncident;
    if (incident == null) return;

    await _viewModel.loadCandidates(incident.id);

    if (!mounted) return;

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Candidatos para el Incidente'),
        content: _viewModel.candidates.isEmpty
            ? const SizedBox(
                height: 100,
                child: Center(child: Text('No hay candidatos disponibles')),
              )
            : SizedBox(
                width: double.maxFinite,
                height: 400,
                child: ListView.builder(
                  itemCount: _viewModel.candidates.length,
                  itemBuilder: (context, index) {
                    final candidate = _viewModel.candidates[index];
                    return Card(
                      margin: const EdgeInsets.only(bottom: 8),
                      child: ListTile(
                        leading: const CircleAvatar(
                          child: Icon(Icons.business),
                        ),
                        title: Text(candidate.providerName),
                        subtitle: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Distancia: ${candidate.distanceKm.toStringAsFixed(1)} km',
                            ),
                            Text(
                              'Puntuación: ${candidate.score.toStringAsFixed(1)}',
                            ),
                            Text(
                              'Servicios: ${candidate.matchedServices.join(", ")}',
                            ),
                          ],
                        ),
                        trailing: Chip(
                          label: Text(candidate.providerType),
                          backgroundColor: Colors.blue.shade100,
                        ),
                      ),
                    );
                  },
                ),
              ),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cerrar'),
          ),
        ],
      ),
    );
  }

  String _formatDate(DateTime? date) {
    if (date == null) return 'N/A';
    return '${date.day}/${date.month}/${date.year} ${date.hour}:${date.minute.toString().padLeft(2, '0')}';
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Detalle del Incidente'),
        backgroundColor: Colors.blue.shade800,
        foregroundColor: Colors.white,
        elevation: 2,
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () => _viewModel.loadIncidentDetails(widget.incidentId),
            tooltip: 'Actualizar',
          ),
        ],
      ),
      body: ListenableBuilder(
        listenable: _viewModel,
        builder: (context, _) {
          if (_viewModel.isLoading && _viewModel.selectedIncident == null) {
            return const Center(
              child: CircularProgressIndicator(
                valueColor: AlwaysStoppedAnimation<Color>(Colors.blue),
              ),
            );
          }

          if (_viewModel.errorMessage != null &&
              _viewModel.selectedIncident == null) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.error_outline,
                    size: 64,
                    color: Colors.red.shade300,
                  ),
                  const SizedBox(height: 16),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 32),
                    child: Text(
                      _viewModel.errorMessage!,
                      style: TextStyle(color: Colors.grey.shade600),
                      textAlign: TextAlign.center,
                    ),
                  ),
                  const SizedBox(height: 16),
                  ElevatedButton.icon(
                    onPressed: () =>
                        _viewModel.loadIncidentDetails(widget.incidentId),
                    icon: const Icon(Icons.refresh),
                    label: const Text('Reintentar'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.blue,
                      foregroundColor: Colors.white,
                    ),
                  ),
                ],
              ),
            );
          }

          final incident = _viewModel.selectedIncident;
          if (incident == null) return const SizedBox.shrink();

          return SingleChildScrollView(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Botones de acción
                if (incident.canBePublished)
                  Row(
                    children: [
                      Expanded(
                        child: ElevatedButton.icon(
                          onPressed: _showPublishConfirmDialog,
                          icon: const Icon(Icons.publish),
                          label: const Text('Publicar Incidente'),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.green.shade700,
                            foregroundColor: Colors.white,
                            padding: const EdgeInsets.symmetric(vertical: 12),
                          ),
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: OutlinedButton.icon(
                          onPressed: _showCandidatesDialog,
                          icon: const Icon(Icons.people_outline),
                          label: const Text('Ver Candidatos'),
                          style: OutlinedButton.styleFrom(
                            foregroundColor: Colors.blue.shade700,
                            padding: const EdgeInsets.symmetric(vertical: 12),
                          ),
                        ),
                      ),
                    ],
                  ),
                const SizedBox(height: 16),

                // Resumen IA
                if (incident.aiSummaryStatus == 'SUCCEEDED' &&
                    incident.structuredSummary != null)
                  Card(
                    color: Colors.blue.shade50,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Icon(
                                Icons.auto_awesome,
                                color: Colors.blue.shade700,
                              ),
                              const SizedBox(width: 8),
                              const Text(
                                'Análisis IA',
                                style: TextStyle(fontWeight: FontWeight.bold),
                              ),
                            ],
                          ),
                          const SizedBox(height: 8),
                          Text(incident.structuredSummary!),
                          if (incident.suggestedCategory != null) ...[
                            const SizedBox(height: 8),
                            Row(
                              children: [
                                const Text(
                                  'Categoría sugerida: ',
                                  style: TextStyle(fontSize: 12),
                                ),
                                Text(
                                  incident.suggestedCategory!,
                                  style: const TextStyle(
                                    fontSize: 12,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ],
                            ),
                          ],
                          if (incident.suggestedPriority != null)
                            Row(
                              children: [
                                const Text(
                                  'Prioridad sugerida: ',
                                  style: TextStyle(fontSize: 12),
                                ),
                                Text(
                                  incident.suggestedPriority!,
                                  style: const TextStyle(
                                    fontSize: 12,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ],
                            ),
                        ],
                      ),
                    ),
                  ),
                const SizedBox(height: 16),

                // Información del incidente
                Card(
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Información del Incidente',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const Divider(),
                        _buildInfoRow('ID', incident.id, icon: Icons.numbers),
                        _buildInfoRow(
                          'Estado',
                          incident.status,
                          icon: Icons.info_outline,
                        ),
                        _buildInfoRow(
                          'Prioridad',
                          incident.priority,
                          icon: Icons.priority_high,
                        ),
                        _buildInfoRow(
                          'Categoría',
                          incident.reportedCategory,
                          icon: Icons.category,
                        ),
                        _buildInfoRow(
                          'Título',
                          incident.title,
                          icon: Icons.title,
                        ),
                        _buildInfoRow(
                          'Descripción',
                          incident.description,
                          icon: Icons.description,
                        ),
                        if (incident.addressReference != null)
                          _buildInfoRow(
                            'Dirección',
                            incident.addressReference!,
                            icon: Icons.location_on,
                          ),
                        _buildInfoRow(
                          'Fecha',
                          _formatDate(incident.createdAt),
                          icon: Icons.calendar_today,
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 16),

                // Información del cliente
                if (incident.clientUser != null)
                  Card(
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'Información del Cliente',
                            style: TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const Divider(),
                          _buildInfoRow(
                            'Nombre',
                            incident.clientUser!.fullName,
                            icon: Icons.person,
                          ),
                          _buildInfoRow(
                            'Email',
                            incident.clientUser!.email,
                            icon: Icons.email,
                          ),
                          _buildInfoRow(
                            'Teléfono',
                            incident.clientUser!.phoneNumber ?? 'N/A',
                            icon: Icons.phone,
                          ),
                        ],
                      ),
                    ),
                  ),
                const SizedBox(height: 16),

                // Información del vehículo
                if (incident.vehicle != null)
                  Card(
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'Información del Vehículo',
                            style: TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const Divider(),
                          _buildInfoRow(
                            'Marca',
                            incident.vehicle!.brand,
                            icon: Icons.directions_car,
                          ),
                          _buildInfoRow('Modelo', incident.vehicle!.model),
                          _buildInfoRow('Placa', incident.vehicle!.plateNumber),
                          _buildInfoRow(
                            'Año',
                            incident.vehicle!.year.toString(),
                          ),
                          _buildInfoRow('Color', incident.vehicle!.color),
                        ],
                      ),
                    ),
                  ),
                const SizedBox(height: 16),

                // Información del proveedor
                if (incident.provider != null)
                  Card(
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'Información del Proveedor',
                            style: TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const Divider(),
                          _buildInfoRow(
                            'Nombre',
                            incident.provider!.businessName,
                            icon: Icons.business,
                          ),
                          if (incident.provider!.contactPhone != null)
                            _buildInfoRow(
                              'Teléfono',
                              incident.provider!.contactPhone!,
                              icon: Icons.phone,
                            ),
                          if (incident.provider!.city != null)
                            _buildInfoRow(
                              'Ciudad',
                              incident.provider!.city!,
                              icon: Icons.location_city,
                            ),
                        ],
                      ),
                    ),
                  ),
                const SizedBox(height: 16),

                // Timeline
                Card(
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Línea de Tiempo',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const Divider(),
                        _buildTimelineItem(
                          'Solicitud creada',
                          incident.requestedAt ?? incident.createdAt,
                          Icons.add_circle_outline,
                          true,
                        ),
                        if (incident.assignedAt != null)
                          _buildTimelineItem(
                            'Asignado a taller',
                            incident.assignedAt,
                            Icons.assignment_ind,
                            true,
                          ),
                        if (incident.enRouteAt != null)
                          _buildTimelineItem(
                            'Técnico en camino',
                            incident.enRouteAt,
                            Icons.directions_car,
                            true,
                          ),
                        if (incident.arrivedAt != null)
                          _buildTimelineItem(
                            'Técnico en el lugar',
                            incident.arrivedAt,
                            Icons.location_on,
                            true,
                          ),
                        if (incident.startedAt != null)
                          _buildTimelineItem(
                            'Servicio iniciado',
                            incident.startedAt,
                            Icons.build,
                            true,
                          ),
                        if (incident.completedAt != null)
                          _buildTimelineItem(
                            'Servicio completado',
                            incident.completedAt,
                            Icons.check_circle,
                            true,
                          ),
                        if (incident.cancelledAt != null)
                          _buildTimelineItem(
                            'Solicitud cancelada',
                            incident.cancelledAt,
                            Icons.cancel,
                            true,
                          ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildInfoRow(String label, String value, {IconData? icon}) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (icon != null)
            Padding(
              padding: const EdgeInsets.only(right: 12),
              child: Icon(icon, size: 20, color: Colors.blue.shade700),
            ),
          SizedBox(
            width: 100,
            child: Text(
              label,
              style: const TextStyle(
                fontWeight: FontWeight.w600,
                color: Colors.grey,
              ),
            ),
          ),
          Expanded(child: Text(value, style: const TextStyle(fontSize: 14))),
        ],
      ),
    );
  }

  Widget _buildTimelineItem(
    String label,
    DateTime? date,
    IconData icon,
    bool isCompleted,
  ) {
    final color = isCompleted && date != null
        ? Colors.green
        : Colors.grey.shade400;

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        children: [
          Container(
            width: 32,
            height: 32,
            decoration: BoxDecoration(
              color: color.withValues(alpha: 0.2),
              shape: BoxShape.circle,
            ),
            child: Icon(icon, size: 18, color: color),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  label,
                  style: TextStyle(fontWeight: FontWeight.w500, color: color),
                ),
                if (date != null)
                  Text(
                    _formatDate(date),
                    style: TextStyle(fontSize: 12, color: Colors.grey.shade500),
                  ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
``

---

## mechanic_mobile/lib/presentation/pages/admin_incidents_page.dart

``dart
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:mechanic_mobile/core/di/injection_container.dart';
import '../../domain/entities/admin_incident.dart';
import '../viewmodels/admin_incidents_viewmodel.dart';

class AdminIncidentsPage extends StatefulWidget {
  const AdminIncidentsPage({super.key});

  @override
  State<AdminIncidentsPage> createState() => _AdminIncidentsPageState();
}

class _AdminIncidentsPageState extends State<AdminIncidentsPage> {
  late AdminIncidentsViewModel _viewModel;

  @override
  void initState() {
    super.initState();
    _viewModel = sl<AdminIncidentsViewModel>();
    _viewModel.loadIncidents();
  }

  void _showSnackBar(String message, {bool isError = false}) {
    ScaffoldMessenger.of(context).hideCurrentSnackBar();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Row(
          children: [
            Icon(
              isError ? Icons.error_outline : Icons.check_circle_outline,
              color: Colors.white,
            ),
            const SizedBox(width: 12),
            Expanded(child: Text(message)),
          ],
        ),
        backgroundColor: isError ? Colors.red.shade700 : Colors.blue.shade700,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        margin: const EdgeInsets.all(12),
        duration: const Duration(seconds: 3),
      ),
    );
  }

  Future<void> _showPublishConfirmDialog(AdminIncident incident) async {
    return showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Publicar Incidente'),
        content: Text(
          '¿Estás seguro de que deseas publicar el incidente "${incident.title}"? Esto lo hará visible para los talleres.',
        ),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancelar'),
          ),
          ElevatedButton(
            onPressed: () async {
              Navigator.pop(context);
              final success = await _viewModel.publishIncident(incident.id);
              if (success) {
                _showSnackBar('Incidente publicado exitosamente');
              } else {
                _showSnackBar(
                  _viewModel.errorMessage ?? 'Error al publicar',
                  isError: true,
                );
              }
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.green.shade700,
              foregroundColor: Colors.white,
            ),
            child: const Text('Publicar'),
          ),
        ],
      ),
    );
  }

  Future<void> _showCandidatesDialog(String incidentId) async {
    await _viewModel.loadCandidates(incidentId);

    if (!mounted) return;

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Candidatos para el Incidente'),
        content: _viewModel.candidates.isEmpty
            ? const SizedBox(
                height: 100,
                child: Center(child: Text('No hay candidatos disponibles')),
              )
            : SizedBox(
                width: double.maxFinite,
                height: 400,
                child: ListView.builder(
                  itemCount: _viewModel.candidates.length,
                  itemBuilder: (context, index) {
                    final candidate = _viewModel.candidates[index];
                    return Card(
                      margin: const EdgeInsets.only(bottom: 8),
                      child: ListTile(
                        leading: const CircleAvatar(
                          child: Icon(Icons.business),
                        ),
                        title: Text(candidate.providerName),
                        subtitle: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Distancia: ${candidate.distanceKm.toStringAsFixed(1)} km',
                            ),
                            Text(
                              'Puntuación: ${candidate.score.toStringAsFixed(1)}',
                            ),
                            Text(
                              'Servicios: ${candidate.matchedServices.join(", ")}',
                            ),
                          ],
                        ),
                        trailing: Chip(
                          label: Text(candidate.providerType),
                          backgroundColor: Colors.blue.shade100,
                        ),
                      ),
                    );
                  },
                ),
              ),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cerrar'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Gestión de Incidentes'),
        backgroundColor: Colors.blue.shade800,
        foregroundColor: Colors.white,
        elevation: 2,
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () => _viewModel.loadIncidents(),
            tooltip: 'Actualizar',
          ),
        ],
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(48),
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Row(
              children: [
                Expanded(
                  child: SegmentedButton<String>(
                    segments: const [
                      ButtonSegment(value: 'all', label: Text('Todos')),
                      ButtonSegment(
                        value: 'pending',
                        label: Text('Pendientes'),
                      ),
                      ButtonSegment(
                        value: 'published',
                        label: Text('Publicados'),
                      ),
                      ButtonSegment(value: 'active', label: Text('Activos')),
                      ButtonSegment(
                        value: 'completed',
                        label: Text('Completados'),
                      ),
                    ],
                    selected: {_viewModel.selectedTab},
                    onSelectionChanged: (Set<String> selection) {
                      _viewModel.setSelectedTab(selection.first);
                    },
                    style: ButtonStyle(
                      backgroundColor: WidgetStateProperty.resolveWith((
                        states,
                      ) {
                        if (states.contains(WidgetState.selected)) {
                          return Colors.blue.shade700;
                        }
                        return Colors.transparent;
                      }),
                      foregroundColor: WidgetStateProperty.resolveWith((
                        states,
                      ) {
                        if (states.contains(WidgetState.selected)) {
                          return Colors.white;
                        }
                        return Colors.blue.shade700;
                      }),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
      body: ListenableBuilder(
        listenable: _viewModel,
        builder: (context, _) {
          if (_viewModel.isLoading && _viewModel.incidents.isEmpty) {
            return const Center(
              child: CircularProgressIndicator(
                valueColor: AlwaysStoppedAnimation<Color>(Colors.blue),
              ),
            );
          }

          if (_viewModel.errorMessage != null && _viewModel.incidents.isEmpty) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.error_outline,
                    size: 64,
                    color: Colors.red.shade300,
                  ),
                  const SizedBox(height: 16),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 32),
                    child: Text(
                      _viewModel.errorMessage!,
                      style: TextStyle(color: Colors.grey.shade600),
                      textAlign: TextAlign.center,
                    ),
                  ),
                  const SizedBox(height: 16),
                  ElevatedButton.icon(
                    onPressed: () => _viewModel.loadIncidents(),
                    icon: const Icon(Icons.refresh),
                    label: const Text('Reintentar'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.blue,
                      foregroundColor: Colors.white,
                    ),
                  ),
                ],
              ),
            );
          }

          final incidents = _viewModel.filteredIncidents;

          if (incidents.isEmpty) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.inbox, size: 64, color: Colors.blue.shade200),
                  const SizedBox(height: 16),
                  Text(
                    'No hay incidentes en esta categoría',
                    style: TextStyle(
                      fontSize: 18,
                      color: Colors.grey.shade600,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ],
              ),
            );
          }

          return RefreshIndicator(
            onRefresh: () => _viewModel.loadIncidents(),
            color: Colors.blue,
            child: ListView.builder(
              padding: const EdgeInsets.all(12),
              itemCount: incidents.length,
              itemBuilder: (context, index) {
                final incident = incidents[index];
                return _buildIncidentCard(incident);
              },
            ),
          );
        },
      ),
    );
  }

  Widget _buildIncidentCard(AdminIncident incident) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      elevation: 4,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
        side: BorderSide(
          color: incident.statusColor.withValues(alpha: 0.3),
          width: 1,
        ),
      ),
      child: InkWell(
        onTap: () {
          context.push('/admin/incident/${incident.id}');
        },
        borderRadius: BorderRadius.circular(16),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: incident.statusColor.withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      incident.statusIcon,
                      style: const TextStyle(fontSize: 20),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          incident.title,
                          style: const TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                          ),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                        const SizedBox(height: 4),
                        Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 8,
                            vertical: 2,
                          ),
                          decoration: BoxDecoration(
                            color: incident.statusColor.withValues(alpha: 0.1),
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Text(
                            incident.status,
                            style: TextStyle(
                              fontSize: 12,
                              color: incident.statusColor,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  if (incident.canBePublished)
                    IconButton(
                      icon: Icon(Icons.publish, color: Colors.green.shade700),
                      onPressed: () => _showPublishConfirmDialog(incident),
                      tooltip: 'Publicar incidente',
                    ),
                  IconButton(
                    icon: Icon(
                      Icons.people_outline,
                      color: Colors.blue.shade700,
                    ),
                    onPressed: () => _showCandidatesDialog(incident.id),
                    tooltip: 'Ver candidatos',
                  ),
                  Icon(Icons.chevron_right, color: Colors.grey.shade400),
                ],
              ),
              const SizedBox(height: 12),
              Row(
                children: [
                  Icon(
                    Icons.person_outline,
                    size: 14,
                    color: Colors.grey.shade500,
                  ),
                  const SizedBox(width: 4),
                  Text(
                    incident.clientUser?.fullName ?? 'Cliente',
                    style: TextStyle(fontSize: 12, color: Colors.grey.shade600),
                  ),
                  const SizedBox(width: 16),
                  Icon(Icons.category, size: 14, color: Colors.grey.shade500),
                  const SizedBox(width: 4),
                  Text(
                    incident.reportedCategory,
                    style: TextStyle(fontSize: 12, color: Colors.grey.shade600),
                  ),
                  const SizedBox(width: 16),
                  Icon(
                    Icons.priority_high,
                    size: 14,
                    color: Colors.grey.shade500,
                  ),
                  const SizedBox(width: 4),
                  Text(
                    incident.priority,
                    style: TextStyle(
                      fontSize: 12,
                      color:
                          incident.priority == 'HIGH' ||
                              incident.priority == 'URGENT'
                          ? Colors.red.shade700
                          : Colors.grey.shade600,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Row(
                children: [
                  Icon(
                    Icons.location_on,
                    size: 14,
                    color: Colors.grey.shade500,
                  ),
                  const SizedBox(width: 4),
                  Expanded(
                    child: Text(
                      incident.addressReference ?? 'Sin dirección especificada',
                      style: TextStyle(
                        fontSize: 12,
                        color: Colors.grey.shade600,
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ],
              ),
              if (incident.provider != null) ...[
                const SizedBox(height: 8),
                Row(
                  children: [
                    Icon(Icons.business, size: 14, color: Colors.grey.shade500),
                    const SizedBox(width: 4),
                    Expanded(
                      child: Text(
                        incident.provider!.businessName,
                        style: TextStyle(
                          fontSize: 12,
                          color: Colors.grey.shade600,
                        ),
                      ),
                    ),
                  ],
                ),
              ],
              if (incident.aiSummaryStatus == 'SUCCEEDED' &&
                  incident.structuredSummary != null) ...[
                const SizedBox(height: 8),
                Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: Colors.blue.shade50,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Row(
                    children: [
                      Icon(
                        Icons.auto_awesome,
                        size: 14,
                        color: Colors.blue.shade700,
                      ),
                      const SizedBox(width: 8),
                      Expanded(
                        child: Text(
                          incident.structuredSummary!,
                          style: TextStyle(
                            fontSize: 12,
                            color: Colors.blue.shade800,
                          ),
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}
``

---

## mechanic_mobile/lib/presentation/pages/admin_providers_page.dart

``dart
import 'package:flutter/material.dart';
import 'package:mechanic_mobile/core/di/injection_container.dart';
import 'package:mechanic_mobile/domain/entities/provider_summary.dart';
import '../viewmodels/admin_providers_viewmodel.dart';

class AdminProvidersPage extends StatefulWidget {
  const AdminProvidersPage({super.key});

  @override
  State<AdminProvidersPage> createState() => _AdminProvidersPageState();
}

class _AdminProvidersPageState extends State<AdminProvidersPage> {
  late AdminProvidersViewModel _viewModel;

  @override
  void initState() {
    super.initState();
    _viewModel = sl<AdminProvidersViewModel>();
    _viewModel.loadProviders();
  }

  void _showSnackBar(String message, {bool isError = false}) {
    ScaffoldMessenger.of(context).hideCurrentSnackBar();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Row(
          children: [
            Icon(
              isError ? Icons.error_outline : Icons.check_circle_outline,
              color: Colors.white,
            ),
            const SizedBox(width: 12),
            Expanded(child: Text(message)),
          ],
        ),
        backgroundColor: isError ? Colors.red.shade700 : Colors.blue.shade700,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        margin: const EdgeInsets.all(12),
        duration: const Duration(seconds: 3),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Gestión de Proveedores'),
        backgroundColor: Colors.blue.shade800,
        foregroundColor: Colors.white,
        elevation: 2,
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () => _viewModel.loadProviders(),
            tooltip: 'Actualizar',
          ),
        ],
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(48),
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Row(
              children: [
                Expanded(
                  child: SegmentedButton<String>(
                    segments: const [
                      ButtonSegment(value: 'all', label: Text('Todos')),
                      ButtonSegment(value: 'workshop', label: Text('Talleres')),
                      ButtonSegment(
                        value: 'independent',
                        label: Text('Independientes'),
                      ),
                    ],
                    selected: {_viewModel.filterType},
                    onSelectionChanged: (Set<String> selection) {
                      _viewModel.setFilterType(selection.first);
                    },
                    style: ButtonStyle(
                      backgroundColor: WidgetStateProperty.resolveWith((
                        states,
                      ) {
                        if (states.contains(WidgetState.selected)) {
                          return Colors.blue.shade700;
                        }
                        return Colors.transparent;
                      }),
                      foregroundColor: WidgetStateProperty.resolveWith((
                        states,
                      ) {
                        if (states.contains(WidgetState.selected)) {
                          return Colors.white;
                        }
                        return Colors.blue.shade700;
                      }),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
      body: ListenableBuilder(
        listenable: _viewModel,
        builder: (context, _) {
          if (_viewModel.isLoading && _viewModel.providers.isEmpty) {
            return const Center(
              child: CircularProgressIndicator(
                valueColor: AlwaysStoppedAnimation<Color>(Colors.blue),
              ),
            );
          }

          if (_viewModel.errorMessage != null && _viewModel.providers.isEmpty) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.error_outline,
                    size: 64,
                    color: Colors.red.shade300,
                  ),
                  const SizedBox(height: 16),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 32),
                    child: Text(
                      _viewModel.errorMessage!,
                      style: TextStyle(color: Colors.grey.shade600),
                      textAlign: TextAlign.center,
                    ),
                  ),
                  const SizedBox(height: 16),
                  ElevatedButton.icon(
                    onPressed: () => _viewModel.loadProviders(),
                    icon: const Icon(Icons.refresh),
                    label: const Text('Reintentar'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.blue,
                      foregroundColor: Colors.white,
                    ),
                  ),
                ],
              ),
            );
          }

          final providers = _viewModel.filteredProviders;

          if (providers.isEmpty) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.business_center,
                    size: 64,
                    color: Colors.blue.shade200,
                  ),
                  const SizedBox(height: 16),
                  Text(
                    'No hay proveedores registrados',
                    style: TextStyle(
                      fontSize: 18,
                      color: Colors.grey.shade600,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ],
              ),
            );
          }

          return RefreshIndicator(
            onRefresh: () => _viewModel.loadProviders(),
            color: Colors.blue,
            child: ListView.builder(
              padding: const EdgeInsets.all(12),
              itemCount: providers.length,
              itemBuilder: (context, index) {
                final provider = providers[index];
                return _buildProviderCard(provider);
              },
            ),
          );
        },
      ),
    );
  }

  Widget _buildProviderCard(ProviderSummary provider) {
    final statusColor = provider.isActive && provider.isAvailable
        ? Colors.green
        : (provider.isActive ? Colors.orange : Colors.red);

    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      elevation: 4,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
        side: BorderSide(color: statusColor.withValues(alpha: 0.3), width: 1),
      ),
      child: InkWell(
        onTap: () {
          _showSnackBar('Detalle del proveedor (próximamente)');
        },
        borderRadius: BorderRadius.circular(16),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: statusColor.withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      provider.providerTypeIcon,
                      style: const TextStyle(fontSize: 20),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          provider.businessName,
                          style: const TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                          ),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                        const SizedBox(height: 4),
                        Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 8,
                            vertical: 2,
                          ),
                          decoration: BoxDecoration(
                            color: statusColor.withValues(alpha: 0.1),
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Text(
                            provider.providerTypeName,
                            style: TextStyle(
                              fontSize: 12,
                              color: statusColor,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      if (provider.isAvailable && provider.hasCapacity)
                        Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 8,
                            vertical: 4,
                          ),
                          decoration: BoxDecoration(
                            color: Colors.green.shade100,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Text(
                            'Disponible',
                            style: TextStyle(
                              fontSize: 12,
                              color: Colors.green.shade700,
                            ),
                          ),
                        ),
                      if (!provider.isAvailable)
                        Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 8,
                            vertical: 4,
                          ),
                          decoration: BoxDecoration(
                            color: Colors.red.shade100,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Text(
                            'No disponible',
                            style: TextStyle(
                              fontSize: 12,
                              color: Colors.red.shade700,
                            ),
                          ),
                        ),
                    ],
                  ),
                ],
              ),
              const SizedBox(height: 12),
              Row(
                children: [
                  Icon(
                    Icons.location_on,
                    size: 14,
                    color: Colors.grey.shade500,
                  ),
                  const SizedBox(width: 4),
                  Expanded(
                    child: Text(
                      provider.city ?? 'Ciudad no especificada',
                      style: TextStyle(
                        fontSize: 12,
                        color: Colors.grey.shade600,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Row(
                children: [
                  Icon(Icons.phone, size: 14, color: Colors.grey.shade500),
                  const SizedBox(width: 4),
                  Text(
                    provider.contactPhone ?? 'Sin teléfono',
                    style: TextStyle(fontSize: 12, color: Colors.grey.shade600),
                  ),
                  const SizedBox(width: 16),
                  Icon(Icons.star, size: 14, color: Colors.amber.shade600),
                  const SizedBox(width: 4),
                  Text(
                    provider.averageRating.toStringAsFixed(1),
                    style: TextStyle(fontSize: 12, color: Colors.grey.shade600),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Wrap(
                spacing: 8,
                runSpacing: 4,
                children: provider.activeServices.take(3).map((service) {
                  return Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 8,
                      vertical: 4,
                    ),
                    decoration: BoxDecoration(
                      color: Colors.blue.shade50,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      service.code.replaceAll('_', ' '),
                      style: TextStyle(
                        fontSize: 10,
                        color: Colors.blue.shade700,
                      ),
                    ),
                  );
                }).toList(),
              ),
              if (provider.activeServices.length > 3)
                Padding(
                  padding: const EdgeInsets.only(top: 4),
                  child: Text(
                    '+${provider.activeServices.length - 3} servicios más',
                    style: TextStyle(fontSize: 10, color: Colors.grey.shade500),
                  ),
                ),
              const SizedBox(height: 12),
              Row(
                children: [
                  _buildStatChip(
                    Icons.people,
                    '${provider.availableTechniciansCount}/${provider.techniciansCount}',
                  ),
                  const SizedBox(width: 8),
                  _buildStatChip(
                    Icons.speed,
                    '${provider.currentActiveServices}/${provider.maxConcurrentServices}',
                  ),
                  const SizedBox(width: 8),
                  _buildStatChip(
                    Icons.category,
                    '${provider.activeServicesCount} servicios',
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildStatChip(IconData icon, String label) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: Colors.grey.shade100,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 12, color: Colors.grey.shade600),
          const SizedBox(width: 4),
          Text(
            label,
            style: TextStyle(fontSize: 11, color: Colors.grey.shade700),
          ),
        ],
      ),
    );
  }
}
``

---

## mechanic_mobile/lib/presentation/pages/catalog_services_page.dart

``dart
import 'package:flutter/material.dart';
import 'package:mechanic_mobile/core/di/injection_container.dart';
import 'package:mechanic_mobile/domain/entities/catalog_service.dart';
import '../viewmodels/catalog_services_viewmodel.dart';

class CatalogServicesPage extends StatefulWidget {
  const CatalogServicesPage({super.key});

  @override
  State<CatalogServicesPage> createState() => _CatalogServicesPageState();
}

class _CatalogServicesPageState extends State<CatalogServicesPage> {
  late CatalogServicesViewModel _viewModel;
  String _selectedTab = 'catalog';

  @override
  void initState() {
    super.initState();
    _viewModel = sl<CatalogServicesViewModel>();
    _viewModel.loadCatalogServices();
    _viewModel.loadProviderServices();
  }

  void _showSnackBar(String message, {bool isError = false}) {
    ScaffoldMessenger.of(context).hideCurrentSnackBar();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Row(
          children: [
            Icon(
              isError ? Icons.error_outline : Icons.check_circle_outline,
              color: Colors.white,
            ),
            const SizedBox(width: 12),
            Expanded(child: Text(message)),
          ],
        ),
        backgroundColor: isError ? Colors.red.shade700 : Colors.blue.shade700,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        margin: const EdgeInsets.all(12),
        duration: const Duration(seconds: 3),
      ),
    );
  }

  void _showConfigureServiceDialog(CatalogServiceEntry entry) {
    final formKey = GlobalKey<FormState>();
    final customTitleController = TextEditingController(
      text: entry.providerService?.customTitle ?? '',
    );
    final customDescriptionController = TextEditingController(
      text: entry.providerService?.customDescription ?? '',
    );
    final priceMinController = TextEditingController(
      text: entry.providerService?.priceEstimateMin.toString() ?? '80',
    );
    final priceMaxController = TextEditingController(
      text: entry.providerService?.priceEstimateMax.toString() ?? '250',
    );
    final durationController = TextEditingController(
      text: entry.providerService?.estimatedDurationMinutes.toString() ?? '45',
    );
    bool isMobileEnabled =
        entry.providerService?.isMobileServiceEnabled ?? true;
    bool isEmergencyEnabled =
        entry.providerService?.isEmergencyServiceEnabled ?? true;
    bool isActive = entry.providerService?.isActive ?? true;

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Row(
          children: [
            Icon(
              entry.isConfigured ? Icons.edit : Icons.add,
              color: Colors.blue.shade800,
            ),
            const SizedBox(width: 8),
            Text(
              entry.isConfigured ? 'Editar Servicio' : 'Configurar Servicio',
            ),
          ],
        ),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        content: SingleChildScrollView(
          child: Form(
            key: formKey,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: Colors.blue.shade50,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        entry.catalogItem.title,
                        style: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        entry.catalogItem.description,
                        style: TextStyle(
                          fontSize: 12,
                          color: Colors.grey.shade600,
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 16),
                TextFormField(
                  controller: customTitleController,
                  decoration: const InputDecoration(
                    labelText: 'Título personalizado (opcional)',
                    prefixIcon: Icon(Icons.title),
                    border: OutlineInputBorder(),
                  ),
                ),
                const SizedBox(height: 12),
                TextFormField(
                  controller: customDescriptionController,
                  decoration: const InputDecoration(
                    labelText: 'Descripción personalizada (opcional)',
                    prefixIcon: Icon(Icons.description),
                    border: OutlineInputBorder(),
                  ),
                  maxLines: 2,
                ),
                const SizedBox(height: 12),
                Row(
                  children: [
                    Expanded(
                      child: TextFormField(
                        controller: priceMinController,
                        keyboardType: TextInputType.number,
                        decoration: const InputDecoration(
                          labelText: 'Precio mínimo *',
                          prefixIcon: Icon(Icons.attach_money),
                          border: OutlineInputBorder(),
                        ),
                        validator: (value) => value == null || value.isEmpty
                            ? 'Campo requerido'
                            : null,
                      ),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: TextFormField(
                        controller: priceMaxController,
                        keyboardType: TextInputType.number,
                        decoration: const InputDecoration(
                          labelText: 'Precio máximo *',
                          prefixIcon: Icon(Icons.attach_money),
                          border: OutlineInputBorder(),
                        ),
                        validator: (value) => value == null || value.isEmpty
                            ? 'Campo requerido'
                            : null,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                TextFormField(
                  controller: durationController,
                  keyboardType: TextInputType.number,
                  decoration: const InputDecoration(
                    labelText: 'Duración estimada (minutos) *',
                    prefixIcon: Icon(Icons.timer),
                    border: OutlineInputBorder(),
                  ),
                  validator: (value) =>
                      value == null || value.isEmpty ? 'Campo requerido' : null,
                ),
                const SizedBox(height: 12),
                SwitchListTile(
                  title: const Text('Servicio móvil habilitado'),
                  value: isMobileEnabled,
                  onChanged: (value) => isMobileEnabled = value,
                  activeThumbColor: Colors.blue.shade700,
                  contentPadding: EdgeInsets.zero,
                ),
                SwitchListTile(
                  title: const Text('Servicio de emergencia habilitado'),
                  value: isEmergencyEnabled,
                  onChanged: (value) => isEmergencyEnabled = value,
                  activeThumbColor: Colors.blue.shade700,
                  contentPadding: EdgeInsets.zero,
                ),
                SwitchListTile(
                  title: const Text('Servicio activo'),
                  value: isActive,
                  onChanged: (value) => isActive = value,
                  activeThumbColor: Colors.blue.shade700,
                  contentPadding: EdgeInsets.zero,
                ),
              ],
            ),
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancelar'),
          ),
          ElevatedButton(
            onPressed: () async {
              if (formKey.currentState!.validate()) {
                Navigator.pop(context);
                final success = await _viewModel.createProviderService(
                  serviceCatalogItemId: entry.catalogItem.id,
                  customTitle: customTitleController.text.trim().isEmpty
                      ? null
                      : customTitleController.text.trim(),
                  customDescription:
                      customDescriptionController.text.trim().isEmpty
                      ? null
                      : customDescriptionController.text.trim(),
                  priceEstimateMin: double.parse(priceMinController.text),
                  priceEstimateMax: double.parse(priceMaxController.text),
                  estimatedDurationMinutes: int.parse(durationController.text),
                  isMobileServiceEnabled: isMobileEnabled,
                  isEmergencyServiceEnabled: isEmergencyEnabled,
                  isActive: isActive,
                );
                if (success) {
                  _showSnackBar(
                    entry.isConfigured
                        ? 'Servicio actualizado'
                        : 'Servicio configurado',
                  );
                  await _viewModel.loadProviderServices();
                } else {
                  _showSnackBar(
                    _viewModel.errorMessage ?? 'Error al configurar servicio',
                    isError: true,
                  );
                }
                _viewModel.clearError();
              }
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.blue.shade800,
              foregroundColor: Colors.white,
            ),
            child: Text(entry.isConfigured ? 'Actualizar' : 'Configurar'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Catálogo de Servicios'),
        backgroundColor: Colors.blue.shade800,
        foregroundColor: Colors.white,
        elevation: 2,
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () {
              _viewModel.loadCatalogServices();
              _viewModel.loadProviderServices();
            },
            tooltip: 'Actualizar',
          ),
        ],
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(48),
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Row(
              children: [
                Expanded(
                  child: SegmentedButton<String>(
                    segments: const [
                      ButtonSegment(
                        value: 'catalog',
                        label: Text('Catálogo Disponible'),
                      ),
                      ButtonSegment(
                        value: 'configured',
                        label: Text('Mis Servicios'),
                      ),
                    ],
                    selected: {_selectedTab},
                    onSelectionChanged: (Set<String> selection) {
                      setState(() {
                        _selectedTab = selection.first;
                      });
                    },
                    style: ButtonStyle(
                      backgroundColor: WidgetStateProperty.resolveWith((
                        states,
                      ) {
                        if (states.contains(WidgetState.selected)) {
                          return Colors.blue.shade700;
                        }
                        return Colors.transparent;
                      }),
                      foregroundColor: WidgetStateProperty.resolveWith((
                        states,
                      ) {
                        if (states.contains(WidgetState.selected)) {
                          return Colors.white;
                        }
                        return Colors.blue.shade700;
                      }),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
      body: ListenableBuilder(
        listenable: _viewModel,
        builder: (context, _) {
          if (_viewModel.isLoading &&
              (_selectedTab == 'catalog'
                  ? _viewModel.catalogServices.isEmpty
                  : _viewModel.providerServices.isEmpty)) {
            return const Center(
              child: CircularProgressIndicator(
                valueColor: AlwaysStoppedAnimation<Color>(Colors.blue),
              ),
            );
          }

          if (_viewModel.errorMessage != null) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.error_outline,
                    size: 64,
                    color: Colors.red.shade300,
                  ),
                  const SizedBox(height: 16),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 32),
                    child: Text(
                      _viewModel.errorMessage!,
                      style: TextStyle(color: Colors.grey.shade600),
                      textAlign: TextAlign.center,
                    ),
                  ),
                  const SizedBox(height: 16),
                  ElevatedButton.icon(
                    onPressed: () {
                      _viewModel.loadCatalogServices();
                      _viewModel.loadProviderServices();
                    },
                    icon: const Icon(Icons.refresh),
                    label: const Text('Reintentar'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.blue,
                      foregroundColor: Colors.white,
                    ),
                  ),
                ],
              ),
            );
          }

          if (_selectedTab == 'catalog') {
            if (_viewModel.catalogServices.isEmpty) {
              return Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(Icons.category, size: 64, color: Colors.blue.shade200),
                    const SizedBox(height: 16),
                    Text(
                      'No hay servicios disponibles',
                      style: TextStyle(
                        fontSize: 18,
                        color: Colors.grey.shade600,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ],
                ),
              );
            }

            return RefreshIndicator(
              onRefresh: () => _viewModel.loadCatalogServices(),
              color: Colors.blue,
              child: ListView.builder(
                padding: const EdgeInsets.all(12),
                itemCount: _viewModel.catalogServices.length,
                itemBuilder: (context, index) {
                  final entry = _viewModel.catalogServices[index];
                  return Card(
                    margin: const EdgeInsets.only(bottom: 12),
                    elevation: 2,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                      side: entry.isConfigured
                          ? BorderSide(color: Colors.green.shade300, width: 1)
                          : BorderSide.none,
                    ),
                    child: ListTile(
                      leading: CircleAvatar(
                        backgroundColor: entry.isConfigured
                            ? Colors.green.shade100
                            : Colors.blue.shade100,
                        child: Icon(
                          Icons.miscellaneous_services,
                          color: entry.isConfigured
                              ? Colors.green.shade700
                              : Colors.blue.shade700,
                        ),
                      ),
                      title: Text(
                        entry.catalogItem.title,
                        style: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                      subtitle: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(entry.catalogItem.description),
                          if (entry.isConfigured &&
                              entry.providerService != null)
                            Container(
                              margin: const EdgeInsets.only(top: 4),
                              padding: const EdgeInsets.symmetric(
                                horizontal: 8,
                                vertical: 2,
                              ),
                              decoration: BoxDecoration(
                                color: Colors.green.shade100,
                                borderRadius: BorderRadius.circular(12),
                              ),
                              child: Text(
                                '✓ Configurado: ${entry.providerService!.priceRange}',
                                style: TextStyle(
                                  fontSize: 11,
                                  color: Colors.green.shade700,
                                ),
                              ),
                            ),
                        ],
                      ),
                      trailing: IconButton(
                        icon: Icon(
                          entry.isConfigured ? Icons.edit : Icons.add_circle,
                          color: entry.isConfigured
                              ? Colors.orange.shade700
                              : Colors.blue.shade700,
                        ),
                        onPressed: () => _showConfigureServiceDialog(entry),
                      ),
                    ),
                  );
                },
              ),
            );
          } else {
            // Tab "Mis Servicios"
            if (_viewModel.providerServices.isEmpty) {
              return Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(
                      Icons.miscellaneous_services,
                      size: 64,
                      color: Colors.blue.shade200,
                    ),
                    const SizedBox(height: 16),
                    Text(
                      'No has configurado ningún servicio',
                      style: TextStyle(
                        fontSize: 18,
                        color: Colors.grey.shade600,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Ve a la pestaña "Catálogo Disponible" para configurar',
                      style: TextStyle(color: Colors.grey.shade500),
                    ),
                  ],
                ),
              );
            }

            return RefreshIndicator(
              onRefresh: () => _viewModel.loadProviderServices(),
              color: Colors.blue,
              child: ListView.builder(
                padding: const EdgeInsets.all(12),
                itemCount: _viewModel.providerServices.length,
                itemBuilder: (context, index) {
                  final service = _viewModel.providerServices[index];
                  return Card(
                    margin: const EdgeInsets.only(bottom: 12),
                    elevation: 2,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: ListTile(
                      leading: CircleAvatar(
                        backgroundColor: service.isActive
                            ? Colors.green.shade100
                            : Colors.grey.shade200,
                        child: Icon(
                          Icons.build,
                          color: service.isActive
                              ? Colors.green.shade700
                              : Colors.grey.shade600,
                        ),
                      ),
                      title: Text(
                        service.effectiveTitle,
                        style: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                      subtitle: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(service.effectiveDescription),
                          const SizedBox(height: 4),
                          Text(
                            '💰 ${service.priceRange} · ⏱️ ${service.estimatedDurationMinutes} min',
                            style: TextStyle(
                              fontSize: 12,
                              color: Colors.grey.shade600,
                            ),
                          ),
                          Wrap(
                            spacing: 8,
                            children: [
                              if (service.isMobileServiceEnabled)
                                Chip(
                                  label: Text(
                                    'Móvil',
                                    style: TextStyle(fontSize: 11),
                                  ),
                                  padding: EdgeInsets.zero,
                                  materialTapTargetSize:
                                      MaterialTapTargetSize.shrinkWrap,
                                ),
                              if (service.isEmergencyServiceEnabled)
                                Chip(
                                  label: Text(
                                    'Emergencia',
                                    style: TextStyle(fontSize: 11),
                                  ),
                                  padding: EdgeInsets.zero,
                                  materialTapTargetSize:
                                      MaterialTapTargetSize.shrinkWrap,
                                ),
                            ],
                          ),
                        ],
                      ),
                      trailing: Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 8,
                          vertical: 4,
                        ),
                        decoration: BoxDecoration(
                          color: service.isActive
                              ? Colors.green.shade100
                              : Colors.red.shade100,
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Text(
                          service.isActive ? 'Activo' : 'Inactivo',
                          style: TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.w500,
                            color: service.isActive
                                ? Colors.green.shade700
                                : Colors.red.shade700,
                          ),
                        ),
                      ),
                    ),
                  );
                },
              ),
            );
          }
        },
      ),
    );
  }
}
``

---

## mechanic_mobile/lib/presentation/pages/client_tracking_page.dart

``dart
import 'package:flutter/material.dart';
import 'package:mechanic_mobile/core/di/injection_container.dart';
import '../viewmodels/client_tracking_viewmodel.dart';

class ClientTrackingPage extends StatefulWidget {
  final String incidentId;

  const ClientTrackingPage({super.key, required this.incidentId});

  @override
  State<ClientTrackingPage> createState() => _ClientTrackingPageState();
}

class _ClientTrackingPageState extends State<ClientTrackingPage> {
  late ClientTrackingViewModel _viewModel;

  @override
  void initState() {
    super.initState();
    _viewModel = sl<ClientTrackingViewModel>();
    _loadData();
  }

  Future<void> _loadData() async {
    await _viewModel.loadLiveTracking(widget.incidentId);
    await _viewModel.loadTrackingHistory(widget.incidentId);
  }

  // void _showSnackBar(String message, {bool isError = false}) {
  //   ScaffoldMessenger.of(context).hideCurrentSnackBar();
  //   ScaffoldMessenger.of(context).showSnackBar(
  //     SnackBar(
  //       content: Row(
  //         children: [
  //           Icon(
  //             isError ? Icons.error_outline : Icons.check_circle_outline,
  //             color: Colors.white,
  //           ),
  //           const SizedBox(width: 12),
  //           Expanded(child: Text(message)),
  //         ],
  //       ),
  //       backgroundColor: isError ? Colors.red.shade700 : Colors.blue.shade700,
  //       behavior: SnackBarBehavior.floating,
  //       shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
  //       margin: const EdgeInsets.all(12),
  //       duration: const Duration(seconds: 3),
  //     ),
  //   );
  // }

  String _formatDateTime(DateTime? date) {
    if (date == null) return 'N/A';
    return '${date.day}/${date.month}/${date.year} ${date.hour}:${date.minute.toString().padLeft(2, '0')}';
  }

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Seguimiento de Servicio'),
          backgroundColor: Colors.blue.shade800,
          foregroundColor: Colors.white,
          elevation: 2,
          bottom: const TabBar(
            tabs: [
              Tab(icon: Icon(Icons.pin), text: 'En Vivo'),
              Tab(icon: Icon(Icons.history), text: 'Historial'),
            ],
          ),
          actions: [
            IconButton(
              icon: const Icon(Icons.refresh),
              onPressed: _loadData,
              tooltip: 'Actualizar',
            ),
          ],
        ),
        body: ListenableBuilder(
          listenable: _viewModel,
          builder: (context, _) {
            if (_viewModel.isLoading && _viewModel.trackingData == null) {
              return const Center(
                child: CircularProgressIndicator(
                  valueColor: AlwaysStoppedAnimation<Color>(Colors.blue),
                ),
              );
            }

            if (_viewModel.errorMessage != null &&
                _viewModel.trackingData == null) {
              return Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(
                      Icons.error_outline,
                      size: 64,
                      color: Colors.red.shade300,
                    ),
                    const SizedBox(height: 16),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 32),
                      child: Text(
                        _viewModel.errorMessage!,
                        style: TextStyle(color: Colors.grey.shade600),
                        textAlign: TextAlign.center,
                      ),
                    ),
                    const SizedBox(height: 16),
                    ElevatedButton.icon(
                      onPressed: _loadData,
                      icon: const Icon(Icons.refresh),
                      label: const Text('Reintentar'),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.blue,
                        foregroundColor: Colors.white,
                      ),
                    ),
                  ],
                ),
              );
            }

            if (_viewModel.trackingData == null) {
              return const SizedBox.shrink();
            }

            final data = _viewModel.trackingData!;

            return TabBarView(
              children: [
                // Live Tracking Tab
                RefreshIndicator(
                  onRefresh: _loadData,
                  color: Colors.blue,
                  child: SingleChildScrollView(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Estado actual
                        Card(
                          color: _getStatusColor(
                            data.status,
                          ).withValues(alpha: 0.1),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(16),
                          ),
                          child: Padding(
                            padding: const EdgeInsets.all(16),
                            child: Row(
                              children: [
                                Icon(
                                  _getStatusIcon(data.status),
                                  color: _getStatusColor(data.status),
                                  size: 32,
                                ),
                                const SizedBox(width: 16),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      const Text(
                                        'Estado del Servicio',
                                        style: TextStyle(
                                          fontSize: 12,
                                          color: Colors.grey,
                                        ),
                                      ),
                                      Text(
                                        _getStatusText(data.status),
                                        style: TextStyle(
                                          fontSize: 20,
                                          fontWeight: FontWeight.bold,
                                          color: _getStatusColor(data.status),
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                        const SizedBox(height: 16),

                        // Información del taller
                        if (data.provider != null)
                          Card(
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(16),
                            ),
                            child: Padding(
                              padding: const EdgeInsets.all(16),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Text(
                                    'Taller Asignado',
                                    style: TextStyle(
                                      fontSize: 18,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  const Divider(),
                                  _buildInfoRow(
                                    'Nombre',
                                    data.provider!.businessName,
                                  ),
                                  if (data.provider!.contactPhone != null)
                                    _buildInfoRow(
                                      'Teléfono',
                                      data.provider!.contactPhone!,
                                    ),
                                  if (data.provider!.city != null)
                                    _buildInfoRow(
                                      'Ciudad',
                                      data.provider!.city!,
                                    ),
                                ],
                              ),
                            ),
                          ),
                        const SizedBox(height: 16),

                        // Información del técnico
                        if (data.assignedTechnician != null)
                          Card(
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(16),
                            ),
                            child: Padding(
                              padding: const EdgeInsets.all(16),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Text(
                                    'Técnico Asignado',
                                    style: TextStyle(
                                      fontSize: 18,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  const Divider(),
                                  _buildInfoRow(
                                    'Nombre',
                                    data.assignedTechnician!.fullName,
                                  ),
                                  _buildInfoRow(
                                    'Especialidad',
                                    data.assignedTechnician!.specialty,
                                  ),
                                  _buildInfoRow(
                                    'Teléfono',
                                    data.assignedTechnician!.phoneNumber,
                                  ),
                                ],
                              ),
                            ),
                          ),
                        const SizedBox(height: 16),

                        // Ubicación actual del técnico
                        if (data.responderPosition != null)
                          Card(
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(16),
                            ),
                            child: Padding(
                              padding: const EdgeInsets.all(16),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    children: [
                                      Icon(
                                        Icons.location_on,
                                        color: Colors.blue.shade700,
                                      ),
                                      const SizedBox(width: 8),
                                      const Text(
                                        'Ubicación del Técnico',
                                        style: TextStyle(
                                          fontSize: 18,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                    ],
                                  ),
                                  const Divider(),
                                  _buildInfoRow(
                                    'Coordenadas',
                                    data.responderPosition!.location,
                                  ),
                                  _buildInfoRow(
                                    'Actualizado',
                                    _formatDateTime(
                                      data.responderPosition!.recordedAt,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        const SizedBox(height: 16),

                        // Información de ruta
                        if (data.route != null)
                          Card(
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(16),
                            ),
                            child: Padding(
                              padding: const EdgeInsets.all(16),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    children: [
                                      Icon(
                                        Icons.route,
                                        color: Colors.blue.shade700,
                                      ),
                                      const SizedBox(width: 8),
                                      const Text(
                                        'Información de la Ruta',
                                        style: TextStyle(
                                          fontSize: 18,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                    ],
                                  ),
                                  const Divider(),
                                  _buildInfoRow(
                                    'Distancia',
                                    data.formattedDistance,
                                  ),
                                  _buildInfoRow(
                                    'ETA estimado',
                                    data.formattedEta,
                                  ),
                                  if (data.route!.errorMessage != null)
                                    Container(
                                      padding: const EdgeInsets.all(8),
                                      decoration: BoxDecoration(
                                        color: Colors.orange.shade50,
                                        borderRadius: BorderRadius.circular(8),
                                      ),
                                      child: Row(
                                        children: [
                                          Icon(
                                            Icons.warning_amber,
                                            size: 16,
                                            color: Colors.orange.shade700,
                                          ),
                                          const SizedBox(width: 8),
                                          Expanded(
                                            child: Text(
                                              data.route!.errorMessage!,
                                              style: TextStyle(
                                                fontSize: 12,
                                                color: Colors.orange.shade800,
                                              ),
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                ],
                              ),
                            ),
                          ),
                      ],
                    ),
                  ),
                ),

                // Tracking History Tab
                RefreshIndicator(
                  onRefresh: () =>
                      _viewModel.loadTrackingHistory(widget.incidentId),
                  color: Colors.blue,
                  child: _viewModel.history.isEmpty
                      ? Center(
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(
                                Icons.history,
                                size: 64,
                                color: Colors.blue.shade200,
                              ),
                              const SizedBox(height: 16),
                              Text(
                                'No hay historial de ubicaciones',
                                style: TextStyle(
                                  fontSize: 18,
                                  color: Colors.grey.shade600,
                                  fontWeight: FontWeight.w500,
                                ),
                              ),
                              const SizedBox(height: 8),
                              Text(
                                'El técnico aún no ha reportado ubicaciones',
                                style: TextStyle(color: Colors.grey.shade500),
                              ),
                            ],
                          ),
                        )
                      : ListView.builder(
                          padding: const EdgeInsets.all(12),
                          itemCount: _viewModel.history.length,
                          itemBuilder: (context, index) {
                            final item = _viewModel.history[index];
                            return Card(
                              margin: const EdgeInsets.only(bottom: 12),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(16),
                              ),
                              child: ListTile(
                                leading: CircleAvatar(
                                  backgroundColor: Colors.blue.shade100,
                                  child: const Icon(
                                    Icons.location_on,
                                    color: Colors.blue,
                                  ),
                                ),
                                title: Text(
                                  item.location,
                                  style: const TextStyle(
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                subtitle: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    if (item.technicianFullName != null)
                                      Text('👨‍🔧 ${item.technicianFullName}'),
                                    if (item.accuracyMeters != null)
                                      Text(
                                        '🎯 Precisión: ${item.accuracyMeters!.toStringAsFixed(0)} m',
                                      ),
                                  ],
                                ),
                                trailing: Text(
                                  _formatDateTime(item.recordedAt),
                                  style: TextStyle(
                                    color: Colors.grey.shade600,
                                    fontSize: 12,
                                  ),
                                ),
                              ),
                            );
                          },
                        ),
                ),
              ],
            );
          },
        ),
      ),
    );
  }

  Widget _buildInfoRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            width: 100,
            child: Text(
              label,
              style: const TextStyle(
                fontWeight: FontWeight.w600,
                color: Colors.grey,
              ),
            ),
          ),
          Expanded(child: Text(value, style: const TextStyle(fontSize: 14))),
        ],
      ),
    );
  }

  Color _getStatusColor(String status) {
    switch (status) {
      case 'ASSIGNED':
        return const Color(0xFF9C27B0);
      case 'EN_ROUTE':
        return const Color(0xFF00BCD4);
      case 'ON_SITE':
        return const Color(0xFF00897B);
      case 'IN_PROGRESS':
        return const Color(0xFF3F51B5);
      case 'COMPLETED':
        return const Color(0xFF4CAF50);
      case 'CANCELLED':
        return const Color(0xFFF44336);
      default:
        return Colors.grey;
    }
  }

  IconData _getStatusIcon(String status) {
    switch (status) {
      case 'ASSIGNED':
        return Icons.person_add;
      case 'EN_ROUTE':
        return Icons.directions_car;
      case 'ON_SITE':
        return Icons.location_on;
      case 'IN_PROGRESS':
        return Icons.build;
      case 'COMPLETED':
        return Icons.check_circle;
      case 'CANCELLED':
        return Icons.cancel;
      default:
        return Icons.info;
    }
  }

  String _getStatusText(String status) {
    switch (status) {
      case 'ASSIGNED':
        return 'Asignado - En espera';
      case 'EN_ROUTE':
        return 'Técnico en camino';
      case 'ON_SITE':
        return 'Técnico en el lugar';
      case 'IN_PROGRESS':
        return 'Servicio en progreso';
      case 'COMPLETED':
        return 'Servicio completado';
      case 'CANCELLED':
        return 'Servicio cancelado';
      default:
        return status;
    }
  }
}
``

---

## mechanic_mobile/lib/presentation/pages/create_incident_page.dart

``dart
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:geolocator/geolocator.dart';
import 'package:mechanic_mobile/core/di/injection_container.dart';
import 'package:mechanic_mobile/domain/usecases/create_incident_usecase.dart';
import 'package:mechanic_mobile/presentation/viewmodels/incidents_viewmodel.dart';
import 'package:mechanic_mobile/presentation/viewmodels/vehicle_viewmodel.dart';

class CreateIncidentPage extends StatefulWidget {
  const CreateIncidentPage({super.key});

  @override
  State<CreateIncidentPage> createState() => _CreateIncidentPageState();
}

class _CreateIncidentPageState extends State<CreateIncidentPage> {
  late IncidentsViewModel _incidentsViewModel;
  late VehicleViewModel _vehicleViewModel;

  final _formKey = GlobalKey<FormState>();
  final _titleController = TextEditingController();
  final _descriptionController = TextEditingController();
  final _addressController = TextEditingController();
  final _latitudeController = TextEditingController();
  final _longitudeController = TextEditingController();

  String? _selectedVehicleId;
  String _selectedCategory = 'BATTERY';
  String _selectedPriority = 'MEDIUM';

  final List<String> _categories = [
    'BATTERY',
    'ENGINE',
    'TIRE',
    'TOWING',
    'LOCKOUT',
    'OVERHEATING',
    'ACCIDENT',
    'ELECTRICAL',
    'FUEL',
  ];
  final List<String> _priorities = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'];

  @override
  void initState() {
    super.initState();
    _incidentsViewModel = sl<IncidentsViewModel>();
    _vehicleViewModel = sl<VehicleViewModel>();
    _vehicleViewModel.loadVehicles();
  }

  @override
  void dispose() {
    _titleController.dispose();
    _descriptionController.dispose();
    _addressController.dispose();
    _latitudeController.dispose();
    _longitudeController.dispose();
    super.dispose();
  }

  void _showSnackBar(String message, {bool isError = false}) {
    ScaffoldMessenger.of(context).hideCurrentSnackBar();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Row(
          children: [
            Icon(
              isError ? Icons.error_outline : Icons.check_circle_outline,
              color: Colors.white,
            ),
            const SizedBox(width: 12),
            Expanded(child: Text(message)),
          ],
        ),
        backgroundColor: isError ? Colors.red.shade700 : Colors.blue.shade700,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        margin: const EdgeInsets.all(12),
        duration: const Duration(seconds: 3),
      ),
    );
  }

  /// Método actualizado usando la API correcta de geolocator
  Future<void> _getCurrentLocation() async {
    try {
      // Verificar si los servicios de ubicación están activos
      bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
      if (!serviceEnabled) {
        _showSnackBar(
          'Los servicios de ubicación están desactivados. Actívalos para continuar.',
          isError: true,
        );
        return;
      }

      // Verificar permisos
      LocationPermission permission = await Geolocator.checkPermission();
      if (permission == LocationPermission.denied) {
        permission = await Geolocator.requestPermission();
        if (permission == LocationPermission.denied) {
          _showSnackBar(
            'Permiso de ubicación denegado. No se puede obtener la ubicación.',
            isError: true,
          );
          return;
        }
      }

      if (permission == LocationPermission.deniedForever) {
        _showSnackBar(
          'Permiso de ubicación denegado permanentemente. Ve a ajustes de la app para habilitarlo.',
          isError: true,
        );
        return;
      }

      _showSnackBar('Obteniendo ubicación...');

      // Configuración de precisión
      const locationSettings = LocationSettings(
        accuracy: LocationAccuracy.high,
        distanceFilter: 100, // metros
      );

      // Obtener posición actual con la API correcta
      Position position = await Geolocator.getCurrentPosition(
        locationSettings: locationSettings,
      );

      // Actualizar campos de latitud y longitud
      setState(() {
        _latitudeController.text = position.latitude.toStringAsFixed(6);
        _longitudeController.text = position.longitude.toStringAsFixed(6);
      });

      _showSnackBar(
        'Ubicación obtenida: ${position.latitude.toStringAsFixed(4)}, ${position.longitude.toStringAsFixed(4)}',
      );
    } catch (e) {
      _showSnackBar('Error al obtener ubicación: $e', isError: true);
    }
  }

  Future<void> _submitForm() async {
    if (!_formKey.currentState!.validate()) return;
    if (_selectedVehicleId == null) {
      _showSnackBar('Selecciona un vehículo', isError: true);
      return;
    }

    final latitude = double.tryParse(_latitudeController.text);
    final longitude = double.tryParse(_longitudeController.text);

    if (latitude == null || longitude == null) {
      _showSnackBar('Ingresa coordenadas válidas', isError: true);
      return;
    }

    final params = CreateIncidentParams(
      vehicleId: _selectedVehicleId!,
      title: _titleController.text.trim(),
      description: _descriptionController.text.trim(),
      reportedCategory: _selectedCategory,
      priority: _selectedPriority,
      incidentLatitude: latitude,
      incidentLongitude: longitude,
      addressReference: _addressController.text.trim(),
    );

    final success = await _incidentsViewModel.createIncident(params);

    if (success && mounted) {
      _showSnackBar('Solicitud creada exitosamente');
      context.go('/incidents');
    } else if (mounted) {
      _showSnackBar(
        _incidentsViewModel.errorMessage ?? 'Error al crear solicitud',
        isError: true,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Nueva Solicitud'),
        backgroundColor: Colors.blue.shade800,
        foregroundColor: Colors.white,
        elevation: 2,
      ),
      body: ListenableBuilder(
        listenable: _vehicleViewModel,
        builder: (context, _) {
          if (_vehicleViewModel.isLoading &&
              _vehicleViewModel.vehicles.isEmpty) {
            return const Center(
              child: CircularProgressIndicator(
                valueColor: AlwaysStoppedAnimation<Color>(Colors.blue),
              ),
            );
          }

          if (_vehicleViewModel.vehicles.isEmpty) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.directions_car,
                    size: 64,
                    color: Colors.blue.shade200,
                  ),
                  const SizedBox(height: 16),
                  const Text(
                    'No tienes vehículos registrados',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.w500),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Registra un vehículo para solicitar auxilio',
                    style: TextStyle(color: Colors.grey.shade500),
                  ),
                  const SizedBox(height: 24),
                  ElevatedButton.icon(
                    onPressed: () {
                      context.push('/vehicles');
                    },
                    icon: const Icon(Icons.add),
                    label: const Text('Registrar Vehículo'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.blue,
                      foregroundColor: Colors.white,
                    ),
                  ),
                ],
              ),
            );
          }

          return SingleChildScrollView(
            padding: const EdgeInsets.all(16),
            child: Form(
              key: _formKey,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Selección de vehículo
                  DropdownButtonFormField<String>(
                    initialValue: _selectedVehicleId,
                    decoration: const InputDecoration(
                      labelText: 'Vehículo *',
                      prefixIcon: Icon(Icons.directions_car),
                      border: OutlineInputBorder(),
                    ),
                    items: _vehicleViewModel.vehicles.map((vehicle) {
                      return DropdownMenuItem(
                        value: vehicle.id,
                        child: Text(
                          '${vehicle.brand} ${vehicle.model} - ${vehicle.plateNumber}',
                        ),
                      );
                    }).toList(),
                    onChanged: (value) =>
                        setState(() => _selectedVehicleId = value),
                    validator: (value) =>
                        value == null ? 'Selecciona un vehículo' : null,
                  ),
                  const SizedBox(height: 16),

                  // Título
                  TextFormField(
                    controller: _titleController,
                    decoration: const InputDecoration(
                      labelText: 'Título *',
                      prefixIcon: Icon(Icons.title),
                      border: OutlineInputBorder(),
                    ),
                    validator: (value) => value == null || value.isEmpty
                        ? 'Campo requerido'
                        : null,
                  ),
                  const SizedBox(height: 16),

                  // Descripción
                  TextFormField(
                    controller: _descriptionController,
                    decoration: const InputDecoration(
                      labelText: 'Descripción *',
                      prefixIcon: Icon(Icons.description),
                      border: OutlineInputBorder(),
                    ),
                    maxLines: 3,
                    validator: (value) => value == null || value.isEmpty
                        ? 'Campo requerido'
                        : null,
                  ),
                  const SizedBox(height: 16),

                  // Categoría
                  DropdownButtonFormField<String>(
                    initialValue: _selectedCategory,
                    decoration: const InputDecoration(
                      labelText: 'Categoría *',
                      prefixIcon: Icon(Icons.category),
                      border: OutlineInputBorder(),
                    ),
                    items: _categories.map((category) {
                      return DropdownMenuItem(
                        value: category,
                        child: Text(category),
                      );
                    }).toList(),
                    onChanged: (value) =>
                        setState(() => _selectedCategory = value!),
                  ),
                  const SizedBox(height: 16),

                  // Prioridad
                  DropdownButtonFormField<String>(
                    initialValue: _selectedPriority,
                    decoration: const InputDecoration(
                      labelText: 'Prioridad *',
                      prefixIcon: Icon(Icons.priority_high),
                      border: OutlineInputBorder(),
                    ),
                    items: _priorities.map((priority) {
                      return DropdownMenuItem(
                        value: priority,
                        child: Text(priority),
                      );
                    }).toList(),
                    onChanged: (value) =>
                        setState(() => _selectedPriority = value!),
                  ),
                  const SizedBox(height: 16),

                  // Dirección
                  TextFormField(
                    controller: _addressController,
                    decoration: InputDecoration(
                      labelText: 'Referencia de dirección',
                      prefixIcon: const Icon(Icons.location_on),
                      border: const OutlineInputBorder(),
                      suffixIcon: IconButton(
                        icon: const Icon(Icons.my_location),
                        onPressed: _getCurrentLocation,
                        tooltip: 'Usar mi ubicación',
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),

                  // Coordenadas
                  Row(
                    children: [
                      Expanded(
                        child: TextFormField(
                          controller: _latitudeController,
                          keyboardType: TextInputType.number,
                          decoration: const InputDecoration(
                            labelText: 'Latitud *',
                            border: OutlineInputBorder(),
                          ),
                          validator: (value) => value == null || value.isEmpty
                              ? 'Campo requerido'
                              : null,
                        ),
                      ),
                      const SizedBox(width: 8),
                      Expanded(
                        child: TextFormField(
                          controller: _longitudeController,
                          keyboardType: TextInputType.number,
                          decoration: const InputDecoration(
                            labelText: 'Longitud *',
                            border: OutlineInputBorder(),
                          ),
                          validator: (value) => value == null || value.isEmpty
                              ? 'Campo requerido'
                              : null,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 32),

                  // Botón de enviar
                  ListenableBuilder(
                    listenable: _incidentsViewModel,
                    builder: (context, _) {
                      return SizedBox(
                        width: double.infinity,
                        child: ElevatedButton(
                          onPressed: _incidentsViewModel.isLoading
                              ? null
                              : _submitForm,
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.blue.shade800,
                            foregroundColor: Colors.white,
                            padding: const EdgeInsets.symmetric(vertical: 16),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(12),
                            ),
                          ),
                          child: _incidentsViewModel.isLoading
                              ? const SizedBox(
                                  height: 20,
                                  width: 20,
                                  child: CircularProgressIndicator(
                                    strokeWidth: 2,
                                    valueColor: AlwaysStoppedAnimation<Color>(
                                      Colors.white,
                                    ),
                                  ),
                                )
                              : const Text(
                                  'Enviar Solicitud',
                                  style: TextStyle(
                                    fontSize: 16,
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                        ),
                      );
                    },
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
``

---

## mechanic_mobile/lib/presentation/pages/devices_page.dart

``dart
import 'package:flutter/material.dart';
import 'package:mechanic_mobile/core/di/injection_container.dart';
import 'package:mechanic_mobile/domain/entities/device_token.dart';
import '../../domain/usecases/get_my_devices_usecase.dart';
import '../../domain/usecases/unregister_device_usecase.dart';

class DevicesPage extends StatefulWidget {
  const DevicesPage({super.key});

  @override
  State<DevicesPage> createState() => _DevicesPageState();
}

class _DevicesPageState extends State<DevicesPage> {
  late GetMyDevicesUseCase _getMyDevicesUseCase;
  late UnregisterDeviceUseCase _unregisterDeviceUseCase;
  List<DeviceToken> _devices = [];
  bool _isLoading = false;
  String? _errorMessage;

  @override
  void initState() {
    super.initState();
    _getMyDevicesUseCase = sl<GetMyDevicesUseCase>();
    _unregisterDeviceUseCase = sl<UnregisterDeviceUseCase>();
    _loadDevices();
  }

  Future<void> _loadDevices() async {
    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    try {
      _devices = await _getMyDevicesUseCase.execute();
    } catch (e) {
      _errorMessage = e.toString();
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  Future<void> _unregisterDevice(String deviceId) async {
    try {
      await _unregisterDeviceUseCase.execute(deviceId);
      await _loadDevices();
      _showSnackBar('Dispositivo desvinculado exitosamente');
    } catch (e) {
      _showSnackBar('Error al desvincular: $e', isError: true);
    }
  }

  void _showSnackBar(String message, {bool isError = false}) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor: isError ? Colors.red.shade700 : Colors.green.shade700,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Mis Dispositivos'),
        backgroundColor: Colors.blue.shade800,
        foregroundColor: Colors.white,
        elevation: 2,
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : _errorMessage != null
          ? Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.error_outline,
                    size: 64,
                    color: Colors.red.shade300,
                  ),
                  const SizedBox(height: 16),
                  Text(_errorMessage!),
                  const SizedBox(height: 16),
                  ElevatedButton(
                    onPressed: _loadDevices,
                    child: const Text('Reintentar'),
                  ),
                ],
              ),
            )
          : _devices.isEmpty
          ? Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.close, size: 64, color: Colors.grey.shade400),
                  const SizedBox(height: 16),
                  Text(
                    'No hay dispositivos vinculados',
                    style: TextStyle(fontSize: 18, color: Colors.grey.shade600),
                  ),
                ],
              ),
            )
          : ListView.builder(
              padding: const EdgeInsets.all(12),
              itemCount: _devices.length,
              itemBuilder: (context, index) {
                final device = _devices[index];
                return Card(
                  margin: const EdgeInsets.only(bottom: 12),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: ListTile(
                    leading: CircleAvatar(
                      backgroundColor: device.isActive
                          ? Colors.green.shade100
                          : Colors.red.shade100,
                      child: Text(
                        device.platformIcon,
                        style: const TextStyle(fontSize: 20),
                      ),
                    ),
                    title: Text(device.devicePlatform),
                    subtitle: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Rol: ${device.appRole}'),
                        Text('Estado: ${device.statusText}'),
                        Text('Último uso: ${_formatDate(device.lastSeenAt)}'),
                      ],
                    ),
                    trailing: device.isActive
                        ? IconButton(
                            icon: const Icon(
                              Icons.delete_outline,
                              color: Colors.red,
                            ),
                            onPressed: () => _unregisterDevice(device.id),
                            tooltip: 'Desvincular',
                          )
                        : null,
                    isThreeLine: true,
                  ),
                );
              },
            ),
    );
  }

  String _formatDate(DateTime date) {
    return '${date.day}/${date.month}/${date.year} ${date.hour}:${date.minute.toString().padLeft(2, '0')}';
  }
}
``

---

## mechanic_mobile/lib/presentation/pages/home_page.dart

``dart
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../viewmodels/auth_viewmodel.dart';
import '../../core/di/injection_container.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  late AuthViewModel _authViewModel;

  @override
  void initState() {
    super.initState();
    _authViewModel = sl<AuthViewModel>();

    if (_authViewModel.user == null) {
      _authViewModel.loadMe();
    }
  }

  void _showInfoSnackBar(String message, {bool isError = false}) {
    ScaffoldMessenger.of(context).hideCurrentSnackBar();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Row(
          children: [
            Icon(
              isError ? Icons.error_outline : Icons.check_circle_outline,
              color: Colors.white,
            ),
            const SizedBox(width: 12),
            Expanded(child: Text(message)),
          ],
        ),
        backgroundColor: isError ? Colors.red.shade700 : Colors.blue.shade700,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        margin: const EdgeInsets.all(12),
        duration: const Duration(seconds: 3),
      ),
    );
  }

  void _logout() {
    _authViewModel.logout();
    _showInfoSnackBar('Sesión cerrada correctamente');
    context.go('/login');
  }

  String? _getUserRole(List<String>? roleCodes) {
    if (roleCodes == null || roleCodes.isEmpty) return null;
    return roleCodes.first;
  }

  String _getRoleDisplayName(List<String>? roleCodes) {
    final role = _getUserRole(roleCodes);
    switch (role) {
      case 'PROVIDER_ADMIN':
        return 'Taller / Proveedor';
      case 'CLIENT':
        return 'Cliente';
      case 'PLATFORM_ADMIN':
        return 'Administrador';
      case 'TECHNICIAN':
        return 'Técnico';
      default:
        return 'Usuario';
    }
  }

  bool _hasRole(List<String>? roleCodes, String role) {
    return roleCodes?.contains(role) ?? false;
  }

  @override
  Widget build(BuildContext context) {
    final userRole = _getUserRole(_authViewModel.user?.roleCodes);
    final isClient = _hasRole(_authViewModel.user?.roleCodes, 'CLIENT');
    final isAdmin = _hasRole(_authViewModel.user?.roleCodes, 'PLATFORM_ADMIN');
    final isProvider = _hasRole(
      _authViewModel.user?.roleCodes,
      'PROVIDER_ADMIN',
    );

    return Scaffold(
      appBar: AppBar(
        title: const Text('Inicio'),
        backgroundColor: Colors.blue.shade800,
        foregroundColor: Colors.white,
        elevation: 2,
      ),
      drawer: _buildDrawer(context, userRole, isClient, isAdmin, isProvider),
      body: _buildCalendar(),
    );
  }

  Widget _buildCalendar() {
    final now = DateTime.now();
    final weekdays = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'];
    final months = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];

    return Center(
      child: Card(
        elevation: 6,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
        margin: const EdgeInsets.all(24),
        child: Container(
          padding: const EdgeInsets.all(24),
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [Colors.blue.shade50, Colors.white],
            ),
            borderRadius: BorderRadius.circular(24),
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Icon(Icons.calendar_today, size: 48, color: Colors.blue),
              const SizedBox(height: 16),
              Text(
                '${weekdays[now.weekday - 1]}, ${now.day} de ${months[now.month - 1]}',
                style: const TextStyle(
                  fontSize: 22,
                  fontWeight: FontWeight.bold,
                  color: Colors.blue,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                now.year.toString(),
                style: TextStyle(fontSize: 16, color: Colors.grey.shade600),
              ),
              const Divider(height: 32),
              Text(
                'Bienvenido a la plataforma de asistencia vehicular',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 14, color: Colors.grey.shade700),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildDrawer(
    BuildContext context,
    String? userRole,
    bool isClient,
    bool isAdmin,
    bool isProvider,
  ) {
    return Drawer(
      child: Container(
        color: Colors.blue.shade50,
        child: Column(
          children: [
            DrawerHeader(
              decoration: BoxDecoration(color: Colors.blue.shade800),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  CircleAvatar(
                    radius: 24,
                    backgroundColor: Colors.white,
                    child: Icon(
                      _getRoleIcon(userRole),
                      size: 28,
                      color: Colors.blue.shade800,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Flexible(
                    child: Text(
                      _authViewModel.user?.fullName ?? 'Cargando...',
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 15,
                        fontWeight: FontWeight.bold,
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                  const SizedBox(height: 2),
                  Flexible(
                    child: Text(
                      _authViewModel.user?.email ?? '',
                      style: TextStyle(
                        color: Colors.blue.shade100,
                        fontSize: 11,
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 6,
                      vertical: 2,
                    ),
                    decoration: BoxDecoration(
                      color: Colors.white24,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      _getRoleDisplayName(_authViewModel.user?.roleCodes),
                      style: const TextStyle(color: Colors.white, fontSize: 10),
                    ),
                  ),
                ],
              ),
            ),
            _buildDrawerItem(
              icon: Icons.home,
              title: 'Inicio',
              onTap: () {
                context.pop();
              },
            ),
            if (isClient)
              _buildDrawerItem(
                icon: Icons.directions_car,
                title: 'Mis vehículos',
                onTap: () {
                  context.pop();
                  context.push('/vehicles');
                },
              ),
            if (isProvider)
              _buildDrawerItem(
                icon: Icons.construction,
                title: 'Mis Técnicos',
                onTap: () {
                  context.pop();
                  context.push('/technicians');
                },
              ),
            if (isProvider)
              _buildDrawerItem(
                icon: Icons.business,
                title: 'Mi Taller',
                onTap: () {
                  context.pop();
                  context.push('/provider-profile');
                },
              ),
            if (isAdmin)
              _buildDrawerItem(
                icon: Icons.business_center,
                title: 'Proveedores',
                onTap: () {
                  context.pop();
                  context.push('/admin/providers');
                },
              ),
            if (isProvider)
              _buildDrawerItem(
                icon: Icons.miscellaneous_services,
                title: 'Servicios',
                onTap: () {
                  context.pop();
                  context.push('/catalog-services');
                },
              ),
            if (isAdmin)
              _buildDrawerItem(
                icon: Icons.admin_panel_settings,
                title: 'Panel de Control',
                onTap: () {
                  context.pop();
                  context.push('/admin/incidents');
                },
              ),
            if (isProvider)
              _buildDrawerItem(
                icon: Icons.list_alt,
                title: 'Solicitudes Disponibles',
                onTap: () {
                  context.pop();
                  context.push('/provider/available-requests');
                },
              ),
            if (isProvider)
              _buildDrawerItem(
                icon: Icons.engineering,
                title: 'Operaciones Activas',
                onTap: () {
                  context.pop();
                  context.push('/provider/active-operations');
                },
              ),
            if (isClient)
              _buildDrawerItem(
                icon: Icons.list_alt,
                title: 'Mis Solicitudes',
                onTap: () {
                  context.pop();
                  context.push('/incidents');
                },
              ),
            _buildDrawerItem(
              icon: Icons.notifications,
              title: 'Mis Dispositivos',
              onTap: () {
                context.pop();
                context.push('/devices');
              },
            ),
            _buildDrawerItem(
              icon: Icons.map,
              title: 'Mapa de prueba',
              onTap: () {
                context.pop();
                context.push('/map');
              },
            ),
            const Divider(),
            _buildDrawerItem(
              icon: Icons.logout,
              title: 'Cerrar sesión',
              onTap: _logout,
              isDestructive: true,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDrawerItem({
    required IconData icon,
    required String title,
    required VoidCallback onTap,
    bool isDestructive = false,
  }) {
    return ListTile(
      leading: Icon(
        icon,
        color: isDestructive ? Colors.red.shade700 : Colors.blue.shade700,
      ),
      title: Text(
        title,
        style: TextStyle(
          color: isDestructive ? Colors.red.shade700 : Colors.grey.shade800,
          fontWeight: isDestructive ? FontWeight.w500 : null,
        ),
      ),
      onTap: onTap,
      hoverColor: Colors.blue.shade50,
      splashColor: Colors.blue.shade100,
    );
  }

  IconData _getRoleIcon(String? roleCode) {
    switch (roleCode) {
      case 'PROVIDER_ADMIN':
        return Icons.build_circle;
      case 'CLIENT':
        return Icons.person;
      case 'PLATFORM_ADMIN':
        return Icons.admin_panel_settings;
      case 'TECHNICIAN':
        return Icons.handyman;
      default:
        return Icons.person;
    }
  }
}
``

---

## mechanic_mobile/lib/presentation/pages/incident_detail_page.dart

``dart
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../domain/entities/incident.dart';

class IncidentDetailPage extends StatefulWidget {
  final Incident? incident;

  const IncidentDetailPage({super.key, this.incident});

  @override
  State<IncidentDetailPage> createState() => _IncidentDetailPageState();
}

class _IncidentDetailPageState extends State<IncidentDetailPage> {
  late Incident _incident;

  @override
  void initState() {
    super.initState();
    if (widget.incident == null) {
      // Si no se pasa el incidente, podrías cargarlo desde un ID
      // Por ahora, mostramos error
      _incident = widget.incident!;
    } else {
      _incident = widget.incident!;
    }
  }

  String _formatDate(DateTime? date) {
    if (date == null) return 'N/A';
    return '${date.day}/${date.month}/${date.year} ${date.hour}:${date.minute.toString().padLeft(2, '0')}';
  }

  Color _getStatusColor(String status) {
    switch (status) {
      case 'PENDING':
        return Colors.orange;
      case 'PUBLISHED':
        return Colors.blue;
      case 'ASSIGNED':
        return Colors.purple;
      case 'EN_ROUTE':
        return Colors.cyan;
      case 'ON_SITE':
        return Colors.teal;
      case 'IN_PROGRESS':
        return Colors.indigo;
      case 'COMPLETED':
        return Colors.green;
      case 'CANCELLED':
        return Colors.red;
      default:
        return Colors.grey;
    }
  }

  Color _getPriorityColor(String priority) {
    switch (priority) {
      case 'LOW':
        return Colors.green;
      case 'MEDIUM':
        return Colors.orange;
      case 'HIGH':
        return Colors.red;
      case 'URGENT':
        return Colors.purple;
      default:
        return Colors.grey;
    }
  }

  Widget _buildInfoRow(String label, String value, {IconData? icon}) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (icon != null)
            Padding(
              padding: const EdgeInsets.only(right: 12),
              child: Icon(icon, size: 20, color: Colors.blue.shade700),
            ),
          SizedBox(
            width: 120,
            child: Text(
              label,
              style: const TextStyle(
                fontWeight: FontWeight.w600,
                color: Colors.grey,
              ),
            ),
          ),
          Expanded(child: Text(value, style: const TextStyle(fontSize: 14))),
        ],
      ),
    );
  }

  Widget _buildTimelineItem(
    String label,
    DateTime? date,
    IconData icon, {
    bool isCompleted = false,
  }) {
    final color = isCompleted && date != null
        ? Colors.green
        : Colors.grey.shade400;

    return Column(
      children: [
        Row(
          children: [
            Container(
              width: 32,
              height: 32,
              decoration: BoxDecoration(
                color: color.withValues(alpha: 0.2),
                shape: BoxShape.circle,
              ),
              child: Icon(icon, size: 18, color: color),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    label,
                    style: TextStyle(fontWeight: FontWeight.w500, color: color),
                  ),
                  if (date != null)
                    Text(
                      _formatDate(date),
                      style: TextStyle(
                        fontSize: 12,
                        color: Colors.grey.shade500,
                      ),
                    ),
                ],
              ),
            ),
          ],
        ),
        const SizedBox(height: 16),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Detalle de Solicitud'),
        backgroundColor: Colors.blue.shade800,
        foregroundColor: Colors.white,
        elevation: 2,
      ),
      // En el AppBar o en un FloatingActionButton
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () async {
          final result = await context.push('/add-evidence/${_incident.id}');
          if (result == true) {
            // Recargar datos si es necesario
          }
        },
        icon: const Icon(Icons.add),
        label: const Text('Agregar Evidencia'),
        backgroundColor: Colors.blue.shade700,
        foregroundColor: Colors.white,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Estado y Prioridad
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 6,
                  ),
                  decoration: BoxDecoration(
                    color: _getStatusColor(
                      _incident.status,
                    ).withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(
                        Icons.circle,
                        size: 10,
                        color: _getStatusColor(_incident.status),
                      ),

                      const SizedBox(width: 6),
                      Text(
                        _incident.status,
                        style: TextStyle(
                          color: _getStatusColor(_incident.status),
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(width: 12),
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 6,
                  ),
                  decoration: BoxDecoration(
                    color: _getPriorityColor(
                      _incident.priority,
                    ).withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(
                        Icons.priority_high,
                        size: 14,
                        color: _getPriorityColor(_incident.priority),
                      ),
                      const SizedBox(width: 6),
                      Text(
                        _incident.priority,
                        style: TextStyle(
                          color: _getPriorityColor(_incident.priority),
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 24),

            // Información del incidente
            Card(
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(16),
              ),
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Información de la Solicitud',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const Divider(),
                    _buildInfoRow('Título', _incident.title, icon: Icons.title),
                    _buildInfoRow(
                      'Descripción',
                      _incident.description,
                      icon: Icons.description,
                    ),
                    _buildInfoRow(
                      'Categoría',
                      _incident.reportedCategory,
                      icon: Icons.category,
                    ),
                    if (_incident.addressReference != null)
                      _buildInfoRow(
                        'Dirección',
                        _incident.addressReference!,
                        icon: Icons.location_on,
                      ),
                    if (_incident.incidentLatitude != null &&
                        _incident.incidentLongitude != null)
                      _buildInfoRow(
                        'Coordenadas',
                        _incident.location,
                        icon: Icons.public,
                      ),
                    _buildInfoRow(
                      'Fecha',
                      _formatDate(_incident.createdAt),
                      icon: Icons.calendar_today,
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),

            // Información del vehículo
            if (_incident.vehicle != null)
              Card(
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Vehículo',
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const Divider(),
                      _buildInfoRow(
                        'Marca',
                        _incident.vehicle!.brand,
                        icon: Icons.directions_car,
                      ),
                      _buildInfoRow('Modelo', _incident.vehicle!.model),
                      _buildInfoRow('Placa', _incident.vehicle!.plateNumber),
                      _buildInfoRow('Año', _incident.vehicle!.year.toString()),
                      _buildInfoRow('Color', _incident.vehicle!.color),
                    ],
                  ),
                ),
              ),
            const SizedBox(height: 16),

            // Información del proveedor/taller
            if (_incident.provider != null)
              Card(
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Taller Asignado',
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const Divider(),
                      _buildInfoRow(
                        'Nombre',
                        _incident.provider!.businessName,
                        icon: Icons.business,
                      ),
                      if (_incident.provider!.contactPhone != null)
                        _buildInfoRow(
                          'Teléfono',
                          _incident.provider!.contactPhone!,
                          icon: Icons.phone,
                        ),
                      if (_incident.provider!.city != null)
                        _buildInfoRow(
                          'Ciudad',
                          _incident.provider!.city!,
                          icon: Icons.location_city,
                        ),
                    ],
                  ),
                ),
              ),
            const SizedBox(height: 16),

            // Información del técnico
            if (_incident.assignedTechnician != null)
              Card(
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Técnico Asignado',
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const Divider(),
                      _buildInfoRow(
                        'Nombre',
                        _incident.assignedTechnician!.fullName,
                        icon: Icons.person,
                      ),
                      if (_incident.assignedTechnician!.phoneNumber != null)
                        _buildInfoRow(
                          'Teléfono',
                          _incident.assignedTechnician!.phoneNumber!,
                          icon: Icons.phone,
                        ),
                      if (_incident.assignedTechnician!.specialty != null)
                        _buildInfoRow(
                          'Especialidad',
                          _incident.assignedTechnician!.specialty!,
                          icon: Icons.build,
                        ),
                    ],
                  ),
                ),
              ),
            const SizedBox(height: 16),

            // Ruta y ETA
            if (_incident.routeDistanceKm != null)
              Card(
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Información de Ruta',
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const Divider(),
                      _buildInfoRow(
                        'Distancia',
                        '${_incident.routeDistanceKm!.toStringAsFixed(1)} km',
                        icon: Icons.route,
                      ),
                      _buildInfoRow(
                        'ETA estimado',
                        '${_incident.routeEtaMinutes} minutos',
                        icon: Icons.timer,
                      ),
                      if (_incident.responderLastLatitude != null)
                        _buildInfoRow(
                          'Ubicación del respondedor',
                          '${_incident.responderLastLatitude!.toStringAsFixed(4)}, ${_incident.responderLastLongitude!.toStringAsFixed(4)}',
                          icon: Icons.location_searching,
                        ),
                    ],
                  ),
                ),
              ),
            const SizedBox(height: 16),

            // Timeline de estados
            Card(
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(16),
              ),
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Línea de Tiempo',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const Divider(),
                    _buildTimelineItem(
                      'Solicitud creada',
                      _incident.requestedAt ?? _incident.createdAt,
                      Icons.add_circle_outline,
                      isCompleted: true,
                    ),
                    if (_incident.assignedAt != null)
                      _buildTimelineItem(
                        'Asignado a taller',
                        _incident.assignedAt,
                        Icons.assignment_ind,
                        isCompleted: true,
                      ),
                    if (_incident.enRouteAt != null)
                      _buildTimelineItem(
                        'Técnico en camino',
                        _incident.enRouteAt,
                        Icons.directions_car,
                        isCompleted: true,
                      ),
                    if (_incident.arrivedAt != null)
                      _buildTimelineItem(
                        'Técnico en el lugar',
                        _incident.arrivedAt,
                        Icons.location_on,
                        isCompleted: true,
                      ),
                    if (_incident.startedAt != null)
                      _buildTimelineItem(
                        'Servicio iniciado',
                        _incident.startedAt,
                        Icons.build,
                        isCompleted: true,
                      ),
                    if (_incident.completedAt != null)
                      _buildTimelineItem(
                        'Servicio completado',
                        _incident.completedAt,
                        Icons.check_circle,
                        isCompleted: true,
                      ),
                    if (_incident.cancelledAt != null)
                      _buildTimelineItem(
                        'Solicitud cancelada',
                        _incident.cancelledAt,
                        Icons.cancel,
                        isCompleted: true,
                      ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 32),
          ],
        ),
      ),
    );
  }
}
``

---

## mechanic_mobile/lib/presentation/pages/incidents_page.dart

``dart
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:mechanic_mobile/core/di/injection_container.dart';
import 'package:mechanic_mobile/domain/entities/incident.dart';
import 'package:mechanic_mobile/domain/usecases/update_incident_usecase.dart';
import '../viewmodels/incidents_viewmodel.dart';

class IncidentsPage extends StatefulWidget {
  const IncidentsPage({super.key});

  @override
  State<IncidentsPage> createState() => _IncidentsPageState();
}

class _IncidentsPageState extends State<IncidentsPage> {
  late IncidentsViewModel _viewModel;
  String _selectedTab = 'active';

  @override
  void initState() {
    super.initState();
    _viewModel = sl<IncidentsViewModel>();
    _viewModel.loadIncidents();
  }

  void _showSnackBar(String message, {bool isError = false}) {
    ScaffoldMessenger.of(context).hideCurrentSnackBar();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Row(
          children: [
            Icon(
              isError ? Icons.error_outline : Icons.check_circle_outline,
              color: Colors.white,
            ),
            const SizedBox(width: 12),
            Expanded(child: Text(message)),
          ],
        ),
        backgroundColor: isError ? Colors.red.shade700 : Colors.blue.shade700,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        margin: const EdgeInsets.all(12),
        duration: const Duration(seconds: 3),
      ),
    );
  }

  void _showCancelDialog(String incidentId) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Cancelar solicitud'),
        content: const Text(
          '¿Estás seguro de que deseas cancelar esta solicitud? Esta acción no se puede deshacer.',
        ),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('No'),
          ),
          ElevatedButton(
            onPressed: () async {
              Navigator.pop(context);
              final success = await _viewModel.cancelIncident(incidentId);
              if (success) {
                _showSnackBar('Solicitud cancelada exitosamente');
              } else {
                _showSnackBar(
                  _viewModel.errorMessage ?? 'Error al cancelar',
                  isError: true,
                );
              }
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.red.shade700,
              foregroundColor: Colors.white,
            ),
            child: const Text('Sí, cancelar'),
          ),
        ],
      ),
    );
  }

  void _showEditIncidentDialog(Incident incident) {
    final formKey = GlobalKey<FormState>();
    final titleController = TextEditingController(text: incident.title);
    final descriptionController = TextEditingController(
      text: incident.description,
    );
    String selectedCategory = incident.reportedCategory;
    String selectedPriority = incident.priority;
    final addressController = TextEditingController(
      text: incident.addressReference ?? '',
    );
    final latitudeController = TextEditingController(
      text: incident.incidentLatitude?.toString() ?? '',
    );
    final longitudeController = TextEditingController(
      text: incident.incidentLongitude?.toString() ?? '',
    );

    final categories = [
      'BATTERY',
      'ENGINE',
      'TIRE',
      'TOWING',
      'LOCKOUT',
      'OVERHEATING',
      'ACCIDENT',
      'ELECTRICAL',
      'FUEL',
    ];
    final priorities = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'];

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Row(
          children: [
            Icon(Icons.edit, color: Colors.blue.shade800),
            const SizedBox(width: 8),
            const Text('Editar Solicitud'),
          ],
        ),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        content: SingleChildScrollView(
          child: Form(
            key: formKey,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextFormField(
                  controller: titleController,
                  decoration: const InputDecoration(
                    labelText: 'Título',
                    prefixIcon: Icon(Icons.title),
                    border: OutlineInputBorder(),
                  ),
                  validator: (value) =>
                      value == null || value.isEmpty ? 'Campo requerido' : null,
                ),
                const SizedBox(height: 12),
                TextFormField(
                  controller: descriptionController,
                  decoration: const InputDecoration(
                    labelText: 'Descripción',
                    prefixIcon: Icon(Icons.description),
                    border: OutlineInputBorder(),
                  ),
                  maxLines: 3,
                  validator: (value) =>
                      value == null || value.isEmpty ? 'Campo requerido' : null,
                ),
                const SizedBox(height: 12),
                DropdownButtonFormField<String>(
                  initialValue: selectedCategory,
                  decoration: const InputDecoration(
                    labelText: 'Categoría',
                    prefixIcon: Icon(Icons.category),
                    border: OutlineInputBorder(),
                  ),
                  items: categories.map((category) {
                    return DropdownMenuItem(
                      value: category,
                      child: Text(category),
                    );
                  }).toList(),
                  onChanged: (value) => selectedCategory = value!,
                ),
                const SizedBox(height: 12),
                DropdownButtonFormField<String>(
                  initialValue: selectedPriority,
                  decoration: const InputDecoration(
                    labelText: 'Prioridad',
                    prefixIcon: Icon(Icons.priority_high),
                    border: OutlineInputBorder(),
                  ),
                  items: priorities.map((priority) {
                    return DropdownMenuItem(
                      value: priority,
                      child: Text(priority),
                    );
                  }).toList(),
                  onChanged: (value) => selectedPriority = value!,
                ),
                const SizedBox(height: 12),
                TextFormField(
                  controller: addressController,
                  decoration: const InputDecoration(
                    labelText: 'Referencia de dirección',
                    prefixIcon: Icon(Icons.location_on),
                    border: OutlineInputBorder(),
                  ),
                ),
                const SizedBox(height: 12),
                Row(
                  children: [
                    Expanded(
                      child: TextFormField(
                        controller: latitudeController,
                        keyboardType: TextInputType.number,
                        decoration: const InputDecoration(
                          labelText: 'Latitud',
                          border: OutlineInputBorder(),
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: TextFormField(
                        controller: longitudeController,
                        keyboardType: TextInputType.number,
                        decoration: const InputDecoration(
                          labelText: 'Longitud',
                          border: OutlineInputBorder(),
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancelar'),
          ),
          ElevatedButton(
            onPressed: () async {
              if (formKey.currentState!.validate()) {
                Navigator.pop(context);
                final success = await _viewModel.updateIncident(
                  incident.id,
                  UpdateIncidentParams(
                    title: titleController.text.trim(),
                    description: descriptionController.text.trim(),
                    reportedCategory: selectedCategory,
                    priority: selectedPriority,
                    addressReference: addressController.text.trim().isEmpty
                        ? null
                        : addressController.text.trim(),
                    incidentLatitude: double.tryParse(latitudeController.text),
                    incidentLongitude: double.tryParse(
                      longitudeController.text,
                    ),
                  ),
                );
                if (success) {
                  _showSnackBar('Solicitud actualizada exitosamente');
                } else {
                  _showSnackBar(
                    _viewModel.errorMessage ?? 'Error al actualizar',
                    isError: true,
                  );
                }
                _viewModel.clearError();
              }
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.blue.shade800,
              foregroundColor: Colors.white,
            ),
            child: const Text('Guardar Cambios'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Mis Solicitudes'),
        backgroundColor: Colors.blue.shade800,
        foregroundColor: Colors.white,
        elevation: 2,
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () => _viewModel.loadIncidents(),
            tooltip: 'Actualizar',
          ),
        ],
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(48),
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Row(
              children: [
                Expanded(
                  child: SegmentedButton<String>(
                    segments: const [
                      ButtonSegment(value: 'active', label: Text('Activas')),
                      ButtonSegment(value: 'history', label: Text('Historial')),
                    ],
                    selected: {_selectedTab},
                    onSelectionChanged: (Set<String> selection) {
                      setState(() {
                        _selectedTab = selection.first;
                      });
                    },
                    style: ButtonStyle(
                      backgroundColor: WidgetStateProperty.resolveWith((
                        states,
                      ) {
                        if (states.contains(WidgetState.selected)) {
                          return Colors.blue.shade700;
                        }
                        return Colors.transparent;
                      }),
                      foregroundColor: WidgetStateProperty.resolveWith((
                        states,
                      ) {
                        if (states.contains(WidgetState.selected)) {
                          return Colors.white;
                        }
                        return Colors.blue.shade700;
                      }),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
      body: ListenableBuilder(
        listenable: _viewModel,
        builder: (context, _) {
          if (_viewModel.isLoading &&
              (_selectedTab == 'active'
                  ? _viewModel.activeIncidents.isEmpty
                  : _viewModel.completedIncidents.isEmpty)) {
            return const Center(
              child: CircularProgressIndicator(
                valueColor: AlwaysStoppedAnimation<Color>(Colors.blue),
              ),
            );
          }

          if (_viewModel.errorMessage != null) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.error_outline,
                    size: 64,
                    color: Colors.red.shade300,
                  ),
                  const SizedBox(height: 16),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 32),
                    child: Text(
                      _viewModel.errorMessage!,
                      style: TextStyle(color: Colors.grey.shade600),
                      textAlign: TextAlign.center,
                    ),
                  ),
                  const SizedBox(height: 16),
                  ElevatedButton.icon(
                    onPressed: () => _viewModel.loadIncidents(),
                    icon: const Icon(Icons.refresh),
                    label: const Text('Reintentar'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.blue,
                      foregroundColor: Colors.white,
                    ),
                  ),
                ],
              ),
            );
          }

          final incidents = _selectedTab == 'active'
              ? _viewModel.activeIncidents
              : _viewModel.completedIncidents;

          if (incidents.isEmpty) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    _selectedTab == 'active' ? Icons.inbox : Icons.history,
                    size: 64,
                    color: Colors.blue.shade200,
                  ),
                  const SizedBox(height: 16),
                  Text(
                    _selectedTab == 'active'
                        ? 'No hay solicitudes activas'
                        : 'No hay solicitudes en el historial',
                    style: TextStyle(
                      fontSize: 18,
                      color: Colors.grey.shade600,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  const SizedBox(height: 8),
                  if (_selectedTab == 'active')
                    Text(
                      'Toca el botón + para solicitar auxilio',
                      style: TextStyle(color: Colors.grey.shade500),
                    ),
                ],
              ),
            );
          }

          return RefreshIndicator(
            onRefresh: () => _viewModel.loadIncidents(),
            color: Colors.blue,
            child: ListView.builder(
              padding: const EdgeInsets.all(12),
              itemCount: incidents.length,
              itemBuilder: (context, index) {
                final incident = incidents[index];
                return _buildIncidentCard(incident);
              },
            ),
          );
        },
      ),
      floatingActionButton: _selectedTab == 'active'
          ? FloatingActionButton.extended(
              onPressed: () {
                context.push('/create-incident');
              },
              icon: const Icon(Icons.add),
              label: const Text('Nueva solicitud'),
              backgroundColor: Colors.blue.shade700,
              foregroundColor: Colors.white,
            )
          : null,
      floatingActionButtonLocation: FloatingActionButtonLocation.endFloat,
    );
  }

  Widget _buildIncidentCard(Incident incident) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      elevation: 4,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
        side: BorderSide(
          color: _getStatusColor(incident.status).withValues(alpha: 0.3),
          width: 1,
        ),
      ),
      child: InkWell(
        onTap: () {
          context.push('/incident-detail/${incident.id}', extra: incident);
        },
        borderRadius: BorderRadius.circular(16),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: _getStatusColor(
                        incident.status,
                      ).withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      incident.statusIcon,
                      style: const TextStyle(fontSize: 20),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          incident.title,
                          style: const TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                          ),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                        const SizedBox(height: 4),
                        Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 8,
                            vertical: 2,
                          ),
                          decoration: BoxDecoration(
                            color: _getStatusColor(
                              incident.status,
                            ).withValues(alpha: 0.1),
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Text(
                            incident.status,
                            style: TextStyle(
                              fontSize: 12,
                              color: _getStatusColor(incident.status),
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  if (incident.canBeCancelled)
                    IconButton(
                      icon: Icon(
                        Icons.cancel_outlined,
                        color: Colors.red.shade400,
                        size: 20,
                      ),
                      onPressed: () => _showCancelDialog(incident.id),
                      tooltip: 'Cancelar solicitud',
                    ),
                  if (incident.status == 'PENDING')
                    IconButton(
                      icon: Icon(
                        Icons.edit,
                        color: Colors.blue.shade700,
                        size: 20,
                      ),
                      onPressed: () => _showEditIncidentDialog(incident),
                      tooltip: 'Editar solicitud',
                    ),
                ],
              ),
              const SizedBox(height: 12),
              Row(
                children: [
                  Icon(Icons.category, size: 14, color: Colors.grey.shade500),
                  const SizedBox(width: 4),
                  Text(
                    incident.reportedCategory,
                    style: TextStyle(fontSize: 12, color: Colors.grey.shade600),
                  ),
                  const SizedBox(width: 16),
                  Icon(
                    Icons.priority_high,
                    size: 14,
                    color: Colors.grey.shade500,
                  ),
                  const SizedBox(width: 4),
                  Text(
                    incident.priority,
                    style: TextStyle(
                      fontSize: 12,
                      color: _getPriorityColor(incident.priority),
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Row(
                children: [
                  Icon(
                    Icons.location_on,
                    size: 14,
                    color: Colors.grey.shade500,
                  ),
                  const SizedBox(width: 4),
                  Expanded(
                    child: Text(
                      incident.addressReference ?? 'Sin dirección especificada',
                      style: TextStyle(
                        fontSize: 12,
                        color: Colors.grey.shade600,
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ],
              ),
              if (incident.hasProvider) ...[
                const SizedBox(height: 8),
                Row(
                  children: [
                    Icon(Icons.business, size: 14, color: Colors.grey.shade500),
                    const SizedBox(width: 4),
                    Expanded(
                      child: Text(
                        incident.provider?.businessName ?? 'Taller asignado',
                        style: TextStyle(
                          fontSize: 12,
                          color: Colors.grey.shade600,
                        ),
                      ),
                    ),
                  ],
                ),
              ],
              if (incident.routeDistanceKm != null) ...[
                const SizedBox(height: 8),
                Row(
                  children: [
                    Icon(Icons.route, size: 14, color: Colors.grey.shade500),
                    const SizedBox(width: 4),
                    Text(
                      '${incident.routeDistanceKm?.toStringAsFixed(1)} km · ${incident.routeEtaMinutes} min ETA',
                      style: TextStyle(
                        fontSize: 12,
                        color: Colors.grey.shade600,
                      ),
                    ),
                  ],
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }

  Color _getStatusColor(String status) {
    switch (status) {
      case 'PENDING':
        return Colors.orange;
      case 'PUBLISHED':
        return Colors.blue;
      case 'ASSIGNED':
        return Colors.purple;
      case 'EN_ROUTE':
        return Colors.cyan;
      case 'ON_SITE':
        return Colors.teal;
      case 'IN_PROGRESS':
        return Colors.indigo;
      case 'COMPLETED':
        return Colors.green;
      case 'CANCELLED':
        return Colors.red;
      default:
        return Colors.grey;
    }
  }

  Color _getPriorityColor(String priority) {
    switch (priority) {
      case 'LOW':
        return Colors.green;
      case 'MEDIUM':
        return Colors.orange;
      case 'HIGH':
        return Colors.red;
      case 'URGENT':
        return Colors.purple;
      default:
        return Colors.grey;
    }
  }
}
``

---

## mechanic_mobile/lib/presentation/pages/login_page.dart

``dart
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../viewmodels/auth_viewmodel.dart';
import '../../core/di/injection_container.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  late final AuthViewModel authViewModel;

  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  bool _showPassword = false;
  bool _rememberMe = false;

  // Estados de error
  String? _emailError;
  String? _passwordError;

  @override
  void initState() {
    super.initState();
    authViewModel = sl<AuthViewModel>();
    _loadSavedCredentials();

    // Agregar listeners para validación en tiempo real
    _emailController.addListener(_validateEmail);
    _passwordController.addListener(_validatePassword);
  }

  @override
  void dispose() {
    _emailController.removeListener(_validateEmail);
    _passwordController.removeListener(_validatePassword);
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  void _loadSavedCredentials() {}

  void _validateEmail() {
    setState(() {
      final email = _emailController.text.trim();
      if (email.isEmpty) {
        _emailError = null;
      } else if (!email.contains('@')) {
        _emailError = 'El email debe contener @';
      } else if (!email.contains('.') ||
          email.indexOf('@') == 0 ||
          email.endsWith('@')) {
        _emailError = 'Ingresa un email válido (ejemplo@dominio.com)';
      } else {
        _emailError = null;
      }
    });
  }

  // ✅ Validación de contraseña actualizada: solo 8 caracteres, sin número
  void _validatePassword() {
    setState(() {
      final password = _passwordController.text;
      if (password.isEmpty) {
        _passwordError = null;
      } else if (password.length < 8) {
        _passwordError = 'La contraseña debe tener al menos 8 caracteres';
      } else {
        _passwordError = null;
      }
    });
  }

  bool _validateForm() {
    bool isValid = true;

    // Validar email
    final email = _emailController.text.trim();
    if (email.isEmpty) {
      _emailError = 'El email es requerido';
      isValid = false;
    } else if (!email.contains('@')) {
      _emailError = 'El email debe contener @';
      isValid = false;
    } else {
      _emailError = null;
    }

    // Validar password
    final password = _passwordController.text;
    if (password.isEmpty) {
      _passwordError = 'La contraseña es requerida';
      isValid = false;
    } else if (password.length < 8) {
      _passwordError = 'La contraseña debe tener al menos 8 caracteres';
      isValid = false;
    } else {
      _passwordError = null;
    }

    setState(() {});
    return isValid;
  }

  void _showSnackBar(String message, {bool isError = false}) {
    ScaffoldMessenger.of(context).hideCurrentSnackBar();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Row(
          children: [
            Icon(
              isError ? Icons.error_outline : Icons.check_circle_outline,
              color: Colors.white,
              size: 20,
            ),
            const SizedBox(width: 12),
            Expanded(child: Text(message)),
          ],
        ),
        backgroundColor: isError ? Colors.red.shade700 : Colors.blue.shade700,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        margin: const EdgeInsets.all(12),
        duration: const Duration(seconds: 3),
      ),
    );
  }

  void _onLogin() async {
    if (!_validateForm()) return;

    final email = _emailController.text.trim();
    final password = _passwordController.text;

    final success = await authViewModel.login(email, password);

    if (success && mounted) {
      _showSnackBar('¡Bienvenido de vuelta!');
      context.go('/');
    } else if (mounted) {
      _showSnackBar(
        authViewModel.errorMessage ?? 'Error al iniciar sesión',
        isError: true,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Colors.blue.shade50, Colors.white, Colors.blue.shade50],
          ),
        ),
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(24.0),
            child: Card(
              elevation: 8,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(24),
              ),
              child: Padding(
                padding: const EdgeInsets.all(32.0),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    // Logo
                    Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: Colors.blue.shade50,
                        shape: BoxShape.circle,
                      ),
                      child: Icon(
                        Icons.car_repair,
                        size: 60,
                        color: Colors.blue.shade800,
                      ),
                    ),
                    const SizedBox(height: 24),
                    Text(
                      'Auxilio Mecánico',
                      style: TextStyle(
                        fontSize: 28,
                        fontWeight: FontWeight.bold,
                        color: Colors.blue.shade800,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Tu asistencia vehicular al instante',
                      style: TextStyle(
                        fontSize: 14,
                        color: Colors.grey.shade600,
                      ),
                    ),
                    const SizedBox(height: 48),

                    // Email field
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        TextField(
                          controller: _emailController,
                          keyboardType: TextInputType.emailAddress,
                          textInputAction: TextInputAction.next,
                          decoration: InputDecoration(
                            labelText: 'Correo electrónico',
                            hintText: 'usuario@ejemplo.com',
                            prefixIcon: Icon(
                              Icons.email_outlined,
                              color: Colors.blue.shade700,
                            ),
                            errorText: _emailError,
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(12),
                            ),
                            focusedBorder: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(12),
                              borderSide: BorderSide(
                                color: Colors.blue.shade700,
                                width: 2,
                              ),
                            ),
                            errorBorder: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(12),
                              borderSide: BorderSide(
                                color: Colors.red.shade400,
                                width: 1,
                              ),
                            ),
                            focusedErrorBorder: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(12),
                              borderSide: BorderSide(
                                color: Colors.red.shade400,
                                width: 2,
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),

                    // Password field
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        TextField(
                          controller: _passwordController,
                          obscureText: !_showPassword,
                          textInputAction: TextInputAction.done,
                          onSubmitted: (_) => _onLogin(),
                          decoration: InputDecoration(
                            labelText: 'Contraseña',
                            prefixIcon: Icon(
                              Icons.lock_outline,
                              color: Colors.blue.shade700,
                            ),
                            errorText: _passwordError,
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(12),
                            ),
                            focusedBorder: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(12),
                              borderSide: BorderSide(
                                color: Colors.blue.shade700,
                                width: 2,
                              ),
                            ),
                            errorBorder: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(12),
                              borderSide: BorderSide(
                                color: Colors.red.shade400,
                                width: 1,
                              ),
                            ),
                            focusedErrorBorder: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(12),
                              borderSide: BorderSide(
                                color: Colors.red.shade400,
                                width: 2,
                              ),
                            ),
                            suffixIcon: IconButton(
                              icon: Icon(
                                _showPassword
                                    ? Icons.visibility_off
                                    : Icons.visibility,
                                color: Colors.grey.shade500,
                              ),
                              onPressed: () {
                                setState(() => _showPassword = !_showPassword);
                              },
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),

                    // Remember me & Forgot password
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(
                          children: [
                            Checkbox(
                              value: _rememberMe,
                              onChanged: (value) {
                                setState(() => _rememberMe = value ?? false);
                              },
                              activeColor: Colors.blue.shade700,
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(4),
                              ),
                            ),
                            Text(
                              'Recordarme',
                              style: TextStyle(color: Colors.grey.shade600),
                            ),
                          ],
                        ),
                        TextButton(
                          onPressed: () {
                            _showSnackBar(
                              'Recuperar contraseña (próximamente)',
                            );
                          },
                          child: Text(
                            '¿Olvidaste tu contraseña?',
                            style: TextStyle(color: Colors.blue.shade700),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 24),

                    // Login button
                    ListenableBuilder(
                      listenable: authViewModel,
                      builder: (context, _) {
                        final isLoading = authViewModel.isLoading;
                        return SizedBox(
                          width: double.infinity,
                          child: ElevatedButton(
                            onPressed: isLoading ? null : _onLogin,
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.blue.shade800,
                              foregroundColor: Colors.white,
                              padding: const EdgeInsets.symmetric(vertical: 16),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(12),
                              ),
                              elevation: 2,
                            ),
                            child: isLoading
                                ? const SizedBox(
                                    height: 20,
                                    width: 20,
                                    child: CircularProgressIndicator(
                                      strokeWidth: 2,
                                      valueColor: AlwaysStoppedAnimation<Color>(
                                        Colors.white,
                                      ),
                                    ),
                                  )
                                : const Text(
                                    'Iniciar Sesión',
                                    style: TextStyle(
                                      fontSize: 16,
                                      fontWeight: FontWeight.w600,
                                    ),
                                  ),
                          ),
                        );
                      },
                    ),
                    const SizedBox(height: 16),

                    // Register link
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          '¿No tienes cuenta?',
                          style: TextStyle(color: Colors.grey.shade600),
                        ),
                        TextButton(
                          onPressed: () => context.go('/register'),
                          child: Text(
                            'Regístrate aquí',
                            style: TextStyle(
                              color: Colors.blue.shade700,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),
                      ],
                    ),

                    const SizedBox(height: 16),

                    // Demo credentials hint
                    Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: Colors.blue.shade50,
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Row(
                        children: [
                          Icon(
                            Icons.info_outline,
                            size: 18,
                            color: Colors.blue.shade700,
                          ),
                          const SizedBox(width: 8),
                          Expanded(
                            child: Text(
                              'Demo: admin@mechanic.com / Admin12345',
                              style: TextStyle(
                                fontSize: 12,
                                color: Colors.blue.shade700,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
``

---

## mechanic_mobile/lib/presentation/pages/map_page.dart

``dart
import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';

class MapPage extends StatelessWidget {
  const MapPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Mapa de prueba'),
        backgroundColor: Colors.blue.shade800,
        foregroundColor: Colors.white,
      ),
      body: FlutterMap(
        options: MapOptions(
          initialCenter: LatLng(-17.7833, -63.1821), // Santa Cruz de la Sierra
          initialZoom: 15,
          minZoom: 12,
          maxZoom: 18,
        ),
        children: [
          TileLayer(
            urlTemplate:
                'https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=Wz3sO6ej1k66cNR8Lzcr',
            userAgentPackageName: 'com.example.mechanic_mobile',
          ),
        ],
      ),
    );
  }
}
``

---

## mechanic_mobile/lib/presentation/pages/platform_tracking_page.dart

``dart
import 'package:flutter/material.dart';
import 'package:mechanic_mobile/core/di/injection_container.dart';
import '../viewmodels/platform_tracking_viewmodel.dart';

class PlatformTrackingPage extends StatefulWidget {
  final String incidentId;

  const PlatformTrackingPage({super.key, required this.incidentId});

  @override
  State<PlatformTrackingPage> createState() => _PlatformTrackingPageState();
}

class _PlatformTrackingPageState extends State<PlatformTrackingPage> {
  late PlatformTrackingViewModel _viewModel;

  @override
  void initState() {
    super.initState();
    _viewModel = sl<PlatformTrackingViewModel>();
    _loadData();
  }

  Future<void> _loadData() async {
    await _viewModel.loadLiveTracking(widget.incidentId);
    await _viewModel.loadTrackingHistory(widget.incidentId);
  }

  // void _showSnackBar(String message, {bool isError = false}) {
  //   ScaffoldMessenger.of(context).hideCurrentSnackBar();
  //   ScaffoldMessenger.of(context).showSnackBar(
  //     SnackBar(
  //       content: Row(
  //         children: [
  //           Icon(
  //             isError ? Icons.error_outline : Icons.check_circle_outline,
  //             color: Colors.white,
  //           ),
  //           const SizedBox(width: 12),
  //           Expanded(child: Text(message)),
  //         ],
  //       ),
  //       backgroundColor: isError ? Colors.red.shade700 : Colors.blue.shade700,
  //       behavior: SnackBarBehavior.floating,
  //       shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
  //       margin: const EdgeInsets.all(12),
  //       duration: const Duration(seconds: 3),
  //     ),
  //   );
  // }

  String _formatDateTime(DateTime? date) {
    if (date == null) return 'N/A';
    return '${date.day}/${date.month}/${date.year} ${date.hour}:${date.minute.toString().padLeft(2, '0')}';
  }

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Monitoreo de Servicio'),
          backgroundColor: Colors.blue.shade800,
          foregroundColor: Colors.white,
          elevation: 2,
          bottom: const TabBar(
            tabs: [
              Tab(icon: Icon(Icons.pin), text: 'En Vivo'),
              Tab(icon: Icon(Icons.history), text: 'Historial'),
            ],
          ),
          actions: [
            IconButton(
              icon: const Icon(Icons.refresh),
              onPressed: _loadData,
              tooltip: 'Actualizar',
            ),
          ],
        ),
        body: ListenableBuilder(
          listenable: _viewModel,
          builder: (context, _) {
            if (_viewModel.isLoading && _viewModel.trackingData == null) {
              return const Center(
                child: CircularProgressIndicator(
                  valueColor: AlwaysStoppedAnimation<Color>(Colors.blue),
                ),
              );
            }

            if (_viewModel.errorMessage != null &&
                _viewModel.trackingData == null) {
              return Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(
                      Icons.error_outline,
                      size: 64,
                      color: Colors.red.shade300,
                    ),
                    const SizedBox(height: 16),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 32),
                      child: Text(
                        _viewModel.errorMessage!,
                        style: TextStyle(color: Colors.grey.shade600),
                        textAlign: TextAlign.center,
                      ),
                    ),
                    const SizedBox(height: 16),
                    ElevatedButton.icon(
                      onPressed: _loadData,
                      icon: const Icon(Icons.refresh),
                      label: const Text('Reintentar'),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.blue,
                        foregroundColor: Colors.white,
                      ),
                    ),
                  ],
                ),
              );
            }

            if (_viewModel.trackingData == null) {
              return const SizedBox.shrink();
            }

            final data = _viewModel.trackingData!;

            return TabBarView(
              children: [
                // Live Tracking Tab
                RefreshIndicator(
                  onRefresh: _loadData,
                  color: Colors.blue,
                  child: SingleChildScrollView(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Estado actual
                        Card(
                          color: _getStatusColor(
                            data.status,
                          ).withValues(alpha: 0.1),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(16),
                          ),
                          child: Padding(
                            padding: const EdgeInsets.all(16),
                            child: Row(
                              children: [
                                Icon(
                                  _getStatusIcon(data.status),
                                  color: _getStatusColor(data.status),
                                  size: 32,
                                ),
                                const SizedBox(width: 16),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      const Text(
                                        'Estado del Servicio',
                                        style: TextStyle(
                                          fontSize: 12,
                                          color: Colors.grey,
                                        ),
                                      ),
                                      Text(
                                        _getStatusText(data.status),
                                        style: TextStyle(
                                          fontSize: 20,
                                          fontWeight: FontWeight.bold,
                                          color: _getStatusColor(data.status),
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                        const SizedBox(height: 16),

                        // Información del cliente
                        if (data.clientUser != null)
                          Card(
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(16),
                            ),
                            child: Padding(
                              padding: const EdgeInsets.all(16),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Text(
                                    'Información del Cliente',
                                    style: TextStyle(
                                      fontSize: 18,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  const Divider(),
                                  _buildInfoRow(
                                    'Nombre',
                                    data.clientUser!.fullName,
                                  ),
                                  _buildInfoRow(
                                    'Email',
                                    data.clientUser!.email,
                                  ),
                                  _buildInfoRow(
                                    'Teléfono',
                                    data.clientUser!.phoneNumber ?? 'N/A',
                                  ),
                                ],
                              ),
                            ),
                          ),
                        const SizedBox(height: 16),

                        // Información del taller
                        if (data.provider != null)
                          Card(
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(16),
                            ),
                            child: Padding(
                              padding: const EdgeInsets.all(16),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Text(
                                    'Taller Asignado',
                                    style: TextStyle(
                                      fontSize: 18,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  const Divider(),
                                  _buildInfoRow(
                                    'Nombre',
                                    data.provider!.businessName,
                                  ),
                                  if (data.provider!.contactPhone != null)
                                    _buildInfoRow(
                                      'Teléfono',
                                      data.provider!.contactPhone!,
                                    ),
                                  if (data.provider!.city != null)
                                    _buildInfoRow(
                                      'Ciudad',
                                      data.provider!.city!,
                                    ),
                                ],
                              ),
                            ),
                          ),
                        const SizedBox(height: 16),

                        // Información del técnico
                        if (data.assignedTechnician != null)
                          Card(
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(16),
                            ),
                            child: Padding(
                              padding: const EdgeInsets.all(16),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Text(
                                    'Técnico Asignado',
                                    style: TextStyle(
                                      fontSize: 18,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  const Divider(),
                                  _buildInfoRow(
                                    'Nombre',
                                    data.assignedTechnician!.fullName,
                                  ),
                                  _buildInfoRow(
                                    'Especialidad',
                                    data.assignedTechnician!.specialty,
                                  ),
                                  _buildInfoRow(
                                    'Teléfono',
                                    data.assignedTechnician!.phoneNumber,
                                  ),
                                ],
                              ),
                            ),
                          ),
                        const SizedBox(height: 16),

                        // Ubicación actual del técnico
                        if (data.responderPosition != null)
                          Card(
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(16),
                            ),
                            child: Padding(
                              padding: const EdgeInsets.all(16),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    children: [
                                      Icon(
                                        Icons.location_on,
                                        color: Colors.blue.shade700,
                                      ),
                                      const SizedBox(width: 8),
                                      const Text(
                                        'Ubicación del Técnico',
                                        style: TextStyle(
                                          fontSize: 18,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                    ],
                                  ),
                                  const Divider(),
                                  _buildInfoRow(
                                    'Coordenadas',
                                    data.responderPosition!.location,
                                  ),
                                  _buildInfoRow(
                                    'Fuente',
                                    data.responderPosition!.sourceType,
                                  ),
                                  _buildInfoRow(
                                    'Actualizado',
                                    _formatDateTime(
                                      data.responderPosition!.recordedAt,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        const SizedBox(height: 16),

                        // Información de ruta
                        if (data.route != null)
                          Card(
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(16),
                            ),
                            child: Padding(
                              padding: const EdgeInsets.all(16),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    children: [
                                      Icon(
                                        Icons.route,
                                        color: Colors.blue.shade700,
                                      ),
                                      const SizedBox(width: 8),
                                      const Text(
                                        'Información de la Ruta',
                                        style: TextStyle(
                                          fontSize: 18,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                    ],
                                  ),
                                  const Divider(),
                                  _buildInfoRow(
                                    'Distancia',
                                    data.formattedDistance,
                                  ),
                                  _buildInfoRow(
                                    'ETA estimado',
                                    data.formattedEta,
                                  ),
                                  _buildInfoRow(
                                    'Proveedor',
                                    data.route!.providerName,
                                  ),
                                  if (data.route!.errorMessage != null)
                                    Container(
                                      padding: const EdgeInsets.all(8),
                                      decoration: BoxDecoration(
                                        color: Colors.orange.shade50,
                                        borderRadius: BorderRadius.circular(8),
                                      ),
                                      child: Row(
                                        children: [
                                          Icon(
                                            Icons.warning_amber,
                                            size: 16,
                                            color: Colors.orange.shade700,
                                          ),
                                          const SizedBox(width: 8),
                                          Expanded(
                                            child: Text(
                                              data.route!.errorMessage!,
                                              style: TextStyle(
                                                fontSize: 12,
                                                color: Colors.orange.shade800,
                                              ),
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                ],
                              ),
                            ),
                          ),
                      ],
                    ),
                  ),
                ),

                // Tracking History Tab
                RefreshIndicator(
                  onRefresh: () =>
                      _viewModel.loadTrackingHistory(widget.incidentId),
                  color: Colors.blue,
                  child: _viewModel.history.isEmpty
                      ? Center(
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(
                                Icons.history,
                                size: 64,
                                color: Colors.blue.shade200,
                              ),
                              const SizedBox(height: 16),
                              Text(
                                'No hay historial de ubicaciones',
                                style: TextStyle(
                                  fontSize: 18,
                                  color: Colors.grey.shade600,
                                  fontWeight: FontWeight.w500,
                                ),
                              ),
                              const SizedBox(height: 8),
                              Text(
                                'El técnico aún no ha reportado ubicaciones',
                                style: TextStyle(color: Colors.grey.shade500),
                              ),
                            ],
                          ),
                        )
                      : ListView.builder(
                          padding: const EdgeInsets.all(12),
                          itemCount: _viewModel.history.length,
                          itemBuilder: (context, index) {
                            final item = _viewModel.history[index];
                            return Card(
                              margin: const EdgeInsets.only(bottom: 12),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(16),
                              ),
                              child: ListTile(
                                leading: CircleAvatar(
                                  backgroundColor: Colors.blue.shade100,
                                  child: const Icon(
                                    Icons.location_on,
                                    color: Colors.blue,
                                  ),
                                ),
                                title: Text(
                                  item.location,
                                  style: const TextStyle(
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                subtitle: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text('📡 ${item.sourceType}'),
                                    if (item.providerBusinessName != null)
                                      Text('🏢 ${item.providerBusinessName}'),
                                    if (item.technicianFullName != null)
                                      Text('👨‍🔧 ${item.technicianFullName}'),
                                    if (item.accuracyMeters != null)
                                      Text(
                                        '🎯 Precisión: ${item.accuracyMeters!.toStringAsFixed(0)} m',
                                      ),
                                  ],
                                ),
                                trailing: Text(
                                  _formatDateTime(item.recordedAt),
                                  style: TextStyle(
                                    color: Colors.grey.shade600,
                                    fontSize: 12,
                                  ),
                                ),
                                isThreeLine: true,
                              ),
                            );
                          },
                        ),
                ),
              ],
            );
          },
        ),
      ),
    );
  }

  Widget _buildInfoRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            width: 100,
            child: Text(
              label,
              style: const TextStyle(
                fontWeight: FontWeight.w600,
                color: Colors.grey,
              ),
            ),
          ),
          Expanded(child: Text(value, style: const TextStyle(fontSize: 14))),
        ],
      ),
    );
  }

  Color _getStatusColor(String status) {
    switch (status) {
      case 'ASSIGNED':
        return const Color(0xFF9C27B0);
      case 'EN_ROUTE':
        return const Color(0xFF00BCD4);
      case 'ON_SITE':
        return const Color(0xFF00897B);
      case 'IN_PROGRESS':
        return const Color(0xFF3F51B5);
      case 'COMPLETED':
        return const Color(0xFF4CAF50);
      case 'CANCELLED':
        return const Color(0xFFF44336);
      default:
        return Colors.grey;
    }
  }

  IconData _getStatusIcon(String status) {
    switch (status) {
      case 'ASSIGNED':
        return Icons.person_add;
      case 'EN_ROUTE':
        return Icons.directions_car;
      case 'ON_SITE':
        return Icons.location_on;
      case 'IN_PROGRESS':
        return Icons.build;
      case 'COMPLETED':
        return Icons.check_circle;
      case 'CANCELLED':
        return Icons.cancel;
      default:
        return Icons.info;
    }
  }

  String _getStatusText(String status) {
    switch (status) {
      case 'ASSIGNED':
        return 'Asignado - Pendiente';
      case 'EN_ROUTE':
        return 'Técnico en camino';
      case 'ON_SITE':
        return 'Técnico en el lugar';
      case 'IN_PROGRESS':
        return 'Servicio en progreso';
      case 'COMPLETED':
        return 'Servicio completado';
      case 'CANCELLED':
        return 'Servicio cancelado';
      default:
        return status;
    }
  }
}
``

---

## mechanic_mobile/lib/presentation/pages/provider_active_operations_page.dart

``dart
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:mechanic_mobile/core/di/injection_container.dart';
import '../viewmodels/provider_operation_viewmodel.dart';

class ProviderActiveOperationsPage extends StatefulWidget {
  const ProviderActiveOperationsPage({super.key});

  @override
  State<ProviderActiveOperationsPage> createState() =>
      _ProviderActiveOperationsPageState();
}

class _ProviderActiveOperationsPageState
    extends State<ProviderActiveOperationsPage> {
  late ProviderOperationViewModel _viewModel;

  @override
  void initState() {
    super.initState();
    _viewModel = sl<ProviderOperationViewModel>();
    _viewModel.loadActiveOperations();
  }

  // void _showSnackBar(String message, {bool isError = false}) {
  //   ScaffoldMessenger.of(context).hideCurrentSnackBar();
  //   ScaffoldMessenger.of(context).showSnackBar(
  //     SnackBar(
  //       content: Row(
  //         children: [
  //           Icon(
  //             isError ? Icons.error_outline : Icons.check_circle_outline,
  //             color: Colors.white,
  //           ),
  //           const SizedBox(width: 12),
  //           Expanded(child: Text(message)),
  //         ],
  //       ),
  //       backgroundColor: isError ? Colors.red.shade700 : Colors.blue.shade700,
  //       behavior: SnackBarBehavior.floating,
  //       shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
  //       margin: const EdgeInsets.all(12),
  //       duration: const Duration(seconds: 3),
  //     ),
  //   );
  // }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Operaciones Activas'),
        backgroundColor: Colors.blue.shade800,
        foregroundColor: Colors.white,
        elevation: 2,
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () => _viewModel.loadActiveOperations(),
            tooltip: 'Actualizar',
          ),
        ],
      ),
      body: ListenableBuilder(
        listenable: _viewModel,
        builder: (context, _) {
          if (_viewModel.isLoading && _viewModel.operations.isEmpty) {
            return const Center(
              child: CircularProgressIndicator(
                valueColor: AlwaysStoppedAnimation<Color>(Colors.blue),
              ),
            );
          }

          if (_viewModel.errorMessage != null &&
              _viewModel.operations.isEmpty) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.error_outline,
                    size: 64,
                    color: Colors.red.shade300,
                  ),
                  const SizedBox(height: 16),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 32),
                    child: Text(
                      _viewModel.errorMessage!,
                      style: TextStyle(color: Colors.grey.shade600),
                      textAlign: TextAlign.center,
                    ),
                  ),
                  const SizedBox(height: 16),
                  ElevatedButton.icon(
                    onPressed: () => _viewModel.loadActiveOperations(),
                    icon: const Icon(Icons.refresh),
                    label: const Text('Reintentar'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.blue,
                      foregroundColor: Colors.white,
                    ),
                  ),
                ],
              ),
            );
          }

          if (_viewModel.operations.isEmpty) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.inbox, size: 64, color: Colors.blue.shade200),
                  const SizedBox(height: 16),
                  Text(
                    'No hay operaciones activas',
                    style: TextStyle(
                      fontSize: 18,
                      color: Colors.grey.shade600,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Cuando aceptes solicitudes, aparecerán aquí',
                    style: TextStyle(color: Colors.grey.shade500),
                  ),
                ],
              ),
            );
          }

          return RefreshIndicator(
            onRefresh: () => _viewModel.loadActiveOperations(),
            color: Colors.blue,
            child: ListView.builder(
              padding: const EdgeInsets.all(12),
              itemCount: _viewModel.operations.length,
              itemBuilder: (context, index) {
                final operation = _viewModel.operations[index];
                return Card(
                  margin: const EdgeInsets.only(bottom: 12),
                  elevation: 4,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                    side: BorderSide(
                      color: operation.statusColor.withValues(alpha: 0.3),
                      width: 1,
                    ),
                  ),
                  child: InkWell(
                    onTap: () {
                      context.push(
                        '/provider/operation/${operation.incidentId}',
                        extra: operation,
                      );
                    },
                    borderRadius: BorderRadius.circular(16),
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Container(
                                padding: const EdgeInsets.all(8),
                                decoration: BoxDecoration(
                                  color: operation.statusColor.withValues(
                                    alpha: 0.1,
                                  ),
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                child: Icon(
                                  operation.statusIcon,
                                  color: operation.statusColor,
                                  size: 20,
                                ),
                              ),
                              const SizedBox(width: 12),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      operation.title,
                                      style: const TextStyle(
                                        fontSize: 16,
                                        fontWeight: FontWeight.bold,
                                      ),
                                      maxLines: 1,
                                      overflow: TextOverflow.ellipsis,
                                    ),
                                    const SizedBox(height: 4),
                                    Container(
                                      padding: const EdgeInsets.symmetric(
                                        horizontal: 8,
                                        vertical: 2,
                                      ),
                                      decoration: BoxDecoration(
                                        color: operation.statusColor.withValues(
                                          alpha: 0.1,
                                        ),
                                        borderRadius: BorderRadius.circular(12),
                                      ),
                                      child: Text(
                                        operation.statusText,
                                        style: TextStyle(
                                          fontSize: 12,
                                          color: operation.statusColor,
                                          fontWeight: FontWeight.w500,
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              Icon(
                                Icons.chevron_right,
                                color: Colors.grey.shade400,
                              ),
                            ],
                          ),
                          const SizedBox(height: 12),
                          Row(
                            children: [
                              Icon(
                                Icons.person_outline,
                                size: 14,
                                color: Colors.grey.shade500,
                              ),
                              const SizedBox(width: 4),
                              Text(
                                operation.clientUser?.fullName ?? 'Cliente',
                                style: TextStyle(
                                  fontSize: 12,
                                  color: Colors.grey.shade600,
                                ),
                              ),
                              const SizedBox(width: 16),
                              Icon(
                                Icons.priority_high,
                                size: 14,
                                color: Colors.grey.shade500,
                              ),
                              const SizedBox(width: 4),
                              Text(
                                operation.priority,
                                style: TextStyle(
                                  fontSize: 12,
                                  color:
                                      operation.priority == 'HIGH' ||
                                          operation.priority == 'URGENT'
                                      ? Colors.red.shade700
                                      : Colors.grey.shade600,
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 8),
                          Row(
                            children: [
                              Icon(
                                Icons.location_on,
                                size: 14,
                                color: Colors.grey.shade500,
                              ),
                              const SizedBox(width: 4),
                              Expanded(
                                child: Text(
                                  operation.addressReference ?? 'Sin dirección',
                                  style: TextStyle(
                                    fontSize: 12,
                                    color: Colors.grey.shade600,
                                  ),
                                  maxLines: 1,
                                  overflow: TextOverflow.ellipsis,
                                ),
                              ),
                            ],
                          ),
                          if (operation.assignedTechnician != null) ...[
                            const SizedBox(height: 8),
                            Row(
                              children: [
                                Icon(
                                  Icons.engineering,
                                  size: 14,
                                  color: Colors.grey.shade500,
                                ),
                                const SizedBox(width: 4),
                                Text(
                                  'Técnico: ${operation.assignedTechnician!.fullName}',
                                  style: TextStyle(
                                    fontSize: 12,
                                    color: Colors.grey.shade600,
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ],
                      ),
                    ),
                  ),
                );
              },
            ),
          );
        },
      ),
    );
  }
}
``

---

## mechanic_mobile/lib/presentation/pages/provider_available_requests_page.dart

``dart
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:mechanic_mobile/core/di/injection_container.dart';
import 'package:mechanic_mobile/domain/entities/provider_candidate.dart';
import '../viewmodels/provider_available_requests_viewmodel.dart';

class ProviderAvailableRequestsPage extends StatefulWidget {
  const ProviderAvailableRequestsPage({super.key});

  @override
  State<ProviderAvailableRequestsPage> createState() =>
      _ProviderAvailableRequestsPageState();
}

class _ProviderAvailableRequestsPageState
    extends State<ProviderAvailableRequestsPage> {
  late ProviderAvailableRequestsViewModel _viewModel;

  @override
  void initState() {
    super.initState();
    _viewModel = sl<ProviderAvailableRequestsViewModel>();
    _viewModel.loadAvailableCandidates();
  }

  void _showSnackBar(String message, {bool isError = false}) {
    ScaffoldMessenger.of(context).hideCurrentSnackBar();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Row(
          children: [
            Icon(
              isError ? Icons.error_outline : Icons.check_circle_outline,
              color: Colors.white,
            ),
            const SizedBox(width: 12),
            Expanded(child: Text(message)),
          ],
        ),
        backgroundColor: isError ? Colors.red.shade700 : Colors.blue.shade700,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        margin: const EdgeInsets.all(12),
        duration: const Duration(seconds: 3),
      ),
    );
  }

  Future<void> _showAcceptConfirmDialog(ProviderCandidate candidate) async {
    return showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Aceptar Solicitud'),
        content: Text(
          '¿Estás seguro de que deseas aceptar esta solicitud?\n\nCliente: ${candidate.incident.title}\nDistancia: ${candidate.formattedDistance}',
        ),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancelar'),
          ),
          ElevatedButton(
            onPressed: () async {
              Navigator.pop(context);
              final success = await _viewModel.acceptCandidate(candidate.id);
              if (success) {
                _showSnackBar('Solicitud aceptada exitosamente');
                // Navegar a la página de operaciones activas
                context.go('/provider/active-operations');
              } else {
                _showSnackBar(
                  _viewModel.errorMessage ?? 'Error al aceptar la solicitud',
                  isError: true,
                );
              }
              _viewModel.clearError();
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.green.shade700,
              foregroundColor: Colors.white,
            ),
            child: const Text('Aceptar'),
          ),
        ],
      ),
    );
  }

  Future<void> _showRejectConfirmDialog(ProviderCandidate candidate) async {
    return showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Rechazar Solicitud'),
        content: Text(
          '¿Estás seguro de que deseas rechazar esta solicitud?\n\nCliente: ${candidate.incident.title}',
        ),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancelar'),
          ),
          ElevatedButton(
            onPressed: () async {
              Navigator.pop(context);
              final success = await _viewModel.rejectCandidate(candidate.id);
              if (success) {
                _showSnackBar('Solicitud rechazada');
              } else {
                _showSnackBar(
                  _viewModel.errorMessage ?? 'Error al rechazar la solicitud',
                  isError: true,
                );
              }
              _viewModel.clearError();
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.red.shade700,
              foregroundColor: Colors.white,
            ),
            child: const Text('Rechazar'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Solicitudes Disponibles'),
        backgroundColor: Colors.blue.shade800,
        foregroundColor: Colors.white,
        elevation: 2,
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () => _viewModel.loadAvailableCandidates(),
            tooltip: 'Actualizar',
          ),
        ],
      ),
      body: ListenableBuilder(
        listenable: _viewModel,
        builder: (context, _) {
          if (_viewModel.isLoading && _viewModel.candidates.isEmpty) {
            return const Center(
              child: CircularProgressIndicator(
                valueColor: AlwaysStoppedAnimation<Color>(Colors.blue),
              ),
            );
          }

          if (_viewModel.errorMessage != null &&
              _viewModel.candidates.isEmpty) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.error_outline,
                    size: 64,
                    color: Colors.red.shade300,
                  ),
                  const SizedBox(height: 16),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 32),
                    child: Text(
                      _viewModel.errorMessage!,
                      style: TextStyle(color: Colors.grey.shade600),
                      textAlign: TextAlign.center,
                    ),
                  ),
                  const SizedBox(height: 16),
                  ElevatedButton.icon(
                    onPressed: () => _viewModel.loadAvailableCandidates(),
                    icon: const Icon(Icons.refresh),
                    label: const Text('Reintentar'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.blue,
                      foregroundColor: Colors.white,
                    ),
                  ),
                ],
              ),
            );
          }

          if (_viewModel.candidates.isEmpty) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.inbox, size: 64, color: Colors.blue.shade200),
                  const SizedBox(height: 16),
                  Text(
                    'No hay solicitudes disponibles',
                    style: TextStyle(
                      fontSize: 18,
                      color: Colors.grey.shade600,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Cuando haya solicitudes publicadas, aparecerán aquí',
                    style: TextStyle(color: Colors.grey.shade500),
                  ),
                ],
              ),
            );
          }

          return RefreshIndicator(
            onRefresh: () => _viewModel.loadAvailableCandidates(),
            color: Colors.blue,
            child: ListView.builder(
              padding: const EdgeInsets.all(12),
              itemCount: _viewModel.candidates.length,
              itemBuilder: (context, index) {
                final candidate = _viewModel.candidates[index];
                return _buildCandidateCard(candidate);
              },
            ),
          );
        },
      ),
    );
  }

  Widget _buildCandidateCard(ProviderCandidate candidate) {
    final priorityColor =
        candidate.priority == 'HIGH' || candidate.priority == 'URGENT'
        ? Colors.red
        : (candidate.priority == 'MEDIUM' ? Colors.orange : Colors.green);

    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      elevation: 4,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
        side: BorderSide(color: priorityColor.withValues(alpha: 0.3), width: 1),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Encabezado
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: priorityColor.withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Icon(
                    candidate.priority == 'URGENT'
                        ? Icons.emergency
                        : Icons.priority_high,
                    color: priorityColor,
                    size: 20,
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        candidate.incident.title,
                        style: const TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                        ),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                      const SizedBox(height: 4),
                      Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 8,
                              vertical: 2,
                            ),
                            decoration: BoxDecoration(
                              color: priorityColor.withValues(alpha: 0.1),
                              borderRadius: BorderRadius.circular(12),
                            ),
                            child: Text(
                              candidate.priority,
                              style: TextStyle(
                                fontSize: 12,
                                color: priorityColor,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                          ),
                          const SizedBox(width: 8),
                          Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 8,
                              vertical: 2,
                            ),
                            decoration: BoxDecoration(
                              color: Colors.blue.shade100,
                              borderRadius: BorderRadius.circular(12),
                            ),
                            child: Text(
                              candidate.category,
                              style: TextStyle(
                                fontSize: 12,
                                color: Colors.blue.shade800,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),

            // Descripción
            Text(
              candidate.incident.description,
              style: TextStyle(fontSize: 14, color: Colors.grey.shade700),
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
            ),
            const SizedBox(height: 12),

            // Detalles adicionales
            Row(
              children: [
                Icon(Icons.location_on, size: 16, color: Colors.grey.shade500),
                const SizedBox(width: 4),
                Expanded(
                  child: Text(
                    candidate.incident.addressReference,
                    style: TextStyle(fontSize: 12, color: Colors.grey.shade600),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Row(
              children: [
                Icon(Icons.straighten, size: 16, color: Colors.grey.shade500),
                const SizedBox(width: 4),
                Text(
                  'Distancia: ${candidate.formattedDistance}',
                  style: TextStyle(fontSize: 12, color: Colors.grey.shade600),
                ),
                const SizedBox(width: 16),
                Icon(Icons.score, size: 16, color: Colors.grey.shade500),
                const SizedBox(width: 4),
                Text(
                  'Compatibilidad: ${candidate.formattedScore}',
                  style: TextStyle(fontSize: 12, color: Colors.grey.shade600),
                ),
              ],
            ),
            const SizedBox(height: 12),

            // Servicios coincidentes
            Wrap(
              spacing: 8,
              runSpacing: 4,
              children: candidate.matchedServiceCodes.map((service) {
                return Chip(
                  label: Text(service.replaceAll('_', ' ')),
                  backgroundColor: Colors.green.shade100,
                  labelStyle: TextStyle(
                    fontSize: 11,
                    color: Colors.green.shade800,
                  ),
                  padding: EdgeInsets.zero,
                  materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
                );
              }).toList(),
            ),
            const SizedBox(height: 16),

            // Botones de acción
            Row(
              children: [
                Expanded(
                  child: OutlinedButton.icon(
                    onPressed: () => _showRejectConfirmDialog(candidate),
                    icon: const Icon(Icons.close),
                    label: const Text('Rechazar'),
                    style: OutlinedButton.styleFrom(
                      foregroundColor: Colors.red.shade700,
                      side: BorderSide(color: Colors.red.shade700),
                      padding: const EdgeInsets.symmetric(vertical: 12),
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: ElevatedButton.icon(
                    onPressed: () => _showAcceptConfirmDialog(candidate),
                    icon: const Icon(Icons.check),
                    label: const Text('Aceptar'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.green.shade700,
                      foregroundColor: Colors.white,
                      padding: const EdgeInsets.symmetric(vertical: 12),
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
``

---

## mechanic_mobile/lib/presentation/pages/provider_operation_detail_page.dart

``dart
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:mechanic_mobile/core/di/injection_container.dart';
import 'package:mechanic_mobile/presentation/viewmodels/technicians_viewmodel.dart';
import '../../domain/entities/provider_operation.dart';
import '../viewmodels/provider_operation_viewmodel.dart';

class ProviderOperationDetailPage extends StatefulWidget {
  final ProviderOperation? operation;

  const ProviderOperationDetailPage({super.key, this.operation});

  @override
  State<ProviderOperationDetailPage> createState() =>
      _ProviderOperationDetailPageState();
}

class _ProviderOperationDetailPageState
    extends State<ProviderOperationDetailPage> {
  late ProviderOperationViewModel _viewModel;
  late ProviderOperation _operation;

  @override
  void initState() {
    super.initState();
    _viewModel = sl<ProviderOperationViewModel>();

    if (widget.operation != null) {
      _operation = widget.operation!;
    }
  }

  void _showSnackBar(String message, {bool isError = false}) {
    ScaffoldMessenger.of(context).hideCurrentSnackBar();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Row(
          children: [
            Icon(
              isError ? Icons.error_outline : Icons.check_circle_outline,
              color: Colors.white,
            ),
            const SizedBox(width: 12),
            Expanded(child: Text(message)),
          ],
        ),
        backgroundColor: isError ? Colors.red.shade700 : Colors.blue.shade700,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        margin: const EdgeInsets.all(12),
        duration: const Duration(seconds: 3),
      ),
    );
  }

  Future<void> _showDispatchDialog() async {
    // Cargar técnicos disponibles
    final technicianVM = sl<TechniciansViewModel>();
    await technicianVM.loadTechnicians();
    final availableTechnicians = technicianVM.technicians
        .where((t) => t.isAvailable)
        .toList();

    if (availableTechnicians.isEmpty) {
      _showSnackBar('No hay técnicos disponibles', isError: true);
      return;
    }

    String? selectedTechnicianId;
    final noteController = TextEditingController();

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Despachar Técnico'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            DropdownButtonFormField<String>(
              decoration: const InputDecoration(
                labelText: 'Seleccionar técnico',
                border: OutlineInputBorder(),
              ),
              items: availableTechnicians.map((tech) {
                return DropdownMenuItem(
                  value: tech.id,
                  child: Text('${tech.fullName} - ${tech.specialty}'),
                );
              }).toList(),
              onChanged: (value) => selectedTechnicianId = value,
              validator: (value) =>
                  value == null ? 'Seleccione un técnico' : null,
            ),
            const SizedBox(height: 12),
            TextField(
              controller: noteController,
              decoration: const InputDecoration(
                labelText: 'Nota (opcional)',
                border: OutlineInputBorder(),
              ),
              maxLines: 2,
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancelar'),
          ),
          ElevatedButton(
            onPressed: () async {
              if (selectedTechnicianId == null) {
                _showSnackBar('Seleccione un técnico', isError: true);
                return;
              }
              Navigator.pop(context);
              final result = await _viewModel.dispatchIncident(
                _operation.incidentId,
                selectedTechnicianId!,
                note: noteController.text.trim().isEmpty
                    ? null
                    : noteController.text.trim(),
              );
              if (result != null) {
                setState(() {
                  _operation = result;
                });
                _showSnackBar('Técnico despachado exitosamente');
              } else {
                _showSnackBar(
                  _viewModel.errorMessage ?? 'Error al despachar',
                  isError: true,
                );
              }
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.blue.shade700,
              foregroundColor: Colors.white,
            ),
            child: const Text('Despachar'),
          ),
        ],
      ),
    );
  }

  Future<void> _showCompleteDialog() async {
    final noteController = TextEditingController();
    final summaryController = TextEditingController();

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Completar Servicio'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: summaryController,
              decoration: const InputDecoration(
                labelText: 'Resumen del servicio *',
                hintText: 'Describe el trabajo realizado...',
                border: OutlineInputBorder(),
              ),
              maxLines: 3,
            ),
            const SizedBox(height: 12),
            TextField(
              controller: noteController,
              decoration: const InputDecoration(
                labelText: 'Nota adicional (opcional)',
                border: OutlineInputBorder(),
              ),
              maxLines: 2,
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancelar'),
          ),
          ElevatedButton(
            onPressed: () async {
              if (summaryController.text.trim().isEmpty) {
                _showSnackBar('Ingrese un resumen del servicio', isError: true);
                return;
              }
              Navigator.pop(context);
              final result = await _viewModel.completeService(
                _operation.incidentId,
                summaryController.text.trim(),
                note: noteController.text.trim().isEmpty
                    ? null
                    : noteController.text.trim(),
              );
              if (result != null) {
                setState(() {
                  _operation = result;
                });
                _showSnackBar('Servicio completado exitosamente');
                Future.delayed(const Duration(seconds: 2), () {
                  context.go('/provider/active-operations');
                });
              } else {
                _showSnackBar(
                  _viewModel.errorMessage ?? 'Error al completar servicio',
                  isError: true,
                );
              }
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.green.shade700,
              foregroundColor: Colors.white,
            ),
            child: const Text('Completar'),
          ),
        ],
      ),
    );
  }

  Future<void> _showCancelDialog() async {
    final noteController = TextEditingController();

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Cancelar Servicio'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Text('¿Estás seguro de que deseas cancelar este servicio?'),
            const SizedBox(height: 12),
            TextField(
              controller: noteController,
              decoration: const InputDecoration(
                labelText: 'Motivo de cancelación (opcional)',
                border: OutlineInputBorder(),
              ),
              maxLines: 2,
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('No'),
          ),
          ElevatedButton(
            onPressed: () async {
              Navigator.pop(context);
              final result = await _viewModel.cancelService(
                _operation.incidentId,
                note: noteController.text.trim().isEmpty
                    ? null
                    : noteController.text.trim(),
              );
              if (result != null) {
                _showSnackBar('Servicio cancelado');
                context.go('/provider/active-operations');
              } else {
                _showSnackBar(
                  _viewModel.errorMessage ?? 'Error al cancelar servicio',
                  isError: true,
                );
              }
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.red.shade700,
              foregroundColor: Colors.white,
            ),
            child: const Text('Sí, cancelar'),
          ),
        ],
      ),
    );
  }

  String _formatDate(DateTime? date) {
    if (date == null) return 'N/A';
    return '${date.day}/${date.month}/${date.year} ${date.hour}:${date.minute.toString().padLeft(2, '0')}';
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Detalle de Operación'),
        backgroundColor: Colors.blue.shade800,
        foregroundColor: Colors.white,
        elevation: 2,
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () async {
              await _viewModel.loadOperationState(_operation.incidentId);
              if (_viewModel.selectedOperation != null) {
                setState(() {
                  _operation = _viewModel.selectedOperation!;
                });
              }
            },
            tooltip: 'Actualizar',
          ),
        ],
      ),
      body: ListenableBuilder(
        listenable: _viewModel,
        builder: (context, _) {
          return SingleChildScrollView(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Estado actual
                Card(
                  color: _operation.statusColor.withValues(alpha: 0.1),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Row(
                      children: [
                        Icon(
                          _operation.statusIcon,
                          color: _operation.statusColor,
                          size: 32,
                        ),
                        const SizedBox(width: 16),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Text(
                                'Estado Actual',
                                style: TextStyle(
                                  fontSize: 12,
                                  color: Colors.grey,
                                ),
                              ),
                              Text(
                                _operation.statusText,
                                style: TextStyle(
                                  fontSize: 20,
                                  fontWeight: FontWeight.bold,
                                  color: _operation.statusColor,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 16),

                // Botones de acción según estado
                if (_operation.canDispatch)
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton.icon(
                      onPressed: _showDispatchDialog,
                      icon: const Icon(Icons.person_add),
                      label: const Text('Despachar Técnico'),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.blue.shade700,
                        foregroundColor: Colors.white,
                        padding: const EdgeInsets.symmetric(vertical: 14),
                      ),
                    ),
                  ),
                if (_operation.canArrive)
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton.icon(
                      onPressed: () async {
                        final result = await _viewModel.markArrived(
                          _operation.incidentId,
                        );
                        if (result != null) {
                          setState(() {
                            _operation = result;
                          });
                          _showSnackBar('Llegada registrada');
                        } else {
                          _showSnackBar(
                            _viewModel.errorMessage ??
                                'Error al registrar llegada',
                            isError: true,
                          );
                        }
                      },
                      icon: const Icon(Icons.location_on),
                      label: const Text('Marcar Llegada'),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.teal.shade700,
                        foregroundColor: Colors.white,
                        padding: const EdgeInsets.symmetric(vertical: 14),
                      ),
                    ),
                  ),
                if (_operation.canStart)
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton.icon(
                      onPressed: () async {
                        final result = await _viewModel.startService(
                          _operation.incidentId,
                        );
                        if (result != null) {
                          setState(() {
                            _operation = result;
                          });
                          _showSnackBar('Servicio iniciado');
                        } else {
                          _showSnackBar(
                            _viewModel.errorMessage ??
                                'Error al iniciar servicio',
                            isError: true,
                          );
                        }
                      },
                      icon: const Icon(Icons.play_arrow),
                      label: const Text('Iniciar Servicio'),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.indigo.shade700,
                        foregroundColor: Colors.white,
                        padding: const EdgeInsets.symmetric(vertical: 14),
                      ),
                    ),
                  ),
                if (_operation.canComplete)
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton.icon(
                      onPressed: _showCompleteDialog,
                      icon: const Icon(Icons.check_circle),
                      label: const Text('Completar Servicio'),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.green.shade700,
                        foregroundColor: Colors.white,
                        padding: const EdgeInsets.symmetric(vertical: 14),
                      ),
                    ),
                  ),
                if (_operation.canCancel && !_operation.canComplete)
                  SizedBox(
                    width: double.infinity,
                    child: OutlinedButton.icon(
                      onPressed: _showCancelDialog,
                      icon: const Icon(Icons.cancel),
                      label: const Text('Cancelar Servicio'),
                      style: OutlinedButton.styleFrom(
                        foregroundColor: Colors.red.shade700,
                        side: BorderSide(color: Colors.red.shade700),
                        padding: const EdgeInsets.symmetric(vertical: 14),
                      ),
                    ),
                  ),

                // ✅ Botón de Tracking (solo cuando está EN_ROUTE y tiene técnico asignado)
                if (_operation.status == 'EN_ROUTE' &&
                    _operation.assignedTechnician != null)
                  Padding(
                    padding: const EdgeInsets.only(top: 8),
                    child: SizedBox(
                      width: double.infinity,
                      child: OutlinedButton.icon(
                        onPressed: () {
                          context.push(
                            '/provider/tracking/${_operation.incidentId}/${_operation.assignedTechnician!.id}',
                          );
                        },
                        icon: const Icon(Icons.location_on),
                        label: const Text('Ver Tracking en Vivo'),
                        style: OutlinedButton.styleFrom(
                          foregroundColor: Colors.blue.shade700,
                          side: BorderSide(color: Colors.blue.shade700),
                          padding: const EdgeInsets.symmetric(vertical: 14),
                        ),
                      ),
                    ),
                  ),

                const SizedBox(height: 16),

                // Información del incidente
                Card(
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Información del Incidente',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const Divider(),
                        _buildInfoRow('ID', _operation.incidentId),
                        _buildInfoRow('Título', _operation.title),
                        _buildInfoRow('Descripción', _operation.description),
                        _buildInfoRow('Prioridad', _operation.priority),
                        _buildInfoRow('Categoría', _operation.reportedCategory),
                        if (_operation.addressReference != null)
                          _buildInfoRow(
                            'Dirección',
                            _operation.addressReference!,
                          ),
                        if (_operation.incidentLatitude != null)
                          _buildInfoRow('Ubicación', _operation.location),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 16),

                // Información del cliente
                if (_operation.clientUser != null)
                  Card(
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'Información del Cliente',
                            style: TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const Divider(),
                          _buildInfoRow(
                            'Nombre',
                            _operation.clientUser!.fullName,
                          ),
                          _buildInfoRow('Email', _operation.clientUser!.email),
                          _buildInfoRow(
                            'Teléfono',
                            _operation.clientUser!.phoneNumber ?? 'N/A',
                          ),
                        ],
                      ),
                    ),
                  ),
                const SizedBox(height: 16),

                // Información del técnico
                if (_operation.assignedTechnician != null)
                  Card(
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'Técnico Asignado',
                            style: TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const Divider(),
                          _buildInfoRow(
                            'Nombre',
                            _operation.assignedTechnician!.fullName,
                          ),
                          _buildInfoRow(
                            'Especialidad',
                            _operation.assignedTechnician!.specialty,
                          ),
                          _buildInfoRow(
                            'Teléfono',
                            _operation.assignedTechnician!.phoneNumber,
                          ),
                        ],
                      ),
                    ),
                  ),
                const SizedBox(height: 16),

                // Línea de tiempo
                Card(
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Línea de Tiempo',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const Divider(),
                        _buildTimelineItem(
                          'Asignado',
                          _operation.assignedAt,
                          Icons.assignment_ind,
                        ),
                        _buildTimelineItem(
                          'En camino',
                          _operation.enRouteAt,
                          Icons.directions_car,
                        ),
                        _buildTimelineItem(
                          'Llegó al lugar',
                          _operation.arrivedAt,
                          Icons.location_on,
                        ),
                        _buildTimelineItem(
                          'Servicio iniciado',
                          _operation.startedAt,
                          Icons.build,
                        ),
                        _buildTimelineItem(
                          'Servicio completado',
                          _operation.completedAt,
                          Icons.check_circle,
                        ),
                        _buildTimelineItem(
                          'Cancelado',
                          _operation.cancelledAt,
                          Icons.cancel,
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildInfoRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            width: 100,
            child: Text(
              label,
              style: const TextStyle(
                fontWeight: FontWeight.w600,
                color: Colors.grey,
              ),
            ),
          ),
          Expanded(child: Text(value, style: const TextStyle(fontSize: 14))),
        ],
      ),
    );
  }

  Widget _buildTimelineItem(String label, DateTime? date, IconData icon) {
    final isCompleted = date != null;
    final color = isCompleted ? Colors.green : Colors.grey.shade400;

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        children: [
          Container(
            width: 32,
            height: 32,
            decoration: BoxDecoration(
              color: color.withValues(alpha: 0.2),
              shape: BoxShape.circle,
            ),
            child: Icon(icon, size: 18, color: color),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  label,
                  style: TextStyle(fontWeight: FontWeight.w500, color: color),
                ),
                if (date != null)
                  Text(
                    _formatDate(date),
                    style: TextStyle(fontSize: 12, color: Colors.grey.shade500),
                  ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
``

---

## mechanic_mobile/lib/presentation/pages/provider_profile_page.dart

``dart
import 'package:flutter/material.dart';
import 'package:mechanic_mobile/core/di/injection_container.dart';
import '../viewmodels/provider_profile_viewmodel.dart';

class ProviderProfilePage extends StatefulWidget {
  const ProviderProfilePage({super.key});

  @override
  State<ProviderProfilePage> createState() => _ProviderProfilePageState();
}

class _ProviderProfilePageState extends State<ProviderProfilePage> {
  late ProviderProfileViewModel _viewModel;

  @override
  void initState() {
    super.initState();
    _viewModel = sl<ProviderProfileViewModel>();
    _viewModel.loadProfile();
  }

  void _showSnackBar(String message, {bool isError = false}) {
    ScaffoldMessenger.of(context).hideCurrentSnackBar();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Row(
          children: [
            Icon(
              isError ? Icons.error_outline : Icons.check_circle_outline,
              color: Colors.white,
            ),
            const SizedBox(width: 12),
            Expanded(child: Text(message)),
          ],
        ),
        backgroundColor: isError ? Colors.red.shade700 : Colors.blue.shade700,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        margin: const EdgeInsets.all(12),
        duration: const Duration(seconds: 3),
      ),
    );
  }

  void _showEditProfileDialog() {
    final profile = _viewModel.profile;
    if (profile == null) return;

    final formKey = GlobalKey<FormState>();
    final businessNameController = TextEditingController(
      text: profile.businessName,
    );
    final descriptionController = TextEditingController(
      text: profile.description ?? '',
    );
    final contactEmailController = TextEditingController(
      text: profile.contactEmail ?? '',
    );
    final contactPhoneController = TextEditingController(
      text: profile.contactPhone ?? '',
    );
    final cityController = TextEditingController(text: profile.city ?? '');
    final addressController = TextEditingController(
      text: profile.address ?? '',
    );
    final latitudeController = TextEditingController(
      text: profile.baseLatitude?.toString() ?? '',
    );
    final longitudeController = TextEditingController(
      text: profile.baseLongitude?.toString() ?? '',
    );
    int? maxConcurrentServices = profile.maxConcurrentServices;

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Row(
          children: [
            Icon(Icons.edit, color: Colors.blue.shade800),
            const SizedBox(width: 8),
            const Text('Editar Perfil del Taller'),
          ],
        ),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        content: SingleChildScrollView(
          child: Form(
            key: formKey,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextFormField(
                  controller: businessNameController,
                  decoration: const InputDecoration(
                    labelText: 'Nombre del negocio',
                    prefixIcon: Icon(Icons.business),
                    border: OutlineInputBorder(),
                  ),
                  validator: (value) =>
                      value == null || value.isEmpty ? 'Campo requerido' : null,
                ),
                const SizedBox(height: 12),
                TextFormField(
                  controller: descriptionController,
                  decoration: const InputDecoration(
                    labelText: 'Descripción',
                    prefixIcon: Icon(Icons.description),
                    border: OutlineInputBorder(),
                  ),
                  maxLines: 3,
                ),
                const SizedBox(height: 12),
                TextFormField(
                  controller: contactEmailController,
                  keyboardType: TextInputType.emailAddress,
                  decoration: const InputDecoration(
                    labelText: 'Email de contacto',
                    prefixIcon: Icon(Icons.email_outlined),
                    border: OutlineInputBorder(),
                  ),
                ),
                const SizedBox(height: 12),
                TextFormField(
                  controller: contactPhoneController,
                  keyboardType: TextInputType.phone,
                  decoration: const InputDecoration(
                    labelText: 'Teléfono de contacto',
                    prefixIcon: Icon(Icons.phone_outlined),
                    border: OutlineInputBorder(),
                  ),
                ),
                const SizedBox(height: 12),
                TextFormField(
                  controller: cityController,
                  decoration: const InputDecoration(
                    labelText: 'Ciudad',
                    prefixIcon: Icon(Icons.location_city),
                    border: OutlineInputBorder(),
                  ),
                ),
                const SizedBox(height: 12),
                TextFormField(
                  controller: addressController,
                  decoration: const InputDecoration(
                    labelText: 'Dirección',
                    prefixIcon: Icon(Icons.location_on_outlined),
                    border: OutlineInputBorder(),
                  ),
                ),
                const SizedBox(height: 12),
                Row(
                  children: [
                    Expanded(
                      child: TextFormField(
                        controller: latitudeController,
                        keyboardType: TextInputType.number,
                        decoration: const InputDecoration(
                          labelText: 'Latitud',
                          border: OutlineInputBorder(),
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: TextFormField(
                        controller: longitudeController,
                        keyboardType: TextInputType.number,
                        decoration: const InputDecoration(
                          labelText: 'Longitud',
                          border: OutlineInputBorder(),
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                TextFormField(
                  keyboardType: TextInputType.number,
                  decoration: const InputDecoration(
                    labelText: 'Capacidad máxima (servicios concurrentes)',
                    prefixIcon: Icon(Icons.speed),
                    border: OutlineInputBorder(),
                  ),
                  initialValue: maxConcurrentServices.toString(),
                  onChanged: (value) =>
                      maxConcurrentServices = int.tryParse(value),
                ),
              ],
            ),
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancelar'),
          ),
          ElevatedButton(
            onPressed: () async {
              if (formKey.currentState!.validate()) {
                Navigator.pop(context);
                final success = await _viewModel.updateProfile(
                  businessName: businessNameController.text.trim(),
                  description: descriptionController.text.trim(),
                  contactEmail: contactEmailController.text.trim(),
                  contactPhone: contactPhoneController.text.trim(),
                  city: cityController.text.trim(),
                  address: addressController.text.trim(),
                  baseLatitude: double.tryParse(latitudeController.text),
                  baseLongitude: double.tryParse(longitudeController.text),
                  maxConcurrentServices: maxConcurrentServices,
                );
                if (success) {
                  _showSnackBar('Perfil actualizado exitosamente');
                } else {
                  _showSnackBar(
                    _viewModel.errorMessage ?? 'Error al actualizar perfil',
                    isError: true,
                  );
                }
                _viewModel.clearError();
              }
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.blue.shade800,
              foregroundColor: Colors.white,
            ),
            child: const Text('Guardar Cambios'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Perfil del Taller'),
        backgroundColor: Colors.blue.shade800,
        foregroundColor: Colors.white,
        elevation: 2,
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () => _viewModel.loadProfile(),
            tooltip: 'Actualizar',
          ),
          IconButton(
            icon: const Icon(Icons.edit),
            onPressed: _showEditProfileDialog,
            tooltip: 'Editar perfil',
          ),
        ],
      ),
      body: ListenableBuilder(
        listenable: _viewModel,
        builder: (context, _) {
          if (_viewModel.isLoading && _viewModel.profile == null) {
            return const Center(
              child: CircularProgressIndicator(
                valueColor: AlwaysStoppedAnimation<Color>(Colors.blue),
              ),
            );
          }

          if (_viewModel.errorMessage != null && _viewModel.profile == null) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.error_outline,
                    size: 64,
                    color: Colors.red.shade300,
                  ),
                  const SizedBox(height: 16),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 32),
                    child: Text(
                      _viewModel.errorMessage!,
                      style: TextStyle(color: Colors.grey.shade600),
                      textAlign: TextAlign.center,
                    ),
                  ),
                  const SizedBox(height: 16),
                  ElevatedButton.icon(
                    onPressed: () => _viewModel.loadProfile(),
                    icon: const Icon(Icons.refresh),
                    label: const Text('Reintentar'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.blue,
                      foregroundColor: Colors.white,
                    ),
                  ),
                ],
              ),
            );
          }

          final profile = _viewModel.profile;
          if (profile == null) return const SizedBox.shrink();

          return RefreshIndicator(
            onRefresh: () => _viewModel.loadProfile(),
            color: Colors.blue,
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Estado de disponibilidad
                  Card(
                    color: profile.isAvailable
                        ? Colors.green.shade50
                        : Colors.red.shade50,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: SwitchListTile(
                      title: Text(
                        profile.isAvailable
                            ? 'Disponible para servicios'
                            : 'No disponible',
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                          color: profile.isAvailable
                              ? Colors.green.shade800
                              : Colors.red.shade800,
                        ),
                      ),
                      subtitle: Text(
                        profile.hasCapacity
                            ? 'Capacidad: ${profile.currentActiveServices}/${profile.maxConcurrentServices} servicios activos'
                            : 'Capacidad llena',
                      ),
                      value: profile.isAvailable,
                      onChanged: (_) => _viewModel.toggleAvailability(),
                      activeThumbColor: Colors.green,
                      inactiveThumbColor: Colors.red.shade300,
                    ),
                  ),
                  const SizedBox(height: 16),

                  // Información del taller
                  Card(
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Icon(Icons.business, color: Colors.blue.shade700),
                              const SizedBox(width: 8),
                              Text(
                                profile.businessName,
                                style: const TextStyle(
                                  fontSize: 20,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ],
                          ),
                          const Divider(),
                          if (profile.description != null) ...[
                            Row(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Icon(
                                  Icons.description,
                                  size: 20,
                                  color: Colors.grey.shade600,
                                ),
                                const SizedBox(width: 8),
                                Expanded(child: Text(profile.description!)),
                              ],
                            ),
                            const SizedBox(height: 8),
                          ],
                          Row(
                            children: [
                              Icon(
                                Icons.email_outlined,
                                size: 20,
                                color: Colors.grey.shade600,
                              ),
                              const SizedBox(width: 8),
                              Text(profile.contactEmail ?? 'No especificado'),
                            ],
                          ),
                          const SizedBox(height: 8),
                          Row(
                            children: [
                              Icon(
                                Icons.phone_outlined,
                                size: 20,
                                color: Colors.grey.shade600,
                              ),
                              const SizedBox(width: 8),
                              Text(profile.contactPhone ?? 'No especificado'),
                            ],
                          ),
                          const SizedBox(height: 8),
                          if (profile.fullAddress.isNotEmpty) ...[
                            Row(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Icon(
                                  Icons.location_on_outlined,
                                  size: 20,
                                  color: Colors.grey.shade600,
                                ),
                                const SizedBox(width: 8),
                                Expanded(child: Text(profile.fullAddress)),
                              ],
                            ),
                            const SizedBox(height: 8),
                          ],
                          if (profile.baseLatitude != null) ...[
                            Row(
                              children: [
                                Icon(
                                  Icons.public,
                                  size: 20,
                                  color: Colors.grey.shade600,
                                ),
                                const SizedBox(width: 8),
                                Text('📍 ${profile.location}'),
                              ],
                            ),
                          ],
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),

                  // Estadísticas
                  Card(
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Icon(
                                Icons.analytics,
                                color: Colors.blue.shade700,
                              ),
                              const SizedBox(width: 8),
                              const Text(
                                'Estadísticas',
                                style: TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ],
                          ),
                          const Divider(),
                          _buildStatRow(
                            Icons.people,
                            'Técnicos',
                            '${profile.availableTechniciansCount}/${profile.techniciansCount} disponibles',
                          ),
                          _buildStatRow(
                            Icons.build,
                            'Servicios activos',
                            '${profile.activeServicesCount} servicios',
                          ),
                          _buildStatRow(
                            Icons.speed,
                            'Capacidad',
                            '${profile.currentActiveServices}/${profile.maxConcurrentServices}',
                          ),
                          _buildStatRow(
                            Icons.star,
                            'Calificación',
                            profile.averageRating.toStringAsFixed(1),
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),

                  // Servicios activos
                  Card(
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Icon(
                                Icons.miscellaneous_services,
                                color: Colors.blue.shade700,
                              ),
                              const SizedBox(width: 8),
                              const Text(
                                'Servicios Disponibles',
                                style: TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ],
                          ),
                          const Divider(),
                          ...profile.activeServices.map(
                            (service) => Padding(
                              padding: const EdgeInsets.symmetric(vertical: 4),
                              child: Row(
                                children: [
                                  Icon(
                                    Icons.check_circle,
                                    size: 16,
                                    color: Colors.green,
                                  ),
                                  const SizedBox(width: 8),
                                  Expanded(
                                    child: Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                        Text(
                                          service.title,
                                          style: const TextStyle(
                                            fontWeight: FontWeight.w500,
                                          ),
                                        ),
                                        Text(
                                          '${service.priceRange} · ${service.estimatedDurationMinutes} min',
                                          style: TextStyle(
                                            fontSize: 12,
                                            color: Colors.grey.shade600,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildStatRow(IconData icon, String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        children: [
          Icon(icon, size: 20, color: Colors.grey.shade600),
          const SizedBox(width: 12),
          Text(label, style: TextStyle(color: Colors.grey.shade700)),
          const Spacer(),
          Text(value, style: const TextStyle(fontWeight: FontWeight.bold)),
        ],
      ),
    );
  }
}
``

---

## mechanic_mobile/lib/presentation/pages/provider_tracking_page.dart

``dart
import 'package:flutter/material.dart';
import 'package:mechanic_mobile/core/di/injection_container.dart';
import '../../domain/entities/tracking.dart';
import '../viewmodels/provider_tracking_viewmodel.dart';

class ProviderTrackingPage extends StatefulWidget {
  final String incidentId;
  final String technicianId;

  const ProviderTrackingPage({
    super.key,
    required this.incidentId,
    required this.technicianId,
  });

  @override
  State<ProviderTrackingPage> createState() => _ProviderTrackingPageState();
}

class _ProviderTrackingPageState extends State<ProviderTrackingPage> {
  late ProviderTrackingViewModel _viewModel;
  late TrackingData _trackingData;

  @override
  void initState() {
    super.initState();
    _viewModel = sl<ProviderTrackingViewModel>();
    _loadData();
  }

  Future<void> _loadData() async {
    await _viewModel.loadLiveTracking(widget.incidentId);
    await _viewModel.loadTrackingHistory(widget.incidentId);

    if (_viewModel.trackingData != null && mounted) {
      setState(() {
        _trackingData = _viewModel.trackingData!;
      });
    }
  }

  void _showSnackBar(String message, {bool isError = false}) {
    ScaffoldMessenger.of(context).hideCurrentSnackBar();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Row(
          children: [
            Icon(
              isError ? Icons.error_outline : Icons.check_circle_outline,
              color: Colors.white,
            ),
            const SizedBox(width: 12),
            Expanded(child: Text(message)),
          ],
        ),
        backgroundColor: isError ? Colors.red.shade700 : Colors.blue.shade700,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        margin: const EdgeInsets.all(12),
        duration: const Duration(seconds: 3),
      ),
    );
  }

  Future<void> _showReportLocationDialog() async {
    final latController = TextEditingController();
    final lngController = TextEditingController();
    final accuracyController = TextEditingController();

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Reportar Ubicación'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: latController,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(
                labelText: 'Latitud *',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 12),
            TextField(
              controller: lngController,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(
                labelText: 'Longitud *',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 12),
            TextField(
              controller: accuracyController,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(
                labelText: 'Precisión (metros)',
                border: OutlineInputBorder(),
              ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancelar'),
          ),
          ElevatedButton(
            onPressed: () async {
              final lat = double.tryParse(latController.text);
              final lng = double.tryParse(lngController.text);

              if (lat == null || lng == null) {
                _showSnackBar('Ingrese coordenadas válidas', isError: true);
                return;
              }

              Navigator.pop(context);
              final result = await _viewModel.reportLocation(
                incidentId: widget.incidentId,
                latitude: lat,
                longitude: lng,
                technicianId: widget.technicianId,
                accuracyMeters: double.tryParse(accuracyController.text),
              );

              if (result != null) {
                setState(() {
                  _trackingData = result;
                });
                _showSnackBar('Ubicación reportada exitosamente');
                await _viewModel.loadTrackingHistory(widget.incidentId);
              } else {
                _showSnackBar(
                  _viewModel.errorMessage ?? 'Error al reportar ubicación',
                  isError: true,
                );
              }
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.blue.shade700,
              foregroundColor: Colors.white,
            ),
            child: const Text('Reportar'),
          ),
        ],
      ),
    );
  }

  Future<void> _refreshRoute() async {
    final result = await _viewModel.refreshRoute(widget.incidentId);
    if (result != null) {
      setState(() {
        _trackingData = result;
      });
      _showSnackBar('Ruta actualizada');
    } else {
      _showSnackBar(
        _viewModel.errorMessage ?? 'Error al actualizar ruta',
        isError: true,
      );
    }
  }

  String _formatDateTime(DateTime? date) {
    if (date == null) return 'N/A';
    return '${date.day}/${date.month}/${date.year} ${date.hour}:${date.minute.toString().padLeft(2, '0')}';
  }

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Seguimiento de Servicio'),
          backgroundColor: Colors.blue.shade800,
          foregroundColor: Colors.white,
          elevation: 2,
          bottom: const TabBar(
            tabs: [
              Tab(icon: Icon(Icons.location_pin), text: 'En Vivo'),
              Tab(icon: Icon(Icons.history), text: 'Historial'),
            ],
          ),
          actions: [
            IconButton(
              icon: const Icon(Icons.refresh),
              onPressed: _loadData,
              tooltip: 'Actualizar',
            ),
          ],
        ),
        body: ListenableBuilder(
          listenable: _viewModel,
          builder: (context, _) {
            if (_viewModel.isLoading && _viewModel.trackingData == null) {
              return const Center(
                child: CircularProgressIndicator(
                  valueColor: AlwaysStoppedAnimation<Color>(Colors.blue),
                ),
              );
            }

            if (_viewModel.errorMessage != null &&
                _viewModel.trackingData == null) {
              return Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(
                      Icons.error_outline,
                      size: 64,
                      color: Colors.red.shade300,
                    ),
                    const SizedBox(height: 16),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 32),
                      child: Text(
                        _viewModel.errorMessage!,
                        style: TextStyle(color: Colors.grey.shade600),
                        textAlign: TextAlign.center,
                      ),
                    ),
                    const SizedBox(height: 16),
                    ElevatedButton.icon(
                      onPressed: _loadData,
                      icon: const Icon(Icons.refresh),
                      label: const Text('Reintentar'),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.blue,
                        foregroundColor: Colors.white,
                      ),
                    ),
                  ],
                ),
              );
            }

            if (_viewModel.trackingData == null) {
              return const SizedBox.shrink();
            }

            return TabBarView(
              children: [
                // Live Tracking Tab
                RefreshIndicator(
                  onRefresh: _loadData,
                  color: Colors.blue,
                  child: SingleChildScrollView(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Estado actual
                        Card(
                          color: _getStatusColor(
                            _trackingData.status,
                          ).withValues(alpha: 0.1),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(16),
                          ),
                          child: Padding(
                            padding: const EdgeInsets.all(16),
                            child: Row(
                              children: [
                                Icon(
                                  _getStatusIcon(_trackingData.status),
                                  color: _getStatusColor(_trackingData.status),
                                  size: 32,
                                ),
                                const SizedBox(width: 16),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      const Text(
                                        'Estado Actual',
                                        style: TextStyle(
                                          fontSize: 12,
                                          color: Colors.grey,
                                        ),
                                      ),
                                      Text(
                                        _getStatusText(_trackingData.status),
                                        style: TextStyle(
                                          fontSize: 20,
                                          fontWeight: FontWeight.bold,
                                          color: _getStatusColor(
                                            _trackingData.status,
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                        const SizedBox(height: 16),

                        // Información del incidente
                        Card(
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(16),
                          ),
                          child: Padding(
                            padding: const EdgeInsets.all(16),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Text(
                                  'Información del Incidente',
                                  style: TextStyle(
                                    fontSize: 18,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                const Divider(),
                                _buildInfoRow('Título', _trackingData.title),
                                _buildInfoRow(
                                  'Descripción',
                                  _trackingData.description,
                                ),
                                _buildInfoRow(
                                  'Prioridad',
                                  _trackingData.priority,
                                ),
                                if (_trackingData.addressReference != null)
                                  _buildInfoRow(
                                    'Dirección',
                                    _trackingData.addressReference!,
                                  ),
                                _buildInfoRow(
                                  'Ubicación',
                                  _trackingData.incidentLocation,
                                ),
                              ],
                            ),
                          ),
                        ),
                        const SizedBox(height: 16),

                        // Información del cliente
                        if (_trackingData.clientUser != null)
                          Card(
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(16),
                            ),
                            child: Padding(
                              padding: const EdgeInsets.all(16),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Text(
                                    'Información del Cliente',
                                    style: TextStyle(
                                      fontSize: 18,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  const Divider(),
                                  _buildInfoRow(
                                    'Nombre',
                                    _trackingData.clientUser!.fullName,
                                  ),
                                  _buildInfoRow(
                                    'Teléfono',
                                    _trackingData.clientUser!.phoneNumber ??
                                        'N/A',
                                  ),
                                ],
                              ),
                            ),
                          ),
                        const SizedBox(height: 16),

                        // Ubicación actual del respondedor
                        if (_trackingData.responderPosition != null)
                          Card(
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(16),
                            ),
                            child: Padding(
                              padding: const EdgeInsets.all(16),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    children: [
                                      Icon(
                                        Icons.location_on,
                                        color: Colors.blue.shade700,
                                      ),
                                      const SizedBox(width: 8),
                                      const Text(
                                        'Ubicación Actual',
                                        style: TextStyle(
                                          fontSize: 18,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                    ],
                                  ),
                                  const Divider(),
                                  _buildInfoRow(
                                    'Coordenadas',
                                    _trackingData.responderPosition!.location,
                                  ),
                                  _buildInfoRow(
                                    'Actualizado',
                                    _formatDateTime(
                                      _trackingData
                                          .responderPosition!
                                          .recordedAt,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        const SizedBox(height: 16),

                        // Información de ruta
                        if (_trackingData.route != null)
                          Card(
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(16),
                            ),
                            child: Padding(
                              padding: const EdgeInsets.all(16),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    children: [
                                      Icon(
                                        Icons.route,
                                        color: Colors.blue.shade700,
                                      ),
                                      const SizedBox(width: 8),
                                      const Text(
                                        'Información de Ruta',
                                        style: TextStyle(
                                          fontSize: 18,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                    ],
                                  ),
                                  const Divider(),
                                  _buildInfoRow(
                                    'Distancia',
                                    _trackingData.formattedDistance,
                                  ),
                                  _buildInfoRow(
                                    'ETA estimado',
                                    _trackingData.formattedEta,
                                  ),
                                  if (_trackingData.route!.errorMessage != null)
                                    Container(
                                      padding: const EdgeInsets.all(8),
                                      decoration: BoxDecoration(
                                        color: Colors.orange.shade50,
                                        borderRadius: BorderRadius.circular(8),
                                      ),
                                      child: Row(
                                        children: [
                                          Icon(
                                            Icons.warning_amber,
                                            size: 16,
                                            color: Colors.orange.shade700,
                                          ),
                                          const SizedBox(width: 8),
                                          Expanded(
                                            child: Text(
                                              _trackingData
                                                  .route!
                                                  .errorMessage!,
                                              style: TextStyle(
                                                fontSize: 12,
                                                color: Colors.orange.shade800,
                                              ),
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                ],
                              ),
                            ),
                          ),
                        const SizedBox(height: 16),

                        // Botones de acción
                        Row(
                          children: [
                            Expanded(
                              child: ElevatedButton.icon(
                                onPressed: _showReportLocationDialog,
                                icon: const Icon(Icons.my_location),
                                label: const Text('Reportar Ubicación'),
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: Colors.blue.shade700,
                                  foregroundColor: Colors.white,
                                  padding: const EdgeInsets.symmetric(
                                    vertical: 12,
                                  ),
                                ),
                              ),
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: OutlinedButton.icon(
                                onPressed: _refreshRoute,
                                icon: const Icon(Icons.refresh),
                                label: const Text('Actualizar Ruta'),
                                style: OutlinedButton.styleFrom(
                                  foregroundColor: Colors.blue.shade700,
                                  padding: const EdgeInsets.symmetric(
                                    vertical: 12,
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),

                // Tracking History Tab
                RefreshIndicator(
                  onRefresh: () =>
                      _viewModel.loadTrackingHistory(widget.incidentId),
                  color: Colors.blue,
                  child: _viewModel.history.isEmpty
                      ? Center(
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(
                                Icons.history,
                                size: 64,
                                color: Colors.blue.shade200,
                              ),
                              const SizedBox(height: 16),
                              Text(
                                'No hay historial de ubicaciones',
                                style: TextStyle(
                                  fontSize: 18,
                                  color: Colors.grey.shade600,
                                  fontWeight: FontWeight.w500,
                                ),
                              ),
                              const SizedBox(height: 8),
                              Text(
                                'Las ubicaciones reportadas aparecerán aquí',
                                style: TextStyle(color: Colors.grey.shade500),
                              ),
                            ],
                          ),
                        )
                      : ListView.builder(
                          padding: const EdgeInsets.all(12),
                          itemCount: _viewModel.history.length,
                          itemBuilder: (context, index) {
                            final item = _viewModel.history[index];
                            return Card(
                              margin: const EdgeInsets.only(bottom: 12),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(16),
                              ),
                              child: ListTile(
                                leading: CircleAvatar(
                                  backgroundColor: Colors.blue.shade100,
                                  child: const Icon(
                                    Icons.location_on,
                                    color: Colors.blue,
                                  ),
                                ),
                                title: Text(
                                  item.location,
                                  style: const TextStyle(
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                subtitle: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text('📡 ${item.sourceType}'),
                                    if (item.accuracyMeters != null)
                                      Text(
                                        '🎯 Precisión: ${item.accuracyMeters!.toStringAsFixed(0)} m',
                                      ),
                                    if (item.technicianFullName != null)
                                      Text('👨‍🔧 ${item.technicianFullName}'),
                                  ],
                                ),
                                trailing: Text(
                                  item.formattedTime,
                                  style: TextStyle(
                                    color: Colors.grey.shade600,
                                    fontSize: 12,
                                  ),
                                ),
                                isThreeLine: true,
                              ),
                            );
                          },
                        ),
                ),
              ],
            );
          },
        ),
      ),
    );
  }

  Widget _buildInfoRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            width: 100,
            child: Text(
              label,
              style: const TextStyle(
                fontWeight: FontWeight.w600,
                color: Colors.grey,
              ),
            ),
          ),
          Expanded(child: Text(value, style: const TextStyle(fontSize: 14))),
        ],
      ),
    );
  }

  Color _getStatusColor(String status) {
    switch (status) {
      case 'ASSIGNED':
        return const Color(0xFF9C27B0);
      case 'EN_ROUTE':
        return const Color(0xFF00BCD4);
      case 'ON_SITE':
        return const Color(0xFF00897B);
      case 'IN_PROGRESS':
        return const Color(0xFF3F51B5);
      case 'COMPLETED':
        return const Color(0xFF4CAF50);
      case 'CANCELLED':
        return const Color(0xFFF44336);
      default:
        return Colors.grey;
    }
  }

  IconData _getStatusIcon(String status) {
    switch (status) {
      case 'ASSIGNED':
        return Icons.person_add;
      case 'EN_ROUTE':
        return Icons.directions_car;
      case 'ON_SITE':
        return Icons.location_on;
      case 'IN_PROGRESS':
        return Icons.build;
      case 'COMPLETED':
        return Icons.check_circle;
      case 'CANCELLED':
        return Icons.cancel;
      default:
        return Icons.info;
    }
  }

  String _getStatusText(String status) {
    switch (status) {
      case 'ASSIGNED':
        return 'Asignado';
      case 'EN_ROUTE':
        return 'En camino';
      case 'ON_SITE':
        return 'En el lugar';
      case 'IN_PROGRESS':
        return 'En progreso';
      case 'COMPLETED':
        return 'Completado';
      case 'CANCELLED':
        return 'Cancelado';
      default:
        return status;
    }
  }
}
``

---

## mechanic_mobile/lib/presentation/pages/register_page.dart

``dart
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../core/di/injection_container.dart';
import '../viewmodels/auth_viewmodel.dart';

class RegisterPage extends StatefulWidget {
  const RegisterPage({super.key});

  @override
  State<RegisterPage> createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  late final AuthViewModel _authViewModel;

  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();
  final _firstNameController = TextEditingController();
  final _lastNameController = TextEditingController();
  final _phoneController = TextEditingController();

  final _businessNameController = TextEditingController();
  final _legalNameController = TextEditingController();
  final _descriptionController = TextEditingController();
  final _contactEmailController = TextEditingController();
  final _contactPhoneController = TextEditingController();
  final _cityController = TextEditingController();
  final _addressController = TextEditingController();

  // ✅ Variables para mostrar/ocultar contraseñas
  bool _showPassword = false;
  bool _showConfirmPassword = false;
  String _accountType = 'CLIENT';
  bool _acceptedTerms = false;

  // Estados de error
  String? _emailError;
  String? _passwordError;
  String? _confirmPasswordError;
  String? _firstNameError;
  String? _lastNameError;
  String? _phoneError;
  String? _businessNameError;
  String? _cityError;
  String? _addressError;

  @override
  void initState() {
    super.initState();
    _authViewModel = sl<AuthViewModel>();

    // Agregar listeners para validación en tiempo real
    _emailController.addListener(_validateEmail);
    _passwordController.addListener(_validatePassword);
    _confirmPasswordController.addListener(_validateConfirmPassword);
    _firstNameController.addListener(_validateFirstName);
    _lastNameController.addListener(_validateLastName);
    _phoneController.addListener(_validatePhone);
    _businessNameController.addListener(_validateBusinessName);
    _cityController.addListener(_validateCity);
    _addressController.addListener(_validateAddress);
  }

  @override
  void dispose() {
    _emailController.removeListener(_validateEmail);
    _passwordController.removeListener(_validatePassword);
    _confirmPasswordController.removeListener(_validateConfirmPassword);
    _firstNameController.removeListener(_validateFirstName);
    _lastNameController.removeListener(_validateLastName);
    _phoneController.removeListener(_validatePhone);
    _businessNameController.removeListener(_validateBusinessName);
    _cityController.removeListener(_validateCity);
    _addressController.removeListener(_validateAddress);
    _emailController.dispose();
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    _firstNameController.dispose();
    _lastNameController.dispose();
    _phoneController.dispose();
    _businessNameController.dispose();
    _legalNameController.dispose();
    _descriptionController.dispose();
    _contactEmailController.dispose();
    _contactPhoneController.dispose();
    _cityController.dispose();
    _addressController.dispose();
    super.dispose();
  }

  // Validaciones en tiempo real
  void _validateEmail() {
    setState(() {
      final email = _emailController.text.trim();
      if (email.isEmpty) {
        _emailError = null;
      } else if (!email.contains('@')) {
        _emailError = 'El email debe contener @';
      } else if (!email.contains('.') ||
          email.indexOf('@') == 0 ||
          email.endsWith('@')) {
        _emailError = 'Ingresa un email válido (ejemplo@dominio.com)';
      } else {
        _emailError = null;
      }
    });
  }

  // ✅ Validación de contraseña actualizada: solo 8 caracteres
  void _validatePassword() {
    setState(() {
      final password = _passwordController.text;
      if (password.isEmpty) {
        _passwordError = null;
      } else if (password.length < 8) {
        _passwordError = 'La contraseña debe tener al menos 8 caracteres';
      } else {
        _passwordError = null;
      }
      // Revalidar confirmación cuando cambia la contraseña
      _validateConfirmPassword();
    });
  }

  void _validateConfirmPassword() {
    setState(() {
      final password = _passwordController.text;
      final confirm = _confirmPasswordController.text;
      if (confirm.isEmpty) {
        _confirmPasswordError = null;
      } else if (password != confirm) {
        _confirmPasswordError = 'Las contraseñas no coinciden';
      } else {
        _confirmPasswordError = null;
      }
    });
  }

  void _validateFirstName() {
    setState(() {
      final name = _firstNameController.text.trim();
      if (name.isEmpty) {
        _firstNameError = null;
      } else if (name.length < 2) {
        _firstNameError = 'El nombre debe tener al menos 2 caracteres';
      } else {
        _firstNameError = null;
      }
    });
  }

  void _validateLastName() {
    setState(() {
      final lastName = _lastNameController.text.trim();
      if (lastName.isEmpty) {
        _lastNameError = null;
      } else if (lastName.length < 2) {
        _lastNameError = 'El apellido debe tener al menos 2 caracteres';
      } else {
        _lastNameError = null;
      }
    });
  }

  void _validatePhone() {
    setState(() {
      final phone = _phoneController.text.trim();
      if (phone.isEmpty) {
        _phoneError = null;
      } else if (phone.length < 8) {
        _phoneError = 'El teléfono debe tener al menos 8 dígitos';
      } else if (!RegExp(r'^[0-9]+$').hasMatch(phone)) {
        _phoneError = 'Solo se permiten números';
      } else {
        _phoneError = null;
      }
    });
  }

  void _validateBusinessName() {
    if (_accountType != 'WORKSHOP') return;
    setState(() {
      final name = _businessNameController.text.trim();
      if (name.isEmpty) {
        _businessNameError = null;
      } else if (name.length < 3) {
        _businessNameError =
            'El nombre del negocio debe tener al menos 3 caracteres';
      } else {
        _businessNameError = null;
      }
    });
  }

  void _validateCity() {
    if (_accountType != 'WORKSHOP') return;
    setState(() {
      final city = _cityController.text.trim();
      if (city.isEmpty) {
        _cityError = null;
      } else if (city.length < 2) {
        _cityError = 'La ciudad debe tener al menos 2 caracteres';
      } else {
        _cityError = null;
      }
    });
  }

  void _validateAddress() {
    if (_accountType != 'WORKSHOP') return;
    setState(() {
      final address = _addressController.text.trim();
      if (address.isEmpty) {
        _addressError = null;
      } else if (address.length < 5) {
        _addressError = 'La dirección debe tener al menos 5 caracteres';
      } else {
        _addressError = null;
      }
    });
  }

  void _showSnackBar(String message, {bool isError = false}) {
    ScaffoldMessenger.of(context).hideCurrentSnackBar();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Row(
          children: [
            Icon(
              isError ? Icons.error_outline : Icons.check_circle_outline,
              color: Colors.white,
              size: 20,
            ),
            const SizedBox(width: 12),
            Expanded(child: Text(message)),
          ],
        ),
        backgroundColor: isError ? Colors.red.shade700 : Colors.blue.shade700,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        margin: const EdgeInsets.all(12),
        duration: const Duration(seconds: 3),
      ),
    );
  }

  bool _validateForm() {
    bool isValid = true;

    // Validar email
    final email = _emailController.text.trim();
    if (email.isEmpty) {
      _emailError = 'El email es requerido';
      isValid = false;
    } else if (!email.contains('@')) {
      _emailError = 'El email debe contener @';
      isValid = false;
    } else {
      _emailError = null;
    }

    // ✅ Validar password (solo 8 caracteres)
    final password = _passwordController.text;
    if (password.isEmpty) {
      _passwordError = 'La contraseña es requerida';
      isValid = false;
    } else if (password.length < 8) {
      _passwordError = 'La contraseña debe tener al menos 8 caracteres';
      isValid = false;
    } else {
      _passwordError = null;
    }

    // Validar confirmación
    if (_confirmPasswordController.text.isEmpty) {
      _confirmPasswordError = 'Confirma tu contraseña';
      isValid = false;
    } else if (password != _confirmPasswordController.text) {
      _confirmPasswordError = 'Las contraseñas no coinciden';
      isValid = false;
    } else {
      _confirmPasswordError = null;
    }

    // Validar nombre
    if (_firstNameController.text.trim().isEmpty) {
      _firstNameError = 'El nombre es requerido';
      isValid = false;
    } else if (_firstNameController.text.trim().length < 2) {
      _firstNameError = 'El nombre debe tener al menos 2 caracteres';
      isValid = false;
    } else {
      _firstNameError = null;
    }

    // Validar apellido
    if (_lastNameController.text.trim().isEmpty) {
      _lastNameError = 'El apellido es requerido';
      isValid = false;
    } else if (_lastNameController.text.trim().length < 2) {
      _lastNameError = 'El apellido debe tener al menos 2 caracteres';
      isValid = false;
    } else {
      _lastNameError = null;
    }

    // Validar teléfono
    final phone = _phoneController.text.trim();
    if (phone.isEmpty) {
      _phoneError = 'El teléfono es requerido';
      isValid = false;
    } else if (phone.length < 8) {
      _phoneError = 'El teléfono debe tener al menos 8 dígitos';
      isValid = false;
    } else if (!RegExp(r'^[0-9]+$').hasMatch(phone)) {
      _phoneError = 'Solo se permiten números';
      isValid = false;
    } else {
      _phoneError = null;
    }

    // Validar campos de taller si aplica
    if (_accountType == 'WORKSHOP') {
      if (_businessNameController.text.trim().isEmpty) {
        _businessNameError = 'El nombre del negocio es requerido';
        isValid = false;
      } else if (_businessNameController.text.trim().length < 3) {
        _businessNameError = 'Debe tener al menos 3 caracteres';
        isValid = false;
      } else {
        _businessNameError = null;
      }

      if (_cityController.text.trim().isEmpty) {
        _cityError = 'La ciudad es requerida';
        isValid = false;
      } else if (_cityController.text.trim().length < 2) {
        _cityError = 'Debe tener al menos 2 caracteres';
        isValid = false;
      } else {
        _cityError = null;
      }

      if (_addressController.text.trim().isEmpty) {
        _addressError = 'La dirección es requerida';
        isValid = false;
      } else if (_addressController.text.trim().length < 5) {
        _addressError = 'Debe tener al menos 5 caracteres';
        isValid = false;
      } else {
        _addressError = null;
      }
    }

    if (!_acceptedTerms) {
      _showSnackBar('Debes aceptar los términos y condiciones', isError: true);
      isValid = false;
    }

    setState(() {});
    return isValid;
  }

  Map<String, dynamic> _buildRegisterBody() {
    final body = <String, dynamic>{
      "email": _emailController.text.trim(),
      "password": _passwordController.text,
      "first_name": _firstNameController.text.trim(),
      "last_name": _lastNameController.text.trim(),
      "account_type": _accountType,
      "phone_number": _phoneController.text.trim(),
    };

    if (_accountType == 'WORKSHOP') {
      body["provider_profile"] = {
        "business_name": _businessNameController.text.trim(),
        "legal_name": _legalNameController.text.trim(),
        "description": _descriptionController.text.trim(),
        "contact_email": _contactEmailController.text.trim(),
        "contact_phone": _contactPhoneController.text.trim(),
        "city": _cityController.text.trim(),
        "address": _addressController.text.trim(),
      };
    }
    return body;
  }

  Future<void> _onRegister() async {
    if (!_validateForm()) return;

    final success = await _authViewModel.register(_buildRegisterBody());
    if (!mounted) return;

    if (success) {
      _showSnackBar('¡Registro exitoso! Ahora puedes iniciar sesión');
      Future.delayed(const Duration(seconds: 2), () {
        if (mounted) context.go('/login');
      });
    } else {
      _showSnackBar(
        _authViewModel.errorMessage ?? 'Error al registrar usuario',
        isError: true,
      );
    }
  }

  Widget _buildTextField({
    required TextEditingController controller,
    required String label,
    String? hint,
    IconData? prefixIcon,
    bool obscure = false,
    TextInputType keyboardType = TextInputType.text,
    String? errorText,
    VoidCallback? onChanged,
    Widget? suffixIcon,
  }) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          TextField(
            controller: controller,
            obscureText: obscure,
            keyboardType: keyboardType,
            textInputAction: TextInputAction.next,
            onChanged: (_) => onChanged?.call(),
            decoration: InputDecoration(
              labelText: label,
              hintText: hint,
              prefixIcon: prefixIcon != null
                  ? Icon(prefixIcon, color: Colors.blue.shade700)
                  : null,
              suffixIcon: suffixIcon,
              errorText: errorText,
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
              ),
              focusedBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
                borderSide: BorderSide(color: Colors.blue.shade700, width: 2),
              ),
              errorBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
                borderSide: BorderSide(color: Colors.red.shade400, width: 1),
              ),
              focusedErrorBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
                borderSide: BorderSide(color: Colors.red.shade400, width: 2),
              ),
              contentPadding: const EdgeInsets.symmetric(
                horizontal: 16,
                vertical: 14,
              ),
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Crear cuenta'),
        backgroundColor: Colors.blue.shade800,
        foregroundColor: Colors.white,
        elevation: 0,
      ),
      body: ListenableBuilder(
        listenable: _authViewModel,
        builder: (context, _) {
          final isLoading = _authViewModel.isLoading;
          return Stack(
            children: [
              Container(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [Colors.blue.shade50, Colors.white],
                  ),
                ),
              ),
              SingleChildScrollView(
                padding: const EdgeInsets.all(20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Step indicator
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 16,
                        vertical: 8,
                      ),
                      decoration: BoxDecoration(
                        color: Colors.blue.shade50,
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Icon(
                            Icons.person_add,
                            size: 18,
                            color: Colors.blue.shade800,
                          ),
                          const SizedBox(width: 8),
                          Text(
                            'Datos de acceso',
                            style: TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.w500,
                              color: Colors.blue.shade800,
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 16),

                    // Email field
                    _buildTextField(
                      controller: _emailController,
                      label: 'Correo electrónico',
                      hint: 'usuario@ejemplo.com',
                      prefixIcon: Icons.email_outlined,
                      keyboardType: TextInputType.emailAddress,
                      errorText: _emailError,
                    ),

                    // Password field with requirements indicator
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        _buildTextField(
                          controller: _passwordController,
                          label: 'Contraseña',
                          obscure: !_showPassword,
                          prefixIcon: Icons.lock_outline,
                          hint: 'Mínimo 8 caracteres',
                          errorText: _passwordError,
                          suffixIcon: IconButton(
                            icon: Icon(
                              _showPassword
                                  ? Icons.visibility_off
                                  : Icons.visibility,
                              color: Colors.grey.shade500,
                            ),
                            onPressed: () {
                              setState(() => _showPassword = !_showPassword);
                            },
                          ),
                        ),
                      ],
                    ),

                    // Confirm password field
                    _buildTextField(
                      controller: _confirmPasswordController,
                      label: 'Confirmar contraseña',
                      obscure: !_showConfirmPassword,
                      prefixIcon: Icons.lock_outline,
                      errorText: _confirmPasswordError,
                      suffixIcon: IconButton(
                        icon: Icon(
                          _showConfirmPassword
                              ? Icons.visibility_off
                              : Icons.visibility,
                          color: Colors.grey.shade500,
                        ),
                        onPressed: () {
                          setState(
                            () => _showConfirmPassword = !_showConfirmPassword,
                          );
                        },
                      ),
                    ),

                    // First name
                    _buildTextField(
                      controller: _firstNameController,
                      label: 'Nombre',
                      prefixIcon: Icons.person_outline,
                      errorText: _firstNameError,
                    ),

                    // Last name
                    _buildTextField(
                      controller: _lastNameController,
                      label: 'Apellido',
                      prefixIcon: Icons.person_outline,
                      errorText: _lastNameError,
                    ),

                    // Phone
                    _buildTextField(
                      controller: _phoneController,
                      label: 'Teléfono',
                      prefixIcon: Icons.phone_outlined,
                      keyboardType: TextInputType.phone,
                      errorText: _phoneError,
                    ),

                    const SizedBox(height: 16),

                    // Account type
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 4),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Tipo de cuenta *',
                            style: TextStyle(
                              fontSize: 14,
                              fontWeight: FontWeight.w500,
                              color: Colors.grey.shade700,
                            ),
                          ),
                          const SizedBox(height: 8),
                          Container(
                            decoration: BoxDecoration(
                              border: Border.all(color: Colors.grey.shade300),
                              borderRadius: BorderRadius.circular(12),
                            ),
                            child: DropdownButtonFormField<String>(
                              initialValue: _accountType,
                              decoration: const InputDecoration(
                                border: InputBorder.none,
                                contentPadding: EdgeInsets.symmetric(
                                  horizontal: 16,
                                ),
                              ),
                              items: const [
                                DropdownMenuItem(
                                  value: 'CLIENT',
                                  child: Row(
                                    children: [
                                      Icon(Icons.person, size: 20),
                                      SizedBox(width: 8),
                                      Text('Cliente particular'),
                                    ],
                                  ),
                                ),
                                DropdownMenuItem(
                                  value: 'WORKSHOP',
                                  child: Row(
                                    children: [
                                      Icon(Icons.build, size: 20),
                                      SizedBox(width: 8),
                                      Text('Taller mecánico'),
                                    ],
                                  ),
                                ),
                                DropdownMenuItem(
                                  value: 'INDEPENDENT_MECHANIC',
                                  child: Row(
                                    children: [
                                      Icon(Icons.handyman, size: 20),
                                      SizedBox(width: 8),
                                      Text('Mecánico independiente'),
                                    ],
                                  ),
                                ),
                              ],
                              onChanged: (value) {
                                if (value != null) {
                                  setState(() => _accountType = value);
                                }
                              },
                            ),
                          ),
                        ],
                      ),
                    ),

                    const SizedBox(height: 16),

                    // Workshop specific fields
                    if (_accountType == 'WORKSHOP') ...[
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 4),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const SizedBox(height: 8),
                            Container(
                              padding: const EdgeInsets.symmetric(
                                horizontal: 16,
                                vertical: 8,
                              ),
                              decoration: BoxDecoration(
                                color: Colors.blue.shade50,
                                borderRadius: BorderRadius.circular(20),
                              ),
                              child: Row(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  Icon(
                                    Icons.factory,
                                    size: 18,
                                    color: Colors.blue.shade800,
                                  ),
                                  const SizedBox(width: 8),
                                  Text(
                                    'Información del taller',
                                    style: TextStyle(
                                      fontSize: 12,
                                      fontWeight: FontWeight.w500,
                                      color: Colors.blue.shade800,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            const SizedBox(height: 16),
                          ],
                        ),
                      ),
                      _buildTextField(
                        controller: _businessNameController,
                        label: 'Nombre del negocio',
                        prefixIcon: Icons.business,
                        errorText: _businessNameError,
                      ),
                      _buildTextField(
                        controller: _legalNameController,
                        label: 'Razón social',
                        prefixIcon: Icons.description,
                      ),
                      _buildTextField(
                        controller: _descriptionController,
                        label: 'Descripción',
                        hint: 'Describe los servicios que ofreces',
                        prefixIcon: Icons.info_outline,
                      ),
                      _buildTextField(
                        controller: _contactEmailController,
                        label: 'Email de contacto',
                        hint: 'contacto@taller.com',
                        prefixIcon: Icons.email_outlined,
                        keyboardType: TextInputType.emailAddress,
                      ),
                      _buildTextField(
                        controller: _contactPhoneController,
                        label: 'Teléfono de contacto',
                        prefixIcon: Icons.phone_outlined,
                        keyboardType: TextInputType.phone,
                      ),
                      _buildTextField(
                        controller: _cityController,
                        label: 'Ciudad',
                        prefixIcon: Icons.location_city,
                        errorText: _cityError,
                      ),
                      _buildTextField(
                        controller: _addressController,
                        label: 'Dirección',
                        prefixIcon: Icons.location_on_outlined,
                        errorText: _addressError,
                      ),
                    ],

                    const SizedBox(height: 16),

                    // Terms and conditions
                    Row(
                      children: [
                        Checkbox(
                          value: _acceptedTerms,
                          onChanged: (value) {
                            setState(() => _acceptedTerms = value ?? false);
                          },
                          activeColor: Colors.blue.shade700,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(4),
                          ),
                        ),
                        Expanded(
                          child: GestureDetector(
                            onTap: () {
                              setState(() => _acceptedTerms = !_acceptedTerms);
                            },
                            child: RichText(
                              text: TextSpan(
                                style: TextStyle(color: Colors.grey.shade700),
                                children: [
                                  const TextSpan(text: 'Acepto los '),
                                  TextSpan(
                                    text: 'términos y condiciones',
                                    style: TextStyle(
                                      color: Colors.blue.shade700,
                                      fontWeight: FontWeight.w600,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),

                    const SizedBox(height: 24),

                    // Register button
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton(
                        onPressed: isLoading ? null : _onRegister,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.blue.shade800,
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(vertical: 16),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(12),
                          ),
                          elevation: 2,
                        ),
                        child: isLoading
                            ? const SizedBox(
                                height: 20,
                                width: 20,
                                child: CircularProgressIndicator(
                                  strokeWidth: 2,
                                  valueColor: AlwaysStoppedAnimation<Color>(
                                    Colors.white,
                                  ),
                                ),
                              )
                            : const Text(
                                'Registrarme',
                                style: TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                      ),
                    ),

                    const SizedBox(height: 16),

                    // Login link
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          '¿Ya tienes cuenta?',
                          style: TextStyle(color: Colors.grey.shade600),
                        ),
                        TextButton(
                          onPressed: () => context.go('/login'),
                          child: Text(
                            'Inicia sesión aquí',
                            style: TextStyle(
                              color: Colors.blue.shade700,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),
                      ],
                    ),

                    const SizedBox(height: 32),
                  ],
                ),
              ),

              // Loading overlay
              if (isLoading)
                Container(
                  color: Colors.black.withValues(alpha: 0.3),
                  child: const Center(
                    child: Card(
                      child: Padding(
                        padding: EdgeInsets.all(20),
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            CircularProgressIndicator(),
                            SizedBox(height: 12),
                            Text('Creando cuenta...'),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
            ],
          );
        },
      ),
    );
  }
}
``

---

## mechanic_mobile/lib/presentation/pages/request_detail_page.dart

``dart
import 'package:flutter/material.dart';
import '../../domain/entities/service_request.dart';

class RequestDetailPage extends StatelessWidget {
  final ServiceRequest request;

  const RequestDetailPage({super.key, required this.request});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Detalles de la Solicitud')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildStatusCard(context),
            const SizedBox(height: 16),
            _buildDetailSection(
              'Descripción',
              request.description,
              Icons.info_outline,
            ),
            const Divider(),
            _buildDetailSection(
              'Vehículo',
              request.vehicleDetails,
              Icons.directions_car,
            ),
            const Divider(),
            _buildDetailSection(
              'Ubicación (Dirección)',
              request.address,
              Icons.location_on,
            ),
            const Divider(),
            _buildDetailSection(
              'Mecánico Asignado',
              '${request.mechanicName} - ${request.mechanicPhone}',
              Icons.person,
            ),
            const Divider(),
            _buildDetailSection(
              'Método de Pago',
              request.paymentMethod,
              Icons.payment,
            ),
            const Divider(),
            _buildDetailSection(
              'Costo Total',
              '\$${request.totalCost.toStringAsFixed(2)}',
              Icons.monetization_on,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStatusCard(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Theme.of(context).primaryColor.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Theme.of(context).primaryColor),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          const Text(
            'Estado actual:',
            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
          ),
          Text(
            request.status,
            style: TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 18,
              color: Theme.of(context).primaryColor,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDetailSection(String title, String content, IconData icon) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, color: Colors.grey[700], size: 28),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(
                    fontWeight: FontWeight.w500,
                    color: Colors.grey,
                  ),
                ),
                const SizedBox(height: 4),
                Text(content, style: const TextStyle(fontSize: 16)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
``

---

## mechanic_mobile/lib/presentation/pages/technicians_page.dart

``dart
import 'package:flutter/material.dart';
import 'package:mechanic_mobile/core/di/injection_container.dart';
import 'package:mechanic_mobile/domain/entities/technician.dart';
import '../viewmodels/technicians_viewmodel.dart';

class TechniciansPage extends StatefulWidget {
  const TechniciansPage({super.key});

  @override
  State<TechniciansPage> createState() => _TechniciansPageState();
}

class _TechniciansPageState extends State<TechniciansPage> {
  late TechniciansViewModel _viewModel;

  @override
  void initState() {
    super.initState();
    _viewModel = sl<TechniciansViewModel>();
    _viewModel.loadTechnicians();
  }

  void _showSnackBar(String message, {bool isError = false}) {
    ScaffoldMessenger.of(context).hideCurrentSnackBar();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Row(
          children: [
            Icon(
              isError ? Icons.error_outline : Icons.check_circle_outline,
              color: Colors.white,
            ),
            const SizedBox(width: 12),
            Expanded(child: Text(message)),
          ],
        ),
        backgroundColor: isError ? Colors.red.shade700 : Colors.blue.shade700,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        margin: const EdgeInsets.all(12),
        duration: const Duration(seconds: 3),
      ),
    );
  }

  void _showCreateTechnicianDialog() {
    final formKey = GlobalKey<FormState>();
    final firstNameController = TextEditingController();
    final lastNameController = TextEditingController();
    final phoneController = TextEditingController();
    final specialtyController = TextEditingController();
    bool isAvailable = true;
    double? latitude;
    double? longitude;

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Row(
          children: [
            Icon(Icons.person_add, color: Colors.blue.shade800),
            const SizedBox(width: 8),
            const Text('Nuevo Técnico'),
          ],
        ),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        content: SingleChildScrollView(
          child: Form(
            key: formKey,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextFormField(
                  controller: firstNameController,
                  decoration: const InputDecoration(
                    labelText: 'Nombre *',
                    prefixIcon: Icon(Icons.person_outline),
                    border: OutlineInputBorder(),
                  ),
                  validator: (value) =>
                      value == null || value.isEmpty ? 'Campo requerido' : null,
                ),
                const SizedBox(height: 12),
                TextFormField(
                  controller: lastNameController,
                  decoration: const InputDecoration(
                    labelText: 'Apellido *',
                    prefixIcon: Icon(Icons.person_outline),
                    border: OutlineInputBorder(),
                  ),
                  validator: (value) =>
                      value == null || value.isEmpty ? 'Campo requerido' : null,
                ),
                const SizedBox(height: 12),
                TextFormField(
                  controller: phoneController,
                  keyboardType: TextInputType.phone,
                  decoration: const InputDecoration(
                    labelText: 'Teléfono *',
                    prefixIcon: Icon(Icons.phone_outlined),
                    border: OutlineInputBorder(),
                  ),
                  validator: (value) =>
                      value == null || value.isEmpty ? 'Campo requerido' : null,
                ),
                const SizedBox(height: 12),
                TextFormField(
                  controller: specialtyController,
                  decoration: const InputDecoration(
                    labelText: 'Especialidad *',
                    hintText: 'Ej: Auxilio eléctrico, Llantas, Motor',
                    prefixIcon: Icon(Icons.build),
                    border: OutlineInputBorder(),
                  ),
                  validator: (value) =>
                      value == null || value.isEmpty ? 'Campo requerido' : null,
                ),
                const SizedBox(height: 12),
                SwitchListTile(
                  title: const Text('Disponible'),
                  value: isAvailable,
                  onChanged: (value) => isAvailable = value,
                  activeThumbColor: Colors.blue.shade700,
                  contentPadding: EdgeInsets.zero,
                ),
                const SizedBox(height: 8),
                Row(
                  children: [
                    Expanded(
                      child: TextFormField(
                        keyboardType: const TextInputType.numberWithOptions(
                          decimal: true,
                        ),
                        decoration: const InputDecoration(
                          labelText: 'Latitud (opcional)',
                          border: OutlineInputBorder(),
                        ),
                        onChanged: (value) => latitude = double.tryParse(value),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: TextFormField(
                        keyboardType: const TextInputType.numberWithOptions(
                          decimal: true,
                        ),
                        decoration: const InputDecoration(
                          labelText: 'Longitud (opcional)',
                          border: OutlineInputBorder(),
                        ),
                        onChanged: (value) =>
                            longitude = double.tryParse(value),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancelar'),
          ),
          ElevatedButton(
            onPressed: () async {
              if (formKey.currentState!.validate()) {
                Navigator.pop(context);
                final success = await _viewModel.createTechnician(
                  firstName: firstNameController.text.trim(),
                  lastName: lastNameController.text.trim(),
                  phoneNumber: phoneController.text.trim(),
                  specialty: specialtyController.text.trim(),
                  isAvailable: isAvailable,
                  latitude: latitude,
                  longitude: longitude,
                );
                if (success) {
                  _showSnackBar('Técnico creado exitosamente');
                } else {
                  _showSnackBar(
                    _viewModel.errorMessage ?? 'Error al crear técnico',
                    isError: true,
                  );
                }
                _viewModel.clearError();
              }
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.blue.shade800,
              foregroundColor: Colors.white,
            ),
            child: const Text('Crear'),
          ),
        ],
      ),
    );
  }

  // Agrega este método para editar técnico
  void _showEditTechnicianDialog(Technician technician) {
    final formKey = GlobalKey<FormState>();
    final firstNameController = TextEditingController(
      text: technician.firstName,
    );
    final lastNameController = TextEditingController(text: technician.lastName);
    final phoneController = TextEditingController(text: technician.phoneNumber);
    final specialtyController = TextEditingController(
      text: technician.specialty,
    );
    bool isAvailable = technician.isAvailable;

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Row(
          children: [
            Icon(Icons.edit, color: Colors.blue.shade800),
            const SizedBox(width: 8),
            const Text('Editar Técnico'),
          ],
        ),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        content: SingleChildScrollView(
          child: Form(
            key: formKey,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextFormField(
                  controller: firstNameController,
                  decoration: const InputDecoration(
                    labelText: 'Nombre *',
                    prefixIcon: Icon(Icons.person_outline),
                    border: OutlineInputBorder(),
                  ),
                  validator: (value) =>
                      value == null || value.isEmpty ? 'Campo requerido' : null,
                ),
                const SizedBox(height: 12),
                TextFormField(
                  controller: lastNameController,
                  decoration: const InputDecoration(
                    labelText: 'Apellido *',
                    prefixIcon: Icon(Icons.person_outline),
                    border: OutlineInputBorder(),
                  ),
                  validator: (value) =>
                      value == null || value.isEmpty ? 'Campo requerido' : null,
                ),
                const SizedBox(height: 12),
                TextFormField(
                  controller: phoneController,
                  keyboardType: TextInputType.phone,
                  decoration: const InputDecoration(
                    labelText: 'Teléfono *',
                    prefixIcon: Icon(Icons.phone_outlined),
                    border: OutlineInputBorder(),
                  ),
                  validator: (value) =>
                      value == null || value.isEmpty ? 'Campo requerido' : null,
                ),
                const SizedBox(height: 12),
                TextFormField(
                  controller: specialtyController,
                  decoration: const InputDecoration(
                    labelText: 'Especialidad *',
                    hintText: 'Ej: Auxilio eléctrico, Llantas, Motor',
                    prefixIcon: Icon(Icons.build),
                    border: OutlineInputBorder(),
                  ),
                  validator: (value) =>
                      value == null || value.isEmpty ? 'Campo requerido' : null,
                ),
                const SizedBox(height: 12),
                SwitchListTile(
                  title: const Text('Disponible'),
                  value: isAvailable,
                  onChanged: (value) => isAvailable = value,
                  activeThumbColor: Colors.blue.shade700,
                  contentPadding: EdgeInsets.zero,
                ),
              ],
            ),
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancelar'),
          ),
          ElevatedButton(
            onPressed: () async {
              if (formKey.currentState!.validate()) {
                Navigator.pop(context);
                final success = await _viewModel.updateTechnician(
                  technicianId: technician.id,
                  firstName: firstNameController.text.trim(),
                  lastName: lastNameController.text.trim(),
                  phoneNumber: phoneController.text.trim(),
                  specialty: specialtyController.text.trim(),
                  isAvailable: isAvailable,
                );
                if (success) {
                  _showSnackBar('Técnico actualizado exitosamente');
                } else {
                  _showSnackBar(
                    _viewModel.errorMessage ?? 'Error al actualizar técnico',
                    isError: true,
                  );
                }
                _viewModel.clearError();
              }
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.blue.shade800,
              foregroundColor: Colors.white,
            ),
            child: const Text('Actualizar'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Mis Técnicos'),
        backgroundColor: Colors.blue.shade800,
        foregroundColor: Colors.white,
        elevation: 2,
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () => _viewModel.loadTechnicians(),
            tooltip: 'Actualizar',
          ),
        ],
      ),
      body: ListenableBuilder(
        listenable: _viewModel,
        builder: (context, _) {
          if (_viewModel.isLoading && _viewModel.technicians.isEmpty) {
            return const Center(
              child: CircularProgressIndicator(
                valueColor: AlwaysStoppedAnimation<Color>(Colors.blue),
              ),
            );
          }

          if (_viewModel.errorMessage != null &&
              _viewModel.technicians.isEmpty) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.error_outline,
                    size: 64,
                    color: Colors.red.shade300,
                  ),
                  const SizedBox(height: 16),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 32),
                    child: Text(
                      _viewModel.errorMessage!,
                      style: TextStyle(color: Colors.grey.shade600),
                      textAlign: TextAlign.center,
                    ),
                  ),
                  const SizedBox(height: 16),
                  ElevatedButton.icon(
                    onPressed: () => _viewModel.loadTechnicians(),
                    icon: const Icon(Icons.refresh),
                    label: const Text('Reintentar'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.blue,
                      foregroundColor: Colors.white,
                    ),
                  ),
                ],
              ),
            );
          }

          if (_viewModel.technicians.isEmpty) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.people_outline,
                    size: 64,
                    color: Colors.blue.shade200,
                  ),
                  const SizedBox(height: 16),
                  Text(
                    'No hay técnicos registrados',
                    style: TextStyle(
                      fontSize: 18,
                      color: Colors.grey.shade600,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Toca el botón + para agregar un técnico',
                    style: TextStyle(color: Colors.grey.shade500),
                  ),
                ],
              ),
            );
          }

          return RefreshIndicator(
            onRefresh: () => _viewModel.loadTechnicians(),
            color: Colors.blue,
            child: ListView.builder(
              padding: const EdgeInsets.all(12),
              itemCount: _viewModel.technicians.length,
              itemBuilder: (context, index) {
                final tech = _viewModel.technicians[index];
                return Card(
                  margin: const EdgeInsets.only(bottom: 12),
                  elevation: 2,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: ListTile(
                    leading: CircleAvatar(
                      backgroundColor: tech.isAvailable
                          ? Colors.green.shade100
                          : Colors.grey.shade300,
                      child: Icon(
                        Icons.build,
                        color: tech.isAvailable
                            ? Colors.green.shade700
                            : Colors.grey.shade600,
                      ),
                    ),
                    title: Text(
                      tech.fullName,
                      style: const TextStyle(fontWeight: FontWeight.bold),
                    ),
                    subtitle: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('📞 ${tech.phoneNumber}'),
                        if (tech.specialty.isNotEmpty)
                          Text('🔧 ${tech.specialty}'),
                        if (tech.currentLatitude != null)
                          Text(
                            '📍 ${tech.location}',
                            style: const TextStyle(fontSize: 11),
                          ),
                      ],
                    ),
                    trailing: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        // ✅ Botón de editar
                        IconButton(
                          icon: Icon(
                            Icons.edit,
                            color: Colors.blue.shade700,
                            size: 20,
                          ),
                          onPressed: () => _showEditTechnicianDialog(tech),
                          tooltip: 'Editar técnico',
                        ),
                        // Indicador de disponibilidad
                        Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 8,
                            vertical: 4,
                          ),
                          decoration: BoxDecoration(
                            color: tech.isAvailable
                                ? Colors.green.shade100
                                : Colors.red.shade100,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Text(
                            tech.isAvailable ? 'Disponible' : 'Ocupado',
                            style: TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.w500,
                              color: tech.isAvailable
                                  ? Colors.green.shade700
                                  : Colors.red.shade700,
                            ),
                          ),
                        ),
                      ],
                    ),
                    isThreeLine:
                        tech.currentLatitude != null ||
                        tech.specialty.isNotEmpty,
                  ),
                );
              },
            ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: _showCreateTechnicianDialog,
        icon: const Icon(Icons.add),
        label: const Text('Nuevo técnico'),
        backgroundColor: Colors.blue.shade700,
        foregroundColor: Colors.white,
      ),
    );
  }
}
``

---

## mechanic_mobile/lib/presentation/pages/vehicles_page.dart

``dart
import 'package:flutter/material.dart';

import '../../../core/di/injection_container.dart';
import '../../../domain/entities/vehicle.dart';
import '../viewmodels/vehicle_viewmodel.dart';

class VehiclesPage extends StatefulWidget {
  const VehiclesPage({super.key});

  @override
  State<VehiclesPage> createState() => _VehiclesPageState();
}

class _VehiclesPageState extends State<VehiclesPage> {
  late final VehicleViewModel _viewModel;
  final List<String> _validVehicleTypes = [
    'CAR',
    'MOTORCYCLE',
    'TRUCK',
    'VAN',
    'OTHER',
  ];

  @override
  void initState() {
    super.initState();
    _viewModel = sl<VehicleViewModel>();
    _viewModel.loadVehicles();
  }

  String? _validateVehicleType(String value) {
    if (!_validVehicleTypes.contains(value.toUpperCase())) {
      return 'El tipo debe ser: ${_validVehicleTypes.join(', ')}';
    }
    return null;
  }

  String? _validateTextField(String value, String fieldName) {
    if (value.trim().length < 3) {
      return '$fieldName debe tener al menos 3 caracteres';
    }
    return null;
  }

  Future<void> _openVehicleForm({Vehicle? vehicle}) async {
    final plateController = TextEditingController(text: vehicle?.plateNumber);
    final typeController = TextEditingController(
      text: vehicle?.vehicleType ?? 'CAR',
    );
    final brandController = TextEditingController(text: vehicle?.brand);
    final modelController = TextEditingController(text: vehicle?.model);
    final yearController = TextEditingController(
      text: vehicle != null ? vehicle.year.toString() : '',
    );
    final colorController = TextEditingController(text: vehicle?.color);
    final notesController = TextEditingController(text: vehicle?.notes ?? '');

    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text(vehicle == null ? 'Nuevo vehículo' : 'Editar vehículo'),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextField(
                  controller: plateController,
                  decoration: const InputDecoration(labelText: 'Placa *'),
                ),
                const SizedBox(height: 8),
                DropdownButtonFormField<String>(
                  initialValue: typeController.text,
                  decoration: const InputDecoration(labelText: 'Tipo *'),
                  items: _validVehicleTypes.map((type) {
                    return DropdownMenuItem(value: type, child: Text(type));
                  }).toList(),
                  onChanged: (value) {
                    if (value != null) typeController.text = value;
                  },
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: brandController,
                  decoration: const InputDecoration(labelText: 'Marca *'),
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: modelController,
                  decoration: const InputDecoration(labelText: 'Modelo *'),
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: yearController,
                  keyboardType: TextInputType.number,
                  decoration: const InputDecoration(labelText: 'Año *'),
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: colorController,
                  decoration: const InputDecoration(labelText: 'Color *'),
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: notesController,
                  decoration: const InputDecoration(labelText: 'Notas'),
                ),
              ],
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context, false),
              child: const Text('Cancelar'),
            ),
            ElevatedButton(
              onPressed: () => Navigator.pop(context, true),
              child: const Text('Guardar'),
            ),
          ],
        );
      },
    );

    if (confirmed != true) return;

    // Validaciones solo al guardar
    final errors = <String>[];

    // Validar placa
    final plateError = _validateTextField(plateController.text, 'Placa');
    if (plateError != null) errors.add(plateError);

    // Validar tipo de vehículo
    final typeError = _validateVehicleType(typeController.text);
    if (typeError != null) errors.add(typeError);

    // Validar marca
    final brandError = _validateTextField(brandController.text, 'Marca');
    if (brandError != null) errors.add(brandError);

    // Validar modelo
    final modelError = _validateTextField(modelController.text, 'Modelo');
    if (modelError != null) errors.add(modelError);

    // Validar año
    final yearText = yearController.text.trim();
    final year = int.tryParse(yearText);
    if (yearText.isEmpty) {
      errors.add('El año es obligatorio');
    } else if (year == null || year < 1900 || year > DateTime.now().year + 1) {
      errors.add(
        'Ingrese un año válido (entre 1900 y ${DateTime.now().year + 1})',
      );
    }

    // Validar color
    final colorError = _validateTextField(colorController.text, 'Color');
    if (colorError != null) errors.add(colorError);

    // Notas: opcional pero si tiene contenido debe tener al menos 3 caracteres
    final notes = notesController.text.trim();
    if (notes.isNotEmpty && notes.length < 3) {
      errors.add('Las notas deben tener al menos 3 caracteres');
    }

    if (errors.isNotEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: errors.map((e) => Text('• $e')).toList(),
          ),
          backgroundColor: Colors.red.shade700,
          behavior: SnackBarBehavior.floating,
          duration: const Duration(seconds: 3),
        ),
      );
      return;
    }

    final body = {
      "plate_number": plateController.text.trim(),
      "vehicle_type": typeController.text.trim().toUpperCase(),
      "brand": brandController.text.trim(),
      "model": modelController.text.trim(),
      "year": year,
      "color": colorController.text.trim(),
      "notes": notesController.text.trim(),
    };

    final ok = vehicle == null
        ? await _viewModel.createVehicle(body)
        : await _viewModel.updateVehicle(vehicle.id, body);

    if (!mounted) return;

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          ok
              ? (vehicle == null
                    ? 'Vehículo registrado'
                    : 'Vehículo actualizado')
              : (_viewModel.errorMessage ?? 'No se pudo guardar'),
        ),
        backgroundColor: ok ? Colors.green.shade700 : Colors.red.shade700,
      ),
    );

    if (ok) {
      _viewModel.loadVehicles();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Mis vehículos')),
      body: ListenableBuilder(
        listenable: _viewModel,
        builder: (context, _) {
          if (_viewModel.isLoading && _viewModel.vehicles.isEmpty) {
            return const Center(child: CircularProgressIndicator());
          }

          if (_viewModel.errorMessage != null && _viewModel.vehicles.isEmpty) {
            return Center(child: Text(_viewModel.errorMessage!));
          }

          if (_viewModel.vehicles.isEmpty) {
            return const Center(child: Text('Aún no registraste vehículos.'));
          }

          return RefreshIndicator(
            onRefresh: _viewModel.loadVehicles,
            child: ListView.builder(
              itemCount: _viewModel.vehicles.length,
              itemBuilder: (context, index) {
                final vehicle = _viewModel.vehicles[index];
                return ListTile(
                  title: Text('${vehicle.brand} ${vehicle.model}'),
                  subtitle: Text(
                    '${vehicle.plateNumber} - ${vehicle.vehicleType} (${vehicle.year})',
                  ),
                  trailing: const Icon(Icons.edit),
                  onTap: () => _openVehicleForm(vehicle: vehicle),
                );
              },
            ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => _openVehicleForm(),
        child: const Icon(Icons.add),
      ),
    );
  }
}
``

---

## mechanic_mobile/lib/presentation/services/notification_service.dart

``dart
import 'package:flutter/foundation.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:mechanic_mobile/core/di/injection_container.dart';
import '../../domain/usecases/register_device_usecase.dart';
import '../../domain/usecases/unregister_device_usecase.dart';
import '../../domain/usecases/get_my_devices_usecase.dart';

class NotificationService {
  final FirebaseMessaging _firebaseMessaging = FirebaseMessaging.instance;
  String? _currentDeviceToken;

  static final NotificationService _instance = NotificationService._internal();
  factory NotificationService() => _instance;
  NotificationService._internal();

  Future<void> initialize() async {
    // Solicitar permisos
    await _requestPermissions();

    // Obtener token FCM
    await _getToken();

    // Escuchar mensajes en primer plano
    FirebaseMessaging.onMessage.listen(_handleForegroundMessage);

    // Escuchar cuando se abre la app desde notificación
    FirebaseMessaging.onMessageOpenedApp.listen(_handleMessageOpenedApp);

    // Manejar mensaje inicial si la app se abrió desde una notificación
    final initialMessage = await FirebaseMessaging.instance.getInitialMessage();
    if (initialMessage != null) {
      _handleMessageOpenedApp(initialMessage);
    }
  }

  Future<void> _requestPermissions() async {
    if (kIsWeb) {
      // Web: solicitar permisos
      await _firebaseMessaging.requestPermission();
    } else {
      // Móvil: solicitar permisos
      NotificationSettings settings = await _firebaseMessaging
          .requestPermission(alert: true, badge: true, sound: true);
      debugPrint('📱 Notification permission: ${settings.authorizationStatus}');
    }
  }

  Future<void> _getToken() async {
    try {
      _currentDeviceToken = await _firebaseMessaging.getToken();
      debugPrint('📱 FCM Token: $_currentDeviceToken');

      if (_currentDeviceToken != null) {
        // Registrar el dispositivo automáticamente
        await registerCurrentDevice();
      }
    } catch (e) {
      debugPrint('❌ Error getting FCM token: $e');
    }
  }

  Future<void> registerCurrentDevice() async {
    if (_currentDeviceToken == null) return;

    try {
      final registerUseCase = sl<RegisterDeviceUseCase>();

      // Determinar plataforma
      String platform;
      if (kIsWeb) {
        platform = 'WEB';
      } else if (defaultTargetPlatform == TargetPlatform.iOS) {
        platform = 'IOS';
      } else {
        platform = 'ANDROID';
      }

      final params = RegisterDeviceParams(
        deviceToken: _currentDeviceToken!,
        devicePlatform: platform,
        deviceLabel: null,
        appRole: 'CLIENT', // O el rol actual del usuario
      );

      await registerUseCase.execute(params);
      debugPrint('✅ Device registered successfully');
    } catch (e) {
      debugPrint('❌ Error registering device: $e');
    }
  }

  Future<void> unregisterCurrentDevice() async {
    if (_currentDeviceToken == null) return;

    try {
      final getDevicesUseCase = sl<GetMyDevicesUseCase>();
      final devices = await getDevicesUseCase.execute();

      final device = devices.firstWhere(
        (d) =>
            d.devicePlatform ==
            (kIsWeb
                ? 'WEB'
                : (defaultTargetPlatform == TargetPlatform.iOS
                      ? 'IOS'
                      : 'ANDROID')),
        orElse: () => throw Exception('Device not found'),
      );

      final unregisterUseCase = sl<UnregisterDeviceUseCase>();
      await unregisterUseCase.execute(device.id);
      debugPrint('✅ Device unregistered successfully');
    } catch (e) {
      debugPrint('❌ Error unregistering device: $e');
    }
  }

  void _handleForegroundMessage(RemoteMessage message) {
    debugPrint(
      '📨 Message received in foreground: ${message.notification?.title}',
    );
    // Aquí puedes mostrar una notificación local o actualizar la UI
  }

  void _handleMessageOpenedApp(RemoteMessage message) {
    debugPrint(
      '📨 App opened from notification: ${message.notification?.title}',
    );
    // Aquí puedes navegar a la pantalla correspondiente
  }

  Future<void> subscribeToTopic(String topic) async {
    await _firebaseMessaging.subscribeToTopic(topic);
    debugPrint('✅ Subscribed to topic: $topic');
  }

  Future<void> unsubscribeFromTopic(String topic) async {
    await _firebaseMessaging.unsubscribeFromTopic(topic);
    debugPrint('✅ Unsubscribed from topic: $topic');
  }

  String? get currentToken => _currentDeviceToken;
}
``

---

## mechanic_mobile/lib/presentation/viewmodels/admin_incidents_viewmodel.dart

``dart
import 'package:flutter/material.dart';
import '../../domain/entities/admin_incident.dart';
import '../../domain/usecases/get_all_incidents_usecase.dart';
import '../../domain/usecases/get_incident_details_usecase.dart';
import '../../domain/usecases/get_incident_candidates_usecase.dart';
import '../../domain/usecases/publish_incident_usecase.dart';

class AdminIncidentsViewModel extends ChangeNotifier {
  final GetAllIncidentsUseCase _getAllIncidentsUseCase;
  final GetIncidentDetailsUseCase _getIncidentDetailsUseCase;
  final GetIncidentCandidatesUseCase _getIncidentCandidatesUseCase;
  final PublishIncidentUseCase _publishIncidentUseCase;

  List<AdminIncident> _incidents = [];
  List<Candidate> _candidates = [];
  AdminIncident? _selectedIncident;
  bool _isLoading = false;
  String? _errorMessage;
  String _selectedTab = 'all';

  AdminIncidentsViewModel({
    required GetAllIncidentsUseCase getAllIncidentsUseCase,
    required GetIncidentDetailsUseCase getIncidentDetailsUseCase,
    required GetIncidentCandidatesUseCase getIncidentCandidatesUseCase,
    required PublishIncidentUseCase publishIncidentUseCase,
  }) : _getAllIncidentsUseCase = getAllIncidentsUseCase,
       _getIncidentDetailsUseCase = getIncidentDetailsUseCase,
       _getIncidentCandidatesUseCase = getIncidentCandidatesUseCase,
       _publishIncidentUseCase = publishIncidentUseCase;

  List<AdminIncident> get incidents => _incidents;
  List<Candidate> get candidates => _candidates;
  AdminIncident? get selectedIncident => _selectedIncident;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;
  String get selectedTab => _selectedTab;

  List<AdminIncident> get filteredIncidents {
    if (_selectedTab == 'all') return _incidents;
    if (_selectedTab == 'pending') {
      return _incidents.where((i) => i.status == 'PENDING').toList();
    }
    if (_selectedTab == 'published') {
      return _incidents.where((i) => i.status == 'PUBLISHED').toList();
    }
    if (_selectedTab == 'active') {
      return _incidents
          .where(
            (i) =>
                i.isActive && i.status != 'PENDING' && i.status != 'PUBLISHED',
          )
          .toList();
    }
    if (_selectedTab == 'completed') {
      return _incidents
          .where((i) => i.status == 'COMPLETED' || i.status == 'CANCELLED')
          .toList();
    }
    return _incidents;
  }

  Future<void> loadIncidents() async {
    _setLoading(true);
    _errorMessage = null;

    try {
      _incidents = await _getAllIncidentsUseCase.execute();
      notifyListeners();
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
    } finally {
      _setLoading(false);
    }
  }

  Future<void> loadIncidentDetails(String incidentId) async {
    _setLoading(true);
    _errorMessage = null;

    try {
      _selectedIncident = await _getIncidentDetailsUseCase.execute(incidentId);
      notifyListeners();
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
    } finally {
      _setLoading(false);
    }
  }

  Future<void> loadCandidates(String incidentId) async {
    _setLoading(true);
    _errorMessage = null;

    try {
      _candidates = await _getIncidentCandidatesUseCase.execute(incidentId);
      notifyListeners();
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
    } finally {
      _setLoading(false);
    }
  }

  Future<bool> publishIncident(String incidentId) async {
    _setLoading(true);
    _errorMessage = null;

    try {
      final updatedIncident = await _publishIncidentUseCase.execute(incidentId);

      // Actualizar en la lista
      final index = _incidents.indexWhere((i) => i.id == incidentId);
      if (index != -1) {
        _incidents[index] = updatedIncident;
      }
      if (_selectedIncident?.id == incidentId) {
        _selectedIncident = updatedIncident;
      }

      notifyListeners();
      return true;
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
      return false;
    } finally {
      _setLoading(false);
    }
  }

  void setSelectedTab(String tab) {
    _selectedTab = tab;
    notifyListeners();
  }

  void clearSelectedIncident() {
    _selectedIncident = null;
    _candidates = [];
    notifyListeners();
  }

  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }

  void clearError() {
    _errorMessage = null;
    notifyListeners();
  }
}
``

---

## mechanic_mobile/lib/presentation/viewmodels/admin_providers_viewmodel.dart

``dart
import 'package:flutter/material.dart';
import '../../domain/entities/provider_summary.dart';
import '../../domain/usecases/get_providers_usecase.dart';

class AdminProvidersViewModel extends ChangeNotifier {
  final GetProvidersUseCase _getProvidersUseCase;

  List<ProviderSummary> _providers = [];
  bool _isLoading = false;
  String? _errorMessage;
  String _filterType = 'all'; // all, workshop, independent

  AdminProvidersViewModel({required GetProvidersUseCase getProvidersUseCase})
    : _getProvidersUseCase = getProvidersUseCase;

  List<ProviderSummary> get providers => _providers;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;
  String get filterType => _filterType;

  List<ProviderSummary> get filteredProviders {
    if (_filterType == 'all') return _providers;
    if (_filterType == 'workshop') {
      return _providers.where((p) => p.providerType == 'WORKSHOP').toList();
    }
    if (_filterType == 'independent') {
      return _providers
          .where((p) => p.providerType == 'INDEPENDENT_MECHANIC')
          .toList();
    }
    return _providers;
  }

  Future<void> loadProviders({int limit = 50, int offset = 0}) async {
    _setLoading(true);
    _errorMessage = null;

    try {
      _providers = await _getProvidersUseCase.execute(
        limit: limit,
        offset: offset,
      );
      notifyListeners();
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
    } finally {
      _setLoading(false);
    }
  }

  void setFilterType(String filter) {
    _filterType = filter;
    notifyListeners();
  }

  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }

  void clearError() {
    _errorMessage = null;
    notifyListeners();
  }
}
``

---

## mechanic_mobile/lib/presentation/viewmodels/auth_viewmodel.dart

``dart
import 'package:flutter/material.dart';
import '../../domain/usecases/login_usecase.dart';
import '../../domain/usecases/register_usecase.dart';
import '../../domain/usecases/get_me_usecase.dart';
import '../../domain/usecases/get_my_profile_usecase.dart';
import '../../domain/usecases/update_my_profile_usecase.dart';
import '../../domain/entities/user.dart';

class AuthViewModel extends ChangeNotifier {
  final LoginUseCase loginUseCase;
  final RegisterUseCase registerUseCase;
  final GetMeUseCase getMeUseCase;
  final GetMyProfileUseCase getMyProfileUseCase;
  final UpdateMyProfileUseCase updateMyProfileUseCase;

  User? user;
  bool isLoading = false;
  String? errorMessage;

  AuthViewModel(
    this.loginUseCase,
    this.registerUseCase,
    this.getMeUseCase,
    this.getMyProfileUseCase,
    this.updateMyProfileUseCase,
  );

  void logout() {
    user = null;
    // Aquí también podrías limpiar el token del ApiClient si es necesario
    notifyListeners();
  }

  Future<bool> login(String email, String password) async {
    isLoading = true;
    errorMessage = null;
    notifyListeners();

    try {
      user = await loginUseCase(email, password);
      return true; // ✅ éxito
    } catch (e) {
      errorMessage = e.toString(); // ✅ capturas error
      return false;
    } finally {
      isLoading = false;
      notifyListeners();
    }
  }

  Future<bool> register(Map<String, dynamic> body) async {
    isLoading = true;
    errorMessage = null;
    notifyListeners();

    try {
      user = await registerUseCase(body);
      return true;
    } catch (e) {
      errorMessage = e.toString();
      return false;
    } finally {
      isLoading = false;
      notifyListeners();
    }
  }

  Future<void> loadMe() async {
    try {
      user = await getMeUseCase();
      notifyListeners();
    } catch (e) {
      errorMessage = e.toString();
      notifyListeners();
    }
  }

  Future<void> loadMyProfile() async {
    try {
      user = await getMyProfileUseCase();
      notifyListeners();
    } catch (e) {
      errorMessage = e.toString();
      notifyListeners();
    }
  }

  Future<bool> updateMyProfile({
    required String firstName,
    required String lastName,
    required String phoneNumber,
  }) async {
    isLoading = true;
    errorMessage = null;
    notifyListeners();

    try {
      user = await updateMyProfileUseCase(
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
      );
      return true;
    } catch (e) {
      errorMessage = e.toString();
      return false;
    } finally {
      isLoading = false;
      notifyListeners();
    }
  }
}
``

---

## mechanic_mobile/lib/presentation/viewmodels/catalog_services_viewmodel.dart

``dart
import 'package:flutter/material.dart';
import '../../domain/entities/catalog_service.dart';
import '../../domain/usecases/get_catalog_services_usecase.dart';
import '../../domain/usecases/get_provider_services_usecase.dart';
import '../../domain/usecases/create_provider_service_usecase.dart';

class CatalogServicesViewModel extends ChangeNotifier {
  final GetCatalogServicesUseCase _getCatalogServicesUseCase;
  final GetProviderServicesUseCase _getProviderServicesUseCase;
  final CreateProviderServiceUseCase _createProviderServiceUseCase;

  List<CatalogServiceEntry> _catalogServices = [];
  List<ProviderService> _providerServices = [];
  bool _isLoading = false;
  String? _errorMessage;

  CatalogServicesViewModel({
    required GetCatalogServicesUseCase getCatalogServicesUseCase,
    required GetProviderServicesUseCase getProviderServicesUseCase,
    required CreateProviderServiceUseCase createProviderServiceUseCase,
  }) : _getCatalogServicesUseCase = getCatalogServicesUseCase,
       _getProviderServicesUseCase = getProviderServicesUseCase,
       _createProviderServiceUseCase = createProviderServiceUseCase;

  List<CatalogServiceEntry> get catalogServices => _catalogServices;
  List<ProviderService> get providerServices => _providerServices;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;

  Future<void> loadCatalogServices() async {
    _setLoading(true);
    _errorMessage = null;

    try {
      _catalogServices = await _getCatalogServicesUseCase.execute();
      notifyListeners();
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
    } finally {
      _setLoading(false);
    }
  }

  Future<void> loadProviderServices() async {
    _setLoading(true);
    _errorMessage = null;

    try {
      _providerServices = await _getProviderServicesUseCase.execute();
      notifyListeners();
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
    } finally {
      _setLoading(false);
    }
  }

  Future<bool> createProviderService({
    required String serviceCatalogItemId,
    String? customTitle,
    String? customDescription,
    required double priceEstimateMin,
    required double priceEstimateMax,
    required int estimatedDurationMinutes,
    required bool isMobileServiceEnabled,
    required bool isEmergencyServiceEnabled,
    required bool isActive,
  }) async {
    _setLoading(true);
    _errorMessage = null;

    try {
      final params = CreateProviderServiceParams(
        serviceCatalogItemId: serviceCatalogItemId,
        customTitle: customTitle,
        customDescription: customDescription,
        priceEstimateMin: priceEstimateMin,
        priceEstimateMax: priceEstimateMax,
        estimatedDurationMinutes: estimatedDurationMinutes,
        isMobileServiceEnabled: isMobileServiceEnabled,
        isEmergencyServiceEnabled: isEmergencyServiceEnabled,
        isActive: isActive,
      );

      final newService = await _createProviderServiceUseCase.execute(params);
      _providerServices.add(newService);

      // Actualizar también el catalog service
      final index = _catalogServices.indexWhere(
        (s) => s.catalogItem.id == serviceCatalogItemId,
      );
      if (index != -1) {
        _catalogServices[index] = CatalogServiceEntry(
          catalogItem: _catalogServices[index].catalogItem,
          providerService: newService,
          isConfigured: true,
        );
      }

      notifyListeners();
      return true;
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
      return false;
    } finally {
      _setLoading(false);
    }
  }

  bool isServiceConfigured(String catalogItemId) {
    return _catalogServices.any(
      (s) => s.catalogItem.id == catalogItemId && s.isConfigured,
    );
  }

  ProviderService? getProviderService(String catalogItemId) {
    final entry = _catalogServices.firstWhere(
      (s) => s.catalogItem.id == catalogItemId,
      orElse: () => CatalogServiceEntry(
        catalogItem: CatalogItem(
          id: '',
          code: '',
          category: '',
          title: '',
          description: '',
          supportsMobileService: false,
          supportsEmergencyService: false,
          isActive: false,
          sortOrder: 0,
          createdAt: DateTime.now(),
          updatedAt: DateTime.now(),
        ),
        isConfigured: false,
      ),
    );
    return entry.providerService;
  }

  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }

  void clearError() {
    _errorMessage = null;
    notifyListeners();
  }
}
``

---

## mechanic_mobile/lib/presentation/viewmodels/client_tracking_viewmodel.dart

``dart
import 'package:flutter/material.dart';
import '../../domain/entities/tracking.dart';
import '../../infrastructure/datasources/tracking_remote_data_source.dart';

class ClientTrackingViewModel extends ChangeNotifier {
  final TrackingRemoteDataSource _dataSource;

  TrackingData? _trackingData;
  List<TrackingHistoryItem> _history = [];
  bool _isLoading = false;
  String? _errorMessage;

  ClientTrackingViewModel(this._dataSource);

  TrackingData? get trackingData => _trackingData;
  List<TrackingHistoryItem> get history => _history;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;

  Future<void> loadLiveTracking(String incidentId) async {
    _setLoading(true);
    _errorMessage = null;

    try {
      final model = await _dataSource.getClientLiveTracking(incidentId);
      _trackingData = model.toEntity();
      notifyListeners();
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
    } finally {
      _setLoading(false);
    }
  }

  Future<void> loadTrackingHistory(String incidentId) async {
    _setLoading(true);
    _errorMessage = null;

    try {
      final models = await _dataSource.getClientTrackingHistory(incidentId);
      _history = models.map((m) => m.toEntity()).toList();
      notifyListeners();
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
    } finally {
      _setLoading(false);
    }
  }

  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }

  void clearError() {
    _errorMessage = null;
    notifyListeners();
  }

  void clearTrackingData() {
    _trackingData = null;
    _history = [];
    notifyListeners();
  }
}
``

---

## mechanic_mobile/lib/presentation/viewmodels/evidence_viewmodel.dart

``dart
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import '../../domain/entities/evidence.dart';
import '../../domain/usecases/add_text_evidence_usecase.dart';
import '../../domain/usecases/add_file_evidence_usecase.dart';

class EvidenceViewModel extends ChangeNotifier {
  final AddTextEvidenceUseCase _addTextEvidenceUseCase;
  final AddFileEvidenceUseCase _addFileEvidenceUseCase;

  bool _isLoading = false;
  String? _errorMessage;
  Evidence? _lastAddedEvidence;

  EvidenceViewModel({
    required AddTextEvidenceUseCase addTextEvidenceUseCase,
    required AddFileEvidenceUseCase addFileEvidenceUseCase,
  }) : _addTextEvidenceUseCase = addTextEvidenceUseCase,
       _addFileEvidenceUseCase = addFileEvidenceUseCase;

  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;
  Evidence? get lastAddedEvidence => _lastAddedEvidence;

  Future<bool> addTextEvidence({
    required String incidentId,
    required String description,
    required String textContent,
  }) async {
    _setLoading(true);
    _errorMessage = null;

    try {
      final params = AddTextEvidenceParams(
        incidentId: incidentId,
        description: description,
        textContent: textContent,
      );
      _lastAddedEvidence = await _addTextEvidenceUseCase.execute(params);
      notifyListeners();
      return true;
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
      return false;
    } finally {
      _setLoading(false);
    }
  }

  // ✅ Recibir XFile directamente
  Future<bool> addImageEvidence({
    required String incidentId,
    required String description,
    required XFile imageFile,
  }) async {
    _setLoading(true);
    _errorMessage = null;

    try {
      final params = AddFileEvidenceParams(
        incidentId: incidentId,
        evidenceType: 'IMAGE',
        description: description,
        file: imageFile,
      );
      _lastAddedEvidence = await _addFileEvidenceUseCase.execute(params);
      notifyListeners();
      return true;
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
      return false;
    } finally {
      _setLoading(false);
    }
  }

  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }

  void clearError() {
    _errorMessage = null;
    notifyListeners();
  }

  void clearLastEvidence() {
    _lastAddedEvidence = null;
    notifyListeners();
  }
}
``

---

## mechanic_mobile/lib/presentation/viewmodels/home_viewmodel.dart

``dart
import 'package:flutter/material.dart';
import 'package:mechanic_mobile/domain/usecases/get_all_incidents_usecase.dart';
import '../../domain/usecases/get_service_requests_usecase.dart';

class HomeViewModel extends ChangeNotifier {
  final GetServiceRequestsUseCase getServiceRequestsUseCase;
  final GetAllIncidentsUseCase getAllIncidentsUseCase;

  List<dynamic> _requests = []; // ✅ Cambiar a dynamic para aceptar ambos tipos
  bool _isLoading = false;
  String? _errorMessage;

  HomeViewModel({
    required this.getServiceRequestsUseCase,
    required this.getAllIncidentsUseCase,
  });

  List<dynamic> get requests => _requests;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;

  Future<void> loadRequests() async {
    _setLoading(true);
    _errorMessage = null;

    try {
      _requests = await getServiceRequestsUseCase.call();
      notifyListeners();
    } catch (e) {
      _errorMessage = 'Error al cargar las solicitudes: ${e.toString()}';
      notifyListeners();
    } finally {
      _setLoading(false);
    }
  }

  // ✅ Método para admin - carga todos los incidentes
  Future<void> loadAllIncidents() async {
    _setLoading(true);
    _errorMessage = null;

    try {
      _requests = await getAllIncidentsUseCase.execute();
      notifyListeners();
    } catch (e) {
      _errorMessage = 'Error al cargar incidentes: ${e.toString()}';
      notifyListeners();
    } finally {
      _setLoading(false);
    }
  }

  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }

  void clearError() {
    _errorMessage = null;
    notifyListeners();
  }
}
``

---

## mechanic_mobile/lib/presentation/viewmodels/incidents_viewmodel.dart

``dart
import 'package:flutter/material.dart';
import '../../domain/entities/incident.dart';
import '../../domain/usecases/get_my_incidents_usecase.dart';
import '../../domain/usecases/create_incident_usecase.dart';
import '../../domain/usecases/update_incident_usecase.dart';
import '../../domain/usecases/cancel_incident_usecase.dart';

class IncidentsViewModel extends ChangeNotifier {
  final GetMyIncidentsUseCase _getMyIncidentsUseCase;
  final CreateIncidentUseCase _createIncidentUseCase;
  final UpdateIncidentUseCase _updateIncidentUseCase;
  final CancelIncidentUseCase _cancelIncidentUseCase;

  List<Incident> _incidents = [];
  bool _isLoading = false;
  String? _errorMessage;

  IncidentsViewModel({
    required GetMyIncidentsUseCase getMyIncidentsUseCase,
    required CreateIncidentUseCase createIncidentUseCase,
    required UpdateIncidentUseCase updateIncidentUseCase,
    required CancelIncidentUseCase cancelIncidentUseCase,
  }) : _getMyIncidentsUseCase = getMyIncidentsUseCase,
       _createIncidentUseCase = createIncidentUseCase,
       _updateIncidentUseCase = updateIncidentUseCase,
       _cancelIncidentUseCase = cancelIncidentUseCase;

  List<Incident> get incidents => _incidents;
  List<Incident> get activeIncidents =>
      _incidents.where((i) => i.isActive).toList();
  List<Incident> get completedIncidents => _incidents
      .where((i) => i.status == 'COMPLETED' || i.status == 'CANCELLED')
      .toList();
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;

  Future<void> loadIncidents() async {
    _setLoading(true);
    _errorMessage = null;

    try {
      _incidents = await _getMyIncidentsUseCase.execute();
      notifyListeners();
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
    } finally {
      _setLoading(false);
    }
  }

  Future<bool> createIncident(CreateIncidentParams params) async {
    _setLoading(true);
    _errorMessage = null;

    try {
      final newIncident = await _createIncidentUseCase.execute(params);
      _incidents.insert(0, newIncident);
      notifyListeners();
      return true;
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
      return false;
    } finally {
      _setLoading(false);
    }
  }

  Future<bool> updateIncident(
    String incidentId,
    UpdateIncidentParams params,
  ) async {
    _setLoading(true);
    _errorMessage = null;

    try {
      final updatedIncident = await _updateIncidentUseCase.execute(
        incidentId,
        params,
      );
      final index = _incidents.indexWhere((i) => i.id == incidentId);
      if (index != -1) {
        _incidents[index] = updatedIncident;
      }
      notifyListeners();
      return true;
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
      return false;
    } finally {
      _setLoading(false);
    }
  }

  Future<bool> cancelIncident(String incidentId) async {
    _setLoading(true);
    _errorMessage = null;

    try {
      await _cancelIncidentUseCase.execute(incidentId);
      await loadIncidents(); // Recargar para obtener el estado actualizado
      return true;
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
      return false;
    } finally {
      _setLoading(false);
    }
  }

  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }

  void clearError() {
    _errorMessage = null;
    notifyListeners();
  }
}
``

---

## mechanic_mobile/lib/presentation/viewmodels/platform_tracking_viewmodel.dart

``dart
import 'package:flutter/material.dart';
import '../../domain/entities/tracking.dart';
import '../../infrastructure/datasources/tracking_remote_data_source.dart';

class PlatformTrackingViewModel extends ChangeNotifier {
  final TrackingRemoteDataSource _dataSource;

  TrackingData? _trackingData;
  List<TrackingHistoryItem> _history = [];
  bool _isLoading = false;
  String? _errorMessage;

  PlatformTrackingViewModel(this._dataSource);

  TrackingData? get trackingData => _trackingData;
  List<TrackingHistoryItem> get history => _history;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;

  Future<void> loadLiveTracking(String incidentId) async {
    _setLoading(true);
    _errorMessage = null;

    try {
      final model = await _dataSource.getPlatformLiveTracking(incidentId);
      _trackingData = model.toEntity();
      notifyListeners();
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
    } finally {
      _setLoading(false);
    }
  }

  Future<void> loadTrackingHistory(String incidentId) async {
    _setLoading(true);
    _errorMessage = null;

    try {
      final models = await _dataSource.getPlatformTrackingHistory(incidentId);
      _history = models.map((m) => m.toEntity()).toList();
      notifyListeners();
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
    } finally {
      _setLoading(false);
    }
  }

  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }

  void clearError() {
    _errorMessage = null;
    notifyListeners();
  }

  void clearTrackingData() {
    _trackingData = null;
    _history = [];
    notifyListeners();
  }
}
``

---

## mechanic_mobile/lib/presentation/viewmodels/provider_available_requests_viewmodel.dart

``dart
import 'package:flutter/material.dart';
import '../../domain/entities/provider_candidate.dart';
import '../../domain/usecases/get_available_candidates_usecase.dart';
import '../../domain/usecases/get_candidate_details_usecase.dart';
import '../../domain/usecases/accept_candidate_usecase.dart';
import '../../domain/usecases/reject_candidate_usecase.dart';

class ProviderAvailableRequestsViewModel extends ChangeNotifier {
  final GetAvailableCandidatesUseCase _getAvailableCandidatesUseCase;
  final GetCandidateDetailsUseCase _getCandidateDetailsUseCase;
  final RejectCandidateUseCase _rejectCandidateUseCase;

  List<ProviderCandidate> _candidates = [];
  ProviderCandidate? _selectedCandidate;
  bool _isLoading = false;
  String? _errorMessage;

  ProviderAvailableRequestsViewModel({
    required GetAvailableCandidatesUseCase getAvailableCandidatesUseCase,
    required GetCandidateDetailsUseCase getCandidateDetailsUseCase,
    required AcceptCandidateUseCase acceptCandidateUseCase,
    required RejectCandidateUseCase rejectCandidateUseCase,
  }) : _getAvailableCandidatesUseCase = getAvailableCandidatesUseCase,
       _getCandidateDetailsUseCase = getCandidateDetailsUseCase,
       _rejectCandidateUseCase = rejectCandidateUseCase;

  List<ProviderCandidate> get candidates => _candidates;
  ProviderCandidate? get selectedCandidate => _selectedCandidate;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;

  Future<void> loadAvailableCandidates() async {
    _setLoading(true);
    _errorMessage = null;

    try {
      _candidates = await _getAvailableCandidatesUseCase.execute();
      notifyListeners();
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
    } finally {
      _setLoading(false);
    }
  }

  Future<void> loadCandidateDetails(String candidateId) async {
    _setLoading(true);
    _errorMessage = null;

    try {
      _selectedCandidate = await _getCandidateDetailsUseCase.execute(
        candidateId,
      );
      notifyListeners();
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
    } finally {
      _setLoading(false);
    }
  }

  Future<bool> acceptCandidate(String candidateId) async {
    _setLoading(true);
    _errorMessage = null;

    try {
      // Remover el candidato de la lista
      _candidates.removeWhere((c) => c.id == candidateId);
      notifyListeners();
      return true;
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
      return false;
    } finally {
      _setLoading(false);
    }
  }

  Future<bool> rejectCandidate(String candidateId) async {
    _setLoading(true);
    _errorMessage = null;

    try {
      await _rejectCandidateUseCase.execute(candidateId);
      // Remover el candidato de la lista
      _candidates.removeWhere((c) => c.id == candidateId);
      notifyListeners();
      return true;
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
      return false;
    } finally {
      _setLoading(false);
    }
  }

  void clearSelectedCandidate() {
    _selectedCandidate = null;
    notifyListeners();
  }

  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }

  void clearError() {
    _errorMessage = null;
    notifyListeners();
  }
}
``

---

## mechanic_mobile/lib/presentation/viewmodels/provider_operation_viewmodel.dart

``dart
import 'package:flutter/material.dart';
import '../../domain/entities/provider_operation.dart';
import '../../domain/usecases/get_active_operations_usecase.dart';
import '../../domain/usecases/get_operation_state_usecase.dart';
import '../../domain/usecases/dispatch_incident_usecase.dart';
import '../../domain/usecases/mark_arrived_usecase.dart';
import '../../domain/usecases/start_service_usecase.dart';
import '../../domain/usecases/complete_service_usecase.dart';
import '../../domain/usecases/cancel_service_usecase.dart';

class ProviderOperationViewModel extends ChangeNotifier {
  final GetActiveOperationsUseCase _getActiveOperationsUseCase;
  final GetOperationStateUseCase _getOperationStateUseCase;
  final DispatchIncidentUseCase _dispatchIncidentUseCase;
  final MarkArrivedUseCase _markArrivedUseCase;
  final StartServiceUseCase _startServiceUseCase;
  final CompleteServiceUseCase _completeServiceUseCase;
  final CancelServiceUseCase _cancelServiceUseCase;

  List<ProviderOperation> _operations = [];
  ProviderOperation? _selectedOperation;
  bool _isLoading = false;
  String? _errorMessage;

  ProviderOperationViewModel({
    required GetActiveOperationsUseCase getActiveOperationsUseCase,
    required GetOperationStateUseCase getOperationStateUseCase,
    required DispatchIncidentUseCase dispatchIncidentUseCase,
    required MarkArrivedUseCase markArrivedUseCase,
    required StartServiceUseCase startServiceUseCase,
    required CompleteServiceUseCase completeServiceUseCase,
    required CancelServiceUseCase cancelServiceUseCase,
  }) : _getActiveOperationsUseCase = getActiveOperationsUseCase,
       _getOperationStateUseCase = getOperationStateUseCase,
       _dispatchIncidentUseCase = dispatchIncidentUseCase,
       _markArrivedUseCase = markArrivedUseCase,
       _startServiceUseCase = startServiceUseCase,
       _completeServiceUseCase = completeServiceUseCase,
       _cancelServiceUseCase = cancelServiceUseCase;

  List<ProviderOperation> get operations => _operations;
  ProviderOperation? get selectedOperation => _selectedOperation;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;

  Future<void> loadActiveOperations() async {
    _setLoading(true);
    _errorMessage = null;

    try {
      _operations = await _getActiveOperationsUseCase.execute();
      notifyListeners();
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
    } finally {
      _setLoading(false);
    }
  }

  Future<void> loadOperationState(String incidentId) async {
    _setLoading(true);
    _errorMessage = null;

    try {
      _selectedOperation = await _getOperationStateUseCase.execute(incidentId);
      notifyListeners();
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
    } finally {
      _setLoading(false);
    }
  }

  Future<ProviderOperation?> dispatchIncident(
    String incidentId,
    String technicianId, {
    String? note,
  }) async {
    _setLoading(true);
    _errorMessage = null;

    try {
      final params = DispatchParams(technicianId: technicianId, note: note);
      final result = await _dispatchIncidentUseCase.execute(incidentId, params);

      // Actualizar en la lista
      final index = _operations.indexWhere((op) => op.incidentId == incidentId);
      if (index != -1) {
        _operations[index] = result;
      }
      if (_selectedOperation?.incidentId == incidentId) {
        _selectedOperation = result;
      }

      notifyListeners();
      return result;
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
      return null;
    } finally {
      _setLoading(false);
    }
  }

  Future<ProviderOperation?> markArrived(
    String incidentId, {
    String? note,
  }) async {
    _setLoading(true);
    _errorMessage = null;

    try {
      final result = await _markArrivedUseCase.execute(incidentId, note: note);

      final index = _operations.indexWhere((op) => op.incidentId == incidentId);
      if (index != -1) {
        _operations[index] = result;
      }
      if (_selectedOperation?.incidentId == incidentId) {
        _selectedOperation = result;
      }

      notifyListeners();
      return result;
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
      return null;
    } finally {
      _setLoading(false);
    }
  }

  Future<ProviderOperation?> startService(
    String incidentId, {
    String? note,
  }) async {
    _setLoading(true);
    _errorMessage = null;

    try {
      final result = await _startServiceUseCase.execute(incidentId, note: note);

      final index = _operations.indexWhere((op) => op.incidentId == incidentId);
      if (index != -1) {
        _operations[index] = result;
      }
      if (_selectedOperation?.incidentId == incidentId) {
        _selectedOperation = result;
      }

      notifyListeners();
      return result;
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
      return null;
    } finally {
      _setLoading(false);
    }
  }

  Future<ProviderOperation?> completeService(
    String incidentId,
    String completionSummary, {
    String? note,
  }) async {
    _setLoading(true);
    _errorMessage = null;

    try {
      final params = CompleteParams(
        note: note,
        completionSummary: completionSummary,
      );
      final result = await _completeServiceUseCase.execute(incidentId, params);

      final index = _operations.indexWhere((op) => op.incidentId == incidentId);
      if (index != -1) {
        _operations[index] = result;
      }
      if (_selectedOperation?.incidentId == incidentId) {
        _selectedOperation = result;
      }

      notifyListeners();
      return result;
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
      return null;
    } finally {
      _setLoading(false);
    }
  }

  Future<ProviderOperation?> cancelService(
    String incidentId, {
    String? note,
  }) async {
    _setLoading(true);
    _errorMessage = null;

    try {
      final result = await _cancelServiceUseCase.execute(
        incidentId,
        note: note,
      );

      final index = _operations.indexWhere((op) => op.incidentId == incidentId);
      if (index != -1) {
        _operations.removeAt(index);
      }
      if (_selectedOperation?.incidentId == incidentId) {
        _selectedOperation = result;
      }

      notifyListeners();
      return result;
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
      return null;
    } finally {
      _setLoading(false);
    }
  }

  void clearSelectedOperation() {
    _selectedOperation = null;
    notifyListeners();
  }

  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }

  void clearError() {
    _errorMessage = null;
    notifyListeners();
  }
}
``

---

## mechanic_mobile/lib/presentation/viewmodels/provider_profile_viewmodel.dart

``dart
import 'package:flutter/material.dart';
import '../../domain/entities/provider_profile.dart';
import '../../domain/usecases/get_provider_profile_usecase.dart';
import '../../domain/usecases/update_provider_profile_usecase.dart';

class ProviderProfileViewModel extends ChangeNotifier {
  final GetProviderProfileUseCase _getProviderProfileUseCase;
  final UpdateProviderProfileUseCase _updateProviderProfileUseCase;

  ProviderProfile? _profile;
  bool _isLoading = false;
  String? _errorMessage;

  ProviderProfileViewModel({
    required GetProviderProfileUseCase getProviderProfileUseCase,
    required UpdateProviderProfileUseCase updateProviderProfileUseCase,
  }) : _getProviderProfileUseCase = getProviderProfileUseCase,
       _updateProviderProfileUseCase = updateProviderProfileUseCase;

  ProviderProfile? get profile => _profile;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;

  Future<void> loadProfile() async {
    _setLoading(true);
    _errorMessage = null;

    try {
      _profile = await _getProviderProfileUseCase.execute();
      notifyListeners();
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
    } finally {
      _setLoading(false);
    }
  }

  Future<bool> updateProfile({
    String? businessName,
    String? legalName,
    String? description,
    String? contactEmail,
    String? contactPhone,
    String? city,
    String? address,
    double? baseLatitude,
    double? baseLongitude,
    bool? isAvailable,
    int? maxConcurrentServices,
  }) async {
    _setLoading(true);
    _errorMessage = null;

    try {
      final params = UpdateProviderProfileParams(
        businessName: businessName,
        legalName: legalName,
        description: description,
        contactEmail: contactEmail,
        contactPhone: contactPhone,
        city: city,
        address: address,
        baseLatitude: baseLatitude,
        baseLongitude: baseLongitude,
        isAvailable: isAvailable,
        maxConcurrentServices: maxConcurrentServices,
      );

      _profile = await _updateProviderProfileUseCase.execute(params);
      notifyListeners();
      return true;
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
      return false;
    } finally {
      _setLoading(false);
    }
  }

  Future<bool> toggleAvailability() async {
    if (_profile == null) return false;
    return await updateProfile(isAvailable: !_profile!.isAvailable);
  }

  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }

  void clearError() {
    _errorMessage = null;
    notifyListeners();
  }
}
``

---

## mechanic_mobile/lib/presentation/viewmodels/provider_tracking_viewmodel.dart

``dart
import 'package:flutter/material.dart';
import '../../domain/entities/tracking.dart';
import '../../domain/usecases/report_location_usecase.dart';
import '../../domain/usecases/refresh_route_usecase.dart';
import '../../domain/usecases/get_live_tracking_usecase.dart';
import '../../domain/usecases/get_tracking_history_usecase.dart';

class ProviderTrackingViewModel extends ChangeNotifier {
  final ReportLocationUseCase _reportLocationUseCase;
  final RefreshRouteUseCase _refreshRouteUseCase;
  final GetLiveTrackingUseCase _getLiveTrackingUseCase;
  final GetTrackingHistoryUseCase _getTrackingHistoryUseCase;

  TrackingData? _trackingData;
  List<TrackingHistoryItem> _history = [];
  bool _isLoading = false;
  String? _errorMessage;

  ProviderTrackingViewModel({
    required ReportLocationUseCase reportLocationUseCase,
    required RefreshRouteUseCase refreshRouteUseCase,
    required GetLiveTrackingUseCase getLiveTrackingUseCase,
    required GetTrackingHistoryUseCase getTrackingHistoryUseCase,
  }) : _reportLocationUseCase = reportLocationUseCase,
       _refreshRouteUseCase = refreshRouteUseCase,
       _getLiveTrackingUseCase = getLiveTrackingUseCase,
       _getTrackingHistoryUseCase = getTrackingHistoryUseCase;

  TrackingData? get trackingData => _trackingData;
  List<TrackingHistoryItem> get history => _history;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;

  Future<void> loadLiveTracking(String incidentId) async {
    _setLoading(true);
    _errorMessage = null;

    try {
      _trackingData = await _getLiveTrackingUseCase.execute(incidentId);
      notifyListeners();
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
    } finally {
      _setLoading(false);
    }
  }

  Future<void> loadTrackingHistory(String incidentId) async {
    _setLoading(true);
    _errorMessage = null;

    try {
      _history = await _getTrackingHistoryUseCase.execute(incidentId);
      notifyListeners();
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
    } finally {
      _setLoading(false);
    }
  }

  Future<TrackingData?> reportLocation({
    required String incidentId,
    required double latitude,
    required double longitude,
    required String technicianId,
    double? accuracyMeters,
  }) async {
    _setLoading(true);
    _errorMessage = null;

    try {
      final params = ReportLocationParams(
        latitude: latitude,
        longitude: longitude,
        accuracyMeters: accuracyMeters,
        technicianId: technicianId,
      );
      final result = await _reportLocationUseCase.execute(incidentId, params);
      _trackingData = result;
      notifyListeners();
      return result;
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
      return null;
    } finally {
      _setLoading(false);
    }
  }

  Future<TrackingData?> refreshRoute(String incidentId) async {
    _setLoading(true);
    _errorMessage = null;

    try {
      final result = await _refreshRouteUseCase.execute(incidentId);
      _trackingData = result;
      notifyListeners();
      return result;
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
      return null;
    } finally {
      _setLoading(false);
    }
  }

  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }

  void clearError() {
    _errorMessage = null;
    notifyListeners();
  }

  void clearTrackingData() {
    _trackingData = null;
    _history = [];
    notifyListeners();
  }
}
``

---

## mechanic_mobile/lib/presentation/viewmodels/technicians_viewmodel.dart

``dart
import 'package:flutter/material.dart';
import '../../domain/entities/technician.dart';
import '../../domain/usecases/create_technician_usecase.dart';
import '../../domain/usecases/get_technicians_usecase.dart';
import '../../domain/usecases/update_technician_usecase.dart';

class TechniciansViewModel extends ChangeNotifier {
  final CreateTechnicianUseCase _createTechnicianUseCase;
  final GetTechniciansUseCase _getTechniciansUseCase;
  final UpdateTechnicianUseCase _updateTechnicianUseCase;

  List<Technician> _technicians = [];
  bool _isLoading = false;
  String? _errorMessage;

  TechniciansViewModel({
    required CreateTechnicianUseCase createTechnicianUseCase,
    required GetTechniciansUseCase getTechniciansUseCase,
    required UpdateTechnicianUseCase updateTechnicianUseCase,
  }) : _createTechnicianUseCase = createTechnicianUseCase,
       _getTechniciansUseCase = getTechniciansUseCase,
       _updateTechnicianUseCase = updateTechnicianUseCase;

  List<Technician> get technicians => _technicians;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;

  Future<void> loadTechnicians() async {
    _setLoading(true);
    _errorMessage = null;

    try {
      _technicians = await _getTechniciansUseCase.execute();
      notifyListeners();
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
    } finally {
      _setLoading(false);
    }
  }

  Future<bool> createTechnician({
    required String firstName,
    required String lastName,
    required String phoneNumber,
    required String specialty,
    required bool isAvailable,
    double? latitude,
    double? longitude,
  }) async {
    _setLoading(true);
    _errorMessage = null;

    try {
      final params = CreateTechnicianParams(
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        specialty: specialty,
        isAvailable: isAvailable,
        currentLatitude: latitude,
        currentLongitude: longitude,
      );

      final newTechnician = await _createTechnicianUseCase.execute(params);
      _technicians.add(newTechnician);
      notifyListeners();
      return true;
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
      return false;
    } finally {
      _setLoading(false);
    }
  }

  Future<bool> updateTechnician({
    required String technicianId,
    String? firstName,
    String? lastName,
    String? phoneNumber,
    String? specialty,
    bool? isAvailable,
    double? latitude,
    double? longitude,
  }) async {
    _setLoading(true);
    _errorMessage = null;

    try {
      final params = UpdateTechnicianParams(
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        specialty: specialty,
        isAvailable: isAvailable,
        currentLatitude: latitude,
        currentLongitude: longitude,
      );

      final updatedTechnician = await _updateTechnicianUseCase.execute(
        technicianId,
        params,
      );

      // Actualizar en la lista
      final index = _technicians.indexWhere((t) => t.id == technicianId);
      if (index != -1) {
        _technicians[index] = updatedTechnician;
      }

      notifyListeners();
      return true;
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
      return false;
    } finally {
      _setLoading(false);
    }
  }

  Future<bool> toggleAvailability(String technicianId, bool isAvailable) async {
    return await updateTechnician(
      technicianId: technicianId,
      isAvailable: isAvailable,
    );
  }

  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }

  void clearError() {
    _errorMessage = null;
    notifyListeners();
  }
}
``

---

## mechanic_mobile/lib/presentation/viewmodels/vehicle_viewmodel.dart

``dart
import 'package:flutter/material.dart';

import '../../domain/entities/vehicle.dart';
import '../../domain/usecases/create_vehicle_usecase.dart';
import '../../domain/usecases/get_my_vehicles_usecase.dart';
import '../../domain/usecases/get_vehicle_by_id_usecase.dart';
import '../../domain/usecases/update_vehicle_usecase.dart';

class VehicleViewModel extends ChangeNotifier {
  final CreateVehicleUseCase createVehicleUseCase;
  final GetMyVehiclesUseCase getMyVehiclesUseCase;
  final GetVehicleByIdUseCase getVehicleByIdUseCase;
  final UpdateVehicleUseCase updateVehicleUseCase;

  VehicleViewModel({
    required this.createVehicleUseCase,
    required this.getMyVehiclesUseCase,
    required this.getVehicleByIdUseCase,
    required this.updateVehicleUseCase,
  });

  List<Vehicle> vehicles = [];
  bool isLoading = false;
  String? errorMessage;

  Future<void> loadVehicles() async {
    isLoading = true;
    errorMessage = null;
    notifyListeners();
    try {
      vehicles = await getMyVehiclesUseCase();
    } catch (e) {
      errorMessage = e.toString();
    } finally {
      isLoading = false;
      notifyListeners();
    }
  }

  Future<bool> createVehicle(Map<String, dynamic> body) async {
    isLoading = true;
    errorMessage = null;
    notifyListeners();
    try {
      await createVehicleUseCase(body);
      await loadVehicles();
      return true;
    } catch (e) {
      errorMessage = e.toString();
      isLoading = false;
      notifyListeners();
      return false;
    }
  }

  Future<Vehicle?> getVehicleById(String vehicleId) async {
    try {
      return await getVehicleByIdUseCase(vehicleId);
    } catch (e) {
      errorMessage = e.toString();
      notifyListeners();
      return null;
    }
  }

  Future<bool> updateVehicle(
    String vehicleId,
    Map<String, dynamic> body,
  ) async {
    isLoading = true;
    errorMessage = null;
    notifyListeners();
    try {
      await updateVehicleUseCase(vehicleId, body);
      await loadVehicles();
      return true;
    } catch (e) {
      errorMessage = e.toString();
      isLoading = false;
      notifyListeners();
      return false;
    }
  }
}
``

---

## mechanic_mobile/linux/.gitignore

``
flutter/ephemeral
``

---

## mechanic_mobile/linux/CMakeLists.txt

``cmake
# Project-level configuration.
cmake_minimum_required(VERSION 3.13)
project(runner LANGUAGES CXX)

# The name of the executable created for the application. Change this to change
# the on-disk name of your application.
set(BINARY_NAME "mechanic_mobile")
# The unique GTK application identifier for this application. See:
# https://wiki.gnome.org/HowDoI/ChooseApplicationID
set(APPLICATION_ID "com.example.mechanic_mobile")

# Explicitly opt in to modern CMake behaviors to avoid warnings with recent
# versions of CMake.
cmake_policy(SET CMP0063 NEW)

# Load bundled libraries from the lib/ directory relative to the binary.
set(CMAKE_INSTALL_RPATH "$ORIGIN/lib")

# Root filesystem for cross-building.
if(FLUTTER_TARGET_PLATFORM_SYSROOT)
  set(CMAKE_SYSROOT ${FLUTTER_TARGET_PLATFORM_SYSROOT})
  set(CMAKE_FIND_ROOT_PATH ${CMAKE_SYSROOT})
  set(CMAKE_FIND_ROOT_PATH_MODE_PROGRAM NEVER)
  set(CMAKE_FIND_ROOT_PATH_MODE_PACKAGE ONLY)
  set(CMAKE_FIND_ROOT_PATH_MODE_LIBRARY ONLY)
  set(CMAKE_FIND_ROOT_PATH_MODE_INCLUDE ONLY)
endif()

# Define build configuration options.
if(NOT CMAKE_BUILD_TYPE AND NOT CMAKE_CONFIGURATION_TYPES)
  set(CMAKE_BUILD_TYPE "Debug" CACHE
    STRING "Flutter build mode" FORCE)
  set_property(CACHE CMAKE_BUILD_TYPE PROPERTY STRINGS
    "Debug" "Profile" "Release")
endif()

# Compilation settings that should be applied to most targets.
#
# Be cautious about adding new options here, as plugins use this function by
# default. In most cases, you should add new options to specific targets instead
# of modifying this function.
function(APPLY_STANDARD_SETTINGS TARGET)
  target_compile_features(${TARGET} PUBLIC cxx_std_14)
  target_compile_options(${TARGET} PRIVATE -Wall -Werror)
  target_compile_options(${TARGET} PRIVATE "$<$<NOT:$<CONFIG:Debug>>:-O3>")
  target_compile_definitions(${TARGET} PRIVATE "$<$<NOT:$<CONFIG:Debug>>:NDEBUG>")
endfunction()

# Flutter library and tool build rules.
set(FLUTTER_MANAGED_DIR "${CMAKE_CURRENT_SOURCE_DIR}/flutter")
add_subdirectory(${FLUTTER_MANAGED_DIR})

# System-level dependencies.
find_package(PkgConfig REQUIRED)
pkg_check_modules(GTK REQUIRED IMPORTED_TARGET gtk+-3.0)

# Application build; see runner/CMakeLists.txt.
add_subdirectory("runner")

# Run the Flutter tool portions of the build. This must not be removed.
add_dependencies(${BINARY_NAME} flutter_assemble)

# Only the install-generated bundle's copy of the executable will launch
# correctly, since the resources must in the right relative locations. To avoid
# people trying to run the unbundled copy, put it in a subdirectory instead of
# the default top-level location.
set_target_properties(${BINARY_NAME}
  PROPERTIES
  RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/intermediates_do_not_run"
)


# Generated plugin build rules, which manage building the plugins and adding
# them to the application.
include(flutter/generated_plugins.cmake)


# === Installation ===
# By default, "installing" just makes a relocatable bundle in the build
# directory.
set(BUILD_BUNDLE_DIR "${PROJECT_BINARY_DIR}/bundle")
if(CMAKE_INSTALL_PREFIX_INITIALIZED_TO_DEFAULT)
  set(CMAKE_INSTALL_PREFIX "${BUILD_BUNDLE_DIR}" CACHE PATH "..." FORCE)
endif()

# Start with a clean build bundle directory every time.
install(CODE "
  file(REMOVE_RECURSE \"${BUILD_BUNDLE_DIR}/\")
  " COMPONENT Runtime)

set(INSTALL_BUNDLE_DATA_DIR "${CMAKE_INSTALL_PREFIX}/data")
set(INSTALL_BUNDLE_LIB_DIR "${CMAKE_INSTALL_PREFIX}/lib")

install(TARGETS ${BINARY_NAME} RUNTIME DESTINATION "${CMAKE_INSTALL_PREFIX}"
  COMPONENT Runtime)

install(FILES "${FLUTTER_ICU_DATA_FILE}" DESTINATION "${INSTALL_BUNDLE_DATA_DIR}"
  COMPONENT Runtime)

install(FILES "${FLUTTER_LIBRARY}" DESTINATION "${INSTALL_BUNDLE_LIB_DIR}"
  COMPONENT Runtime)

foreach(bundled_library ${PLUGIN_BUNDLED_LIBRARIES})
  install(FILES "${bundled_library}"
    DESTINATION "${INSTALL_BUNDLE_LIB_DIR}"
    COMPONENT Runtime)
endforeach(bundled_library)

# Copy the native assets provided by the build.dart from all packages.
set(NATIVE_ASSETS_DIR "${PROJECT_BUILD_DIR}native_assets/linux/")
install(DIRECTORY "${NATIVE_ASSETS_DIR}"
   DESTINATION "${INSTALL_BUNDLE_LIB_DIR}"
   COMPONENT Runtime)

# Fully re-copy the assets directory on each build to avoid having stale files
# from a previous install.
set(FLUTTER_ASSET_DIR_NAME "flutter_assets")
install(CODE "
  file(REMOVE_RECURSE \"${INSTALL_BUNDLE_DATA_DIR}/${FLUTTER_ASSET_DIR_NAME}\")
  " COMPONENT Runtime)
install(DIRECTORY "${PROJECT_BUILD_DIR}/${FLUTTER_ASSET_DIR_NAME}"
  DESTINATION "${INSTALL_BUNDLE_DATA_DIR}" COMPONENT Runtime)

# Install the AOT library on non-Debug builds only.
if(NOT CMAKE_BUILD_TYPE MATCHES "Debug")
  install(FILES "${AOT_LIBRARY}" DESTINATION "${INSTALL_BUNDLE_LIB_DIR}"
    COMPONENT Runtime)
endif()
``

---

## mechanic_mobile/linux/flutter/CMakeLists.txt

``cmake
# This file controls Flutter-level build steps. It should not be edited.
cmake_minimum_required(VERSION 3.10)

set(EPHEMERAL_DIR "${CMAKE_CURRENT_SOURCE_DIR}/ephemeral")

# Configuration provided via flutter tool.
include(${EPHEMERAL_DIR}/generated_config.cmake)

# TODO: Move the rest of this into files in ephemeral. See
# https://github.com/flutter/flutter/issues/57146.

# Serves the same purpose as list(TRANSFORM ... PREPEND ...),
# which isn't available in 3.10.
function(list_prepend LIST_NAME PREFIX)
    set(NEW_LIST "")
    foreach(element ${${LIST_NAME}})
        list(APPEND NEW_LIST "${PREFIX}${element}")
    endforeach(element)
    set(${LIST_NAME} "${NEW_LIST}" PARENT_SCOPE)
endfunction()

# === Flutter Library ===
# System-level dependencies.
find_package(PkgConfig REQUIRED)
pkg_check_modules(GTK REQUIRED IMPORTED_TARGET gtk+-3.0)
pkg_check_modules(GLIB REQUIRED IMPORTED_TARGET glib-2.0)
pkg_check_modules(GIO REQUIRED IMPORTED_TARGET gio-2.0)

set(FLUTTER_LIBRARY "${EPHEMERAL_DIR}/libflutter_linux_gtk.so")

# Published to parent scope for install step.
set(FLUTTER_LIBRARY ${FLUTTER_LIBRARY} PARENT_SCOPE)
set(FLUTTER_ICU_DATA_FILE "${EPHEMERAL_DIR}/icudtl.dat" PARENT_SCOPE)
set(PROJECT_BUILD_DIR "${PROJECT_DIR}/build/" PARENT_SCOPE)
set(AOT_LIBRARY "${PROJECT_DIR}/build/lib/libapp.so" PARENT_SCOPE)

list(APPEND FLUTTER_LIBRARY_HEADERS
  "fl_basic_message_channel.h"
  "fl_binary_codec.h"
  "fl_binary_messenger.h"
  "fl_dart_project.h"
  "fl_engine.h"
  "fl_json_message_codec.h"
  "fl_json_method_codec.h"
  "fl_message_codec.h"
  "fl_method_call.h"
  "fl_method_channel.h"
  "fl_method_codec.h"
  "fl_method_response.h"
  "fl_plugin_registrar.h"
  "fl_plugin_registry.h"
  "fl_standard_message_codec.h"
  "fl_standard_method_codec.h"
  "fl_string_codec.h"
  "fl_value.h"
  "fl_view.h"
  "flutter_linux.h"
)
list_prepend(FLUTTER_LIBRARY_HEADERS "${EPHEMERAL_DIR}/flutter_linux/")
add_library(flutter INTERFACE)
target_include_directories(flutter INTERFACE
  "${EPHEMERAL_DIR}"
)
target_link_libraries(flutter INTERFACE "${FLUTTER_LIBRARY}")
target_link_libraries(flutter INTERFACE
  PkgConfig::GTK
  PkgConfig::GLIB
  PkgConfig::GIO
)
add_dependencies(flutter flutter_assemble)

# === Flutter tool backend ===
# _phony_ is a non-existent file to force this command to run every time,
# since currently there's no way to get a full input/output list from the
# flutter tool.
add_custom_command(
  OUTPUT ${FLUTTER_LIBRARY} ${FLUTTER_LIBRARY_HEADERS}
    ${CMAKE_CURRENT_BINARY_DIR}/_phony_
  COMMAND ${CMAKE_COMMAND} -E env
    ${FLUTTER_TOOL_ENVIRONMENT}
    "${FLUTTER_ROOT}/packages/flutter_tools/bin/tool_backend.sh"
      ${FLUTTER_TARGET_PLATFORM} ${CMAKE_BUILD_TYPE}
  VERBATIM
)
add_custom_target(flutter_assemble DEPENDS
  "${FLUTTER_LIBRARY}"
  ${FLUTTER_LIBRARY_HEADERS}
)
``

---

## mechanic_mobile/linux/flutter/generated_plugin_registrant.cc

``
//
//  Generated file. Do not edit.
//

// clang-format off

#include "generated_plugin_registrant.h"

#include <file_selector_linux/file_selector_plugin.h>

void fl_register_plugins(FlPluginRegistry* registry) {
  g_autoptr(FlPluginRegistrar) file_selector_linux_registrar =
      fl_plugin_registry_get_registrar_for_plugin(registry, "FileSelectorPlugin");
  file_selector_plugin_register_with_registrar(file_selector_linux_registrar);
}
``

---

## mechanic_mobile/linux/flutter/generated_plugin_registrant.h

``
//
//  Generated file. Do not edit.
//

// clang-format off

#ifndef GENERATED_PLUGIN_REGISTRANT_
#define GENERATED_PLUGIN_REGISTRANT_

#include <flutter_linux/flutter_linux.h>

// Registers Flutter plugins.
void fl_register_plugins(FlPluginRegistry* registry);

#endif  // GENERATED_PLUGIN_REGISTRANT_
``

---

## mechanic_mobile/linux/flutter/generated_plugins.cmake

``
#
# Generated file, do not edit.
#

list(APPEND FLUTTER_PLUGIN_LIST
  file_selector_linux
)

list(APPEND FLUTTER_FFI_PLUGIN_LIST
  jni
)

set(PLUGIN_BUNDLED_LIBRARIES)

foreach(plugin ${FLUTTER_PLUGIN_LIST})
  add_subdirectory(flutter/ephemeral/.plugin_symlinks/${plugin}/linux plugins/${plugin})
  target_link_libraries(${BINARY_NAME} PRIVATE ${plugin}_plugin)
  list(APPEND PLUGIN_BUNDLED_LIBRARIES $<TARGET_FILE:${plugin}_plugin>)
  list(APPEND PLUGIN_BUNDLED_LIBRARIES ${${plugin}_bundled_libraries})
endforeach(plugin)

foreach(ffi_plugin ${FLUTTER_FFI_PLUGIN_LIST})
  add_subdirectory(flutter/ephemeral/.plugin_symlinks/${ffi_plugin}/linux plugins/${ffi_plugin})
  list(APPEND PLUGIN_BUNDLED_LIBRARIES ${${ffi_plugin}_bundled_libraries})
endforeach(ffi_plugin)
``

---

## mechanic_mobile/linux/runner/CMakeLists.txt

``cmake
cmake_minimum_required(VERSION 3.13)
project(runner LANGUAGES CXX)

# Define the application target. To change its name, change BINARY_NAME in the
# top-level CMakeLists.txt, not the value here, or `flutter run` will no longer
# work.
#
# Any new source files that you add to the application should be added here.
add_executable(${BINARY_NAME}
  "main.cc"
  "my_application.cc"
  "${FLUTTER_MANAGED_DIR}/generated_plugin_registrant.cc"
)

# Apply the standard set of build settings. This can be removed for applications
# that need different build settings.
apply_standard_settings(${BINARY_NAME})

# Add preprocessor definitions for the application ID.
add_definitions(-DAPPLICATION_ID="${APPLICATION_ID}")

# Add dependency libraries. Add any application-specific dependencies here.
target_link_libraries(${BINARY_NAME} PRIVATE flutter)
target_link_libraries(${BINARY_NAME} PRIVATE PkgConfig::GTK)

target_include_directories(${BINARY_NAME} PRIVATE "${CMAKE_SOURCE_DIR}")
``

---

## mechanic_mobile/linux/runner/main.cc

``
#include "my_application.h"

int main(int argc, char** argv) {
  g_autoptr(MyApplication) app = my_application_new();
  return g_application_run(G_APPLICATION(app), argc, argv);
}
``

---

## mechanic_mobile/linux/runner/my_application.cc

``
#include "my_application.h"

#include <flutter_linux/flutter_linux.h>
#ifdef GDK_WINDOWING_X11
#include <gdk/gdkx.h>
#endif

#include "flutter/generated_plugin_registrant.h"

struct _MyApplication {
  GtkApplication parent_instance;
  char** dart_entrypoint_arguments;
};

G_DEFINE_TYPE(MyApplication, my_application, GTK_TYPE_APPLICATION)

// Called when first Flutter frame received.
static void first_frame_cb(MyApplication* self, FlView *view)
{
  gtk_widget_show(gtk_widget_get_toplevel(GTK_WIDGET(view)));
}

// Implements GApplication::activate.
static void my_application_activate(GApplication* application) {
  MyApplication* self = MY_APPLICATION(application);
  GtkWindow* window =
      GTK_WINDOW(gtk_application_window_new(GTK_APPLICATION(application)));

  // Use a header bar when running in GNOME as this is the common style used
  // by applications and is the setup most users will be using (e.g. Ubuntu
  // desktop).
  // If running on X and not using GNOME then just use a traditional title bar
  // in case the window manager does more exotic layout, e.g. tiling.
  // If running on Wayland assume the header bar will work (may need changing
  // if future cases occur).
  gboolean use_header_bar = TRUE;
#ifdef GDK_WINDOWING_X11
  GdkScreen* screen = gtk_window_get_screen(window);
  if (GDK_IS_X11_SCREEN(screen)) {
    const gchar* wm_name = gdk_x11_screen_get_window_manager_name(screen);
    if (g_strcmp0(wm_name, "GNOME Shell") != 0) {
      use_header_bar = FALSE;
    }
  }
#endif
  if (use_header_bar) {
    GtkHeaderBar* header_bar = GTK_HEADER_BAR(gtk_header_bar_new());
    gtk_widget_show(GTK_WIDGET(header_bar));
    gtk_header_bar_set_title(header_bar, "mechanic_mobile");
    gtk_header_bar_set_show_close_button(header_bar, TRUE);
    gtk_window_set_titlebar(window, GTK_WIDGET(header_bar));
  } else {
    gtk_window_set_title(window, "mechanic_mobile");
  }

  gtk_window_set_default_size(window, 1280, 720);

  g_autoptr(FlDartProject) project = fl_dart_project_new();
  fl_dart_project_set_dart_entrypoint_arguments(project, self->dart_entrypoint_arguments);

  FlView* view = fl_view_new(project);
  GdkRGBA background_color;
  // Background defaults to black, override it here if necessary, e.g. #00000000 for transparent.
  gdk_rgba_parse(&background_color, "#000000");
  fl_view_set_background_color(view, &background_color);
  gtk_widget_show(GTK_WIDGET(view));
  gtk_container_add(GTK_CONTAINER(window), GTK_WIDGET(view));

  // Show the window when Flutter renders.
  // Requires the view to be realized so we can start rendering.
  g_signal_connect_swapped(view, "first-frame", G_CALLBACK(first_frame_cb), self);
  gtk_widget_realize(GTK_WIDGET(view));

  fl_register_plugins(FL_PLUGIN_REGISTRY(view));

  gtk_widget_grab_focus(GTK_WIDGET(view));
}

// Implements GApplication::local_command_line.
static gboolean my_application_local_command_line(GApplication* application, gchar*** arguments, int* exit_status) {
  MyApplication* self = MY_APPLICATION(application);
  // Strip out the first argument as it is the binary name.
  self->dart_entrypoint_arguments = g_strdupv(*arguments + 1);

  g_autoptr(GError) error = nullptr;
  if (!g_application_register(application, nullptr, &error)) {
     g_warning("Failed to register: %s", error->message);
     *exit_status = 1;
     return TRUE;
  }

  g_application_activate(application);
  *exit_status = 0;

  return TRUE;
}

// Implements GApplication::startup.
static void my_application_startup(GApplication* application) {
  //MyApplication* self = MY_APPLICATION(object);

  // Perform any actions required at application startup.

  G_APPLICATION_CLASS(my_application_parent_class)->startup(application);
}

// Implements GApplication::shutdown.
static void my_application_shutdown(GApplication* application) {
  //MyApplication* self = MY_APPLICATION(object);

  // Perform any actions required at application shutdown.

  G_APPLICATION_CLASS(my_application_parent_class)->shutdown(application);
}

// Implements GObject::dispose.
static void my_application_dispose(GObject* object) {
  MyApplication* self = MY_APPLICATION(object);
  g_clear_pointer(&self->dart_entrypoint_arguments, g_strfreev);
  G_OBJECT_CLASS(my_application_parent_class)->dispose(object);
}

static void my_application_class_init(MyApplicationClass* klass) {
  G_APPLICATION_CLASS(klass)->activate = my_application_activate;
  G_APPLICATION_CLASS(klass)->local_command_line = my_application_local_command_line;
  G_APPLICATION_CLASS(klass)->startup = my_application_startup;
  G_APPLICATION_CLASS(klass)->shutdown = my_application_shutdown;
  G_OBJECT_CLASS(klass)->dispose = my_application_dispose;
}

static void my_application_init(MyApplication* self) {}

MyApplication* my_application_new() {
  // Set the program name to the application ID, which helps various systems
  // like GTK and desktop environments map this running application to its
  // corresponding .desktop file. This ensures better integration by allowing
  // the application to be recognized beyond its binary name.
  g_set_prgname(APPLICATION_ID);

  return MY_APPLICATION(g_object_new(my_application_get_type(),
                                     "application-id", APPLICATION_ID,
                                     "flags", G_APPLICATION_NON_UNIQUE,
                                     nullptr));
}
``

---

## mechanic_mobile/linux/runner/my_application.h

``
#ifndef FLUTTER_MY_APPLICATION_H_
#define FLUTTER_MY_APPLICATION_H_

#include <gtk/gtk.h>

G_DECLARE_FINAL_TYPE(MyApplication, my_application, MY, APPLICATION,
                     GtkApplication)

/**
 * my_application_new:
 *
 * Creates a new Flutter-based application.
 *
 * Returns: a new #MyApplication.
 */
MyApplication* my_application_new();

#endif  // FLUTTER_MY_APPLICATION_H_
``

---

## mechanic_mobile/macos/.gitignore

``
# Flutter-related
**/Flutter/ephemeral/
**/Pods/

# Xcode-related
**/dgph
**/xcuserdata/
``

---

## mechanic_mobile/macos/Flutter/Flutter-Debug.xcconfig

``
#include "ephemeral/Flutter-Generated.xcconfig"
``

---

## mechanic_mobile/macos/Flutter/Flutter-Release.xcconfig

``
#include "ephemeral/Flutter-Generated.xcconfig"
``

---

## mechanic_mobile/macos/Flutter/GeneratedPluginRegistrant.swift

``swift
//
//  Generated file. Do not edit.
//

import FlutterMacOS
import Foundation

import file_selector_macos
import firebase_core
import firebase_messaging
import geolocator_apple
import package_info_plus
import shared_preferences_foundation
import speech_to_text

func RegisterGeneratedPlugins(registry: FlutterPluginRegistry) {
  FileSelectorPlugin.register(with: registry.registrar(forPlugin: "FileSelectorPlugin"))
  FLTFirebaseCorePlugin.register(with: registry.registrar(forPlugin: "FLTFirebaseCorePlugin"))
  FLTFirebaseMessagingPlugin.register(with: registry.registrar(forPlugin: "FLTFirebaseMessagingPlugin"))
  GeolocatorPlugin.register(with: registry.registrar(forPlugin: "GeolocatorPlugin"))
  FPPPackageInfoPlusPlugin.register(with: registry.registrar(forPlugin: "FPPPackageInfoPlusPlugin"))
  SharedPreferencesPlugin.register(with: registry.registrar(forPlugin: "SharedPreferencesPlugin"))
  SpeechToTextPlugin.register(with: registry.registrar(forPlugin: "SpeechToTextPlugin"))
}
``

---

## mechanic_mobile/macos/Runner.xcodeproj/project.pbxproj

``
// !$*UTF8*$!
{
	archiveVersion = 1;
	classes = {
	};
	objectVersion = 54;
	objects = {

/* Begin PBXAggregateTarget section */
		33CC111A2044C6BA0003C045 /* Flutter Assemble */ = {
			isa = PBXAggregateTarget;
			buildConfigurationList = 33CC111B2044C6BA0003C045 /* Build configuration list for PBXAggregateTarget "Flutter Assemble" */;
			buildPhases = (
				33CC111E2044C6BF0003C045 /* ShellScript */,
			);
			dependencies = (
			);
			name = "Flutter Assemble";
			productName = FLX;
		};
/* End PBXAggregateTarget section */

/* Begin PBXBuildFile section */
		331C80D8294CF71000263BE5 /* RunnerTests.swift in Sources */ = {isa = PBXBuildFile; fileRef = 331C80D7294CF71000263BE5 /* RunnerTests.swift */; };
		335BBD1B22A9A15E00E9071D /* GeneratedPluginRegistrant.swift in Sources */ = {isa = PBXBuildFile; fileRef = 335BBD1A22A9A15E00E9071D /* GeneratedPluginRegistrant.swift */; };
		33CC10F12044A3C60003C045 /* AppDelegate.swift in Sources */ = {isa = PBXBuildFile; fileRef = 33CC10F02044A3C60003C045 /* AppDelegate.swift */; };
		33CC10F32044A3C60003C045 /* Assets.xcassets in Resources */ = {isa = PBXBuildFile; fileRef = 33CC10F22044A3C60003C045 /* Assets.xcassets */; };
		33CC10F62044A3C60003C045 /* MainMenu.xib in Resources */ = {isa = PBXBuildFile; fileRef = 33CC10F42044A3C60003C045 /* MainMenu.xib */; };
		33CC11132044BFA00003C045 /* MainFlutterWindow.swift in Sources */ = {isa = PBXBuildFile; fileRef = 33CC11122044BFA00003C045 /* MainFlutterWindow.swift */; };
/* End PBXBuildFile section */

/* Begin PBXContainerItemProxy section */
		331C80D9294CF71000263BE5 /* PBXContainerItemProxy */ = {
			isa = PBXContainerItemProxy;
			containerPortal = 33CC10E52044A3C60003C045 /* Project object */;
			proxyType = 1;
			remoteGlobalIDString = 33CC10EC2044A3C60003C045;
			remoteInfo = Runner;
		};
		33CC111F2044C79F0003C045 /* PBXContainerItemProxy */ = {
			isa = PBXContainerItemProxy;
			containerPortal = 33CC10E52044A3C60003C045 /* Project object */;
			proxyType = 1;
			remoteGlobalIDString = 33CC111A2044C6BA0003C045;
			remoteInfo = FLX;
		};
/* End PBXContainerItemProxy section */

/* Begin PBXCopyFilesBuildPhase section */
		33CC110E2044A8840003C045 /* Bundle Framework */ = {
			isa = PBXCopyFilesBuildPhase;
			buildActionMask = 2147483647;
			dstPath = "";
			dstSubfolderSpec = 10;
			files = (
			);
			name = "Bundle Framework";
			runOnlyForDeploymentPostprocessing = 0;
		};
/* End PBXCopyFilesBuildPhase section */

/* Begin PBXFileReference section */
		331C80D5294CF71000263BE5 /* RunnerTests.xctest */ = {isa = PBXFileReference; explicitFileType = wrapper.cfbundle; includeInIndex = 0; path = RunnerTests.xctest; sourceTree = BUILT_PRODUCTS_DIR; };
		331C80D7294CF71000263BE5 /* RunnerTests.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = RunnerTests.swift; sourceTree = "<group>"; };
		333000ED22D3DE5D00554162 /* Warnings.xcconfig */ = {isa = PBXFileReference; lastKnownFileType = text.xcconfig; path = Warnings.xcconfig; sourceTree = "<group>"; };
		335BBD1A22A9A15E00E9071D /* GeneratedPluginRegistrant.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = GeneratedPluginRegistrant.swift; sourceTree = "<group>"; };
		33CC10ED2044A3C60003C045 /* mechanic_mobile.app */ = {isa = PBXFileReference; explicitFileType = wrapper.application; includeInIndex = 0; path = "mechanic_mobile.app"; sourceTree = BUILT_PRODUCTS_DIR; };
		33CC10F02044A3C60003C045 /* AppDelegate.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = AppDelegate.swift; sourceTree = "<group>"; };
		33CC10F22044A3C60003C045 /* Assets.xcassets */ = {isa = PBXFileReference; lastKnownFileType = folder.assetcatalog; name = Assets.xcassets; path = Runner/Assets.xcassets; sourceTree = "<group>"; };
		33CC10F52044A3C60003C045 /* Base */ = {isa = PBXFileReference; lastKnownFileType = file.xib; name = Base; path = Base.lproj/MainMenu.xib; sourceTree = "<group>"; };
		33CC10F72044A3C60003C045 /* Info.plist */ = {isa = PBXFileReference; lastKnownFileType = text.plist.xml; name = Info.plist; path = Runner/Info.plist; sourceTree = "<group>"; };
		33CC11122044BFA00003C045 /* MainFlutterWindow.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = MainFlutterWindow.swift; sourceTree = "<group>"; };
		33CEB47222A05771004F2AC0 /* Flutter-Debug.xcconfig */ = {isa = PBXFileReference; lastKnownFileType = text.xcconfig; path = "Flutter-Debug.xcconfig"; sourceTree = "<group>"; };
		33CEB47422A05771004F2AC0 /* Flutter-Release.xcconfig */ = {isa = PBXFileReference; lastKnownFileType = text.xcconfig; path = "Flutter-Release.xcconfig"; sourceTree = "<group>"; };
		33CEB47722A0578A004F2AC0 /* Flutter-Generated.xcconfig */ = {isa = PBXFileReference; lastKnownFileType = text.xcconfig; name = "Flutter-Generated.xcconfig"; path = "ephemeral/Flutter-Generated.xcconfig"; sourceTree = "<group>"; };
		33E51913231747F40026EE4D /* DebugProfile.entitlements */ = {isa = PBXFileReference; lastKnownFileType = text.plist.entitlements; path = DebugProfile.entitlements; sourceTree = "<group>"; };
		33E51914231749380026EE4D /* Release.entitlements */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = text.plist.entitlements; path = Release.entitlements; sourceTree = "<group>"; };
		33E5194F232828860026EE4D /* AppInfo.xcconfig */ = {isa = PBXFileReference; lastKnownFileType = text.xcconfig; path = AppInfo.xcconfig; sourceTree = "<group>"; };
		7AFA3C8E1D35360C0083082E /* Release.xcconfig */ = {isa = PBXFileReference; lastKnownFileType = text.xcconfig; path = Release.xcconfig; sourceTree = "<group>"; };
		9740EEB21CF90195004384FC /* Debug.xcconfig */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = text.xcconfig; path = Debug.xcconfig; sourceTree = "<group>"; };
/* End PBXFileReference section */

/* Begin PBXFrameworksBuildPhase section */
		331C80D2294CF70F00263BE5 /* Frameworks */ = {
			isa = PBXFrameworksBuildPhase;
			buildActionMask = 2147483647;
			files = (
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
		33CC10EA2044A3C60003C045 /* Frameworks */ = {
			isa = PBXFrameworksBuildPhase;
			buildActionMask = 2147483647;
			files = (
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
/* End PBXFrameworksBuildPhase section */

/* Begin PBXGroup section */
		331C80D6294CF71000263BE5 /* RunnerTests */ = {
			isa = PBXGroup;
			children = (
				331C80D7294CF71000263BE5 /* RunnerTests.swift */,
			);
			path = RunnerTests;
			sourceTree = "<group>";
		};
		33BA886A226E78AF003329D5 /* Configs */ = {
			isa = PBXGroup;
			children = (
				33E5194F232828860026EE4D /* AppInfo.xcconfig */,
				9740EEB21CF90195004384FC /* Debug.xcconfig */,
				7AFA3C8E1D35360C0083082E /* Release.xcconfig */,
				333000ED22D3DE5D00554162 /* Warnings.xcconfig */,
			);
			path = Configs;
			sourceTree = "<group>";
		};
		33CC10E42044A3C60003C045 = {
			isa = PBXGroup;
			children = (
				33FAB671232836740065AC1E /* Runner */,
				33CEB47122A05771004F2AC0 /* Flutter */,
				331C80D6294CF71000263BE5 /* RunnerTests */,
				33CC10EE2044A3C60003C045 /* Products */,
				D73912EC22F37F3D000D13A0 /* Frameworks */,
			);
			sourceTree = "<group>";
		};
		33CC10EE2044A3C60003C045 /* Products */ = {
			isa = PBXGroup;
			children = (
				33CC10ED2044A3C60003C045 /* mechanic_mobile.app */,
				331C80D5294CF71000263BE5 /* RunnerTests.xctest */,
			);
			name = Products;
			sourceTree = "<group>";
		};
		33CC11242044D66E0003C045 /* Resources */ = {
			isa = PBXGroup;
			children = (
				33CC10F22044A3C60003C045 /* Assets.xcassets */,
				33CC10F42044A3C60003C045 /* MainMenu.xib */,
				33CC10F72044A3C60003C045 /* Info.plist */,
			);
			name = Resources;
			path = ..;
			sourceTree = "<group>";
		};
		33CEB47122A05771004F2AC0 /* Flutter */ = {
			isa = PBXGroup;
			children = (
				335BBD1A22A9A15E00E9071D /* GeneratedPluginRegistrant.swift */,
				33CEB47222A05771004F2AC0 /* Flutter-Debug.xcconfig */,
				33CEB47422A05771004F2AC0 /* Flutter-Release.xcconfig */,
				33CEB47722A0578A004F2AC0 /* Flutter-Generated.xcconfig */,
			);
			path = Flutter;
			sourceTree = "<group>";
		};
		33FAB671232836740065AC1E /* Runner */ = {
			isa = PBXGroup;
			children = (
				33CC10F02044A3C60003C045 /* AppDelegate.swift */,
				33CC11122044BFA00003C045 /* MainFlutterWindow.swift */,
				33E51913231747F40026EE4D /* DebugProfile.entitlements */,
				33E51914231749380026EE4D /* Release.entitlements */,
				33CC11242044D66E0003C045 /* Resources */,
				33BA886A226E78AF003329D5 /* Configs */,
			);
			path = Runner;
			sourceTree = "<group>";
		};
		D73912EC22F37F3D000D13A0 /* Frameworks */ = {
			isa = PBXGroup;
			children = (
			);
			name = Frameworks;
			sourceTree = "<group>";
		};
/* End PBXGroup section */

/* Begin PBXNativeTarget section */
		331C80D4294CF70F00263BE5 /* RunnerTests */ = {
			isa = PBXNativeTarget;
			buildConfigurationList = 331C80DE294CF71000263BE5 /* Build configuration list for PBXNativeTarget "RunnerTests" */;
			buildPhases = (
				331C80D1294CF70F00263BE5 /* Sources */,
				331C80D2294CF70F00263BE5 /* Frameworks */,
				331C80D3294CF70F00263BE5 /* Resources */,
			);
			buildRules = (
			);
			dependencies = (
				331C80DA294CF71000263BE5 /* PBXTargetDependency */,
			);
			name = RunnerTests;
			productName = RunnerTests;
			productReference = 331C80D5294CF71000263BE5 /* RunnerTests.xctest */;
			productType = "com.apple.product-type.bundle.unit-test";
		};
		33CC10EC2044A3C60003C045 /* Runner */ = {
			isa = PBXNativeTarget;
			buildConfigurationList = 33CC10FB2044A3C60003C045 /* Build configuration list for PBXNativeTarget "Runner" */;
			buildPhases = (
				33CC10E92044A3C60003C045 /* Sources */,
				33CC10EA2044A3C60003C045 /* Frameworks */,
				33CC10EB2044A3C60003C045 /* Resources */,
				33CC110E2044A8840003C045 /* Bundle Framework */,
				3399D490228B24CF009A79C7 /* ShellScript */,
			);
			buildRules = (
			);
			dependencies = (
				33CC11202044C79F0003C045 /* PBXTargetDependency */,
			);
			name = Runner;
			productName = Runner;
			productReference = 33CC10ED2044A3C60003C045 /* mechanic_mobile.app */;
			productType = "com.apple.product-type.application";
		};
/* End PBXNativeTarget section */

/* Begin PBXProject section */
		33CC10E52044A3C60003C045 /* Project object */ = {
			isa = PBXProject;
			attributes = {
				BuildIndependentTargetsInParallel = YES;
				LastSwiftUpdateCheck = 0920;
				LastUpgradeCheck = 1510;
				ORGANIZATIONNAME = "";
				TargetAttributes = {
					331C80D4294CF70F00263BE5 = {
						CreatedOnToolsVersion = 14.0;
						TestTargetID = 33CC10EC2044A3C60003C045;
					};
					33CC10EC2044A3C60003C045 = {
						CreatedOnToolsVersion = 9.2;
						LastSwiftMigration = 1100;
						ProvisioningStyle = Automatic;
						SystemCapabilities = {
							com.apple.Sandbox = {
								enabled = 1;
							};
						};
					};
					33CC111A2044C6BA0003C045 = {
						CreatedOnToolsVersion = 9.2;
						ProvisioningStyle = Manual;
					};
				};
			};
			buildConfigurationList = 33CC10E82044A3C60003C045 /* Build configuration list for PBXProject "Runner" */;
			compatibilityVersion = "Xcode 9.3";
			developmentRegion = en;
			hasScannedForEncodings = 0;
			knownRegions = (
				en,
				Base,
			);
			mainGroup = 33CC10E42044A3C60003C045;
			productRefGroup = 33CC10EE2044A3C60003C045 /* Products */;
			projectDirPath = "";
			projectRoot = "";
			targets = (
				33CC10EC2044A3C60003C045 /* Runner */,
				331C80D4294CF70F00263BE5 /* RunnerTests */,
				33CC111A2044C6BA0003C045 /* Flutter Assemble */,
			);
		};
/* End PBXProject section */

/* Begin PBXResourcesBuildPhase section */
		331C80D3294CF70F00263BE5 /* Resources */ = {
			isa = PBXResourcesBuildPhase;
			buildActionMask = 2147483647;
			files = (
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
		33CC10EB2044A3C60003C045 /* Resources */ = {
			isa = PBXResourcesBuildPhase;
			buildActionMask = 2147483647;
			files = (
				33CC10F32044A3C60003C045 /* Assets.xcassets in Resources */,
				33CC10F62044A3C60003C045 /* MainMenu.xib in Resources */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
/* End PBXResourcesBuildPhase section */

/* Begin PBXShellScriptBuildPhase section */
		3399D490228B24CF009A79C7 /* ShellScript */ = {
			isa = PBXShellScriptBuildPhase;
			alwaysOutOfDate = 1;
			buildActionMask = 2147483647;
			files = (
			);
			inputFileListPaths = (
			);
			inputPaths = (
			);
			outputFileListPaths = (
			);
			outputPaths = (
			);
			runOnlyForDeploymentPostprocessing = 0;
			shellPath = /bin/sh;
			shellScript = "echo \"$PRODUCT_NAME.app\" > \"$PROJECT_DIR\"/Flutter/ephemeral/.app_filename && \"$FLUTTER_ROOT\"/packages/flutter_tools/bin/macos_assemble.sh embed\n";
		};
		33CC111E2044C6BF0003C045 /* ShellScript */ = {
			isa = PBXShellScriptBuildPhase;
			buildActionMask = 2147483647;
			files = (
			);
			inputFileListPaths = (
				Flutter/ephemeral/FlutterInputs.xcfilelist,
			);
			inputPaths = (
				Flutter/ephemeral/tripwire,
			);
			outputFileListPaths = (
				Flutter/ephemeral/FlutterOutputs.xcfilelist,
			);
			outputPaths = (
			);
			runOnlyForDeploymentPostprocessing = 0;
			shellPath = /bin/sh;
			shellScript = "\"$FLUTTER_ROOT\"/packages/flutter_tools/bin/macos_assemble.sh && touch Flutter/ephemeral/tripwire";
		};
/* End PBXShellScriptBuildPhase section */

/* Begin PBXSourcesBuildPhase section */
		331C80D1294CF70F00263BE5 /* Sources */ = {
			isa = PBXSourcesBuildPhase;
			buildActionMask = 2147483647;
			files = (
				331C80D8294CF71000263BE5 /* RunnerTests.swift in Sources */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
		33CC10E92044A3C60003C045 /* Sources */ = {
			isa = PBXSourcesBuildPhase;
			buildActionMask = 2147483647;
			files = (
				33CC11132044BFA00003C045 /* MainFlutterWindow.swift in Sources */,
				33CC10F12044A3C60003C045 /* AppDelegate.swift in Sources */,
				335BBD1B22A9A15E00E9071D /* GeneratedPluginRegistrant.swift in Sources */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
/* End PBXSourcesBuildPhase section */

/* Begin PBXTargetDependency section */
		331C80DA294CF71000263BE5 /* PBXTargetDependency */ = {
			isa = PBXTargetDependency;
			target = 33CC10EC2044A3C60003C045 /* Runner */;
			targetProxy = 331C80D9294CF71000263BE5 /* PBXContainerItemProxy */;
		};
		33CC11202044C79F0003C045 /* PBXTargetDependency */ = {
			isa = PBXTargetDependency;
			target = 33CC111A2044C6BA0003C045 /* Flutter Assemble */;
			targetProxy = 33CC111F2044C79F0003C045 /* PBXContainerItemProxy */;
		};
/* End PBXTargetDependency section */

/* Begin PBXVariantGroup section */
		33CC10F42044A3C60003C045 /* MainMenu.xib */ = {
			isa = PBXVariantGroup;
			children = (
				33CC10F52044A3C60003C045 /* Base */,
			);
			name = MainMenu.xib;
			path = Runner;
			sourceTree = "<group>";
		};
/* End PBXVariantGroup section */

/* Begin XCBuildConfiguration section */
		331C80DB294CF71000263BE5 /* Debug */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				BUNDLE_LOADER = "$(TEST_HOST)";
				CURRENT_PROJECT_VERSION = 1;
				GENERATE_INFOPLIST_FILE = YES;
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = com.example.mechanicMobile.RunnerTests;
				PRODUCT_NAME = "$(TARGET_NAME)";
				SWIFT_VERSION = 5.0;
				TEST_HOST = "$(BUILT_PRODUCTS_DIR)/mechanic_mobile.app/$(BUNDLE_EXECUTABLE_FOLDER_PATH)/mechanic_mobile";
			};
			name = Debug;
		};
		331C80DC294CF71000263BE5 /* Release */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				BUNDLE_LOADER = "$(TEST_HOST)";
				CURRENT_PROJECT_VERSION = 1;
				GENERATE_INFOPLIST_FILE = YES;
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = com.example.mechanicMobile.RunnerTests;
				PRODUCT_NAME = "$(TARGET_NAME)";
				SWIFT_VERSION = 5.0;
				TEST_HOST = "$(BUILT_PRODUCTS_DIR)/mechanic_mobile.app/$(BUNDLE_EXECUTABLE_FOLDER_PATH)/mechanic_mobile";
			};
			name = Release;
		};
		331C80DD294CF71000263BE5 /* Profile */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				BUNDLE_LOADER = "$(TEST_HOST)";
				CURRENT_PROJECT_VERSION = 1;
				GENERATE_INFOPLIST_FILE = YES;
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = com.example.mechanicMobile.RunnerTests;
				PRODUCT_NAME = "$(TARGET_NAME)";
				SWIFT_VERSION = 5.0;
				TEST_HOST = "$(BUILT_PRODUCTS_DIR)/mechanic_mobile.app/$(BUNDLE_EXECUTABLE_FOLDER_PATH)/mechanic_mobile";
			};
			name = Profile;
		};
		338D0CE9231458BD00FA5F75 /* Profile */ = {
			isa = XCBuildConfiguration;
			baseConfigurationReference = 7AFA3C8E1D35360C0083082E /* Release.xcconfig */;
			buildSettings = {
				ALWAYS_SEARCH_USER_PATHS = NO;
				ASSETCATALOG_COMPILER_GENERATE_SWIFT_ASSET_SYMBOL_EXTENSIONS = YES;
				CLANG_ANALYZER_NONNULL = YES;
				CLANG_ANALYZER_NUMBER_OBJECT_CONVERSION = YES_AGGRESSIVE;
				CLANG_CXX_LANGUAGE_STANDARD = "gnu++14";
				CLANG_CXX_LIBRARY = "libc++";
				CLANG_ENABLE_MODULES = YES;
				CLANG_ENABLE_OBJC_ARC = YES;
				CLANG_WARN_BLOCK_CAPTURE_AUTORELEASING = YES;
				CLANG_WARN_BOOL_CONVERSION = YES;
				CLANG_WARN_CONSTANT_CONVERSION = YES;
				CLANG_WARN_DEPRECATED_OBJC_IMPLEMENTATIONS = YES;
				CLANG_WARN_DIRECT_OBJC_ISA_USAGE = YES_ERROR;
				CLANG_WARN_DOCUMENTATION_COMMENTS = YES;
				CLANG_WARN_EMPTY_BODY = YES;
				CLANG_WARN_ENUM_CONVERSION = YES;
				CLANG_WARN_INFINITE_RECURSION = YES;
				CLANG_WARN_INT_CONVERSION = YES;
				CLANG_WARN_NON_LITERAL_NULL_CONVERSION = YES;
				CLANG_WARN_OBJC_LITERAL_CONVERSION = YES;
				CLANG_WARN_OBJC_ROOT_CLASS = YES_ERROR;
				CLANG_WARN_RANGE_LOOP_ANALYSIS = YES;
				CLANG_WARN_SUSPICIOUS_MOVE = YES;
				CODE_SIGN_IDENTITY = "-";
				COPY_PHASE_STRIP = NO;
				DEAD_CODE_STRIPPING = YES;
				DEBUG_INFORMATION_FORMAT = "dwarf-with-dsym";
				ENABLE_NS_ASSERTIONS = NO;
				ENABLE_STRICT_OBJC_MSGSEND = YES;
				ENABLE_USER_SCRIPT_SANDBOXING = NO;
				GCC_C_LANGUAGE_STANDARD = gnu11;
				GCC_NO_COMMON_BLOCKS = YES;
				GCC_WARN_64_TO_32_BIT_CONVERSION = YES;
				GCC_WARN_ABOUT_RETURN_TYPE = YES_ERROR;
				GCC_WARN_UNINITIALIZED_AUTOS = YES_AGGRESSIVE;
				GCC_WARN_UNUSED_FUNCTION = YES;
				GCC_WARN_UNUSED_VARIABLE = YES;
				MACOSX_DEPLOYMENT_TARGET = 10.15;
				MTL_ENABLE_DEBUG_INFO = NO;
				SDKROOT = macosx;
				SWIFT_COMPILATION_MODE = wholemodule;
				SWIFT_OPTIMIZATION_LEVEL = "-O";
			};
			name = Profile;
		};
		338D0CEA231458BD00FA5F75 /* Profile */ = {
			isa = XCBuildConfiguration;
			baseConfigurationReference = 33E5194F232828860026EE4D /* AppInfo.xcconfig */;
			buildSettings = {
				ASSETCATALOG_COMPILER_APPICON_NAME = AppIcon;
				CLANG_ENABLE_MODULES = YES;
				CODE_SIGN_ENTITLEMENTS = Runner/DebugProfile.entitlements;
				CODE_SIGN_STYLE = Automatic;
				COMBINE_HIDPI_IMAGES = YES;
				INFOPLIST_FILE = Runner/Info.plist;
				LD_RUNPATH_SEARCH_PATHS = (
					"$(inherited)",
					"@executable_path/../Frameworks",
				);
				PROVISIONING_PROFILE_SPECIFIER = "";
				SWIFT_VERSION = 5.0;
			};
			name = Profile;
		};
		338D0CEB231458BD00FA5F75 /* Profile */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				CODE_SIGN_STYLE = Manual;
				PRODUCT_NAME = "$(TARGET_NAME)";
			};
			name = Profile;
		};
		33CC10F92044A3C60003C045 /* Debug */ = {
			isa = XCBuildConfiguration;
			baseConfigurationReference = 9740EEB21CF90195004384FC /* Debug.xcconfig */;
			buildSettings = {
				ALWAYS_SEARCH_USER_PATHS = NO;
				ASSETCATALOG_COMPILER_GENERATE_SWIFT_ASSET_SYMBOL_EXTENSIONS = YES;
				CLANG_ANALYZER_NONNULL = YES;
				CLANG_ANALYZER_NUMBER_OBJECT_CONVERSION = YES_AGGRESSIVE;
				CLANG_CXX_LANGUAGE_STANDARD = "gnu++14";
				CLANG_CXX_LIBRARY = "libc++";
				CLANG_ENABLE_MODULES = YES;
				CLANG_ENABLE_OBJC_ARC = YES;
				CLANG_WARN_BLOCK_CAPTURE_AUTORELEASING = YES;
				CLANG_WARN_BOOL_CONVERSION = YES;
				CLANG_WARN_CONSTANT_CONVERSION = YES;
				CLANG_WARN_DEPRECATED_OBJC_IMPLEMENTATIONS = YES;
				CLANG_WARN_DIRECT_OBJC_ISA_USAGE = YES_ERROR;
				CLANG_WARN_DOCUMENTATION_COMMENTS = YES;
				CLANG_WARN_EMPTY_BODY = YES;
				CLANG_WARN_ENUM_CONVERSION = YES;
				CLANG_WARN_INFINITE_RECURSION = YES;
				CLANG_WARN_INT_CONVERSION = YES;
				CLANG_WARN_NON_LITERAL_NULL_CONVERSION = YES;
				CLANG_WARN_OBJC_LITERAL_CONVERSION = YES;
				CLANG_WARN_OBJC_ROOT_CLASS = YES_ERROR;
				CLANG_WARN_RANGE_LOOP_ANALYSIS = YES;
				CLANG_WARN_SUSPICIOUS_MOVE = YES;
				CODE_SIGN_IDENTITY = "-";
				COPY_PHASE_STRIP = NO;
				DEAD_CODE_STRIPPING = YES;
				DEBUG_INFORMATION_FORMAT = dwarf;
				ENABLE_STRICT_OBJC_MSGSEND = YES;
				ENABLE_TESTABILITY = YES;
				ENABLE_USER_SCRIPT_SANDBOXING = NO;
				GCC_C_LANGUAGE_STANDARD = gnu11;
				GCC_DYNAMIC_NO_PIC = NO;
				GCC_NO_COMMON_BLOCKS = YES;
				GCC_OPTIMIZATION_LEVEL = 0;
				GCC_PREPROCESSOR_DEFINITIONS = (
					"DEBUG=1",
					"$(inherited)",
				);
				GCC_WARN_64_TO_32_BIT_CONVERSION = YES;
				GCC_WARN_ABOUT_RETURN_TYPE = YES_ERROR;
				GCC_WARN_UNINITIALIZED_AUTOS = YES_AGGRESSIVE;
				GCC_WARN_UNUSED_FUNCTION = YES;
				GCC_WARN_UNUSED_VARIABLE = YES;
				MACOSX_DEPLOYMENT_TARGET = 10.15;
				MTL_ENABLE_DEBUG_INFO = YES;
				ONLY_ACTIVE_ARCH = YES;
				SDKROOT = macosx;
				SWIFT_ACTIVE_COMPILATION_CONDITIONS = DEBUG;
				SWIFT_OPTIMIZATION_LEVEL = "-Onone";
			};
			name = Debug;
		};
		33CC10FA2044A3C60003C045 /* Release */ = {
			isa = XCBuildConfiguration;
			baseConfigurationReference = 7AFA3C8E1D35360C0083082E /* Release.xcconfig */;
			buildSettings = {
				ALWAYS_SEARCH_USER_PATHS = NO;
				ASSETCATALOG_COMPILER_GENERATE_SWIFT_ASSET_SYMBOL_EXTENSIONS = YES;
				CLANG_ANALYZER_NONNULL = YES;
				CLANG_ANALYZER_NUMBER_OBJECT_CONVERSION = YES_AGGRESSIVE;
				CLANG_CXX_LANGUAGE_STANDARD = "gnu++14";
				CLANG_CXX_LIBRARY = "libc++";
				CLANG_ENABLE_MODULES = YES;
				CLANG_ENABLE_OBJC_ARC = YES;
				CLANG_WARN_BLOCK_CAPTURE_AUTORELEASING = YES;
				CLANG_WARN_BOOL_CONVERSION = YES;
				CLANG_WARN_CONSTANT_CONVERSION = YES;
				CLANG_WARN_DEPRECATED_OBJC_IMPLEMENTATIONS = YES;
				CLANG_WARN_DIRECT_OBJC_ISA_USAGE = YES_ERROR;
				CLANG_WARN_DOCUMENTATION_COMMENTS = YES;
				CLANG_WARN_EMPTY_BODY = YES;
				CLANG_WARN_ENUM_CONVERSION = YES;
				CLANG_WARN_INFINITE_RECURSION = YES;
				CLANG_WARN_INT_CONVERSION = YES;
				CLANG_WARN_NON_LITERAL_NULL_CONVERSION = YES;
				CLANG_WARN_OBJC_LITERAL_CONVERSION = YES;
				CLANG_WARN_OBJC_ROOT_CLASS = YES_ERROR;
				CLANG_WARN_RANGE_LOOP_ANALYSIS = YES;
				CLANG_WARN_SUSPICIOUS_MOVE = YES;
				CODE_SIGN_IDENTITY = "-";
				COPY_PHASE_STRIP = NO;
				DEAD_CODE_STRIPPING = YES;
				DEBUG_INFORMATION_FORMAT = "dwarf-with-dsym";
				ENABLE_NS_ASSERTIONS = NO;
				ENABLE_STRICT_OBJC_MSGSEND = YES;
				ENABLE_USER_SCRIPT_SANDBOXING = NO;
				GCC_C_LANGUAGE_STANDARD = gnu11;
				GCC_NO_COMMON_BLOCKS = YES;
				GCC_WARN_64_TO_32_BIT_CONVERSION = YES;
				GCC_WARN_ABOUT_RETURN_TYPE = YES_ERROR;
				GCC_WARN_UNINITIALIZED_AUTOS = YES_AGGRESSIVE;
				GCC_WARN_UNUSED_FUNCTION = YES;
				GCC_WARN_UNUSED_VARIABLE = YES;
				MACOSX_DEPLOYMENT_TARGET = 10.15;
				MTL_ENABLE_DEBUG_INFO = NO;
				SDKROOT = macosx;
				SWIFT_COMPILATION_MODE = wholemodule;
				SWIFT_OPTIMIZATION_LEVEL = "-O";
			};
			name = Release;
		};
		33CC10FC2044A3C60003C045 /* Debug */ = {
			isa = XCBuildConfiguration;
			baseConfigurationReference = 33E5194F232828860026EE4D /* AppInfo.xcconfig */;
			buildSettings = {
				ASSETCATALOG_COMPILER_APPICON_NAME = AppIcon;
				CLANG_ENABLE_MODULES = YES;
				CODE_SIGN_ENTITLEMENTS = Runner/DebugProfile.entitlements;
				CODE_SIGN_STYLE = Automatic;
				COMBINE_HIDPI_IMAGES = YES;
				INFOPLIST_FILE = Runner/Info.plist;
				LD_RUNPATH_SEARCH_PATHS = (
					"$(inherited)",
					"@executable_path/../Frameworks",
				);
				PROVISIONING_PROFILE_SPECIFIER = "";
				SWIFT_OPTIMIZATION_LEVEL = "-Onone";
				SWIFT_VERSION = 5.0;
			};
			name = Debug;
		};
		33CC10FD2044A3C60003C045 /* Release */ = {
			isa = XCBuildConfiguration;
			baseConfigurationReference = 33E5194F232828860026EE4D /* AppInfo.xcconfig */;
			buildSettings = {
				ASSETCATALOG_COMPILER_APPICON_NAME = AppIcon;
				CLANG_ENABLE_MODULES = YES;
				CODE_SIGN_ENTITLEMENTS = Runner/Release.entitlements;
				CODE_SIGN_STYLE = Automatic;
				COMBINE_HIDPI_IMAGES = YES;
				INFOPLIST_FILE = Runner/Info.plist;
				LD_RUNPATH_SEARCH_PATHS = (
					"$(inherited)",
					"@executable_path/../Frameworks",
				);
				PROVISIONING_PROFILE_SPECIFIER = "";
				SWIFT_VERSION = 5.0;
			};
			name = Release;
		};
		33CC111C2044C6BA0003C045 /* Debug */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				CODE_SIGN_STYLE = Manual;
				PRODUCT_NAME = "$(TARGET_NAME)";
			};
			name = Debug;
		};
		33CC111D2044C6BA0003C045 /* Release */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				CODE_SIGN_STYLE = Automatic;
				PRODUCT_NAME = "$(TARGET_NAME)";
			};
			name = Release;
		};
/* End XCBuildConfiguration section */

/* Begin XCConfigurationList section */
		331C80DE294CF71000263BE5 /* Build configuration list for PBXNativeTarget "RunnerTests" */ = {
			isa = XCConfigurationList;
			buildConfigurations = (
				331C80DB294CF71000263BE5 /* Debug */,
				331C80DC294CF71000263BE5 /* Release */,
				331C80DD294CF71000263BE5 /* Profile */,
			);
			defaultConfigurationIsVisible = 0;
			defaultConfigurationName = Release;
		};
		33CC10E82044A3C60003C045 /* Build configuration list for PBXProject "Runner" */ = {
			isa = XCConfigurationList;
			buildConfigurations = (
				33CC10F92044A3C60003C045 /* Debug */,
				33CC10FA2044A3C60003C045 /* Release */,
				338D0CE9231458BD00FA5F75 /* Profile */,
			);
			defaultConfigurationIsVisible = 0;
			defaultConfigurationName = Release;
		};
		33CC10FB2044A3C60003C045 /* Build configuration list for PBXNativeTarget "Runner" */ = {
			isa = XCConfigurationList;
			buildConfigurations = (
				33CC10FC2044A3C60003C045 /* Debug */,
				33CC10FD2044A3C60003C045 /* Release */,
				338D0CEA231458BD00FA5F75 /* Profile */,
			);
			defaultConfigurationIsVisible = 0;
			defaultConfigurationName = Release;
		};
		33CC111B2044C6BA0003C045 /* Build configuration list for PBXAggregateTarget "Flutter Assemble" */ = {
			isa = XCConfigurationList;
			buildConfigurations = (
				33CC111C2044C6BA0003C045 /* Debug */,
				33CC111D2044C6BA0003C045 /* Release */,
				338D0CEB231458BD00FA5F75 /* Profile */,
			);
			defaultConfigurationIsVisible = 0;
			defaultConfigurationName = Release;
		};
/* End XCConfigurationList section */
	};
	rootObject = 33CC10E52044A3C60003C045 /* Project object */;
}
``

---

## mechanic_mobile/macos/Runner.xcodeproj/project.xcworkspace/xcshareddata/IDEWorkspaceChecks.plist

``
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>IDEDidComputeMac32BitWarning</key>
	<true/>
</dict>
</plist>
``

---

## mechanic_mobile/macos/Runner.xcodeproj/xcshareddata/xcschemes/Runner.xcscheme

``
<?xml version="1.0" encoding="UTF-8"?>
<Scheme
   LastUpgradeVersion = "1510"
   version = "1.3">
   <BuildAction
      parallelizeBuildables = "YES"
      buildImplicitDependencies = "YES">
      <BuildActionEntries>
         <BuildActionEntry
            buildForTesting = "YES"
            buildForRunning = "YES"
            buildForProfiling = "YES"
            buildForArchiving = "YES"
            buildForAnalyzing = "YES">
            <BuildableReference
               BuildableIdentifier = "primary"
               BlueprintIdentifier = "33CC10EC2044A3C60003C045"
               BuildableName = "mechanic_mobile.app"
               BlueprintName = "Runner"
               ReferencedContainer = "container:Runner.xcodeproj">
            </BuildableReference>
         </BuildActionEntry>
      </BuildActionEntries>
   </BuildAction>
   <TestAction
      buildConfiguration = "Debug"
      selectedDebuggerIdentifier = "Xcode.DebuggerFoundation.Debugger.LLDB"
      selectedLauncherIdentifier = "Xcode.DebuggerFoundation.Launcher.LLDB"
      shouldUseLaunchSchemeArgsEnv = "YES">
      <MacroExpansion>
         <BuildableReference
            BuildableIdentifier = "primary"
            BlueprintIdentifier = "33CC10EC2044A3C60003C045"
            BuildableName = "mechanic_mobile.app"
            BlueprintName = "Runner"
            ReferencedContainer = "container:Runner.xcodeproj">
         </BuildableReference>
      </MacroExpansion>
      <Testables>
         <TestableReference
            skipped = "NO"
            parallelizable = "YES">
            <BuildableReference
               BuildableIdentifier = "primary"
               BlueprintIdentifier = "331C80D4294CF70F00263BE5"
               BuildableName = "RunnerTests.xctest"
               BlueprintName = "RunnerTests"
               ReferencedContainer = "container:Runner.xcodeproj">
            </BuildableReference>
         </TestableReference>
      </Testables>
   </TestAction>
   <LaunchAction
      buildConfiguration = "Debug"
      selectedDebuggerIdentifier = "Xcode.DebuggerFoundation.Debugger.LLDB"
      selectedLauncherIdentifier = "Xcode.DebuggerFoundation.Launcher.LLDB"
      launchStyle = "0"
      useCustomWorkingDirectory = "NO"
      ignoresPersistentStateOnLaunch = "NO"
      debugDocumentVersioning = "YES"
      debugServiceExtension = "internal"
      enableGPUValidationMode = "1"
      allowLocationSimulation = "YES">
      <BuildableProductRunnable
         runnableDebuggingMode = "0">
         <BuildableReference
            BuildableIdentifier = "primary"
            BlueprintIdentifier = "33CC10EC2044A3C60003C045"
            BuildableName = "mechanic_mobile.app"
            BlueprintName = "Runner"
            ReferencedContainer = "container:Runner.xcodeproj">
         </BuildableReference>
      </BuildableProductRunnable>
   </LaunchAction>
   <ProfileAction
      buildConfiguration = "Profile"
      shouldUseLaunchSchemeArgsEnv = "YES"
      savedToolIdentifier = ""
      useCustomWorkingDirectory = "NO"
      debugDocumentVersioning = "YES">
      <BuildableProductRunnable
         runnableDebuggingMode = "0">
         <BuildableReference
            BuildableIdentifier = "primary"
            BlueprintIdentifier = "33CC10EC2044A3C60003C045"
            BuildableName = "mechanic_mobile.app"
            BlueprintName = "Runner"
            ReferencedContainer = "container:Runner.xcodeproj">
         </BuildableReference>
      </BuildableProductRunnable>
   </ProfileAction>
   <AnalyzeAction
      buildConfiguration = "Debug">
   </AnalyzeAction>
   <ArchiveAction
      buildConfiguration = "Release"
      revealArchiveInOrganizer = "YES">
   </ArchiveAction>
</Scheme>
``

---

## mechanic_mobile/macos/Runner.xcworkspace/contents.xcworkspacedata

``
<?xml version="1.0" encoding="UTF-8"?>
<Workspace
   version = "1.0">
   <FileRef
      location = "group:Runner.xcodeproj">
   </FileRef>
</Workspace>
``

---

## mechanic_mobile/macos/Runner.xcworkspace/xcshareddata/IDEWorkspaceChecks.plist

``
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>IDEDidComputeMac32BitWarning</key>
	<true/>
</dict>
</plist>
``

---

## mechanic_mobile/macos/Runner/AppDelegate.swift

``swift
import Cocoa
import FlutterMacOS

@main
class AppDelegate: FlutterAppDelegate {
  override func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
    return true
  }

  override func applicationSupportsSecureRestorableState(_ app: NSApplication) -> Bool {
    return true
  }
}
``

---

## mechanic_mobile/macos/Runner/Assets.xcassets/AppIcon.appiconset/Contents.json

``json
{
  "images" : [
    {
      "size" : "16x16",
      "idiom" : "mac",
      "filename" : "app_icon_16.png",
      "scale" : "1x"
    },
    {
      "size" : "16x16",
      "idiom" : "mac",
      "filename" : "app_icon_32.png",
      "scale" : "2x"
    },
    {
      "size" : "32x32",
      "idiom" : "mac",
      "filename" : "app_icon_32.png",
      "scale" : "1x"
    },
    {
      "size" : "32x32",
      "idiom" : "mac",
      "filename" : "app_icon_64.png",
      "scale" : "2x"
    },
    {
      "size" : "128x128",
      "idiom" : "mac",
      "filename" : "app_icon_128.png",
      "scale" : "1x"
    },
    {
      "size" : "128x128",
      "idiom" : "mac",
      "filename" : "app_icon_256.png",
      "scale" : "2x"
    },
    {
      "size" : "256x256",
      "idiom" : "mac",
      "filename" : "app_icon_256.png",
      "scale" : "1x"
    },
    {
      "size" : "256x256",
      "idiom" : "mac",
      "filename" : "app_icon_512.png",
      "scale" : "2x"
    },
    {
      "size" : "512x512",
      "idiom" : "mac",
      "filename" : "app_icon_512.png",
      "scale" : "1x"
    },
    {
      "size" : "512x512",
      "idiom" : "mac",
      "filename" : "app_icon_1024.png",
      "scale" : "2x"
    }
  ],
  "info" : {
    "version" : 1,
    "author" : "xcode"
  }
}
``

---

## mechanic_mobile/macos/Runner/Base.lproj/MainMenu.xib

``
<?xml version="1.0" encoding="UTF-8"?>
<document type="com.apple.InterfaceBuilder3.Cocoa.XIB" version="3.0" toolsVersion="14490.70" targetRuntime="MacOSX.Cocoa" propertyAccessControl="none" useAutolayout="YES" customObjectInstantitationMethod="direct">
    <dependencies>
        <deployment identifier="macosx"/>
        <plugIn identifier="com.apple.InterfaceBuilder.CocoaPlugin" version="14490.70"/>
        <capability name="documents saved in the Xcode 8 format" minToolsVersion="8.0"/>
    </dependencies>
    <objects>
        <customObject id="-2" userLabel="File's Owner" customClass="NSApplication">
            <connections>
                <outlet property="delegate" destination="Voe-Tx-rLC" id="GzC-gU-4Uq"/>
            </connections>
        </customObject>
        <customObject id="-1" userLabel="First Responder" customClass="FirstResponder"/>
        <customObject id="-3" userLabel="Application" customClass="NSObject"/>
        <customObject id="Voe-Tx-rLC" customClass="AppDelegate" customModule="Runner" customModuleProvider="target">
            <connections>
                <outlet property="applicationMenu" destination="uQy-DD-JDr" id="XBo-yE-nKs"/>
                <outlet property="mainFlutterWindow" destination="QvC-M9-y7g" id="gIp-Ho-8D9"/>
            </connections>
        </customObject>
        <customObject id="YLy-65-1bz" customClass="NSFontManager"/>
        <menu title="Main Menu" systemMenu="main" id="AYu-sK-qS6">
            <items>
                <menuItem title="APP_NAME" id="1Xt-HY-uBw">
                    <modifierMask key="keyEquivalentModifierMask"/>
                    <menu key="submenu" title="APP_NAME" systemMenu="apple" id="uQy-DD-JDr">
                        <items>
                            <menuItem title="About APP_NAME" id="5kV-Vb-QxS">
                                <modifierMask key="keyEquivalentModifierMask"/>
                                <connections>
                                    <action selector="orderFrontStandardAboutPanel:" target="-1" id="Exp-CZ-Vem"/>
                                </connections>
                            </menuItem>
                            <menuItem isSeparatorItem="YES" id="VOq-y0-SEH"/>
                            <menuItem title="Preferences…" keyEquivalent="," id="BOF-NM-1cW"/>
                            <menuItem isSeparatorItem="YES" id="wFC-TO-SCJ"/>
                            <menuItem title="Services" id="NMo-om-nkz">
                                <modifierMask key="keyEquivalentModifierMask"/>
                                <menu key="submenu" title="Services" systemMenu="services" id="hz9-B4-Xy5"/>
                            </menuItem>
                            <menuItem isSeparatorItem="YES" id="4je-JR-u6R"/>
                            <menuItem title="Hide APP_NAME" keyEquivalent="h" id="Olw-nP-bQN">
                                <connections>
                                    <action selector="hide:" target="-1" id="PnN-Uc-m68"/>
                                </connections>
                            </menuItem>
                            <menuItem title="Hide Others" keyEquivalent="h" id="Vdr-fp-XzO">
                                <modifierMask key="keyEquivalentModifierMask" option="YES" command="YES"/>
                                <connections>
                                    <action selector="hideOtherApplications:" target="-1" id="VT4-aY-XCT"/>
                                </connections>
                            </menuItem>
                            <menuItem title="Show All" id="Kd2-mp-pUS">
                                <modifierMask key="keyEquivalentModifierMask"/>
                                <connections>
                                    <action selector="unhideAllApplications:" target="-1" id="Dhg-Le-xox"/>
                                </connections>
                            </menuItem>
                            <menuItem isSeparatorItem="YES" id="kCx-OE-vgT"/>
                            <menuItem title="Quit APP_NAME" keyEquivalent="q" id="4sb-4s-VLi">
                                <connections>
                                    <action selector="terminate:" target="-1" id="Te7-pn-YzF"/>
                                </connections>
                            </menuItem>
                        </items>
                    </menu>
                </menuItem>
                <menuItem title="Edit" id="5QF-Oa-p0T">
                    <modifierMask key="keyEquivalentModifierMask"/>
                    <menu key="submenu" title="Edit" id="W48-6f-4Dl">
                        <items>
                            <menuItem title="Undo" keyEquivalent="z" id="dRJ-4n-Yzg">
                                <connections>
                                    <action selector="undo:" target="-1" id="M6e-cu-g7V"/>
                                </connections>
                            </menuItem>
                            <menuItem title="Redo" keyEquivalent="Z" id="6dh-zS-Vam">
                                <connections>
                                    <action selector="redo:" target="-1" id="oIA-Rs-6OD"/>
                                </connections>
                            </menuItem>
                            <menuItem isSeparatorItem="YES" id="WRV-NI-Exz"/>
                            <menuItem title="Cut" keyEquivalent="x" id="uRl-iY-unG">
                                <connections>
                                    <action selector="cut:" target="-1" id="YJe-68-I9s"/>
                                </connections>
                            </menuItem>
                            <menuItem title="Copy" keyEquivalent="c" id="x3v-GG-iWU">
                                <connections>
                                    <action selector="copy:" target="-1" id="G1f-GL-Joy"/>
                                </connections>
                            </menuItem>
                            <menuItem title="Paste" keyEquivalent="v" id="gVA-U4-sdL">
                                <connections>
                                    <action selector="paste:" target="-1" id="UvS-8e-Qdg"/>
                                </connections>
                            </menuItem>
                            <menuItem title="Paste and Match Style" keyEquivalent="V" id="WeT-3V-zwk">
                                <modifierMask key="keyEquivalentModifierMask" option="YES" command="YES"/>
                                <connections>
                                    <action selector="pasteAsPlainText:" target="-1" id="cEh-KX-wJQ"/>
                                </connections>
                            </menuItem>
                            <menuItem title="Delete" id="pa3-QI-u2k">
                                <modifierMask key="keyEquivalentModifierMask"/>
                                <connections>
                                    <action selector="delete:" target="-1" id="0Mk-Ml-PaM"/>
                                </connections>
                            </menuItem>
                            <menuItem title="Select All" keyEquivalent="a" id="Ruw-6m-B2m">
                                <connections>
                                    <action selector="selectAll:" target="-1" id="VNm-Mi-diN"/>
                                </connections>
                            </menuItem>
                            <menuItem isSeparatorItem="YES" id="uyl-h8-XO2"/>
                            <menuItem title="Find" id="4EN-yA-p0u">
                                <modifierMask key="keyEquivalentModifierMask"/>
                                <menu key="submenu" title="Find" id="1b7-l0-nxx">
                                    <items>
                                        <menuItem title="Find…" tag="1" keyEquivalent="f" id="Xz5-n4-O0W">
                                            <connections>
                                                <action selector="performFindPanelAction:" target="-1" id="cD7-Qs-BN4"/>
                                            </connections>
                                        </menuItem>
                                        <menuItem title="Find and Replace…" tag="12" keyEquivalent="f" id="YEy-JH-Tfz">
                                            <modifierMask key="keyEquivalentModifierMask" option="YES" command="YES"/>
                                            <connections>
                                                <action selector="performFindPanelAction:" target="-1" id="WD3-Gg-5AJ"/>
                                            </connections>
                                        </menuItem>
                                        <menuItem title="Find Next" tag="2" keyEquivalent="g" id="q09-fT-Sye">
                                            <connections>
                                                <action selector="performFindPanelAction:" target="-1" id="NDo-RZ-v9R"/>
                                            </connections>
                                        </menuItem>
                                        <menuItem title="Find Previous" tag="3" keyEquivalent="G" id="OwM-mh-QMV">
                                            <connections>
                                                <action selector="performFindPanelAction:" target="-1" id="HOh-sY-3ay"/>
                                            </connections>
                                        </menuItem>
                                        <menuItem title="Use Selection for Find" tag="7" keyEquivalent="e" id="buJ-ug-pKt">
                                            <connections>
                                                <action selector="performFindPanelAction:" target="-1" id="U76-nv-p5D"/>
                                            </connections>
                                        </menuItem>
                                        <menuItem title="Jump to Selection" keyEquivalent="j" id="S0p-oC-mLd">
                                            <connections>
                                                <action selector="centerSelectionInVisibleArea:" target="-1" id="IOG-6D-g5B"/>
                                            </connections>
                                        </menuItem>
                                    </items>
                                </menu>
                            </menuItem>
                            <menuItem title="Spelling and Grammar" id="Dv1-io-Yv7">
                                <modifierMask key="keyEquivalentModifierMask"/>
                                <menu key="submenu" title="Spelling" id="3IN-sU-3Bg">
                                    <items>
                                        <menuItem title="Show Spelling and Grammar" keyEquivalent=":" id="HFo-cy-zxI">
                                            <connections>
                                                <action selector="showGuessPanel:" target="-1" id="vFj-Ks-hy3"/>
                                            </connections>
                                        </menuItem>
                                        <menuItem title="Check Document Now" keyEquivalent=";" id="hz2-CU-CR7">
                                            <connections>
                                                <action selector="checkSpelling:" target="-1" id="fz7-VC-reM"/>
                                            </connections>
                                        </menuItem>
                                        <menuItem isSeparatorItem="YES" id="bNw-od-mp5"/>
                                        <menuItem title="Check Spelling While Typing" id="rbD-Rh-wIN">
                                            <modifierMask key="keyEquivalentModifierMask"/>
                                            <connections>
                                                <action selector="toggleContinuousSpellChecking:" target="-1" id="7w6-Qz-0kB"/>
                                            </connections>
                                        </menuItem>
                                        <menuItem title="Check Grammar With Spelling" id="mK6-2p-4JG">
                                            <modifierMask key="keyEquivalentModifierMask"/>
                                            <connections>
                                                <action selector="toggleGrammarChecking:" target="-1" id="muD-Qn-j4w"/>
                                            </connections>
                                        </menuItem>
                                        <menuItem title="Correct Spelling Automatically" id="78Y-hA-62v">
                                            <modifierMask key="keyEquivalentModifierMask"/>
                                            <connections>
                                                <action selector="toggleAutomaticSpellingCorrection:" target="-1" id="2lM-Qi-WAP"/>
                                            </connections>
                                        </menuItem>
                                    </items>
                                </menu>
                            </menuItem>
                            <menuItem title="Substitutions" id="9ic-FL-obx">
                                <modifierMask key="keyEquivalentModifierMask"/>
                                <menu key="submenu" title="Substitutions" id="FeM-D8-WVr">
                                    <items>
                                        <menuItem title="Show Substitutions" id="z6F-FW-3nz">
                                            <modifierMask key="keyEquivalentModifierMask"/>
                                            <connections>
                                                <action selector="orderFrontSubstitutionsPanel:" target="-1" id="oku-mr-iSq"/>
                                            </connections>
                                        </menuItem>
                                        <menuItem isSeparatorItem="YES" id="gPx-C9-uUO"/>
                                        <menuItem title="Smart Copy/Paste" id="9yt-4B-nSM">
                                            <modifierMask key="keyEquivalentModifierMask"/>
                                            <connections>
                                                <action selector="toggleSmartInsertDelete:" target="-1" id="3IJ-Se-DZD"/>
                                            </connections>
                                        </menuItem>
                                        <menuItem title="Smart Quotes" id="hQb-2v-fYv">
                                            <modifierMask key="keyEquivalentModifierMask"/>
                                            <connections>
                                                <action selector="toggleAutomaticQuoteSubstitution:" target="-1" id="ptq-xd-QOA"/>
                                            </connections>
                                        </menuItem>
                                        <menuItem title="Smart Dashes" id="rgM-f4-ycn">
                                            <modifierMask key="keyEquivalentModifierMask"/>
                                            <connections>
                                                <action selector="toggleAutomaticDashSubstitution:" target="-1" id="oCt-pO-9gS"/>
                                            </connections>
                                        </menuItem>
                                        <menuItem title="Smart Links" id="cwL-P1-jid">
                                            <modifierMask key="keyEquivalentModifierMask"/>
                                            <connections>
                                                <action selector="toggleAutomaticLinkDetection:" target="-1" id="Gip-E3-Fov"/>
                                            </connections>
                                        </menuItem>
                                        <menuItem title="Data Detectors" id="tRr-pd-1PS">
                                            <modifierMask key="keyEquivalentModifierMask"/>
                                            <connections>
                                                <action selector="toggleAutomaticDataDetection:" target="-1" id="R1I-Nq-Kbl"/>
                                            </connections>
                                        </menuItem>
                                        <menuItem title="Text Replacement" id="HFQ-gK-NFA">
                                            <modifierMask key="keyEquivalentModifierMask"/>
                                            <connections>
                                                <action selector="toggleAutomaticTextReplacement:" target="-1" id="DvP-Fe-Py6"/>
                                            </connections>
                                        </menuItem>
                                    </items>
                                </menu>
                            </menuItem>
                            <menuItem title="Transformations" id="2oI-Rn-ZJC">
                                <modifierMask key="keyEquivalentModifierMask"/>
                                <menu key="submenu" title="Transformations" id="c8a-y6-VQd">
                                    <items>
                                        <menuItem title="Make Upper Case" id="vmV-6d-7jI">
                                            <modifierMask key="keyEquivalentModifierMask"/>
                                            <connections>
                                                <action selector="uppercaseWord:" target="-1" id="sPh-Tk-edu"/>
                                            </connections>
                                        </menuItem>
                                        <menuItem title="Make Lower Case" id="d9M-CD-aMd">
                                            <modifierMask key="keyEquivalentModifierMask"/>
                                            <connections>
                                                <action selector="lowercaseWord:" target="-1" id="iUZ-b5-hil"/>
                                            </connections>
                                        </menuItem>
                                        <menuItem title="Capitalize" id="UEZ-Bs-lqG">
                                            <modifierMask key="keyEquivalentModifierMask"/>
                                            <connections>
                                                <action selector="capitalizeWord:" target="-1" id="26H-TL-nsh"/>
                                            </connections>
                                        </menuItem>
                                    </items>
                                </menu>
                            </menuItem>
                            <menuItem title="Speech" id="xrE-MZ-jX0">
                                <modifierMask key="keyEquivalentModifierMask"/>
                                <menu key="submenu" title="Speech" id="3rS-ZA-NoH">
                                    <items>
                                        <menuItem title="Start Speaking" id="Ynk-f8-cLZ">
                                            <modifierMask key="keyEquivalentModifierMask"/>
                                            <connections>
                                                <action selector="startSpeaking:" target="-1" id="654-Ng-kyl"/>
                                            </connections>
                                        </menuItem>
                                        <menuItem title="Stop Speaking" id="Oyz-dy-DGm">
                                            <modifierMask key="keyEquivalentModifierMask"/>
                                            <connections>
                                                <action selector="stopSpeaking:" target="-1" id="dX8-6p-jy9"/>
                                            </connections>
                                        </menuItem>
                                    </items>
                                </menu>
                            </menuItem>
                        </items>
                    </menu>
                </menuItem>
                <menuItem title="View" id="H8h-7b-M4v">
                    <modifierMask key="keyEquivalentModifierMask"/>
                    <menu key="submenu" title="View" id="HyV-fh-RgO">
                        <items>
                            <menuItem title="Enter Full Screen" keyEquivalent="f" id="4J7-dP-txa">
                                <modifierMask key="keyEquivalentModifierMask" control="YES" command="YES"/>
                                <connections>
                                    <action selector="toggleFullScreen:" target="-1" id="dU3-MA-1Rq"/>
                                </connections>
                            </menuItem>
                        </items>
                    </menu>
                </menuItem>
                <menuItem title="Window" id="aUF-d1-5bR">
                    <modifierMask key="keyEquivalentModifierMask"/>
                    <menu key="submenu" title="Window" systemMenu="window" id="Td7-aD-5lo">
                        <items>
                            <menuItem title="Minimize" keyEquivalent="m" id="OY7-WF-poV">
                                <connections>
                                    <action selector="performMiniaturize:" target="-1" id="VwT-WD-YPe"/>
                                </connections>
                            </menuItem>
                            <menuItem title="Zoom" id="R4o-n2-Eq4">
                                <modifierMask key="keyEquivalentModifierMask"/>
                                <connections>
                                    <action selector="performZoom:" target="-1" id="DIl-cC-cCs"/>
                                </connections>
                            </menuItem>
                            <menuItem isSeparatorItem="YES" id="eu3-7i-yIM"/>
                            <menuItem title="Bring All to Front" id="LE2-aR-0XJ">
                                <modifierMask key="keyEquivalentModifierMask"/>
                                <connections>
                                    <action selector="arrangeInFront:" target="-1" id="DRN-fu-gQh"/>
                                </connections>
                            </menuItem>
                        </items>
                    </menu>
                </menuItem>
                <menuItem title="Help" id="EPT-qC-fAb">
                    <modifierMask key="keyEquivalentModifierMask"/>
                    <menu key="submenu" title="Help" systemMenu="help" id="rJ0-wn-3NY"/>
                </menuItem>
            </items>
            <point key="canvasLocation" x="142" y="-258"/>
        </menu>
        <window title="APP_NAME" allowsToolTipsWhenApplicationIsInactive="NO" autorecalculatesKeyViewLoop="NO" releasedWhenClosed="NO" animationBehavior="default" id="QvC-M9-y7g" customClass="MainFlutterWindow" customModule="Runner" customModuleProvider="target">
            <windowStyleMask key="styleMask" titled="YES" closable="YES" miniaturizable="YES" resizable="YES"/>
            <rect key="contentRect" x="335" y="390" width="800" height="600"/>
            <rect key="screenRect" x="0.0" y="0.0" width="2560" height="1577"/>
            <view key="contentView" wantsLayer="YES" id="EiT-Mj-1SZ">
                <rect key="frame" x="0.0" y="0.0" width="800" height="600"/>
                <autoresizingMask key="autoresizingMask"/>
            </view>
        </window>
    </objects>
</document>
``

---

## mechanic_mobile/macos/Runner/Configs/AppInfo.xcconfig

``
// Application-level settings for the Runner target.
//
// This may be replaced with something auto-generated from metadata (e.g., pubspec.yaml) in the
// future. If not, the values below would default to using the project name when this becomes a
// 'flutter create' template.

// The application's name. By default this is also the title of the Flutter window.
PRODUCT_NAME = mechanic_mobile

// The application's bundle identifier
PRODUCT_BUNDLE_IDENTIFIER = com.example.mechanicMobile

// The copyright displayed in application information
PRODUCT_COPYRIGHT = Copyright © 2026 com.example. All rights reserved.
``

---

## mechanic_mobile/macos/Runner/Configs/Debug.xcconfig

``
#include "../../Flutter/Flutter-Debug.xcconfig"
#include "Warnings.xcconfig"
``

---

## mechanic_mobile/macos/Runner/Configs/Release.xcconfig

``
#include "../../Flutter/Flutter-Release.xcconfig"
#include "Warnings.xcconfig"
``

---

## mechanic_mobile/macos/Runner/Configs/Warnings.xcconfig

``
WARNING_CFLAGS = -Wall -Wconditional-uninitialized -Wnullable-to-nonnull-conversion -Wmissing-method-return-type -Woverlength-strings
GCC_WARN_UNDECLARED_SELECTOR = YES
CLANG_UNDEFINED_BEHAVIOR_SANITIZER_NULLABILITY = YES
CLANG_WARN_UNGUARDED_AVAILABILITY = YES_AGGRESSIVE
CLANG_WARN__DUPLICATE_METHOD_MATCH = YES
CLANG_WARN_PRAGMA_PACK = YES
CLANG_WARN_STRICT_PROTOTYPES = YES
CLANG_WARN_COMMA = YES
GCC_WARN_STRICT_SELECTOR_MATCH = YES
CLANG_WARN_OBJC_REPEATED_USE_OF_WEAK = YES
CLANG_WARN_OBJC_IMPLICIT_RETAIN_SELF = YES
GCC_WARN_SHADOW = YES
CLANG_WARN_UNREACHABLE_CODE = YES
``

---

## mechanic_mobile/macos/Runner/DebugProfile.entitlements

``
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>com.apple.security.app-sandbox</key>
	<true/>
	<key>com.apple.security.cs.allow-jit</key>
	<true/>
	<key>com.apple.security.network.server</key>
	<true/>
</dict>
</plist>
``

---

## mechanic_mobile/macos/Runner/Info.plist

``
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>CFBundleDevelopmentRegion</key>
	<string>$(DEVELOPMENT_LANGUAGE)</string>
	<key>CFBundleExecutable</key>
	<string>$(EXECUTABLE_NAME)</string>
	<key>CFBundleIconFile</key>
	<string></string>
	<key>CFBundleIdentifier</key>
	<string>$(PRODUCT_BUNDLE_IDENTIFIER)</string>
	<key>CFBundleInfoDictionaryVersion</key>
	<string>6.0</string>
	<key>CFBundleName</key>
	<string>$(PRODUCT_NAME)</string>
	<key>CFBundlePackageType</key>
	<string>APPL</string>
	<key>CFBundleShortVersionString</key>
	<string>$(FLUTTER_BUILD_NAME)</string>
	<key>CFBundleVersion</key>
	<string>$(FLUTTER_BUILD_NUMBER)</string>
	<key>LSMinimumSystemVersion</key>
	<string>$(MACOSX_DEPLOYMENT_TARGET)</string>
	<key>NSHumanReadableCopyright</key>
	<string>$(PRODUCT_COPYRIGHT)</string>
	<key>NSMainNibFile</key>
	<string>MainMenu</string>
	<key>NSPrincipalClass</key>
	<string>NSApplication</string>
	<!-- Permisos para speech_to_text -->
	<key>NSSpeechRecognitionUsageDescription</key>
	<string>Necesitamos reconocer tu voz para llenar el reporte técnico automáticamente.</string>
	<key>NSMicrophoneUsageDescription</key>
	<string>El micrófono se usará para capturar el diagnóstico del mecánico.</string>

	<!-- Permisos para image_picker -->
	<key>NSPhotoLibraryUsageDescription</key>
	<string>Necesitamos acceso a la galería para que puedas subir fotos del vehículo.</string>
	<key>NSCameraUsageDescription</key>
	<string>Necesitamos usar la cámara para tomar fotos de las piezas dañadas.</string>
	<key>NSMicrophoneUsageDescription</key>
	<string>Se requiere el micrófono si vas a grabar videos del motor.</string>
</dict>
</plist>
``

---

## mechanic_mobile/macos/Runner/MainFlutterWindow.swift

``swift
import Cocoa
import FlutterMacOS

class MainFlutterWindow: NSWindow {
  override func awakeFromNib() {
    let flutterViewController = FlutterViewController()
    let windowFrame = self.frame
    self.contentViewController = flutterViewController
    self.setFrame(windowFrame, display: true)

    RegisterGeneratedPlugins(registry: flutterViewController)

    super.awakeFromNib()
  }
}
``

---

## mechanic_mobile/macos/Runner/Release.entitlements

``
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>com.apple.security.app-sandbox</key>
	<true/>
</dict>
</plist>
``

---

## mechanic_mobile/macos/RunnerTests/RunnerTests.swift

``swift
import Cocoa
import FlutterMacOS
import XCTest

class RunnerTests: XCTestCase {

  func testExample() {
    // If you add code to the Runner application, consider adding tests here.
    // See https://developer.apple.com/documentation/xctest for more information about using XCTest.
  }

}
``

---

## mechanic_mobile/nginx.conf

``
# Solo para flutter 
server {
    listen 80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|wasm)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}

# Sirve flutter y actua como reverse proxy
# server {
#     listen 80;
#     server_name _;

#     root /usr/share/nginx/html;
#     index index.html;

#     location /api/ {
#         proxy_pass http://serv-mech-api:8000;
#         proxy_http_version 1.1;
#         proxy_set_header Host $host;
#         proxy_set_header X-Real-IP $remote_addr;
#         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
#         proxy_set_header X-Forwarded-Proto $scheme;
#     }

#     location / {
#         try_files $uri $uri/ /index.html;
#     }

#     location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|wasm)$ {
#         expires 1y;
#         add_header Cache-Control "public, immutable";
#     }
# }

# server {
#     listen 80;
#     server_name _;

#     root /usr/share/nginx/html;
#     index index.html;

#     # nginx externo pasa /flutter/xxx → este nginx recibe /flutter/xxx
#     location /flutter/ {
#         try_files $uri $uri/ /flutter/index.html;
#     }

#     # Algunos assets Flutter los pide sin prefijo
#     location / {
#         try_files $uri $uri/ /flutter/index.html;
#     }
# }
``

---

## mechanic_mobile/PENDING.md

``markdown
- implementar el add evidences para imagenes y audio
- implementar las notificaciones push en el cliente

```json
implementa esto más para el admin platform
GET {{baseUrl}}/api/operations/platform/incidents/:incident_id/history
// response:
{
    "success": true,
    "message": "Platform operation history loaded successfully.",
    "data": [
        {
            "id": "417cab64-d81d-42f3-9e34-af415f135174",
            "incident_id": "d6def64c-dc6b-46fe-a765-3872e777bf33",
            "provider_id": "79a6ba07-b0cd-44d9-8480-4ad533a768e9",
            "technician_id": "3652474a-dd25-4db2-a955-534c3664e451",
            "actor_user_id": "9a05fed4-b127-4f42-b1c9-e85616b8e9ae",
            "event_type": "DISPATCHED",
            "from_status": "ASSIGNED",
            "to_status": "EN_ROUTE",
            "note": "Se despacha técnico disponible hacia la ubicación del cliente.",
            "payload_json": {
                "dispatch_mode": "TECHNICIAN",
                "assigned_technician_id": "3652474a-dd25-4db2-a955-534c3664e451"
            },
            "created_at": "2026-04-26T16:50:59.165248Z",
            "actor_user": {
                "id": "9a05fed4-b127-4f42-b1c9-e85616b8e9ae",
                "email": "usuario@gmail.com",
                "first_name": "nombre",
                "last_name": "apellido",
                "full_name": "nombre apellido"
            },
            "technician": {
                "id": "3652474a-dd25-4db2-a955-534c3664e451",
                "provider_id": "79a6ba07-b0cd-44d9-8480-4ad533a768e9",
                "first_name": "Carlos",
                "last_name": "Mecánico",
                "full_name": "Carlos Mecánico",
                "phone_number": "70000024",
                "specialty": "Auxilio eléctrico y llantas",
                "is_active": true,
                "is_available": true
            }
        },
        {
            "id": "fef580b9-e278-45e2-8654-2285f71634e6",
            "incident_id": "d6def64c-dc6b-46fe-a765-3872e777bf33",
            "provider_id": "79a6ba07-b0cd-44d9-8480-4ad533a768e9",
            "technician_id": "3652474a-dd25-4db2-a955-534c3664e451",
            "actor_user_id": "9a05fed4-b127-4f42-b1c9-e85616b8e9ae",
            "event_type": "ARRIVED_ON_SITE",
            "from_status": "EN_ROUTE",
            "to_status": "ON_SITE",
            "note": null,
            "payload_json": null,
            "created_at": "2026-04-26T16:51:41.610263Z",
            "actor_user": {
                "id": "9a05fed4-b127-4f42-b1c9-e85616b8e9ae",
                "email": "usuario@gmail.com",
                "first_name": "nombre",
                "last_name": "apellido",
                "full_name": "nombre apellido"
            },
            "technician": {
                "id": "3652474a-dd25-4db2-a955-534c3664e451",
                "provider_id": "79a6ba07-b0cd-44d9-8480-4ad533a768e9",
                "first_name": "Carlos",
                "last_name": "Mecánico",
                "full_name": "Carlos Mecánico",
                "phone_number": "70000024",
                "specialty": "Auxilio eléctrico y llantas",
                "is_active": true,
                "is_available": true
            }
        },
        {
            "id": "98c93d08-d7f2-4864-b669-67f4b562b992",
            "incident_id": "d6def64c-dc6b-46fe-a765-3872e777bf33",
            "provider_id": "79a6ba07-b0cd-44d9-8480-4ad533a768e9",
            "technician_id": "3652474a-dd25-4db2-a955-534c3664e451",
            "actor_user_id": "9a05fed4-b127-4f42-b1c9-e85616b8e9ae",
            "event_type": "SERVICE_STARTED",
            "from_status": "ON_SITE",
            "to_status": "IN_PROGRESS",
            "note": "Se inicia revision de vehiculo",
            "payload_json": null,
            "created_at": "2026-04-26T16:52:47.981537Z",
            "actor_user": {
                "id": "9a05fed4-b127-4f42-b1c9-e85616b8e9ae",
                "email": "usuario@gmail.com",
                "first_name": "nombre",
                "last_name": "apellido",
                "full_name": "nombre apellido"
            },
            "technician": {
                "id": "3652474a-dd25-4db2-a955-534c3664e451",
                "provider_id": "79a6ba07-b0cd-44d9-8480-4ad533a768e9",
                "first_name": "Carlos",
                "last_name": "Mecánico",
                "full_name": "Carlos Mecánico",
                "phone_number": "70000024",
                "specialty": "Auxilio eléctrico y llantas",
                "is_active": true,
                "is_available": true
            }
        },
        {
            "id": "2524b70b-f585-4b0f-a379-8dfa5f97d5bf",
            "incident_id": "d6def64c-dc6b-46fe-a765-3872e777bf33",
            "provider_id": "79a6ba07-b0cd-44d9-8480-4ad533a768e9",
            "technician_id": "3652474a-dd25-4db2-a955-534c3664e451",
            "actor_user_id": "9a05fed4-b127-4f42-b1c9-e85616b8e9ae",
            "event_type": "SERVICE_COMPLETED",
            "from_status": "IN_PROGRESS",
            "to_status": "COMPLETED",
            "note": "Servicio finalizado correctamente.",
            "payload_json": {
                "completion_summary": "Se realizó auxilio de batería y el vehículo encendió."
            },
            "created_at": "2026-04-26T16:54:39.849024Z",
            "actor_user": {
                "id": "9a05fed4-b127-4f42-b1c9-e85616b8e9ae",
                "email": "usuario@gmail.com",
                "first_name": "nombre",
                "last_name": "apellido",
                "full_name": "nombre apellido"
            },
            "technician": {
                "id": "3652474a-dd25-4db2-a955-534c3664e451",
                "provider_id": "79a6ba07-b0cd-44d9-8480-4ad533a768e9",
                "first_name": "Carlos",
                "last_name": "Mecánico",
                "full_name": "Carlos Mecánico",
                "phone_number": "70000024",
                "specialty": "Auxilio eléctrico y llantas",
                "is_active": true,
                "is_available": true
            }
        }
    ],
    "meta": {
        "count": 4
    }
}
```
``

---

## mechanic_mobile/pubspec.lock

``
# Generated by pub
# See https://dart.dev/tools/pub/glossary#lockfile
packages:
  _flutterfire_internals:
    dependency: transitive
    description:
      name: _flutterfire_internals
      sha256: bda3b7b55958bfd867addc40d067b4b11f7b8846d57671f5b5a6e7f9a56fe3ad
      url: "https://pub.dev"
    source: hosted
    version: "1.3.69"
  archive:
    dependency: transitive
    description:
      name: archive
      sha256: a96e8b390886ee8abb49b7bd3ac8df6f451c621619f52a26e815fdcf568959ff
      url: "https://pub.dev"
    source: hosted
    version: "4.0.9"
  args:
    dependency: transitive
    description:
      name: args
      sha256: d0481093c50b1da8910eb0bb301626d4d8eb7284aa739614d2b394ee09e3ea04
      url: "https://pub.dev"
    source: hosted
    version: "2.7.0"
  async:
    dependency: transitive
    description:
      name: async
      sha256: e2eb0491ba5ddb6177742d2da23904574082139b07c1e33b8503b9f46f3e1a37
      url: "https://pub.dev"
    source: hosted
    version: "2.13.1"
  boolean_selector:
    dependency: transitive
    description:
      name: boolean_selector
      sha256: "8aab1771e1243a5063b8b0ff68042d67334e3feab9e95b9490f9a6ebf73b42ea"
      url: "https://pub.dev"
    source: hosted
    version: "2.1.2"
  characters:
    dependency: transitive
    description:
      name: characters
      sha256: faf38497bda5ead2a8c7615f4f7939df04333478bf32e4173fcb06d428b5716b
      url: "https://pub.dev"
    source: hosted
    version: "1.4.1"
  checked_yaml:
    dependency: transitive
    description:
      name: checked_yaml
      sha256: "959525d3162f249993882720d52b7e0c833978df229be20702b33d48d91de70f"
      url: "https://pub.dev"
    source: hosted
    version: "2.0.4"
  cli_util:
    dependency: transitive
    description:
      name: cli_util
      sha256: ff6785f7e9e3c38ac98b2fb035701789de90154024a75b6cb926445e83197d1c
      url: "https://pub.dev"
    source: hosted
    version: "0.4.2"
  clock:
    dependency: transitive
    description:
      name: clock
      sha256: fddb70d9b5277016c77a80201021d40a2247104d9f4aa7bab7157b7e3f05b84b
      url: "https://pub.dev"
    source: hosted
    version: "1.1.2"
  code_assets:
    dependency: transitive
    description:
      name: code_assets
      sha256: "83ccdaa064c980b5596c35dd64a8d3ecc68620174ab9b90b6343b753aa721687"
      url: "https://pub.dev"
    source: hosted
    version: "1.0.0"
  collection:
    dependency: transitive
    description:
      name: collection
      sha256: "2f5709ae4d3d59dd8f7cd309b4e023046b57d8a6c82130785d2b0e5868084e76"
      url: "https://pub.dev"
    source: hosted
    version: "1.19.1"
  cross_file:
    dependency: transitive
    description:
      name: cross_file
      sha256: "28bb3ae56f117b5aec029d702a90f57d285cd975c3c5c281eaca38dbc47c5937"
      url: "https://pub.dev"
    source: hosted
    version: "0.3.5+2"
  crypto:
    dependency: transitive
    description:
      name: crypto
      sha256: c8ea0233063ba03258fbcf2ca4d6dadfefe14f02fab57702265467a19f27fadf
      url: "https://pub.dev"
    source: hosted
    version: "3.0.7"
  cupertino_icons:
    dependency: "direct main"
    description:
      name: cupertino_icons
      sha256: "41e005c33bd814be4d3096aff55b1908d419fde52ca656c8c47719ec745873cd"
      url: "https://pub.dev"
    source: hosted
    version: "1.0.9"
  dart_earcut:
    dependency: transitive
    description:
      name: dart_earcut
      sha256: e485001bfc05dcbc437d7bfb666316182e3522d4c3f9668048e004d0eb2ce43b
      url: "https://pub.dev"
    source: hosted
    version: "1.2.0"
  dart_polylabel2:
    dependency: transitive
    description:
      name: dart_polylabel2
      sha256: "7eeab15ce72894e4bdba6a8765712231fc81be0bd95247de4ad9966abc57adc6"
      url: "https://pub.dev"
    source: hosted
    version: "1.0.0"
  dbus:
    dependency: transitive
    description:
      name: dbus
      sha256: d0c98dcd4f5169878b6cf8f6e0a52403a9dff371a3e2f019697accbf6f44a270
      url: "https://pub.dev"
    source: hosted
    version: "0.7.12"
  dio:
    dependency: "direct main"
    description:
      name: dio
      sha256: aff32c08f92787a557dd5c0145ac91536481831a01b4648136373cddb0e64f8c
      url: "https://pub.dev"
    source: hosted
    version: "5.9.2"
  dio_web_adapter:
    dependency: transitive
    description:
      name: dio_web_adapter
      sha256: "2f9e64323a7c3c7ef69567d5c800424a11f8337b8b228bad02524c9fb3c1f340"
      url: "https://pub.dev"
    source: hosted
    version: "2.1.2"
  fake_async:
    dependency: transitive
    description:
      name: fake_async
      sha256: "5368f224a74523e8d2e7399ea1638b37aecfca824a3cc4dfdf77bf1fa905ac44"
      url: "https://pub.dev"
    source: hosted
    version: "1.3.3"
  ffi:
    dependency: transitive
    description:
      name: ffi
      sha256: "6d7fd89431262d8f3125e81b50d3847a091d846eafcd4fdb88dd06f36d705a45"
      url: "https://pub.dev"
    source: hosted
    version: "2.2.0"
  file:
    dependency: transitive
    description:
      name: file
      sha256: a3b4f84adafef897088c160faf7dfffb7696046cb13ae90b508c2cbc95d3b8d4
      url: "https://pub.dev"
    source: hosted
    version: "7.0.1"
  file_selector_linux:
    dependency: transitive
    description:
      name: file_selector_linux
      sha256: "2567f398e06ac72dcf2e98a0c95df2a9edd03c2c2e0cacd4780f20cdf56263a0"
      url: "https://pub.dev"
    source: hosted
    version: "0.9.4"
  file_selector_macos:
    dependency: transitive
    description:
      name: file_selector_macos
      sha256: "5e0bbe9c312416f1787a68259ea1505b52f258c587f12920422671807c4d618a"
      url: "https://pub.dev"
    source: hosted
    version: "0.9.5"
  file_selector_platform_interface:
    dependency: transitive
    description:
      name: file_selector_platform_interface
      sha256: "35e0bd61ebcdb91a3505813b055b09b79dfdc7d0aee9c09a7ba59ae4bb13dc85"
      url: "https://pub.dev"
    source: hosted
    version: "2.7.0"
  file_selector_windows:
    dependency: transitive
    description:
      name: file_selector_windows
      sha256: "62197474ae75893a62df75939c777763d39c2bc5f73ce5b88497208bc269abfd"
      url: "https://pub.dev"
    source: hosted
    version: "0.9.3+5"
  firebase_core:
    dependency: "direct main"
    description:
      name: firebase_core
      sha256: d5a94b884dcb1e6d3430298e94bfe002238094cdfd5e29202d536ee2120f9158
      url: "https://pub.dev"
    source: hosted
    version: "4.7.0"
  firebase_core_platform_interface:
    dependency: transitive
    description:
      name: firebase_core_platform_interface
      sha256: "0ecda14c1bfc9ed8cac303dd0f8d04a320811b479362a9a4efb14fd331a473ce"
      url: "https://pub.dev"
    source: hosted
    version: "6.0.3"
  firebase_core_web:
    dependency: transitive
    description:
      name: firebase_core_web
      sha256: dc5096257cd67292d34d78ceeb90836f02a4be921b5f3934311a02bb2376118c
      url: "https://pub.dev"
    source: hosted
    version: "3.6.0"
  firebase_messaging:
    dependency: "direct main"
    description:
      name: firebase_messaging
      sha256: e5c93e8e7a9b0513f94bb684d2cf100e32e7dcdf2949574386b1955fc9a9b96a
      url: "https://pub.dev"
    source: hosted
    version: "16.2.0"
  firebase_messaging_platform_interface:
    dependency: transitive
    description:
      name: firebase_messaging_platform_interface
      sha256: "8cbb7d842e5071bba836452aff262f7db4b14bb3a0d00c1896cf176df886d65a"
      url: "https://pub.dev"
    source: hosted
    version: "4.7.9"
  firebase_messaging_web:
    dependency: transitive
    description:
      name: firebase_messaging_web
      sha256: "8750bacf50573c0383535fc3f9c58c6a2f9dff5320a16a82c30631b9dad894f1"
      url: "https://pub.dev"
    source: hosted
    version: "4.1.5"
  fixnum:
    dependency: transitive
    description:
      name: fixnum
      sha256: b6dc7065e46c974bc7c5f143080a6764ec7a4be6da1285ececdc37be96de53be
      url: "https://pub.dev"
    source: hosted
    version: "1.1.1"
  flutter:
    dependency: "direct main"
    description: flutter
    source: sdk
    version: "0.0.0"
  flutter_dotenv:
    dependency: "direct main"
    description:
      name: flutter_dotenv
      sha256: d4130c4a43e0b13fefc593bc3961f2cb46e30cb79e253d4a526b1b5d24ae1ce4
      url: "https://pub.dev"
    source: hosted
    version: "6.0.0"
  flutter_launcher_icons:
    dependency: "direct main"
    description:
      name: flutter_launcher_icons
      sha256: "10f13781741a2e3972126fae08393d3c4e01fa4cd7473326b94b72cf594195e7"
      url: "https://pub.dev"
    source: hosted
    version: "0.14.4"
  flutter_lints:
    dependency: "direct dev"
    description:
      name: flutter_lints
      sha256: "5398f14efa795ffb7a33e9b6a08798b26a180edac4ad7db3f231e40f82ce11e1"
      url: "https://pub.dev"
    source: hosted
    version: "5.0.0"
  flutter_map:
    dependency: "direct main"
    description:
      name: flutter_map
      sha256: "03b71c02806ff20c3718d108cbbb3638142ebafe368d8ce2dd22a33344bcb02b"
      url: "https://pub.dev"
    source: hosted
    version: "8.3.0"
  flutter_plugin_android_lifecycle:
    dependency: transitive
    description:
      name: flutter_plugin_android_lifecycle
      sha256: "38d1c268de9097ff59cf0e844ac38759fc78f76836d37edad06fa21e182055a0"
      url: "https://pub.dev"
    source: hosted
    version: "2.0.34"
  flutter_test:
    dependency: "direct dev"
    description: flutter
    source: sdk
    version: "0.0.0"
  flutter_web_plugins:
    dependency: transitive
    description: flutter
    source: sdk
    version: "0.0.0"
  geoclue:
    dependency: transitive
    description:
      name: geoclue
      sha256: c2a998c77474fc57aa00c6baa2928e58f4b267649057a1c76738656e9dbd2a7f
      url: "https://pub.dev"
    source: hosted
    version: "0.1.1"
  geolocator:
    dependency: "direct main"
    description:
      name: geolocator
      sha256: "79939537046c9025be47ec645f35c8090ecadb6fe98eba146a0d25e8c1357516"
      url: "https://pub.dev"
    source: hosted
    version: "14.0.2"
  geolocator_android:
    dependency: transitive
    description:
      name: geolocator_android
      sha256: "179c3cb66dfa674fc9ccbf2be872a02658724d1c067634e2c427cf6df7df901a"
      url: "https://pub.dev"
    source: hosted
    version: "5.0.2"
  geolocator_apple:
    dependency: transitive
    description:
      name: geolocator_apple
      sha256: dbdd8789d5aaf14cf69f74d4925ad1336b4433a6efdf2fce91e8955dc921bf22
      url: "https://pub.dev"
    source: hosted
    version: "2.3.13"
  geolocator_linux:
    dependency: transitive
    description:
      name: geolocator_linux
      sha256: d64112a205931926f4363bb6bd48f14cb38e7326833041d170615586cd143797
      url: "https://pub.dev"
    source: hosted
    version: "0.2.4"
  geolocator_platform_interface:
    dependency: transitive
    description:
      name: geolocator_platform_interface
      sha256: "30cb64f0b9adcc0fb36f628b4ebf4f731a2961a0ebd849f4b56200205056fe67"
      url: "https://pub.dev"
    source: hosted
    version: "4.2.6"
  geolocator_web:
    dependency: transitive
    description:
      name: geolocator_web
      sha256: b1ae9bdfd90f861fde8fd4f209c37b953d65e92823cb73c7dee1fa021b06f172
      url: "https://pub.dev"
    source: hosted
    version: "4.1.3"
  geolocator_windows:
    dependency: transitive
    description:
      name: geolocator_windows
      sha256: "175435404d20278ffd220de83c2ca293b73db95eafbdc8131fe8609be1421eb6"
      url: "https://pub.dev"
    source: hosted
    version: "0.2.5"
  get_it:
    dependency: "direct main"
    description:
      name: get_it
      sha256: "568d62f0e68666fb5d95519743b3c24a34c7f19d834b0658c46e26d778461f66"
      url: "https://pub.dev"
    source: hosted
    version: "9.2.1"
  glob:
    dependency: transitive
    description:
      name: glob
      sha256: c3f1ee72c96f8f78935e18aa8cecced9ab132419e8625dc187e1c2408efc20de
      url: "https://pub.dev"
    source: hosted
    version: "2.1.3"
  go_router:
    dependency: "direct main"
    description:
      name: go_router
      sha256: "48fb2f42ad057476fa4b733cb95e9f9ea7b0b010bb349ea491dca7dbdb18ffc4"
      url: "https://pub.dev"
    source: hosted
    version: "17.2.0"
  gsettings:
    dependency: transitive
    description:
      name: gsettings
      sha256: "1b0ce661f5436d2db1e51f3c4295a49849f03d304003a7ba177d01e3a858249c"
      url: "https://pub.dev"
    source: hosted
    version: "0.2.8"
  hooks:
    dependency: transitive
    description:
      name: hooks
      sha256: "025f060e86d2d4c3c47b56e33caf7f93bf9283340f26d23424ebcfccf34f621e"
      url: "https://pub.dev"
    source: hosted
    version: "1.0.3"
  http:
    dependency: "direct main"
    description:
      name: http
      sha256: "87721a4a50b19c7f1d49001e51409bddc46303966ce89a65af4f4e6004896412"
      url: "https://pub.dev"
    source: hosted
    version: "1.6.0"
  http_parser:
    dependency: "direct main"
    description:
      name: http_parser
      sha256: "178d74305e7866013777bab2c3d8726205dc5a4dd935297175b19a23a2e66571"
      url: "https://pub.dev"
    source: hosted
    version: "4.1.2"
  image:
    dependency: transitive
    description:
      name: image
      sha256: f9881ff4998044947ec38d098bc7c8316ae1186fa786eddffdb867b9bc94dfce
      url: "https://pub.dev"
    source: hosted
    version: "4.8.0"
  image_picker:
    dependency: "direct main"
    description:
      name: image_picker
      sha256: "784210112be18ea55f69d7076e2c656a4e24949fa9e76429fe53af0c0f4fa320"
      url: "https://pub.dev"
    source: hosted
    version: "1.2.1"
  image_picker_android:
    dependency: transitive
    description:
      name: image_picker_android
      sha256: "66810af8e99b2657ee98e5c6f02064f69bb63f7a70e343937f70946c5f8c6622"
      url: "https://pub.dev"
    source: hosted
    version: "0.8.13+16"
  image_picker_for_web:
    dependency: transitive
    description:
      name: image_picker_for_web
      sha256: "66257a3191ab360d23a55c8241c91a6e329d31e94efa7be9cf7a212e65850214"
      url: "https://pub.dev"
    source: hosted
    version: "3.1.1"
  image_picker_ios:
    dependency: transitive
    description:
      name: image_picker_ios
      sha256: "956c16a42c0c708f914021666ffcd8265dde36e673c9fa68c81f7d085d9774ad"
      url: "https://pub.dev"
    source: hosted
    version: "0.8.13+3"
  image_picker_linux:
    dependency: transitive
    description:
      name: image_picker_linux
      sha256: "1f81c5f2046b9ab724f85523e4af65be1d47b038160a8c8deed909762c308ed4"
      url: "https://pub.dev"
    source: hosted
    version: "0.2.2"
  image_picker_macos:
    dependency: transitive
    description:
      name: image_picker_macos
      sha256: "86f0f15a309de7e1a552c12df9ce5b59fe927e71385329355aec4776c6a8ec91"
      url: "https://pub.dev"
    source: hosted
    version: "0.2.2+1"
  image_picker_platform_interface:
    dependency: transitive
    description:
      name: image_picker_platform_interface
      sha256: "567e056716333a1647c64bb6bd873cff7622233a5c3f694be28a583d4715690c"
      url: "https://pub.dev"
    source: hosted
    version: "2.11.1"
  image_picker_windows:
    dependency: transitive
    description:
      name: image_picker_windows
      sha256: d248c86554a72b5495a31c56f060cf73a41c7ff541689327b1a7dbccc33adfae
      url: "https://pub.dev"
    source: hosted
    version: "0.2.2"
  intl:
    dependency: transitive
    description:
      name: intl
      sha256: "3df61194eb431efc39c4ceba583b95633a403f46c9fd341e550ce0bfa50e9aa5"
      url: "https://pub.dev"
    source: hosted
    version: "0.20.2"
  jni:
    dependency: transitive
    description:
      name: jni
      sha256: c2230682d5bc2362c1c9e8d3c7f406d9cbba23ab3f2e203a025dd47e0fb2e68f
      url: "https://pub.dev"
    source: hosted
    version: "1.0.0"
  jni_flutter:
    dependency: transitive
    description:
      name: jni_flutter
      sha256: "8b59e590786050b1cd866677dddaf76b1ade5e7bc751abe04b86e84d379d3ba6"
      url: "https://pub.dev"
    source: hosted
    version: "1.0.1"
  json_annotation:
    dependency: transitive
    description:
      name: json_annotation
      sha256: cb09e7dac6210041fad964ed7fbee004f14258b4eca4040f72d1234062ace4c8
      url: "https://pub.dev"
    source: hosted
    version: "4.11.0"
  latlong2:
    dependency: "direct main"
    description:
      name: latlong2
      sha256: "98227922caf49e6056f91b6c56945ea1c7b166f28ffcd5fb8e72fc0b453cc8fe"
      url: "https://pub.dev"
    source: hosted
    version: "0.9.1"
  leak_tracker:
    dependency: transitive
    description:
      name: leak_tracker
      sha256: "33e2e26bdd85a0112ec15400c8cbffea70d0f9c3407491f672a2fad47915e2de"
      url: "https://pub.dev"
    source: hosted
    version: "11.0.2"
  leak_tracker_flutter_testing:
    dependency: transitive
    description:
      name: leak_tracker_flutter_testing
      sha256: "1dbc140bb5a23c75ea9c4811222756104fbcd1a27173f0c34ca01e16bea473c1"
      url: "https://pub.dev"
    source: hosted
    version: "3.0.10"
  leak_tracker_testing:
    dependency: transitive
    description:
      name: leak_tracker_testing
      sha256: "8d5a2d49f4a66b49744b23b018848400d23e54caf9463f4eb20df3eb8acb2eb1"
      url: "https://pub.dev"
    source: hosted
    version: "3.0.2"
  lints:
    dependency: transitive
    description:
      name: lints
      sha256: c35bb79562d980e9a453fc715854e1ed39e24e7d0297a880ef54e17f9874a9d7
      url: "https://pub.dev"
    source: hosted
    version: "5.1.1"
  logging:
    dependency: transitive
    description:
      name: logging
      sha256: c8245ada5f1717ed44271ed1c26b8ce85ca3228fd2ffdb75468ab01979309d61
      url: "https://pub.dev"
    source: hosted
    version: "1.3.0"
  matcher:
    dependency: transitive
    description:
      name: matcher
      sha256: dc0b7dc7651697ea4ff3e69ef44b0407ea32c487a39fff6a4004fa585e901861
      url: "https://pub.dev"
    source: hosted
    version: "0.12.19"
  material_color_utilities:
    dependency: transitive
    description:
      name: material_color_utilities
      sha256: "9c337007e82b1889149c82ed242ed1cb24a66044e30979c44912381e9be4c48b"
      url: "https://pub.dev"
    source: hosted
    version: "0.13.0"
  meta:
    dependency: transitive
    description:
      name: meta
      sha256: "23f08335362185a5ea2ad3a4e597f1375e78bce8a040df5c600c8d3552ef2394"
      url: "https://pub.dev"
    source: hosted
    version: "1.17.0"
  mgrs_dart:
    dependency: transitive
    description:
      name: mgrs_dart
      sha256: "385e7168ecc77eb545220223c49eef8ab249da7bf57f22781c40a04d23fb196f"
      url: "https://pub.dev"
    source: hosted
    version: "3.0.0"
  mime:
    dependency: transitive
    description:
      name: mime
      sha256: "41a20518f0cb1256669420fdba0cd90d21561e560ac240f26ef8322e45bb7ed6"
      url: "https://pub.dev"
    source: hosted
    version: "2.0.0"
  native_toolchain_c:
    dependency: transitive
    description:
      name: native_toolchain_c
      sha256: "6ba77bb18063eebe9de401f5e6437e95e1438af0a87a3a39084fbd37c90df572"
      url: "https://pub.dev"
    source: hosted
    version: "0.17.6"
  objective_c:
    dependency: transitive
    description:
      name: objective_c
      sha256: "100a1c87616ab6ed41ec263b083c0ef3261ee6cd1dc3b0f35f8ddfa4f996fe52"
      url: "https://pub.dev"
    source: hosted
    version: "9.3.0"
  openai_dart:
    dependency: "direct main"
    description:
      name: openai_dart
      sha256: "762104fff91cdc10c1c22a49e7845996d54d1a06c011f3eda109bd1e4981796d"
      url: "https://pub.dev"
    source: hosted
    version: "4.0.1"
  package_config:
    dependency: transitive
    description:
      name: package_config
      sha256: f096c55ebb7deb7e384101542bfba8c52696c1b56fca2eb62827989ef2353bbc
      url: "https://pub.dev"
    source: hosted
    version: "2.2.0"
  package_info_plus:
    dependency: transitive
    description:
      name: package_info_plus
      sha256: "468c26b4254ab01979fa5e4a98cb343ea3631b9acee6f21028997419a80e1a20"
      url: "https://pub.dev"
    source: hosted
    version: "9.0.1"
  package_info_plus_platform_interface:
    dependency: transitive
    description:
      name: package_info_plus_platform_interface
      sha256: "202a487f08836a592a6bd4f901ac69b3a8f146af552bbd14407b6b41e1c3f086"
      url: "https://pub.dev"
    source: hosted
    version: "3.2.1"
  path:
    dependency: transitive
    description:
      name: path
      sha256: "75cca69d1490965be98c73ceaea117e8a04dd21217b37b292c9ddbec0d955bc5"
      url: "https://pub.dev"
    source: hosted
    version: "1.9.1"
  path_provider:
    dependency: transitive
    description:
      name: path_provider
      sha256: "50c5dd5b6e1aaf6fb3a78b33f6aa3afca52bf903a8a5298f53101fdaee55bbcd"
      url: "https://pub.dev"
    source: hosted
    version: "2.1.5"
  path_provider_android:
    dependency: transitive
    description:
      name: path_provider_android
      sha256: "69cbd515a62b94d32a7944f086b2f82b4ac40a1d45bebfc00813a430ab2dabcd"
      url: "https://pub.dev"
    source: hosted
    version: "2.3.1"
  path_provider_foundation:
    dependency: transitive
    description:
      name: path_provider_foundation
      sha256: "2a376b7d6392d80cd3705782d2caa734ca4727776db0b6ec36ef3f1855197699"
      url: "https://pub.dev"
    source: hosted
    version: "2.6.0"
  path_provider_linux:
    dependency: transitive
    description:
      name: path_provider_linux
      sha256: f7a1fe3a634fe7734c8d3f2766ad746ae2a2884abe22e241a8b301bf5cac3279
      url: "https://pub.dev"
    source: hosted
    version: "2.2.1"
  path_provider_platform_interface:
    dependency: transitive
    description:
      name: path_provider_platform_interface
      sha256: "88f5779f72ba699763fa3a3b06aa4bf6de76c8e5de842cf6f29e2e06476c2334"
      url: "https://pub.dev"
    source: hosted
    version: "2.1.2"
  path_provider_windows:
    dependency: transitive
    description:
      name: path_provider_windows
      sha256: bd6f00dbd873bfb70d0761682da2b3a2c2fccc2b9e84c495821639601d81afe7
      url: "https://pub.dev"
    source: hosted
    version: "2.3.0"
  pedantic:
    dependency: transitive
    description:
      name: pedantic
      sha256: "67fc27ed9639506c856c840ccce7594d0bdcd91bc8d53d6e52359449a1d50602"
      url: "https://pub.dev"
    source: hosted
    version: "1.11.1"
  petitparser:
    dependency: transitive
    description:
      name: petitparser
      sha256: "91bd59303e9f769f108f8df05e371341b15d59e995e6806aefab827b58336675"
      url: "https://pub.dev"
    source: hosted
    version: "7.0.2"
  platform:
    dependency: transitive
    description:
      name: platform
      sha256: "5d6b1b0036a5f331ebc77c850ebc8506cbc1e9416c27e59b439f917a902a4984"
      url: "https://pub.dev"
    source: hosted
    version: "3.1.6"
  plugin_platform_interface:
    dependency: transitive
    description:
      name: plugin_platform_interface
      sha256: "4820fbfdb9478b1ebae27888254d445073732dae3d6ea81f0b7e06d5dedc3f02"
      url: "https://pub.dev"
    source: hosted
    version: "2.1.8"
  posix:
    dependency: transitive
    description:
      name: posix
      sha256: "185ef7606574f789b40f289c233efa52e96dead518aed988e040a10737febb07"
      url: "https://pub.dev"
    source: hosted
    version: "6.5.0"
  proj4dart:
    dependency: transitive
    description:
      name: proj4dart
      sha256: ddcedc1f7876e62717de43ab3491e2829bdad0b028261805f94aa080967e5859
      url: "https://pub.dev"
    source: hosted
    version: "3.0.0"
  pub_semver:
    dependency: transitive
    description:
      name: pub_semver
      sha256: "5bfcf68ca79ef689f8990d1160781b4bad40a3bd5e5218ad4076ddb7f4081585"
      url: "https://pub.dev"
    source: hosted
    version: "2.2.0"
  record_use:
    dependency: transitive
    description:
      name: record_use
      sha256: "2551bd8eecfe95d14ae75f6021ad0248be5c27f138c2ec12fcb52b500b3ba1ed"
      url: "https://pub.dev"
    source: hosted
    version: "0.6.0"
  shared_preferences:
    dependency: "direct main"
    description:
      name: shared_preferences
      sha256: c3025c5534b01739267eb7d76959bbc25a6d10f6988e1c2a3036940133dd10bf
      url: "https://pub.dev"
    source: hosted
    version: "2.5.5"
  shared_preferences_android:
    dependency: transitive
    description:
      name: shared_preferences_android
      sha256: e8d4762b1e2e8578fc4d0fd548cebf24afd24f49719c08974df92834565e2c53
      url: "https://pub.dev"
    source: hosted
    version: "2.4.23"
  shared_preferences_foundation:
    dependency: transitive
    description:
      name: shared_preferences_foundation
      sha256: "4e7eaffc2b17ba398759f1151415869a34771ba11ebbccd1b0145472a619a64f"
      url: "https://pub.dev"
    source: hosted
    version: "2.5.6"
  shared_preferences_linux:
    dependency: transitive
    description:
      name: shared_preferences_linux
      sha256: "580abfd40f415611503cae30adf626e6656dfb2f0cee8f465ece7b6defb40f2f"
      url: "https://pub.dev"
    source: hosted
    version: "2.4.1"
  shared_preferences_platform_interface:
    dependency: transitive
    description:
      name: shared_preferences_platform_interface
      sha256: "649dc798a33931919ea356c4305c2d1f81619ea6e92244070b520187b5140ef9"
      url: "https://pub.dev"
    source: hosted
    version: "2.4.2"
  shared_preferences_web:
    dependency: transitive
    description:
      name: shared_preferences_web
      sha256: c49bd060261c9a3f0ff445892695d6212ff603ef3115edbb448509d407600019
      url: "https://pub.dev"
    source: hosted
    version: "2.4.3"
  shared_preferences_windows:
    dependency: transitive
    description:
      name: shared_preferences_windows
      sha256: "94ef0f72b2d71bc3e700e025db3710911bd51a71cefb65cc609dd0d9a982e3c1"
      url: "https://pub.dev"
    source: hosted
    version: "2.4.1"
  simple_sparse_list:
    dependency: transitive
    description:
      name: simple_sparse_list
      sha256: aa648fd240fa39b49dcd11c19c266990006006de6699a412de485695910fbc1f
      url: "https://pub.dev"
    source: hosted
    version: "0.1.4"
  sky_engine:
    dependency: transitive
    description: flutter
    source: sdk
    version: "0.0.0"
  source_span:
    dependency: transitive
    description:
      name: source_span
      sha256: "56a02f1f4cd1a2d96303c0144c93bd6d909eea6bee6bf5a0e0b685edbd4c47ab"
      url: "https://pub.dev"
    source: hosted
    version: "1.10.2"
  speech_to_text:
    dependency: "direct main"
    description:
      name: speech_to_text
      sha256: c07557664974afa061f221d0d4186935bea4220728ea9446702825e8b988db04
      url: "https://pub.dev"
    source: hosted
    version: "7.3.0"
  speech_to_text_platform_interface:
    dependency: transitive
    description:
      name: speech_to_text_platform_interface
      sha256: a1935847704e41ee468aad83181ddd2423d0833abe55d769c59afca07adb5114
      url: "https://pub.dev"
    source: hosted
    version: "2.3.0"
  speech_to_text_windows:
    dependency: transitive
    description:
      name: speech_to_text_windows
      sha256: "2c9846d18253c7bbe059a276297ef9f27e8a2745dead32192525beb208195072"
      url: "https://pub.dev"
    source: hosted
    version: "1.0.0+beta.8"
  stack_trace:
    dependency: transitive
    description:
      name: stack_trace
      sha256: "8b27215b45d22309b5cddda1aa2b19bdfec9df0e765f2de506401c071d38d1b1"
      url: "https://pub.dev"
    source: hosted
    version: "1.12.1"
  stream_channel:
    dependency: transitive
    description:
      name: stream_channel
      sha256: "969e04c80b8bcdf826f8f16579c7b14d780458bd97f56d107d3950fdbeef059d"
      url: "https://pub.dev"
    source: hosted
    version: "2.1.4"
  string_scanner:
    dependency: transitive
    description:
      name: string_scanner
      sha256: "921cd31725b72fe181906c6a94d987c78e3b98c2e205b397ea399d4054872b43"
      url: "https://pub.dev"
    source: hosted
    version: "1.4.1"
  term_glyph:
    dependency: transitive
    description:
      name: term_glyph
      sha256: "7f554798625ea768a7518313e58f83891c7f5024f88e46e7182a4558850a4b8e"
      url: "https://pub.dev"
    source: hosted
    version: "1.2.2"
  test_api:
    dependency: transitive
    description:
      name: test_api
      sha256: "8161c84903fd860b26bfdefb7963b3f0b68fee7adea0f59ef805ecca346f0c7a"
      url: "https://pub.dev"
    source: hosted
    version: "0.7.10"
  typed_data:
    dependency: transitive
    description:
      name: typed_data
      sha256: f9049c039ebfeb4cf7a7104a675823cd72dba8297f264b6637062516699fa006
      url: "https://pub.dev"
    source: hosted
    version: "1.4.0"
  unicode:
    dependency: transitive
    description:
      name: unicode
      sha256: a6f7bcfc8ea1d5ce1f6c0b1c39117a9919f4953edd9fd7a64090a9796c499b57
      url: "https://pub.dev"
    source: hosted
    version: "1.1.9"
  uuid:
    dependency: transitive
    description:
      name: uuid
      sha256: "1fef9e8e11e2991bb773070d4656b7bd5d850967a2456cfc83cf47925ba79489"
      url: "https://pub.dev"
    source: hosted
    version: "4.5.3"
  vector_math:
    dependency: transitive
    description:
      name: vector_math
      sha256: d530bd74fea330e6e364cda7a85019c434070188383e1cd8d9777ee586914c5b
      url: "https://pub.dev"
    source: hosted
    version: "2.2.0"
  vm_service:
    dependency: transitive
    description:
      name: vm_service
      sha256: "45caa6c5917fa127b5dbcfbd1fa60b14e583afdc08bfc96dda38886ca252eb60"
      url: "https://pub.dev"
    source: hosted
    version: "15.0.2"
  web:
    dependency: transitive
    description:
      name: web
      sha256: "868d88a33d8a87b18ffc05f9f030ba328ffefba92d6c127917a2ba740f9cfe4a"
      url: "https://pub.dev"
    source: hosted
    version: "1.1.1"
  web_socket:
    dependency: transitive
    description:
      name: web_socket
      sha256: "34d64019aa8e36bf9842ac014bb5d2f5586ca73df5e4d9bf5c936975cae6982c"
      url: "https://pub.dev"
    source: hosted
    version: "1.0.1"
  win32:
    dependency: transitive
    description:
      name: win32
      sha256: d7cb55e04cd34096cd3a79b3330245f54cb96a370a1c27adb3c84b917de8b08e
      url: "https://pub.dev"
    source: hosted
    version: "5.15.0"
  wkt_parser:
    dependency: transitive
    description:
      name: wkt_parser
      sha256: "8a555fc60de3116c00aad67891bcab20f81a958e4219cc106e3c037aa3937f13"
      url: "https://pub.dev"
    source: hosted
    version: "2.0.0"
  xdg_directories:
    dependency: transitive
    description:
      name: xdg_directories
      sha256: "7a3f37b05d989967cdddcbb571f1ea834867ae2faa29725fd085180e0883aa15"
      url: "https://pub.dev"
    source: hosted
    version: "1.1.0"
  xml:
    dependency: transitive
    description:
      name: xml
      sha256: "971043b3a0d3da28727e40ed3e0b5d18b742fa5a68665cca88e74b7876d5e025"
      url: "https://pub.dev"
    source: hosted
    version: "6.6.1"
  yaml:
    dependency: transitive
    description:
      name: yaml
      sha256: b9da305ac7c39faa3f030eccd175340f968459dae4af175130b3fc47e40d76ce
      url: "https://pub.dev"
    source: hosted
    version: "3.1.3"
sdks:
  dart: ">=3.10.3 <4.0.0"
  flutter: ">=3.38.4"
``

---

## mechanic_mobile/pubspec.yaml

``yaml
name: mechanic_mobile
description: "A new Flutter project."
publish_to: 'none'
version: 0.1.0

environment:
  sdk: ^3.9.2

dependencies:
  flutter:
    sdk: flutter
  flutter_launcher_icons: ^0.14.4 # para generar los iconos al hacer build en distintas plataformas
  cupertino_icons: ^1.0.8
  http: ^1.6.0
  flutter_dotenv: ^6.0.0
  go_router: ^17.2.0 # nevegador inferior sencillo
  shared_preferences: ^2.5.4
  speech_to_text: ^7.3.0 # (Agregar permisos)
  openai_dart: ^4.0.1 # libreria para usar el LLM de openai para usar el modelo de OpenRouter 
  image_picker: ^1.2.1 # (Agregar permisos)
  dio: ^5.9.2 # (El axios de flutter)
  get_it: ^9.2.1 #(Para injection de dependencias)
  http_parser: ^4.1.2 #(Para serializar formatos de image/audio/etc)
  firebase_core: ^4.7.0
  firebase_messaging: ^16.2.0 #(Para notificaciones push)
  flutter_map: ^8.3.0 #(Para maás en flutter alternativa a google_maps)
  geolocator: ^14.0.2 #(Obtener coordenadas del dispositivo)
  latlong2: ^0.9.1 #(Para calcular latitud y longitud)


dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^5.0.0

flutter:
  uses-material-design: true
  assets:
    - .env
    - assets/

# Todavía no hay logo
# flutter_launcher_icons:
#   image_path: "assets/logo.png" 
#   android: true
#   ios: true
#   remove_alpha_ios: true
#   web:
#     generate: true
#     image_path: "assets/logo.png"
#   windows:
#     generate: true
#     image_path: "assets/logo.png"
#   macos:
#     generate: true
#     image_path: "assets/logo.png"
#   linux:
#     generate: true
#     image_path: "assets/logo.png"
``

---

## mechanic_mobile/README.md

``markdown
# mechanic_mobile

A new Flutter project.

### Clean Archutecture
```
└── 📁lib
    └── 📁constants
        ├── env.dart
    └── 📁core
        └── 📁di
            ├── injection_container.dart
        └── 📁error
            ├── failures.dart
        └── 📁routes
            ├── app_routes.dart
    └── 📁data
        └── 📁datasources
            ├── mock_auth_data_source.dart
        └── 📁models
            ├── service_request_model.dart
            ├── user_model.dart
        └── 📁repositories
            ├── auth_repository_impl.dart
    └── 📁domain
        └── 📁entities
            ├── service_request.dart
            ├── user.dart
        └── 📁repositories
            ├── auth_repository.dart
            ├── service_request_repository.dart
        └── 📁usecases
            ├── get_service_requests_usecase.dart
            ├── login_usecase.dart
    └── 📁presentation
        └── 📁auth
            └── 📁pages
                ├── login_page.dart
            └── 📁viewmodels
                ├── auth_viewmodel.dart
        └── 📁home
            └── 📁pages
                ├── home_page.dart
            └── 📁viewmodels
                ├── home_viewmodel.dart
        └── 📁service_request
            └── 📁pages
                ├── request_detail_page.dart
    └── main.dart
```

```bash
Clean Code Flow
domain:
(entities)vehicle 
|  |
|  |->(repositories)vehicle_repository "interface"
|  |
|--|->(usecases)get_vehicles_usecase


infrastructure:
(models)vehicle
  |
  |->(datasources)vehicle_remote_datasource "interface" + "class" -> (class implements inteface)
  |
  |->(repositories)vehicle_repository_impl (class implements interface off domain/repositories)


presentation:
(viewmodels)vehicles_viewmodel usa domain/entities y domain/usecases
  |
  |->(pages)vehicles_page usa core/di

```
``

---

## mechanic_mobile/web_dev_config.yaml

``yaml
server:
  host: "localhost"
  port: 5200
  # https: # esto hacer despues
  #   cert-path: "/path/to/cert.pem" # Path <string> to your TLS certificate
  #   cert-key-path: "/path/to/key.pem" # Path <string> to TLS certificate key
  proxy:
    - target: "http://localhost:8000/" # Base URL <string> of your backend
      prefix: "/api/" # Path <string>
``

---

## mechanic_mobile/web/index.html

``html
<!DOCTYPE html>
<html>
<head>
  <!--
    If you are serving your web app in a path other than the root, change the
    href value below to reflect the base path you are serving from.

    The path provided below has to start and end with a slash "/" in order for
    it to work correctly.

    For more details:
    * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base

    This is a placeholder for base href that will be replaced by the value of
    the `--base-href` argument provided to `flutter build`.
  -->
  <base href="$FLUTTER_BASE_HREF">

  <meta charset="UTF-8">
  <meta content="IE=Edge" http-equiv="X-UA-Compatible">
  <meta name="description" content="A new Flutter project.">

  <!-- iOS meta tags & icons -->
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <meta name="apple-mobile-web-app-title" content="mechanic_mobile">
  <link rel="apple-touch-icon" href="icons/Icon-192.png">

  <!-- Favicon -->
  <link rel="icon" type="image/png" href="favicon.png"/>

  <title>mechanic_mobile</title>
  <link rel="manifest" href="manifest.json">
</head>
<body>
  <script>{{flutter_bootstrap_js}}</script>
  <script type="module">
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-analytics.js";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyDNkjt1Wva9Jl05iUcDdOjiKAP3hwFF-xk",
      authDomain: "si2-examen1.firebaseapp.com",
      projectId: "si2-examen1",
      storageBucket: "si2-examen1.firebasestorage.app",
      messagingSenderId: "901484656414",
      appId: "1:901484656414:web:642cca58382dd7fd09bb0f",
      measurementId: "G-V25BW0T56Y"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
  </script>
  <script>
    if (navigator.geolocation) {
      console.log('Geolocation is supported');
    } else {
      console.log('Geolocation is not supported');
    }
  </script>
</body>
</html>
``

---

## mechanic_mobile/web/manifest.json

``json
{
    "name": "mechanic_mobile",
    "short_name": "mechanic_mobile",
    "start_url": ".",
    "display": "standalone",
    "background_color": "#0175C2",
    "theme_color": "#0175C2",
    "description": "A new Flutter project.",
    "orientation": "portrait-primary",
    "prefer_related_applications": false,
    "icons": [
        {
            "src": "icons/Icon-192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "icons/Icon-512.png",
            "sizes": "512x512",
            "type": "image/png"
        },
        {
            "src": "icons/Icon-maskable-192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "maskable"
        },
        {
            "src": "icons/Icon-maskable-512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
        }
    ]
}
``

---

## mechanic_mobile/windows/.gitignore

``
flutter/ephemeral/

# Visual Studio user-specific files.
*.suo
*.user
*.userosscache
*.sln.docstates

# Visual Studio build-related files.
x64/
x86/

# Visual Studio cache files
# files ending in .cache can be ignored
*.[Cc]ache
# but keep track of directories ending in .cache
!*.[Cc]ache/
``

---

## mechanic_mobile/windows/CMakeLists.txt

``cmake
# Project-level configuration.
cmake_minimum_required(VERSION 3.14)
project(mechanic_mobile LANGUAGES CXX)

# The name of the executable created for the application. Change this to change
# the on-disk name of your application.
set(BINARY_NAME "mechanic_mobile")

# Explicitly opt in to modern CMake behaviors to avoid warnings with recent
# versions of CMake.
cmake_policy(VERSION 3.14...3.25)

# Define build configuration option.
get_property(IS_MULTICONFIG GLOBAL PROPERTY GENERATOR_IS_MULTI_CONFIG)
if(IS_MULTICONFIG)
  set(CMAKE_CONFIGURATION_TYPES "Debug;Profile;Release"
    CACHE STRING "" FORCE)
else()
  if(NOT CMAKE_BUILD_TYPE AND NOT CMAKE_CONFIGURATION_TYPES)
    set(CMAKE_BUILD_TYPE "Debug" CACHE
      STRING "Flutter build mode" FORCE)
    set_property(CACHE CMAKE_BUILD_TYPE PROPERTY STRINGS
      "Debug" "Profile" "Release")
  endif()
endif()
# Define settings for the Profile build mode.
set(CMAKE_EXE_LINKER_FLAGS_PROFILE "${CMAKE_EXE_LINKER_FLAGS_RELEASE}")
set(CMAKE_SHARED_LINKER_FLAGS_PROFILE "${CMAKE_SHARED_LINKER_FLAGS_RELEASE}")
set(CMAKE_C_FLAGS_PROFILE "${CMAKE_C_FLAGS_RELEASE}")
set(CMAKE_CXX_FLAGS_PROFILE "${CMAKE_CXX_FLAGS_RELEASE}")

# Use Unicode for all projects.
add_definitions(-DUNICODE -D_UNICODE)

# Compilation settings that should be applied to most targets.
#
# Be cautious about adding new options here, as plugins use this function by
# default. In most cases, you should add new options to specific targets instead
# of modifying this function.
function(APPLY_STANDARD_SETTINGS TARGET)
  target_compile_features(${TARGET} PUBLIC cxx_std_17)
  target_compile_options(${TARGET} PRIVATE /W4 /WX /wd"4100")
  target_compile_options(${TARGET} PRIVATE /EHsc)
  target_compile_definitions(${TARGET} PRIVATE "_HAS_EXCEPTIONS=0")
  target_compile_definitions(${TARGET} PRIVATE "$<$<CONFIG:Debug>:_DEBUG>")
endfunction()

# Flutter library and tool build rules.
set(FLUTTER_MANAGED_DIR "${CMAKE_CURRENT_SOURCE_DIR}/flutter")
add_subdirectory(${FLUTTER_MANAGED_DIR})

# Application build; see runner/CMakeLists.txt.
add_subdirectory("runner")


# Generated plugin build rules, which manage building the plugins and adding
# them to the application.
include(flutter/generated_plugins.cmake)


# === Installation ===
# Support files are copied into place next to the executable, so that it can
# run in place. This is done instead of making a separate bundle (as on Linux)
# so that building and running from within Visual Studio will work.
set(BUILD_BUNDLE_DIR "$<TARGET_FILE_DIR:${BINARY_NAME}>")
# Make the "install" step default, as it's required to run.
set(CMAKE_VS_INCLUDE_INSTALL_TO_DEFAULT_BUILD 1)
if(CMAKE_INSTALL_PREFIX_INITIALIZED_TO_DEFAULT)
  set(CMAKE_INSTALL_PREFIX "${BUILD_BUNDLE_DIR}" CACHE PATH "..." FORCE)
endif()

set(INSTALL_BUNDLE_DATA_DIR "${CMAKE_INSTALL_PREFIX}/data")
set(INSTALL_BUNDLE_LIB_DIR "${CMAKE_INSTALL_PREFIX}")

install(TARGETS ${BINARY_NAME} RUNTIME DESTINATION "${CMAKE_INSTALL_PREFIX}"
  COMPONENT Runtime)

install(FILES "${FLUTTER_ICU_DATA_FILE}" DESTINATION "${INSTALL_BUNDLE_DATA_DIR}"
  COMPONENT Runtime)

install(FILES "${FLUTTER_LIBRARY}" DESTINATION "${INSTALL_BUNDLE_LIB_DIR}"
  COMPONENT Runtime)

if(PLUGIN_BUNDLED_LIBRARIES)
  install(FILES "${PLUGIN_BUNDLED_LIBRARIES}"
    DESTINATION "${INSTALL_BUNDLE_LIB_DIR}"
    COMPONENT Runtime)
endif()

# Copy the native assets provided by the build.dart from all packages.
set(NATIVE_ASSETS_DIR "${PROJECT_BUILD_DIR}native_assets/windows/")
install(DIRECTORY "${NATIVE_ASSETS_DIR}"
   DESTINATION "${INSTALL_BUNDLE_LIB_DIR}"
   COMPONENT Runtime)

# Fully re-copy the assets directory on each build to avoid having stale files
# from a previous install.
set(FLUTTER_ASSET_DIR_NAME "flutter_assets")
install(CODE "
  file(REMOVE_RECURSE \"${INSTALL_BUNDLE_DATA_DIR}/${FLUTTER_ASSET_DIR_NAME}\")
  " COMPONENT Runtime)
install(DIRECTORY "${PROJECT_BUILD_DIR}/${FLUTTER_ASSET_DIR_NAME}"
  DESTINATION "${INSTALL_BUNDLE_DATA_DIR}" COMPONENT Runtime)

# Install the AOT library on non-Debug builds only.
install(FILES "${AOT_LIBRARY}" DESTINATION "${INSTALL_BUNDLE_DATA_DIR}"
  CONFIGURATIONS Profile;Release
  COMPONENT Runtime)
``

---

## mechanic_mobile/windows/flutter/CMakeLists.txt

``cmake
# This file controls Flutter-level build steps. It should not be edited.
cmake_minimum_required(VERSION 3.14)

set(EPHEMERAL_DIR "${CMAKE_CURRENT_SOURCE_DIR}/ephemeral")

# Configuration provided via flutter tool.
include(${EPHEMERAL_DIR}/generated_config.cmake)

# TODO: Move the rest of this into files in ephemeral. See
# https://github.com/flutter/flutter/issues/57146.
set(WRAPPER_ROOT "${EPHEMERAL_DIR}/cpp_client_wrapper")

# Set fallback configurations for older versions of the flutter tool.
if (NOT DEFINED FLUTTER_TARGET_PLATFORM)
  set(FLUTTER_TARGET_PLATFORM "windows-x64")
endif()

# === Flutter Library ===
set(FLUTTER_LIBRARY "${EPHEMERAL_DIR}/flutter_windows.dll")

# Published to parent scope for install step.
set(FLUTTER_LIBRARY ${FLUTTER_LIBRARY} PARENT_SCOPE)
set(FLUTTER_ICU_DATA_FILE "${EPHEMERAL_DIR}/icudtl.dat" PARENT_SCOPE)
set(PROJECT_BUILD_DIR "${PROJECT_DIR}/build/" PARENT_SCOPE)
set(AOT_LIBRARY "${PROJECT_DIR}/build/windows/app.so" PARENT_SCOPE)

list(APPEND FLUTTER_LIBRARY_HEADERS
  "flutter_export.h"
  "flutter_windows.h"
  "flutter_messenger.h"
  "flutter_plugin_registrar.h"
  "flutter_texture_registrar.h"
)
list(TRANSFORM FLUTTER_LIBRARY_HEADERS PREPEND "${EPHEMERAL_DIR}/")
add_library(flutter INTERFACE)
target_include_directories(flutter INTERFACE
  "${EPHEMERAL_DIR}"
)
target_link_libraries(flutter INTERFACE "${FLUTTER_LIBRARY}.lib")
add_dependencies(flutter flutter_assemble)

# === Wrapper ===
list(APPEND CPP_WRAPPER_SOURCES_CORE
  "core_implementations.cc"
  "standard_codec.cc"
)
list(TRANSFORM CPP_WRAPPER_SOURCES_CORE PREPEND "${WRAPPER_ROOT}/")
list(APPEND CPP_WRAPPER_SOURCES_PLUGIN
  "plugin_registrar.cc"
)
list(TRANSFORM CPP_WRAPPER_SOURCES_PLUGIN PREPEND "${WRAPPER_ROOT}/")
list(APPEND CPP_WRAPPER_SOURCES_APP
  "flutter_engine.cc"
  "flutter_view_controller.cc"
)
list(TRANSFORM CPP_WRAPPER_SOURCES_APP PREPEND "${WRAPPER_ROOT}/")

# Wrapper sources needed for a plugin.
add_library(flutter_wrapper_plugin STATIC
  ${CPP_WRAPPER_SOURCES_CORE}
  ${CPP_WRAPPER_SOURCES_PLUGIN}
)
apply_standard_settings(flutter_wrapper_plugin)
set_target_properties(flutter_wrapper_plugin PROPERTIES
  POSITION_INDEPENDENT_CODE ON)
set_target_properties(flutter_wrapper_plugin PROPERTIES
  CXX_VISIBILITY_PRESET hidden)
target_link_libraries(flutter_wrapper_plugin PUBLIC flutter)
target_include_directories(flutter_wrapper_plugin PUBLIC
  "${WRAPPER_ROOT}/include"
)
add_dependencies(flutter_wrapper_plugin flutter_assemble)

# Wrapper sources needed for the runner.
add_library(flutter_wrapper_app STATIC
  ${CPP_WRAPPER_SOURCES_CORE}
  ${CPP_WRAPPER_SOURCES_APP}
)
apply_standard_settings(flutter_wrapper_app)
target_link_libraries(flutter_wrapper_app PUBLIC flutter)
target_include_directories(flutter_wrapper_app PUBLIC
  "${WRAPPER_ROOT}/include"
)
add_dependencies(flutter_wrapper_app flutter_assemble)

# === Flutter tool backend ===
# _phony_ is a non-existent file to force this command to run every time,
# since currently there's no way to get a full input/output list from the
# flutter tool.
set(PHONY_OUTPUT "${CMAKE_CURRENT_BINARY_DIR}/_phony_")
set_source_files_properties("${PHONY_OUTPUT}" PROPERTIES SYMBOLIC TRUE)
add_custom_command(
  OUTPUT ${FLUTTER_LIBRARY} ${FLUTTER_LIBRARY_HEADERS}
    ${CPP_WRAPPER_SOURCES_CORE} ${CPP_WRAPPER_SOURCES_PLUGIN}
    ${CPP_WRAPPER_SOURCES_APP}
    ${PHONY_OUTPUT}
  COMMAND ${CMAKE_COMMAND} -E env
    ${FLUTTER_TOOL_ENVIRONMENT}
    "${FLUTTER_ROOT}/packages/flutter_tools/bin/tool_backend.bat"
      ${FLUTTER_TARGET_PLATFORM} $<CONFIG>
  VERBATIM
)
add_custom_target(flutter_assemble DEPENDS
  "${FLUTTER_LIBRARY}"
  ${FLUTTER_LIBRARY_HEADERS}
  ${CPP_WRAPPER_SOURCES_CORE}
  ${CPP_WRAPPER_SOURCES_PLUGIN}
  ${CPP_WRAPPER_SOURCES_APP}
)
``

---

## mechanic_mobile/windows/flutter/generated_plugin_registrant.cc

``
//
//  Generated file. Do not edit.
//

// clang-format off

#include "generated_plugin_registrant.h"

#include <file_selector_windows/file_selector_windows.h>
#include <firebase_core/firebase_core_plugin_c_api.h>
#include <geolocator_windows/geolocator_windows.h>
#include <speech_to_text_windows/speech_to_text_windows.h>

void RegisterPlugins(flutter::PluginRegistry* registry) {
  FileSelectorWindowsRegisterWithRegistrar(
      registry->GetRegistrarForPlugin("FileSelectorWindows"));
  FirebaseCorePluginCApiRegisterWithRegistrar(
      registry->GetRegistrarForPlugin("FirebaseCorePluginCApi"));
  GeolocatorWindowsRegisterWithRegistrar(
      registry->GetRegistrarForPlugin("GeolocatorWindows"));
  SpeechToTextWindowsRegisterWithRegistrar(
      registry->GetRegistrarForPlugin("SpeechToTextWindows"));
}
``

---

## mechanic_mobile/windows/flutter/generated_plugin_registrant.h

``
//
//  Generated file. Do not edit.
//

// clang-format off

#ifndef GENERATED_PLUGIN_REGISTRANT_
#define GENERATED_PLUGIN_REGISTRANT_

#include <flutter/plugin_registry.h>

// Registers Flutter plugins.
void RegisterPlugins(flutter::PluginRegistry* registry);

#endif  // GENERATED_PLUGIN_REGISTRANT_
``

---

## mechanic_mobile/windows/flutter/generated_plugins.cmake

``
#
# Generated file, do not edit.
#

list(APPEND FLUTTER_PLUGIN_LIST
  file_selector_windows
  firebase_core
  geolocator_windows
  speech_to_text_windows
)

list(APPEND FLUTTER_FFI_PLUGIN_LIST
  jni
)

set(PLUGIN_BUNDLED_LIBRARIES)

foreach(plugin ${FLUTTER_PLUGIN_LIST})
  add_subdirectory(flutter/ephemeral/.plugin_symlinks/${plugin}/windows plugins/${plugin})
  target_link_libraries(${BINARY_NAME} PRIVATE ${plugin}_plugin)
  list(APPEND PLUGIN_BUNDLED_LIBRARIES $<TARGET_FILE:${plugin}_plugin>)
  list(APPEND PLUGIN_BUNDLED_LIBRARIES ${${plugin}_bundled_libraries})
endforeach(plugin)

foreach(ffi_plugin ${FLUTTER_FFI_PLUGIN_LIST})
  add_subdirectory(flutter/ephemeral/.plugin_symlinks/${ffi_plugin}/windows plugins/${ffi_plugin})
  list(APPEND PLUGIN_BUNDLED_LIBRARIES ${${ffi_plugin}_bundled_libraries})
endforeach(ffi_plugin)
``

---

## mechanic_mobile/windows/runner/CMakeLists.txt

``cmake
cmake_minimum_required(VERSION 3.14)
project(runner LANGUAGES CXX)

# Define the application target. To change its name, change BINARY_NAME in the
# top-level CMakeLists.txt, not the value here, or `flutter run` will no longer
# work.
#
# Any new source files that you add to the application should be added here.
add_executable(${BINARY_NAME} WIN32
  "flutter_window.cpp"
  "main.cpp"
  "utils.cpp"
  "win32_window.cpp"
  "${FLUTTER_MANAGED_DIR}/generated_plugin_registrant.cc"
  "Runner.rc"
  "runner.exe.manifest"
)

# Apply the standard set of build settings. This can be removed for applications
# that need different build settings.
apply_standard_settings(${BINARY_NAME})

# Add preprocessor definitions for the build version.
target_compile_definitions(${BINARY_NAME} PRIVATE "FLUTTER_VERSION=\"${FLUTTER_VERSION}\"")
target_compile_definitions(${BINARY_NAME} PRIVATE "FLUTTER_VERSION_MAJOR=${FLUTTER_VERSION_MAJOR}")
target_compile_definitions(${BINARY_NAME} PRIVATE "FLUTTER_VERSION_MINOR=${FLUTTER_VERSION_MINOR}")
target_compile_definitions(${BINARY_NAME} PRIVATE "FLUTTER_VERSION_PATCH=${FLUTTER_VERSION_PATCH}")
target_compile_definitions(${BINARY_NAME} PRIVATE "FLUTTER_VERSION_BUILD=${FLUTTER_VERSION_BUILD}")

# Disable Windows macros that collide with C++ standard library functions.
target_compile_definitions(${BINARY_NAME} PRIVATE "NOMINMAX")

# Add dependency libraries and include directories. Add any application-specific
# dependencies here.
target_link_libraries(${BINARY_NAME} PRIVATE flutter flutter_wrapper_app)
target_link_libraries(${BINARY_NAME} PRIVATE "dwmapi.lib")
target_include_directories(${BINARY_NAME} PRIVATE "${CMAKE_SOURCE_DIR}")

# Run the Flutter tool portions of the build. This must not be removed.
add_dependencies(${BINARY_NAME} flutter_assemble)
``

---

## mechanic_mobile/windows/runner/flutter_window.cpp

``
#include "flutter_window.h"

#include <optional>

#include "flutter/generated_plugin_registrant.h"

FlutterWindow::FlutterWindow(const flutter::DartProject& project)
    : project_(project) {}

FlutterWindow::~FlutterWindow() {}

bool FlutterWindow::OnCreate() {
  if (!Win32Window::OnCreate()) {
    return false;
  }

  RECT frame = GetClientArea();

  // The size here must match the window dimensions to avoid unnecessary surface
  // creation / destruction in the startup path.
  flutter_controller_ = std::make_unique<flutter::FlutterViewController>(
      frame.right - frame.left, frame.bottom - frame.top, project_);
  // Ensure that basic setup of the controller was successful.
  if (!flutter_controller_->engine() || !flutter_controller_->view()) {
    return false;
  }
  RegisterPlugins(flutter_controller_->engine());
  SetChildContent(flutter_controller_->view()->GetNativeWindow());

  flutter_controller_->engine()->SetNextFrameCallback([&]() {
    this->Show();
  });

  // Flutter can complete the first frame before the "show window" callback is
  // registered. The following call ensures a frame is pending to ensure the
  // window is shown. It is a no-op if the first frame hasn't completed yet.
  flutter_controller_->ForceRedraw();

  return true;
}

void FlutterWindow::OnDestroy() {
  if (flutter_controller_) {
    flutter_controller_ = nullptr;
  }

  Win32Window::OnDestroy();
}

LRESULT
FlutterWindow::MessageHandler(HWND hwnd, UINT const message,
                              WPARAM const wparam,
                              LPARAM const lparam) noexcept {
  // Give Flutter, including plugins, an opportunity to handle window messages.
  if (flutter_controller_) {
    std::optional<LRESULT> result =
        flutter_controller_->HandleTopLevelWindowProc(hwnd, message, wparam,
                                                      lparam);
    if (result) {
      return *result;
    }
  }

  switch (message) {
    case WM_FONTCHANGE:
      flutter_controller_->engine()->ReloadSystemFonts();
      break;
  }

  return Win32Window::MessageHandler(hwnd, message, wparam, lparam);
}
``

---

## mechanic_mobile/windows/runner/flutter_window.h

``
#ifndef RUNNER_FLUTTER_WINDOW_H_
#define RUNNER_FLUTTER_WINDOW_H_

#include <flutter/dart_project.h>
#include <flutter/flutter_view_controller.h>

#include <memory>

#include "win32_window.h"

// A window that does nothing but host a Flutter view.
class FlutterWindow : public Win32Window {
 public:
  // Creates a new FlutterWindow hosting a Flutter view running |project|.
  explicit FlutterWindow(const flutter::DartProject& project);
  virtual ~FlutterWindow();

 protected:
  // Win32Window:
  bool OnCreate() override;
  void OnDestroy() override;
  LRESULT MessageHandler(HWND window, UINT const message, WPARAM const wparam,
                         LPARAM const lparam) noexcept override;

 private:
  // The project to run.
  flutter::DartProject project_;

  // The Flutter instance hosted by this window.
  std::unique_ptr<flutter::FlutterViewController> flutter_controller_;
};

#endif  // RUNNER_FLUTTER_WINDOW_H_
``

---

## mechanic_mobile/windows/runner/main.cpp

``
#include <flutter/dart_project.h>
#include <flutter/flutter_view_controller.h>
#include <windows.h>

#include "flutter_window.h"
#include "utils.h"

int APIENTRY wWinMain(_In_ HINSTANCE instance, _In_opt_ HINSTANCE prev,
                      _In_ wchar_t *command_line, _In_ int show_command) {
  // Attach to console when present (e.g., 'flutter run') or create a
  // new console when running with a debugger.
  if (!::AttachConsole(ATTACH_PARENT_PROCESS) && ::IsDebuggerPresent()) {
    CreateAndAttachConsole();
  }

  // Initialize COM, so that it is available for use in the library and/or
  // plugins.
  ::CoInitializeEx(nullptr, COINIT_APARTMENTTHREADED);

  flutter::DartProject project(L"data");

  std::vector<std::string> command_line_arguments =
      GetCommandLineArguments();

  project.set_dart_entrypoint_arguments(std::move(command_line_arguments));

  FlutterWindow window(project);
  Win32Window::Point origin(10, 10);
  Win32Window::Size size(1280, 720);
  if (!window.Create(L"mechanic_mobile", origin, size)) {
    return EXIT_FAILURE;
  }
  window.SetQuitOnClose(true);

  ::MSG msg;
  while (::GetMessage(&msg, nullptr, 0, 0)) {
    ::TranslateMessage(&msg);
    ::DispatchMessage(&msg);
  }

  ::CoUninitialize();
  return EXIT_SUCCESS;
}
``

---

## mechanic_mobile/windows/runner/resource.h

``
//{{NO_DEPENDENCIES}}
// Microsoft Visual C++ generated include file.
// Used by Runner.rc
//
#define IDI_APP_ICON                    101

// Next default values for new objects
//
#ifdef APSTUDIO_INVOKED
#ifndef APSTUDIO_READONLY_SYMBOLS
#define _APS_NEXT_RESOURCE_VALUE        102
#define _APS_NEXT_COMMAND_VALUE         40001
#define _APS_NEXT_CONTROL_VALUE         1001
#define _APS_NEXT_SYMED_VALUE           101
#endif
#endif
``

---

## mechanic_mobile/windows/runner/runner.exe.manifest

``
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<assembly xmlns="urn:schemas-microsoft-com:asm.v1" manifestVersion="1.0">
  <application xmlns="urn:schemas-microsoft-com:asm.v3">
    <windowsSettings>
      <dpiAwareness xmlns="http://schemas.microsoft.com/SMI/2016/WindowsSettings">PerMonitorV2</dpiAwareness>
    </windowsSettings>
  </application>
  <compatibility xmlns="urn:schemas-microsoft-com:compatibility.v1">
    <application>
      <!-- Windows 10 and Windows 11 -->
      <supportedOS Id="{8e0f7a12-bfb3-4fe8-b9a5-48fd50a15a9a}"/>
    </application>
  </compatibility>
</assembly>
``

---

## mechanic_mobile/windows/runner/Runner.rc

``
// Microsoft Visual C++ generated resource script.
//
#pragma code_page(65001)
#include "resource.h"

#define APSTUDIO_READONLY_SYMBOLS
/////////////////////////////////////////////////////////////////////////////
//
// Generated from the TEXTINCLUDE 2 resource.
//
#include "winres.h"

/////////////////////////////////////////////////////////////////////////////
#undef APSTUDIO_READONLY_SYMBOLS

/////////////////////////////////////////////////////////////////////////////
// English (United States) resources

#if !defined(AFX_RESOURCE_DLL) || defined(AFX_TARG_ENU)
LANGUAGE LANG_ENGLISH, SUBLANG_ENGLISH_US

#ifdef APSTUDIO_INVOKED
/////////////////////////////////////////////////////////////////////////////
//
// TEXTINCLUDE
//

1 TEXTINCLUDE
BEGIN
    "resource.h\0"
END

2 TEXTINCLUDE
BEGIN
    "#include ""winres.h""\r\n"
    "\0"
END

3 TEXTINCLUDE
BEGIN
    "\r\n"
    "\0"
END

#endif    // APSTUDIO_INVOKED


/////////////////////////////////////////////////////////////////////////////
//
// Icon
//

// Icon with lowest ID value placed first to ensure application icon
// remains consistent on all systems.
IDI_APP_ICON            ICON                    "resources\\app_icon.ico"


/////////////////////////////////////////////////////////////////////////////
//
// Version
//

#if defined(FLUTTER_VERSION_MAJOR) && defined(FLUTTER_VERSION_MINOR) && defined(FLUTTER_VERSION_PATCH) && defined(FLUTTER_VERSION_BUILD)
#define VERSION_AS_NUMBER FLUTTER_VERSION_MAJOR,FLUTTER_VERSION_MINOR,FLUTTER_VERSION_PATCH,FLUTTER_VERSION_BUILD
#else
#define VERSION_AS_NUMBER 1,0,0,0
#endif

#if defined(FLUTTER_VERSION)
#define VERSION_AS_STRING FLUTTER_VERSION
#else
#define VERSION_AS_STRING "1.0.0"
#endif

VS_VERSION_INFO VERSIONINFO
 FILEVERSION VERSION_AS_NUMBER
 PRODUCTVERSION VERSION_AS_NUMBER
 FILEFLAGSMASK VS_FFI_FILEFLAGSMASK
#ifdef _DEBUG
 FILEFLAGS VS_FF_DEBUG
#else
 FILEFLAGS 0x0L
#endif
 FILEOS VOS__WINDOWS32
 FILETYPE VFT_APP
 FILESUBTYPE 0x0L
BEGIN
    BLOCK "StringFileInfo"
    BEGIN
        BLOCK "040904e4"
        BEGIN
            VALUE "CompanyName", "com.example" "\0"
            VALUE "FileDescription", "mechanic_mobile" "\0"
            VALUE "FileVersion", VERSION_AS_STRING "\0"
            VALUE "InternalName", "mechanic_mobile" "\0"
            VALUE "LegalCopyright", "Copyright (C) 2026 com.example. All rights reserved." "\0"
            VALUE "OriginalFilename", "mechanic_mobile.exe" "\0"
            VALUE "ProductName", "mechanic_mobile" "\0"
            VALUE "ProductVersion", VERSION_AS_STRING "\0"
        END
    END
    BLOCK "VarFileInfo"
    BEGIN
        VALUE "Translation", 0x409, 1252
    END
END

#endif    // English (United States) resources
/////////////////////////////////////////////////////////////////////////////



#ifndef APSTUDIO_INVOKED
/////////////////////////////////////////////////////////////////////////////
//
// Generated from the TEXTINCLUDE 3 resource.
//


/////////////////////////////////////////////////////////////////////////////
#endif    // not APSTUDIO_INVOKED
``

---

## mechanic_mobile/windows/runner/utils.cpp

``
#include "utils.h"

#include <flutter_windows.h>
#include <io.h>
#include <stdio.h>
#include <windows.h>

#include <iostream>

void CreateAndAttachConsole() {
  if (::AllocConsole()) {
    FILE *unused;
    if (freopen_s(&unused, "CONOUT$", "w", stdout)) {
      _dup2(_fileno(stdout), 1);
    }
    if (freopen_s(&unused, "CONOUT$", "w", stderr)) {
      _dup2(_fileno(stdout), 2);
    }
    std::ios::sync_with_stdio();
    FlutterDesktopResyncOutputStreams();
  }
}

std::vector<std::string> GetCommandLineArguments() {
  // Convert the UTF-16 command line arguments to UTF-8 for the Engine to use.
  int argc;
  wchar_t** argv = ::CommandLineToArgvW(::GetCommandLineW(), &argc);
  if (argv == nullptr) {
    return std::vector<std::string>();
  }

  std::vector<std::string> command_line_arguments;

  // Skip the first argument as it's the binary name.
  for (int i = 1; i < argc; i++) {
    command_line_arguments.push_back(Utf8FromUtf16(argv[i]));
  }

  ::LocalFree(argv);

  return command_line_arguments;
}

std::string Utf8FromUtf16(const wchar_t* utf16_string) {
  if (utf16_string == nullptr) {
    return std::string();
  }
  unsigned int target_length = ::WideCharToMultiByte(
      CP_UTF8, WC_ERR_INVALID_CHARS, utf16_string,
      -1, nullptr, 0, nullptr, nullptr)
    -1; // remove the trailing null character
  int input_length = (int)wcslen(utf16_string);
  std::string utf8_string;
  if (target_length == 0 || target_length > utf8_string.max_size()) {
    return utf8_string;
  }
  utf8_string.resize(target_length);
  int converted_length = ::WideCharToMultiByte(
      CP_UTF8, WC_ERR_INVALID_CHARS, utf16_string,
      input_length, utf8_string.data(), target_length, nullptr, nullptr);
  if (converted_length == 0) {
    return std::string();
  }
  return utf8_string;
}
``

---

## mechanic_mobile/windows/runner/utils.h

``
#ifndef RUNNER_UTILS_H_
#define RUNNER_UTILS_H_

#include <string>
#include <vector>

// Creates a console for the process, and redirects stdout and stderr to
// it for both the runner and the Flutter library.
void CreateAndAttachConsole();

// Takes a null-terminated wchar_t* encoded in UTF-16 and returns a std::string
// encoded in UTF-8. Returns an empty std::string on failure.
std::string Utf8FromUtf16(const wchar_t* utf16_string);

// Gets the command line arguments passed in as a std::vector<std::string>,
// encoded in UTF-8. Returns an empty std::vector<std::string> on failure.
std::vector<std::string> GetCommandLineArguments();

#endif  // RUNNER_UTILS_H_
``

---

## mechanic_mobile/windows/runner/win32_window.cpp

``
#include "win32_window.h"

#include <dwmapi.h>
#include <flutter_windows.h>

#include "resource.h"

namespace {

/// Window attribute that enables dark mode window decorations.
///
/// Redefined in case the developer's machine has a Windows SDK older than
/// version 10.0.22000.0.
/// See: https://docs.microsoft.com/windows/win32/api/dwmapi/ne-dwmapi-dwmwindowattribute
#ifndef DWMWA_USE_IMMERSIVE_DARK_MODE
#define DWMWA_USE_IMMERSIVE_DARK_MODE 20
#endif

constexpr const wchar_t kWindowClassName[] = L"FLUTTER_RUNNER_WIN32_WINDOW";

/// Registry key for app theme preference.
///
/// A value of 0 indicates apps should use dark mode. A non-zero or missing
/// value indicates apps should use light mode.
constexpr const wchar_t kGetPreferredBrightnessRegKey[] =
  L"Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize";
constexpr const wchar_t kGetPreferredBrightnessRegValue[] = L"AppsUseLightTheme";

// The number of Win32Window objects that currently exist.
static int g_active_window_count = 0;

using EnableNonClientDpiScaling = BOOL __stdcall(HWND hwnd);

// Scale helper to convert logical scaler values to physical using passed in
// scale factor
int Scale(int source, double scale_factor) {
  return static_cast<int>(source * scale_factor);
}

// Dynamically loads the |EnableNonClientDpiScaling| from the User32 module.
// This API is only needed for PerMonitor V1 awareness mode.
void EnableFullDpiSupportIfAvailable(HWND hwnd) {
  HMODULE user32_module = LoadLibraryA("User32.dll");
  if (!user32_module) {
    return;
  }
  auto enable_non_client_dpi_scaling =
      reinterpret_cast<EnableNonClientDpiScaling*>(
          GetProcAddress(user32_module, "EnableNonClientDpiScaling"));
  if (enable_non_client_dpi_scaling != nullptr) {
    enable_non_client_dpi_scaling(hwnd);
  }
  FreeLibrary(user32_module);
}

}  // namespace

// Manages the Win32Window's window class registration.
class WindowClassRegistrar {
 public:
  ~WindowClassRegistrar() = default;

  // Returns the singleton registrar instance.
  static WindowClassRegistrar* GetInstance() {
    if (!instance_) {
      instance_ = new WindowClassRegistrar();
    }
    return instance_;
  }

  // Returns the name of the window class, registering the class if it hasn't
  // previously been registered.
  const wchar_t* GetWindowClass();

  // Unregisters the window class. Should only be called if there are no
  // instances of the window.
  void UnregisterWindowClass();

 private:
  WindowClassRegistrar() = default;

  static WindowClassRegistrar* instance_;

  bool class_registered_ = false;
};

WindowClassRegistrar* WindowClassRegistrar::instance_ = nullptr;

const wchar_t* WindowClassRegistrar::GetWindowClass() {
  if (!class_registered_) {
    WNDCLASS window_class{};
    window_class.hCursor = LoadCursor(nullptr, IDC_ARROW);
    window_class.lpszClassName = kWindowClassName;
    window_class.style = CS_HREDRAW | CS_VREDRAW;
    window_class.cbClsExtra = 0;
    window_class.cbWndExtra = 0;
    window_class.hInstance = GetModuleHandle(nullptr);
    window_class.hIcon =
        LoadIcon(window_class.hInstance, MAKEINTRESOURCE(IDI_APP_ICON));
    window_class.hbrBackground = 0;
    window_class.lpszMenuName = nullptr;
    window_class.lpfnWndProc = Win32Window::WndProc;
    RegisterClass(&window_class);
    class_registered_ = true;
  }
  return kWindowClassName;
}

void WindowClassRegistrar::UnregisterWindowClass() {
  UnregisterClass(kWindowClassName, nullptr);
  class_registered_ = false;
}

Win32Window::Win32Window() {
  ++g_active_window_count;
}

Win32Window::~Win32Window() {
  --g_active_window_count;
  Destroy();
}

bool Win32Window::Create(const std::wstring& title,
                         const Point& origin,
                         const Size& size) {
  Destroy();

  const wchar_t* window_class =
      WindowClassRegistrar::GetInstance()->GetWindowClass();

  const POINT target_point = {static_cast<LONG>(origin.x),
                              static_cast<LONG>(origin.y)};
  HMONITOR monitor = MonitorFromPoint(target_point, MONITOR_DEFAULTTONEAREST);
  UINT dpi = FlutterDesktopGetDpiForMonitor(monitor);
  double scale_factor = dpi / 96.0;

  HWND window = CreateWindow(
      window_class, title.c_str(), WS_OVERLAPPEDWINDOW,
      Scale(origin.x, scale_factor), Scale(origin.y, scale_factor),
      Scale(size.width, scale_factor), Scale(size.height, scale_factor),
      nullptr, nullptr, GetModuleHandle(nullptr), this);

  if (!window) {
    return false;
  }

  UpdateTheme(window);

  return OnCreate();
}

bool Win32Window::Show() {
  return ShowWindow(window_handle_, SW_SHOWNORMAL);
}

// static
LRESULT CALLBACK Win32Window::WndProc(HWND const window,
                                      UINT const message,
                                      WPARAM const wparam,
                                      LPARAM const lparam) noexcept {
  if (message == WM_NCCREATE) {
    auto window_struct = reinterpret_cast<CREATESTRUCT*>(lparam);
    SetWindowLongPtr(window, GWLP_USERDATA,
                     reinterpret_cast<LONG_PTR>(window_struct->lpCreateParams));

    auto that = static_cast<Win32Window*>(window_struct->lpCreateParams);
    EnableFullDpiSupportIfAvailable(window);
    that->window_handle_ = window;
  } else if (Win32Window* that = GetThisFromHandle(window)) {
    return that->MessageHandler(window, message, wparam, lparam);
  }

  return DefWindowProc(window, message, wparam, lparam);
}

LRESULT
Win32Window::MessageHandler(HWND hwnd,
                            UINT const message,
                            WPARAM const wparam,
                            LPARAM const lparam) noexcept {
  switch (message) {
    case WM_DESTROY:
      window_handle_ = nullptr;
      Destroy();
      if (quit_on_close_) {
        PostQuitMessage(0);
      }
      return 0;

    case WM_DPICHANGED: {
      auto newRectSize = reinterpret_cast<RECT*>(lparam);
      LONG newWidth = newRectSize->right - newRectSize->left;
      LONG newHeight = newRectSize->bottom - newRectSize->top;

      SetWindowPos(hwnd, nullptr, newRectSize->left, newRectSize->top, newWidth,
                   newHeight, SWP_NOZORDER | SWP_NOACTIVATE);

      return 0;
    }
    case WM_SIZE: {
      RECT rect = GetClientArea();
      if (child_content_ != nullptr) {
        // Size and position the child window.
        MoveWindow(child_content_, rect.left, rect.top, rect.right - rect.left,
                   rect.bottom - rect.top, TRUE);
      }
      return 0;
    }

    case WM_ACTIVATE:
      if (child_content_ != nullptr) {
        SetFocus(child_content_);
      }
      return 0;

    case WM_DWMCOLORIZATIONCOLORCHANGED:
      UpdateTheme(hwnd);
      return 0;
  }

  return DefWindowProc(window_handle_, message, wparam, lparam);
}

void Win32Window::Destroy() {
  OnDestroy();

  if (window_handle_) {
    DestroyWindow(window_handle_);
    window_handle_ = nullptr;
  }
  if (g_active_window_count == 0) {
    WindowClassRegistrar::GetInstance()->UnregisterWindowClass();
  }
}

Win32Window* Win32Window::GetThisFromHandle(HWND const window) noexcept {
  return reinterpret_cast<Win32Window*>(
      GetWindowLongPtr(window, GWLP_USERDATA));
}

void Win32Window::SetChildContent(HWND content) {
  child_content_ = content;
  SetParent(content, window_handle_);
  RECT frame = GetClientArea();

  MoveWindow(content, frame.left, frame.top, frame.right - frame.left,
             frame.bottom - frame.top, true);

  SetFocus(child_content_);
}

RECT Win32Window::GetClientArea() {
  RECT frame;
  GetClientRect(window_handle_, &frame);
  return frame;
}

HWND Win32Window::GetHandle() {
  return window_handle_;
}

void Win32Window::SetQuitOnClose(bool quit_on_close) {
  quit_on_close_ = quit_on_close;
}

bool Win32Window::OnCreate() {
  // No-op; provided for subclasses.
  return true;
}

void Win32Window::OnDestroy() {
  // No-op; provided for subclasses.
}

void Win32Window::UpdateTheme(HWND const window) {
  DWORD light_mode;
  DWORD light_mode_size = sizeof(light_mode);
  LSTATUS result = RegGetValue(HKEY_CURRENT_USER, kGetPreferredBrightnessRegKey,
                               kGetPreferredBrightnessRegValue,
                               RRF_RT_REG_DWORD, nullptr, &light_mode,
                               &light_mode_size);

  if (result == ERROR_SUCCESS) {
    BOOL enable_dark_mode = light_mode == 0;
    DwmSetWindowAttribute(window, DWMWA_USE_IMMERSIVE_DARK_MODE,
                          &enable_dark_mode, sizeof(enable_dark_mode));
  }
}
``

---

## mechanic_mobile/windows/runner/win32_window.h

``
#ifndef RUNNER_WIN32_WINDOW_H_
#define RUNNER_WIN32_WINDOW_H_

#include <windows.h>

#include <functional>
#include <memory>
#include <string>

// A class abstraction for a high DPI-aware Win32 Window. Intended to be
// inherited from by classes that wish to specialize with custom
// rendering and input handling
class Win32Window {
 public:
  struct Point {
    unsigned int x;
    unsigned int y;
    Point(unsigned int x, unsigned int y) : x(x), y(y) {}
  };

  struct Size {
    unsigned int width;
    unsigned int height;
    Size(unsigned int width, unsigned int height)
        : width(width), height(height) {}
  };

  Win32Window();
  virtual ~Win32Window();

  // Creates a win32 window with |title| that is positioned and sized using
  // |origin| and |size|. New windows are created on the default monitor. Window
  // sizes are specified to the OS in physical pixels, hence to ensure a
  // consistent size this function will scale the inputted width and height as
  // as appropriate for the default monitor. The window is invisible until
  // |Show| is called. Returns true if the window was created successfully.
  bool Create(const std::wstring& title, const Point& origin, const Size& size);

  // Show the current window. Returns true if the window was successfully shown.
  bool Show();

  // Release OS resources associated with window.
  void Destroy();

  // Inserts |content| into the window tree.
  void SetChildContent(HWND content);

  // Returns the backing Window handle to enable clients to set icon and other
  // window properties. Returns nullptr if the window has been destroyed.
  HWND GetHandle();

  // If true, closing this window will quit the application.
  void SetQuitOnClose(bool quit_on_close);

  // Return a RECT representing the bounds of the current client area.
  RECT GetClientArea();

 protected:
  // Processes and route salient window messages for mouse handling,
  // size change and DPI. Delegates handling of these to member overloads that
  // inheriting classes can handle.
  virtual LRESULT MessageHandler(HWND window,
                                 UINT const message,
                                 WPARAM const wparam,
                                 LPARAM const lparam) noexcept;

  // Called when CreateAndShow is called, allowing subclass window-related
  // setup. Subclasses should return false if setup fails.
  virtual bool OnCreate();

  // Called when Destroy is called.
  virtual void OnDestroy();

 private:
  friend class WindowClassRegistrar;

  // OS callback called by message pump. Handles the WM_NCCREATE message which
  // is passed when the non-client area is being created and enables automatic
  // non-client DPI scaling so that the non-client area automatically
  // responds to changes in DPI. All other messages are handled by
  // MessageHandler.
  static LRESULT CALLBACK WndProc(HWND const window,
                                  UINT const message,
                                  WPARAM const wparam,
                                  LPARAM const lparam) noexcept;

  // Retrieves a class instance pointer for |window|
  static Win32Window* GetThisFromHandle(HWND const window) noexcept;

  // Update the window frame's theme to match the system theme.
  static void UpdateTheme(HWND const window);

  bool quit_on_close_ = false;

  // window handle for top level window.
  HWND window_handle_ = nullptr;

  // window handle for hosted content.
  HWND child_content_ = nullptr;
};

#endif  // RUNNER_WIN32_WINDOW_H_
``

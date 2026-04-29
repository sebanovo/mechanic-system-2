# Env, YAML y configuracion

Archivos de entorno, YAML/YML y configuracion general encontrados en el repositorio.

Generado: 2026-04-28 22:36:50
Total de archivos incluidos: 77

## Indice

- [.env](#env)
- [.env.prod](#envprod)
- [.env.sample](#envsample)
- [docker-compose.prod.yml](#docker-composeprodyml)
- [docker-compose.yml](#docker-composeyml)
- [docker.compose.prod.local.yml](#dockercomposeprodlocalyml)
- [mechanic_mobile/.dockerignore](#mechanicmobiledockerignore)
- [mechanic_mobile/.env.sample](#mechanicmobileenvsample)
- [mechanic_mobile/analysis_options.yaml](#mechanicmobileanalysisoptionsyaml)
- [mechanic_mobile/android/app/build.gradle.kts](#mechanicmobileandroidappbuildgradlekts)
- [mechanic_mobile/android/app/src/debug/AndroidManifest.xml](#mechanicmobileandroidappsrcdebugandroidmanifestxml)
- [mechanic_mobile/android/app/src/main/AndroidManifest.xml](#mechanicmobileandroidappsrcmainandroidmanifestxml)
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
- [mechanic_mobile/ios/Flutter/AppFrameworkInfo.plist](#mechanicmobileiosflutterappframeworkinfoplist)
- [mechanic_mobile/ios/Flutter/Debug.xcconfig](#mechanicmobileiosflutterdebugxcconfig)
- [mechanic_mobile/ios/Flutter/Release.xcconfig](#mechanicmobileiosflutterreleasexcconfig)
- [mechanic_mobile/ios/Runner.xcodeproj/project.xcworkspace/xcshareddata/IDEWorkspaceChecks.plist](#mechanicmobileiosrunnerxcodeprojprojectxcworkspacexcshareddataideworkspacechecksplist)
- [mechanic_mobile/ios/Runner.xcworkspace/xcshareddata/IDEWorkspaceChecks.plist](#mechanicmobileiosrunnerxcworkspacexcshareddataideworkspacechecksplist)
- [mechanic_mobile/ios/Runner/Assets.xcassets/AppIcon.appiconset/Contents.json](#mechanicmobileiosrunnerassetsxcassetsappiconappiconsetcontentsjson)
- [mechanic_mobile/ios/Runner/Assets.xcassets/LaunchImage.imageset/Contents.json](#mechanicmobileiosrunnerassetsxcassetslaunchimageimagesetcontentsjson)
- [mechanic_mobile/ios/Runner/Info.plist](#mechanicmobileiosrunnerinfoplist)
- [mechanic_mobile/linux/CMakeLists.txt](#mechanicmobilelinuxcmakeliststxt)
- [mechanic_mobile/linux/flutter/CMakeLists.txt](#mechanicmobilelinuxfluttercmakeliststxt)
- [mechanic_mobile/linux/runner/CMakeLists.txt](#mechanicmobilelinuxrunnercmakeliststxt)
- [mechanic_mobile/macos/Flutter/Flutter-Debug.xcconfig](#mechanicmobilemacosflutterflutter-debugxcconfig)
- [mechanic_mobile/macos/Flutter/Flutter-Release.xcconfig](#mechanicmobilemacosflutterflutter-releasexcconfig)
- [mechanic_mobile/macos/Runner.xcodeproj/project.xcworkspace/xcshareddata/IDEWorkspaceChecks.plist](#mechanicmobilemacosrunnerxcodeprojprojectxcworkspacexcshareddataideworkspacechecksplist)
- [mechanic_mobile/macos/Runner.xcworkspace/xcshareddata/IDEWorkspaceChecks.plist](#mechanicmobilemacosrunnerxcworkspacexcshareddataideworkspacechecksplist)
- [mechanic_mobile/macos/Runner/Assets.xcassets/AppIcon.appiconset/Contents.json](#mechanicmobilemacosrunnerassetsxcassetsappiconappiconsetcontentsjson)
- [mechanic_mobile/macos/Runner/Configs/AppInfo.xcconfig](#mechanicmobilemacosrunnerconfigsappinfoxcconfig)
- [mechanic_mobile/macos/Runner/Configs/Debug.xcconfig](#mechanicmobilemacosrunnerconfigsdebugxcconfig)
- [mechanic_mobile/macos/Runner/Configs/Release.xcconfig](#mechanicmobilemacosrunnerconfigsreleasexcconfig)
- [mechanic_mobile/macos/Runner/Configs/Warnings.xcconfig](#mechanicmobilemacosrunnerconfigswarningsxcconfig)
- [mechanic_mobile/macos/Runner/Info.plist](#mechanicmobilemacosrunnerinfoplist)
- [mechanic_mobile/nginx.conf](#mechanicmobilenginxconf)
- [mechanic_mobile/pubspec.lock](#mechanicmobilepubspeclock)
- [mechanic_mobile/pubspec.yaml](#mechanicmobilepubspecyaml)
- [mechanic_mobile/web_dev_config.yaml](#mechanicmobilewebdevconfigyaml)
- [mechanic_mobile/web/manifest.json](#mechanicmobilewebmanifestjson)
- [mechanic_mobile/windows/CMakeLists.txt](#mechanicmobilewindowscmakeliststxt)
- [mechanic_mobile/windows/flutter/CMakeLists.txt](#mechanicmobilewindowsfluttercmakeliststxt)
- [mechanic_mobile/windows/runner/CMakeLists.txt](#mechanicmobilewindowsrunnercmakeliststxt)
- [mechanic_mobile/windows/runner/Runner.rc](#mechanicmobilewindowsrunnerrunnerrc)
- [mechanic-api/.devcontainer/devcontainer.json](#mechanic-apidevcontainerdevcontainerjson)
- [mechanic-api/.devcontainer/Dockerfile](#mechanic-apidevcontainerdockerfile)
- [mechanic-api/Dockerfile.dev](#mechanic-apidockerfiledev)
- [mechanic-api/Dockerfile.prod](#mechanic-apidockerfileprod)
- [mechanic-api/Mechanic-System-Defense.postman_collection.json](#mechanic-apimechanic-system-defensepostmancollectionjson)
- [mechanic-web/.devcontainer/devcontainer.json](#mechanic-webdevcontainerdevcontainerjson)
- [mechanic-web/.devcontainer/Dockerfile](#mechanic-webdevcontainerdockerfile)
- [mechanic-web/.dockerignore](#mechanic-webdockerignore)
- [mechanic-web/.postcssrc.json](#mechanic-webpostcssrcjson)
- [mechanic-web/angular.json](#mechanic-webangularjson)
- [mechanic-web/components.json](#mechanic-webcomponentsjson)
- [mechanic-web/Dockerfile.dev](#mechanic-webdockerfiledev)
- [mechanic-web/Dockerfile.prod](#mechanic-webdockerfileprod)
- [mechanic-web/eslint.config.js](#mechanic-webeslintconfigjs)
- [mechanic-web/nginx.conf](#mechanic-webnginxconf)
- [mechanic-web/package-lock.json](#mechanic-webpackage-lockjson)
- [mechanic-web/package.json](#mechanic-webpackagejson)
- [mechanic-web/proxy.conf.json](#mechanic-webproxyconfjson)
- [mechanic-web/src/app/app.config.ts](#mechanic-websrcappappconfigts)
- [mechanic-web/tsconfig.app.json](#mechanic-webtsconfigappjson)
- [mechanic-web/tsconfig.json](#mechanic-webtsconfigjson)
- [mechanic-web/tsconfig.spec.json](#mechanic-webtsconfigspecjson)
- [nginx/default.conf](#nginxdefaultconf)
- [nginx/Dockerfile](#nginxdockerfile)

---

## .env

``dotenv
# ===============================
#  Environment
# ===============================
ENV_MODE=development

APP_NAME=Mechanic System API
APP_VERSION=0.1.0
API_V1_PREFIX=/api
LOG_LEVEL=INFO
CORS_ALLOW_ORIGINS=http://localhost:4200,http://127.0.0.1:4200
SQL_ECHO=false

# ===============================
#  PostgreSQL
# ===============================
POSTGRES_SERV=serv-mech-db

POSTGRES_DB=mechanic_db
POSTGRES_USER=mechanic_user
POSTGRES_PASSWORD=mechanic_password
POSTGRES_PORT=5432

POSTGRES_HOST_PORT=55432

# ===============================
#  Backend (FastAPI)
# ===============================
BACKEND_HOST=0.0.0.0
BACKEND_PORT=8000


# ===============================
#  Redis / Celery
# ===============================
REDIS_HOST=serv-mech-redis
REDIS_PORT=6379
REDIS_DB=0
CELERY_DEFAULT_QUEUE=default

# ===============================
#  Security
# ===============================
SECRET_KEY=mechanic_dev_secret_key_very_strong_2026
ACCESS_TOKEN_EXPIRE_MINUTES=60
JWT_ALGORITHM=HS256

# ===============================
#  Providers / Integrations
# ===============================
AI_PROVIDER=null
STORAGE_PROVIDER=local
SPEECH_TO_TEXT_PROVIDER=null
VISION_PROVIDER=null
LLM_PROVIDER=null
ROUTING_PROVIDER=null
PUSH_PROVIDER=null

# ===============================
#  Storage
# ===============================
STORAGE_PROVIDER=local


LOCAL_STORAGE_ROOT=/app/storage
MAX_UPLOAD_SIZE_BYTES=10485760

# S3
S3_BUCKET_NAME=
S3_REGION=
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
S3_ENDPOINT_URL=
S3_PUBLIC_BASE_URL=
S3_PRESIGNED_URL_EXPIRATION_SECONDS=900

# ===============================
#  External API placeholders
# ===============================
OPENROUTER_API_KEY=
GRAPHHOPPER_API_KEY=
MAPTILER_API_KEY=

# ===============================
#  Frontend
# ===============================
FRONTEND_PORT=4200

# ===============================
#  Whisper
# ===============================
SPEECH_TO_TEXT_PROVIDER=faster_whisper

FASTER_WHISPER_MODEL_SIZE=small
FASTER_WHISPER_DEVICE=cpu
FASTER_WHISPER_COMPUTE_TYPE=int8
FASTER_WHISPER_BEAM_SIZE=5
FASTER_WHISPER_VAD_FILTER=true
FASTER_WHISPER_WORD_TIMESTAMPS=true
FASTER_WHISPER_CONDITION_ON_PREVIOUS_TEXT=false
FASTER_WHISPER_LANGUAGE=
FASTER_WHISPER_DOWNLOAD_TIMEOUT_SECONDS=120

# ===============================
#  YOLO
# ===============================
VISION_PROVIDER=ultralytics_yolo

ULTRALYTICS_YOLO_MODEL=yolo11n.pt # Entrenar un modelo YOLO mejorado
ULTRALYTICS_YOLO_DEVICE=cpu
ULTRALYTICS_YOLO_CONFIDENCE_THRESHOLD=0.25
ULTRALYTICS_YOLO_IOU_THRESHOLD=0.45
ULTRALYTICS_YOLO_IMAGE_SIZE=640
ULTRALYTICS_YOLO_MAX_DETECTIONS=50

# ===============================
#  OpenRouter
# ===============================
LLM_PROVIDER=openrouter

OPENROUTER_API_KEY=
OPENROUTER_API_BASE_URL=https://openrouter.ai/api/v1
OPENROUTER_MODEL=openrouter/free  #openrouter/auto
OPENROUTER_FALLBACK_MODELS=
OPENROUTER_TEMPERATURE=0.2
OPENROUTER_MAX_TOKENS=350
OPENROUTER_HTTP_REFERER=
OPENROUTER_X_TITLE=Mechanic System
OPENROUTER_TIMEOUT_SECONDS=120
# Si quieres  fallback explícito entre modelos, pon:
# OPENROUTER_MODEL=openai/gpt-4o
# OPENROUTER_FALLBACK_MODELS=anthropic/claude-3.5-sonnet,openrouter/auto

# ===============================
#  GraphHopper
# ===============================
ROUTING_PROVIDER=graphhopper

GRAPHHOPPER_API_KEY=
GRAPHHOPPER_API_BASE_URL=https://graphhopper.com/api/1
GRAPHHOPPER_PROFILE=car
GRAPHHOPPER_TIMEOUT_SECONDS=60
GRAPHHOPPER_POINTS_ENCODED=true

FALLBACK_ROUTING_AVERAGE_SPEED_KMH=25

# ===============================
#  Push / Firebase FCM
# ===============================
PUSH_PROVIDER=firebase_fcm

FIREBASE_PROJECT_ID=mechanic-6494f
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@mechanic-6494f.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY_ID=97b8246914c82304e03ef15883af96b759ee7564
FIREBASE_CLIENT_ID=107568835557401647135
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_SERVICE_ACCOUNT_TYPE=service_account
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCl02gPFXJSTekr\nrCNJrV81uLJ2Zxj63q16ikxfDIklFNMF4vJLggzgGrrGrCkFeT8D7e0P5bXjKDhB\nsA/ybALUgHyvqytvhB3ht2AOu9BIS3UC9ZJMD/tuGGLSIQyk2N2TnuHEV/zoWrdZ\nC6nEg6hdauZeE6r5BJeCwUSljQ4b21E4QpFx5tzV1zIDX79eZtcLM0TrlNMeI5Zj\ndHziRLk81fRah8CwRfEXetOTzMRhQdFRRwLJYlkiKsScvRI0go7lVf3yJjwsD6r+\n64mUVoX/sMrg+VSbUz/4uIIOgde3Xr58c1CRoUCXPtjEssdqMfXAxR0OOSXW0P7l\nl8GX3T+xAgMBAAECggEAP+ctwS5THXuPwTg3axOoTrQL9gv5+OdqNABquPBEQ6l4\nPtr743RNEOnME3bR4h2c1p9QTWGJC+56a3n1U0cjeg+/vRS6CuH/f/XiSxs+gzWs\n9IR9Kdm4228DWhXJYRd/n/1I5JjByir3YBXaCPRxo/pnp1Zt+0O1PXrMQP4QM1Rc\n73wFf69aQUCHqT26QDB68pK7xQrmHmL2lUaa4zZyoVTnC3DZrehfx3mSLQA3pQ2d\n/PaTCCvgVBXRKxwTKE400o89wnpDxNUvWsRs612F9oOBT39SBTKLbJSAp9u9yy8p\nUywUR5vnSt1zMBA0E/EtAe7ZthIJIzkgJhVDXqampwKBgQDRuJ5uG/T6PWkLpeor\ncPJpjZZYYJUEzctrwC40Jk2VK/+G59L03KuIgq2SfYLNF9R5SiXbJRInIZ6Grsdr\nPPdK5WZE50vi7MMwUQ2mBlUICkONvLba2LOHLPv9SC0U4Jjcpcd7Blf4hnhPplHV\ngN0tEb7WIBPlTl/Z8DN76AfeMwKBgQDKaxcMsFuovadBEl6zNuQF5/zXYWM43rMC\nY4ZYNElEg7+m++DSjKm5BS44/1s8pw88rx/l4m4aUFHiUUNzlOh0EFtT4kgeSv3W\nzeuYsxCq/9t+iq007Hn6S8kI45Srahso4E1BxMIAhSJKMmEBHVVcuYwsJpKH0yO5\nSuiK61v+iwKBgQC47jFWKvTkzM4aZV2OnPRFu4J9v/zn1YixJTAY8EWtarTSgw30\nubnQkFr6OA7lR0QnCAlFqvTM6MpfPTPADmyJ8KszyzmRivG7Y13DrwXAJzzWeThM\n1pXIdxRljgWiyUJCHzU9+KQOFJV2ttSmjhF6spEzQ+oHZAsFpNfhRQPbHQKBgAoO\nd/6xZFxlz8Fz4DCXMYz5kZ5BwGQ67DnaJ/qJ3noA8ayiJvFO+7+tejZquWWyBxfE\nu5j4PvAfvXG5B9jeNQ5PIbpxK5QVtbbOVD4p51IXlBgdW62dchH1Ye+HHwPFKcRG\nIJB77geIlcOJ7TfY9Ty+GzC2WeFVpBi4mAUO3GsxAoGBALc3Xx0YwONDXkFCXZtn\neOi2hJQv4xI2BbIkBrPeJorxE41g4s8nIl8o9CeSoiA/xHeTCBkU+AUmeWqUkg9e\nnDAGfI2UdCf7aAq73t/sQov41YnRYaSork3kAaxXx/oJH2OwaPsIamFtevf+hXn/\n3sqH5bVMrPsKNQrO0F/iLo28\n-----END PRIVATE KEY-----\n"


# ===============================
#  Hardening / Observability
# ===============================
TRUSTED_HOSTS=localhost,127.0.0.1
DOCS_ENABLED_IN_PRODUCTION=false
SECURITY_HEADERS_ENABLED=true
HTTPS_REDIRECT_ENABLED=false
HSTS_MAX_AGE_SECONDS=31536000

REQUEST_ID_HEADER_NAME=X-Request-ID
RESPONSE_TIME_HEADER_NAME=X-Response-Time-Ms

AUDIT_HTTP_ENABLED=true
AUDIT_HTTP_METHODS=POST,PUT,PATCH,DELETE
AUDIT_EXCLUDED_PATHS=/docs,/redoc,/openapi.json,/api/system/health,/api/system/readiness

METRICS_SNAPSHOT_RETENTION_DAYS=30



DEMO_SEED_ENABLED=true
``

---

## .env.prod

``

``

---

## .env.sample

``
# ===============================
#  Environment
# ===============================
ENV_MODE=development

APP_NAME=Mechanic System API
APP_VERSION=0.1.0
API_V1_PREFIX=/api
LOG_LEVEL=INFO
CORS_ALLOW_ORIGINS=http://localhost:4200,http://127.0.0.1:4200,http://localhost:5200,http://127.0.0.1:5200
SQL_ECHO=false

# ===============================
#  PostgreSQL
# ===============================
POSTGRES_SERV=serv-mech-db
POSTGRES_DB=mechanic_db
POSTGRES_USER=mechanic_user
POSTGRES_PASSWORD=mechanic_password
POSTGRES_PORT=5432
POSTGRES_HOST_PORT=55432

# ===============================
#  Backend (FastAPI)
# ===============================
BACKEND_HOST=0.0.0.0
BACKEND_PORT=8000

# ===============================
#  Redis / Celery
# ===============================
REDIS_HOST=serv-mech-redis
REDIS_PORT=6379
REDIS_DB=0
CELERY_DEFAULT_QUEUE=default

# ===============================
#  Security
# ===============================
SECRET_KEY=mechanic_dev_secret_key_very_strong_2026
ACCESS_TOKEN_EXPIRE_MINUTES=60
JWT_ALGORITHM=HS256

# ===============================
#  Providers / Integrations
# ===============================
AI_PROVIDER=null
STORAGE_PROVIDER=local
SPEECH_TO_TEXT_PROVIDER=null
VISION_PROVIDER=null
LLM_PROVIDER=null
ROUTING_PROVIDER=null
PUSH_PROVIDER=null

# ===============================
#  Storage
# ===============================
STORAGE_PROVIDER=local


LOCAL_STORAGE_ROOT=/app/storage
MAX_UPLOAD_SIZE_BYTES=10485760

# ===============================
#  S3 placeholders
# ===============================
S3_BUCKET_NAME=
S3_REGION=
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
S3_ENDPOINT_URL=
S3_PUBLIC_BASE_URL=
S3_PRESIGNED_URL_EXPIRATION_SECONDS=900

# ===============================
#  External API placeholders
# ===============================
MAPTILER_API_KEY=

# ===============================
#  Initial Platform Admin
# ===============================
INITIAL_PLATFORM_ADMIN_EMAIL=admin@mechanic.local
INITIAL_PLATFORM_ADMIN_PASSWORD=Admin12345
INITIAL_PLATFORM_ADMIN_FIRST_NAME=Platform
INITIAL_PLATFORM_ADMIN_LAST_NAME=Admin
INITIAL_PLATFORM_ADMIN_PHONE=70000001

# ===============================
#  Frontend
# ===============================
FRONTEND_PORT= 4200

# ===============================
#  Whisper
# ===============================
SPEECH_TO_TEXT_PROVIDER=faster_whisper

FASTER_WHISPER_MODEL_SIZE=small
FASTER_WHISPER_DEVICE=cpu
FASTER_WHISPER_COMPUTE_TYPE=int8
FASTER_WHISPER_BEAM_SIZE=5
FASTER_WHISPER_VAD_FILTER=true
FASTER_WHISPER_WORD_TIMESTAMPS=true
FASTER_WHISPER_CONDITION_ON_PREVIOUS_TEXT=false
FASTER_WHISPER_LANGUAGE=
FASTER_WHISPER_DOWNLOAD_TIMEOUT_SECONDS=120

# ===============================
#  YOLO
# ===============================
VISION_PROVIDER=ultralytics_yolo

ULTRALYTICS_YOLO_MODEL=yolo11n.pt # Entrenar un modelo YOLO mejorado
ULTRALYTICS_YOLO_DEVICE=cpu
ULTRALYTICS_YOLO_CONFIDENCE_THRESHOLD=0.25
ULTRALYTICS_YOLO_IOU_THRESHOLD=0.45
ULTRALYTICS_YOLO_IMAGE_SIZE=640
ULTRALYTICS_YOLO_MAX_DETECTIONS=50

# ===============================
#  OpenRouter
# ===============================
LLM_PROVIDER=openrouter

OPENROUTER_API_KEY=apikeyReal:B
OPENROUTER_API_BASE_URL=https://openrouter.ai/api/v1
OPENROUTER_MODEL=openrouter/free  #openrouter/auto
OPENROUTER_FALLBACK_MODELS=
OPENROUTER_TEMPERATURE=0.2
OPENROUTER_MAX_TOKENS=350
OPENROUTER_HTTP_REFERER=
OPENROUTER_X_TITLE=
OPENROUTER_TIMEOUT_SECONDS=120
# Si quieres usar fallback explícito entre modelos, puedes poner algo así:
# OPENROUTER_MODEL=openai/gpt-4o
# OPENROUTER_FALLBACK_MODELS=anthropic/claude-3.5-sonnet,openrouter/auto

# ===============================
#  GraphHopper
# ===============================
ROUTING_PROVIDER=graphhopper

GRAPHHOPPER_API_KEY=tu_api_key_real
GRAPHHOPPER_API_BASE_URL=https://graphhopper.com/api/1
GRAPHHOPPER_PROFILE=car
GRAPHHOPPER_TIMEOUT_SECONDS=60
GRAPHHOPPER_POINTS_ENCODED=true

FALLBACK_ROUTING_AVERAGE_SPEED_KMH=25

# ===============================
#  Push / Firebase FCM
# ===============================
PUSH_PROVIDER=firebase_fcm

FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
FIREBASE_PRIVATE_KEY_ID=
FIREBASE_CLIENT_ID=
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_SERVICE_ACCOUNT_TYPE=service_account


# ===============================
#  Hardening / Observability
# ===============================
# TRUSTED_HOSTS=localhost,127.0.0.1
TRUSTED_HOSTS=*
DOCS_ENABLED_IN_PRODUCTION=false
SECURITY_HEADERS_ENABLED=true
HTTPS_REDIRECT_ENABLED=false
HSTS_MAX_AGE_SECONDS=31536000

REQUEST_ID_HEADER_NAME=X-Request-ID
RESPONSE_TIME_HEADER_NAME=X-Response-Time-Ms

AUDIT_HTTP_ENABLED=true
AUDIT_HTTP_METHODS=POST,PUT,PATCH,DELETE
AUDIT_EXCLUDED_PATHS=/docs,/redoc,/openapi.json,/api/system/health,/api/system/readiness

METRICS_SNAPSHOT_RETENTION_DAYS=30


DEMO_SEED_ENABLED=true
``

---

## docker-compose.prod.yml

``yaml
services:
  serv-mech-db:
    image: postgres:16
    restart: unless-stopped
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    expose:
      - "5432"
    volumes:
      - mech_db_data:/var/lib/postgresql/data
    networks:
      - mechanic-net
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
      interval: 10s
      timeout: 5s
      retries: 5

  serv-mech-redis:
    image: redis:7-alpine
    restart: unless-stopped
    command: ["redis-server", "--appendonly", "yes"]
    networks:
      - mechanic-net
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  serv-mech-api:
    image: sebastiandevjs/mech-api:1.0.0
    restart: unless-stopped
    env_file:
      - .env
    expose:
      - "8000"
    depends_on:
      serv-mech-db:
        condition: service_healthy
      serv-mech-redis:
        condition: service_healthy
    networks:
      - mechanic-net
    healthcheck:
      test:
        [
          "CMD", "python", "-c",
          "import urllib.request; urllib.request.urlopen('http://127.0.0.1:8000/api/system/health', timeout=5).read()"
        ]
      interval: 15s
      timeout: 5s
      retries: 10
      start_period: 15s

  serv-mech-worker:
    image: sebastiandevjs/mech-api:1.0.0  # misma imagen que api, distinto command
    restart: unless-stopped
    command: ["/app/scripts/start_worker.sh"]
    env_file:
      - .env
    volumes:
      - storage_data:/app/storage
    depends_on:
      serv-mech-db:
        condition: service_healthy
      serv-mech-redis:
        condition: service_healthy
    networks:
      - mechanic-net

  serv-mech-web:
    image: sebastiandevjs/mech-web:1.0.0
    restart: unless-stopped
    expose:
      - "80"
    depends_on:
      - serv-mech-api
    networks:
      - mechanic-net

  serv-mech-flutter-web:
    image: sebastiandevjs/mech-flutter-web:1.0.0
    restart: unless-stopped
    depends_on:
      - serv-mech-api
    networks:
      - mechanic-net

  serv-nginx:
    image: nginx:stable-alpine
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf:ro
      - ./nginx/certs:/etc/nginx/certs:ro
    depends_on:
      - serv-mech-web
      - serv-mech-api
      - serv-mech-flutter-web
    networks:
      - mechanic-net

volumes:
  mech_db_data:
  redis_data:
  storage_data:

networks:
  mechanic-net:
    name: mechanic-system_mechanic-net
    driver: bridge
``

---

## docker-compose.yml

``yaml
services:
  serv-mech-db:
    image: postgres:16
    restart: unless-stopped
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    #expose:
    #  - "5432"
    ports:
      - "${POSTGRES_HOST_PORT}:5432"
    volumes:
      - mech_db_data:/var/lib/postgresql/data
    networks:
      - mechanic-net
    healthcheck:
      test: [ "CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}" ]
      interval: 10s
      timeout: 5s
      retries: 5

  serv-mech-redis:
    image: redis:7-alpine
    restart: unless-stopped
    command: [ "redis-server", "--appendonly", "yes" ]
    networks:
      - mechanic-net
    volumes:
      - redis_data:/data
    healthcheck:
      test: [ "CMD", "redis-cli", "ping" ]
      interval: 10s
      timeout: 5s
      retries: 5

  serv-mech-api:
    build:
      context: ./mechanic-api
      dockerfile: Dockerfile.dev
    restart: unless-stopped
    env_file:
      - .env
    ports:
      - "${BACKEND_PORT}:8000"
    volumes:
      - ./mechanic-api:/app
    depends_on:
      serv-mech-db:
        condition: service_healthy
      serv-mech-redis:
        condition: service_healthy
    networks:
      - mechanic-net
    healthcheck:
      test:
        [
          "CMD",
          "python",
          "-c",
          "import urllib.request;
            urllib.request.urlopen('http://127.0.0.1:8000/api/system/health',
            timeout=5).read()",
        ]
      interval: 15s
      timeout: 5s
      retries: 10
      start_period: 10s

  serv-mech-worker:
    build:
      context: ./mechanic-api
      dockerfile: Dockerfile.dev
    restart: unless-stopped
    command: [ "/app/scripts/start_worker.sh" ]
    env_file:
      - .env
    volumes:
      - ./mechanic-api:/app
      - ./mechanic-api/storage:/app/storage
    depends_on:
      serv-mech-db:
        condition: service_healthy
      serv-mech-redis:
        condition: service_healthy
    networks:
      - mechanic-net

  serv-mech-web:
    build:
      context: ./mechanic-web
      dockerfile: Dockerfile.dev

    restart: unless-stopped
    depends_on:
      - serv-mech-api
    environment:
      # enables file watching via polling (for live reload)
      CHOKIDAR_USEPOLLING: "true"
    ports:
      - "${FRONTEND_PORT}:4200"
    volumes:
      - ./mechanic-web:/app
      - node_modules:/app/node_modules
    working_dir: /app
    networks:
      - mechanic-net

volumes:
  mech_db_data:
  redis_data:
  node_modules:

networks:
  mechanic-net:
    # custom network name (avoid auto-generated compose name)
    name: mechanic-system_mechanic-net
    driver: bridge
``

---

## docker.compose.prod.local.yml

``yaml
services:
  serv-mech-db:
    image: postgres:16
    restart: unless-stopped
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    expose:
      - "5432"
    volumes:
      - mech_db_data:/var/lib/postgresql/data
    networks:
      - mechanic-net
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
      interval: 10s
      timeout: 5s
      retries: 5

  serv-mech-redis:
    image: redis:7-alpine
    restart: unless-stopped
    command: ["redis-server", "--appendonly", "yes"]
    # Sin expose al host
    networks:
      - mechanic-net
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  serv-mech-api:
    build:
      context: ./mechanic-api
      dockerfile: Dockerfile.prod        # ← imagen optimizada, sin --reload
    restart: unless-stopped
    env_file:
      - .env
    expose:
      - "8000"                           # solo visible para nginx, no al host
    # Sin volume mount — el código va dentro de la imagen
    depends_on:
      serv-mech-db:
        condition: service_healthy
      serv-mech-redis:
        condition: service_healthy
    networks:
      - mechanic-net
    healthcheck:
      test:
        [
          "CMD", "python", "-c",
          "import urllib.request; urllib.request.urlopen('http://127.0.0.1:8000/api/system/health', timeout=5).read()"
        ]
      interval: 15s
      timeout: 5s
      retries: 10
      start_period: 15s

  serv-mech-worker:
    build:
      context: ./mechanic-api
      dockerfile: Dockerfile.prod        # misma imagen que la api
    restart: unless-stopped
    command: ["/app/scripts/start_worker.sh"]
    env_file:
      - .env
    volumes:
      - storage_data:/app/storage        # solo storage persiste, no el código
    depends_on:
      serv-mech-db:
        condition: service_healthy
      serv-mech-redis:
        condition: service_healthy
    networks:
      - mechanic-net

  serv-mech-web:
    build:
      context: ./mechanic-web
      dockerfile: Dockerfile.prod        # ng build → nginx:alpine, sin node
    restart: unless-stopped
    expose:
      - "80"                             # nginx externo accede por aquí
    # Sin volumes, sin CHOKIDAR, sin node_modules montado
    depends_on:
      - serv-mech-api
    networks:
      - mechanic-net
  
  serv-mech-flutter-web:
    build:
      context: ./mechanic_mobile
      dockerfile: Dockerfile.prod 
    restart: unless-stopped
    depends_on:
      - serv-mech-api
    networks:
      - mechanic-net


  serv-nginx:
    image: nginx:stable-alpine
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"                        # SSL en prod
    volumes:
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf:ro
      - ./nginx/certs:/etc/nginx/certs:ro   # tus certificados TLS
    depends_on:
      - serv-mech-web
      - serv-mech-api
      - serv-mech-flutter-web
    networks:
      - mechanic-net

volumes:
  mech_db_data:
  redis_data:
  storage_data:                          # node_modules eliminado — no aplica en prod

networks:
  mechanic-net:
    name: mechanic-system_mechanic-net
    driver: bridge
``

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

## mechanic_mobile/analysis_options.yaml

``yaml
include: package:flutter_lints/flutter.yaml
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

## mechanic-api/.devcontainer/devcontainer.json

``json
{
  "name": "mechanic-api-dev",
  "build": {
    "dockerfile": "Dockerfile"
  },
  "workspaceFolder": "/mechanic-api",
  "mounts": [
    "source=${localWorkspaceFolder},target=/mechanic-api,type=bind,consistency=cached"
  ],
  "forwardPorts": [8000],
  "runArgs": [
    "--network=mechanic-system_mechanic-net",
    "--env-file=../.env.sample",
    "--hostname=serv-mech-api"
  ],
  "customizations": {
    "vscode": {
      "extensions": [
        "ms-python.python",
        "ms-python.vscode-pylance",
        "ms-python.debugpy",
        "charliermarsh.ruff",
        "ms-python.black-formatter",
        "ms-azuretools.vscode-docker"
      ],
      "settings": {
        "python.defaultInterpreterPath": "/usr/local/bin/python",
        "python.analysis.typeCheckingMode": "basic",
        "editor.formatOnSave": true,
        "editor.codeActionsOnSave": {
          "source.organizeImports": "explicit"
        }
      }
    }
  },
  "postCreateCommand": "pip install --no-cache-dir -r requirements.txt",
  "remoteUser": "root"
}
``

---

## mechanic-api/.devcontainer/Dockerfile

``dockerfile
FROM python:3.12-slim

# Prevents Python from generating .pyc files inside the container.
ENV PYTHONDONTWRITEBYTECODE=1

# Ensures Python logs are printed immediately in Docker.
ENV PYTHONUNBUFFERED=1

WORKDIR /mechanic-api

# Basic tools for development:
# - build-essential: compile native dependencies if needed
# - git, curl: common developer tools
# - libpq-dev, postgresql-client: PostgreSQL support
# - netcat-openbsd: useful for connectivity checks
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    git \
    libpq-dev \
    netcat-openbsd \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Keeps the container ready for VS Code remote development.
CMD ["sleep", "infinity"]
``

---

## mechanic-api/Dockerfile.dev

``dockerfile
FROM python:3.12-slim

# Prevents Python from generating .pyc files.
ENV PYTHONDONTWRITEBYTECODE=1

# Ensures logs are shown immediately in Docker.
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# System dependencies commonly needed for PostgreSQL drivers
# and some Python packages with native extensions.
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

#RUN chmod +x /app/scripts/start.sh && chmod +x /app/scripts/start_worker.sh

RUN sed -i 's/\r$//' /app/scripts/start.sh \
    && sed -i 's/\r$//' /app/scripts/start_worker.sh \
    && chmod +x /app/scripts/start.sh /app/scripts/start_worker.sh

EXPOSE 8000

CMD ["/app/scripts/start.sh"]
``

---

## mechanic-api/Dockerfile.prod

``dockerfile
FROM python:3.12-slim AS builder

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /build

# build-essential y libpq-dev solo se necesitan para compilar
# extensiones nativas de algunos paquetes pip
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

# Instala en una carpeta aislada para copiarla limpiamente al runtime
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt

# ── Runtime stage ─────────────────────────────────────────────
FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Solo el runtime de postgres, sin compilador ni headers
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq5 \
    netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*

# Equivalente al COPY --from=builder del ejemplo de Spring:
# trae solo los paquetes pip ya instalados, sin build-essential
COPY --from=builder /install /usr/local

COPY . .

RUN chmod +x /app/scripts/start.sh && chmod +x /app/scripts/start_worker.sh

EXPOSE 8000

CMD ["/app/scripts/start.sh"]
``

---

## mechanic-api/Mechanic-System-Defense.postman_collection.json

``json
{
  "info": {
    "_postman_id": "mechanic-system-defense-collection",
    "name": "Mechanic System - Defense Flow",
    "description": "Colección de pruebas para defensa del backend FastAPI de emergencias vehiculares.",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "auth": {
    "type": "noauth"
  },
  "event": [
    {
      "listen": "test",
      "script": {
        "type": "text/javascript",
        "exec": [
          "pm.test('Response is JSON', function () {",
          "  pm.response.to.be.json;",
          "});"
        ]
      }
    }
  ],
  "item": [
    {
      "name": "01 System",
      "item": [
        {
          "name": "Health",
          "request": {
            "method": "GET",
            "header": [],
            "url": "{{base_url}}/system/health"
          },
          "event": [
            {
              "listen": "test",
              "script": {
                "type": "text/javascript",
                "exec": [
                  "pm.test('API health OK', function () {",
                  "  pm.response.to.have.status(200);",
                  "  const json = pm.response.json();",
                  "  pm.expect(json.success).to.eql(true);",
                  "});"
                ]
              }
            }
          ]
        },
        {
          "name": "Readiness",
          "request": {
            "method": "GET",
            "header": [],
            "url": "{{base_url}}/system/readiness"
          },
          "event": [
            {
              "listen": "test",
              "script": {
                "type": "text/javascript",
                "exec": [
                  "pm.test('API readiness OK', function () {",
                  "  pm.response.to.have.status(200);",
                  "});"
                ]
              }
            }
          ]
        },
        {
          "name": "Info",
          "request": {
            "method": "GET",
            "header": [],
            "url": "{{base_url}}/system/info"
          }
        }
      ]
    },
    {
      "name": "02 Auth",
      "item": [
        {
          "name": "Login Admin",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"{{admin_email}}\",\n  \"password\": \"{{admin_password}}\"\n}"
            },
            "url": "{{base_url}}/auth/login"
          },
          "event": [
            {
              "listen": "test",
              "script": {
                "type": "text/javascript",
                "exec": [
                  "const json = pm.response.json();",
                  "pm.test('Admin login OK', function () {",
                  "  pm.response.to.have.status(200);",
                  "  pm.expect(json.data.access_token).to.be.a('string');",
                  "});",
                  "pm.environment.set('admin_token', json.data.access_token);"
                ]
              }
            }
          ]
        },
        {
          "name": "Login Client",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"{{client_email}}\",\n  \"password\": \"{{client_password}}\"\n}"
            },
            "url": "{{base_url}}/auth/login"
          },
          "event": [
            {
              "listen": "test",
              "script": {
                "type": "text/javascript",
                "exec": [
                  "const json = pm.response.json();",
                  "pm.test('Client login OK', function () {",
                  "  pm.response.to.have.status(200);",
                  "  pm.expect(json.data.access_token).to.be.a('string');",
                  "});",
                  "pm.environment.set('client_token', json.data.access_token);"
                ]
              }
            }
          ]
        },
        {
          "name": "Login Provider",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"{{provider_email}}\",\n  \"password\": \"{{provider_password}}\"\n}"
            },
            "url": "{{base_url}}/auth/login"
          },
          "event": [
            {
              "listen": "test",
              "script": {
                "type": "text/javascript",
                "exec": [
                  "const json = pm.response.json();",
                  "pm.test('Provider login OK', function () {",
                  "  pm.response.to.have.status(200);",
                  "  pm.expect(json.data.access_token).to.be.a('string');",
                  "});",
                  "pm.environment.set('provider_token', json.data.access_token);"
                ]
              }
            }
          ]
        },
        {
          "name": "Login Technician",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"{{technician_email}}\",\n  \"password\": \"{{technician_password}}\"\n}"
            },
            "url": "{{base_url}}/auth/login"
          },
          "event": [
            {
              "listen": "test",
              "script": {
                "type": "text/javascript",
                "exec": [
                  "const json = pm.response.json();",
                  "pm.test('Technician login OK', function () {",
                  "  pm.response.to.have.status(200);",
                  "  pm.expect(json.data.access_token).to.be.a('string');",
                  "});",
                  "pm.environment.set('technician_token', json.data.access_token);"
                ]
              }
            }
          ]
        },
        {
          "name": "Me - Client",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{client_token}}"
              }
            ],
            "url": "{{base_url}}/auth/me"
          }
        }
      ]
    },
    {
      "name": "03 Client Flow",
      "item": [
        {
          "name": "List My Vehicles",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{client_token}}"
              }
            ],
            "url": "{{base_url}}/vehicles"
          },
          "event": [
            {
              "listen": "test",
              "script": {
                "type": "text/javascript",
                "exec": [
                  "const json = pm.response.json();",
                  "pm.test('Vehicles loaded', function () {",
                  "  pm.response.to.have.status(200);",
                  "  pm.expect(json.data).to.be.an('array');",
                  "});",
                  "if (json.data && json.data.length > 0) {",
                  "  pm.environment.set('vehicle_id', json.data[0].id);",
                  "}"
                ]
              }
            }
          ]
        },
        {
          "name": "List My Incidents",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{client_token}}"
              }
            ],
            "url": "{{base_url}}/incidents/me"
          },
          "event": [
            {
              "listen": "test",
              "script": {
                "type": "text/javascript",
                "exec": [
                  "const json = pm.response.json();",
                  "pm.test('Incidents loaded', function () {",
                  "  pm.response.to.have.status(200);",
                  "  pm.expect(json.data).to.be.an('array');",
                  "});",
                  "const accident = json.data.find(item => item.title && item.title.includes('INC_ACCIDENT_001'));",
                  "const overheating = json.data.find(item => item.title && item.title.includes('INC_OVERHEATING_001'));",
                  "const selected = accident || overheating || json.data[0];",
                  "if (selected) {",
                  "  pm.environment.set('incident_id', selected.id);",
                  "  pm.environment.set('provider_incident_id', selected.id);",
                  "}"
                ]
              }
            }
          ]
        },
        {
          "name": "Get My Incident",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{client_token}}"
              }
            ],
            "url": "{{base_url}}/incidents/me/{{incident_id}}"
          }
        },
        {
          "name": "Client Live Tracking",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{client_token}}"
              }
            ],
            "url": "{{base_url}}/tracking/client/incidents/{{incident_id}}/live"
          }
        },
        {
          "name": "Client Tracking History",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{client_token}}"
              }
            ],
            "url": "{{base_url}}/tracking/client/incidents/{{incident_id}}/history"
          }
        }
      ]
    },
    {
      "name": "04 Platform",
      "item": [
        {
          "name": "Platform Metrics",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{admin_token}}"
              }
            ],
            "url": "{{base_url}}/system/platform/metrics"
          }
        },
        {
          "name": "Audit Logs",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{admin_token}}"
              }
            ],
            "url": "{{base_url}}/audit/logs?limit=20&offset=0"
          }
        },
        {
          "name": "Metric Snapshots",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{admin_token}}"
              }
            ],
            "url": "{{base_url}}/audit/metric-snapshots?limit=20&offset=0"
          }
        },
        {
          "name": "Assignment Candidates for Incident",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{admin_token}}"
              }
            ],
            "url": "{{base_url}}/assignment/platform/incidents/{{incident_id}}/candidates"
          }
        },
        {
          "name": "Notifications Deliveries for Incident",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{admin_token}}"
              }
            ],
            "url": "{{base_url}}/notifications/platform/incidents/{{incident_id}}/deliveries"
          }
        }
      ]
    },
    {
      "name": "05 Provider Flow",
      "item": [
        {
          "name": "Available Assignment Candidates",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{provider_token}}"
              }
            ],
            "url": "{{base_url}}/assignment/provider/me/available"
          },
          "event": [
            {
              "listen": "test",
              "script": {
                "type": "text/javascript",
                "exec": [
                  "const json = pm.response.json();",
                  "pm.test('Provider candidates loaded', function () {",
                  "  pm.response.to.have.status(200);",
                  "});",
                  "if (json.data && json.data.length > 0) {",
                  "  pm.environment.set('candidate_id', json.data[0].id);",
                  "  if (json.data[0].incident_id) {",
                  "    pm.environment.set('provider_incident_id', json.data[0].incident_id);",
                  "  }",
                  "}"
                ]
              }
            }
          ]
        },
        {
          "name": "Active Provider Operations",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{provider_token}}"
              }
            ],
            "url": "{{base_url}}/operations/provider/me/active"
          },
          "event": [
            {
              "listen": "test",
              "script": {
                "type": "text/javascript",
                "exec": [
                  "const json = pm.response.json();",
                  "pm.test('Active operations loaded', function () {",
                  "  pm.response.to.have.status(200);",
                  "});",
                  "if (json.data && json.data.length > 0) {",
                  "  const first = json.data[0];",
                  "  const id = first.incident_id || first.id;",
                  "  if (id) pm.environment.set('provider_incident_id', id);",
                  "}"
                ]
              }
            }
          ]
        },
        {
          "name": "Provider Operation State",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{provider_token}}"
              }
            ],
            "url": "{{base_url}}/operations/provider/incidents/{{provider_incident_id}}/state"
          }
        },
        {
          "name": "Provider Tracking Live",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{provider_token}}"
              }
            ],
            "url": "{{base_url}}/tracking/provider/incidents/{{provider_incident_id}}/live"
          }
        },
        {
          "name": "Provider Billing",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{provider_token}}"
              }
            ],
            "url": "{{base_url}}/billing/provider/incidents/{{provider_incident_id}}"
          }
        },
        {
          "name": "Provider Finalize Pricing",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{provider_token}}"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"final_price_amount\": 350,\n  \"payment_method\": \"QR\",\n  \"mark_as_paid\": false,\n  \"payment_reference\": null,\n  \"note\": \"Precio final definido desde Postman para defensa.\"\n}"
            },
            "url": "{{base_url}}/billing/provider/incidents/{{provider_incident_id}}/finalize"
          }
        }
      ]
    },
    {
      "name": "06 Technician Mobile Flow",
      "item": [
        {
          "name": "Technician Profile",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{technician_token}}"
              }
            ],
            "url": "{{base_url}}/technician/me"
          },
          "event": [
            {
              "listen": "test",
              "script": {
                "type": "text/javascript",
                "exec": [
                  "const json = pm.response.json();",
                  "pm.test('Technician profile loaded', function () {",
                  "  pm.response.to.have.status(200);",
                  "});",
                  "if (json.data && json.data.id) {",
                  "  pm.environment.set('technician_id', json.data.id);",
                  "}"
                ]
              }
            }
          ]
        },
        {
          "name": "Technician Incidents",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{technician_token}}"
              }
            ],
            "url": "{{base_url}}/technician/me/incidents?active_only=false"
          },
          "event": [
            {
              "listen": "test",
              "script": {
                "type": "text/javascript",
                "exec": [
                  "const json = pm.response.json();",
                  "pm.test('Technician incidents loaded', function () {",
                  "  pm.response.to.have.status(200);",
                  "});",
                  "if (json.data && json.data.length > 0) {",
                  "  pm.environment.set('technician_incident_id', json.data[0].id);",
                  "  pm.environment.set('incident_id', json.data[0].id);",
                  "}"
                ]
              }
            }
          ]
        },
        {
          "name": "Technician Report Location",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{technician_token}}"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"latitude\": -17.8152,\n  \"longitude\": -63.1997,\n  \"accuracy_meters\": 8\n}"
            },
            "url": "{{base_url}}/technician/me/incidents/{{technician_incident_id}}/location"
          }
        },
        {
          "name": "Technician En Route",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{technician_token}}"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"note\": \"Técnico en camino desde Postman.\"\n}"
            },
            "url": "{{base_url}}/technician/me/incidents/{{technician_incident_id}}/en-route"
          }
        },
        {
          "name": "Technician Arrive",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{technician_token}}"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"note\": \"Técnico llegó al punto del incidente.\"\n}"
            },
            "url": "{{base_url}}/technician/me/incidents/{{technician_incident_id}}/arrive"
          }
        },
        {
          "name": "Technician Start",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{technician_token}}"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"note\": \"Se inicia revisión desde app móvil.\"\n}"
            },
            "url": "{{base_url}}/technician/me/incidents/{{technician_incident_id}}/start"
          }
        },
        {
          "name": "Technician Complete",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{technician_token}}"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"note\": \"Servicio completado desde Postman.\",\n  \"completion_summary\": \"El técnico completó la atención del incidente y dejó el caso listo para facturación.\"\n}"
            },
            "url": "{{base_url}}/technician/me/incidents/{{technician_incident_id}}/complete"
          }
        }
      ]
    },
    {
      "name": "07 Subscriptions",
      "item": [
        {
          "name": "My Client Subscriptions",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{client_token}}"
              }
            ],
            "url": "{{base_url}}/subscriptions/client/me/subscriptions"
          }
        },
        {
          "name": "Coverage Preview",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{client_token}}"
              }
            ],
            "url": "{{base_url}}/subscriptions/client/incidents/{{incident_id}}/coverage-preview"
          }
        },
        {
          "name": "Apply Coverage",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{client_token}}"
              }
            ],
            "url": "{{base_url}}/subscriptions/client/incidents/{{incident_id}}/apply-coverage"
          }
        }
      ]
    },
    {
      "name": "08 Billing and Mock Payment",
      "item": [
        {
          "name": "Client Billing",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{client_token}}"
              }
            ],
            "url": "{{base_url}}/billing/client/incidents/{{incident_id}}"
          }
        },
        {
          "name": "Create Mock Checkout",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{client_token}}"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"payment_method\": \"QR\",\n  \"return_url\": \"http://localhost:4200/payment/success\"\n}"
            },
            "url": "{{base_url}}/billing/client/incidents/{{incident_id}}/checkout"
          },
          "event": [
            {
              "listen": "test",
              "script": {
                "type": "text/javascript",
                "exec": [
                  "const json = pm.response.json();",
                  "pm.test('Mock checkout created', function () {",
                  "  pm.response.to.have.status(200);",
                  "});",
                  "if (json.data && json.data.checkout_reference) {",
                  "  pm.environment.set('checkout_reference', json.data.checkout_reference);",
                  "}"
                ]
              }
            }
          ]
        },
        {
          "name": "Simulate Payment Success",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{client_token}}"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"payment_reference\": \"PAGO-DEMO-POSTMAN-001\"\n}"
            },
            "url": "{{base_url}}/billing/client/incidents/{{incident_id}}/simulate-success"
          }
        }
      ]
    },
    {
      "name": "09 Ratings",
      "item": [
        {
          "name": "Create or Update Client Rating",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{client_token}}"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"rating_score\": 5,\n  \"punctuality_score\": 5,\n  \"service_quality_score\": 5,\n  \"communication_score\": 4,\n  \"comment\": \"El taller respondió rápido y resolvió el problema.\",\n  \"would_recommend\": true\n}"
            },
            "url": "{{base_url}}/ratings/client/incidents/{{incident_id}}"
          }
        },
        {
          "name": "Get Client Rating",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{client_token}}"
              }
            ],
            "url": "{{base_url}}/ratings/client/incidents/{{incident_id}}"
          }
        },
        {
          "name": "Provider Rating Stats",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{provider_token}}"
              }
            ],
            "url": "{{base_url}}/ratings/provider/me/stats"
          }
        },
        {
          "name": "Platform Ratings",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{admin_token}}"
              }
            ],
            "url": "{{base_url}}/ratings/platform?limit=20&offset=0"
          }
        }
      ]
    },
    {
      "name": "10 Notifications",
      "item": [
        {
          "name": "Register My Device Token",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{client_token}}"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"device_token\": \"postman-demo-device-token-client\",\n  \"device_platform\": \"ANDROID\",\n  \"device_label\": \"Postman Client Device\",\n  \"app_role\": \"CLIENT\"\n}"
            },
            "url": "{{base_url}}/notifications/me/devices/register"
          }
        },
        {
          "name": "List My Device Tokens",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{client_token}}"
              }
            ],
            "url": "{{base_url}}/notifications/me/devices"
          }
        }
      ]
    }
  ]
}
``

---

## mechanic-web/.devcontainer/devcontainer.json

``json
{
  "name": "mechanic-web-dev",
  "build": {
    "dockerfile": "Dockerfile"
  },
  "workspaceFolder": "/mechanic-web",
  "mounts": [
    "source=${localWorkspaceFolder},target=/mechanic-web,type=bind,consistency=cached"
  ],
  "forwardPorts": [4200],
  "runArgs": [
    "--network=mechanic-system_mechanic-net",
    "--env-file=../.env.sample",
    "--hostname=serv-mech-web"
  ],
  "customizations": {
    "vscode": {
      "extensions": [
        "angular.ng-template",
        "dbaeumer.vscode-eslint",
        "esbenp.prettier-vscode",
        "bradlc.vscode-tailwindcss",
        "ms-azuretools.vscode-docker"
      ],
      "settings": {
        "editor.formatOnSave": true,
        "editor.codeActionsOnSave": {
          "source.fixAll.eslint": "explicit",
          "source.organizeImports": "explicit"
        }
      }
    }
  },
  "postCreateCommand": "npm install",
  "remoteUser": "root"
}
``

---

## mechanic-web/.devcontainer/Dockerfile

``dockerfile
FROM mcr.microsoft.com/devcontainers/javascript-node:20

WORKDIR /mechanic-web

# Basic tools for frontend development and debugging.
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    curl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Angular CLI global
RUN npm install -g @angular/cli

# Keep the container alive for VS Code remote development.
CMD ["sleep", "infinity"]
``

---

## mechanic-web/.dockerignore

``
#ignore variables

node_modules/
``

---

## mechanic-web/.postcssrc.json

``json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
``

---

## mechanic-web/angular.json

``json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "cli": {
    "packageManager": "npm",
    "analytics": false,
    "schematicCollections": [
      "angular-eslint"
    ]
  },
  "newProjectRoot": "projects",
  "projects": {
    "mechanic-web": {
      "projectType": "application",
      "schematics": {},
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            "browser": "src/main.ts",
            "tsConfig": "tsconfig.app.json",
            "assets": [
              {
                "glob": "**/*",
                "input": "public"
              }
            ],
            "styles": [
              "src/styles.css"
            ]
          },
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "500kB",
                  "maximumError": "1MB"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "4kB",
                  "maximumError": "8kB"
                }
              ],
              "outputHashing": "all"
            },
            "development": {
              "optimization": false,
              "extractLicenses": false,
              "sourceMap": true
            }
          },
          "defaultConfiguration": "production"
        },
        "serve": {
          "options": {
            "poll": 500,
            "host": "0.0.0.0",
            "proxyConfig": "proxy.conf.json"
          },
          "builder": "@angular/build:dev-server",
          "configurations": {
            "production": {
              "buildTarget": "mechanic-web:build:production"
            },
            "development": {
              "buildTarget": "mechanic-web:build:development"
            }
          },
          "defaultConfiguration": "development"
        },
        "test": {
          "builder": "@angular/build:unit-test"
        },
        "lint": {
          "builder": "@angular-eslint/builder:lint",
          "options": {
            "lintFilePatterns": [
              "src/**/*.ts",
              "src/**/*.html"
            ]
          }
        }
      }
    }
  }
}
``

---

## mechanic-web/components.json

``json
{
	"componentsPath": "/src/app/shared/ui",
	"importAlias": "@shared/ui"
}
``

---

## mechanic-web/Dockerfile.dev

``dockerfile
FROM node:22-bookworm

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4200

CMD ["npm", "start"]
# CMD ["npm", "start", "--", "--host", "0.0.0.0", "--poll", "2000"]

``

---

## mechanic-web/Dockerfile.prod

``dockerfile
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:stable-alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist/mechanic-web/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
``

---

## mechanic-web/eslint.config.js

``javascript
// @ts-check
const eslint = require("@eslint/js");
const { defineConfig } = require("eslint/config");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = defineConfig([
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],

      eqeqeq: "error",  // Enforce using ""==="" instead of "=="
      curly: "error",   // Require curly braces {} for if, for,etc
      'no-eval': "error", // Disallow the use of eval()
      "no-implied-eval": "error",  // Disallow implied eval (like strings in setTimeout)

      // Disable the base ESLint rules for unused variables
      "no-unused-vars": "off",
      "no-shadow": "off",

      // Use TypeScript-specific rules instead
      "@typescript-eslint/no-unused-vars": "warn", // Warn when variables are declared but not used
      "@typescript-eslint/no-shadow": "warn",      // Warn when variable declarations shadow outer variables
      "@typescript-eslint/no-explicit-any": "warn", // Warn when using the 'any' type
      "@typescript-eslint/consistent-type-definitions": ["warn", "type"], // Prefer 'type' over 'interface'
      "@typescript-eslint/consistent-type-assertions": "warn", // Warn for inconsistent type assertions
      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        { "accessibility": "no-public" } // Require explicit accessibility, but allow omitting 'public'
      ],

      "complexity": ["error", 12], // Max cyclomatic complexity per function
      "max-lines": ["warn", 300], // Max lines per file
      "one-var": ["error", "never"], // One variable declaration per statement
      "prefer-const": "error", // Prefer const over let when variables are not reassigned

      "no-var": "error", // Disallow the use of 'var'; prefer 'let' or 'const'
      "prefer-arrow-callback": "error", // Prefer using arrow functions for callbacks
      "no-useless-concat": "error", // Disallow unnecessary string concatenation

      "@angular-eslint/no-empty-lifecycle-method": "warn", // Warn on empty Angular lifecycle methods
      "@angular-eslint/prefer-output-readonly": "warn", // Prefer @Output properties to be readonly
      "@angular-eslint/prefer-standalone": "warn", // Prefer standalone components over NgModules
      "@angular-eslint/prefer-signals": "warn" // Prefer using Angular signals when appropriate
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      angular.configs.templateRecommended,
      angular.configs.templateAccessibility,
    ],
    rules: {
      "@angular-eslint/template/eqeqeq": "error", // Enforce strict equality (===) in templates
      "@angular-eslint/template/use-track-by-function": "warn", // Warn if *ngFor lacks a trackBy function
      "@angular-eslint/template/cyclomatic-complexity": [
        "warn",
        { maxComplexity: 8 }  // Warn if template complexity > 8
      ], 
      "@angular-eslint/template/prefer-control-flow": "error", // Prefer *ngIf/*ngFor over complex expressions
      "@angular-eslint/template/prefer-ngsrc": "warn", // Prefer using NgSrc directive where applicable
      "@angular-eslint/template/prefer-self-closing-tags": "warn" // Prefer self-closing tags when possible
    },
  }
]);
``

---

## mechanic-web/nginx.conf

``
# Solo para angular
server {
    listen 80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}

# Sirve angular y actua como reverse proxy
# server {
#     listen 80;
#     server_name _;

#     root /usr/share/nginx/html;
#     index index.html;

#     client_max_body_size 20M;

#     location / {
#         try_files $uri $uri/ /index.html;
#     }

#     location /api/ {
#         proxy_pass http://serv-mech-api:8000;
#         proxy_http_version 1.1;

#         proxy_set_header Host $host;
#         proxy_set_header X-Real-IP $remote_addr;
#         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
#         proxy_set_header X-Forwarded-Proto $scheme;
#     }
# }


``

---

## mechanic-web/package-lock.json

``json
{
	"name": "mechanic-web",
	"version": "0.0.0",
	"lockfileVersion": 3,
	"requires": true,
	"packages": {
		"": {
			"name": "mechanic-web",
			"version": "0.0.0",
			"dependencies": {
				"@angular/cdk": "21.0.0",
				"@angular/common": "^21.2.0",
				"@angular/compiler": "^21.2.0",
				"@angular/core": "^21.2.0",
				"@angular/forms": "^21.2.0",
				"@angular/platform-browser": "^21.2.0",
				"@angular/router": "^21.2.0",
				"@ng-icons/core": ">=32.0.0 <34.0.0",
				"@ng-icons/lucide": ">=32.0.0 <34.0.0",
				"@ng-icons/remixicon": "^33.2.2",
				"@spartan-ng/brain": "^0.0.1-alpha.676",
				"class-variance-authority": "^0.7.0",
				"clsx": "^2.1.1",
				"rxjs": "~7.8.0",
				"tailwind-merge": "^3.5.0",
				"tailwindcss": "^4.2.2",
				"tslib": "^2.3.0"
			},
			"devDependencies": {
				"@angular/build": "^21.2.3",
				"@angular/cli": "^21.2.3",
				"@angular/compiler-cli": "^21.2.0",
				"@eslint/js": "^10.0.1",
				"@spartan-ng/cli": "^0.0.1-alpha.676",
				"@tailwindcss/postcss": "^4.2.2",
				"angular-eslint": "21.3.1",
				"eslint": "^10.0.3",
				"eslint-config-prettier": "^10.1.8",
				"eslint-plugin-prettier": "^5.5.5",
				"jsdom": "^28.0.0",
				"msw": "^2.12.14",
				"postcss": "^8.5.8",
				"prettier": "^3.8.1",
				"prettier-plugin-tailwindcss": "^0.7.2",
				"tw-animate-css": "^1.4.0",
				"typescript": "~5.9.2",
				"typescript-eslint": "8.56.1",
				"vitest": "^4.0.8"
			}
		},
		"node_modules/@acemir/cssom": {
			"version": "0.9.31",
			"resolved": "https://registry.npmjs.org/@acemir/cssom/-/cssom-0.9.31.tgz",
			"integrity": "sha512-ZnR3GSaH+/vJ0YlHau21FjfLYjMpYVIzTD8M8vIEQvIGxeOXyXdzCI140rrCY862p/C/BbzWsjc1dgnM9mkoTA==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@algolia/abtesting": {
			"version": "1.14.1",
			"resolved": "https://registry.npmjs.org/@algolia/abtesting/-/abtesting-1.14.1.tgz",
			"integrity": "sha512-Dkj0BgPiLAaim9sbQ97UKDFHJE/880wgStAM18U++NaJ/2Cws34J5731ovJifr6E3Pv4T2CqvMXf8qLCC417Ew==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@algolia/client-common": "5.48.1",
				"@algolia/requester-browser-xhr": "5.48.1",
				"@algolia/requester-fetch": "5.48.1",
				"@algolia/requester-node-http": "5.48.1"
			},
			"engines": {
				"node": ">= 14.0.0"
			}
		},
		"node_modules/@algolia/client-abtesting": {
			"version": "5.48.1",
			"resolved": "https://registry.npmjs.org/@algolia/client-abtesting/-/client-abtesting-5.48.1.tgz",
			"integrity": "sha512-LV5qCJdj+/m9I+Aj91o+glYszrzd7CX6NgKaYdTOj4+tUYfbS62pwYgUfZprYNayhkQpVFcrW8x8ZlIHpS23Vw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@algolia/client-common": "5.48.1",
				"@algolia/requester-browser-xhr": "5.48.1",
				"@algolia/requester-fetch": "5.48.1",
				"@algolia/requester-node-http": "5.48.1"
			},
			"engines": {
				"node": ">= 14.0.0"
			}
		},
		"node_modules/@algolia/client-analytics": {
			"version": "5.48.1",
			"resolved": "https://registry.npmjs.org/@algolia/client-analytics/-/client-analytics-5.48.1.tgz",
			"integrity": "sha512-/AVoMqHhPm14CcHq7mwB+bUJbfCv+jrxlNvRjXAuO+TQa+V37N8k1b0ijaRBPdmSjULMd8KtJbQyUyabXOu6Kg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@algolia/client-common": "5.48.1",
				"@algolia/requester-browser-xhr": "5.48.1",
				"@algolia/requester-fetch": "5.48.1",
				"@algolia/requester-node-http": "5.48.1"
			},
			"engines": {
				"node": ">= 14.0.0"
			}
		},
		"node_modules/@algolia/client-common": {
			"version": "5.48.1",
			"resolved": "https://registry.npmjs.org/@algolia/client-common/-/client-common-5.48.1.tgz",
			"integrity": "sha512-VXO+qu2Ep6ota28ktvBm3sG53wUHS2n7bgLWmce5jTskdlCD0/JrV4tnBm1l7qpla1CeoQb8D7ShFhad+UoSOw==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 14.0.0"
			}
		},
		"node_modules/@algolia/client-insights": {
			"version": "5.48.1",
			"resolved": "https://registry.npmjs.org/@algolia/client-insights/-/client-insights-5.48.1.tgz",
			"integrity": "sha512-zl+Qyb0nLg+Y5YvKp1Ij+u9OaPaKg2/EPzTwKNiVyOHnQJlFxmXyUZL1EInczAZsEY8hVpPCLtNfhMhfxluXKQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@algolia/client-common": "5.48.1",
				"@algolia/requester-browser-xhr": "5.48.1",
				"@algolia/requester-fetch": "5.48.1",
				"@algolia/requester-node-http": "5.48.1"
			},
			"engines": {
				"node": ">= 14.0.0"
			}
		},
		"node_modules/@algolia/client-personalization": {
			"version": "5.48.1",
			"resolved": "https://registry.npmjs.org/@algolia/client-personalization/-/client-personalization-5.48.1.tgz",
			"integrity": "sha512-r89Qf9Oo9mKWQXumRu/1LtvVJAmEDpn8mHZMc485pRfQUMAwSSrsnaw1tQ3sszqzEgAr1c7rw6fjBI+zrAXTOw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@algolia/client-common": "5.48.1",
				"@algolia/requester-browser-xhr": "5.48.1",
				"@algolia/requester-fetch": "5.48.1",
				"@algolia/requester-node-http": "5.48.1"
			},
			"engines": {
				"node": ">= 14.0.0"
			}
		},
		"node_modules/@algolia/client-query-suggestions": {
			"version": "5.48.1",
			"resolved": "https://registry.npmjs.org/@algolia/client-query-suggestions/-/client-query-suggestions-5.48.1.tgz",
			"integrity": "sha512-TPKNPKfghKG/bMSc7mQYD9HxHRUkBZA4q1PEmHgICaSeHQscGqL4wBrKkhfPlDV1uYBKW02pbFMUhsOt7p4ZpA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@algolia/client-common": "5.48.1",
				"@algolia/requester-browser-xhr": "5.48.1",
				"@algolia/requester-fetch": "5.48.1",
				"@algolia/requester-node-http": "5.48.1"
			},
			"engines": {
				"node": ">= 14.0.0"
			}
		},
		"node_modules/@algolia/client-search": {
			"version": "5.48.1",
			"resolved": "https://registry.npmjs.org/@algolia/client-search/-/client-search-5.48.1.tgz",
			"integrity": "sha512-4Fu7dnzQyQmMFknYwTiN/HxPbH4DyxvQ1m+IxpPp5oslOgz8m6PG5qhiGbqJzH4HiT1I58ecDiCAC716UyVA8Q==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@algolia/client-common": "5.48.1",
				"@algolia/requester-browser-xhr": "5.48.1",
				"@algolia/requester-fetch": "5.48.1",
				"@algolia/requester-node-http": "5.48.1"
			},
			"engines": {
				"node": ">= 14.0.0"
			}
		},
		"node_modules/@algolia/ingestion": {
			"version": "1.48.1",
			"resolved": "https://registry.npmjs.org/@algolia/ingestion/-/ingestion-1.48.1.tgz",
			"integrity": "sha512-/RFq3TqtXDUUawwic/A9xylA2P3LDMO8dNhphHAUOU51b1ZLHrmZ6YYJm3df1APz7xLY1aht6okCQf+/vmrV9w==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@algolia/client-common": "5.48.1",
				"@algolia/requester-browser-xhr": "5.48.1",
				"@algolia/requester-fetch": "5.48.1",
				"@algolia/requester-node-http": "5.48.1"
			},
			"engines": {
				"node": ">= 14.0.0"
			}
		},
		"node_modules/@algolia/monitoring": {
			"version": "1.48.1",
			"resolved": "https://registry.npmjs.org/@algolia/monitoring/-/monitoring-1.48.1.tgz",
			"integrity": "sha512-Of0jTeAZRyRhC7XzDSjJef0aBkgRcvRAaw0ooYRlOw57APii7lZdq+layuNdeL72BRq1snaJhoMMwkmLIpJScw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@algolia/client-common": "5.48.1",
				"@algolia/requester-browser-xhr": "5.48.1",
				"@algolia/requester-fetch": "5.48.1",
				"@algolia/requester-node-http": "5.48.1"
			},
			"engines": {
				"node": ">= 14.0.0"
			}
		},
		"node_modules/@algolia/recommend": {
			"version": "5.48.1",
			"resolved": "https://registry.npmjs.org/@algolia/recommend/-/recommend-5.48.1.tgz",
			"integrity": "sha512-bE7JcpFXzxF5zHwj/vkl2eiCBvyR1zQ7aoUdO+GDXxGp0DGw7nI0p8Xj6u8VmRQ+RDuPcICFQcCwRIJT5tDJFw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@algolia/client-common": "5.48.1",
				"@algolia/requester-browser-xhr": "5.48.1",
				"@algolia/requester-fetch": "5.48.1",
				"@algolia/requester-node-http": "5.48.1"
			},
			"engines": {
				"node": ">= 14.0.0"
			}
		},
		"node_modules/@algolia/requester-browser-xhr": {
			"version": "5.48.1",
			"resolved": "https://registry.npmjs.org/@algolia/requester-browser-xhr/-/requester-browser-xhr-5.48.1.tgz",
			"integrity": "sha512-MK3wZ2koLDnvH/AmqIF1EKbJlhRS5j74OZGkLpxI4rYvNi9Jn/C7vb5DytBnQ4KUWts7QsmbdwHkxY5txQHXVw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@algolia/client-common": "5.48.1"
			},
			"engines": {
				"node": ">= 14.0.0"
			}
		},
		"node_modules/@algolia/requester-fetch": {
			"version": "5.48.1",
			"resolved": "https://registry.npmjs.org/@algolia/requester-fetch/-/requester-fetch-5.48.1.tgz",
			"integrity": "sha512-2oDT43Y5HWRSIQMPQI4tA/W+TN/N2tjggZCUsqQV440kxzzoPGsvv9QP1GhQ4CoDa+yn6ygUsGp6Dr+a9sPPSg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@algolia/client-common": "5.48.1"
			},
			"engines": {
				"node": ">= 14.0.0"
			}
		},
		"node_modules/@algolia/requester-node-http": {
			"version": "5.48.1",
			"resolved": "https://registry.npmjs.org/@algolia/requester-node-http/-/requester-node-http-5.48.1.tgz",
			"integrity": "sha512-xcaCqbhupVWhuBP1nwbk1XNvwrGljozutEiLx06mvqDf3o8cHyEgQSHS4fKJM+UAggaWVnnFW+Nne5aQ8SUJXg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@algolia/client-common": "5.48.1"
			},
			"engines": {
				"node": ">= 14.0.0"
			}
		},
		"node_modules/@alloc/quick-lru": {
			"version": "5.2.0",
			"resolved": "https://registry.npmjs.org/@alloc/quick-lru/-/quick-lru-5.2.0.tgz",
			"integrity": "sha512-UrcABB+4bUrFABwbluTIBErXwvbsU/V7TZWfmbgJfbkwiBuziS9gxdODUyuiecfdGQ85jglMW6juS3+z5TsKLw==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=10"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/@ampproject/remapping": {
			"version": "2.3.0",
			"resolved": "https://registry.npmjs.org/@ampproject/remapping/-/remapping-2.3.0.tgz",
			"integrity": "sha512-30iZtAPgz+LTIYoeivqYo853f02jBYSd5uGnGpkFV0M3xOt9aN73erkgYAmZU43x4VfqcnLxW9Kpg3R5LC4YYw==",
			"dev": true,
			"license": "Apache-2.0",
			"dependencies": {
				"@jridgewell/gen-mapping": "^0.3.5",
				"@jridgewell/trace-mapping": "^0.3.24"
			},
			"engines": {
				"node": ">=6.0.0"
			}
		},
		"node_modules/@angular-devkit/architect": {
			"version": "0.2102.6",
			"resolved": "https://registry.npmjs.org/@angular-devkit/architect/-/architect-0.2102.6.tgz",
			"integrity": "sha512-h4qybKypR7OuwcTHPQI1zRm7abXgmPiV49vI2UeMtVVY/GKzru9gMexcYmWabzEyBY8w6VSfWjV2X+eit2EhDQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@angular-devkit/core": "21.2.6",
				"rxjs": "7.8.2"
			},
			"bin": {
				"architect": "bin/cli.js"
			},
			"engines": {
				"node": "^20.19.0 || ^22.12.0 || >=24.0.0",
				"npm": "^6.11.0 || ^7.5.6 || >=8.0.0",
				"yarn": ">= 1.13.0"
			}
		},
		"node_modules/@angular-devkit/core": {
			"version": "21.2.6",
			"resolved": "https://registry.npmjs.org/@angular-devkit/core/-/core-21.2.6.tgz",
			"integrity": "sha512-u5gPTAY7MC02uACQE39xxiFcm1hslF+ih/f2borMWnhER0JNTpHjLiLRXFkq7or7+VVHU30zfhK4XNAuO4WTIg==",
			"license": "MIT",
			"dependencies": {
				"ajv": "8.18.0",
				"ajv-formats": "3.0.1",
				"jsonc-parser": "3.3.1",
				"picomatch": "4.0.4",
				"rxjs": "7.8.2",
				"source-map": "0.7.6"
			},
			"engines": {
				"node": "^20.19.0 || ^22.12.0 || >=24.0.0",
				"npm": "^6.11.0 || ^7.5.6 || >=8.0.0",
				"yarn": ">= 1.13.0"
			},
			"peerDependencies": {
				"chokidar": "^5.0.0"
			},
			"peerDependenciesMeta": {
				"chokidar": {
					"optional": true
				}
			}
		},
		"node_modules/@angular-devkit/schematics": {
			"version": "21.2.6",
			"resolved": "https://registry.npmjs.org/@angular-devkit/schematics/-/schematics-21.2.6.tgz",
			"integrity": "sha512-hk2duJlPJyiMaI9MVWA5XpmlpD9C4n8qgquV/MJ7/n+ZRSwW3w1ndL5qUmA1ki+4Da54v/Rc8Wt5tUS955+93w==",
			"license": "MIT",
			"dependencies": {
				"@angular-devkit/core": "21.2.6",
				"jsonc-parser": "3.3.1",
				"magic-string": "0.30.21",
				"ora": "9.3.0",
				"rxjs": "7.8.2"
			},
			"engines": {
				"node": "^20.19.0 || ^22.12.0 || >=24.0.0",
				"npm": "^6.11.0 || ^7.5.6 || >=8.0.0",
				"yarn": ">= 1.13.0"
			}
		},
		"node_modules/@angular-eslint/builder": {
			"version": "21.3.1",
			"resolved": "https://registry.npmjs.org/@angular-eslint/builder/-/builder-21.3.1.tgz",
			"integrity": "sha512-1f1Lyp5e7OH6txiV224HaY3G1uRCj91OSKq7hT2Vw9NRw6zWFc1anBpDeLVjpL9ptUxzUGIQR5jEV54hOPayoQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@angular-devkit/architect": ">= 0.2100.0 < 0.2200.0",
				"@angular-devkit/core": ">= 21.0.0 < 22.0.0"
			},
			"peerDependencies": {
				"@angular/cli": ">= 21.0.0 < 22.0.0",
				"eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
				"typescript": "*"
			}
		},
		"node_modules/@angular-eslint/bundled-angular-compiler": {
			"version": "21.3.1",
			"resolved": "https://registry.npmjs.org/@angular-eslint/bundled-angular-compiler/-/bundled-angular-compiler-21.3.1.tgz",
			"integrity": "sha512-jjbnJPUXQeQBJ8RM+ahlbt4GH2emVN8JvG3AhFbPci1FrqXi9cOOfkbwLmvpoyTli4LF8gy7g4ctFqnlRgqryw==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@angular-eslint/eslint-plugin": {
			"version": "21.3.1",
			"resolved": "https://registry.npmjs.org/@angular-eslint/eslint-plugin/-/eslint-plugin-21.3.1.tgz",
			"integrity": "sha512-08NNTxwawRLTWPLl8dg1BnXMwimx93y4wMEwx2aWQpJbIt4pmNvwJzd+NgoD/Ag2VdLS/gOMadhJH5fgaYKsPQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@angular-eslint/bundled-angular-compiler": "21.3.1",
				"@angular-eslint/utils": "21.3.1",
				"ts-api-utils": "^2.1.0"
			},
			"peerDependencies": {
				"@typescript-eslint/utils": "^7.11.0 || ^8.0.0",
				"eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
				"typescript": "*"
			}
		},
		"node_modules/@angular-eslint/eslint-plugin-template": {
			"version": "21.3.1",
			"resolved": "https://registry.npmjs.org/@angular-eslint/eslint-plugin-template/-/eslint-plugin-template-21.3.1.tgz",
			"integrity": "sha512-ndPWJodkcEOu2PVUxlUwyz4D2u3r9KO7veWmStVNOLeNrICJA+nQvrz2BWCu0l48rO0K5ezsy0JFcQDVwE/5mw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@angular-eslint/bundled-angular-compiler": "21.3.1",
				"@angular-eslint/utils": "21.3.1",
				"aria-query": "5.3.2",
				"axobject-query": "4.1.0"
			},
			"peerDependencies": {
				"@angular-eslint/template-parser": "21.3.1",
				"@typescript-eslint/types": "^7.11.0 || ^8.0.0",
				"@typescript-eslint/utils": "^7.11.0 || ^8.0.0",
				"eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
				"typescript": "*"
			}
		},
		"node_modules/@angular-eslint/schematics": {
			"version": "21.3.1",
			"resolved": "https://registry.npmjs.org/@angular-eslint/schematics/-/schematics-21.3.1.tgz",
			"integrity": "sha512-1U2u4ZsZvwT30aXRLsIJf6tULIiioo9BtASNsldpYecU3/m/1+F61lCYG79qt7YWbif9KABPYZlFTJUFGN8HWA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@angular-devkit/core": ">= 21.0.0 < 22.0.0",
				"@angular-devkit/schematics": ">= 21.0.0 < 22.0.0",
				"@angular-eslint/eslint-plugin": "21.3.1",
				"@angular-eslint/eslint-plugin-template": "21.3.1",
				"ignore": "7.0.5",
				"semver": "7.7.4",
				"strip-json-comments": "3.1.1"
			},
			"peerDependencies": {
				"@angular/cli": ">= 21.0.0 < 22.0.0"
			}
		},
		"node_modules/@angular-eslint/template-parser": {
			"version": "21.3.1",
			"resolved": "https://registry.npmjs.org/@angular-eslint/template-parser/-/template-parser-21.3.1.tgz",
			"integrity": "sha512-moERVCTekQKOvR8RMuEOtWSO3VS1qrzA3keI1dPto/JVB8Nqp9w3R5ZpEoXHzh4zgEryosxmPgdi6UczJe2ouQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@angular-eslint/bundled-angular-compiler": "21.3.1",
				"eslint-scope": "9.1.2"
			},
			"peerDependencies": {
				"eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
				"typescript": "*"
			}
		},
		"node_modules/@angular-eslint/utils": {
			"version": "21.3.1",
			"resolved": "https://registry.npmjs.org/@angular-eslint/utils/-/utils-21.3.1.tgz",
			"integrity": "sha512-Q3SGA1/36phZhmsp1mYrKzp/jcmqofRr861MYn46FaWIKSYXBYRzl+H3FIJKBu5CE36Bggu6hbNpwGPuUp+MCg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@angular-eslint/bundled-angular-compiler": "21.3.1"
			},
			"peerDependencies": {
				"@typescript-eslint/utils": "^7.11.0 || ^8.0.0",
				"eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
				"typescript": "*"
			}
		},
		"node_modules/@angular/build": {
			"version": "21.2.6",
			"resolved": "https://registry.npmjs.org/@angular/build/-/build-21.2.6.tgz",
			"integrity": "sha512-PJltYl9/INfz8nZ/KHf39nqlmt3c9PR0jJaZt6hhCPENyAf4PwQpm28erkJmbOYO864goIuws41lduYXyDqQ0Q==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@ampproject/remapping": "2.3.0",
				"@angular-devkit/architect": "0.2102.6",
				"@babel/core": "7.29.0",
				"@babel/helper-annotate-as-pure": "7.27.3",
				"@babel/helper-split-export-declaration": "7.24.7",
				"@inquirer/confirm": "5.1.21",
				"@vitejs/plugin-basic-ssl": "2.1.4",
				"beasties": "0.4.1",
				"browserslist": "^4.26.0",
				"esbuild": "0.27.3",
				"https-proxy-agent": "7.0.6",
				"istanbul-lib-instrument": "6.0.3",
				"jsonc-parser": "3.3.1",
				"listr2": "9.0.5",
				"magic-string": "0.30.21",
				"mrmime": "2.0.1",
				"parse5-html-rewriting-stream": "8.0.0",
				"picomatch": "4.0.4",
				"piscina": "5.1.4",
				"rolldown": "1.0.0-rc.4",
				"sass": "1.97.3",
				"semver": "7.7.4",
				"source-map-support": "0.5.21",
				"tinyglobby": "0.2.15",
				"undici": "7.24.4",
				"vite": "7.3.1",
				"watchpack": "2.5.1"
			},
			"engines": {
				"node": "^20.19.0 || ^22.12.0 || >=24.0.0",
				"npm": "^6.11.0 || ^7.5.6 || >=8.0.0",
				"yarn": ">= 1.13.0"
			},
			"optionalDependencies": {
				"lmdb": "3.5.1"
			},
			"peerDependencies": {
				"@angular/compiler": "^21.0.0",
				"@angular/compiler-cli": "^21.0.0",
				"@angular/core": "^21.0.0",
				"@angular/localize": "^21.0.0",
				"@angular/platform-browser": "^21.0.0",
				"@angular/platform-server": "^21.0.0",
				"@angular/service-worker": "^21.0.0",
				"@angular/ssr": "^21.2.6",
				"karma": "^6.4.0",
				"less": "^4.2.0",
				"ng-packagr": "^21.0.0",
				"postcss": "^8.4.0",
				"tailwindcss": "^2.0.0 || ^3.0.0 || ^4.0.0",
				"tslib": "^2.3.0",
				"typescript": ">=5.9 <6.0",
				"vitest": "^4.0.8"
			},
			"peerDependenciesMeta": {
				"@angular/core": {
					"optional": true
				},
				"@angular/localize": {
					"optional": true
				},
				"@angular/platform-browser": {
					"optional": true
				},
				"@angular/platform-server": {
					"optional": true
				},
				"@angular/service-worker": {
					"optional": true
				},
				"@angular/ssr": {
					"optional": true
				},
				"karma": {
					"optional": true
				},
				"less": {
					"optional": true
				},
				"ng-packagr": {
					"optional": true
				},
				"postcss": {
					"optional": true
				},
				"tailwindcss": {
					"optional": true
				},
				"vitest": {
					"optional": true
				}
			}
		},
		"node_modules/@angular/cdk": {
			"version": "21.0.0",
			"resolved": "https://registry.npmjs.org/@angular/cdk/-/cdk-21.0.0.tgz",
			"integrity": "sha512-wCr5D3mEC+p69IMDC7vf8bWx18mfUNNRdsiK3XD0m1PqfeNfnCJb+Bnkks37MC/SU01uCNrAokRaTbWL6pk1Wg==",
			"license": "MIT",
			"dependencies": {
				"parse5": "^8.0.0",
				"tslib": "^2.3.0"
			},
			"peerDependencies": {
				"@angular/common": "^21.0.0 || ^22.0.0",
				"@angular/core": "^21.0.0 || ^22.0.0",
				"rxjs": "^6.5.3 || ^7.4.0"
			}
		},
		"node_modules/@angular/cli": {
			"version": "21.2.6",
			"resolved": "https://registry.npmjs.org/@angular/cli/-/cli-21.2.6.tgz",
			"integrity": "sha512-I5DOFcIT1HKymyy2f78fjgD0Iv6jG46GbBZ/VxejcnhjubFpuN4CwPdugXf9rIDs8KZQqBzDBFUbq11vnk8h0A==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@angular-devkit/architect": "0.2102.6",
				"@angular-devkit/core": "21.2.6",
				"@angular-devkit/schematics": "21.2.6",
				"@inquirer/prompts": "7.10.1",
				"@listr2/prompt-adapter-inquirer": "3.0.5",
				"@modelcontextprotocol/sdk": "1.26.0",
				"@schematics/angular": "21.2.6",
				"@yarnpkg/lockfile": "1.1.0",
				"algoliasearch": "5.48.1",
				"ini": "6.0.0",
				"jsonc-parser": "3.3.1",
				"listr2": "9.0.5",
				"npm-package-arg": "13.0.2",
				"pacote": "21.3.1",
				"parse5-html-rewriting-stream": "8.0.0",
				"semver": "7.7.4",
				"yargs": "18.0.0",
				"zod": "4.3.6"
			},
			"bin": {
				"ng": "bin/ng.js"
			},
			"engines": {
				"node": "^20.19.0 || ^22.12.0 || >=24.0.0",
				"npm": "^6.11.0 || ^7.5.6 || >=8.0.0",
				"yarn": ">= 1.13.0"
			}
		},
		"node_modules/@angular/common": {
			"version": "21.2.7",
			"resolved": "https://registry.npmjs.org/@angular/common/-/common-21.2.7.tgz",
			"integrity": "sha512-YFdnU5z8JloJjLYa52OyCOULQhqEE/ym7vKfABySWDsiVXZr9FNmKMeZi/lUcg7ZO22UbBihqW9a9D6VSHOo+g==",
			"license": "MIT",
			"dependencies": {
				"tslib": "^2.3.0"
			},
			"engines": {
				"node": "^20.19.0 || ^22.12.0 || >=24.0.0"
			},
			"peerDependencies": {
				"@angular/core": "21.2.7",
				"rxjs": "^6.5.3 || ^7.4.0"
			}
		},
		"node_modules/@angular/compiler": {
			"version": "21.2.7",
			"resolved": "https://registry.npmjs.org/@angular/compiler/-/compiler-21.2.7.tgz",
			"integrity": "sha512-4J0Nl5gGmr5SKgR3FHK4J6rdG0aP5zAsY3AJU8YXH+D98CeNTjQUD8XHsdD2cTwo08V5mDdFa5VCsREpMPJ5gQ==",
			"license": "MIT",
			"dependencies": {
				"tslib": "^2.3.0"
			},
			"engines": {
				"node": "^20.19.0 || ^22.12.0 || >=24.0.0"
			}
		},
		"node_modules/@angular/compiler-cli": {
			"version": "21.2.7",
			"resolved": "https://registry.npmjs.org/@angular/compiler-cli/-/compiler-cli-21.2.7.tgz",
			"integrity": "sha512-r76vKBM7Wu0N8PTeec7340Gtv1wC7IBQGJOQnukshPgzaabgNKxmUiChGxi+RJNo/Tsdiw9ZfddcBgBjq79ZIg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/core": "7.29.0",
				"@jridgewell/sourcemap-codec": "^1.4.14",
				"chokidar": "^5.0.0",
				"convert-source-map": "^1.5.1",
				"reflect-metadata": "^0.2.0",
				"semver": "^7.0.0",
				"tslib": "^2.3.0",
				"yargs": "^18.0.0"
			},
			"bin": {
				"ng-xi18n": "bundles/src/bin/ng_xi18n.js",
				"ngc": "bundles/src/bin/ngc.js"
			},
			"engines": {
				"node": "^20.19.0 || ^22.12.0 || >=24.0.0"
			},
			"peerDependencies": {
				"@angular/compiler": "21.2.7",
				"typescript": ">=5.9 <6.1"
			},
			"peerDependenciesMeta": {
				"typescript": {
					"optional": true
				}
			}
		},
		"node_modules/@angular/core": {
			"version": "21.2.7",
			"resolved": "https://registry.npmjs.org/@angular/core/-/core-21.2.7.tgz",
			"integrity": "sha512-4bnskeRNNOZMn3buVw47Zz9Py4B8AZgYHe5xBEMOY5/yrldb7OFje5gWCWls23P18FKwhl+Xx1hgnOEPSs29gw==",
			"license": "MIT",
			"dependencies": {
				"tslib": "^2.3.0"
			},
			"engines": {
				"node": "^20.19.0 || ^22.12.0 || >=24.0.0"
			},
			"peerDependencies": {
				"@angular/compiler": "21.2.7",
				"rxjs": "^6.5.3 || ^7.4.0",
				"zone.js": "~0.15.0 || ~0.16.0"
			},
			"peerDependenciesMeta": {
				"@angular/compiler": {
					"optional": true
				},
				"zone.js": {
					"optional": true
				}
			}
		},
		"node_modules/@angular/forms": {
			"version": "21.2.7",
			"resolved": "https://registry.npmjs.org/@angular/forms/-/forms-21.2.7.tgz",
			"integrity": "sha512-YD/h07cdEeAUs41ysTk6820T0lG/XiQmFiq02d3IsiHYI5Vaj2pg9Ti1wWZYEBM//hVAPTzV0dwdV7Q1Gxju1w==",
			"license": "MIT",
			"dependencies": {
				"@standard-schema/spec": "^1.0.0",
				"tslib": "^2.3.0"
			},
			"engines": {
				"node": "^20.19.0 || ^22.12.0 || >=24.0.0"
			},
			"peerDependencies": {
				"@angular/common": "21.2.7",
				"@angular/core": "21.2.7",
				"@angular/platform-browser": "21.2.7",
				"rxjs": "^6.5.3 || ^7.4.0"
			}
		},
		"node_modules/@angular/platform-browser": {
			"version": "21.2.7",
			"resolved": "https://registry.npmjs.org/@angular/platform-browser/-/platform-browser-21.2.7.tgz",
			"integrity": "sha512-nklVhstRZL4wpYg9Cyae/Eyfa7LMpgb0TyD/F//qCuohhM8nM7F+O0ekykGD6H+I34jsvqx6yLS7MicndWVz7Q==",
			"license": "MIT",
			"dependencies": {
				"tslib": "^2.3.0"
			},
			"engines": {
				"node": "^20.19.0 || ^22.12.0 || >=24.0.0"
			},
			"peerDependencies": {
				"@angular/animations": "21.2.7",
				"@angular/common": "21.2.7",
				"@angular/core": "21.2.7"
			},
			"peerDependenciesMeta": {
				"@angular/animations": {
					"optional": true
				}
			}
		},
		"node_modules/@angular/router": {
			"version": "21.2.7",
			"resolved": "https://registry.npmjs.org/@angular/router/-/router-21.2.7.tgz",
			"integrity": "sha512-Ina6XgtpvXT1OsLAomURHJGQDOkIVGrguWAOZ7+gOjsJEjUfpxTktFter+/K59KMC2yv6yneLvYSn3AswTYx7A==",
			"license": "MIT",
			"dependencies": {
				"tslib": "^2.3.0"
			},
			"engines": {
				"node": "^20.19.0 || ^22.12.0 || >=24.0.0"
			},
			"peerDependencies": {
				"@angular/common": "21.2.7",
				"@angular/core": "21.2.7",
				"@angular/platform-browser": "21.2.7",
				"rxjs": "^6.5.3 || ^7.4.0"
			}
		},
		"node_modules/@asamuzakjp/css-color": {
			"version": "5.1.4",
			"resolved": "https://registry.npmjs.org/@asamuzakjp/css-color/-/css-color-5.1.4.tgz",
			"integrity": "sha512-503MoTEmPSyEJ7zQ+5vlkwPtkyxDhbDwR9ajk/jpPGrCLiUFHzgEG4iViUPKdGlZPRT1mWSPSbDL2qkOoLU4vg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@csstools/css-calc": "^3.1.1",
				"@csstools/css-color-parser": "^4.0.2",
				"@csstools/css-parser-algorithms": "^4.0.0",
				"@csstools/css-tokenizer": "^4.0.0",
				"lru-cache": "^11.2.7"
			},
			"engines": {
				"node": "^20.19.0 || ^22.12.0 || >=24.0.0"
			}
		},
		"node_modules/@asamuzakjp/css-color/node_modules/lru-cache": {
			"version": "11.2.7",
			"resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-11.2.7.tgz",
			"integrity": "sha512-aY/R+aEsRelme17KGQa/1ZSIpLpNYYrhcrepKTZgE+W3WM16YMCaPwOHLHsmopZHELU0Ojin1lPVxKR0MihncA==",
			"dev": true,
			"license": "BlueOak-1.0.0",
			"engines": {
				"node": "20 || >=22"
			}
		},
		"node_modules/@asamuzakjp/dom-selector": {
			"version": "6.8.1",
			"resolved": "https://registry.npmjs.org/@asamuzakjp/dom-selector/-/dom-selector-6.8.1.tgz",
			"integrity": "sha512-MvRz1nCqW0fsy8Qz4dnLIvhOlMzqDVBabZx6lH+YywFDdjXhMY37SmpV1XFX3JzG5GWHn63j6HX6QPr3lZXHvQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@asamuzakjp/nwsapi": "^2.3.9",
				"bidi-js": "^1.0.3",
				"css-tree": "^3.1.0",
				"is-potential-custom-element-name": "^1.0.1",
				"lru-cache": "^11.2.6"
			}
		},
		"node_modules/@asamuzakjp/dom-selector/node_modules/lru-cache": {
			"version": "11.2.7",
			"resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-11.2.7.tgz",
			"integrity": "sha512-aY/R+aEsRelme17KGQa/1ZSIpLpNYYrhcrepKTZgE+W3WM16YMCaPwOHLHsmopZHELU0Ojin1lPVxKR0MihncA==",
			"dev": true,
			"license": "BlueOak-1.0.0",
			"engines": {
				"node": "20 || >=22"
			}
		},
		"node_modules/@asamuzakjp/nwsapi": {
			"version": "2.3.9",
			"resolved": "https://registry.npmjs.org/@asamuzakjp/nwsapi/-/nwsapi-2.3.9.tgz",
			"integrity": "sha512-n8GuYSrI9bF7FFZ/SjhwevlHc8xaVlb/7HmHelnc/PZXBD2ZR49NnN9sMMuDdEGPeeRQ5d0hqlSlEpgCX3Wl0Q==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@babel/code-frame": {
			"version": "7.29.0",
			"resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.29.0.tgz",
			"integrity": "sha512-9NhCeYjq9+3uxgdtp20LSiJXJvN0FeCtNGpJxuMFZ1Kv3cWUNb6DOhJwUvcVCzKGR66cw4njwM6hrJLqgOwbcw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-validator-identifier": "^7.28.5",
				"js-tokens": "^4.0.0",
				"picocolors": "^1.1.1"
			},
			"engines": {
				"node": ">=6.9.0"
			}
		},
		"node_modules/@babel/compat-data": {
			"version": "7.29.0",
			"resolved": "https://registry.npmjs.org/@babel/compat-data/-/compat-data-7.29.0.tgz",
			"integrity": "sha512-T1NCJqT/j9+cn8fvkt7jtwbLBfLC/1y1c7NtCeXFRgzGTsafi68MRv8yzkYSapBnFA6L3U2VSc02ciDzoAJhJg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=6.9.0"
			}
		},
		"node_modules/@babel/core": {
			"version": "7.29.0",
			"resolved": "https://registry.npmjs.org/@babel/core/-/core-7.29.0.tgz",
			"integrity": "sha512-CGOfOJqWjg2qW/Mb6zNsDm+u5vFQ8DxXfbM09z69p5Z6+mE1ikP2jUXw+j42Pf1XTYED2Rni5f95npYeuwMDQA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/code-frame": "^7.29.0",
				"@babel/generator": "^7.29.0",
				"@babel/helper-compilation-targets": "^7.28.6",
				"@babel/helper-module-transforms": "^7.28.6",
				"@babel/helpers": "^7.28.6",
				"@babel/parser": "^7.29.0",
				"@babel/template": "^7.28.6",
				"@babel/traverse": "^7.29.0",
				"@babel/types": "^7.29.0",
				"@jridgewell/remapping": "^2.3.5",
				"convert-source-map": "^2.0.0",
				"debug": "^4.1.0",
				"gensync": "^1.0.0-beta.2",
				"json5": "^2.2.3",
				"semver": "^6.3.1"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/babel"
			}
		},
		"node_modules/@babel/core/node_modules/convert-source-map": {
			"version": "2.0.0",
			"resolved": "https://registry.npmjs.org/convert-source-map/-/convert-source-map-2.0.0.tgz",
			"integrity": "sha512-Kvp459HrV2FEJ1CAsi1Ku+MY3kasH19TFykTz2xWmMeq6bk2NU3XXvfJ+Q61m0xktWwt+1HSYf3JZsTms3aRJg==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@babel/core/node_modules/semver": {
			"version": "6.3.1",
			"resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
			"integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
			"dev": true,
			"license": "ISC",
			"bin": {
				"semver": "bin/semver.js"
			}
		},
		"node_modules/@babel/generator": {
			"version": "7.29.1",
			"resolved": "https://registry.npmjs.org/@babel/generator/-/generator-7.29.1.tgz",
			"integrity": "sha512-qsaF+9Qcm2Qv8SRIMMscAvG4O3lJ0F1GuMo5HR/Bp02LopNgnZBC/EkbevHFeGs4ls/oPz9v+Bsmzbkbe+0dUw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/parser": "^7.29.0",
				"@babel/types": "^7.29.0",
				"@jridgewell/gen-mapping": "^0.3.12",
				"@jridgewell/trace-mapping": "^0.3.28",
				"jsesc": "^3.0.2"
			},
			"engines": {
				"node": ">=6.9.0"
			}
		},
		"node_modules/@babel/helper-annotate-as-pure": {
			"version": "7.27.3",
			"resolved": "https://registry.npmjs.org/@babel/helper-annotate-as-pure/-/helper-annotate-as-pure-7.27.3.tgz",
			"integrity": "sha512-fXSwMQqitTGeHLBC08Eq5yXz2m37E4pJX1qAU1+2cNedz/ifv/bVXft90VeSav5nFO61EcNgwr0aJxbyPaWBPg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/types": "^7.27.3"
			},
			"engines": {
				"node": ">=6.9.0"
			}
		},
		"node_modules/@babel/helper-compilation-targets": {
			"version": "7.28.6",
			"resolved": "https://registry.npmjs.org/@babel/helper-compilation-targets/-/helper-compilation-targets-7.28.6.tgz",
			"integrity": "sha512-JYtls3hqi15fcx5GaSNL7SCTJ2MNmjrkHXg4FSpOA/grxK8KwyZ5bubHsCq8FXCkua6xhuaaBit+3b7+VZRfcA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/compat-data": "^7.28.6",
				"@babel/helper-validator-option": "^7.27.1",
				"browserslist": "^4.24.0",
				"lru-cache": "^5.1.1",
				"semver": "^6.3.1"
			},
			"engines": {
				"node": ">=6.9.0"
			}
		},
		"node_modules/@babel/helper-compilation-targets/node_modules/semver": {
			"version": "6.3.1",
			"resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
			"integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
			"dev": true,
			"license": "ISC",
			"bin": {
				"semver": "bin/semver.js"
			}
		},
		"node_modules/@babel/helper-create-class-features-plugin": {
			"version": "7.28.6",
			"resolved": "https://registry.npmjs.org/@babel/helper-create-class-features-plugin/-/helper-create-class-features-plugin-7.28.6.tgz",
			"integrity": "sha512-dTOdvsjnG3xNT9Y0AUg1wAl38y+4Rl4sf9caSQZOXdNqVn+H+HbbJ4IyyHaIqNR6SW9oJpA/RuRjsjCw2IdIow==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-annotate-as-pure": "^7.27.3",
				"@babel/helper-member-expression-to-functions": "^7.28.5",
				"@babel/helper-optimise-call-expression": "^7.27.1",
				"@babel/helper-replace-supers": "^7.28.6",
				"@babel/helper-skip-transparent-expression-wrappers": "^7.27.1",
				"@babel/traverse": "^7.28.6",
				"semver": "^6.3.1"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0"
			}
		},
		"node_modules/@babel/helper-create-class-features-plugin/node_modules/semver": {
			"version": "6.3.1",
			"resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
			"integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
			"dev": true,
			"license": "ISC",
			"bin": {
				"semver": "bin/semver.js"
			}
		},
		"node_modules/@babel/helper-create-regexp-features-plugin": {
			"version": "7.28.5",
			"resolved": "https://registry.npmjs.org/@babel/helper-create-regexp-features-plugin/-/helper-create-regexp-features-plugin-7.28.5.tgz",
			"integrity": "sha512-N1EhvLtHzOvj7QQOUCCS3NrPJP8c5W6ZXCHDn7Yialuy1iu4r5EmIYkXlKNqT99Ciw+W0mDqWoR6HWMZlFP3hw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-annotate-as-pure": "^7.27.3",
				"regexpu-core": "^6.3.1",
				"semver": "^6.3.1"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0"
			}
		},
		"node_modules/@babel/helper-create-regexp-features-plugin/node_modules/semver": {
			"version": "6.3.1",
			"resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
			"integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
			"dev": true,
			"license": "ISC",
			"bin": {
				"semver": "bin/semver.js"
			}
		},
		"node_modules/@babel/helper-define-polyfill-provider": {
			"version": "0.6.8",
			"resolved": "https://registry.npmjs.org/@babel/helper-define-polyfill-provider/-/helper-define-polyfill-provider-0.6.8.tgz",
			"integrity": "sha512-47UwBLPpQi1NoWzLuHNjRoHlYXMwIJoBf7MFou6viC/sIHWYygpvr0B6IAyh5sBdA2nr2LPIRww8lfaUVQINBA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-compilation-targets": "^7.28.6",
				"@babel/helper-plugin-utils": "^7.28.6",
				"debug": "^4.4.3",
				"lodash.debounce": "^4.0.8",
				"resolve": "^1.22.11"
			},
			"peerDependencies": {
				"@babel/core": "^7.4.0 || ^8.0.0-0 <8.0.0"
			}
		},
		"node_modules/@babel/helper-globals": {
			"version": "7.28.0",
			"resolved": "https://registry.npmjs.org/@babel/helper-globals/-/helper-globals-7.28.0.tgz",
			"integrity": "sha512-+W6cISkXFa1jXsDEdYA8HeevQT/FULhxzR99pxphltZcVaugps53THCeiWA8SguxxpSp3gKPiuYfSWopkLQ4hw==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=6.9.0"
			}
		},
		"node_modules/@babel/helper-member-expression-to-functions": {
			"version": "7.28.5",
			"resolved": "https://registry.npmjs.org/@babel/helper-member-expression-to-functions/-/helper-member-expression-to-functions-7.28.5.tgz",
			"integrity": "sha512-cwM7SBRZcPCLgl8a7cY0soT1SptSzAlMH39vwiRpOQkJlh53r5hdHwLSCZpQdVLT39sZt+CRpNwYG4Y2v77atg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/traverse": "^7.28.5",
				"@babel/types": "^7.28.5"
			},
			"engines": {
				"node": ">=6.9.0"
			}
		},
		"node_modules/@babel/helper-module-imports": {
			"version": "7.28.6",
			"resolved": "https://registry.npmjs.org/@babel/helper-module-imports/-/helper-module-imports-7.28.6.tgz",
			"integrity": "sha512-l5XkZK7r7wa9LucGw9LwZyyCUscb4x37JWTPz7swwFE/0FMQAGpiWUZn8u9DzkSBWEcK25jmvubfpw2dnAMdbw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/traverse": "^7.28.6",
				"@babel/types": "^7.28.6"
			},
			"engines": {
				"node": ">=6.9.0"
			}
		},
		"node_modules/@babel/helper-module-transforms": {
			"version": "7.28.6",
			"resolved": "https://registry.npmjs.org/@babel/helper-module-transforms/-/helper-module-transforms-7.28.6.tgz",
			"integrity": "sha512-67oXFAYr2cDLDVGLXTEABjdBJZ6drElUSI7WKp70NrpyISso3plG9SAGEF6y7zbha/wOzUByWWTJvEDVNIUGcA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-module-imports": "^7.28.6",
				"@babel/helper-validator-identifier": "^7.28.5",
				"@babel/traverse": "^7.28.6"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0"
			}
		},
		"node_modules/@babel/helper-optimise-call-expression": {
			"version": "7.27.1",
			"resolved": "https://registry.npmjs.org/@babel/helper-optimise-call-expression/-/helper-optimise-call-expression-7.27.1.tgz",
			"integrity": "sha512-URMGH08NzYFhubNSGJrpUEphGKQwMQYBySzat5cAByY1/YgIRkULnIy3tAMeszlL/so2HbeilYloUmSpd7GdVw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/types": "^7.27.1"
			},
			"engines": {
				"node": ">=6.9.0"
			}
		},
		"node_modules/@babel/helper-plugin-utils": {
			"version": "7.28.6",
			"resolved": "https://registry.npmjs.org/@babel/helper-plugin-utils/-/helper-plugin-utils-7.28.6.tgz",
			"integrity": "sha512-S9gzZ/bz83GRysI7gAD4wPT/AI3uCnY+9xn+Mx/KPs2JwHJIz1W8PZkg2cqyt3RNOBM8ejcXhV6y8Og7ly/Dug==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=6.9.0"
			}
		},
		"node_modules/@babel/helper-remap-async-to-generator": {
			"version": "7.27.1",
			"resolved": "https://registry.npmjs.org/@babel/helper-remap-async-to-generator/-/helper-remap-async-to-generator-7.27.1.tgz",
			"integrity": "sha512-7fiA521aVw8lSPeI4ZOD3vRFkoqkJcS+z4hFo82bFSH/2tNd6eJ5qCVMS5OzDmZh/kaHQeBaeyxK6wljcPtveA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-annotate-as-pure": "^7.27.1",
				"@babel/helper-wrap-function": "^7.27.1",
				"@babel/traverse": "^7.27.1"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0"
			}
		},
		"node_modules/@babel/helper-replace-supers": {
			"version": "7.28.6",
			"resolved": "https://registry.npmjs.org/@babel/helper-replace-supers/-/helper-replace-supers-7.28.6.tgz",
			"integrity": "sha512-mq8e+laIk94/yFec3DxSjCRD2Z0TAjhVbEJY3UQrlwVo15Lmt7C2wAUbK4bjnTs4APkwsYLTahXRraQXhb1WCg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-member-expression-to-functions": "^7.28.5",
				"@babel/helper-optimise-call-expression": "^7.27.1",
				"@babel/traverse": "^7.28.6"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0"
			}
		},
		"node_modules/@babel/helper-skip-transparent-expression-wrappers": {
			"version": "7.27.1",
			"resolved": "https://registry.npmjs.org/@babel/helper-skip-transparent-expression-wrappers/-/helper-skip-transparent-expression-wrappers-7.27.1.tgz",
			"integrity": "sha512-Tub4ZKEXqbPjXgWLl2+3JpQAYBJ8+ikpQ2Ocj/q/r0LwE3UhENh7EUabyHjz2kCEsrRY83ew2DQdHluuiDQFzg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/traverse": "^7.27.1",
				"@babel/types": "^7.27.1"
			},
			"engines": {
				"node": ">=6.9.0"
			}
		},
		"node_modules/@babel/helper-split-export-declaration": {
			"version": "7.24.7",
			"resolved": "https://registry.npmjs.org/@babel/helper-split-export-declaration/-/helper-split-export-declaration-7.24.7.tgz",
			"integrity": "sha512-oy5V7pD+UvfkEATUKvIjvIAH/xCzfsFVw7ygW2SI6NClZzquT+mwdTfgfdbUiceh6iQO0CHtCPsyze/MZ2YbAA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/types": "^7.24.7"
			},
			"engines": {
				"node": ">=6.9.0"
			}
		},
		"node_modules/@babel/helper-string-parser": {
			"version": "7.27.1",
			"resolved": "https://registry.npmjs.org/@babel/helper-string-parser/-/helper-string-parser-7.27.1.tgz",
			"integrity": "sha512-qMlSxKbpRlAridDExk92nSobyDdpPijUq2DW6oDnUqd0iOGxmQjyqhMIihI9+zv4LPyZdRje2cavWPbCbWm3eA==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=6.9.0"
			}
		},
		"node_modules/@babel/helper-validator-identifier": {
			"version": "7.28.5",
			"resolved": "https://registry.npmjs.org/@babel/helper-validator-identifier/-/helper-validator-identifier-7.28.5.tgz",
			"integrity": "sha512-qSs4ifwzKJSV39ucNjsvc6WVHs6b7S03sOh2OcHF9UHfVPqWWALUsNUVzhSBiItjRZoLHx7nIarVjqKVusUZ1Q==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=6.9.0"
			}
		},
		"node_modules/@babel/helper-validator-option": {
			"version": "7.27.1",
			"resolved": "https://registry.npmjs.org/@babel/helper-validator-option/-/helper-validator-option-7.27.1.tgz",
			"integrity": "sha512-YvjJow9FxbhFFKDSuFnVCe2WxXk1zWc22fFePVNEaWJEu8IrZVlda6N0uHwzZrUM1il7NC9Mlp4MaJYbYd9JSg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=6.9.0"
			}
		},
		"node_modules/@babel/helper-wrap-function": {
			"version": "7.28.6",
			"resolved": "https://registry.npmjs.org/@babel/helper-wrap-function/-/helper-wrap-function-7.28.6.tgz",
			"integrity": "sha512-z+PwLziMNBeSQJonizz2AGnndLsP2DeGHIxDAn+wdHOGuo4Fo1x1HBPPXeE9TAOPHNNWQKCSlA2VZyYyyibDnQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/template": "^7.28.6",
				"@babel/traverse": "^7.28.6",
				"@babel/types": "^7.28.6"
			},
			"engines": {
				"node": ">=6.9.0"
			}
		},
		"node_modules/@babel/helpers": {
			"version": "7.29.2",
			"resolved": "https://registry.npmjs.org/@babel/helpers/-/helpers-7.29.2.tgz",
			"integrity": "sha512-HoGuUs4sCZNezVEKdVcwqmZN8GoHirLUcLaYVNBK2J0DadGtdcqgr3BCbvH8+XUo4NGjNl3VOtSjEKNzqfFgKw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/template": "^7.28.6",
				"@babel/types": "^7.29.0"
			},
			"engines": {
				"node": ">=6.9.0"
			}
		},
		"node_modules/@babel/parser": {
			"version": "7.29.2",
			"resolved": "https://registry.npmjs.org/@babel/parser/-/parser-7.29.2.tgz",
			"integrity": "sha512-4GgRzy/+fsBa72/RZVJmGKPmZu9Byn8o4MoLpmNe1m8ZfYnz5emHLQz3U4gLud6Zwl0RZIcgiLD7Uq7ySFuDLA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/types": "^7.29.0"
			},
			"bin": {
				"parser": "bin/babel-parser.js"
			},
			"engines": {
				"node": ">=6.0.0"
			}
		},
		"node_modules/@babel/plugin-bugfix-firefox-class-in-computed-class-key": {
			"version": "7.28.5",
			"resolved": "https://registry.npmjs.org/@babel/plugin-bugfix-firefox-class-in-computed-class-key/-/plugin-bugfix-firefox-class-in-computed-class-key-7.28.5.tgz",
			"integrity": "sha512-87GDMS3tsmMSi/3bWOte1UblL+YUTFMV8SZPZ2eSEL17s74Cw/l63rR6NmGVKMYW2GYi85nE+/d6Hw5N0bEk2Q==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-plugin-utils": "^7.27.1",
				"@babel/traverse": "^7.28.5"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0"
			}
		},
		"node_modules/@babel/plugin-bugfix-safari-class-field-initializer-scope": {
			"version": "7.27.1",
			"resolved": "https://registry.npmjs.org/@babel/plugin-bugfix-safari-class-field-initializer-scope/-/plugin-bugfix-safari-class-field-initializer-scope-7.27.1.tgz",
			"integrity": "sha512-qNeq3bCKnGgLkEXUuFry6dPlGfCdQNZbn7yUAPCInwAJHMU7THJfrBSozkcWq5sNM6RcF3S8XyQL2A52KNR9IA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-plugin-utils": "^7.27.1"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0"
			}
		},
		"node_modules/@babel/plugin-bugfix-safari-id-destructuring-collision-in-function-expression": {
			"version": "7.27.1",
			"resolved": "https://registry.npmjs.org/@babel/plugin-bugfix-safari-id-destructuring-collision-in-function-expression/-/plugin-bugfix-safari-id-destructuring-collision-in-function-expression-7.27.1.tgz",
			"integrity": "sha512-g4L7OYun04N1WyqMNjldFwlfPCLVkgB54A/YCXICZYBsvJJE3kByKv9c9+R/nAfmIfjl2rKYLNyMHboYbZaWaA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-plugin-utils": "^7.27.1"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0"
			}
		},
		"node_modules/@babel/plugin-bugfix-v8-spread-parameters-in-optional-chaining": {
			"version": "7.27.1",
			"resolved": "https://registry.npmjs.org/@babel/plugin-bugfix-v8-spread-parameters-in-optional-chaining/-/plugin-bugfix-v8-spread-parameters-in-optional-chaining-7.27.1.tgz",
			"integrity": "sha512-oO02gcONcD5O1iTLi/6frMJBIwWEHceWGSGqrpCmEL8nogiS6J9PBlE48CaK20/Jx1LuRml9aDftLgdjXT8+Cw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-plugin-utils": "^7.27.1",
				"@babel/helper-skip-transparent-expression-wrappers": "^7.27.1",
				"@babel/plugin-transform-optional-chaining": "^7.27.1"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.13.0"
			}
		},
		"node_modules/@babel/plugin-bugfix-v8-static-class-fields-redefine-readonly": {
			"version": "7.28.6",
			"resolved": "https://registry.npmjs.org/@babel/plugin-bugfix-v8-static-class-fields-redefine-readonly/-/plugin-bugfix-v8-static-class-fields-redefine-readonly-7.28.6.tgz",
			"integrity": "sha512-a0aBScVTlNaiUe35UtfxAN7A/tehvvG4/ByO6+46VPKTRSlfnAFsgKy0FUh+qAkQrDTmhDkT+IBOKlOoMUxQ0g==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-plugin-utils": "^7.28.6",
				"@babel/traverse": "^7.28.6"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0"
			}
		},
		"node_modules/@babel/plugin-proposal-decorators": {
			"version": "7.29.0",
			"resolved": "https://registry.npmjs.org/@babel/plugin-proposal-decorators/-/plugin-proposal-decorators-7.29.0.tgz",
			"integrity": "sha512-CVBVv3VY/XRMxRYq5dwr2DS7/MvqPm23cOCjbwNnVrfOqcWlnefua1uUs0sjdKOGjvPUG633o07uWzJq4oI6dA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-create-class-features-plugin": "^7.28.6",
				"@babel/helper-plugin-utils": "^7.28.6",
				"@babel/plugin-syntax-decorators": "^7.28.6"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-proposal-private-property-in-object": {
			"version": "7.21.0-placeholder-for-preset-env.2",
			"resolved": "https://registry.npmjs.org/@babel/plugin-proposal-private-property-in-object/-/plugin-proposal-private-property-in-object-7.21.0-placeholder-for-preset-env.2.tgz",
			"integrity": "sha512-SOSkfJDddaM7mak6cPEpswyTRnuRltl429hMraQEglW+OkovnCzsiszTmsrlY//qLFjCpQDFRvjdm2wA5pPm9w==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-syntax-decorators": {
			"version": "7.28.6",
			"resolved": "https://registry.npmjs.org/@babel/plugin-syntax-decorators/-/plugin-syntax-decorators-7.28.6.tgz",
			"integrity": "sha512-71EYI0ONURHJBL4rSFXnITXqXrrY8q4P0q006DPfN+Rk+ASM+++IBXem/ruokgBZR8YNEWZ8R6B+rCb8VcUTqA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-plugin-utils": "^7.28.6"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-syntax-import-assertions": {
			"version": "7.28.6",
			"resolved": "https://registry.npmjs.org/@babel/plugin-syntax-import-assertions/-/plugin-syntax-import-assertions-7.28.6.tgz",
			"integrity": "sha512-pSJUpFHdx9z5nqTSirOCMtYVP2wFgoWhP0p3g8ONK/4IHhLIBd0B9NYqAvIUAhq+OkhO4VM1tENCt0cjlsNShw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-plugin-utils": "^7.28.6"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-syntax-import-attributes": {
			"version": "7.28.6",
			"resolved": "https://registry.npmjs.org/@babel/plugin-syntax-import-attributes/-/plugin-syntax-import-attributes-7.28.6.tgz",
			"integrity": "sha512-jiLC0ma9XkQT3TKJ9uYvlakm66Pamywo+qwL+oL8HJOvc6TWdZXVfhqJr8CCzbSGUAbDOzlGHJC1U+vRfLQDvw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-plugin-utils": "^7.28.6"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-syntax-jsx": {
			"version": "7.28.6",
			"resolved": "https://registry.npmjs.org/@babel/plugin-syntax-jsx/-/plugin-syntax-jsx-7.28.6.tgz",
			"integrity": "sha512-wgEmr06G6sIpqr8YDwA2dSRTE3bJ+V0IfpzfSY3Lfgd7YWOaAdlykvJi13ZKBt8cZHfgH1IXN+CL656W3uUa4w==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-plugin-utils": "^7.28.6"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-syntax-typescript": {
			"version": "7.28.6",
			"resolved": "https://registry.npmjs.org/@babel/plugin-syntax-typescript/-/plugin-syntax-typescript-7.28.6.tgz",
			"integrity": "sha512-+nDNmQye7nlnuuHDboPbGm00Vqg3oO8niRRL27/4LYHUsHYh0zJ1xWOz0uRwNFmM1Avzk8wZbc6rdiYhomzv/A==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-plugin-utils": "^7.28.6"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-syntax-unicode-sets-regex": {
			"version": "7.18.6",
			"resolved": "https://registry.npmjs.org/@babel/plugin-syntax-unicode-sets-regex/-/plugin-syntax-unicode-sets-regex-7.18.6.tgz",
			"integrity": "sha512-727YkEAPwSIQTv5im8QHz3upqp92JTWhidIC81Tdx4VJYIte/VndKf1qKrfnnhPLiPghStWfvC/iFaMCQu7Nqg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-create-regexp-features-plugin": "^7.18.6",
				"@babel/helper-plugin-utils": "^7.18.6"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0"
			}
		},
		"node_modules/@babel/plugin-transform-arrow-functions": {
			"version": "7.27.1",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-arrow-functions/-/plugin-transform-arrow-functions-7.27.1.tgz",
			"integrity": "sha512-8Z4TGic6xW70FKThA5HYEKKyBpOOsucTOD1DjU3fZxDg+K3zBJcXMFnt/4yQiZnf5+MiOMSXQ9PaEK/Ilh1DeA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-plugin-utils": "^7.27.1"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-async-generator-functions": {
			"version": "7.29.0",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-async-generator-functions/-/plugin-transform-async-generator-functions-7.29.0.tgz",
			"integrity": "sha512-va0VdWro4zlBr2JsXC+ofCPB2iG12wPtVGTWFx2WLDOM3nYQZZIGP82qku2eW/JR83sD+k2k+CsNtyEbUqhU6w==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-plugin-utils": "^7.28.6",
				"@babel/helper-remap-async-to-generator": "^7.27.1",
				"@babel/traverse": "^7.29.0"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-async-to-generator": {
			"version": "7.28.6",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-async-to-generator/-/plugin-transform-async-to-generator-7.28.6.tgz",
			"integrity": "sha512-ilTRcmbuXjsMmcZ3HASTe4caH5Tpo93PkTxF9oG2VZsSWsahydmcEHhix9Ik122RcTnZnUzPbmux4wh1swfv7g==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-module-imports": "^7.28.6",
				"@babel/helper-plugin-utils": "^7.28.6",
				"@babel/helper-remap-async-to-generator": "^7.27.1"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-block-scoped-functions": {
			"version": "7.27.1",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-block-scoped-functions/-/plugin-transform-block-scoped-functions-7.27.1.tgz",
			"integrity": "sha512-cnqkuOtZLapWYZUYM5rVIdv1nXYuFVIltZ6ZJ7nIj585QsjKM5dhL2Fu/lICXZ1OyIAFc7Qy+bvDAtTXqGrlhg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-plugin-utils": "^7.27.1"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-block-scoping": {
			"version": "7.28.6",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-block-scoping/-/plugin-transform-block-scoping-7.28.6.tgz",
			"integrity": "sha512-tt/7wOtBmwHPNMPu7ax4pdPz6shjFrmHDghvNC+FG9Qvj7D6mJcoRQIF5dy4njmxR941l6rgtvfSB2zX3VlUIw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-plugin-utils": "^7.28.6"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-class-properties": {
			"version": "7.28.6",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-class-properties/-/plugin-transform-class-properties-7.28.6.tgz",
			"integrity": "sha512-dY2wS3I2G7D697VHndN91TJr8/AAfXQNt5ynCTI/MpxMsSzHp+52uNivYT5wCPax3whc47DR8Ba7cmlQMg24bw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-create-class-features-plugin": "^7.28.6",
				"@babel/helper-plugin-utils": "^7.28.6"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-class-static-block": {
			"version": "7.28.6",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-class-static-block/-/plugin-transform-class-static-block-7.28.6.tgz",
			"integrity": "sha512-rfQ++ghVwTWTqQ7w8qyDxL1XGihjBss4CmTgGRCTAC9RIbhVpyp4fOeZtta0Lbf+dTNIVJer6ych2ibHwkZqsQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-create-class-features-plugin": "^7.28.6",
				"@babel/helper-plugin-utils": "^7.28.6"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.12.0"
			}
		},
		"node_modules/@babel/plugin-transform-classes": {
			"version": "7.28.6",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-classes/-/plugin-transform-classes-7.28.6.tgz",
			"integrity": "sha512-EF5KONAqC5zAqT783iMGuM2ZtmEBy+mJMOKl2BCvPZ2lVrwvXnB6o+OBWCS+CoeCCpVRF2sA2RBKUxvT8tQT5Q==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-annotate-as-pure": "^7.27.3",
				"@babel/helper-compilation-targets": "^7.28.6",
				"@babel/helper-globals": "^7.28.0",
				"@babel/helper-plugin-utils": "^7.28.6",
				"@babel/helper-replace-supers": "^7.28.6",
				"@babel/traverse": "^7.28.6"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-computed-properties": {
			"version": "7.28.6",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-computed-properties/-/plugin-transform-computed-properties-7.28.6.tgz",
			"integrity": "sha512-bcc3k0ijhHbc2lEfpFHgx7eYw9KNXqOerKWfzbxEHUGKnS3sz9C4CNL9OiFN1297bDNfUiSO7DaLzbvHQQQ1BQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-plugin-utils": "^7.28.6",
				"@babel/template": "^7.28.6"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-destructuring": {
			"version": "7.28.5",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-destructuring/-/plugin-transform-destructuring-7.28.5.tgz",
			"integrity": "sha512-Kl9Bc6D0zTUcFUvkNuQh4eGXPKKNDOJQXVyyM4ZAQPMveniJdxi8XMJwLo+xSoW3MIq81bD33lcUe9kZpl0MCw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-plugin-utils": "^7.27.1",
				"@babel/traverse": "^7.28.5"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-dotall-regex": {
			"version": "7.28.6",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-dotall-regex/-/plugin-transform-dotall-regex-7.28.6.tgz",
			"integrity": "sha512-SljjowuNKB7q5Oayv4FoPzeB74g3QgLt8IVJw9ADvWy3QnUb/01aw8I4AVv8wYnPvQz2GDDZ/g3GhcNyDBI4Bg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-create-regexp-features-plugin": "^7.28.5",
				"@babel/helper-plugin-utils": "^7.28.6"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-duplicate-keys": {
			"version": "7.27.1",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-duplicate-keys/-/plugin-transform-duplicate-keys-7.27.1.tgz",
			"integrity": "sha512-MTyJk98sHvSs+cvZ4nOauwTTG1JeonDjSGvGGUNHreGQns+Mpt6WX/dVzWBHgg+dYZhkC4X+zTDfkTU+Vy9y7Q==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-plugin-utils": "^7.27.1"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-duplicate-named-capturing-groups-regex": {
			"version": "7.29.0",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-duplicate-named-capturing-groups-regex/-/plugin-transform-duplicate-named-capturing-groups-regex-7.29.0.tgz",
			"integrity": "sha512-zBPcW2lFGxdiD8PUnPwJjag2J9otbcLQzvbiOzDxpYXyCuYX9agOwMPGn1prVH0a4qzhCKu24rlH4c1f7yA8rw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-create-regexp-features-plugin": "^7.28.5",
				"@babel/helper-plugin-utils": "^7.28.6"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0"
			}
		},
		"node_modules/@babel/plugin-transform-dynamic-import": {
			"version": "7.27.1",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-dynamic-import/-/plugin-transform-dynamic-import-7.27.1.tgz",
			"integrity": "sha512-MHzkWQcEmjzzVW9j2q8LGjwGWpG2mjwaaB0BNQwst3FIjqsg8Ct/mIZlvSPJvfi9y2AC8mi/ktxbFVL9pZ1I4A==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-plugin-utils": "^7.27.1"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-explicit-resource-management": {
			"version": "7.28.6",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-explicit-resource-management/-/plugin-transform-explicit-resource-management-7.28.6.tgz",
			"integrity": "sha512-Iao5Konzx2b6g7EPqTy40UZbcdXE126tTxVFr/nAIj+WItNxjKSYTEw3RC+A2/ZetmdJsgueL1KhaMCQHkLPIg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-plugin-utils": "^7.28.6",
				"@babel/plugin-transform-destructuring": "^7.28.5"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-exponentiation-operator": {
			"version": "7.28.6",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-exponentiation-operator/-/plugin-transform-exponentiation-operator-7.28.6.tgz",
			"integrity": "sha512-WitabqiGjV/vJ0aPOLSFfNY1u9U3R7W36B03r5I2KoNix+a3sOhJ3pKFB3R5It9/UiK78NiO0KE9P21cMhlPkw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-plugin-utils": "^7.28.6"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-export-namespace-from": {
			"version": "7.27.1",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-export-namespace-from/-/plugin-transform-export-namespace-from-7.27.1.tgz",
			"integrity": "sha512-tQvHWSZ3/jH2xuq/vZDy0jNn+ZdXJeM8gHvX4lnJmsc3+50yPlWdZXIc5ay+umX+2/tJIqHqiEqcJvxlmIvRvQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-plugin-utils": "^7.27.1"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-for-of": {
			"version": "7.27.1",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-for-of/-/plugin-transform-for-of-7.27.1.tgz",
			"integrity": "sha512-BfbWFFEJFQzLCQ5N8VocnCtA8J1CLkNTe2Ms2wocj75dd6VpiqS5Z5quTYcUoo4Yq+DN0rtikODccuv7RU81sw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-plugin-utils": "^7.27.1",
				"@babel/helper-skip-transparent-expression-wrappers": "^7.27.1"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-function-name": {
			"version": "7.27.1",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-function-name/-/plugin-transform-function-name-7.27.1.tgz",
			"integrity": "sha512-1bQeydJF9Nr1eBCMMbC+hdwmRlsv5XYOMu03YSWFwNs0HsAmtSxxF1fyuYPqemVldVyFmlCU7w8UE14LupUSZQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-compilation-targets": "^7.27.1",
				"@babel/helper-plugin-utils": "^7.27.1",
				"@babel/traverse": "^7.27.1"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-json-strings": {
			"version": "7.28.6",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-json-strings/-/plugin-transform-json-strings-7.28.6.tgz",
			"integrity": "sha512-Nr+hEN+0geQkzhbdgQVPoqr47lZbm+5fCUmO70722xJZd0Mvb59+33QLImGj6F+DkK3xgDi1YVysP8whD6FQAw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-plugin-utils": "^7.28.6"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-literals": {
			"version": "7.27.1",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-literals/-/plugin-transform-literals-7.27.1.tgz",
			"integrity": "sha512-0HCFSepIpLTkLcsi86GG3mTUzxV5jpmbv97hTETW3yzrAij8aqlD36toB1D0daVFJM8NK6GvKO0gslVQmm+zZA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-plugin-utils": "^7.27.1"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-logical-assignment-operators": {
			"version": "7.28.6",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-logical-assignment-operators/-/plugin-transform-logical-assignment-operators-7.28.6.tgz",
			"integrity": "sha512-+anKKair6gpi8VsM/95kmomGNMD0eLz1NQ8+Pfw5sAwWH9fGYXT50E55ZpV0pHUHWf6IUTWPM+f/7AAff+wr9A==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-plugin-utils": "^7.28.6"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-member-expression-literals": {
			"version": "7.27.1",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-member-expression-literals/-/plugin-transform-member-expression-literals-7.27.1.tgz",
			"integrity": "sha512-hqoBX4dcZ1I33jCSWcXrP+1Ku7kdqXf1oeah7ooKOIiAdKQ+uqftgCFNOSzA5AMS2XIHEYeGFg4cKRCdpxzVOQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-plugin-utils": "^7.27.1"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-modules-amd": {
			"version": "7.27.1",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-modules-amd/-/plugin-transform-modules-amd-7.27.1.tgz",
			"integrity": "sha512-iCsytMg/N9/oFq6n+gFTvUYDZQOMK5kEdeYxmxt91fcJGycfxVP9CnrxoliM0oumFERba2i8ZtwRUCMhvP1LnA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-module-transforms": "^7.27.1",
				"@babel/helper-plugin-utils": "^7.27.1"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-modules-commonjs": {
			"version": "7.28.6",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-modules-commonjs/-/plugin-transform-modules-commonjs-7.28.6.tgz",
			"integrity": "sha512-jppVbf8IV9iWWwWTQIxJMAJCWBuuKx71475wHwYytrRGQ2CWiDvYlADQno3tcYpS/T2UUWFQp3nVtYfK/YBQrA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-module-transforms": "^7.28.6",
				"@babel/helper-plugin-utils": "^7.28.6"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-modules-systemjs": {
			"version": "7.29.0",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-modules-systemjs/-/plugin-transform-modules-systemjs-7.29.0.tgz",
			"integrity": "sha512-PrujnVFbOdUpw4UHiVwKvKRLMMic8+eC0CuNlxjsyZUiBjhFdPsewdXCkveh2KqBA9/waD0W1b4hXSOBQJezpQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-module-transforms": "^7.28.6",
				"@babel/helper-plugin-utils": "^7.28.6",
				"@babel/helper-validator-identifier": "^7.28.5",
				"@babel/traverse": "^7.29.0"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-modules-umd": {
			"version": "7.27.1",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-modules-umd/-/plugin-transform-modules-umd-7.27.1.tgz",
			"integrity": "sha512-iQBE/xC5BV1OxJbp6WG7jq9IWiD+xxlZhLrdwpPkTX3ydmXdvoCpyfJN7acaIBZaOqTfr76pgzqBJflNbeRK+w==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-module-transforms": "^7.27.1",
				"@babel/helper-plugin-utils": "^7.27.1"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-named-capturing-groups-regex": {
			"version": "7.29.0",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-named-capturing-groups-regex/-/plugin-transform-named-capturing-groups-regex-7.29.0.tgz",
			"integrity": "sha512-1CZQA5KNAD6ZYQLPw7oi5ewtDNxH/2vuCh+6SmvgDfhumForvs8a1o9n0UrEoBD8HU4djO2yWngTQlXl1NDVEQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-create-regexp-features-plugin": "^7.28.5",
				"@babel/helper-plugin-utils": "^7.28.6"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0"
			}
		},
		"node_modules/@babel/plugin-transform-new-target": {
			"version": "7.27.1",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-new-target/-/plugin-transform-new-target-7.27.1.tgz",
			"integrity": "sha512-f6PiYeqXQ05lYq3TIfIDu/MtliKUbNwkGApPUvyo6+tc7uaR4cPjPe7DFPr15Uyycg2lZU6btZ575CuQoYh7MQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-plugin-utils": "^7.27.1"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-nullish-coalescing-operator": {
			"version": "7.28.6",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-nullish-coalescing-operator/-/plugin-transform-nullish-coalescing-operator-7.28.6.tgz",
			"integrity": "sha512-3wKbRgmzYbw24mDJXT7N+ADXw8BC/imU9yo9c9X9NKaLF1fW+e5H1U5QjMUBe4Qo4Ox/o++IyUkl1sVCLgevKg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-plugin-utils": "^7.28.6"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-numeric-separator": {
			"version": "7.28.6",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-numeric-separator/-/plugin-transform-numeric-separator-7.28.6.tgz",
			"integrity": "sha512-SJR8hPynj8outz+SlStQSwvziMN4+Bq99it4tMIf5/Caq+3iOc0JtKyse8puvyXkk3eFRIA5ID/XfunGgO5i6w==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-plugin-utils": "^7.28.6"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-object-rest-spread": {
			"version": "7.28.6",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-object-rest-spread/-/plugin-transform-object-rest-spread-7.28.6.tgz",
			"integrity": "sha512-5rh+JR4JBC4pGkXLAcYdLHZjXudVxWMXbB6u6+E9lRL5TrGVbHt1TjxGbZ8CkmYw9zjkB7jutzOROArsqtncEA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-compilation-targets": "^7.28.6",
				"@babel/helper-plugin-utils": "^7.28.6",
				"@babel/plugin-transform-destructuring": "^7.28.5",
				"@babel/plugin-transform-parameters": "^7.27.7",
				"@babel/traverse": "^7.28.6"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-object-super": {
			"version": "7.27.1",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-object-super/-/plugin-transform-object-super-7.27.1.tgz",
			"integrity": "sha512-SFy8S9plRPbIcxlJ8A6mT/CxFdJx/c04JEctz4jf8YZaVS2px34j7NXRrlGlHkN/M2gnpL37ZpGRGVFLd3l8Ng==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-plugin-utils": "^7.27.1",
				"@babel/helper-replace-supers": "^7.27.1"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-optional-catch-binding": {
			"version": "7.28.6",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-optional-catch-binding/-/plugin-transform-optional-catch-binding-7.28.6.tgz",
			"integrity": "sha512-R8ja/Pyrv0OGAvAXQhSTmWyPJPml+0TMqXlO5w+AsMEiwb2fg3WkOvob7UxFSL3OIttFSGSRFKQsOhJ/X6HQdQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-plugin-utils": "^7.28.6"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-optional-chaining": {
			"version": "7.28.6",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-optional-chaining/-/plugin-transform-optional-chaining-7.28.6.tgz",
			"integrity": "sha512-A4zobikRGJTsX9uqVFdafzGkqD30t26ck2LmOzAuLL8b2x6k3TIqRiT2xVvA9fNmFeTX484VpsdgmKNA0bS23w==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-plugin-utils": "^7.28.6",
				"@babel/helper-skip-transparent-expression-wrappers": "^7.27.1"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-parameters": {
			"version": "7.27.7",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-parameters/-/plugin-transform-parameters-7.27.7.tgz",
			"integrity": "sha512-qBkYTYCb76RRxUM6CcZA5KRu8K4SM8ajzVeUgVdMVO9NN9uI/GaVmBg/WKJJGnNokV9SY8FxNOVWGXzqzUidBg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-plugin-utils": "^7.27.1"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-private-methods": {
			"version": "7.28.6",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-private-methods/-/plugin-transform-private-methods-7.28.6.tgz",
			"integrity": "sha512-piiuapX9CRv7+0st8lmuUlRSmX6mBcVeNQ1b4AYzJxfCMuBfB0vBXDiGSmm03pKJw1v6cZ8KSeM+oUnM6yAExg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-create-class-features-plugin": "^7.28.6",
				"@babel/helper-plugin-utils": "^7.28.6"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-private-property-in-object": {
			"version": "7.28.6",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-private-property-in-object/-/plugin-transform-private-property-in-object-7.28.6.tgz",
			"integrity": "sha512-b97jvNSOb5+ehyQmBpmhOCiUC5oVK4PMnpRvO7+ymFBoqYjeDHIU9jnrNUuwHOiL9RpGDoKBpSViarV+BU+eVA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-annotate-as-pure": "^7.27.3",
				"@babel/helper-create-class-features-plugin": "^7.28.6",
				"@babel/helper-plugin-utils": "^7.28.6"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-property-literals": {
			"version": "7.27.1",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-property-literals/-/plugin-transform-property-literals-7.27.1.tgz",
			"integrity": "sha512-oThy3BCuCha8kDZ8ZkgOg2exvPYUlprMukKQXI1r1pJ47NCvxfkEy8vK+r/hT9nF0Aa4H1WUPZZjHTFtAhGfmQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-plugin-utils": "^7.27.1"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-regenerator": {
			"version": "7.29.0",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-regenerator/-/plugin-transform-regenerator-7.29.0.tgz",
			"integrity": "sha512-FijqlqMA7DmRdg/aINBSs04y8XNTYw/lr1gJ2WsmBnnaNw1iS43EPkJW+zK7z65auG3AWRFXWj+NcTQwYptUog==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-plugin-utils": "^7.28.6"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-regexp-modifiers": {
			"version": "7.28.6",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-regexp-modifiers/-/plugin-transform-regexp-modifiers-7.28.6.tgz",
			"integrity": "sha512-QGWAepm9qxpaIs7UM9FvUSnCGlb8Ua1RhyM4/veAxLwt3gMat/LSGrZixyuj4I6+Kn9iwvqCyPTtbdxanYoWYg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-create-regexp-features-plugin": "^7.28.5",
				"@babel/helper-plugin-utils": "^7.28.6"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0"
			}
		},
		"node_modules/@babel/plugin-transform-reserved-words": {
			"version": "7.27.1",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-reserved-words/-/plugin-transform-reserved-words-7.27.1.tgz",
			"integrity": "sha512-V2ABPHIJX4kC7HegLkYoDpfg9PVmuWy/i6vUM5eGK22bx4YVFD3M5F0QQnWQoDs6AGsUWTVOopBiMFQgHaSkVw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-plugin-utils": "^7.27.1"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-runtime": {
			"version": "7.29.0",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-runtime/-/plugin-transform-runtime-7.29.0.tgz",
			"integrity": "sha512-jlaRT5dJtMaMCV6fAuLbsQMSwz/QkvaHOHOSXRitGGwSpR1blCY4KUKoyP2tYO8vJcqYe8cEj96cqSztv3uF9w==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-module-imports": "^7.28.6",
				"@babel/helper-plugin-utils": "^7.28.6",
				"babel-plugin-polyfill-corejs2": "^0.4.14",
				"babel-plugin-polyfill-corejs3": "^0.13.0",
				"babel-plugin-polyfill-regenerator": "^0.6.5",
				"semver": "^6.3.1"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-runtime/node_modules/semver": {
			"version": "6.3.1",
			"resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
			"integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
			"dev": true,
			"license": "ISC",
			"bin": {
				"semver": "bin/semver.js"
			}
		},
		"node_modules/@babel/plugin-transform-shorthand-properties": {
			"version": "7.27.1",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-shorthand-properties/-/plugin-transform-shorthand-properties-7.27.1.tgz",
			"integrity": "sha512-N/wH1vcn4oYawbJ13Y/FxcQrWk63jhfNa7jef0ih7PHSIHX2LB7GWE1rkPrOnka9kwMxb6hMl19p7lidA+EHmQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-plugin-utils": "^7.27.1"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-spread": {
			"version": "7.28.6",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-spread/-/plugin-transform-spread-7.28.6.tgz",
			"integrity": "sha512-9U4QObUC0FtJl05AsUcodau/RWDytrU6uKgkxu09mLR9HLDAtUMoPuuskm5huQsoktmsYpI+bGmq+iapDcriKA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-plugin-utils": "^7.28.6",
				"@babel/helper-skip-transparent-expression-wrappers": "^7.27.1"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-sticky-regex": {
			"version": "7.27.1",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-sticky-regex/-/plugin-transform-sticky-regex-7.27.1.tgz",
			"integrity": "sha512-lhInBO5bi/Kowe2/aLdBAawijx+q1pQzicSgnkB6dUPc1+RC8QmJHKf2OjvU+NZWitguJHEaEmbV6VWEouT58g==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-plugin-utils": "^7.27.1"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-template-literals": {
			"version": "7.27.1",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-template-literals/-/plugin-transform-template-literals-7.27.1.tgz",
			"integrity": "sha512-fBJKiV7F2DxZUkg5EtHKXQdbsbURW3DZKQUWphDum0uRP6eHGGa/He9mc0mypL680pb+e/lDIthRohlv8NCHkg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-plugin-utils": "^7.27.1"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-typeof-symbol": {
			"version": "7.27.1",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-typeof-symbol/-/plugin-transform-typeof-symbol-7.27.1.tgz",
			"integrity": "sha512-RiSILC+nRJM7FY5srIyc4/fGIwUhyDuuBSdWn4y6yT6gm652DpCHZjIipgn6B7MQ1ITOUnAKWixEUjQRIBIcLw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-plugin-utils": "^7.27.1"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-typescript": {
			"version": "7.28.6",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-typescript/-/plugin-transform-typescript-7.28.6.tgz",
			"integrity": "sha512-0YWL2RFxOqEm9Efk5PvreamxPME8OyY0wM5wh5lHjF+VtVhdneCWGzZeSqzOfiobVqQaNCd2z0tQvnI9DaPWPw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-annotate-as-pure": "^7.27.3",
				"@babel/helper-create-class-features-plugin": "^7.28.6",
				"@babel/helper-plugin-utils": "^7.28.6",
				"@babel/helper-skip-transparent-expression-wrappers": "^7.27.1",
				"@babel/plugin-syntax-typescript": "^7.28.6"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-unicode-escapes": {
			"version": "7.27.1",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-unicode-escapes/-/plugin-transform-unicode-escapes-7.27.1.tgz",
			"integrity": "sha512-Ysg4v6AmF26k9vpfFuTZg8HRfVWzsh1kVfowA23y9j/Gu6dOuahdUVhkLqpObp3JIv27MLSii6noRnuKN8H0Mg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-plugin-utils": "^7.27.1"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-unicode-property-regex": {
			"version": "7.28.6",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-unicode-property-regex/-/plugin-transform-unicode-property-regex-7.28.6.tgz",
			"integrity": "sha512-4Wlbdl/sIZjzi/8St0evF0gEZrgOswVO6aOzqxh1kDZOl9WmLrHq2HtGhnOJZmHZYKP8WZ1MDLCt5DAWwRo57A==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-create-regexp-features-plugin": "^7.28.5",
				"@babel/helper-plugin-utils": "^7.28.6"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-unicode-regex": {
			"version": "7.27.1",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-unicode-regex/-/plugin-transform-unicode-regex-7.27.1.tgz",
			"integrity": "sha512-xvINq24TRojDuyt6JGtHmkVkrfVV3FPT16uytxImLeBZqW3/H52yN+kM1MGuyPkIQxrzKwPHs5U/MP3qKyzkGw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-create-regexp-features-plugin": "^7.27.1",
				"@babel/helper-plugin-utils": "^7.27.1"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-unicode-sets-regex": {
			"version": "7.28.6",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-unicode-sets-regex/-/plugin-transform-unicode-sets-regex-7.28.6.tgz",
			"integrity": "sha512-/wHc/paTUmsDYN7SZkpWxogTOBNnlx7nBQYfy6JJlCT7G3mVhltk3e++N7zV0XfgGsrqBxd4rJQt9H16I21Y1Q==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-create-regexp-features-plugin": "^7.28.5",
				"@babel/helper-plugin-utils": "^7.28.6"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0"
			}
		},
		"node_modules/@babel/preset-env": {
			"version": "7.29.2",
			"resolved": "https://registry.npmjs.org/@babel/preset-env/-/preset-env-7.29.2.tgz",
			"integrity": "sha512-DYD23veRYGvBFhcTY1iUvJnDNpuqNd/BzBwCvzOTKUnJjKg5kpUBh3/u9585Agdkgj+QuygG7jLfOPWMa2KVNw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/compat-data": "^7.29.0",
				"@babel/helper-compilation-targets": "^7.28.6",
				"@babel/helper-plugin-utils": "^7.28.6",
				"@babel/helper-validator-option": "^7.27.1",
				"@babel/plugin-bugfix-firefox-class-in-computed-class-key": "^7.28.5",
				"@babel/plugin-bugfix-safari-class-field-initializer-scope": "^7.27.1",
				"@babel/plugin-bugfix-safari-id-destructuring-collision-in-function-expression": "^7.27.1",
				"@babel/plugin-bugfix-v8-spread-parameters-in-optional-chaining": "^7.27.1",
				"@babel/plugin-bugfix-v8-static-class-fields-redefine-readonly": "^7.28.6",
				"@babel/plugin-proposal-private-property-in-object": "7.21.0-placeholder-for-preset-env.2",
				"@babel/plugin-syntax-import-assertions": "^7.28.6",
				"@babel/plugin-syntax-import-attributes": "^7.28.6",
				"@babel/plugin-syntax-unicode-sets-regex": "^7.18.6",
				"@babel/plugin-transform-arrow-functions": "^7.27.1",
				"@babel/plugin-transform-async-generator-functions": "^7.29.0",
				"@babel/plugin-transform-async-to-generator": "^7.28.6",
				"@babel/plugin-transform-block-scoped-functions": "^7.27.1",
				"@babel/plugin-transform-block-scoping": "^7.28.6",
				"@babel/plugin-transform-class-properties": "^7.28.6",
				"@babel/plugin-transform-class-static-block": "^7.28.6",
				"@babel/plugin-transform-classes": "^7.28.6",
				"@babel/plugin-transform-computed-properties": "^7.28.6",
				"@babel/plugin-transform-destructuring": "^7.28.5",
				"@babel/plugin-transform-dotall-regex": "^7.28.6",
				"@babel/plugin-transform-duplicate-keys": "^7.27.1",
				"@babel/plugin-transform-duplicate-named-capturing-groups-regex": "^7.29.0",
				"@babel/plugin-transform-dynamic-import": "^7.27.1",
				"@babel/plugin-transform-explicit-resource-management": "^7.28.6",
				"@babel/plugin-transform-exponentiation-operator": "^7.28.6",
				"@babel/plugin-transform-export-namespace-from": "^7.27.1",
				"@babel/plugin-transform-for-of": "^7.27.1",
				"@babel/plugin-transform-function-name": "^7.27.1",
				"@babel/plugin-transform-json-strings": "^7.28.6",
				"@babel/plugin-transform-literals": "^7.27.1",
				"@babel/plugin-transform-logical-assignment-operators": "^7.28.6",
				"@babel/plugin-transform-member-expression-literals": "^7.27.1",
				"@babel/plugin-transform-modules-amd": "^7.27.1",
				"@babel/plugin-transform-modules-commonjs": "^7.28.6",
				"@babel/plugin-transform-modules-systemjs": "^7.29.0",
				"@babel/plugin-transform-modules-umd": "^7.27.1",
				"@babel/plugin-transform-named-capturing-groups-regex": "^7.29.0",
				"@babel/plugin-transform-new-target": "^7.27.1",
				"@babel/plugin-transform-nullish-coalescing-operator": "^7.28.6",
				"@babel/plugin-transform-numeric-separator": "^7.28.6",
				"@babel/plugin-transform-object-rest-spread": "^7.28.6",
				"@babel/plugin-transform-object-super": "^7.27.1",
				"@babel/plugin-transform-optional-catch-binding": "^7.28.6",
				"@babel/plugin-transform-optional-chaining": "^7.28.6",
				"@babel/plugin-transform-parameters": "^7.27.7",
				"@babel/plugin-transform-private-methods": "^7.28.6",
				"@babel/plugin-transform-private-property-in-object": "^7.28.6",
				"@babel/plugin-transform-property-literals": "^7.27.1",
				"@babel/plugin-transform-regenerator": "^7.29.0",
				"@babel/plugin-transform-regexp-modifiers": "^7.28.6",
				"@babel/plugin-transform-reserved-words": "^7.27.1",
				"@babel/plugin-transform-shorthand-properties": "^7.27.1",
				"@babel/plugin-transform-spread": "^7.28.6",
				"@babel/plugin-transform-sticky-regex": "^7.27.1",
				"@babel/plugin-transform-template-literals": "^7.27.1",
				"@babel/plugin-transform-typeof-symbol": "^7.27.1",
				"@babel/plugin-transform-unicode-escapes": "^7.27.1",
				"@babel/plugin-transform-unicode-property-regex": "^7.28.6",
				"@babel/plugin-transform-unicode-regex": "^7.27.1",
				"@babel/plugin-transform-unicode-sets-regex": "^7.28.6",
				"@babel/preset-modules": "0.1.6-no-external-plugins",
				"babel-plugin-polyfill-corejs2": "^0.4.15",
				"babel-plugin-polyfill-corejs3": "^0.14.0",
				"babel-plugin-polyfill-regenerator": "^0.6.6",
				"core-js-compat": "^3.48.0",
				"semver": "^6.3.1"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/preset-env/node_modules/babel-plugin-polyfill-corejs3": {
			"version": "0.14.2",
			"resolved": "https://registry.npmjs.org/babel-plugin-polyfill-corejs3/-/babel-plugin-polyfill-corejs3-0.14.2.tgz",
			"integrity": "sha512-coWpDLJ410R781Npmn/SIBZEsAetR4xVi0SxLMXPaMO4lSf1MwnkGYMtkFxew0Dn8B3/CpbpYxN0JCgg8mn67g==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-define-polyfill-provider": "^0.6.8",
				"core-js-compat": "^3.48.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.4.0 || ^8.0.0-0 <8.0.0"
			}
		},
		"node_modules/@babel/preset-env/node_modules/semver": {
			"version": "6.3.1",
			"resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
			"integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
			"dev": true,
			"license": "ISC",
			"bin": {
				"semver": "bin/semver.js"
			}
		},
		"node_modules/@babel/preset-modules": {
			"version": "0.1.6-no-external-plugins",
			"resolved": "https://registry.npmjs.org/@babel/preset-modules/-/preset-modules-0.1.6-no-external-plugins.tgz",
			"integrity": "sha512-HrcgcIESLm9aIR842yhJ5RWan/gebQUJ6E/E5+rf0y9o6oj7w0Br+sWuL6kEQ/o/AdfvR1Je9jG18/gnpwjEyA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-plugin-utils": "^7.0.0",
				"@babel/types": "^7.4.4",
				"esutils": "^2.0.2"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0 || ^8.0.0-0 <8.0.0"
			}
		},
		"node_modules/@babel/preset-typescript": {
			"version": "7.28.5",
			"resolved": "https://registry.npmjs.org/@babel/preset-typescript/-/preset-typescript-7.28.5.tgz",
			"integrity": "sha512-+bQy5WOI2V6LJZpPVxY+yp66XdZ2yifu0Mc1aP5CQKgjn4QM5IN2i5fAZ4xKop47pr8rpVhiAeu+nDQa12C8+g==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-plugin-utils": "^7.27.1",
				"@babel/helper-validator-option": "^7.27.1",
				"@babel/plugin-syntax-jsx": "^7.27.1",
				"@babel/plugin-transform-modules-commonjs": "^7.27.1",
				"@babel/plugin-transform-typescript": "^7.28.5"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/runtime": {
			"version": "7.29.2",
			"resolved": "https://registry.npmjs.org/@babel/runtime/-/runtime-7.29.2.tgz",
			"integrity": "sha512-JiDShH45zKHWyGe4ZNVRrCjBz8Nh9TMmZG1kh4QTK8hCBTWBi8Da+i7s1fJw7/lYpM4ccepSNfqzZ/QvABBi5g==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=6.9.0"
			}
		},
		"node_modules/@babel/template": {
			"version": "7.28.6",
			"resolved": "https://registry.npmjs.org/@babel/template/-/template-7.28.6.tgz",
			"integrity": "sha512-YA6Ma2KsCdGb+WC6UpBVFJGXL58MDA6oyONbjyF/+5sBgxY/dwkhLogbMT2GXXyU84/IhRw/2D1Os1B/giz+BQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/code-frame": "^7.28.6",
				"@babel/parser": "^7.28.6",
				"@babel/types": "^7.28.6"
			},
			"engines": {
				"node": ">=6.9.0"
			}
		},
		"node_modules/@babel/traverse": {
			"version": "7.29.0",
			"resolved": "https://registry.npmjs.org/@babel/traverse/-/traverse-7.29.0.tgz",
			"integrity": "sha512-4HPiQr0X7+waHfyXPZpWPfWL/J7dcN1mx9gL6WdQVMbPnF3+ZhSMs8tCxN7oHddJE9fhNE7+lxdnlyemKfJRuA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/code-frame": "^7.29.0",
				"@babel/generator": "^7.29.0",
				"@babel/helper-globals": "^7.28.0",
				"@babel/parser": "^7.29.0",
				"@babel/template": "^7.28.6",
				"@babel/types": "^7.29.0",
				"debug": "^4.3.1"
			},
			"engines": {
				"node": ">=6.9.0"
			}
		},
		"node_modules/@babel/types": {
			"version": "7.29.0",
			"resolved": "https://registry.npmjs.org/@babel/types/-/types-7.29.0.tgz",
			"integrity": "sha512-LwdZHpScM4Qz8Xw2iKSzS+cfglZzJGvofQICy7W7v4caru4EaAmyUuO6BGrbyQ2mYV11W0U8j5mBhd14dd3B0A==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-string-parser": "^7.27.1",
				"@babel/helper-validator-identifier": "^7.28.5"
			},
			"engines": {
				"node": ">=6.9.0"
			}
		},
		"node_modules/@bramus/specificity": {
			"version": "2.4.2",
			"resolved": "https://registry.npmjs.org/@bramus/specificity/-/specificity-2.4.2.tgz",
			"integrity": "sha512-ctxtJ/eA+t+6q2++vj5j7FYX3nRu311q1wfYH3xjlLOsczhlhxAg2FWNUXhpGvAw3BWo1xBcvOV6/YLc2r5FJw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"css-tree": "^3.0.0"
			},
			"bin": {
				"specificity": "bin/cli.js"
			}
		},
		"node_modules/@bufbuild/protobuf": {
			"version": "2.11.0",
			"resolved": "https://registry.npmjs.org/@bufbuild/protobuf/-/protobuf-2.11.0.tgz",
			"integrity": "sha512-sBXGT13cpmPR5BMgHE6UEEfEaShh5Ror6rfN3yEK5si7QVrtZg8LEPQb0VVhiLRUslD2yLnXtnRzG035J/mZXQ==",
			"dev": true,
			"license": "(Apache-2.0 AND BSD-3-Clause)"
		},
		"node_modules/@colordx/core": {
			"version": "5.4.0",
			"resolved": "https://registry.npmjs.org/@colordx/core/-/core-5.4.0.tgz",
			"integrity": "sha512-zEvOjz+QQJX9l+HS5UO4tXoHSG+WSxPKHJg293k3j3myUWJtZ9P0pJT42WHLNxueyiVQX6BQtCs59i3MgpTMeg==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@csstools/color-helpers": {
			"version": "6.0.2",
			"resolved": "https://registry.npmjs.org/@csstools/color-helpers/-/color-helpers-6.0.2.tgz",
			"integrity": "sha512-LMGQLS9EuADloEFkcTBR3BwV/CGHV7zyDxVRtVDTwdI2Ca4it0CCVTT9wCkxSgokjE5Ho41hEPgb8OEUwoXr6Q==",
			"dev": true,
			"funding": [
				{
					"type": "github",
					"url": "https://github.com/sponsors/csstools"
				},
				{
					"type": "opencollective",
					"url": "https://opencollective.com/csstools"
				}
			],
			"license": "MIT-0",
			"engines": {
				"node": ">=20.19.0"
			}
		},
		"node_modules/@csstools/css-calc": {
			"version": "3.1.1",
			"resolved": "https://registry.npmjs.org/@csstools/css-calc/-/css-calc-3.1.1.tgz",
			"integrity": "sha512-HJ26Z/vmsZQqs/o3a6bgKslXGFAungXGbinULZO3eMsOyNJHeBBZfup5FiZInOghgoM4Hwnmw+OgbJCNg1wwUQ==",
			"dev": true,
			"funding": [
				{
					"type": "github",
					"url": "https://github.com/sponsors/csstools"
				},
				{
					"type": "opencollective",
					"url": "https://opencollective.com/csstools"
				}
			],
			"license": "MIT",
			"engines": {
				"node": ">=20.19.0"
			},
			"peerDependencies": {
				"@csstools/css-parser-algorithms": "^4.0.0",
				"@csstools/css-tokenizer": "^4.0.0"
			}
		},
		"node_modules/@csstools/css-color-parser": {
			"version": "4.0.2",
			"resolved": "https://registry.npmjs.org/@csstools/css-color-parser/-/css-color-parser-4.0.2.tgz",
			"integrity": "sha512-0GEfbBLmTFf0dJlpsNU7zwxRIH0/BGEMuXLTCvFYxuL1tNhqzTbtnFICyJLTNK4a+RechKP75e7w42ClXSnJQw==",
			"dev": true,
			"funding": [
				{
					"type": "github",
					"url": "https://github.com/sponsors/csstools"
				},
				{
					"type": "opencollective",
					"url": "https://opencollective.com/csstools"
				}
			],
			"license": "MIT",
			"dependencies": {
				"@csstools/color-helpers": "^6.0.2",
				"@csstools/css-calc": "^3.1.1"
			},
			"engines": {
				"node": ">=20.19.0"
			},
			"peerDependencies": {
				"@csstools/css-parser-algorithms": "^4.0.0",
				"@csstools/css-tokenizer": "^4.0.0"
			}
		},
		"node_modules/@csstools/css-parser-algorithms": {
			"version": "4.0.0",
			"resolved": "https://registry.npmjs.org/@csstools/css-parser-algorithms/-/css-parser-algorithms-4.0.0.tgz",
			"integrity": "sha512-+B87qS7fIG3L5h3qwJ/IFbjoVoOe/bpOdh9hAjXbvx0o8ImEmUsGXN0inFOnk2ChCFgqkkGFQ+TpM5rbhkKe4w==",
			"dev": true,
			"funding": [
				{
					"type": "github",
					"url": "https://github.com/sponsors/csstools"
				},
				{
					"type": "opencollective",
					"url": "https://opencollective.com/csstools"
				}
			],
			"license": "MIT",
			"engines": {
				"node": ">=20.19.0"
			},
			"peerDependencies": {
				"@csstools/css-tokenizer": "^4.0.0"
			}
		},
		"node_modules/@csstools/css-syntax-patches-for-csstree": {
			"version": "1.1.2",
			"resolved": "https://registry.npmjs.org/@csstools/css-syntax-patches-for-csstree/-/css-syntax-patches-for-csstree-1.1.2.tgz",
			"integrity": "sha512-5GkLzz4prTIpoyeUiIu3iV6CSG3Plo7xRVOFPKI7FVEJ3mZ0A8SwK0XU3Gl7xAkiQ+mDyam+NNp875/C5y+jSA==",
			"dev": true,
			"funding": [
				{
					"type": "github",
					"url": "https://github.com/sponsors/csstools"
				},
				{
					"type": "opencollective",
					"url": "https://opencollective.com/csstools"
				}
			],
			"license": "MIT-0",
			"peerDependencies": {
				"css-tree": "^3.2.1"
			},
			"peerDependenciesMeta": {
				"css-tree": {
					"optional": true
				}
			}
		},
		"node_modules/@csstools/css-tokenizer": {
			"version": "4.0.0",
			"resolved": "https://registry.npmjs.org/@csstools/css-tokenizer/-/css-tokenizer-4.0.0.tgz",
			"integrity": "sha512-QxULHAm7cNu72w97JUNCBFODFaXpbDg+dP8b/oWFAZ2MTRppA3U00Y2L1HqaS4J6yBqxwa/Y3nMBaxVKbB/NsA==",
			"dev": true,
			"funding": [
				{
					"type": "github",
					"url": "https://github.com/sponsors/csstools"
				},
				{
					"type": "opencollective",
					"url": "https://opencollective.com/csstools"
				}
			],
			"license": "MIT",
			"engines": {
				"node": ">=20.19.0"
			}
		},
		"node_modules/@emnapi/core": {
			"version": "1.9.2",
			"resolved": "https://registry.npmjs.org/@emnapi/core/-/core-1.9.2.tgz",
			"integrity": "sha512-UC+ZhH3XtczQYfOlu3lNEkdW/p4dsJ1r/bP7H8+rhao3TTTMO1ATq/4DdIi23XuGoFY+Cz0JmCbdVl0hz9jZcA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@emnapi/wasi-threads": "1.2.1",
				"tslib": "^2.4.0"
			}
		},
		"node_modules/@emnapi/runtime": {
			"version": "1.9.2",
			"resolved": "https://registry.npmjs.org/@emnapi/runtime/-/runtime-1.9.2.tgz",
			"integrity": "sha512-3U4+MIWHImeyu1wnmVygh5WlgfYDtyf0k8AbLhMFxOipihf6nrWC4syIm/SwEeec0mNSafiiNnMJwbza/Is6Lw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"tslib": "^2.4.0"
			}
		},
		"node_modules/@emnapi/wasi-threads": {
			"version": "1.2.1",
			"resolved": "https://registry.npmjs.org/@emnapi/wasi-threads/-/wasi-threads-1.2.1.tgz",
			"integrity": "sha512-uTII7OYF+/Mes/MrcIOYp5yOtSMLBWSIoLPpcgwipoiKbli6k322tcoFsxoIIxPDqW01SQGAgko4EzZi2BNv2w==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"tslib": "^2.4.0"
			}
		},
		"node_modules/@esbuild/aix-ppc64": {
			"version": "0.27.3",
			"resolved": "https://registry.npmjs.org/@esbuild/aix-ppc64/-/aix-ppc64-0.27.3.tgz",
			"integrity": "sha512-9fJMTNFTWZMh5qwrBItuziu834eOCUcEqymSH7pY+zoMVEZg3gcPuBNxH1EvfVYe9h0x/Ptw8KBzv7qxb7l8dg==",
			"cpu": [
				"ppc64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"aix"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/android-arm": {
			"version": "0.27.3",
			"resolved": "https://registry.npmjs.org/@esbuild/android-arm/-/android-arm-0.27.3.tgz",
			"integrity": "sha512-i5D1hPY7GIQmXlXhs2w8AWHhenb00+GxjxRncS2ZM7YNVGNfaMxgzSGuO8o8SJzRc/oZwU2bcScvVERk03QhzA==",
			"cpu": [
				"arm"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"android"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/android-arm64": {
			"version": "0.27.3",
			"resolved": "https://registry.npmjs.org/@esbuild/android-arm64/-/android-arm64-0.27.3.tgz",
			"integrity": "sha512-YdghPYUmj/FX2SYKJ0OZxf+iaKgMsKHVPF1MAq/P8WirnSpCStzKJFjOjzsW0QQ7oIAiccHdcqjbHmJxRb/dmg==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"android"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/android-x64": {
			"version": "0.27.3",
			"resolved": "https://registry.npmjs.org/@esbuild/android-x64/-/android-x64-0.27.3.tgz",
			"integrity": "sha512-IN/0BNTkHtk8lkOM8JWAYFg4ORxBkZQf9zXiEOfERX/CzxW3Vg1ewAhU7QSWQpVIzTW+b8Xy+lGzdYXV6UZObQ==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"android"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/darwin-arm64": {
			"version": "0.27.3",
			"resolved": "https://registry.npmjs.org/@esbuild/darwin-arm64/-/darwin-arm64-0.27.3.tgz",
			"integrity": "sha512-Re491k7ByTVRy0t3EKWajdLIr0gz2kKKfzafkth4Q8A5n1xTHrkqZgLLjFEHVD+AXdUGgQMq+Godfq45mGpCKg==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"darwin"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/darwin-x64": {
			"version": "0.27.3",
			"resolved": "https://registry.npmjs.org/@esbuild/darwin-x64/-/darwin-x64-0.27.3.tgz",
			"integrity": "sha512-vHk/hA7/1AckjGzRqi6wbo+jaShzRowYip6rt6q7VYEDX4LEy1pZfDpdxCBnGtl+A5zq8iXDcyuxwtv3hNtHFg==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"darwin"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/freebsd-arm64": {
			"version": "0.27.3",
			"resolved": "https://registry.npmjs.org/@esbuild/freebsd-arm64/-/freebsd-arm64-0.27.3.tgz",
			"integrity": "sha512-ipTYM2fjt3kQAYOvo6vcxJx3nBYAzPjgTCk7QEgZG8AUO3ydUhvelmhrbOheMnGOlaSFUoHXB6un+A7q4ygY9w==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"freebsd"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/freebsd-x64": {
			"version": "0.27.3",
			"resolved": "https://registry.npmjs.org/@esbuild/freebsd-x64/-/freebsd-x64-0.27.3.tgz",
			"integrity": "sha512-dDk0X87T7mI6U3K9VjWtHOXqwAMJBNN2r7bejDsc+j03SEjtD9HrOl8gVFByeM0aJksoUuUVU9TBaZa2rgj0oA==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"freebsd"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/linux-arm": {
			"version": "0.27.3",
			"resolved": "https://registry.npmjs.org/@esbuild/linux-arm/-/linux-arm-0.27.3.tgz",
			"integrity": "sha512-s6nPv2QkSupJwLYyfS+gwdirm0ukyTFNl3KTgZEAiJDd+iHZcbTPPcWCcRYH+WlNbwChgH2QkE9NSlNrMT8Gfw==",
			"cpu": [
				"arm"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/linux-arm64": {
			"version": "0.27.3",
			"resolved": "https://registry.npmjs.org/@esbuild/linux-arm64/-/linux-arm64-0.27.3.tgz",
			"integrity": "sha512-sZOuFz/xWnZ4KH3YfFrKCf1WyPZHakVzTiqji3WDc0BCl2kBwiJLCXpzLzUBLgmp4veFZdvN5ChW4Eq/8Fc2Fg==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/linux-ia32": {
			"version": "0.27.3",
			"resolved": "https://registry.npmjs.org/@esbuild/linux-ia32/-/linux-ia32-0.27.3.tgz",
			"integrity": "sha512-yGlQYjdxtLdh0a3jHjuwOrxQjOZYD/C9PfdbgJJF3TIZWnm/tMd/RcNiLngiu4iwcBAOezdnSLAwQDPqTmtTYg==",
			"cpu": [
				"ia32"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/linux-loong64": {
			"version": "0.27.3",
			"resolved": "https://registry.npmjs.org/@esbuild/linux-loong64/-/linux-loong64-0.27.3.tgz",
			"integrity": "sha512-WO60Sn8ly3gtzhyjATDgieJNet/KqsDlX5nRC5Y3oTFcS1l0KWba+SEa9Ja1GfDqSF1z6hif/SkpQJbL63cgOA==",
			"cpu": [
				"loong64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/linux-mips64el": {
			"version": "0.27.3",
			"resolved": "https://registry.npmjs.org/@esbuild/linux-mips64el/-/linux-mips64el-0.27.3.tgz",
			"integrity": "sha512-APsymYA6sGcZ4pD6k+UxbDjOFSvPWyZhjaiPyl/f79xKxwTnrn5QUnXR5prvetuaSMsb4jgeHewIDCIWljrSxw==",
			"cpu": [
				"mips64el"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/linux-ppc64": {
			"version": "0.27.3",
			"resolved": "https://registry.npmjs.org/@esbuild/linux-ppc64/-/linux-ppc64-0.27.3.tgz",
			"integrity": "sha512-eizBnTeBefojtDb9nSh4vvVQ3V9Qf9Df01PfawPcRzJH4gFSgrObw+LveUyDoKU3kxi5+9RJTCWlj4FjYXVPEA==",
			"cpu": [
				"ppc64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/linux-riscv64": {
			"version": "0.27.3",
			"resolved": "https://registry.npmjs.org/@esbuild/linux-riscv64/-/linux-riscv64-0.27.3.tgz",
			"integrity": "sha512-3Emwh0r5wmfm3ssTWRQSyVhbOHvqegUDRd0WhmXKX2mkHJe1SFCMJhagUleMq+Uci34wLSipf8Lagt4LlpRFWQ==",
			"cpu": [
				"riscv64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/linux-s390x": {
			"version": "0.27.3",
			"resolved": "https://registry.npmjs.org/@esbuild/linux-s390x/-/linux-s390x-0.27.3.tgz",
			"integrity": "sha512-pBHUx9LzXWBc7MFIEEL0yD/ZVtNgLytvx60gES28GcWMqil8ElCYR4kvbV2BDqsHOvVDRrOxGySBM9Fcv744hw==",
			"cpu": [
				"s390x"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/linux-x64": {
			"version": "0.27.3",
			"resolved": "https://registry.npmjs.org/@esbuild/linux-x64/-/linux-x64-0.27.3.tgz",
			"integrity": "sha512-Czi8yzXUWIQYAtL/2y6vogER8pvcsOsk5cpwL4Gk5nJqH5UZiVByIY8Eorm5R13gq+DQKYg0+JyQoytLQas4dA==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/netbsd-arm64": {
			"version": "0.27.3",
			"resolved": "https://registry.npmjs.org/@esbuild/netbsd-arm64/-/netbsd-arm64-0.27.3.tgz",
			"integrity": "sha512-sDpk0RgmTCR/5HguIZa9n9u+HVKf40fbEUt+iTzSnCaGvY9kFP0YKBWZtJaraonFnqef5SlJ8/TiPAxzyS+UoA==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"netbsd"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/netbsd-x64": {
			"version": "0.27.3",
			"resolved": "https://registry.npmjs.org/@esbuild/netbsd-x64/-/netbsd-x64-0.27.3.tgz",
			"integrity": "sha512-P14lFKJl/DdaE00LItAukUdZO5iqNH7+PjoBm+fLQjtxfcfFE20Xf5CrLsmZdq5LFFZzb5JMZ9grUwvtVYzjiA==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"netbsd"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/openbsd-arm64": {
			"version": "0.27.3",
			"resolved": "https://registry.npmjs.org/@esbuild/openbsd-arm64/-/openbsd-arm64-0.27.3.tgz",
			"integrity": "sha512-AIcMP77AvirGbRl/UZFTq5hjXK+2wC7qFRGoHSDrZ5v5b8DK/GYpXW3CPRL53NkvDqb9D+alBiC/dV0Fb7eJcw==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"openbsd"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/openbsd-x64": {
			"version": "0.27.3",
			"resolved": "https://registry.npmjs.org/@esbuild/openbsd-x64/-/openbsd-x64-0.27.3.tgz",
			"integrity": "sha512-DnW2sRrBzA+YnE70LKqnM3P+z8vehfJWHXECbwBmH/CU51z6FiqTQTHFenPlHmo3a8UgpLyH3PT+87OViOh1AQ==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"openbsd"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/openharmony-arm64": {
			"version": "0.27.3",
			"resolved": "https://registry.npmjs.org/@esbuild/openharmony-arm64/-/openharmony-arm64-0.27.3.tgz",
			"integrity": "sha512-NinAEgr/etERPTsZJ7aEZQvvg/A6IsZG/LgZy+81wON2huV7SrK3e63dU0XhyZP4RKGyTm7aOgmQk0bGp0fy2g==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"openharmony"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/sunos-x64": {
			"version": "0.27.3",
			"resolved": "https://registry.npmjs.org/@esbuild/sunos-x64/-/sunos-x64-0.27.3.tgz",
			"integrity": "sha512-PanZ+nEz+eWoBJ8/f8HKxTTD172SKwdXebZ0ndd953gt1HRBbhMsaNqjTyYLGLPdoWHy4zLU7bDVJztF5f3BHA==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"sunos"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/win32-arm64": {
			"version": "0.27.3",
			"resolved": "https://registry.npmjs.org/@esbuild/win32-arm64/-/win32-arm64-0.27.3.tgz",
			"integrity": "sha512-B2t59lWWYrbRDw/tjiWOuzSsFh1Y/E95ofKz7rIVYSQkUYBjfSgf6oeYPNWHToFRr2zx52JKApIcAS/D5TUBnA==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"win32"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/win32-ia32": {
			"version": "0.27.3",
			"resolved": "https://registry.npmjs.org/@esbuild/win32-ia32/-/win32-ia32-0.27.3.tgz",
			"integrity": "sha512-QLKSFeXNS8+tHW7tZpMtjlNb7HKau0QDpwm49u0vUp9y1WOF+PEzkU84y9GqYaAVW8aH8f3GcBck26jh54cX4Q==",
			"cpu": [
				"ia32"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"win32"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/win32-x64": {
			"version": "0.27.3",
			"resolved": "https://registry.npmjs.org/@esbuild/win32-x64/-/win32-x64-0.27.3.tgz",
			"integrity": "sha512-4uJGhsxuptu3OcpVAzli+/gWusVGwZZHTlS63hh++ehExkVT8SgiEf7/uC/PclrPPkLhZqGgCTjd0VWLo6xMqA==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"win32"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@eslint-community/eslint-utils": {
			"version": "4.9.1",
			"resolved": "https://registry.npmjs.org/@eslint-community/eslint-utils/-/eslint-utils-4.9.1.tgz",
			"integrity": "sha512-phrYmNiYppR7znFEdqgfWHXR6NCkZEK7hwWDHZUjit/2/U0r6XvkDl0SYnoM51Hq7FhCGdLDT6zxCCOY1hexsQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"eslint-visitor-keys": "^3.4.3"
			},
			"engines": {
				"node": "^12.22.0 || ^14.17.0 || >=16.0.0"
			},
			"funding": {
				"url": "https://opencollective.com/eslint"
			},
			"peerDependencies": {
				"eslint": "^6.0.0 || ^7.0.0 || >=8.0.0"
			}
		},
		"node_modules/@eslint-community/regexpp": {
			"version": "4.12.2",
			"resolved": "https://registry.npmjs.org/@eslint-community/regexpp/-/regexpp-4.12.2.tgz",
			"integrity": "sha512-EriSTlt5OC9/7SXkRSCAhfSxxoSUgBm33OH+IkwbdpgoqsSsUg7y3uh+IICI/Qg4BBWr3U2i39RpmycbxMq4ew==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": "^12.0.0 || ^14.0.0 || >=16.0.0"
			}
		},
		"node_modules/@eslint/config-array": {
			"version": "0.23.4",
			"resolved": "https://registry.npmjs.org/@eslint/config-array/-/config-array-0.23.4.tgz",
			"integrity": "sha512-lf19F24LSMfF8weXvW5QEtnLqW70u7kgit5e9PSx0MsHAFclGd1T9ynvWEMDT1w5J4Qt54tomGeAhdoAku1Xow==",
			"dev": true,
			"license": "Apache-2.0",
			"dependencies": {
				"@eslint/object-schema": "^3.0.4",
				"debug": "^4.3.1",
				"minimatch": "^10.2.4"
			},
			"engines": {
				"node": "^20.19.0 || ^22.13.0 || >=24"
			}
		},
		"node_modules/@eslint/config-helpers": {
			"version": "0.5.4",
			"resolved": "https://registry.npmjs.org/@eslint/config-helpers/-/config-helpers-0.5.4.tgz",
			"integrity": "sha512-jJhqiY3wPMlWWO3370M86CPJ7pt8GmEwSLglMfQhjXal07RCvhmU0as4IuUEW5SJeunfItiEetHmSxCCe9lDBg==",
			"dev": true,
			"license": "Apache-2.0",
			"dependencies": {
				"@eslint/core": "^1.2.0"
			},
			"engines": {
				"node": "^20.19.0 || ^22.13.0 || >=24"
			}
		},
		"node_modules/@eslint/core": {
			"version": "1.2.0",
			"resolved": "https://registry.npmjs.org/@eslint/core/-/core-1.2.0.tgz",
			"integrity": "sha512-8FTGbNzTvmSlc4cZBaShkC6YvFMG0riksYWRFKXztqVdXaQbcZLXlFbSpC05s70sGEsXAw0qwhx69JiW7hQS7A==",
			"dev": true,
			"license": "Apache-2.0",
			"dependencies": {
				"@types/json-schema": "^7.0.15"
			},
			"engines": {
				"node": "^20.19.0 || ^22.13.0 || >=24"
			}
		},
		"node_modules/@eslint/js": {
			"version": "10.0.1",
			"resolved": "https://registry.npmjs.org/@eslint/js/-/js-10.0.1.tgz",
			"integrity": "sha512-zeR9k5pd4gxjZ0abRoIaxdc7I3nDktoXZk2qOv9gCNWx3mVwEn32VRhyLaRsDiJjTs0xq/T8mfPtyuXu7GWBcA==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": "^20.19.0 || ^22.13.0 || >=24"
			},
			"funding": {
				"url": "https://eslint.org/donate"
			},
			"peerDependencies": {
				"eslint": "^10.0.0"
			},
			"peerDependenciesMeta": {
				"eslint": {
					"optional": true
				}
			}
		},
		"node_modules/@eslint/object-schema": {
			"version": "3.0.4",
			"resolved": "https://registry.npmjs.org/@eslint/object-schema/-/object-schema-3.0.4.tgz",
			"integrity": "sha512-55lO/7+Yp0ISKRP0PsPtNTeNGapXaO085aELZmWCVc5SH3jfrqpuU6YgOdIxMS99ZHkQN1cXKE+cdIqwww9ptw==",
			"dev": true,
			"license": "Apache-2.0",
			"engines": {
				"node": "^20.19.0 || ^22.13.0 || >=24"
			}
		},
		"node_modules/@eslint/plugin-kit": {
			"version": "0.7.0",
			"resolved": "https://registry.npmjs.org/@eslint/plugin-kit/-/plugin-kit-0.7.0.tgz",
			"integrity": "sha512-ejvBr8MQCbVsWNZnCwDXjUKq40MDmHalq7cJ6e9s/qzTUFIIo/afzt1Vui9T97FM/V/pN4YsFVoed5NIa96RDg==",
			"dev": true,
			"license": "Apache-2.0",
			"dependencies": {
				"@eslint/core": "^1.2.0",
				"levn": "^0.4.1"
			},
			"engines": {
				"node": "^20.19.0 || ^22.13.0 || >=24"
			}
		},
		"node_modules/@exodus/bytes": {
			"version": "1.15.0",
			"resolved": "https://registry.npmjs.org/@exodus/bytes/-/bytes-1.15.0.tgz",
			"integrity": "sha512-UY0nlA+feH81UGSHv92sLEPLCeZFjXOuHhrIo0HQydScuQc8s0A7kL/UdgwgDq8g8ilksmuoF35YVTNphV2aBQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": "^20.19.0 || ^22.12.0 || >=24.0.0"
			},
			"peerDependencies": {
				"@noble/hashes": "^1.8.0 || ^2.0.0"
			},
			"peerDependenciesMeta": {
				"@noble/hashes": {
					"optional": true
				}
			}
		},
		"node_modules/@gar/promise-retry": {
			"version": "1.0.3",
			"resolved": "https://registry.npmjs.org/@gar/promise-retry/-/promise-retry-1.0.3.tgz",
			"integrity": "sha512-GmzA9ckNokPypTg10pgpeHNQe7ph+iIKKmhKu3Ob9ANkswreCx7R3cKmY781K8QK3AqVL3xVh9A42JvIAbkkSA==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": "^20.17.0 || >=22.9.0"
			}
		},
		"node_modules/@harperfast/extended-iterable": {
			"version": "1.0.3",
			"resolved": "https://registry.npmjs.org/@harperfast/extended-iterable/-/extended-iterable-1.0.3.tgz",
			"integrity": "sha512-sSAYhQca3rDWtQUHSAPeO7axFIUJOI6hn1gjRC5APVE1a90tuyT8f5WIgRsFhhWA7htNkju2veB9eWL6YHi/Lw==",
			"dev": true,
			"license": "Apache-2.0",
			"optional": true
		},
		"node_modules/@hono/node-server": {
			"version": "1.19.12",
			"resolved": "https://registry.npmjs.org/@hono/node-server/-/node-server-1.19.12.tgz",
			"integrity": "sha512-txsUW4SQ1iilgE0l9/e9VQWmELXifEFvmdA1j6WFh/aFPj99hIntrSsq/if0UWyGVkmrRPKA1wCeP+UCr1B9Uw==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=18.14.1"
			},
			"peerDependencies": {
				"hono": "^4"
			}
		},
		"node_modules/@humanfs/core": {
			"version": "0.19.1",
			"resolved": "https://registry.npmjs.org/@humanfs/core/-/core-0.19.1.tgz",
			"integrity": "sha512-5DyQ4+1JEUzejeK1JGICcideyfUbGixgS9jNgex5nqkW+cY7WZhxBigmieN5Qnw9ZosSNVC9KQKyb+GUaGyKUA==",
			"dev": true,
			"license": "Apache-2.0",
			"engines": {
				"node": ">=18.18.0"
			}
		},
		"node_modules/@humanfs/node": {
			"version": "0.16.7",
			"resolved": "https://registry.npmjs.org/@humanfs/node/-/node-0.16.7.tgz",
			"integrity": "sha512-/zUx+yOsIrG4Y43Eh2peDeKCxlRt/gET6aHfaKpuq267qXdYDFViVHfMaLyygZOnl0kGWxFIgsBy8QFuTLUXEQ==",
			"dev": true,
			"license": "Apache-2.0",
			"dependencies": {
				"@humanfs/core": "^0.19.1",
				"@humanwhocodes/retry": "^0.4.0"
			},
			"engines": {
				"node": ">=18.18.0"
			}
		},
		"node_modules/@humanwhocodes/module-importer": {
			"version": "1.0.1",
			"resolved": "https://registry.npmjs.org/@humanwhocodes/module-importer/-/module-importer-1.0.1.tgz",
			"integrity": "sha512-bxveV4V8v5Yb4ncFTT3rPSgZBOpCkjfK0y4oVVVJwIuDVBRMDXrPyXRL988i5ap9m9bnyEEjWfm5WkBmtffLfA==",
			"dev": true,
			"license": "Apache-2.0",
			"engines": {
				"node": ">=12.22"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/nzakas"
			}
		},
		"node_modules/@humanwhocodes/retry": {
			"version": "0.4.3",
			"resolved": "https://registry.npmjs.org/@humanwhocodes/retry/-/retry-0.4.3.tgz",
			"integrity": "sha512-bV0Tgo9K4hfPCek+aMAn81RppFKv2ySDQeMoSZuvTASywNTnVJCArCZE2FWqpvIatKu7VMRLWlR1EazvVhDyhQ==",
			"dev": true,
			"license": "Apache-2.0",
			"engines": {
				"node": ">=18.18"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/nzakas"
			}
		},
		"node_modules/@inquirer/ansi": {
			"version": "1.0.2",
			"resolved": "https://registry.npmjs.org/@inquirer/ansi/-/ansi-1.0.2.tgz",
			"integrity": "sha512-S8qNSZiYzFd0wAcyG5AXCvUHC5Sr7xpZ9wZ2py9XR88jUz8wooStVx5M6dRzczbBWjic9NP7+rY0Xi7qqK/aMQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@inquirer/checkbox": {
			"version": "4.3.2",
			"resolved": "https://registry.npmjs.org/@inquirer/checkbox/-/checkbox-4.3.2.tgz",
			"integrity": "sha512-VXukHf0RR1doGe6Sm4F0Em7SWYLTHSsbGfJdS9Ja2bX5/D5uwVOEjr07cncLROdBvmnvCATYEWlHqYmXv2IlQA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@inquirer/ansi": "^1.0.2",
				"@inquirer/core": "^10.3.2",
				"@inquirer/figures": "^1.0.15",
				"@inquirer/type": "^3.0.10",
				"yoctocolors-cjs": "^2.1.3"
			},
			"engines": {
				"node": ">=18"
			},
			"peerDependencies": {
				"@types/node": ">=18"
			},
			"peerDependenciesMeta": {
				"@types/node": {
					"optional": true
				}
			}
		},
		"node_modules/@inquirer/confirm": {
			"version": "5.1.21",
			"resolved": "https://registry.npmjs.org/@inquirer/confirm/-/confirm-5.1.21.tgz",
			"integrity": "sha512-KR8edRkIsUayMXV+o3Gv+q4jlhENF9nMYUZs9PA2HzrXeHI8M5uDag70U7RJn9yyiMZSbtF5/UexBtAVtZGSbQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@inquirer/core": "^10.3.2",
				"@inquirer/type": "^3.0.10"
			},
			"engines": {
				"node": ">=18"
			},
			"peerDependencies": {
				"@types/node": ">=18"
			},
			"peerDependenciesMeta": {
				"@types/node": {
					"optional": true
				}
			}
		},
		"node_modules/@inquirer/core": {
			"version": "10.3.2",
			"resolved": "https://registry.npmjs.org/@inquirer/core/-/core-10.3.2.tgz",
			"integrity": "sha512-43RTuEbfP8MbKzedNqBrlhhNKVwoK//vUFNW3Q3vZ88BLcrs4kYpGg+B2mm5p2K/HfygoCxuKwJJiv8PbGmE0A==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@inquirer/ansi": "^1.0.2",
				"@inquirer/figures": "^1.0.15",
				"@inquirer/type": "^3.0.10",
				"cli-width": "^4.1.0",
				"mute-stream": "^2.0.0",
				"signal-exit": "^4.1.0",
				"wrap-ansi": "^6.2.0",
				"yoctocolors-cjs": "^2.1.3"
			},
			"engines": {
				"node": ">=18"
			},
			"peerDependencies": {
				"@types/node": ">=18"
			},
			"peerDependenciesMeta": {
				"@types/node": {
					"optional": true
				}
			}
		},
		"node_modules/@inquirer/editor": {
			"version": "4.2.23",
			"resolved": "https://registry.npmjs.org/@inquirer/editor/-/editor-4.2.23.tgz",
			"integrity": "sha512-aLSROkEwirotxZ1pBaP8tugXRFCxW94gwrQLxXfrZsKkfjOYC1aRvAZuhpJOb5cu4IBTJdsCigUlf2iCOu4ZDQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@inquirer/core": "^10.3.2",
				"@inquirer/external-editor": "^1.0.3",
				"@inquirer/type": "^3.0.10"
			},
			"engines": {
				"node": ">=18"
			},
			"peerDependencies": {
				"@types/node": ">=18"
			},
			"peerDependenciesMeta": {
				"@types/node": {
					"optional": true
				}
			}
		},
		"node_modules/@inquirer/expand": {
			"version": "4.0.23",
			"resolved": "https://registry.npmjs.org/@inquirer/expand/-/expand-4.0.23.tgz",
			"integrity": "sha512-nRzdOyFYnpeYTTR2qFwEVmIWypzdAx/sIkCMeTNTcflFOovfqUk+HcFhQQVBftAh9gmGrpFj6QcGEqrDMDOiew==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@inquirer/core": "^10.3.2",
				"@inquirer/type": "^3.0.10",
				"yoctocolors-cjs": "^2.1.3"
			},
			"engines": {
				"node": ">=18"
			},
			"peerDependencies": {
				"@types/node": ">=18"
			},
			"peerDependenciesMeta": {
				"@types/node": {
					"optional": true
				}
			}
		},
		"node_modules/@inquirer/external-editor": {
			"version": "1.0.3",
			"resolved": "https://registry.npmjs.org/@inquirer/external-editor/-/external-editor-1.0.3.tgz",
			"integrity": "sha512-RWbSrDiYmO4LbejWY7ttpxczuwQyZLBUyygsA9Nsv95hpzUWwnNTVQmAq3xuh7vNwCp07UTmE5i11XAEExx4RA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"chardet": "^2.1.1",
				"iconv-lite": "^0.7.0"
			},
			"engines": {
				"node": ">=18"
			},
			"peerDependencies": {
				"@types/node": ">=18"
			},
			"peerDependenciesMeta": {
				"@types/node": {
					"optional": true
				}
			}
		},
		"node_modules/@inquirer/figures": {
			"version": "1.0.15",
			"resolved": "https://registry.npmjs.org/@inquirer/figures/-/figures-1.0.15.tgz",
			"integrity": "sha512-t2IEY+unGHOzAaVM5Xx6DEWKeXlDDcNPeDyUpsRc6CUhBfU3VQOEl+Vssh7VNp1dR8MdUJBWhuObjXCsVpjN5g==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@inquirer/input": {
			"version": "4.3.1",
			"resolved": "https://registry.npmjs.org/@inquirer/input/-/input-4.3.1.tgz",
			"integrity": "sha512-kN0pAM4yPrLjJ1XJBjDxyfDduXOuQHrBB8aLDMueuwUGn+vNpF7Gq7TvyVxx8u4SHlFFj4trmj+a2cbpG4Jn1g==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@inquirer/core": "^10.3.2",
				"@inquirer/type": "^3.0.10"
			},
			"engines": {
				"node": ">=18"
			},
			"peerDependencies": {
				"@types/node": ">=18"
			},
			"peerDependenciesMeta": {
				"@types/node": {
					"optional": true
				}
			}
		},
		"node_modules/@inquirer/number": {
			"version": "3.0.23",
			"resolved": "https://registry.npmjs.org/@inquirer/number/-/number-3.0.23.tgz",
			"integrity": "sha512-5Smv0OK7K0KUzUfYUXDXQc9jrf8OHo4ktlEayFlelCjwMXz0299Y8OrI+lj7i4gCBY15UObk76q0QtxjzFcFcg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@inquirer/core": "^10.3.2",
				"@inquirer/type": "^3.0.10"
			},
			"engines": {
				"node": ">=18"
			},
			"peerDependencies": {
				"@types/node": ">=18"
			},
			"peerDependenciesMeta": {
				"@types/node": {
					"optional": true
				}
			}
		},
		"node_modules/@inquirer/password": {
			"version": "4.0.23",
			"resolved": "https://registry.npmjs.org/@inquirer/password/-/password-4.0.23.tgz",
			"integrity": "sha512-zREJHjhT5vJBMZX/IUbyI9zVtVfOLiTO66MrF/3GFZYZ7T4YILW5MSkEYHceSii/KtRk+4i3RE7E1CUXA2jHcA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@inquirer/ansi": "^1.0.2",
				"@inquirer/core": "^10.3.2",
				"@inquirer/type": "^3.0.10"
			},
			"engines": {
				"node": ">=18"
			},
			"peerDependencies": {
				"@types/node": ">=18"
			},
			"peerDependenciesMeta": {
				"@types/node": {
					"optional": true
				}
			}
		},
		"node_modules/@inquirer/prompts": {
			"version": "7.10.1",
			"resolved": "https://registry.npmjs.org/@inquirer/prompts/-/prompts-7.10.1.tgz",
			"integrity": "sha512-Dx/y9bCQcXLI5ooQ5KyvA4FTgeo2jYj/7plWfV5Ak5wDPKQZgudKez2ixyfz7tKXzcJciTxqLeK7R9HItwiByg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@inquirer/checkbox": "^4.3.2",
				"@inquirer/confirm": "^5.1.21",
				"@inquirer/editor": "^4.2.23",
				"@inquirer/expand": "^4.0.23",
				"@inquirer/input": "^4.3.1",
				"@inquirer/number": "^3.0.23",
				"@inquirer/password": "^4.0.23",
				"@inquirer/rawlist": "^4.1.11",
				"@inquirer/search": "^3.2.2",
				"@inquirer/select": "^4.4.2"
			},
			"engines": {
				"node": ">=18"
			},
			"peerDependencies": {
				"@types/node": ">=18"
			},
			"peerDependenciesMeta": {
				"@types/node": {
					"optional": true
				}
			}
		},
		"node_modules/@inquirer/rawlist": {
			"version": "4.1.11",
			"resolved": "https://registry.npmjs.org/@inquirer/rawlist/-/rawlist-4.1.11.tgz",
			"integrity": "sha512-+LLQB8XGr3I5LZN/GuAHo+GpDJegQwuPARLChlMICNdwW7OwV2izlCSCxN6cqpL0sMXmbKbFcItJgdQq5EBXTw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@inquirer/core": "^10.3.2",
				"@inquirer/type": "^3.0.10",
				"yoctocolors-cjs": "^2.1.3"
			},
			"engines": {
				"node": ">=18"
			},
			"peerDependencies": {
				"@types/node": ">=18"
			},
			"peerDependenciesMeta": {
				"@types/node": {
					"optional": true
				}
			}
		},
		"node_modules/@inquirer/search": {
			"version": "3.2.2",
			"resolved": "https://registry.npmjs.org/@inquirer/search/-/search-3.2.2.tgz",
			"integrity": "sha512-p2bvRfENXCZdWF/U2BXvnSI9h+tuA8iNqtUKb9UWbmLYCRQxd8WkvwWvYn+3NgYaNwdUkHytJMGG4MMLucI1kA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@inquirer/core": "^10.3.2",
				"@inquirer/figures": "^1.0.15",
				"@inquirer/type": "^3.0.10",
				"yoctocolors-cjs": "^2.1.3"
			},
			"engines": {
				"node": ">=18"
			},
			"peerDependencies": {
				"@types/node": ">=18"
			},
			"peerDependenciesMeta": {
				"@types/node": {
					"optional": true
				}
			}
		},
		"node_modules/@inquirer/select": {
			"version": "4.4.2",
			"resolved": "https://registry.npmjs.org/@inquirer/select/-/select-4.4.2.tgz",
			"integrity": "sha512-l4xMuJo55MAe+N7Qr4rX90vypFwCajSakx59qe/tMaC1aEHWLyw68wF4o0A4SLAY4E0nd+Vt+EyskeDIqu1M6w==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@inquirer/ansi": "^1.0.2",
				"@inquirer/core": "^10.3.2",
				"@inquirer/figures": "^1.0.15",
				"@inquirer/type": "^3.0.10",
				"yoctocolors-cjs": "^2.1.3"
			},
			"engines": {
				"node": ">=18"
			},
			"peerDependencies": {
				"@types/node": ">=18"
			},
			"peerDependenciesMeta": {
				"@types/node": {
					"optional": true
				}
			}
		},
		"node_modules/@inquirer/type": {
			"version": "3.0.10",
			"resolved": "https://registry.npmjs.org/@inquirer/type/-/type-3.0.10.tgz",
			"integrity": "sha512-BvziSRxfz5Ov8ch0z/n3oijRSEcEsHnhggm4xFZe93DHcUCTlutlq9Ox4SVENAfcRD22UQq7T/atg9Wr3k09eA==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=18"
			},
			"peerDependencies": {
				"@types/node": ">=18"
			},
			"peerDependenciesMeta": {
				"@types/node": {
					"optional": true
				}
			}
		},
		"node_modules/@isaacs/fs-minipass": {
			"version": "4.0.1",
			"resolved": "https://registry.npmjs.org/@isaacs/fs-minipass/-/fs-minipass-4.0.1.tgz",
			"integrity": "sha512-wgm9Ehl2jpeqP3zw/7mo3kRHFp5MEDhqAdwy1fTGkHAwnkGOVsgpvQhL8B5n1qlb01jV3n/bI0ZfZp5lWA1k4w==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"minipass": "^7.0.4"
			},
			"engines": {
				"node": ">=18.0.0"
			}
		},
		"node_modules/@istanbuljs/schema": {
			"version": "0.1.3",
			"resolved": "https://registry.npmjs.org/@istanbuljs/schema/-/schema-0.1.3.tgz",
			"integrity": "sha512-ZXRY4jNvVgSVQ8DL3LTcakaAtXwTVUxE81hslsyD2AtoXW/wVob10HkOJ1X/pAlcI7D+2YoZKg5do8G/w6RYgA==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/@jest/diff-sequences": {
			"version": "30.3.0",
			"resolved": "https://registry.npmjs.org/@jest/diff-sequences/-/diff-sequences-30.3.0.tgz",
			"integrity": "sha512-cG51MVnLq1ecVUaQ3fr6YuuAOitHK1S4WUJHnsPFE/quQr33ADUx1FfrTCpMCRxvy0Yr9BThKpDjSlcTi91tMA==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": "^18.14.0 || ^20.0.0 || ^22.0.0 || >=24.0.0"
			}
		},
		"node_modules/@jest/get-type": {
			"version": "30.1.0",
			"resolved": "https://registry.npmjs.org/@jest/get-type/-/get-type-30.1.0.tgz",
			"integrity": "sha512-eMbZE2hUnx1WV0pmURZY9XoXPkUYjpc55mb0CrhtdWLtzMQPFvu/rZkTLZFTsdaVQa+Tr4eWAteqcUzoawq/uA==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": "^18.14.0 || ^20.0.0 || ^22.0.0 || >=24.0.0"
			}
		},
		"node_modules/@jest/pattern": {
			"version": "30.0.1",
			"resolved": "https://registry.npmjs.org/@jest/pattern/-/pattern-30.0.1.tgz",
			"integrity": "sha512-gWp7NfQW27LaBQz3TITS8L7ZCQ0TLvtmI//4OwlQRx4rnWxcPNIYjxZpDcN4+UlGxgm3jS5QPz8IPTCkb59wZA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@types/node": "*",
				"jest-regex-util": "30.0.1"
			},
			"engines": {
				"node": "^18.14.0 || ^20.0.0 || ^22.0.0 || >=24.0.0"
			}
		},
		"node_modules/@jest/schemas": {
			"version": "30.0.5",
			"resolved": "https://registry.npmjs.org/@jest/schemas/-/schemas-30.0.5.tgz",
			"integrity": "sha512-DmdYgtezMkh3cpU8/1uyXakv3tJRcmcXxBOcO0tbaozPwpmh4YMsnWrQm9ZmZMfa5ocbxzbFk6O4bDPEc/iAnA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@sinclair/typebox": "^0.34.0"
			},
			"engines": {
				"node": "^18.14.0 || ^20.0.0 || ^22.0.0 || >=24.0.0"
			}
		},
		"node_modules/@jest/types": {
			"version": "30.3.0",
			"resolved": "https://registry.npmjs.org/@jest/types/-/types-30.3.0.tgz",
			"integrity": "sha512-JHm87k7bA33hpBngtU8h6UBub/fqqA9uXfw+21j5Hmk7ooPHlboRNxHq0JcMtC+n8VJGP1mcfnD3Mk+XKe1oSw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@jest/pattern": "30.0.1",
				"@jest/schemas": "30.0.5",
				"@types/istanbul-lib-coverage": "^2.0.6",
				"@types/istanbul-reports": "^3.0.4",
				"@types/node": "*",
				"@types/yargs": "^17.0.33",
				"chalk": "^4.1.2"
			},
			"engines": {
				"node": "^18.14.0 || ^20.0.0 || ^22.0.0 || >=24.0.0"
			}
		},
		"node_modules/@jest/types/node_modules/ansi-styles": {
			"version": "4.3.0",
			"resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz",
			"integrity": "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"color-convert": "^2.0.1"
			},
			"engines": {
				"node": ">=8"
			},
			"funding": {
				"url": "https://github.com/chalk/ansi-styles?sponsor=1"
			}
		},
		"node_modules/@jest/types/node_modules/chalk": {
			"version": "4.1.2",
			"resolved": "https://registry.npmjs.org/chalk/-/chalk-4.1.2.tgz",
			"integrity": "sha512-oKnbhFyRIXpUuez8iBMmyEa4nbj4IOQyuhc/wy9kY7/WVPcwIO9VA668Pu8RkO7+0G76SLROeyw9CpQ061i4mA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ansi-styles": "^4.1.0",
				"supports-color": "^7.1.0"
			},
			"engines": {
				"node": ">=10"
			},
			"funding": {
				"url": "https://github.com/chalk/chalk?sponsor=1"
			}
		},
		"node_modules/@jridgewell/gen-mapping": {
			"version": "0.3.13",
			"resolved": "https://registry.npmjs.org/@jridgewell/gen-mapping/-/gen-mapping-0.3.13.tgz",
			"integrity": "sha512-2kkt/7niJ6MgEPxF0bYdQ6etZaA+fQvDcLKckhy1yIQOzaoKjBBjSj63/aLVjYE3qhRt5dvM+uUyfCg6UKCBbA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@jridgewell/sourcemap-codec": "^1.5.0",
				"@jridgewell/trace-mapping": "^0.3.24"
			}
		},
		"node_modules/@jridgewell/remapping": {
			"version": "2.3.5",
			"resolved": "https://registry.npmjs.org/@jridgewell/remapping/-/remapping-2.3.5.tgz",
			"integrity": "sha512-LI9u/+laYG4Ds1TDKSJW2YPrIlcVYOwi2fUC6xB43lueCjgxV4lffOCZCtYFiH6TNOX+tQKXx97T4IKHbhyHEQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@jridgewell/gen-mapping": "^0.3.5",
				"@jridgewell/trace-mapping": "^0.3.24"
			}
		},
		"node_modules/@jridgewell/resolve-uri": {
			"version": "3.1.2",
			"resolved": "https://registry.npmjs.org/@jridgewell/resolve-uri/-/resolve-uri-3.1.2.tgz",
			"integrity": "sha512-bRISgCIjP20/tbWSPWMEi54QVPRZExkuD9lJL+UIxUKtwVJA8wW1Trb1jMs1RFXo1CBTNZ/5hpC9QvmKWdopKw==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=6.0.0"
			}
		},
		"node_modules/@jridgewell/source-map": {
			"version": "0.3.11",
			"resolved": "https://registry.npmjs.org/@jridgewell/source-map/-/source-map-0.3.11.tgz",
			"integrity": "sha512-ZMp1V8ZFcPG5dIWnQLr3NSI1MiCU7UETdS/A0G8V/XWHvJv3ZsFqutJn1Y5RPmAPX6F3BiE397OqveU/9NCuIA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@jridgewell/gen-mapping": "^0.3.5",
				"@jridgewell/trace-mapping": "^0.3.25"
			}
		},
		"node_modules/@jridgewell/sourcemap-codec": {
			"version": "1.5.5",
			"resolved": "https://registry.npmjs.org/@jridgewell/sourcemap-codec/-/sourcemap-codec-1.5.5.tgz",
			"integrity": "sha512-cYQ9310grqxueWbl+WuIUIaiUaDcj7WOq5fVhEljNVgRfOUhY9fy2zTvfoqWsnebh8Sl70VScFbICvJnLKB0Og==",
			"license": "MIT"
		},
		"node_modules/@jridgewell/trace-mapping": {
			"version": "0.3.31",
			"resolved": "https://registry.npmjs.org/@jridgewell/trace-mapping/-/trace-mapping-0.3.31.tgz",
			"integrity": "sha512-zzNR+SdQSDJzc8joaeP8QQoCQr8NuYx2dIIytl1QeBEZHJ9uW6hebsrYgbz8hJwUQao3TWCMtmfV8Nu1twOLAw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@jridgewell/resolve-uri": "^3.1.0",
				"@jridgewell/sourcemap-codec": "^1.4.14"
			}
		},
		"node_modules/@jsonjoy.com/base64": {
			"version": "1.1.2",
			"resolved": "https://registry.npmjs.org/@jsonjoy.com/base64/-/base64-1.1.2.tgz",
			"integrity": "sha512-q6XAnWQDIMA3+FTiOYajoYqySkO+JSat0ytXGSuRdq9uXE7o92gzuQwQM14xaCRlBLGq3v5miDGC4vkVTn54xA==",
			"dev": true,
			"license": "Apache-2.0",
			"engines": {
				"node": ">=10.0"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/streamich"
			},
			"peerDependencies": {
				"tslib": "2"
			}
		},
		"node_modules/@jsonjoy.com/buffers": {
			"version": "17.67.0",
			"resolved": "https://registry.npmjs.org/@jsonjoy.com/buffers/-/buffers-17.67.0.tgz",
			"integrity": "sha512-tfExRpYxBvi32vPs9ZHaTjSP4fHAfzSmcahOfNxtvGHcyJel+aibkPlGeBB+7AoC6hL7lXIE++8okecBxx7lcw==",
			"dev": true,
			"license": "Apache-2.0",
			"engines": {
				"node": ">=10.0"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/streamich"
			},
			"peerDependencies": {
				"tslib": "2"
			}
		},
		"node_modules/@jsonjoy.com/codegen": {
			"version": "1.0.0",
			"resolved": "https://registry.npmjs.org/@jsonjoy.com/codegen/-/codegen-1.0.0.tgz",
			"integrity": "sha512-E8Oy+08cmCf0EK/NMxpaJZmOxPqM+6iSe2S4nlSBrPZOORoDJILxtbSUEDKQyTamm/BVAhIGllOBNU79/dwf0g==",
			"dev": true,
			"license": "Apache-2.0",
			"engines": {
				"node": ">=10.0"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/streamich"
			},
			"peerDependencies": {
				"tslib": "2"
			}
		},
		"node_modules/@jsonjoy.com/fs-core": {
			"version": "4.57.2",
			"resolved": "https://registry.npmjs.org/@jsonjoy.com/fs-core/-/fs-core-4.57.2.tgz",
			"integrity": "sha512-SVjwklkpIV5wrynpYtuYnfYH1QF4/nDuLBX7VXdb+3miglcAgBVZb/5y0cOsehRV/9Vb+3UqhkMq3/NR3ztdkQ==",
			"dev": true,
			"license": "Apache-2.0",
			"dependencies": {
				"@jsonjoy.com/fs-node-builtins": "4.57.2",
				"@jsonjoy.com/fs-node-utils": "4.57.2",
				"thingies": "^2.5.0"
			},
			"engines": {
				"node": ">=10.0"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/streamich"
			},
			"peerDependencies": {
				"tslib": "2"
			}
		},
		"node_modules/@jsonjoy.com/fs-fsa": {
			"version": "4.57.2",
			"resolved": "https://registry.npmjs.org/@jsonjoy.com/fs-fsa/-/fs-fsa-4.57.2.tgz",
			"integrity": "sha512-fhO8+iR2I+OCw668ISDJdn1aArc9zx033sWejIyzQ8RBeXa9bDSaUeA3ix0poYOfrj1KdOzytmYNv2/uLDfV6g==",
			"dev": true,
			"license": "Apache-2.0",
			"dependencies": {
				"@jsonjoy.com/fs-core": "4.57.2",
				"@jsonjoy.com/fs-node-builtins": "4.57.2",
				"@jsonjoy.com/fs-node-utils": "4.57.2",
				"thingies": "^2.5.0"
			},
			"engines": {
				"node": ">=10.0"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/streamich"
			},
			"peerDependencies": {
				"tslib": "2"
			}
		},
		"node_modules/@jsonjoy.com/fs-node": {
			"version": "4.57.2",
			"resolved": "https://registry.npmjs.org/@jsonjoy.com/fs-node/-/fs-node-4.57.2.tgz",
			"integrity": "sha512-nX2AdL6cOFwLdju9G4/nbRnYevmCJbh7N7hvR3gGm97Cs60uEjyd0rpR+YBS7cTg175zzl22pGKXR5USaQMvKg==",
			"dev": true,
			"license": "Apache-2.0",
			"dependencies": {
				"@jsonjoy.com/fs-core": "4.57.2",
				"@jsonjoy.com/fs-node-builtins": "4.57.2",
				"@jsonjoy.com/fs-node-utils": "4.57.2",
				"@jsonjoy.com/fs-print": "4.57.2",
				"@jsonjoy.com/fs-snapshot": "4.57.2",
				"glob-to-regex.js": "^1.0.0",
				"thingies": "^2.5.0"
			},
			"engines": {
				"node": ">=10.0"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/streamich"
			},
			"peerDependencies": {
				"tslib": "2"
			}
		},
		"node_modules/@jsonjoy.com/fs-node-builtins": {
			"version": "4.57.2",
			"resolved": "https://registry.npmjs.org/@jsonjoy.com/fs-node-builtins/-/fs-node-builtins-4.57.2.tgz",
			"integrity": "sha512-xhiegylRmhw43Ki2HO1ZBL7DQ5ja/qpRsL29VtQ2xuUHiuDGbgf2uD4p9Qd8hJI5P6RCtGYD50IXHXVq/Ocjcg==",
			"dev": true,
			"license": "Apache-2.0",
			"engines": {
				"node": ">=10.0"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/streamich"
			},
			"peerDependencies": {
				"tslib": "2"
			}
		},
		"node_modules/@jsonjoy.com/fs-node-to-fsa": {
			"version": "4.57.2",
			"resolved": "https://registry.npmjs.org/@jsonjoy.com/fs-node-to-fsa/-/fs-node-to-fsa-4.57.2.tgz",
			"integrity": "sha512-18LmWTSONhoAPW+IWRuf8w/+zRolPFGPeGwMxlAhhfY11EKzX+5XHDBPAw67dBF5dxDErHJbl40U+3IXSDRXSQ==",
			"dev": true,
			"license": "Apache-2.0",
			"dependencies": {
				"@jsonjoy.com/fs-fsa": "4.57.2",
				"@jsonjoy.com/fs-node-builtins": "4.57.2",
				"@jsonjoy.com/fs-node-utils": "4.57.2"
			},
			"engines": {
				"node": ">=10.0"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/streamich"
			},
			"peerDependencies": {
				"tslib": "2"
			}
		},
		"node_modules/@jsonjoy.com/fs-node-utils": {
			"version": "4.57.2",
			"resolved": "https://registry.npmjs.org/@jsonjoy.com/fs-node-utils/-/fs-node-utils-4.57.2.tgz",
			"integrity": "sha512-rsPSJgekz43IlNbLyAM/Ab+ouYLWGp5DDBfYBNNEqDaSpsbXfthBn29Q4muFA9L0F+Z3mKo+CWlgSCXrf+mOyQ==",
			"dev": true,
			"license": "Apache-2.0",
			"dependencies": {
				"@jsonjoy.com/fs-node-builtins": "4.57.2"
			},
			"engines": {
				"node": ">=10.0"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/streamich"
			},
			"peerDependencies": {
				"tslib": "2"
			}
		},
		"node_modules/@jsonjoy.com/fs-print": {
			"version": "4.57.2",
			"resolved": "https://registry.npmjs.org/@jsonjoy.com/fs-print/-/fs-print-4.57.2.tgz",
			"integrity": "sha512-wK9NSow48i4DbDl9F1CQE5TqnyZOJ04elU3WFG5aJ76p+YxO/ulyBBQvKsessPxdo381Bc2pcEoyPujMOhcRqQ==",
			"dev": true,
			"license": "Apache-2.0",
			"dependencies": {
				"@jsonjoy.com/fs-node-utils": "4.57.2",
				"tree-dump": "^1.1.0"
			},
			"engines": {
				"node": ">=10.0"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/streamich"
			},
			"peerDependencies": {
				"tslib": "2"
			}
		},
		"node_modules/@jsonjoy.com/fs-snapshot": {
			"version": "4.57.2",
			"resolved": "https://registry.npmjs.org/@jsonjoy.com/fs-snapshot/-/fs-snapshot-4.57.2.tgz",
			"integrity": "sha512-GdduDZuoP5V/QCgJkx9+BZ6SC0EZ/smXAdTS7PfMqgMTGXLlt/bH/FqMYaqB9JmLf05sJPtO0XRbAwwkEEPbVw==",
			"dev": true,
			"license": "Apache-2.0",
			"dependencies": {
				"@jsonjoy.com/buffers": "^17.65.0",
				"@jsonjoy.com/fs-node-utils": "4.57.2",
				"@jsonjoy.com/json-pack": "^17.65.0",
				"@jsonjoy.com/util": "^17.65.0"
			},
			"engines": {
				"node": ">=10.0"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/streamich"
			},
			"peerDependencies": {
				"tslib": "2"
			}
		},
		"node_modules/@jsonjoy.com/fs-snapshot/node_modules/@jsonjoy.com/base64": {
			"version": "17.67.0",
			"resolved": "https://registry.npmjs.org/@jsonjoy.com/base64/-/base64-17.67.0.tgz",
			"integrity": "sha512-5SEsJGsm15aP8TQGkDfJvz9axgPwAEm98S5DxOuYe8e1EbfajcDmgeXXzccEjh+mLnjqEKrkBdjHWS5vFNwDdw==",
			"dev": true,
			"license": "Apache-2.0",
			"engines": {
				"node": ">=10.0"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/streamich"
			},
			"peerDependencies": {
				"tslib": "2"
			}
		},
		"node_modules/@jsonjoy.com/fs-snapshot/node_modules/@jsonjoy.com/codegen": {
			"version": "17.67.0",
			"resolved": "https://registry.npmjs.org/@jsonjoy.com/codegen/-/codegen-17.67.0.tgz",
			"integrity": "sha512-idnkUplROpdBOV0HMcwhsCUS5TRUi9poagdGs70A6S4ux9+/aPuKbh8+UYRTLYQHtXvAdNfQWXDqZEx5k4Dj2Q==",
			"dev": true,
			"license": "Apache-2.0",
			"engines": {
				"node": ">=10.0"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/streamich"
			},
			"peerDependencies": {
				"tslib": "2"
			}
		},
		"node_modules/@jsonjoy.com/fs-snapshot/node_modules/@jsonjoy.com/json-pack": {
			"version": "17.67.0",
			"resolved": "https://registry.npmjs.org/@jsonjoy.com/json-pack/-/json-pack-17.67.0.tgz",
			"integrity": "sha512-t0ejURcGaZsn1ClbJ/3kFqSOjlryd92eQY465IYrezsXmPcfHPE/av4twRSxf6WE+TkZgLY+71vCZbiIiFKA/w==",
			"dev": true,
			"license": "Apache-2.0",
			"dependencies": {
				"@jsonjoy.com/base64": "17.67.0",
				"@jsonjoy.com/buffers": "17.67.0",
				"@jsonjoy.com/codegen": "17.67.0",
				"@jsonjoy.com/json-pointer": "17.67.0",
				"@jsonjoy.com/util": "17.67.0",
				"hyperdyperid": "^1.2.0",
				"thingies": "^2.5.0",
				"tree-dump": "^1.1.0"
			},
			"engines": {
				"node": ">=10.0"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/streamich"
			},
			"peerDependencies": {
				"tslib": "2"
			}
		},
		"node_modules/@jsonjoy.com/fs-snapshot/node_modules/@jsonjoy.com/json-pointer": {
			"version": "17.67.0",
			"resolved": "https://registry.npmjs.org/@jsonjoy.com/json-pointer/-/json-pointer-17.67.0.tgz",
			"integrity": "sha512-+iqOFInH+QZGmSuaybBUNdh7yvNrXvqR+h3wjXm0N/3JK1EyyFAeGJvqnmQL61d1ARLlk/wJdFKSL+LHJ1eaUA==",
			"dev": true,
			"license": "Apache-2.0",
			"dependencies": {
				"@jsonjoy.com/util": "17.67.0"
			},
			"engines": {
				"node": ">=10.0"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/streamich"
			},
			"peerDependencies": {
				"tslib": "2"
			}
		},
		"node_modules/@jsonjoy.com/fs-snapshot/node_modules/@jsonjoy.com/util": {
			"version": "17.67.0",
			"resolved": "https://registry.npmjs.org/@jsonjoy.com/util/-/util-17.67.0.tgz",
			"integrity": "sha512-6+8xBaz1rLSohlGh68D1pdw3AwDi9xydm8QNlAFkvnavCJYSze+pxoW2VKP8p308jtlMRLs5NTHfPlZLd4w7ew==",
			"dev": true,
			"license": "Apache-2.0",
			"dependencies": {
				"@jsonjoy.com/buffers": "17.67.0",
				"@jsonjoy.com/codegen": "17.67.0"
			},
			"engines": {
				"node": ">=10.0"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/streamich"
			},
			"peerDependencies": {
				"tslib": "2"
			}
		},
		"node_modules/@jsonjoy.com/json-pack": {
			"version": "1.21.0",
			"resolved": "https://registry.npmjs.org/@jsonjoy.com/json-pack/-/json-pack-1.21.0.tgz",
			"integrity": "sha512-+AKG+R2cfZMShzrF2uQw34v3zbeDYUqnQ+jg7ORic3BGtfw9p/+N6RJbq/kkV8JmYZaINknaEQ2m0/f693ZPpg==",
			"dev": true,
			"license": "Apache-2.0",
			"dependencies": {
				"@jsonjoy.com/base64": "^1.1.2",
				"@jsonjoy.com/buffers": "^1.2.0",
				"@jsonjoy.com/codegen": "^1.0.0",
				"@jsonjoy.com/json-pointer": "^1.0.2",
				"@jsonjoy.com/util": "^1.9.0",
				"hyperdyperid": "^1.2.0",
				"thingies": "^2.5.0",
				"tree-dump": "^1.1.0"
			},
			"engines": {
				"node": ">=10.0"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/streamich"
			},
			"peerDependencies": {
				"tslib": "2"
			}
		},
		"node_modules/@jsonjoy.com/json-pack/node_modules/@jsonjoy.com/buffers": {
			"version": "1.2.1",
			"resolved": "https://registry.npmjs.org/@jsonjoy.com/buffers/-/buffers-1.2.1.tgz",
			"integrity": "sha512-12cdlDwX4RUM3QxmUbVJWqZ/mrK6dFQH4Zxq6+r1YXKXYBNgZXndx2qbCJwh3+WWkCSn67IjnlG3XYTvmvYtgA==",
			"dev": true,
			"license": "Apache-2.0",
			"engines": {
				"node": ">=10.0"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/streamich"
			},
			"peerDependencies": {
				"tslib": "2"
			}
		},
		"node_modules/@jsonjoy.com/json-pointer": {
			"version": "1.0.2",
			"resolved": "https://registry.npmjs.org/@jsonjoy.com/json-pointer/-/json-pointer-1.0.2.tgz",
			"integrity": "sha512-Fsn6wM2zlDzY1U+v4Nc8bo3bVqgfNTGcn6dMgs6FjrEnt4ZCe60o6ByKRjOGlI2gow0aE/Q41QOigdTqkyK5fg==",
			"dev": true,
			"license": "Apache-2.0",
			"dependencies": {
				"@jsonjoy.com/codegen": "^1.0.0",
				"@jsonjoy.com/util": "^1.9.0"
			},
			"engines": {
				"node": ">=10.0"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/streamich"
			},
			"peerDependencies": {
				"tslib": "2"
			}
		},
		"node_modules/@jsonjoy.com/util": {
			"version": "1.9.0",
			"resolved": "https://registry.npmjs.org/@jsonjoy.com/util/-/util-1.9.0.tgz",
			"integrity": "sha512-pLuQo+VPRnN8hfPqUTLTHk126wuYdXVxE6aDmjSeV4NCAgyxWbiOIeNJVtID3h1Vzpoi9m4jXezf73I6LgabgQ==",
			"dev": true,
			"license": "Apache-2.0",
			"dependencies": {
				"@jsonjoy.com/buffers": "^1.0.0",
				"@jsonjoy.com/codegen": "^1.0.0"
			},
			"engines": {
				"node": ">=10.0"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/streamich"
			},
			"peerDependencies": {
				"tslib": "2"
			}
		},
		"node_modules/@jsonjoy.com/util/node_modules/@jsonjoy.com/buffers": {
			"version": "1.2.1",
			"resolved": "https://registry.npmjs.org/@jsonjoy.com/buffers/-/buffers-1.2.1.tgz",
			"integrity": "sha512-12cdlDwX4RUM3QxmUbVJWqZ/mrK6dFQH4Zxq6+r1YXKXYBNgZXndx2qbCJwh3+WWkCSn67IjnlG3XYTvmvYtgA==",
			"dev": true,
			"license": "Apache-2.0",
			"engines": {
				"node": ">=10.0"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/streamich"
			},
			"peerDependencies": {
				"tslib": "2"
			}
		},
		"node_modules/@leichtgewicht/ip-codec": {
			"version": "2.0.5",
			"resolved": "https://registry.npmjs.org/@leichtgewicht/ip-codec/-/ip-codec-2.0.5.tgz",
			"integrity": "sha512-Vo+PSpZG2/fmgmiNzYK9qWRh8h/CHrwD0mo1h1DzL4yzHNSfWYujGTYsWGreD000gcgmZ7K4Ys6Tx9TxtsKdDw==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@listr2/prompt-adapter-inquirer": {
			"version": "3.0.5",
			"resolved": "https://registry.npmjs.org/@listr2/prompt-adapter-inquirer/-/prompt-adapter-inquirer-3.0.5.tgz",
			"integrity": "sha512-WELs+hj6xcilkloBXYf9XXK8tYEnKsgLj01Xl5ONUJpKjmT5hGVUzNUS5tooUxs7pGMrw+jFD/41WpqW4V3LDA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@inquirer/type": "^3.0.8"
			},
			"engines": {
				"node": ">=20.0.0"
			},
			"peerDependencies": {
				"@inquirer/prompts": ">= 3 < 8",
				"listr2": "9.0.5"
			}
		},
		"node_modules/@lmdb/lmdb-darwin-arm64": {
			"version": "3.5.1",
			"resolved": "https://registry.npmjs.org/@lmdb/lmdb-darwin-arm64/-/lmdb-darwin-arm64-3.5.1.tgz",
			"integrity": "sha512-tpfN4kKrrMpQ+If1l8bhmoNkECJi0iOu6AEdrTJvWVC+32sLxTARX5Rsu579mPImRP9YFWfWgeRQ5oav7zApQQ==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"darwin"
			]
		},
		"node_modules/@lmdb/lmdb-darwin-x64": {
			"version": "3.5.1",
			"resolved": "https://registry.npmjs.org/@lmdb/lmdb-darwin-x64/-/lmdb-darwin-x64-3.5.1.tgz",
			"integrity": "sha512-+a2tTfc3rmWhLAolFUWRgJtpSuu+Fw/yjn4rF406NMxhfjbMuiOUTDRvRlMFV+DzyjkwnokisskHbCWkS3Ly5w==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"darwin"
			]
		},
		"node_modules/@lmdb/lmdb-linux-arm": {
			"version": "3.5.1",
			"resolved": "https://registry.npmjs.org/@lmdb/lmdb-linux-arm/-/lmdb-linux-arm-3.5.1.tgz",
			"integrity": "sha512-0EgcE6reYr8InjD7V37EgXcYrloqpxVPINy3ig1MwDSbl6LF/vXTYRH9OE1Ti1D8YZnB35ZH9aTcdfSb5lql2A==",
			"cpu": [
				"arm"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			]
		},
		"node_modules/@lmdb/lmdb-linux-arm64": {
			"version": "3.5.1",
			"resolved": "https://registry.npmjs.org/@lmdb/lmdb-linux-arm64/-/lmdb-linux-arm64-3.5.1.tgz",
			"integrity": "sha512-aoERa5B6ywXdyFeYGQ1gbQpkMkDbEo45qVoXE5QpIRavqjnyPwjOulMkmkypkmsbJ5z4Wi0TBztON8agCTG0Vg==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			]
		},
		"node_modules/@lmdb/lmdb-linux-x64": {
			"version": "3.5.1",
			"resolved": "https://registry.npmjs.org/@lmdb/lmdb-linux-x64/-/lmdb-linux-x64-3.5.1.tgz",
			"integrity": "sha512-SqNDY1+vpji7bh0sFH5wlWyFTOzjbDOl0/kB5RLLYDAFyd/uw3n7wyrmas3rYPpAW7z18lMOi1yKlTPv967E3g==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			]
		},
		"node_modules/@lmdb/lmdb-win32-arm64": {
			"version": "3.5.1",
			"resolved": "https://registry.npmjs.org/@lmdb/lmdb-win32-arm64/-/lmdb-win32-arm64-3.5.1.tgz",
			"integrity": "sha512-50v0O1Lt37cwrmR9vWZK5hRW0Aw+KEmxJJ75fge/zIYdvNKB/0bSMSVR5Uc2OV9JhosIUyklOmrEvavwNJ8D6w==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"win32"
			]
		},
		"node_modules/@lmdb/lmdb-win32-x64": {
			"version": "3.5.1",
			"resolved": "https://registry.npmjs.org/@lmdb/lmdb-win32-x64/-/lmdb-win32-x64-3.5.1.tgz",
			"integrity": "sha512-qwosvPyl+zpUlp3gRb7UcJ3H8S28XHCzkv0Y0EgQToXjQP91ZD67EHSCDmaLjtKhe+GVIW5om1KUpzVLA0l6pg==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"win32"
			]
		},
		"node_modules/@modelcontextprotocol/sdk": {
			"version": "1.26.0",
			"resolved": "https://registry.npmjs.org/@modelcontextprotocol/sdk/-/sdk-1.26.0.tgz",
			"integrity": "sha512-Y5RmPncpiDtTXDbLKswIJzTqu2hyBKxTNsgKqKclDbhIgg1wgtf1fRuvxgTnRfcnxtvvgbIEcqUOzZrJ6iSReg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@hono/node-server": "^1.19.9",
				"ajv": "^8.17.1",
				"ajv-formats": "^3.0.1",
				"content-type": "^1.0.5",
				"cors": "^2.8.5",
				"cross-spawn": "^7.0.5",
				"eventsource": "^3.0.2",
				"eventsource-parser": "^3.0.0",
				"express": "^5.2.1",
				"express-rate-limit": "^8.2.1",
				"hono": "^4.11.4",
				"jose": "^6.1.3",
				"json-schema-typed": "^8.0.2",
				"pkce-challenge": "^5.0.0",
				"raw-body": "^3.0.0",
				"zod": "^3.25 || ^4.0",
				"zod-to-json-schema": "^3.25.1"
			},
			"engines": {
				"node": ">=18"
			},
			"peerDependencies": {
				"@cfworker/json-schema": "^4.1.1",
				"zod": "^3.25 || ^4.0"
			},
			"peerDependenciesMeta": {
				"@cfworker/json-schema": {
					"optional": true
				},
				"zod": {
					"optional": false
				}
			}
		},
		"node_modules/@module-federation/bridge-react-webpack-plugin": {
			"version": "2.3.3",
			"resolved": "https://registry.npmjs.org/@module-federation/bridge-react-webpack-plugin/-/bridge-react-webpack-plugin-2.3.3.tgz",
			"integrity": "sha512-W2jQ3Wuqree9Dq3UAx8jGbYtvHuuYgzrd2j9FP8Bt6NaynaNU1yYG86MBnAhZJPTltex0CguudR1dgFpYdvLUg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@module-federation/sdk": "2.3.3",
				"@types/semver": "7.5.8",
				"semver": "7.6.3"
			}
		},
		"node_modules/@module-federation/bridge-react-webpack-plugin/node_modules/semver": {
			"version": "7.6.3",
			"resolved": "https://registry.npmjs.org/semver/-/semver-7.6.3.tgz",
			"integrity": "sha512-oVekP1cKtI+CTDvHWYFUcMtsK/00wmAEfyqKfNdARm8u1wNVhSgaX7A8d4UuIlUI5e84iEwOhs7ZPYRmzU9U6A==",
			"dev": true,
			"license": "ISC",
			"bin": {
				"semver": "bin/semver.js"
			},
			"engines": {
				"node": ">=10"
			}
		},
		"node_modules/@module-federation/cli": {
			"version": "2.3.3",
			"resolved": "https://registry.npmjs.org/@module-federation/cli/-/cli-2.3.3.tgz",
			"integrity": "sha512-g3f3aEruv07zK4VcUlAllswrp2ncA/jF0P0yoEWNRa9K7N+xNCfqcdzw2aVWOJ30qNMurhLWuyzYqfDIx0LpfQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@module-federation/dts-plugin": "2.3.3",
				"@module-federation/sdk": "2.3.3",
				"commander": "11.1.0",
				"jiti": "2.4.2"
			},
			"bin": {
				"mf": "bin/mf.js"
			},
			"engines": {
				"node": ">=16.0.0"
			}
		},
		"node_modules/@module-federation/cli/node_modules/jiti": {
			"version": "2.4.2",
			"resolved": "https://registry.npmjs.org/jiti/-/jiti-2.4.2.tgz",
			"integrity": "sha512-rg9zJN+G4n2nfJl5MW3BMygZX56zKPNVEYYqq7adpmMh4Jn2QNEwhvQlFy6jPVdcod7txZtKHWnyZiA3a0zP7A==",
			"dev": true,
			"license": "MIT",
			"bin": {
				"jiti": "lib/jiti-cli.mjs"
			}
		},
		"node_modules/@module-federation/data-prefetch": {
			"version": "2.3.3",
			"resolved": "https://registry.npmjs.org/@module-federation/data-prefetch/-/data-prefetch-2.3.3.tgz",
			"integrity": "sha512-ZM1QtyjbWYnhUizHFhwYjHGXlkZek3vzTpL35d5FkAhVrOU0u0Qv6zpZjdcCm0FJznqVsUQx1w0vagUyGWQf0g==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@module-federation/runtime": "2.3.3",
				"@module-federation/sdk": "2.3.3"
			},
			"peerDependencies": {
				"react": ">=16.9.0",
				"react-dom": ">=16.9.0"
			},
			"peerDependenciesMeta": {
				"react": {
					"optional": true
				},
				"react-dom": {
					"optional": true
				}
			}
		},
		"node_modules/@module-federation/dts-plugin": {
			"version": "2.3.3",
			"resolved": "https://registry.npmjs.org/@module-federation/dts-plugin/-/dts-plugin-2.3.3.tgz",
			"integrity": "sha512-VNtURt+hvieNKCBleAqHKffLAU4clKmuuqLQIbvDkFbGe4bo7hUaq5DruTnJBWWDOizZx0OQrdQYPijCnBK6UQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@module-federation/error-codes": "2.3.3",
				"@module-federation/managers": "2.3.3",
				"@module-federation/sdk": "2.3.3",
				"@module-federation/third-party-dts-extractor": "2.3.3",
				"adm-zip": "0.5.10",
				"ansi-colors": "4.1.3",
				"isomorphic-ws": "5.0.0",
				"node-schedule": "2.1.1",
				"undici": "7.24.7",
				"ws": "8.18.0"
			},
			"peerDependencies": {
				"typescript": "^4.9.0 || ^5.0.0",
				"vue-tsc": ">=1.0.24"
			},
			"peerDependenciesMeta": {
				"vue-tsc": {
					"optional": true
				}
			}
		},
		"node_modules/@module-federation/dts-plugin/node_modules/undici": {
			"version": "7.24.7",
			"resolved": "https://registry.npmjs.org/undici/-/undici-7.24.7.tgz",
			"integrity": "sha512-H/nlJ/h0ggGC+uRL3ovD+G0i4bqhvsDOpbDv7At5eFLlj2b41L8QliGbnl2H7SnDiYhENphh1tQFJZf+MyfLsQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=20.18.1"
			}
		},
		"node_modules/@module-federation/enhanced": {
			"version": "2.3.3",
			"resolved": "https://registry.npmjs.org/@module-federation/enhanced/-/enhanced-2.3.3.tgz",
			"integrity": "sha512-BJSs56lqO9NI9aC+hVhg2CU/UwG1TphVl1b7WBx6Jv6DYUyVQbgXeQpgqYVsxYVRKYOl7eDZmjXl2eA/n1IP/Q==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@module-federation/bridge-react-webpack-plugin": "2.3.3",
				"@module-federation/cli": "2.3.3",
				"@module-federation/data-prefetch": "2.3.3",
				"@module-federation/dts-plugin": "2.3.3",
				"@module-federation/error-codes": "2.3.3",
				"@module-federation/inject-external-runtime-core-plugin": "2.3.3",
				"@module-federation/managers": "2.3.3",
				"@module-federation/manifest": "2.3.3",
				"@module-federation/rspack": "2.3.3",
				"@module-federation/runtime-tools": "2.3.3",
				"@module-federation/sdk": "2.3.3",
				"@module-federation/webpack-bundler-runtime": "2.3.3",
				"schema-utils": "4.3.0",
				"tapable": "2.3.0",
				"upath": "2.0.1"
			},
			"bin": {
				"mf": "bin/mf.js"
			},
			"peerDependencies": {
				"typescript": "^4.9.0 || ^5.0.0",
				"vue-tsc": ">=1.0.24",
				"webpack": "^5.0.0"
			},
			"peerDependenciesMeta": {
				"typescript": {
					"optional": true
				},
				"vue-tsc": {
					"optional": true
				},
				"webpack": {
					"optional": true
				}
			}
		},
		"node_modules/@module-federation/enhanced/node_modules/tapable": {
			"version": "2.3.0",
			"resolved": "https://registry.npmjs.org/tapable/-/tapable-2.3.0.tgz",
			"integrity": "sha512-g9ljZiwki/LfxmQADO3dEY1CbpmXT5Hm2fJ+QaGKwSXUylMybePR7/67YW7jOrrvjEgL1Fmz5kzyAjWVWLlucg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=6"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/webpack"
			}
		},
		"node_modules/@module-federation/error-codes": {
			"version": "2.3.3",
			"resolved": "https://registry.npmjs.org/@module-federation/error-codes/-/error-codes-2.3.3.tgz",
			"integrity": "sha512-UVtKBoKnRDcHgByIDvPRZSxQqjqbNH7NvJm1KHLoce33+EDiIdZYs0HvvUQv43RgESpB9s7HjrqFlq3bEcAgfQ==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@module-federation/inject-external-runtime-core-plugin": {
			"version": "2.3.3",
			"resolved": "https://registry.npmjs.org/@module-federation/inject-external-runtime-core-plugin/-/inject-external-runtime-core-plugin-2.3.3.tgz",
			"integrity": "sha512-ImSft6hOkMdnpZX8O+RydwkYENxhAwT92n1OAT3Xf01DXMrEpSO0PqBlPGgontxuiaV9dM2/xWSLGuIWaOtupA==",
			"dev": true,
			"license": "MIT",
			"peerDependencies": {
				"@module-federation/runtime-tools": "2.3.3"
			}
		},
		"node_modules/@module-federation/managers": {
			"version": "2.3.3",
			"resolved": "https://registry.npmjs.org/@module-federation/managers/-/managers-2.3.3.tgz",
			"integrity": "sha512-sYL0t2guakJ+nDSQANH54uz5q1YxaNCn5C3lr+7BoRD49dX7Z6k7094yqOPEy8trzqdIoQVFpgewVA6IC/FeyQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@module-federation/sdk": "2.3.3",
				"find-pkg": "2.0.0"
			}
		},
		"node_modules/@module-federation/manifest": {
			"version": "2.3.3",
			"resolved": "https://registry.npmjs.org/@module-federation/manifest/-/manifest-2.3.3.tgz",
			"integrity": "sha512-mAEXuo5sGt8FUDzftU8f0ci0PbsZIDcLRYX9AkXwbXg0JRyVEvWyiBrEKF+zZuy7YM7eRdyp6JjLJPDzufhj5w==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@module-federation/dts-plugin": "2.3.3",
				"@module-federation/managers": "2.3.3",
				"@module-federation/sdk": "2.3.3",
				"find-pkg": "2.0.0"
			}
		},
		"node_modules/@module-federation/node": {
			"version": "2.7.41",
			"resolved": "https://registry.npmjs.org/@module-federation/node/-/node-2.7.41.tgz",
			"integrity": "sha512-ZaNrfX+7ua8UvnRa6qgrDtViU9Oz3oBGpFprldU8ek0NB2QWNACu9RMU7fHdTD/FKlzGVLi/LgdKnNKkmJD2TA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@module-federation/enhanced": "2.3.3",
				"@module-federation/runtime": "2.3.3",
				"@module-federation/sdk": "2.3.3",
				"encoding": "0.1.13",
				"node-fetch": "2.7.0",
				"tapable": "2.3.0"
			},
			"peerDependencies": {
				"webpack": "^5.40.0"
			},
			"peerDependenciesMeta": {
				"webpack": {
					"optional": true
				}
			}
		},
		"node_modules/@module-federation/node/node_modules/node-fetch": {
			"version": "2.7.0",
			"resolved": "https://registry.npmjs.org/node-fetch/-/node-fetch-2.7.0.tgz",
			"integrity": "sha512-c4FRfUm/dbcWZ7U+1Wq0AwCyFL+3nt2bEw05wfxSz+DWpWsitgmSgYmy2dQdWyKC1694ELPqMs/YzUSNozLt8A==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"whatwg-url": "^5.0.0"
			},
			"engines": {
				"node": "4.x || >=6.0.0"
			},
			"peerDependencies": {
				"encoding": "^0.1.0"
			},
			"peerDependenciesMeta": {
				"encoding": {
					"optional": true
				}
			}
		},
		"node_modules/@module-federation/node/node_modules/tapable": {
			"version": "2.3.0",
			"resolved": "https://registry.npmjs.org/tapable/-/tapable-2.3.0.tgz",
			"integrity": "sha512-g9ljZiwki/LfxmQADO3dEY1CbpmXT5Hm2fJ+QaGKwSXUylMybePR7/67YW7jOrrvjEgL1Fmz5kzyAjWVWLlucg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=6"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/webpack"
			}
		},
		"node_modules/@module-federation/node/node_modules/tr46": {
			"version": "0.0.3",
			"resolved": "https://registry.npmjs.org/tr46/-/tr46-0.0.3.tgz",
			"integrity": "sha512-N3WMsuqV66lT30CrXNbEjx4GEwlow3v6rr4mCcv6prnfwhS01rkgyFdjPNBYd9br7LpXV1+Emh01fHnq2Gdgrw==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@module-federation/node/node_modules/webidl-conversions": {
			"version": "3.0.1",
			"resolved": "https://registry.npmjs.org/webidl-conversions/-/webidl-conversions-3.0.1.tgz",
			"integrity": "sha512-2JAn3z8AR6rjK8Sm8orRC0h/bcl/DqL7tRPdGZ4I1CjdF+EaMLmYxBHyXuKL849eucPFhvBoxMsflfOb8kxaeQ==",
			"dev": true,
			"license": "BSD-2-Clause"
		},
		"node_modules/@module-federation/node/node_modules/whatwg-url": {
			"version": "5.0.0",
			"resolved": "https://registry.npmjs.org/whatwg-url/-/whatwg-url-5.0.0.tgz",
			"integrity": "sha512-saE57nupxk6v3HY35+jzBwYa0rKSy0XR8JSxZPwgLr7ys0IBzhGviA1/TUGJLmSVqs8pb9AnvICXEuOHLprYTw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"tr46": "~0.0.3",
				"webidl-conversions": "^3.0.0"
			}
		},
		"node_modules/@module-federation/rspack": {
			"version": "2.3.3",
			"resolved": "https://registry.npmjs.org/@module-federation/rspack/-/rspack-2.3.3.tgz",
			"integrity": "sha512-4s3G+wXZ6J3rKe0EeZnGLQUM7y+qpiI5NM3U6ylZuxD8q7mAwQVHThbH6ruDYUNDVEOc6N0j/+/LdfGRw+e5xw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@module-federation/bridge-react-webpack-plugin": "2.3.3",
				"@module-federation/dts-plugin": "2.3.3",
				"@module-federation/inject-external-runtime-core-plugin": "2.3.3",
				"@module-federation/managers": "2.3.3",
				"@module-federation/manifest": "2.3.3",
				"@module-federation/runtime-tools": "2.3.3",
				"@module-federation/sdk": "2.3.3"
			},
			"peerDependencies": {
				"@rspack/core": "^0.7.0 || ^1.0.0 || ^2.0.0-0",
				"typescript": "^4.9.0 || ^5.0.0",
				"vue-tsc": ">=1.0.24"
			},
			"peerDependenciesMeta": {
				"typescript": {
					"optional": true
				},
				"vue-tsc": {
					"optional": true
				}
			}
		},
		"node_modules/@module-federation/runtime": {
			"version": "2.3.3",
			"resolved": "https://registry.npmjs.org/@module-federation/runtime/-/runtime-2.3.3.tgz",
			"integrity": "sha512-JYJ3qv9V85DtBtT/ppDuJNwBTUrYqqZDYcyiTzwY5+44dC5QPvgJ//F+BOhAhZ02WkZV0b4jsKTyLOC3vXKGqQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@module-federation/error-codes": "2.3.3",
				"@module-federation/runtime-core": "2.3.3",
				"@module-federation/sdk": "2.3.3"
			}
		},
		"node_modules/@module-federation/runtime-core": {
			"version": "2.3.3",
			"resolved": "https://registry.npmjs.org/@module-federation/runtime-core/-/runtime-core-2.3.3.tgz",
			"integrity": "sha512-B07LDH9KxhBO3GbULGW64mQFVQBtrEd3PoaCBm7XR1IbU8rMQUJQjDNVZgXYcyhRPBVP+3KWZuiaKFRiNb6PQw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@module-federation/error-codes": "2.3.3",
				"@module-federation/sdk": "2.3.3"
			}
		},
		"node_modules/@module-federation/runtime-tools": {
			"version": "2.3.3",
			"resolved": "https://registry.npmjs.org/@module-federation/runtime-tools/-/runtime-tools-2.3.3.tgz",
			"integrity": "sha512-XODzyLbBYcy4wnYBXKIBqaHPVfBx1HshGdjZmSctDDnx9/VYgdx9DShb6UI+WuQBKJgPzTcx4xbvbCM4SdMilQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@module-federation/runtime": "2.3.3",
				"@module-federation/webpack-bundler-runtime": "2.3.3"
			}
		},
		"node_modules/@module-federation/sdk": {
			"version": "2.3.3",
			"resolved": "https://registry.npmjs.org/@module-federation/sdk/-/sdk-2.3.3.tgz",
			"integrity": "sha512-mwCS+LQdqiSc6fM5iz/S60ibaFNSH6kNqlZkCRIuS4yjdZ+jgnihz+6xp1QzppvfFgKLhEHBiXOmcYOdk3Ckew==",
			"dev": true,
			"license": "MIT",
			"peerDependencies": {
				"node-fetch": "^3.3.2"
			},
			"peerDependenciesMeta": {
				"node-fetch": {
					"optional": true
				}
			}
		},
		"node_modules/@module-federation/third-party-dts-extractor": {
			"version": "2.3.3",
			"resolved": "https://registry.npmjs.org/@module-federation/third-party-dts-extractor/-/third-party-dts-extractor-2.3.3.tgz",
			"integrity": "sha512-rR94TjC1QVQLQPTazI0waLc76hI8dnv6aHTl+PUEIY9s5hXp8TA85XS0QJQqIf2KTjlPgZbWAwyFjOAJluTjaw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"find-pkg": "2.0.0",
				"resolve": "1.22.8"
			}
		},
		"node_modules/@module-federation/third-party-dts-extractor/node_modules/resolve": {
			"version": "1.22.8",
			"resolved": "https://registry.npmjs.org/resolve/-/resolve-1.22.8.tgz",
			"integrity": "sha512-oKWePCxqpd6FlLvGV1VU0x7bkPmmCNolxzjMf4NczoDnQcIWrAF+cPtZn5i6n+RfD2d9i0tzpKnG6Yk168yIyw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"is-core-module": "^2.13.0",
				"path-parse": "^1.0.7",
				"supports-preserve-symlinks-flag": "^1.0.0"
			},
			"bin": {
				"resolve": "bin/resolve"
			},
			"funding": {
				"url": "https://github.com/sponsors/ljharb"
			}
		},
		"node_modules/@module-federation/webpack-bundler-runtime": {
			"version": "2.3.3",
			"resolved": "https://registry.npmjs.org/@module-federation/webpack-bundler-runtime/-/webpack-bundler-runtime-2.3.3.tgz",
			"integrity": "sha512-W+P6ZF9J3gwnQuoF07YV0OiR1D6sI/uErUu4+c3QXxka3orANUHujkddNSsDxL1obAGoJa7Da99crZKf7u2j/w==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@module-federation/error-codes": "2.3.3",
				"@module-federation/runtime": "2.3.3",
				"@module-federation/sdk": "2.3.3"
			}
		},
		"node_modules/@msgpackr-extract/msgpackr-extract-darwin-arm64": {
			"version": "3.0.3",
			"resolved": "https://registry.npmjs.org/@msgpackr-extract/msgpackr-extract-darwin-arm64/-/msgpackr-extract-darwin-arm64-3.0.3.tgz",
			"integrity": "sha512-QZHtlVgbAdy2zAqNA9Gu1UpIuI8Xvsd1v8ic6B2pZmeFnFcMWiPLfWXh7TVw4eGEZ/C9TH281KwhVoeQUKbyjw==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"darwin"
			]
		},
		"node_modules/@msgpackr-extract/msgpackr-extract-darwin-x64": {
			"version": "3.0.3",
			"resolved": "https://registry.npmjs.org/@msgpackr-extract/msgpackr-extract-darwin-x64/-/msgpackr-extract-darwin-x64-3.0.3.tgz",
			"integrity": "sha512-mdzd3AVzYKuUmiWOQ8GNhl64/IoFGol569zNRdkLReh6LRLHOXxU4U8eq0JwaD8iFHdVGqSy4IjFL4reoWCDFw==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"darwin"
			]
		},
		"node_modules/@msgpackr-extract/msgpackr-extract-linux-arm": {
			"version": "3.0.3",
			"resolved": "https://registry.npmjs.org/@msgpackr-extract/msgpackr-extract-linux-arm/-/msgpackr-extract-linux-arm-3.0.3.tgz",
			"integrity": "sha512-fg0uy/dG/nZEXfYilKoRe7yALaNmHoYeIoJuJ7KJ+YyU2bvY8vPv27f7UKhGRpY6euFYqEVhxCFZgAUNQBM3nw==",
			"cpu": [
				"arm"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			]
		},
		"node_modules/@msgpackr-extract/msgpackr-extract-linux-arm64": {
			"version": "3.0.3",
			"resolved": "https://registry.npmjs.org/@msgpackr-extract/msgpackr-extract-linux-arm64/-/msgpackr-extract-linux-arm64-3.0.3.tgz",
			"integrity": "sha512-YxQL+ax0XqBJDZiKimS2XQaf+2wDGVa1enVRGzEvLLVFeqa5kx2bWbtcSXgsxjQB7nRqqIGFIcLteF/sHeVtQg==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			]
		},
		"node_modules/@msgpackr-extract/msgpackr-extract-linux-x64": {
			"version": "3.0.3",
			"resolved": "https://registry.npmjs.org/@msgpackr-extract/msgpackr-extract-linux-x64/-/msgpackr-extract-linux-x64-3.0.3.tgz",
			"integrity": "sha512-cvwNfbP07pKUfq1uH+S6KJ7dT9K8WOE4ZiAcsrSes+UY55E/0jLYc+vq+DO7jlmqRb5zAggExKm0H7O/CBaesg==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			]
		},
		"node_modules/@msgpackr-extract/msgpackr-extract-win32-x64": {
			"version": "3.0.3",
			"resolved": "https://registry.npmjs.org/@msgpackr-extract/msgpackr-extract-win32-x64/-/msgpackr-extract-win32-x64-3.0.3.tgz",
			"integrity": "sha512-x0fWaQtYp4E6sktbsdAqnehxDgEc/VwM7uLsRCYWaiGu0ykYdZPiS8zCWdnjHwyiumousxfBm4SO31eXqwEZhQ==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"win32"
			]
		},
		"node_modules/@mswjs/interceptors": {
			"version": "0.41.3",
			"resolved": "https://registry.npmjs.org/@mswjs/interceptors/-/interceptors-0.41.3.tgz",
			"integrity": "sha512-cXu86tF4VQVfwz8W1SPbhoRyHJkti6mjH/XJIxp40jhO4j2k1m4KYrEykxqWPkFF3vrK4rgQppBh//AwyGSXPA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@open-draft/deferred-promise": "^2.2.0",
				"@open-draft/logger": "^0.3.0",
				"@open-draft/until": "^2.0.0",
				"is-node-process": "^1.2.0",
				"outvariant": "^1.4.3",
				"strict-event-emitter": "^0.5.1"
			},
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@napi-rs/nice": {
			"version": "1.1.1",
			"resolved": "https://registry.npmjs.org/@napi-rs/nice/-/nice-1.1.1.tgz",
			"integrity": "sha512-xJIPs+bYuc9ASBl+cvGsKbGrJmS6fAKaSZCnT0lhahT5rhA2VVy9/EcIgd2JhtEuFOJNx7UHNn/qiTPTY4nrQw==",
			"dev": true,
			"license": "MIT",
			"optional": true,
			"engines": {
				"node": ">= 10"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/Brooooooklyn"
			},
			"optionalDependencies": {
				"@napi-rs/nice-android-arm-eabi": "1.1.1",
				"@napi-rs/nice-android-arm64": "1.1.1",
				"@napi-rs/nice-darwin-arm64": "1.1.1",
				"@napi-rs/nice-darwin-x64": "1.1.1",
				"@napi-rs/nice-freebsd-x64": "1.1.1",
				"@napi-rs/nice-linux-arm-gnueabihf": "1.1.1",
				"@napi-rs/nice-linux-arm64-gnu": "1.1.1",
				"@napi-rs/nice-linux-arm64-musl": "1.1.1",
				"@napi-rs/nice-linux-ppc64-gnu": "1.1.1",
				"@napi-rs/nice-linux-riscv64-gnu": "1.1.1",
				"@napi-rs/nice-linux-s390x-gnu": "1.1.1",
				"@napi-rs/nice-linux-x64-gnu": "1.1.1",
				"@napi-rs/nice-linux-x64-musl": "1.1.1",
				"@napi-rs/nice-openharmony-arm64": "1.1.1",
				"@napi-rs/nice-win32-arm64-msvc": "1.1.1",
				"@napi-rs/nice-win32-ia32-msvc": "1.1.1",
				"@napi-rs/nice-win32-x64-msvc": "1.1.1"
			}
		},
		"node_modules/@napi-rs/nice-android-arm-eabi": {
			"version": "1.1.1",
			"resolved": "https://registry.npmjs.org/@napi-rs/nice-android-arm-eabi/-/nice-android-arm-eabi-1.1.1.tgz",
			"integrity": "sha512-kjirL3N6TnRPv5iuHw36wnucNqXAO46dzK9oPb0wj076R5Xm8PfUVA9nAFB5ZNMmfJQJVKACAPd/Z2KYMppthw==",
			"cpu": [
				"arm"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"android"
			],
			"engines": {
				"node": ">= 10"
			}
		},
		"node_modules/@napi-rs/nice-android-arm64": {
			"version": "1.1.1",
			"resolved": "https://registry.npmjs.org/@napi-rs/nice-android-arm64/-/nice-android-arm64-1.1.1.tgz",
			"integrity": "sha512-blG0i7dXgbInN5urONoUCNf+DUEAavRffrO7fZSeoRMJc5qD+BJeNcpr54msPF6qfDD6kzs9AQJogZvT2KD5nw==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"android"
			],
			"engines": {
				"node": ">= 10"
			}
		},
		"node_modules/@napi-rs/nice-darwin-arm64": {
			"version": "1.1.1",
			"resolved": "https://registry.npmjs.org/@napi-rs/nice-darwin-arm64/-/nice-darwin-arm64-1.1.1.tgz",
			"integrity": "sha512-s/E7w45NaLqTGuOjC2p96pct4jRfo61xb9bU1unM/MJ/RFkKlJyJDx7OJI/O0ll/hrfpqKopuAFDV8yo0hfT7A==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"darwin"
			],
			"engines": {
				"node": ">= 10"
			}
		},
		"node_modules/@napi-rs/nice-darwin-x64": {
			"version": "1.1.1",
			"resolved": "https://registry.npmjs.org/@napi-rs/nice-darwin-x64/-/nice-darwin-x64-1.1.1.tgz",
			"integrity": "sha512-dGoEBnVpsdcC+oHHmW1LRK5eiyzLwdgNQq3BmZIav+9/5WTZwBYX7r5ZkQC07Nxd3KHOCkgbHSh4wPkH1N1LiQ==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"darwin"
			],
			"engines": {
				"node": ">= 10"
			}
		},
		"node_modules/@napi-rs/nice-freebsd-x64": {
			"version": "1.1.1",
			"resolved": "https://registry.npmjs.org/@napi-rs/nice-freebsd-x64/-/nice-freebsd-x64-1.1.1.tgz",
			"integrity": "sha512-kHv4kEHAylMYmlNwcQcDtXjklYp4FCf0b05E+0h6nDHsZ+F0bDe04U/tXNOqrx5CmIAth4vwfkjjUmp4c4JktQ==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"freebsd"
			],
			"engines": {
				"node": ">= 10"
			}
		},
		"node_modules/@napi-rs/nice-linux-arm-gnueabihf": {
			"version": "1.1.1",
			"resolved": "https://registry.npmjs.org/@napi-rs/nice-linux-arm-gnueabihf/-/nice-linux-arm-gnueabihf-1.1.1.tgz",
			"integrity": "sha512-E1t7K0efyKXZDoZg1LzCOLxgolxV58HCkaEkEvIYQx12ht2pa8hoBo+4OB3qh7e+QiBlp1SRf+voWUZFxyhyqg==",
			"cpu": [
				"arm"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">= 10"
			}
		},
		"node_modules/@napi-rs/nice-linux-arm64-gnu": {
			"version": "1.1.1",
			"resolved": "https://registry.npmjs.org/@napi-rs/nice-linux-arm64-gnu/-/nice-linux-arm64-gnu-1.1.1.tgz",
			"integrity": "sha512-CIKLA12DTIZlmTaaKhQP88R3Xao+gyJxNWEn04wZwC2wmRapNnxCUZkVwggInMJvtVElA+D4ZzOU5sX4jV+SmQ==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">= 10"
			}
		},
		"node_modules/@napi-rs/nice-linux-arm64-musl": {
			"version": "1.1.1",
			"resolved": "https://registry.npmjs.org/@napi-rs/nice-linux-arm64-musl/-/nice-linux-arm64-musl-1.1.1.tgz",
			"integrity": "sha512-+2Rzdb3nTIYZ0YJF43qf2twhqOCkiSrHx2Pg6DJaCPYhhaxbLcdlV8hCRMHghQ+EtZQWGNcS2xF4KxBhSGeutg==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">= 10"
			}
		},
		"node_modules/@napi-rs/nice-linux-ppc64-gnu": {
			"version": "1.1.1",
			"resolved": "https://registry.npmjs.org/@napi-rs/nice-linux-ppc64-gnu/-/nice-linux-ppc64-gnu-1.1.1.tgz",
			"integrity": "sha512-4FS8oc0GeHpwvv4tKciKkw3Y4jKsL7FRhaOeiPei0X9T4Jd619wHNe4xCLmN2EMgZoeGg+Q7GY7BsvwKpL22Tg==",
			"cpu": [
				"ppc64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">= 10"
			}
		},
		"node_modules/@napi-rs/nice-linux-riscv64-gnu": {
			"version": "1.1.1",
			"resolved": "https://registry.npmjs.org/@napi-rs/nice-linux-riscv64-gnu/-/nice-linux-riscv64-gnu-1.1.1.tgz",
			"integrity": "sha512-HU0nw9uD4FO/oGCCk409tCi5IzIZpH2agE6nN4fqpwVlCn5BOq0MS1dXGjXaG17JaAvrlpV5ZeyZwSon10XOXw==",
			"cpu": [
				"riscv64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">= 10"
			}
		},
		"node_modules/@napi-rs/nice-linux-s390x-gnu": {
			"version": "1.1.1",
			"resolved": "https://registry.npmjs.org/@napi-rs/nice-linux-s390x-gnu/-/nice-linux-s390x-gnu-1.1.1.tgz",
			"integrity": "sha512-2YqKJWWl24EwrX0DzCQgPLKQBxYDdBxOHot1KWEq7aY2uYeX+Uvtv4I8xFVVygJDgf6/92h9N3Y43WPx8+PAgQ==",
			"cpu": [
				"s390x"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">= 10"
			}
		},
		"node_modules/@napi-rs/nice-linux-x64-gnu": {
			"version": "1.1.1",
			"resolved": "https://registry.npmjs.org/@napi-rs/nice-linux-x64-gnu/-/nice-linux-x64-gnu-1.1.1.tgz",
			"integrity": "sha512-/gaNz3R92t+dcrfCw/96pDopcmec7oCcAQ3l/M+Zxr82KT4DljD37CpgrnXV+pJC263JkW572pdbP3hP+KjcIg==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">= 10"
			}
		},
		"node_modules/@napi-rs/nice-linux-x64-musl": {
			"version": "1.1.1",
			"resolved": "https://registry.npmjs.org/@napi-rs/nice-linux-x64-musl/-/nice-linux-x64-musl-1.1.1.tgz",
			"integrity": "sha512-xScCGnyj/oppsNPMnevsBe3pvNaoK7FGvMjT35riz9YdhB2WtTG47ZlbxtOLpjeO9SqqQ2J2igCmz6IJOD5JYw==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">= 10"
			}
		},
		"node_modules/@napi-rs/nice-openharmony-arm64": {
			"version": "1.1.1",
			"resolved": "https://registry.npmjs.org/@napi-rs/nice-openharmony-arm64/-/nice-openharmony-arm64-1.1.1.tgz",
			"integrity": "sha512-6uJPRVwVCLDeoOaNyeiW0gp2kFIM4r7PL2MczdZQHkFi9gVlgm+Vn+V6nTWRcu856mJ2WjYJiumEajfSm7arPQ==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"openharmony"
			],
			"engines": {
				"node": ">= 10"
			}
		},
		"node_modules/@napi-rs/nice-win32-arm64-msvc": {
			"version": "1.1.1",
			"resolved": "https://registry.npmjs.org/@napi-rs/nice-win32-arm64-msvc/-/nice-win32-arm64-msvc-1.1.1.tgz",
			"integrity": "sha512-uoTb4eAvM5B2aj/z8j+Nv8OttPf2m+HVx3UjA5jcFxASvNhQriyCQF1OB1lHL43ZhW+VwZlgvjmP5qF3+59atA==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"win32"
			],
			"engines": {
				"node": ">= 10"
			}
		},
		"node_modules/@napi-rs/nice-win32-ia32-msvc": {
			"version": "1.1.1",
			"resolved": "https://registry.npmjs.org/@napi-rs/nice-win32-ia32-msvc/-/nice-win32-ia32-msvc-1.1.1.tgz",
			"integrity": "sha512-CNQqlQT9MwuCsg1Vd/oKXiuH+TcsSPJmlAFc5frFyX/KkOh0UpBLEj7aoY656d5UKZQMQFP7vJNa1DNUNORvug==",
			"cpu": [
				"ia32"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"win32"
			],
			"engines": {
				"node": ">= 10"
			}
		},
		"node_modules/@napi-rs/nice-win32-x64-msvc": {
			"version": "1.1.1",
			"resolved": "https://registry.npmjs.org/@napi-rs/nice-win32-x64-msvc/-/nice-win32-x64-msvc-1.1.1.tgz",
			"integrity": "sha512-vB+4G/jBQCAh0jelMTY3+kgFy00Hlx2f2/1zjMoH821IbplbWZOkLiTYXQkygNTzQJTq5cvwBDgn2ppHD+bglQ==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"win32"
			],
			"engines": {
				"node": ">= 10"
			}
		},
		"node_modules/@napi-rs/wasm-runtime": {
			"version": "1.1.2",
			"resolved": "https://registry.npmjs.org/@napi-rs/wasm-runtime/-/wasm-runtime-1.1.2.tgz",
			"integrity": "sha512-sNXv5oLJ7ob93xkZ1XnxisYhGYXfaG9f65/ZgYuAu3qt7b3NadcOEhLvx28hv31PgX8SZJRYrAIPQilQmFpLVw==",
			"dev": true,
			"license": "MIT",
			"optional": true,
			"dependencies": {
				"@tybys/wasm-util": "^0.10.1"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/Brooooooklyn"
			},
			"peerDependencies": {
				"@emnapi/core": "^1.7.1",
				"@emnapi/runtime": "^1.7.1"
			}
		},
		"node_modules/@ng-icons/core": {
			"version": "33.2.2",
			"resolved": "https://registry.npmjs.org/@ng-icons/core/-/core-33.2.2.tgz",
			"integrity": "sha512-MwxREFbCx5p+x+Lx26V1FkHFpqHR/6g1TmBG7aYx+FFe1DIfrxUVXM+LW/Mviv3dN5sLE/Fi0ULP79Gz9uG0SQ==",
			"license": "MIT",
			"dependencies": {
				"tslib": "^2.3.0"
			},
			"peerDependencies": {
				"@angular-devkit/schematics": ">=21.0.0",
				"@angular/common": ">=21.0.0",
				"@angular/core": ">=21.0.0",
				"@schematics/angular": ">=21.0.0",
				"rxjs": "^6.5.3 || ^7.4.0"
			}
		},
		"node_modules/@ng-icons/lucide": {
			"version": "33.2.2",
			"resolved": "https://registry.npmjs.org/@ng-icons/lucide/-/lucide-33.2.2.tgz",
			"integrity": "sha512-/jse2Z6fnk4WbW3HDH+jSfE/ihBskVr+RHltk5KfxohgQRhqqQ2FOxTP0IhU3xYV1pMwpziH3WpIR+gKkGcryg==",
			"license": "ISC",
			"dependencies": {
				"tslib": "^2.3.0"
			}
		},
		"node_modules/@ng-icons/remixicon": {
			"version": "33.2.2",
			"resolved": "https://registry.npmjs.org/@ng-icons/remixicon/-/remixicon-33.2.2.tgz",
			"integrity": "sha512-AD7VW4s5Ga/IGGNv7EuaJ81w1nJaBDJ2aaEygff5txkcXbShpilrC1gGpm+/dPk5nOwaFCz4sjWzJGDwAdqMtg==",
			"license": "Apache",
			"dependencies": {
				"tslib": "^2.3.0"
			}
		},
		"node_modules/@nodelib/fs.scandir": {
			"version": "2.1.5",
			"resolved": "https://registry.npmjs.org/@nodelib/fs.scandir/-/fs.scandir-2.1.5.tgz",
			"integrity": "sha512-vq24Bq3ym5HEQm2NKCr3yXDwjc7vTsEThRDnkp2DK9p1uqLR+DHurm/NOTo0KG7HYHU7eppKZj3MyqYuMBf62g==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@nodelib/fs.stat": "2.0.5",
				"run-parallel": "^1.1.9"
			},
			"engines": {
				"node": ">= 8"
			}
		},
		"node_modules/@nodelib/fs.stat": {
			"version": "2.0.5",
			"resolved": "https://registry.npmjs.org/@nodelib/fs.stat/-/fs.stat-2.0.5.tgz",
			"integrity": "sha512-RkhPPp2zrqDAQA/2jNhnztcPAlv64XdhIp7a7454A5ovI7Bukxgt7MX7udwAu3zg1DcpPU0rz3VV1SeaqvY4+A==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 8"
			}
		},
		"node_modules/@nodelib/fs.walk": {
			"version": "1.2.8",
			"resolved": "https://registry.npmjs.org/@nodelib/fs.walk/-/fs.walk-1.2.8.tgz",
			"integrity": "sha512-oGB+UxlgWcgQkgwo8GcEGwemoTFt3FIO9ababBmaGwXIoBKZ+GTy0pP185beGg7Llih/NSHSV2XAs1lnznocSg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@nodelib/fs.scandir": "2.1.5",
				"fastq": "^1.6.0"
			},
			"engines": {
				"node": ">= 8"
			}
		},
		"node_modules/@npmcli/agent": {
			"version": "4.0.0",
			"resolved": "https://registry.npmjs.org/@npmcli/agent/-/agent-4.0.0.tgz",
			"integrity": "sha512-kAQTcEN9E8ERLVg5AsGwLNoFb+oEG6engbqAU2P43gD4JEIkNGMHdVQ096FsOAAYpZPB0RSt0zgInKIAS1l5QA==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"agent-base": "^7.1.0",
				"http-proxy-agent": "^7.0.0",
				"https-proxy-agent": "^7.0.1",
				"lru-cache": "^11.2.1",
				"socks-proxy-agent": "^8.0.3"
			},
			"engines": {
				"node": "^20.17.0 || >=22.9.0"
			}
		},
		"node_modules/@npmcli/agent/node_modules/lru-cache": {
			"version": "11.2.7",
			"resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-11.2.7.tgz",
			"integrity": "sha512-aY/R+aEsRelme17KGQa/1ZSIpLpNYYrhcrepKTZgE+W3WM16YMCaPwOHLHsmopZHELU0Ojin1lPVxKR0MihncA==",
			"dev": true,
			"license": "BlueOak-1.0.0",
			"engines": {
				"node": "20 || >=22"
			}
		},
		"node_modules/@npmcli/fs": {
			"version": "5.0.0",
			"resolved": "https://registry.npmjs.org/@npmcli/fs/-/fs-5.0.0.tgz",
			"integrity": "sha512-7OsC1gNORBEawOa5+j2pXN9vsicaIOH5cPXxoR6fJOmH6/EXpJB2CajXOu1fPRFun2m1lktEFX11+P89hqO/og==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"semver": "^7.3.5"
			},
			"engines": {
				"node": "^20.17.0 || >=22.9.0"
			}
		},
		"node_modules/@npmcli/git": {
			"version": "7.0.2",
			"resolved": "https://registry.npmjs.org/@npmcli/git/-/git-7.0.2.tgz",
			"integrity": "sha512-oeolHDjExNAJAnlYP2qzNjMX/Xi9bmu78C9dIGr4xjobrSKbuMYCph8lTzn4vnW3NjIqVmw/f8BCfouqyJXlRg==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"@gar/promise-retry": "^1.0.0",
				"@npmcli/promise-spawn": "^9.0.0",
				"ini": "^6.0.0",
				"lru-cache": "^11.2.1",
				"npm-pick-manifest": "^11.0.1",
				"proc-log": "^6.0.0",
				"semver": "^7.3.5",
				"which": "^6.0.0"
			},
			"engines": {
				"node": "^20.17.0 || >=22.9.0"
			}
		},
		"node_modules/@npmcli/git/node_modules/isexe": {
			"version": "4.0.0",
			"resolved": "https://registry.npmjs.org/isexe/-/isexe-4.0.0.tgz",
			"integrity": "sha512-FFUtZMpoZ8RqHS3XeXEmHWLA4thH+ZxCv2lOiPIn1Xc7CxrqhWzNSDzD+/chS/zbYezmiwWLdQC09JdQKmthOw==",
			"dev": true,
			"license": "BlueOak-1.0.0",
			"engines": {
				"node": ">=20"
			}
		},
		"node_modules/@npmcli/git/node_modules/lru-cache": {
			"version": "11.2.7",
			"resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-11.2.7.tgz",
			"integrity": "sha512-aY/R+aEsRelme17KGQa/1ZSIpLpNYYrhcrepKTZgE+W3WM16YMCaPwOHLHsmopZHELU0Ojin1lPVxKR0MihncA==",
			"dev": true,
			"license": "BlueOak-1.0.0",
			"engines": {
				"node": "20 || >=22"
			}
		},
		"node_modules/@npmcli/git/node_modules/which": {
			"version": "6.0.1",
			"resolved": "https://registry.npmjs.org/which/-/which-6.0.1.tgz",
			"integrity": "sha512-oGLe46MIrCRqX7ytPUf66EAYvdeMIZYn3WaocqqKZAxrBpkqHfL/qvTyJ/bTk5+AqHCjXmrv3CEWgy368zhRUg==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"isexe": "^4.0.0"
			},
			"bin": {
				"node-which": "bin/which.js"
			},
			"engines": {
				"node": "^20.17.0 || >=22.9.0"
			}
		},
		"node_modules/@npmcli/installed-package-contents": {
			"version": "4.0.0",
			"resolved": "https://registry.npmjs.org/@npmcli/installed-package-contents/-/installed-package-contents-4.0.0.tgz",
			"integrity": "sha512-yNyAdkBxB72gtZ4GrwXCM0ZUedo9nIbOMKfGjt6Cu6DXf0p8y1PViZAKDC8q8kv/fufx0WTjRBdSlyrvnP7hmA==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"npm-bundled": "^5.0.0",
				"npm-normalize-package-bin": "^5.0.0"
			},
			"bin": {
				"installed-package-contents": "bin/index.js"
			},
			"engines": {
				"node": "^20.17.0 || >=22.9.0"
			}
		},
		"node_modules/@npmcli/node-gyp": {
			"version": "5.0.0",
			"resolved": "https://registry.npmjs.org/@npmcli/node-gyp/-/node-gyp-5.0.0.tgz",
			"integrity": "sha512-uuG5HZFXLfyFKqg8QypsmgLQW7smiRjVc45bqD/ofZZcR/uxEjgQU8qDPv0s9TEeMUiAAU/GC5bR6++UdTirIQ==",
			"dev": true,
			"license": "ISC",
			"engines": {
				"node": "^20.17.0 || >=22.9.0"
			}
		},
		"node_modules/@npmcli/package-json": {
			"version": "7.0.5",
			"resolved": "https://registry.npmjs.org/@npmcli/package-json/-/package-json-7.0.5.tgz",
			"integrity": "sha512-iVuTlG3ORq2iaVa1IWUxAO/jIp77tUKBhoMjuzYW2kL4MLN1bi/ofqkZ7D7OOwh8coAx1/S2ge0rMdGv8sLSOQ==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"@npmcli/git": "^7.0.0",
				"glob": "^13.0.0",
				"hosted-git-info": "^9.0.0",
				"json-parse-even-better-errors": "^5.0.0",
				"proc-log": "^6.0.0",
				"semver": "^7.5.3",
				"spdx-expression-parse": "^4.0.0"
			},
			"engines": {
				"node": "^20.17.0 || >=22.9.0"
			}
		},
		"node_modules/@npmcli/promise-spawn": {
			"version": "9.0.1",
			"resolved": "https://registry.npmjs.org/@npmcli/promise-spawn/-/promise-spawn-9.0.1.tgz",
			"integrity": "sha512-OLUaoqBuyxeTqUvjA3FZFiXUfYC1alp3Sa99gW3EUDz3tZ3CbXDdcZ7qWKBzicrJleIgucoWamWH1saAmH/l2Q==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"which": "^6.0.0"
			},
			"engines": {
				"node": "^20.17.0 || >=22.9.0"
			}
		},
		"node_modules/@npmcli/promise-spawn/node_modules/isexe": {
			"version": "4.0.0",
			"resolved": "https://registry.npmjs.org/isexe/-/isexe-4.0.0.tgz",
			"integrity": "sha512-FFUtZMpoZ8RqHS3XeXEmHWLA4thH+ZxCv2lOiPIn1Xc7CxrqhWzNSDzD+/chS/zbYezmiwWLdQC09JdQKmthOw==",
			"dev": true,
			"license": "BlueOak-1.0.0",
			"engines": {
				"node": ">=20"
			}
		},
		"node_modules/@npmcli/promise-spawn/node_modules/which": {
			"version": "6.0.1",
			"resolved": "https://registry.npmjs.org/which/-/which-6.0.1.tgz",
			"integrity": "sha512-oGLe46MIrCRqX7ytPUf66EAYvdeMIZYn3WaocqqKZAxrBpkqHfL/qvTyJ/bTk5+AqHCjXmrv3CEWgy368zhRUg==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"isexe": "^4.0.0"
			},
			"bin": {
				"node-which": "bin/which.js"
			},
			"engines": {
				"node": "^20.17.0 || >=22.9.0"
			}
		},
		"node_modules/@npmcli/redact": {
			"version": "4.0.0",
			"resolved": "https://registry.npmjs.org/@npmcli/redact/-/redact-4.0.0.tgz",
			"integrity": "sha512-gOBg5YHMfZy+TfHArfVogwgfBeQnKbbGo3pSUyK/gSI0AVu+pEiDVcKlQb0D8Mg1LNRZILZ6XG8I5dJ4KuAd9Q==",
			"dev": true,
			"license": "ISC",
			"engines": {
				"node": "^20.17.0 || >=22.9.0"
			}
		},
		"node_modules/@npmcli/run-script": {
			"version": "10.0.4",
			"resolved": "https://registry.npmjs.org/@npmcli/run-script/-/run-script-10.0.4.tgz",
			"integrity": "sha512-mGUWr1uMnf0le2TwfOZY4SFxZGXGfm4Jtay/nwAa2FLNAKXUoUwaGwBMNH36UHPtinWfTSJ3nqFQr0091CxVGg==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"@npmcli/node-gyp": "^5.0.0",
				"@npmcli/package-json": "^7.0.0",
				"@npmcli/promise-spawn": "^9.0.0",
				"node-gyp": "^12.1.0",
				"proc-log": "^6.0.0"
			},
			"engines": {
				"node": "^20.17.0 || >=22.9.0"
			}
		},
		"node_modules/@nx/devkit": {
			"version": "22.6.5",
			"resolved": "https://registry.npmjs.org/@nx/devkit/-/devkit-22.6.5.tgz",
			"integrity": "sha512-9kvAI+kk2pfEXLqS8OyjI9XvWmp+Gdn7jPfxDAz8BOqxMyPy3p5hYl+jc4TIsLOWunAFl8azqrcYsHzEpaWCIA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@zkochan/js-yaml": "0.0.7",
				"ejs": "5.0.1",
				"enquirer": "~2.3.6",
				"minimatch": "10.2.4",
				"semver": "^7.6.3",
				"tslib": "^2.3.0",
				"yargs-parser": "21.1.1"
			},
			"peerDependencies": {
				"nx": ">= 21 <= 23 || ^22.0.0-0"
			}
		},
		"node_modules/@nx/devkit/node_modules/minimatch": {
			"version": "10.2.4",
			"resolved": "https://registry.npmjs.org/minimatch/-/minimatch-10.2.4.tgz",
			"integrity": "sha512-oRjTw/97aTBN0RHbYCdtF1MQfvusSIBQM0IZEgzl6426+8jSC0nF1a/GmnVLpfB9yyr6g6FTqWqiZVbxrtaCIg==",
			"dev": true,
			"license": "BlueOak-1.0.0",
			"dependencies": {
				"brace-expansion": "^5.0.2"
			},
			"engines": {
				"node": "18 || 20 || >=22"
			},
			"funding": {
				"url": "https://github.com/sponsors/isaacs"
			}
		},
		"node_modules/@nx/devkit/node_modules/yargs-parser": {
			"version": "21.1.1",
			"resolved": "https://registry.npmjs.org/yargs-parser/-/yargs-parser-21.1.1.tgz",
			"integrity": "sha512-tVpsJW7DdjecAiFpbIB1e3qxIQsE6NoPc5/eTdrbbIC4h0LVsWhnoa3g+m2HclBIujHzsxZ4VJVA+GUuc2/LBw==",
			"dev": true,
			"license": "ISC",
			"engines": {
				"node": ">=12"
			}
		},
		"node_modules/@nx/eslint": {
			"version": "22.6.5",
			"resolved": "https://registry.npmjs.org/@nx/eslint/-/eslint-22.6.5.tgz",
			"integrity": "sha512-rEV8CveVA3CCW8MHSKauUI+6XSpQ0nZ/z64fBvBulLUoUO10/mVpkbl3NpRyhCKXzOHYhW35wwuzq6YrfSi6gA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@nx/devkit": "22.6.5",
				"@nx/js": "22.6.5",
				"semver": "^7.6.3",
				"tslib": "^2.3.0",
				"typescript": "~5.9.2"
			},
			"peerDependencies": {
				"@zkochan/js-yaml": "0.0.7",
				"eslint": "^8.0.0 || ^9.0.0 || ^10.0.0"
			},
			"peerDependenciesMeta": {
				"@zkochan/js-yaml": {
					"optional": true
				}
			}
		},
		"node_modules/@nx/js": {
			"version": "22.6.5",
			"resolved": "https://registry.npmjs.org/@nx/js/-/js-22.6.5.tgz",
			"integrity": "sha512-bmikz6qaBHfuAgsqPB/TfLIKfvI4g+EKIRAiU2FHnEtVWOKDAmSQXHFwE3rMS49jl2JLgxkdNjZHpg4g/OLy0g==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/core": "^7.23.2",
				"@babel/plugin-proposal-decorators": "^7.22.7",
				"@babel/plugin-transform-class-properties": "^7.22.5",
				"@babel/plugin-transform-runtime": "^7.23.2",
				"@babel/preset-env": "^7.23.2",
				"@babel/preset-typescript": "^7.22.5",
				"@babel/runtime": "^7.22.6",
				"@nx/devkit": "22.6.5",
				"@nx/workspace": "22.6.5",
				"@zkochan/js-yaml": "0.0.7",
				"babel-plugin-const-enum": "^1.0.1",
				"babel-plugin-macros": "^3.1.0",
				"babel-plugin-transform-typescript-metadata": "^0.3.1",
				"chalk": "^4.1.0",
				"columnify": "^1.6.0",
				"detect-port": "^1.5.1",
				"ignore": "^5.0.4",
				"js-tokens": "^4.0.0",
				"jsonc-parser": "3.2.0",
				"npm-run-path": "^4.0.1",
				"picocolors": "^1.1.0",
				"picomatch": "4.0.4",
				"semver": "^7.6.3",
				"source-map-support": "0.5.19",
				"tinyglobby": "^0.2.12",
				"tslib": "^2.3.0"
			},
			"peerDependencies": {
				"verdaccio": "^6.0.5"
			},
			"peerDependenciesMeta": {
				"verdaccio": {
					"optional": true
				}
			}
		},
		"node_modules/@nx/js/node_modules/ansi-styles": {
			"version": "4.3.0",
			"resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz",
			"integrity": "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"color-convert": "^2.0.1"
			},
			"engines": {
				"node": ">=8"
			},
			"funding": {
				"url": "https://github.com/chalk/ansi-styles?sponsor=1"
			}
		},
		"node_modules/@nx/js/node_modules/chalk": {
			"version": "4.1.2",
			"resolved": "https://registry.npmjs.org/chalk/-/chalk-4.1.2.tgz",
			"integrity": "sha512-oKnbhFyRIXpUuez8iBMmyEa4nbj4IOQyuhc/wy9kY7/WVPcwIO9VA668Pu8RkO7+0G76SLROeyw9CpQ061i4mA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ansi-styles": "^4.1.0",
				"supports-color": "^7.1.0"
			},
			"engines": {
				"node": ">=10"
			},
			"funding": {
				"url": "https://github.com/chalk/chalk?sponsor=1"
			}
		},
		"node_modules/@nx/js/node_modules/ignore": {
			"version": "5.3.2",
			"resolved": "https://registry.npmjs.org/ignore/-/ignore-5.3.2.tgz",
			"integrity": "sha512-hsBTNUqQTDwkWtcdYI2i06Y/nUBEsNEDJKjWdigLvegy8kDuJAS8uRlpkkcQpyEXL0Z/pjDy5HBmMjRCJ2gq+g==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 4"
			}
		},
		"node_modules/@nx/js/node_modules/jsonc-parser": {
			"version": "3.2.0",
			"resolved": "https://registry.npmjs.org/jsonc-parser/-/jsonc-parser-3.2.0.tgz",
			"integrity": "sha512-gfFQZrcTc8CnKXp6Y4/CBT3fTc0OVuDofpre4aEeEpSBPV5X5v4+Vmx+8snU7RLPrNHPKSgLxGo9YuQzz20o+w==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@nx/js/node_modules/source-map": {
			"version": "0.6.1",
			"resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
			"integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==",
			"dev": true,
			"license": "BSD-3-Clause",
			"engines": {
				"node": ">=0.10.0"
			}
		},
		"node_modules/@nx/js/node_modules/source-map-support": {
			"version": "0.5.19",
			"resolved": "https://registry.npmjs.org/source-map-support/-/source-map-support-0.5.19.tgz",
			"integrity": "sha512-Wonm7zOCIJzBGQdB+thsPar0kYuCIzYvxZwlBa87yi/Mdjv7Tip2cyVbLj5o0cFPN4EVkuTwb3GDDyUx2DGnGw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"buffer-from": "^1.0.0",
				"source-map": "^0.6.0"
			}
		},
		"node_modules/@nx/module-federation": {
			"version": "22.6.5",
			"resolved": "https://registry.npmjs.org/@nx/module-federation/-/module-federation-22.6.5.tgz",
			"integrity": "sha512-nQS3qFGs8lQ87ZQ8hab+oL+BfjCYjNPkGrpH4fXovnFgwaRNudnQnh2vTud1+JcUl0e+sJi/wIwZH4AB75jzSA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@module-federation/enhanced": "^2.1.0",
				"@module-federation/node": "^2.7.21",
				"@module-federation/sdk": "^2.1.0",
				"@nx/devkit": "22.6.5",
				"@nx/js": "22.6.5",
				"@nx/web": "22.6.5",
				"@rspack/core": "1.6.8",
				"express": "^4.21.2",
				"http-proxy-middleware": "^3.0.5",
				"picocolors": "^1.1.0",
				"tslib": "^2.3.0",
				"webpack": "^5.101.3"
			}
		},
		"node_modules/@nx/module-federation/node_modules/accepts": {
			"version": "1.3.8",
			"resolved": "https://registry.npmjs.org/accepts/-/accepts-1.3.8.tgz",
			"integrity": "sha512-PYAthTa2m2VKxuvSD3DPC/Gy+U+sOA1LAuT8mkmRuvw+NACSaeXEQ+NHcVF7rONl6qcaxV3Uuemwawk+7+SJLw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"mime-types": "~2.1.34",
				"negotiator": "0.6.3"
			},
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/@nx/module-federation/node_modules/body-parser": {
			"version": "1.20.4",
			"resolved": "https://registry.npmjs.org/body-parser/-/body-parser-1.20.4.tgz",
			"integrity": "sha512-ZTgYYLMOXY9qKU/57FAo8F+HA2dGX7bqGc71txDRC1rS4frdFI5R7NhluHxH6M0YItAP0sHB4uqAOcYKxO6uGA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"bytes": "~3.1.2",
				"content-type": "~1.0.5",
				"debug": "2.6.9",
				"depd": "2.0.0",
				"destroy": "~1.2.0",
				"http-errors": "~2.0.1",
				"iconv-lite": "~0.4.24",
				"on-finished": "~2.4.1",
				"qs": "~6.14.0",
				"raw-body": "~2.5.3",
				"type-is": "~1.6.18",
				"unpipe": "~1.0.0"
			},
			"engines": {
				"node": ">= 0.8",
				"npm": "1.2.8000 || >= 1.4.16"
			}
		},
		"node_modules/@nx/module-federation/node_modules/content-disposition": {
			"version": "0.5.4",
			"resolved": "https://registry.npmjs.org/content-disposition/-/content-disposition-0.5.4.tgz",
			"integrity": "sha512-FveZTNuGw04cxlAiWbzi6zTAL/lhehaWbTtgluJh4/E95DqMwTmha3KZN1aAWA8cFIhHzMZUvLevkw5Rqk+tSQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"safe-buffer": "5.2.1"
			},
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/@nx/module-federation/node_modules/cookie-signature": {
			"version": "1.0.7",
			"resolved": "https://registry.npmjs.org/cookie-signature/-/cookie-signature-1.0.7.tgz",
			"integrity": "sha512-NXdYc3dLr47pBkpUCHtKSwIOQXLVn8dZEuywboCOJY/osA0wFSLlSawr3KN8qXJEyX66FcONTH8EIlVuK0yyFA==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@nx/module-federation/node_modules/debug": {
			"version": "2.6.9",
			"resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
			"integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ms": "2.0.0"
			}
		},
		"node_modules/@nx/module-federation/node_modules/debug/node_modules/ms": {
			"version": "2.0.0",
			"resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
			"integrity": "sha512-Tpp60P6IUJDTuOq/5Z8cdskzJujfwqfOTkrwIwj7IRISpnkJnT6SyJ4PCPnGMoFjC9ddhal5KVIYtAt97ix05A==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@nx/module-federation/node_modules/express": {
			"version": "4.22.1",
			"resolved": "https://registry.npmjs.org/express/-/express-4.22.1.tgz",
			"integrity": "sha512-F2X8g9P1X7uCPZMA3MVf9wcTqlyNp7IhH5qPCI0izhaOIYXaW9L535tGA3qmjRzpH+bZczqq7hVKxTR4NWnu+g==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"accepts": "~1.3.8",
				"array-flatten": "1.1.1",
				"body-parser": "~1.20.3",
				"content-disposition": "~0.5.4",
				"content-type": "~1.0.4",
				"cookie": "~0.7.1",
				"cookie-signature": "~1.0.6",
				"debug": "2.6.9",
				"depd": "2.0.0",
				"encodeurl": "~2.0.0",
				"escape-html": "~1.0.3",
				"etag": "~1.8.1",
				"finalhandler": "~1.3.1",
				"fresh": "~0.5.2",
				"http-errors": "~2.0.0",
				"merge-descriptors": "1.0.3",
				"methods": "~1.1.2",
				"on-finished": "~2.4.1",
				"parseurl": "~1.3.3",
				"path-to-regexp": "~0.1.12",
				"proxy-addr": "~2.0.7",
				"qs": "~6.14.0",
				"range-parser": "~1.2.1",
				"safe-buffer": "5.2.1",
				"send": "~0.19.0",
				"serve-static": "~1.16.2",
				"setprototypeof": "1.2.0",
				"statuses": "~2.0.1",
				"type-is": "~1.6.18",
				"utils-merge": "1.0.1",
				"vary": "~1.1.2"
			},
			"engines": {
				"node": ">= 0.10.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/express"
			}
		},
		"node_modules/@nx/module-federation/node_modules/finalhandler": {
			"version": "1.3.2",
			"resolved": "https://registry.npmjs.org/finalhandler/-/finalhandler-1.3.2.tgz",
			"integrity": "sha512-aA4RyPcd3badbdABGDuTXCMTtOneUCAYH/gxoYRTZlIJdF0YPWuGqiAsIrhNnnqdXGswYk6dGujem4w80UJFhg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"debug": "2.6.9",
				"encodeurl": "~2.0.0",
				"escape-html": "~1.0.3",
				"on-finished": "~2.4.1",
				"parseurl": "~1.3.3",
				"statuses": "~2.0.2",
				"unpipe": "~1.0.0"
			},
			"engines": {
				"node": ">= 0.8"
			}
		},
		"node_modules/@nx/module-federation/node_modules/fresh": {
			"version": "0.5.2",
			"resolved": "https://registry.npmjs.org/fresh/-/fresh-0.5.2.tgz",
			"integrity": "sha512-zJ2mQYM18rEFOudeV4GShTGIQ7RbzA7ozbU9I/XBpm7kqgMywgmylMwXHxZJmkVoYkna9d2pVXVXPdYTP9ej8Q==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/@nx/module-federation/node_modules/iconv-lite": {
			"version": "0.4.24",
			"resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.4.24.tgz",
			"integrity": "sha512-v3MXnZAcvnywkTUEZomIActle7RXXeedOR31wwl7VlyoXO4Qi9arvSenNQWne1TcRwhCL1HwLI21bEqdpj8/rA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"safer-buffer": ">= 2.1.2 < 3"
			},
			"engines": {
				"node": ">=0.10.0"
			}
		},
		"node_modules/@nx/module-federation/node_modules/media-typer": {
			"version": "0.3.0",
			"resolved": "https://registry.npmjs.org/media-typer/-/media-typer-0.3.0.tgz",
			"integrity": "sha512-dq+qelQ9akHpcOl/gUVRTxVIOkAJ1wR3QAvb4RsVjS8oVoFjDGTc679wJYmUmknUF5HwMLOgb5O+a3KxfWapPQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/@nx/module-federation/node_modules/merge-descriptors": {
			"version": "1.0.3",
			"resolved": "https://registry.npmjs.org/merge-descriptors/-/merge-descriptors-1.0.3.tgz",
			"integrity": "sha512-gaNvAS7TZ897/rVaZ0nMtAyxNyi/pdbjbAwUpFQpN70GqnVfOiXpeUUMKRBmzXaSQ8DdTX4/0ms62r2K+hE6mQ==",
			"dev": true,
			"license": "MIT",
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/@nx/module-federation/node_modules/mime-db": {
			"version": "1.52.0",
			"resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.52.0.tgz",
			"integrity": "sha512-sPU4uV7dYlvtWJxwwxHD0PuihVNiE7TyAbQ5SWxDCB9mUYvOgroQOwYQQOKPJ8CIbE+1ETVlOoK1UC2nU3gYvg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/@nx/module-federation/node_modules/mime-types": {
			"version": "2.1.35",
			"resolved": "https://registry.npmjs.org/mime-types/-/mime-types-2.1.35.tgz",
			"integrity": "sha512-ZDY+bPm5zTTF+YpCrAU9nK0UgICYPT0QtT1NZWFv4s++TNkcgVaT0g6+4R2uI4MjQjzysHB1zxuWL50hzaeXiw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"mime-db": "1.52.0"
			},
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/@nx/module-federation/node_modules/negotiator": {
			"version": "0.6.3",
			"resolved": "https://registry.npmjs.org/negotiator/-/negotiator-0.6.3.tgz",
			"integrity": "sha512-+EUsqGPLsM+j/zdChZjsnX51g4XrHFOIXwfnCVPGlQk/k5giakcKsuxCObBRu6DSm9opw/O6slWbJdghQM4bBg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/@nx/module-federation/node_modules/path-to-regexp": {
			"version": "0.1.13",
			"resolved": "https://registry.npmjs.org/path-to-regexp/-/path-to-regexp-0.1.13.tgz",
			"integrity": "sha512-A/AGNMFN3c8bOlvV9RreMdrv7jsmF9XIfDeCd87+I8RNg6s78BhJxMu69NEMHBSJFxKidViTEdruRwEk/WIKqA==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@nx/module-federation/node_modules/qs": {
			"version": "6.14.2",
			"resolved": "https://registry.npmjs.org/qs/-/qs-6.14.2.tgz",
			"integrity": "sha512-V/yCWTTF7VJ9hIh18Ugr2zhJMP01MY7c5kh4J870L7imm6/DIzBsNLTXzMwUA3yZ5b/KBqLx8Kp3uRvd7xSe3Q==",
			"dev": true,
			"license": "BSD-3-Clause",
			"dependencies": {
				"side-channel": "^1.1.0"
			},
			"engines": {
				"node": ">=0.6"
			},
			"funding": {
				"url": "https://github.com/sponsors/ljharb"
			}
		},
		"node_modules/@nx/module-federation/node_modules/raw-body": {
			"version": "2.5.3",
			"resolved": "https://registry.npmjs.org/raw-body/-/raw-body-2.5.3.tgz",
			"integrity": "sha512-s4VSOf6yN0rvbRZGxs8Om5CWj6seneMwK3oDb4lWDH0UPhWcxwOWw5+qk24bxq87szX1ydrwylIOp2uG1ojUpA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"bytes": "~3.1.2",
				"http-errors": "~2.0.1",
				"iconv-lite": "~0.4.24",
				"unpipe": "~1.0.0"
			},
			"engines": {
				"node": ">= 0.8"
			}
		},
		"node_modules/@nx/module-federation/node_modules/send": {
			"version": "0.19.2",
			"resolved": "https://registry.npmjs.org/send/-/send-0.19.2.tgz",
			"integrity": "sha512-VMbMxbDeehAxpOtWJXlcUS5E8iXh6QmN+BkRX1GARS3wRaXEEgzCcB10gTQazO42tpNIya8xIyNx8fll1OFPrg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"debug": "2.6.9",
				"depd": "2.0.0",
				"destroy": "1.2.0",
				"encodeurl": "~2.0.0",
				"escape-html": "~1.0.3",
				"etag": "~1.8.1",
				"fresh": "~0.5.2",
				"http-errors": "~2.0.1",
				"mime": "1.6.0",
				"ms": "2.1.3",
				"on-finished": "~2.4.1",
				"range-parser": "~1.2.1",
				"statuses": "~2.0.2"
			},
			"engines": {
				"node": ">= 0.8.0"
			}
		},
		"node_modules/@nx/module-federation/node_modules/serve-static": {
			"version": "1.16.3",
			"resolved": "https://registry.npmjs.org/serve-static/-/serve-static-1.16.3.tgz",
			"integrity": "sha512-x0RTqQel6g5SY7Lg6ZreMmsOzncHFU7nhnRWkKgWuMTu5NN0DR5oruckMqRvacAN9d5w6ARnRBXl9xhDCgfMeA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"encodeurl": "~2.0.0",
				"escape-html": "~1.0.3",
				"parseurl": "~1.3.3",
				"send": "~0.19.1"
			},
			"engines": {
				"node": ">= 0.8.0"
			}
		},
		"node_modules/@nx/module-federation/node_modules/type-is": {
			"version": "1.6.18",
			"resolved": "https://registry.npmjs.org/type-is/-/type-is-1.6.18.tgz",
			"integrity": "sha512-TkRKr9sUTxEH8MdfuCSP7VizJyzRNMjj2J2do2Jr3Kym598JVdEksuzPQCnlFPW4ky9Q+iA+ma9BGm06XQBy8g==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"media-typer": "0.3.0",
				"mime-types": "~2.1.24"
			},
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/@nx/nx-darwin-arm64": {
			"version": "22.6.5",
			"resolved": "https://registry.npmjs.org/@nx/nx-darwin-arm64/-/nx-darwin-arm64-22.6.5.tgz",
			"integrity": "sha512-qT77Omkg5xQuL2+pDbneX2tI+XW5ZeayMylu7UUgK8OhTrAkJLKjpuYRH4xT5XBipxbDtlxmO3aLS3Ib1pKzJQ==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"darwin"
			]
		},
		"node_modules/@nx/nx-darwin-x64": {
			"version": "22.6.5",
			"resolved": "https://registry.npmjs.org/@nx/nx-darwin-x64/-/nx-darwin-x64-22.6.5.tgz",
			"integrity": "sha512-9jICxb7vfJ56y/7Yuh3b/n1QJqWxO9xnXKYEs6SO8xPoW/KomVckILGc1C6RQSs6/3ixVJC7k1Dh1wm5tKPFrg==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"darwin"
			]
		},
		"node_modules/@nx/nx-freebsd-x64": {
			"version": "22.6.5",
			"resolved": "https://registry.npmjs.org/@nx/nx-freebsd-x64/-/nx-freebsd-x64-22.6.5.tgz",
			"integrity": "sha512-6B1wEKpqz5dI3AGMqttAVnA6M3DB/besAtuGyQiymK9ROlta1iuWgCcIYwcCQyhLn2Rx7vqj447KKcgCa8HlVw==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"freebsd"
			]
		},
		"node_modules/@nx/nx-linux-arm-gnueabihf": {
			"version": "22.6.5",
			"resolved": "https://registry.npmjs.org/@nx/nx-linux-arm-gnueabihf/-/nx-linux-arm-gnueabihf-22.6.5.tgz",
			"integrity": "sha512-xV50B8mnDPboct7JkAHftajI02s+8FszA8WTzhore+YGR+lEKHTLpucwGEaQuMlSdLplH7pQix4B4uK5pcMhZw==",
			"cpu": [
				"arm"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			]
		},
		"node_modules/@nx/nx-linux-arm64-gnu": {
			"version": "22.6.5",
			"resolved": "https://registry.npmjs.org/@nx/nx-linux-arm64-gnu/-/nx-linux-arm64-gnu-22.6.5.tgz",
			"integrity": "sha512-2JkWuMGj+HpW6oPAvU5VdAx1afTnEbiM10Y3YOrl3fipWV4BiP5VDx762QTrfCraP4hl6yqTgvTe7F9xaby+jQ==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			]
		},
		"node_modules/@nx/nx-linux-arm64-musl": {
			"version": "22.6.5",
			"resolved": "https://registry.npmjs.org/@nx/nx-linux-arm64-musl/-/nx-linux-arm64-musl-22.6.5.tgz",
			"integrity": "sha512-Z/zMqFClnEyqDXouJKEPoWVhMQIif5F0YuECWBYjd3ZLwQsXGTItoh+6Wm3XF/nGMA2uLOHyTq/X7iFXQY3RzA==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			]
		},
		"node_modules/@nx/nx-linux-x64-gnu": {
			"version": "22.6.5",
			"resolved": "https://registry.npmjs.org/@nx/nx-linux-x64-gnu/-/nx-linux-x64-gnu-22.6.5.tgz",
			"integrity": "sha512-FlotSyqNnaXSn0K+yWw+hRdYBwusABrPgKLyixfJIYRzsy+xPKN6pON6vZfqGwzuWF/9mEGReRz+iM8PiW0XSg==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			]
		},
		"node_modules/@nx/nx-linux-x64-musl": {
			"version": "22.6.5",
			"resolved": "https://registry.npmjs.org/@nx/nx-linux-x64-musl/-/nx-linux-x64-musl-22.6.5.tgz",
			"integrity": "sha512-RVOe2qcwhoIx6mxQURPjUfAW5SEOmT2gdhewvdcvX9ICq1hj5B2VarmkhTg0qroO7xiyqOqwq26mCzoV2I3NgQ==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			]
		},
		"node_modules/@nx/nx-win32-arm64-msvc": {
			"version": "22.6.5",
			"resolved": "https://registry.npmjs.org/@nx/nx-win32-arm64-msvc/-/nx-win32-arm64-msvc-22.6.5.tgz",
			"integrity": "sha512-ZqurqI8VuYnsr2Kn4K4t+Gx6j/BZdf6qz/6Tv4A7XQQ6oNYVQgTqoNEFj+CCkVaIe6aIdCWpousFLqs+ZgBqYQ==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"win32"
			]
		},
		"node_modules/@nx/nx-win32-x64-msvc": {
			"version": "22.6.5",
			"resolved": "https://registry.npmjs.org/@nx/nx-win32-x64-msvc/-/nx-win32-x64-msvc-22.6.5.tgz",
			"integrity": "sha512-i2QFBJIuaYg9BHxrrnBV4O7W9rVL2k0pSIdk/rRp3EYJEU93iUng+qbZiY9wh1xvmXuUCE2G7TRd+8/SG/RFKg==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"win32"
			]
		},
		"node_modules/@nx/rspack": {
			"version": "22.6.5",
			"resolved": "https://registry.npmjs.org/@nx/rspack/-/rspack-22.6.5.tgz",
			"integrity": "sha512-ugjdD7OY4Cy7AcSlEJcfcfDWxev5PnVagb4FEEEutneITLz8hrBmQ+uY5cJg07Vsx6eauskpirkwRtXAQeHgFQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@nx/devkit": "22.6.5",
				"@nx/js": "22.6.5",
				"@nx/module-federation": "22.6.5",
				"@nx/web": "22.6.5",
				"@phenomnomnominal/tsquery": "~6.1.4",
				"@rspack/core": "1.6.8",
				"@rspack/dev-server": "^1.1.4",
				"@rspack/plugin-react-refresh": "^1.0.0",
				"autoprefixer": "^10.4.9",
				"browserslist": "^4.26.0",
				"css-loader": "^6.4.0",
				"enquirer": "~2.3.6",
				"express": "^4.21.2",
				"http-proxy-middleware": "^3.0.5",
				"less-loader": "^12.2.0",
				"license-webpack-plugin": "^4.0.2",
				"loader-utils": "^2.0.3",
				"parse5": "4.0.0",
				"picocolors": "^1.1.0",
				"postcss": "^8.4.38",
				"postcss-import": "~14.1.0",
				"postcss-loader": "^8.1.1",
				"sass": "^1.85.0",
				"sass-embedded": "^1.83.4",
				"sass-loader": "^16.0.4",
				"source-map-loader": "^5.0.0",
				"style-loader": "^3.3.0",
				"ts-checker-rspack-plugin": "^1.1.1",
				"tslib": "^2.3.0",
				"webpack": "^5.101.3",
				"webpack-node-externals": "^3.0.0"
			},
			"peerDependencies": {
				"@module-federation/enhanced": "^2.1.0",
				"@module-federation/node": "^2.7.21"
			}
		},
		"node_modules/@nx/rspack/node_modules/@phenomnomnominal/tsquery": {
			"version": "6.1.4",
			"resolved": "https://registry.npmjs.org/@phenomnomnominal/tsquery/-/tsquery-6.1.4.tgz",
			"integrity": "sha512-3tHlGy/fxjJCHqIV8nelAzbRTNkCUY+k7lqBGKNuQz99H2OKGRt6oU+U2SZs6LYrbOe8mxMFl6kq6gzHapFRkw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@types/esquery": "^1.5.0",
				"esquery": "^1.5.0"
			},
			"peerDependencies": {
				"typescript": "^3 || ^4 || ^5"
			}
		},
		"node_modules/@nx/rspack/node_modules/accepts": {
			"version": "1.3.8",
			"resolved": "https://registry.npmjs.org/accepts/-/accepts-1.3.8.tgz",
			"integrity": "sha512-PYAthTa2m2VKxuvSD3DPC/Gy+U+sOA1LAuT8mkmRuvw+NACSaeXEQ+NHcVF7rONl6qcaxV3Uuemwawk+7+SJLw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"mime-types": "~2.1.34",
				"negotiator": "0.6.3"
			},
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/@nx/rspack/node_modules/body-parser": {
			"version": "1.20.4",
			"resolved": "https://registry.npmjs.org/body-parser/-/body-parser-1.20.4.tgz",
			"integrity": "sha512-ZTgYYLMOXY9qKU/57FAo8F+HA2dGX7bqGc71txDRC1rS4frdFI5R7NhluHxH6M0YItAP0sHB4uqAOcYKxO6uGA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"bytes": "~3.1.2",
				"content-type": "~1.0.5",
				"debug": "2.6.9",
				"depd": "2.0.0",
				"destroy": "~1.2.0",
				"http-errors": "~2.0.1",
				"iconv-lite": "~0.4.24",
				"on-finished": "~2.4.1",
				"qs": "~6.14.0",
				"raw-body": "~2.5.3",
				"type-is": "~1.6.18",
				"unpipe": "~1.0.0"
			},
			"engines": {
				"node": ">= 0.8",
				"npm": "1.2.8000 || >= 1.4.16"
			}
		},
		"node_modules/@nx/rspack/node_modules/content-disposition": {
			"version": "0.5.4",
			"resolved": "https://registry.npmjs.org/content-disposition/-/content-disposition-0.5.4.tgz",
			"integrity": "sha512-FveZTNuGw04cxlAiWbzi6zTAL/lhehaWbTtgluJh4/E95DqMwTmha3KZN1aAWA8cFIhHzMZUvLevkw5Rqk+tSQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"safe-buffer": "5.2.1"
			},
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/@nx/rspack/node_modules/cookie-signature": {
			"version": "1.0.7",
			"resolved": "https://registry.npmjs.org/cookie-signature/-/cookie-signature-1.0.7.tgz",
			"integrity": "sha512-NXdYc3dLr47pBkpUCHtKSwIOQXLVn8dZEuywboCOJY/osA0wFSLlSawr3KN8qXJEyX66FcONTH8EIlVuK0yyFA==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@nx/rspack/node_modules/debug": {
			"version": "2.6.9",
			"resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
			"integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ms": "2.0.0"
			}
		},
		"node_modules/@nx/rspack/node_modules/debug/node_modules/ms": {
			"version": "2.0.0",
			"resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
			"integrity": "sha512-Tpp60P6IUJDTuOq/5Z8cdskzJujfwqfOTkrwIwj7IRISpnkJnT6SyJ4PCPnGMoFjC9ddhal5KVIYtAt97ix05A==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@nx/rspack/node_modules/express": {
			"version": "4.22.1",
			"resolved": "https://registry.npmjs.org/express/-/express-4.22.1.tgz",
			"integrity": "sha512-F2X8g9P1X7uCPZMA3MVf9wcTqlyNp7IhH5qPCI0izhaOIYXaW9L535tGA3qmjRzpH+bZczqq7hVKxTR4NWnu+g==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"accepts": "~1.3.8",
				"array-flatten": "1.1.1",
				"body-parser": "~1.20.3",
				"content-disposition": "~0.5.4",
				"content-type": "~1.0.4",
				"cookie": "~0.7.1",
				"cookie-signature": "~1.0.6",
				"debug": "2.6.9",
				"depd": "2.0.0",
				"encodeurl": "~2.0.0",
				"escape-html": "~1.0.3",
				"etag": "~1.8.1",
				"finalhandler": "~1.3.1",
				"fresh": "~0.5.2",
				"http-errors": "~2.0.0",
				"merge-descriptors": "1.0.3",
				"methods": "~1.1.2",
				"on-finished": "~2.4.1",
				"parseurl": "~1.3.3",
				"path-to-regexp": "~0.1.12",
				"proxy-addr": "~2.0.7",
				"qs": "~6.14.0",
				"range-parser": "~1.2.1",
				"safe-buffer": "5.2.1",
				"send": "~0.19.0",
				"serve-static": "~1.16.2",
				"setprototypeof": "1.2.0",
				"statuses": "~2.0.1",
				"type-is": "~1.6.18",
				"utils-merge": "1.0.1",
				"vary": "~1.1.2"
			},
			"engines": {
				"node": ">= 0.10.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/express"
			}
		},
		"node_modules/@nx/rspack/node_modules/finalhandler": {
			"version": "1.3.2",
			"resolved": "https://registry.npmjs.org/finalhandler/-/finalhandler-1.3.2.tgz",
			"integrity": "sha512-aA4RyPcd3badbdABGDuTXCMTtOneUCAYH/gxoYRTZlIJdF0YPWuGqiAsIrhNnnqdXGswYk6dGujem4w80UJFhg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"debug": "2.6.9",
				"encodeurl": "~2.0.0",
				"escape-html": "~1.0.3",
				"on-finished": "~2.4.1",
				"parseurl": "~1.3.3",
				"statuses": "~2.0.2",
				"unpipe": "~1.0.0"
			},
			"engines": {
				"node": ">= 0.8"
			}
		},
		"node_modules/@nx/rspack/node_modules/fresh": {
			"version": "0.5.2",
			"resolved": "https://registry.npmjs.org/fresh/-/fresh-0.5.2.tgz",
			"integrity": "sha512-zJ2mQYM18rEFOudeV4GShTGIQ7RbzA7ozbU9I/XBpm7kqgMywgmylMwXHxZJmkVoYkna9d2pVXVXPdYTP9ej8Q==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/@nx/rspack/node_modules/iconv-lite": {
			"version": "0.4.24",
			"resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.4.24.tgz",
			"integrity": "sha512-v3MXnZAcvnywkTUEZomIActle7RXXeedOR31wwl7VlyoXO4Qi9arvSenNQWne1TcRwhCL1HwLI21bEqdpj8/rA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"safer-buffer": ">= 2.1.2 < 3"
			},
			"engines": {
				"node": ">=0.10.0"
			}
		},
		"node_modules/@nx/rspack/node_modules/media-typer": {
			"version": "0.3.0",
			"resolved": "https://registry.npmjs.org/media-typer/-/media-typer-0.3.0.tgz",
			"integrity": "sha512-dq+qelQ9akHpcOl/gUVRTxVIOkAJ1wR3QAvb4RsVjS8oVoFjDGTc679wJYmUmknUF5HwMLOgb5O+a3KxfWapPQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/@nx/rspack/node_modules/merge-descriptors": {
			"version": "1.0.3",
			"resolved": "https://registry.npmjs.org/merge-descriptors/-/merge-descriptors-1.0.3.tgz",
			"integrity": "sha512-gaNvAS7TZ897/rVaZ0nMtAyxNyi/pdbjbAwUpFQpN70GqnVfOiXpeUUMKRBmzXaSQ8DdTX4/0ms62r2K+hE6mQ==",
			"dev": true,
			"license": "MIT",
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/@nx/rspack/node_modules/mime-db": {
			"version": "1.52.0",
			"resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.52.0.tgz",
			"integrity": "sha512-sPU4uV7dYlvtWJxwwxHD0PuihVNiE7TyAbQ5SWxDCB9mUYvOgroQOwYQQOKPJ8CIbE+1ETVlOoK1UC2nU3gYvg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/@nx/rspack/node_modules/mime-types": {
			"version": "2.1.35",
			"resolved": "https://registry.npmjs.org/mime-types/-/mime-types-2.1.35.tgz",
			"integrity": "sha512-ZDY+bPm5zTTF+YpCrAU9nK0UgICYPT0QtT1NZWFv4s++TNkcgVaT0g6+4R2uI4MjQjzysHB1zxuWL50hzaeXiw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"mime-db": "1.52.0"
			},
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/@nx/rspack/node_modules/negotiator": {
			"version": "0.6.3",
			"resolved": "https://registry.npmjs.org/negotiator/-/negotiator-0.6.3.tgz",
			"integrity": "sha512-+EUsqGPLsM+j/zdChZjsnX51g4XrHFOIXwfnCVPGlQk/k5giakcKsuxCObBRu6DSm9opw/O6slWbJdghQM4bBg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/@nx/rspack/node_modules/parse5": {
			"version": "4.0.0",
			"resolved": "https://registry.npmjs.org/parse5/-/parse5-4.0.0.tgz",
			"integrity": "sha512-VrZ7eOd3T1Fk4XWNXMgiGBK/z0MG48BWG2uQNU4I72fkQuKUTZpl+u9k+CxEG0twMVzSmXEEz12z5Fnw1jIQFA==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@nx/rspack/node_modules/path-to-regexp": {
			"version": "0.1.13",
			"resolved": "https://registry.npmjs.org/path-to-regexp/-/path-to-regexp-0.1.13.tgz",
			"integrity": "sha512-A/AGNMFN3c8bOlvV9RreMdrv7jsmF9XIfDeCd87+I8RNg6s78BhJxMu69NEMHBSJFxKidViTEdruRwEk/WIKqA==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@nx/rspack/node_modules/qs": {
			"version": "6.14.2",
			"resolved": "https://registry.npmjs.org/qs/-/qs-6.14.2.tgz",
			"integrity": "sha512-V/yCWTTF7VJ9hIh18Ugr2zhJMP01MY7c5kh4J870L7imm6/DIzBsNLTXzMwUA3yZ5b/KBqLx8Kp3uRvd7xSe3Q==",
			"dev": true,
			"license": "BSD-3-Clause",
			"dependencies": {
				"side-channel": "^1.1.0"
			},
			"engines": {
				"node": ">=0.6"
			},
			"funding": {
				"url": "https://github.com/sponsors/ljharb"
			}
		},
		"node_modules/@nx/rspack/node_modules/raw-body": {
			"version": "2.5.3",
			"resolved": "https://registry.npmjs.org/raw-body/-/raw-body-2.5.3.tgz",
			"integrity": "sha512-s4VSOf6yN0rvbRZGxs8Om5CWj6seneMwK3oDb4lWDH0UPhWcxwOWw5+qk24bxq87szX1ydrwylIOp2uG1ojUpA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"bytes": "~3.1.2",
				"http-errors": "~2.0.1",
				"iconv-lite": "~0.4.24",
				"unpipe": "~1.0.0"
			},
			"engines": {
				"node": ">= 0.8"
			}
		},
		"node_modules/@nx/rspack/node_modules/send": {
			"version": "0.19.2",
			"resolved": "https://registry.npmjs.org/send/-/send-0.19.2.tgz",
			"integrity": "sha512-VMbMxbDeehAxpOtWJXlcUS5E8iXh6QmN+BkRX1GARS3wRaXEEgzCcB10gTQazO42tpNIya8xIyNx8fll1OFPrg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"debug": "2.6.9",
				"depd": "2.0.0",
				"destroy": "1.2.0",
				"encodeurl": "~2.0.0",
				"escape-html": "~1.0.3",
				"etag": "~1.8.1",
				"fresh": "~0.5.2",
				"http-errors": "~2.0.1",
				"mime": "1.6.0",
				"ms": "2.1.3",
				"on-finished": "~2.4.1",
				"range-parser": "~1.2.1",
				"statuses": "~2.0.2"
			},
			"engines": {
				"node": ">= 0.8.0"
			}
		},
		"node_modules/@nx/rspack/node_modules/serve-static": {
			"version": "1.16.3",
			"resolved": "https://registry.npmjs.org/serve-static/-/serve-static-1.16.3.tgz",
			"integrity": "sha512-x0RTqQel6g5SY7Lg6ZreMmsOzncHFU7nhnRWkKgWuMTu5NN0DR5oruckMqRvacAN9d5w6ARnRBXl9xhDCgfMeA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"encodeurl": "~2.0.0",
				"escape-html": "~1.0.3",
				"parseurl": "~1.3.3",
				"send": "~0.19.1"
			},
			"engines": {
				"node": ">= 0.8.0"
			}
		},
		"node_modules/@nx/rspack/node_modules/type-is": {
			"version": "1.6.18",
			"resolved": "https://registry.npmjs.org/type-is/-/type-is-1.6.18.tgz",
			"integrity": "sha512-TkRKr9sUTxEH8MdfuCSP7VizJyzRNMjj2J2do2Jr3Kym598JVdEksuzPQCnlFPW4ky9Q+iA+ma9BGm06XQBy8g==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"media-typer": "0.3.0",
				"mime-types": "~2.1.24"
			},
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/@nx/web": {
			"version": "22.6.5",
			"resolved": "https://registry.npmjs.org/@nx/web/-/web-22.6.5.tgz",
			"integrity": "sha512-LjKPLWbgEI9FDIsMGqbW0tisVJfhme0EBi1kZfTi4cIu9Pna5nYkNBefD/d/DuK0ZrRqdONNjhRkCO3TcVbtIQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@nx/devkit": "22.6.5",
				"@nx/js": "22.6.5",
				"detect-port": "^1.5.1",
				"http-server": "^14.1.0",
				"picocolors": "^1.1.0",
				"tslib": "^2.3.0"
			}
		},
		"node_modules/@nx/webpack": {
			"version": "22.6.5",
			"resolved": "https://registry.npmjs.org/@nx/webpack/-/webpack-22.6.5.tgz",
			"integrity": "sha512-LN75xxd/6U/r8vI3nzs/N5sj22nrJdBhTfDPlYlhKz2caCCWImSvQSXmprU46xNbXuYAY0DmRcZ5fkeqjHegtw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/core": "^7.23.2",
				"@nx/devkit": "22.6.5",
				"@nx/js": "22.6.5",
				"@phenomnomnominal/tsquery": "~6.1.4",
				"ajv": "^8.12.0",
				"autoprefixer": "^10.4.9",
				"babel-loader": "^9.1.2",
				"browserslist": "^4.26.0",
				"copy-webpack-plugin": "^14.0.0",
				"css-loader": "^6.4.0",
				"css-minimizer-webpack-plugin": "^8.0.0",
				"fork-ts-checker-webpack-plugin": "9.1.0",
				"less": ">=4.1.3 <4.6.0",
				"less-loader": "^12.2.0",
				"license-webpack-plugin": "^4.0.2",
				"loader-utils": "^2.0.3",
				"mini-css-extract-plugin": "~2.4.7",
				"parse5": "4.0.0",
				"picocolors": "^1.1.0",
				"postcss": "^8.4.38",
				"postcss-import": "~14.1.0",
				"postcss-loader": "^8.2.1",
				"rxjs": "^7.8.0",
				"sass": "^1.85.0",
				"sass-embedded": "^1.83.4",
				"sass-loader": "^16.0.4",
				"source-map-loader": "^5.0.0",
				"style-loader": "^3.3.0",
				"terser-webpack-plugin": "^5.3.3",
				"ts-loader": "^9.3.1",
				"tsconfig-paths-webpack-plugin": "4.2.0",
				"tslib": "^2.3.0",
				"webpack": "^5.101.3",
				"webpack-dev-server": "^5.2.1",
				"webpack-node-externals": "^3.0.0",
				"webpack-subresource-integrity": "^5.1.0"
			}
		},
		"node_modules/@nx/webpack/node_modules/@phenomnomnominal/tsquery": {
			"version": "6.1.4",
			"resolved": "https://registry.npmjs.org/@phenomnomnominal/tsquery/-/tsquery-6.1.4.tgz",
			"integrity": "sha512-3tHlGy/fxjJCHqIV8nelAzbRTNkCUY+k7lqBGKNuQz99H2OKGRt6oU+U2SZs6LYrbOe8mxMFl6kq6gzHapFRkw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@types/esquery": "^1.5.0",
				"esquery": "^1.5.0"
			},
			"peerDependencies": {
				"typescript": "^3 || ^4 || ^5"
			}
		},
		"node_modules/@nx/webpack/node_modules/copy-anything": {
			"version": "2.0.6",
			"resolved": "https://registry.npmjs.org/copy-anything/-/copy-anything-2.0.6.tgz",
			"integrity": "sha512-1j20GZTsvKNkc4BY3NpMOM8tt///wY3FpIzozTOFO2ffuZcV61nojHXVKIy3WM+7ADCy5FVhdZYHYDdgTU0yJw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"is-what": "^3.14.1"
			},
			"funding": {
				"url": "https://github.com/sponsors/mesqueeb"
			}
		},
		"node_modules/@nx/webpack/node_modules/is-what": {
			"version": "3.14.1",
			"resolved": "https://registry.npmjs.org/is-what/-/is-what-3.14.1.tgz",
			"integrity": "sha512-sNxgpk9793nzSs7bA6JQJGeIuRBQhAaNGG77kzYQgMkrID+lS6SlK07K5LaptscDlSaIgH+GPFzf+d75FVxozA==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@nx/webpack/node_modules/less": {
			"version": "4.5.1",
			"resolved": "https://registry.npmjs.org/less/-/less-4.5.1.tgz",
			"integrity": "sha512-UKgI3/KON4u6ngSsnDADsUERqhZknsVZbnuzlRZXLQCmfC/MDld42fTydUE9B+Mla1AL6SJ/Pp6SlEFi/AVGfw==",
			"dev": true,
			"hasInstallScript": true,
			"license": "Apache-2.0",
			"dependencies": {
				"copy-anything": "^2.0.1",
				"parse-node-version": "^1.0.1",
				"tslib": "^2.3.0"
			},
			"bin": {
				"lessc": "bin/lessc"
			},
			"engines": {
				"node": ">=14"
			},
			"optionalDependencies": {
				"errno": "^0.1.1",
				"graceful-fs": "^4.1.2",
				"image-size": "~0.5.0",
				"make-dir": "^2.1.0",
				"mime": "^1.4.1",
				"needle": "^3.1.0",
				"source-map": "~0.6.0"
			}
		},
		"node_modules/@nx/webpack/node_modules/parse5": {
			"version": "4.0.0",
			"resolved": "https://registry.npmjs.org/parse5/-/parse5-4.0.0.tgz",
			"integrity": "sha512-VrZ7eOd3T1Fk4XWNXMgiGBK/z0MG48BWG2uQNU4I72fkQuKUTZpl+u9k+CxEG0twMVzSmXEEz12z5Fnw1jIQFA==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@nx/webpack/node_modules/source-map": {
			"version": "0.6.1",
			"resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
			"integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==",
			"dev": true,
			"license": "BSD-3-Clause",
			"optional": true,
			"engines": {
				"node": ">=0.10.0"
			}
		},
		"node_modules/@nx/workspace": {
			"version": "22.6.5",
			"resolved": "https://registry.npmjs.org/@nx/workspace/-/workspace-22.6.5.tgz",
			"integrity": "sha512-/CZtv1ESSfZ1MVqSlCsmnBWysU1z5VdNlwANlqL6BV2X6RUHKDPVj4YuNPvCK+0LsqyzfJdUt3pcnBYxnT5TIg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@nx/devkit": "22.6.5",
				"@zkochan/js-yaml": "0.0.7",
				"chalk": "^4.1.0",
				"enquirer": "~2.3.6",
				"nx": "22.6.5",
				"picomatch": "4.0.4",
				"semver": "^7.6.3",
				"tslib": "^2.3.0",
				"yargs-parser": "21.1.1"
			}
		},
		"node_modules/@nx/workspace/node_modules/ansi-styles": {
			"version": "4.3.0",
			"resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz",
			"integrity": "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"color-convert": "^2.0.1"
			},
			"engines": {
				"node": ">=8"
			},
			"funding": {
				"url": "https://github.com/chalk/ansi-styles?sponsor=1"
			}
		},
		"node_modules/@nx/workspace/node_modules/chalk": {
			"version": "4.1.2",
			"resolved": "https://registry.npmjs.org/chalk/-/chalk-4.1.2.tgz",
			"integrity": "sha512-oKnbhFyRIXpUuez8iBMmyEa4nbj4IOQyuhc/wy9kY7/WVPcwIO9VA668Pu8RkO7+0G76SLROeyw9CpQ061i4mA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ansi-styles": "^4.1.0",
				"supports-color": "^7.1.0"
			},
			"engines": {
				"node": ">=10"
			},
			"funding": {
				"url": "https://github.com/chalk/chalk?sponsor=1"
			}
		},
		"node_modules/@nx/workspace/node_modules/yargs-parser": {
			"version": "21.1.1",
			"resolved": "https://registry.npmjs.org/yargs-parser/-/yargs-parser-21.1.1.tgz",
			"integrity": "sha512-tVpsJW7DdjecAiFpbIB1e3qxIQsE6NoPc5/eTdrbbIC4h0LVsWhnoa3g+m2HclBIujHzsxZ4VJVA+GUuc2/LBw==",
			"dev": true,
			"license": "ISC",
			"engines": {
				"node": ">=12"
			}
		},
		"node_modules/@open-draft/deferred-promise": {
			"version": "2.2.0",
			"resolved": "https://registry.npmjs.org/@open-draft/deferred-promise/-/deferred-promise-2.2.0.tgz",
			"integrity": "sha512-CecwLWx3rhxVQF6V4bAgPS5t+So2sTbPgAzafKkVizyi7tlwpcFpdFqq+wqF2OwNBmqFuu6tOyouTuxgpMfzmA==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@open-draft/logger": {
			"version": "0.3.0",
			"resolved": "https://registry.npmjs.org/@open-draft/logger/-/logger-0.3.0.tgz",
			"integrity": "sha512-X2g45fzhxH238HKO4xbSr7+wBS8Fvw6ixhTDuvLd5mqh6bJJCFAPwU9mPDxbcrRtfxv4u5IHCEH77BmxvXmmxQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"is-node-process": "^1.2.0",
				"outvariant": "^1.4.0"
			}
		},
		"node_modules/@open-draft/until": {
			"version": "2.1.0",
			"resolved": "https://registry.npmjs.org/@open-draft/until/-/until-2.1.0.tgz",
			"integrity": "sha512-U69T3ItWHvLwGg5eJ0n3I62nWuE6ilHlmz7zM0npLBRvPRd7e6NYmg54vvRtP5mZG7kZqZCFVdsTWo7BPtBujg==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@oxc-project/types": {
			"version": "0.113.0",
			"resolved": "https://registry.npmjs.org/@oxc-project/types/-/types-0.113.0.tgz",
			"integrity": "sha512-Tp3XmgxwNQ9pEN9vxgJBAqdRamHibi76iowQ38O2I4PMpcvNRQNVsU2n1x1nv9yh0XoTrGFzf7cZSGxmixxrhA==",
			"dev": true,
			"license": "MIT",
			"funding": {
				"url": "https://github.com/sponsors/Boshen"
			}
		},
		"node_modules/@parcel/watcher": {
			"version": "2.5.6",
			"resolved": "https://registry.npmjs.org/@parcel/watcher/-/watcher-2.5.6.tgz",
			"integrity": "sha512-tmmZ3lQxAe/k/+rNnXQRawJ4NjxO2hqiOLTHvWchtGZULp4RyFeh6aU4XdOYBFe2KE1oShQTv4AblOs2iOrNnQ==",
			"dev": true,
			"hasInstallScript": true,
			"license": "MIT",
			"optional": true,
			"dependencies": {
				"detect-libc": "^2.0.3",
				"is-glob": "^4.0.3",
				"node-addon-api": "^7.0.0",
				"picomatch": "^4.0.3"
			},
			"engines": {
				"node": ">= 10.0.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/parcel"
			},
			"optionalDependencies": {
				"@parcel/watcher-android-arm64": "2.5.6",
				"@parcel/watcher-darwin-arm64": "2.5.6",
				"@parcel/watcher-darwin-x64": "2.5.6",
				"@parcel/watcher-freebsd-x64": "2.5.6",
				"@parcel/watcher-linux-arm-glibc": "2.5.6",
				"@parcel/watcher-linux-arm-musl": "2.5.6",
				"@parcel/watcher-linux-arm64-glibc": "2.5.6",
				"@parcel/watcher-linux-arm64-musl": "2.5.6",
				"@parcel/watcher-linux-x64-glibc": "2.5.6",
				"@parcel/watcher-linux-x64-musl": "2.5.6",
				"@parcel/watcher-win32-arm64": "2.5.6",
				"@parcel/watcher-win32-ia32": "2.5.6",
				"@parcel/watcher-win32-x64": "2.5.6"
			}
		},
		"node_modules/@parcel/watcher-android-arm64": {
			"version": "2.5.6",
			"resolved": "https://registry.npmjs.org/@parcel/watcher-android-arm64/-/watcher-android-arm64-2.5.6.tgz",
			"integrity": "sha512-YQxSS34tPF/6ZG7r/Ih9xy+kP/WwediEUsqmtf0cuCV5TPPKw/PQHRhueUo6JdeFJaqV3pyjm0GdYjZotbRt/A==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"android"
			],
			"engines": {
				"node": ">= 10.0.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/parcel"
			}
		},
		"node_modules/@parcel/watcher-darwin-arm64": {
			"version": "2.5.6",
			"resolved": "https://registry.npmjs.org/@parcel/watcher-darwin-arm64/-/watcher-darwin-arm64-2.5.6.tgz",
			"integrity": "sha512-Z2ZdrnwyXvvvdtRHLmM4knydIdU9adO3D4n/0cVipF3rRiwP+3/sfzpAwA/qKFL6i1ModaabkU7IbpeMBgiVEA==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"darwin"
			],
			"engines": {
				"node": ">= 10.0.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/parcel"
			}
		},
		"node_modules/@parcel/watcher-darwin-x64": {
			"version": "2.5.6",
			"resolved": "https://registry.npmjs.org/@parcel/watcher-darwin-x64/-/watcher-darwin-x64-2.5.6.tgz",
			"integrity": "sha512-HgvOf3W9dhithcwOWX9uDZyn1lW9R+7tPZ4sug+NGrGIo4Rk1hAXLEbcH1TQSqxts0NYXXlOWqVpvS1SFS4fRg==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"darwin"
			],
			"engines": {
				"node": ">= 10.0.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/parcel"
			}
		},
		"node_modules/@parcel/watcher-freebsd-x64": {
			"version": "2.5.6",
			"resolved": "https://registry.npmjs.org/@parcel/watcher-freebsd-x64/-/watcher-freebsd-x64-2.5.6.tgz",
			"integrity": "sha512-vJVi8yd/qzJxEKHkeemh7w3YAn6RJCtYlE4HPMoVnCpIXEzSrxErBW5SJBgKLbXU3WdIpkjBTeUNtyBVn8TRng==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"freebsd"
			],
			"engines": {
				"node": ">= 10.0.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/parcel"
			}
		},
		"node_modules/@parcel/watcher-linux-arm-glibc": {
			"version": "2.5.6",
			"resolved": "https://registry.npmjs.org/@parcel/watcher-linux-arm-glibc/-/watcher-linux-arm-glibc-2.5.6.tgz",
			"integrity": "sha512-9JiYfB6h6BgV50CCfasfLf/uvOcJskMSwcdH1PHH9rvS1IrNy8zad6IUVPVUfmXr+u+Km9IxcfMLzgdOudz9EQ==",
			"cpu": [
				"arm"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">= 10.0.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/parcel"
			}
		},
		"node_modules/@parcel/watcher-linux-arm-musl": {
			"version": "2.5.6",
			"resolved": "https://registry.npmjs.org/@parcel/watcher-linux-arm-musl/-/watcher-linux-arm-musl-2.5.6.tgz",
			"integrity": "sha512-Ve3gUCG57nuUUSyjBq/MAM0CzArtuIOxsBdQ+ftz6ho8n7s1i9E1Nmk/xmP323r2YL0SONs1EuwqBp2u1k5fxg==",
			"cpu": [
				"arm"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">= 10.0.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/parcel"
			}
		},
		"node_modules/@parcel/watcher-linux-arm64-glibc": {
			"version": "2.5.6",
			"resolved": "https://registry.npmjs.org/@parcel/watcher-linux-arm64-glibc/-/watcher-linux-arm64-glibc-2.5.6.tgz",
			"integrity": "sha512-f2g/DT3NhGPdBmMWYoxixqYr3v/UXcmLOYy16Bx0TM20Tchduwr4EaCbmxh1321TABqPGDpS8D/ggOTaljijOA==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">= 10.0.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/parcel"
			}
		},
		"node_modules/@parcel/watcher-linux-arm64-musl": {
			"version": "2.5.6",
			"resolved": "https://registry.npmjs.org/@parcel/watcher-linux-arm64-musl/-/watcher-linux-arm64-musl-2.5.6.tgz",
			"integrity": "sha512-qb6naMDGlbCwdhLj6hgoVKJl2odL34z2sqkC7Z6kzir8b5W65WYDpLB6R06KabvZdgoHI/zxke4b3zR0wAbDTA==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">= 10.0.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/parcel"
			}
		},
		"node_modules/@parcel/watcher-linux-x64-glibc": {
			"version": "2.5.6",
			"resolved": "https://registry.npmjs.org/@parcel/watcher-linux-x64-glibc/-/watcher-linux-x64-glibc-2.5.6.tgz",
			"integrity": "sha512-kbT5wvNQlx7NaGjzPFu8nVIW1rWqV780O7ZtkjuWaPUgpv2NMFpjYERVi0UYj1msZNyCzGlaCWEtzc+exjMGbQ==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">= 10.0.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/parcel"
			}
		},
		"node_modules/@parcel/watcher-linux-x64-musl": {
			"version": "2.5.6",
			"resolved": "https://registry.npmjs.org/@parcel/watcher-linux-x64-musl/-/watcher-linux-x64-musl-2.5.6.tgz",
			"integrity": "sha512-1JRFeC+h7RdXwldHzTsmdtYR/Ku8SylLgTU/reMuqdVD7CtLwf0VR1FqeprZ0eHQkO0vqsbvFLXUmYm/uNKJBg==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">= 10.0.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/parcel"
			}
		},
		"node_modules/@parcel/watcher-win32-arm64": {
			"version": "2.5.6",
			"resolved": "https://registry.npmjs.org/@parcel/watcher-win32-arm64/-/watcher-win32-arm64-2.5.6.tgz",
			"integrity": "sha512-3ukyebjc6eGlw9yRt678DxVF7rjXatWiHvTXqphZLvo7aC5NdEgFufVwjFfY51ijYEWpXbqF5jtrK275z52D4Q==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"win32"
			],
			"engines": {
				"node": ">= 10.0.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/parcel"
			}
		},
		"node_modules/@parcel/watcher-win32-ia32": {
			"version": "2.5.6",
			"resolved": "https://registry.npmjs.org/@parcel/watcher-win32-ia32/-/watcher-win32-ia32-2.5.6.tgz",
			"integrity": "sha512-k35yLp1ZMwwee3Ez/pxBi5cf4AoBKYXj00CZ80jUz5h8prpiaQsiRPKQMxoLstNuqe2vR4RNPEAEcjEFzhEz/g==",
			"cpu": [
				"ia32"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"win32"
			],
			"engines": {
				"node": ">= 10.0.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/parcel"
			}
		},
		"node_modules/@parcel/watcher-win32-x64": {
			"version": "2.5.6",
			"resolved": "https://registry.npmjs.org/@parcel/watcher-win32-x64/-/watcher-win32-x64-2.5.6.tgz",
			"integrity": "sha512-hbQlYcCq5dlAX9Qx+kFb0FHue6vbjlf0FrNzSKdYK2APUf7tGfGxQCk2ihEREmbR6ZMc0MVAD5RIX/41gpUzTw==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"win32"
			],
			"engines": {
				"node": ">= 10.0.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/parcel"
			}
		},
		"node_modules/@parcel/watcher/node_modules/node-addon-api": {
			"version": "7.1.1",
			"resolved": "https://registry.npmjs.org/node-addon-api/-/node-addon-api-7.1.1.tgz",
			"integrity": "sha512-5m3bsyrjFWE1xf7nz7YXdN4udnVtXK6/Yfgn5qnahL6bCkf2yKt4k3nuTKAtT4r3IG8JNR2ncsIMdZuAzJjHQQ==",
			"dev": true,
			"license": "MIT",
			"optional": true
		},
		"node_modules/@peculiar/asn1-cms": {
			"version": "2.6.1",
			"resolved": "https://registry.npmjs.org/@peculiar/asn1-cms/-/asn1-cms-2.6.1.tgz",
			"integrity": "sha512-vdG4fBF6Lkirkcl53q6eOdn3XYKt+kJTG59edgRZORlg/3atWWEReRCx5rYE1ZzTTX6vLK5zDMjHh7vbrcXGtw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@peculiar/asn1-schema": "^2.6.0",
				"@peculiar/asn1-x509": "^2.6.1",
				"@peculiar/asn1-x509-attr": "^2.6.1",
				"asn1js": "^3.0.6",
				"tslib": "^2.8.1"
			}
		},
		"node_modules/@peculiar/asn1-csr": {
			"version": "2.6.1",
			"resolved": "https://registry.npmjs.org/@peculiar/asn1-csr/-/asn1-csr-2.6.1.tgz",
			"integrity": "sha512-WRWnKfIocHyzFYQTka8O/tXCiBquAPSrRjXbOkHbO4qdmS6loffCEGs+rby6WxxGdJCuunnhS2duHURhjyio6w==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@peculiar/asn1-schema": "^2.6.0",
				"@peculiar/asn1-x509": "^2.6.1",
				"asn1js": "^3.0.6",
				"tslib": "^2.8.1"
			}
		},
		"node_modules/@peculiar/asn1-ecc": {
			"version": "2.6.1",
			"resolved": "https://registry.npmjs.org/@peculiar/asn1-ecc/-/asn1-ecc-2.6.1.tgz",
			"integrity": "sha512-+Vqw8WFxrtDIN5ehUdvlN2m73exS2JVG0UAyfVB31gIfor3zWEAQPD+K9ydCxaj3MLen9k0JhKpu9LqviuCE1g==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@peculiar/asn1-schema": "^2.6.0",
				"@peculiar/asn1-x509": "^2.6.1",
				"asn1js": "^3.0.6",
				"tslib": "^2.8.1"
			}
		},
		"node_modules/@peculiar/asn1-pfx": {
			"version": "2.6.1",
			"resolved": "https://registry.npmjs.org/@peculiar/asn1-pfx/-/asn1-pfx-2.6.1.tgz",
			"integrity": "sha512-nB5jVQy3MAAWvq0KY0R2JUZG8bO/bTLpnwyOzXyEh/e54ynGTatAR+csOnXkkVD9AFZ2uL8Z7EV918+qB1qDvw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@peculiar/asn1-cms": "^2.6.1",
				"@peculiar/asn1-pkcs8": "^2.6.1",
				"@peculiar/asn1-rsa": "^2.6.1",
				"@peculiar/asn1-schema": "^2.6.0",
				"asn1js": "^3.0.6",
				"tslib": "^2.8.1"
			}
		},
		"node_modules/@peculiar/asn1-pkcs8": {
			"version": "2.6.1",
			"resolved": "https://registry.npmjs.org/@peculiar/asn1-pkcs8/-/asn1-pkcs8-2.6.1.tgz",
			"integrity": "sha512-JB5iQ9Izn5yGMw3ZG4Nw3Xn/hb/G38GYF3lf7WmJb8JZUydhVGEjK/ZlFSWhnlB7K/4oqEs8HnfFIKklhR58Tw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@peculiar/asn1-schema": "^2.6.0",
				"@peculiar/asn1-x509": "^2.6.1",
				"asn1js": "^3.0.6",
				"tslib": "^2.8.1"
			}
		},
		"node_modules/@peculiar/asn1-pkcs9": {
			"version": "2.6.1",
			"resolved": "https://registry.npmjs.org/@peculiar/asn1-pkcs9/-/asn1-pkcs9-2.6.1.tgz",
			"integrity": "sha512-5EV8nZoMSxeWmcxWmmcolg22ojZRgJg+Y9MX2fnE2bGRo5KQLqV5IL9kdSQDZxlHz95tHvIq9F//bvL1OeNILw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@peculiar/asn1-cms": "^2.6.1",
				"@peculiar/asn1-pfx": "^2.6.1",
				"@peculiar/asn1-pkcs8": "^2.6.1",
				"@peculiar/asn1-schema": "^2.6.0",
				"@peculiar/asn1-x509": "^2.6.1",
				"@peculiar/asn1-x509-attr": "^2.6.1",
				"asn1js": "^3.0.6",
				"tslib": "^2.8.1"
			}
		},
		"node_modules/@peculiar/asn1-rsa": {
			"version": "2.6.1",
			"resolved": "https://registry.npmjs.org/@peculiar/asn1-rsa/-/asn1-rsa-2.6.1.tgz",
			"integrity": "sha512-1nVMEh46SElUt5CB3RUTV4EG/z7iYc7EoaDY5ECwganibQPkZ/Y2eMsTKB/LeyrUJ+W/tKoD9WUqIy8vB+CEdA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@peculiar/asn1-schema": "^2.6.0",
				"@peculiar/asn1-x509": "^2.6.1",
				"asn1js": "^3.0.6",
				"tslib": "^2.8.1"
			}
		},
		"node_modules/@peculiar/asn1-schema": {
			"version": "2.6.0",
			"resolved": "https://registry.npmjs.org/@peculiar/asn1-schema/-/asn1-schema-2.6.0.tgz",
			"integrity": "sha512-xNLYLBFTBKkCzEZIw842BxytQQATQv+lDTCEMZ8C196iJcJJMBUZxrhSTxLaohMyKK8QlzRNTRkUmanucnDSqg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"asn1js": "^3.0.6",
				"pvtsutils": "^1.3.6",
				"tslib": "^2.8.1"
			}
		},
		"node_modules/@peculiar/asn1-x509": {
			"version": "2.6.1",
			"resolved": "https://registry.npmjs.org/@peculiar/asn1-x509/-/asn1-x509-2.6.1.tgz",
			"integrity": "sha512-O9jT5F1A2+t3r7C4VT7LYGXqkGLK7Kj1xFpz7U0isPrubwU5PbDoyYtx6MiGst29yq7pXN5vZbQFKRCP+lLZlA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@peculiar/asn1-schema": "^2.6.0",
				"asn1js": "^3.0.6",
				"pvtsutils": "^1.3.6",
				"tslib": "^2.8.1"
			}
		},
		"node_modules/@peculiar/asn1-x509-attr": {
			"version": "2.6.1",
			"resolved": "https://registry.npmjs.org/@peculiar/asn1-x509-attr/-/asn1-x509-attr-2.6.1.tgz",
			"integrity": "sha512-tlW6cxoHwgcQghnJwv3YS+9OO1737zgPogZ+CgWRUK4roEwIPzRH4JEiG770xe5HX2ATfCpmX60gurfWIF9dcQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@peculiar/asn1-schema": "^2.6.0",
				"@peculiar/asn1-x509": "^2.6.1",
				"asn1js": "^3.0.6",
				"tslib": "^2.8.1"
			}
		},
		"node_modules/@peculiar/x509": {
			"version": "1.14.3",
			"resolved": "https://registry.npmjs.org/@peculiar/x509/-/x509-1.14.3.tgz",
			"integrity": "sha512-C2Xj8FZ0uHWeCXXqX5B4/gVFQmtSkiuOolzAgutjTfseNOHT3pUjljDZsTSxXFGgio54bCzVFqmEOUrIVk8RDA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@peculiar/asn1-cms": "^2.6.0",
				"@peculiar/asn1-csr": "^2.6.0",
				"@peculiar/asn1-ecc": "^2.6.0",
				"@peculiar/asn1-pkcs9": "^2.6.0",
				"@peculiar/asn1-rsa": "^2.6.0",
				"@peculiar/asn1-schema": "^2.6.0",
				"@peculiar/asn1-x509": "^2.6.0",
				"pvtsutils": "^1.3.6",
				"reflect-metadata": "^0.2.2",
				"tslib": "^2.8.1",
				"tsyringe": "^4.10.0"
			},
			"engines": {
				"node": ">=20.0.0"
			}
		},
		"node_modules/@pkgr/core": {
			"version": "0.2.9",
			"resolved": "https://registry.npmjs.org/@pkgr/core/-/core-0.2.9.tgz",
			"integrity": "sha512-QNqXyfVS2wm9hweSYD2O7F0G06uurj9kZ96TRQE5Y9hU7+tgdZwIkbAKc5Ocy1HxEY2kuDQa6cQ1WRs/O5LFKA==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": "^12.20.0 || ^14.18.0 || >=16.0.0"
			},
			"funding": {
				"url": "https://opencollective.com/pkgr"
			}
		},
		"node_modules/@rolldown/binding-android-arm64": {
			"version": "1.0.0-rc.4",
			"resolved": "https://registry.npmjs.org/@rolldown/binding-android-arm64/-/binding-android-arm64-1.0.0-rc.4.tgz",
			"integrity": "sha512-vRq9f4NzvbdZavhQbjkJBx7rRebDKYR9zHfO/Wg486+I7bSecdUapzCm5cyXoK+LHokTxgSq7A5baAXUZkIz0w==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"android"
			],
			"engines": {
				"node": "^20.19.0 || >=22.12.0"
			}
		},
		"node_modules/@rolldown/binding-darwin-arm64": {
			"version": "1.0.0-rc.4",
			"resolved": "https://registry.npmjs.org/@rolldown/binding-darwin-arm64/-/binding-darwin-arm64-1.0.0-rc.4.tgz",
			"integrity": "sha512-kFgEvkWLqt3YCgKB5re9RlIrx9bRsvyVUnaTakEpOPuLGzLpLapYxE9BufJNvPg8GjT6mB1alN4yN1NjzoeM8Q==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"darwin"
			],
			"engines": {
				"node": "^20.19.0 || >=22.12.0"
			}
		},
		"node_modules/@rolldown/binding-darwin-x64": {
			"version": "1.0.0-rc.4",
			"resolved": "https://registry.npmjs.org/@rolldown/binding-darwin-x64/-/binding-darwin-x64-1.0.0-rc.4.tgz",
			"integrity": "sha512-JXmaOJGsL/+rsmMfutcDjxWM2fTaVgCHGoXS7nE8Z3c9NAYjGqHvXrAhMUZvMpHS/k7Mg+X7n/MVKb7NYWKKww==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"darwin"
			],
			"engines": {
				"node": "^20.19.0 || >=22.12.0"
			}
		},
		"node_modules/@rolldown/binding-freebsd-x64": {
			"version": "1.0.0-rc.4",
			"resolved": "https://registry.npmjs.org/@rolldown/binding-freebsd-x64/-/binding-freebsd-x64-1.0.0-rc.4.tgz",
			"integrity": "sha512-ep3Catd6sPnHTM0P4hNEvIv5arnDvk01PfyJIJ+J3wVCG1eEaPo09tvFqdtcaTrkwQy0VWR24uz+cb4IsK53Qw==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"freebsd"
			],
			"engines": {
				"node": "^20.19.0 || >=22.12.0"
			}
		},
		"node_modules/@rolldown/binding-linux-arm-gnueabihf": {
			"version": "1.0.0-rc.4",
			"resolved": "https://registry.npmjs.org/@rolldown/binding-linux-arm-gnueabihf/-/binding-linux-arm-gnueabihf-1.0.0-rc.4.tgz",
			"integrity": "sha512-LwA5ayKIpnsgXJEwWc3h8wPiS33NMIHd9BhsV92T8VetVAbGe2qXlJwNVDGHN5cOQ22R9uYvbrQir2AB+ntT2w==",
			"cpu": [
				"arm"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": "^20.19.0 || >=22.12.0"
			}
		},
		"node_modules/@rolldown/binding-linux-arm64-gnu": {
			"version": "1.0.0-rc.4",
			"resolved": "https://registry.npmjs.org/@rolldown/binding-linux-arm64-gnu/-/binding-linux-arm64-gnu-1.0.0-rc.4.tgz",
			"integrity": "sha512-AC1WsGdlV1MtGay/OQ4J9T7GRadVnpYRzTcygV1hKnypbYN20Yh4t6O1Sa2qRBMqv1etulUknqXjc3CTIsBu6A==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": "^20.19.0 || >=22.12.0"
			}
		},
		"node_modules/@rolldown/binding-linux-arm64-musl": {
			"version": "1.0.0-rc.4",
			"resolved": "https://registry.npmjs.org/@rolldown/binding-linux-arm64-musl/-/binding-linux-arm64-musl-1.0.0-rc.4.tgz",
			"integrity": "sha512-lU+6rgXXViO61B4EudxtVMXSOfiZONR29Sys5VGSetUY7X8mg9FCKIIjcPPj8xNDeYzKl+H8F/qSKOBVFJChCQ==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": "^20.19.0 || >=22.12.0"
			}
		},
		"node_modules/@rolldown/binding-linux-x64-gnu": {
			"version": "1.0.0-rc.4",
			"resolved": "https://registry.npmjs.org/@rolldown/binding-linux-x64-gnu/-/binding-linux-x64-gnu-1.0.0-rc.4.tgz",
			"integrity": "sha512-DZaN1f0PGp/bSvKhtw50pPsnln4T13ycDq1FrDWRiHmWt1JeW+UtYg9touPFf8yt993p8tS2QjybpzKNTxYEwg==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": "^20.19.0 || >=22.12.0"
			}
		},
		"node_modules/@rolldown/binding-linux-x64-musl": {
			"version": "1.0.0-rc.4",
			"resolved": "https://registry.npmjs.org/@rolldown/binding-linux-x64-musl/-/binding-linux-x64-musl-1.0.0-rc.4.tgz",
			"integrity": "sha512-RnGxwZLN7fhMMAItnD6dZ7lvy+TI7ba+2V54UF4dhaWa/p8I/ys1E73KO6HmPmgz92ZkfD8TXS1IMV8+uhbR9g==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": "^20.19.0 || >=22.12.0"
			}
		},
		"node_modules/@rolldown/binding-openharmony-arm64": {
			"version": "1.0.0-rc.4",
			"resolved": "https://registry.npmjs.org/@rolldown/binding-openharmony-arm64/-/binding-openharmony-arm64-1.0.0-rc.4.tgz",
			"integrity": "sha512-6lcI79+X8klGiGd8yHuTgQRjuuJYNggmEml+RsyN596P23l/zf9FVmJ7K0KVKkFAeYEdg0iMUKyIxiV5vebDNQ==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"openharmony"
			],
			"engines": {
				"node": "^20.19.0 || >=22.12.0"
			}
		},
		"node_modules/@rolldown/binding-wasm32-wasi": {
			"version": "1.0.0-rc.4",
			"resolved": "https://registry.npmjs.org/@rolldown/binding-wasm32-wasi/-/binding-wasm32-wasi-1.0.0-rc.4.tgz",
			"integrity": "sha512-wz7ohsKCAIWy91blZ/1FlpPdqrsm1xpcEOQVveWoL6+aSPKL4VUcoYmmzuLTssyZxRpEwzuIxL/GDsvpjaBtOw==",
			"cpu": [
				"wasm32"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"dependencies": {
				"@napi-rs/wasm-runtime": "^1.1.1"
			},
			"engines": {
				"node": ">=14.0.0"
			}
		},
		"node_modules/@rolldown/binding-win32-arm64-msvc": {
			"version": "1.0.0-rc.4",
			"resolved": "https://registry.npmjs.org/@rolldown/binding-win32-arm64-msvc/-/binding-win32-arm64-msvc-1.0.0-rc.4.tgz",
			"integrity": "sha512-cfiMrfuWCIgsFmcVG0IPuO6qTRHvF7NuG3wngX1RZzc6dU8FuBFb+J3MIR5WrdTNozlumfgL4cvz+R4ozBCvsQ==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"win32"
			],
			"engines": {
				"node": "^20.19.0 || >=22.12.0"
			}
		},
		"node_modules/@rolldown/binding-win32-x64-msvc": {
			"version": "1.0.0-rc.4",
			"resolved": "https://registry.npmjs.org/@rolldown/binding-win32-x64-msvc/-/binding-win32-x64-msvc-1.0.0-rc.4.tgz",
			"integrity": "sha512-p6UeR9y7ht82AH57qwGuFYn69S6CZ7LLKdCKy/8T3zS9VTrJei2/CGsTUV45Da4Z9Rbhc7G4gyWQ/Ioamqn09g==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"win32"
			],
			"engines": {
				"node": "^20.19.0 || >=22.12.0"
			}
		},
		"node_modules/@rolldown/pluginutils": {
			"version": "1.0.0-rc.4",
			"resolved": "https://registry.npmjs.org/@rolldown/pluginutils/-/pluginutils-1.0.0-rc.4.tgz",
			"integrity": "sha512-1BrrmTu0TWfOP1riA8uakjFc9bpIUGzVKETsOtzY39pPga8zELGDl8eu1Dx7/gjM5CAz14UknsUMpBO8L+YntQ==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@rollup/rollup-android-arm-eabi": {
			"version": "4.60.1",
			"resolved": "https://registry.npmjs.org/@rollup/rollup-android-arm-eabi/-/rollup-android-arm-eabi-4.60.1.tgz",
			"integrity": "sha512-d6FinEBLdIiK+1uACUttJKfgZREXrF0Qc2SmLII7W2AD8FfiZ9Wjd+rD/iRuf5s5dWrr1GgwXCvPqOuDquOowA==",
			"cpu": [
				"arm"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"android"
			]
		},
		"node_modules/@rollup/rollup-android-arm64": {
			"version": "4.60.1",
			"resolved": "https://registry.npmjs.org/@rollup/rollup-android-arm64/-/rollup-android-arm64-4.60.1.tgz",
			"integrity": "sha512-YjG/EwIDvvYI1YvYbHvDz/BYHtkY4ygUIXHnTdLhG+hKIQFBiosfWiACWortsKPKU/+dUwQQCKQM3qrDe8c9BA==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"android"
			]
		},
		"node_modules/@rollup/rollup-darwin-arm64": {
			"version": "4.60.1",
			"resolved": "https://registry.npmjs.org/@rollup/rollup-darwin-arm64/-/rollup-darwin-arm64-4.60.1.tgz",
			"integrity": "sha512-mjCpF7GmkRtSJwon+Rq1N8+pI+8l7w5g9Z3vWj4T7abguC4Czwi3Yu/pFaLvA3TTeMVjnu3ctigusqWUfjZzvw==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"darwin"
			]
		},
		"node_modules/@rollup/rollup-darwin-x64": {
			"version": "4.60.1",
			"resolved": "https://registry.npmjs.org/@rollup/rollup-darwin-x64/-/rollup-darwin-x64-4.60.1.tgz",
			"integrity": "sha512-haZ7hJ1JT4e9hqkoT9R/19XW2QKqjfJVv+i5AGg57S+nLk9lQnJ1F/eZloRO3o9Scy9CM3wQ9l+dkXtcBgN5Ew==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"darwin"
			]
		},
		"node_modules/@rollup/rollup-freebsd-arm64": {
			"version": "4.60.1",
			"resolved": "https://registry.npmjs.org/@rollup/rollup-freebsd-arm64/-/rollup-freebsd-arm64-4.60.1.tgz",
			"integrity": "sha512-czw90wpQq3ZsAVBlinZjAYTKduOjTywlG7fEeWKUA7oCmpA8xdTkxZZlwNJKWqILlq0wehoZcJYfBvOyhPTQ6w==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"freebsd"
			]
		},
		"node_modules/@rollup/rollup-freebsd-x64": {
			"version": "4.60.1",
			"resolved": "https://registry.npmjs.org/@rollup/rollup-freebsd-x64/-/rollup-freebsd-x64-4.60.1.tgz",
			"integrity": "sha512-KVB2rqsxTHuBtfOeySEyzEOB7ltlB/ux38iu2rBQzkjbwRVlkhAGIEDiiYnO2kFOkJp+Z7pUXKyrRRFuFUKt+g==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"freebsd"
			]
		},
		"node_modules/@rollup/rollup-linux-arm-gnueabihf": {
			"version": "4.60.1",
			"resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm-gnueabihf/-/rollup-linux-arm-gnueabihf-4.60.1.tgz",
			"integrity": "sha512-L+34Qqil+v5uC0zEubW7uByo78WOCIrBvci69E7sFASRl0X7b/MB6Cqd1lky/CtcSVTydWa2WZwFuWexjS5o6g==",
			"cpu": [
				"arm"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			]
		},
		"node_modules/@rollup/rollup-linux-arm-musleabihf": {
			"version": "4.60.1",
			"resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm-musleabihf/-/rollup-linux-arm-musleabihf-4.60.1.tgz",
			"integrity": "sha512-n83O8rt4v34hgFzlkb1ycniJh7IR5RCIqt6mz1VRJD6pmhRi0CXdmfnLu9dIUS6buzh60IvACM842Ffb3xd6Gg==",
			"cpu": [
				"arm"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			]
		},
		"node_modules/@rollup/rollup-linux-arm64-gnu": {
			"version": "4.60.1",
			"resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm64-gnu/-/rollup-linux-arm64-gnu-4.60.1.tgz",
			"integrity": "sha512-Nql7sTeAzhTAja3QXeAI48+/+GjBJ+QmAH13snn0AJSNL50JsDqotyudHyMbO2RbJkskbMbFJfIJKWA6R1LCJQ==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			]
		},
		"node_modules/@rollup/rollup-linux-arm64-musl": {
			"version": "4.60.1",
			"resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm64-musl/-/rollup-linux-arm64-musl-4.60.1.tgz",
			"integrity": "sha512-+pUymDhd0ys9GcKZPPWlFiZ67sTWV5UU6zOJat02M1+PiuSGDziyRuI/pPue3hoUwm2uGfxdL+trT6Z9rxnlMA==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			]
		},
		"node_modules/@rollup/rollup-linux-loong64-gnu": {
			"version": "4.60.1",
			"resolved": "https://registry.npmjs.org/@rollup/rollup-linux-loong64-gnu/-/rollup-linux-loong64-gnu-4.60.1.tgz",
			"integrity": "sha512-VSvgvQeIcsEvY4bKDHEDWcpW4Yw7BtlKG1GUT4FzBUlEKQK0rWHYBqQt6Fm2taXS+1bXvJT6kICu5ZwqKCnvlQ==",
			"cpu": [
				"loong64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			]
		},
		"node_modules/@rollup/rollup-linux-loong64-musl": {
			"version": "4.60.1",
			"resolved": "https://registry.npmjs.org/@rollup/rollup-linux-loong64-musl/-/rollup-linux-loong64-musl-4.60.1.tgz",
			"integrity": "sha512-4LqhUomJqwe641gsPp6xLfhqWMbQV04KtPp7/dIp0nzPxAkNY1AbwL5W0MQpcalLYk07vaW9Kp1PBhdpZYYcEw==",
			"cpu": [
				"loong64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			]
		},
		"node_modules/@rollup/rollup-linux-ppc64-gnu": {
			"version": "4.60.1",
			"resolved": "https://registry.npmjs.org/@rollup/rollup-linux-ppc64-gnu/-/rollup-linux-ppc64-gnu-4.60.1.tgz",
			"integrity": "sha512-tLQQ9aPvkBxOc/EUT6j3pyeMD6Hb8QF2BTBnCQWP/uu1lhc9AIrIjKnLYMEroIz/JvtGYgI9dF3AxHZNaEH0rw==",
			"cpu": [
				"ppc64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			]
		},
		"node_modules/@rollup/rollup-linux-ppc64-musl": {
			"version": "4.60.1",
			"resolved": "https://registry.npmjs.org/@rollup/rollup-linux-ppc64-musl/-/rollup-linux-ppc64-musl-4.60.1.tgz",
			"integrity": "sha512-RMxFhJwc9fSXP6PqmAz4cbv3kAyvD1etJFjTx4ONqFP9DkTkXsAMU4v3Vyc5BgzC+anz7nS/9tp4obsKfqkDHg==",
			"cpu": [
				"ppc64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			]
		},
		"node_modules/@rollup/rollup-linux-riscv64-gnu": {
			"version": "4.60.1",
			"resolved": "https://registry.npmjs.org/@rollup/rollup-linux-riscv64-gnu/-/rollup-linux-riscv64-gnu-4.60.1.tgz",
			"integrity": "sha512-QKgFl+Yc1eEk6MmOBfRHYF6lTxiiiV3/z/BRrbSiW2I7AFTXoBFvdMEyglohPj//2mZS4hDOqeB0H1ACh3sBbg==",
			"cpu": [
				"riscv64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			]
		},
		"node_modules/@rollup/rollup-linux-riscv64-musl": {
			"version": "4.60.1",
			"resolved": "https://registry.npmjs.org/@rollup/rollup-linux-riscv64-musl/-/rollup-linux-riscv64-musl-4.60.1.tgz",
			"integrity": "sha512-RAjXjP/8c6ZtzatZcA1RaQr6O1TRhzC+adn8YZDnChliZHviqIjmvFwHcxi4JKPSDAt6Uhf/7vqcBzQJy0PDJg==",
			"cpu": [
				"riscv64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			]
		},
		"node_modules/@rollup/rollup-linux-s390x-gnu": {
			"version": "4.60.1",
			"resolved": "https://registry.npmjs.org/@rollup/rollup-linux-s390x-gnu/-/rollup-linux-s390x-gnu-4.60.1.tgz",
			"integrity": "sha512-wcuocpaOlaL1COBYiA89O6yfjlp3RwKDeTIA0hM7OpmhR1Bjo9j31G1uQVpDlTvwxGn2nQs65fBFL5UFd76FcQ==",
			"cpu": [
				"s390x"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			]
		},
		"node_modules/@rollup/rollup-linux-x64-gnu": {
			"version": "4.60.1",
			"resolved": "https://registry.npmjs.org/@rollup/rollup-linux-x64-gnu/-/rollup-linux-x64-gnu-4.60.1.tgz",
			"integrity": "sha512-77PpsFQUCOiZR9+LQEFg9GClyfkNXj1MP6wRnzYs0EeWbPcHs02AXu4xuUbM1zhwn3wqaizle3AEYg5aeoohhg==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			]
		},
		"node_modules/@rollup/rollup-linux-x64-musl": {
			"version": "4.60.1",
			"resolved": "https://registry.npmjs.org/@rollup/rollup-linux-x64-musl/-/rollup-linux-x64-musl-4.60.1.tgz",
			"integrity": "sha512-5cIATbk5vynAjqqmyBjlciMJl1+R/CwX9oLk/EyiFXDWd95KpHdrOJT//rnUl4cUcskrd0jCCw3wpZnhIHdD9w==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			]
		},
		"node_modules/@rollup/rollup-openbsd-x64": {
			"version": "4.60.1",
			"resolved": "https://registry.npmjs.org/@rollup/rollup-openbsd-x64/-/rollup-openbsd-x64-4.60.1.tgz",
			"integrity": "sha512-cl0w09WsCi17mcmWqqglez9Gk8isgeWvoUZ3WiJFYSR3zjBQc2J5/ihSjpl+VLjPqjQ/1hJRcqBfLjssREQILw==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"openbsd"
			]
		},
		"node_modules/@rollup/rollup-openharmony-arm64": {
			"version": "4.60.1",
			"resolved": "https://registry.npmjs.org/@rollup/rollup-openharmony-arm64/-/rollup-openharmony-arm64-4.60.1.tgz",
			"integrity": "sha512-4Cv23ZrONRbNtbZa37mLSueXUCtN7MXccChtKpUnQNgF010rjrjfHx3QxkS2PI7LqGT5xXyYs1a7LbzAwT0iCA==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"openharmony"
			]
		},
		"node_modules/@rollup/rollup-win32-arm64-msvc": {
			"version": "4.60.1",
			"resolved": "https://registry.npmjs.org/@rollup/rollup-win32-arm64-msvc/-/rollup-win32-arm64-msvc-4.60.1.tgz",
			"integrity": "sha512-i1okWYkA4FJICtr7KpYzFpRTHgy5jdDbZiWfvny21iIKky5YExiDXP+zbXzm3dUcFpkEeYNHgQ5fuG236JPq0g==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"win32"
			]
		},
		"node_modules/@rollup/rollup-win32-ia32-msvc": {
			"version": "4.60.1",
			"resolved": "https://registry.npmjs.org/@rollup/rollup-win32-ia32-msvc/-/rollup-win32-ia32-msvc-4.60.1.tgz",
			"integrity": "sha512-u09m3CuwLzShA0EYKMNiFgcjjzwqtUMLmuCJLeZWjjOYA3IT2Di09KaxGBTP9xVztWyIWjVdsB2E9goMjZvTQg==",
			"cpu": [
				"ia32"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"win32"
			]
		},
		"node_modules/@rollup/rollup-win32-x64-gnu": {
			"version": "4.60.1",
			"resolved": "https://registry.npmjs.org/@rollup/rollup-win32-x64-gnu/-/rollup-win32-x64-gnu-4.60.1.tgz",
			"integrity": "sha512-k+600V9Zl1CM7eZxJgMyTUzmrmhB/0XZnF4pRypKAlAgxmedUA+1v9R+XOFv56W4SlHEzfeMtzujLJD22Uz5zg==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"win32"
			]
		},
		"node_modules/@rollup/rollup-win32-x64-msvc": {
			"version": "4.60.1",
			"resolved": "https://registry.npmjs.org/@rollup/rollup-win32-x64-msvc/-/rollup-win32-x64-msvc-4.60.1.tgz",
			"integrity": "sha512-lWMnixq/QzxyhTV6NjQJ4SFo1J6PvOX8vUx5Wb4bBPsEb+8xZ89Bz6kOXpfXj9ak9AHTQVQzlgzBEc1SyM27xQ==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"win32"
			]
		},
		"node_modules/@rspack/binding": {
			"version": "1.6.8",
			"resolved": "https://registry.npmjs.org/@rspack/binding/-/binding-1.6.8.tgz",
			"integrity": "sha512-lUeL4mbwGo+nqRKqFDCm9vH2jv9FNMVt1X8jqayWRcOCPlj/2UVMEFgqjR7Pp2vlvnTKq//31KbDBJmDZq31RQ==",
			"dev": true,
			"license": "MIT",
			"optionalDependencies": {
				"@rspack/binding-darwin-arm64": "1.6.8",
				"@rspack/binding-darwin-x64": "1.6.8",
				"@rspack/binding-linux-arm64-gnu": "1.6.8",
				"@rspack/binding-linux-arm64-musl": "1.6.8",
				"@rspack/binding-linux-x64-gnu": "1.6.8",
				"@rspack/binding-linux-x64-musl": "1.6.8",
				"@rspack/binding-wasm32-wasi": "1.6.8",
				"@rspack/binding-win32-arm64-msvc": "1.6.8",
				"@rspack/binding-win32-ia32-msvc": "1.6.8",
				"@rspack/binding-win32-x64-msvc": "1.6.8"
			}
		},
		"node_modules/@rspack/binding-darwin-arm64": {
			"version": "1.6.8",
			"resolved": "https://registry.npmjs.org/@rspack/binding-darwin-arm64/-/binding-darwin-arm64-1.6.8.tgz",
			"integrity": "sha512-e8CTQtzaeGnf+BIzR7wRMUwKfIg0jd/sxMRc1Vd0bCMHBhSN9EsGoMuJJaKeRrSmy2nwMCNWHIG+TvT1CEKg+A==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"darwin"
			]
		},
		"node_modules/@rspack/binding-darwin-x64": {
			"version": "1.6.8",
			"resolved": "https://registry.npmjs.org/@rspack/binding-darwin-x64/-/binding-darwin-x64-1.6.8.tgz",
			"integrity": "sha512-ku1XpTEPt6Za11zhpFWhfwrTQogcgi9RJrOUVC4FESiPO9aKyd4hJ+JiPgLY0MZOqsptK6vEAgOip+uDVXrCpg==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"darwin"
			]
		},
		"node_modules/@rspack/binding-linux-arm64-gnu": {
			"version": "1.6.8",
			"resolved": "https://registry.npmjs.org/@rspack/binding-linux-arm64-gnu/-/binding-linux-arm64-gnu-1.6.8.tgz",
			"integrity": "sha512-fvZX6xZPvBT8qipSpvkKMX5M7yd2BSpZNCZXcefw6gA3uC7LI3gu+er0LrDXY1PtPzVuHTyDx+abwWpagV3PiQ==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			]
		},
		"node_modules/@rspack/binding-linux-arm64-musl": {
			"version": "1.6.8",
			"resolved": "https://registry.npmjs.org/@rspack/binding-linux-arm64-musl/-/binding-linux-arm64-musl-1.6.8.tgz",
			"integrity": "sha512-++XMKcMNrt59HcFBLnRaJcn70k3X0GwkAegZBVpel8xYIAgvoXT5+L8P1ExId/yTFxqedaz8DbcxQnNmMozviw==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			]
		},
		"node_modules/@rspack/binding-linux-x64-gnu": {
			"version": "1.6.8",
			"resolved": "https://registry.npmjs.org/@rspack/binding-linux-x64-gnu/-/binding-linux-x64-gnu-1.6.8.tgz",
			"integrity": "sha512-tv3BWkTE1TndfX+DsE1rSTg8fBevCxujNZ3MlfZ22Wfy9x1FMXTJlWG8VIOXmaaJ1wUHzv8S7cE2YUUJ2LuiCg==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			]
		},
		"node_modules/@rspack/binding-linux-x64-musl": {
			"version": "1.6.8",
			"resolved": "https://registry.npmjs.org/@rspack/binding-linux-x64-musl/-/binding-linux-x64-musl-1.6.8.tgz",
			"integrity": "sha512-DCGgZ5/in1O3FjHWqXnDsncRy+48cMhfuUAAUyl0yDj1NpsZu9pP+xfGLvGcQTiYrVl7IH9Aojf1eShP/77WGA==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			]
		},
		"node_modules/@rspack/binding-wasm32-wasi": {
			"version": "1.6.8",
			"resolved": "https://registry.npmjs.org/@rspack/binding-wasm32-wasi/-/binding-wasm32-wasi-1.6.8.tgz",
			"integrity": "sha512-VUwdhl/lI4m6o1OGCZ9JwtMjTV/yLY5VZTQdEPKb40JMTlmZ5MBlr5xk7ByaXXYHr6I+qnqEm73iMKQvg6iknw==",
			"cpu": [
				"wasm32"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"dependencies": {
				"@napi-rs/wasm-runtime": "1.0.7"
			}
		},
		"node_modules/@rspack/binding-wasm32-wasi/node_modules/@napi-rs/wasm-runtime": {
			"version": "1.0.7",
			"resolved": "https://registry.npmjs.org/@napi-rs/wasm-runtime/-/wasm-runtime-1.0.7.tgz",
			"integrity": "sha512-SeDnOO0Tk7Okiq6DbXmmBODgOAb9dp9gjlphokTUxmt8U3liIP1ZsozBahH69j/RJv+Rfs6IwUKHTgQYJ/HBAw==",
			"dev": true,
			"license": "MIT",
			"optional": true,
			"dependencies": {
				"@emnapi/core": "^1.5.0",
				"@emnapi/runtime": "^1.5.0",
				"@tybys/wasm-util": "^0.10.1"
			}
		},
		"node_modules/@rspack/binding-win32-arm64-msvc": {
			"version": "1.6.8",
			"resolved": "https://registry.npmjs.org/@rspack/binding-win32-arm64-msvc/-/binding-win32-arm64-msvc-1.6.8.tgz",
			"integrity": "sha512-23YX7zlOZlub+nPGDBUzktb4D5D6ETUAluKjXEeHIZ9m7fSlEYBnGL66YE+3t1DHXGd0OqsdwlvrNGcyo6EXDQ==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"win32"
			]
		},
		"node_modules/@rspack/binding-win32-ia32-msvc": {
			"version": "1.6.8",
			"resolved": "https://registry.npmjs.org/@rspack/binding-win32-ia32-msvc/-/binding-win32-ia32-msvc-1.6.8.tgz",
			"integrity": "sha512-cFgRE3APxrY4AEdooVk2LtipwNNT/9mrnjdC5lVbsIsz+SxvGbZR231bxDJEqP15+RJOaD07FO1sIjINFqXMEg==",
			"cpu": [
				"ia32"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"win32"
			]
		},
		"node_modules/@rspack/binding-win32-x64-msvc": {
			"version": "1.6.8",
			"resolved": "https://registry.npmjs.org/@rspack/binding-win32-x64-msvc/-/binding-win32-x64-msvc-1.6.8.tgz",
			"integrity": "sha512-cIuhVsZYd3o3Neo1JSAhJYw6BDvlxaBoqvgwRkG1rs0ExFmEmgYyG7ip9pFKnKNWph/tmW3rDYypmEfjs1is7g==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"win32"
			]
		},
		"node_modules/@rspack/core": {
			"version": "1.6.8",
			"resolved": "https://registry.npmjs.org/@rspack/core/-/core-1.6.8.tgz",
			"integrity": "sha512-FolcIAH5FW4J2FET+qwjd1kNeFbCkd0VLuIHO0thyolEjaPSxw5qxG67DA7BZGm6PVcoiSgPLks1DL6eZ8c+fA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@module-federation/runtime-tools": "0.21.6",
				"@rspack/binding": "1.6.8",
				"@rspack/lite-tapable": "1.1.0"
			},
			"engines": {
				"node": ">=18.12.0"
			},
			"peerDependencies": {
				"@swc/helpers": ">=0.5.1"
			},
			"peerDependenciesMeta": {
				"@swc/helpers": {
					"optional": true
				}
			}
		},
		"node_modules/@rspack/core/node_modules/@module-federation/error-codes": {
			"version": "0.21.6",
			"resolved": "https://registry.npmjs.org/@module-federation/error-codes/-/error-codes-0.21.6.tgz",
			"integrity": "sha512-MLJUCQ05KnoVl8xd6xs9a5g2/8U+eWmVxg7xiBMeR0+7OjdWUbHwcwgVFatRIwSZvFgKHfWEiI7wsU1q1XbTRQ==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@rspack/core/node_modules/@module-federation/runtime": {
			"version": "0.21.6",
			"resolved": "https://registry.npmjs.org/@module-federation/runtime/-/runtime-0.21.6.tgz",
			"integrity": "sha512-+caXwaQqwTNh+CQqyb4mZmXq7iEemRDrTZQGD+zyeH454JAYnJ3s/3oDFizdH6245pk+NiqDyOOkHzzFQorKhQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@module-federation/error-codes": "0.21.6",
				"@module-federation/runtime-core": "0.21.6",
				"@module-federation/sdk": "0.21.6"
			}
		},
		"node_modules/@rspack/core/node_modules/@module-federation/runtime-core": {
			"version": "0.21.6",
			"resolved": "https://registry.npmjs.org/@module-federation/runtime-core/-/runtime-core-0.21.6.tgz",
			"integrity": "sha512-5Hd1Y5qp5lU/aTiK66lidMlM/4ji2gr3EXAtJdreJzkY+bKcI5+21GRcliZ4RAkICmvdxQU5PHPL71XmNc7Lsw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@module-federation/error-codes": "0.21.6",
				"@module-federation/sdk": "0.21.6"
			}
		},
		"node_modules/@rspack/core/node_modules/@module-federation/runtime-tools": {
			"version": "0.21.6",
			"resolved": "https://registry.npmjs.org/@module-federation/runtime-tools/-/runtime-tools-0.21.6.tgz",
			"integrity": "sha512-fnP+ZOZTFeBGiTAnxve+axGmiYn2D60h86nUISXjXClK3LUY1krUfPgf6MaD4YDJ4i51OGXZWPekeMe16pkd8Q==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@module-federation/runtime": "0.21.6",
				"@module-federation/webpack-bundler-runtime": "0.21.6"
			}
		},
		"node_modules/@rspack/core/node_modules/@module-federation/sdk": {
			"version": "0.21.6",
			"resolved": "https://registry.npmjs.org/@module-federation/sdk/-/sdk-0.21.6.tgz",
			"integrity": "sha512-x6hARETb8iqHVhEsQBysuWpznNZViUh84qV2yE7AD+g7uIzHKiYdoWqj10posbo5XKf/147qgWDzKZoKoEP2dw==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@rspack/core/node_modules/@module-federation/webpack-bundler-runtime": {
			"version": "0.21.6",
			"resolved": "https://registry.npmjs.org/@module-federation/webpack-bundler-runtime/-/webpack-bundler-runtime-0.21.6.tgz",
			"integrity": "sha512-7zIp3LrcWbhGuFDTUMLJ2FJvcwjlddqhWGxi/MW3ur1a+HaO8v5tF2nl+vElKmbG1DFLU/52l3PElVcWf/YcsQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@module-federation/runtime": "0.21.6",
				"@module-federation/sdk": "0.21.6"
			}
		},
		"node_modules/@rspack/dev-server": {
			"version": "1.2.1",
			"resolved": "https://registry.npmjs.org/@rspack/dev-server/-/dev-server-1.2.1.tgz",
			"integrity": "sha512-e/ARvskYn2Qdd02qLvc0i6H9BnOmzP0xGHS2XCr7GZ3t2k5uC5ZlLkeN1iEebU0FkAW+6ot89NahFo3nupKuww==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@types/bonjour": "^3.5.13",
				"@types/connect-history-api-fallback": "^1.5.4",
				"@types/express": "^4.17.25",
				"@types/express-serve-static-core": "^4.17.21",
				"@types/serve-index": "^1.9.4",
				"@types/serve-static": "^1.15.5",
				"@types/sockjs": "^0.3.36",
				"@types/ws": "^8.5.10",
				"ansi-html-community": "^0.0.8",
				"bonjour-service": "^1.2.1",
				"chokidar": "^3.6.0",
				"colorette": "^2.0.10",
				"compression": "^1.8.1",
				"connect-history-api-fallback": "^2.0.0",
				"express": "^4.22.1",
				"graceful-fs": "^4.2.6",
				"http-proxy-middleware": "^2.0.9",
				"ipaddr.js": "^2.1.0",
				"launch-editor": "^2.6.1",
				"open": "^10.0.3",
				"p-retry": "^6.2.0",
				"schema-utils": "^4.2.0",
				"selfsigned": "^2.4.1",
				"serve-index": "^1.9.1",
				"sockjs": "^0.3.24",
				"spdy": "^4.0.2",
				"webpack-dev-middleware": "^7.4.2",
				"ws": "^8.18.0"
			},
			"engines": {
				"node": ">= 18.12.0"
			},
			"peerDependencies": {
				"@rspack/core": "*"
			}
		},
		"node_modules/@rspack/dev-server/node_modules/accepts": {
			"version": "1.3.8",
			"resolved": "https://registry.npmjs.org/accepts/-/accepts-1.3.8.tgz",
			"integrity": "sha512-PYAthTa2m2VKxuvSD3DPC/Gy+U+sOA1LAuT8mkmRuvw+NACSaeXEQ+NHcVF7rONl6qcaxV3Uuemwawk+7+SJLw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"mime-types": "~2.1.34",
				"negotiator": "0.6.3"
			},
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/@rspack/dev-server/node_modules/body-parser": {
			"version": "1.20.4",
			"resolved": "https://registry.npmjs.org/body-parser/-/body-parser-1.20.4.tgz",
			"integrity": "sha512-ZTgYYLMOXY9qKU/57FAo8F+HA2dGX7bqGc71txDRC1rS4frdFI5R7NhluHxH6M0YItAP0sHB4uqAOcYKxO6uGA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"bytes": "~3.1.2",
				"content-type": "~1.0.5",
				"debug": "2.6.9",
				"depd": "2.0.0",
				"destroy": "~1.2.0",
				"http-errors": "~2.0.1",
				"iconv-lite": "~0.4.24",
				"on-finished": "~2.4.1",
				"qs": "~6.14.0",
				"raw-body": "~2.5.3",
				"type-is": "~1.6.18",
				"unpipe": "~1.0.0"
			},
			"engines": {
				"node": ">= 0.8",
				"npm": "1.2.8000 || >= 1.4.16"
			}
		},
		"node_modules/@rspack/dev-server/node_modules/chokidar": {
			"version": "3.6.0",
			"resolved": "https://registry.npmjs.org/chokidar/-/chokidar-3.6.0.tgz",
			"integrity": "sha512-7VT13fmjotKpGipCW9JEQAusEPE+Ei8nl6/g4FBAmIm0GOOLMua9NDDo/DWp0ZAxCr3cPq5ZpBqmPAQgDda2Pw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"anymatch": "~3.1.2",
				"braces": "~3.0.2",
				"glob-parent": "~5.1.2",
				"is-binary-path": "~2.1.0",
				"is-glob": "~4.0.1",
				"normalize-path": "~3.0.0",
				"readdirp": "~3.6.0"
			},
			"engines": {
				"node": ">= 8.10.0"
			},
			"funding": {
				"url": "https://paulmillr.com/funding/"
			},
			"optionalDependencies": {
				"fsevents": "~2.3.2"
			}
		},
		"node_modules/@rspack/dev-server/node_modules/content-disposition": {
			"version": "0.5.4",
			"resolved": "https://registry.npmjs.org/content-disposition/-/content-disposition-0.5.4.tgz",
			"integrity": "sha512-FveZTNuGw04cxlAiWbzi6zTAL/lhehaWbTtgluJh4/E95DqMwTmha3KZN1aAWA8cFIhHzMZUvLevkw5Rqk+tSQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"safe-buffer": "5.2.1"
			},
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/@rspack/dev-server/node_modules/cookie-signature": {
			"version": "1.0.7",
			"resolved": "https://registry.npmjs.org/cookie-signature/-/cookie-signature-1.0.7.tgz",
			"integrity": "sha512-NXdYc3dLr47pBkpUCHtKSwIOQXLVn8dZEuywboCOJY/osA0wFSLlSawr3KN8qXJEyX66FcONTH8EIlVuK0yyFA==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@rspack/dev-server/node_modules/debug": {
			"version": "2.6.9",
			"resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
			"integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ms": "2.0.0"
			}
		},
		"node_modules/@rspack/dev-server/node_modules/debug/node_modules/ms": {
			"version": "2.0.0",
			"resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
			"integrity": "sha512-Tpp60P6IUJDTuOq/5Z8cdskzJujfwqfOTkrwIwj7IRISpnkJnT6SyJ4PCPnGMoFjC9ddhal5KVIYtAt97ix05A==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@rspack/dev-server/node_modules/define-lazy-prop": {
			"version": "3.0.0",
			"resolved": "https://registry.npmjs.org/define-lazy-prop/-/define-lazy-prop-3.0.0.tgz",
			"integrity": "sha512-N+MeXYoqr3pOgn8xfyRPREN7gHakLYjhsHhWGT3fWAiL4IkAt0iDw14QiiEm2bE30c5XX5q0FtAA3CK5f9/BUg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=12"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/@rspack/dev-server/node_modules/express": {
			"version": "4.22.1",
			"resolved": "https://registry.npmjs.org/express/-/express-4.22.1.tgz",
			"integrity": "sha512-F2X8g9P1X7uCPZMA3MVf9wcTqlyNp7IhH5qPCI0izhaOIYXaW9L535tGA3qmjRzpH+bZczqq7hVKxTR4NWnu+g==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"accepts": "~1.3.8",
				"array-flatten": "1.1.1",
				"body-parser": "~1.20.3",
				"content-disposition": "~0.5.4",
				"content-type": "~1.0.4",
				"cookie": "~0.7.1",
				"cookie-signature": "~1.0.6",
				"debug": "2.6.9",
				"depd": "2.0.0",
				"encodeurl": "~2.0.0",
				"escape-html": "~1.0.3",
				"etag": "~1.8.1",
				"finalhandler": "~1.3.1",
				"fresh": "~0.5.2",
				"http-errors": "~2.0.0",
				"merge-descriptors": "1.0.3",
				"methods": "~1.1.2",
				"on-finished": "~2.4.1",
				"parseurl": "~1.3.3",
				"path-to-regexp": "~0.1.12",
				"proxy-addr": "~2.0.7",
				"qs": "~6.14.0",
				"range-parser": "~1.2.1",
				"safe-buffer": "5.2.1",
				"send": "~0.19.0",
				"serve-static": "~1.16.2",
				"setprototypeof": "1.2.0",
				"statuses": "~2.0.1",
				"type-is": "~1.6.18",
				"utils-merge": "1.0.1",
				"vary": "~1.1.2"
			},
			"engines": {
				"node": ">= 0.10.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/express"
			}
		},
		"node_modules/@rspack/dev-server/node_modules/finalhandler": {
			"version": "1.3.2",
			"resolved": "https://registry.npmjs.org/finalhandler/-/finalhandler-1.3.2.tgz",
			"integrity": "sha512-aA4RyPcd3badbdABGDuTXCMTtOneUCAYH/gxoYRTZlIJdF0YPWuGqiAsIrhNnnqdXGswYk6dGujem4w80UJFhg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"debug": "2.6.9",
				"encodeurl": "~2.0.0",
				"escape-html": "~1.0.3",
				"on-finished": "~2.4.1",
				"parseurl": "~1.3.3",
				"statuses": "~2.0.2",
				"unpipe": "~1.0.0"
			},
			"engines": {
				"node": ">= 0.8"
			}
		},
		"node_modules/@rspack/dev-server/node_modules/fresh": {
			"version": "0.5.2",
			"resolved": "https://registry.npmjs.org/fresh/-/fresh-0.5.2.tgz",
			"integrity": "sha512-zJ2mQYM18rEFOudeV4GShTGIQ7RbzA7ozbU9I/XBpm7kqgMywgmylMwXHxZJmkVoYkna9d2pVXVXPdYTP9ej8Q==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/@rspack/dev-server/node_modules/glob-parent": {
			"version": "5.1.2",
			"resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
			"integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"is-glob": "^4.0.1"
			},
			"engines": {
				"node": ">= 6"
			}
		},
		"node_modules/@rspack/dev-server/node_modules/http-proxy-middleware": {
			"version": "2.0.9",
			"resolved": "https://registry.npmjs.org/http-proxy-middleware/-/http-proxy-middleware-2.0.9.tgz",
			"integrity": "sha512-c1IyJYLYppU574+YI7R4QyX2ystMtVXZwIdzazUIPIJsHuWNd+mho2j+bKoHftndicGj9yh+xjd+l0yj7VeT1Q==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@types/http-proxy": "^1.17.8",
				"http-proxy": "^1.18.1",
				"is-glob": "^4.0.1",
				"is-plain-obj": "^3.0.0",
				"micromatch": "^4.0.2"
			},
			"engines": {
				"node": ">=12.0.0"
			},
			"peerDependencies": {
				"@types/express": "^4.17.13"
			},
			"peerDependenciesMeta": {
				"@types/express": {
					"optional": true
				}
			}
		},
		"node_modules/@rspack/dev-server/node_modules/iconv-lite": {
			"version": "0.4.24",
			"resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.4.24.tgz",
			"integrity": "sha512-v3MXnZAcvnywkTUEZomIActle7RXXeedOR31wwl7VlyoXO4Qi9arvSenNQWne1TcRwhCL1HwLI21bEqdpj8/rA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"safer-buffer": ">= 2.1.2 < 3"
			},
			"engines": {
				"node": ">=0.10.0"
			}
		},
		"node_modules/@rspack/dev-server/node_modules/ipaddr.js": {
			"version": "2.3.0",
			"resolved": "https://registry.npmjs.org/ipaddr.js/-/ipaddr.js-2.3.0.tgz",
			"integrity": "sha512-Zv/pA+ciVFbCSBBjGfaKUya/CcGmUHzTydLMaTwrUUEM2DIEO3iZvueGxmacvmN50fGpGVKeTXpb2LcYQxeVdg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 10"
			}
		},
		"node_modules/@rspack/dev-server/node_modules/media-typer": {
			"version": "0.3.0",
			"resolved": "https://registry.npmjs.org/media-typer/-/media-typer-0.3.0.tgz",
			"integrity": "sha512-dq+qelQ9akHpcOl/gUVRTxVIOkAJ1wR3QAvb4RsVjS8oVoFjDGTc679wJYmUmknUF5HwMLOgb5O+a3KxfWapPQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/@rspack/dev-server/node_modules/merge-descriptors": {
			"version": "1.0.3",
			"resolved": "https://registry.npmjs.org/merge-descriptors/-/merge-descriptors-1.0.3.tgz",
			"integrity": "sha512-gaNvAS7TZ897/rVaZ0nMtAyxNyi/pdbjbAwUpFQpN70GqnVfOiXpeUUMKRBmzXaSQ8DdTX4/0ms62r2K+hE6mQ==",
			"dev": true,
			"license": "MIT",
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/@rspack/dev-server/node_modules/mime-db": {
			"version": "1.52.0",
			"resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.52.0.tgz",
			"integrity": "sha512-sPU4uV7dYlvtWJxwwxHD0PuihVNiE7TyAbQ5SWxDCB9mUYvOgroQOwYQQOKPJ8CIbE+1ETVlOoK1UC2nU3gYvg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/@rspack/dev-server/node_modules/mime-types": {
			"version": "2.1.35",
			"resolved": "https://registry.npmjs.org/mime-types/-/mime-types-2.1.35.tgz",
			"integrity": "sha512-ZDY+bPm5zTTF+YpCrAU9nK0UgICYPT0QtT1NZWFv4s++TNkcgVaT0g6+4R2uI4MjQjzysHB1zxuWL50hzaeXiw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"mime-db": "1.52.0"
			},
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/@rspack/dev-server/node_modules/negotiator": {
			"version": "0.6.3",
			"resolved": "https://registry.npmjs.org/negotiator/-/negotiator-0.6.3.tgz",
			"integrity": "sha512-+EUsqGPLsM+j/zdChZjsnX51g4XrHFOIXwfnCVPGlQk/k5giakcKsuxCObBRu6DSm9opw/O6slWbJdghQM4bBg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/@rspack/dev-server/node_modules/open": {
			"version": "10.2.0",
			"resolved": "https://registry.npmjs.org/open/-/open-10.2.0.tgz",
			"integrity": "sha512-YgBpdJHPyQ2UE5x+hlSXcnejzAvD0b22U2OuAP+8OnlJT+PjWPxtgmGqKKc+RgTM63U9gN0YzrYc71R2WT/hTA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"default-browser": "^5.2.1",
				"define-lazy-prop": "^3.0.0",
				"is-inside-container": "^1.0.0",
				"wsl-utils": "^0.1.0"
			},
			"engines": {
				"node": ">=18"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/@rspack/dev-server/node_modules/path-to-regexp": {
			"version": "0.1.13",
			"resolved": "https://registry.npmjs.org/path-to-regexp/-/path-to-regexp-0.1.13.tgz",
			"integrity": "sha512-A/AGNMFN3c8bOlvV9RreMdrv7jsmF9XIfDeCd87+I8RNg6s78BhJxMu69NEMHBSJFxKidViTEdruRwEk/WIKqA==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@rspack/dev-server/node_modules/picomatch": {
			"version": "2.3.2",
			"resolved": "https://registry.npmjs.org/picomatch/-/picomatch-2.3.2.tgz",
			"integrity": "sha512-V7+vQEJ06Z+c5tSye8S+nHUfI51xoXIXjHQ99cQtKUkQqqO1kO/KCJUfZXuB47h/YBlDhah2H3hdUGXn8ie0oA==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=8.6"
			},
			"funding": {
				"url": "https://github.com/sponsors/jonschlinkert"
			}
		},
		"node_modules/@rspack/dev-server/node_modules/qs": {
			"version": "6.14.2",
			"resolved": "https://registry.npmjs.org/qs/-/qs-6.14.2.tgz",
			"integrity": "sha512-V/yCWTTF7VJ9hIh18Ugr2zhJMP01MY7c5kh4J870L7imm6/DIzBsNLTXzMwUA3yZ5b/KBqLx8Kp3uRvd7xSe3Q==",
			"dev": true,
			"license": "BSD-3-Clause",
			"dependencies": {
				"side-channel": "^1.1.0"
			},
			"engines": {
				"node": ">=0.6"
			},
			"funding": {
				"url": "https://github.com/sponsors/ljharb"
			}
		},
		"node_modules/@rspack/dev-server/node_modules/raw-body": {
			"version": "2.5.3",
			"resolved": "https://registry.npmjs.org/raw-body/-/raw-body-2.5.3.tgz",
			"integrity": "sha512-s4VSOf6yN0rvbRZGxs8Om5CWj6seneMwK3oDb4lWDH0UPhWcxwOWw5+qk24bxq87szX1ydrwylIOp2uG1ojUpA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"bytes": "~3.1.2",
				"http-errors": "~2.0.1",
				"iconv-lite": "~0.4.24",
				"unpipe": "~1.0.0"
			},
			"engines": {
				"node": ">= 0.8"
			}
		},
		"node_modules/@rspack/dev-server/node_modules/readdirp": {
			"version": "3.6.0",
			"resolved": "https://registry.npmjs.org/readdirp/-/readdirp-3.6.0.tgz",
			"integrity": "sha512-hOS089on8RduqdbhvQ5Z37A0ESjsqz6qnRcffsMU3495FuTdqSm+7bhJ29JvIOsBDEEnan5DPu9t3To9VRlMzA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"picomatch": "^2.2.1"
			},
			"engines": {
				"node": ">=8.10.0"
			}
		},
		"node_modules/@rspack/dev-server/node_modules/send": {
			"version": "0.19.2",
			"resolved": "https://registry.npmjs.org/send/-/send-0.19.2.tgz",
			"integrity": "sha512-VMbMxbDeehAxpOtWJXlcUS5E8iXh6QmN+BkRX1GARS3wRaXEEgzCcB10gTQazO42tpNIya8xIyNx8fll1OFPrg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"debug": "2.6.9",
				"depd": "2.0.0",
				"destroy": "1.2.0",
				"encodeurl": "~2.0.0",
				"escape-html": "~1.0.3",
				"etag": "~1.8.1",
				"fresh": "~0.5.2",
				"http-errors": "~2.0.1",
				"mime": "1.6.0",
				"ms": "2.1.3",
				"on-finished": "~2.4.1",
				"range-parser": "~1.2.1",
				"statuses": "~2.0.2"
			},
			"engines": {
				"node": ">= 0.8.0"
			}
		},
		"node_modules/@rspack/dev-server/node_modules/serve-static": {
			"version": "1.16.3",
			"resolved": "https://registry.npmjs.org/serve-static/-/serve-static-1.16.3.tgz",
			"integrity": "sha512-x0RTqQel6g5SY7Lg6ZreMmsOzncHFU7nhnRWkKgWuMTu5NN0DR5oruckMqRvacAN9d5w6ARnRBXl9xhDCgfMeA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"encodeurl": "~2.0.0",
				"escape-html": "~1.0.3",
				"parseurl": "~1.3.3",
				"send": "~0.19.1"
			},
			"engines": {
				"node": ">= 0.8.0"
			}
		},
		"node_modules/@rspack/dev-server/node_modules/type-is": {
			"version": "1.6.18",
			"resolved": "https://registry.npmjs.org/type-is/-/type-is-1.6.18.tgz",
			"integrity": "sha512-TkRKr9sUTxEH8MdfuCSP7VizJyzRNMjj2J2do2Jr3Kym598JVdEksuzPQCnlFPW4ky9Q+iA+ma9BGm06XQBy8g==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"media-typer": "0.3.0",
				"mime-types": "~2.1.24"
			},
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/@rspack/lite-tapable": {
			"version": "1.1.0",
			"resolved": "https://registry.npmjs.org/@rspack/lite-tapable/-/lite-tapable-1.1.0.tgz",
			"integrity": "sha512-E2B0JhYFmVAwdDiG14+DW0Di4Ze4Jg10Pc4/lILUrd5DRCaklduz2OvJ5HYQ6G+hd+WTzqQb3QnDNfK4yvAFYw==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@rspack/plugin-react-refresh": {
			"version": "1.6.2",
			"resolved": "https://registry.npmjs.org/@rspack/plugin-react-refresh/-/plugin-react-refresh-1.6.2.tgz",
			"integrity": "sha512-k+/VrfTNgo+KirjI6V+8CWRj6y+DH9jOUWv8JorYY4vKf/9xfnZ8xHzuB4iqCwTtoZl9YnxOaOuoyjJipc2tiQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"error-stack-parser": "^2.1.4"
			},
			"peerDependencies": {
				"react-refresh": ">=0.10.0 <1.0.0",
				"webpack-hot-middleware": "2.x"
			},
			"peerDependenciesMeta": {
				"webpack-hot-middleware": {
					"optional": true
				}
			}
		},
		"node_modules/@schematics/angular": {
			"version": "21.2.6",
			"resolved": "https://registry.npmjs.org/@schematics/angular/-/angular-21.2.6.tgz",
			"integrity": "sha512-KpLD8R2S762jbLdNEepE+b7KjhVOKPFHHdgNqhPv0NiGLdsvXSOx1e63JvFacoCZdmP7n3/gwmyT/utcVvnsag==",
			"license": "MIT",
			"dependencies": {
				"@angular-devkit/core": "21.2.6",
				"@angular-devkit/schematics": "21.2.6",
				"jsonc-parser": "3.3.1"
			},
			"engines": {
				"node": "^20.19.0 || ^22.12.0 || >=24.0.0",
				"npm": "^6.11.0 || ^7.5.6 || >=8.0.0",
				"yarn": ">= 1.13.0"
			}
		},
		"node_modules/@sigstore/bundle": {
			"version": "4.0.0",
			"resolved": "https://registry.npmjs.org/@sigstore/bundle/-/bundle-4.0.0.tgz",
			"integrity": "sha512-NwCl5Y0V6Di0NexvkTqdoVfmjTaQwoLM236r89KEojGmq/jMls8S+zb7yOwAPdXvbwfKDlP+lmXgAL4vKSQT+A==",
			"dev": true,
			"license": "Apache-2.0",
			"dependencies": {
				"@sigstore/protobuf-specs": "^0.5.0"
			},
			"engines": {
				"node": "^20.17.0 || >=22.9.0"
			}
		},
		"node_modules/@sigstore/core": {
			"version": "3.2.0",
			"resolved": "https://registry.npmjs.org/@sigstore/core/-/core-3.2.0.tgz",
			"integrity": "sha512-kxHrDQ9YgfrWUSXU0cjsQGv8JykOFZQ9ErNKbFPWzk3Hgpwu8x2hHrQ9IdA8yl+j9RTLTC3sAF3Tdq1IQCP4oA==",
			"dev": true,
			"license": "Apache-2.0",
			"engines": {
				"node": "^20.17.0 || >=22.9.0"
			}
		},
		"node_modules/@sigstore/protobuf-specs": {
			"version": "0.5.0",
			"resolved": "https://registry.npmjs.org/@sigstore/protobuf-specs/-/protobuf-specs-0.5.0.tgz",
			"integrity": "sha512-MM8XIwUjN2bwvCg1QvrMtbBmpcSHrkhFSCu1D11NyPvDQ25HEc4oG5/OcQfd/Tlf/OxmKWERDj0zGE23jQaMwA==",
			"dev": true,
			"license": "Apache-2.0",
			"engines": {
				"node": "^18.17.0 || >=20.5.0"
			}
		},
		"node_modules/@sigstore/sign": {
			"version": "4.1.1",
			"resolved": "https://registry.npmjs.org/@sigstore/sign/-/sign-4.1.1.tgz",
			"integrity": "sha512-Hf4xglukg0XXQ2RiD5vSoLjdPe8OBUPA8XeVjUObheuDcWdYWrnH/BNmxZCzkAy68MzmNCxXLeurJvs6hcP2OQ==",
			"dev": true,
			"license": "Apache-2.0",
			"dependencies": {
				"@gar/promise-retry": "^1.0.2",
				"@sigstore/bundle": "^4.0.0",
				"@sigstore/core": "^3.2.0",
				"@sigstore/protobuf-specs": "^0.5.0",
				"make-fetch-happen": "^15.0.4",
				"proc-log": "^6.1.0"
			},
			"engines": {
				"node": "^20.17.0 || >=22.9.0"
			}
		},
		"node_modules/@sigstore/tuf": {
			"version": "4.0.2",
			"resolved": "https://registry.npmjs.org/@sigstore/tuf/-/tuf-4.0.2.tgz",
			"integrity": "sha512-TCAzTy0xzdP79EnxSjq9KQ3eaR7+FmudLC6eRKknVKZbV7ZNlGLClAAQb/HMNJ5n2OBNk2GT1tEmU0xuPr+SLQ==",
			"dev": true,
			"license": "Apache-2.0",
			"dependencies": {
				"@sigstore/protobuf-specs": "^0.5.0",
				"tuf-js": "^4.1.0"
			},
			"engines": {
				"node": "^20.17.0 || >=22.9.0"
			}
		},
		"node_modules/@sigstore/verify": {
			"version": "3.1.0",
			"resolved": "https://registry.npmjs.org/@sigstore/verify/-/verify-3.1.0.tgz",
			"integrity": "sha512-mNe0Iigql08YupSOGv197YdHpPPr+EzDZmfCgMc7RPNaZTw5aLN01nBl6CHJOh3BGtnMIj83EeN4butBchc8Ag==",
			"dev": true,
			"license": "Apache-2.0",
			"dependencies": {
				"@sigstore/bundle": "^4.0.0",
				"@sigstore/core": "^3.1.0",
				"@sigstore/protobuf-specs": "^0.5.0"
			},
			"engines": {
				"node": "^20.17.0 || >=22.9.0"
			}
		},
		"node_modules/@sinclair/typebox": {
			"version": "0.34.49",
			"resolved": "https://registry.npmjs.org/@sinclair/typebox/-/typebox-0.34.49.tgz",
			"integrity": "sha512-brySQQs7Jtn0joV8Xh9ZV/hZb9Ozb0pmazDIASBkYKCjXrXU3mpcFahmK/z4YDhGkQvP9mWJbVyahdtU5wQA+A==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@spartan-ng/brain": {
			"version": "0.0.1-alpha.676",
			"resolved": "https://registry.npmjs.org/@spartan-ng/brain/-/brain-0.0.1-alpha.676.tgz",
			"integrity": "sha512-9oIRVIbvagVyi5mp7TVKbOcea/hJ37GSQH+MV0Y4cneiaAL1QuOGYo4SGhdSH6JL9rWbJI5GuWaece6q+gvYTw==",
			"dependencies": {
				"tslib": "^2.3.0"
			},
			"peerDependencies": {
				"@angular/cdk": ">=20.0.0 <22.0.0",
				"@angular/common": ">=20.0.0 <22.0.0",
				"@angular/core": ">=20.0.0 <22.0.0",
				"@angular/forms": ">=20.0.0 <22.0.0",
				"clsx": ">=2.0.0",
				"luxon": ">=3.0.0",
				"rxjs": ">=6.6.0",
				"tailwindcss": ">=3.3.0"
			},
			"peerDependenciesMeta": {
				"luxon": {
					"optional": true
				}
			}
		},
		"node_modules/@spartan-ng/cli": {
			"version": "0.0.1-alpha.676",
			"resolved": "https://registry.npmjs.org/@spartan-ng/cli/-/cli-0.0.1-alpha.676.tgz",
			"integrity": "sha512-tHfGUTl44gtXjZhnPrtQPEZPMcFHciac0ih2J0GnHTaLFaYR9RKW+MjyrH3RddBVdDCsJsYlqTR1pkQ+bCm85Q==",
			"dev": true,
			"dependencies": {
				"@angular/core": ">=19.0.0",
				"@nx/angular": ">=20.0.0",
				"@nx/devkit": ">=20.0.0",
				"@nx/js": ">=20.0.0",
				"@nx/workspace": ">=20.0.0",
				"@phenomnomnominal/tsquery": "^6.1.3",
				"@schematics/angular": "20.3.9",
				"enquirer": "2.3.6",
				"jsonc-eslint-parser": "^2.1.0",
				"node-html-parser": "^7.0.1",
				"nx": ">=20.0.0",
				"picocolors": "^1.1.1",
				"postcss": "^8.4.47",
				"postcss-selector-parser": "^7.1.1",
				"semver": "7.5.4",
				"tailwind-merge": "^3.3.1",
				"ts-morph": "25.0.1",
				"typescript": ">=5.0.0",
				"zod": "3.23.8"
			},
			"peerDependencies": {
				"tslib": "^2.3.0"
			}
		},
		"node_modules/@spartan-ng/cli/node_modules/@angular-devkit/core": {
			"version": "20.3.9",
			"resolved": "https://registry.npmjs.org/@angular-devkit/core/-/core-20.3.9.tgz",
			"integrity": "sha512-bXsAGIUb4p60x548YmvnMvjwd3FwWz6re1uTM7dV0XH8nQn3XMhOQ3Q3sAckzJHxkDuaRhB3K/a4kupoOmVfTQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ajv": "8.17.1",
				"ajv-formats": "3.0.1",
				"jsonc-parser": "3.3.1",
				"picomatch": "4.0.3",
				"rxjs": "7.8.2",
				"source-map": "0.7.6"
			},
			"engines": {
				"node": "^20.19.0 || ^22.12.0 || >=24.0.0",
				"npm": "^6.11.0 || ^7.5.6 || >=8.0.0",
				"yarn": ">= 1.13.0"
			},
			"peerDependencies": {
				"chokidar": "^4.0.0"
			},
			"peerDependenciesMeta": {
				"chokidar": {
					"optional": true
				}
			}
		},
		"node_modules/@spartan-ng/cli/node_modules/@angular-devkit/core/node_modules/picomatch": {
			"version": "4.0.3",
			"resolved": "https://registry.npmjs.org/picomatch/-/picomatch-4.0.3.tgz",
			"integrity": "sha512-5gTmgEY/sqK6gFXLIsQNH19lWb4ebPDLA4SdLP7dsWkIXHWlG66oPuVvXSGFPppYZz8ZDZq0dYYrbHfBCVUb1Q==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=12"
			},
			"funding": {
				"url": "https://github.com/sponsors/jonschlinkert"
			}
		},
		"node_modules/@spartan-ng/cli/node_modules/@angular-devkit/schematics": {
			"version": "20.3.9",
			"resolved": "https://registry.npmjs.org/@angular-devkit/schematics/-/schematics-20.3.9.tgz",
			"integrity": "sha512-oaIjAKPmHMZBTC0met5M7dbXBeZnCNwmHacT/kBHNVBAz/NI95fuAfb2P0Jxt7gWdQXejDSxWp0tL+sZIyO0xw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@angular-devkit/core": "20.3.9",
				"jsonc-parser": "3.3.1",
				"magic-string": "0.30.17",
				"ora": "8.2.0",
				"rxjs": "7.8.2"
			},
			"engines": {
				"node": "^20.19.0 || ^22.12.0 || >=24.0.0",
				"npm": "^6.11.0 || ^7.5.6 || >=8.0.0",
				"yarn": ">= 1.13.0"
			}
		},
		"node_modules/@spartan-ng/cli/node_modules/@nx/angular": {
			"version": "22.6.5",
			"resolved": "https://registry.npmjs.org/@nx/angular/-/angular-22.6.5.tgz",
			"integrity": "sha512-NPkrGGatlUUK7twHKYpv3mv6jYL6dRiqdPuqAhQfmUnuz5lA4ZhpCfwEBKUFEKsGNwOft0ZCGZdSdODliaKZzA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@nx/devkit": "22.6.5",
				"@nx/eslint": "22.6.5",
				"@nx/js": "22.6.5",
				"@nx/module-federation": "22.6.5",
				"@nx/rspack": "22.6.5",
				"@nx/web": "22.6.5",
				"@nx/webpack": "22.6.5",
				"@nx/workspace": "22.6.5",
				"@phenomnomnominal/tsquery": "~6.1.4",
				"@typescript-eslint/type-utils": "^8.0.0",
				"enquirer": "~2.3.6",
				"magic-string": "~0.30.2",
				"picocolors": "^1.1.0",
				"picomatch": "4.0.4",
				"semver": "^7.6.3",
				"tslib": "^2.3.0",
				"webpack-merge": "^5.8.0"
			},
			"peerDependencies": {
				"@angular-devkit/build-angular": ">= 19.0.0 < 22.0.0",
				"@angular-devkit/core": ">= 19.0.0 < 22.0.0",
				"@angular-devkit/schematics": ">= 19.0.0 < 22.0.0",
				"@angular/build": ">= 19.0.0 < 22.0.0",
				"@schematics/angular": ">= 19.0.0 < 22.0.0",
				"ng-packagr": ">= 19.0.0 < 22.0.0",
				"rxjs": "^6.5.3 || ^7.5.0"
			},
			"peerDependenciesMeta": {
				"@angular-devkit/build-angular": {
					"optional": true
				},
				"@angular/build": {
					"optional": true
				},
				"ng-packagr": {
					"optional": true
				}
			}
		},
		"node_modules/@spartan-ng/cli/node_modules/@nx/angular/node_modules/semver": {
			"version": "7.7.4",
			"resolved": "https://registry.npmjs.org/semver/-/semver-7.7.4.tgz",
			"integrity": "sha512-vFKC2IEtQnVhpT78h1Yp8wzwrf8CM+MzKMHGJZfBtzhZNycRFnXsHk6E5TxIkkMsgNS7mdX3AGB7x2QM2di4lA==",
			"dev": true,
			"license": "ISC",
			"bin": {
				"semver": "bin/semver.js"
			},
			"engines": {
				"node": ">=10"
			}
		},
		"node_modules/@spartan-ng/cli/node_modules/@phenomnomnominal/tsquery": {
			"version": "6.1.4",
			"resolved": "https://registry.npmjs.org/@phenomnomnominal/tsquery/-/tsquery-6.1.4.tgz",
			"integrity": "sha512-3tHlGy/fxjJCHqIV8nelAzbRTNkCUY+k7lqBGKNuQz99H2OKGRt6oU+U2SZs6LYrbOe8mxMFl6kq6gzHapFRkw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@types/esquery": "^1.5.0",
				"esquery": "^1.5.0"
			},
			"peerDependencies": {
				"typescript": "^3 || ^4 || ^5"
			}
		},
		"node_modules/@spartan-ng/cli/node_modules/@schematics/angular": {
			"version": "20.3.9",
			"resolved": "https://registry.npmjs.org/@schematics/angular/-/angular-20.3.9.tgz",
			"integrity": "sha512-XkgTwGhhrx+MVi2+TFO32d6Es5Uezzx7Y7B/e2ulDlj08bizxQj+9wkeLt5+bR8JWODHpEntZn/Xd5WvXnODGA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@angular-devkit/core": "20.3.9",
				"@angular-devkit/schematics": "20.3.9",
				"jsonc-parser": "3.3.1"
			},
			"engines": {
				"node": "^20.19.0 || ^22.12.0 || >=24.0.0",
				"npm": "^6.11.0 || ^7.5.6 || >=8.0.0",
				"yarn": ">= 1.13.0"
			}
		},
		"node_modules/@spartan-ng/cli/node_modules/ajv": {
			"version": "8.17.1",
			"resolved": "https://registry.npmjs.org/ajv/-/ajv-8.17.1.tgz",
			"integrity": "sha512-B/gBuNg5SiMTrPkC+A2+cW0RszwxYmn6VYxB/inlBStS5nx6xHIt/ehKRhIMhqusl7a8LjQoZnjCs5vhwxOQ1g==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"fast-deep-equal": "^3.1.3",
				"fast-uri": "^3.0.1",
				"json-schema-traverse": "^1.0.0",
				"require-from-string": "^2.0.2"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/epoberezkin"
			}
		},
		"node_modules/@spartan-ng/cli/node_modules/cli-spinners": {
			"version": "2.9.2",
			"resolved": "https://registry.npmjs.org/cli-spinners/-/cli-spinners-2.9.2.tgz",
			"integrity": "sha512-ywqV+5MmyL4E7ybXgKys4DugZbX0FC6LnwrhjuykIjnK9k8OQacQ7axGKnjDXWNhns0xot3bZI5h55H8yo9cJg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=6"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/@spartan-ng/cli/node_modules/log-symbols": {
			"version": "6.0.0",
			"resolved": "https://registry.npmjs.org/log-symbols/-/log-symbols-6.0.0.tgz",
			"integrity": "sha512-i24m8rpwhmPIS4zscNzK6MSEhk0DUWa/8iYQWxhffV8jkI4Phvs3F+quL5xvS0gdQR0FyTCMMH33Y78dDTzzIw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"chalk": "^5.3.0",
				"is-unicode-supported": "^1.3.0"
			},
			"engines": {
				"node": ">=18"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/@spartan-ng/cli/node_modules/log-symbols/node_modules/is-unicode-supported": {
			"version": "1.3.0",
			"resolved": "https://registry.npmjs.org/is-unicode-supported/-/is-unicode-supported-1.3.0.tgz",
			"integrity": "sha512-43r2mRvz+8JRIKnWJ+3j8JtjRKZ6GmjzfaE/qiBJnikNnYv/6bagRJ1kUhNk8R5EX/GkobD+r+sfxCPJsiKBLQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=12"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/@spartan-ng/cli/node_modules/lru-cache": {
			"version": "6.0.0",
			"resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-6.0.0.tgz",
			"integrity": "sha512-Jo6dJ04CmSjuznwJSS3pUeWmd/H0ffTlkXXgwZi+eq1UCmqQwCh+eLsYOYCwY991i2Fah4h1BEMCx4qThGbsiA==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"yallist": "^4.0.0"
			},
			"engines": {
				"node": ">=10"
			}
		},
		"node_modules/@spartan-ng/cli/node_modules/magic-string": {
			"version": "0.30.17",
			"resolved": "https://registry.npmjs.org/magic-string/-/magic-string-0.30.17.tgz",
			"integrity": "sha512-sNPKHvyjVf7gyjwS4xGTaW/mCnF8wnjtifKBEhxfZ7E/S8tQ0rssrwGNn6q8JH/ohItJfSQp9mBtQYuTlH5QnA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@jridgewell/sourcemap-codec": "^1.5.0"
			}
		},
		"node_modules/@spartan-ng/cli/node_modules/ora": {
			"version": "8.2.0",
			"resolved": "https://registry.npmjs.org/ora/-/ora-8.2.0.tgz",
			"integrity": "sha512-weP+BZ8MVNnlCm8c0Qdc1WSWq4Qn7I+9CJGm7Qali6g44e/PUzbjNqJX5NJ9ljlNMosfJvg1fKEGILklK9cwnw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"chalk": "^5.3.0",
				"cli-cursor": "^5.0.0",
				"cli-spinners": "^2.9.2",
				"is-interactive": "^2.0.0",
				"is-unicode-supported": "^2.0.0",
				"log-symbols": "^6.0.0",
				"stdin-discarder": "^0.2.2",
				"string-width": "^7.2.0",
				"strip-ansi": "^7.1.0"
			},
			"engines": {
				"node": ">=18"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/@spartan-ng/cli/node_modules/semver": {
			"version": "7.5.4",
			"resolved": "https://registry.npmjs.org/semver/-/semver-7.5.4.tgz",
			"integrity": "sha512-1bCSESV6Pv+i21Hvpxp3Dx+pSD8lIPt8uVjRrxAUt/nbswYc+tK6Y2btiULjd4+fnq15PX+nqQDC7Oft7WkwcA==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"lru-cache": "^6.0.0"
			},
			"bin": {
				"semver": "bin/semver.js"
			},
			"engines": {
				"node": ">=10"
			}
		},
		"node_modules/@spartan-ng/cli/node_modules/stdin-discarder": {
			"version": "0.2.2",
			"resolved": "https://registry.npmjs.org/stdin-discarder/-/stdin-discarder-0.2.2.tgz",
			"integrity": "sha512-UhDfHmA92YAlNnCfhmq0VeNL5bDbiZGg7sZ2IvPsXubGkiNa9EC+tUTsjBRsYUAz87btI6/1wf4XoVvQ3uRnmQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=18"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/@spartan-ng/cli/node_modules/string-width": {
			"version": "7.2.0",
			"resolved": "https://registry.npmjs.org/string-width/-/string-width-7.2.0.tgz",
			"integrity": "sha512-tsaTIkKW9b4N+AEj+SVA+WhJzV7/zMhcSu78mLKWSk7cXMOSHsBKFWUs0fWwq8QyK3MgJBQRX6Gbi4kYbdvGkQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"emoji-regex": "^10.3.0",
				"get-east-asian-width": "^1.0.0",
				"strip-ansi": "^7.1.0"
			},
			"engines": {
				"node": ">=18"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/@spartan-ng/cli/node_modules/yallist": {
			"version": "4.0.0",
			"resolved": "https://registry.npmjs.org/yallist/-/yallist-4.0.0.tgz",
			"integrity": "sha512-3wdGidZyq5PB084XLES5TpOSRA3wjXAlIWMhum2kRcv/41Sn2emQ0dycQW4uZXLejwKvg6EsvbdlVL+FYEct7A==",
			"dev": true,
			"license": "ISC"
		},
		"node_modules/@spartan-ng/cli/node_modules/zod": {
			"version": "3.23.8",
			"resolved": "https://registry.npmjs.org/zod/-/zod-3.23.8.tgz",
			"integrity": "sha512-XBx9AXhXktjUqnepgTiE5flcKIYWi/rme0Eaj+5Y0lftuGBq+jyRu/md4WnuxqgP1ubdpNCsYEYPxrzVHD8d6g==",
			"dev": true,
			"license": "MIT",
			"funding": {
				"url": "https://github.com/sponsors/colinhacks"
			}
		},
		"node_modules/@standard-schema/spec": {
			"version": "1.1.0",
			"resolved": "https://registry.npmjs.org/@standard-schema/spec/-/spec-1.1.0.tgz",
			"integrity": "sha512-l2aFy5jALhniG5HgqrD6jXLi/rUWrKvqN/qJx6yoJsgKhblVd+iqqU4RCXavm/jPityDo5TCvKMnpjKnOriy0w==",
			"license": "MIT"
		},
		"node_modules/@tailwindcss/node": {
			"version": "4.2.2",
			"resolved": "https://registry.npmjs.org/@tailwindcss/node/-/node-4.2.2.tgz",
			"integrity": "sha512-pXS+wJ2gZpVXqFaUEjojq7jzMpTGf8rU6ipJz5ovJV6PUGmlJ+jvIwGrzdHdQ80Sg+wmQxUFuoW1UAAwHNEdFA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@jridgewell/remapping": "^2.3.5",
				"enhanced-resolve": "^5.19.0",
				"jiti": "^2.6.1",
				"lightningcss": "1.32.0",
				"magic-string": "^0.30.21",
				"source-map-js": "^1.2.1",
				"tailwindcss": "4.2.2"
			}
		},
		"node_modules/@tailwindcss/oxide": {
			"version": "4.2.2",
			"resolved": "https://registry.npmjs.org/@tailwindcss/oxide/-/oxide-4.2.2.tgz",
			"integrity": "sha512-qEUA07+E5kehxYp9BVMpq9E8vnJuBHfJEC0vPC5e7iL/hw7HR61aDKoVoKzrG+QKp56vhNZe4qwkRmMC0zDLvg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 20"
			},
			"optionalDependencies": {
				"@tailwindcss/oxide-android-arm64": "4.2.2",
				"@tailwindcss/oxide-darwin-arm64": "4.2.2",
				"@tailwindcss/oxide-darwin-x64": "4.2.2",
				"@tailwindcss/oxide-freebsd-x64": "4.2.2",
				"@tailwindcss/oxide-linux-arm-gnueabihf": "4.2.2",
				"@tailwindcss/oxide-linux-arm64-gnu": "4.2.2",
				"@tailwindcss/oxide-linux-arm64-musl": "4.2.2",
				"@tailwindcss/oxide-linux-x64-gnu": "4.2.2",
				"@tailwindcss/oxide-linux-x64-musl": "4.2.2",
				"@tailwindcss/oxide-wasm32-wasi": "4.2.2",
				"@tailwindcss/oxide-win32-arm64-msvc": "4.2.2",
				"@tailwindcss/oxide-win32-x64-msvc": "4.2.2"
			}
		},
		"node_modules/@tailwindcss/oxide-android-arm64": {
			"version": "4.2.2",
			"resolved": "https://registry.npmjs.org/@tailwindcss/oxide-android-arm64/-/oxide-android-arm64-4.2.2.tgz",
			"integrity": "sha512-dXGR1n+P3B6748jZO/SvHZq7qBOqqzQ+yFrXpoOWWALWndF9MoSKAT3Q0fYgAzYzGhxNYOoysRvYlpixRBBoDg==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"android"
			],
			"engines": {
				"node": ">= 20"
			}
		},
		"node_modules/@tailwindcss/oxide-darwin-arm64": {
			"version": "4.2.2",
			"resolved": "https://registry.npmjs.org/@tailwindcss/oxide-darwin-arm64/-/oxide-darwin-arm64-4.2.2.tgz",
			"integrity": "sha512-iq9Qjr6knfMpZHj55/37ouZeykwbDqF21gPFtfnhCCKGDcPI/21FKC9XdMO/XyBM7qKORx6UIhGgg6jLl7BZlg==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"darwin"
			],
			"engines": {
				"node": ">= 20"
			}
		},
		"node_modules/@tailwindcss/oxide-darwin-x64": {
			"version": "4.2.2",
			"resolved": "https://registry.npmjs.org/@tailwindcss/oxide-darwin-x64/-/oxide-darwin-x64-4.2.2.tgz",
			"integrity": "sha512-BlR+2c3nzc8f2G639LpL89YY4bdcIdUmiOOkv2GQv4/4M0vJlpXEa0JXNHhCHU7VWOKWT/CjqHdTP8aUuDJkuw==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"darwin"
			],
			"engines": {
				"node": ">= 20"
			}
		},
		"node_modules/@tailwindcss/oxide-freebsd-x64": {
			"version": "4.2.2",
			"resolved": "https://registry.npmjs.org/@tailwindcss/oxide-freebsd-x64/-/oxide-freebsd-x64-4.2.2.tgz",
			"integrity": "sha512-YUqUgrGMSu2CDO82hzlQ5qSb5xmx3RUrke/QgnoEx7KvmRJHQuZHZmZTLSuuHwFf0DJPybFMXMYf+WJdxHy/nQ==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"freebsd"
			],
			"engines": {
				"node": ">= 20"
			}
		},
		"node_modules/@tailwindcss/oxide-linux-arm-gnueabihf": {
			"version": "4.2.2",
			"resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-arm-gnueabihf/-/oxide-linux-arm-gnueabihf-4.2.2.tgz",
			"integrity": "sha512-FPdhvsW6g06T9BWT0qTwiVZYE2WIFo2dY5aCSpjG/S/u1tby+wXoslXS0kl3/KXnULlLr1E3NPRRw0g7t2kgaQ==",
			"cpu": [
				"arm"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">= 20"
			}
		},
		"node_modules/@tailwindcss/oxide-linux-arm64-gnu": {
			"version": "4.2.2",
			"resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-arm64-gnu/-/oxide-linux-arm64-gnu-4.2.2.tgz",
			"integrity": "sha512-4og1V+ftEPXGttOO7eCmW7VICmzzJWgMx+QXAJRAhjrSjumCwWqMfkDrNu1LXEQzNAwz28NCUpucgQPrR4S2yw==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">= 20"
			}
		},
		"node_modules/@tailwindcss/oxide-linux-arm64-musl": {
			"version": "4.2.2",
			"resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-arm64-musl/-/oxide-linux-arm64-musl-4.2.2.tgz",
			"integrity": "sha512-oCfG/mS+/+XRlwNjnsNLVwnMWYH7tn/kYPsNPh+JSOMlnt93mYNCKHYzylRhI51X+TbR+ufNhhKKzm6QkqX8ag==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">= 20"
			}
		},
		"node_modules/@tailwindcss/oxide-linux-x64-gnu": {
			"version": "4.2.2",
			"resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-x64-gnu/-/oxide-linux-x64-gnu-4.2.2.tgz",
			"integrity": "sha512-rTAGAkDgqbXHNp/xW0iugLVmX62wOp2PoE39BTCGKjv3Iocf6AFbRP/wZT/kuCxC9QBh9Pu8XPkv/zCZB2mcMg==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">= 20"
			}
		},
		"node_modules/@tailwindcss/oxide-linux-x64-musl": {
			"version": "4.2.2",
			"resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-x64-musl/-/oxide-linux-x64-musl-4.2.2.tgz",
			"integrity": "sha512-XW3t3qwbIwiSyRCggeO2zxe3KWaEbM0/kW9e8+0XpBgyKU4ATYzcVSMKteZJ1iukJ3HgHBjbg9P5YPRCVUxlnQ==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">= 20"
			}
		},
		"node_modules/@tailwindcss/oxide-wasm32-wasi": {
			"version": "4.2.2",
			"resolved": "https://registry.npmjs.org/@tailwindcss/oxide-wasm32-wasi/-/oxide-wasm32-wasi-4.2.2.tgz",
			"integrity": "sha512-eKSztKsmEsn1O5lJ4ZAfyn41NfG7vzCg496YiGtMDV86jz1q/irhms5O0VrY6ZwTUkFy/EKG3RfWgxSI3VbZ8Q==",
			"bundleDependencies": [
				"@napi-rs/wasm-runtime",
				"@emnapi/core",
				"@emnapi/runtime",
				"@tybys/wasm-util",
				"@emnapi/wasi-threads",
				"tslib"
			],
			"cpu": [
				"wasm32"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"dependencies": {
				"@emnapi/core": "^1.8.1",
				"@emnapi/runtime": "^1.8.1",
				"@emnapi/wasi-threads": "^1.1.0",
				"@napi-rs/wasm-runtime": "^1.1.1",
				"@tybys/wasm-util": "^0.10.1",
				"tslib": "^2.8.1"
			},
			"engines": {
				"node": ">=14.0.0"
			}
		},
		"node_modules/@tailwindcss/oxide-win32-arm64-msvc": {
			"version": "4.2.2",
			"resolved": "https://registry.npmjs.org/@tailwindcss/oxide-win32-arm64-msvc/-/oxide-win32-arm64-msvc-4.2.2.tgz",
			"integrity": "sha512-qPmaQM4iKu5mxpsrWZMOZRgZv1tOZpUm+zdhhQP0VhJfyGGO3aUKdbh3gDZc/dPLQwW4eSqWGrrcWNBZWUWaXQ==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"win32"
			],
			"engines": {
				"node": ">= 20"
			}
		},
		"node_modules/@tailwindcss/oxide-win32-x64-msvc": {
			"version": "4.2.2",
			"resolved": "https://registry.npmjs.org/@tailwindcss/oxide-win32-x64-msvc/-/oxide-win32-x64-msvc-4.2.2.tgz",
			"integrity": "sha512-1T/37VvI7WyH66b+vqHj/cLwnCxt7Qt3WFu5Q8hk65aOvlwAhs7rAp1VkulBJw/N4tMirXjVnylTR72uI0HGcA==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"win32"
			],
			"engines": {
				"node": ">= 20"
			}
		},
		"node_modules/@tailwindcss/postcss": {
			"version": "4.2.2",
			"resolved": "https://registry.npmjs.org/@tailwindcss/postcss/-/postcss-4.2.2.tgz",
			"integrity": "sha512-n4goKQbW8RVXIbNKRB/45LzyUqN451deQK0nzIeauVEqjlI49slUlgKYJM2QyUzap/PcpnS7kzSUmPb1sCRvYQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@alloc/quick-lru": "^5.2.0",
				"@tailwindcss/node": "4.2.2",
				"@tailwindcss/oxide": "4.2.2",
				"postcss": "^8.5.6",
				"tailwindcss": "4.2.2"
			}
		},
		"node_modules/@ts-morph/common": {
			"version": "0.26.1",
			"resolved": "https://registry.npmjs.org/@ts-morph/common/-/common-0.26.1.tgz",
			"integrity": "sha512-Sn28TGl/4cFpcM+jwsH1wLncYq3FtN/BIpem+HOygfBWPT5pAeS5dB4VFVzV8FbnOKHpDLZmvAl4AjPEev5idA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"fast-glob": "^3.3.2",
				"minimatch": "^9.0.4",
				"path-browserify": "^1.0.1"
			}
		},
		"node_modules/@ts-morph/common/node_modules/balanced-match": {
			"version": "1.0.2",
			"resolved": "https://registry.npmjs.org/balanced-match/-/balanced-match-1.0.2.tgz",
			"integrity": "sha512-3oSeUO0TMV67hN1AmbXsK4yaqU7tjiHlbxRDZOpH0KW9+CeX4bRAaX0Anxt0tx2MrpRpWwQaPwIlISEJhYU5Pw==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@ts-morph/common/node_modules/brace-expansion": {
			"version": "2.1.0",
			"resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-2.1.0.tgz",
			"integrity": "sha512-TN1kCZAgdgweJhWWpgKYrQaMNHcDULHkWwQIspdtjV4Y5aurRdZpjAqn6yX3FPqTA9ngHCc4hJxMAMgGfve85w==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"balanced-match": "^1.0.0"
			}
		},
		"node_modules/@ts-morph/common/node_modules/minimatch": {
			"version": "9.0.9",
			"resolved": "https://registry.npmjs.org/minimatch/-/minimatch-9.0.9.tgz",
			"integrity": "sha512-OBwBN9AL4dqmETlpS2zasx+vTeWclWzkblfZk7KTA5j3jeOONz/tRCnZomUyvNg83wL5Zv9Ss6HMJXAgL8R2Yg==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"brace-expansion": "^2.0.2"
			},
			"engines": {
				"node": ">=16 || 14 >=14.17"
			},
			"funding": {
				"url": "https://github.com/sponsors/isaacs"
			}
		},
		"node_modules/@tufjs/canonical-json": {
			"version": "2.0.0",
			"resolved": "https://registry.npmjs.org/@tufjs/canonical-json/-/canonical-json-2.0.0.tgz",
			"integrity": "sha512-yVtV8zsdo8qFHe+/3kw81dSLyF7D576A5cCFCi4X7B39tWT7SekaEFUnvnWJHz+9qO7qJTah1JbrDjWKqFtdWA==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": "^16.14.0 || >=18.0.0"
			}
		},
		"node_modules/@tufjs/models": {
			"version": "4.1.0",
			"resolved": "https://registry.npmjs.org/@tufjs/models/-/models-4.1.0.tgz",
			"integrity": "sha512-Y8cK9aggNRsqJVaKUlEYs4s7CvQ1b1ta2DVPyAimb0I2qhzjNk+A+mxvll/klL0RlfuIUei8BF7YWiua4kQqww==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@tufjs/canonical-json": "2.0.0",
				"minimatch": "^10.1.1"
			},
			"engines": {
				"node": "^20.17.0 || >=22.9.0"
			}
		},
		"node_modules/@tybys/wasm-util": {
			"version": "0.10.1",
			"resolved": "https://registry.npmjs.org/@tybys/wasm-util/-/wasm-util-0.10.1.tgz",
			"integrity": "sha512-9tTaPJLSiejZKx+Bmog4uSubteqTvFrVrURwkmHixBo0G4seD0zUxp98E1DzUBJxLQ3NPwXrGKDiVjwx/DpPsg==",
			"dev": true,
			"license": "MIT",
			"optional": true,
			"dependencies": {
				"tslib": "^2.4.0"
			}
		},
		"node_modules/@types/body-parser": {
			"version": "1.19.6",
			"resolved": "https://registry.npmjs.org/@types/body-parser/-/body-parser-1.19.6.tgz",
			"integrity": "sha512-HLFeCYgz89uk22N5Qg3dvGvsv46B8GLvKKo1zKG4NybA8U2DiEO3w9lqGg29t/tfLRJpJ6iQxnVw4OnB7MoM9g==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@types/connect": "*",
				"@types/node": "*"
			}
		},
		"node_modules/@types/bonjour": {
			"version": "3.5.13",
			"resolved": "https://registry.npmjs.org/@types/bonjour/-/bonjour-3.5.13.tgz",
			"integrity": "sha512-z9fJ5Im06zvUL548KvYNecEVlA7cVDkGUi6kZusb04mpyEFKCIZJvloCcmpmLaIahDpOQGHaHmG6imtPMmPXGQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@types/node": "*"
			}
		},
		"node_modules/@types/chai": {
			"version": "5.2.3",
			"resolved": "https://registry.npmjs.org/@types/chai/-/chai-5.2.3.tgz",
			"integrity": "sha512-Mw558oeA9fFbv65/y4mHtXDs9bPnFMZAL/jxdPFUpOHHIXX91mcgEHbS5Lahr+pwZFR8A7GQleRWeI6cGFC2UA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@types/deep-eql": "*",
				"assertion-error": "^2.0.1"
			}
		},
		"node_modules/@types/connect": {
			"version": "3.4.38",
			"resolved": "https://registry.npmjs.org/@types/connect/-/connect-3.4.38.tgz",
			"integrity": "sha512-K6uROf1LD88uDQqJCktA4yzL1YYAK6NgfsI0v/mTgyPKWsX1CnJ0XPSDhViejru1GcRkLWb8RlzFYJRqGUbaug==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@types/node": "*"
			}
		},
		"node_modules/@types/connect-history-api-fallback": {
			"version": "1.5.4",
			"resolved": "https://registry.npmjs.org/@types/connect-history-api-fallback/-/connect-history-api-fallback-1.5.4.tgz",
			"integrity": "sha512-n6Cr2xS1h4uAulPRdlw6Jl6s1oG8KrVilPN2yUITEs+K48EzMJJ3W1xy8K5eWuFvjp3R74AOIGSmp2UfBJ8HFw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@types/express-serve-static-core": "*",
				"@types/node": "*"
			}
		},
		"node_modules/@types/deep-eql": {
			"version": "4.0.2",
			"resolved": "https://registry.npmjs.org/@types/deep-eql/-/deep-eql-4.0.2.tgz",
			"integrity": "sha512-c9h9dVVMigMPc4bwTvC5dxqtqJZwQPePsWjPlpSOnojbor6pGqdk541lfA7AqFQr5pB1BRdq0juY9db81BwyFw==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@types/eslint": {
			"version": "9.6.1",
			"resolved": "https://registry.npmjs.org/@types/eslint/-/eslint-9.6.1.tgz",
			"integrity": "sha512-FXx2pKgId/WyYo2jXw63kk7/+TY7u7AziEJxJAnSFzHlqTAS3Ync6SvgYAN/k4/PQpnnVuzoMuVnByKK2qp0ag==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@types/estree": "*",
				"@types/json-schema": "*"
			}
		},
		"node_modules/@types/eslint-scope": {
			"version": "3.7.7",
			"resolved": "https://registry.npmjs.org/@types/eslint-scope/-/eslint-scope-3.7.7.tgz",
			"integrity": "sha512-MzMFlSLBqNF2gcHWO0G1vP/YQyfvrxZ0bF+u7mzUdZ1/xK4A4sru+nraZz5i3iEIk1l1uyicaDVTB4QbbEkAYg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@types/eslint": "*",
				"@types/estree": "*"
			}
		},
		"node_modules/@types/esquery": {
			"version": "1.5.4",
			"resolved": "https://registry.npmjs.org/@types/esquery/-/esquery-1.5.4.tgz",
			"integrity": "sha512-yYO4Q8H+KJHKW1rEeSzHxcZi90durqYgWVfnh5K6ZADVBjBv2e1NEveYX5yT2bffgN7RqzH3k9930m+i2yBoMA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@types/estree": "*"
			}
		},
		"node_modules/@types/esrecurse": {
			"version": "4.3.1",
			"resolved": "https://registry.npmjs.org/@types/esrecurse/-/esrecurse-4.3.1.tgz",
			"integrity": "sha512-xJBAbDifo5hpffDBuHl0Y8ywswbiAp/Wi7Y/GtAgSlZyIABppyurxVueOPE8LUQOxdlgi6Zqce7uoEpqNTeiUw==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@types/estree": {
			"version": "1.0.8",
			"resolved": "https://registry.npmjs.org/@types/estree/-/estree-1.0.8.tgz",
			"integrity": "sha512-dWHzHa2WqEXI/O1E9OjrocMTKJl2mSrEolh1Iomrv6U+JuNwaHXsXx9bLu5gG7BUWFIN0skIQJQ/L1rIex4X6w==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@types/express": {
			"version": "4.17.25",
			"resolved": "https://registry.npmjs.org/@types/express/-/express-4.17.25.tgz",
			"integrity": "sha512-dVd04UKsfpINUnK0yBoYHDF3xu7xVH4BuDotC/xGuycx4CgbP48X/KF/586bcObxT0HENHXEU8Nqtu6NR+eKhw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@types/body-parser": "*",
				"@types/express-serve-static-core": "^4.17.33",
				"@types/qs": "*",
				"@types/serve-static": "^1"
			}
		},
		"node_modules/@types/express-serve-static-core": {
			"version": "4.19.8",
			"resolved": "https://registry.npmjs.org/@types/express-serve-static-core/-/express-serve-static-core-4.19.8.tgz",
			"integrity": "sha512-02S5fmqeoKzVZCHPZid4b8JH2eM5HzQLZWN2FohQEy/0eXTq8VXZfSN6Pcr3F6N9R/vNrj7cpgbhjie6m/1tCA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@types/node": "*",
				"@types/qs": "*",
				"@types/range-parser": "*",
				"@types/send": "*"
			}
		},
		"node_modules/@types/http-errors": {
			"version": "2.0.5",
			"resolved": "https://registry.npmjs.org/@types/http-errors/-/http-errors-2.0.5.tgz",
			"integrity": "sha512-r8Tayk8HJnX0FztbZN7oVqGccWgw98T/0neJphO91KkmOzug1KkofZURD4UaD5uH8AqcFLfdPErnBod0u71/qg==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@types/http-proxy": {
			"version": "1.17.17",
			"resolved": "https://registry.npmjs.org/@types/http-proxy/-/http-proxy-1.17.17.tgz",
			"integrity": "sha512-ED6LB+Z1AVylNTu7hdzuBqOgMnvG/ld6wGCG8wFnAzKX5uyW2K3WD52v0gnLCTK/VLpXtKckgWuyScYK6cSPaw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@types/node": "*"
			}
		},
		"node_modules/@types/istanbul-lib-coverage": {
			"version": "2.0.6",
			"resolved": "https://registry.npmjs.org/@types/istanbul-lib-coverage/-/istanbul-lib-coverage-2.0.6.tgz",
			"integrity": "sha512-2QF/t/auWm0lsy8XtKVPG19v3sSOQlJe/YHZgfjb/KBBHOGSV+J2q/S671rcq9uTBrLAXmZpqJiaQbMT+zNU1w==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@types/istanbul-lib-report": {
			"version": "3.0.3",
			"resolved": "https://registry.npmjs.org/@types/istanbul-lib-report/-/istanbul-lib-report-3.0.3.tgz",
			"integrity": "sha512-NQn7AHQnk/RSLOxrBbGyJM/aVQ+pjj5HCgasFxc0K/KhoATfQ/47AyUl15I2yBUpihjmas+a+VJBOqecrFH+uA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@types/istanbul-lib-coverage": "*"
			}
		},
		"node_modules/@types/istanbul-reports": {
			"version": "3.0.4",
			"resolved": "https://registry.npmjs.org/@types/istanbul-reports/-/istanbul-reports-3.0.4.tgz",
			"integrity": "sha512-pk2B1NWalF9toCRu6gjBzR69syFjP4Od8WRAX+0mmf9lAjCRicLOWc+ZrxZHx/0XRjotgkF9t6iaMJ+aXcOdZQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@types/istanbul-lib-report": "*"
			}
		},
		"node_modules/@types/json-schema": {
			"version": "7.0.15",
			"resolved": "https://registry.npmjs.org/@types/json-schema/-/json-schema-7.0.15.tgz",
			"integrity": "sha512-5+fP8P8MFNC+AyZCDxrB2pkZFPGzqQWUzpSeuuVLvm8VMcorNYavBqoFcxK8bQz4Qsbn4oUEEem4wDLfcysGHA==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@types/mime": {
			"version": "1.3.5",
			"resolved": "https://registry.npmjs.org/@types/mime/-/mime-1.3.5.tgz",
			"integrity": "sha512-/pyBZWSLD2n0dcHE3hq8s8ZvcETHtEuF+3E7XVt0Ig2nvsVQXdghHVcEkIWjy9A0wKfTn97a/PSDYohKIlnP/w==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@types/node": {
			"version": "25.6.0",
			"resolved": "https://registry.npmjs.org/@types/node/-/node-25.6.0.tgz",
			"integrity": "sha512-+qIYRKdNYJwY3vRCZMdJbPLJAtGjQBudzZzdzwQYkEPQd+PJGixUL5QfvCLDaULoLv+RhT3LDkwEfKaAkgSmNQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"undici-types": "~7.19.0"
			}
		},
		"node_modules/@types/node-forge": {
			"version": "1.3.14",
			"resolved": "https://registry.npmjs.org/@types/node-forge/-/node-forge-1.3.14.tgz",
			"integrity": "sha512-mhVF2BnD4BO+jtOp7z1CdzaK4mbuK0LLQYAvdOLqHTavxFNq4zA1EmYkpnFjP8HOUzedfQkRnp0E2ulSAYSzAw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@types/node": "*"
			}
		},
		"node_modules/@types/parse-json": {
			"version": "4.0.2",
			"resolved": "https://registry.npmjs.org/@types/parse-json/-/parse-json-4.0.2.tgz",
			"integrity": "sha512-dISoDXWWQwUquiKsyZ4Ng+HX2KsPL7LyHKHQwgGFEA3IaKac4Obd+h2a/a6waisAoepJlBcx9paWqjA8/HVjCw==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@types/qs": {
			"version": "6.15.0",
			"resolved": "https://registry.npmjs.org/@types/qs/-/qs-6.15.0.tgz",
			"integrity": "sha512-JawvT8iBVWpzTrz3EGw9BTQFg3BQNmwERdKE22vlTxawwtbyUSlMppvZYKLZzB5zgACXdXxbD3m1bXaMqP/9ow==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@types/range-parser": {
			"version": "1.2.7",
			"resolved": "https://registry.npmjs.org/@types/range-parser/-/range-parser-1.2.7.tgz",
			"integrity": "sha512-hKormJbkJqzQGhziax5PItDUTMAM9uE2XXQmM37dyd4hVM+5aVl7oVxMVUiVQn2oCQFN/LKCZdvSM0pFRqbSmQ==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@types/retry": {
			"version": "0.12.2",
			"resolved": "https://registry.npmjs.org/@types/retry/-/retry-0.12.2.tgz",
			"integrity": "sha512-XISRgDJ2Tc5q4TRqvgJtzsRkFYNJzZrhTdtMoGVBttwzzQJkPnS3WWTFc7kuDRoPtPakl+T+OfdEUjYJj7Jbow==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@types/semver": {
			"version": "7.5.8",
			"resolved": "https://registry.npmjs.org/@types/semver/-/semver-7.5.8.tgz",
			"integrity": "sha512-I8EUhyrgfLrcTkzV3TSsGyl1tSuPrEDzr0yd5m90UgNxQkyDXULk3b6MlQqTCpZpNtWe1K0hzclnZkTcLBe2UQ==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@types/send": {
			"version": "1.2.1",
			"resolved": "https://registry.npmjs.org/@types/send/-/send-1.2.1.tgz",
			"integrity": "sha512-arsCikDvlU99zl1g69TcAB3mzZPpxgw0UQnaHeC1Nwb015xp8bknZv5rIfri9xTOcMuaVgvabfIRA7PSZVuZIQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@types/node": "*"
			}
		},
		"node_modules/@types/serve-index": {
			"version": "1.9.4",
			"resolved": "https://registry.npmjs.org/@types/serve-index/-/serve-index-1.9.4.tgz",
			"integrity": "sha512-qLpGZ/c2fhSs5gnYsQxtDEq3Oy8SXPClIXkW5ghvAvsNuVSA8k+gCONcUCS/UjLEYvYps+e8uBtfgXgvhwfNug==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@types/express": "*"
			}
		},
		"node_modules/@types/serve-static": {
			"version": "1.15.10",
			"resolved": "https://registry.npmjs.org/@types/serve-static/-/serve-static-1.15.10.tgz",
			"integrity": "sha512-tRs1dB+g8Itk72rlSI2ZrW6vZg0YrLI81iQSTkMmOqnqCaNr/8Ek4VwWcN5vZgCYWbg/JJSGBlUaYGAOP73qBw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@types/http-errors": "*",
				"@types/node": "*",
				"@types/send": "<1"
			}
		},
		"node_modules/@types/serve-static/node_modules/@types/send": {
			"version": "0.17.6",
			"resolved": "https://registry.npmjs.org/@types/send/-/send-0.17.6.tgz",
			"integrity": "sha512-Uqt8rPBE8SY0RK8JB1EzVOIZ32uqy8HwdxCnoCOsYrvnswqmFZ/k+9Ikidlk/ImhsdvBsloHbAlewb2IEBV/Og==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@types/mime": "^1",
				"@types/node": "*"
			}
		},
		"node_modules/@types/sockjs": {
			"version": "0.3.36",
			"resolved": "https://registry.npmjs.org/@types/sockjs/-/sockjs-0.3.36.tgz",
			"integrity": "sha512-MK9V6NzAS1+Ud7JV9lJLFqW85VbC9dq3LmwZCuBe4wBDgKC0Kj/jd8Xl+nSviU+Qc3+m7umHHyHg//2KSa0a0Q==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@types/node": "*"
			}
		},
		"node_modules/@types/statuses": {
			"version": "2.0.6",
			"resolved": "https://registry.npmjs.org/@types/statuses/-/statuses-2.0.6.tgz",
			"integrity": "sha512-xMAgYwceFhRA2zY+XbEA7mxYbA093wdiW8Vu6gZPGWy9cmOyU9XesH1tNcEWsKFd5Vzrqx5T3D38PWx1FIIXkA==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@types/ws": {
			"version": "8.18.1",
			"resolved": "https://registry.npmjs.org/@types/ws/-/ws-8.18.1.tgz",
			"integrity": "sha512-ThVF6DCVhA8kUGy+aazFQ4kXQ7E1Ty7A3ypFOe0IcJV8O/M511G99AW24irKrW56Wt44yG9+ij8FaqoBGkuBXg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@types/node": "*"
			}
		},
		"node_modules/@types/yargs": {
			"version": "17.0.35",
			"resolved": "https://registry.npmjs.org/@types/yargs/-/yargs-17.0.35.tgz",
			"integrity": "sha512-qUHkeCyQFxMXg79wQfTtfndEC+N9ZZg76HJftDJp+qH2tV7Gj4OJi7l+PiWwJ+pWtW8GwSmqsDj/oymhrTWXjg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@types/yargs-parser": "*"
			}
		},
		"node_modules/@types/yargs-parser": {
			"version": "21.0.3",
			"resolved": "https://registry.npmjs.org/@types/yargs-parser/-/yargs-parser-21.0.3.tgz",
			"integrity": "sha512-I4q9QU9MQv4oEOz4tAHJtNz1cwuLxn2F3xcc2iV5WdqLPpUnj30aUuxt1mAxYTG+oe8CZMV/+6rU4S4gRDzqtQ==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@typescript-eslint/eslint-plugin": {
			"version": "8.56.1",
			"resolved": "https://registry.npmjs.org/@typescript-eslint/eslint-plugin/-/eslint-plugin-8.56.1.tgz",
			"integrity": "sha512-Jz9ZztpB37dNC+HU2HI28Bs9QXpzCz+y/twHOwhyrIRdbuVDxSytJNDl6z/aAKlaRIwC7y8wJdkBv7FxYGgi0A==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@eslint-community/regexpp": "^4.12.2",
				"@typescript-eslint/scope-manager": "8.56.1",
				"@typescript-eslint/type-utils": "8.56.1",
				"@typescript-eslint/utils": "8.56.1",
				"@typescript-eslint/visitor-keys": "8.56.1",
				"ignore": "^7.0.5",
				"natural-compare": "^1.4.0",
				"ts-api-utils": "^2.4.0"
			},
			"engines": {
				"node": "^18.18.0 || ^20.9.0 || >=21.1.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/typescript-eslint"
			},
			"peerDependencies": {
				"@typescript-eslint/parser": "^8.56.1",
				"eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
				"typescript": ">=4.8.4 <6.0.0"
			}
		},
		"node_modules/@typescript-eslint/eslint-plugin/node_modules/@typescript-eslint/project-service": {
			"version": "8.56.1",
			"resolved": "https://registry.npmjs.org/@typescript-eslint/project-service/-/project-service-8.56.1.tgz",
			"integrity": "sha512-TAdqQTzHNNvlVFfR+hu2PDJrURiwKsUvxFn1M0h95BB8ah5jejas08jUWG4dBA68jDMI988IvtfdAI53JzEHOQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@typescript-eslint/tsconfig-utils": "^8.56.1",
				"@typescript-eslint/types": "^8.56.1",
				"debug": "^4.4.3"
			},
			"engines": {
				"node": "^18.18.0 || ^20.9.0 || >=21.1.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/typescript-eslint"
			},
			"peerDependencies": {
				"typescript": ">=4.8.4 <6.0.0"
			}
		},
		"node_modules/@typescript-eslint/eslint-plugin/node_modules/@typescript-eslint/scope-manager": {
			"version": "8.56.1",
			"resolved": "https://registry.npmjs.org/@typescript-eslint/scope-manager/-/scope-manager-8.56.1.tgz",
			"integrity": "sha512-YAi4VDKcIZp0O4tz/haYKhmIDZFEUPOreKbfdAN3SzUDMcPhJ8QI99xQXqX+HoUVq8cs85eRKnD+rne2UAnj2w==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@typescript-eslint/types": "8.56.1",
				"@typescript-eslint/visitor-keys": "8.56.1"
			},
			"engines": {
				"node": "^18.18.0 || ^20.9.0 || >=21.1.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/typescript-eslint"
			}
		},
		"node_modules/@typescript-eslint/eslint-plugin/node_modules/@typescript-eslint/tsconfig-utils": {
			"version": "8.56.1",
			"resolved": "https://registry.npmjs.org/@typescript-eslint/tsconfig-utils/-/tsconfig-utils-8.56.1.tgz",
			"integrity": "sha512-qOtCYzKEeyr3aR9f28mPJqBty7+DBqsdd63eO0yyDwc6vgThj2UjWfJIcsFeSucYydqcuudMOprZ+x1SpF3ZuQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": "^18.18.0 || ^20.9.0 || >=21.1.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/typescript-eslint"
			},
			"peerDependencies": {
				"typescript": ">=4.8.4 <6.0.0"
			}
		},
		"node_modules/@typescript-eslint/eslint-plugin/node_modules/@typescript-eslint/types": {
			"version": "8.56.1",
			"resolved": "https://registry.npmjs.org/@typescript-eslint/types/-/types-8.56.1.tgz",
			"integrity": "sha512-dbMkdIUkIkchgGDIv7KLUpa0Mda4IYjo4IAMJUZ+3xNoUXxMsk9YtKpTHSChRS85o+H9ftm51gsK1dZReY9CVw==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": "^18.18.0 || ^20.9.0 || >=21.1.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/typescript-eslint"
			}
		},
		"node_modules/@typescript-eslint/eslint-plugin/node_modules/@typescript-eslint/typescript-estree": {
			"version": "8.56.1",
			"resolved": "https://registry.npmjs.org/@typescript-eslint/typescript-estree/-/typescript-estree-8.56.1.tgz",
			"integrity": "sha512-qzUL1qgalIvKWAf9C1HpvBjif+Vm6rcT5wZd4VoMb9+Km3iS3Cv9DY6dMRMDtPnwRAFyAi7YXJpTIEXLvdfPxg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@typescript-eslint/project-service": "8.56.1",
				"@typescript-eslint/tsconfig-utils": "8.56.1",
				"@typescript-eslint/types": "8.56.1",
				"@typescript-eslint/visitor-keys": "8.56.1",
				"debug": "^4.4.3",
				"minimatch": "^10.2.2",
				"semver": "^7.7.3",
				"tinyglobby": "^0.2.15",
				"ts-api-utils": "^2.4.0"
			},
			"engines": {
				"node": "^18.18.0 || ^20.9.0 || >=21.1.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/typescript-eslint"
			},
			"peerDependencies": {
				"typescript": ">=4.8.4 <6.0.0"
			}
		},
		"node_modules/@typescript-eslint/eslint-plugin/node_modules/@typescript-eslint/utils": {
			"version": "8.56.1",
			"resolved": "https://registry.npmjs.org/@typescript-eslint/utils/-/utils-8.56.1.tgz",
			"integrity": "sha512-HPAVNIME3tABJ61siYlHzSWCGtOoeP2RTIaHXFMPqjrQKCGB9OgUVdiNgH7TJS2JNIQ5qQ4RsAUDuGaGme/KOA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@eslint-community/eslint-utils": "^4.9.1",
				"@typescript-eslint/scope-manager": "8.56.1",
				"@typescript-eslint/types": "8.56.1",
				"@typescript-eslint/typescript-estree": "8.56.1"
			},
			"engines": {
				"node": "^18.18.0 || ^20.9.0 || >=21.1.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/typescript-eslint"
			},
			"peerDependencies": {
				"eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
				"typescript": ">=4.8.4 <6.0.0"
			}
		},
		"node_modules/@typescript-eslint/eslint-plugin/node_modules/@typescript-eslint/visitor-keys": {
			"version": "8.56.1",
			"resolved": "https://registry.npmjs.org/@typescript-eslint/visitor-keys/-/visitor-keys-8.56.1.tgz",
			"integrity": "sha512-KiROIzYdEV85YygXw6BI/Dx4fnBlFQu6Mq4QE4MOH9fFnhohw6wX/OAvDY2/C+ut0I3RSPKenvZJIVYqJNkhEw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@typescript-eslint/types": "8.56.1",
				"eslint-visitor-keys": "^5.0.0"
			},
			"engines": {
				"node": "^18.18.0 || ^20.9.0 || >=21.1.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/typescript-eslint"
			}
		},
		"node_modules/@typescript-eslint/eslint-plugin/node_modules/eslint-visitor-keys": {
			"version": "5.0.1",
			"resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-5.0.1.tgz",
			"integrity": "sha512-tD40eHxA35h0PEIZNeIjkHoDR4YjjJp34biM0mDvplBe//mB+IHCqHDGV7pxF+7MklTvighcCPPZC7ynWyjdTA==",
			"dev": true,
			"license": "Apache-2.0",
			"engines": {
				"node": "^20.19.0 || ^22.13.0 || >=24"
			},
			"funding": {
				"url": "https://opencollective.com/eslint"
			}
		},
		"node_modules/@typescript-eslint/parser": {
			"version": "8.56.1",
			"resolved": "https://registry.npmjs.org/@typescript-eslint/parser/-/parser-8.56.1.tgz",
			"integrity": "sha512-klQbnPAAiGYFyI02+znpBRLyjL4/BrBd0nyWkdC0s/6xFLkXYQ8OoRrSkqacS1ddVxf/LDyODIKbQ5TgKAf/Fg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@typescript-eslint/scope-manager": "8.56.1",
				"@typescript-eslint/types": "8.56.1",
				"@typescript-eslint/typescript-estree": "8.56.1",
				"@typescript-eslint/visitor-keys": "8.56.1",
				"debug": "^4.4.3"
			},
			"engines": {
				"node": "^18.18.0 || ^20.9.0 || >=21.1.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/typescript-eslint"
			},
			"peerDependencies": {
				"eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
				"typescript": ">=4.8.4 <6.0.0"
			}
		},
		"node_modules/@typescript-eslint/parser/node_modules/@typescript-eslint/project-service": {
			"version": "8.56.1",
			"resolved": "https://registry.npmjs.org/@typescript-eslint/project-service/-/project-service-8.56.1.tgz",
			"integrity": "sha512-TAdqQTzHNNvlVFfR+hu2PDJrURiwKsUvxFn1M0h95BB8ah5jejas08jUWG4dBA68jDMI988IvtfdAI53JzEHOQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@typescript-eslint/tsconfig-utils": "^8.56.1",
				"@typescript-eslint/types": "^8.56.1",
				"debug": "^4.4.3"
			},
			"engines": {
				"node": "^18.18.0 || ^20.9.0 || >=21.1.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/typescript-eslint"
			},
			"peerDependencies": {
				"typescript": ">=4.8.4 <6.0.0"
			}
		},
		"node_modules/@typescript-eslint/parser/node_modules/@typescript-eslint/scope-manager": {
			"version": "8.56.1",
			"resolved": "https://registry.npmjs.org/@typescript-eslint/scope-manager/-/scope-manager-8.56.1.tgz",
			"integrity": "sha512-YAi4VDKcIZp0O4tz/haYKhmIDZFEUPOreKbfdAN3SzUDMcPhJ8QI99xQXqX+HoUVq8cs85eRKnD+rne2UAnj2w==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@typescript-eslint/types": "8.56.1",
				"@typescript-eslint/visitor-keys": "8.56.1"
			},
			"engines": {
				"node": "^18.18.0 || ^20.9.0 || >=21.1.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/typescript-eslint"
			}
		},
		"node_modules/@typescript-eslint/parser/node_modules/@typescript-eslint/tsconfig-utils": {
			"version": "8.56.1",
			"resolved": "https://registry.npmjs.org/@typescript-eslint/tsconfig-utils/-/tsconfig-utils-8.56.1.tgz",
			"integrity": "sha512-qOtCYzKEeyr3aR9f28mPJqBty7+DBqsdd63eO0yyDwc6vgThj2UjWfJIcsFeSucYydqcuudMOprZ+x1SpF3ZuQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": "^18.18.0 || ^20.9.0 || >=21.1.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/typescript-eslint"
			},
			"peerDependencies": {
				"typescript": ">=4.8.4 <6.0.0"
			}
		},
		"node_modules/@typescript-eslint/parser/node_modules/@typescript-eslint/types": {
			"version": "8.56.1",
			"resolved": "https://registry.npmjs.org/@typescript-eslint/types/-/types-8.56.1.tgz",
			"integrity": "sha512-dbMkdIUkIkchgGDIv7KLUpa0Mda4IYjo4IAMJUZ+3xNoUXxMsk9YtKpTHSChRS85o+H9ftm51gsK1dZReY9CVw==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": "^18.18.0 || ^20.9.0 || >=21.1.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/typescript-eslint"
			}
		},
		"node_modules/@typescript-eslint/parser/node_modules/@typescript-eslint/typescript-estree": {
			"version": "8.56.1",
			"resolved": "https://registry.npmjs.org/@typescript-eslint/typescript-estree/-/typescript-estree-8.56.1.tgz",
			"integrity": "sha512-qzUL1qgalIvKWAf9C1HpvBjif+Vm6rcT5wZd4VoMb9+Km3iS3Cv9DY6dMRMDtPnwRAFyAi7YXJpTIEXLvdfPxg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@typescript-eslint/project-service": "8.56.1",
				"@typescript-eslint/tsconfig-utils": "8.56.1",
				"@typescript-eslint/types": "8.56.1",
				"@typescript-eslint/visitor-keys": "8.56.1",
				"debug": "^4.4.3",
				"minimatch": "^10.2.2",
				"semver": "^7.7.3",
				"tinyglobby": "^0.2.15",
				"ts-api-utils": "^2.4.0"
			},
			"engines": {
				"node": "^18.18.0 || ^20.9.0 || >=21.1.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/typescript-eslint"
			},
			"peerDependencies": {
				"typescript": ">=4.8.4 <6.0.0"
			}
		},
		"node_modules/@typescript-eslint/parser/node_modules/@typescript-eslint/visitor-keys": {
			"version": "8.56.1",
			"resolved": "https://registry.npmjs.org/@typescript-eslint/visitor-keys/-/visitor-keys-8.56.1.tgz",
			"integrity": "sha512-KiROIzYdEV85YygXw6BI/Dx4fnBlFQu6Mq4QE4MOH9fFnhohw6wX/OAvDY2/C+ut0I3RSPKenvZJIVYqJNkhEw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@typescript-eslint/types": "8.56.1",
				"eslint-visitor-keys": "^5.0.0"
			},
			"engines": {
				"node": "^18.18.0 || ^20.9.0 || >=21.1.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/typescript-eslint"
			}
		},
		"node_modules/@typescript-eslint/parser/node_modules/eslint-visitor-keys": {
			"version": "5.0.1",
			"resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-5.0.1.tgz",
			"integrity": "sha512-tD40eHxA35h0PEIZNeIjkHoDR4YjjJp34biM0mDvplBe//mB+IHCqHDGV7pxF+7MklTvighcCPPZC7ynWyjdTA==",
			"dev": true,
			"license": "Apache-2.0",
			"engines": {
				"node": "^20.19.0 || ^22.13.0 || >=24"
			},
			"funding": {
				"url": "https://opencollective.com/eslint"
			}
		},
		"node_modules/@typescript-eslint/project-service": {
			"version": "8.58.0",
			"resolved": "https://registry.npmjs.org/@typescript-eslint/project-service/-/project-service-8.58.0.tgz",
			"integrity": "sha512-8Q/wBPWLQP1j16NxoPNIKpDZFMaxl7yWIoqXWYeWO+Bbd2mjgvoF0dxP2jKZg5+x49rgKdf7Ck473M8PC3V9lg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@typescript-eslint/tsconfig-utils": "^8.58.0",
				"@typescript-eslint/types": "^8.58.0",
				"debug": "^4.4.3"
			},
			"engines": {
				"node": "^18.18.0 || ^20.9.0 || >=21.1.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/typescript-eslint"
			},
			"peerDependencies": {
				"typescript": ">=4.8.4 <6.1.0"
			}
		},
		"node_modules/@typescript-eslint/scope-manager": {
			"version": "8.58.0",
			"resolved": "https://registry.npmjs.org/@typescript-eslint/scope-manager/-/scope-manager-8.58.0.tgz",
			"integrity": "sha512-W1Lur1oF50FxSnNdGp3Vs6P+yBRSmZiw4IIjEeYxd8UQJwhUF0gDgDD/W/Tgmh73mxgEU3qX0Bzdl/NGuSPEpQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@typescript-eslint/types": "8.58.0",
				"@typescript-eslint/visitor-keys": "8.58.0"
			},
			"engines": {
				"node": "^18.18.0 || ^20.9.0 || >=21.1.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/typescript-eslint"
			}
		},
		"node_modules/@typescript-eslint/tsconfig-utils": {
			"version": "8.58.0",
			"resolved": "https://registry.npmjs.org/@typescript-eslint/tsconfig-utils/-/tsconfig-utils-8.58.0.tgz",
			"integrity": "sha512-doNSZEVJsWEu4htiVC+PR6NpM+pa+a4ClH9INRWOWCUzMst/VA9c4gXq92F8GUD1rwhNvRLkgjfYtFXegXQF7A==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": "^18.18.0 || ^20.9.0 || >=21.1.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/typescript-eslint"
			},
			"peerDependencies": {
				"typescript": ">=4.8.4 <6.1.0"
			}
		},
		"node_modules/@typescript-eslint/type-utils": {
			"version": "8.56.1",
			"resolved": "https://registry.npmjs.org/@typescript-eslint/type-utils/-/type-utils-8.56.1.tgz",
			"integrity": "sha512-yB/7dxi7MgTtGhZdaHCemf7PuwrHMenHjmzgUW1aJpO+bBU43OycnM3Wn+DdvDO/8zzA9HlhaJ0AUGuvri4oGg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@typescript-eslint/types": "8.56.1",
				"@typescript-eslint/typescript-estree": "8.56.1",
				"@typescript-eslint/utils": "8.56.1",
				"debug": "^4.4.3",
				"ts-api-utils": "^2.4.0"
			},
			"engines": {
				"node": "^18.18.0 || ^20.9.0 || >=21.1.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/typescript-eslint"
			},
			"peerDependencies": {
				"eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
				"typescript": ">=4.8.4 <6.0.0"
			}
		},
		"node_modules/@typescript-eslint/type-utils/node_modules/@typescript-eslint/project-service": {
			"version": "8.56.1",
			"resolved": "https://registry.npmjs.org/@typescript-eslint/project-service/-/project-service-8.56.1.tgz",
			"integrity": "sha512-TAdqQTzHNNvlVFfR+hu2PDJrURiwKsUvxFn1M0h95BB8ah5jejas08jUWG4dBA68jDMI988IvtfdAI53JzEHOQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@typescript-eslint/tsconfig-utils": "^8.56.1",
				"@typescript-eslint/types": "^8.56.1",
				"debug": "^4.4.3"
			},
			"engines": {
				"node": "^18.18.0 || ^20.9.0 || >=21.1.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/typescript-eslint"
			},
			"peerDependencies": {
				"typescript": ">=4.8.4 <6.0.0"
			}
		},
		"node_modules/@typescript-eslint/type-utils/node_modules/@typescript-eslint/scope-manager": {
			"version": "8.56.1",
			"resolved": "https://registry.npmjs.org/@typescript-eslint/scope-manager/-/scope-manager-8.56.1.tgz",
			"integrity": "sha512-YAi4VDKcIZp0O4tz/haYKhmIDZFEUPOreKbfdAN3SzUDMcPhJ8QI99xQXqX+HoUVq8cs85eRKnD+rne2UAnj2w==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@typescript-eslint/types": "8.56.1",
				"@typescript-eslint/visitor-keys": "8.56.1"
			},
			"engines": {
				"node": "^18.18.0 || ^20.9.0 || >=21.1.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/typescript-eslint"
			}
		},
		"node_modules/@typescript-eslint/type-utils/node_modules/@typescript-eslint/tsconfig-utils": {
			"version": "8.56.1",
			"resolved": "https://registry.npmjs.org/@typescript-eslint/tsconfig-utils/-/tsconfig-utils-8.56.1.tgz",
			"integrity": "sha512-qOtCYzKEeyr3aR9f28mPJqBty7+DBqsdd63eO0yyDwc6vgThj2UjWfJIcsFeSucYydqcuudMOprZ+x1SpF3ZuQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": "^18.18.0 || ^20.9.0 || >=21.1.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/typescript-eslint"
			},
			"peerDependencies": {
				"typescript": ">=4.8.4 <6.0.0"
			}
		},
		"node_modules/@typescript-eslint/type-utils/node_modules/@typescript-eslint/types": {
			"version": "8.56.1",
			"resolved": "https://registry.npmjs.org/@typescript-eslint/types/-/types-8.56.1.tgz",
			"integrity": "sha512-dbMkdIUkIkchgGDIv7KLUpa0Mda4IYjo4IAMJUZ+3xNoUXxMsk9YtKpTHSChRS85o+H9ftm51gsK1dZReY9CVw==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": "^18.18.0 || ^20.9.0 || >=21.1.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/typescript-eslint"
			}
		},
		"node_modules/@typescript-eslint/type-utils/node_modules/@typescript-eslint/typescript-estree": {
			"version": "8.56.1",
			"resolved": "https://registry.npmjs.org/@typescript-eslint/typescript-estree/-/typescript-estree-8.56.1.tgz",
			"integrity": "sha512-qzUL1qgalIvKWAf9C1HpvBjif+Vm6rcT5wZd4VoMb9+Km3iS3Cv9DY6dMRMDtPnwRAFyAi7YXJpTIEXLvdfPxg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@typescript-eslint/project-service": "8.56.1",
				"@typescript-eslint/tsconfig-utils": "8.56.1",
				"@typescript-eslint/types": "8.56.1",
				"@typescript-eslint/visitor-keys": "8.56.1",
				"debug": "^4.4.3",
				"minimatch": "^10.2.2",
				"semver": "^7.7.3",
				"tinyglobby": "^0.2.15",
				"ts-api-utils": "^2.4.0"
			},
			"engines": {
				"node": "^18.18.0 || ^20.9.0 || >=21.1.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/typescript-eslint"
			},
			"peerDependencies": {
				"typescript": ">=4.8.4 <6.0.0"
			}
		},
		"node_modules/@typescript-eslint/type-utils/node_modules/@typescript-eslint/utils": {
			"version": "8.56.1",
			"resolved": "https://registry.npmjs.org/@typescript-eslint/utils/-/utils-8.56.1.tgz",
			"integrity": "sha512-HPAVNIME3tABJ61siYlHzSWCGtOoeP2RTIaHXFMPqjrQKCGB9OgUVdiNgH7TJS2JNIQ5qQ4RsAUDuGaGme/KOA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@eslint-community/eslint-utils": "^4.9.1",
				"@typescript-eslint/scope-manager": "8.56.1",
				"@typescript-eslint/types": "8.56.1",
				"@typescript-eslint/typescript-estree": "8.56.1"
			},
			"engines": {
				"node": "^18.18.0 || ^20.9.0 || >=21.1.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/typescript-eslint"
			},
			"peerDependencies": {
				"eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
				"typescript": ">=4.8.4 <6.0.0"
			}
		},
		"node_modules/@typescript-eslint/type-utils/node_modules/@typescript-eslint/visitor-keys": {
			"version": "8.56.1",
			"resolved": "https://registry.npmjs.org/@typescript-eslint/visitor-keys/-/visitor-keys-8.56.1.tgz",
			"integrity": "sha512-KiROIzYdEV85YygXw6BI/Dx4fnBlFQu6Mq4QE4MOH9fFnhohw6wX/OAvDY2/C+ut0I3RSPKenvZJIVYqJNkhEw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@typescript-eslint/types": "8.56.1",
				"eslint-visitor-keys": "^5.0.0"
			},
			"engines": {
				"node": "^18.18.0 || ^20.9.0 || >=21.1.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/typescript-eslint"
			}
		},
		"node_modules/@typescript-eslint/type-utils/node_modules/eslint-visitor-keys": {
			"version": "5.0.1",
			"resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-5.0.1.tgz",
			"integrity": "sha512-tD40eHxA35h0PEIZNeIjkHoDR4YjjJp34biM0mDvplBe//mB+IHCqHDGV7pxF+7MklTvighcCPPZC7ynWyjdTA==",
			"dev": true,
			"license": "Apache-2.0",
			"engines": {
				"node": "^20.19.0 || ^22.13.0 || >=24"
			},
			"funding": {
				"url": "https://opencollective.com/eslint"
			}
		},
		"node_modules/@typescript-eslint/types": {
			"version": "8.58.0",
			"resolved": "https://registry.npmjs.org/@typescript-eslint/types/-/types-8.58.0.tgz",
			"integrity": "sha512-O9CjxypDT89fbHxRfETNoAnHj/i6IpRK0CvbVN3qibxlLdo5p5hcLmUuCCrHMpxiWSwKyI8mCP7qRNYuOJ0Uww==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": "^18.18.0 || ^20.9.0 || >=21.1.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/typescript-eslint"
			}
		},
		"node_modules/@typescript-eslint/typescript-estree": {
			"version": "8.58.0",
			"resolved": "https://registry.npmjs.org/@typescript-eslint/typescript-estree/-/typescript-estree-8.58.0.tgz",
			"integrity": "sha512-7vv5UWbHqew/dvs+D3e1RvLv1v2eeZ9txRHPnEEBUgSNLx5ghdzjHa0sgLWYVKssH+lYmV0JaWdoubo0ncGYLA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@typescript-eslint/project-service": "8.58.0",
				"@typescript-eslint/tsconfig-utils": "8.58.0",
				"@typescript-eslint/types": "8.58.0",
				"@typescript-eslint/visitor-keys": "8.58.0",
				"debug": "^4.4.3",
				"minimatch": "^10.2.2",
				"semver": "^7.7.3",
				"tinyglobby": "^0.2.15",
				"ts-api-utils": "^2.5.0"
			},
			"engines": {
				"node": "^18.18.0 || ^20.9.0 || >=21.1.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/typescript-eslint"
			},
			"peerDependencies": {
				"typescript": ">=4.8.4 <6.1.0"
			}
		},
		"node_modules/@typescript-eslint/utils": {
			"version": "8.58.0",
			"resolved": "https://registry.npmjs.org/@typescript-eslint/utils/-/utils-8.58.0.tgz",
			"integrity": "sha512-RfeSqcFeHMHlAWzt4TBjWOAtoW9lnsAGiP3GbaX9uVgTYYrMbVnGONEfUCiSss+xMHFl+eHZiipmA8WkQ7FuNA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@eslint-community/eslint-utils": "^4.9.1",
				"@typescript-eslint/scope-manager": "8.58.0",
				"@typescript-eslint/types": "8.58.0",
				"@typescript-eslint/typescript-estree": "8.58.0"
			},
			"engines": {
				"node": "^18.18.0 || ^20.9.0 || >=21.1.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/typescript-eslint"
			},
			"peerDependencies": {
				"eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
				"typescript": ">=4.8.4 <6.1.0"
			}
		},
		"node_modules/@typescript-eslint/visitor-keys": {
			"version": "8.58.0",
			"resolved": "https://registry.npmjs.org/@typescript-eslint/visitor-keys/-/visitor-keys-8.58.0.tgz",
			"integrity": "sha512-XJ9UD9+bbDo4a4epraTwG3TsNPeiB9aShrUneAVXy8q4LuwowN+qu89/6ByLMINqvIMeI9H9hOHQtg/ijrYXzQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@typescript-eslint/types": "8.58.0",
				"eslint-visitor-keys": "^5.0.0"
			},
			"engines": {
				"node": "^18.18.0 || ^20.9.0 || >=21.1.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/typescript-eslint"
			}
		},
		"node_modules/@typescript-eslint/visitor-keys/node_modules/eslint-visitor-keys": {
			"version": "5.0.1",
			"resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-5.0.1.tgz",
			"integrity": "sha512-tD40eHxA35h0PEIZNeIjkHoDR4YjjJp34biM0mDvplBe//mB+IHCqHDGV7pxF+7MklTvighcCPPZC7ynWyjdTA==",
			"dev": true,
			"license": "Apache-2.0",
			"engines": {
				"node": "^20.19.0 || ^22.13.0 || >=24"
			},
			"funding": {
				"url": "https://opencollective.com/eslint"
			}
		},
		"node_modules/@ungap/structured-clone": {
			"version": "1.3.0",
			"resolved": "https://registry.npmjs.org/@ungap/structured-clone/-/structured-clone-1.3.0.tgz",
			"integrity": "sha512-WmoN8qaIAo7WTYWbAZuG8PYEhn5fkz7dZrqTBZ7dtt//lL2Gwms1IcnQ5yHqjDfX8Ft5j4YzDM23f87zBfDe9g==",
			"dev": true,
			"license": "ISC"
		},
		"node_modules/@vitejs/plugin-basic-ssl": {
			"version": "2.1.4",
			"resolved": "https://registry.npmjs.org/@vitejs/plugin-basic-ssl/-/plugin-basic-ssl-2.1.4.tgz",
			"integrity": "sha512-HXciTXN/sDBYWgeAD4V4s0DN0g72x5mlxQhHxtYu3Tt8BLa6MzcJZUyDVFCdtjNs3bfENVHVzOsmooTVuNgAAw==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": "^18.0.0 || ^20.0.0 || >=22.0.0"
			},
			"peerDependencies": {
				"vite": "^6.0.0 || ^7.0.0"
			}
		},
		"node_modules/@vitest/expect": {
			"version": "4.1.2",
			"resolved": "https://registry.npmjs.org/@vitest/expect/-/expect-4.1.2.tgz",
			"integrity": "sha512-gbu+7B0YgUJ2nkdsRJrFFW6X7NTP44WlhiclHniUhxADQJH5Szt9mZ9hWnJPJ8YwOK5zUOSSlSvyzRf0u1DSBQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@standard-schema/spec": "^1.1.0",
				"@types/chai": "^5.2.2",
				"@vitest/spy": "4.1.2",
				"@vitest/utils": "4.1.2",
				"chai": "^6.2.2",
				"tinyrainbow": "^3.1.0"
			},
			"funding": {
				"url": "https://opencollective.com/vitest"
			}
		},
		"node_modules/@vitest/mocker": {
			"version": "4.1.2",
			"resolved": "https://registry.npmjs.org/@vitest/mocker/-/mocker-4.1.2.tgz",
			"integrity": "sha512-Ize4iQtEALHDttPRCmN+FKqOl2vxTiNUhzobQFFt/BM1lRUTG7zRCLOykG/6Vo4E4hnUdfVLo5/eqKPukcWW7Q==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@vitest/spy": "4.1.2",
				"estree-walker": "^3.0.3",
				"magic-string": "^0.30.21"
			},
			"funding": {
				"url": "https://opencollective.com/vitest"
			},
			"peerDependencies": {
				"msw": "^2.4.9",
				"vite": "^6.0.0 || ^7.0.0 || ^8.0.0"
			},
			"peerDependenciesMeta": {
				"msw": {
					"optional": true
				},
				"vite": {
					"optional": true
				}
			}
		},
		"node_modules/@vitest/pretty-format": {
			"version": "4.1.2",
			"resolved": "https://registry.npmjs.org/@vitest/pretty-format/-/pretty-format-4.1.2.tgz",
			"integrity": "sha512-dwQga8aejqeuB+TvXCMzSQemvV9hNEtDDpgUKDzOmNQayl2OG241PSWeJwKRH3CiC+sESrmoFd49rfnq7T4RnA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"tinyrainbow": "^3.1.0"
			},
			"funding": {
				"url": "https://opencollective.com/vitest"
			}
		},
		"node_modules/@vitest/runner": {
			"version": "4.1.2",
			"resolved": "https://registry.npmjs.org/@vitest/runner/-/runner-4.1.2.tgz",
			"integrity": "sha512-Gr+FQan34CdiYAwpGJmQG8PgkyFVmARK8/xSijia3eTFgVfpcpztWLuP6FttGNfPLJhaZVP/euvujeNYar36OQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@vitest/utils": "4.1.2",
				"pathe": "^2.0.3"
			},
			"funding": {
				"url": "https://opencollective.com/vitest"
			}
		},
		"node_modules/@vitest/snapshot": {
			"version": "4.1.2",
			"resolved": "https://registry.npmjs.org/@vitest/snapshot/-/snapshot-4.1.2.tgz",
			"integrity": "sha512-g7yfUmxYS4mNxk31qbOYsSt2F4m1E02LFqO53Xpzg3zKMhLAPZAjjfyl9e6z7HrW6LvUdTwAQR3HHfLjpko16A==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@vitest/pretty-format": "4.1.2",
				"@vitest/utils": "4.1.2",
				"magic-string": "^0.30.21",
				"pathe": "^2.0.3"
			},
			"funding": {
				"url": "https://opencollective.com/vitest"
			}
		},
		"node_modules/@vitest/spy": {
			"version": "4.1.2",
			"resolved": "https://registry.npmjs.org/@vitest/spy/-/spy-4.1.2.tgz",
			"integrity": "sha512-DU4fBnbVCJGNBwVA6xSToNXrkZNSiw59H8tcuUspVMsBDBST4nfvsPsEHDHGtWRRnqBERBQu7TrTKskmjqTXKA==",
			"dev": true,
			"license": "MIT",
			"funding": {
				"url": "https://opencollective.com/vitest"
			}
		},
		"node_modules/@vitest/utils": {
			"version": "4.1.2",
			"resolved": "https://registry.npmjs.org/@vitest/utils/-/utils-4.1.2.tgz",
			"integrity": "sha512-xw2/TiX82lQHA06cgbqRKFb5lCAy3axQ4H4SoUFhUsg+wztiet+co86IAMDtF6Vm1hc7J6j09oh/rgDn+JdKIQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@vitest/pretty-format": "4.1.2",
				"convert-source-map": "^2.0.0",
				"tinyrainbow": "^3.1.0"
			},
			"funding": {
				"url": "https://opencollective.com/vitest"
			}
		},
		"node_modules/@vitest/utils/node_modules/convert-source-map": {
			"version": "2.0.0",
			"resolved": "https://registry.npmjs.org/convert-source-map/-/convert-source-map-2.0.0.tgz",
			"integrity": "sha512-Kvp459HrV2FEJ1CAsi1Ku+MY3kasH19TFykTz2xWmMeq6bk2NU3XXvfJ+Q61m0xktWwt+1HSYf3JZsTms3aRJg==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@webassemblyjs/ast": {
			"version": "1.14.1",
			"resolved": "https://registry.npmjs.org/@webassemblyjs/ast/-/ast-1.14.1.tgz",
			"integrity": "sha512-nuBEDgQfm1ccRp/8bCQrx1frohyufl4JlbMMZ4P1wpeOfDhF6FQkxZJ1b/e+PLwr6X1Nhw6OLme5usuBWYBvuQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@webassemblyjs/helper-numbers": "1.13.2",
				"@webassemblyjs/helper-wasm-bytecode": "1.13.2"
			}
		},
		"node_modules/@webassemblyjs/floating-point-hex-parser": {
			"version": "1.13.2",
			"resolved": "https://registry.npmjs.org/@webassemblyjs/floating-point-hex-parser/-/floating-point-hex-parser-1.13.2.tgz",
			"integrity": "sha512-6oXyTOzbKxGH4steLbLNOu71Oj+C8Lg34n6CqRvqfS2O71BxY6ByfMDRhBytzknj9yGUPVJ1qIKhRlAwO1AovA==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@webassemblyjs/helper-api-error": {
			"version": "1.13.2",
			"resolved": "https://registry.npmjs.org/@webassemblyjs/helper-api-error/-/helper-api-error-1.13.2.tgz",
			"integrity": "sha512-U56GMYxy4ZQCbDZd6JuvvNV/WFildOjsaWD3Tzzvmw/mas3cXzRJPMjP83JqEsgSbyrmaGjBfDtV7KDXV9UzFQ==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@webassemblyjs/helper-buffer": {
			"version": "1.14.1",
			"resolved": "https://registry.npmjs.org/@webassemblyjs/helper-buffer/-/helper-buffer-1.14.1.tgz",
			"integrity": "sha512-jyH7wtcHiKssDtFPRB+iQdxlDf96m0E39yb0k5uJVhFGleZFoNw1c4aeIcVUPPbXUVJ94wwnMOAqUHyzoEPVMA==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@webassemblyjs/helper-numbers": {
			"version": "1.13.2",
			"resolved": "https://registry.npmjs.org/@webassemblyjs/helper-numbers/-/helper-numbers-1.13.2.tgz",
			"integrity": "sha512-FE8aCmS5Q6eQYcV3gI35O4J789wlQA+7JrqTTpJqn5emA4U2hvwJmvFRC0HODS+3Ye6WioDklgd6scJ3+PLnEA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@webassemblyjs/floating-point-hex-parser": "1.13.2",
				"@webassemblyjs/helper-api-error": "1.13.2",
				"@xtuc/long": "4.2.2"
			}
		},
		"node_modules/@webassemblyjs/helper-wasm-bytecode": {
			"version": "1.13.2",
			"resolved": "https://registry.npmjs.org/@webassemblyjs/helper-wasm-bytecode/-/helper-wasm-bytecode-1.13.2.tgz",
			"integrity": "sha512-3QbLKy93F0EAIXLh0ogEVR6rOubA9AoZ+WRYhNbFyuB70j3dRdwH9g+qXhLAO0kiYGlg3TxDV+I4rQTr/YNXkA==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@webassemblyjs/helper-wasm-section": {
			"version": "1.14.1",
			"resolved": "https://registry.npmjs.org/@webassemblyjs/helper-wasm-section/-/helper-wasm-section-1.14.1.tgz",
			"integrity": "sha512-ds5mXEqTJ6oxRoqjhWDU83OgzAYjwsCV8Lo/N+oRsNDmx/ZDpqalmrtgOMkHwxsG0iI//3BwWAErYRHtgn0dZw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@webassemblyjs/ast": "1.14.1",
				"@webassemblyjs/helper-buffer": "1.14.1",
				"@webassemblyjs/helper-wasm-bytecode": "1.13.2",
				"@webassemblyjs/wasm-gen": "1.14.1"
			}
		},
		"node_modules/@webassemblyjs/ieee754": {
			"version": "1.13.2",
			"resolved": "https://registry.npmjs.org/@webassemblyjs/ieee754/-/ieee754-1.13.2.tgz",
			"integrity": "sha512-4LtOzh58S/5lX4ITKxnAK2USuNEvpdVV9AlgGQb8rJDHaLeHciwG4zlGr0j/SNWlr7x3vO1lDEsuePvtcDNCkw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@xtuc/ieee754": "^1.2.0"
			}
		},
		"node_modules/@webassemblyjs/leb128": {
			"version": "1.13.2",
			"resolved": "https://registry.npmjs.org/@webassemblyjs/leb128/-/leb128-1.13.2.tgz",
			"integrity": "sha512-Lde1oNoIdzVzdkNEAWZ1dZ5orIbff80YPdHx20mrHwHrVNNTjNr8E3xz9BdpcGqRQbAEa+fkrCb+fRFTl/6sQw==",
			"dev": true,
			"license": "Apache-2.0",
			"dependencies": {
				"@xtuc/long": "4.2.2"
			}
		},
		"node_modules/@webassemblyjs/utf8": {
			"version": "1.13.2",
			"resolved": "https://registry.npmjs.org/@webassemblyjs/utf8/-/utf8-1.13.2.tgz",
			"integrity": "sha512-3NQWGjKTASY1xV5m7Hr0iPeXD9+RDobLll3T9d2AO+g3my8xy5peVyjSag4I50mR1bBSN/Ct12lo+R9tJk0NZQ==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@webassemblyjs/wasm-edit": {
			"version": "1.14.1",
			"resolved": "https://registry.npmjs.org/@webassemblyjs/wasm-edit/-/wasm-edit-1.14.1.tgz",
			"integrity": "sha512-RNJUIQH/J8iA/1NzlE4N7KtyZNHi3w7at7hDjvRNm5rcUXa00z1vRz3glZoULfJ5mpvYhLybmVcwcjGrC1pRrQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@webassemblyjs/ast": "1.14.1",
				"@webassemblyjs/helper-buffer": "1.14.1",
				"@webassemblyjs/helper-wasm-bytecode": "1.13.2",
				"@webassemblyjs/helper-wasm-section": "1.14.1",
				"@webassemblyjs/wasm-gen": "1.14.1",
				"@webassemblyjs/wasm-opt": "1.14.1",
				"@webassemblyjs/wasm-parser": "1.14.1",
				"@webassemblyjs/wast-printer": "1.14.1"
			}
		},
		"node_modules/@webassemblyjs/wasm-gen": {
			"version": "1.14.1",
			"resolved": "https://registry.npmjs.org/@webassemblyjs/wasm-gen/-/wasm-gen-1.14.1.tgz",
			"integrity": "sha512-AmomSIjP8ZbfGQhumkNvgC33AY7qtMCXnN6bL2u2Js4gVCg8fp735aEiMSBbDR7UQIj90n4wKAFUSEd0QN2Ukg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@webassemblyjs/ast": "1.14.1",
				"@webassemblyjs/helper-wasm-bytecode": "1.13.2",
				"@webassemblyjs/ieee754": "1.13.2",
				"@webassemblyjs/leb128": "1.13.2",
				"@webassemblyjs/utf8": "1.13.2"
			}
		},
		"node_modules/@webassemblyjs/wasm-opt": {
			"version": "1.14.1",
			"resolved": "https://registry.npmjs.org/@webassemblyjs/wasm-opt/-/wasm-opt-1.14.1.tgz",
			"integrity": "sha512-PTcKLUNvBqnY2U6E5bdOQcSM+oVP/PmrDY9NzowJjislEjwP/C4an2303MCVS2Mg9d3AJpIGdUFIQQWbPds0Sw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@webassemblyjs/ast": "1.14.1",
				"@webassemblyjs/helper-buffer": "1.14.1",
				"@webassemblyjs/wasm-gen": "1.14.1",
				"@webassemblyjs/wasm-parser": "1.14.1"
			}
		},
		"node_modules/@webassemblyjs/wasm-parser": {
			"version": "1.14.1",
			"resolved": "https://registry.npmjs.org/@webassemblyjs/wasm-parser/-/wasm-parser-1.14.1.tgz",
			"integrity": "sha512-JLBl+KZ0R5qB7mCnud/yyX08jWFw5MsoalJ1pQ4EdFlgj9VdXKGuENGsiCIjegI1W7p91rUlcB/LB5yRJKNTcQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@webassemblyjs/ast": "1.14.1",
				"@webassemblyjs/helper-api-error": "1.13.2",
				"@webassemblyjs/helper-wasm-bytecode": "1.13.2",
				"@webassemblyjs/ieee754": "1.13.2",
				"@webassemblyjs/leb128": "1.13.2",
				"@webassemblyjs/utf8": "1.13.2"
			}
		},
		"node_modules/@webassemblyjs/wast-printer": {
			"version": "1.14.1",
			"resolved": "https://registry.npmjs.org/@webassemblyjs/wast-printer/-/wast-printer-1.14.1.tgz",
			"integrity": "sha512-kPSSXE6De1XOR820C90RIo2ogvZG+c3KiHzqUoO/F34Y2shGzesfqv7o57xrxovZJH/MetF5UjroJ/R/3isoiw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@webassemblyjs/ast": "1.14.1",
				"@xtuc/long": "4.2.2"
			}
		},
		"node_modules/@xtuc/ieee754": {
			"version": "1.2.0",
			"resolved": "https://registry.npmjs.org/@xtuc/ieee754/-/ieee754-1.2.0.tgz",
			"integrity": "sha512-DX8nKgqcGwsc0eJSqYt5lwP4DH5FlHnmuWWBRy7X0NcaGR0ZtuyeESgMwTYVEtxmsNGY+qit4QYT/MIYTOTPeA==",
			"dev": true,
			"license": "BSD-3-Clause"
		},
		"node_modules/@xtuc/long": {
			"version": "4.2.2",
			"resolved": "https://registry.npmjs.org/@xtuc/long/-/long-4.2.2.tgz",
			"integrity": "sha512-NuHqBY1PB/D8xU6s/thBgOAiAP7HOYDQ32+BFZILJ8ivkUkAHQnWfn6WhL79Owj1qmUnoN/YPhktdIoucipkAQ==",
			"dev": true,
			"license": "Apache-2.0"
		},
		"node_modules/@yarnpkg/lockfile": {
			"version": "1.1.0",
			"resolved": "https://registry.npmjs.org/@yarnpkg/lockfile/-/lockfile-1.1.0.tgz",
			"integrity": "sha512-GpSwvyXOcOOlV70vbnzjj4fW5xW/FdUF6nQEt1ENy7m4ZCczi1+/buVUPAqmGfqznsORNFzUMjctTIp8a9tuCQ==",
			"dev": true,
			"license": "BSD-2-Clause"
		},
		"node_modules/@yarnpkg/parsers": {
			"version": "3.0.2",
			"resolved": "https://registry.npmjs.org/@yarnpkg/parsers/-/parsers-3.0.2.tgz",
			"integrity": "sha512-/HcYgtUSiJiot/XWGLOlGxPYUG65+/31V8oqk17vZLW1xlCoR4PampyePljOxY2n8/3jz9+tIFzICsyGujJZoA==",
			"dev": true,
			"license": "BSD-2-Clause",
			"dependencies": {
				"js-yaml": "^3.10.0",
				"tslib": "^2.4.0"
			},
			"engines": {
				"node": ">=18.12.0"
			}
		},
		"node_modules/@zkochan/js-yaml": {
			"version": "0.0.7",
			"resolved": "https://registry.npmjs.org/@zkochan/js-yaml/-/js-yaml-0.0.7.tgz",
			"integrity": "sha512-nrUSn7hzt7J6JWgWGz78ZYI8wj+gdIJdk0Ynjpp8l+trkn58Uqsf6RYrYkEK+3X18EX+TNdtJI0WxAtc+L84SQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"argparse": "^2.0.1"
			},
			"bin": {
				"js-yaml": "bin/js-yaml.js"
			}
		},
		"node_modules/abbrev": {
			"version": "4.0.0",
			"resolved": "https://registry.npmjs.org/abbrev/-/abbrev-4.0.0.tgz",
			"integrity": "sha512-a1wflyaL0tHtJSmLSOVybYhy22vRih4eduhhrkcjgrWGnRfrZtovJ2FRjxuTtkkj47O/baf0R86QU5OuYpz8fA==",
			"dev": true,
			"license": "ISC",
			"engines": {
				"node": "^20.17.0 || >=22.9.0"
			}
		},
		"node_modules/accepts": {
			"version": "2.0.0",
			"resolved": "https://registry.npmjs.org/accepts/-/accepts-2.0.0.tgz",
			"integrity": "sha512-5cvg6CtKwfgdmVqY1WIiXKc3Q1bkRqGLi+2W/6ao+6Y7gu/RCwRuAhGEzh5B4KlszSuTLgZYuqFqo5bImjNKng==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"mime-types": "^3.0.0",
				"negotiator": "^1.0.0"
			},
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/acorn": {
			"version": "8.16.0",
			"resolved": "https://registry.npmjs.org/acorn/-/acorn-8.16.0.tgz",
			"integrity": "sha512-UVJyE9MttOsBQIDKw1skb9nAwQuR5wuGD3+82K6JgJlm/Y+KI92oNsMNGZCYdDsVtRHSak0pcV5Dno5+4jh9sw==",
			"dev": true,
			"license": "MIT",
			"bin": {
				"acorn": "bin/acorn"
			},
			"engines": {
				"node": ">=0.4.0"
			}
		},
		"node_modules/acorn-import-phases": {
			"version": "1.0.4",
			"resolved": "https://registry.npmjs.org/acorn-import-phases/-/acorn-import-phases-1.0.4.tgz",
			"integrity": "sha512-wKmbr/DDiIXzEOiWrTTUcDm24kQ2vGfZQvM2fwg2vXqR5uW6aapr7ObPtj1th32b9u90/Pf4AItvdTh42fBmVQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=10.13.0"
			},
			"peerDependencies": {
				"acorn": "^8.14.0"
			}
		},
		"node_modules/acorn-jsx": {
			"version": "5.3.2",
			"resolved": "https://registry.npmjs.org/acorn-jsx/-/acorn-jsx-5.3.2.tgz",
			"integrity": "sha512-rq9s+JNhf0IChjtDXxllJ7g41oZk5SlXtp0LHwyA5cejwn7vKmKp4pPri6YEePv2PU65sAsegbXtIinmDFDXgQ==",
			"dev": true,
			"license": "MIT",
			"peerDependencies": {
				"acorn": "^6.0.0 || ^7.0.0 || ^8.0.0"
			}
		},
		"node_modules/address": {
			"version": "1.2.2",
			"resolved": "https://registry.npmjs.org/address/-/address-1.2.2.tgz",
			"integrity": "sha512-4B/qKCfeE/ODUaAUpSwfzazo5x29WD4r3vXiWsB7I2mSDAihwEqKO+g8GELZUQSSAo5e1XTYh3ZVfLyxBc12nA==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 10.0.0"
			}
		},
		"node_modules/adm-zip": {
			"version": "0.5.10",
			"resolved": "https://registry.npmjs.org/adm-zip/-/adm-zip-0.5.10.tgz",
			"integrity": "sha512-x0HvcHqVJNTPk/Bw8JbLWlWoo6Wwnsug0fnYYro1HBrjxZ3G7/AZk7Ahv8JwDe1uIcz8eBqvu86FuF1POiG7vQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=6.0"
			}
		},
		"node_modules/agent-base": {
			"version": "7.1.4",
			"resolved": "https://registry.npmjs.org/agent-base/-/agent-base-7.1.4.tgz",
			"integrity": "sha512-MnA+YT8fwfJPgBx3m60MNqakm30XOkyIoH1y6huTQvC0PwZG7ki8NacLBcrPbNoo8vEZy7Jpuk7+jMO+CUovTQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 14"
			}
		},
		"node_modules/ajv": {
			"version": "8.18.0",
			"resolved": "https://registry.npmjs.org/ajv/-/ajv-8.18.0.tgz",
			"integrity": "sha512-PlXPeEWMXMZ7sPYOHqmDyCJzcfNrUr3fGNKtezX14ykXOEIvyK81d+qydx89KY5O71FKMPaQ2vBfBFI5NHR63A==",
			"license": "MIT",
			"dependencies": {
				"fast-deep-equal": "^3.1.3",
				"fast-uri": "^3.0.1",
				"json-schema-traverse": "^1.0.0",
				"require-from-string": "^2.0.2"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/epoberezkin"
			}
		},
		"node_modules/ajv-formats": {
			"version": "3.0.1",
			"resolved": "https://registry.npmjs.org/ajv-formats/-/ajv-formats-3.0.1.tgz",
			"integrity": "sha512-8iUql50EUR+uUcdRQ3HDqa6EVyo3docL8g5WJ3FNcWmu62IbkGUue/pEyLBW8VGKKucTPgqeks4fIU1DA4yowQ==",
			"license": "MIT",
			"dependencies": {
				"ajv": "^8.0.0"
			},
			"peerDependencies": {
				"ajv": "^8.0.0"
			},
			"peerDependenciesMeta": {
				"ajv": {
					"optional": true
				}
			}
		},
		"node_modules/ajv-keywords": {
			"version": "5.1.0",
			"resolved": "https://registry.npmjs.org/ajv-keywords/-/ajv-keywords-5.1.0.tgz",
			"integrity": "sha512-YCS/JNFAUyr5vAuhk1DWm1CBxRHW9LbJ2ozWeemrIqpbsqKjHVxYPyi5GC0rjZIT5JxJ3virVTS8wk4i/Z+krw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"fast-deep-equal": "^3.1.3"
			},
			"peerDependencies": {
				"ajv": "^8.8.2"
			}
		},
		"node_modules/algoliasearch": {
			"version": "5.48.1",
			"resolved": "https://registry.npmjs.org/algoliasearch/-/algoliasearch-5.48.1.tgz",
			"integrity": "sha512-Rf7xmeuIo7nb6S4mp4abW2faW8DauZyE2faBIKFaUfP3wnpOvNSbiI5AwVhqBNj0jPgBWEvhyCu0sLjN2q77Rg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@algolia/abtesting": "1.14.1",
				"@algolia/client-abtesting": "5.48.1",
				"@algolia/client-analytics": "5.48.1",
				"@algolia/client-common": "5.48.1",
				"@algolia/client-insights": "5.48.1",
				"@algolia/client-personalization": "5.48.1",
				"@algolia/client-query-suggestions": "5.48.1",
				"@algolia/client-search": "5.48.1",
				"@algolia/ingestion": "1.48.1",
				"@algolia/monitoring": "1.48.1",
				"@algolia/recommend": "5.48.1",
				"@algolia/requester-browser-xhr": "5.48.1",
				"@algolia/requester-fetch": "5.48.1",
				"@algolia/requester-node-http": "5.48.1"
			},
			"engines": {
				"node": ">= 14.0.0"
			}
		},
		"node_modules/angular-eslint": {
			"version": "21.3.1",
			"resolved": "https://registry.npmjs.org/angular-eslint/-/angular-eslint-21.3.1.tgz",
			"integrity": "sha512-VGQWTyuPAEO/AnZuqHxGBJMYSiZ0tbrHx/OgPCRTKHfbrFU4x+zivS84h9UWoDpDtius1RyD+ZReFjTAEWptiA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@angular-devkit/core": ">= 21.0.0 < 22.0.0",
				"@angular-devkit/schematics": ">= 21.0.0 < 22.0.0",
				"@angular-eslint/builder": "21.3.1",
				"@angular-eslint/eslint-plugin": "21.3.1",
				"@angular-eslint/eslint-plugin-template": "21.3.1",
				"@angular-eslint/schematics": "21.3.1",
				"@angular-eslint/template-parser": "21.3.1",
				"@typescript-eslint/types": "^8.0.0",
				"@typescript-eslint/utils": "^8.0.0"
			},
			"peerDependencies": {
				"@angular/cli": ">= 21.0.0 < 22.0.0",
				"eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
				"typescript": "*",
				"typescript-eslint": "^8.0.0"
			}
		},
		"node_modules/ansi-colors": {
			"version": "4.1.3",
			"resolved": "https://registry.npmjs.org/ansi-colors/-/ansi-colors-4.1.3.tgz",
			"integrity": "sha512-/6w/C21Pm1A7aZitlI5Ni/2J6FFQN8i1Cvz3kHABAAbw93v/NlvKdVOqz7CCWz/3iv/JplRSEEZ83XION15ovw==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=6"
			}
		},
		"node_modules/ansi-escapes": {
			"version": "7.3.0",
			"resolved": "https://registry.npmjs.org/ansi-escapes/-/ansi-escapes-7.3.0.tgz",
			"integrity": "sha512-BvU8nYgGQBxcmMuEeUEmNTvrMVjJNSH7RgW24vXexN4Ven6qCvy4TntnvlnwnMLTVlcRQQdbRY8NKnaIoeWDNg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"environment": "^1.0.0"
			},
			"engines": {
				"node": ">=18"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/ansi-html-community": {
			"version": "0.0.8",
			"resolved": "https://registry.npmjs.org/ansi-html-community/-/ansi-html-community-0.0.8.tgz",
			"integrity": "sha512-1APHAyr3+PCamwNw3bXCPp4HFLONZt/yIH0sZp0/469KWNTEy+qN5jQ3GVX6DMZ1UXAi34yVwtTeaG/HpBuuzw==",
			"dev": true,
			"engines": [
				"node >= 0.8.0"
			],
			"license": "Apache-2.0",
			"bin": {
				"ansi-html": "bin/ansi-html"
			}
		},
		"node_modules/ansi-regex": {
			"version": "6.2.2",
			"resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-6.2.2.tgz",
			"integrity": "sha512-Bq3SmSpyFHaWjPk8If9yc6svM8c56dB5BAtW4Qbw5jHTwwXXcTLoRMkpDJp6VL0XzlWaCHTXrkFURMYmD0sLqg==",
			"license": "MIT",
			"engines": {
				"node": ">=12"
			},
			"funding": {
				"url": "https://github.com/chalk/ansi-regex?sponsor=1"
			}
		},
		"node_modules/ansi-styles": {
			"version": "6.2.3",
			"resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-6.2.3.tgz",
			"integrity": "sha512-4Dj6M28JB+oAH8kFkTLUo+a2jwOFkuqb3yucU0CANcRRUbxS0cP0nZYCGjcc3BNXwRIsUVmDGgzawme7zvJHvg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=12"
			},
			"funding": {
				"url": "https://github.com/chalk/ansi-styles?sponsor=1"
			}
		},
		"node_modules/anymatch": {
			"version": "3.1.3",
			"resolved": "https://registry.npmjs.org/anymatch/-/anymatch-3.1.3.tgz",
			"integrity": "sha512-KMReFUr0B4t+D+OBkjR3KYqvocp2XaSzO55UcB6mgQMd3KbcE+mWTyvVV7D/zsdEbNnV6acZUutkiHQXvTr1Rw==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"normalize-path": "^3.0.0",
				"picomatch": "^2.0.4"
			},
			"engines": {
				"node": ">= 8"
			}
		},
		"node_modules/anymatch/node_modules/picomatch": {
			"version": "2.3.2",
			"resolved": "https://registry.npmjs.org/picomatch/-/picomatch-2.3.2.tgz",
			"integrity": "sha512-V7+vQEJ06Z+c5tSye8S+nHUfI51xoXIXjHQ99cQtKUkQqqO1kO/KCJUfZXuB47h/YBlDhah2H3hdUGXn8ie0oA==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=8.6"
			},
			"funding": {
				"url": "https://github.com/sponsors/jonschlinkert"
			}
		},
		"node_modules/argparse": {
			"version": "2.0.1",
			"resolved": "https://registry.npmjs.org/argparse/-/argparse-2.0.1.tgz",
			"integrity": "sha512-8+9WqebbFzpX9OR+Wa6O29asIogeRMzcGtAINdpMHHyAg10f05aSFVBbcEqGf/PXw1EjAZ+q2/bEBg3DvurK3Q==",
			"dev": true,
			"license": "Python-2.0"
		},
		"node_modules/aria-query": {
			"version": "5.3.2",
			"resolved": "https://registry.npmjs.org/aria-query/-/aria-query-5.3.2.tgz",
			"integrity": "sha512-COROpnaoap1E2F000S62r6A60uHZnmlvomhfyT2DlTcrY1OrBKn2UhH7qn5wTC9zMvD0AY7csdPSNwKP+7WiQw==",
			"dev": true,
			"license": "Apache-2.0",
			"engines": {
				"node": ">= 0.4"
			}
		},
		"node_modules/array-flatten": {
			"version": "1.1.1",
			"resolved": "https://registry.npmjs.org/array-flatten/-/array-flatten-1.1.1.tgz",
			"integrity": "sha512-PCVAQswWemu6UdxsDFFX/+gVeYqKAod3D3UVm91jHwynguOwAvYPhx8nNlM++NqRcK6CxxpUafjmhIdKiHibqg==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/asn1js": {
			"version": "3.0.10",
			"resolved": "https://registry.npmjs.org/asn1js/-/asn1js-3.0.10.tgz",
			"integrity": "sha512-S2s3aOytiKdFRdulw2qPE51MzjzVOisppcVv7jVFR+Kw0kxwvFrDcYA0h7Ndqbmj0HkMIXYWaoj7fli8kgx1eg==",
			"dev": true,
			"license": "BSD-3-Clause",
			"dependencies": {
				"pvtsutils": "^1.3.6",
				"pvutils": "^1.1.5",
				"tslib": "^2.8.1"
			},
			"engines": {
				"node": ">=12.0.0"
			}
		},
		"node_modules/assertion-error": {
			"version": "2.0.1",
			"resolved": "https://registry.npmjs.org/assertion-error/-/assertion-error-2.0.1.tgz",
			"integrity": "sha512-Izi8RQcffqCeNVgFigKli1ssklIbpHnCYc6AknXGYoB6grJqyeby7jv12JUQgmTAnIDnbck1uxksT4dzN3PWBA==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=12"
			}
		},
		"node_modules/async": {
			"version": "3.2.6",
			"resolved": "https://registry.npmjs.org/async/-/async-3.2.6.tgz",
			"integrity": "sha512-htCUDlxyyCLMgaM3xXg0C0LW2xqfuQ6p05pCEIsXuyQ+a1koYKTuBMzRNwmybfLgvJDMd0r1LTn4+E0Ti6C2AA==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/asynckit": {
			"version": "0.4.0",
			"resolved": "https://registry.npmjs.org/asynckit/-/asynckit-0.4.0.tgz",
			"integrity": "sha512-Oei9OH4tRh0YqU3GxhX79dM/mwVgvbZJaSNaRk+bshkj0S5cfHcgYakreBjrHwatXKbz+IoIdYLxrKim2MjW0Q==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/autoprefixer": {
			"version": "10.5.0",
			"resolved": "https://registry.npmjs.org/autoprefixer/-/autoprefixer-10.5.0.tgz",
			"integrity": "sha512-FMhOoZV4+qR6aTUALKX2rEqGG+oyATvwBt9IIzVR5rMa2HRWPkxf+P+PAJLD1I/H5/II+HuZcBJYEFBpq39ong==",
			"dev": true,
			"funding": [
				{
					"type": "opencollective",
					"url": "https://opencollective.com/postcss/"
				},
				{
					"type": "tidelift",
					"url": "https://tidelift.com/funding/github/npm/autoprefixer"
				},
				{
					"type": "github",
					"url": "https://github.com/sponsors/ai"
				}
			],
			"license": "MIT",
			"dependencies": {
				"browserslist": "^4.28.2",
				"caniuse-lite": "^1.0.30001787",
				"fraction.js": "^5.3.4",
				"picocolors": "^1.1.1",
				"postcss-value-parser": "^4.2.0"
			},
			"bin": {
				"autoprefixer": "bin/autoprefixer"
			},
			"engines": {
				"node": "^10 || ^12 || >=14"
			},
			"peerDependencies": {
				"postcss": "^8.1.0"
			}
		},
		"node_modules/axios": {
			"version": "1.15.0",
			"resolved": "https://registry.npmjs.org/axios/-/axios-1.15.0.tgz",
			"integrity": "sha512-wWyJDlAatxk30ZJer+GeCWS209sA42X+N5jU2jy6oHTp7ufw8uzUTVFBX9+wTfAlhiJXGS0Bq7X6efruWjuK9Q==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"follow-redirects": "^1.15.11",
				"form-data": "^4.0.5",
				"proxy-from-env": "^2.1.0"
			}
		},
		"node_modules/axobject-query": {
			"version": "4.1.0",
			"resolved": "https://registry.npmjs.org/axobject-query/-/axobject-query-4.1.0.tgz",
			"integrity": "sha512-qIj0G9wZbMGNLjLmg1PT6v2mE9AH2zlnADJD/2tC6E00hgmhUOfEB6greHPAfLRSufHqROIUTkw6E+M3lH0PTQ==",
			"dev": true,
			"license": "Apache-2.0",
			"engines": {
				"node": ">= 0.4"
			}
		},
		"node_modules/babel-loader": {
			"version": "9.2.1",
			"resolved": "https://registry.npmjs.org/babel-loader/-/babel-loader-9.2.1.tgz",
			"integrity": "sha512-fqe8naHt46e0yIdkjUZYqddSXfej3AHajX+CSO5X7oy0EmPc6o5Xh+RClNoHjnieWz9AW4kZxW9yyFMhVB1QLA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"find-cache-dir": "^4.0.0",
				"schema-utils": "^4.0.0"
			},
			"engines": {
				"node": ">= 14.15.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.12.0",
				"webpack": ">=5"
			}
		},
		"node_modules/babel-plugin-const-enum": {
			"version": "1.2.0",
			"resolved": "https://registry.npmjs.org/babel-plugin-const-enum/-/babel-plugin-const-enum-1.2.0.tgz",
			"integrity": "sha512-o1m/6iyyFnp9MRsK1dHF3bneqyf3AlM2q3A/YbgQr2pCat6B6XJVDv2TXqzfY2RYUi4mak6WAksSBPlyYGx9dg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-plugin-utils": "^7.0.0",
				"@babel/plugin-syntax-typescript": "^7.3.3",
				"@babel/traverse": "^7.16.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/babel-plugin-macros": {
			"version": "3.1.0",
			"resolved": "https://registry.npmjs.org/babel-plugin-macros/-/babel-plugin-macros-3.1.0.tgz",
			"integrity": "sha512-Cg7TFGpIr01vOQNODXOOaGz2NpCU5gl8x1qJFbb6hbZxR7XrcE2vtbAsTAbJ7/xwJtUuJEw8K8Zr/AE0LHlesg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/runtime": "^7.12.5",
				"cosmiconfig": "^7.0.0",
				"resolve": "^1.19.0"
			},
			"engines": {
				"node": ">=10",
				"npm": ">=6"
			}
		},
		"node_modules/babel-plugin-polyfill-corejs2": {
			"version": "0.4.17",
			"resolved": "https://registry.npmjs.org/babel-plugin-polyfill-corejs2/-/babel-plugin-polyfill-corejs2-0.4.17.tgz",
			"integrity": "sha512-aTyf30K/rqAsNwN76zYrdtx8obu0E4KoUME29B1xj+B3WxgvWkp943vYQ+z8Mv3lw9xHXMHpvSPOBxzAkIa94w==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/compat-data": "^7.28.6",
				"@babel/helper-define-polyfill-provider": "^0.6.8",
				"semver": "^6.3.1"
			},
			"peerDependencies": {
				"@babel/core": "^7.4.0 || ^8.0.0-0 <8.0.0"
			}
		},
		"node_modules/babel-plugin-polyfill-corejs2/node_modules/semver": {
			"version": "6.3.1",
			"resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
			"integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
			"dev": true,
			"license": "ISC",
			"bin": {
				"semver": "bin/semver.js"
			}
		},
		"node_modules/babel-plugin-polyfill-corejs3": {
			"version": "0.13.0",
			"resolved": "https://registry.npmjs.org/babel-plugin-polyfill-corejs3/-/babel-plugin-polyfill-corejs3-0.13.0.tgz",
			"integrity": "sha512-U+GNwMdSFgzVmfhNm8GJUX88AadB3uo9KpJqS3FaqNIPKgySuvMb+bHPsOmmuWyIcuqZj/pzt1RUIUZns4y2+A==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-define-polyfill-provider": "^0.6.5",
				"core-js-compat": "^3.43.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.4.0 || ^8.0.0-0 <8.0.0"
			}
		},
		"node_modules/babel-plugin-polyfill-regenerator": {
			"version": "0.6.8",
			"resolved": "https://registry.npmjs.org/babel-plugin-polyfill-regenerator/-/babel-plugin-polyfill-regenerator-0.6.8.tgz",
			"integrity": "sha512-M762rNHfSF1EV3SLtnCJXFoQbbIIz0OyRwnCmV0KPC7qosSfCO0QLTSuJX3ayAebubhE6oYBAYPrBA5ljowaZg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-define-polyfill-provider": "^0.6.8"
			},
			"peerDependencies": {
				"@babel/core": "^7.4.0 || ^8.0.0-0 <8.0.0"
			}
		},
		"node_modules/babel-plugin-transform-typescript-metadata": {
			"version": "0.3.2",
			"resolved": "https://registry.npmjs.org/babel-plugin-transform-typescript-metadata/-/babel-plugin-transform-typescript-metadata-0.3.2.tgz",
			"integrity": "sha512-mWEvCQTgXQf48yDqgN7CH50waTyYBeP2Lpqx4nNWab9sxEpdXVeKgfj1qYI2/TgUPQtNFZ85i3PemRtnXVYYJg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-plugin-utils": "^7.0.0"
			}
		},
		"node_modules/balanced-match": {
			"version": "4.0.4",
			"resolved": "https://registry.npmjs.org/balanced-match/-/balanced-match-4.0.4.tgz",
			"integrity": "sha512-BLrgEcRTwX2o6gGxGOCNyMvGSp35YofuYzw9h1IMTRmKqttAZZVU67bdb9Pr2vUHA8+j3i2tJfjO6C6+4myGTA==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": "18 || 20 || >=22"
			}
		},
		"node_modules/base64-js": {
			"version": "1.5.1",
			"resolved": "https://registry.npmjs.org/base64-js/-/base64-js-1.5.1.tgz",
			"integrity": "sha512-AKpaYlHn8t4SVbOHCy+b5+KKgvR4vrsD8vbvrbiQJps7fKDTkjkDry6ji0rUJjC0kzbNePLwzxq8iypo41qeWA==",
			"dev": true,
			"funding": [
				{
					"type": "github",
					"url": "https://github.com/sponsors/feross"
				},
				{
					"type": "patreon",
					"url": "https://www.patreon.com/feross"
				},
				{
					"type": "consulting",
					"url": "https://feross.org/support"
				}
			],
			"license": "MIT"
		},
		"node_modules/baseline-browser-mapping": {
			"version": "2.10.14",
			"resolved": "https://registry.npmjs.org/baseline-browser-mapping/-/baseline-browser-mapping-2.10.14.tgz",
			"integrity": "sha512-fOVLPAsFTsQfuCkvahZkzq6nf8KvGWanlYoTh0SVA0A/PIUxQGU2AOZAoD95n2gFLVDW/jP6sbGLny95nmEuHA==",
			"dev": true,
			"license": "Apache-2.0",
			"bin": {
				"baseline-browser-mapping": "dist/cli.cjs"
			},
			"engines": {
				"node": ">=6.0.0"
			}
		},
		"node_modules/basic-auth": {
			"version": "2.0.1",
			"resolved": "https://registry.npmjs.org/basic-auth/-/basic-auth-2.0.1.tgz",
			"integrity": "sha512-NF+epuEdnUYVlGuhaxbbq+dvJttwLnGY+YixlXlME5KpQ5W3CnXA5cVTneY3SPbPDRkcjMbifrwmFYcClgOZeg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"safe-buffer": "5.1.2"
			},
			"engines": {
				"node": ">= 0.8"
			}
		},
		"node_modules/basic-auth/node_modules/safe-buffer": {
			"version": "5.1.2",
			"resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.2.tgz",
			"integrity": "sha512-Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/batch": {
			"version": "0.6.1",
			"resolved": "https://registry.npmjs.org/batch/-/batch-0.6.1.tgz",
			"integrity": "sha512-x+VAiMRL6UPkx+kudNvxTl6hB2XNNCG2r+7wixVfIYwu/2HKRXimwQyaumLjMveWvT2Hkd/cAJw+QBMfJ/EKVw==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/beasties": {
			"version": "0.4.1",
			"resolved": "https://registry.npmjs.org/beasties/-/beasties-0.4.1.tgz",
			"integrity": "sha512-2Imdcw3LznDuxAbJM26RHniOLAzE6WgrK8OuvVXCQtNBS8rsnD9zsSEa3fHl4hHpUY7BYTlrpvtPVbvu9G6neg==",
			"dev": true,
			"license": "Apache-2.0",
			"dependencies": {
				"css-select": "^6.0.0",
				"css-what": "^7.0.0",
				"dom-serializer": "^2.0.0",
				"domhandler": "^5.0.3",
				"htmlparser2": "^10.0.0",
				"picocolors": "^1.1.1",
				"postcss": "^8.4.49",
				"postcss-media-query-parser": "^0.2.3",
				"postcss-safe-parser": "^7.0.1"
			},
			"engines": {
				"node": ">=18.0.0"
			}
		},
		"node_modules/bidi-js": {
			"version": "1.0.3",
			"resolved": "https://registry.npmjs.org/bidi-js/-/bidi-js-1.0.3.tgz",
			"integrity": "sha512-RKshQI1R3YQ+n9YJz2QQ147P66ELpa1FQEg20Dk8oW9t2KgLbpDLLp9aGZ7y8WHSshDknG0bknqGw5/tyCs5tw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"require-from-string": "^2.0.2"
			}
		},
		"node_modules/big.js": {
			"version": "5.2.2",
			"resolved": "https://registry.npmjs.org/big.js/-/big.js-5.2.2.tgz",
			"integrity": "sha512-vyL2OymJxmarO8gxMr0mhChsO9QGwhynfuu4+MHTAW6czfq9humCB7rKpUjDd9YUiDPU4mzpyupFSvOClAwbmQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": "*"
			}
		},
		"node_modules/binary-extensions": {
			"version": "2.3.0",
			"resolved": "https://registry.npmjs.org/binary-extensions/-/binary-extensions-2.3.0.tgz",
			"integrity": "sha512-Ceh+7ox5qe7LJuLHoY0feh3pHuUDHAcRUeyL2VYghZwfpkNIy/+8Ocg0a3UuSoYzavmylwuLWQOf3hl0jjMMIw==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=8"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/bl": {
			"version": "4.1.0",
			"resolved": "https://registry.npmjs.org/bl/-/bl-4.1.0.tgz",
			"integrity": "sha512-1W07cM9gS6DcLperZfFSj+bWLtaPGSOHWhPiGzXmvVJbRLdG82sH/Kn8EtW1VqWVA54AKf2h5k5BbnIbwF3h6w==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"buffer": "^5.5.0",
				"inherits": "^2.0.4",
				"readable-stream": "^3.4.0"
			}
		},
		"node_modules/body-parser": {
			"version": "2.2.2",
			"resolved": "https://registry.npmjs.org/body-parser/-/body-parser-2.2.2.tgz",
			"integrity": "sha512-oP5VkATKlNwcgvxi0vM0p/D3n2C3EReYVX+DNYs5TjZFn/oQt2j+4sVJtSMr18pdRr8wjTcBl6LoV+FUwzPmNA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"bytes": "^3.1.2",
				"content-type": "^1.0.5",
				"debug": "^4.4.3",
				"http-errors": "^2.0.0",
				"iconv-lite": "^0.7.0",
				"on-finished": "^2.4.1",
				"qs": "^6.14.1",
				"raw-body": "^3.0.1",
				"type-is": "^2.0.1"
			},
			"engines": {
				"node": ">=18"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/express"
			}
		},
		"node_modules/bonjour-service": {
			"version": "1.3.0",
			"resolved": "https://registry.npmjs.org/bonjour-service/-/bonjour-service-1.3.0.tgz",
			"integrity": "sha512-3YuAUiSkWykd+2Azjgyxei8OWf8thdn8AITIog2M4UICzoqfjlqr64WIjEXZllf/W6vK1goqleSR6brGomxQqA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"fast-deep-equal": "^3.1.3",
				"multicast-dns": "^7.2.5"
			}
		},
		"node_modules/boolbase": {
			"version": "1.0.0",
			"resolved": "https://registry.npmjs.org/boolbase/-/boolbase-1.0.0.tgz",
			"integrity": "sha512-JZOSA7Mo9sNGB8+UjSgzdLtokWAky1zbztM3WRLCbZ70/3cTANmQmOdR7y2g+J0e2WXywy1yS468tY+IruqEww==",
			"dev": true,
			"license": "ISC"
		},
		"node_modules/brace-expansion": {
			"version": "5.0.5",
			"resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-5.0.5.tgz",
			"integrity": "sha512-VZznLgtwhn+Mact9tfiwx64fA9erHH/MCXEUfB/0bX/6Fz6ny5EGTXYltMocqg4xFAQZtnO3DHWWXi8RiuN7cQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"balanced-match": "^4.0.2"
			},
			"engines": {
				"node": "18 || 20 || >=22"
			}
		},
		"node_modules/braces": {
			"version": "3.0.3",
			"resolved": "https://registry.npmjs.org/braces/-/braces-3.0.3.tgz",
			"integrity": "sha512-yQbXgO/OSZVD2IsiLlro+7Hf6Q18EJrKSEsdoMzKePKXct3gvD8oLcOQdIzGupr5Fj+EDe8gO/lxc1BzfMpxvA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"fill-range": "^7.1.1"
			},
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/browserslist": {
			"version": "4.28.2",
			"resolved": "https://registry.npmjs.org/browserslist/-/browserslist-4.28.2.tgz",
			"integrity": "sha512-48xSriZYYg+8qXna9kwqjIVzuQxi+KYWp2+5nCYnYKPTr0LvD89Jqk2Or5ogxz0NUMfIjhh2lIUX/LyX9B4oIg==",
			"dev": true,
			"funding": [
				{
					"type": "opencollective",
					"url": "https://opencollective.com/browserslist"
				},
				{
					"type": "tidelift",
					"url": "https://tidelift.com/funding/github/npm/browserslist"
				},
				{
					"type": "github",
					"url": "https://github.com/sponsors/ai"
				}
			],
			"license": "MIT",
			"dependencies": {
				"baseline-browser-mapping": "^2.10.12",
				"caniuse-lite": "^1.0.30001782",
				"electron-to-chromium": "^1.5.328",
				"node-releases": "^2.0.36",
				"update-browserslist-db": "^1.2.3"
			},
			"bin": {
				"browserslist": "cli.js"
			},
			"engines": {
				"node": "^6 || ^7 || ^8 || ^9 || ^10 || ^11 || ^12 || >=13.7"
			}
		},
		"node_modules/buffer": {
			"version": "5.7.1",
			"resolved": "https://registry.npmjs.org/buffer/-/buffer-5.7.1.tgz",
			"integrity": "sha512-EHcyIPBQ4BSGlvjB16k5KgAJ27CIsHY/2JBmCRReo48y9rQ3MaUzWX3KVlBa4U7MyX02HdVj0K7C3WaB3ju7FQ==",
			"dev": true,
			"funding": [
				{
					"type": "github",
					"url": "https://github.com/sponsors/feross"
				},
				{
					"type": "patreon",
					"url": "https://www.patreon.com/feross"
				},
				{
					"type": "consulting",
					"url": "https://feross.org/support"
				}
			],
			"license": "MIT",
			"dependencies": {
				"base64-js": "^1.3.1",
				"ieee754": "^1.1.13"
			}
		},
		"node_modules/buffer-from": {
			"version": "1.1.2",
			"resolved": "https://registry.npmjs.org/buffer-from/-/buffer-from-1.1.2.tgz",
			"integrity": "sha512-E+XQCRwSbaaiChtv6k6Dwgc+bx+Bs6vuKJHHl5kox/BaKbhiXzqQOwK4cO22yElGp2OCmjwVhT3HmxgyPGnJfQ==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/bundle-name": {
			"version": "4.1.0",
			"resolved": "https://registry.npmjs.org/bundle-name/-/bundle-name-4.1.0.tgz",
			"integrity": "sha512-tjwM5exMg6BGRI+kNmTntNsvdZS1X8BFYS6tnJ2hdH0kVxM6/eVZ2xy+FqStSWvYmtfFMDLIxurorHwDKfDz5Q==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"run-applescript": "^7.0.0"
			},
			"engines": {
				"node": ">=18"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/bytes": {
			"version": "3.1.2",
			"resolved": "https://registry.npmjs.org/bytes/-/bytes-3.1.2.tgz",
			"integrity": "sha512-/Nf7TyzTx6S3yRJObOAV7956r8cr2+Oj8AC5dt8wSP3BQAoeX58NoHyCU8P8zGkNXStjTSi6fzO6F0pBdcYbEg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.8"
			}
		},
		"node_modules/bytestreamjs": {
			"version": "2.0.1",
			"resolved": "https://registry.npmjs.org/bytestreamjs/-/bytestreamjs-2.0.1.tgz",
			"integrity": "sha512-U1Z/ob71V/bXfVABvNr/Kumf5VyeQRBEm6Txb0PQ6S7V5GpBM3w4Cbqz/xPDicR5tN0uvDifng8C+5qECeGwyQ==",
			"dev": true,
			"license": "BSD-3-Clause",
			"engines": {
				"node": ">=6.0.0"
			}
		},
		"node_modules/cacache": {
			"version": "20.0.4",
			"resolved": "https://registry.npmjs.org/cacache/-/cacache-20.0.4.tgz",
			"integrity": "sha512-M3Lab8NPYlZU2exsL3bMVvMrMqgwCnMWfdZbK28bn3pK6APT/Te/I8hjRPNu1uwORY9a1eEQoifXbKPQMfMTOA==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"@npmcli/fs": "^5.0.0",
				"fs-minipass": "^3.0.0",
				"glob": "^13.0.0",
				"lru-cache": "^11.1.0",
				"minipass": "^7.0.3",
				"minipass-collect": "^2.0.1",
				"minipass-flush": "^1.0.5",
				"minipass-pipeline": "^1.2.4",
				"p-map": "^7.0.2",
				"ssri": "^13.0.0"
			},
			"engines": {
				"node": "^20.17.0 || >=22.9.0"
			}
		},
		"node_modules/cacache/node_modules/lru-cache": {
			"version": "11.2.7",
			"resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-11.2.7.tgz",
			"integrity": "sha512-aY/R+aEsRelme17KGQa/1ZSIpLpNYYrhcrepKTZgE+W3WM16YMCaPwOHLHsmopZHELU0Ojin1lPVxKR0MihncA==",
			"dev": true,
			"license": "BlueOak-1.0.0",
			"engines": {
				"node": "20 || >=22"
			}
		},
		"node_modules/call-bind-apply-helpers": {
			"version": "1.0.2",
			"resolved": "https://registry.npmjs.org/call-bind-apply-helpers/-/call-bind-apply-helpers-1.0.2.tgz",
			"integrity": "sha512-Sp1ablJ0ivDkSzjcaJdxEunN5/XvksFJ2sMBFfq6x0ryhQV/2b/KwFe21cMpmHtPOSij8K99/wSfoEuTObmuMQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"es-errors": "^1.3.0",
				"function-bind": "^1.1.2"
			},
			"engines": {
				"node": ">= 0.4"
			}
		},
		"node_modules/call-bound": {
			"version": "1.0.4",
			"resolved": "https://registry.npmjs.org/call-bound/-/call-bound-1.0.4.tgz",
			"integrity": "sha512-+ys997U96po4Kx/ABpBCqhA9EuxJaQWDQg7295H4hBphv3IZg0boBKuwYpt4YXp6MZ5AmZQnU/tyMTlRpaSejg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"call-bind-apply-helpers": "^1.0.2",
				"get-intrinsic": "^1.3.0"
			},
			"engines": {
				"node": ">= 0.4"
			},
			"funding": {
				"url": "https://github.com/sponsors/ljharb"
			}
		},
		"node_modules/callsites": {
			"version": "3.1.0",
			"resolved": "https://registry.npmjs.org/callsites/-/callsites-3.1.0.tgz",
			"integrity": "sha512-P8BjAsXvZS+VIDUI11hHCQEv74YT67YUi5JJFNWIqL235sBmjX4+qx9Muvls5ivyNENctx46xQLQ3aTuE7ssaQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=6"
			}
		},
		"node_modules/caniuse-api": {
			"version": "3.0.0",
			"resolved": "https://registry.npmjs.org/caniuse-api/-/caniuse-api-3.0.0.tgz",
			"integrity": "sha512-bsTwuIg/BZZK/vreVTYYbSWoe2F+71P7K5QGEX+pT250DZbfU1MQ5prOKpPR+LL6uWKK3KMwMCAS74QB3Um1uw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"browserslist": "^4.0.0",
				"caniuse-lite": "^1.0.0",
				"lodash.memoize": "^4.1.2",
				"lodash.uniq": "^4.5.0"
			}
		},
		"node_modules/caniuse-lite": {
			"version": "1.0.30001790",
			"resolved": "https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30001790.tgz",
			"integrity": "sha512-bOoxfJPyYo+ds6W0YfptaCWbFnJYjh2Y1Eow5lRv+vI2u8ganPZqNm1JwNh0t2ELQCqIWg4B3dWEusgAmsoyOw==",
			"dev": true,
			"funding": [
				{
					"type": "opencollective",
					"url": "https://opencollective.com/browserslist"
				},
				{
					"type": "tidelift",
					"url": "https://tidelift.com/funding/github/npm/caniuse-lite"
				},
				{
					"type": "github",
					"url": "https://github.com/sponsors/ai"
				}
			],
			"license": "CC-BY-4.0"
		},
		"node_modules/chai": {
			"version": "6.2.2",
			"resolved": "https://registry.npmjs.org/chai/-/chai-6.2.2.tgz",
			"integrity": "sha512-NUPRluOfOiTKBKvWPtSD4PhFvWCqOi0BGStNWs57X9js7XGTprSmFoz5F0tWhR4WPjNeR9jXqdC7/UpSJTnlRg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/chalk": {
			"version": "5.6.2",
			"resolved": "https://registry.npmjs.org/chalk/-/chalk-5.6.2.tgz",
			"integrity": "sha512-7NzBL0rN6fMUW+f7A6Io4h40qQlG+xGmtMxfbnH/K7TAtt8JQWVQK+6g0UXKMeVJoyV5EkkNsErQ8pVD3bLHbA==",
			"license": "MIT",
			"engines": {
				"node": "^12.17.0 || ^14.13 || >=16.0.0"
			},
			"funding": {
				"url": "https://github.com/chalk/chalk?sponsor=1"
			}
		},
		"node_modules/chardet": {
			"version": "2.1.1",
			"resolved": "https://registry.npmjs.org/chardet/-/chardet-2.1.1.tgz",
			"integrity": "sha512-PsezH1rqdV9VvyNhxxOW32/d75r01NY7TQCmOqomRo15ZSOKbpTFVsfjghxo6JloQUCGnH4k1LGu0R4yCLlWQQ==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/chokidar": {
			"version": "5.0.0",
			"resolved": "https://registry.npmjs.org/chokidar/-/chokidar-5.0.0.tgz",
			"integrity": "sha512-TQMmc3w+5AxjpL8iIiwebF73dRDF4fBIieAqGn9RGCWaEVwQ6Fb2cGe31Yns0RRIzii5goJ1Y7xbMwo1TxMplw==",
			"devOptional": true,
			"license": "MIT",
			"dependencies": {
				"readdirp": "^5.0.0"
			},
			"engines": {
				"node": ">= 20.19.0"
			},
			"funding": {
				"url": "https://paulmillr.com/funding/"
			}
		},
		"node_modules/chownr": {
			"version": "3.0.0",
			"resolved": "https://registry.npmjs.org/chownr/-/chownr-3.0.0.tgz",
			"integrity": "sha512-+IxzY9BZOQd/XuYPRmrvEVjF/nqj5kgT4kEq7VofrDoM1MxoRjEWkrCC3EtLi59TVawxTAn+orJwFQcrqEN1+g==",
			"dev": true,
			"license": "BlueOak-1.0.0",
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/chrome-trace-event": {
			"version": "1.0.4",
			"resolved": "https://registry.npmjs.org/chrome-trace-event/-/chrome-trace-event-1.0.4.tgz",
			"integrity": "sha512-rNjApaLzuwaOTjCiT8lSDdGN1APCiqkChLMJxJPWLunPAt5fy8xgU9/jNOchV84wfIxrA0lRQB7oCT8jrn/wrQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=6.0"
			}
		},
		"node_modules/ci-info": {
			"version": "4.4.0",
			"resolved": "https://registry.npmjs.org/ci-info/-/ci-info-4.4.0.tgz",
			"integrity": "sha512-77PSwercCZU2Fc4sX94eF8k8Pxte6JAwL4/ICZLFjJLqegs7kCuAsqqj/70NQF6TvDpgFjkubQB2FW2ZZddvQg==",
			"dev": true,
			"funding": [
				{
					"type": "github",
					"url": "https://github.com/sponsors/sibiraj-s"
				}
			],
			"license": "MIT",
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/class-variance-authority": {
			"version": "0.7.1",
			"resolved": "https://registry.npmjs.org/class-variance-authority/-/class-variance-authority-0.7.1.tgz",
			"integrity": "sha512-Ka+9Trutv7G8M6WT6SeiRWz792K5qEqIGEGzXKhAE6xOWAY6pPH8U+9IY3oCMv6kqTmLsv7Xh/2w2RigkePMsg==",
			"license": "Apache-2.0",
			"dependencies": {
				"clsx": "^2.1.1"
			},
			"funding": {
				"url": "https://polar.sh/cva"
			}
		},
		"node_modules/cli-cursor": {
			"version": "5.0.0",
			"resolved": "https://registry.npmjs.org/cli-cursor/-/cli-cursor-5.0.0.tgz",
			"integrity": "sha512-aCj4O5wKyszjMmDT4tZj93kxyydN/K5zPWSCe6/0AV/AA1pqe5ZBIw0a2ZfPQV7lL5/yb5HsUreJ6UFAF1tEQw==",
			"license": "MIT",
			"dependencies": {
				"restore-cursor": "^5.0.0"
			},
			"engines": {
				"node": ">=18"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/cli-spinners": {
			"version": "3.4.0",
			"resolved": "https://registry.npmjs.org/cli-spinners/-/cli-spinners-3.4.0.tgz",
			"integrity": "sha512-bXfOC4QcT1tKXGorxL3wbJm6XJPDqEnij2gQ2m7ESQuE+/z9YFIWnl/5RpTiKWbMq3EVKR4fRLJGn6DVfu0mpw==",
			"license": "MIT",
			"engines": {
				"node": ">=18.20"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/cli-truncate": {
			"version": "5.2.0",
			"resolved": "https://registry.npmjs.org/cli-truncate/-/cli-truncate-5.2.0.tgz",
			"integrity": "sha512-xRwvIOMGrfOAnM1JYtqQImuaNtDEv9v6oIYAs4LIHwTiKee8uwvIi363igssOC0O5U04i4AlENs79LQLu9tEMw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"slice-ansi": "^8.0.0",
				"string-width": "^8.2.0"
			},
			"engines": {
				"node": ">=20"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/cli-width": {
			"version": "4.1.0",
			"resolved": "https://registry.npmjs.org/cli-width/-/cli-width-4.1.0.tgz",
			"integrity": "sha512-ouuZd4/dm2Sw5Gmqy6bGyNNNe1qt9RpmxveLSO7KcgsTnU7RXfsw+/bukWGo1abgBiMAic068rclZsO4IWmmxQ==",
			"dev": true,
			"license": "ISC",
			"engines": {
				"node": ">= 12"
			}
		},
		"node_modules/cliui": {
			"version": "9.0.1",
			"resolved": "https://registry.npmjs.org/cliui/-/cliui-9.0.1.tgz",
			"integrity": "sha512-k7ndgKhwoQveBL+/1tqGJYNz097I7WOvwbmmU2AR5+magtbjPWQTS1C5vzGkBC8Ym8UWRzfKUzUUqFLypY4Q+w==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"string-width": "^7.2.0",
				"strip-ansi": "^7.1.0",
				"wrap-ansi": "^9.0.0"
			},
			"engines": {
				"node": ">=20"
			}
		},
		"node_modules/cliui/node_modules/string-width": {
			"version": "7.2.0",
			"resolved": "https://registry.npmjs.org/string-width/-/string-width-7.2.0.tgz",
			"integrity": "sha512-tsaTIkKW9b4N+AEj+SVA+WhJzV7/zMhcSu78mLKWSk7cXMOSHsBKFWUs0fWwq8QyK3MgJBQRX6Gbi4kYbdvGkQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"emoji-regex": "^10.3.0",
				"get-east-asian-width": "^1.0.0",
				"strip-ansi": "^7.1.0"
			},
			"engines": {
				"node": ">=18"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/cliui/node_modules/wrap-ansi": {
			"version": "9.0.2",
			"resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-9.0.2.tgz",
			"integrity": "sha512-42AtmgqjV+X1VpdOfyTGOYRi0/zsoLqtXQckTmqTeybT+BDIbM/Guxo7x3pE2vtpr1ok6xRqM9OpBe+Jyoqyww==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ansi-styles": "^6.2.1",
				"string-width": "^7.0.0",
				"strip-ansi": "^7.1.0"
			},
			"engines": {
				"node": ">=18"
			},
			"funding": {
				"url": "https://github.com/chalk/wrap-ansi?sponsor=1"
			}
		},
		"node_modules/clone": {
			"version": "1.0.4",
			"resolved": "https://registry.npmjs.org/clone/-/clone-1.0.4.tgz",
			"integrity": "sha512-JQHZ2QMW6l3aH/j6xCqQThY/9OH4D/9ls34cgkUBiEeocRTU04tHfKPBsUK1PqZCUQM7GiA0IIXJSuXHI64Kbg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=0.8"
			}
		},
		"node_modules/clone-deep": {
			"version": "4.0.1",
			"resolved": "https://registry.npmjs.org/clone-deep/-/clone-deep-4.0.1.tgz",
			"integrity": "sha512-neHB9xuzh/wk0dIHweyAXv2aPGZIVk3pLMe+/RNzINf17fe0OG96QroktYAUm7SM1PBnzTabaLboqqxDyMU+SQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"is-plain-object": "^2.0.4",
				"kind-of": "^6.0.2",
				"shallow-clone": "^3.0.0"
			},
			"engines": {
				"node": ">=6"
			}
		},
		"node_modules/clone-deep/node_modules/is-plain-object": {
			"version": "2.0.4",
			"resolved": "https://registry.npmjs.org/is-plain-object/-/is-plain-object-2.0.4.tgz",
			"integrity": "sha512-h5PpgXkWitc38BBMYawTYMWJHFZJVnBquFE57xFpjB8pJFiF6gZ+bU+WyI/yqXiFR5mdLsgYNaPe8uao6Uv9Og==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"isobject": "^3.0.1"
			},
			"engines": {
				"node": ">=0.10.0"
			}
		},
		"node_modules/clsx": {
			"version": "2.1.1",
			"resolved": "https://registry.npmjs.org/clsx/-/clsx-2.1.1.tgz",
			"integrity": "sha512-eYm0QWBtUrBWZWG0d386OGAw16Z995PiOVo2B7bjWSbHedGl5e0ZWaq65kOGgUSNesEIDkB9ISbTg/JK9dhCZA==",
			"license": "MIT",
			"engines": {
				"node": ">=6"
			}
		},
		"node_modules/code-block-writer": {
			"version": "13.0.3",
			"resolved": "https://registry.npmjs.org/code-block-writer/-/code-block-writer-13.0.3.tgz",
			"integrity": "sha512-Oofo0pq3IKnsFtuHqSF7TqBfr71aeyZDVJ0HpmqB7FBM2qEigL0iPONSCZSO9pE9dZTAxANe5XHG9Uy0YMv8cg==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/color-convert": {
			"version": "2.0.1",
			"resolved": "https://registry.npmjs.org/color-convert/-/color-convert-2.0.1.tgz",
			"integrity": "sha512-RRECPsj7iu/xb5oKYcsFHSppFNnsj/52OVTRKb4zP5onXwVF3zVmmToNcOfGC+CRDpfK/U584fMg38ZHCaElKQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"color-name": "~1.1.4"
			},
			"engines": {
				"node": ">=7.0.0"
			}
		},
		"node_modules/color-name": {
			"version": "1.1.4",
			"resolved": "https://registry.npmjs.org/color-name/-/color-name-1.1.4.tgz",
			"integrity": "sha512-dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/colorette": {
			"version": "2.0.20",
			"resolved": "https://registry.npmjs.org/colorette/-/colorette-2.0.20.tgz",
			"integrity": "sha512-IfEDxwoWIjkeXL1eXcDiow4UbKjhLdq6/EuSVR9GMN7KVH3r9gQ83e73hsz1Nd1T3ijd5xv1wcWRYO+D6kCI2w==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/colorjs.io": {
			"version": "0.5.2",
			"resolved": "https://registry.npmjs.org/colorjs.io/-/colorjs.io-0.5.2.tgz",
			"integrity": "sha512-twmVoizEW7ylZSN32OgKdXRmo1qg+wT5/6C3xu5b9QsWzSFAhHLn2xd8ro0diCsKfCj1RdaTP/nrcW+vAoQPIw==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/columnify": {
			"version": "1.6.0",
			"resolved": "https://registry.npmjs.org/columnify/-/columnify-1.6.0.tgz",
			"integrity": "sha512-lomjuFZKfM6MSAnV9aCZC9sc0qGbmZdfygNv+nCpqVkSKdCxCklLtd16O0EILGkImHw9ZpHkAnHaB+8Zxq5W6Q==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"strip-ansi": "^6.0.1",
				"wcwidth": "^1.0.0"
			},
			"engines": {
				"node": ">=8.0.0"
			}
		},
		"node_modules/columnify/node_modules/ansi-regex": {
			"version": "5.0.1",
			"resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
			"integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/columnify/node_modules/strip-ansi": {
			"version": "6.0.1",
			"resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
			"integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ansi-regex": "^5.0.1"
			},
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/combined-stream": {
			"version": "1.0.8",
			"resolved": "https://registry.npmjs.org/combined-stream/-/combined-stream-1.0.8.tgz",
			"integrity": "sha512-FQN4MRfuJeHf7cBbBMJFXhKSDq+2kAArBlmRBvcvFE5BB1HZKXtSFASDhdlz9zOYwxh8lDdnvmMOe/+5cdoEdg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"delayed-stream": "~1.0.0"
			},
			"engines": {
				"node": ">= 0.8"
			}
		},
		"node_modules/commander": {
			"version": "11.1.0",
			"resolved": "https://registry.npmjs.org/commander/-/commander-11.1.0.tgz",
			"integrity": "sha512-yPVavfyCcRhmorC7rWlkHn15b4wDVgVmBA7kV4QVBsF7kv/9TKJAbAXVTxvTnwP8HHKjRCJDClKbciiYS7p0DQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=16"
			}
		},
		"node_modules/common-path-prefix": {
			"version": "3.0.0",
			"resolved": "https://registry.npmjs.org/common-path-prefix/-/common-path-prefix-3.0.0.tgz",
			"integrity": "sha512-QE33hToZseCH3jS0qN96O/bSh3kaw/h+Tq7ngyY9eWDUnTlTNUyqfqvCXioLe5Na5jFsL78ra/wuBU4iuEgd4w==",
			"dev": true,
			"license": "ISC"
		},
		"node_modules/compressible": {
			"version": "2.0.18",
			"resolved": "https://registry.npmjs.org/compressible/-/compressible-2.0.18.tgz",
			"integrity": "sha512-AF3r7P5dWxL8MxyITRMlORQNaOA2IkAFaTr4k7BUumjPtRpGDTZpl0Pb1XCO6JeDCBdp126Cgs9sMxqSjgYyRg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"mime-db": ">= 1.43.0 < 2"
			},
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/compression": {
			"version": "1.8.1",
			"resolved": "https://registry.npmjs.org/compression/-/compression-1.8.1.tgz",
			"integrity": "sha512-9mAqGPHLakhCLeNyxPkK4xVo746zQ/czLH1Ky+vkitMnWfWZps8r0qXuwhwizagCRttsL4lfG4pIOvaWLpAP0w==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"bytes": "3.1.2",
				"compressible": "~2.0.18",
				"debug": "2.6.9",
				"negotiator": "~0.6.4",
				"on-headers": "~1.1.0",
				"safe-buffer": "5.2.1",
				"vary": "~1.1.2"
			},
			"engines": {
				"node": ">= 0.8.0"
			}
		},
		"node_modules/compression/node_modules/debug": {
			"version": "2.6.9",
			"resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
			"integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ms": "2.0.0"
			}
		},
		"node_modules/compression/node_modules/ms": {
			"version": "2.0.0",
			"resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
			"integrity": "sha512-Tpp60P6IUJDTuOq/5Z8cdskzJujfwqfOTkrwIwj7IRISpnkJnT6SyJ4PCPnGMoFjC9ddhal5KVIYtAt97ix05A==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/compression/node_modules/negotiator": {
			"version": "0.6.4",
			"resolved": "https://registry.npmjs.org/negotiator/-/negotiator-0.6.4.tgz",
			"integrity": "sha512-myRT3DiWPHqho5PrJaIRyaMv2kgYf0mUVgBNOYMuCH5Ki1yEiQaf/ZJuQ62nvpc44wL5WDbTX7yGJi1Neevw8w==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/concat-map": {
			"version": "0.0.1",
			"resolved": "https://registry.npmjs.org/concat-map/-/concat-map-0.0.1.tgz",
			"integrity": "sha512-/Srv4dswyQNBfohGpz9o6Yb3Gz3SrUDqBH5rTuhGR7ahtlbYKnVxw2bCFMRljaA7EXHaXZ8wsHdodFvbkhKmqg==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/connect-history-api-fallback": {
			"version": "2.0.0",
			"resolved": "https://registry.npmjs.org/connect-history-api-fallback/-/connect-history-api-fallback-2.0.0.tgz",
			"integrity": "sha512-U73+6lQFmfiNPrYbXqr6kZ1i1wiRqXnp2nhMsINseWXO8lDau0LGEffJ8kQi4EjLZympVgRdvqjAgiZ1tgzDDA==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=0.8"
			}
		},
		"node_modules/content-disposition": {
			"version": "1.0.1",
			"resolved": "https://registry.npmjs.org/content-disposition/-/content-disposition-1.0.1.tgz",
			"integrity": "sha512-oIXISMynqSqm241k6kcQ5UwttDILMK4BiurCfGEREw6+X9jkkpEe5T9FZaApyLGGOnFuyMWZpdolTXMtvEJ08Q==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=18"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/express"
			}
		},
		"node_modules/content-type": {
			"version": "1.0.5",
			"resolved": "https://registry.npmjs.org/content-type/-/content-type-1.0.5.tgz",
			"integrity": "sha512-nTjqfcBFEipKdXCv4YDQWCfmcLZKm81ldF0pAopTvyrFGVbcR6P/VAAd5G7N+0tTr8QqiU0tFadD6FK4NtJwOA==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/convert-source-map": {
			"version": "1.9.0",
			"resolved": "https://registry.npmjs.org/convert-source-map/-/convert-source-map-1.9.0.tgz",
			"integrity": "sha512-ASFBup0Mz1uyiIjANan1jzLQami9z1PoYSZCiiYW2FczPbenXc45FZdBZLzOT+r6+iciuEModtmCti+hjaAk0A==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/cookie": {
			"version": "0.7.2",
			"resolved": "https://registry.npmjs.org/cookie/-/cookie-0.7.2.tgz",
			"integrity": "sha512-yki5XnKuf750l50uGTllt6kKILY4nQ1eNIQatoXEByZ5dWgnKqbnqmTrBE5B4N7lrMJKQ2ytWMiTO2o0v6Ew/w==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/cookie-signature": {
			"version": "1.2.2",
			"resolved": "https://registry.npmjs.org/cookie-signature/-/cookie-signature-1.2.2.tgz",
			"integrity": "sha512-D76uU73ulSXrD1UXF4KE2TMxVVwhsnCgfAyTg9k8P6KGZjlXKrOLe4dJQKI3Bxi5wjesZoFXJWElNWBjPZMbhg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=6.6.0"
			}
		},
		"node_modules/copy-anything": {
			"version": "3.0.5",
			"resolved": "https://registry.npmjs.org/copy-anything/-/copy-anything-3.0.5.tgz",
			"integrity": "sha512-yCEafptTtb4bk7GLEQoM8KVJpxAfdBJYaXyzQEgQQQgYrZiDp8SJmGKlYza6CYjEDNstAdNdKA3UuoULlEbS6w==",
			"dev": true,
			"license": "MIT",
			"peer": true,
			"dependencies": {
				"is-what": "^4.1.8"
			},
			"engines": {
				"node": ">=12.13"
			},
			"funding": {
				"url": "https://github.com/sponsors/mesqueeb"
			}
		},
		"node_modules/copy-webpack-plugin": {
			"version": "14.0.0",
			"resolved": "https://registry.npmjs.org/copy-webpack-plugin/-/copy-webpack-plugin-14.0.0.tgz",
			"integrity": "sha512-3JLW90aBGeaTLpM7mYQKpnVdgsUZRExY55giiZgLuX/xTQRUs1dOCwbBnWnvY6Q6rfZoXMNwzOQJCSZPppfqXA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"glob-parent": "^6.0.1",
				"normalize-path": "^3.0.0",
				"schema-utils": "^4.2.0",
				"serialize-javascript": "^7.0.3",
				"tinyglobby": "^0.2.12"
			},
			"engines": {
				"node": ">= 20.9.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/webpack"
			},
			"peerDependencies": {
				"webpack": "^5.1.0"
			}
		},
		"node_modules/core-js-compat": {
			"version": "3.49.0",
			"resolved": "https://registry.npmjs.org/core-js-compat/-/core-js-compat-3.49.0.tgz",
			"integrity": "sha512-VQXt1jr9cBz03b331DFDCCP90b3fanciLkgiOoy8SBHy06gNf+vQ1A3WFLqG7I8TipYIKeYK9wxd0tUrvHcOZA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"browserslist": "^4.28.1"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/core-js"
			}
		},
		"node_modules/core-util-is": {
			"version": "1.0.3",
			"resolved": "https://registry.npmjs.org/core-util-is/-/core-util-is-1.0.3.tgz",
			"integrity": "sha512-ZQBvi1DcpJ4GDqanjucZ2Hj3wEO5pZDS89BWbkcrvdxksJorwUDDZamX9ldFkp9aw2lmBDLgkObEA4DWNJ9FYQ==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/cors": {
			"version": "2.8.6",
			"resolved": "https://registry.npmjs.org/cors/-/cors-2.8.6.tgz",
			"integrity": "sha512-tJtZBBHA6vjIAaF6EnIaq6laBBP9aq/Y3ouVJjEfoHbRBcHBAHYcMh/w8LDrk2PvIMMq8gmopa5D4V8RmbrxGw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"object-assign": "^4",
				"vary": "^1"
			},
			"engines": {
				"node": ">= 0.10"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/express"
			}
		},
		"node_modules/corser": {
			"version": "2.0.1",
			"resolved": "https://registry.npmjs.org/corser/-/corser-2.0.1.tgz",
			"integrity": "sha512-utCYNzRSQIZNPIcGZdQc92UVJYAhtGAteCFg0yRaFm8f0P+CPtyGyHXJcGXnffjCybUCEx3FQ2G7U3/o9eIkVQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.4.0"
			}
		},
		"node_modules/cosmiconfig": {
			"version": "7.1.0",
			"resolved": "https://registry.npmjs.org/cosmiconfig/-/cosmiconfig-7.1.0.tgz",
			"integrity": "sha512-AdmX6xUzdNASswsFtmwSt7Vj8po9IuqXm0UXz7QKPuEUmPB4XyjGfaAr2PSuELMwkRMVH1EpIkX5bTZGRB3eCA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@types/parse-json": "^4.0.0",
				"import-fresh": "^3.2.1",
				"parse-json": "^5.0.0",
				"path-type": "^4.0.0",
				"yaml": "^1.10.0"
			},
			"engines": {
				"node": ">=10"
			}
		},
		"node_modules/cosmiconfig/node_modules/yaml": {
			"version": "1.10.3",
			"resolved": "https://registry.npmjs.org/yaml/-/yaml-1.10.3.tgz",
			"integrity": "sha512-vIYeF1u3CjlhAFekPPAk2h/Kv4T3mAkMox5OymRiJQB0spDP10LHvt+K7G9Ny6NuuMAb25/6n1qyUjAcGNf/AA==",
			"dev": true,
			"license": "ISC",
			"engines": {
				"node": ">= 6"
			}
		},
		"node_modules/cron-parser": {
			"version": "4.9.0",
			"resolved": "https://registry.npmjs.org/cron-parser/-/cron-parser-4.9.0.tgz",
			"integrity": "sha512-p0SaNjrHOnQeR8/VnfGbmg9te2kfyYSQ7Sc/j/6DtPL3JQvKxmjO9TSjNFpujqV3vEYYBvNNvXSxzyksBWAx1Q==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"luxon": "^3.2.1"
			},
			"engines": {
				"node": ">=12.0.0"
			}
		},
		"node_modules/cross-spawn": {
			"version": "7.0.6",
			"resolved": "https://registry.npmjs.org/cross-spawn/-/cross-spawn-7.0.6.tgz",
			"integrity": "sha512-uV2QOWP2nWzsy2aMp8aRibhi9dlzF5Hgh5SHaB9OiTGEyDTiJJyx0uy51QXdyWbtAHNua4XJzUKca3OzKUd3vA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"path-key": "^3.1.0",
				"shebang-command": "^2.0.0",
				"which": "^2.0.1"
			},
			"engines": {
				"node": ">= 8"
			}
		},
		"node_modules/css-declaration-sorter": {
			"version": "7.4.0",
			"resolved": "https://registry.npmjs.org/css-declaration-sorter/-/css-declaration-sorter-7.4.0.tgz",
			"integrity": "sha512-LTuzjPoyA2vMGKKcaOqKSp7Ub2eGrNfKiZH4LpezxpNrsICGCSFvsQOI29psISxNZtaXibkC2CXzrQ5enMeGGw==",
			"dev": true,
			"license": "ISC",
			"engines": {
				"node": "^14 || ^16 || >=18"
			},
			"peerDependencies": {
				"postcss": "^8.0.9"
			}
		},
		"node_modules/css-loader": {
			"version": "6.11.0",
			"resolved": "https://registry.npmjs.org/css-loader/-/css-loader-6.11.0.tgz",
			"integrity": "sha512-CTJ+AEQJjq5NzLga5pE39qdiSV56F8ywCIsqNIRF0r7BDgWsN25aazToqAFg7ZrtA/U016xudB3ffgweORxX7g==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"icss-utils": "^5.1.0",
				"postcss": "^8.4.33",
				"postcss-modules-extract-imports": "^3.1.0",
				"postcss-modules-local-by-default": "^4.0.5",
				"postcss-modules-scope": "^3.2.0",
				"postcss-modules-values": "^4.0.0",
				"postcss-value-parser": "^4.2.0",
				"semver": "^7.5.4"
			},
			"engines": {
				"node": ">= 12.13.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/webpack"
			},
			"peerDependencies": {
				"@rspack/core": "0.x || 1.x",
				"webpack": "^5.0.0"
			},
			"peerDependenciesMeta": {
				"@rspack/core": {
					"optional": true
				},
				"webpack": {
					"optional": true
				}
			}
		},
		"node_modules/css-minimizer-webpack-plugin": {
			"version": "8.0.0",
			"resolved": "https://registry.npmjs.org/css-minimizer-webpack-plugin/-/css-minimizer-webpack-plugin-8.0.0.tgz",
			"integrity": "sha512-9bEpzHs8gEq6/cbEj418jXL/YWjBUD2YTLLk905Npt2JODqnRITin0+So5Vx4Dp5vyi2Lpt9pp2QHzQ7fdxNrw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@jridgewell/trace-mapping": "^0.3.25",
				"cssnano": "^7.0.4",
				"jest-worker": "^30.0.5",
				"postcss": "^8.4.40",
				"schema-utils": "^4.2.0",
				"serialize-javascript": "^7.0.3"
			},
			"engines": {
				"node": ">= 20.9.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/webpack"
			},
			"peerDependencies": {
				"webpack": "^5.0.0"
			},
			"peerDependenciesMeta": {
				"@parcel/css": {
					"optional": true
				},
				"@swc/css": {
					"optional": true
				},
				"clean-css": {
					"optional": true
				},
				"csso": {
					"optional": true
				},
				"esbuild": {
					"optional": true
				},
				"lightningcss": {
					"optional": true
				}
			}
		},
		"node_modules/css-select": {
			"version": "6.0.0",
			"resolved": "https://registry.npmjs.org/css-select/-/css-select-6.0.0.tgz",
			"integrity": "sha512-rZZVSLle8v0+EY8QAkDWrKhpgt6SA5OtHsgBnsj6ZaLb5dmDVOWUDtQitd9ydxxvEjhewNudS6eTVU7uOyzvXw==",
			"dev": true,
			"license": "BSD-2-Clause",
			"dependencies": {
				"boolbase": "^1.0.0",
				"css-what": "^7.0.0",
				"domhandler": "^5.0.3",
				"domutils": "^3.2.2",
				"nth-check": "^2.1.1"
			},
			"funding": {
				"url": "https://github.com/sponsors/fb55"
			}
		},
		"node_modules/css-tree": {
			"version": "3.2.1",
			"resolved": "https://registry.npmjs.org/css-tree/-/css-tree-3.2.1.tgz",
			"integrity": "sha512-X7sjQzceUhu1u7Y/ylrRZFU2FS6LRiFVp6rKLPg23y3x3c3DOKAwuXGDp+PAGjh6CSnCjYeAul8pcT8bAl+lSA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"mdn-data": "2.27.1",
				"source-map-js": "^1.2.1"
			},
			"engines": {
				"node": "^10 || ^12.20.0 || ^14.13.0 || >=15.0.0"
			}
		},
		"node_modules/css-what": {
			"version": "7.0.0",
			"resolved": "https://registry.npmjs.org/css-what/-/css-what-7.0.0.tgz",
			"integrity": "sha512-wD5oz5xibMOPHzy13CyGmogB3phdvcDaB5t0W/Nr5Z2O/agcB8YwOz6e2Lsp10pNDzBoDO9nVa3RGs/2BttpHQ==",
			"dev": true,
			"license": "BSD-2-Clause",
			"engines": {
				"node": ">= 6"
			},
			"funding": {
				"url": "https://github.com/sponsors/fb55"
			}
		},
		"node_modules/cssesc": {
			"version": "3.0.0",
			"resolved": "https://registry.npmjs.org/cssesc/-/cssesc-3.0.0.tgz",
			"integrity": "sha512-/Tb/JcjK111nNScGob5MNtsntNM1aCNUDipB/TkwZFhyDrrE47SOx/18wF2bbjgc3ZzCSKW1T5nt5EbFoAz/Vg==",
			"dev": true,
			"license": "MIT",
			"bin": {
				"cssesc": "bin/cssesc"
			},
			"engines": {
				"node": ">=4"
			}
		},
		"node_modules/cssnano": {
			"version": "7.1.7",
			"resolved": "https://registry.npmjs.org/cssnano/-/cssnano-7.1.7.tgz",
			"integrity": "sha512-N5LGn/OlhMxDTvKACwUPMzT34SSj1b022pvUAE/Vh6r2WD1aUCbc+QNIP/JjX9VVxebdJWZQ3352Lt4oF7dQ/g==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"cssnano-preset-default": "^7.0.15",
				"lilconfig": "^3.1.3"
			},
			"engines": {
				"node": "^18.12.0 || ^20.9.0 || >=22.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/cssnano"
			},
			"peerDependencies": {
				"postcss": "^8.5.10"
			}
		},
		"node_modules/cssnano-preset-default": {
			"version": "7.0.15",
			"resolved": "https://registry.npmjs.org/cssnano-preset-default/-/cssnano-preset-default-7.0.15.tgz",
			"integrity": "sha512-60kx7lJ40//HA85cIfQXSOJFby2D2V1pOMNHVCxue3KFWCjRzmiQyL9OvI+NAhwUlaojOfF9eK3nGvrJLCBUfQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"browserslist": "^4.28.2",
				"css-declaration-sorter": "^7.2.0",
				"cssnano-utils": "^5.0.2",
				"postcss-calc": "^10.1.1",
				"postcss-colormin": "^7.0.9",
				"postcss-convert-values": "^7.0.11",
				"postcss-discard-comments": "^7.0.7",
				"postcss-discard-duplicates": "^7.0.3",
				"postcss-discard-empty": "^7.0.2",
				"postcss-discard-overridden": "^7.0.2",
				"postcss-merge-longhand": "^7.0.6",
				"postcss-merge-rules": "^7.0.10",
				"postcss-minify-font-values": "^7.0.2",
				"postcss-minify-gradients": "^7.0.4",
				"postcss-minify-params": "^7.0.8",
				"postcss-minify-selectors": "^7.1.0",
				"postcss-normalize-charset": "^7.0.2",
				"postcss-normalize-display-values": "^7.0.2",
				"postcss-normalize-positions": "^7.0.3",
				"postcss-normalize-repeat-style": "^7.0.3",
				"postcss-normalize-string": "^7.0.2",
				"postcss-normalize-timing-functions": "^7.0.2",
				"postcss-normalize-unicode": "^7.0.8",
				"postcss-normalize-url": "^7.0.2",
				"postcss-normalize-whitespace": "^7.0.2",
				"postcss-ordered-values": "^7.0.3",
				"postcss-reduce-initial": "^7.0.8",
				"postcss-reduce-transforms": "^7.0.2",
				"postcss-svgo": "^7.1.2",
				"postcss-unique-selectors": "^7.0.6"
			},
			"engines": {
				"node": "^18.12.0 || ^20.9.0 || >=22.0"
			},
			"peerDependencies": {
				"postcss": "^8.5.10"
			}
		},
		"node_modules/cssnano-utils": {
			"version": "5.0.2",
			"resolved": "https://registry.npmjs.org/cssnano-utils/-/cssnano-utils-5.0.2.tgz",
			"integrity": "sha512-kt41WLK7FLKfePzPi645Y+/NtW/nNM7Su6nlNUfJyRNW3JcuU3JU7+cWJc+JexTeZ8dRBvFufefdG2XpXkIo0A==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": "^18.12.0 || ^20.9.0 || >=22.0"
			},
			"peerDependencies": {
				"postcss": "^8.5.10"
			}
		},
		"node_modules/csso": {
			"version": "5.0.5",
			"resolved": "https://registry.npmjs.org/csso/-/csso-5.0.5.tgz",
			"integrity": "sha512-0LrrStPOdJj+SPCCrGhzryycLjwcgUSHBtxNA8aIDxf0GLsRh1cKYhB00Gd1lDOS4yGH69+SNn13+TWbVHETFQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"css-tree": "~2.2.0"
			},
			"engines": {
				"node": "^10 || ^12.20.0 || ^14.13.0 || >=15.0.0",
				"npm": ">=7.0.0"
			}
		},
		"node_modules/csso/node_modules/css-tree": {
			"version": "2.2.1",
			"resolved": "https://registry.npmjs.org/css-tree/-/css-tree-2.2.1.tgz",
			"integrity": "sha512-OA0mILzGc1kCOCSJerOeqDxDQ4HOh+G8NbOJFOTgOCzpw7fCBubk0fEyxp8AgOL/jvLgYA/uV0cMbe43ElF1JA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"mdn-data": "2.0.28",
				"source-map-js": "^1.0.1"
			},
			"engines": {
				"node": "^10 || ^12.20.0 || ^14.13.0 || >=15.0.0",
				"npm": ">=7.0.0"
			}
		},
		"node_modules/csso/node_modules/mdn-data": {
			"version": "2.0.28",
			"resolved": "https://registry.npmjs.org/mdn-data/-/mdn-data-2.0.28.tgz",
			"integrity": "sha512-aylIc7Z9y4yzHYAJNuESG3hfhC+0Ibp/MAMiaOZgNv4pmEdFyfZhhhny4MNiAfWdBQ1RQ2mfDWmM1x8SvGyp8g==",
			"dev": true,
			"license": "CC0-1.0"
		},
		"node_modules/cssstyle": {
			"version": "6.2.0",
			"resolved": "https://registry.npmjs.org/cssstyle/-/cssstyle-6.2.0.tgz",
			"integrity": "sha512-Fm5NvhYathRnXNVndkUsCCuR63DCLVVwGOOwQw782coXFi5HhkXdu289l59HlXZBawsyNccXfWRYvLzcDCdDig==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@asamuzakjp/css-color": "^5.0.1",
				"@csstools/css-syntax-patches-for-csstree": "^1.0.28",
				"css-tree": "^3.1.0",
				"lru-cache": "^11.2.6"
			},
			"engines": {
				"node": ">=20"
			}
		},
		"node_modules/cssstyle/node_modules/lru-cache": {
			"version": "11.2.7",
			"resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-11.2.7.tgz",
			"integrity": "sha512-aY/R+aEsRelme17KGQa/1ZSIpLpNYYrhcrepKTZgE+W3WM16YMCaPwOHLHsmopZHELU0Ojin1lPVxKR0MihncA==",
			"dev": true,
			"license": "BlueOak-1.0.0",
			"engines": {
				"node": "20 || >=22"
			}
		},
		"node_modules/data-urls": {
			"version": "7.0.0",
			"resolved": "https://registry.npmjs.org/data-urls/-/data-urls-7.0.0.tgz",
			"integrity": "sha512-23XHcCF+coGYevirZceTVD7NdJOqVn+49IHyxgszm+JIiHLoB2TkmPtsYkNWT1pvRSGkc35L6NHs0yHkN2SumA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"whatwg-mimetype": "^5.0.0",
				"whatwg-url": "^16.0.0"
			},
			"engines": {
				"node": "^20.19.0 || ^22.12.0 || >=24.0.0"
			}
		},
		"node_modules/debug": {
			"version": "4.4.3",
			"resolved": "https://registry.npmjs.org/debug/-/debug-4.4.3.tgz",
			"integrity": "sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ms": "^2.1.3"
			},
			"engines": {
				"node": ">=6.0"
			},
			"peerDependenciesMeta": {
				"supports-color": {
					"optional": true
				}
			}
		},
		"node_modules/decimal.js": {
			"version": "10.6.0",
			"resolved": "https://registry.npmjs.org/decimal.js/-/decimal.js-10.6.0.tgz",
			"integrity": "sha512-YpgQiITW3JXGntzdUmyUR1V812Hn8T1YVXhCu+wO3OpS4eU9l4YdD3qjyiKdV6mvV29zapkMeD390UVEf2lkUg==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/deep-is": {
			"version": "0.1.4",
			"resolved": "https://registry.npmjs.org/deep-is/-/deep-is-0.1.4.tgz",
			"integrity": "sha512-oIPzksmTg4/MriiaYGO+okXDT7ztn/w3Eptv/+gSIdMdKsJo0u4CfYNFJPy+4SKMuCqGw2wxnA+URMg3t8a/bQ==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/deepmerge": {
			"version": "4.3.1",
			"resolved": "https://registry.npmjs.org/deepmerge/-/deepmerge-4.3.1.tgz",
			"integrity": "sha512-3sUqbMEc77XqpdNO7FRyRog+eW3ph+GYCbj+rK+uYyRMuwsVy0rMiVtPn+QJlKFvWP/1PYpapqYn0Me2knFn+A==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=0.10.0"
			}
		},
		"node_modules/default-browser": {
			"version": "5.5.0",
			"resolved": "https://registry.npmjs.org/default-browser/-/default-browser-5.5.0.tgz",
			"integrity": "sha512-H9LMLr5zwIbSxrmvikGuI/5KGhZ8E2zH3stkMgM5LpOWDutGM2JZaj460Udnf1a+946zc7YBgrqEWwbk7zHvGw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"bundle-name": "^4.1.0",
				"default-browser-id": "^5.0.0"
			},
			"engines": {
				"node": ">=18"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/default-browser-id": {
			"version": "5.0.1",
			"resolved": "https://registry.npmjs.org/default-browser-id/-/default-browser-id-5.0.1.tgz",
			"integrity": "sha512-x1VCxdX4t+8wVfd1so/9w+vQ4vx7lKd2Qp5tDRutErwmR85OgmfX7RlLRMWafRMY7hbEiXIbudNrjOAPa/hL8Q==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=18"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/defaults": {
			"version": "1.0.4",
			"resolved": "https://registry.npmjs.org/defaults/-/defaults-1.0.4.tgz",
			"integrity": "sha512-eFuaLoy/Rxalv2kr+lqMlUnrDWV+3j4pljOIJgLIhI058IQfWJ7vXhyEIHu+HtC738klGALYxOKDO0bQP3tg8A==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"clone": "^1.0.2"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/define-lazy-prop": {
			"version": "2.0.0",
			"resolved": "https://registry.npmjs.org/define-lazy-prop/-/define-lazy-prop-2.0.0.tgz",
			"integrity": "sha512-Ds09qNh8yw3khSjiJjiUInaGX9xlqZDY7JVryGxdxV7NPeuqQfplOpQ66yJFZut3jLa5zOwkXw1g9EI2uKh4Og==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/delayed-stream": {
			"version": "1.0.0",
			"resolved": "https://registry.npmjs.org/delayed-stream/-/delayed-stream-1.0.0.tgz",
			"integrity": "sha512-ZySD7Nf91aLB0RxL4KGrKHBXl7Eds1DAmEdcoVawXnLD7SDhpNgtuII2aAkg7a7QS41jxPSZ17p4VdGnMHk3MQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=0.4.0"
			}
		},
		"node_modules/depd": {
			"version": "2.0.0",
			"resolved": "https://registry.npmjs.org/depd/-/depd-2.0.0.tgz",
			"integrity": "sha512-g7nH6P6dyDioJogAAGprGpCtVImJhpPk/roCzdb3fIh61/s/nPsfR6onyMwkCAR/OlC3yBC0lESvUoQEAssIrw==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.8"
			}
		},
		"node_modules/destroy": {
			"version": "1.2.0",
			"resolved": "https://registry.npmjs.org/destroy/-/destroy-1.2.0.tgz",
			"integrity": "sha512-2sJGJTaXIIaR1w4iJSNoN0hnMY7Gpc/n8D4qSCJw8QqFWXf7cuAgnEHxBpweaVcPevC2l3KpjYCx3NypQQgaJg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.8",
				"npm": "1.2.8000 || >= 1.4.16"
			}
		},
		"node_modules/detect-libc": {
			"version": "2.1.2",
			"resolved": "https://registry.npmjs.org/detect-libc/-/detect-libc-2.1.2.tgz",
			"integrity": "sha512-Btj2BOOO83o3WyH59e8MgXsxEQVcarkUOpEYrubB0urwnN10yQ364rsiByU11nZlqWYZm05i/of7io4mzihBtQ==",
			"dev": true,
			"license": "Apache-2.0",
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/detect-node": {
			"version": "2.1.0",
			"resolved": "https://registry.npmjs.org/detect-node/-/detect-node-2.1.0.tgz",
			"integrity": "sha512-T0NIuQpnTvFDATNuHN5roPwSBG83rFsuO+MXXH9/3N1eFbn4wcPjttvjMLEPWJ0RGUYgQE7cGgS3tNxbqCGM7g==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/detect-port": {
			"version": "1.6.1",
			"resolved": "https://registry.npmjs.org/detect-port/-/detect-port-1.6.1.tgz",
			"integrity": "sha512-CmnVc+Hek2egPx1PeTFVta2W78xy2K/9Rkf6cC4T59S50tVnzKj+tnx5mmx5lwvCkujZ4uRrpRSuV+IVs3f90Q==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"address": "^1.0.1",
				"debug": "4"
			},
			"bin": {
				"detect": "bin/detect-port.js",
				"detect-port": "bin/detect-port.js"
			},
			"engines": {
				"node": ">= 4.0.0"
			}
		},
		"node_modules/dns-packet": {
			"version": "5.6.1",
			"resolved": "https://registry.npmjs.org/dns-packet/-/dns-packet-5.6.1.tgz",
			"integrity": "sha512-l4gcSouhcgIKRvyy99RNVOgxXiicE+2jZoNmaNmZ6JXiGajBOJAesk1OBlJuM5k2c+eudGdLxDqXuPCKIj6kpw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@leichtgewicht/ip-codec": "^2.0.1"
			},
			"engines": {
				"node": ">=6"
			}
		},
		"node_modules/dom-serializer": {
			"version": "2.0.0",
			"resolved": "https://registry.npmjs.org/dom-serializer/-/dom-serializer-2.0.0.tgz",
			"integrity": "sha512-wIkAryiqt/nV5EQKqQpo3SToSOV9J0DnbJqwK7Wv/Trc92zIAYZ4FlMu+JPFW1DfGFt81ZTCGgDEabffXeLyJg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"domelementtype": "^2.3.0",
				"domhandler": "^5.0.2",
				"entities": "^4.2.0"
			},
			"funding": {
				"url": "https://github.com/cheeriojs/dom-serializer?sponsor=1"
			}
		},
		"node_modules/domelementtype": {
			"version": "2.3.0",
			"resolved": "https://registry.npmjs.org/domelementtype/-/domelementtype-2.3.0.tgz",
			"integrity": "sha512-OLETBj6w0OsagBwdXnPdN0cnMfF9opN69co+7ZrbfPGrdpPVNBUj02spi6B1N7wChLQiPn4CSH/zJvXw56gmHw==",
			"dev": true,
			"funding": [
				{
					"type": "github",
					"url": "https://github.com/sponsors/fb55"
				}
			],
			"license": "BSD-2-Clause"
		},
		"node_modules/domhandler": {
			"version": "5.0.3",
			"resolved": "https://registry.npmjs.org/domhandler/-/domhandler-5.0.3.tgz",
			"integrity": "sha512-cgwlv/1iFQiFnU96XXgROh8xTeetsnJiDsTc7TYCLFd9+/WNkIqPTxiM/8pSd8VIrhXGTf1Ny1q1hquVqDJB5w==",
			"dev": true,
			"license": "BSD-2-Clause",
			"dependencies": {
				"domelementtype": "^2.3.0"
			},
			"engines": {
				"node": ">= 4"
			},
			"funding": {
				"url": "https://github.com/fb55/domhandler?sponsor=1"
			}
		},
		"node_modules/domutils": {
			"version": "3.2.2",
			"resolved": "https://registry.npmjs.org/domutils/-/domutils-3.2.2.tgz",
			"integrity": "sha512-6kZKyUajlDuqlHKVX1w7gyslj9MPIXzIFiz/rGu35uC1wMi+kMhQwGhl4lt9unC9Vb9INnY9Z3/ZA3+FhASLaw==",
			"dev": true,
			"license": "BSD-2-Clause",
			"dependencies": {
				"dom-serializer": "^2.0.0",
				"domelementtype": "^2.3.0",
				"domhandler": "^5.0.3"
			},
			"funding": {
				"url": "https://github.com/fb55/domutils?sponsor=1"
			}
		},
		"node_modules/dotenv": {
			"version": "16.4.7",
			"resolved": "https://registry.npmjs.org/dotenv/-/dotenv-16.4.7.tgz",
			"integrity": "sha512-47qPchRCykZC03FhkYAhrvwU4xDBFIj1QPqaarj6mdM/hgUzfPHcpkHJOn3mJAufFeeAxAzeGsr5X0M4k6fLZQ==",
			"dev": true,
			"license": "BSD-2-Clause",
			"engines": {
				"node": ">=12"
			},
			"funding": {
				"url": "https://dotenvx.com"
			}
		},
		"node_modules/dotenv-expand": {
			"version": "11.0.7",
			"resolved": "https://registry.npmjs.org/dotenv-expand/-/dotenv-expand-11.0.7.tgz",
			"integrity": "sha512-zIHwmZPRshsCdpMDyVsqGmgyP0yT8GAgXUnkdAoJisxvf33k7yO6OuoKmcTGuXPWSsm8Oh88nZicRLA9Y0rUeA==",
			"dev": true,
			"license": "BSD-2-Clause",
			"dependencies": {
				"dotenv": "^16.4.5"
			},
			"engines": {
				"node": ">=12"
			},
			"funding": {
				"url": "https://dotenvx.com"
			}
		},
		"node_modules/dunder-proto": {
			"version": "1.0.1",
			"resolved": "https://registry.npmjs.org/dunder-proto/-/dunder-proto-1.0.1.tgz",
			"integrity": "sha512-KIN/nDJBQRcXw0MLVhZE9iQHmG68qAVIBg9CqmUYjmQIhgij9U5MFvrqkUL5FbtyyzZuOeOt0zdeRe4UY7ct+A==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"call-bind-apply-helpers": "^1.0.1",
				"es-errors": "^1.3.0",
				"gopd": "^1.2.0"
			},
			"engines": {
				"node": ">= 0.4"
			}
		},
		"node_modules/ee-first": {
			"version": "1.1.1",
			"resolved": "https://registry.npmjs.org/ee-first/-/ee-first-1.1.1.tgz",
			"integrity": "sha512-WMwm9LhRUo+WUaRN+vRuETqG89IgZphVSNkdFgeb6sS/E4OrDIN7t48CAewSHXc6C8lefD8KKfr5vY61brQlow==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/ejs": {
			"version": "5.0.1",
			"resolved": "https://registry.npmjs.org/ejs/-/ejs-5.0.1.tgz",
			"integrity": "sha512-COqBPFMxuPTPspXl2DkVYaDS3HtrD1GpzOGkNTJ1IYkifq/r9h8SVEFrjA3D9/VJGOEoMQcrlhpntcSUrM8k6A==",
			"dev": true,
			"license": "Apache-2.0",
			"bin": {
				"ejs": "bin/cli.js"
			},
			"engines": {
				"node": ">=0.12.18"
			}
		},
		"node_modules/electron-to-chromium": {
			"version": "1.5.331",
			"resolved": "https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.5.331.tgz",
			"integrity": "sha512-IbxXrsTlD3hRodkLnbxAPP4OuJYdWCeM3IOdT+CpcMoIwIoDfCmRpEtSPfwBXxVkg9xmBeY7Lz2Eo2TDn/HC3Q==",
			"dev": true,
			"license": "ISC"
		},
		"node_modules/emoji-regex": {
			"version": "10.6.0",
			"resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-10.6.0.tgz",
			"integrity": "sha512-toUI84YS5YmxW219erniWD0CIVOo46xGKColeNQRgOzDorgBi1v4D71/OFzgD9GO2UGKIv1C3Sp8DAn0+j5w7A==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/emojis-list": {
			"version": "3.0.0",
			"resolved": "https://registry.npmjs.org/emojis-list/-/emojis-list-3.0.0.tgz",
			"integrity": "sha512-/kyM18EfinwXZbno9FyUGeFh87KC8HRQBQGildHZbEuRyWFOmv1U10o9BBp8XVZDVNNuQKyIGIu5ZYAAXJ0V2Q==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 4"
			}
		},
		"node_modules/encodeurl": {
			"version": "2.0.0",
			"resolved": "https://registry.npmjs.org/encodeurl/-/encodeurl-2.0.0.tgz",
			"integrity": "sha512-Q0n9HRi4m6JuGIV1eFlmvJB7ZEVxu93IrMyiMsGC0lrMJMWzRgx6WGquyfQgZVb31vhGgXnfmPNNXmxnOkRBrg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.8"
			}
		},
		"node_modules/encoding": {
			"version": "0.1.13",
			"resolved": "https://registry.npmjs.org/encoding/-/encoding-0.1.13.tgz",
			"integrity": "sha512-ETBauow1T35Y/WZMkio9jiM0Z5xjHHmJ4XmjZOq1l/dXz3lr2sRn87nJy20RupqSh1F2m3HHPSp8ShIPQJrJ3A==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"iconv-lite": "^0.6.2"
			}
		},
		"node_modules/encoding/node_modules/iconv-lite": {
			"version": "0.6.3",
			"resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.6.3.tgz",
			"integrity": "sha512-4fCk79wshMdzMp2rH06qWrJE4iolqLhCUH+OiuIgU++RB0+94NlDL81atO7GX55uUKueo0txHNtvEyI6D7WdMw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"safer-buffer": ">= 2.1.2 < 3.0.0"
			},
			"engines": {
				"node": ">=0.10.0"
			}
		},
		"node_modules/end-of-stream": {
			"version": "1.4.5",
			"resolved": "https://registry.npmjs.org/end-of-stream/-/end-of-stream-1.4.5.tgz",
			"integrity": "sha512-ooEGc6HP26xXq/N+GCGOT0JKCLDGrq2bQUZrQ7gyrJiZANJ/8YDTxTpQBXGMn+WbIQXNVpyWymm7KYVICQnyOg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"once": "^1.4.0"
			}
		},
		"node_modules/enhanced-resolve": {
			"version": "5.20.1",
			"resolved": "https://registry.npmjs.org/enhanced-resolve/-/enhanced-resolve-5.20.1.tgz",
			"integrity": "sha512-Qohcme7V1inbAfvjItgw0EaxVX5q2rdVEZHRBrEQdRZTssLDGsL8Lwrznl8oQ/6kuTJONLaDcGjkNP247XEhcA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"graceful-fs": "^4.2.4",
				"tapable": "^2.3.0"
			},
			"engines": {
				"node": ">=10.13.0"
			}
		},
		"node_modules/enquirer": {
			"version": "2.3.6",
			"resolved": "https://registry.npmjs.org/enquirer/-/enquirer-2.3.6.tgz",
			"integrity": "sha512-yjNnPr315/FjS4zIsUxYguYUPP2e1NK4d7E7ZOLiyYCcbFBiTMyID+2wvm2w6+pZ/odMA7cRkjhsPbltwBOrLg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ansi-colors": "^4.1.1"
			},
			"engines": {
				"node": ">=8.6"
			}
		},
		"node_modules/entities": {
			"version": "4.5.0",
			"resolved": "https://registry.npmjs.org/entities/-/entities-4.5.0.tgz",
			"integrity": "sha512-V0hjH4dGPh9Ao5p0MoRY6BVqtwCjhz6vI5LT8AJ55H+4g9/4vbHx1I54fS0XuclLhDHArPQCiMjDxjaL8fPxhw==",
			"dev": true,
			"license": "BSD-2-Clause",
			"engines": {
				"node": ">=0.12"
			},
			"funding": {
				"url": "https://github.com/fb55/entities?sponsor=1"
			}
		},
		"node_modules/env-paths": {
			"version": "2.2.1",
			"resolved": "https://registry.npmjs.org/env-paths/-/env-paths-2.2.1.tgz",
			"integrity": "sha512-+h1lkLKhZMTYjog1VEpJNG7NZJWcuc2DDk/qsqSTRRCOXiLjeQ1d1/udrUGhqMxUgAlwKNZ0cf2uqan5GLuS2A==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=6"
			}
		},
		"node_modules/environment": {
			"version": "1.1.0",
			"resolved": "https://registry.npmjs.org/environment/-/environment-1.1.0.tgz",
			"integrity": "sha512-xUtoPkMggbz0MPyPiIWr1Kp4aeWJjDZ6SMvURhimjdZgsRuDplF5/s9hcgGhyXMhs+6vpnuoiZ2kFiu3FMnS8Q==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=18"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/err-code": {
			"version": "2.0.3",
			"resolved": "https://registry.npmjs.org/err-code/-/err-code-2.0.3.tgz",
			"integrity": "sha512-2bmlRpNKBxT/CRmPOlyISQpNj+qSeYvcym/uT0Jx2bMOlKLtSy1ZmLuVxSEKKyor/N5yhvp/ZiG1oE3DEYMSFA==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/errno": {
			"version": "0.1.8",
			"resolved": "https://registry.npmjs.org/errno/-/errno-0.1.8.tgz",
			"integrity": "sha512-dJ6oBr5SQ1VSd9qkk7ByRgb/1SH4JZjCHSW/mr63/QcXO9zLVxvJ6Oy13nio03rxpSnVDDjFor75SjVeZWPW/A==",
			"dev": true,
			"license": "MIT",
			"optional": true,
			"dependencies": {
				"prr": "~1.0.1"
			},
			"bin": {
				"errno": "cli.js"
			}
		},
		"node_modules/error-ex": {
			"version": "1.3.4",
			"resolved": "https://registry.npmjs.org/error-ex/-/error-ex-1.3.4.tgz",
			"integrity": "sha512-sqQamAnR14VgCr1A618A3sGrygcpK+HEbenA/HiEAkkUwcZIIB/tgWqHFxWgOyDh4nB4JCRimh79dR5Ywc9MDQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"is-arrayish": "^0.2.1"
			}
		},
		"node_modules/error-stack-parser": {
			"version": "2.1.4",
			"resolved": "https://registry.npmjs.org/error-stack-parser/-/error-stack-parser-2.1.4.tgz",
			"integrity": "sha512-Sk5V6wVazPhq5MhpO+AUxJn5x7XSXGl1R93Vn7i+zS15KDVxQijejNCrz8340/2bgLBjR9GtEG8ZVKONDjcqGQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"stackframe": "^1.3.4"
			}
		},
		"node_modules/es-define-property": {
			"version": "1.0.1",
			"resolved": "https://registry.npmjs.org/es-define-property/-/es-define-property-1.0.1.tgz",
			"integrity": "sha512-e3nRfgfUZ4rNGL232gUgX06QNyyez04KdjFrF+LTRoOXmrOgFKDg4BCdsjW8EnT69eqdYGmRpJwiPVYNrCaW3g==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.4"
			}
		},
		"node_modules/es-errors": {
			"version": "1.3.0",
			"resolved": "https://registry.npmjs.org/es-errors/-/es-errors-1.3.0.tgz",
			"integrity": "sha512-Zf5H2Kxt2xjTvbJvP2ZWLEICxA6j+hAmMzIlypy4xcBg1vKVnx89Wy0GbS+kf5cwCVFFzdCFh2XSCFNULS6csw==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.4"
			}
		},
		"node_modules/es-module-lexer": {
			"version": "2.0.0",
			"resolved": "https://registry.npmjs.org/es-module-lexer/-/es-module-lexer-2.0.0.tgz",
			"integrity": "sha512-5POEcUuZybH7IdmGsD8wlf0AI55wMecM9rVBTI/qEAy2c1kTOm3DjFYjrBdI2K3BaJjJYfYFeRtM0t9ssnRuxw==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/es-object-atoms": {
			"version": "1.1.1",
			"resolved": "https://registry.npmjs.org/es-object-atoms/-/es-object-atoms-1.1.1.tgz",
			"integrity": "sha512-FGgH2h8zKNim9ljj7dankFPcICIK9Cp5bm+c2gQSYePhpaG5+esrLODihIorn+Pe6FGJzWhXQotPv73jTaldXA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"es-errors": "^1.3.0"
			},
			"engines": {
				"node": ">= 0.4"
			}
		},
		"node_modules/es-set-tostringtag": {
			"version": "2.1.0",
			"resolved": "https://registry.npmjs.org/es-set-tostringtag/-/es-set-tostringtag-2.1.0.tgz",
			"integrity": "sha512-j6vWzfrGVfyXxge+O0x5sh6cvxAog0a/4Rdd2K36zCMV5eJ+/+tOAngRO8cODMNWbVRdVlmGZQL2YS3yR8bIUA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"es-errors": "^1.3.0",
				"get-intrinsic": "^1.2.6",
				"has-tostringtag": "^1.0.2",
				"hasown": "^2.0.2"
			},
			"engines": {
				"node": ">= 0.4"
			}
		},
		"node_modules/esbuild": {
			"version": "0.27.3",
			"resolved": "https://registry.npmjs.org/esbuild/-/esbuild-0.27.3.tgz",
			"integrity": "sha512-8VwMnyGCONIs6cWue2IdpHxHnAjzxnw2Zr7MkVxB2vjmQ2ivqGFb4LEG3SMnv0Gb2F/G/2yA8zUaiL1gywDCCg==",
			"dev": true,
			"hasInstallScript": true,
			"license": "MIT",
			"bin": {
				"esbuild": "bin/esbuild"
			},
			"engines": {
				"node": ">=18"
			},
			"optionalDependencies": {
				"@esbuild/aix-ppc64": "0.27.3",
				"@esbuild/android-arm": "0.27.3",
				"@esbuild/android-arm64": "0.27.3",
				"@esbuild/android-x64": "0.27.3",
				"@esbuild/darwin-arm64": "0.27.3",
				"@esbuild/darwin-x64": "0.27.3",
				"@esbuild/freebsd-arm64": "0.27.3",
				"@esbuild/freebsd-x64": "0.27.3",
				"@esbuild/linux-arm": "0.27.3",
				"@esbuild/linux-arm64": "0.27.3",
				"@esbuild/linux-ia32": "0.27.3",
				"@esbuild/linux-loong64": "0.27.3",
				"@esbuild/linux-mips64el": "0.27.3",
				"@esbuild/linux-ppc64": "0.27.3",
				"@esbuild/linux-riscv64": "0.27.3",
				"@esbuild/linux-s390x": "0.27.3",
				"@esbuild/linux-x64": "0.27.3",
				"@esbuild/netbsd-arm64": "0.27.3",
				"@esbuild/netbsd-x64": "0.27.3",
				"@esbuild/openbsd-arm64": "0.27.3",
				"@esbuild/openbsd-x64": "0.27.3",
				"@esbuild/openharmony-arm64": "0.27.3",
				"@esbuild/sunos-x64": "0.27.3",
				"@esbuild/win32-arm64": "0.27.3",
				"@esbuild/win32-ia32": "0.27.3",
				"@esbuild/win32-x64": "0.27.3"
			}
		},
		"node_modules/escalade": {
			"version": "3.2.0",
			"resolved": "https://registry.npmjs.org/escalade/-/escalade-3.2.0.tgz",
			"integrity": "sha512-WUj2qlxaQtO4g6Pq5c29GTcWGDyd8itL8zTlipgECz3JesAiiOKotd8JU6otB3PACgG6xkJUyVhboMS+bje/jA==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=6"
			}
		},
		"node_modules/escape-html": {
			"version": "1.0.3",
			"resolved": "https://registry.npmjs.org/escape-html/-/escape-html-1.0.3.tgz",
			"integrity": "sha512-NiSupZ4OeuGwr68lGIeym/ksIZMJodUGOSCZ/FSnTxcrekbvqrgdUxlJOMpijaKZVjAJrWrGs/6Jy8OMuyj9ow==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/escape-string-regexp": {
			"version": "4.0.0",
			"resolved": "https://registry.npmjs.org/escape-string-regexp/-/escape-string-regexp-4.0.0.tgz",
			"integrity": "sha512-TtpcNJ3XAzx3Gq8sWRzJaVajRs0uVxA2YAkdb1jm2YkPz4G6egUFAyA3n5vtEIZefPk5Wa4UXbKuS5fKkJWdgA==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=10"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/eslint": {
			"version": "10.2.0",
			"resolved": "https://registry.npmjs.org/eslint/-/eslint-10.2.0.tgz",
			"integrity": "sha512-+L0vBFYGIpSNIt/KWTpFonPrqYvgKw1eUI5Vn7mEogrQcWtWYtNQ7dNqC+px/J0idT3BAkiWrhfS7k+Tum8TUA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@eslint-community/eslint-utils": "^4.8.0",
				"@eslint-community/regexpp": "^4.12.2",
				"@eslint/config-array": "^0.23.4",
				"@eslint/config-helpers": "^0.5.4",
				"@eslint/core": "^1.2.0",
				"@eslint/plugin-kit": "^0.7.0",
				"@humanfs/node": "^0.16.6",
				"@humanwhocodes/module-importer": "^1.0.1",
				"@humanwhocodes/retry": "^0.4.2",
				"@types/estree": "^1.0.6",
				"ajv": "^6.14.0",
				"cross-spawn": "^7.0.6",
				"debug": "^4.3.2",
				"escape-string-regexp": "^4.0.0",
				"eslint-scope": "^9.1.2",
				"eslint-visitor-keys": "^5.0.1",
				"espree": "^11.2.0",
				"esquery": "^1.7.0",
				"esutils": "^2.0.2",
				"fast-deep-equal": "^3.1.3",
				"file-entry-cache": "^8.0.0",
				"find-up": "^5.0.0",
				"glob-parent": "^6.0.2",
				"ignore": "^5.2.0",
				"imurmurhash": "^0.1.4",
				"is-glob": "^4.0.0",
				"json-stable-stringify-without-jsonify": "^1.0.1",
				"minimatch": "^10.2.4",
				"natural-compare": "^1.4.0",
				"optionator": "^0.9.3"
			},
			"bin": {
				"eslint": "bin/eslint.js"
			},
			"engines": {
				"node": "^20.19.0 || ^22.13.0 || >=24"
			},
			"funding": {
				"url": "https://eslint.org/donate"
			},
			"peerDependencies": {
				"jiti": "*"
			},
			"peerDependenciesMeta": {
				"jiti": {
					"optional": true
				}
			}
		},
		"node_modules/eslint-config-prettier": {
			"version": "10.1.8",
			"resolved": "https://registry.npmjs.org/eslint-config-prettier/-/eslint-config-prettier-10.1.8.tgz",
			"integrity": "sha512-82GZUjRS0p/jganf6q1rEO25VSoHH0hKPCTrgillPjdI/3bgBhAE1QzHrHTizjpRvy6pGAvKjDJtk2pF9NDq8w==",
			"dev": true,
			"license": "MIT",
			"bin": {
				"eslint-config-prettier": "bin/cli.js"
			},
			"funding": {
				"url": "https://opencollective.com/eslint-config-prettier"
			},
			"peerDependencies": {
				"eslint": ">=7.0.0"
			}
		},
		"node_modules/eslint-plugin-prettier": {
			"version": "5.5.5",
			"resolved": "https://registry.npmjs.org/eslint-plugin-prettier/-/eslint-plugin-prettier-5.5.5.tgz",
			"integrity": "sha512-hscXkbqUZ2sPithAuLm5MXL+Wph+U7wHngPBv9OMWwlP8iaflyxpjTYZkmdgB4/vPIhemRlBEoLrH7UC1n7aUw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"prettier-linter-helpers": "^1.0.1",
				"synckit": "^0.11.12"
			},
			"engines": {
				"node": "^14.18.0 || >=16.0.0"
			},
			"funding": {
				"url": "https://opencollective.com/eslint-plugin-prettier"
			},
			"peerDependencies": {
				"@types/eslint": ">=8.0.0",
				"eslint": ">=8.0.0",
				"eslint-config-prettier": ">= 7.0.0 <10.0.0 || >=10.1.0",
				"prettier": ">=3.0.0"
			},
			"peerDependenciesMeta": {
				"@types/eslint": {
					"optional": true
				},
				"eslint-config-prettier": {
					"optional": true
				}
			}
		},
		"node_modules/eslint-scope": {
			"version": "9.1.2",
			"resolved": "https://registry.npmjs.org/eslint-scope/-/eslint-scope-9.1.2.tgz",
			"integrity": "sha512-xS90H51cKw0jltxmvmHy2Iai1LIqrfbw57b79w/J7MfvDfkIkFZ+kj6zC3BjtUwh150HsSSdxXZcsuv72miDFQ==",
			"dev": true,
			"license": "BSD-2-Clause",
			"dependencies": {
				"@types/esrecurse": "^4.3.1",
				"@types/estree": "^1.0.8",
				"esrecurse": "^4.3.0",
				"estraverse": "^5.2.0"
			},
			"engines": {
				"node": "^20.19.0 || ^22.13.0 || >=24"
			},
			"funding": {
				"url": "https://opencollective.com/eslint"
			}
		},
		"node_modules/eslint-visitor-keys": {
			"version": "3.4.3",
			"resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-3.4.3.tgz",
			"integrity": "sha512-wpc+LXeiyiisxPlEkUzU6svyS1frIO3Mgxj1fdy7Pm8Ygzguax2N3Fa/D/ag1WqbOprdI+uY6wMUl8/a2G+iag==",
			"dev": true,
			"license": "Apache-2.0",
			"engines": {
				"node": "^12.22.0 || ^14.17.0 || >=16.0.0"
			},
			"funding": {
				"url": "https://opencollective.com/eslint"
			}
		},
		"node_modules/eslint/node_modules/ajv": {
			"version": "6.14.0",
			"resolved": "https://registry.npmjs.org/ajv/-/ajv-6.14.0.tgz",
			"integrity": "sha512-IWrosm/yrn43eiKqkfkHis7QioDleaXQHdDVPKg0FSwwd/DuvyX79TZnFOnYpB7dcsFAMmtFztZuXPDvSePkFw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"fast-deep-equal": "^3.1.1",
				"fast-json-stable-stringify": "^2.0.0",
				"json-schema-traverse": "^0.4.1",
				"uri-js": "^4.2.2"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/epoberezkin"
			}
		},
		"node_modules/eslint/node_modules/eslint-visitor-keys": {
			"version": "5.0.1",
			"resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-5.0.1.tgz",
			"integrity": "sha512-tD40eHxA35h0PEIZNeIjkHoDR4YjjJp34biM0mDvplBe//mB+IHCqHDGV7pxF+7MklTvighcCPPZC7ynWyjdTA==",
			"dev": true,
			"license": "Apache-2.0",
			"engines": {
				"node": "^20.19.0 || ^22.13.0 || >=24"
			},
			"funding": {
				"url": "https://opencollective.com/eslint"
			}
		},
		"node_modules/eslint/node_modules/ignore": {
			"version": "5.3.2",
			"resolved": "https://registry.npmjs.org/ignore/-/ignore-5.3.2.tgz",
			"integrity": "sha512-hsBTNUqQTDwkWtcdYI2i06Y/nUBEsNEDJKjWdigLvegy8kDuJAS8uRlpkkcQpyEXL0Z/pjDy5HBmMjRCJ2gq+g==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 4"
			}
		},
		"node_modules/eslint/node_modules/json-schema-traverse": {
			"version": "0.4.1",
			"resolved": "https://registry.npmjs.org/json-schema-traverse/-/json-schema-traverse-0.4.1.tgz",
			"integrity": "sha512-xbbCH5dCYU5T8LcEhhuh7HJ88HXuW3qsI3Y0zOZFKfZEHcpWiHU/Jxzk629Brsab/mMiHQti9wMP+845RPe3Vg==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/espree": {
			"version": "11.2.0",
			"resolved": "https://registry.npmjs.org/espree/-/espree-11.2.0.tgz",
			"integrity": "sha512-7p3DrVEIopW1B1avAGLuCSh1jubc01H2JHc8B4qqGblmg5gI9yumBgACjWo4JlIc04ufug4xJ3SQI8HkS/Rgzw==",
			"dev": true,
			"license": "BSD-2-Clause",
			"dependencies": {
				"acorn": "^8.16.0",
				"acorn-jsx": "^5.3.2",
				"eslint-visitor-keys": "^5.0.1"
			},
			"engines": {
				"node": "^20.19.0 || ^22.13.0 || >=24"
			},
			"funding": {
				"url": "https://opencollective.com/eslint"
			}
		},
		"node_modules/espree/node_modules/eslint-visitor-keys": {
			"version": "5.0.1",
			"resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-5.0.1.tgz",
			"integrity": "sha512-tD40eHxA35h0PEIZNeIjkHoDR4YjjJp34biM0mDvplBe//mB+IHCqHDGV7pxF+7MklTvighcCPPZC7ynWyjdTA==",
			"dev": true,
			"license": "Apache-2.0",
			"engines": {
				"node": "^20.19.0 || ^22.13.0 || >=24"
			},
			"funding": {
				"url": "https://opencollective.com/eslint"
			}
		},
		"node_modules/esprima": {
			"version": "4.0.1",
			"resolved": "https://registry.npmjs.org/esprima/-/esprima-4.0.1.tgz",
			"integrity": "sha512-eGuFFw7Upda+g4p+QHvnW0RyTX/SVeJBDM/gCtMARO0cLuT2HcEKnTPvhjV6aGeqrCB/sbNop0Kszm0jsaWU4A==",
			"dev": true,
			"license": "BSD-2-Clause",
			"bin": {
				"esparse": "bin/esparse.js",
				"esvalidate": "bin/esvalidate.js"
			},
			"engines": {
				"node": ">=4"
			}
		},
		"node_modules/esquery": {
			"version": "1.7.0",
			"resolved": "https://registry.npmjs.org/esquery/-/esquery-1.7.0.tgz",
			"integrity": "sha512-Ap6G0WQwcU/LHsvLwON1fAQX9Zp0A2Y6Y/cJBl9r/JbW90Zyg4/zbG6zzKa2OTALELarYHmKu0GhpM5EO+7T0g==",
			"dev": true,
			"license": "BSD-3-Clause",
			"dependencies": {
				"estraverse": "^5.1.0"
			},
			"engines": {
				"node": ">=0.10"
			}
		},
		"node_modules/esrecurse": {
			"version": "4.3.0",
			"resolved": "https://registry.npmjs.org/esrecurse/-/esrecurse-4.3.0.tgz",
			"integrity": "sha512-KmfKL3b6G+RXvP8N1vr3Tq1kL/oCFgn2NYXEtqP8/L3pKapUA4G8cFVaoF3SU323CD4XypR/ffioHmkti6/Tag==",
			"dev": true,
			"license": "BSD-2-Clause",
			"dependencies": {
				"estraverse": "^5.2.0"
			},
			"engines": {
				"node": ">=4.0"
			}
		},
		"node_modules/estraverse": {
			"version": "5.3.0",
			"resolved": "https://registry.npmjs.org/estraverse/-/estraverse-5.3.0.tgz",
			"integrity": "sha512-MMdARuVEQziNTeJD8DgMqmhwR11BRQ/cBP+pLtYdSTnf3MIO8fFeiINEbX36ZdNlfU/7A9f3gUw49B3oQsvwBA==",
			"dev": true,
			"license": "BSD-2-Clause",
			"engines": {
				"node": ">=4.0"
			}
		},
		"node_modules/estree-walker": {
			"version": "3.0.3",
			"resolved": "https://registry.npmjs.org/estree-walker/-/estree-walker-3.0.3.tgz",
			"integrity": "sha512-7RUKfXgSMMkzt6ZuXmqapOurLGPPfgj6l9uRZ7lRGolvk0y2yocc35LdcxKC5PQZdn2DMqioAQ2NoWcrTKmm6g==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@types/estree": "^1.0.0"
			}
		},
		"node_modules/esutils": {
			"version": "2.0.3",
			"resolved": "https://registry.npmjs.org/esutils/-/esutils-2.0.3.tgz",
			"integrity": "sha512-kVscqXk4OCp68SZ0dkgEKVi6/8ij300KBWTJq32P/dYeWTSwK41WyTxalN1eRmA5Z9UU/LX9D7FWSmV9SAYx6g==",
			"dev": true,
			"license": "BSD-2-Clause",
			"engines": {
				"node": ">=0.10.0"
			}
		},
		"node_modules/etag": {
			"version": "1.8.1",
			"resolved": "https://registry.npmjs.org/etag/-/etag-1.8.1.tgz",
			"integrity": "sha512-aIL5Fx7mawVa300al2BnEE4iNvo1qETxLrPI/o05L7z6go7fCw1J6EQmbK4FmJ2AS7kgVF/KEZWufBfdClMcPg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/eventemitter3": {
			"version": "5.0.4",
			"resolved": "https://registry.npmjs.org/eventemitter3/-/eventemitter3-5.0.4.tgz",
			"integrity": "sha512-mlsTRyGaPBjPedk6Bvw+aqbsXDtoAyAzm5MO7JgU+yVRyMQ5O8bD4Kcci7BS85f93veegeCPkL8R4GLClnjLFw==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/events": {
			"version": "3.3.0",
			"resolved": "https://registry.npmjs.org/events/-/events-3.3.0.tgz",
			"integrity": "sha512-mQw+2fkQbALzQ7V0MY0IqdnXNOeTtP4r0lN9z7AAawCXgqea7bDii20AYrIBrFd/Hx0M2Ocz6S111CaFkUcb0Q==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=0.8.x"
			}
		},
		"node_modules/eventsource": {
			"version": "3.0.7",
			"resolved": "https://registry.npmjs.org/eventsource/-/eventsource-3.0.7.tgz",
			"integrity": "sha512-CRT1WTyuQoD771GW56XEZFQ/ZoSfWid1alKGDYMmkt2yl8UXrVR4pspqWNEcqKvVIzg6PAltWjxcSSPrboA4iA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"eventsource-parser": "^3.0.1"
			},
			"engines": {
				"node": ">=18.0.0"
			}
		},
		"node_modules/eventsource-parser": {
			"version": "3.0.6",
			"resolved": "https://registry.npmjs.org/eventsource-parser/-/eventsource-parser-3.0.6.tgz",
			"integrity": "sha512-Vo1ab+QXPzZ4tCa8SwIHJFaSzy4R6SHf7BY79rFBDf0idraZWAkYrDjDj8uWaSm3S2TK+hJ7/t1CEmZ7jXw+pg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=18.0.0"
			}
		},
		"node_modules/expand-tilde": {
			"version": "2.0.2",
			"resolved": "https://registry.npmjs.org/expand-tilde/-/expand-tilde-2.0.2.tgz",
			"integrity": "sha512-A5EmesHW6rfnZ9ysHQjPdJRni0SRar0tjtG5MNtm9n5TUvsYU8oozprtRD4AqHxcZWWlVuAmQo2nWKfN9oyjTw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"homedir-polyfill": "^1.0.1"
			},
			"engines": {
				"node": ">=0.10.0"
			}
		},
		"node_modules/expect-type": {
			"version": "1.3.0",
			"resolved": "https://registry.npmjs.org/expect-type/-/expect-type-1.3.0.tgz",
			"integrity": "sha512-knvyeauYhqjOYvQ66MznSMs83wmHrCycNEN6Ao+2AeYEfxUIkuiVxdEa1qlGEPK+We3n0THiDciYSsCcgW/DoA==",
			"dev": true,
			"license": "Apache-2.0",
			"engines": {
				"node": ">=12.0.0"
			}
		},
		"node_modules/exponential-backoff": {
			"version": "3.1.3",
			"resolved": "https://registry.npmjs.org/exponential-backoff/-/exponential-backoff-3.1.3.tgz",
			"integrity": "sha512-ZgEeZXj30q+I0EN+CbSSpIyPaJ5HVQD18Z1m+u1FXbAeT94mr1zw50q4q6jiiC447Nl/YTcIYSAftiGqetwXCA==",
			"dev": true,
			"license": "Apache-2.0"
		},
		"node_modules/express": {
			"version": "5.2.1",
			"resolved": "https://registry.npmjs.org/express/-/express-5.2.1.tgz",
			"integrity": "sha512-hIS4idWWai69NezIdRt2xFVofaF4j+6INOpJlVOLDO8zXGpUVEVzIYk12UUi2JzjEzWL3IOAxcTubgz9Po0yXw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"accepts": "^2.0.0",
				"body-parser": "^2.2.1",
				"content-disposition": "^1.0.0",
				"content-type": "^1.0.5",
				"cookie": "^0.7.1",
				"cookie-signature": "^1.2.1",
				"debug": "^4.4.0",
				"depd": "^2.0.0",
				"encodeurl": "^2.0.0",
				"escape-html": "^1.0.3",
				"etag": "^1.8.1",
				"finalhandler": "^2.1.0",
				"fresh": "^2.0.0",
				"http-errors": "^2.0.0",
				"merge-descriptors": "^2.0.0",
				"mime-types": "^3.0.0",
				"on-finished": "^2.4.1",
				"once": "^1.4.0",
				"parseurl": "^1.3.3",
				"proxy-addr": "^2.0.7",
				"qs": "^6.14.0",
				"range-parser": "^1.2.1",
				"router": "^2.2.0",
				"send": "^1.1.0",
				"serve-static": "^2.2.0",
				"statuses": "^2.0.1",
				"type-is": "^2.0.1",
				"vary": "^1.1.2"
			},
			"engines": {
				"node": ">= 18"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/express"
			}
		},
		"node_modules/express-rate-limit": {
			"version": "8.3.2",
			"resolved": "https://registry.npmjs.org/express-rate-limit/-/express-rate-limit-8.3.2.tgz",
			"integrity": "sha512-77VmFeJkO0/rvimEDuUC5H30oqUC4EyOhyGccfqoLebB0oiEYfM7nwPrsDsBL1gsTpwfzX8SFy2MT3TDyRq+bg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ip-address": "10.1.0"
			},
			"engines": {
				"node": ">= 16"
			},
			"funding": {
				"url": "https://github.com/sponsors/express-rate-limit"
			},
			"peerDependencies": {
				"express": ">= 4.11"
			}
		},
		"node_modules/fast-deep-equal": {
			"version": "3.1.3",
			"resolved": "https://registry.npmjs.org/fast-deep-equal/-/fast-deep-equal-3.1.3.tgz",
			"integrity": "sha512-f3qQ9oQy9j2AhBe/H9VC91wLmKBCCU/gDOnKNAYG5hswO7BLKj09Hc5HYNz9cGI++xlpDCIgDaitVs03ATR84Q==",
			"license": "MIT"
		},
		"node_modules/fast-diff": {
			"version": "1.3.0",
			"resolved": "https://registry.npmjs.org/fast-diff/-/fast-diff-1.3.0.tgz",
			"integrity": "sha512-VxPP4NqbUjj6MaAOafWeUn2cXWLcCtljklUtZf0Ind4XQ+QPtmA0b18zZy0jIQx+ExRVCR/ZQpBmik5lXshNsw==",
			"dev": true,
			"license": "Apache-2.0"
		},
		"node_modules/fast-glob": {
			"version": "3.3.3",
			"resolved": "https://registry.npmjs.org/fast-glob/-/fast-glob-3.3.3.tgz",
			"integrity": "sha512-7MptL8U0cqcFdzIzwOTHoilX9x5BrNqye7Z/LuC7kCMRio1EMSyqRK3BEAUD7sXRq4iT4AzTVuZdhgQ2TCvYLg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@nodelib/fs.stat": "^2.0.2",
				"@nodelib/fs.walk": "^1.2.3",
				"glob-parent": "^5.1.2",
				"merge2": "^1.3.0",
				"micromatch": "^4.0.8"
			},
			"engines": {
				"node": ">=8.6.0"
			}
		},
		"node_modules/fast-glob/node_modules/glob-parent": {
			"version": "5.1.2",
			"resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
			"integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"is-glob": "^4.0.1"
			},
			"engines": {
				"node": ">= 6"
			}
		},
		"node_modules/fast-json-stable-stringify": {
			"version": "2.1.0",
			"resolved": "https://registry.npmjs.org/fast-json-stable-stringify/-/fast-json-stable-stringify-2.1.0.tgz",
			"integrity": "sha512-lhd/wF+Lk98HZoTCtlVraHtfh5XYijIjalXck7saUtuanSDyLMxnHhSXEDJqHxD7msR8D0uCmqlkwjCV8xvwHw==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/fast-levenshtein": {
			"version": "2.0.6",
			"resolved": "https://registry.npmjs.org/fast-levenshtein/-/fast-levenshtein-2.0.6.tgz",
			"integrity": "sha512-DCXu6Ifhqcks7TZKY3Hxp3y6qphY5SJZmrWMDrKcERSOXWQdMhU9Ig/PYrzyw/ul9jOIyh0N4M0tbC5hodg8dw==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/fast-uri": {
			"version": "3.1.0",
			"resolved": "https://registry.npmjs.org/fast-uri/-/fast-uri-3.1.0.tgz",
			"integrity": "sha512-iPeeDKJSWf4IEOasVVrknXpaBV0IApz/gp7S2bb7Z4Lljbl2MGJRqInZiUrQwV16cpzw/D3S5j5Julj/gT52AA==",
			"funding": [
				{
					"type": "github",
					"url": "https://github.com/sponsors/fastify"
				},
				{
					"type": "opencollective",
					"url": "https://opencollective.com/fastify"
				}
			],
			"license": "BSD-3-Clause"
		},
		"node_modules/fastq": {
			"version": "1.20.1",
			"resolved": "https://registry.npmjs.org/fastq/-/fastq-1.20.1.tgz",
			"integrity": "sha512-GGToxJ/w1x32s/D2EKND7kTil4n8OVk/9mycTc4VDza13lOvpUZTGX3mFSCtV9ksdGBVzvsyAVLM6mHFThxXxw==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"reusify": "^1.0.4"
			}
		},
		"node_modules/faye-websocket": {
			"version": "0.11.4",
			"resolved": "https://registry.npmjs.org/faye-websocket/-/faye-websocket-0.11.4.tgz",
			"integrity": "sha512-CzbClwlXAuiRQAlUyfqPgvPoNKTckTPGfwZV4ZdAhVcP2lh9KUxJg2b5GkE7XbjKQ3YJnQ9z6D9ntLAlB+tP8g==",
			"dev": true,
			"license": "Apache-2.0",
			"dependencies": {
				"websocket-driver": ">=0.5.1"
			},
			"engines": {
				"node": ">=0.8.0"
			}
		},
		"node_modules/fdir": {
			"version": "6.5.0",
			"resolved": "https://registry.npmjs.org/fdir/-/fdir-6.5.0.tgz",
			"integrity": "sha512-tIbYtZbucOs0BRGqPJkshJUYdL+SDH7dVM8gjy+ERp3WAUjLEFJE+02kanyHtwjWOnwrKYBiwAmM0p4kLJAnXg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=12.0.0"
			},
			"peerDependencies": {
				"picomatch": "^3 || ^4"
			},
			"peerDependenciesMeta": {
				"picomatch": {
					"optional": true
				}
			}
		},
		"node_modules/figures": {
			"version": "3.2.0",
			"resolved": "https://registry.npmjs.org/figures/-/figures-3.2.0.tgz",
			"integrity": "sha512-yaduQFRKLXYOGgEn6AZau90j3ggSOyiqXU0F9JZfeXYhNa+Jk4X+s45A2zg5jns87GAFa34BBm2kXw4XpNcbdg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"escape-string-regexp": "^1.0.5"
			},
			"engines": {
				"node": ">=8"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/figures/node_modules/escape-string-regexp": {
			"version": "1.0.5",
			"resolved": "https://registry.npmjs.org/escape-string-regexp/-/escape-string-regexp-1.0.5.tgz",
			"integrity": "sha512-vbRorB5FUQWvla16U8R/qgaFIya2qGzwDrNmCZuYKrbdSUMG6I1ZCGQRefkRVhuOkIGVne7BQ35DSfo1qvJqFg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=0.8.0"
			}
		},
		"node_modules/file-entry-cache": {
			"version": "8.0.0",
			"resolved": "https://registry.npmjs.org/file-entry-cache/-/file-entry-cache-8.0.0.tgz",
			"integrity": "sha512-XXTUwCvisa5oacNGRP9SfNtYBNAMi+RPwBFmblZEF7N7swHYQS6/Zfk7SRwx4D5j3CH211YNRco1DEMNVfZCnQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"flat-cache": "^4.0.0"
			},
			"engines": {
				"node": ">=16.0.0"
			}
		},
		"node_modules/fill-range": {
			"version": "7.1.1",
			"resolved": "https://registry.npmjs.org/fill-range/-/fill-range-7.1.1.tgz",
			"integrity": "sha512-YsGpe3WHLK8ZYi4tWDg2Jy3ebRz2rXowDxnld4bkQB00cc/1Zw9AWnC0i9ztDJitivtQvaI9KaLyKrc+hBW0yg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"to-regex-range": "^5.0.1"
			},
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/finalhandler": {
			"version": "2.1.1",
			"resolved": "https://registry.npmjs.org/finalhandler/-/finalhandler-2.1.1.tgz",
			"integrity": "sha512-S8KoZgRZN+a5rNwqTxlZZePjT/4cnm0ROV70LedRHZ0p8u9fRID0hJUZQpkKLzro8LfmC8sx23bY6tVNxv8pQA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"debug": "^4.4.0",
				"encodeurl": "^2.0.0",
				"escape-html": "^1.0.3",
				"on-finished": "^2.4.1",
				"parseurl": "^1.3.3",
				"statuses": "^2.0.1"
			},
			"engines": {
				"node": ">= 18.0.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/express"
			}
		},
		"node_modules/find-cache-dir": {
			"version": "4.0.0",
			"resolved": "https://registry.npmjs.org/find-cache-dir/-/find-cache-dir-4.0.0.tgz",
			"integrity": "sha512-9ZonPT4ZAK4a+1pUPVPZJapbi7O5qbbJPdYw/NOQWZZbVLdDTYM3A4R9z/DpAM08IDaFGsvPgiGZ82WEwUDWjg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"common-path-prefix": "^3.0.0",
				"pkg-dir": "^7.0.0"
			},
			"engines": {
				"node": ">=14.16"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/find-file-up": {
			"version": "2.0.1",
			"resolved": "https://registry.npmjs.org/find-file-up/-/find-file-up-2.0.1.tgz",
			"integrity": "sha512-qVdaUhYO39zmh28/JLQM5CoYN9byEOKEH4qfa8K1eNV17W0UUMJ9WgbR/hHFH+t5rcl+6RTb5UC7ck/I+uRkpQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"resolve-dir": "^1.0.1"
			},
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/find-pkg": {
			"version": "2.0.0",
			"resolved": "https://registry.npmjs.org/find-pkg/-/find-pkg-2.0.0.tgz",
			"integrity": "sha512-WgZ+nKbELDa6N3i/9nrHeNznm+lY3z4YfhDDWgW+5P0pdmMj26bxaxU11ookgY3NyP9GC7HvZ9etp0jRFqGEeQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"find-file-up": "^2.0.1"
			},
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/find-up": {
			"version": "5.0.0",
			"resolved": "https://registry.npmjs.org/find-up/-/find-up-5.0.0.tgz",
			"integrity": "sha512-78/PXT1wlLLDgTzDs7sjq9hzz0vXD+zn+7wypEe4fXQxCmdmqfGsEPQxmiCSQI3ajFV91bVSsvNtrJRiW6nGng==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"locate-path": "^6.0.0",
				"path-exists": "^4.0.0"
			},
			"engines": {
				"node": ">=10"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/flat": {
			"version": "5.0.2",
			"resolved": "https://registry.npmjs.org/flat/-/flat-5.0.2.tgz",
			"integrity": "sha512-b6suED+5/3rTpUBdG1gupIl8MPFCAMA0QXwmljLhvCUKcUvdE4gWky9zpuGCcXHOsz4J9wPGNWq6OKpmIzz3hQ==",
			"dev": true,
			"license": "BSD-3-Clause",
			"bin": {
				"flat": "cli.js"
			}
		},
		"node_modules/flat-cache": {
			"version": "4.0.1",
			"resolved": "https://registry.npmjs.org/flat-cache/-/flat-cache-4.0.1.tgz",
			"integrity": "sha512-f7ccFPK3SXFHpx15UIGyRJ/FJQctuKZ0zVuN3frBo4HnK3cay9VEW0R6yPYFHC0AgqhukPzKjq22t5DmAyqGyw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"flatted": "^3.2.9",
				"keyv": "^4.5.4"
			},
			"engines": {
				"node": ">=16"
			}
		},
		"node_modules/flatted": {
			"version": "3.4.2",
			"resolved": "https://registry.npmjs.org/flatted/-/flatted-3.4.2.tgz",
			"integrity": "sha512-PjDse7RzhcPkIJwy5t7KPWQSZ9cAbzQXcafsetQoD7sOJRQlGikNbx7yZp2OotDnJyrDcbyRq3Ttb18iYOqkxA==",
			"dev": true,
			"license": "ISC"
		},
		"node_modules/follow-redirects": {
			"version": "1.16.0",
			"resolved": "https://registry.npmjs.org/follow-redirects/-/follow-redirects-1.16.0.tgz",
			"integrity": "sha512-y5rN/uOsadFT/JfYwhxRS5R7Qce+g3zG97+JrtFZlC9klX/W5hD7iiLzScI4nZqUS7DNUdhPgw4xI8W2LuXlUw==",
			"dev": true,
			"funding": [
				{
					"type": "individual",
					"url": "https://github.com/sponsors/RubenVerborgh"
				}
			],
			"license": "MIT",
			"engines": {
				"node": ">=4.0"
			},
			"peerDependenciesMeta": {
				"debug": {
					"optional": true
				}
			}
		},
		"node_modules/fork-ts-checker-webpack-plugin": {
			"version": "9.1.0",
			"resolved": "https://registry.npmjs.org/fork-ts-checker-webpack-plugin/-/fork-ts-checker-webpack-plugin-9.1.0.tgz",
			"integrity": "sha512-mpafl89VFPJmhnJ1ssH+8wmM2b50n+Rew5x42NeI2U78aRWgtkEtGmctp7iT16UjquJTjorEmIfESj3DxdW84Q==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/code-frame": "^7.16.7",
				"chalk": "^4.1.2",
				"chokidar": "^4.0.1",
				"cosmiconfig": "^8.2.0",
				"deepmerge": "^4.2.2",
				"fs-extra": "^10.0.0",
				"memfs": "^3.4.1",
				"minimatch": "^3.0.4",
				"node-abort-controller": "^3.0.1",
				"schema-utils": "^3.1.1",
				"semver": "^7.3.5",
				"tapable": "^2.2.1"
			},
			"engines": {
				"node": ">=14.21.3"
			},
			"peerDependencies": {
				"typescript": ">3.6.0",
				"webpack": "^5.11.0"
			}
		},
		"node_modules/fork-ts-checker-webpack-plugin/node_modules/ajv": {
			"version": "6.14.0",
			"resolved": "https://registry.npmjs.org/ajv/-/ajv-6.14.0.tgz",
			"integrity": "sha512-IWrosm/yrn43eiKqkfkHis7QioDleaXQHdDVPKg0FSwwd/DuvyX79TZnFOnYpB7dcsFAMmtFztZuXPDvSePkFw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"fast-deep-equal": "^3.1.1",
				"fast-json-stable-stringify": "^2.0.0",
				"json-schema-traverse": "^0.4.1",
				"uri-js": "^4.2.2"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/epoberezkin"
			}
		},
		"node_modules/fork-ts-checker-webpack-plugin/node_modules/ajv-keywords": {
			"version": "3.5.2",
			"resolved": "https://registry.npmjs.org/ajv-keywords/-/ajv-keywords-3.5.2.tgz",
			"integrity": "sha512-5p6WTN0DdTGVQk6VjcEju19IgaHudalcfabD7yhDGeA6bcQnmL+CpveLJq/3hvfwd1aof6L386Ougkx6RfyMIQ==",
			"dev": true,
			"license": "MIT",
			"peerDependencies": {
				"ajv": "^6.9.1"
			}
		},
		"node_modules/fork-ts-checker-webpack-plugin/node_modules/ansi-styles": {
			"version": "4.3.0",
			"resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz",
			"integrity": "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"color-convert": "^2.0.1"
			},
			"engines": {
				"node": ">=8"
			},
			"funding": {
				"url": "https://github.com/chalk/ansi-styles?sponsor=1"
			}
		},
		"node_modules/fork-ts-checker-webpack-plugin/node_modules/balanced-match": {
			"version": "1.0.2",
			"resolved": "https://registry.npmjs.org/balanced-match/-/balanced-match-1.0.2.tgz",
			"integrity": "sha512-3oSeUO0TMV67hN1AmbXsK4yaqU7tjiHlbxRDZOpH0KW9+CeX4bRAaX0Anxt0tx2MrpRpWwQaPwIlISEJhYU5Pw==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/fork-ts-checker-webpack-plugin/node_modules/brace-expansion": {
			"version": "1.1.14",
			"resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-1.1.14.tgz",
			"integrity": "sha512-MWPGfDxnyzKU7rNOW9SP/c50vi3xrmrua/+6hfPbCS2ABNWfx24vPidzvC7krjU/RTo235sV776ymlsMtGKj8g==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"balanced-match": "^1.0.0",
				"concat-map": "0.0.1"
			}
		},
		"node_modules/fork-ts-checker-webpack-plugin/node_modules/chalk": {
			"version": "4.1.2",
			"resolved": "https://registry.npmjs.org/chalk/-/chalk-4.1.2.tgz",
			"integrity": "sha512-oKnbhFyRIXpUuez8iBMmyEa4nbj4IOQyuhc/wy9kY7/WVPcwIO9VA668Pu8RkO7+0G76SLROeyw9CpQ061i4mA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ansi-styles": "^4.1.0",
				"supports-color": "^7.1.0"
			},
			"engines": {
				"node": ">=10"
			},
			"funding": {
				"url": "https://github.com/chalk/chalk?sponsor=1"
			}
		},
		"node_modules/fork-ts-checker-webpack-plugin/node_modules/chokidar": {
			"version": "4.0.3",
			"resolved": "https://registry.npmjs.org/chokidar/-/chokidar-4.0.3.tgz",
			"integrity": "sha512-Qgzu8kfBvo+cA4962jnP1KkS6Dop5NS6g7R5LFYJr4b8Ub94PPQXUksCw9PvXoeXPRRddRNC5C1JQUR2SMGtnA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"readdirp": "^4.0.1"
			},
			"engines": {
				"node": ">= 14.16.0"
			},
			"funding": {
				"url": "https://paulmillr.com/funding/"
			}
		},
		"node_modules/fork-ts-checker-webpack-plugin/node_modules/cosmiconfig": {
			"version": "8.3.6",
			"resolved": "https://registry.npmjs.org/cosmiconfig/-/cosmiconfig-8.3.6.tgz",
			"integrity": "sha512-kcZ6+W5QzcJ3P1Mt+83OUv/oHFqZHIx8DuxG6eZ5RGMERoLqp4BuGjhHLYGK+Kf5XVkQvqBSmAy/nGWN3qDgEA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"import-fresh": "^3.3.0",
				"js-yaml": "^4.1.0",
				"parse-json": "^5.2.0",
				"path-type": "^4.0.0"
			},
			"engines": {
				"node": ">=14"
			},
			"funding": {
				"url": "https://github.com/sponsors/d-fischer"
			},
			"peerDependencies": {
				"typescript": ">=4.9.5"
			},
			"peerDependenciesMeta": {
				"typescript": {
					"optional": true
				}
			}
		},
		"node_modules/fork-ts-checker-webpack-plugin/node_modules/js-yaml": {
			"version": "4.1.1",
			"resolved": "https://registry.npmjs.org/js-yaml/-/js-yaml-4.1.1.tgz",
			"integrity": "sha512-qQKT4zQxXl8lLwBtHMWwaTcGfFOZviOJet3Oy/xmGk2gZH677CJM9EvtfdSkgWcATZhj/55JZ0rmy3myCT5lsA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"argparse": "^2.0.1"
			},
			"bin": {
				"js-yaml": "bin/js-yaml.js"
			}
		},
		"node_modules/fork-ts-checker-webpack-plugin/node_modules/json-schema-traverse": {
			"version": "0.4.1",
			"resolved": "https://registry.npmjs.org/json-schema-traverse/-/json-schema-traverse-0.4.1.tgz",
			"integrity": "sha512-xbbCH5dCYU5T8LcEhhuh7HJ88HXuW3qsI3Y0zOZFKfZEHcpWiHU/Jxzk629Brsab/mMiHQti9wMP+845RPe3Vg==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/fork-ts-checker-webpack-plugin/node_modules/minimatch": {
			"version": "3.1.5",
			"resolved": "https://registry.npmjs.org/minimatch/-/minimatch-3.1.5.tgz",
			"integrity": "sha512-VgjWUsnnT6n+NUk6eZq77zeFdpW2LWDzP6zFGrCbHXiYNul5Dzqk2HHQ5uFH2DNW5Xbp8+jVzaeNt94ssEEl4w==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"brace-expansion": "^1.1.7"
			},
			"engines": {
				"node": "*"
			}
		},
		"node_modules/fork-ts-checker-webpack-plugin/node_modules/readdirp": {
			"version": "4.1.2",
			"resolved": "https://registry.npmjs.org/readdirp/-/readdirp-4.1.2.tgz",
			"integrity": "sha512-GDhwkLfywWL2s6vEjyhri+eXmfH6j1L7JE27WhqLeYzoh/A3DBaYGEj2H/HFZCn/kMfim73FXxEJTw06WtxQwg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 14.18.0"
			},
			"funding": {
				"type": "individual",
				"url": "https://paulmillr.com/funding/"
			}
		},
		"node_modules/fork-ts-checker-webpack-plugin/node_modules/schema-utils": {
			"version": "3.3.0",
			"resolved": "https://registry.npmjs.org/schema-utils/-/schema-utils-3.3.0.tgz",
			"integrity": "sha512-pN/yOAvcC+5rQ5nERGuwrjLlYvLTbCibnZ1I7B1LaiAz9BRBlE9GMgE/eqV30P7aJQUf7Ddimy/RsbYO/GrVGg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@types/json-schema": "^7.0.8",
				"ajv": "^6.12.5",
				"ajv-keywords": "^3.5.2"
			},
			"engines": {
				"node": ">= 10.13.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/webpack"
			}
		},
		"node_modules/form-data": {
			"version": "4.0.5",
			"resolved": "https://registry.npmjs.org/form-data/-/form-data-4.0.5.tgz",
			"integrity": "sha512-8RipRLol37bNs2bhoV67fiTEvdTrbMUYcFTiy3+wuuOnUog2QBHCZWXDRijWQfAkhBj2Uf5UnVaiWwA5vdd82w==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"asynckit": "^0.4.0",
				"combined-stream": "^1.0.8",
				"es-set-tostringtag": "^2.1.0",
				"hasown": "^2.0.2",
				"mime-types": "^2.1.12"
			},
			"engines": {
				"node": ">= 6"
			}
		},
		"node_modules/form-data/node_modules/mime-db": {
			"version": "1.52.0",
			"resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.52.0.tgz",
			"integrity": "sha512-sPU4uV7dYlvtWJxwwxHD0PuihVNiE7TyAbQ5SWxDCB9mUYvOgroQOwYQQOKPJ8CIbE+1ETVlOoK1UC2nU3gYvg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/form-data/node_modules/mime-types": {
			"version": "2.1.35",
			"resolved": "https://registry.npmjs.org/mime-types/-/mime-types-2.1.35.tgz",
			"integrity": "sha512-ZDY+bPm5zTTF+YpCrAU9nK0UgICYPT0QtT1NZWFv4s++TNkcgVaT0g6+4R2uI4MjQjzysHB1zxuWL50hzaeXiw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"mime-db": "1.52.0"
			},
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/forwarded": {
			"version": "0.2.0",
			"resolved": "https://registry.npmjs.org/forwarded/-/forwarded-0.2.0.tgz",
			"integrity": "sha512-buRG0fpBtRHSTCOASe6hD258tEubFoRLb4ZNA6NxMVHNw2gOcwHo9wyablzMzOA5z9xA9L1KNjk/Nt6MT9aYow==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/fraction.js": {
			"version": "5.3.4",
			"resolved": "https://registry.npmjs.org/fraction.js/-/fraction.js-5.3.4.tgz",
			"integrity": "sha512-1X1NTtiJphryn/uLQz3whtY6jK3fTqoE3ohKs0tT+Ujr1W59oopxmoEh7Lu5p6vBaPbgoM0bzveAW4Qi5RyWDQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": "*"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/rawify"
			}
		},
		"node_modules/fresh": {
			"version": "2.0.0",
			"resolved": "https://registry.npmjs.org/fresh/-/fresh-2.0.0.tgz",
			"integrity": "sha512-Rx/WycZ60HOaqLKAi6cHRKKI7zxWbJ31MhntmtwMoaTeF7XFH9hhBp8vITaMidfljRQ6eYWCKkaTK+ykVJHP2A==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.8"
			}
		},
		"node_modules/front-matter": {
			"version": "4.0.2",
			"resolved": "https://registry.npmjs.org/front-matter/-/front-matter-4.0.2.tgz",
			"integrity": "sha512-I8ZuJ/qG92NWX8i5x1Y8qyj3vizhXS31OxjKDu3LKP+7/qBgfIKValiZIEwoVoJKUHlhWtYrktkxV1XsX+pPlg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"js-yaml": "^3.13.1"
			}
		},
		"node_modules/fs-constants": {
			"version": "1.0.0",
			"resolved": "https://registry.npmjs.org/fs-constants/-/fs-constants-1.0.0.tgz",
			"integrity": "sha512-y6OAwoSIf7FyjMIv94u+b5rdheZEjzR63GTyZJm5qh4Bi+2YgwLCcI/fPFZkL5PSixOt6ZNKm+w+Hfp/Bciwow==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/fs-extra": {
			"version": "10.1.0",
			"resolved": "https://registry.npmjs.org/fs-extra/-/fs-extra-10.1.0.tgz",
			"integrity": "sha512-oRXApq54ETRj4eMiFzGnHWGy+zo5raudjuxN0b8H7s/RU2oW0Wvsx9O0ACRN/kRq9E8Vu/ReskGB5o3ji+FzHQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"graceful-fs": "^4.2.0",
				"jsonfile": "^6.0.1",
				"universalify": "^2.0.0"
			},
			"engines": {
				"node": ">=12"
			}
		},
		"node_modules/fs-minipass": {
			"version": "3.0.3",
			"resolved": "https://registry.npmjs.org/fs-minipass/-/fs-minipass-3.0.3.tgz",
			"integrity": "sha512-XUBA9XClHbnJWSfBzjkm6RvPsyg3sryZt06BEQoXcF7EK/xpGaQYJgQKDJSUH5SGZ76Y7pFx1QBnXz09rU5Fbw==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"minipass": "^7.0.3"
			},
			"engines": {
				"node": "^14.17.0 || ^16.13.0 || >=18.0.0"
			}
		},
		"node_modules/fs-monkey": {
			"version": "1.1.0",
			"resolved": "https://registry.npmjs.org/fs-monkey/-/fs-monkey-1.1.0.tgz",
			"integrity": "sha512-QMUezzXWII9EV5aTFXW1UBVUO77wYPpjqIF8/AviUCThNeSYZykpoTixUeaNNBwmCev0AMDWMAni+f8Hxb1IFw==",
			"dev": true,
			"license": "Unlicense"
		},
		"node_modules/fsevents": {
			"version": "2.3.3",
			"resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.3.tgz",
			"integrity": "sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw==",
			"dev": true,
			"hasInstallScript": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"darwin"
			],
			"engines": {
				"node": "^8.16.0 || ^10.6.0 || >=11.0.0"
			}
		},
		"node_modules/function-bind": {
			"version": "1.1.2",
			"resolved": "https://registry.npmjs.org/function-bind/-/function-bind-1.1.2.tgz",
			"integrity": "sha512-7XHNxH7qX9xG5mIwxkhumTox/MIRNcOgDrxWsMt2pAr23WHp6MrRlN7FBSFpCpr+oVO0F744iUgR82nJMfG2SA==",
			"dev": true,
			"license": "MIT",
			"funding": {
				"url": "https://github.com/sponsors/ljharb"
			}
		},
		"node_modules/gensync": {
			"version": "1.0.0-beta.2",
			"resolved": "https://registry.npmjs.org/gensync/-/gensync-1.0.0-beta.2.tgz",
			"integrity": "sha512-3hN7NaskYvMDLQY55gnW3NQ+mesEAepTqlg+VEbj7zzqEMBVNhzcGYYeqFo/TlYz6eQiFcp1HcsCZO+nGgS8zg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=6.9.0"
			}
		},
		"node_modules/get-caller-file": {
			"version": "2.0.5",
			"resolved": "https://registry.npmjs.org/get-caller-file/-/get-caller-file-2.0.5.tgz",
			"integrity": "sha512-DyFP3BM/3YHTQOCUL/w0OZHR0lpKeGrxotcHWcqNEdnltqFwXVfhEBQ94eIo34AfQpo0rGki4cyIiftY06h2Fg==",
			"dev": true,
			"license": "ISC",
			"engines": {
				"node": "6.* || 8.* || >= 10.*"
			}
		},
		"node_modules/get-east-asian-width": {
			"version": "1.5.0",
			"resolved": "https://registry.npmjs.org/get-east-asian-width/-/get-east-asian-width-1.5.0.tgz",
			"integrity": "sha512-CQ+bEO+Tva/qlmw24dCejulK5pMzVnUOFOijVogd3KQs07HnRIgp8TGipvCCRT06xeYEbpbgwaCxglFyiuIcmA==",
			"license": "MIT",
			"engines": {
				"node": ">=18"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/get-intrinsic": {
			"version": "1.3.0",
			"resolved": "https://registry.npmjs.org/get-intrinsic/-/get-intrinsic-1.3.0.tgz",
			"integrity": "sha512-9fSjSaos/fRIVIp+xSJlE6lfwhES7LNtKaCBIamHsjr2na1BiABJPo0mOjjz8GJDURarmCPGqaiVg5mfjb98CQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"call-bind-apply-helpers": "^1.0.2",
				"es-define-property": "^1.0.1",
				"es-errors": "^1.3.0",
				"es-object-atoms": "^1.1.1",
				"function-bind": "^1.1.2",
				"get-proto": "^1.0.1",
				"gopd": "^1.2.0",
				"has-symbols": "^1.1.0",
				"hasown": "^2.0.2",
				"math-intrinsics": "^1.1.0"
			},
			"engines": {
				"node": ">= 0.4"
			},
			"funding": {
				"url": "https://github.com/sponsors/ljharb"
			}
		},
		"node_modules/get-proto": {
			"version": "1.0.1",
			"resolved": "https://registry.npmjs.org/get-proto/-/get-proto-1.0.1.tgz",
			"integrity": "sha512-sTSfBjoXBp89JvIKIefqw7U2CCebsc74kiY6awiGogKtoSGbgjYE/G/+l9sF3MWFPNc9IcoOC4ODfKHfxFmp0g==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"dunder-proto": "^1.0.1",
				"es-object-atoms": "^1.0.0"
			},
			"engines": {
				"node": ">= 0.4"
			}
		},
		"node_modules/glob": {
			"version": "13.0.6",
			"resolved": "https://registry.npmjs.org/glob/-/glob-13.0.6.tgz",
			"integrity": "sha512-Wjlyrolmm8uDpm/ogGyXZXb1Z+Ca2B8NbJwqBVg0axK9GbBeoS7yGV6vjXnYdGm6X53iehEuxxbyiKp8QmN4Vw==",
			"dev": true,
			"license": "BlueOak-1.0.0",
			"dependencies": {
				"minimatch": "^10.2.2",
				"minipass": "^7.1.3",
				"path-scurry": "^2.0.2"
			},
			"engines": {
				"node": "18 || 20 || >=22"
			},
			"funding": {
				"url": "https://github.com/sponsors/isaacs"
			}
		},
		"node_modules/glob-parent": {
			"version": "6.0.2",
			"resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-6.0.2.tgz",
			"integrity": "sha512-XxwI8EOhVQgWp6iDL+3b0r86f4d6AX6zSU55HfB4ydCEuXLXc5FcYeOu+nnGftS4TEju/11rt4KJPTMgbfmv4A==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"is-glob": "^4.0.3"
			},
			"engines": {
				"node": ">=10.13.0"
			}
		},
		"node_modules/glob-to-regex.js": {
			"version": "1.2.0",
			"resolved": "https://registry.npmjs.org/glob-to-regex.js/-/glob-to-regex.js-1.2.0.tgz",
			"integrity": "sha512-QMwlOQKU/IzqMUOAZWubUOT8Qft+Y0KQWnX9nK3ch0CJg0tTp4TvGZsTfudYKv2NzoQSyPcnA6TYeIQ3jGichQ==",
			"dev": true,
			"license": "Apache-2.0",
			"engines": {
				"node": ">=10.0"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/streamich"
			},
			"peerDependencies": {
				"tslib": "2"
			}
		},
		"node_modules/glob-to-regexp": {
			"version": "0.4.1",
			"resolved": "https://registry.npmjs.org/glob-to-regexp/-/glob-to-regexp-0.4.1.tgz",
			"integrity": "sha512-lkX1HJXwyMcprw/5YUZc2s7DrpAiHB21/V+E1rHUrVNokkvB6bqMzT0VfV6/86ZNabt1k14YOIaT7nDvOX3Iiw==",
			"dev": true,
			"license": "BSD-2-Clause"
		},
		"node_modules/global-modules": {
			"version": "1.0.0",
			"resolved": "https://registry.npmjs.org/global-modules/-/global-modules-1.0.0.tgz",
			"integrity": "sha512-sKzpEkf11GpOFuw0Zzjzmt4B4UZwjOcG757PPvrfhxcLFbq0wpsgpOqxpxtxFiCG4DtG93M6XRVbF2oGdev7bg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"global-prefix": "^1.0.1",
				"is-windows": "^1.0.1",
				"resolve-dir": "^1.0.0"
			},
			"engines": {
				"node": ">=0.10.0"
			}
		},
		"node_modules/global-prefix": {
			"version": "1.0.2",
			"resolved": "https://registry.npmjs.org/global-prefix/-/global-prefix-1.0.2.tgz",
			"integrity": "sha512-5lsx1NUDHtSjfg0eHlmYvZKv8/nVqX4ckFbM+FrGcQ+04KWcWFo9P5MxPZYSzUvyzmdTbI7Eix8Q4IbELDqzKg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"expand-tilde": "^2.0.2",
				"homedir-polyfill": "^1.0.1",
				"ini": "^1.3.4",
				"is-windows": "^1.0.1",
				"which": "^1.2.14"
			},
			"engines": {
				"node": ">=0.10.0"
			}
		},
		"node_modules/global-prefix/node_modules/ini": {
			"version": "1.3.8",
			"resolved": "https://registry.npmjs.org/ini/-/ini-1.3.8.tgz",
			"integrity": "sha512-JV/yugV2uzW5iMRSiZAyDtQd+nxtUnjeLt0acNdw98kKLrvuRVyB80tsREOE7yvGVgalhZ6RNXCmEHkUKBKxew==",
			"dev": true,
			"license": "ISC"
		},
		"node_modules/global-prefix/node_modules/which": {
			"version": "1.3.1",
			"resolved": "https://registry.npmjs.org/which/-/which-1.3.1.tgz",
			"integrity": "sha512-HxJdYWq1MTIQbJ3nw0cqssHoTNU267KlrDuGZ1WYlxDStUtKUhOaJmh112/TZmHxxUfuJqPXSOm7tDyas0OSIQ==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"isexe": "^2.0.0"
			},
			"bin": {
				"which": "bin/which"
			}
		},
		"node_modules/gopd": {
			"version": "1.2.0",
			"resolved": "https://registry.npmjs.org/gopd/-/gopd-1.2.0.tgz",
			"integrity": "sha512-ZUKRh6/kUFoAiTAtTYPZJ3hw9wNxx+BIBOijnlG9PnrJsCcSjs1wyyD6vJpaYtgnzDrKYRSqf3OO6Rfa93xsRg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.4"
			},
			"funding": {
				"url": "https://github.com/sponsors/ljharb"
			}
		},
		"node_modules/graceful-fs": {
			"version": "4.2.11",
			"resolved": "https://registry.npmjs.org/graceful-fs/-/graceful-fs-4.2.11.tgz",
			"integrity": "sha512-RbJ5/jmFcNNCcDV5o9eTnBLJ/HszWV0P73bc+Ff4nS/rJj+YaS6IGyiOL0VoBYX+l1Wrl3k63h/KrH+nhJ0XvQ==",
			"dev": true,
			"license": "ISC"
		},
		"node_modules/graphql": {
			"version": "16.13.2",
			"resolved": "https://registry.npmjs.org/graphql/-/graphql-16.13.2.tgz",
			"integrity": "sha512-5bJ+nf/UCpAjHM8i06fl7eLyVC9iuNAjm9qzkiu2ZGhM0VscSvS6WDPfAwkdkBuoXGM9FJSbKl6wylMwP9Ktig==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": "^12.22.0 || ^14.16.0 || ^16.0.0 || >=17.0.0"
			}
		},
		"node_modules/handle-thing": {
			"version": "2.0.1",
			"resolved": "https://registry.npmjs.org/handle-thing/-/handle-thing-2.0.1.tgz",
			"integrity": "sha512-9Qn4yBxelxoh2Ow62nP+Ka/kMnOXRi8BXnRaUwezLNhqelnN49xKz4F/dPP8OYLxLxq6JDtZb2i9XznUQbNPTg==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/has-flag": {
			"version": "4.0.0",
			"resolved": "https://registry.npmjs.org/has-flag/-/has-flag-4.0.0.tgz",
			"integrity": "sha512-EykJT/Q1KjTWctppgIAgfSO0tKVuZUjhgMr17kqTumMl6Afv3EISleU7qZUzoXDFTAHTDC4NOoG/ZxU3EvlMPQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/has-symbols": {
			"version": "1.1.0",
			"resolved": "https://registry.npmjs.org/has-symbols/-/has-symbols-1.1.0.tgz",
			"integrity": "sha512-1cDNdwJ2Jaohmb3sg4OmKaMBwuC48sYni5HUw2DvsC8LjGTLK9h+eb1X6RyuOHe4hT0ULCW68iomhjUoKUqlPQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.4"
			},
			"funding": {
				"url": "https://github.com/sponsors/ljharb"
			}
		},
		"node_modules/has-tostringtag": {
			"version": "1.0.2",
			"resolved": "https://registry.npmjs.org/has-tostringtag/-/has-tostringtag-1.0.2.tgz",
			"integrity": "sha512-NqADB8VjPFLM2V0VvHUewwwsw0ZWBaIdgo+ieHtK3hasLz4qeCRjYcqfB6AQrBggRKppKF8L52/VqdVsO47Dlw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"has-symbols": "^1.0.3"
			},
			"engines": {
				"node": ">= 0.4"
			},
			"funding": {
				"url": "https://github.com/sponsors/ljharb"
			}
		},
		"node_modules/hasown": {
			"version": "2.0.2",
			"resolved": "https://registry.npmjs.org/hasown/-/hasown-2.0.2.tgz",
			"integrity": "sha512-0hJU9SCPvmMzIBdZFqNPXWa6dqh7WdH0cII9y+CyS8rG3nL48Bclra9HmKhVVUHyPWNH5Y7xDwAB7bfgSjkUMQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"function-bind": "^1.1.2"
			},
			"engines": {
				"node": ">= 0.4"
			}
		},
		"node_modules/he": {
			"version": "1.2.0",
			"resolved": "https://registry.npmjs.org/he/-/he-1.2.0.tgz",
			"integrity": "sha512-F/1DnUGPopORZi0ni+CvrCgHQ5FyEAHRLSApuYWMmrbSwoN2Mn/7k+Gl38gJnR7yyDZk6WLXwiGod1JOWNDKGw==",
			"dev": true,
			"license": "MIT",
			"bin": {
				"he": "bin/he"
			}
		},
		"node_modules/headers-polyfill": {
			"version": "4.0.3",
			"resolved": "https://registry.npmjs.org/headers-polyfill/-/headers-polyfill-4.0.3.tgz",
			"integrity": "sha512-IScLbePpkvO846sIwOtOTDjutRMWdXdJmXdMvk6gCBHxFO8d+QKOQedyZSxFTTFYRSmlgSTDtXqqq4pcenBXLQ==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/homedir-polyfill": {
			"version": "1.0.3",
			"resolved": "https://registry.npmjs.org/homedir-polyfill/-/homedir-polyfill-1.0.3.tgz",
			"integrity": "sha512-eSmmWE5bZTK2Nou4g0AI3zZ9rswp7GRKoKXS1BLUkvPviOqs4YTN1djQIqrXy9k5gEtdLPy86JjRwsNM9tnDcA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"parse-passwd": "^1.0.0"
			},
			"engines": {
				"node": ">=0.10.0"
			}
		},
		"node_modules/hono": {
			"version": "4.12.10",
			"resolved": "https://registry.npmjs.org/hono/-/hono-4.12.10.tgz",
			"integrity": "sha512-mx/p18PLy5og9ufies2GOSUqep98Td9q4i/EF6X7yJgAiIopxqdfIO3jbqsi3jRgTgw88jMDEzVKi+V2EF+27w==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=16.9.0"
			}
		},
		"node_modules/hosted-git-info": {
			"version": "9.0.2",
			"resolved": "https://registry.npmjs.org/hosted-git-info/-/hosted-git-info-9.0.2.tgz",
			"integrity": "sha512-M422h7o/BR3rmCQ8UHi7cyyMqKltdP9Uo+J2fXK+RSAY+wTcKOIRyhTuKv4qn+DJf3g+PL890AzId5KZpX+CBg==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"lru-cache": "^11.1.0"
			},
			"engines": {
				"node": "^20.17.0 || >=22.9.0"
			}
		},
		"node_modules/hosted-git-info/node_modules/lru-cache": {
			"version": "11.2.7",
			"resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-11.2.7.tgz",
			"integrity": "sha512-aY/R+aEsRelme17KGQa/1ZSIpLpNYYrhcrepKTZgE+W3WM16YMCaPwOHLHsmopZHELU0Ojin1lPVxKR0MihncA==",
			"dev": true,
			"license": "BlueOak-1.0.0",
			"engines": {
				"node": "20 || >=22"
			}
		},
		"node_modules/hpack.js": {
			"version": "2.1.6",
			"resolved": "https://registry.npmjs.org/hpack.js/-/hpack.js-2.1.6.tgz",
			"integrity": "sha512-zJxVehUdMGIKsRaNt7apO2Gqp0BdqW5yaiGHXXmbpvxgBYVZnAql+BJb4RO5ad2MgpbZKn5G6nMnegrH1FcNYQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"inherits": "^2.0.1",
				"obuf": "^1.0.0",
				"readable-stream": "^2.0.1",
				"wbuf": "^1.1.0"
			}
		},
		"node_modules/hpack.js/node_modules/readable-stream": {
			"version": "2.3.8",
			"resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.8.tgz",
			"integrity": "sha512-8p0AUk4XODgIewSi0l8Epjs+EVnWiK7NoDIEGU0HhE7+ZyY8D1IMY7odu5lRrFXGg71L15KG8QrPmum45RTtdA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"core-util-is": "~1.0.0",
				"inherits": "~2.0.3",
				"isarray": "~1.0.0",
				"process-nextick-args": "~2.0.0",
				"safe-buffer": "~5.1.1",
				"string_decoder": "~1.1.1",
				"util-deprecate": "~1.0.1"
			}
		},
		"node_modules/hpack.js/node_modules/safe-buffer": {
			"version": "5.1.2",
			"resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.2.tgz",
			"integrity": "sha512-Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/hpack.js/node_modules/string_decoder": {
			"version": "1.1.1",
			"resolved": "https://registry.npmjs.org/string_decoder/-/string_decoder-1.1.1.tgz",
			"integrity": "sha512-n/ShnvDi6FHbbVfviro+WojiFzv+s8MPMHBczVePfUpDJLwoLT0ht1l4YwBCbi8pJAveEEdnkHyPyTP/mzRfwg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"safe-buffer": "~5.1.0"
			}
		},
		"node_modules/html-encoding-sniffer": {
			"version": "6.0.0",
			"resolved": "https://registry.npmjs.org/html-encoding-sniffer/-/html-encoding-sniffer-6.0.0.tgz",
			"integrity": "sha512-CV9TW3Y3f8/wT0BRFc1/KAVQ3TUHiXmaAb6VW9vtiMFf7SLoMd1PdAc4W3KFOFETBJUb90KatHqlsZMWV+R9Gg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@exodus/bytes": "^1.6.0"
			},
			"engines": {
				"node": "^20.19.0 || ^22.12.0 || >=24.0.0"
			}
		},
		"node_modules/htmlparser2": {
			"version": "10.1.0",
			"resolved": "https://registry.npmjs.org/htmlparser2/-/htmlparser2-10.1.0.tgz",
			"integrity": "sha512-VTZkM9GWRAtEpveh7MSF6SjjrpNVNNVJfFup7xTY3UpFtm67foy9HDVXneLtFVt4pMz5kZtgNcvCniNFb1hlEQ==",
			"dev": true,
			"funding": [
				"https://github.com/fb55/htmlparser2?sponsor=1",
				{
					"type": "github",
					"url": "https://github.com/sponsors/fb55"
				}
			],
			"license": "MIT",
			"dependencies": {
				"domelementtype": "^2.3.0",
				"domhandler": "^5.0.3",
				"domutils": "^3.2.2",
				"entities": "^7.0.1"
			}
		},
		"node_modules/htmlparser2/node_modules/entities": {
			"version": "7.0.1",
			"resolved": "https://registry.npmjs.org/entities/-/entities-7.0.1.tgz",
			"integrity": "sha512-TWrgLOFUQTH994YUyl1yT4uyavY5nNB5muff+RtWaqNVCAK408b5ZnnbNAUEWLTCpum9w6arT70i1XdQ4UeOPA==",
			"dev": true,
			"license": "BSD-2-Clause",
			"engines": {
				"node": ">=0.12"
			},
			"funding": {
				"url": "https://github.com/fb55/entities?sponsor=1"
			}
		},
		"node_modules/http-cache-semantics": {
			"version": "4.2.0",
			"resolved": "https://registry.npmjs.org/http-cache-semantics/-/http-cache-semantics-4.2.0.tgz",
			"integrity": "sha512-dTxcvPXqPvXBQpq5dUr6mEMJX4oIEFv6bwom3FDwKRDsuIjjJGANqhBuoAn9c1RQJIdAKav33ED65E2ys+87QQ==",
			"dev": true,
			"license": "BSD-2-Clause"
		},
		"node_modules/http-deceiver": {
			"version": "1.2.7",
			"resolved": "https://registry.npmjs.org/http-deceiver/-/http-deceiver-1.2.7.tgz",
			"integrity": "sha512-LmpOGxTfbpgtGVxJrj5k7asXHCgNZp5nLfp+hWc8QQRqtb7fUy6kRY3BO1h9ddF6yIPYUARgxGOwB42DnxIaNw==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/http-errors": {
			"version": "2.0.1",
			"resolved": "https://registry.npmjs.org/http-errors/-/http-errors-2.0.1.tgz",
			"integrity": "sha512-4FbRdAX+bSdmo4AUFuS0WNiPz8NgFt+r8ThgNWmlrjQjt1Q7ZR9+zTlce2859x4KSXrwIsaeTqDoKQmtP8pLmQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"depd": "~2.0.0",
				"inherits": "~2.0.4",
				"setprototypeof": "~1.2.0",
				"statuses": "~2.0.2",
				"toidentifier": "~1.0.1"
			},
			"engines": {
				"node": ">= 0.8"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/express"
			}
		},
		"node_modules/http-parser-js": {
			"version": "0.5.10",
			"resolved": "https://registry.npmjs.org/http-parser-js/-/http-parser-js-0.5.10.tgz",
			"integrity": "sha512-Pysuw9XpUq5dVc/2SMHpuTY01RFl8fttgcyunjL7eEMhGM3cI4eOmiCycJDVCo/7O7ClfQD3SaI6ftDzqOXYMA==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/http-proxy": {
			"version": "1.18.1",
			"resolved": "https://registry.npmjs.org/http-proxy/-/http-proxy-1.18.1.tgz",
			"integrity": "sha512-7mz/721AbnJwIVbnaSv1Cz3Am0ZLT/UBwkC92VlxhXv/k/BBQfM2fXElQNC27BVGr0uwUpplYPQM9LnaBMR5NQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"eventemitter3": "^4.0.0",
				"follow-redirects": "^1.0.0",
				"requires-port": "^1.0.0"
			},
			"engines": {
				"node": ">=8.0.0"
			}
		},
		"node_modules/http-proxy-agent": {
			"version": "7.0.2",
			"resolved": "https://registry.npmjs.org/http-proxy-agent/-/http-proxy-agent-7.0.2.tgz",
			"integrity": "sha512-T1gkAiYYDWYx3V5Bmyu7HcfcvL7mUrTWiM6yOfa3PIphViJ/gFPbvidQ+veqSOHci/PxBcDabeUNCzpOODJZig==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"agent-base": "^7.1.0",
				"debug": "^4.3.4"
			},
			"engines": {
				"node": ">= 14"
			}
		},
		"node_modules/http-proxy-middleware": {
			"version": "3.0.5",
			"resolved": "https://registry.npmjs.org/http-proxy-middleware/-/http-proxy-middleware-3.0.5.tgz",
			"integrity": "sha512-GLZZm1X38BPY4lkXA01jhwxvDoOkkXqjgVyUzVxiEK4iuRu03PZoYHhHRwxnfhQMDuaxi3vVri0YgSro/1oWqg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@types/http-proxy": "^1.17.15",
				"debug": "^4.3.6",
				"http-proxy": "^1.18.1",
				"is-glob": "^4.0.3",
				"is-plain-object": "^5.0.0",
				"micromatch": "^4.0.8"
			},
			"engines": {
				"node": "^14.15.0 || ^16.10.0 || >=18.0.0"
			}
		},
		"node_modules/http-proxy/node_modules/eventemitter3": {
			"version": "4.0.7",
			"resolved": "https://registry.npmjs.org/eventemitter3/-/eventemitter3-4.0.7.tgz",
			"integrity": "sha512-8guHBZCwKnFhYdHr2ysuRWErTwhoN2X8XELRlrRwpmfeY2jjuUN4taQMsULKUVo1K4DvZl+0pgfyoysHxvmvEw==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/http-server": {
			"version": "14.1.1",
			"resolved": "https://registry.npmjs.org/http-server/-/http-server-14.1.1.tgz",
			"integrity": "sha512-+cbxadF40UXd9T01zUHgA+rlo2Bg1Srer4+B4NwIHdaGxAGGv59nYRnGGDJ9LBk7alpS0US+J+bLLdQOOkJq4A==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"basic-auth": "^2.0.1",
				"chalk": "^4.1.2",
				"corser": "^2.0.1",
				"he": "^1.2.0",
				"html-encoding-sniffer": "^3.0.0",
				"http-proxy": "^1.18.1",
				"mime": "^1.6.0",
				"minimist": "^1.2.6",
				"opener": "^1.5.1",
				"portfinder": "^1.0.28",
				"secure-compare": "3.0.1",
				"union": "~0.5.0",
				"url-join": "^4.0.1"
			},
			"bin": {
				"http-server": "bin/http-server"
			},
			"engines": {
				"node": ">=12"
			}
		},
		"node_modules/http-server/node_modules/ansi-styles": {
			"version": "4.3.0",
			"resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz",
			"integrity": "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"color-convert": "^2.0.1"
			},
			"engines": {
				"node": ">=8"
			},
			"funding": {
				"url": "https://github.com/chalk/ansi-styles?sponsor=1"
			}
		},
		"node_modules/http-server/node_modules/chalk": {
			"version": "4.1.2",
			"resolved": "https://registry.npmjs.org/chalk/-/chalk-4.1.2.tgz",
			"integrity": "sha512-oKnbhFyRIXpUuez8iBMmyEa4nbj4IOQyuhc/wy9kY7/WVPcwIO9VA668Pu8RkO7+0G76SLROeyw9CpQ061i4mA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ansi-styles": "^4.1.0",
				"supports-color": "^7.1.0"
			},
			"engines": {
				"node": ">=10"
			},
			"funding": {
				"url": "https://github.com/chalk/chalk?sponsor=1"
			}
		},
		"node_modules/http-server/node_modules/html-encoding-sniffer": {
			"version": "3.0.0",
			"resolved": "https://registry.npmjs.org/html-encoding-sniffer/-/html-encoding-sniffer-3.0.0.tgz",
			"integrity": "sha512-oWv4T4yJ52iKrufjnyZPkrN0CH3QnrUqdB6In1g5Fe1mia8GmF36gnfNySxoZtxD5+NmYw1EElVXiBk93UeskA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"whatwg-encoding": "^2.0.0"
			},
			"engines": {
				"node": ">=12"
			}
		},
		"node_modules/https-proxy-agent": {
			"version": "7.0.6",
			"resolved": "https://registry.npmjs.org/https-proxy-agent/-/https-proxy-agent-7.0.6.tgz",
			"integrity": "sha512-vK9P5/iUfdl95AI+JVyUuIcVtd4ofvtrOr3HNtM2yxC9bnMbEdp3x01OhQNnjb8IJYi38VlTE3mBXwcfvywuSw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"agent-base": "^7.1.2",
				"debug": "4"
			},
			"engines": {
				"node": ">= 14"
			}
		},
		"node_modules/hyperdyperid": {
			"version": "1.2.0",
			"resolved": "https://registry.npmjs.org/hyperdyperid/-/hyperdyperid-1.2.0.tgz",
			"integrity": "sha512-Y93lCzHYgGWdrJ66yIktxiaGULYc6oGiABxhcO5AufBeOyoIdZF7bIfLaOrbM0iGIOXQQgxxRrFEnb+Y6w1n4A==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=10.18"
			}
		},
		"node_modules/iconv-lite": {
			"version": "0.7.2",
			"resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.7.2.tgz",
			"integrity": "sha512-im9DjEDQ55s9fL4EYzOAv0yMqmMBSZp6G0VvFyTMPKWxiSBHUj9NW/qqLmXUwXrrM7AvqSlTCfvqRb0cM8yYqw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"safer-buffer": ">= 2.1.2 < 3.0.0"
			},
			"engines": {
				"node": ">=0.10.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/express"
			}
		},
		"node_modules/icss-utils": {
			"version": "5.1.0",
			"resolved": "https://registry.npmjs.org/icss-utils/-/icss-utils-5.1.0.tgz",
			"integrity": "sha512-soFhflCVWLfRNOPU3iv5Z9VUdT44xFRbzjLsEzSr5AQmgqPMTHdU3PMT1Cf1ssx8fLNJDA1juftYl+PUcv3MqA==",
			"dev": true,
			"license": "ISC",
			"engines": {
				"node": "^10 || ^12 || >= 14"
			},
			"peerDependencies": {
				"postcss": "^8.1.0"
			}
		},
		"node_modules/ieee754": {
			"version": "1.2.1",
			"resolved": "https://registry.npmjs.org/ieee754/-/ieee754-1.2.1.tgz",
			"integrity": "sha512-dcyqhDvX1C46lXZcVqCpK+FtMRQVdIMN6/Df5js2zouUsqG7I6sFxitIC+7KYK29KdXOLHdu9zL4sFnoVQnqaA==",
			"dev": true,
			"funding": [
				{
					"type": "github",
					"url": "https://github.com/sponsors/feross"
				},
				{
					"type": "patreon",
					"url": "https://www.patreon.com/feross"
				},
				{
					"type": "consulting",
					"url": "https://feross.org/support"
				}
			],
			"license": "BSD-3-Clause"
		},
		"node_modules/ignore": {
			"version": "7.0.5",
			"resolved": "https://registry.npmjs.org/ignore/-/ignore-7.0.5.tgz",
			"integrity": "sha512-Hs59xBNfUIunMFgWAbGX5cq6893IbWg4KnrjbYwX3tx0ztorVgTDA6B2sxf8ejHJ4wz8BqGUMYlnzNBer5NvGg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 4"
			}
		},
		"node_modules/ignore-walk": {
			"version": "8.0.0",
			"resolved": "https://registry.npmjs.org/ignore-walk/-/ignore-walk-8.0.0.tgz",
			"integrity": "sha512-FCeMZT4NiRQGh+YkeKMtWrOmBgWjHjMJ26WQWrRQyoyzqevdaGSakUaJW5xQYmjLlUVk2qUnCjYVBax9EKKg8A==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"minimatch": "^10.0.3"
			},
			"engines": {
				"node": "^20.17.0 || >=22.9.0"
			}
		},
		"node_modules/image-size": {
			"version": "0.5.5",
			"resolved": "https://registry.npmjs.org/image-size/-/image-size-0.5.5.tgz",
			"integrity": "sha512-6TDAlDPZxUFCv+fuOkIoXT/V/f3Qbq8e37p+YOiYrUv3v9cc3/6x78VdfPgFVaB9dZYeLUfKgHRebpkm/oP2VQ==",
			"dev": true,
			"license": "MIT",
			"optional": true,
			"bin": {
				"image-size": "bin/image-size.js"
			},
			"engines": {
				"node": ">=0.10.0"
			}
		},
		"node_modules/immutable": {
			"version": "5.1.5",
			"resolved": "https://registry.npmjs.org/immutable/-/immutable-5.1.5.tgz",
			"integrity": "sha512-t7xcm2siw+hlUM68I+UEOK+z84RzmN59as9DZ7P1l0994DKUWV7UXBMQZVxaoMSRQ+PBZbHCOoBt7a2wxOMt+A==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/import-fresh": {
			"version": "3.3.1",
			"resolved": "https://registry.npmjs.org/import-fresh/-/import-fresh-3.3.1.tgz",
			"integrity": "sha512-TR3KfrTZTYLPB6jUjfx6MF9WcWrHL9su5TObK4ZkYgBdWKPOFoSoQIdEuTuR82pmtxH2spWG9h6etwfr1pLBqQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"parent-module": "^1.0.0",
				"resolve-from": "^4.0.0"
			},
			"engines": {
				"node": ">=6"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/imurmurhash": {
			"version": "0.1.4",
			"resolved": "https://registry.npmjs.org/imurmurhash/-/imurmurhash-0.1.4.tgz",
			"integrity": "sha512-JmXMZ6wuvDmLiHEml9ykzqO6lwFbof0GG4IkcGaENdCRDDmMVnny7s5HsIgHCbaq0w2MyPhDqkhTUgS2LU2PHA==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=0.8.19"
			}
		},
		"node_modules/inherits": {
			"version": "2.0.4",
			"resolved": "https://registry.npmjs.org/inherits/-/inherits-2.0.4.tgz",
			"integrity": "sha512-k/vGaX4/Yla3WzyMCvTQOXYeIHvqOKtnqBduzTHpzpQZzAskKMhZ2K+EnBiSM9zGSoIFeMpXKxa4dYeZIQqewQ==",
			"dev": true,
			"license": "ISC"
		},
		"node_modules/ini": {
			"version": "6.0.0",
			"resolved": "https://registry.npmjs.org/ini/-/ini-6.0.0.tgz",
			"integrity": "sha512-IBTdIkzZNOpqm7q3dRqJvMaldXjDHWkEDfrwGEQTs5eaQMWV+djAhR+wahyNNMAa+qpbDUhBMVt4ZKNwpPm7xQ==",
			"dev": true,
			"license": "ISC",
			"engines": {
				"node": "^20.17.0 || >=22.9.0"
			}
		},
		"node_modules/ip-address": {
			"version": "10.1.0",
			"resolved": "https://registry.npmjs.org/ip-address/-/ip-address-10.1.0.tgz",
			"integrity": "sha512-XXADHxXmvT9+CRxhXg56LJovE+bmWnEWB78LB83VZTprKTmaC5QfruXocxzTZ2Kl0DNwKuBdlIhjL8LeY8Sf8Q==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 12"
			}
		},
		"node_modules/ipaddr.js": {
			"version": "1.9.1",
			"resolved": "https://registry.npmjs.org/ipaddr.js/-/ipaddr.js-1.9.1.tgz",
			"integrity": "sha512-0KI/607xoxSToH7GjN1FfSbLoU0+btTicjsQSWQlh/hZykN8KpmMf7uYwPW3R+akZ6R/w18ZlXSHBYXiYUPO3g==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.10"
			}
		},
		"node_modules/is-arrayish": {
			"version": "0.2.1",
			"resolved": "https://registry.npmjs.org/is-arrayish/-/is-arrayish-0.2.1.tgz",
			"integrity": "sha512-zz06S8t0ozoDXMG+ube26zeCTNXcKIPJZJi8hBrF4idCLms4CG9QtK7qBl1boi5ODzFpjswb5JPmHCbMpjaYzg==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/is-binary-path": {
			"version": "2.1.0",
			"resolved": "https://registry.npmjs.org/is-binary-path/-/is-binary-path-2.1.0.tgz",
			"integrity": "sha512-ZMERYes6pDydyuGidse7OsHxtbI7WVeUEozgR/g7rd0xUimYNlvZRE/K2MgZTjWy725IfelLeVcEM97mmtRGXw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"binary-extensions": "^2.0.0"
			},
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/is-core-module": {
			"version": "2.16.1",
			"resolved": "https://registry.npmjs.org/is-core-module/-/is-core-module-2.16.1.tgz",
			"integrity": "sha512-UfoeMA6fIJ8wTYFEUjelnaGI67v6+N7qXJEvQuIGa99l4xsCruSYOVSQ0uPANn4dAzm8lkYPaKLrrijLq7x23w==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"hasown": "^2.0.2"
			},
			"engines": {
				"node": ">= 0.4"
			},
			"funding": {
				"url": "https://github.com/sponsors/ljharb"
			}
		},
		"node_modules/is-docker": {
			"version": "2.2.1",
			"resolved": "https://registry.npmjs.org/is-docker/-/is-docker-2.2.1.tgz",
			"integrity": "sha512-F+i2BKsFrH66iaUFc0woD8sLy8getkwTwtOBjvs56Cx4CgJDeKQeqfz8wAYiSb8JOprWhHH5p77PbmYCvvUuXQ==",
			"dev": true,
			"license": "MIT",
			"bin": {
				"is-docker": "cli.js"
			},
			"engines": {
				"node": ">=8"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/is-extglob": {
			"version": "2.1.1",
			"resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
			"integrity": "sha512-SbKbANkN603Vi4jEZv49LeVJMn4yGwsbzZworEoyEiutsN3nJYdbO36zfhGJ6QEDpOZIFkDtnq5JRxmvl3jsoQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=0.10.0"
			}
		},
		"node_modules/is-fullwidth-code-point": {
			"version": "5.1.0",
			"resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-5.1.0.tgz",
			"integrity": "sha512-5XHYaSyiqADb4RnZ1Bdad6cPp8Toise4TzEjcOYDHZkTCbKgiUl7WTUCpNWHuxmDt91wnsZBc9xinNzopv3JMQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"get-east-asian-width": "^1.3.1"
			},
			"engines": {
				"node": ">=18"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/is-glob": {
			"version": "4.0.3",
			"resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.3.tgz",
			"integrity": "sha512-xelSayHH36ZgE7ZWhli7pW34hNbNl8Ojv5KVmkJD4hBdD3th8Tfk9vYasLM+mXWOZhFkgZfxhLSnrwRr4elSSg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"is-extglob": "^2.1.1"
			},
			"engines": {
				"node": ">=0.10.0"
			}
		},
		"node_modules/is-inside-container": {
			"version": "1.0.0",
			"resolved": "https://registry.npmjs.org/is-inside-container/-/is-inside-container-1.0.0.tgz",
			"integrity": "sha512-KIYLCCJghfHZxqjYBE7rEy0OBuTd5xCHS7tHVgvCLkx7StIoaxwNW3hCALgEUjFfeRk+MG/Qxmp/vtETEF3tRA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"is-docker": "^3.0.0"
			},
			"bin": {
				"is-inside-container": "cli.js"
			},
			"engines": {
				"node": ">=14.16"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/is-inside-container/node_modules/is-docker": {
			"version": "3.0.0",
			"resolved": "https://registry.npmjs.org/is-docker/-/is-docker-3.0.0.tgz",
			"integrity": "sha512-eljcgEDlEns/7AXFosB5K/2nCM4P7FQPkGc/DWLy5rmFEWvZayGrik1d9/QIY5nJ4f9YsVvBkA6kJpHn9rISdQ==",
			"dev": true,
			"license": "MIT",
			"bin": {
				"is-docker": "cli.js"
			},
			"engines": {
				"node": "^12.20.0 || ^14.13.1 || >=16.0.0"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/is-interactive": {
			"version": "2.0.0",
			"resolved": "https://registry.npmjs.org/is-interactive/-/is-interactive-2.0.0.tgz",
			"integrity": "sha512-qP1vozQRI+BMOPcjFzrjXuQvdak2pHNUMZoeG2eRbiSqyvbEf/wQtEOTOX1guk6E3t36RkaqiSt8A/6YElNxLQ==",
			"license": "MIT",
			"engines": {
				"node": ">=12"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/is-network-error": {
			"version": "1.3.1",
			"resolved": "https://registry.npmjs.org/is-network-error/-/is-network-error-1.3.1.tgz",
			"integrity": "sha512-6QCxa49rQbmUWLfk0nuGqzql9U8uaV2H6279bRErPBHe/109hCzsLUBUHfbEtvLIHBd6hyXbgedBSHevm43Edw==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=16"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/is-node-process": {
			"version": "1.2.0",
			"resolved": "https://registry.npmjs.org/is-node-process/-/is-node-process-1.2.0.tgz",
			"integrity": "sha512-Vg4o6/fqPxIjtxgUH5QLJhwZ7gW5diGCVlXpuUfELC62CuxM1iHcRe51f2W1FDy04Ai4KJkagKjx3XaqyfRKXw==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/is-number": {
			"version": "7.0.0",
			"resolved": "https://registry.npmjs.org/is-number/-/is-number-7.0.0.tgz",
			"integrity": "sha512-41Cifkg6e8TylSpdtTpeLVMqvSBEVzTttHvERD741+pnZ8ANv0004MRL43QKPDlK9cGvNp6NZWZUBlbGXYxxng==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=0.12.0"
			}
		},
		"node_modules/is-plain-obj": {
			"version": "3.0.0",
			"resolved": "https://registry.npmjs.org/is-plain-obj/-/is-plain-obj-3.0.0.tgz",
			"integrity": "sha512-gwsOE28k+23GP1B6vFl1oVh/WOzmawBrKwo5Ev6wMKzPkaXaCDIQKzLnvsA42DRlbVTWorkgTKIviAKCWkfUwA==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=10"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/is-plain-object": {
			"version": "5.0.0",
			"resolved": "https://registry.npmjs.org/is-plain-object/-/is-plain-object-5.0.0.tgz",
			"integrity": "sha512-VRSzKkbMm5jMDoKLbltAkFQ5Qr7VDiTFGXxYFXXowVj387GeGNOCsOH6Msy00SGZ3Fp84b1Naa1psqgcCIEP5Q==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=0.10.0"
			}
		},
		"node_modules/is-potential-custom-element-name": {
			"version": "1.0.1",
			"resolved": "https://registry.npmjs.org/is-potential-custom-element-name/-/is-potential-custom-element-name-1.0.1.tgz",
			"integrity": "sha512-bCYeRA2rVibKZd+s2625gGnGF/t7DSqDs4dP7CrLA1m7jKWz6pps0LpYLJN8Q64HtmPKJ1hrN3nzPNKFEKOUiQ==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/is-promise": {
			"version": "4.0.0",
			"resolved": "https://registry.npmjs.org/is-promise/-/is-promise-4.0.0.tgz",
			"integrity": "sha512-hvpoI6korhJMnej285dSg6nu1+e6uxs7zG3BYAm5byqDsgJNWwxzM6z6iZiAgQR4TJ30JmBTOwqZUw3WlyH3AQ==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/is-unicode-supported": {
			"version": "2.1.0",
			"resolved": "https://registry.npmjs.org/is-unicode-supported/-/is-unicode-supported-2.1.0.tgz",
			"integrity": "sha512-mE00Gnza5EEB3Ds0HfMyllZzbBrmLOX3vfWoj9A9PEnTfratQ/BcaJOuMhnkhjXvb2+FkY3VuHqtAGpTPmglFQ==",
			"license": "MIT",
			"engines": {
				"node": ">=18"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/is-what": {
			"version": "4.1.16",
			"resolved": "https://registry.npmjs.org/is-what/-/is-what-4.1.16.tgz",
			"integrity": "sha512-ZhMwEosbFJkA0YhFnNDgTM4ZxDRsS6HqTo7qsZM08fehyRYIYa0yHu5R6mgo1n/8MgaPBXiPimPD77baVFYg+A==",
			"dev": true,
			"license": "MIT",
			"peer": true,
			"engines": {
				"node": ">=12.13"
			},
			"funding": {
				"url": "https://github.com/sponsors/mesqueeb"
			}
		},
		"node_modules/is-windows": {
			"version": "1.0.2",
			"resolved": "https://registry.npmjs.org/is-windows/-/is-windows-1.0.2.tgz",
			"integrity": "sha512-eXK1UInq2bPmjyX6e3VHIzMLobc4J94i4AWn+Hpq3OU5KkrRC96OAcR3PRJ/pGu6m8TRnBHP9dkXQVsT/COVIA==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=0.10.0"
			}
		},
		"node_modules/is-wsl": {
			"version": "2.2.0",
			"resolved": "https://registry.npmjs.org/is-wsl/-/is-wsl-2.2.0.tgz",
			"integrity": "sha512-fKzAra0rGJUUBwGBgNkHZuToZcn+TtXHpeCgmkMJMMYx1sQDYaCSyjJBSCa2nH1DGm7s3n1oBnohoVTBaN7Lww==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"is-docker": "^2.0.0"
			},
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/isarray": {
			"version": "1.0.0",
			"resolved": "https://registry.npmjs.org/isarray/-/isarray-1.0.0.tgz",
			"integrity": "sha512-VLghIWNM6ELQzo7zwmcg0NmTVyWKYjvIeM83yjp0wRDTmUnrM678fQbcKBo6n2CJEF0szoG//ytg+TKla89ALQ==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/isexe": {
			"version": "2.0.0",
			"resolved": "https://registry.npmjs.org/isexe/-/isexe-2.0.0.tgz",
			"integrity": "sha512-RHxMLp9lnKHGHRng9QFhRCMbYAcVpn69smSGcq3f36xjgVVWThj4qqLbTLlq7Ssj8B+fIQ1EuCEGI2lKsyQeIw==",
			"dev": true,
			"license": "ISC"
		},
		"node_modules/isobject": {
			"version": "3.0.1",
			"resolved": "https://registry.npmjs.org/isobject/-/isobject-3.0.1.tgz",
			"integrity": "sha512-WhB9zCku7EGTj/HQQRz5aUQEUeoQZH2bWcltRErOpymJ4boYE6wL9Tbr23krRPSZ+C5zqNSrSw+Cc7sZZ4b7vg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=0.10.0"
			}
		},
		"node_modules/isomorphic-ws": {
			"version": "5.0.0",
			"resolved": "https://registry.npmjs.org/isomorphic-ws/-/isomorphic-ws-5.0.0.tgz",
			"integrity": "sha512-muId7Zzn9ywDsyXgTIafTry2sV3nySZeUDe6YedVd1Hvuuep5AsIlqK+XefWpYTyJG5e503F2xIuT2lcU6rCSw==",
			"dev": true,
			"license": "MIT",
			"peerDependencies": {
				"ws": "*"
			}
		},
		"node_modules/istanbul-lib-coverage": {
			"version": "3.2.2",
			"resolved": "https://registry.npmjs.org/istanbul-lib-coverage/-/istanbul-lib-coverage-3.2.2.tgz",
			"integrity": "sha512-O8dpsF+r0WV/8MNRKfnmrtCWhuKjxrq2w+jpzBL5UZKTi2LeVWnWOmWRxFlesJONmc+wLAGvKQZEOanko0LFTg==",
			"dev": true,
			"license": "BSD-3-Clause",
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/istanbul-lib-instrument": {
			"version": "6.0.3",
			"resolved": "https://registry.npmjs.org/istanbul-lib-instrument/-/istanbul-lib-instrument-6.0.3.tgz",
			"integrity": "sha512-Vtgk7L/R2JHyyGW07spoFlB8/lpjiOLTjMdms6AFMraYt3BaJauod/NGrfnVG/y4Ix1JEuMRPDPEj2ua+zz1/Q==",
			"dev": true,
			"license": "BSD-3-Clause",
			"dependencies": {
				"@babel/core": "^7.23.9",
				"@babel/parser": "^7.23.9",
				"@istanbuljs/schema": "^0.1.3",
				"istanbul-lib-coverage": "^3.2.0",
				"semver": "^7.5.4"
			},
			"engines": {
				"node": ">=10"
			}
		},
		"node_modules/jest-diff": {
			"version": "30.3.0",
			"resolved": "https://registry.npmjs.org/jest-diff/-/jest-diff-30.3.0.tgz",
			"integrity": "sha512-n3q4PDQjS4LrKxfWB3Z5KNk1XjXtZTBwQp71OP0Jo03Z6V60x++K5L8k6ZrW8MY8pOFylZvHM0zsjS1RqlHJZQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@jest/diff-sequences": "30.3.0",
				"@jest/get-type": "30.1.0",
				"chalk": "^4.1.2",
				"pretty-format": "30.3.0"
			},
			"engines": {
				"node": "^18.14.0 || ^20.0.0 || ^22.0.0 || >=24.0.0"
			}
		},
		"node_modules/jest-diff/node_modules/ansi-styles": {
			"version": "4.3.0",
			"resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz",
			"integrity": "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"color-convert": "^2.0.1"
			},
			"engines": {
				"node": ">=8"
			},
			"funding": {
				"url": "https://github.com/chalk/ansi-styles?sponsor=1"
			}
		},
		"node_modules/jest-diff/node_modules/chalk": {
			"version": "4.1.2",
			"resolved": "https://registry.npmjs.org/chalk/-/chalk-4.1.2.tgz",
			"integrity": "sha512-oKnbhFyRIXpUuez8iBMmyEa4nbj4IOQyuhc/wy9kY7/WVPcwIO9VA668Pu8RkO7+0G76SLROeyw9CpQ061i4mA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ansi-styles": "^4.1.0",
				"supports-color": "^7.1.0"
			},
			"engines": {
				"node": ">=10"
			},
			"funding": {
				"url": "https://github.com/chalk/chalk?sponsor=1"
			}
		},
		"node_modules/jest-regex-util": {
			"version": "30.0.1",
			"resolved": "https://registry.npmjs.org/jest-regex-util/-/jest-regex-util-30.0.1.tgz",
			"integrity": "sha512-jHEQgBXAgc+Gh4g0p3bCevgRCVRkB4VB70zhoAE48gxeSr1hfUOsM/C2WoJgVL7Eyg//hudYENbm3Ne+/dRVVA==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": "^18.14.0 || ^20.0.0 || ^22.0.0 || >=24.0.0"
			}
		},
		"node_modules/jest-util": {
			"version": "30.3.0",
			"resolved": "https://registry.npmjs.org/jest-util/-/jest-util-30.3.0.tgz",
			"integrity": "sha512-/jZDa00a3Sz7rdyu55NLrQCIrbyIkbBxareejQI315f/i8HjYN+ZWsDLLpoQSiUIEIyZF/R8fDg3BmB8AtHttg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@jest/types": "30.3.0",
				"@types/node": "*",
				"chalk": "^4.1.2",
				"ci-info": "^4.2.0",
				"graceful-fs": "^4.2.11",
				"picomatch": "^4.0.3"
			},
			"engines": {
				"node": "^18.14.0 || ^20.0.0 || ^22.0.0 || >=24.0.0"
			}
		},
		"node_modules/jest-util/node_modules/ansi-styles": {
			"version": "4.3.0",
			"resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz",
			"integrity": "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"color-convert": "^2.0.1"
			},
			"engines": {
				"node": ">=8"
			},
			"funding": {
				"url": "https://github.com/chalk/ansi-styles?sponsor=1"
			}
		},
		"node_modules/jest-util/node_modules/chalk": {
			"version": "4.1.2",
			"resolved": "https://registry.npmjs.org/chalk/-/chalk-4.1.2.tgz",
			"integrity": "sha512-oKnbhFyRIXpUuez8iBMmyEa4nbj4IOQyuhc/wy9kY7/WVPcwIO9VA668Pu8RkO7+0G76SLROeyw9CpQ061i4mA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ansi-styles": "^4.1.0",
				"supports-color": "^7.1.0"
			},
			"engines": {
				"node": ">=10"
			},
			"funding": {
				"url": "https://github.com/chalk/chalk?sponsor=1"
			}
		},
		"node_modules/jest-worker": {
			"version": "30.3.0",
			"resolved": "https://registry.npmjs.org/jest-worker/-/jest-worker-30.3.0.tgz",
			"integrity": "sha512-DrCKkaQwHexjRUFTmPzs7sHQe0TSj9nvDALKGdwmK5mW9v7j90BudWirKAJHt3QQ9Dhrg1F7DogPzhChppkJpQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@types/node": "*",
				"@ungap/structured-clone": "^1.3.0",
				"jest-util": "30.3.0",
				"merge-stream": "^2.0.0",
				"supports-color": "^8.1.1"
			},
			"engines": {
				"node": "^18.14.0 || ^20.0.0 || ^22.0.0 || >=24.0.0"
			}
		},
		"node_modules/jest-worker/node_modules/supports-color": {
			"version": "8.1.1",
			"resolved": "https://registry.npmjs.org/supports-color/-/supports-color-8.1.1.tgz",
			"integrity": "sha512-MpUEN2OodtUzxvKQl72cUF7RQ5EiHsGvSsVG0ia9c5RbWGL2CI4C7EpPS8UTBIplnlzZiNuV56w+FuNxy3ty2Q==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"has-flag": "^4.0.0"
			},
			"engines": {
				"node": ">=10"
			},
			"funding": {
				"url": "https://github.com/chalk/supports-color?sponsor=1"
			}
		},
		"node_modules/jiti": {
			"version": "2.6.1",
			"resolved": "https://registry.npmjs.org/jiti/-/jiti-2.6.1.tgz",
			"integrity": "sha512-ekilCSN1jwRvIbgeg/57YFh8qQDNbwDb9xT/qu2DAHbFFZUicIl4ygVaAvzveMhMVr3LnpSKTNnwt8PoOfmKhQ==",
			"dev": true,
			"license": "MIT",
			"bin": {
				"jiti": "lib/jiti-cli.mjs"
			}
		},
		"node_modules/jose": {
			"version": "6.2.2",
			"resolved": "https://registry.npmjs.org/jose/-/jose-6.2.2.tgz",
			"integrity": "sha512-d7kPDd34KO/YnzaDOlikGpOurfF0ByC2sEV4cANCtdqLlTfBlw2p14O/5d/zv40gJPbIQxfES3nSx1/oYNyuZQ==",
			"dev": true,
			"license": "MIT",
			"funding": {
				"url": "https://github.com/sponsors/panva"
			}
		},
		"node_modules/js-tokens": {
			"version": "4.0.0",
			"resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",
			"integrity": "sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/js-yaml": {
			"version": "3.14.2",
			"resolved": "https://registry.npmjs.org/js-yaml/-/js-yaml-3.14.2.tgz",
			"integrity": "sha512-PMSmkqxr106Xa156c2M265Z+FTrPl+oxd/rgOQy2tijQeK5TxQ43psO1ZCwhVOSdnn+RzkzlRz/eY4BgJBYVpg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"argparse": "^1.0.7",
				"esprima": "^4.0.0"
			},
			"bin": {
				"js-yaml": "bin/js-yaml.js"
			}
		},
		"node_modules/js-yaml/node_modules/argparse": {
			"version": "1.0.10",
			"resolved": "https://registry.npmjs.org/argparse/-/argparse-1.0.10.tgz",
			"integrity": "sha512-o5Roy6tNG4SL/FOkCAN6RzjiakZS25RLYFrcMttJqbdd8BWrnA+fGz57iN5Pb06pvBGvl5gQ0B48dJlslXvoTg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"sprintf-js": "~1.0.2"
			}
		},
		"node_modules/jsdom": {
			"version": "28.1.0",
			"resolved": "https://registry.npmjs.org/jsdom/-/jsdom-28.1.0.tgz",
			"integrity": "sha512-0+MoQNYyr2rBHqO1xilltfDjV9G7ymYGlAUazgcDLQaUf8JDHbuGwsxN6U9qWaElZ4w1B2r7yEGIL3GdeW3Rug==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@acemir/cssom": "^0.9.31",
				"@asamuzakjp/dom-selector": "^6.8.1",
				"@bramus/specificity": "^2.4.2",
				"@exodus/bytes": "^1.11.0",
				"cssstyle": "^6.0.1",
				"data-urls": "^7.0.0",
				"decimal.js": "^10.6.0",
				"html-encoding-sniffer": "^6.0.0",
				"http-proxy-agent": "^7.0.2",
				"https-proxy-agent": "^7.0.6",
				"is-potential-custom-element-name": "^1.0.1",
				"parse5": "^8.0.0",
				"saxes": "^6.0.0",
				"symbol-tree": "^3.2.4",
				"tough-cookie": "^6.0.0",
				"undici": "^7.21.0",
				"w3c-xmlserializer": "^5.0.0",
				"webidl-conversions": "^8.0.1",
				"whatwg-mimetype": "^5.0.0",
				"whatwg-url": "^16.0.0",
				"xml-name-validator": "^5.0.0"
			},
			"engines": {
				"node": "^20.19.0 || ^22.12.0 || >=24.0.0"
			},
			"peerDependencies": {
				"canvas": "^3.0.0"
			},
			"peerDependenciesMeta": {
				"canvas": {
					"optional": true
				}
			}
		},
		"node_modules/jsesc": {
			"version": "3.1.0",
			"resolved": "https://registry.npmjs.org/jsesc/-/jsesc-3.1.0.tgz",
			"integrity": "sha512-/sM3dO2FOzXjKQhJuo0Q173wf2KOo8t4I8vHy6lF9poUp7bKT0/NHE8fPX23PwfhnykfqnC2xRxOnVw5XuGIaA==",
			"dev": true,
			"license": "MIT",
			"bin": {
				"jsesc": "bin/jsesc"
			},
			"engines": {
				"node": ">=6"
			}
		},
		"node_modules/json-buffer": {
			"version": "3.0.1",
			"resolved": "https://registry.npmjs.org/json-buffer/-/json-buffer-3.0.1.tgz",
			"integrity": "sha512-4bV5BfR2mqfQTJm+V5tPPdf+ZpuhiIvTuAB5g8kcrXOZpTT/QwwVRWBywX1ozr6lEuPdbHxwaJlm9G6mI2sfSQ==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/json-parse-even-better-errors": {
			"version": "5.0.0",
			"resolved": "https://registry.npmjs.org/json-parse-even-better-errors/-/json-parse-even-better-errors-5.0.0.tgz",
			"integrity": "sha512-ZF1nxZ28VhQouRWhUcVlUIN3qwSgPuswK05s/HIaoetAoE/9tngVmCHjSxmSQPav1nd+lPtTL0YZ/2AFdR/iYQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": "^20.17.0 || >=22.9.0"
			}
		},
		"node_modules/json-schema-traverse": {
			"version": "1.0.0",
			"resolved": "https://registry.npmjs.org/json-schema-traverse/-/json-schema-traverse-1.0.0.tgz",
			"integrity": "sha512-NM8/P9n3XjXhIZn1lLhkFaACTOURQXjWhV4BA/RnOv8xvgqtqpAX9IO4mRQxSx1Rlo4tqzeqb0sOlruaOy3dug==",
			"license": "MIT"
		},
		"node_modules/json-schema-typed": {
			"version": "8.0.2",
			"resolved": "https://registry.npmjs.org/json-schema-typed/-/json-schema-typed-8.0.2.tgz",
			"integrity": "sha512-fQhoXdcvc3V28x7C7BMs4P5+kNlgUURe2jmUT1T//oBRMDrqy1QPelJimwZGo7Hg9VPV3EQV5Bnq4hbFy2vetA==",
			"dev": true,
			"license": "BSD-2-Clause"
		},
		"node_modules/json-stable-stringify-without-jsonify": {
			"version": "1.0.1",
			"resolved": "https://registry.npmjs.org/json-stable-stringify-without-jsonify/-/json-stable-stringify-without-jsonify-1.0.1.tgz",
			"integrity": "sha512-Bdboy+l7tA3OGW6FjyFHWkP5LuByj1Tk33Ljyq0axyzdk9//JSi2u3fP1QSmd1KNwq6VOKYGlAu87CisVir6Pw==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/json5": {
			"version": "2.2.3",
			"resolved": "https://registry.npmjs.org/json5/-/json5-2.2.3.tgz",
			"integrity": "sha512-XmOWe7eyHYH14cLdVPoyg+GOH3rYX++KpzrylJwSW98t3Nk+U8XOl8FWKOgwtzdb8lXGf6zYwDUzeHMWfxasyg==",
			"dev": true,
			"license": "MIT",
			"bin": {
				"json5": "lib/cli.js"
			},
			"engines": {
				"node": ">=6"
			}
		},
		"node_modules/jsonc-eslint-parser": {
			"version": "2.4.2",
			"resolved": "https://registry.npmjs.org/jsonc-eslint-parser/-/jsonc-eslint-parser-2.4.2.tgz",
			"integrity": "sha512-1e4qoRgnn448pRuMvKGsFFymUCquZV0mpGgOyIKNgD3JVDTsVJyRBGH/Fm0tBb8WsWGgmB1mDe6/yJMQM37DUA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"acorn": "^8.5.0",
				"eslint-visitor-keys": "^3.0.0",
				"espree": "^9.0.0",
				"semver": "^7.3.5"
			},
			"engines": {
				"node": "^12.22.0 || ^14.17.0 || >=16.0.0"
			},
			"funding": {
				"url": "https://github.com/sponsors/ota-meshi"
			}
		},
		"node_modules/jsonc-eslint-parser/node_modules/espree": {
			"version": "9.6.1",
			"resolved": "https://registry.npmjs.org/espree/-/espree-9.6.1.tgz",
			"integrity": "sha512-oruZaFkjorTpF32kDSI5/75ViwGeZginGGy2NoOSg3Q9bnwlnmDm4HLnkl0RE3n+njDXR037aY1+x58Z/zFdwQ==",
			"dev": true,
			"license": "BSD-2-Clause",
			"dependencies": {
				"acorn": "^8.9.0",
				"acorn-jsx": "^5.3.2",
				"eslint-visitor-keys": "^3.4.1"
			},
			"engines": {
				"node": "^12.22.0 || ^14.17.0 || >=16.0.0"
			},
			"funding": {
				"url": "https://opencollective.com/eslint"
			}
		},
		"node_modules/jsonc-parser": {
			"version": "3.3.1",
			"resolved": "https://registry.npmjs.org/jsonc-parser/-/jsonc-parser-3.3.1.tgz",
			"integrity": "sha512-HUgH65KyejrUFPvHFPbqOY0rsFip3Bo5wb4ngvdi1EpCYWUQDC5V+Y7mZws+DLkr4M//zQJoanu1SP+87Dv1oQ==",
			"license": "MIT"
		},
		"node_modules/jsonfile": {
			"version": "6.2.1",
			"resolved": "https://registry.npmjs.org/jsonfile/-/jsonfile-6.2.1.tgz",
			"integrity": "sha512-zwOTdL3rFQ/lRdBnntKVOX6k5cKJwEc1HdilT71BWEu7J41gXIB2MRp+vxduPSwZJPWBxEzv4yH1wYLJGUHX4Q==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"universalify": "^2.0.0"
			},
			"optionalDependencies": {
				"graceful-fs": "^4.1.6"
			}
		},
		"node_modules/jsonparse": {
			"version": "1.3.1",
			"resolved": "https://registry.npmjs.org/jsonparse/-/jsonparse-1.3.1.tgz",
			"integrity": "sha512-POQXvpdL69+CluYsillJ7SUhKvytYjW9vG/GKpnf+xP8UWgYEM/RaMzHHofbALDiKbbP1W8UEYmgGl39WkPZsg==",
			"dev": true,
			"engines": [
				"node >= 0.2.0"
			],
			"license": "MIT"
		},
		"node_modules/keyv": {
			"version": "4.5.4",
			"resolved": "https://registry.npmjs.org/keyv/-/keyv-4.5.4.tgz",
			"integrity": "sha512-oxVHkHR/EJf2CNXnWxRLW6mg7JyCCUcG0DtEGmL2ctUo1PNTin1PUil+r/+4r5MpVgC/fn1kjsx7mjSujKqIpw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"json-buffer": "3.0.1"
			}
		},
		"node_modules/kind-of": {
			"version": "6.0.3",
			"resolved": "https://registry.npmjs.org/kind-of/-/kind-of-6.0.3.tgz",
			"integrity": "sha512-dcS1ul+9tmeD95T+x28/ehLgd9mENa3LsvDTtzm3vyBEO7RPptvAD+t44WVXaUjTBRcrpFeFlC8WCruUR456hw==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=0.10.0"
			}
		},
		"node_modules/launch-editor": {
			"version": "2.13.2",
			"resolved": "https://registry.npmjs.org/launch-editor/-/launch-editor-2.13.2.tgz",
			"integrity": "sha512-4VVDnbOpLXy/s8rdRCSXb+zfMeFR0WlJWpET1iA9CQdlZDfwyLjUuGQzXU4VeOoey6AicSAluWan7Etga6Kcmg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"picocolors": "^1.1.1",
				"shell-quote": "^1.8.3"
			}
		},
		"node_modules/less": {
			"version": "4.6.4",
			"resolved": "https://registry.npmjs.org/less/-/less-4.6.4.tgz",
			"integrity": "sha512-OJmO5+HxZLLw0RLzkqaNHzcgEAQG7C0y3aMbwtCzIUFZsLMNNq/1IdAdHEycQ58CwUO3jPTHmoN+tE5I7FQxNg==",
			"dev": true,
			"license": "Apache-2.0",
			"peer": true,
			"dependencies": {
				"copy-anything": "^3.0.5",
				"parse-node-version": "^1.0.1"
			},
			"bin": {
				"lessc": "bin/lessc"
			},
			"engines": {
				"node": ">=18"
			},
			"optionalDependencies": {
				"errno": "^0.1.1",
				"graceful-fs": "^4.1.2",
				"image-size": "~0.5.0",
				"make-dir": "^2.1.0",
				"mime": "^1.4.1",
				"needle": "^3.1.0",
				"source-map": "~0.6.0"
			}
		},
		"node_modules/less-loader": {
			"version": "12.3.2",
			"resolved": "https://registry.npmjs.org/less-loader/-/less-loader-12.3.2.tgz",
			"integrity": "sha512-uLV5c702ff2jBvO7qewpkLRzkh/I9QW07ur2NKkv8TVTrtX2lrKjEbEU/LLXAn7cgpCIBbkfyUm4qYXCQs5/+w==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 18.12.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/webpack"
			},
			"peerDependencies": {
				"@rspack/core": "0.x || ^1.0.0 || ^2.0.0-0",
				"less": "^3.5.0 || ^4.0.0",
				"webpack": "^5.0.0"
			},
			"peerDependenciesMeta": {
				"@rspack/core": {
					"optional": true
				},
				"webpack": {
					"optional": true
				}
			}
		},
		"node_modules/levn": {
			"version": "0.4.1",
			"resolved": "https://registry.npmjs.org/levn/-/levn-0.4.1.tgz",
			"integrity": "sha512-+bT2uH4E5LGE7h/n3evcS/sQlJXCpIp6ym8OWJ5eV6+67Dsql/LaaT7qJBAt2rzfoa/5QBGBhxDix1dMt2kQKQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"prelude-ls": "^1.2.1",
				"type-check": "~0.4.0"
			},
			"engines": {
				"node": ">= 0.8.0"
			}
		},
		"node_modules/license-webpack-plugin": {
			"version": "4.0.2",
			"resolved": "https://registry.npmjs.org/license-webpack-plugin/-/license-webpack-plugin-4.0.2.tgz",
			"integrity": "sha512-771TFWFD70G1wLTC4oU2Cw4qvtmNrIw+wRvBtn+okgHl7slJVi7zfNcdmqDL72BojM30VNJ2UHylr1o77U37Jw==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"webpack-sources": "^3.0.0"
			},
			"peerDependenciesMeta": {
				"webpack": {
					"optional": true
				},
				"webpack-sources": {
					"optional": true
				}
			}
		},
		"node_modules/lightningcss": {
			"version": "1.32.0",
			"resolved": "https://registry.npmjs.org/lightningcss/-/lightningcss-1.32.0.tgz",
			"integrity": "sha512-NXYBzinNrblfraPGyrbPoD19C1h9lfI/1mzgWYvXUTe414Gz/X1FD2XBZSZM7rRTrMA8JL3OtAaGifrIKhQ5yQ==",
			"dev": true,
			"license": "MPL-2.0",
			"dependencies": {
				"detect-libc": "^2.0.3"
			},
			"engines": {
				"node": ">= 12.0.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/parcel"
			},
			"optionalDependencies": {
				"lightningcss-android-arm64": "1.32.0",
				"lightningcss-darwin-arm64": "1.32.0",
				"lightningcss-darwin-x64": "1.32.0",
				"lightningcss-freebsd-x64": "1.32.0",
				"lightningcss-linux-arm-gnueabihf": "1.32.0",
				"lightningcss-linux-arm64-gnu": "1.32.0",
				"lightningcss-linux-arm64-musl": "1.32.0",
				"lightningcss-linux-x64-gnu": "1.32.0",
				"lightningcss-linux-x64-musl": "1.32.0",
				"lightningcss-win32-arm64-msvc": "1.32.0",
				"lightningcss-win32-x64-msvc": "1.32.0"
			}
		},
		"node_modules/lightningcss-android-arm64": {
			"version": "1.32.0",
			"resolved": "https://registry.npmjs.org/lightningcss-android-arm64/-/lightningcss-android-arm64-1.32.0.tgz",
			"integrity": "sha512-YK7/ClTt4kAK0vo6w3X+Pnm0D2cf2vPHbhOXdoNti1Ga0al1P4TBZhwjATvjNwLEBCnKvjJc2jQgHXH0NEwlAg==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MPL-2.0",
			"optional": true,
			"os": [
				"android"
			],
			"engines": {
				"node": ">= 12.0.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/parcel"
			}
		},
		"node_modules/lightningcss-darwin-arm64": {
			"version": "1.32.0",
			"resolved": "https://registry.npmjs.org/lightningcss-darwin-arm64/-/lightningcss-darwin-arm64-1.32.0.tgz",
			"integrity": "sha512-RzeG9Ju5bag2Bv1/lwlVJvBE3q6TtXskdZLLCyfg5pt+HLz9BqlICO7LZM7VHNTTn/5PRhHFBSjk5lc4cmscPQ==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MPL-2.0",
			"optional": true,
			"os": [
				"darwin"
			],
			"engines": {
				"node": ">= 12.0.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/parcel"
			}
		},
		"node_modules/lightningcss-darwin-x64": {
			"version": "1.32.0",
			"resolved": "https://registry.npmjs.org/lightningcss-darwin-x64/-/lightningcss-darwin-x64-1.32.0.tgz",
			"integrity": "sha512-U+QsBp2m/s2wqpUYT/6wnlagdZbtZdndSmut/NJqlCcMLTWp5muCrID+K5UJ6jqD2BFshejCYXniPDbNh73V8w==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MPL-2.0",
			"optional": true,
			"os": [
				"darwin"
			],
			"engines": {
				"node": ">= 12.0.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/parcel"
			}
		},
		"node_modules/lightningcss-freebsd-x64": {
			"version": "1.32.0",
			"resolved": "https://registry.npmjs.org/lightningcss-freebsd-x64/-/lightningcss-freebsd-x64-1.32.0.tgz",
			"integrity": "sha512-JCTigedEksZk3tHTTthnMdVfGf61Fky8Ji2E4YjUTEQX14xiy/lTzXnu1vwiZe3bYe0q+SpsSH/CTeDXK6WHig==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MPL-2.0",
			"optional": true,
			"os": [
				"freebsd"
			],
			"engines": {
				"node": ">= 12.0.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/parcel"
			}
		},
		"node_modules/lightningcss-linux-arm-gnueabihf": {
			"version": "1.32.0",
			"resolved": "https://registry.npmjs.org/lightningcss-linux-arm-gnueabihf/-/lightningcss-linux-arm-gnueabihf-1.32.0.tgz",
			"integrity": "sha512-x6rnnpRa2GL0zQOkt6rts3YDPzduLpWvwAF6EMhXFVZXD4tPrBkEFqzGowzCsIWsPjqSK+tyNEODUBXeeVHSkw==",
			"cpu": [
				"arm"
			],
			"dev": true,
			"license": "MPL-2.0",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">= 12.0.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/parcel"
			}
		},
		"node_modules/lightningcss-linux-arm64-gnu": {
			"version": "1.32.0",
			"resolved": "https://registry.npmjs.org/lightningcss-linux-arm64-gnu/-/lightningcss-linux-arm64-gnu-1.32.0.tgz",
			"integrity": "sha512-0nnMyoyOLRJXfbMOilaSRcLH3Jw5z9HDNGfT/gwCPgaDjnx0i8w7vBzFLFR1f6CMLKF8gVbebmkUN3fa/kQJpQ==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MPL-2.0",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">= 12.0.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/parcel"
			}
		},
		"node_modules/lightningcss-linux-arm64-musl": {
			"version": "1.32.0",
			"resolved": "https://registry.npmjs.org/lightningcss-linux-arm64-musl/-/lightningcss-linux-arm64-musl-1.32.0.tgz",
			"integrity": "sha512-UpQkoenr4UJEzgVIYpI80lDFvRmPVg6oqboNHfoH4CQIfNA+HOrZ7Mo7KZP02dC6LjghPQJeBsvXhJod/wnIBg==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MPL-2.0",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">= 12.0.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/parcel"
			}
		},
		"node_modules/lightningcss-linux-x64-gnu": {
			"version": "1.32.0",
			"resolved": "https://registry.npmjs.org/lightningcss-linux-x64-gnu/-/lightningcss-linux-x64-gnu-1.32.0.tgz",
			"integrity": "sha512-V7Qr52IhZmdKPVr+Vtw8o+WLsQJYCTd8loIfpDaMRWGUZfBOYEJeyJIkqGIDMZPwPx24pUMfwSxxI8phr/MbOA==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MPL-2.0",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">= 12.0.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/parcel"
			}
		},
		"node_modules/lightningcss-linux-x64-musl": {
			"version": "1.32.0",
			"resolved": "https://registry.npmjs.org/lightningcss-linux-x64-musl/-/lightningcss-linux-x64-musl-1.32.0.tgz",
			"integrity": "sha512-bYcLp+Vb0awsiXg/80uCRezCYHNg1/l3mt0gzHnWV9XP1W5sKa5/TCdGWaR/zBM2PeF/HbsQv/j2URNOiVuxWg==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MPL-2.0",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">= 12.0.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/parcel"
			}
		},
		"node_modules/lightningcss-win32-arm64-msvc": {
			"version": "1.32.0",
			"resolved": "https://registry.npmjs.org/lightningcss-win32-arm64-msvc/-/lightningcss-win32-arm64-msvc-1.32.0.tgz",
			"integrity": "sha512-8SbC8BR40pS6baCM8sbtYDSwEVQd4JlFTOlaD3gWGHfThTcABnNDBda6eTZeqbofalIJhFx0qKzgHJmcPTnGdw==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MPL-2.0",
			"optional": true,
			"os": [
				"win32"
			],
			"engines": {
				"node": ">= 12.0.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/parcel"
			}
		},
		"node_modules/lightningcss-win32-x64-msvc": {
			"version": "1.32.0",
			"resolved": "https://registry.npmjs.org/lightningcss-win32-x64-msvc/-/lightningcss-win32-x64-msvc-1.32.0.tgz",
			"integrity": "sha512-Amq9B/SoZYdDi1kFrojnoqPLxYhQ4Wo5XiL8EVJrVsB8ARoC1PWW6VGtT0WKCemjy8aC+louJnjS7U18x3b06Q==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MPL-2.0",
			"optional": true,
			"os": [
				"win32"
			],
			"engines": {
				"node": ">= 12.0.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/parcel"
			}
		},
		"node_modules/lilconfig": {
			"version": "3.1.3",
			"resolved": "https://registry.npmjs.org/lilconfig/-/lilconfig-3.1.3.tgz",
			"integrity": "sha512-/vlFKAoH5Cgt3Ie+JLhRbwOsCQePABiU3tJ1egGvyQ+33R/vcwM2Zl2QR/LzjsBeItPt3oSVXapn+m4nQDvpzw==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=14"
			},
			"funding": {
				"url": "https://github.com/sponsors/antonk52"
			}
		},
		"node_modules/lines-and-columns": {
			"version": "2.0.3",
			"resolved": "https://registry.npmjs.org/lines-and-columns/-/lines-and-columns-2.0.3.tgz",
			"integrity": "sha512-cNOjgCnLB+FnvWWtyRTzmB3POJ+cXxTA81LoW7u8JdmhfXzriropYwpjShnz1QLLWsQwY7nIxoDmcPTwphDK9w==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": "^12.20.0 || ^14.13.1 || >=16.0.0"
			}
		},
		"node_modules/listr2": {
			"version": "9.0.5",
			"resolved": "https://registry.npmjs.org/listr2/-/listr2-9.0.5.tgz",
			"integrity": "sha512-ME4Fb83LgEgwNw96RKNvKV4VTLuXfoKudAmm2lP8Kk87KaMK0/Xrx/aAkMWmT8mDb+3MlFDspfbCs7adjRxA2g==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"cli-truncate": "^5.0.0",
				"colorette": "^2.0.20",
				"eventemitter3": "^5.0.1",
				"log-update": "^6.1.0",
				"rfdc": "^1.4.1",
				"wrap-ansi": "^9.0.0"
			},
			"engines": {
				"node": ">=20.0.0"
			}
		},
		"node_modules/listr2/node_modules/string-width": {
			"version": "7.2.0",
			"resolved": "https://registry.npmjs.org/string-width/-/string-width-7.2.0.tgz",
			"integrity": "sha512-tsaTIkKW9b4N+AEj+SVA+WhJzV7/zMhcSu78mLKWSk7cXMOSHsBKFWUs0fWwq8QyK3MgJBQRX6Gbi4kYbdvGkQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"emoji-regex": "^10.3.0",
				"get-east-asian-width": "^1.0.0",
				"strip-ansi": "^7.1.0"
			},
			"engines": {
				"node": ">=18"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/listr2/node_modules/wrap-ansi": {
			"version": "9.0.2",
			"resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-9.0.2.tgz",
			"integrity": "sha512-42AtmgqjV+X1VpdOfyTGOYRi0/zsoLqtXQckTmqTeybT+BDIbM/Guxo7x3pE2vtpr1ok6xRqM9OpBe+Jyoqyww==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ansi-styles": "^6.2.1",
				"string-width": "^7.0.0",
				"strip-ansi": "^7.1.0"
			},
			"engines": {
				"node": ">=18"
			},
			"funding": {
				"url": "https://github.com/chalk/wrap-ansi?sponsor=1"
			}
		},
		"node_modules/lmdb": {
			"version": "3.5.1",
			"resolved": "https://registry.npmjs.org/lmdb/-/lmdb-3.5.1.tgz",
			"integrity": "sha512-NYHA0MRPjvNX+vSw8Xxg6FLKxzAG+e7Pt8RqAQA/EehzHVXq9SxDqJIN3JL1hK0dweb884y8kIh6rkWvPyg9Wg==",
			"dev": true,
			"hasInstallScript": true,
			"license": "MIT",
			"optional": true,
			"dependencies": {
				"@harperfast/extended-iterable": "^1.0.3",
				"msgpackr": "^1.11.2",
				"node-addon-api": "^6.1.0",
				"node-gyp-build-optional-packages": "5.2.2",
				"ordered-binary": "^1.5.3",
				"weak-lru-cache": "^1.2.2"
			},
			"bin": {
				"download-lmdb-prebuilds": "bin/download-prebuilds.js"
			},
			"optionalDependencies": {
				"@lmdb/lmdb-darwin-arm64": "3.5.1",
				"@lmdb/lmdb-darwin-x64": "3.5.1",
				"@lmdb/lmdb-linux-arm": "3.5.1",
				"@lmdb/lmdb-linux-arm64": "3.5.1",
				"@lmdb/lmdb-linux-x64": "3.5.1",
				"@lmdb/lmdb-win32-arm64": "3.5.1",
				"@lmdb/lmdb-win32-x64": "3.5.1"
			}
		},
		"node_modules/loader-runner": {
			"version": "4.3.1",
			"resolved": "https://registry.npmjs.org/loader-runner/-/loader-runner-4.3.1.tgz",
			"integrity": "sha512-IWqP2SCPhyVFTBtRcgMHdzlf9ul25NwaFx4wCEH/KjAXuuHY4yNjvPXsBokp8jCB936PyWRaPKUNh8NvylLp2Q==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=6.11.5"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/webpack"
			}
		},
		"node_modules/loader-utils": {
			"version": "2.0.4",
			"resolved": "https://registry.npmjs.org/loader-utils/-/loader-utils-2.0.4.tgz",
			"integrity": "sha512-xXqpXoINfFhgua9xiqD8fPFHgkoq1mmmpE92WlDbm9rNRd/EbRb+Gqf908T2DMfuHjjJlksiK2RbHVOdD/MqSw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"big.js": "^5.2.2",
				"emojis-list": "^3.0.0",
				"json5": "^2.1.2"
			},
			"engines": {
				"node": ">=8.9.0"
			}
		},
		"node_modules/locate-path": {
			"version": "6.0.0",
			"resolved": "https://registry.npmjs.org/locate-path/-/locate-path-6.0.0.tgz",
			"integrity": "sha512-iPZK6eYjbxRu3uB4/WZ3EsEIMJFMqAoopl3R+zuq0UjcAm/MO6KCweDgPfP3elTztoKP3KtnVHxTn2NHBSDVUw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"p-locate": "^5.0.0"
			},
			"engines": {
				"node": ">=10"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/lodash.debounce": {
			"version": "4.0.8",
			"resolved": "https://registry.npmjs.org/lodash.debounce/-/lodash.debounce-4.0.8.tgz",
			"integrity": "sha512-FT1yDzDYEoYWhnSGnpE/4Kj1fLZkDFyqRb7fNt6FdYOSxlUWAtp42Eh6Wb0rGIv/m9Bgo7x4GhQbm5Ys4SG5ow==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/lodash.memoize": {
			"version": "4.1.2",
			"resolved": "https://registry.npmjs.org/lodash.memoize/-/lodash.memoize-4.1.2.tgz",
			"integrity": "sha512-t7j+NzmgnQzTAYXcsHYLgimltOV1MXHtlOWf6GjL9Kj8GK5FInw5JotxvbOs+IvV1/Dzo04/fCGfLVs7aXb4Ag==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/lodash.uniq": {
			"version": "4.5.0",
			"resolved": "https://registry.npmjs.org/lodash.uniq/-/lodash.uniq-4.5.0.tgz",
			"integrity": "sha512-xfBaXQd9ryd9dlSDvnvI0lvxfLJlYAZzXomUYzLKtUeOQvOP5piqAWuGtrhWeqaXK9hhoM/iyJc5AV+XfsX3HQ==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/log-symbols": {
			"version": "7.0.1",
			"resolved": "https://registry.npmjs.org/log-symbols/-/log-symbols-7.0.1.tgz",
			"integrity": "sha512-ja1E3yCr9i/0hmBVaM0bfwDjnGy8I/s6PP4DFp+yP+a+mrHO4Rm7DtmnqROTUkHIkqffC84YY7AeqX6oFk0WFg==",
			"license": "MIT",
			"dependencies": {
				"is-unicode-supported": "^2.0.0",
				"yoctocolors": "^2.1.1"
			},
			"engines": {
				"node": ">=18"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/log-update": {
			"version": "6.1.0",
			"resolved": "https://registry.npmjs.org/log-update/-/log-update-6.1.0.tgz",
			"integrity": "sha512-9ie8ItPR6tjY5uYJh8K/Zrv/RMZ5VOlOWvtZdEHYSTFKZfIBPQa9tOAEeAWhd+AnIneLJ22w5fjOYtoutpWq5w==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ansi-escapes": "^7.0.0",
				"cli-cursor": "^5.0.0",
				"slice-ansi": "^7.1.0",
				"strip-ansi": "^7.1.0",
				"wrap-ansi": "^9.0.0"
			},
			"engines": {
				"node": ">=18"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/log-update/node_modules/slice-ansi": {
			"version": "7.1.2",
			"resolved": "https://registry.npmjs.org/slice-ansi/-/slice-ansi-7.1.2.tgz",
			"integrity": "sha512-iOBWFgUX7caIZiuutICxVgX1SdxwAVFFKwt1EvMYYec/NWO5meOJ6K5uQxhrYBdQJne4KxiqZc+KptFOWFSI9w==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ansi-styles": "^6.2.1",
				"is-fullwidth-code-point": "^5.0.0"
			},
			"engines": {
				"node": ">=18"
			},
			"funding": {
				"url": "https://github.com/chalk/slice-ansi?sponsor=1"
			}
		},
		"node_modules/log-update/node_modules/string-width": {
			"version": "7.2.0",
			"resolved": "https://registry.npmjs.org/string-width/-/string-width-7.2.0.tgz",
			"integrity": "sha512-tsaTIkKW9b4N+AEj+SVA+WhJzV7/zMhcSu78mLKWSk7cXMOSHsBKFWUs0fWwq8QyK3MgJBQRX6Gbi4kYbdvGkQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"emoji-regex": "^10.3.0",
				"get-east-asian-width": "^1.0.0",
				"strip-ansi": "^7.1.0"
			},
			"engines": {
				"node": ">=18"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/log-update/node_modules/wrap-ansi": {
			"version": "9.0.2",
			"resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-9.0.2.tgz",
			"integrity": "sha512-42AtmgqjV+X1VpdOfyTGOYRi0/zsoLqtXQckTmqTeybT+BDIbM/Guxo7x3pE2vtpr1ok6xRqM9OpBe+Jyoqyww==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ansi-styles": "^6.2.1",
				"string-width": "^7.0.0",
				"strip-ansi": "^7.1.0"
			},
			"engines": {
				"node": ">=18"
			},
			"funding": {
				"url": "https://github.com/chalk/wrap-ansi?sponsor=1"
			}
		},
		"node_modules/long-timeout": {
			"version": "0.1.1",
			"resolved": "https://registry.npmjs.org/long-timeout/-/long-timeout-0.1.1.tgz",
			"integrity": "sha512-BFRuQUqc7x2NWxfJBCyUrN8iYUYznzL9JROmRz1gZ6KlOIgmoD+njPVbb+VNn2nGMKggMsK79iUNErillsrx7w==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/lru-cache": {
			"version": "5.1.1",
			"resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-5.1.1.tgz",
			"integrity": "sha512-KpNARQA3Iwv+jTA0utUVVbrh+Jlrr1Fv0e56GGzAFOXN7dk/FviaDW8LHmK52DlcH4WP2n6gI8vN1aesBFgo9w==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"yallist": "^3.0.2"
			}
		},
		"node_modules/luxon": {
			"version": "3.7.2",
			"resolved": "https://registry.npmjs.org/luxon/-/luxon-3.7.2.tgz",
			"integrity": "sha512-vtEhXh/gNjI9Yg1u4jX/0YVPMvxzHuGgCm6tC5kZyb08yjGWGnqAjGJvcXbqQR2P3MyMEFnRbpcdFS6PBcLqew==",
			"devOptional": true,
			"license": "MIT",
			"engines": {
				"node": ">=12"
			}
		},
		"node_modules/magic-string": {
			"version": "0.30.21",
			"resolved": "https://registry.npmjs.org/magic-string/-/magic-string-0.30.21.tgz",
			"integrity": "sha512-vd2F4YUyEXKGcLHoq+TEyCjxueSeHnFxyyjNp80yg0XV4vUhnDer/lvvlqM/arB5bXQN5K2/3oinyCRyx8T2CQ==",
			"license": "MIT",
			"dependencies": {
				"@jridgewell/sourcemap-codec": "^1.5.5"
			}
		},
		"node_modules/make-dir": {
			"version": "2.1.0",
			"resolved": "https://registry.npmjs.org/make-dir/-/make-dir-2.1.0.tgz",
			"integrity": "sha512-LS9X+dc8KLxXCb8dni79fLIIUA5VyZoyjSMCwTluaXA0o27cCK0bhXkpgw+sTXVpPy/lSO57ilRixqk0vDmtRA==",
			"dev": true,
			"license": "MIT",
			"optional": true,
			"dependencies": {
				"pify": "^4.0.1",
				"semver": "^5.6.0"
			},
			"engines": {
				"node": ">=6"
			}
		},
		"node_modules/make-dir/node_modules/semver": {
			"version": "5.7.2",
			"resolved": "https://registry.npmjs.org/semver/-/semver-5.7.2.tgz",
			"integrity": "sha512-cBznnQ9KjJqU67B52RMC65CMarK2600WFnbkcaiwWq3xy/5haFJlshgnpjovMVJ+Hff49d8GEn0b87C5pDQ10g==",
			"dev": true,
			"license": "ISC",
			"optional": true,
			"bin": {
				"semver": "bin/semver"
			}
		},
		"node_modules/make-fetch-happen": {
			"version": "15.0.5",
			"resolved": "https://registry.npmjs.org/make-fetch-happen/-/make-fetch-happen-15.0.5.tgz",
			"integrity": "sha512-uCbIa8jWWmQZt4dSnEStkVC6gdakiinAm4PiGsywIkguF0eWMdcjDz0ECYhUolFU3pFLOev9VNPCEygydXnddg==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"@gar/promise-retry": "^1.0.0",
				"@npmcli/agent": "^4.0.0",
				"@npmcli/redact": "^4.0.0",
				"cacache": "^20.0.1",
				"http-cache-semantics": "^4.1.1",
				"minipass": "^7.0.2",
				"minipass-fetch": "^5.0.0",
				"minipass-flush": "^1.0.5",
				"minipass-pipeline": "^1.2.4",
				"negotiator": "^1.0.0",
				"proc-log": "^6.0.0",
				"ssri": "^13.0.0"
			},
			"engines": {
				"node": "^20.17.0 || >=22.9.0"
			}
		},
		"node_modules/math-intrinsics": {
			"version": "1.1.0",
			"resolved": "https://registry.npmjs.org/math-intrinsics/-/math-intrinsics-1.1.0.tgz",
			"integrity": "sha512-/IXtbwEk5HTPyEwyKX6hGkYXxM9nbj64B+ilVJnC/R6B0pH5G4V3b0pVbL7DBj4tkhBAppbQUlf6F6Xl9LHu1g==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.4"
			}
		},
		"node_modules/mdn-data": {
			"version": "2.27.1",
			"resolved": "https://registry.npmjs.org/mdn-data/-/mdn-data-2.27.1.tgz",
			"integrity": "sha512-9Yubnt3e8A0OKwxYSXyhLymGW4sCufcLG6VdiDdUGVkPhpqLxlvP5vl1983gQjJl3tqbrM731mjaZaP68AgosQ==",
			"dev": true,
			"license": "CC0-1.0"
		},
		"node_modules/media-typer": {
			"version": "1.1.0",
			"resolved": "https://registry.npmjs.org/media-typer/-/media-typer-1.1.0.tgz",
			"integrity": "sha512-aisnrDP4GNe06UcKFnV5bfMNPBUw4jsLGaWwWfnH3v02GnBuXX2MCVn5RbrWo0j3pczUilYblq7fQ7Nw2t5XKw==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.8"
			}
		},
		"node_modules/memfs": {
			"version": "3.5.3",
			"resolved": "https://registry.npmjs.org/memfs/-/memfs-3.5.3.tgz",
			"integrity": "sha512-UERzLsxzllchadvbPs5aolHh65ISpKpM+ccLbOJ8/vvpBKmAWf+la7dXFy7Mr0ySHbdHrFv5kGFCUHHe6GFEmw==",
			"dev": true,
			"license": "Unlicense",
			"dependencies": {
				"fs-monkey": "^1.0.4"
			},
			"engines": {
				"node": ">= 4.0.0"
			}
		},
		"node_modules/merge-descriptors": {
			"version": "2.0.0",
			"resolved": "https://registry.npmjs.org/merge-descriptors/-/merge-descriptors-2.0.0.tgz",
			"integrity": "sha512-Snk314V5ayFLhp3fkUREub6WtjBfPdCPY1Ln8/8munuLuiYhsABgBVWsozAG+MWMbVEvcdcpbi9R7ww22l9Q3g==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=18"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/merge-stream": {
			"version": "2.0.0",
			"resolved": "https://registry.npmjs.org/merge-stream/-/merge-stream-2.0.0.tgz",
			"integrity": "sha512-abv/qOcuPfk3URPfDzmZU1LKmuw8kT+0nIHvKrKgFrwifol/doWcdA4ZqsWQ8ENrFKkd67Mfpo/LovbIUsbt3w==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/merge2": {
			"version": "1.4.1",
			"resolved": "https://registry.npmjs.org/merge2/-/merge2-1.4.1.tgz",
			"integrity": "sha512-8q7VEgMJW4J8tcfVPy8g09NcQwZdbwFEqhe/WZkoIzjn/3TGDwtOCYtXGxA3O8tPzpczCCDgv+P2P5y00ZJOOg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 8"
			}
		},
		"node_modules/methods": {
			"version": "1.1.2",
			"resolved": "https://registry.npmjs.org/methods/-/methods-1.1.2.tgz",
			"integrity": "sha512-iclAHeNqNm68zFtnZ0e+1L2yUIdvzNoauKU4WBA3VvH/vPFieF7qfRlwUZU+DA9P9bPXIS90ulxoUoCH23sV2w==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/micromatch": {
			"version": "4.0.8",
			"resolved": "https://registry.npmjs.org/micromatch/-/micromatch-4.0.8.tgz",
			"integrity": "sha512-PXwfBhYu0hBCPw8Dn0E+WDYb7af3dSLVWKi3HGv84IdF4TyFoC0ysxFd0Goxw7nSv4T/PzEJQxsYsEiFCKo2BA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"braces": "^3.0.3",
				"picomatch": "^2.3.1"
			},
			"engines": {
				"node": ">=8.6"
			}
		},
		"node_modules/micromatch/node_modules/picomatch": {
			"version": "2.3.2",
			"resolved": "https://registry.npmjs.org/picomatch/-/picomatch-2.3.2.tgz",
			"integrity": "sha512-V7+vQEJ06Z+c5tSye8S+nHUfI51xoXIXjHQ99cQtKUkQqqO1kO/KCJUfZXuB47h/YBlDhah2H3hdUGXn8ie0oA==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=8.6"
			},
			"funding": {
				"url": "https://github.com/sponsors/jonschlinkert"
			}
		},
		"node_modules/mime": {
			"version": "1.6.0",
			"resolved": "https://registry.npmjs.org/mime/-/mime-1.6.0.tgz",
			"integrity": "sha512-x0Vn8spI+wuJ1O6S7gnbaQg8Pxh4NNHb7KSINmEWKiPE4RKOplvijn+NkmYmmRgP68mc70j2EbeTFRsrswaQeg==",
			"dev": true,
			"license": "MIT",
			"bin": {
				"mime": "cli.js"
			},
			"engines": {
				"node": ">=4"
			}
		},
		"node_modules/mime-db": {
			"version": "1.54.0",
			"resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.54.0.tgz",
			"integrity": "sha512-aU5EJuIN2WDemCcAp2vFBfp/m4EAhWJnUNSSw0ixs7/kXbd6Pg64EmwJkNdFhB8aWt1sH2CTXrLxo/iAGV3oPQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/mime-types": {
			"version": "3.0.2",
			"resolved": "https://registry.npmjs.org/mime-types/-/mime-types-3.0.2.tgz",
			"integrity": "sha512-Lbgzdk0h4juoQ9fCKXW4by0UJqj+nOOrI9MJ1sSj4nI8aI2eo1qmvQEie4VD1glsS250n15LsWsYtCugiStS5A==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"mime-db": "^1.54.0"
			},
			"engines": {
				"node": ">=18"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/express"
			}
		},
		"node_modules/mimic-fn": {
			"version": "2.1.0",
			"resolved": "https://registry.npmjs.org/mimic-fn/-/mimic-fn-2.1.0.tgz",
			"integrity": "sha512-OqbOk5oEQeAZ8WXWydlu9HJjz9WVdEIvamMCcXmuqUYjTknH/sqsWvhQ3vgwKFRR1HpjvNBKQ37nbJgYzGqGcg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=6"
			}
		},
		"node_modules/mimic-function": {
			"version": "5.0.1",
			"resolved": "https://registry.npmjs.org/mimic-function/-/mimic-function-5.0.1.tgz",
			"integrity": "sha512-VP79XUPxV2CigYP3jWwAUFSku2aKqBH7uTAapFWCBqutsbmDo96KY5o8uh6U+/YSIn5OxJnXp73beVkpqMIGhA==",
			"license": "MIT",
			"engines": {
				"node": ">=18"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/mini-css-extract-plugin": {
			"version": "2.4.7",
			"resolved": "https://registry.npmjs.org/mini-css-extract-plugin/-/mini-css-extract-plugin-2.4.7.tgz",
			"integrity": "sha512-euWmddf0sk9Nv1O0gfeeUAvAkoSlWncNLF77C0TP2+WoPvy8mAHKOzMajcCz2dzvyt3CNgxb1obIEVFIRxaipg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"schema-utils": "^4.0.0"
			},
			"engines": {
				"node": ">= 12.13.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/webpack"
			},
			"peerDependencies": {
				"webpack": "^5.0.0"
			}
		},
		"node_modules/minimalistic-assert": {
			"version": "1.0.1",
			"resolved": "https://registry.npmjs.org/minimalistic-assert/-/minimalistic-assert-1.0.1.tgz",
			"integrity": "sha512-UtJcAD4yEaGtjPezWuO9wC4nwUnVH/8/Im3yEHQP4b67cXlD/Qr9hdITCU1xDbSEXg2XKNaP8jsReV7vQd00/A==",
			"dev": true,
			"license": "ISC"
		},
		"node_modules/minimatch": {
			"version": "10.2.5",
			"resolved": "https://registry.npmjs.org/minimatch/-/minimatch-10.2.5.tgz",
			"integrity": "sha512-MULkVLfKGYDFYejP07QOurDLLQpcjk7Fw+7jXS2R2czRQzR56yHRveU5NDJEOviH+hETZKSkIk5c+T23GjFUMg==",
			"dev": true,
			"license": "BlueOak-1.0.0",
			"dependencies": {
				"brace-expansion": "^5.0.5"
			},
			"engines": {
				"node": "18 || 20 || >=22"
			},
			"funding": {
				"url": "https://github.com/sponsors/isaacs"
			}
		},
		"node_modules/minimist": {
			"version": "1.2.8",
			"resolved": "https://registry.npmjs.org/minimist/-/minimist-1.2.8.tgz",
			"integrity": "sha512-2yyAR8qBkN3YuheJanUpWC5U3bb5osDywNB8RzDVlDwDHbocAJveqqj1u8+SVD7jkWT4yvsHCpWqqWqAxb0zCA==",
			"dev": true,
			"license": "MIT",
			"funding": {
				"url": "https://github.com/sponsors/ljharb"
			}
		},
		"node_modules/minipass": {
			"version": "7.1.3",
			"resolved": "https://registry.npmjs.org/minipass/-/minipass-7.1.3.tgz",
			"integrity": "sha512-tEBHqDnIoM/1rXME1zgka9g6Q2lcoCkxHLuc7ODJ5BxbP5d4c2Z5cGgtXAku59200Cx7diuHTOYfSBD8n6mm8A==",
			"dev": true,
			"license": "BlueOak-1.0.0",
			"engines": {
				"node": ">=16 || 14 >=14.17"
			}
		},
		"node_modules/minipass-collect": {
			"version": "2.0.1",
			"resolved": "https://registry.npmjs.org/minipass-collect/-/minipass-collect-2.0.1.tgz",
			"integrity": "sha512-D7V8PO9oaz7PWGLbCACuI1qEOsq7UKfLotx/C0Aet43fCUB/wfQ7DYeq2oR/svFJGYDHPr38SHATeaj/ZoKHKw==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"minipass": "^7.0.3"
			},
			"engines": {
				"node": ">=16 || 14 >=14.17"
			}
		},
		"node_modules/minipass-fetch": {
			"version": "5.0.2",
			"resolved": "https://registry.npmjs.org/minipass-fetch/-/minipass-fetch-5.0.2.tgz",
			"integrity": "sha512-2d0q2a8eCi2IRg/IGubCNRJoYbA1+YPXAzQVRFmB45gdGZafyivnZ5YSEfo3JikbjGxOdntGFvBQGqaSMXlAFQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"minipass": "^7.0.3",
				"minipass-sized": "^2.0.0",
				"minizlib": "^3.0.1"
			},
			"engines": {
				"node": "^20.17.0 || >=22.9.0"
			},
			"optionalDependencies": {
				"iconv-lite": "^0.7.2"
			}
		},
		"node_modules/minipass-flush": {
			"version": "1.0.7",
			"resolved": "https://registry.npmjs.org/minipass-flush/-/minipass-flush-1.0.7.tgz",
			"integrity": "sha512-TbqTz9cUwWyHS2Dy89P3ocAGUGxKjjLuR9z8w4WUTGAVgEj17/4nhgo2Du56i0Fm3Pm30g4iA8Lcqctc76jCzA==",
			"dev": true,
			"license": "BlueOak-1.0.0",
			"dependencies": {
				"minipass": "^3.0.0"
			},
			"engines": {
				"node": ">= 8"
			}
		},
		"node_modules/minipass-flush/node_modules/minipass": {
			"version": "3.3.6",
			"resolved": "https://registry.npmjs.org/minipass/-/minipass-3.3.6.tgz",
			"integrity": "sha512-DxiNidxSEK+tHG6zOIklvNOwm3hvCrbUrdtzY74U6HKTJxvIDfOUL5W5P2Ghd3DTkhhKPYGqeNUIh5qcM4YBfw==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"yallist": "^4.0.0"
			},
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/minipass-flush/node_modules/yallist": {
			"version": "4.0.0",
			"resolved": "https://registry.npmjs.org/yallist/-/yallist-4.0.0.tgz",
			"integrity": "sha512-3wdGidZyq5PB084XLES5TpOSRA3wjXAlIWMhum2kRcv/41Sn2emQ0dycQW4uZXLejwKvg6EsvbdlVL+FYEct7A==",
			"dev": true,
			"license": "ISC"
		},
		"node_modules/minipass-pipeline": {
			"version": "1.2.4",
			"resolved": "https://registry.npmjs.org/minipass-pipeline/-/minipass-pipeline-1.2.4.tgz",
			"integrity": "sha512-xuIq7cIOt09RPRJ19gdi4b+RiNvDFYe5JH+ggNvBqGqpQXcru3PcRmOZuHBKWK1Txf9+cQ+HMVN4d6z46LZP7A==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"minipass": "^3.0.0"
			},
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/minipass-pipeline/node_modules/minipass": {
			"version": "3.3.6",
			"resolved": "https://registry.npmjs.org/minipass/-/minipass-3.3.6.tgz",
			"integrity": "sha512-DxiNidxSEK+tHG6zOIklvNOwm3hvCrbUrdtzY74U6HKTJxvIDfOUL5W5P2Ghd3DTkhhKPYGqeNUIh5qcM4YBfw==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"yallist": "^4.0.0"
			},
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/minipass-pipeline/node_modules/yallist": {
			"version": "4.0.0",
			"resolved": "https://registry.npmjs.org/yallist/-/yallist-4.0.0.tgz",
			"integrity": "sha512-3wdGidZyq5PB084XLES5TpOSRA3wjXAlIWMhum2kRcv/41Sn2emQ0dycQW4uZXLejwKvg6EsvbdlVL+FYEct7A==",
			"dev": true,
			"license": "ISC"
		},
		"node_modules/minipass-sized": {
			"version": "2.0.0",
			"resolved": "https://registry.npmjs.org/minipass-sized/-/minipass-sized-2.0.0.tgz",
			"integrity": "sha512-zSsHhto5BcUVM2m1LurnXY6M//cGhVaegT71OfOXoprxT6o780GZd792ea6FfrQkuU4usHZIUczAQMRUE2plzA==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"minipass": "^7.1.2"
			},
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/minizlib": {
			"version": "3.1.0",
			"resolved": "https://registry.npmjs.org/minizlib/-/minizlib-3.1.0.tgz",
			"integrity": "sha512-KZxYo1BUkWD2TVFLr0MQoM8vUUigWD3LlD83a/75BqC+4qE0Hb1Vo5v1FgcfaNXvfXzr+5EhQ6ing/CaBijTlw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"minipass": "^7.1.2"
			},
			"engines": {
				"node": ">= 18"
			}
		},
		"node_modules/mrmime": {
			"version": "2.0.1",
			"resolved": "https://registry.npmjs.org/mrmime/-/mrmime-2.0.1.tgz",
			"integrity": "sha512-Y3wQdFg2Va6etvQ5I82yUhGdsKrcYox6p7FfL1LbK2J4V01F9TGlepTIhnK24t7koZibmg82KGglhA1XK5IsLQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=10"
			}
		},
		"node_modules/ms": {
			"version": "2.1.3",
			"resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
			"integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/msgpackr": {
			"version": "1.11.9",
			"resolved": "https://registry.npmjs.org/msgpackr/-/msgpackr-1.11.9.tgz",
			"integrity": "sha512-FkoAAyyA6HM8wL882EcEyFZ9s7hVADSwG9xrVx3dxxNQAtgADTrJoEWivID82Iv1zWDsv/OtbrrcZAzGzOMdNw==",
			"dev": true,
			"license": "MIT",
			"optional": true,
			"optionalDependencies": {
				"msgpackr-extract": "^3.0.2"
			}
		},
		"node_modules/msgpackr-extract": {
			"version": "3.0.3",
			"resolved": "https://registry.npmjs.org/msgpackr-extract/-/msgpackr-extract-3.0.3.tgz",
			"integrity": "sha512-P0efT1C9jIdVRefqjzOQ9Xml57zpOXnIuS+csaB4MdZbTdmGDLo8XhzBG1N7aO11gKDDkJvBLULeFTo46wwreA==",
			"dev": true,
			"hasInstallScript": true,
			"license": "MIT",
			"optional": true,
			"dependencies": {
				"node-gyp-build-optional-packages": "5.2.2"
			},
			"bin": {
				"download-msgpackr-prebuilds": "bin/download-prebuilds.js"
			},
			"optionalDependencies": {
				"@msgpackr-extract/msgpackr-extract-darwin-arm64": "3.0.3",
				"@msgpackr-extract/msgpackr-extract-darwin-x64": "3.0.3",
				"@msgpackr-extract/msgpackr-extract-linux-arm": "3.0.3",
				"@msgpackr-extract/msgpackr-extract-linux-arm64": "3.0.3",
				"@msgpackr-extract/msgpackr-extract-linux-x64": "3.0.3",
				"@msgpackr-extract/msgpackr-extract-win32-x64": "3.0.3"
			}
		},
		"node_modules/msw": {
			"version": "2.12.14",
			"resolved": "https://registry.npmjs.org/msw/-/msw-2.12.14.tgz",
			"integrity": "sha512-4KXa4nVBIBjbDbd7vfQNuQ25eFxug0aropCQFoI0JdOBuJWamkT1yLVIWReFI8SiTRc+H1hKzaNk+cLk2N9rtQ==",
			"dev": true,
			"hasInstallScript": true,
			"license": "MIT",
			"dependencies": {
				"@inquirer/confirm": "^5.0.0",
				"@mswjs/interceptors": "^0.41.2",
				"@open-draft/deferred-promise": "^2.2.0",
				"@types/statuses": "^2.0.6",
				"cookie": "^1.0.2",
				"graphql": "^16.12.0",
				"headers-polyfill": "^4.0.2",
				"is-node-process": "^1.2.0",
				"outvariant": "^1.4.3",
				"path-to-regexp": "^6.3.0",
				"picocolors": "^1.1.1",
				"rettime": "^0.10.1",
				"statuses": "^2.0.2",
				"strict-event-emitter": "^0.5.1",
				"tough-cookie": "^6.0.0",
				"type-fest": "^5.2.0",
				"until-async": "^3.0.2",
				"yargs": "^17.7.2"
			},
			"bin": {
				"msw": "cli/index.js"
			},
			"engines": {
				"node": ">=18"
			},
			"funding": {
				"url": "https://github.com/sponsors/mswjs"
			},
			"peerDependencies": {
				"typescript": ">= 4.8.x"
			},
			"peerDependenciesMeta": {
				"typescript": {
					"optional": true
				}
			}
		},
		"node_modules/msw/node_modules/ansi-regex": {
			"version": "5.0.1",
			"resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
			"integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/msw/node_modules/ansi-styles": {
			"version": "4.3.0",
			"resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz",
			"integrity": "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"color-convert": "^2.0.1"
			},
			"engines": {
				"node": ">=8"
			},
			"funding": {
				"url": "https://github.com/chalk/ansi-styles?sponsor=1"
			}
		},
		"node_modules/msw/node_modules/cliui": {
			"version": "8.0.1",
			"resolved": "https://registry.npmjs.org/cliui/-/cliui-8.0.1.tgz",
			"integrity": "sha512-BSeNnyus75C4//NQ9gQt1/csTXyo/8Sb+afLAkzAptFuMsod9HFokGNudZpi/oQV73hnVK+sR+5PVRMd+Dr7YQ==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"string-width": "^4.2.0",
				"strip-ansi": "^6.0.1",
				"wrap-ansi": "^7.0.0"
			},
			"engines": {
				"node": ">=12"
			}
		},
		"node_modules/msw/node_modules/cookie": {
			"version": "1.1.1",
			"resolved": "https://registry.npmjs.org/cookie/-/cookie-1.1.1.tgz",
			"integrity": "sha512-ei8Aos7ja0weRpFzJnEA9UHJ/7XQmqglbRwnf2ATjcB9Wq874VKH9kfjjirM6UhU2/E5fFYadylyhFldcqSidQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=18"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/express"
			}
		},
		"node_modules/msw/node_modules/emoji-regex": {
			"version": "8.0.0",
			"resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
			"integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/msw/node_modules/is-fullwidth-code-point": {
			"version": "3.0.0",
			"resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-3.0.0.tgz",
			"integrity": "sha512-zymm5+u+sCsSWyD9qNaejV3DFvhCKclKdizYaJUuHA83RLjb7nSuGnddCHGv0hk+KY7BMAlsWeK4Ueg6EV6XQg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/msw/node_modules/path-to-regexp": {
			"version": "6.3.0",
			"resolved": "https://registry.npmjs.org/path-to-regexp/-/path-to-regexp-6.3.0.tgz",
			"integrity": "sha512-Yhpw4T9C6hPpgPeA28us07OJeqZ5EzQTkbfwuhsUg0c237RomFoETJgmp2sa3F/41gfLE6G5cqcYwznmeEeOlQ==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/msw/node_modules/string-width": {
			"version": "4.2.3",
			"resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
			"integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"emoji-regex": "^8.0.0",
				"is-fullwidth-code-point": "^3.0.0",
				"strip-ansi": "^6.0.1"
			},
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/msw/node_modules/strip-ansi": {
			"version": "6.0.1",
			"resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
			"integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ansi-regex": "^5.0.1"
			},
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/msw/node_modules/wrap-ansi": {
			"version": "7.0.0",
			"resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-7.0.0.tgz",
			"integrity": "sha512-YVGIj2kamLSTxw6NsZjoBxfSwsn0ycdesmc4p+Q21c5zPuZ1pl+NfxVdxPtdHvmNVOQ6XSYG4AUtyt/Fi7D16Q==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ansi-styles": "^4.0.0",
				"string-width": "^4.1.0",
				"strip-ansi": "^6.0.0"
			},
			"engines": {
				"node": ">=10"
			},
			"funding": {
				"url": "https://github.com/chalk/wrap-ansi?sponsor=1"
			}
		},
		"node_modules/msw/node_modules/yargs": {
			"version": "17.7.2",
			"resolved": "https://registry.npmjs.org/yargs/-/yargs-17.7.2.tgz",
			"integrity": "sha512-7dSzzRQ++CKnNI/krKnYRV7JKKPUXMEh61soaHKg9mrWEhzFWhFnxPxGl+69cD1Ou63C13NUPCnmIcrvqCuM6w==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"cliui": "^8.0.1",
				"escalade": "^3.1.1",
				"get-caller-file": "^2.0.5",
				"require-directory": "^2.1.1",
				"string-width": "^4.2.3",
				"y18n": "^5.0.5",
				"yargs-parser": "^21.1.1"
			},
			"engines": {
				"node": ">=12"
			}
		},
		"node_modules/msw/node_modules/yargs-parser": {
			"version": "21.1.1",
			"resolved": "https://registry.npmjs.org/yargs-parser/-/yargs-parser-21.1.1.tgz",
			"integrity": "sha512-tVpsJW7DdjecAiFpbIB1e3qxIQsE6NoPc5/eTdrbbIC4h0LVsWhnoa3g+m2HclBIujHzsxZ4VJVA+GUuc2/LBw==",
			"dev": true,
			"license": "ISC",
			"engines": {
				"node": ">=12"
			}
		},
		"node_modules/multicast-dns": {
			"version": "7.2.5",
			"resolved": "https://registry.npmjs.org/multicast-dns/-/multicast-dns-7.2.5.tgz",
			"integrity": "sha512-2eznPJP8z2BFLX50tf0LuODrpINqP1RVIm/CObbTcBRITQgmC/TjcREF1NeTBzIcR5XO/ukWo+YHOjBbFwIupg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"dns-packet": "^5.2.2",
				"thunky": "^1.0.2"
			},
			"bin": {
				"multicast-dns": "cli.js"
			}
		},
		"node_modules/mute-stream": {
			"version": "2.0.0",
			"resolved": "https://registry.npmjs.org/mute-stream/-/mute-stream-2.0.0.tgz",
			"integrity": "sha512-WWdIxpyjEn+FhQJQQv9aQAYlHoNVdzIzUySNV1gHUPDSdZJ3yZn7pAAbQcV7B56Mvu881q9FZV+0Vx2xC44VWA==",
			"dev": true,
			"license": "ISC",
			"engines": {
				"node": "^18.17.0 || >=20.5.0"
			}
		},
		"node_modules/nanoid": {
			"version": "3.3.11",
			"resolved": "https://registry.npmjs.org/nanoid/-/nanoid-3.3.11.tgz",
			"integrity": "sha512-N8SpfPUnUp1bK+PMYW8qSWdl9U+wwNWI4QKxOYDy9JAro3WMX7p2OeVRF9v+347pnakNevPmiHhNmZ2HbFA76w==",
			"dev": true,
			"funding": [
				{
					"type": "github",
					"url": "https://github.com/sponsors/ai"
				}
			],
			"license": "MIT",
			"bin": {
				"nanoid": "bin/nanoid.cjs"
			},
			"engines": {
				"node": "^10 || ^12 || ^13.7 || ^14 || >=15.0.1"
			}
		},
		"node_modules/natural-compare": {
			"version": "1.4.0",
			"resolved": "https://registry.npmjs.org/natural-compare/-/natural-compare-1.4.0.tgz",
			"integrity": "sha512-OWND8ei3VtNC9h7V60qff3SVobHr996CTwgxubgyQYEpg290h9J0buyECNNJexkFm5sOajh5G116RYA1c8ZMSw==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/needle": {
			"version": "3.5.0",
			"resolved": "https://registry.npmjs.org/needle/-/needle-3.5.0.tgz",
			"integrity": "sha512-jaQyPKKk2YokHrEg+vFDYxXIHTCBgiZwSHOoVx/8V3GIBS8/VN6NdVRmg8q1ERtPkMvmOvebsgga4sAj5hls/w==",
			"dev": true,
			"license": "MIT",
			"optional": true,
			"dependencies": {
				"iconv-lite": "^0.6.3",
				"sax": "^1.2.4"
			},
			"bin": {
				"needle": "bin/needle"
			},
			"engines": {
				"node": ">= 4.4.x"
			}
		},
		"node_modules/needle/node_modules/iconv-lite": {
			"version": "0.6.3",
			"resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.6.3.tgz",
			"integrity": "sha512-4fCk79wshMdzMp2rH06qWrJE4iolqLhCUH+OiuIgU++RB0+94NlDL81atO7GX55uUKueo0txHNtvEyI6D7WdMw==",
			"dev": true,
			"license": "MIT",
			"optional": true,
			"dependencies": {
				"safer-buffer": ">= 2.1.2 < 3.0.0"
			},
			"engines": {
				"node": ">=0.10.0"
			}
		},
		"node_modules/negotiator": {
			"version": "1.0.0",
			"resolved": "https://registry.npmjs.org/negotiator/-/negotiator-1.0.0.tgz",
			"integrity": "sha512-8Ofs/AUQh8MaEcrlq5xOX0CQ9ypTF5dl78mjlMNfOK08fzpgTHQRQPBxcPlEtIw0yRpws+Zo/3r+5WRby7u3Gg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/neo-async": {
			"version": "2.6.2",
			"resolved": "https://registry.npmjs.org/neo-async/-/neo-async-2.6.2.tgz",
			"integrity": "sha512-Yd3UES5mWCSqR+qNT93S3UoYUkqAZ9lLg8a7g9rimsWmYGK8cVToA4/sF3RrshdyV3sAGMXVUmpMYOw+dLpOuw==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/node-abort-controller": {
			"version": "3.1.1",
			"resolved": "https://registry.npmjs.org/node-abort-controller/-/node-abort-controller-3.1.1.tgz",
			"integrity": "sha512-AGK2yQKIjRuqnc6VkX2Xj5d+QW8xZ87pa1UK6yA6ouUyuxfHuMP6umE5QK7UmTeOAymo+Zx1Fxiuw9rVx8taHQ==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/node-addon-api": {
			"version": "6.1.0",
			"resolved": "https://registry.npmjs.org/node-addon-api/-/node-addon-api-6.1.0.tgz",
			"integrity": "sha512-+eawOlIgy680F0kBzPUNFhMZGtJ1YmqM6l4+Crf4IkImjYrO/mqPwRMh352g23uIaQKFItcQ64I7KMaJxHgAVA==",
			"dev": true,
			"license": "MIT",
			"optional": true
		},
		"node_modules/node-forge": {
			"version": "1.4.0",
			"resolved": "https://registry.npmjs.org/node-forge/-/node-forge-1.4.0.tgz",
			"integrity": "sha512-LarFH0+6VfriEhqMMcLX2F7SwSXeWwnEAJEsYm5QKWchiVYVvJyV9v7UDvUv+w5HO23ZpQTXDv/GxdDdMyOuoQ==",
			"dev": true,
			"license": "(BSD-3-Clause OR GPL-2.0)",
			"engines": {
				"node": ">= 6.13.0"
			}
		},
		"node_modules/node-gyp": {
			"version": "12.2.0",
			"resolved": "https://registry.npmjs.org/node-gyp/-/node-gyp-12.2.0.tgz",
			"integrity": "sha512-q23WdzrQv48KozXlr0U1v9dwO/k59NHeSzn6loGcasyf0UnSrtzs8kRxM+mfwJSf0DkX0s43hcqgnSO4/VNthQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"env-paths": "^2.2.0",
				"exponential-backoff": "^3.1.1",
				"graceful-fs": "^4.2.6",
				"make-fetch-happen": "^15.0.0",
				"nopt": "^9.0.0",
				"proc-log": "^6.0.0",
				"semver": "^7.3.5",
				"tar": "^7.5.4",
				"tinyglobby": "^0.2.12",
				"which": "^6.0.0"
			},
			"bin": {
				"node-gyp": "bin/node-gyp.js"
			},
			"engines": {
				"node": "^20.17.0 || >=22.9.0"
			}
		},
		"node_modules/node-gyp-build-optional-packages": {
			"version": "5.2.2",
			"resolved": "https://registry.npmjs.org/node-gyp-build-optional-packages/-/node-gyp-build-optional-packages-5.2.2.tgz",
			"integrity": "sha512-s+w+rBWnpTMwSFbaE0UXsRlg7hU4FjekKU4eyAih5T8nJuNZT1nNsskXpxmeqSK9UzkBl6UgRlnKc8hz8IEqOw==",
			"dev": true,
			"license": "MIT",
			"optional": true,
			"dependencies": {
				"detect-libc": "^2.0.1"
			},
			"bin": {
				"node-gyp-build-optional-packages": "bin.js",
				"node-gyp-build-optional-packages-optional": "optional.js",
				"node-gyp-build-optional-packages-test": "build-test.js"
			}
		},
		"node_modules/node-gyp/node_modules/isexe": {
			"version": "4.0.0",
			"resolved": "https://registry.npmjs.org/isexe/-/isexe-4.0.0.tgz",
			"integrity": "sha512-FFUtZMpoZ8RqHS3XeXEmHWLA4thH+ZxCv2lOiPIn1Xc7CxrqhWzNSDzD+/chS/zbYezmiwWLdQC09JdQKmthOw==",
			"dev": true,
			"license": "BlueOak-1.0.0",
			"engines": {
				"node": ">=20"
			}
		},
		"node_modules/node-gyp/node_modules/which": {
			"version": "6.0.1",
			"resolved": "https://registry.npmjs.org/which/-/which-6.0.1.tgz",
			"integrity": "sha512-oGLe46MIrCRqX7ytPUf66EAYvdeMIZYn3WaocqqKZAxrBpkqHfL/qvTyJ/bTk5+AqHCjXmrv3CEWgy368zhRUg==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"isexe": "^4.0.0"
			},
			"bin": {
				"node-which": "bin/which.js"
			},
			"engines": {
				"node": "^20.17.0 || >=22.9.0"
			}
		},
		"node_modules/node-html-parser": {
			"version": "7.1.0",
			"resolved": "https://registry.npmjs.org/node-html-parser/-/node-html-parser-7.1.0.tgz",
			"integrity": "sha512-iJo8b2uYGT40Y8BTyy5ufL6IVbN8rbm/1QK2xffXU/1a/v3AAa0d1YAoqBNYqaS4R/HajkWIpIfdE6KcyFh1AQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"css-select": "^5.1.0",
				"he": "1.2.0"
			}
		},
		"node_modules/node-html-parser/node_modules/css-select": {
			"version": "5.2.2",
			"resolved": "https://registry.npmjs.org/css-select/-/css-select-5.2.2.tgz",
			"integrity": "sha512-TizTzUddG/xYLA3NXodFM0fSbNizXjOKhqiQQwvhlspadZokn1KDy0NZFS0wuEubIYAV5/c1/lAr0TaaFXEXzw==",
			"dev": true,
			"license": "BSD-2-Clause",
			"dependencies": {
				"boolbase": "^1.0.0",
				"css-what": "^6.1.0",
				"domhandler": "^5.0.2",
				"domutils": "^3.0.1",
				"nth-check": "^2.0.1"
			},
			"funding": {
				"url": "https://github.com/sponsors/fb55"
			}
		},
		"node_modules/node-html-parser/node_modules/css-what": {
			"version": "6.2.2",
			"resolved": "https://registry.npmjs.org/css-what/-/css-what-6.2.2.tgz",
			"integrity": "sha512-u/O3vwbptzhMs3L1fQE82ZSLHQQfto5gyZzwteVIEyeaY5Fc7R4dapF/BvRoSYFeqfBk4m0V1Vafq5Pjv25wvA==",
			"dev": true,
			"license": "BSD-2-Clause",
			"engines": {
				"node": ">= 6"
			},
			"funding": {
				"url": "https://github.com/sponsors/fb55"
			}
		},
		"node_modules/node-releases": {
			"version": "2.0.37",
			"resolved": "https://registry.npmjs.org/node-releases/-/node-releases-2.0.37.tgz",
			"integrity": "sha512-1h5gKZCF+pO/o3Iqt5Jp7wc9rH3eJJ0+nh/CIoiRwjRxde/hAHyLPXYN4V3CqKAbiZPSeJFSWHmJsbkicta0Eg==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/node-schedule": {
			"version": "2.1.1",
			"resolved": "https://registry.npmjs.org/node-schedule/-/node-schedule-2.1.1.tgz",
			"integrity": "sha512-OXdegQq03OmXEjt2hZP33W2YPs/E5BcFQks46+G2gAxs4gHOIVD1u7EqlYLYSKsaIpyKCK9Gbk0ta1/gjRSMRQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"cron-parser": "^4.2.0",
				"long-timeout": "0.1.1",
				"sorted-array-functions": "^1.3.0"
			},
			"engines": {
				"node": ">=6"
			}
		},
		"node_modules/nopt": {
			"version": "9.0.0",
			"resolved": "https://registry.npmjs.org/nopt/-/nopt-9.0.0.tgz",
			"integrity": "sha512-Zhq3a+yFKrYwSBluL4H9XP3m3y5uvQkB/09CwDruCiRmR/UJYnn9W4R48ry0uGC70aeTPKLynBtscP9efFFcPw==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"abbrev": "^4.0.0"
			},
			"bin": {
				"nopt": "bin/nopt.js"
			},
			"engines": {
				"node": "^20.17.0 || >=22.9.0"
			}
		},
		"node_modules/normalize-path": {
			"version": "3.0.0",
			"resolved": "https://registry.npmjs.org/normalize-path/-/normalize-path-3.0.0.tgz",
			"integrity": "sha512-6eZs5Ls3WtCisHWp9S2GUy8dqkpGi4BVSz3GaqiE6ezub0512ESztXUwUB6C6IKbQkY2Pnb/mD4WYojCRwcwLA==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=0.10.0"
			}
		},
		"node_modules/npm-bundled": {
			"version": "5.0.0",
			"resolved": "https://registry.npmjs.org/npm-bundled/-/npm-bundled-5.0.0.tgz",
			"integrity": "sha512-JLSpbzh6UUXIEoqPsYBvVNVmyrjVZ1fzEFbqxKkTJQkWBO3xFzFT+KDnSKQWwOQNbuWRwt5LSD6HOTLGIWzfrw==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"npm-normalize-package-bin": "^5.0.0"
			},
			"engines": {
				"node": "^20.17.0 || >=22.9.0"
			}
		},
		"node_modules/npm-install-checks": {
			"version": "8.0.0",
			"resolved": "https://registry.npmjs.org/npm-install-checks/-/npm-install-checks-8.0.0.tgz",
			"integrity": "sha512-ScAUdMpyzkbpxoNekQ3tNRdFI8SJ86wgKZSQZdUxT+bj0wVFpsEMWnkXP0twVe1gJyNF5apBWDJhhIbgrIViRA==",
			"dev": true,
			"license": "BSD-2-Clause",
			"dependencies": {
				"semver": "^7.1.1"
			},
			"engines": {
				"node": "^20.17.0 || >=22.9.0"
			}
		},
		"node_modules/npm-normalize-package-bin": {
			"version": "5.0.0",
			"resolved": "https://registry.npmjs.org/npm-normalize-package-bin/-/npm-normalize-package-bin-5.0.0.tgz",
			"integrity": "sha512-CJi3OS4JLsNMmr2u07OJlhcrPxCeOeP/4xq67aWNai6TNWWbTrlNDgl8NcFKVlcBKp18GPj+EzbNIgrBfZhsag==",
			"dev": true,
			"license": "ISC",
			"engines": {
				"node": "^20.17.0 || >=22.9.0"
			}
		},
		"node_modules/npm-package-arg": {
			"version": "13.0.2",
			"resolved": "https://registry.npmjs.org/npm-package-arg/-/npm-package-arg-13.0.2.tgz",
			"integrity": "sha512-IciCE3SY3uE84Ld8WZU23gAPPV9rIYod4F+rc+vJ7h7cwAJt9Vk6TVsK60ry7Uj3SRS3bqRRIGuTp9YVlk6WNA==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"hosted-git-info": "^9.0.0",
				"proc-log": "^6.0.0",
				"semver": "^7.3.5",
				"validate-npm-package-name": "^7.0.0"
			},
			"engines": {
				"node": "^20.17.0 || >=22.9.0"
			}
		},
		"node_modules/npm-packlist": {
			"version": "10.0.4",
			"resolved": "https://registry.npmjs.org/npm-packlist/-/npm-packlist-10.0.4.tgz",
			"integrity": "sha512-uMW73iajD8hiH4ZBxEV3HC+eTnppIqwakjOYuvgddnalIw2lJguKviK1pcUJDlIWm1wSJkchpDZDSVVsZEYRng==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"ignore-walk": "^8.0.0",
				"proc-log": "^6.0.0"
			},
			"engines": {
				"node": "^20.17.0 || >=22.9.0"
			}
		},
		"node_modules/npm-pick-manifest": {
			"version": "11.0.3",
			"resolved": "https://registry.npmjs.org/npm-pick-manifest/-/npm-pick-manifest-11.0.3.tgz",
			"integrity": "sha512-buzyCfeoGY/PxKqmBqn1IUJrZnUi1VVJTdSSRPGI60tJdUhUoSQFhs0zycJokDdOznQentgrpf8LayEHyyYlqQ==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"npm-install-checks": "^8.0.0",
				"npm-normalize-package-bin": "^5.0.0",
				"npm-package-arg": "^13.0.0",
				"semver": "^7.3.5"
			},
			"engines": {
				"node": "^20.17.0 || >=22.9.0"
			}
		},
		"node_modules/npm-registry-fetch": {
			"version": "19.1.1",
			"resolved": "https://registry.npmjs.org/npm-registry-fetch/-/npm-registry-fetch-19.1.1.tgz",
			"integrity": "sha512-TakBap6OM1w0H73VZVDf44iFXsOS3h+L4wVMXmbWOQroZgFhMch0juN6XSzBNlD965yIKvWg2dfu7NSiaYLxtw==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"@npmcli/redact": "^4.0.0",
				"jsonparse": "^1.3.1",
				"make-fetch-happen": "^15.0.0",
				"minipass": "^7.0.2",
				"minipass-fetch": "^5.0.0",
				"minizlib": "^3.0.1",
				"npm-package-arg": "^13.0.0",
				"proc-log": "^6.0.0"
			},
			"engines": {
				"node": "^20.17.0 || >=22.9.0"
			}
		},
		"node_modules/npm-run-path": {
			"version": "4.0.1",
			"resolved": "https://registry.npmjs.org/npm-run-path/-/npm-run-path-4.0.1.tgz",
			"integrity": "sha512-S48WzZW777zhNIrn7gxOlISNAqi9ZC/uQFnRdbeIHhZhCA6UqpkOT8T1G7BvfdgP4Er8gF4sUbaS0i7QvIfCWw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"path-key": "^3.0.0"
			},
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/nth-check": {
			"version": "2.1.1",
			"resolved": "https://registry.npmjs.org/nth-check/-/nth-check-2.1.1.tgz",
			"integrity": "sha512-lqjrjmaOoAnWfMmBPL+XNnynZh2+swxiX3WUE0s4yEHI6m+AwrK2UZOimIRl3X/4QctVqS8AiZjFqyOGrMXb/w==",
			"dev": true,
			"license": "BSD-2-Clause",
			"dependencies": {
				"boolbase": "^1.0.0"
			},
			"funding": {
				"url": "https://github.com/fb55/nth-check?sponsor=1"
			}
		},
		"node_modules/nx": {
			"version": "22.6.5",
			"resolved": "https://registry.npmjs.org/nx/-/nx-22.6.5.tgz",
			"integrity": "sha512-VRKhDAt684dXNSz9MNjE7MekkCfQF41P2PSx5jEWQjDEP1Z4jFZbyeygWs5ZyOroG7/n0MoWAJTe6ftvIcBOAg==",
			"dev": true,
			"hasInstallScript": true,
			"license": "MIT",
			"dependencies": {
				"@napi-rs/wasm-runtime": "0.2.4",
				"@yarnpkg/lockfile": "^1.1.0",
				"@yarnpkg/parsers": "3.0.2",
				"@zkochan/js-yaml": "0.0.7",
				"axios": "1.15.0",
				"cli-cursor": "3.1.0",
				"cli-spinners": "2.6.1",
				"cliui": "^8.0.1",
				"dotenv": "~16.4.5",
				"dotenv-expand": "~11.0.6",
				"ejs": "5.0.1",
				"enquirer": "~2.3.6",
				"figures": "3.2.0",
				"flat": "^5.0.2",
				"front-matter": "^4.0.2",
				"ignore": "^7.0.5",
				"jest-diff": "^30.0.2",
				"jsonc-parser": "3.2.0",
				"lines-and-columns": "2.0.3",
				"minimatch": "10.2.4",
				"npm-run-path": "^4.0.1",
				"open": "^8.4.0",
				"ora": "5.3.0",
				"picocolors": "^1.1.0",
				"resolve.exports": "2.0.3",
				"semver": "^7.6.3",
				"smol-toml": "1.6.1",
				"string-width": "^4.2.3",
				"tar-stream": "~2.2.0",
				"tmp": "~0.2.1",
				"tree-kill": "^1.2.2",
				"tsconfig-paths": "^4.1.2",
				"tslib": "^2.3.0",
				"yaml": "^2.6.0",
				"yargs": "^17.6.2",
				"yargs-parser": "21.1.1"
			},
			"bin": {
				"nx": "bin/nx.js",
				"nx-cloud": "bin/nx-cloud.js"
			},
			"optionalDependencies": {
				"@nx/nx-darwin-arm64": "22.6.5",
				"@nx/nx-darwin-x64": "22.6.5",
				"@nx/nx-freebsd-x64": "22.6.5",
				"@nx/nx-linux-arm-gnueabihf": "22.6.5",
				"@nx/nx-linux-arm64-gnu": "22.6.5",
				"@nx/nx-linux-arm64-musl": "22.6.5",
				"@nx/nx-linux-x64-gnu": "22.6.5",
				"@nx/nx-linux-x64-musl": "22.6.5",
				"@nx/nx-win32-arm64-msvc": "22.6.5",
				"@nx/nx-win32-x64-msvc": "22.6.5"
			},
			"peerDependencies": {
				"@swc-node/register": "^1.11.1",
				"@swc/core": "^1.15.8"
			},
			"peerDependenciesMeta": {
				"@swc-node/register": {
					"optional": true
				},
				"@swc/core": {
					"optional": true
				}
			}
		},
		"node_modules/nx/node_modules/@napi-rs/wasm-runtime": {
			"version": "0.2.4",
			"resolved": "https://registry.npmjs.org/@napi-rs/wasm-runtime/-/wasm-runtime-0.2.4.tgz",
			"integrity": "sha512-9zESzOO5aDByvhIAsOy9TbpZ0Ur2AJbUI7UT73kcUTS2mxAMHOBaa1st/jAymNoCtvrit99kkzT1FZuXVcgfIQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@emnapi/core": "^1.1.0",
				"@emnapi/runtime": "^1.1.0",
				"@tybys/wasm-util": "^0.9.0"
			}
		},
		"node_modules/nx/node_modules/@tybys/wasm-util": {
			"version": "0.9.0",
			"resolved": "https://registry.npmjs.org/@tybys/wasm-util/-/wasm-util-0.9.0.tgz",
			"integrity": "sha512-6+7nlbMVX/PVDCwaIQ8nTOPveOcFLSt8GcXdx8hD0bt39uWxYT88uXzqTd4fTvqta7oeUJqudepapKNt2DYJFw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"tslib": "^2.4.0"
			}
		},
		"node_modules/nx/node_modules/ansi-regex": {
			"version": "5.0.1",
			"resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
			"integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/nx/node_modules/ansi-styles": {
			"version": "4.3.0",
			"resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz",
			"integrity": "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"color-convert": "^2.0.1"
			},
			"engines": {
				"node": ">=8"
			},
			"funding": {
				"url": "https://github.com/chalk/ansi-styles?sponsor=1"
			}
		},
		"node_modules/nx/node_modules/chalk": {
			"version": "4.1.2",
			"resolved": "https://registry.npmjs.org/chalk/-/chalk-4.1.2.tgz",
			"integrity": "sha512-oKnbhFyRIXpUuez8iBMmyEa4nbj4IOQyuhc/wy9kY7/WVPcwIO9VA668Pu8RkO7+0G76SLROeyw9CpQ061i4mA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ansi-styles": "^4.1.0",
				"supports-color": "^7.1.0"
			},
			"engines": {
				"node": ">=10"
			},
			"funding": {
				"url": "https://github.com/chalk/chalk?sponsor=1"
			}
		},
		"node_modules/nx/node_modules/cli-cursor": {
			"version": "3.1.0",
			"resolved": "https://registry.npmjs.org/cli-cursor/-/cli-cursor-3.1.0.tgz",
			"integrity": "sha512-I/zHAwsKf9FqGoXM4WWRACob9+SNukZTd94DWF57E4toouRulbCxcUh6RKUEOQlYTHJnzkPMySvPNaaSLNfLZw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"restore-cursor": "^3.1.0"
			},
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/nx/node_modules/cli-spinners": {
			"version": "2.6.1",
			"resolved": "https://registry.npmjs.org/cli-spinners/-/cli-spinners-2.6.1.tgz",
			"integrity": "sha512-x/5fWmGMnbKQAaNwN+UZlV79qBLM9JFnJuJ03gIi5whrob0xV0ofNVHy9DhwGdsMJQc2OKv0oGmLzvaqvAVv+g==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=6"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/nx/node_modules/cliui": {
			"version": "8.0.1",
			"resolved": "https://registry.npmjs.org/cliui/-/cliui-8.0.1.tgz",
			"integrity": "sha512-BSeNnyus75C4//NQ9gQt1/csTXyo/8Sb+afLAkzAptFuMsod9HFokGNudZpi/oQV73hnVK+sR+5PVRMd+Dr7YQ==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"string-width": "^4.2.0",
				"strip-ansi": "^6.0.1",
				"wrap-ansi": "^7.0.0"
			},
			"engines": {
				"node": ">=12"
			}
		},
		"node_modules/nx/node_modules/emoji-regex": {
			"version": "8.0.0",
			"resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
			"integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/nx/node_modules/is-fullwidth-code-point": {
			"version": "3.0.0",
			"resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-3.0.0.tgz",
			"integrity": "sha512-zymm5+u+sCsSWyD9qNaejV3DFvhCKclKdizYaJUuHA83RLjb7nSuGnddCHGv0hk+KY7BMAlsWeK4Ueg6EV6XQg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/nx/node_modules/is-interactive": {
			"version": "1.0.0",
			"resolved": "https://registry.npmjs.org/is-interactive/-/is-interactive-1.0.0.tgz",
			"integrity": "sha512-2HvIEKRoqS62guEC+qBjpvRubdX910WCMuJTZ+I9yvqKU2/12eSL549HMwtabb4oupdj2sMP50k+XJfB/8JE6w==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/nx/node_modules/is-unicode-supported": {
			"version": "0.1.0",
			"resolved": "https://registry.npmjs.org/is-unicode-supported/-/is-unicode-supported-0.1.0.tgz",
			"integrity": "sha512-knxG2q4UC3u8stRGyAVJCOdxFmv5DZiRcdlIaAQXAbSfJya+OhopNotLQrstBhququ4ZpuKbDc/8S6mgXgPFPw==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=10"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/nx/node_modules/jsonc-parser": {
			"version": "3.2.0",
			"resolved": "https://registry.npmjs.org/jsonc-parser/-/jsonc-parser-3.2.0.tgz",
			"integrity": "sha512-gfFQZrcTc8CnKXp6Y4/CBT3fTc0OVuDofpre4aEeEpSBPV5X5v4+Vmx+8snU7RLPrNHPKSgLxGo9YuQzz20o+w==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/nx/node_modules/log-symbols": {
			"version": "4.1.0",
			"resolved": "https://registry.npmjs.org/log-symbols/-/log-symbols-4.1.0.tgz",
			"integrity": "sha512-8XPvpAA8uyhfteu8pIvQxpJZ7SYYdpUivZpGy6sFsBuKRY/7rQGavedeB8aK+Zkyq6upMFVL/9AW6vOYzfRyLg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"chalk": "^4.1.0",
				"is-unicode-supported": "^0.1.0"
			},
			"engines": {
				"node": ">=10"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/nx/node_modules/minimatch": {
			"version": "10.2.4",
			"resolved": "https://registry.npmjs.org/minimatch/-/minimatch-10.2.4.tgz",
			"integrity": "sha512-oRjTw/97aTBN0RHbYCdtF1MQfvusSIBQM0IZEgzl6426+8jSC0nF1a/GmnVLpfB9yyr6g6FTqWqiZVbxrtaCIg==",
			"dev": true,
			"license": "BlueOak-1.0.0",
			"dependencies": {
				"brace-expansion": "^5.0.2"
			},
			"engines": {
				"node": "18 || 20 || >=22"
			},
			"funding": {
				"url": "https://github.com/sponsors/isaacs"
			}
		},
		"node_modules/nx/node_modules/onetime": {
			"version": "5.1.2",
			"resolved": "https://registry.npmjs.org/onetime/-/onetime-5.1.2.tgz",
			"integrity": "sha512-kbpaSSGJTWdAY5KPVeMOKXSrPtr8C8C7wodJbcsd51jRnmD+GZu8Y0VoU6Dm5Z4vWr0Ig/1NKuWRKf7j5aaYSg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"mimic-fn": "^2.1.0"
			},
			"engines": {
				"node": ">=6"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/nx/node_modules/ora": {
			"version": "5.3.0",
			"resolved": "https://registry.npmjs.org/ora/-/ora-5.3.0.tgz",
			"integrity": "sha512-zAKMgGXUim0Jyd6CXK9lraBnD3H5yPGBPPOkC23a2BG6hsm4Zu6OQSjQuEtV0BHDf4aKHcUFvJiGRrFuW3MG8g==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"bl": "^4.0.3",
				"chalk": "^4.1.0",
				"cli-cursor": "^3.1.0",
				"cli-spinners": "^2.5.0",
				"is-interactive": "^1.0.0",
				"log-symbols": "^4.0.0",
				"strip-ansi": "^6.0.0",
				"wcwidth": "^1.0.1"
			},
			"engines": {
				"node": ">=10"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/nx/node_modules/restore-cursor": {
			"version": "3.1.0",
			"resolved": "https://registry.npmjs.org/restore-cursor/-/restore-cursor-3.1.0.tgz",
			"integrity": "sha512-l+sSefzHpj5qimhFSE5a8nufZYAM3sBSVMAPtYkmC+4EH2anSGaEMXSD0izRQbu9nfyQ9y5JrVmp7E8oZrUjvA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"onetime": "^5.1.0",
				"signal-exit": "^3.0.2"
			},
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/nx/node_modules/signal-exit": {
			"version": "3.0.7",
			"resolved": "https://registry.npmjs.org/signal-exit/-/signal-exit-3.0.7.tgz",
			"integrity": "sha512-wnD2ZE+l+SPC/uoS0vXeE9L1+0wuaMqKlfz9AMUo38JsyLSBWSFcHR1Rri62LZc12vLr1gb3jl7iwQhgwpAbGQ==",
			"dev": true,
			"license": "ISC"
		},
		"node_modules/nx/node_modules/string-width": {
			"version": "4.2.3",
			"resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
			"integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"emoji-regex": "^8.0.0",
				"is-fullwidth-code-point": "^3.0.0",
				"strip-ansi": "^6.0.1"
			},
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/nx/node_modules/strip-ansi": {
			"version": "6.0.1",
			"resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
			"integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ansi-regex": "^5.0.1"
			},
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/nx/node_modules/wrap-ansi": {
			"version": "7.0.0",
			"resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-7.0.0.tgz",
			"integrity": "sha512-YVGIj2kamLSTxw6NsZjoBxfSwsn0ycdesmc4p+Q21c5zPuZ1pl+NfxVdxPtdHvmNVOQ6XSYG4AUtyt/Fi7D16Q==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ansi-styles": "^4.0.0",
				"string-width": "^4.1.0",
				"strip-ansi": "^6.0.0"
			},
			"engines": {
				"node": ">=10"
			},
			"funding": {
				"url": "https://github.com/chalk/wrap-ansi?sponsor=1"
			}
		},
		"node_modules/nx/node_modules/yargs": {
			"version": "17.7.2",
			"resolved": "https://registry.npmjs.org/yargs/-/yargs-17.7.2.tgz",
			"integrity": "sha512-7dSzzRQ++CKnNI/krKnYRV7JKKPUXMEh61soaHKg9mrWEhzFWhFnxPxGl+69cD1Ou63C13NUPCnmIcrvqCuM6w==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"cliui": "^8.0.1",
				"escalade": "^3.1.1",
				"get-caller-file": "^2.0.5",
				"require-directory": "^2.1.1",
				"string-width": "^4.2.3",
				"y18n": "^5.0.5",
				"yargs-parser": "^21.1.1"
			},
			"engines": {
				"node": ">=12"
			}
		},
		"node_modules/nx/node_modules/yargs-parser": {
			"version": "21.1.1",
			"resolved": "https://registry.npmjs.org/yargs-parser/-/yargs-parser-21.1.1.tgz",
			"integrity": "sha512-tVpsJW7DdjecAiFpbIB1e3qxIQsE6NoPc5/eTdrbbIC4h0LVsWhnoa3g+m2HclBIujHzsxZ4VJVA+GUuc2/LBw==",
			"dev": true,
			"license": "ISC",
			"engines": {
				"node": ">=12"
			}
		},
		"node_modules/object-assign": {
			"version": "4.1.1",
			"resolved": "https://registry.npmjs.org/object-assign/-/object-assign-4.1.1.tgz",
			"integrity": "sha512-rJgTQnkUnH1sFw8yT6VSU3zD3sWmu6sZhIseY8VX+GRu3P6F7Fu+JNDoXfklElbLJSnc3FUQHVe4cU5hj+BcUg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=0.10.0"
			}
		},
		"node_modules/object-inspect": {
			"version": "1.13.4",
			"resolved": "https://registry.npmjs.org/object-inspect/-/object-inspect-1.13.4.tgz",
			"integrity": "sha512-W67iLl4J2EXEGTbfeHCffrjDfitvLANg0UlX3wFUUSTx92KXRFegMHUVgSqE+wvhAbi4WqjGg9czysTV2Epbew==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.4"
			},
			"funding": {
				"url": "https://github.com/sponsors/ljharb"
			}
		},
		"node_modules/obuf": {
			"version": "1.1.2",
			"resolved": "https://registry.npmjs.org/obuf/-/obuf-1.1.2.tgz",
			"integrity": "sha512-PX1wu0AmAdPqOL1mWhqmlOd8kOIZQwGZw6rh7uby9fTc5lhaOWFLX3I6R1hrF9k3zUY40e6igsLGkDXK92LJNg==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/obug": {
			"version": "2.1.1",
			"resolved": "https://registry.npmjs.org/obug/-/obug-2.1.1.tgz",
			"integrity": "sha512-uTqF9MuPraAQ+IsnPf366RG4cP9RtUi7MLO1N3KEc+wb0a6yKpeL0lmk2IB1jY5KHPAlTc6T/JRdC/YqxHNwkQ==",
			"dev": true,
			"funding": [
				"https://github.com/sponsors/sxzz",
				"https://opencollective.com/debug"
			],
			"license": "MIT"
		},
		"node_modules/on-finished": {
			"version": "2.4.1",
			"resolved": "https://registry.npmjs.org/on-finished/-/on-finished-2.4.1.tgz",
			"integrity": "sha512-oVlzkg3ENAhCk2zdv7IJwd/QUD4z2RxRwpkcGY8psCVcCYZNq4wYnVWALHM+brtuJjePWiYF/ClmuDr8Ch5+kg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ee-first": "1.1.1"
			},
			"engines": {
				"node": ">= 0.8"
			}
		},
		"node_modules/on-headers": {
			"version": "1.1.0",
			"resolved": "https://registry.npmjs.org/on-headers/-/on-headers-1.1.0.tgz",
			"integrity": "sha512-737ZY3yNnXy37FHkQxPzt4UZ2UWPWiCZWLvFZ4fu5cueciegX0zGPnrlY6bwRg4FdQOe9YU8MkmJwGhoMybl8A==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.8"
			}
		},
		"node_modules/once": {
			"version": "1.4.0",
			"resolved": "https://registry.npmjs.org/once/-/once-1.4.0.tgz",
			"integrity": "sha512-lNaJgI+2Q5URQBkccEKHTQOPaXdUxnZZElQTZY0MFUAuaEqe1E+Nyvgdz/aIyNi6Z9MzO5dv1H8n58/GELp3+w==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"wrappy": "1"
			}
		},
		"node_modules/onetime": {
			"version": "7.0.0",
			"resolved": "https://registry.npmjs.org/onetime/-/onetime-7.0.0.tgz",
			"integrity": "sha512-VXJjc87FScF88uafS3JllDgvAm+c/Slfz06lorj2uAY34rlUu0Nt+v8wreiImcrgAjjIHp1rXpTDlLOGw29WwQ==",
			"license": "MIT",
			"dependencies": {
				"mimic-function": "^5.0.0"
			},
			"engines": {
				"node": ">=18"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/open": {
			"version": "8.4.2",
			"resolved": "https://registry.npmjs.org/open/-/open-8.4.2.tgz",
			"integrity": "sha512-7x81NCL719oNbsq/3mh+hVrAWmFuEYUqrq/Iw3kUzH8ReypT9QQ0BLoJS7/G9k6N81XjW4qHWtjWwe/9eLy1EQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"define-lazy-prop": "^2.0.0",
				"is-docker": "^2.1.1",
				"is-wsl": "^2.2.0"
			},
			"engines": {
				"node": ">=12"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/opener": {
			"version": "1.5.2",
			"resolved": "https://registry.npmjs.org/opener/-/opener-1.5.2.tgz",
			"integrity": "sha512-ur5UIdyw5Y7yEj9wLzhqXiy6GZ3Mwx0yGI+5sMn2r0N0v3cKJvUmFH5yPP+WXh9e0xfyzyJX95D8l088DNFj7A==",
			"dev": true,
			"license": "(WTFPL OR MIT)",
			"bin": {
				"opener": "bin/opener-bin.js"
			}
		},
		"node_modules/optionator": {
			"version": "0.9.4",
			"resolved": "https://registry.npmjs.org/optionator/-/optionator-0.9.4.tgz",
			"integrity": "sha512-6IpQ7mKUxRcZNLIObR0hz7lxsapSSIYNZJwXPGeF0mTVqGKFIXj1DQcMoT22S3ROcLyY/rz0PWaWZ9ayWmad9g==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"deep-is": "^0.1.3",
				"fast-levenshtein": "^2.0.6",
				"levn": "^0.4.1",
				"prelude-ls": "^1.2.1",
				"type-check": "^0.4.0",
				"word-wrap": "^1.2.5"
			},
			"engines": {
				"node": ">= 0.8.0"
			}
		},
		"node_modules/ora": {
			"version": "9.3.0",
			"resolved": "https://registry.npmjs.org/ora/-/ora-9.3.0.tgz",
			"integrity": "sha512-lBX72MWFduWEf7v7uWf5DHp9Jn5BI8bNPGuFgtXMmr2uDz2Gz2749y3am3agSDdkhHPHYmmxEGSKH85ZLGzgXw==",
			"license": "MIT",
			"dependencies": {
				"chalk": "^5.6.2",
				"cli-cursor": "^5.0.0",
				"cli-spinners": "^3.2.0",
				"is-interactive": "^2.0.0",
				"is-unicode-supported": "^2.1.0",
				"log-symbols": "^7.0.1",
				"stdin-discarder": "^0.3.1",
				"string-width": "^8.1.0"
			},
			"engines": {
				"node": ">=20"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/ordered-binary": {
			"version": "1.6.1",
			"resolved": "https://registry.npmjs.org/ordered-binary/-/ordered-binary-1.6.1.tgz",
			"integrity": "sha512-QkCdPooczexPLiXIrbVOPYkR3VO3T6v2OyKRkR1Xbhpy7/LAVXwahnRCgRp78Oe/Ehf0C/HATAxfSr6eA1oX+w==",
			"dev": true,
			"license": "MIT",
			"optional": true
		},
		"node_modules/outvariant": {
			"version": "1.4.3",
			"resolved": "https://registry.npmjs.org/outvariant/-/outvariant-1.4.3.tgz",
			"integrity": "sha512-+Sl2UErvtsoajRDKCE5/dBz4DIvHXQQnAxtQTF04OJxY0+DyZXSo5P5Bb7XYWOh81syohlYL24hbDwxedPUJCA==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/p-limit": {
			"version": "3.1.0",
			"resolved": "https://registry.npmjs.org/p-limit/-/p-limit-3.1.0.tgz",
			"integrity": "sha512-TYOanM3wGwNGsZN2cVTYPArw454xnXj5qmWF1bEoAc4+cU/ol7GVh7odevjp1FNHduHc3KZMcFduxU5Xc6uJRQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"yocto-queue": "^0.1.0"
			},
			"engines": {
				"node": ">=10"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/p-locate": {
			"version": "5.0.0",
			"resolved": "https://registry.npmjs.org/p-locate/-/p-locate-5.0.0.tgz",
			"integrity": "sha512-LaNjtRWUBY++zB5nE/NwcaoMylSPk+S+ZHNB1TzdbMJMny6dynpAGt7X/tl/QYq3TIeE6nxHppbo2LGymrG5Pw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"p-limit": "^3.0.2"
			},
			"engines": {
				"node": ">=10"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/p-map": {
			"version": "7.0.4",
			"resolved": "https://registry.npmjs.org/p-map/-/p-map-7.0.4.tgz",
			"integrity": "sha512-tkAQEw8ysMzmkhgw8k+1U/iPhWNhykKnSk4Rd5zLoPJCuJaGRPo6YposrZgaxHKzDHdDWWZvE/Sk7hsL2X/CpQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=18"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/p-retry": {
			"version": "6.2.1",
			"resolved": "https://registry.npmjs.org/p-retry/-/p-retry-6.2.1.tgz",
			"integrity": "sha512-hEt02O4hUct5wtwg4H4KcWgDdm+l1bOaEy/hWzd8xtXB9BqxTWBBhb+2ImAtH4Cv4rPjV76xN3Zumqk3k3AhhQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@types/retry": "0.12.2",
				"is-network-error": "^1.0.0",
				"retry": "^0.13.1"
			},
			"engines": {
				"node": ">=16.17"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/p-retry/node_modules/retry": {
			"version": "0.13.1",
			"resolved": "https://registry.npmjs.org/retry/-/retry-0.13.1.tgz",
			"integrity": "sha512-XQBQ3I8W1Cge0Seh+6gjj03LbmRFWuoszgK9ooCpwYIrhhoO80pfq4cUkU5DkknwfOfFteRwlZ56PYOGYyFWdg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 4"
			}
		},
		"node_modules/pacote": {
			"version": "21.3.1",
			"resolved": "https://registry.npmjs.org/pacote/-/pacote-21.3.1.tgz",
			"integrity": "sha512-O0EDXi85LF4AzdjG74GUwEArhdvawi/YOHcsW6IijKNj7wm8IvEWNF5GnfuxNpQ/ZpO3L37+v8hqdVh8GgWYhg==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"@npmcli/git": "^7.0.0",
				"@npmcli/installed-package-contents": "^4.0.0",
				"@npmcli/package-json": "^7.0.0",
				"@npmcli/promise-spawn": "^9.0.0",
				"@npmcli/run-script": "^10.0.0",
				"cacache": "^20.0.0",
				"fs-minipass": "^3.0.0",
				"minipass": "^7.0.2",
				"npm-package-arg": "^13.0.0",
				"npm-packlist": "^10.0.1",
				"npm-pick-manifest": "^11.0.1",
				"npm-registry-fetch": "^19.0.0",
				"proc-log": "^6.0.0",
				"promise-retry": "^2.0.1",
				"sigstore": "^4.0.0",
				"ssri": "^13.0.0",
				"tar": "^7.4.3"
			},
			"bin": {
				"pacote": "bin/index.js"
			},
			"engines": {
				"node": "^20.17.0 || >=22.9.0"
			}
		},
		"node_modules/parent-module": {
			"version": "1.0.1",
			"resolved": "https://registry.npmjs.org/parent-module/-/parent-module-1.0.1.tgz",
			"integrity": "sha512-GQ2EWRpQV8/o+Aw8YqtfZZPfNRWZYkbidE9k5rpl/hC3vtHHBfGm2Ifi6qWV+coDGkrUKZAxE3Lot5kcsRlh+g==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"callsites": "^3.0.0"
			},
			"engines": {
				"node": ">=6"
			}
		},
		"node_modules/parse-json": {
			"version": "5.2.0",
			"resolved": "https://registry.npmjs.org/parse-json/-/parse-json-5.2.0.tgz",
			"integrity": "sha512-ayCKvm/phCGxOkYRSCM82iDwct8/EonSEgCSxWxD7ve6jHggsFl4fZVQBPRNgQoKiuV/odhFrGzQXZwbifC8Rg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/code-frame": "^7.0.0",
				"error-ex": "^1.3.1",
				"json-parse-even-better-errors": "^2.3.0",
				"lines-and-columns": "^1.1.6"
			},
			"engines": {
				"node": ">=8"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/parse-json/node_modules/json-parse-even-better-errors": {
			"version": "2.3.1",
			"resolved": "https://registry.npmjs.org/json-parse-even-better-errors/-/json-parse-even-better-errors-2.3.1.tgz",
			"integrity": "sha512-xyFwyhro/JEof6Ghe2iz2NcXoj2sloNsWr/XsERDK/oiPCfaNhl5ONfp+jQdAZRQQ0IJWNzH9zIZF7li91kh2w==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/parse-json/node_modules/lines-and-columns": {
			"version": "1.2.4",
			"resolved": "https://registry.npmjs.org/lines-and-columns/-/lines-and-columns-1.2.4.tgz",
			"integrity": "sha512-7ylylesZQ/PV29jhEDl3Ufjo6ZX7gCqJr5F7PKrqc93v7fzSymt1BpwEU8nAUXs8qzzvqhbjhK5QZg6Mt/HkBg==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/parse-node-version": {
			"version": "1.0.1",
			"resolved": "https://registry.npmjs.org/parse-node-version/-/parse-node-version-1.0.1.tgz",
			"integrity": "sha512-3YHlOa/JgH6Mnpr05jP9eDG254US9ek25LyIxZlDItp2iJtwyaXQb57lBYLdT3MowkUFYEV2XXNAYIPlESvJlA==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.10"
			}
		},
		"node_modules/parse-passwd": {
			"version": "1.0.0",
			"resolved": "https://registry.npmjs.org/parse-passwd/-/parse-passwd-1.0.0.tgz",
			"integrity": "sha512-1Y1A//QUXEZK7YKz+rD9WydcE1+EuPr6ZBgKecAB8tmoW6UFv0NREVJe1p+jRxtThkcbbKkfwIbWJe/IeE6m2Q==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=0.10.0"
			}
		},
		"node_modules/parse5": {
			"version": "8.0.0",
			"resolved": "https://registry.npmjs.org/parse5/-/parse5-8.0.0.tgz",
			"integrity": "sha512-9m4m5GSgXjL4AjumKzq1Fgfp3Z8rsvjRNbnkVwfu2ImRqE5D0LnY2QfDen18FSY9C573YU5XxSapdHZTZ2WolA==",
			"license": "MIT",
			"dependencies": {
				"entities": "^6.0.0"
			},
			"funding": {
				"url": "https://github.com/inikulin/parse5?sponsor=1"
			}
		},
		"node_modules/parse5-html-rewriting-stream": {
			"version": "8.0.0",
			"resolved": "https://registry.npmjs.org/parse5-html-rewriting-stream/-/parse5-html-rewriting-stream-8.0.0.tgz",
			"integrity": "sha512-wzh11mj8KKkno1pZEu+l2EVeWsuKDfR5KNWZOTsslfUX8lPDZx77m9T0kIoAVkFtD1nx6YF8oh4BnPHvxMtNMw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"entities": "^6.0.0",
				"parse5": "^8.0.0",
				"parse5-sax-parser": "^8.0.0"
			},
			"funding": {
				"url": "https://github.com/inikulin/parse5?sponsor=1"
			}
		},
		"node_modules/parse5-html-rewriting-stream/node_modules/entities": {
			"version": "6.0.1",
			"resolved": "https://registry.npmjs.org/entities/-/entities-6.0.1.tgz",
			"integrity": "sha512-aN97NXWF6AWBTahfVOIrB/NShkzi5H7F9r1s9mD3cDj4Ko5f2qhhVoYMibXF7GlLveb/D2ioWay8lxI97Ven3g==",
			"dev": true,
			"license": "BSD-2-Clause",
			"engines": {
				"node": ">=0.12"
			},
			"funding": {
				"url": "https://github.com/fb55/entities?sponsor=1"
			}
		},
		"node_modules/parse5-sax-parser": {
			"version": "8.0.0",
			"resolved": "https://registry.npmjs.org/parse5-sax-parser/-/parse5-sax-parser-8.0.0.tgz",
			"integrity": "sha512-/dQ8UzHZwnrzs3EvDj6IkKrD/jIZyTlB+8XrHJvcjNgRdmWruNdN9i9RK/JtxakmlUdPwKubKPTCqvbTgzGhrw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"parse5": "^8.0.0"
			},
			"funding": {
				"url": "https://github.com/inikulin/parse5?sponsor=1"
			}
		},
		"node_modules/parse5/node_modules/entities": {
			"version": "6.0.1",
			"resolved": "https://registry.npmjs.org/entities/-/entities-6.0.1.tgz",
			"integrity": "sha512-aN97NXWF6AWBTahfVOIrB/NShkzi5H7F9r1s9mD3cDj4Ko5f2qhhVoYMibXF7GlLveb/D2ioWay8lxI97Ven3g==",
			"license": "BSD-2-Clause",
			"engines": {
				"node": ">=0.12"
			},
			"funding": {
				"url": "https://github.com/fb55/entities?sponsor=1"
			}
		},
		"node_modules/parseurl": {
			"version": "1.3.3",
			"resolved": "https://registry.npmjs.org/parseurl/-/parseurl-1.3.3.tgz",
			"integrity": "sha512-CiyeOxFT/JZyN5m0z9PfXw4SCBJ6Sygz1Dpl0wqjlhDEGGBP1GnsUVEL0p63hoG1fcj3fHynXi9NYO4nWOL+qQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.8"
			}
		},
		"node_modules/path-browserify": {
			"version": "1.0.1",
			"resolved": "https://registry.npmjs.org/path-browserify/-/path-browserify-1.0.1.tgz",
			"integrity": "sha512-b7uo2UCUOYZcnF/3ID0lulOJi/bafxa1xPe7ZPsammBSpjSWQkjNxlt635YGS2MiR9GjvuXCtz2emr3jbsz98g==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/path-exists": {
			"version": "4.0.0",
			"resolved": "https://registry.npmjs.org/path-exists/-/path-exists-4.0.0.tgz",
			"integrity": "sha512-ak9Qy5Q7jYb2Wwcey5Fpvg2KoAc/ZIhLSLOSBmRmygPsGwkVVt0fZa0qrtMz+m6tJTAHfZQ8FnmB4MG4LWy7/w==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/path-key": {
			"version": "3.1.1",
			"resolved": "https://registry.npmjs.org/path-key/-/path-key-3.1.1.tgz",
			"integrity": "sha512-ojmeN0qd+y0jszEtoY48r0Peq5dwMEkIlCOu6Q5f41lfkswXuKtYrhgoTpLnyIcHm24Uhqx+5Tqm2InSwLhE6Q==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/path-parse": {
			"version": "1.0.7",
			"resolved": "https://registry.npmjs.org/path-parse/-/path-parse-1.0.7.tgz",
			"integrity": "sha512-LDJzPVEEEPR+y48z93A0Ed0yXb8pAByGWo/k5YYdYgpY2/2EsOsksJrq7lOHxryrVOn1ejG6oAp8ahvOIQD8sw==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/path-scurry": {
			"version": "2.0.2",
			"resolved": "https://registry.npmjs.org/path-scurry/-/path-scurry-2.0.2.tgz",
			"integrity": "sha512-3O/iVVsJAPsOnpwWIeD+d6z/7PmqApyQePUtCndjatj/9I5LylHvt5qluFaBT3I5h3r1ejfR056c+FCv+NnNXg==",
			"dev": true,
			"license": "BlueOak-1.0.0",
			"dependencies": {
				"lru-cache": "^11.0.0",
				"minipass": "^7.1.2"
			},
			"engines": {
				"node": "18 || 20 || >=22"
			},
			"funding": {
				"url": "https://github.com/sponsors/isaacs"
			}
		},
		"node_modules/path-scurry/node_modules/lru-cache": {
			"version": "11.2.7",
			"resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-11.2.7.tgz",
			"integrity": "sha512-aY/R+aEsRelme17KGQa/1ZSIpLpNYYrhcrepKTZgE+W3WM16YMCaPwOHLHsmopZHELU0Ojin1lPVxKR0MihncA==",
			"dev": true,
			"license": "BlueOak-1.0.0",
			"engines": {
				"node": "20 || >=22"
			}
		},
		"node_modules/path-to-regexp": {
			"version": "8.4.2",
			"resolved": "https://registry.npmjs.org/path-to-regexp/-/path-to-regexp-8.4.2.tgz",
			"integrity": "sha512-qRcuIdP69NPm4qbACK+aDogI5CBDMi1jKe0ry5rSQJz8JVLsC7jV8XpiJjGRLLol3N+R5ihGYcrPLTno6pAdBA==",
			"dev": true,
			"license": "MIT",
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/express"
			}
		},
		"node_modules/path-type": {
			"version": "4.0.0",
			"resolved": "https://registry.npmjs.org/path-type/-/path-type-4.0.0.tgz",
			"integrity": "sha512-gDKb8aZMDeD/tZWs9P6+q0J9Mwkdl6xMV8TjnGP3qJVJ06bdMgkbBlLU8IdfOsIsFz2BW1rNVT3XuNEl8zPAvw==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/pathe": {
			"version": "2.0.3",
			"resolved": "https://registry.npmjs.org/pathe/-/pathe-2.0.3.tgz",
			"integrity": "sha512-WUjGcAqP1gQacoQe+OBJsFA7Ld4DyXuUIjZ5cc75cLHvJ7dtNsTugphxIADwspS+AraAUePCKrSVtPLFj/F88w==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/picocolors": {
			"version": "1.1.1",
			"resolved": "https://registry.npmjs.org/picocolors/-/picocolors-1.1.1.tgz",
			"integrity": "sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA==",
			"dev": true,
			"license": "ISC"
		},
		"node_modules/picomatch": {
			"version": "4.0.4",
			"resolved": "https://registry.npmjs.org/picomatch/-/picomatch-4.0.4.tgz",
			"integrity": "sha512-QP88BAKvMam/3NxH6vj2o21R6MjxZUAd6nlwAS/pnGvN9IVLocLHxGYIzFhg6fUQ+5th6P4dv4eW9jX3DSIj7A==",
			"license": "MIT",
			"engines": {
				"node": ">=12"
			},
			"funding": {
				"url": "https://github.com/sponsors/jonschlinkert"
			}
		},
		"node_modules/pify": {
			"version": "4.0.1",
			"resolved": "https://registry.npmjs.org/pify/-/pify-4.0.1.tgz",
			"integrity": "sha512-uB80kBFb/tfd68bVleG9T5GGsGPjJrLAUpR5PZIrhBnIaRTQRjqdJSsIKkOP6OAIFbj7GOrcudc5pNjZ+geV2g==",
			"dev": true,
			"license": "MIT",
			"optional": true,
			"engines": {
				"node": ">=6"
			}
		},
		"node_modules/piscina": {
			"version": "5.1.4",
			"resolved": "https://registry.npmjs.org/piscina/-/piscina-5.1.4.tgz",
			"integrity": "sha512-7uU4ZnKeQq22t9AsmHGD2w4OYQGonwFnTypDypaWi7Qr2EvQIFVtG8J5D/3bE7W123Wdc9+v4CZDu5hJXVCtBg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=20.x"
			},
			"optionalDependencies": {
				"@napi-rs/nice": "^1.0.4"
			}
		},
		"node_modules/pkce-challenge": {
			"version": "5.0.1",
			"resolved": "https://registry.npmjs.org/pkce-challenge/-/pkce-challenge-5.0.1.tgz",
			"integrity": "sha512-wQ0b/W4Fr01qtpHlqSqspcj3EhBvimsdh0KlHhH8HRZnMsEa0ea2fTULOXOS9ccQr3om+GcGRk4e+isrZWV8qQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=16.20.0"
			}
		},
		"node_modules/pkg-dir": {
			"version": "7.0.0",
			"resolved": "https://registry.npmjs.org/pkg-dir/-/pkg-dir-7.0.0.tgz",
			"integrity": "sha512-Ie9z/WINcxxLp27BKOCHGde4ITq9UklYKDzVo1nhk5sqGEXU3FpkwP5GM2voTGJkGd9B3Otl+Q4uwSOeSUtOBA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"find-up": "^6.3.0"
			},
			"engines": {
				"node": ">=14.16"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/pkg-dir/node_modules/find-up": {
			"version": "6.3.0",
			"resolved": "https://registry.npmjs.org/find-up/-/find-up-6.3.0.tgz",
			"integrity": "sha512-v2ZsoEuVHYy8ZIlYqwPe/39Cy+cFDzp4dXPaxNvkEuouymu+2Jbz0PxpKarJHYJTmv2HWT3O382qY8l4jMWthw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"locate-path": "^7.1.0",
				"path-exists": "^5.0.0"
			},
			"engines": {
				"node": "^12.20.0 || ^14.13.1 || >=16.0.0"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/pkg-dir/node_modules/locate-path": {
			"version": "7.2.0",
			"resolved": "https://registry.npmjs.org/locate-path/-/locate-path-7.2.0.tgz",
			"integrity": "sha512-gvVijfZvn7R+2qyPX8mAuKcFGDf6Nc61GdvGafQsHL0sBIxfKzA+usWn4GFC/bk+QdwPUD4kWFJLhElipq+0VA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"p-locate": "^6.0.0"
			},
			"engines": {
				"node": "^12.20.0 || ^14.13.1 || >=16.0.0"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/pkg-dir/node_modules/p-limit": {
			"version": "4.0.0",
			"resolved": "https://registry.npmjs.org/p-limit/-/p-limit-4.0.0.tgz",
			"integrity": "sha512-5b0R4txpzjPWVw/cXXUResoD4hb6U/x9BH08L7nw+GN1sezDzPdxeRvpc9c433fZhBan/wusjbCsqwqm4EIBIQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"yocto-queue": "^1.0.0"
			},
			"engines": {
				"node": "^12.20.0 || ^14.13.1 || >=16.0.0"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/pkg-dir/node_modules/p-locate": {
			"version": "6.0.0",
			"resolved": "https://registry.npmjs.org/p-locate/-/p-locate-6.0.0.tgz",
			"integrity": "sha512-wPrq66Llhl7/4AGC6I+cqxT07LhXvWL08LNXz1fENOw0Ap4sRZZ/gZpTTJ5jpurzzzfS2W/Ge9BY3LgLjCShcw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"p-limit": "^4.0.0"
			},
			"engines": {
				"node": "^12.20.0 || ^14.13.1 || >=16.0.0"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/pkg-dir/node_modules/path-exists": {
			"version": "5.0.0",
			"resolved": "https://registry.npmjs.org/path-exists/-/path-exists-5.0.0.tgz",
			"integrity": "sha512-RjhtfwJOxzcFmNOi6ltcbcu4Iu+FL3zEj83dk4kAS+fVpTxXLO1b38RvJgT/0QwvV/L3aY9TAnyv0EOqW4GoMQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": "^12.20.0 || ^14.13.1 || >=16.0.0"
			}
		},
		"node_modules/pkg-dir/node_modules/yocto-queue": {
			"version": "1.2.2",
			"resolved": "https://registry.npmjs.org/yocto-queue/-/yocto-queue-1.2.2.tgz",
			"integrity": "sha512-4LCcse/U2MHZ63HAJVE+v71o7yOdIe4cZ70Wpf8D/IyjDKYQLV5GD46B+hSTjJsvV5PztjvHoU580EftxjDZFQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=12.20"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/pkijs": {
			"version": "3.4.0",
			"resolved": "https://registry.npmjs.org/pkijs/-/pkijs-3.4.0.tgz",
			"integrity": "sha512-emEcLuomt2j03vxD54giVB4SxTjnsqkU692xZOZXHDVoYyypEm+b3jpiTcc+Cf+myooc+/Ly0z01jqeNHVgJGw==",
			"dev": true,
			"license": "BSD-3-Clause",
			"dependencies": {
				"@noble/hashes": "1.4.0",
				"asn1js": "^3.0.6",
				"bytestreamjs": "^2.0.1",
				"pvtsutils": "^1.3.6",
				"pvutils": "^1.1.3",
				"tslib": "^2.8.1"
			},
			"engines": {
				"node": ">=16.0.0"
			}
		},
		"node_modules/pkijs/node_modules/@noble/hashes": {
			"version": "1.4.0",
			"resolved": "https://registry.npmjs.org/@noble/hashes/-/hashes-1.4.0.tgz",
			"integrity": "sha512-V1JJ1WTRUqHHrOSh597hURcMqVKVGL/ea3kv0gSnEdsEZ0/+VyPghM1lMNGc00z7CIQorSvbKpuJkxvuHbvdbg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 16"
			},
			"funding": {
				"url": "https://paulmillr.com/funding/"
			}
		},
		"node_modules/portfinder": {
			"version": "1.0.38",
			"resolved": "https://registry.npmjs.org/portfinder/-/portfinder-1.0.38.tgz",
			"integrity": "sha512-rEwq/ZHlJIKw++XtLAO8PPuOQA/zaPJOZJ37BVuN97nLpMJeuDVLVGRwbFoBgLudgdTMP2hdRJP++H+8QOA3vg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"async": "^3.2.6",
				"debug": "^4.3.6"
			},
			"engines": {
				"node": ">= 10.12"
			}
		},
		"node_modules/postcss": {
			"version": "8.5.10",
			"resolved": "https://registry.npmjs.org/postcss/-/postcss-8.5.10.tgz",
			"integrity": "sha512-pMMHxBOZKFU6HgAZ4eyGnwXF/EvPGGqUr0MnZ5+99485wwW41kW91A4LOGxSHhgugZmSChL5AlElNdwlNgcnLQ==",
			"dev": true,
			"funding": [
				{
					"type": "opencollective",
					"url": "https://opencollective.com/postcss/"
				},
				{
					"type": "tidelift",
					"url": "https://tidelift.com/funding/github/npm/postcss"
				},
				{
					"type": "github",
					"url": "https://github.com/sponsors/ai"
				}
			],
			"license": "MIT",
			"dependencies": {
				"nanoid": "^3.3.11",
				"picocolors": "^1.1.1",
				"source-map-js": "^1.2.1"
			},
			"engines": {
				"node": "^10 || ^12 || >=14"
			}
		},
		"node_modules/postcss-calc": {
			"version": "10.1.1",
			"resolved": "https://registry.npmjs.org/postcss-calc/-/postcss-calc-10.1.1.tgz",
			"integrity": "sha512-NYEsLHh8DgG/PRH2+G9BTuUdtf9ViS+vdoQ0YA5OQdGsfN4ztiwtDWNtBl9EKeqNMFnIu8IKZ0cLxEQ5r5KVMw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"postcss-selector-parser": "^7.0.0",
				"postcss-value-parser": "^4.2.0"
			},
			"engines": {
				"node": "^18.12 || ^20.9 || >=22.0"
			},
			"peerDependencies": {
				"postcss": "^8.4.38"
			}
		},
		"node_modules/postcss-colormin": {
			"version": "7.0.9",
			"resolved": "https://registry.npmjs.org/postcss-colormin/-/postcss-colormin-7.0.9.tgz",
			"integrity": "sha512-EZpoUlmbXQUpe+g4ZaGM2kjGlHrQ7Bjzb3xHcNrC9ysI1tGoib6DAYvxg6aB7MGxsjgLF+Qx/jwZQkJ5cKDvXA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@colordx/core": "^5.2.0",
				"browserslist": "^4.28.2",
				"caniuse-api": "^3.0.0",
				"postcss-value-parser": "^4.2.0"
			},
			"engines": {
				"node": "^18.12.0 || ^20.9.0 || >=22.0"
			},
			"peerDependencies": {
				"postcss": "^8.5.10"
			}
		},
		"node_modules/postcss-convert-values": {
			"version": "7.0.11",
			"resolved": "https://registry.npmjs.org/postcss-convert-values/-/postcss-convert-values-7.0.11.tgz",
			"integrity": "sha512-H+s7P0f9jJylSysAHs3/5MhAx7GthDO05uw1h56L2xyEqpiLTFLEqBNw3PUYzD5p/AKwWaigCXf6FGELpOw9lw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"browserslist": "^4.28.2",
				"postcss-value-parser": "^4.2.0"
			},
			"engines": {
				"node": "^18.12.0 || ^20.9.0 || >=22.0"
			},
			"peerDependencies": {
				"postcss": "^8.5.10"
			}
		},
		"node_modules/postcss-discard-comments": {
			"version": "7.0.7",
			"resolved": "https://registry.npmjs.org/postcss-discard-comments/-/postcss-discard-comments-7.0.7.tgz",
			"integrity": "sha512-FJhE3fSte7HaRNL4iwD8LTG9vWqj3puxXIdig6LfrFqc1TJRUhY4kXOkeTXZZfTXYny+k+SO7fd2fymj1wduJg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"postcss-selector-parser": "^7.1.1"
			},
			"engines": {
				"node": "^18.12.0 || ^20.9.0 || >=22.0"
			},
			"peerDependencies": {
				"postcss": "^8.5.10"
			}
		},
		"node_modules/postcss-discard-duplicates": {
			"version": "7.0.3",
			"resolved": "https://registry.npmjs.org/postcss-discard-duplicates/-/postcss-discard-duplicates-7.0.3.tgz",
			"integrity": "sha512-9cRxXwhEM/aNZon1qZyToX4NmjbFbxOGbww+0CnbYFDbbPRGZ8jg4IbM8UlA+CzkXxM35itxyaHKNqBBg/RTDg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": "^18.12.0 || ^20.9.0 || >=22.0"
			},
			"peerDependencies": {
				"postcss": "^8.5.10"
			}
		},
		"node_modules/postcss-discard-empty": {
			"version": "7.0.2",
			"resolved": "https://registry.npmjs.org/postcss-discard-empty/-/postcss-discard-empty-7.0.2.tgz",
			"integrity": "sha512-NZFouOmOwtngJVgkNeI1LtkzFdYqIurxgy4wq3qNvIiXFURTZ3b/K7q3dP3QitlWQ5imHDQL0qSorItQhoxb1g==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": "^18.12.0 || ^20.9.0 || >=22.0"
			},
			"peerDependencies": {
				"postcss": "^8.5.10"
			}
		},
		"node_modules/postcss-discard-overridden": {
			"version": "7.0.2",
			"resolved": "https://registry.npmjs.org/postcss-discard-overridden/-/postcss-discard-overridden-7.0.2.tgz",
			"integrity": "sha512-Ym01X4v6U3sY8X0P1J9P+RTar+7JyLTOzDrxKSeaArFsLmkVu4KcAKPBWDYRIyZ/q4jwpSPnOnekeSSqXSXKUw==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": "^18.12.0 || ^20.9.0 || >=22.0"
			},
			"peerDependencies": {
				"postcss": "^8.5.10"
			}
		},
		"node_modules/postcss-import": {
			"version": "14.1.0",
			"resolved": "https://registry.npmjs.org/postcss-import/-/postcss-import-14.1.0.tgz",
			"integrity": "sha512-flwI+Vgm4SElObFVPpTIT7SU7R3qk2L7PyduMcokiaVKuWv9d/U+Gm/QAd8NDLuykTWTkcrjOeD2Pp1rMeBTGw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"postcss-value-parser": "^4.0.0",
				"read-cache": "^1.0.0",
				"resolve": "^1.1.7"
			},
			"engines": {
				"node": ">=10.0.0"
			},
			"peerDependencies": {
				"postcss": "^8.0.0"
			}
		},
		"node_modules/postcss-loader": {
			"version": "8.2.1",
			"resolved": "https://registry.npmjs.org/postcss-loader/-/postcss-loader-8.2.1.tgz",
			"integrity": "sha512-k98jtRzthjj3f76MYTs9JTpRqV1RaaMhEU0Lpw9OTmQZQdppg4B30VZ74BojuBHt3F4KyubHJoXCMUeM8Bqeow==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"cosmiconfig": "^9.0.0",
				"jiti": "^2.5.1",
				"semver": "^7.6.2"
			},
			"engines": {
				"node": ">= 18.12.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/webpack"
			},
			"peerDependencies": {
				"@rspack/core": "0.x || ^1.0.0 || ^2.0.0-0",
				"postcss": "^7.0.0 || ^8.0.1",
				"webpack": "^5.0.0"
			},
			"peerDependenciesMeta": {
				"@rspack/core": {
					"optional": true
				},
				"webpack": {
					"optional": true
				}
			}
		},
		"node_modules/postcss-loader/node_modules/cosmiconfig": {
			"version": "9.0.1",
			"resolved": "https://registry.npmjs.org/cosmiconfig/-/cosmiconfig-9.0.1.tgz",
			"integrity": "sha512-hr4ihw+DBqcvrsEDioRO31Z17x71pUYoNe/4h6Z0wB72p7MU7/9gH8Q3s12NFhHPfYBBOV3qyfUxmr/Yn3shnQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"env-paths": "^2.2.1",
				"import-fresh": "^3.3.0",
				"js-yaml": "^4.1.0",
				"parse-json": "^5.2.0"
			},
			"engines": {
				"node": ">=14"
			},
			"funding": {
				"url": "https://github.com/sponsors/d-fischer"
			},
			"peerDependencies": {
				"typescript": ">=4.9.5"
			},
			"peerDependenciesMeta": {
				"typescript": {
					"optional": true
				}
			}
		},
		"node_modules/postcss-loader/node_modules/js-yaml": {
			"version": "4.1.1",
			"resolved": "https://registry.npmjs.org/js-yaml/-/js-yaml-4.1.1.tgz",
			"integrity": "sha512-qQKT4zQxXl8lLwBtHMWwaTcGfFOZviOJet3Oy/xmGk2gZH677CJM9EvtfdSkgWcATZhj/55JZ0rmy3myCT5lsA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"argparse": "^2.0.1"
			},
			"bin": {
				"js-yaml": "bin/js-yaml.js"
			}
		},
		"node_modules/postcss-media-query-parser": {
			"version": "0.2.3",
			"resolved": "https://registry.npmjs.org/postcss-media-query-parser/-/postcss-media-query-parser-0.2.3.tgz",
			"integrity": "sha512-3sOlxmbKcSHMjlUXQZKQ06jOswE7oVkXPxmZdoB1r5l0q6gTFTQSHxNxOrCccElbW7dxNytifNEo8qidX2Vsig==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/postcss-merge-longhand": {
			"version": "7.0.6",
			"resolved": "https://registry.npmjs.org/postcss-merge-longhand/-/postcss-merge-longhand-7.0.6.tgz",
			"integrity": "sha512-lDsWeKRsssX/9vKFpingoRiuvGajtOGCJhs1kyaTJ5fzaVzs0aPPYe38UZ/ukMFEA5iuRIjQJHIkH2niYO3ubQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"postcss-value-parser": "^4.2.0",
				"stylehacks": "^7.0.10"
			},
			"engines": {
				"node": "^18.12.0 || ^20.9.0 || >=22.0"
			},
			"peerDependencies": {
				"postcss": "^8.5.10"
			}
		},
		"node_modules/postcss-merge-rules": {
			"version": "7.0.10",
			"resolved": "https://registry.npmjs.org/postcss-merge-rules/-/postcss-merge-rules-7.0.10.tgz",
			"integrity": "sha512-UXYKxkg8Cy1so/evF7AE/25PNXZb3E0SrvjdbtbGf+MW+doLenKqRLQzz6YZW469ktiXK2MVLFWtel/DftCV0Q==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"browserslist": "^4.28.2",
				"caniuse-api": "^3.0.0",
				"cssnano-utils": "^5.0.2",
				"postcss-selector-parser": "^7.1.1"
			},
			"engines": {
				"node": "^18.12.0 || ^20.9.0 || >=22.0"
			},
			"peerDependencies": {
				"postcss": "^8.5.10"
			}
		},
		"node_modules/postcss-minify-font-values": {
			"version": "7.0.2",
			"resolved": "https://registry.npmjs.org/postcss-minify-font-values/-/postcss-minify-font-values-7.0.2.tgz",
			"integrity": "sha512-Z82NUmnvhPrvMUaHfkaAVBmWQq9F8Dox4Dy0LiwbaTxfmDUWLQtS+0WCgKViwdWCPPajiY9YzoQftgqKdXkM5g==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"postcss-value-parser": "^4.2.0"
			},
			"engines": {
				"node": "^18.12.0 || ^20.9.0 || >=22.0"
			},
			"peerDependencies": {
				"postcss": "^8.5.10"
			}
		},
		"node_modules/postcss-minify-gradients": {
			"version": "7.0.4",
			"resolved": "https://registry.npmjs.org/postcss-minify-gradients/-/postcss-minify-gradients-7.0.4.tgz",
			"integrity": "sha512-g8MNeNyN+lbwKy8DCtJ6zU6awBL0InBsSOaKmgZ1MdRLVItLQUNFNAzzzBnOp4qowOcyyB6GetTlQ0/0UNXvag==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@colordx/core": "^5.2.0",
				"cssnano-utils": "^5.0.2",
				"postcss-value-parser": "^4.2.0"
			},
			"engines": {
				"node": "^18.12.0 || ^20.9.0 || >=22.0"
			},
			"peerDependencies": {
				"postcss": "^8.5.10"
			}
		},
		"node_modules/postcss-minify-params": {
			"version": "7.0.8",
			"resolved": "https://registry.npmjs.org/postcss-minify-params/-/postcss-minify-params-7.0.8.tgz",
			"integrity": "sha512-DIUKM5DZGTmxN7KFKT+rxt0FdPDmRrdK/k3n3+6Po+N/QYn06juwagHcfOVBG0CfCHwcnI612GAUCZc3eT+ZEg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"browserslist": "^4.28.2",
				"cssnano-utils": "^5.0.2",
				"postcss-value-parser": "^4.2.0"
			},
			"engines": {
				"node": "^18.12.0 || ^20.9.0 || >=22.0"
			},
			"peerDependencies": {
				"postcss": "^8.5.10"
			}
		},
		"node_modules/postcss-minify-selectors": {
			"version": "7.1.0",
			"resolved": "https://registry.npmjs.org/postcss-minify-selectors/-/postcss-minify-selectors-7.1.0.tgz",
			"integrity": "sha512-HYl/6I0aL+UvpA10t65BSa7h+tVjBgE6oRI5N/3ylX3vtwvlDL67G3FT3vYDPnTksxr0riiyJcT0tBtyRVoloA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"browserslist": "^4.28.1",
				"caniuse-api": "^3.0.0",
				"cssesc": "^3.0.0",
				"postcss-selector-parser": "^7.1.1"
			},
			"engines": {
				"node": "^18.12.0 || ^20.9.0 || >=22.0"
			},
			"peerDependencies": {
				"postcss": "^8.5.10"
			}
		},
		"node_modules/postcss-modules-extract-imports": {
			"version": "3.1.0",
			"resolved": "https://registry.npmjs.org/postcss-modules-extract-imports/-/postcss-modules-extract-imports-3.1.0.tgz",
			"integrity": "sha512-k3kNe0aNFQDAZGbin48pL2VNidTF0w4/eASDsxlyspobzU3wZQLOGj7L9gfRe0Jo9/4uud09DsjFNH7winGv8Q==",
			"dev": true,
			"license": "ISC",
			"engines": {
				"node": "^10 || ^12 || >= 14"
			},
			"peerDependencies": {
				"postcss": "^8.1.0"
			}
		},
		"node_modules/postcss-modules-local-by-default": {
			"version": "4.2.0",
			"resolved": "https://registry.npmjs.org/postcss-modules-local-by-default/-/postcss-modules-local-by-default-4.2.0.tgz",
			"integrity": "sha512-5kcJm/zk+GJDSfw+V/42fJ5fhjL5YbFDl8nVdXkJPLLW+Vf9mTD5Xe0wqIaDnLuL2U6cDNpTr+UQ+v2HWIBhzw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"icss-utils": "^5.0.0",
				"postcss-selector-parser": "^7.0.0",
				"postcss-value-parser": "^4.1.0"
			},
			"engines": {
				"node": "^10 || ^12 || >= 14"
			},
			"peerDependencies": {
				"postcss": "^8.1.0"
			}
		},
		"node_modules/postcss-modules-scope": {
			"version": "3.2.1",
			"resolved": "https://registry.npmjs.org/postcss-modules-scope/-/postcss-modules-scope-3.2.1.tgz",
			"integrity": "sha512-m9jZstCVaqGjTAuny8MdgE88scJnCiQSlSrOWcTQgM2t32UBe+MUmFSO5t7VMSfAf/FJKImAxBav8ooCHJXCJA==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"postcss-selector-parser": "^7.0.0"
			},
			"engines": {
				"node": "^10 || ^12 || >= 14"
			},
			"peerDependencies": {
				"postcss": "^8.1.0"
			}
		},
		"node_modules/postcss-modules-values": {
			"version": "4.0.0",
			"resolved": "https://registry.npmjs.org/postcss-modules-values/-/postcss-modules-values-4.0.0.tgz",
			"integrity": "sha512-RDxHkAiEGI78gS2ofyvCsu7iycRv7oqw5xMWn9iMoR0N/7mf9D50ecQqUo5BZ9Zh2vH4bCUR/ktCqbB9m8vJjQ==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"icss-utils": "^5.0.0"
			},
			"engines": {
				"node": "^10 || ^12 || >= 14"
			},
			"peerDependencies": {
				"postcss": "^8.1.0"
			}
		},
		"node_modules/postcss-normalize-charset": {
			"version": "7.0.2",
			"resolved": "https://registry.npmjs.org/postcss-normalize-charset/-/postcss-normalize-charset-7.0.2.tgz",
			"integrity": "sha512-YoINoiR4YKlzfB95Y93b0DSxWy7FLw+1SADIaznMHb88AKizpzfF80tolmiDEbYr1UM4r4Hw+NZq37SwT5f3uw==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": "^18.12.0 || ^20.9.0 || >=22.0"
			},
			"peerDependencies": {
				"postcss": "^8.5.10"
			}
		},
		"node_modules/postcss-normalize-display-values": {
			"version": "7.0.2",
			"resolved": "https://registry.npmjs.org/postcss-normalize-display-values/-/postcss-normalize-display-values-7.0.2.tgz",
			"integrity": "sha512-wu/NTSjnp8sX5TnEHVPN+eScjAtRs18ELtEduG+Ek3GxjeUDUT+VAA3PJjVIXBcVIk6fiLYFj2iKH0q99S3T2Q==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"postcss-value-parser": "^4.2.0"
			},
			"engines": {
				"node": "^18.12.0 || ^20.9.0 || >=22.0"
			},
			"peerDependencies": {
				"postcss": "^8.5.10"
			}
		},
		"node_modules/postcss-normalize-positions": {
			"version": "7.0.3",
			"resolved": "https://registry.npmjs.org/postcss-normalize-positions/-/postcss-normalize-positions-7.0.3.tgz",
			"integrity": "sha512-1CJI++oA3yK/fQlPUcEngUfcSWS08Pkt9fK+jVgL53mmtHDBHi0YiuB0m3D9BXwZjmfvCc2GQmFqCAF/CVcPzQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"postcss-value-parser": "^4.2.0"
			},
			"engines": {
				"node": "^18.12.0 || ^20.9.0 || >=22.0"
			},
			"peerDependencies": {
				"postcss": "^8.5.10"
			}
		},
		"node_modules/postcss-normalize-repeat-style": {
			"version": "7.0.3",
			"resolved": "https://registry.npmjs.org/postcss-normalize-repeat-style/-/postcss-normalize-repeat-style-7.0.3.tgz",
			"integrity": "sha512-RvImJ2Ml4LZSx31qC2C8LDiz65IgBNATtwEr9r3Aue+D0cCGbj4rjNojb/uGpEm4QxnOTzFqMvaDYuKiT1Cmpg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"postcss-value-parser": "^4.2.0"
			},
			"engines": {
				"node": "^18.12.0 || ^20.9.0 || >=22.0"
			},
			"peerDependencies": {
				"postcss": "^8.5.10"
			}
		},
		"node_modules/postcss-normalize-string": {
			"version": "7.0.2",
			"resolved": "https://registry.npmjs.org/postcss-normalize-string/-/postcss-normalize-string-7.0.2.tgz",
			"integrity": "sha512-FqtrUh2BU2MnVeLeWBbJ2rwOjuDnA91XvoImc1BbgMWIxdxiPTaquflBHsmFBA3xh3pC3wPZO9W5MaIc7wU/Xw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"postcss-value-parser": "^4.2.0"
			},
			"engines": {
				"node": "^18.12.0 || ^20.9.0 || >=22.0"
			},
			"peerDependencies": {
				"postcss": "^8.5.10"
			}
		},
		"node_modules/postcss-normalize-timing-functions": {
			"version": "7.0.2",
			"resolved": "https://registry.npmjs.org/postcss-normalize-timing-functions/-/postcss-normalize-timing-functions-7.0.2.tgz",
			"integrity": "sha512-5H5fpXBnMACEXzn7k9RP7qWZ1eWg8cuZkUuFygStY7icOj+UucwMWXeMmdkF/iITvTVa7fP85tdRCJeznpdFfQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"postcss-value-parser": "^4.2.0"
			},
			"engines": {
				"node": "^18.12.0 || ^20.9.0 || >=22.0"
			},
			"peerDependencies": {
				"postcss": "^8.5.10"
			}
		},
		"node_modules/postcss-normalize-unicode": {
			"version": "7.0.8",
			"resolved": "https://registry.npmjs.org/postcss-normalize-unicode/-/postcss-normalize-unicode-7.0.8.tgz",
			"integrity": "sha512-imCM3cwK3hvlAG4z1AzYM24m8BPA3/Jk/S71wfbn2I6+E2b+UwFaGvlNqydihXTSl3OFPeQXztqCzg+NGeSibQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"browserslist": "^4.28.2",
				"postcss-value-parser": "^4.2.0"
			},
			"engines": {
				"node": "^18.12.0 || ^20.9.0 || >=22.0"
			},
			"peerDependencies": {
				"postcss": "^8.5.10"
			}
		},
		"node_modules/postcss-normalize-url": {
			"version": "7.0.2",
			"resolved": "https://registry.npmjs.org/postcss-normalize-url/-/postcss-normalize-url-7.0.2.tgz",
			"integrity": "sha512-bLnNY7t76NLRb9QQyCVmCN4qwoHxiq6vABH/CXav9wTuR6dNGHGQ72AyO/+h2quWxZk3l7BqxNL1vtDi9H6y1g==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"postcss-value-parser": "^4.2.0"
			},
			"engines": {
				"node": "^18.12.0 || ^20.9.0 || >=22.0"
			},
			"peerDependencies": {
				"postcss": "^8.5.10"
			}
		},
		"node_modules/postcss-normalize-whitespace": {
			"version": "7.0.2",
			"resolved": "https://registry.npmjs.org/postcss-normalize-whitespace/-/postcss-normalize-whitespace-7.0.2.tgz",
			"integrity": "sha512-TNSVkuhkeOhl36WruQlflxOb7HweoeZowSusNpfsM1+ZvqJ24Mc+xksu05ecMQxlu+0zgI8pyznO2EWqDCQbLA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"postcss-value-parser": "^4.2.0"
			},
			"engines": {
				"node": "^18.12.0 || ^20.9.0 || >=22.0"
			},
			"peerDependencies": {
				"postcss": "^8.5.10"
			}
		},
		"node_modules/postcss-ordered-values": {
			"version": "7.0.3",
			"resolved": "https://registry.npmjs.org/postcss-ordered-values/-/postcss-ordered-values-7.0.3.tgz",
			"integrity": "sha512-FTt6R9RF7NAYfpOHa2XFPm89FVuo5GiIbcfwOXFy1MYF38BeiNW9ke8ybw9Pk62eEsUlRVVbxHWA3B7ERYqOOA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"cssnano-utils": "^5.0.2",
				"postcss-value-parser": "^4.2.0"
			},
			"engines": {
				"node": "^18.12.0 || ^20.9.0 || >=22.0"
			},
			"peerDependencies": {
				"postcss": "^8.5.10"
			}
		},
		"node_modules/postcss-reduce-initial": {
			"version": "7.0.8",
			"resolved": "https://registry.npmjs.org/postcss-reduce-initial/-/postcss-reduce-initial-7.0.8.tgz",
			"integrity": "sha512-VeVRmbgpgTZuRcDQdqnsB4iYTeS2dBRV07UdwK6V3x61F1xTQ2pgIzHBIR4rQYRlXRNKBTGYYhEL1eNA7w9vaQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"browserslist": "^4.28.2",
				"caniuse-api": "^3.0.0"
			},
			"engines": {
				"node": "^18.12.0 || ^20.9.0 || >=22.0"
			},
			"peerDependencies": {
				"postcss": "^8.5.10"
			}
		},
		"node_modules/postcss-reduce-transforms": {
			"version": "7.0.2",
			"resolved": "https://registry.npmjs.org/postcss-reduce-transforms/-/postcss-reduce-transforms-7.0.2.tgz",
			"integrity": "sha512-OV5P9hMnf7kEkeXVXyS5ESqxbIls7a3TqFymUAV5JICO/9YCBEU+QQhQjZiDHaLwFdV7/CL481kVeBUk5FdY3w==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"postcss-value-parser": "^4.2.0"
			},
			"engines": {
				"node": "^18.12.0 || ^20.9.0 || >=22.0"
			},
			"peerDependencies": {
				"postcss": "^8.5.10"
			}
		},
		"node_modules/postcss-safe-parser": {
			"version": "7.0.1",
			"resolved": "https://registry.npmjs.org/postcss-safe-parser/-/postcss-safe-parser-7.0.1.tgz",
			"integrity": "sha512-0AioNCJZ2DPYz5ABT6bddIqlhgwhpHZ/l65YAYo0BCIn0xiDpsnTHz0gnoTGk0OXZW0JRs+cDwL8u/teRdz+8A==",
			"dev": true,
			"funding": [
				{
					"type": "opencollective",
					"url": "https://opencollective.com/postcss/"
				},
				{
					"type": "tidelift",
					"url": "https://tidelift.com/funding/github/npm/postcss-safe-parser"
				},
				{
					"type": "github",
					"url": "https://github.com/sponsors/ai"
				}
			],
			"license": "MIT",
			"engines": {
				"node": ">=18.0"
			},
			"peerDependencies": {
				"postcss": "^8.4.31"
			}
		},
		"node_modules/postcss-selector-parser": {
			"version": "7.1.1",
			"resolved": "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-7.1.1.tgz",
			"integrity": "sha512-orRsuYpJVw8LdAwqqLykBj9ecS5/cRHlI5+nvTo8LcCKmzDmqVORXtOIYEEQuL9D4BxtA1lm5isAqzQZCoQ6Eg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"cssesc": "^3.0.0",
				"util-deprecate": "^1.0.2"
			},
			"engines": {
				"node": ">=4"
			}
		},
		"node_modules/postcss-svgo": {
			"version": "7.1.2",
			"resolved": "https://registry.npmjs.org/postcss-svgo/-/postcss-svgo-7.1.2.tgz",
			"integrity": "sha512-ixExc8m+/68yuSYQzV/1DgtTup/7nI2dN9eiDS5GMRUzeCH4q9UcqeZPwcSVhdf8ay9fRwXDUHwcY5/XzQSszQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"postcss-value-parser": "^4.2.0",
				"svgo": "^4.0.1"
			},
			"engines": {
				"node": "^18.12.0 || ^20.9.0 || >= 18"
			},
			"peerDependencies": {
				"postcss": "^8.5.10"
			}
		},
		"node_modules/postcss-unique-selectors": {
			"version": "7.0.6",
			"resolved": "https://registry.npmjs.org/postcss-unique-selectors/-/postcss-unique-selectors-7.0.6.tgz",
			"integrity": "sha512-cDxnYw1QuBMW5w3svZ0BlYF0IA4Amr+1JoTLXzu6vDFPNwohN2QU+sPZNx15b930LR7ce+/600h28/cYoxO9vw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"postcss-selector-parser": "^7.1.1"
			},
			"engines": {
				"node": "^18.12.0 || ^20.9.0 || >=22.0"
			},
			"peerDependencies": {
				"postcss": "^8.5.10"
			}
		},
		"node_modules/postcss-value-parser": {
			"version": "4.2.0",
			"resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-4.2.0.tgz",
			"integrity": "sha512-1NNCs6uurfkVbeXG4S8JFT9t19m45ICnif8zWLd5oPSZ50QnwMfK+H3jv408d4jw/7Bttv5axS5IiHoLaVNHeQ==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/prelude-ls": {
			"version": "1.2.1",
			"resolved": "https://registry.npmjs.org/prelude-ls/-/prelude-ls-1.2.1.tgz",
			"integrity": "sha512-vkcDPrRZo1QZLbn5RLGPpg/WmIQ65qoWWhcGKf/b5eplkkarX0m9z8ppCat4mlOqUsWpyNuYgO3VRyrYHSzX5g==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.8.0"
			}
		},
		"node_modules/prettier": {
			"version": "3.8.1",
			"resolved": "https://registry.npmjs.org/prettier/-/prettier-3.8.1.tgz",
			"integrity": "sha512-UOnG6LftzbdaHZcKoPFtOcCKztrQ57WkHDeRD9t/PTQtmT0NHSeWWepj6pS0z/N7+08BHFDQVUrfmfMRcZwbMg==",
			"dev": true,
			"license": "MIT",
			"bin": {
				"prettier": "bin/prettier.cjs"
			},
			"engines": {
				"node": ">=14"
			},
			"funding": {
				"url": "https://github.com/prettier/prettier?sponsor=1"
			}
		},
		"node_modules/prettier-linter-helpers": {
			"version": "1.0.1",
			"resolved": "https://registry.npmjs.org/prettier-linter-helpers/-/prettier-linter-helpers-1.0.1.tgz",
			"integrity": "sha512-SxToR7P8Y2lWmv/kTzVLC1t/GDI2WGjMwNhLLE9qtH8Q13C+aEmuRlzDst4Up4s0Wc8sF2M+J57iB3cMLqftfg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"fast-diff": "^1.1.2"
			},
			"engines": {
				"node": ">=6.0.0"
			}
		},
		"node_modules/prettier-plugin-tailwindcss": {
			"version": "0.7.2",
			"resolved": "https://registry.npmjs.org/prettier-plugin-tailwindcss/-/prettier-plugin-tailwindcss-0.7.2.tgz",
			"integrity": "sha512-LkphyK3Fw+q2HdMOoiEHWf93fNtYJwfamoKPl7UwtjFQdei/iIBoX11G6j706FzN3ymX9mPVi97qIY8328vdnA==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=20.19"
			},
			"peerDependencies": {
				"@ianvs/prettier-plugin-sort-imports": "*",
				"@prettier/plugin-hermes": "*",
				"@prettier/plugin-oxc": "*",
				"@prettier/plugin-pug": "*",
				"@shopify/prettier-plugin-liquid": "*",
				"@trivago/prettier-plugin-sort-imports": "*",
				"@zackad/prettier-plugin-twig": "*",
				"prettier": "^3.0",
				"prettier-plugin-astro": "*",
				"prettier-plugin-css-order": "*",
				"prettier-plugin-jsdoc": "*",
				"prettier-plugin-marko": "*",
				"prettier-plugin-multiline-arrays": "*",
				"prettier-plugin-organize-attributes": "*",
				"prettier-plugin-organize-imports": "*",
				"prettier-plugin-sort-imports": "*",
				"prettier-plugin-svelte": "*"
			},
			"peerDependenciesMeta": {
				"@ianvs/prettier-plugin-sort-imports": {
					"optional": true
				},
				"@prettier/plugin-hermes": {
					"optional": true
				},
				"@prettier/plugin-oxc": {
					"optional": true
				},
				"@prettier/plugin-pug": {
					"optional": true
				},
				"@shopify/prettier-plugin-liquid": {
					"optional": true
				},
				"@trivago/prettier-plugin-sort-imports": {
					"optional": true
				},
				"@zackad/prettier-plugin-twig": {
					"optional": true
				},
				"prettier-plugin-astro": {
					"optional": true
				},
				"prettier-plugin-css-order": {
					"optional": true
				},
				"prettier-plugin-jsdoc": {
					"optional": true
				},
				"prettier-plugin-marko": {
					"optional": true
				},
				"prettier-plugin-multiline-arrays": {
					"optional": true
				},
				"prettier-plugin-organize-attributes": {
					"optional": true
				},
				"prettier-plugin-organize-imports": {
					"optional": true
				},
				"prettier-plugin-sort-imports": {
					"optional": true
				},
				"prettier-plugin-svelte": {
					"optional": true
				}
			}
		},
		"node_modules/pretty-format": {
			"version": "30.3.0",
			"resolved": "https://registry.npmjs.org/pretty-format/-/pretty-format-30.3.0.tgz",
			"integrity": "sha512-oG4T3wCbfeuvljnyAzhBvpN45E8iOTXCU/TD3zXW80HA3dQ4ahdqMkWGiPWZvjpQwlbyHrPTWUAqUzGzv4l1JQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@jest/schemas": "30.0.5",
				"ansi-styles": "^5.2.0",
				"react-is": "^18.3.1"
			},
			"engines": {
				"node": "^18.14.0 || ^20.0.0 || ^22.0.0 || >=24.0.0"
			}
		},
		"node_modules/pretty-format/node_modules/ansi-styles": {
			"version": "5.2.0",
			"resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-5.2.0.tgz",
			"integrity": "sha512-Cxwpt2SfTzTtXcfOlzGEee8O+c+MmUgGrNiBcXnuWxuFJHe6a5Hz7qwhwe5OgaSYI0IJvkLqWX1ASG+cJOkEiA==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=10"
			},
			"funding": {
				"url": "https://github.com/chalk/ansi-styles?sponsor=1"
			}
		},
		"node_modules/proc-log": {
			"version": "6.1.0",
			"resolved": "https://registry.npmjs.org/proc-log/-/proc-log-6.1.0.tgz",
			"integrity": "sha512-iG+GYldRf2BQ0UDUAd6JQ/RwzaQy6mXmsk/IzlYyal4A4SNFw54MeH4/tLkF4I5WoWG9SQwuqWzS99jaFQHBuQ==",
			"dev": true,
			"license": "ISC",
			"engines": {
				"node": "^20.17.0 || >=22.9.0"
			}
		},
		"node_modules/process-nextick-args": {
			"version": "2.0.1",
			"resolved": "https://registry.npmjs.org/process-nextick-args/-/process-nextick-args-2.0.1.tgz",
			"integrity": "sha512-3ouUOpQhtgrbOa17J7+uxOTpITYWaGP7/AhoR3+A+/1e9skrzelGi/dXzEYyvbxubEF6Wn2ypscTKiKJFFn1ag==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/promise-retry": {
			"version": "2.0.1",
			"resolved": "https://registry.npmjs.org/promise-retry/-/promise-retry-2.0.1.tgz",
			"integrity": "sha512-y+WKFlBR8BGXnsNlIHFGPZmyDf3DFMoLhaflAnyZgV6rG6xu+JwesTo2Q9R6XwYmtmwAFCkAk3e35jEdoeh/3g==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"err-code": "^2.0.2",
				"retry": "^0.12.0"
			},
			"engines": {
				"node": ">=10"
			}
		},
		"node_modules/proxy-addr": {
			"version": "2.0.7",
			"resolved": "https://registry.npmjs.org/proxy-addr/-/proxy-addr-2.0.7.tgz",
			"integrity": "sha512-llQsMLSUDUPT44jdrU/O37qlnifitDP+ZwrmmZcoSKyLKvtZxpyV0n2/bD/N4tBAAZ/gJEdZU7KMraoK1+XYAg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"forwarded": "0.2.0",
				"ipaddr.js": "1.9.1"
			},
			"engines": {
				"node": ">= 0.10"
			}
		},
		"node_modules/proxy-from-env": {
			"version": "2.1.0",
			"resolved": "https://registry.npmjs.org/proxy-from-env/-/proxy-from-env-2.1.0.tgz",
			"integrity": "sha512-cJ+oHTW1VAEa8cJslgmUZrc+sjRKgAKl3Zyse6+PV38hZe/V6Z14TbCuXcan9F9ghlz4QrFr2c92TNF82UkYHA==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=10"
			}
		},
		"node_modules/prr": {
			"version": "1.0.1",
			"resolved": "https://registry.npmjs.org/prr/-/prr-1.0.1.tgz",
			"integrity": "sha512-yPw4Sng1gWghHQWj0B3ZggWUm4qVbPwPFcRG8KyxiU7J2OHFSoEHKS+EZ3fv5l1t9CyCiop6l/ZYeWbrgoQejw==",
			"dev": true,
			"license": "MIT",
			"optional": true
		},
		"node_modules/punycode": {
			"version": "2.3.1",
			"resolved": "https://registry.npmjs.org/punycode/-/punycode-2.3.1.tgz",
			"integrity": "sha512-vYt7UD1U9Wg6138shLtLOvdAu+8DsC/ilFtEVHcH+wydcSpNE20AfSOduf6MkRFahL5FY7X1oU7nKVZFtfq8Fg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=6"
			}
		},
		"node_modules/pvtsutils": {
			"version": "1.3.6",
			"resolved": "https://registry.npmjs.org/pvtsutils/-/pvtsutils-1.3.6.tgz",
			"integrity": "sha512-PLgQXQ6H2FWCaeRak8vvk1GW462lMxB5s3Jm673N82zI4vqtVUPuZdffdZbPDFRoU8kAhItWFtPCWiPpp4/EDg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"tslib": "^2.8.1"
			}
		},
		"node_modules/pvutils": {
			"version": "1.1.5",
			"resolved": "https://registry.npmjs.org/pvutils/-/pvutils-1.1.5.tgz",
			"integrity": "sha512-KTqnxsgGiQ6ZAzZCVlJH5eOjSnvlyEgx1m8bkRJfOhmGRqfo5KLvmAlACQkrjEtOQ4B7wF9TdSLIs9O90MX9xA==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=16.0.0"
			}
		},
		"node_modules/qs": {
			"version": "6.15.0",
			"resolved": "https://registry.npmjs.org/qs/-/qs-6.15.0.tgz",
			"integrity": "sha512-mAZTtNCeetKMH+pSjrb76NAM8V9a05I9aBZOHztWy/UqcJdQYNsf59vrRKWnojAT9Y+GbIvoTBC++CPHqpDBhQ==",
			"dev": true,
			"license": "BSD-3-Clause",
			"dependencies": {
				"side-channel": "^1.1.0"
			},
			"engines": {
				"node": ">=0.6"
			},
			"funding": {
				"url": "https://github.com/sponsors/ljharb"
			}
		},
		"node_modules/queue-microtask": {
			"version": "1.2.3",
			"resolved": "https://registry.npmjs.org/queue-microtask/-/queue-microtask-1.2.3.tgz",
			"integrity": "sha512-NuaNSa6flKT5JaSYQzJok04JzTL1CA6aGhv5rfLW3PgqA+M2ChpZQnAC8h8i4ZFkBS8X5RqkDBHA7r4hej3K9A==",
			"dev": true,
			"funding": [
				{
					"type": "github",
					"url": "https://github.com/sponsors/feross"
				},
				{
					"type": "patreon",
					"url": "https://www.patreon.com/feross"
				},
				{
					"type": "consulting",
					"url": "https://feross.org/support"
				}
			],
			"license": "MIT"
		},
		"node_modules/range-parser": {
			"version": "1.2.1",
			"resolved": "https://registry.npmjs.org/range-parser/-/range-parser-1.2.1.tgz",
			"integrity": "sha512-Hrgsx+orqoygnmhFbKaHE6c296J+HTAQXoxEF6gNupROmmGJRoyzfG3ccAveqCBrwr/2yxQ5BVd/GTl5agOwSg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/raw-body": {
			"version": "3.0.2",
			"resolved": "https://registry.npmjs.org/raw-body/-/raw-body-3.0.2.tgz",
			"integrity": "sha512-K5zQjDllxWkf7Z5xJdV0/B0WTNqx6vxG70zJE4N0kBs4LovmEYWJzQGxC9bS9RAKu3bgM40lrd5zoLJ12MQ5BA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"bytes": "~3.1.2",
				"http-errors": "~2.0.1",
				"iconv-lite": "~0.7.0",
				"unpipe": "~1.0.0"
			},
			"engines": {
				"node": ">= 0.10"
			}
		},
		"node_modules/react-is": {
			"version": "18.3.1",
			"resolved": "https://registry.npmjs.org/react-is/-/react-is-18.3.1.tgz",
			"integrity": "sha512-/LLMVyas0ljjAtoYiPqYiL8VWXzUUdThrmU5+n20DZv+a+ClRoevUzw5JxU+Ieh5/c87ytoTBV9G1FiKfNJdmg==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/react-refresh": {
			"version": "0.18.0",
			"resolved": "https://registry.npmjs.org/react-refresh/-/react-refresh-0.18.0.tgz",
			"integrity": "sha512-QgT5//D3jfjJb6Gsjxv0Slpj23ip+HtOpnNgnb2S5zU3CB26G/IDPGoy4RJB42wzFE46DRsstbW6tKHoKbhAxw==",
			"dev": true,
			"license": "MIT",
			"peer": true,
			"engines": {
				"node": ">=0.10.0"
			}
		},
		"node_modules/read-cache": {
			"version": "1.0.0",
			"resolved": "https://registry.npmjs.org/read-cache/-/read-cache-1.0.0.tgz",
			"integrity": "sha512-Owdv/Ft7IjOgm/i0xvNDZ1LrRANRfew4b2prF3OWMQLxLfu3bS8FVhCsrSCMK4lR56Y9ya+AThoTpDCTxCmpRA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"pify": "^2.3.0"
			}
		},
		"node_modules/read-cache/node_modules/pify": {
			"version": "2.3.0",
			"resolved": "https://registry.npmjs.org/pify/-/pify-2.3.0.tgz",
			"integrity": "sha512-udgsAY+fTnvv7kI7aaxbqwWNb0AHiB0qBO89PZKPkoTmGOgdbrHDKD+0B2X4uTfJ/FT1R09r9gTsjUjNJotuog==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=0.10.0"
			}
		},
		"node_modules/readable-stream": {
			"version": "3.6.2",
			"resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-3.6.2.tgz",
			"integrity": "sha512-9u/sniCrY3D5WdsERHzHE4G2YCXqoG5FTHUiCC4SIbr6XcLZBY05ya9EKjYek9O5xOAwjGq+1JdGBAS7Q9ScoA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"inherits": "^2.0.3",
				"string_decoder": "^1.1.1",
				"util-deprecate": "^1.0.1"
			},
			"engines": {
				"node": ">= 6"
			}
		},
		"node_modules/readdirp": {
			"version": "5.0.0",
			"resolved": "https://registry.npmjs.org/readdirp/-/readdirp-5.0.0.tgz",
			"integrity": "sha512-9u/XQ1pvrQtYyMpZe7DXKv2p5CNvyVwzUB6uhLAnQwHMSgKMBR62lc7AHljaeteeHXn11XTAaLLUVZYVZyuRBQ==",
			"devOptional": true,
			"license": "MIT",
			"engines": {
				"node": ">= 20.19.0"
			},
			"funding": {
				"type": "individual",
				"url": "https://paulmillr.com/funding/"
			}
		},
		"node_modules/reflect-metadata": {
			"version": "0.2.2",
			"resolved": "https://registry.npmjs.org/reflect-metadata/-/reflect-metadata-0.2.2.tgz",
			"integrity": "sha512-urBwgfrvVP/eAyXx4hluJivBKzuEbSQs9rKWCrCkbSxNv8mxPcUZKeuoF3Uy4mJl3Lwprp6yy5/39VWigZ4K6Q==",
			"dev": true,
			"license": "Apache-2.0"
		},
		"node_modules/regenerate": {
			"version": "1.4.2",
			"resolved": "https://registry.npmjs.org/regenerate/-/regenerate-1.4.2.tgz",
			"integrity": "sha512-zrceR/XhGYU/d/opr2EKO7aRHUeiBI8qjtfHqADTwZd6Szfy16la6kqD0MIUs5z5hx6AaKa+PixpPrR289+I0A==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/regenerate-unicode-properties": {
			"version": "10.2.2",
			"resolved": "https://registry.npmjs.org/regenerate-unicode-properties/-/regenerate-unicode-properties-10.2.2.tgz",
			"integrity": "sha512-m03P+zhBeQd1RGnYxrGyDAPpWX/epKirLrp8e3qevZdVkKtnCrjjWczIbYc8+xd6vcTStVlqfycTx1KR4LOr0g==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"regenerate": "^1.4.2"
			},
			"engines": {
				"node": ">=4"
			}
		},
		"node_modules/regexpu-core": {
			"version": "6.4.0",
			"resolved": "https://registry.npmjs.org/regexpu-core/-/regexpu-core-6.4.0.tgz",
			"integrity": "sha512-0ghuzq67LI9bLXpOX/ISfve/Mq33a4aFRzoQYhnnok1JOFpmE/A2TBGkNVenOGEeSBCjIiWcc6MVOG5HEQv0sA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"regenerate": "^1.4.2",
				"regenerate-unicode-properties": "^10.2.2",
				"regjsgen": "^0.8.0",
				"regjsparser": "^0.13.0",
				"unicode-match-property-ecmascript": "^2.0.0",
				"unicode-match-property-value-ecmascript": "^2.2.1"
			},
			"engines": {
				"node": ">=4"
			}
		},
		"node_modules/regjsgen": {
			"version": "0.8.0",
			"resolved": "https://registry.npmjs.org/regjsgen/-/regjsgen-0.8.0.tgz",
			"integrity": "sha512-RvwtGe3d7LvWiDQXeQw8p5asZUmfU1G/l6WbUXeHta7Y2PEIvBTwH6E2EfmYUK8pxcxEdEmaomqyp0vZZ7C+3Q==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/regjsparser": {
			"version": "0.13.1",
			"resolved": "https://registry.npmjs.org/regjsparser/-/regjsparser-0.13.1.tgz",
			"integrity": "sha512-dLsljMd9sqwRkby8zhO1gSg3PnJIBFid8f4CQj/sXx+7cKx+E7u0PKhZ+U4wmhx7EfmtvnA318oVaIkAB1lRJw==",
			"dev": true,
			"license": "BSD-2-Clause",
			"dependencies": {
				"jsesc": "~3.1.0"
			},
			"bin": {
				"regjsparser": "bin/parser"
			}
		},
		"node_modules/require-directory": {
			"version": "2.1.1",
			"resolved": "https://registry.npmjs.org/require-directory/-/require-directory-2.1.1.tgz",
			"integrity": "sha512-fGxEI7+wsG9xrvdjsrlmL22OMTTiHRwAMroiEeMgq8gzoLC/PQr7RsRDSTLUg/bZAZtF+TVIkHc6/4RIKrui+Q==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=0.10.0"
			}
		},
		"node_modules/require-from-string": {
			"version": "2.0.2",
			"resolved": "https://registry.npmjs.org/require-from-string/-/require-from-string-2.0.2.tgz",
			"integrity": "sha512-Xf0nWe6RseziFMu+Ap9biiUbmplq6S9/p+7w7YXP/JBHhrUDDUhwa+vANyubuqfZWTveU//DYVGsDG7RKL/vEw==",
			"license": "MIT",
			"engines": {
				"node": ">=0.10.0"
			}
		},
		"node_modules/requires-port": {
			"version": "1.0.0",
			"resolved": "https://registry.npmjs.org/requires-port/-/requires-port-1.0.0.tgz",
			"integrity": "sha512-KigOCHcocU3XODJxsu8i/j8T9tzT4adHiecwORRQ0ZZFcp7ahwXuRU1m+yuO90C5ZUyGeGfocHDI14M3L3yDAQ==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/resolve": {
			"version": "1.22.12",
			"resolved": "https://registry.npmjs.org/resolve/-/resolve-1.22.12.tgz",
			"integrity": "sha512-TyeJ1zif53BPfHootBGwPRYT1RUt6oGWsaQr8UyZW/eAm9bKoijtvruSDEmZHm92CwS9nj7/fWttqPCgzep8CA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"es-errors": "^1.3.0",
				"is-core-module": "^2.16.1",
				"path-parse": "^1.0.7",
				"supports-preserve-symlinks-flag": "^1.0.0"
			},
			"bin": {
				"resolve": "bin/resolve"
			},
			"engines": {
				"node": ">= 0.4"
			},
			"funding": {
				"url": "https://github.com/sponsors/ljharb"
			}
		},
		"node_modules/resolve-dir": {
			"version": "1.0.1",
			"resolved": "https://registry.npmjs.org/resolve-dir/-/resolve-dir-1.0.1.tgz",
			"integrity": "sha512-R7uiTjECzvOsWSfdM0QKFNBVFcK27aHOUwdvK53BcW8zqnGdYp0Fbj82cy54+2A4P2tFM22J5kRfe1R+lM/1yg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"expand-tilde": "^2.0.0",
				"global-modules": "^1.0.0"
			},
			"engines": {
				"node": ">=0.10.0"
			}
		},
		"node_modules/resolve-from": {
			"version": "4.0.0",
			"resolved": "https://registry.npmjs.org/resolve-from/-/resolve-from-4.0.0.tgz",
			"integrity": "sha512-pb/MYmXstAkysRFx8piNI1tGFNQIFA3vkE3Gq4EuA1dF6gHp/+vgZqsCGJapvy8N3Q+4o7FwvquPJcnZ7RYy4g==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=4"
			}
		},
		"node_modules/resolve.exports": {
			"version": "2.0.3",
			"resolved": "https://registry.npmjs.org/resolve.exports/-/resolve.exports-2.0.3.tgz",
			"integrity": "sha512-OcXjMsGdhL4XnbShKpAcSqPMzQoYkYyhbEaeSko47MjRP9NfEQMhZkXL1DoFlt9LWQn4YttrdnV6X2OiyzBi+A==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=10"
			}
		},
		"node_modules/restore-cursor": {
			"version": "5.1.0",
			"resolved": "https://registry.npmjs.org/restore-cursor/-/restore-cursor-5.1.0.tgz",
			"integrity": "sha512-oMA2dcrw6u0YfxJQXm342bFKX/E4sG9rbTzO9ptUcR/e8A33cHuvStiYOwH7fszkZlZ1z/ta9AAoPk2F4qIOHA==",
			"license": "MIT",
			"dependencies": {
				"onetime": "^7.0.0",
				"signal-exit": "^4.1.0"
			},
			"engines": {
				"node": ">=18"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/retry": {
			"version": "0.12.0",
			"resolved": "https://registry.npmjs.org/retry/-/retry-0.12.0.tgz",
			"integrity": "sha512-9LkiTwjUh6rT555DtE9rTX+BKByPfrMzEAtnlEtdEwr3Nkffwiihqe2bWADg+OQRjt9gl6ICdmB/ZFDCGAtSow==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 4"
			}
		},
		"node_modules/rettime": {
			"version": "0.10.1",
			"resolved": "https://registry.npmjs.org/rettime/-/rettime-0.10.1.tgz",
			"integrity": "sha512-uyDrIlUEH37cinabq0AX4QbgV4HbFZ/gqoiunWQ1UqBtRvTTytwhNYjE++pO/MjPTZL5KQCf2bEoJ/BJNVQ5Kw==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/reusify": {
			"version": "1.1.0",
			"resolved": "https://registry.npmjs.org/reusify/-/reusify-1.1.0.tgz",
			"integrity": "sha512-g6QUff04oZpHs0eG5p83rFLhHeV00ug/Yf9nZM6fLeUrPguBTkTQOdpAWWspMh55TZfVQDPaN3NQJfbVRAxdIw==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"iojs": ">=1.0.0",
				"node": ">=0.10.0"
			}
		},
		"node_modules/rfdc": {
			"version": "1.4.1",
			"resolved": "https://registry.npmjs.org/rfdc/-/rfdc-1.4.1.tgz",
			"integrity": "sha512-q1b3N5QkRUWUl7iyylaaj3kOpIT0N2i9MqIEQXP73GVsN9cw3fdx8X63cEmWhJGi2PPCF23Ijp7ktmd39rawIA==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/rolldown": {
			"version": "1.0.0-rc.4",
			"resolved": "https://registry.npmjs.org/rolldown/-/rolldown-1.0.0-rc.4.tgz",
			"integrity": "sha512-V2tPDUrY3WSevrvU2E41ijZlpF+5PbZu4giH+VpNraaadsJGHa4fR6IFwsocVwEXDoAdIv5qgPPxgrvKAOIPtA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@oxc-project/types": "=0.113.0",
				"@rolldown/pluginutils": "1.0.0-rc.4"
			},
			"bin": {
				"rolldown": "bin/cli.mjs"
			},
			"engines": {
				"node": "^20.19.0 || >=22.12.0"
			},
			"optionalDependencies": {
				"@rolldown/binding-android-arm64": "1.0.0-rc.4",
				"@rolldown/binding-darwin-arm64": "1.0.0-rc.4",
				"@rolldown/binding-darwin-x64": "1.0.0-rc.4",
				"@rolldown/binding-freebsd-x64": "1.0.0-rc.4",
				"@rolldown/binding-linux-arm-gnueabihf": "1.0.0-rc.4",
				"@rolldown/binding-linux-arm64-gnu": "1.0.0-rc.4",
				"@rolldown/binding-linux-arm64-musl": "1.0.0-rc.4",
				"@rolldown/binding-linux-x64-gnu": "1.0.0-rc.4",
				"@rolldown/binding-linux-x64-musl": "1.0.0-rc.4",
				"@rolldown/binding-openharmony-arm64": "1.0.0-rc.4",
				"@rolldown/binding-wasm32-wasi": "1.0.0-rc.4",
				"@rolldown/binding-win32-arm64-msvc": "1.0.0-rc.4",
				"@rolldown/binding-win32-x64-msvc": "1.0.0-rc.4"
			}
		},
		"node_modules/rollup": {
			"version": "4.60.1",
			"resolved": "https://registry.npmjs.org/rollup/-/rollup-4.60.1.tgz",
			"integrity": "sha512-VmtB2rFU/GroZ4oL8+ZqXgSA38O6GR8KSIvWmEFv63pQ0G6KaBH9s07PO8XTXP4vI+3UJUEypOfjkGfmSBBR0w==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@types/estree": "1.0.8"
			},
			"bin": {
				"rollup": "dist/bin/rollup"
			},
			"engines": {
				"node": ">=18.0.0",
				"npm": ">=8.0.0"
			},
			"optionalDependencies": {
				"@rollup/rollup-android-arm-eabi": "4.60.1",
				"@rollup/rollup-android-arm64": "4.60.1",
				"@rollup/rollup-darwin-arm64": "4.60.1",
				"@rollup/rollup-darwin-x64": "4.60.1",
				"@rollup/rollup-freebsd-arm64": "4.60.1",
				"@rollup/rollup-freebsd-x64": "4.60.1",
				"@rollup/rollup-linux-arm-gnueabihf": "4.60.1",
				"@rollup/rollup-linux-arm-musleabihf": "4.60.1",
				"@rollup/rollup-linux-arm64-gnu": "4.60.1",
				"@rollup/rollup-linux-arm64-musl": "4.60.1",
				"@rollup/rollup-linux-loong64-gnu": "4.60.1",
				"@rollup/rollup-linux-loong64-musl": "4.60.1",
				"@rollup/rollup-linux-ppc64-gnu": "4.60.1",
				"@rollup/rollup-linux-ppc64-musl": "4.60.1",
				"@rollup/rollup-linux-riscv64-gnu": "4.60.1",
				"@rollup/rollup-linux-riscv64-musl": "4.60.1",
				"@rollup/rollup-linux-s390x-gnu": "4.60.1",
				"@rollup/rollup-linux-x64-gnu": "4.60.1",
				"@rollup/rollup-linux-x64-musl": "4.60.1",
				"@rollup/rollup-openbsd-x64": "4.60.1",
				"@rollup/rollup-openharmony-arm64": "4.60.1",
				"@rollup/rollup-win32-arm64-msvc": "4.60.1",
				"@rollup/rollup-win32-ia32-msvc": "4.60.1",
				"@rollup/rollup-win32-x64-gnu": "4.60.1",
				"@rollup/rollup-win32-x64-msvc": "4.60.1",
				"fsevents": "~2.3.2"
			}
		},
		"node_modules/router": {
			"version": "2.2.0",
			"resolved": "https://registry.npmjs.org/router/-/router-2.2.0.tgz",
			"integrity": "sha512-nLTrUKm2UyiL7rlhapu/Zl45FwNgkZGaCpZbIHajDYgwlJCOzLSk+cIPAnsEqV955GjILJnKbdQC1nVPz+gAYQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"debug": "^4.4.0",
				"depd": "^2.0.0",
				"is-promise": "^4.0.0",
				"parseurl": "^1.3.3",
				"path-to-regexp": "^8.0.0"
			},
			"engines": {
				"node": ">= 18"
			}
		},
		"node_modules/run-applescript": {
			"version": "7.1.0",
			"resolved": "https://registry.npmjs.org/run-applescript/-/run-applescript-7.1.0.tgz",
			"integrity": "sha512-DPe5pVFaAsinSaV6QjQ6gdiedWDcRCbUuiQfQa2wmWV7+xC9bGulGI8+TdRmoFkAPaBXk8CrAbnlY2ISniJ47Q==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=18"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/run-parallel": {
			"version": "1.2.0",
			"resolved": "https://registry.npmjs.org/run-parallel/-/run-parallel-1.2.0.tgz",
			"integrity": "sha512-5l4VyZR86LZ/lDxZTR6jqL8AFE2S0IFLMP26AbjsLVADxHdhB/c0GUsH+y39UfCi3dzz8OlQuPmnaJOMoDHQBA==",
			"dev": true,
			"funding": [
				{
					"type": "github",
					"url": "https://github.com/sponsors/feross"
				},
				{
					"type": "patreon",
					"url": "https://www.patreon.com/feross"
				},
				{
					"type": "consulting",
					"url": "https://feross.org/support"
				}
			],
			"license": "MIT",
			"dependencies": {
				"queue-microtask": "^1.2.2"
			}
		},
		"node_modules/rxjs": {
			"version": "7.8.2",
			"resolved": "https://registry.npmjs.org/rxjs/-/rxjs-7.8.2.tgz",
			"integrity": "sha512-dhKf903U/PQZY6boNNtAGdWbG85WAbjT/1xYoZIC7FAY0yWapOBQVsVrDl58W86//e1VpMNBtRV4MaXfdMySFA==",
			"license": "Apache-2.0",
			"dependencies": {
				"tslib": "^2.1.0"
			}
		},
		"node_modules/safe-buffer": {
			"version": "5.2.1",
			"resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.2.1.tgz",
			"integrity": "sha512-rp3So07KcdmmKbGvgaNxQSJr7bGVSVk5S9Eq1F+ppbRo70+YeaDxkw5Dd8NPN+GD6bjnYm2VuPuCXmpuYvmCXQ==",
			"dev": true,
			"funding": [
				{
					"type": "github",
					"url": "https://github.com/sponsors/feross"
				},
				{
					"type": "patreon",
					"url": "https://www.patreon.com/feross"
				},
				{
					"type": "consulting",
					"url": "https://feross.org/support"
				}
			],
			"license": "MIT"
		},
		"node_modules/safer-buffer": {
			"version": "2.1.2",
			"resolved": "https://registry.npmjs.org/safer-buffer/-/safer-buffer-2.1.2.tgz",
			"integrity": "sha512-YZo3K82SD7Riyi0E1EQPojLz7kpepnSQI9IyPbHHg1XXXevb5dJI7tpyN2ADxGcQbHG7vcyRHk0cbwqcQriUtg==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/sass": {
			"version": "1.97.3",
			"resolved": "https://registry.npmjs.org/sass/-/sass-1.97.3.tgz",
			"integrity": "sha512-fDz1zJpd5GycprAbu4Q2PV/RprsRtKC/0z82z0JLgdytmcq0+ujJbJ/09bPGDxCLkKY3Np5cRAOcWiVkLXJURg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"chokidar": "^4.0.0",
				"immutable": "^5.0.2",
				"source-map-js": ">=0.6.2 <2.0.0"
			},
			"bin": {
				"sass": "sass.js"
			},
			"engines": {
				"node": ">=14.0.0"
			},
			"optionalDependencies": {
				"@parcel/watcher": "^2.4.1"
			}
		},
		"node_modules/sass-embedded": {
			"version": "1.99.0",
			"resolved": "https://registry.npmjs.org/sass-embedded/-/sass-embedded-1.99.0.tgz",
			"integrity": "sha512-gF/juR1aX02lZHkvwxdF80SapkQeg2fetoDF6gIQkNbSw5YEUFspMkyGTjPjgZSgIHuZpy+Wz4PlebKnLXMjdg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@bufbuild/protobuf": "^2.5.0",
				"colorjs.io": "^0.5.0",
				"immutable": "^5.1.5",
				"rxjs": "^7.4.0",
				"supports-color": "^8.1.1",
				"sync-child-process": "^1.0.2",
				"varint": "^6.0.0"
			},
			"bin": {
				"sass": "dist/bin/sass.js"
			},
			"engines": {
				"node": ">=16.0.0"
			},
			"optionalDependencies": {
				"sass-embedded-all-unknown": "1.99.0",
				"sass-embedded-android-arm": "1.99.0",
				"sass-embedded-android-arm64": "1.99.0",
				"sass-embedded-android-riscv64": "1.99.0",
				"sass-embedded-android-x64": "1.99.0",
				"sass-embedded-darwin-arm64": "1.99.0",
				"sass-embedded-darwin-x64": "1.99.0",
				"sass-embedded-linux-arm": "1.99.0",
				"sass-embedded-linux-arm64": "1.99.0",
				"sass-embedded-linux-musl-arm": "1.99.0",
				"sass-embedded-linux-musl-arm64": "1.99.0",
				"sass-embedded-linux-musl-riscv64": "1.99.0",
				"sass-embedded-linux-musl-x64": "1.99.0",
				"sass-embedded-linux-riscv64": "1.99.0",
				"sass-embedded-linux-x64": "1.99.0",
				"sass-embedded-unknown-all": "1.99.0",
				"sass-embedded-win32-arm64": "1.99.0",
				"sass-embedded-win32-x64": "1.99.0"
			}
		},
		"node_modules/sass-embedded-all-unknown": {
			"version": "1.99.0",
			"resolved": "https://registry.npmjs.org/sass-embedded-all-unknown/-/sass-embedded-all-unknown-1.99.0.tgz",
			"integrity": "sha512-qPIRG8Uhjo6/OKyAKixTnwMliTz+t9K6Duk0mx5z+K7n0Ts38NSJz2sjDnc7cA/8V9Lb3q09H38dZ1CLwD+ssw==",
			"cpu": [
				"!arm",
				"!arm64",
				"!riscv64",
				"!x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"dependencies": {
				"sass": "1.99.0"
			}
		},
		"node_modules/sass-embedded-all-unknown/node_modules/chokidar": {
			"version": "4.0.3",
			"resolved": "https://registry.npmjs.org/chokidar/-/chokidar-4.0.3.tgz",
			"integrity": "sha512-Qgzu8kfBvo+cA4962jnP1KkS6Dop5NS6g7R5LFYJr4b8Ub94PPQXUksCw9PvXoeXPRRddRNC5C1JQUR2SMGtnA==",
			"dev": true,
			"license": "MIT",
			"optional": true,
			"dependencies": {
				"readdirp": "^4.0.1"
			},
			"engines": {
				"node": ">= 14.16.0"
			},
			"funding": {
				"url": "https://paulmillr.com/funding/"
			}
		},
		"node_modules/sass-embedded-all-unknown/node_modules/readdirp": {
			"version": "4.1.2",
			"resolved": "https://registry.npmjs.org/readdirp/-/readdirp-4.1.2.tgz",
			"integrity": "sha512-GDhwkLfywWL2s6vEjyhri+eXmfH6j1L7JE27WhqLeYzoh/A3DBaYGEj2H/HFZCn/kMfim73FXxEJTw06WtxQwg==",
			"dev": true,
			"license": "MIT",
			"optional": true,
			"engines": {
				"node": ">= 14.18.0"
			},
			"funding": {
				"type": "individual",
				"url": "https://paulmillr.com/funding/"
			}
		},
		"node_modules/sass-embedded-all-unknown/node_modules/sass": {
			"version": "1.99.0",
			"resolved": "https://registry.npmjs.org/sass/-/sass-1.99.0.tgz",
			"integrity": "sha512-kgW13M54DUB7IsIRM5LvJkNlpH+WhMpooUcaWGFARkF1Tc82v9mIWkCbCYf+MBvpIUBSeSOTilpZjEPr2VYE6Q==",
			"dev": true,
			"license": "MIT",
			"optional": true,
			"dependencies": {
				"chokidar": "^4.0.0",
				"immutable": "^5.1.5",
				"source-map-js": ">=0.6.2 <2.0.0"
			},
			"bin": {
				"sass": "sass.js"
			},
			"engines": {
				"node": ">=14.0.0"
			},
			"optionalDependencies": {
				"@parcel/watcher": "^2.4.1"
			}
		},
		"node_modules/sass-embedded-android-arm": {
			"version": "1.99.0",
			"resolved": "https://registry.npmjs.org/sass-embedded-android-arm/-/sass-embedded-android-arm-1.99.0.tgz",
			"integrity": "sha512-EHvJ0C7/VuP78Qr6f8gIUVUmCqIorEQpw2yp3cs3SMg02ZuumlhjXvkTcFBxHmFdFR23vTNk1WnhY6QSeV1nFQ==",
			"cpu": [
				"arm"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"android"
			],
			"engines": {
				"node": ">=14.0.0"
			}
		},
		"node_modules/sass-embedded-android-arm64": {
			"version": "1.99.0",
			"resolved": "https://registry.npmjs.org/sass-embedded-android-arm64/-/sass-embedded-android-arm64-1.99.0.tgz",
			"integrity": "sha512-fNHhdnP23yqqieCbAdym4N47AleSwjbNt6OYIYx4DdACGdtERjQB4iOX/TaKsW034MupfF7SjnAAK8w7Ptldtg==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"android"
			],
			"engines": {
				"node": ">=14.0.0"
			}
		},
		"node_modules/sass-embedded-android-riscv64": {
			"version": "1.99.0",
			"resolved": "https://registry.npmjs.org/sass-embedded-android-riscv64/-/sass-embedded-android-riscv64-1.99.0.tgz",
			"integrity": "sha512-4zqDFRvgGDTL5vTHuIhRxUpXFoh0Cy7Gm5Ywk19ASd8Settmd14YdPRZPmMxfgS1GH292PofV1fq1ifiSEJWBw==",
			"cpu": [
				"riscv64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"android"
			],
			"engines": {
				"node": ">=14.0.0"
			}
		},
		"node_modules/sass-embedded-android-x64": {
			"version": "1.99.0",
			"resolved": "https://registry.npmjs.org/sass-embedded-android-x64/-/sass-embedded-android-x64-1.99.0.tgz",
			"integrity": "sha512-Uk53k/dGYt04RjOL4gFjZ0Z9DH9DKh8IA8WsXUkNqsxerAygoy3zqRBS2zngfE9K2jiOM87q+1R1p87ory9oQQ==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"android"
			],
			"engines": {
				"node": ">=14.0.0"
			}
		},
		"node_modules/sass-embedded-darwin-arm64": {
			"version": "1.99.0",
			"resolved": "https://registry.npmjs.org/sass-embedded-darwin-arm64/-/sass-embedded-darwin-arm64-1.99.0.tgz",
			"integrity": "sha512-u61/7U3IGLqoO6gL+AHeiAtlTPFwJK1+964U8gp45ZN0hzh1yrARf5O1mivXv8NnNgJvbG2wWJbiNZP0lG/lTg==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"darwin"
			],
			"engines": {
				"node": ">=14.0.0"
			}
		},
		"node_modules/sass-embedded-darwin-x64": {
			"version": "1.99.0",
			"resolved": "https://registry.npmjs.org/sass-embedded-darwin-x64/-/sass-embedded-darwin-x64-1.99.0.tgz",
			"integrity": "sha512-j/kkk/NcXdIameLezSfXjgCiBkVcA+G60AXrX768/3g0miK1g7M9dj7xOhCb1i7/wQeiEI3rw2LLuO63xRIn4A==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"darwin"
			],
			"engines": {
				"node": ">=14.0.0"
			}
		},
		"node_modules/sass-embedded-linux-arm": {
			"version": "1.99.0",
			"resolved": "https://registry.npmjs.org/sass-embedded-linux-arm/-/sass-embedded-linux-arm-1.99.0.tgz",
			"integrity": "sha512-d4IjJZrX2+AwB2YCy1JySwdptJECNP/WfAQLUl8txI3ka8/d3TUI155GtelnoZUkio211PwIeFvvAeZ9RXPQnw==",
			"cpu": [
				"arm"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">=14.0.0"
			}
		},
		"node_modules/sass-embedded-linux-arm64": {
			"version": "1.99.0",
			"resolved": "https://registry.npmjs.org/sass-embedded-linux-arm64/-/sass-embedded-linux-arm64-1.99.0.tgz",
			"integrity": "sha512-btNcFpItcB56L40n8hDeL7sRSMLDXQ56nB5h2deddJx1n60rpKSElJmkaDGHtpkrY+CTtDRV0FZDjHeTJddYew==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">=14.0.0"
			}
		},
		"node_modules/sass-embedded-linux-musl-arm": {
			"version": "1.99.0",
			"resolved": "https://registry.npmjs.org/sass-embedded-linux-musl-arm/-/sass-embedded-linux-musl-arm-1.99.0.tgz",
			"integrity": "sha512-2gvHOupgIw3ytatXT4nFUow71LFbuOZPEwG+HUzcNQDH8ue4Ez8cr03vsv5MDv3lIjOKcXwDvWD980t18MwkoQ==",
			"cpu": [
				"arm"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">=14.0.0"
			}
		},
		"node_modules/sass-embedded-linux-musl-arm64": {
			"version": "1.99.0",
			"resolved": "https://registry.npmjs.org/sass-embedded-linux-musl-arm64/-/sass-embedded-linux-musl-arm64-1.99.0.tgz",
			"integrity": "sha512-Hi2bt/IrM5P4FBKz6EcHAlniwfpoz9mnTdvSd58y+avA3SANM76upIkAdSayA8ZGwyL3gZokru1AKDPF9lJDNw==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">=14.0.0"
			}
		},
		"node_modules/sass-embedded-linux-musl-riscv64": {
			"version": "1.99.0",
			"resolved": "https://registry.npmjs.org/sass-embedded-linux-musl-riscv64/-/sass-embedded-linux-musl-riscv64-1.99.0.tgz",
			"integrity": "sha512-mKqGvVaJ9rHMqyZsF0kikQe4NO0f4osb67+X6nLhBiVDKvyazQHJ3zJQreNefIE36yL2sjHIclSB//MprzaQDg==",
			"cpu": [
				"riscv64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">=14.0.0"
			}
		},
		"node_modules/sass-embedded-linux-musl-x64": {
			"version": "1.99.0",
			"resolved": "https://registry.npmjs.org/sass-embedded-linux-musl-x64/-/sass-embedded-linux-musl-x64-1.99.0.tgz",
			"integrity": "sha512-huhgOMmOc30r7CH7qbRbT9LerSEGSnWuS4CYNOskr9BvNeQp4dIneFufNRGZ7hkOAxUM8DglxIZJN/cyAT95Ew==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">=14.0.0"
			}
		},
		"node_modules/sass-embedded-linux-riscv64": {
			"version": "1.99.0",
			"resolved": "https://registry.npmjs.org/sass-embedded-linux-riscv64/-/sass-embedded-linux-riscv64-1.99.0.tgz",
			"integrity": "sha512-mevFPIFAVhrH90THifxLfOntFmHtcEKOcdWnep2gJ0X4DVva4AiVIRlQe/7w9JFx5+gnDRE1oaJJkzuFUuYZsA==",
			"cpu": [
				"riscv64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">=14.0.0"
			}
		},
		"node_modules/sass-embedded-linux-x64": {
			"version": "1.99.0",
			"resolved": "https://registry.npmjs.org/sass-embedded-linux-x64/-/sass-embedded-linux-x64-1.99.0.tgz",
			"integrity": "sha512-9k7IkULqIZdCIVt4Mboryt6vN8Mjmm3EhI1P3mClU5y5i3wLK5ExC3cbVWk047KsID/fvB1RLslqghXJx5BoxA==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">=14.0.0"
			}
		},
		"node_modules/sass-embedded-unknown-all": {
			"version": "1.99.0",
			"resolved": "https://registry.npmjs.org/sass-embedded-unknown-all/-/sass-embedded-unknown-all-1.99.0.tgz",
			"integrity": "sha512-P7MxiUtL/XzGo3PX0CaB8lNNEFLQWKikPA8pbKytx9ZCLZSDkt2NJcdAbblB/sqMs4AV3EK2NadV8rI/diq3xg==",
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"!android",
				"!darwin",
				"!linux",
				"!win32"
			],
			"dependencies": {
				"sass": "1.99.0"
			}
		},
		"node_modules/sass-embedded-unknown-all/node_modules/chokidar": {
			"version": "4.0.3",
			"resolved": "https://registry.npmjs.org/chokidar/-/chokidar-4.0.3.tgz",
			"integrity": "sha512-Qgzu8kfBvo+cA4962jnP1KkS6Dop5NS6g7R5LFYJr4b8Ub94PPQXUksCw9PvXoeXPRRddRNC5C1JQUR2SMGtnA==",
			"dev": true,
			"license": "MIT",
			"optional": true,
			"dependencies": {
				"readdirp": "^4.0.1"
			},
			"engines": {
				"node": ">= 14.16.0"
			},
			"funding": {
				"url": "https://paulmillr.com/funding/"
			}
		},
		"node_modules/sass-embedded-unknown-all/node_modules/readdirp": {
			"version": "4.1.2",
			"resolved": "https://registry.npmjs.org/readdirp/-/readdirp-4.1.2.tgz",
			"integrity": "sha512-GDhwkLfywWL2s6vEjyhri+eXmfH6j1L7JE27WhqLeYzoh/A3DBaYGEj2H/HFZCn/kMfim73FXxEJTw06WtxQwg==",
			"dev": true,
			"license": "MIT",
			"optional": true,
			"engines": {
				"node": ">= 14.18.0"
			},
			"funding": {
				"type": "individual",
				"url": "https://paulmillr.com/funding/"
			}
		},
		"node_modules/sass-embedded-unknown-all/node_modules/sass": {
			"version": "1.99.0",
			"resolved": "https://registry.npmjs.org/sass/-/sass-1.99.0.tgz",
			"integrity": "sha512-kgW13M54DUB7IsIRM5LvJkNlpH+WhMpooUcaWGFARkF1Tc82v9mIWkCbCYf+MBvpIUBSeSOTilpZjEPr2VYE6Q==",
			"dev": true,
			"license": "MIT",
			"optional": true,
			"dependencies": {
				"chokidar": "^4.0.0",
				"immutable": "^5.1.5",
				"source-map-js": ">=0.6.2 <2.0.0"
			},
			"bin": {
				"sass": "sass.js"
			},
			"engines": {
				"node": ">=14.0.0"
			},
			"optionalDependencies": {
				"@parcel/watcher": "^2.4.1"
			}
		},
		"node_modules/sass-embedded-win32-arm64": {
			"version": "1.99.0",
			"resolved": "https://registry.npmjs.org/sass-embedded-win32-arm64/-/sass-embedded-win32-arm64-1.99.0.tgz",
			"integrity": "sha512-8whpsW7S+uO8QApKfQuc36m3P9EISzbVZOgC79goob4qGy09u8Gz/rYvw8h1prJDSjltpHGhOzBE6LDz7WvzVw==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"win32"
			],
			"engines": {
				"node": ">=14.0.0"
			}
		},
		"node_modules/sass-embedded-win32-x64": {
			"version": "1.99.0",
			"resolved": "https://registry.npmjs.org/sass-embedded-win32-x64/-/sass-embedded-win32-x64-1.99.0.tgz",
			"integrity": "sha512-ipuOv1R2K4MHeuCEAZGpuUbAgma4gb0sdacyrTjJtMOy/OY9UvWfVlwErdB09KIkp4fPDpQJDJfvYN6bC8jeNg==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"win32"
			],
			"engines": {
				"node": ">=14.0.0"
			}
		},
		"node_modules/sass-embedded/node_modules/supports-color": {
			"version": "8.1.1",
			"resolved": "https://registry.npmjs.org/supports-color/-/supports-color-8.1.1.tgz",
			"integrity": "sha512-MpUEN2OodtUzxvKQl72cUF7RQ5EiHsGvSsVG0ia9c5RbWGL2CI4C7EpPS8UTBIplnlzZiNuV56w+FuNxy3ty2Q==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"has-flag": "^4.0.0"
			},
			"engines": {
				"node": ">=10"
			},
			"funding": {
				"url": "https://github.com/chalk/supports-color?sponsor=1"
			}
		},
		"node_modules/sass-loader": {
			"version": "16.0.7",
			"resolved": "https://registry.npmjs.org/sass-loader/-/sass-loader-16.0.7.tgz",
			"integrity": "sha512-w6q+fRHourZ+e+xA1kcsF27iGM6jdB8teexYCfdUw0sYgcDNeZESnDNT9sUmmPm3ooziwUJXGwZJSTF3kOdBfA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"neo-async": "^2.6.2"
			},
			"engines": {
				"node": ">= 18.12.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/webpack"
			},
			"peerDependencies": {
				"@rspack/core": "0.x || ^1.0.0 || ^2.0.0-0",
				"node-sass": "^4.0.0 || ^5.0.0 || ^6.0.0 || ^7.0.0 || ^8.0.0 || ^9.0.0",
				"sass": "^1.3.0",
				"sass-embedded": "*",
				"webpack": "^5.0.0"
			},
			"peerDependenciesMeta": {
				"@rspack/core": {
					"optional": true
				},
				"node-sass": {
					"optional": true
				},
				"sass": {
					"optional": true
				},
				"sass-embedded": {
					"optional": true
				},
				"webpack": {
					"optional": true
				}
			}
		},
		"node_modules/sass/node_modules/chokidar": {
			"version": "4.0.3",
			"resolved": "https://registry.npmjs.org/chokidar/-/chokidar-4.0.3.tgz",
			"integrity": "sha512-Qgzu8kfBvo+cA4962jnP1KkS6Dop5NS6g7R5LFYJr4b8Ub94PPQXUksCw9PvXoeXPRRddRNC5C1JQUR2SMGtnA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"readdirp": "^4.0.1"
			},
			"engines": {
				"node": ">= 14.16.0"
			},
			"funding": {
				"url": "https://paulmillr.com/funding/"
			}
		},
		"node_modules/sass/node_modules/readdirp": {
			"version": "4.1.2",
			"resolved": "https://registry.npmjs.org/readdirp/-/readdirp-4.1.2.tgz",
			"integrity": "sha512-GDhwkLfywWL2s6vEjyhri+eXmfH6j1L7JE27WhqLeYzoh/A3DBaYGEj2H/HFZCn/kMfim73FXxEJTw06WtxQwg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 14.18.0"
			},
			"funding": {
				"type": "individual",
				"url": "https://paulmillr.com/funding/"
			}
		},
		"node_modules/sax": {
			"version": "1.6.0",
			"resolved": "https://registry.npmjs.org/sax/-/sax-1.6.0.tgz",
			"integrity": "sha512-6R3J5M4AcbtLUdZmRv2SygeVaM7IhrLXu9BmnOGmmACak8fiUtOsYNWUS4uK7upbmHIBbLBeFeI//477BKLBzA==",
			"dev": true,
			"license": "BlueOak-1.0.0",
			"engines": {
				"node": ">=11.0.0"
			}
		},
		"node_modules/saxes": {
			"version": "6.0.0",
			"resolved": "https://registry.npmjs.org/saxes/-/saxes-6.0.0.tgz",
			"integrity": "sha512-xAg7SOnEhrm5zI3puOOKyy1OMcMlIJZYNJY7xLBwSze0UjhPLnWfj2GF2EpT0jmzaJKIWKHLsaSSajf35bcYnA==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"xmlchars": "^2.2.0"
			},
			"engines": {
				"node": ">=v12.22.7"
			}
		},
		"node_modules/schema-utils": {
			"version": "4.3.0",
			"resolved": "https://registry.npmjs.org/schema-utils/-/schema-utils-4.3.0.tgz",
			"integrity": "sha512-Gf9qqc58SpCA/xdziiHz35F4GNIWYWZrEshUc/G/r5BnLph6xpKuLeoJoQuj5WfBIx/eQLf+hmVPYHaxJu7V2g==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@types/json-schema": "^7.0.9",
				"ajv": "^8.9.0",
				"ajv-formats": "^2.1.1",
				"ajv-keywords": "^5.1.0"
			},
			"engines": {
				"node": ">= 10.13.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/webpack"
			}
		},
		"node_modules/schema-utils/node_modules/ajv-formats": {
			"version": "2.1.1",
			"resolved": "https://registry.npmjs.org/ajv-formats/-/ajv-formats-2.1.1.tgz",
			"integrity": "sha512-Wx0Kx52hxE7C18hkMEggYlEifqWZtYaRgouJor+WMdPnQyEK13vgEWyVNup7SoeeoLMsr4kf5h6dOW11I15MUA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ajv": "^8.0.0"
			},
			"peerDependencies": {
				"ajv": "^8.0.0"
			},
			"peerDependenciesMeta": {
				"ajv": {
					"optional": true
				}
			}
		},
		"node_modules/secure-compare": {
			"version": "3.0.1",
			"resolved": "https://registry.npmjs.org/secure-compare/-/secure-compare-3.0.1.tgz",
			"integrity": "sha512-AckIIV90rPDcBcglUwXPF3kg0P0qmPsPXAj6BBEENQE1p5yA1xfmDJzfi1Tappj37Pv2mVbKpL3Z1T+Nn7k1Qw==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/select-hose": {
			"version": "2.0.0",
			"resolved": "https://registry.npmjs.org/select-hose/-/select-hose-2.0.0.tgz",
			"integrity": "sha512-mEugaLK+YfkijB4fx0e6kImuJdCIt2LxCRcbEYPqRGCs4F2ogyfZU5IAZRdjCP8JPq2AtdNoC/Dux63d9Kiryg==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/selfsigned": {
			"version": "2.4.1",
			"resolved": "https://registry.npmjs.org/selfsigned/-/selfsigned-2.4.1.tgz",
			"integrity": "sha512-th5B4L2U+eGLq1TVh7zNRGBapioSORUeymIydxgFpwww9d2qyKvtuPU2jJuHvYAwwqi2Y596QBL3eEqcPEYL8Q==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@types/node-forge": "^1.3.0",
				"node-forge": "^1"
			},
			"engines": {
				"node": ">=10"
			}
		},
		"node_modules/semver": {
			"version": "7.7.4",
			"resolved": "https://registry.npmjs.org/semver/-/semver-7.7.4.tgz",
			"integrity": "sha512-vFKC2IEtQnVhpT78h1Yp8wzwrf8CM+MzKMHGJZfBtzhZNycRFnXsHk6E5TxIkkMsgNS7mdX3AGB7x2QM2di4lA==",
			"dev": true,
			"license": "ISC",
			"bin": {
				"semver": "bin/semver.js"
			},
			"engines": {
				"node": ">=10"
			}
		},
		"node_modules/send": {
			"version": "1.2.1",
			"resolved": "https://registry.npmjs.org/send/-/send-1.2.1.tgz",
			"integrity": "sha512-1gnZf7DFcoIcajTjTwjwuDjzuz4PPcY2StKPlsGAQ1+YH20IRVrBaXSWmdjowTJ6u8Rc01PoYOGHXfP1mYcZNQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"debug": "^4.4.3",
				"encodeurl": "^2.0.0",
				"escape-html": "^1.0.3",
				"etag": "^1.8.1",
				"fresh": "^2.0.0",
				"http-errors": "^2.0.1",
				"mime-types": "^3.0.2",
				"ms": "^2.1.3",
				"on-finished": "^2.4.1",
				"range-parser": "^1.2.1",
				"statuses": "^2.0.2"
			},
			"engines": {
				"node": ">= 18"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/express"
			}
		},
		"node_modules/serialize-javascript": {
			"version": "7.0.5",
			"resolved": "https://registry.npmjs.org/serialize-javascript/-/serialize-javascript-7.0.5.tgz",
			"integrity": "sha512-F4LcB0UqUl1zErq+1nYEEzSHJnIwb3AF2XWB94b+afhrekOUijwooAYqFyRbjYkm2PAKBabx6oYv/xDxNi8IBw==",
			"dev": true,
			"license": "BSD-3-Clause",
			"engines": {
				"node": ">=20.0.0"
			}
		},
		"node_modules/serve-index": {
			"version": "1.9.2",
			"resolved": "https://registry.npmjs.org/serve-index/-/serve-index-1.9.2.tgz",
			"integrity": "sha512-KDj11HScOaLmrPxl70KYNW1PksP4Nb/CLL2yvC+Qd2kHMPEEpfc4Re2e4FOay+bC/+XQl/7zAcWON3JVo5v3KQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"accepts": "~1.3.8",
				"batch": "0.6.1",
				"debug": "2.6.9",
				"escape-html": "~1.0.3",
				"http-errors": "~1.8.0",
				"mime-types": "~2.1.35",
				"parseurl": "~1.3.3"
			},
			"engines": {
				"node": ">= 0.8.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/express"
			}
		},
		"node_modules/serve-index/node_modules/accepts": {
			"version": "1.3.8",
			"resolved": "https://registry.npmjs.org/accepts/-/accepts-1.3.8.tgz",
			"integrity": "sha512-PYAthTa2m2VKxuvSD3DPC/Gy+U+sOA1LAuT8mkmRuvw+NACSaeXEQ+NHcVF7rONl6qcaxV3Uuemwawk+7+SJLw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"mime-types": "~2.1.34",
				"negotiator": "0.6.3"
			},
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/serve-index/node_modules/debug": {
			"version": "2.6.9",
			"resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
			"integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ms": "2.0.0"
			}
		},
		"node_modules/serve-index/node_modules/depd": {
			"version": "1.1.2",
			"resolved": "https://registry.npmjs.org/depd/-/depd-1.1.2.tgz",
			"integrity": "sha512-7emPTl6Dpo6JRXOXjLRxck+FlLRX5847cLKEn00PLAgc3g2hTZZgr+e4c2v6QpSmLeFP3n5yUo7ft6avBK/5jQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/serve-index/node_modules/http-errors": {
			"version": "1.8.1",
			"resolved": "https://registry.npmjs.org/http-errors/-/http-errors-1.8.1.tgz",
			"integrity": "sha512-Kpk9Sm7NmI+RHhnj6OIWDI1d6fIoFAtFt9RLaTMRlg/8w49juAStsrBgp0Dp4OdxdVbRIeKhtCUvoi/RuAhO4g==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"depd": "~1.1.2",
				"inherits": "2.0.4",
				"setprototypeof": "1.2.0",
				"statuses": ">= 1.5.0 < 2",
				"toidentifier": "1.0.1"
			},
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/serve-index/node_modules/mime-db": {
			"version": "1.52.0",
			"resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.52.0.tgz",
			"integrity": "sha512-sPU4uV7dYlvtWJxwwxHD0PuihVNiE7TyAbQ5SWxDCB9mUYvOgroQOwYQQOKPJ8CIbE+1ETVlOoK1UC2nU3gYvg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/serve-index/node_modules/mime-types": {
			"version": "2.1.35",
			"resolved": "https://registry.npmjs.org/mime-types/-/mime-types-2.1.35.tgz",
			"integrity": "sha512-ZDY+bPm5zTTF+YpCrAU9nK0UgICYPT0QtT1NZWFv4s++TNkcgVaT0g6+4R2uI4MjQjzysHB1zxuWL50hzaeXiw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"mime-db": "1.52.0"
			},
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/serve-index/node_modules/ms": {
			"version": "2.0.0",
			"resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
			"integrity": "sha512-Tpp60P6IUJDTuOq/5Z8cdskzJujfwqfOTkrwIwj7IRISpnkJnT6SyJ4PCPnGMoFjC9ddhal5KVIYtAt97ix05A==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/serve-index/node_modules/negotiator": {
			"version": "0.6.3",
			"resolved": "https://registry.npmjs.org/negotiator/-/negotiator-0.6.3.tgz",
			"integrity": "sha512-+EUsqGPLsM+j/zdChZjsnX51g4XrHFOIXwfnCVPGlQk/k5giakcKsuxCObBRu6DSm9opw/O6slWbJdghQM4bBg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/serve-index/node_modules/statuses": {
			"version": "1.5.0",
			"resolved": "https://registry.npmjs.org/statuses/-/statuses-1.5.0.tgz",
			"integrity": "sha512-OpZ3zP+jT1PI7I8nemJX4AKmAX070ZkYPVWV/AaKTJl+tXCTGyVdC1a4SL8RUQYEwk/f34ZX8UTykN68FwrqAA==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/serve-static": {
			"version": "2.2.1",
			"resolved": "https://registry.npmjs.org/serve-static/-/serve-static-2.2.1.tgz",
			"integrity": "sha512-xRXBn0pPqQTVQiC8wyQrKs2MOlX24zQ0POGaj0kultvoOCstBQM5yvOhAVSUwOMjQtTvsPWoNCHfPGwaaQJhTw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"encodeurl": "^2.0.0",
				"escape-html": "^1.0.3",
				"parseurl": "^1.3.3",
				"send": "^1.2.0"
			},
			"engines": {
				"node": ">= 18"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/express"
			}
		},
		"node_modules/setprototypeof": {
			"version": "1.2.0",
			"resolved": "https://registry.npmjs.org/setprototypeof/-/setprototypeof-1.2.0.tgz",
			"integrity": "sha512-E5LDX7Wrp85Kil5bhZv46j8jOeboKq5JMmYM3gVGdGH8xFpPWXUMsNrlODCrkoxMEeNi/XZIwuRvY4XNwYMJpw==",
			"dev": true,
			"license": "ISC"
		},
		"node_modules/shallow-clone": {
			"version": "3.0.1",
			"resolved": "https://registry.npmjs.org/shallow-clone/-/shallow-clone-3.0.1.tgz",
			"integrity": "sha512-/6KqX+GVUdqPuPPd2LxDDxzX6CAbjJehAAOKlNpqqUpAqPM6HeL8f+o3a+JsyGjn2lv0WY8UsTgUJjU9Ok55NA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"kind-of": "^6.0.2"
			},
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/shebang-command": {
			"version": "2.0.0",
			"resolved": "https://registry.npmjs.org/shebang-command/-/shebang-command-2.0.0.tgz",
			"integrity": "sha512-kHxr2zZpYtdmrN1qDjrrX/Z1rR1kG8Dx+gkpK1G4eXmvXswmcE1hTWBWYUzlraYw1/yZp6YuDY77YtvbN0dmDA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"shebang-regex": "^3.0.0"
			},
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/shebang-regex": {
			"version": "3.0.0",
			"resolved": "https://registry.npmjs.org/shebang-regex/-/shebang-regex-3.0.0.tgz",
			"integrity": "sha512-7++dFhtcx3353uBaq8DDR4NuxBetBzC7ZQOhmTQInHEd6bSrXdiEyzCvG07Z44UYdLShWUyXt5M/yhz8ekcb1A==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/shell-quote": {
			"version": "1.8.3",
			"resolved": "https://registry.npmjs.org/shell-quote/-/shell-quote-1.8.3.tgz",
			"integrity": "sha512-ObmnIF4hXNg1BqhnHmgbDETF8dLPCggZWBjkQfhZpbszZnYur5DUljTcCHii5LC3J5E0yeO/1LIMyH+UvHQgyw==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.4"
			},
			"funding": {
				"url": "https://github.com/sponsors/ljharb"
			}
		},
		"node_modules/side-channel": {
			"version": "1.1.0",
			"resolved": "https://registry.npmjs.org/side-channel/-/side-channel-1.1.0.tgz",
			"integrity": "sha512-ZX99e6tRweoUXqR+VBrslhda51Nh5MTQwou5tnUDgbtyM0dBgmhEDtWGP/xbKn6hqfPRHujUNwz5fy/wbbhnpw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"es-errors": "^1.3.0",
				"object-inspect": "^1.13.3",
				"side-channel-list": "^1.0.0",
				"side-channel-map": "^1.0.1",
				"side-channel-weakmap": "^1.0.2"
			},
			"engines": {
				"node": ">= 0.4"
			},
			"funding": {
				"url": "https://github.com/sponsors/ljharb"
			}
		},
		"node_modules/side-channel-list": {
			"version": "1.0.0",
			"resolved": "https://registry.npmjs.org/side-channel-list/-/side-channel-list-1.0.0.tgz",
			"integrity": "sha512-FCLHtRD/gnpCiCHEiJLOwdmFP+wzCmDEkc9y7NsYxeF4u7Btsn1ZuwgwJGxImImHicJArLP4R0yX4c2KCrMrTA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"es-errors": "^1.3.0",
				"object-inspect": "^1.13.3"
			},
			"engines": {
				"node": ">= 0.4"
			},
			"funding": {
				"url": "https://github.com/sponsors/ljharb"
			}
		},
		"node_modules/side-channel-map": {
			"version": "1.0.1",
			"resolved": "https://registry.npmjs.org/side-channel-map/-/side-channel-map-1.0.1.tgz",
			"integrity": "sha512-VCjCNfgMsby3tTdo02nbjtM/ewra6jPHmpThenkTYh8pG9ucZ/1P8So4u4FGBek/BjpOVsDCMoLA/iuBKIFXRA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"call-bound": "^1.0.2",
				"es-errors": "^1.3.0",
				"get-intrinsic": "^1.2.5",
				"object-inspect": "^1.13.3"
			},
			"engines": {
				"node": ">= 0.4"
			},
			"funding": {
				"url": "https://github.com/sponsors/ljharb"
			}
		},
		"node_modules/side-channel-weakmap": {
			"version": "1.0.2",
			"resolved": "https://registry.npmjs.org/side-channel-weakmap/-/side-channel-weakmap-1.0.2.tgz",
			"integrity": "sha512-WPS/HvHQTYnHisLo9McqBHOJk2FkHO/tlpvldyrnem4aeQp4hai3gythswg6p01oSoTl58rcpiFAjF2br2Ak2A==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"call-bound": "^1.0.2",
				"es-errors": "^1.3.0",
				"get-intrinsic": "^1.2.5",
				"object-inspect": "^1.13.3",
				"side-channel-map": "^1.0.1"
			},
			"engines": {
				"node": ">= 0.4"
			},
			"funding": {
				"url": "https://github.com/sponsors/ljharb"
			}
		},
		"node_modules/siginfo": {
			"version": "2.0.0",
			"resolved": "https://registry.npmjs.org/siginfo/-/siginfo-2.0.0.tgz",
			"integrity": "sha512-ybx0WO1/8bSBLEWXZvEd7gMW3Sn3JFlW3TvX1nREbDLRNQNaeNN8WK0meBwPdAaOI7TtRRRJn/Es1zhrrCHu7g==",
			"dev": true,
			"license": "ISC"
		},
		"node_modules/signal-exit": {
			"version": "4.1.0",
			"resolved": "https://registry.npmjs.org/signal-exit/-/signal-exit-4.1.0.tgz",
			"integrity": "sha512-bzyZ1e88w9O1iNJbKnOlvYTrWPDl46O1bG0D3XInv+9tkPrxrN8jUUTiFlDkkmKWgn1M6CfIA13SuGqOa9Korw==",
			"license": "ISC",
			"engines": {
				"node": ">=14"
			},
			"funding": {
				"url": "https://github.com/sponsors/isaacs"
			}
		},
		"node_modules/sigstore": {
			"version": "4.1.0",
			"resolved": "https://registry.npmjs.org/sigstore/-/sigstore-4.1.0.tgz",
			"integrity": "sha512-/fUgUhYghuLzVT/gaJoeVehLCgZiUxPCPMcyVNY0lIf/cTCz58K/WTI7PefDarXxp9nUKpEwg1yyz3eSBMTtgA==",
			"dev": true,
			"license": "Apache-2.0",
			"dependencies": {
				"@sigstore/bundle": "^4.0.0",
				"@sigstore/core": "^3.1.0",
				"@sigstore/protobuf-specs": "^0.5.0",
				"@sigstore/sign": "^4.1.0",
				"@sigstore/tuf": "^4.0.1",
				"@sigstore/verify": "^3.1.0"
			},
			"engines": {
				"node": "^20.17.0 || >=22.9.0"
			}
		},
		"node_modules/slice-ansi": {
			"version": "8.0.0",
			"resolved": "https://registry.npmjs.org/slice-ansi/-/slice-ansi-8.0.0.tgz",
			"integrity": "sha512-stxByr12oeeOyY2BlviTNQlYV5xOj47GirPr4yA1hE9JCtxfQN0+tVbkxwCtYDQWhEKWFHsEK48ORg5jrouCAg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ansi-styles": "^6.2.3",
				"is-fullwidth-code-point": "^5.1.0"
			},
			"engines": {
				"node": ">=20"
			},
			"funding": {
				"url": "https://github.com/chalk/slice-ansi?sponsor=1"
			}
		},
		"node_modules/smart-buffer": {
			"version": "4.2.0",
			"resolved": "https://registry.npmjs.org/smart-buffer/-/smart-buffer-4.2.0.tgz",
			"integrity": "sha512-94hK0Hh8rPqQl2xXc3HsaBoOXKV20MToPkcXvwbISWLEs+64sBq5kFgn2kJDHb1Pry9yrP0dxrCI9RRci7RXKg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 6.0.0",
				"npm": ">= 3.0.0"
			}
		},
		"node_modules/smol-toml": {
			"version": "1.6.1",
			"resolved": "https://registry.npmjs.org/smol-toml/-/smol-toml-1.6.1.tgz",
			"integrity": "sha512-dWUG8F5sIIARXih1DTaQAX4SsiTXhInKf1buxdY9DIg4ZYPZK5nGM1VRIYmEbDbsHt7USo99xSLFu5Q1IqTmsg==",
			"dev": true,
			"license": "BSD-3-Clause",
			"engines": {
				"node": ">= 18"
			},
			"funding": {
				"url": "https://github.com/sponsors/cyyynthia"
			}
		},
		"node_modules/sockjs": {
			"version": "0.3.24",
			"resolved": "https://registry.npmjs.org/sockjs/-/sockjs-0.3.24.tgz",
			"integrity": "sha512-GJgLTZ7vYb/JtPSSZ10hsOYIvEYsjbNU+zPdIHcUaWVNUEPivzxku31865sSSud0Da0W4lEeOPlmw93zLQchuQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"faye-websocket": "^0.11.3",
				"uuid": "^8.3.2",
				"websocket-driver": "^0.7.4"
			}
		},
		"node_modules/socks": {
			"version": "2.8.7",
			"resolved": "https://registry.npmjs.org/socks/-/socks-2.8.7.tgz",
			"integrity": "sha512-HLpt+uLy/pxB+bum/9DzAgiKS8CX1EvbWxI4zlmgGCExImLdiad2iCwXT5Z4c9c3Eq8rP2318mPW2c+QbtjK8A==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ip-address": "^10.0.1",
				"smart-buffer": "^4.2.0"
			},
			"engines": {
				"node": ">= 10.0.0",
				"npm": ">= 3.0.0"
			}
		},
		"node_modules/socks-proxy-agent": {
			"version": "8.0.5",
			"resolved": "https://registry.npmjs.org/socks-proxy-agent/-/socks-proxy-agent-8.0.5.tgz",
			"integrity": "sha512-HehCEsotFqbPW9sJ8WVYB6UbmIMv7kUUORIF2Nncq4VQvBfNBLibW9YZR5dlYCSUhwcD628pRllm7n+E+YTzJw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"agent-base": "^7.1.2",
				"debug": "^4.3.4",
				"socks": "^2.8.3"
			},
			"engines": {
				"node": ">= 14"
			}
		},
		"node_modules/sorted-array-functions": {
			"version": "1.3.0",
			"resolved": "https://registry.npmjs.org/sorted-array-functions/-/sorted-array-functions-1.3.0.tgz",
			"integrity": "sha512-2sqgzeFlid6N4Z2fUQ1cvFmTOLRi/sEDzSQ0OKYchqgoPmQBVyM3959qYx3fpS6Esef80KjmpgPeEr028dP3OA==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/source-map": {
			"version": "0.7.6",
			"resolved": "https://registry.npmjs.org/source-map/-/source-map-0.7.6.tgz",
			"integrity": "sha512-i5uvt8C3ikiWeNZSVZNWcfZPItFQOsYTUAOkcUPGd8DqDy1uOUikjt5dG+uRlwyvR108Fb9DOd4GvXfT0N2/uQ==",
			"license": "BSD-3-Clause",
			"engines": {
				"node": ">= 12"
			}
		},
		"node_modules/source-map-js": {
			"version": "1.2.1",
			"resolved": "https://registry.npmjs.org/source-map-js/-/source-map-js-1.2.1.tgz",
			"integrity": "sha512-UXWMKhLOwVKb728IUtQPXxfYU+usdybtUrK/8uGE8CQMvrhOpwvzDBwj0QhSL7MQc7vIsISBG8VQ8+IDQxpfQA==",
			"dev": true,
			"license": "BSD-3-Clause",
			"engines": {
				"node": ">=0.10.0"
			}
		},
		"node_modules/source-map-loader": {
			"version": "5.0.0",
			"resolved": "https://registry.npmjs.org/source-map-loader/-/source-map-loader-5.0.0.tgz",
			"integrity": "sha512-k2Dur7CbSLcAH73sBcIkV5xjPV4SzqO1NJ7+XaQl8if3VODDUj3FNchNGpqgJSKbvUfJuhVdv8K2Eu8/TNl2eA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"iconv-lite": "^0.6.3",
				"source-map-js": "^1.0.2"
			},
			"engines": {
				"node": ">= 18.12.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/webpack"
			},
			"peerDependencies": {
				"webpack": "^5.72.1"
			}
		},
		"node_modules/source-map-loader/node_modules/iconv-lite": {
			"version": "0.6.3",
			"resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.6.3.tgz",
			"integrity": "sha512-4fCk79wshMdzMp2rH06qWrJE4iolqLhCUH+OiuIgU++RB0+94NlDL81atO7GX55uUKueo0txHNtvEyI6D7WdMw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"safer-buffer": ">= 2.1.2 < 3.0.0"
			},
			"engines": {
				"node": ">=0.10.0"
			}
		},
		"node_modules/source-map-support": {
			"version": "0.5.21",
			"resolved": "https://registry.npmjs.org/source-map-support/-/source-map-support-0.5.21.tgz",
			"integrity": "sha512-uBHU3L3czsIyYXKX88fdrGovxdSCoTGDRZ6SYXtSRxLZUzHg5P/66Ht6uoUlHu9EZod+inXhKo3qQgwXUT/y1w==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"buffer-from": "^1.0.0",
				"source-map": "^0.6.0"
			}
		},
		"node_modules/source-map-support/node_modules/source-map": {
			"version": "0.6.1",
			"resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
			"integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==",
			"dev": true,
			"license": "BSD-3-Clause",
			"engines": {
				"node": ">=0.10.0"
			}
		},
		"node_modules/spdx-exceptions": {
			"version": "2.5.0",
			"resolved": "https://registry.npmjs.org/spdx-exceptions/-/spdx-exceptions-2.5.0.tgz",
			"integrity": "sha512-PiU42r+xO4UbUS1buo3LPJkjlO7430Xn5SVAhdpzzsPHsjbYVflnnFdATgabnLude+Cqu25p6N+g2lw/PFsa4w==",
			"dev": true,
			"license": "CC-BY-3.0"
		},
		"node_modules/spdx-expression-parse": {
			"version": "4.0.0",
			"resolved": "https://registry.npmjs.org/spdx-expression-parse/-/spdx-expression-parse-4.0.0.tgz",
			"integrity": "sha512-Clya5JIij/7C6bRR22+tnGXbc4VKlibKSVj2iHvVeX5iMW7s1SIQlqu699JkODJJIhh/pUu8L0/VLh8xflD+LQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"spdx-exceptions": "^2.1.0",
				"spdx-license-ids": "^3.0.0"
			}
		},
		"node_modules/spdx-license-ids": {
			"version": "3.0.23",
			"resolved": "https://registry.npmjs.org/spdx-license-ids/-/spdx-license-ids-3.0.23.tgz",
			"integrity": "sha512-CWLcCCH7VLu13TgOH+r8p1O/Znwhqv/dbb6lqWy67G+pT1kHmeD/+V36AVb/vq8QMIQwVShJ6Ssl5FPh0fuSdw==",
			"dev": true,
			"license": "CC0-1.0"
		},
		"node_modules/spdy": {
			"version": "4.0.2",
			"resolved": "https://registry.npmjs.org/spdy/-/spdy-4.0.2.tgz",
			"integrity": "sha512-r46gZQZQV+Kl9oItvl1JZZqJKGr+oEkB08A6BzkiR7593/7IbtuncXHd2YoYeTsG4157ZssMu9KYvUHLcjcDoA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"debug": "^4.1.0",
				"handle-thing": "^2.0.0",
				"http-deceiver": "^1.2.7",
				"select-hose": "^2.0.0",
				"spdy-transport": "^3.0.0"
			},
			"engines": {
				"node": ">=6.0.0"
			}
		},
		"node_modules/spdy-transport": {
			"version": "3.0.0",
			"resolved": "https://registry.npmjs.org/spdy-transport/-/spdy-transport-3.0.0.tgz",
			"integrity": "sha512-hsLVFE5SjA6TCisWeJXFKniGGOpBgMLmerfO2aCyCU5s7nJ/rpAepqmFifv/GCbSbueEeAJJnmSQ2rKC/g8Fcw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"debug": "^4.1.0",
				"detect-node": "^2.0.4",
				"hpack.js": "^2.1.6",
				"obuf": "^1.1.2",
				"readable-stream": "^3.0.6",
				"wbuf": "^1.7.3"
			}
		},
		"node_modules/sprintf-js": {
			"version": "1.0.3",
			"resolved": "https://registry.npmjs.org/sprintf-js/-/sprintf-js-1.0.3.tgz",
			"integrity": "sha512-D9cPgkvLlV3t3IzL0D0YLvGA9Ahk4PcvVwUbN0dSGr1aP0Nrt4AEnTUbuGvquEC0mA64Gqt1fzirlRs5ibXx8g==",
			"dev": true,
			"license": "BSD-3-Clause"
		},
		"node_modules/ssri": {
			"version": "13.0.1",
			"resolved": "https://registry.npmjs.org/ssri/-/ssri-13.0.1.tgz",
			"integrity": "sha512-QUiRf1+u9wPTL/76GTYlKttDEBWV1ga9ZXW8BG6kfdeyyM8LGPix9gROyg9V2+P0xNyF3X2Go526xKFdMZrHSQ==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"minipass": "^7.0.3"
			},
			"engines": {
				"node": "^20.17.0 || >=22.9.0"
			}
		},
		"node_modules/stackback": {
			"version": "0.0.2",
			"resolved": "https://registry.npmjs.org/stackback/-/stackback-0.0.2.tgz",
			"integrity": "sha512-1XMJE5fQo1jGH6Y/7ebnwPOBEkIEnT4QF32d5R1+VXdXveM0IBMJt8zfaxX1P3QhVwrYe+576+jkANtSS2mBbw==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/stackframe": {
			"version": "1.3.4",
			"resolved": "https://registry.npmjs.org/stackframe/-/stackframe-1.3.4.tgz",
			"integrity": "sha512-oeVtt7eWQS+Na6F//S4kJ2K2VbRlS9D43mAlMyVpVWovy9o+jfgH8O9agzANzaiLjclA0oYzUXEM4PurhSUChw==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/statuses": {
			"version": "2.0.2",
			"resolved": "https://registry.npmjs.org/statuses/-/statuses-2.0.2.tgz",
			"integrity": "sha512-DvEy55V3DB7uknRo+4iOGT5fP1slR8wQohVdknigZPMpMstaKJQWhwiYBACJE3Ul2pTnATihhBYnRhZQHGBiRw==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.8"
			}
		},
		"node_modules/std-env": {
			"version": "4.0.0",
			"resolved": "https://registry.npmjs.org/std-env/-/std-env-4.0.0.tgz",
			"integrity": "sha512-zUMPtQ/HBY3/50VbpkupYHbRroTRZJPRLvreamgErJVys0ceuzMkD44J/QjqhHjOzK42GQ3QZIeFG1OYfOtKqQ==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/stdin-discarder": {
			"version": "0.3.1",
			"resolved": "https://registry.npmjs.org/stdin-discarder/-/stdin-discarder-0.3.1.tgz",
			"integrity": "sha512-reExS1kSGoElkextOcPkel4NE99S0BWxjUHQeDFnR8S993JxpPX7KU4MNmO19NXhlJp+8dmdCbKQVNgLJh2teA==",
			"license": "MIT",
			"engines": {
				"node": ">=18"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/strict-event-emitter": {
			"version": "0.5.1",
			"resolved": "https://registry.npmjs.org/strict-event-emitter/-/strict-event-emitter-0.5.1.tgz",
			"integrity": "sha512-vMgjE/GGEPEFnhFub6pa4FmJBRBVOLpIII2hvCZ8Kzb7K0hlHo7mQv6xYrBvCL2LtAIBwFUK8wvuJgTVSQ5MFQ==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/string_decoder": {
			"version": "1.3.0",
			"resolved": "https://registry.npmjs.org/string_decoder/-/string_decoder-1.3.0.tgz",
			"integrity": "sha512-hkRX8U1WjJFd8LsDJ2yQ/wWWxaopEsABU1XfkM8A+j0+85JAGppt16cr1Whg6KIbb4okU6Mql6BOj+uup/wKeA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"safe-buffer": "~5.2.0"
			}
		},
		"node_modules/string-width": {
			"version": "8.2.0",
			"resolved": "https://registry.npmjs.org/string-width/-/string-width-8.2.0.tgz",
			"integrity": "sha512-6hJPQ8N0V0P3SNmP6h2J99RLuzrWz2gvT7VnK5tKvrNqJoyS9W4/Fb8mo31UiPvy00z7DQXkP2hnKBVav76thw==",
			"license": "MIT",
			"dependencies": {
				"get-east-asian-width": "^1.5.0",
				"strip-ansi": "^7.1.2"
			},
			"engines": {
				"node": ">=20"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/strip-ansi": {
			"version": "7.2.0",
			"resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-7.2.0.tgz",
			"integrity": "sha512-yDPMNjp4WyfYBkHnjIRLfca1i6KMyGCtsVgoKe/z1+6vukgaENdgGBZt+ZmKPc4gavvEZ5OgHfHdrazhgNyG7w==",
			"license": "MIT",
			"dependencies": {
				"ansi-regex": "^6.2.2"
			},
			"engines": {
				"node": ">=12"
			},
			"funding": {
				"url": "https://github.com/chalk/strip-ansi?sponsor=1"
			}
		},
		"node_modules/strip-bom": {
			"version": "3.0.0",
			"resolved": "https://registry.npmjs.org/strip-bom/-/strip-bom-3.0.0.tgz",
			"integrity": "sha512-vavAMRXOgBVNF6nyEEmL3DBK19iRpDcoIwW+swQ+CbGiu7lju6t+JklA1MHweoWtadgt4ISVUsXLyDq34ddcwA==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=4"
			}
		},
		"node_modules/strip-json-comments": {
			"version": "3.1.1",
			"resolved": "https://registry.npmjs.org/strip-json-comments/-/strip-json-comments-3.1.1.tgz",
			"integrity": "sha512-6fPc+R4ihwqP6N/aIv2f1gMH8lOVtWQHoqC4yK6oSDVVocumAsfCqjkXnqiYMhmMwS/mEHLp7Vehlt3ql6lEig==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=8"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/style-loader": {
			"version": "3.3.4",
			"resolved": "https://registry.npmjs.org/style-loader/-/style-loader-3.3.4.tgz",
			"integrity": "sha512-0WqXzrsMTyb8yjZJHDqwmnwRJvhALK9LfRtRc6B4UTWe8AijYLZYZ9thuJTZc2VfQWINADW/j+LiJnfy2RoC1w==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 12.13.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/webpack"
			},
			"peerDependencies": {
				"webpack": "^5.0.0"
			}
		},
		"node_modules/stylehacks": {
			"version": "7.0.10",
			"resolved": "https://registry.npmjs.org/stylehacks/-/stylehacks-7.0.10.tgz",
			"integrity": "sha512-sRJ7klmhe/Fl5woJcbJUa2qP1Ueffsl1CQI4ePvqXLkZmcIuAt09aP9uT/FOFPqXh9Rh8M5UkgEnwTdTKn/Aag==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"browserslist": "^4.28.2",
				"postcss-selector-parser": "^7.1.1"
			},
			"engines": {
				"node": "^18.12.0 || ^20.9.0 || >=22.0"
			},
			"peerDependencies": {
				"postcss": "^8.5.10"
			}
		},
		"node_modules/supports-color": {
			"version": "7.2.0",
			"resolved": "https://registry.npmjs.org/supports-color/-/supports-color-7.2.0.tgz",
			"integrity": "sha512-qpCAvRl9stuOHveKsn7HncJRvv501qIacKzQlO/+Lwxc9+0q2wLyv4Dfvt80/DPn2pqOBsJdDiogXGR9+OvwRw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"has-flag": "^4.0.0"
			},
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/supports-preserve-symlinks-flag": {
			"version": "1.0.0",
			"resolved": "https://registry.npmjs.org/supports-preserve-symlinks-flag/-/supports-preserve-symlinks-flag-1.0.0.tgz",
			"integrity": "sha512-ot0WnXS9fgdkgIcePe6RHNk1WA8+muPa6cSjeR3V8K27q9BB1rTE3R1p7Hv0z1ZyAc8s6Vvv8DIyWf681MAt0w==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.4"
			},
			"funding": {
				"url": "https://github.com/sponsors/ljharb"
			}
		},
		"node_modules/svgo": {
			"version": "4.0.1",
			"resolved": "https://registry.npmjs.org/svgo/-/svgo-4.0.1.tgz",
			"integrity": "sha512-XDpWUOPC6FEibaLzjfe0ucaV0YrOjYotGJO1WpF0Zd+n6ZGEQUsSugaoLq9QkEZtAfQIxT42UChcssDVPP3+/w==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"commander": "^11.1.0",
				"css-select": "^5.1.0",
				"css-tree": "^3.0.1",
				"css-what": "^6.1.0",
				"csso": "^5.0.5",
				"picocolors": "^1.1.1",
				"sax": "^1.5.0"
			},
			"bin": {
				"svgo": "bin/svgo.js"
			},
			"engines": {
				"node": ">=16"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/svgo"
			}
		},
		"node_modules/svgo/node_modules/css-select": {
			"version": "5.2.2",
			"resolved": "https://registry.npmjs.org/css-select/-/css-select-5.2.2.tgz",
			"integrity": "sha512-TizTzUddG/xYLA3NXodFM0fSbNizXjOKhqiQQwvhlspadZokn1KDy0NZFS0wuEubIYAV5/c1/lAr0TaaFXEXzw==",
			"dev": true,
			"license": "BSD-2-Clause",
			"dependencies": {
				"boolbase": "^1.0.0",
				"css-what": "^6.1.0",
				"domhandler": "^5.0.2",
				"domutils": "^3.0.1",
				"nth-check": "^2.0.1"
			},
			"funding": {
				"url": "https://github.com/sponsors/fb55"
			}
		},
		"node_modules/svgo/node_modules/css-what": {
			"version": "6.2.2",
			"resolved": "https://registry.npmjs.org/css-what/-/css-what-6.2.2.tgz",
			"integrity": "sha512-u/O3vwbptzhMs3L1fQE82ZSLHQQfto5gyZzwteVIEyeaY5Fc7R4dapF/BvRoSYFeqfBk4m0V1Vafq5Pjv25wvA==",
			"dev": true,
			"license": "BSD-2-Clause",
			"engines": {
				"node": ">= 6"
			},
			"funding": {
				"url": "https://github.com/sponsors/fb55"
			}
		},
		"node_modules/symbol-tree": {
			"version": "3.2.4",
			"resolved": "https://registry.npmjs.org/symbol-tree/-/symbol-tree-3.2.4.tgz",
			"integrity": "sha512-9QNk5KwDF+Bvz+PyObkmSYjI5ksVUYtjW7AU22r2NKcfLJcXp96hkDWU3+XndOsUb+AQ9QhfzfCT2O+CNWT5Tw==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/sync-child-process": {
			"version": "1.0.2",
			"resolved": "https://registry.npmjs.org/sync-child-process/-/sync-child-process-1.0.2.tgz",
			"integrity": "sha512-8lD+t2KrrScJ/7KXCSyfhT3/hRq78rC0wBFqNJXv3mZyn6hW2ypM05JmlSvtqRbeq6jqA94oHbxAr2vYsJ8vDA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"sync-message-port": "^1.0.0"
			},
			"engines": {
				"node": ">=16.0.0"
			}
		},
		"node_modules/sync-message-port": {
			"version": "1.2.0",
			"resolved": "https://registry.npmjs.org/sync-message-port/-/sync-message-port-1.2.0.tgz",
			"integrity": "sha512-gAQ9qrUN/UCypHtGFbbe7Rc/f9bzO88IwrG8TDo/aMKAApKyD6E3W4Cm0EfhfBb6Z6SKt59tTCTfD+n1xmAvMg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=16.0.0"
			}
		},
		"node_modules/synckit": {
			"version": "0.11.12",
			"resolved": "https://registry.npmjs.org/synckit/-/synckit-0.11.12.tgz",
			"integrity": "sha512-Bh7QjT8/SuKUIfObSXNHNSK6WHo6J1tHCqJsuaFDP7gP0fkzSfTxI8y85JrppZ0h8l0maIgc2tfuZQ6/t3GtnQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@pkgr/core": "^0.2.9"
			},
			"engines": {
				"node": "^14.18.0 || >=16.0.0"
			},
			"funding": {
				"url": "https://opencollective.com/synckit"
			}
		},
		"node_modules/tagged-tag": {
			"version": "1.0.0",
			"resolved": "https://registry.npmjs.org/tagged-tag/-/tagged-tag-1.0.0.tgz",
			"integrity": "sha512-yEFYrVhod+hdNyx7g5Bnkkb0G6si8HJurOoOEgC8B/O0uXLHlaey/65KRv6cuWBNhBgHKAROVpc7QyYqE5gFng==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=20"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/tailwind-merge": {
			"version": "3.5.0",
			"resolved": "https://registry.npmjs.org/tailwind-merge/-/tailwind-merge-3.5.0.tgz",
			"integrity": "sha512-I8K9wewnVDkL1NTGoqWmVEIlUcB9gFriAEkXkfCjX5ib8ezGxtR3xD7iZIxrfArjEsH7F1CHD4RFUtxefdqV/A==",
			"license": "MIT",
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/dcastil"
			}
		},
		"node_modules/tailwindcss": {
			"version": "4.2.2",
			"resolved": "https://registry.npmjs.org/tailwindcss/-/tailwindcss-4.2.2.tgz",
			"integrity": "sha512-KWBIxs1Xb6NoLdMVqhbhgwZf2PGBpPEiwOqgI4pFIYbNTfBXiKYyWoTsXgBQ9WFg/OlhnvHaY+AEpW7wSmFo2Q==",
			"license": "MIT"
		},
		"node_modules/tapable": {
			"version": "2.3.2",
			"resolved": "https://registry.npmjs.org/tapable/-/tapable-2.3.2.tgz",
			"integrity": "sha512-1MOpMXuhGzGL5TTCZFItxCc0AARf1EZFQkGqMm7ERKj8+Hgr5oLvJOVFcC+lRmR8hCe2S3jC4T5D7Vg/d7/fhA==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=6"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/webpack"
			}
		},
		"node_modules/tar": {
			"version": "7.5.13",
			"resolved": "https://registry.npmjs.org/tar/-/tar-7.5.13.tgz",
			"integrity": "sha512-tOG/7GyXpFevhXVh8jOPJrmtRpOTsYqUIkVdVooZYJS/z8WhfQUX8RJILmeuJNinGAMSu1veBr4asSHFt5/hng==",
			"dev": true,
			"license": "BlueOak-1.0.0",
			"dependencies": {
				"@isaacs/fs-minipass": "^4.0.0",
				"chownr": "^3.0.0",
				"minipass": "^7.1.2",
				"minizlib": "^3.1.0",
				"yallist": "^5.0.0"
			},
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/tar-stream": {
			"version": "2.2.0",
			"resolved": "https://registry.npmjs.org/tar-stream/-/tar-stream-2.2.0.tgz",
			"integrity": "sha512-ujeqbceABgwMZxEJnk2HDY2DlnUZ+9oEcb1KzTVfYHio0UE6dG71n60d8D2I4qNvleWrrXpmjpt7vZeF1LnMZQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"bl": "^4.0.3",
				"end-of-stream": "^1.4.1",
				"fs-constants": "^1.0.0",
				"inherits": "^2.0.3",
				"readable-stream": "^3.1.1"
			},
			"engines": {
				"node": ">=6"
			}
		},
		"node_modules/tar/node_modules/yallist": {
			"version": "5.0.0",
			"resolved": "https://registry.npmjs.org/yallist/-/yallist-5.0.0.tgz",
			"integrity": "sha512-YgvUTfwqyc7UXVMrB+SImsVYSmTS8X/tSrtdNZMImM+n7+QTriRXyXim0mBrTXNeqzVF0KWGgHPeiyViFFrNDw==",
			"dev": true,
			"license": "BlueOak-1.0.0",
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/terser": {
			"version": "5.46.2",
			"resolved": "https://registry.npmjs.org/terser/-/terser-5.46.2.tgz",
			"integrity": "sha512-uxfo9fPcSgLDYob/w1FuL0c99MWiJDnv+5qXSQc5+Ki5NjVNsYi66INnMFBjf6uFz6OnX12piJQPF4IpjJTNTw==",
			"dev": true,
			"license": "BSD-2-Clause",
			"dependencies": {
				"@jridgewell/source-map": "^0.3.3",
				"acorn": "^8.15.0",
				"commander": "^2.20.0",
				"source-map-support": "~0.5.20"
			},
			"bin": {
				"terser": "bin/terser"
			},
			"engines": {
				"node": ">=10"
			}
		},
		"node_modules/terser-webpack-plugin": {
			"version": "5.4.0",
			"resolved": "https://registry.npmjs.org/terser-webpack-plugin/-/terser-webpack-plugin-5.4.0.tgz",
			"integrity": "sha512-Bn5vxm48flOIfkdl5CaD2+1CiUVbonWQ3KQPyP7/EuIl9Gbzq/gQFOzaMFUEgVjB1396tcK0SG8XcNJ/2kDH8g==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@jridgewell/trace-mapping": "^0.3.25",
				"jest-worker": "^27.4.5",
				"schema-utils": "^4.3.0",
				"terser": "^5.31.1"
			},
			"engines": {
				"node": ">= 10.13.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/webpack"
			},
			"peerDependencies": {
				"webpack": "^5.1.0"
			},
			"peerDependenciesMeta": {
				"@swc/core": {
					"optional": true
				},
				"esbuild": {
					"optional": true
				},
				"uglify-js": {
					"optional": true
				}
			}
		},
		"node_modules/terser-webpack-plugin/node_modules/jest-worker": {
			"version": "27.5.1",
			"resolved": "https://registry.npmjs.org/jest-worker/-/jest-worker-27.5.1.tgz",
			"integrity": "sha512-7vuh85V5cdDofPyxn58nrPjBktZo0u9x1g8WtjQol+jZDaE+fhN+cIvTj11GndBnMnyfrUOG1sZQxCdjKh+DKg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@types/node": "*",
				"merge-stream": "^2.0.0",
				"supports-color": "^8.0.0"
			},
			"engines": {
				"node": ">= 10.13.0"
			}
		},
		"node_modules/terser-webpack-plugin/node_modules/supports-color": {
			"version": "8.1.1",
			"resolved": "https://registry.npmjs.org/supports-color/-/supports-color-8.1.1.tgz",
			"integrity": "sha512-MpUEN2OodtUzxvKQl72cUF7RQ5EiHsGvSsVG0ia9c5RbWGL2CI4C7EpPS8UTBIplnlzZiNuV56w+FuNxy3ty2Q==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"has-flag": "^4.0.0"
			},
			"engines": {
				"node": ">=10"
			},
			"funding": {
				"url": "https://github.com/chalk/supports-color?sponsor=1"
			}
		},
		"node_modules/terser/node_modules/commander": {
			"version": "2.20.3",
			"resolved": "https://registry.npmjs.org/commander/-/commander-2.20.3.tgz",
			"integrity": "sha512-GpVkmM8vF2vQUkj2LvZmD35JxeJOLCwJ9cUkugyk2nuhbv3+mJvpLYYt+0+USMxE+oj+ey/lJEnhZw75x/OMcQ==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/thingies": {
			"version": "2.6.0",
			"resolved": "https://registry.npmjs.org/thingies/-/thingies-2.6.0.tgz",
			"integrity": "sha512-rMHRjmlFLM1R96UYPvpmnc3LYtdFrT33JIB7L9hetGue1qAPfn1N2LJeEjxUSidu1Iku+haLZXDuEXUHNGO/lg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=10.18"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/streamich"
			},
			"peerDependencies": {
				"tslib": "^2"
			}
		},
		"node_modules/thunky": {
			"version": "1.1.0",
			"resolved": "https://registry.npmjs.org/thunky/-/thunky-1.1.0.tgz",
			"integrity": "sha512-eHY7nBftgThBqOyHGVN+l8gF0BucP09fMo0oO/Lb0w1OF80dJv+lDVpXG60WMQvkcxAkNybKsrEIE3ZtKGmPrA==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/tinybench": {
			"version": "2.9.0",
			"resolved": "https://registry.npmjs.org/tinybench/-/tinybench-2.9.0.tgz",
			"integrity": "sha512-0+DUvqWMValLmha6lr4kD8iAMK1HzV0/aKnCtWb9v9641TnP/MFb7Pc2bxoxQjTXAErryXVgUOfv2YqNllqGeg==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/tinyexec": {
			"version": "1.0.4",
			"resolved": "https://registry.npmjs.org/tinyexec/-/tinyexec-1.0.4.tgz",
			"integrity": "sha512-u9r3uZC0bdpGOXtlxUIdwf9pkmvhqJdrVCH9fapQtgy/OeTTMZ1nqH7agtvEfmGui6e1XxjcdrlxvxJvc3sMqw==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/tinyglobby": {
			"version": "0.2.15",
			"resolved": "https://registry.npmjs.org/tinyglobby/-/tinyglobby-0.2.15.tgz",
			"integrity": "sha512-j2Zq4NyQYG5XMST4cbs02Ak8iJUdxRM0XI5QyxXuZOzKOINmWurp3smXu3y5wDcJrptwpSjgXHzIQxR0omXljQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"fdir": "^6.5.0",
				"picomatch": "^4.0.3"
			},
			"engines": {
				"node": ">=12.0.0"
			},
			"funding": {
				"url": "https://github.com/sponsors/SuperchupuDev"
			}
		},
		"node_modules/tinyrainbow": {
			"version": "3.1.0",
			"resolved": "https://registry.npmjs.org/tinyrainbow/-/tinyrainbow-3.1.0.tgz",
			"integrity": "sha512-Bf+ILmBgretUrdJxzXM0SgXLZ3XfiaUuOj/IKQHuTXip+05Xn+uyEYdVg0kYDipTBcLrCVyUzAPz7QmArb0mmw==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=14.0.0"
			}
		},
		"node_modules/tldts": {
			"version": "7.0.27",
			"resolved": "https://registry.npmjs.org/tldts/-/tldts-7.0.27.tgz",
			"integrity": "sha512-I4FZcVFcqCRuT0ph6dCDpPuO4Xgzvh+spkcTr1gK7peIvxWauoloVO0vuy1FQnijT63ss6AsHB6+OIM4aXHbPg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"tldts-core": "^7.0.27"
			},
			"bin": {
				"tldts": "bin/cli.js"
			}
		},
		"node_modules/tldts-core": {
			"version": "7.0.27",
			"resolved": "https://registry.npmjs.org/tldts-core/-/tldts-core-7.0.27.tgz",
			"integrity": "sha512-YQ7uPjgWUibIK6DW5lrKujGwUKhLevU4hcGbP5O6TcIUb+oTjJYJVWPS4nZsIHrEEEG6myk/oqAJUEQmpZrHsg==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/tmp": {
			"version": "0.2.5",
			"resolved": "https://registry.npmjs.org/tmp/-/tmp-0.2.5.tgz",
			"integrity": "sha512-voyz6MApa1rQGUxT3E+BK7/ROe8itEx7vD8/HEvt4xwXucvQ5G5oeEiHkmHZJuBO21RpOf+YYm9MOivj709jow==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=14.14"
			}
		},
		"node_modules/to-regex-range": {
			"version": "5.0.1",
			"resolved": "https://registry.npmjs.org/to-regex-range/-/to-regex-range-5.0.1.tgz",
			"integrity": "sha512-65P7iz6X5yEr1cwcgvQxbbIw7Uk3gOy5dIdtZ4rDveLqhrdJP+Li/Hx6tyK0NEb+2GCyneCMJiGqrADCSNk8sQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"is-number": "^7.0.0"
			},
			"engines": {
				"node": ">=8.0"
			}
		},
		"node_modules/toidentifier": {
			"version": "1.0.1",
			"resolved": "https://registry.npmjs.org/toidentifier/-/toidentifier-1.0.1.tgz",
			"integrity": "sha512-o5sSPKEkg/DIQNmH43V0/uerLrpzVedkUh8tGNvaeXpfpuwjKenlSox/2O/BTlZUtEe+JG7s5YhEz608PlAHRA==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=0.6"
			}
		},
		"node_modules/tough-cookie": {
			"version": "6.0.1",
			"resolved": "https://registry.npmjs.org/tough-cookie/-/tough-cookie-6.0.1.tgz",
			"integrity": "sha512-LktZQb3IeoUWB9lqR5EWTHgW/VTITCXg4D21M+lvybRVdylLrRMnqaIONLVb5mav8vM19m44HIcGq4qASeu2Qw==",
			"dev": true,
			"license": "BSD-3-Clause",
			"dependencies": {
				"tldts": "^7.0.5"
			},
			"engines": {
				"node": ">=16"
			}
		},
		"node_modules/tr46": {
			"version": "6.0.0",
			"resolved": "https://registry.npmjs.org/tr46/-/tr46-6.0.0.tgz",
			"integrity": "sha512-bLVMLPtstlZ4iMQHpFHTR7GAGj2jxi8Dg0s2h2MafAE4uSWF98FC/3MomU51iQAMf8/qDUbKWf5GxuvvVcXEhw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"punycode": "^2.3.1"
			},
			"engines": {
				"node": ">=20"
			}
		},
		"node_modules/tree-dump": {
			"version": "1.1.0",
			"resolved": "https://registry.npmjs.org/tree-dump/-/tree-dump-1.1.0.tgz",
			"integrity": "sha512-rMuvhU4MCDbcbnleZTFezWsaZXRFemSqAM+7jPnzUl1fo9w3YEKOxAeui0fz3OI4EU4hf23iyA7uQRVko+UaBA==",
			"dev": true,
			"license": "Apache-2.0",
			"engines": {
				"node": ">=10.0"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/streamich"
			},
			"peerDependencies": {
				"tslib": "2"
			}
		},
		"node_modules/tree-kill": {
			"version": "1.2.2",
			"resolved": "https://registry.npmjs.org/tree-kill/-/tree-kill-1.2.2.tgz",
			"integrity": "sha512-L0Orpi8qGpRG//Nd+H90vFB+3iHnue1zSSGmNOOCh1GLJ7rUKVwV2HvijphGQS2UmhUZewS9VgvxYIdgr+fG1A==",
			"dev": true,
			"license": "MIT",
			"bin": {
				"tree-kill": "cli.js"
			}
		},
		"node_modules/ts-api-utils": {
			"version": "2.5.0",
			"resolved": "https://registry.npmjs.org/ts-api-utils/-/ts-api-utils-2.5.0.tgz",
			"integrity": "sha512-OJ/ibxhPlqrMM0UiNHJ/0CKQkoKF243/AEmplt3qpRgkW8VG7IfOS41h7V8TjITqdByHzrjcS/2si+y4lIh8NA==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=18.12"
			},
			"peerDependencies": {
				"typescript": ">=4.8.4"
			}
		},
		"node_modules/ts-checker-rspack-plugin": {
			"version": "1.3.0",
			"resolved": "https://registry.npmjs.org/ts-checker-rspack-plugin/-/ts-checker-rspack-plugin-1.3.0.tgz",
			"integrity": "sha512-89oK/BtApjdid1j9CGjPGiYry+EZBhsnTAM481/8ipgr/y2IOgCbW1HPnan+fs5FnzlpUgf9dWGNZ4Ayw3Bd8A==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@rspack/lite-tapable": "^1.1.0",
				"chokidar": "^3.6.0",
				"memfs": "^4.56.10",
				"picocolors": "^1.1.1"
			},
			"peerDependencies": {
				"@rspack/core": "^1.0.0 || ^2.0.0-0",
				"typescript": ">=3.8.0"
			},
			"peerDependenciesMeta": {
				"@rspack/core": {
					"optional": true
				}
			}
		},
		"node_modules/ts-checker-rspack-plugin/node_modules/chokidar": {
			"version": "3.6.0",
			"resolved": "https://registry.npmjs.org/chokidar/-/chokidar-3.6.0.tgz",
			"integrity": "sha512-7VT13fmjotKpGipCW9JEQAusEPE+Ei8nl6/g4FBAmIm0GOOLMua9NDDo/DWp0ZAxCr3cPq5ZpBqmPAQgDda2Pw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"anymatch": "~3.1.2",
				"braces": "~3.0.2",
				"glob-parent": "~5.1.2",
				"is-binary-path": "~2.1.0",
				"is-glob": "~4.0.1",
				"normalize-path": "~3.0.0",
				"readdirp": "~3.6.0"
			},
			"engines": {
				"node": ">= 8.10.0"
			},
			"funding": {
				"url": "https://paulmillr.com/funding/"
			},
			"optionalDependencies": {
				"fsevents": "~2.3.2"
			}
		},
		"node_modules/ts-checker-rspack-plugin/node_modules/glob-parent": {
			"version": "5.1.2",
			"resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
			"integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"is-glob": "^4.0.1"
			},
			"engines": {
				"node": ">= 6"
			}
		},
		"node_modules/ts-checker-rspack-plugin/node_modules/memfs": {
			"version": "4.57.2",
			"resolved": "https://registry.npmjs.org/memfs/-/memfs-4.57.2.tgz",
			"integrity": "sha512-2nWzSsJzrukurSDna4Z0WywuScK4Id3tSKejgu74u8KCdW4uNrseKRSIDg75C6Yw5ZRqBe0F0EtMNlTbUq8bAQ==",
			"dev": true,
			"license": "Apache-2.0",
			"dependencies": {
				"@jsonjoy.com/fs-core": "4.57.2",
				"@jsonjoy.com/fs-fsa": "4.57.2",
				"@jsonjoy.com/fs-node": "4.57.2",
				"@jsonjoy.com/fs-node-builtins": "4.57.2",
				"@jsonjoy.com/fs-node-to-fsa": "4.57.2",
				"@jsonjoy.com/fs-node-utils": "4.57.2",
				"@jsonjoy.com/fs-print": "4.57.2",
				"@jsonjoy.com/fs-snapshot": "4.57.2",
				"@jsonjoy.com/json-pack": "^1.11.0",
				"@jsonjoy.com/util": "^1.9.0",
				"glob-to-regex.js": "^1.0.1",
				"thingies": "^2.5.0",
				"tree-dump": "^1.0.3",
				"tslib": "^2.0.0"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/streamich"
			},
			"peerDependencies": {
				"tslib": "2"
			}
		},
		"node_modules/ts-checker-rspack-plugin/node_modules/picomatch": {
			"version": "2.3.2",
			"resolved": "https://registry.npmjs.org/picomatch/-/picomatch-2.3.2.tgz",
			"integrity": "sha512-V7+vQEJ06Z+c5tSye8S+nHUfI51xoXIXjHQ99cQtKUkQqqO1kO/KCJUfZXuB47h/YBlDhah2H3hdUGXn8ie0oA==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=8.6"
			},
			"funding": {
				"url": "https://github.com/sponsors/jonschlinkert"
			}
		},
		"node_modules/ts-checker-rspack-plugin/node_modules/readdirp": {
			"version": "3.6.0",
			"resolved": "https://registry.npmjs.org/readdirp/-/readdirp-3.6.0.tgz",
			"integrity": "sha512-hOS089on8RduqdbhvQ5Z37A0ESjsqz6qnRcffsMU3495FuTdqSm+7bhJ29JvIOsBDEEnan5DPu9t3To9VRlMzA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"picomatch": "^2.2.1"
			},
			"engines": {
				"node": ">=8.10.0"
			}
		},
		"node_modules/ts-loader": {
			"version": "9.5.7",
			"resolved": "https://registry.npmjs.org/ts-loader/-/ts-loader-9.5.7.tgz",
			"integrity": "sha512-/ZNrKgA3K3PtpMYOC71EeMWIloGw3IYEa5/t1cyz2r5/PyUwTXGzYJvcD3kfUvmhlfpz1rhV8B2O6IVTQ0avsg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"chalk": "^4.1.0",
				"enhanced-resolve": "^5.0.0",
				"micromatch": "^4.0.0",
				"semver": "^7.3.4",
				"source-map": "^0.7.4"
			},
			"engines": {
				"node": ">=12.0.0"
			},
			"peerDependencies": {
				"typescript": "*",
				"webpack": "^5.0.0"
			}
		},
		"node_modules/ts-loader/node_modules/ansi-styles": {
			"version": "4.3.0",
			"resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz",
			"integrity": "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"color-convert": "^2.0.1"
			},
			"engines": {
				"node": ">=8"
			},
			"funding": {
				"url": "https://github.com/chalk/ansi-styles?sponsor=1"
			}
		},
		"node_modules/ts-loader/node_modules/chalk": {
			"version": "4.1.2",
			"resolved": "https://registry.npmjs.org/chalk/-/chalk-4.1.2.tgz",
			"integrity": "sha512-oKnbhFyRIXpUuez8iBMmyEa4nbj4IOQyuhc/wy9kY7/WVPcwIO9VA668Pu8RkO7+0G76SLROeyw9CpQ061i4mA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ansi-styles": "^4.1.0",
				"supports-color": "^7.1.0"
			},
			"engines": {
				"node": ">=10"
			},
			"funding": {
				"url": "https://github.com/chalk/chalk?sponsor=1"
			}
		},
		"node_modules/ts-morph": {
			"version": "25.0.1",
			"resolved": "https://registry.npmjs.org/ts-morph/-/ts-morph-25.0.1.tgz",
			"integrity": "sha512-QJEiTdnz1YjrB3JFhd626gX4rKHDLSjSVMvGGG4v7ONc3RBwa0Eei98G9AT9uNFDMtV54JyuXsFeC+OH0n6bXQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@ts-morph/common": "~0.26.0",
				"code-block-writer": "^13.0.3"
			}
		},
		"node_modules/tsconfig-paths": {
			"version": "4.2.0",
			"resolved": "https://registry.npmjs.org/tsconfig-paths/-/tsconfig-paths-4.2.0.tgz",
			"integrity": "sha512-NoZ4roiN7LnbKn9QqE1amc9DJfzvZXxF4xDavcOWt1BPkdx+m+0gJuPM+S0vCe7zTJMYUP0R8pO2XMr+Y8oLIg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"json5": "^2.2.2",
				"minimist": "^1.2.6",
				"strip-bom": "^3.0.0"
			},
			"engines": {
				"node": ">=6"
			}
		},
		"node_modules/tsconfig-paths-webpack-plugin": {
			"version": "4.2.0",
			"resolved": "https://registry.npmjs.org/tsconfig-paths-webpack-plugin/-/tsconfig-paths-webpack-plugin-4.2.0.tgz",
			"integrity": "sha512-zbem3rfRS8BgeNK50Zz5SIQgXzLafiHjOwUAvk/38/o1jHn/V5QAgVUcz884or7WYcPaH3N2CIfUc2u0ul7UcA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"chalk": "^4.1.0",
				"enhanced-resolve": "^5.7.0",
				"tapable": "^2.2.1",
				"tsconfig-paths": "^4.1.2"
			},
			"engines": {
				"node": ">=10.13.0"
			}
		},
		"node_modules/tsconfig-paths-webpack-plugin/node_modules/ansi-styles": {
			"version": "4.3.0",
			"resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz",
			"integrity": "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"color-convert": "^2.0.1"
			},
			"engines": {
				"node": ">=8"
			},
			"funding": {
				"url": "https://github.com/chalk/ansi-styles?sponsor=1"
			}
		},
		"node_modules/tsconfig-paths-webpack-plugin/node_modules/chalk": {
			"version": "4.1.2",
			"resolved": "https://registry.npmjs.org/chalk/-/chalk-4.1.2.tgz",
			"integrity": "sha512-oKnbhFyRIXpUuez8iBMmyEa4nbj4IOQyuhc/wy9kY7/WVPcwIO9VA668Pu8RkO7+0G76SLROeyw9CpQ061i4mA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ansi-styles": "^4.1.0",
				"supports-color": "^7.1.0"
			},
			"engines": {
				"node": ">=10"
			},
			"funding": {
				"url": "https://github.com/chalk/chalk?sponsor=1"
			}
		},
		"node_modules/tslib": {
			"version": "2.8.1",
			"resolved": "https://registry.npmjs.org/tslib/-/tslib-2.8.1.tgz",
			"integrity": "sha512-oJFu94HQb+KVduSUQL7wnpmqnfmLsOA/nAh6b6EH0wCEoK0/mPeXU6c3wKDV83MkOuHPRHtSXKKU99IBazS/2w==",
			"license": "0BSD"
		},
		"node_modules/tsyringe": {
			"version": "4.10.0",
			"resolved": "https://registry.npmjs.org/tsyringe/-/tsyringe-4.10.0.tgz",
			"integrity": "sha512-axr3IdNuVIxnaK5XGEUFTu3YmAQ6lllgrvqfEoR16g/HGnYY/6We4oWENtAnzK6/LpJ2ur9PAb80RBt7/U4ugw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"tslib": "^1.9.3"
			},
			"engines": {
				"node": ">= 6.0.0"
			}
		},
		"node_modules/tsyringe/node_modules/tslib": {
			"version": "1.14.1",
			"resolved": "https://registry.npmjs.org/tslib/-/tslib-1.14.1.tgz",
			"integrity": "sha512-Xni35NKzjgMrwevysHTCArtLDpPvye8zV/0E4EyYn43P7/7qvQwPh9BGkHewbMulVntbigmcT7rdX3BNo9wRJg==",
			"dev": true,
			"license": "0BSD"
		},
		"node_modules/tuf-js": {
			"version": "4.1.0",
			"resolved": "https://registry.npmjs.org/tuf-js/-/tuf-js-4.1.0.tgz",
			"integrity": "sha512-50QV99kCKH5P/Vs4E2Gzp7BopNV+KzTXqWeaxrfu5IQJBOULRsTIS9seSsOVT8ZnGXzCyx55nYWAi4qJzpZKEQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@tufjs/models": "4.1.0",
				"debug": "^4.4.3",
				"make-fetch-happen": "^15.0.1"
			},
			"engines": {
				"node": "^20.17.0 || >=22.9.0"
			}
		},
		"node_modules/tw-animate-css": {
			"version": "1.4.0",
			"resolved": "https://registry.npmjs.org/tw-animate-css/-/tw-animate-css-1.4.0.tgz",
			"integrity": "sha512-7bziOlRqH0hJx80h/3mbicLW7o8qLsH5+RaLR2t+OHM3D0JlWGODQKQ4cxbK7WlvmUxpcj6Kgu6EKqjrGFe3QQ==",
			"dev": true,
			"license": "MIT",
			"funding": {
				"url": "https://github.com/sponsors/Wombosvideo"
			}
		},
		"node_modules/type-check": {
			"version": "0.4.0",
			"resolved": "https://registry.npmjs.org/type-check/-/type-check-0.4.0.tgz",
			"integrity": "sha512-XleUoc9uwGXqjWwXaUTZAmzMcFZ5858QA2vvx1Ur5xIcixXIP+8LnFDgRplU30us6teqdlskFfu+ae4K79Ooew==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"prelude-ls": "^1.2.1"
			},
			"engines": {
				"node": ">= 0.8.0"
			}
		},
		"node_modules/type-fest": {
			"version": "5.5.0",
			"resolved": "https://registry.npmjs.org/type-fest/-/type-fest-5.5.0.tgz",
			"integrity": "sha512-PlBfpQwiUvGViBNX84Yxwjsdhd1TUlXr6zjX7eoirtCPIr08NAmxwa+fcYBTeRQxHo9YC9wwF3m9i700sHma8g==",
			"dev": true,
			"license": "(MIT OR CC0-1.0)",
			"dependencies": {
				"tagged-tag": "^1.0.0"
			},
			"engines": {
				"node": ">=20"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/type-is": {
			"version": "2.0.1",
			"resolved": "https://registry.npmjs.org/type-is/-/type-is-2.0.1.tgz",
			"integrity": "sha512-OZs6gsjF4vMp32qrCbiVSkrFmXtG/AZhY3t0iAMrMBiAZyV9oALtXO8hsrHbMXF9x6L3grlFuwW2oAz7cav+Gw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"content-type": "^1.0.5",
				"media-typer": "^1.1.0",
				"mime-types": "^3.0.0"
			},
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/typed-assert": {
			"version": "1.0.9",
			"resolved": "https://registry.npmjs.org/typed-assert/-/typed-assert-1.0.9.tgz",
			"integrity": "sha512-KNNZtayBCtmnNmbo5mG47p1XsCyrx6iVqomjcZnec/1Y5GGARaxPs6r49RnSPeUP3YjNYiU9sQHAtY4BBvnZwg==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/typescript": {
			"version": "5.9.3",
			"resolved": "https://registry.npmjs.org/typescript/-/typescript-5.9.3.tgz",
			"integrity": "sha512-jl1vZzPDinLr9eUt3J/t7V6FgNEw9QjvBPdysz9KfQDD41fQrC2Y4vKQdiaUpFT4bXlb1RHhLpp8wtm6M5TgSw==",
			"dev": true,
			"license": "Apache-2.0",
			"bin": {
				"tsc": "bin/tsc",
				"tsserver": "bin/tsserver"
			},
			"engines": {
				"node": ">=14.17"
			}
		},
		"node_modules/typescript-eslint": {
			"version": "8.56.1",
			"resolved": "https://registry.npmjs.org/typescript-eslint/-/typescript-eslint-8.56.1.tgz",
			"integrity": "sha512-U4lM6pjmBX7J5wk4szltF7I1cGBHXZopnAXCMXb3+fZ3B/0Z3hq3wS/CCUB2NZBNAExK92mCU2tEohWuwVMsDQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@typescript-eslint/eslint-plugin": "8.56.1",
				"@typescript-eslint/parser": "8.56.1",
				"@typescript-eslint/typescript-estree": "8.56.1",
				"@typescript-eslint/utils": "8.56.1"
			},
			"engines": {
				"node": "^18.18.0 || ^20.9.0 || >=21.1.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/typescript-eslint"
			},
			"peerDependencies": {
				"eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
				"typescript": ">=4.8.4 <6.0.0"
			}
		},
		"node_modules/typescript-eslint/node_modules/@typescript-eslint/project-service": {
			"version": "8.56.1",
			"resolved": "https://registry.npmjs.org/@typescript-eslint/project-service/-/project-service-8.56.1.tgz",
			"integrity": "sha512-TAdqQTzHNNvlVFfR+hu2PDJrURiwKsUvxFn1M0h95BB8ah5jejas08jUWG4dBA68jDMI988IvtfdAI53JzEHOQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@typescript-eslint/tsconfig-utils": "^8.56.1",
				"@typescript-eslint/types": "^8.56.1",
				"debug": "^4.4.3"
			},
			"engines": {
				"node": "^18.18.0 || ^20.9.0 || >=21.1.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/typescript-eslint"
			},
			"peerDependencies": {
				"typescript": ">=4.8.4 <6.0.0"
			}
		},
		"node_modules/typescript-eslint/node_modules/@typescript-eslint/scope-manager": {
			"version": "8.56.1",
			"resolved": "https://registry.npmjs.org/@typescript-eslint/scope-manager/-/scope-manager-8.56.1.tgz",
			"integrity": "sha512-YAi4VDKcIZp0O4tz/haYKhmIDZFEUPOreKbfdAN3SzUDMcPhJ8QI99xQXqX+HoUVq8cs85eRKnD+rne2UAnj2w==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@typescript-eslint/types": "8.56.1",
				"@typescript-eslint/visitor-keys": "8.56.1"
			},
			"engines": {
				"node": "^18.18.0 || ^20.9.0 || >=21.1.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/typescript-eslint"
			}
		},
		"node_modules/typescript-eslint/node_modules/@typescript-eslint/tsconfig-utils": {
			"version": "8.56.1",
			"resolved": "https://registry.npmjs.org/@typescript-eslint/tsconfig-utils/-/tsconfig-utils-8.56.1.tgz",
			"integrity": "sha512-qOtCYzKEeyr3aR9f28mPJqBty7+DBqsdd63eO0yyDwc6vgThj2UjWfJIcsFeSucYydqcuudMOprZ+x1SpF3ZuQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": "^18.18.0 || ^20.9.0 || >=21.1.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/typescript-eslint"
			},
			"peerDependencies": {
				"typescript": ">=4.8.4 <6.0.0"
			}
		},
		"node_modules/typescript-eslint/node_modules/@typescript-eslint/types": {
			"version": "8.56.1",
			"resolved": "https://registry.npmjs.org/@typescript-eslint/types/-/types-8.56.1.tgz",
			"integrity": "sha512-dbMkdIUkIkchgGDIv7KLUpa0Mda4IYjo4IAMJUZ+3xNoUXxMsk9YtKpTHSChRS85o+H9ftm51gsK1dZReY9CVw==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": "^18.18.0 || ^20.9.0 || >=21.1.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/typescript-eslint"
			}
		},
		"node_modules/typescript-eslint/node_modules/@typescript-eslint/typescript-estree": {
			"version": "8.56.1",
			"resolved": "https://registry.npmjs.org/@typescript-eslint/typescript-estree/-/typescript-estree-8.56.1.tgz",
			"integrity": "sha512-qzUL1qgalIvKWAf9C1HpvBjif+Vm6rcT5wZd4VoMb9+Km3iS3Cv9DY6dMRMDtPnwRAFyAi7YXJpTIEXLvdfPxg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@typescript-eslint/project-service": "8.56.1",
				"@typescript-eslint/tsconfig-utils": "8.56.1",
				"@typescript-eslint/types": "8.56.1",
				"@typescript-eslint/visitor-keys": "8.56.1",
				"debug": "^4.4.3",
				"minimatch": "^10.2.2",
				"semver": "^7.7.3",
				"tinyglobby": "^0.2.15",
				"ts-api-utils": "^2.4.0"
			},
			"engines": {
				"node": "^18.18.0 || ^20.9.0 || >=21.1.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/typescript-eslint"
			},
			"peerDependencies": {
				"typescript": ">=4.8.4 <6.0.0"
			}
		},
		"node_modules/typescript-eslint/node_modules/@typescript-eslint/utils": {
			"version": "8.56.1",
			"resolved": "https://registry.npmjs.org/@typescript-eslint/utils/-/utils-8.56.1.tgz",
			"integrity": "sha512-HPAVNIME3tABJ61siYlHzSWCGtOoeP2RTIaHXFMPqjrQKCGB9OgUVdiNgH7TJS2JNIQ5qQ4RsAUDuGaGme/KOA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@eslint-community/eslint-utils": "^4.9.1",
				"@typescript-eslint/scope-manager": "8.56.1",
				"@typescript-eslint/types": "8.56.1",
				"@typescript-eslint/typescript-estree": "8.56.1"
			},
			"engines": {
				"node": "^18.18.0 || ^20.9.0 || >=21.1.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/typescript-eslint"
			},
			"peerDependencies": {
				"eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
				"typescript": ">=4.8.4 <6.0.0"
			}
		},
		"node_modules/typescript-eslint/node_modules/@typescript-eslint/visitor-keys": {
			"version": "8.56.1",
			"resolved": "https://registry.npmjs.org/@typescript-eslint/visitor-keys/-/visitor-keys-8.56.1.tgz",
			"integrity": "sha512-KiROIzYdEV85YygXw6BI/Dx4fnBlFQu6Mq4QE4MOH9fFnhohw6wX/OAvDY2/C+ut0I3RSPKenvZJIVYqJNkhEw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@typescript-eslint/types": "8.56.1",
				"eslint-visitor-keys": "^5.0.0"
			},
			"engines": {
				"node": "^18.18.0 || ^20.9.0 || >=21.1.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/typescript-eslint"
			}
		},
		"node_modules/typescript-eslint/node_modules/eslint-visitor-keys": {
			"version": "5.0.1",
			"resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-5.0.1.tgz",
			"integrity": "sha512-tD40eHxA35h0PEIZNeIjkHoDR4YjjJp34biM0mDvplBe//mB+IHCqHDGV7pxF+7MklTvighcCPPZC7ynWyjdTA==",
			"dev": true,
			"license": "Apache-2.0",
			"engines": {
				"node": "^20.19.0 || ^22.13.0 || >=24"
			},
			"funding": {
				"url": "https://opencollective.com/eslint"
			}
		},
		"node_modules/undici": {
			"version": "7.24.4",
			"resolved": "https://registry.npmjs.org/undici/-/undici-7.24.4.tgz",
			"integrity": "sha512-BM/JzwwaRXxrLdElV2Uo6cTLEjhSb3WXboncJamZ15NgUURmvlXvxa6xkwIOILIjPNo9i8ku136ZvWV0Uly8+w==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=20.18.1"
			}
		},
		"node_modules/undici-types": {
			"version": "7.19.2",
			"resolved": "https://registry.npmjs.org/undici-types/-/undici-types-7.19.2.tgz",
			"integrity": "sha512-qYVnV5OEm2AW8cJMCpdV20CDyaN3g0AjDlOGf1OW4iaDEx8MwdtChUp4zu4H0VP3nDRF/8RKWH+IPp9uW0YGZg==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/unicode-canonical-property-names-ecmascript": {
			"version": "2.0.1",
			"resolved": "https://registry.npmjs.org/unicode-canonical-property-names-ecmascript/-/unicode-canonical-property-names-ecmascript-2.0.1.tgz",
			"integrity": "sha512-dA8WbNeb2a6oQzAQ55YlT5vQAWGV9WXOsi3SskE3bcCdM0P4SDd+24zS/OCacdRq5BkdsRj9q3Pg6YyQoxIGqg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=4"
			}
		},
		"node_modules/unicode-match-property-ecmascript": {
			"version": "2.0.0",
			"resolved": "https://registry.npmjs.org/unicode-match-property-ecmascript/-/unicode-match-property-ecmascript-2.0.0.tgz",
			"integrity": "sha512-5kaZCrbp5mmbz5ulBkDkbY0SsPOjKqVS35VpL9ulMPfSl0J0Xsm+9Evphv9CoIZFwre7aJoa94AY6seMKGVN5Q==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"unicode-canonical-property-names-ecmascript": "^2.0.0",
				"unicode-property-aliases-ecmascript": "^2.0.0"
			},
			"engines": {
				"node": ">=4"
			}
		},
		"node_modules/unicode-match-property-value-ecmascript": {
			"version": "2.2.1",
			"resolved": "https://registry.npmjs.org/unicode-match-property-value-ecmascript/-/unicode-match-property-value-ecmascript-2.2.1.tgz",
			"integrity": "sha512-JQ84qTuMg4nVkx8ga4A16a1epI9H6uTXAknqxkGF/aFfRLw1xC/Bp24HNLaZhHSkWd3+84t8iXnp1J0kYcZHhg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=4"
			}
		},
		"node_modules/unicode-property-aliases-ecmascript": {
			"version": "2.2.0",
			"resolved": "https://registry.npmjs.org/unicode-property-aliases-ecmascript/-/unicode-property-aliases-ecmascript-2.2.0.tgz",
			"integrity": "sha512-hpbDzxUY9BFwX+UeBnxv3Sh1q7HFxj48DTmXchNgRa46lO8uj3/1iEn3MiNUYTg1g9ctIqXCCERn8gYZhHC5lQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=4"
			}
		},
		"node_modules/union": {
			"version": "0.5.0",
			"resolved": "https://registry.npmjs.org/union/-/union-0.5.0.tgz",
			"integrity": "sha512-N6uOhuW6zO95P3Mel2I2zMsbsanvvtgn6jVqJv4vbVcz/JN0OkL9suomjQGmWtxJQXOCqUJvquc1sMeNz/IwlA==",
			"dev": true,
			"dependencies": {
				"qs": "^6.4.0"
			},
			"engines": {
				"node": ">= 0.8.0"
			}
		},
		"node_modules/universalify": {
			"version": "2.0.1",
			"resolved": "https://registry.npmjs.org/universalify/-/universalify-2.0.1.tgz",
			"integrity": "sha512-gptHNQghINnc/vTGIk0SOFGFNXw7JVrlRUtConJRlvaw6DuX0wO5Jeko9sWrMBhh+PsYAZ7oXAiOnf/UKogyiw==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 10.0.0"
			}
		},
		"node_modules/unpipe": {
			"version": "1.0.0",
			"resolved": "https://registry.npmjs.org/unpipe/-/unpipe-1.0.0.tgz",
			"integrity": "sha512-pjy2bYhSsufwWlKwPc+l3cN7+wuJlK6uz0YdJEOlQDbl6jo/YlPi4mb8agUkVC8BF7V8NuzeyPNqRksA3hztKQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.8"
			}
		},
		"node_modules/until-async": {
			"version": "3.0.2",
			"resolved": "https://registry.npmjs.org/until-async/-/until-async-3.0.2.tgz",
			"integrity": "sha512-IiSk4HlzAMqTUseHHe3VhIGyuFmN90zMTpD3Z3y8jeQbzLIq500MVM7Jq2vUAnTKAFPJrqwkzr6PoTcPhGcOiw==",
			"dev": true,
			"license": "MIT",
			"funding": {
				"url": "https://github.com/sponsors/kettanaito"
			}
		},
		"node_modules/upath": {
			"version": "2.0.1",
			"resolved": "https://registry.npmjs.org/upath/-/upath-2.0.1.tgz",
			"integrity": "sha512-1uEe95xksV1O0CYKXo8vQvN1JEbtJp7lb7C5U9HMsIp6IVwntkH/oNUzyVNQSd4S1sYk2FpSSW44FqMc8qee5w==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=4",
				"yarn": "*"
			}
		},
		"node_modules/update-browserslist-db": {
			"version": "1.2.3",
			"resolved": "https://registry.npmjs.org/update-browserslist-db/-/update-browserslist-db-1.2.3.tgz",
			"integrity": "sha512-Js0m9cx+qOgDxo0eMiFGEueWztz+d4+M3rGlmKPT+T4IS/jP4ylw3Nwpu6cpTTP8R1MAC1kF4VbdLt3ARf209w==",
			"dev": true,
			"funding": [
				{
					"type": "opencollective",
					"url": "https://opencollective.com/browserslist"
				},
				{
					"type": "tidelift",
					"url": "https://tidelift.com/funding/github/npm/browserslist"
				},
				{
					"type": "github",
					"url": "https://github.com/sponsors/ai"
				}
			],
			"license": "MIT",
			"dependencies": {
				"escalade": "^3.2.0",
				"picocolors": "^1.1.1"
			},
			"bin": {
				"update-browserslist-db": "cli.js"
			},
			"peerDependencies": {
				"browserslist": ">= 4.21.0"
			}
		},
		"node_modules/uri-js": {
			"version": "4.4.1",
			"resolved": "https://registry.npmjs.org/uri-js/-/uri-js-4.4.1.tgz",
			"integrity": "sha512-7rKUyy33Q1yc98pQ1DAmLtwX109F7TIfWlW1Ydo8Wl1ii1SeHieeh0HHfPeL2fMXK6z0s8ecKs9frCuLJvndBg==",
			"dev": true,
			"license": "BSD-2-Clause",
			"dependencies": {
				"punycode": "^2.1.0"
			}
		},
		"node_modules/url-join": {
			"version": "4.0.1",
			"resolved": "https://registry.npmjs.org/url-join/-/url-join-4.0.1.tgz",
			"integrity": "sha512-jk1+QP6ZJqyOiuEI9AEWQfju/nB2Pw466kbA0LEZljHwKeMgd9WrAEgEGxjPDD2+TNbbb37rTyhEfrCXfuKXnA==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/util-deprecate": {
			"version": "1.0.2",
			"resolved": "https://registry.npmjs.org/util-deprecate/-/util-deprecate-1.0.2.tgz",
			"integrity": "sha512-EPD5q1uXyFxJpCrLnCc1nHnq3gOa6DZBocAIiI2TaSCA7VCJ1UJDMagCzIkXNsUYfD1daK//LTEQ8xiIbrHtcw==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/utils-merge": {
			"version": "1.0.1",
			"resolved": "https://registry.npmjs.org/utils-merge/-/utils-merge-1.0.1.tgz",
			"integrity": "sha512-pMZTvIkT1d+TFGvDOqodOclx0QWkkgi6Tdoa8gC8ffGAAqz9pzPTZWAybbsHHoED/ztMtkv/VoYTYyShUn81hA==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.4.0"
			}
		},
		"node_modules/uuid": {
			"version": "8.3.2",
			"resolved": "https://registry.npmjs.org/uuid/-/uuid-8.3.2.tgz",
			"integrity": "sha512-+NYs2QeMWy+GWFOEm9xnn6HCDp0l7QBD7ml8zLUmJ+93Q5NF0NocErnwkTkXVFNiX3/fpC6afS8Dhb/gz7R7eg==",
			"dev": true,
			"license": "MIT",
			"bin": {
				"uuid": "dist/bin/uuid"
			}
		},
		"node_modules/validate-npm-package-name": {
			"version": "7.0.2",
			"resolved": "https://registry.npmjs.org/validate-npm-package-name/-/validate-npm-package-name-7.0.2.tgz",
			"integrity": "sha512-hVDIBwsRruT73PbK7uP5ebUt+ezEtCmzZz3F59BSr2F6OVFnJ/6h8liuvdLrQ88Xmnk6/+xGGuq+pG9WwTuy3A==",
			"dev": true,
			"license": "ISC",
			"engines": {
				"node": "^20.17.0 || >=22.9.0"
			}
		},
		"node_modules/varint": {
			"version": "6.0.0",
			"resolved": "https://registry.npmjs.org/varint/-/varint-6.0.0.tgz",
			"integrity": "sha512-cXEIW6cfr15lFv563k4GuVuW/fiwjknytD37jIOLSdSWuOI6WnO/oKwmP2FQTU2l01LP8/M5TSAJpzUaGe3uWg==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/vary": {
			"version": "1.1.2",
			"resolved": "https://registry.npmjs.org/vary/-/vary-1.1.2.tgz",
			"integrity": "sha512-BNGbWLfd0eUPabhkXUVm0j8uuvREyTh5ovRa/dyow/BqAbZJyC+5fU+IzQOzmAKzYqYRAISoRhdQr3eIZ/PXqg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.8"
			}
		},
		"node_modules/vite": {
			"version": "7.3.1",
			"resolved": "https://registry.npmjs.org/vite/-/vite-7.3.1.tgz",
			"integrity": "sha512-w+N7Hifpc3gRjZ63vYBXA56dvvRlNWRczTdmCBBa+CotUzAPf5b7YMdMR/8CQoeYE5LX3W4wj6RYTgonm1b9DA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"esbuild": "^0.27.0",
				"fdir": "^6.5.0",
				"picomatch": "^4.0.3",
				"postcss": "^8.5.6",
				"rollup": "^4.43.0",
				"tinyglobby": "^0.2.15"
			},
			"bin": {
				"vite": "bin/vite.js"
			},
			"engines": {
				"node": "^20.19.0 || >=22.12.0"
			},
			"funding": {
				"url": "https://github.com/vitejs/vite?sponsor=1"
			},
			"optionalDependencies": {
				"fsevents": "~2.3.3"
			},
			"peerDependencies": {
				"@types/node": "^20.19.0 || >=22.12.0",
				"jiti": ">=1.21.0",
				"less": "^4.0.0",
				"lightningcss": "^1.21.0",
				"sass": "^1.70.0",
				"sass-embedded": "^1.70.0",
				"stylus": ">=0.54.8",
				"sugarss": "^5.0.0",
				"terser": "^5.16.0",
				"tsx": "^4.8.1",
				"yaml": "^2.4.2"
			},
			"peerDependenciesMeta": {
				"@types/node": {
					"optional": true
				},
				"jiti": {
					"optional": true
				},
				"less": {
					"optional": true
				},
				"lightningcss": {
					"optional": true
				},
				"sass": {
					"optional": true
				},
				"sass-embedded": {
					"optional": true
				},
				"stylus": {
					"optional": true
				},
				"sugarss": {
					"optional": true
				},
				"terser": {
					"optional": true
				},
				"tsx": {
					"optional": true
				},
				"yaml": {
					"optional": true
				}
			}
		},
		"node_modules/vitest": {
			"version": "4.1.2",
			"resolved": "https://registry.npmjs.org/vitest/-/vitest-4.1.2.tgz",
			"integrity": "sha512-xjR1dMTVHlFLh98JE3i/f/WePqJsah4A0FK9cc8Ehp9Udk0AZk6ccpIZhh1qJ/yxVWRZ+Q54ocnD8TXmkhspGg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@vitest/expect": "4.1.2",
				"@vitest/mocker": "4.1.2",
				"@vitest/pretty-format": "4.1.2",
				"@vitest/runner": "4.1.2",
				"@vitest/snapshot": "4.1.2",
				"@vitest/spy": "4.1.2",
				"@vitest/utils": "4.1.2",
				"es-module-lexer": "^2.0.0",
				"expect-type": "^1.3.0",
				"magic-string": "^0.30.21",
				"obug": "^2.1.1",
				"pathe": "^2.0.3",
				"picomatch": "^4.0.3",
				"std-env": "^4.0.0-rc.1",
				"tinybench": "^2.9.0",
				"tinyexec": "^1.0.2",
				"tinyglobby": "^0.2.15",
				"tinyrainbow": "^3.1.0",
				"vite": "^6.0.0 || ^7.0.0 || ^8.0.0",
				"why-is-node-running": "^2.3.0"
			},
			"bin": {
				"vitest": "vitest.mjs"
			},
			"engines": {
				"node": "^20.0.0 || ^22.0.0 || >=24.0.0"
			},
			"funding": {
				"url": "https://opencollective.com/vitest"
			},
			"peerDependencies": {
				"@edge-runtime/vm": "*",
				"@opentelemetry/api": "^1.9.0",
				"@types/node": "^20.0.0 || ^22.0.0 || >=24.0.0",
				"@vitest/browser-playwright": "4.1.2",
				"@vitest/browser-preview": "4.1.2",
				"@vitest/browser-webdriverio": "4.1.2",
				"@vitest/ui": "4.1.2",
				"happy-dom": "*",
				"jsdom": "*",
				"vite": "^6.0.0 || ^7.0.0 || ^8.0.0"
			},
			"peerDependenciesMeta": {
				"@edge-runtime/vm": {
					"optional": true
				},
				"@opentelemetry/api": {
					"optional": true
				},
				"@types/node": {
					"optional": true
				},
				"@vitest/browser-playwright": {
					"optional": true
				},
				"@vitest/browser-preview": {
					"optional": true
				},
				"@vitest/browser-webdriverio": {
					"optional": true
				},
				"@vitest/ui": {
					"optional": true
				},
				"happy-dom": {
					"optional": true
				},
				"jsdom": {
					"optional": true
				},
				"vite": {
					"optional": false
				}
			}
		},
		"node_modules/w3c-xmlserializer": {
			"version": "5.0.0",
			"resolved": "https://registry.npmjs.org/w3c-xmlserializer/-/w3c-xmlserializer-5.0.0.tgz",
			"integrity": "sha512-o8qghlI8NZHU1lLPrpi2+Uq7abh4GGPpYANlalzWxyWteJOCsr/P+oPBA49TOLu5FTZO4d3F9MnWJfiMo4BkmA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"xml-name-validator": "^5.0.0"
			},
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/watchpack": {
			"version": "2.5.1",
			"resolved": "https://registry.npmjs.org/watchpack/-/watchpack-2.5.1.tgz",
			"integrity": "sha512-Zn5uXdcFNIA1+1Ei5McRd+iRzfhENPCe7LeABkJtNulSxjma+l7ltNx55BWZkRlwRnpOgHqxnjyaDgJnNXnqzg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"glob-to-regexp": "^0.4.1",
				"graceful-fs": "^4.1.2"
			},
			"engines": {
				"node": ">=10.13.0"
			}
		},
		"node_modules/wbuf": {
			"version": "1.7.3",
			"resolved": "https://registry.npmjs.org/wbuf/-/wbuf-1.7.3.tgz",
			"integrity": "sha512-O84QOnr0icsbFGLS0O3bI5FswxzRr8/gHwWkDlQFskhSPryQXvrTMxjxGP4+iWYoauLoBvfDpkrOauZ+0iZpDA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"minimalistic-assert": "^1.0.0"
			}
		},
		"node_modules/wcwidth": {
			"version": "1.0.1",
			"resolved": "https://registry.npmjs.org/wcwidth/-/wcwidth-1.0.1.tgz",
			"integrity": "sha512-XHPEwS0q6TaxcvG85+8EYkbiCux2XtWG2mkc47Ng2A77BQu9+DqIOJldST4HgPkuea7dvKSj5VgX3P1d4rW8Tg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"defaults": "^1.0.3"
			}
		},
		"node_modules/weak-lru-cache": {
			"version": "1.2.2",
			"resolved": "https://registry.npmjs.org/weak-lru-cache/-/weak-lru-cache-1.2.2.tgz",
			"integrity": "sha512-DEAoo25RfSYMuTGc9vPJzZcZullwIqRDSI9LOy+fkCJPi6hykCnfKaXTuPBDuXAUcqHXyOgFtHNp/kB2FjYHbw==",
			"dev": true,
			"license": "MIT",
			"optional": true
		},
		"node_modules/webidl-conversions": {
			"version": "8.0.1",
			"resolved": "https://registry.npmjs.org/webidl-conversions/-/webidl-conversions-8.0.1.tgz",
			"integrity": "sha512-BMhLD/Sw+GbJC21C/UgyaZX41nPt8bUTg+jWyDeg7e7YN4xOM05YPSIXceACnXVtqyEw/LMClUQMtMZ+PGGpqQ==",
			"dev": true,
			"license": "BSD-2-Clause",
			"engines": {
				"node": ">=20"
			}
		},
		"node_modules/webpack": {
			"version": "5.106.2",
			"resolved": "https://registry.npmjs.org/webpack/-/webpack-5.106.2.tgz",
			"integrity": "sha512-wGN3qcrBQIFmQ/c0AiOAQBvrZ5lmY8vbbMv4Mxfgzqd/B6+9pXtLo73WuS1dSGXM5QYY3hZnIbvx+K1xxe6FyA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@types/eslint-scope": "^3.7.7",
				"@types/estree": "^1.0.8",
				"@types/json-schema": "^7.0.15",
				"@webassemblyjs/ast": "^1.14.1",
				"@webassemblyjs/wasm-edit": "^1.14.1",
				"@webassemblyjs/wasm-parser": "^1.14.1",
				"acorn": "^8.16.0",
				"acorn-import-phases": "^1.0.3",
				"browserslist": "^4.28.1",
				"chrome-trace-event": "^1.0.2",
				"enhanced-resolve": "^5.20.0",
				"es-module-lexer": "^2.0.0",
				"eslint-scope": "5.1.1",
				"events": "^3.2.0",
				"glob-to-regexp": "^0.4.1",
				"graceful-fs": "^4.2.11",
				"loader-runner": "^4.3.1",
				"mime-db": "^1.54.0",
				"neo-async": "^2.6.2",
				"schema-utils": "^4.3.3",
				"tapable": "^2.3.0",
				"terser-webpack-plugin": "^5.3.17",
				"watchpack": "^2.5.1",
				"webpack-sources": "^3.3.4"
			},
			"bin": {
				"webpack": "bin/webpack.js"
			},
			"engines": {
				"node": ">=10.13.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/webpack"
			},
			"peerDependenciesMeta": {
				"webpack-cli": {
					"optional": true
				}
			}
		},
		"node_modules/webpack-dev-middleware": {
			"version": "7.4.5",
			"resolved": "https://registry.npmjs.org/webpack-dev-middleware/-/webpack-dev-middleware-7.4.5.tgz",
			"integrity": "sha512-uxQ6YqGdE4hgDKNf7hUiPXOdtkXvBJXrfEGYSx7P7LC8hnUYGK70X6xQXUvXeNyBDDcsiQXpG2m3G9vxowaEuA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"colorette": "^2.0.10",
				"memfs": "^4.43.1",
				"mime-types": "^3.0.1",
				"on-finished": "^2.4.1",
				"range-parser": "^1.2.1",
				"schema-utils": "^4.0.0"
			},
			"engines": {
				"node": ">= 18.12.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/webpack"
			},
			"peerDependencies": {
				"webpack": "^5.0.0"
			},
			"peerDependenciesMeta": {
				"webpack": {
					"optional": true
				}
			}
		},
		"node_modules/webpack-dev-middleware/node_modules/memfs": {
			"version": "4.57.2",
			"resolved": "https://registry.npmjs.org/memfs/-/memfs-4.57.2.tgz",
			"integrity": "sha512-2nWzSsJzrukurSDna4Z0WywuScK4Id3tSKejgu74u8KCdW4uNrseKRSIDg75C6Yw5ZRqBe0F0EtMNlTbUq8bAQ==",
			"dev": true,
			"license": "Apache-2.0",
			"dependencies": {
				"@jsonjoy.com/fs-core": "4.57.2",
				"@jsonjoy.com/fs-fsa": "4.57.2",
				"@jsonjoy.com/fs-node": "4.57.2",
				"@jsonjoy.com/fs-node-builtins": "4.57.2",
				"@jsonjoy.com/fs-node-to-fsa": "4.57.2",
				"@jsonjoy.com/fs-node-utils": "4.57.2",
				"@jsonjoy.com/fs-print": "4.57.2",
				"@jsonjoy.com/fs-snapshot": "4.57.2",
				"@jsonjoy.com/json-pack": "^1.11.0",
				"@jsonjoy.com/util": "^1.9.0",
				"glob-to-regex.js": "^1.0.1",
				"thingies": "^2.5.0",
				"tree-dump": "^1.0.3",
				"tslib": "^2.0.0"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/streamich"
			},
			"peerDependencies": {
				"tslib": "2"
			}
		},
		"node_modules/webpack-dev-server": {
			"version": "5.2.3",
			"resolved": "https://registry.npmjs.org/webpack-dev-server/-/webpack-dev-server-5.2.3.tgz",
			"integrity": "sha512-9Gyu2F7+bg4Vv+pjbovuYDhHX+mqdqITykfzdM9UyKqKHlsE5aAjRhR+oOEfXW5vBeu8tarzlJFIZva4ZjAdrQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@types/bonjour": "^3.5.13",
				"@types/connect-history-api-fallback": "^1.5.4",
				"@types/express": "^4.17.25",
				"@types/express-serve-static-core": "^4.17.21",
				"@types/serve-index": "^1.9.4",
				"@types/serve-static": "^1.15.5",
				"@types/sockjs": "^0.3.36",
				"@types/ws": "^8.5.10",
				"ansi-html-community": "^0.0.8",
				"bonjour-service": "^1.2.1",
				"chokidar": "^3.6.0",
				"colorette": "^2.0.10",
				"compression": "^1.8.1",
				"connect-history-api-fallback": "^2.0.0",
				"express": "^4.22.1",
				"graceful-fs": "^4.2.6",
				"http-proxy-middleware": "^2.0.9",
				"ipaddr.js": "^2.1.0",
				"launch-editor": "^2.6.1",
				"open": "^10.0.3",
				"p-retry": "^6.2.0",
				"schema-utils": "^4.2.0",
				"selfsigned": "^5.5.0",
				"serve-index": "^1.9.1",
				"sockjs": "^0.3.24",
				"spdy": "^4.0.2",
				"webpack-dev-middleware": "^7.4.2",
				"ws": "^8.18.0"
			},
			"bin": {
				"webpack-dev-server": "bin/webpack-dev-server.js"
			},
			"engines": {
				"node": ">= 18.12.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/webpack"
			},
			"peerDependencies": {
				"webpack": "^5.0.0"
			},
			"peerDependenciesMeta": {
				"webpack": {
					"optional": true
				},
				"webpack-cli": {
					"optional": true
				}
			}
		},
		"node_modules/webpack-dev-server/node_modules/accepts": {
			"version": "1.3.8",
			"resolved": "https://registry.npmjs.org/accepts/-/accepts-1.3.8.tgz",
			"integrity": "sha512-PYAthTa2m2VKxuvSD3DPC/Gy+U+sOA1LAuT8mkmRuvw+NACSaeXEQ+NHcVF7rONl6qcaxV3Uuemwawk+7+SJLw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"mime-types": "~2.1.34",
				"negotiator": "0.6.3"
			},
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/webpack-dev-server/node_modules/body-parser": {
			"version": "1.20.4",
			"resolved": "https://registry.npmjs.org/body-parser/-/body-parser-1.20.4.tgz",
			"integrity": "sha512-ZTgYYLMOXY9qKU/57FAo8F+HA2dGX7bqGc71txDRC1rS4frdFI5R7NhluHxH6M0YItAP0sHB4uqAOcYKxO6uGA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"bytes": "~3.1.2",
				"content-type": "~1.0.5",
				"debug": "2.6.9",
				"depd": "2.0.0",
				"destroy": "~1.2.0",
				"http-errors": "~2.0.1",
				"iconv-lite": "~0.4.24",
				"on-finished": "~2.4.1",
				"qs": "~6.14.0",
				"raw-body": "~2.5.3",
				"type-is": "~1.6.18",
				"unpipe": "~1.0.0"
			},
			"engines": {
				"node": ">= 0.8",
				"npm": "1.2.8000 || >= 1.4.16"
			}
		},
		"node_modules/webpack-dev-server/node_modules/chokidar": {
			"version": "3.6.0",
			"resolved": "https://registry.npmjs.org/chokidar/-/chokidar-3.6.0.tgz",
			"integrity": "sha512-7VT13fmjotKpGipCW9JEQAusEPE+Ei8nl6/g4FBAmIm0GOOLMua9NDDo/DWp0ZAxCr3cPq5ZpBqmPAQgDda2Pw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"anymatch": "~3.1.2",
				"braces": "~3.0.2",
				"glob-parent": "~5.1.2",
				"is-binary-path": "~2.1.0",
				"is-glob": "~4.0.1",
				"normalize-path": "~3.0.0",
				"readdirp": "~3.6.0"
			},
			"engines": {
				"node": ">= 8.10.0"
			},
			"funding": {
				"url": "https://paulmillr.com/funding/"
			},
			"optionalDependencies": {
				"fsevents": "~2.3.2"
			}
		},
		"node_modules/webpack-dev-server/node_modules/content-disposition": {
			"version": "0.5.4",
			"resolved": "https://registry.npmjs.org/content-disposition/-/content-disposition-0.5.4.tgz",
			"integrity": "sha512-FveZTNuGw04cxlAiWbzi6zTAL/lhehaWbTtgluJh4/E95DqMwTmha3KZN1aAWA8cFIhHzMZUvLevkw5Rqk+tSQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"safe-buffer": "5.2.1"
			},
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/webpack-dev-server/node_modules/cookie-signature": {
			"version": "1.0.7",
			"resolved": "https://registry.npmjs.org/cookie-signature/-/cookie-signature-1.0.7.tgz",
			"integrity": "sha512-NXdYc3dLr47pBkpUCHtKSwIOQXLVn8dZEuywboCOJY/osA0wFSLlSawr3KN8qXJEyX66FcONTH8EIlVuK0yyFA==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/webpack-dev-server/node_modules/debug": {
			"version": "2.6.9",
			"resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
			"integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ms": "2.0.0"
			}
		},
		"node_modules/webpack-dev-server/node_modules/debug/node_modules/ms": {
			"version": "2.0.0",
			"resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
			"integrity": "sha512-Tpp60P6IUJDTuOq/5Z8cdskzJujfwqfOTkrwIwj7IRISpnkJnT6SyJ4PCPnGMoFjC9ddhal5KVIYtAt97ix05A==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/webpack-dev-server/node_modules/define-lazy-prop": {
			"version": "3.0.0",
			"resolved": "https://registry.npmjs.org/define-lazy-prop/-/define-lazy-prop-3.0.0.tgz",
			"integrity": "sha512-N+MeXYoqr3pOgn8xfyRPREN7gHakLYjhsHhWGT3fWAiL4IkAt0iDw14QiiEm2bE30c5XX5q0FtAA3CK5f9/BUg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=12"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/webpack-dev-server/node_modules/express": {
			"version": "4.22.1",
			"resolved": "https://registry.npmjs.org/express/-/express-4.22.1.tgz",
			"integrity": "sha512-F2X8g9P1X7uCPZMA3MVf9wcTqlyNp7IhH5qPCI0izhaOIYXaW9L535tGA3qmjRzpH+bZczqq7hVKxTR4NWnu+g==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"accepts": "~1.3.8",
				"array-flatten": "1.1.1",
				"body-parser": "~1.20.3",
				"content-disposition": "~0.5.4",
				"content-type": "~1.0.4",
				"cookie": "~0.7.1",
				"cookie-signature": "~1.0.6",
				"debug": "2.6.9",
				"depd": "2.0.0",
				"encodeurl": "~2.0.0",
				"escape-html": "~1.0.3",
				"etag": "~1.8.1",
				"finalhandler": "~1.3.1",
				"fresh": "~0.5.2",
				"http-errors": "~2.0.0",
				"merge-descriptors": "1.0.3",
				"methods": "~1.1.2",
				"on-finished": "~2.4.1",
				"parseurl": "~1.3.3",
				"path-to-regexp": "~0.1.12",
				"proxy-addr": "~2.0.7",
				"qs": "~6.14.0",
				"range-parser": "~1.2.1",
				"safe-buffer": "5.2.1",
				"send": "~0.19.0",
				"serve-static": "~1.16.2",
				"setprototypeof": "1.2.0",
				"statuses": "~2.0.1",
				"type-is": "~1.6.18",
				"utils-merge": "1.0.1",
				"vary": "~1.1.2"
			},
			"engines": {
				"node": ">= 0.10.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/express"
			}
		},
		"node_modules/webpack-dev-server/node_modules/finalhandler": {
			"version": "1.3.2",
			"resolved": "https://registry.npmjs.org/finalhandler/-/finalhandler-1.3.2.tgz",
			"integrity": "sha512-aA4RyPcd3badbdABGDuTXCMTtOneUCAYH/gxoYRTZlIJdF0YPWuGqiAsIrhNnnqdXGswYk6dGujem4w80UJFhg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"debug": "2.6.9",
				"encodeurl": "~2.0.0",
				"escape-html": "~1.0.3",
				"on-finished": "~2.4.1",
				"parseurl": "~1.3.3",
				"statuses": "~2.0.2",
				"unpipe": "~1.0.0"
			},
			"engines": {
				"node": ">= 0.8"
			}
		},
		"node_modules/webpack-dev-server/node_modules/fresh": {
			"version": "0.5.2",
			"resolved": "https://registry.npmjs.org/fresh/-/fresh-0.5.2.tgz",
			"integrity": "sha512-zJ2mQYM18rEFOudeV4GShTGIQ7RbzA7ozbU9I/XBpm7kqgMywgmylMwXHxZJmkVoYkna9d2pVXVXPdYTP9ej8Q==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/webpack-dev-server/node_modules/glob-parent": {
			"version": "5.1.2",
			"resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
			"integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"is-glob": "^4.0.1"
			},
			"engines": {
				"node": ">= 6"
			}
		},
		"node_modules/webpack-dev-server/node_modules/http-proxy-middleware": {
			"version": "2.0.9",
			"resolved": "https://registry.npmjs.org/http-proxy-middleware/-/http-proxy-middleware-2.0.9.tgz",
			"integrity": "sha512-c1IyJYLYppU574+YI7R4QyX2ystMtVXZwIdzazUIPIJsHuWNd+mho2j+bKoHftndicGj9yh+xjd+l0yj7VeT1Q==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@types/http-proxy": "^1.17.8",
				"http-proxy": "^1.18.1",
				"is-glob": "^4.0.1",
				"is-plain-obj": "^3.0.0",
				"micromatch": "^4.0.2"
			},
			"engines": {
				"node": ">=12.0.0"
			},
			"peerDependencies": {
				"@types/express": "^4.17.13"
			},
			"peerDependenciesMeta": {
				"@types/express": {
					"optional": true
				}
			}
		},
		"node_modules/webpack-dev-server/node_modules/iconv-lite": {
			"version": "0.4.24",
			"resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.4.24.tgz",
			"integrity": "sha512-v3MXnZAcvnywkTUEZomIActle7RXXeedOR31wwl7VlyoXO4Qi9arvSenNQWne1TcRwhCL1HwLI21bEqdpj8/rA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"safer-buffer": ">= 2.1.2 < 3"
			},
			"engines": {
				"node": ">=0.10.0"
			}
		},
		"node_modules/webpack-dev-server/node_modules/ipaddr.js": {
			"version": "2.3.0",
			"resolved": "https://registry.npmjs.org/ipaddr.js/-/ipaddr.js-2.3.0.tgz",
			"integrity": "sha512-Zv/pA+ciVFbCSBBjGfaKUya/CcGmUHzTydLMaTwrUUEM2DIEO3iZvueGxmacvmN50fGpGVKeTXpb2LcYQxeVdg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 10"
			}
		},
		"node_modules/webpack-dev-server/node_modules/media-typer": {
			"version": "0.3.0",
			"resolved": "https://registry.npmjs.org/media-typer/-/media-typer-0.3.0.tgz",
			"integrity": "sha512-dq+qelQ9akHpcOl/gUVRTxVIOkAJ1wR3QAvb4RsVjS8oVoFjDGTc679wJYmUmknUF5HwMLOgb5O+a3KxfWapPQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/webpack-dev-server/node_modules/merge-descriptors": {
			"version": "1.0.3",
			"resolved": "https://registry.npmjs.org/merge-descriptors/-/merge-descriptors-1.0.3.tgz",
			"integrity": "sha512-gaNvAS7TZ897/rVaZ0nMtAyxNyi/pdbjbAwUpFQpN70GqnVfOiXpeUUMKRBmzXaSQ8DdTX4/0ms62r2K+hE6mQ==",
			"dev": true,
			"license": "MIT",
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/webpack-dev-server/node_modules/mime-db": {
			"version": "1.52.0",
			"resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.52.0.tgz",
			"integrity": "sha512-sPU4uV7dYlvtWJxwwxHD0PuihVNiE7TyAbQ5SWxDCB9mUYvOgroQOwYQQOKPJ8CIbE+1ETVlOoK1UC2nU3gYvg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/webpack-dev-server/node_modules/mime-types": {
			"version": "2.1.35",
			"resolved": "https://registry.npmjs.org/mime-types/-/mime-types-2.1.35.tgz",
			"integrity": "sha512-ZDY+bPm5zTTF+YpCrAU9nK0UgICYPT0QtT1NZWFv4s++TNkcgVaT0g6+4R2uI4MjQjzysHB1zxuWL50hzaeXiw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"mime-db": "1.52.0"
			},
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/webpack-dev-server/node_modules/negotiator": {
			"version": "0.6.3",
			"resolved": "https://registry.npmjs.org/negotiator/-/negotiator-0.6.3.tgz",
			"integrity": "sha512-+EUsqGPLsM+j/zdChZjsnX51g4XrHFOIXwfnCVPGlQk/k5giakcKsuxCObBRu6DSm9opw/O6slWbJdghQM4bBg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/webpack-dev-server/node_modules/open": {
			"version": "10.2.0",
			"resolved": "https://registry.npmjs.org/open/-/open-10.2.0.tgz",
			"integrity": "sha512-YgBpdJHPyQ2UE5x+hlSXcnejzAvD0b22U2OuAP+8OnlJT+PjWPxtgmGqKKc+RgTM63U9gN0YzrYc71R2WT/hTA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"default-browser": "^5.2.1",
				"define-lazy-prop": "^3.0.0",
				"is-inside-container": "^1.0.0",
				"wsl-utils": "^0.1.0"
			},
			"engines": {
				"node": ">=18"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/webpack-dev-server/node_modules/path-to-regexp": {
			"version": "0.1.13",
			"resolved": "https://registry.npmjs.org/path-to-regexp/-/path-to-regexp-0.1.13.tgz",
			"integrity": "sha512-A/AGNMFN3c8bOlvV9RreMdrv7jsmF9XIfDeCd87+I8RNg6s78BhJxMu69NEMHBSJFxKidViTEdruRwEk/WIKqA==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/webpack-dev-server/node_modules/picomatch": {
			"version": "2.3.2",
			"resolved": "https://registry.npmjs.org/picomatch/-/picomatch-2.3.2.tgz",
			"integrity": "sha512-V7+vQEJ06Z+c5tSye8S+nHUfI51xoXIXjHQ99cQtKUkQqqO1kO/KCJUfZXuB47h/YBlDhah2H3hdUGXn8ie0oA==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=8.6"
			},
			"funding": {
				"url": "https://github.com/sponsors/jonschlinkert"
			}
		},
		"node_modules/webpack-dev-server/node_modules/qs": {
			"version": "6.14.2",
			"resolved": "https://registry.npmjs.org/qs/-/qs-6.14.2.tgz",
			"integrity": "sha512-V/yCWTTF7VJ9hIh18Ugr2zhJMP01MY7c5kh4J870L7imm6/DIzBsNLTXzMwUA3yZ5b/KBqLx8Kp3uRvd7xSe3Q==",
			"dev": true,
			"license": "BSD-3-Clause",
			"dependencies": {
				"side-channel": "^1.1.0"
			},
			"engines": {
				"node": ">=0.6"
			},
			"funding": {
				"url": "https://github.com/sponsors/ljharb"
			}
		},
		"node_modules/webpack-dev-server/node_modules/raw-body": {
			"version": "2.5.3",
			"resolved": "https://registry.npmjs.org/raw-body/-/raw-body-2.5.3.tgz",
			"integrity": "sha512-s4VSOf6yN0rvbRZGxs8Om5CWj6seneMwK3oDb4lWDH0UPhWcxwOWw5+qk24bxq87szX1ydrwylIOp2uG1ojUpA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"bytes": "~3.1.2",
				"http-errors": "~2.0.1",
				"iconv-lite": "~0.4.24",
				"unpipe": "~1.0.0"
			},
			"engines": {
				"node": ">= 0.8"
			}
		},
		"node_modules/webpack-dev-server/node_modules/readdirp": {
			"version": "3.6.0",
			"resolved": "https://registry.npmjs.org/readdirp/-/readdirp-3.6.0.tgz",
			"integrity": "sha512-hOS089on8RduqdbhvQ5Z37A0ESjsqz6qnRcffsMU3495FuTdqSm+7bhJ29JvIOsBDEEnan5DPu9t3To9VRlMzA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"picomatch": "^2.2.1"
			},
			"engines": {
				"node": ">=8.10.0"
			}
		},
		"node_modules/webpack-dev-server/node_modules/selfsigned": {
			"version": "5.5.0",
			"resolved": "https://registry.npmjs.org/selfsigned/-/selfsigned-5.5.0.tgz",
			"integrity": "sha512-ftnu3TW4+3eBfLRFnDEkzGxSF/10BJBkaLJuBHZX0kiPS7bRdlpZGu6YGt4KngMkdTwJE6MbjavFpqHvqVt+Ew==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@peculiar/x509": "^1.14.2",
				"pkijs": "^3.3.3"
			},
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/webpack-dev-server/node_modules/send": {
			"version": "0.19.2",
			"resolved": "https://registry.npmjs.org/send/-/send-0.19.2.tgz",
			"integrity": "sha512-VMbMxbDeehAxpOtWJXlcUS5E8iXh6QmN+BkRX1GARS3wRaXEEgzCcB10gTQazO42tpNIya8xIyNx8fll1OFPrg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"debug": "2.6.9",
				"depd": "2.0.0",
				"destroy": "1.2.0",
				"encodeurl": "~2.0.0",
				"escape-html": "~1.0.3",
				"etag": "~1.8.1",
				"fresh": "~0.5.2",
				"http-errors": "~2.0.1",
				"mime": "1.6.0",
				"ms": "2.1.3",
				"on-finished": "~2.4.1",
				"range-parser": "~1.2.1",
				"statuses": "~2.0.2"
			},
			"engines": {
				"node": ">= 0.8.0"
			}
		},
		"node_modules/webpack-dev-server/node_modules/serve-static": {
			"version": "1.16.3",
			"resolved": "https://registry.npmjs.org/serve-static/-/serve-static-1.16.3.tgz",
			"integrity": "sha512-x0RTqQel6g5SY7Lg6ZreMmsOzncHFU7nhnRWkKgWuMTu5NN0DR5oruckMqRvacAN9d5w6ARnRBXl9xhDCgfMeA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"encodeurl": "~2.0.0",
				"escape-html": "~1.0.3",
				"parseurl": "~1.3.3",
				"send": "~0.19.1"
			},
			"engines": {
				"node": ">= 0.8.0"
			}
		},
		"node_modules/webpack-dev-server/node_modules/type-is": {
			"version": "1.6.18",
			"resolved": "https://registry.npmjs.org/type-is/-/type-is-1.6.18.tgz",
			"integrity": "sha512-TkRKr9sUTxEH8MdfuCSP7VizJyzRNMjj2J2do2Jr3Kym598JVdEksuzPQCnlFPW4ky9Q+iA+ma9BGm06XQBy8g==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"media-typer": "0.3.0",
				"mime-types": "~2.1.24"
			},
			"engines": {
				"node": ">= 0.6"
			}
		},
		"node_modules/webpack-merge": {
			"version": "5.10.0",
			"resolved": "https://registry.npmjs.org/webpack-merge/-/webpack-merge-5.10.0.tgz",
			"integrity": "sha512-+4zXKdx7UnO+1jaN4l2lHVD+mFvnlZQP/6ljaJVb4SZiwIKeUnrT5l0gkT8z+n4hKpC+jpOv6O9R+gLtag7pSA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"clone-deep": "^4.0.1",
				"flat": "^5.0.2",
				"wildcard": "^2.0.0"
			},
			"engines": {
				"node": ">=10.0.0"
			}
		},
		"node_modules/webpack-node-externals": {
			"version": "3.0.0",
			"resolved": "https://registry.npmjs.org/webpack-node-externals/-/webpack-node-externals-3.0.0.tgz",
			"integrity": "sha512-LnL6Z3GGDPht/AigwRh2dvL9PQPFQ8skEpVrWZXLWBYmqcaojHNN0onvHzie6rq7EWKrrBfPYqNEzTJgiwEQDQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=6"
			}
		},
		"node_modules/webpack-sources": {
			"version": "3.3.4",
			"resolved": "https://registry.npmjs.org/webpack-sources/-/webpack-sources-3.3.4.tgz",
			"integrity": "sha512-7tP1PdV4vF+lYPnkMR0jMY5/la2ub5Fc/8VQrrU+lXkiM6C4TjVfGw7iKfyhnTQOsD+6Q/iKw0eFciziRgD58Q==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=10.13.0"
			}
		},
		"node_modules/webpack-subresource-integrity": {
			"version": "5.1.0",
			"resolved": "https://registry.npmjs.org/webpack-subresource-integrity/-/webpack-subresource-integrity-5.1.0.tgz",
			"integrity": "sha512-sacXoX+xd8r4WKsy9MvH/q/vBtEHr86cpImXwyg74pFIpERKt6FmB8cXpeuh0ZLgclOlHI4Wcll7+R5L02xk9Q==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"typed-assert": "^1.0.8"
			},
			"engines": {
				"node": ">= 12"
			},
			"peerDependencies": {
				"html-webpack-plugin": ">= 5.0.0-beta.1 < 6",
				"webpack": "^5.12.0"
			},
			"peerDependenciesMeta": {
				"html-webpack-plugin": {
					"optional": true
				}
			}
		},
		"node_modules/webpack/node_modules/ajv-formats": {
			"version": "2.1.1",
			"resolved": "https://registry.npmjs.org/ajv-formats/-/ajv-formats-2.1.1.tgz",
			"integrity": "sha512-Wx0Kx52hxE7C18hkMEggYlEifqWZtYaRgouJor+WMdPnQyEK13vgEWyVNup7SoeeoLMsr4kf5h6dOW11I15MUA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ajv": "^8.0.0"
			},
			"peerDependencies": {
				"ajv": "^8.0.0"
			},
			"peerDependenciesMeta": {
				"ajv": {
					"optional": true
				}
			}
		},
		"node_modules/webpack/node_modules/eslint-scope": {
			"version": "5.1.1",
			"resolved": "https://registry.npmjs.org/eslint-scope/-/eslint-scope-5.1.1.tgz",
			"integrity": "sha512-2NxwbF/hZ0KpepYN0cNbo+FN6XoK7GaHlQhgx/hIZl6Va0bF45RQOOwhLIy8lQDbuCiadSLCBnH2CFYquit5bw==",
			"dev": true,
			"license": "BSD-2-Clause",
			"dependencies": {
				"esrecurse": "^4.3.0",
				"estraverse": "^4.1.1"
			},
			"engines": {
				"node": ">=8.0.0"
			}
		},
		"node_modules/webpack/node_modules/estraverse": {
			"version": "4.3.0",
			"resolved": "https://registry.npmjs.org/estraverse/-/estraverse-4.3.0.tgz",
			"integrity": "sha512-39nnKffWz8xN1BU/2c79n9nB9HDzo0niYUqx6xyqUnyoAnQyyWpOTdZEeiCch8BBu515t4wp9ZmgVfVhn9EBpw==",
			"dev": true,
			"license": "BSD-2-Clause",
			"engines": {
				"node": ">=4.0"
			}
		},
		"node_modules/webpack/node_modules/schema-utils": {
			"version": "4.3.3",
			"resolved": "https://registry.npmjs.org/schema-utils/-/schema-utils-4.3.3.tgz",
			"integrity": "sha512-eflK8wEtyOE6+hsaRVPxvUKYCpRgzLqDTb8krvAsRIwOGlHoSgYLgBXoubGgLd2fT41/OUYdb48v4k4WWHQurA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@types/json-schema": "^7.0.9",
				"ajv": "^8.9.0",
				"ajv-formats": "^2.1.1",
				"ajv-keywords": "^5.1.0"
			},
			"engines": {
				"node": ">= 10.13.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/webpack"
			}
		},
		"node_modules/websocket-driver": {
			"version": "0.7.4",
			"resolved": "https://registry.npmjs.org/websocket-driver/-/websocket-driver-0.7.4.tgz",
			"integrity": "sha512-b17KeDIQVjvb0ssuSDF2cYXSg2iztliJ4B9WdsuB6J952qCPKmnVq4DyW5motImXHDC1cBT/1UezrJVsKw5zjg==",
			"dev": true,
			"license": "Apache-2.0",
			"dependencies": {
				"http-parser-js": ">=0.5.1",
				"safe-buffer": ">=5.1.0",
				"websocket-extensions": ">=0.1.1"
			},
			"engines": {
				"node": ">=0.8.0"
			}
		},
		"node_modules/websocket-extensions": {
			"version": "0.1.4",
			"resolved": "https://registry.npmjs.org/websocket-extensions/-/websocket-extensions-0.1.4.tgz",
			"integrity": "sha512-OqedPIGOfsDlo31UNwYbCFMSaO9m9G/0faIHj5/dZFDMFqPTcx6UwqyOy3COEaEOg/9VsGIpdqn62W5KhoKSpg==",
			"dev": true,
			"license": "Apache-2.0",
			"engines": {
				"node": ">=0.8.0"
			}
		},
		"node_modules/whatwg-encoding": {
			"version": "2.0.0",
			"resolved": "https://registry.npmjs.org/whatwg-encoding/-/whatwg-encoding-2.0.0.tgz",
			"integrity": "sha512-p41ogyeMUrw3jWclHWTQg1k05DSVXPLcVxRTYsXUk+ZooOCZLcoYgPZ/HL/D/N+uQPOtcp1me1WhBEaX02mhWg==",
			"deprecated": "Use @exodus/bytes instead for a more spec-conformant and faster implementation",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"iconv-lite": "0.6.3"
			},
			"engines": {
				"node": ">=12"
			}
		},
		"node_modules/whatwg-encoding/node_modules/iconv-lite": {
			"version": "0.6.3",
			"resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.6.3.tgz",
			"integrity": "sha512-4fCk79wshMdzMp2rH06qWrJE4iolqLhCUH+OiuIgU++RB0+94NlDL81atO7GX55uUKueo0txHNtvEyI6D7WdMw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"safer-buffer": ">= 2.1.2 < 3.0.0"
			},
			"engines": {
				"node": ">=0.10.0"
			}
		},
		"node_modules/whatwg-mimetype": {
			"version": "5.0.0",
			"resolved": "https://registry.npmjs.org/whatwg-mimetype/-/whatwg-mimetype-5.0.0.tgz",
			"integrity": "sha512-sXcNcHOC51uPGF0P/D4NVtrkjSU2fNsm9iog4ZvZJsL3rjoDAzXZhkm2MWt1y+PUdggKAYVoMAIYcs78wJ51Cw==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=20"
			}
		},
		"node_modules/whatwg-url": {
			"version": "16.0.1",
			"resolved": "https://registry.npmjs.org/whatwg-url/-/whatwg-url-16.0.1.tgz",
			"integrity": "sha512-1to4zXBxmXHV3IiSSEInrreIlu02vUOvrhxJJH5vcxYTBDAx51cqZiKdyTxlecdKNSjj8EcxGBxNf6Vg+945gw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@exodus/bytes": "^1.11.0",
				"tr46": "^6.0.0",
				"webidl-conversions": "^8.0.1"
			},
			"engines": {
				"node": "^20.19.0 || ^22.12.0 || >=24.0.0"
			}
		},
		"node_modules/which": {
			"version": "2.0.2",
			"resolved": "https://registry.npmjs.org/which/-/which-2.0.2.tgz",
			"integrity": "sha512-BLI3Tl1TW3Pvl70l3yq3Y64i+awpwXqsGBYWkkqMtnbXgrMD+yj7rhW0kuEDxzJaYXGjEW5ogapKNMEKNMjibA==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"isexe": "^2.0.0"
			},
			"bin": {
				"node-which": "bin/node-which"
			},
			"engines": {
				"node": ">= 8"
			}
		},
		"node_modules/why-is-node-running": {
			"version": "2.3.0",
			"resolved": "https://registry.npmjs.org/why-is-node-running/-/why-is-node-running-2.3.0.tgz",
			"integrity": "sha512-hUrmaWBdVDcxvYqnyh09zunKzROWjbZTiNy8dBEjkS7ehEDQibXJ7XvlmtbwuTclUiIyN+CyXQD4Vmko8fNm8w==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"siginfo": "^2.0.0",
				"stackback": "0.0.2"
			},
			"bin": {
				"why-is-node-running": "cli.js"
			},
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/wildcard": {
			"version": "2.0.1",
			"resolved": "https://registry.npmjs.org/wildcard/-/wildcard-2.0.1.tgz",
			"integrity": "sha512-CC1bOL87PIWSBhDcTrdeLo6eGT7mCFtrg0uIJtqJUFyK+eJnzl8A1niH56uu7KMa5XFrtiV+AQuHO3n7DsHnLQ==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/word-wrap": {
			"version": "1.2.5",
			"resolved": "https://registry.npmjs.org/word-wrap/-/word-wrap-1.2.5.tgz",
			"integrity": "sha512-BN22B5eaMMI9UMtjrGd5g5eCYPpCPDUy0FJXbYsaT5zYxjFOckS53SQDE3pWkVoWpHXVb3BrYcEN4Twa55B5cA==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=0.10.0"
			}
		},
		"node_modules/wrap-ansi": {
			"version": "6.2.0",
			"resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-6.2.0.tgz",
			"integrity": "sha512-r6lPcBGxZXlIcymEu7InxDMhdW0KDxpLgoFLcguasxCaJ/SOIZwINatK9KY/tf+ZrlywOKU0UDj3ATXUBfxJXA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ansi-styles": "^4.0.0",
				"string-width": "^4.1.0",
				"strip-ansi": "^6.0.0"
			},
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/wrap-ansi/node_modules/ansi-regex": {
			"version": "5.0.1",
			"resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
			"integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/wrap-ansi/node_modules/ansi-styles": {
			"version": "4.3.0",
			"resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz",
			"integrity": "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"color-convert": "^2.0.1"
			},
			"engines": {
				"node": ">=8"
			},
			"funding": {
				"url": "https://github.com/chalk/ansi-styles?sponsor=1"
			}
		},
		"node_modules/wrap-ansi/node_modules/emoji-regex": {
			"version": "8.0.0",
			"resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
			"integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/wrap-ansi/node_modules/is-fullwidth-code-point": {
			"version": "3.0.0",
			"resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-3.0.0.tgz",
			"integrity": "sha512-zymm5+u+sCsSWyD9qNaejV3DFvhCKclKdizYaJUuHA83RLjb7nSuGnddCHGv0hk+KY7BMAlsWeK4Ueg6EV6XQg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/wrap-ansi/node_modules/string-width": {
			"version": "4.2.3",
			"resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
			"integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"emoji-regex": "^8.0.0",
				"is-fullwidth-code-point": "^3.0.0",
				"strip-ansi": "^6.0.1"
			},
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/wrap-ansi/node_modules/strip-ansi": {
			"version": "6.0.1",
			"resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
			"integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ansi-regex": "^5.0.1"
			},
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/wrappy": {
			"version": "1.0.2",
			"resolved": "https://registry.npmjs.org/wrappy/-/wrappy-1.0.2.tgz",
			"integrity": "sha512-l4Sp/DRseor9wL6EvV2+TuQn63dMkPjZ/sp9XkghTEbV9KlPS1xUsZ3u7/IQO4wxtcFB4bgpQPRcR3QCvezPcQ==",
			"dev": true,
			"license": "ISC"
		},
		"node_modules/ws": {
			"version": "8.18.0",
			"resolved": "https://registry.npmjs.org/ws/-/ws-8.18.0.tgz",
			"integrity": "sha512-8VbfWfHLbbwu3+N6OKsOMpBdT4kXPDDB9cJk2bJ6mh9ucxdlnNvH1e+roYkKmN9Nxw2yjz7VzeO9oOz2zJ04Pw==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=10.0.0"
			},
			"peerDependencies": {
				"bufferutil": "^4.0.1",
				"utf-8-validate": ">=5.0.2"
			},
			"peerDependenciesMeta": {
				"bufferutil": {
					"optional": true
				},
				"utf-8-validate": {
					"optional": true
				}
			}
		},
		"node_modules/wsl-utils": {
			"version": "0.1.0",
			"resolved": "https://registry.npmjs.org/wsl-utils/-/wsl-utils-0.1.0.tgz",
			"integrity": "sha512-h3Fbisa2nKGPxCpm89Hk33lBLsnaGBvctQopaBSOW/uIs6FTe1ATyAnKFJrzVs9vpGdsTe73WF3V4lIsk4Gacw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"is-wsl": "^3.1.0"
			},
			"engines": {
				"node": ">=18"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/wsl-utils/node_modules/is-wsl": {
			"version": "3.1.1",
			"resolved": "https://registry.npmjs.org/is-wsl/-/is-wsl-3.1.1.tgz",
			"integrity": "sha512-e6rvdUCiQCAuumZslxRJWR/Doq4VpPR82kqclvcS0efgt430SlGIk05vdCN58+VrzgtIcfNODjozVielycD4Sw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"is-inside-container": "^1.0.0"
			},
			"engines": {
				"node": ">=16"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/xml-name-validator": {
			"version": "5.0.0",
			"resolved": "https://registry.npmjs.org/xml-name-validator/-/xml-name-validator-5.0.0.tgz",
			"integrity": "sha512-EvGK8EJ3DhaHfbRlETOWAS5pO9MZITeauHKJyb8wyajUfQUenkIg2MvLDTZ4T/TgIcm3HU0TFBgWWboAZ30UHg==",
			"dev": true,
			"license": "Apache-2.0",
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/xmlchars": {
			"version": "2.2.0",
			"resolved": "https://registry.npmjs.org/xmlchars/-/xmlchars-2.2.0.tgz",
			"integrity": "sha512-JZnDKK8B0RCDw84FNdDAIpZK+JuJw+s7Lz8nksI7SIuU3UXJJslUthsi+uWBUYOwPFwW7W7PRLRfUKpxjtjFCw==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/y18n": {
			"version": "5.0.8",
			"resolved": "https://registry.npmjs.org/y18n/-/y18n-5.0.8.tgz",
			"integrity": "sha512-0pfFzegeDWJHJIAmTLRP2DwHjdF5s7jo9tuztdQxAhINCdvS+3nGINqPd00AphqJR/0LhANUS6/+7SCb98YOfA==",
			"dev": true,
			"license": "ISC",
			"engines": {
				"node": ">=10"
			}
		},
		"node_modules/yallist": {
			"version": "3.1.1",
			"resolved": "https://registry.npmjs.org/yallist/-/yallist-3.1.1.tgz",
			"integrity": "sha512-a4UGQaWPH59mOXUYnAG2ewncQS4i4F43Tv3JoAM+s2VDAmS9NsK8GpDMLrCHPksFT7h3K6TOoUNn2pb7RoXx4g==",
			"dev": true,
			"license": "ISC"
		},
		"node_modules/yaml": {
			"version": "2.8.3",
			"resolved": "https://registry.npmjs.org/yaml/-/yaml-2.8.3.tgz",
			"integrity": "sha512-AvbaCLOO2Otw/lW5bmh9d/WEdcDFdQp2Z2ZUH3pX9U2ihyUY0nvLv7J6TrWowklRGPYbB/IuIMfYgxaCPg5Bpg==",
			"dev": true,
			"license": "ISC",
			"bin": {
				"yaml": "bin.mjs"
			},
			"engines": {
				"node": ">= 14.6"
			},
			"funding": {
				"url": "https://github.com/sponsors/eemeli"
			}
		},
		"node_modules/yargs": {
			"version": "18.0.0",
			"resolved": "https://registry.npmjs.org/yargs/-/yargs-18.0.0.tgz",
			"integrity": "sha512-4UEqdc2RYGHZc7Doyqkrqiln3p9X2DZVxaGbwhn2pi7MrRagKaOcIKe8L3OxYcbhXLgLFUS3zAYuQjKBQgmuNg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"cliui": "^9.0.1",
				"escalade": "^3.1.1",
				"get-caller-file": "^2.0.5",
				"string-width": "^7.2.0",
				"y18n": "^5.0.5",
				"yargs-parser": "^22.0.0"
			},
			"engines": {
				"node": "^20.19.0 || ^22.12.0 || >=23"
			}
		},
		"node_modules/yargs-parser": {
			"version": "22.0.0",
			"resolved": "https://registry.npmjs.org/yargs-parser/-/yargs-parser-22.0.0.tgz",
			"integrity": "sha512-rwu/ClNdSMpkSrUb+d6BRsSkLUq1fmfsY6TOpYzTwvwkg1/NRG85KBy3kq++A8LKQwX6lsu+aWad+2khvuXrqw==",
			"dev": true,
			"license": "ISC",
			"engines": {
				"node": "^20.19.0 || ^22.12.0 || >=23"
			}
		},
		"node_modules/yargs/node_modules/string-width": {
			"version": "7.2.0",
			"resolved": "https://registry.npmjs.org/string-width/-/string-width-7.2.0.tgz",
			"integrity": "sha512-tsaTIkKW9b4N+AEj+SVA+WhJzV7/zMhcSu78mLKWSk7cXMOSHsBKFWUs0fWwq8QyK3MgJBQRX6Gbi4kYbdvGkQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"emoji-regex": "^10.3.0",
				"get-east-asian-width": "^1.0.0",
				"strip-ansi": "^7.1.0"
			},
			"engines": {
				"node": ">=18"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/yocto-queue": {
			"version": "0.1.0",
			"resolved": "https://registry.npmjs.org/yocto-queue/-/yocto-queue-0.1.0.tgz",
			"integrity": "sha512-rVksvsnNCdJ/ohGc6xgPwyN8eheCxsiLM8mxuE/t/mOVqJewPuO1miLpTHQiRgTKCLexL4MeAFVagts7HmNZ2Q==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=10"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/yoctocolors": {
			"version": "2.1.2",
			"resolved": "https://registry.npmjs.org/yoctocolors/-/yoctocolors-2.1.2.tgz",
			"integrity": "sha512-CzhO+pFNo8ajLM2d2IW/R93ipy99LWjtwblvC1RsoSUMZgyLbYFr221TnSNT7GjGdYui6P459mw9JH/g/zW2ug==",
			"license": "MIT",
			"engines": {
				"node": ">=18"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/yoctocolors-cjs": {
			"version": "2.1.3",
			"resolved": "https://registry.npmjs.org/yoctocolors-cjs/-/yoctocolors-cjs-2.1.3.tgz",
			"integrity": "sha512-U/PBtDf35ff0D8X8D0jfdzHYEPFxAI7jJlxZXwCSez5M3190m+QobIfh+sWDWSHMCWWJN2AWamkegn6vr6YBTw==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=18"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/zod": {
			"version": "4.3.6",
			"resolved": "https://registry.npmjs.org/zod/-/zod-4.3.6.tgz",
			"integrity": "sha512-rftlrkhHZOcjDwkGlnUtZZkvaPHCsDATp4pGpuOOMDaTdDDXF91wuVDJoWoPsKX/3YPQ5fHuF3STjcYyKr+Qhg==",
			"dev": true,
			"license": "MIT",
			"funding": {
				"url": "https://github.com/sponsors/colinhacks"
			}
		},
		"node_modules/zod-to-json-schema": {
			"version": "3.25.2",
			"resolved": "https://registry.npmjs.org/zod-to-json-schema/-/zod-to-json-schema-3.25.2.tgz",
			"integrity": "sha512-O/PgfnpT1xKSDeQYSCfRI5Gy3hPf91mKVDuYLUHZJMiDFptvP41MSnWofm8dnCm0256ZNfZIM7DSzuSMAFnjHA==",
			"dev": true,
			"license": "ISC",
			"peerDependencies": {
				"zod": "^3.25.28 || ^4"
			}
		}
	}
}
``

---

## mechanic-web/package.json

``json
{
	"name": "mechanic-web",
	"version": "0.0.0",
	"scripts": {
		"ng": "ng",
		"start": "ng serve --proxy-config proxy.conf.json --host 0.0.0.0 --port 4200",
		"build": "ng build",
		"watch": "ng build --watch --configuration development",
		"test": "ng test",
		"lint": "ng lint",
		"lint:fix": "ng lint --fix"
	},
	"private": true,
	"packageManager": "npm@10.9.2",
	"dependencies": {
		"@angular/cdk": "21.0.0",
		"@angular/common": "^21.2.0",
		"@angular/compiler": "^21.2.0",
		"@angular/core": "^21.2.0",
		"@angular/forms": "^21.2.0",
		"@angular/platform-browser": "^21.2.0",
		"@angular/router": "^21.2.0",
		"@ng-icons/core": ">=32.0.0 <34.0.0",
		"@ng-icons/lucide": ">=32.0.0 <34.0.0",
		"@ng-icons/remixicon": "^33.2.2",
		"@spartan-ng/brain": "^0.0.1-alpha.676",
		"class-variance-authority": "^0.7.0",
		"clsx": "^2.1.1",
		"rxjs": "~7.8.0",
		"tailwind-merge": "^3.5.0",
		"tailwindcss": "^4.2.2",
		"tslib": "^2.3.0"
	},
	"devDependencies": {
		"@angular/build": "^21.2.3",
		"@angular/cli": "^21.2.3",
		"@angular/compiler-cli": "^21.2.0",
		"@eslint/js": "^10.0.1",
		"@spartan-ng/cli": "^0.0.1-alpha.676",
		"@tailwindcss/postcss": "^4.2.2",
		"angular-eslint": "21.3.1",
		"eslint": "^10.0.3",
		"eslint-config-prettier": "^10.1.8",
		"eslint-plugin-prettier": "^5.5.5",
		"jsdom": "^28.0.0",
		"msw": "^2.12.14",
		"postcss": "^8.5.8",
		"prettier": "^3.8.1",
		"prettier-plugin-tailwindcss": "^0.7.2",
		"tw-animate-css": "^1.4.0",
		"typescript": "~5.9.2",
		"typescript-eslint": "8.56.1",
		"vitest": "^4.0.8"
	},
	"msw": {
		"workerDirectory": [
			"public"
		]
	}
}
``

---

## mechanic-web/proxy.conf.json

``json
{
	"/api": {
		"target": "http://serv-mech-api:8000",
		"secure": false,
		"changeOrigin": true,
		"logLevel": "debug"
	}
}
``

---

## mechanic-web/src/app/app.config.ts

``typescript
import {
	provideHttpClient,
	withFetch,
	withInterceptors,
} from "@angular/common/http";
import {
	ApplicationConfig,
	inject,
	provideAppInitializer,
	provideBrowserGlobalErrorListeners,
} from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { authTokenInterceptor } from "./core/http/interceptors/auth-token.interceptor";
import { httpErrorInterceptor } from "./core/http/interceptors/http-error.interceptor";
import { SessionBootstrapService } from "./core/session/services/session-bootstrap.service";

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(), // catch global errors
		provideRouter(routes),

		provideHttpClient(
			withFetch(),
			withInterceptors([authTokenInterceptor, httpErrorInterceptor])
		),
		provideAppInitializer(() => {
			const sessionBootstrapService = inject(SessionBootstrapService);
			return sessionBootstrapService.runBootstrap();
		}),
	],
};
``

---

## mechanic-web/tsconfig.app.json

``json
/* To learn more about Typescript configuration file: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html. */
/* To learn more about Angular compiler options: https://angular.dev/reference/configs/angular-compiler-options. */
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": []
  },
  "include": [
    "src/**/*.ts"
  ],
  "exclude": [
    "src/**/*.spec.ts"
  ]
}
``

---

## mechanic-web/tsconfig.json

``json
{
	"compileOnSave": false,
	"compilerOptions": {
		"rootDir": "/",
		"strict": true,
		"noImplicitOverride": true,
		"noPropertyAccessFromIndexSignature": true,
		"noImplicitReturns": true,
		"noFallthroughCasesInSwitch": true,
		"skipLibCheck": true,
		"isolatedModules": true,
		"experimentalDecorators": true,
		"importHelpers": true,
		"target": "ES2022",
		"module": "preserve",
		"paths": {
			"@shared/ui/button": ["./src/app/shared/ui/button/src/index.ts"],
			"@shared/ui/utils": ["./src/app/shared/ui/utils/src/index.ts"],
			"@shared/ui/button-group": [
				"./src/app/shared/ui/button-group/src/index.ts"
			],
			"@shared/ui/sonner": ["./src/app/shared/ui/sonner/src/index.ts"],
			"@shared/ui/icon": ["./src/app/shared/ui/icon/src/index.ts"],
			"@shared/ui/separator": ["./src/app/shared/ui/separator/src/index.ts"],
			"@shared/ui/dropdown-menu": [
				"./src/app/shared/ui/dropdown-menu/src/index.ts"
			],
			"@shared/ui/field": ["./src/app/shared/ui/field/src/index.ts"],
			"@shared/ui/label": ["./src/app/shared/ui/label/src/index.ts"],
			"@shared/ui/input": ["./src/app/shared/ui/input/src/index.ts"],
			"@shared/ui/badge": ["./src/app/shared/ui/badge/src/index.ts"],
			"@shared/ui/card": ["./src/app/shared/ui/card/src/index.ts"],
			"@shared/ui/dialog": ["./src/app/shared/ui/dialog/src/index.ts"],
			"@shared/ui/popover": ["./src/app/shared/ui/popover/src/index.ts"],
			"@shared/ui/input-group": [
				"./src/app/shared/ui/input-group/src/index.ts"
			],
			"@shared/ui/textarea": ["./src/app/shared/ui/textarea/src/index.ts"],
			"@shared/ui/sidebar": ["./src/app/shared/ui/sidebar/src/index.ts"],
			"@shared/ui/sheet": ["./src/app/shared/ui/sheet/src/index.ts"],
			"@shared/ui/skeleton": ["./src/app/shared/ui/skeleton/src/index.ts"],
			"@shared/ui/tooltip": ["./src/app/shared/ui/tooltip/src/index.ts"],
			"@shared/ui/alert": ["./src/app/shared/ui/alert/src/index.ts"],
			"@shared/ui/switch": ["./src/app/shared/ui/switch/src/index.ts"],
			"@shared/ui/empty": ["./src/app/shared/ui/empty/src/index.ts"],
			"@shared/ui/table": ["./src/app/shared/ui/table/src/index.ts"],
			"@shared/ui/select": ["./src/app/shared/ui/select/src/index.ts"],
			"@shared/ui/radio-group": [
				"./src/app/shared/ui/radio-group/src/index.ts"
			],
			"@shared/ui/calendar": ["./src/app/shared/ui/calendar/src/index.ts"]
		}
	},
	"angularCompilerOptions": {
		"enableI18nLegacyMessageIdFormat": false,
		"strictInjectionParameters": true,
		"strictInputAccessModifiers": true,
		"strictTemplates": true
	},
	"files": [],
	"references": [
		{
			"path": "./tsconfig.app.json"
		},
		{
			"path": "./tsconfig.spec.json"
		}
	]
}
``

---

## mechanic-web/tsconfig.spec.json

``json
/* To learn more about Typescript configuration file: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html. */
/* To learn more about Angular compiler options: https://angular.dev/reference/configs/angular-compiler-options. */
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
    "types": [
      "vitest/globals"
    ]
  },
  "include": [
    "src/**/*.d.ts",
    "src/**/*.spec.ts"
  ]
}
``

---

## nginx/default.conf

``
server {
    listen 80;
    # Es dinamico y no requiere ip-server
    server_name _;

    client_max_body_size 20M;

    location / {
        proxy_pass http://serv-mech-web:80;
        proxy_http_version 1.1;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /api/ {
        proxy_pass http://serv-mech-api:8000;
        proxy_http_version 1.1;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /flutter/ {
        proxy_pass http://serv-mech-flutter-web:80/;

        proxy_http_version 1.1;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
``

---

## nginx/Dockerfile

``dockerfile
FROM nginx:stable-alpine
COPY default.conf /etc/nginx/conf.d/default.conf
``

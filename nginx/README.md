# 🚀 Guía para construir y subir imágenes Docker (Flutter, Angular, API)

Esta guía muestra cómo construir y subir imágenes a Docker Hub usando variables genéricas:

* `TU_USUARIO`
* `1.0.0`

# 1. Build de todas las imágenes
```bash
docker build -t sebastiandevjs/mech-api:1.0.0       ./mechanic-api    -f ./mechanic-api/Dockerfile.prod
docker build -t sebastiandevjs/mech-web:1.0.0       ./mechanic-web    -f ./mechanic-web/Dockerfile.prod
docker build -t sebastiandevjs/mech-flutter-web:1.0.0 ./mechanic_mobile -f ./mechanic_mobile/Dockerfile.prod
```

# 2. Login en Docker Hub
```bash
docker login
```

# 3. Push de todas las imágenes
```bash
docker push sebastiandevjs/mech-api:1.0.0
docker push sebastiandevjs/mech-web:1.0.0
docker push sebastiandevjs/mech-flutter-web:1.0.0
```

<div align="center">
   <h1>Sistema de auxiliar mecanico</h1>
</div>

## 🏗 Estructura del proyecto

frontend `mechanic_mobile` en flutter <br>
backend `mechanic-api` desarrollado con FastAPI <br>
Frontend `mechanic-web` en Angular.

```
mechanic-system/
├── mechanic_mobile/
|   ├── assets/               # Imagenes
|   ├── lib/                  # Codigo fuente
|   ├── pubspec.yaml          # Librerias y configuración
│   └── ...
│
├── mechanic-api/              # Backend (FastAPI)
│   ├── .devcontainer/         # DevContainer para desarrollo de la API
│   ├── app/                   # Código principal de la API
│   ├── requirements.txt       # Dependencias Python
│   ├── Dockerfile.dev         # Imagen para desarrollo
│   ├── Dockerfile.prod        # Imagen para produccion
│   ├── .dockerignore          # Contexto de build limpio
│   └── ...
│
├── mechanic-web/              # Frontend (Angular)
│   ├── .devcontainer/         # DevContainer para desarrollo web
│   ├── src/                   # Código fuente del frontend
│   ├── Dockerfile.dev         # Imagen para desarrollo
│   ├── Dockerfile.prod        # Imagen para produccion
│   ├── .dockerignore          # Contexto de build limpio
│   └── ...
│
├── .env                       # Variables de entorno (desarrollo)
├── .env.sample                # Ejemplo de variables de entorno
├── docker-compose.yml         # Orquestación para desarrollo local
├── docker-compose.prod.yml    # Orquestación para produccion en VM/AWS
├── docker-compose.last.yml    # Variante operativa usada en AWS
└── README.md
```

### Servicios (Docker)

| Servicio | Tecnología | Puerto | Descripción |
|---|---|---:|---|
| `serv-mech-web` | Angular | 4200 | Interfaz web de desarrollo |
| `serv-mech-api` | Python / FastAPI | 8000 | API backend |
| `serv-mech-db` | PostgreSQL | 5432 | Base de datos |

---

### Desarrollo local

En la raiz ejecutar:
```bash
cp .env.sample .env

# Iniciar servicios
docker compose up --build
```

Flujo recomendado:

1. Copiar `.env.sample` a `.env`.
2. Ajustar variables locales si hace falta.
3. Levantar el stack con `docker compose up --build`.
4. Abrir `http://localhost:4200` para la web.
5. Consumir la API en `http://localhost:8000`.

### Documentacion del backend

La referencia actual del backend y su flujo real de arranque esta en:

- [`mechanic-api/documentacion_backend_actual.md`](mechanic-api/documentacion_backend_actual.md)

### DevContainer

Los devcontainers de `mechanic-api/` y `mechanic-web/` usan Dockerfiles dedicados para el editor y no dependen del `docker-compose.yml` del stack.

Flujo:

1. Abrir `mechanic-api/` o `mechanic-web/` en VS Code.
2. Ejecutar `Dev Containers: Reopen in Container`.
3. Usar el contenedor con sus herramientas de desarrollo y dependencias de editor.

### Produccion en VM/AWS

La implementacion real de despliegue usa `docker-compose.prod.yml` o `docker-compose.last.yml` y un archivo `.env` generado en la maquina virtual.

Flujo general:

1. Provisionar la VM.
2. Crear el `.env` en la VM con las variables reales.
3. Cargar las imagenes publicadas.
4. Ejecutar el compose de produccion correspondiente.

`docker-compose.prod.yml` y `docker-compose.last.yml` solo incluyen infraestructura base, API, frontends y proxy.

<hr>

<div align="center" width="100">
  <h1>Stack</h1>
  <!-- Languages -->
  </br>
  <h3>Languages and Frameworks</h3>
	<img
  		src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
  		width="60px"
  		alt="Python">
	<img
	  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg"
	  width="60px"
	  alt="FastAPI">
	<img
	  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg"
	  width="60px"
	  alt="Angular">

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg" width="60px" alt="Flutter"/>        
  <img
    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original-wordmark.svg"
    width="60px"
    alt="PostgreSQL">
  <img
    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original-wordmark.svg"
    width="60px"
    alt="HTML5">
    &nbsp;&nbsp;&nbsp;&nbsp;
  <img
    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original-wordmark.svg"
    width="60px"
    alt="css3">
    &nbsp;&nbsp;&nbsp;&nbsp;
  <img
    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"
    width="60px"
    alt="Tailwind CSS">
    <!-- Frameworks -->
	
  </br>
    <!-- tools -->
  </br>
  <h3>Tools</h3>
  <img
    src="https://cdn.simpleicons.org/jira/0052CC"
    width="55px"
    alt="Jira">
  <img
    src="https://cdn.simpleicons.org/github/FFFFFF"
    width="50px"
    alt="GitHub Logo White">
  <img
    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original-wordmark.svg"
    width="60px"
    alt="Docker">
    &nbsp;&nbsp;&nbsp;&nbsp;
  <img
    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original-wordmark.svg"
    width="65px"
    alt="Git Wordmark">
  <img
    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original-wordmark.svg"
    width="60px"
    alt="VS Code">
    &nbsp;&nbsp;&nbsp;&nbsp;
</div>
<hr>

last modified: 26/04/2026

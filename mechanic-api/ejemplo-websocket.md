# WebSocket de Tracking en Tiempo Real

Este documento describe el contrato real para integrar el tracking en tiempo real desde cualquier frontend.

Sirve para:
- Angular
- Flutter
- React
- Vue
- cualquier frontend que pueda abrir WebSocket y hacer requests HTTP

## Lo que necesita el frontend

### Angular
- `HttpClient` para obtener la sesión inicial.
- `WebSocket` nativo o `rxjs/webSocket` para el canal en tiempo real.
- Un interceptor o servicio de auth para leer el `access token`.
- Reintentos automáticos si el socket se corta.

### Flutter
- `http` o `dio` para pedir la sesión inicial.
- `web_socket_channel` para abrir el WebSocket.
- Manejo de reconexión manual o con timer.
- Conversión de `Decimal` o números JSON a `double`.

### Cualquier frontend
- Primero pide la sesión de tracking por HTTP.
- Luego abre el WebSocket con el `assignment_id`.
- Si el usuario es técnico, puede enviar `LOCATION_UPDATED`.
- Cliente y owner solo escuchan.

---

# Flujo general

```txt
1. Usuario inicia sesión
2. Frontend obtiene la sesión de tracking
3. Frontend abre el WebSocket
4. Frontend escucha eventos en vivo
5. Si es técnico, el frontend envía ubicación
6. El backend retransmite y decide si persiste en BD
```

---

# Endpoints HTTP previos al WebSocket

## Cliente

```http
GET /api/clients/me/assignments/{assignment_id}/tracking-session
```

## Taller

```http
GET /api/tenants/current/assignments/{assignment_id}/tracking-session
```

Ambos devuelven el mismo contrato:

```json
{
  "success": true,
  "message": "Sesión de tracking obtenida correctamente.",
  "data": {
    "assignment_id": "assignment-uuid",
    "incident_id": "incident-uuid",
    "assignment_status": "EN_ROUTE",
    "incident_status": "EN_ROUTE",
    "technician": {
      "id": "user-id",
      "name": "Carlos Rojas",
      "phone": "76543210"
    },
    "customer": {
      "id": "user-id",
      "name": "Juan Pérez",
      "phone": "71234567"
    },
    "origin": {
      "type": "TECHNICIAN_CURRENT_LOCATION",
      "latitude": -16.5001,
      "longitude": -68.1193,
      "address_text": null,
      "occurred_at": "2026-06-07T23:00:00Z"
    },
    "destination": {
      "type": "INCIDENT_LOCATION",
      "latitude": -16.5102,
      "longitude": -68.125,
      "address_text": "Av. Busch, La Paz",
      "occurred_at": null
    },
    "websocket": {
      "url": "/ws/assignments/assignment-uuid/tracking",
      "events": [
        "TECHNICIAN_LOCATION_UPDATED",
        "ASSIGNMENT_STATUS_CHANGED",
        "TECHNICIAN_CONNECTED",
        "TECHNICIAN_DISCONNECTED"
      ]
    },
    "maps": {
      "provider": "GOOGLE_MAPS",
      "travel_mode": "DRIVING",
      "frontend_calculates_eta": true
    }
  }
}
```

---

# WebSocket

## URL

```txt
/ws/assignments/{assignment_id}/tracking
```

## Base de conexión

- `ws://localhost:8000` en local
- `wss://tu-dominio` en producción

## Autenticación

El backend acepta el token por cualquiera de estas vías:

1. query param `token`
2. cookie de acceso

Ejemplo:

```txt
ws://localhost:8000/ws/assignments/{assignment_id}/tracking?token=ACCESS_TOKEN
```

Si ya tienes cookie de sesión, también funciona sin query param.

---

# Reglas de acceso

- `TECHNICIAN`
  - puede conectarse
  - puede enviar ubicación
  - debe estar asignado a la orden

- `CLIENT`
  - puede conectarse
  - solo escucha
  - debe ser el dueño real del incidente

- `TENANT_OWNER`
  - puede conectarse
  - solo escucha
  - debe pertenecer al taller dueño de la asignación

Si no cumple, el backend cierra el socket con `1008 Policy Violation`.

---

# Eventos que puede emitir el backend

## 1. Conexión

```json
{
  "type": "TECHNICIAN_CONNECTED",
  "assignment_id": "assignment-uuid"
}
```

También puede emitir:

- `CLIENT_CONNECTED`
- `TENANT_OWNER_CONNECTED`

## 2. Ubicación del técnico

```json
{
  "type": "TECHNICIAN_LOCATION_UPDATED",
  "assignment_id": "assignment-uuid",
  "latitude": -16.5001,
  "longitude": -68.1193,
  "heading": 120,
  "speed_kmh": 28,
  "occurred_at": "2026-06-07T23:30:00Z",
  "assignment_status": "EN_ROUTE",
  "incident_status": "EN_ROUTE",
  "provider_profile_id": "provider-profile-uuid",
  "technician_id": "technician-uuid",
  "customer_user_id": "customer-user-uuid"
}
```

## 3. Cambio de estado de asignación

```json
{
  "type": "ASSIGNMENT_STATUS_CHANGED",
  "assignment_id": "assignment-uuid",
  "incident_id": "incident-uuid",
  "assignment_status": "ARRIVED",
  "incident_status": "ARRIVED",
  "tracking_event_type": "ARRIVED",
  "occurred_at": "2026-06-07T23:30:00Z"
}
```

Eventos que pueden llegar aquí:

- `EN_ROUTE`
- `ARRIVED`
- `SERVICE_STARTED`
- `SERVICE_COMPLETED`
- `CANCELLED`

## 4. Desconexión

```json
{
  "type": "TECHNICIAN_DISCONNECTED",
  "assignment_id": "assignment-uuid"
}
```

También puede emitir:

- `CLIENT_DISCONNECTED`
- `TENANT_OWNER_DISCONNECTED`

## 5. Error de validación

```json
{
  "type": "VALIDATION_ERROR",
  "assignment_id": "assignment-uuid",
  "message": "Mensaje WebSocket inválido.",
  "details": []
}
```

## 6. Prohibido

```json
{
  "type": "FORBIDDEN",
  "assignment_id": "assignment-uuid",
  "message": "Solo el técnico puede enviar ubicación."
}
```

---

# Mensaje que puede enviar el técnico

El único mensaje operativo que envía el técnico es:

```json
{
  "type": "LOCATION_UPDATED",
  "latitude": -16.5001,
  "longitude": -68.1193,
  "heading": 120,
  "speed_kmh": 28
}
```

Campos:

- `type`
  - obligatorio
  - siempre `LOCATION_UPDATED`
- `latitude`
  - obligatorio
- `longitude`
  - obligatorio
- `heading`
  - opcional
- `speed_kmh`
  - opcional

Si no manda JSON válido:

```json
{
  "type": "VALIDATION_ERROR",
  "assignment_id": "assignment-uuid",
  "message": "Mensaje WebSocket inválido.",
  "details": [
    {
      "loc": ["latitude"],
      "msg": "Field required"
    }
  ]
}
```

---

# Flujo recomendado de frontend

## 1. Obtener sesión

```txt
GET /api/clients/me/assignments/{assignment_id}/tracking-session
GET /api/tenants/current/assignments/{assignment_id}/tracking-session
```

Con eso el frontend obtiene:

- coordenadas del incidente
- última ubicación del técnico
- datos de técnico y cliente
- URL del WebSocket
- eventos que puede esperar

## 2. Abrir WebSocket

```txt
ws://localhost:8000/ws/assignments/{assignment_id}/tracking?token=ACCESS_TOKEN
```

## 3. Escuchar eventos

El frontend debe reaccionar a:

- `TECHNICIAN_CONNECTED`
- `TECHNICIAN_LOCATION_UPDATED`
- `ASSIGNMENT_STATUS_CHANGED`
- `TECHNICIAN_DISCONNECTED`
- `VALIDATION_ERROR`
- `FORBIDDEN`

## 4. Si el usuario es técnico, enviar ubicación

Cada vez que el GPS cambie:

```json
{
  "type": "LOCATION_UPDATED",
  "latitude": -16.5001,
  "longitude": -68.1193,
  "heading": 120,
  "speed_kmh": 28
}
```

---

# Ejemplo Angular

## Servicio

```ts
const socket = new WebSocket(
  `${environment.wsBaseUrl}/ws/assignments/${assignmentId}/tracking?token=${token}`
);

socket.onopen = () => {
  console.log('tracking connected');
};

socket.onmessage = (event) => {
  const message = JSON.parse(event.data);

  switch (message.type) {
    case 'TECHNICIAN_LOCATION_UPDATED':
      // actualizar marker en mapa
      break;
    case 'ASSIGNMENT_STATUS_CHANGED':
      // actualizar estado de la orden
      break;
    case 'FORBIDDEN':
    case 'VALIDATION_ERROR':
      // mostrar error
      break;
  }
};

socket.onerror = (error) => {
  console.error(error);
};

socket.onclose = () => {
  console.log('tracking closed');
};
```

## Enviar ubicación si es técnico

```ts
socket.send(
  JSON.stringify({
    type: 'LOCATION_UPDATED',
    latitude: -16.5001,
    longitude: -68.1193,
    heading: 120,
    speed_kmh: 28,
  })
);
```

---

# Ejemplo Flutter

## Conexión

```dart
final socket = WebSocketChannel.connect(
  Uri.parse(
    '$wsBaseUrl/ws/assignments/$assignmentId/tracking?token=$token',
  ),
);
```

## Escuchar eventos

```dart
socket.stream.listen((event) {
  final message = jsonDecode(event as String);

  switch (message['type']) {
    case 'TECHNICIAN_LOCATION_UPDATED':
      // mover el marker
      break;
    case 'ASSIGNMENT_STATUS_CHANGED':
      // refrescar estado
      break;
    case 'FORBIDDEN':
    case 'VALIDATION_ERROR':
      // mostrar alerta
      break;
  }
});
```

## Enviar ubicación

```dart
socket.sink.add(
  jsonEncode({
    'type': 'LOCATION_UPDATED',
    'latitude': -16.5001,
    'longitude': -68.1193,
    'heading': 120,
    'speed_kmh': 28,
  }),
);
```

---

# Recomendaciones prácticas

- Reintenta conexión si el socket se corta.
- Mantén el token actualizado si expira la sesión.
- No envíes ubicación si el usuario no es técnico asignado.
- Usa `tracking-session` para pintar el mapa antes de abrir el socket.
- El mapa debe renderizar con:
  - `origin`
  - `destination`
  - `assignment_status`
  - `incident_status`
- Los `phones`, `ids` y `status` de la sesión son datos para UI, no para lógica de seguridad.

---

# Resumen

Con este contrato, el frontend puede:

1. cargar el contexto inicial,
2. conectarse al WebSocket,
3. escuchar cambios en vivo,
4. enviar ubicación si es técnico,
5. reaccionar a cambios de estado sin refrescar la pantalla.

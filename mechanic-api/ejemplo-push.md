# Ejemplos de Push

## Contrato de integración

Todos los pushes se envían como `data-only`.
El backend no envía `notification.title` ni `notification.body`.
Flutter debe construir la notificación local usando los campos del `data`.

### Librerías sugeridas

- `firebase_messaging`
- `flutter_local_notifications`

### Flujo recomendado

1. Recibir el push con `FirebaseMessaging.onMessage` o `FirebaseMessaging.onBackgroundMessage`.
2. Leer `notification_title`, `notification_body` y `notification_type`.
3. Construir una notificación local con botones y navegación.
4. Usar `notification_id` para evitar duplicados o para enrutar la acción correcta.
5. Usar `actions` y `deeplink` para abrir la pantalla exacta.

### Campos base esperados

- `notification_title`
- `notification_body`
- `notification_type`
- `notification_id`
- `notification_created_at`

## Cliente - `OFFER_ACCEPTED`

```json
{
  "type": "OFFER_ACCEPTED",
  "audience": "CLIENT",
  "incident_id": "b3f0ef1a-2c1e-4c21-8a4b-7c6e8f3a1001",
  "offer_id": "9a3d0f88-1e1b-4c20-9b65-1f0b6e0a2002",
  "provider_profile_id": "7f2e7b54-0a0a-4c48-bf5f-0c4f0de30003",
  "tenant_id": "1eaa3f3c-2222-4f45-9a9d-222222222222",
  "notification_title": "Speed Motors aceptó tu solicitud",
  "notification_body": "Speed Motors confirmó tu solicitud.",
  "notification_id": "<notification_id>",
  "notification_type": "OFFER_ACCEPTED",
  "notification_created_at": "2026-06-07T22:59:35Z"
}
```

## Cliente - `ASSIGNMENT_CREATED`

```json
{
  "type": "ASSIGNMENT_CREATED",
  "audience": "CLIENT",
  "assignment_id": "d4f2b7d1-1111-4c22-8f3d-222222222222",
  "incident_id": "b3f0ef1a-2c1e-4c21-8a4b-7c6e8f3a1001",
  "incident_code": "INC-20260607-0001",
  "incident_title": "Cambio de pastillas de freno",
  "provider_profile_id": "7f2e7b54-0a0a-4c48-bf5f-0c4f0de30003",
  "provider_type": "WORKSHOP",
  "title": "Técnico asignado",
  "message": "Juan Pérez atenderá tu vehículo. Servicio: Cambio de pastillas de freno.",
  "technician_name": "Juan Pérez",
  "service_name": "Cambio de pastillas de freno",
  "vehicle_label": "Toyota Corolla 2018",
  "incident_priority": "HIGH",
  "incident_status": "TECHNICIAN_ASSIGNED",
  "address_text": "Av. Busch #123, La Paz",
  "estimated_min_price": "250",
  "estimated_max_price": "420",
  "estimated_min_duration_minutes": 40,
  "estimated_max_duration_minutes": 90,
  "status_label": "TECHNICIAN_ASSIGNED",
  "priority_label": "Alta",
  "estimated_price_label": "Bs 250 - Bs 420",
  "estimated_duration_label": "40 - 90 min",
  "actions": {
    "view_incident": {
      "method": "GET",
      "url": "/api/clients/me/incidents/b3f0ef1a-2c1e-4c21-8a4b-7c6e8f3a1001"
    },
    "view_assignment": {
      "method": "GET",
      "url": "/api/clients/me/assignments/d4f2b7d1-1111-4c22-8f3d-222222222222"
    },
    "view_tracking": {
      "method": "GET",
      "url": "/api/clients/me/assignments/d4f2b7d1-1111-4c22-8f3d-222222222222/tracking-events"
    }
  },
  "deeplink": "mechanic://client/assignments/d4f2b7d1-1111-4c22-8f3d-222222222222",
  "notification_title": "Técnico asignado",
  "notification_body": "Juan Pérez atenderá tu vehículo. Servicio: Cambio de pastillas de freno.",
  "notification_id": "<notification_id>",
  "notification_type": "ASSIGNMENT_CREATED",
  "notification_created_at": "2026-06-07T22:59:35Z"
}
```

## Owner / Técnico - `INCIDENT_OFFER_CREATED`

```json
{
  "type": "INCIDENT_OFFER_CREATED",
  "action_context": "INCIDENT_OFFER",
  "incident_id": "b3f0ef1a-2c1e-4c21-8a4b-7c6e8f3a1001",
  "incident_code": "INC-20260607-0001",
  "incident_title": "Cambio de pastillas de freno",
  "incident_priority": "HIGH",
  "incident_status": "WAITING_PROVIDER_RESPONSE",
  "offer_id": "9a3d0f88-1e1b-4c20-9b65-1f0b6e0a2002",
  "provider_profile_id": "7f2e7b54-0a0a-4c48-bf5f-0c4f0de30003",
  "service_catalog_id": "4e0f0c32-3333-4c4d-9b9d-333333333333",
  "service_code": "BRAKE_PAD_REPLACEMENT",
  "service_name": "Cambio de pastillas de freno",
  "service_category": "Mantenimiento",
  "customer_id": "6d2b7d1a-4444-4c5e-9f3d-444444444444",
  "customer_name": "Juan Pérez",
  "vehicle_id": "8f2b7d1a-5555-4c6f-9f3d-555555555555",
  "vehicle_label": "Toyota Corolla 2018",
  "vehicle_plate": "ABC-1234",
  "address_text": "Av. Busch #123, La Paz",
  "latitude": "-16.5001",
  "longitude": "-68.1193",
  "probable_problem": "Frenos con desgaste avanzado",
  "confidence_score": "87.5",
  "estimated_min_price": "250",
  "estimated_max_price": "420",
  "estimated_min_duration_minutes": 40,
  "estimated_max_duration_minutes": 90,
  "distance_km": "3.2",
  "deeplink": "mechanic://tenant/offers/9a3d0f88-1e1b-4c20-9b65-1f0b6e0a2002",
  "primary_action": "OPEN_OFFER_DETAIL",
  "available_actions": "ACCEPT_OFFER,REJECT_OFFER",
  "view_url": "/api/tenants/current/offers/9a3d0f88-1e1b-4c20-9b65-1f0b6e0a2002",
  "accept_url": "/api/tenants/current/offers/9a3d0f88-1e1b-4c20-9b65-1f0b6e0a2002/accept",
  "reject_url": "/api/tenants/current/offers/9a3d0f88-1e1b-4c20-9b65-1f0b6e0a2002/reject",
  "accept_method": "PATCH",
  "reject_method": "PATCH",
  "notification_title": "Nueva solicitud urgente",
  "notification_body": "Servicio: Cambio de pastillas de freno. Prioridad: Alta. Cliente a 3.2 km de tu taller.",
  "notification_id": "<notification_id>",
  "notification_type": "INCIDENT_OFFER_CREATED",
  "notification_created_at": "2026-06-07T22:59:35Z"
}
```

## Cliente - `INCIDENT_NO_PROVIDERS_AVAILABLE`

```json
{
  "type": "INCIDENT_NO_PROVIDERS_AVAILABLE",
  "action_context": "INCIDENT_NO_PROVIDERS_AVAILABLE",
  "incident_id": "b3f0ef1a-2c1e-4c21-8a4b-7c6e8f3a1001",
  "incident_code": "INC-20260607-0001",
  "incident_title": "Cambio de pastillas de freno",
  "incident_priority": "HIGH",
  "incident_status": "SEARCHING_PROVIDER",
  "customer_id": "6d2b7d1a-4444-4c5e-9f3d-444444444444",
  "customer_name": "Juan Pérez",
  "service_catalog_id": "4e0f0c32-3333-4c4d-9b9d-333333333333",
  "service_code": "BRAKE_PAD_REPLACEMENT",
  "service_name": "Cambio de pastillas de freno",
  "service_category": "Mantenimiento",
  "vehicle_id": "8f2b7d1a-5555-4c6f-9f3d-555555555555",
  "vehicle_label": "Toyota Corolla 2018",
  "vehicle_plate": "ABC-1234",
  "address_text": "Av. Busch #123, La Paz",
  "latitude": "-16.5001",
  "longitude": "-68.1193",
  "probable_problem": "Frenos con desgaste avanzado",
  "confidence_score": "87.5",
  "estimated_min_price": "250",
  "estimated_max_price": "420",
  "estimated_min_duration_minutes": 40,
  "estimated_max_duration_minutes": 90,
  "title": "Sin talleres disponibles",
  "message": "No encontramos talleres disponibles para tu solicitud.",
  "audience": "CLIENT",
  "deeplink": "mechanic://client/incidents/b3f0ef1a-2c1e-4c21-8a4b-7c6e8f3a1001",
  "actions": {
    "view_incident": {
      "method": "GET",
      "url": "/api/clients/me/incidents/b3f0ef1a-2c1e-4c21-8a4b-7c6e8f3a1001"
    }
  },
  "notification_title": "Sin talleres disponibles",
  "notification_body": "No encontramos talleres disponibles para tu solicitud.",
  "notification_id": "<notification_id>",
  "notification_type": "INCIDENT_NO_PROVIDERS_AVAILABLE",
  "notification_created_at": "2026-06-07T22:59:35Z"
}
```

## Técnico - `ASSIGNMENT_CREATED`

```json
{
  "type": "ASSIGNMENT_CREATED",
  "action_context": "INCIDENT_OFFER",
  "assignment_id": "d4f2b7d1-1111-4c22-8f3d-222222222222",
  "incident_id": "b3f0ef1a-2c1e-4c21-8a4b-7c6e8f3a1001",
  "incident_code": "INC-20260607-0001",
  "incident_title": "Cambio de pastillas de freno",
  "title": "Nuevo servicio asignado",
  "message": "Servicio: Cambio de pastillas de freno. Prioridad: Alta. Revisa la ubicación.",
  "service_name": "Cambio de pastillas de freno",
  "vehicle_label": "Toyota Corolla 2018",
  "vehicle_plate": "ABC-1234",
  "incident_priority": "HIGH",
  "address_text": "Av. Busch #123, La Paz",
  "probable_problem": "Frenos con desgaste avanzado",
  "customer_name": "Juan Pérez",
  "actions": {
    "view_assignment": {
      "method": "GET",
      "url": "/api/tenants/current/assignments/d4f2b7d1-1111-4c22-8f3d-222222222222"
    },
    "start_route": {
      "method": "POST",
      "url": "/api/tenants/current/assignments/d4f2b7d1-1111-4c22-8f3d-222222222222/tracking-events",
      "body": {
        "event_type": "EN_ROUTE"
      }
    }
  },
  "deeplink": "mechanic://tenant/assignments/d4f2b7d1-1111-4c22-8f3d-222222222222",
  "audience": "TECHNICIAN",
  "notification_title": "Nuevo servicio asignado",
  "notification_body": "Servicio: Cambio de pastillas de freno. Prioridad: Alta. Revisa la ubicación.",
  "notification_id": "<notification_id>",
  "notification_type": "ASSIGNMENT_CREATED",
  "notification_created_at": "2026-06-07T22:59:35Z"
}
```

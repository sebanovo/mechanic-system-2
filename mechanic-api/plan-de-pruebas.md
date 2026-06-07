# Plan de pruebas - Flujo completo de incidente

## 1. Cliente inicia sesión

```http
POST /api/auth/login
```

---

## 2. Cliente registra dispositivo push

```http
POST /api/clients/me/notification-devices
```

---

## 3. Cliente registra vehículo

```http
POST /api/clients/me/vehicles
```

---

## 4. Cliente crea incidente

```http
POST /api/clients/me/incidents
```

Resultado esperado:

```txt
incident creado
ai_analysis creado
offer creada
owner notificado
```

---

## 5. Owner inicia sesión

```http
POST /api/auth/login
```

---

## 6. Owner selecciona tenant

```http
POST /api/auth/select-tenant
```

---

## 7. Owner registra dispositivo push / solo en flutter

```http
POST /api/clients/me/notification-devices
```

---

## 8. Owner revisa notificaciones

```http
GET /api/tenants/current/notifications
```

---

## 9. Owner lista ofertas

```http
GET /api/tenants/current/offers
```

---

## 10. Owner ve detalle de oferta

```http
GET /api/tenants/current/offers/{offer_id}
```

---

## 11. Owner acepta oferta

```http
PATCH /api/tenants/current/offers/{offer_id}/accept
```

Resultado esperado:

```txt
cliente notificado
incident = PROVIDER_ACCEPTED
offer = ACCEPTED
```

---

## 12. Owner lista técnicos disponibles

```http
GET /api/tenants/current/technicians
```

---

## 13. Owner asigna técnico

```http
POST /api/tenants/current/assignments
```

Body:

```json
{
  "offer_id": "offer_id",
  "technician_id": "technician_id"
}
```

Resultado esperado:

```txt
cliente notificado
técnico notificado
incident = TECHNICIAN_ASSIGNED
technician_availability = BUSY
```

---

## 14. Técnico inicia sesión

```http
POST /api/auth/login
```

---

## 15. Técnico selecciona tenant

```http
POST /api/auth/select-tenant
```

---

## 16. Técnico registra dispositivo push

```http
POST /api/clients/me/notification-devices
```

---

## 17. Técnico ve sus asignaciones

```http
GET /api/tenants/current/assignments
```

---

## 18. Técnico inicia ruta

```text1. EN_ROUTE
   Lo dispara el técnico manualmente:
   "Iniciar ruta"

2. LOCATION_UPDATED
   La app deberia enviar automáticamente cada cierto tiempo o distancia.
   No cambia el estado.
   Solo guarda coordenadas.

     "event_type": "LOCATION_UPDATED",
    "latitude": -16.5001,
    "longitude": -68.1193,
    "notes": "El tecnico esta avanzando hacia el punto del incidente.",

3. ARRIVED
   Lo dispara el técnico manualmente:
   "Llegué"

4. SERVICE_STARTED
   Lo dispara el técnico manualmente:
   "Iniciar servicio"

5. SERVICE_COMPLETED
   Lo dispara el técnico manualmente:
   "Finalizar servicio"

6. CANCELLED
   Lo dispara el técnico manualmente si necesita cancelar.
```

```http
POST /api/tenants/current/assignments/{assignment_id}/tracking-events
```

Body:

```json
{
  "event_type": "EN_ROUTE"
}
```

---

## 19. Técnico marca llegada

```http
POST /api/tenants/current/assignments/{assignment_id}/tracking-events
```

Body:

```json
{
  "event_type": "ARRIVED"
}
```

---

## 20. Técnico inicia servicio

```http
POST /api/tenants/current/assignments/{assignment_id}/tracking-events
```

Body:

```json
{
  "event_type": "SERVICE_STARTED"
}
```

---

## 21. Técnico finaliza servicio

```http
POST /api/tenants/current/assignments/{assignment_id}/tracking-events
```

Body:

```json
{
  "event_type": "SERVICE_COMPLETED"
}
```

Resultado esperado:

```txt
assignment = COMPLETED
incident = COMPLETED
technician_availability = AVAILABLE
cliente notificado
```
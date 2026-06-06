from __future__ import annotations

from sqlalchemy import select

from app.bootstrap.seeds.data.service_catalogs import SERVICE_CATALOGS
from app.core.database import SessionLocal
from app.modules.service_catalog.models import ServiceCatalog


def load_service_catalogs() -> None:
    with SessionLocal() as session:
        for catalog_data in SERVICE_CATALOGS:
            service_code = catalog_data["service_code"]

            existing = session.scalar(
                select(ServiceCatalog).where(ServiceCatalog.service_code == service_code)
            )
            if existing is not None:
                continue

            service_catalog = ServiceCatalog(
                service_code=service_code,
                service_name=catalog_data["service_name"],
                description=catalog_data["description"],
                category=catalog_data["category"],
                min_price=catalog_data["min_price"],
                max_price=catalog_data["max_price"],
                min_duration_minutes=catalog_data["min_duration_minutes"],
                max_duration_minutes=catalog_data["max_duration_minutes"],
                is_active=catalog_data["is_active"],
            )
            session.add(service_catalog)

        session.commit()

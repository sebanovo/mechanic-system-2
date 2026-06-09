from __future__ import annotations

from logging.config import fileConfig

from sqlalchemy import create_engine

from alembic import context
from app.core.config import settings
from app.core.database import Base
from app.modules.assignment import models as assignment_models  # noqa: F401
from app.modules.assignment_tracking_event import (
    models as assignment_tracking_event_models,  # noqa: F401
)
from app.modules.audit import models as audit_models  # noqa: F401
from app.modules.identity.customer import models as customer_models  # noqa: F401
from app.modules.identity.membership import models as membership_models  # noqa: F401
from app.modules.identity.provider import models as provider_models  # noqa: F401
from app.modules.identity.session import models as session_models  # noqa: F401
from app.modules.identity.technician import models as technician_models  # noqa: F401
from app.modules.identity.technician_availability import (
    models as technician_availability_models,  # noqa: F401
)
from app.modules.identity.tenant import models as tenant_models  # noqa: F401
from app.modules.identity.user import models as user_models  # noqa: F401
from app.modules.incident import models as incident_models  # noqa: F401
from app.modules.incident_ai_analysis import (
    models as incident_ai_analysis_models,  # noqa: F401
)
from app.modules.incident_candidate_provider import (
    models as incident_candidate_provider_models,  # noqa: F401
)
from app.modules.incident_offer import models as incident_offer_models  # noqa: F401
from app.modules.notification import models as notification_models  # noqa: F401
from app.modules.notification_device import (
    models as notification_device_models,  # noqa: F401
)
from app.modules.provider_service import models as provider_service_models  # noqa: F401
from app.modules.service_catalog import models as service_catalog_models  # noqa: F401
from app.modules.technician_service import (
    models as technician_service_models,  # noqa: F401
)
from app.modules.vehicle import models as vehicle_models  # noqa: F401

config = context.config

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

config.set_main_option("sqlalchemy.url", settings.database_url)

target_metadata = Base.metadata


def run_migrations_offline() -> None:
    context.configure(
        url=settings.database_url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
        compare_type=True,
        compare_server_default=True,
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    connectable = create_engine(settings.database_url, pool_pre_ping=True)

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            compare_type=True,
            compare_server_default=True,
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()

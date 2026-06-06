from __future__ import annotations


def infer_resource_type(entity: object) -> str:
    return entity.__class__.__name__.lower()


def infer_resource_id(entity: object) -> str | None:
    resource_id = getattr(entity, "id", None)

    if resource_id is None:
        return None

    return str(resource_id)
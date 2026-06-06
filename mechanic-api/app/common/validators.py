from __future__ import annotations

import re
import unicodedata

SLUG_PATTERN = re.compile(r"^[a-z0-9]+(?:_[a-z0-9]+)*$")


def normalize_text(value: str | None) -> str | None:
    if value is None:
        return None

    normalized = value.strip()
    return normalized or None


def normalize_email(value: str) -> str:
    return value.strip().lower()


def normalize_slug(value: str) -> str:
    return slugify(value)


def is_valid_slug(value: str) -> bool:
    return bool(SLUG_PATTERN.fullmatch(normalize_slug(value)))


def slugify(value: str) -> str:
    normalized = unicodedata.normalize("NFKD", value)
    ascii_value = normalized.encode("ascii", "ignore").decode("ascii")

    slug = re.sub(r"[^a-zA-Z0-9]+", "_", ascii_value)
    slug = re.sub(r"_+", "_", slug).strip("_").lower()

    return slug or "tenant"


def generate_unique_slug(repository, commercial_name: str) -> str:
    base_slug = slugify(commercial_name)
    slug = base_slug
    counter = 2

    while repository.get_by_slug(slug) is not None:
        slug = f"{base_slug}_{counter}"
        counter += 1

    return slug


def escape_like(value: str) -> str:
    return value.replace("\\", "\\\\").replace("%", "\\%").replace("_", "\\_")

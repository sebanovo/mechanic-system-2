from __future__ import annotations

from functools import lru_cache
from typing import Literal

from pydantic import Field, computed_field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    env_mode: Literal["local", "development", "staging", "production"] = Field(
        default="development",
        alias="ENV_MODE",
    )
    app_name: str = Field(default="Mechanic System API", alias="APP_NAME")
    app_version: str = Field(default="0.1.0", alias="APP_VERSION")
    api_v1_prefix: str = Field(default="/api", alias="API_V1_PREFIX")
    log_level: str = Field(default="INFO", alias="LOG_LEVEL")

    cors_allow_origins: str = Field(
        default="http://localhost:4200,http://127.0.0.1:4200",
        alias="CORS_ALLOW_ORIGINS",
    )

    sql_echo: bool = Field(default=False, alias="SQL_ECHO")

    postgres_serv: str = Field(default="localhost", alias="POSTGRES_SERV")
    postgres_db: str = Field(alias="POSTGRES_DB")
    postgres_user: str = Field(alias="POSTGRES_USER")
    postgres_password: str = Field(alias="POSTGRES_PASSWORD")
    postgres_port: int = Field(default=5432, alias="POSTGRES_PORT")
    postgres_host_port: int = Field(default=55432, alias="POSTGRES_HOST_PORT")

    backend_port: int = Field(default=8000, alias="BACKEND_PORT")

    secret_key: str = Field(alias="SECRET_KEY")
    jwt_algorithm: str = Field(default="HS256", alias="JWT_ALGORITHM")
    access_token_expire_minutes: int = Field(default=15, alias="ACCESS_TOKEN_EXPIRE_MINUTES")
    refresh_token_expire_minutes: int = Field(default=10080, alias="REFRESH_TOKEN_EXPIRE_MINUTES")

    access_cookie_name: str = Field(default="access_token", alias="ACCESS_COOKIE_NAME")
    refresh_cookie_name: str = Field(default="refresh_token", alias="REFRESH_COOKIE_NAME")
    cookie_secure: bool = Field(default=False, alias="COOKIE_SECURE")
    cookie_http_only: bool = Field(default=True, alias="COOKIE_HTTP_ONLY")
    cookie_same_site: Literal["lax", "strict", "none"] = Field(default="lax", alias="COOKIE_SAME_SITE")
    cookie_domain: str | None = Field(default=None, alias="COOKIE_DOMAIN")
    cookie_path: str = Field(default="/", alias="COOKIE_PATH")

    session_expire_minutes: int = Field(default=10080, alias="SESSION_EXPIRE_MINUTES")

    trusted_hosts: str = Field(default="localhost,127.0.0.1", alias="TRUSTED_HOSTS")
    docs_enabled_in_production: bool = Field(default=False, alias="DOCS_ENABLED_IN_PRODUCTION")
    security_headers_enabled: bool = Field(default=True, alias="SECURITY_HEADERS_ENABLED")
    https_redirect_enabled: bool = Field(default=False, alias="HTTPS_REDIRECT_ENABLED")

    bootstrap_seed_enabled: bool = Field(default=True, alias="BOOTSTRAP_SEED_ENABLED")

    audit_enabled: bool = Field(default=True, alias="AUDIT_ENABLED")

    initial_platform_admin_email: str = Field(alias="INITIAL_PLATFORM_ADMIN_EMAIL")
    initial_platform_admin_password: str = Field(alias="INITIAL_PLATFORM_ADMIN_PASSWORD")
    initial_platform_admin_first_name: str = Field(default="Platform", alias="INITIAL_PLATFORM_ADMIN_FIRST_NAME")
    initial_platform_admin_last_name: str = Field(default="Admin", alias="INITIAL_PLATFORM_ADMIN_LAST_NAME")
    initial_platform_admin_phone: str | None = Field(default=None, alias="INITIAL_PLATFORM_ADMIN_PHONE")

    frontend_port: int = Field(default=4200, alias="FRONTEND_PORT")

    @computed_field
    @property
    def database_url(self) -> str:
        return (
            f"postgresql+psycopg://{self.postgres_user}:"
            f"{self.postgres_password}@{self.postgres_serv}:"
            f"{self.postgres_port}/{self.postgres_db}"
        )

    @computed_field
    @property
    def cors_origins(self) -> list[str]:
        return [
            origin.strip()
            for origin in self.cors_allow_origins.split(",")
            if origin.strip()
        ]

    @computed_field
    @property
    def trusted_hosts_list(self) -> list[str]:
        return [
            host.strip()
            for host in self.trusted_hosts.split(",")
            if host.strip()
        ]

    @computed_field
    @property
    def docs_enabled(self) -> bool:
        if self.env_mode == "production":
            return self.docs_enabled_in_production
        return True


@lru_cache
def get_settings() -> Settings:
    return Settings()  # type: ignore[call-arg]


settings = get_settings()
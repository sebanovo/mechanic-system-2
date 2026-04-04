import os


class Settings:
    """
    Centralized application configuration.

    Reads environment variables and exposes them as attributes.
    """

    ENV_MODE: str = os.getenv("ENV_MODE", "development")

    # ===============================
    #  PostgreSQL
    # ===============================
    POSTGRES_SERV: str = os.getenv("POSTGRES_SERV", "localhost")
    POSTGRES_DB: str = os.getenv("POSTGRES_DB", "mechanic_db")
    POSTGRES_USER: str = os.getenv("POSTGRES_USER", "mechanic_user")
    POSTGRES_PASSWORD: str = os.getenv("POSTGRES_PASSWORD", "mechanic_password")
    POSTGRES_PORT: int = int(os.getenv("POSTGRES_PORT", "5432"))

    # ===============================
    #  Backend
    # ===============================
    BACKEND_HOST: str = os.getenv("BACKEND_HOST", "0.0.0.0")
    BACKEND_PORT: int = int(os.getenv("BACKEND_PORT", "8000"))

    # ===============================
    #  Security
    # ===============================
    SECRET_KEY: str = os.getenv("SECRET_KEY", "dev_secret")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(
        os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60")
    )

    # ===============================
    #  CORS
    # ===============================
    CORS_ORIGINS: str = os.getenv("CORS_ORIGINS", "")

    @property
    def database_url(self) -> str:
        """
        Builds PostgreSQL connection URL using internal Docker network values.

        NOTE:
        Uses POSTGRES_SERV (Docker service name) and POSTGRES_PORT (container port).
        Does NOT use host port.
        """
        return (
            f"postgresql+psycopg://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}"
            f"@{self.POSTGRES_SERV}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
        )


settings = Settings()
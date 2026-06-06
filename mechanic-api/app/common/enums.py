from enum import StrEnum


class SortDirection(StrEnum):
    ASC = "asc"
    DESC = "desc"


class ErrorCode(StrEnum):
    APP_ERROR = "app_error"
    VALIDATION_ERROR = "validation_error"
    UNAUTHORIZED = "unauthorized"
    FORBIDDEN = "forbidden"
    NOT_FOUND = "not_found"
    CONFLICT = "conflict"
    BUSINESS_ERROR = "business_error"
    SERVICE_UNAVAILABLE = "service_unavailable"
    INTERNAL_SERVER_ERROR = "internal_server_error"
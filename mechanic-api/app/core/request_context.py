from fastapi import Request

from app.core.context import RequestContext


def get_request_context(request: Request) -> RequestContext:
    return request.state.context
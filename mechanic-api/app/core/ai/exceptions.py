from __future__ import annotations


class AIError(RuntimeError):
    """Base AI error."""


class AIProviderDisabledError(AIError):
    """Raised when AI is disabled."""


class AIProviderNotConfiguredError(AIError):
    """Raised when AI provider is not configured."""


class AIProviderNotSupportedError(AIError):
    """Raised when AI provider is not supported."""


class AIResponseError(AIError):
    """Raised when AI response is invalid."""
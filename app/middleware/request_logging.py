import uuid, time, logging

from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware

logger = logging.getLogger("app.requests")

class RequestLoggingMiddleware(BaseHTTPMiddleware):

	async def dispatch(self, request: Request, call_next):

		request_id = str(uuid.uuid4())

		start_time = time.perf_counter()

		duration_ms = round((time.perf_counter() - start_time) * 100, 2)

		client_ip = request.client.host if request.client else "unknown"

		logger.info(
           "request_id=%s method=%s path=%s status_code=%s duration_ms=%s client_ip=%s",
           request_id,
           request.method,
           request.url.path,
           response.status_code,
           duration_ms,
           client_ip,
        )

		response.headers["X-Request-ID"] = request_id

		return response
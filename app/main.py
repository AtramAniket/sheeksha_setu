from fastapi import FastAPI

from app.core.config import settings
from app.api.v1.auth import auth_router
from app.core.logging import setup_logging
from app.middleware import RequestLoggingMiddleware

setup_logging()

app = FastAPI(title = settings.APP_NAME)

app.add_middleware(RequestLoggingMiddleware)

app.include_router(auth_router)

@app.get("/")
def root():
	return {
		"message": "Sheeksha Setup API is running",
		"environment": settings.APP_ENV,
	}

@app.get("/health")
def health_check():
	return { "status": "Okay" }
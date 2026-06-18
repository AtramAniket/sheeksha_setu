from fastapi import FastAPI

from app.core.config import settings
from app.api.v1.auth import auth_router
from app.core.logging import setup_logging
from fastapi.middleware.cors import CORSMiddleware
from app.middleware import RequestLoggingMiddleware

setup_logging()

app = FastAPI(title = settings.APP_NAME)

app.add_middleware(RequestLoggingMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
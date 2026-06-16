from fastapi import FastAPI

from app.core.config import settings

app = FastAPI(title = settings.APP_NAME)


@app.get("/")
def root():
	return {
		"message": "Sheeksha Setup API is running",
		"environment": settings.APP_ENV,
	}

@app.get("/health")
def health_check():
	return { "status": "Okay" }
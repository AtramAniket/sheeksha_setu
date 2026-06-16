from pydantic_setting import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):

	APP_NAME: str = "Sheeksha Setu"
	APP_ENV: str = "development"

	SECRET_KET: str
	DATABASE_URL: str

	ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

	model_config = SettingsConfigDict(env_file = ".env", extra = "ignore")

settings = Settings()
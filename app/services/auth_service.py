import secrets
from datetime import datetime, timedelta


def generate_verification_token() -> str:
    return secrets.token_urlsafe(32)


def verification_expiry():
    return datetime.utcnow() + timedelta(hours=12)
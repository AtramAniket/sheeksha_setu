import hashlib
import logging

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session

from app.api.deps import get_db, get_current_user
from app.core.security import hash_password, create_access_token, verify_password
from app.models.audit_log import AuditLog
from app.models.email_verification import EmailVerificationToken
from app.models.user import User, UserRole
from app.models.user_setting import UserSettings
from app.models.user_session import UserSession
from app.schemas.user import UserMeResponse
from app.schemas.auth import MessageResponse, RegisterRequest, TokenResponse, LoginRequest
from app.services.auth_service import (
    generate_verification_token,
    verification_expiry,
)

auth_router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)

auth_logger = logging.getLogger("app.auth")


@auth_router.get("/ping")
def auth_ping():
    return {"message": "Auth module working"}


@auth_router.get(
    "/me",
    response_model=UserMeResponse,
)
def get_me(
    current_user: User = Depends(get_current_user),
):
    return current_user


@auth_router.post(
    "/register",
    response_model=MessageResponse,
    status_code=status.HTTP_201_CREATED,
)
def register_user(
    payload: RegisterRequest,
    request: Request,
    db: Session = Depends(get_db),
):
    existing_user = (
        db.query(User)
        .filter(User.email == payload.email.lower())
        .first()
    )

    if existing_user:
        auth_logger.warning(
            "registration_failed email=%s reason=email_exists",
            payload.email,
        )
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )

    user = User(
        full_name=payload.full_name,
        email=payload.email.lower(),
        password_hash=hash_password(payload.password),
        role=UserRole.SCHOOL_ADMIN,
        is_active=False,
        email_verified=False,
    )

    db.add(user)
    db.flush()

    raw_token = generate_verification_token()
    token_hash = hashlib.sha256(raw_token.encode()).hexdigest()

    verification_token = EmailVerificationToken(
        user_id=user.id,
        token_hash=token_hash,
        expires_at=verification_expiry(),
        is_used=False,
    )

    settings = UserSettings(
        user_id=user.id,
        language="en",
        theme="light",
        sms_notifications_enabled=True,
        email_notifications_enabled=True,
    )

    client_ip = request.client.host if request.client else "unknown"

    audit_log = AuditLog(
        user_id=user.id,
        action="USER_REGISTERED",
        entity_type="User",
        entity_id=user.id,
        ip_address=client_ip,
        description="User registered and email verification token created",
    )

    db.add(verification_token)
    db.add(settings)
    db.add(audit_log)

    db.commit()

    auth_logger.info(
        "registration_success user_id=%s email=%s",
        user.id,
        user.email,
    )

    return {
        "message": "Registration successful. Please verify your email before login."
    }


@auth_router.post(
    "/login",
    response_model=TokenResponse,
)
def login_user(
    payload: LoginRequest,
    request: Request,
    db: Session = Depends(get_db),
):
    user = (
        db.query(User)
        .filter(User.email == payload.email.lower())
        .first()
    )

    if not user:
        auth_logger.warning(
            "login_failed email=%s reason=user_not_found",
            payload.email,
        )
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    if not verify_password(payload.password, user.password_hash):
        auth_logger.warning(
            "login_failed user_id=%s email=%s reason=invalid_password",
            user.id,
            user.email,
        )
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    if not user.email_verified:
        auth_logger.warning(
            "login_blocked user_id=%s email=%s reason=email_not_verified",
            user.id,
            user.email,
        )
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Email verification pending",
        )

    if not user.is_active:
        auth_logger.warning(
            "login_blocked user_id=%s email=%s reason=inactive_account",
            user.id,
            user.email,
        )
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is inactive",
        )

    client_ip = request.client.host if request.client else "unknown"
    user_agent = request.headers.get("user-agent")

    user_session = UserSession(
        user_id=user.id,
        ip_address=client_ip,
        user_agent=user_agent,
        is_active=True,
    )

    audit_log = AuditLog(
        user_id=user.id,
        action="USER_LOGIN",
        entity_type="User",
        entity_id=user.id,
        ip_address=client_ip,
        description="User logged in successfully",
    )

    db.add(user_session)
    db.add(audit_log)
    db.commit()

    access_token = create_access_token(subject=str(user.id))

    auth_logger.info(
        "login_success user_id=%s email=%s",
        user.id,
        user.email,
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }
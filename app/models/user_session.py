from typing import Optional
from datetime import datetime

from sqlalchemy import Boolean, DateTime, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class UserSession(Base):
    
    __tablename__ = "user_sessions"

    
    # Primary Key
    id: Mapped[int] = mapped_column(primary_key=True, index=True)

    
    # Foreign Key
    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )

    
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    user_agent: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    ip_address: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    
    logout_at: Mapped[Optional[datetime]] = mapped_column(DateTime, nullable=True)

    login_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    
    # Relationship
    user = relationship("User", back_populates="sessions")
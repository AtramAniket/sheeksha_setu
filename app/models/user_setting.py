from datetime import datetime

from sqlalchemy import text, Boolean, DateTime, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class UserSettings(Base):

    __tablename__ = "user_settings"

    
    # Primary Key
    id: Mapped[int] = mapped_column(primary_key=True, index=True)

    
    # Foreign Key
    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        unique=True,
        nullable=False,
    )


    language: Mapped[str] = mapped_column(String(20), default="en")

    theme: Mapped[str] = mapped_column(String(20), default="light")
    
    sms_notifications_enabled: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False, server_default=text("true"))
    
    email_notifications_enabled: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False, server_default=text("true"))

    
    # Meta
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    
    # Relationship
    user = relationship("User", back_populates="settings")
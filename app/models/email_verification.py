from datetime import datetime

from sqlalchemy import Boolean, DateTime, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class EmailVerificationToken(Base):
    
    __tablename__ = "email_verification_tokens"

    
    # Primary Key
    id: Mapped[int] = mapped_column(primary_key=True, index=True)

    
    # Foreign Key
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False)

    
    token_hash: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    
    expires_at: Mapped[datetime] = mapped_column(DateTime, nullable=False)

    is_used: Mapped[bool] = mapped_column(Boolean, default=False)
    

    # Meta
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    
    # Relationships
    user = relationship("User", back_populates="verification_tokens")
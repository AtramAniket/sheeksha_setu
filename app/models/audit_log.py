from typing import Optional
from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class AuditLog(Base):
    
    __tablename__ = "audit_logs"

    
    # Primary Key
    id: Mapped[int] = mapped_column(primary_key=True, index=True)

    
    # Foreign Key
    user_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=True
    )


    entity_id: Mapped[Optional[int]] = mapped_column(nullable=True)

    action: Mapped[str] = mapped_column(String(100), nullable=False)

    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    ip_address: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)

    entity_type: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    
    
    # Meta
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    
    # Relationship
    user = relationship("User", back_populates="audit_logs")
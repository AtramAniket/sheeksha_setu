import enum
from typing import Optional
from datetime import datetime

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import text, Boolean, DateTime, Enum, ForeignKey, String

from app.db.base import Base


class UserRole(str, enum.Enum):
    PARENT = "parent"
    TEACHER = "teacher"
    SUPER_ADMIN = "super_admin"
    SCHOOL_ADMIN = "school_admin"
    

class User(Base):
    
    __tablename__ = "users"

    
    # Primary Key
    id: Mapped[int] = mapped_column(primary_key=True, index=True)


    # Foreign Key
    school_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("schools.id", ondelete="CASCADE"),
        nullable=True,
    )

    branch_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("school_branches.id", ondelete="CASCADE"),
        nullable=True,
    )

   
    full_name: Mapped[str] = mapped_column(String(150), nullable=False)
    
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)

    role: Mapped[UserRole] = mapped_column(Enum(UserRole), nullable=False)

    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    
    is_active: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False, server_default=text("false"))
    
    email_verified: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False, server_default=text("false"))
    
    
    # Meta
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


    # Relationships
    school = relationship("School", back_populates="users")

    audit_logs = relationship("AuditLog", back_populates="user")

    sessions = relationship("UserSession", back_populates="user")

    branch = relationship("SchoolBranch", back_populates="users")

    settings = relationship("UserSettings", back_populates="user", uselist=False)

    verification_tokens = relationship("EmailVerificationToken", back_populates="user")
    
    
from typing import Optional
from datetime import datetime

from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy import text, Boolean, Date, ForeignKey, String, DateTime

from app.db.base import Base

class Student(Base):

    __tablename__ = "students"


    # Primary Key
    id: Mapped[int] = mapped_column(primary_key=True, index=True)

    
    # Foreign Key
    school_id: Mapped[int] = mapped_column(
        ForeignKey("schools.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    branch_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("branches.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )


    admission_number: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
        index=True
    )

    first_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    middle_name: Mapped[Optional[str]] = mapped_column(
        String(100),
        nullable=True
    )

    last_name: Mapped[Optional[str]] = mapped_column(
        String(100),
        nullable=True
    )

    gender: Mapped[str] = mapped_column(
        String(20),
        nullable=True
    )

    date_of_birth: Mapped[Optional[Date]] = mapped_column(
        Date,
        nullable=True
    )

    class_name: Mapped[str] = mapped_column(
        String(80),
        nullable=False
    )

    section: Mapped[Optional[str]] = mapped_column(
        String(20),
        nullable=True
    )

    parent_name: Mapped[str] = mapped_column(
        String(150),
        nullable=False
    )

    parent_phone: Mapped[str] = mapped_column(
        String(20),
        nullable=False
    )

    address: Mapped[Optional[str]] = mapped_column(
        String(200),
        nullable=True
    )

    aadhaar_number: Mapped[Optional[str]] = mapped_column(
        String(15),
        nullable=True
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=True,
        server_default=text("true")
    )


    # Meta
    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default = datetime.utcnow
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default = datetime.utcnow,
        onupdate = datetime.utcnow
    )
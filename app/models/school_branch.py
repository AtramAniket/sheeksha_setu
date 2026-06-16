from typing import Optional
from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, String, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base

class SchoolBranch(Base):

	__tablename__ = "school_branches"

	# Primary Key
	id: Mapped[int] = mapped_column(primmary_key = True, index = True)


	name: Mapped[str] = mapped_column(String(150), nullable = False)

	state: Mapped[str] = mapped_column(String(100), nullable = False)

	district: Mapped[str] = mapped_column(String(100), nullable = False)

	city: Mapped[Optional[str]] = mapped_column(String(100), nullable = True)

	phone: Mapped[Optional[str]] = mapped_column(String(20), nullable = True)

	email: Mapped[Optional[str]] = mapped_column(String(255), nullable = True)

	pincode: Mapped[Optional[str]] = mapped_column(String(20), nullable = True)

	address: Mapped[Optional[str]] = mapped_column(String(255), nullable = True)


	# Meta
	is_active: Mapped[bool] = mapped_column(Boolean, default = True)

	created_at: Mapped[datetime] = mapped_column(DateTime, default = datetime.utcnow)

	updated_at: Mapped[datetime] = mapped_column(DateTime, default = datetime.utcnow, onupdate = datetime.utcnow)


	# Foreign key
	school_id: Mapped[int] = mapped_column(ForeignKey("schools.id", ondelete="CASCADE"), nullable = False, index = True)

	
	# Relationships
	users = relationship("User", back_populates = "branch")

	school = relationship("School", back_populates = "branches")
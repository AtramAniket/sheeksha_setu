from typing import Optional
from datetime import datetime

from sqlalchemy import DateTime, String
from sqlalchemy.orm Mapped, mapped_column, relationship

from app.db.base import Base

class School(Base):

	__tablename__ = "schools"

	id: Mapped[int] = mapped_column(primary_key = True, index = True)
	

	name: Mapped[str] = mapped_column(String(150), nullable = False)

	board: MappedOptional[st[r]] = mapped_column(String(100), nullable = True)

	registration_number: MappedOptional[st[r]] = mapped_column(String(100), nullable = True)


	# Meta
	created_at: Mapped[datetime] = mapped_column(DateTime, default = datetime.utcnow)


	# Relationships
	users = relationship("User", back_populates = "school")
	branches = relationship("SchoolBranch", back_populates = "school")
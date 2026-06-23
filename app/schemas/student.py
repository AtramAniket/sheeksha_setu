from datetime import date
from pydantic import BaseModel, Field


class StudentBase(BaseModel):
    admission_number: str = Field(min_length=1, max_length=50)

    first_name: str = Field(min_length=1, max_length=100)
    middle_name: str | None = Field(default=None, max_length=100)
    last_name: str | None = Field(default=None, max_length=100)

    gender: str = Field(min_length=1, max_length=20)
    date_of_birth: date | None = None

    class_name: str = Field(min_length=1, max_length=50)
    section: str | None = Field(default=None, max_length=20)

    parent_name: str = Field(min_length=1, max_length=150)
    parent_phone: str = Field(min_length=1, max_length=20)

    address: str | None = Field(default=None, max_length=500)
    aadhaar_number: str | None = Field(default=None, min_length=12, max_length=12)


class StudentCreate(StudentBase):
    branch_id: int | None = None


class StudentUpdate(BaseModel):
    admission_number: str | None = Field(default=None, max_length=50)

    first_name: str | None = Field(default=None, max_length=100)
    middle_name: str | None = Field(default=None, max_length=100)
    last_name: str | None = Field(default=None, max_length=100)

    gender: str | None = Field(default=None, max_length=20)
    date_of_birth: date | None = None

    class_name: str | None = Field(default=None, max_length=50)
    section: str | None = Field(default=None, max_length=20)

    parent_name: str | None = Field(default=None, max_length=150)
    parent_phone: str | None = Field(default=None, max_length=20)

    address: str | None = Field(default=None, max_length=500)
    aadhaar_number: str | None = Field(default=None, min_length=12, max_length=12)

    is_active: bool | None = None


class StudentRead(StudentBase):
    id: int
    school_id: int
    branch_id: int | None = None
    is_active: bool

    model_config = {
        "from_attributes": True
    }
from pydantic import BaseModel, EmailStr, Field


class SchoolBranchCreate(BaseModel):
    name: str = Field(min_length=2, max_length=150)
    state: str = Field(min_length=2, max_length=100)
    district: str = Field(min_length=2, max_length=100)

    city: str | None = Field(default=None, max_length=100)
    phone: str | None = Field(default=None, max_length=20)
    email: EmailStr | None = Field(default=None, max_length=255)
    pincode: str | None = Field(default=None, max_length=20)
    address: str | None = Field(default=None, max_length=255)


class SchoolBranchRead(BaseModel):
    id: int
    school_id: int

    name: str
    state: str
    district: str

    city: str | None = None
    phone: str | None = None
    email: str | None = None
    pincode: str | None = None
    address: str | None = None

    is_active: bool

    model_config = {
        "from_attributes": True
    }
from pydantic import BaseModel, EmailStr

from app.models.user import UserRole


class UserMeResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    role: UserRole
    is_active: bool
    email_verified: bool
    school_id: int | None = None
    branch_id: int | None = None

    model_config = {
        "from_attributes": True
    }
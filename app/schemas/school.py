from pydantic import BaseModel, Field


class SchoolCreate(BaseModel):
    name: str = Field(min_length=2, max_length=150)
    board: str | None = Field(default=None, max_length=100)
    registration_number: str | None = Field(default=None, max_length=100)


class SchoolRead(BaseModel):
    id: int
    name: str
    board: str | None = None
    registration_number: str | None = None

    model_config = {
        "from_attributes": True
    }
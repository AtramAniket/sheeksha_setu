from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_db, get_current_user
from app.models.school import School
from app.models.user import User
from app.schemas.school import SchoolCreate, SchoolRead

school_router = APIRouter(prefix="/schools", tags=["Schools"])


@school_router.post("/", response_model=SchoolRead, status_code=status.HTTP_201_CREATED)
def create_school(
    payload: SchoolCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if current_user.school_id is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User is already linked to a school.",
        )

    if payload.registration_number:
        existing_school = (
            db.query(School)
            .filter(School.registration_number == payload.registration_number)
            .first()
        )

        if existing_school:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="School with this registration number already exists.",
            )

    school = School(
        name=payload.name,
        board=payload.board,
        registration_number=payload.registration_number,
    )

    db.add(school)
    db.flush()

    current_user.school_id = school.id

    db.commit()
    db.refresh(school)

    return school
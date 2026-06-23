from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException, status

from app.api.deps import get_db, get_current_user

from app.models.user import User
from app.models.school_branch import SchoolBranch
from app.schemas.school_branch import SchoolBranchCreate, SchoolBranchRead

school_branch_router = APIRouter(prefix="/school-branches", tags=["School Branches"])


@school_branch_router.post("/", response_model=SchoolBranchRead, status_code=status.HTTP_201_CREATED)
def create_school_branch(
    payload: SchoolBranchCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if current_user.school_id is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Current user is not linked to a school.",
        )

    branch = SchoolBranch(
        school_id=current_user.school_id,
        name=payload.name,
        state=payload.state,
        district=payload.district,
        city=payload.city,
        phone=payload.phone,
        email=payload.email,
        pincode=payload.pincode,
        address=payload.address,
    )

    db.add(branch)
    db.flush()

    current_user.branch_id = branch.id

    db.commit()
    db.refresh(branch)

    return branch
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.models.student import Student
from app.models.user import User
from app.schemas.student import StudentCreate, StudentRead, StudentUpdate
from app.api.deps import get_current_user

student_router = APIRouter(prefix="/students", tags=["Students"])


@student_router.post("/", response_model=StudentRead, status_code=status.HTTP_201_CREATED)
def create_student(
    payload: StudentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    existing_student = (
        db.query(Student)
        .filter(
            Student.school_id == current_user.school_id,
            Student.admission_number == payload.admission_number,
        )
        .first()
    )

    if existing_student:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Student with this admission number already exists.",
        )
    
    if current_user.branch_id is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Current user is not linked to a branch.",
        )

    student = Student(
        school_id=current_user.school_id,
        branch_id=current_user.branch_id,
        admission_number=payload.admission_number,
        first_name=payload.first_name,
        middle_name=payload.middle_name,
        last_name=payload.last_name,
        gender=payload.gender,
        date_of_birth=payload.date_of_birth,
        class_name=payload.class_name,
        section=payload.section,
        parent_name=payload.parent_name,
        parent_phone=payload.parent_phone,
        address=payload.address,
        aadhaar_number=payload.aadhaar_number,
    )

    db.add(student)
    db.commit()
    db.refresh(student)

    return student

@student_router.get("/", response_model=list[StudentRead])
def list_students(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if current_user.school_id is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Current user is not linked to a school.",
        )

    students = (
        db.query(Student)
        .filter(
            Student.school_id == current_user.school_id,
            Student.is_active == True,
        )
        .order_by(Student.id.desc())
        .all()
    )

    return students


@student_router.get("/{student_id}", response_model=StudentRead)
def get_student(
    student_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if current_user.school_id is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Current user is not linked to a school.",
        )

    student = (
        db.query(Student)
        .filter(
            Student.id == student_id,
            Student.school_id == current_user.school_id,
            Student.is_active.is_(True),
        )
        .first()
    )

    if not student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Student not found.",
        )

    return student

@student_router.put("/{student_id}", response_model=StudentRead)
def update_student(
    student_id: int,
    payload: StudentUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    student = (
        db.query(Student)
        .filter(
            Student.id == student_id,
            Student.school_id == current_user.school_id,
            Student.is_active.is_(True),
        )
        .first()
    )

    if not student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Student not found.",
        )

    update_data = payload.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(student, field, value)

    db.commit()
    db.refresh(student)

    return student


@student_router.delete("/{student_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_student(
    student_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    student = (
        db.query(Student)
        .filter(
            Student.id == student_id,
            Student.school_id == current_user.school_id,
            Student.is_active.is_(True),
        )
        .first()
    )

    if not student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Student not found.",
        )

    student.is_active = False

    db.commit()

    return None
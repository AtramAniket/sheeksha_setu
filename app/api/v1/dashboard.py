from fastapi import APIRouter, Depends
from sqlalchemy import select, func
from sqlalchemy.orm import Session

from app.api.deps import get_db, get_current_user
from app.models.student import Student
from app.models.user import User
from app.schemas.dashboard import DashboardStatsResponse


dashboard_router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@dashboard_router.get("/stats", response_model=DashboardStatsResponse)
def get_dashboard_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    total_students = db.scalar(select(func.count(Student.id)).where(Student.is_active.is_(True))) or 0

    return DashboardStatsResponse(
        total_students=total_students,
        total_teachers=0,
        attendance_today=0,
        pending_fees=0,
    )
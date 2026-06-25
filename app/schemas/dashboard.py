from pydantic import BaseModel


class DashboardStatsResponse(BaseModel):
    total_students: int
    total_teachers: int
    attendance_today: int
    pending_fees: int
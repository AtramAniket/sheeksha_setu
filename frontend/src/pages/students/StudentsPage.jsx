import { Link } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function StudentsPage() {
  return (
    <AppLayout title="Students" description="Manage student records">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Students</h1>
          <p className="mt-1 text-slate-600">
            Add, update, and manage student information.
          </p>
        </div>

        <Button asChild>
          <Link to="/students/create">Add Student</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Student Registry</CardTitle>
            <Badge variant="secondary">0 students</Badge>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex min-h-64 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <h2 className="text-xl font-semibold">No students yet</h2>
            <p className="mt-2 max-w-md text-slate-600">
              Add your first student to begin managing admissions, attendance,
              fees, and academic records.
            </p>
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
}

export default StudentsPage;

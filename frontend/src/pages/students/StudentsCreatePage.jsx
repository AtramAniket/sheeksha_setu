import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/AppLayout";
import { Link } from "react-router-dom";

function StudentCreatePage() {
  return (
    <AppLayout title="Add Student" description="Create a new student record">
      <div className="mb-6">
        <Button asChild variant="outline">
          <Link to="/students">Back to Students</Link>
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add Student</h1>
        <p className="mt-1 text-slate-600">
          Student creation form will go here.
        </p>
      </div>
    </AppLayout>
  );
}

export default StudentCreatePage;

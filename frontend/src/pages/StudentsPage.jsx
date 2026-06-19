import AppLayout from "@/layouts/AppLayout";

function StudentsPage() {
  return (
    <AppLayout title="Students" description="Manage student records">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Students</h1>
        <p className="mt-1 text-slate-600">Manage student records.</p>
      </div>
    </AppLayout>
  );
}

export default StudentsPage;

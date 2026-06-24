import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import { getStudents, deleteStudent } from "@/api/student";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadStudents() {
    try {
      setLoading(true);
      setError("");
      const data = await getStudents();
      setStudents(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load students.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(studentId) {
    const confirmed = window.confirm("Delete this student?");
    if (!confirmed) return;

    try {
      await deleteStudent(studentId);
      setStudents((current) =>
        current.filter((student) => student.id !== studentId),
      );
    } catch (err) {
      console.error(err);
      alert("Failed to delete student.");
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

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
            <Badge variant="secondary">
              {students.length} {students.length === 1 ? "student" : "students"}
            </Badge>
          </div>
        </CardHeader>

        <CardContent>
          {loading && (
            <p className="text-sm text-slate-600">Loading students...</p>
          )}

          {!loading && error && <p className="text-sm text-red-600">{error}</p>}

          {!loading && !error && students.length === 0 && (
            <div className="flex min-h-64 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <h2 className="text-xl font-semibold">No students yet</h2>
              <p className="mt-2 max-w-md text-slate-600">
                Add your first student to begin managing admissions, attendance,
                fees, and academic records.
              </p>
            </div>
          )}

          {!loading && !error && students.length > 0 && (
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full text-sm">
                <thead className="bg-slate-100 text-left">
                  <tr>
                    <th className="px-4 py-3 font-medium">Admission No.</th>
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Class</th>
                    <th className="px-4 py-3 font-medium">Guardian</th>
                    <th className="px-4 py-3 font-medium">Phone</th>
                    <th className="px-4 py-3 text-right font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} className="border-t">
                      <td className="px-4 py-3">{student.admission_number}</td>
                      <td className="px-4 py-3 font-medium">
                        {student.first_name} {student.middle_name || ""}{" "}
                        {student.last_name || ""}
                      </td>
                      <td className="px-4 py-3">
                        {student.class_name || student.grade}
                        {student.section ? ` - ${student.section}` : ""}
                      </td>
                      <td className="px-4 py-3">{student.parent_name}</td>
                      <td className="px-4 py-3">{student.parent_phone}</td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/students/${student.id}/edit`}>
                              Edit
                            </Link>
                          </Button>

                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(student.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </AppLayout>
  );
}

export default StudentsPage;

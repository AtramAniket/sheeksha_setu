import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import AppLayout from "@/layouts/AppLayout";
import { getStudentById } from "@/api/student";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function StudentDetailsPage() {
  const { id } = useParams();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    async function loadStudent() {
      try {
        setLoading(true);
        setServerError("");

        const data = await getStudentById(id);
        setStudent(data);
      } catch (err) {
        console.error(err);
        setServerError("Failed to load student details.");
      } finally {
        setLoading(false);
      }
    }

    loadStudent();
  }, [id]);

  const fullName = student
    ? [student.first_name, student.middle_name, student.last_name]
        .filter(Boolean)
        .join(" ")
    : "";

  return (
    <AppLayout title="Student Details" description="View student information">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button asChild variant="outline">
          <Link to="/students">Back to Students</Link>
        </Button>

        {student && (
          <Button asChild>
            <Link to={`/students/${student.id}/edit`}>Edit Student</Link>
          </Button>
        )}
      </div>

      {loading && <p className="text-sm text-slate-600">Loading student...</p>}

      {!loading && serverError && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
          {serverError}
        </p>
      )}

      {!loading && !serverError && student && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>{fullName}</CardTitle>
                  <p className="mt-1 text-sm text-slate-600">
                    Admission No: {student.admission_number}
                  </p>
                </div>

                <Badge variant={student.is_active ? "secondary" : "outline"}>
                  {student.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <DetailItem
                  label="Admission Number"
                  value={student.admission_number}
                />
                <DetailItem label="Full Name" value={fullName} />
                <DetailItem
                  label="Gender"
                  value={formatGender(student.gender)}
                />
                <DetailItem
                  label="Date of Birth"
                  value={formatDate(student.date_of_birth)}
                />
                <DetailItem label="Class" value={student.class_name} />
                <DetailItem label="Section" value={student.section || "—"} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Parent Information</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <DetailItem label="Parent Name" value={student.parent_name} />
                <DetailItem label="Parent Phone" value={student.parent_phone} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <DetailItem label="Address" value={student.address || "—"} />
                <DetailItem
                  label="Aadhaar Number"
                  value={student.aadhaar_number || "Not provided"}
                />
                <DetailItem label="School ID" value={student.school_id} />
                <DetailItem label="Branch ID" value={student.branch_id} />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </AppLayout>
  );
}

function DetailItem({ label, value }) {
  return (
    <div className="rounded-lg border bg-background p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium">{value || "—"}</p>
    </div>
  );
}

function formatGender(gender) {
  if (!gender) return "—";
  return gender.charAt(0).toUpperCase() + gender.slice(1);
}

function formatDate(dateValue) {
  if (!dateValue) return "—";

  return new Date(dateValue).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default StudentDetailsPage;

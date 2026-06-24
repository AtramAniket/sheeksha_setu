import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useParams } from "react-router-dom";

import StudentForm from "./StudentForm";
import AppLayout from "@/layouts/AppLayout";
import { studentCreateSchema } from "@/validators/student";
import { getStudentById, updateStudent } from "@/api/student";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const defaultValues = {
  admission_number: "",
  first_name: "",
  middle_name: "",
  last_name: "",
  gender: "",
  date_of_birth: "",
  class_name: "",
  section: "",
  parent_name: "",
  parent_phone: "",
  address: "",
};

function StudentsEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(studentCreateSchema),
    defaultValues,
  });

  useEffect(() => {
    async function loadStudent() {
      try {
        setLoading(true);
        setServerError("");

        const student = await getStudentById(id);

        reset({
          admission_number: student.admission_number || "",
          first_name: student.first_name || "",
          middle_name: student.middle_name || "",
          last_name: student.last_name || "",
          gender: student.gender || "",
          date_of_birth: student.date_of_birth || "",
          class_name: student.class_name || "",
          section: student.section || "",
          parent_name: student.parent_name || "",
          parent_phone: student.parent_phone || "",
          address: student.address || "",
        });
      } catch (err) {
        console.error(err);
        setServerError("Failed to load student details.");
      } finally {
        setLoading(false);
      }
    }

    loadStudent();
  }, [id, reset]);

  async function onSubmit(values) {
    try {
      setServerError("");
      await updateStudent(id, values);
      toast.success("Student details updated successfully.")
      navigate("/students");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update student details.")
      setServerError("Failed to update student. Please check the details.");
    }
  }

  return (
    <AppLayout title="Edit Student" description="Update student record">
      <div className="mb-6">
        <Button asChild variant="outline">
          <Link to="/students">Back to Students</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Student</CardTitle>
        </CardHeader>

        <CardContent>
          {loading ? (
            <p className="text-sm text-slate-600">Loading student...</p>
          ) : (
            <StudentForm
              register={register}
              errors={errors}
              isSubmitting={isSubmitting}
              onSubmit={handleSubmit(onSubmit)}
              submitLabel="Update Student"
              submittingLabel="Updating..."
            />
          )}
        </CardContent>
      </Card>
    </AppLayout>
  );
}

export default StudentsEditPage;
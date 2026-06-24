import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import StudentForm from "./StudentForm";
import AppLayout from "@/layouts/AppLayout";
import { createStudent } from "@/api/student";
import { studentCreateSchema } from "@/validators/student";

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

function StudentsCreatePage() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(studentCreateSchema),
    defaultValues,
  });

  async function onSubmit(values) {
    try {
      setServerError("");
      await createStudent(values);
      navigate("/students");
    } catch (err) {
      console.error(err);
      setServerError("Failed to create student. Please check the details.");
    }
  }

  return (
    <AppLayout title="Add Student" description="Create a new student record">
      <div className="mb-6">
        <Button asChild variant="outline">
          <Link to="/students">Back to Students</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add Student</CardTitle>
        </CardHeader>

        <CardContent>
          <StudentForm
            register={register}
            errors={errors}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit(onSubmit)}
            submitLabel="Create Student"
            submittingLabel="Creating..."
          />
        </CardContent>
      </Card>
    </AppLayout>
  );
}

export default StudentsCreatePage;
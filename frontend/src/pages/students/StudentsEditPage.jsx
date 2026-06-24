import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AppLayout from "@/layouts/AppLayout";
import { getStudentById, updateStudent } from "@/api/student";
import { studentCreateSchema } from "@/validators/student";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
      navigate("/students");
    } catch (err) {
      console.error(err);
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {serverError && (
                <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
                  {serverError}
                </p>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  label="Admission Number"
                  error={errors.admission_number?.message}
                >
                  <Input {...register("admission_number")} />
                </FormField>

                <FormField
                  label="Date of Birth"
                  error={errors.date_of_birth?.message}
                >
                  <Input type="date" {...register("date_of_birth")} />
                </FormField>

                <FormField label="First Name" error={errors.first_name?.message}>
                  <Input {...register("first_name")} />
                </FormField>

                <FormField
                  label="Middle Name"
                  error={errors.middle_name?.message}
                >
                  <Input {...register("middle_name")} />
                </FormField>

                <FormField label="Last Name" error={errors.last_name?.message}>
                  <Input {...register("last_name")} />
                </FormField>

                <FormField label="Gender" error={errors.gender?.message}>
                  <select
                    {...register("gender")}
                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </FormField>

                <FormField label="Class" error={errors.class_name?.message}>
                  <Input {...register("class_name")} />
                </FormField>

                <FormField label="Section" error={errors.section?.message}>
                  <Input {...register("section")} />
                </FormField>

                <FormField label="Parent Name" error={errors.parent_name?.message}>
                  <Input {...register("parent_name")} />
                </FormField>

                <FormField
                  label="Parent Phone"
                  error={errors.parent_phone?.message}
                >
                  <Input {...register("parent_phone")} />
                </FormField>
              </div>

              <FormField label="Address" error={errors.address?.message}>
                <textarea
                  {...register("address")}
                  rows={3}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </FormField>

              <div className="flex justify-end gap-3">
                <Button asChild type="button" variant="outline">
                  <Link to="/students">Cancel</Link>
                </Button>

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Updating..." : "Update Student"}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </AppLayout>
  );
}

function FormField({ label, error, children }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      {children}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

export default StudentsEditPage;
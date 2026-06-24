import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function StudentForm({
  register,
  errors,
  isSubmitting,
  onSubmit,
  submitLabel,
  submittingLabel,
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          label="Admission Number"
          error={errors.admission_number?.message}
        >
          <Input {...register("admission_number")} placeholder="ADM001" />
        </FormField>

        <FormField label="Date of Birth" error={errors.date_of_birth?.message}>
          <Input type="date" {...register("date_of_birth")} />
        </FormField>

        <FormField label="First Name" error={errors.first_name?.message}>
          <Input {...register("first_name")} placeholder="Rahul" />
        </FormField>

        <FormField label="Middle Name" error={errors.middle_name?.message}>
          <Input {...register("middle_name")} placeholder="Optional" />
        </FormField>

        <FormField label="Last Name" error={errors.last_name?.message}>
          <Input {...register("last_name")} placeholder="Sharma" />
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
          <Input {...register("class_name")} placeholder="5" />
        </FormField>

        <FormField label="Section" error={errors.section?.message}>
          <Input {...register("section")} placeholder="A" />
        </FormField>

        <FormField label="Parent Name" error={errors.parent_name?.message}>
          <Input {...register("parent_name")} placeholder="Ramesh Sharma" />
        </FormField>

        <FormField label="Parent Phone" error={errors.parent_phone?.message}>
          <Input {...register("parent_phone")} placeholder="9876543210" />
        </FormField>
      </div>

      <FormField label="Address" error={errors.address?.message}>
        <textarea
          {...register("address")}
          rows={3}
          placeholder="Student address"
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
      </FormField>

      <div className="flex justify-end gap-3">
        <Button asChild type="button" variant="outline">
          <Link to="/students">Cancel</Link>
        </Button>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? submittingLabel : submitLabel}
        </Button>
      </div>
    </form>
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

export default StudentForm;

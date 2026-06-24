import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

import { registerUser } from "@/api/auth";
import { registerSchema } from "@/validators/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  async function onSubmit(values) {
    try {
      setServerError("");

      const payload = {
        full_name: values.full_name,
        email: values.email,
        password: values.password,
      };

      await registerUser(payload);

      toast.success("Account created. Please verify your email before login.");
      navigate("/login");
    } catch (err) {
      const message =
        err.response?.data?.detail || "Registration failed. Please try again.";

      setServerError(message);
      toast.error(message);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create your account</CardTitle>
          <p className="text-sm text-slate-600">
            Start managing your school with Shiksha Setu
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {serverError && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
                {serverError}
              </p>
            )}

            <FormField label="Full Name" error={errors.full_name?.message}>
              <Input
                type="text"
                placeholder="Aniket Test"
                {...register("full_name")}
              />
            </FormField>

            <FormField label="Email" error={errors.email?.message}>
              <Input
                type="email"
                placeholder="admin@school.com"
                {...register("email")}
              />
            </FormField>

            <FormField label="Password" error={errors.password?.message}>
              <PasswordInput
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                registerProps={register("password")}
                placeholder="Create password"
              />
            </FormField>

            <FormField
              label="Confirm Password"
              error={errors.confirm_password?.message}
            >
              <PasswordInput
                showPassword={showConfirmPassword}
                setShowPassword={setShowConfirmPassword}
                registerProps={register("confirm_password")}
                placeholder="Confirm password"
              />
            </FormField>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}

function PasswordInput({
  showPassword,
  setShowPassword,
  registerProps,
  placeholder,
}) {
  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        className="pr-10"
        {...registerProps}
      />

      <button
        type="button"
        onClick={() => setShowPassword((current) => !current)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
      >
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
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
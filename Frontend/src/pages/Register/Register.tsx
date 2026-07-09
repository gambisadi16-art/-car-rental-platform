import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useAuth } from "../../context/AuthContext";

const registerSchema = z
    .object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Please enter a valid email address"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type RegisterFormData = z.infer<typeof registerSchema>;

function Register() {
    const { register: registerUser } = useAuth();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormData) => {
        setIsSubmitting(true);
        try {
            await registerUser(data.name, data.email, data.password);
            toast.success("Account created! Welcome to DriveLux.");
            navigate("/dashboard");
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-charcoal">Create an account</h1>
                    <p className="mt-2 text-sm text-charcoal/60">
                        Join DriveLux and start your journey
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-8 space-y-5 rounded-xl border border-border bg-white p-8 shadow-sm"
                >
                    <div className="flex flex-col gap-1.5">
                        <label
                            htmlFor="name"
                            className="text-sm font-medium text-charcoal"
                        >
                            Full Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            autoComplete="name"
                            placeholder="John Doe"
                            {...register("name")}
                            className="rounded-md border border-border px-3 py-2.5 text-sm text-charcoal outline-none placeholder:text-charcoal/40 focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                        {errors.name && (
                            <p className="text-xs text-red-500">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label
                            htmlFor="email"
                            className="text-sm font-medium text-charcoal"
                        >
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            {...register("email")}
                            className="rounded-md border border-border px-3 py-2.5 text-sm text-charcoal outline-none placeholder:text-charcoal/40 focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                        {errors.email && (
                            <p className="text-xs text-red-500">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label
                            htmlFor="password"
                            className="text-sm font-medium text-charcoal"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            autoComplete="new-password"
                            placeholder="••••••••"
                            {...register("password")}
                            className="rounded-md border border-border px-3 py-2.5 text-sm text-charcoal outline-none placeholder:text-charcoal/40 focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                        {errors.password && (
                            <p className="text-xs text-red-500">{errors.password.message}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label
                            htmlFor="confirmPassword"
                            className="text-sm font-medium text-charcoal"
                        >
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            placeholder="••••••••"
                            {...register("confirmPassword")}
                            className="rounded-md border border-border px-3 py-2.5 text-sm text-charcoal outline-none placeholder:text-charcoal/40 focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                        {errors.confirmPassword && (
                            <p className="text-xs text-red-500">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-md bg-primary py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isSubmitting ? "Creating account..." : "Create Account"}
                    </button>

                    <p className="text-center text-sm text-charcoal/60">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-medium text-primary hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Register;
import { useState } from "react";
import { useForm } from "../../../node_modules/react-hook-form/dist";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useAuth } from "../../context/AuthContext";

const profileSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

function Profile() {
    const { user, updateProfile } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user?.name ?? "",
            email: user?.email ?? "",
            phone: user?.phone ?? "",
        },
    });

    const onSubmit = async (data: ProfileFormData) => {
        setIsSubmitting(true);
        try {
            await updateProfile(data);
            toast.success("Profile updated successfully.");
        } catch {
            toast.error("Failed to update profile. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-charcoal">Profile</h1>
                <p className="mt-1 text-sm text-charcoal/60">
                    Manage your personal information.
                </p>
            </div>

            <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                        {user?.name?.charAt(0).toUpperCase() ?? "U"}
                    </div>
                    <div>
                        <p className="font-semibold text-charcoal">{user?.name}</p>
                        <p className="text-sm text-charcoal/50">{user?.email}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
                                {...register("name")}
                                className="rounded-md border border-border px-3 py-2.5 text-sm text-charcoal outline-none focus:border-primary focus:ring-1 focus:ring-primary"
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
                                {...register("email")}
                                className="rounded-md border border-border px-3 py-2.5 text-sm text-charcoal outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                            />
                            {errors.email && (
                                <p className="text-xs text-red-500">{errors.email.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label
                            htmlFor="phone"
                            className="text-sm font-medium text-charcoal"
                        >
                            Phone Number{" "}
                            <span className="text-charcoal/40">(optional)</span>
                        </label>
                        <input
                            id="phone"
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            {...register("phone")}
                            className="rounded-md border border-border px-3 py-2.5 text-sm text-charcoal outline-none placeholder:text-charcoal/40 focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                    </div>

                    <div className="flex justify-end border-t border-border pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Profile;
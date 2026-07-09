import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { HiLocationMarker, HiCalendar } from "react-icons/hi";
import type { BookingFormData } from "../../../types/booking";

const bookingSchema = z
    .object({
        pickupLocation: z
            .string()
            .min(2, "Please enter a pickup location"),
        returnLocation: z
            .string()
            .min(2, "Please enter a return location"),
        pickupDate: z.string().min(1, "Please select a pickup date"),
        returnDate: z.string().min(1, "Please select a return date"),
    })
    .refine((data) => new Date(data.returnDate) > new Date(data.pickupDate), {
        message: "Return date must be after pickup date",
        path: ["returnDate"],
    });

interface BookingFormProps {
    onSubmit: (data: BookingFormData) => void;
    isSubmitting: boolean;
}

function BookingForm({ onSubmit, isSubmitting }: BookingFormProps) {
    const today = new Date().toISOString().split("T")[0];

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<BookingFormData>({
        resolver: zodResolver(bookingSchema),
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="flex flex-col gap-1.5">
                <label
                    htmlFor="pickupLocation"
                    className="text-sm font-medium text-charcoal"
                >
                    Pickup Location
                </label>
                <div className="flex items-center gap-2 rounded-md border border-border px-3 py-2.5 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                    <HiLocationMarker className="shrink-0 text-primary" />
                    <input
                        id="pickupLocation"
                        type="text"
                        placeholder="City or Airport"
                        {...register("pickupLocation")}
                        className="w-full text-sm text-charcoal outline-none placeholder:text-charcoal/40"
                    />
                </div>
                {errors.pickupLocation && (
                    <p className="text-xs text-red-500">{errors.pickupLocation.message}</p>
                )}
            </div>

            <div className="flex flex-col gap-1.5">
                <label
                    htmlFor="returnLocation"
                    className="text-sm font-medium text-charcoal"
                >
                    Return Location
                </label>
                <div className="flex items-center gap-2 rounded-md border border-border px-3 py-2.5 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                    <HiLocationMarker className="shrink-0 text-primary" />
                    <input
                        id="returnLocation"
                        type="text"
                        placeholder="City or Airport"
                        {...register("returnLocation")}
                        className="w-full text-sm text-charcoal outline-none placeholder:text-charcoal/40"
                    />
                </div>
                {errors.returnLocation && (
                    <p className="text-xs text-red-500">{errors.returnLocation.message}</p>
                )}
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                    <label
                        htmlFor="pickupDate"
                        className="text-sm font-medium text-charcoal"
                    >
                        Pickup Date
                    </label>
                    <div className="flex items-center gap-2 rounded-md border border-border px-3 py-2.5 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                        <HiCalendar className="shrink-0 text-primary" />
                        <input
                            id="pickupDate"
                            type="date"
                            min={today}
                            {...register("pickupDate")}
                            className="w-full text-sm text-charcoal outline-none"
                        />
                    </div>
                    {errors.pickupDate && (
                        <p className="text-xs text-red-500">{errors.pickupDate.message}</p>
                    )}
                </div>

                <div className="flex flex-col gap-1.5">
                    <label
                        htmlFor="returnDate"
                        className="text-sm font-medium text-charcoal"
                    >
                        Return Date
                    </label>
                    <div className="flex items-center gap-2 rounded-md border border-border px-3 py-2.5 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                        <HiCalendar className="shrink-0 text-primary" />
                        <input
                            id="returnDate"
                            type="date"
                            min={today}
                            {...register("returnDate")}
                            className="w-full text-sm text-charcoal outline-none"
                        />
                    </div>
                    {errors.returnDate && (
                        <p className="text-xs text-red-500">{errors.returnDate.message}</p>
                    )}
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-primary py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isSubmitting ? "Processing..." : "Confirm Booking"}
            </button>
        </form>
    );
}

export default BookingForm;
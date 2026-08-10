import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { HiArrowLeft } from "react-icons/hi";
import { useVehicle } from "../../hooks/useVehicle";
import type { Booking, BookingFormData } from "../../types/booking";
import { createBookingRequest } from "../../services/bookingService";
import BookingForm from "./components/BookingForm";
import BookingSummary from "./components/BookingSummary";
import BookingConfirmation from "./components/BookingConfirmation";
import Modal from "../../components/Modal/Modal";
import LoadingSkeleton from "../../components/LoadingSkeleton/LoadingSkeleton";

function BookingPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { vehicle, isLoading } = useVehicle(id ?? "");

    const [formData, setFormData] = useState<Partial<BookingFormData>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (isLoading) {
        return (
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <LoadingSkeleton count={1} />
            </div>
        );
    }

    if (!vehicle) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
                <p className="text-lg font-semibold text-charcoal">
                    Vehicle not found.
                </p>
                <Link
                    to="/cars"
                    className="mt-4 text-sm font-medium text-primary hover:underline"
                >
                    Back to Listings
                </Link>
            </div>
        );
    }

    const handleSubmit = async (data: BookingFormData) => {
        setIsSubmitting(true);
        setFormData(data);

        try {
            const booking = await createBookingRequest({
                vehicleId: vehicle.id,
                pickupLocation: data.pickupLocation,
                returnLocation: data.returnLocation,
                pickupDate: data.pickupDate,
                returnDate: data.returnDate,
            });

            setConfirmedBooking(booking);
            setIsModalOpen(true);
            toast.success("Booking confirmed!");
        } catch (error: unknown) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Something went wrong. Please try again.";
            toast.error(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        navigate("/cars");
    };

    return (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <button
                type="button"
                onClick={() => navigate(-1)}
                className="mb-8 flex items-center gap-2 text-sm font-medium text-charcoal/60 hover:text-primary"
            >
                <HiArrowLeft />
                Back to Vehicle
            </button>

            <h1 className="text-2xl font-bold text-charcoal sm:text-3xl">
                Complete Your Booking
            </h1>
            <p className="mt-1 text-sm text-charcoal/60">
                Fill in your details to reserve the {vehicle.brand} {vehicle.name}.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
                        <h2 className="mb-5 text-lg font-semibold text-charcoal">
                            Rental Details
                        </h2>
                        <BookingForm
                            onSubmit={handleSubmit}
                            isSubmitting={isSubmitting}
                        />
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <BookingSummary
                        car={vehicle}
                        pickupDate={formData.pickupDate}
                        returnDate={formData.returnDate}
                        pickupLocation={formData.pickupLocation}
                        returnLocation={formData.returnLocation}
                    />
                </div>
            </div>

            {confirmedBooking && (
                <Modal
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                    title="Booking Confirmed"
                >
                    <BookingConfirmation
                        booking={confirmedBooking}
                        onClose={handleModalClose}
                    />
                </Modal>
            )}
        </div>
    );
}

export default BookingPage;
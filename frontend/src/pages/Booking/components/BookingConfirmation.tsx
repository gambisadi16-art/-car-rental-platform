import { useNavigate } from "react-router-dom";
import { HiCheckCircle } from "react-icons/hi";
import type { Booking } from "../../../types/booking";

interface BookingConfirmationProps {
    booking: Booking;
    onClose: () => void;
}

function BookingConfirmation({ booking, onClose }: BookingConfirmationProps) {
    const navigate = useNavigate();

    const handleViewBookings = () => {
        onClose();
        navigate("/dashboard");
    };

    return (
        <div className="flex flex-col items-center text-center">
            <HiCheckCircle className="text-5xl text-green-500" />
            <h3 className="mt-3 text-xl font-bold text-charcoal">
                Booking Confirmed!
            </h3>
            <p className="mt-1 text-sm text-charcoal/60">
                Your booking reference is{" "}
                <span className="font-semibold text-charcoal">#{booking.id}</span>
            </p>

            <div className="mt-5 w-full rounded-lg bg-surface p-4 text-left text-sm">
                <div className="flex justify-between py-1">
                    <span className="text-charcoal/60">Vehicle</span>
                    <span className="font-medium text-charcoal">
                        {booking.carBrand} {booking.carName}
                    </span>
                </div>
                <div className="flex justify-between py-1">
                    <span className="text-charcoal/60">Pickup</span>
                    <span className="font-medium text-charcoal">
                        {booking.pickupLocation}
                    </span>
                </div>
                <div className="flex justify-between py-1">
                    <span className="text-charcoal/60">Return</span>
                    <span className="font-medium text-charcoal">
                        {booking.returnLocation}
                    </span>
                </div>
                <div className="flex justify-between py-1">
                    <span className="text-charcoal/60">Duration</span>
                    <span className="font-medium text-charcoal">
                        {booking.totalDays} day{booking.totalDays !== 1 ? "s" : ""}
                    </span>
                </div>
                <div className="flex justify-between border-t border-border py-1 pt-2 font-semibold">
                    <span className="text-charcoal">Total Paid</span>
                    <span className="text-primary">${booking.totalPrice}</span>
                </div>
            </div>

            <div className="mt-6 flex w-full flex-col gap-3">
                <button
                    type="button"
                    onClick={handleViewBookings}
                    className="w-full rounded-md bg-primary py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                    View My Bookings
                </button>
                <button
                    type="button"
                    onClick={onClose}
                    className="w-full rounded-md border border-border py-2.5 text-sm font-medium text-charcoal/70 transition hover:bg-surface"
                >
                    Back to Listings
                </button>
            </div>
        </div>
    );
}

export default BookingConfirmation;
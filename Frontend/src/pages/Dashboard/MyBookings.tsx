import { useState } from "react";
import { toast } from "sonner";
import { useBookings } from "../../hooks/useBookings";
import { cancelBookingRequest } from "../../services/bookingService";
import BookingCard from "../../components/BookingCard/BookingCard";
import EmptyState from "../../components/EmptyState/EmptyState";
import LoadingSkeleton from "../../components/LoadingSkeleton/LoadingSkeleton";

type StatusFilter = "all" | "confirmed" | "cancelled" | "pending";

const filters: { label: string; value: StatusFilter }[] = [
    { label: "All", value: "all" },
    { label: "Confirmed", value: "confirmed" },
    { label: "Cancelled", value: "cancelled" },
];

function MyBookings() {
    const { bookings, isLoading, error, refetch } = useBookings();
    const [activeFilter, setActiveFilter] = useState<StatusFilter>("all");
    const [cancellingId, setCancellingId] = useState<string | null>(null);

    const filtered =
        activeFilter === "all"
            ? bookings
            : bookings.filter((b) => b.status === activeFilter);

    const handleCancel = async (id: string) => {
        setCancellingId(id);
        try {
            await cancelBookingRequest(id);
            toast.success("Booking cancelled successfully.");
            refetch();
        } catch {
            toast.error("Failed to cancel booking. Please try again.");
        } finally {
            setCancellingId(null);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-charcoal">My Bookings</h1>
                <p className="mt-1 text-sm text-charcoal/60">
                    View and manage all your rental bookings.
                </p>
            </div>

            <div className="flex gap-2">
                {filters.map((f) => (
                    <button
                        key={f.value}
                        type="button"
                        onClick={() => setActiveFilter(f.value)}
                        className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${activeFilter === f.value
                                ? "bg-primary text-white"
                                : "border border-border text-charcoal/60 hover:bg-surface"
                            }`}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {isLoading ? (
                <LoadingSkeleton count={3} />
            ) : error ? (
                <EmptyState
                    title="Something went wrong"
                    description={error}
                />
            ) : filtered.length === 0 ? (
                <EmptyState
                    title="No bookings found"
                    description="No bookings match the selected filter."
                />
            ) : (
                <div className="space-y-4">
                    {filtered.map((booking) => (
                        <BookingCard
                            key={booking.id}
                            booking={booking}
                            onCancel={handleCancel}
                            isCancelling={cancellingId === booking.id}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyBookings;
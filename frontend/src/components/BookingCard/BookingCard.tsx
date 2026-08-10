import { HiCalendar, HiLocationMarker, HiClock } from "react-icons/hi";
import type { Booking } from "../../types/booking";
import Badge from "../Badge/Badge";

interface BookingCardProps {
    booking: Booking;
    onCancel?: (id: string) => void;
    isCancelling?: boolean;
}

type BadgeVariant = "success" | "warning" | "default";

function getStatusVariant(status: string): BadgeVariant {
    if (status === "confirmed") return "success";
    if (status === "pending") return "warning";
    return "default";
}

function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

function BookingCard({ booking, onCancel, isCancelling }: BookingCardProps) {
    const statusLabel =
        booking.status.charAt(0).toUpperCase() + booking.status.slice(1);

    return (
        <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
            <div className="flex flex-col sm:flex-row">
                <div className="h-40 w-full shrink-0 overflow-hidden bg-surface sm:h-auto sm:w-40">
                    <img
                        src={booking.carImageUrl}
                        alt={`${booking.carBrand} ${booking.carName}`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                    />
                </div>

                <div className="flex flex-1 flex-col justify-between p-5">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <p className="text-xs text-charcoal/50">{booking.carBrand}</p>
                            <h3 className="font-semibold text-charcoal">
                                {booking.carName}
                            </h3>
                            <p className="mt-0.5 text-xs text-charcoal/50">
                                Ref: #{booking.id}
                            </p>
                        </div>
                        <Badge
                            label={statusLabel}
                            variant={getStatusVariant(booking.status)}
                        />
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
                        <div className="flex items-center gap-2 text-sm text-charcoal/60">
                            <HiCalendar className="shrink-0 text-primary" />
                            <span>
                                {formatDate(booking.pickupDate)} →{" "}
                                {formatDate(booking.returnDate)}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-charcoal/60">
                            <HiLocationMarker className="shrink-0 text-primary" />
                            <span className="truncate">{booking.pickupLocation}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-charcoal/60">
                            <HiClock className="shrink-0 text-primary" />
                            <span>
                                {booking.totalDays} day{booking.totalDays !== 1 ? "s" : ""}
                            </span>
                        </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                        <p className="text-sm font-semibold text-charcoal">
                            Total:{" "}
                            <span className="text-primary">${booking.totalPrice}</span>
                        </p>
                        {booking.status === "confirmed" && onCancel && (
                            <button
                                type="button"
                                onClick={() => onCancel(booking.id)}
                                disabled={isCancelling}
                                className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-medium text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isCancelling ? "Cancelling..." : "Cancel Booking"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookingCard;
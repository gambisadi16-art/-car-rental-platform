import { HiCalendar, HiLocationMarker, HiClock } from "react-icons/hi";
import type { Car } from "../../../types/car";

interface BookingSummaryProps {
    car: Car;
    pickupDate?: string;
    returnDate?: string;
    pickupLocation?: string;
    returnLocation?: string;
}

function calculateDays(pickup: string, returnD: string): number {
    if (!pickup || !returnD) return 0;
    const diff =
        new Date(returnD).getTime() - new Date(pickup).getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function formatDate(dateStr: string): string {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

function BookingSummary({
    car,
    pickupDate,
    returnDate,
    pickupLocation,
    returnLocation,
}: BookingSummaryProps) {
    const totalDays = calculateDays(pickupDate ?? "", returnDate ?? "");
    const totalPrice = totalDays * car.pricePerDay;

    return (
        <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-charcoal">Booking Summary</h2>

            <div className="mt-4 flex items-center gap-4 rounded-lg bg-surface p-4">
                <img
                    src={car.imageUrl}
                    alt={`${car.brand} ${car.name}`}
                    className="h-16 w-24 rounded-md object-cover"
                />
                <div>
                    <p className="text-xs text-charcoal/50">{car.brand}</p>
                    <p className="font-semibold text-charcoal">{car.name}</p>
                    <p className="text-sm text-charcoal/60">
                        ${car.pricePerDay}/day
                    </p>
                </div>
            </div>

            <div className="mt-5 space-y-3">
                <div className="flex items-start gap-3 text-sm">
                    <HiLocationMarker className="mt-0.5 shrink-0 text-primary" />
                    <div>
                        <p className="font-medium text-charcoal">Pickup</p>
                        <p className="text-charcoal/60">
                            {pickupLocation || "Not selected"}
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-3 text-sm">
                    <HiLocationMarker className="mt-0.5 shrink-0 text-charcoal/40" />
                    <div>
                        <p className="font-medium text-charcoal">Return</p>
                        <p className="text-charcoal/60">
                            {returnLocation || "Not selected"}
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-3 text-sm">
                    <HiCalendar className="mt-0.5 shrink-0 text-primary" />
                    <div>
                        <p className="font-medium text-charcoal">Pickup Date</p>
                        <p className="text-charcoal/60">{formatDate(pickupDate ?? "")}</p>
                    </div>
                </div>

                <div className="flex items-start gap-3 text-sm">
                    <HiCalendar className="mt-0.5 shrink-0 text-charcoal/40" />
                    <div>
                        <p className="font-medium text-charcoal">Return Date</p>
                        <p className="text-charcoal/60">{formatDate(returnDate ?? "")}</p>
                    </div>
                </div>

                {totalDays > 0 && (
                    <div className="flex items-start gap-3 text-sm">
                        <HiClock className="mt-0.5 shrink-0 text-primary" />
                        <div>
                            <p className="font-medium text-charcoal">Duration</p>
                            <p className="text-charcoal/60">
                                {totalDays} day{totalDays !== 1 ? "s" : ""}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
                <div className="flex justify-between text-charcoal/60">
                    <span>
                        ${car.pricePerDay} × {totalDays || 0} day
                        {totalDays !== 1 ? "s" : ""}
                    </span>
                    <span>${totalDays > 0 ? totalPrice : 0}</span>
                </div>
                <div className="flex justify-between font-semibold text-charcoal">
                    <span>Total</span>
                    <span className="text-lg text-primary">
                        ${totalDays > 0 ? totalPrice : 0}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default BookingSummary;
import { Link } from "react-router-dom";
import {
    HiCollection,
    HiCheckCircle,
    HiCurrencyDollar,
    HiArrowRight,
} from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";
import { useBookings } from "../../hooks/useBookings";
import BookingCard from "../../components/BookingCard/BookingCard";
import LoadingSkeleton from "../../components/LoadingSkeleton/LoadingSkeleton";

function DashboardHome() {
    const { user } = useAuth();
    const { bookings, isLoading } = useBookings();

    const confirmed = bookings.filter((b) => b.status === "confirmed");
    const totalSpent = bookings
        .filter((b) => b.status !== "cancelled")
        .reduce((sum, b) => sum + b.totalPrice, 0);

    const stats = [
        {
            icon: HiCollection,
            label: "Total Bookings",
            value: bookings.length,
        },
        {
            icon: HiCheckCircle,
            label: "Confirmed",
            value: confirmed.length,
        },
        {
            icon: HiCurrencyDollar,
            label: "Total Spent",
            value: `$${totalSpent}`,
        },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-charcoal">
                    Welcome back, {user?.name?.split(" ")[0]}
                </h1>
                <p className="mt-1 text-sm text-charcoal/60">
                    Here's an overview of your rental activity.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="rounded-xl border border-border bg-white p-5 shadow-sm"
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-lg text-primary">
                                <stat.icon />
                            </div>
                            <div>
                                <p className="text-xs text-charcoal/50">{stat.label}</p>
                                <p className="text-xl font-bold text-charcoal">{stat.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div>
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="font-semibold text-charcoal">Recent Booking</h2>
                    <Link
                        to="/dashboard/bookings"
                        className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                    >
                        View all <HiArrowRight />
                    </Link>
                </div>

                {isLoading ? (
                    <LoadingSkeleton count={1} />
                ) : bookings.length > 0 ? (
                    <BookingCard booking={bookings[0]} />
                ) : (
                    <div className="rounded-xl border border-border bg-white p-8 text-center text-sm text-charcoal/50">
                        No bookings yet.{" "}
                        <Link to="/cars" className="text-primary hover:underline">
                            Browse our fleet
                        </Link>{" "}
                        to get started.
                    </div>
                )}
            </div>

            <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
                <h2 className="font-semibold text-charcoal">Quick Actions</h2>
                <div className="mt-4 flex flex-wrap gap-3">
                    <Link
                        to="/cars"
                        className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    >
                        Browse Cars
                    </Link>
                    <Link
                        to="/dashboard/bookings"
                        className="rounded-md border border-border px-4 py-2 text-sm font-medium text-charcoal/70 transition hover:bg-surface"
                    >
                        My Bookings
                    </Link>
                    <Link
                        to="/dashboard/profile"
                        className="rounded-md border border-border px-4 py-2 text-sm font-medium text-charcoal/70 transition hover:bg-surface"
                    >
                        Edit Profile
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default DashboardHome;
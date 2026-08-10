import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
    HiViewGrid,
    HiCollection,
    HiUser,
    HiLogout,
} from "react-icons/hi";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

const navItems = [
    { to: "/dashboard", label: "Overview", icon: HiViewGrid, end: true },
    { to: "/dashboard/bookings", label: "My Bookings", icon: HiCollection, end: false },
    { to: "/dashboard/profile", label: "Profile", icon: HiUser, end: false },
];

function DashboardLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        toast.success("You have been logged out.");
        navigate("/");
    };

    return (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row">
                <aside className="w-full lg:w-64 lg:shrink-0">
                    <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
                        <div className="flex items-center gap-3 border-b border-border pb-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                                {user?.name?.charAt(0).toUpperCase() ?? "U"}
                            </div>
                            <div className="overflow-hidden">
                                <p className="truncate text-sm font-semibold text-charcoal">
                                    {user?.name}
                                </p>
                                <p className="truncate text-xs text-charcoal/50">
                                    {user?.email}
                                </p>
                            </div>
                        </div>

                        <nav className="mt-4 space-y-1">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    end={item.end}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition ${isActive
                                            ? "bg-primary/10 text-primary"
                                            : "text-charcoal/70 hover:bg-surface hover:text-charcoal"
                                        }`
                                    }
                                >
                                    <item.icon className="text-lg" />
                                    {item.label}
                                </NavLink>
                            ))}
                        </nav>

                        <div className="mt-4 border-t border-border pt-4">
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-charcoal/70 transition hover:bg-red-50 hover:text-red-500"
                            >
                                <HiLogout className="text-lg" />
                                Log Out
                            </button>
                        </div>
                    </div>
                </aside>

                <main className="flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default DashboardLayout;
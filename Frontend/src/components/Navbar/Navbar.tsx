import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX, HiChevronDown } from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";

const navLinks = [
    { label: "Home", to: "/" },
    { label: "Cars", to: "/cars" },
];

function Navbar() {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        toast.success("You have been logged out.");
        navigate("/");
        setIsDropdownOpen(false);
        setIsOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-white">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link
                    to="/"
                    className="text-xl font-bold tracking-tight text-charcoal"
                >
                    Drive<span className="text-primary">Lux</span>
                </Link>

                <nav className="hidden md:flex md:items-center md:gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className="text-sm font-medium text-charcoal/80 transition-colors hover:text-primary"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="hidden md:flex md:items-center md:gap-4">
                    {isAuthenticated && user ? (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                type="button"
                                onClick={() => setIsDropdownOpen((prev) => !prev)}
                                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-charcoal/80 transition hover:bg-surface"
                            >
                                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <span>{user.name.split(" ")[0]}</span>
                                <HiChevronDown
                                    className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                                />
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-1 w-48 rounded-xl border border-border bg-white py-1 shadow-lg">
                                    <Link
                                        to="/dashboard"
                                        onClick={() => setIsDropdownOpen(false)}
                                        className="block px-4 py-2 text-sm text-charcoal/70 hover:bg-surface hover:text-charcoal"
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        to="/dashboard/bookings"
                                        onClick={() => setIsDropdownOpen(false)}
                                        className="block px-4 py-2 text-sm text-charcoal/70 hover:bg-surface hover:text-charcoal"
                                    >
                                        My Bookings
                                    </Link>
                                    <Link
                                        to="/dashboard/profile"
                                        onClick={() => setIsDropdownOpen(false)}
                                        className="block px-4 py-2 text-sm text-charcoal/70 hover:bg-surface hover:text-charcoal"
                                    >
                                        Profile
                                    </Link>
                                    <div className="my-1 border-t border-border" />
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="block w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-red-50"
                                    >
                                        Log Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-sm font-medium text-charcoal/80 transition-colors hover:text-primary"
                            >
                                Log In
                            </Link>
                            <Link
                                to="/register"
                                className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>

                <button
                    type="button"
                    aria-label="Toggle navigation menu"
                    className="text-2xl text-charcoal md:hidden"
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    {isOpen ? <HiX /> : <HiMenu />}
                </button>
            </div>

            {isOpen && (
                <nav className="flex flex-col gap-1 border-t border-border bg-white px-4 py-4 md:hidden">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => setIsOpen(false)}
                            className="rounded-md px-3 py-2 text-sm font-medium text-charcoal/80 hover:bg-surface hover:text-primary"
                        >
                            {link.label}
                        </Link>
                    ))}

                    <div className="mt-2 flex flex-col gap-2 border-t border-border pt-3">
                        {isAuthenticated && user ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-md px-3 py-2 text-sm font-medium text-charcoal/80 hover:bg-surface hover:text-primary"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    to="/dashboard/bookings"
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-md px-3 py-2 text-sm font-medium text-charcoal/80 hover:bg-surface hover:text-primary"
                                >
                                    My Bookings
                                </Link>
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="rounded-md px-3 py-2 text-left text-sm font-medium text-red-500 hover:bg-red-50"
                                >
                                    Log Out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-md px-3 py-2 text-sm font-medium text-charcoal/80 hover:bg-surface hover:text-primary"
                                >
                                    Log In
                                </Link>
                                <Link
                                    to="/register"
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-md bg-primary px-3 py-2 text-center text-sm font-semibold text-white hover:opacity-90"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </nav>
            )}
        </header>
    );
}

export default Navbar;
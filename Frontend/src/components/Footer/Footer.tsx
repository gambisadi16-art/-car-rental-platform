import { Link } from "react-router-dom";

function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-border bg-surface">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
                    <div>
                        <span className="text-lg font-bold tracking-tight text-charcoal">
                            Drive<span className="text-primary">Lux</span>
                        </span>
                        <p className="mt-3 text-sm text-charcoal/60">
                            Premium car rentals made simple, fast, and reliable.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-charcoal">Company</h3>
                        <ul className="mt-3 space-y-2 text-sm text-charcoal/60">
                            <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
                            <li><Link to="/cars" className="hover:text-primary">Our Fleet</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-charcoal">Support</h3>
                        <ul className="mt-3 space-y-2 text-sm text-charcoal/60">
                            <li><Link to="/" className="hover:text-primary">Help Center</Link></li>
                            <li><Link to="/" className="hover:text-primary">Terms of Service</Link></li>
                            <li><Link to="/" className="hover:text-primary">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-charcoal">Account</h3>
                        <ul className="mt-3 space-y-2 text-sm text-charcoal/60">
                            <li><Link to="/login" className="hover:text-primary">Log In</Link></li>
                            <li><Link to="/register" className="hover:text-primary">Sign Up</Link></li>
                            <li><Link to="/dashboard" className="hover:text-primary">Dashboard</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-10 border-t border-border pt-6 text-center text-sm text-charcoal/50">
                    © {year} DriveLux. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer;
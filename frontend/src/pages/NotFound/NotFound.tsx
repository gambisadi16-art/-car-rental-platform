import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                404 Error
            </p>
            <h1 className="mt-2 text-4xl font-bold text-charcoal sm:text-5xl">
                Page not found
            </h1>
            <p className="mt-4 max-w-md text-charcoal/60">
                The page you're looking for doesn't exist or may have been moved.
            </p>
            <Link
                to="/"
                className="mt-8 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
                Back to Home
            </Link>
        </div>
    );
}

export default NotFound;
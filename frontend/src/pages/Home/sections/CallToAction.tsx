import { Link } from "react-router-dom";

function CallToAction() {
    return (
        <section className="bg-charcoal">
            <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-white sm:text-4xl">
                    Ready to Hit the Road?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-white/70">
                    Browse our full fleet and book your next rental in just a few clicks.
                </p>
                <Link
                    to="/cars"
                    className="mt-8 inline-block rounded-md bg-primary px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                    Browse Our Fleet
                </Link>
            </div>
        </section>
    );
}

export default CallToAction;
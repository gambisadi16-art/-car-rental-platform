import SearchWidget from "../../../components/SearchWidget/SearchWidget";

function Hero() {
    return (
        <section className="relative overflow-hidden bg-charcoal">
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=80"
                    alt="Premium car on the road"
                    className="h-full w-full object-cover opacity-40"
                />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-6 sm:pt-36 lg:px-8">
                <div className="max-w-2xl">
                    <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                        Premium Car Rentals
                    </p>
                    <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                        Drive Your Way, <br className="hidden sm:block" />
                        Every Journey
                    </h1>
                    <p className="mt-5 max-w-lg text-lg text-white/70">
                        Choose from a wide range of premium vehicles with transparent
                        pricing, flexible bookings, and zero hidden fees.
                    </p>
                </div>

                <div className="mt-10">
                    <SearchWidget />
                </div>
            </div>
        </section>
    );
}

export default Hero;
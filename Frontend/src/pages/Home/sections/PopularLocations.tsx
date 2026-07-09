import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { mockLocations } from "../../../constants/mockLocations";

function PopularLocations() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <SectionTitle
                eyebrow="Where to Next"
                title="Popular Locations"
                description="Pick up your vehicle in one of our most requested cities."
            />

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {mockLocations.map((location) => (
                    <div
                        key={location.id}
                        className="group relative aspect-[4/5] overflow-hidden rounded-xl"
                    >
                        <img
                            src={location.imageUrl}
                            alt={location.city}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-5 text-white">
                            <h3 className="text-lg font-semibold">{location.city}</h3>
                            <p className="text-sm text-white/70">{location.carCount} cars available</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default PopularLocations;
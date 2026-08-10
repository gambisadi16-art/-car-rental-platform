import { HiStar, HiUsers, HiCog } from "react-icons/hi";
import type { Car } from "../../types/car";

interface CarCardProps {
    car: Car;
}

function CarCard({ car }: CarCardProps) {
    return (
        <div className="group overflow-hidden rounded-xl border border-border bg-white transition-shadow hover:shadow-lg">
            <div className="aspect-[4/3] overflow-hidden bg-surface">
                <img
                    src={car.imageUrl}
                    alt={`${car.brand} ${car.name}`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                />
            </div>

            <div className="p-5">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-charcoal/50">
                            {car.brand}
                        </p>
                        <h3 className="text-lg font-semibold text-charcoal">{car.name}</h3>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-medium text-charcoal">
                        <HiStar className="text-amber-500" />
                        {car.rating}
                    </div>
                </div>

                <div className="mt-4 flex items-center gap-4 text-sm text-charcoal/60">
                    <span className="flex items-center gap-1">
                        <HiUsers className="text-base" />
                        {car.seats} Seats
                    </span>
                    <span className="flex items-center gap-1">
                        <HiCog className="text-base" />
                        {car.transmission}
                    </span>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                    <p className="text-lg font-bold text-charcoal">
                        ${car.pricePerDay}
                        <span className="text-sm font-normal text-charcoal/50">/day</span>
                    </p>
                    <button
                        type="button"
                        className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    >
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CarCard;
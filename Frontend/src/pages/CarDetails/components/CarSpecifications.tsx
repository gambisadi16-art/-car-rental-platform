import { HiUsers, HiCog, HiFire, HiCalendar } from "react-icons/hi";
import type { Car } from "../../../types/car";

interface CarSpecificationsProps {
    car: Car;
}

const specs = (car: Car) => [
    { icon: HiUsers, label: "Seats", value: `${car.seats} Passengers` },
    { icon: HiCog, label: "Transmission", value: car.transmission },
    { icon: HiFire, label: "Fuel Type", value: car.fuelType },
    { icon: HiCalendar, label: "Year", value: car.year.toString() },
];

function CarSpecifications({ car }: CarSpecificationsProps) {
    return (
        <div>
            <h3 className="text-lg font-semibold text-charcoal">Specifications</h3>
            <div className="mt-4 grid grid-cols-2 gap-4">
                {specs(car).map((spec) => (
                    <div
                        key={spec.label}
                        className="flex items-center gap-3 rounded-lg border border-border bg-surface p-4"
                    >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg text-primary">
                            <spec.icon />
                        </div>
                        <div>
                            <p className="text-xs text-charcoal/50">{spec.label}</p>
                            <p className="text-sm font-semibold text-charcoal">{spec.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6">
                <h3 className="text-lg font-semibold text-charcoal">Features</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                    {car.features.map((feature) => (
                        <span
                            key={feature}
                            className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-charcoal/70"
                        >
                            {feature}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CarSpecifications;
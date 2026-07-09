import { useParams, useNavigate, Link } from "react-router-dom";
import { useVehicle } from "../../hooks/useVehicle";
import Badge from "../../components/Badge/Badge";
import CarSpecifications from "./components/CarSpecifications";
import LoadingSkeleton from "../../components/LoadingSkeleton/LoadingSkeleton";
import { HiArrowLeft, HiStar } from "react-icons/hi";
import { useNavigate as useNav } from "react-router-dom";
import CarCard from "../../components/CarCard/CarCard";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

function CarDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { vehicle, related, isLoading, error } = useVehicle(id ?? "");

    if (isLoading) {
        return (
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <LoadingSkeleton count={1} />
            </div>
        );
    }

    if (error || !vehicle) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
                <p className="text-lg font-semibold text-charcoal">
                    Vehicle not found.
                </p>
                <Link
                    to="/cars"
                    className="mt-4 text-sm font-medium text-primary hover:underline"
                >
                    Back to Listings
                </Link>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <button
                type="button"
                onClick={() => navigate(-1)}
                className="mb-8 flex items-center gap-2 text-sm font-medium text-charcoal/60 hover:text-primary"
            >
                <HiArrowLeft />
                Back to Listings
            </button>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                <div className="overflow-hidden rounded-xl border border-border bg-surface">
                    <img
                        src={vehicle.imageUrl}
                        alt={`${vehicle.brand} ${vehicle.name}`}
                        className="h-full w-full object-cover"
                    />
                </div>

                <div className="flex flex-col justify-between">
                    <div>
                        <div className="flex flex-wrap items-center gap-2">
                            <Badge label={vehicle.category} variant="primary" />
                            <Badge label={vehicle.fuelType} />
                            <Badge label={`${vehicle.year}`} />
                        </div>

                        <h1 className="mt-4 text-3xl font-bold text-charcoal sm:text-4xl">
                            {vehicle.brand} {vehicle.name}
                        </h1>

                        <div className="mt-2 flex items-center gap-2">
                            <HiStar className="text-amber-500" />
                            <span className="text-sm font-semibold text-charcoal">
                                {vehicle.rating}
                            </span>
                            <span className="text-sm text-charcoal/50">/ 5.0</span>
                        </div>

                        <p className="mt-4 text-charcoal/70">{vehicle.description}</p>
                    </div>

                    <div className="mt-8 rounded-xl border border-border bg-surface p-5">
                        <div className="flex items-end justify-between">
                            <div>
                                <p className="text-sm text-charcoal/50">Daily Rate</p>
                                <p className="text-4xl font-bold text-charcoal">
                                    ${vehicle.pricePerDay}
                                    <span className="text-lg font-normal text-charcoal/50">
                                        /day
                                    </span>
                                </p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => navigate(`/cars/${vehicle.id}/book`)}
                            className="mt-4 w-full rounded-md bg-primary py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                        >
                            Book Now
                        </button>
                        <p className="mt-2 text-center text-xs text-charcoal/50">
                            Free cancellation · No hidden fees
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-12">
                <CarSpecifications car={vehicle} />
            </div>

            {related.length > 0 && (
                <div className="mt-16">
                    <SectionTitle
                        align="left"
                        eyebrow="More Vehicles"
                        title="You Might Also Like"
                    />
                    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {related.map((car) => (
                            <div
                                key={car.id}
                                onClick={() => navigate(`/cars/${car.id}`)}
                                className="cursor-pointer"
                            >
                                <CarCard car={car} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default CarDetails;
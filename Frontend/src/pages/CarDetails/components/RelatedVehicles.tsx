import { useNavigate } from "react-router-dom";
import { mockCars } from "../../../constants/mockCars";
import type { Car } from "../../../types/car";
import CarCard from "../../../components/CarCard/CarCard";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

interface RelatedVehiclesProps {
    currentCarId: string;
    category: Car["category"];
}

function RelatedVehicles({ currentCarId, category }: RelatedVehiclesProps) {
    const navigate = useNavigate();

    const related = mockCars
        .filter((car) => car.id !== currentCarId && car.category === category)
        .slice(0, 3);

    if (related.length === 0) return null;

    return (
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
    );
}

export default RelatedVehicles;
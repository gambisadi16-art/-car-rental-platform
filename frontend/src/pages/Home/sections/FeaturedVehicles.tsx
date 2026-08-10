import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import CarCard from "../../../components/CarCard/CarCard";
import { mockCars } from "../../../constants/mockCars";

function FeaturedVehicles() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <SectionTitle
                eyebrow="Our Fleet"
                title="Featured Vehicles"
                description="A curated selection of our most popular vehicles, ready for your next trip."
            />

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {mockCars.map((car) => (
                    <CarCard key={car.id} car={car} />
                ))}
            </div>
        </section>
    );
}

export default FeaturedVehicles;
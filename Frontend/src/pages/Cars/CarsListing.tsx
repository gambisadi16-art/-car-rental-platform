import { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { Car } from "../../types/car";
import { useVehicles } from "../../hooks/useVehicles";
import CarCard from "../../components/CarCard/CarCard";
import LoadingSkeleton from "../../components/LoadingSkeleton/LoadingSkeleton";
import EmptyState from "../../components/EmptyState/EmptyState";
import Pagination from "../../components/Pagination/Pagination";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import SearchBar from "./components/SearchBar";
import SortDropdown from "./components/SortDropdown";
import FilterSidebar from "./components/FilterSidebar";
import type { Filters } from "./components/FilterSidebar";

const defaultFilters: Filters = {
    categories: [],
    transmissions: [],
    maxPrice: 800,
    location: "",
};

function CarsListing() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get("search") ?? "");
    const [sort, setSort] = useState("recommended");
    const [filters, setFilters] = useState<Filters>({
        ...defaultFilters,
        location: searchParams.get("location") ?? "",
    });
    const [currentPage, setCurrentPage] = useState(1);

    const apiFilters = useMemo(() => ({
        search: search || undefined,
        category: filters.categories.length === 1 ? filters.categories[0] : undefined,
        transmission: filters.transmissions.length === 1 ? filters.transmissions[0] : undefined,
        location: filters.location || undefined,
        maxPrice: filters.maxPrice < 800 ? filters.maxPrice : undefined,
        sort,
        page: currentPage,
        limit: 6,
    }), [search, filters, sort, currentPage]);

    const { data, isLoading, error } = useVehicles(apiFilters);

    const handleFilterChange = (newFilters: Filters) => {
        setFilters(newFilters);
        setCurrentPage(1);
    };

    const handleSearch = (value: string) => {
        setSearch(value);
        setCurrentPage(1);
    };

    const handleReset = () => {
        setFilters(defaultFilters);
        setSearch("");
        setSort("recommended");
        setCurrentPage(1);
    };

    const handleCarClick = (car: Car) => {
        navigate(`/cars/${car.id}`);
    };

    return (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <SectionTitle
                align="left"
                eyebrow="Our Fleet"
                title="Browse Vehicles"
                description="Find the perfect vehicle for your journey."
            />

            <div className="mt-8 flex flex-col gap-8 lg:flex-row">
                <FilterSidebar
                    filters={filters}
                    onChange={handleFilterChange}
                    onReset={handleReset}
                />

                <div className="flex-1">
                    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex-1 sm:max-w-sm">
                            <SearchBar value={search} onChange={handleSearch} />
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-charcoal/50">
                                {data?.total ?? 0} vehicle{data?.total !== 1 ? "s" : ""}
                            </span>
                            <SortDropdown value={sort} onChange={setSort} />
                        </div>
                    </div>

                    {isLoading ? (
                        <LoadingSkeleton count={6} />
                    ) : error ? (
                        <EmptyState
                            title="Something went wrong"
                            description={error}
                            onReset={handleReset}
                        />
                    ) : !data || data.vehicles.length === 0 ? (
                        <EmptyState onReset={handleReset} />
                    ) : (
                        <>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                                {data.vehicles.map((car) => (
                                    <div
                                        key={car.id}
                                        onClick={() => handleCarClick(car)}
                                        className="cursor-pointer"
                                    >
                                        <CarCard car={car} />
                                    </div>
                                ))}
                            </div>

                            {data.totalPages > 1 && (
                                <div className="mt-10">
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={data.totalPages}
                                        onPageChange={setCurrentPage}
                                    />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CarsListing;
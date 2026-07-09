import { LOCATIONS } from "../../../constants/locations";
import type { Car } from "../../../types/car";

export interface Filters {
    categories: Car["category"][];
    transmissions: Car["transmission"][];
    maxPrice: number;
    location: string;
}

interface FilterSidebarProps {
    filters: Filters;
    onChange: (filters: Filters) => void;
    onReset: () => void;
}

const categories: Car["category"][] = [
    "Economy", "Sedan", "SUV", "Luxury", "Convertible",
];

const transmissions: Car["transmission"][] = ["Automatic", "Manual"];

function FilterSidebar({ filters, onChange, onReset }: FilterSidebarProps) {
    const toggleCategory = (cat: Car["category"]) => {
        const updated = filters.categories.includes(cat)
            ? filters.categories.filter((c) => c !== cat)
            : [...filters.categories, cat];
        onChange({ ...filters, categories: updated });
    };

    const toggleTransmission = (t: Car["transmission"]) => {
        const updated = filters.transmissions.includes(t)
            ? filters.transmissions.filter((tr) => tr !== t)
            : [...filters.transmissions, t];
        onChange({ ...filters, transmissions: updated });
    };

    const hasActiveFilters =
        filters.categories.length > 0 ||
        filters.transmissions.length > 0 ||
        filters.maxPrice < 800 ||
        filters.location !== "";

    return (
        <aside className="w-full rounded-xl border border-border bg-white p-5 lg:w-64 lg:shrink-0">
            <div className="flex items-center justify-between">
                <h2 className="font-semibold text-charcoal">Filters</h2>
                {hasActiveFilters && (
                    <button
                        type="button"
                        onClick={onReset}
                        className="text-xs font-medium text-primary hover:underline"
                    >
                        Reset
                    </button>
                )}
            </div>

            <div className="mt-5 space-y-5">
                <div>
                    <h3 className="mb-3 text-sm font-semibold text-charcoal">Location</h3>
                    <select
                        value={filters.location}
                        onChange={(e) => onChange({ ...filters, location: e.target.value })}
                        className="w-full rounded-md border border-border px-3 py-2.5 text-sm text-charcoal outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    >
                        <option value="">All Locations</option>
                        {LOCATIONS.map((loc) => (
                            <option key={loc} value={loc}>{loc}</option>
                        ))}
                    </select>
                </div>

                <div className="border-t border-border pt-5">
                    <h3 className="mb-3 text-sm font-semibold text-charcoal">Category</h3>
                    <div className="space-y-2">
                        {categories.map((cat) => (
                            <label
                                key={cat}
                                className="flex cursor-pointer items-center gap-2 text-sm text-charcoal/70"
                            >
                                <input
                                    type="checkbox"
                                    checked={filters.categories.includes(cat)}
                                    onChange={() => toggleCategory(cat)}
                                    className="accent-primary"
                                />
                                {cat}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="border-t border-border pt-5">
                    <h3 className="mb-3 text-sm font-semibold text-charcoal">Transmission</h3>
                    <div className="space-y-2">
                        {transmissions.map((t) => (
                            <label
                                key={t}
                                className="flex cursor-pointer items-center gap-2 text-sm text-charcoal/70"
                            >
                                <input
                                    type="checkbox"
                                    checked={filters.transmissions.includes(t)}
                                    onChange={() => toggleTransmission(t)}
                                    className="accent-primary"
                                />
                                {t}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="border-t border-border pt-5">
                    <h3 className="mb-3 text-sm font-semibold text-charcoal">
                        Max Price:{" "}
                        <span className="font-bold text-primary">${filters.maxPrice}/day</span>
                    </h3>
                    <input
                        type="range"
                        min={38}
                        max={800}
                        step={10}
                        value={filters.maxPrice}
                        onChange={(e) =>
                            onChange({ ...filters, maxPrice: Number(e.target.value) })
                        }
                        className="w-full accent-primary"
                    />
                    <div className="mt-1 flex justify-between text-xs text-charcoal/50">
                        <span>$38</span>
                        <span>$800</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default FilterSidebar;
interface SortDropdownProps {
    value: string;
    onChange: (value: string) => void;
}

const sortOptions = [
    { value: "recommended", label: "Recommended" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "rating-desc", label: "Highest Rated" },
];

function SortDropdown({ value, onChange }: SortDropdownProps) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="rounded-md border border-border bg-white px-3 py-2.5 text-sm text-charcoal outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            aria-label="Sort vehicles"
        >
            {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}

export default SortDropdown;
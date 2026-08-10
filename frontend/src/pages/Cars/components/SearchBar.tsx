import { HiSearch, HiX } from "react-icons/hi";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

function SearchBar({ value, onChange }: SearchBarProps) {
    return (
        <div className="relative">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40" />
            <input
                type="text"
                placeholder="Search by brand or model..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-md border border-border py-2.5 pl-9 pr-9 text-sm text-charcoal outline-none placeholder:text-charcoal/40 focus:border-primary focus:ring-1 focus:ring-primary"
            />
            {value && (
                <button
                    type="button"
                    onClick={() => onChange("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-charcoal"
                    aria-label="Clear search"
                >
                    <HiX />
                </button>
            )}
        </div>
    );
}

export default SearchBar;
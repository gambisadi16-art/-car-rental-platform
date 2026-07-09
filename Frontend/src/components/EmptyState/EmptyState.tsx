import { HiSearch } from "react-icons/hi";

interface EmptyStateProps {
    title?: string;
    description?: string;
    onReset?: () => void;
}

function EmptyState({
    title = "No vehicles found",
    description = "Try adjusting your search or filter criteria.",
    onReset,
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface text-3xl text-charcoal/30">
                <HiSearch />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-charcoal">{title}</h3>
            <p className="mt-2 text-sm text-charcoal/60">{description}</p>
            {onReset && (
                <button
                    type="button"
                    onClick={onReset}
                    className="mt-6 rounded-md bg-primary px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                    Clear Filters
                </button>
            )}
        </div>
    );
}

export default EmptyState;
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex items-center justify-center gap-1">
            <button
                type="button"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-charcoal/60 transition hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Previous page"
            >
                <HiChevronLeft />
            </button>

            {pages.map((page) => (
                <button
                    key={page}
                    type="button"
                    onClick={() => onPageChange(page)}
                    className={`flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition ${page === currentPage
                            ? "bg-primary text-white"
                            : "border border-border text-charcoal/70 hover:bg-surface"
                        }`}
                    aria-label={`Page ${page}`}
                    aria-current={page === currentPage ? "page" : undefined}
                >
                    {page}
                </button>
            ))}

            <button
                type="button"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-charcoal/60 transition hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Next page"
            >
                <HiChevronRight />
            </button>
        </div>
    );
}

export default Pagination;
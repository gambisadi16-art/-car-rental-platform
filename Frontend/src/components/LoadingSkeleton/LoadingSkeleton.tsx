interface LoadingSkeletonProps {
    count?: number;
}

function SkeletonCard() {
    return (
        <div className="overflow-hidden rounded-xl border border-border bg-white">
            <div className="aspect-[4/3] animate-pulse bg-surface" />
            <div className="p-5 space-y-3">
                <div className="h-3 w-1/3 animate-pulse rounded bg-surface" />
                <div className="h-5 w-2/3 animate-pulse rounded bg-surface" />
                <div className="flex gap-3 pt-1">
                    <div className="h-4 w-16 animate-pulse rounded bg-surface" />
                    <div className="h-4 w-20 animate-pulse rounded bg-surface" />
                </div>
                <div className="flex items-center justify-between border-t border-border pt-4">
                    <div className="h-6 w-20 animate-pulse rounded bg-surface" />
                    <div className="h-8 w-24 animate-pulse rounded-md bg-surface" />
                </div>
            </div>
        </div>
    );
}

function LoadingSkeleton({ count = 8 }: LoadingSkeletonProps) {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: count }).map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    );
}

export default LoadingSkeleton;
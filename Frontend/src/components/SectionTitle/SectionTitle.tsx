interface SectionTitleProps {
    eyebrow?: string;
    title: string;
    description?: string;
    align?: "left" | "center";
}

function SectionTitle({
    eyebrow,
    title,
    description,
    align = "center",
}: SectionTitleProps) {
    const alignment = align === "center" ? "text-center items-center" : "text-left items-start";

    return (
        <div className={`flex flex-col ${alignment} gap-3`}>
            {eyebrow && (
                <span className="text-sm font-semibold uppercase tracking-wide text-primary">
                    {eyebrow}
                </span>
            )}
            <h2 className="text-3xl font-bold text-charcoal sm:text-4xl">{title}</h2>
            {description && (
                <p className="max-w-2xl text-charcoal/60">{description}</p>
            )}
        </div>
    );
}

export default SectionTitle;
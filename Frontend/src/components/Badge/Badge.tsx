interface BadgeProps {
    label: string;
    variant?: "default" | "primary" | "success" | "warning";
}

const variantStyles: Record<string, string> = {
    default: "bg-surface text-charcoal/70",
    primary: "bg-primary/10 text-primary",
    success: "bg-green-100 text-green-700",
    warning: "bg-amber-100 text-amber-700",
};

function Badge({ label, variant = "default" }: BadgeProps) {
    return (
        <span
      className= {`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${variantStyles[variant]}`
}
    >
    { label }
    </span>
  );
}

export default Badge;
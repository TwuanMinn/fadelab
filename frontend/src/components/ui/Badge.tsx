"use client";

import { forwardRef, HTMLAttributes } from "react";
import { clsx } from "clsx";

type BadgeVariant =
    | "default"
    | "primary"
    | "success"
    | "warning"
    | "danger"
    | "info";
type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
    size?: BadgeSize;
    dot?: boolean;
    pulse?: boolean;
    icon?: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
    default: "bg-white/10 text-white border-white/20",
    primary: "bg-primary/20 text-primary border-primary/30",
    success: "bg-green-500/20 text-green-400 border-green-500/30",
    warning: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    danger: "bg-red-500/20 text-red-400 border-red-500/30",
    info: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

const dotStyles: Record<BadgeVariant, string> = {
    default: "bg-white",
    primary: "bg-primary",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    danger: "bg-red-500",
    info: "bg-blue-500",
};

const sizeStyles: Record<BadgeSize, string> = {
    sm: "px-2 py-0.5 text-[10px] gap-1",
    md: "px-2.5 py-1 text-xs gap-1.5",
    lg: "px-3 py-1.5 text-sm gap-2",
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
    {
        variant = "default",
        size = "md",
        dot = false,
        pulse = false,
        icon,
        className,
        children,
        ...props
    },
    ref
) {
    return (
        <span
            ref={ref}
            className={clsx(
                "inline-flex items-center font-bold uppercase tracking-wide rounded-full border backdrop-blur-md",
                variantStyles[variant],
                sizeStyles[size],
                className
            )}
            {...props}
        >
            {dot && (
                <span className="relative flex h-2 w-2">
                    {pulse && (
                        <span
                            className={clsx(
                                "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                                dotStyles[variant]
                            )}
                        />
                    )}
                    <span
                        className={clsx(
                            "relative inline-flex rounded-full h-2 w-2",
                            dotStyles[variant]
                        )}
                    />
                </span>
            )}
            {icon && <span className="flex-shrink-0">{icon}</span>}
            {children}
        </span>
    );
});

// Status Badge - convenience component for common status indicators
interface StatusBadgeProps extends Omit<BadgeProps, "variant" | "dot" | "pulse"> {
    status: "available" | "busy" | "booked" | "offline";
}

const statusConfig: Record<
    StatusBadgeProps["status"],
    { variant: BadgeVariant; label: string; pulse: boolean }
> = {
    available: { variant: "success", label: "Available", pulse: true },
    busy: { variant: "warning", label: "Busy", pulse: false },
    booked: { variant: "danger", label: "Booked", pulse: false },
    offline: { variant: "default", label: "Offline", pulse: false },
};

export const StatusBadge = forwardRef<HTMLSpanElement, StatusBadgeProps>(
    function StatusBadge({ status, ...props }, ref) {
        const config = statusConfig[status];
        return (
            <Badge
                ref={ref}
                variant={config.variant}
                dot
                pulse={config.pulse}
                {...props}
            >
                {config.label}
            </Badge>
        );
    }
);

export default Badge;

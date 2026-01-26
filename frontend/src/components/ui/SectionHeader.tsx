"use client";

import { forwardRef, HTMLAttributes } from "react";
import { clsx } from "clsx";
import Link from "next/link";

interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
    title: string;
    subtitle?: string;
    badge?: {
        icon?: string;
        text: string;
    };
    action?: {
        label: string;
        href: string;
        icon?: string;
    };
    align?: "left" | "center";
    size?: "sm" | "md" | "lg";
    animated?: boolean;
}

const titleSizes = {
    sm: "text-2xl md:text-3xl",
    md: "text-3xl md:text-4xl",
    lg: "text-4xl md:text-5xl",
};

export const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
    function SectionHeader(
        {
            title,
            subtitle,
            badge,
            action,
            align = "left",
            size = "md",
            animated = true,
            className,
            ...props
        },
        ref
    ) {
        return (
            <div
                ref={ref}
                className={clsx(
                    "mb-10 flex flex-col gap-2",
                    align === "center" && "items-center text-center",
                    animated && "animate-fade-in-up",
                    className
                )}
                {...props}
            >
                {/* Badge */}
                {badge && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit mb-2">
                        {badge.icon && (
                            <span className="material-symbols-outlined text-primary text-sm">
                                {badge.icon}
                            </span>
                        )}
                        <span className="text-xs font-bold text-primary tracking-wide uppercase">
                            {badge.text}
                        </span>
                    </div>
                )}

                {/* Title Row */}
                <div
                    className={clsx(
                        "flex items-end justify-between gap-4",
                        align === "center" && "flex-col items-center"
                    )}
                >
                    <div className={align === "center" ? "text-center" : ""}>
                        <h2
                            className={clsx(
                                "font-black text-white tracking-tight",
                                titleSizes[size]
                            )}
                        >
                            {title}
                        </h2>
                        {subtitle && (
                            <p
                                className={clsx(
                                    "text-gray-400 mt-2",
                                    size === "lg" ? "text-lg" : "text-base",
                                    align === "center" && "max-w-2xl"
                                )}
                            >
                                {subtitle}
                            </p>
                        )}
                    </div>

                    {/* Action Link */}
                    {action && (
                        <Link
                            href={action.href}
                            className="text-primary hover:text-primary/80 font-semibold flex items-center gap-1 text-sm whitespace-nowrap transition-colors"
                        >
                            {action.label}
                            <span className="material-symbols-outlined text-lg">
                                {action.icon || "arrow_forward"}
                            </span>
                        </Link>
                    )}
                </div>
            </div>
        );
    }
);

export default SectionHeader;

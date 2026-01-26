"use client";

import { forwardRef, HTMLAttributes } from "react";
import { clsx } from "clsx";

type CardVariant = "default" | "elevated" | "outlined" | "interactive";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: CardVariant;
    padding?: "none" | "sm" | "md" | "lg";
    rounded?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
    glow?: boolean;
    glowColor?: string;
}

const variantStyles: Record<CardVariant, string> = {
    default: "bg-surface-dark border border-white/5",
    elevated: "bg-surface-dark border border-white/5 shadow-xl shadow-black/20",
    outlined: "bg-transparent border border-white/10 hover:border-white/20",
    interactive:
        "bg-surface-dark border border-white/5 hover:border-primary/50 transition-all cursor-pointer group",
};

const paddingStyles: Record<NonNullable<CardProps["padding"]>, string> = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
};

const roundedStyles: Record<NonNullable<CardProps["rounded"]>, string> = {
    sm: "rounded-lg",
    md: "rounded-xl",
    lg: "rounded-2xl",
    xl: "rounded-3xl",
    "2xl": "rounded-[2rem]",
    "3xl": "rounded-[2.5rem]",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
    {
        variant = "default",
        padding = "md",
        rounded = "xl",
        glow = false,
        glowColor = "primary",
        className,
        children,
        ...props
    },
    ref
) {
    return (
        <div
            ref={ref}
            className={clsx(
                variantStyles[variant],
                paddingStyles[padding],
                roundedStyles[rounded],
                glow && `shadow-lg shadow-${glowColor}/20`,
                "backdrop-blur-md",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
});

// Card Header
interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
    title?: string;
    subtitle?: string;
    action?: React.ReactNode;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
    function CardHeader({ title, subtitle, action, className, children, ...props }, ref) {
        return (
            <div
                ref={ref}
                className={clsx("flex items-start justify-between mb-4", className)}
                {...props}
            >
                {(title || subtitle) && (
                    <div>
                        {title && (
                            <h3 className="text-lg font-bold text-white">{title}</h3>
                        )}
                        {subtitle && (
                            <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
                        )}
                    </div>
                )}
                {children}
                {action && <div>{action}</div>}
            </div>
        );
    }
);

// Card Content
export const CardContent = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>(function CardContent({ className, children, ...props }, ref) {
    return (
        <div ref={ref} className={clsx("", className)} {...props}>
            {children}
        </div>
    );
});

// Card Footer
export const CardFooter = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>(function CardFooter({ className, children, ...props }, ref) {
    return (
        <div
            ref={ref}
            className={clsx("mt-4 pt-4 border-t border-white/5", className)}
            {...props}
        >
            {children}
        </div>
    );
});

export default Card;

"use client";

import Link from "next/link";
import { forwardRef, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { clsx } from "clsx";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface BaseButtonProps {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
}

interface ButtonAsButtonProps
    extends BaseButtonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
    as?: "button";
    href?: never;
}

interface ButtonAsLinkProps
    extends BaseButtonProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "href"> {
    as: "link";
    href: string;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const variantStyles: Record<ButtonVariant, string> = {
    primary:
        "bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(17,82,212,0.4)] hover:shadow-[0_0_30px_rgba(17,82,212,0.5)]",
    secondary:
        "bg-white text-background-dark hover:bg-gray-200",
    outline:
        "bg-transparent border border-white/20 text-white hover:bg-white hover:text-background-dark",
    ghost:
        "bg-white/5 hover:bg-white/10 border border-white/10 text-white backdrop-blur-sm",
    danger:
        "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/20",
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: "h-9 px-4 text-sm rounded-md gap-1.5",
    md: "h-12 px-6 text-base rounded-lg gap-2",
    lg: "h-14 px-8 text-lg rounded-xl gap-2.5",
};

export const Button = forwardRef<
    HTMLButtonElement | HTMLAnchorElement,
    ButtonProps
>(function Button(props, ref) {
    const {
        variant = "primary",
        size = "md",
        isLoading = false,
        leftIcon,
        rightIcon,
        fullWidth = false,
        children,
        ...rest
    } = props;

    const baseStyles = clsx(
        "inline-flex items-center justify-center font-bold transition-all duration-200",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
        "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background-dark",
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && "w-full"
    );

    const content = (
        <>
            {isLoading ? (
                <span className="animate-spin mr-2">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                    </svg>
                </span>
            ) : (
                leftIcon
            )}
            {children}
            {rightIcon && !isLoading && rightIcon}
        </>
    );

    if (props.as === "link") {
        const { as, href, ...linkRest } = rest as ButtonAsLinkProps;
        return (
            <Link
                href={href}
                className={baseStyles}
                ref={ref as React.Ref<HTMLAnchorElement>}
                {...linkRest}
            >
                {content}
            </Link>
        );
    }

    const { as, ...buttonRest } = rest as ButtonAsButtonProps;
    return (
        <button
            className={baseStyles}
            disabled={isLoading}
            ref={ref as React.Ref<HTMLButtonElement>}
            {...buttonRest}
        >
            {content}
        </button>
    );
});

export default Button;

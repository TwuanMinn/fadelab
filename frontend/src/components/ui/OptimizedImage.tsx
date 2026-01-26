"use client";

import Image, { ImageProps } from "next/image";
import { forwardRef, useState } from "react";
import { clsx } from "clsx";

interface OptimizedImageProps extends Omit<ImageProps, "alt"> {
  alt: string;
  fallback?: string;
  aspectRatio?: "square" | "video" | "portrait" | "auto";
  overlay?: "none" | "gradient" | "dark";
  hoverZoom?: boolean;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  containerClassName?: string;
}

const aspectRatioStyles = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[4/5]",
  auto: "",
};

const overlayStyles = {
  none: "",
  gradient: "after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/80 after:via-black/20 after:to-transparent after:z-10",
  dark: "after:absolute after:inset-0 after:bg-black/50 after:z-10",
};

const roundedStyles = {
  none: "",
  sm: "rounded-md",
  md: "rounded-lg",
  lg: "rounded-xl",
  xl: "rounded-2xl",
  "2xl": "rounded-3xl",
  full: "rounded-full",
};

export const OptimizedImage = forwardRef<HTMLDivElement, OptimizedImageProps>(
  function OptimizedImage(
    {
      src,
      alt,
      fallback = "/placeholder.jpg",
      aspectRatio = "auto",
      overlay = "none",
      hoverZoom = false,
      rounded = "lg",
      containerClassName,
      className,
      fill = true,
      ...props
    },
    ref
  ) {
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    return (
      <div
        ref={ref}
        className={clsx(
          "relative overflow-hidden",
          aspectRatioStyles[aspectRatio],
          overlayStyles[overlay],
          roundedStyles[rounded],
          containerClassName
        )}
      >
        {/* Loading Skeleton */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/5 animate-pulse z-0" />
        )}

        <Image
          src={error ? fallback : src}
          alt={alt}
          fill={fill}
          className={clsx(
            "object-cover transition-all duration-500",
            hoverZoom && "group-hover:scale-110",
            isLoading ? "opacity-0" : "opacity-100",
            className
          )}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setError(true);
            setIsLoading(false);
          }}
          {...props}
        />
      </div>
    );
  }
);

// Avatar specific image component
interface AvatarImageProps extends Omit<OptimizedImageProps, "aspectRatio" | "rounded"> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  ring?: boolean;
  ringColor?: string;
}

const avatarSizes = {
  xs: "w-6 h-6",
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
};

export const AvatarImage = forwardRef<HTMLDivElement, AvatarImageProps>(
  function AvatarImage(
    { size = "md", ring = false, ringColor = "primary", className, containerClassName, ...props },
    ref
  ) {
    return (
      <OptimizedImage
        ref={ref}
        aspectRatio="square"
        rounded="full"
        containerClassName={clsx(
          avatarSizes[size],
          ring && `ring-2 ring-${ringColor}/20`,
          containerClassName
        )}
        className={className}
        {...props}
      />
    );
  }
);

// Background Image component for hero sections
interface BackgroundImageProps extends Omit<OptimizedImageProps, "overlay"> {
  gradients?: ("left" | "right" | "top" | "bottom")[];
}

export const BackgroundImage = forwardRef<HTMLDivElement, BackgroundImageProps>(
  function BackgroundImage(
    { gradients = ["bottom"], containerClassName, children, ...props },
    ref
  ) {
    const gradientStyles = {
      left: "bg-gradient-to-r from-black/80 via-black/50 to-transparent",
      right: "bg-gradient-to-l from-black/80 via-black/50 to-transparent",
      top: "bg-gradient-to-b from-black/80 via-black/50 to-transparent",
      bottom: "bg-gradient-to-t from-black/80 via-black/50 to-transparent",
    };

    return (
      <div ref={ref} className={clsx("absolute inset-0", containerClassName)}>
        <OptimizedImage
          overlay="none"
          rounded="none"
          priority
          {...props}
        />
        {gradients.map((gradient) => (
          <div
            key={gradient}
            className={clsx("absolute inset-0 z-10", gradientStyles[gradient])}
          />
        ))}
        {children}
      </div>
    );
  }
);

export default OptimizedImage;
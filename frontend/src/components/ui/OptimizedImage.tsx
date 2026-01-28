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

// Image Gallery with Lightbox
interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
  rounded?: "none" | "sm" | "md" | "lg" | "xl";
}

const gapStyles = {
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
};

const columnStyles = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
};

export function ImageGallery({
  images,
  columns = 3,
  gap = "md",
  rounded = "lg",
}: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (selectedIndex === null) return;

    if (e.key === "Escape") {
      setSelectedIndex(null);
    } else if (e.key === "ArrowLeft") {
      setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : (prev ?? 0) - 1));
    } else if (e.key === "ArrowRight") {
      setSelectedIndex((prev) => ((prev ?? 0) + 1) % images.length);
    }
  };

  return (
    <>
      <div className={clsx("grid", columnStyles[columns], gapStyles[gap])}>
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={clsx(
              "relative aspect-square overflow-hidden group cursor-pointer",
              roundedStyles[rounded],
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-dark"
            )}
            aria-label={`View ${image.alt}`}
          >
            <OptimizedImage
              src={image.src}
              alt={image.alt}
              hoverZoom
              rounded={rounded}
              sizes={`(max-width: 768px) 50vw, ${100 / columns}vw`}
            />
            {image.caption && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 z-20">
                <span className="text-white text-sm">{image.caption}</span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setSelectedIndex(null)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 p-2"
            aria-label="Close lightbox"
          >
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : (prev ?? 0) - 1));
            }}
            className="absolute left-4 text-white hover:text-gray-300 p-2"
            aria-label="Previous image"
          >
            <span className="material-symbols-outlined text-4xl">chevron_left</span>
          </button>

          <div
            className="relative max-w-4xl max-h-[80vh] w-full h-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <OptimizedImage
              src={images[selectedIndex].src}
              alt={images[selectedIndex].alt}
              rounded="lg"
              priority
              sizes="100vw"
            />
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) => ((prev ?? 0) + 1) % images.length);
            }}
            className="absolute right-16 text-white hover:text-gray-300 p-2"
            aria-label="Next image"
          >
            <span className="material-symbols-outlined text-4xl">chevron_right</span>
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-center">
            {images[selectedIndex].caption && (
              <p className="mb-2">{images[selectedIndex].caption}</p>
            )}
            <p className="text-gray-400 text-sm">
              {selectedIndex + 1} / {images.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default OptimizedImage;
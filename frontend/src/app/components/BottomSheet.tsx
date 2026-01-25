"use client";

import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { useEffect, useRef, ReactNode } from "react";

interface BottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    height?: "auto" | "half" | "full";
}

export default function BottomSheet({ isOpen, onClose, title, children, height = "auto" }: BottomSheetProps) {
    const sheetRef = useRef<HTMLDivElement>(null);
    const dragControls = useDragControls();

    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const getMaxHeight = () => {
        switch (height) {
            case "full": return "90vh";
            case "half": return "50vh";
            default: return "auto";
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70]"
                    />

                    {/* Sheet */}
                    <motion.div
                        ref={sheetRef}
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        drag="y"
                        dragControls={dragControls}
                        dragConstraints={{ top: 0, bottom: 0 }}
                        dragElastic={{ top: 0, bottom: 0.5 }}
                        onDragEnd={(_, info) => {
                            if (info.offset.y > 100 || info.velocity.y > 500) {
                                onClose();
                            }
                        }}
                        style={{ maxHeight: getMaxHeight() }}
                        className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 rounded-t-[2rem] z-[71] shadow-2xl flex flex-col max-h-[90vh]"
                    >
                        {/* Handle */}
                        <div
                            onPointerDown={(e) => dragControls.start(e)}
                            className="w-full flex justify-center py-4 cursor-grab active:cursor-grabbing touch-none"
                        >
                            <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full" />
                        </div>

                        {/* Header */}
                        {title && (
                            <div className="flex items-center justify-between px-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                                <h2 className="text-lg font-black text-slate-900 dark:text-white">{title}</h2>
                                <button
                                    onClick={onClose}
                                    className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                                >
                                    <span className="material-symbols-outlined text-lg">close</span>
                                </button>
                            </div>
                        )}

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-4 pb-safe">
                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

// Filter Bottom Sheet for mobile
interface FilterOption {
    label: string;
    value: string;
    icon?: string;
}

interface FilterBottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    options: FilterOption[];
    selected: string;
    onSelect: (value: string) => void;
}

export function FilterBottomSheet({ isOpen, onClose, title, options, selected, onSelect }: FilterBottomSheetProps) {
    return (
        <BottomSheet isOpen={isOpen} onClose={onClose} title={title}>
            <div className="space-y-2 pb-8">
                {options.map((option) => (
                    <button
                        key={option.value}
                        onClick={() => {
                            onSelect(option.value);
                            onClose();
                        }}
                        className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all ${selected === option.value
                                ? "bg-primary text-white"
                                : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                            }`}
                    >
                        {option.icon && (
                            <span className="material-symbols-outlined">{option.icon}</span>
                        )}
                        <span className="font-bold">{option.label}</span>
                        {selected === option.value && (
                            <span className="material-symbols-outlined ml-auto">check</span>
                        )}
                    </button>
                ))}
            </div>
        </BottomSheet>
    );
}

// Sort Bottom Sheet
export function SortBottomSheet({ isOpen, onClose, selected, onSelect }: {
    isOpen: boolean;
    onClose: () => void;
    selected: string;
    onSelect: (value: string) => void;
}) {
    const options: FilterOption[] = [
        { label: "Newest First", value: "newest", icon: "schedule" },
        { label: "Price: Low to High", value: "price-low", icon: "trending_up" },
        { label: "Price: High to Low", value: "price-high", icon: "trending_down" },
        { label: "Top Rated", value: "rating", icon: "star" },
    ];

    return (
        <FilterBottomSheet
            isOpen={isOpen}
            onClose={onClose}
            title="Sort By"
            options={options}
            selected={selected}
            onSelect={onSelect}
        />
    );
}

// Category Bottom Sheet
export function CategoryBottomSheet({ isOpen, onClose, selected, onSelect, categories }: {
    isOpen: boolean;
    onClose: () => void;
    selected: string;
    onSelect: (value: string) => void;
    categories: string[];
}) {
    const options: FilterOption[] = categories.map(cat => ({
        label: cat,
        value: cat,
        icon: cat === "All" ? "apps" : "category"
    }));

    return (
        <FilterBottomSheet
            isOpen={isOpen}
            onClose={onClose}
            title="Categories"
            options={options}
            selected={selected}
            onSelect={onSelect}
        />
    );
}

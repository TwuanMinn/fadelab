"use client";

import { Toaster } from "sonner";

export function ToastProvider() {
    return (
        <Toaster
            position="top-center"
            expand={false}
            richColors
            closeButton
            toastOptions={{
                style: {
                    borderRadius: "16px",
                    padding: "16px",
                    fontWeight: 600,
                },
                classNames: {
                    toast: "!bg-white dark:!bg-slate-900 !border-slate-200 dark:!border-slate-700 !shadow-xl",
                    title: "!text-slate-900 dark:!text-white !font-bold",
                    description: "!text-slate-500 dark:!text-slate-400",
                    actionButton: "!bg-primary !text-white !font-bold !rounded-xl",
                    cancelButton: "!bg-slate-100 dark:!bg-slate-800 !text-slate-600 dark:!text-slate-300 !font-bold !rounded-xl",
                    closeButton: "!bg-slate-100 dark:!bg-slate-800 !border-slate-200 dark:!border-slate-700",
                },
            }}
        />
    );
}

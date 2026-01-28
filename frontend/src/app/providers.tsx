"use client";

import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/lib/auth-context";
import { ToastProvider } from "./components/ToastProvider";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AuthProvider>
                <ErrorBoundary>
                    {children}
                </ErrorBoundary>
                <ToastProvider />
            </AuthProvider>
        </ThemeProvider>
    );
}

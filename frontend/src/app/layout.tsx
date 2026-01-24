import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Use Inter based on code.html
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Furnza - Modern Furniture",
  description: "Experience comfort with our new 2024 series.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} font-display bg-background-light dark:bg-slate-950 text-slate-900 dark:text-white antialiased selection:bg-primary/20 transition-colors duration-300`}
      >
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

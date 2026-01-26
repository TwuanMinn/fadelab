import type { Metadata } from "next";
import { Inter, Outfit, Plus_Jakarta_Sans, Manrope } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "FadeLab - Premium Grooming",
  description: "Experience the art of grooming at FadeLab. Precision cuts and premium shaves.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${jakarta.variable} ${inter.variable} ${manrope.variable} font-sans bg-background-light dark:bg-slate-950 text-slate-900 dark:text-white antialiased selection:bg-primary/20 transition-colors duration-300`}
      >
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

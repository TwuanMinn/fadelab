import type { Metadata, Viewport } from "next";
import { Inter, Outfit, Plus_Jakarta_Sans, Manrope } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

// Enhanced SEO Metadata
export const metadata: Metadata = {
  title: {
    default: "FadeLab - Premium Grooming",
    template: "%s | FadeLab",
  },
  description:
    "Experience the art of grooming at FadeLab. Premium haircuts, precision fades, hot towel shaves, and beard styling in New York City. Book your appointment today.",
  keywords: [
    "barbershop",
    "haircut",
    "fade",
    "grooming",
    "beard trim",
    "hot towel shave",
    "New York",
    "premium barbershop",
    "men's grooming",
  ],
  authors: [{ name: "FadeLab" }],
  creator: "FadeLab",
  publisher: "FadeLab",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://fadelab.com"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "FadeLab",
    title: "FadeLab - Premium Grooming",
    description:
      "Experience the art of grooming at FadeLab. Premium haircuts, precision fades, and hot towel shaves.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FadeLab - Premium Grooming",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FadeLab - Premium Grooming",
    description:
      "Experience the art of grooming at FadeLab. Premium haircuts, precision fades, and hot towel shaves.",
    creator: "@FadeLab",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to Google Fonts for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BarberShop",
              name: "FadeLab",
              description:
                "Premium grooming services including haircuts, fades, and hot towel shaves.",
              url: "https://fadelab.com",
              telephone: "(555) 123-4567",
              email: "book@fadelab.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "123 Barber St.",
                addressLocality: "New York",
                addressRegion: "NY",
                postalCode: "10001",
                addressCountry: "US",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 40.7128,
                longitude: -74.006,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  opens: "09:00",
                  closes: "20:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Saturday",
                  opens: "10:00",
                  closes: "18:00",
                },
              ],
              priceRange: "$$",
              image: "https://fadelab.com/og-image.jpg",
              sameAs: [
                "https://instagram.com/fadelab",
                "https://twitter.com/fadelab",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${outfit.variable} ${jakarta.variable} ${inter.variable} ${manrope.variable} font-sans bg-background-light dark:bg-slate-950 text-slate-900 dark:text-white antialiased selection:bg-primary/20 transition-colors duration-300`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

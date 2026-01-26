import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Shop Premium Grooming Products",
    description:
        "Shop FadeLab's curated collection of premium grooming products. Professional-grade styling tools, beard oils, pomades, and skincare for the modern gentleman.",
    openGraph: {
        title: "Shop Premium Grooming Products | FadeLab",
        description:
            "Professional-grade styling tools and grooming products for the modern gentleman.",
        images: ["/og-shop.jpg"],
    },
};

export default function ShopLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}

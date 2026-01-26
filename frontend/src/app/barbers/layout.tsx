import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Barbers - Expert Stylists & Fade Specialists",
    description:
        "Meet our team of expert barbers at FadeLab. Browse our master stylists, fade specialists, and beard experts. Book your appointment with the perfect barber for your style.",
    openGraph: {
        title: "Our Barbers | FadeLab",
        description:
            "Meet our team of expert barbers. Find your perfect match and book your next appointment.",
        images: ["/og-barbers.jpg"],
    },
};

export default function BarbersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Membership Plans - Elite & Legendary Tiers",
    description:
        "Join FadeLab's exclusive membership program. Choose from Elite or Legendary tiers for priority booking, unlimited services, and VIP benefits.",
    openGraph: {
        title: "Membership Plans | FadeLab",
        description:
            "Exclusive membership tiers with priority booking and VIP benefits.",
        images: ["/og-memberships.jpg"],
    },
};

export default function MembershipsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}

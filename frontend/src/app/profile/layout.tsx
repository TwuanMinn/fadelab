import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Your Profile - Dashboard & Settings",
    description:
        "Manage your FadeLab profile, view booking history, track rewards, and customize your grooming preferences.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}

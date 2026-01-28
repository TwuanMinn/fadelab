import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ServicePageClient } from "./ServicePageClient";
import { services } from "@/components/ui/ServiceMenu";

interface Props {
    params: { id: string };
}

// Generate static paths for all services
export async function generateStaticParams() {
    return services.map((service) => ({
        id: service.id,
    }));
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const service = services.find((s) => s.id === params.id);

    if (!service) {
        return {
            title: "Service Not Found",
        };
    }

    return {
        title: `${service.name} - $${service.price}`,
        description: service.longDescription,
        openGraph: {
            title: `${service.name} | FadeLab`,
            description: service.description,
            images: [service.image],
        },
    };
}

export default function ServicePage({ params }: Props) {
    const service = services.find((s) => s.id === params.id);

    if (!service) {
        notFound();
    }

    return <ServicePageClient service={service} allServices={services} />;
}

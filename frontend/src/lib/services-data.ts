// =====================================================
// SERVICES DATA - Shared between server and client components
// =====================================================

export interface Service {
    id: string;
    name: string;
    price: number;
    duration: string;
    description: string;
    longDescription: string;
    features: string[];
    image: string;
    icon: string;
    popular?: boolean;
}

export const services: Service[] = [
    {
        id: "classic-cut",
        name: "Classic Cut",
        price: 35,
        duration: "30-45 min",
        description: "Precision haircut tailored to your style and face shape",
        longDescription: "Our signature Classic Cut includes a detailed consultation, precision cutting with clippers and shears, styling with premium products, and a hot towel finish. Perfect for maintaining your look or trying something new.",
        features: [
            "Detailed consultation",
            "Precision cutting",
            "Premium styling products",
            "Hot towel finish",
            "Style recommendations"
        ],
        image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800",
        icon: "content_cut",
        popular: true
    },
    {
        id: "hot-towel-shave",
        name: "Hot Towel Shave",
        price: 45,
        duration: "45-60 min",
        description: "Traditional straight razor experience with premium products",
        longDescription: "Experience the art of the traditional straight razor shave. Includes multiple hot towel applications, pre-shave oil, premium shaving cream, precision straight razor work, and soothing aftershave treatment.",
        features: [
            "Multiple hot towel applications",
            "Pre-shave oil treatment",
            "Premium shaving cream",
            "Straight razor precision",
            "Soothing aftershave",
            "Face massage"
        ],
        image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800",
        icon: "spa"
    },
    {
        id: "beard-trim",
        name: "Beard Trim & Shape",
        price: 25,
        duration: "20-30 min",
        description: "Expert beard sculpting and maintenance",
        longDescription: "Keep your beard looking sharp with our precision trimming service. Includes shaping, line-ups, neck cleanup, and conditioning treatment to keep your facial hair healthy and styled.",
        features: [
            "Precision trimming",
            "Shape consultation",
            "Line-up and edges",
            "Neck cleanup",
            "Beard oil treatment"
        ],
        image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800",
        icon: "face_retouching_natural"
    },
    {
        id: "hair-beard-combo",
        name: "Hair & Beard Combo",
        price: 55,
        duration: "60-75 min",
        description: "Complete grooming package for the modern gentleman",
        longDescription: "The complete grooming experience. Combines our Classic Cut with a full beard trim and shape. Perfect for maintaining your entire look in one appointment.",
        features: [
            "Full haircut",
            "Complete beard service",
            "Hot towel treatment",
            "Premium products",
            "Save $5 vs. separate"
        ],
        image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800",
        icon: "styling",
        popular: true
    },
    {
        id: "kids-cut",
        name: "Kids Cut",
        price: 20,
        duration: "20-30 min",
        description: "Patient, professional cuts for children under 12",
        longDescription: "A fun, stress-free haircut experience for your little ones. Our barbers are experts at working with kids, making sure they leave with a great cut and a smile.",
        features: [
            "Patient, kid-friendly service",
            "Fun atmosphere",
            "Age-appropriate styling",
            "Lollipop after!"
        ],
        image: "https://images.unsplash.com/photo-1634391753673-b9bd24aa3cad?w=800",
        icon: "child_care"
    },
    {
        id: "deluxe-package",
        name: "The Deluxe Package",
        price: 85,
        duration: "90-120 min",
        description: "Cut, shave, beard trim, and facial treatment",
        longDescription: "The ultimate grooming experience. Includes our Classic Cut, Hot Towel Shave, Beard Trim, plus a rejuvenating facial treatment. Leave feeling like royalty.",
        features: [
            "Complete haircut",
            "Full straight razor shave",
            "Beard shaping",
            "Deep cleanse facial",
            "Scalp massage",
            "Complimentary beverage"
        ],
        image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800",
        icon: "face"
    }
];

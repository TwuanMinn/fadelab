export const PRODUCTS = [
    // Chairs
    { id: 1, name: 'Velvet Lounge Chair', price: 120, category: 'Chairs', rating: 4.8, img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 2, name: 'Nordic Dining Chair', price: 85, category: 'Chairs', rating: 4.5, img: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 101, name: 'Ergo Office Chair', price: 250, category: 'Chairs', rating: 4.7, img: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 102, name: 'Rattan Accent Chair', price: 180, category: 'Chairs', rating: 4.6, img: 'https://images.unsplash.com/photo-1519947486511-46149fa0a254?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 103, name: 'Modern Armchair', price: 320, category: 'Chairs', rating: 4.9, img: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },

    // Lighting
    { id: 3, name: 'Arc Floor Lamp', price: 160, category: 'Lighting', rating: 4.9, oldPrice: 200, discount: '-20%', img: 'https://images.unsplash.com/photo-1507473888900-52e1ad142756?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 201, name: 'Industrial Pendant', price: 89, category: 'Lighting', rating: 4.4, img: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 202, name: 'Minimalist Desk Lamp', price: 45, category: 'Lighting', rating: 4.6, img: 'https://images.unsplash.com/photo-1534349762913-96c22b678f20?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 203, name: 'Glass Chandelier', price: 450, category: 'Lighting', rating: 4.8, img: 'https://images.unsplash.com/photo-1543198615-8d5f921b6392?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 204, name: 'Wall Sconce Pair', price: 120, category: 'Lighting', rating: 4.5, img: 'https://images.unsplash.com/photo-1533132649069-42b4d9622d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },

    // Tables
    { id: 4, name: 'Oak Side Table', price: 95, category: 'Tables', rating: 4.6, img: 'https://images.unsplash.com/photo-1532323544230-7191fd515c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 301, name: 'Marble Coffee Table', price: 350, category: 'Tables', rating: 4.8, img: 'https://images.unsplash.com/photo-1622372738946-62e02505feb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 302, name: 'Glass Dining Table', price: 550, category: 'Tables', rating: 4.5, img: 'https://images.unsplash.com/photo-1577140917170-285929ea5518?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 303, name: 'Rustic Console', price: 280, category: 'Tables', rating: 4.4, img: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 304, name: 'Bedside Nightstand', price: 85, category: 'Tables', rating: 4.3, img: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },

    // Sofa
    { id: 5, name: 'Modern Sofa', price: 890, category: 'Sofa', rating: 4.7, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80' },
    { id: 9, name: 'Geometric Wool Rug', price: 240, category: 'Sofa', rating: 4.3, img: 'https://images.unsplash.com/photo-1575414003591-ece8d14161bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 401, name: 'Cloud Modular Sofa', price: 1450, category: 'Sofa', rating: 4.9, img: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 402, name: 'Leather Chesterfield', price: 2100, category: 'Sofa', rating: 4.8, img: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 403, name: 'Minimalist Loveseat', price: 650, category: 'Sofa', rating: 4.5, img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },

    // Bedroom
    { id: 6, name: 'Wooden Shelf', price: 210, category: 'Bedroom', rating: 4.4, img: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?ixlib=rb-4.0.3&auto=format&fit=crop&w=1139&q=80' },
    { id: 7, name: 'Ceramic Vase', price: 45, category: 'Bedroom', rating: 4.8, img: 'https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 501, name: 'Queen Platform Bed', price: 850, category: 'Bedroom', rating: 4.7, img: 'https://images.unsplash.com/photo-1505693416388-b0346efee958?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 502, name: 'Cozy Knit Throw', price: 85, category: 'Bedroom', rating: 4.6, img: 'https://images.unsplash.com/photo-1522771753062-82bc2379b451?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 503, name: 'Oak Wardrobe', price: 1200, category: 'Bedroom', rating: 4.8, img: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },

    // Kitchen
    { id: 8, name: 'Abstract Art', price: 120, category: 'Kitchen', rating: 5.0, img: 'https://images.unsplash.com/photo-1549490349-8643362247b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80' },
    { id: 601, name: 'Cookware Set', price: 299, category: 'Kitchen', rating: 4.8, img: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 602, name: 'Dinnerware Set', price: 150, category: 'Kitchen', rating: 4.6, img: 'https://images.unsplash.com/photo-1584269600519-112d071b35e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 603, name: 'Bar Stool (Set)', price: 220, category: 'Kitchen', rating: 4.5, img: 'https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 604, name: 'Bamboo Board', price: 35, category: 'Kitchen', rating: 4.7, img: 'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
];

export function getProductById(id: number | string) {
    return PRODUCTS.find(p => p.id === Number(id));
}

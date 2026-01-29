"use client";

import { useCartStore } from "@/lib/cart-store";
import { toast } from "sonner";

export function ShopTab() {
    const addToCart = useCartStore((state) => state.addToCart);

    const products = [
        { id: 1, name: "Matte Clay Matrix", price: 24, category: "Styling", img: "https://images.unsplash.com/photo-1590439471364-192aa70c7c53?auto=format&fit=crop&q=80&w=400" },
        { id: 2, name: "Beard Oil Vector-01", price: 18, category: "Beard Care", img: "https://images.unsplash.com/photo-1626285861696-9f0bf5a49c6d?auto=format&fit=crop&q=80&w=400" },
        { id: 3, name: "High-Gloss Fiber", price: 22, category: "Styling", img: "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?auto=format&fit=crop&q=80&w=400" },
        { id: 4, name: "Scalp Detox Serum", price: 32, category: "Hair Care", img: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=400" },
        { id: 5, name: "Precision Razor", price: 45, category: "Tools", img: "https://images.unsplash.com/photo-1599351431202-6e0000a4dbe1?auto=format&fit=crop&q=80&w=400" },
        { id: 6, name: "Clear Shave Gel", price: 15, category: "Shaving", img: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=400" },
        { id: 7, name: "Menthol Shampoo", price: 28, category: "Hair Care", img: "https://images.unsplash.com/photo-1506003094569-70183d29385b?auto=format&fit=crop&q=80&w=400" },
        { id: 8, name: "Cologne Vector-08", price: 85, category: "Fragrance", img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=400" },
    ];

    const handleAddToCart = (product: typeof products[0]) => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            img: product.img,
            category: product.category
        });
        toast.success(`${product.name} added to cart!`);
    };

    return (
        <>
            <header className="mb-10 flex flex-col gap-2 animate-fade-in-up">
                <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white italic">Lab Shop</h1>
                <p className="text-gray-400 text-base lg:text-lg max-w-2xl">Professional grade styling tools and anatomical care products.</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map(p => (
                    <div key={p.id} className="bg-[#1e293b]/50 backdrop-blur-md rounded-[2rem] border border-white/5 overflow-hidden group hover:border-blue-500/30 transition-all">
                        <div className="aspect-square bg-white/5 relative overflow-hidden">
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url('${p.img}')` }} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <button
                                onClick={() => handleAddToCart(p)}
                                className="absolute bottom-4 right-4 size-10 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all shadow-xl hover:bg-blue-500 hover:text-white cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-xl">add_shopping_cart</span>
                            </button>
                        </div>
                        <div className="p-6">
                            <h3 className="text-white font-black uppercase text-[10px] tracking-widest mb-1 italic">{p.name}</h3>
                            <p className="text-blue-500 font-black text-lg">${p.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

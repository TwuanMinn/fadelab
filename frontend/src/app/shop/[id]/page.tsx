"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// This would ideally come from a shared data file or API
const BUNDLES = [
    {
        id: 1,
        title: "The Daily Ritual",
        subtitle: "Hair Care Essentials",
        category: "Hair Care",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9eXLH6w_o6SK6bB86r9yVu1E9soqRLPq2nYj10cQVKghY5R78jhulhOEr9JZClXRAk8vkezk2T-2-AiCTSWR2D-vdkqcHOZnL62ieUzL7vwI3Qlicc6ajChlIg5fmYyuogFkiLRKYmEBHt_JuOdrhhBgRvHecKHpoTnE2hFkkpMnYhzKYG5_rfx82nCoCGB02ona5gIUlSAkQjGeQ6FcwcDGHVVJv8pYs7QWbltkZUvRUeTekbHHjQOiQZbJUD-ZOPNQfEMLHw5Lm",
        discount: "SAVE 20%",
        items: [
            "Revitalizing Shampoo (250ml)",
            "Hydrating Conditioner (250ml)",
            "Matte Clay Pomade (100g)"
        ],
        price: "48.00",
        regularPrice: "60.00",
        memberPrice: "38.40",
        rating: 4.9,
        reviews: 124,
        description: "A complete daily routine for the modern gentleman. Cleanse, condition, and style with our signature formulations designed to promote hair health and provide all-day styling control.",
        longDescription: "Formulated with natural ingredients and fortified with vitamins, this collection is the foundation of a great hair day. The shampoo strips away dirt without drying, the conditioner replenishes moisture, and the clay pomade offers a strong, matte hold that lasts.",
        scent: { base: "Sandalwood", top: "Cedar" },
        ingredients: [
            { name: "Argan Oil", icon: "opacity" },
            { name: "Shea Butter", icon: "eco" },
            { name: "Kaolin Clay", icon: "volcano" }
        ],
        gallery: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuD9eXLH6w_o6SK6bB86r9yVu1E9soqRLPq2nYj10cQVKghY5R78jhulhOEr9JZClXRAk8vkezk2T-2-AiCTSWR2D-vdkqcHOZnL62ieUzL7vwI3Qlicc6ajChlIg5fmYyuogFkiLRKYmEBHt_JuOdrhhBgRvHecKHpoTnE2hFkkpMnYhzKYG5_rfx82nCoCGB02ona5gIUlSAkQjGeQ6FcwcDGHVVJv8pYs7QWbltkZUvRUeTekbHHjQOiQZbJUD-ZOPNQfEMLHw5Lm",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuD7F9FDvcGqBS3D0DWn5-enY4CGxxhKekeJbHgNXvMNB-18yy2k-VZGLAWPma9XjnT3hxdCmszFxTOP9mULyLA5JiNOg7jDRDh3H9PlLB7DzulOLD0SM3LaUsz1hlwKT0kPdGuzJqoUwkwARVqg9MEI51jRLgycubNRjCvCcNK3nRjQu1BmikwvzxFa-FNzkKAWndflv8XkEkabrKTUuf7bfIV9Lo8s5ypeGvVTbpqWwN9b4kIQhVYegQQG8SRtessK15jy6c21wnsx",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuA4OgOrUbyNkSIRUKfOIVl34ITcLis0MUqSJ7HLUAE4nFvruno2qWcQ7HqVHxe2AIcGnBKAUrMHQ7rMNgtk75p1PWKJn92sYiscSCTvCBLTT__qMFw7-tJNlyZe1c963Zj1voAUO9DZ19m5DYUvmM253QA97mmQW6Li97tApLAtdIo8P4p1Ezp98tOJmzEBTxDUKefpCWTxWPRK3JeeiR1BQv9U3yseo07EHaftzipu0Po-L0P-XDAHBr4a030fYfVA6faQDsq-ID6K",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCgNnMgBfv_a9VrhQMyBJu4mQEFL7bQ-IsxfFkwbeiQXJw8Wfje4vssOtWf-mZX3duc6XrAwMk2rXQCIOuhAQmCHfUOQ2fWmBaoiF7NO9detP_t8Pu4iCxrYE5xm8533cJe5FosyA4gwopAdPP2Aii363Etx1MZWXKOli8Agvzx9UoDPFhk9ANHpXWWB7ObluVCVYV_Dqo2QXdf-vFolw0eVgEuGCax95koalfsg9IEyHU_klAFtSmr_a0u6uI-d0FhjhQw0vnStRuf"
        ]
    },
    {
        id: 2,
        title: "The Beard Master",
        subtitle: "Grooming Precision",
        category: "Beard Grooming",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1Nr3VwXh5dJ-gNZMll6XPHktvnz4Xm25p1Dsgs9fY5zxFSwfuaROsgM_QWIyEOnWwpyyHdNkV4vtkE-vIgZo_-daxxECYvMuzdhDYbSiMwMd3paYTXZiyv_Sy-Ljomsm-ieI_gke528N6Jip6G32dSIsKqI_UQpLXQfVSwhihsKazG3Xhu5REP3quZUtceTt_gW-2-LvWyHZS6A47Qb_6XU78XvnveOFmUor3J0VrlXjYK4A3mG2wi8ooeE0OQfMaOfXCR9ORP6kT",
        discount: "SAVE 15%",
        items: [
            "Signature Beard Oil (30ml)",
            "Taming Beard Balm (60ml)",
            "Handcrafted Wood Comb"
        ],
        price: "35.00",
        regularPrice: "42.00",
        memberPrice: "28.00",
        rating: 4.8,
        reviews: 86,
        description: "Everything you need for a soft, itch-free, and well-groomed beard. Our oil moisturizes the skin beneath, while the balm tames flyaways and adds a low shine.",
        longDescription: "Our Beard Master set is essential for the bearded gentleman. The oil features a blend of Jojoba and Argan oils to prevent itchiness, while the balm provides light hold for shaping. The static-free wood comb ensures even distribution of products.",
        scent: { base: "Tobacco", top: "Vanilla" },
        ingredients: [
            { name: "Jojoba Oil", icon: "water_drop" },
            { name: "Beeswax", icon: "hexagon" },
            { name: "Vitamin E", icon: "monitor_heart" }
        ],
        gallery: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuD1Nr3VwXh5dJ-gNZMll6XPHktvnz4Xm25p1Dsgs9fY5zxFSwfuaROsgM_QWIyEOnWwpyyHdNkV4vtkE-vIgZo_-daxxECYvMuzdhDYbSiMwMd3paYTXZiyv_Sy-Ljomsm-ieI_gke528N6Jip6G32dSIsKqI_UQpLXQfVSwhihsKazG3Xhu5REP3quZUtceTt_gW-2-LvWyHZS6A47Qb_6XU78XvnveOFmUor3J0VrlXjYK4A3mG2wi8ooeE0OQfMaOfXCR9ORP6kT",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuD7F9FDvcGqBS3D0DWn5-enY4CGxxhKekeJbHgNXvMNB-18yy2k-VZGLAWPma9XjnT3hxdCmszFxTOP9mULyLA5JiNOg7jDRDh3H9PlLB7DzulOLD0SM3LaUsz1hlwKT0kPdGuzJqoUwkwARVqg9MEI51jRLgycubNRjCvCcNK3nRjQu1BmikwvzxFa-FNzkKAWndflv8XkEkabrKTUuf7bfIV9Lo8s5ypeGvVTbpqWwN9b4kIQhVYegQQG8SRtessK15jy6c21wnsx",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuA4OgOrUbyNkSIRUKfOIVl34ITcLis0MUqSJ7HLUAE4nFvruno2qWcQ7HqVHxe2AIcGnBKAUrMHQ7rMNgtk75p1PWKJn92sYiscSCTvCBLTT__qMFw7-tJNlyZe1c963Zj1voAUO9DZ19m5DYUvmM253QA97mmQW6Li97tApLAtdIo8P4p1Ezp98tOJmzEBTxDUKefpCWTxWPRK3JeeiR1BQv9U3yseo07EHaftzipu0Po-L0P-XDAHBr4a030fYfVA6faQDsq-ID6K"
        ]
    },
    {
        id: 3,
        title: "The Ultimate Gift Set",
        subtitle: "Full Collection",
        category: "Gift Sets",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAceVYlmqgClXnGDKzQVqvt0kohIJJi2xHbUHpp0hH-wp7ItI_OniVhsJ_AYtTZ0MSHi_kyJr81yD1UUnHn6GhBN6uEGldwnKsRlzpz-uJ9s0jQ3lCEXrgwElnEpchkd2ge2iHgU4uiCb7UT8s0KHTIQtzzclGZ0SKNlM4shJXYNrstcfHAwGS5BrnQagAfRXcfgg_SSi-ydknRoJC-Gy0C7J9mE0yTv9xTL0RWKnQ8SpBqaI178dNj-53k4Z3kfyhyoZLZ9t0-uN-i",
        discount: "SAVE 25%",
        items: [
            "Total Grooming Suite (6 items)",
            "Premium Leather Travel Case",
            "Complimentary Haircut Voucher"
        ],
        price: "120.00",
        regularPrice: "160.00",
        memberPrice: "96.00",
        rating: 5.0,
        reviews: 42,
        description: "The pinnacle of our grooming collection. This set includes every essential you need to look your sharpest, packaged in a premium leather case.",
        longDescription: "Give the gift of superior grooming. This comprehensive set covers hair, beard, and face care. It comes with a full-grain leather dopp kit that will last a lifetime, plus a voucher for a free haircut at any of our Premium Barber locations.",
        scent: { base: "Oud", top: "Bergamot" },
        ingredients: [
            { name: "Aloe Vera", icon: "spa" },
            { name: "Tea Tree", icon: "forest" },
            { name: "Activated Charcoal", icon: "dark_mode" }
        ],
        gallery: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAceVYlmqgClXnGDKzQVqvt0kohIJJi2xHbUHpp0hH-wp7ItI_OniVhsJ_AYtTZ0MSHi_kyJr81yD1UUnHn6GhBN6uEGldwnKsRlzpz-uJ9s0jQ3lCEXrgwElnEpchkd2ge2iHgU4uiCb7UT8s0KHTIQtzzclGZ0SKNlM4shJXYNrstcfHAwGS5BrnQagAfRXcfgg_SSi-ydknRoJC-Gy0C7J9mE0yTv9xTL0RWKnQ8SpBqaI178dNj-53k4Z3kfyhyoZLZ9t0-uN-i",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuD7F9FDvcGqBS3D0DWn5-enY4CGxxhKekeJbHgNXvMNB-18yy2k-VZGLAWPma9XjnT3hxdCmszFxTOP9mULyLA5JiNOg7jDRDh3H9PlLB7DzulOLD0SM3LaUsz1hlwKT0kPdGuzJqoUwkwARVqg9MEI51jRLgycubNRjCvCcNK3nRjQu1BmikwvzxFa-FNzkKAWndflv8XkEkabrKTUuf7bfIV9Lo8s5ypeGvVTbpqWwN9b4kIQhVYegQQG8SRtessK15jy6c21wnsx",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCgNnMgBfv_a9VrhQMyBJu4mQEFL7bQ-IsxfFkwbeiQXJw8Wfje4vssOtWf-mZX3duc6XrAwMk2rXQCIOuhAQmCHfUOQ2fWmBaoiF7NO9detP_t8Pu4iCxrYE5xm8533cJe5FosyA4gwopAdPP2Aii363Etx1MZWXKOli8Agvzx9UoDPFhk9ANHpXWWB7ObluVCVYV_Dqo2QXdf-vFolw0eVgEuGCax95koalfsg9IEyHU_klAFtSmr_a0u6uI-d0FhjhQw0vnStRuf"
        ]
    },
    {
        id: 4,
        title: "The Precision Edge",
        subtitle: "Edge & Definition",
        category: "Beard Grooming",
        image: "https://images.unsplash.com/photo-1599351431202-6e0000a4dbe1?auto=format&fit=crop&q=80&w=600",
        discount: "SAVE 10%",
        items: ["Precision Razor", "Clear Shave Gel (150ml)", "Alum Block"],
        price: "45.00",
        regularPrice: "50.00",
        memberPrice: "36.00",
        rating: 4.7,
        reviews: 45,
        description: "Achieve surgical precision with our Edge and Definition kit. Designed for the man who treats his beard like a masterpiece.",
        longDescription: "Includes our signature weighted razor handle and 5 professional-grade blades. The clear shave gel ensures you see exactly where you're cutting, while the alum block seals pores and prevents irritation.",
        scent: { base: "Menthol", top: "Peppermint" },
        ingredients: [{ name: "Menthol", icon: "ac_unit" }, { name: "Alum", icon: "diamond" }],
        gallery: ["https://images.unsplash.com/photo-1599351431202-6e0000a4dbe1?auto=format&fit=crop&q=80&w=600"]
    },
    {
        id: 5,
        title: "The Midnight Refresh",
        subtitle: "Nightly Restoration",
        category: "Hair Care",
        image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=600",
        discount: "SAVE 15%",
        items: ["Sleep-In Hair Mask", "Silk Pillowcase", "Detangling Brush"],
        price: "55.00",
        regularPrice: "65.00",
        memberPrice: "44.00",
        rating: 4.6,
        reviews: 28,
        description: "Restore your hair's vitality while you sleep. The ultimate nightly restoration protocol.",
        longDescription: "Our Sleep-In mask penetrates deep into the follicle, while the silk pillowcase prevents friction damage. Wake up with smooth, manageable hair every single morning.",
        scent: { base: "Lavender", top: "Chamomile" },
        ingredients: [{ name: "Lavender", icon: "potted_plant" }, { name: "Keratin", icon: "shield" }],
        gallery: ["https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=600"]
    },
    {
        id: 6,
        title: "The Executive Suite",
        subtitle: "Boardroom Ready",
        category: "Gift Sets",
        image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=600",
        discount: "SAVE 20%",
        items: ["Cologne (50ml)", "Luxury Ties", "Leather Briefcase Polish"],
        price: "180.00",
        regularPrice: "225.00",
        memberPrice: "144.00",
        rating: 4.9,
        reviews: 12,
        description: "Project confidence and command respect. The definitive collection for the modern executive.",
        longDescription: "Master the art of the boardroom. Our signature Cologne Vector-08 projects power, while the luxury silk ties ensure you look the part. Includes premium leather polish for a flawless finish.",
        scent: { base: "Leather", top: "Bergamot" },
        ingredients: [{ name: "Bergamot", icon: "eco" }, { name: "Leather Accord", icon: "work" }],
        gallery: ["https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=600"]
    },
    {
        id: 7,
        title: "The Arctic Freeze",
        subtitle: "Icy Menthol Flow",
        category: "Limited Edition",
        image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=600",
        discount: "LIMITED RUN",
        items: ["Menthol Shampoo (500ml)", "Cooling Scalp Tonic", "Ice-Blue Styling Gel"],
        price: "42.00",
        regularPrice: "50.00",
        memberPrice: "33.60",
        rating: 4.8,
        reviews: 56,
        description: "A bracing blast of arctic energy for your morning ritual. Shock your system into high focus.",
        longDescription: "Our high-concentration menthol formula provides an immediate cooling sensation that lasts for hours. Perfect for post-gym or early mornings when you need a tactical restart.",
        scent: { base: "Peppermint", top: "Eucalyptus" },
        ingredients: [{ name: "Menthol", icon: "ac_unit" }, { name: "Eucalyptus", icon: "nature" }],
        gallery: ["https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=600"]
    },
    {
        id: 8,
        title: "The Urban Nomad",
        subtitle: "Travel Command",
        category: "Gift Sets",
        image: "https://images.unsplash.com/photo-1626285861696-9f0bf5a49c6d?auto=format&fit=crop&q=80&w=600",
        discount: "SAVE 10%",
        items: ["Waterproof Dopp Kit", "Travel Sized Ritual", "Folding Wood Comb"],
        price: "68.00",
        regularPrice: "75.00",
        memberPrice: "54.40",
        rating: 4.7,
        reviews: 89,
        description: "Maintain your standard of excellence anywhere on the globe. Compact, durable, and effective.",
        longDescription: "Built for the man on the move. Our waterproof dopp kit holds everything securely, featuring travel-approved sizes of our best-sellers. The folding comb ensures you're always ready for deployment.",
        scent: { base: "Cedarwood", top: "Citrus" },
        ingredients: [{ name: "Tea Tree", icon: "forest" }, { name: "Jojoba", icon: "water_drop" }],
        gallery: ["https://images.unsplash.com/photo-1626285861696-9f0bf5a49c6d?auto=format&fit=crop&q=80&w=600"]
    },
    {
        id: 9,
        title: "The High Gloss Master",
        subtitle: "Diamond Shine",
        category: "Hair Care",
        image: "https://images.unsplash.com/photo-1590439471364-192aa70c7c53?auto=format&fit=crop&q=80&w=600",
        discount: "SAVE 20%",
        items: ["High-Shine Pomade", "Gloss Serum", "Fine Tooth Comb"],
        price: "38.00",
        regularPrice: "48.00",
        memberPrice: "30.40",
        rating: 4.5,
        reviews: 34,
        description: "Achieve the classic executive look with zero compromise on shine. High-intensity brilliance.",
        longDescription: "Our water-based pomade provides a strong hold with a mirror-like finish. The gloss serum adds a final layer of protection and luminosity, perfect for slicked-back styles and side parts.",
        scent: { base: "Musk", top: "Vanilla" },
        ingredients: [{ name: "Aloe Vera", icon: "content_cut" }, { name: "Vitamin B5", icon: "bolt" }],
        gallery: ["https://images.unsplash.com/photo-1590439471364-192aa70c7c53?auto=format&fit=crop&q=80&w=600"]
    },
    {
        id: 10,
        title: "The Botanical Sensation",
        subtitle: "Organic Flow",
        category: "Hair Care",
        image: "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?auto=format&fit=crop&q=80&w=600",
        discount: "ORGANIC",
        items: ["Tea Tree Shampoo", "Aloe Conditioner", "Hemp Seed Cream"],
        price: "62.00",
        regularPrice: "72.00",
        memberPrice: "49.60",
        rating: 4.9,
        reviews: 73,
        description: "Harness the power of nature for superior hair health. 100% plant-based tactical care.",
        longDescription: "Free from sulfates and parabens, our botanical line uses cold-pressed oils and organic extracts to nourish your scalp and strengthen follicles from the root up. Nature's finest, optimized by science.",
        scent: { base: "Tea Tree", top: "Sage" },
        ingredients: [{ name: "Tea Tree Oil", icon: "energy_savings_leaf" }, { name: "Hemp Seed", icon: "eco" }],
        gallery: ["https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?auto=format&fit=crop&q=80&w=600"]
    },
    {
        id: 11,
        title: "The Shadow Sculpt",
        subtitle: "Deep Volume",
        category: "Beard Grooming",
        image: "https://images.unsplash.com/photo-1503951914875-befea74701c5?auto=format&fit=crop&q=80&w=600",
        discount: "SAVE 15%",
        items: ["Volumizing Beard Powder", "Stiff Fiber Paste", "Beard Straightener"],
        price: "75.00",
        regularPrice: "88.00",
        memberPrice: "60.00",
        rating: 4.8,
        reviews: 21,
        description: "Command the room with a fuller, more architectural beard style. Volume without the weight.",
        longDescription: "Our breakthrough volumizing powder creates instant thickness for even the patchiest beards. Follow up with the stiff fiber paste for all-day architecture and use the ceramic straightener for a flawless profile.",
        scent: { base: "Oakmoss", top: "Juniper" },
        ingredients: [{ name: "Kaolin", icon: "volcano" }, { name: "Biotin", icon: "diamond" }],
        gallery: ["https://images.unsplash.com/photo-1503951914875-befea74701c5?auto=format&fit=crop&q=80&w=600"]
    },
    {
        id: 12,
        title: "The Carbon Fiber Kit",
        subtitle: "Advanced Materials",
        category: "Limited Edition",
        image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=600",
        discount: "NEW DROP",
        items: ["Carbon Fiber Comb Set", "Matte Black Case", "Titanium Scissors"],
        price: "110.00",
        regularPrice: "130.00",
        memberPrice: "88.00",
        rating: 5.0,
        reviews: 15,
        description: "Engineered for excellence. The pinnacle of grooming tool technology and materials.",
        longDescription: "Carbon fiber provides unparalleled strength-to-weight ratio and is completely anti-static. Our titanium-coated scissors hold their edge 3x longer than steel. For the man who demands the best tools in existence.",
        scent: { base: "None", top: "Industrial" },
        ingredients: [{ name: "Carbon Fiber", icon: "settings" }, { name: "Titanium", icon: "token" }],
        gallery: ["https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=600"]
    },
    {
        id: 13,
        title: "The Royal Crown",
        subtitle: "Scalp Sovereignty",
        category: "Hair Care",
        image: "https://images.unsplash.com/photo-1542382257-80dee9ad74b6?auto=format&fit=crop&q=80&w=600",
        discount: "ELITE",
        items: ["Exfoliating Scrub", "Scalp Massager", "Growth Serum"],
        price: "85.00",
        regularPrice: "100.00",
        memberPrice: "68.00",
        rating: 4.9,
        reviews: 94,
        description: "The foundation of great hair is a healthy scalp. Reign supreme over your hair health.",
        longDescription: "Our exfoliating scrub removes dead skin and product buildup, while the massager stimulates blood flow to dormant follicles. The growth serum provides the nutrients needed for a thick, healthy crown.",
        scent: { base: "Patchouli", top: "Grapefruit" },
        ingredients: [{ name: "Caffeine", icon: "bolt" }, { name: "Rosemary", icon: "eco" }],
        gallery: ["https://images.unsplash.com/photo-1542382257-80dee9ad74b6?auto=format&fit=crop&q=80&w=600"]
    },
    {
        id: 14,
        title: "The Silver Fox",
        subtitle: "Platinum Precision",
        category: "Limited Edition",
        image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=600",
        discount: "CORE EXCLUSIVE",
        items: ["Purple Toning Shampoo", "Anti-Yellowing Balm", "Soft Shine Spray"],
        price: "52.00",
        regularPrice: "62.00",
        memberPrice: "41.60",
        rating: 4.8,
        reviews: 32,
        description: "Maintain your silver status with pride. Keep grey hair bright, soft, and vibrant.",
        longDescription: "Specifically formulated for white, grey, and blonde hair. Our purple toning system neutralizes brassiness and yellow tones, while the soft shine spray adds a healthy metallic glow to your profile.",
        scent: { base: "Vetiver", top: "Lime" },
        ingredients: [{ name: "Blue Pigment", icon: "palette" }, { name: "Silk Protein", icon: "category" }],
        gallery: ["https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=600"]
    }
];

export default function ProductDetailPage() {
    const params = useParams();
    const [quantity, setQuantity] = useState(1);
    const [showSticky, setShowSticky] = useState(false);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    // Find the bundle
    const product = BUNDLES.find(b => b.id === Number(params.id)) || BUNDLES[0];

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 600) {
                setShowSticky(true);
            } else {
                setShowSticky(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleAddToCart = () => {
        alert(`Added ${quantity} x ${product.title} to cart!`);
    };

    return (
        <div className="bg-background-dark text-white font-display min-h-screen">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full px-6 md:px-10 py-6 pointer-events-none">
                <div className="max-w-[1280px] mx-auto flex items-center justify-between pointer-events-auto">
                    <Link
                        href="/shop"
                        className="group flex items-center gap-2 px-5 py-3 rounded-full bg-surface-darker/80 backdrop-blur-md border border-white/10 text-white hover:bg-white hover:text-background-dark transition-all duration-300"
                    >
                        <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">arrow_back</span>
                        <span className="text-xs font-black uppercase tracking-widest">Back to Shop</span>
                    </Link>

                    <div className="flex items-center gap-3">
                        <button className="size-10 rounded-full bg-surface-darker/80 backdrop-blur-md border border-white/10 text-white hover:bg-white hover:text-background-dark flex items-center justify-center transition-all group">
                            <span className="material-symbols-outlined text-lg">search</span>
                        </button>
                        <Link href="/checkout" className="relative size-10 rounded-full bg-surface-darker/80 backdrop-blur-md border border-white/10 text-white hover:bg-white hover:text-background-dark flex items-center justify-center transition-all group">
                            <span className="material-symbols-outlined text-lg">shopping_cart</span>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="max-w-[1280px] mx-auto px-6 md:px-10 py-8 pb-32">
                {/* Breadcrumbs */}
                <div className="flex flex-wrap items-center gap-2 mb-8 text-sm font-medium">
                    <Link className="text-white/50 hover:text-primary transition-colors" href="/">Home</Link>
                    <span className="text-white/30">/</span>
                    <Link className="text-white/50 hover:text-primary transition-colors" href="/shop">Shop</Link>
                    <span className="text-white/30">/</span>
                    <span className="text-white font-bold">{product.title}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left: Image Gallery */}
                    <div className="lg:col-span-7 space-y-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="relative aspect-square rounded-xl overflow-hidden bg-white/5 border border-white/10 group"
                        >
                            <div
                                className="w-full h-full bg-center bg-cover bg-no-repeat transition-transform duration-700 group-hover:scale-105"
                                style={{ backgroundImage: `url("${product.gallery[activeImageIndex]}")` }}
                            ></div>
                            {/* FAB: 360 View */}
                            <div className="absolute bottom-6 right-6">
                                <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                                    <span className="material-symbols-outlined text-[20px]">360</span>
                                    <span className="text-xs tracking-wider uppercase">360° View</span>
                                </button>
                            </div>
                        </motion.div>

                        {/* Thumbnails */}
                        <div className="grid grid-cols-5 gap-3">
                            {product.gallery.map((img, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setActiveImageIndex(idx)}
                                    className={`aspect-square rounded-lg border-2 overflow-hidden cursor-pointer transition-all ${activeImageIndex === idx
                                        ? "border-primary"
                                        : "border-white/10 hover:border-primary/50"
                                        }`}
                                >
                                    <div
                                        className="w-full h-full bg-cover bg-center"
                                        style={{ backgroundImage: `url("${img}")` }}
                                    ></div>
                                </div>
                            ))}
                            <div className="aspect-square rounded-lg border border-white/10 bg-white/5 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
                                <span className="material-symbols-outlined text-white/50">play_circle</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Product Details */}
                    <div className="lg:col-span-5 space-y-8">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <div className="flex text-amber-400">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <span key={star} className="material-symbols-outlined fill-gold text-sm">star</span>
                                    ))}
                                </div>
                                <span className="text-sm font-bold text-white/50">{product.rating} ({product.reviews} reviews)</span>
                            </div>
                            <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-white">{product.title}</h1>
                            <div className="flex items-baseline gap-4">
                                <span className="text-3xl font-light text-white">${product.price}</span>
                                <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
                                    <span className="text-primary font-bold text-sm">${product.memberPrice}</span>
                                    <span className="text-[10px] uppercase font-bold text-primary tracking-widest">Member Price</span>
                                </div>
                            </div>
                            <p className="mt-4 text-white/70 leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        {/* Product Sections */}
                        <div className="space-y-6">
                            {/* Scent Profile */}
                            <div className="p-5 rounded-xl border border-white/10 bg-white/5">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Scent Profile</h3>
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-primary">forest</span>
                                        <div>
                                            <p className="text-sm font-bold text-white">{product.scent.base}</p>
                                            <p className="text-[10px] uppercase text-white/50">Base Note</p>
                                        </div>
                                    </div>
                                    <div className="h-8 w-px bg-white/10"></div>
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-primary">potted_plant</span>
                                        <div>
                                            <p className="text-sm font-bold text-white">{product.scent.top}</p>
                                            <p className="text-[10px] uppercase text-white/50">Top Note</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* What it is */}
                            <div className="border-t border-white/10 pt-6">
                                <button className="flex items-center justify-between w-full group">
                                    <span className="text-lg font-bold text-white">What it is</span>
                                    <span className="material-symbols-outlined text-white/50 group-hover:text-primary transition-colors">expand_more</span>
                                </button>
                                <div className="mt-3 text-sm text-white/70 leading-relaxed">
                                    {product.longDescription}
                                </div>
                            </div>

                            {/* How to Use */}
                            <div className="border-t border-white/10 pt-6">
                                <div className="flex items-center justify-between w-full mb-4">
                                    <span className="text-lg font-bold text-white">How to Use</span>
                                    <span className="text-xs font-bold text-primary uppercase cursor-pointer hover:underline">Full Guide</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative aspect-video rounded-lg overflow-hidden bg-black group cursor-pointer">
                                        <div
                                            className="absolute inset-0 opacity-60 bg-center bg-cover"
                                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBYrRaSz3DIoUe3TZcY4ZhZw-zzfd72gPFHctnjJM-ip-8RpAssa4v5e5eWsRi91_V21UugDzJd9csixqPC2wXoADv9KHPHun-H6lbH7qxPX3m5M24gLATmKnQKOArfEBrI7PgbufIhHXyEflnlqv9VsCcKQ5LH4Tj2n7_qZfjPamTzcvSAAkRuvLw1Dz-G4r4PYhsDktHaTg4EGsGOrUjnTlD0KOtqxsDwpRa_lrffqvey7ZNJfBdolYpGEMHywtNoydWWGNPp7v4C")' }}
                                        ></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-white text-4xl opacity-80 group-hover:scale-110 transition-transform">play_circle</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center space-y-2">
                                        <p className="text-xs leading-relaxed text-white/70"><span className="font-bold text-white">1.</span> Scoop a dime-sized amount.</p>
                                        <p className="text-xs leading-relaxed text-white/70"><span className="font-bold text-white">2.</span> Emulsify in palms until warm.</p>
                                        <p className="text-xs leading-relaxed text-white/70"><span className="font-bold text-white">3.</span> Work through damp or dry hair.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Key Ingredients */}
                            <div className="border-t border-white/10 pt-6">
                                <span className="text-lg font-bold block mb-4 text-white">Key Ingredients</span>
                                <div className="grid grid-cols-3 gap-4">
                                    {product.ingredients.map((ing, i) => (
                                        <div key={i} className="flex flex-col items-center gap-2 p-3 rounded-lg bg-white/5 border border-transparent hover:border-primary/30 transition-all">
                                            <span className="material-symbols-outlined text-primary">{ing.icon}</span>
                                            <span className="text-[10px] font-bold uppercase tracking-tighter text-white">{ing.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Barber Tip */}
                            <div className="relative p-6 rounded-xl bg-white/5 border border-white/10 overflow-hidden">
                                <div className="absolute -right-4 -top-4 opacity-10">
                                    <span className="material-symbols-outlined text-[100px] text-white">format_quote</span>
                                </div>
                                <div className="relative flex gap-4">
                                    <div className="size-12 rounded-full border-2 border-primary overflow-hidden shrink-0">
                                        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDQ_1S29-AKrd6NJEoG-Xy1yY1nad0DtiRzZqiwJiPvyFMnbqqbW9qFw9FxXj6jBVf7w1-G2X5z4a5XO3tcf2yQA0wmE36gUYSb0-NG4bSXSrxj6p4xJMX9pYoRkN5TnDzdECFREyP9w_IwOCFSZ_IXEv3GcGLp393O774C22PilqZqA-Q3BBH2igmSMaknrQ46HhwRm3Xkr-4eL1PbcKJ_jLTnFN4KK2mzGG17vFpBmeWBB5HZjkrGpW21Yj6H2td13VgMxpqbREry")' }}></div>
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold uppercase text-primary tracking-widest mb-1">Barber Tip</h4>
                                        <p className="text-sm italic text-white/70 leading-relaxed mb-2">
                                            "Apply to slightly damp hair for maximum control and a slicker look, or bone-dry hair for that gritty, modern texture."
                                        </p>
                                        <p className="text-[10px] font-bold uppercase text-white">— Marco, Head Barber</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-white/10 rounded-lg bg-white/5">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-4 py-3 hover:text-primary transition-colors text-white"
                                    >
                                        <span className="material-symbols-outlined text-sm">remove</span>
                                    </button>
                                    <span className="w-8 text-center font-bold text-white">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="px-4 py-3 hover:text-primary transition-colors text-white"
                                    >
                                        <span className="material-symbols-outlined text-sm">add</span>
                                    </button>
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 bg-primary text-white font-bold py-4 rounded-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                                >
                                    <span className="material-symbols-outlined">add_shopping_cart</span>
                                    Add to Cart
                                </button>
                            </div>
                            <button className="w-full py-4 rounded-lg border border-primary text-primary font-bold hover:bg-primary/5 transition-colors uppercase text-xs tracking-widest">
                                Subscribe & Save 20%
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Sticky Add to Cart Bar */}
            <div
                className={`fixed bottom-0 left-0 right-0 z-[60] bg-surface-dark border-t border-white/10 shadow-2xl transition-transform duration-300 ${showSticky ? 'translate-y-0' : 'translate-y-full'}`}
            >
                <div className="max-w-[1280px] mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="hidden md:flex items-center gap-4">
                        <div
                            className="size-12 rounded-lg bg-cover bg-center"
                            style={{ backgroundImage: `url("${product.gallery[0]}")` }}
                        ></div>
                        <div>
                            <h5 className="text-sm font-bold truncate max-w-[200px] text-white">{product.title}</h5>
                            <p className="text-xs text-white/50">${product.price} <span className="text-primary font-bold ml-1">(${product.memberPrice} Member)</span></p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="hidden lg:flex items-center gap-1 text-amber-400">
                            <span className="material-symbols-outlined text-sm fill-gold">star</span>
                            <span className="text-xs font-bold text-white/50">{product.rating}</span>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 md:w-48 bg-primary text-white font-bold py-3 rounded-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined text-sm">shopping_cart</span>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-20 border-t border-white/10 py-12 px-6 bg-surface-dark">
                <div className="max-w-[1280px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <Link href="/" className="flex items-center gap-3">
                                <div className="size-6 text-primary">
                                    <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor"></path>
                                        <path d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor"></path>
                                    </svg>
                                </div>
                                <h2 className="text-white text-lg font-extrabold tracking-tight">PREMIUM CUTS</h2>
                            </Link>
                        </div>
                        <p className="text-sm text-white/50 max-w-sm">
                            Professional grooming essentials for the discerning gentleman. Excellence in every cut, precision in every product.
                        </p>
                    </div>
                    <div>
                        <h6 className="font-bold text-xs uppercase tracking-widest mb-4 text-white">Support</h6>
                        <ul className="space-y-2 text-sm text-white/50">
                            <li><a className="hover:text-primary" href="#">Shipping</a></li>
                            <li><a className="hover:text-primary" href="#">Returns</a></li>
                            <li><a className="hover:text-primary" href="#">FAQ</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
}

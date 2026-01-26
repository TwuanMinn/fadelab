// Barber Data
export interface BarberData {
    id: number;
    name: string;
    image: string;
    specialty: string;
    status: "available" | "busy" | "booked" | "offline";
    nextAvailable?: string;
    rating: number;
    experience: string;
    bio?: string;
}

export const BARBERS: BarberData[] = [
    {
        id: 1,
        name: "Mark D.",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuA0qHa9GG916Tc_uBvB2_hjkpFEhLzoDqkqKuGpYklGdSO2P1mt5UWZTcEqzHrLnFgalJ08ZSDX-ZMMnW6DYCUcadwjk2t_IqzbDPHCSLHEJoqMCqW0uS-99QwT0Kjo4HLo1j23Lz1alIyue4TQOJyIj6w8n5_MxUmL5w3JhLHMFipgdUP2s44ZSX4snDxSmdl1Yr-zAetCbZAvZacCspOplBiaQRJXOmKwasPxHlOQyhl3sSbJlWm9vTfTT-O26ZwwXIrTDe6w3oSd",
        specialty: "Master Stylist",
        status: "available",
        rating: 4.9,
        experience: "8+ Years",
        bio: "Specializing in modern fades and classic cuts with a contemporary twist.",
    },
    {
        id: 2,
        name: "James K.",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAWBOlqQi020RlUJunvPdoD2RV26Rade-KRK8ir5mG0DN-bAEi723sSrGDYbc2d9IRJvCiDKE3lBzLDvAWRmhh8xMGl6Iy_vypBaPu5_7A3TH9z0jjuF5mVIdMzIY-7XOnultOErYc59X7bGIMRpOk9xTQeEOvPj7NVO8Fz66EhelEqsxp4nNCvNgN68VlTcirUBzOT8aR92Nb8VoMzRcGj6ouHMeoOWxpZcbxn4ELpM_uX3AxXa7U-AybkhLLXQaLF1Wb5moNL3Hkd",
        specialty: "Fade Specialist",
        status: "busy",
        nextAvailable: "2:00 PM",
        rating: 4.8,
        experience: "6+ Years",
        bio: "Known for precision fades and attention to detail.",
    },
    {
        id: 3,
        name: "Sarah M.",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAaqYTQ5iC-pnGpVWKxQpRXxr_AZWQhYEuNUwSUm6ikdl8MzxV2SJmWwg5dw8aWba3tE6DGHvEVgmRKwdDIEcUAauYz1OyutyGvfV8bixJY1zdwdgoyI1UrRBCczmEBAtaTDuBKp3gvot_bOjRyDPheTQc-yjy4r1KEx6tizTS4u2Ksn91p7KXL8dfY03pt8bn7OFFMOTGTe0VzPpRqE4aMqB-8VJmJFC8UsOktum2kJYRApkmcCxjBzcs5NYavw5s2gUz4tLyvYAE0",
        specialty: "Beard Expert",
        status: "booked",
        rating: 4.9,
        experience: "5+ Years",
        bio: "Expert in beard styling and grooming, with a gentle touch for hot towel shaves.",
    },
    {
        id: 4,
        name: "David L.",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuA1AofsJTDOCwx04Qy58ckD5-660yfEzK17mAw89h25AtC0JiYDAITpgSdRQ_nG9y_nlvvE3MRQopm0t_iWJ0se42u5xWnrSfgz-ouO4RfdSWJM-VFZe3sAR7sv6OwCUvAmC1Gsn-TciFvhDt8rxzz4rYfdxraWJM9YoAcfTjlAaekvGBlQYmFgqX89K4cj2v5iC6tjtkUh4rxHklBa17Xjg9QBPDwnvpv8rFENZjjdQQtze72YK1dQIqf5XsW7gkyWJnmx0Eg0cNAN",
        specialty: "Senior Barber",
        status: "available",
        rating: 4.7,
        experience: "10+ Years",
        bio: "Veteran barber with expertise in all styles from classic to contemporary.",
    },
    {
        id: 5,
        name: 'Jason "The Fade" Miller',
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCK2yCOLz9X5syA1VWcvnqx5qKLgny1cR_8mlJcwm4jQGfEXCtuCIAoouD_3_m0yKyZa7Zd1HtVv7eCTfoEOQEYHauG_DGbvFDv8A4zoqCd_7_19fNJwWctUgKbOvIBEDRD8BCQE4TXmImjOiIubeOPid_RLMl9ZW9mZH83sRNAB8o9eTSeIDOJd2lDeNLFan--XkKmzXgdF8KFb-254Xa8krbu4GFpoBCHtGoPikR86-Mu53u6e4mHo8W7jD_8q6EVHxxEco70T1_2",
        specialty: "Master Stylist • Barber of the Month",
        status: "available",
        rating: 5.0,
        experience: "10+ Years",
        bio: "Voted top stylist in the city for three consecutive years. Specializes in classic straight razor shaves and modern texturizing techniques.",
    },
];

// Services Data
export interface ServiceData {
    id: string;
    name: string;
    description: string;
    price: number;
    duration: number; // in minutes
    icon: string;
    features: string[];
    popular?: boolean;
}

export const SERVICES: ServiceData[] = [
    {
        id: "quick-trim",
        name: "Quick Trim",
        description:
            "Perfect for maintenance between full cuts. Includes line-up and neck shave.",
        price: 30,
        duration: 20,
        icon: "speed",
        features: ["Edge Line-up", "Neck Shave", "Product Styling"],
        popular: false,
    },
    {
        id: "classic-cut",
        name: "Classic Cut",
        description:
            "Our signature service. Full consultation, wash, precision cut, and style.",
        price: 50,
        duration: 45,
        icon: "content_cut",
        features: ["Hair Wash & Conditioning", "Scissor & Clipper Cut", "Hot Towel Finish"],
        popular: true,
    },
    {
        id: "premium",
        name: "Premium Experience",
        description:
            "The ultimate grooming package. Full haircut plus beard sculpt and mini-facial.",
        price: 85,
        duration: 75,
        icon: "diamond",
        features: ["Everything in Classic", "Beard Sculpt & Oil", "Relaxing Face Massage"],
        popular: false,
    },
    {
        id: "beard-trim",
        name: "Beard Trim",
        description: "Expert beard shaping and styling with premium oils.",
        price: 25,
        duration: 20,
        icon: "face",
        features: ["Beard Shaping", "Hot Towel Treatment", "Beard Oil Finish"],
        popular: false,
    },
    {
        id: "hot-shave",
        name: "Hot Towel Shave",
        description: "Traditional straight razor shave with hot towel treatment.",
        price: 40,
        duration: 30,
        icon: "cleaning_services",
        features: ["Hot Towel Prep", "Straight Razor Shave", "Aftershave Treatment"],
        popular: false,
    },
];

// Testimonials Data
export interface TestimonialData {
    id: number;
    name: string;
    avatar: string;
    role: string;
    rating: number;
    text: string;
}

export const TESTIMONIALS: TestimonialData[] = [
    {
        id: 1,
        name: "Alex Richardson",
        avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBeqPMNYIkd9EyzBqCl90RzS5YBk-Pk62gw56wnZoyp7Xr4ISTOGXoLxJBDUntebJSWZrm2ezNC7QbEFv-9K0AUClg_Mpx3CHWyV_yN7VhMdSkB4MKtXZGNDummxkgh_t2zSYh3_LwW6vutggQep7NTrY1S7mUuLYK3gmu1_bQKMjff2ODY2jA8mQYcr44QQ2ZzLC-qTUu3ritXoBbxiwBoq3iVGHWOQ2ymtTieiwKplTs6cO2IwcEaOq_0pWQAcJnRGyH0IqWzqGZe",
        role: "Regular Client",
        rating: 5,
        text: "Best vibe in town. Jason never misses. The attention to detail on the fade is something I haven't found anywhere else in the city.",
    },
    {
        id: 2,
        name: "Michael Turner",
        avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAwUvD1KzIK14Hh553WW3ITb9B9lyr37fsqH8sdZyyGo6A9QTFBfXm3HaPCt0HTzfRP0b40SA7pEF4PZ1DOo8OQjThlD5lIBFQbb-V2GnWsvmz0HfMjmu9s8x9RKJZS8O_Q_xU5wG0PbygdH5SrOYh4vGEhRBMsIpvCw_wRNnpyrvlgRdZutclXT3eDgInHKUi7IxMaMOXoB4x9sf4orZh4bLz7bRnbYQZ7rMizxOCSBkI9Wbr7J26RcST9CjnNaREwBOuKQGw3eaSB",
        role: "Classic Cut",
        rating: 5,
        text: "Finally found a place that understands how to handle longer hair. The atmosphere is super chill and the service is top notch.",
    },
    {
        id: 3,
        name: "Marcus Johnson",
        avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBAaXXcwVkTLi1yaciH_WWRFntIjqWYYfHxpQfS3J6H3lt6N8NxusKb4_R6wvUziFpoSTwOdmQTNpLcTKdj7MS8d3jcO9vw0ggu3xT2ipsTGKn5-llYQYCS8-QM2YCYmjWOd3L0IXHsFXFauKerH4Fyz0ELmwfMZKZ50TfABwbuQoKt51_iaf6nPHhcsUlg1-meCFzwD725Iv2sDwzs7fEsGvCvF7k37b7NkHk6BJdrKs0qYVmipzC0OnZ_aMMmQ2dPzvvPiZr72y-y",
        role: "Premium Member",
        rating: 5,
        text: "The premium experience is worth every penny. The hot towel shave is unbelievably relaxing. Highly recommend making a reservation.",
    },
    {
        id: 4,
        name: "David Chen",
        avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuA0qHa9GG916Tc_uBvB2_hjkpFEhLzoDqkqKuGpYklGdSO2P1mt5UWZTcEqzHrLnFgalJ08ZSDX-ZMMnW6DYCUcadwjk2t_IqzbDPHCSLHEJoqMCqW0uS-99QwT0Kjo4HLo1j23Lz1alIyue4TQOJyIj6w8n5_MxUmL5w3JhLHMFipgdUP2s44ZSX4snDxSmdl1Yr-zAetCbZAvZacCspOplBiaQRJXOmKwasPxHlOQyhl3sSbJlWm9vTfTT-O26ZwwXIrTDe6w3oSd",
        role: "Elite Member",
        rating: 5,
        text: "Been coming here for 2 years now. The quality never drops. They remember my preferences every time.",
    },
];

// Social Feed Images
export const SOCIAL_IMAGES = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDvfAtv59srVAeZIZnSrScjbRBKkEg-ZMhHO82GGsNlbDlTDS8qLcIZruhFy-TZvJopcE9idZRxwmJb2Rsepg9FQjS-oNLa2BSNjKfwenmovF4f7MwnpjNY3apvGvS6HQJyubUQ669vh24eYGidEs-lOtOShyT-3hC5vwwRH2MW4MMUxIDg5RNL3etNy3RWAijVY_zwUQ3dGAZ6TPkbcGFFvQ9hEOuUAt4yboUYHTVV8nyU8yjDlhqkE1RjdCiwcmOyWczjgPqlivVu",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDZEZqtjG2I421S0GG2Re1oAyBuw_0v62ANUMfkEaD2IjVzAI5KadWpkEKIhYuqbCxaYoOEgOIdpBZav4RuZp76bFqA9DRinUT37vigxi5LmvJpKjTxT45oSV9JpDoadfCuIXv8jnJGbp-ClrRnPyElC4XAwOdUDd0_3AAeNpI2RZ1ri3JOQS1KNwny_TnvCSARRVlsVE3JlTglOhCTIbabv4ZYWYITM53xFBJ0KPgMqSk6Mg-LsrXCInSyjFMgU77G8GLQ5fofRgxk",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDJg7E1MWeasGtL1ot-bTtqR7_IV3rwDLACt7pZjHWEGGcsYTCasszlnL9WT5fzU3Aqe036SpesKJ3T6CvxgJkRxt03z2I-4_ew0GKn5jrlmLyrmitzRacDoMh5YW-xcz6hWF0Xp7tP9fDBvO7B2zpgiPAJR70Cft4Cq5EaH27daJt8pXQ8mvEmg_Bnh5uZbSORekLwaP7Gzmwh6ZErHfOwD0DcepTjZ4UgDIEvIPNa39GQp617C1RAVw4b7nAqhgqwKmEp1yMgiWMF",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAGRkihqRmGGmoZOh-YR02Ma8AxKYOAMDdwVYx2Na4zpQZquDuAJskscoqhewRhnfV97xa0SuKErtm41QB6SOV8u8E1TzpuuQsOwQ2kKSvmHQTJdAXPNq_yiFUPY3oRq1SFAJ3lpn8DzOsS3pU8Y0Br52i-JanPtVH4ivJUikK59inP1hHqVeHKKYbJNWW-9hLD7d76rZ0aG2w1y9iAMIJGcNu1sig2rR0Ki0LAzJFCCjz7-lULOZbl2ge4uPaDzdc1RM_iDTc6ggJJ",
];

// Business Info
export const BUSINESS_INFO = {
    name: "FadeLab",
    tagline: "Premium Grooming",
    description:
        "Experience the art of grooming at FadeLab. Precision cuts and premium shaves.",
    established: 2018,
    address: {
        street: "123 Barber St.",
        area: "Downtown District",
        city: "New York",
        state: "NY",
        zip: "10001",
    },
    contact: {
        phone: "(555) 123-4567",
        email: "book@fadelab.com",
    },
    hours: {
        weekday: "9am - 8pm",
        saturday: "10am - 6pm",
        sunday: "Closed",
    },
    social: {
        instagram: "@FadeLab",
        twitter: "@FadeLab",
    },
};

// Hero Section Words
export const HERO_WORDS = ["Fresh Cut", "New Look", "Best Fade", "Style Upgrade"];

// Navigation Items
export const NAV_ITEMS = [
    { label: "Home", href: "/" },
    { label: "Barbers", href: "/barbers" },
    { label: "Services", href: "/#services" },
    { label: "Shop", href: "/shop" },
    { label: "Memberships", href: "/memberships" },
];

// Profile Navigation Items
export const PROFILE_NAV_ITEMS = [
    { id: "dashboard", label: "Dashboard", icon: "grid_view" },
    { id: "bookings", label: "My Bookings", icon: "calendar_month" },
    { id: "history", label: "Style History", icon: "history" },
    { id: "gallery", label: "Visual Archive", icon: "photo_library" },
    { id: "subscriptions", label: "Membership Plans", icon: "workspace_premium" },
    { id: "rewards", label: "Rewards & Status", icon: "stars" },
    { id: "payments", label: "Payment Methods", icon: "account_balance_wallet" },
    { id: "giftcards", label: "Gift Modules", icon: "redeem" },
    { id: "referrals", label: "Refer a Friend", icon: "group_add" },
    { id: "shop", label: "Lab Shop", icon: "shopping_bag" },
    { id: "preferences", label: "Service Vibe", icon: "tune" },
    { id: "security", label: "Clearance & Auth", icon: "lock" },
    { id: "notifications", label: "Signal History", icon: "notifications" },
    { id: "legal", label: "Legal & Policies", icon: "policy" },
    { id: "help", label: "Help Center", icon: "help" },
];

// Membership Plans
export interface MembershipPlan {
    id: string;
    name: string;
    price: number;
    description: string;
    features: string[];
    popular?: boolean;
}

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
    {
        id: "standby",
        name: "Standby",
        price: 0,
        description: "Basic tactical grooming",
        features: ["Online Booking", "History Archive", "Basic Rewards"],
        popular: false,
    },
    {
        id: "elite",
        name: "Elite",
        price: 45,
        description: "Priority execution protocol",
        features: [
            "2 Priority Cuts / Mo",
            "Scalp Massage Matrix",
            "10% Product Discount",
            "Unlimited Wash & Style",
        ],
        popular: true,
    },
    {
        id: "legendary",
        name: "Legendary",
        price: 85,
        description: "Absolute style dominance",
        features: [
            "4 Priority Cuts / Mo",
            "Full Facial Treatment",
            "20% Product Discount",
            "VIP Event Access",
            "Dedicated Concierge",
        ],
        popular: false,
    },
];

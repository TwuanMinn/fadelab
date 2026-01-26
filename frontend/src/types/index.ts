// Product Types
export interface Product {
  id: string;
  name: string;
  price: number;
  img: string;
  category: string;
  description?: string;
  inStock?: boolean;
  rating?: number;
  reviews?: number;
}

// Cart Types
export interface CartItem extends Product {
  quantity: number;
}

export interface CartStore {
  items: CartItem[];
  total: number;
  itemCount: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

// User & Auth Types
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
}

export interface AuthContextType {
  user: User | null;
  signUp: (email: string, password: string) => Promise<{ error?: string }>;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  loading: boolean;
}

// Barber Booking Types
export interface Barber {
  id: number;
  name: string;
  img: string;
  specialties?: string[];
  rating?: number;
  status?: 'Available' | 'Busy' | 'Booked';
  nextAvailable?: string;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
  description?: string;
  popular?: boolean;
}

export interface Addon {
  id: string;
  name: string;
  price: number;
  desc: string;
}

export interface Booking {
  barberId: number;
  serviceId: string;
  selectedAddons: string[];
  date: Date;
  time: string;
  total: number;
}

// Payment Types
export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  payment_method?: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Search Types
export interface SearchResult {
  id: string;
  title: string;
  description?: string;
  category: string;
  price?: number;
  image?: string;
}

// Error Types
export interface AppError {
  message: string;
  code?: string;
  statusCode?: number;
}
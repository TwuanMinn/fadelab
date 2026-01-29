// ==================== PRODUCT TYPES ====================

export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  img: string;
  category: string;
  description?: string;
  rating?: number;
  stock?: number;
  created_at?: string;
}

// ==================== CART TYPES ====================

export interface CartItem {
  id: number;
  name: string;
  price: number;
  img: string;
  quantity: number;
  category: string;
}

export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  img: string;
  category: string;
  rating: number;
}

// ==================== USER & AUTH TYPES ====================

export interface User {
  id: string;
  email: string;
  full_name?: string;
  phone?: string;
  avatar_url?: string;
  created_at?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  avatar_url?: string;
  created_at: string;
  updated_at?: string;
}

// ==================== BARBER TYPES ====================

export interface Barber {
  id: string;
  name: string;
  title: string;
  bio?: string;
  image?: string;
  img?: string; // Alias for compatibility
  specialty?: string[];
  specialties?: string[]; // Alias for compatibility  
  rating: number;
  reviews_count: number;
  years_experience: number;
  is_available: boolean;
  created_at?: string;
  // UI-specific fields
  status?: string;
  color?: string;
  exp?: string;
  trait?: string;
  traitIcon?: string;
  role?: string;
}

// ==================== SERVICE TYPES ====================

export interface Service {
  id: string;
  name: string;
  description?: string;
  price: number;
  duration: number; // in minutes
  category?: string;
  image?: string;
  popular?: boolean;
  created_at?: string;
}

export interface Addon {
  id: string;
  name: string;
  price: number;
  desc: string;
}

// ==================== BOOKING TYPES ====================

export interface TimeSlot {
  id: string;
  barber_id: string;
  date: string;
  start_time: string;
  end_time: string;
  is_booked: boolean;
  created_at?: string;
}

export interface BookingTimeSlot {
  time: string;
  endTime: string;
  available: boolean;
  slotId?: string;
}

export interface Appointment {
  id: string;
  user_id: string;
  barber_id: string;
  service_id: string;
  date: string;
  start_time: string;
  end_time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  total_price: number;
  created_at?: string;
  // Joined data
  barbers?: Barber;
  services?: Service;
}

// Legacy booking type for compatibility
export interface Booking {
  id?: string;
  barberId: number | string;
  serviceId: string;
  selectedAddons?: string[];
  date: Date;
  datetime?: Date;
  time: string;
  total: number;
  totalPrice?: number;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

// ==================== ORDER TYPES ====================

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export interface Order {
  id: string;
  user_id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shipping_address: ShippingAddress;
  payment_method: string;
  payment_status: string;
  tracking_number?: string;
  created_at: string;
  updated_at: string;
}

// ==================== REVIEW TYPES ====================

export interface BarberReview {
  id: string;
  barber_id: string;
  user_id: string;
  rating: number;
  comment?: string;
  created_at: string;
  // Joined data
  profiles?: UserProfile;
}

export interface ProductReview {
  id: number;
  user_id: string;
  product_id: number;
  rating: number;
  title?: string;
  content: string;
  created_at: string;
}

// ==================== API TYPES ====================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ==================== SEARCH TYPES ====================

export interface SearchResult {
  id: string;
  title: string;
  description?: string;
  category: string;
  price?: number;
  image?: string;
  type: 'product' | 'service' | 'barber';
}

// ==================== ERROR TYPES ====================

export interface AppError {
  message: string;
  code?: string;
  statusCode?: number;
}

// ==================== FORM TYPES ====================

export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface NewsletterFormData {
  email: string;
}

// ==================== UTILITY TYPES ====================

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
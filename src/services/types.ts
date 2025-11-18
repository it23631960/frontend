// Backend API Types - matching your Spring Boot backend structure
export interface BackendSalon {
  id?: string;
  name: string;
  description: string;
  bannerImage: string;
  images: string[];
  reviews: string[];
  address: string;
  phone: string;
  email: string;
  services: string[];
  openTime: string;
  closeTime: string;
  available: boolean;
  manager: string;
  bookings: string[];
  slotsBooked: string[];
}

// Frontend display types (mapped from backend)
export interface ApiSalon {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  address: string;
  distance: string;
  priceRange: string;
  image: string;
  services: string[];
  isOpen: boolean;
  hours: string;
  phone: string;
  specialties: string[];
  website?: string;
  description: string;
  email: string;
  manager: string;
  images: string[];
  reviews: string[];
  available: boolean;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

// Create/Update salon request type
export type CreateSalonRequest = Omit<BackendSalon, 'id'>;
export type UpdateSalonRequest = BackendSalon;
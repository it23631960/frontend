// Booking System Types

export interface Service {
  id: string;
  name: string;
  category: 'Haircut' | 'Coloring' | 'Styling' | 'Treatments' | 'Extensions' | 'Hair' | 'Nails' | 'Spa' | 'Makeup' | 'Waxing' | 'General';
  duration: number; // in minutes
  price: number;
  description: string;
  includes: string[];
  addOns?: string[];
  image?: string;
  popular?: boolean;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  experience: number; // years
  image: string;
  available: boolean;
  bio?: string;
  specialties: string[];
  portfolioImages?: string[];
}

export interface TimeSlot {
  time: string;
  available: boolean;
  popular?: boolean;
  staffId: string;
  lastSpot?: boolean;
  id?: string; // Backend timeSlot ID
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests?: string;
  isFirstTime: boolean;
}

export interface BookingData {
  salonId: string;
  serviceId: string | null;
  staffId: string | null;
  date: string | null;
  time: string | null;
  timeSlotId?: string | null; // Backend time slot ID
  customerInfo: Partial<CustomerInfo>;
  specialRequests: string;
  promoCode?: string;
  totalPrice: number;
}

export interface BookingConfirmation {
  id: string;
  referenceNumber: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  salon: {
    name: string;
    address: string;
    phone: string;
  };
  service: Service;
  staff: StaffMember;
  dateTime: string;
  customerInfo: CustomerInfo;
  totalPrice: number;
  createdAt: string;
}

export interface AvailabilityResponse {
  date: string;
  timeSlots: TimeSlot[];
}

// Booking step enum
export enum BookingStep {
  SERVICE = 1,
  STAFF = 2,
  DATETIME = 3,
  CUSTOMER_INFO = 4,
  CONFIRMATION = 5
}

// Booking status
export type BookingStatus = 'draft' | 'processing' | 'confirmed' | 'failed';

// API request types
export interface CreateBookingRequest {
  salonId: string;
  serviceId: string;
  staffId: string;
  date: string;
  time: string;
  timeSlotId?: string; // Backend time slot ID
  customerInfo: CustomerInfo;
  specialRequests?: string;
  promoCode?: string;
}

export interface AvailabilityRequest {
  salonId: string;
  serviceId: string;
  staffId?: string;
  date: string;
}
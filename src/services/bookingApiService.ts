import { 
  Service, 
  StaffMember, 
  AvailabilityResponse, 
  BookingConfirmation, 
  CreateBookingRequest,
  AvailabilityRequest 
} from '../types/booking';
import { DEFAULT_HEADERS, API_CONFIG } from '../config/api';

// Base configuration
const API_BASE_URL = API_CONFIG.BASE_URL;

// Custom error class for booking API errors
export class BookingApiError extends Error {
  constructor(public status: number, message: string, public code?: string) {
    super(message);
    this.name = 'BookingApiError';
  }
}

// Generic API request handler
async function apiRequest<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...DEFAULT_HEADERS,
        ...options.headers,
      },
    });

    if (response.status === 404) {
      throw new BookingApiError(404, 'Resource not found');
    }

    if (response.status === 400) {
      const errorData = await response.json().catch(() => ({}));
      throw new BookingApiError(400, errorData.message || 'Invalid request data');
    }

    if (response.status === 409) {
      throw new BookingApiError(409, 'Time slot no longer available');
    }

    if (response.status === 500) {
      throw new BookingApiError(500, 'Server error. Please try again later.');
    }

    if (!response.ok) {
      throw new BookingApiError(
        response.status,
        `HTTP ${response.status}: ${response.statusText}`
      );
    }

    // Handle 201 Created responses
    if (response.status === 201 || response.status === 200) {
      const data = await response.json();
      return data;
    }

    return {} as T;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new BookingApiError(0, 'Network error. Please check your connection.');
    }
    
    if (error instanceof BookingApiError) {
      throw error;
    }

    throw new BookingApiError(500, 'An unexpected error occurred');
  }
}

// Real Booking API Service (connects to Spring Boot backend)
export const bookingApiService = {
  /**
   * Get all services (Spring Boot endpoint)
   */
  async getServices(_salonId: string): Promise<Service[]> {
    const services = await apiRequest<any[]>(`${API_BASE_URL}/services`);
    
    // Transform backend Service model to frontend Service interface
    return services.map(s => ({
      id: s.id,
      name: s.name,
      category: s.category || 'General',
      duration: s.durationMinutes || 60,
      price: s.price,
      description: s.description || '',
      includes: [s.name], // Basic mapping - can be enhanced
      addOns: [],
      popular: false
    }));
  },

  /**
   * Get all staff members for a specific salon
   * TODO: Implement staff management in backend
   */
  async getStaff(_salonId: string): Promise<StaffMember[]> {
    // Return "Any Available" option for now
    return [{
      id: 'any',
      name: 'Any Available Stylist',
      role: 'Any Staff',
      specialty: 'General Services',
      rating: 4.8,
      reviewCount: 0,
      experience: 0,
      image: '/images/any-staff.jpg',
      available: true,
      specialties: ['All Services']
    }];
  },

  /**
   * Get availability for a specific date (Spring Boot endpoint)
   */
  async getAvailability(request: AvailabilityRequest): Promise<AvailabilityResponse> {
    const params = new URLSearchParams({
      salonId: request.salonId,
      date: request.date
    });

    const slots = await apiRequest<any[]>(
      `${API_BASE_URL}/appointments/slots/available?${params}`
    );
    
    // Transform backend TimeSlot model to frontend TimeSlot interface
    return {
      date: request.date,
      timeSlots: slots.map(slot => ({
        id: slot.id, // Store backend ID
        time: `${slot.startTime.substring(0, 5)} ${parseInt(slot.startTime.split(':')[0]) >= 12 ? 'PM' : 'AM'}`,
        available: slot.isAvailable,
        staffId: '1',
        popular: false
      }))
    };
  },

  /**
   * Create a new booking (Spring Boot endpoint)
   */
  async createBooking(booking: CreateBookingRequest): Promise<BookingConfirmation> {
    // Transform frontend request to backend AppointmentRequestDTO
    const backendRequest = {
      customerName: `${booking.customerInfo.firstName} ${booking.customerInfo.lastName}`,
      customerEmail: booking.customerInfo.email,
      customerPhone: booking.customerInfo.phone,
      preferredContact: 'EMAIL',
      salonId: booking.salonId,
      serviceId: booking.serviceId,
      timeSlotId: booking.timeSlotId, // We'll need to capture this
      notes: booking.specialRequests || ''
    };

    const response = await apiRequest<any>(`${API_BASE_URL}/appointments`, {
      method: 'POST',
      body: JSON.stringify(backendRequest),
    });
    
    // Transform backend response to frontend BookingConfirmation
    return {
      id: response.id,
      referenceNumber: response.confirmationCode,
      status: response.status.toLowerCase(),
      salon: {
        name: response.salonName,
        address: response.salonAddress,
        phone: response.salonPhone
      },
      service: {
        id: response.serviceId,
        name: response.serviceName,
        category: 'General',
        duration: 60,
        price: 0,
        description: response.serviceName,
        includes: []
      },
      staff: {
        id: '1',
        name: 'Professional Stylist',
        role: 'Stylist',
        specialty: 'General',
        rating: 4.8,
        reviewCount: 0,
        experience: 5,
        image: '',
        available: true,
        specialties: []
      },
      dateTime: `${response.appointmentDate} ${response.startTime}`,
      customerInfo: {
        firstName: response.customerName.split(' ')[0],
        lastName: response.customerName.split(' ').slice(1).join(' '),
        email: response.customerEmail,
        phone: response.customerPhone,
        isFirstTime: false
      },
      totalPrice: 0,
      createdAt: response.bookingDate
    };
  },

  /**
   * Get booking by ID (Spring Boot endpoint)
   */
  async getBooking(bookingId: string): Promise<BookingConfirmation> {
    const response = await apiRequest<any>(`${API_BASE_URL}/appointments/${bookingId}`);
    
    return {
      id: response.id,
      referenceNumber: response.confirmationCode,
      status: response.status.toLowerCase(),
      salon: {
        name: response.salonName,
        address: response.salonAddress,
        phone: response.salonPhone
      },
      service: {
        id: response.serviceId,
        name: response.serviceName,
        category: 'General',
        duration: 60,
        price: 0,
        description: '',
        includes: []
      },
      staff: {
        id: '1',
        name: 'Professional Stylist',
        role: 'Stylist',
        specialty: 'General',
        rating: 4.8,
        reviewCount: 0,
        experience: 5,
        image: '',
        available: true,
        specialties: []
      },
      dateTime: `${response.appointmentDate} ${response.startTime}`,
      customerInfo: {
        firstName: response.customerName.split(' ')[0],
        lastName: response.customerName.split(' ').slice(1).join(' '),
        email: response.customerEmail,
        phone: response.customerPhone,
        isFirstTime: false
      },
      totalPrice: 0,
      createdAt: response.bookingDate
    };
  },

  /**
   * Get booking by confirmation code (Spring Boot endpoint)
   */
  async getBookingByConfirmationCode(confirmationCode: string): Promise<BookingConfirmation> {
    const response = await apiRequest<any>(
      `${API_BASE_URL}/appointments/confirmation/${confirmationCode}`
    );
    
    return {
      id: response.id,
      referenceNumber: response.confirmationCode,
      status: response.status.toLowerCase(),
      salon: {
        name: response.salonName,
        address: response.salonAddress,
        phone: response.salonPhone
      },
      service: {
        id: response.serviceId,
        name: response.serviceName,
        category: 'General',
        duration: 60,
        price: 0,
        description: '',
        includes: []
      },
      staff: {
        id: '1',
        name: 'Professional Stylist',
        role: 'Stylist',
        specialty: 'General',
        rating: 4.8,
        reviewCount: 0,
        experience: 5,
        image: '',
        available: true,
        specialties: []
      },
      dateTime: `${response.appointmentDate} ${response.startTime}`,
      customerInfo: {
        firstName: response.customerName.split(' ')[0],
        lastName: response.customerName.split(' ').slice(1).join(' '),
        email: response.customerEmail,
        phone: response.customerPhone,
        isFirstTime: false
      },
      totalPrice: 0,
      createdAt: response.bookingDate
    };
  },

  /**
   * Validate promo code
   * TODO: Implement in backend
   */
  async validatePromoCode(_code: string, _salonId: string): Promise<{ valid: boolean; discount: number }> {
    return { valid: false, discount: 0 };
  }
};

// Mock data for development (when backend is not available)
export const mockBookingService = {
  async getServices(_salonId: string): Promise<Service[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      {
        id: '1',
        name: "Women's Haircut & Style",
        category: 'Haircut',
        duration: 60,
        price: 65,
        description: "Professional cut and blow-dry styling with consultation",
        includes: ["Consultation", "Shampoo", "Cut", "Style"],
        addOns: ["Deep Conditioning (+$15)", "Scalp Massage (+$10)"],
        popular: true
      },
      {
        id: '2',
        name: "Full Color & Highlights",
        category: 'Coloring',
        duration: 180,
        price: 150,
        description: "Complete color transformation with highlights",
        includes: ["Color consultation", "Full color", "Highlights", "Toner", "Style"],
        addOns: ["Gloss treatment (+$25)", "Deep conditioning (+$15)"]
      },
      {
        id: '3',
        name: "Balayage",
        category: 'Coloring',
        duration: 240,
        price: 200,
        description: "Hand-painted highlights for natural-looking dimension",
        includes: ["Consultation", "Balayage technique", "Toner", "Style"],
        popular: true
      },
      {
        id: '4',
        name: "Keratin Treatment",
        category: 'Treatments',
        duration: 120,
        price: 120,
        description: "Smoothing treatment to reduce frizz and add shine",
        includes: ["Deep cleanse", "Keratin application", "Blow dry", "Style"]
      },
      {
        id: '5',
        name: "Special Event Styling",
        category: 'Styling',
        duration: 90,
        price: 85,
        description: "Elegant updo or special occasion styling",
        includes: ["Consultation", "Styling", "Hair accessories", "Finishing spray"]
      }
    ];
  },

  async getStaff(_salonId: string): Promise<StaffMember[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return [
      {
        id: 'any',
        name: 'Any Available Stylist',
        role: 'Any Staff',
        specialty: 'General Services',
        rating: 4.8,
        reviewCount: 0,
        experience: 0,
        image: '/images/any-staff.jpg',
        available: true,
        specialties: ['All Services']
      },
      {
        id: '1',
        name: 'Sarah Martinez',
        role: 'Senior Stylist',
        specialty: 'Color Specialist',
        rating: 4.9,
        reviewCount: 156,
        experience: 8,
        image: '/images/staff1.jpg',
        available: true,
        bio: 'Expert in color correction and balayage techniques',
        specialties: ['Balayage', 'Color Correction', 'Highlights']
      },
      {
        id: '2',
        name: 'Michael Chen',
        role: 'Master Stylist',
        specialty: 'Precision Cuts',
        rating: 4.8,
        reviewCount: 203,
        experience: 12,
        image: '/images/staff2.jpg',
        available: true,
        bio: 'Specializing in modern cuts and beard styling',
        specialties: ['Precision Cuts', 'Beard Styling', 'Mens Grooming']
      },
      {
        id: '3',
        name: 'Emma Thompson',
        role: 'Style Director',
        specialty: 'Bridal Styling',
        rating: 5.0,
        reviewCount: 89,
        experience: 15,
        image: '/images/staff3.jpg',
        available: true,
        bio: 'Award-winning stylist specializing in bridal and special events',
        specialties: ['Bridal Styling', 'Updos', 'Special Events']
      }
    ];
  },

  async getAvailability(request: AvailabilityRequest): Promise<AvailabilityResponse> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const baseSlots = [
      { time: '9:00 AM', available: true, staffId: '1' },
      { time: '9:30 AM', available: false, staffId: '1' },
      { time: '10:00 AM', available: true, popular: true, staffId: '1' },
      { time: '10:30 AM', available: true, staffId: '2' },
      { time: '11:00 AM', available: true, staffId: '3' },
      { time: '11:30 AM', available: false, staffId: '1' },
      { time: '12:00 PM', available: true, staffId: '2' },
      { time: '12:30 PM', available: true, lastSpot: true, staffId: '1' },
      { time: '1:00 PM', available: false, staffId: '3' },
      { time: '1:30 PM', available: true, staffId: '2' },
      { time: '2:00 PM', available: true, popular: true, staffId: '1' },
      { time: '2:30 PM', available: true, staffId: '3' },
      { time: '3:00 PM', available: true, staffId: '2' },
      { time: '3:30 PM', available: false, staffId: '1' },
      { time: '4:00 PM', available: true, staffId: '3' },
      { time: '4:30 PM', available: true, lastSpot: true, staffId: '2' },
      { time: '5:00 PM', available: true, staffId: '1' },
      { time: '5:30 PM', available: false, staffId: '3' }
    ];

    return {
      date: request.date,
      timeSlots: baseSlots.filter(slot => 
        !request.staffId || request.staffId === 'any' || slot.staffId === request.staffId
      )
    };
  },

  async createBooking(booking: CreateBookingRequest): Promise<BookingConfirmation> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate occasional booking conflicts
    if (Math.random() < 0.1) {
      throw new BookingApiError(409, 'This time slot is no longer available');
    }
    
    return {
      id: `booking_${Date.now()}`,
      referenceNumber: `BS${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
      status: 'confirmed',
      salon: {
        name: 'Beauty Haven Salon',
        address: '123 Main St, City, State 12345',
        phone: '(555) 123-4567'
      },
      service: {
        id: booking.serviceId,
        name: "Women's Haircut & Style",
        category: 'Haircut',
        duration: 60,
        price: 65,
        description: "Professional cut and blow-dry styling",
        includes: ["Consultation", "Shampoo", "Cut", "Style"]
      },
      staff: {
        id: booking.staffId,
        name: 'Sarah Martinez',
        role: 'Senior Stylist',
        specialty: 'Color Specialist',
        rating: 4.9,
        reviewCount: 156,
        experience: 8,
        image: '/images/staff1.jpg',
        available: true,
        specialties: ['Balayage', 'Color Correction']
      },
      dateTime: `${booking.date} ${booking.time}`,
      customerInfo: booking.customerInfo as any,
      totalPrice: 65,
      createdAt: new Date().toISOString()
    };
  }
};
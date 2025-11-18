import axios, { AxiosError } from 'axios';

// API Base URL - adjust according to your backend port
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// Axios instance with default config
const appointmentApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor for adding auth token if needed
appointmentApi.interceptors.request.use(
  (config) => {
    // Add authorization token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
appointmentApi.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const errorMessage = handleAPIError(error);
    console.error('API Error:', errorMessage);
    return Promise.reject(error);
  }
);

// ==================== TYPE DEFINITIONS ====================

export interface CustomerBasicDTO {
  id: string;
  name: string;
  email: string;
  phone: string;
  preferredContact: 'EMAIL' | 'SMS' | 'BOTH';
}

export interface ServiceBasicDTO {
  id: string;
  name: string;
  category: string;
  duration: number; // minutes
  price: number;
}

export interface TimeSlotDTO {
  id: string;
  date: string; // yyyy-MM-dd
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  isAvailable: boolean;
}

export interface AppointmentResponseDTO {
  id: string;
  appointmentNumber: string;
  customer: CustomerBasicDTO;
  service: ServiceBasicDTO;
  timeSlot: TimeSlotDTO;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  paymentStatus: 'PENDING' | 'PAID' | 'REFUNDED';
  totalAmount: number;
  bookingDate: string; // ISO DateTime
  confirmedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  customerNotes?: string;
  salonNotes?: string;
  assignedStaff?: string;
}

export interface AppointmentDetailDTO extends AppointmentResponseDTO {
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address?: string;
    preferredContact: 'EMAIL' | 'SMS' | 'BOTH';
    totalAppointments: number;
    lastVisit?: string;
  };
  service: {
    id: string;
    name: string;
    category: string;
    description?: string;
    duration: number;
    price: number;
    isActive: boolean;
  };
  timeSlot: {
    id: string;
    date: string;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
    capacity: number;
    currentBookings: number;
  };
  salon: {
    id: string;
    name: string;
    phone: string;
    address: string;
  };
  paymentMethod?: string;
  paidAt?: string;
  cancelledBy?: string;
  cancellationReason?: string;
  isFirstTime: boolean;
  confirmationSent: boolean;
  reminderSent: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AppointmentStatisticsDTO {
  todayCount: number;
  pendingCount: number;
  confirmedCount: number;
  completedCount: number;
  cancelledCount: number;
  totalCount: number;
  weeklyRevenue: number;
  monthlyRevenue: number;
  todayRevenue: number;
  totalRevenue: number;
  popularServices: {
    serviceName: string;
    count: number;
    revenue: number;
  }[];
  busiestHours: {
    hour: number; // 0-23
    count: number;
  }[];
  statusDistribution: Record<string, number>;
  revenueByDay: {
    date: string; // yyyy-MM-dd
    revenue: number;
    appointmentCount: number;
  }[];
  averageRating?: number;
  retentionRate?: number;
}

export interface ConfirmAppointmentDTO {
  sendNotification?: boolean;
  notificationMethod?: 'EMAIL' | 'SMS' | 'BOTH';
  assignedStaff?: string;
  salonNotes?: string;
}

export interface CancelAppointmentDTO {
  cancelledBy: 'SALON' | 'CUSTOMER' | 'ADMIN';
  reason: string;
  notes?: string;
  sendNotification?: boolean;
  refund?: boolean;
}

export interface RescheduleAppointmentDTO {
  newTimeSlotId: string;
  reason?: string;
  sendNotification?: boolean;
}

export interface CompleteAppointmentDTO {
  paymentMethod: 'CASH' | 'CARD' | 'ONLINE';
  actualAmount: number;
  notes?: string;
}

export interface UpdateNotesDTO {
  salonNotes?: string;
  assignedStaff?: string;
}

export interface AppointmentFilterParams {
  status?: string;
  paymentStatus?: string;
  startDate?: string; // yyyy-MM-dd
  endDate?: string; // yyyy-MM-dd
  serviceId?: string;
  customerId?: string;
  assignedStaff?: string;
  page?: number;
  size?: number;
  sort?: string; // e.g., "bookingDate,desc"
}

export interface PagedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number; // current page
  first: boolean;
  last: boolean;
  empty: boolean;
}

// ==================== ERROR HANDLING ====================

export const handleAPIError = (error: AxiosError): string => {
  if (error.response) {
    // Server responded with error status
    const status = error.response.status;
    const data = error.response.data as any;
    
    switch (status) {
      case 400:
        return data.message || 'Invalid request. Please check your input.';
      case 401:
        return 'Unauthorized. Please login again.';
      case 403:
        return 'Access denied. You do not have permission.';
      case 404:
        return data.message || 'Appointment not found.';
      case 409:
        return data.message || 'Time slot conflict. Please choose another time.';
      case 500:
        return 'Server error. Please try again later.';
      default:
        return data.message || 'An unexpected error occurred.';
    }
  } else if (error.request) {
    // Request made but no response received
    return 'Network error. Please check your connection.';
  } else {
    // Error in request setup
    return error.message || 'An error occurred while processing your request.';
  }
};

// ==================== API METHODS ====================

/**
 * Get all appointments for a salon (with pagination)
 * GET /api/appointments/salon/{salonId}
 */
export const getAllAppointments = async (
  salonId: string,
  page: number = 0,
  size: number = 10,
  sort: string = 'bookingDate,desc'
): Promise<PagedResponse<AppointmentResponseDTO>> => {
  const response = await appointmentApi.get(`/appointments/salon/${salonId}`, {
    params: { page, size, sort }
  });
  return response.data;
};

/**
 * Get filtered appointments
 * GET /api/appointments/salon/{salonId}/filter
 */
export const filterAppointments = async (
  salonId: string,
  filters: AppointmentFilterParams
): Promise<PagedResponse<AppointmentResponseDTO>> => {
  const response = await appointmentApi.get(`/appointments/salon/${salonId}/filter`, {
    params: filters
  });
  return response.data;
};

/**
 * Get today's appointments for a salon
 * GET /api/appointments/salon/{salonId}/today
 */
export const getTodayAppointments = async (
  salonId: string
): Promise<AppointmentResponseDTO[]> => {
  const response = await appointmentApi.get(`/appointments/salon/${salonId}/today`);
  return response.data;
};

/**
 * Get appointment statistics for owner dashboard
 * GET /api/appointments/salon/{salonId}/statistics
 */
export const getAppointmentStatistics = async (
  salonId: string,
  period: 'day' | 'week' | 'month' = 'week'
): Promise<AppointmentStatisticsDTO> => {
  const response = await appointmentApi.get(`/appointments/salon/${salonId}/statistics`, {
    params: { period }
  });
  return response.data;
};

/**
 * Get detailed appointment by ID
 * GET /api/appointments/{appointmentId}
 */
export const getAppointmentDetails = async (
  appointmentId: string
): Promise<AppointmentDetailDTO> => {
  const response = await appointmentApi.get(`/appointments/${appointmentId}`);
  return response.data;
};

/**
 * Confirm a pending appointment
 * PUT /api/appointments/{appointmentId}/confirm
 */
export const confirmAppointment = async (
  appointmentId: string,
  data: ConfirmAppointmentDTO
): Promise<AppointmentResponseDTO> => {
  const response = await appointmentApi.put(`/appointments/${appointmentId}/confirm`, data);
  return response.data;
};

/**
 * Reschedule an appointment
 * PUT /api/appointments/{appointmentId}/reschedule
 */
export const rescheduleAppointment = async (
  appointmentId: string,
  data: RescheduleAppointmentDTO
): Promise<AppointmentResponseDTO> => {
  const response = await appointmentApi.put(`/appointments/${appointmentId}/reschedule`, data);
  return response.data;
};

/**
 * Cancel an appointment
 * PUT /api/appointments/{appointmentId}/cancel
 */
export const cancelAppointment = async (
  appointmentId: string,
  data: CancelAppointmentDTO
): Promise<AppointmentResponseDTO> => {
  const response = await appointmentApi.put(`/appointments/${appointmentId}/cancel`, data);
  return response.data;
};

/**
 * Mark appointment as completed
 * PUT /api/appointments/{appointmentId}/complete
 */
export const completeAppointment = async (
  appointmentId: string,
  data: CompleteAppointmentDTO
): Promise<AppointmentResponseDTO> => {
  const response = await appointmentApi.put(`/appointments/${appointmentId}/complete`, data);
  return response.data;
};

/**
 * Search appointments by query
 * GET /api/appointments/salon/{salonId}/search
 */
export const searchAppointments = async (
  salonId: string,
  query: string,
  page: number = 0,
  size: number = 10
): Promise<PagedResponse<AppointmentResponseDTO>> => {
  const response = await appointmentApi.get(`/appointments/salon/${salonId}/search`, {
    params: { query, page, size }
  });
  return response.data;
};

/**
 * Get calendar view of appointments
 * GET /api/appointments/salon/{salonId}/calendar
 */
export const getCalendarView = async (
  salonId: string,
  startDate: string, // yyyy-MM-dd
  endDate: string // yyyy-MM-dd
): Promise<AppointmentResponseDTO[]> => {
  const response = await appointmentApi.get(`/appointments/salon/${salonId}/calendar`, {
    params: { startDate, endDate }
  });
  return response.data;
};

/**
 * Update appointment notes
 * POST /api/appointments/{appointmentId}/notes
 */
export const updateAppointmentNotes = async (
  appointmentId: string,
  data: UpdateNotesDTO
): Promise<AppointmentResponseDTO> => {
  const response = await appointmentApi.post(`/appointments/${appointmentId}/notes`, data);
  return response.data;
};

/**
 * Export appointments to CSV/PDF
 * GET /api/appointments/salon/{salonId}/export
 */
export const exportAppointments = async (
  salonId: string,
  format: 'csv' | 'pdf' = 'csv',
  filters?: AppointmentFilterParams
): Promise<Blob> => {
  const response = await appointmentApi.get(`/appointments/salon/${salonId}/export`, {
    params: { format, ...filters },
    responseType: 'blob'
  });
  return response.data;
};

// Export default object with all methods
export default {
  getAllAppointments,
  filterAppointments,
  getTodayAppointments,
  getAppointmentStatistics,
  getAppointmentDetails,
  confirmAppointment,
  rescheduleAppointment,
  cancelAppointment,
  completeAppointment,
  searchAppointments,
  getCalendarView,
  updateAppointmentNotes,
  exportAppointments,
  handleAPIError
};

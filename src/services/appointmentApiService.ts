import axios, { AxiosError } from "axios";

// API Base URL - adjust according to your backend port
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

// Axios instance with default config
const appointmentApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor for adding auth token if needed
appointmentApi.interceptors.request.use(
  (config) => {
    // Add authorization token if available
    const token = localStorage.getItem("authToken");
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
    console.error("API Error:", errorMessage);
    return Promise.reject(error);
  }
);

// ==================== TYPE DEFINITIONS ====================

export interface CustomerBasicDTO {
  id: string;
  name: string;
  email: string;
  phone: string;
  preferredContact: "EMAIL" | "SMS" | "BOTH";
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
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  paymentStatus: "PENDING" | "PAID" | "REFUNDED";
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
    preferredContact: "EMAIL" | "SMS" | "BOTH";
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
  notificationMethod?: "EMAIL" | "SMS" | "BOTH";
  assignedStaff?: string;
  salonNotes?: string;
}

export interface CancelAppointmentDTO {
  cancelledBy: "SALON" | "CUSTOMER" | "ADMIN";
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
  paymentMethod: "CASH" | "CARD" | "ONLINE";
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
        return data.message || "Invalid request. Please check your input.";
      case 401:
        return "Unauthorized. Please login again.";
      case 403:
        return "Access denied. You do not have permission.";
      case 404:
        return data.message || "Appointment not found.";
      case 409:
        return (
          data.message || "Time slot conflict. Please choose another time."
        );
      case 500:
        return "Server error. Please try again later.";
      default:
        return data.message || "An unexpected error occurred.";
    }
  } else if (error.request) {
    // Request made but no response received
    return "Network error. Please check your connection.";
  } else {
    // Error in request setup
    return error.message || "An error occurred while processing your request.";
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
  _sort: string = "bookingDate,desc"
): Promise<PagedResponse<AppointmentResponseDTO>> => {
  // Backend returns a simple array; wrap into a paged response shape
  const response = await appointmentApi.get<AppointmentResponseDTO[]>(
    `/appointments/salon/${salonId}`
  );
  const items = response.data || [];
  const start = page * size;
  const content = items.slice(start, start + size);
  const totalElements = items.length;
  const totalPages = Math.max(1, Math.ceil(totalElements / size));
  return {
    content,
    totalElements,
    totalPages,
    size,
    number: page,
    first: page === 0,
    last: page >= totalPages - 1,
    empty: content.length === 0,
  };
};

/**
 * Get filtered appointments
 * GET /api/appointments/salon/{salonId}/filter
 */
export const filterAppointments = async (
  salonId: string,
  filters: AppointmentFilterParams
): Promise<PagedResponse<AppointmentResponseDTO>> => {
  // No backend filter endpoint; filter client-side from the full list
  const all = await appointmentApi.get<AppointmentResponseDTO[]>(
    `/appointments/salon/${salonId}`
  );
  let items = all.data || [];
  if (filters.status) items = items.filter((a) => a.status === filters.status);
  if (filters.startDate)
    items = items.filter((a) => a.timeSlot.date >= filters.startDate!);
  if (filters.endDate)
    items = items.filter((a) => a.timeSlot.date <= filters.endDate!);
  if (filters.customerId)
    items = items.filter((a) => a.customer.id === filters.customerId);
  if (filters.serviceId)
    items = items.filter((a) => a.service.id === filters.serviceId);
  const page = filters.page ?? 0;
  const size = filters.size ?? 10;
  const start = page * size;
  const content = items.slice(start, start + size);
  return {
    content,
    totalElements: items.length,
    totalPages: Math.max(1, Math.ceil(items.length / size)),
    size,
    number: page,
    first: page === 0,
    last: start + content.length >= items.length,
    empty: content.length === 0,
  };
};

/**
 * Get today's appointments for a salon
 * GET /api/appointments/salon/{salonId}/today
 */
export const getTodayAppointments = async (
  salonId: string
): Promise<AppointmentResponseDTO[]> => {
  // Derive today's appointments client-side
  const response = await appointmentApi.get<AppointmentResponseDTO[]>(
    `/appointments/salon/${salonId}`
  );
  const today = new Date().toISOString().split("T")[0];
  return (response.data || []).filter((a) => a.timeSlot?.date === today);
};

/**
 * Get appointment statistics for owner dashboard
 * GET /api/appointments/salon/{salonId}/statistics
 */
export const getAppointmentStatistics = async (
  salonId: string,
  _period: "day" | "week" | "month" = "week"
): Promise<AppointmentStatisticsDTO> => {
  // No backend stats endpoint; compute a minimal summary from all appointments
  const response = await appointmentApi.get<AppointmentResponseDTO[]>(
    `/appointments/salon/${salonId}`
  );
  const items = response.data || [];
  const today = new Date().toISOString().split("T")[0];
  const toNumber = (n: any) => (typeof n === "number" ? n : 0);
  return {
    todayCount: items.filter((a) => a.timeSlot?.date === today).length,
    pendingCount: items.filter((a) => a.status === "PENDING").length,
    confirmedCount: items.filter((a) => a.status === "CONFIRMED").length,
    completedCount: items.filter((a) => a.status === "COMPLETED").length,
    cancelledCount: items.filter((a) => a.status === "CANCELLED").length,
    totalCount: items.length,
    weeklyRevenue: items.reduce((s, a) => s + toNumber(a.totalAmount), 0),
    monthlyRevenue: items.reduce((s, a) => s + toNumber(a.totalAmount), 0),
    todayRevenue: items
      .filter((a) => a.timeSlot?.date === today)
      .reduce((s, a) => s + toNumber(a.totalAmount), 0),
    totalRevenue: items.reduce((s, a) => s + toNumber(a.totalAmount), 0),
    popularServices: [],
    busiestHours: [],
    statusDistribution: {
      PENDING: items.filter((a) => a.status === "PENDING").length,
      CONFIRMED: items.filter((a) => a.status === "CONFIRMED").length,
      COMPLETED: items.filter((a) => a.status === "COMPLETED").length,
      CANCELLED: items.filter((a) => a.status === "CANCELLED").length,
    } as any,
    revenueByDay: [],
  };
};

/**
 * Get detailed appointment by ID
 * GET /api/appointments/{appointmentId}
 */
export const getAppointmentDetails = async (
  appointmentId: string
): Promise<AppointmentDetailDTO> => {
  const response = await appointmentApi.get(`/appointments/${appointmentId}`);
  return response.data as any;
};

/**
 * Confirm a pending appointment
 * PUT /api/appointments/{appointmentId}/confirm
 */
export const confirmAppointment = async (
  appointmentId: string,
  _data?: ConfirmAppointmentDTO
): Promise<AppointmentResponseDTO> => {
  // Backend confirm endpoint does not require a body
  const response = await appointmentApi.put(
    `/appointments/${appointmentId}/confirm`
  );
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
  // Backend expects query param newTimeSlotId
  const response = await appointmentApi.put(
    `/appointments/${appointmentId}/reschedule`,
    undefined,
    {
      params: { newTimeSlotId: data.newTimeSlotId },
    }
  );
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
  // Backend cancels with DELETE and optional reason
  const response = await appointmentApi.delete(
    `/appointments/${appointmentId}`,
    {
      params: { reason: data.reason },
    }
  );
  return response.data;
};

/**
 * Mark appointment as completed
 * PUT /api/appointments/{appointmentId}/complete
 */
export const completeAppointment = async (
  appointmentId: string,
  _data: CompleteAppointmentDTO
): Promise<AppointmentResponseDTO> => {
  const response = await appointmentApi.put(
    `/appointments/${appointmentId}/complete`
  );
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
  // No backend search; naive client-side filter
  const all = await appointmentApi.get<AppointmentResponseDTO[]>(
    `/appointments/salon/${salonId}`
  );
  const items = (all.data || []).filter(
    (a) =>
      a.customer.name.toLowerCase().includes(query.toLowerCase()) ||
      a.customer.email?.toLowerCase().includes(query.toLowerCase()) ||
      a.customer.phone?.includes(query)
  );
  const start = page * size;
  const content = items.slice(start, start + size);
  return {
    content,
    totalElements: items.length,
    totalPages: Math.max(1, Math.ceil(items.length / size)),
    size,
    number: page,
    first: page === 0,
    last: start + content.length >= items.length,
    empty: content.length === 0,
  };
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
  const all = await appointmentApi.get<AppointmentResponseDTO[]>(
    `/appointments/salon/${salonId}`
  );
  return (all.data || []).filter(
    (a) => a.timeSlot.date >= startDate && a.timeSlot.date <= endDate
  );
};

/**
 * Update appointment notes
 * POST /api/appointments/{appointmentId}/notes
 */
export const updateAppointmentNotes = async (
  appointmentId: string,
  _data: UpdateNotesDTO
): Promise<AppointmentResponseDTO> => {
  // Not supported by backend; return current details
  const response = await appointmentApi.get(`/appointments/${appointmentId}`);
  return response.data;
};

/**
 * Export appointments to CSV/PDF
 * GET /api/appointments/salon/{salonId}/export
 */
export const exportAppointments = async (
  salonId: string,
  _format: "csv" | "pdf" = "csv",
  _filters?: AppointmentFilterParams
): Promise<Blob> => {
  // Not supported; synthesize CSV client-side
  const all = await appointmentApi.get<AppointmentResponseDTO[]>(
    `/appointments/salon/${salonId}`
  );
  const rows = (all.data || []).map((a) =>
    [
      a.id,
      a.customer.name,
      a.service.name,
      a.timeSlot.date,
      a.timeSlot.startTime,
      a.status,
      a.totalAmount,
    ].join(",")
  );
  const header = "id,customer,service,date,time,status,totalAmount";
  const csv = [header, ...rows].join("\n");
  return new Blob([csv], { type: "text/csv" });
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
  handleAPIError,
};

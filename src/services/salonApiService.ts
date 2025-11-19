import { BackendSalon, CreateSalonRequest, UpdateSalonRequest } from "./types";
import { buildApiUrl, DEFAULT_HEADERS, API_CONFIG } from "../config/api";

// Base configuration
const API_BASE_URL = buildApiUrl(API_CONFIG.ENDPOINTS.SALONS);

// Custom error class for API errors
export class ApiServiceError extends Error {
  constructor(public status: number, message: string, public code?: string) {
    super(message);
    this.name = "ApiServiceError";
  }
}

// Generic API request handler with error handling
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

    // Handle different HTTP status codes
    if (response.status === 404) {
      throw new ApiServiceError(404, "Salon not found");
    }

    if (response.status === 400) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiServiceError(
        400,
        errorData.message || "Invalid request data"
      );
    }

    if (response.status === 500) {
      throw new ApiServiceError(500, "Server error. Please try again later.");
    }

    if (!response.ok) {
      throw new ApiServiceError(
        response.status,
        `HTTP ${response.status}: ${response.statusText}`
      );
    }

    // Handle 204 No Content responses (like DELETE)
    if (response.status === 204) {
      return {} as T;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Handle network errors
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new ApiServiceError(
        0,
        "Network error. Please check your connection."
      );
    }

    // Re-throw API errors
    if (error instanceof ApiServiceError) {
      throw error;
    }

    // Handle other errors
    throw new ApiServiceError(500, "An unexpected error occurred");
  }
}

// API Service functions
export const salonApiService = {
  /**
   * Get all salons from the backend
   */
  async getAllSalons(): Promise<BackendSalon[]> {
    return apiRequest<BackendSalon[]>(API_BASE_URL, {
      method: "GET",
    });
  },

  /**
   * Get a specific salon by ID
   */
  async getSalonById(id: string): Promise<BackendSalon> {
    return apiRequest<BackendSalon>(`${API_BASE_URL}/${id}`, {
      method: "GET",
    });
  },

  /**
   * Create a new salon
   */
  async createSalon(salonData: CreateSalonRequest): Promise<BackendSalon> {
    return apiRequest<BackendSalon>(API_BASE_URL, {
      method: "POST",
      body: JSON.stringify(salonData),
    });
  },

  /**
   * Update an existing salon
   */
  async updateSalon(
    id: string,
    salonData: UpdateSalonRequest
  ): Promise<BackendSalon> {
    return apiRequest<BackendSalon>(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(salonData),
    });
  },

  /**
   * Delete a salon by ID
   */
  async deleteSalon(id: string): Promise<void> {
    return apiRequest<void>(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });
  },
};

// Utility function to convert backend salon to frontend display format
export function mapBackendSalonToDisplaySalon(
  backendSalon: BackendSalon
): import("../components/HairSalonListing").Salon {
  // Calculate rating from reviews (simplified - you might want to implement proper rating calculation)
  const rating = backendSalon.reviews.length > 0 ? 4.5 : 0; // Default rating logic

  // Determine price range based on services (you can customize this logic)
  const priceRange = backendSalon.services.length > 5 ? "$$$" : "$$";

  // Format hours
  const hours = `${backendSalon.openTime} - ${backendSalon.closeTime}`;

  // Calculate distance (you'll need to implement geolocation calculation)
  const distance = "0.5 miles"; // Placeholder

  return {
    id: backendSalon.id || "",
    name: backendSalon.name,
    rating,
    reviewCount: backendSalon.reviews.length,
    address: backendSalon.address,
    distance,
    priceRange,
    image:
      backendSalon.bannerImage ||
      backendSalon.images[0] ||
      "/videos/placeholder.jpg",
    services: backendSalon.services,
    isOpen: backendSalon.available,
    hours,
    phone: backendSalon.phone,
    specialties: backendSalon.services.slice(0, 3), // Use first 3 services as specialties
    website: `mailto:${backendSalon.email}`, // Use email as website for now
  };
}

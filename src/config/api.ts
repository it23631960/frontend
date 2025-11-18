// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
  ENDPOINTS: {
    SALONS: "/api/salons",
    HAIR_SALONS: "/api/hair-salons",
    BARBER_SHOPS: "/api/barber-shops",
    NAIL_SALONS: "/api/nail-salons",
    BRIDAL_SALONS: "/api/bridal-salons",
    USERS: "/api/users",
    BOOKINGS: "/api/bookings",
  },
  TIMEOUT: 10000, // 10 seconds
};

export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

// Helper function to build full API URL
export function buildApiUrl(endpoint: string): string {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
}

export default API_CONFIG;

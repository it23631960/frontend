import { User, CreateUserRequest, UpdateUserRequest } from '../types/user';
import { buildApiUrl, DEFAULT_HEADERS, API_CONFIG } from '../config/api';

// Base configuration
const API_BASE_URL = buildApiUrl(API_CONFIG.ENDPOINTS.USERS);

// Custom error class for User API errors
export class UserApiError extends Error {
  constructor(public status: number, message: string, public code?: string) {
    super(message);
    this.name = 'UserApiError';
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
      throw new UserApiError(404, 'User not found');
    }

    if (response.status === 400) {
      const errorData = await response.json().catch(() => ({}));
      throw new UserApiError(400, errorData.message || 'Invalid user data');
    }

    if (response.status === 409) {
      throw new UserApiError(409, 'User with this email already exists');
    }

    if (response.status === 500) {
      throw new UserApiError(500, 'Server error. Please try again later.');
    }

    if (!response.ok) {
      throw new UserApiError(
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
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new UserApiError(0, 'Network error. Please check your connection.');
    }
    
    // Re-throw API errors
    if (error instanceof UserApiError) {
      throw error;
    }

    // Handle other errors
    console.error('Unexpected error in user API:', error);
    throw new UserApiError(500, 'An unexpected error occurred');
  }
}

// User API Service functions
export const userApiService = {
  /**
   * Get all users from the backend
   */
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users...');
    return apiRequest<User[]>(API_BASE_URL, {
      method: 'GET',
    });
  },

  /**
   * Get a specific user by ID
   */
  async getUserById(id: string): Promise<User> {
    console.log(`Fetching user with ID: ${id}`);
    return apiRequest<User>(`${API_BASE_URL}/${id}`, {
      method: 'GET',
    });
  },

  /**
   * Create a new user
   */
  async createUser(userData: CreateUserRequest): Promise<User> {
    console.log('Creating new user:', { ...userData, password: '[REDACTED]' });
    return apiRequest<User>(API_BASE_URL, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  /**
   * Update an existing user
   */
  async updateUser(id: string, userData: UpdateUserRequest): Promise<User> {
    console.log(`Updating user ${id}:`, { ...userData, password: '[REDACTED]' });
    return apiRequest<User>(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  /**
   * Delete a user by ID
   */
  async deleteUser(id: string): Promise<void> {
    console.log(`Deleting user with ID: ${id}`);
    return apiRequest<void>(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
  },
};

// Utility function to convert User to safe display format (without password)
export function mapUserToDisplayUser(user: User): import('../types/user').DisplayUser {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
  };
}

// Utility function to validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Utility function to validate password strength
export function isValidPassword(password: string): { isValid: boolean; message?: string } {
  if (password.length < 6) {
    return { isValid: false, message: 'Password must be at least 6 characters long' };
  }
  if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
    return { isValid: false, message: 'Password must contain both uppercase and lowercase letters' };
  }
  if (!/(?=.*\d)/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one number' };
  }
  return { isValid: true };
}

export default userApiService;
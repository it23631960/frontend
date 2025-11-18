// User type definitions for API integration

export interface User {
  id: string;
  username: string;
  email: string;
  password: string; // Note: This should be handled securely
}

export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  username: string;
  email: string;
  password: string;
}

// Frontend display user (without password for security)
export interface DisplayUser {
  id: string;
  username: string;
  email: string;
}

// User profile form data
export interface UserProfileForm {
  username: string;
  email: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

// User registration form data
export interface UserRegistrationForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// User login form data
export interface UserLoginForm {
  email: string;
  password: string;
}

export default User;
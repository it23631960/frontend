import { useState, useEffect } from "react";
import { userApiService, UserApiError } from "../services/userApiService";
import {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  DisplayUser,
} from "../types/user";

// Hook for managing user operations (CRUD)
export const useUserOperations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<DisplayUser[]>([]);

  // Create a new user
  const createUser = async (
    userData: CreateUserRequest
  ): Promise<User | null> => {
    setIsLoading(true);
    try {
      const newUser = await userApiService.createUser(userData);

      // Add to local state (without password for security)
      const displayUser: DisplayUser = {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      };
      setUsers((prev) => [...prev, displayUser]);

      console.log(`User "${userData.username}" created successfully`);
      return newUser;
    } catch (error) {
      console.error("Error creating user:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Update an existing user
  const updateUser = async (
    id: string,
    userData: UpdateUserRequest
  ): Promise<User | null> => {
    setIsLoading(true);
    try {
      const updatedUser = await userApiService.updateUser(id, userData);

      // Update local state
      const displayUser: DisplayUser = {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
      };

      setUsers((prev) =>
        prev.map((user) => (user.id === id ? displayUser : user))
      );

      console.log(`User "${userData.username}" updated successfully`);
      return updatedUser;
    } catch (error) {
      console.error("Error updating user:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a user
  const deleteUser = async (id: string, username: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      await userApiService.deleteUser(id);

      // Remove from local state
      setUsers((prev) => prev.filter((user) => user.id !== id));

      console.log(`User "${username}" deleted successfully`);
      return true;
    } catch (error) {
      console.error("Error deleting user:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Get user by ID
  const getUserById = async (id: string): Promise<DisplayUser | null> => {
    setIsLoading(true);
    try {
      const user = await userApiService.getUserById(id);
      const displayUser: DisplayUser = {
        id: user.id,
        username: user.username,
        email: user.email,
      };
      return displayUser;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    users,
    setUsers,
    isLoading,
    createUser,
    updateUser,
    deleteUser,
    getUserById,
  };
};

// Hook for fetching and managing all users
export const useUserList = () => {
  const [users, setUsers] = useState<DisplayUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedUsers = await userApiService.getAllUsers();

      // Convert to display users (without passwords)
      const displayUsers: DisplayUser[] = fetchedUsers.map((user) => ({
        id: user.id,
        username: user.username,
        email: user.email,
      }));

      setUsers(displayUsers);
    } catch (error) {
      console.error("Error fetching users:", error);

      let errorMessage = "Failed to load users";
      if (error instanceof UserApiError) {
        errorMessage = error.message;
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const refreshUsers = () => {
    fetchUsers();
  };

  return {
    users,
    isLoading,
    error,
    refreshUsers,
  };
};

// Hook for user authentication (basic implementation)
export const useUserAuth = () => {
  const [currentUser, setCurrentUser] = useState<DisplayUser | null>(() => {
    // Initialize from localStorage
    const stored = localStorage.getItem("currentUser");
    return stored ? JSON.parse(stored) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Initialize from localStorage
    return localStorage.getItem("isAuthenticated") === "true";
  });
  const [isLoading, setIsLoading] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("currentUser");
    const authStatus = localStorage.getItem("isAuthenticated");

    if (stored && authStatus === "true") {
      setCurrentUser(JSON.parse(stored));
      setIsAuthenticated(true);
    }
  }, []);

  // Register new user
  const register = async (userData: CreateUserRequest): Promise<boolean> => {
    setIsLoading(true);
    try {
      const newUser = await userApiService.createUser(userData);

      // Set as current user (in a real app, you'd handle authentication tokens)
      const displayUser: DisplayUser = {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      };

      setCurrentUser(displayUser);
      setIsAuthenticated(true);

      console.log(`Registration successful for ${userData.username}`);
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Login user (basic implementation - in real app, this would validate credentials)
  const login = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // In a real app, you'd send credentials to a login endpoint
      // For now, we'll fetch users and find matching email (not secure - just for demo)
      const users = await userApiService.getAllUsers();
      const user = users.find((u) => u.email === email);

      if (!user) {
        throw new UserApiError(404, "Invalid email or password");
      }

      // In a real app, password would be validated securely server-side
      const displayUser: DisplayUser = {
        id: user.id,
        username: user.username,
        email: user.email,
      };

      setCurrentUser(displayUser);
      setIsAuthenticated(true);

      console.log(`Login successful for ${user.username}`);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isAuthenticated");
    console.log("User logged out successfully");
  };

  return {
    currentUser,
    isAuthenticated,
    isLoading,
    register,
    login,
    logout,
  };
};

import axios, { AxiosError } from "axios";
import {
  Review,
  RatingSummary,
  ReviewFormData,
  SortOption,
} from "../types/review";
import { API_CONFIG } from "../config/api";

/**
 * API Base URL - defaults to localhost:8080 for development
 * Can be overridden via environment variable
 */
const API_BASE_URL = `${
  import.meta.env.VITE_API_BASE_URL || API_CONFIG.BASE_URL
}/api`;

/**
 * API Error Response Structure
 */
export interface APIError {
  error: string;
  message: string;
  status: number;
  field?: string;
}

/**
 * Paginated Response Structure
 */
export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  first: boolean;
  last: boolean;
}

/**
 * Review API Service
 *
 * Handles all HTTP requests related to reviews including:
 * - Fetching reviews for salons
 * - Creating new reviews
 * - Updating existing reviews
 * - Getting rating statistics
 * - Marking reviews as helpful
 */
class ReviewAPIService {
  /**
   * Get all reviews for a specific salon
   *
   * @param salonId - Salon identifier
   * @param params - Query parameters (sort, page, size)
   * @returns Paginated list of reviews
   */
  async getSalonReviews(
    salonId: string,
    params: {
      sort?: SortOption;
      page?: number;
      size?: number;
    } = {}
  ): Promise<PaginatedResponse<Review>> {
    try {
      const { sort = "recent", page = 0, size = 10 } = params;

      const response = await axios.get<PaginatedResponse<Review>>(
        `${API_BASE_URL}/reviews/salon/${salonId}`,
        { params: { sort, page, size } }
      );

      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get rating summary/statistics for a salon
   *
   * @param salonId - Salon identifier
   * @returns Rating statistics including average, total, and distribution
   */
  async getRatingSummary(salonId: string): Promise<RatingSummary> {
    try {
      const response = await axios.get<{
        averageRating: number;
        totalReviews: number;
        fiveStars: number;
        fourStars: number;
        threeStars: number;
        twoStars: number;
        oneStar: number;
      }>(`${API_BASE_URL}/reviews/salon/${salonId}/summary`);

      // Map backend DTO to frontend type
      const data = response.data;
      return {
        averageRating: data.averageRating,
        totalReviews: data.totalReviews,
        distribution: {
          5: data.fiveStars,
          4: data.fourStars,
          3: data.threeStars,
          2: data.twoStars,
          1: data.oneStar,
        },
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Submit a new review
   *
   * @param reviewData - Review details (rating, comment, name, email)
   * @returns Created review with success message
   */
  async submitReview(
    reviewData: ReviewFormData & { salonId: string }
  ): Promise<{
    message: string;
    review: Review;
  }> {
    try {
      const response = await axios.post(`${API_BASE_URL}/reviews`, {
        salonId: reviewData.salonId,
        reviewerName: reviewData.userName,
        reviewerEmail: reviewData.userEmail,
        rating: reviewData.rating,
        comment: reviewData.comment,
        userId: null, // TODO: Add user ID when authentication is implemented
        appointmentId: null, // TODO: Link to appointment if needed
      });

      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get a specific review by ID
   *
   * @param reviewId - Review identifier
   * @returns Review details
   */
  async getReview(reviewId: string): Promise<Review> {
    try {
      const response = await axios.get<Review>(
        `${API_BASE_URL}/reviews/${reviewId}`
      );

      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Update an existing review
   *
   * @param reviewId - Review identifier
   * @param updateData - Fields to update (rating, comment)
   * @returns Updated review with success message
   */
  async updateReview(
    reviewId: string,
    updateData: {
      rating?: number;
      comment?: string;
    }
  ): Promise<{
    message: string;
    review: Review;
  }> {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/reviews/${reviewId}`,
        updateData
      );

      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Delete a review
   *
   * @param reviewId - Review identifier
   * @returns Success message
   */
  async deleteReview(reviewId: string): Promise<{ message: string }> {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/reviews/${reviewId}`
      );

      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get all reviews by a specific user
   *
   * @param userId - User identifier
   * @returns List of user's reviews
   */
  async getUserReviews(userId: string): Promise<Review[]> {
    try {
      const response = await axios.get<Review[]>(
        `${API_BASE_URL}/reviews/user/${userId}`
      );

      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Check if a user has already reviewed a salon
   *
   * @param salonId - Salon identifier
   * @param userId - User identifier (optional)
   * @returns Object with hasReviewed flag and review details if exists
   */
  async checkExistingReview(
    salonId: string,
    userId?: string
  ): Promise<{
    hasReviewed: boolean;
    reviewId?: string;
    review?: Review;
  }> {
    try {
      const params: { salonId: string; userId?: string } = { salonId };
      if (userId) {
        params.userId = userId;
      }

      const response = await axios.get(
        `${API_BASE_URL}/reviews/check-existing`,
        { params }
      );

      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Mark a review as helpful
   *
   * @param reviewId - Review identifier
   * @returns Updated helpful count
   */
  async markReviewHelpful(reviewId: string): Promise<{ helpfulCount: number }> {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/reviews/${reviewId}/helpful`
      );

      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Report a review (for moderation)
   *
   * @param reviewId - Review identifier
   * @returns Success message
   */
  async reportReview(reviewId: string): Promise<{ message: string }> {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/reviews/${reviewId}/report`
      );

      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Handle API errors and convert to user-friendly format
   */
  private handleError(error: unknown): APIError {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{
        message?: string;
        error?: string;
        code?: string;
        status?: number;
      }>;

      if (axiosError.response) {
        // Server responded with error
        const { data, status } = axiosError.response;

        return {
          error: data.code || data.error || "API_ERROR",
          message: data.message || "An error occurred",
          status,
        };
      } else if (axiosError.request) {
        // Request made but no response
        return {
          error: "NETWORK_ERROR",
          message:
            "Unable to connect to server. Please check your internet connection.",
          status: 0,
        };
      }
    }

    // Something else happened
    return {
      error: "UNKNOWN_ERROR",
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
      status: 0,
    };
  }
}

// Export singleton instance
export const reviewAPI = new ReviewAPIService();
export default reviewAPI;

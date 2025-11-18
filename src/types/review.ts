/**
 * TypeScript types for Salon Review System
 */

export interface Review {
  id: string;
  salonId: string;
  userId?: string;
  userName: string;
  reviewerName: string; // Added for backend compatibility
  userEmail?: string;
  userAvatar?: string | null;
  rating: number; // 1-5
  comment: string;
  date: string; // ISO 8601 date string - will be mapped from reviewDate
  reviewDate: string; // Backend field name
  lastModified?: string;
  helpful?: number; // Count of helpful votes
  helpfulCount?: number; // Backend field name
  isVerified?: boolean;
  isEditable?: boolean;
  isGuestReview?: boolean;
  ownerResponse?: string;
  ownerResponseDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface RatingDistribution {
  5: number;
  4: number;
  3: number;
  2: number;
  1: number;
}

export interface RatingSummary {
  averageRating: number;
  totalReviews: number;
  distribution: RatingDistribution;
}

export interface ReviewFormData {
  rating: number;
  comment: string;
  userName?: string;
  userEmail?: string;
}

export interface ReviewsListProps {
  salonId: string;
  sortBy?: 'recent' | 'highest' | 'lowest';
  limit?: number;
}

export type SortOption = 'recent' | 'highest' | 'lowest';

// Mock data for development
export const mockReviews: Review[] = [
  {
    id: '1',
    salonId: 'salon-123',
    userName: 'Sarah Johnson',
    reviewerName: 'Sarah Johnson',
    userAvatar: null,
    rating: 5,
    comment: 'Amazing service! The staff was very professional and friendly. The atmosphere was relaxing and clean. My haircut turned out exactly how I wanted it. Highly recommend this salon for anyone looking for quality service!',
    date: '2025-10-08T10:30:00Z',
    reviewDate: '2025-10-08T10:30:00Z',
    helpful: 12
  },
  {
    id: '2',
    salonId: 'salon-123',
    userName: 'Mike Williams',
    reviewerName: 'Mike Williams',
    userAvatar: null,
    rating: 4,
    comment: 'Good experience overall. Clean salon and skilled stylists. The only reason I\'m not giving 5 stars is the wait time was a bit longer than expected.',
    date: '2025-10-03T14:20:00Z',
    reviewDate: '2025-10-03T14:20:00Z',
    helpful: 5
  },
  {
    id: '3',
    salonId: 'salon-123',
    userName: 'Emily Chen',
    reviewerName: 'Emily Chen',
    userAvatar: null,
    rating: 5,
    comment: 'Best salon in town! I\'ve been coming here for years and they never disappoint. The stylists are talented and really listen to what you want.',
    date: '2025-09-28T09:15:00Z',
    reviewDate: '2025-09-28T09:15:00Z',
    helpful: 8
  },
  {
    id: '4',
    salonId: 'salon-123',
    userName: 'David Brown',
    reviewerName: 'David Brown',
    userAvatar: null,
    rating: 4,
    comment: 'Great haircut and reasonable prices. The staff was friendly and the salon was very clean. Will definitely come back!',
    date: '2025-09-25T16:45:00Z',
    reviewDate: '2025-09-25T16:45:00Z',
    helpful: 3
  },
  {
    id: '5',
    salonId: 'salon-123',
    userName: 'Lisa Anderson',
    reviewerName: 'Lisa Anderson',
    userAvatar: null,
    rating: 5,
    comment: 'Absolutely love this salon! They did an amazing job on my hair color and styling. Very professional and the results lasted for weeks.',
    date: '2025-09-20T11:30:00Z',
    reviewDate: '2025-09-20T11:30:00Z',
    helpful: 15
  },
  {
    id: '6',
    salonId: 'salon-123',
    userName: 'James Taylor',
    reviewerName: 'James Taylor',
    userAvatar: null,
    rating: 3,
    comment: 'Decent service but nothing exceptional. The haircut was okay but I expected more based on the reviews.',
    date: '2025-09-15T13:20:00Z',
    reviewDate: '2025-09-15T13:20:00Z',
    helpful: 2
  },
  {
    id: '7',
    salonId: 'salon-123',
    userName: 'Maria Garcia',
    reviewerName: 'Maria Garcia',
    userAvatar: null,
    rating: 5,
    comment: 'Fantastic experience from start to finish! The stylist took the time to understand what I wanted and gave me great suggestions. The salon is beautiful and very welcoming.',
    date: '2025-09-10T10:00:00Z',
    reviewDate: '2025-09-10T10:00:00Z',
    helpful: 9
  },
  {
    id: '8',
    salonId: 'salon-123',
    userName: 'Robert Wilson',
    reviewerName: 'Robert Wilson',
    userAvatar: null,
    rating: 4,
    comment: 'Very satisfied with my haircut. Professional service and good value for money. The salon has a nice atmosphere.',
    date: '2025-09-05T15:30:00Z',
    reviewDate: '2025-09-05T15:30:00Z',
    helpful: 4
  },
  {
    id: '9',
    salonId: 'salon-123',
    userName: 'Jennifer Martinez',
    reviewerName: 'Jennifer Martinez',
    userAvatar: null,
    rating: 5,
    comment: 'I cannot recommend this salon enough! They transformed my hair and I received so many compliments. The staff is incredibly talented and friendly.',
    date: '2025-08-30T12:45:00Z',
    reviewDate: '2025-08-30T12:45:00Z',
    helpful: 11
  },
  {
    id: '10',
    salonId: 'salon-123',
    userName: 'Chris Thompson',
    reviewerName: 'Chris Thompson',
    userAvatar: null,
    rating: 2,
    comment: 'Unfortunately, my experience wasn\'t great. The haircut was not what I asked for and the stylist seemed rushed.',
    date: '2025-08-25T14:15:00Z',
    reviewDate: '2025-08-25T14:15:00Z',
    helpful: 1
  }
];

export const mockRatingSummary: RatingSummary = {
  averageRating: 4.8,
  totalReviews: 124,
  distribution: {
    5: 100,
    4: 19,
    3: 4,
    2: 1,
    1: 0
  }
};

/**
 * Calculate rating summary from reviews array
 */
export function calculateRatingSummary(reviews: Review[]): RatingSummary {
  if (reviews.length === 0) {
    return {
      averageRating: 0,
      totalReviews: 0,
      distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    };
  }

  const distribution: RatingDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let totalRating = 0;

  reviews.forEach(review => {
    distribution[review.rating as keyof RatingDistribution]++;
    totalRating += review.rating;
  });

  return {
    averageRating: parseFloat((totalRating / reviews.length).toFixed(1)),
    totalReviews: reviews.length,
    distribution
  };
}

/**
 * Format date to relative time (e.g., "2 days ago")
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60
  };

  for (const [unit, seconds] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / seconds);
    if (interval >= 1) {
      return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`;
    }
  }

  return 'Just now';
}

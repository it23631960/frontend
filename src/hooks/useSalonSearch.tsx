import { useState, useCallback, useRef } from 'react';
import { Salon, FilterState } from '../components/HairSalonListing';
import { salonApiService, mapBackendSalonToDisplaySalon, ApiServiceError } from '../services/salonApiService';
import { useNotification } from '../services/NotificationService';

export const useSalonSearch = () => {
  const [salons, setSalons] = useState<Salon[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showNotification } = useNotification();
  
  // ✅ FIX #1: Track if data has been loaded to prevent duplicate notifications
  const hasLoadedRef = useRef(false);

  const filterSalons = useCallback((
    allSalons: Salon[], 
    filters: FilterState
  ): Salon[] => {
    return allSalons.filter(salon => {
      // Filter by services
      if (filters.services.length > 0) {
        const hasService = filters.services.some(service => 
          salon.services.some(salonService => 
            salonService.toLowerCase().includes(service.toLowerCase())
          )
        );
        if (!hasService) return false;
      }

      // Filter by price range
      if (filters.priceRange.length > 0) {
        if (!filters.priceRange.includes(salon.priceRange)) return false;
      }

      // Filter by rating
      if (filters.rating > 0) {
        if (salon.rating < filters.rating) return false;
      }

      // Filter by availability
      if (filters.availability) {
        switch (filters.availability) {
          case 'Open Now':
            if (!salon.isOpen) return false;
            break;
          case 'Same Day Booking':
          case 'This Week':
          case 'Accepts Walk-ins':
          case 'Online Booking':
            // These would require additional data in real implementation
            break;
        }
      }

      // Filter by specialties
      if (filters.specialties.length > 0) {
        const hasSpecialty = filters.specialties.some(specialty => 
          salon.specialties.some(salonSpecialty => 
            salonSpecialty.toLowerCase().includes(specialty.toLowerCase())
          )
        );
        if (!hasSpecialty) return false;
      }

      return true;
    });
  }, []);

  const sortSalons = useCallback((
    salons: Salon[], 
    sortBy: string
  ): Salon[] => {
    const sorted = [...salons];
    
    switch (sortBy) {
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'price_low':
        return sorted.sort((a, b) => {
          const priceOrder = { '$': 1, '$$': 2, '$$$': 3, '$$$$': 4 };
          return priceOrder[a.priceRange as keyof typeof priceOrder] - 
                 priceOrder[b.priceRange as keyof typeof priceOrder];
        });
      case 'price_high':
        return sorted.sort((a, b) => {
          const priceOrder = { '$': 1, '$$': 2, '$$$': 3, '$$$$': 4 };
          return priceOrder[b.priceRange as keyof typeof priceOrder] - 
                 priceOrder[a.priceRange as keyof typeof priceOrder];
        });
      case 'availability':
        return sorted.sort((a, b) => {
          if (a.isOpen && !b.isOpen) return -1;
          if (!a.isOpen && b.isOpen) return 1;
          return 0;
        });
      case 'newest':
        return sorted.sort((a, b) => b.id - a.id);
      case 'distance':
      default:
        return sorted.sort((a, b) => {
          const aDistance = parseFloat(a.distance.split(' ')[0]);
          const bDistance = parseFloat(b.distance.split(' ')[0]);
          return aDistance - bDistance;
        });
    }
  }, []);

  // Load all salons from API
  const loadSalons = useCallback(async () => {
    // ✅ FIX #2: Prevent duplicate loads if already loading
    if (isLoading) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const backendSalons = await salonApiService.getAllSalons();
      const displaySalons = backendSalons.map(mapBackendSalonToDisplaySalon);
      
      setSalons(displaySalons);
      setTotalCount(displaySalons.length);
      
      // ✅ FIX #3: Only show notification on first load
      if (!hasLoadedRef.current) {
        showNotification({
          type: 'success',
          title: 'Salons Loaded',
          message: `Found ${displaySalons.length} salon(s)`,
          duration: 3000,
        });
        hasLoadedRef.current = true;
      }
    } catch (error) {
      const errorMessage = error instanceof ApiServiceError 
        ? error.message 
        : 'Failed to load salons';
      
      setError(errorMessage);
      setSalons([]);
      setTotalCount(0);
      
      showNotification({
        type: 'error',
        title: 'Loading Failed',
        message: errorMessage,
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]); // ✅ FIX #4: Remove showNotification from dependencies

  const searchSalons = useCallback(async (
    location: string,
    filters: FilterState,
    sortBy: string
  ) => {
    // ✅ FIX #5: Prevent duplicate searches if already loading
    if (isLoading) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // First, get all salons from API
      const backendSalons = await salonApiService.getAllSalons();
      let displaySalons = backendSalons.map(mapBackendSalonToDisplaySalon);
      
      // Apply filters
      displaySalons = filterSalons(displaySalons, filters);
      
      // Apply location filtering if needed
      if (location.trim()) {
        // In a real implementation, you might filter by coordinates or city
        // For now, we'll filter by address containing the location
        displaySalons = displaySalons.filter(salon => 
          salon.address.toLowerCase().includes(location.toLowerCase())
        );
      }
      
      // Sort the results
      displaySalons = sortSalons(displaySalons, sortBy);
      
      setSalons(displaySalons);
      setTotalCount(displaySalons.length);
      
      if (displaySalons.length === 0) {
        showNotification({
          type: 'info',
          title: 'No Results',
          message: 'No salons match your search criteria',
          duration: 3000,
        });
      }
    } catch (error) {
      const errorMessage = error instanceof ApiServiceError 
        ? error.message 
        : 'Failed to search salons';
      
      setError(errorMessage);
      setSalons([]);
      setTotalCount(0);
      
      showNotification({
        type: 'error',
        title: 'Search Failed',
        message: errorMessage,
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  }, [filterSalons, sortSalons, isLoading]); // ✅ FIX #6: Remove showNotification from dependencies

  // Initialize with default data from API
  // ✅ FIX #7: Stable callback that doesn't depend on loadSalons
  const initializeData = useCallback(async () => {
    // ✅ Prevent duplicate initialization
    if (hasLoadedRef.current || isLoading) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const backendSalons = await salonApiService.getAllSalons();
      const displaySalons = backendSalons.map(mapBackendSalonToDisplaySalon);
      
      setSalons(displaySalons);
      setTotalCount(displaySalons.length);
      
      // Show success notification only once
      showNotification({
        type: 'success',
        title: 'Salons Loaded',
        message: `Found ${displaySalons.length} salon(s)`,
        duration: 3000,
      });
      
      hasLoadedRef.current = true;
    } catch (error) {
      const errorMessage = error instanceof ApiServiceError 
        ? error.message 
        : 'Failed to load salons';
      
      setError(errorMessage);
      setSalons([]);
      setTotalCount(0);
      
      showNotification({
        type: 'error',
        title: 'Loading Failed',
        message: errorMessage,
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  }, []); // ✅ FIX #8: Empty dependency array - this callback is stable!

  return {
    salons,
    totalCount,
    isLoading,
    error,
    searchSalons,
    initializeData,
    loadSalons,
  };
};
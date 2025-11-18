import { useState, useCallback } from 'react';
import { salonApiService, ApiServiceError } from '../services/salonApiService';
import { CreateSalonRequest, UpdateSalonRequest, BackendSalon } from '../services/types';
import { useNotification } from '../services/NotificationService';

export const useSalonOperations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showNotification } = useNotification();

  /**
   * Get a specific salon by ID
   */
  const getSalon = useCallback(async (id: string): Promise<BackendSalon | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const salon = await salonApiService.getSalonById(id);
      
      showNotification({
        type: 'success',
        title: 'Salon Loaded',
        message: `Successfully loaded ${salon.name}`,
        duration: 2000,
      });

      return salon;
    } catch (error) {
      const errorMessage = error instanceof ApiServiceError 
        ? error.message 
        : 'Failed to load salon';
      
      setError(errorMessage);
      
      showNotification({
        type: 'error',
        title: 'Load Failed',
        message: errorMessage,
        duration: 5000,
      });

      return null;
    } finally {
      setIsLoading(false);
    }
  }, [showNotification]);

  /**
   * Create a new salon
   */
  const createSalon = useCallback(async (salonData: CreateSalonRequest): Promise<BackendSalon | null> => {
    setIsLoading(true);
    setError(null);

    try {
      // Validate required fields
      if (!salonData.name.trim()) {
        throw new Error('Salon name is required');
      }
      if (!salonData.address.trim()) {
        throw new Error('Salon address is required');
      }
      if (!salonData.phone.trim()) {
        throw new Error('Phone number is required');
      }

      const newSalon = await salonApiService.createSalon(salonData);
      
      showNotification({
        type: 'success',
        title: 'Salon Created',
        message: `Successfully created ${newSalon.name}`,
        duration: 4000,
      });

      return newSalon;
    } catch (error) {
      const errorMessage = error instanceof ApiServiceError 
        ? error.message 
        : error instanceof Error 
        ? error.message 
        : 'Failed to create salon';
      
      setError(errorMessage);
      
      showNotification({
        type: 'error',
        title: 'Creation Failed',
        message: errorMessage,
        duration: 5000,
      });

      return null;
    } finally {
      setIsLoading(false);
    }
  }, [showNotification]);

  /**
   * Update an existing salon
   */
  const updateSalon = useCallback(async (id: string, salonData: UpdateSalonRequest): Promise<BackendSalon | null> => {
    setIsLoading(true);
    setError(null);

    try {
      // Validate required fields
      if (!salonData.name.trim()) {
        throw new Error('Salon name is required');
      }
      if (!salonData.address.trim()) {
        throw new Error('Salon address is required');
      }
      if (!salonData.phone.trim()) {
        throw new Error('Phone number is required');
      }

      const updatedSalon = await salonApiService.updateSalon(id, salonData);
      
      showNotification({
        type: 'success',
        title: 'Salon Updated',
        message: `Successfully updated ${updatedSalon.name}`,
        duration: 4000,
      });

      return updatedSalon;
    } catch (error) {
      const errorMessage = error instanceof ApiServiceError 
        ? error.message 
        : error instanceof Error 
        ? error.message 
        : 'Failed to update salon';
      
      setError(errorMessage);
      
      showNotification({
        type: 'error',
        title: 'Update Failed',
        message: errorMessage,
        duration: 5000,
      });

      return null;
    } finally {
      setIsLoading(false);
    }
  }, [showNotification]);

  /**
   * Delete a salon
   */
  const deleteSalon = useCallback(async (id: string, salonName?: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      await salonApiService.deleteSalon(id);
      
      showNotification({
        type: 'success',
        title: 'Salon Deleted',
        message: salonName ? `Successfully deleted ${salonName}` : 'Salon deleted successfully',
        duration: 4000,
      });

      return true;
    } catch (error) {
      const errorMessage = error instanceof ApiServiceError 
        ? error.message 
        : 'Failed to delete salon';
      
      setError(errorMessage);
      
      showNotification({
        type: 'error',
        title: 'Deletion Failed',
        message: errorMessage,
        duration: 5000,
      });

      return false;
    } finally {
      setIsLoading(false);
    }
  }, [showNotification]);

  /**
   * Clear any existing errors
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    getSalon,
    createSalon,
    updateSalon,
    deleteSalon,
    clearError,
  };
};
import { useState, useCallback, useRef } from "react";
import { Salon, FilterState } from "../components/HairSalonListing";
import {
  mapBackendSalonToDisplaySalon,
  ApiServiceError,
} from "../services/salonApiService";
import { useNotification } from "../services/NotificationService";
import { buildApiUrl, API_CONFIG } from "../config/api";
import { BackendSalon } from "../services/types";

const API_BASE_URL = buildApiUrl(API_CONFIG.ENDPOINTS.NAIL_SALONS);

export const useNailSalonSearch = () => {
  const [salons, setSalons] = useState<Salon[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showNotification } = useNotification();

  const hasLoadedRef = useRef(false);

  const filterSalons = useCallback(
    (allSalons: Salon[], filters: FilterState): Salon[] => {
      return allSalons.filter((salon) => {
        if (filters.services.length > 0) {
          const hasService = filters.services.some((service) =>
            salon.services.some((salonService) =>
              salonService.toLowerCase().includes(service.toLowerCase())
            )
          );
          if (!hasService) return false;
        }

        if (filters.priceRange.length > 0) {
          if (!filters.priceRange.includes(salon.priceRange)) return false;
        }

        if (filters.rating > 0) {
          if (salon.rating < filters.rating) return false;
        }

        if (filters.availability) {
          switch (filters.availability) {
            case "Open Now":
              if (!salon.isOpen) return false;
              break;
          }
        }

        if (filters.specialties.length > 0) {
          const hasSpecialty = filters.specialties.some((specialty) =>
            salon.specialties.some((salonSpecialty) =>
              salonSpecialty.toLowerCase().includes(specialty.toLowerCase())
            )
          );
          if (!hasSpecialty) return false;
        }

        return true;
      });
    },
    []
  );

  const sortSalons = useCallback((salons: Salon[], sortBy: string): Salon[] => {
    const sorted = [...salons];

    switch (sortBy) {
      case "rating":
        return sorted.sort((a, b) => b.rating - a.rating);
      case "price_low":
        return sorted.sort((a, b) => {
          const priceOrder = { $: 1, $$: 2, $$$: 3, $$$$: 4 };
          return (
            priceOrder[a.priceRange as keyof typeof priceOrder] -
            priceOrder[b.priceRange as keyof typeof priceOrder]
          );
        });
      case "price_high":
        return sorted.sort((a, b) => {
          const priceOrder = { $: 1, $$: 2, $$$: 3, $$$$: 4 };
          return (
            priceOrder[b.priceRange as keyof typeof priceOrder] -
            priceOrder[a.priceRange as keyof typeof priceOrder]
          );
        });
      case "availability":
        return sorted.sort((a, b) => {
          if (a.isOpen && !b.isOpen) return -1;
          if (!a.isOpen && b.isOpen) return 1;
          return 0;
        });
      case "newest":
        return sorted.sort((a, b) => String(b.id).localeCompare(String(a.id)));
      case "distance":
      default:
        return sorted.sort((a, b) => {
          const aDistance = parseFloat(a.distance.split(" ")[0]);
          const bDistance = parseFloat(b.distance.split(" ")[0]);
          return aDistance - bDistance;
        });
    }
  }, []);

  const searchSalons = useCallback(
    async (location: string, filters: FilterState, sortBy: string) => {
      if (isLoading) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
          throw new ApiServiceError(
            response.status,
            "Failed to fetch nail salons"
          );
        }

        const backendSalons: BackendSalon[] = await response.json();
        let displaySalons = backendSalons.map((salon, idx) => {
          const mapped = mapBackendSalonToDisplaySalon(salon);
          if (
            !mapped.id ||
            mapped.id === "nan" ||
            mapped.id.toLowerCase() === "nan"
          ) {
            mapped.id = `nail-salon-${idx + 1}`;
          }
          return mapped;
        });

        displaySalons = filterSalons(displaySalons, filters);

        if (location.trim()) {
          displaySalons = displaySalons.filter((salon) =>
            salon.address.toLowerCase().includes(location.toLowerCase())
          );
        }

        displaySalons = sortSalons(displaySalons, sortBy);

        setSalons(displaySalons);
        setTotalCount(displaySalons.length);

        if (displaySalons.length === 0) {
          showNotification({
            type: "info",
            title: "No Results",
            message: "No nail salons match your search criteria",
            duration: 3000,
          });
        }
      } catch (error) {
        const errorMessage =
          error instanceof ApiServiceError
            ? error.message
            : "Failed to search nail salons";

        setError(errorMessage);
        setSalons([]);
        setTotalCount(0);

        showNotification({
          type: "error",
          title: "Search Failed",
          message: errorMessage,
          duration: 5000,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [filterSalons, sortSalons, isLoading]
  );

  const initializeData = useCallback(async () => {
    if (hasLoadedRef.current || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new ApiServiceError(
          response.status,
          "Failed to fetch nail salons"
        );
      }

      const backendSalons: BackendSalon[] = await response.json();
      const displaySalons = backendSalons.map((salon, idx) => {
        const mapped = mapBackendSalonToDisplaySalon(salon);
        if (
          !mapped.id ||
          mapped.id === "nan" ||
          mapped.id.toLowerCase() === "nan"
        ) {
          mapped.id = `nail-salon-${idx + 1}`;
        }
        return mapped;
      });

      setSalons(displaySalons);
      setTotalCount(displaySalons.length);

      showNotification({
        type: "success",
        title: "Nail Salons Loaded",
        message: `Found ${displaySalons.length} nail salon(s)`,
        duration: 3000,
      });

      hasLoadedRef.current = true;
    } catch (error) {
      const errorMessage =
        error instanceof ApiServiceError
          ? error.message
          : "Failed to load nail salons";

      setError(errorMessage);
      setSalons([]);
      setTotalCount(0);

      showNotification({
        type: "error",
        title: "Loading Failed",
        message: errorMessage,
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    salons,
    totalCount,
    isLoading,
    error,
    searchSalons,
    initializeData,
  };
};

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Filter, Grid, List, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import FilterSidebar from "./FilterSidebar";
import SalonCard from "./SalonCard";
import ResultsSummary from "./ResultsSummary";
import { SalonCardSkeleton } from "./LoadingComponents";
import { useBarberShopSearch } from "../hooks/useBarberShopSearch";
import { Salon, FilterState } from "./HairSalonListing";

const BarberShopListing: React.FC = () => {
  const [location, setLocation] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    services: [],
    priceRange: [],
    rating: 0,
    availability: "",
    specialties: [],
    searchRadius: 10,
  });
  const [sortBy, setSortBy] = useState("distance");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [showFilters, setShowFilters] = useState(false);

  const { salons, searchSalons, totalCount, initializeData, isLoading } =
    useBarberShopSearch();

  useEffect(() => {
    initializeData();
  }, []);

  useEffect(() => {
    const hasFilters =
      location ||
      filters.services.length > 0 ||
      filters.priceRange.length > 0 ||
      filters.rating > 0 ||
      filters.availability ||
      filters.specialties.length > 0;

    if (hasFilters) {
      searchSalons(location, filters, sortBy);
    }
  }, [
    location,
    filters.services,
    filters.priceRange,
    filters.rating,
    filters.availability,
    filters.specialties,
    sortBy,
  ]);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900">
      {/* Fixed Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-purple-500/20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Back Button */}
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center space-x-2 text-white hover:text-purple-300 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-lg font-semibold">BeautyHub</span>
              </Link>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <motion.button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-white hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
              </motion.button>

              <div className="flex items-center bg-white/10 backdrop-blur-md rounded-lg border border-white/20 overflow-hidden">
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 transition-colors ${
                    viewMode === "list"
                      ? "bg-purple-500 text-white"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 transition-colors ${
                    viewMode === "grid"
                      ? "bg-purple-500 text-white"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden p-2 text-white hover:text-purple-300 transition-colors"
            >
              <Filter className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="pt-16">
        {/* Hero Search Section */}
        <motion.section
          className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 py-12 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-8"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Barber Shops Near You
              </h1>
              <p className="text-xl text-purple-200 max-w-2xl mx-auto">
                Find the best barber shops and grooming specialists in your area
              </p>
            </motion.div>

            <SearchBar
              location={location}
              onLocationChange={handleLocationChange}
              searchRadius={filters.searchRadius}
              onRadiusChange={(radius: number) =>
                handleFilterChange({ searchRadius: radius })
              }
            />
          </div>
        </motion.section>

        {/* Main Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filter Sidebar */}
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              isOpen={showFilters}
              onClose={() => setShowFilters(false)}
            />

            {/* Main Content Area */}
            <div className="flex-1">
              {/* Results Summary */}
              <ResultsSummary
                totalCount={totalCount}
                location={location || "your area"}
                sortBy={sortBy}
                onSortChange={setSortBy}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
              />

              {/* Salon Listings */}
              <motion.div
                className={`${
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "space-y-6"
                } mt-6`}
                layout
              >
                {isLoading ? (
                  // Loading skeletons
                  <SalonCardSkeleton count={6} />
                ) : (
                  // Salon cards
                  salons.map((salon: Salon, index: number) => (
                    <motion.div
                      key={salon.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <SalonCard salon={salon} viewMode={viewMode} />
                    </motion.div>
                  ))
                )}
              </motion.div>

              {/* Load More Button */}
              {!isLoading && salons.length > 0 && (
                <motion.div
                  className="text-center mt-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <motion.button
                    className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 30px rgba(168, 85, 247, 0.4)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Load More Barber Shops
                  </motion.button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarberShopListing;

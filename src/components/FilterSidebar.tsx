import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, Star, DollarSign, Clock, Scissors } from 'lucide-react';
import { FilterState } from './HairSalonListing';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  isOpen: boolean;
  onClose: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  isOpen,
  onClose
}) => {
  const [expandedSections, setExpandedSections] = useState({
    services: true,
    price: true,
    rating: true,
    availability: true,
    specialties: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const services = [
    'Haircut & Styling',
    'Hair Coloring',
    'Highlights & Lowlights',
    'Balayage',
    'Hair Extensions',
    'Keratin Treatment',
    'Perms & Relaxers',
    'Hair Wash & Blowout',
    'Scalp Treatment',
    'Wedding & Event Styling'
  ];

  const priceRanges = [
    { value: '$', label: '$ - Under $50', range: 'Under $50' },
    { value: '$$', label: '$$ - $50-$100', range: '$50-$100' },
    { value: '$$$', label: '$$$ - $100-$200', range: '$100-$200' },
    { value: '$$$$', label: '$$$$ - $200+', range: '$200+' }
  ];

  const availabilityOptions = [
    'Open Now',
    'Same Day Booking',
    'This Week',
    'Accepts Walk-ins',
    'Online Booking'
  ];

  const specialties = [
    'Curly Hair Specialist',
    'Color Correction',
    'Bridal Specialist',
    'Men\'s Cuts',
    'Children\'s Cuts',
    'Texture Specialist',
    'Organic Products',
    'Hair Loss Treatment'
  ];

  const handleServiceToggle = (service: string) => {
    const newServices = filters.services.includes(service)
      ? filters.services.filter(s => s !== service)
      : [...filters.services, service];
    onFilterChange({ services: newServices });
  };

  const handlePriceToggle = (price: string) => {
    const newPrices = filters.priceRange.includes(price)
      ? filters.priceRange.filter(p => p !== price)
      : [...filters.priceRange, price];
    onFilterChange({ priceRange: newPrices });
  };

  const handleSpecialtyToggle = (specialty: string) => {
    const newSpecialties = filters.specialties.includes(specialty)
      ? filters.specialties.filter(s => s !== specialty)
      : [...filters.specialties, specialty];
    onFilterChange({ specialties: newSpecialties });
  };

  const clearAllFilters = () => {
    onFilterChange({
      services: [],
      priceRange: [],
      rating: 0,
      availability: '',
      specialties: []
    });
  };

  const FilterSection: React.FC<{
    title: string;
    icon: React.ReactNode;
    sectionKey: keyof typeof expandedSections;
    children: React.ReactNode;
  }> = ({ title, icon, sectionKey, children }) => (
    <div className="border-b border-white/10 last:border-b-0">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center space-x-3">
          {icon}
          <span className="font-medium text-white">{title}</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-purple-300 transition-transform ${
            expandedSections[sectionKey] ? 'rotate-180' : ''
          }`}
        />
      </button>
      
      <AnimatePresence>
        {expandedSections[sectionKey] && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const sidebarContent = (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/20">
        <h2 className="text-xl font-semibold text-white">Filters</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={clearAllFilters}
            className="text-sm text-purple-300 hover:text-white transition-colors"
          >
            Clear All
          </button>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white transition-colors lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filter Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Services */}
        <FilterSection
          title="Services"
          icon={<Scissors className="w-4 h-4 text-purple-300" />}
          sectionKey="services"
        >
          <div className="space-y-2">
            {services.map(service => (
              <label key={service} className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.services.includes(service)}
                  onChange={() => handleServiceToggle(service)}
                  className="w-4 h-4 rounded border-2 border-purple-400 bg-transparent checked:bg-purple-500 checked:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
                />
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                  {service}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Price Range */}
        <FilterSection
          title="Price Range"
          icon={<DollarSign className="w-4 h-4 text-purple-300" />}
          sectionKey="price"
        >
          <div className="space-y-2">
            {priceRanges.map(price => (
              <label key={price.value} className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.priceRange.includes(price.value)}
                  onChange={() => handlePriceToggle(price.value)}
                  className="w-4 h-4 rounded border-2 border-purple-400 bg-transparent checked:bg-purple-500 checked:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
                />
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                  {price.label}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Rating */}
        <FilterSection
          title="Minimum Rating"
          icon={<Star className="w-4 h-4 text-purple-300" />}
          sectionKey="rating"
        >
          <div className="space-y-2">
            {[4, 4.5, 5].map(rating => (
              <label key={rating} className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.rating === rating}
                  onChange={() => onFilterChange({ rating })}
                  className="w-4 h-4 border-2 border-purple-400 bg-transparent checked:bg-purple-500 checked:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
                />
                <div className="flex items-center space-x-1">
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                    {rating}+ stars
                  </span>
                  <div className="flex">
                    {Array.from({ length: Math.floor(rating) }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                    {rating % 1 !== 0 && (
                      <div className="relative">
                        <Star className="w-3 h-3 text-gray-400" />
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 absolute top-0 left-0 clip-half" />
                      </div>
                    )}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Availability */}
        <FilterSection
          title="Availability"
          icon={<Clock className="w-4 h-4 text-purple-300" />}
          sectionKey="availability"
        >
          <div className="space-y-2">
            {availabilityOptions.map(option => (
              <label key={option} className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="radio"
                  name="availability"
                  checked={filters.availability === option}
                  onChange={() => onFilterChange({ availability: option })}
                  className="w-4 h-4 border-2 border-purple-400 bg-transparent checked:bg-purple-500 checked:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
                />
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                  {option}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Specialties */}
        <FilterSection
          title="Specialties"
          icon={<Star className="w-4 h-4 text-purple-300" />}
          sectionKey="specialties"
        >
          <div className="space-y-2">
            {specialties.map(specialty => (
              <label key={specialty} className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.specialties.includes(specialty)}
                  onChange={() => handleSpecialtyToggle(specialty)}
                  className="w-4 h-4 rounded border-2 border-purple-400 bg-transparent checked:bg-purple-500 checked:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
                />
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                  {specialty}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.div
        className={`hidden lg:block w-80 bg-white/5 backdrop-blur-sm border border-purple-400/20 rounded-2xl overflow-hidden ${
          isOpen ? 'block' : 'hidden'
        }`}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {sidebarContent}
      </motion.div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 z-50 flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />

            {/* Sidebar */}
            <motion.div
              className="relative w-80 max-w-[80vw] bg-gray-900/95 backdrop-blur-md border-r border-purple-400/20 overflow-hidden"
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              {sidebarContent}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FilterSidebar;
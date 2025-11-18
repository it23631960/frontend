import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Download, RotateCcw } from 'lucide-react';

interface FilterState {
  startDate: string;
  endDate: string;
  statuses: string[];
  search: string;
  serviceId: string;
}

interface AppointmentFilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
  onExport: () => void;
}

export const AppointmentFilterBar: React.FC<AppointmentFilterBarProps> = ({
  filters,
  onFilterChange,
  onReset,
  onExport
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleStatusToggle = (status: string) => {
    const newStatuses = filters.statuses.includes(status)
      ? filters.statuses.filter(s => s !== status)
      : [...filters.statuses, status];
    
    onFilterChange({ ...filters, statuses: newStatuses });
  };

  const handleQuickDate = (type: 'today' | 'tomorrow' | 'week') => {
    const today = new Date();
    const start = new Date(today);
    let end = new Date(today);

    switch (type) {
      case 'today':
        break;
      case 'tomorrow':
        start.setDate(start.getDate() + 1);
        end.setDate(end.getDate() + 1);
        break;
      case 'week':
        end.setDate(end.getDate() + 7);
        break;
    }

    onFilterChange({
      ...filters,
      startDate: start.toISOString().split('T')[0],
      endDate: end.toISOString().split('T')[0]
    });
  };

  const statusOptions = [
    { value: 'ALL', label: 'All', checked: filters.statuses.length === 0 },
    { value: 'PENDING', label: 'Pending', checked: filters.statuses.includes('PENDING') },
    { value: 'CONFIRMED', label: 'Confirmed', checked: filters.statuses.includes('CONFIRMED') },
    { value: 'COMPLETED', label: 'Completed', checked: filters.statuses.includes('COMPLETED') },
    { value: 'CANCELLED', label: 'Cancelled', checked: filters.statuses.includes('CANCELLED') }
  ];

  return (
    <motion.div
      className="bg-white/5 backdrop-blur-sm border border-purple-400/30 rounded-xl p-4 mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-purple-400" />
          <h3 className="text-white font-semibold">Filters & Search</h3>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-purple-400 hover:text-pink-400 text-sm font-medium lg:hidden"
        >
          {isExpanded ? 'Hide' : 'Show'} Filters
        </button>
      </div>

      {/* Filter Content */}
      <div className={`space-y-4 ${isExpanded ? 'block' : 'hidden'} lg:block`}>
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by customer name, phone, or email..."
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            className="w-full bg-white/5 border border-purple-400/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 focus:bg-white/10 transition-all outline-none"
          />
        </div>

        {/* Date Range */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              📅 Start Date
            </label>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => onFilterChange({ ...filters, startDate: e.target.value })}
              className="w-full bg-white/5 border border-purple-400/20 rounded-lg px-4 py-2 text-white focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 focus:bg-white/10 transition-all outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              📅 End Date
            </label>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => onFilterChange({ ...filters, endDate: e.target.value })}
              className="w-full bg-white/5 border border-purple-400/20 rounded-lg px-4 py-2 text-white focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 focus:bg-white/10 transition-all outline-none"
            />
          </div>
        </div>

        {/* Quick Date Buttons */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-400 mr-2">Quick:</span>
          <button
            onClick={() => handleQuickDate('today')}
            className="px-3 py-1 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg text-sm font-medium transition-all"
          >
            Today
          </button>
          <button
            onClick={() => handleQuickDate('tomorrow')}
            className="px-3 py-1 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg text-sm font-medium transition-all"
          >
            Tomorrow
          </button>
          <button
            onClick={() => handleQuickDate('week')}
            className="px-3 py-1 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg text-sm font-medium transition-all"
          >
            This Week
          </button>
        </div>

        {/* Status Checkboxes */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            📊 Status
          </label>
          <div className="flex flex-wrap gap-3">
            {statusOptions.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={option.checked}
                  onChange={() => {
                    if (option.value === 'ALL') {
                      onFilterChange({ ...filters, statuses: [] });
                    } else {
                      handleStatusToggle(option.value);
                    }
                  }}
                  className="w-4 h-4 rounded border-purple-400/30 bg-white/5 checked:bg-gradient-to-r checked:from-purple-500 checked:to-pink-600 focus:ring-2 focus:ring-pink-500/50"
                />
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Service Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            💇 Service
          </label>
          <select
            value={filters.serviceId}
            onChange={(e) => onFilterChange({ ...filters, serviceId: e.target.value })}
            className="w-full bg-white/5 border border-purple-400/20 rounded-lg px-4 py-2 text-white focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 focus:bg-white/10 transition-all outline-none"
          >
            <option value="">All Services</option>
            <option value="haircut">Haircut</option>
            <option value="coloring">Hair Coloring</option>
            <option value="styling">Hair Styling</option>
            <option value="treatment">Hair Treatment</option>
            <option value="beard">Beard Trim</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 pt-2">
          <motion.button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 border border-purple-500/50 text-purple-300 hover:bg-white/10 rounded-lg font-medium transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <RotateCcw className="w-4 h-4" />
            Reset Filters
          </motion.button>

          <motion.button
            onClick={onExport}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download className="w-4 h-4" />
            Export
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

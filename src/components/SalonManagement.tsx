import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, X, Save, Phone, Clock, MapPin } from 'lucide-react';
import { useSalonOperations } from '../hooks/useSalonOperations';
import { useSalonSearch } from '../hooks/useSalonSearch';
import { LoadingSpinner } from './LoadingComponents';
import { CreateSalonRequest, UpdateSalonRequest, BackendSalon } from '../services/types';

interface SalonManagementProps {
  isOpen: boolean;
  onClose: () => void;
}

const SalonManagement: React.FC<SalonManagementProps> = ({ isOpen, onClose }) => {
  const { loadSalons } = useSalonSearch();
  const { 
    isLoading, 
    error, 
    getSalon, 
    createSalon, 
    updateSalon, 
    deleteSalon, 
    clearError 
  } = useSalonOperations();

  const [salons] = useState<BackendSalon[]>([]);
  const [selectedSalon, setSelectedSalon] = useState<BackendSalon | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<CreateSalonRequest>({
    name: '',
    description: '',
    bannerImage: '',
    images: [],
    reviews: [],
    address: '',
    phone: '',
    email: '',
    services: [],
    openTime: '09:00',
    closeTime: '18:00',
    available: true,
    manager: '',
    bookings: [],
    slotsBooked: []
  });

  // Load salons when component opens
  useEffect(() => {
    if (isOpen) {
      loadSalonsData();
    }
  }, [isOpen]);

  const loadSalonsData = async () => {
    try {
      // This would ideally be a separate API call for admin view
      // For now, we'll use the existing search functionality
      await loadSalons();
    } catch (error) {
      console.error('Error loading salons:', error);
    }
  };

  const handleCreateSalon = async () => {
    const result = await createSalon(formData);
    if (result) {
      setIsCreating(false);
      resetForm();
      loadSalonsData();
    }
  };

  const handleUpdateSalon = async () => {
    if (!selectedSalon?.id) return;
    
    const updateData: UpdateSalonRequest = {
      ...formData,
      id: selectedSalon.id
    };
    
    const result = await updateSalon(selectedSalon.id, updateData);
    if (result) {
      setIsEditing(false);
      setSelectedSalon(null);
      resetForm();
      loadSalonsData();
    }
  };

  const handleDeleteSalon = async (salon: BackendSalon) => {
    if (!salon.id) return;
    
    const confirmed = window.confirm(`Are you sure you want to delete "${salon.name}"?`);
    if (confirmed) {
      const success = await deleteSalon(salon.id, salon.name);
      if (success) {
        loadSalonsData();
      }
    }
  };

  const handleEditSalon = async (salon: BackendSalon) => {
    if (!salon.id) return;
    
    const fullSalon = await getSalon(salon.id);
    if (fullSalon) {
      setSelectedSalon(fullSalon);
      setFormData({
        name: fullSalon.name,
        description: fullSalon.description,
        bannerImage: fullSalon.bannerImage,
        images: fullSalon.images,
        reviews: fullSalon.reviews,
        address: fullSalon.address,
        phone: fullSalon.phone,
        email: fullSalon.email,
        services: fullSalon.services,
        openTime: fullSalon.openTime,
        closeTime: fullSalon.closeTime,
        available: fullSalon.available,
        manager: fullSalon.manager,
        bookings: fullSalon.bookings,
        slotsBooked: fullSalon.slotsBooked
      });
      setIsEditing(true);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      bannerImage: '',
      images: [],
      reviews: [],
      address: '',
      phone: '',
      email: '',
      services: [],
      openTime: '09:00',
      closeTime: '18:00',
      available: true,
      manager: '',
      bookings: [],
      slotsBooked: []
    });
  };

  const handleArrayFieldChange = (field: keyof CreateSalonRequest, value: string) => {
    const array = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData(prev => ({ ...prev, [field]: array }));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative w-full max-w-6xl max-h-[90vh] mx-4 bg-gray-900/95 backdrop-blur-md border border-purple-400/20 rounded-2xl overflow-hidden"
          initial={{ scale: 0.9, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 50 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h2 className="text-2xl font-bold text-white">Salon Management</h2>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsCreating(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Salon</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            {/* Error Display */}
            {error && (
              <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300">
                {error}
                <button
                  onClick={clearError}
                  className="ml-2 text-red-400 hover:text-red-300"
                >
                  ×
                </button>
              </div>
            )}

            {/* Create/Edit Form */}
            {(isCreating || isEditing) && (
              <motion.div
                className="mb-6 p-6 bg-white/5 border border-white/10 rounded-xl"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-xl font-semibold text-white mb-4">
                  {isCreating ? 'Create New Salon' : 'Edit Salon'}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Salon Name *"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  
                  <input
                    type="text"
                    placeholder="Manager Name"
                    value={formData.manager}
                    onChange={(e) => setFormData(prev => ({ ...prev, manager: e.target.value }))}
                    className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  
                  <input
                    type="text"
                    placeholder="Address *"
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  
                  <input
                    type="url"
                    placeholder="Banner Image URL"
                    value={formData.bannerImage}
                    onChange={(e) => setFormData(prev => ({ ...prev, bannerImage: e.target.value }))}
                    className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  
                  <div className="flex space-x-2">
                    <input
                      type="time"
                      value={formData.openTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, openTime: e.target.value }))}
                      className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                      type="time"
                      value={formData.closeTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, closeTime: e.target.value }))}
                      className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  
                  <label className="flex items-center space-x-2 text-white">
                    <input
                      type="checkbox"
                      checked={formData.available}
                      onChange={(e) => setFormData(prev => ({ ...prev, available: e.target.checked }))}
                      className="w-4 h-4 text-purple-500 rounded focus:ring-purple-500"
                    />
                    <span>Currently Available</span>
                  </label>
                </div>
                
                <div className="mt-4">
                  <textarea
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Services (comma-separated)"
                    value={formData.services.join(', ')}
                    onChange={(e) => handleArrayFieldChange('services', e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    onClick={() => {
                      setIsCreating(false);
                      setIsEditing(false);
                      setSelectedSalon(null);
                      resetForm();
                    }}
                    className="px-4 py-2 border border-gray-500 text-gray-300 rounded-lg hover:bg-gray-500/10 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={isCreating ? handleCreateSalon : handleUpdateSalon}
                    disabled={isLoading || !formData.name || !formData.address || !formData.phone}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isLoading ? 'Saving...' : (isCreating ? 'Create' : 'Update')}</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Salons List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {salons.map((salon) => (
                <motion.div
                  key={salon.id}
                  className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-white">{salon.name}</h4>
                      <p className="text-sm text-gray-400">{salon.manager}</p>
                    </div>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleEditSalon(salon)}
                        className="p-1 text-blue-400 hover:text-blue-300 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteSalon(salon)}
                        className="p-1 text-red-400 hover:text-red-300 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">{salon.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-3 h-3" />
                      <span>{salon.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3 h-3" />
                      <span>{salon.openTime} - {salon.closeTime}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      salon.available 
                        ? 'bg-green-500/20 text-green-300' 
                        : 'bg-red-500/20 text-red-300'
                    }`}>
                      {salon.available ? 'Available' : 'Unavailable'}
                    </span>
                    <span className="text-xs text-gray-400">
                      {salon.services.length} services
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {salons.length === 0 && !isLoading && (
              <div className="text-center text-gray-400 py-8">
                No salons found. Create your first salon above.
              </div>
            )}

            {isLoading && (
              <div className="text-center text-purple-300 py-8 flex items-center justify-center space-x-3">
                <LoadingSpinner size="sm" color="purple" />
                <span>Loading salons...</span>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SalonManagement;
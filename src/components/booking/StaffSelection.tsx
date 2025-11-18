import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, User, Award, X } from 'lucide-react';
import { StaffMember } from '../../types/booking';

interface StaffSelectionProps {
  staff: StaffMember[];
  selectedStaffId: string | null;
  onStaffSelect: (staffId: string) => void;
}

const StaffSelection: React.FC<StaffSelectionProps> = ({
  staff,
  selectedStaffId,
  onStaffSelect
}) => {
  const [selectedProfile, setSelectedProfile] = useState<StaffMember | null>(null);

  const handleStaffClick = (staffMember: StaffMember) => {
    if (staffMember.id === 'any') {
      onStaffSelect(staffMember.id);
    } else {
      setSelectedProfile(staffMember);
    }
  };

  const handleSelectStaff = (staffId: string) => {
    onStaffSelect(staffId);
    setSelectedProfile(null);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staff.map((staffMember, index) => (
            <motion.div
              key={staffMember.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group"
            >
              <div
                onClick={() => handleStaffClick(staffMember)}
                className={`
                  relative p-6 rounded-xl cursor-pointer transition-all duration-300 
                  border-2 backdrop-blur-md
                  ${selectedStaffId === staffMember.id
                    ? 'border-purple-400 bg-gradient-to-br from-purple-500/20 to-pink-500/20 shadow-lg shadow-purple-500/20'
                    : 'border-white/10 bg-white/5 hover:border-purple-400/50 hover:bg-white/10'
                  }
                  ${staffMember.id === 'any' ? 'ring-2 ring-yellow-400/30' : ''}
                `}
              >
                {/* Selection Indicator */}
                {selectedStaffId === staffMember.id && (
                  <div className="absolute top-4 right-4 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-3 h-3 bg-white rounded-full"
                    />
                  </div>
                )}

                <div className="text-center space-y-4">
                  {/* Profile Picture */}
                  <div className="relative mx-auto">
                    <div className="w-20 h-20 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                      {staffMember.id === 'any' ? (
                        <User className="w-10 h-10 text-purple-300" />
                      ) : (
                        <img
                          src={staffMember.image}
                          alt={staffMember.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiM4YjVjZjYiIGZpbGwtb3BhY2l0eT0iMC4yIi8+Cjx0ZXh0IHg9IjQwIiB5PSI0NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzhmNWNmNiIgZm9udC1zaXplPSIzMCI+8J+RpDwvdGV4dD4KPC9zdmc+';
                          }}
                        />
                      )}
                    </div>
                    {staffMember.id === 'any' && (
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                        Recommended
                      </div>
                    )}
                  </div>

                  {/* Staff Info */}
                  <div className="space-y-2">
                    <h5 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                      {staffMember.name}
                    </h5>
                    <p className="text-purple-300 text-sm font-medium">
                      {staffMember.role}
                    </p>
                    <p className="text-white/70 text-sm">
                      {staffMember.specialty}
                    </p>
                  </div>

                  {/* Rating & Experience */}
                  {staffMember.id !== 'any' && (
                    <div className="flex items-center justify-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white/70">{staffMember.rating}</span>
                        <span className="text-white/50">({staffMember.reviewCount})</span>
                      </div>
                      <div className="w-px h-4 bg-white/20" />
                      <div className="flex items-center space-x-1">
                        <Award className="w-4 h-4 text-purple-400" />
                        <span className="text-white/70">{staffMember.experience}y exp</span>
                      </div>
                    </div>
                  )}

                  {/* Specialties */}
                  {staffMember.specialties && staffMember.specialties.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-xs text-white/50 uppercase tracking-wider">Specialties:</div>
                      <div className="flex flex-wrap justify-center gap-1">
                        {staffMember.specialties.slice(0, 3).map((specialty) => (
                          <span
                            key={specialty}
                            className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/70"
                          >
                            {specialty}
                          </span>
                        ))}
                        {staffMember.specialties.length > 3 && (
                          <span className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/70">
                            +{staffMember.specialties.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Availability Status */}
                  <div className={`flex items-center justify-center space-x-1 text-sm ${
                    staffMember.available ? 'text-green-400' : 'text-red-400'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      staffMember.available ? 'bg-green-400' : 'bg-red-400'
                    }`} />
                    <span>{staffMember.available ? 'Available' : 'Busy'}</span>
                  </div>

                  {/* View Profile Button */}
                  {staffMember.id !== 'any' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProfile(staffMember);
                      }}
                      className="text-purple-300 hover:text-purple-200 text-sm underline"
                    >
                      View Profile
                    </button>
                  )}
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {staff.length === 0 && (
          <div className="text-center py-12">
            <div className="text-white/40 text-lg mb-2">No staff available</div>
            <div className="text-white/60 text-sm">Please check back later or contact the salon directly.</div>
          </div>
        )}
      </motion.div>

      {/* Staff Profile Modal */}
      <AnimatePresence>
        {selectedProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProfile(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative p-6 border-b border-white/10">
                <button
                  onClick={() => setSelectedProfile(null)}
                  className="absolute top-4 right-4 text-white/70 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                    <img
                      src={selectedProfile.image}
                      alt={selectedProfile.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDgiIGN5PSI0OCIgcj0iNDgiIGZpbGw9IiM4YjVjZjYiIGZpbGwtb3BhY2l0eT0iMC4yIi8+Cjx0ZXh0IHg9IjQ4IiB5PSI1NCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzhmNWNmNiIgZm9udC1zaXplPSIzNiI+8J+RpDwvdGV4dD4KPC9zdmc+';
                      }}
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedProfile.name}</h3>
                    <p className="text-purple-300 font-medium">{selectedProfile.role}</p>
                    <p className="text-white/70">{selectedProfile.specialty}</p>
                  </div>

                  <div className="flex items-center justify-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white/70">{selectedProfile.rating}</span>
                      <span className="text-white/50">({selectedProfile.reviewCount} reviews)</span>
                    </div>
                    <div className="w-px h-4 bg-white/20" />
                    <div className="flex items-center space-x-1">
                      <Award className="w-4 h-4 text-purple-400" />
                      <span className="text-white/70">{selectedProfile.experience} years experience</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Bio */}
                {selectedProfile.bio && (
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">About</h4>
                    <p className="text-white/70">{selectedProfile.bio}</p>
                  </div>
                )}

                {/* Specialties */}
                {selectedProfile.specialties && selectedProfile.specialties.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProfile.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-full text-sm text-white/80"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Portfolio */}
                {selectedProfile.portfolioImages && selectedProfile.portfolioImages.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Portfolio</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedProfile.portfolioImages.slice(0, 4).map((image, index) => (
                        <div key={index} className="aspect-square rounded-lg overflow-hidden bg-white/5">
                          <img
                            src={image}
                            alt={`Portfolio ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Select Button */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleSelectStaff(selectedProfile.id)}
                    className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold rounded-lg transition-all"
                  >
                    Select {selectedProfile.name}
                  </button>
                  <button
                    onClick={() => setSelectedProfile(null)}
                    className="px-6 py-3 border border-white/20 text-white/70 hover:text-white hover:border-white/40 rounded-lg transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StaffSelection;
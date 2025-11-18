import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  User, 
  MapPin, 
  Tag, 
  ChevronDown, 
  ChevronUp,
  Check,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { BookingData, Service, StaffMember, BookingStep } from '../../types/booking';

interface BookingSummaryProps {
  bookingData: BookingData;
  salonInfo: {
    name: string;
    address: string;
    phone: string;
    rating: number;
    reviewCount: number;
  };
  service?: Service;
  staff?: StaffMember;
  currentStep: BookingStep;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  bookingData,
  salonInfo,
  service,
  staff,
  currentStep
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [showPromoInput, setShowPromoInput] = useState(false);

  const applyPromoCode = () => {
    // Mock promo code validation
    if (promoCode.toLowerCase() === 'first20') {
      setPromoApplied(true);
      setPromoError('');
      setShowPromoInput(false);
    } else {
      setPromoError('Invalid promo code');
    }
  };

  const getDiscountAmount = () => {
    if (promoApplied && service) {
      return service.price * 0.2; // 20% discount
    }
    return 0;
  };

  const getTotalPrice = () => {
    if (!service) return 0;
    return service.price - getDiscountAmount();
  };

  const getStepStatus = (step: BookingStep) => {
    if (step < currentStep) return 'completed';
    if (step === currentStep) return 'current';
    return 'pending';
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="sticky top-24">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Booking Summary</h3>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="lg:hidden text-white/70 hover:text-white transition-colors"
            >
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence>
          <motion.div
            initial={{ height: 'auto' }}
            className={`${isExpanded || window.innerWidth >= 1024 ? '' : 'lg:block hidden'}`}
          >
            <div className="p-6 space-y-6">
              {/* Salon Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-purple-400" />
                  <div>
                    <div className="font-semibold text-white">{salonInfo.name}</div>
                    <div className="text-sm text-white/70">{salonInfo.address}</div>
                  </div>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-white/80 uppercase tracking-wider">Progress</h4>
                <div className="space-y-3">
                  {[
                    { step: BookingStep.SERVICE, label: 'Service', icon: Sparkles },
                    { step: BookingStep.STAFF, label: 'Stylist', icon: User },
                    { step: BookingStep.DATETIME, label: 'Date & Time', icon: Calendar },
                    { step: BookingStep.CUSTOMER_INFO, label: 'Your Info', icon: User }
                  ].map(({ step, label, icon: Icon }) => {
                    const status = getStepStatus(step);
                    return (
                      <div key={step} className="flex items-center space-x-3">
                        <div className={`
                          w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all
                          ${status === 'completed' 
                            ? 'bg-gradient-to-r from-green-400 to-emerald-500 border-green-400' 
                            : status === 'current'
                            ? 'border-purple-400 bg-purple-400/20'
                            : 'border-white/20 bg-white/5'
                          }
                        `}>
                          {status === 'completed' ? (
                            <Check className="w-3 h-3 text-white" />
                          ) : (
                            <Icon className={`w-3 h-3 ${
                              status === 'current' ? 'text-purple-400' : 'text-white/40'
                            }`} />
                          )}
                        </div>
                        <span className={`text-sm ${
                          status === 'completed' ? 'text-green-300' :
                          status === 'current' ? 'text-white' : 'text-white/50'
                        }`}>
                          {label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Selected Items */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-white/80 uppercase tracking-wider">Selected</h4>
                
                {/* Service */}
                {service ? (
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="font-medium text-white">{service.name}</div>
                        <div className="text-sm text-white/70">{service.duration} minutes</div>
                        <div className="text-xs text-white/50">{service.category}</div>
                      </div>
                      <div className="text-lg font-semibold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                        ${service.price}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10 text-center text-white/50">
                    Select a service
                  </div>
                )}

                {/* Staff */}
                {staff ? (
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                        {staff.id === 'any' ? (
                          <User className="w-full h-full p-1.5 text-purple-300" />
                        ) : (
                          <img
                            src={staff.image}
                            alt={staff.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiM4YjVjZjYiIGZpbGwtb3BhY2l0eT0iMC4yIi8+Cjx0ZXh0IHg9IjE2IiB5PSIyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzhmNWNmNiIgZm9udC1zaXplPSIxMiI+8J+RpDwvdGV4dD4KPC9zdmc+';
                            }}
                          />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-white">{staff.name}</div>
                        <div className="text-sm text-white/70">{staff.specialty}</div>
                      </div>
                    </div>
                  </div>
                ) : currentStep > BookingStep.SERVICE ? (
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10 text-center text-white/50">
                    Select a stylist
                  </div>
                ) : null}

                {/* Date & Time */}
                {bookingData.date && bookingData.time ? (
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-purple-400" />
                      <span className="font-medium text-white">{formatDate(bookingData.date)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-purple-400" />
                      <span className="font-medium text-white">{bookingData.time}</span>
                    </div>
                  </div>
                ) : currentStep >= BookingStep.DATETIME ? (
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10 text-center text-white/50">
                    Select date & time
                  </div>
                ) : null}
              </div>

              {/* Promo Code */}
              {service && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-white/80 uppercase tracking-wider">Promo Code</h4>
                  
                  {!promoApplied && !showPromoInput && (
                    <button
                      onClick={() => setShowPromoInput(true)}
                      className="w-full flex items-center justify-center space-x-2 py-3 border border-dashed border-purple-400/50 text-purple-300 hover:bg-purple-500/10 rounded-lg transition-all"
                    >
                      <Tag className="w-4 h-4" />
                      <span>Add Promo Code</span>
                    </button>
                  )}

                  {showPromoInput && !promoApplied && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-3"
                    >
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => {
                            setPromoCode(e.target.value);
                            setPromoError('');
                          }}
                          placeholder="Enter code"
                          className="flex-1 px-3 py-2 bg-white/5 border border-purple-400/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-400 text-sm"
                        />
                        <button
                          onClick={applyPromoCode}
                          disabled={!promoCode.trim()}
                          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-all"
                        >
                          Apply
                        </button>
                      </div>
                      {promoError && (
                        <div className="flex items-center space-x-2 text-red-400 text-sm">
                          <AlertTriangle className="w-4 h-4" />
                          <span>{promoError}</span>
                        </div>
                      )}
                      <div className="text-xs text-white/50">
                        Try "FIRST20" for 20% off your first visit
                      </div>
                    </motion.div>
                  )}

                  {promoApplied && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-lg p-3"
                    >
                      <div className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-green-400" />
                        <span className="text-green-300 font-medium">Promo Applied!</span>
                      </div>
                      <div className="text-sm text-white/70 mt-1">20% discount applied</div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Price Breakdown */}
              {service && (
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-white/80 uppercase tracking-wider">Price Details</h4>
                  
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">{service.name}</span>
                      <span className="text-white">${service.price}</span>
                    </div>
                    
                    {promoApplied && (
                      <div className="flex justify-between items-center text-green-400">
                        <span>Discount (20%)</span>
                        <span>-${getDiscountAmount().toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="border-t border-white/10 pt-3">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-white">Total</span>
                        <span className="text-xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                          ${getTotalPrice().toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Policies */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-white/80 uppercase tracking-wider">Policies</h4>
                <div className="text-xs text-white/60 space-y-2">
                  <div className="flex items-start space-x-2">
                    <Check className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Free cancellation up to 24 hours before</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Please arrive 10 minutes early</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Complimentary consultation included</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default BookingSummary;
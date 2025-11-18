import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Mail,
  Download,
  Share2,
  ArrowRight,
  Sparkles,
  Copy
} from 'lucide-react';
import { BookingData, Service, StaffMember } from '../../types/booking';
import { mockBookingService } from '../../services/bookingApiService';

interface BookingConfirmationProps {
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
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  bookingData,
  salonInfo,
  service,
  staff
}) => {
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    createBooking();
  }, []);

  const createBooking = async () => {
    try {
      setLoading(true);
      const bookingRequest = {
        salonId: bookingData.salonId,
        serviceId: bookingData.serviceId!,
        staffId: bookingData.staffId!,
        date: bookingData.date!,
        time: bookingData.time!,
        customerInfo: bookingData.customerInfo as any,
        specialRequests: bookingData.specialRequests
      };

      const confirmedBooking = await mockBookingService.createBooking(bookingRequest);
      setBooking(confirmedBooking);
      setReferenceNumber(confirmedBooking.referenceNumber);
    } catch (error) {
      console.error('Error creating booking:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyReferenceNumber = async () => {
    try {
      await navigator.clipboard.writeText(referenceNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy reference number:', error);
    }
  };

  const generateCalendarEvent = () => {
    if (!booking || !service) return '';

    const startDate = new Date(`${bookingData.date} ${bookingData.time}`);
    const endDate = new Date(startDate.getTime() + (service.duration * 60000));
    
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const calendarData = {
      title: `${service.name} at ${salonInfo.name}`,
      start: formatDate(startDate),
      end: formatDate(endDate),
      description: `Service: ${service.name}\\nStylist: ${staff?.name || 'Any Available'}\\nLocation: ${salonInfo.address}\\nPhone: ${salonInfo.phone}\\nReference: ${referenceNumber}`,
      location: salonInfo.address
    };

    return `data:text/calendar;charset=utf8,BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${calendarData.start}
DTEND:${calendarData.end}
SUMMARY:${calendarData.title}
DESCRIPTION:${calendarData.description}
LOCATION:${calendarData.location}
END:VEVENT
END:VCALENDAR`;
  };

  const shareAppointment = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Salon Appointment',
          text: `I have an appointment at ${salonInfo.name} on ${bookingData.date} at ${bookingData.time}. Reference: ${referenceNumber}`,
          url: window.location.href
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin" />
        <div className="text-white/70">Confirming your appointment...</div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="text-red-400 text-lg">Failed to create booking</div>
        <button
          onClick={createBooking}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Success Animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="text-center space-y-4"
      >
        <div className="relative">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="w-20 h-20 mx-auto bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>
          
          {/* Sparkle Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute inset-0 pointer-events-none"
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="absolute"
                style={{
                  top: `${20 + Math.random() * 60}%`,
                  left: `${20 + Math.random() * 60}%`,
                }}
              >
                <Sparkles className="w-4 h-4 text-yellow-400" />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-2"
        >
          <h3 className="text-3xl font-bold text-transparent bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text">
            Booking Confirmed!
          </h3>
          <p className="text-white/70">
            Your appointment has been successfully scheduled
          </p>
        </motion.div>
      </motion.div>

      {/* Reference Number */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/50 rounded-xl p-6 text-center"
      >
        <div className="space-y-3">
          <div className="text-sm text-white/70 uppercase tracking-wider">Confirmation Number</div>
          <div className="flex items-center justify-center space-x-3">
            <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
              {referenceNumber}
            </div>
            <button
              onClick={copyReferenceNumber}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors group"
              title="Copy reference number"
            >
              {copied ? (
                <CheckCircle className="w-5 h-5 text-green-400" />
              ) : (
                <Copy className="w-5 h-5 text-white/70 group-hover:text-white" />
              )}
            </button>
          </div>
          <div className="text-sm text-white/60">
            Save this number for your records
          </div>
        </div>
      </motion.div>

      {/* Appointment Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-6"
      >
        <h4 className="text-xl font-semibold text-white">Appointment Details</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Service Details */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <div className="font-semibold text-white">{service?.name}</div>
                  <div className="text-sm text-white/70">{service?.duration} minutes</div>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/70">Service Price:</span>
                  <span className="text-white font-medium">${service?.price}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span className="text-white">Total:</span>
                  <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                    ${bookingData.totalPrice}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <div className="font-semibold text-white">
                    {new Date(bookingData.date!).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                  <div className="text-sm text-white/70">Date</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <div className="font-semibold text-white">{bookingData.time}</div>
                  <div className="text-sm text-white/70">Appointment Time</div>
                </div>
              </div>
            </div>
          </div>

          {/* Staff Details */}
          {staff && staff.id !== 'any' && (
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                  <img
                    src={staff.image}
                    alt={staff.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiM4YjVjZjYiIGZpbGwtb3BhY2l0eT0iMC4yIi8+Cjx0ZXh0IHg9IjI0IiB5PSIyOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzhmNWNmNiIgZm9udC1zaXplPSIyMCI+8J+RpDwvdGV4dD4KPC9zdmc+';
                    }}
                  />
                </div>
                <div>
                  <div className="font-semibold text-white">{staff.name}</div>
                  <div className="text-sm text-purple-300">{staff.role}</div>
                  <div className="text-sm text-white/70">{staff.specialty}</div>
                </div>
              </div>
            </div>
          )}

          {/* Salon Details */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <div className="font-semibold text-white">{salonInfo.name}</div>
                  <div className="text-sm text-white/70">{salonInfo.address}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <div className="font-semibold text-white">{salonInfo.phone}</div>
                  <div className="text-sm text-white/70">Call for changes</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <h5 className="font-semibold text-white mb-4">Customer Information</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-white/70">Name:</span>
              <span className="ml-2 text-white">
                {bookingData.customerInfo.firstName} {bookingData.customerInfo.lastName}
              </span>
            </div>
            <div>
              <span className="text-white/70">Email:</span>
              <span className="ml-2 text-white">{bookingData.customerInfo.email}</span>
            </div>
            <div>
              <span className="text-white/70">Phone:</span>
              <span className="ml-2 text-white">{bookingData.customerInfo.phone}</span>
            </div>
            {bookingData.customerInfo.isFirstTime && (
              <div>
                <span className="px-2 py-1 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-400/30 rounded-full text-xs text-yellow-200">
                  First-time customer
                </span>
              </div>
            )}
          </div>
          
          {bookingData.specialRequests && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="text-white/70 text-sm mb-2">Special Requests:</div>
              <div className="text-white text-sm bg-white/5 rounded-lg p-3">
                {bookingData.specialRequests}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href={generateCalendarEvent()}
            download={`appointment-${referenceNumber}.ics`}
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold rounded-lg transition-all"
          >
            <Download className="w-5 h-5" />
            <span>Add to Calendar</span>
          </a>
          
          {'share' in navigator && (
            <button
              onClick={shareAppointment}
              className="flex items-center justify-center space-x-2 px-6 py-3 border border-purple-500/50 text-purple-300 hover:bg-purple-500/10 rounded-lg transition-all"
            >
              <Share2 className="w-5 h-5" />
              <span>Share Appointment</span>
            </button>
          )}
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => window.location.href = '/hair-salons'}
            className="flex items-center space-x-2 px-6 py-3 border border-white/20 text-white/70 hover:text-white hover:border-white/40 rounded-lg transition-all"
          >
            <span>Back to Salons</span>
          </button>
          
          <button
            onClick={() => window.location.href = '/profile'}
            className="flex items-center space-x-2 px-6 py-3 border border-purple-500/50 text-purple-300 hover:bg-purple-500/10 rounded-lg transition-all"
          >
            <span>View My Bookings</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Email Confirmation Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-400/30 rounded-xl p-4 backdrop-blur-sm"
      >
        <div className="flex items-start space-x-3">
          <Mail className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
          <div className="space-y-1">
            <div className="font-semibold text-green-300">Confirmation Email Sent</div>
            <div className="text-sm text-white/70">
              A confirmation email with your appointment details has been sent to {bookingData.customerInfo.email}.
              Please check your inbox (and spam folder) for the complete details and preparation instructions.
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BookingConfirmation;
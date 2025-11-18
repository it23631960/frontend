import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, Phone, Mail, Scissors, DollarSign, FileText, CreditCard, CheckCircle, XCircle, CalendarDays, MessageSquare, Printer } from 'lucide-react';
import { AppointmentData } from './AppointmentCard';
import { StatusBadge } from './StatusBadge';

interface AppointmentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: AppointmentData | null;
  onConfirm?: () => void;
  onReschedule?: () => void;
  onCancel?: () => void;
  onMessage?: () => void;
  onCall?: () => void;
  onEmail?: () => void;
  onPrint?: () => void;
}

export const AppointmentDetailsModal: React.FC<AppointmentDetailsModalProps> = ({
  isOpen,
  onClose,
  appointment,
  onConfirm,
  onReschedule,
  onCancel,
  onMessage,
  onCall,
  onEmail,
  onPrint
}) => {
  if (!appointment) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const canConfirm = appointment.status === 'PENDING';
  const canReschedule = ['PENDING', 'CONFIRMED'].includes(appointment.status);
  const canCancel = ['PENDING', 'CONFIRMED'].includes(appointment.status);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 w-full max-w-3xl shadow-2xl max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-white mb-4">
                Appointment Details
              </h2>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-lg font-semibold text-gray-300">
                  {appointment.appointmentNumber}
                </span>
                <StatusBadge status={appointment.status} size="lg" />
                <span className="text-gray-400">
                  {formatDate(appointment.appointmentDate)}
                </span>
              </div>
            </div>

            <div className="border-t border-white/10 my-6"></div>

            {/* Date & Time Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-3 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-400" />
                Date & Time
              </h3>
              <div className="bg-white/5 border border-purple-400/20 rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2 text-gray-200">
                  <CalendarDays className="w-4 h-4 text-purple-400" />
                  <span className="font-medium">{formatDate(appointment.appointmentDate)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-200">
                  <Clock className="w-4 h-4 text-purple-400" />
                  <span className="font-medium">
                    {appointment.startTime} - {appointment.endTime}
                  </span>
                  <span className="text-gray-400 text-sm">
                    ({appointment.service.duration} minutes)
                  </span>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-3 flex items-center gap-2">
                <User className="w-5 h-5 text-purple-400" />
                Customer Information
              </h3>
              <div className="bg-white/5 border border-purple-400/20 rounded-lg p-4 space-y-3">
                <div>
                  <span className="text-gray-400 text-sm">Name:</span>
                  <p className="text-white font-medium text-lg">{appointment.customer.name}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <span className="text-gray-400 text-sm flex items-center gap-1">
                      <Mail className="w-3 h-3" /> Email:
                    </span>
                    <a
                      href={`mailto:${appointment.customer.email}`}
                      className="text-purple-400 hover:text-pink-400 transition-colors break-all"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {appointment.customer.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm flex items-center gap-1">
                      <Phone className="w-3 h-3" /> Phone:
                    </span>
                    <a
                      href={`tel:${appointment.customer.phone}`}
                      className="text-purple-400 hover:text-pink-400 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {appointment.customer.phone}
                    </a>
                  </div>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 mt-2">
                  <span className="text-purple-300 text-sm font-medium">Status:</span>
                  <span className="text-white ml-2">Regular Customer</span>
                  <span className="text-gray-400 text-sm ml-2">(12 visits)</span>
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-3 flex items-center gap-2">
                <Scissors className="w-5 h-5 text-purple-400" />
                Service Details
              </h3>
              <div className="bg-white/5 border border-purple-400/20 rounded-lg p-4 space-y-3">
                <div>
                  <span className="text-gray-400 text-sm">Service:</span>
                  <p className="text-white font-medium text-lg">{appointment.service.name}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-gray-400 text-sm">Duration:</span>
                    <p className="text-white font-medium">{appointment.service.duration} minutes</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Price:</span>
                    <p className="text-white font-medium flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      Rs. {appointment.service.price.toLocaleString()}
                    </p>
                  </div>
                </div>
                {appointment.assignedStaff && (
                  <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-3">
                    <span className="text-pink-300 text-sm font-medium">Assigned Staff:</span>
                    <p className="text-white">{appointment.assignedStaff}</p>
                    <span className="text-gray-400 text-sm">(Rating: 4.9/5)</span>
                  </div>
                )}
              </div>
            </div>

            {/* Notes */}
            {appointment.notes && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-400" />
                  Notes
                </h3>
                <div className="bg-white/5 border border-purple-400/20 rounded-lg p-4">
                  <p className="text-gray-200 italic">{appointment.notes}</p>
                </div>
              </div>
            )}

            {/* Payment & Booking */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-3 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-purple-400" />
                Payment & Booking
              </h3>
              <div className="bg-white/5 border border-purple-400/20 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Payment Status:</span>
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 rounded-full text-sm font-medium">
                    Pending (Pay on arrival)
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Booked On:</span>
                  <p className="text-white font-medium">{formatDateTime(appointment.bookingDateTime)}</p>
                </div>
              </div>
            </div>

            {/* Cancellation Info (if cancelled) */}
            {appointment.status === 'CANCELLED' && appointment.cancellationReason && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-red-400 mb-3 flex items-center gap-2">
                  <XCircle className="w-5 h-5" />
                  Cancellation Information
                </h3>
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <p className="text-red-300">{appointment.cancellationReason}</p>
                </div>
              </div>
            )}

            <div className="border-t border-white/10 my-6"></div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {/* Primary Actions */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {canConfirm && onConfirm && (
                  <motion.button
                    onClick={onConfirm}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-green-500/30 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <CheckCircle className="w-4 h-4" />
                    Confirm
                  </motion.button>
                )}

                {canReschedule && onReschedule && (
                  <motion.button
                    onClick={onReschedule}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <CalendarDays className="w-4 h-4" />
                    Reschedule
                  </motion.button>
                )}

                {canCancel && onCancel && (
                  <motion.button
                    onClick={onCancel}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-red-500/30 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <XCircle className="w-4 h-4" />
                    Cancel
                  </motion.button>
                )}

                {onMessage && (
                  <motion.button
                    onClick={onMessage}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-500/30 hover:bg-purple-500/50 text-purple-300 font-semibold rounded-lg transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <MessageSquare className="w-4 h-4" />
                    Message
                  </motion.button>
                )}
              </div>

              {/* Secondary Actions */}
              <div className="grid grid-cols-3 gap-3">
                {onCall && (
                  <motion.button
                    onClick={onCall}
                    className="flex items-center justify-center gap-2 px-4 py-2 border border-purple-500/50 text-purple-300 hover:bg-white/10 rounded-lg font-medium transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Phone className="w-4 h-4" />
                    Call
                  </motion.button>
                )}

                {onEmail && (
                  <motion.button
                    onClick={onEmail}
                    className="flex items-center justify-center gap-2 px-4 py-2 border border-purple-500/50 text-purple-300 hover:bg-white/10 rounded-lg font-medium transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Mail className="w-4 h-4" />
                    Email
                  </motion.button>
                )}

                {onPrint && (
                  <motion.button
                    onClick={onPrint}
                    className="flex items-center justify-center gap-2 px-4 py-2 border border-purple-500/50 text-purple-300 hover:bg-white/10 rounded-lg font-medium transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Printer className="w-4 h-4" />
                    Print
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

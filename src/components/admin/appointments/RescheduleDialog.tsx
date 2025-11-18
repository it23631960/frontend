import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, CheckCircle } from 'lucide-react';
import { AppointmentData } from './AppointmentCard';

interface RescheduleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onReschedule: (newDate: string, newTime: string, reason: string, notifyCustomer: boolean) => void;
  appointment: AppointmentData | null;
  isLoading?: boolean;
}

const AVAILABLE_TIME_SLOTS = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'
];

// Mock booked slots (in real app, fetch from API)
const BOOKED_SLOTS = ['09:30 AM', '11:00 AM', '02:00 PM'];

export const RescheduleDialog: React.FC<RescheduleDialogProps> = ({
  isOpen,
  onClose,
  onReschedule,
  appointment,
  isLoading = false
}) => {
  const today = new Date().toISOString().split('T')[0];
  const [newDate, setNewDate] = useState(today);
  const [newTime, setNewTime] = useState('');
  const [reason, setReason] = useState('');
  const [notifyCustomer, setNotifyCustomer] = useState(true);

  if (!appointment) return null;

  const handleReschedule = () => {
    if (!newDate || !newTime) {
      alert('Please select both date and time');
      return;
    }
    onReschedule(newDate, newTime, reason, notifyCustomer);
  };

  const handleClose = () => {
    setNewDate(today);
    setNewTime('');
    setReason('');
    setNotifyCustomer(true);
    onClose();
  };

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
            onClick={handleClose}
          />

          {/* Dialog */}
          <motion.div
            className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Calendar className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                Reschedule Appointment
              </h3>
            </div>

            {/* Current Details */}
            <div className="bg-white/5 border border-purple-400/20 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-400 mb-2">Current Appointment:</p>
              <div className="space-y-1">
                <div className="text-gray-200 text-sm">
                  <span className="text-purple-400 font-medium">Customer:</span>{' '}
                  {appointment.customer.name}
                </div>
                <div className="text-gray-200 text-sm">
                  <span className="text-purple-400 font-medium">Service:</span>{' '}
                  {appointment.service.name} ({appointment.service.duration} mins)
                </div>
                <div className="text-gray-200 text-sm">
                  <span className="text-purple-400 font-medium">Current Date:</span>{' '}
                  {new Date(appointment.appointmentDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}{' '}
                  at {appointment.startTime}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-6 mb-6">
              {/* New Date */}
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  New Date
                </label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  min={today}
                  className="w-full bg-white/5 border border-purple-400/20 rounded-lg px-4 py-3 text-white focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 focus:bg-white/10 transition-all outline-none"
                />
              </div>

              {/* New Time - Grid */}
              <div>
                <label className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-400" />
                  New Time
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {AVAILABLE_TIME_SLOTS.map((slot) => {
                    const isBooked = BOOKED_SLOTS.includes(slot);
                    const isSelected = newTime === slot;

                    return (
                      <motion.button
                        key={slot}
                        onClick={() => !isBooked && setNewTime(slot)}
                        disabled={isBooked}
                        className={`
                          px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                          ${
                            isSelected
                              ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                              : isBooked
                              ? 'bg-red-500/20 text-red-300 cursor-not-allowed opacity-50'
                              : 'bg-purple-500/20 hover:bg-purple-500/40 text-purple-300'
                          }
                        `}
                        whileHover={!isBooked && !isSelected ? { scale: 1.05 } : {}}
                        whileTap={!isBooked && !isSelected ? { scale: 0.95 } : {}}
                      >
                        {slot}
                        {isBooked && <span className="block text-xs">Booked</span>}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Reason (Optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Reason for Rescheduling (Optional)
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="e.g., Staff unavailable, customer request..."
                  rows={3}
                  className="w-full bg-white/5 border border-purple-400/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 focus:bg-white/10 transition-all outline-none resize-none"
                />
              </div>

              {/* Notify Customer */}
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={notifyCustomer}
                  onChange={(e) => setNotifyCustomer(e.target.checked)}
                  className="w-5 h-5 rounded border-purple-400/30 bg-white/5 checked:bg-gradient-to-r checked:from-purple-500 checked:to-pink-600 focus:ring-2 focus:ring-pink-500/50"
                />
                <CheckCircle className="w-5 h-5 text-purple-400 group-hover:text-pink-400 transition-colors" />
                <span className="text-gray-200 group-hover:text-white transition-colors text-sm">
                  Notify customer about the change
                </span>
              </label>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <motion.button
                onClick={handleClose}
                disabled={isLoading}
                className="flex-1 px-6 py-3 border border-purple-500/50 text-purple-300 hover:bg-white/10 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={!isLoading ? { scale: 1.02 } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
              >
                Cancel
              </motion.button>

              <motion.button
                onClick={handleReschedule}
                disabled={isLoading || !newDate || !newTime}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={!isLoading && newDate && newTime ? { scale: 1.02 } : {}}
                whileTap={!isLoading && newDate && newTime ? { scale: 0.98 } : {}}
              >
                {isLoading ? 'Rescheduling...' : 'Reschedule'}
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

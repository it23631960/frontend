import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, CheckCircle } from 'lucide-react';
import { AppointmentData } from './AppointmentCard';

interface CancelDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCancel: (reason: string, notes: string, processRefund: boolean, notifyCustomer: boolean) => void;
  appointment: AppointmentData | null;
  isLoading?: boolean;
}

const CANCELLATION_REASONS = [
  'Customer requested',
  'Salon closure',
  'Staff unavailable',
  'Emergency',
  'Double booking',
  'Customer no-show',
  'Other'
];

export const CancelDialog: React.FC<CancelDialogProps> = ({
  isOpen,
  onClose,
  onCancel,
  appointment,
  isLoading = false
}) => {
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');
  const [processRefund, setProcessRefund] = useState(true);
  const [notifyCustomer, setNotifyCustomer] = useState(true);

  if (!appointment) return null;

  const handleCancel = () => {
    if (!reason) {
      alert('Please select a cancellation reason');
      return;
    }
    onCancel(reason, notes, processRefund, notifyCustomer);
  };

  const handleClose = () => {
    setReason('');
    setNotes('');
    setProcessRefund(true);
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
            className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto"
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
              <div className="p-3 bg-red-500/20 rounded-xl">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                Cancel Appointment?
              </h3>
            </div>

            {/* Warning */}
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 mb-6">
              <p className="text-red-300 text-sm flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>This action cannot be undone. The customer will be notified of the cancellation.</span>
              </p>
            </div>

            {/* Appointment Details */}
            <div className="bg-white/5 border border-purple-400/20 rounded-lg p-4 space-y-2 mb-6">
              <div className="text-gray-300 text-sm">
                <span className="text-purple-400 font-medium">Customer:</span>{' '}
                {appointment.customer.name}
              </div>
              <div className="text-gray-300 text-sm">
                <span className="text-purple-400 font-medium">Service:</span>{' '}
                {appointment.service.name}
              </div>
              <div className="text-gray-300 text-sm">
                <span className="text-purple-400 font-medium">Date:</span>{' '}
                {new Date(appointment.appointmentDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}{' '}
                at {appointment.startTime}
              </div>
            </div>

            {/* Form */}
            <div className="space-y-4 mb-6">
              {/* Reason Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Cancellation Reason <span className="text-red-400">*</span>
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full bg-white/5 border border-purple-400/20 rounded-lg px-4 py-3 text-white focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 focus:bg-white/10 transition-all outline-none"
                >
                  <option value="" disabled>Select a reason...</option>
                  {CANCELLATION_REASONS.map((r) => (
                    <option key={r} value={r} className="bg-gray-900">
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Provide any additional details..."
                  rows={3}
                  className="w-full bg-white/5 border border-purple-400/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 focus:bg-white/10 transition-all outline-none resize-none"
                />
              </div>

              {/* Checkboxes */}
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={processRefund}
                    onChange={(e) => setProcessRefund(e.target.checked)}
                    className="w-5 h-5 rounded border-purple-400/30 bg-white/5 checked:bg-gradient-to-r checked:from-purple-500 checked:to-pink-600 focus:ring-2 focus:ring-pink-500/50"
                  />
                  <CheckCircle className="w-5 h-5 text-purple-400 group-hover:text-pink-400 transition-colors" />
                  <span className="text-gray-200 group-hover:text-white transition-colors text-sm">
                    Process refund (if applicable)
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={notifyCustomer}
                    onChange={(e) => setNotifyCustomer(e.target.checked)}
                    className="w-5 h-5 rounded border-purple-400/30 bg-white/5 checked:bg-gradient-to-r checked:from-purple-500 checked:to-pink-600 focus:ring-2 focus:ring-pink-500/50"
                  />
                  <CheckCircle className="w-5 h-5 text-purple-400 group-hover:text-pink-400 transition-colors" />
                  <span className="text-gray-200 group-hover:text-white transition-colors text-sm">
                    Notify customer via email & SMS
                  </span>
                </label>
              </div>
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
                Go Back
              </motion.button>

              <motion.button
                onClick={handleCancel}
                disabled={isLoading || !reason}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-red-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={!isLoading && reason ? { scale: 1.02 } : {}}
                whileTap={!isLoading && reason ? { scale: 0.98 } : {}}
              >
                {isLoading ? 'Cancelling...' : 'Cancel Appointment'}
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Mail, MessageSquare } from 'lucide-react';
import { AppointmentData } from './AppointmentCard';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (sendEmail: boolean, sendSMS: boolean) => void;
  appointment: AppointmentData | null;
  isLoading?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  appointment,
  isLoading = false
}) => {
  const [sendEmail, setSendEmail] = useState(true);
  const [sendSMS, setSendSMS] = useState(true);

  if (!appointment) return null;

  const handleConfirm = () => {
    onConfirm(sendEmail, sendSMS);
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
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 w-full max-w-md shadow-2xl"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-500/20 rounded-xl">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                Confirm Appointment?
              </h3>
            </div>

            {/* Content */}
            <div className="space-y-4 mb-6">
              <div className="bg-white/5 border border-purple-400/20 rounded-lg p-4 space-y-2">
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

              {/* Notification Options */}
              <div>
                <p className="text-gray-300 font-medium mb-3">Send confirmation to customer:</p>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={sendEmail}
                      onChange={(e) => setSendEmail(e.target.checked)}
                      className="w-5 h-5 rounded border-purple-400/30 bg-white/5 checked:bg-gradient-to-r checked:from-purple-500 checked:to-pink-600 focus:ring-2 focus:ring-pink-500/50"
                    />
                    <Mail className="w-5 h-5 text-purple-400 group-hover:text-pink-400 transition-colors" />
                    <span className="text-gray-200 group-hover:text-white transition-colors">
                      Email
                    </span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={sendSMS}
                      onChange={(e) => setSendSMS(e.target.checked)}
                      className="w-5 h-5 rounded border-purple-400/30 bg-white/5 checked:bg-gradient-to-r checked:from-purple-500 checked:to-pink-600 focus:ring-2 focus:ring-pink-500/50"
                    />
                    <MessageSquare className="w-5 h-5 text-purple-400 group-hover:text-pink-400 transition-colors" />
                    <span className="text-gray-200 group-hover:text-white transition-colors">
                      SMS
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <motion.button
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 px-6 py-3 border border-purple-500/50 text-purple-300 hover:bg-white/10 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={!isLoading ? { scale: 1.02 } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
              >
                Cancel
              </motion.button>

              <motion.button
                onClick={handleConfirm}
                disabled={isLoading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-green-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={!isLoading ? { scale: 1.02 } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
              >
                {isLoading ? 'Confirming...' : 'Confirm'}
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

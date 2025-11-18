import React from 'react';
import { motion } from 'framer-motion';
import { Eye, CheckCircle, Calendar, XCircle, Mail } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

export interface AppointmentData {
  appointmentId: string;
  appointmentNumber: string;
  customer: {
    customerId: string;
    name: string;
    phone: string;
    email: string;
  };
  service: {
    serviceId: string;
    name: string;
    price: number;
    duration: number;
  };
  appointmentDate: string;
  startTime: string;
  endTime: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
  notes?: string;
  bookingDateTime: string;
  cancellationReason?: string;
  assignedStaff?: string;
}

interface AppointmentCardProps {
  appointment: AppointmentData;
  onViewDetails: () => void;
  onConfirm?: () => void;
  onReschedule?: () => void;
  onCancel?: () => void;
  index: number;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  onViewDetails,
  onConfirm,
  onReschedule,
  onCancel,
  index
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const canConfirm = appointment.status === 'PENDING';
  const canReschedule = ['PENDING', 'CONFIRMED'].includes(appointment.status);
  const canCancel = ['PENDING', 'CONFIRMED'].includes(appointment.status);

  return (
    <motion.div
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5 hover:bg-white/15 hover:shadow-xl hover:shadow-purple-500/30 transition-all"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        {/* Left Section - Main Info */}
        <div className="flex-1 space-y-3">
          {/* Header - Status + Appointment Number + Time */}
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status={appointment.status} size="md" />
            <span className="text-white font-semibold text-lg">
              {appointment.appointmentNumber}
            </span>
            <span className="text-gray-400 text-sm">
              {appointment.startTime} - {appointment.endTime}
            </span>
          </div>

          {/* Customer Info */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-white font-medium text-base">
                {appointment.customer.name}
              </span>
              <a
                href={`tel:${appointment.customer.phone}`}
                className="text-purple-400 hover:text-pink-400 text-sm transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                ({appointment.customer.phone})
              </a>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Mail className="w-3 h-3" />
              <span>{appointment.customer.email}</span>
            </div>
          </div>

          {/* Service Info */}
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <span className="font-medium">Service:</span>
            <span>{appointment.service.name}</span>
            <span className="text-purple-400 font-semibold">
              (Rs. {appointment.service.price.toLocaleString()})
            </span>
            <span className="text-gray-400">- {appointment.service.duration} mins</span>
          </div>

          {/* Assigned Staff */}
          {appointment.assignedStaff && (
            <div className="text-gray-400 text-sm">
              <span className="text-gray-300 font-medium">Staff:</span> {appointment.assignedStaff}
            </div>
          )}

          {/* Booking Date */}
          <div className="text-gray-400 text-xs">
            Booked: {formatDate(appointment.bookingDateTime)}
          </div>

          {/* Notes */}
          {appointment.notes && (
            <div className="bg-white/5 border border-purple-400/20 rounded-lg p-3 mt-2">
              <p className="text-gray-300 text-sm italic">
                <span className="text-purple-400 font-medium not-italic">Notes:</span> {appointment.notes}
              </p>
            </div>
          )}

          {/* Cancellation Reason */}
          {appointment.status === 'CANCELLED' && appointment.cancellationReason && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mt-2">
              <p className="text-red-300 text-sm">
                <span className="font-medium">Cancelled:</span> {appointment.cancellationReason}
              </p>
            </div>
          )}
        </div>

        {/* Right Section - Action Buttons */}
        <div className="flex lg:flex-col gap-2 flex-wrap">
          <motion.button
            onClick={onViewDetails}
            className="flex items-center gap-2 px-4 py-2 bg-purple-500/30 hover:bg-purple-500/50 text-purple-300 rounded-lg text-sm font-medium transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Eye className="w-4 h-4" />
            View Details
          </motion.button>

          {canConfirm && onConfirm && (
            <motion.button
              onClick={onConfirm}
              className="flex items-center gap-2 px-4 py-2 bg-green-500/30 hover:bg-green-500/50 text-green-300 rounded-lg text-sm font-medium transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CheckCircle className="w-4 h-4" />
              Confirm
            </motion.button>
          )}

          {canReschedule && onReschedule && (
            <motion.button
              onClick={onReschedule}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500/30 hover:bg-blue-500/50 text-blue-300 rounded-lg text-sm font-medium transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Calendar className="w-4 h-4" />
              Reschedule
            </motion.button>
          )}

          {canCancel && onCancel && (
            <motion.button
              onClick={onCancel}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/30 hover:bg-red-500/50 text-red-300 rounded-lg text-sm font-medium transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <XCircle className="w-4 h-4" />
              Cancel
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

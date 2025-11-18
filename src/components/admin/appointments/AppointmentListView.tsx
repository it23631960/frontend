import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AppointmentCard, AppointmentData } from './AppointmentCard';
import { EmptyState } from './EmptyState';

interface AppointmentListViewProps {
  appointments: AppointmentData[];
  onViewDetails: (appointment: AppointmentData) => void;
  onConfirm: (appointmentId: string) => void;
  onReschedule: (appointment: AppointmentData) => void;
  onCancel: (appointment: AppointmentData) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isFiltered: boolean;
  onResetFilters: () => void;
}

export const AppointmentListView: React.FC<AppointmentListViewProps> = ({
  appointments,
  onViewDetails,
  onConfirm,
  onReschedule,
  onCancel,
  currentPage,
  totalPages,
  onPageChange,
  isFiltered,
  onResetFilters
}) => {
  if (appointments.length === 0) {
    return (
      <EmptyState
        type={isFiltered ? 'no-filter-results' : 'no-appointments'}
        onReset={isFiltered ? onResetFilters : undefined}
      />
    );
  }

  const startIndex = (currentPage - 1) * 10 + 1;
  const endIndex = Math.min(currentPage * 10, startIndex + appointments.length - 1);
  const totalAppointments = totalPages * 10; // Approximate

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">
          📋 All Appointments
          <span className="text-gray-400 text-base font-normal ml-2">
            (Showing {startIndex}-{endIndex} of {totalAppointments})
          </span>
        </h3>
      </div>

      {/* Appointment List */}
      <div className="space-y-4">
        {appointments.map((appointment, index) => (
          <AppointmentCard
            key={appointment.appointmentId}
            appointment={appointment}
            onViewDetails={() => onViewDetails(appointment)}
            onConfirm={
              appointment.status === 'PENDING'
                ? () => onConfirm(appointment.appointmentId)
                : undefined
            }
            onReschedule={
              ['PENDING', 'CONFIRMED'].includes(appointment.status)
                ? () => onReschedule(appointment)
                : undefined
            }
            onCancel={
              ['PENDING', 'CONFIRMED'].includes(appointment.status)
                ? () => onCancel(appointment)
                : undefined
            }
            index={index}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          className="flex items-center justify-center gap-2 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Previous Button */}
          <motion.button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all"
            whileHover={currentPage !== 1 ? { scale: 1.05 } : {}}
            whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          {/* Page Numbers */}
          {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
            let pageNum: number;
            
            if (totalPages <= 7) {
              pageNum = i + 1;
            } else if (currentPage <= 4) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 3) {
              pageNum = totalPages - 6 + i;
            } else {
              pageNum = currentPage - 3 + i;
            }

            return (
              <motion.button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`
                  w-10 h-10 rounded-lg font-semibold transition-all
                  ${
                    currentPage === pageNum
                      ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                      : 'bg-white/10 hover:bg-white/20 text-gray-300'
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {pageNum}
              </motion.button>
            );
          })}

          {/* Next Button */}
          <motion.button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all"
            whileHover={currentPage !== totalPages ? { scale: 1.05 } : {}}
            whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

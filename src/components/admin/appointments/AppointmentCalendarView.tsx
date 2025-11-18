import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { AppointmentData } from './AppointmentCard';

interface AppointmentCalendarViewProps {
  appointments: AppointmentData[];
  onAppointmentClick: (appointment: AppointmentData) => void;
  viewMode: 'week' | 'month';
  onViewModeChange: (mode: 'week' | 'month') => void;
}

const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00', '13:00',
  '14:00', '15:00', '16:00', '17:00', '18:00'
];

export const AppointmentCalendarView: React.FC<AppointmentCalendarViewProps> = ({
  appointments,
  onAppointmentClick,
  viewMode,
  onViewModeChange
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getWeekDates = (date: Date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay() + 1); // Monday
    
    const dates = [];
    for (let i = 0; i < 5; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      dates.push(day);
    }
    return dates;
  };

  const weekDates = getWeekDates(currentDate);

  const getAppointmentForSlot = (date: Date, timeSlot: string) => {
    const dateStr = date.toISOString().split('T')[0];
    return appointments.filter((apt) => {
      const aptDate = new Date(apt.appointmentDate).toISOString().split('T')[0];
      const aptTime = apt.startTime.split(':').slice(0, 2).join(':');
      return aptDate === dateStr && aptTime === timeSlot;
    });
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + (direction === 'prev' ? -7 : 7));
    setCurrentDate(newDate);
  };

  const formatDateHeader = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatWeekRange = () => {
    const start = weekDates[0];
    const end = weekDates[4];
    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };

  return (
    <motion.div
      className="bg-white/5 backdrop-blur-sm border border-purple-400/30 rounded-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <CalendarIcon className="w-6 h-6 text-purple-400" />
          <h3 className="text-xl font-bold text-white">Weekly Schedule</h3>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-3">
          <motion.button
            onClick={() => navigateWeek('prev')}
            className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          <span className="text-white font-semibold min-w-[180px] text-center">
            {formatWeekRange()}
          </span>

          <motion.button
            onClick={() => navigateWeek('next')}
            className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* View Mode Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => onViewModeChange('week')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              viewMode === 'week'
                ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => onViewModeChange('month')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              viewMode === 'month'
                ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            Month
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Days Header */}
          <div className="grid grid-cols-6 gap-2 mb-2">
            <div className="px-2 py-3 bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-lg text-center">
              <span className="text-purple-300 font-semibold text-sm">Time</span>
            </div>
            {weekDates.map((date, idx) => (
              <div
                key={idx}
                className="px-2 py-3 bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-lg text-center"
              >
                <div className="text-purple-300 font-semibold text-sm">
                  {date.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className="text-gray-300 text-xs">
                  {formatDateHeader(date)}
                </div>
              </div>
            ))}
          </div>

          {/* Time Slots */}
          {TIME_SLOTS.map((timeSlot) => (
            <div key={timeSlot} className="grid grid-cols-6 gap-2 mb-2">
              {/* Time Label */}
              <div className="px-2 py-3 bg-white/5 rounded-lg flex items-center justify-center">
                <span className="text-gray-300 text-sm font-medium">{timeSlot}</span>
              </div>

              {/* Day Cells */}
              {weekDates.map((date, dayIdx) => {
                const dayAppointments = getAppointmentForSlot(date, timeSlot);
                const hasAppointment = dayAppointments.length > 0;
                const appointment = dayAppointments[0]; // Show first appointment

                // Lunch break
                if (timeSlot === '13:00') {
                  return (
                    <div
                      key={`${timeSlot}-${dayIdx}`}
                      className="px-2 py-3 bg-white/10 rounded-lg flex items-center justify-center"
                    >
                      <span className="text-gray-400 text-xs italic">LUNCH</span>
                    </div>
                  );
                }

                if (!hasAppointment) {
                  return (
                    <div
                      key={`${timeSlot}-${dayIdx}`}
                      className="px-2 py-3 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center cursor-pointer transition-all"
                    >
                      <span className="text-gray-500 text-xs">-</span>
                    </div>
                  );
                }

                // Has appointment
                const statusColors = {
                  CONFIRMED: 'bg-green-500/20 border-l-4 border-green-500',
                  PENDING: 'bg-yellow-500/20 border-l-4 border-yellow-500',
                  CANCELLED: 'bg-red-500/20 border-l-4 border-red-500',
                  COMPLETED: 'bg-blue-500/20 border-l-4 border-blue-500',
                  NO_SHOW: 'bg-gray-500/20 border-l-4 border-gray-500'
                };

                return (
                  <motion.div
                    key={`${timeSlot}-${dayIdx}`}
                    onClick={() => onAppointmentClick(appointment)}
                    className={`
                      px-2 py-2 rounded-lg cursor-pointer transition-all hover:scale-105
                      ${statusColors[appointment.status]}
                    `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-xs space-y-0.5">
                      <div className="text-white font-medium truncate">
                        {appointment.customer.name.split(' ')[0]}
                      </div>
                      <div className="text-gray-300 text-[10px] truncate">
                        {appointment.service.name}
                      </div>
                      {dayAppointments.length > 1 && (
                        <div className="text-purple-300 text-[10px]">
                          +{dayAppointments.length - 1} more
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <span className="text-gray-400 font-medium">Legend:</span>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500/40 border-l-4 border-green-500 rounded"></div>
            <span className="text-gray-300">Confirmed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500/40 border-l-4 border-yellow-500 rounded"></div>
            <span className="text-gray-300">Pending</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500/40 border-l-4 border-red-500 rounded"></div>
            <span className="text-gray-300">Cancelled</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-white/20 rounded"></div>
            <span className="text-gray-300">Available</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

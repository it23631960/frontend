import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ChevronLeft, ChevronRight, Star, AlertCircle } from 'lucide-react';
import { TimeSlot, Service } from '../../types/booking';

interface DateTimeSelectionProps {
  selectedDate: string | null;
  selectedTime: string | null;
  timeSlots: TimeSlot[];
  onDateSelect: (date: string) => void;
  onTimeSelect: (time: string, timeSlotId?: string) => void;
  loading: boolean;
  service?: Service;
}

const DateTimeSelection: React.FC<DateTimeSelectionProps> = ({
  selectedDate,
  selectedTime,
  timeSlots,
  onDateSelect,
  onTimeSelect,
  loading,
  service
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Generate calendar dates
  const generateCalendarDates = () => {
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const dates = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date);
    }

    return dates;
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const isDateAvailable = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today && date.getMonth() === currentMonth.getMonth();
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return formatDate(date) === formatDate(today);
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    const today = new Date();
    const prevMonthDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    if (prevMonthDate >= new Date(today.getFullYear(), today.getMonth(), 1)) {
      setCurrentMonth(prevMonthDate);
    }
  };

  const formatTimeSlots = () => {
    const morningSlots = timeSlots.filter(slot => {
      const hour = parseInt(slot.time.split(':')[0]);
      const isPM = slot.time.includes('PM');
      const hour24 = isPM && hour !== 12 ? hour + 12 : (!isPM && hour === 12 ? 0 : hour);
      return hour24 < 12;
    });

    const afternoonSlots = timeSlots.filter(slot => {
      const hour = parseInt(slot.time.split(':')[0]);
      const isPM = slot.time.includes('PM');
      const hour24 = isPM && hour !== 12 ? hour + 12 : (!isPM && hour === 12 ? 0 : hour);
      return hour24 >= 12 && hour24 < 17;
    });

    const eveningSlots = timeSlots.filter(slot => {
      const hour = parseInt(slot.time.split(':')[0]);
      const isPM = slot.time.includes('PM');
      const hour24 = isPM && hour !== 12 ? hour + 12 : (!isPM && hour === 12 ? 0 : hour);
      return hour24 >= 17;
    });

    return { morningSlots, afternoonSlots, eveningSlots };
  };

  const getEndTime = (startTime: string, duration: number) => {
    if (!startTime || !duration) return '';
    
    const [time, period] = startTime.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    
    let hour24 = hours;
    if (period === 'PM' && hours !== 12) hour24 += 12;
    if (period === 'AM' && hours === 12) hour24 = 0;
    
    const endMinutes = (hour24 * 60) + minutes + duration;
    const endHour24 = Math.floor(endMinutes / 60);
    const endMin = endMinutes % 60;
    
    let endHour12 = endHour24 % 12;
    if (endHour12 === 0) endHour12 = 12;
    const endPeriod = endHour24 >= 12 ? 'PM' : 'AM';
    
    return `${endHour12}:${endMin.toString().padStart(2, '0')} ${endPeriod}`;
  };

  const calendarDates = generateCalendarDates();
  const { morningSlots, afternoonSlots, eveningSlots } = formatTimeSlots();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Calendar Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Calendar className="w-6 h-6 text-purple-400" />
          <h4 className="text-xl font-semibold text-white">Select Date</h4>
        </div>

        {/* Calendar Header */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={prevMonth}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h5 className="text-lg font-semibold text-white">
              {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h5>
            <button
              onClick={nextMonth}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Week Headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="p-2 text-center text-white/50 text-sm font-medium">
                {day}
              </div>
            ))}

            {/* Calendar Dates */}
            {calendarDates.map((date, index) => {
              const dateStr = formatDate(date);
              const available = isDateAvailable(date);
              const today = isToday(date);
              const selected = selectedDate === dateStr;

              return (
                <button
                  key={index}
                  onClick={() => available && onDateSelect(dateStr)}
                  disabled={!available}
                  className={`
                    p-2 text-sm rounded-lg transition-all relative
                    ${available 
                      ? 'text-white hover:bg-white/10 cursor-pointer' 
                      : 'text-white/30 cursor-not-allowed'
                    }
                    ${selected 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                      : ''
                    }
                    ${today && !selected 
                      ? 'ring-2 ring-purple-400/50 ring-inset' 
                      : ''
                    }
                    ${date.getMonth() !== currentMonth.getMonth() 
                      ? 'opacity-30' 
                      : ''
                    }
                  `}
                >
                  {date.getDate()}
                  {today && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Time Slots Section */}
      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Clock className="w-6 h-6 text-purple-400" />
              <h4 className="text-xl font-semibold text-white">Available Times</h4>
            </div>
            {service && (
              <div className="text-sm text-white/70">
                Service duration: {service.duration} minutes
              </div>
            )}
          </div>

          {loading ? (
            <div className="space-y-4">
              {['Morning', 'Afternoon', 'Evening'].map((period) => (
                <div key={period} className="space-y-3">
                  <div className="h-5 bg-white/10 rounded animate-pulse w-24" />
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="h-12 bg-white/5 rounded-lg animate-pulse" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Time Period Sections */}
              {[
                { title: 'Morning', slots: morningSlots, icon: '🌅' },
                { title: 'Afternoon', slots: afternoonSlots, icon: '☀️' },
                { title: 'Evening', slots: eveningSlots, icon: '🌙' }
              ].map(({ title, slots, icon }) => {
                if (slots.length === 0) return null;

                return (
                  <div key={title} className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{icon}</span>
                      <h5 className="text-lg font-medium text-white">{title}</h5>
                      <div className="text-sm text-white/50">({slots.length} slots)</div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {slots.map((slot) => (
                        <button
                          key={slot.time}
                          onClick={() => slot.available && onTimeSelect(slot.time, slot.id)}
                          disabled={!slot.available}
                          className={`
                            relative p-3 rounded-lg transition-all text-left border
                            ${slot.available
                              ? selectedTime === slot.time
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-purple-400 text-white shadow-lg'
                                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-purple-400/50 text-white'
                              : 'bg-white/5 border-white/10 text-white/40 cursor-not-allowed'
                            }
                          `}
                        >
                          {/* Popular Badge */}
                          {slot.popular && slot.available && (
                            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center space-x-1">
                              <Star className="w-3 h-3 fill-current" />
                              <span>Popular</span>
                            </div>
                          )}

                          {/* Last Spot Badge */}
                          {slot.lastSpot && slot.available && (
                            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-400 to-pink-400 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center space-x-1">
                              <AlertCircle className="w-3 h-3" />
                              <span>Last</span>
                            </div>
                          )}

                          <div className="font-medium">{slot.time}</div>
                          {service && slot.available && (
                            <div className="text-xs text-white/60 mt-1">
                              Ends {getEndTime(slot.time, service.duration)}
                            </div>
                          )}
                          {!slot.available && (
                            <div className="text-xs text-white/40 mt-1">Booked</div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}

              {timeSlots.length === 0 && !loading && (
                <div className="text-center py-8 space-y-2">
                  <div className="text-white/40 text-lg">No available time slots</div>
                  <div className="text-white/60 text-sm">
                    Please select a different date or contact the salon directly.
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      )}

      {/* Service Info */}
      {service && selectedDate && selectedTime && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/30 rounded-xl p-4 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-semibold text-white">{service.name}</h5>
              <p className="text-sm text-white/70">Duration: {service.duration} minutes</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                ${service.price}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DateTimeSelection;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  confirmAppointment, 
  cancelAppointment,
  ConfirmAppointmentDTO,
  CancelAppointmentDTO 
} from '../../../services/appointmentApiService';
import { useToast, ToastContainer } from '../../common/Toast';

interface Appointment {
  id: string;
  customerName: string;
  service: string;
  date: string;
  time: string;
  duration: string;
  price: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  staffName: string;
}

interface UpcomingAppointmentsProps {
  appointments: Appointment[];
  onAppointmentUpdate?: () => void; // Callback to refresh data after actions
}

const UpcomingAppointments: React.FC<UpcomingAppointmentsProps> = ({ 
  appointments, 
  onAppointmentUpdate 
}) => {
  const [loadingActions, setLoadingActions] = useState<Record<string, boolean>>({});
  const { toasts, closeToast, success, error: showError } = useToast();
  
  const handleConfirm = async (appointmentId: string) => {
    try {
      setLoadingActions(prev => ({ ...prev, [appointmentId]: true }));
      
      const confirmData: ConfirmAppointmentDTO = {
        sendNotification: true,
        notificationMethod: 'EMAIL'
      };
      
      await confirmAppointment(appointmentId, confirmData);
      
      // Show success toast
      success('Appointment confirmed successfully!');
      
      // Trigger refresh
      if (onAppointmentUpdate) {
        onAppointmentUpdate();
      }
    } catch (err) {
      console.error('Error confirming appointment:', err);
      showError('Failed to confirm appointment. Please try again.');
    } finally {
      setLoadingActions(prev => ({ ...prev, [appointmentId]: false }));
    }
  };
  
  const handleCancel = async (appointmentId: string) => {
    const confirmed = window.confirm('Are you sure you want to cancel this appointment?');
    if (!confirmed) return;
    
    try {
      setLoadingActions(prev => ({ ...prev, [appointmentId]: true }));
      
      const cancelData: CancelAppointmentDTO = {
        cancelledBy: 'SALON',
        reason: 'Cancelled by salon owner',
        sendNotification: true,
        refund: false
      };
      
      await cancelAppointment(appointmentId, cancelData);
      
      // Show success toast
      success('Appointment cancelled successfully!');
      
      // Trigger refresh
      if (onAppointmentUpdate) {
        onAppointmentUpdate();
      }
    } catch (err) {
      console.error('Error cancelling appointment:', err);
      showError('Failed to cancel appointment. Please try again.');
    } finally {
      setLoadingActions(prev => ({ ...prev, [appointmentId]: false }));
    }
  };
  
  const getStatusBadge = (status: string) => {
    const styles = {
      confirmed: 'bg-green-500/20 border-green-500/30 text-green-400',
      pending: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400',
      cancelled: 'bg-red-500/20 border-red-500/30 text-red-400'
    };
    
    const icons = {
      confirmed: CheckCircle,
      pending: Clock,
      cancelled: AlertCircle
    };

    const Icon = icons[status as keyof typeof icons];
    
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles]}`}>
        <Icon className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-8"
    >
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onClose={closeToast} />
      
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          📅 Upcoming This Week
        </h2>
        <Link
          to="/owner/appointments"
          className="text-purple-400 hover:text-pink-400 text-sm font-medium transition-colors"
        >
          View All →
        </Link>
      </div>

      <div className="space-y-4">
        {appointments.map((appointment, index) => (
          <motion.div
            key={appointment.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-5 transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-white">{appointment.customerName}</h3>
                  {getStatusBadge(appointment.status)}
                </div>
                <p className="text-purple-300 font-medium mb-3">{appointment.service}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-400">
                  Rs. {appointment.price.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <Calendar className="w-4 h-4 text-purple-400" />
                <span>{new Date(appointment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Clock className="w-4 h-4 text-pink-400" />
                <span>{appointment.time} ({appointment.duration})</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <User className="w-4 h-4 text-blue-400" />
                <span>{appointment.staffName}</span>
              </div>
              <div className="flex items-center justify-end gap-2">
                {appointment.status === 'pending' && (
                  <>
                    <button 
                      onClick={() => handleConfirm(appointment.id)}
                      disabled={loadingActions[appointment.id]}
                      className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-lg text-green-300 text-xs font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loadingActions[appointment.id] ? 'Confirming...' : 'Confirm'}
                    </button>
                    <button 
                      onClick={() => handleCancel(appointment.id)}
                      disabled={loadingActions[appointment.id]}
                      className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-red-300 text-xs font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loadingActions[appointment.id] ? 'Cancelling...' : 'Cancel'}
                    </button>
                  </>
                )}
                {appointment.status === 'confirmed' && (
                  <button className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-blue-300 text-xs font-medium transition-all">
                    View Details
                  </button>
                )}
                {appointment.status === 'cancelled' && (
                  <span className="px-4 py-2 text-gray-500 text-xs font-medium">
                    Cancelled
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {appointments.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No upcoming appointments this week</p>
          <button className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all">
            Create New Booking
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default UpcomingAppointments;

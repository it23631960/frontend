import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AppointmentStatsWidget } from './AppointmentStatsWidget';
import { AppointmentFilterBar } from './AppointmentFilterBar';
import { AppointmentListView } from './AppointmentListView';
import { AppointmentCalendarView } from './AppointmentCalendarView';
import { AppointmentDetailsModal } from './AppointmentDetailsModal';
import { ConfirmDialog } from './ConfirmDialog';
import { RescheduleDialog } from './RescheduleDialog';
import { CancelDialog } from './CancelDialog';
import { LoadingSkeleton } from './LoadingSkeleton';
import { AppointmentData } from './AppointmentCard';
import { Calendar, List } from 'lucide-react';

// Mock Data for Testing
const MOCK_STATS = {
  todayCount: 8,
  pendingCount: 3,
  completedThisWeek: 24,
  weeklyRevenue: 45000,
  averageRating: 4.8,
  busiestHour: '14:00-16:00'
};

const MOCK_APPOINTMENTS: AppointmentData[] = [
  {
    appointmentId: '1',
    appointmentNumber: '#APT001',
    customer: {
      customerId: '1',
      name: 'Sarah Johnson',
      phone: '+94771234567',
      email: 'sarah.johnson@gmail.com'
    },
    service: {
      serviceId: '1',
      name: "Men's Haircut",
      price: 1500,
      duration: 30
    },
    appointmentDate: '2025-10-11',
    startTime: '09:00 AM',
    endTime: '09:30 AM',
    status: 'CONFIRMED',
    notes: 'Regular customer, prefers stylist Priya',
    bookingDateTime: '2025-10-08T14:30:00',
    assignedStaff: 'Priya Fernando'
  },
  {
    appointmentId: '2',
    appointmentNumber: '#APT002',
    customer: {
      customerId: '2',
      name: 'Priya Fernando',
      phone: '+94772345678',
      email: 'priya.fernando@gmail.com'
    },
    service: {
      serviceId: '2',
      name: "Women's Haircut",
      price: 2500,
      duration: 60
    },
    appointmentDate: '2025-10-11',
    startTime: '10:00 AM',
    endTime: '11:00 AM',
    status: 'PENDING',
    notes: 'First time customer',
    bookingDateTime: '2025-10-09T10:15:00'
  },
  {
    appointmentId: '3',
    appointmentNumber: '#APT003',
    customer: {
      customerId: '3',
      name: 'Mike Williams',
      phone: '+94773456789',
      email: 'mike.w@gmail.com'
    },
    service: {
      serviceId: '3',
      name: 'Beard Trim',
      price: 800,
      duration: 30
    },
    appointmentDate: '2025-10-11',
    startTime: '11:00 AM',
    endTime: '11:30 AM',
    status: 'CANCELLED',
    notes: '',
    bookingDateTime: '2025-10-07T16:20:00',
    cancellationReason: 'Schedule conflict - Customer requested'
  },
  {
    appointmentId: '4',
    appointmentNumber: '#APT004',
    customer: {
      customerId: '4',
      name: 'Kumari Silva',
      phone: '+94774567890',
      email: 'kumari.silva@gmail.com'
    },
    service: {
      serviceId: '4',
      name: 'Hair Coloring',
      price: 3500,
      duration: 90
    },
    appointmentDate: '2025-10-11',
    startTime: '02:00 PM',
    endTime: '03:30 PM',
    status: 'CONFIRMED',
    notes: 'Wants auburn color',
    bookingDateTime: '2025-10-05T11:45:00',
    assignedStaff: 'Ananya Perera'
  },
  {
    appointmentId: '5',
    appointmentNumber: '#APT005',
    customer: {
      customerId: '5',
      name: 'David Chen',
      phone: '+94775678901',
      email: 'david.chen@gmail.com'
    },
    service: {
      serviceId: '5',
      name: 'Hair Treatment',
      price: 2000,
      duration: 45
    },
    appointmentDate: '2025-10-12',
    startTime: '10:00 AM',
    endTime: '10:45 AM',
    status: 'PENDING',
    notes: 'Scalp treatment needed',
    bookingDateTime: '2025-10-10T09:30:00'
  }
];

interface FilterState {
  startDate: string;
  endDate: string;
  statuses: string[];
  search: string;
  serviceId: string;
}

export const AppointmentDashboard: React.FC = () => {
  // State
  const [isLoading, setIsLoading] = useState(true);
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<AppointmentData[]>([]);
  const [statistics, setStatistics] = useState(MOCK_STATS);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [calendarViewMode, setCalendarViewMode] = useState<'week' | 'month'>('week');
  
  // Modal states
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentData | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showRescheduleDialog, setShowRescheduleDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  // Filter state
  const today = new Date().toISOString().split('T')[0];
  const weekLater = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  const [filters, setFilters] = useState<FilterState>({
    startDate: today,
    endDate: weekLater,
    statuses: [],
    search: '',
    serviceId: ''
  });

  // Load appointments on mount
  useEffect(() => {
    loadAppointments();
  }, []);

  // Apply filters when they change
  useEffect(() => {
    applyFilters();
  }, [filters, appointments]);

  const loadAppointments = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setAppointments(MOCK_APPOINTMENTS);
      setStatistics(MOCK_STATS);
      setIsLoading(false);
    }, 1000);
  };

  const applyFilters = () => {
    let filtered = [...appointments];

    // Date range filter
    if (filters.startDate) {
      filtered = filtered.filter(apt => apt.appointmentDate >= filters.startDate);
    }
    if (filters.endDate) {
      filtered = filtered.filter(apt => apt.appointmentDate <= filters.endDate);
    }

    // Status filter
    if (filters.statuses.length > 0) {
      filtered = filtered.filter(apt => filters.statuses.includes(apt.status));
    }

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(apt => 
        apt.customer.name.toLowerCase().includes(searchLower) ||
        apt.customer.phone.includes(searchLower) ||
        apt.customer.email.toLowerCase().includes(searchLower) ||
        apt.appointmentNumber.toLowerCase().includes(searchLower)
      );
    }

    // Service filter
    if (filters.serviceId) {
      filtered = filtered.filter(apt => apt.service.serviceId === filters.serviceId);
    }

    setFilteredAppointments(filtered);
    setTotalPages(Math.ceil(filtered.length / 10));
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({
      startDate: today,
      endDate: weekLater,
      statuses: [],
      search: '',
      serviceId: ''
    });
  };

  const handleExport = () => {
    alert('Export functionality will be implemented here');
  };

  const handleViewDetails = (appointment: AppointmentData) => {
    setSelectedAppointment(appointment);
    setShowDetailsModal(true);
  };

  const handleConfirmClick = (appointmentId: string) => {
    const appointment = appointments.find(apt => apt.appointmentId === appointmentId);
    if (appointment) {
      setSelectedAppointment(appointment);
      setShowConfirmDialog(true);
    }
  };

  const handleConfirm = async (sendEmail: boolean, sendSMS: boolean) => {
    // Simulate API call
    console.log('Confirming appointment:', selectedAppointment?.appointmentId, { sendEmail, sendSMS });
    
    // Update appointment status
    setAppointments(prev =>
      prev.map(apt =>
        apt.appointmentId === selectedAppointment?.appointmentId
          ? { ...apt, status: 'CONFIRMED' as const }
          : apt
      )
    );

    setShowConfirmDialog(false);
    setSelectedAppointment(null);
    alert('Appointment confirmed successfully!');
  };

  const handleRescheduleClick = (appointment: AppointmentData) => {
    setSelectedAppointment(appointment);
    setShowRescheduleDialog(true);
  };

  const handleReschedule = async (newDate: string, newTime: string, reason: string, notifyCustomer: boolean) => {
    console.log('Rescheduling appointment:', {
      appointmentId: selectedAppointment?.appointmentId,
      newDate,
      newTime,
      reason,
      notifyCustomer
    });

    // Update appointment
    setAppointments(prev =>
      prev.map(apt =>
        apt.appointmentId === selectedAppointment?.appointmentId
          ? { ...apt, appointmentDate: newDate, startTime: newTime }
          : apt
      )
    );

    setShowRescheduleDialog(false);
    setSelectedAppointment(null);
    alert('Appointment rescheduled successfully!');
  };

  const handleCancelClick = (appointment: AppointmentData) => {
    setSelectedAppointment(appointment);
    setShowCancelDialog(true);
  };

  const handleCancel = async (reason: string, notes: string, processRefund: boolean, notifyCustomer: boolean) => {
    console.log('Cancelling appointment:', {
      appointmentId: selectedAppointment?.appointmentId,
      reason,
      notes,
      processRefund,
      notifyCustomer
    });

    // Update appointment status
    setAppointments(prev =>
      prev.map(apt =>
        apt.appointmentId === selectedAppointment?.appointmentId
          ? { ...apt, status: 'CANCELLED' as const, cancellationReason: reason }
          : apt
      )
    );

    setShowCancelDialog(false);
    setSelectedAppointment(null);
    alert('Appointment cancelled successfully!');
  };

  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );

  const isFiltered = 
    filters.statuses.length > 0 ||
    filters.search !== '' ||
    filters.serviceId !== '' ||
    filters.startDate !== today ||
    filters.endDate !== weekLater;

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-pink-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            📊 Appointment Management
          </h1>
          <p className="text-gray-400 text-lg">
            Elite Hair Studio - Owner Dashboard
          </p>
        </motion.div>

        {/* Statistics */}
        <AppointmentStatsWidget statistics={statistics} />

        {/* View Toggle */}
        <motion.div
          className="flex justify-end gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              viewMode === 'list'
                ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            <List className="w-4 h-4" />
            List View
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              viewMode === 'calendar'
                ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Calendar View
          </button>
        </motion.div>

        {/* Filters */}
        {viewMode === 'list' && (
          <AppointmentFilterBar
            filters={filters}
            onFilterChange={setFilters}
            onReset={handleResetFilters}
            onExport={handleExport}
          />
        )}

        {/* Main Content */}
        {viewMode === 'list' ? (
          <AppointmentListView
            appointments={paginatedAppointments}
            onViewDetails={handleViewDetails}
            onConfirm={handleConfirmClick}
            onReschedule={handleRescheduleClick}
            onCancel={handleCancelClick}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            isFiltered={isFiltered}
            onResetFilters={handleResetFilters}
          />
        ) : (
          <AppointmentCalendarView
            appointments={filteredAppointments}
            onAppointmentClick={handleViewDetails}
            viewMode={calendarViewMode}
            onViewModeChange={setCalendarViewMode}
          />
        )}

        {/* Modals */}
        <AppointmentDetailsModal
          isOpen={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
          appointment={selectedAppointment}
          onConfirm={() => {
            setShowDetailsModal(false);
            setShowConfirmDialog(true);
          }}
          onReschedule={() => {
            setShowDetailsModal(false);
            setShowRescheduleDialog(true);
          }}
          onCancel={() => {
            setShowDetailsModal(false);
            setShowCancelDialog(true);
          }}
          onMessage={() => alert('Message feature coming soon')}
          onCall={() => window.open(`tel:${selectedAppointment?.customer.phone}`)}
          onEmail={() => window.open(`mailto:${selectedAppointment?.customer.email}`)}
          onPrint={() => window.print()}
        />

        <ConfirmDialog
          isOpen={showConfirmDialog}
          onClose={() => setShowConfirmDialog(false)}
          onConfirm={handleConfirm}
          appointment={selectedAppointment}
        />

        <RescheduleDialog
          isOpen={showRescheduleDialog}
          onClose={() => setShowRescheduleDialog(false)}
          onReschedule={handleReschedule}
          appointment={selectedAppointment}
        />

        <CancelDialog
          isOpen={showCancelDialog}
          onClose={() => setShowCancelDialog(false)}
          onCancel={handleCancel}
          appointment={selectedAppointment}
        />
      </div>
    </div>
  );
};

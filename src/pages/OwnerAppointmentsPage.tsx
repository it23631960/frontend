import React from 'react';
import { AppointmentDashboard } from '../components/admin/appointments';

/**
 * Owner Appointments Page
 * 
 * This page displays the appointment management dashboard for salon owners.
 * It can be accessed via:
 * - /owner/appointments
 * - /admin/appointments
 * 
 * Features:
 * - View appointment statistics (today, pending, completed, revenue, rating, peak hours)
 * - Filter appointments by date range, status, search, and service
 * - View appointments in list or calendar mode
 * - Confirm, reschedule, or cancel appointments
 * - View detailed appointment information
 * - Export appointment data
 */
const OwnerAppointmentsPage: React.FC = () => {
  return <AppointmentDashboard />;
};

export default OwnerAppointmentsPage;

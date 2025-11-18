import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import OwnerWelcomeBanner from './OwnerWelcomeBanner';
import OwnerMetricsCards from './OwnerMetricsCards';
import UpcomingAppointments from './UpcomingAppointments';
import RevenueChart from './RevenueChart';
import PopularServices from './PopularServices';
import QuickOwnerActions from './QuickOwnerActions';
import RecentReviews from './RecentReviews';
import { 
  getAllAppointments, 
  getTodayAppointments,
  AppointmentResponseDTO 
} from '../../../services/appointmentApiService';

// TEMPORARY: Mock data for salon owner (will be replaced with API)
const mockOwnerData = {
  owner: {
    name: 'Sarah Johnson',
    salonName: 'Elite Hair Studio',
    salonId: 'salon1' // Matches MongoDB data
  },
  stats: {
    todayAppointments: 8,
    todayTrend: '+2 from yesterday',
    pendingConfirmations: 3,
    weekRevenue: 45000,
    revenueTrend: '+8.5%',
    rating: 4.8,
    totalReviews: 124,
    ratingChange: '+0.3'
  },
  weekOverview: {
    totalBookings: 24,
    confirmed: 20,
    pending: 3,
    cancelled: 1
  },
  appointments: [
    {
      id: 'APT-001',
      customerName: 'John Doe',
      service: 'Haircut & Styling',
      date: '2025-10-11',
      time: '10:00 AM',
      duration: '60 min',
      price: 2500,
      status: 'confirmed',
      staffName: 'Maria Garcia'
    },
    {
      id: 'APT-002',
      customerName: 'Jane Smith',
      service: 'Hair Coloring',
      date: '2025-10-11',
      time: '02:00 PM',
      duration: '120 min',
      price: 5500,
      status: 'pending',
      staffName: 'Lisa Wong'
    },
    {
      id: 'APT-003',
      customerName: 'Mike Johnson',
      service: 'Beard Trim',
      date: '2025-10-12',
      time: '11:00 AM',
      duration: '30 min',
      price: 800,
      status: 'confirmed',
      staffName: 'Carlos Martinez'
    },
    {
      id: 'APT-004',
      customerName: 'Emily Brown',
      service: 'Full Treatment',
      date: '2025-10-12',
      time: '03:00 PM',
      duration: '180 min',
      price: 8500,
      status: 'confirmed',
      staffName: 'Maria Garcia'
    },
    {
      id: 'APT-005',
      customerName: 'David Lee',
      service: 'Hair Spa',
      date: '2025-10-13',
      time: '09:00 AM',
      duration: '90 min',
      price: 3500,
      status: 'pending',
      staffName: 'Lisa Wong'
    }
  ],
  revenueData: [
    { day: 'Mon', revenue: 5200 },
    { day: 'Tue', revenue: 6800 },
    { day: 'Wed', revenue: 4500 },
    { day: 'Thu', revenue: 7200 },
    { day: 'Fri', revenue: 8500 },
    { day: 'Sat', revenue: 7800 },
    { day: 'Sun', revenue: 5000 }
  ],
  topServices: [
    { name: 'Hair Coloring', bookings: 8, revenue: 44000, percentage: 32 },
    { name: 'Haircut & Styling', bookings: 6, revenue: 15000, percentage: 25 },
    { name: 'Full Treatment', bookings: 4, revenue: 34000, percentage: 18 },
    { name: 'Hair Spa', bookings: 3, revenue: 10500, percentage: 15 },
    { name: 'Beard Trim', bookings: 3, revenue: 2400, percentage: 10 }
  ],
  recentReviews: [
    {
      id: 'REV-001',
      customerName: 'Alice Williams',
      rating: 5,
      comment: 'Amazing service! Maria did an excellent job with my hair color. Highly recommend!',
      service: 'Hair Coloring',
      date: '2025-10-10',
      verified: true
    },
    {
      id: 'REV-002',
      customerName: 'Bob Martinez',
      rating: 4,
      comment: 'Great haircut and friendly staff. Will definitely come back.',
      service: 'Haircut',
      date: '2025-10-09',
      verified: true
    },
    {
      id: 'REV-003',
      customerName: 'Carol Davis',
      rating: 5,
      comment: 'Best salon in town! Professional service and beautiful ambiance.',
      service: 'Full Treatment',
      date: '2025-10-08',
      verified: true
    },
    {
      id: 'REV-004',
      customerName: 'David Chen',
      rating: 4,
      comment: 'Good experience overall. The staff was very professional.',
      service: 'Beard Trim',
      date: '2025-10-07',
      verified: false
    }
  ]
};

interface OwnerDashboardState {
  appointments: AppointmentResponseDTO[];
  todayAppointments: AppointmentResponseDTO[];
  loading: boolean;
  error: string | null;
  isOfflineMode: boolean; // Indicates if using mock data due to API failure
}

export const OwnerDashboard: React.FC = () => {
  // TODO: Get salonId from authentication context
  const SALON_ID = 'salon1'; // Temporary hardcoded value (matches MongoDB data)
  
  const [data] = useState(mockOwnerData);
  const [state, setState] = useState<OwnerDashboardState>({
    appointments: [],
    todayAppointments: [],
    loading: true,
    error: null,
    isOfflineMode: false
  });

  // Helper function to map appointment data to the expected format
  const mapAppointmentData = (apt: AppointmentResponseDTO): {
    id: string;
    customerName: string;
    service: string;
    date: string;
    time: string;
    duration: string;
    price: number;
    status: 'confirmed' | 'pending' | 'cancelled';
    staffName: string;
  } => {
    let mappedStatus: 'confirmed' | 'pending' | 'cancelled' = 'pending';
    
    switch (apt.status) {
      case 'CONFIRMED':
        mappedStatus = 'confirmed';
        break;
      case 'PENDING':
        mappedStatus = 'pending';
        break;
      case 'CANCELLED':
        mappedStatus = 'cancelled';
        break;
      case 'COMPLETED':
        mappedStatus = 'confirmed';
        break;
      default:
        mappedStatus = 'pending';
    }
    
    return {
      id: apt.id,
      customerName: apt.customer.name,
      service: apt.service.name,
      date: apt.timeSlot.date,
      time: apt.timeSlot.startTime,
      duration: `${apt.service.duration} min`,
      price: apt.totalAmount,
      status: mappedStatus,
      staffName: apt.assignedStaff || 'Unassigned'
    };
  };

  // Fetch appointments on component mount
  useEffect(() => {
    fetchDashboardData();
  }, [SALON_ID]);
  
  // Function to fetch dashboard data (can be called to refresh)
  const fetchDashboardData = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      // Fetch data in parallel
      const [allAppointmentsResponse, todayAppointmentsData] = await Promise.all([
        getAllAppointments(SALON_ID, 0, 50), // Get first 50 appointments
        getTodayAppointments(SALON_ID)
      ]);

      setState({
        appointments: allAppointmentsResponse.content || [],
        todayAppointments: todayAppointmentsData || [],
        loading: false,
        error: null,
        isOfflineMode: false
      });

      console.log('✅ Dashboard data loaded from API:', {
        totalAppointments: allAppointmentsResponse.content?.length,
        todayCount: todayAppointmentsData?.length
      });
    } catch (error) {
      console.warn('⚠️ API connection failed, using mock data:', error);
      
      // Fall back to mock data instead of showing error
      setState({
        appointments: [],
        todayAppointments: [],
        loading: false,
        error: null,
        isOfflineMode: true // Enable offline mode
      });
    }
  };

  // Show loading state
  if (state.loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-pink-950">
        <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 border-t-2 border-b-2 border-purple-500 rounded-full animate-spin"></div>
              <p className="text-lg text-white">Loading dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-pink-950">
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Offline Mode Banner */}
        {state.isOfflineMode && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 mb-6 border bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border-yellow-500/30 rounded-xl"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-grow">
                <h3 className="mb-2 text-lg font-semibold text-yellow-300">📡 Offline Mode - Demo Data</h3>
                <p className="mb-3 text-sm text-yellow-200/90">
                  Unable to connect to backend server. Displaying sample data for demonstration purposes.
                </p>
                <div className="p-4 mb-3 rounded-lg bg-black/20">
                  <p className="mb-2 text-sm font-medium text-yellow-100">To see real data:</p>
                  <ol className="text-yellow-200/80 text-xs space-y-1.5 list-decimal list-inside">
                    <li>Start backend server: <code className="bg-black/40 px-2 py-0.5 rounded">./mvnw.cmd spring-boot:run</code></li>
                    <li>Verify server is running on <code className="bg-black/40 px-2 py-0.5 rounded">http://localhost:8080</code></li>
                    <li>Import sample appointments via MongoDB Compass (optional)</li>
                  </ol>
                </div>
                <button
                  onClick={fetchDashboardData}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-yellow-300 transition-all duration-200 border rounded-lg bg-yellow-500/20 hover:bg-yellow-500/30 border-yellow-500/40"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Retry Connection
                </button>
              </div>
            </div>
          </motion.div>
        )}
        {/* Welcome Banner */}
        <OwnerWelcomeBanner 
          ownerName={data.owner.name}
          salonName={data.owner.salonName}
          todayAppointments={state.isOfflineMode ? data.stats.todayAppointments : state.todayAppointments.length}
          weekBookings={state.isOfflineMode ? data.weekOverview.totalBookings : state.appointments.length}
        />

        {/* Metrics Cards */}
        <OwnerMetricsCards stats={data.stats} />

        {/* Week Overview Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 mb-8 border bg-white/10 backdrop-blur-md border-white/20 rounded-2xl"
        >
          <h3 className="mb-4 text-lg font-semibold text-white">This Week's Overview</h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="text-center">
              <div className="mb-1 text-2xl font-bold text-white">
                {data.weekOverview.totalBookings}
              </div>
              <div className="text-sm text-gray-400">📊 Total Bookings</div>
            </div>
            <div className="text-center">
              <div className="mb-1 text-2xl font-bold text-green-400">
                {data.weekOverview.confirmed}
              </div>
              <div className="text-sm text-gray-400">✅ Confirmed ({Math.round((data.weekOverview.confirmed / data.weekOverview.totalBookings) * 100)}%)</div>
            </div>
            <div className="text-center">
              <div className="mb-1 text-2xl font-bold text-yellow-400">
                {data.weekOverview.pending}
              </div>
              <div className="text-sm text-gray-400">⏳ Pending ({Math.round((data.weekOverview.pending / data.weekOverview.totalBookings) * 100)}%)</div>
            </div>
            <div className="text-center">
              <div className="mb-1 text-2xl font-bold text-red-400">
                {data.weekOverview.cancelled}
              </div>
              <div className="text-sm text-gray-400">❌ Cancelled ({Math.round((data.weekOverview.cancelled / data.weekOverview.totalBookings) * 100)}%)</div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-8 mb-8 lg:grid-cols-3">
          {/* Revenue Chart - Spans 2 columns */}
          <div className="lg:col-span-2">
            <RevenueChart revenueData={data.revenueData} />
          </div>

          {/* Popular Services */}
          <div>
            <PopularServices services={data.topServices} />
          </div>
        </div>

        {/* Upcoming Appointments - Now using real API data or mock data in offline mode */}
        <UpcomingAppointments 
          appointments={
            state.isOfflineMode 
              ? data.appointments.map(apt => ({
                  ...apt,
                  status: apt.status as 'confirmed' | 'pending' | 'cancelled'
                }))
              : state.appointments.slice(0, 5).map(mapAppointmentData)
          }
          onAppointmentUpdate={fetchDashboardData} // Pass refresh callback
        />

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 gap-8 mb-8 lg:grid-cols-2">
          {/* Recent Reviews */}
          <RecentReviews reviews={data.recentReviews} rating={data.stats.rating} />

          {/* Quick Actions */}
          <QuickOwnerActions 
            pendingCount={data.stats.pendingConfirmations}
            salonName={data.owner.salonName}
          />
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;

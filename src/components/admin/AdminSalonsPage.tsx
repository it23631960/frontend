import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Mail, 
  CheckCircle,
  XCircle,
  Building2,
  MapPin,
  Star,
  Phone,
  AlertCircle
} from 'lucide-react';

interface Salon {
  id: string;
  name: string;
  owner: string;
  ownerEmail: string;
  ownerPhone: string;
  type: 'Hair Salon' | 'Barber Shop' | 'Nail Salon' | 'Bridal Salon';
  location: string;
  address: string;
  registrationDate: string;
  status: 'active' | 'pending' | 'suspended';
  rating: number;
  totalBookings: number;
  totalRevenue: number;
  operatingHours: string;
  description: string;
}

const AdminSalonsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'pending' | 'suspended'>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedSalons, setSelectedSalons] = useState<string[]>([]);

  // Mock data
  const salons: Salon[] = [
    {
      id: 'SAL-001',
      name: 'Glamour Studio',
      owner: 'Alice Williams',
      ownerEmail: 'alice@glamourstudio.com',
      ownerPhone: '+1 (555) 111-2222',
      type: 'Hair Salon',
      location: 'New York, NY',
      address: '123 Fashion Ave, New York, NY 10001',
      registrationDate: '2025-10-01',
      status: 'pending',
      rating: 0,
      totalBookings: 0,
      totalRevenue: 0,
      operatingHours: '9:00 AM - 8:00 PM',
      description: 'Premium hair salon offering cutting-edge styles and treatments'
    },
    {
      id: 'SAL-002',
      name: 'Classic Cuts',
      owner: 'Bob Martinez',
      ownerEmail: 'bob@classiccuts.com',
      ownerPhone: '+1 (555) 222-3333',
      type: 'Barber Shop',
      location: 'Los Angeles, CA',
      address: '456 Main St, Los Angeles, CA 90001',
      registrationDate: '2025-08-15',
      status: 'active',
      rating: 4.8,
      totalBookings: 156,
      totalRevenue: 15600,
      operatingHours: '8:00 AM - 7:00 PM',
      description: 'Traditional barbershop with modern techniques'
    },
    {
      id: 'SAL-003',
      name: 'Nail Artistry',
      owner: 'Carol Davis',
      ownerEmail: 'carol@nailartistry.com',
      ownerPhone: '+1 (555) 333-4444',
      type: 'Nail Salon',
      location: 'Chicago, IL',
      address: '789 Beauty Blvd, Chicago, IL 60601',
      registrationDate: '2025-07-22',
      status: 'active',
      rating: 4.9,
      totalBookings: 203,
      totalRevenue: 20300,
      operatingHours: '10:00 AM - 9:00 PM',
      description: 'Creative nail designs and spa treatments'
    },
    {
      id: 'SAL-004',
      name: 'Bridal Beauty',
      owner: 'David Lee',
      ownerEmail: 'david@bridalbeauty.com',
      ownerPhone: '+1 (555) 444-5555',
      type: 'Bridal Salon',
      location: 'Houston, TX',
      address: '321 Wedding Way, Houston, TX 77001',
      registrationDate: '2025-06-10',
      status: 'active',
      rating: 5.0,
      totalBookings: 89,
      totalRevenue: 44500,
      operatingHours: 'By Appointment Only',
      description: 'Specialized bridal makeup and hair styling'
    },
    {
      id: 'SAL-005',
      name: 'Urban Style',
      owner: 'Emma Garcia',
      ownerEmail: 'emma@urbanstyle.com',
      ownerPhone: '+1 (555) 555-6666',
      type: 'Hair Salon',
      location: 'Phoenix, AZ',
      address: '654 Trendy St, Phoenix, AZ 85001',
      registrationDate: '2025-10-03',
      status: 'pending',
      rating: 0,
      totalBookings: 0,
      totalRevenue: 0,
      operatingHours: '9:00 AM - 7:00 PM',
      description: 'Modern urban hair styling and coloring'
    },
    {
      id: 'SAL-006',
      name: 'Elite Barbers',
      owner: 'Frank Wilson',
      ownerEmail: 'frank@elitebarbers.com',
      ownerPhone: '+1 (555) 666-7777',
      type: 'Barber Shop',
      location: 'Miami, FL',
      address: '987 Style St, Miami, FL 33101',
      registrationDate: '2025-05-20',
      status: 'suspended',
      rating: 4.2,
      totalBookings: 78,
      totalRevenue: 7800,
      operatingHours: '9:00 AM - 6:00 PM',
      description: 'Premium grooming services for gentlemen'
    }
  ];

  const filteredSalons = salons.filter(salon => {
    const matchesSearch = salon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         salon.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || salon.status === filterStatus;
    const matchesType = filterType === 'all' || salon.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'green';
      case 'pending': return 'yellow';
      case 'suspended': return 'red';
      default: return 'gray';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Hair Salon': return 'purple';
      case 'Barber Shop': return 'blue';
      case 'Nail Salon': return 'pink';
      case 'Bridal Salon': return 'rose';
      default: return 'gray';
    }
  };

  const toggleSalonSelection = (salonId: string) => {
    setSelectedSalons(prev =>
      prev.includes(salonId)
        ? prev.filter(id => id !== salonId)
        : [...prev, salonId]
    );
  };

  const handleApprove = (salonId: string) => {
    console.log('Approving salon:', salonId);
    // API call to approve salon
  };

  const handleReject = (salonId: string) => {
    console.log('Rejecting salon:', salonId);
    // API call to reject salon
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-pink-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Salon Management</h1>
          <p className="text-gray-400">Manage registered salons and approve new applications</p>
        </div>

        {/* Controls Bar */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by salon name or owner..."
                className="w-full bg-white/5 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:outline-none"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="bg-white/5 border border-white/20 rounded-xl pl-12 pr-8 py-3 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:outline-none appearance-none cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>

            {/* Type Filter */}
            <div className="relative">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-white/5 border border-white/20 rounded-xl pl-12 pr-8 py-3 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:outline-none appearance-none cursor-pointer"
              >
                <option value="all">All Types</option>
                <option value="Hair Salon">Hair Salon</option>
                <option value="Barber Shop">Barber Shop</option>
                <option value="Nail Salon">Nail Salon</option>
                <option value="Bridal Salon">Bridal Salon</option>
              </select>
            </div>

            {/* Export Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all"
            >
              <Download className="w-5 h-5" />
              <span>Export</span>
            </motion.button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-gray-400 text-sm mb-1">Total Salons</p>
              <p className="text-2xl font-bold text-white">{salons.length}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-gray-400 text-sm mb-1">Active</p>
              <p className="text-2xl font-bold text-green-400">
                {salons.filter(s => s.status === 'active').length}
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-gray-400 text-sm mb-1">Pending</p>
              <p className="text-2xl font-bold text-yellow-400">
                {salons.filter(s => s.status === 'pending').length}
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-gray-400 text-sm mb-1">Suspended</p>
              <p className="text-2xl font-bold text-red-400">
                {salons.filter(s => s.status === 'suspended').length}
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-gray-400 text-sm mb-1">Avg Rating</p>
              <p className="text-2xl font-bold text-purple-400 flex items-center gap-1">
                <Star className="w-5 h-5 fill-current" />
                {(salons.filter(s => s.rating > 0).reduce((acc, s) => acc + s.rating, 0) / salons.filter(s => s.rating > 0).length).toFixed(1)}
              </p>
            </div>
          </div>
        </div>

        {/* Salons Table */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/20">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedSalons.length === filteredSalons.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedSalons(filteredSalons.map(s => s.id));
                        } else {
                          setSelectedSalons([]);
                        }
                      }}
                      className="w-4 h-4 rounded"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Salon</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Owner</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Location</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Rating</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Bookings</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Revenue</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredSalons.map((salon, index) => (
                  <motion.tr
                    key={salon.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedSalons.includes(salon.id)}
                        onChange={() => toggleSalonSelection(salon.id)}
                        className="w-4 h-4 rounded"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 bg-gradient-to-br from-${getTypeColor(salon.type)}-500 to-${getTypeColor(salon.type)}-600 rounded-lg flex items-center justify-center`}>
                          <Building2 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{salon.name}</p>
                          <p className="text-gray-400 text-sm">{salon.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-white font-medium text-sm">{salon.owner}</p>
                        <div className="flex items-center gap-2 text-gray-400 text-xs">
                          <Mail className="w-3 h-3" />
                          {salon.ownerEmail}
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-xs">
                          <Phone className="w-3 h-3" />
                          {salon.ownerPhone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 bg-${getTypeColor(salon.type)}-500/20 border border-${getTypeColor(salon.type)}-500/30 rounded-full text-${getTypeColor(salon.type)}-400 text-xs font-medium`}>
                        {salon.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-gray-300 text-sm">
                          <MapPin className="w-4 h-4" />
                          {salon.location}
                        </div>
                        <p className="text-gray-500 text-xs">{salon.address}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {salon.rating > 0 ? (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white font-semibold">{salon.rating}</span>
                        </div>
                      ) : (
                        <span className="text-gray-500 text-sm">No rating</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white font-semibold">{salon.totalBookings}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-green-400 font-semibold">
                        ${salon.totalRevenue.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 bg-${getStatusColor(salon.status)}-500/20 border border-${getStatusColor(salon.status)}-500/30 rounded-full text-${getStatusColor(salon.status)}-400 text-xs font-medium capitalize`}>
                        {salon.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {salon.status === 'pending' ? (
                          <>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleApprove(salon.id)}
                              className="p-2 text-green-400 hover:text-green-300 hover:bg-green-500/10 rounded-lg transition-all"
                              title="Approve Salon"
                            >
                              <CheckCircle className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleReject(salon.id)}
                              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
                              title="Reject Salon"
                            >
                              <XCircle className="w-5 h-5" />
                            </motion.button>
                          </>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                            title="View Details"
                          >
                            <Eye className="w-5 h-5" />
                          </motion.button>
                        )}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 text-gray-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all"
                          title="Message Owner"
                        >
                          <Mail className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-white/5 border-t border-white/10 px-6 py-4">
            <div className="flex items-center justify-between">
              <p className="text-gray-400 text-sm">
                Showing {filteredSalons.length} of {salons.length} salons
              </p>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 text-sm transition-all">
                  Previous
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg text-white text-sm font-medium">
                  1
                </button>
                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 text-sm transition-all">
                  2
                </button>
                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 text-sm transition-all">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Approvals Alert */}
        {salons.filter(s => s.status === 'pending').length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-yellow-500/20 rounded-xl">
                <AlertCircle className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-yellow-200 font-semibold mb-2">
                  {salons.filter(s => s.status === 'pending').length} Salons Awaiting Approval
                </h3>
                <p className="text-yellow-200/70 text-sm mb-4">
                  Review and approve pending salon applications to expand the platform.
                </p>
                <button
                  onClick={() => setFilterStatus('pending')}
                  className="px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/30 rounded-lg text-yellow-200 text-sm font-medium transition-all"
                >
                  Review Pending Applications
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminSalonsPage;

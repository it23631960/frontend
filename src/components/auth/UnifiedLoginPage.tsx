import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import CustomerLoginCard from './CustomerLoginCard';
import SalonOwnerLoginCard from './SalonOwnerLoginCard';
import AdminLoginCard from './AdminLoginCard';

const UnifiedLoginPage: React.FC = () => {
  const navigate = useNavigate();

  // Form states
  const [customerForm, setCustomerForm] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [ownerForm, setOwnerForm] = useState({
    email: '',
    password: '',
    rememberDevice: false
  });

  const [adminForm, setAdminForm] = useState({
    email: '',
    password: '',
    rememberDevice: false
  });

  // Loading states
  const [loadingCustomer, setLoadingCustomer] = useState(false);
  const [loadingOwner, setLoadingOwner] = useState(false);
  const [loadingAdmin, setLoadingAdmin] = useState(false);

  // Error states
  const [customerError, setCustomerError] = useState('');
  const [ownerError, setOwnerError] = useState('');
  const [adminError, setAdminError] = useState('');

  // Customer Login Handler
  const handleCustomerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingCustomer(true);
    setCustomerError('');

    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ ...customerForm, role: 'CUSTOMER' })
      // });
      // const data = await response.json();
      
      // Mock success after 1.5s
      setTimeout(() => {
        console.log('Customer login:', customerForm);
        // localStorage.setItem('token', data.token);
        navigate('/profile');
        setLoadingCustomer(false);
      }, 1500);
    } catch (error) {
      setCustomerError('Invalid email or password');
      setLoadingCustomer(false);
    }
  };

  // Salon Owner Login Handler
  const handleOwnerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingOwner(true);
    setOwnerError('');

    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ ...ownerForm, role: 'SALON_OWNER' })
      // });
      // const data = await response.json();
      
      // Mock success after 1.5s
      setTimeout(() => {
        console.log('Owner login:', ownerForm);
        // localStorage.setItem('token', data.token);
        navigate('/owner/dashboard');
        setLoadingOwner(false);
      }, 1500);
    } catch (error) {
      setOwnerError('Invalid credentials');
      setLoadingOwner(false);
    }
  };

  // Admin Login Handler
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingAdmin(true);
    setAdminError('');

    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/auth/admin/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(adminForm)
      // });
      // const data = await response.json();
      
      // Mock success after 1.5s
      setTimeout(() => {
        console.log('Admin login:', adminForm);
        // localStorage.setItem('token', data.token);
        navigate('/admin/dashboard');
        setLoadingAdmin(false);
      }, 1500);
    } catch (error) {
      setAdminError('Invalid credentials or insufficient permissions');
      setLoadingAdmin(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-pink-950 relative overflow-hidden">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 -right-48 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [-100, 100, -100],
            x: [-100, 100, -100],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-600/5 rounded-full blur-2xl"
        />
      </div>

      {/* Logo Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-8 left-8 z-10"
      >
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50"
          >
            <span className="text-white font-bold text-xl">B</span>
          </motion.div>
          <div className="hidden md:block">
            <span className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
              BeautySalon
            </span>
          </div>
        </Link>
      </motion.div>

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="w-full max-w-6xl mx-auto space-y-12">
          {/* Customer Login Card */}
          <CustomerLoginCard
            form={customerForm}
            setForm={setCustomerForm}
            loading={loadingCustomer}
            error={customerError}
            onSubmit={handleCustomerLogin}
          />

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="border-t border-white/10 my-12"
          />

          {/* Salon Owner Login Card */}
          <SalonOwnerLoginCard
            form={ownerForm}
            setForm={setOwnerForm}
            loading={loadingOwner}
            error={ownerError}
            onSubmit={handleOwnerLogin}
          />

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="border-t border-white/10 my-12"
          />

          {/* Admin Login Card */}
          <AdminLoginCard
            form={adminForm}
            setForm={setAdminForm}
            loading={loadingAdmin}
            error={adminError}
            onSubmit={handleAdminLogin}
          />
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-gray-400 text-xs mt-16 pb-8"
        >
          <p className="mb-2">© 2025 BeautySalon. All rights reserved.</p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>|</span>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span>|</span>
            <Link to="/support" className="hover:text-white transition-colors">
              Contact Support
            </Link>
          </div>
        </motion.footer>
      </div>
    </div>
  );
};

export default UnifiedLoginPage;

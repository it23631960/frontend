import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Eye, EyeOff, X, AlertTriangle, ArrowRight, Key } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(false);
  
  const [adminData, setAdminData] = useState({
    email: '',
    password: '',
    securityCode: ''
  });

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log('Admin login:', adminData);
      onClose();
      navigate('/admin/dashboard');
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Modal Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-lg"
          >
            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md p-8 border shadow-2xl bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-xl border-white/20 rounded-3xl"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute text-gray-400 transition-colors top-6 right-6 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Header */}
              <div className="mb-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="relative inline-flex items-center justify-center w-20 h-20 mb-4 bg-gradient-to-br from-purple-600 to-pink-700 rounded-2xl"
                >
                  <Shield className="w-10 h-10 text-white" />
                  <div className="absolute flex items-center justify-center w-6 h-6 bg-yellow-500 rounded-full -top-1 -right-1">
                    <span className="text-xs font-bold text-black">👑</span>
                  </div>
                </motion.div>
                <h2 className="mb-2 text-3xl font-bold text-white">
                  Administrator Portal
                </h2>
                <p className="text-gray-400">Secure access for platform administrators</p>
              </div>

              {/* Security Notice */}
              <div className="flex items-start gap-3 p-4 mb-6 border bg-yellow-500/10 border-yellow-500/30 rounded-xl">
                <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="mb-1 text-sm font-medium text-yellow-200">
                    Secure Admin Access
                  </p>
                  <p className="text-xs text-yellow-200/70">
                    All administrative activities are logged and monitored for security purposes.
                  </p>
                </div>
              </div>

              {/* Admin Login Form */}
              <form onSubmit={handleAdminLogin} className="space-y-5">
                {/* Admin Email Field */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-300">
                    Administrator Email
                  </label>
                  <div className="relative">
                    <Shield className="absolute w-5 h-5 text-purple-400 -translate-y-1/2 left-4 top-1/2" />
                    <input
                      type="email"
                      value={adminData.email}
                      onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
                      placeholder="admin@beautysalon.com"
                      className="w-full py-3 pl-12 pr-4 text-white placeholder-gray-500 transition-all border bg-black/30 backdrop-blur-sm border-purple-400/40 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Admin Password Field */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-300">
                    Secure Password
                  </label>
                  <div className="relative">
                    <div className="absolute flex items-center gap-1 -translate-y-1/2 left-4 top-1/2">
                      <Lock className="w-5 h-5 text-purple-400" />
                      <Shield className="w-3 h-3 text-purple-400" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={adminData.password}
                      onChange={(e) => setAdminData({ ...adminData, password: e.target.value })}
                      placeholder="Enter secure password"
                      className="w-full py-3 pl-16 pr-12 text-white placeholder-gray-500 transition-all border bg-black/30 backdrop-blur-sm border-purple-400/40 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 focus:outline-none"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute text-gray-400 transition-colors -translate-y-1/2 right-4 top-1/2 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Security Code Field (2FA) */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-300">
                    Security Code <span className="text-xs text-gray-500">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Key className="absolute w-5 h-5 text-purple-400 -translate-y-1/2 left-4 top-1/2" />
                    <input
                      type="text"
                      value={adminData.securityCode}
                      onChange={(e) => setAdminData({ ...adminData, securityCode: e.target.value })}
                      placeholder="Enter 2FA code if enabled"
                      className="w-full py-3 pl-12 pr-4 text-white placeholder-gray-500 transition-all border bg-black/30 backdrop-blur-sm border-purple-400/40 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Remember Device Checkbox */}
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={rememberDevice}
                      onChange={(e) => setRememberDevice(e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded border-2 transition-all ${
                      rememberDevice 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-700 border-transparent' 
                        : 'border-purple-400/40 bg-black/30'
                    }`}>
                      {rememberDevice && (
                        <motion.svg
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-full h-full text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </motion.svg>
                      )}
                    </div>
                  </div>
                  <span className="text-sm text-gray-300 transition-colors group-hover:text-white">
                    Remember this device for 30 days
                  </span>
                </label>

                {/* Access Dashboard Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center w-full gap-2 py-4 mt-6 font-semibold text-white transition-all bg-gradient-to-r from-purple-600 to-pink-700 rounded-xl hover:shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white rounded-full border-t-transparent"
                    />
                  ) : (
                    <>
                      <Shield className="w-5 h-5" />
                      <span>Access Admin Dashboard</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>

                {/* Back to User Login */}
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full mt-4 text-sm text-center text-purple-300 transition-colors hover:text-pink-300"
                >
                  Back to user login
                </button>
              </form>

              {/* Security Footer */}
              <div className="pt-6 mt-6 border-t border-white/10">
                <p className="text-xs text-center text-gray-400">
                  🔒 Secure admin access • All activities are logged
                </p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AdminLoginModal;

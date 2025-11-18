import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
  Key,
  AlertTriangle,
  Mail,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(false);

  const [adminData, setAdminData] = useState({
    email: "",
    password: "",
    securityCode: "",
  });

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple credential check
    setTimeout(() => {
      setIsLoading(false);
      if (
        adminData.email === "test@gmail.com" &&
        adminData.password === "test123"
      ) {
        navigate("/admin/dashboard");
      } else {
        alert(
          "Invalid credentials. Use email: test@gmail.com, password: test123"
        );
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-pink-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-3">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg"
            />
            <span className="text-white font-bold text-xl">BeautySalon</span>
            <span className="px-3 py-1 bg-red-500/20 text-red-300 border border-red-500/30 rounded-full text-xs font-semibold">
              Admin Portal
            </span>
          </div>

          <Link
            to="/login"
            className="flex items-center gap-2 text-purple-300 hover:text-pink-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Customer Login</span>
          </Link>
        </div>
      </header>

      {/* Main Admin Login Card */}
      <div className="relative z-10 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 shadow-2xl shadow-purple-500/20">
            {/* Header with Admin Badge */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-700 rounded-2xl mb-4 relative"
              >
                <Shield className="w-10 h-10 text-white" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center border-2 border-purple-950">
                  <span className="text-base">👑</span>
                </div>
              </motion.div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Administrator Portal
              </h2>
              <p className="text-gray-400">Secure platform access</p>
            </div>

            {/* Security Warning */}
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-yellow-200 text-sm font-medium mb-1">
                  Secure Admin Access
                </p>
                <p className="text-yellow-200/70 text-xs">
                  All administrative activities are logged and monitored for
                  security purposes.
                </p>
              </div>
            </div>

            {/* Admin Login Form */}
            <form onSubmit={handleAdminLogin} className="space-y-5">
              {/* Admin Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Administrator Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                  <input
                    type="email"
                    value={adminData.email}
                    onChange={(e) =>
                      setAdminData({ ...adminData, email: e.target.value })
                    }
                    placeholder="admin@beautysalon.com"
                    className="w-full bg-black/30 backdrop-blur-sm border border-purple-400/40 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 focus:outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* Admin Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Secure Password
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <Lock className="w-5 h-5 text-purple-400" />
                    <Shield className="w-3 h-3 text-purple-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={adminData.password}
                    onChange={(e) =>
                      setAdminData({ ...adminData, password: e.target.value })
                    }
                    placeholder="Enter secure password"
                    className="w-full bg-black/30 backdrop-blur-sm border border-purple-400/40 rounded-xl pl-16 pr-12 py-3 text-white placeholder-gray-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 focus:outline-none transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Security Code Field (2FA) */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Security Code{" "}
                  <span className="text-gray-500 text-xs">
                    (Optional - 2FA)
                  </span>
                </label>
                <div className="relative">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                  <input
                    type="text"
                    value={adminData.securityCode}
                    onChange={(e) =>
                      setAdminData({
                        ...adminData,
                        securityCode: e.target.value,
                      })
                    }
                    placeholder="Enter 2FA code if enabled"
                    className="w-full bg-black/30 backdrop-blur-sm border border-purple-400/40 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 focus:outline-none transition-all"
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
                  <div
                    className={`w-5 h-5 rounded border-2 transition-all ${
                      rememberDevice
                        ? "bg-gradient-to-r from-purple-600 to-pink-700 border-transparent"
                        : "border-purple-400/40 bg-black/30"
                    }`}
                  >
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
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                  Remember this device for 30 days
                </span>
              </label>

              {/* Access Dashboard Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-700 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    <span>Access Admin Dashboard</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Security Footer */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-2">
                <Shield className="w-3 h-3" />
                Secure admin access • All activities are logged
              </p>
            </div>
          </div>

          {/* Authorized Access Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-center"
          >
            <p className="text-gray-500 text-sm">
              Authorized access only • Security contact:{" "}
              <a
                href="mailto:security@beautysalon.com"
                className="text-purple-400 hover:text-pink-400 transition-colors"
              >
                security@beautysalon.com
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLoginPage;

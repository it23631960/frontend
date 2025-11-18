import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  ArrowRight,
  Shield,
  Chrome,
  Facebook,
  Apple,
  ArrowLeft,
  HelpCircle,
  Building2,
  AlertTriangle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../hooks/useUserOperations";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useUserAuth();
  const [activeTab, setActiveTab] = useState<"customer" | "owner" | "admin">(
    "customer"
  );
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [customerForm, setCustomerForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [ownerForm, setOwnerForm] = useState({
    email: "",
    password: "",
    rememberDevice: false,
  });

  const [adminForm, setAdminForm] = useState({
    email: "",
    password: "",
    rememberDevice: false,
  });

  const handleCustomerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simple credential check
    setTimeout(async () => {
      if (
        customerForm.email === "test@gmail.com" &&
        customerForm.password === "test123"
      ) {
        // Set authentication state with mock user
        const mockUser = {
          id: "test-user-1",
          username: "Test User",
          email: "test@gmail.com",
        };

        // Store in localStorage to persist across page navigation
        localStorage.setItem("currentUser", JSON.stringify(mockUser));
        localStorage.setItem("isAuthenticated", "true");

        setIsLoading(false);
        navigate("/profile");
      } else {
        setIsLoading(false);
        alert(
          "Invalid credentials. Use email: test@gmail.com, password: test123"
        );
      }
    }, 1000);
  };

  const handleOwnerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simple credential check
    setTimeout(() => {
      setIsLoading(false);
      if (
        ownerForm.email === "test@gmail.com" &&
        ownerForm.password === "test123"
      ) {
        navigate("/owner/dashboard");
      } else {
        alert(
          "Invalid credentials. Use email: test@gmail.com, password: test123"
        );
      }
    }, 1000);
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simple credential check
    setTimeout(() => {
      setIsLoading(false);
      if (
        adminForm.email === "test@gmail.com" &&
        adminForm.password === "test123"
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
          <Link
            to="/"
            className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-3 hover:bg-white/15 transition-all"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg"
            />
            <span className="text-white font-bold text-xl">BeautySalon</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-purple-300 hover:text-pink-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <button className="flex items-center gap-2 text-purple-300 hover:text-pink-300 transition-colors">
              <HelpCircle className="w-4 h-4" />
              <span>Help</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Login Card */}
      <div className="relative z-10 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 shadow-2xl shadow-purple-500/20">
            {/* Three-Tab Switcher */}
            <div className="relative flex gap-2 bg-white/5 rounded-2xl p-2 mb-8">
              <button
                onClick={() => setActiveTab("customer")}
                className={`relative z-10 flex-1 py-3 text-sm font-semibold rounded-xl transition-colors ${
                  activeTab === "customer"
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {activeTab === "customer" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl shadow-lg -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                Customer
              </button>
              <button
                onClick={() => setActiveTab("owner")}
                className={`relative z-10 flex-1 py-3 text-sm font-semibold rounded-xl transition-colors ${
                  activeTab === "owner"
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {activeTab === "owner" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl shadow-lg -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                Salon Owner
              </button>
              <button
                onClick={() => setActiveTab("admin")}
                className={`relative z-10 flex-1 py-3 text-sm font-semibold rounded-xl transition-colors ${
                  activeTab === "admin"
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {activeTab === "admin" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl shadow-lg -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                Admin
              </button>
            </div>

            <AnimatePresence mode="wait">
              {/* CUSTOMER LOGIN FORM */}
              {activeTab === "customer" && (
                <motion.div
                  key="customer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Welcome Section */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-4">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                      Welcome Back
                    </h2>
                    <p className="text-gray-400">
                      Access your beauty appointments
                    </p>
                  </div>

                  {/* Customer Form */}
                  <form onSubmit={handleCustomerLogin} className="space-y-5">
                    {/* Email Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                        <input
                          type="email"
                          value={customerForm.email}
                          onChange={(e) =>
                            setCustomerForm({
                              ...customerForm,
                              email: e.target.value,
                            })
                          }
                          placeholder="Enter your email"
                          className="w-full bg-white/5 backdrop-blur-sm border border-purple-400/30 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 focus:outline-none transition-all"
                          required
                        />
                      </div>
                    </div>

                    {/* Password Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={customerForm.password}
                          onChange={(e) =>
                            setCustomerForm({
                              ...customerForm,
                              password: e.target.value,
                            })
                          }
                          placeholder="Enter your password"
                          className="w-full bg-white/5 backdrop-blur-sm border border-purple-400/30 rounded-xl pl-12 pr-12 py-3 text-white placeholder-gray-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 focus:outline-none transition-all"
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

                    {/* Helper Row */}
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={customerForm.rememberMe}
                            onChange={(e) =>
                              setCustomerForm({
                                ...customerForm,
                                rememberMe: e.target.checked,
                              })
                            }
                            className="sr-only"
                          />
                          <div
                            className={`w-5 h-5 rounded border-2 transition-all ${
                              customerForm.rememberMe
                                ? "bg-gradient-to-r from-purple-500 to-pink-600 border-transparent"
                                : "border-purple-400/30 bg-white/5"
                            }`}
                          >
                            {customerForm.rememberMe && (
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
                          Remember me
                        </span>
                      </label>
                      <Link
                        to="/forgot-password"
                        className="text-sm text-purple-400 hover:text-pink-400 transition-colors"
                      >
                        Forgot Password?
                      </Link>
                    </div>

                    {/* Two Buttons Side by Side */}
                    <div className="flex gap-4">
                      <motion.button
                        type="submit"
                        disabled={isLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50"
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
                            <span>Sign In</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </motion.button>

                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 bg-white/5 border border-white/20 text-white font-semibold py-3 rounded-xl hover:bg-white/10 transition-all"
                      >
                        Create Account
                      </motion.button>
                    </div>

                    {/* Social Login */}
                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-transparent text-gray-400">
                          Or continue with
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { icon: Chrome, name: "Google" },
                        { icon: Facebook, name: "Facebook" },
                        { icon: Apple, name: "Apple" },
                      ].map(({ icon: Icon, name }) => (
                        <motion.button
                          key={name}
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl py-3 flex items-center justify-center hover:bg-white/10 transition-all"
                        >
                          <Icon className="w-5 h-5 text-white" />
                        </motion.button>
                      ))}
                    </div>
                  </form>
                </motion.div>
              )}

              {/* SALON OWNER LOGIN FORM */}
              {activeTab === "owner" && (
                <motion.div
                  key="owner"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Welcome Section */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-4">
                      <Building2 className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                      Salon Owner Portal
                    </h2>
                    <p className="text-gray-400">
                      Manage your salon and appointments
                    </p>
                  </div>

                  {/* Owner Form */}
                  <form onSubmit={handleOwnerLogin} className="space-y-5">
                    {/* Email Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                        <input
                          type="email"
                          value={ownerForm.email}
                          onChange={(e) =>
                            setOwnerForm({
                              ...ownerForm,
                              email: e.target.value,
                            })
                          }
                          placeholder="Enter your business email"
                          className="w-full bg-white/5 backdrop-blur-sm border border-purple-400/30 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 focus:outline-none transition-all"
                          required
                        />
                      </div>
                    </div>

                    {/* Password Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={ownerForm.password}
                          onChange={(e) =>
                            setOwnerForm({
                              ...ownerForm,
                              password: e.target.value,
                            })
                          }
                          placeholder="Enter your password"
                          className="w-full bg-white/5 backdrop-blur-sm border border-purple-400/30 rounded-xl pl-12 pr-12 py-3 text-white placeholder-gray-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 focus:outline-none transition-all"
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

                    {/* Helper Row */}
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={ownerForm.rememberDevice}
                            onChange={(e) =>
                              setOwnerForm({
                                ...ownerForm,
                                rememberDevice: e.target.checked,
                              })
                            }
                            className="sr-only"
                          />
                          <div
                            className={`w-5 h-5 rounded border-2 transition-all ${
                              ownerForm.rememberDevice
                                ? "bg-gradient-to-r from-purple-500 to-pink-600 border-transparent"
                                : "border-purple-400/30 bg-white/5"
                            }`}
                          >
                            {ownerForm.rememberDevice && (
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
                          Remember this device
                        </span>
                      </label>
                      <Link
                        to="/forgot-password"
                        className="text-sm text-purple-400 hover:text-pink-400 transition-colors"
                      >
                        Forgot Password?
                      </Link>
                    </div>

                    {/* Two Buttons Side by Side */}
                    <div className="flex gap-4">
                      <motion.button
                        type="submit"
                        disabled={isLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50"
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
                            <span>Access Dashboard</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </motion.button>

                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 bg-white/5 border border-white/20 text-white font-semibold py-3 rounded-xl hover:bg-white/10 transition-all"
                      >
                        Register Salon
                      </motion.button>
                    </div>

                    {/* Helper Text */}
                    <p className="text-sm text-center text-gray-400 mt-4">
                      Don't have a salon account yet?{" "}
                      <span className="text-purple-400 hover:text-pink-400 transition-colors cursor-pointer">
                        Register your salon
                      </span>{" "}
                      to get started
                    </p>
                  </form>
                </motion.div>
              )}

              {/* ADMIN LOGIN FORM */}
              {activeTab === "admin" && (
                <motion.div
                  key="admin"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Welcome Section */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-600 to-pink-700 rounded-2xl mb-4">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent mb-2">
                      Administrator Portal
                    </h2>
                    <p className="text-gray-400">
                      Access platform management and controls
                    </p>
                  </div>

                  {/* Security Warning */}
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl backdrop-blur-sm">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-300">
                        All admin activities are logged and monitored.
                        Unauthorized access attempts will be reported.
                      </p>
                    </div>
                  </div>

                  {/* Admin Form */}
                  <form onSubmit={handleAdminLogin} className="space-y-5">
                    {/* Email/Username Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email or Username
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-400" />
                        <input
                          type="text"
                          value={adminForm.email}
                          onChange={(e) =>
                            setAdminForm({
                              ...adminForm,
                              email: e.target.value,
                            })
                          }
                          placeholder="Enter admin email or username"
                          className="w-full bg-white/5 backdrop-blur-sm border border-red-400/30 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/50 focus:outline-none transition-all"
                          required
                        />
                      </div>
                    </div>

                    {/* Password Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={adminForm.password}
                          onChange={(e) =>
                            setAdminForm({
                              ...adminForm,
                              password: e.target.value,
                            })
                          }
                          placeholder="Enter admin password"
                          className="w-full bg-white/5 backdrop-blur-sm border border-red-400/30 rounded-xl pl-12 pr-12 py-3 text-white placeholder-gray-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/50 focus:outline-none transition-all"
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

                    {/* Helper Row */}
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={adminForm.rememberDevice}
                            onChange={(e) =>
                              setAdminForm({
                                ...adminForm,
                                rememberDevice: e.target.checked,
                              })
                            }
                            className="sr-only"
                          />
                          <div
                            className={`w-5 h-5 rounded border-2 transition-all ${
                              adminForm.rememberDevice
                                ? "bg-gradient-to-r from-red-600 to-pink-700 border-transparent"
                                : "border-red-400/30 bg-white/5"
                            }`}
                          >
                            {adminForm.rememberDevice && (
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
                          Remember this device
                        </span>
                      </label>
                      <Link
                        to="/forgot-password"
                        className="text-sm text-red-400 hover:text-pink-400 transition-colors"
                      >
                        Forgot Password?
                      </Link>
                    </div>

                    {/* Full Width Admin Button */}
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-red-600 to-pink-700 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-red-500/50 transition-all disabled:opacity-50"
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
                          <span>Access Admin Panel</span>
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </motion.button>

                    {/* Footer Text */}
                    <p className="text-xs text-center text-gray-500 mt-4">
                      Administrator accounts are invite-only. Contact support
                      for access.
                    </p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-gray-400 text-sm mb-4">
            � 2025 BeautySalon. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm">
            <Link
              to="/privacy"
              className="text-purple-300 hover:text-pink-300 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-purple-300 hover:text-pink-300 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              to="/support"
              className="text-purple-300 hover:text-pink-300 transition-colors"
            >
              Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;

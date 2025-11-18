import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  Calendar,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Bell,
  Menu,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { OwnerDashboard } from "./dashboard/OwnerDashboard";
import { AppointmentDashboard } from "../admin/appointments/AppointmentDashboard";
import OwnerProfile from "./OwnerProfile";
import OwnerSettings from "./OwnerSettings";

const OwnerDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Mock salon data
  const salonName = "Elite Hair Studio";
  const ownerName = "Sarah Johnson";

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      path: "/owner/dashboard",
    },
    {
      id: "appointments",
      label: "Appointments",
      icon: Calendar,
      path: "/owner/appointments",
    },
    { id: "profile", label: "Profile", icon: User, path: "/owner/profile" },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      path: "/owner/settings",
    },
  ];

  const renderContent = () => {
    switch (activeNav) {
      case "dashboard":
        return <OwnerDashboard />;
      case "appointments":
        return <AppointmentDashboard />;
      case "profile":
        return <OwnerProfile />;
      case "settings":
        return <OwnerSettings />;
      default:
        return <OwnerDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-pink-950">
      {/* Owner Navigation Header */}
      <nav className="sticky top-0 z-40 bg-black/80 backdrop-blur-lg border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Salon Name */}
            <div className="flex items-center gap-4">
              <Link to="/owner/dashboard" className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl"
                />
                <div>
                  <span className="text-white font-bold text-xl hidden sm:block">
                    BeautySalon
                  </span>
                  <span className="text-purple-300 text-xs font-medium">
                    {salonName}
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Items */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveNav(item.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all relative ${
                      isActive
                        ? "text-pink-400"
                        : "text-gray-400 hover:text-purple-300"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeOwnerTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-600"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full" />
              </button>

              {/* Owner Profile */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-3 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2 transition-all"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {ownerName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <span className="text-white font-medium">{ownerName}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden shadow-2xl"
                  >
                    <Link
                      to="/owner/profile"
                      className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                    >
                      <User className="w-4 h-4" />
                      <span>My Profile</span>
                    </Link>
                    <Link
                      to="/owner/settings"
                      className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </Link>
                    <button
                      onClick={() => navigate("/login")}
                      className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-all border-t border-white/10"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </motion.div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="md:hidden border-t border-white/10 py-4"
            >
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveNav(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 ${
                      activeNav === item.id
                        ? "text-pink-400 bg-white/10"
                        : "text-gray-400"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-3 px-4 py-3 text-gray-400 w-full border-t border-white/10 mt-2"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Main Dashboard Content */}
      {renderContent()}
    </div>
  );
};

export default OwnerDashboardPage;

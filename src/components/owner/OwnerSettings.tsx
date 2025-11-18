import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Lock,
  Globe,
  CreditCard,
  Users,
  Calendar,
  Eye,
  EyeOff,
  Save,
  Shield,
} from "lucide-react";

const OwnerSettings: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    bookingAlerts: true,
    reviewAlerts: true,
    promotionalEmails: false,

    // Business Hours
    mondayStart: "09:00",
    mondayEnd: "18:00",

    // Booking Settings
    autoConfirm: false,
    bufferTime: "15",
    advanceBooking: "30",

    // Password
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSave = () => {
    console.log("Settings saved:", settings);
    // Add save logic here
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>

      {/* Notification Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-6 h-6 text-purple-400" />
          <h2 className="text-xl font-bold text-white">
            Notification Preferences
          </h2>
        </div>

        <div className="space-y-4">
          {[
            {
              id: "emailNotifications",
              label: "Email Notifications",
              description: "Receive updates via email",
            },
            {
              id: "smsNotifications",
              label: "SMS Notifications",
              description: "Get text message alerts",
            },
            {
              id: "bookingAlerts",
              label: "Booking Alerts",
              description: "Notify on new bookings",
            },
            {
              id: "reviewAlerts",
              label: "Review Alerts",
              description: "Alert when customers leave reviews",
            },
            {
              id: "promotionalEmails",
              label: "Promotional Emails",
              description: "Marketing and tips from BeautySalon",
            },
          ].map((setting) => (
            <div
              key={setting.id}
              className="flex items-center justify-between p-4 bg-white/5 rounded-xl"
            >
              <div>
                <p className="text-white font-medium">{setting.label}</p>
                <p className="text-gray-400 text-sm">{setting.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={
                    settings[setting.id as keyof typeof settings] as boolean
                  }
                  onChange={(e) =>
                    setSettings({ ...settings, [setting.id]: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-pink-600"></div>
              </label>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Booking Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="w-6 h-6 text-pink-400" />
          <h2 className="text-xl font-bold text-white">Booking Settings</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
            <div>
              <p className="text-white font-medium">Auto-Confirm Bookings</p>
              <p className="text-gray-400 text-sm">
                Automatically accept new bookings
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.autoConfirm}
                onChange={(e) =>
                  setSettings({ ...settings, autoConfirm: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-pink-600"></div>
            </label>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Buffer Time (minutes)
              </label>
              <input
                type="number"
                value={settings.bufferTime}
                onChange={(e) =>
                  setSettings({ ...settings, bufferTime: e.target.value })
                }
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Advance Booking (days)
              </label>
              <input
                type="number"
                value={settings.advanceBooking}
                onChange={(e) =>
                  setSettings({ ...settings, advanceBooking: e.target.value })
                }
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Business Hours */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <Globe className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-bold text-white">Business Hours</h2>
        </div>

        <div className="space-y-3">
          {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ].map((day) => (
            <div
              key={day}
              className="flex items-center gap-4 p-4 bg-white/5 rounded-xl"
            >
              <span className="text-white font-medium w-28">{day}</span>
              <input
                type="time"
                defaultValue="09:00"
                className="bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
              />
              <span className="text-gray-400">to</span>
              <input
                type="time"
                defaultValue="18:00"
                className="bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
              />
              <label className="flex items-center gap-2 text-gray-400 text-sm">
                <input type="checkbox" className="rounded" defaultChecked />
                Open
              </label>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Security Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-green-400" />
          <h2 className="text-xl font-bold text-white">Security & Password</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Current Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={settings.currentPassword}
                onChange={(e) =>
                  setSettings({ ...settings, currentPassword: e.target.value })
                }
                className="w-full bg-white/5 border border-white/20 rounded-xl pl-12 pr-12 py-3 text-white focus:border-purple-500 focus:outline-none"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">
              New Password
            </label>
            <input
              type="password"
              value={settings.newPassword}
              onChange={(e) =>
                setSettings({ ...settings, newPassword: e.target.value })
              }
              className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              value={settings.confirmPassword}
              onChange={(e) =>
                setSettings({ ...settings, confirmPassword: e.target.value })
              }
              className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
              placeholder="Confirm new password"
            />
          </div>
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        onClick={handleSave}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/50 transition-all"
      >
        <Save className="w-5 h-5" />
        Save All Settings
      </motion.button>
    </div>
  );
};

export default OwnerSettings;

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings as SettingsIcon,
  Globe,
  Mail,
  DollarSign,
  Palette,
  Save,
  Bell,
  Database,
  Shield,
} from "lucide-react";

const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    siteName: "BeautySalon",
    siteDescription: "Premium salon booking platform",
    supportEmail: "support@beautysalon.com",
    commissionRate: "15",
    currency: "USD",
    timezone: "America/New_York",
    maintenanceMode: false,
    registrationOpen: true,
    autoApprovalSalons: false,
  });

  const handleSave = () => {
    console.log("Settings saved:", settings);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="flex items-center gap-3 mb-8">
        <SettingsIcon className="w-8 h-8 text-purple-400" />
        <div>
          <h1 className="text-3xl font-bold text-white">Platform Settings</h1>
          <p className="text-gray-400">Configure global platform settings</p>
        </div>
      </div>

      {/* General Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <Globe className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-bold text-white">General Settings</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Site Name
            </label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) =>
                setSettings({ ...settings, siteName: e.target.value })
              }
              className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Site Description
            </label>
            <textarea
              value={settings.siteDescription}
              onChange={(e) =>
                setSettings({ ...settings, siteDescription: e.target.value })
              }
              className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none resize-none"
              rows={3}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Timezone
              </label>
              <select
                value={settings.timezone}
                onChange={(e) =>
                  setSettings({ ...settings, timezone: e.target.value })
                }
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
              >
                <option value="America/New_York">Eastern Time (ET)</option>
                <option value="America/Chicago">Central Time (CT)</option>
                <option value="America/Denver">Mountain Time (MT)</option>
                <option value="America/Los_Angeles">Pacific Time (PT)</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Currency
              </label>
              <select
                value={settings.currency}
                onChange={(e) =>
                  setSettings({ ...settings, currency: e.target.value })
                }
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="CAD">CAD ($)</option>
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Business Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <DollarSign className="w-6 h-6 text-green-400" />
          <h2 className="text-xl font-bold text-white">Business Settings</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Platform Commission Rate (%)
            </label>
            <input
              type="number"
              value={settings.commissionRate}
              onChange={(e) =>
                setSettings({ ...settings, commissionRate: e.target.value })
              }
              className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
              min="0"
              max="100"
            />
            <p className="text-gray-500 text-xs mt-1">
              Commission charged on each booking
            </p>
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Support Email
            </label>
            <input
              type="email"
              value={settings.supportEmail}
              onChange={(e) =>
                setSettings({ ...settings, supportEmail: e.target.value })
              }
              className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
            />
          </div>
        </div>
      </motion.div>

      {/* Platform Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-purple-400" />
          <h2 className="text-xl font-bold text-white">Platform Controls</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
            <div>
              <p className="text-white font-medium">Maintenance Mode</p>
              <p className="text-gray-400 text-sm">
                Temporarily disable the platform
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    maintenanceMode: e.target.checked,
                  })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-pink-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
            <div>
              <p className="text-white font-medium">Open Registration</p>
              <p className="text-gray-400 text-sm">
                Allow new user registrations
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.registrationOpen}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    registrationOpen: e.target.checked,
                  })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-pink-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
            <div>
              <p className="text-white font-medium">Auto-Approve Salons</p>
              <p className="text-gray-400 text-sm">
                Automatically approve new salon registrations
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.autoApprovalSalons}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    autoApprovalSalons: e.target.checked,
                  })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-pink-600"></div>
            </label>
          </div>
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
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

export default AdminSettings;

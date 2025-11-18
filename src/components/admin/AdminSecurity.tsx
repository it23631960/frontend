import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  Key,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Globe,
  Database,
  Server,
} from "lucide-react";

const AdminSecurity: React.FC = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [ipWhitelisting, setIpWhitelisting] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);

  const securityLogs = [
    {
      id: 1,
      action: "Admin login successful",
      user: "admin@beautysalon.com",
      ip: "192.168.1.1",
      time: "2 min ago",
      status: "success",
    },
    {
      id: 2,
      action: "Password changed",
      user: "admin@beautysalon.com",
      ip: "192.168.1.1",
      time: "1 hour ago",
      status: "success",
    },
    {
      id: 3,
      action: "Failed login attempt",
      user: "unknown",
      ip: "45.123.45.67",
      time: "3 hours ago",
      status: "failed",
    },
    {
      id: 4,
      action: "API key generated",
      user: "admin@beautysalon.com",
      ip: "192.168.1.1",
      time: "5 hours ago",
      status: "success",
    },
    {
      id: 5,
      action: "2FA enabled",
      user: "admin@beautysalon.com",
      ip: "192.168.1.1",
      time: "1 day ago",
      status: "success",
    },
  ];

  const systemStatus = [
    {
      name: "SSL Certificate",
      status: "Valid",
      expiry: "Expires in 89 days",
      icon: Lock,
      color: "green",
    },
    {
      name: "Firewall",
      status: "Active",
      expiry: "All ports protected",
      icon: Shield,
      color: "green",
    },
    {
      name: "Database Encryption",
      status: "Enabled",
      expiry: "AES-256 encryption",
      icon: Database,
      color: "green",
    },
    {
      name: "API Rate Limiting",
      status: "Active",
      expiry: "1000 req/min",
      icon: Activity,
      color: "green",
    },
    {
      name: "DDoS Protection",
      status: "Enabled",
      expiry: "Cloudflare active",
      icon: Server,
      color: "green",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Shield className="w-8 h-8 text-purple-400" />
        <div>
          <h1 className="text-3xl font-bold text-white">Security Center</h1>
          <p className="text-gray-400">
            Manage platform security and access controls
          </p>
        </div>
      </div>

      {/* Security Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 backdrop-blur-md border border-green-500/30 rounded-2xl p-6 mb-8"
      >
        <div className="flex items-center gap-3">
          <CheckCircle className="w-12 h-12 text-green-400" />
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">
              All Systems Secure
            </h2>
            <p className="text-green-300">
              No security issues detected. Last scan: 5 minutes ago
            </p>
          </div>
        </div>
      </motion.div>

      {/* Security Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6"
        >
          <h2 className="text-xl font-bold text-white mb-6">
            Authentication Settings
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div>
                <p className="text-white font-medium flex items-center gap-2">
                  <Key className="w-4 h-4 text-purple-400" />
                  Two-Factor Authentication
                </p>
                <p className="text-gray-400 text-sm">
                  Require 2FA for admin login
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={twoFactorEnabled}
                  onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-pink-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div>
                <p className="text-white font-medium flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-400" />
                  IP Whitelisting
                </p>
                <p className="text-gray-400 text-sm">
                  Restrict access to specific IPs
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={ipWhitelisting}
                  onChange={(e) => setIpWhitelisting(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-pink-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div>
                <p className="text-white font-medium flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  Login Alerts
                </p>
                <p className="text-gray-400 text-sm">
                  Email alerts for admin logins
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={loginAlerts}
                  onChange={(e) => setLoginAlerts(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-pink-600"></div>
              </label>
            </div>
          </div>
        </motion.div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6"
        >
          <h2 className="text-xl font-bold text-white mb-6">
            System Security Status
          </h2>

          <div className="space-y-4">
            {systemStatus.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.name}
                  className="flex items-start gap-4 p-4 bg-white/5 rounded-xl"
                >
                  <div className={`p-2 bg-${item.color}-500/20 rounded-lg`}>
                    <Icon className={`w-5 h-5 text-${item.color}-400`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-white font-medium">{item.name}</p>
                      <span
                        className={`text-${item.color}-400 text-sm font-medium`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">{item.expiry}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Security Logs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Recent Security Logs</h2>
          <button className="text-purple-400 hover:text-pink-400 text-sm font-medium">
            View All Logs →
          </button>
        </div>

        <div className="space-y-3">
          {securityLogs.map((log) => (
            <div
              key={log.id}
              className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all"
            >
              <div
                className={`p-2 rounded-lg ${
                  log.status === "success" ? "bg-green-500/20" : "bg-red-500/20"
                }`}
              >
                {log.status === "success" ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-white font-medium">{log.action}</p>
                <p className="text-gray-400 text-sm">
                  {log.user} • IP: {log.ip}
                </p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-sm flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {log.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminSecurity;

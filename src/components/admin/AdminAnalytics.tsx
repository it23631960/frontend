import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  DollarSign,
  Users,
  Calendar,
  Building2,
  ArrowUp,
  ArrowDown,
  Download,
} from "lucide-react";

const AdminAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d" | "1y">(
    "30d"
  );

  const stats = [
    {
      label: "Total Revenue",
      value: "$124.5K",
      change: "+18%",
      trend: "up",
      icon: DollarSign,
      color: "green",
    },
    {
      label: "New Users",
      value: "2,847",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "purple",
    },
    {
      label: "Total Bookings",
      value: "1,234",
      change: "+8%",
      trend: "up",
      icon: Calendar,
      color: "blue",
    },
    {
      label: "Active Salons",
      value: "156",
      change: "+5%",
      trend: "up",
      icon: Building2,
      color: "pink",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-gray-400">Platform performance and insights</p>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-1">
          {[
            { value: "7d", label: "7 Days" },
            { value: "30d", label: "30 Days" },
            { value: "90d", label: "90 Days" },
            { value: "1y", label: "1 Year" },
          ].map((range) => (
            <button
              key={range.value}
              onClick={() => setTimeRange(range.value as any)}
              className={`px-4 py-2 rounded-lg transition-all ${
                timeRange === range.value
                  ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === "up" ? ArrowUp : ArrowDown;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-3 bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 rounded-xl`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span
                  className={`flex items-center gap-1 text-sm font-medium ${
                    stat.trend === "up" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  <TrendIcon className="w-4 h-4" />
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-400 text-sm mb-1">{stat.label}</h3>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Chart Placeholder */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Revenue Overview</h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
          <div className="h-64 flex items-center justify-center bg-white/5 rounded-xl">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-purple-400 mx-auto mb-3" />
              <p className="text-gray-400">Revenue chart visualization</p>
              <p className="text-gray-500 text-sm mt-2">
                $12K → $45K (Annual Growth)
              </p>
            </div>
          </div>
        </motion.div>

        {/* Booking Distribution Placeholder */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6"
        >
          <h2 className="text-xl font-bold text-white mb-6">
            Booking Distribution
          </h2>
          <div className="h-64 flex flex-col items-center justify-center bg-white/5 rounded-xl">
            <div className="space-y-3 w-full px-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Hair Salons</span>
                <span className="text-purple-400 font-medium">45%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Barber Shops</span>
                <span className="text-pink-400 font-medium">25%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Nail Salons</span>
                <span className="text-blue-400 font-medium">20%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Bridal Salons</span>
                <span className="text-green-400 font-medium">10%</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* User Growth Chart Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">User Growth</h2>
          <span className="text-green-400 text-sm font-medium flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            +12% vs last month
          </span>
        </div>
        <div className="h-64 flex items-center justify-center bg-white/5 rounded-xl">
          <div className="flex gap-4">
            {[
              { label: "Week 1", value: 120, height: "50%" },
              { label: "Week 2", value: 150, height: "65%" },
              { label: "Week 3", value: 180, height: "80%" },
              { label: "Week 4", value: 220, height: "100%" },
            ].map((week) => (
              <div
                key={week.label}
                className="flex flex-col items-center gap-2"
              >
                <div className="relative w-16 h-40 bg-white/5 rounded-lg overflow-hidden">
                  <div
                    className="absolute bottom-0 w-full bg-gradient-to-t from-purple-600 to-pink-600 rounded-lg"
                    style={{ height: week.height }}
                  />
                </div>
                <span className="text-gray-400 text-xs">{week.label}</span>
                <span className="text-white text-sm font-medium">
                  {week.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Key Metrics Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6"
      >
        <h2 className="text-xl font-bold text-white mb-6">
          Key Performance Metrics
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-gray-400 font-medium py-3 px-4">
                  Metric
                </th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">
                  Current
                </th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">
                  Previous
                </th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">
                  Change
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  metric: "Average Booking Value",
                  current: "$85.50",
                  previous: "$78.20",
                  change: "+9.3%",
                  trend: "up",
                },
                {
                  metric: "Customer Retention Rate",
                  current: "87%",
                  previous: "84%",
                  change: "+3.6%",
                  trend: "up",
                },
                {
                  metric: "Salon Approval Rate",
                  current: "92%",
                  previous: "88%",
                  change: "+4.5%",
                  trend: "up",
                },
                {
                  metric: "Platform Fee Revenue",
                  current: "$12.4K",
                  previous: "$11.2K",
                  change: "+10.7%",
                  trend: "up",
                },
                {
                  metric: "Active Users (Daily)",
                  current: "1,234",
                  previous: "1,156",
                  change: "+6.7%",
                  trend: "up",
                },
              ].map((row) => (
                <tr
                  key={row.metric}
                  className="border-b border-white/5 hover:bg-white/5 transition-all"
                >
                  <td className="py-4 px-4 text-white">{row.metric}</td>
                  <td className="py-4 px-4 text-white font-medium">
                    {row.current}
                  </td>
                  <td className="py-4 px-4 text-gray-400">{row.previous}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`flex items-center gap-1 font-medium ${
                        row.trend === "up" ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {row.trend === "up" ? (
                        <ArrowUp className="w-4 h-4" />
                      ) : (
                        <ArrowDown className="w-4 h-4" />
                      )}
                      {row.change}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminAnalytics;

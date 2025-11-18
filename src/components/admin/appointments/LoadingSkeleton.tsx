import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 h-40"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl"></div>
              <div className="w-16 h-4 bg-white/10 rounded"></div>
            </div>
            <div className="w-24 h-10 bg-white/20 rounded mb-2"></div>
            <div className="w-32 h-4 bg-white/10 rounded mb-1"></div>
            <div className="w-20 h-3 bg-white/10 rounded"></div>
          </div>
        ))}
      </div>

      {/* Filter Bar Skeleton */}
      <div className="bg-white/5 backdrop-blur-sm border border-purple-400/30 rounded-xl p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="h-10 bg-white/10 rounded-lg"></div>
          <div className="h-10 bg-white/10 rounded-lg"></div>
          <div className="h-10 bg-white/10 rounded-lg"></div>
          <div className="h-10 bg-white/10 rounded-lg"></div>
        </div>
      </div>

      {/* Appointment List Skeleton */}
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4"
          >
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 bg-purple-500/20 rounded-lg"></div>
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-32 h-5 bg-white/20 rounded"></div>
                  <div className="w-24 h-5 bg-white/10 rounded"></div>
                </div>
                <div className="w-48 h-4 bg-white/10 rounded"></div>
                <div className="w-64 h-4 bg-white/10 rounded"></div>
                <div className="flex gap-2">
                  <div className="w-24 h-8 bg-purple-500/20 rounded"></div>
                  <div className="w-24 h-8 bg-purple-500/20 rounded"></div>
                  <div className="w-24 h-8 bg-purple-500/20 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

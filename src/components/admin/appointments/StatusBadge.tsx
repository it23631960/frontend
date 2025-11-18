import React from 'react';
import { CheckCircle, Clock, XCircle, Check } from 'lucide-react';

interface StatusBadgeProps {
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
  size?: 'sm' | 'md' | 'lg';
}

const STATUS_CONFIG = {
  CONFIRMED: {
    bg: 'bg-green-500/20',
    text: 'text-green-300',
    border: 'border-green-500/30',
    icon: CheckCircle,
    label: 'Confirmed',
    emoji: '✅'
  },
  PENDING: {
    bg: 'bg-yellow-500/20',
    text: 'text-yellow-300',
    border: 'border-yellow-500/30',
    icon: Clock,
    label: 'Pending',
    emoji: '⏳'
  },
  CANCELLED: {
    bg: 'bg-red-500/20',
    text: 'text-red-300',
    border: 'border-red-500/30',
    icon: XCircle,
    label: 'Cancelled',
    emoji: '❌'
  },
  COMPLETED: {
    bg: 'bg-blue-500/20',
    text: 'text-blue-300',
    border: 'border-blue-500/30',
    icon: Check,
    label: 'Completed',
    emoji: '✔️'
  },
  NO_SHOW: {
    bg: 'bg-gray-500/20',
    text: 'text-gray-300',
    border: 'border-gray-500/30',
    icon: XCircle,
    label: 'No Show',
    emoji: '👻'
  }
};

const SIZE_CONFIG = {
  sm: {
    padding: 'px-2 py-1',
    text: 'text-xs',
    icon: 'w-3 h-3'
  },
  md: {
    padding: 'px-3 py-1.5',
    text: 'text-sm',
    icon: 'w-4 h-4'
  },
  lg: {
    padding: 'px-4 py-2',
    text: 'text-base',
    icon: 'w-5 h-5'
  }
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const config = STATUS_CONFIG[status];
  const sizeConfig = SIZE_CONFIG[size];
  const Icon = config.icon;

  return (
    <div
      className={`
        inline-flex items-center gap-1.5 rounded-full border
        ${config.bg} ${config.text} ${config.border}
        ${sizeConfig.padding} ${sizeConfig.text}
        font-semibold
      `}
    >
      <span>{config.emoji}</span>
      <Icon className={sizeConfig.icon} />
      <span>{config.label}</span>
    </div>
  );
};

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MessageSquare, Check, AlertCircle } from 'lucide-react';
import { CustomerInfo } from '../../types/booking';

interface CustomerInfoFormProps {
  customerInfo: Partial<CustomerInfo>;
  specialRequests: string;
  onCustomerInfoChange: (customerInfo: Partial<CustomerInfo>) => void;
  onSpecialRequestsChange: (specialRequests: string) => void;
}

const CustomerInfoForm: React.FC<CustomerInfoFormProps> = ({
  customerInfo,
  specialRequests,
  onCustomerInfoChange,
  onSpecialRequestsChange
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'firstName':
        if (!value.trim()) {
          newErrors.firstName = 'First name is required';
        } else if (value.trim().length < 2) {
          newErrors.firstName = 'First name must be at least 2 characters';
        } else {
          delete newErrors.firstName;
        }
        break;

      case 'lastName':
        if (!value.trim()) {
          newErrors.lastName = 'Last name is required';
        } else if (value.trim().length < 2) {
          newErrors.lastName = 'Last name must be at least 2 characters';
        } else {
          delete newErrors.lastName;
        }
        break;

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          newErrors.email = 'Email is required';
        } else if (!emailRegex.test(value)) {
          newErrors.email = 'Please enter a valid email address';
        } else {
          delete newErrors.email;
        }
        break;

      case 'phone':
        const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
        if (!value.trim()) {
          newErrors.phone = 'Phone number is required';
        } else if (!phoneRegex.test(value.replace(/\s/g, ''))) {
          newErrors.phone = 'Please enter a valid phone number';
        } else {
          delete newErrors.phone;
        }
        break;
    }

    setErrors(newErrors);
  };

  const handleInputChange = (name: keyof CustomerInfo, value: string | boolean) => {
    onCustomerInfoChange({
      ...customerInfo,
      [name]: value
    });

    if (typeof value === 'string') {
      validateField(name, value);
    }
  };

  const handleBlur = (name: string) => {
    setTouched({ ...touched, [name]: true });
    if (typeof customerInfo[name as keyof CustomerInfo] === 'string') {
      validateField(name, customerInfo[name as keyof CustomerInfo] as string || '');
    }
  };

  const isValid = (name: string) => {
    return touched[name] && !errors[name] && customerInfo[name as keyof CustomerInfo];
  };

  const hasError = (name: string) => {
    return touched[name] && errors[name];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Personal Information */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <User className="w-6 h-6 text-purple-400" />
          <h4 className="text-xl font-semibold text-white">Personal Information</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">
              First Name <span className="text-pink-400">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={customerInfo.firstName || ''}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                onBlur={() => handleBlur('firstName')}
                className={`
                  w-full px-4 py-3 bg-white/5 backdrop-blur-sm border rounded-lg
                  text-white placeholder-white/50 transition-all
                  focus:outline-none focus:ring-2 focus:ring-pink-500/50
                  ${hasError('firstName')
                    ? 'border-red-400 focus:border-red-400'
                    : isValid('firstName')
                    ? 'border-green-400 focus:border-green-400'
                    : 'border-purple-400/30 focus:border-pink-500'
                  }
                `}
                placeholder="Enter your first name"
              />
              {isValid('firstName') && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Check className="w-5 h-5 text-green-400" />
                </div>
              )}
              {hasError('firstName') && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                </div>
              )}
            </div>
            {hasError('firstName') && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-400"
              >
                {errors.firstName}
              </motion.p>
            )}
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">
              Last Name <span className="text-pink-400">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={customerInfo.lastName || ''}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                onBlur={() => handleBlur('lastName')}
                className={`
                  w-full px-4 py-3 bg-white/5 backdrop-blur-sm border rounded-lg
                  text-white placeholder-white/50 transition-all
                  focus:outline-none focus:ring-2 focus:ring-pink-500/50
                  ${hasError('lastName')
                    ? 'border-red-400 focus:border-red-400'
                    : isValid('lastName')
                    ? 'border-green-400 focus:border-green-400'
                    : 'border-purple-400/30 focus:border-pink-500'
                  }
                `}
                placeholder="Enter your last name"
              />
              {isValid('lastName') && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Check className="w-5 h-5 text-green-400" />
                </div>
              )}
              {hasError('lastName') && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                </div>
              )}
            </div>
            {hasError('lastName') && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-400"
              >
                {errors.lastName}
              </motion.p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/80">
            Email Address <span className="text-pink-400">*</span>
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Mail className="w-5 h-5 text-white/50" />
            </div>
            <input
              type="email"
              value={customerInfo.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              className={`
                w-full pl-12 pr-12 py-3 bg-white/5 backdrop-blur-sm border rounded-lg
                text-white placeholder-white/50 transition-all
                focus:outline-none focus:ring-2 focus:ring-pink-500/50
                ${hasError('email')
                  ? 'border-red-400 focus:border-red-400'
                  : isValid('email')
                  ? 'border-green-400 focus:border-green-400'
                  : 'border-purple-400/30 focus:border-pink-500'
                }
              `}
              placeholder="your.email@example.com"
            />
            {isValid('email') && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Check className="w-5 h-5 text-green-400" />
              </div>
            )}
            {hasError('email') && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <AlertCircle className="w-5 h-5 text-red-400" />
              </div>
            )}
          </div>
          {hasError('email') && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-400"
            >
              {errors.email}
            </motion.p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/80">
            Phone Number <span className="text-pink-400">*</span>
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Phone className="w-5 h-5 text-white/50" />
            </div>
            <input
              type="tel"
              value={customerInfo.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              onBlur={() => handleBlur('phone')}
              className={`
                w-full pl-12 pr-12 py-3 bg-white/5 backdrop-blur-sm border rounded-lg
                text-white placeholder-white/50 transition-all
                focus:outline-none focus:ring-2 focus:ring-pink-500/50
                ${hasError('phone')
                  ? 'border-red-400 focus:border-red-400'
                  : isValid('phone')
                  ? 'border-green-400 focus:border-green-400'
                  : 'border-purple-400/30 focus:border-pink-500'
                }
              `}
              placeholder="(555) 123-4567"
            />
            {isValid('phone') && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Check className="w-5 h-5 text-green-400" />
              </div>
            )}
            {hasError('phone') && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <AlertCircle className="w-5 h-5 text-red-400" />
              </div>
            )}
          </div>
          {hasError('phone') && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-400"
            >
              {errors.phone}
            </motion.p>
          )}
        </div>
      </div>

      {/* Special Requests */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <MessageSquare className="w-6 h-6 text-purple-400" />
          <h4 className="text-xl font-semibold text-white">Special Requests</h4>
          <span className="text-sm text-white/50">(Optional)</span>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/80">
            Any special requests or notes for your stylist?
          </label>
          <textarea
            value={specialRequests}
            onChange={(e) => onSpecialRequestsChange(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-purple-400/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all resize-none"
            placeholder="e.g., 'I prefer shorter layers' or 'Please be gentle, sensitive scalp'"
            maxLength={500}
          />
          <div className="flex justify-between items-center text-sm text-white/50">
            <span>Let us know how we can make your experience perfect</span>
            <span>{specialRequests.length}/500</span>
          </div>
        </div>
      </div>

      {/* First Time Customer */}
      <div className="space-y-4">
        <div className="bg-white/5 backdrop-blur-sm border border-purple-400/30 rounded-xl p-4">
          <label className="flex items-start space-x-3 cursor-pointer">
            <div className="relative mt-1">
              <input
                type="checkbox"
                checked={customerInfo.isFirstTime || false}
                onChange={(e) => handleInputChange('isFirstTime', e.target.checked)}
                className="sr-only"
              />
              <div className={`
                w-5 h-5 rounded border-2 transition-all flex items-center justify-center
                ${customerInfo.isFirstTime
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-purple-400'
                  : 'border-purple-400/50 bg-white/5'
                }
              `}>
                {customerInfo.isFirstTime && (
                  <Check className="w-3 h-3 text-white" />
                )}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-white font-medium">First time at this salon?</div>
              <div className="text-white/70 text-sm">
                Check this if this is your first visit. We'll make sure to give you extra attention and a quick tour!
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* Booking Policies */}
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/30 rounded-xl p-4 backdrop-blur-sm">
        <h5 className="font-semibold text-white mb-3">Booking Policies</h5>
        <ul className="space-y-2 text-sm text-white/70">
          <li className="flex items-start space-x-2">
            <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
            <span>Please arrive 10 minutes before your appointment</span>
          </li>
          <li className="flex items-start space-x-2">
            <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
            <span>Cancellations must be made at least 24 hours in advance</span>
          </li>
          <li className="flex items-start space-x-2">
            <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
            <span>A credit card is required to secure your appointment</span>
          </li>
          <li className="flex items-start space-x-2">
            <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
            <span>Consultations are complimentary with all services</span>
          </li>
        </ul>
      </div>
    </motion.div>
  );
};

export default CustomerInfoForm;
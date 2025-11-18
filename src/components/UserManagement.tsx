import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Plus, Edit, Trash2, X, Save, User as UserIcon, Search } from 'lucide-react';
import { useUserOperations, useUserList } from '../hooks/useUserOperations';
import { LoadingSpinner } from './LoadingComponents';
import { CreateUserRequest, UpdateUserRequest, DisplayUser } from '../types/user';
import { isValidEmail, isValidPassword } from '../services/userApiService';

interface UserManagementProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserManagement: React.FC<UserManagementProps> = ({ isOpen, onClose }) => {
  const { users, isLoading: usersLoading, refreshUsers } = useUserList();
  const { createUser, updateUser, deleteUser, isLoading: operationLoading } = useUserOperations();
  
  const [isCreating, setIsCreating] = useState(false);
  const [editingUser, setEditingUser] = useState<DisplayUser | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState<CreateUserRequest & { confirmPassword?: string }>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const resetForm = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setErrors({});
    setIsCreating(false);
    setEditingUser(null);
    setShowForm(false);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordValidation = isValidPassword(formData.password);
      if (!passwordValidation.isValid) {
        newErrors.password = passwordValidation.message || 'Invalid password';
      }
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const userData: CreateUserRequest | UpdateUserRequest = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    let success = false;

    if (isCreating) {
      const result = await createUser(userData as CreateUserRequest);
      success = result !== null;
    } else if (editingUser) {
      const result = await updateUser(editingUser.id, userData as UpdateUserRequest);
      success = result !== null;
    }

    if (success) {
      resetForm();
      refreshUsers();
    }
  };

  const handleEdit = (user: DisplayUser) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      password: '', // Don't pre-fill password for security
      confirmPassword: '',
    });
    setIsCreating(false);
    setShowForm(true);
  };

  const handleDelete = async (user: DisplayUser) => {
    if (window.confirm(`Are you sure you want to delete user "${user.username}"?`)) {
      const success = await deleteUser(user.id, user.username);
      if (success) {
        refreshUsers();
      }
    }
  };

  const handleCreateNew = () => {
    resetForm();
    setIsCreating(true);
    setShowForm(true);
  };

  // Refresh users when component opens
  useEffect(() => {
    if (isOpen) {
      refreshUsers();
    }
  }, [isOpen, refreshUsers]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.3 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 w-full max-w-4xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">User Management</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 h-full">
              {/* User List */}
              <div className="flex-1 min-h-0">
                {/* Search and Actions */}
                <div className="flex items-center justify-between mb-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    onClick={handleCreateNew}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add User</span>
                  </button>
                </div>

                {/* Users List */}
                <div className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
                  <div className="max-h-96 overflow-y-auto">
                    {usersLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <LoadingSpinner size="md" color="purple" />
                        <span className="ml-3 text-purple-300">Loading users...</span>
                      </div>
                    ) : filteredUsers.length === 0 ? (
                      <div className="text-center py-8 text-gray-400">
                        {searchTerm ? 'No users found matching your search.' : 'No users found.'}
                      </div>
                    ) : (
                      <div className="divide-y divide-white/10">
                        {filteredUsers.map((user) => (
                          <motion.div
                            key={user.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 hover:bg-white/5 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="p-2 bg-blue-500/20 rounded-lg">
                                  <UserIcon className="w-4 h-4 text-blue-400" />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-white">{user.username}</h3>
                                  <p className="text-sm text-gray-400">{user.email}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleEdit(user)}
                                  className="p-2 text-yellow-400 hover:bg-yellow-500/20 rounded-lg transition-colors"
                                  title="Edit User"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDelete(user)}
                                  className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                                  title="Delete User"
                                  disabled={operationLoading}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* User Form */}
              {showForm && (
                <motion.div
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="w-full lg:w-96 bg-white/5 rounded-lg border border-white/10 p-6"
                >
                  <h3 className="text-lg font-semibold text-white mb-4">
                    {isCreating ? 'Create New User' : 'Edit User'}
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Username */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Username
                      </label>
                      <input
                        type="text"
                        value={formData.username}
                        onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                        className={`w-full px-3 py-2 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
                          errors.username ? 'border-red-500 focus:ring-red-500' : 'border-white/20 focus:ring-blue-500'
                        }`}
                        placeholder="Enter username"
                        disabled={operationLoading}
                      />
                      {errors.username && (
                        <p className="mt-1 text-xs text-red-400">{errors.username}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className={`w-full px-3 py-2 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
                          errors.email ? 'border-red-500 focus:ring-red-500' : 'border-white/20 focus:ring-blue-500'
                        }`}
                        placeholder="Enter email"
                        disabled={operationLoading}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                      )}
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Password
                      </label>
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                        className={`w-full px-3 py-2 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
                          errors.password ? 'border-red-500 focus:ring-red-500' : 'border-white/20 focus:ring-blue-500'
                        }`}
                        placeholder={editingUser ? "Enter new password" : "Enter password"}
                        disabled={operationLoading}
                      />
                      {errors.password && (
                        <p className="mt-1 text-xs text-red-400">{errors.password}</p>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        value={formData.confirmPassword || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className={`w-full px-3 py-2 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
                          errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-white/20 focus:ring-blue-500'
                        }`}
                        placeholder="Confirm password"
                        disabled={operationLoading}
                      />
                      {errors.confirmPassword && (
                        <p className="mt-1 text-xs text-red-400">{errors.confirmPassword}</p>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2 pt-4">
                      <button
                        type="submit"
                        disabled={operationLoading}
                        className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        {operationLoading ? (
                          <LoadingSpinner size="sm" color="white" />
                        ) : (
                          <Save className="w-4 h-4" />
                        )}
                        <span>{operationLoading ? 'Saving...' : (isCreating ? 'Create' : 'Update')}</span>
                      </button>
                      <button
                        type="button"
                        onClick={resetForm}
                        className="px-4 py-2 border border-white/20 text-gray-300 font-semibold rounded-lg hover:bg-white/5 transition-colors"
                        disabled={operationLoading}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserManagement;
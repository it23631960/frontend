import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit,
  Save,
  X,
  Building2,
  Camera,
} from "lucide-react";

const OwnerProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Sarah Johnson",
    email: "sarah@elitehair.com",
    phone: "+1 (555) 123-4567",
    salonName: "Elite Hair Studio",
    address: "123 Beauty Street, Los Angeles, CA 90001",
    bio: "Passionate salon owner with 10+ years of experience in the beauty industry.",
    specialties: "Hair Styling, Color Treatment, Wedding Packages",
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    console.log("Profile updated:", profileData);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Profile Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 mb-6"
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-6">
            {/* Profile Picture */}
            <div className="relative group">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-4xl">
                  {profileData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-purple-600 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Basic Info */}
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {profileData.name}
              </h1>
              <p className="text-gray-400 mb-3 flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Owner of {profileData.salonName}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm">
                  Verified Owner
                </span>
                <span className="px-3 py-1 bg-pink-500/20 border border-pink-500/30 rounded-full text-pink-300 text-sm">
                  Premium Member
                </span>
              </div>
            </div>
          </div>

          {/* Edit Button */}
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all"
            >
              <Edit className="w-4 h-4" />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Bio */}
        <div className="border-t border-white/10 pt-6">
          <label className="block text-gray-400 text-sm mb-2">Biography</label>
          {isEditing ? (
            <textarea
              value={profileData.bio}
              onChange={(e) =>
                setProfileData({ ...profileData, bio: e.target.value })
              }
              className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none resize-none"
              rows={3}
            />
          ) : (
            <p className="text-gray-300">{profileData.bio}</p>
          )}
        </div>
      </motion.div>

      {/* Contact Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-6"
      >
        <h2 className="text-xl font-bold text-white mb-6">
          Contact Information
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Email Address
            </label>
            {isEditing ? (
              <input
                type="email"
                value={profileData.email}
                onChange={(e) =>
                  setProfileData({ ...profileData, email: e.target.value })
                }
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
              />
            ) : (
              <p className="text-white">{profileData.email}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">
              <Phone className="w-4 h-4 inline mr-2" />
              Phone Number
            </label>
            {isEditing ? (
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) =>
                  setProfileData({ ...profileData, phone: e.target.value })
                }
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
              />
            ) : (
              <p className="text-white">{profileData.phone}</p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Salon Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6"
      >
        <h2 className="text-xl font-bold text-white mb-6">Salon Information</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              <Building2 className="w-4 h-4 inline mr-2" />
              Salon Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.salonName}
                onChange={(e) =>
                  setProfileData({ ...profileData, salonName: e.target.value })
                }
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
              />
            ) : (
              <p className="text-white">{profileData.salonName}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">
              <MapPin className="w-4 h-4 inline mr-2" />
              Address
            </label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.address}
                onChange={(e) =>
                  setProfileData({ ...profileData, address: e.target.value })
                }
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
              />
            ) : (
              <p className="text-white">{profileData.address}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Specialties
            </label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.specialties}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    specialties: e.target.value,
                  })
                }
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                placeholder="e.g., Hair Styling, Nails, Makeup"
              />
            ) : (
              <p className="text-white">{profileData.specialties}</p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OwnerProfile;

import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Edit, Save, X } from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, City, State 12345',
    dateOfBirth: '1990-01-01'
  });

  const [editProfile, setEditProfile] = useState({ ...profile });

  const handleSave = () => {
    setProfile({ ...editProfile });
    setIsEditing(false);
    // In a real app, this would save to backend
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setEditProfile({ ...profile });
    setIsEditing(false);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <div className="bg-white border border-[#DEE2E7] rounded-md">
        <div className="p-6 border-b border-[#DEE2E7]">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-[#1C1C1C]">My Profile</h1>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-[#0D6EFD] text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
              >
                <Edit className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  className="bg-[#00B517] text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 flex items-center space-x-2"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Picture */}
            <div className="md:col-span-2 flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <User className="w-12 h-12 text-gray-500" />
              </div>
              <h2 className="text-xl font-semibold text-[#1C1C1C]">{profile.name}</h2>
              <p className="text-[#8B96A5]">{profile.email}</p>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#1C1C1C] mb-4">Personal Information</h3>

              <div>
                <label className="block text-sm font-medium text-[#1C1C1C] mb-1">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editProfile.name}
                    onChange={(e) => setEditProfile({ ...editProfile, name: e.target.value })}
                    className="w-full border border-[#DEE2E7] rounded px-3 py-2 focus:outline-none focus:border-[#0D6EFD]"
                  />
                ) : (
                  <p className="text-[#1C1C1C] py-2">{profile.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1C1C1C] mb-1">Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editProfile.email}
                    onChange={(e) => setEditProfile({ ...editProfile, email: e.target.value })}
                    className="w-full border border-[#DEE2E7] rounded px-3 py-2 focus:outline-none focus:border-[#0D6EFD]"
                  />
                ) : (
                  <p className="text-[#1C1C1C] py-2 flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-[#8B96A5]" />
                    {profile.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1C1C1C] mb-1">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editProfile.phone}
                    onChange={(e) => setEditProfile({ ...editProfile, phone: e.target.value })}
                    className="w-full border border-[#DEE2E7] rounded px-3 py-2 focus:outline-none focus:border-[#0D6EFD]"
                  />
                ) : (
                  <p className="text-[#1C1C1C] py-2 flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-[#8B96A5]" />
                    {profile.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#1C1C1C] mb-4">Address Information</h3>

              <div>
                <label className="block text-sm font-medium text-[#1C1C1C] mb-1">Address</label>
                {isEditing ? (
                  <textarea
                    value={editProfile.address}
                    onChange={(e) => setEditProfile({ ...editProfile, address: e.target.value })}
                    rows={3}
                    className="w-full border border-[#DEE2E7] rounded px-3 py-2 focus:outline-none focus:border-[#0D6EFD]"
                  />
                ) : (
                  <p className="text-[#1C1C1C] py-2 flex items-start">
                    <MapPin className="w-4 h-4 mr-2 mt-1 text-[#8B96A5] flex-shrink-0" />
                    {profile.address}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1C1C1C] mb-1">Date of Birth</label>
                {isEditing ? (
                  <input
                    type="date"
                    value={editProfile.dateOfBirth}
                    onChange={(e) => setEditProfile({ ...editProfile, dateOfBirth: e.target.value })}
                    className="w-full border border-[#DEE2E7] rounded px-3 py-2 focus:outline-none focus:border-[#0D6EFD]"
                  />
                ) : (
                  <p className="text-[#1C1C1C] py-2">{profile.dateOfBirth}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
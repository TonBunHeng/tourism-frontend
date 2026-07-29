import { useState, useRef } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit, Camera, Shield, Globe, Moon, Sun, Monitor, Check, Heart, MessageSquare, MapPinned, CalendarDays, Image, Settings, FileText, Eye, EyeOff, CheckCircle, Compass, Sparkles } from 'lucide-react';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  // User data
  const [userData, setUserData] = useState({
    name: 'BunHeng Ton',
    email: 'bunheng@example.com',
    phone: '+855 12 345 678',
    location: 'Phnom Penh, Cambodia',
    bio: 'Passionate about exploring Cambodia\'s rich cultural heritage and sharing experiences with fellow travelers.',
    joinDate: 'January 15, 2023',
    role: 'Admin',
    verified: true,
    twoFactorAuth: true
  });

  // User stats
  const userStats = [
    { label: 'Total Places', value: '156', icon: MapPinned, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: 'Total Reviews', value: '89', icon: MessageSquare, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20' },
    { label: 'Total Favorites', value: '234', icon: Heart, color: 'text-red-500 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20' },
    { label: 'Total Photos', value: '567', icon: Image, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/20' }
  ];

  // Recent activity
  const recentActivity = [
    { id: 1, action: 'Added new place', target: 'Angkor Wat Temple', time: '2 hours ago', icon: MapPinned },
    { id: 2, action: 'Submitted a review', target: 'Royal Palace', time: '5 hours ago', icon: MessageSquare },
    { id: 3, action: 'Uploaded photos', target: 'Koh Rong Island', time: '1 day ago', icon: Image },
    { id: 4, action: 'Created event', target: 'Water Festival 2024', time: '2 days ago', icon: CalendarDays },
    { id: 5, action: 'Added to favorites', target: 'Bayon Temple', time: '3 days ago', icon: Heart }
  ];

  // Achievements
  const achievements = [
    { name: 'Explorer', description: 'Visited 50+ places', icon: Globe, unlocked: true },
    { name: 'Photographer', description: 'Uploaded 100+ photos', icon: Image, unlocked: true },
    { name: 'Reviewer', description: 'Written 50+ reviews', icon: FileText, unlocked: true },
    { name: 'Event Creator', description: 'Created 10+ events', icon: CalendarDays, unlocked: false },
    { name: 'Guide', description: 'Helped 100+ travelers', icon: Compass, unlocked: false },
    { name: 'Ambassador', description: 'Invited 50+ friends', icon: Sparkles, unlocked: false }
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setSaveSuccess(true);
    setIsEditing(false);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Settings }
  ];

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-start gap-6">
        <div className="flex items-start gap-4 sm:gap-6 w-full sm:w-auto">
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center overflow-hidden">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 dark:text-blue-400" />
              )}
            </div>
            <button
              onClick={() => fileInputRef.current.click()}
              className="absolute bottom-0 right-0 p-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          {/* Name/badges shown next to avatar on mobile so the header reads naturally at narrow widths */}
          <div className="flex-1 min-w-0 sm:hidden">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white truncate">{userData.name}</h2>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              {userData.verified && (
                <span className="flex items-center gap-1 text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full border border-blue-200 dark:border-blue-800">
                  <CheckCircle className="w-3 h-3" />
                  Verified
                </span>
              )}
              <span className="text-xs px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full border border-purple-200 dark:border-purple-800">
                {userData.role}
              </span>
            </div>
          </div>
        </div>
        <div className="flex-1 min-w-0 w-full">
          <div className="hidden sm:flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{userData.name}</h2>
            {userData.verified && (
              <span className="flex items-center gap-1 text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full border border-blue-200 dark:border-blue-800">
                <CheckCircle className="w-3 h-3" />
                Verified
              </span>
            )}
            <span className="text-xs px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full border border-purple-200 dark:border-purple-800">
              {userData.role}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1 min-w-0">
              <Mail className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{userData.email}</span>
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-4 h-4 flex-shrink-0" />
              {userData.phone}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              {userData.location}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 max-w-2xl">{userData.bio}</p>
          <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-gray-400 dark:text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              Joined {userData.joinDate}
            </span>
            <span>•</span>
            <span>2FA {userData.twoFactorAuth ? 'Enabled' : 'Disabled'}</span>
          </div>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25 w-full sm:w-auto flex-shrink-0"
        >
          <Edit className="w-4 h-4" />
          Edit Profile
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {userStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-3 md:p-4 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate">{stat.label}</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-0.5">{stat.value}</p>
                </div>
                <div className={`p-2 md:p-2.5 rounded-lg flex-shrink-0 ${stat.bg}`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Achievements */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-5 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Achievements</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`text-center p-3 rounded-lg transition-all ${
                achievement.unlocked
                  ? 'bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-900/10 border border-amber-200 dark:border-amber-800'
                  : 'bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 opacity-50'
              }`}
            >
              <div className="mb-1 flex justify-center">
                <achievement.icon className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <p className="text-xs font-medium text-gray-700 dark:text-gray-300">{achievement.name}</p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">{achievement.description}</p>
              {achievement.unlocked && (
                <Check className="w-3 h-3 text-amber-500 mx-auto mt-1" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-5 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
          <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">View All</button>
        </div>
        <div className="space-y-2.5">
          {recentActivity.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 dark:text-gray-300 truncate">
                    {activity.action} <span className="font-medium text-gray-900 dark:text-white">{activity.target}</span>
                  </p>
                </div>
                <span className="text-xs text-gray-400 dark:text-gray-500 flex-shrink-0">{activity.time}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-5 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Password Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter current password"
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">New Password</label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                placeholder="Enter new password"
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <button
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Confirm New Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm new password"
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <button
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <button className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
            Update Password
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-5 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Two-Factor Authentication</h3>
        <div className="flex items-center justify-between gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <div className="min-w-0">
            <p className="font-medium text-gray-900 dark:text-white">2FA Status</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security to your account</p>
          </div>
          <button
            onClick={() => setUserData({...userData, twoFactorAuth: !userData.twoFactorAuth})}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors ${
              userData.twoFactorAuth ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                userData.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-5 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Sessions</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white">Current Session</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Chrome • Phnom Penh, Cambodia</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">Last active: 2 minutes ago</p>
            </div>
            <span className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full flex-shrink-0">Active</span>
          </div>
          <div className="flex items-center justify-between gap-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white">Mobile Session</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Safari • Siem Reap, Cambodia</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">Last active: 2 days ago</p>
            </div>
            <button className="text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium flex-shrink-0">Revoke</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-5 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Theme Preferences</h3>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {[
            { id: 'light', label: 'Light', icon: Sun },
            { id: 'dark', label: 'Dark', icon: Moon },
            { id: 'system', label: 'System', icon: Monitor }
          ].map((theme) => {
            const Icon = theme.icon;
            return (
              <button
                key={theme.id}
                className={`p-3 sm:p-4 rounded-lg border-2 transition-all text-center ${
                  theme.id === 'light'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 ${theme.id === 'light' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`} />
                <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">{theme.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-5 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Notification Preferences</h3>
        <div className="space-y-3">
          {[
            { id: 'email', label: 'Email Notifications', desc: 'Receive updates via email' },
            { id: 'push', label: 'Push Notifications', desc: 'Receive notifications in browser' },
            { id: 'sms', label: 'SMS Notifications', desc: 'Receive updates via SMS' }
          ].map((pref) => (
            <div key={pref.id} className="flex items-center justify-between gap-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="min-w-0">
                <p className="font-medium text-gray-900 dark:text-white">{pref.label}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{pref.desc}</p>
              </div>
              <button className="relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full bg-blue-600 transition-colors">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-5 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Language & Region</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Language</label>
            <select className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option>English</option>
              <option>Khmer</option>
              <option>French</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Timezone</label>
            <select className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option>Asia/Phnom_Penh</option>
              <option>Asia/Bangkok</option>
              <option>UTC</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch(activeTab) {
      case 'profile': return renderProfileTab();
      case 'security': return renderSecurityTab();
      case 'preferences': return renderPreferencesTab();
      default: return null;
    }
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Profile Settings</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage your account settings and preferences</p>
        </div>
        {saveSuccess && (
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-400 text-sm mt-2 sm:mt-0">
            <Check className="w-4 h-4 flex-shrink-0" />
            Profile updated successfully!
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 bg-white dark:bg-gray-800 rounded-xl p-1 shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      {renderTabContent()}
    </div>
  );
}
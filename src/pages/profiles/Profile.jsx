import { useState, useRef, useEffect, useCallback } from 'react';
import {
  MapPinned,
  MessageSquare,
  Heart,
  Image,
  Globe,
  FileText,
  CalendarDays,
  Compass,
  Sparkles,
  Activity
} from 'lucide-react';
import ProfileHeader from './ProfileHeader';
import ProfileStats from './ProfileStats';
import ProfileAchievements from './ProfileAchievements';
import ProfileActivity from './ProfileActivity';
import EditProfileModal from './EditProfileModal';
import ImageCropModal from './ImageCropModal';
import authService from '../../services/authService';
import dashboardService from '../../services/dashboardService';
import { useAlert } from '../../context/AlertContext';
import { validateImageFile } from '../../utils/fileValidation';

export default function Profile() {
  const { showAlert } = useAlert();
  const [userData, setUserData] = useState({
    name: 'Admin User',
    email: 'admin@tourism.gov.kh',
    phone: '+855 23 888 999',
    address: 'Phnom Penh, Cambodia',
    location: 'Phnom Penh, Cambodia',
    bio: 'Lead Administrator for Smart Tourism Information System.',
    joinDate: 'Aug 2026',
    loginAt: 'Aug 18, 2026',
    role: 'Super Admin',
    verified: true,
    twoFactorAuth: true
  });

  const [profileImage, setProfileImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const [rawImageSrc, setRawImageSrc] = useState(null);
  const fileInputRef = useRef(null);

  // Live stats & activity
  const [statsData, setStatsData] = useState({
    totalPlaces: 10,
    totalReviews: 8,
    totalFavorites: 2,
    totalPhotos: 4
  });
  const [recentActivities, setRecentActivities] = useState([]);

  const populateUserData = useCallback((currentUser) => {
    if (!currentUser) return;
    const locationVal = currentUser.address || currentUser.location || 'Phnom Penh, Cambodia';
    const avatarVal = currentUser.avatar || currentUser.image || currentUser.profile_photo_url || null;

    let formattedJoinDate = 'Aug 2026';
    if (currentUser.created_at) {
      try {
        const d = new Date(currentUser.created_at);
        formattedJoinDate = d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      } catch (e) {}
    }

    let formattedLoginAt = 'Just now';
    if (currentUser.last_active_at) {
      try {
        const d = new Date(currentUser.last_active_at);
        formattedLoginAt = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      } catch (e) {}
    }

    setUserData({
      name: currentUser.name || currentUser.username || 'User',
      email: currentUser.email || '',
      phone: currentUser.phone || currentUser.phone_number || '',
      address: locationVal,
      location: locationVal,
      bio: currentUser.bio || '',
      joinDate: formattedJoinDate,
      loginAt: formattedLoginAt,
      role: currentUser.role || 'Admin',
      verified: currentUser.verified !== undefined ? Boolean(currentUser.verified) : true,
      twoFactorAuth: Boolean(currentUser.two_factor_auth)
    });

    if (avatarVal) {
      setProfileImage(avatarVal);
    }
  }, []);

  const loadUserData = useCallback(() => {
    let currentUser = authService.getCurrentUser();
    if (!currentUser) {
      const stored = localStorage.getItem('user');
      if (stored) {
        try {
          currentUser = JSON.parse(stored);
        } catch (e) {}
      }
    }

    if (currentUser) {
      populateUserData(currentUser);
    }
  }, [populateUserData]);

  const loadLiveStats = async () => {
    try {
      const res = await dashboardService.getStats();
      if (res.success && res.data) {
        const d = res.data;
        setStatsData({
          totalPlaces: d.total_places || 10,
          totalReviews: d.total_reviews || 8,
          totalFavorites: d.total_favorites || 2,
          totalPhotos: d.total_galleries || 4
        });
        if (d.recent_activity && Array.isArray(d.recent_activity)) {
          setRecentActivities(d.recent_activity.map((act, idx) => ({
            id: act.id || idx,
            action: act.title || act.action || 'Activity on',
            target: act.subtitle || act.target || 'Destination',
            time: act.time || 'Today',
            icon: Activity
          })));
        }
      }
    } catch (e) {
      console.warn('Dashboard stats fallback:', e);
    }
  };

  useEffect(() => {
    loadUserData();
    loadLiveStats();

    if (authService.me) {
      authService.me().then(res => {
        if (res.success && res.data) {
          populateUserData(res.data);
        }
      }).catch((err) => {
        console.warn('Failed to sync profile with server:', err);
      });
    }

    const handleSync = () => loadUserData();
    window.addEventListener('user-profile-updated', handleSync);
    return () => window.removeEventListener('user-profile-updated', handleSync);
  }, [loadUserData, populateUserData]);

  const userStats = [
    { label: 'Total Places', value: String(statsData.totalPlaces), subtext: 'Destinations created', icon: MapPinned, color: 'text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)]', bg: 'bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)]' },
    { label: 'Total Reviews', value: String(statsData.totalReviews), subtext: 'Traveler feedback ratings', icon: MessageSquare, color: 'text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)]', bg: 'bg-[var(--color-success-bg)] dark:bg-[var(--color-success-dark-bg)]' },
    { label: 'Total Favorites', value: String(statsData.totalFavorites), subtext: 'Saved wishlist destinations', icon: Heart, color: 'text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)]', bg: 'bg-[var(--color-danger-bg)] dark:bg-[var(--color-danger-dark-bg)]' },
    { label: 'Total Photos', value: String(statsData.totalPhotos), subtext: 'Gallery uploads & media', icon: Image, color: 'text-[var(--color-purple-badge-text)] dark:text-[var(--color-purple-badge-dark-text)]', bg: 'bg-[var(--color-purple-badge-bg)] dark:bg-[var(--color-purple-badge-dark-bg)]' }
  ];

  const achievements = [
    { name: 'Explorer', description: 'Visited 50+ places', icon: Globe, unlocked: true },
    { name: 'Photographer', description: 'Uploaded 100+ photos', icon: Image, unlocked: true },
    { name: 'Reviewer', description: 'Written 50+ reviews', icon: FileText, unlocked: true },
    { name: 'Event Creator', description: 'Created 10+ events', icon: CalendarDays, unlocked: false },
    { name: 'Guide', description: 'Helped 100+ travelers', icon: Compass, unlocked: false },
    { name: 'Ambassador', description: 'Invited 50+ friends', icon: Sparkles, unlocked: false }
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      handleSelectFileForCrop(file);
    }
  };

  const handleSelectFileForCrop = (file) => {
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.valid) {
      showAlert({
        type: 'error',
        title: 'Invalid File',
        message: validation.error
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setRawImageSrc(e.target.result);
      setIsCropperOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = async (croppedDataUrl) => {
    setProfileImage(croppedDataUrl);
    updateUserStorage({ image: croppedDataUrl, avatar: croppedDataUrl });
    try {
      if (authService.updateAvatar) {
        const res = await authService.updateAvatar(croppedDataUrl);
        if (res.success && res.data) {
          populateUserData(res.data);
        }
      }
    } catch (err) {
      console.error('Avatar DB update error:', err);
    }
  };

  const updateUserStorage = (fields) => {
    let currentUser = {};
    try {
      currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    } catch (e) {}
    const updated = { ...currentUser, ...fields };
    localStorage.setItem('user', JSON.stringify(updated));
    window.dispatchEvent(new Event('user-profile-updated'));
  };

  const handleDeleteImage = async () => {
    setProfileImage(null);
    updateUserStorage({ image: null, avatar: null, profile_photo_url: null });
    try {
      if (authService.updateAvatar) {
        const res = await authService.updateAvatar(null);
        if (res.success && res.data) {
          populateUserData(res.data);
        }
      }
    } catch (e) {
      console.error('Error clearing avatar:', e);
    }
  };

  const handleSaveProfile = async (updatedData) => {
    const newLocation = updatedData.address || updatedData.location || '';
    const currentImg = updatedData.image !== undefined ? updatedData.image : profileImage;

    setUserData(prev => ({
      ...prev,
      name: updatedData.name,
      email: updatedData.email,
      phone: updatedData.phone,
      address: newLocation,
      location: newLocation
    }));

    if (currentImg) {
      setProfileImage(currentImg);
    }

    updateUserStorage({
      name: updatedData.name,
      email: updatedData.email,
      phone: updatedData.phone,
      address: newLocation,
      location: newLocation,
      image: currentImg,
      avatar: currentImg
    });

    try {
      if (authService.updateProfile) {
        const res = await authService.updateProfile({
          name: updatedData.name,
          email: updatedData.email,
          phone: updatedData.phone,
          address: newLocation,
          location: newLocation,
          image: currentImg,
          avatar: currentImg
        });
        if (res.success && res.data) {
          populateUserData(res.data);
        }
      }
    } catch (e) {
      console.error('DB profile save error:', e);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] tracking-tight">
            Profile Settings
          </h1>
          <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-1">
            Manage your personal profile, view achievements, and track activity
          </p>
        </div>
      </div>

      {/* Content Body */}
      <div className="space-y-6">
        <ProfileHeader
          userData={userData}
          profileImage={profileImage}
          fileInputRef={fileInputRef}
          handleImageUpload={handleImageUpload}
          onDeleteImage={handleDeleteImage}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
        <ProfileStats userStats={userStats} />
        <ProfileAchievements achievements={achievements} />
        <ProfileActivity recentActivity={recentActivities} />
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        userData={userData}
        profileImage={profileImage}
        onSave={handleSaveProfile}
        onSelectFileForCrop={handleSelectFileForCrop}
      />

      {/* Image Cropper Modal */}
      <ImageCropModal
        isOpen={isCropperOpen}
        imageSrc={rawImageSrc}
        onClose={() => setIsCropperOpen(false)}
        onCropComplete={handleCropComplete}
      />
    </div>
  );
}

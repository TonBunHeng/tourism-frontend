import { useState, useRef, useEffect } from 'react';
import {
  Globe,
  Image,
  FileText,
  CalendarDays,
  Compass,
  Sparkles,
  MapPinned,
  MessageSquare,
  Heart
} from 'lucide-react';
import ProfileHeader from './ProfileHeader';
import ProfileStats from './ProfileStats';
import ProfileAchievements from './ProfileAchievements';
import ProfileActivity from './ProfileActivity';
import EditProfileModal from './EditProfileModal';
import ImageCropModal from './ImageCropModal';
import authService from '../../services/authService';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [rawImageSrc, setRawImageSrc] = useState(null);
  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const fileInputRef = useRef(null);

  // User data
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    location: '',
    bio: '',
    joinDate: '',
    loginAt: '',
    role: 'Admin',
    verified: true,
    twoFactorAuth: false
  });

  const loadUserData = () => {
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
      const formattedLoginAt = currentUser.last_login_at || currentUser.login_at || currentUser.updated_at
        ? new Date(currentUser.last_login_at || currentUser.login_at || currentUser.updated_at).toLocaleString()
        : new Date().toLocaleString();

      const formattedJoinDate = currentUser.created_at
        ? new Date(currentUser.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        : 'Jan 2024';

      setUserData({
        name: currentUser.name || currentUser.username || 'User',
        email: currentUser.email || '',
        phone: currentUser.phone || currentUser.phone_number || '',
        address: currentUser.address || currentUser.location || '',
        location: currentUser.address || currentUser.location || '',
        bio: currentUser.bio || '',
        joinDate: formattedJoinDate,
        loginAt: formattedLoginAt,
        role: currentUser.role || 'Admin',
        verified: true,
        twoFactorAuth: false
      });

      if (currentUser.avatar || currentUser.image || currentUser.profile_photo_url) {
        setProfileImage(currentUser.avatar || currentUser.image || currentUser.profile_photo_url);
      }
    } else {
      setUserData({
        name: 'Guest User',
        email: 'guest@example.com',
        phone: '',
        address: '',
        location: '',
        bio: '',
        joinDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        loginAt: new Date().toLocaleString(),
        role: 'User',
        verified: false,
        twoFactorAuth: false
      });
    }
  };

  useEffect(() => {
    loadUserData();

    // Optionally sync latest profile from backend
    if (authService.me) {
      authService.me().then(res => {
        if (res.success && res.data) {
          loadUserData();
        }
      }).catch(() => {});
    }
  }, []);

  // User stats
  const userStats = [
    { label: 'Total Places', value: '0', icon: MapPinned, color: 'text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)]', bg: 'bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)]' },
    { label: 'Total Reviews', value: '0', icon: MessageSquare, color: 'text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)]', bg: 'bg-[var(--color-success-bg)] dark:bg-[var(--color-success-dark-bg)]' },
    { label: 'Total Favorites', value: '0', icon: Heart, color: 'text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)]', bg: 'bg-[var(--color-danger-bg)] dark:bg-[var(--color-danger-dark-bg)]' },
    { label: 'Total Photos', value: '0', icon: Image, color: 'text-[var(--color-purple-badge-text)] dark:text-[var(--color-purple-badge-dark-text)]', bg: 'bg-[var(--color-purple-badge-bg)] dark:bg-[var(--color-purple-badge-dark-bg)]' }
  ];

  // Recent activity
  const recentActivity = [];

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
    const file = event.target.files?.[0];
    if (file) {
      handleSelectFileForCrop(file);
    }
  };

  const handleSelectFileForCrop = (file) => {
    if (!file) return;
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
        await authService.updateAvatar(croppedDataUrl);
      }
    } catch (err) {
      console.log('Avatar DB update attempt:', err);
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
        await authService.updateAvatar(null);
      }
    } catch (e) {
      console.log('Error clearing avatar:', e);
    }
  };

  const handleSaveProfile = async (updatedData) => {
    setUserData(prev => ({
      ...prev,
      name: updatedData.name,
      email: updatedData.email,
      phone: updatedData.phone,
      address: updatedData.address,
      location: updatedData.address
    }));

    if (updatedData.image) {
      setProfileImage(updatedData.image);
    }

    const currentImg = updatedData.image || profileImage;

    updateUserStorage({
      name: updatedData.name,
      email: updatedData.email,
      phone: updatedData.phone,
      address: updatedData.address,
      location: updatedData.address,
      image: currentImg,
      avatar: currentImg
    });

    try {
      if (authService.updateProfile) {
        await authService.updateProfile({
          name: updatedData.name,
          email: updatedData.email,
          phone: updatedData.phone,
          address: updatedData.address,
          location: updatedData.address,
          image: currentImg,
          avatar: currentImg
        });
      }
    } catch (e) {
      console.log('DB profile save attempt:', e);
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
        <ProfileActivity recentActivity={recentActivity} />
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
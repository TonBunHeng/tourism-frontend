import { useState, useRef } from 'react';
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

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
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
    { label: 'Total Places', value: '156', icon: MapPinned, color: 'text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)]', bg: 'bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)]' },
    { label: 'Total Reviews', value: '89', icon: MessageSquare, color: 'text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)]', bg: 'bg-[var(--color-success-bg)] dark:bg-[var(--color-success-dark-bg)]' },
    { label: 'Total Favorites', value: '234', icon: Heart, color: 'text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)]', bg: 'bg-[var(--color-danger-bg)] dark:bg-[var(--color-danger-dark-bg)]' },
    { label: 'Total Photos', value: '567', icon: Image, color: 'text-[var(--color-purple-badge-text)] dark:text-[var(--color-purple-badge-dark-text)]', bg: 'bg-[var(--color-purple-badge-bg)] dark:bg-[var(--color-purple-badge-dark-bg)]' }
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

  const handleSaveProfile = (updatedData) => {
    setUserData(prev => ({
      ...prev,
      name: updatedData.name,
      email: updatedData.email,
      phone: updatedData.phone
    }));
    if (updatedData.image) {
      setProfileImage(updatedData.image);
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
      />
    </div>
  );
}
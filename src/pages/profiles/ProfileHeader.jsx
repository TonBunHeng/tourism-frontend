import { User, Mail, Phone, MapPin, Calendar, Edit, Camera, CheckCircle } from 'lucide-react';

export default function ProfileHeader({
  userData,
  profileImage,
  fileInputRef,
  handleImageUpload,
  setIsEditing
}) {
  return (
    <div className="flex flex-col sm:flex-row items-start gap-6">
      <div className="flex items-start gap-4 sm:gap-6 w-full sm:w-auto">
        <div className="relative flex-shrink-0">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-gradient-to-br from-[var(--color-info-bg)] to-[var(--color-purple-badge-bg)] dark:from-[var(--color-info-dark-bg)] dark:to-[var(--color-purple-badge-dark-bg)] flex items-center justify-center overflow-hidden">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="w-10 h-10 sm:w-12 sm:h-12 text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)]" />
            )}
          </div>
          <button
            onClick={() => fileInputRef.current.click()}
            className="absolute bottom-0 right-0 p-1.5 bg-[var(--color-primary)] text-[var(--color-white)] rounded-full hover:bg-[var(--color-primary-hover)] transition-colors"
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
            <h2 className="text-xl font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] truncate">{userData.name}</h2>
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            {userData.verified && (
              <span className="flex items-center gap-1 text-xs px-2 py-0.5 bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)] text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)] rounded-full border border-[var(--color-info-border)] dark:border-[var(--color-info-dark-border)]">
                <CheckCircle className="w-3 h-3" />
                Verified
              </span>
            )}
            <span className="text-xs px-2 py-0.5 bg-[var(--color-purple-badge-bg)] dark:bg-[var(--color-purple-badge-dark-bg)] text-[var(--color-purple-badge-text)] dark:text-[var(--color-purple-badge-dark-text)] rounded-full border border-[var(--color-purple-badge-border)] dark:border-[var(--color-purple-badge-dark-border)]">
              {userData.role}
            </span>
          </div>
        </div>
      </div>
      <div className="flex-1 min-w-0 w-full">
        <div className="hidden sm:flex flex-wrap items-center gap-3">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{userData.name}</h2>
          {userData.verified && (
            <span className="flex items-center gap-1 text-xs px-2 py-0.5 bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)] text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)] rounded-full border border-[var(--color-info-border)] dark:border-[var(--color-info-dark-border)]">
              <CheckCircle className="w-3 h-3" />
              Verified
            </span>
          )}
          <span className="text-xs px-2 py-0.5 bg-[var(--color-purple-badge-bg)] dark:bg-[var(--color-purple-badge-dark-bg)] text-[var(--color-purple-badge-text)] dark:text-[var(--color-purple-badge-dark-text)] rounded-full border border-[var(--color-purple-badge-border)] dark:border-[var(--color-purple-badge-dark-border)]">
            {userData.role}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
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
        <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-2 max-w-2xl">{userData.bio}</p>
        <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)]">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            Joined {userData.joinDate}
          </span>
          <span>•</span>
          <span>2FA {userData.twoFactorAuth ? 'Enabled' : 'Disabled'}</span>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setIsEditing(true)}
        className="flex items-center justify-center gap-1.5 md:gap-2 px-4 py-2 text-xs md:text-sm font-semibold rounded-md border border-transparent bg-[var(--color-primary)] text-[var(--color-white)] hover:bg-[var(--color-primary-hover)] transition-all shadow-lg shadow-[var(--color-primary)]/25 shrink-0 w-full sm:w-auto cursor-pointer active:scale-95"
      >
        <Edit className="w-4 h-4 shrink-0" />
        <span>Edit Profile</span>
      </button>
    </div>
  );
}

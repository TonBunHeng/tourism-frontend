import { User, Mail, Phone, MapPin, Calendar, Edit, Camera, CheckCircle, Clock, Trash2 } from 'lucide-react';

export default function ProfileHeader({
  userData,
  profileImage,
  fileInputRef,
  handleImageUpload,
  onDeleteImage,
  setIsEditing
}) {
  return (
    <div className="flex flex-col sm:flex-row items-start gap-6">
      <div className="flex items-start gap-4 sm:gap-6 w-full sm:w-auto">
        <div className="relative flex-shrink-0 group">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#181c24] dark:bg-[#181c24] border border-[#2d3442] flex items-center justify-center overflow-hidden shadow-md">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="w-10 h-10 sm:w-12 sm:h-12 text-gray-200" />
            )}
          </div>
          {profileImage && onDeleteImage && (
            <button
              type="button"
              onClick={onDeleteImage}
              className="absolute top-0 right-0 p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg transition-transform active:scale-95 cursor-pointer z-10"
              title="Delete picture"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
          {fileInputRef && (
            <>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 p-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-full shadow-lg transition-transform active:scale-95 cursor-pointer"
                title="Change & crop profile picture"
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
            </>
          )}
        </div>
        {/* Name/badges shown next to avatar on mobile so the header reads naturally at narrow widths */}
        <div className="flex-1 min-w-0 sm:hidden">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] truncate">{userData.name || 'User'}</h2>
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            {userData.verified && (
              <span className="flex items-center gap-1 text-xs px-2 py-0.5 bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)] text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)] rounded-full border border-[var(--color-info-border)] dark:border-[var(--color-info-dark-border)]">
                <CheckCircle className="w-3 h-3" />
                Verified
              </span>
            )}
            <span className="text-xs px-2 py-0.5 bg-[var(--color-purple-badge-bg)] dark:bg-[var(--color-purple-badge-dark-bg)] text-[var(--color-purple-badge-text)] dark:text-[var(--color-purple-badge-dark-text)] rounded-full border border-[var(--color-purple-badge-border)] dark:border-[var(--color-purple-badge-dark-border)]">
              {userData.role || 'User'}
            </span>
          </div>
        </div>
      </div>
      <div className="flex-1 min-w-0 w-full">
        <div className="hidden sm:flex flex-wrap items-center gap-3">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{userData.name || 'User'}</h2>
          {userData.verified && (
            <span className="flex items-center gap-1 text-xs px-2 py-0.5 bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)] text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)] rounded-full border border-[var(--color-info-border)] dark:border-[var(--color-info-dark-border)]">
              <CheckCircle className="w-3 h-3" />
              Verified
            </span>
          )}
          <span className="text-xs px-2 py-0.5 bg-[var(--color-purple-badge-bg)] dark:bg-[var(--color-purple-badge-dark-bg)] text-[var(--color-purple-badge-text)] dark:text-[var(--color-purple-badge-dark-text)] rounded-full border border-[var(--color-purple-badge-border)] dark:border-[var(--color-purple-badge-dark-border)]">
            {userData.role || 'User'}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-2 text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
          {userData.email && (
            <span className="flex items-center gap-1 min-w-0">
              <Mail className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{userData.email}</span>
            </span>
          )}
          {userData.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-4 h-4 flex-shrink-0" />
              {userData.phone}
            </span>
          )}
          {(userData.address || userData.location) && (
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              {userData.address || userData.location}
            </span>
          )}
        </div>
        {userData.bio && (
          <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-2 max-w-2xl">{userData.bio}</p>
        )}
        <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)]">
          {userData.loginAt && (
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              Login at: {userData.loginAt}
            </span>
          )}
          {userData.loginAt && userData.joinDate && <span>•</span>}
          {userData.joinDate && (
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              Joined {userData.joinDate}
            </span>
          )}
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

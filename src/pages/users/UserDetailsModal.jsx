import { X, Check, MapPin, Edit } from 'lucide-react';

export default function UserDetailsModal({ isOpen, user, onClose, onEdit }) {
  if (!isOpen || !user) return null;

  const UserAvatar = user.avatar;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-[#111827] text-white rounded-3xl max-w-lg w-full shadow-2xl border border-gray-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center">
              <UserAvatar className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-wide">User Details</h3>
              <p className="text-xs text-gray-400">ID: #{user.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">User Name</span>
            <p className="text-base font-semibold text-white mt-1 flex items-center gap-2">
              {user.name}
              {user.verified && (
                <span className="text-xs px-2 py-0.5 bg-blue-900/30 text-blue-400 rounded-full border border-blue-800 inline-flex items-center gap-1">
                  <Check className="w-3 h-3" /> Verified
                </span>
              )}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Email</span>
              <p className="text-sm font-medium text-white mt-1 truncate">{user.email}</p>
            </div>
            <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Phone</span>
              <p className="text-sm font-medium text-white mt-1 truncate">{user.phone}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Role & Status</span>
              <p className="text-sm font-medium text-blue-400 mt-1 flex items-center gap-1.5">
                {user.role} · <span className="text-green-400">{user.status}</span>
              </p>
            </div>
            <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Subscription</span>
              <p className="text-sm font-medium text-amber-400 mt-1">{user.subscription}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#1f2937]/50 p-3 rounded-2xl border border-gray-800 text-center">
              <span className="text-xs text-gray-400">Reviews</span>
              <p className="text-base font-bold text-white mt-0.5">{user.reviews}</p>
            </div>
            <div className="bg-[#1f2937]/50 p-3 rounded-2xl border border-gray-800 text-center">
              <span className="text-xs text-gray-400">Favorites</span>
              <p className="text-base font-bold text-white mt-0.5">{user.favorites}</p>
            </div>
            <div className="bg-[#1f2937]/50 p-3 rounded-2xl border border-gray-800 text-center">
              <span className="text-xs text-gray-400">Places</span>
              <p className="text-base font-bold text-white mt-0.5">{user.places}</p>
            </div>
          </div>

          <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Location & Activity</span>
            <p className="text-sm text-gray-300 mt-1 flex items-center justify-between">
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-gray-400" /> {user.location}</span>
              <span className="text-xs text-gray-400">Last active: {user.lastActive}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-800 bg-[#111827]">
          <button
            type="button"
            onClick={() => {
              const usr = user;
              onClose();
              onEdit(usr);
            }}
            className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            Edit User
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useNotificationStore } from '../../store/notificationStore';
import { NotificationPopover } from './NotificationPopover';

interface HeaderProps {
  onMenuToggle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const { user } = useAuthStore();
  const { notifications } = useNotificationStore();
  const [showNotifications, setShowNotifications] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  const displayName = user?.displayName ?? 'Dr. Julianne Vane';
  const initials = displayName
    .split(' ')
    .filter((p) => p.startsWith('Dr.') ? false : true)
    .slice(0, 2)
    .map((p) => p[0])
    .join('');

  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 z-30 flex items-center justify-between px-6 md:px-8 h-16 bg-white/80 glass-header shadow-sm">
      {/* Left: hamburger + search */}
      <div className="flex items-center gap-4 flex-1">
        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors"
          onClick={onMenuToggle}
          aria-label="Open menu"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>

        {/* Search */}
        <div className="relative w-full max-w-md hidden sm:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search clinical records..."
            className="w-full bg-slate-100 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>
      </div>

      {/* Right: actions + profile */}
      <div className="flex items-center gap-3 relative">
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`p-2 rounded-full transition-colors relative ${showNotifications ? 'bg-primary/10 text-primary' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <span className="material-symbols-outlined">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-4 h-4 bg-error text-white text-[9px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
          
          {showNotifications && (
            <NotificationPopover onClose={() => setShowNotifications(false)} />
          )}
        </div>
        <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors">
          <span className="material-symbols-outlined">settings</span>
        </button>

        <div className="h-8 w-px bg-slate-200 mx-1" />

        <div className="flex items-center gap-3 pl-1">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-on-surface">{displayName}</p>
            <p className="text-[10px] text-slate-500">Chief of Medicine</p>
          </div>
          <div className="w-9 h-9 rounded-full primary-gradient flex items-center justify-center text-white text-xs font-bold border-2 border-primary-fixed shadow-sm">
            {initials || 'DV'}
          </div>
        </div>
      </div>
    </header>
  );
};

import React from 'react';
import { useNotificationStore, type AppNotification } from '../../store/notificationStore';

interface NotificationPopoverProps {
  onClose: () => void;
}

export const NotificationPopover: React.FC<NotificationPopoverProps> = ({ onClose }) => {
  const { notifications, markAsRead, markAllAsRead } = useNotificationStore();

  const getIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'success': return 'check_circle';
      case 'warning': return 'warning';
      case 'error': return 'error';
      default: return 'info';
    }
  };

  const getIconColor = (type: AppNotification['type']) => {
    switch (type) {
      case 'success': return 'text-emerald-500';
      case 'warning': return 'text-amber-500';
      case 'error': return 'text-error';
      default: return 'text-primary';
    }
  };

  return (
    <div className="absolute top-12 right-0 w-80 sm:w-96 bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/10 z-50 overflow-hidden transition-all duration-200 origin-top-right">
      <div className="p-4 border-b border-outline-variant/10 flex items-center justify-between">
        <h4 className="font-headline font-bold text-on-surface">Clinical Alerts</h4>
        <div className="flex gap-2">
          <button 
            onClick={markAllAsRead}
            className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline"
          >
            Mark all read
          </button>
          <button onClick={onClose} className="sm:hidden text-outline hover:text-on-surface">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
      </div>

      <div className="max-h-[400px] overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-10 text-center">
            <span className="material-symbols-outlined text-outline/30 text-5xl mb-2">notifications_off</span>
            <p className="text-xs text-on-surface-variant font-medium">No alerts at this time</p>
          </div>
        ) : (
          <div className="divide-y divide-outline-variant/5">
            {notifications.map((n) => (
              <div 
                key={n.id}
                onClick={() => markAsRead(n.id)}
                className={`p-4 flex gap-4 hover:bg-surface-container-low transition-colors cursor-pointer ${!n.read ? 'bg-primary-fixed/5' : ''}`}
              >
                <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-surface-container ${getIconColor(n.type)}`}>
                  <span className="material-symbols-outlined text-[20px]">{getIcon(n.type)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-0.5">
                    <p className={`text-sm font-bold truncate ${!n.read ? 'text-on-surface' : 'text-on-surface-variant'}`}>
                      {n.title}
                    </p>
                    {!n.read && <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5" />}
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-2">
                    {n.message}
                  </p>
                  <p className="text-[10px] text-outline mt-2 font-medium uppercase tracking-wider">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-3 bg-surface-container-low/30 border-t border-outline-variant/10 text-center">
        <button className="text-[10px] font-bold text-outline uppercase tracking-widest hover:text-primary transition-colors">
          View full logs
        </button>
      </div>
    </div>
  );
};

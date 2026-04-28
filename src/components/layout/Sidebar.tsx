import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const navItems = [
  { to: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
  { to: '/analytics', icon: 'analytics', label: 'Analytics' },
  { to: '/patients', icon: 'person', label: 'Patients' },
  { to: '/reports', icon: 'description', label: 'Reports' },
];

interface SidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onClose }) => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const sidebarContent = (
    <aside className="flex flex-col h-full py-6 px-4 gap-2 bg-slate-50 w-64">
      {/* Logo */}
      <div className="px-2 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 primary-gradient flex items-center justify-center rounded-xl shadow-sm">
            <span className="material-symbols-outlined text-white text-lg">medical_services</span>
          </div>
          <div>
            <h1 className="text-base font-extrabold text-teal-800 font-headline tracking-tight">
              Atelier Health
            </h1>
            <p className="text-[10px] text-slate-500 font-medium">Clinical Portal</p>
          </div>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 space-y-1">
        {navItems.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ease-out ${
                isActive
                  ? 'text-teal-700 bg-white shadow-sm'
                  : 'text-slate-500 hover:text-teal-600 hover:bg-slate-100'
              }`
            }
          >
            <span className="material-symbols-outlined text-[20px]">{icon}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom actions */}
      <div className="mt-auto space-y-2">
        <button className="w-full primary-gradient text-white py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 hover:opacity-95 transition-opacity">
          <span className="material-symbols-outlined text-[16px]">add</span>
          New Patient
        </button>
        <div className="pt-3 border-t border-slate-200/50 space-y-1">
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-2 text-slate-500 hover:text-teal-600 transition-colors text-sm font-medium rounded-lg hover:bg-slate-100"
          >
            <span className="material-symbols-outlined text-[18px]">help</span>
            Support
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-slate-500 hover:text-error transition-colors text-sm font-medium rounded-lg hover:bg-red-50"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            Logout
          </button>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden md:block fixed left-0 top-0 h-screen w-64 z-40 border-r border-slate-200/20">
        {sidebarContent}
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="relative h-full w-64 shadow-ambient">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

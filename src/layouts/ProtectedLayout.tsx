import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Loader } from '../components/ui/Loader';

export const ProtectedLayout: React.FC = () => {
  const { user, initialized, init } = useAuthStore();

  useEffect(() => {
    init();
  }, []);

  if (!initialized) {
    return <Loader fullScreen color="#006068" label="Loading Clinical Portal…" />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

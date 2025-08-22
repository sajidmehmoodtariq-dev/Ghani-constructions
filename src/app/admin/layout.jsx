'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import AdminSidebar from '@/components/AdminSidebar';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      
      // If not logged in and not on login page, redirect to login
      if (!user && pathname !== '/admin/login') {
        router.push('/admin/login');
      }
      
      // If logged in and on login page, redirect to admin dashboard
      if (user && pathname === '/admin/login') {
        router.push('/admin');
      }
    });

    return () => unsubscribe();
  }, [router, pathname]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If not authenticated and not on login page, show loading
  if (!user && pathname !== '/admin/login') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If on login page, don't show sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Admin dashboard layout with sidebar
  return (
    <div className="flex">
      <AdminSidebar onLogout={handleLogout} />
      <div className="ml-64 flex-1">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}

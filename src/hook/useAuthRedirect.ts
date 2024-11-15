import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const useAuthRedirect = (isProtectedRoute: boolean = true) => {
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    const currentPath = window.location.pathname;

    // If we're on a protected route and there's no token, redirect to login
    if (isProtectedRoute && !token) {
      router.push('/auth/signin');
    }
    
    // If we're on the login page and there is a token, redirect to home
    if (!isProtectedRoute && token && currentPath === '/auth/signin') {
      router.push('/');
    }
  }, [isProtectedRoute, router]);
};
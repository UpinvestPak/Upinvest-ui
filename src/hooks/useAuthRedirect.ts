import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/redux/hooks';

export const useAuthRedirect = (isProtectedRoute: boolean) => {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isProtectedRoute && !isAuthenticated) {
      router.push('/auth/signin');
    } else if (!isProtectedRoute && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isProtectedRoute, router]);
};
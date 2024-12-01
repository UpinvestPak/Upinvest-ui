import { RootState } from "@/lib/redux/store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/redux/hooks";

export const useAuthRedirect = (isProtectedRoute: boolean) => {
  const router = useRouter();

  const { isAuthenticated, loading } = useAppSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (!loading) {
      if (isProtectedRoute && !isAuthenticated) {
        router.push("/auth/signin"); // Redirect to login if not authenticated
      } else if (!isProtectedRoute && isAuthenticated) {
        router.push("/dashboard"); // Redirect to dashboard if already authenticated
      }
    }
  }, [isAuthenticated, isProtectedRoute, loading, router]);

  return { isAuthenticated, loading }; // Return these values for conditional rendering
};

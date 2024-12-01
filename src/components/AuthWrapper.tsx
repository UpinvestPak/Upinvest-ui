// components/AuthWrapper.tsx
'use client'
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { ReactNode } from "react";

interface AuthWrapperProps {
  children: ReactNode;
  isProtected?: boolean;
}

export default function AuthWrapper({ 
  children, 
  isProtected = true 
}: AuthWrapperProps) {
  const { isAuthenticated, loading } = useAuthRedirect(isProtected);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
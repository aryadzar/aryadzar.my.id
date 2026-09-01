"use client";

import React, { createContext, useContext, ReactNode } from "react";
import {
  SessionProvider as NextAuthSessionProvider,
  useSession,
  signIn,
  signOut,
} from "next-auth/react";
import { toast } from "sonner";

interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

type AuthProvider = "google" | "github" | "keycloak";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  token: string | null;
  login: (provider?: AuthProvider) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProviderInner({ children }: AuthProviderProps) {
  const { data: session, status } = useSession();

  const isAuthenticated = !!session;
  const isLoading = status === "loading";
  const user = session?.user
    ? {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      }
    : null;
  const token = (session?.user as any)?.accessToken || null;

  const login = async (provider: AuthProvider = "keycloak") => {
    try {
      await signIn(provider, {
        callbackUrl: `${window.location.href}`,
      });
    } catch (error) {
      console.error("Login failed", error);
      toast.error("Login failed. Please try again.");
      throw error;
    }
  };

  const logout = async () => {
    try {
      const idToken = (session?.user as any)?.idToken;
      // Sign out of NextAuth (clears the session cookie)
      await signOut({ redirect: false });
      
      // Redirect to Keycloak's logout endpoint if we have the idToken
      if (idToken) {
        const keycloakIssuer = "https://auth.aryadzar.my.id/realms/aryadzar-aplication";
        const logoutUrl = `${keycloakIssuer}/protocol/openid-connect/logout?id_token_hint=${idToken}&post_logout_redirect_uri=${encodeURIComponent(window.location.href)}`;
        window.location.href = logoutUrl;
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout failed. Please try again.");
      throw error;
    }
  };

  const value: AuthContextType = {
    isAuthenticated,
    isLoading,
    user,
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  return (
    <NextAuthSessionProvider>
      <AuthProviderInner>{children}</AuthProviderInner>
    </NextAuthSessionProvider>
  );
};

"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Rutas públicas (no requieren sesión)
  const publicRoutes = ["/login", "/register", "/forgot-password"];

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await axiosInstance.get("/user");
        setUser(response.data);
      } catch (err) {
        setUser(null);
        // Si no estamos en una ruta pública, redirige al login
        if (!publicRoutes.includes(pathname)) {
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [pathname, router]);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

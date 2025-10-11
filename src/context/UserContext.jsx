"use client";
import { createContext, useContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode"; // el nombre puede ser cualquiera

const UserContext = createContext(null);
export const useUser = () => useContext(UserContext);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper para refrescar token
  const refreshToken = async () => {
    try {
      const res = await fetch("http://localhost:3001/auth/refresh", {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) return null;

      const data = await res.json();
      sessionStorage.setItem("access_token", data.accessToken);
      return data.accessToken;
    } catch (err) {
      console.error("Error refrescando token:", err);
      return null;
    }
  };

  // Wrapper para fetch con refresh automático
  const fetchWithAuth = async (url, options = {}) => {
    let token = sessionStorage.getItem("access_token");

    // Revisar expiración del token
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;
        if (decoded.exp - now < 60) {
          // Menos de 60s para expirar → refrescar
          token = await refreshToken();
        }
      } catch (err) {
        console.warn("Token inválido, refrescando...", err);
        token = await refreshToken();
      }
    }

    const headers = {
      ...options.headers,
      Authorization: token ? `Bearer ${token}` : undefined,
      Accept: "application/json",
    };

    return fetch(url, { ...options, headers, credentials: "include" });
  };

  // Obtener info del usuario
  const fetchUser = async () => {
    try {
      const res = await fetchWithAuth("http://localhost:3001/users/me");

      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else if (res.status === 401) {
        console.warn("Usuario no autorizado, limpiar sesión");
        setUser(null);
        sessionStorage.removeItem("access_token");
      }
    } catch (err) {
      console.error("Error obteniendo usuario:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();

    // Intervalo para refrescar token cada 5 min (opcional)
    const interval = setInterval(async () => {
      const token = sessionStorage.getItem("access_token");
      if (token) await refreshToken();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, loading, fetchUser, fetchWithAuth }}
    >
      {children}
    </UserContext.Provider>
  );
}

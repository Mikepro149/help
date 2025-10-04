"use client";
import { createContext, useContext, useState, useEffect } from "react";

// Creamos el contexto
const UserContext = createContext(null);

// Hook para consumirlo fácil
export const useUser = () => useContext(UserContext);

// Provider
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulación: obtener usuario desde API o localStorage
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/user", {
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (err) {
        console.error("Error obteniendo usuario:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}

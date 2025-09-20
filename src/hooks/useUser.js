// hooks/useUser.js
import { useState, useEffect, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";

export function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const publicRoutes = useMemo(
    () => ["/login", "/register", "/forgotpassword"],
    []
  );

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch("http://localhost:8000/api/user", {
          method: "GET",
          headers: { Accept: "application/json" },
          credentials: "include",
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);

          // GuestGuard: Si está logueado y en ruta pública, redirigir
          if (publicRoutes.includes(pathname)) {
            const { role } = userData;
            const redirectUrl =
              role === "admin"
                ? "/inicio_ad"
                : role === "support"
                ? "/inicio_ti"
                : role === "on_site_support"
                ? "/inicio_situ"
                : "/inicio";
            router.replace(redirectUrl);
          }
        } else {
          setUser(null);

          // AuthGuard: Si no está logueado y NO está en ruta pública
          if (!publicRoutes.includes(pathname)) {
            router.replace("/login");
          }
        }
      } catch (error) {
        setUser(null);
        if (!publicRoutes.includes(pathname)) {
          router.replace("/login");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
    const interval = setInterval(fetchUser, 10000); // 10 segundos // 60s en lugar de 30s // Verificar cada 30s
    return () => clearInterval(interval);
  }, [pathname, router, publicRoutes]);

  return { user, loading, setUser };
}

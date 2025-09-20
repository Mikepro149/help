// middleware.js
import { NextResponse } from "next/server";

async function verifyToken(request) {
  try {
    // Obtener TODAS las cookies del request
    const cookieHeader = request.headers.get("cookie");
    console.log("🍪 Cookies enviadas al backend:", cookieHeader);

    if (!cookieHeader || !cookieHeader.includes("access_token")) {
      console.log("❌ No hay access_token en las cookies");
      return null;
    }

    const response = await fetch("http://localhost:8000/api/user", {
      headers: {
        Accept: "application/json",
        // Reenviar TODAS las cookies al backend
        ...(cookieHeader && { Cookie: cookieHeader }),
      },
    });

    console.log("📡 Response status:", response.status);
    console.log("📡 Response ok:", response.ok);

    if (!response.ok) {
      console.log("❌ Token inválido o expirado");
      return null;
    }

    const userData = await response.json();
    console.log("✅ Usuario autenticado:", userData);
    return userData;
  } catch (error) {
    console.error("❌ Error verificando token:", error);
    return null;
  }
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  console.log("🛡️ Middleware ejecutándose en:", pathname);

  // Rutas públicas
  const publicRoutes = ["/login", "/register", "/forgotpassword"];

  // Rutas protegidas
  const protectedRoutes = [
    "/inicio",
    "/inicio_ad",
    "/inicio_ti",
    "/inicio_situ",
    "/dashboard",
    "/manager",
    "/reports",
  ];

  // Si es ruta pública, permitir acceso
  if (publicRoutes.includes(pathname)) {
    console.log("🟢 Ruta pública permitida:", pathname);
    return NextResponse.next();
  }

  // Si es la raíz, redirigir a login
  if (pathname === "/") {
    console.log("🔄 Redirigiendo desde raíz a /login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Para rutas protegidas, verificar autenticación
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    console.log("🔒 Verificando acceso a ruta protegida:", pathname);
    const user = await verifyToken(request);

    // Si no hay usuario válido, redirigir a login
    if (!user) {
      console.log("❌ Usuario no autenticado, redirigiendo a /login");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    console.log("✅ Usuario autenticado con rol:", user.role);

    // RoleGuard - verificar permisos por rol
    const roleRoutes = {
      "/inicio_ad": "admin",
      "/inicio_ti": "support",
      "/inicio_situ": "on_site_support",
      "/manager": ["admin", "manager", "manager_client"],
    };

    for (const [route, allowedRoles] of Object.entries(roleRoutes)) {
      if (pathname.startsWith(route)) {
        const roles = Array.isArray(allowedRoles)
          ? allowedRoles
          : [allowedRoles];
        console.log(
          `🎭 Verificando rol para ${route}:`,
          roles,
          "vs",
          user.role
        );

        if (!roles.includes(user.role)) {
          console.log("❌ Rol no autorizado, redirigiendo a /login");
          return NextResponse.redirect(new URL("/login", request.url));
        }
        console.log("✅ Rol autorizado");
      }
    }
  }

  console.log("✅ Acceso permitido a:", pathname);
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)"],
};

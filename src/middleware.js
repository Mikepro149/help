// middleware.js
import { NextResponse } from "next/server";

async function verifyToken(request) {
  try {
    const cookieHeader = request.headers.get("cookie") || "";
    
    if (!cookieHeader || !cookieHeader.includes("access_token")) {
      console.log(">>> DEBUG: no access_token in cookies");
      return null;
    }

    // 🔧 DECODIFICAR LA COOKIE
    const decodedCookieHeader = decodeURIComponent(cookieHeader);

    // Extraer el token específico
    const tokenMatch = decodedCookieHeader.match(/access_token=([^;]+)/);
    const token = tokenMatch ? tokenMatch[1] : null;

    if (!token) {
      console.log(">>> DEBUG: No se pudo extraer el token");
      return null;
    }

    const response = await fetch("http://localhost:8000/api/user", {
      headers: {
        Accept: "application/json",
        Cookie: decodedCookieHeader,
        // También prueba con Authorization header
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(
      ">>> DEBUG fetch to backend status:",
      response.status,
      "ok:",
      response.ok
    );

    if (!response.ok) {
      console.log(">>> DEBUG: Backend authentication failed");
      return null;
    }

    const text = await response.text();

    try {
      const parsed = JSON.parse(text);
      return parsed.user ? parsed.user : parsed;
    } catch (e) {
      console.error(">>> DEBUG JSON parse error:", e);
      return null;
    }
  } catch (error) {
    console.error(">>> DEBUG Error verifying token:", error);
    return null;
  }
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  console.log("🔍 Middleware - ruta:", pathname);

  // Excluir rutas estáticas explícitamente
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // archivos estáticos (css, js, images, etc.)
  ) {
    return NextResponse.next();
  }

  const publicRoutes = ["/login", "/register", "/forgotpassword"];
  if (publicRoutes.includes(pathname)) {
    console.log("🔍 Verificando si usuario ya está logueado en ruta pública:", pathname);
    
    // Verificar si el usuario ya está autenticado
    const user = await verifyToken(request);
    
    if (user) {
      console.log(`🔄 Usuario ${user.name} (${user.role}) ya logueado, redirigiendo desde ${pathname}`);
      
      // Redirigir según el rol del usuario
      const roleRedirects = {
        "admin": "/inicio_ad",
        "support": "/inicio_ti", 
        "on_site_support": "/inicio_situ",
        "manager": "/inicio_manager",
        "manager_worker": "/inicio_worker"
      };
      
      const redirectUrl = roleRedirects[user.role] || "/inicio_ti"; // fallback
      console.log(`➡️ Redirigiendo a: ${redirectUrl}`);
      
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }
    
    console.log("🟢 Usuario no logueado, permitiendo acceso a:", pathname);
    return NextResponse.next();
  }

  if (pathname === "/") {
    console.log("🔄 Redirigiendo raíz → /login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const roleRoutes = {
    "/inicio_ad": ["admin"],
    "/inicio_ti": ["support"],
    "/inicio_situ": ["on_site_support"],
    "/inicio_manager": ["manager"],
    "/inicio_worker": ["manager_worker"],
  };

  const matchedRoute = Object.keys(roleRoutes).find((route) =>
    pathname.startsWith(route)
  );

  if (matchedRoute) {
    console.log("🔒 Verificando acceso a:", matchedRoute);

    const user = await verifyToken(request);

    if (!user) {
      console.log("❌ Usuario no autenticado, redirigiendo a /login");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    console.log(`✅ Usuario ${user.name} (${user.role}) accediendo a ${pathname}`);

    const allowedRoles = roleRoutes[matchedRoute];
    
    if (!allowedRoles.includes(user.role)) {
      console.log(
        `🚫 Rol '${user.role}' NO autorizado para '${matchedRoute}'`
      );
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return NextResponse.next();
}

// Configuración mejorada para Next.js 15
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
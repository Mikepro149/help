// middleware.js
import { NextResponse } from "next/server";

async function verifyUser(request) {
  try {
    const cookieHeader = request.headers.get("cookie") || "";

    if (!cookieHeader.includes("laravel_session")) {
      console.log(">>> DEBUG: No laravel_session cookie presente");
      return null;
    }

    const response = await fetch("http://localhost:8000/api/user", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Cookie: cookieHeader, // 🔥 reenviamos la cookie tal cual
      },
    });

    console.log(">>> DEBUG fetch /api/user status:", response.status);

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.user || null;
  } catch (error) {
    console.error(">>> DEBUG Error en verifyUser:", error);
    return null;
  }
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  console.log("🔍 Middleware - ruta:", pathname);

  // Excluir assets, imágenes y APIs internas de Next
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Rutas públicas
  const publicRoutes = ["/login", "/register", "/forgotpassword"];
  if (publicRoutes.includes(pathname)) {
    const user = await verifyUser(request);

    if (user) {
      console.log(
        `🔄 Usuario ${user.name} (${user.role}) ya logueado, redirigiendo`
      );

      const roleRedirects = {
        admin: "/dashboard/home",
        support: "/dashboard/home",
        on_site_support: "/dashboard/home",
        manager: "/dashboard/home",
        manager_worker: "/dashboard/home",
      };

      return NextResponse.redirect(
        new URL(roleRedirects[user.role] || "/dashboard/home", request.url)
      );
    }

    return NextResponse.next();
  }

  // Ruta raíz
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 🔒 Rutas protegidas por rol
  const roleRoutes = {
    "/dashboard/home": [
      "admin",
      "support",
      "on_site_support",
      "manager",
      "manager_worker",
    ],
  };

  const matchedRoute = Object.keys(roleRoutes).find((route) =>
    pathname.startsWith(route)
  );

  if (matchedRoute) {
    const user = await verifyUser(request);

    if (!user) {
      console.log("❌ No autenticado → redirect /login");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const allowedRoles = roleRoutes[matchedRoute];
    if (!allowedRoles.includes(user.role)) {
      console.log(`🚫 Rol ${user.role} no autorizado en ${pathname}`);
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    console.log(`✅ ${user.name} (${user.role}) accede a ${pathname}`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

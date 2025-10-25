import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const publicRoutes = ["/login", "/forgotpassword", "/unauthorized"];
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const protectedRoutes = ["/dashboard"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const refreshToken = request.cookies.get("refresh_token")?.value;

  // Si está en ruta pública y tiene token → redirigir a dashboard
  if (isPublicRoute && refreshToken) {
    return NextResponse.redirect(new URL("/dashboard/home", request.url));
  }

  // Si está en ruta protegida y NO tiene token → redirigir a login
  if (isProtectedRoute && !refreshToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Validación de permisos por rol
  if (isProtectedRoute && refreshToken) {
    try {
      const payload = JSON.parse(atob(refreshToken.split(".")[1]));
      const role = payload.role;

      // Define rutas permitidas por rol
      const rolePermissions = {
        ADMIN: ["/dashboard"], // Acceso total
        SUPPORT_TI: [
          "/dashboard/home",
          "/dashboard/tickets",
          "/dashboard/clients",
        ],
        SUPPORT_SITU: ["/dashboard/home", "/dashboard/tickets"],
        MANAGER: [
          "/dashboard/home",
          "/dashboard/reports",
          "/dashboard/analytics",
        ],
        MANAGER_WORKER: ["/dashboard/home", "/dashboard/tasks"],
      };

      const allowedRoutes = rolePermissions[role] || [];

      // ADMIN tiene acceso a todo
      if (role !== "ADMIN") {
        const hasAccess = allowedRoutes.some((route) =>
          pathname.startsWith(route)
        );

        if (!hasAccess) {
          return NextResponse.redirect(new URL("/unauthorized", request.url));
        }
      }
    } catch (err) {
      console.error("Error validando token:", err);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

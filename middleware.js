import { NextResponse } from "next/server";

// Función para verificar token con Laravel
async function verifyToken(token) {
  console.log("Token in middleware:", token);
  try {
    const response = await fetch("http://localhost:8000/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    console.log("Verify response:", response.status); // DEBUG

    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    return null;
  }
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token =
    request.cookies.get("sanctum_token")?.value ||
    request.headers.get("authorization")?.replace("Bearer ", "");

  console.log("All cookies:", request.cookies.getAll());
  console.log("Pathname:", pathname);
  console.log("Token found:", !!token);

  // Rutas que requieren autenticación
  const publicRoutes = ["/login", "/register", "/forgot-password"];

  // Rutas de admin (requieren rol admin)
  const adminRoutes = ["/inicio_ad"];

  // Rutas de manager (requieren rol manager o admin)
  const managerRoutes = ["/manager", "/reports/advanced"];

  // Para rutas NO públicas, verificar autenticación completa
  if (!publicRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    // AGREGAR ESTO:
    const user = await verifyToken(token);
    if (!user) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // GuestGuard - Redirigir usuarios autenticados de rutas de invitados
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    if (token) {
      const user = await verifyToken(token);
      if (user) {
        return NextResponse.redirect(new URL("/inicio", request.url));
      }
    }
  }

  // RoleGuard - Verificar permisos de admin
  if (adminRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const user = await verifyToken(token);
    if (!user || user.role !== "admin") {
      return NextResponse.redirect(new URL("/inicio", request.url));
    }
  }

  // RoleGuard - Verificar permisos de manager
  if (managerRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const user = await verifyToken(token);
    if (!user || !["admin", "manager"].includes(user.role)) {
      return NextResponse.redirect(new URL("/inicio", request.url));
    }
  }

  return NextResponse.next();
}

// Configurar en qué rutas se ejecuta el middleware
export const config = {
  matcher: [
    // Excluir archivos estáticos y API routes
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

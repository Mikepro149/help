// middleware.js
import { NextResponse } from "next/server";

async function verifyToken(request) {
  try {
    // Ojo: usa tu dominio real del backend (no localhost si subes a producción)
    const response = await fetch("http://localhost:8000/api/user", {
      headers: { Accept: "application/json" },
      credentials: "include", // muy importante para enviar la cookie HttpOnly
    });

    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("Error verificando token:", error);
    return null;
  }
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("sanctum_token")?.value;

  // Rutas públicas
  const publicRoutes = ["/login", "/register", "/forgot-password"];

  // Rutas protegidas
  const protectedRoutes = [
    "/",
    "/dashboard",
    "/inicio_ad",
    "/manager",
    "/reports/advanced",
  ];

  // GuestGuard → si el user ya tiene sesión y entra a login/register
  if (publicRoutes.includes(pathname) && token) {
    const user = await verifyToken(request);
    if (user) {
      return NextResponse.redirect(new URL("/inicio", request.url));
    }
  }

  // AuthGuard → si la ruta es protegida y no hay token
  if (protectedRoutes.includes(pathname) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Si hay token → verificamos validez y rol
  if (token) {
    const user = await verifyToken(request);

    // Token inválido → fuera
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // RoleGuard admin
    if (pathname.startsWith("/inicio_ad") && user.role !== "admin") {
      return NextResponse.redirect(new URL("/inicio", request.url));
    }

    // RoleGuard manager
    if (pathname.startsWith("/manager") && !["admin", "manager"].includes(user.role)) {
      return NextResponse.redirect(new URL("/inicio", request.url));
    }
  }

  return NextResponse.next();
}

// Configurar qué rutas ejecutarán el middleware
export const config = {
  matcher: [
    // Excluir archivos estáticos y API routes
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

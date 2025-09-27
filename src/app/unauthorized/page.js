"use client";

import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#f9f9f9",
        color: "#333",
        fontFamily: "sans-serif",
        textAlign: "center",
        padding: 20,
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: 16 }}>🚫 Acceso denegado</h1>
      <p style={{ fontSize: "1.2rem", marginBottom: 24 }}>
        No tienes permisos para ver esta página.  
        Contacta con un administrador si crees que es un error.
      </p>

      <Link
        href="/"
        style={{
          padding: "12px 24px",
          background: "#FF9500",
          borderRadius: 8,
          color: "white",
          fontWeight: "600",
          textDecoration: "none",
          transition: "background 0.2s",
        }}
      >
        Volver al inicio
      </Link>
    </div>
  );
}

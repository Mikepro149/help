"use client";
import { useRouter } from "next/navigation";
import React from "react";
import {
  FaHome,
  FaTicketAlt,
  FaUsers,
  FaBoxOpen,
  FaClipboardList,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

const sections = [
  {
    name: "Home",
    href: "/inicio_ad",
    icon: <FaHome style={{ marginRight: 12 }} />,
  },
  {
    name: "Tickets",
    href: "/boletos_ad",
    icon: <FaTicketAlt style={{ marginRight: 12 }} />,
  },
  {
    name: "Clientes",
    href: "/cliente_ad",
    icon: <FaUsers style={{ marginRight: 12 }} />,
  },
  {
    name: "Empresa",
    href: "/empresa_ad",
    icon: <FaBoxOpen style={{ marginRight: 12 }} />,
  },
  {
    name: "Plan de Soporte",
    href: "/planSoporte_ad",
    icon: <FaClipboardList style={{ marginRight: 12 }} />,
  },
];

const Sidebar = ({ onProfile }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        credentials: "include", // MUY importante para mandar cookies
      });

      router.push("/login"); // redirige al login después
    } catch (error) {
      console.error("Error cerrando sesión:", error);
    }
  };

  return (
    <aside
      style={{
        width: 300,
        minHeight: "100vh",
        background: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "2px 0 8px rgba(0,0,0,0)",
      }}
    >
      {/* Cuadrado naranja para foto/logo */}
      <div
        style={{
          width: 300,
          height: 250,
          background: "#FF9500",
          margin: "0px 0 24px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Aquí va la foto de perfil o logo */}
        <span style={{ color: "white", fontWeight: "bold", fontSize: 32 }}>
          Logo
        </span>
      </div>

      {/* Secciones */}
      <nav style={{ width: "100%", flex: 1 }}>
        {sections.map((section) => (
          <a
            key={section.name}
            href={section.href}
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              margin: "0 auto 12px auto",
              padding: "16px 20px",
              background: "white",
              color: "#333",
              textDecoration: "none",
              fontWeight: 500,
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              transition: "background 0.2s",
            }}
          >
            {section.icon}
            {section.name}
          </a>
        ))}
      </nav>

      {/* Botones de perfil y cerrar sesión */}
      <div style={{ width: "90%", marginBottom: 24 }}>
        <button
          onClick={onProfile}
          style={{
            width: "100%",
            padding: "12px 0",
            marginBottom: 12,
            background: "#fff",
            borderRadius: 10,
            color: "black",
            fontWeight: 600,
            cursor: "pointer",
            fontSize: 16,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <FaUserCircle style={{ marginRight: 8 }} />
          Perfil
        </button>
        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            padding: "12px 0",
            background: "white",
            border: "none",
            color: "black",
            fontWeight: 600,
            cursor: "pointer",
            fontSize: 16,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <FaSignOutAlt style={{ marginRight: 8 }} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

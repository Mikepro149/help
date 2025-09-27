"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  FaHome,
  FaTicketAlt,
  FaUsers,
  FaBoxOpen,
  FaClipboardList,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

// 🎯 CONFIGURACIÓN DE MENÚS POR ROL

// 📝 Para agregar más roles:
// Solo añade en menuConfig:
// [
//   { name: "Dashboard", href: "/inicio_manager", icon: <FaHome style={{ marginRight: 12 }} /> },
//   más opciones...
// ],
const menuConfig = {
  admin: [
    { name: "Home", href: "/inicio_ad", icon: <FaHome style={{ marginRight: 12 }} /> },
    { name: "Tickets", href: "/boletos_ad", icon: <FaTicketAlt style={{ marginRight: 12 }} /> },
    { name: "Clientes", href: "/cliente_ad", icon: <FaUsers style={{ marginRight: 12 }} /> },
    { name: "Empresa", href: "/empresa_ad", icon: <FaBoxOpen style={{ marginRight: 12 }} /> },
    { name: "Plan de Soporte", href: "/planSoporte_ad", icon: <FaClipboardList style={{ marginRight: 12 }} /> },
  ],
  support: [
    { name: "Home", href: "/inicio_ti", icon: <FaHome style={{ marginRight: 12 }} /> },
    { name: "Tickets", href: "/boletos_ti", icon: <FaTicketAlt style={{ marginRight: 12 }} /> },
    { name: "Clientes", href: "/cliente_ti", icon: <FaUsers style={{ marginRight: 12 }} /> },
    { name: "Productos", href: "/productos_ti", icon: <FaBoxOpen style={{ marginRight: 12 }} /> },
    { name: "Soporte tecnico", href: "/soporte-tecnico", icon: <FaClipboardList style={{ marginRight: 12 }} /> },
    { name: "Empresa", href: "/emp_ti_emp", icon: <FaClipboardList style={{ marginRight: 12 }} /> },
  ],
  on_site_support: [
    { name: "Home", href: "/inicio_situ", icon: <FaHome style={{ marginRight: 12 }} /> },
    { name: "Tickets", href: "/empresa_situ", icon: <FaTicketAlt style={{ marginRight: 12 }} /> },
    { name: "Clientes", href: "/boletos_situ", icon: <FaUsers style={{ marginRight: 12 }} /> },
  ],
  manager: [
    { name: "Home", href: "/inicio_manager", icon: <FaHome style={{ marginRight: 12 }} /> },
    // Agregar menús específicos para manager
  ],
  manager_worker: [
    { name: "Home", href: "/inicio_worker", icon: <FaHome style={{ marginRight: 12 }} /> },
    // Agregar menús específicos para manager_worker
  ],
};

const Sidebar = ({ onProfile }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  // 🔍 OBTENER USUARIO ACTUAL
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/user", {
          credentials: "include",
        });
        
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error("Error obteniendo usuario:", error);
      }
    };

    getCurrentUser();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        credentials: "include",
      });
      router.push("/login");
    } catch (error) {
      console.error("Error cerrando sesión:", error);
    }
  };

  // Loading state
  if (!user) {
    return (
      <aside style={{ width: 300, minHeight: "100vh", background: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div>Cargando...</div>
      </aside>
    );
  }

  // Obtener menús para el rol del usuario
  const sections = menuConfig[user.role] || [];

  // Mapeo de roles para mostrar nombres amigables
  const roleNames = {
    admin: "Administrador",
    support: "Soporte TI", 
    on_site_support: "Soporte In-Situ",
    manager: "Manager",
    manager_worker: "Trabajador"
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
      {/* 👤 INFO DEL USUARIO */}
      <div
        style={{
          width: 300,
          height: 250,
          background: "#FF9500",
          margin: "0px 0 24px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          padding: "20px",
          textAlign: "center"
        }}
      >
        <div style={{ 
          background: "rgba(255,255,255,0.2)", 
          borderRadius: "50%", 
          width: 80, 
          height: 80, 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          marginBottom: 15
        }}>
          <FaUserCircle style={{ fontSize: 50, color: "white" }} />
        </div>
        
        <h3 style={{ 
          color: "white", 
          fontWeight: "bold", 
          fontSize: 18,
          margin: "0 0 5px 0"
        }}>
          {user.name}
        </h3>
        
        <span style={{ 
          color: "rgba(255,255,255,0.8)", 
          fontSize: 14,
          background: "rgba(255,255,255,0.1)",
          padding: "4px 12px",
          borderRadius: 12
        }}>
          {roleNames[user.role] || user.role}
        </span>
      </div>

      {/* 📋 MENÚS DINÁMICOS */}
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

      {/* 🔧 BOTONES DE PERFIL Y LOGOUT */}
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
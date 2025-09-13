import React from "react";
import Sidebar from "@/components/sidebar/sidebar";

export default function ClienteLayout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw' }}>
  <Sidebar />
      <main style={{ flex: 1, background: '#f7f7f7', minHeight: '100vh', overflow: 'auto' }}>
        {children}
      </main>
    </div>
  );
}

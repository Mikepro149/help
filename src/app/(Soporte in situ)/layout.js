"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar_situ from "@/components/sidebar/sidebar_situ"; // este es el sidebar real
import React from "react";

export default function AdminLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen -flex w-screen">
        <Sidebar_situ />
        <main className="flex-1 p-6 bg-gray-100 overflow-auto">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}

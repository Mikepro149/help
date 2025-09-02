"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar_ti from "@/components/sidebar/sidebar_ti"; // este es el sidebar real
import React from "react";

export default function AdminLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen -flex w-screen">
        <Sidebar_ti />
        <main className="flex-1 p-6 bg-gray-100">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}

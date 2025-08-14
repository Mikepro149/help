import { SidebarProvider } from "@/components/ui/sidebar";
import SidebarAdmin from "@/app/(Admin)/sidebar/page";
import React from "react";

export default function AdminLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen ">
        <SidebarAdmin />
        <main className="flex-1 p-6 bg-gray-100 h-full">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
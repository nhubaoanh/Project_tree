'use client';

import Sidebar from "@/src/components/Sidebar";
import Header from "@/src/components/Header";
import { SidebarProvider } from "@/src/context/SidebarContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="flex h-screen overflow-hidden bg-gradient-to-br from-amber-50 to-red-50">
          <main className="flex-1 overflow-auto p-6 bg-white/90 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
      </div>
  );
}

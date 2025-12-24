"use client";

import Sidebar from "@/components/ui/Sidebar";
import Header from "@/components/ui/Header";
import { SidebarProvider, useSidebar } from "@/context/SidebarContext";
import Image from "next/image";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import RouteGuard from "@/components/auth/RouteGuard";

function MainContent({ children }: { children: React.ReactNode }) {
  const { isSidebarOpen } = useSidebar();

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      <Header />
      <main className="flex-1 overflow-auto relative">
        {/* Trống đồng - căn giữa theo content area */}
        <div 
          className={`fixed inset-0 flex items-center justify-center pointer-events-none z-0 transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-20"
          }`}
        >
          <Image
            src="/images/trongdong.png"
            alt="Trống đồng"
            width={600}
            height={600}
            className={`object-contain transition-all duration-500 ${
              isSidebarOpen ? "opacity-50 scale-100" : "opacity-70 scale-110"
            }`}
          />
        </div>
        <div className="relative z-10 p-4 h-full">{children}</div>
      </main>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <RouteGuard>
        <SidebarProvider>
          <div className="flex h-screen w-full bg-[#FCF9E3]">
            <Sidebar />
            <MainContent>{children}</MainContent>
          </div>
        </SidebarProvider>
      </RouteGuard>
    </QueryClientProvider>
  );
}

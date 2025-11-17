'use client';
import Sidebar from "@/components/ui/Sidebar";
import Header from "@/components/ui/Header";
import { SidebarProvider } from "@/context/SidebarContext";
import Image from "next/image";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-[#FCF9E3]">
        <Sidebar />
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <Header />
          <main className="flex-1 overflow-auto relative">
            <div className="fixed top-18 left-[17%] inset-0 flex items-center justify-center pointer-events-none z-0">
              <Image
                src="/images/trongdong.png"
                alt="Trống đồng"
                width={700}
                height={700}
                className="object-contain opacity-70"
              />
            </div>
            <div className="relative z-10 p-4 h-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
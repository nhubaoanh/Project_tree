import Header from "@/src/components/Header";
import Sidebar from "@/src/components/Sidebar";
import "./globals.css";
import { SidebarProvider } from "@/src/context/SidebarContext";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <div className="flex h-screen overflow-hidden bg-[#FCF9E3]">
            {/* Sidebar */}
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
              <div className="max-w-7xl mx-auto w-full">
                <Header />

                <main className="h-screen p-4 bg-[#FCF9E3] shadow-[0 0 0 0.25] rounded-md">
                  {children}
                </main>
                {/* Main với nền trống đồng */}
                {/* <main className="relative flex-1 overflow-auto p-6">
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                    <Image
                      src="/images/trongdong.png"
                      alt="Trống đồng văn hóa Đông Sơn"
                      width={520}
                      height={520}
                      className="object-contain opacity-10 select-none"
                      priority
                      unoptimized
                    />
                  </div>
                  <div className="relative z-10 max-w-7xl mx-auto bg-[#FCF9E3]/95 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-amber-200">
                    {children}
                  </div>
                </main> */}
              </div>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}

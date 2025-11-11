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
                <main className="relative h-screen p-4 bg-[#FCF9E3] shadow-[0_0_0_0.25] rounded-md overflow-auto">
                  {/* Ảnh nền trống đồng căn giữa */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                    <Image
                      src="/images/trongdong.png"
                      alt="Trống đồng"
                      width={700}
                      height={700}
                      className="object-contain opacity-70"
                    />
                  </div>

                  {/* Nội dung chính */}
                  <div className="">{children}</div>
                </main>
              </div>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}

import { ToastProvider } from "@/service/useToas";
import "./globals.css";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#FCF9E3] h-screen">
        <ToastProvider>
          <div className="fixed top-18 left-[17%] inset-0 flex items-center justify-center pointer-events-none z-0">
                        <Image
                          src="/images/trongdong.png"
                          alt="Trống đồng"
                          width={700}
                          height={700}
                          className="object-contain opacity-70"
                        />
          </div>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}

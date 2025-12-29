import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/service/useToas";
import {
  Dancing_Script,
} from "next/font/google";
import Providers from "@/utils/providers";

// ============ FONT THƯ PHÁP / CALLIGRAPHY ============

// Dancing Script - Thư pháp mềm mại, bay bổng
const dancing = Dancing_Script({
  subsets: ["vietnamese", "latin"],
  variable: "--font-dancing",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});


export const metadata: Metadata = {
  title: "Gia Phả Việt",
  description: "Hệ thống quản lý gia phả dòng họ Việt Nam",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Gộp tất cả font variables
  const fontVariables = [
    dancing.variable,
  ].join(" ");

  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${fontVariables} font-body antialiased`}>
        <ToastProvider>
          <Providers>{children}</Providers>
        </ToastProvider>
      </body>
    </html>
  );
}
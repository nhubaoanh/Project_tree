import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/service/useToas";
import { Dancing_Script } from "next/font/google";
import { Allura  } from "next/font/google";

const dancing = Dancing_Script({
  subsets: ["vietnamese", "latin"],
  variable: "--font-dancing",
  weight: ['400', '700'], // Thêm các weight bạn cần
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Gia Phả Việt",
  description: "Gia Phả Việt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dancing.className} text-xl`}>
        <ToastProvider>
          <div className="fixed top-4 right-4 z-50">
            {/* <Toaster richColors position="top-right" /> */}
          </div>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
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
      <body className="bg-[#FCF9E3] h-screen family-tree-title">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}

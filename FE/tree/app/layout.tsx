import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#FCF9E3] h-screen">
        {children}
      </body>
    </html>
  );
}

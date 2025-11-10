// import Header from "./components/Header";
// import Sidebar from "./components/Sidebar";
// import "./globals.css";
// import { SidebarProvider } from "./src/context/SidebarContext";

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body>
//         <SidebarProvider>
//           <div className="flex h-screen overflow-hidden">
//             {/* Sidebar */}
//             <Sidebar />
//             <div className="flex flex-col flex-1 overflow-hidden">
//               <div className="max-w-7xl mx-auto w-full">
//                 <Header />
//                 <main className="h-screen p-4 bg-[#eeeeee] shadow-[0 0 0 0.25] rounded-md">
//                   {children}
//                 </main>
//               </div>
//             </div>
//           </div>
//         </SidebarProvider>
//       </body>
//     </html>
//   );
// }

// app/layout.tsx
import './globals.css';
import { SidebarProvider } from "./src/context/SidebarContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="antialiased">
        <SidebarProvider>
          {children}
        </SidebarProvider>
      </body>
    </html>
  );
}

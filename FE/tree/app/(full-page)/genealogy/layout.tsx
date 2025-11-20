"use client";
import { queryClient } from "@/lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";

export default function GenealogyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </div>
  );
}
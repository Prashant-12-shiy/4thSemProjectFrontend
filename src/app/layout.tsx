import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { QueryProvider } from "@/context/QueryProvider"; // This is correct

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Student Management System",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <QueryProvider>
        <body className={inter.className}>
          {children}
          <Toaster position="top-center" />
        </body>
      </QueryProvider>
    </html>
  );
}

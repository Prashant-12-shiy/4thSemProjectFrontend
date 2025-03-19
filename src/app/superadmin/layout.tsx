import Sidebar from "@/components/superadminComponents/Sidebar";
import { StudentProvider } from "@/context/StudentContext";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StudentProvider>
      <div className="flex justify-between">
        {/* Sidebar (Visible on md and above) */}
        <div className="md:block flex-shrink-0">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto max-w-[75%] max-md:max-w-full flex flex-col ">
          <div className="px-10 mt-5 max-md:px-4">
            <div className="border border-black rounded-sm py-5 px-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    </StudentProvider>
  );
}
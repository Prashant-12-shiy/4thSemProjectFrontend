import Sidebar from "@/components/studentComponents/SideBar";
import React from "react";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-10 mt-5 max-md:px-4 justify-start">
      <Sidebar/>
      <div className="my-4 border border-black rounded-sm py-5 px-4">{children}</div>
    </div>
  )}
import Sidebar from "@/components/teacherComponents/Sidebar";
import React from "react";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-10 mt-5 max-md:px-4 justify-start">
      <Sidebar/>
      <div className="my-4 border border-black rounded-sm py-5 px-4">{children}</div>
    </div>
  ) 
    
}

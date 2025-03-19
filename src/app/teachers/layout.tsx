import Sidebar from "@/components/teacherComponents/Sidebar";
import React from "react";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-10 mt-5 max-md:px-4 flex justify-between ">
      <div className="max-w-[30%]">
        <Sidebar />
      </div>
      <div className="flex-1 overflow-auto max-w-[75%] max-md:max-w-full flex flex-col ">
        <div className=" mt-5 max-md:px-4">
          <div className="border border-black rounded-sm py-5 px-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

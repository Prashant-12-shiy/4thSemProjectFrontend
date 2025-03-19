"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  BookOpen,
  CalendarClock,
  GraduationCap,
  Home,
  TableOfContents,
} from "lucide-react";
import Image from "next/image";
import cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useGetMyDetails } from "@/services/api/auth/TeacherApi";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname(); // Get the current route
  const { data: personalDetails } = useGetMyDetails();

  const handleLogout = () => {
    cookies.remove("token"), cookies.remove("role");
    router.push("/");
  };

  // Function to check if a link is active
  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Mobile Sidebar (Collapsible) */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild className="cursor-pointer">
            <TableOfContents />
          </SheetTrigger>
          <SheetContent side="left" className="w-[80vw]">
            <SheetHeader className="flex gap-4 flex-row">
              <Image
                src="/teacher.jpg"
                alt={"Teacher"}
                width={70}
                height={70}
                className="object-contain rounded-full"
              />
              <div>
                <SheetTitle>{personalDetails?.name}</SheetTitle>
                <SheetDescription>
                  {personalDetails?.course?.name} Teacher
                </SheetDescription>
              </div>
            </SheetHeader>
            <div className="mt-10 *:mb-3 *:text-xl font-semibold *:flex *:gap-3 cursor-pointer">
              <SheetClose asChild>
                <Link
                  href="/teachers"
                  className={`flex gap-3 items-center ${
                    isActive("/teachers") ? "text-blue-500" : ""
                  }`}
                >
                  <Home /> DashBoard
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link
                  href="/teachers/students"
                  className={`flex gap-3 items-center ${
                    isActive("/teachers/students") ? "text-blue-500" : ""
                  }`}
                >
                  <BookOpen /> Students
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link
                  href="/teachers/attendence"
                  className={`flex gap-3 items-center ${
                    isActive("/teachers/attendence") ? "text-blue-500" : ""
                  }`}
                >
                  <GraduationCap /> Attendance
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link
                  href="/teachers/task"
                  className={`flex gap-3 items-center ${
                    isActive("/teachers/task") ? "text-blue-500" : ""
                  }`}
                >
                  <CalendarClock /> Tasks
                </Link>
              </SheetClose>

              <p onClick={() => handleLogout()}>LogOut</p>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar (Static) */}
      <div className="hidden md:block w-[25%] min-w-[250px] h-screen bg-white shadow-lg fixed left-0 top-0 p-6">
        <div className="flex gap-4 flex-row items-center">
          <Image
            src="/teacher.jpg"
            alt={"Teacher"}
            width={70}
            height={70}
            className="object-contain rounded-full"
          />
          <div>
            <h1 className="text-xl font-bold">{personalDetails?.name}</h1>
            <p className="text-sm text-gray-600">
              {personalDetails?.course?.name} Teacher
            </p>
          </div>
        </div>
        <div className="mt-10 *:mb-3 *:text-xl font-semibold *:flex *:gap-3 cursor-pointer">
          <Link
            href="/teachers"
            className={`flex gap-3 items-center ${
              isActive("/teachers") ? "text-blue-500" : ""
            }`}
          >
            <Home /> DashBoard
          </Link>

          <Link
            href="/teachers/students"
            className={`flex gap-3 items-center ${
              isActive("/teachers/students") ? "text-blue-500" : ""
            }`}
          >
            <BookOpen /> Students
          </Link>

          <Link
            href="/teachers/attendence"
            className={`flex gap-3 items-center ${
              isActive("/teachers/attendence") ? "text-blue-500" : ""
            }`}
          >
            <GraduationCap /> Attendance
          </Link>

          <Link
            href="/teachers/task"
            className={`flex gap-3 items-center ${
              isActive("/teachers/task") ? "text-blue-500" : ""
            }`}
          >
            <CalendarClock /> Tasks
          </Link>

          <p onClick={() => handleLogout()}>LogOut</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
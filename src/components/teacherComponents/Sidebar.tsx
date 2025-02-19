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
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useGetMyDetails } from "@/services/api/auth/TeacherApi";

const Sidebar = () => {
  const router = useRouter();
  const {data: personalDetails} = useGetMyDetails();
  
  const handleLogout = () => {
    cookies.remove("token"), cookies.remove("role");
    router.push("/");
  };
  return (
    <Sheet>
      <SheetTrigger asChild className="cursor-pointer">
        <TableOfContents />
      </SheetTrigger>
      <SheetContent side="left" className="w-[25vw] max-sm:w-[80vw]">
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
            <SheetDescription>{personalDetails?.course?.name} Teacher</SheetDescription>
          </div>
        </SheetHeader>
        <div className="mt-10 *:mb-3 *:text-xl font-semibold *:flex *:gap-3  cursor-pointer">
          <SheetClose asChild>
            <Link href="/teachers">
              <Home /> DashBoard{" "}
            </Link>
          </SheetClose>

          <SheetClose asChild>
            <Link
              href="/teachers/students"
              className="flex gap-3 items-center"
            >
              {" "}
              <BookOpen /> Students{" "}
            </Link>
          </SheetClose>
{/* 
          <Collapsible className="flex-col gap-0 justify-start ">
            <CollapsibleTrigger className="text-start flex gap-3">
              {" "}
              <UserPen /> Students
            </CollapsibleTrigger>
            <CollapsibleContent className="text-base font-medium pl-14">
              Student
            </CollapsibleContent>
            <CollapsibleContent className="text-base font-medium pl-14">
              Classes
            </CollapsibleContent>
            <CollapsibleContent className="text-base font-medium pl-14">
              Grade
            </CollapsibleContent>
          </Collapsible> */}

          <SheetClose asChild>
            <Link href="/teachers/attendence">
              {" "}
              <GraduationCap />
              Attendance
            </Link>
          </SheetClose>

          
          {/* <SheetClose asChild>
            <Link
              href="#"
              className="flex gap-3 items-center"
            >
              {" "}
              <BookOpen /> Grade{" "}
            </Link>
          </SheetClose> */}

          <SheetClose asChild>
            <Link href="/teachers/task">
              {" "}
              <CalendarClock /> Tasks
            </Link>
          </SheetClose>

          <p onClick={() => handleLogout()}>LogOut</p>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;

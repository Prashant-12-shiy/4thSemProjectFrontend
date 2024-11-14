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
  MessagesSquare,
  TableOfContents,
  UserPen,
} from "lucide-react";
import Image from "next/image";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Sidebar = () => {
  const router = useRouter();
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
            <SheetTitle>Prashant Thapa</SheetTitle>
            <SheetDescription>Science Teacher</SheetDescription>
          </div>
        </SheetHeader>
        <div className="mt-10 *:mb-3 *:text-xl font-semibold *:flex *:gap-3  cursor-pointer">
          <SheetClose asChild>
            <Link href="/superadmin">
              <Home /> DashBoard{" "}
            </Link>
          </SheetClose>

          <SheetClose asChild>
            <Link
              href="#"
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
            <Link href="/superadmin/course">
              {" "}
              <GraduationCap />
              Attendance
            </Link>
          </SheetClose>

          
          <SheetClose asChild>
            <Link
              href="#"
              className="flex gap-3 items-center"
            >
              {" "}
              <BookOpen /> Grade{" "}
            </Link>
          </SheetClose>

          <SheetClose asChild>
            <Link href="/superadmin/event">
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
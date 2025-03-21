"use client";
import AddTeacherForm from "@/components/superadminComponents/forms/AddTeacherForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { EllipsisVertical, Search } from "lucide-react";
import React, { useState } from "react";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";
import { useGetAllStudents } from "@/services/api/auth/StudentApi";
import StudentEditForm from "@/components/superadminComponents/forms/StudentEditForm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useStudent } from "@/context/StudentContext";
import AddStudentForm from "@/components/superadminComponents/forms/AddStudentForm";
import { PageLoader } from "@/components/page-loader";

const page = () => {
  interface Student {
    _id: string;
    name: string;
  }

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("byname");
  const { data: studentData, isError, isLoading } = useGetAllStudents();

    if (isLoading) {
      return <PageLoader/>
    } 

  const { setStudentId } = useStudent();


  const formattedDate = format(new Date(), "dd/MM/yyyy");
  const filterdata = studentData
    ?.filter((student: any) => {
      const search = searchTerm.toLowerCase();

      if (selectedFilter === "byname") {
        return student.name.toLowerCase().includes(search);
      } else if (selectedFilter === "byrollno") {
        return student?.status.toLowerCase().includes(search);
      } else if (selectedFilter === "byclass") {
        return student?.class?.name.toLowerCase().includes(search);
      } else {
        return true;
      }
    })
    .sort((a: { name: string }, b: { name: any }) => {
      if (selectedFilter === "byname") {
        return a.name.localeCompare(b.name); // Sorts alphabetically
      }
      return 0; // No sorting for other filters
    });

  return (
    <div className="">
      <div className="flex justify-between mb-4">
        <h2 className="font-semibold text-3xl max-md:text-xl">Students</h2>
        <p className="mr-10 max-md:mr-4 max-md:max-h-[40px] max-md:text-sm font-semibold border border-black rounded-lg px-4 max-md:px-2 flex items-center bg-black text-white">
          {formattedDate}
        </p>
      </div>

      <div className="flex justify-between items-center max-md:flex-col">
        <div className="flex gap-3 items-center">
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[400px] my-3 h-8 border-black max-md:w-full"
          />
          <Search className="cursor-pointer" />
        </div>

        <div>
          <Select onValueChange={(value) => setSelectedFilter(value)}>
            <SelectTrigger className="flex items-center gap-1 max-md:my-2">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent className="cursor-pointer text-gray-600">
              <SelectGroup>
                <SelectLabel>Filter</SelectLabel>
                <SelectItem className=" hover:text-black" value="byname">
                  By Name
                </SelectItem>
                <SelectItem className=" hover:text-black" value="byrollno">
                  By Roll No
                </SelectItem>        
                <SelectItem className=" hover:text-black" value={"byclass"}>
                  By Class
                </SelectItem>
                <SelectItem className=" hover:text-black" value={"clear"}>
                  Clear
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <AddStudentForm />
        </div>
      </div>

      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8">SN</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role No</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Guardian Name</TableHead>
              <TableHead>Guardian Contact</TableHead>
              {/* <TableHead className="w-10 "> </TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterdata && filterdata.length > 0 ? (
              filterdata.map((student: any, index: number) => {
                return (
                  <TableRow key={student._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{student?.name}</TableCell>
                    <TableCell>{student?.rollNumber}</TableCell>
                    <TableCell>{student?.class?.name}</TableCell>
                    <TableCell>{student?.guardianName}</TableCell>
                    <TableCell>{student?.guardianContact}</TableCell>

                    {/* <TableCell className="opacity-80 cursor-pointer"> */}
                      {/* <StudentEditForm 
                              teacherId={student?._id}
                              teacherDetails={student}
                            /> */}
                      {/* <Link
                        href={`/superadmin/student/${student?.name
                          .replace(/\s+/g, "-")
                          .toLowerCase()}`}
                          onClick={() => setStudentId(student?._id)}
                      >
                        Show More
                      </Link> */}

                      {/* <DropdownMenu>
                        <DropdownMenuTrigger>
                          <EllipsisVertical className="h-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="cursor-pointer *:cursor-pointer">
                          <DropdownMenuItem>
                            
                          </DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                          <DropdownMenuItem>More</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu> */}
                    {/* </TableCell> */}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6}>No Student available.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default page;

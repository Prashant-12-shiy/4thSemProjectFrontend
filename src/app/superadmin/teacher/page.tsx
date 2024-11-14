"use client";
import AddTeacherForm from "@/components/superadminComponents/forms/AddTeacherForm";
import TeacherEditForm from "@/components/superadminComponents/forms/TeacherEditForm";
import { Button } from "@/components/ui/button";
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
import { Teacher, useGetAllTeacher } from "@/services/api/auth/TeacherApi";
import { teachers } from "@/staticdata";
import { format } from "date-fns";
import { ChevronsUpDown, Search, Settings2 } from "lucide-react";
import React, { useState } from "react";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";

const page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("byname");
  const { data: teacherData, isError, isLoading } = useGetAllTeacher();

  const formattedDate = format(new Date(), "dd/MM/yyyy");
  const filterdata = teacherData
    ?.filter((teacher) => {
      const search = searchTerm.toLowerCase();

      if (selectedFilter === "byname") {
        return teacher.name.toLowerCase().includes(search);
      } else if (selectedFilter === "bystatus") {
        // return teacher.status.toLowerCase().includes(search);
      } else if (selectedFilter === "byclass") {
        return teacher.classInCharge.name.toLowerCase().includes(search);
      } else {
        return true;
      }
    })
    .sort((a, b) => {
      if (selectedFilter === "byname") {
        return a.name.localeCompare(b.name); // Sorts alphabetically
      }
      return 0; // No sorting for other filters
    });

  return (
    <div className="">
      <div className="flex justify-between mb-4">
        <h2 className="font-semibold text-3xl max-md:text-xl">Teachers</h2>
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

                <SelectItem className=" hover:text-black" value={"bystatus"}>
                  By Status
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
          <AddTeacherForm />
        </div>
      </div>

      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8">SN</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Class Teacher</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-10 "> </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterdata && filterdata.length > 0 ? (
              filterdata.map((teacher: Teacher, index: number) => {
                return (
                  <TableRow key={teacher._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{teacher?.name}</TableCell>
                    <TableCell>{teacher?.course?.name}</TableCell>
                    <TableCell>{teacher?.classInCharge?.name }</TableCell>
                    <TableCell>{"Active"}</TableCell>
                    <TableCell className="opacity-80 cursor-pointer">
                      <TeacherEditForm
                        teacherId={teacher?._id}
                        teacherDetails={teacher}
                      />
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6}>No teachers available.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default page;

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
import { format } from "date-fns";
import { Search, Settings2, Plus, User, Book, Users, CheckCircle, XCircle } from "lucide-react";
import React, { useState } from "react";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";
import { PageLoader } from "@/components/page-loader";
import { Badge } from "@/components/ui/badge";

const Page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("byname");
  const { data: teacherData, isError, isLoading } = useGetAllTeacher();

  if (isLoading) {
    return <PageLoader />;
  }

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
    <div className="p-6 bg-gray-50 min-h-screen dark:bg-gray-900">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Teachers</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage all teachers and their details.
          </p>
        </div>
        <Badge className="bg-black text-white dark:bg-gray-700 dark:text-white">
          {formattedDate}
        </Badge>
      </div>

      {/* Search and Filter Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <Input
            placeholder="Search teachers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        <div className="flex items-center gap-4">
          <Select onValueChange={(value) => setSelectedFilter(value)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Filter By</SelectLabel>
                <SelectItem value="byname">Name</SelectItem>
                {/* <SelectItem value="bystatus">Status</SelectItem> */}
                <SelectItem value="byclass">Class</SelectItem>
                <SelectItem value="clear">Clear</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <AddTeacherForm>
            {/* <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Teacher
            </Button> */}
          </AddTeacherForm>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <Table>
          <TableHeader className="bg-gray-100 dark:bg-gray-700">
            <TableRow>
              <TableHead className="w-8 text-gray-700 dark:text-white">SN</TableHead>
              <TableHead className="text-gray-700 dark:text-white">Name</TableHead>
              <TableHead className="text-gray-700 dark:text-white">Subject</TableHead>
              <TableHead className="text-gray-700 dark:text-white">Class Teacher</TableHead>
              <TableHead className="text-gray-700 dark:text-white">Edit</TableHead>
              {/* <TableHead className="w-10 text-gray-700 dark:text-white">Actions</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterdata && filterdata.length > 0 ? (
              filterdata.map((teacher: Teacher, index: number) => (
                <TableRow
                  key={teacher._id}
                  className="hover:bg-gray-50 transition-colors dark:hover:bg-gray-700"
                >
                  <TableCell className="font-medium text-gray-900 dark:text-white">
                    {index + 1}
                  </TableCell>
                  <TableCell className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    <span>{teacher?.name}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Book className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      <span>{teacher?.course?.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      <span>{teacher?.classInCharge?.name}</span>
                    </div>
                  </TableCell>
                  {/* <TableCell>
                    <Badge variant={teacher?.status === "Active" ? "default" : "destructive"}>
                      {teacher?.status || "Active"}
                    </Badge>
                  </TableCell> */}
                  <TableCell>
                    <TeacherEditForm
                      teacherId={teacher?._id}
                      teacherDetails={teacher}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <Users className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                    <p className="text-gray-500 dark:text-gray-400">No teachers found.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;
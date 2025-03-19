"use client";
import { PageLoader } from "@/components/page-loader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetClassStudent } from "@/services/api/auth/TeacherApi";
import Link from "next/link";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, User, Phone, BookOpen } from "lucide-react";

const Page = () => {
  const { data: studentsData, isLoading } = useGetClassStudent();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter students based on search query
  const filteredStudents = studentsData?.filter((student: any) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-900 max-md:text-lg">Students</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="text-gray-700 font-semibold">SN</TableHead>
              <TableHead className="text-gray-700 font-semibold">Name</TableHead>
              <TableHead className="text-gray-700 font-semibold">
                Roll Number
              </TableHead>
              <TableHead className="text-gray-700 font-semibold">
                Guardian Name
              </TableHead>
              <TableHead className="text-gray-700 font-semibold">
                Guardian Contact
              </TableHead>
              <TableHead className="text-gray-700 font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents?.length > 0 ? (
              filteredStudents.map((student: any, index: number) => (
                <TableRow
                  key={index}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <User className="text-gray-500" />
                    {student.name}
                  </TableCell>
                  <TableCell>{student.rollNumber}</TableCell>
                  <TableCell>{student.guardianName}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Phone className="text-gray-500" />
                    {student.guardianContact}
                  </TableCell>
                  <TableCell>
                    <Link href={`/teachers/students/${student._id}`}>
                      <Button
                        variant="outline"
                        className="text-purple-700 border-purple-700 hover:bg-purple-50"
                      >
                        See More
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <BookOpen className="text-gray-400 w-12 h-12" />
                    <p className="text-gray-500">No students found.</p>
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
"use client";
import { PageLoader } from "@/components/page-loader";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetClassStudent,
  useMarkAttendence,
} from "@/services/api/auth/TeacherApi";
import { format } from "date-fns";
import React, { useState } from "react";
import { toast } from "sonner"; // For toast notifications
import { Check, X, Search } from "lucide-react"; // Icons for buttons and search
import { Input } from "@/components/ui/input"; // For search bar
import Modal  from "@/components/ui/modal"; // For confirmation modal

const Page = () => {
  const { data: studentsData, isLoading } = useGetClassStudent();
  const { mutate: markAttendenceMutation } = useMarkAttendence();
  const [searchQuery, setSearchQuery] = useState("");
  const [attendanceStatusFilter, setAttendanceStatusFilter] = useState<"all" | "Present" | "Absent">("all");
  const [selectedStudent, setSelectedStudent] = useState<{ name: string; status: string } | null>(null);

  if (isLoading) {
    return <PageLoader />;
  }

  const handleAttendence = ({
    studentName,
    status,
  }: {
    studentName: string;
    status: string;
  }) => {
    const date = format(Date.now(), "yyyy/MM/dd").toString();

    const data = {
      studentName,
      status,
      date,
    };

    markAttendenceMutation(data, {
      onSuccess: () => {
        toast.success(`Attendance marked as ${status} for ${studentName}`);
        setSelectedStudent(null); // Close modal after success
      },
      onError: () => {
        // toast.error("Failed to mark attendance. Please try again.");
      },
    });
  };

  // Filter students based on search query and attendance status
  const filteredStudents = studentsData.students
    ?.filter((student: any) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.toString().includes(searchQuery)
    );

  // Calculate attendance summary
  const presentCount = studentsData?.attendance?.filter((student: any) => student.status === "Present").length || 0;
  const absentCount = studentsData?.attendance?.filter((student: any) => student.status === "Absent").length || 0;

  return (
    <div className="p-6 bg-gray-50 min-h-screen dark:bg-gray-900">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl max-md:text-lg font-bold text-gray-800 dark:text-white">Student Attendance</h1>
        <div className="text-white bg-gray-800 rounded-lg px-5 py-2 text-sm font-medium dark:bg-gray-700">
          {format(Date.now(), "yyyy-MMM-dd")}
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by name or roll number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        {/* <select
          value={attendanceStatusFilter}
          onChange={(e) => setAttendanceStatusFilter(e.target.value as "all" | "Present" | "Absent")}
          className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        >
          <option value="all">All</option>
          <option value="present">Present</option>
          <option value="absent">Absent</option>
        </select> */}
      </div>

      {/* Attendance Summary */}
      <div className="flex gap-4 mb-6">
        <div className="bg-green-100 text-green-800 rounded-lg px-4 py-2 dark:bg-green-900 dark:text-green-200">
          Present: {presentCount}
        </div>
        <div className="bg-red-100 text-red-800 rounded-lg px-4 py-2 dark:bg-red-900 dark:text-red-200">
          Absent: {absentCount}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden dark:bg-gray-800">
        <Table className="w-full">
          <TableHeader className="bg-gray-100 dark:bg-gray-700">
            <TableRow>
              <TableHead className="font-semibold text-gray-700 dark:text-white">Student</TableHead>
              <TableHead className="font-semibold text-gray-700 dark:text-white">Roll No</TableHead>
              <TableHead className="font-semibold text-gray-700 dark:text-white">Guardian Contact</TableHead>
              <TableHead className="text-right font-semibold text-gray-700 dark:text-white">Attendance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents?.map((students: any) => (
              <TableRow
                key={students._id}
                className="hover:bg-gray-50 transition-colors dark:hover:bg-gray-700"
              >
                <TableCell className="font-medium text-gray-800 dark:text-white">
                  {students?.name}
                </TableCell>
                <TableCell className="text-gray-600 dark:text-gray-300">{students?.rollNumber}</TableCell>
                <TableCell className="text-gray-600 dark:text-gray-300">{students?.guardianContact}</TableCell>
                <TableCell className="flex gap-2 justify-end">
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white font-medium flex items-center gap-2"
                    onClick={() =>
                      setSelectedStudent({ name: students?.name, status: "Present" })
                    }
                  >
                    <Check size={16} /> Present
                  </Button>
                  <Button
                    className="bg-red-600 hover:bg-red-700 text-white font-medium flex items-center gap-2"
                    onClick={() =>
                      setSelectedStudent({ name: students?.name, status: "Absent" })
                    }
                  >
                    <X size={16} /> Absent
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Confirmation Modal */}
      {selectedStudent && (
        <Modal
          title="Confirm Attendance"
          onClose={() => setSelectedStudent(null)}
          onConfirm={() => {
            handleAttendence({
              studentName: selectedStudent.name,
              status: selectedStudent.status,
            });
          }}
        >
          <p>
            Are you sure you want to mark <strong>{selectedStudent.name}</strong> as{" "}
            <strong>{selectedStudent.status}</strong>?
          </p>
        </Modal>
      )}
    </div>
  );
};

export default Page;
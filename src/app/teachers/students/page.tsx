"use client";
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
import React from "react";

const page = () => {
  const { data: studentsData } = useGetClassStudent();
  return (
    <div>
      <h1 className="text-3xl font-semibold">Students</h1>

      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SN</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Roll Number</TableHead>
              <TableHead>Guardian Name</TableHead>
              <TableHead>Guardian Contact</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {studentsData?.map((student: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.rollNumber}</TableCell>
                <TableCell>{student.guardianName}</TableCell>
                <TableCell>{student.guardianContact}</TableCell>
                <TableHead>
                    <Link href={`/teachers/students/${student._id}`}>
                    See More
                    </Link>
                    </TableHead>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default page;

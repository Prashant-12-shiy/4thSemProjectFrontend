"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetClassStudent, useMarkAttendence } from "@/services/api/auth/TeacherApi";
import { format } from "date-fns";
import React from "react";

const page = () => {
  const { data: studentsData } = useGetClassStudent();
  const {mutate: markAttendenceMutation} = useMarkAttendence();
//   console.log(studentsData);



  const handleAttendence = ({studentName,status}: {studentName: string, status: string}) => {
    const date = format(Date.now(), 'yyyy/MM/dd').toString();
    
    const data = {
        studentName,
        status,
        date
    }
    markAttendenceMutation(data)
  } 

  return (
    <div>
      <div className="flex items-center justify-between">
      <h1 className="text-3xl font-semibold mb-4">Student Attendance</h1>
      <div className="text-white bg-black rounded-lg px-5 py-2 border-none">
          {format(Date.now(), "yyyy-MMM-dd")}
      </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>Roll No</TableHead>
            <TableHead>Guardian Contact</TableHead>
            <TableHead className="text-end">Attendence</TableHead>
          </TableRow>
        </TableHeader>
          <TableBody>
            {studentsData?.map((students: any) => (
              <TableRow key={students._id}>
                <TableCell>{students?.name}</TableCell>
                <TableCell>{students?.rollNumber}</TableCell>
                <TableCell>{students?.guardianContact}</TableCell>
                <TableCell className="flex gap-4 justify-end">
                 <Button className="bg-green-600" onClick={() => handleAttendence({studentName: students?.name, status: "Present"} )}>Present</Button>
                 <Button className="bg-red-600" onClick={() => handleAttendence({studentName: students?.name, status: "Absent"} )}>Absent</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
      </Table>
    </div>
  );
};

export default page;

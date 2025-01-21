"use client";
import AddGradeForm from "@/components/teacherComponents/AddGradeForm";
import UpdateGradeForm from "@/components/teacherComponents/UpdateGradeForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetStudentById } from "@/services/api/auth/TeacherApi";
import {
  isWithinInterval,
  parseISO,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from "date-fns";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const [attendanceSummary, setAttendanceSummary] = useState({
    week: 0,
    month: 0,
    year: 0,
  });
  const params = useParams();
  const id = params.id.toString();

  const { data: studentData } = useGetStudentById(id);

  useEffect(() => {
    if (studentData?.attendence) {
      const today = new Date();
      const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 0 }); // Monday as start of the week
      const startOfCurrentMonth = startOfMonth(today);
      const startOfCurrentYear = startOfYear(today);

      let weekCount = 0;
      let monthCount = 0;
      let yearCount = 0;

      studentData.attendence.forEach(
        (attendance: { date: any; status: string }) => {
          const attendanceDate = parseISO(attendance.date); // Convert to Date object

          if (attendance.status === "Present") {
            if (
              isWithinInterval(attendanceDate, {
                start: startOfCurrentWeek,
                end: today,
              })
            ) {
              weekCount++;
            }
            if (
              isWithinInterval(attendanceDate, {
                start: startOfCurrentMonth,
                end: today,
              })
            ) {
              monthCount++;
            }
            if (
              isWithinInterval(attendanceDate, {
                start: startOfCurrentYear,
                end: today,
              })
            ) {
              yearCount++;
            }
          }
        }
      );

      setAttendanceSummary({
        week: weekCount,
        month: monthCount,
        year: yearCount,
      });
    }
  }, [studentData]);

  return (
    <div>
      <div className="flex gap-5">
        <Image
          className="rounded-full object-contain"
          src="/me.png"
          alt="profile"
          width={70}
          height={70}
        />
        <div>
          <h1 className="text-3xl font-semibold ">
            {studentData?.student?.name}
          </h1>
          <p className="text-gray-500">
            Roll Number: {studentData?.student?.rollNumber}
          </p>
        </div>
      </div>

      <Card className="mt-10">
        <CardHeader>
          <CardTitle>Attendence Record</CardTitle>
          <CardDescription>
            This shows the attendence record of {studentData?.student?.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h1>Attendance Summary</h1>
          <p>Weekly Attendance: {attendanceSummary.week} Present</p>
          <p>Monthly Attendance: {attendanceSummary.month} Present</p>
          <p>Yearly Attendance: {attendanceSummary.year} Present</p>
        </CardContent>
      </Card>
      <div className="mt-10 ">
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>Grade Record</CardTitle>
              <AddGradeForm studentName={studentData?.student?.name} />
            </div>
            <CardDescription>
              This shows the grade record of {studentData?.student?.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h1>Grade Summary</h1>
            {/* <p>First Term Grade:  */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject Name</TableHead>
                  <TableHead>First Term</TableHead>
                  <TableHead>Second Term</TableHead>
                  <TableHead>Third Term</TableHead>
                  <TableHead>Final Term</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentData?.grades?.map((grade: any, index: number) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{grade?.course?.name}</TableCell>

                      {grade?.termGrades
                        ?.sort((a: any, b: any) => {
                          const termOrder = [
                            "First",
                            "Second",
                            "Third",
                            "Final",
                          ]; // Define the desired order of terms
                          return (
                            termOrder.indexOf(a.term) -
                            termOrder.indexOf(b.term)
                          );
                        })
                        .map((termgrade: any, index: number) => {
                          return (
                            <TableCell key={index}>
                              <div className="flex items-center gap-3">
                                <div>
                                  <span className="text-red-500">
                                    {termgrade?.mark} Mark{" "}
                                  </span>{" "}
                                  <br />
                                  {termgrade?.grade}{" "}
                                  <span className="text-xs text-gray-500">
                                    ({termgrade?.remarks})
                                  </span>
                                </div>
                                <UpdateGradeForm studentGradeData={termgrade} studentId={studentData?.student?._id} courseId={grade?.course?._id}/>
                              </div>
                            </TableCell>
                          );
                        })}
                    </TableRow>
                  );
                })}

                <Separator />
                <TableRow className="*:text-gray-500 font-semibold">
                  <TableCell>Final Grade</TableCell>
                  <TableCell>A</TableCell>
                  <TableCell>B</TableCell>
                  <TableCell>C</TableCell>
                  <TableCell>A</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            {/* </p> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default page;

"use client";
// import AddGradeForm from "@/components/teacherComponents/AddGradeForm";
// import UpdateGradeForm from "@/components/teacherComponents/UpdateGradeForm";
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
import { useGetGrade } from "@/services/api/auth/StudentApi";
import React from "react";

const page = () => {
  const { data: gradeData } = useGetGrade();

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>Grade Record</CardTitle>
            {/* <AddGradeForm studentName={studentData?.student?.name} /> */}
          </div>
          <CardDescription>
            {/* This shows the grade record of {studentData?.student?.name} */}
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
              {gradeData?.map((grade: any, index: number) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{grade?.course?.name}</TableCell>

                    {grade?.termGrades
                      ?.sort((a: any, b: any) => {
                        const termOrder = ["First", "Second", "Third", "Final"]; // Define the desired order of terms
                        return (
                          termOrder.indexOf(a.term) - termOrder.indexOf(b.term)
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
                              {/* <UpdateGradeForm studentGradeData={termgrade} studentId={studentData?.student?._id} courseId={grade?.course?._id}/> */}
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
  );
};

export default page;

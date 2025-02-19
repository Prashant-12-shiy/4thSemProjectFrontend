"use client"
import AddCourseForm from "@/components/superadminComponents/forms/AddCourseForm";
import CourseEditForm from "@/components/superadminComponents/forms/CourseEditForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCreateCourse, useGetAllCourse } from "@/services/api/auth/CourseApi";
import { classes,  } from "@/staticdata";
import { Settings2 } from "lucide-react";
import React from "react";

export interface Course {
  _id: string;
  name: string;
  code: string;
  description?: string;
  teacher?: { _id: string; name: string };
  credits: number;
  classes?: { _id: string; name: string };
}

const page = () => {

  const {data: courses} = useGetAllCourse();


 

  return (
    <div>
      <div className="flex justify-between ">
      <h1>Courses</h1>
      <AddCourseForm/>
      </div>


      <div>
  <Accordion type="single" collapsible className="w-full">
    {classes.map((classItem, index) => (
      <AccordionItem key={index} value={index.toLocaleString()}>
        <AccordionTrigger>
          Class {classItem.name} Courses
        </AccordionTrigger>
        <AccordionContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-8">SN</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Teacher</TableHead>
                <TableHead>Credits</TableHead>
                <TableHead className="w-10"> </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses
                ?.filter((course: Course) => course?.classes?.name === classItem.name.toString())
                .map((course: any, index: number) => (
                  <TableRow key={course._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{course.name}</TableCell>
                    <TableCell>{course.code}</TableCell>
                    <TableCell>{course.description || "N/A"}</TableCell>
                    <TableCell>{course.teacher?.name || "N/A"}</TableCell>
                    <TableCell>{course.credits}</TableCell>
                    <TableCell className="opacity-80 cursor-pointer">
                      <CourseEditForm courseId={course._id} />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
</div>

    </div>
  );
};

export default page;

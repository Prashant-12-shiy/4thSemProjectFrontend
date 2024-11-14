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
import { classes, courses } from "@/staticdata";
import { Settings2 } from "lucide-react";
import React from "react";

const page = () => {


  return (
    <div>
      <div className="flex justify-between ">
      <h1>Courses</h1>
      <AddCourseForm/>
      </div>


      <div>
        <Accordion type="single" collapsible className="w-full">
          {classes.map((classItems, index) => {
            return (
              <AccordionItem key={index} value={(index + 1).toString()}>
                <AccordionTrigger>
                  Class {classItems.name} Courses
                </AccordionTrigger>
                <AccordionContent>
                  <Table>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-8">SN</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Code</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Teacher</TableHead>
                          <TableHead>Credits</TableHead>
                          <TableHead className="w-10 "> </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {courses.map((course, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>{course.name}</TableCell>
                              <TableCell>{course.code}</TableCell>
                              <TableCell>{course.description}</TableCell>
                              <TableCell>{course.teacher}</TableCell>
                              <TableCell>{course.credits}</TableCell>
                              <TableCell className="opacity-80 cursor-pointer">
                                {" "}
                                <CourseEditForm/>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </Table>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
};

export default page;

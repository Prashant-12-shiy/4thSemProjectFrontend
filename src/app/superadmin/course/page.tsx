"use client";
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
import { useGetAllCourse } from "@/services/api/auth/CourseApi";
import { classes } from "@/staticdata";
import { Settings2, Book, User, Plus } from "lucide-react";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

export interface Course {
  _id: string;
  name: string;
  code: string;
  description?: string;
  teacher?: { _id: string; name: string };
  credits: number;
  classes?: { _id: string; name: string };
}

const Page = () => {
  const { data: courses } = useGetAllCourse();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  return (
    <div className="p-6 bg-gray-50 min-h-screen dark:bg-gray-900">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Courses
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage all courses and their details.
          </p>
        </div>
        <AddCourseForm></AddCourseForm>
      </div>

      {/* Accordion Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <Accordion type="single" collapsible className="w-full">
          {classes.map((classItem, index) => (
            <AccordionItem key={index} value={index.toString()}>
              <AccordionTrigger className="px-6 hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="flex items-center gap-3">
                  <Book className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    Class {classItem.name} Courses
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4">
                {courses?.filter(
                  (course: Course) =>
                    course?.classes?.name === classItem.name.toString()
                ).length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-gray-700 dark:text-white">
                          SN
                        </TableHead>
                        <TableHead className="text-gray-700 dark:text-white">
                          Name
                        </TableHead>
                        <TableHead className="text-gray-700 dark:text-white">
                          Code
                        </TableHead>
                        <TableHead className="text-gray-700 dark:text-white">
                          Description
                        </TableHead>
                        <TableHead className="text-gray-700 dark:text-white">
                          Teacher
                        </TableHead>
                        <TableHead className="text-gray-700 dark:text-white">
                          Credits
                        </TableHead>
                        <TableHead className="text-gray-700 dark:text-white">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {courses
                        ?.filter(
                          (course: Course) =>
                            course?.classes?.name === classItem.name.toString()
                        )
                        .map((course: Course, index: number) => (
                          <TableRow
                            key={course._id}
                            className="hover:bg-gray-50 transition-colors dark:hover:bg-gray-700"
                          >
                            <TableCell className="font-medium text-gray-900 dark:text-white">
                              {index + 1}
                            </TableCell>
                            <TableCell>{course.name}</TableCell>
                            <TableCell>{course.code}</TableCell>
                            <TableCell>{course.description || "N/A"}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                <span>{course.teacher?.name || "N/A"}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {course.credits} Credits
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Dialog
                                open={selectedCourseId === course._id}
                                onOpenChange={(open) => {
                                  if (open) {
                                    setSelectedCourseId(course._id);
                                  } else {
                                    setSelectedCourseId(null);
                                  }
                                }}
                              >
                                <DialogTrigger asChild>
                                  <Settings2 className=" h-6 w-5 cursor-pointer" />
                                </DialogTrigger>
                                <CourseEditForm
                                  courseDetails={course}
                                  setIsOpen={(open: any) => {
                                    if (!open) setSelectedCourseId(null);
                                  }}
                                />
                              </Dialog>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-4 py-8">
                    <Book className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                    <p className="text-gray-500 dark:text-gray-400">
                      No courses available for this class.
                    </p>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Page;

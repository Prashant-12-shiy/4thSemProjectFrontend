"use client"
import { useGetCourse } from '@/services/api/auth/StudentApi';
import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const page = () => {
  const {data: courseData} = useGetCourse();
  return (
    <div>
    <Table>
      <TableCaption>A list of all available courses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Course Name</TableHead>
          <TableHead>Teacher</TableHead>
          <TableHead>Class</TableHead>
          <TableHead className="text-right">Credits</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {courseData?.map((course: any) => (
          <TableRow key={course._id}>
            <TableCell className="font-medium">{course.name}</TableCell>
            <TableCell>{course.teacher?.name}</TableCell>
            <TableCell>{course.classes?.name}</TableCell>
            <TableCell className="text-right">{course.credits}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total Courses</TableCell>
          <TableCell className="text-right">{courseData?.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
    </div>
  )
}

export default page
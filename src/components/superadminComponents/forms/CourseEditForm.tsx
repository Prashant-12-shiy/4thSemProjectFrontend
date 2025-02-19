"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Separator } from "../../ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Loader, Settings2 } from "lucide-react";
import { Textarea } from "../../ui/textarea";
import { useGetAllTeacher } from "@/services/api/auth/TeacherApi";
import { useForm } from "react-hook-form";
import { useGetCourseBySuperAdmin, useUpdateCourse } from "@/services/api/auth/CourseApi";
import { Course } from "@/app/superadmin/course/page";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface CourseEditFormProps {
  courseId: string;
}

const CourseEditForm = ({courseId}: CourseEditFormProps) => {
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);
  const {data: teacherData, isLoading: isLoadingTeacherData} = useGetAllTeacher();
  const {data: courseData, isLoading: isLoadingCourseData} = useGetCourseBySuperAdmin(courseId);
  const {mutate: updateCourse, isPending} = useUpdateCourse();

  const {register, handleSubmit, reset} = useForm({
    defaultValues: {
      name: courseData?.name || "",
      code: courseData?.code || "",
      description: courseData?.description || "",
      credits: courseData?.credits || 0,
      className: courseData?.classes?.name
    }
  });

  // Update form when courseData is loaded
useEffect(() => {
  if (courseData) {
    reset({
      name: courseData.name,
      code: courseData.code,
      description: courseData.description,
      credits: courseData.credits,
      className: courseData.classes.name
    });
  }
}, [courseData, reset]);

  const isLoading = isLoadingTeacherData || isLoadingCourseData;

  
  const handleEditCourse = (data: any) => {
    const id = courseId;
    const updatedData = {
      ...data,
      className: courseData.classes.name  
    }
    updateCourse({updatedData, id}, {
      onSuccess: () => {
        toast.success("Course updated");
        setIsOpen(false);
        queryClient.invalidateQueries({ queryKey: ["getAllCourse"]});
      }
    });
    
  }

  if(isLoading) {
    return <div className="w-full">
      <Loader className="size-4 animate-spin"/>
    </div>
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Settings2 className=" h-6 w-5" />
      </DialogTrigger>
      <DialogContent className="max-md:max-w-[90vw] max-md:rounded-md">
      <form onSubmit={handleSubmit(handleEditCourse)} className="*:mb-3">
        <DialogHeader>
          <DialogTitle>Update Courses</DialogTitle>
          <DialogDescription className="text-xs">
            Please fill out the form below to update a course to the system.
          </DialogDescription>
        </DialogHeader>
        <Separator className="bg-black" />
        <div className="flex gap-5">
          <div>
            <Label>Name</Label>
            <Input type="text" {...register("name")}/>
          </div>

          <div>
            <Label>Code</Label>
            <Input type="text" {...register("code")}/>
          </div>
        </div>

        <Label>Description</Label>
        <Textarea {...register("description")}/>

        <div className="flex gap-5">
          <div>
            <Label>Credits</Label>
            <Input type="number" {...register("credits")} />
          </div>

          <div>
            <Label>Teacher</Label>
            <Select>
              <SelectTrigger className="w-[200px] max-md:w-[100px]">
                <SelectValue placeholder="Select a Teacher" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Teachers</SelectLabel>
                  {teacherData?.map((teacher, index) => (
                    <SelectItem key={index} value={teacher.name}>
                      {teacher.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />
        <Button disabled={isPending}>Update</Button>
      </form>
      </DialogContent>
    </Dialog>
  );
};

export default CourseEditForm;

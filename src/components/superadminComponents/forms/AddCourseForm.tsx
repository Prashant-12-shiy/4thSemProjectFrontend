"use client"
import React, { useState } from "react";
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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../../ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CoursesResponse, useCreateCourse } from "@/services/api/auth/CourseApi";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const AddCourseForm = () => {
  const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<string>("");
  const {register, handleSubmit} = useForm(); 
  const {mutate: createCourse, isPending} = useCreateCourse();

  const handleCreateCourse = (data: any) => {
    const finalData: CoursesResponse = {
      courses: [
        {
          ...data,
          className: selectedClass
        }
      ]
    };
    createCourse(finalData, {
      onSuccess: () => {
        toast.success("Course Created")
        setIsOpen(false);
        queryClient.invalidateQueries({ queryKey: ["getAllCourse"]})
      },
      onError: () => {
        toast.error("Failed to create course")
      }
    });
  };
  

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
    <DialogTrigger>
      <Button className="h-8 bg-white border-black/50 max-md:text-sm max-md:px-1 text-black border shadow-lg hover:bg-slate-100 hover:scale-105">
        Add Course
      </Button>
    </DialogTrigger>
    <DialogContent className="max-md:max-w-[90vw] max-md:rounded-md">
      <DialogHeader>
        <DialogTitle>Add New Course</DialogTitle>
        <DialogDescription className="text-xs">
          Please fill out the form below to add a new course to the system.
          Once submitted, the course will be added for scheduling purposes.
        </DialogDescription>
      </DialogHeader>
      <Separator className="bg-black"/>
      <form onSubmit={handleSubmit(handleCreateCourse)} className="*:mb-3">
      <div className="flex gap-5">
        <div>
          <Label>Name</Label>
          <Input type="text" {...register('name')} />
        </div>

        <div>
          <Label>Code</Label>
          <Input type="text" {...register('code')}/>
        </div>
      </div>

      <Label>Description</Label>
      <Textarea {...register('description')}/>

      <div className="flex gap-5">
          <div>
            <Label>Credits</Label>
            <Input type="number" {...register('credits')} />
          </div>

          <div>
            <Label>Class</Label>
            <Select onValueChange={(value) => setSelectedClass(value)}>
              <SelectTrigger className="w-[200px] max-md:w-[100px]">
                <SelectValue placeholder="Select a Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Class</SelectLabel>
                  <SelectItem value="6">6</SelectItem>
                  <SelectItem value="7">7</SelectItem>
                  <SelectItem value="8">8</SelectItem>
                  <SelectItem value="9">9</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

      <Separator />
      <Button disabled={isPending}>Create</Button>
      </form>
    </DialogContent>
  </Dialog>
  )
}

export default AddCourseForm
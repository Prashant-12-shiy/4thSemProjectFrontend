"use client";
import React from "react";
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
import { Settings2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Teacher, UpdateTeacher, useUpdateTeacher } from "@/services/api/auth/TeacherApi";

interface FormData {
  name: string;
  email: string;
  password: string;
  role: string;
  course: string;
  classInCharge: string;
}

const TeacherEditForm = ({ teacherId, teacherDetails }: any) => {
  const {mutate: UpdateTeacherMutation} = useUpdateTeacher();
  const { register, handleSubmit, control } = useForm<FormData>({
    defaultValues: {
      name: teacherDetails?.name,
      email: teacherDetails?.email,
      password: teacherDetails?.password,
      role: teacherDetails?.role,
      course: teacherDetails?.course?.name, // Set course name as default
      classInCharge: teacherDetails?.classInCharge?.name // Set classInCharge name as default
    }
  });

  const handleUpdateTeacher = (data: any) => {
    // console.log(teacherDetails);
    const id = teacherId;
    
    UpdateTeacherMutation({id, data});
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Settings2 className=" h-6 w-5" />
      </DialogTrigger>
        <DialogContent className="max-md:max-w-[90vw] max-md:rounded-md ">
      <form onSubmit={handleSubmit(handleUpdateTeacher)} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Update Teacher</DialogTitle>
            <DialogDescription className="text-xs">
              Please fill out the form below to update a teacher to the system.
              Once submitted, the teacher's profile will be updated.
            </DialogDescription>
          </DialogHeader>
          <Separator className="bg-black" />
          <div className="flex gap-5">
            <div>
              <Label>Name</Label>
              <Input type="text" {...register("name")} />
            </div>

            <div>
              <Label>Email</Label>
              <Input type="email" {...register("email")}/>
            </div>
          </div>

          <Label>Password</Label>
          <Input type="password" {...register("password")}/>

          <Label>Role</Label>
          <Input type="text" value="Teacher"  />

          <div className="flex gap-5">
            <div>
              <Label>Course</Label>
              <Input type="text" {...register("course")}/>
            </div>

            <div>
              <Label>Class Teacher</Label>
              <Controller
                name="classInCharge"
                control={control}
                defaultValue=""
                render={({ field }) => {
                  return (
                    <Select onValueChange={field.onChange} defaultValue={teacherDetails?.classInCharge?.name}>
                      <SelectTrigger className="w-[200px] max-md:w-[100px]">
                        <SelectValue placeholder="Select a Class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Classes</SelectLabel>
                          <SelectItem value="7">7</SelectItem>
                          <SelectItem value="9">9</SelectItem>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="6">6</SelectItem>
                          <SelectItem value="8">8</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  );
                }}
              />
            </div>
          </div>

          <Separator />
          <Button type="submit">Update</Button>
      </form>
        </DialogContent>
    </Dialog>
  );
};

export default TeacherEditForm;

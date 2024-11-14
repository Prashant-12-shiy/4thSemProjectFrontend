"use client";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useCreateTeacher } from "@/services/api/auth/TeacherApi";
import Loading from "@/components/Loading";

interface TeacherLoginData {
  name: string;
  email: string;
  password: string;
  role: string;
  course: string;
  classInCharge: string;
}

const AddTeacherForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, control } = useForm<TeacherLoginData>();
  const { mutate: createTeacherMutation } = useCreateTeacher();

  const handleTeacherCreate: SubmitHandler<TeacherLoginData> = (data) => {
    setIsLoading(true);
    try {
      createTeacherMutation(data,{
        onSuccess: () => {
          setIsLoading(false)
        },
        onError: () => {
          setIsLoading(false)
        }
      });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="h-8 bg-white border-black/50 max-md:text-sm max-md:px-1 text-black border shadow-lg hover:bg-slate-100 hover:scale-105">
          Add Teacher
        </Button>
      </DialogTrigger>
      <form onSubmit={handleSubmit(handleTeacherCreate)}>
        <DialogContent className="max-md:max-w-[90vw] max-md:rounded-md">
          <DialogHeader>
            <DialogTitle>Add New Teacher</DialogTitle>
            <DialogDescription className="text-xs">
              Please fill out the form below to add a new teacher to the system.
              Once submitted, the teacher's profile will be added for assignment
              and scheduling purposes.
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
              <Input type="email" {...register("email")} />
            </div>
          </div>

          <Label>Password</Label>
          <Input type="password" {...register("password")} />

          <Label>Role</Label>
          <Input type="text" value="Teacher" {...register("role")} />

          <div className="flex gap-5">
            <div>
              <Label>Course</Label>
              <Input type="text" {...register("course")} />
            </div>

            <div>
              <Label>Class Teacher</Label>
              <Controller
                name="classInCharge"
                control={control}
                defaultValue=""
                render={({ field }) => {
                  return (
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-[200px] max-md:w-[100px]">
                        <SelectValue placeholder="Select a Class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Classes</SelectLabel>
                          <SelectItem value="10A">10A</SelectItem>
                          <SelectItem value="9B">9B</SelectItem>
                          <SelectItem value="11C">11C</SelectItem>
                          <SelectItem value="12A">12A</SelectItem>
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
          
          <Button
            type="submit"
            onClick={() => handleSubmit(handleTeacherCreate)()}
          >
            {isLoading ? <Loading/> : "Button"} 
          </Button>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default AddTeacherForm;
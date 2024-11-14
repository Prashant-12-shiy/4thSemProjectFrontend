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
import { useForm } from "react-hook-form";
import { useCreateClass } from "@/services/api/auth/ClassApi";

const AddClassForm = () => {
  const {mutate: CreateClassMutation} = useCreateClass();
  const {register, handleSubmit} = useForm();

  const handleAddClass = (data: any) => {
    CreateClassMutation(data);
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="h-8 bg-white border-black/50 max-md:text-sm max-md:px-1 text-black border shadow-lg hover:bg-slate-100 hover:scale-105">
          Add Course
        </Button>
      </DialogTrigger>
      <DialogContent className="max-md:max-w-[90vw] max-md:rounded-md">
        <form onSubmit={handleSubmit(handleAddClass)} className="flex flex-col gap-4">
        <DialogHeader>
          <DialogTitle>Add New Class</DialogTitle>
          <DialogDescription className="text-xs">
            Please fill out the form below to add a new class to the system.
            Once submitted, the course will be added for scheduling purposes.
          </DialogDescription>
        </DialogHeader>
        <Separator className="bg-black" />

        <Label>Name</Label>
        <Input type="text" {...register('name')}/>

        <Separator />
        <Button type="submit">Create</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddClassForm;

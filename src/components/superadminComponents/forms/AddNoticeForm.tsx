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
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { NoticeData, useCreateNotice } from "@/services/api/auth/NoticeApi";

const AddNoticeForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: CreateNoticeMutation } = useCreateNotice();
  const { register, handleSubmit } = useForm<NoticeData>();

  const handleCreateNotice = (data: NoticeData) => {
    CreateNoticeMutation(data, {
      onSuccess: () => {
        setIsOpen(false);
      }
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button className="h-8 bg-white border-black/50 max-md:text-sm max-md:px-1 text-black border shadow-lg hover:bg-slate-100 hover:scale-105">
          Add New Notice
        </Button>
      </DialogTrigger>
      <DialogContent className="max-md:max-w-[90vw] max-md:rounded-md">
        <form onSubmit={handleSubmit(handleCreateNotice)} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Add New Notice</DialogTitle>
            <DialogDescription className="text-xs">
              Please fill out the form below to add a new Notice to the system.
              Once submitted, the Notice will be visible to everyone.
            </DialogDescription>
          </DialogHeader>
          <Separator className="bg-black" />
          <div>
            <Label>Notice Name</Label>
            <Input type="text" {...register("name")} />
          </div>

          <Label>Description</Label>
          <Textarea {...register("description")} />

            <div>
              <Label>Date</Label>
              <Input type="date" className="w-[200px]" {...register("date")} />
            </div>
        

          <Separator />
          <Button type="submit">Create</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNoticeForm;

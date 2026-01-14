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
import { EventData, usecreateEvent } from "@/services/api/auth/EventApi";
import { toast } from "sonner";

const AddEventForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: CreateEventMutation } = usecreateEvent();
  const { register, handleSubmit } = useForm<EventData>();

  const handleCreateEvent = (data: EventData) => {
    if(data.date >= Date.now().toString()) {
      toast.error("Cannot create the event in past")
    } else { 
    CreateEventMutation(data, {
      onSuccess: () => {
        setIsOpen(false);
      }
    });
  }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button className="h-8 bg-white border-black/50 max-md:text-sm max-md:px-1 text-black border shadow-lg hover:bg-slate-100 hover:scale-105">
          Add New Event
        </Button>
      </DialogTrigger>
      <DialogContent className="max-md:max-w-[90vw] max-md:rounded-md">
        <form onSubmit={handleSubmit(handleCreateEvent)} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
            <DialogDescription className="text-xs">
              Please fill out the form below to add a new event to the system.
              Once submitted, the event will be visible to everyone.
            </DialogDescription>
          </DialogHeader>
          <Separator className="bg-black" />
          <div>
            <Label>Event Name</Label>
            <Input type="text" {...register("name")} />
          </div>

          <Label>Description</Label>
          <Textarea {...register("description")} />

          <div className="flex gap-5">
            <div>
              <Label>Venue</Label>
              <Input type="text" {...register("venue")} />
            </div>

            <div>
              <Label>Date</Label>
              <Input type="date" className="w-[200px]" {...register("date")} />
            </div>
          </div>

          <Separator />
          <Button type="submit">Create</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEventForm;

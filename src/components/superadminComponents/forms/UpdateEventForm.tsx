"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
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
import { Cog } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import {
  EventData,
  useDeleteEvent,
  useUpdateEvent,
} from "@/services/api/auth/EventApi";
import { Textarea } from "@/components/ui/textarea";
const UpdateEventForm = ({
  eventDetails,
  eventId,
}: {
  eventDetails: EventData;
  eventId: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: UpdateEventMutation } = useUpdateEvent();
  const { mutate: DeleteEventMutation } = useDeleteEvent();
  const { register, handleSubmit } = useForm<EventData>({
    defaultValues: {
      name: eventDetails?.name,
      description: eventDetails?.description,
      venue: eventDetails?.venue,
      date: eventDetails?.date,
    },
  });

  const handleUpdateEvent = (data: any) => {
    const id = eventId;

    UpdateEventMutation({ id, data }, {
      onSuccess: () => {
        setIsOpen(false);
      }
    });
  };

  const handleEventDelete = () => {
    const id = eventId;
    DeleteEventMutation(id);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Cog className="opacity-90 h-5 hover:rotate-90 transition-all duration-300 ease-in-out cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="max-md:max-w-[90vw] max-md:rounded-md ">
        <form
          onSubmit={handleSubmit(handleUpdateEvent)}
          className="flex flex-col gap-4"
        >
          <DialogHeader>
            <DialogTitle>Update Teacher</DialogTitle>
            <DialogDescription className="text-xs">
              Please fill out the form below to update a teacher to the system.
              Once submitted, the teacher's profile will be updated.
            </DialogDescription>
          </DialogHeader>
          <Separator className="bg-black" />

          <div>
            <Label>Name</Label>
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
          <Button type="submit">Update</Button>
        </form>

        <Dialog>
          <DialogTrigger>
            <Button className="bg-red-500 hover:bg-red-600 w-full">Delete</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>
              <p className="mb-5">Are you sure you want to Delete it?</p>
            </DialogTitle>
            <div className="flex gap-6">
              <Button
                className="bg-red-500 hover:bg-red-700"
                onClick={() => handleEventDelete()}
              >
                Delete
              </Button>
              <DialogClose asChild>
                <Button className="bg-green-600 w-20">No</Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateEventForm;

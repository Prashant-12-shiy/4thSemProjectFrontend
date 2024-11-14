"use client"
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
import { Textarea } from "../../ui/textarea";

const CourseEditForm = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Settings2 className=" h-6 w-5" />
      </DialogTrigger>
      <DialogContent className="max-md:max-w-[90vw] max-md:rounded-md">
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
            <Input type="text" />
          </div>

          <div>
            <Label>Code</Label>
            <Input type="text" />
          </div>
        </div>

        <Label>Description</Label>
        <Textarea />

        <div className="flex gap-5">
          <div>
            <Label>Credits</Label>
            <Input type="number" />
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
                  <SelectItem value="John Doe">John Doe</SelectItem>
                  <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                  <SelectItem value="Alice Johnson">Alice Johnson</SelectItem>
                  <SelectItem value="Roborta Brown">Roborta Brown</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />
        <Button>Update</Button>
      </DialogContent>
    </Dialog>
  );
};

export default CourseEditForm;

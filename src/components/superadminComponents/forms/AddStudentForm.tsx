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
import { StudentData, useCreateStudent } from "@/services/api/auth/StudentApi";
import { profile } from "console";

interface StudentLoginData {
  name: string;
  email: string;
  password: string;
  role: string;
  className: string;
  rollNumber: string;
  guardianName: string;
  guardianContact: string;
}

const AddStudentForm = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, control } = useForm<StudentLoginData>();
  const { mutate: createStudentMutation } = useCreateStudent();

  const handleFileInput = (file: any) => {
    setSelectedFile(file[0]);
  };

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  const handleStudentCreate: SubmitHandler<StudentLoginData> = async (data) => {
    setIsLoading(true);
    const formData = new FormData();

    if (!cloudName || !uploadPreset) {
      throw new Error(
        "Missing Cloudinary configuration. Ensure NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET are set in .env.local."
      );
    }

    formData.append("file", selectedFile);
    formData.append("upload_preset", uploadPreset);
    try {
      // Send the file to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, // Replace with your cloud name
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (response.ok) {
        setImageUrl(data.secure_url); // Get the image URL
        console.log("Uploaded image URL:", data.secure_url);
      } else {
        console.error("Upload failed:", data);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }

    try {
        const newData: StudentData = {
            ...data, 
            profilePicture: imageUrl
        }

        console.log(newData);
        
      createStudentMutation(newData, {
        onSuccess: () => {
          setIsLoading(false);
          setIsOpen(false);
        },
        onError: () => {
          setIsLoading(false);
        },
      });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button className="h-8 bg-white border-black/50 max-md:text-sm max-md:px-1 text-black border shadow-lg hover:bg-slate-100 hover:scale-105">
          Add Student
        </Button>
      </DialogTrigger>
      <DialogContent className="max-md:max-w-[90vw] max-md:rounded-md max-h-screen overflow-auto">
        <form onSubmit={handleSubmit(handleStudentCreate)} className="flex gap-5 flex-col">
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription className="text-xs">
              Please fill out the form below to add a new Student to the system.
              Once submitted, the Student's profile will be added for assignment
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

            {/* <Label>Photo</Label>
            <Input type="file" /> */}

          <div className="flex gap-5">
            <div>
              <Label>RollNumber</Label>
              <Input type="number" {...register("rollNumber")} />
            </div>

            <div>
              <Label>Photo</Label>
              <Input
                type="file"
                onChange={(e) => handleFileInput(e.target.files)}
              />
            </div>
          </div>

          <div className="flex gap-5">
            <div>
              <Label>Role</Label>
              <Input type="text" value="Student" {...register("role")} />
            </div>

            <div>
              <Label>Class Name</Label>
              <Controller
                name="className"
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
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="9">9</SelectItem>
                          <SelectItem value="8">8</SelectItem>
                          <SelectItem value="7">7</SelectItem>
                          <SelectItem value="6">6</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  );
                }}
              />
            </div>
          </div>

          <div className="flex gap-5">
            <div>
              <Label>Guardian Name</Label>
              <Input type="text" {...register("guardianName")} />
            </div>

            <div>
              <Label>Guardian Contact</Label>
              <Input type="text" {...register("guardianContact")} />
            </div>
          </div>

          <Separator />

          <Button type="submit">{isLoading ? <Loading /> : "Button"}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddStudentForm;

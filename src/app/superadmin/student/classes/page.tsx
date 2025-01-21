"use client";
import AddClassForm from "@/components/superadminComponents/forms/AddClassForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useDeleteClass, useGetAllClass } from "@/services/api/auth/ClassApi";
import { classes2 } from "@/staticdata";
import { DialogClose } from "@radix-ui/react-dialog";
import { Trash } from "lucide-react";
import React, { useState } from "react";

const page = () => {
  const { data: classData } = useGetAllClass();
  const { mutate: DeleteClassMutation } = useDeleteClass();
  const [classId, setClassId] = useState("");
  const [isConfirmationMatched, setIsConfirmationMatched] = useState("");

  const handleClassDelete = () => {
    DeleteClassMutation(classId);
  };

  return (
    <div>
      <div>
        <h1>Classes</h1>
        <AddClassForm />
      </div>

      <div className="grid grid-cols-4 gap-4 justify-items-center max-md:grid-cols-2">
        {classData?.map((classes, index) => {
          return (
            <div
              key={index}
              className="flex justify-center border border-black w-full rounded-md px-5 py-2 mt-2 flex-col cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl"> Grade {classes.name} </h2>
                <Dialog>
                  <DialogTrigger>
                    <Trash
                      className="h-4 hover:scale-125 transition-all duration-150"
                      onClick={() => setClassId(classes._id)}
                    />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>
                      <p className="mb-5">Are you sure you want to Delete it?</p>
                      <Input
                        placeholder="Type 'I want to Delete' to Confirm Delete"
                        onChange={(e) =>
                          setIsConfirmationMatched(e.target.value)
                        }
                      />
                    </DialogTitle>
                    <div className="flex gap-6">
                      <Button
                        className="bg-red-500 hover:bg-red-700"
                        onClick={() => handleClassDelete()}
                        disabled={isConfirmationMatched !== "I want to Delete"}
                      >
                        Delete
                      </Button>
                      <DialogClose asChild>
                        <Button className="bg-green-600 w-20">No</Button>
                      </DialogClose>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <p className="text-gray-500">
                {classes.teacherInCharge?.name || "Teacher Not Assigend"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default page;

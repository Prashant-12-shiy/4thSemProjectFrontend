"use client";
import { PageLoader } from "@/components/page-loader";
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
import { Trash, Users, Book, Plus } from "lucide-react";
import React, { useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { Badge } from "@/components/ui/badge";

const Page = () => {
  const { data: classData, isLoading } = useGetAllClass();
  const { mutate: DeleteClassMutation } = useDeleteClass();
  const [classId, setClassId] = useState("");
  const [isConfirmationMatched, setIsConfirmationMatched] = useState("");

  const handleClassDelete = () => {
    DeleteClassMutation(classId);
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen dark:bg-gray-900">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Classes</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage all classes and their details.
          </p>
        </div>
        <AddClassForm>
          {/* <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Class
          </Button> */}
        </AddClassForm>
      </div>

      {/* Class Cards Section */}
      {classData && classData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {classData.map((classes, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Grade {classes.name}
                </h2>
                <Dialog>
                  <DialogTrigger>
                    <Trash
                      className="h-5 w-5 text-gray-500 hover:text-red-500 cursor-pointer transition-colors duration-200 dark:text-gray-400 dark:hover:text-red-500"
                      onClick={() => setClassId(classes._id)}
                    />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                      Are you sure you want to delete this class?
                    </DialogTitle>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      This action cannot be undone.
                    </p>
                    <Input
                      placeholder="Type 'I want to Delete' to confirm"
                      onChange={(e) => setIsConfirmationMatched(e.target.value)}
                      className="mb-4"
                    />
                    <div className="flex gap-4 justify-end">
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button
                        variant="destructive"
                        onClick={handleClassDelete}
                        disabled={isConfirmationMatched !== "I want to Delete"}
                      >
                        Delete
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="mt-4">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Users className="w-5 h-5" />
                  <span>
                    {classes.teacherInCharge?.name || "Teacher Not Assigned"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mt-2">
                  <Book className="w-5 h-5" />
                  <span>{classes?.name || "No Course Assigned"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 py-12">
          <Book className="w-12 h-12 text-gray-400 dark:text-gray-500" />
          <p className="text-gray-500 dark:text-gray-400">No classes available.</p>
        </div>
      )}
    </div>
  );
};

export default Page;
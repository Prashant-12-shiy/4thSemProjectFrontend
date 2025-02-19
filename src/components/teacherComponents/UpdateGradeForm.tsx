"use client";
import React, { useState } from "react";
import { Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUpdateGrade } from "@/services/api/auth/TeacherApi";
import { useForm } from "react-hook-form";



const getGrade = (mark: number): string => {
  if (mark >= 90) return "A+";
  if (mark >= 80) return "A";
  if (mark >= 70) return "B+";
  if (mark >= 60) return "B";
  if (mark >= 50) return "C+";
  if (mark >= 40) return "C";
  if (mark >= 30) return "D";
  return "F"; // Below 30 is a Fail
};

const UpdateGradeForm = ({ studentGradeData, studentId, courseId }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const { grade, mark, remarks, term } = studentGradeData;
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      mark: mark,
      remarks: remarks,
      grade: grade,
    },
  });
  const { mutate: UpdateGradeMutation } = useUpdateGrade();

  const handleMarkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const markValue =
      value === "" ? "" : Math.min(100, Math.max(0, Number(value))); // Keep mark between 0-100
    setValue("mark", markValue); // Update form value
    if (markValue !== "") {
      setValue("grade", getGrade(markValue)); // Auto-calculate grade
    }
  };

  const handeUpdateGrade = (data: any) => {
    const newData = {
      studentId,
      courseId,
      grade,
      ...data,
      term,
      mark: Number(data?.mark),
    };
    UpdateGradeMutation(newData, {
      onSuccess: () => {
        setIsOpen(false);
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Edit2 className="w-4 h-4 cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Grade</DialogTitle>
        </DialogHeader>
        <div>
          <form className="*:mb-5" onSubmit={handleSubmit(handeUpdateGrade)}>
            <div className="flex gap-10">
              <Input
                type="number"
                placeholder="Total Mark"
                max={100}
                {...register("mark")}
                onChange={handleMarkChange}
              />

              <Input
                type="text"
                placeholder="Grade"
                value={watch("grade", "")}
                disabled
                className="bg-gray-200 cursor-not-allowed"
              />
            </div>

            <Input placeholder="Remarks" {...register("remarks")} />

            <Button type="submit">Add</Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateGradeForm;

"use client"
import React, { useState } from "react";
import { Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAddGrade, useUpdateGrade } from "@/services/api/auth/TeacherApi";
import { useForm } from "react-hook-form";

const courseNames = [
  "Math",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "English",
  "Nepali",
  "Social Studies",
  "Moral Education",
  "Economics",
  "Art",
  "Geography",
  "History",
  "Health, Population and Environment",
  "Accountancy",
  "Business Studies",
  "Optional Mathematics",
  "Environment Science",
  "Sanskrit",
  "Physical Education",
];

const terms = ["First", "Second", "Third", "Final"];


const gradesData = ["A+", "A", "B+", "B", "C+", "C", "D", "F"];
const UpdateGradeForm = ({studentGradeData, studentId, courseId}: any) => {
    const {grade, mark , remarks, term} = studentGradeData;
    // const {termgrades} = studentData;
  const [selectedGrade, setSelectedGrade] = useState("");
  const { register, handleSubmit  } = useForm({
    defaultValues: {
      mark: mark,
      remarks: remarks,
    },
  });
  const {mutate: UpdateGradeMutation} = useUpdateGrade();

  

  const handeUpdateGrade = (data: any) => {
    const newData = {
      studentId,
      courseId,
      grade: selectedGrade,
      ...data,
      term,
      mark: Number(data?.mark)
    }
    UpdateGradeMutation(newData)
    
  };

  return (
    <Dialog>
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
              />

              <Select
                onValueChange={(value) => setSelectedGrade(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={grade} />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {gradesData.map((grade2) => (
                    <SelectItem
                      key={grade2.toLowerCase().replace(/\s+/g, "-")}
                      value={grade2}
                    >
                      {grade2}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

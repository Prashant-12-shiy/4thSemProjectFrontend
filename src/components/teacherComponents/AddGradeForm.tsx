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
import { useAddGrade } from "@/services/api/auth/TeacherApi";
import React, { useState } from "react";
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

const grades = ["A+", "A", "B+", "B", "C+", "C", "D", "F"];

const AddGradeForm = (studentName: any) => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const { mutate: AddGradeMutation } = useAddGrade();
  const { register, handleSubmit } = useForm();

  const handleAddGrade = (data: any) => {
    const finalData = {
      ...studentName,
      courseName: selectedSubject,
      term: selectedTerm,
      grade: selectedGrade,
      ...data,
      mark: Number(data.mark),
    };

    AddGradeMutation(finalData);
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add grade</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Grade</DialogTitle>
            <DialogDescription className="text-xs">
              Please fill out the form below to add a new grade to the student
              system. Once submitted, the result will be submited.
            </DialogDescription>
          </DialogHeader>

          <div>
            <form className="*:mb-5" onSubmit={handleSubmit(handleAddGrade)}>
              <Select onValueChange={(value) => setSelectedSubject(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select The subject" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {courseNames.map((course) => (
                    <SelectItem
                      key={course.toLowerCase().replace(/\s+/g, "-")}
                      value={course}
                    >
                      {course}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select onValueChange={(value) => setSelectedTerm(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Term" />
                </SelectTrigger>
                <SelectContent className="">
                  {terms.map((term) => (
                    <SelectItem
                      key={term.toLowerCase().replace(/\s+/g, "-")}
                      value={term}
                    >
                      {term}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex gap-10">
                <Input
                  type="number"
                  placeholder="Total Mark"
                  max={100}
                  {...register("mark")}
                />

                <Select onValueChange={(value) => setSelectedGrade(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Grade" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {grades.map((grade) => (
                      <SelectItem
                        key={grade.toLowerCase().replace(/\s+/g, "-")}
                        value={grade}
                      >
                        {grade}
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
    </div>
  );
};

export default AddGradeForm;

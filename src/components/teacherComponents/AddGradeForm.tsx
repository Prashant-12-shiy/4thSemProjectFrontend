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
import { toast } from "sonner";

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

const AddGradeForm = ({studentName, studentCourses}: {studentName: any, studentCourses: any}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("");
  const { mutate: AddGradeMutation } = useAddGrade();
  const { register, handleSubmit, watch, setValue } = useForm();

  console.log(studentName);
  

  const mark = watch("mark", ""); // Watch the mark input field

  const handleMarkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const markValue =
      value === "" ? "" : Math.min(100, Math.max(0, Number(value))); // Keep mark between 0-100
    setValue("mark", markValue); // Update form value
    if (markValue !== "") {
      setValue("grade", getGrade(markValue)); // Auto-calculate grade
    }
  };

  const handleAddGrade = (data: any) => {
    const finalData = {
      studentName,
      courseName: selectedSubject,
      term: selectedTerm,
      ...data,
      mark: Number(data.mark),
    };

    AddGradeMutation(finalData, {
      onSuccess: () => {
        setIsOpen(false);
      }
    });
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
                  {studentCourses.map((course: any) => (
                    <SelectItem
                      key={course.name.toLowerCase().replace(/\s+/g, "-")}
                      value={course.name}
                    >
                      {course.name}
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
                  onChange={handleMarkChange} // Auto-update grade
                />

                {/* Disabled Input for Auto-Calculated Grade */}
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
    </div>
  );
};

export default AddGradeForm;

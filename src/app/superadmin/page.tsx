"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import {format} from "date-fns"

const Page = () => {
  const tasks = [
    "Attendance Monitoring",
    "Announcements",
    "Student Supervision and Discipline",
    "Class and Curriculum Management",
    "Event Planning and Coordination",
    "Self-Evaluation",
  ];
  const formattedDate = format(new Date(), 'dd/MM/yyyy');

  return (
    <div className="">
      <div className="flex justify-between mb-4">
        <h2 className="font-semibold text-3xl max-md:text-xl">
          Admin Dashboard
        </h2>
        <p className="mr-10 max-md:mr-4 max-md:max-h-[40px] max-md:text-sm font-semibold border border-black rounded-lg px-4 max-md:px-2 flex items-center bg-black text-white">
          {formattedDate}
        </p>
      </div>
      <div className="flex gap-10 w-full max-md:flex-col">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Total Student Present</CardTitle>
          </CardHeader>
          <CardContent>
            512 Students
            <p className="text-sm opacity-80">
              15 students more then yestarday
            </p>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Total Teacher Present</CardTitle>
          </CardHeader>
          <CardContent>
            32 Students
            <p className="text-sm opacity-80">2 teachers less then yestarday</p>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            Parents Meeting
            <p className="text-sm opacity-80">22 November ( 3days from now )</p>
          </CardContent>
        </Card>
      </div>

      <Card className="w-full mt-6">
        <CardHeader>
          <CardTitle>Administrative Tasks and Actions</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
          {tasks.map((task, index) => (
            <CardContent key={index} className="flex gap-3 items-center">
              <Checkbox />
              <p>{task}</p>
            </CardContent>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Page;

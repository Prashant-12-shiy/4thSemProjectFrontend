"use client";
import EventsAndNotice from "@/components/dashboardComponents/EventsAndNotice";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetTask } from "@/services/api/auth/StudentApi";
import React from "react";

const page = () => {
  const { data: task } = useGetTask();
  console.log(task);

  return (
    <div>
      <h1 className="font-semibold text-3xl">DashBoard</h1>
      <div className="flex items-center gap-5 *:w-full max-md:flex-col max-md:mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Todays Homework</CardTitle>
            <CardDescription>Complete this Homework</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Task</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {task?.map((task: any, index: number) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{task?.teacher?.course?.name}</TableCell>
                      <TableCell>{task?.taskContent}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <EventsAndNotice />
      </div>
    </div>
  );
};

export default page;

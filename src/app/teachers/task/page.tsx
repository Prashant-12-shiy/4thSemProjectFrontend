"use client"
import AddEventForm from "@/components/superadminComponents/forms/AddEventForm";
import AddTaskForm from "@/components/teacherComponents/AddTaskForm";
import UpdateEventForm from "@/components/superadminComponents/forms/UpdateEventForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EventData, useGetAllEvent } from "@/services/api/auth/EventApi";
import { useGetAssignedTask } from "@/services/api/auth/TeacherApi";
import { format } from "date-fns";
import { Cog } from "lucide-react";
import React from "react";

const page = () => {
    const {data: assignedTaskData} = useGetAssignedTask();
    console.log(assignedTaskData);

    const pastTask = assignedTaskData?.filter((task: any) => {
        const taskDate = new Date(task.createdAt);
        const today = new Date();
      
        return (
          taskDate.getFullYear() < today.getFullYear() ||
          (taskDate.getFullYear() === today.getFullYear() &&
            (taskDate.getMonth() < today.getMonth() ||
              (taskDate.getMonth() === today.getMonth() && taskDate.getDate() < today.getDate())))
        );
      });
      console.log(pastTask);
      
      const todayTask = assignedTaskData?.filter((task: any) => {
        const taskDate = new Date(task.createdAt);
        const today = new Date();
      
        return (
          taskDate.getFullYear() === today.getFullYear() &&
          taskDate.getMonth() === today.getMonth() &&
          taskDate.getDate() === today.getDate()
        );
      });
      console.log(todayTask);
      
      
    
    
  return (
    <div>
              <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Tasks</h1>
        <AddTaskForm/>
      </div>

      <div className="flex gap-5 *:w-full *:border *:border-black *:rounded-sm *:p-5 mt-5 max-md:flex-col">
        <div>
          <h2 className="font-semibold text-xl">Yestarday Task</h2>
          <div>
          
              <Card  className="mt-4">
                <CardHeader>
                    <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Classes</CardTitle>
                  {/* <UpdateEventForm /> */}
                    </div>
                  <CardDescription className="text-sm">
                    Yestarday tasks for each classes
                  </CardDescription>
                </CardHeader>
                {pastTask?.map((task: any, index: number) => (
                    <CardContent key={index}>
                    <p className="text-sm">Class {task?.assignedTo?.name}</p>
                    <p>{task?.status}</p>
                    <p>{task?.taskContent}</p>
                  </CardContent>
            ))}
            
              </Card>
            {/* ))} */}
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-xl">Today Task</h2>
          <div>
          <Card  className="mt-4">
                <CardHeader>
                    <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Classes</CardTitle>
                  {/* <UpdateEventForm /> */}
                    </div>
                  <CardDescription className="text-sm">
                  </CardDescription>
                </CardHeader>
                {todayTask?.map((task: any, index: number) => (
                    <CardContent key={index}>
                    <p className="text-sm">Class {task?.assignedTo?.name}</p>
                    <p>{task?.status}</p>
                    <p>{task?.taskContent}</p>
                  </CardContent>
            ))}
              </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
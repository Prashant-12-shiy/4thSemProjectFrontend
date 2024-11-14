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
import { scheduleData } from "@/staticdata";
import React from "react";

const page = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold">Teacher Dashboard</h1>

      <div className="flex gap-5 mt-3 max-md:flex-col-reverse">
        <div className="border border-black/50 w-full rounded-sm px-4">
          <h2 className="text-lg my-2 font-semibold">Class Schedule</h2>

          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SN</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Task</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scheduleData.map((schedule, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{schedule.sn}</TableCell>
                      <TableCell>{schedule.class} </TableCell>
                      <TableCell>{schedule.time} </TableCell>
                      <TableCell>
                        {schedule.task || "No Task Assigned "}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        <EventsAndNotice />
      </div>
    </div>
  );
};

export default page;

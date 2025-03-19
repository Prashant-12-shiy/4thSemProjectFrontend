"use client";
import EventsAndNotice from "@/components/dashboardComponents/EventsAndNotice";
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
import { FaBell, FaCalendarAlt, FaUpload, FaCheckCircle } from "react-icons/fa";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import Link from "next/link";

const Page = () => {
  return (
    <div className="p-6 bg-gradient-to-br from-pink-50 to-purple-50 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-purple-900 max-md:text-lg">
          Teacher Dashboard
        </h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <FaBell className="text-2xl text-purple-900 cursor-pointer hover:text-purple-700" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
              3
            </span>
          </div>
          <Link href="/teachers/attendence">
            <button className="bg-purple-900 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors max-md:text-xs">
              Mark Attendance
            </button>
          </Link>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-purple-200 hover:shadow-xl transition-shadow">
          <h2 className="text-xl font-semibold text-purple-900 mb-4">
            Upload Assignments
          </h2>
          <div className="flex items-center gap-4">
            <FaUpload className="text-3xl text-purple-900" />
            <p className="text-sm text-purple-700">
              Upload new assignments for your students.
            </p>
          </div>
          <button className="mt-4 bg-purple-900 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors">
            Upload Now
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-purple-200 hover:shadow-xl transition-shadow">
          <h2 className="text-xl font-semibold text-purple-900 mb-4">
            Task Progress
          </h2>
          <div className="flex items-center gap-4">
            <FaCheckCircle className="text-3xl text-purple-900" />
            <Progress value={65} className="h-2 bg-purple-200" />
          </div>
          <p className="text-sm text-purple-700 mt-2">65% tasks completed.</p>
        </div>

        {/* <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-purple-200 hover:shadow-xl transition-shadow">
          <h2 className="text-xl font-semibold text-purple-900 mb-4">
            Upcoming Events
          </h2>
          <div className="flex items-center gap-4">
            <FaCalendarAlt className="text-3xl text-purple-900" />
            <Calendar mode="single" className="border-none" />
          </div>
        </div> */}
      </div>

      {/* Class Schedule and Events Section */}
      <div className="flex gap-6 mt-6 max-md:flex-col-reverse">
        {/* Class Schedule Table */}
        <div className="w-full bg-white rounded-2xl shadow-lg border-2 border-purple-200 p-6">
          <h2 className="text-2xl font-semibold text-purple-900 mb-4">
            Class Schedule
          </h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-purple-900">SN</TableHead>
                <TableHead className="text-purple-900">Class</TableHead>
                <TableHead className="text-purple-900">Time</TableHead>
                <TableHead className="text-purple-900">Task</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scheduleData.map((schedule, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-purple-50 transition-colors"
                >
                  <TableCell>{schedule.sn}</TableCell>
                  <TableCell>{schedule.class}</TableCell>
                  <TableCell>{schedule.time}</TableCell>
                  <TableCell>{schedule.task || "No Task Assigned"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Events and Notices Section */}
        <EventsAndNotice />
      </div>
    </div>
  );
};

export default Page;

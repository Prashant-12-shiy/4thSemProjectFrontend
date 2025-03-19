"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { format } from "date-fns";
import Link from "next/link";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, CartesianGrid, XAxis, YAxis, Bar } from "recharts";

const Page = () => {
  const formattedDate = format(new Date(), "dd/MM/yyyy");

  // Static data for the bar chart
  const barChartData = [
    { name: "Mon", Students: 400, Teachers: 24 },
    { name: "Tue", Students: 300, Teachers: 22 },
    { name: "Wed", Students: 200, Teachers: 20 },
    { name: "Thu", Students: 278, Teachers: 18 },
    { name: "Fri", Students: 189, Teachers: 16 },
    { name: "Sat", Students: 239, Teachers: 14 },
    { name: "Sun", Students: 349, Teachers: 12 },
  ];

  // Static data for the pie chart
  const pieChartData = [
    { name: "Present Students", value: 512 },
    { name: "Absent Students", value: 88 },
    { name: "Present Teachers", value: 32 },
    { name: "Absent Teachers", value: 8 },
  ];

  // Colors for the pie chart
  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"];

  return (
    <div className="p-6 bg-gradient-to-br from-pink-100 to-purple-100 min-h-screen">
      <div className="flex justify-between mb-8">
        <h2 className="font-bold text-4xl max-md:text-2xl text-purple-900">
          Admin Dashboard
        </h2>
        <p className="mr-10 max-md:mr-4 max-md:max-h-[40px] max-md:text-sm font-semibold border-2 border-purple-900 rounded-full px-6 max-md:px-4 py-2 flex items-center bg-purple-900 text-white shadow-lg">
          {formattedDate}
        </p>
      </div>

      {/* Top Cards Section */}
      <div className="flex gap-8 w-full max-md:flex-col">
        <Card className="w-full bg-white rounded-2xl shadow-lg border-2 border-purple-200 hover:bg-purple-50 hover:scale-105 transition-all">
          <Link href="/superadmin/student">
          <CardHeader>
            <CardTitle className="text-purple-900 text-2xl">
              Total Student Present
            </CardTitle>
          </CardHeader>
            <CardContent className=" rounded-b-2xl transition-colors">
              <p className="text-3xl font-bold text-purple-900">512 Students</p>
              <p className="text-sm opacity-80 text-purple-700">
                15 students more than yesterday
              </p>
            </CardContent>
          </Link>
        </Card>

        <Card className="w-full bg-white rounded-2xl shadow-lg border-2 border-purple-200 hover:bg-purple-50 hover:scale-105 transition-all">
          <Link href="/superadmin/teacher">
          <CardHeader>
            <CardTitle className="text-purple-900 text-2xl">
              Total Teacher Present
            </CardTitle>
          </CardHeader>
            <CardContent className=" rounded-b-2xl transition-colors">
              <p className="text-3xl font-bold text-purple-900">32 Teachers</p>
              <p className="text-sm opacity-80 text-purple-700">
                2 teachers less than yesterday
              </p>
            </CardContent>
          </Link>
        </Card>

        <Card className="w-full bg-white rounded-2xl shadow-lg border-2 border-purple-200 hover:bg-purple-50 hover:scale-105 transition-all">
          <Link href="/superadmin/event">
          <CardHeader>
            <CardTitle className="text-purple-900 text-2xl">
              Upcoming Events
            </CardTitle>
          </CardHeader>
            <CardContent className=" rounded-b-2xl transition-colors">
              <p className="text-2xl font-bold text-purple-900">
                Parents Meeting
              </p>
              <p className="text-sm opacity-80 text-purple-700">
                22 November (3 days from now)
              </p>
            </CardContent>
          </Link>
        </Card>
      </div>

      {/* Bar Chart Section */}
    <div className="flex justify-between gap-5">

      <Card className="w-full mt-8 bg-white rounded-2xl shadow-lg border-2 border-purple-200">
        <CardHeader>
          <CardTitle className="text-purple-900 text-2xl">Weekly Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart width={730} height={250} data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E0E7FF" />
            <XAxis dataKey="name" stroke="#4C1D95" />
            <YAxis stroke="#4C1D95" />
            <Tooltip contentStyle={{ backgroundColor: "#4C1D95", color: "#fff", borderRadius: "10px" }} />
            <Bar dataKey="Students" fill="#9333EA" radius={[10, 10, 0, 0]} />
            <Bar dataKey="Teachers" fill="#4C1D95" radius={[10, 10, 0, 0]} />
          </BarChart>
        </CardContent>
      </Card>

      <Card className="w-full mt-8 bg-white rounded-2xl shadow-lg border-2 border-purple-200">
        <CardHeader>
          <CardTitle className="text-purple-900 text-2xl">
            Weekly Attendance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full overflow-x-auto">
            <PieChart width={400} height={400}>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label
              >
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </CardContent>
      </Card>

    </div>
    </div>
  );
};

export default Page;  
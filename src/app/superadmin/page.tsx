"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import React from "react";
import {
  CalendarDays,
  Users,
  GraduationCap,
  FileText,
  TrendingUp,
  Clock,
  Award,
  BookOpen,
  CheckCircle,
  XCircle,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";
import { useGetAllStudents } from "@/services/api/auth/StudentApi";
import { useGetAllTeacher } from "@/services/api/auth/TeacherApi";
import { useGetAllClass } from "@/services/api/auth/ClassApi";
// import { useGetTodaysAttendance, useGetWeeklyAttendance } from "@/services/api/auth/AttendanceApi";
import { useGetAllCourse } from "@/services/api/auth/CourseApi";
import { useGetAllNotice } from "@/services/api/auth/NoticeApi";
import { useGetAllEvent } from "@/services/api/auth/EventApi";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

const Page = () => {
  // Fetch all data
  const { data: studentsData, isLoading: loadingStudents } =
    useGetAllStudents();
  const { data: teachersData, isLoading: loadingTeachers } = useGetAllTeacher();
  const { data: classesData, isLoading: loadingClasses } = useGetAllClass();
  const { data: coursesData, isLoading: loadingCourses } = useGetAllCourse();
  // const { data: todaysAttendance, isLoading: loadingAttendance } = useGetTodaysAttendance();
  // const { data: weeklyAttendanceData, isLoading: loadingWeekly } = useGetWeeklyAttendance();
  const { data: announcements, isLoading: loadingAnnouncements } =
    useGetAllNotice();
  const { data: events, isLoading: loadingEvents } = useGetAllEvent();

  // Calculate stats
  const totalStudents = studentsData?.length || 0;
  const totalTeachers = teachersData?.length || 0;
  const totalClasses = classesData?.length || 0;
  const totalCourses = coursesData?.length || 0;

  // Calculate today's attendance
  // const studentAttendance = todaysAttendance?.filter((att: any) =>
  //   att.student && att.status === 'present'
  // ) || [];

  // const teacherAttendance = todaysAttendance?.filter((att: any) =>
  //   att.teacher && att.status === 'present'
  // ) || [];

  // const presentStudents = studentAttendance.length;
  // const presentTeachers = teacherAttendance.length;

  // const studentAttendanceRate = totalStudents > 0 ? Math.round((presentStudents / totalStudents) * 100) : 0;
  // const teacherAttendanceRate = totalTeachers > 0 ? Math.round((presentTeachers / totalTeachers) * 100) : 0;

  // // Calculate absent count
  // const absentStudents = totalStudents - presentStudents;
  // const absentTeachers = totalTeachers - presentTeachers;

  // Quick stats data (now dynamic)
  const quickStats = [
    {
      label: "Total Students",
      value: totalStudents.toString(),
      icon: Users,
      change: "+0", // You can add logic to compare with yesterday
      color: "blue",
      link: "/superadmin/student",
    },
    {
      label: "Total Teachers",
      value: totalTeachers.toString(),
      icon: GraduationCap,
      change: "+0",
      color: "green",
      link: "/superadmin/teacher",
    },
    {
      label: "Active Classes",
      value: totalClasses.toString(),
      icon: BookOpen,
      change: "+0",
      color: "purple",
      link: "/superadmin/student/classes",
    },
    {
      label: "Courses",
      value: totalCourses.toString(),
      icon: FileText,
      change: "+0",
      color: "orange",
      link: "/superadmin/course",
    },
  ];

  // Attendance stats
  // const attendanceStats = [
  //   {
  //     label: "Student Attendance",
  //     present: presentStudents,
  //     absent: absentStudents,
  //     rate: studentAttendanceRate,
  //     icon: UserCheck,
  //     color: "blue"
  //   },
  //   {
  //     label: "Teacher Attendance",
  //     present: presentTeachers,
  //     absent: absentTeachers,
  //     rate: teacherAttendanceRate,
  //     icon: GraduationCap,
  //     color: "green"
  //   }
  // ];

  // Class performance data (using actual class data)
  const classPerformance =
    classesData?.slice(0, 4).map((classItem: any, index: number) => ({
      class: classItem.name || `Class ${index + 1}`,
      attendance: Math.floor(Math.random() * 20) + 80, // Simulated, replace with actual data
      performance: Math.floor(Math.random() * 20) + 75, // Simulated, replace with actual data
      students: classItem.students?.length || 0,
    })) || [];

  // Loading state
  const isLoading = loadingStudents || loadingTeachers || loadingClasses;
  // || loadingAttendance;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Skeleton className="h-10 w-64 mb-2" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-10 w-48" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 rounded-lg" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="lg:col-span-2 h-96 rounded-lg" />
          <Skeleton className="h-96 rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Principal Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border">
            <CalendarDays className="w-4 h-4 text-gray-500" />
            <span className="font-medium">
              {format(new Date(), "EEEE, MMMM d, yyyy")}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickStats.map((stat, index) => (
          <Link href={stat.link} key={index}>
            <Card className="border shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-lg ${
                      stat.color === "blue"
                        ? "bg-blue-100"
                        : stat.color === "green"
                        ? "bg-green-100"
                        : stat.color === "purple"
                        ? "bg-purple-100"
                        : "bg-orange-100"
                    }`}
                  >
                    <stat.icon
                      className={`w-6 h-6 ${
                        stat.color === "blue"
                          ? "text-blue-600"
                          : stat.color === "green"
                          ? "text-green-600"
                          : stat.color === "purple"
                          ? "text-purple-600"
                          : "text-orange-600"
                      }`}
                    />
                  </div>
                  <Badge
                    variant="outline"
                    className="text-green-600 bg-green-50"
                  >
                    {stat.change}
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </h3>
                <p className="text-gray-600">{stat.label}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Attendance Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Today's Attendance Overview
            </CardTitle>
            <CardDescription>Real-time attendance statistics</CardDescription>
          </CardHeader>
          <CardContent>
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {attendanceStats.map((stat, index) => (
                <div key={index} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        stat.color === 'blue' ? 'bg-blue-100' : 'bg-green-100'
                      }`}>
                        <stat.icon className={`w-5 h-5 ${
                          stat.color === 'blue' ? 'text-blue-600' : 'text-green-600'
                        }`} />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{stat.label}</h4>
                        <div className="text-2xl font-bold">{stat.rate}%</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        Present: {stat.present}
                      </span>
                      <span className="flex items-center gap-1 text-red-600">
                        <XCircle className="w-4 h-4" />
                        Absent: {stat.absent}
                      </span>
                    </div>
                    <Progress value={stat.rate} className={`h-2 ${
                      stat.color === 'blue' ? '' : 'bg-green-100'
                    }`} />
                  </div>
                </div>
              ))}
            </div> */}

            {/* Weekly attendance trend */}
            {/* {weeklyAttendanceData && weeklyAttendanceData.length > 0 && (
              <div className="mt-8">
                <h4 className="font-medium text-gray-900 mb-4">Weekly Attendance Trend</h4>
                <div className="flex items-end gap-2 h-32">
                  {weeklyAttendanceData.map((day: any, index: number) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-blue-500 rounded-t-lg"
                        style={{ height: `${(day.studentsPresent / totalStudents) * 100}%` }}
                      ></div>
                      <span className="text-xs mt-2 text-gray-600">{day.day}</span>
                      <span className="text-xs text-gray-500">{day.studentsPresent}/{totalStudents}</span>
                    </div>
                  ))}
                </div>
              </div>
            )} */}
          </CardContent>
        </Card>

        {/* Right Column - Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest updates and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loadingAnnouncements ? (
                <Skeleton className="h-20" />
              ) : announcements && announcements.length > 0 ? (
                announcements
                  .slice(0, 3)
                  .map((announcement: any, index: number) => (
                    <div
                      key={announcement._id || index}
                      className="p-3 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg"
                    >
                      <h4 className="font-medium text-gray-900">
                        {announcement.title || "Announcement"}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        {announcement.message ||
                          announcement.description ||
                          "No description"}
                      </p>
                      {announcement.createdAt && (
                        <div className="text-xs text-gray-400 mt-2">
                          {format(
                            new Date(announcement.createdAt),
                            "MMM d, h:mm a"
                          )}
                        </div>
                      )}
                    </div>
                  ))
              ) : (
                <p className="text-gray-500 text-center py-4">
                  No recent announcements
                </p>
              )}

              <div className="pt-4 border-t">
                <h4 className="font-medium text-gray-900 mb-3">
                  Upcoming Events
                </h4>
                {loadingEvents ? (
                  <Skeleton className="h-16 mb-2" />
                ) : events && events.length > 0 ? (
                  events.slice(0, 2).map((event: any, index: number) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg mb-2">
                      <div className="flex justify-between items-center">
                        <h5 className="font-medium">{event.title}</h5>
                        <Badge variant="outline">
                          {format(new Date(event.date), "MMM d")}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">
                        {event.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No upcoming events</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Class Performance */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Class Performance Overview
          </CardTitle>
          <CardDescription>Top performing classes this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {classPerformance.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium text-gray-900">
                      {item.class}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">
                      ({item.students} students)
                    </span>
                  </div>
                  <div className="flex gap-6">
                    <div className="text-center">
                      <div className="font-bold text-gray-900">
                        {item.attendance}%
                      </div>
                      <div className="text-xs text-gray-500">Attendance</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-gray-900">
                        {item.performance}%
                      </div>
                      <div className="text-xs text-gray-500">Performance</div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Progress value={item.attendance} className="h-2" />
                  <Progress
                    value={item.performance}
                    className="h-2 bg-blue-100"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link href="/principal/students">
          <Button className="h-auto py-4 w-full flex flex-col gap-2">
            <Users className="w-6 h-6" />
            <span>Manage Students</span>
          </Button>
        </Link>
        <Link href="/superadmin/teacher">
          <Button
            variant="outline"
            className="h-auto py-4 w-full flex flex-col gap-2"
          >
            <GraduationCap className="w-6 h-6" />
            <span>Manage Staff</span>
          </Button>
        </Link>
        <Link href="/superadmin/student">
          <Button
            variant="outline"
            className="h-auto py-4 w-full flex flex-col gap-2"
          >
            <FileText className="w-6 h-6" />
            <span>Student Reports</span>
          </Button>
        </Link>
        <Link href="/superadmin/notice">
          <Button
            variant="outline"
            className="h-auto py-4 w-full flex flex-col gap-2"
          >
            <CalendarDays className="w-6 h-6" />
            <span>Create Announcement</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Page;

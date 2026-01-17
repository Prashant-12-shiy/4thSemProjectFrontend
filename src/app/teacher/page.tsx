"use client";
import React from "react";
import { FaBell, FaUpload, FaCheckCircle, FaUsers, FaBook, FaChartLine } from "react-icons/fa";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGetMyDetails } from "@/services/api/auth/TeacherApi";
// import { useGetMyCourses } from "@/services/api/auth/CourseApi";
// import { useGetTodaysAttendance, useGetAttendanceSummary } from "@/services/api/auth/AttendanceApi";
import { useGetClassStudent } from "@/services/api/auth/TeacherApi";
import { format } from "date-fns";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

const Page = () => {
  // Fetch teacher data
  const { data: teacherData, isLoading: loadingTeacher } = useGetMyDetails();
  // const { data: coursesData, isLoading: loadingCourses } = useGetMyCourses();
  // const { data: todaysAttendance, isLoading: loadingAttendance } = useGetTodaysAttendance();
  // const { data: attendanceSummary, isLoading: loadingSummary } = useGetAttendanceSummary();
  const { data: studentsData, isLoading: loadingStudents } = useGetClassStudent();

  // Calculate statistics
  // const totalCourses = coursesData?.length || 0;
  const totalStudents = studentsData?.length || 0;
  
  // Calculate today's attendance for teacher's classes
  // const teacherCourses = coursesData || [];
  // const todaysPresentStudents = todaysAttendance?.filter(
  //   (att: any) => att.status === 'present'
  // ).length || 0;

  // const attendanceRate = totalStudents > 0 
  //   ? Math.round((todaysPresentStudents / totalStudents) * 100) 
  //   : 0;

  // Pending assignments (you'll need to create this API)
  const pendingAssignments = 12; // Mock data - replace with actual API

  // Loading state
  const isLoading = loadingTeacher
  //  || loadingCourses || loadingAttendance;

  // Quick stats cards data
  const statsCards = [
    {
      title: "My Courses",
      // value: totalCourses,
      icon: FaBook,
      color: "blue",
      link: "/teacher/courses"
    },
    {
      title: "Total Students",
      value: totalStudents,
      icon: FaUsers,
      color: "green",
      link: "/teacher/students"
    },
    {
      title: "Today's Attendance",
      // value: `${attendanceRate}%`,
      icon: FaChartLine,
      color: "purple",
      link: "/teacher/attendance"
    },
    {
      title: "Pending Assignments",
      value: pendingAssignments,
      icon: FaCheckCircle,
      color: "orange",
      link: "/teacher/assignments"
    }
  ];

  if (isLoading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Skeleton className="h-10 w-64 mb-2" />
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-40 rounded-full" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {teacherData?.name || "Teacher"}
          </h1>
          <p className="text-gray-600 mt-2">
            Here's your teaching dashboard for today
          </p>
        </div>
        <div className="flex items-center gap-4">
          {/* <div className="relative">
            <FaBell className="text-2xl text-gray-600 cursor-pointer hover:text-gray-900" />
            <Badge className="absolute -top-2 -right-2 px-1 min-w-5 h-5 flex items-center justify-center">
              3
            </Badge>
          </div> */}
          <Link href="/teacher/attendance">
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              Mark Attendance
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((stat, index) => (
          <Link href={stat.link} key={index}>
            <Card className="border shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${
                    stat.color === 'blue' ? 'bg-blue-100' :
                    stat.color === 'green' ? 'bg-green-100' :
                    stat.color === 'purple' ? 'bg-purple-100' : 'bg-orange-100'
                  }`}>
                    <stat.icon className={`text-xl ${
                      stat.color === 'blue' ? 'text-blue-600' :
                      stat.color === 'green' ? 'text-green-600' :
                      stat.color === 'purple' ? 'text-purple-600' : 'text-orange-600'
                    }`} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-gray-600">{stat.title}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - My Courses */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaBook className="text-xl" />
              My Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* <div className="space-y-4">
              {loadingCourses ? (
                <Skeleton className="h-20" />
              ) : coursesData && coursesData.length > 0 ? (
                coursesData.slice(0, 5).map((course: any) => (
                  <div
                    key={course._id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900">{course.name}</h4>
                      <div className="flex items-center gap-4 mt-2">
                        <Badge variant="outline">{course.code}</Badge>
                        <span className="text-sm text-gray-500">
                          {course.classes?.name || "No class assigned"}
                        </span>
                        <span className="text-sm text-gray-500">
                          {course.credits} credits
                        </span>
                      </div>
                    </div>
                    <Link href={`/teacher/courses/${course._id}`}>
                      <Button variant="ghost" size="sm">View</Button>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <FaBook className="text-4xl text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No courses assigned yet</p>
                  <Link href="/teacher/courses">
                    <Button variant="outline" className="mt-4">Browse Courses</Button>
                  </Link>
                </div>
              )}
            </div> */}
            
            {/* Attendance Overview */}
            {/* <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Today's Attendance</span>
                    <span className="font-medium">{attendanceRate}%</span>
                  </div>
                  <Progress value={attendanceRate} className="h-2" />
                  <p className="text-sm text-gray-500">
                    {todaysPresentStudents} out of {totalStudents} students present
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Overall Average</span>
                    <span className="font-medium">
                      {attendanceSummary?.average || 85}%
                    </span>
                  </div>
                  <Progress value={attendanceSummary?.average || 85} className="h-2 bg-green-100" />
                  <p className="text-sm text-gray-500">
                    Monthly attendance average
                  </p>
                </div>
              </div>
            </div> */}
          </CardContent>
        </Card>

        {/* Right Column - Quick Actions & Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaCheckCircle className="text-xl" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Link href="/teacher/assignments/create">
                <Button className="w-full flex items-center justify-center gap-2 py-6">
                  <FaUpload />
                  Upload Assignment
                </Button>
              </Link>
              
              <Link href="/teacher/attendance">
                <Button variant="outline" className="w-full flex items-center justify-center gap-2 py-6">
                  <FaUsers />
                  Take Attendance
                </Button>
              </Link>

              <Link href="/teacher/grades">
                <Button variant="outline" className="w-full flex items-center justify-center gap-2 py-6">
                  <FaChartLine />
                  Enter Grades
                </Button>
              </Link>

              {/* Today's Date */}
              <div className="pt-6 border-t">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Today is</h4>
                  <p className="text-2xl font-bold text-blue-700">
                    {format(new Date(), "EEEE")}
                  </p>
                  <p className="text-blue-600">
                    {format(new Date(), "MMMM d, yyyy")}
                  </p>
                </div>
              </div>

              {/* Upcoming Deadlines */}
              <div className="pt-4">
                <h4 className="font-medium text-gray-900 mb-3">Upcoming Deadlines</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <p className="font-medium">Math Assignment</p>
                      <p className="text-sm text-gray-500">Due tomorrow</p>
                    </div>
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                      Urgent
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Science Project</p>
                      <p className="text-sm text-gray-500">Due in 3 days</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Students Activity */}
      {studentsData && studentsData.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {studentsData.slice(0, 5).map((student: any) => (
                <div key={student._id} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl font-bold text-blue-600">
                      {student.name?.charAt(0) || "S"}
                    </span>
                  </div>
                  <h4 className="font-medium text-gray-900 truncate">
                    {student.name}
                  </h4>
                  {/* <p className="text-sm text-gray-500">
                    {student.classes?.name || "No class"}
                  </p> */}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Page;
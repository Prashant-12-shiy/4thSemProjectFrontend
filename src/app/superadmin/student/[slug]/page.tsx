"use client";
import { useStudent } from "@/context/StudentContext";
import { useGetStudentById } from "@/services/api/auth/StudentApi";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Page = () => {
  const { studentId } = useStudent();
  console.log(studentId);

  // const { data: studentData } = useGetStudentById(studentId || "");

  const studentData = {
    name: "John Doe",
    email: "john.doe@example.com",
    rollNumber: "12345",
    class: { name: "10th Grade" },
    guardianName: "Jane Doe",
    guardianContact: "+1234567890",
    academicDetails: {
      stream: "Science",
      subjects: ["Math", "Physics", "Chemistry"],
      gpa: 3.8,
      rank: 5,
    },
    performance: {
      exams: [
        { subject: "Math", score: 95 },
        { subject: "Physics", score: 88 },
        { subject: "Chemistry", score: 90 },
      ],
      extracurricular: "Won 1st place in Science Fair",
    },
    attendance: {
      totalDays: 180,
      attendedDays: 172,
      percentage: "95.6%",
    },
    financial: {
      feeStatus: "Paid",
      scholarship: "Merit-Based Scholarship",
      fines: "$0",
    },
    disciplinary: {
      warnings: "None",
      suspensions: "None",
    },
  };
  return (
    <div className="p-4">
      {/* Basic Information */}
      <div className="flex justify-between mb-6">
        <Image
          src="/me.png"
          alt="student"
          width={100}
          height={100}
          className="object-contain rounded-full"
        />
        <div className="w-[300px] text-start">
          <h2 className="text-lg font-bold mb-2">Basic Information</h2>
          <p>Name: {studentData?.name || "N/A"}</p>
          <p>Email: {studentData?.email || "N/A"}</p>
          <p>Roll Number: {studentData?.rollNumber || "N/A"}</p>
          <p>Class: {studentData?.class?.name || "N/A"}</p>
        </div>
      </div>

    
      {/* Academic Details */}
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-2">Academic Details</h2>
        <p>Stream: {studentData?.academicDetails?.stream || "N/A"}</p>
        <p>Subjects: {studentData?.academicDetails?.subjects.join(", ") || "N/A"}</p>
        <p>GPA: {studentData?.academicDetails?.gpa || "N/A"}</p>
        <p>Rank: {studentData?.academicDetails?.rank || "N/A"}</p>
      </div>

      {/* Performance */}
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-2">Performance</h2>
        <ul>
          {studentData?.performance?.exams.map((exam, index) => (
            <li key={index}>
              {exam.subject}: {exam.score}%
            </li>
          ))}
        </ul>
        <p>Extracurricular: {studentData?.performance?.extracurricular || "N/A"}</p>
      </div>

      {/* Attendance */}
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-2">Attendance</h2>
        <p>Total Days: {studentData?.attendance?.totalDays || "N/A"}</p>
        <p>Attended Days: {studentData?.attendance?.attendedDays || "N/A"}</p>
        <p>Percentage: {studentData?.attendance?.percentage || "N/A"}</p>
      </div>

      {/* Financial Records */}
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-2">Financial Records</h2>
        <p>Fee Status: {studentData?.financial?.feeStatus || "N/A"}</p>
        <p>Scholarship: {studentData?.financial?.scholarship || "N/A"}</p>
        <p>Fines: {studentData?.financial?.fines || "N/A"}</p>
      </div>

      {/* Disciplinary Records */}
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-2">Disciplinary Records</h2>
        <p>Warnings: {studentData?.disciplinary?.warnings || "N/A"}</p>
        <p>Suspensions: {studentData?.disciplinary?.suspensions || "N/A"}</p>
      </div>

      {/* Guardian Information */}
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-2">Guardian Information</h2>
        <p>Guardian Name: {studentData?.guardianName || "N/A"}</p>
        <p>Guardian Contact: {studentData?.guardianContact || "N/A"}</p>
      </div>
    </div>
  );
};

export default Page;

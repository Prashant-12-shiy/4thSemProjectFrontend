"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetGrade } from "@/services/api/auth/StudentApi";
import { Search, BookOpen, Star, CheckCircle, XCircle } from "lucide-react";
import React, { useState } from "react";

const Page = () => {
  const { data: gradeData, isLoading } = useGetGrade();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter grades based on search query
  const filteredGrades = gradeData?.filter((grade: any) =>
    grade?.course?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen dark:bg-gray-900">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
          Grade Record
        </h1>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <Input
            type="text"
            placeholder="Search grades by subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>
      </div>

      {/* Grade Table Section */}
      <Card className="bg-white rounded-lg shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Star className="text-purple-500 dark:text-purple-400" />
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
              Grade Summary
            </CardTitle>
          </div>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            View your grades for each subject
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredGrades?.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-700 font-semibold dark:text-gray-300">
                    Subject Name
                  </TableHead>
                  <TableHead className="text-gray-700 font-semibold dark:text-gray-300">
                    First Term
                  </TableHead>
                  <TableHead className="text-gray-700 font-semibold dark:text-gray-300">
                    Second Term
                  </TableHead>
                  <TableHead className="text-gray-700 font-semibold dark:text-gray-300">
                    Third Term
                  </TableHead>
                  <TableHead className="text-gray-700 font-semibold dark:text-gray-300">
                    Final Term
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGrades.map((grade: any, index: number) => (
                  <TableRow
                    key={index}
                    className="hover:bg-gray-50 transition-colors dark:hover:bg-gray-700"
                  >
                    <TableCell className="font-medium text-gray-900 dark:text-white">
                      {grade?.course?.name}
                    </TableCell>
                    {grade?.termGrades
                      ?.sort((a: any, b: any) => {
                        const termOrder = ["First", "Second", "Third", "Final"];
                        return (
                          termOrder.indexOf(a.term) - termOrder.indexOf(b.term)
                        );
                      })
                      .map((termgrade: any, index: number) => (
                        <TableCell key={index}>
                          <div className="flex items-center gap-3">
                            {termgrade?.mark >= 42 ? (
                              <CheckCircle className="text-green-500 w-5 h-5" />
                            ) : (
                              <XCircle className="text-red-500 w-5 h-5" />
                            )}
                            <div>
                              <span className="text-gray-900 dark:text-white">
                                {termgrade?.mark} Mark
                              </span>{" "}
                              <br />
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {termgrade?.grade} ({termgrade?.remarks})
                              </span>
                            </div>
                          </div>
                        </TableCell>
                      ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 py-8">
              <BookOpen className="text-gray-400 w-12 h-12 dark:text-gray-500" />
              <p className="text-gray-500 dark:text-gray-400">
                No grades found.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
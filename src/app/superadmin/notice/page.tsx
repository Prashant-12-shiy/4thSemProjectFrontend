"use client";
import AddNoticeForm from "@/components/superadminComponents/forms/AddNoticeForm";
import UpdateNoticeForm from "@/components/superadminComponents/forms/UpdateNoticeForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NoticeData, useGetAllNotice } from "@/services/api/auth/NoticeApi";
import { format } from "date-fns";
import { Megaphone, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

const Page = () => {
  const { data: NoticesData } = useGetAllNotice();

  const pastNotices = NoticesData?.filter((Notice: NoticeData) => {
    return new Date(Notice.date) < new Date();
  });

  const upcomingNotices = NoticesData?.filter((Notice: NoticeData) => {
    return new Date(Notice.date) > new Date();
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen dark:bg-gray-900">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Notices</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage all notices and their details.
          </p>
        </div>
        <AddNoticeForm />
      </div>

      {/* Timeline Layout */}
      <div className="flex flex-col gap-8">
        {/* Upcoming Notices */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Upcoming Notices
          </h2>
          <div className="space-y-6">
            {upcomingNotices && upcomingNotices.length > 0 ? (
              upcomingNotices.map((Notice, index) => (
                <motion.div
                  key={index}
                  className="relative pl-8 border-l-4 border-purple-500 dark:border-purple-700"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute -left-2.5 top-0 w-5 h-5 bg-purple-500 dark:bg-purple-700 rounded-full"></div>
                  <Card className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg text-gray-900 dark:text-white">
                          {Notice?.name}
                        </CardTitle>
                        <UpdateNoticeForm NoticeDetails={Notice} NoticeId={Notice._id} />
                      </div>
                      <CardDescription className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{format(Notice?.date, "yyyy/MM/dd")}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {Notice?.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 py-8">
                <Megaphone className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                <p className="text-gray-500 dark:text-gray-400">
                  No upcoming notices available.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Past Notices */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Past Notices
          </h2>
          <div className="space-y-6">
            {pastNotices && pastNotices.length > 0 ? (
              pastNotices.map((Notice, index) => (
                <motion.div
                  key={index}
                  className="relative pl-8 border-l-4 border-gray-300 dark:border-gray-600"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute -left-2.5 top-0 w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                  <Card className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg text-gray-900 dark:text-white">
                          {Notice?.name}
                        </CardTitle>
                        <UpdateNoticeForm NoticeDetails={Notice} NoticeId={Notice._id} />
                      </div>
                      <CardDescription className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{format(Notice?.date, "yyyy/MM/dd")}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {Notice?.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 py-8">
                <Megaphone className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                <p className="text-gray-500 dark:text-gray-400">
                  No past notices available.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
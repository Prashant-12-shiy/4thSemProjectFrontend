"use client"
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
import { Cog } from "lucide-react";
import React from "react";

const page = () => {
  const {data: NoticesData} = useGetAllNotice();
  console.log(NoticesData);

  const pastNotices = NoticesData?.filter((Notice: NoticeData) => {
    return new Date(Notice.date) < new Date();
  });
  
  const upcomingNotices = NoticesData?.filter((Notice: NoticeData) => {
    return new Date(Notice.date) > new Date();
  });

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Notices</h1>
        <AddNoticeForm/>
      </div>

      <div className="flex gap-5 *:w-full *:border *:border-black *:rounded-sm *:p-5 mt-5   max-md:flex-col">
        <div>
          <h2 className="font-semibold text-xl">Past Notices</h2>
          <div>
            {pastNotices?.map((Notice, index) => (
              <Card key={index} className="mt-4">
                <CardHeader>
                    <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{Notice?.name}</CardTitle>
                  <UpdateNoticeForm NoticeDetails={Notice} NoticeId={Notice._id}/>
                    </div>
                  <CardDescription className="text-sm">
                    Date: {format(Notice?.date, 'yyyy/MM/dd')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{Notice?.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-xl">Upcoming Notices</h2>
          <div>
            {upcomingNotices?.map((Notice, index) => (
              <Card key={index} className="mt-4">
                <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{Notice?.name}</CardTitle>
                  <UpdateNoticeForm NoticeDetails={Notice} NoticeId={Notice._id}/>
                    </div>
                  <CardDescription className="text-sm">
                    Date: {format(Notice?.date, 'yyyy/MM/dd')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{Notice?.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

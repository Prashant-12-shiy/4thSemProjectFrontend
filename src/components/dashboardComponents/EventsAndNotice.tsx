"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetEvent } from "@/services/api/auth/EventApi";
import { useGetNotice } from "@/services/api/auth/NoticeApi";
import { format } from "date-fns";
import { Calendar, Bell, AlertCircle } from "lucide-react";
import React from "react";

const EventsAndNotice = () => {
  const { data: eventData, isLoading: isEventLoading } = useGetEvent();
  const { data: noticeData, isLoading: isNoticeLoading } = useGetNotice();

  const upcomingEvent = eventData ? eventData[0] : null;
  const upcomingNotice = noticeData ? noticeData[0] : null;

  if (isEventLoading || isNoticeLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      {/* Upcoming Event Card */}
      {upcomingEvent ? (
        <Card className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calendar className="text-purple-500" />
              <CardTitle className="text-xl font-semibold text-gray-900">
                {upcomingEvent.name}
              </CardTitle>
            </div>
            <CardDescription className="text-gray-500">
              Date:{" "}
              {upcomingEvent.date
                ? format(upcomingEvent.date, "yyyy/MM/dd")
                : "No Date Available"}
              , Venue: {upcomingEvent.venue}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700">
              {upcomingEvent.description}
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calendar className="text-gray-400" />
              <CardTitle className="text-xl font-semibold text-gray-900">
                No Upcoming Event
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              There are no upcoming events at the moment.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Notice Card */}
      {upcomingNotice ? (
        <Card className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="text-blue-500" />
              <CardTitle className="text-xl font-semibold text-gray-900">
                {upcomingNotice.name}
              </CardTitle>
            </div>
            <CardDescription className="text-gray-500">
              Date:{" "}
              {upcomingNotice.date
                ? format(upcomingNotice.date, "yyyy/MM/dd")
                : "No Date Available"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700">
              {upcomingNotice.description}
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-white rounded-lg shadow-sm border border-gray-200">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="text-gray-400" />
              <CardTitle className="text-xl font-semibold text-gray-900">
                No Upcoming Notice
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              There are no upcoming notices at the moment.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EventsAndNotice;
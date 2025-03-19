"use client";
import { PageLoader } from "@/components/page-loader";
import AddEventForm from "@/components/superadminComponents/forms/AddEventForm";
import UpdateEventForm from "@/components/superadminComponents/forms/UpdateEventForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EventData, useGetAllEvent } from "@/services/api/auth/EventApi";
import { format } from "date-fns";
import { Calendar, MapPin, Clock } from "lucide-react";
import React from "react";

const Page = () => {
  const { data: eventsData, isLoading } = useGetAllEvent();

  const pastEvents = eventsData?.filter((event: EventData) => {
    return new Date(event.date) < new Date();
  });

  const upcomingEvents = eventsData?.filter((event: EventData) => {
    return new Date(event.date) > new Date();
  });

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen dark:bg-gray-900">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Events</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage all events and their details.
          </p>
        </div>
        <AddEventForm />
      </div>

      {/* Timeline Layout */}
      <div className="flex flex-col gap-8">
        {/* Upcoming Events */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Upcoming Events
          </h2>
          <div className="space-y-6">
            {upcomingEvents && upcomingEvents.length > 0 ? (
              upcomingEvents.map((event, index) => (
                <div
                  key={index}
                  className="relative pl-8 border-l-4 border-purple-500 dark:border-purple-700"
                >
                  <div className="absolute -left-2.5 top-0 w-5 h-5 bg-purple-500 dark:bg-purple-700 rounded-full"></div>
                  <Card className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg text-gray-900 dark:text-white">
                          {event?.name}
                        </CardTitle>
                        <UpdateEventForm eventDetails={event} eventId={event._id} />
                      </div>
                      <CardDescription className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{format(event?.date, "yyyy/MM/dd")}</span>
                        <MapPin className="w-4 h-4" />
                        <span>{event?.venue}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {event?.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 py-8">
                <Calendar className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                <p className="text-gray-500 dark:text-gray-400">
                  No upcoming events available.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Past Events */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Past Events
          </h2>
          <div className="space-y-6">
            {pastEvents && pastEvents.length > 0 ? (
              pastEvents.map((event, index) => (
                <div
                  key={index}
                  className="relative pl-8 border-l-4 border-gray-300 dark:border-gray-600"
                >
                  <div className="absolute -left-2.5 top-0 w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                  <Card className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg text-gray-900 dark:text-white">
                          {event?.name}
                        </CardTitle>
                        <UpdateEventForm eventDetails={event} eventId={event._id} />
                      </div>
                      <CardDescription className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{format(event?.date, "yyyy/MM/dd")}</span>
                        <MapPin className="w-4 h-4" />
                        <span>{event?.venue}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {event?.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 py-8">
                <Calendar className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                <p className="text-gray-500 dark:text-gray-400">
                  No past events available.
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
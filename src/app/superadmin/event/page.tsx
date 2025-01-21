"use client"
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
import { Cog } from "lucide-react";
import React from "react";

const page = () => {
  const {data: eventsData} = useGetAllEvent();
  console.log(eventsData);

  const pastEvents = eventsData?.filter((event: EventData) => {
    return new Date(event.date) < new Date();
  });
  
  const upcomingEvents = eventsData?.filter((event: EventData) => {
    return new Date(event.date) > new Date();
  });

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Events</h1>
        <AddEventForm/>
      </div>

      <div className="flex gap-5 *:w-full *:border *:border-black *:rounded-sm *:p-5 mt-5   max-md:flex-col">
        <div>
          <h2 className="font-semibold text-xl">Past Events</h2>
          <div>
            {pastEvents?.map((event, index) => (
              <Card key={index} className="mt-4">
                <CardHeader>
                    <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{event?.name}</CardTitle>
                  <UpdateEventForm eventDetails={event} eventId={event._id}/>
                    </div>
                  <CardDescription className="text-sm">
                    Date: {format(event?.date, 'yyyy/MM/dd')}, Venue: {event?.venue}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{event?.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-xl">Upcoming Events</h2>
          <div>
            {upcomingEvents?.map((event, index) => (
              <Card key={index} className="mt-4">
                <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{event?.name}</CardTitle>
                  <UpdateEventForm eventDetails={event} eventId={event._id}/>
                    </div>
                  <CardDescription className="text-sm">
                    Date: {format(event?.date, 'yyyy/MM/dd')}, Venue: {event?.venue}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{event?.description}</p>
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

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

const EventsAndNotice = () => {
  const { data: eventData } = useGetEvent();
  const { data: noticeData } = useGetNotice();

  const upcomingEvent = eventData ? eventData[0] : null;
  const upcomingNotice = noticeData ? noticeData[0] : null;
  console.log(noticeData);

  return (
    <div className="border border-black/50 w-full rounded-sm px-4">
      <Card className="my-4 bg-red-300">
        <CardHeader>
          <CardTitle className="text-xl">{upcomingEvent?.name}</CardTitle>
          <CardDescription>
            {" "}
            Date:{" "}
            {upcomingEvent?.date
              ? format(upcomingEvent?.date, "yyyy/MM/dd")
              : "No Date Avaiable"}
            , Venue: {upcomingEvent?.venue}
          </CardDescription>
        </CardHeader>
        <CardContent className="">
          <p className="text-sm">{upcomingEvent?.description}</p>
        </CardContent>
      </Card>

      <Card className="my-4 bg-blue-300">
        <CardHeader>
          <CardTitle className="text-xl">{upcomingNotice?.name}</CardTitle>
          <CardDescription>
            {" "}
            Date:{" "}
            {upcomingNotice?.date
              ? format(upcomingNotice?.date, "yyyy/MM/dd")
              : "No Date Avaiable"}
          </CardDescription>
        </CardHeader>
        <CardContent className="">
          <p className="text-sm">{upcomingNotice?.description}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventsAndNotice;

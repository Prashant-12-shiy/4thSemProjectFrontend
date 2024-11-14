"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetEvent } from '@/services/api/auth/EventApi';
import { format } from 'date-fns';

const EventsAndNotice = () => {

  const {data: eventData} = useGetEvent();

  const upcomingEvent = eventData ? eventData[0] : null;

  return (
    <div className='border border-black/50 w-full rounded-sm px-4'>
    <Card className='my-4 bg-red-300'>
      <CardHeader>
        <CardTitle className='text-xl'>{upcomingEvent?.name}</CardTitle>
        <CardDescription> Date: {upcomingEvent?.date ? format(upcomingEvent?.date, 'yyyy/MM/dd'): "No Date Avaiable"}, Venue: {upcomingEvent?.venue}</CardDescription>
      </CardHeader>
      <CardContent className=''>
        <p className='text-sm'>{upcomingEvent?.description}</p>
      </CardContent>
    </Card>

    <Card className='my-4 bg-blue-300'>
      <CardHeader>
        <CardTitle className='text-xl'>Important Notice</CardTitle>
        <CardDescription>Upcoming Exam (2024/5/8)</CardDescription>
      </CardHeader>
      <CardContent className=''>
        <p className='text-sm'>This is a request for all the teachers to prepare the students for upcoming 3rd Term Exam. Also Prepare the Question Paper of respective Subject and Submit me before June 4</p>
      </CardContent>
    </Card>
</div>
  )
}

export default EventsAndNotice
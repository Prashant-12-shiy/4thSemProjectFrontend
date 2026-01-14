// "use client";

// import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";

// export default function AttendanceHistory({ attendance} : any) {
//   const [range, setRange] = useState(null);
//   const [open, setOpen] = useState(false);

//   const now = new Date();

//   const filterAttendance = (months: number) => {
//     const pastDate = new Date();
//     pastDate.setMonth(now.getMonth() - months);

//     return attendance
//       .filter((a: any) => new Date(a.date) >= pastDate)
//       .sort((a: any, b: any) => new Date(b.date) - new Date(a.date));
//   };

//   const getFilteredData = () => {
//     if (range === 1) return filterAttendance(1);
//     if (range === 3) return filterAttendance(3);
//     if (range === 12) return filterAttendance(12);
//     return [];
//   };

//   const filteredAttendance = getFilteredData();

//   return (
//     <Card className="w-full">
//       <CardHeader>
//         <CardTitle>Attendance History</CardTitle>
//       </CardHeader>

//       <CardContent className="space-y-4">
//         {/* Buttons */}
//         <div className="flex flex-wrap gap-2">
//           <Button
//             variant="outline"
//             onClick={() => {
//               setRange(1);
//               setOpen(true);
//             }}
//           >
//             Show 1 Month Attendance
//           </Button>

//           <Button
//             variant="outline"
//             onClick={() => {
//               setRange(3);
//               setOpen(true);
//             }}
//           >
//             Show 3 Months Attendance
//           </Button>

//           <Button
//             variant="outline"
//             onClick={() => {
//               setRange(12);
//               setOpen(true);
//             }}
//           >
//             Show 1 Year Attendance
//           </Button>
//         </div>

//         {/* Collapsible */}
//         <Collapsible open={open} onOpenChange={setOpen}>
//           <CollapsibleTrigger asChild>
//             {filteredAttendance.length > 0 && (
//               <Button variant="ghost" className="w-full">
//                 Hide Attendance
//               </Button>
//             )}
//           </CollapsibleTrigger>

//           <CollapsibleContent className="space-y-3 mt-3">
//             {filteredAttendance.length === 0 ? (
//               <p className="text-sm text-muted-foreground">
//                 No attendance records found for this period.
//               </p>
//             ) : (
//               filteredAttendance.map((record : any) => (
//                 <Card key={record._id} className="border">
//                   <CardContent className="flex items-center justify-between p-4">
//                     <div>
//                       <p className="font-medium">
//                         {new Date(record.date).toLocaleDateString()}
//                       </p>
//                       <p className="text-sm text-muted-foreground">
//                         {new Date(record.date).toLocaleDateString("en-US", {
//                           weekday: "long",
//                         })}
//                       </p>
//                     </div>

//                     <Badge
//                       variant={
//                         record.status === "Present"
//                           ? "success"
//                           : "destructive"
//                       }
//                     >
//                       {record.status}
//                     </Badge>
//                   </CardContent>
//                 </Card>
//               ))
//             )}
//           </CollapsibleContent>
//         </Collapsible>
//       </CardContent>
//     </Card>
//   );
// }

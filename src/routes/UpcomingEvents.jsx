// import React from 'react'

// const TodaysEvent = () => {
//   return (
//     <div>TodaysEvent</div>
//   )
// }

// export default TodaysEvent

import React, { useEffect, useState } from "react";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosConfig";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CreateEvent from "@/components/CreateEvent";
import EventTable from "@/components/EventTable";

const UpcomingEvents = () => {
  const navigate = useNavigate();
  const organization = useSelector(
    (state) => state?.organizationSlice?.organizationData.id
  );
  console.log("organization", organization);

  const [upcomingEvents, setUpcomingEvents] = useState([]);

  const headers = {
    // Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    // Other custom headers if needed
  };

  console.log("token");
  console.log(upcomingEvents);
  useEffect(() => {
    const fetchCompletedEvents = async () => {
      try {
        const response = await axios.get("/events/organization/Upcoming/", {
          params: { organization },
        });
        console.log("error fetching completed events", response.data);
        // Handle the response data
        setUpcomingEvents(response.data);
      } catch (error) {
        // console.error("Error fetching events:", error);
        // Handle errors
      }
    };

    fetchCompletedEvents();
  }, []);

  return (
    <main className="flex flex-1 flex-col  gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center ">
        <h1 className="font-semibold text-lg md:text-2xl">Upcoming Events</h1>
        <div className="ml-auto " size="sm">
          <Button
            onClick={() => {
              navigate("/events/CreateEvent");
            }}
            className="ml-auto"
            size="sm"
          >
            Create New Event
          </Button>
        </div>
      </div>
      <Card>
        <CardContent className="p-0">
          {upcomingEvents && (
            // <Table>
            //   <TableHeader>
            //     <TableRow>
            //       <TableHead className="w-[100px]">Date</TableHead>
            //       <TableHead className="flex-1">Event</TableHead>
            //       <TableHead className="hidden md:table-cell">
            //         Location
            //       </TableHead>
            //       <TableHead className="hidden md:table-cell">
            //         Description
            //       </TableHead>
            //       <TableHead className="w-[50px]" />
            //     </TableRow>
            //   </TableHeader>
            //   <TableBody>
            //     {events?.map((event) => (
            //       <TableRow
            //         className="hover:bg-gray-100/40 dark:hover:bg-gray-800/40"
            //         key={event.id}
            //       >
            //         <TableCell>{formatDate(event.date)}</TableCell>
            //         <TableCell className="font-semibold">
            //           {event.title}
            //         </TableCell>
            //         <TableCell className="hidden md:table-cell">
            //           {event.location}
            //         </TableCell>
            //         <TableCell className="hidden md:table-cell">
            //           {event.description}
            //         </TableCell>
            //         <TableCell className="text-right">
            //           <Button
            //             className="rounded-full"
            //             size="icon"
            //             variant="ghost"
            //           >
            //             <ChevronRightIcon className="w-4 h-4" />
            //             <span className="sr-only">View event</span>
            //           </Button>
            //         </TableCell>
            //       </TableRow>
            //     ))}
            //   </TableBody>
            // </Table>
            <EventTable events={upcomingEvents} />
          )}
          {/* <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Date</TableHead>
                <TableHead className="flex-1">Event</TableHead>
                <TableHead className="hidden md:table-cell">
                  Attendees
                </TableHead>
                <TableHead className="hidden md:table-cell">Revenue</TableHead>
                <TableHead className="w-[50px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="hover:bg-gray-100/40 dark:hover:bg-gray-800/40">
                <TableCell>Oct 15, 2023</TableCell>
                <TableCell className="font-semibold">
                  Annual Conference
                </TableCell>
                <TableCell className="hidden md:table-cell">250</TableCell>
                <TableCell className="hidden md:table-cell">$5,000</TableCell>
                <TableCell className="text-right">
                  <Button className="rounded-full" size="icon" variant="ghost">
                    <ChevronRightIcon className="w-4 h-4" />
                    <span className="sr-only">View event</span>
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow className="hover:bg-gray-100/40 dark:hover:bg-gray-800/40">
                <TableCell>Nov 20, 2023</TableCell>
                <TableCell className="font-semibold">Music Festival</TableCell>
                <TableCell className="hidden md:table-cell">500</TableCell>
                <TableCell className="hidden md:table-cell">$10,000</TableCell>
                <TableCell className="text-right">
                  <Button className="rounded-full" size="icon" variant="ghost">
                    <ChevronRightIcon className="w-4 h-4" />
                    <span className="sr-only">View event</span>
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow className="hover:bg-gray-100/40 dark:hover:bg-gray-800/40">
                <TableCell>Dec 5, 2023</TableCell>
                <TableCell className="font-semibold">Holiday Gala</TableCell>
                <TableCell className="hidden md:table-cell">100</TableCell>
                <TableCell className="hidden md:table-cell">$2,000</TableCell>
                <TableCell className="text-right">
                  <Button className="rounded-full" size="icon" variant="ghost">
                    <ChevronRightIcon className="w-4 h-4" />
                    <span className="sr-only">View event</span>
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow className="hover:bg-gray-100/40 dark:hover:bg-gray-800/40">
                <TableCell>Jan 10, 2024</TableCell>
                <TableCell className="font-semibold">
                  New Year's Party
                </TableCell>
                <TableCell className="hidden md:table-cell">300</TableCell>
                <TableCell className="hidden md:table-cell">$6,000</TableCell>
                <TableCell className="text-right">
                  <Button className="rounded-full" size="icon" variant="ghost">
                    <ChevronRightIcon className="w-4 h-4" />
                    <span className="sr-only">View event</span>
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table> */}
        </CardContent>
      </Card>
    </main>
  );
};

export default UpcomingEvents;

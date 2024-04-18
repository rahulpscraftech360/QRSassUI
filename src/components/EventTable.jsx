/* eslint-disable react/prop-types */
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const EventTable = ({ events }) => {
  console.log(events);
  const navigate = useNavigate();
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="flex-1">Event</TableHead>
          <TableHead className="w-[200px]">Start Date</TableHead>
          <TableHead className="w-[200px]">End Date</TableHead>

          <TableHead className="hidden md:table-cell">Location</TableHead>
          <TableHead className="hidden md:table-cell">Description</TableHead>
          <TableHead className="hidden md:table-cell">Guests</TableHead>
          <TableHead className="hidden md:table-cell">Total Tickets</TableHead>
          <TableHead className="w-[50px]" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {events?.map((event) => (
          <TableRow
            onClick={() => {
              navigate(`/events/${event.id}`);
            }}
            className="hover:bg-gray-100/40 cursor-pointer dark:hover:bg-gray-800/40"
            key={event.id}
          >
            <TableCell className="font-semibold">{event.title}</TableCell>
            <TableCell>{formatDate(event.startDate)}</TableCell>
            <TableCell>{formatDate(event.endDate)}</TableCell>

            <TableCell className="hidden md:table-cell">
              {event.location}
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {event.description}
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {event.participants.length}
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {event.tickets.length}
            </TableCell>

            <TableCell className="text-right">
              <Button
                className="rounded-full"
                onClick={() => {
                  navigate(`/events/${event.id}`);
                }}
                size="icon"
                variant="ghost"
              >
                <ChevronRightIcon className="w-4 h-4" />
                <span className="sr-only">View event</span>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <div className="flex items-center justify-end space-x-2 py-4 px-4">
          <Button
            variant="outline"
            size="sm"
            // onClick={() => table.previousPage()}
            // disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            // onClick={() => table.nextPage()}
            // disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </TableFooter>
    </Table>
  );
};

export default EventTable;

function ChevronRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

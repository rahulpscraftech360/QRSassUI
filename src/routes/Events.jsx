import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CardContent, Card, CardHeader } from "@/components/ui/card";
import { format, intervalToDuration, parseISO } from "date-fns";

import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import CreateEvent from "@/components/CreateEvent";
import { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";
import { useSelector } from "react-redux";

export default function Events() {
  const isOrganization = useSelector(
    (state) => state.organizationSlice.organizationData
  );
  console.log("isOrganization", isOrganization);
  const [upComingEvents, setUpcomingEvents] = useState([]);
  const navigate = useNavigate();
  const [todaysEvent, setTodaysEvent] = useState([]);
  const [completedEvents, setCompletedEvents] = useState([]);
  console.log("completd", completedEvents);
  const organization = useSelector(
    (state) => state?.organizationSlice?.organizationData.id
  );
  const sortedAndSlicedEvents = upComingEvents
    ?.sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);
  console.log("sortedupcomming", sortedAndSlicedEvents);
  const sortedAndSlicedTodaysEvents = todaysEvent
    ?.sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 2);
  const sortedAndSlicedCompletedEvents = completedEvents
    ?.sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 2);

  console.log("token", sortedAndSlicedTodaysEvents);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/events/organization/Upcoming/", {
          params: { organization },
        });

        setUpcomingEvents(response.data);
        console.log("upCommingEvents", upComingEvents);
      } catch (error) {
        console.error("Error fetching upcoming events", error);
        // Handle errors
      }
    };
    const fetchTodaysEvents = async () => {
      try {
        const response = await axios.get("/events/today/", {
          params: { organization },
        });
        // console.log("eve", response.data);
        // Handle the response data
        setTodaysEvent(response.data);
      } catch (error) {
        console.error("Error fetching Todays events:", error);
        // Handle errors
      }
    };
    const fetchCompletedEvents = async () => {
      console.log("fetching completd", organization);
      try {
        const response = await axios.get("/events/expired/", {
          params: { organization },
        });

        console.log(" fetching completed events", response.data);
        // Handle the response data
        setCompletedEvents(response.data);
      } catch (error) {
        // console.error("Error fetching events:", error);
        // Handle errors
      }
    };

    fetchEvents();

    fetchTodaysEvents();

    fetchCompletedEvents();
  }, []);

  return (
    <div className="grid min-h-screen p-2 items-start gap-4 px-4  md:gap-8 md:px-10">
      <div className="flex flex-col gap-2"></div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="grid md:col-span-2 border-2 rounded-lg">
          <div className="flex items-center gap-2 m-3 md:m-0">
            <h1 className="text-2xl font-semibold">Upcoming Events</h1>
            <div className="ml-auto  md:mr-4" size="sm">
              <Button
                onClick={() => {
                  navigate("/events/CreateEvent");
                }}
                className="ml-auto "
                size="sm"
              >
                Create New Event
              </Button>
            </div>
          </div>
          <div className="flex px-4">
            <Link className="mr-auto underline " size="sm" to="all">
              All Events
            </Link>
            <Link className=" underline" to="upcoming">
              View all
            </Link>
          </div>

          <div className="">
            {sortedAndSlicedEvents?.map((event) => {
              // Parse the event date
              const eventStartDate = parseISO(event.startDate);
              const eventEndDate = parseISO(event.endDate);
              // Calculate duration until the event
              const duration = intervalToDuration({
                start: new Date(),
                end: eventStartDate,
              });

              return (
                <Card key={event._id}>
                  <CardContent
                    onClick={() => {
                      navigate(`/events/${event.id}`);
                    }}
                    className="flex items-center border gap-4 cursor-pointer  pt-5"
                  >
                    <img
                      alt="Event"
                      className="rounded-lg aspect-square object-cover "
                      height="120"
                      // style={{
                      //   backgroundImage: event?.backgroundImage
                      //     ? `url('${event.backgroundImage}')`
                      //     : "url('https://images.pexels.com/photos/2342400/pexels-photo-2342400.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
                      // }}
                      src={
                        event?.backgroundImage
                          ? `${event?.backgroundImage}`
                          : "/assets/16749.jpg"
                      }
                      width="120"
                    />
                    <div className="grid gap-2">
                      <h2 className="text-xl font-semibold">{event.title}</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Start: {format(eventStartDate, "MMMM dd, yyyy")}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        End: {format(eventEndDate, "MMMM dd, yyyy")}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {event.location}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {`${duration.days || 0} days ${
                          duration.hours || 0
                        } hours ${duration.minutes || 0} minutes`}
                      </p>
                    </div>
                    <Button
                      onClick={() => {
                        navigate(`/events/${event.id}`);
                      }}
                      className="ml-auto"
                      size="sm"
                    >
                      View
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          {/* <Card>
            <CardContent className="flex items-center gap-4">
              <img
                alt="Event image"
                className="rounded-lg aspect-square object-cover"
                height="96"
                src="/placeholder.svg"
                width="96"
              />
              <div className="grid gap-2">
                <h2 className="text-xl font-semibold">Music in the Park</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  August 15, 2023
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Central Park
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  2 days 4 hours 23 minutes
                </p>
              </div>
              <Button className="ml-auto" size="sm">
                View
              </Button>
            </CardContent>
          </Card> */}
          {/* <Card>
            <CardContent className="flex items-center gap-4">
              <img
                alt="Event image"
                className="rounded-lg aspect-square object-cover"
                height="96"
                src="/placeholder.svg"
                width="96"
              />
              <div className="grid gap-2">
                <h2 className="text-xl font-semibold">Food Truck Festival</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  September 10, 2023
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Waterfront Park
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  1 month 12 days
                </p>
              </div>
              <Button className="ml-auto" size="sm">
                View
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4">
              <img
                alt="Event image"
                className="rounded-lg aspect-square object-cover"
                height="96"
                src="/placeholder.svg"
                width="96"
              />
              <div className="grid gap-2">
                <h2 className="text-xl font-semibold">Art Exhibition</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  October 5, 2023
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Gallery of Modern Art
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  1 month 24 days
                </p>
              </div>
              <Button className="ml-auto" size="sm">
                View
              </Button>
            </CardContent>
          </Card> */}
        </div>
        <div className="grid gap-5 md:col-span-1 ">
          <Card>
            <CardHeader className="flex items-center gap-4">
              <h2 className="text-base font-semibold">Today's Events</h2>
              <Link className="ml-auto underline" to="/events/today">
                View all
              </Link>
            </CardHeader>

            {sortedAndSlicedTodaysEvents?.map((event) => {
              // Parse the event date
              // const eventDate = parseISO(event.date);
              const eventStartDate = parseISO(event.startDate);
              const eventEndDate = parseISO(event.endDate);
              // Calculate duration until the event
              const duration = intervalToDuration({
                start: new Date(),
                end: eventEndDate,
              });

              return (
                <Card className="gap-4 mt-3" key={event._id}>
                  <CardContent className="flex items-center gap-4 pt-2  ">
                    <img
                      alt="Event"
                      className="rounded-lg aspect-square object-cover"
                      height="96"
                      src="/assets/conferenc.webp"
                      width="96"
                    />
                    <div className="grid gap-2">
                      <h2 className="text-xl font-semibold">{event.title}</h2>

                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Start:{format(eventStartDate, "MMMM dd, yyyy")}
                      </p>

                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        End:{format(eventEndDate, "MMMM dd, yyyy")}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {event.location}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {`${duration.days || 0} days ${
                          duration.hours || 0
                        } hours ${duration.minutes || 0} minutes`}
                      </p>
                    </div>
                    <Button
                      onClick={() => {
                        navigate(`/events/${event.id}`);
                      }}
                      className="ml-auto"
                      size="sm"
                    >
                      View
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
            {sortedAndSlicedTodaysEvents.length === 0 && (
              <div className="flex text-center justify-center gap-4 mb-3">
                <div>No events Todays</div>
              </div>
            )}

            {/* <CardContent className="flex items-center gap-4">
              <img
                alt="Event image"
                className="rounded-lg aspect-square object-cover"
                height="96"
                src="/src/assets/conferenc.webp"
                width="96"
              />
              <div className="grid gap-2">
                <h2 className="text-xl font-semibold">Conference 2023</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  February 20, 2023
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Convention Center
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  2 hours 34 minutes
                </p>
              </div>
              <Button className="ml-auto" size="sm">
                View
              </Button>
            </CardContent> */}
          </Card>
          <Card>
            <CardHeader className="flex items-center gap-4">
              <h2 className="text-base font-semibold">Completed Events</h2>
              <Link className="ml-auto underline" to="/events/completed">
                View all
              </Link>
            </CardHeader>
            {sortedAndSlicedCompletedEvents.map((event) => {
              // Parse the event date
              const eventStartDate = parseISO(event.startDate);
              const eventEndDate = parseISO(event.endDate);
              return (
                <Card key={event._id} className=" gap-4 mt-3">
                  <CardContent className="flex items-center gap-4 ">
                    <img
                      alt="Event image"
                      className="rounded-lg aspect-square object-cover"
                      height="96"
                      src="/assets/16749.jpg"
                      width="96"
                    />
                    <div className="grid gap-2">
                      <h2 className="text-xl font-semibold">{event.title} </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Start: {format(eventStartDate, "MMMM dd, yyyy")}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        End: {format(eventEndDate, "MMMM dd, yyyy")}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {event.location}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Expired
                      </p>
                    </div>
                    <Button
                      onClick={() => {
                        navigate(`/events/${event.id}`);
                      }}
                      className="ml-auto"
                      size="sm"
                    >
                      View
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </Card>
        </div>
      </div>
    </div>
  );
}

function BellIcon(props) {
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
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function CalendarIcon(props) {
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
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function DollarSignIcon(props) {
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
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function HomeIcon(props) {
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function MailIcon(props) {
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function Package2Icon(props) {
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
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}

function UsersIcon(props) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

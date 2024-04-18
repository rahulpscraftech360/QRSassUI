/**
 * v0 by Vercel.
 * @see https://v0.dev/t/aMcsTN9fXmr
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {
  CardDescription,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <>
      <div className="grid items-start gap-12 lg:grid-cols-2 lg:items-center lg:gap-20 xl:gap-24">
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Welcome to Your Event Platform
            </h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Everything you need to create amazing events. From small meetups
              to large conferences, we've got you covered. Easy to use. Powerful
              features. Let's get started.
            </p>
          </div>
          <div className="grid gap-4 sm:gap-8 md:gap-4 lg:gap-8">
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              href="#"
            >
              Create an Event
            </Link>
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
              href="#"
            >
              Manage Participants
            </Link>
          </div>
        </div>
        <div className="grid items-center gap-6">
          <img
            alt="Image"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center"
            height="310"
            src="/placeholder.svg"
            width="550"
          />
        </div>
      </div>
      <div className="w-full py-12 md:py-24 lg:py-32">
        <div className="container space-y-12 px-4 md:px-6">
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                All the tools you need
              </h2>
              <p className="max-w-[800px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Create beautiful event pages, manage registrations, and engage
                your audience with our all-in-one platform.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center justify-center space-y-1.5">
                <CalendarCheckIcon className="w-12 h-12" />
                <div className="text-sm font-medium">Agenda</div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-1.5">
                <CircleEllipsisIcon className="w-12 h-12" />
                <div className="text-sm font-medium">Engagement</div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-1.5">
                <TicketIcon className="w-12 h-12" />
                <div className="text-sm font-medium">Tickets</div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-1.5">
                <CameraIcon className="w-12 h-12" />
                <div className="text-sm font-medium">Live Streaming</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full py-12 md:py-24 lg:py-32">
        <div className="container space-y-12 px-4 md:px-6">
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Easy to use
              </h2>
              <p className="max-w-[800px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Our platform is designed to be user-friendly. You don't need to
                be a tech wizard to create an amazing event.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center justify-center space-y-1.5">
                <CalendarCheckIcon className="w-12 h-12" />
                <div className="text-sm font-medium">Agenda</div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-1.5">
                <CircleEllipsisIcon className="w-12 h-12" />
                <div className="text-sm font-medium">Engagement</div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-1.5">
                <TicketIcon className="w-12 h-12" />
                <div className="text-sm font-medium">Tickets</div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-1.5">
                <CameraIcon className="w-12 h-12" />
                <div className="text-sm font-medium">Live Streaming</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Paid Apps for Events</CardTitle>
          <CardDescription>
            Monetize your events with paid apps. Offer exclusive content to
            attendees.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="flex flex-col gap-1.5">
            <div className="text-sm font-medium">App Name</div>
            <div className="text-2xl font-bold tracking-tighter sm:text-3xl">
              AcmeCon 2023
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <CalendarCheckIcon className="w-4 h-4" />
              <div className="text-sm font-medium">Access to the schedule</div>
            </div>
            <div className="flex items-center gap-2">
              <CircleEllipsisIcon className="w-4 h-4" />
              <div className="text-sm font-medium">
                Engagement with other attendees
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CameraIcon className="w-4 h-4" />
              <div className="text-sm font-medium">
                Live streaming of keynotes
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button size="sm" variant="outline">
            Purchase
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Self-Check-in</CardTitle>
          <CardDescription>
            Make check-in a breeze with our self-service kiosks. Attendees can
            check themselves in using QR codes.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center p-6">
          <img
            alt="Image"
            className="aspect-video overflow-hidden rounded-lg object-cover object-center"
            height="225"
            src="/placeholder.svg"
            width="400"
          />
        </CardContent>
        <CardFooter>
          <Button size="sm">Learn More</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Send Invitations</CardTitle>
          <CardDescription>
            Easily send invitations to your event. Let your guests RSVP with a
            single click.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center p-6">
          <img
            alt="Image"
            className="aspect-video overflow-hidden rounded-lg object-cover object-center"
            height="225"
            src="/placeholder.svg"
            width="400"
          />
        </CardContent>
        <CardFooter>
          <Button size="sm">Send Invitations</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Manage Participants</CardTitle>
          <CardDescription>
            Keep track of your attendees. Check them in, print badges, and more.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center p-6">
          <img
            alt="Image"
            className="aspect-video overflow-hidden rounded-lg object-cover object-center"
            height="225"
            src="/placeholder.svg"
            width="400"
          />
        </CardContent>
        <CardFooter>
          <Button size="sm">Manage Participants</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Create an Event</CardTitle>
          <CardDescription>
            Our easy-to-use editor lets you create a beautiful event page in
            minutes.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center p-6">
          <img
            alt="Image"
            className="aspect-video overflow-hidden rounded-lg object-cover object-center"
            height="225"
            src="/placeholder.svg"
            width="400"
          />
        </CardContent>
        <CardFooter>
          <Button size="sm">Create an Event</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Send Invitations</CardTitle>
          <CardDescription>
            Easily send invitations to your event. Let your guests RSVP with a
            single click.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center p-6">
          <img
            alt="Image"
            className="aspect-video overflow-hidden rounded-lg object-cover object-center"
            height="225"
            src="/placeholder.svg"
            width="400"
          />
        </CardContent>
        <CardFooter>
          <Button size="sm">Send Invitations</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Manage Participants</CardTitle>
          <CardDescription>
            Keep track of your attendees. Check them in, print badges, and more.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center p-6">
          <img
            alt="Image"
            className="aspect-video overflow-hidden rounded-lg object-cover object-center"
            height="225"
            src="/placeholder.svg"
            width="400"
          />
        </CardContent>
        <CardFooter>
          <Button size="sm">Manage Participants</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Create an Event</CardTitle>
          <CardDescription>
            Our easy-to-use editor lets you create a beautiful event page in
            minutes.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center p-6">
          <img
            alt="Image"
            className="aspect-video overflow-hidden rounded-lg object-cover object-center"
            height="225"
            src="/placeholder.svg"
            width="400"
          />
        </CardContent>
        <CardFooter>
          <Button size="sm">Create an Event</Button>
        </CardFooter>
      </Card>
    </>
  );
}

function CalendarCheckIcon(props) {
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
      <path d="m9 16 2 2 4-4" />
    </svg>
  );
}

function CameraIcon(props) {
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
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}

function CircleEllipsisIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M17 12h.01" />
      <path d="M12 12h.01" />
      <path d="M7 12h.01" />
    </svg>
  );
}

function TicketIcon(props) {
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
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M13 5v2" />
      <path d="M13 17v2" />
      <path d="M13 11v2" />
    </svg>
  );
}

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Zi8ByTaz6oh
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import axios from "../utils/axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import LoadingScreen from "@/components/LoadingScreen";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import WhatsAppShareButton from "@/components/WhartsappShareButton";
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.toLocaleDateString("en-US", { weekday: "short" });
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const dayOfMonth = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  return `${day} ${dayOfMonth} ${month} ${year} `;
};

function convertTo12HourFormat(time) {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? "pm" : "am";
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${formattedHour}:${minutes} ${ampm}`;
}
export default function ShareEventPreview() {
  const navigate = useNavigate();
  const params = useParams();
  console.log(params.id);
  console.log(params.id);
  const [event, setEvent] = useState("");
  const isBuyOptionAvailable =
    Array.isArray(event?.ticketTypes) &&
    event.ticketTypes.some((ticket) => ticket.quantity > 0);

  console.log("event", event);
  const { startDate, endDate } = event;
  const [shareableLink, setShareableLink] = useState("");
  const [embedded, setEmbedded] = useState("");

  const formattedEndDate = formatDate(endDate);
  const formattedStartDate = formatDate(startDate);
  console.log("endDate", formattedEndDate, "start date", formattedStartDate);
  const startTime = convertTo12HourFormat(event?.startTime || "");
  console.log(event.startTime, "start", startTime);

  const endTime = convertTo12HourFormat(event?.endTime || "");
  console.log(event.endTime, "end", endTime);
  const fetchData = useMemo(
    () => async () => {
      //   const eventId = "65fc1f74f0daea700472230f";
      const response = await axios.get(`/events/${params.id}`);
      setEvent(response.data);
      setShareableLink(
        `http://localhost:5173/events/share/${response.data.id}`
      );
      setEmbedded(`  <iframe
      id="nutworth-1583483774488"
      src=" https://7522-124-40-247-18.ngrok-free.app/events/share/${params.id}"
      width="100%"
      height="300px"
      frameborder="0"
      onload="nutworth_1583483774488()"
    ></iframe>
      `);
    },
    []
  );
  useEffect(() => {
    fetchData();
  }, []);
  const copyToClipboard = (str) => {
    navigator.clipboard
      .writeText(str)
      .then(() => {
        // You can add any callback here to notify the user that the copy was successful
        toast({
          title: "Success!",
          description: "successfully copy  to clipboard",
        });
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "failed to copy",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      });
  };
  return (
    <>
      {event ? (
        <div className="">
          <div
            className="bg-cover bg-center h-[300px]"
            style={{
              backgroundImage: event?.backgroundImage
                ? `url('${event.backgroundImage}')`
                : "url('https://images.pexels.com/photos/2342400/pexels-photo-2342400.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
            }}
          />
          <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
            <div className="flex items-center text-sm space-x-4 mb-6">
              <CalendarIcon className="text-gray-500" />
              {/* <span>Fri 10 Sep 2021 6:00 pm - Sun 12 Sep 2021 10:30 pm</span> */}
              <span>
                {formattedStartDate} {startTime} -{formattedEndDate} {endTime}
              </span>
              <LocateIcon className="text-gray-500" />
              <span>{event.location}</span>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <h2 className="text-xl font-semibold mb-2">DESCRIPTION</h2>
              <p className="mb-4">{event.description}</p>
              <h2 className="text-xl font-semibold mb-2">LOCATION</h2>
              <p className="mb-4">{event.location}</p>
              <div className="flex justify-between items-center">
                {isBuyOptionAvailable && (
                  <Button
                    onClick={() => {
                      navigate(`/events/${params.id}/Ticket`);
                    }}
                    className="bg-blue-600 text-white"
                  >
                    Buy Tickets
                  </Button>
                )}
                <div>
                  <span className="text-sm font-semibold mr-2">
                    SHARE THIS EVENT
                  </span>
                  <div className="flex space-x-3">
                    <FacebookIcon
                      onClick={() =>
                        copyToClipboard(
                          `https://www.facebook.com/sharer/sharer.php?u=${shareableLink}`
                        )
                      }
                      className="text-blue-600"
                    />
                    <WhatsAppShareButton link={shareableLink} />
                    <TwitterIcon className="text-blue-600 mx-2" />
                    <LinkedinIcon className="text-blue-600" />
                    <CodeIcon
                      onClick={() => copyToClipboard(embedded)}
                      className="text-blue-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}

function CodeIcon(props) {
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
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
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

function FacebookIcon(props) {
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
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LinkedinIcon(props) {
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
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function LocateIcon(props) {
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
      <line x1="2" x2="5" y1="12" y2="12" />
      <line x1="19" x2="22" y1="12" y2="12" />
      <line x1="12" x2="12" y1="2" y2="5" />
      <line x1="12" x2="12" y1="19" y2="22" />
      <circle cx="12" cy="12" r="7" />
    </svg>
  );
}

function TwitterIcon(props) {
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
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

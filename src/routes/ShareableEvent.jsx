import React, { useEffect, useMemo, useState } from "react";

import axios from "../utils/axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addEventData } from "@/utils/eventDataSlice";
import { Button } from "@/components/ui/button";

const ShareableEvent = (subscription) => {
  "http://localhost:5173/share/event/658047f2bbc05428c0ed5f5b";
  const [event, setEvent] = useState();
  const params = useParams();
  const navigate = useNavigate();
  console.log("ideeeeeeeeeeeeeeeeeeeee<<<<<<<<<<<", params.eventId);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState();
  const [participants, setParticipants] = useState([]);
  const [shareableLink, setShareableLink] = useState("");
  const [eventData, setEventData] = useState(null);
  const dispatch = useDispatch();

  const eventId = params.id;
  console.log(`eventId : ${eventId}`);
  const fetchData = useMemo(
    () => async () => {
      try {
        const response = await axios.get(`/events/${eventId}`);
        setEventData(response.data);
        console.log("b");
        console.log("response", response.data);
      } catch (err) {
        setError(err.message || "Error fetching event data"); // Handle API errors gracefully
        // Optionally: navigate to an error page or display an error message
      } finally {
        setIsLoading(false);
      }
    },
    [eventId]
  );

  useEffect(() => {
    fetchData();
  }, []);
  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.toLocaleDateString();
  };

  return (
    <>
      {eventData ? (
        <>
          <div className="flex max-w-lg rounded overflow-hidden shadow-lg">
            <div className="flex-none w-48 relative">
              <img
                alt="Art in Chicago"
                className="absolute inset-0 w-full h-full object-cover"
                height="150"
                src="https://images.unsplash.com/photo-1561489396-888724a1543d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                style={{
                  aspectRatio: "192/150",
                  objectFit: "cover",
                }}
                width="192"
              />
            </div>
            <div className="flex-1 p-4">
              <div className="font-bold text-2xl mb-2"> {eventData?.title}</div>
              <p className="font-bold text-md mb-2">
                {" "}
                {eventData?.description}
              </p>
              {/* <p className="text-gray-700 text-base mb-4">
                "We had been aware of the Walker exhibit but hadn't quite known
                how to connect," said Steve Weaver, executive director of the
                Chicago Public Art Group.
              </p> */}
              <div className="grid grid-cols-3 items-center">
                Date : {formatDate(eventData.date)}
              </div>
              <div className="flex items-center">
                <LinkIcon className="text-blue-500 h-4 w-4" />
                <a
                  className="ml-1 text-sm text-blue-500 hover:text-blue-600"
                  href="#"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  https://www.nytimes.com/2018/03/08/arts/chicago-museums-art.html?rref...
                </a>
              </div>
            </div>
          </div>
          {/* <Button>Buy Ticket</Button> */}
        </>
      ) : (
        <div>Not Found</div>
      )}
    </>
  );
};

export default ShareableEvent;

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/bhgdrMqH7JX
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
// export default function Component() {
//   return (
//     <div className="flex max-w-lg rounded overflow-hidden shadow-lg">
//       <div className="flex-none w-48 relative">
//         <img
//           alt="Art in Chicago"
//           className="absolute inset-0 w-full h-full object-cover"
//           height="150"
//           src="/placeholder.svg"
//           style={{
//             aspectRatio: "192/150",
//             objectFit: "cover",
//           }}
//           width="192"
//         />
//       </div>
//       <div className="flex-1 p-4">
//         <div className="font-bold text-lg mb-2">Beyond Frank Lloyd Wright: A Broader View of Art in Chicago</div>
//         <p className="text-gray-700 text-base mb-4">
//           "We had been aware of the Walker exhibit but hadn't quite known how to connect," said Steve Weaver, executive
//           director of the Chicago Public Art Group.
//         </p>
//         <div className="flex items-center">
//           <LinkIcon className="text-blue-500 h-4 w-4" />
//           <a
//             className="ml-1 text-sm text-blue-500 hover:text-blue-600"
//             href="#"
//             rel="noopener noreferrer"
//             target="_blank"
//           >
//             https://www.nytimes.com/2018/03/08/arts/chicago-museums-art.html?rref...
//           </a>
//         </div>
//       </div>
//     </div>
//   )
// }

function LinkIcon(props) {
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
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

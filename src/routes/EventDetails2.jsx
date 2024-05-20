/**
 * v0 by Vercel.
 * @see https://v0.dev/t/bE2VyYBgmnH
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button";
import { TicketIcon, ScanLine, DeleteIcon } from "lucide-react";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { addEventData } from "@/utils/eventDataSlice";

import { formatDate } from "../utils/formatDate";
import EventStatus from "@/components/Event Status";
import IncompleteDataTable from "../components/IncompleteDataTable";
import ParticipantDataTable from "@/components/ParticipantDataTable";
import UpdateEvent from "@/components/UpdateEvent";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import InvitationOptionsModal from "./InvitationOptionsModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import NotificationModal from "./NotificationModal";
import AgendaModal from "./AgendaModal";
import { format } from "date-fns";
import DeleteEventModal from "./DeleteEventModal";
import { dark } from "@clerk/themes";

export default function EventDetails2() {
  const params = useParams();
  const navigate = useNavigate();
  console.log("ideeeeeeeeeeeeeeeeeeeee<<<<<<<<<<<", params.eventId);
  const eventId = params.eventId;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState();
  const [participants, setParticipants] = useState([]);
  const [shareableLink, setShareableLink] = useState("");
  const [embedded, setEmbedded] = useState("");
  // const [selectedFile, setSelectedFile] = useState(null);
  // const [errorMessage, setErrorMessage] = useState("");
  // const [fileFields, setFileFields] = useState([]);
  // const [numberOfPeople, setNumberOfPeople] = useState(0);
  // const [fileData, setFileData] = useState([]);

  // const [qrCodeDataURI, setQRCodeDataURI] = useState(null);
  // const [dataChange, setDataChange] = useState(false);
  const [eventData, setEventData] = useState(null);
  // const [showAdd, setShowAdd] = useState(false);
  // console.log("ahowAdd", showAdd);
  // // console.log("first params", eventId);
  const dispatch = useDispatch();
  // console.log("filedata", fileData);
  // console.log("lenghthh", fileData.length);

  // const dataToSend = useSelector((state) => state.data);
  const organizationId = useSelector(
    (state) => state?.organizationSlice?.organizationData?.id
  );
  //   const event = useSelector((state) => state?.eventSlice);

  console.log("org>>>>", organizationId);
  console.log("status", status);
  const fetchData = useMemo(
    () => async () => {
      try {
        const response = await axios.get(`/events/${eventId}`);
        setEventData(response.data);
        dispatch(addEventData(response.data));
        fetchParticipant();
        setShareableLink(`http://165.22.208.201:5713/share/event/${eventId}`);
        setEmbedded(`  <iframe
        id="nutworth-1583483774488"

        src=" http://165.22.208.201:5713/share/event/${eventId}"

        width="100%"
        height="300px"
        frameborder="0"
        onload="nutworth_1583483774488()"
      ></iframe>
        `);
      } catch (err) {
        setError(err.message || "Error fetching event data"); // Handle API errors gracefully
        // Optionally: navigate to an error page or display an error message
      } finally {
        setIsLoading(false);
      }
    },
    [eventId, dispatch]
  ); // Re-run on eventId or dispatch change
  const fetchParticipant = async () => {
    if (!eventData) {
      return;
    }
    try {
      const response = await axios.get(`/events/${eventId}/allParticipent`);
      console.log(
        ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
      );
      console.log("Partcipant,", response.data);
      setParticipants(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
    fetchParticipant();
  }, []); // Run fetchData only once on component mount
  // useEffect(() => {

  // });
  if (isLoading) {
    return <div>Loading event details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>; // Handle errors appropriately
  }
  const copyToClipboard = (str) => {
    navigator.clipboard
      .writeText(str)
      .then(() => {
        // You can add any callback here to notify the user that the copy was successful
        alert("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  const Delete = (eventId) => {
    axios.delete(`/events/${eventId}`).then((res) => {
      console.log(res.data);
    });
  };
  const handleDelete = () => {
    //create popup
    // Delete(eventId);
    // navigate("/");
  };

  return (
    <div className="w-full py-6 space-y-6 mx-3">
      <div className="container space-y-2">
        <div className="flex items-center space-x-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {eventData?.title}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              {formatDate(eventData?.startDate)}-{" "}
              {formatDate(eventData?.endDate)}
            </p>
          </div>
          <div className="flex space-x-2 flex-col sm:flex-row  space-y-2 md:mr-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-start gap-4 md:items-center lg:gap-8">
          <div className="grid grid-cols-1 items-start gap-2 md:grid-cols-1fr_2">
            <p className="text-xl font-medium">
              Event Type: {eventData.eventType}
            </p>
          </div>
          <div className="grid grid-cols-1 items-start gap-2 md:grid-cols-1fr_2">
            <p className="text-xl font-medium">{eventData.location}</p>
            <EventStatus
              setStatus={setStatus}
              targetDate={eventData.startDate}
              endingDate={eventData.endDate}
            />
          </div>
        </div>
      </div>
      <div className="container ">
        <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              About the Event
            </h2>
            <div className="prose max-w-none">
              <p>{eventData.description}</p>
            </div>
          </div>
          <div className="space-y-4  items-center flex  flex-col ">
            <div className=" flex gap-2  justify-between w-1/2 sm:w-full">
              {status !== "Completed" && <InvitationOptionsModal />}{" "}
              {status !== "Completed" && (
                <Button
                  onClick={() => {
                    navigate("addParticipants");
                  }}
                  size="lg"
                  variant="outline"
                >
                  <UserPlusIcon className="w-4 h-4 mr-2 inline-block" />
                  Add Participants
                </Button>
              )}
              {status !== "Completed" && (
                <Button
                  onClick={() => {
                    navigate("tabPreview");
                  }}
                  size="lg"
                  variant="outline"
                >
                  <ScanLine className="w-4 h-4 mr-2 inline-block" />
                  Scanner Template
                </Button>
              )}
            </div>
            <div className="flex gap-2 justify-between  w-1/2 sm:w-full">
              {status !== "Completed" && (
                <Button
                  onClick={() => {
                    navigate("addTicket");
                  }}
                  size="lg"
                  variant="outline"
                >
                  <TicketIcon className="w-4 h-4 mr-2 inline-block" />
                  Add Ticket
                </Button>
              )}
              <Button
                onClick={() => {
                  navigate(`/events/share/${eventId}`);
                }}
                size="lg"
                variant="outline"
              >
                <UserPlusIcon className="w-4 h-4 mr-2 inline-block" />
                Share
              </Button>
              {/* <Button
              onClick={() => {
                handleDelete(`${eventId}`);
              }}
              size="lg"
              variant="outline"
            >
              <DeleteIcon className="w-4 h-4 mr-2 inline-block" />
              Delete
            </Button> */}
              <Button size="lg" variant="outline">
                <DeleteIcon className="w-4 h-4 mr-2 inline-block" />
                <DeleteEventModal eventId={eventData.id} />
              </Button>

              {status !== "Completed" && (
                <Button
                  onClick={() => {
                    console.log("Updated");
                    navigate(`/events/update/${eventData.id}`); // Use history.push for redirection
                  }}
                  size="lg"
                  variant="outline"
                >
                  <FileEditIcon className="w-4 h-4 mr-2 inline-block" /> Update
                  Event
                </Button>
              )}
            </div>
            <div className=" flex gap-2 justify-between   w-1/2 sm:w-full">
              {status !== "Completed" && (
                <Button
                  onClick={() => {
                    console.log("navigate");
                    navigate(`/scan/events/${eventData.id}`);
                  }}
                  size="lg"
                  variant="outline"
                >
                  <UsersIcon className="w-4 h-4 mr-2 inline-block" />
                  Scan QR Codes
                </Button>
              )}
              {status !== "Completed" && <NotificationModal />}{" "}
              {status !== "Completed" && <AgendaModal agenda={eventData} />}
            </div>
          </div>
          {/* <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Location
            </h2>
            <div className="prose max-w-none">
              <p>{eventData.location}</p>
            </div> */}
        </div>
      </div>

      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          <div className="w-full ">
            <section>
              <h2 className="text-lg font-semibold mb-4">Event Participants</h2>
              {/* {participants?.length > 0 && (
                <ParticipantDataTable participants={participants} />
              )} */}
              {/* {participants?.length > 0 && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone Number</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {participants.map((participant) => (
                      <TableRow key={participant.id}>
                        <TableCell>{participant.name}</TableCell>
                        <TableCell>{participant.email}</TableCell>
                        <TableCell>{participant.phoneNumber}</TableCell>
                        <TableCell>
                          <Button className="mr-2" variant="outline">
                            Edit
                          </Button>
                          <Button variant="destructive">Remove</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )} */}
            </section>

            {/*????????????????????????????????????  */}
            <div className="flex flex-col md:flex-row">
              <div className="flex  flex-col sm:flex-row justify-between gap-5 md:w-1/2 ">
                <section>
                  <h3 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-4xl mb-3">
                    Ticket Info
                  </h3>
                  <div className="grid grid-cols-1 items-start gap-2 md:grid-cols-1fr_2">
                    <p className="text-xl font-medium">
                      Invited: {eventData.participants.length}
                    </p>
                    <p className="text-xl font-medium">
                      Total Tickets listed: {eventData?.TotalTickets}{" "}
                    </p>
                    <p className="text-xl font-medium">
                      attended: {eventData.present.length}{" "}
                    </p>
                    <p className="text-xl font-medium">
                      Remaining {eventData?.Remaining}{" "}
                    </p>
                  </div>
                </section>
                {/*????????????????????????????????????  */}
              </div>
              <section className="w-full md:w-1/2 ">
                <h3 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-4xl mb-3">
                  Agenda
                </h3>
                <div className="grid grid-cols-1 items-start gap-2 md:grid-cols-1fr_2">
                  {eventData?.agenda.length > 0 && (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Start Time</TableHead>
                          <TableHead>End TIme</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {eventData?.agenda.map((agenda, i) => (
                          <TableRow key={i + 1}>
                            <TableCell>{agenda.title}</TableCell>
                            <TableCell>
                              {format(agenda.date, "LLL dd, y")}
                            </TableCell>
                            <TableCell>{agenda.startTime}</TableCell>
                            <TableCell>{agenda.endTime}</TableCell>
                            {/* <TableCell>
                              <Button className="mr-2" variant="outline">
                                Edit
                              </Button>
                              <Button variant="destructive">Remove</Button>
                            </TableCell> */}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FileEditIcon(props) {
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
      <path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z" />
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

function UserPlusIcon(props) {
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
      <line x1="19" x2="19" y1="8" y2="14" />
      <line x1="22" x2="16" y1="11" y2="11" />
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

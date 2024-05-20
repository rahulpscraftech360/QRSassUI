// /**
//  * v0 by Vercel.
//  * @see https://v0.dev/t/UyZVUcEvs5e
//  * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
//  */
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import axios from "../utils/axiosConfig";
// import {
//   PopoverTrigger,
//   PopoverContent,
//   Popover,
// } from "@/components/ui/popover";
// import { Calendar } from "@/components/ui/calendar";
// import { useState } from "react";
// import { useSelector } from "react-redux";

// export default function AgendaForm() {
//   const eventData = useSelector((store) => store.eventSlice);
//   console.log(">>>", eventData);

//   const [agendaItems, setAgendaItems] = useState([
//     {
//       title: "First agenda item",
//       startTime: "9:00 AM",
//       endTime: "10:30 AM",
//       date: "April 27, 2024",
//     },
//     {
//       title: "Second agenda item",
//       startTime: "10:30 AM",
//       endTime: "11:30 AM",
//       date: "April 27, 2024",
//     },
//   ]);

//   const handleAddItem = () => {
//     setAgendaItems([
//       ...agendaItems,
//       {
//         title: "",
//         startTime: "",
//         endTime: "",
//         date: "",
//       },
//     ]);
//   };

//   const handleTitleChange = (index, value) => {
//     const newItems = [...agendaItems];
//     newItems[index].title = value;
//     setAgendaItems(newItems);
//   };

//   const handleStartTimeChange = (index, value) => {
//     const newItems = [...agendaItems];
//     newItems[index].startTime = value;
//     setAgendaItems(newItems);
//   };

//   const handleEndTimeChange = (index, value) => {
//     const newItems = [...agendaItems];
//     newItems[index].endTime = value;
//     setAgendaItems(newItems);
//   };
//   const handleDateChange = (date, index) => {
//     console.log("change date");
//     const newItems = [...agendaItems];
//     newItems[index] = {
//       ...newItems[index],
//       date: date,
//     };
//     setAgendaItems(newItems);
//   };

//   const handleDelete = (index) => {
//     const newItems = agendaItems.filter((item, i) => i !== index);
//     setAgendaItems(newItems);
//   };

//   const updateEventAgenda = async (eventId, agendaItems) => {
//     try {
//       const response = await axios.put(`/events/${eventId}/agenda`, {
//         agendaItems,
//       });
//       return response.data;
//     } catch (error) {
//       console.error("Error updating event agenda:", error);
//       throw error;
//     }
//   };

//   // Example usage
//   const eventId = "66226ed7a691390024e7f901";

//   updateEventAgenda(eventId, agendaItems)
//     .then((data) => {
//       console.log("Event agenda updated successfully:", data);
//     })
//     .catch((error) => {
//       console.error("Error updating event agenda:", error);
//     });

//   return (
//     <div className=" mx-auto">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-semibold">Agenda Items</h2>
//         <Button variant="secondary" onClick={handleAddItem}>
//           + Add Item
//         </Button>
//       </div>
//       <div className="space-y-4 mb-6">
//         {agendaItems.map((item, index) => (
//           <div key={index} className="flex items-center space-x-2">
//             <Input
//               className="w-full "
//               value={item.title}
//               onChange={(e) => handleTitleChange(index, e.target.value)}
//               placeholder="Enter agenda item"
//             />
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Button variant="outline">
//                   <ClockIcon className="h-5 w-5" />
//                   <span className="ml-2">{item.startTime}</span>
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent align="start" className="w-auto p-0">
//                 <Input
//                   value={item.startTime}
//                   onChange={(e) => handleStartTimeChange(index, e.target.value)}
//                 />
//               </PopoverContent>
//             </Popover>
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Button variant="outline">
//                   <ClockIcon className="h-5 w-5" />
//                   <span className="ml-2">{item.endTime}</span>
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent align="start" className="w-auto p-0">
//                 <Input
//                   value={item.endTime}
//                   onChange={(e) => handleEndTimeChange(index, e.target.value)}
//                 />
//               </PopoverContent>
//             </Popover>
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Button variant="outline">
//                   <CalendarDaysIcon className="h-5 w-5" />
//                   <span className="ml-2">{item.date}</span>
//                 </Button>
//               </PopoverTrigger>
//               {/* <PopoverContent align="start" className="w-auto p-0">
//                 <Calendar
//                   mode="single"
//                   onChange={(date) => handleDateChange(date, index)}
//                   value={item.date}
//                 />
//               </PopoverContent> */}

//               <PopoverContent className="w-auto p-0" align="start">
//                 <Calendar
//                   initialFocus
//                   mode="range"
//                   defaultMonth={date?.from}
//                   selected={date}
//                   onSelect={(selectedDate) => {
//                     // Check if the selected date range includes any past dates
//                     const today = new Date();
//                     today.setHours(0, 0, 0, 0); // Set time to the beginning of the current day

//                     if (
//                       selectedDate.from < today ||
//                       (selectedDate.to && selectedDate.to < today)
//                     ) {
//                       // If the selected date range includes any past dates, reset it to a valid range
//                       setDate({ from: today, to: null });
//                       setErrorMessage("Please select a future date");
//                     } else {
//                       setDate(selectedDate);
//                     }
//                   }}
//                   numberOfMonths={1}
//                 />
//               </PopoverContent>
//             </Popover>
//             <Button variant="ghost" onClick={() => handleDelete(index)}>
//               <TrashIcon className="h-5 w-5" />
//             </Button>
//           </div>
//         ))}
//       </div>
//       <Button className="w-full">Save Changes</Button>
//     </div>
//   );
// }

// function CalendarDaysIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
//       <line x1="16" x2="16" y1="2" y2="6" />
//       <line x1="8" x2="8" y1="2" y2="6" />
//       <line x1="3" x2="21" y1="10" y2="10" />
//       <path d="M8 14h.01" />
//       <path d="M12 14h.01" />
//       <path d="M16 14h.01" />
//       <path d="M8 18h.01" />
//       <path d="M12 18h.01" />
//       <path d="M16 18h.01" />
//     </svg>
//   );
// }

// function ClockIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <circle cx="12" cy="12" r="10" />
//       <polyline points="12 6 12 12 16 14" />
//     </svg>
//   );
// }

// function PencilIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
//       <path d="m15 5 4 4" />
//     </svg>
//   );
// }

// function TrashIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M3 6h18" />
//       <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
//       <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
//     </svg>
//   );
// }
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/UyZVUcEvs5e
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "../utils/axiosConfig";
import { format } from "date-fns";

import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { useSelector } from "react-redux";
import TimePicker from "./TimePicker";
import { toast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";

export default function AgendaForm() {
  const eventData = useSelector((store) => store.eventSlice);
  const eventId = eventData?.id;
  console.log("id<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<", eventId);
  console.log(">>>", eventData);
  const [errorMessage, setErrorMessage] = useState("");
  const [agendaItems, setAgendaItems] = useState(eventData.agenda);

  const handleAddItem = () => {
    setAgendaItems([
      ...agendaItems,
      {
        title: "",
        startTime: "",
        endTime: "",
        date: "",
      },
    ]);
  };

  const handleTitleChange = (index, value) => {
    const newItems = [...agendaItems];
    newItems[index].title = value;
    setAgendaItems(newItems);
  };

  const handleStartTimeChange = (index, value) => {
    const newItems = [...agendaItems];
    newItems[index].startTime = value;
    setAgendaItems(newItems);
  };

  const handleEndTimeChange = (index, value) => {
    const newItems = [...agendaItems];
    newItems[index].endTime = value;
    setAgendaItems(newItems);
  };

  const handleDateChange = (date, index) => {
    console.log("change date", date, "index", index);
    const newItems = [...agendaItems];
    newItems[index] = {
      ...newItems[index],
      date: date,
    };
    console.log("first newItems", newItems);
    setAgendaItems(newItems);
    // setAgendaItems(newItems);
  };

  const handleDelete = (index) => {
    const newItems = agendaItems.filter((item, i) => i !== index);
    setAgendaItems(newItems);
  };

  const updateEventAgenda = async () => {
    console.log("heeeeeeeeeeeeeeeeereeeeeeeee");
    console.log(agendaItems);
    try {
      const response = await axios.put(`/events/${eventId}/agenda`, {
        agendaItems,
      });

      if (response.status == 200) {
        console.log("response", response);
        toast({
          title: `Agenda updated Successfully !`,
        });
      }
      return response.data;
    } catch (error) {
      console.error("Error updating event agenda:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "An error occurred while updating agenda",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      throw error;
    }
  };

  // Example usage
  // const eventId = "66226ed7a691390024e7f901";

  // updateEventAgenda(eventId, agendaItems)
  //   .then((data) => {
  //     console.log("Event agenda updated successfully:", data);
  //   })
  //   .catch((error) => {
  //     console.error("Error updating event agenda:", error);
  //   });
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  return (
    <div className=" mx-auto">
      {errorMessage}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold ">Agenda Items</h2>
        <Button variant="secondary" onClick={handleAddItem}>
          + Add Item
        </Button>
      </div>
      <div className="space-y-4 mb-6">
        {agendaItems.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Input
              className="w-1/4  "
              value={item.title}
              onChange={(e) => handleTitleChange(index, e.target.value)}
              placeholder="Enter agenda item"
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <ClockIcon className="h-5 w-5" />
                  <span className="ml-2">{item.startTime}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-auto p-0">
                <Input
                  value={item.startTime}
                  onChange={(e) => handleStartTimeChange(index, e.target.value)}
                />
              </PopoverContent>
            </Popover>
            {/* <TimePicker setTime={handleStartTimeChange} time={item.startTime} /> */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <ClockIcon className="h-5 w-5" />
                  <span className="ml-2">{item.endTime}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-auto p-0">
                <Input
                  value={item.endTime}
                  onChange={(e) => handleEndTimeChange(index, e.target.value)}
                />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <CalendarDaysIcon className="h-5 w-5" />
                  {item?.date ? (
                    format(item.date, "LLL dd, y")
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-auto p-0">
                {/* <Calendar
                  mode="single"
                  onSelect={(selectedDate) => {
                    handleDateChange(selectedDate, index);
                    console.log(selectedDate);
                  }}
                  // onChange={(date) => }
                  value={item.date}
                /> */}

                <Calendar
                  mode="single"
                  onChange={(date) => handleDateChange(date, index)}
                  value={item.date}
                  onSelect={(selectedDate) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);

                    if (
                      selectedDate < new Date(eventData.startDate) ||
                      selectedDate > new Date(eventData.endDate)
                    ) {
                      // If selected date is before eventData.startDate or after eventData.endDate
                      setErrorMessage(
                        `Please select a date within the event range ${format(
                          eventData.startDate,
                          "LLL dd, y"
                        )}  and   ${format(eventData.endDate, "LLL dd, y")}`
                      );
                    } else {
                      // If selected date is within range, clear the error message and update the date
                      setErrorMessage(null);
                      handleDateChange(selectedDate, index);
                    }
                  }}
                />
              </PopoverContent>
            </Popover>

            {/* <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <CalendarDaysIcon className="h-5 w-5" />
                  <span className="ml-2">{item.date}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-auto p-0">
                <Calendar
                  mode="single"
                  onChange={(date) => handleDateChange(date, index)}
                  value={item.date}
                  onSelect={(selectedDate) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    if (
                      selectedDate < new Date(eventData.startDate) ||
                      selectedDate > new Date(eventData.endDate)
                    ) {
                      setErrorMessage(
                        `Please select a date within the event range ${format(
                          eventData.startDate,
                          "LLL dd, y"
                        )} and ${format(eventData.endDate, "LLL dd, y")}`
                      );
                    } else {
                      setErrorMessage(null);
                      handleDateChange(selectedDate, index);
                      setIsPopoverOpen(false); // Close the Popover after selecting a date
                    }
                  }}
                />
              </PopoverContent>
            </Popover> */}
            <Button variant="ghost" onClick={() => handleDelete(index)}>
              <TrashIcon className="h-5 w-5" />
            </Button>
          </div>
        ))}
      </div>
      <Button
        onClick={() => {
          updateEventAgenda();
        }}
        className="w-full"
      >
        Save Changes
      </Button>
    </div>
  );
}

function CalendarDaysIcon(props) {
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
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}

function TrashIcon(props) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

// function CalendarDaysIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
//       <line x1="16" x2="16" y1="2" y2="6" />
//       <line x1="8" x2="8" y1="2" y2="6" />
//       <line x1="3" x2="21" y1="10" y2="10" />
//       <path d="M8 14h.01" />
//       <path d="M12 14h.01" />
//       <path d="M16 14h.01" />
//       <path d="M8 18h.01" />
//       <path d="M12 18h.01" />
//       <path d="M16 18h.01" />
//     </svg>
//   );
// }

function ClockIcon(props) {
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
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function PencilIcon(props) {
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
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  );
}

// import React, { useState } from "react";
// /**
//  * v0 by Vercel.
//  * @see https://v0.dev/t/RoWLtangMnH
//  * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
//  */
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import axios from "../utils/axiosConfig";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
// import { Calendar } from "@/components/ui/calendar";
// const CreateEvent = () => {
//   const [formData, setFormData] = useState({});
//   const [date, setDate] = React.useState();
//   const organization = useSelector(
//     (state) => state?.organizationSlice?.organizationData
//   );
//   const [errorMessage, setErrorMessage] = useState(null);
//   const navigate = useNavigate();

//   const handleSubmit = async (values) => {
//     console.log("Received values of form: ", values);
//     const formData = {
//       ...values,
//       date: values["date"].format("YYYY-MM-DD"), // format date
//       organization: organization._id,
//     };

//     try {
//       const response = await axios.post("/events", formData);
//       if (response.status === 201) {
//         alert("Event created Successfully!");
//         navigate("/events");
//       } else {
//         console.error("Unexpected response:", response);
//       }
//     } catch (error) {
//       console.error("Event creation failed: ", error.response.data);
//       const message =
//         error.response?.data?.data ||
//         "An error occurred while creating the event. Please try again.";
//       setErrorMessage(message);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
//       <div className="bg-white rounded-lg p-6 w-full max-w-lg">
//         <h2 className="text-xl font-semibold mb-4  text-gray-700">
//           Create Event
//         </h2>
//         <form className="space-y-4">
//           <div>
//             <label
//               className="block text-sm font-medium text-gray-700"
//               htmlFor="event-title"
//             >
//               * Event Title
//             </label>
//             <Input
//               id="title"
//               placeholder="event title"
//               required
//               type="text"
//               name="title"
//               value={formData.email}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <label
//               className="block text-sm font-medium text-gray-700"
//               htmlFor="event-date"
//             >
//               * Date
//             </label>
//             <div className="flex rounded-md shadow-sm">
//               <Input id="event-date" placeholder="Select date" />
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button className="rounded-r-md" variant="ghost">
//                     <CalendarIcon className="text-gray-500" />
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0">
//                   <Calendar
//                     mode="single"
//                     selected={date}
//                     onSelect={setDate}
//                     className="rounded-md border"
//                   />
//                 </PopoverContent>
//               </Popover>
//             </div>
//           </div>
//           <div>
//             <label
//               className="block text-sm font-medium text-gray-700"
//               htmlFor="event-location"
//             >
//               * Location
//             </label>
//             <Input id="event-location" placeholder="Location" />
//           </div>
//           <div>
//             <label
//               className="block text-sm font-medium text-gray-700"
//               htmlFor="event-description"
//             >
//               * Description
//             </label>
//             <Textarea id="event-description" placeholder="Description" />
//           </div>
//           <Button className="w-full">Create Event</Button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateEvent;

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

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "../utils/axiosConfig";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "@/components/ui/calendar";
import SucessAlert from "./SucessAlert";
import { toast } from "./ui/use-toast";
import { ToastDestructive } from "./ToastDestructive";
import { ToastAction } from "./ui/toast";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { RocketIcon } from "@radix-ui/react-icons";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
// Assuming CalendarIcon is correctly imported or defined elsewhere

const CreateEvent = () => {
  const organization = useSelector(
    (state) => state?.organizationSlice?.organizationData
  );
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    organization: organization.id,
  });
  const [date, setDate] = useState(null);

  console.log(">>>>>>>>>>>", organization.id);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log(formData);
    if (!date) {
      setErrorMessage("Please select a date for the event.");
      return;
    }

    const fullFormData = {
      ...formData,
      date: date.toISOString(), // Assuming `date` is a Date object or moment.js object
      organization: organization.id,
      TotalTicket:0
    };
    console.log(fullFormData);
    try {
      console.log("heree");
      const response = await axios.post("/events", fullFormData);
      if (response.status === 201) {
        toast({
          title: `Event created Successfully`,
        });
        // navigate("/");
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Event creation failed: ", error.response?.data);
      const message =
        error.response?.data?.data ||
        "An error occurred while creating the event. Please try again.";
      setErrorMessage(message);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "An error occurred while creating the event",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  return (
    <div className="fixed inset-0 h-auto mt-24 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-gray-300  border-black rounded-lg p-6 w-full max-w-lg mb-20">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Create Event
        </h2>
        {/* {errorMessage && <p className="text-red-500">{errorMessage}</p>} */}

        {errorMessage && (
          <Alert>
            <ExclamationTriangleIcon className="h-4 w-4 " />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Event Title Input */}
          <Input
            id="title"
            placeholder="Event title"
            required
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />

          {/* Other inputs and the Calendar selection logic */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="event-date"
            >
              * Date
            </label>
            <div className="flex rounded-md shadow-sm">
              <Input
                id="event-date"
                placeholder="Select date"
                required
                name="date"
                value={date ? date.toISOString().split("T")[0] : ""}
                // onChange={() => {}} // The actual date is selected via the Calendar, not here
                readOnly // Prevent manual editing
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button className="rounded-r-md" variant="ghost">
                    <CalendarIcon className="text-gray-500" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Event Location Input */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="location"
            >
              * Location
            </label>
            <Input
              id="location"
              placeholder="Location"
              required
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          {/* Event Description Textarea */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="description"
            >
              * Description
            </label>
            <Textarea
              id="description"
              placeholder="Description"
              required
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Create Event
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;

import React, { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { RocketIcon } from "@radix-ui/react-icons";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/utils/firebase";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import ImageComponent from "@/components/ImageComponent";
const EditEvent = () => {
  // console.log("date>>>>>>>>>>>>>>>>", date);
  const { eventId } = useParams();
  const [eventData, setEventData] = useState();

  const [editedData, setEditedData] = useState();
  console.log("modified data...", editedData);
  console.log(eventData);
  const [eventType, setEventType] = useState("inperson");
  const navigate = useNavigate();
  const [date, setDate] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [formData, setFormData] = useState({
    title: eventData?.title || "", // Initialize form with eventData if present
    location: eventData?.location || "",
    description: eventData?.description || "",
    startDate: eventData?.startDate || "",
    endDate: eventData?.endDate | "",
    startTime: eventData?.startTime | "",
    endTime: eventData?.endTime | "",
    eventType: eventData?.eventType,
  });

  console.log("form dataaa", formData);

  const [Files, setFiles] = useState([]);
  //console.log("files", Files);
  const [backgroundImage, setBackgroundImage] = useState(null);
  // console.log("backgroundImage", backgroundImage);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const uploadProps = {
    name: "file",
    multiple: false,
    beforeUpload: (file) => {
      setSelectedFile(file);
      return false; // Prevent automatic upload
    },
    onRemove: () => {
      setSelectedFile(null);
    },
  };

  useEffect(() => {
    console.log(Files);
    // Assuming 'Files' is an array of Blob URLs. If it's a single Blob URL, adjust accordingly.
    if (Files.length === 0) return; // Early return if Files is empty

    const blobUrlToFile = async (blobUrl) => {
      const response = await fetch(blobUrl);
      const blob = await response.blob();
      //console.log("blob", blob);
      return new File([blob], "filename.png", { type: "image/png" }); // Adjust filename and type as necessary
    };

    (async () => {
      // Assuming you're dealing with a single file for simplicity
      const firstFileBlobUrl = Files[0]; // Adjust if 'Files' is not an array
      const file = await blobUrlToFile(firstFileBlobUrl);
      // setSelectedFile(file);
      let a = JSON.stringify(file);
      console.log(">>>>>>>>>>>>", a);
    })();

    // This console.log will not show the updated selectedFile immediately
    // because setSelectedFile's state update will not have completed yet.
  }, [Files]);
  const handleImageUpload = () => {
    console.log("upload started", File);
    if (!File || File.length === 0) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please select an image file to upload",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });

      return;
    }

    setIsUploading(true);
    const fileRef = ref(storage, `images/${Date.now()}`);
    console.log("NNNNNN", selectedFile);
    const uploadTask = uploadBytesResumable(fileRef, selectedFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        if (snapshot.totalBytes > 0) {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(">>>>>", progress);
          console.log(`Upload is ${progress}% done`);
          setUploadProgress(progress);
        } else {
          // Handle the case where totalBytes is not initialized or 0
          console.log("Waiting for upload to start...");
          setUploadProgress(0); // Optionally set progress to 0 or a placeholder value
        }
        // const progress =
        //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log(">>>>>", progress);
        // console.log(`Upload is ${progress}% done`);
        // setUploadProgress(progress);
      },
      (error) => {
        console.error("Error uploading image:", error);
        setIsUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setBackgroundImage(downloadURL);
          setIsUploading(false);
        });
      }
    );
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log(file);
      setSelectedFile(file);
    }
  };
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  useEffect(() => {
    console.log(formData);

    if (!date) {
      return;
    }
    setFormData({
      ...formData,
      startDate: date.from,
      endDate: date.to,
    });
  }, [date]);
  useEffect(() => {
    async function fetchEvent() {
      try {
        const response = await axios.get(`/events/${eventId}`);
        const eventData = response.data;
        setEventData(eventData);

        setFormData({
          title: eventData.title || "",
          location: eventData.location || "",
          description: eventData.description || "",
          startDate: eventData.startDate || "",
          endDate: eventData.endDate || "",
          startTime: eventData.startTime || "",
          endTime: eventData.endTime || "",
          eventType: eventData.eventType || "",
        });

        setDate({
          from: new Date(eventData.startDate),
          to: new Date(eventData.endDate),
        });

        setStartTime(eventData.startTime);
        setEndTime(eventData.endTime);
        setEventType(eventData.eventType);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    }

    fetchEvent();
  }, [eventId]);

  const [errorMessage, setErrorMessage] = useState(null);

  // console.log("date>>>>>>>>>>>>>>>>", date);
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log(formData);
    if (!date) {
      setErrorMessage("Please select   date for the event.");
      return;
    }

    function setDateTime(date) {
      date.setHours(0, 0, 0, 0);
      date.setSeconds(0); // Optionally, you can set seconds to 0
      return date.toISOString();
    }
    const fullFormData = {
      ...formData,
      date: date,
      backgroundImage: backgroundImage,
      startDate: setDateTime(date.from), // Replace time of startDate
      endDate: setDateTime(date.to), // Replace time of endDate
    };
    console.log(">>>fullFormData update", fullFormData);
    console.log(fullFormData);
    try {
      const response = await axios.patch(
        `/events/${eventId}/info`,
        fullFormData
      );
      if (response.status === 200) {
        toast({
          title: `Event updated Successfully`,
        });
        navigate("/events");
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
    <div className="inset-0 h-auto mt-24 bg-opacity-75 flex items-center justify-center p-4">
      <div className=" border-2  rounded-lg p-6 w-full max-w-lg mb-20">
        <h2 className="text-xl font-semibold mb-4">Update Event</h2>
        {errorMessage && (
          <Alert className="mt-2 p-2">
            <ExclamationTriangleIcon className="h-4 w-4  stroke-red-500" />
            <AlertTitle className=""> Heads up!</AlertTitle>
            <AlertDescription className="">{errorMessage}</AlertDescription>
          </Alert>
        )}
        <form className="space-y-4 " onSubmit={handleSubmit}>
          <div className="">
            <label className="block text-sm font-medium " htmlFor="event-date">
              Event Title
            </label>
            <Input
              id="title"
              placeholder="Event title"
              required
              type="text"
              name="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <label
              className="block text-sm font-medium space-y-2 "
              htmlFor="event-date"
            >
              Date
            </label>
            <div className="w-full flex space-x-2 justify-between">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd, y")} -{" "}
                          {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date rage</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={(selectedDate) => {
                      // Check if the selected date range includes any past dates
                      const today = new Date();
                      today.setHours(0, 0, 0, 0); // Set time to the beginning of the current day

                      if (
                        selectedDate.from < today ||
                        (selectedDate.to && selectedDate.to < today)
                      ) {
                        // If the selected date range includes any past dates, reset it to a valid range
                        setDate({ from: today, to: null });
                        setErrorMessage("Please select a future date");
                      } else {
                        setDate(selectedDate);
                      }
                    }}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="w-full flex space-x-2 justify-between">
              <label
                className="block w-1/2 text-sm font-medium "
                htmlFor="event-date"
              >
                Start Time
                <Input
                  aria-label="Choose time"
                  className="w-full "
                  id="time"
                  type="time"
                  value={formData?.startTime}
                  onChange={(e) =>
                    setFormData({ ...formData, startTime: e.target.value })
                  }
                />
              </label>
              <label
                className="block  w-1/2 text-sm font-medium "
                htmlFor="event-date"
              >
                End Time
                <Input
                  aria-label="Choose time"
                  className="w-full"
                  id="time"
                  type="time"
                  value={formData?.endTime}
                  onChange={(e) =>
                    setFormData({ ...formData, endTime: e.target.value })
                  }
                  // onChange={handleEndTimeChange} // Call handleTimeChange when the value changes
                />
              </label>

              <></>
            </div>

            <div className=" ">
              <div className=" ">
                <label
                  className="pb-2  text-sm font-medium "
                  htmlFor="eventType"
                >
                  Event Type
                </label>
                <div className="flex items-center space-x-4">
                  <RadioGroup
                    value={formData.eventType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, eventType: value })
                    }
                    className=" flex space-x-1 mt-1"
                  >
                    <div className="flex items-center space-x-2 text-sm font-medium ">
                      <RadioGroupItem id="inperson" value="inperson" />
                      <Label htmlFor="inperson">In-person</Label>
                    </div>
                    <div className="flex items-center space-x-2 text-sm font-medium ">
                      <RadioGroupItem id="virtual" value="virtual" />
                      <Label htmlFor="virtual">Virtual</Label>
                    </div>
                    <div className="flex items-center space-x-2 text-sm font-medium ">
                      <RadioGroupItem id="hybrid" value="hybrid" />
                      <Label htmlFor="hybrid">Hybrid</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
            {/* Event Location Input */}
            <div>
              <label
                className="block text-sm font-medium  mb-1 "
                htmlFor="location"
              >
                Location
              </label>
              <Input
                id="location"
                placeholder="Location"
                required
                type="text"
                name="location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
            </div>

            {/* Event Description Textarea */}
            <div>
              <label
                className="block text-sm font-medium  mb-1"
                htmlFor="description"
              >
                Description
              </label>
              <Textarea
                id="description"
                placeholder="Description"
                required
                name="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
            <h2 className="text-xl font-semibold mb-4 gap-2 ">Upload Image</h2>
            <Card className="border-2 border-dashed bg-muted hover:cursor-pointer hover:border-muted-foreground/50 ">
              <CardContent
                onClick={handleButtonClick}
                className="flex flex-col items-center justify-center space-y-2 px-2 pt-4 text-xs"
              >
                <div className="flex  flex-col items-center justify-center text-muted-foreground">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mx-auto flex h-8 space-x-2 px-0 pl-1 text-s"
                  >
                    Choose an image file here to upload
                  </Button>
                  <Input
                    type="file"
                    className="w-full "
                    onClick={handleFileChange}
                    // className="hidden"
                    multiple={false}
                    onChange={handleFileChange}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Button
                className="   mt-3 "
                onClick={handleImageUpload}
                disabled={isUploading}
                loading={isUploading}
              >
                {isUploading
                  ? `Uploading...${uploadProgress}% done`
                  : "Start Upload"}
              </Button>
            </div>

            {backgroundImage && (
              <div className=" ">
                <div className="overflow-auto ">
                  <ImageComponent backgroundImage={backgroundImage} />
                </div>
              </div>
            )}
          </div>

          <Button>Update</Button>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;
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

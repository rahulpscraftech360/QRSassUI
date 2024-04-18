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

import React, { useEffect, useState } from "react";
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

const UpdateEvent = ({ eventData }) => {
  const eventId = eventData.id;
  console.log("eventdata>>>update", eventData.title);
  const [formData, setFormData] = useState({
    title: eventData.title || "", // Initialize form with eventData if present
    location: eventData.location || "",
    description: eventData.description || "",
  });
  const [date, setDate] = useState(null);
  const organization = useSelector(
    (state) => state?.organizationSlice?.organizationData
  );
  console.log(">>>>>>>>>>>", organization.id);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    // If eventData can change and you want to update the form, add this useEffect
    setFormData({
      title: eventData.title || "",
      location: eventData.location || "",
      description: eventData.description || "",
    });
    setDate(eventData.date ? new Date(eventData.date) : null);
  }, [eventData]);
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
      startDate: setDateTime(date.from), // Replace time of startDate
      endDate: setDateTime(date.to), // Replace time of endDate
      organization: organization.id,
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
    <div className="fixed inset-0 h-100vh  flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg mb-20">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Update Event
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

          {/* <h2 className="text-xl font-semibold mb-4 gap-2 ">Upload Image</h2>
          <Card className="border-2 border-dashed bg-muted hover:cursor-pointer hover:border-muted-foreground/50 ">
            <CardContent
              onClick={handleButtonClick}
              className="flex flex-col items-center justify-center space-y-2 px-2 py-4 text-xs"
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

          <div className="">
            <Button
              className="w-full   mt-14 "
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
            <img
              className="backgroundImage w-[1864px] h-[300px] "
              src={backgroundImage}
              alt="background image"
            />
          )}

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
          <h2 className="text-xl font-semibold mb-4 gap-2 ">Upload Image</h2>
          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Update
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateEvent;

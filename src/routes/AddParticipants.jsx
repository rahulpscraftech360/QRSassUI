/**
 * v0 by Vercel.
 * @see https://v0.dev/t/8YRRyonb9CT
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  TableFooter,
  Table,
} from "@/components/ui/table";
import {
  PaginationPrevious,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationContent,
  Pagination,
} from "@/components/ui/pagination";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { checkFileData } from "@/utils/checkFiledata";
import DataTable from "@/components/DataTable";
import { useDispatch } from "react-redux";
import { addData, clearData } from "@/utils/dataSlice";

export default function AddParticipants() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [fileFields, setFileFields] = useState([]);
  console.log("filefields>>", fileFields);
  const [numberOfPeople, setNumberOfPeople] = useState(0);
  const [fileData, setFileData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qrCodeDataURI, setQRCodeDataURI] = useState(null);
  const [dataChange, setDataChange] = useState(false);
  const [eventData, setEventData] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const params = useParams();
  console.log("params", params.eventId);
  const handleFileChange = (event) => {
    // Check if any files were selected
    if (event.target.files.length > 0) {
      // Update the state with the first selected file
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    // Logic for file upload goes here
    console.log("Uploading file:", selectedFile);
    // You can add further logic for file upload
    setFileFields([]);
    setNumberOfPeople(0);
    setFileData([]);
    checkFileData(
      selectedFile,
      setFileFields,
      setNumberOfPeople,
      setFileData,
      setErrorMessage
    );
  };

  const handleClear = async () => {
    try {
      // Your data object to be sent to the backend

      setSelectedFile(null);
      setFileFields([]);
      setNumberOfPeople(0);
      setFileData([]);
      dispatch(clearData());
      setDataChange(!dataChange);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  useEffect(() => {
    if (fileData.length > 0) {
      console.log(fileData, ">>>>>>>");
      dispatch(addData(fileData));

      // Assuming addData is your action creator
    }
  }, [dispatch, fileData]);
  const handleSkip = () => {
    navigate(`/events/${params.eventId}/addTicket`);
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-6  rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-6">Add Participants</h1>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Upload File</h2>
        <div className="p-6 border-dashed border-2 border-gray-300 rounded-md text-center">
          <h3 className="font-semibold">Selected JSON, CSV, Excel, or XLSX</h3>

          <Input
            onChange={handleFileChange}
            accept=".json, .csv, .xls, .xlsx"
            type="file"
          />
        </div>
        <div className="mt-4">
          <div className="grid w-full max-w-sm items-center gap-1.5"></div>
          <Button onClick={handleUpload}>Parse Data</Button>
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Available Data</h2>
        <div className="mb-4">
          <Badge variant="secondary">No of People : {numberOfPeople}</Badge>
        </div>
        <div className="flex mb-4">
          {fileFields?.map((field, index) => (
            <Badge className="mr-2" key={index}>
              {field}
            </Badge>
          ))}
        </div>

        <DataTable fileFields={fileFields} handleClear={handleClear} />
      </div>
      <Button onClick={handleSkip}>Skip</Button>
    </div>
  );
}

function UploadCloudIcon(props) {
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
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M12 12v9" />
      <path d="m16 16-4-4-4 4" />
    </svg>
  );
}

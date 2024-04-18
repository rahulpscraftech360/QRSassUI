import React, { useState } from "react";
import EditModal from "./EditModal";
import { useDispatch, useSelector } from "react-redux";
import { addEventData } from "../utils/eventDataSlice";
import axios from "../utils/axiosConfig";

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "./ui/button";
const ParticipantDataTable = ({ participants }) => {
  console.log("participants>>>>>>>>>>>>>>>", participants);
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const handleEdit = (row) => {
    setSelectedRow(row);
    setShowModal(true);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastRow = currentPage * pageSize;
  const indexOfFirstRow = indexOfLastRow - pageSize;

  const eventData = useSelector((store) => store.eventSlice);
  console.log("event Data>>>", eventData.id);
  const eventId = eventData.id;
  const organizationId = useSelector(
    (store) => store.organizationSlice?.organizationData?.id
  );
  console.log("organizationId", organizationId);
  const handleSubmit = async () => {
    try {
      // Your data object to be sent to the backend

      //  Send a POST request to the backend with your data
      const response = await axios.post(
        `/events/${eventId}/${organizationId}/participants`
      );

      //Handle the response from the backend if needed
      console.log("Response from backend:", response.data);
      dispatch(addEventData(response.data));
      alert("suceess");
    } catch (error) {
      // Handle errors if the request fails
      //console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="table-container">
      {/* {showModal && selectedRow && (
        <div className="modal-overlay">
          <EditModal
            rowData={selectedRow}
            onUpdate={(updatedData) => {
              onUpdate(updatedData);
              setShowModal(false);
            }}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </div>
      )} */}
      {participants?.length > 0 && (
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
      )}
    </div>
  );
};

export default ParticipantDataTable;

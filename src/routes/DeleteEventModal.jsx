import AgendaForm from "@/components/AgendaForm";
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

import { DialogHeader } from "@/components/ui/dialog";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import { DeleteIcon, MailIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "react-day-picker";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosConfig";
const DeleteEventModal = ({ eventId }) => {
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
    <AlertDialog className=" ">
      <AlertDialogTrigger className="px-2 border-1 border-white">
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the Event
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              handleDelete(`${eventId}`);
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteEventModal;

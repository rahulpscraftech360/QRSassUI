import React, { useEffect, useMemo, useState } from "react";
import axios from "../utils/axiosConfig";
import { useParams } from "react-router-dom";
import BuyTicketForm from "@/components/BuyTicketForm";
import { useDispatch } from "react-redux";
import { addEventData } from "@/utils/eventDataSlice";
const Ticket = () => {
  const [event, setEvent] = useState();
  const dispatch = useDispatch();
  console.log("event", event);
  console.log("length", event?.ticketTypes?.length);
  const params = useParams();
  const fetchData = useMemo(
    () => async () => {
      //   const eventId = "65fc1f74f0daea700472230f";
      const response = await axios.get(`/events/${params.eventId}`);
      setEvent(response.data);
      dispatch(addEventData(response.data));
    },
    []
  );
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="w-full py-6 space-y-6">
      <div className="container space-y-2">
        <div className="flex items-center space-x-4">
          {event?.ticketTypes?.length > 0 && (
            <BuyTicketForm
              eventId={params.eventId}
              ticketTypes={event?.ticketTypes}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Ticket;

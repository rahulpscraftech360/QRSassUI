import TicketTypesForm from "@/components/TicketTypesForm";
import React from "react";

const AddTickets = () => {
  return (
    <div className="w-full py-6 space-y-6">
      <div className="container space-y-2">
        <div className="flex items-center space-x-4">
          <TicketTypesForm />
        </div>
      </div>
    </div>
  );
};

export default AddTickets;

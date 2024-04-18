// import React, { useState, useEffect } from "react";

// const TicketTypesForm = () => {
//   const [ticketTypes, setTicketTypes] = useState([
//     { id: Date.now(), type: "", quantity: 0, price: 0 },
//   ]);
//   const [totalTickets, setTotalTickets] = useState(0);
//   const [remainingTickets, setRemainingTickets] = useState(0);

//   useEffect(() => {
//     // Calculate total quantity of all ticket types
//     const totalQuantity = ticketTypes.reduce(
//       (acc, curr) => acc + curr.quantity,
//       0
//     );
//     // Update remaining tickets
//     setRemainingTickets(totalTickets - totalQuantity);
//   }, [ticketTypes, totalTickets]);

//   const addTicketType = () => {
//     setTicketTypes([
//       ...ticketTypes,
//       { id: Date.now(), type: "", quantity: 0, price: 0 },
//     ]);
//   };

//   const updateTicketType = (id, field, value) => {
//     const updatedTicketTypes = ticketTypes.map((ticketType) =>
//       ticketType.id === id
//         ? {
//             ...ticketType,
//             [field]:
//               field === "quantity"
//                 ? Math.min(value, remainingTickets + ticketType.quantity)
//                 : value,
//           }
//         : ticketType
//     );
//     setTicketTypes(updatedTicketTypes);
//   };

//   const removeTicketType = (id) => {
//     setTicketTypes(ticketTypes.filter((ticketType) => ticketType.id !== id));
//   };

//   const handleTotalTicketsChange = (e) => {
//     setTotalTickets(Number(e.target.value));
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold mb-4">Ticket Types</h2>
//       <p className="text-gray-700 mb-4">
//         Define the total tickets and add ticket types along with the quantity
//         available for each type.
//       </p>

//       <div className="mb-6">
//         <label
//           className="block text-gray-700 text-sm font-bold mb-2"
//           htmlFor="totalTickets"
//         >
//           Total Tickets
//         </label>
//         <input
//           type="number"
//           id="totalTickets"
//           value={totalTickets}
//           onChange={handleTotalTicketsChange}
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           min="0"
//         />
//       </div>

//       <div className="mb-4">Remaining Tickets: {remainingTickets}</div>

//       {ticketTypes.map((ticketType, index) => (
//         <div
//           key={ticketType.id}
//           className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 items-end"
//         >
//           <input
//             type="text"
//             placeholder="Ticket Type"
//             value={ticketType.type}
//             onChange={(e) =>
//               updateTicketType(ticketType.id, "type", e.target.value)
//             }
//             className="px-4 py-2 border rounded-lg"
//           />

//           <input
//             type="number"
//             placeholder="Quantity"
//             value={ticketType.quantity}
//             onChange={(e) =>
//               updateTicketType(
//                 ticketType.id,
//                 "quantity",
//                 Number(e.target.value)
//               )
//             }
//             className="px-4 py-2 border rounded-lg"
//             max={remainingTickets + ticketType.quantity}
//           />
//           <input
//             type="number"
//             placeholder="Price"
//             value={ticketType.price}
//             onChange={(e) =>
//               updateTicketType(ticketType.id, "price", Number(e.target.value))
//             }
//             className="px-4 py-2 border rounded-lg"
//           />
//           <button
//             onClick={() => removeTicketType(ticketType.id)}
//             className="text-red-500 hover:text-red-700 text-sm"
//           >
//             Remove
//           </button>
//         </div>
//       ))}

//       <button
//         onClick={addTicketType}
//         className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         disabled={remainingTickets <= 0}
//       >
//         Add Ticket Type
//       </button>
//     </div>
//   );
// };

// export default TicketTypesForm;

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "../utils/axiosConfig";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
const TicketTypesForm = () => {
  const params = useParams();
  const navigate = useNavigate();
  const eventData = useSelector((store) => store.eventSlice);
  console.log(
    "eventData>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>??????????????????????????????????????????????",
    eventData
  );
  const eventId = params.eventId;
  const [ticketTypes, setTicketTypes] = useState(
    eventData?.ticketTypes || [
      {
        id: Date.now(),
        type: "",
        quantity: 0,
        soldQuantity: 0,
        price: 0,
        description: "",
      },
    ]
  );
  const [totalTickets, setTotalTickets] = useState(
    eventData?.TotalTickets || 0
  );
  const [remainingTickets, setRemainingTickets] = useState(0);

  useEffect(() => {
    const totalQuantity = ticketTypes.reduce(
      (acc, curr) => acc + curr.quantity,
      0
    );

    console.log("remaing", totalTickets - totalQuantity);
    setRemainingTickets(totalTickets - totalQuantity);
  }, [ticketTypes, totalTickets]);

  const addTicketType = () => {
    const newTicketType = {
      id: Date.now(),
      type: "",
      quantity: 0,
      price: 0,
      description: "",
      soldQuantity: 0,
    };
    setTicketTypes([...ticketTypes, newTicketType]);
    setTotalTickets(totalTickets + newTicketType.quantity); // Update totalTickets
    setRemainingTickets(remainingTickets + newTicketType.quantity); // Update remainingTickets
  };

  // const updateTicketType = (id, field, value) => {
  //   const updatedTicketTypes = ticketTypes.map((ticketType) =>
  //     ticketType.id === id
  //       ? {
  //           ...ticketType,
  //           [field]:
  //             field === "quantity"
  //               ? Math.min(value, remainingTickets + ticketType.quantity)
  //               : value,
  //         }
  //       : ticketType
  //   );
  //   setTicketTypes(updatedTicketTypes);
  //   // Update remainingTickets after updating ticket quantity
  //   setRemainingTickets(totalTickets - updatedTicketTypes.reduce((acc, curr) => acc + curr.quantity, 0));
  // };

  //working  need to adjust for sold ticket a=cunt
  // const updateTicketType = (id, field, value) => {
  //   const ticketToUpdate = ticketTypes.find((ticketType) => ticketType.id === id);
  //   const updatedTicketTypes = ticketTypes.map((ticketType) =>
  //     ticketType.id === id
  //       ? {
  //           ...ticketType,
  //           [field]:
  //             field === "quantity"
  //               ? Math.min(value, remainingTickets + ticketType.quantity)
  //               : value,
  //         }
  //       : ticketType
  //   );

  //   if (field === "quantity" && value < ticketToUpdate.soldQuantity) {
  //     // If trying to set quantity below soldQuantity, reset to soldQuantity
  //     const updatedTicketType = {
  //       ...ticketToUpdate,
  //       quantity: ticketToUpdate.soldQuantity,
  //     };
  //     const updatedTicketIndex = updatedTicketTypes.findIndex(
  //       (ticketType) => ticketType.id === id
  //     );
  //     updatedTicketTypes.splice(updatedTicketIndex, 1, updatedTicketType);
  //   }

  //   setTicketTypes(updatedTicketTypes);
  //   setRemainingTickets(totalTickets - updatedTicketTypes.reduce((acc, curr) => acc + curr.quantity, 0));
  // };

  const updateTicketType = (id, field, value) => {
    const ticketToUpdate = ticketTypes.find(
      (ticketType) => ticketType.id === id
    );
    let updatedQuantity = value;

    // Ensure quantity is not set below soldQuantity
    if (field === "quantity" && value < ticketToUpdate.soldQuantity) {
      updatedQuantity = ticketToUpdate.soldQuantity;
      alert(
        `Already sold ${ticketToUpdate.soldQuantity} tickets in this category.`
      );
    }

    // Ensure quantity is not set to a negative value
    updatedQuantity = Math.max(updatedQuantity, 0);

    const updatedTicketTypes = ticketTypes.map((ticketType) =>
      ticketType.id === id
        ? {
            ...ticketType,
            [field]: field === "quantity" ? updatedQuantity : value,
          }
        : ticketType
    );

    setTicketTypes(updatedTicketTypes);
    setRemainingTickets(
      totalTickets -
        updatedTicketTypes.reduce((acc, curr) => acc + curr.quantity, 0)
    );
  };

  const removeTicketType = (id) => {
    const removedTicket = ticketTypes.find(
      (ticketType) => ticketType.id === id
    );
    setTicketTypes(ticketTypes.filter((ticketType) => ticketType.id !== id));
    // Update totalTickets and remainingTickets after removing ticket type
    setTotalTickets(totalTickets - removedTicket.quantity);
    setRemainingTickets(remainingTickets + removedTicket.quantity);
  };

  const handleTotalTicketsChange = (e) => {
    const newTotalTickets = Number(e.target.value);
    setTotalTickets(newTotalTickets);
    setRemainingTickets(
      newTotalTickets -
        ticketTypes.reduce((acc, curr) => acc + curr.quantity, 0)
    );
  };
  const saveTicketType = async () => {
    try {
      const response = await axios.put(`events/${eventId}/addTicketTypes`, {
        ticketTypes: ticketTypes.map((ticketType) => ({
          type: ticketType.type,
          quantity: ticketType.quantity,
          price: ticketType.price,
          description: ticketType.description,
          soldQuantity: ticketType.soldQuantity, // Include soldQuantity in the request
        })),
        TotalTickets: totalTickets, // Corrected to use totalTickets instead of TotalTickets
      });

      toast({ title: `Ticket types updated successfully` });
      navigate(`/events/share/${eventId}`);

      // You can add additional logic here if needed, such as showing a success message or updating the UI
    } catch (error) {
      console.error("Error updating ticket types:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "An error occurred while updating the ticket",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      // You can add error handling logic here, such as showing an error message
    }
  };
  const isAnyQuantityLessThanSold = ticketTypes.some(
    (ticketType) => ticketType.quantity < ticketType.soldQuantity
  );
  const handleSkip = () => {
    navigate(`/events/share/${eventId}`);
  };
  return (
    <div className="container mx-auto max-w-3xl">
      <h2 className="font-bold text-3xl mb-4">Ticket Types</h2>
      <p className="text-muted-foreground mb-6">
        Define the total tickets and add ticket types along with the quantity
        available for each type.
      </p>
      <div>Total Tickets: {eventData.TotalTicket}</div>
      <div className="mb-6">
        <Label htmlFor="totalTickets">Add Tickets</Label>
        <Input
          id="totalTickets"
          type="number"
          value={totalTickets}
          onChange={handleTotalTicketsChange}
          min="0"
        />
      </div>

      <div className="mb-4">
        <span className="font-bold">Remaining Tickets:</span> {remainingTickets}
      </div>
      <div className="flex w-full ml-auto ">
        <Button
          onClick={addTicketType}
          disabled={remainingTickets <= 0}
          className="mt-3 ml-auto"
        >
          Add Ticket Type
        </Button>
      </div>
      {totalTickets > 0 && (
        <>
          {ticketTypes.map((ticketType, index) => (
            <div
              key={ticketType.id}
              className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4 items-end"
            >
              <div className="space-y-2">
                <Label className="ml-2">Ticket Type</Label>
                <Input
                  placeholder="Ticket Type"
                  value={ticketType.type}
                  onChange={(e) =>
                    updateTicketType(ticketType.id, "type", e.target.value)
                  }
                />{" "}
              </div>
              <div className="space-y-2">
                <Label className="ml-2">Quantity</Label>
                <Input
                  type="number"
                  placeholder="Quantity"
                  value={ticketType.quantity}
                  onChange={(e) =>
                    updateTicketType(
                      ticketType.id,
                      "quantity",
                      Number(e.target.value)
                    )
                  }
                  max={remainingTickets}
                />{" "}
              </div>
              <div className="space-y-2">
                <Label className="ml-2">Sold</Label>
                <Input
                  placeholder="Ticket sold"
                  value={ticketType.soldQuantity}
                  // onChange={(e) =>
                  //   updateTicketType(ticketType.id, "type", e.target.value)
                  // }
                />{" "}
              </div>
              <div className="space-y-2">
                <Label className="ml-2">Description</Label>
                <Input
                  placeholder="Ticket Type Description"
                  value={ticketType.description}
                  onChange={(e) =>
                    updateTicketType(
                      ticketType.id,
                      "description",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="space-y-2">
                <Label className="ml-2">Price </Label>
                <Input
                  type="number"
                  placeholder="Price"
                  value={ticketType.price}
                  onChange={(e) =>
                    updateTicketType(
                      ticketType.id,
                      "price",
                      Number(e.target.value)
                    )
                  }
                  suffix="₹"
                />
              </div>
              {!ticketType.soldQuantity > 0 && (
                <Button
                  variant="outline"
                  color="destructive"
                  onClick={() => removeTicketType(ticketType.id)}
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
        </>
      )}

      <div className="flex flex-col  item-center ">
        {remainingTickets >= 0 && !isAnyQuantityLessThanSold && (
          <Button onClick={saveTicketType} className="mt-3">
            Submit
          </Button>
        )}
      </div>
      <div className="flex justify-end mt-5">
        <Button onClick={handleSkip}>Skip</Button>
      </div>
    </div>
  );
};

export default TicketTypesForm;

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/XDRRY7AY3XX
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function BuyTicketForm({ ticketTypes }) {
  const eventId = useSelector((state) => state?.eventSlice?.id);
  const event = useSelector((state) => state?.eventSlice);

  const navigate = useNavigate();
  console.log("types", ticketTypes);
  return (
    <Card className="container mx-auto max-w-3xl ">
      <div className="w-full underline"></div>
      <div className="font-bold text-3xl mt-5 ">{event.title}</div>
      <CardHeader className="pb-0">
        <CardTitle>Buy Tickets</CardTitle>
        <CardDescription>Select your ticket category</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid gap-4 md:gap-6 p-4 md:p-6">
          {ticketTypes?.map((ticket) => (
            <div
              key={ticketTypes?.id}
              className="flex flex-col  border m-1  p-1 rounded-lg md:flex-row items-start gap-4 md:items-center"
            >
              <div className="grid gap-1">
                <CardTitle className="text-xl">{ticket?.type}</CardTitle>
                <CardDescription>{ticket?.description}</CardDescription>
                {/* {ticket.quantity} */}
                {ticket.quantity > 10 ? (
                  <></>
                ) : ticket.quantity <= 10 ? (
                  <div className="text-red-500 mt-1">
                    {" "}
                    Filling Fast, Only {ticket.quantity} left!
                  </div>
                ) : (
                  <div className="text-red-500  font-bold ">Sold out</div>
                )}
              </div>
              <div className="ml-auto text-2xl font-bold">
                ₹{ticket?.price}/-
              </div>
              {ticket.quantity > 0 ? (
                <Button
                  onClick={() =>
                    navigate(`/events/${eventId}/buyTicket`, {
                      state: { ticket },
                    })
                  }
                  size="lg"
                >
                  Buy
                </Button>
              ) : (
                <Button disabled size="lg">
                  Sold Out
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

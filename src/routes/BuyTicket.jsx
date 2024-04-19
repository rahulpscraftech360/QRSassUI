import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ParticipantForm from "./ParticipantForm";
import { CardContent, Card, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";
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

const BuyTicket = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [paymentLink, setPaymentLink] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState();
  const location = useLocation();
  const { ticket } = location.state || {}; // Ensure there's a fallback if state is undefined
  const organization = useSelector(
    (state) => state?.organizationSlice?.organizationData.id
  );
  useEffect(() => {
    console.log("payment status updated", paymentStatus);
  }, [paymentStatus]);

  const eventData = useSelector((state) => state.eventSlice);
  console.log("here");
  console.log(eventData);
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    name: "",
    eventId: `${eventData?.id}`,
    ticket,
    organizationId: `${eventData.organization}`,
  });

  console.log("foemdata", formData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  function handlePhoneChange(event) {
    const { name, value } = event.target;

    // Remove non-numeric characters from the input value
    const numericValue = value.replace(/\D/g, "");

    // Update the state with the cleaned numeric value
    setFormData({
      ...formData,
      [name]: numericValue,
    });
  }

  console.log("payment link....", paymentLink);
  // Now you can use `ticket` to display data or whatever else you need

  // const pollPaymentStatus = (orderId) => {
  //   const interval = setInterval(async () => {
  //     const response = await fetch(
  //       `http://localhost:5000/razorpay/check-payment-status`
  //     );
  //     const { status } = await response.json(); // Destructure status here
  //     console.log("Polling for status: ", status);

  //     if (status === "success" || status === "failure") {
  //       setPaymentStatus(status);
  //       clearInterval(interval); // Stop polling once we have a definitive status
  //     }
  //   }, 5000); // Poll every 5 seconds, adjust as needed
  // };

  const pollPaymentStatus = (orderId) => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(
          // `http://localhost:5000/v1/razorpay/check-payment-status`,
          `http://64.227.172.82:5000/v1/razorpay/check-payment-status`,
          {
            method: "POST", // Specify the method
            headers: {
              "Content-Type": "application/json", // Set the content type header
            },
            body: JSON.stringify({ orderId }), // Stringify the body to JSON format
          }
        );

        // Check if the response is ok (status in the range 200-299)
        if (!response.ok) {
          // Handle HTTP errors
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { status } = await response.json();
        console.log("Polling for status: ", status);

        // Add your condition to clear the interval based on the response
        // For example, if the payment status is 'success' or 'failed', stop polling:
        if (status === "success") {
          console.log(`Final payment status: ${status}`);
          // toast({
          //   title: "Your Booking  was Successful!",
          //   description: "check email for ticket",
          //   // action: <ToastAction altText="Try again">Try again</ToastAction>,
          // });
          alert("Your Booking  was Successful!");
          // navigate("/");
          clearInterval(interval);
        }
      } catch (error) {
        console.error("Error polling payment status:", error);
        clearInterval(interval); // Optionally, stop polling on error
      }
    }, 5000); // Adjust polling interval as needed
  };
  const handlePaymentRedirect = (paymentLink) => {
    console.log("payment link data>>>", paymentLink);
    const paymentWindow = window.open(paymentLink, "_blank");

    if (paymentWindow) {
      paymentWindow.focus();

      paymentWindow.addEventListener("beforeunload", () => {
        // Handle the payment success or failure based on the response from Razorpay
        // handlePaymentSuccess();
        // // or
        // handlePaymentFailure();
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/razorpay/create-splitPayment",
        formData
      );
      const resp = await response.data;

      // setPaymentLink(resp.short_url);
      setPaymentLink(resp.data.paymentData.short_url);
      setOrder(resp.data.orderDetails);

      console.log("redirecting.......", paymentLink);

      handlePaymentRedirect(resp.data.paymentData.short_url);

      if (response.status === 200) {
        // const data = await response.json();
        console.log(
          "resp.data.orderDetails.order_id",
          resp.data.orderDetails._id
        );
        pollPaymentStatus(resp.data.orderDetails._id); // Start polling
      } else {
        setPaymentStatus("error");
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log("order", order);
  function extractDate(isoDateTime) {
    const date = new Date(isoDateTime);

    // Extract date components
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-indexed
    const day = date.getDate();

    // Construct the date string in the desired format
    const formattedDate = `${day < 10 ? "0" : ""}${day}/${
      month < 10 ? "0" : ""
    }${month}/${year}`;

    return formattedDate;
  }

  return (
    // <div>
    //   {/* Example usage */}
    //   <h1>Buy Ticket: {ticket?.type}</h1>
    //   <p>Description: {ticket?.description}</p>
    //   <p>Price: ₹{ticket?.price}/-</p>
    //   {/* Implement your logic here */}

    //   <Button
    //     // onClick={() =>
    //     //   navigate(`/events/${params.eventId}/buyTicket`, {
    //     //     state: { ticket },
    //     //   })
    //     // }
    //     size="lg"
    //   >
    //     Buy
    //   </Button>
    //   {/* <ParticipantForm /> */}

    // </div>

    <div className="grid gap-6 px-4 md:gap-10 md:px-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{eventData.title}</h1>
        <p className="text-gray-500 dark:text-gray-400">
          {eventData.startDate}-{eventData.endDate}
        </p>
      </div>
      <Card>
        <CardContent className="p-4">
          {eventData?.backgroundImage ? (
            // If eventData?.backgroundImage exists, use it as src
            <img
              alt="Music Festival"
              className="aspect-[2/1] rounded-lg object-cover"
              height="200"
              src={eventData?.backgroundImage}
            />
          ) : (
            <img
              alt="Music Festival"
              className=" rounded-lg object-cover"
              height="200"
              src={
                "https://images.template.net/wp-content/uploads/2014/11/Natural-Facebook-Cover-Photo.jpg?width=480"
              }
              // width="480"
            />
            // If eventData?.backgroundImage does not exist, use default image URL
          )}

          {/* <img
            alt="Music Festival"
            className="aspect-[2/1] rounded-lg object-cover"
            height="200"
            src={eventData?.backgroundImage}
            width="400"
          /> */}
        </CardContent>
      </Card>
      <Card>
        <CardContent className="space-y-4 p-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">{eventData.title}</h2>
            <p className="text-gray-500 dark:text-gray-400">
              {eventData.description}
            </p>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <div className="space-y-2">
              <h3 className="font-bold">Date</h3>
              <p>
                From:<> </>
                {extractDate(eventData.startDate)}
              </p>
              <p>
                To:<> </>
                {extractDate(eventData.endDate)}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold">Venue</h3>
              <p> {eventData.location}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="p-4">
          <h1 className="text-4xl font-bold"> {ticket?.type}</h1>
          <p>{ticket?.description}</p>

          <h3 className="text-2xl font-bold">₹{ticket?.price}</h3>
          <p className="text-gray-500 dark:text-gray-400">Per ticket</p>
        </CardHeader>
        <CardContent className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-3  items-start gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  name="email"
                  placeholder="Enter your email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handlePhoneChange}
                  id="phoneNumber"
                  placeholder="Enter your phone"
                />
              </div>
            </div>
            {/* {!paymentLink && ( */}
            <Button className="w-full" type="submit">
              Proceed to Payment
            </Button>
            {/* )} */}
          </form>
          {/* {paymentLink && (
            <Button onClick={() => handlePaymentRedirect(paymentLink)}>
              Proceed to Payment
            </Button>
          )} */}
        </CardContent>
      </Card>
    </div>
  );
};

export default BuyTicket;

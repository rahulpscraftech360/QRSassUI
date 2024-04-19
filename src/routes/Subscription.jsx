import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import organizationSlice from "./../utils/organizationSlice";
import axios from "../utils/axiosConfig";
import { toast } from "@/components/ui/use-toast";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/uevgZ2PPPQ6
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

const Subscription = () => {
  const [plan, setPlan] = useState("");
  const [prices, setPrices] = useState([]);
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [priceId, setPriceId] = useState();
  const [paymentData, setPaymentData] = useState();
  const organization = useSelector(
    (store) => store.organizationSlice.organizationData
  );
  const orgId = organization.id;
  const [subscriptionStatus, setSubscription] = useState();
  console.log("organization", organization);
  const navigate = useNavigate();
  const email = organization.email;
  const handlePlanChange = (newPlan) => {
    console.log("newPlan", newPlan);
    setPriceId(newPlan.id);
    setPlan(newPlan);
    createSubscription(newPlan.id, organization);
  };
  const handlePaymentRedirect = (paymentLink) => {
    console.log("payment link data>>>", paymentLink);
    if (paymentLink) {
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
    }
  };
  // const pollSubscriptionStatus = (orgId) => {
  //   const interval = setInterval(async () => {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:5000/v1/organizations/${orgId}/checkSubscription`,
  //         {
  //           method: "GET", // Specify the method
  //           headers: {
  //             "Content-Type": "application/json", // Set the content type header
  //           },
  //           // Stringify the body to JSON format
  //         }
  //       );

  //       // Check if the response is ok (status in the range 200-299)
  //       if (!response.status == 200) {
  //         // Handle HTTP errors
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }

  //       const { status } = await response.json();
  //       console.log("Polling for status: ", response.status);

  //       // Add your condition to clear the interval based on the response
  //       // For example, if the payment status is 'success' or 'failed', stop polling:
  //       if (status === "true") {
  //         console.log(`Final payment status: ${status}`);
  //         // toast({
  //         //   title: "Your Booking  was Successful!",
  //         //   description: "check email for ticket",
  //         //   // action: <ToastAction altText="Try again">Try again</ToastAction>,
  //         // });
  //         alert("Your subscription  was Successful!");
  //         // navigate("/");
  //         clearInterval(interval);
  //       }
  //     } catch (error) {
  //       console.error("Error polling payment status:", error);
  //       clearInterval(interval); // Optionally, stop polling on error
  //     }
  //   }, 10000); // Adjust polling interval as needed
  // };

  const pollSubscriptionStatus = (orgId) => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(
          // `http://localhost:5000/v1/organizations/${orgId}/checkSubscription`,
          `http://64.227.172.82:5000/v1/organizations/${orgId}/checkSubscription`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { active } = await response.json();
        console.log("Polling for status: ", active);

        // Stop polling if subscription is not active
        if (!active) {
          console.log("Subscription is not active.");
          // clearInterval(interval);

          return;
        }
        if (active) {
          console.log("Subscription is activated. Stopping polling.");
          clearInterval(interval);
          toast({
            title: `Subscription is activated Successfully`,
          });
          navigate("/events/CreateEvent");
          return;
        }

        // If subscription is active, continue polling
      } catch (error) {
        console.error("Error polling subscription status:", error);
        clearInterval(interval); // Stop polling on error
      }
    }, 10000); // Adjust polling interval as needed
  };

  const createSubscription = async (id) => {
    console.log("<><><><><><><><<>>><><>");
    console.log("here");
    console.log(id);

    console.log("firstpriceIdemail", id, organization);

    try {
      setSubscriptionData(null);
      const response = await axios.post(
        // "http://localhost:5000/v1/razorpay/razorpay-webappSubscription",
        "http://64.227.172.82:5000/v1/razorpay/razorpay-webappSubscription",
        {
          organization,
          plan,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("create Subscription", response.data);

      setSubscriptionData(response.data);
      setPaymentData(response.data);
      handlePaymentRedirect(response.data?.paymentLink);
      if (response.status === 200) {
        // const data = await response.json();
        console.log("resp.datapaymentData", response.data.paymentData);
        pollSubscriptionStatus(orgId); // Start polling
      } else {
        setSubscription("error");
      }
    } catch (error) {
      console.error("Error creating subscription:", error);
    }
  };
  console.log("redirectiong.......", paymentData);

  // useEffect(() => {
  //   console.log("first", subscriptionData);

  //   // handlePaymentRedirect("://rzp.io/i/hnFDJmIBOo");
  //   setSubscriptionData(null);
  // }, [subscriptionData]);
  // useEffect(() => {
  //   pollPaymentStatus();
  // }, [paymentData]);

  useEffect(() => {
    const fetchPrices = async () => {
      setPrices([
        {
          id: 1,
          name: "Basic",
          unit_amount: 1499, // Amount in cents (e.g., 5000 cents = $50)
          recurring: {
            interval: "yearly", // Subscription interval (e.g., month, year)
          },
          paymentLink: "https://rzp.io/i/ERm6nxT7Z",
        },
        {
          id: 2,
          name: "Gold",
          unit_amount: 1499,
          recurring: {
            interval: "Yearly",
          },
          paymentLink: "https://rzp.io/i/ERm6nxT7Z",
        },
        {
          id: 3,
          name: "Pro",
          unit_amount: 1499,
          recurring: {
            interval: "Yearly",
          },
          paymentLink: "https://rzp.io/i/ERm6nxT7Z",
        },
        // Add more pricing options as needed
      ]);
    };
    fetchPrices();
    console.log("price", prices);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/razorpay/create-subscription");
      const resp = await response.data;

      // setPaymentLink(resp.short_url);
      //setPaymentLink(resp.data.paymentData?.short_url);
      setPaymentData(resp.data.paymentData);
      console.log("response", resp);
      console.log("redirectiong.......", paymentData);

      // handlePaymentRedirect(resp?.data?.paymentData?.short_url);
      handlePaymentRedirect(subscriptionData?.paymentLink);
      if (response.status === 200) {
        // const data = await response.json();
        console.log("resp.datapaymentData", resp.data.paymentData);
        // pollSubscriptionStatus(orgId); // Start polling
      } else {
        setSubscription("error");
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log("order");
  //find subscription status

  return (
    <section className="w-full py-6 md:py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
              Plans
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Choose the perfect plan for your team
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Whether you're a small startup or a large enterprise, we have a
              plan that scales with your needs. All plans include 24/7 support
              and a 30-day money-back guarantee.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-sm items-start gap-8 sm:max-w-4xl sm:grid-cols-2 lg:max-w-5xl lg:grid-cols-3">
          {prices?.map((price) => (
            <div
              key={price.id}
              onClick={() => handlePlanChange(price)}
              className="flex flex-col rounded-lg border border-gray-100 border-gray-100 overflow-hidden shadow-sm bg-white dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950"
            >
              <div className="grid gap-4 p-6">
                <h3 className="text-xl font-semibold">{price.name}</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-semibold">
                    ₹{price.unit_amount}
                  </span>
                  {price?.recurring?.interval ? (
                    <> /{price?.recurring?.interval}</>
                  ) : (
                    <> -lifetime</>
                  )}

                  <span className="text-sm text-gray-500 dark:text-gray-400"></span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Perfect for small teams just getting started.
                </p>
              </div>
              <ul className="grid gap-4 p-6 border-t  border-gray-200 dark:border-gray-850 dark:border-gray-850">
                <li>
                  <CheckIcon className="inline-block h-4 w-4 mr-2" />
                  Unlimited projects
                </li>
                <li>
                  <CheckIcon className="inline-block h-4 w-4 mr-2" />3 team
                  members
                </li>
                <li>
                  <CheckIcon className="inline-block h-4 w-4 mr-2" />
                  Basic CI/CD
                </li>
              </ul>
              <div className="p-6">
                <a
                  onClick={() => {
                    handleSubmit;
                  }}
                  // href={price.paymentLink}
                  className="w-full  rounded-md border  border-gray-200 bg-gray-50 py-2 text-sm font-semibold shadow-sm flex items-center justify-center transition-colors hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                >
                  Subscribe
                </a>
              </div>
            </div>
          ))}
          {/* <div className="flex flex-col rounded-lg border-2 border-indigo-600 overflow-hidden shadow-lg bg-indigo-50 dark:bg-indigo-950">
            <div className="grid gap-4 p-6">
              <h3 className="text-xl font-semibold">Pro</h3>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-semibold">$99</span>
                <span className="text-sm">/month</span>
              </div>
              <p className="text-sm">Advanced features for your team.</p>
            </div>
            <ul className="grid gap-4 p-6 border-t border-gray-200 border-gray-200 dark:border-gray-850 dark:border-gray-850">
              <li>
                <CheckIcon className="inline-block h-4 w-4 mr-2" />
                Unlimited projects
              </li>
              <li>
                <CheckIcon className="inline-block h-4 w-4 mr-2" />
                10 team members
              </li>
              <li>
                <CheckIcon className="inline-block h-4 w-4 mr-2" />
                Advanced CI/CD
              </li>
            </ul>
            <div className="p-6" onClick={() => handlePlanChange(price)}>
              <a
                className="w-full inline-block rounded-md border border-indigo-600 bg-indigo-600 py-2 text-sm font-semibold shadow-sm flex items-center justify-center text-gray-50 transition-colors hover:bg-indigo-600/90 dark:border-indigo-300 dark:bg-indigo-300 dark:hover:bg-indigo-300/90 dark:hover:text-gray-900 dark:focus-visible:ring-gray-300"
                href="https://buy.stripe.com/test_3cs9Csc3M69s36M4gg"
              >
                Subscribe to Pro
              </a>
            </div>
          </div>
          <div className="flex flex-col rounded-lg border border-gray-100 border-gray-100 overflow-hidden shadow-sm bg-white dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950">
            <div className="grid gap-4 p-6">
              <h3 className="text-xl font-semibold">Enterprise</h3>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-semibold">$249</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  /month
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Customizable plan for enterprise teams.
              </p>
            </div>
            <ul className="grid gap-4 p-6 border-t border-gray-200 border-gray-200 dark:border-gray-850 dark:border-gray-850">
              <li>
                <CheckIcon className="inline-block h-4 w-4 mr-2" />
                Unlimited projects
              </li>
              <li>
                <CheckIcon className="inline-block h-4 w-4 mr-2" />
                Unlimited team members
              </li>
              <li>
                <CheckIcon className="inline-block h-4 w-4 mr-2" />
                Premium support
              </li>
            </ul>
            <div className="p-6">
              <Link
                className="w-full inline-block rounded-md border border-gray-200 border-gray-200 bg-gray-50 py-2 text-sm font-semibold shadow-sm flex items-center justify-center transition-colors hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                href="#"
              >
                Contact Sales
              </Link>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Subscription;

function CheckIcon(props) {
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
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

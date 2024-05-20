import React, { useEffect, useState } from "react";

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/MsgRGktNgYd
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AppSubscriptionData from "@/components/AppSubscriptionData";
import axios from "../utils/axiosConfig";
import Notion from "./Notion";
export default function SettingsPage() {
  const organization = useSelector(
    (store) => store.organizationSlice?.organizationData
  );
  const [subscription, setSubscription] = useState();
  console.log("organizationId", organization);
  // Convert plan end date to Date object
  const planEndDate = new Date(organization?.subscription?.currentPeriodEnd);
  const navigate = useNavigate();
  // Get today's date
  const today = new Date();
  const isActive = planEndDate > today;
  console.log(planEndDate, "plan end date");
  const handleRenewClick = () => {
    // Navigate to the subscribe page
    navigate("/Subscription"); // Update with your actual subscribe route
  };
  const handleRazorpayConnect = () => {
    // Navigate to the subscribe page
    navigate("/account/razorpay/connect"); // Update with your actual subscribe route
  };
  const getApp = async () => {
    // console.log("inside getapp", organization);
    try {
      console.log("fetchingn app data", organization.id);
      const organizationId = organization.id;
      let response = await axios.get(
        `/appSubscribe/subscriptions/${organizationId}`,
        {
          // headers: {
          //   Organization: organization,
          // },
        }
      );
      const app = response.data;
      console.log("printing app data");
      console.log(">>>>>>apps>>> ", app);
      setSubscription(app);
      console.log("appp", app);

      // setSubscriptionInfo(apps.data.appsubscription.apiKeyInfo);
      //console.log("subscriptionInfo", subscriptionInfo);
      // if (subscriptionInfo?.valid === true) {
      //   setIsActiveSubScription(true);
      //   console.log("valid", isActiveSubScription);
      // } else {
      //   setIsActiveSubScription(false);
      // }
      // if (app) {
      //   // Ensure `app` is not null
      //   setFormData((prevFormData) => ({
      //     ...prevFormData,
      //     appName: app.appName, // Update `appName` in formData
      //   }));
      // }
      console.log("app >>>", app);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const fetchSubscription = async () => {
      await getApp();
    };

    fetchSubscription();
  }, []);
  return (
    <div className="w-full  shadow-md  px-4 md:gap-10 md:px-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold pt-10">Settings</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your account information and subscriptions
          </p>
        </div>
        <div className="space-y-6">
          <div className="border rounded-lg">
            <div className="p-4 border-b dark:border-gray-800">
              <h2 className="text-lg font-bold">Account Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 ">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder={organization?.name} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder={organization.email}
                  required
                  type="email"
                />
              </div>
            </div>
            <div className="p-4 flex items-center justify-end">
              {/* <Button variant="outline">Save</Button> */}
            </div>
          </div>
          <div className="border rounded-lg">
            {/* <Notion /> */}
            <div className="p-4 border-b dark:border-gray-800">
              <h2 className="text-lg font-bold">Subscription</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 p-4">
              <div>
                <div className="font-semibold">Plan</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {organization?.subscription?.planName ? (
                    <>{organization?.subscription?.planName}</>
                  ) : (
                    <>Trial</>
                  )}
                </div>
              </div>
              <div>
                <div className="font-semibold">Status</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <div>
                    {isActive ? (
                      <div>active</div>
                    ) : (
                      <div>inactive</div> // or any other status you prefer
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div className="font-semibold">
                  {isActive ? <div>Renewal Date</div> : <div>Plan Expired</div>}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {planEndDate.toDateString()}
                  {!isActive && (
                    <div className="p-4 flex items-center justify-end">
                      <Button onClick={handleRenewClick} variant="outline">
                        Renew
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="border rounded-lg">
            <div className="p-4 border-b dark:border-gray-800">
              <h2 className="text-lg font-bold">App Subscriptions</h2>
            </div>
            <div className="p-4 grid gap-4">
              {organization?.appSubscription?.map((app) => (
                <AppSubscriptionData key={app.id} app={app} />
              ))}
            </div>
          </div>
          <div className="border rounded-lg">
            <div className="p-4 border-b dark:border-gray-800">
              <h2 className="text-lg font-bold">Raozorpay</h2>
            </div>
            <div className=" flex  m-3 justify-center">
              <Button onClick={handleRazorpayConnect}>Connect Razorpay</Button>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

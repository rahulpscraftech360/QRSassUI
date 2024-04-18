import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import axios from "../utils/axiosConfig";
const AppSubscriptionData = (subscription) => {
  const [app, setApp] = useState();
  const appId = "65c5d9f1c51a96064c40dc1e";
  console.log(">>subscription>>", subscription.app);
  const getApp = async () => {
    // console.log("inside getapp", organization);
    try {
      console.log("fetchingn app data", appId);
      let response = await axios.get(`/apps/${appId}`, {
        // headers: {
        //   Organization: organization,
        // },
      });
      const app = response.data;
      console.log("printing app data");
      console.log(">>>>>>apps>>> ", app);
      setApp(app);
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
    const fetchData = async () => {
      await getApp();
    };

    fetchData();
  }, []);
  const copyToClipboard = (str) => {
    navigator.clipboard
      .writeText(str)
      .then(() => {
        // You can add any callback here to notify the user that the copy was successful
        alert("API Key copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  return (
    <div className="grid grid-cols-3 items-center">
      <div>{app?.appName}</div>
      <div>expiry Date :{subscription?.app?.keyExpiryDate}</div>
      <div className="gap-x-3 flex ">
        {/* <Button size="sm">Upgrade</Button> */}
        <Button
          onClick={() => copyToClipboard(subscription?.app?.apiKey)}
          style={{ cursor: "pointer" }}
          size="sm"
        >
          Copy API Key
        </Button>
      </div>
    </div>
  );
};

export default AppSubscriptionData;

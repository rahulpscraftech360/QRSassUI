import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogContent,
  Dialog,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import axios from "../utils/axiosConfig";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addData, updateData } from "@/utils/dataSlice";
import { extractDatesFromApiKey } from "@/utils/apikey";
import organizationSlice from "./../utils/organizationSlice";

const AppInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [app, setApp] = useState();
  console.log("app<<<<<<<<<<<<<<<<<<<<<<<<<", app);
  const [apiKeyInfo, setApiKeyInfo] = useState();
  const params = useParams();
  const [isActiveSubScription, setIsActiveSubScription] = useState(false);
  const appId = params.appId;
  const [apiKey, setApikey] = useState({
    apiKey: "",
  });
  const [apiKeyNow, setApiKeyNow] = useState();
  const [open, setOpen] = useState(false);
  const [data, setUpdateData] = useState();
  const organization = useSelector(
    (state) => state?.organizationSlice?.organizationData
  );
  console.log("organization", organization);
  const organizationId = organization.id;
  console.log("Organization>>>", organization);
  const [subscriptionInfo, setSubscriptionInfo] = useState(null);
  console.log("api keyyyy", subscriptionInfo);
  useEffect(() => {
    const fetchData = async () => {
      await getApp();
    };

    fetchData();
  }, [data]);

  useEffect(() => {
    console.log("Here useEffect get subscription details");
    const fetchData = async () => {
      getSubscriptionInfo();
    };

    fetchData();
  }, [app, subscriptionInfo]);
  useEffect(() => {
    console.log("Here isOnline useEffect");
    getApp();
  }, [appId, open]);

  const getSubscriptionInfo = async () => {
    console.log("call for getSubscriptionInfo", organizationId, appId);
    try {
      let subscription = await axios.get(`/appSubscribe/${appId}`, {
        headers: {
          Organization: organizationId,
        },
      });
      console.log("heree");
      console.log("subscription>>>", subscription);
      if (subscription.data === null) {
        setIsActiveSubScription(false);
      }

      if (subscription.data) {
        console.log("setting subscription", subscription.data, "<<<<<");
        setApiKeyInfo(subscription.data.apiKeyInfo);
        setApiKeyNow(subscription.data.app.apiKey);
        console.log(
          "apiKeyInfo<<<<<<<<<<<<<<<<<<<<<<",
          apiKeyInfo
          // subscription.data.data.apiKeyInfo.valid
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
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

  const [formData, setFormData] = useState({
    appId: appId,
    appName: "",
    startDate: "",
    endDate: "",
    organizationId: organizationId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // For address fields, update nested state
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleApIKeyChange = (e) => {
    const { name, value } = e.target;
    setApikey({
      ...apiKey,
      [name]: value,
    });
    console.log(">>>>", apiKey);
  };

  const GenerateApiKey = async () => {
    // navigate(`/apps/${app.id}`);
    console.log("FormData", formData);
    const api = await axios.post("/appSubscribe", { formData });
    console.log("updatedOrganization,", api.data);
    setUpdateData(api.data);
    // setModal(!isModal);
    alert("success");
    navigate();
    setOpen(false);
    console.log("open", open);
  };

  const checkApiKeyOffline = () => {
    function decodeJWT(token) {
      // Split the JWT into its three parts
      const parts = token.split(".");
      if (parts.length !== 3) {
        throw new Error("The token is invalid");
      }

      // Decode the payload
      const payload = parts[1];
      const decodedPayload = atob(
        payload.replace(/-/g, "+").replace(/_/g, "/")
      );
      console.log("api validity");
      // Parse the JSON payload
      return JSON.parse(decodedPayload);
    }

    const token = apiKey.apiKey;
    // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IjY1YmM4ZjA3ODQ0MGJjNjM4NDVjYTgzMCIsInN0YXJ0IjoxNzA2NzI1ODAwLCJlbmQiOjE3MDc1MDM0MDAsInR5cGUiOiJhcHBBY2Nlc3MiLCJwZXJtaXNzaW9ucyI6WyJyZWFkIl0sImlhdCI6MTcwNzEzMTYwNCwiaXNzIjoiaXNzdWVkIGJ5IGNyYWZ0ZWNoMzYwIn0.tdOrmOcXPzeFLUW1FBBqZzexEdgsycMuYjN_wfx3xsE";
    const decoded = decodeJWT(token);
    console.log(">>>>", decoded);

    const currentTime = Math.floor(Date.now() / 1000);

    if (currentTime < decoded.end) {
      console.log("API key is valid and not expired.");
      alert("valid api");
      window.location.href = "http://localhost:3006";
    } else {
      console.log("API key has expired.");
      alert("API key has expired.");
      // API key is expired, handle accordingly (e.g., show an error message)
    }
  };

  const truncateString = (str, num) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  };

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
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };
  return (
    <div className="flex   justify-center items-center p-10 mt-10">
      <div className=" ">
        <Card className=" p-5 m-5 flex flex-col justify-center items-center mb-5">
          <CardHeader>
            <CardTitle>{app?.appName}</CardTitle>
            <CardDescription>{app?.description}</CardDescription>
          </CardHeader>

          <>
            <DialogFooter className="flex  items-center flex-center">
              <div>
                {!isActiveSubScription && (
                  <content className="sm:max-w-[425px] ">
                    {apiKeyInfo?.valid !== true ? (
                      <>
                        <div className=" m-3">
                          <p>
                            Please select the start and end dates for your
                            subscription.
                          </p>
                        </div>
                        <div className="grid gap-4 py-4 px-2 rounded-xl">
                          <div className="grid grid-cols-4 items-center gap-4 ">
                            <label className="text-right" htmlFor="start-date">
                              Start Date
                            </label>
                            <input
                              onChange={handleChange}
                              className="col-span-3 bg-gray-600"
                              id="startDate"
                              type="date"
                              name="startDate"
                              value={formData.startDate}
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label className="text-right" htmlFor="end-date">
                              End Date
                            </label>
                            <input
                              onChange={handleChange}
                              className="col-span-3 bg-gray-600"
                              id="endDate"
                              name="endDate"
                              value={formData.endDate}
                              type="date"
                            />
                          </div>
                        </div>
                        <footer className="flex m-2 justify-center items-center gap-3">
                          <button
                            className="bg-emerald-500 text-white p-3 rounded-lg "
                            onClick={() => GenerateApiKey()}
                            type="submit"
                          >
                            Generate ApiKey
                          </button>
                        </footer>
                      </>
                    ) : (
                      <></>
                    )}
                  </content>
                )}
              </div>
              {apiKeyInfo && (
                <div>
                  <div className="flex item-center justify-center">
                    {apiKeyInfo?.valid ? (
                      <p p className="text-green-400">
                        Active
                      </p>
                    ) : (
                      <p className="text-red-400 ">
                        No valid Activation For Today
                      </p>
                    )}
                  </div>

                  <div className=" ">
                    Start Date:
                    <p className=" pl-2">
                      {new Date(apiKeyInfo.startDate).toLocaleString("en-US", {
                        weekday: "long", // "Monday"
                        year: "numeric", // "2024"
                        month: "long", // "February"
                        day: "numeric", // "7"
                      })}
                    </p>
                  </div>
                  <div>
                    End Date:
                    <p className="gap-1">
                      {new Date(apiKeyInfo.endDate).toLocaleString("en-US", {
                        weekday: "long", // "Monday"
                        year: "numeric", // "2024"
                        month: "long", // "February"
                        day: "numeric", // "7"
                      })}
                    </p>
                  </div>

                  {apiKeyNow && (
                    <div className="m-5">
                      {" "}
                      API KEY
                      <output
                        className=" m-2 gap-2 p-4 mt-5 rounded-lg"
                        onClick={() => copyToClipboard(apiKeyNow)}
                        style={{ cursor: "pointer", border: "1px solid #ccc" }}
                      >
                        {truncateString(apiKeyNow, 30)}
                      </output>
                    </div>
                  )}
                </div>
              )}
            </DialogFooter>
          </>
        </Card>
      </div>
    </div>
  );
};

export default AppInfo;

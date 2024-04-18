import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosConfig";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Apps = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [allApps, setApps] = useState(null);

  const handleSubscription = (id) => {
    console.log("open app");
    navigate(`/apps/${id}`);
    console.log("subscribe", id);
  };
  const getApps = async () => {
    try {
      console.log(">>>>>>HHHHHHH");
      let apps = await axios.get("/apps/all");
      console.log("data", apps.data);
      await setApps(apps.data);
      console.log("appState>>", allApps);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    console.log("getting app");
    getApps();
  }, []);
  return (
    <div>
      <main className="flex flex-1 flex-col  p-4 md:gap-8 md:p-6">
        <div className="flex ">
          <h1 className="font-semibold text-lg md:text-2xl">Applications</h1>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allApps?.map((app) => (
            <Card key={app.id}>
              <CardContent className="flex items-center gap-4 justify-center pt-2">
                <PackageIcon className="h-6 w-6" />
                <div className="flex-1">
                  <CardTitle className="text-base font-semibold">
                    {app.appName}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {app.description}
                  </CardDescription>
                </div>
                <Button size="sm" onClick={() => handleSubscription(app.id)}>
                  OPEN
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Apps;

function PackageIcon(props) {
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
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

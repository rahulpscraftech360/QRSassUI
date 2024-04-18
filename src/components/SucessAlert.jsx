import React from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

import { RocketIcon } from "@radix-ui/react-icons";

const SucessAlert = (data) => {
  return (
    <div>
      <Alert>
        <RocketIcon className="h-4 w-4" />
        <AlertTitle>{data}</AlertTitle>
        <AlertDescription>
          You can add components to your app using the cli.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default SucessAlert;

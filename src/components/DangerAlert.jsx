import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { AlertCircle } from "lucide-react";
const DangerAlert = ({ Error }) => {
  return (
    <>
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>{Error}</AlertDescription>
      </Alert>
    </>
  );
};

export default DangerAlert;

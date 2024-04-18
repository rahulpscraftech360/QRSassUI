import React, { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Create the Dropzone component receiving props
export function Dropzone({ onChange, className, ...props }) {
  const fileInputRef = useRef(null); // Reference to file input element
  const [fileInfo, setFileInfo] = useState(null); // Information about the uploaded file
  const [error, setError] = useState(null); // Error message state

  // Function to handle drag over event
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Function to handle drop event
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { files } = e.dataTransfer;
    if (files.length > 0) {
      handleFiles(files[0]); // Process only the first file
    }
  };

  // Function to handle file input change event
  const handleFileInputChange = (e) => {
    const { files } = e.target;
    if (files && files[0]) {
      handleFiles(files[0]); // Process only the first file
    }
  };

  // Function to handle processing of the uploaded file
  const handleFiles = (file) => {
    if (!file.type.startsWith("image/")) {
      setError("Invalid file type. Only images are allowed.");
      return;
    }

    const fileSizeInKB = Math.round(file.size / 1024); // Convert file size to KB
    const fileInfoStr = `${file.name} (${fileSizeInKB} KB)`; // Combine file name and size

    onChange(URL.createObjectURL(file)); // Update state with the file URL

    setFileInfo(fileInfoStr); // Display file information
    setError(null); // Reset error state
  };

  // Function to simulate a click on the file input element
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Card
      className={`border-2 border-dashed bg-muted hover:cursor-pointer hover:border-muted-foreground/50 ${className}`}
      {...props}
    >
      <CardContent
        onClick={handleButtonClick}
        className="flex flex-col items-center justify-center space-y-2 px-2 py-4 text-xs"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex items-center justify-center text-muted-foreground">
          {/* <span className="font-medium">
            Drag an image file here or click to upload
          </span> */}
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto flex h-8 space-x-2 px-0 pl-1 text-xs"
          >
            Drag an image file here or click to upload Browse
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*" // Accept all image types
            onChange={handleFileInputChange}
            className="hidden"
            multiple={false} // Restrict to only one file
          />
        </div>
        {fileInfo && <p className="text-muted-foreground">{fileInfo}</p>}
        {error && <span className="text-red-500">{error}</span>}
      </CardContent>
    </Card>
  );
}

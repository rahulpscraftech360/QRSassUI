// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
// import { storage } from "../utils/firebase";
// import HtmlTempate from "../components/HtmlTempate";
// import { Upload, Input, Button, message } from "antd";
// import { InboxOutlined } from "@ant-design/icons";
// //import "antd/dist/antd.css"; // Import Ant Design styles
// import "antd/dist/reset.css";
// import Head from "../components/Head";
// import TabletQRCodeScanner from "../components/TabletQRCodeScanner";

// const { Dragger } = Upload;
// const { TextArea } = Input;

// const TabPreview = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [backgroundImage, setBackgroundImage] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const eventData = useSelector((store) => store.eventData[0]);
//   const [inputSubject, setInputSubject] = useState("");
//   const [uploadProgress, setUploadProgress] = useState(null);
//   const uploadProps = {
//     name: "file",
//     multiple: false,
//     beforeUpload: (file) => {
//       setSelectedFile(file);
//       return false; // Prevent automatic upload
//     },
//     onRemove: () => {
//       setSelectedFile(null);
//     },
//   };

//   const handleImageUpload = () => {
//     if (!selectedFile) {
//       message.error("Please select an image file to upload");
//       return;
//     }

//     setIsUploading(true);
//     const fileRef = ref(storage, `images/${Date.now()}`);

//     const uploadTask = uploadBytesResumable(fileRef, selectedFile);
//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const progress =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log(`Upload is ${progress}% done`);
//         setUploadProgress(progress);
//       },
//       (error) => {
//         console.error("Error uploading image:", error);
//         setIsUploading(false);
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           console.log("File available at", downloadURL);
//           setBackgroundImage(downloadURL);
//           setIsUploading(false);
//         });
//       }
//     );
//   };
//   const [verticalPosition, setVerticalPosition] = useState(25); // Initial vertical position
//   const [horizontalPosition, setHorizontalPosition] = useState(25); // Initial horizontal position
//   const [scannerSize, setScannerSize] = useState(50);
//   const handleVerticalChange = (e) => {
//     setVerticalPosition(e.target.value);
//   };

//   const handleHorizontalChange = (e) => {
//     setHorizontalPosition(e.target.value);
//   };
//   const handleScannerSizeChange = (e) => {
//     setScannerSize(e.target.value);
//   };
//   return (
//     <>
//       <Head />
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-2">
//         <div className="gap-3 justify-center items-center">
//           <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
//           <div>
//             <Dragger {...uploadProps}>
//               <p className="ant-upload-drag-icon">
//                 <InboxOutlined />
//               </p>
//               <p className="ant-upload-text">
//                 Click or drag image to this area to upload
//               </p>
//             </Dragger>
//           </div>

//           <Button
//             type="primary"
//             onClick={handleImageUpload}
//             disabled={isUploading}
//             loading={isUploading}
//             style={{ marginTop: 16 }}
//           >
//             {isUploading
//               ? `Uploading...${uploadProgress}% done`
//               : "Start Upload"}
//           </Button>

//           <div>
//             <div className="slider-container ">
//               <label htmlFor="vertical">Vertical Position:</label>
//               <input
//                 className="ml-2"
//                 type="range"
//                 id="vertical"
//                 min="0"
//                 max="100"
//                 value={verticalPosition}
//                 onChange={handleVerticalChange}
//               />

//               <label htmlFor="horizontal">Horizontal Position:</label>
//               <input
//                 className="ml-2"
//                 type="range"
//                 id="horizontal"
//                 min="0"
//                 max="100"
//                 value={horizontalPosition}
//                 onChange={handleHorizontalChange}
//               />
//               {/* <label htmlFor="size">Scanner Size:{scannerSize}</label>
//               <input
//                 className="ml-2"
//                 type="range"
//                 id="size"
//                 min="1"
//                 max="100"
//                 value={scannerSize}
//                 onChange={handleScannerSizeChange}
//               /> */}
//             </div>
//           </div>
//         </div>
//         <div>
//           <h2>Tab Preview</h2>

//           {backgroundImage && (
//             <TabletQRCodeScanner
//               backgroundImage={backgroundImage}
//               scannerSize={scannerSize}
//               scannerPosition={{
//                 top: verticalPosition,
//                 left: horizontalPosition,
//               }}
//             />
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default TabPreview;

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/WZxZOjFXqwk
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../utils/firebase";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastAction } from "@radix-ui/react-toast";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import axios from "../utils/axiosConfig";
import { useParams } from "react-router-dom";
export default function TabPreview() {
  const [verticalPosition, setVerticalPosition] = useState(30); // Initial vertical position
  const [horizontalPosition, setHorizontalPosition] = useState(35); // Initial horizontal position
  const [scannerSize, setScannerSize] = useState(50);
  const handleVerticalChange = (e) => {
    setVerticalPosition(e.target.value);
  };
  const params = useParams();
  const eventId = params.eventId;

  console.log("params");
  console.log(params.eventId);
  const handleHorizontalChange = (e) => {
    setHorizontalPosition(e.target.value);
  };
  const handleScannerSizeChange = (e) => {
    setScannerSize(e.target.value);
  };

  const [Files, setFiles] = useState([]);
  //console.log("files", Files);
  const [backgroundImage, setBackgroundImage] = useState(null);
  // console.log("backgroundImage", backgroundImage);
  const [isUploading, setIsUploading] = useState(false);
  const eventData = useSelector((store) => store.eventSlice);
  // console.log("eventData", eventData);
  const [inputSubject, setInputSubject] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const uploadProps = {
    name: "file",
    multiple: false,
    beforeUpload: (file) => {
      setSelectedFile(file);
      return false; // Prevent automatic upload
    },
    onRemove: () => {
      setSelectedFile(null);
    },
  };

  useEffect(() => {
    console.log(Files);
    // Assuming 'Files' is an array of Blob URLs. If it's a single Blob URL, adjust accordingly.
    if (Files.length === 0) return; // Early return if Files is empty

    const blobUrlToFile = async (blobUrl) => {
      const response = await fetch(blobUrl);
      const blob = await response.blob();
      //console.log("blob", blob);
      return new File([blob], "filename.png", { type: "image/png" }); // Adjust filename and type as necessary
    };

    (async () => {
      // Assuming you're dealing with a single file for simplicity
      const firstFileBlobUrl = Files[0]; // Adjust if 'Files' is not an array
      const file = await blobUrlToFile(firstFileBlobUrl);
      // setSelectedFile(file);
      let a = JSON.stringify(file);
      console.log(">>>>>>>>>>>>", a);
    })();

    // This console.log will not show the updated selectedFile immediately
    // because setSelectedFile's state update will not have completed yet.
  }, [Files]);
  const handleImageUpload = () => {
    console.log("upload started", File);
    if (!File || File.length === 0) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please select an image file to upload",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });

      return;
    }

    setIsUploading(true);
    const fileRef = ref(storage, `images/${Date.now()}`);
    console.log("NNNNNN", selectedFile);
    const uploadTask = uploadBytesResumable(fileRef, selectedFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        if (snapshot.totalBytes > 0) {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(">>>>>", progress);
          console.log(`Upload is ${progress}% done`);
          setUploadProgress(progress);
        } else {
          // Handle the case where totalBytes is not initialized or 0
          console.log("Waiting for upload to start...");
          setUploadProgress(0); // Optionally set progress to 0 or a placeholder value
        }
      },
      (error) => {
        console.error("Error uploading image:", error);
        setIsUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setBackgroundImage(downloadURL);
          setIsUploading(false);
        });
      }
    );
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log(file);
      setSelectedFile(file);
    }
  };
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const extractCSSSettings = () => {
    return {
      tabletContainer: {
        width: "768px", // Increase the width for a larger preview
        height: "100%",
        position: "relative",
        background: "white",
        borderRadius: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
      },
      tabletBackground: {
        backgroundImage: `url(${backgroundImage})`,
        position: "absolute",
        top: "0",
        left: "0",
        height: "100%",
        width: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      },
      scanner: {
        width: "200px", // Adjust if necessary
        height: "300px",
        // width: `${scannerSize}%`, // You need to pass scannerSize value
        // height: `${1.5 * scannerSize}%`, // Same here for scannerSize
        position: "absolute",
        top: `${verticalPosition}%`,
        left: `${horizontalPosition}%`,
        border: "4px solid #ccc",
        borderRadius: "8px",
        overflow: "hidden",
      },
    };
  };
  const handleUploadScannerTemplate = async () => {
    try {
      const cssSettings = extractCSSSettings();
      // setIsLoading(true);
      console.log("CSS Settings:", cssSettings);

      const response = await axios.post(
        `/events/${eventId}/saveTemplate`,
        cssSettings
      );

      if (response.status === 200) {
        console.log("CSS settings saved successfully", response.data);
        alert("Template settings saved successfully");
      } else {
        console.error(
          "Failed to save CSS settings",
          response.status,
          response.data
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-center gap-8 p-8">
      <div className="flex flex-col items-center w-full max-w-md p-6 border rounded-lg space-y-4">
        <div className="flex-1  mt-6 lg:mt-0  lg:h-100vh  ">
          <h2 className="text-xl font-semibold mb-4 gap-2 ">Upload Image</h2>
          <Card className="border-2 border-dashed bg-muted hover:cursor-pointer hover:border-muted-foreground/50">
            <CardContent
              onClick={handleButtonClick}
              className="flex flex-col items-center justify-center space-y-2 px-2 py-4 text-xs"
            >
              <div className="flex  flex-col items-center justify-center text-muted-foreground">
                <Button
                  variant="ghost"
                  size="sm"
                  className="mx-auto flex h-8 space-x-2 px-0 pl-1 text-s"
                >
                  Choose an image file here to upload
                </Button>
                <Input
                  type="file"
                  className="w-full "
                  onClick={handleFileChange}
                  // className="hidden"
                  multiple={false}
                  onChange={handleFileChange}
                />
              </div>
            </CardContent>
          </Card>

          {/* <Dropzone onChange={setFiles} className="w-full" /> */}

          {/* <div className="border-dashed border-2 border-gray-300 p-6 text-center mb-3">
          <UploadIcon className=" w-12 h-12 mx-auto mb-3" />
          <p>Click or drag file to this area to upload</p>
        </div> */}
          {/* <div className="space-y-2 mb-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">login screen.png</p>
            <FileIcon className="text-gray-500 w-4 h-4" />
          </div>
        </div> */}

          <div className="mt-7">
            <Button
              className="w-full   mt-24 "
              onClick={handleImageUpload}
              disabled={isUploading}
              loading={isUploading}
            >
              {isUploading
                ? `Uploading...${uploadProgress}% done`
                : "Start Upload"}
            </Button>
          </div>
        </div>
        {/* <div className="w-full p-4 border-dashed border-2 border-gray-300 rounded-md text-center">
          <UploadIcon className="text-blue-500 w-12 h-12 mx-auto" />
          <p className="text-sm text-gray-500 mt-2">
            Click or drag image to this area to upload
          </p>
        </div> */}
        <div className="w-full">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="vertical-position"
          >
            Vertical Position
          </label>
          <input
            className="w-full"
            id="vertical-position"
            max="100"
            min="0"
            name="vertical-position"
            type="range"
            // min="0"
            // max="70"
            value={verticalPosition}
            onChange={handleVerticalChange}
          />
        </div>
        <div className="w-full">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="horizontal-position"
          >
            Horizontal Position
          </label>
          <input
            className="w-full"
            id="horizontal-position"
            max="80"
            min="0"
            name="horizontal-position"
            type="range"
            value={horizontalPosition}
            onChange={handleHorizontalChange}
          />
        </div>
      </div>
      <div className="flex flex-col items-center w-full max-w-xl p-6 border rounded-lg space-y-4">
        <div className="w-full">
          <h2 className="text-2xl font-bold text-gray-800">Tab Preview</h2>
          <div className="mt-4  border rounded-lg relative">
            {backgroundImage ? (
              <img
                alt="Preview"
                className="rounded-lg"
                height="300"
                src={backgroundImage}
                style={{
                  position: "relative",
                  aspectRatio: "500/300",
                  objectFit: "cover",
                }}
                width="500"
              />
            ) : (
              <img
                alt="Preview"
                className="rounded-lg"
                height="300"
                src="/assets/aZBF4vrb2Ds.jpg"
                style={{
                  position: "relative",
                  aspectRatio: "500/300",
                  objectFit: "cover",
                }}
                width="500"
              />
            )}
            <div
              className="scanner"
              style={{
                width: "120px", // Adjust if necessary
                height: "120px",
                position: "absolute",
                top: `${verticalPosition}%`,
                left: `${horizontalPosition}%`,
                border: "4px solid #ccc",
                background: "black",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            ></div>
          </div>
        </div>
        <Button onClick={handleUploadScannerTemplate} className="w-full">
          Submit Template
        </Button>
        {/* `{verticalPosition}` */}
      </div>
    </div>
  );
}

function UploadIcon(props) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}

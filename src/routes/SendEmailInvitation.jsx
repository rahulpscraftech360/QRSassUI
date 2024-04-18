/**
 * v0 by Vercel.
 * @see https://v0.dev/t/QBq0uE3vQ89
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dropzone } from "../components/Dropzone";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../utils/firebase";
import { useSelector } from "react-redux";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import HtmlTempate from "@/components/HtmlTempate";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
export default function SendEmailInvitation() {
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
  const [style, setStyle] = useState();
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
    setBackgroundImage(null);
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
        // const progress =
        //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log(">>>>>", progress);
        // console.log(`Upload is ${progress}% done`);
        // setUploadProgress(progress);
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

  return (
    <>
      <h1 className="text-4xl font-bold mb-3  p-6">Email Invitation</h1>
      <div className="flex flex-col lg:flex-row lg:space-x-6 max-w-6xl mx-auto p-6">
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

          <div className="flex flex-col space-y-1.5 mb-4">
            <label className="text-sm font-medium" htmlFor="subject">
              Write Subject
            </label>
            <Input id="subject" placeholder="Subject" />
          </div>
          <div className="flex flex-col space-y-1.5 mb-4">
            <label className="text-sm font-medium" htmlFor="subject">
              Write Message
            </label>
            <Textarea id="Message" placeholder="Message" />
          </div>
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
        {
          <div className="flex-1 mt-6 lg:mt-0">
            <h2 className="text-xl font-semibold mb-4">Preview</h2>

            {backgroundImage && (
              <HtmlTempate backgroundImage={backgroundImage} style={style} />
            )}

            {!backgroundImage && (
              <div className="w-full h-[300px] border-2 flex  justify-center items-center  rounded-sm border-dashed bg-muted hover:cursor-pointer hover:border-muted-foreground/50">
                <div className="">No Image Selected</div>
                <div></div>
              </div>
            )}
            {/* <div className="relative mb-4">
            <img
              alt="Background"
              className="w-full h-auto"
              height="300"
              src={
                "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-980x653.jpg"
              }
              style={{
                aspectRatio: "500/300",
                objectFit: "cover",
              }}
              width="500"
            />
            <div className="absolute inset-0 flex justify-center items-center">
              <QrCodeIcon className="text-black w-24 h-24" />
            </div>
          </div> */}
            {/* <div className="flex items-center space-x-3 mb-3">
            <label className="text-sm" htmlFor="horizontal-position">
              Horizontal Position:
            </label>
            <input
              className="w-full"
              id="horizontal-position"
              max="100"
              min="0"
              name="horizontal-position"
              type="range"
              value="50"
            />
            <span className="text-sm">50%</span>
          </div>
          <div className="flex items-center space-x-3 mb-6">
            <label className="text-sm" htmlFor="vertical-position">
              Vertical Position:
            </label>
            <input
              className="w-full"
              id="vertical-position"
              max="100"
              min="0"
              name="vertical-position"
              type="range"
              value="50"
            />
            <span className="text-sm">50%</span>
          </div>
          <Button className="w-full">Send Email</Button> */}
          </div>
        }
      </div>
    </>
  );
}

function FileIcon(props) {
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
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function QrCodeIcon(props) {
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
      <rect width="5" height="5" x="3" y="3" rx="1" />
      <rect width="5" height="5" x="16" y="3" rx="1" />
      <rect width="5" height="5" x="3" y="16" rx="1" />
      <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
      <path d="M21 21v.01" />
      <path d="M12 7v3a2 2 0 0 1-2 2H7" />
      <path d="M3 12h.01" />
      <path d="M12 3h.01" />
      <path d="M12 16v.01" />
      <path d="M16 12h1" />
      <path d="M21 12v.01" />
      <path d="M12 21v-1" />
    </svg>
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

import React, { useEffect, useState } from "react";
import defaultBackgroundImage from "/assets/defaultBackgroundImage.jpg";
import QrCodeImage from "/assets/QrCodeImage.jpg";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { Slider } from "./ui/slider";
const HtmlTempate = (props) => {
  const eventData = useSelector((store) => store.eventSlice);
  console.log("event Daa>>>>>>>>>>>>>>", eventData);
  const [backgroundImage, setBackGroundImage] = useState("");
  console.log("backgroundImageee", backgroundImage);
  const [horizontalPosition, setHorizontalPosition] = useState(50);
  const [verticalPosition, setVerticalPosition] = useState(50);
  const [horizontalNamePosition, setHorizontalNamePosition] = useState(10);
  const [verticalNamePosition, setVerticalNamePosition] = useState(10);
  const [nameSize, setNameSize] = useState(30);
  const [backgroundImageWidth, setBackgroundImageWidth] = useState(0);
  const [backgroundImageHeight, setBackgroundImageHeight] = useState(0);
  console.log("hereeeFFFFFFFFFFFFFFFFFFFe", backgroundImageHeight);
  const [subject, setSubject] = useState("");
  const handleHorizontalChange = (e) => {
    setHorizontalPosition(e.target.value);
  };
  const handleVerticalChange = (e) => {
    setVerticalPosition(e.target.value);
  };
  const navigate = useNavigate();
  useEffect(() => {
    // This block of code will execute when `backgroundImage` changes
    console.log("Background image has changed:", backgroundImage);
    setBackGroundImage(props);
    setSubject(props.subject);
  }, [props.backgroundImage, props.subject]);
  const participants = useSelector((store) => store.eventSlice.participants);
  console.log(participants, "participant");

  useEffect(() => {
    console.log("triggereeeeeeeeeeeeeeeeeeeeeeeeeedd");
    console.log("props", props.backgroundImage);
    setBackGroundImage(props.backgroundImage);
    setSubject(props.subject);
    console.log("here", backgroundImage);
  }, []);

  // useEffect(() => {
  //   console.log("trigggedeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
  //   setBackGroundImage(props.backgroundImage);
  //   const img = new Image();
  //   img.src = props.backgroundImage;
  //   console.log(
  //     ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC",
  //     img
  //   );
  //   img.onload = () => {
  //     setBackgroundImageWidth(img.width);
  //     setBackgroundImageHeight(img.height);
  //     console.log("vvvvvv", backgroundImageHeight);
  //   };
  // }, [props.backgroundImage]);

  useEffect(() => {
    console.log("trigggedeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
    setBackGroundImage(props.backgroundImage);

    const img = new Image();
    img.src = props.backgroundImage;
    console.log(
      ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC",
      img
    );

    img.onload = () => {
      setBackgroundImageWidth(img.width);
      setBackgroundImageHeight(img.height);
    };

    // Cleanup function
    return () => {
      console.log("vvvvvv", backgroundImageHeight);
    };
  }, [props.backgroundImage]);
  const [htmlTemplate, setHtmlTemplate] = useState();
  useEffect(() => {
    setHtmlTemplate(`
  
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Email Template</title>
        <style>
          body,
          html {
            margin: 0;
            padding: 0;
            height: auto;
            width: auto;
          }
    
          #htmltoimage {
            display: block;
            text-align: center;
            align-items: center;
            justify-content: center;
            
            background-color: rgba(255, 255, 255);
          
          }
    
          .backgroundImage {
            width: ${backgroundImageWidth}px;
              height: ${backgroundImageHeight}px;
            background-image: url("${backgroundImage}");
            background-repeat: no-repeat !important;
            background-size: contain; /* Add this line */
            background-position: center;
            position: relative;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
          }
    
          .overlayImage {
            width: 100px;
            position: absolute;
            top: ${verticalPosition}%;
            left: ${horizontalPosition}%;
            transform: translate(-50%, -50%);
            position: absolute;
          }
          .name {
            position: absolute;
          
            top: ${verticalNamePosition}%;
            left: ${horizontalNamePosition}%;
          
            font-size: ${nameSize}px; /* adjust the font size as needed */
            color: #000000; /* adjust the color as needed */
            font-weight:bolder;
          }
        </style>
      </head>
      <body>
        <div id="htmltoimage">
          <div class="backgroundImage">
           <div class="name">RAHUL P S</div>
          <img class="overlayImage" src="${`/assets/qr-code.jpeg`}" alt="overlay image" /></div>
        </div>
      </body>
    </html>
   
  `);
  }, [
    horizontalPosition,
    verticalPosition,
    backgroundImage,
    props.backgroundImage,
    backgroundImageHeight,
    verticalNamePosition,
    horizontalNamePosition,
    nameSize,
  ]);

  const saveTemplate = async () => {
    try {
      const response = await fetch(
        "http://165.22.208.201:5000/v1/template/templates/",

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ htmlContent: htmlTemplate }),
        }
      );

      if (response.ok) {
        // Handle success (template saved successfully)
        console.log("Template saved successfully!");
      } else {
        // Handle failure
        console.error("Failed to save template.");
      }
    } catch (error) {
      console.error("Error saving template:", error);
    }
  };

  const [htmlContent, setHtmlContent] = useState(
    ` <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Email Template</title>
        <style>
          body,
          html {
            margin: 0;
            padding: 0;
            height: auto;
            width: auto;
          }
    
          #htmltoimage {
            display: flex;
            text-align: center;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 100%;
            background-color: blue;
          
          }
    
          .backgroundImage {
            width: ${backgroundImageWidth}px;
              height: ${backgroundImageHeight}px;
            background-image: url("${backgroundImage}");
            background-repeat: no-repeat !important;
            background-size: cover; /* Add this line */
            background-position: center;
            position: relative;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
          }
    
          .overlayImage {
            width: 100px;
            position: absolute;
            top: ${verticalPosition}%;
            left: ${horizontalPosition}%;
            transform: translate(-50%, -50%);
            position: absolute;
          }
          .name {
            position: absolute;
          
            top: ${verticalNamePosition}%;
            left: ${horizontalNamePosition}%;
            
            font-size: ${nameSize}px; /* adjust the font size as needed */
            color: #000000; /* adjust the color as needed */
            font-weight:bold;
          }
        </style>
      </head>
      <body>
        <div id="htmltoimage">
          <div class="backgroundImage">
          <div class="name">RAHUL P S</div>
          <img class="overlayImage" src="${`/assets/qr-code.jpeg`}" alt="overlay image" /></div>
        </div>
      </body>
    </html>

    `
  ); // HTML content state

  const handleHtmlChange = (event) => {
    setHtmlContent(event.target.value); // Update HTML content in state
  };

  const sendHtmlToBackend = async () => {
    console.log(htmlTemplate);
    try {
      const response = await axios.post("http://localhost:5000/v1/email/send", {
        position: { verticalPosition, horizontalPosition },
        namePosition: {
          verticalNamePosition,
          horizontalNamePosition,
          nameSize,
        },
        participants,
        subject,
        eventData,
        backgroundImage,
      });

      // Log the response
      console.log("Response from the server:", response);
      if (response.status === 200) {
        const updatedHtml = response.data;
        // Handle the updated HTML received from the backend
        console.log("Updated HTML:", updatedHtml);
        toast({
          // variant: "destructive",
          title: "Success! Email Invitation task added.",
          // description: "An error occurred while creating the event",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "An error occurred while creating the event",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        // console.error("Failed to update HTML on the backend.");
      }
    } catch (error) {
      console.error("Error updating HTML:", error);
    }
  };

  const SendEmail = () => {
    console.log("template", htmlTemplate);
    // if (htmlTemplate) {
    //   const element = document.createElement("a");
    //   const file = new Blob([htmlTemplate], { type: "text/html" });
    //   element.href = URL.createObjectURL(file);
    //   console.log("JJJJJJJJJJJJJJJJJJ", element);
    //   element.download = "template.html";
    //   document.body.appendChild(element);
    //   element.click();
    //   document.body.removeChild(element);
    // }

    sendHtmlToBackend();
    // navigate("/tasks");
  };
  const handleVerticalSliderChange = (value) => {
    console.log("second", value);
    setVerticalNamePosition(value);
  };
  const handleHorizontalSliderChange = (value) => {
    console.log("first", value);
    setHorizontalNamePosition(value);
  };
  const handleNameSizeChange = (value) => {
    console.log("first", value);
    setNameSize(value);
  };
  return (
    <div className=" ">
      <div
        dangerouslySetInnerHTML={{ __html: htmlTemplate }}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      {/* <button onClick={saveTemplate}>Save Template</button> */}

      <div className="  ">
        <div className="flex items-center space-x-3 mb-3">
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
            // value="50"
            value={horizontalPosition}
            onChange={handleHorizontalChange}
          />
          <span className="text-sm">{horizontalPosition}%</span>
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
            value={verticalPosition}
            onChange={handleVerticalChange}
          />
          <span className="text-sm">{verticalPosition}%</span>
        </div>
      </div>
      <div className="my-3  ">
        <h2 className="text-2xl pb-3 font-bold mb-4">Name Position</h2>
        <h4> horizontal</h4>
        <div className="relative py-2">
          {" "}
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-gray-500 dark:text-gray-400 text-sm">0</span>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              100
            </span>
          </div>
          <Slider
            className="h-6  bg-gray-200 dark:bg-gray-700 rounded-full"
            defaultValue={[horizontalNamePosition]}
            onValueChange={handleHorizontalSliderChange}
            max={100}
            min={0}
            step={1}
            thumbClassName="h-6 w-6 bg-gray-900 dark:bg-gray-50 rounded-full shadow-md transform transition-transform duration-150 ease-in-out cursor-grab active:cursor-grabbing"
          >
            <div className="h-6 w-6 bg-gray-900 dark:bg-gray-50 rounded-full shadow-md transform transition-transform duration-150 ease-in-out cursor-grab active:cursor-grabbing">
              <div className="text-sm font-medium text-gray-900 dark:text-gray-50">
                50
              </div>
            </div>
          </Slider>
        </div>

        <h4> Vertical</h4>
        <div className="relative py-2">
          {" "}
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-gray-500 dark:text-gray-400 text-sm">0</span>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              100
            </span>
          </div>
          <Slider
            className="h-6  bg-gray-200 dark:bg-gray-700 rounded-full"
            defaultValue={[verticalNamePosition]}
            onValueChange={handleVerticalSliderChange}
            max={100}
            min={0}
            step={1}
            thumbClassName="h-6 w-6 bg-gray-900 dark:bg-gray-50 rounded-full shadow-md transform transition-transform duration-150 ease-in-out cursor-grab active:cursor-grabbing"
          >
            <div className="h-6 w-6 bg-gray-900 dark:bg-gray-50 rounded-full shadow-md transform transition-transform duration-150 ease-in-out cursor-grab active:cursor-grabbing">
              <div className="text-sm font-medium text-gray-900 dark:text-gray-50">
                50
              </div>
            </div>
          </Slider>
        </div>
        <h4> Name Size</h4>
        <div className="relative py-2">
          {" "}
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-gray-500 dark:text-gray-400 text-sm">0</span>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              200
            </span>
          </div>
          <Slider
            className="h-6  bg-gray-200 dark:bg-gray-700 rounded-full"
            defaultValue={[nameSize]}
            onValueChange={handleNameSizeChange}
            max={80}
            min={0}
            step={1}
            thumbClassName="h-6 w-6 bg-gray-900 dark:bg-gray-50 rounded-full shadow-md transform transition-transform duration-150 ease-in-out cursor-grab active:cursor-grabbing"
          >
            <div className="h-6 w-6 bg-gray-900 dark:bg-gray-50 rounded-full shadow-md transform transition-transform duration-150 ease-in-out cursor-grab active:cursor-grabbing">
              <div className="text-sm font-medium text-gray-900 dark:text-gray-50">
                50
              </div>
            </div>
          </Slider>
        </div>
      </div>

      <div className="flex  justify-center">
        <Button className="w-full" onClick={SendEmail}>
          Send Email
        </Button>
      </div>
    </div>
  );
};

export default HtmlTempate;

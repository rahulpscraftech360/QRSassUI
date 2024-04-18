import React, { useEffect, useState } from "react";
import defaultBackgroundImage from "../../src/assets/defaultBackgroundImage.jpg";
import QrCodeImage from "/src/assets/QrCodeImage.jpg";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
const HtmlTempate = (props) => {
  const eventData = useSelector((store) => store.eventSlice);
  console.log("event Daa>>>>>>>>>>>>>>", eventData);
  const [backgroundImage, setBackGroundImage] = useState("");
  console.log("backgroundImageee", backgroundImage);
  const [horizontalPosition, setHorizontalPosition] = useState(50);
  const [verticalPosition, setVerticalPosition] = useState(50);
  const [subject, setSubject] = useState("");
  const handleHorizontalChange = (e) => {
    setHorizontalPosition(e.target.value);
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
  const handleVerticalChange = (e) => {
    setVerticalPosition(e.target.value);
  };
  useEffect(() => {
    console.log("props", props.backgroundImage);
    setBackGroundImage(props.backgroundImage);
    setSubject(props.subject);
    console.log("here", backgroundImage);
  }, []);

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
      
      }
      #htmltoimage {
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        height: 844px;
        width: auto;
        position: relative; /* Added position relative to the parent container */
      }
      .backgroundImage {
        background-image: url("${backgroundImage}");
        background-color: blue;
        background-repeat: no-repeat !important;
        background-size: cover;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
      .overlayImage {
        width: 150px;
      
        position: absolute;
        top: ${verticalPosition}%;
         left: ${horizontalPosition}%;
        transform: translate(-50%, -50%);
      }
    </style>
  </head>
  <body>
    <div id="htmltoimage">
      <div class="backgroundImage"></div>
      <img
        class="overlayImage"
        src="${`/src/assets/qr-code.png`}"
       
        alt="overlay image"
      />
    </div>
  </body>
</html>
   
  `);
  }, [
    horizontalPosition,
    verticalPosition,
    backgroundImage,
    props.backgroundImage,
  ]);

  const saveTemplate = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/v1/template/templates/",
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
    `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Template</title>
        <style>
        body,
        html {
          margin: 0;
          padding: 0;
        }
  
        #htmltoimage {
          text-align: center;
          width: 1200px; /* Adjust the width as needed */
          height: 628px; /* Adjust the height as needed */
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
  
        .backgroundImage {
          width: 1200px; /* Match the container width */
          height: 628px; /* Match the container height */
          background-size: cover; /* Ensures the background image covers the entire container */
          background-repeat: no-repeat;
        }
  
        .overlayImage {
          max-width:150px; /* Adjust the size as needed */
          max-height: 150px; /* Adjust the size as needed */
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        </style>
    </head>
    <body>
      
      
      <div id="htmltoimage">
              <img class="backgroundImage" src="${backgroundImage}" alt="background image">
              <img class="overlayImage" src="{{image}}"
                   style="top: ${verticalPosition}%; left: ${horizontalPosition}%; transform: translate(-50%, -50%);">
          </div>
  </body>
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
        htmlTemplate,
        participants,
        subject,
        eventData,
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
    //navigate("/tasks");
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

        {/* <label htmlFor="horizontal" className=" text-lg pt-1">
          Horizontal Position: {horizontalPosition}%
        </label>
        <input
          className=" ml-2"
          type="range"
          id="horizontal"
          min="0"
          max="100"
          value={horizontalPosition}
          onChange={handleHorizontalChange}
        />
      </div>
      <div>
        <label htmlFor="vertical" className=" text-lg pt-1">
          Vertical Position: {verticalPosition}%
        </label>
        <input
          className=" ml-2"
          type="range"
          id="vertical"
          min="0"
          max="100"
          value={verticalPosition}
          onChange={handleVerticalChange}
        /> */}
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

// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <style>
//     body {
//       margin: 0;
//       padding: 0;
//       height: 80%;
//     }
//     #htmltoimage {
//       position: relative;
//       text-align: center;
//       height: 100%;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//     }
//     .backgroundImage {
//       max-width: 100%;
//       max-height: 100%;
//       object-fit: contain;
//     }
//     .overlayImage {
//       position: absolute;
//       top: ${verticalPosition}%;
//       left: ${horizontalPosition}%;
//       transform: translate(-50%, -50%);
//       max-width:35%;
//     max-height: 35%;
//       position: absolute;
//     }
//   </style>
//   <title>emailimage</title>
// </head>
// <body>
//   <div id="htmltoimage">
//     <img class="backgroundImage" src="${props.backgroundImage}" alt="background image">
//     <img class="overlayImage" src="${QrCodeImage}" alt="overlay image">
//   </div>
// </body>
// </html>

// <html lang="en">
//     <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <style>
//         body {
//           margin: 0;
//           padding: 0;
//           height: auto;
//         }
//         #htmltoimage {
//           position: relative;
//           text-align: center;
//           height: 100%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
//         .background-image {
//           max-width: 100%;
//           max-height: 100%;
//           object-fit: contain;
//         }
//         .overlay-image {
//           position: absolute;
//           top: ${verticalPosition}%;
//           left: ${horizontalPosition}%;
//           transform: translate(-50%, -50%);
//           max-width:35%;
//           max-height: 35%;
//           position: "absolute",

//         }
//       </style>
//       <title>emailimage</title>
//     </head>
//     <body>
//       <div id="htmltoimage">
//         <img class="background-image" src="${defaultBackgroundImage}" alt="background image">
//         <img class="overlay-image" src="https://cdn.britannica.com/17/155017-050-9AC96FC8/Example-QR-code.jpg" alt="overlay image">
//       </div>
//     </body>
//     </html>

// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Email Template</title>
//     <style>
//         body, html {
//             margin: 0;
//             padding: 0;
//             height: 100%;
//         }
//         #htmltoimage {
//             text-align: center;
//             height: 100%;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             position: relative;
//         }
//         .backgroundImage {
//             width: 100%;
//             height: auto;
//         }
//         .overlayImage {
//             max-width: 25%;
//             height: auto;
//             position: absolute;
//         }
//     </style>
// </head>
// <body>
//     <div id="htmltoimage">
//         <img class="backgroundImage" src="${backgroundImage}" alt="background image">
//         <img class="overlayImage" src="${QrCodeImage}"
//              style="top: ${verticalPosition}%; left: ${horizontalPosition}%; transform: translate(-50%, -50%);">
//     </div>
// </body>
// </html>

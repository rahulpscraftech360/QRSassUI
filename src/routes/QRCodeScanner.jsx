import React, { useEffect, useState } from "react";

import { QrScanner } from "react-qrcode-scanner";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "../utils/axiosConfig";
import { addEventData } from "../utils/eventDataSlice";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
function QRCodeScanner() {
  const [result, setResult] = useState();
  const [message, setMessage] = useState();
  const [resultMessage, setResultMessage] = useState(
    "Please scan the QR code to check in"
  );
  const [eventData, setEventData] = useState(null);
  const [cssSettings, setCssSettings] = useState(null);
  // console.log("css", cssSettings.tabletBackground.backgroundImage.url);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const backgroundImages =
    "https://firebasestorage.googleapis.com/v0/b/qr-code-7944d.appspot.com/o/images%2F1713790623412?alt=media&token=21816e4f-9d51-4047-808e-0c3157ef11f3";

  const [scannerState, setScannerState] = useState();
  console.log("scannerState", scannerState);
  console.log("bg", cssSettings);
  console.log("backgroundImage", backgroundImage);
  const params = useParams();
  const dispatch = useDispatch();
  const eventId = params.id;
  const [errorMessage, setErrorMessage] = useState(
    "Please scan the QR code to check in"
  );

  const organizationId = useSelector(
    (store) => store.organizationSlice?.organizationData?.id
  );

  // console.log("evemtId", params.id);
  const handleScan = (value) => {
    console.log("sannnggg.....................................");
    console.log("value", value);
    const stringWithoutQuotes = value.replace(/^"(.*)"$/, "$1");
    setResult(stringWithoutQuotes);
  };
  console.log("result,", result);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(`/events/${eventId}`);
        setEventData(response.data);
        dispatch(addEventData(response.data));
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEventData();
  }, [eventId, result]);

  useEffect(() => {
    if (eventData && eventData.cssSettings) {
      setCssSettings(eventData.cssSettings);
      const backgroundImageURL =
        eventData.cssSettings.tabletBackground.backgroundImage
          .slice(4, -1)
          .replace(/"/g, "");
      setBackgroundImage(backgroundImageURL);
      console.log(backgroundImageURL);
      setScannerState(eventData.cssSettings.scanner);
    }
  }, [eventData]);

  useEffect(() => {
    const performAsyncOperations = async () => {
      console.log("Result Type:", typeof result, result);
      console.log(
        "Participants Type:",
        typeof eventData?.participants,
        eventData?.participants
      );
      console.log("Present Type:", typeof eventData?.present);

      console.log("Result Type>>>:", typeof result, result);
      if (result && eventData && eventData?.participants) {
        setMessage({
          title: ` The QR code was successfully scanned,`,
          description: "Validating....",
        });
        console.log("eventData0", eventData);
        const isParticipant = eventData.tickets.includes(result);
        console.log("isParticipant", isParticipant);

        const participantIndex = eventData.tickets.indexOf(result);

        if (participantIndex !== -1) {
          console.log(`Participant found at index ${participantIndex}`);
          if (isParticipant !== undefined) {
            console.log("founf in tickets");
            //setMessage("User Found");

            const isAttended = eventData.present.includes(result);

            if (!isAttended) {
              //

              console.log("not attended");
              // setMessage("User Added");

              // Perform actions to update the database - add user ID as presented
              const newPresentList = [...eventData.present, result];
              console.log("Updated present list", newPresentList);
              // Update the state or database with newPresentList
              console.log("<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>");
              const ticketId = result;

              console.log("sending Id");
              const response = await axios.post(
                `/events/${eventId}/${organizationId}/attendEvent`,
                {
                  ticketId,
                }
              );
              let newEventData = null;
              console.log("response", response.data.data);
              newEventData = await response.data.data;
              console.log(">>>>>", response.data.data);
              dispatch(addEventData(newEventData));
              setEventData(newEventData);
              //setResultMessage(response.data.message);
              // alert(response.data.message);
              console.log(response.data.message);
              setMessage({
                title: `Dear ${response.data.user.name}`,
                description: response.data.message,
              });

              //toast(response.data.message);
            } else {
              setMessage(null);
              // setResultMessage("Sorry You Have Already Attended This Event");
              setErrorMessage(
                "Sorry, This ticket has already been used and cannot be used again"
              );
              setShowScanner(false);
            }
            setShowScanner(false);
          } else {
            setMessage(null);
            setShowScanner(false);
            setErrorMessage("Sorry Invalid QR Code");
            // Perform actions when the participant is not found
          }
        } else {
          console.log("Participant not found.");
          setErrorMessage("Sorry Invalid QR Code");
          // setResultMessage("Invalid QR Code");
        }
      }
    };
    performAsyncOperations();
  }, [result]);

  const handleError = (error) => {
    setErrorMessage("Invalid Ticket");
    message.error(`Error: ${error}`);
  };
  const [showScanner, setShowScanner] = useState(false);
  const handleScanButtonClick = () => {
    setResult(null);
    // setMessage({ title: "Scanning......" });
    setShowScanner(true); // Show the scanner when the button is clicked
  };
  const handleCloseButtonClick = () => {
    setMessage(null);
    setShowScanner(false);
  };

  //cleaning error and success messages in 5 sec

  useEffect(() => {
    setTimeout(() => {
      setMessage(null);
      setErrorMessage(null);
    }, 5000);
  }, [message, errorMessage]);

  const clearMessage = () => {
    setMessage(null);
    setErrorMessage(null);
  };

  return (
    <>
      {eventData ? (
        <div
          className=" flex  h-screen w-full flex-col items-center justify-center"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="  w-full flex flex-col justify-start items-end  pr-5">
            <ModeToggle />
          </div>
          <div className=" text-2xl  font-semibold pb-5  text-white">
            {eventData.title}
          </div>

          {!message && !errorMessage && (
            <div className="flex flex-col items-center justify-center gap-8 rounded-lg bg-white p-4 md:p-8 border-2 border-gray-100 dark:border-gray-600 shadow-lg dark:bg-gray-950 ">
              <div className="flex h-[300px] w-[300px] items-center justify-center rounded-lg border-2 border-gray-400 dark:border-gray-600">
                {!showScanner && (
                  <QrCodeIcon className="h-20 w-20 text-gray-500 dark:text-gray-400" />
                )}

                {showScanner && ( // Show the scanner when 'showScanner' state is true
                  <div className="w-full p-1 rounded-lg ">
                    <div className="shadow-lg">
                      <QrScanner onScan={handleScan} onError={handleError} />
                    </div>
                  </div>
                )}
              </div>
              {!showScanner && (
                <Button onClick={handleScanButtonClick} size="lg">
                  Scan QR Code
                </Button>
              )}
              {showScanner && (
                <Button onClick={handleCloseButtonClick} size="lg">
                  Close
                </Button>
              )}
              {/* {resultMessage && (
              <div
                className="flex w-full justify-center item-center text-center mt-5  "
                style={{
                  position: "absolute",
                }}
              >
                <div className=" flex  justify-center items-center bg-gray-700 text-white p-5 rounded-xl">
                  {resultMessage}
                </div>
              </div>
            )} */}
            </div>
          )}
          <div className="w-full justify-center items-center">
            <div className="w-full  flex justify-center items-center">
              {message && (
                <div className="grid  w-full max-w-md items-center m-5 mx-10 justify-between gap-2 rounded-md  px-8 py-4 shadow-lg dark:bg-gray-950 bg-white">
                  <div className="flex items-center gap-4">
                    <CircleCheckIcon
                      onClick={clearMessage}
                      className="h-12 w-12 text-green-500"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="text-xl font-medium ">
                        {message.title}{" "}
                      </div>
                      <div className="text-lg font-medium text-gray-500 dark:text-gray-200">
                        {message.description}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {errorMessage && (
                <div className="grid w-full max-w-md items-center  m-5 mx-10 justify-between gap-2 rounded-md bg-white  px-8 py-4  shadow-lg dark:bg-gray-950">
                  <div className="flex items-center gap-4">
                    <CircleXIcon
                      onClick={clearMessage}
                      className="h-12 w-12 text-red-500"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="text-xl font-medium">
                        QR Code Scan Failed
                      </div>
                      <div className="text-lg font-medium text-gray-500 dark:text-gray-400">
                        {errorMessage}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-screen justify-center items-center w-full">
          <div>Add template for Qr code scanner</div>
        </div>
      )}
    </>
  );
}

export default QRCodeScanner;

function CircleCheckIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function CircleXIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
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
//   return (
//     <div>
//       <div className="w-full md:w-1/2">
//         <QrScanner onScan={handleScan} onError={handleError} />
//       </div>

//       <p>{message}</p>
//     </div>
//   );
// }

// export default QRCodeScanner;

// {showScanner && ( // Show the scanner when 'showScanner' state is true
// <div className="w-full md:w-1/2 p-4">
//   <div className="bg-white rounded-lg shadow-lg p-4">
//     <QrScanner onScan={handleScan} onError={handleError} />
//   </div>
// </div>
// )}
// {/* <p className="mt-4 text-center">{message}</p> */}
// {showScanner ? (
// <span className="animate-pulse">Scanning....</span>
// ) : (
// <></>
// )}
// {result && (
// <p className="mt-4 text-center">
//   Scanned Data:{" "}
//   {
//     result // Show the result after a successful scan
//   }
// </p>
// )}
// {/* {message ? <></> : <span className="animate-pulse">Scanning....</span>} */}
// <p className="mt-4 text-center">{}</p>
// {showScanner && (
// <button
//   className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//   onClick={handleCloseButtonClick}
// >
//   Close
// </button>
// )}

// {result && (
//   <p className="mt-4 text-center">
//     Scanned Data:{" "}
//     {
//       result // Show the result after a successful scan
//     }
//   </p>
// )}
// {/* {message ? <></> : <span className="animate-pulse">Scanning....</span>} */}
// <p className="mt-4 text-center">{}</p>
// {showScanner && (
//   <button
//     className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//     onClick={handleCloseButtonClick}
//   >
//     Close
//   </button>
// )}

//First Code

// <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//   <div className="rounded-lg shadow-lg overflow-hidden w-11/12 md:w-1/2 lg:w-1/3"></div>{" "}
//   {!showScanner && ( // Show the scan button when the scanner is not visible
//     <>
//       {" "}
//       <h1 className="text-2xl"> Open Scanner</h1>
//       <button
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         onClick={handleScanButtonClick}
//       >
//         Scan
//       </button>
//     </>
//   )}
//   {showScanner && ( // Show the scanner when 'showScanner' state is true
//     <div className="w-full md:w-1/2 p-4">
//       <div className="bg-white rounded-lg shadow-lg p-4">
//         <QrScanner onScan={handleScan} onError={handleError} />
//       </div>
//     </div>
//   )}
//   {/* <p className="mt-4 text-center">{message}</p> */}
//   {showScanner ? (
//     <span className="animate-pulse">Scanning....</span>
//   ) : (
//     <></>
//   )}
//   {result && (
//     <p className="mt-4 text-center">
//       Scanned Data:{" "}
//       {
//         result // Show the result after a successful scan
//       }
//     </p>
//   )}
//   {/* {message ? <></> : <span className="animate-pulse">Scanning....</span>} */}
//   <p className="mt-4 text-center">{}</p>
//   {showScanner && (
//     <button
//       className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//       onClick={handleCloseButtonClick}
//     >
//       Close
//     </button>
//   )}
// </div>

// <>
// <div className="flex flex-col">
//   <div
//     className="flex justify-center items-center w-full"
//     // style={{ height: "80vh" }}
//   >
//     <div
//       className="tablet-container"
//       style={{
//         width: "80%", // Increase the width for a larger preview
//         paddingTop: "60%", // Adjust padding-top to maintain the 4:3 aspect ratio (37.5% of 50%)
//         position: "relative", // for absolute positioning inside
//         background: "white",
//         borderRadius: "20px",
//         boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//         overflow: "hidden",
//         borderWidth: ".9rem",
//       }}
//     >
//       <div
//         className="tablet-background"
//         style={{
//           position: "absolute",

//           backgroundImage: `url(${backgroundImage})`,

//           top: "0",
//           left: "0",
//           height: "100%",
//           width: "100%",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//         }}
//       ></div>
//       {!showScanner && (
//         <div style={scannerState}>
//           {/* <div className="flex w-full h-full  justify-center items-center m-1/2 ">
//             <button
//               className="bg-emerald-500 w-2/3  hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded"
//               onClick={handleScanButtonClick}
//             >
//               Scan
//             </button>
//           </div> */}
//         </div>
//       )}
//       {showScanner && (
//         <div style={scannerState}>
//           {showScanner && (
//             <div className="w-full  p-4">
//               <div className=" bg-white rounded-lg shadow-lg p-1 justify-center item-center">
//                 <QrScanner
//                   className="pr-1"
//                   onScan={handleScan}
//                   onError={handleError}
//                 />
//               </div>
//             </div>
//           )}
//           <div className="flex flex-col w-full h-full   p-4">
//             {showScanner ? (
//               <>
//                 <span className="animate-pulse text-white text-center text-xl p-3">
//                   Scanning....
//                 </span>
//                 <div className="flex w-full  justify-center item-center">
//                   <button
//                     className="bg-red-500 hover:bg-red-700 w-full mx-4 text-white font-bold py-2 px-4 rounded"
//                     onClick={handleCloseButtonClick}
//                   >
//                     Close
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <></>
//             )}
//           </div>
//         </div>
//       )}{" "}
//     </div>
//   </div>
// </div>
// <div className=" flex item-center justify-center"></div>
// {/* </div> */}
// </>

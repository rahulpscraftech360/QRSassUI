// import React from "react";

// const EventStatus = ({ targetDate }) => {
//   // Parse the target date
//   const target = new Date(targetDate);
//   console.log("target", targetDate);
//   // Get today's date
//   const today = new Date();

//   // Log the dates for debugging
//   console.log("Local today", today);
//   console.log("Target date as received", targetDate);

//   // Convert both dates to UTC, setting time to 00:00:00 for a fair comparison
//   const targetUTC = Date.UTC(
//     target.getFullYear(),
//     target.getMonth(),
//     target.getDate()
//   );
//   const todayUTC = Date.UTC(
//     today.getFullYear(),
//     today.getMonth(),
//     today.getDate()
//   );

//   // Log the UTC dates for debugging
//   console.log("UTC today", new Date(todayUTC));
//   console.log("UTC target", new Date(targetUTC));

//   let statusText = "Upcoming";

//   if (targetUTC < todayUTC) {
//     statusText = "Completed";
//   } else if (targetUTC === todayUTC) {
//     statusText = "Today";
//   }

//   return <p className="text-xl font-medium">Status: {statusText}</p>;
// };

// export default EventStatus;

import React from "react";

const EventStatus = ({ setStatus, targetDate, endingDate }) => {
  // Create a Date object for the target date
  const target = new Date(targetDate);
  const endDate = new Date(endingDate);
  // Create a Date object for the current date
  const today = new Date();

  // Convert 'today' and 'target' to UTC dates by extracting the year, month, and day in UTC
  // and then creating a new Date object in UTC for comparison
  const targetUTC = new Date(
    Date.UTC(target.getUTCFullYear(), target.getUTCMonth(), target.getUTCDate())
  );
  const todayUTC = new Date(
    Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
  );
  const endUTC = new Date(
    Date.UTC(
      endDate.getUTCFullYear(),
      endDate.getUTCMonth(),
      endDate.getUTCDate()
    )
  );
  let statusText = "Upcoming"; // Default status
  let textColorClass = "text-blue-500"; // Default color for "Upcoming"

  // Compare the dates to determine the status and corresponding color class
  if (endUTC < todayUTC) {
    statusText = "Completed";
    textColorClass = "text-red-500"; // Tailwind class for red color
  } else if (targetUTC < todayUTC && todayUTC < endUTC) {
    statusText = "Today";
    textColorClass = "text-green-500"; // Tailwind class for green color
  } else {
    statusText = "Upcoming";
    textColorClass = "text-blue-500";
  }
  setStatus(statusText);

  // Render the status
  return (
    <p className={`text-xl font-medium ${textColorClass}`}>
      Status: {statusText}
    </p>
  );
};

export default EventStatus;

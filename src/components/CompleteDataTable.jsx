import React, { useState } from "react";
import EditModal from "./EditModal";
import { useDispatch, useSelector } from "react-redux";
import { addEventData } from "../utils/eventDataSlice";
import axios from "../utils/axiosConfig";

import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  TableFooter,
  Table,
} from "@/components/ui/table";
import {
  PaginationPrevious,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationContent,
  Pagination,
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
import { useNavigate, useParams } from "react-router-dom";

const CompleteDataTable = ({ data, onUpdate, onDelete, handleClear }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleEdit = (row) => {
    setSelectedRow(row);
    setShowModal(true);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastRow = currentPage * pageSize;
  const indexOfFirstRow = indexOfLastRow - pageSize;
  const currentRows = data?.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(data.length / pageSize);

  const isAllRowsFilled = data?.every(
    (row) => row.name && row.email && row.phoneNumber
  );
  const params = useParams();
  const eventId = params.eventId;
  console.log("paramssss", eventId);
  const eventData = useSelector((store) => store.eventSlice);
  // const eventId = eventData.id;
  const organizationId = useSelector(
    (store) => store.organizationSlice?.organizationData?.id
  );

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `/events/${eventId}/${organizationId}/participants`,
        data
      );
      handleClear();
      dispatch(addEventData(response.data));
      toast({
        title: "Added",
        description: "Participants added successfully to the event",
        // action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      navigate(`/events/${eventId}/addTicket`);

      //navigate(`/events/share/${eventId}`);
    } catch (error) {
      console.log("Error:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "An error occurred while creating the event",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  return (
    <div className="table-container">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentRows.map((row) => (
            <TableRow key={row?.id}>
              <TableCell>{row?.name}</TableCell>
              <TableCell> {row?.email}</TableCell>
              <TableCell> {row?.phoneNumber}</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleEdit(row)}
                  className="mr-2"
                  variant="outline"
                >
                  <Popover className=" w-[250px]">
                    <PopoverTrigger>Edit</PopoverTrigger>
                    <PopoverContent className="w-full ">
                      <div>
                        <EditModal
                          rowData={selectedRow}
                          onUpdate={(updatedData) => {
                            onUpdate(updatedData);
                            setShowModal(false);
                          }}
                          showModal={showModal}
                          setShowModal={setShowModal}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                </Button>
                <AlertDialog>
                  <Button variant="destructive">
                    <AlertDialogTrigger>Delete</AlertDialogTrigger>
                  </Button>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => onDelete(row.id)}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                {currentPage > 1 && (
                  <PaginationPrevious
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  />
                )}
              </PaginationItem>
              {Array.from(
                { length: Math.ceil(data.length / pageSize) },
                (_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      onClick={() => handlePageChange(i + 1)}
                      isActive={currentPage === i + 1}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              {totalPages && currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === Math.ceil(data.length / pageSize)}
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </TableFooter>
      </Table>

      <div className="w-full flex justify-center">
        <AlertDialog>
          {data.length > 0 && (
            <Button variant="">
              <AlertDialogTrigger>Submit</AlertDialogTrigger>
            </Button>
          )}
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleSubmit}
                className={`submit-btn ${isAllRowsFilled ? "" : "disabled"}`}
                disabled={!isAllRowsFilled}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default CompleteDataTable;

// import React, { useState } from "react";
// import EditModal from "./EditModal";
// import { useDispatch, useSelector } from "react-redux";
// import { addEventData } from "../utils/eventDataSlice";
// import axios from "../utils/axiosConfig";

// import {
//   TableHead,
//   TableRow,
//   TableHeader,
//   TableCell,
//   TableBody,
//   TableFooter,
//   Table,
// } from "@/components/ui/table";
// import {
//   PaginationPrevious,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationContent,
//   Pagination,
// } from "@/components/ui/pagination";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";

// import { Button } from "./ui/button";
// import { toast } from "./ui/use-toast";
// import { ToastAction } from "./ui/toast";
// const CompleteDataTable = ({ data, onUpdate, onDelete, handleClear }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [selectedRow, setSelectedRow] = useState(null);
//   const pageSize = 5;
//   const [currentPage, setCurrentPage] = useState(1);
//   const dispatch = useDispatch();
//   const handleEdit = (row) => {
//     setSelectedRow(row);
//     setShowModal(true);
//   };

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const indexOfLastRow = currentPage * pageSize;
//   const indexOfFirstRow = indexOfLastRow - pageSize;
//   const currentRows = data?.slice(indexOfFirstRow, indexOfLastRow);
//   const isAllRowsFilled = data?.every(
//     (row) => row.name && row.email && row.phoneNumber
//   );
//   const eventData = useSelector((store) => store.eventSlice);
//   console.log("event Data>>>", eventData.id);
//   const eventId = eventData.id;
//   const organizationId = useSelector(
//     (store) => store.organizationSlice?.organizationData?.id
//   );
//   console.log("organizationId", organizationId);
//   const handleSubmit = async () => {
//     try {
//       // Your data object to be sent to the backend

//       //  Send a POST request to the backend with your data
//       const response = await axios.post(
//         `/events/${eventId}/${organizationId}/participants`,
//         data
//       );
//       handleClear();

//       //Handle the response from the backend if needed
//       console.log("Response from backend:", response.data);
//       dispatch(addEventData(response.data));
//       alert("suceess");
//     } catch (error) {
//       console.log("Error:", error);
//       toast({
//         variant: "destructive",
//         title: "Uh oh! Something went wrong.",
//         description: "An error occurred while creating the event",
//         action: <ToastAction altText="Try again">Try again</ToastAction>,
//       });
//       // Handle errors if the request fails
//       //console.error("Error submitting data:", error);
//     }
//   };

//   return (
//     <div className="table-container">
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Name</TableHead>
//             <TableHead>Email</TableHead>
//             <TableHead>Phone Number</TableHead>
//             <TableHead>Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {currentRows.map((row) => (
//             <TableRow key={row?.id}>
//               <TableCell>{row?.name}</TableCell>
//               <TableCell> {row?.email}</TableCell>
//               <TableCell> {row?.phoneNumber}</TableCell>
//               <TableCell>
//                 <Button
//                   onClick={() => handleEdit(row)}
//                   className="mr-2"
//                   variant="outline"
//                 >
//                   <Popover className=" w-[250px]">
//                     <PopoverTrigger>Edit</PopoverTrigger>
//                     <PopoverContent className="w-full ">
//                       <div>
//                         <EditModal
//                           rowData={selectedRow}
//                           onUpdate={(updatedData) => {
//                             onUpdate(updatedData);
//                             setShowModal(false);
//                           }}
//                           showModal={showModal}
//                           setShowModal={setShowModal}
//                         />
//                       </div>
//                     </PopoverContent>
//                   </Popover>
//                 </Button>
//                 <AlertDialog>
//                   <Button variant="destructive">
//                     <AlertDialogTrigger>Delete</AlertDialogTrigger>
//                   </Button>
//                   <AlertDialogContent>
//                     <AlertDialogHeader>
//                       <AlertDialogTitle>
//                         Are you absolutely sure?
//                       </AlertDialogTitle>
//                       <AlertDialogDescription>
//                         This action cannot be undone. This will permanently
//                         delete your data from our servers.
//                       </AlertDialogDescription>
//                     </AlertDialogHeader>
//                     <AlertDialogFooter>
//                       <AlertDialogCancel>Cancel</AlertDialogCancel>
//                       <AlertDialogAction onClick={() => onDelete(row.id)}>
//                         Continue
//                       </AlertDialogAction>
//                     </AlertDialogFooter>
//                   </AlertDialogContent>
//                 </AlertDialog>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//         <TableFooter>
//           <Pagination>
//             <PaginationContent>
//               <PaginationItem>
//                 <PaginationPrevious href="#" />
//               </PaginationItem>
//               <PaginationItem>
//                 <PaginationLink href="#">1</PaginationLink>
//               </PaginationItem>
//               <PaginationItem>
//                 <PaginationLink href="#" isActive>
//                   2
//                 </PaginationLink>
//               </PaginationItem>
//               <PaginationItem>
//                 <PaginationLink href="#">3</PaginationLink>
//               </PaginationItem>
//               <PaginationItem>
//                 <PaginationNext href="#" />
//               </PaginationItem>
//             </PaginationContent>
//           </Pagination>
//         </TableFooter>
//       </Table>
//       <div className="pagination">
//         {Array.from({ length: Math.ceil(data.length / pageSize) }, (_, i) => (
//           <button key={i + 1} onClick={() => handlePageChange(i + 1)}>
//             {i + 1}
//           </button>
//         ))}
//       </div>
//       {/* {fileFields.includes("name") && fileFields.includes("email") && ( */}
//       {data.length > 0 && (
//         <div className="w-full flex justify-center">
//           <AlertDialog>
//             <Button variant="">
//               <AlertDialogTrigger>Submit</AlertDialogTrigger>
//             </Button>
//             <AlertDialogContent>
//               <AlertDialogHeader>
//                 <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//                 {/* <AlertDialogDescription>
//                   This action cannot be undone. This will permanently delete
//                   your data from our servers.
//                 </AlertDialogDescription> */}
//               </AlertDialogHeader>
//               <AlertDialogFooter>
//                 <AlertDialogCancel>Cancel</AlertDialogCancel>
//                 <AlertDialogAction
//                   onClick={handleSubmit}
//                   className={`submit-btn ${isAllRowsFilled ? "" : "disabled"}`}
//                   disabled={!isAllRowsFilled}
//                 >
//                   Continue
//                 </AlertDialogAction>
//               </AlertDialogFooter>
//             </AlertDialogContent>
//           </AlertDialog>
//           {/* <Button
//             onClick={handleSubmit}
//             className={`submit-btn ${isAllRowsFilled ? "" : "disabled"}`}
//             disabled={!isAllRowsFilled}
//           >
//             Submit
//           </Button>{" "} */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CompleteDataTable;

import React, { useState } from "react";
import EditModal from "./EditModal";
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

const IncompleteDataTable = ({ data, onUpdate, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const handleEdit = (row) => {
    setSelectedRow(row);
    setShowModal(true);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastRow = currentPage * pageSize;
  const indexOfFirstRow = indexOfLastRow - pageSize;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  // Calculate total number of pages
  const totalPages = Math.ceil(data.length / pageSize);

  // Generate pagination links dynamically
  const paginationLinks = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationLinks.push(
      <PaginationItem key={i}>
        <PaginationLink href="#" onClick={() => handlePageChange(i)}>
          {i}
        </PaginationLink>
      </PaginationItem>
    );
  }

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
          {currentRows.length > 0 ? (
            <>
              {" "}
              {currentRows?.map((row) => (
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
            </>
          ) : (
            <></>
          )}
        </TableBody>
        <TableFooter>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                {currentPage > 1 && (
                  <PaginationPrevious
                    href="#"
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
              {/* {paginationLinks} */}
              {totalPages && currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </TableFooter>
      </Table>
    </div>
  );
};

export default IncompleteDataTable;

// import React, { useState } from "react";
// import EditModal from "./EditModal";
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
// const IncompleteDataTable = ({ data, onUpdate, onDelete }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [selectedRow, setSelectedRow] = useState(null);
//   const pageSize = 5;
//   const [currentPage, setCurrentPage] = useState(1);

//   const handleEdit = (row) => {
//     setSelectedRow(row);
//     setShowModal(true);
//   };

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const indexOfLastRow = currentPage * pageSize;
//   const indexOfFirstRow = indexOfLastRow - pageSize;
//   const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

//   return (
//     <div className="table-container">
//       {/* {showModal && selectedRow && (
//         <div className="modal-overlay">
//           <EditModal
//             rowData={selectedRow}
//             onUpdate={(updatedData) => {
//               onUpdate(updatedData);
//               setShowModal(false);
//             }}
//             showModal={showModal}
//             setShowModal={setShowModal}
//           />
//         </div>
//       )} */}

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
//       {/* <table className="data-table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Phone Number</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentRows.map((row) => (
//             <tr key={row.id}>
//               <td>{row.name}</td>
//               <td>{row.email}</td>
//               <td>{row.phoneNumber}</td>
//               <td>
//                 <button
//                   className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none mt-4`}
//                   onClick={() => handleEdit(row)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className={`bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none mt-4`}
//                   onClick={() => onDelete(row.id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="pagination">
//         {Array.from({ length: Math.ceil(data.length / pageSize) }, (_, i) => (
//           <button key={i + 1} onClick={() => handlePageChange(i + 1)}>
//             {i + 1}
//           </button>
//         ))}
//       </div> */}
//     </div>
//   );
// };

// export default IncompleteDataTable;

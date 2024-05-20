/**
 * v0 by Vercel.
 * @see https://v0.dev/t/1HRaPgpZp52
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaSpinner } from "react-icons/fa";
import {
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogContent,
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/utils/firebase";
import UpdateSubEvent from "./UpdateSubEvent";
import { useSelector } from "react-redux";
import { store } from "@/utils/store";
export default function AddSubEvent() {
  const [subEvent, setSubEvent] = useState([
    // {
    //   title: "Music Festival",
    //   description: "A celebration of music and art",
    //   image:
    //     "https://firebasestorage.googleapis.com/v0/b/qr-code-7944d.appspot.com/o/subEvent%2FParty-Invitation-Template-01.webp?alt=media&token=ad402876-5064-4321-8f55-24dedf3e57d4",
    //   catalogue:
    //     "https://firebasestorage.googleapis.com/v0/b/qr-code-7944d.appspot.com/o/subEvent%2FParty-Invitation-Template-01.webp?alt=media&token=ad402876-5064-4321-8f55-24dedf3e57d4",
    // },
    // {
    //   title: "Art Showcase",
    //   description: "A display of local artists' work",
    //   image:
    //     "https://firebasestorage.googleapis.com/v0/b/qr-code-7944d.appspot.com/o/subEvent%2FParty-Invitation-Template-01.webp?alt=media&token=ad402876-5064-4321-8f55-24dedf3e57d4",
    //   catalogue:
    //     "https://firebasestorage.googleapis.com/v0/b/qr-code-7944d.appspot.com/o/subEvent%2FParty-Invitation-Template-01.webp?alt=media&token=ad402876-5064-4321-8f55-24dedf3e57d4",
    // },
    // {
    //   title: "Food Truck Festival",
    //   description: "A gathering of the best food trucks in the city",
    //   image:
    //     "https://firebasestorage.googleapis.com/v0/b/qr-code-7944d.appspot.com/o/subEvent%2FParty-Invitation-Template-01.webp?alt=media&token=ad402876-5064-4321-8f55-24dedf3e57d4",
    //   catalogue:
    //     "https://firebasestorage.googleapis.com/v0/b/qr-code-7944d.appspot.com/o/subEvent%2FParty-Invitation-Template-01.webp?alt=media&token=ad402876-5064-4321-8f55-24dedf3e57d4",
    // },
  ]);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [catalogue, setCatalogue] = useState("");
  const [catalogFile, setCatalogFile] = useState(null);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [isCatalogUploading, setIsCatalogUploading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  //   const [updatedSubEvent, setUpdatedSubEvent] = useState({
  //     title,
  //     description,
  //     image,
  //     catalogue,
  //   });

  const eventData = useSelector((state) => state?.eventSlice);
  useEffect(() => {
    setSubEvent(eventData.subEvents);
  }, [eventData]);

  console.log("<<<<<", eventData);
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  console.log(console.log(title, description, image, catalogue));
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleFileChange = (event) => {
    console.log(event);

    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImageFile(reader.result);
      };
      setIsImageUploading(true);
      uploadFile(file, setImage, setIsImageUploading);
    }
    console.log(imageFile);
  };
  const handleCatalogChange = (event) => {
    console.log(event);

    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setCatalogFile(reader.result);
      };
      setIsCatalogUploading(true);
      uploadFile(file, setCatalogue, setIsCatalogUploading);
    }
    console.log(imageFile);
  };
  console.log("imageFile", imageFile);

  const uploadFile = (file, setURL, setIsUploading) => {
    const storageRef = ref(storage, `subEvent/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // handle progress
      },
      (error) => {
        // handle error
        console.error(error);
      },
      () => {
        // handle completion
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setURL(downloadURL);
          setIsUploading(false);
        });
      }
    );
  };
  const handleSaveSubEvent = () => {
    if (title && description && image && catalogue) {
      const newSubEvent = {
        title,
        description,
        image,
        catalogue,
      };
      setSubEvent([...subEvent, newSubEvent]);
      // Clear form fields after adding the new sub-event
      setTitle("");
      setDescription("");
      setImage("");
      setCatalogue("");
    }
  };

  const handleUpdateSubEvent = (updatedSubEvent, selectedIndex) => {
    console.log(">>>>>>>", selectedIndex);
    if (selectedIndex !== null) {
      console.log("not nulll");
      // Update existing sub-event
      const updatedSubEvents = [...subEvent];
      updatedSubEvents[selectedIndex] = updatedSubEvent;
      setSubEvent(updatedSubEvents);
      setSelectedIndex(null);
    } else {
      console.log("error");
      //   updatedSubEvent = {
      //     title,
      //     description,
      //     image,
      //     catalog,
      //   };
      //   // Add new sub-event
      //   setSubEvent([...subEvent, updatedSubEvent]);
    }
    // Clear form fields
    setTitle("");
    setDescription("");
    setImage("");
    setCatalogue("");
  };
  const handleDeleteSubEvent = (index) => {
    const updatedSubEvents = [...subEvent];
    updatedSubEvents.splice(index, 1);
    setSubEvent(updatedSubEvents);
  };
  //   const handleUpdateSubEvent = (index) => {
  //     const selectedSubEvent = subEvent[index];
  //     setTitle(selectedSubEvent.title);
  //     setDescription(selectedSubEvent.description);
  //     setImage(selectedSubEvent.image);
  //     setCatalog(selectedSubEvent.catalog);
  //     setSelectedIndex(index);
  //   };

  return (
    <>
      <main className="flex flex-col items-center justify-center py-12 md:py-24">
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Add Sub-Event
              </h1>
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                Create a new sub-event for your event.
              </p>
              <form className="mt-8 space-y-6">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    className="mt-1"
                    id="title"
                    placeholder="Enter the sub-event title"
                    type="text"
                    onChange={handleTitleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    className="mt-1"
                    id="description"
                    onChange={handleDescriptionChange}
                    placeholder="Enter a description for the sub-event"
                    rows={4}
                  />
                </div>
                <div>
                  <Label>Image</Label>
                  <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 dark:border-gray-600">
                    <div className="space-y-1 text-center">
                      <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                      {!isImageUploading && (
                        <>
                          <div className="flex text-sm text-gray-600 dark:text-gray-400">
                            <label
                              className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500 dark:bg-gray-950 dark:text-gray-50 dark:hover:text-gray-300"
                              htmlFor="file-upload"
                            >
                              {/* <span>Upload a file</span> */}
                              <Input
                                type="file"
                                onClick={handleFileChange}
                                // className="hidden"
                                multiple={false}
                                onChange={handleFileChange}
                              />
                            </label>

                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </>
                      )}
                      {isImageUploading && (
                        <p className="flex  m-5 ">
                          Uploading image...
                          <FaSpinner className="animate-spin h-5 w-5 text-gray-500" />
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                {/* {imageFile && (
                <img
                  src={imageFile}
                  alt="Selected file"
                  style={{ maxWidth: "150px", marginTop: "10px" }}
                />
              )} */}
                {image && (
                  <a href={image} target="_blank" rel="noopener noreferrer">
                    <img
                      style={{ maxWidth: "150px", marginTop: "10px" }}
                      src={image}
                      alt="Uploaded"
                    />
                  </a>
                )}
              </form>
            </div>
            {image && (
              <div>
                <h2 className="text-2xl font-bold tracking-tight">catalogue</h2>
                <p className="mt-4 text-gray-500 dark:text-gray-400">
                  Select a catalogue.
                </p>

                <div>
                  <Label>Image</Label>
                  <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 dark:border-gray-600">
                    <div className="space-y-1 text-center">
                      <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                      {!isCatalogUploading && (
                        <>
                          {" "}
                          <div className="flex text-sm text-gray-600 dark:text-gray-400">
                            <label
                              className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500 dark:bg-gray-950 dark:text-gray-50 dark:hover:text-gray-300"
                              htmlFor="file-upload"
                            >
                              {/* <span>Upload a file</span> */}
                              <Input
                                type="file"
                                className="w-full "
                                onClick={handleCatalogChange}
                                // className="hidden"
                                multiple={false}
                                onChange={handleCatalogChange}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </>
                      )}
                    </div>
                    {isCatalogUploading && (
                      <p className="flex  m-5 ">
                        Uploading image...
                        <FaSpinner className="animate-spin h-5 w-5 text-gray-500" />
                      </p>
                    )}
                  </div>
                  {/* {catalogFile && (
                <img
                  src={catalogFile}
                  alt="Selected file"
                  style={{ maxWidth: "150px", marginTop: "10px" }}
                />
              )} */}
                  {catalogue && (
                    <a href={image} target="_blank" rel="noopener noreferrer">
                      <img
                        style={{ maxWidth: "150px", marginTop: "10px" }}
                        src={catalogue}
                        alt="Uploaded"
                      />
                    </a>
                  )}
                  <div className="mt-8 flex justify-center">
                    {title && description && image && catalogue && (
                      <Button onClick={handleSaveSubEvent}>
                        Add Sub-Event
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold tracking-tight">
              Existing Sub-Events
            </h2>
            <div className="mt-4 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead>catalogue</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subEvent?.map((subEvent, index) => (
                    <TableRow key={index}>
                      <TableCell>{subEvent?.title}</TableCell>
                      <TableCell>{subEvent.description}</TableCell>
                      <TableCell>
                        <a
                          href={subEvent?.image}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            alt="Sub-Event Image"
                            className="rounded-md"
                            height={100}
                            src={subEvent?.image}
                            style={{
                              aspectRatio: "100/100",
                              objectFit: "cover",
                            }}
                            width={100}
                          />
                        </a>
                      </TableCell>
                      <TableCell>
                        <a
                          href={subEvent?.image}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            alt="Sub-Event catalog"
                            className="rounded-md"
                            height={100}
                            src={subEvent?.catalogue}
                            style={{
                              aspectRatio: "100/100",
                              objectFit: "cover",
                            }}
                            width={100}
                          />
                        </a>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <UpdateSubEvent
                            uploadFile={uploadFile}
                            index={index}
                            subEvent={subEvent}
                            handleSaveSubEvent={handleUpdateSubEvent}
                          />
                          <Button
                            onClick={() => handleDeleteSubEvent(index)}
                            color="red"
                            size="sm"
                            variant="outline"
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {/* <TableRow>
                  <TableCell>Art Showcase</TableCell>
                  <TableCell>A display of local artists' work</TableCell>
                  <TableCell>
                    <img
                      alt="Sub-Event Image"
                      className="rounded-md"
                      height={100}
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: "100/100",
                        objectFit: "cover",
                      }}
                      width={100}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        Update
                      </Button>
                      <Button color="red" size="sm" variant="outline">
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Food Truck Festival</TableCell>
                  <TableCell>
                    A gathering of the best food trucks in the city
                  </TableCell>
                  <TableCell>
                    <img
                      alt="Sub-Event Image"
                      className="rounded-md"
                      height={100}
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: "100/100",
                        objectFit: "cover",
                      }}
                      width={100}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        Update
                      </Button>
                      <Button color="red" size="sm" variant="outline">
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow> */}
                </TableBody>
              </Table>
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <Button onClick={handleSaveSubEvent}>Save Sub-Event</Button>
          </div>
        </div>
      </main>
    </>
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

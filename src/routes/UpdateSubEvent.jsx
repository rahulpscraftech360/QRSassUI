import React, { useEffect, useState } from "react";
import "./UpdateSubEvent.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaSpinner } from "react-icons/fa";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/utils/firebase";
const UpdateSubEvent = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [catalog, setCatalog] = useState("");
  const [catalogFile, setCatalogFile] = useState(null);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [isCatalogUploading, setIsCatalogUploading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleUpdateSubEvent = () => {
    console.log(">>>>>", props);

    console.log(props.subEvent);
    if (props.subEvent) {
      console.log("hereeeeeeIndex", selectedIndex);
      const selectedSubEvent = props.subEvent;
      console.log("selectedSubEvent", selectedSubEvent);
      setTitle(selectedSubEvent.title);
      setDescription(selectedSubEvent.description);
      setImage(selectedSubEvent.image);
      setCatalog(selectedSubEvent.catalog);
      setSelectedIndex(props.index);
    }
  };
  // useEffect(() => {
  //   handleUpdateSubEvent(props);
  // }, [props]);

  console.log("title>>>>", title);
  console.log("fadjsfcjsd", description);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  console.log(console.log(title, description, image, catalog));
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

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
      uploadFile(file, setCatalog, setIsCatalogUploading);
    }
    console.log(imageFile);
  };

  const handleSaveChanges = () => {
    console.log("heree");
    // Update subEvent with new values
    const SubEvent = {
      title,
      description,
      image,
      catalog,
    };
    console.log(SubEvent);
    console.log("selectedIndex", selectedIndex);
    console.log("props.handleSaveSubEvent", props.handleSaveSubEvent);
    props.handleSaveSubEvent(SubEvent, selectedIndex);
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button onClick={handleUpdateSubEvent} variant="outline">
            Update
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Sub-Event</DialogTitle>
            <DialogDescription>
              Make changes to the sub-event details here. Click save when you're
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[600px] overflow-y-auto no-scrollbar">
            <form className="mt-8 space-y-6">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  onChange={handleTitleChange}
                  className="mt-1"
                  defaultValue={title}
                  id="title"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  className="mt-1"
                  defaultValue={description}
                  id="description"
                  rows={4}
                  onChange={handleDescriptionChange}
                />
              </div>
              <div>
                <Label>Image</Label>
                <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 dark:border-gray-600">
                  <div className="space-y-1 text-center">
                    <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                    {!isImageUploading && (
                      <>
                        {" "}
                        <div className="flex text-sm text-gray-600 dark:text-gray-400">
                          <label
                            className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500 dark:bg-gray-950 dark:text-gray-50 dark:hover:text-gray-300"
                            htmlFor="file-upload"
                          >
                            <span>Upload a file</span>
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
              {image && (
                <img
                  style={{ maxWidth: "100px", marginTop: "5px" }}
                  src={image}
                  alt="Uploaded"
                />
              )}
            </form>

            <div>
              {image && (
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Catalog</h2>
                  <p className="mt-4 text-gray-500 dark:text-gray-400">
                    Select a catalog.
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
                    {catalog && (
                      <img
                        style={{ maxWidth: "100px", marginTop: "5px" }}
                        src={catalog}
                        alt="Uploaded"
                      />
                    )}
                    {/* <div className="mt-8 flex justify-center">
                    {title && description && image && catalog && (
                      <Button onClick={handleSaveSubEvent}>update</Button>
                    )}
                  </div> */}
                  </div>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveChanges}>Save changes</Button>
            {/* <div>
              <Button variant="outline">Cancel</Button>
            </div> */}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateSubEvent;
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

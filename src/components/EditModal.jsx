import React, { useState, useEffect } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const EditModal = ({
  rowData,
  onUpdate,
  showModal,
  setShowModal,
  PopoverTrigger,
}) => {
  const [editedData, setEditedData] = useState(rowData);

  useEffect(() => {
    if (showModal) {
      setEditedData(rowData);
    }
  }, [rowData, showModal]);

  const handleInputChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Validation logic here
    onUpdate(editedData);
  };

  return showModal ? (
    <div className="">
      <Label>Name:</Label>
      <Input
        type="text"
        name="name"
        placeholder="name"
        value={editedData.name || ""}
        onChange={handleInputChange}
      />
      <Label>Email:</Label>
      <Input
        type="email"
        name="email"
        placeholder="email"
        value={editedData.email || ""}
        onChange={handleInputChange}
      />
      <Label>Phone Number</Label>
      <Input
        type="text"
        name="phoneNumber"
        placeholder="phoneNumber"
        value={editedData.phoneNumber || ""}
        onChange={handleInputChange}
      />

      <Button className="gap-2 mt-2" onClick={handleSubmit}>
        Update
      </Button>
    </div>
  ) : null;
};

export default EditModal;

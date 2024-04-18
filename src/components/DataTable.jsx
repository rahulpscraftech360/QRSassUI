import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDataList, deleteData } from "../utils/dataSlice";
import CompleteDataTable from "./CompleteDataTable";
import IncompleteDataTable from "./IncompleteDataTable";

const DataTable = ({ fileFields, handleClear }) => {
  const data = useSelector((state) => state.dataSlice);
  const dispatch = useDispatch();
  const [completeData, setCompleteData] = useState([]);
  const [incompleteData, setIncompleteData] = useState([]);
  console.log("data>>>>", data);
  useEffect(() => {
    const complete = data.filter(
      (row) => row.name && row.email && row.phoneNumber
    );
    const incomplete = data.filter(
      (row) => !row.name || !row.email || !row.phoneNumber
    );

    setCompleteData(complete);
    setIncompleteData(incomplete);
  }, [data]);
  console.log(completeData);
  console.log(incompleteData);
  const handleUpdateData = (updatedData) => {
    dispatch(updateDataList(updatedData));
  };

  const handleDelete = (id) => {
    dispatch(deleteData(id));
  };

  return (
    <div>
      <h3 className="font-semibold mb-2">Incomplete Data</h3>
      <IncompleteDataTable
        data={incompleteData}
        onUpdate={handleUpdateData}
        onDelete={handleDelete}
      />

      <h3 className="font-semibold mb-2">Complete Data</h3>
      <CompleteDataTable
        data={completeData}
        onUpdate={handleUpdateData}
        handleClear={handleClear}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default DataTable;

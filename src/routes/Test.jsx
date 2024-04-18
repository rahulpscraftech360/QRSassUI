import { Dropzone } from "../components/Dropzone";
import { useState } from "react";

export default function Test() {
  const [files, setFiles] = useState([]);

  return (
    <div className="sm:py-5">
      <Dropzone onChange={setFiles} className="w-full" />
    </div>
  );
}

import "../App.css";
import { Button } from "@mui/material";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import { Fragment } from "react";

const UploadComponent = ({ setSelectedFile }) => {
  const handleUpload = () => {
    document.getElementById("pdfUpload").click();
  };

  const changeHandler = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    GlobalWorkerOptions.workerSrc = "/pdf.worker.js";

    const path = (window.URL || window.webkitURL).createObjectURL(file);
    const doc = getDocument(path);

    doc.promise
      .then((blob) => blob.fingerprints[0])
      .then(console.log)
      .catch(console.error);
  };

  return (
    <Fragment>
      <Button onClick={handleUpload}>Upload Diploma</Button>
      <input
        id="pdfUpload"
        type="file"
        accept="application/pdf"
        onChange={changeHandler}
      ></input>
    </Fragment>
  );
};

export default UploadComponent;

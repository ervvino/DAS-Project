import "../App.css";
import { Button } from "@mui/material";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import { Fragment } from "react";

const UploadComponent = ({ setSelectedFile, openSnackbar, closeSnackbar }) => {
  const handleUpload = () => {
    document.getElementById("pdfUpload").click();
  };

  const changeHandler = async (event) => {
    const all = { file: null, hash: null };
    const file = event.target.files[0];
    all.file = file;

    GlobalWorkerOptions.workerSrc = "/pdf.worker.js";

    const path = (window.URL || window.webkitURL).createObjectURL(file);
    const doc = getDocument(path);

    doc.promise.then((f) => {
      all.hash = f.fingerprints[0];

      setSelectedFile(all);
      console.log(all);

      openSnackbar("file uploaded and ready to interact with");
    });
  };

  return (
    <Fragment>
      <Button onClick={handleUpload} variant="outlined">
        Upload Diploma
      </Button>
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

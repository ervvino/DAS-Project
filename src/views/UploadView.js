import "../App.css";
import { Fragment, useState } from "react";
import UploadComponent from "../components/Upload";

const UploadView = () => {
  const [selectedFile, setSelectedFile] = useState();

  return (
    <Fragment>
      <UploadComponent setSelectedFile={setSelectedFile} />
    </Fragment>
  );
};

export default UploadView;

import "../App.css";
import { Fragment, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { universityCheck } from "../walletFunctions";

const LandingPage = ({ openSnackbar }) => {
  const navigate = useNavigate();
  const navigateTo = (path = "/") => navigate(path);

  const [isDisabled, setDisabled] = useState(true);

  useEffect(() => {
    universityCheck(setDisabled, openSnackbar);
  }, [openSnackbar]);

  if (typeof window.ethereum === "undefined") {
    navigateTo("error");
  }

  return (
    <Fragment>
      <div className="App">
        <div className="introTextDiv">
          <p>What do you want to do?</p>
        </div>
        <div className="introUploadDiv introBox">
          <div className={`glassBox ${isDisabled && "disabled"}`}>
            <Button
              variant="outlined"
              disabled={isDisabled}
              onClick={() => navigateTo("upload")}
            >
              Upload Diploma
            </Button>
          </div>
        </div>
        <div className="introVerifyDiv introBox">
          <div className="glassBox">
            <Button variant="outlined" onClick={() => navigateTo("verify")}>
              Verify Diploma
            </Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LandingPage;

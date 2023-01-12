import "../App.css";
import { Fragment } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const navigateTo = (path = "/") => navigate(path);

  return (
    <Fragment>
      <div className="App">
        <div className="introTextDiv">
          <p>What do you want to do?</p>
        </div>
        <div className="introUploadDiv introBox">
          <div className="glassBox">
            <Button variant="outlined" onClick={() => navigateTo("upload")}>
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

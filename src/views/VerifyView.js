import "../App.css";
import abi from "../artifacts/contracts/IssuingAuthority.sol/IssuingAuthority.json";
import { ethers } from "ethers";
import React, { Fragment, useState } from "react";
import { Button, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UploadComponent from "../components/Upload";
import { useNavigate } from "react-router-dom";

const VerifyView = ({ openSnackbar, closeSnackbar }) => {
  const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
  const contractABI = abi.abi;
  const [selectedFile, setSelectedFile] = useState();
  const [validity, setValidity] = useState();
  const [showState, setShowState] = useState(false);

  const navigate = useNavigate();
  const navigateTo = (path = "/") => navigate(path);

  const verify = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      throw new Error("missing ethereum on window object");
    }
    const provider = new ethers.providers.Web3Provider(ethereum, "any");
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    const { hash } = selectedFile;

    if (!hash || hash.length !== 32) {
      throw new Error("validity or hash empty");
    }

    const value = await contract.verifyDiploma(hash);
    console.log(value);
    setValidity(value);
    setShowState(true);
    openSnackbar("verification of document done");
  };

  return (
    <Fragment>
      <IconButton
        class="backButton"
        onClick={() => navigateTo("/")}
        color="primary"
        aria-label="upload picture"
        component="label"
      >
        <ArrowBackIcon />
      </IconButton>
      <UploadComponent
        setSelectedFile={setSelectedFile}
        openSnackbar={openSnackbar}
      />
      <Button
        disabled={!selectedFile?.hash}
        variant="outlined"
        onClick={verify}
      >
        Verify
      </Button>

      {
        <div>
          {showState && (
            <Fragment>
              <p
                style={{
                  textDecoration: `underline 4px var(${
                    validity ? "--green" : "--red"
                  })`,
                }}
              >
                Validity: {validity + ""}
              </p>
            </Fragment>
          )}
        </div>
      }
    </Fragment>
  );
};

export default VerifyView;

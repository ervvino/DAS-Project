import "../App.css";
import abi from "../artifacts/contracts/IssuingAuthority.sol/IssuingAuthority.json";
import { ethers } from "ethers";
import React, { Fragment, useState } from "react";
import { Button } from "@mui/material";
import UploadComponent from "../components/Upload";

const VerifyView = () => {
  const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
  const contractABI = abi.abi;
  const [selectedFile, setSelectedFile] = useState();
  const [validity, setValidity] = useState();
  const [showState, setShowState] = useState(false);

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
    console.log(value)
    setValidity(value);
    setShowState(true)
  };

  return (
    <Fragment>
      <UploadComponent setSelectedFile={setSelectedFile} />
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

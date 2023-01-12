import "../App.css";
import abi from "../artifacts/contracts/IssuingAuthority.sol/IssuingAuthority.json";
import { ethers } from "ethers";
import { Fragment, useState } from "react";
import WalletConnectedDialog from "../components/WalletConnectedDialog";
import { connectWallet } from "../walletFunctions";
import { Button } from "@mui/material";
import UploadComponent from "../components/Upload";

const VerifyView = () => {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const contractABI = abi.abi;
  const [selectedFile, setSelectedFile] = useState();
  const [currentAccount, setCurrentAccount] = useState("");
  const [fingerprint, setFingerprint] = useState("");
  const [validity, setValidity] = useState(false);

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

    setValidity(value.validity);
    setFingerprint(value.documentFingerprint);
  };

  return (
    <Fragment>
      <WalletConnectedDialog
        isWalletConnected={!!currentAccount}
        connect={() => connectWallet(setCurrentAccount)}
      />
      <UploadComponent setSelectedFile={setSelectedFile} />
      <Button disabled={!selectedFile?.hash} onClick={verify}>
        Verify
      </Button>

      {fingerprint && { validity, fingerprint }}
    </Fragment>
  );
};

export default VerifyView;

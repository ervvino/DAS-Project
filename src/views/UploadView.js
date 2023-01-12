import abi from "../artifacts/contracts/IssuingAuthority.sol/IssuingAuthority.json";
import { ethers } from "ethers";
import "../App.css";
import { Fragment, useState } from "react";
import UploadComponent from "../components/Upload";
import WalletConnectedDialog from "../components/WalletConnectedDialog";
import { connectWallet } from "../walletFunctions";
import { Button } from "@mui/material";

const UploadView = () => {
  // Contract Address & ABI
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const contractABI = abi.abi;
  const [selectedFile, setSelectedFile] = useState();
  const [currentAccount, setCurrentAccount] = useState("");

  const issuingAuthority = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      throw new Error("missing ethereum on window object");
    }
    const provider = new ethers.providers.Web3Provider(ethereum, "any");
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    const { hash } = selectedFile;
    const validity = true;

    console.log("creating diploma..");

    if (!hash || hash.length !== 32) {
      throw new Error("validity or hash empty");
    }

    const diplomaTxn = await contract.createDiploma(validity, hash);

    await diplomaTxn.wait();

    console.log("mined ", diplomaTxn.hash);
    console.log("diploma created!");
  };

  return (
    <Fragment>
      <WalletConnectedDialog
        isAccountConnected={!!currentAccount}
        connect={() => connectWallet(setCurrentAccount)}
      />
      <UploadComponent setSelectedFile={setSelectedFile} />
      <Button disabled={!selectedFile.hash} onClick={issuingAuthority}>
        Upload Document to Blockchain
      </Button>
    </Fragment>
  );
};

export default UploadView;

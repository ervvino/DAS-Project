import abi from "../artifacts/contracts/IssuingAuthority.sol/IssuingAuthority.json";
import { ethers } from "ethers";
import "../App.css";
import { Fragment, useState } from "react";
import UploadComponent from "../components/Upload";
import WalletConnectedDialog from "../components/WalletConnectedDialog";
import { connectWallet } from "../walletFunctions";
import { Button } from "@mui/material";

const UploadView = ({ openSnackbar, closeSnackbar }) => {
  // Contract Address & ABI
  const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
  const contractABI = abi.abi;
  const [selectedFile, setSelectedFile] = useState();
  const [currentAccount, setCurrentAccount] = useState("");

  window.ethereum.on("accountsChanged", (accounts) => {
    setCurrentAccount(accounts[0]);
  });

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

    openSnackbar("Transaction done");
  };

  return (
    <div className="viewWrapper">
      <WalletConnectedDialog
        isWalletConnected={
          !!currentAccount || !!window.ethereum._state.accounts?.[0]
        }
        connect={() => connectWallet(setCurrentAccount)}
      />
      <UploadComponent
        setSelectedFile={setSelectedFile}
        openSnackbar={openSnackbar}
      />
      <Button
        disabled={!selectedFile?.hash}
        variant="outlined"
        onClick={issuingAuthority}
      >
        Upload Document to Blockchain
      </Button>
    </div>
  );
};

export default UploadView;

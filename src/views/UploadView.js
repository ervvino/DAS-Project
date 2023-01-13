import abi from "../artifacts/contracts/IssuingAuthority.sol/IssuingAuthority.json";
import { ethers } from "ethers";
import "../App.css";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadComponent from "../components/Upload";
import WalletConnectedDialog from "../components/WalletConnectedDialog";
import { connectWallet } from "../walletFunctions";
import { Button } from "@mui/material";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const UploadView = ({ openSnackbar, closeSnackbar }) => {
  const navigate = useNavigate();
  const navigateTo = (path = "/") => navigate(path);

  // Contract Address & ABI
  const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
  const contractABI = abi.abi;
  const [selectedFile, setSelectedFile] = useState();
  const [currentAccount, setCurrentAccount] = useState("");
  const [isInChain, setInChain] = useState(false);

  window.ethereum.on("accountsChanged", (accounts) => {
    setCurrentAccount(accounts[0]);
  });

  useEffect(() => {
    (async () => {
      if (!!selectedFile) {
        const { ethereum } = window;

        if (!ethereum) {
          throw new Error("missing ethereum on window object");
        }
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        const { hash } = selectedFile;

        if (!hash || hash.length !== 32) {
          throw new Error("validity or hash empty");
        }

        const value = await contract.verifyDiploma(hash);
        console.log(value);
        setInChain(value);
        value && openSnackbar("verification of document done");
      }
    })();
  }, [selectedFile, setInChain, contractABI, contractAddress, openSnackbar]);

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

  const revoke = async () => {
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

    const diplomaTxn = await contract.revokeDiploma(hash);

    await diplomaTxn.wait();

    console.log("mined ", diplomaTxn.hash);
    console.log("diploma created!");

    openSnackbar("Revoke done");
  };

  return (
    <div className="viewWrapper">
      <IconButton
        class="backButton"
        onClick={() => navigateTo("/")}
        color="primary"
        aria-label="upload picture"
        component="label"
      >
        <ArrowBackIcon />
      </IconButton>
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
        disabled={!selectedFile?.hash && isInChain}
        variant="outlined"
        onClick={issuingAuthority}
      >
        Upload Document to Blockchain
      </Button>
      <Button
        disabled={!selectedFile?.hash && !isInChain}
        variant="outlined"
        onClick={revoke}
      >
        Revoke
      </Button>
    </div>
  );
};

export default UploadView;

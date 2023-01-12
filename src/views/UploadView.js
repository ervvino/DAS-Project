import abi from '../artifacts/contracts/IssuingAuthority.sol/IssuingAuthority.json';
import { ethers } from "ethers";
import "../App.css";
import { Fragment, useState } from "react";
import UploadComponent from "../components/Upload";

const UploadView = () => {
  // Contract Address & ABI
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const contractABI = abi.abi;
  const [selectedFile, setSelectedFile] = useState();
  const [currentAccount, setCurrentAccount] = useState("");

  // Wallet connection logic
  const isWalletConnected = async () => {
    try {
      const { ethereum } = window;

      const accounts = await ethereum.request({method: 'eth_accounts'})
      console.log("accounts: ", accounts);

      if (accounts.length > 0) {
        const account = accounts[0];
        console.log("wallet is connected! " + account);
      } else {
        console.log("make sure MetaMask is connected");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }

  const connectWallet = async () => {
    try {
      const {ethereum} = window;

      if (!ethereum) {
        console.log("please install MetaMask");
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts'
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  }

  const IssuingAuthority = async () => {
    try {
      const {ethereum} = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();
        const buyMeACoffee = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        const {hash} = selectedFile;
        const validity = true;

        console.log("creating diploma..")

        if(!validity || !hash || hash.length !== 32){
          throw new Error('validity or hash empty')
        }

        const diplomaTxn = await IssuingAuthority.createDiploma(
          validity,
          hash
        );

        await diplomaTxn.wait();

        console.log("mined ", diplomaTxn.hash);

        console.log("diploma created!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <UploadComponent setSelectedFile={setSelectedFile} />
    </Fragment>
  );
};

export default UploadView;

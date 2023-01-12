import "./App.css";
import { useState } from "react";
import { ethers } from "ethers";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import Token from "./artifacts/contracts/Token.sol/Token.json";
import { Button, Input } from "@mui/material";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";

const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const tokenAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

const App = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const [greeting, setGreetingValue] = useState();
  const [userAccount, setUserAccount] = useState();
  const [amount, setAmount] = useState();

  const requestAccount = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  };

  const fetchGreeting = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider });
      const contract = new ethers.Contract(
        greeterAddress,
        Greeter.abi,
        provider
      );
      try {
        const data = await contract.greet();
        console.log("data: ", data);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  };

  const getBalance = async () => {
    if (typeof window.ethereum !== "undefined") {
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider);
      const balance = await contract.balanceOf(account);
      console.log("Balance: ", balance.toString());
    }
  };

  const setGreeting = async () => {
    if (!greeting) return;
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider });
      const signer = provider.getSigner();
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
      const transaction = await contract.setGreeting(greeting);
      await transaction.wait();
      fetchGreeting();
    }
  };

  const sendCoins = async () => {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
      const transation = await contract.transfer(userAccount, amount);
      await transation.wait();
      console.log(`${amount} Coins successfully sent to ${userAccount}`);
    }
  };

  const handleUpload = () => {
    document.getElementById("pdfUpload").click();
  };

  const changeHandler = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    GlobalWorkerOptions.workerSrc = "/pdf.worker.js";

    const path = (window.URL || window.webkitURL).createObjectURL(file);
    const doc = getDocument(path);

    doc.promise
      .then((blob) => blob.fingerprints[0])
      .then(console.log)
      .catch(console.error);
  };

  return (
    <div className="App">
      {/* <Button onClick={fetchGreeting}>Fetch Greeting</Button>
      <Button onClick={setGreeting}>Set Greeting</Button>
      <Input
        onChange={(e) => setGreetingValue(e.target.value)}
        placeholder="Set greeting"
      />

      <br />
      <Button onClick={getBalance}>Get Balance</Button>
      <Button onClick={sendCoins}>Send Coins</Button>
      <Input
        onChange={(e) => setUserAccount(e.target.value)}
        placeholder="Account ID"
      />
      <Input onChange={(e) => setAmount(e.target.value)} placeholder="Amount" /> */}

      <Button onClick={handleUpload}>Upload Document</Button>
      <input
        style={{ display: "hidden" }}
        id="pdfUpload"
        type="file"
        accept="application/pdf"
        onChange={changeHandler}
      ></input>
    </div>
  );
};

export default App;

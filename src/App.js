import "./App.css";
import { Fragment, useEffect, useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import LandingPage from "./views/LandingPage";
import UploadView from "./views/UploadView";
import VerifyView from "./views/VerifyView";
import ErrorView from "./views/ErrorView";
import WalletConnectedDialog from "./components/WalletConnectedDialog";
import { connectWallet } from "./walletFunctions";

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");

  window.ethereum.on("accountsChanged", (accounts) => {
    setCurrentAccount(accounts[0]);
  });

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Fragment>
        <Route path="/" element={<LandingPage />} />
        <Route path="upload" element={<UploadView />} />
        <Route path="verify" element={<VerifyView />} />
        <Route path="error" element={<ErrorView />} />
      </Fragment>
    )
  );

  return (
    <div className="viewWrapper">
      <WalletConnectedDialog
        isWalletConnected={
          !!currentAccount || !!window.ethereum._state.accounts?.[0]
        }
        connect={() => connectWallet(setCurrentAccount)}
      />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;

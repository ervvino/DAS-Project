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

  useEffect(() => {
    const listenMMAccount = async () => {
      window.ethereum.on("accountsChanged", (accounts) => {
        setCurrentAccount([0]);
      });
    };
    listenMMAccount();
  }, []);

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
    <Fragment>
      <WalletConnectedDialog
        isWalletConnected={!!currentAccount}
        connect={() => connectWallet(setCurrentAccount)}
      />
      <RouterProvider router={router} />
    </Fragment>
  );
};

export default App;

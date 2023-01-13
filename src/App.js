import "./App.css";
import { Fragment, useState } from "react";
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
import { Snackbar } from "@mui/material";

const App = () => {
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const handleSnackbarOpen = (message) => {
    setSnackbarOpen(true);
    setSnackbarMessage(message);
  };

  const handleSnackbarClose = () => {
    setSnackbarMessage("");
    setSnackbarOpen(false);
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Fragment>
        <Route
          path="/"
          element={
            <LandingPage
              openSnackbar={handleSnackbarOpen}
              closeSnackbar={handleSnackbarClose}
            />
          }
        />
        <Route
          path="upload"
          element={
            <UploadView
              openSnackbar={handleSnackbarOpen}
              closeSnackbar={handleSnackbarClose}
            />
          }
        />
        <Route
          path="verify"
          element={
            <VerifyView
              openSnackbar={handleSnackbarOpen}
              closeSnackbar={handleSnackbarClose}
            />
          }
        />
        <Route path="error" element={<ErrorView />} />
      </Fragment>
    )
  );

  return (
    <div className="viewWrapper">
      <RouterProvider router={router} />
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </div>
  );
};

export default App;

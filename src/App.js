import "./App.css";
import { Fragment } from "react";
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

const App = () => {
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

  return <RouterProvider router={router} />;
};

export default App;

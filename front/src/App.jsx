import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import Layout from "./layouts/Layout";
import Private from "./layouts/Private";
import Error from "./pages/Error";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import NotFound from "./pages/NotFound";
import User from "./pages/User";

const routes = createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route errorElement={<Error />}>
      <Route index element={<Home />} />
      <Route path="sign-in" element={<LogIn to="/user" />} />
      <Route path="user" element={<Private signIn="/sign-in" />}>
        <Route index element={<User />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  </Route>
);

const router = createBrowserRouter(routes, { basename: "/ArgentBank" });

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-center"
        autoClose={1500}
        closeOnClick={true}
        pauseOnHover={true}
        pauseOnFocusLoss={true}
        transition={Zoom}
      />
    </>
  );
}

export default App;

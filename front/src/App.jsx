import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import Layout from "./layouts/Layout";
import Private from "./layouts/Private";
import Error from "./pages/Error";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignOut from "./pages/SignOut";
import User from "./pages/User";

const routes = createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route errorElement={<Error />}>
      <Route index element={<Home />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="user" element={<Private to="/sign-in" />}>
        <Route index element={<User />} />
      </Route>
      <Route path="sign-out" element={<SignOut />} />
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
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        autoClose={3000}
      />
    </>
  );
}

export default App;

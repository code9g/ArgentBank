import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Layout from "./layouts/Layout";
import Error from "./pages/Error";
import Home from "./pages/Home";

const routes = createRoutesFromElements(
  <Route path="/" element={<Layout />} errorElement={<Error />}>
    <Route errorElement={<Error />}>
      <Route index element={<Home />} />
    </Route>
  </Route>
);

const router = createBrowserRouter(routes, { basename: "/ArgentBank" });

function App() {
  return <RouterProvider router={router} />;
}

export default App;

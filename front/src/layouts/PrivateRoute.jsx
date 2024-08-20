import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const isAuth = useSelector((state) => state.login.token !== null);
  return isAuth ? <Outlet /> : <Navigate to="/sign-in" replace={true} />;
}

export default PrivateRoute;

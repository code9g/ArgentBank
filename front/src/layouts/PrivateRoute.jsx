import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute({ to }) {
  const isAuth = useSelector((state) => state.login.token !== null);
  return isAuth ? <Outlet /> : <Navigate to={to} replace={true} />;
}

PrivateRoute.propTypes = {
  to: PropTypes.string,
};

export default PrivateRoute;

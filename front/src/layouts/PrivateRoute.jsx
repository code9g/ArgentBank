import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";
import { useLoginSelector } from "../redux/hooks";

function PrivateRoute({ to }) {
  const { isAuth } = useLoginSelector();
  return isAuth ? <Outlet /> : <Navigate to={to} replace={true} />;
}

PrivateRoute.propTypes = {
  to: PropTypes.string,
};

export default PrivateRoute;

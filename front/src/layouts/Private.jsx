import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthSelector } from "../redux/hooks";

function Private({ to }) {
  const { isAuth } = useAuthSelector();
  return isAuth ? <Outlet /> : <Navigate to={to} replace={true} />;
}

Private.propTypes = {
  to: PropTypes.string,
};

export default Private;

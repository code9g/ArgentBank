import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthSelector } from "../redux/hooks";

function Private() {
  const { isAuth } = useAuthSelector();
  return isAuth ? <Outlet /> : <Navigate to="/sign-in" replace={true} />;
}

Private.propTypes = {
  to: PropTypes.string,
};

export default Private;

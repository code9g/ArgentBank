import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthSelector } from "../redux/hooks";

function Private({ signIn }) {
  const { isAuth } = useAuthSelector();
  return isAuth ? <Outlet /> : <Navigate to={signIn} replace={true} />;
}

Private.propTypes = {
  signIn: PropTypes.string,
};

export default Private;

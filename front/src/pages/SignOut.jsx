import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { signOut } from "../redux/actions";

function SignOut() {
  const dispatch = useDispatch();

  dispatch(signOut());

  return <Navigate to="/" />;
}

SignOut.propTypes = {};

export default SignOut;

import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { signOut } from "../redux/actions";
import { useLoginSelector } from "../redux/hooks";

function SignOut() {
  const { token } = useLoginSelector();
  const dispatch = useDispatch();

  if (token) {
    dispatch(signOut());
  }

  return <Navigate to="/" />;
}

SignOut.propTypes = {};

export default SignOut;

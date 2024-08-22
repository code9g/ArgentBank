import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { signOut } from "../redux/actions";
import { useLoginSelector } from "../redux/hooks";

function SignOut() {
  const { token } = useLoginSelector();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(signOut());
    }
  }, [token, dispatch]);

  return <Navigate to="/" />;
}

SignOut.propTypes = {};

export default SignOut;

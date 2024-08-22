import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { signOut } from "../redux/actions";
import { useAuthSelector } from "../redux/hooks";

function SignOut() {
  const { isAuth } = useAuthSelector();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuth) {
      dispatch(signOut());
    }
  }, [isAuth, dispatch]);

  return <Navigate to="/" />;
}

SignOut.propTypes = {};

export default SignOut;

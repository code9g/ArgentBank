import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signOut } from "../redux/actions";
import { useAuthSelector } from "../redux/hooks";

function SignOut() {
  const { isAuth } = useAuthSelector();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuth) {
      dispatch(signOut())
        .then(() => {
          toast.success("You are logged out");
        })
        .catch(() => {
          toast.error("Wrong !");
        });
    }
  }, [isAuth, dispatch]);

  return <Navigate to="/" />;
}

SignOut.propTypes = {};

export default SignOut;

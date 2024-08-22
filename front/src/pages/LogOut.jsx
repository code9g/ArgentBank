import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signOut } from "../redux/actions";
import { useAuthSelector } from "../redux/hooks";
import { promiseError } from "../utils/functions";

function LogOut() {
  const { isAuth } = useAuthSelector();
  const dispatch = useDispatch();

  useEffect(() => {
    toast.promise(dispatch(signOut()), {
      pending: "Disconnecting...",
      success: "You are logged out",
      error: promiseError,
    });
  }, [isAuth, dispatch]);

  return <Navigate to="/" />;
}

export default LogOut;

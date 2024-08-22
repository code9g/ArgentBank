import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signOut } from "../redux/actions";
import { useAuthSelector } from "../redux/hooks";

let flag = false;
function SignOut() {
  const { isAuth } = useAuthSelector();
  const dispatch = useDispatch();

  useEffect(() => {
    // Trick pour gérer le "Strict Mode" de react en mode développement
    if (isAuth && (import.meta.env.PROD || flag)) {
      toast.promise(dispatch(signOut()), {
        pending: "Disconnecting...",
        success: "You are logged out",
        error: {
          render: ({ data }) => data.statusText || data.message,
        },
      });
    }
    return () => (flag = !flag);
  }, [isAuth, dispatch]);

  return <Navigate to="/" />;
}

SignOut.propTypes = {};

export default SignOut;

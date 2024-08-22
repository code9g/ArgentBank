import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signOut } from "../redux/actions";
import { useAuthSelector } from "../redux/hooks";
import { toastify } from "../utils/functions";

let flag = false;
function SignOut() {
  const { isAuth } = useAuthSelector();
  const dispatch = useDispatch();

  useEffect(() => {
    // Trick pour gérer le "Strict Mode" de react en mode développement
    if (isAuth && (import.meta.env.PROD || flag)) {
      const id = toast.loading("Disconnecting...");
      dispatch(signOut())
        .then(() => {
          toast.update(
            id,
            toastify({ render: "You are logged out", type: "success" })
          );
        })
        .catch((error) => {
          toast.update(
            id,
            toastify({
              render: error.statusText || error.message,
              type: "error",
            })
          );
        });
    }
    return () => (flag = !flag);
  }, [isAuth, dispatch]);

  return <Navigate to="/" />;
}

SignOut.propTypes = {};

export default SignOut;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Account from "../components/Account";
import UserHeader from "../components/UserHeader";
import { setAll } from "../redux/slices/profileSlice";
import { getUserProfile } from "../services/api";
import { accounts } from "../utils/consts";

function User() {
  const { token } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      getUserProfile(token).then((data) => {
        dispatch(setAll(data.body));
      });
    }
  }, [token, dispatch]);

  if (!token) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <>
      <main className="main bg-dark">
        <UserHeader />
        <h2 className="sr-only">Accounts</h2>
        {accounts.map((account) => (
          <Account key={account.id} {...account} />
        ))}
      </main>
    </>
  );
}

export default User;

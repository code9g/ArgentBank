import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Account from "../components/Account";
import UserHeader from "../components/UserHeader";
import { accounts } from "../utils/consts";

function User() {
  const { token } = useSelector((state) => state.login);

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

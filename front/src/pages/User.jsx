import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Account from "../components/Account";
import { accounts } from "../utils/consts";

function User() {
  const { token } = useSelector((state) => state.login);
  const { firstName, lastName } = useSelector((state) => state.profile);

  if (!token) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {firstName} {lastName} !
        </h1>
        <button className="edit-button">Edit Name</button>
      </div>
      <h2 className="sr-only">Accounts</h2>
      {accounts.map((account) => (
        <Account key={account.id} {...account} />
      ))}
    </main>
  );
}

export default User;

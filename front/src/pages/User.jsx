import Account from "../components/Account";
import { accounts } from "../utils/consts";

function User() {
  const firstName = "Jarvis";
  const lastName = "Tony";

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {lastName} {firstName}!
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

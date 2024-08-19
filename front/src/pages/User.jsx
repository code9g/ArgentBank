import Account from "../components/Account";

function User() {
  const accounts = [
    {
      id: 1,
      title: "Argent Bank Checking",
      operations: 8_349,
      amount: 2_082.79,
      description: "Available Balance",
    },
    {
      id: 2,
      title: "Argent Bank Savings",
      operations: 6_712,
      amount: 10_928.42,
      description: "Available Balance",
    },
    {
      id: 3,
      title: "Argent Bank Credit Card",
      operations: 8_349,
      amount: 184.3,
      description: "Current Balance",
    },
  ];
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

import Account from "../components/Account";
import Title from "../components/Title";
import UserHeader from "../components/UserHeader";
import { accounts } from "../utils/consts";

function User() {
  return (
    <>
      <Title>User</Title>
      {/* {isPending && <Smoke />} */}
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

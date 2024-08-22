import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Account from "../components/Account";
import Title from "../components/Title";
import UserHeader from "../components/UserHeader";
import { userLoad } from "../redux/actions";
import { useLoginSelector } from "../redux/hooks";
import { accounts } from "../utils/consts";

const INTERVAL_USER_DATA_REFRESH = 5 * 60 * 1000;

function User() {
  const { token } = useLoginSelector();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userLoad(token));
    const handle = setInterval(
      () => dispatch(userLoad(token)),
      INTERVAL_USER_DATA_REFRESH
    );
    return () => clearInterval(handle);
  }, [token, dispatch]);

  return (
    <>
      <Title>User</Title>
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

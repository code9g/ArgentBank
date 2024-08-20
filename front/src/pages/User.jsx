import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Account from "../components/Account";
import UserHeader from "../components/UserHeader";
import { userLoad } from "../redux/actions";
import { accounts } from "../utils/consts";

const INTERVAL_USER_DATA_REFRESH = 5 * 60 * 1000;

function User() {
  const { token } = useSelector((state) => state.login);
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

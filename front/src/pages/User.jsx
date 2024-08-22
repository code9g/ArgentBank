import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Account from "../components/Account";
import State from "../components/State";
import Title from "../components/Title";
import UserHeader from "../components/UserHeader";
import { userLoad } from "../redux/actions";
import { useAuthSelector, useProfileSelector } from "../redux/hooks";
import { accounts } from "../utils/consts";

const INTERVAL_USER_DATA_REFRESH = 5 * 60 * 1000;

function User() {
  const { token } = useAuthSelector();
  const { isFetching } = useProfileSelector();
  const dispatch = useDispatch();

  useEffect(() => {
    toast.promise(dispatch(userLoad(token)), {
      toastId: "User",
      pending: "Retrieving your profile data...",
      error: { render: ({ data }) => data.statusText || data.message },
    });
    const handle = setInterval(
      () =>
        toast.promise(dispatch(userLoad(token)), {
          pending: "Refreshing your profile data...",
          error: { render: ({ data }) => data.statusText || data.message },
        }),
      INTERVAL_USER_DATA_REFRESH
    );
    return () => clearInterval(handle);
  }, [token, dispatch]);

  return (
    <>
      <Title>User</Title>
      {isFetching && <State />}
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

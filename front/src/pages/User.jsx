import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Account from "../components/Account";
import Smoke from "../components/Smoke";
import Title from "../components/Title";
import UserHeader from "../components/UserHeader";
import { userLoad } from "../redux/actions";
import { useAuthSelector, useProfileSelector } from "../redux/hooks";
import { accounts, INTERVAL_USER_DATA_REFRESH } from "../utils/consts";
import { promiseError } from "../utils/functions";

function User() {
  const { token } = useAuthSelector();
  const { isFetching } = useProfileSelector();
  const dispatch = useDispatch();

  useEffect(() => {
    const toastify = (text) => {
      toast.promise(dispatch(userLoad(token)), {
        pending: text,
        success: "Your data has been retrieved",
        error: promiseError,
      });
    };

    toastify("Retrieving your data...");

    const handle = setInterval(() => {
      toastify("Refreshing your profile data...");
    }, INTERVAL_USER_DATA_REFRESH);

    return () => clearInterval(handle);
  }, [token, dispatch]);

  return (
    <>
      <Title>User</Title>
      {isFetching && <Smoke />}
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

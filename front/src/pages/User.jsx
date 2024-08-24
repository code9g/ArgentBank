import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Account from "../components/Account";
import Smoke from "../components/Smoke";
import Title from "../components/Title";
import UserHeader from "../components/UserHeader";
import { userLoad } from "../redux/actions";
import { useProfileSelector } from "../redux/hooks";
import {
  accounts,
  INTERVAL_USER_DATA_REFRESH,
  promiseError,
} from "../utils/consts";

function User() {
  const { isPending, timeLeft, status } = useProfileSelector();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status !== "pending") {
      let handle = null;

      const toastify = (text) => {
        toast.promise(dispatch(userLoad()), {
          pending: text,
          success: "Your data has been retrieved",
          error: promiseError,
        });
      };

      const timeoutTrigger = () => {
        toastify("Refreshing your profile data...");
        handle = setTimeout(timeoutTrigger, INTERVAL_USER_DATA_REFRESH);
      };
      if (timeLeft > 0) {
        handle = setTimeout(timeoutTrigger, timeLeft);
      } else {
        timeoutTrigger();
      }
      return () => clearTimeout(handle);
    }
  }, [timeLeft, dispatch, status]);

  return (
    <>
      <Title>User</Title>
      {isPending && <Smoke />}
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

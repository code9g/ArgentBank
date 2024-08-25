import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Account from "../components/Account";
import Smoke from "../components/Smoke";
import Title from "../components/Title";
import UserHeader from "../components/UserHeader";
import { useProfileSelector } from "../redux/hooks";
import { getProfile } from "../redux/thunks";
import { accounts, promiseError } from "../utils/consts";

function User() {
  const {
    isPending,
    user: { id },
  } = useProfileSelector();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id === null) {
      const handle = setTimeout(
        () =>
          toast.promise(dispatch(getProfile()).unwrap(), {
            pending: "Refreshing your profile data...",
            success: "Your data has been retrieved",
            error: promiseError,
          }),
        0
      );
      return () => clearTimeout(handle);
    }
  }, [id, dispatch]);

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

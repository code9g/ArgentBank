import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthSelector } from "../redux/hooks";
import { useGetProfileMutation } from "../redux/services/bankApi";
import Footer from "./Footer";
import Header from "./Header";

function Layout() {
  const { token, user } = useAuthSelector();
  const refresh = token && user === null;

  const [getProfile] = useGetProfileMutation();

  useEffect(() => {
    if (refresh) {
      toast.promise(getProfile().unwrap(), {
        pending: "Loading data profile...",
        success: "You are successfully loaded data profile",
        error: {
          render: ({ data: error }) => error.message,
        },
      });
    }
  }, [refresh, getProfile]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;

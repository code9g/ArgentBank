import { useSelector } from "react-redux";

const loginSelector = (state) => state.login;

const profileSelector = (state) => state.profile;

const isAuthSelector = (state) => state.login.token !== null;

export const useLoginSelector = () => {
  const selector = useSelector(loginSelector);
  return { ...selector, isAuth: selector.token !== null };
};

export const useProfileSelector = () => useSelector(profileSelector);

export const useIsAuthSelector = () => useSelector(isAuthSelector);

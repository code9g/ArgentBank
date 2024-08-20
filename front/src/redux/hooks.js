import { useSelector } from "react-redux";

const loginSelector = (state) => state.login;

const profileSelector = (state) => state.profile;

export const useLoginSelector = () => {
  const selector = useSelector(loginSelector);
  return { ...selector, isAuth: selector.token !== null };
};

export const useProfileSelector = () => useSelector(profileSelector);

import { useSelector } from "react-redux";

export const authSelector = (state) => state.auth;

export const profileSelector = (state) => state.profile;

export const useAuthSelector = () => {
  const selector = useSelector(authSelector);
  return { ...selector, isAuth: selector.token !== null };
};

export const useProfileSelector = () => useSelector(profileSelector);

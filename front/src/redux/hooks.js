import { useSelector } from "react-redux";
import {
  ERROR_STATUS,
  IDLE_STATUS,
  PENDING_STATUS,
  SUCCESS_STATUS,
} from "../utils/consts";
import { authSelector, profileSelector } from "./selectors";

const unwrap = (state, extras = {}) => ({
  ...state,
  isIdle: state.status === IDLE_STATUS,
  isPending: state.status === PENDING_STATUS,
  isError: state.status === ERROR_STATUS,
  isSuccess: state.status === SUCCESS_STATUS,
  ...extras,
});

/**
 * Alias du hook useSelector(authSelector) pour récupérer les informations d'authentification
 *
 * @returns {Object}
 */
export const useAuthSelector = () => {
  const selector = useSelector(authSelector);
  return unwrap(selector, { isAuth: selector.token !== null });
};

/**
 * Alias du hook useSelector(profileSelector) pour récupérer les informations d'un utilisateur
 *
 * @returns {Object}
 */
export const useProfileSelector = () => {
  const selector = useSelector(profileSelector);

  return unwrap(selector);
};

import { useSelector } from "react-redux";
import { authSelector } from "./selectors";

/**
 * Alias du hook useSelector(authSelector) pour récupérer les informations d'authentification
 *
 * @returns {Object}
 */
export const useAuthSelector = () => {
  const selector = useSelector(authSelector);
  return {
    ...selector,
    isAuth: selector.token !== null,
  };
};

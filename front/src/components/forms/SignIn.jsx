import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
  useGetProfileMutation,
  useLoginMutation,
} from "../../redux/services/bankApi";

import Smoke from "../Smoke";

function SignIn({ to }) {
  const [login, { isPending, isError, error }] = useLoginMutation();
  const [getProfile] = useGetProfileMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const target = e.currentTarget;
    const credentials = {
      email: target["username"].value,
      password: target["password"].value,
    };
    const remember = target["remember"].checked;

    const { data } = await login(credentials, remember);
    if (data) {
      const { data } = await getProfile();
      if (data) {
        navigate(to);
      }
    }
  };

  return (
    <form name="sign-in" className="sign-in-form" onSubmit={handleSubmit}>
      {isPending && <Smoke />}
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>
      <div className={`sign-in-error ${isError ? "show" : ""}`}>
        {error || "Unexpected error !"}
      </div>
      <div className="input-text">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" minLength={2} required />
      </div>
      <div className="input-password">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" minLength={2} required />
      </div>
      <div className="input-checkbox">
        <input type="checkbox" id="remember" />
        <label htmlFor="remember">Remember me</label>
      </div>
      <button type="submit" className="sign-in-button">
        Sign In
      </button>
    </form>
  );
}

SignIn.propTypes = {
  to: PropTypes.string,
};

export default SignIn;

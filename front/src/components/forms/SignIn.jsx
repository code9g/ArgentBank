import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
  useGetProfileMutation,
  useLoginMutation,
} from "../../redux/services/bankApi";

import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setRemember } from "../../redux/slices/authSlice";
import Smoke from "../Smoke";

function SignIn({ to }) {
  const [login, { isPending, isError, error }] = useLoginMutation();
  const [getProfile] = useGetProfileMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const target = e.currentTarget;
    const credentials = {
      email: target["username"].value,
      password: target["password"].value,
    };

    toast.promise(
      login(credentials)
        .unwrap()
        .then((token) =>
          getProfile(token)
            .unwrap()
            .then(() => navigate(to))
        ),
      {
        pending: "Connecting...",
        success: "You are successfully logged...",
        error: {
          render: ({ data: error }) => error.message,
        },
      }
    );
  };

  return (
    <form name="sign-in" className="sign-in-form" onSubmit={handleSubmit}>
      {isPending && <Smoke />}
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>
      <div className={`sign-in-error ${isError ? "show" : ""}`}>
        {error?.message || "Unexpected error !"}
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
        <input
          type="checkbox"
          id="remember"
          onChange={(e) => {
            dispatch(setRemember(e.currentTarget.checked));
          }}
        />
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

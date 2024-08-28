import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/services/bankApi";

import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setRemember } from "../../redux/slices/authSlice";

function SignIn({ to }) {
  const [login, { isLoading, isError, error }] = useLoginMutation();

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
        .then(() => navigate(to)),
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
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>
      <div className={`sign-in-error ${isError ? "show" : ""}`}>
        {error?.message || "Unexpected error !"}
      </div>
      <div className="input-text">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          minLength={2}
          required
          disabled={isLoading}
        />
      </div>
      <div className="input-password">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          minLength={2}
          required
          disabled={isLoading}
        />
      </div>
      <div className="input-checkbox">
        <input
          type="checkbox"
          id="remember"
          onChange={(e) => {
            dispatch(setRemember(e.currentTarget.checked));
          }}
          disabled={isLoading}
        />
        <label htmlFor="remember">Remember me</label>
      </div>
      <button type="submit" className="sign-in-button" disabled={isLoading}>
        Sign In
      </button>
    </form>
  );
}

SignIn.propTypes = {
  to: PropTypes.string,
};

export default SignIn;

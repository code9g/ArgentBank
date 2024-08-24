import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signIn } from "../../redux/actions";
import { useAuthSelector } from "../../redux/hooks";
import { authClearError } from "../../redux/slices/authSlice";
import Smoke from "../Smoke";

function SignIn({ to }) {
  const { isPending, isError, error } = useAuthSelector();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = {
      email: e.target["username"].value,
      password: e.target["password"].value,
    };
    const remember = e.target["remember"].checked;

    try {
      await toast.promise(dispatch(signIn(credentials, remember)), {
        pending: "Connecting...",
        success: "Your are connected successfully !",
        error: {
          render: (error) => error.data.statusText || error.data.message,
        },
      });
      navigate(to);
    } catch (error) {
      // No report error
    }
  };

  const handleChange = () => {
    if (isError) {
      dispatch(authClearError());
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
        <input
          type="text"
          id="username"
          onChange={handleChange}
          minLength={2}
          required
        />
      </div>
      <div className="input-password">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={handleChange}
          minLength={2}
          required
        />
      </div>
      <div className="input-checkbox">
        <input type="checkbox" id="remember" onChange={handleChange} />
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

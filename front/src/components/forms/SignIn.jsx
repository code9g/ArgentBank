import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signIn } from "../../redux/actions";
import { useAuthSelector } from "../../redux/hooks";
import { authError } from "../../redux/slices/authSlice";
import { promiseError } from "../../utils/consts";
import Smoke from "../Smoke";

function SignIn({ to }) {
  const { isFetching, error } = useAuthSelector();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = {
      email: e.target["username"].value,
      password: e.target["password"].value,
    };
    const remember = e.target["remember"].checked;

    toast
      .promise(dispatch(signIn(credentials, remember)), {
        pending: "Connecting...",
        success: "Your are connected successfully !",
        error: promiseError,
      })
      .then(() => navigate(to));
  };

  const handleChange = () => {
    dispatch(authError(null));
  };

  return (
    <form name="sign-in" className="sign-in-form" onSubmit={handleSubmit}>
      {isFetching && <Smoke />}
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>
      <div className={`sign-in-error ${error ? "show" : ""}`}>
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

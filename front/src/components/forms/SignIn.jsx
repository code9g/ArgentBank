import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signIn } from "../../redux/actions";
import { useAuthSelector } from "../../redux/hooks";
import { authError } from "../../redux/slices/authSlice";
import { promiseError } from "../../utils/consts";
import Smoke from "../Smoke";
import InputCheckbox from "./ui/InputCheckbox";
import InputEmail from "./ui/InputEmail";
import InputPassword from "./ui/InputPassword";

function SignIn() {
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
      .catch(() => {})
      .then(() => navigate("/user"));
  };

  const handleChange = () => dispatch(authError(null));

  return (
    <form className="sign-in-form" onSubmit={handleSubmit}>
      {isFetching && <Smoke />}
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>
      <div className={`sign-in-error ${error ? "show" : ""}`}>
        {error || "Unexpected error !"}
      </div>
      <InputEmail
        id="username"
        label="Username"
        required
        onChange={handleChange}
      />
      <InputPassword
        id="password"
        label="Password"
        required
        onChange={handleChange}
      />
      <InputCheckbox
        id="remember"
        label="Remember me"
        onChange={handleChange}
      />
      <button type="submit" className="sign-in-button">
        Sign In
      </button>
    </form>
  );
}

export default SignIn;

import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputCheckbox from "../components/forms/InputCheckbox";
import InputEmail from "../components/forms/InputEmail";
import InputPassword from "../components/forms/InputPassword";
import State from "../components/State";
import Title from "../components/Title";
import { signIn } from "../redux/actions";
import { useAuthSelector } from "../redux/hooks";
import { authError } from "../redux/slices/authSlice";
import { toastify } from "../utils/functions";

function SignIn() {
  const { isAuth, isFetching, error } = useAuthSelector();
  const dispatch = useDispatch();

  if (isAuth) {
    return <Navigate to="/user" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = {
      email: e.target["username"].value,
      password: e.target["password"].value,
    };
    const remember = e.target["remember"].checked;
    const id = toast.loading("Connecting...");
    dispatch(signIn(credentials, remember))
      .then(() => {
        toast.update(
          id,
          toastify({
            render: "You are successfully connected",
            type: "success",
          })
        );
      })
      .catch((error) => {
        toast.update(
          id,
          toastify({
            render: error.statusText || error.message,
            type: "error",
          })
        );
      });
  };

  const handleChange = () => dispatch(authError(null));

  return (
    <>
      <Title>Sign In</Title>
      {isFetching && <State />}
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
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
        </section>
      </main>
    </>
  );
}

export default SignIn;

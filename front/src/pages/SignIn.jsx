import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputCheckbox from "../components/forms/ui/InputCheckbox";
import InputEmail from "../components/forms/ui/InputEmail";
import InputPassword from "../components/forms/ui/InputPassword";
import State from "../components/State";
import Title from "../components/Title";
import { signIn } from "../redux/actions";
import { useAuthSelector } from "../redux/hooks";
import { authError } from "../redux/slices/authSlice";

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

    toast.promise(dispatch(signIn(credentials, remember)), {
      pending: "Connecting...",
      success: "Your are connected successfully !",
      error: {
        render: ({ data }) => data.statusText || data.message,
      },
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

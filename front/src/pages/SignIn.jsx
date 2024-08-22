import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import InputCheckbox from "../components/forms/InputCheckbox";
import InputEmail from "../components/forms/InputEmail";
import InputPassword from "../components/forms/InputPassword";
import State from "../components/State";
import Title from "../components/Title";
import { signIn } from "../redux/actions";
import { useAuthSelector } from "../redux/hooks";

function SignIn() {
  const { token, isFetching, error } = useAuthSelector();
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    const email = e.target["username"].value;
    const password = e.target["password"].value;
    const remember = e.target["remember"].checked;
    dispatch(signIn({ email, password, remember }));
  }

  if (token) {
    return <Navigate to="/user" />;
  }

  return (
    <>
      <Title>Sign In</Title>
      {isFetching && <State message="Connecting..." />}
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            {error && <div className="sign-in-error">{error}</div>}
            <InputEmail id="username" label="Username" required />
            <InputPassword id="password" label="Password" required />
            <InputCheckbox id="remember" label="Remember me" />
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

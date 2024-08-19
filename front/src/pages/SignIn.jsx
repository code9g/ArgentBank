import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputCheckbox from "../components/forms/InputCheckbox";
import InputPassword from "../components/forms/InputPassword";
import InputText from "../components/forms/InputText";
import State from "../components/State";
import { signIn } from "../redux/actions";
import { FETCHING_STATUS, SUCCESS_STATUS } from "../redux/slices/loginSlice";

function SignIn() {
  const navigate = useNavigate();
  const { status, error, token, firstName } = useSelector(
    (state) => state.login
  );

  console.log("token:", token);
  console.log("firstName:", firstName);

  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    const email = e.target["username"].value;
    const password = e.target["password"].value;
    const remember = e.target["remember"].checked;
    dispatch(signIn({ email, password, remember }));
  }

  useEffect(() => {
    if (status === SUCCESS_STATUS) {
      navigate("/user");
    }
  }, [status, navigate]);

  return (
    <>
      {status === FETCHING_STATUS && <State message="Connecting..." />}
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            {error && <div className="sign-in-error">{error}</div>}
            <InputText id="username" label="Username" type="text" />
            <InputPassword id="password" label="Password" type="password" />
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

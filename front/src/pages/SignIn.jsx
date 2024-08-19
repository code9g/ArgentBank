import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputCheckbox from "../components/forms/InputCheckbox";
import InputPassword from "../components/forms/InputPassword";
import InputText from "../components/forms/InputText";
import State from "../components/State";
import { signIn } from "../redux/slices/loginSlice";
import { setAll } from "../redux/slices/profileSlice";
import { getUserProfile, loginUser } from "../services/api";

function SignIn() {
  const [state, setState] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    const username = e.target["username"].value;
    const password = e.target["password"].value;
    const remember = e.target["remember"].checked;

    setState("connecting");
    loginUser(username, password)
      .then(async (data) => {
        const token = data.body.token;
        return getUserProfile(token).then((profileData) => {
          dispatch(setAll(profileData.body));
          dispatch(
            signIn({
              token,
              firstName: profileData.body.firstName,
              remember,
            })
          );
          navigate("/user");
        });
      })
      .catch(() => {
        setError("Username or password invalide !");
      })
      .finally(() => {
        setState(null);
      });
  }

  return (
    <>
      {state && <State message={"Loading..."} />}
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

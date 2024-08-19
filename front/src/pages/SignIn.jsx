import { useNavigate } from "react-router-dom";
import InputCheckbox from "../components/forms/InputCheckbox";
import InputPassword from "../components/forms/InputPassword";
import InputText from "../components/forms/InputText";

function SignIn() {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const username = e.target["username"].value;
    const password = e.target["password"].value;
    const remember = e.target["remember"].checked;
    console.log(
      "Username:",
      username,
      "Password:",
      password,
      "Remember:",
      remember
    );
    navigate("/user");
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <InputText id="username" label="Username" type="text" />
          <InputPassword id="password" label="Password" type="password" />
          <InputCheckbox id="remember" label="Remember me" />
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}

export default SignIn;

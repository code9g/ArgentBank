import { useNavigate } from "react-router-dom";
import Checkbox from "../components/Checkbox";
import InputWrapper from "../components/InputWrapper";

function SignIn() {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/user");
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <InputWrapper id="username" label="Username" type="text" />
          <InputWrapper id="password" label="Password" type="password" />
          <Checkbox id="remember-me" label="Remember me" />
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}

export default SignIn;

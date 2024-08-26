import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignIn from "../components/forms/SignIn";
import Title from "../components/Title";
import { useAuthSelector } from "../redux/hooks";

function LogIn() {
  const { isAuth } = useAuthSelector();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  return (
    <>
      <Title>Sign In</Title>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <SignIn to="/user" />
        </section>
      </main>
    </>
  );
}

export default LogIn;

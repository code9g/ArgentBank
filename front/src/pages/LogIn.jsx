import { Navigate } from "react-router-dom";
import SignIn from "../components/forms/SignIn";
import Title from "../components/Title";
import { useAuthSelector } from "../redux/hooks";

function LogIn() {
  const { isAuth } = useAuthSelector();

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Title>Sign In</Title>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <SignIn />
        </section>
      </main>
    </>
  );
}

export default LogIn;

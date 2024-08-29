import SignIn from "../components/forms/SignIn";
import Title from "../components/Title";

function LogIn() {
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

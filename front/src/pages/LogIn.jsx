import PropTypes from "prop-types";
import SignIn from "../components/forms/SignIn";
import Title from "../components/Title";

function LogIn({ to }) {
  return (
    <>
      <Title>Sign In</Title>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <SignIn to={to} />
        </section>
      </main>
    </>
  );
}

LogIn.propTypes = {
  to: PropTypes.string,
};

export default LogIn;

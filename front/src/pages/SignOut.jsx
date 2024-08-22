import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import Title from "../components/Title";
import { signOut } from "../redux/actions";
import { useLoginSelector } from "../redux/hooks";

function SignOut() {
  const { token } = useLoginSelector();
  const dispatch = useDispatch();

  if (token) {
    dispatch(signOut());
  }

  return (
    <>
      <Title>Sign Out</Title>
      <Navigate to="/" />
    </>
  );
}

SignOut.propTypes = {};

export default SignOut;

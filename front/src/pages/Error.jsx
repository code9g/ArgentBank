import { useRouteError } from "react-router-dom";
import Title from "../components/Title";

function Error() {
  const error = useRouteError();

  return (
    <>
      <Title>Error</Title>
      <main className="page-error">
        <h2>{error.status || error.code}</h2>
        <p>{error.statusText || error.message}</p>
      </main>
    </>
  );
}

export default Error;

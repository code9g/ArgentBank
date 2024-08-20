import { useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();

  return (
    <main className="page-error">
      <h2>{error.status || error.code}</h2>
      <p>{error.statusText || error.message}</p>
    </main>
  );
}

export default Error;

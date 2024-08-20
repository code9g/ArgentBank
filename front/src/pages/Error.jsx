import { useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();

  console.error(error);

  return <div>{error.statusText || "???"}</div>;
}

export default Error;

import PropTypes from "prop-types";
import { useEffect } from "react";

function Title({ children }) {
  useEffect(() => {
    const title = document.title;
    document.title = `${title} - ${children}`;
    return () => {
      document.title = title;
    };
  });

  return <></>;
}

Title.propTypes = {
  children: PropTypes.node,
};

export default Title;

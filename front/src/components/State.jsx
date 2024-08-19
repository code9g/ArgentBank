import PropTypes from "prop-types";

function State({ message }) {
  return (
    <div className="state">
      <div className="state-content">{message}</div>
    </div>
  );
}

State.propTypes = {
  message: PropTypes.string,
};

export default State;

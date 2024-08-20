import PropTypes from "prop-types";

function InputEmail({ id, label, required = false }) {
  return (
    <div className="input-text">
      <label htmlFor={id}>{label}</label>
      <input type="email" id={id} required={required} />
    </div>
  );
}

InputEmail.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
};

export default InputEmail;

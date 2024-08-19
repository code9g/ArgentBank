import PropTypes from "prop-types";

function InputWrapper({ id, label, type = "text", required = false }) {
  return (
    <div className="input-wrapper">
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} required={required} />
    </div>
  );
}

InputWrapper.propTypes = {
  id: PropTypes.string,

  label: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
};

export default InputWrapper;

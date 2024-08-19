import PropTypes from "prop-types";

function InputPassword({ id, label, required = false }) {
  return (
    <div className="input-password">
      <label htmlFor={id}>{label}</label>
      <input type="password" id={id} required={required} />
    </div>
  );
}

InputPassword.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
};

export default InputPassword;

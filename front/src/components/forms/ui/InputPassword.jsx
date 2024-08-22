import PropTypes from "prop-types";

function InputPassword({ id, label, required = false, onChange = null }) {
  return (
    <div className="input-password">
      <label htmlFor={id}>{label}</label>
      <input type="password" id={id} required={required} onChange={onChange} />
    </div>
  );
}

InputPassword.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func,
};

export default InputPassword;
